import type { CefrLevel } from "@/content/courses";
import { courseLessons, type LessonSkill } from "@/content/lessons";
import type { Bilingual } from "@/content/lesson-types";
import { SPEAKING_SITUATIONS } from "@/content/speaking-situations";
import { learnerStorage } from "@/lib/learner-storage";
import { learningRecord, type LessonStatus } from "@/lib/learning-record";

export interface CefrModuleItem {
  number: number;
  key:
    | "vocabulary"
    | "grammar"
    | "reading"
    | "listening"
    | "speaking"
    | "writing"
    | "pronunciation"
    | "everyday"
    | "integrated"
    | "assessment";
  title: Bilingual;
  outcome: Bilingual;
  status: LessonStatus;
  completedCount: number;
  totalCount: number;
  pct: number;
  /** Either filter the course's lessons by skill, jump to a route, or scroll to #assessments. */
  action:
    | { kind: "skill"; skill: LessonSkill }
    | { kind: "route"; to: "/cefr-mastery" | "/speaking" | "/self-learning" }
    | { kind: "hash"; hash: "assessments" };
}

export interface CefrSkillGateRow {
  skill: "vocabulary" | "grammar" | "reading" | "listening" | "speaking" | "writing" | "integrated";
  label: Bilingual;
  scorePct: number;
  status: "passed" | "below_target" | "not_assessed";
}

export interface CefrLevelCompletionReport {
  level: CefrLevel;
  modules: CefrModuleItem[];
  skillGates: CefrSkillGateRow[];
  activityCompletionPct: number;
  assessedMasteryPct: number;
  eligibleForLevelCompletion: boolean;
  skillsBelowTarget: CefrSkillGateRow[];
}

function deriveModuleStatus(
  completed: number,
  mastered: number,
  total: number,
  hasRevision = false,
): LessonStatus {
  if (hasRevision) return "requires_revision";
  if (total > 0 && mastered >= total) return "mastered";
  if (total > 0 && completed >= total) return "completed";
  if (completed > 0 || mastered > 0) return "in_progress";
  return "not_started";
}

function clampPct(v: number): number {
  return Math.max(0, Math.min(100, Math.round(v)));
}

/**
 * Builds the standardized 10-Module CEFR structure and 7-skill mastery completion gate
 * for any CEFR level (A1–C2). Never auto-completes a level simply from opening lessons.
 */
