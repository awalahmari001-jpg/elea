import { CEFR_LEVELS, type CefrLevel } from "@/content/courses";
import type { Bilingual } from "@/content/lesson-types";
import { computeUnifiedProgress } from "@/lib/learner-progress";
import { learnerStorage } from "@/lib/learner-storage";
import { learningRecord } from "@/lib/learning-record";
import { computeSkillsAndAchievements } from "@/lib/skills-achievements";

export type LearningObjectiveId =
  | "general-english"
  | "reach-b1-b2"
  | "ielts-band-7"
  | "speaking-fluency"
  | "academic-writing"
  | "business-english"
  | "job-interview"
  | "pronunciation";

export type StudyDay = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface LearningObjectiveMeta {
  id: LearningObjectiveId;
  emoji: string;
  label: Bilingual;
  description: Bilingual;
}

export const LEARNING_OBJECTIVES: LearningObjectiveMeta[] = [
  {
    id: "general-english",
    emoji: "🌍",
    label: { en: "Everyday General English", ar: "الإنجليزية العامة اليومية" },
    description: {
      en: "Build balanced grammar, vocabulary, reading, and listening for daily life.",
      ar: "تطوير متوازن للقواعد والمفردات والقراءة والاستماع للحياة اليومية.",
    },
  },
  {
    id: "reach-b1-b2",
    emoji: "📈",
    label: { en: "Advance to Next CEFR Level", ar: "الانتقال إلى مستوى CEFR التالي" },
    description: {
      en: "Follow a structured roadmap from your current level to your target CEFR band.",
      ar: "اتّباع خريطة طريق منظمة من مستواك الحالي حتى مستوى CEFR المستهدف.",
    },
  },
  {
    id: "ielts-band-7",
    emoji: "🎓",
    label: { en: "IELTS Band 7.0+ Preparation", ar: "التحضير لآيلتس (Band 7.0+)" },
    description: {
      en: "Master Academic Listening, Reading, Writing Tasks 1 & 2, and Speaking Parts 1–3.",
      ar: "إتقان الاستماع والقراءة الأكاديمية ومهمتي الكتابة والمحادثة في الآيلتس.",
    },
  },
  {
    id: "speaking-fluency",
    emoji: "🗣️",
    label: { en: "Spoken Fluency & Confidence", ar: "الطلاقة والثقة في التحدث" },
    description: {
      en: "Practice guided real-life dialogues, spontaneous answers, and natural connectors.",
      ar: "تدريب على حوارات واقعية وردود تلقائية وروابط حديث طبيعية.",
    },
  },
  {
    id: "academic-writing",
    emoji: "✍️",
    label: { en: "Clear Academic & Structured Writing", ar: "الكتابة الأكاديمية والمنظمة" },
    description: {
      en: "Strengthen paragraph cohesion, formal register, grammar accuracy, and editing.",
      ar: "تقوية ترابط الفقرات والأسلوب الرسمي ودقة القواعد والمراجعة.",
    },
  },
  {
    id: "business-english",
    emoji: "💼",
    label: { en: "Business & Workplace English", ar: "إنجليزية الأعمال وبيئة العمل" },
    description: {
      en: "Emails, meetings, presentations, negotiations, and sector-specific terminology.",
      ar: "البريد المهني والاجتماعات والعروض والمفاوضات ومصطلحات القطاعات.",
    },
  },
  {
    id: "job-interview",
    emoji: "🤝",
    label: { en: "Job Interviews & Career Growth", ar: "مقابلات العمل والتطور المهني" },
    description: {
      en: "Prepare persuasive STAR stories, role-play workshops, and executive answers.",
      ar: "تحضير إجابات STAR مقنعة وورش محاكاة تفاعلية وإجابات احترافية.",
    },
  },
  {
    id: "pronunciation",
    emoji: "🎙️",
    label: { en: "Pronunciation & Clear Speech", ar: "النطق الواضح والتنغيم" },
    description: {
      en: "Drill sound clarity, sentence stress, connected speech, and shadowing practice.",
      ar: "تدريب على وضوح الأصوات ونبر الجمل والتظليل الصوتي.",
    },
  },
];

