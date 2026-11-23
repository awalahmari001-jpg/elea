import { z } from "zod";

import { ALL_COURSES, type CefrLevel } from "@/content/courses";
import {
  BUSINESS_COMM_SKILLS,
  BUSINESS_MEETING_STAGES,
  BUSINESS_VOCABULARY,
  INTERVIEW_QUESTION_BANK,
} from "@/content/business";
import type { Bilingual } from "@/content/lesson-types";
import { ALL_SELF_LEARNING_SENTENCES } from "@/content/self-learning";
import { IELTS_VOCABULARY } from "@/content/vocab/ielts-vocab-index";
import { WORKSHOP_SCENARIOS } from "@/content/workshops/scenarios";
import {
  learnerStorage,
  type AwarenessBand,
  type LearnerBackupSnapshot,
} from "@/lib/learner-storage";
import { isJoinableCourse } from "@/lib/lesson-access";

export const CEFR_ORDER: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
export const INDICATORS_PER_CEFR_LEVEL = 7;
export const TOTAL_CEFR_INDICATORS = CEFR_ORDER.length * INDICATORS_PER_CEFR_LEVEL;
export const TOTAL_IELTS_VOCAB_ITEMS = IELTS_VOCABULARY.length;
export const TOTAL_IELTS_PRACTICE_MODES = 5;
export const TOTAL_SELF_LEARNING_SENTENCES = ALL_SELF_LEARNING_SENTENCES.length;
export const TOTAL_BUSINESS_VOCAB = BUSINESS_VOCABULARY.length;
export const TOTAL_BUSINESS_SKILLS = BUSINESS_COMM_SKILLS.length;
export const TOTAL_BUSINESS_MEETINGS = BUSINESS_MEETING_STAGES.length;
export const TOTAL_BUSINESS_INTERVIEWS = INTERVIEW_QUESTION_BANK.length;

export interface CefrLevelProgressRow {
  level: CefrLevel;
  masteryPassed: number;
  masteryTotal: number;
  masteryPct: number;
  sentencesAttempted: number;
  sentencesMastered: number;
  sentencesTotal: number;
  sentencesPct: number;
}

export interface WeakGrammarInsight {
  grammarFocus: string;
  count: number;
  avgScore: number;
  sampleLevels: CefrLevel[];
}

export interface WorkshopTrendPoint {
  index: number;
  sessionId: string;
  label: string;
  scenarioTitle: Bilingual;
  level: string;
  dateShort: string;
  linguisticScore: number;
  businessDecisionScore: number;
  overallScore: number;
}

export interface AssessmentSummaryRow {
  courseSlug: string;
  score: number;
  total: number;
  pct: number;
  awarenessBand: AwarenessBand;
  completedAt: string;
}

export interface RecommendedAction {
  id: string;
  to:
    | "/level-test"
    | "/self-learning"
    | "/ielts-vocabulary"
    | "/cefr-mastery"
    | "/business"
    | "/workshops"
    | "/courses";
  priority: "high" | "medium" | "normal";
  title: Bilingual;
  description: Bilingual;
}

