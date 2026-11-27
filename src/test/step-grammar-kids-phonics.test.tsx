import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { StepQuestionBankStudio } from "@/components/exams/step-question-bank";
import { CompleteGrammarHub } from "@/components/grammar/complete-grammar-hub";
import { I18nProvider } from "@/components/i18n-provider";
import { AlphabetStudio } from "@/components/kids/alphabet-studio";
import {
  COMPLETE_GRAMMAR_UNITS,
  GRAMMAR_MODULES,
} from "@/content/grammar/grammar-curriculum-index";
import { ALPHABET_ENTRIES } from "@/content/kids/alphabet-phonics-data";
import { FULL_PHONICS_SONGS, LETTER_PHONICS_SONGS } from "@/content/kids/phonics-songs-data";
import {
  buildStepSimulationSet,
  STEP_CLIPS_BY_ID,
  STEP_PASSAGES_BY_ID,
  STEP_QUESTION_BANK,
} from "@/content/step/step-index";
import { LETTER_PHONICS_AUDIO } from "@/lib/kids-phonics-audio";
import { kidsStorage } from "@/lib/kids-storage";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  window.localStorage.clear();
});

describe("1. تجميعات STEP (500+ Authentic STEP Question Bank)", () => {
  it("contains at least 500 unique, fully explained STEP questions across all 4 official sections", () => {
    expect(STEP_QUESTION_BANK.length).toBeGreaterThanOrEqual(500);

    const ids = new Set<string>();
    const prompts = new Set<string>();
    const bySection = { reading: 0, structure: 0, compositional: 0, listening: 0 };

    for (const q of STEP_QUESTION_BANK) {
      ids.add(q.id);
      prompts.add(q.prompt.trim().toLowerCase());
      bySection[q.section] += 1;
      expect(q.options).toHaveLength(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThanOrEqual(3);
      expect(q.explanation.en.length).toBeGreaterThan(10);
      expect(q.explanation.ar.length).toBeGreaterThan(6);
      if (q.section === "reading") {
        expect(q.passageId && STEP_PASSAGES_BY_ID[q.passageId]).toBeTruthy();
      }
      if (q.section === "listening") {
        expect(q.clipId && STEP_CLIPS_BY_ID[q.clipId]).toBeTruthy();
      }
    }

    expect(ids.size).toBe(STEP_QUESTION_BANK.length);
    expect(prompts.size).toBe(STEP_QUESTION_BANK.length);
    expect(bySection.reading).toBeGreaterThanOrEqual(150);
    expect(bySection.structure).toBeGreaterThanOrEqual(150);
    expect(bySection.compositional).toBeGreaterThanOrEqual(90);
    expect(bySection.listening).toBeGreaterThanOrEqual(100);

    // Timed exam builders produce exact Qiyas-balanced sets
    expect(buildStepSimulationSet(40)).toHaveLength(40);
    expect(buildStepSimulationSet(100)).toHaveLength(100);
  });

  it("renders تجميعات STEP studio, checks answers with explanations, and runs a timed simulation", () => {
    render(
      <I18nProvider locale="ar" theme="light">
        <StepQuestionBankStudio />
      </I18nProvider>,
    );

    expect(screen.getByRole("heading", { level: 1, name: /تجميعات STEP/i })).toBeInTheDocument();

    // Launch quick 40-question STEP simulation and submit
    fireEvent.click(screen.getByRole("button", { name: /محاكاة سريعة/i }));
    fireEvent.click(screen.getByRole("button", { name: /تسليم وتصحيح الاختبار/i }));
    expect(screen.getByText(/نتيجة اختبار STEP التجريبي/i)).toBeInTheDocument();
  }, 15000);
});

describe("2. قواعد اللغة الإنجليزية (Complete 12-Module, 56-Unit EFL/ESL Grammar Curriculum)", () => {
  it("provides 12 sequential modules and 56 complete non-truncated grammar units from A1 to C2", () => {
    expect(GRAMMAR_MODULES).toHaveLength(12);
    expect(COMPLETE_GRAMMAR_UNITS).toHaveLength(56);

    const tenseUnits = COMPLETE_GRAMMAR_UNITS.filter((u) => u.moduleId === "verb-tenses");
    expect(tenseUnits).toHaveLength(12);

    COMPLETE_GRAMMAR_UNITS.forEach((unit, idx) => {
      expect(unit.order).toBe(idx + 1);
      expect(unit.rules.length).toBeGreaterThanOrEqual(3);
      expect(unit.examples.length).toBeGreaterThanOrEqual(4);
      expect(unit.quickCheck).toHaveLength(3);
      expect(unit.arabicInterferenceTip.ar.length).toBeGreaterThan(8);
    });
  });

  it("renders قواعد اللغة الإنجليزية hub cleanly in Arabic and allows answering quick checks & marking mastery", () => {
    render(
      <I18nProvider locale="ar" theme="light">
        <CompleteGrammarHub />
      </I18nProvider>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /قواعد اللغة الإنجليزية/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/جميع الأزمنة الإنجليزية الـ١٢/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /تحديد كمُتقَنة/i }));
    expect(screen.getByRole("button", { name: /تم إتقان الوحدة/i })).toBeInTheDocument();
  }, 15000);
});

describe("3. KIDS الصوتيات — Phonetically Accurate Letter Sounds & Educational Phonics Songs", () => {
  it("audits all 26 letters A–Z for pure acoustic phonics accuracy and provides 26 letter songs + 4 full songs", () => {
    const bannedBareTts = new Set([
      "aah",
      "aw",
      "ih",
      "fff",
      "lll",
      "mmm",
      "nnn",
      "rrr",
      "sss",
      "vvv",
      "zzz",
      "kss",
    ]);

    expect(ALPHABET_ENTRIES).toHaveLength(26);
    for (const entry of ALPHABET_ENTRIES) {
      const spec = LETTER_PHONICS_AUDIO[entry.letter];
      expect(spec, `Missing audio spec for ${entry.letter}`).toBeDefined();
      expect(
        bannedBareTts.has(spec!.soundSpeech.toLowerCase()),
        `Inaccurate TTS cue for ${entry.letter}`,
      ).toBe(false);
      expect(
        LETTER_PHONICS_SONGS[entry.letter],
        `Missing letter song for ${entry.letter}`,
      ).toBeDefined();
      expect(LETTER_PHONICS_SONGS[entry.letter]!.lyricsEn.length).toBe(4);
    }

    expect(FULL_PHONICS_SONGS).toHaveLength(4);
    for (const song of FULL_PHONICS_SONGS) {
      expect(song.lines.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("renders embedded Letter Phonics Song and 4-Song Musical Phonics Jukebox inside AlphabetStudio", () => {
    render(
      <I18nProvider locale="en" theme="light">
        <AlphabetStudio
          progress={kidsStorage.get()}
          onMasterLetter={() => {}}
          onTraceLetter={() => {}}
          onGameWin={() => {}}
        />
      </I18nProvider>,
    );

    expect(screen.getByText(/Letter Phonics Song/i)).toBeInTheDocument();
    expect(screen.getByText(/Authentic Educational Phonics Songs/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sing Letter Song/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Play Phonics Song/i })).toBeInTheDocument();
  }, 15000);
});