export const STUDY_DAYS_META: Array<{ id: StudyDay; short: Bilingual; full: Bilingual }> = [
  { id: "sun", short: { en: "Sun", ar: "أحد" }, full: { en: "Sunday", ar: "الأحد" } },
  { id: "mon", short: { en: "Mon", ar: "إثن" }, full: { en: "Monday", ar: "الإثنين" } },
  { id: "tue", short: { en: "Tue", ar: "ثلا" }, full: { en: "Tuesday", ar: "الثلاثاء" } },
  { id: "wed", short: { en: "Wed", ar: "أرب" }, full: { en: "Wednesday", ar: "الأربعاء" } },
  { id: "thu", short: { en: "Thu", ar: "خمي" }, full: { en: "Thursday", ar: "الخميس" } },
  { id: "fri", short: { en: "Fri", ar: "جمع" }, full: { en: "Friday", ar: "الجمعة" } },
  { id: "sat", short: { en: "Sat", ar: "سبت" }, full: { en: "Saturday", ar: "السبت" } },
];

export interface PersonalLearningPlan {
  objectives: LearningObjectiveId[];
  targetLevel: CefrLevel;
  studyDays: StudyDay[];
  dailyMinutes: 15 | 30 | 45 | 60;
  targetDate: string; // YYYY-MM-DD
  updatedAt: string;
}

export type RoadmapRouteTarget =
  | "/courses"
  | "/cefr-mastery"
  | "/ielts"
  | "/ielts-vocabulary"
  | "/business"
  | "/self-learning"
  | "/workshops"
  | "/speaking"
  | "/level-test";

export interface RoadmapStep {
  id: string;
  order: number;
  title: Bilingual;
  description: Bilingual;
  focusTag: Bilingual;
  to: RoadmapRouteTarget;
  completed: boolean;
  estimatedHours: number;
}

export interface WeeklyScheduleSlot {
  day: StudyDay;
  dayLabel: Bilingual;
  minutes: number;
  focus: Bilingual;
  activity: Bilingual;
  to: RoadmapRouteTarget;
}

export type CalendarEventKind =
  "lesson" | "target" | "assessment" | "mock" | "workshop" | "revision" | "deadline";

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  kind: CalendarEventKind;
  completed: boolean;
  notes?: string;
  linkTo?: string;
}

export interface SmartRemindersConfig {
  dailyTargets: boolean;
  incompleteLessons: boolean;
  scheduledAssessments: boolean;
  revisionActivities: boolean;
  upcomingWorkshops: boolean;
  weeklyProgressReports: boolean;
  preferredTime: string; // HH:MM
}

export interface ActiveReminderBanner {
  id: string;
  category: keyof Omit<SmartRemindersConfig, "preferredTime">;
  priority: "high" | "normal";
  title: Bilingual;
  detail: Bilingual;
  ctaLabel: Bilingual;
  to: string;
}

const PLAN_KEYS = {
  plan: "ele.journey.plan",
  calendar: "ele.journey.calendar",
  reminders: "ele.journey.reminders",
} as const;

export const DEFAULT_REMINDERS_CONFIG: SmartRemindersConfig = {
  dailyTargets: true,
  incompleteLessons: true,
  scheduledAssessments: true,
  revisionActivities: true,
  upcomingWorkshops: true,
  weeklyProgressReports: true,
  preferredTime: "19:00",
};

function addDaysIso(baseDate: Date, offsetDays: number): string {
  const d = new Date(baseDate.getTime() + offsetDays * 86_400_000);
  return d.toISOString().slice(0, 10);
}

export function defaultPersonalPlan(nowIso?: string): PersonalLearningPlan {
  const now = nowIso ? new Date(nowIso) : new Date();
  return {
    objectives: ["general-english", "reach-b1-b2", "speaking-fluency"],
    targetLevel: "B2",
    studyDays: ["sun", "mon", "tue", "wed", "thu"],
    dailyMinutes: 30,
    targetDate: addDaysIso(now, 90),
    updatedAt: "",
  };
}

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
  window.localStorage.setItem(key, JSON.stringify(value));
}

