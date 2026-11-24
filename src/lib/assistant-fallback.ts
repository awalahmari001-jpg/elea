import type { CefrLevel } from "@/content/courses";
import type { Bilingual } from "@/content/lesson-types";
import { computeUnifiedProgress } from "@/lib/learner-progress";
import { learnerStorage } from "@/lib/learner-storage";
import { computeDashboardOverview, learningRecord } from "@/lib/learning-record";
import { generatePersonalRoadmap, personalPlanStorage } from "@/lib/personal-plan";
import { computeSkillsAndAchievements } from "@/lib/skills-achievements";

export type AssistantMode = "ask" | "grammar" | "vocabulary" | "mistakes" | "report";

export interface LearnerContextSnapshot {
  studyingLevel: CefrLevel;
  targetLevel: CefrLevel;
  objectives: string[];
  overallSkillScore: number;
  weakSkills: Array<{ name: string; score: number }>;
  strongSkills: Array<{ name: string; score: number }>;
  completedLessons: number;
  revisionLessons: string[];
  wordsMastered: number;
  selfLearningMistakes: string[];
  upcomingEvents: string[];
  studyMinutesWeek: number;
  weeklyTargetMinutes: number;
}

export interface LearnerProgressReport {
  generatedAt: string;
  periodLabel: Bilingual;
  headline: Bilingual;
  achieved: Bilingual[];
  improved: Bilingual[];
  stillWeak: Bilingual[];
  prioritizedNext: Array<{ title: Bilingual; reason: Bilingual; to: string }>;
  goalTrajectory: Bilingual;
}

export interface AssistantReplyPayload {
  answer: Bilingual;
  examples: string[];
  recommendedActions: Array<{ label: Bilingual; to: string }>;
  source: "ai" | "local";
}

export interface AssistantRequestInput {
  mode: AssistantMode;
  question: string;
  locale: "en" | "ar";
  context: LearnerContextSnapshot;
}

/**
 * Collects a real, browser-side snapshot of the learner's recorded performance to pass
 * to the Contextual AI Learning Assistant (server or local fallback).
 */
export function buildLearnerContextSnapshot(nowIso?: string): LearnerContextSnapshot {
  const overview = computeDashboardOverview(nowIso);
  const skills = computeSkillsAndAchievements(nowIso);
  const unified = computeUnifiedProgress(learnerStorage.exportSnapshot(), nowIso);
  const plan = personalPlanStorage.getPlan(nowIso);
  const lessons = Object.values(learningRecord.getLessonMap());
  const revisionLessons = lessons
    .filter((l) => l.status === "requires_revision")
    .map((l) => l.title.en)
    .slice(0, 4);
  const events = personalPlanStorage
    .getCalendarEvents(nowIso)
    .filter((e) => !e.completed)
    .slice(0, 3);

  const sortedAsc = [...skills.skills].sort((a, b) => a.scorePct - b.scorePct);
  const sortedDesc = [...skills.skills].sort((a, b) => b.scorePct - a.scorePct);

  let selfMistakes: string[] = [];
  if (typeof window !== "undefined") {
    try {
      const raw = window.localStorage.getItem("ele.selflearning.mistakes");
      if (raw) {
        const parsed = JSON.parse(raw) as Array<{ prompt?: string; userAnswer?: string }>;
        if (Array.isArray(parsed)) {
          selfMistakes = parsed
            .slice(0, 4)
            .map((m) => m.prompt || m.userAnswer || "")
            .filter(Boolean);
        }
      }
    } catch {
      selfMistakes = [];
    }
  }

  const totalWordsMastered =
    unified.ieltsVocab.masteredCount +
    unified.selfLearning.masteredCount +
    unified.business.vocabCount;

  return {
    studyingLevel: overview.studyingLevel,
    targetLevel: plan.targetLevel,
    objectives: plan.objectives,
    overallSkillScore: skills.fiveDimensions.learningMasteryPct,
    weakSkills: sortedAsc.slice(0, 3).map((s) => ({ name: s.label.en, score: s.scorePct })),
    strongSkills: sortedDesc.slice(0, 3).map((s) => ({ name: s.label.en, score: s.scorePct })),
    completedLessons: overview.activitySummary.lessonsCompleted,
    revisionLessons,
    wordsMastered: totalWordsMastered,
    selfLearningMistakes: selfMistakes,
    upcomingEvents: events.map((e) => `${e.date}: ${e.title}`),
    studyMinutesWeek: skills.comparisons.weekOverWeek.currentMinutes,
    weeklyTargetMinutes: plan.studyDays.length * plan.dailyMinutes,
  };
}

