import { describe, expect, it } from "vitest";
import { courseLessons, LESSONS } from "@/content/lessons";
import { isLessonFree, isLessonUnlocked } from "@/lib/lesson-access";
import { wordCount } from "@/lib/speech";

describe("expanded IELTS, Kids and Adults four-skill curricula", () => {
  for (const course of ["ielts", "kids", "adults"] as const) {
    for (const skill of ["listening", "reading", "writing", "speaking"] as const) {
      it(`${course} offers at least 30 different ${skill} topics`, () => {
        const lessons = courseLessons(course).filter((lesson) => lesson.skill === skill);
        expect(lessons.length).toBeGreaterThanOrEqual(30);
        expect(new Set(lessons.map((lesson) => lesson.title.en)).size).toBe(lessons.length);
        expect(new Set(lessons.map((lesson) => lesson.title.ar)).size).toBe(lessons.length);
        for (const lesson of lessons) {
          expect(lesson.teaching.length, lesson.id).toBeGreaterThanOrEqual(2);
          expect(lesson.questions.length, lesson.id).toBeGreaterThan(0);
          expect(wordCount(lesson.example), lesson.id).toBeGreaterThan(15);
          if (skill === "writing") {
            expect(lesson.writing, lesson.id).toBeDefined();
            expect(wordCount(lesson.writing?.model ?? ""), lesson.id).toBeGreaterThanOrEqual(
              lesson.writing?.minimum ?? 1,
            );
          }
        }
      });
    }
    it(`${course} keeps new lessons locked unless that course is joined`, () => {
      const lessons = courseLessons(course);
      expect(lessons.filter(isLessonFree)).toHaveLength(1);
      for (const lesson of lessons.filter((entry) => !isLessonFree(entry))) {
        expect(isLessonUnlocked(lesson, []), lesson.id).toBe(false);
        expect(isLessonUnlocked(lesson, [course]), lesson.id).toBe(true);
        expect(isLessonUnlocked(lesson, [course === "kids" ? "adults" : "kids"]), lesson.id).toBe(
          false,
        );
      }
    });
  }

  it("preserves the original free preview in each expanded course", () => {
    expect(courseLessons("kids")[0]?.id).toBe("kids-alphabet-colours");
    expect(courseLessons("adults")[0]?.id).toBe("adults-small-talk");
    expect(courseLessons("ielts")[0]?.id).toBe("ielts-listening-details");
  });

  it("every lesson id is unique and each answer points to a distinct valid option", () => {
    expect(new Set(LESSONS.map((lesson) => lesson.id)).size).toBe(LESSONS.length);
    for (const lesson of LESSONS) {
      for (const question of lesson.questions) {
        expect(question.options[question.correct], lesson.id).toBeDefined();
        expect(new Set(question.options).size, lesson.id).toBe(question.options.length);
      }
    }
  });
});