function buildSeedCalendarEvents(plan: PersonalLearningPlan, nowIso?: string): CalendarEvent[] {
  const now = nowIso ? new Date(nowIso) : new Date();
  const events: CalendarEvent[] = [
    {
      id: "seed-daily-target",
      title: `Daily ${plan.dailyMinutes}-min ${plan.targetLevel} Core Lesson`,
      date: addDaysIso(now, 0),
      kind: "lesson",
      completed: false,
      notes: "Focus on vocabulary + guided grammar practice.",
      linkTo: "/courses",
    },
    {
      id: "seed-revision",
      title: "Spaced Repetition & Error History Revision",
      date: addDaysIso(now, 1),
      kind: "revision",
      completed: false,
      notes: "Review recent quiz mistakes and saved sentences.",
      linkTo: "/self-learning",
    },
    {
      id: "seed-workshop",
      title:
        plan.objectives.includes("business-english") || plan.objectives.includes("job-interview")
          ? "Interactive Business Role-Play Workshop"
          : "Guided Speaking Fluency Session",
      date: addDaysIso(now, 2),
      kind: "workshop",
      completed: false,
      linkTo:
        plan.objectives.includes("business-english") || plan.objectives.includes("job-interview")
          ? "/workshops"
          : "/speaking",
    },
    {
      id: "seed-assessment",
      title: plan.objectives.includes("ielts-band-7")
        ? "IELTS Practice Mock Check"
        : `CEFR ${plan.targetLevel} Module Assessment`,
      date: addDaysIso(now, 4),
      kind: plan.objectives.includes("ielts-band-7") ? "mock" : "assessment",
      completed: false,
      linkTo: plan.objectives.includes("ielts-band-7") ? "/ielts" : "/cefr-mastery",
    },
    {
      id: "seed-weekly-target",
      title: "Weekly Study Target & Progress Report Review",
      date: addDaysIso(now, 6),
      kind: "target",
      completed: false,
      linkTo: "/progress",
    },
    {
      id: "seed-deadline",
      title: `Target Milestone: Reach CEFR ${plan.targetLevel}`,
      date: plan.targetDate || addDaysIso(now, 90),
      kind: "deadline",
      completed: false,
      linkTo: "/certificates",
    },
  ];
  return events;
}