export interface UnifiedProgressSummary {
  overallReadinessPct: number;
  totalStudyMinutes: number;
  totalMilestonesCompleted: number;
  placement: {
    level: CefrLevel | null;
    joinedCourses: {
      slug: string;
      title: Bilingual;
      kind: string;
    }[];
    assessments: AssessmentSummaryRow[];
  };
  ieltsVocab: {
    masteredCount: number;
    totalCount: number;
    pct: number;
    quizBestScore: number;
    completedModesCount: number;
    completedModes: string[];
  };
  cefrMastery: {
    passedCount: number;
    totalCount: number;
    pct: number;
    strongestLevel: CefrLevel | null;
    weakestLevel: CefrLevel | null;
    byLevel: CefrLevelProgressRow[];
  };
  selfLearning: {
    attemptedCount: number;
    masteredCount: number;
    totalCount: number;
    pct: number;
    accuracyPct: number;
    dueForRevisionCount: number;
    dailyCompletedCount: number;
    dailyGoal: number;
    activeMinutes: number;
    weakGrammarAreas: WeakGrammarInsight[];
  };
  business: {
    joined: boolean;
    vocabCount: number;
    vocabTotal: number;
    skillsCount: number;
    skillsTotal: number;
    meetingsCount: number;
    meetingsTotal: number;
    interviewsCount: number;
    interviewsTotal: number;
    overallPct: number;
  };
  workshops: {
    totalSessions: number;
    avgLinguistic: number;
    avgBusinessDecision: number;
    avgOverall: number;
    linguisticDelta: number;
    decisionDelta: number;
    axisInsight: "balanced" | "linguistic-leads" | "decision-leads" | "empty";
    trendSeries: WorkshopTrendPoint[];
    recurringWeaknesses: Bilingual[];
  };
  recommendedActions: RecommendedAction[];
}