/**
 * Builds a structured, data-backed Learner Progress Report strictly from actual
 * recorded learner activity, 7-skill metrics, and roadmap progress.
 */
export function generateLearnerProgressReport(nowIso?: string): LearnerProgressReport {
  const overview = computeDashboardOverview(nowIso);
  const skills = computeSkillsAndAchievements(nowIso);
  const unified = computeUnifiedProgress(learnerStorage.exportSnapshot(), nowIso);
  const plan = personalPlanStorage.getPlan(nowIso);
  const roadmap = generatePersonalRoadmap(plan, overview.studyingLevel);
  const lessons = Object.values(learningRecord.getLessonMap());
  const revisionLessons = lessons.filter((l) => l.status === "requires_revision");

  const sortedAsc = [...skills.skills].sort((a, b) => a.scorePct - b.scorePct);
  const sortedDesc = [...skills.skills].sort((a, b) => b.scorePct - a.scorePct);
  const overallPct = skills.fiveDimensions.learningMasteryPct;
  const totalWordsMastered =
    unified.ieltsVocab.masteredCount +
    unified.selfLearning.masteredCount +
    unified.business.vocabCount;

  const achieved: Bilingual[] = [
    {
      en: `Completed ${overview.activitySummary.lessonsCompleted} guided lessons (${overview.activitySummary.lessonsMastered} mastered) and ${totalWordsMastered} mastered vocabulary items.`,
      ar: `أكملت ${overview.activitySummary.lessonsCompleted} دروس موجّهة (${overview.activitySummary.lessonsMastered} بمستوى إتقان) وأتقنت ${totalWordsMastered} مفردة.`,
    },
    {
      en: `Earned ${skills.unlockedAchievementsCount}/${skills.achievements.length} measurable achievements and completed ${unified.workshops.totalSessions} interactive workshop(s).`,
      ar: `حصلت على ${skills.unlockedAchievementsCount}/${skills.achievements.length} إنجازات قابلة للقياس وأكملت ${unified.workshops.totalSessions} ورشة تفاعلية.`,
    },
  ];

  const improved: Bilingual[] = [];
  const wow = skills.comparisons.weekOverWeek;
  if (wow.minutesDelta > 0) {
    improved.push({
      en: `Weekly study momentum increased by +${wow.minutesDelta} minutes compared to last week.`,
      ar: `ارتفع زخم الدراسة الأسبوعي بمقدار +${wow.minutesDelta} دقيقة مقارنة بالأسبوع الماضي.`,
    });
  }
  const topStrong = sortedDesc[0];
  if (topStrong) {
    improved.push({
      en: `Strongest language skill: ${topStrong.label.en} at ${topStrong.scorePct}% mastery.`,
      ar: `أقوى مهارة لغوية حالياً: ${topStrong.label.ar} بنسبة ${topStrong.scorePct}%.`,
    });
  }
  if (improved.length === 0) {
    improved.push({
      en: "Baseline established — complete 2 lessons this week to unlock week-over-week growth comparisons.",
      ar: "تم تسجيل خط الأساس — أكمل درسين هذا الأسبوع لبدء مقارنة النمو الأسبوعي.",
    });
  }

  const stillWeak: Bilingual[] = sortedAsc.slice(0, 2).map((s) => ({
    en: `${s.label.en} (${s.scorePct}%) — needs structured practice before advancing.`,
    ar: `${s.label.ar} (${s.scorePct}%) — تحتاج تدريباً منظماً قبل الانتقال للمرحلة التالية.`,
  }));

  if (revisionLessons.length > 0) {
    stillWeak.push({
      en: `${revisionLessons.length} lesson(s) flagged for revision (${revisionLessons[0]!.title.en}).`,
      ar: `${revisionLessons.length} درس محدد للمراجعة (${revisionLessons[0]!.title.ar}).`,
    });
  }

  const nextRoadmapStep = roadmap.find((s) => !s.completed) ?? roadmap[0]!;
  const weakestSkill = sortedAsc[0];
  const prioritizedNext: Array<{ title: Bilingual; reason: Bilingual; to: string }> = [
    {
      title: nextRoadmapStep.title,
      reason: {
        en: `Next uncompleted milestone on your ${overview.studyingLevel} → ${plan.targetLevel} roadmap.`,
        ar: `المحطة غير المكتملة التالية في خريطتك من ${overview.studyingLevel} إلى ${plan.targetLevel}.`,
      },
      to: nextRoadmapStep.to,
    },
  ];

  if (weakestSkill) {
    prioritizedNext.push({
      title: {
        en: `Boost ${weakestSkill.label.en} (+15% focus)`,
        ar: `تعزيز مهارة ${weakestSkill.label.ar}`,
      },
      reason: {
        en: `Currently your lowest recorded skill (${weakestSkill.scorePct}%).`,
        ar: `تمثل حالياً أدنى مهارة مسجلة لديك (${weakestSkill.scorePct}%).`,
      },
      to: weakestSkill.recommendedAction.to,
    });
  }

  const weeklyPlannedMins = plan.studyDays.length * plan.dailyMinutes;
  const remainingRoadmap = roadmap.filter((s) => !s.completed).length;
  const targetCmp = skills.comparisons.currentVsTarget;
  const goalTrajectory: Bilingual = {
    en: `Current path: ${overview.studyingLevel} → ${plan.targetLevel} (${remainingRoadmap} roadmap milestone(s) left). Studying ${weeklyPlannedMins} min/week keeps you aligned with your ${plan.targetDate} target (${targetCmp.currentMasteryPct}%/${targetCmp.targetMasteryPct}% mastery).`,
    ar: `المسار الحالي: ${overview.studyingLevel} ← ${plan.targetLevel} (متبقي ${remainingRoadmap} محطات). الدراسة ${weeklyPlannedMins} دقيقة أسبوعياً تبقيك على المسار نحو هدف ${plan.targetDate} (الإتقان ${targetCmp.currentMasteryPct}%/${targetCmp.targetMasteryPct}%).`,
  };

  return {
    generatedAt: nowIso ?? new Date().toISOString(),
    periodLabel: {
      en: "Weekly & Cumulative Performance Report",
      ar: "تقرير الأداء الأسبوعي والتراكمي",
    },
    headline: {
      en: `Overall 7-Skill Mastery: ${overallPct}% · Studying CEFR ${overview.studyingLevel} → Target ${plan.targetLevel}`,
      ar: `الإتقان الكلي للمهارات الـ٧: ${overallPct}% · تدرس ${overview.studyingLevel} ← الهدف ${plan.targetLevel}`,
    },
    achieved,
    improved,
    stillWeak,
    prioritizedNext,
    goalTrajectory,
  };
}