export const personalPlanStorage = {
  getPlan: (nowIso?: string): PersonalLearningPlan => {
    const saved = readJson<Partial<PersonalLearningPlan>>(PLAN_KEYS.plan);
    const fallback = defaultPersonalPlan(nowIso);
    if (!saved) return fallback;
    const objectives =
      Array.isArray(saved.objectives) && saved.objectives.length > 0
        ? (saved.objectives as LearningObjectiveId[])
        : fallback.objectives;
    const studyDays =
      Array.isArray(saved.studyDays) && saved.studyDays.length > 0
        ? (saved.studyDays as StudyDay[])
        : fallback.studyDays;
    const dailyMinutes =
      saved.dailyMinutes === 15 ||
      saved.dailyMinutes === 30 ||
      saved.dailyMinutes === 45 ||
      saved.dailyMinutes === 60
        ? saved.dailyMinutes
        : fallback.dailyMinutes;
    const targetLevel = CEFR_LEVELS.includes(saved.targetLevel as CefrLevel)
      ? (saved.targetLevel as CefrLevel)
      : fallback.targetLevel;
    return {
      objectives,
      targetLevel,
      studyDays,
      dailyMinutes,
      targetDate:
        typeof saved.targetDate === "string" && saved.targetDate
          ? saved.targetDate
          : fallback.targetDate,
      updatedAt: typeof saved.updatedAt === "string" ? saved.updatedAt : "",
    };
  },

  savePlan: (plan: Omit<PersonalLearningPlan, "updatedAt">): PersonalLearningPlan => {
    const next: PersonalLearningPlan = {
      ...plan,
      objectives: plan.objectives.length > 0 ? plan.objectives : ["general-english"],
      studyDays: plan.studyDays.length > 0 ? plan.studyDays : ["sun", "tue", "thu"],
      updatedAt: new Date().toISOString(),
    };
    writeJson(PLAN_KEYS.plan, next);
    return next;
  },

  getCalendarEvents: (nowIso?: string): CalendarEvent[] => {
    const saved = readJson<CalendarEvent[]>(PLAN_KEYS.calendar);
    if (Array.isArray(saved)) return saved;
    const seeded = buildSeedCalendarEvents(personalPlanStorage.getPlan(nowIso), nowIso);
    writeJson(PLAN_KEYS.calendar, seeded);
    return seeded;
  },

  addCalendarEvent: (
    event: Omit<CalendarEvent, "id" | "completed">,
    nowIso?: string,
  ): CalendarEvent[] => {
    const current = personalPlanStorage.getCalendarEvents(nowIso);
    const next: CalendarEvent[] = [
      ...current,
      {
        ...event,
        id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        completed: false,
      },
    ].sort((a, b) => a.date.localeCompare(b.date));
    writeJson(PLAN_KEYS.calendar, next);
    return next;
  },

  toggleCalendarEvent: (id: string, nowIso?: string): CalendarEvent[] => {
    const current = personalPlanStorage.getCalendarEvents(nowIso);
    const next = current.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e));
    writeJson(PLAN_KEYS.calendar, next);
    return next;
  },

  updateCalendarEventDate: (id: string, date: string, nowIso?: string): CalendarEvent[] => {
    const current = personalPlanStorage.getCalendarEvents(nowIso);
    const next = current
      .map((e) => (e.id === id ? { ...e, date } : e))
      .sort((a, b) => a.date.localeCompare(b.date));
    writeJson(PLAN_KEYS.calendar, next);
    return next;
  },

  deleteCalendarEvent: (id: string, nowIso?: string): CalendarEvent[] => {
    const current = personalPlanStorage.getCalendarEvents(nowIso);
    const next = current.filter((e) => e.id !== id);
    writeJson(PLAN_KEYS.calendar, next);
    return next;
  },

  regenerateSuggestedEvents: (nowIso?: string): CalendarEvent[] => {
    const plan = personalPlanStorage.getPlan(nowIso);
    const current = personalPlanStorage.getCalendarEvents(nowIso);
    const customEvents = current.filter((e) => !e.id.startsWith("seed-"));
    const seeded = buildSeedCalendarEvents(plan, nowIso);
    const merged = [...seeded, ...customEvents].sort((a, b) => a.date.localeCompare(b.date));
    writeJson(PLAN_KEYS.calendar, merged);
    return merged;
  },

  getRemindersConfig: (): SmartRemindersConfig => {
    const saved = readJson<Partial<SmartRemindersConfig>>(PLAN_KEYS.reminders);
    return {
      dailyTargets: saved?.dailyTargets ?? DEFAULT_REMINDERS_CONFIG.dailyTargets,
      incompleteLessons: saved?.incompleteLessons ?? DEFAULT_REMINDERS_CONFIG.incompleteLessons,
      scheduledAssessments:
        saved?.scheduledAssessments ?? DEFAULT_REMINDERS_CONFIG.scheduledAssessments,
      revisionActivities: saved?.revisionActivities ?? DEFAULT_REMINDERS_CONFIG.revisionActivities,
      upcomingWorkshops: saved?.upcomingWorkshops ?? DEFAULT_REMINDERS_CONFIG.upcomingWorkshops,
      weeklyProgressReports:
        saved?.weeklyProgressReports ?? DEFAULT_REMINDERS_CONFIG.weeklyProgressReports,
      preferredTime:
        typeof saved?.preferredTime === "string" && /^\d{2}:\d{2}$/.test(saved.preferredTime)
          ? saved.preferredTime
          : DEFAULT_REMINDERS_CONFIG.preferredTime,
    };
  },

  saveRemindersConfig: (cfg: SmartRemindersConfig): SmartRemindersConfig => {
    writeJson(PLAN_KEYS.reminders, cfg);
    return cfg;
  },
};

/**
 * Generates an ordered Current -> Target personal learning roadmap tailored to the
 * learner's actual CEFR level, target level, multi-select objectives, and live mastery data.
 */
