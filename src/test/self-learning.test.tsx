import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { I18nProvider } from "@/components/i18n-provider";
import { SelfLearningStudio } from "@/components/self-learning/self-learning-studio";
import { CEFR_LEVELS } from "@/content/courses";
import {
  ALL_SELF_LEARNING_SENTENCES,
  getDailyChallengeSentences,
  SELF_LEARNING_BY_LEVEL,
  SELF_LEARNING_TOPICS,
} from "@/content/self-learning";
import { learnerStorage } from "@/lib/learner-storage";
import {
  computeNextReview,
  evaluateTranslationLocal,
  isDueForRevision,
} from "@/lib/translation-fallback";

vi.mock("@/lib/translation-ai.functions", () => ({
  evaluateTranslation: vi.fn(
    async ({ data }: { data: { sentenceId: string; learnerTranslation: string } }) => {
      const item = ALL_SELF_LEARNING_SENTENCES.find((s) => s.id === data.sentenceId)!;
      return {
        evaluation: evaluateTranslationLocal(item, data.learnerTranslation),
        source: "semantic" as const,
      };
    },
  ),
}));

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  window.localStorage.clear();
});

describe("Phase 2 · 600-Sentence Self-learning Pace Dataset Integrity", () => {
  it("contains exactly 600 unique sentences (100 per CEFR level A1–C2) with zero duplicates", () => {
    expect(ALL_SELF_LEARNING_SENTENCES).toHaveLength(600);
    expect(SELF_LEARNING_TOPICS).toHaveLength(16);

    const ids = new Set<string>();
    const arabicSet = new Set<string>();
    const englishSet = new Set<string>();

    for (const level of CEFR_LEVELS) {
      const levelList = SELF_LEARNING_BY_LEVEL[level];
      expect(levelList, `Level ${level} must have 100 sentences`).toHaveLength(100);

      const levelTopics = new Set(levelList.map((s) => s.topic));
      expect(levelTopics.size, `Level ${level} must cover all 16 topics`).toBe(16);

      for (const item of levelList) {
        expect(ids.has(item.id), `Duplicate ID ${item.id}`).toBe(false);
        expect(arabicSet.has(item.arabic), `Duplicate Arabic in ${item.id}`).toBe(false);
        expect(englishSet.has(item.modelEnglish), `Duplicate English in ${item.id}`).toBe(false);
        ids.add(item.id);
        arabicSet.add(item.arabic);
        englishSet.add(item.modelEnglish);

        expect(item.alternatives).toHaveLength(2);
        expect(item.alternatives[0].trim().length).toBeGreaterThan(5);
        expect(item.alternatives[1].trim().length).toBeGreaterThan(5);
        expect(item.keyVocab.length).toBeGreaterThanOrEqual(2);
        expect(item.grammarFocus.trim().length).toBeGreaterThan(3);
        expect(item.whyAppropriate.en.trim().length).toBeGreaterThan(10);
        expect(item.whyAppropriate.ar.trim().length).toBeGreaterThan(5);
      }
    }
  });

  it("generates a deterministic 10-sentence Daily Practice Challenge per date and level", () => {
    const day1 = getDailyChallengeSentences("B1", "2026-11-23", 10);
    const day1Again = getDailyChallengeSentences("B1", "2026-11-23", 10);
    const day2 = getDailyChallengeSentences("B1", "2026-11-24", 10);

    expect(day1).toHaveLength(10);
    expect(day1.map((s) => s.id)).toEqual(day1Again.map((s) => s.id));
    expect(new Set(day1.map((s) => s.id)).size).toBe(10);
    expect(day1.map((s) => s.id)).not.toEqual(day2.map((s) => s.id));
  });
});

