import fs from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

vi.mock("@tanstack/react-router", () => ({
  useRouter: () => ({ invalidate: vi.fn() }),
  Link: ({ children, to, ...rest }: { children?: ReactNode; to?: string }) => (
    <a href={to ?? "#"} {...rest}>
      {children}
    </a>
  ),
}));

import { I18nProvider } from "@/components/i18n-provider";
import { KidsWorldHub } from "@/components/kids/kids-world-hub";
import {
  ALPHABET_ENTRIES,
  FIVE_VOWELS_DATA,
  KIDS_AGE_GROUPS,
  MISSING_VOWEL_QUIZ,
} from "@/content/kids/alphabet-phonics-data";
import {
  LETTER_PHONICS_AUDIO,
  playLetterNameVsSound,
  playPureIpaSample,
} from "@/lib/kids-phonics-audio";
import { computeKidsBadges, kidsStorage } from "@/lib/kids-storage";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  window.localStorage.clear();
});

describe("Kids Phase K2 · Alphabet, Vowels & Consonants Dataset Integrity", () => {
  it("covers all 26 English letters A–Z with distinct Letter Name IPA vs. Main Sound IPA, bundled IPA MP3 samples, and 78 IPA-transcribed examples", () => {
    expect(ALPHABET_ENTRIES).toHaveLength(26);
    expect(ALPHABET_ENTRIES.map((e) => e.letter).join("")).toBe("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

    const vowels = ALPHABET_ENTRIES.filter((e) => e.kind === "vowel");
    const consonants = ALPHABET_ENTRIES.filter((e) => e.kind === "consonant");
    expect(vowels.map((v) => v.letter)).toEqual(["A", "E", "I", "O", "U"]);
    expect(consonants).toHaveLength(21);

    const publicDir = path.resolve(process.cwd(), "public");

    for (const entry of ALPHABET_ENTRIES) {
      expect(entry.letterNameIpa.startsWith("/")).toBe(true);
      expect(entry.mainSoundIpa.startsWith("/")).toBe(true);
      expect(entry.letterNameIpa).not.toBe(entry.mainSoundIpa);
      expect(entry.ipaClassification.en.length).toBeGreaterThan(5);
      expect(entry.ipaClassification.ar.length).toBeGreaterThan(5);
      expect(entry.ipaSampleUrl.startsWith("/audio/ipa/")).toBe(true);

      // Verify the real-human IPA MP3 sample exists on disk and matches LETTER_PHONICS_AUDIO
      const audioSpec = LETTER_PHONICS_AUDIO[entry.letter]!;
      expect(audioSpec.ipaSampleUrl).toBe(entry.ipaSampleUrl);
      expect(audioSpec.ipaSymbol).toBe(entry.mainSoundIpa);
      const mp3Path = path.join(publicDir, entry.ipaSampleUrl.replace(/^\//, ""));
      expect(fs.existsSync(mp3Path), `Missing IPA MP3 file: ${mp3Path}`).toBe(true);
      expect(fs.statSync(mp3Path).size).toBeGreaterThan(1000);

      // Verify pure IPA playback & contrast helpers
      expect(playPureIpaSample(entry.letter)).toBe(entry.ipaSampleUrl);
      expect(playLetterNameVsSound(entry.letter)).toContain(entry.mainSoundIpa);

      // Verify all 3 example words have exact IPA transcriptions and valid targetIndex
      expect(entry.examples).toHaveLength(3);
      for (const ex of entry.examples) {
        expect(ex.ipa.startsWith("/") && ex.ipa.endsWith("/")).toBe(true);
        expect(ex.word[ex.targetIndex]?.toLowerCase()).toBe(entry.lower);
      }
    }

    // Verify Letter O uses pure short /ɒ/ sample words (never diphthong 'owl')
    const letterO = ALPHABET_ENTRIES.find((e) => e.letter === "O")!;
    expect(letterO.examples.map((e) => e.word)).not.toContain("owl");
    expect(letterO.examples.every((e) => e.ipa.includes("ɒ"))).toBe(true);
  });

  it("includes all 3 Kids Age Groups and the 5 Magic Vowels with exact short/long contrast examples", () => {
    expect(KIDS_AGE_GROUPS.map((g) => g.id)).toEqual(["early-4-6", "young-7-9", "preteen-10-12"]);
    expect(FIVE_VOWELS_DATA).toHaveLength(5);
    expect(FIVE_VOWELS_DATA.map((v) => `${v.shortWord}/${v.longWord}`)).toEqual([
      "cat/cake",
      "bed/these",
      "sit/bike",
      "hot/home",
      "cup/cute",
    ]);
    expect(MISSING_VOWEL_QUIZ.length).toBeGreaterThanOrEqual(5);
  });

  it("awards stars, points, and earned Kids badges only through actual learning actions", () => {
    const initial = kidsStorage.get();
    expect(initial.stars).toBe(0);
    expect(computeKidsBadges(initial).every((b) => !b.earned)).toBe(true);

    for (const l of ["A", "B", "C", "D", "E"]) {
      kidsStorage.recordLetterMastered(l);
    }
    for (const l of ["A", "B", "C"]) {
      kidsStorage.recordLetterTraced(l);
    }
    const updated = kidsStorage.get();
    expect(updated.stars).toBe(8);
    const badges = computeKidsBadges(updated);
    expect(badges.find((b) => b.id === "alphabet-explorer")?.earned).toBe(true);
    expect(badges.find((b) => b.id === "letter-artist")?.earned).toBe(true);
    expect(badges.find((b) => b.id === "vowel-hero")?.earned).toBe(false);
  });
});

describe("Kids Phase K2 · Kids World Hub & Alphabet/Vowels Studios UI", () => {
  it("switches age groups, explores Letter Name vs Sound, and records letter mastery + canvas tracing", () => {
    render(
      <I18nProvider locale="en" theme="light">
        <KidsWorldHub />
      </I18nProvider>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /Play, Listen, Trace & Read English!/i }),
    ).toBeTruthy();

    // Switch Age Group to 7–9
    fireEvent.click(screen.getByText(/Young Learners \(Ages 7–9\)/i));
    expect(kidsStorage.get().ageGroup).toBe("young-7-9");

    // Select letter B and verify Letter Name vs Authentic IPA Sound controls & word IPA badges
    fireEvent.click(screen.getAllByText(/^B$/)[0]!);
    expect(screen.getByText(/B → \/biː\//i)).toBeTruthy();
    expect(screen.getAllByText(/\/b\//i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Authentic IPA Audio Sample/i)).toBeTruthy();
    expect(screen.getByRole("button", { name: /^Pure IPA Clip$/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /^Compare Name vs\. IPA$/i })).toBeTruthy();
    expect(screen.getByText("/bɔːl/")).toBeTruthy();

    fireEvent.click(screen.getByText(/I Know This Letter!/i));
    fireEvent.click(screen.getByText(/I Traced It!/i));
    expect(kidsStorage.get().masteredLetters).toContain("B");
    expect(kidsStorage.get().tracedLetters).toContain("B");
    expect(kidsStorage.get().stars).toBe(2);
  }, 15000);

  it("opens Vowels & Consonants studio, tracks practised vowels, and renders cleanly in Arabic RTL", () => {
    const { rerender } = render(
      <I18nProvider locale="en" theme="light">
        <KidsWorldHub />
      </I18nProvider>,
    );

    fireEvent.click(screen.getByText(/2\. Vowels & Consonants/i));
    expect(screen.getByText(/Meet the Five Vowels!/i)).toBeTruthy();
    expect(screen.getByText(/Meet the 21 Consonants!/i)).toBeTruthy();

    const vowelBtns = screen.getAllByText(/I Practised This Vowel!/i);
    fireEvent.click(vowelBtns[0]!);
    expect(kidsStorage.get().vowelChecksPassed).toContain("A");

    rerender(
      <I18nProvider locale="ar" theme="dark">
        <KidsWorldHub />
      </I18nProvider>,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: /العب واستمع وتتبّع واقرأ الإنجليزية!/i }),
    ).toBeTruthy();
  }, 15000);
});
