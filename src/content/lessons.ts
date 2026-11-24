import { LEVEL_LESSONS } from "./level-lessons";
import { IELTS_LESSONS } from "./ielts-lessons";
import { KIDS_LESSONS } from "./kids-lessons";
import { ADULTS_LESSONS } from "./adults-lessons";
import { expandCourseTo50PerSkill } from "./curriculum-expansion";
import { enrichLesson } from "./lesson-enrichment";
import type { Lesson, LessonCourse } from "./lesson-types";

export type { Lesson, LessonCourse, LessonSkill } from "./lesson-types";

const RAW_BY_COURSE: Record<LessonCourse, Lesson[]> = {
  a1: LEVEL_LESSONS.filter((l) => l.course === "a1"),
  a2: LEVEL_LESSONS.filter((l) => l.course === "a2"),
  b1: LEVEL_LESSONS.filter((l) => l.course === "b1"),
  b2: LEVEL_LESSONS.filter((l) => l.course === "b2"),
  c1: LEVEL_LESSONS.filter((l) => l.course === "c1"),
  c2: LEVEL_LESSONS.filter((l) => l.course === "c2"),
  ielts: IELTS_LESSONS,
  kids: KIDS_LESSONS,
  adults: ADULTS_LESSONS,
};

/**
 * Full website curriculum: >= 50 lessons per skill (grammar, reading, listening,
 * writing, speaking) across all 6 CEFR levels (A1–C2) and all learner genres
 * (Kids, Adults, IELTS) = 2,250+ fully enriched TBLL lessons, with every original
 * free-preview and authored lesson preserved first in each course.
 */
export const LESSONS: Lesson[] = (
  ["a1", "a2", "b1", "b2", "c1", "c2", "ielts", "kids", "adults"] as const
).flatMap((course) => expandCourseTo50PerSkill(course, RAW_BY_COURSE[course]).map(enrichLesson));

const LESSON_BY_ID = new Map<string, Lesson>(LESSONS.map((lesson) => [lesson.id, lesson]));
const LESSONS_BY_COURSE = new Map<string, Lesson[]>();
for (const lesson of LESSONS) {
  const bucket = LESSONS_BY_COURSE.get(lesson.course);
  if (bucket) bucket.push(lesson);
  else LESSONS_BY_COURSE.set(lesson.course, [lesson]);
}

export function findLesson(id: string) {
  return LESSON_BY_ID.get(id);
}

export function courseLessons(course: string) {
  return LESSONS_BY_COURSE.get(course) ?? [];
}