describe("Phase 2 · Semantic Translation Evaluator & Spaced-Repetition Review", () => {
  it("accepts model translations as completely_correct and valid alternative phrasings as acceptable_alternative without penalty", () => {
    const item = SELF_LEARNING_BY_LEVEL.A1[0]!;
    const exactRes = evaluateTranslationLocal(item, item.modelEnglish);
    expect(exactRes.verdict).toBe("completely_correct");
    expect(exactRes.overallScore).toBeGreaterThanOrEqual(90);

    const altRes = evaluateTranslationLocal(item, item.alternatives[0]);
    expect(altRes.verdict).toBe("acceptable_alternative");
    expect(altRes.overallScore).toBeGreaterThanOrEqual(85);
    expect(altRes.acceptableAlternatives).toHaveLength(2);
  });

  it("detects Arabic-L1 literal translation traps and provides all 7 criterion scores", () => {
    const agreeItem = SELF_LEARNING_BY_LEVEL.A1.find((s) =>
      s.modelEnglish.toLowerCase().includes("agree with you"),
    )!;
    const trapped = evaluateTranslationLocal(agreeItem, "I am agree with you on this point.");
    expect(trapped.mistakes.some((m) => m.issue.toLowerCase().includes("agree"))).toBe(true);
    expect(["partially_correct", "incorrect"]).toContain(trapped.verdict);

    const scores = trapped.scores;
    for (const val of Object.values(scores)) {
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThanOrEqual(100);
    }
  });

  it("schedules spaced-repetition review intervals and queues mistakes automatically", () => {
    const now = Date.parse("2026-11-23T12:00:00Z");
    const wrongSched = computeNextReview("incorrect", 0, now);
    expect(wrongSched.intervalDays).toBe(0);
    expect(isDueForRevision("incorrect", wrongSched.nextReviewAt, now)).toBe(true);

    const partialSched = computeNextReview("partially_correct", 0, now);
    expect(partialSched.intervalDays).toBe(1);
    expect(isDueForRevision("partially_correct", partialSched.nextReviewAt, now)).toBe(true);

    const pass1 = computeNextReview("completely_correct", 0, now);
    expect(pass1.intervalDays).toBe(2);
    expect(isDueForRevision("completely_correct", pass1.nextReviewAt, now)).toBe(false);

    const pass2 = computeNextReview("acceptable_alternative", pass1.intervalDays, now);
    expect(pass2.intervalDays).toBe(5);
  });
});

describe("Phase 2 · Interactive Self-learning Pace Studio UI", () => {
  it("supports all 5 learning modes, auto-queues incorrect attempts into Revision Queue, and accepts revised alternative translations", async () => {
    render(
      <I18nProvider locale="en" theme="light">
        <SelfLearningStudio initialLevel="A1" />
      </I18nProvider>,
    );

    expect(screen.getByRole("heading", { level: 1, name: /Self-learning Pace/i })).toBeTruthy();
    expect(screen.getByText(/Sentence 1 of 100/i)).toBeTruthy();

    const firstA1 = SELF_LEARNING_BY_LEVEL.A1[0]!;
    expect(screen.getByText(firstA1.arabic)).toBeTruthy();

    // 1. Submit an incorrect translation -> lands in Revision Queue
    const input = screen.getByLabelText(/Your English translation/i);
    fireEvent.change(input, { target: { value: "The blue car is swimming." } });
    fireEvent.click(screen.getByRole("button", { name: /Evaluate Translation/i }));

    expect((await screen.findAllByText(/Needs Revision/i)).length).toBeGreaterThan(0);
    expect(screen.getByRole("tab", { name: /4\. Revision Queue \(1\)/i })).toBeTruthy();

    // 2. Revise & resubmit using an acceptable alternative -> accepted without penalty & clears queue
    fireEvent.change(input, { target: { value: firstA1.alternatives[0] } });
    fireEvent.click(screen.getByRole("button", { name: /Evaluate Translation/i }));

    expect((await screen.findAllByText(/Acceptable Alternative/i)).length).toBeGreaterThan(0);
    expect(screen.getByRole("tab", { name: /4\. Revision Queue \(0\)/i })).toBeTruthy();
    expect(learnerStorage.getSelfLearning().records[firstA1.id]?.status).toBe(
      "acceptable_alternative",
    );

    // 3. Switch to Topic-based, Random, and Daily Challenge modes cleanly
    fireEvent.click(screen.getByRole("tab", { name: /2\. Topic-based/i }));
    expect(screen.getByText(/Filter by topic/i)).toBeTruthy();

    fireEvent.click(screen.getByRole("tab", { name: /3\. Random Practice/i }));
    expect(screen.getByRole("button", { name: /New random order/i })).toBeTruthy();

    fireEvent.click(screen.getByRole("tab", { name: /5\. Daily Challenge/i }));
    expect(screen.getByText(/Today's Challenge: 0 \/ 10 completed/i)).toBeTruthy();
  });
});
