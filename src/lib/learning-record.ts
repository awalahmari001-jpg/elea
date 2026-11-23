import { ALL_COURSES, CEFR_LEVELS, type CefrLevel } from "@/content/courses";
import { courseLessons, findLesson, type Lesson, type LessonSkill } from "@/content/lessons";
import type { Bilingual } from "@/content/lesson-types";
import { computeUnifiedProgress } from "@/lib/learner-progress";
import { learnerStorage } from "@/lib/learner-storage";

export type LessonStatus =
  "not_started" | "in_progress" | "completed" | "mastered" | "requires_revision";

export interface LessonProgressRecord {
  lessonId: string;
  course: string;
  skill: LessonSkill;
  title: Bilingual;
  unit?: Bilingual;
  status: LessonStatus;
  exerciseScore?: number;
  exerciseTotal?: number;
  postEvalScore?: number;
  postEvalTotal?: number;
  masteredObjectives?: number;
  totalObjectives?: number;
  minutes: number;
  lastAccessedAt: string;
  completedAt?: string;
}

export interface LastActivityCursor {
  type: "lesson" | "course" | "ielts" | "self-learning" | "business" | "workshop";
  id: string;
  course?: string;
  title: Bilingual;
  moduleLabel?: Bilingual;
  to:
    | "/lessons/$lesson"
    | "/courses/$level"
    | "/ielts"
    | "/self-learning"
    | "/business"
    | "/workshops"
    | "/courses";
  lessonParam?: string;
  levelParam?: string;
  updatedAt: string;
}

export interface WeeklyGoalsConfig {
  lessonsTarget: number;
  vocabTarget: number;
  grammarTarget: number;
  speakingMinutesTarget: number;
  assessmentsTarget: number;
  workshopsTarget: number;
}

export type ActivityKind =
  | "lesson"
  | "vocab"
  | "grammar"
  | "reading"
  | "listening"
  | "speaking"
  | "writing"
  | "assessment"
  | "workshop"
  | "self-learning";

export interface StudyActivityEvent {
  id: string;
  date: string; // YYYY-MM-DD
  kind: ActivityKind;
  count: number;
  minutes: number;
  passed?: boolean;
  recordedAt: string;
}

export interface JourneySnapshot {
  lessons: Record<string, LessonProgressRecord>;
  cursor: LastActivityCursor | null;
  weeklyGoals: WeeklyGoalsConfig;
  activityLog: StudyActivityEvent[];
}

export const DEFAULT_WEEKLY_GOALS: WeeklyGoalsConfig = {
  lessonsTarget: 5,
  vocabTarget: 50,
  grammarTarget: 3,
  speakingMinutesTarget: 60,
  assessmentsTarget: 1,
  workshopsTarget: 1,
};

const JOURNEY_KEYS = {
  lessons: "ele.journey.lessons",
  cursor: "ele.journey.cursor",
  goals: "ele.journey.goals",
  activity: "ele.journey.activity",
} as const;

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  if (value === null) window.localStorage.removeItem(key);
  else window.localStorage.setItem(key, JSON.stringify(value));
}

function clampGoal(n: number, min: number, max: number, fallback: number): number {
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, Math.round(n)));
}