export function generatePersonalRoadmap(
  plan: PersonalLearningPlan,
  currentLevel: CefrLevel,
): RoadmapStep[] {
  const unified = computeUnifiedProgress(learnerStorage.exportSnapshot());
  const records = Object.values(learningRecord.getLessonMap());
  const completedCount = records.filter(
    (r) => r.status === "completed" || r.status === "mastered",
  ).length;
  const totalWordsMastered =
    unified.ieltsVocab.masteredCount +
    unified.selfLearning.masteredCount +
    unified.business.vocabCount;
  const currentIdx = CEFR_LEVELS.indexOf(currentLevel);
  const targetIdx = Math.max(currentIdx, CEFR_LEVELS.indexOf(plan.targetLevel));
  const targetLevel = CEFR_LEVELS[targetIdx] ?? plan.targetLevel;

  const steps: Omit<RoadmapStep, "order">[] = [
    {
      id: `rm-${currentLevel.toLowerCase()}-grammar`,
      title: {
        en: `${currentLevel} Grammar Revision & Error Repair`,
        ar: `مراجعة قواعد ${currentLevel} وتصحيح الأخطاء`,
      },
      description: {
        en: `Consolidate core ${currentLevel} structures and clear recurring grammar slips.`,
        ar: `ترسيخ التراكيب الأساسية لمستوى ${currentLevel} ومعالجة الأخطاء المتكررة.`,
      },
      focusTag: { en: "Grammar", ar: "القواعد" },
      to: "/cefr-mastery",
      completed: unified.cefrMastery.passedCount >= 2,
      estimatedHours: 4,
    },
    {
      id: `rm-${currentLevel.toLowerCase()}-vocab`,
      title: {
        en: `${currentLevel} Vocabulary Consolidation`,
        ar: `ترسيخ مفردات ${currentLevel}`,
      },
      description: {
        en: "Review high-frequency words in context and practise active recall.",
        ar: "مراجعة الكلمات عالية التكرار في سياقها والتدرب على الاسترجاع النشط.",
      },
      focusTag: { en: "Vocabulary", ar: "المفردات" },
      to: "/self-learning",
      completed: totalWordsMastered >= 10,
      estimatedHours: 3,
    },
    {
      id: `rm-${currentLevel.toLowerCase()}-speaking`,
      title: {
        en: `${currentLevel} Guided Speaking & Pronunciation`,
        ar: `المحادثة الموجّهة والنطق (${currentLevel})`,
      },
      description: {
        en: "Build natural pace and clear pronunciation through everyday guided dialogues.",
        ar: "بناء طلاقة طبيعية ونطق واضح عبر الحوارات اليومية الموجّهة.",
      },
      focusTag: { en: "Speaking", ar: "المحادثة" },
      to: "/speaking",
      completed: completedCount >= 2,
      estimatedHours: 3,
    },
  ];

  if (targetIdx > currentIdx) {
    steps.push(
      {
        id: `rm-${targetLevel.toLowerCase()}-vocab`,
        title: {
          en: `${targetLevel} Vocabulary Expansion`,
          ar: `توسيع مفردات ${targetLevel}`,
        },
        description: {
          en: `Unlock collocations, academic expressions, and topic dossiers for ${targetLevel}.`,
          ar: `اكتساب المتلازمات اللفظية والتعبيرات الأكاديمية لمستوى ${targetLevel}.`,
        },
        focusTag: { en: "Vocabulary", ar: "المفردات" },
        to: "/courses",
        completed: totalWordsMastered >= 25,
        estimatedHours: 6,
      },
      {
        id: `rm-${targetLevel.toLowerCase()}-grammar`,
        title: {
          en: `${targetLevel} Grammar & Complex Sentences`,
          ar: `قواعد ${targetLevel} والجمل المركّبة`,
        },
        description: {
          en: `Master clauses, modals, passive voice, and accuracy targets required at ${targetLevel}.`,
          ar: `إتقان الجمل المعقدة والأفعال الناقصة والمبني للمجهول المطلوبة في ${targetLevel}.`,
        },
        focusTag: { en: "Grammar", ar: "القواعد" },
        to: "/cefr-mastery",
        completed: unified.cefrMastery.passedCount >= 5,
        estimatedHours: 6,
      },
      {
        id: `rm-${targetLevel.toLowerCase()}-receptive`,
        title: {
          en: `${targetLevel} Listening & Reading Comprehension`,
          ar: `فهم الاستماع والقراءة (${targetLevel})`,
        },
        description: {
          en: "Train inference, main-idea scanning, and real-speed spoken comprehension.",
          ar: "تدريب على الاستنتاج واستخراج الفكرة الرئيسة وفهم الاستماع بالسرعة الطبيعية.",
        },
        focusTag: { en: "Listening & Reading", ar: "الاستماع والقراءة" },
        to: "/courses",
        completed: completedCount >= 4,
        estimatedHours: 5,
      },
    );
  }

  if (plan.objectives.includes("ielts-band-7")) {
    steps.push({
      id: "rm-ielts-track",
      title: {
        en: "IELTS 4-Skill Strategy & Band 7+ Vocabulary",
        ar: "استراتيجيات الآيلتس للمهارات الأربع ومفردات Band 7+",
      },
      description: {
        en: "Practise timed IELTS Reading, Listening, Writing Tasks 1–2, and Speaking Parts 1–3.",
        ar: "تدريب موقّت على القراءة والاستماع والكتابة والمحادثة الأكاديمية للآيلتس.",
      },
      focusTag: { en: "IELTS", ar: "آيلتس" },
      to: "/ielts",
      completed: unified.ieltsVocab.masteredCount >= 15,
      estimatedHours: 8,
    });
  }

  if (plan.objectives.includes("business-english") || plan.objectives.includes("job-interview")) {
    steps.push({
      id: "rm-business-workshops",
      title: {
        en: `${targetLevel} Professional Communication & AI Workshops`,
        ar: `التواصل المهني وورش العمل التفاعلية (${targetLevel})`,
      },
      description: {
        en: "Practise live negotiations, client emails, meetings, and job interviews with AI feedback.",
        ar: "تدريب حي على المفاوضات والاجتماعات والبريد المهني ومقابلات العمل بتقييم ذكي.",
      },
      focusTag: { en: "Business & Workshops", ar: "الأعمال والورش" },
      to: "/workshops",
      completed: unified.workshops.totalSessions >= 1,
      estimatedHours: 4,
    });
  }

  steps.push({
    id: `rm-${targetLevel.toLowerCase()}-assessment`,
    title: {
      en: `${targetLevel} Level Mastery Assessment & Certificate`,
      ar: `تقييم إتقان مستوى ${targetLevel} والشهادة`,
    },
    description: {
      en: `Complete the end-of-level check to verify your readiness for ${targetLevel} certification.`,
      ar: `أكمل تقييم نهاية المستوى للتحقق من جاهزيتك لشهادة ${targetLevel}.`,
    },
    focusTag: { en: "Assessment", ar: "التقييم" },
    to: "/level-test",
    completed: false,
    estimatedHours: 2,
  });

  return steps.map((s, idx) => ({ ...s, order: idx + 1 }));
}

