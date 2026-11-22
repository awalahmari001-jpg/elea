import { describe, expect, it } from "vitest";
import { courseLessons, findLesson, LESSONS } from "@/content/lessons";
import { IELTS_LESSONS } from "@/content/ielts-lessons";
import { SPEAKING_SITUATIONS, SPEAKING_CATEGORIES } from "@/content/speaking-situations";
import { compareRecognition, wordCount } from "@/lib/speech";

describe("requested curriculum", () => {
  for (const course of ["a1", "a2", "b1", "b2", "c1", "c2"]) {
    it(`${course.toUpperCase()} has multiple substantive lessons`, () => {
      expect(courseLessons(course).length).toBeGreaterThanOrEqual(3);
      for (const lesson of courseLessons(course)) {
        expect(lesson.teaching.length).toBeGreaterThanOrEqual(2);
        expect(lesson.questions.length).toBeGreaterThanOrEqual(2);
        expect(lesson.pronunciation.length).toBeGreaterThan(10);
      }
    });
  }
  for (const skill of ["listening", "reading", "writing", "speaking"]) {
    it(`IELTS includes ${skill} lessons`, () => {
      expect(
        IELTS_LESSONS.filter((lesson) => lesson.skill === skill).length,
      ).toBeGreaterThanOrEqual(2);
    });
  }
  it("provides at least 40 unique speaking settings", () => {
    expect(SPEAKING_SITUATIONS.length).toBeGreaterThanOrEqual(40);
    expect(new Set(SPEAKING_SITUATIONS.map((s) => s.id)).size).toBe(SPEAKING_SITUATIONS.length);
    expect(new Set(SPEAKING_SITUATIONS.map((s) => s.title.en)).size).toBe(
      SPEAKING_SITUATIONS.length,
    );
  });
  it("has contextual multi-turn practice across all five settings", () => {
    for (const category of SPEAKING_CATEGORIES)
      expect(SPEAKING_SITUATIONS.filter((s) => s.category === category).length).toBe(8);
    for (const situation of SPEAKING_SITUATIONS) {
      expect(situation.turns.length).toBeGreaterThanOrEqual(3);
      expect(new Set(situation.turns.map((turn) => turn.prompt)).size).toBe(situation.turns.length);
      for (const turn of situation.turns) expect(wordCount(turn.model)).toBeGreaterThan(5);
    }
  });
  it("each practice question has a valid answer and bilingual explanation", () => {
    for (const lesson of LESSONS)
      for (const question of lesson.questions) {
        expect(question.correct).toBeGreaterThanOrEqual(0);
        expect(question.correct).toBeLessThan(question.options.length);
        expect(question.explanation.en.length).toBeGreaterThan(10);
        expect(question.explanation.ar.length).toBeGreaterThan(10);
      }
  });
  it("rejects unknown lesson ids", () => {
    expect(findLesson("not-a-lesson")).toBeUndefined();
  });
  it("all writing models meet their own task minimum", () => {
    for (const lesson of LESSONS) {
      if (!lesson.writing) continue;
      expect(wordCount(lesson.writing.model), lesson.id).toBeGreaterThanOrEqual(lesson.writing.minimum);
    }
  });
  it("IELTS Task 1 requires 150 words and supplies full models", () => {
    for (const id of ["ielts-writing-chart", "ielts-writing-letter"]) {
      const task = findLesson(id)?.writing;
      expect(task?.minimum).toBe(150);
      expect(wordCount(task?.model ?? "")).toBeGreaterThanOrEqual(150);
    }
  });
  it("IELTS Task 2 requires 250 words and supplies a full model", () => {
    const task = findLesson("ielts-writing-essay")?.writing;
    expect(task?.minimum).toBe(250);
    expect(wordCount(task?.model ?? "")).toBeGreaterThanOrEqual(250);
  });
});

describe("recognition comparison is word alignment, not pronunciation grading", () => {
  it("ignores case and punctuation", () => {
    expect(compareRecognition("Hello, Ali!", "hello ali")).toEqual({
      matched: ["hello", "ali"],
      missing: [],
      extra: [],
      total: 2,
    });
  });
  it("shows a substitution as a missing and an additional word", () => {
    expect(compareRecognition("I like coffee", "I like tea")).toEqual({
      matched: ["i", "like"],
      missing: ["coffee"],
      extra: ["tea"],
      total: 3,
    });
  });
  it("does not credit reordered or repeated words as a perfect match", () => {
    expect(compareRecognition("one two one", "one one two").matched.length).toBeLessThan(3);
  });
  it("handles no recognised words", () => {
    expect(compareRecognition("please help", "").missing).toEqual(["please", "help"]);
  });
});