export function buildCefrLevelReport(level: CefrLevel): CefrLevelCompletionReport {
  const slug = level.toLowerCase();
  const lessons = courseLessons(slug);
  const lessonMap = learningRecord.getLessonMap();
  const cefrMastery = learnerStorage.getCefrMastery()[level]?.passedIndicators ?? [];
  const selfLearningRecords = Object.values(learnerStorage.getSelfLearning().records).filter(
    (r) => r.level === level,
  );
  const slMastered = selfLearningRecords.filter(
    (r) => r.status === "completely_correct" || r.status === "acceptable_alternative",
  ).length;
  const postAssessment = learnerStorage.getAssessments()[slug]?.post;
  const postAssessmentPct = postAssessment
    ? clampPct((postAssessment.score / Math.max(1, postAssessment.total)) * 100)
    : 0;

  const skillStats = (skill: LessonSkill) => {
    const list = lessons.filter((l) => l.skill === skill);
    const completed = list.filter((l) => {
      const s = lessonMap[l.id]?.status;
      return s === "completed" || s === "mastered";
    }).length;
    const mastered = list.filter((l) => lessonMap[l.id]?.status === "mastered").length;
    const hasRevision = list.some((l) => lessonMap[l.id]?.status === "requires_revision");
    const evalScores = list
      .map((l) => lessonMap[l.id])
      .filter((r) => r && r.postEvalTotal && r.postEvalTotal > 0)
      .map((r) => Math.round(((r!.postEvalScore ?? 0) / r!.postEvalTotal!) * 100));
    const avgEvalPct =
      evalScores.length > 0
        ? Math.round(evalScores.reduce((a, b) => a + b, 0) / evalScores.length)
        : list.length > 0 && mastered > 0
          ? Math.round((mastered / list.length) * 100)
          : 0;
    return { total: list.length, completed, mastered, hasRevision, avgEvalPct };
  };

  const grammar = skillStats("grammar");
  const reading = skillStats("reading");
  const listening = skillStats("listening");
  const speaking = skillStats("speaking");
  const writing = skillStats("writing");

  const vocabPassed =
    (cefrMastery.includes("understand") ? 1 : 0) +
    (cefrMastery.includes("context") ? 1 : 0) +
    (cefrMastery.includes("original-sentence") ? 1 : 0);

  const integratedPassed =
    (cefrMastery.includes("paragraph") ? 1 : 0) +
    (cefrMastery.includes("opinion-justify") ? 1 : 0) +
    (cefrMastery.includes("realistic-comm") ? 1 : 0);

  const levelSpeakingSituations = SPEAKING_SITUATIONS.filter((s) => s.level === level).length;

  const modules: CefrModuleItem[] = [
    {
      number: 1,
      key: "vocabulary",
      title: { en: "Module 1: Vocabulary Development", ar: "الوحدة ١: بناء وتطوير المفردات" },
      outcome: {
        en: `Understand, recognise in context, and produce core ${level} vocabulary and collocations.`,
        ar: `فهم مفردات ومتلازمات مستوى ${level} والتعرّف عليها في السياق واستخدامها في جمل أصلية.`,
      },
      status: deriveModuleStatus(vocabPassed, vocabPassed, 3),
      completedCount: vocabPassed,
      totalCount: 3,
      pct: clampPct((vocabPassed / 3) * 100),
      action: { kind: "route", to: "/cefr-mastery" },
    },
    {
      number: 2,
      key: "grammar",
      title: { en: "Module 2: Grammar Mastery", ar: "الوحدة ٢: إتقان القواعد النحوية" },
      outcome: {
        en: `Apply ${level} grammatical structures accurately in guided and original sentences.`,
        ar: `تطبيق التراكيب النحوية لمستوى ${level} بدقة في الجمل الموجّهة والحرّة.`,
      },
      status: deriveModuleStatus(
        grammar.completed,
        grammar.mastered,
        grammar.total,
        grammar.hasRevision,
      ),
      completedCount: grammar.completed,
      totalCount: Math.max(1, grammar.total),
      pct: grammar.total > 0 ? clampPct((grammar.completed / grammar.total) * 100) : 0,
      action: { kind: "skill", skill: "grammar" },
    },
    {
      number: 3,
      key: "reading",
      title: { en: "Module 3: Reading Skills", ar: "الوحدة ٣: مهارات القراءة والفهم" },
      outcome: {
        en: `Extract main ideas, details, and inference from level-appropriate ${level} texts.`,
        ar: `استخلاص الأفكار الرئيسة والتفاصيل والاستنتاج من نصوص مستوى ${level}.`,
      },
      status: deriveModuleStatus(
        reading.completed,
        reading.mastered,
        reading.total,
        reading.hasRevision,
      ),
      completedCount: reading.completed,
      totalCount: Math.max(1, reading.total),
      pct: reading.total > 0 ? clampPct((reading.completed / reading.total) * 100) : 0,
      action: { kind: "skill", skill: "reading" },
    },
    {
      number: 4,
      key: "listening",
      title: { en: "Module 4: Listening Skills", ar: "الوحدة ٤: مهارات الاستماع" },
      outcome: {
        en: `Follow authentic ${level} spoken dialogues, key facts, and speaker attitudes.`,
        ar: `متابعة الحوارات المسموعة لمستوى ${level} والتقاط المعلومات الدقيقة ومواقف المتحدثين.`,
      },
      status: deriveModuleStatus(
        listening.completed,
        listening.mastered,
        listening.total,
        listening.hasRevision,
      ),
      completedCount: listening.completed,
      totalCount: Math.max(1, listening.total),
      pct: listening.total > 0 ? clampPct((listening.completed / listening.total) * 100) : 0,
      action: { kind: "skill", skill: "listening" },
    },
    {
      number: 5,
      key: "speaking",
      title: { en: "Module 5: Speaking Skills", ar: "الوحدة ٥: مهارات المحادثة والطلاقة" },
      outcome: {
        en: `Respond naturally in realistic ${level} spoken situations (${levelSpeakingSituations} guided scenarios).`,
        ar: `التحدث بطلاقة وثقة في مواقف مستوى ${level} الواقعية (${levelSpeakingSituations} موقفًا تفاعليًا).`,
      },
      status: deriveModuleStatus(
        speaking.completed,
        speaking.mastered,
        Math.max(1, speaking.total),
        speaking.hasRevision,
      ),
      completedCount: speaking.completed,
      totalCount: Math.max(1, speaking.total),
      pct: speaking.total > 0 ? clampPct((speaking.completed / speaking.total) * 100) : 0,
      action:
        speaking.total > 0
          ? { kind: "skill", skill: "speaking" }
          : { kind: "route", to: "/speaking" },
    },
    {
      number: 6,
      key: "writing",
      title: { en: "Module 6: Writing Skills", ar: "الوحدة ٦: مهارات الكتابة والتعبير" },
      outcome: {
        en: `Compose coherent, accurate ${level} sentences, paragraphs, or structured texts.`,
        ar: `كتابة جمل وفقرات ونصوص مترابطة ودقيقة تناسب مستوى ${level}.`,
      },
      status: deriveModuleStatus(
        writing.completed,
        writing.mastered,
        writing.total,
        writing.hasRevision,
      ),
      completedCount: writing.completed,
      totalCount: Math.max(1, writing.total),
      pct: writing.total > 0 ? clampPct((writing.completed / writing.total) * 100) : 0,
      action: { kind: "skill", skill: "writing" },
    },
    {
      number: 7,
      key: "pronunciation",
      title: { en: "Module 7: Pronunciation", ar: "الوحدة ٧: النطق ووضوح المخارج" },
      outcome: {
        en: `Practise ${level} sentence stress, clarity, and spoken alignment with voice playback.`,
        ar: `التدرّب على النطق الواضح ونبرة الجمل لمستوى ${level} مع الاستماع والترديد.`,
      },
      status: speaking.completed > 0 ? "in_progress" : "not_started",
      completedCount: speaking.completed,
      totalCount: Math.max(1, levelSpeakingSituations),
      pct:
        levelSpeakingSituations > 0
          ? clampPct((speaking.completed / levelSpeakingSituations) * 100)
          : 0,
      action: { kind: "route", to: "/speaking" },
    },
    {
      number: 8,
      key: "everyday",
      title: { en: "Module 8: Everyday Communication", ar: "الوحدة ٨: التواصل اليومي والترجمة" },
      outcome: {
        en: `Master 100 curated ${level} Arabic-to-English sentences across everyday and real-life topics.`,
        ar: `إتقان ١٠٠ جملة عربية-إنجليزية مختارة لمستوى ${level} عبر مواقف الحياة اليومية.`,
      },
      status: deriveModuleStatus(slMastered, slMastered, 100),
      completedCount: slMastered,
      totalCount: 100,
      pct: clampPct(slMastered),
      action: { kind: "route", to: "/self-learning" },
    },
    {
      number: 9,
      key: "integrated",
      title: { en: "Module 9: Integrated Practice", ar: "الوحدة ٩: التطبيق المتكامل للمهارات" },
      outcome: {
        en: `Combine grammar, vocabulary, opinion justification, and realistic ${level} communication.`,
        ar: `دمج القواعد والمفردات وتبرير الآراء والتواصل الواقعي لمستوى ${level}.`,
      },
      status: deriveModuleStatus(integratedPassed, integratedPassed, 3),
      completedCount: integratedPassed,
      totalCount: 3,
      pct: clampPct((integratedPassed / 3) * 100),
      action: { kind: "route", to: "/cefr-mastery" },
    },
    {
      number: 10,
      key: "assessment",
      title: { en: "Module 10: Level Assessment", ar: "الوحدة ١٠: التقييم الشامل للمستوى" },
      outcome: {
        en: `Demonstrate ≥ 70% accuracy on the ${level} Post-Lesson Evaluation to verify level mastery.`,
        ar: `تحقيق دقة ٧٠٪ فأكثر في التقييم الشامل لمستوى ${level} لإثبات الإتقان.`,
      },
      status: !postAssessment
        ? "not_started"
        : postAssessmentPct >= 75
          ? "mastered"
          : postAssessmentPct >= 50
            ? "completed"
            : "requires_revision",
      completedCount: postAssessment ? 1 : 0,
      totalCount: 1,
      pct: postAssessmentPct,
      action: { kind: "hash", hash: "assessments" },
    },
  ];

  // 7-Skill CEFR Level Completion Gate
  const classifyGate = (scorePct: number, assessed: boolean): CefrSkillGateRow["status"] => {
    if (!assessed) return "not_assessed";
    return scorePct >= 70 ? "passed" : "below_target";
  };

  const vocabPct = clampPct((vocabPassed / 3) * 100);
  const grammarPct = Math.max(
    grammar.avgEvalPct,
    cefrMastery.includes("grammar-accuracy") ? 80 : 0,
  );
  const readingPct = reading.avgEvalPct;
  const listeningPct = listening.avgEvalPct;
  const speakingPct = speaking.avgEvalPct;
  const writingPct = writing.avgEvalPct;
  const integratedPct = clampPct(Math.max((integratedPassed / 3) * 100, postAssessmentPct));

  const skillGates: CefrSkillGateRow[] = [
    {
      skill: "vocabulary",
      label: { en: "Vocabulary Knowledge", ar: "المعرفة المعجمية والمفردات" },
      scorePct: vocabPct,
      status: classifyGate(vocabPct, vocabPassed > 0),
    },
    {
      skill: "grammar",
      label: { en: "Grammar Accuracy", ar: "دقة القواعد النحوية" },
      scorePct: grammarPct,
      status: classifyGate(grammarPct, grammarPct > 0 || grammar.completed > 0),
    },
    {
      skill: "reading",
      label: { en: "Reading Comprehension", ar: "الفهم القرائي" },
      scorePct: readingPct,
      status: classifyGate(readingPct, readingPct > 0 || reading.completed > 0),
    },
    {
      skill: "listening",
      label: { en: "Listening Comprehension", ar: "فهم المسموع" },
      scorePct: listeningPct,
      status: classifyGate(listeningPct, listeningPct > 0 || listening.completed > 0),
    },
    {
      skill: "speaking",
      label: { en: "Speaking Performance", ar: "أداء المحادثة" },
      scorePct: speakingPct,
      status: classifyGate(speakingPct, speakingPct > 0 || speaking.completed > 0),
    },
    {
      skill: "writing",
      label: { en: "Writing Performance", ar: "الأداء الكتابي" },
      scorePct: writingPct,
      status: classifyGate(writingPct, writingPct > 0 || writing.completed > 0),
    },
    {
      skill: "integrated",
      label: { en: "Integrated Language Use", ar: "الاستخدام اللغوي المتكامل" },
      scorePct: integratedPct,
      status: classifyGate(integratedPct, integratedPassed > 0 || Boolean(postAssessment)),
    },
  ];

  const completedLessons = lessons.filter((l) => {
    const st = lessonMap[l.id]?.status;
    return st === "completed" || st === "mastered";
  }).length;
  const activityCompletionPct =
    lessons.length > 0 ? clampPct((completedLessons / lessons.length) * 100) : 0;

  const passedGates = skillGates.filter((g) => g.status === "passed").length;
  const assessedMasteryPct = clampPct((passedGates / skillGates.length) * 100);
  const skillsBelowTarget = skillGates.filter((g) => g.status !== "passed");
  const eligibleForLevelCompletion =
    passedGates >= 5 && postAssessmentPct >= 70 && skillsBelowTarget.length <= 2;

  return {
    level,
    modules,
    skillGates,
    activityCompletionPct,
    assessedMasteryPct,
    eligibleForLevelCompletion,
    skillsBelowTarget,
  };
}