/**
 * Generates a realistic weekly study schedule strictly across the learner's selected study days
 * and daily study duration — never assigning work on rest days.
 */
export function generateWeeklySchedule(
  plan: PersonalLearningPlan,
  currentLevel: CefrLevel,
): WeeklyScheduleSlot[] {
  const templates: Array<{
    focus: Bilingual;
    activity: Bilingual;
    to: RoadmapRouteTarget;
  }> = [
    {
      focus: { en: `${currentLevel} Core Lesson`, ar: `درس أساسي (${currentLevel})` },
      activity: {
        en: "Complete 1 structured pathway lesson + post-lesson check",
        ar: "إكمال درس مسار منظم + اختبار ما بعد الدرس",
      },
      to: "/courses",
    },
    {
      focus: { en: "Vocabulary & Sentences", ar: "المفردات والجمل" },
      activity: {
        en: "Drill 10 target words & practise 5 real-life sentences",
        ar: "تدريب على ١٠ كلمات مستهدفة و٥ جمل حياتية",
      },
      to: plan.objectives.includes("ielts-band-7") ? "/ielts-vocabulary" : "/self-learning",
    },
    {
      focus: { en: "Grammar & Reading", ar: "القواعد والقراءة" },
      activity: {
        en: "Complete 1 interactive grammar drill + short reading passage",
        ar: "إكمال تمرين قواعد تفاعلي + نص قراءة قصير",
      },
      to: "/cefr-mastery",
    },
    {
      focus: { en: "Speaking & Pronunciation", ar: "المحادثة والنطق" },
      activity: {
        en: "Guided role-play or pronunciation shadowing session",
        ar: "جلسة محادثة موجّهة أو تظليل نطق صوتي",
      },
      to:
        plan.objectives.includes("business-english") || plan.objectives.includes("job-interview")
          ? "/workshops"
          : "/speaking",
    },
    {
      focus: { en: "Revision & Assessment", ar: "المراجعة والتقييم" },
      activity: {
        en: "Review recorded mistakes and complete a short progress check",
        ar: "مراجعة الأخطاء المسجلة وإكمال اختبار تقدم قصير",
      },
      to: plan.objectives.includes("ielts-band-7") ? "/ielts" : "/self-learning",
    },
  ];

  return plan.studyDays.map((day, idx) => {
    const dayMeta = STUDY_DAYS_META.find((d) => d.id === day) ?? STUDY_DAYS_META[0]!;
    const tpl = templates[idx % templates.length]!;
    return {
      day,
      dayLabel: dayMeta.full,
      minutes: plan.dailyMinutes,
      focus: tpl.focus,
      activity: tpl.activity,
      to: tpl.to,
    };
  });
}

