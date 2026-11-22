import { describe, expect, it } from "vitest";
import { courseLessons, LESSONS } from "@/content/lessons";
import { SPEAKING_SITUATIONS } from "@/content/speaking-situations";
import {
  FREE_SPEAKING_ID,
  JOINABLE_COURSES,
  isLessonFree,
  isLessonUnlocked,
  isSpeakingUnlocked,
  lockedLessonIds,
} from "@/lib/lesson-access";

describe("first lesson free, rest locked until the course is joined", () => {
  it("every joinable course has lessons and exactly one free lesson", () => {
    for (const course of JOINABLE_COURSES) {
      if (course === "speaking") continue; // speaking uses situations, not lessons
      const lessons = courseLessons(course);
      expect(lessons.length, course).toBeGreaterThanOrEqual(3);
      expect(lessons.filter(isLessonFree).length, course).toBe(1);
    }
  });
  it("the free lesson is the first lesson in curriculum order", () => {
    for (const course of JOINABLE_COURSES) {
      if (course === "speaking") continue;
      const first = courseLessons(course)[0];
      expect(first && isLessonFree(first), course).toBe(true);
    }
  });
  it("locked lessons open only after joining their own course", () => {
    const locked = courseLessons("b1").filter((lesson) => !isLessonFree(lesson));
    expect(locked.length).toBeGreaterThan(0);
    for (const lesson of locked) {
      expect(isLessonUnlocked(lesson, [])).toBe(false);
      expect(isLessonUnlocked(lesson, ["a1", "kids"])).toBe(false);
      expect(isLessonUnlocked(lesson, ["b1"])).toBe(true);
    }
  });
  it("free lessons stay open without joining anything", () => {
    for (const lesson of LESSONS.filter(isLessonFree))
      expect(isLessonUnlocked(lesson, []), lesson.id).toBe(true);
  });
  it("lockedLessonIds lists every non-free lesson when nothing is joined", () => {
    const lessons = courseLessons("ielts");
    expect(lockedLessonIds(lessons, []).size).toBe(lessons.length - 1);
    expect(lockedLessonIds(lessons, ["ielts"]).size).toBe(0);
  });
  it("the first speaking situation is free and the rest need the Speaking course", () => {
    expect(FREE_SPEAKING_ID).toBe(SPEAKING_SITUATIONS[0]?.id);
    expect(isSpeakingUnlocked(FREE_SPEAKING_ID, [])).toBe(true);
    const paid = SPEAKING_SITUATIONS[1];
    expect(paid).toBeDefined();
    if (!paid) return;
    expect(isSpeakingUnlocked(paid.id, [])).toBe(false);
    expect(isSpeakingUnlocked(paid.id, ["speaking"])).toBe(true);
  });
});

describe("kids and adults cover all four skills plus grammar", () => {
  for (const course of ["kids", "adults"] as const) {
    it(`${course} has grammar, reading, listening, writing and speaking lessons`, () => {
      const skills = new Set(courseLessons(course).map((lesson) => lesson.skill));
      for (const skill of ["grammar", "reading", "listening", "writing", "speaking"])
        expect(skills.has(skill as never), `${course} ${skill}`).toBe(true);
    });
    it(`${course} lessons are substantive`, () => {
      for (const lesson of courseLessons(course)) {
        expect(lesson.teaching.length, lesson.id).toBeGreaterThanOrEqual(2);
        expect(lesson.questions.length, lesson.id).toBeGreaterThanOrEqual(2);
        expect(lesson.pronunciation.length, lesson.id).toBeGreaterThan(10);
        expect(lesson.pronunciationTip.ar.length, lesson.id).toBeGreaterThan(5);
      }
    });
  }
});
