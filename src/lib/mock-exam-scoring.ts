import type { Bilingual } from "@/content/lesson-types";
import type {
  ExamSectionKey,
  ExamSystem,
  FullMockExam,
  ObjectiveQuestion,
  SpeakingTask,
  WritingTask,
} from "@/content/mock-exams/exam-types";
import { ieltsTracker } from "@/lib/ielts-tracker";
import { learningRecord } from "@/lib/learning-record";

export interface ObjectiveAnswerMap {
  /** For choice questions: selected option index (number). For fill questions: typed string. */
  [questionId: string]: number | string;
}

export interface TextResponseMap {
  [taskId: string]: string;
}

export interface WritingRubricEstimate {
  wordCount: number;
  targetWords: number;
  paragraphCount: number;
  cohesiveCount: number;
  lexicalDiversityPct: number;
  /** Normalized 0..1 score across automated experimental rubric indicators. */
  normalizedScore: number;
  strengths: Bilingual[];
  improvements: Bilingual[];
}

export interface SpeakingRubricEstimate {
  wordCount: number;
  tasksAnswered: number;
  totalTasks: number;
  cohesiveCount: number;
  /** Normalized 0..1 score across automated experimental rubric indicators. */
  normalizedScore: number;
}

export interface SectionResult {
  key: ExamSectionKey;
  correct?: number;
  total?: number;
  accuracyPct: number;
  /** IELTS Band (0.0–9.0 in 0.5 steps) or TOEFL iBT Scaled Score (0–30). */
  scaledScore: number;
  levelLabel: Bilingual;
}

export interface MockExamReport {
  id: string;
  examId: ExamSystem;
  completedAt: string;
  elapsedSeconds: number;
  mode: "exam" | "practice";
  sections: Record<ExamSectionKey, SectionResult>;
  /** Overall IELTS Band (0.0–9.0) OR TOEFL iBT Total Score (0–120). */
  overallScore: number;
  cefrEquivalent: "A2" | "B1" | "B2" | "C1" | "C2";
  /** For TOEFL, displays approximate IELTS concordance; for IELTS, displays approximate TOEFL concordance. */
  crossExamEquivalent: string;
  writingFeedback: Record<string, WritingRubricEstimate>;
  speakingEstimate: SpeakingRubricEstimate;
}

const STORAGE_KEY = "ele.mockExams.history";

const ACADEMIC_COHESIVES = [
  "however",
  "furthermore",
  "moreover",
  "consequently",
  "nevertheless",
  "therefore",
  "although",
  "whereas",
  "in addition",
  "for instance",
  "for example",
  "in contrast",
  "on the other hand",
  "as a result",
  "in conclusion",
  "to summarise",
  "to summarize",
  "firstly",
  "secondly",
  "finally",
  "while",
  "despite",
  "overall",
  "notably",
  "significantly",
];

/** Normalizes a fill-in-the-blank answer for forgiving case/punctuation comparison. */
export function normalizeFillAnswer(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:'"()-]/g, "")
    .replace(/\s+/g, " ");
}

/** Checks whether the learner's response to an objective Listening/Reading question is correct. */
export function isObjectiveQuestionCorrect(
  question: ObjectiveQuestion,
  answer: number | string | undefined,
): boolean {
  if (answer === undefined || answer === "") return false;
  if (question.questionType === "fill") {
    if (typeof answer !== "string") return false;
    const norm = normalizeFillAnswer(answer);
    if (!norm) return false;
    return (question.acceptedAnswers ?? []).some((acc) => normalizeFillAnswer(acc) === norm);
  }
  return typeof answer === "number" && answer === question.correctIndex;
}

/** Official IELTS rounding rule: .25 rounds up to .5, .75 rounds up to next whole band. */
export function roundIeltsBand(raw: number): number {
  const clamped = Math.max(0, Math.min(9, raw));
  return Math.round(clamped * 2) / 2;
}

