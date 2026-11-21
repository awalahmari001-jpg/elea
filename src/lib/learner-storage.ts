import { isCourseSlug, type CourseSlug } from "@/content/courses";
import type { PlacementAnswers, PlacementResult } from "./placement";

/**
 * Saves the learner's test progress, result and chosen course in this browser.
 * When accounts are added, these move to the learner's account.
 */
const KEYS = {
  progress: "ele.placement.progress",
  result: "ele.placement.result",
  course: "ele.course.joined",
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

export type PlacementProgress = { index: number; answers: PlacementAnswers };

export const learnerStorage = {
  getProgress: () => read<PlacementProgress>(KEYS.progress),
  setProgress: (p: PlacementProgress | null) => write(KEYS.progress, p),
  getResult: () => read<PlacementResult>(KEYS.result),
  setResult: (r: PlacementResult | null) => write(KEYS.result, r),
  getCourse: (): CourseSlug | null => {
    const v = read<string>(KEYS.course);
    return v && isCourseSlug(v) ? v : null;
  },
  setCourse: (slug: CourseSlug) => write(KEYS.course, slug),
};
