import { describe, expect, it } from "vitest";
import { courseLessons, findLesson, LESSONS } from "@/content/lessons";
import { IELTS_LESSONS } from "@/content/ielts-lessons";
import { SPEAKING_SITUATIONS, SPEAKING_CATEGORIES } from "@/content/speaking-situations";
import { compareRecognition, wordCount } from "@/lib/speech";

describe("requested curriculum", () => {
  for (const course of ["a1", "a2", "b1", "b2", "c1", "c2"]) {
    it(`${course.toUpperCase()} has at least 30 detailed TBLL lessons across all 5 skills`, () => {
      const lessons = courseLessons(course);
      expect(lessons.length).toBeGreaterThanOrEqual(30);
      expect(new Set(lessons.map((l) => l.id)).size).toBe(lessons.length);
      expect(new Set(lessons.map((l) => l.title.en)).size).toBe(lessons.length);
      expect(new Set(lessons.map((l) => l.title.ar)).size).toBe(lessons.length);
      for (const skill of ["grammar", "reading", "listening", "writing", "speaking"]) {
        expect(lessons.filter((l) => l.skill === skill).length, `${course} ${skill}`).toBeGreaterThanOrEqual(6);
      }
      for (const lesson of lessons) {
        expect(lesson.taskPlan, lesson.id).toBeDefined();
        expect(lesson.vocab?.length ?? 0, lesson.id).toBeGreaterThanOrEqual(4);
        expect(lesson.teaching.length, lesson.id).toBeGreaterThanOrEqual(2);
        expect(lesson.questions.length, lesson.id).toBeGreaterThanOrEqual(4);
        expect(lesson.pronunciation.length, lesson.id).toBeGreaterThan(15);
      }
    });
  }

  it("provides at least 15 distinct reading passages with 10+ varied questions (vocab, synonyms, antonyms, comprehension) and ASR pronunciation", () => {
    const passages = LESSONS.filter((l) => l.isReadingPassage);
    expect(passages.length).toBeGreaterThanOrEqual(15);
    expect(new Set(passages.map((p) => p.title.en)).size).toBe(passages.length);
    for (const passage of passages) {
      expect(passage.questions.length, passage.id).toBeGreaterThanOrEqual(10);
      const kinds = new Set(passage.questions.map((q) => q.kind));
      expect(kinds.has("comprehension"), `${passage.id} comprehension`).toBe(true);
      expect(kinds.has("vocabulary"), `${passage.id} vocabulary`).toBe(true);
      expect(kinds.has("synonym"), `${passage.id} synonym`).toBe(true);
      expect(kinds.has("antonym"), `${passage.id} antonym`).toBe(true);
      expect(passage.vocab?.length ?? 0, passage.id).toBeGreaterThanOrEqual(6);
      expect(passage.pronunciation.length, passage.id).toBeGreaterThan(20);
    }
  });

  it("provides level-based acoustic listening plans with spoken-to-equivalent meaning pairs and vocab across A1–C2", () => {
    const listeningLessons = LESSONS.filter((l) => l.listeningPlan);
    expect(listeningLessons.length).toBeGreaterThanOrEqual(36);
    for (const lesson of listeningLessons) {
      expect(lesson.listeningPlan?.levelEncouragement.en.length, lesson.id).toBeGreaterThan(30);
      expect(lesson.listeningPlan?.levelEncouragement.ar.length, lesson.id).toBeGreaterThan(20);
      expect(lesson.listeningPlan?.acousticsFocus.en.length, lesson.id).toBeGreaterThan(30);
      expect(lesson.listeningPlan?.steps.length, lesson.id).toBeGreaterThanOrEqual(3);
      expect(lesson.listeningPlan?.paraphrasePairs.length, lesson.id).toBeGreaterThanOrEqual(4);
      expect(lesson.vocab?.length ?? 0, lesson.id).toBeGreaterThanOrEqual(4);
    }
  });

  for (const skill of ["listening", "reading", "writing", "speaking"]) {
    it(`IELTS includes ${skill} lessons`, () => {
      expect(
        IELTS_LESSONS.filter((lesson) => lesson.skill === skill).length,
      ).toBeGreaterThanOrEqual(2);
    });
  }
  it("provides at least 60 unique speaking settings across CEFR levels A1–C2", () => {
    expect(SPEAKING_SITUATIONS.length).toBeGreaterThanOrEqual(60);
    expect(new Set(SPEAKING_SITUATIONS.map((s) => s.id)).size).toBe(SPEAKING_SITUATIONS.length);
    expect(new Set(SPEAKING_SITUATIONS.map((s) => s.title.en)).size).toBe(
      SPEAKING_SITUATIONS.length,
    );
    const levels = new Set(SPEAKING_SITUATIONS.map((s) => s.level));
    for (const lv of ["A1", "A2", "B1", "B2", "C1", "C2"]) {
      expect(levels.has(lv), lv).toBe(true);
    }
  });
  it("has contextual multi-turn practice across all five settings", () => {
    for (const category of SPEAKING_CATEGORIES)
      expect(SPEAKING_SITUATIONS.filter((s) => s.category === category).length).toBeGreaterThanOrEqual(12);
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