/** Converts an objective accuracy ratio (0..1) into an authentic IELTS Band (0.0–9.0). */
export function accuracyToIeltsBand(ratio: number, attemptedCount: number): number {
  if (attemptedCount === 0) return 0;
  const pct = Math.max(0, Math.min(1, ratio));
  if (pct >= 0.95) return 9.0;
  if (pct >= 0.88) return 8.5;
  if (pct >= 0.8) return 8.0;
  if (pct >= 0.72) return 7.5;
  if (pct >= 0.63) return 7.0;
  if (pct >= 0.53) return 6.5;
  if (pct >= 0.44) return 6.0;
  if (pct >= 0.34) return 5.5;
  if (pct >= 0.25) return 5.0;
  if (pct >= 0.16) return 4.5;
  if (pct >= 0.08) return 4.0;
  return 3.5;
}

/** Converts a normalized ratio (0..1) to a TOEFL iBT section score (0–30). */
export function ratioToToeflScaled(ratio: number, attempted: boolean): number {
  if (!attempted) return 0;
  return Math.max(0, Math.min(30, Math.round(ratio * 30)));
}

export function ieltsBandLevelLabel(band: number): Bilingual {
  if (band >= 8.5) return { en: "Expert User (Band 8.5–9.0)", ar: "مستخدم خبير (8.5–9.0)" };
  if (band >= 7.5)
    return { en: "Very Good User (Band 7.5–8.0)", ar: "مستخدم متميز جدًا (7.5–8.0)" };
  if (band >= 7.0) return { en: "Good User (Band 7.0)", ar: "مستخدم جيد جدًا (7.0)" };
  if (band >= 6.0) return { en: "Competent User (Band 6.0–6.5)", ar: "مستخدم كفء (6.0–6.5)" };
  if (band >= 5.0) return { en: "Modest User (Band 5.0–5.5)", ar: "مستخدم متوسط (5.0–5.5)" };
  if (band > 0) return { en: "Developing User (Below 5.0)", ar: "مستوى قيد التطوير (أقل من 5.0)" };
  return { en: "Not Attempted", ar: "لم يُجب بعد" };
}

export function toeflLevelLabel(score: number): Bilingual {
  if (score >= 24) return { en: "Advanced (24–30)", ar: "متقدّم (24–30)" };
  if (score >= 18) return { en: "High-Intermediate (18–23)", ar: "فوق المتوسط (18–23)" };
  if (score >= 12) return { en: "Low-Intermediate (12–17)", ar: "متوسط (12–17)" };
  if (score > 0) return { en: "Basic (1–11)", ar: "أساسي (1–11)" };
  return { en: "Not Attempted", ar: "لم يُجب بعد" };
}

export function countWords(text: string): number {
  const cleaned = text.trim();
  if (!cleaned) return 0;
  return cleaned.split(/\s+/).filter(Boolean).length;
}

