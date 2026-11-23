import type { Bilingual } from "@/content/lesson-types";
import { courseLessons } from "@/content/lessons";
import { IELTS_VOCABULARY } from "@/content/vocab/ielts-vocab-index";
import { learnerStorage } from "@/lib/learner-storage";
import { learningRecord } from "@/lib/learning-record";

export type IeltsTrack = "academic" | "general";
export type IeltsSkillKey = "listening" | "reading" | "writing" | "speaking";

export interface IeltsMockRecord {
  id: string;
  date: string; // YYYY-MM-DD
  track: IeltsTrack;
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
  overallBand: number;
  notes?: string;
}

export interface IeltsPlanState {
  track: IeltsTrack;
  targetBand: number;
  skillEstimates: Record<IeltsSkillKey, number>;
  previousEstimates: Record<IeltsSkillKey, number>;
  mockTests: IeltsMockRecord[];
  updatedAt: string;
}

const IELTS_PLAN_KEY = "ele.ielts.plan";

export const VALID_TARGET_BANDS = [6.0, 6.5, 7.0, 7.5, 8.0, 8.5] as const;

export const DEFAULT_IELTS_PLAN: IeltsPlanState = {
  track: "academic",
  targetBand: 7.0,
  skillEstimates: { listening: 5.5, reading: 5.5, writing: 5.5, speaking: 5.5 },
  previousEstimates: { listening: 5.5, reading: 5.5, writing: 5.5, speaking: 5.5 },
  mockTests: [],
  updatedAt: "",
};

/** Official IELTS rounding rule: averages are rounded to the nearest 0.5 band. */
export function roundToHalfBand(raw: number): number {
  const clamped = Math.max(4.0, Math.min(9.0, raw));
  return Math.round(clamped * 2) / 2;
}

export function computeOverallBand(skills: Record<IeltsSkillKey, number>): number {
  const avg = (skills.listening + skills.reading + skills.writing + skills.speaking) / 4;
  return roundToHalfBand(avg);
}

function readPlan(): IeltsPlanState {
  if (typeof window === "undefined") return { ...DEFAULT_IELTS_PLAN };
  try {
    const raw = window.localStorage.getItem(IELTS_PLAN_KEY);
    if (!raw) return { ...DEFAULT_IELTS_PLAN };
    const parsed = JSON.parse(raw) as Partial<IeltsPlanState>;
    return {
      track: parsed.track === "general" ? "general" : "academic",
      targetBand:
        typeof parsed.targetBand === "number"
          ? roundToHalfBand(parsed.targetBand)
          : DEFAULT_IELTS_PLAN.targetBand,
      skillEstimates: {
        listening: roundToHalfBand(parsed.skillEstimates?.listening ?? 5.5),
        reading: roundToHalfBand(parsed.skillEstimates?.reading ?? 5.5),
        writing: roundToHalfBand(parsed.skillEstimates?.writing ?? 5.5),
        speaking: roundToHalfBand(parsed.skillEstimates?.speaking ?? 5.5),
      },
      previousEstimates: {
        listening: roundToHalfBand(parsed.previousEstimates?.listening ?? 5.5),
        reading: roundToHalfBand(parsed.previousEstimates?.reading ?? 5.5),
        writing: roundToHalfBand(parsed.previousEstimates?.writing ?? 5.5),
        speaking: roundToHalfBand(parsed.previousEstimates?.speaking ?? 5.5),
      },
      mockTests: Array.isArray(parsed.mockTests) ? parsed.mockTests : [],
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
    };
  } catch {
    return { ...DEFAULT_IELTS_PLAN };
  }
}

function writePlan(next: IeltsPlanState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(IELTS_PLAN_KEY, JSON.stringify(next));
}

