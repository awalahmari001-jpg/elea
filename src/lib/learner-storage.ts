import { ALL_COURSES } from "@/content/courses";
import { isJoinableCourse, type JoinableCourse } from "./lesson-access";
import type { PlacementAnswers, PlacementResult } from "./placement";

/**
 * Saves the learner's test progress, result and chosen course in this browser.
 * When accounts are added, these move to the learner's account.
 */
const KEYS = {
  progress: "ele.placement.progress",
  result: "ele.placement.result",
  courses: "ele.courses.joined",
  review: "ele.placement.review",
} as const;

function read<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  if (value === null) window.localStorage.removeItem(key);
  else window.localStorage.setItem(key, JSON.stringify(value));
}

export type PlacementProgress = {
  questionIds: string[];
  index: number;
  answers: PlacementAnswers;
};

/** The last finished test's questions + answers, for the answer review. */
export type PlacementReview = { questionIds: string[]; answers: PlacementAnswers };

export const learnerStorage = {
  getReview: () => read<PlacementReview>(KEYS.review),
  setReview: (r: PlacementReview | null) => write(KEYS.review, r),
  getProgress: () => read<PlacementProgress>(KEYS.progress),
  setProgress: (p: PlacementProgress | null) => write(KEYS.progress, p),
  getResult: () => read<PlacementResult>(KEYS.result),
  setResult: (r: PlacementResult | null) => write(KEYS.result, r),
  getCourses: (): JoinableCourse[] => {
    const v = read<unknown>(KEYS.courses);
    return Array.isArray(v)
      ? v.filter((x): x is JoinableCourse => typeof x === "string" && isJoinableCourse(x))
      : [];
  },
  setCourses: (slugs: JoinableCourse[]) => write(KEYS.courses, slugs),
};

/**
 * Joining rule: a learner has at most ONE level course (A1–C2) at a time, plus
 * any number of skills courses and paths (Speaking, Kids, Adults, IELTS).
 * Joining a new level replaces the old level.
 */
export function addCourse(current: JoinableCourse[], slug: JoinableCourse): JoinableCourse[] {
  const kindOf = (s: JoinableCourse) => ALL_COURSES.find((c) => c.slug === s)?.kind;
  const kind = kindOf(slug);
  const kept = current.filter((s) => s !== slug && (kind !== "level" || kindOf(s) !== "level"));
  return [...kept, slug];
}
