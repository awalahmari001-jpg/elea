import { LEVEL_LESSONS } from "./level-lessons";
import { IELTS_LESSONS } from "./ielts-lessons";
import { KIDS_LESSONS } from "./kids-lessons";
import { ADULTS_LESSONS } from "./adults-lessons";
import { enrichLesson } from "./lesson-enrichment";
export type { Lesson, LessonCourse, LessonSkill } from "./lesson-types";

export const LESSONS = [...LEVEL_LESSONS, ...IELTS_LESSONS, ...KIDS_LESSONS, ...ADULTS_LESSONS].map(
  enrichLesson,
);
export function findLesson(id: string) {
  return LESSONS.find((lesson) => lesson.id === id);
}
export function courseLessons(course: string) {
  return LESSONS.filter((lesson) => lesson.course === course);
}
