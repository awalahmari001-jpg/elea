import { ALL_COURSES, type CefrLevel } from "@/content/courses";
import type { CefrMasteryIndicatorId } from "@/content/vocab/vocab-types";
import { isJoinableCourse, type JoinableCourse } from "./lesson-access";
import type { PlacementAnswers, PlacementResult } from "./placement";

/**
 * Saves the learner's test progress, result, courses, vocabulary mastery, and CEFR mastery
 * in this browser. When accounts are added, these move to the learner's account.
 */
const KEYS = {
  progress: "ele.placement.progress",
  result: "ele.placement.result",
  courses: "ele.courses.joined",
  review: "ele.placement.review",
  assessments: "ele.assessments.results",
  ieltsVocab: "ele.ielts.vocab",
  cefrMastery: "ele.cefr.mastery",
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

export type AssessmentKind = "post";
export type AwarenessBand = "mastery" | "proficient" | "developing" | "review";

export interface AssessmentAttempt {
  score: number;
  total: number;
  awarenessBand: AwarenessBand;
  completedAt: string;
}

export type AssessmentRecord = Partial<Record<AssessmentKind, AssessmentAttempt>>;
export type AllAssessmentRecords = Record<string, AssessmentRecord>;

export interface IeltsVocabProgress {
  masteredIds: string[];
  quizBestScore: number;
  completedModes: string[];
  updatedAt: string;
}

export interface CefrLevelMasteryRecord {
  passedIndicators: CefrMasteryIndicatorId[];
  updatedAt: string;
}

export type CefrMasteryProgress = Partial<Record<CefrLevel, CefrLevelMasteryRecord>>;

export function classifyAwareness(score: number, total = 10): AwarenessBand {
  const ratio = total > 0 ? score / total : 0;
  if (ratio >= 0.9) return "mastery";
  if (ratio >= 0.7) return "proficient";
  if (ratio >= 0.5) return "developing";
  return "review";
}

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
  getAssessments: (): AllAssessmentRecords => read<AllAssessmentRecords>(KEYS.assessments) ?? {},
  saveAssessment: (course: string, kind: AssessmentKind, score: number, total = 10) => {
    const all = read<AllAssessmentRecords>(KEYS.assessments) ?? {};
    const next: AllAssessmentRecords = {
      ...all,
      [course]: {
        ...(all[course] ?? {}),
        [kind]: {
          score,
          total,
          awarenessBand: classifyAwareness(score, total),
          completedAt: new Date().toISOString(),
        },
      },
    };
    write(KEYS.assessments, next);
    return next;
  },
  getIeltsVocab: (): IeltsVocabProgress => {
    const saved = read<IeltsVocabProgress>(KEYS.ieltsVocab);
    if (!saved) {
      return { masteredIds: [], quizBestScore: 0, completedModes: [], updatedAt: "" };
    }
    return {
      masteredIds: Array.isArray(saved.masteredIds) ? saved.masteredIds : [],
      quizBestScore: typeof saved.quizBestScore === "number" ? saved.quizBestScore : 0,
      completedModes: Array.isArray(saved.completedModes) ? saved.completedModes : [],
      updatedAt: typeof saved.updatedAt === "string" ? saved.updatedAt : "",
    };
  },
  saveIeltsVocab: (progress: Omit<IeltsVocabProgress, "updatedAt">): IeltsVocabProgress => {
    const next: IeltsVocabProgress = {
      masteredIds: Array.from(new Set(progress.masteredIds)),
      quizBestScore: progress.quizBestScore,
      completedModes: Array.from(new Set(progress.completedModes)),
      updatedAt: new Date().toISOString(),
    };
    write(KEYS.ieltsVocab, next);
    return next;
  },
  getCefrMastery: (): CefrMasteryProgress => read<CefrMasteryProgress>(KEYS.cefrMastery) ?? {},
  saveCefrIndicator: (level: CefrLevel, indicator: CefrMasteryIndicatorId): CefrMasteryProgress => {
    const all = read<CefrMasteryProgress>(KEYS.cefrMastery) ?? {};
    const prev = all[level]?.passedIndicators ?? [];
    const next: CefrMasteryProgress = {
      ...all,
      [level]: {
        passedIndicators: Array.from(new Set([...prev, indicator])),
        updatedAt: new Date().toISOString(),
      },
    };
    write(KEYS.cefrMastery, next);
    return next;
  },
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
