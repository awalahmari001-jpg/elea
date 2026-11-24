import { CEFR_LEVELS, type CefrLevel } from "@/content/courses";
import type { Bilingual } from "@/content/lesson-types";
import { buildCefrLevelReport } from "@/lib/cefr-modules";
import { computeIeltsDashboard } from "@/lib/ielts-tracker";
import { computeUnifiedProgress } from "@/lib/learner-progress";
import { learnerStorage } from "@/lib/learner-storage";
import { computeDashboardOverview, learningRecord } from "@/lib/learning-record";

export type LanguageSkillId =
  "vocabulary" | "grammar" | "reading" | "listening" | "speaking" | "writing" | "pronunciation";

export interface SkillProgressDetail {
  id: LanguageSkillId;
  label: Bilingual;
  estimatedCefr: CefrLevel;
  scorePct: number;
  activitiesCompleted: number;
  assessmentScorePct: number | null;
  trendDeltaPct: number;
  weakAreas: Bilingual[];
  recommendedAction: {
    label: Bilingual;
    to:
      | "/ielts-vocabulary"
      | "/cefr-mastery"
      | "/self-learning"
      | "/courses"
      | "/speaking"
      | "/workshops"
      | "/ielts";
  };
}

export interface PeriodComparisonPair {
  currentActivities: number;
  previousActivities: number;
  activityDelta: number;
  currentMinutes: number;
  previousMinutes: number;
  minutesDelta: number;
}

export interface FiveDimensionMetrics {
  activityCompletionPct: number;
  assessmentPerformancePct: number;
  learningMasteryPct: number;
  courseCompletionPct: number;
  proficiencyLevel: CefrLevel;
  verifiedLevelsCount: number;
}

export interface AchievementItem {
  id:
    | "first-lesson"
    | "vocab-master"
    | "grammar-achiever"
    | "speaking-confidence"
    | "writing-progress"
    | "seven-day-streak"
    | "first-cefr-level"
    | "ielts-champion"
    | "business-specialist";
  title: Bilingual;
  description: Bilingual;
  unlocked: boolean;
  progressCurrent: number;
  progressTarget: number;
  progressPct: number;
}

export interface CertificateRecord {
  certificateId: string;
  learnerName: string;
  courseKey: string;
  courseTitle: Bilingual;
  completedAt: string;
  assessmentScorePct: number | null;
  disclaimer: Bilingual;
}

export interface SkillsAchievementsReport {
  fiveDimensions: FiveDimensionMetrics;
  skills: SkillProgressDetail[];
  comparisons: {
    weekOverWeek: PeriodComparisonPair;
    monthOverMonth: PeriodComparisonPair;
    initialVsCurrent: {
      initialLevel: CefrLevel | null;
      initialPct: number | null;
      currentLevel: CefrLevel;
      currentPct: number;
      deltaPct: number;
    };
    currentVsTarget: {
      currentLevel: CefrLevel;
      targetLevel: CefrLevel;
      currentMasteryPct: number;
      targetMasteryPct: number;
      gapPct: number;
    };
  };
  achievements: AchievementItem[];
  unlockedAchievementsCount: number;
  certificates: CertificateRecord[];
}

const CERTIFICATES_KEY = "ele.certificates.issued";

function clampPct(v: number): number {
  return Math.max(0, Math.min(100, Math.round(v)));
}

function scoreToCefr(scorePct: number): CefrLevel {
  if (scorePct >= 90) return "C2";
  if (scorePct >= 78) return "C1";
  if (scorePct >= 64) return "B2";
  if (scorePct >= 48) return "B1";
  if (scorePct >= 28) return "A2";
  return "A1";
}

function dayDiff(dateA: string, dateB: string): number {
  return Math.round(
    (Date.parse(`${dateA}T00:00:00Z`) - Date.parse(`${dateB}T00:00:00Z`)) / 86_400_000,
  );
}

function stableHashHex(input: string): string {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).toUpperCase().padStart(8, "0").slice(0, 6);
}