function clampPct(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function computeUnifiedProgress(
  snapshot: LearnerBackupSnapshot,
  nowIso: string = new Date().toISOString(),
): UnifiedProgressSummary {
  const todayDate = nowIso.slice(0, 10);

  // 1. Placement, joined courses & post-lesson assessments
  const placementLevel = snapshot.result
    ? (snapshot.result.ai?.recommendedLevel ?? snapshot.result.level)
    : null;
  const joinedCourses = snapshot.courses.map((slug) => {
    const course = ALL_COURSES.find((c) => c.slug === slug);
    return {
      slug,
      title: course?.name ?? { en: slug.toUpperCase(), ar: slug.toUpperCase() },
      kind: course?.kind ?? "course",
    };
  });

  const assessments: AssessmentSummaryRow[] = Object.entries(snapshot.assessments)
    .flatMap(([courseSlug, rec]) => {
      if (!rec.post) return [];
      const total = rec.post.total > 0 ? rec.post.total : 10;
      return [
        {
          courseSlug,
          score: rec.post.score,
          total,
          pct: clampPct((rec.post.score / total) * 100),
          awarenessBand: rec.post.awarenessBand,
          completedAt: rec.post.completedAt,
        },
      ];
    })
    .sort((a, b) => b.completedAt.localeCompare(a.completedAt));

  // 2. IELTS Band 7+ Vocabulary
  const ieltsMasteredCount = snapshot.ieltsVocab.masteredIds.length;
  const ieltsPct = clampPct((ieltsMasteredCount / Math.max(1, TOTAL_IELTS_VOCAB_ITEMS)) * 100);

  // 3. Self-learning Pace (600 sentences) + per-level stats + weak grammar + revision queue
  const slRecords = Object.values(snapshot.selfLearning.records);
  const slAttemptedCount = slRecords.length;
  const slMasteredRecords = slRecords.filter(
    (r) => r.status === "completely_correct" || r.status === "acceptable_alternative",
  );
  const slMasteredCount = slMasteredRecords.length;
  const slPct = clampPct((slMasteredCount / Math.max(1, TOTAL_SELF_LEARNING_SENTENCES)) * 100);

  const totalAttempts = slRecords.reduce((sum, r) => sum + Math.max(1, r.attemptsCount), 0);
  const totalCorrect = slRecords.reduce((sum, r) => sum + r.correctCount, 0);
  const slAccuracyPct = totalAttempts > 0 ? clampPct((totalCorrect / totalAttempts) * 100) : 0;

  const dueForRevisionCount = slRecords.filter((r) => {
    const needsRetry = r.status === "partially_correct" || r.status === "incorrect";
    const dueByDate = Boolean(r.nextReviewAt) && r.nextReviewAt <= nowIso;
    return needsRetry || dueByDate;
  }).length;

  const dailyCompletedCount =
    snapshot.selfLearning.dailyDate === todayDate
      ? snapshot.selfLearning.dailyCompletedIds.length
      : 0;
  const slActiveMinutes = Math.round(snapshot.selfLearning.totalSecondsSpent / 60);

  const grammarBuckets = new Map<
    string,
    { count: number; scoreSum: number; levels: Set<CefrLevel> }
  >();
  for (const r of slRecords) {
    const isWeak = r.status === "incorrect" || r.status === "partially_correct" || r.lastScore < 75;
    if (!isWeak) continue;
    const key = r.grammarFocus.trim();
    if (!key) continue;
    const prev = grammarBuckets.get(key) ?? { count: 0, scoreSum: 0, levels: new Set<CefrLevel>() };
    prev.count += 1;
    prev.scoreSum += r.lastScore;
    prev.levels.add(r.level);
    grammarBuckets.set(key, prev);
  }
  const weakGrammarAreas: WeakGrammarInsight[] = Array.from(grammarBuckets.entries())
    .map(([grammarFocus, info]) => ({
      grammarFocus,
      count: info.count,
      avgScore: Math.round(info.scoreSum / info.count),
      sampleLevels: Array.from(info.levels),
    }))
    .sort((a, b) => b.count - a.count || a.avgScore - b.avgScore)
    .slice(0, 6);

  // 4. CEFR A1–C2 Mastery & combined per-level rows
  const byLevel: CefrLevelProgressRow[] = CEFR_ORDER.map((level) => {
    const passed = snapshot.cefrMastery[level]?.passedIndicators.length ?? 0;
    const levelRecords = slRecords.filter((r) => r.level === level);
    const levelMastered = levelRecords.filter(
      (r) => r.status === "completely_correct" || r.status === "acceptable_alternative",
    ).length;
    return {
      level,
      masteryPassed: passed,
      masteryTotal: INDICATORS_PER_CEFR_LEVEL,
      masteryPct: clampPct((passed / INDICATORS_PER_CEFR_LEVEL) * 100),
      sentencesAttempted: levelRecords.length,
      sentencesMastered: levelMastered,
      sentencesTotal: 100,
      sentencesPct: clampPct((levelMastered / 100) * 100),
    };
  });

  const cefrPassedTotal = byLevel.reduce((sum, row) => sum + row.masteryPassed, 0);
  const cefrPct = clampPct((cefrPassedTotal / TOTAL_CEFR_INDICATORS) * 100);
  const startedCefrRows = byLevel.filter((row) => row.masteryPassed > 0);
  const strongestLevel =
    startedCefrRows.length > 0
      ? [...startedCefrRows].sort((a, b) => b.masteryPassed - a.masteryPassed)[0]!.level
      : null;
  const weakestLevel =
    startedCefrRows.length > 0
      ? [...byLevel].sort((a, b) => a.masteryPassed - b.masteryPassed)[0]!.level
      : null;

  // 5. Business English Course
  const biz = snapshot.business;
  const businessTotalUnits =
    TOTAL_BUSINESS_VOCAB +
    TOTAL_BUSINESS_SKILLS +
    TOTAL_BUSINESS_MEETINGS +
    TOTAL_BUSINESS_INTERVIEWS;
  const businessCompletedUnits =
    biz.masteredVocabIds.length +
    biz.completedSkillIds.length +
    biz.completedMeetingIds.length +
    biz.practicedInterviewIds.length;
  const businessOverallPct = clampPct(
    (businessCompletedUnits / Math.max(1, businessTotalUnits)) * 100,
  );

  // 6. Interactive Business Workshops (chronological trend + dual-axis analytics)
  const chronologicalSessions = [...snapshot.workshops].sort((a, b) =>
    a.completedAt.localeCompare(b.completedAt),
  );
  const totalSessions = chronologicalSessions.length;
  const avgLinguistic =
    totalSessions > 0
      ? Math.round(
          chronologicalSessions.reduce((sum, s) => sum + s.evaluation.linguisticScore, 0) /
            totalSessions,
        )
      : 0;
  const avgBusinessDecision =
    totalSessions > 0
      ? Math.round(
          chronologicalSessions.reduce((sum, s) => sum + s.evaluation.businessDecisionScore, 0) /
            totalSessions,
        )
      : 0;
  const avgOverall =
    totalSessions > 0
      ? Math.round(
          chronologicalSessions.reduce((sum, s) => sum + s.evaluation.overallScore, 0) /
            totalSessions,
        )
      : 0;

  const firstSession = chronologicalSessions[0];
  const latestSession = chronologicalSessions[totalSessions - 1];
  const linguisticDelta =
    totalSessions >= 2 && firstSession && latestSession
      ? latestSession.evaluation.linguisticScore - firstSession.evaluation.linguisticScore
      : 0;
  const decisionDelta =
    totalSessions >= 2 && firstSession && latestSession
      ? latestSession.evaluation.businessDecisionScore -
        firstSession.evaluation.businessDecisionScore
      : 0;

  const axisInsight: UnifiedProgressSummary["workshops"]["axisInsight"] =
    totalSessions === 0
      ? "empty"
      : Math.abs(avgLinguistic - avgBusinessDecision) <= 5
        ? "balanced"
        : avgLinguistic > avgBusinessDecision
          ? "linguistic-leads"
          : "decision-leads";

  const trendSeries: WorkshopTrendPoint[] = chronologicalSessions.map((session, idx) => {
    const scenario = WORKSHOP_SCENARIOS.find((s) => s.id === session.scenarioId);
    const dateShort = session.completedAt.slice(5, 10);
    return {
      index: idx + 1,
      sessionId: session.id,
      label: `#${idx + 1} (${session.level})`,
      scenarioTitle: scenario?.title ?? { en: session.scenarioId, ar: session.scenarioId },
      level: session.level,
      dateShort,
      linguisticScore: session.evaluation.linguisticScore,
      businessDecisionScore: session.evaluation.businessDecisionScore,
      overallScore: session.evaluation.overallScore,
    };
  });

  const weaknessSeen = new Set<string>();
  const recurringWeaknesses: Bilingual[] = [];
  for (const session of [...chronologicalSessions].reverse()) {
    for (const w of session.evaluation.recurringWeaknesses) {
      const key = w.en.trim().toLowerCase();
      if (!key || weaknessSeen.has(key)) continue;
      weaknessSeen.add(key);
      recurringWeaknesses.push(w);
      if (recurringWeaknesses.length >= 5) break;
    }
    if (recurringWeaknesses.length >= 5) break;
  }

  // 7. Overall Readiness Score (balanced across the 6 pillars)
  const placementPillar =
    (placementLevel ? 50 : 0) +
    Math.min(25, joinedCourses.length * 12.5) +
    Math.min(25, assessments.length * 12.5);
  const workshopPillar =
    totalSessions === 0 ? 0 : Math.min(100, Math.round(avgOverall * 0.7 + totalSessions * 6));
  const overallReadinessPct = clampPct(
    (placementPillar + ieltsPct + cefrPct + slPct + businessOverallPct + workshopPillar) / 6,
  );

  // Estimate study minutes across Self-learning Pace + Workshops + Modules
  const totalStudyMinutes =
    slActiveMinutes +
    totalSessions * 10 +
    assessments.length * 8 +
    biz.completedMeetingIds.length * 6;

  const totalMilestonesCompleted =
    ieltsMasteredCount +
    cefrPassedTotal +
    slMasteredCount +
    businessCompletedUnits +
    totalSessions +
    assessments.length;

  // 8. Smart Recommended Next Actions
  const recommendedActions: RecommendedAction[] = [];

  if (!placementLevel) {
    recommendedActions.push({
      id: "take-placement",
      to: "/level-test",
      priority: "high",
      title: {
        en: "Take the CEFR A1–C2 Level Test",
        ar: "خُض اختبار تحديد المستوى CEFR A1–C2",
      },
      description: {
        en: "Establish your baseline CEFR level so your courses, Self-learning Pace, and Workshops match your exact target.",
        ar: "حدّد مستواك الأساسي لتوجيه الدورات والتعلّم الذاتي وورش الأعمال بدقة.",
      },
    });
  }

  if (dueForRevisionCount > 0) {
    recommendedActions.push({
      id: "clear-revision-queue",
      to: "/self-learning",
      priority: "high",
      title: {
        en: `Review ${dueForRevisionCount} Sentence(s) in Your Revision Queue`,
        ar: `راجع ${dueForRevisionCount} جملة مستحقة في قائمة المراجعة`,
      },
      description: {
        en: "Strengthen weak grammar structures using spaced-repetition translation practice.",
        ar: "عزّز التراكيب النحوية الضعيفة عبر التدريب المتباعد على الترجمة.",
      },
    });
  } else if (slMasteredCount < 10) {
    recommendedActions.push({
      id: "start-daily-challenge",
      to: "/self-learning",
      priority: "medium",
      title: {
        en: "Complete Today's 10-Sentence Self-learning Challenge",
        ar: "أكمل تحدي اليوم المكون من ١٠ جمل في التعلّم الذاتي",
      },
      description: {
        en: "Build consistent Arabic-to-English fluency across 600 curated CEFR A1–C2 sentences.",
        ar: "ابنِ طلاقة منتظمة في الترجمة من العربية للإنجليزية عبر ٦٠٠ جملة متدرجة.",
      },
    });
  }

  if (totalSessions === 0) {
    recommendedActions.push({
      id: "first-workshop",
      to: "/workshops",
      priority: "medium",
      title: {
        en: "Run Your First AI Interactive Business Workshop",
        ar: "ابدأ أول ورشة أعمال تفاعلية بالذكاء الاصطناعي",
      },
      description: {
        en: "Test your live spoken & written communication with dual-axis Linguistic vs. Business Decision scoring.",
        ar: "اختبر تواصلك المباشر كتابةً وصوتًا مع تقييم ثنائي المحور للغة والقرار المهني.",
      },
    });
  } else if (axisInsight === "linguistic-leads") {
    recommendedActions.push({
      id: "workshop-decision-focus",
      to: "/workshops",
      priority: "medium",
      title: {
        en: "Sharpen Executive Decision-Making in Workshops",
        ar: "طوّر قوة القرار المهني في ورش الأعمال",
      },
      description: {
        en: `Your Linguistic average (${avgLinguistic}%) leads Business Decision-Making (${avgBusinessDecision}%). Practise data-backed trade-offs and clear next steps.`,
        ar: `متوسط لغتك (${avgLinguistic}%) يتقدّم على القرار المهني (${avgBusinessDecision}%). تدرّب على الحلول المدعومة بالأرقام وتحديد الخطوات التالية.`,
      },
    });
  } else if (axisInsight === "decision-leads") {
    recommendedActions.push({
      id: "ielts-precision-focus",
      to: "/ielts-vocabulary",
      priority: "medium",
      title: {
        en: "Upgrade Lexical Precision & Collocations",
        ar: "ارتقِ بالدقة اللغوية والمتلازمات اللفظية",
      },
      description: {
        en: `Your Business Decision-Making (${avgBusinessDecision}%) leads Linguistic Precision (${avgLinguistic}%). Strengthen natural collocations and register.`,
        ar: `قرارك المهني (${avgBusinessDecision}%) يتقدّم على الدقة اللغوية (${avgLinguistic}%). عزّز المتلازمات اللفظية والأسلوب المهني.`,
      },
    });
  }

  if (ieltsMasteredCount < 10) {
    recommendedActions.push({
      id: "ielts-vocab-lab",
      to: "/ielts-vocabulary",
      priority: "normal",
      title: {
        en: "Master Band 7+ Collocations & Paraphrasing",
        ar: "أتقن متلازمات ومفردات الآيلتس لدرجة 7+",
      },
      description: {
        en: `${ieltsMasteredCount} of ${TOTAL_IELTS_VOCAB_ITEMS} Cambridge-referenced Band 7+ entries mastered so far.`,
        ar: `أتقنت حتى الآن ${ieltsMasteredCount} من أصل ${TOTAL_IELTS_VOCAB_ITEMS} مفردة مرجعية لدرجة 7+.`,
      },
    });
  }

  if (cefrPassedTotal < TOTAL_CEFR_INDICATORS && recommendedActions.length < 4) {
    recommendedActions.push({
      id: "cefr-mastery-check",
      to: "/cefr-mastery",
      priority: "normal",
      title: {
        en: "Verify Your Next CEFR Mastery Indicator",
        ar: "أنجز مؤشر الإتقان التالي في CEFR",
      },
      description: {
        en: `${cefrPassedTotal} of ${TOTAL_CEFR_INDICATORS} measurable CEFR indicators verified across A1–C2.`,
        ar: `تم توثيق ${cefrPassedTotal} من أصل ${TOTAL_CEFR_INDICATORS} مؤشر إتقان قابل للقياس عبر A1–C2.`,
      },
    });
  }

  if (businessOverallPct < 50 && recommendedActions.length < 4) {
    recommendedActions.push({
      id: "business-meetings-star",
      to: "/business",
      priority: "normal",
      title: {
        en: "Advance Through the 15-Stage Meetings & STAR Lab",
        ar: "تقدّم في مختبر الاجتماعات (١٥ مرحلة) ومقابلات STAR",
      },
      description: {
        en: `${biz.completedMeetingIds.length}/${TOTAL_BUSINESS_MEETINGS} meeting stages and ${biz.practicedInterviewIds.length}/${TOTAL_BUSINESS_INTERVIEWS} STAR interview models completed.`,
        ar: `أنجزت ${biz.completedMeetingIds.length}/${TOTAL_BUSINESS_MEETINGS} مرحلة اجتماعات و${biz.practicedInterviewIds.length}/${TOTAL_BUSINESS_INTERVIEWS} نموذج مقابلات STAR.`,
      },
    });
  }

  return {
    overallReadinessPct,
    totalStudyMinutes,
    totalMilestonesCompleted,
    placement: {
      level: placementLevel,
      joinedCourses,
      assessments,
    },
    ieltsVocab: {
      masteredCount: ieltsMasteredCount,
      totalCount: TOTAL_IELTS_VOCAB_ITEMS,
      pct: ieltsPct,
      quizBestScore: snapshot.ieltsVocab.quizBestScore,
      completedModesCount: snapshot.ieltsVocab.completedModes.length,
      completedModes: snapshot.ieltsVocab.completedModes,
    },
    cefrMastery: {
      passedCount: cefrPassedTotal,
      totalCount: TOTAL_CEFR_INDICATORS,
      pct: cefrPct,
      strongestLevel,
      weakestLevel,
      byLevel,
    },
    selfLearning: {
      attemptedCount: slAttemptedCount,
      masteredCount: slMasteredCount,
      totalCount: TOTAL_SELF_LEARNING_SENTENCES,
      pct: slPct,
      accuracyPct: slAccuracyPct,
      dueForRevisionCount,
      dailyCompletedCount,
      dailyGoal: 10,
      activeMinutes: slActiveMinutes,
      weakGrammarAreas,
    },
    business: {
      joined: biz.joined,
      vocabCount: biz.masteredVocabIds.length,
      vocabTotal: TOTAL_BUSINESS_VOCAB,
      skillsCount: biz.completedSkillIds.length,
      skillsTotal: TOTAL_BUSINESS_SKILLS,
      meetingsCount: biz.completedMeetingIds.length,
      meetingsTotal: TOTAL_BUSINESS_MEETINGS,
      interviewsCount: biz.practicedInterviewIds.length,
      interviewsTotal: TOTAL_BUSINESS_INTERVIEWS,
      overallPct: businessOverallPct,
    },
    workshops: {
      totalSessions,
      avgLinguistic,
      avgBusinessDecision,
      avgOverall,
      linguisticDelta,
      decisionDelta,
      axisInsight,
      trendSeries,
      recurringWeaknesses,
    },
    recommendedActions: recommendedActions.slice(0, 4),
  };
}

// ---------------------------------------------------------------------------
// Validated JSON Backup Export / Import (Future Account-Sync Ready)
// ---------------------------------------------------------------------------

const BackupSnapshotSchema = z.object({
  version: z.literal(1),
  exportedAt: z.string(),
  profile: z
    .object({
      displayName: z.string().max(60).default(""),
      targetGoal: z.string().max(120).default(""),
      updatedAt: z.string().default(""),
    })
    .default({ displayName: "", targetGoal: "", updatedAt: "" }),
  result: z.any().nullable().default(null),
  courses: z.array(z.string()).default([]),
  assessments: z.record(z.string(), z.any()).default({}),
  ieltsVocab: z
    .object({
      masteredIds: z.array(z.string()).default([]),
      quizBestScore: z.number().min(0).default(0),
      completedModes: z.array(z.string()).default([]),
      updatedAt: z.string().default(""),
    })
    .default({ masteredIds: [], quizBestScore: 0, completedModes: [], updatedAt: "" }),
  cefrMastery: z.record(z.string(), z.any()).default({}),
  selfLearning: z
    .object({
      records: z.record(z.string(), z.any()).default({}),
      totalSecondsSpent: z.number().min(0).default(0),
      dailyDate: z.string().default(""),
      dailyCompletedIds: z.array(z.string()).default([]),
      updatedAt: z.string().default(""),
    })
    .default({
      records: {},
      totalSecondsSpent: 0,
      dailyDate: "",
      dailyCompletedIds: [],
      updatedAt: "",
    }),
  business: z
    .object({
      joined: z.boolean().default(false),
      masteredVocabIds: z.array(z.string()).default([]),
      completedSkillIds: z.array(z.string()).default([]),
      completedMeetingIds: z.array(z.string()).default([]),
      practicedInterviewIds: z.array(z.string()).default([]),
      updatedAt: z.string().default(""),
    })
    .default({
      joined: false,
      masteredVocabIds: [],
      completedSkillIds: [],
      completedMeetingIds: [],
      practicedInterviewIds: [],
      updatedAt: "",
    }),
  workshops: z.array(z.any()).default([]),
});

export function exportLearnerBackupJson(): string {
  return JSON.stringify(learnerStorage.exportSnapshot(), null, 2);
}

export function parseAndValidateLearnerBackup(
  rawJson: string,
): { ok: true; snapshot: LearnerBackupSnapshot } | { ok: false; error: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    return { ok: false, error: "Invalid JSON syntax." };
  }

  const check = BackupSnapshotSchema.safeParse(parsed);
  if (!check.success) {
    return { ok: false, error: "Backup file format does not match Easy Learning English v1." };
  }

  const data = check.data;
  const sanitizedCourses = data.courses.filter((c) => isJoinableCourse(c));

  return {
    ok: true,
    snapshot: {
      version: 1,
      exportedAt: data.exportedAt,
      profile: data.profile,
      result: data.result as LearnerBackupSnapshot["result"],
      courses: sanitizedCourses,
      assessments: data.assessments as LearnerBackupSnapshot["assessments"],
      ieltsVocab: data.ieltsVocab,
      cefrMastery: data.cefrMastery as LearnerBackupSnapshot["cefrMastery"],
      selfLearning: data.selfLearning as LearnerBackupSnapshot["selfLearning"],
      business: data.business,
      workshops: data.workshops as LearnerBackupSnapshot["workshops"],
    },
  };
}

export function importLearnerBackupJson(
  rawJson: string,
): { ok: true; snapshot: LearnerBackupSnapshot } | { ok: false; error: string } {
  const result = parseAndValidateLearnerBackup(rawJson);
  if (!result.ok) return result;
  learnerStorage.applySnapshot(result.snapshot);
  return result;
}