function makeEventId(): string {
  return `act-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export const learningRecord = {
  getLessonMap: (): Record<string, LessonProgressRecord> => {
    const raw = readJson<Record<string, LessonProgressRecord>>(JOURNEY_KEYS.lessons);
    return raw && typeof raw === "object" ? raw : {};
  },

  getLessonRecord: (lessonId: string): LessonProgressRecord | null => {
    const map = learningRecord.getLessonMap();
    return map[lessonId] ?? null;
  },

  getLessonStatus: (lessonId: string): LessonStatus => {
    return learningRecord.getLessonRecord(lessonId)?.status ?? "not_started";
  },

  getLastCursor: (): LastActivityCursor | null => {
    return readJson<LastActivityCursor>(JOURNEY_KEYS.cursor);
  },

  setLastCursor: (cursor: LastActivityCursor | null): void => {
    writeJson(JOURNEY_KEYS.cursor, cursor);
  },

  getWeeklyGoals: (): WeeklyGoalsConfig => {
    const saved = readJson<Partial<WeeklyGoalsConfig>>(JOURNEY_KEYS.goals);
    if (!saved || typeof saved !== "object") return { ...DEFAULT_WEEKLY_GOALS };
    return {
      lessonsTarget: clampGoal(
        saved.lessonsTarget ?? DEFAULT_WEEKLY_GOALS.lessonsTarget,
        1,
        30,
        DEFAULT_WEEKLY_GOALS.lessonsTarget,
      ),
      vocabTarget: clampGoal(
        saved.vocabTarget ?? DEFAULT_WEEKLY_GOALS.vocabTarget,
        5,
        300,
        DEFAULT_WEEKLY_GOALS.vocabTarget,
      ),
      grammarTarget: clampGoal(
        saved.grammarTarget ?? DEFAULT_WEEKLY_GOALS.grammarTarget,
        1,
        25,
        DEFAULT_WEEKLY_GOALS.grammarTarget,
      ),
      speakingMinutesTarget: clampGoal(
        saved.speakingMinutesTarget ?? DEFAULT_WEEKLY_GOALS.speakingMinutesTarget,
        10,
        600,
        DEFAULT_WEEKLY_GOALS.speakingMinutesTarget,
      ),
      assessmentsTarget: clampGoal(
        saved.assessmentsTarget ?? DEFAULT_WEEKLY_GOALS.assessmentsTarget,
        1,
        10,
        DEFAULT_WEEKLY_GOALS.assessmentsTarget,
      ),
      workshopsTarget: clampGoal(
        saved.workshopsTarget ?? DEFAULT_WEEKLY_GOALS.workshopsTarget,
        1,
        10,
        DEFAULT_WEEKLY_GOALS.workshopsTarget,
      ),
    };
  },

  saveWeeklyGoals: (goals: WeeklyGoalsConfig): WeeklyGoalsConfig => {
    const sanitized: WeeklyGoalsConfig = {
      lessonsTarget: clampGoal(goals.lessonsTarget, 1, 30, DEFAULT_WEEKLY_GOALS.lessonsTarget),
      vocabTarget: clampGoal(goals.vocabTarget, 5, 300, DEFAULT_WEEKLY_GOALS.vocabTarget),
      grammarTarget: clampGoal(goals.grammarTarget, 1, 25, DEFAULT_WEEKLY_GOALS.grammarTarget),
      speakingMinutesTarget: clampGoal(
        goals.speakingMinutesTarget,
        10,
        600,
        DEFAULT_WEEKLY_GOALS.speakingMinutesTarget,
      ),
      assessmentsTarget: clampGoal(
        goals.assessmentsTarget,
        1,
        10,
        DEFAULT_WEEKLY_GOALS.assessmentsTarget,
      ),
      workshopsTarget: clampGoal(
        goals.workshopsTarget,
        1,
        10,
        DEFAULT_WEEKLY_GOALS.workshopsTarget,
      ),
    };
    writeJson(JOURNEY_KEYS.goals, sanitized);
    return sanitized;
  },

  getActivityLog: (): StudyActivityEvent[] => {
    const raw = readJson<StudyActivityEvent[]>(JOURNEY_KEYS.activity);
    return Array.isArray(raw) ? raw : [];
  },

  logActivity: (input: {
    kind: ActivityKind;
    count?: number;
    minutes?: number;
    passed?: boolean;
    nowIso?: string;
  }): StudyActivityEvent[] => {
    const nowIso = input.nowIso ?? new Date().toISOString();
    const prev = learningRecord.getActivityLog();
    const entry: StudyActivityEvent = {
      id: makeEventId(),
      date: nowIso.slice(0, 10),
      kind: input.kind,
      count: Math.max(1, Math.round(input.count ?? 1)),
      minutes: Math.max(0, Math.round(input.minutes ?? 0)),
      ...(input.passed !== undefined ? { passed: input.passed } : {}),
      recordedAt: nowIso,
    };
    const next = [entry, ...prev].slice(0, 400);
    writeJson(JOURNEY_KEYS.activity, next);
    return next;
  },

  markLessonOpened: (
    lesson: Lesson,
    nowIso: string = new Date().toISOString(),
  ): LessonProgressRecord => {
    const map = learningRecord.getLessonMap();
    const prev = map[lesson.id];
    const next: LessonProgressRecord = {
      lessonId: lesson.id,
      course: lesson.course,
      skill: lesson.skill,
      title: lesson.title,
      ...(lesson.unit ? { unit: lesson.unit } : {}),
      status: prev ? prev.status : "in_progress",
      ...(prev?.exerciseScore !== undefined ? { exerciseScore: prev.exerciseScore } : {}),
      ...(prev?.exerciseTotal !== undefined ? { exerciseTotal: prev.exerciseTotal } : {}),
      ...(prev?.postEvalScore !== undefined ? { postEvalScore: prev.postEvalScore } : {}),
      ...(prev?.postEvalTotal !== undefined ? { postEvalTotal: prev.postEvalTotal } : {}),
      ...(prev?.masteredObjectives !== undefined
        ? { masteredObjectives: prev.masteredObjectives }
        : {}),
      ...(prev?.totalObjectives !== undefined ? { totalObjectives: prev.totalObjectives } : {}),
      minutes: lesson.minutes,
      lastAccessedAt: nowIso,
      ...(prev?.completedAt ? { completedAt: prev.completedAt } : {}),
    };
    writeJson(JOURNEY_KEYS.lessons, { ...map, [lesson.id]: next });
    learningRecord.setLastCursor({
      type: "lesson",
      id: lesson.id,
      course: lesson.course,
      title: lesson.title,
      ...(lesson.unit ? { moduleLabel: lesson.unit } : {}),
      to: "/lessons/$lesson",
      lessonParam: lesson.id,
      updatedAt: nowIso,
    });
    return next;
  },

  recordLessonExercises: (
    lesson: Lesson,
    score: number,
    total: number,
    nowIso: string = new Date().toISOString(),
  ): LessonProgressRecord => {
    const map = learningRecord.getLessonMap();
    const prev = map[lesson.id];
    const ratio = total > 0 ? score / total : 0;
    const derivedStatus: LessonStatus =
      prev?.status === "mastered"
        ? "mastered"
        : ratio < 0.5 && total > 0
          ? "requires_revision"
          : prev?.status === "completed"
            ? "completed"
            : "in_progress";

    const next: LessonProgressRecord = {
      lessonId: lesson.id,
      course: lesson.course,
      skill: lesson.skill,
      title: lesson.title,
      ...(lesson.unit ? { unit: lesson.unit } : {}),
      status: derivedStatus,
      exerciseScore: score,
      exerciseTotal: total,
      ...(prev?.postEvalScore !== undefined ? { postEvalScore: prev.postEvalScore } : {}),
      ...(prev?.postEvalTotal !== undefined ? { postEvalTotal: prev.postEvalTotal } : {}),
      ...(prev?.masteredObjectives !== undefined
        ? { masteredObjectives: prev.masteredObjectives }
        : {}),
      ...(prev?.totalObjectives !== undefined ? { totalObjectives: prev.totalObjectives } : {}),
      minutes: lesson.minutes,
      lastAccessedAt: nowIso,
      ...(prev?.completedAt ? { completedAt: prev.completedAt } : {}),
    };
    writeJson(JOURNEY_KEYS.lessons, { ...map, [lesson.id]: next });
    learningRecord.logActivity({
      kind: lesson.skill,
      count: 1,
      minutes: Math.max(3, Math.round(lesson.minutes / 2)),
      passed: ratio >= 0.7,
      nowIso,
    });
    return next;
  },

  markLessonCompleted: (
    lesson: Lesson,
    nowIso: string = new Date().toISOString(),
  ): LessonProgressRecord => {
    const map = learningRecord.getLessonMap();
    const prev = map[lesson.id];
    // Completion never overwrites mastery and never hides a failed post-evaluation
    const nextStatus: LessonStatus =
      prev?.status === "mastered"
        ? "mastered"
        : prev?.status === "requires_revision"
          ? "requires_revision"
          : "completed";

    const next: LessonProgressRecord = {
      lessonId: lesson.id,
      course: lesson.course,
      skill: lesson.skill,
      title: lesson.title,
      ...(lesson.unit ? { unit: lesson.unit } : {}),
      status: nextStatus,
      ...(prev?.exerciseScore !== undefined ? { exerciseScore: prev.exerciseScore } : {}),
      ...(prev?.exerciseTotal !== undefined ? { exerciseTotal: prev.exerciseTotal } : {}),
      ...(prev?.postEvalScore !== undefined ? { postEvalScore: prev.postEvalScore } : {}),
      ...(prev?.postEvalTotal !== undefined ? { postEvalTotal: prev.postEvalTotal } : {}),
      ...(prev?.masteredObjectives !== undefined
        ? { masteredObjectives: prev.masteredObjectives }
        : {}),
      ...(prev?.totalObjectives !== undefined ? { totalObjectives: prev.totalObjectives } : {}),
      minutes: lesson.minutes,
      lastAccessedAt: nowIso,
      completedAt: prev?.completedAt ?? nowIso,
    };
    writeJson(JOURNEY_KEYS.lessons, { ...map, [lesson.id]: next });
    learningRecord.logActivity({
      kind: "lesson",
      count: 1,
      minutes: lesson.minutes,
      passed: true,
      nowIso,
    });
    learningRecord.setLastCursor({
      type: "lesson",
      id: lesson.id,
      course: lesson.course,
      title: lesson.title,
      ...(lesson.unit ? { moduleLabel: lesson.unit } : {}),
      to: "/lessons/$lesson",
      lessonParam: lesson.id,
      updatedAt: nowIso,
    });
    return next;
  },

  recordLessonPostEval: (input: {
    lessonId: string;
    course: string;
    skill: LessonSkill;
    title: Bilingual;
    unit?: Bilingual;
    minutes?: number;
    score: number;
    total: number;
    masteredObjectives: number;
    totalObjectives: number;
    nowIso?: string;
  }): LessonProgressRecord => {
    const nowIso = input.nowIso ?? new Date().toISOString();
    const map = learningRecord.getLessonMap();
    const prev = map[input.lessonId];
    const ratio = input.total > 0 ? input.score / input.total : 0;
    // Clear separation: >=75% = mastered, 50-74% = completed, <50% = requires_revision
    const status: LessonStatus =
      ratio >= 0.75 ? "mastered" : ratio >= 0.5 ? "completed" : "requires_revision";

    const next: LessonProgressRecord = {
      lessonId: input.lessonId,
      course: input.course,
      skill: input.skill,
      title: input.title,
      ...(input.unit ? { unit: input.unit } : prev?.unit ? { unit: prev.unit } : {}),
      status,
      ...(prev?.exerciseScore !== undefined ? { exerciseScore: prev.exerciseScore } : {}),
      ...(prev?.exerciseTotal !== undefined ? { exerciseTotal: prev.exerciseTotal } : {}),
      postEvalScore: input.score,
      postEvalTotal: input.total,
      masteredObjectives: input.masteredObjectives,
      totalObjectives: input.totalObjectives,
      minutes: input.minutes ?? prev?.minutes ?? 10,
      lastAccessedAt: nowIso,
      ...(status === "mastered" || status === "completed"
        ? { completedAt: prev?.completedAt ?? nowIso }
        : {}),
    };
    writeJson(JOURNEY_KEYS.lessons, { ...map, [input.lessonId]: next });
    learningRecord.logActivity({
      kind: "assessment",
      count: 1,
      minutes: 8,
      passed: ratio >= 0.75,
      nowIso,
    });
    return next;
  },

  exportJourney: (): JourneySnapshot => ({
    lessons: learningRecord.getLessonMap(),
    cursor: learningRecord.getLastCursor(),
    weeklyGoals: learningRecord.getWeeklyGoals(),
    activityLog: learningRecord.getActivityLog(),
  }),

  applyJourney: (snapshot: Partial<JourneySnapshot> | undefined): void => {
    if (!snapshot) return;
    if (snapshot.lessons && typeof snapshot.lessons === "object") {
      writeJson(JOURNEY_KEYS.lessons, snapshot.lessons);
    }
    if (snapshot.cursor !== undefined) {
      writeJson(JOURNEY_KEYS.cursor, snapshot.cursor);
    }
    if (snapshot.weeklyGoals) {
      learningRecord.saveWeeklyGoals(snapshot.weeklyGoals);
    }
    if (Array.isArray(snapshot.activityLog)) {
      writeJson(JOURNEY_KEYS.activity, snapshot.activityLog.slice(0, 400));
    }
  },

  clearJourney: (): void => {
    for (const key of Object.values(JOURNEY_KEYS)) {
      writeJson(key, null);
    }
  },
};

// ---------------------------------------------------------------------------
// Learning Streak (with 1-day flexible grace tolerance)
// ---------------------------------------------------------------------------

export interface LearningStreakSummary {
  currentDays: number;
  longestDays: number;
  activeToday: boolean;
  graceDayUsed: boolean;
}

function dayDiff(dateA: string, dateB: string): number {
  const msA = Date.parse(`${dateA}T00:00:00Z`);
  const msB = Date.parse(`${dateB}T00:00:00Z`);
  return Math.round((msA - msB) / 86_400_000);
}

export function computeLearningStreak(
  datesIso: string[],
  todayIso: string = new Date().toISOString().slice(0, 10),
): LearningStreakSummary {
  const uniqueDays = Array.from(
    new Set(datesIso.map((d) => d.slice(0, 10)).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))),
  ).sort((a, b) => b.localeCompare(a)); // newest first

  if (uniqueDays.length === 0) {
    return { currentDays: 0, longestDays: 0, activeToday: false, graceDayUsed: false };
  }

  const activeToday = uniqueDays[0] === todayIso;
  const gapFromToday = dayDiff(todayIso, uniqueDays[0]!);

  // Allow up to 2 days gap from today (missed yesterday = 1 grace day used)
  let currentDays = 0;
  let graceDayUsed = false;
  if (gapFromToday <= 2) {
    if (gapFromToday === 2) graceDayUsed = true;
    currentDays = 1;
    let graceLeft = graceDayUsed ? 0 : 1;
    for (let i = 1; i < uniqueDays.length; i++) {
      const gap = dayDiff(uniqueDays[i - 1]!, uniqueDays[i]!);
      if (gap === 1) {
        currentDays += 1;
      } else if (gap === 2 && graceLeft > 0) {
        graceLeft -= 1;
        graceDayUsed = true;
        currentDays += 1;
      } else {
        break;
      }
    }
  }

  // Longest streak across history
  let longestDays = 1;
  let run = 1;
  for (let i = 1; i < uniqueDays.length; i++) {
    const gap = dayDiff(uniqueDays[i - 1]!, uniqueDays[i]!);
    if (gap === 1) {
      run += 1;
      if (run > longestDays) longestDays = run;
    } else {
      run = 1;
    }
  }

  return {
    currentDays,
    longestDays: Math.max(longestDays, currentDays),
    activeToday,
    graceDayUsed,
  };
}

// ---------------------------------------------------------------------------
// Central "My Learning Dashboard" Aggregator
// ---------------------------------------------------------------------------

export interface CefrRailNode {
  level: CefrLevel;
  isAssessed: boolean;
  isStudying: boolean;
  isCompleted: boolean;
  isNextTarget: boolean;
  lessonsCompleted: number;
  lessonsMastered: number;
  lessonsTotal: number;
  completionPct: number;
  masteryPct: number;
}

export interface ContinueLearningCardData {
  hasHistory: boolean;
  courseSlug: string;
  courseTitle: Bilingual;
  lastCompletedTitle: Bilingual | null;
  currentModuleLabel: Bilingual | null;
  courseCompletionPct: number;
  nextLessonId: string | null;
  nextLessonTitle: Bilingual | null;
  resumeTo: "/lessons/$lesson" | "/courses/$level" | "/courses";
  resumeLessonParam?: string;
  resumeLevelParam?: string;
}

export interface WeeklyGoalItem {
  id: "lessons" | "vocab" | "grammar" | "speakingMinutes" | "assessments" | "workshops";
  completed: number;
  target: number;
  remaining: number;
  pct: number;
}

export interface DashboardRecommendation {
  id: string;
  priority: "high" | "medium" | "normal";
  reason: Bilingual;
  title: Bilingual;
  to:
    | "/lessons/$lesson"
    | "/courses/$level"
    | "/level-test"
    | "/self-learning"
    | "/ielts-vocabulary"
    | "/cefr-mastery"
    | "/business"
    | "/workshops"
    | "/speaking";
  lessonParam?: string;
  levelParam?: string;
}

export interface LearnerDashboardOverview {
  learnerName: string;
  targetGoal: string;
  assessedLevel: CefrLevel | null;
  studyingLevel: CefrLevel;
  nextTargetLevel: CefrLevel;
  enrolledCourses: { slug: string; title: Bilingual }[];
  streak: LearningStreakSummary;
  totalLearningHours: number;
  totalLearningMinutes: number;
  activityCompletionPct: number;
  assessedMasteryPct: number;
  cefrRail: CefrRailNode[];
  continueCard: ContinueLearningCardData;
  weeklyGoalsConfig: WeeklyGoalsConfig;
  weeklyGoals: WeeklyGoalItem[];
  activitySummary: {
    lessonsCompleted: number;
    lessonsMastered: number;
    lessonsNeedsRevision: number;
    vocabLearned: number;
    exercisesAttempted: number;
    exercisesPassed: number;
    speakingCompleted: number;
    writingCompleted: number;
    workshopsAttended: number;
    totalStudyMinutes: number;
  };
  recommendations: DashboardRecommendation[];
}

function clampPct(v: number): number {
  return Math.max(0, Math.min(100, Math.round(v)));
}

export function computeDashboardOverview(
  nowIso: string = new Date().toISOString(),
): LearnerDashboardOverview {
  const snapshot = learnerStorage.exportSnapshot();
  const unified = computeUnifiedProgress(snapshot, nowIso);
  const journey = learningRecord.exportJourney();
  const lessonRecords = Object.values(journey.lessons);
  const todayIso = nowIso.slice(0, 10);

  // Determine assessed vs studying vs target CEFR levels
  const assessedLevel = unified.placement.level;
  const enrolledLevelCourse = snapshot.courses.find((slug) =>
    CEFR_LEVELS.includes(slug.toUpperCase() as CefrLevel),
  );
  const studyingLevel: CefrLevel = enrolledLevelCourse
    ? (enrolledLevelCourse.toUpperCase() as CefrLevel)
    : (assessedLevel ?? "A1");

  const studyingIdx = CEFR_LEVELS.indexOf(studyingLevel);
  const nextTargetLevel: CefrLevel =
    CEFR_LEVELS[Math.min(CEFR_LEVELS.length - 1, studyingIdx + 1)]!;

  // Build CEFR A1–C2 Progression Rail (strictly mastery-gated: completion alone NEVER promotes!)
  const cefrRail: CefrRailNode[] = CEFR_LEVELS.map((level) => {
    const slug = level.toLowerCase();
    const levelLessons = courseLessons(slug);
    const total = levelLessons.length;
    const completed = levelLessons.filter((l) => {
      const st = journey.lessons[l.id]?.status;
      return st === "completed" || st === "mastered";
    }).length;
    const mastered = levelLessons.filter(
      (l) => journey.lessons[l.id]?.status === "mastered",
    ).length;
    const completionPct = total > 0 ? clampPct((completed / total) * 100) : 0;

    const cefrIndicatorsPassed = snapshot.cefrMastery[level]?.passedIndicators.length ?? 0;
    const postAssessment = snapshot.assessments[slug]?.post;
    const postAssessmentPct = postAssessment
      ? Math.round((postAssessment.score / Math.max(1, postAssessment.total)) * 100)
      : 0;

    // Mastery combines verified CEFR indicators + mastered lessons + post-assessment
    const lessonMasteryPct = total > 0 ? Math.round((mastered / total) * 100) : 0;
    const indicatorPct = Math.round((cefrIndicatorsPassed / 7) * 100);
    const masteryPct = clampPct(
      Math.max(
        indicatorPct,
        Math.round(lessonMasteryPct * 0.5 + indicatorPct * 0.3 + postAssessmentPct * 0.2),
      ),
    );

    // Level is ONLY marked completed when assessment mastery is demonstrated (never just opened lessons)
    const isCompleted =
      (postAssessmentPct >= 70 && (mastered > 0 || cefrIndicatorsPassed >= 4)) ||
      (cefrIndicatorsPassed >= 6 && completionPct >= 50);

    return {
      level,
      isAssessed: assessedLevel === level,
      isStudying: studyingLevel === level,
      isCompleted,
      isNextTarget: nextTargetLevel === level && studyingLevel !== level,
      lessonsCompleted: completed,
      lessonsMastered: mastered,
      lessonsTotal: total,
      completionPct,
      masteryPct,
    };
  });

  // Separate Activity Completion % vs Assessed Mastery % for the active CEFR pathway
  const activeRail = cefrRail.find((r) => r.level === studyingLevel) ?? cefrRail[0]!;
  const activityCompletionPct = activeRail.completionPct;
  const assessedMasteryPct = activeRail.masteryPct;

  // Continue Where You Left Off card
  const activeCourseSlug = journey.cursor?.course ?? studyingLevel.toLowerCase();
  const activeCourseMeta = ALL_COURSES.find((c) => c.slug === activeCourseSlug);
  const activeCourseLessons = courseLessons(activeCourseSlug);
  const completedInActiveCourse = activeCourseLessons.filter((l) => {
    const st = journey.lessons[l.id]?.status;
    return st === "completed" || st === "mastered";
  });
  const courseCompletionPct =
    activeCourseLessons.length > 0
      ? clampPct((completedInActiveCourse.length / activeCourseLessons.length) * 100)
      : 0;

  const sortedCompleted = [...lessonRecords]
    .filter((r) => r.status === "completed" || r.status === "mastered")
    .sort((a, b) =>
      (b.completedAt ?? b.lastAccessedAt).localeCompare(a.completedAt ?? a.lastAccessedAt),
    );
  const lastCompleted = sortedCompleted[0] ?? null;

  const inProgressLesson = [...lessonRecords]
    .filter((r) => r.status === "in_progress" || r.status === "requires_revision")
    .sort((a, b) => b.lastAccessedAt.localeCompare(a.lastAccessedAt))[0];

  const firstUncompletedInCourse =
    activeCourseLessons.find((l) => {
      const st = journey.lessons[l.id]?.status;
      return st !== "completed" && st !== "mastered";
    }) ?? activeCourseLessons[0];

  const resumeLessonObj =
    (inProgressLesson ? findLesson(inProgressLesson.lessonId) : undefined) ??
    firstUncompletedInCourse;

  const continueCard: ContinueLearningCardData = {
    hasHistory: Boolean(journey.cursor || lessonRecords.length > 0),
    courseSlug: activeCourseSlug,
    courseTitle: activeCourseMeta?.name ?? {
      en: `${activeCourseSlug.toUpperCase()} Course`,
      ar: `دورة ${activeCourseSlug.toUpperCase()}`,
    },
    lastCompletedTitle: lastCompleted?.title ?? null,
    currentModuleLabel: resumeLessonObj?.unit ?? journey.cursor?.moduleLabel ?? null,
    courseCompletionPct,
    nextLessonId: resumeLessonObj?.id ?? null,
    nextLessonTitle: resumeLessonObj?.title ?? null,
    resumeTo: resumeLessonObj
      ? "/lessons/$lesson"
      : activeCourseMeta
        ? "/courses/$level"
        : "/courses",
    ...(resumeLessonObj ? { resumeLessonParam: resumeLessonObj.id } : {}),
    ...(!resumeLessonObj && activeCourseMeta ? { resumeLevelParam: activeCourseMeta.slug } : {}),
  };

  // Activity dates across all modules for Streak
  const allActivityDates: string[] = [
    ...journey.activityLog.map((e) => e.date),
    ...lessonRecords.map((r) => r.lastAccessedAt.slice(0, 10)),
    ...Object.values(snapshot.selfLearning.records).map((r) => r.updatedAt.slice(0, 10)),
    ...snapshot.workshops.map((w) => w.completedAt.slice(0, 10)),
    ...Object.values(snapshot.assessments).flatMap((a) =>
      a.post?.completedAt ? [a.post.completedAt.slice(0, 10)] : [],
    ),
  ];
  const streak = computeLearningStreak(allActivityDates, todayIso);

  // Weekly activity window (last 7 days inclusive)
  const isWithin7Days = (isoOrDate: string): boolean => {
    const d = isoOrDate.slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return false;
    const diff = dayDiff(todayIso, d);
    return diff >= 0 && diff < 7;
  };

  const weeklyEvents = journey.activityLog.filter((e) => isWithin7Days(e.date));
  const weekLessons =
    weeklyEvents.filter((e) => e.kind === "lesson").reduce((s, e) => s + e.count, 0) ||
    lessonRecords.filter(
      (r) =>
        (r.status === "completed" || r.status === "mastered") && isWithin7Days(r.lastAccessedAt),
    ).length;

  const weekVocab =
    weeklyEvents.filter((e) => e.kind === "vocab").reduce((s, e) => s + e.count, 0) +
    (snapshot.ieltsVocab.updatedAt && isWithin7Days(snapshot.ieltsVocab.updatedAt)
      ? snapshot.ieltsVocab.masteredIds.length
      : 0) +
    (snapshot.business.updatedAt && isWithin7Days(snapshot.business.updatedAt)
      ? snapshot.business.masteredVocabIds.length
      : 0);

  const weekGrammar =
    weeklyEvents.filter((e) => e.kind === "grammar").reduce((s, e) => s + e.count, 0) +
    Object.values(snapshot.selfLearning.records).filter((r) => isWithin7Days(r.updatedAt)).length;

  const weekSpeakingMinutes =
    weeklyEvents.filter((e) => e.kind === "speaking").reduce((s, e) => s + e.minutes, 0) +
    snapshot.workshops.filter((w) => isWithin7Days(w.completedAt)).length * 10;

  const weekAssessments =
    weeklyEvents.filter((e) => e.kind === "assessment").reduce((s, e) => s + e.count, 0) +
    Object.values(snapshot.assessments).filter(
      (a) => a.post?.completedAt && isWithin7Days(a.post.completedAt),
    ).length;

  const weekWorkshops = snapshot.workshops.filter((w) => isWithin7Days(w.completedAt)).length;

  const weeklyGoalsConfig = journey.weeklyGoals;
  const makeGoal = (
    id: WeeklyGoalItem["id"],
    completed: number,
    target: number,
  ): WeeklyGoalItem => ({
    id,
    completed,
    target,
    remaining: Math.max(0, target - completed),
    pct: clampPct((completed / Math.max(1, target)) * 100),
  });

  const weeklyGoals: WeeklyGoalItem[] = [
    makeGoal("lessons", weekLessons, weeklyGoalsConfig.lessonsTarget),
    makeGoal("vocab", weekVocab, weeklyGoalsConfig.vocabTarget),
    makeGoal("grammar", weekGrammar, weeklyGoalsConfig.grammarTarget),
    makeGoal("speakingMinutes", weekSpeakingMinutes, weeklyGoalsConfig.speakingMinutesTarget),
    makeGoal("assessments", weekAssessments, weeklyGoalsConfig.assessmentsTarget),
    makeGoal("workshops", weekWorkshops, weeklyGoalsConfig.workshopsTarget),
  ];

  // Activity Summary
  const lessonsCompleted = lessonRecords.filter(
    (r) => r.status === "completed" || r.status === "mastered",
  ).length;
  const lessonsMastered = lessonRecords.filter((r) => r.status === "mastered").length;
  const lessonsNeedsRevision = lessonRecords.filter((r) => r.status === "requires_revision").length;

  const vocabLearned =
    unified.ieltsVocab.masteredCount +
    unified.business.vocabCount +
    unified.cefrMastery.passedCount * 4;

  const exerciseLessons = lessonRecords.filter((r) => r.exerciseTotal !== undefined);
  const exercisesAttempted = exerciseLessons.length + unified.selfLearning.attemptedCount;
  const exercisesPassed =
    exerciseLessons.filter((r) => (r.exerciseScore ?? 0) / Math.max(1, r.exerciseTotal ?? 1) >= 0.7)
      .length + unified.selfLearning.masteredCount;

  const speakingCompleted =
    lessonRecords.filter((r) => r.skill === "speaking" && r.status !== "not_started").length +
    unified.business.meetingsCount +
    unified.business.interviewsCount;

  const writingCompleted = lessonRecords.filter(
    (r) => r.skill === "writing" && (r.status === "completed" || r.status === "mastered"),
  ).length;

  const lessonMinutes = lessonRecords.reduce(
    (sum, r) =>
      sum +
      (r.status === "completed" || r.status === "mastered" ? r.minutes : Math.round(r.minutes / 2)),
    0,
  );
  const totalLearningMinutes = unified.totalStudyMinutes + lessonMinutes;
  const totalLearningHours = Math.round((totalLearningMinutes / 60) * 10) / 10;

  // Intelligent Actionable Recommendations
  const recommendations: DashboardRecommendation[] = [];

  const revisionLesson = lessonRecords.find((r) => r.status === "requires_revision");
  if (revisionLesson) {
    recommendations.push({
      id: `revise-${revisionLesson.lessonId}`,
      priority: "high",
      reason: {
        en: "Requires revision based on your last post-lesson evaluation score.",
        ar: "يحتاج مراجعة بناءً على نتيجتك الأخيرة في التقييم البعدي للدرس.",
      },
      title: revisionLesson.title,
      to: "/lessons/$lesson",
      lessonParam: revisionLesson.lessonId,
    });
  }

  if (!assessedLevel) {
    recommendations.push({
      id: "initial-placement",
      priority: "high",
      reason: {
        en: "Determine your estimated CEFR level before advancing through modules.",
        ar: "حدّد مستواك التقديري في CEFR قبل الانتقال بين الوحدات.",
      },
      title: {
        en: "Take the Estimated CEFR Placement Assessment",
        ar: "خُض اختبار تحديد المستوى التقديري CEFR",
      },
      to: "/level-test",
    });
  }

  if (unified.selfLearning.dueForRevisionCount > 0) {
    recommendations.push({
      id: "sl-revision-due",
      priority: "high",
      reason: {
        en: `${unified.selfLearning.dueForRevisionCount} translation sentence(s) scheduled for spaced repetition.`,
        ar: `${unified.selfLearning.dueForRevisionCount} جملة ترجمة مستحقة للمراجعة المتباعدة الآن.`,
      },
      title: {
        en: "Clear Your Self-learning Revision Queue",
        ar: "أنجز قائمة المراجعة في التعلّم الذاتي",
      },
      to: "/self-learning",
    });
  }

  if (resumeLessonObj) {
    recommendations.push({
      id: `next-${resumeLessonObj.id}`,
      priority: "medium",
      reason: {
        en: `Next step on your ${studyingLevel} pathway (${activityCompletionPct}% completed, ${assessedMasteryPct}% mastered).`,
        ar: `الخطوة التالية في مسار ${studyingLevel} (إنجاز ${activityCompletionPct}%، إتقان ${assessedMasteryPct}%).`,
      },
      title: resumeLessonObj.title,
      to: "/lessons/$lesson",
      lessonParam: resumeLessonObj.id,
    });
  }

  if (unified.workshops.totalSessions === 0) {
    recommendations.push({
      id: "try-workshop",
      priority: "normal",
      reason: {
        en: "Apply your grammar & speaking in a live AI workplace simulation.",
        ar: "طبّق قواعدك ومحادثتك في محاكاة حية لبيئة العمل بالذكاء الاصطناعي.",
      },
      title: {
        en: "Join Your First Interactive Business Workshop",
        ar: "شارك في أول ورشة أعمال تفاعلية",
      },
      to: "/workshops",
    });
  } else if (unified.ieltsVocab.masteredCount < 10) {
    recommendations.push({
      id: "boost-vocab",
      priority: "normal",
      reason: {
        en: "Strengthen Band 7+ collocations and academic register precision.",
        ar: "عزّز متلازمات الآيلتس 7+ والدقة الأكاديمية.",
      },
      title: {
        en: "Practise IELTS Band 7+ Vocabulary",
        ar: "تدرّب على مفردات الآيلتس 7+",
      },
      to: "/ielts-vocabulary",
    });
  }

  return {
    learnerName: snapshot.profile.displayName,
    targetGoal: snapshot.profile.targetGoal,
    assessedLevel,
    studyingLevel,
    nextTargetLevel,
    enrolledCourses: unified.placement.joinedCourses.map((c) => ({
      slug: c.slug,
      title: c.title,
    })),
    streak,
    totalLearningHours,
    totalLearningMinutes,
    activityCompletionPct,
    assessedMasteryPct,
    cefrRail,
    continueCard,
    weeklyGoalsConfig,
    weeklyGoals,
    activitySummary: {
      lessonsCompleted,
      lessonsMastered,
      lessonsNeedsRevision,
      vocabLearned,
      exercisesAttempted,
      exercisesPassed,
      speakingCompleted,
      writingCompleted,
      workshopsAttended: unified.workshops.totalSessions,
      totalStudyMinutes: totalLearningMinutes,
    },
    recommendations: recommendations.slice(0, 4),
  };
}