export function buildCertificateId(
  courseKey: string,
  learnerName: string,
  completedDate: string,
): string {
  const year = completedDate.slice(0, 4) || String(new Date().getFullYear());
  const code = courseKey
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 6);
  const sig = stableHashHex(
    `${courseKey}:${learnerName.trim().toLowerCase()}:${completedDate.slice(0, 10)}`,
  );
  return `ELE-${year}-${code}-${sig}`;
}

function readStoredCertificates(): CertificateRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CERTIFICATES_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? (parsed as CertificateRecord[]) : [];
  } catch {
    return [];
  }
}

function writeStoredCertificates(certs: CertificateRecord[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CERTIFICATES_KEY, JSON.stringify(certs));
}

export function verifyCertificateById(
  queryId: string,
): { valid: true; certificate: CertificateRecord } | { valid: false } {
  const clean = queryId.trim().toUpperCase();
  if (!clean) return { valid: false };
  const all = readStoredCertificates();
  const match = all.find((c) => c.certificateId.toUpperCase() === clean);
  if (match) return { valid: true, certificate: match };
  return { valid: false };
}

export function clearCertificates(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CERTIFICATES_KEY);
}

export function computeSkillsAndAchievements(
  nowIso: string = new Date().toISOString(),
): SkillsAchievementsReport {
  const snapshot = learnerStorage.exportSnapshot();
  const unified = computeUnifiedProgress(snapshot, nowIso);
  const dash = computeDashboardOverview(nowIso);
  const ielts = computeIeltsDashboard();
  const journey = learningRecord.exportJourney();
  const lessonRecords = Object.values(journey.lessons);
  const todayIso = nowIso.slice(0, 10);

  // Check CEFR level mastery gates across A1-C2
  const cefrReports = CEFR_LEVELS.map((lvl) => buildCefrLevelReport(lvl));
  const verifiedLevels = cefrReports.filter((r) => r.eligibleForLevelCompletion);

  const avgSkillPostEval = (
    skill: "grammar" | "reading" | "listening" | "speaking" | "writing",
  ) => {
    const list = lessonRecords.filter(
      (r) => r.skill === skill && r.postEvalTotal && r.postEvalTotal > 0,
    );
    if (list.length === 0) return null;
    const sum = list.reduce(
      (acc, r) => acc + Math.round(((r.postEvalScore ?? 0) / r.postEvalTotal!) * 100),
      0,
    );
    return Math.round(sum / list.length);
  };

  const countSkillLessons = (skill: "grammar" | "reading" | "listening" | "speaking" | "writing") =>
    lessonRecords.filter(
      (r) => r.skill === skill && (r.status === "completed" || r.status === "mastered"),
    ).length;

  // 1. Vocabulary
  const vocabActivities =
    unified.ieltsVocab.masteredCount +
    unified.business.vocabCount +
    unified.cefrMastery.passedCount * 3;
  const vocabAssessment =
    unified.ieltsVocab.quizBestScore > 0 ? unified.ieltsVocab.quizBestScore : null;
  const vocabScore = clampPct(Math.min(100, vocabActivities * 2.5 + (vocabAssessment ?? 0) * 0.4));

  // 2. Grammar
  const grammarActivities = countSkillLessons("grammar") + unified.selfLearning.attemptedCount;
  const grammarEval = avgSkillPostEval("grammar");
  const grammarScore = clampPct(
    grammarEval !== null
      ? Math.round(grammarEval * 0.6 + unified.selfLearning.accuracyPct * 0.4)
      : unified.selfLearning.attemptedCount > 0
        ? unified.selfLearning.accuracyPct
        : grammarActivities * 12,
  );

  // 3. Reading
  const readingActivities = countSkillLessons("reading");
  const readingEval = avgSkillPostEval("reading");
  const readingIeltsPct =
    ielts.plan.mockTests.length > 0 ? clampPct((ielts.plan.skillEstimates.reading / 9) * 100) : 0;
  const readingScore = clampPct(
    Math.max(readingEval ?? 0, readingIeltsPct, Math.min(85, readingActivities * 18)),
  );

  // 4. Listening
  const listeningActivities = countSkillLessons("listening") + unified.business.meetingsCount;
  const listeningEval = avgSkillPostEval("listening");
  const listeningIeltsPct =
    ielts.plan.mockTests.length > 0 ? clampPct((ielts.plan.skillEstimates.listening / 9) * 100) : 0;
  const listeningScore = clampPct(
    Math.max(listeningEval ?? 0, listeningIeltsPct, Math.min(85, listeningActivities * 15)),
  );

  // 5. Speaking
  const speakingActivities =
    countSkillLessons("speaking") +
    unified.business.meetingsCount +
    unified.business.interviewsCount +
    unified.workshops.totalSessions;
  const speakingEval =
    unified.workshops.totalSessions > 0
      ? unified.workshops.avgLinguistic
      : avgSkillPostEval("speaking");
  const speakingIeltsPct =
    ielts.plan.mockTests.length > 0 ? clampPct((ielts.plan.skillEstimates.speaking / 9) * 100) : 0;
  const speakingScore = clampPct(
    Math.max(speakingEval ?? 0, speakingIeltsPct, Math.min(80, speakingActivities * 14)),
  );

  // 6. Writing
  const writingActivities =
    countSkillLessons("writing") + (snapshot.result?.ai?.writingLevel ? 1 : 0);
  const writingEval = avgSkillPostEval("writing");
  const writingIeltsPct =
    ielts.plan.mockTests.length > 0 ? clampPct((ielts.plan.skillEstimates.writing / 9) * 100) : 0;
  const writingScore = clampPct(
    Math.max(writingEval ?? 0, writingIeltsPct, Math.min(80, writingActivities * 18)),
  );

  // 7. Pronunciation
  const voiceWorkshops = snapshot.workshops.filter((w) => w.evaluation.usedVoice);
  const pronActivities = voiceWorkshops.length + countSkillLessons("speaking");
  const pronEval =
    voiceWorkshops.length > 0
      ? Math.round(
          voiceWorkshops.reduce((s, w) => s + w.evaluation.criteria.pronunciationDelivery, 0) /
            voiceWorkshops.length,
        )
      : null;
  const pronScore = clampPct(Math.max(pronEval ?? 0, Math.min(75, pronActivities * 16)));

  const weakGrammarBilingual: Bilingual[] = unified.selfLearning.weakGrammarAreas
    .slice(0, 2)
    .map((g) => ({
      en: `Recurring mistakes in ${g.grammarFocus} (avg ${g.avgScore}%)`,
      ar: `أخطاء متكررة في قاعدة ${g.grammarFocus} (متوسط ${g.avgScore}%)`,
    }));

  const skills: SkillProgressDetail[] = [
    {
      id: "vocabulary",
      label: { en: "Vocabulary", ar: "المفردات والثروة اللغوية" },
      estimatedCefr: scoreToCefr(vocabScore),
      scorePct: vocabScore,
      activitiesCompleted: vocabActivities,
      assessmentScorePct: vocabAssessment,
      trendDeltaPct: vocabActivities > 0 ? Math.min(15, vocabActivities) : 0,
      weakAreas:
        vocabScore < 60
          ? [
              {
                en: "Expand Band 7+ academic collocations and register alternatives.",
                ar: "وسّع رصيدك من المتلازمات الأكاديمية وبدائل الأسلوب الرسمي لدرجة 7+.",
              },
            ]
          : [],
      recommendedAction: {
        label: { en: "Practise IELTS Band 7+ Vocabulary", ar: "تدرّب على مفردات الآيلتس 7+" },
        to: "/ielts-vocabulary",
      },
    },
    {
      id: "grammar",
      label: { en: "Grammar", ar: "القواعد النحوية" },
      estimatedCefr: scoreToCefr(grammarScore),
      scorePct: grammarScore,
      activitiesCompleted: grammarActivities,
      assessmentScorePct: grammarEval,
      trendDeltaPct:
        unified.selfLearning.masteredCount > 0
          ? Math.min(18, unified.selfLearning.masteredCount * 2)
          : 0,
      weakAreas:
        weakGrammarBilingual.length > 0
          ? weakGrammarBilingual
          : grammarScore < 60
            ? [
                {
                  en: "Build accuracy with complex clauses and verb tense consistency.",
                  ar: "عزّز دقتك في الجمل المركّبة واتساق الأزمنة النحوية.",
                },
              ]
            : [],
      recommendedAction: {
        label: { en: "Revise Grammar in Self-learning Pace", ar: "راجع القواعد في التعلّم الذاتي" },
        to: "/self-learning",
      },
    },
    {
      id: "reading",
      label: { en: "Reading", ar: "القراءة والفهم" },
      estimatedCefr: scoreToCefr(readingScore),
      scorePct: readingScore,
      activitiesCompleted: readingActivities,
      assessmentScorePct: readingEval,
      trendDeltaPct: readingActivities > 0 ? Math.min(12, readingActivities * 4) : 0,
      weakAreas:
        readingScore < 60
          ? [
              {
                en: "Practise inference and True/False/Not Given passage evidence.",
                ar: "تدرّب على الاستنتاج ومطابقة الأدلة النصّية في فقرات القراءة.",
              },
            ]
          : [],
      recommendedAction: {
        label: { en: "Explore CEFR Reading Lessons", ar: "استكشف دروس القراءة في CEFR" },
        to: "/courses",
      },
    },
    {
      id: "listening",
      label: { en: "Listening", ar: "الاستماع" },
      estimatedCefr: scoreToCefr(listeningScore),
      scorePct: listeningScore,
      activitiesCompleted: listeningActivities,
      assessmentScorePct: listeningEval,
      trendDeltaPct: listeningActivities > 0 ? Math.min(14, listeningActivities * 4) : 0,
      weakAreas:
        listeningScore < 60
          ? [
              {
                en: "Train on multi-speaker workplace dialogues and distractor cues.",
                ar: "تدرّب على حوارات العمل متعددة المتحدثين والتقاط التفاصيل الدقيقة.",
              },
            ]
          : [],
      recommendedAction: {
        label: { en: "Practise IELTS & Course Listening", ar: "تدرّب على الاستماع" },
        to: "/ielts",
      },
    },
    {
      id: "speaking",
      label: { en: "Speaking", ar: "المحادثة والطلاقة" },
      estimatedCefr: scoreToCefr(speakingScore),
      scorePct: speakingScore,
      activitiesCompleted: speakingActivities,
      assessmentScorePct: speakingEval,
      trendDeltaPct: unified.workshops.linguisticDelta,
      weakAreas:
        unified.workshops.recurringWeaknesses.length > 0
          ? unified.workshops.recurringWeaknesses.slice(0, 2)
          : speakingScore < 60
            ? [
                {
                  en: "Practise spontaneous spoken turns and structured opinion framing.",
                  ar: "تدرّب على الاستجابة العفوية وتنظيم عرض الرأي شفهيًا.",
                },
              ]
            : [],
      recommendedAction: {
        label: { en: "Launch an AI Business Workshop", ar: "ابدأ ورشة محاكاة تفاعلية" },
        to: "/workshops",
      },
    },
    {
      id: "writing",
      label: { en: "Writing", ar: "الكتابة الأكاديمية والمهنية" },
      estimatedCefr: scoreToCefr(writingScore),
      scorePct: writingScore,
      activitiesCompleted: writingActivities,
      assessmentScorePct: writingEval,
      trendDeltaPct: writingActivities > 0 ? Math.min(12, writingActivities * 5) : 0,
      weakAreas:
        writingScore < 60
          ? [
              {
                en: "Develop cohesive topic sentences and clear paragraph progression.",
                ar: "طوّر الجمل المحورية وترابط الفقرات بأسلوب أكاديمي ومهني.",
              },
            ]
          : [],
      recommendedAction: {
        label: { en: "Practise Writing in CEFR Mastery", ar: "تدرّب على الكتابة في إتقان CEFR" },
        to: "/cefr-mastery",
      },
    },
    {
      id: "pronunciation",
      label: { en: "Pronunciation", ar: "النطق والوضوح الصوتي" },
      estimatedCefr: scoreToCefr(pronScore),
      scorePct: pronScore,
      activitiesCompleted: pronActivities,
      assessmentScorePct: pronEval,
      trendDeltaPct: voiceWorkshops.length > 0 ? 8 : 0,
      weakAreas:
        pronScore < 60
          ? [
              {
                en: "Use voice dictation in Speaking Studio and Workshops to reinforce clarity.",
                ar: "استخدم الإدخال الصوتي في استوديو المحادثة والورش لتعزيز وضوح النطق.",
              },
            ]
          : [],
      recommendedAction: {
        label: { en: "Open Speaking & Pronunciation Studio", ar: "افتح استوديو المحادثة والنطق" },
        to: "/speaking",
      },
    },
  ];

  // Period-over-period comparisons (Week vs Last Week & Month vs Last Month)
  const aggregateWindow = (startAgeDays: number, endAgeDays: number) => {
    const events = journey.activityLog.filter((e) => {
      const age = dayDiff(todayIso, e.date);
      return age >= startAgeDays && age < endAgeDays;
    });
    const slCount = Object.values(snapshot.selfLearning.records).filter((r) => {
      const age = dayDiff(todayIso, r.updatedAt.slice(0, 10));
      return age >= startAgeDays && age < endAgeDays;
    }).length;
    const wsCount = snapshot.workshops.filter((w) => {
      const age = dayDiff(todayIso, w.completedAt.slice(0, 10));
      return age >= startAgeDays && age < endAgeDays;
    }).length;
    const activities = events.reduce((s, e) => s + e.count, 0) + slCount + wsCount;
    const minutes = events.reduce((s, e) => s + e.minutes, 0) + slCount * 2 + wsCount * 10;
    return { activities, minutes };
  };

  const thisWeek = aggregateWindow(0, 7);
  const lastWeek = aggregateWindow(7, 14);
  const thisMonth = aggregateWindow(0, 30);
  const lastMonth = aggregateWindow(30, 60);

  // 5-Dimension Progress Separation (Part 14.3)
  const assessmentScores: number[] = [
    ...unified.placement.assessments.map((a) => a.pct),
    ...lessonRecords
      .filter((r) => r.postEvalTotal && r.postEvalTotal > 0)
      .map((r) => Math.round(((r.postEvalScore ?? 0) / r.postEvalTotal!) * 100)),
    ...(unified.ieltsVocab.quizBestScore > 0 ? [unified.ieltsVocab.quizBestScore] : []),
    ...(unified.workshops.totalSessions > 0 ? [unified.workshops.avgOverall] : []),
  ];
  const assessmentPerformancePct =
    assessmentScores.length > 0
      ? clampPct(assessmentScores.reduce((a, b) => a + b, 0) / assessmentScores.length)
      : 0;

  const avgSkillScorePct = clampPct(skills.reduce((s, sk) => s + sk.scorePct, 0) / skills.length);
  const courseCompletionPct = clampPct(
    ((verifiedLevels.length + (unified.business.overallPct >= 70 ? 1 : 0)) / 7) * 100,
  );

  const fiveDimensions: FiveDimensionMetrics = {
    activityCompletionPct: dash.activityCompletionPct,
    assessmentPerformancePct,
    learningMasteryPct: dash.assessedMasteryPct,
    courseCompletionPct,
    proficiencyLevel: dash.studyingLevel,
    verifiedLevelsCount: verifiedLevels.length,
  };

  const initialPlacementPct = snapshot.result
    ? clampPct((snapshot.result.total / Math.max(1, snapshot.result.outOf)) * 100)
    : null;

  // 9 Measurable Achievements (NEVER awarded simply for logging in!)
  const makeAchievement = (
    id: AchievementItem["id"],
    title: Bilingual,
    description: Bilingual,
    current: number,
    target: number,
  ): AchievementItem => ({
    id,
    title,
    description,
    unlocked: current >= target,
    progressCurrent: Math.min(current, target),
    progressTarget: target,
    progressPct: clampPct((current / Math.max(1, target)) * 100),
  });

  const grammarPassedCount =
    lessonRecords.filter((r) => r.skill === "grammar" && r.status === "mastered").length +
    unified.selfLearning.masteredCount;

  const achievements: AchievementItem[] = [
    makeAchievement(
      "first-lesson",
      { en: "First Lesson Completed", ar: "إتمام أول درس بنجاح" },
      {
        en: "Complete your first interactive lesson in any course.",
        ar: "أكمل أول درس تفاعلي في أي دورة تدريبية.",
      },
      dash.activitySummary.lessonsCompleted,
      1,
    ),
    makeAchievement(
      "vocab-master",
      { en: "Vocabulary Master", ar: "متقن المفردات" },
      {
        en: "Master at least 15 IELTS Band 7+, Business, or CEFR vocabulary items.",
        ar: "أتقن ١٥ مفردة على الأقل من مفردات الآيلتس 7+ أو الأعمال أو CEFR.",
      },
      vocabActivities,
      15,
    ),
    makeAchievement(
      "grammar-achiever",
      { en: "Grammar Achiever", ar: "مُنجز القواعد النحوية" },
      {
        en: "Master 5 grammar lessons or Self-learning Pace translations accurately.",
        ar: "أتقن ٥ دروس قواعد أو ترجمات صحيحة في التعلّم الذاتي.",
      },
      grammarPassedCount,
      5,
    ),
    makeAchievement(
      "speaking-confidence",
      { en: "Speaking Confidence", ar: "ثقة المحادثة" },
      {
        en: "Complete 3 speaking activities, meeting dialogues, or AI workshops.",
        ar: "أكمل ٣ أنشطة محادثة أو حوارات اجتماعات أو ورش ذكاء اصطناعي.",
      },
      speakingActivities,
      3,
    ),
    makeAchievement(
      "writing-progress",
      { en: "Writing Progress", ar: "تقدّم الكتابة" },
      {
        en: "Complete 2 writing lessons or verified CEFR paragraph tasks.",
        ar: "أكمل درسي كتابة أو مهام فقرات موثّقة في CEFR.",
      },
      writingActivities,
      2,
    ),
    makeAchievement(
      "seven-day-streak",
      { en: "Seven-Day Learning Streak", ar: "سلسلة تعلّم لمدة ٧ أيام" },
      {
        en: "Sustain active study across 7 days (with flexible 1-day grace support).",
        ar: "حافظ على التعلّم النشط لمدة ٧ أيام (مع دعم يوم السماح المرن).",
      },
      dash.streak.longestDays,
      7,
    ),
    makeAchievement(
      "first-cefr-level",
      { en: "First CEFR Level Completed", ar: "إتمام أول مستوى CEFR" },
      {
        en: "Pass the 7-skill CEFR mastery gate and Module 10 assessment for any level.",
        ar: "اجتز بوابة إتقان المهارات السبع وتقييم الوحدة ١٠ لأي مستوى CEFR.",
      },
      verifiedLevels.length,
      1,
    ),
    makeAchievement(
      "ielts-champion",
      { en: "IELTS Practice Champion", ar: "بطل التدريب على الآيلتس" },
      {
        en: "Log at least 1 timed IELTS mock test and master 5+ Band 7+ vocabulary items.",
        ar: "سجّل اختبارًا تجريبيًا واحدًا على الأقل وأتقن ٥+ مفردات لدرجة 7+.",
      },
      (ielts.plan.mockTests.length >= 1 ? 1 : 0) + (unified.ieltsVocab.masteredCount >= 5 ? 1 : 0),
      2,
    ),
    makeAchievement(
      "business-specialist",
      { en: "Business Communication Specialist", ar: "أخصائي التواصل المهني" },
      {
        en: "Complete 2 Interactive Business Workshops or 5 Business Meeting stages.",
        ar: "أكمل ورشتي أعمال تفاعليتين أو ٥ مراحل من مختبر الاجتماعات.",
      },
      unified.workshops.totalSessions >= 2 || unified.business.meetingsCount >= 5 ? 1 : 0,
      1,
    ),
  ];

  // Auto-issue & persist verifiable Course Completion Certificates for eligible milestones
  const learnerDisplayName = snapshot.profile.displayName || "Easy Learning English Learner";
  const disclaimer: Bilingual = {
    en: "Course Completion Certificate issued by Easy Learning English Academy. This certifies course completion on this platform and is not an officially accredited CEFR or IELTS examination certificate.",
    ar: "شهادة إتمام دورة صادرة عن أكاديمية Easy Learning English. توثّق إتمام الدورة على المنصة وليست شهادة اختبار CEFR أو IELTS رسمية معتمدة دوليًا.",
  };

  const existingCerts = readStoredCertificates();
  const certMap = new Map<string, CertificateRecord>(existingCerts.map((c) => [c.courseKey, c]));

  const ensureCert = (
    courseKey: string,
    courseTitle: Bilingual,
    completedAt: string,
    assessmentScorePct: number | null,
  ) => {
    const existing = certMap.get(courseKey);
    if (existing) {
      // Keep original issued date & ID, update display name only if learner set a real name
      if (snapshot.profile.displayName && existing.learnerName !== snapshot.profile.displayName) {
        certMap.set(courseKey, { ...existing, learnerName: snapshot.profile.displayName });
      }
      return;
    }
    const dateStr = completedAt.slice(0, 10) || todayIso;
    certMap.set(courseKey, {
      certificateId: buildCertificateId(courseKey, learnerDisplayName, dateStr),
      learnerName: learnerDisplayName,
      courseKey,
      courseTitle,
      completedAt: dateStr,
      assessmentScorePct,
      disclaimer,
    });
  };

  // Eligible CEFR Levels (mastery-gated!)
  for (const r of verifiedLevels) {
    const slug = r.level.toLowerCase();
    const post = snapshot.assessments[slug]?.post;
    const scorePct = post
      ? clampPct((post.score / Math.max(1, post.total)) * 100)
      : r.assessedMasteryPct;
    ensureCert(
      `cefr-${slug}`,
      {
        en: `CEFR Level ${r.level} English Mastery Pathway`,
        ar: `مسار إتقان اللغة الإنجليزية — مستوى ${r.level}`,
      },
      post?.completedAt ?? nowIso,
      scorePct,
    );
  }

  // Eligible Course Post-Lesson Assessments (>= 70%)
  for (const a of unified.placement.assessments) {
    if (a.pct >= 70) {
      ensureCert(
        `course-${a.courseSlug}`,
        {
          en: `${a.courseSlug.toUpperCase()} Course Completion Certificate`,
          ar: `شهادة إتمام دورة ${a.courseSlug.toUpperCase()}`,
        },
        a.completedAt,
        a.pct,
      );
    }
  }

  // Eligible Business English / Interactive Workshops Certificate
  if (unified.workshops.totalSessions >= 3 && unified.workshops.avgOverall >= 70) {
    ensureCert(
      "business-workshops",
      {
        en: "Interactive Business Communication & Executive Role-Play",
        ar: "شهادة التواصل التنفيذي وورش الأعمال التفاعلية",
      },
      snapshot.workshops[0]?.completedAt ?? nowIso,
      unified.workshops.avgOverall,
    );
  }

  const certificates = Array.from(certMap.values()).sort((a, b) =>
    b.completedAt.localeCompare(a.completedAt),
  );
  if (certificates.length > 0 || existingCerts.length > 0) {
    writeStoredCertificates(certificates);
  }

  return {
    fiveDimensions,
    skills,
    comparisons: {
      weekOverWeek: {
        currentActivities: thisWeek.activities,
        previousActivities: lastWeek.activities,
        activityDelta: thisWeek.activities - lastWeek.activities,
        currentMinutes: thisWeek.minutes,
        previousMinutes: lastWeek.minutes,
        minutesDelta: thisWeek.minutes - lastWeek.minutes,
      },
      monthOverMonth: {
        currentActivities: thisMonth.activities,
        previousActivities: lastMonth.activities,
        activityDelta: thisMonth.activities - lastMonth.activities,
        currentMinutes: thisMonth.minutes,
        previousMinutes: lastMonth.minutes,
        minutesDelta: thisMonth.minutes - lastMonth.minutes,
      },
      initialVsCurrent: {
        initialLevel: dash.assessedLevel,
        initialPct: initialPlacementPct,
        currentLevel: dash.studyingLevel,
        currentPct: avgSkillScorePct,
        deltaPct: initialPlacementPct !== null ? avgSkillScorePct - initialPlacementPct : 0,
      },
      currentVsTarget: {
        currentLevel: dash.studyingLevel,
        targetLevel: dash.nextTargetLevel,
        currentMasteryPct: dash.assessedMasteryPct,
        targetMasteryPct: 80,
        gapPct: Math.max(0, 80 - dash.assessedMasteryPct),
      },
    },
    achievements,
    unlockedAchievementsCount: achievements.filter((a) => a.unlocked).length,
    certificates,
  };
}
