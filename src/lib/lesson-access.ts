import { ALL_COURSES, type CourseSlug } from "@/content/courses";
import { LESSONS, type Lesson } from "@/content/lessons";
import { SPEAKING_SITUATIONS } from "@/content/speaking-situations";

/**
 * Lesson access rule: the first lesson of every course is a free preview for
 * everyone; the rest unlock when the learner joins (pays for) that course.
 * Joined courses live in localStorage until accounts exist.
 */

/** Every course a learner can join to unlock lessons: levels, Speaking and the three paths. */
export type JoinableCourse = CourseSlug | "kids" | "adults" | "ielts";

export const JOINABLE_COURSES: JoinableCourse[] = [
  ...ALL_COURSES.map((c) => c.slug),
  "kids",
  "adults",
  "ielts",
];

export function isJoinableCourse(value: string): value is JoinableCourse {
  return (JOINABLE_COURSES as string[]).includes(value);
}

/** The first lesson of each course (in curriculum order) is free for everyone. */
const FREE_LESSON_IDS = new Set(
  JOINABLE_COURSES.map((course) => LESSONS.find((lesson) => lesson.course === course)?.id).filter(
    (id): id is string => Boolean(id),
  ),
);

/** The first speaking situation is free; the rest need the Speaking course. */
export const FREE_SPEAKING_ID = SPEAKING_SITUATIONS[0]?.id ?? "";

export function isLessonFree(lesson: Lesson): boolean {
  return FREE_LESSON_IDS.has(lesson.id);
}

export function isLessonUnlocked(lesson: Lesson, joined: string[]): boolean {
  return isLessonFree(lesson) || joined.includes(lesson.course);
}

export function isSpeakingUnlocked(situationId: string, joined: string[]): boolean {
  return situationId === FREE_SPEAKING_ID || joined.includes("speaking");
}

/** Ids of the locked lessons in a list, for badges on lesson cards. */
export function lockedLessonIds(lessons: Lesson[], joined: string[]): Set<string> {
  return new Set(
    lessons.filter((lesson) => !isLessonUnlocked(lesson, joined)).map((lesson) => lesson.id),
  );
}

/** Where a locked lesson sends the learner to join its course. */
export function courseHome(
  lesson: Lesson,
):
  | { to: "/kids" | "/adults" | "/ielts" }
  | { to: "/courses/$level"; params: { level: CourseSlug } } {
  if (lesson.course === "kids") return { to: "/kids" };
  if (lesson.course === "adults") return { to: "/adults" };
  if (lesson.course === "ielts") return { to: "/ielts" };
  return { to: "/courses/$level", params: { level: lesson.course as CourseSlug } };
}

/**
 * Business English Course access rule: the first module in each track is a free
 * preview; the rest unlock once the learner joins the Business English Course.
 */
export function isBusinessItemUnlocked(index: number, joinedBusiness: boolean): boolean {
  return index === 0 || joinedBusiness;
}
