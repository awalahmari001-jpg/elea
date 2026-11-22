import { describe, expect, it } from "vitest";

import { ALL_COURSES, CEFR_LEVELS, COURSES } from "@/content/courses";
import { ALL_QUESTIONS, QUESTION_BANK } from "@/content/placement-questions";
import { addCourse } from "@/lib/learner-storage";
import {
  TEST_LENGTH,
  clampToNeighbour,
  drawTest,
  isValidTest,
  levelFromScore,
  questionsFor,
  scorePlacement,
} from "@/lib/placement";

describe("question bank", () => {
  it("has 60 questions for every level (360 in total)", () => {
    for (const level of CEFR_LEVELS) expect(QUESTION_BANK[level], level).toHaveLength(60);
    expect(ALL_QUESTIONS).toHaveLength(360);
  });

  it("every question has 4 different options, a CEFR focus and an English + Arabic explanation", () => {
    const ids = new Set<string>();
    for (const q of ALL_QUESTIONS) {
      expect(ids.has(q.id), `duplicate ${q.id}`).toBe(false);
      ids.add(q.id);
      expect(new Set(q.options.map((o) => o.toLowerCase())).size, q.id).toBe(4);
      expect(q.focus.length, q.id).toBeGreaterThan(0);
      expect(q.explanation.en.length, q.id).toBeGreaterThan(0);
      expect(q.explanation.ar, q.id).toMatch(/[\u0600-\u06FF]/);
    }
  });
});

describe("drawing a test", () => {
  it("each test has 60 questions: 10 from every level", () => {
    const ids = drawTest();
    expect(ids).toHaveLength(60);
    expect(TEST_LENGTH).toBe(60);
    for (const level of CEFR_LEVELS) {
      expect(questionsFor(ids).filter((q) => q.level === level), level).toHaveLength(10);
    }
    expect(isValidTest(ids)).toBe(true);
  });

  it("rejects a test with the wrong mix of levels", () => {
    const allA1 = [...QUESTION_BANK.A1.map((q) => q.id)];
    expect(isValidTest(allA1)).toBe(false);
  });
});

describe("scoring by total score bands", () => {
  it.each([
    [0, "A1"],
    [10, "A1"],
    [11, "A2"],
    [20, "A2"],
    [21, "B1"],
    [30, "B1"],
    [31, "B2"],
    [40, "B2"],
    [41, "C1"],
    [50, "C1"],
    [51, "C2"],
    [60, "C2"],
  ] as const)("%i correct → %s", (score, level) => {
    expect(levelFromScore(score)).toBe(level);
  });

  it("counts only correct answers", () => {
    const qs = questionsFor(drawTest());
    const answers = Object.fromEntries(qs.slice(0, 25).map((q) => [q.id, q.options[0]!]));
    expect(scorePlacement(qs, answers).total).toBe(25);
    expect(scorePlacement(qs, answers).level).toBe("B1");
  });
});

describe("AI safety rule", () => {
  it("the AI can move the level by at most one step", () => {
    expect(clampToNeighbour("A1", "C2")).toBe("A2");
    expect(clampToNeighbour("B2", "A1")).toBe("B1");
    expect(clampToNeighbour("B1", "B2")).toBe("B2");
  });
});

describe("courses", () => {
  it("offers six level courses A1–C2 plus a separate Speaking course", () => {
    expect(COURSES.map((c) => c.level)).toEqual(["A1", "A2", "B1", "B2", "C1", "C2"]);
    expect(ALL_COURSES.filter((c) => c.kind === "skill").map((c) => c.slug)).toEqual(["speaking"]);
  });

  it("a learner keeps one level course; Speaking can be added on top", () => {
    let joined = addCourse([], "a2");
    joined = addCourse(joined, "speaking");
    joined = addCourse(joined, "b1");
    expect(joined.sort()).toEqual(["b1", "speaking"]);
  });
});
