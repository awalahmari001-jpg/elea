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
import { ArticulationStudio } from "@/components/kids/articulation-studio";
import { KidsWorldHub } from "@/components/kids/kids-world-hub";
import { ReadingBlendingStudio } from "@/components/kids/reading-blending-studio";
import {
  ARTICULATION_GROUPS,
  ARTICULATION_SOUNDS,
  CVC_WORDS,
  FOUR_LETTER_WORDS,
  MINIMAL_PAIRS,
  PROGRESSIVE_SENTENCES,
  READING_LADDER_STAGES,
  SPEECH_ORGANS,
  STAGE4_READING_PASSAGES,
  VIBRATION_PAIRS,
} from "@/content/kids/articulation-reading-data";
import { computeKidsBadges, computeReadingDiagnostics, kidsStorage } from "@/lib/kids-storage";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  window.localStorage.clear();
});

describe("Kids Phase K3 · Articulation, Blending & 14-Stage Reading Dataset Integrity", () => {
  it("defines all 8 speech organs, 7 articulation groups, 24 sounds, voiced/voiceless pairs, and 6 minimal pairs", () => {
    expect(SPEECH_ORGANS).toHaveLength(8);
    expect(ARTICULATION_GROUPS).toHaveLength(7);
    expect(ARTICULATION_SOUNDS).toHaveLength(24);
    expect(VIBRATION_PAIRS.length).toBeGreaterThanOrEqual(4);
    expect(MINIMAL_PAIRS).toHaveLength(6);

    const organIds = new Set(SPEECH_ORGANS.map((o) => o.id));
    const groupIds = new Set(ARTICULATION_GROUPS.map((g) => g.id));
    for (const s of ARTICULATION_SOUNDS) {
      expect(groupIds.has(s.groupId)).toBe(true);
      expect(s.activeOrgans.length).toBeGreaterThanOrEqual(1);
      for (const organ of s.activeOrgans) {
        expect(organIds.has(organ)).toBe(true);
      }
      expect(s.examples.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("includes 20 CVC words, 17 CVCC/CCVC/Digraph words, progressive sentences, illustrated passages, and 14 reading stages", () => {
    expect(CVC_WORDS).toHaveLength(20);
    expect(FOUR_LETTER_WORDS).toHaveLength(17);
    expect(FOUR_LETTER_WORDS.filter((w) => w.kind === "cvcc").length).toBeGreaterThanOrEqual(6);
    expect(FOUR_LETTER_WORDS.filter((w) => w.kind === "ccvc").length).toBeGreaterThanOrEqual(6);
    expect(FOUR_LETTER_WORDS.filter((w) => w.kind === "digraph").length).toBeGreaterThanOrEqual(5);

    expect(PROGRESSIVE_SENTENCES.length).toBeGreaterThanOrEqual(10);
    expect(STAGE4_READING_PASSAGES.length).toBeGreaterThanOrEqual(2);
    expect(STAGE4_READING_PASSAGES[0]?.title.en).toBe("My Little Cat");

    expect(READING_LADDER_STAGES).toHaveLength(14);
    expect(READING_LADDER_STAGES.map((s) => s.stage)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    ]);
  });

  it("enforces mastery gating on the 14-Stage Reading Ladder and computes adaptive reading diagnostics", () => {
    const afterFail = kidsStorage.recordReadingStageMastered(1, false);
    expect(afterFail.readingStagesMastered).toEqual([]);
    expect(afterFail.stars).toBe(0);

    const afterPass = kidsStorage.recordReadingStageMastered(1, true);
    expect(afterPass.readingStagesMastered).toEqual([1]);
    expect(afterPass.stars).toBe(2);

    const diagInitial = computeReadingDiagnostics(afterPass);
    expect(diagInitial.subskills.length).toBeGreaterThanOrEqual(12);
    expect(diagInitial.targetedRecommendation.en.toLowerCase()).toMatch(/alphabet|letter/);

    for (const l of "ABCDEFGHIJKL".split("")) {
      kidsStorage.recordLetterMastered(l);
      kidsStorage.recordLetterTraced(l);
    }
    for (const v of ["A", "E", "I", "O", "U"]) {
      kidsStorage.recordVowelPassed(v);
    }
    for (const snd of ["p", "b", "m", "f", "v", "th-unvoiced"]) {
      kidsStorage.recordArticulationPracticed(snd);
    }
    kidsStorage.recordReadingStageMastered(2, true);
    kidsStorage.recordReadingStageMastered(3, true);
    kidsStorage.recordReadingStageMastered(4, true);

    const progressed = kidsStorage.get();
    const badges = computeKidsBadges(progressed);
    expect(badges.find((b) => b.id === "sound-maker")?.earned).toBe(true);
    expect(badges.find((b) => b.id === "super-reader")?.earned).toBe(true);

    const diagProgressed = computeReadingDiagnostics(progressed);
    expect(diagProgressed.stagesMasteredCount).toBe(4);
    expect(diagProgressed.targetedRecommendation.en.toLowerCase()).toMatch(/blend/);
  });
});

describe("Kids Phase K3 · Articulation & Blending/14-Stage Reading Studios UI", () => {
  it("renders ArticulationStudio mouth diagram, switches groups, and records practiced sounds", () => {
    const onPractice = vi.fn();
    const onWin = vi.fn();

    render(
      <I18nProvider locale="en" theme="light">
        <ArticulationStudio
          progress={kidsStorage.get()}
          onPracticeSound={onPractice}
          onGameWin={onWin}
        />
      </I18nProvider>,
    );

    expect(screen.getByText(/Let's Make Sounds! — Articulation & Pronunciation/i)).toBeTruthy();
    expect(screen.getByText(/Can You Feel the Vibration/i)).toBeTruthy();
    expect(screen.getByText(/Minimal Pairs Listening Game/i)).toBeTruthy();

    const dentalGroup = ARTICULATION_GROUPS.find((g) => g.id === "dental")!;
    fireEvent.click(screen.getByText(dentalGroup.title.en));
    expect(screen.getAllByText(/\/θ\//).length).toBeGreaterThanOrEqual(1);

    fireEvent.click(screen.getByText(/I Practised This Sound!/i));
    expect(onPractice).toHaveBeenCalledWith("theta");
  }, 15000);

  it("renders ReadingBlendingStudio blending, CVCC/CCVC/digraph tabs, My Little Cat passage, and 14-Stage Mastery Check", () => {
    const onWin = vi.fn();
    const onStageCheck = vi.fn();

    render(
      <I18nProvider locale="en" theme="light">
        <ReadingBlendingStudio
          progress={kidsStorage.get()}
          onGameWin={onWin}
          onStageCheck={onStageCheck}
        />
      </I18nProvider>,
    );

    expect(screen.getByText(/Sound Blending, CVC & 4-Letter Word Decoding/i)).toBeTruthy();
    expect(screen.getByText(/14-Stage Mastery-Gated Reading Ladder/i)).toBeTruthy();
    expect(screen.getAllByText(/My Little Cat/i).length).toBeGreaterThanOrEqual(1);

    fireEvent.click(screen.getByText(/Blend Together & Read!/i));
    expect(onWin).toHaveBeenCalledWith("kids-blend");

    fireEvent.click(screen.getByText(/Digraphs \(sh, ch, th, ph\)/i));
    expect(screen.getAllByText(/ship/i).length).toBeGreaterThanOrEqual(1);

    fireEvent.click(screen.getByText(/^b$/));
    expect(onStageCheck).toHaveBeenCalledWith(1, true);
  }, 15000);

  it("switches smoothly to Articulation and Reading Ladder tabs inside KidsWorldHub in EN & AR", () => {
    const { rerender } = render(
      <I18nProvider locale="en" theme="light">
        <KidsWorldHub />
      </I18nProvider>,
    );

    fireEvent.click(screen.getByText(/3\. Let's Make Sounds!/i));
    expect(screen.getByText(/Let's Make Sounds! — Articulation & Pronunciation/i)).toBeTruthy();

    fireEvent.click(screen.getByText(/4\. Blending & 14-Stage Reading/i));
    expect(screen.getByText(/14-Stage Mastery-Gated Reading Ladder/i)).toBeTruthy();

    rerender(
      <I18nProvider locale="ar" theme="light">
        <KidsWorldHub />
      </I18nProvider>,
    );
    expect(screen.getByText(/٣\. مخارج الحروف والنطق/i)).toBeTruthy();
    expect(screen.getByText(/٤\. الدمج وسُلّم القراءة \(١٤ مرحلة\)/i)).toBeTruthy();
  }, 15000);
});