/**
 * Deterministic bilingual learning coach fallback used when the server AI gateway
 * is unavailable or during local/offline sessions. Always grounded in real learner context.
 */
export function generateAssistantReplyLocal(input: AssistantRequestInput): AssistantReplyPayload {
  const { mode, question, context } = input;
  const q = question.toLowerCase();
  const topWeak = context.weakSkills[0];

  if (mode === "mistakes") {
    const hasMistakes =
      context.revisionLessons.length > 0 || context.selfLearningMistakes.length > 0;
    return {
      answer: {
        en: hasMistakes
          ? `Based on your recorded activity at CEFR ${context.studyingLevel}, your main review areas are: ${[...context.revisionLessons, ...context.selfLearningMistakes].slice(0, 3).join("; ")}. Focus on slow, accurate reformulation first before speeding up.`
          : `Great news — you have no unreviewed error flags right now at CEFR ${context.studyingLevel}! To stress-test your accuracy, focus on your lowest recorded skill: ${topWeak ? `${topWeak.name} (${topWeak.score}%)` : "Grammar & Writing"}.`,
        ar: hasMistakes
          ? `بناءً على نشاطك المسجل في مستوى ${context.studyingLevel}، أهم نقاط المراجعة لديك هي: ${[...context.revisionLessons, ...context.selfLearningMistakes].slice(0, 3).join("؛ ")}. ركّز على إعادة الصياغة بدقة أولاً قبل زيادة السرعة.`
          : `خبر ممتاز — لا توجد أخطاء معلّقة للمراجعة حالياً في مستوى ${context.studyingLevel}! لاختبار دقتك بشكل أعمق، ركّز على أقل مهارة مسجلة لديك: ${topWeak ? `${topWeak.name} (${topWeak.score}%)` : "القواعد والكتابة"}.`,
      },
      examples: [
        "Tip 1: Say the corrected sentence aloud twice to build spoken muscle memory.",
        "Tip 2: Write one original example using the exact grammar pattern you missed.",
      ],
      recommendedActions: [
        {
          label: { en: "Open Self-Learning Error Review", ar: "افتح مراجعة الأخطاء" },
          to: "/self-learning",
        },
        { label: { en: "Practise CEFR Grammar", ar: "تدرّب على قواعد CEFR" }, to: "/cefr-mastery" },
      ],
      source: "local",
    };
  }

  if (mode === "grammar" || q.includes("tense") || q.includes("grammar") || q.includes("قواعد")) {
    return {
      answer: {
        en: `For your CEFR ${context.studyingLevel} → ${context.targetLevel} goal, break every English grammar rule into 3 steps: (1) Meaning/time signal (when it happens), (2) Form (auxiliary + main verb), and (3) Contrast with the tense you usually confuse it with. For example, Present Perfect ("have/has + V3") links a past action to NOW, whereas Past Simple ("V2") is for finished past times ("yesterday", "in 2023").`,
        ar: `لتحقيق هدفك من ${context.studyingLevel} إلى ${context.targetLevel}، افهم أي قاعدة إنجليزية في ٣ خطوات: (١) المعنى والدلالة الزمنية، (٢) التركيب (الفعل المساعد + الفعل الأساسي)، و(٣) المقارنة مع الزمن الذي يلتبس معها. مثال: المضارع التام (have/has + V3) يربط الماضي بالحاضر، بينما الماضي البسيط (V2) لزمن منتهٍ محدد مثل yesterday.`,
      },
      examples: [
        "Present Perfect (link to now): I have lived in Riyadh for five years.",
        "Past Simple (finished time): I visited London in 2022.",
      ],
      recommendedActions: [
        {
          label: { en: "Interactive Grammar Lab", ar: "مختبر القواعد التفاعلي" },
          to: "/cefr-mastery",
        },
        { label: { en: "Open Structured Courses", ar: "افتح الدورات المنظمة" }, to: "/courses" },
      ],
      source: "local",
    };
  }

  if (mode === "vocabulary" || q.includes("word") || q.includes("vocab") || q.includes("مفرد")) {
    return {
      answer: {
        en: `You have mastered ${context.wordsMastered} words so far. To remember new ${context.targetLevel} vocabulary permanently, learn every word as a 3-part bundle: (1) Meaning + Arabic anchor, (2) Common collocation (the partner words native speakers actually use), and (3) One personal sentence from your own work or daily life.`,
        ar: `أتقنت حتى الآن ${context.wordsMastered} مفردة. لترسيخ مفردات مستوى ${context.targetLevel} بشكل دائم، تعلّم كل كلمة في ٣ أجزاء: (١) المعنى الدقيق، (٢) المتلازمة اللفظية الشائعة (الكلمات التي ترافقها)، و(٣) جملة شخصية واحدة من حياتك أو عملك.`,
      },
      examples: [
        "Instead of 'make a big change' → 'implement a significant change'",
        "Instead of 'very important' → 'essential / crucial for long-term success'",
      ],
      recommendedActions: [
        {
          label: { en: "IELTS Band 7+ Vocabulary", ar: "مفردات آيلتس Band 7+" },
          to: "/ielts-vocabulary",
        },
        { label: { en: "600 Real-Life Sentences", ar: "٦٠٠ جملة حياتية" }, to: "/self-learning" },
      ],
      source: "local",
    };
  }

  if (mode === "report") {
    return {
      answer: {
        en: `Progress Snapshot (${context.studyingLevel} → ${context.targetLevel}): Overall mastery is ${context.overallSkillScore}%, with ${context.completedLessons} completed lesson(s) and ${context.wordsMastered} mastered words. Your priority focus right now is ${topWeak ? `${topWeak.name} (${topWeak.score}%)` : "your next roadmap milestone"}.`,
        ar: `ملخص التقدم (${context.studyingLevel} ← ${context.targetLevel}): الإتقان الكلي ${context.overallSkillScore}%، مع ${context.completedLessons} دروس مكتملة و${context.wordsMastered} مفردة متقنة. أولويتك الآن هي ${topWeak ? `${topWeak.name} (${topWeak.score}%)` : "المحطة التالية في خريطتك"}.`,
      },
      examples:
        context.upcomingEvents.length > 0
          ? context.upcomingEvents.map((e) => `Scheduled: ${e}`)
          : ["Set 3+ weekly study days in your Learning Calendar to lock in steady momentum."],
      recommendedActions: [
        {
          label: { en: "Open 7-Skill Analytics", ar: "افتح تحليلات المهارات الـ٧" },
          to: "/progress",
        },
        { label: { en: "Open Personal Calendar", ar: "افتح التقويم الشخصي" }, to: "/calendar" },
      ],
      source: "local",
    };
  }

  return {
    answer: {
      en: `Great question! Considering your current level (CEFR ${context.studyingLevel}) and target (${context.targetLevel}), here is the clearest way to apply "${question.slice(0, 80)}": keep sentences direct, verify verb tense agreement, and practise saying the answer aloud twice. Your next recommended focus is ${topWeak ? `${topWeak.name} (${topWeak.score}%)` : "your weekly roadmap"}.`,
      ar: `سؤال رائع! بالنظر إلى مستواك الحالي (${context.studyingLevel}) وهدفك (${context.targetLevel})، أفضل طريقة للتطبيق على «${question.slice(0, 80)}» هي بناء جملة مباشرة، ومراجعة تطابق الزمن والفاعل، وترديد الجملة بصوت مسموع مرتين. أولويتك التالية هي ${topWeak ? `${topWeak.name} (${topWeak.score}%)` : "خريطتك الأسبوعية"}.`,
    },
    examples: [
      `Target ${context.targetLevel} phrasing: "In my experience, practising for ${Math.max(15, Math.round(context.weeklyTargetMinutes / 5))} minutes daily builds lasting fluency."`,
    ],
    recommendedActions: [
      { label: { en: "View Personal Roadmap", ar: "عرض خريطة التعلّم" }, to: "/calendar" },
      { label: { en: "Practise Speaking", ar: "تدرّب على المحادثة" }, to: "/speaking" },
    ],
    source: "local",
  };
}