/** Transparent, deterministic experimental heuristic for Writing responses. */
export function evaluateWritingResponse(text: string, task: WritingTask): WritingRubricEstimate {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const paragraphs = trimmed
    ? trimmed
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
    : [];
  const paragraphCount = paragraphs.length;
  const lower = trimmed.toLowerCase();

  let cohesiveCount = 0;
  for (const marker of ACADEMIC_COHESIVES) {
    if (lower.includes(marker)) cohesiveCount += 1;
  }

  const normalizedWords = words
    .map((w) => w.toLowerCase().replace(/[^a-z']/g, ""))
    .filter((w) => w.length > 2);
  const uniqueWords = new Set(normalizedWords);
  const lexicalDiversityPct =
    normalizedWords.length > 0 ? Math.round((uniqueWords.size / normalizedWords.length) * 100) : 0;

  const avgWordLen =
    normalizedWords.length > 0
      ? normalizedWords.reduce((sum, w) => sum + w.length, 0) / normalizedWords.length
      : 0;

  // Component scores (0..1)
  const lengthScore = Math.min(1, wordCount / Math.max(1, task.minWords));
  const structureScore =
    paragraphCount >= 3 ? 1 : paragraphCount === 2 ? 0.78 : paragraphCount === 1 ? 0.5 : 0;
  const cohesionScore = Math.min(1, cohesiveCount / 4);
  const lexicalScore =
    wordCount === 0
      ? 0
      : Math.min(1, (lexicalDiversityPct / 65) * 0.6 + Math.min(1, avgWordLen / 5.6) * 0.4);

  const normalizedScore =
    wordCount === 0
      ? 0
      : Math.min(
          0.95,
          lengthScore * 0.36 + structureScore * 0.22 + cohesionScore * 0.2 + lexicalScore * 0.22,
        );

  const strengths: Bilingual[] = [];
  const improvements: Bilingual[] = [];

  if (wordCount >= task.minWords) {
    strengths.push({
      en: `Met the official word-count target (${wordCount}/${task.minWords} words).`,
      ar: `حقّقت الحد المطلوب من الكلمات (${wordCount}/${task.minWords} كلمة).`,
    });
  } else {
    improvements.push({
      en: `Write at least ${task.minWords} words (currently ${wordCount}) to avoid Task Achievement penalties.`,
      ar: `اكتب ما لا يقل عن ${task.minWords} كلمة (الحالي ${wordCount}) لتجنّب خصم درجة استيفاء المهمة.`,
    });
  }

  if (paragraphCount >= 3) {
    strengths.push({
      en: `Clear multi-paragraph organization (${paragraphCount} paragraphs).`,
      ar: `تنظيم واضح متعدد الفقرات (${paragraphCount} فقرات).`,
    });
  } else {
    improvements.push({
      en: "Organize your response into distinct introduction, body, and conclusion paragraphs.",
      ar: "قسّم إجابتك إلى مقدمة وفقرات عرض وخاتمة واضحة لتعزيز التماسك.",
    });
  }

  if (cohesiveCount >= 3) {
    strengths.push({
      en: `Effective academic linking devices detected (${cohesiveCount} markers).`,
      ar: `استخدام جيد لأدوات الربط الأكاديمية (${cohesiveCount} أداة).`,
    });
  } else {
    improvements.push({
      en: "Add contrast and cause-effect linkers (however, consequently, furthermore, whereas).",
      ar: "أضف أدوات ربط أكاديمية مثل however وconsequently وfurthermore لتحسين الانسيابية.",
    });
  }

  if (lexicalDiversityPct >= 52 && wordCount >= 40) {
    strengths.push({
      en: `Strong lexical variety (${lexicalDiversityPct}% unique content words).`,
      ar: `تنوع مفردات قوي (${lexicalDiversityPct}% كلمات محتوى فريدة).`,
    });
  } else if (wordCount > 0) {
    improvements.push({
      en: "Paraphrase key words from the prompt instead of repeating the same basic nouns and verbs.",
      ar: "أعد صياغة الكلمات الأساسية من السؤال بدل تكرار نفس الأفعال والأسماء.",
    });
  }

  return {
    wordCount,
    targetWords: task.minWords,
    paragraphCount,
    cohesiveCount,
    lexicalDiversityPct,
    normalizedScore,
    strengths,
    improvements,
  };
}

/** Transparent, deterministic experimental heuristic for Speaking responses. */
export function evaluateSpeakingResponses(
  tasks: SpeakingTask[],
  responses: TextResponseMap,
): SpeakingRubricEstimate {
  let totalWords = 0;
  let tasksAnswered = 0;
  let cohesiveCount = 0;

  for (const task of tasks) {
    const text = (responses[task.id] ?? "").trim();
    const wc = countWords(text);
    if (wc >= 8) tasksAnswered += 1;
    totalWords += wc;
    const lower = text.toLowerCase();
    for (const marker of ACADEMIC_COHESIVES) {
      if (lower.includes(marker)) cohesiveCount += 1;
    }
  }

  const expectedMinWords = tasks.length * 45;
  const coverage = tasks.length > 0 ? tasksAnswered / tasks.length : 0;
  const fluencyVolume = Math.min(1, totalWords / Math.max(1, expectedMinWords));
  const discourse = Math.min(1, cohesiveCount / Math.max(2, tasks.length * 2));

  const normalizedScore =
    totalWords === 0 ? 0 : Math.min(0.94, coverage * 0.4 + fluencyVolume * 0.38 + discourse * 0.22);

  return {
    wordCount: totalWords,
    tasksAnswered,
    totalTasks: tasks.length,
    cohesiveCount,
    normalizedScore,
  };
}

function bandToCefr(band: number): MockExamReport["cefrEquivalent"] {
  if (band >= 8.5) return "C2";
  if (band >= 7.0) return "C1";
  if (band >= 5.5) return "B2";
  if (band >= 4.0) return "B1";
  return "A2";
}

function toeflToCefr(total: number): MockExamReport["cefrEquivalent"] {
  if (total >= 114) return "C2";
  if (total >= 95) return "C1";
  if (total >= 72) return "B2";
  if (total >= 42) return "B1";
  return "A2";
}

function ieltsToApproxToefl(band: number): string {
  if (band >= 8.5) return "TOEFL iBT ~115–120";
  if (band >= 8.0) return "TOEFL iBT ~110–114";
  if (band >= 7.5) return "TOEFL iBT ~102–109";
  if (band >= 7.0) return "TOEFL iBT ~94–101";
  if (band >= 6.5) return "TOEFL iBT ~79–93";
  if (band >= 6.0) return "TOEFL iBT ~60–78";
  if (band >= 5.0) return "TOEFL iBT ~35–59";
  return "TOEFL iBT < 35";
}

function toeflToApproxIelts(total: number): string {
  if (total >= 115) return "IELTS Band ~8.5–9.0";
  if (total >= 110) return "IELTS Band ~8.0";
  if (total >= 102) return "IELTS Band ~7.5";
  if (total >= 94) return "IELTS Band ~7.0";
  if (total >= 79) return "IELTS Band ~6.5";
  if (total >= 60) return "IELTS Band ~6.0";
  if (total >= 42) return "IELTS Band ~5.0–5.5";
  return "IELTS Band < 5.0";
}

/** Computes a complete official-style IELTS or TOEFL iBT experimental score report. */
export function scoreFullMockExam(params: {
  exam: FullMockExam;
  listeningAnswers: ObjectiveAnswerMap;
  readingAnswers: ObjectiveAnswerMap;
  writingResponses: TextResponseMap;
  speakingResponses: TextResponseMap;
  elapsedSeconds: number;
  mode: "exam" | "practice";
}): MockExamReport {
  const {
    exam,
    listeningAnswers,
    readingAnswers,
    writingResponses,
    speakingResponses,
    elapsedSeconds,
    mode,
  } = params;

  const isToefl = exam.id === "toefl-ibt";

  // 1. Listening objective scoring
  const allListeningQ = exam.listening.parts.flatMap((p) => p.questions);
  const listeningAttempted = allListeningQ.filter(
    (q) => listeningAnswers[q.id] !== undefined && listeningAnswers[q.id] !== "",
  ).length;
  const listeningCorrect = allListeningQ.filter((q) =>
    isObjectiveQuestionCorrect(q, listeningAnswers[q.id]),
  ).length;
  const listeningRatio = allListeningQ.length > 0 ? listeningCorrect / allListeningQ.length : 0;

  // 2. Reading objective scoring
  const allReadingQ = exam.reading.passages.flatMap((p) => p.questions);
  const readingAttempted = allReadingQ.filter(
    (q) => readingAnswers[q.id] !== undefined && readingAnswers[q.id] !== "",
  ).length;
  const readingCorrect = allReadingQ.filter((q) =>
    isObjectiveQuestionCorrect(q, readingAnswers[q.id]),
  ).length;
  const readingRatio = allReadingQ.length > 0 ? readingCorrect / allReadingQ.length : 0;

  // 3. Writing automated experimental rubric
  const writingFeedback: Record<string, WritingRubricEstimate> = {};
  let writingWeightedSum = 0;
  let writingWeightTotal = 0;
  exam.writing.tasks.forEach((task, idx) => {
    const est = evaluateWritingResponse(writingResponses[task.id] ?? "", task);
    writingFeedback[task.id] = est;
    // In IELTS Task 2 carries double weight; in TOEFL both tasks are equally weighted.
    const weight = !isToefl && idx === 1 ? 2 : 1;
    writingWeightedSum += est.normalizedScore * weight;
    writingWeightTotal += weight;
  });
  const writingRatio = writingWeightTotal > 0 ? writingWeightedSum / writingWeightTotal : 0;
  const writingAttempted = Object.values(writingFeedback).some((f) => f.wordCount > 0);

  // 4. Speaking automated experimental rubric
  const speakingEstimate = evaluateSpeakingResponses(exam.speaking.tasks, speakingResponses);
  const speakingAttempted = speakingEstimate.wordCount > 0;

  const lScore = isToefl
    ? ratioToToeflScaled(listeningRatio, listeningAttempted > 0)
    : accuracyToIeltsBand(listeningRatio, listeningAttempted);
  const rScore = isToefl
    ? ratioToToeflScaled(readingRatio, readingAttempted > 0)
    : accuracyToIeltsBand(readingRatio, readingAttempted);
  const wScore = isToefl
    ? ratioToToeflScaled(writingRatio, writingAttempted)
    : accuracyToIeltsBand(writingRatio, writingAttempted ? 1 : 0);
  const sScore = isToefl
    ? ratioToToeflScaled(speakingEstimate.normalizedScore, speakingAttempted)
    : accuracyToIeltsBand(speakingEstimate.normalizedScore, speakingAttempted ? 1 : 0);

  const labelFn = isToefl ? toeflLevelLabel : ieltsBandLevelLabel;

  const sections: Record<ExamSectionKey, SectionResult> = {
    listening: {
      key: "listening",
      correct: listeningCorrect,
      total: allListeningQ.length,
      accuracyPct: Math.round(listeningRatio * 100),
      scaledScore: lScore,
      levelLabel: labelFn(lScore),
    },
    reading: {
      key: "reading",
      correct: readingCorrect,
      total: allReadingQ.length,
      accuracyPct: Math.round(readingRatio * 100),
      scaledScore: rScore,
      levelLabel: labelFn(rScore),
    },
    writing: {
      key: "writing",
      accuracyPct: Math.round(writingRatio * 100),
      scaledScore: wScore,
      levelLabel: labelFn(wScore),
    },
    speaking: {
      key: "speaking",
      accuracyPct: Math.round(speakingEstimate.normalizedScore * 100),
      scaledScore: sScore,
      levelLabel: labelFn(sScore),
    },
  };

  const overallScore = isToefl
    ? lScore + rScore + wScore + sScore
    : roundIeltsBand((lScore + rScore + wScore + sScore) / 4);

  return {
    id: `mock-${exam.id}-${Date.now()}`,
    examId: exam.id,
    completedAt: new Date().toISOString(),
    elapsedSeconds,
    mode,
    sections,
    overallScore,
    cefrEquivalent: isToefl ? toeflToCefr(overallScore) : bandToCefr(overallScore),
    crossExamEquivalent: isToefl
      ? toeflToApproxIelts(overallScore)
      : ieltsToApproxToefl(overallScore),
    writingFeedback,
    speakingEstimate,
  };
}

export const mockExamStorage = {
  getHistory(): MockExamReport[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as MockExamReport[]) : [];
    } catch {
      return [];
    }
  },

  saveReport(report: MockExamReport): MockExamReport[] {
    if (typeof window === "undefined") return [report];
    const prev = this.getHistory();
    const next = [report, ...prev].slice(0, 20);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

    // Sync IELTS mock attempts into the independent IELTS readiness tracker
    if (report.examId === "ielts-academic" || report.examId === "ielts-general") {
      ieltsTracker.recordMockTest({
        listening: Math.max(4.0, report.sections.listening.scaledScore),
        reading: Math.max(4.0, report.sections.reading.scaledScore),
        writing: Math.max(4.0, report.sections.writing.scaledScore),
        speaking: Math.max(4.0, report.sections.speaking.scaledScore),
        notes: `Experimental ${report.examId === "ielts-academic" ? "Academic" : "General"} Mock`,
      });
    }

    // Log into unified learner activity timeline
    const passed =
      report.examId === "toefl-ibt" ? report.overallScore >= 72 : report.overallScore >= 6.0;
    learningRecord.logActivity({
      kind: "assessment",
      count: 1,
      minutes: Math.max(1, Math.round(report.elapsedSeconds / 60)),
      passed,
    });

    return next;
  },
};
