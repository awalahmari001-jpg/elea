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
import { VideosGamesStudio } from "@/components/kids/videos-games-studio";
import { VocabGrammarStudio } from "@/components/kids/vocab-grammar-studio";
import { KIDS_ANIMATED_VIDEOS } from "@/content/kids/videos-games-data";
import { KIDS_GRAMMAR_UNITS, KIDS_VOCAB_THEMES } from "@/content/kids/vocab-grammar-data";
import {
  LETTER_PHONICS_AUDIO,
  playBlendedWord,
  playLetterName,
  playLetterSound,
  playPhonemeSound,
  playVowelSound,
} from "@/lib/kids-phonics-audio";
import { kidsStorage } from "@/lib/kids-storage";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  window.localStorage.clear();
});

describe("Kids Phonics Audio Engine · Accurate Alphabet Letter Sounds (A–Z)", () => {
  it("maps all 26 letters A–Z to calibrated phoneme realizations that NEVER collapse to single-letter names", () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    expect(Object.keys(LETTER_PHONICS_AUDIO).sort()).toEqual(alphabet);

    for (const letter of alphabet) {
      const spec = LETTER_PHONICS_AUDIO[letter]!;
      expect(spec.nameSpeech).toBe(`The letter ${letter}`);
      // Must be a calibrated phoneme realization (e.g. 'buh', 'sss', 'aah'), NEVER raw single letter 'b' or 's'
      expect(spec.soundSpeech.length).toBeGreaterThanOrEqual(2);
      expect(spec.soundSpeech.toLowerCase()).not.toBe(letter.toLowerCase());

      const nameOut = playLetterName(letter);
      const soundOut = playLetterSound(letter);
      expect(nameOut).toBe(`The letter ${letter}`);
      expect(soundOut).toContain(spec.soundSpeech);
      expect(soundOut).not.toBe(nameOut);
    }
  });

  it("distinguishes short vs long vowel playback, digraph phonemes, and phoneme-by-phoneme blending", () => {
    expect(playVowelSound("A", "short", "cat")).toBe("aah ... cat");
    expect(playVowelSound("A", "long", "cake")).toBe("ay ... cake");
    expect(playPhonemeSound("/ʃ/", "ship")).toBe("shhh ... ship");
    expect(playPhonemeSound("ch", "chair")).toBe("chuh ... chair");
    expect(playBlendedWord(["/k/", "/æ/", "/t/"], "cat")).toEqual(["kuh", "aah", "tuh", "cat"]);
  });
});

describe("Kids Phase K4 · 30 Vocabulary Themes & 17 Visual Grammar Units", () => {
  it("contains all 30 themed vocabulary lessons and all 17 visual context-first grammar units", () => {
    expect(KIDS_VOCAB_THEMES).toHaveLength(30);
    for (const theme of KIDS_VOCAB_THEMES) {
      expect(theme.words.length).toBeGreaterThanOrEqual(4);
      for (const word of theme.words) {
        expect(word.word.length).toBeGreaterThan(0);
        expect(word.sentence.length).toBeGreaterThan(4);
      }
    }

    expect(KIDS_GRAMMAR_UNITS).toHaveLength(17);
    for (const unit of KIDS_GRAMMAR_UNITS) {
      expect(unit.dialogue.length).toBeGreaterThanOrEqual(2);
      expect(unit.questions).toHaveLength(2);
    }
  });

  it("renders VocabGrammarStudio, records mastered themes, switches to Visual Grammar, and renders cleanly in AR", () => {
    const onTheme = vi.fn();
    const onGrammar = vi.fn();
    const onWin = vi.fn();

    const { rerender } = render(
      <I18nProvider locale="en" theme="light">
        <VocabGrammarStudio
          progress={kidsStorage.get()}
          onCompleteVocabTheme={onTheme}
          onCompleteGrammarUnit={onGrammar}
          onGameWin={onWin}
        />
      </I18nProvider>,
    );

    expect(screen.getByText(/Illustrated Vocabulary World — 30 Fun Themes/i)).toBeTruthy();
    fireEvent.click(screen.getByText(/I Learned These Words!/i));
    expect(onTheme).toHaveBeenCalledWith("colours");

    fireEvent.click(screen.getByText(/17 Visual Kids Grammar Adventures/i));
    expect(screen.getByText(/Visual Grammar for Kids — 17 Story & Picture Units/i)).toBeTruthy();
    fireEvent.click(screen.getByText(/I Got This Pattern!/i));
    expect(onGrammar).toHaveBeenCalledWith("be-verb");

    rerender(
      <I18nProvider locale="ar" theme="light">
        <VocabGrammarStudio
          progress={kidsStorage.get()}
          onCompleteVocabTheme={onTheme}
          onCompleteGrammarUnit={onGrammar}
          onGameWin={onWin}
        />
      </I18nProvider>,
    );
    expect(screen.getByText(/القواعد المرئية للأطفال — ١٧ وحدة بالصور والقصص/i)).toBeTruthy();
  }, 15000);
});

describe("Kids Phase K5 · 12 6-Part Animated ESL Videos & 8-Game Learning Arcade", () => {
  it("includes 12 original ESL animated video lessons each following the strict 6-stage pedagogical structure", () => {
    expect(KIDS_ANIMATED_VIDEOS).toHaveLength(12);
    for (const vid of KIDS_ANIMATED_VIDEOS) {
      expect(vid.stages.map((s) => s.stage)).toEqual([
        "intro",
        "presentation",
        "demonstration",
        "repetition",
        "practice",
        "review",
      ]);
      expect(vid.stages[4].practiceCheck).toBeTruthy();
    }
  });

  it("plays Animated Video Lessons, answers Stage 5 practice check, and plays Kids Learning Games Arcade", () => {
    const onWatch = vi.fn();
    const onWin = vi.fn();

    render(
      <I18nProvider locale="en" theme="light">
        <VideosGamesStudio
          progress={kidsStorage.get()}
          initialSubMode="videos"
          onWatchVideo={onWatch}
          onGameWin={onWin}
        />
      </I18nProvider>,
    );

    expect(screen.getByText(/Animated Video Lessons Library/i)).toBeTruthy();

    // Jump to Stage 5 Interactive Practice and answer correctly ('/b/ (ball)')
    fireEvent.click(screen.getByText(/5\. Interactive Practice/i));
    expect(screen.getByText(/Which sound starts 'ball'\?/i)).toBeTruthy();
    fireEvent.click(screen.getByText("/b/ (ball)"));
    expect(onWatch).toHaveBeenCalledWith("vid-alphabet-sounds");
    expect(onWin).toHaveBeenCalledWith("video-check-vid-alphabet-sounds");

    // Switch to Learning Games Arcade (8 games)
    fireEvent.click(screen.getByText(/Learning Games Arcade \(8 Games\)/i));
    expect(screen.getByText(/Kids Learning Games Arcade — 8 Fun Games!/i)).toBeTruthy();

    // Win Picture-Word Match (round 0 target is 'apple')
    fireEvent.click(screen.getByText(/^apple$/));
    expect(onWin).toHaveBeenCalledWith("kids-game-match");

    // Switch to Fill Missing Letter and win ('fish' -> 'f')
    fireEvent.click(screen.getByText(/Fill Missing Letter/i));
    fireEvent.click(screen.getByText(/^f$/));
    expect(onWin).toHaveBeenCalledWith("kids-game-missing");
  }, 15000);
});