export const ieltsTracker = {
  getPlan: (): IeltsPlanState => readPlan(),

  setTrack: (track: IeltsTrack): IeltsPlanState => {
    const prev = readPlan();
    const next: IeltsPlanState = { ...prev, track, updatedAt: new Date().toISOString() };
    writePlan(next);
    return next;
  },

  setTargetBand: (targetBand: number): IeltsPlanState => {
    const prev = readPlan();
    const next: IeltsPlanState = {
      ...prev,
      targetBand: roundToHalfBand(targetBand),
      updatedAt: new Date().toISOString(),
    };
    writePlan(next);
    return next;
  },

  recordMockTest: (input: {
    track?: IeltsTrack;
    listening: number;
    reading: number;
    writing: number;
    speaking: number;
    notes?: string;
    dateIso?: string;
  }): IeltsPlanState => {
    const prev = readPlan();
    const listening = roundToHalfBand(input.listening);
    const reading = roundToHalfBand(input.reading);
    const writing = roundToHalfBand(input.writing);
    const speaking = roundToHalfBand(input.speaking);
    const overallBand = computeOverallBand({ listening, reading, writing, speaking });
    const nowIso = new Date().toISOString();
    const record: IeltsMockRecord = {
      id: `mock-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      date: input.dateIso ?? nowIso.slice(0, 10),
      track: input.track ?? prev.track,
      listening,
      reading,
      writing,
      speaking,
      overallBand,
      ...(input.notes?.trim() ? { notes: input.notes.trim().slice(0, 200) } : {}),
    };
    const next: IeltsPlanState = {
      ...prev,
      previousEstimates:
        prev.mockTests.length > 0
          ? { ...prev.skillEstimates }
          : { listening, reading, writing, speaking },
      skillEstimates: { listening, reading, writing, speaking },
      mockTests: [record, ...prev.mockTests].slice(0, 20),
      updatedAt: nowIso,
    };
    writePlan(next);
    learningRecord.logActivity({
      kind: "assessment",
      count: 1,
      minutes: 45,
      passed: overallBand >= prev.targetBand,
      nowIso,
    });
    return next;
  },

  clearPlan: (): void => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(IELTS_PLAN_KEY);
  },
};

export interface IeltsRubricSummary {
  writing: {
    taskResponse: number;
    coherenceCohesion: number;
    lexicalResource: number;
    grammaticalRange: number;
  };
  speaking: {
    fluencyCoherence: number;
    lexicalResource: number;
    grammaticalRange: number;
    pronunciation: number;
  };
}

export interface IeltsPrepRecommendation {
  skill: IeltsSkillKey;
  gap: number;
  title: Bilingual;
  tip: Bilingual;
}

export interface IeltsDashboardSummary {
  plan: IeltsPlanState;
  currentBand: number;
  previousBand: number;
  bandDelta: number;
  bandGap: number;
  vocabMastered: number;
  vocabTotal: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  rubrics: IeltsRubricSummary;
  recommendations: IeltsPrepRecommendation[];
}

export const IELTS_PREP_AREAS: {
  id: string;
  skillFilter: IeltsSkillKey | "vocab" | "grammar" | "mock";
  label: Bilingual;
  academicNote: Bilingual;
  generalNote: Bilingual;
}[] = [
  {
    id: "listening",
    skillFilter: "listening",
    label: { en: "Listening (Parts 1–4)", ar: "الاستماع (الأقسام ١–٤)" },
    academicNote: {
      en: "Campus dialogues, academic lectures, signpost tracking, and distractor traps.",
      ar: "حوارات جامعية ومحاضرات أكاديمية وتتبّع الإشارات وتجنّب المشتّتات.",
    },
    generalNote: {
      en: "Everyday transactional audio, workplace briefings, and multi-speaker discussions.",
      ar: "محادثات يومية عملية وإيجازات عمل ونقاشات متعددة المتحدثين.",
    },
  },
  {
    id: "reading",
    skillFilter: "reading",
    label: { en: "Reading Comprehension", ar: "القراءة والفهم" },
    academicNote: {
      en: "3 long academic passages: True/False/Not Given, matching headings, inference.",
      ar: "٣ نصوص أكاديمية طويلة: صح/خطأ/غير مذكور ومطابقة العناوين والاستنتاج.",
    },
    generalNote: {
      en: "Workplace notices, handbooks, policy excerpts, and one long general-interest text.",
      ar: "إعلانات وأدلة عمل ومقتطفات سياسات ونص عام طويل.",
    },
  },
  {
    id: "writing-t1",
    skillFilter: "writing",
    label: { en: "Writing Task 1", ar: "الكتابة — المهمة الأولى (Task 1)" },
    academicNote: {
      en: "Describe charts, tables, process diagrams, and maps with a clear overview (150+ words).",
      ar: "وصف الرسوم البيانية والجداول والخرائط مع نظرة عامة واضحة (١٥٠+ كلمة).",
    },
    generalNote: {
      en: "Write formal, semi-formal, or informal letters covering every bullet point (150+ words).",
      ar: "كتابة رسائل رسمية أو شبه رسمية أو شخصية تغطي كل النقاط المطلوبة (١٥٠+ كلمة).",
    },
  },
  {
    id: "writing-t2",
    skillFilter: "writing",
    label: { en: "Writing Task 2", ar: "الكتابة — المهمة الثانية (Task 2)" },
    academicNote: {
      en: "Structured 250+ word academic essay: opinion, discussion, problem-solution, advantages.",
      ar: "مقال أكاديمي منظم (٢٥٠+ كلمة): رأي، مناقشة، مشكلة وحل، أو مزايا وعيوب.",
    },
    generalNote: {
      en: "Clear 250+ word discursive essay on society, work, education, and everyday issues.",
      ar: "مقال تحليلي واضح (٢٥٠+ كلمة) حول المجتمع والعمل والتعليم والحياة اليومية.",
    },
  },
  {
    id: "speaking-p1",
    skillFilter: "speaking",
    label: { en: "Speaking Part 1 (Interview)", ar: "المحادثة — الجزء ١ (المقابلة)" },
    academicNote: {
      en: "Natural extended answers (2–3 sentences) on study, routine, hometown, and interests.",
      ar: "إجابات طبيعية موسّعة (٢–٣ جمل) حول الدراسة والروتين والاهتمامات.",
    },
    generalNote: {
      en: "Confident conversational responses on work, family, daily life, and preferences.",
      ar: "ردود واثقة وطبيعية حول العمل والعائلة والحياة اليومية والتفضيلات.",
    },
  },
  {
    id: "speaking-p2",
    skillFilter: "speaking",
    label: { en: "Speaking Part 2 (Long Turn)", ar: "المحادثة — الجزء ٢ (العرض الفردي)" },
    academicNote: {
      en: "1-minute cue-card planning + fluent 2-minute structured monologue with clear signposting.",
      ar: "تخطيط لمدة دقيقة ثم حديث مترابط لمدة دقيقتين بانتقالات واضحة.",
    },
    generalNote: {
      en: "Narrate a personal or professional experience clearly across all cue-card prompts.",
      ar: "سرد تجربة شخصية أو مهنية بوضوح مع تغطية جميع نقاط البطاقة.",
    },
  },
  {
    id: "speaking-p3",
    skillFilter: "speaking",
    label: { en: "Speaking Part 3 (Discussion)", ar: "المحادثة — الجزء ٣ (النقاش المتعمّق)" },
    academicNote: {
      en: "Abstract discussion: compare perspectives, evaluate policy trade-offs, and speculate.",
      ar: "نقاش تحليلي مجرّد: مقارنة وجهات النظر وتقييم السياسات والتوقّع المستقبلي.",
    },
    generalNote: {
      en: "Explain wider social trends, justify opinions, and weigh pros and cons fluently.",
      ar: "شرح الاتجاهات المجتمعية وتبرير الآراء والموازنة بين الإيجابيات والسلبيات.",
    },
  },
  {
    id: "vocab",
    skillFilter: "vocab",
    label: { en: "Vocabulary & Lexical Resource", ar: "المفردات والثروة اللغوية (Band 7+)" },
    academicNote: {
      en: "Cambridge-referenced Band 7+ academic collocations, paraphrasing, and register control.",
      ar: "متلازمات أكاديمية لدرجة 7+ وإعادة الصياغة وضبط الأسلوب الرسمي.",
    },
    generalNote: {
      en: "Natural topic vocabulary, idiomatic precision, and formal/informal letter tone.",
      ar: "مفردات موضوعية طبيعية ودقة تعبيرية وضبط نبرة الرسائل.",
    },
  },
  {
    id: "grammar",
    skillFilter: "grammar",
    label: { en: "Grammar & Accuracy", ar: "القواعد والدقة النحوية" },
    academicNote: {
      en: "Complex clauses, passive voice for processes, conditionals, and error-free sentences.",
      ar: "الجمل المركّبة والمبني للمجهول للعمليات والجمل الشرطية الخالية من الأخطاء.",
    },
    generalNote: {
      en: "Accurate tense shifts, polite modals for requests, and natural complex connectors.",
      ar: "دقة الأزمنة والأفعال الناقصة للطلبات المهذّبة والروابط الطبيعية.",
    },
  },
  {
    id: "mock",
    skillFilter: "mock",
    label: { en: "Mock Tests & Band Log", ar: "الاختبارات التجريبية وسجل الدرجات" },
    academicNote: {
      en: "Record timed Academic mock scores across all 4 skills to track real band velocity.",
      ar: "سجّل نتائج اختباراتك التجريبية الأكاديمية عبر المهارات الأربع لتتبّع تطورك.",
    },
    generalNote: {
      en: "Log timed General Training mock tests to close your remaining band gap.",
      ar: "سجّل نتائج اختبارات General Training التجريبية لسد الفجوة نحو هدفك.",
    },
  },
];

export function computeIeltsDashboard(): IeltsDashboardSummary {
  const plan = ieltsTracker.getPlan();
  const vocabProgress = learnerStorage.getIeltsVocab();
  const ieltsLessons = courseLessons("ielts");
  const lessonMap = learningRecord.getLessonMap();
  const lessonsCompleted = ieltsLessons.filter((l) => {
    const s = lessonMap[l.id]?.status;
    return s === "completed" || s === "mastered";
  }).length;

  const currentBand = computeOverallBand(plan.skillEstimates);
  const previousBand = computeOverallBand(plan.previousEstimates);
  const bandDelta = Math.round((currentBand - previousBand) * 10) / 10;
  const bandGap = Math.max(0, Math.round((plan.targetBand - currentBand) * 10) / 10);

  const lexicalBoost = vocabProgress.masteredIds.length >= 12 ? 0.5 : 0;
  const rubrics: IeltsRubricSummary = {
    writing: {
      taskResponse: plan.skillEstimates.writing,
      coherenceCohesion: roundToHalfBand(plan.skillEstimates.writing),
      lexicalResource: roundToHalfBand(plan.skillEstimates.writing + lexicalBoost),
      grammaticalRange: roundToHalfBand(plan.skillEstimates.writing),
    },
    speaking: {
      fluencyCoherence: plan.skillEstimates.speaking,
      lexicalResource: roundToHalfBand(plan.skillEstimates.speaking + lexicalBoost),
      grammaticalRange: roundToHalfBand(plan.skillEstimates.speaking),
      pronunciation: roundToHalfBand(plan.skillEstimates.speaking),
    },
  };

  const skillPairs: { skill: IeltsSkillKey; band: number }[] = [
    { skill: "listening", band: plan.skillEstimates.listening },
    { skill: "reading", band: plan.skillEstimates.reading },
    { skill: "writing", band: plan.skillEstimates.writing },
    { skill: "speaking", band: plan.skillEstimates.speaking },
  ];

  const tipsBySkill: Record<IeltsSkillKey, { title: Bilingual; tip: Bilingual }> = {
    listening: {
      title: { en: "Boost IELTS Listening Precision", ar: "ارفع دقة الاستماع في الآيلتس" },
      tip: {
        en: "Practise signpost transitions and distractor recognition in Parts 3 & 4.",
        ar: "تدرّب على عبارات التحوّل واكتشاف المشتّتات في القسمين ٣ و٤.",
      },
    },
    reading: {
      title: {
        en: "Strengthen IELTS Reading Speed & Logic",
        ar: "عزّز سرعة ومنطق القراءة في الآيلتس",
      },
      tip: {
        en: "Focus on True/False/Not Given evidence matching and paraphrase spotting.",
        ar: "ركّز على مطابقة الأدلة في أسئلة صح/خطأ/غير مذكور والتقاط إعادة الصياغة.",
      },
    },
    writing: {
      title: { en: "Upgrade IELTS Writing Task 1 & 2", ar: "ارتقِ بالكتابة في المهمتين ١ و٢" },
      tip: {
        en: "Pair clear paragraph topic sentences with Band 7+ academic collocations.",
        ar: "اربط الجمل المحورية الواضحة بمتلازمات أكاديمية لدرجة 7+.",
      },
    },
    speaking: {
      title: {
        en: "Build IELTS Speaking Part 2 & 3 Fluency",
        ar: "طوّر طلاقة المحادثة في الجزأين ٢ و٣",
      },
      tip: {
        en: "Extend answers with concrete examples, natural hedging, and clear signposting.",
        ar: "وسّع إجاباتك بأمثلة واقعية وصياغة متزنة وروابط واضحة.",
      },
    },
  };

  const recommendations: IeltsPrepRecommendation[] = skillPairs
    .sort((a, b) => a.band - b.band)
    .slice(0, 3)
    .map(({ skill, band }) => ({
      skill,
      gap: Math.max(0, Math.round((plan.targetBand - band) * 10) / 10),
      title: tipsBySkill[skill].title,
      tip: tipsBySkill[skill].tip,
    }));

  return {
    plan,
    currentBand,
    previousBand,
    bandDelta,
    bandGap,
    vocabMastered: vocabProgress.masteredIds.length,
    vocabTotal: IELTS_VOCABULARY.length,
    lessonsCompleted,
    lessonsTotal: ieltsLessons.length,
    rubrics,
    recommendations,
  };
}
