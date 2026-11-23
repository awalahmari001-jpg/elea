import { ALL_COURSES, type CefrLevel } from "@/content/courses";
import type { SelfLearningTopicId, TranslationVerdict } from "@/content/self-learning/types";
import type { CefrMasteryIndicatorId } from "@/content/vocab/vocab-types";
import { isJoinableCourse, type JoinableCourse } from "./lesson-access";
import type { PlacementAnswers, PlacementResult } from "./placement";
import { computeNextReview } from "./translation-fallback";

/**
 * Saves the learner's test progress, result, courses, vocabulary mastery, CEFR mastery,
 * and Self-learning Pace history in this browser. When accounts are added, these move to the learner's account.
 */
const KEYS = {
  progress: "ele.placement.progress",
  result: "ele.placement.result",
  courses: "ele.courses.joined",
  review: "ele.placement.review",
  assessments: "ele.assessments.results",
  ieltsVocab: "ele.ielts.vocab",
  cefrMastery: "ele.cefr.mastery",
  selfLearning: "ele.self.learning",
  business: "ele.business.course",
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

export interface SelfLearningSentenceRecord {
  id: string;
  level: CefrLevel;
  topic: SelfLearningTopicId;
  grammarFocus: string;
  keyVocab: string[];
  status: TranslationVerdict;
  lastScore: number;
  attemptsCount: number;
  correctCount: number;
  lastResponse: string;
  intervalDays: number;
  nextReviewAt: string;
  updatedAt: string;
}

export interface SelfLearningProgress {
  records: Record<string, SelfLearningSentenceRecord>;
  totalSecondsSpent: number;
  dailyDate: string;
  dailyCompletedIds: string[];
  updatedAt: string;
}

export function classifyAwareness(score: number, total = 10): AwarenessBand {
  const ratio = total > 0 ? score / total : 0;
  if (ratio >= 0.9) return "mastery";
  if (ratio >= 0.7) return "proficient";
  if (ratio >= 0.5) return "developing";
  return "review";
}

function emptySelfLearning(): SelfLearningProgress {
  return {
    records: {},
    totalSecondsSpent: 0,
    dailyDate: "",
    dailyCompletedIds: [],
    updatedAt: "",
  };
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
  getSelfLearning: (): SelfLearningProgress => {
    const saved = read<SelfLearningProgress>(KEYS.selfLearning);
    if (!saved || typeof saved !== "object") return emptySelfLearning();
    return {
      records: saved.records && typeof saved.records === "object" ? saved.records : {},
      totalSecondsSpent: typeof saved.totalSecondsSpent === "number" ? saved.totalSecondsSpent : 0,
      dailyDate: typeof saved.dailyDate === "string" ? saved.dailyDate : "",
      dailyCompletedIds: Array.isArray(saved.dailyCompletedIds) ? saved.dailyCompletedIds : [],
      updatedAt: typeof saved.updatedAt === "string" ? saved.updatedAt : "",
    };
  },
  saveSelfLearningAttempt: (input: {
    id: string;
    level: CefrLevel;
    topic: SelfLearningTopicId;
    grammarFocus: string;
    keyVocab: string[];
    verdict: TranslationVerdict;
    score: number;
    learnerResponse: string;
    isDaily?: boolean;
    todayIso?: string;
  }): SelfLearningProgress => {
    const current = learnerStorage.getSelfLearning();
    const prev = current.records[input.id];
    const isCorrect =
      input.verdict === "completely_correct" || input.verdict === "acceptable_alternative";
    const schedule = computeNextReview(input.verdict, prev?.intervalDays ?? 0);
    const nowIso = new Date().toISOString();
    const today = input.todayIso ?? nowIso.slice(0, 10);

    const dailyIds =
      input.isDaily && isCorrect
        ? current.dailyDate === today
          ? Array.from(new Set([...current.dailyCompletedIds, input.id]))
          : [input.id]
        : current.dailyDate === today
          ? current.dailyCompletedIds
          : [];

    const next: SelfLearningProgress = {
      records: {
        ...current.records,
        [input.id]: {
          id: input.id,
          level: input.level,
          topic: input.topic,
          grammarFocus: input.grammarFocus,
          keyVocab: input.keyVocab,
          status: input.verdict,
          lastScore: input.score,
          attemptsCount: (prev?.attemptsCount ?? 0) + 1,
          correctCount: (prev?.correctCount ?? 0) + (isCorrect ? 1 : 0),
          lastResponse: input.learnerResponse,
          intervalDays: schedule.intervalDays,
          nextReviewAt: schedule.nextReviewAt,
          updatedAt: nowIso,
        },
      },
      totalSecondsSpent: current.totalSecondsSpent,
      dailyDate: today,
      dailyCompletedIds: dailyIds,
      updatedAt: nowIso,
    };
    write(KEYS.selfLearning, next);
    return next;
  },
  addSelfLearningSeconds: (seconds: number): SelfLearningProgress => {
    const current = learnerStorage.getSelfLearning();
    const next: SelfLearningProgress = {
      ...current,
      totalSecondsSpent: current.totalSecondsSpent + Math.max(0, Math.round(seconds)),
      updatedAt: new Date().toISOString(),
    };
    write(KEYS.selfLearning, next);
    return next;
  },
  getBusiness: (): BusinessCourseProgress => {
    const saved = read<BusinessCourseProgress>(KEYS.business);
    if (!saved || typeof saved !== "object") {
      return {
        joined: false,
        masteredVocabIds: [],
        completedSkillIds: [],
        completedMeetingIds: [],
        practicedInterviewIds: [],
        updatedAt: "",
      };
    }
    return {
      joined: Boolean(saved.joined),
      masteredVocabIds: Array.isArray(saved.masteredVocabIds) ? saved.masteredVocabIds : [],
      completedSkillIds: Array.isArray(saved.completedSkillIds) ? saved.completedSkillIds : [],
      completedMeetingIds: Array.isArray(saved.completedMeetingIds)
        ? saved.completedMeetingIds
        : [],
      practicedInterviewIds: Array.isArray(saved.practicedInterviewIds)
        ? saved.practicedInterviewIds
        : [],
      updatedAt: typeof saved.updatedAt === "string" ? saved.updatedAt : "",
    };
  },
  saveBusiness: (nextData: Omit<BusinessCourseProgress, "updatedAt">): BusinessCourseProgress => {
    const next: BusinessCourseProgress = {
      joined: nextData.joined,
      masteredVocabIds: Array.from(new Set(nextData.masteredVocabIds)),
      completedSkillIds: Array.from(new Set(nextData.completedSkillIds)),
      completedMeetingIds: Array.from(new Set(nextData.completedMeetingIds)),
      practicedInterviewIds: Array.from(new Set(nextData.practicedInterviewIds)),
      updatedAt: new Date().toISOString(),
    };
    write(KEYS.business, next);
    return next;
  },
};

export interface BusinessCourseProgress {
  joined: boolean;
  masteredVocabIds: string[];
  completedSkillIds: string[];
  completedMeetingIds: string[];
  practicedInterviewIds: string[];
  updatedAt: string;
}

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