/**
 * Computes actionable, non-excessive in-app smart reminders strictly honouring the learner's
 * configured reminder toggles and actual recorded learning state.
 */
export function computeActiveReminders(nowIso?: string): ActiveReminderBanner[] {
  const cfg = personalPlanStorage.getRemindersConfig();
  const plan = personalPlanStorage.getPlan(nowIso);
  const events = personalPlanStorage.getCalendarEvents(nowIso);
  const lessons = Object.values(learningRecord.getLessonMap());
  const inProgressLessons = lessons.filter((l) => l.status === "in_progress");
  const revisionLessons = lessons.filter((l) => l.status === "requires_revision");
  const skillsReport = computeSkillsAndAchievements(nowIso);
  const sortedByWeakest = [...skillsReport.skills].sort((a, b) => a.scorePct - b.scorePct);
  const weakest = sortedByWeakest[0];
  const overallPct = skillsReport.fiveDimensions.learningMasteryPct;
  const todayIso = (nowIso ? new Date(nowIso) : new Date()).toISOString().slice(0, 10);
  const soonIso = addDaysIso(nowIso ? new Date(nowIso) : new Date(), 3);

  const banners: ActiveReminderBanner[] = [];

  if (cfg.incompleteLessons && inProgressLessons.length > 0) {
    const first = inProgressLessons[0]!;
    banners.push({
      id: "rem-incomplete-lesson",
      category: "incompleteLessons",
      priority: "high",
      title: {
        en: "Resume your unfinished lesson",
        ar: "استكمل درسك غير المكتمل",
      },
      detail: {
        en: `"${first.title.en}" is still in progress — finish the post-lesson check to mark it complete.`,
        ar: `درس «${first.title.ar}» ما زال قيد التقدّم — أكمل اختبار ما بعد الدرس لإتمامه.`,
      },
      ctaLabel: { en: "Continue Lesson", ar: "أكمل الدرس" },
      to: `/lessons/${first.lessonId}`,
    });
  }

  if (cfg.revisionActivities && revisionLessons.length > 0) {
    const rev = revisionLessons[0]!;
    banners.push({
      id: "rem-revision-needed",
      category: "revisionActivities",
      priority: "high",
      title: {
        en: "Targeted revision recommended",
        ar: "مراجعة مستهدفة موصى بها",
      },
      detail: {
        en: `"${rev.title.en}" needs a quick revision pass to lock in mastery.`,
        ar: `درس «${rev.title.ar}» يحتاج جولة مراجعة سريعة لترسيخ الإتقان.`,
      },
      ctaLabel: { en: "Revise Now", ar: "راجع الآن" },
      to: `/lessons/${rev.lessonId}`,
    });
  }

  if (cfg.scheduledAssessments) {
    const dueAssessment = events.find(
      (e) =>
        !e.completed &&
        (e.kind === "assessment" || e.kind === "mock" || e.kind === "deadline") &&
        e.date >= todayIso &&
        e.date <= soonIso,
    );
    if (dueAssessment) {
      banners.push({
        id: `rem-assess-${dueAssessment.id}`,
        category: "scheduledAssessments",
        priority: "high",
        title: {
          en: "Upcoming scheduled assessment",
          ar: "تقييم مجدول قريب",
        },
        detail: {
          en: `${dueAssessment.title} is scheduled for ${dueAssessment.date}.`,
          ar: `«${dueAssessment.title}» مجدول بتاريخ ${dueAssessment.date}.`,
        },
        ctaLabel: { en: "Open Calendar", ar: "افتح التقويم" },
        to: dueAssessment.linkTo || "/calendar",
      });
    }
  }

  if (cfg.upcomingWorkshops) {
    const dueWorkshop = events.find(
      (e) => !e.completed && e.kind === "workshop" && e.date >= todayIso && e.date <= soonIso,
    );
    if (dueWorkshop) {
      banners.push({
        id: `rem-workshop-${dueWorkshop.id}`,
        category: "upcomingWorkshops",
        priority: "normal",
        title: {
          en: "Scheduled interactive workshop",
          ar: "ورشة عمل تفاعلية مجدولة",
        },
        detail: {
          en: `${dueWorkshop.title} on ${dueWorkshop.date} (${cfg.preferredTime}).`,
          ar: `${dueWorkshop.title} بتاريخ ${dueWorkshop.date} (${cfg.preferredTime}).`,
        },
        ctaLabel: { en: "Open Workshop", ar: "افتح الورشة" },
        to: dueWorkshop.linkTo || "/workshops",
      });
    }
  }

  if (cfg.dailyTargets) {
    banners.push({
      id: "rem-daily-target",
      category: "dailyTargets",
      priority: "normal",
      title: {
        en: `Daily ${plan.dailyMinutes}-minute study target`,
        ar: `هدفك اليومي: ${plan.dailyMinutes} دقيقة دراسة`,
      },
      detail: {
        en: `Stay on track toward CEFR ${plan.targetLevel} — preferred reminder window ${cfg.preferredTime}.`,
        ar: `حافظ على وتيرتك نحو مستوى ${plan.targetLevel} — وقت التذكير المفضل ${cfg.preferredTime}.`,
      },
      ctaLabel: { en: "View Plan", ar: "عرض الخطة" },
      to: "/calendar",
    });
  }

  if (cfg.weeklyProgressReports) {
    banners.push({
      id: "rem-weekly-report",
      category: "weeklyProgressReports",
      priority: "normal",
      title: {
        en: "Your weekly progress snapshot is ready",
        ar: "ملخص تقدمك الأسبوعي جاهز",
      },
      detail: {
        en: weakest
          ? `Overall mastery: ${overallPct}%. Top skill to boost this week: ${weakest.label.en} (${weakest.scorePct}%).`
          : `Overall mastery: ${overallPct}%. Review your period comparison.`,
        ar: weakest
          ? `الإتقان الكلي: ${overallPct}%. أهم مهارة للتركيز عليها هذا الأسبوع: ${weakest.label.ar} (${weakest.scorePct}%).`
          : `الإتقان الكلي: ${overallPct}%. راجع مقارنة الفترات.`,
      },
      ctaLabel: { en: "See Report", ar: "عرض التقرير" },
      to: "/progress",
    });
  }

  // Keep reminders concise and non-excessive (max 4 active at once)
  return banners.slice(0, 4);
}
