import type { CefrLevel } from "@/content/courses";
import type { Bilingual } from "@/content/lesson-types";

export type SelfLearningTopicId =
  | "daily-life"
  | "family-relationships"
  | "food-shopping"
  | "travel-transport"
  | "health-wellbeing"
  | "education-study"
  | "work-career"
  | "business-finance"
  | "technology-digital"
  | "environment-nature"
  | "society-culture"
  | "media-communication"
  | "government-law"
  | "science-innovation"
  | "hobbies-lifestyle"
  | "opinions-arguments";

export interface SelfLearningTopicMeta {
  id: SelfLearningTopicId;
  label: Bilingual;
}

export const SELF_LEARNING_TOPICS: SelfLearningTopicMeta[] = [
  { id: "daily-life", label: { en: "Daily Life & Routines", ar: "الحياة اليومية والروتين" } },
  {
    id: "family-relationships",
    label: { en: "Family & Relationships", ar: "الأسرة والعلاقات" },
  },
  { id: "food-shopping", label: { en: "Food & Shopping", ar: "الطعام والتسوق" } },
  { id: "travel-transport", label: { en: "Travel & Transport", ar: "السفر والمواصلات" } },
  { id: "health-wellbeing", label: { en: "Health & Wellbeing", ar: "الصحة والعافية" } },
  { id: "education-study", label: { en: "Education & Study", ar: "التعليم والدراسة" } },
  { id: "work-career", label: { en: "Work & Career", ar: "العمل والمسار المهني" } },
  {
    id: "business-finance",
    label: { en: "Business & Finance", ar: "الأعمال والمال والاقتصاد" },
  },
  {
    id: "technology-digital",
    label: { en: "Technology & Digital Life", ar: "التقنية والذكاء الاصطناعي" },
  },
  {
    id: "environment-nature",
    label: { en: "Environment & Climate", ar: "البيئة والمناخ" },
  },
  { id: "society-culture", label: { en: "Society & Culture", ar: "المجتمع والثقافة" } },
  {
    id: "media-communication",
    label: { en: "Media & Communication", ar: "الإعلام والتواصل" },
  },
  {
    id: "government-law",
    label: { en: "Government & Public Services", ar: "الحكومة والخدمات والقانون" },
  },
  { id: "science-innovation", label: { en: "Science & Innovation", ar: "العلوم والابتكار" } },
  { id: "hobbies-lifestyle", label: { en: "Hobbies & Leisure", ar: "الهوايات والرياضة" } },
  {
    id: "opinions-arguments",
    label: { en: "Opinions & Abstract Debate", ar: "الآراء والحجج والنقاش" },
  },
];

export interface TranslationItem {
  id: string;
  level: CefrLevel;
  topic: SelfLearningTopicId;
  /** Natural Modern Standard Arabic source sentence. */
  arabic: string;
  /** Primary natural, idiomatic English model translation. */
  modelEnglish: string;
  /** Additional completely valid English translations accepted without penalty. */
  alternatives: [string, string];
  /** Core target vocabulary items highlighted for coaching and weak-area tracking. */
  keyVocab: string[];
  /** Grammar or syntactic structure reinforced by this sentence. */
  grammarFocus: string;
  /** Concise explanation of why the natural English phrasing works. */
  whyAppropriate: Bilingual;
}

export type TranslationVerdict =
  "completely_correct" | "acceptable_alternative" | "partially_correct" | "incorrect";

export interface TranslationCriteriaScores {
  semanticAccuracy: number;
  grammaticalAccuracy: number;
  vocabularySelection: number;
  sentenceStructure: number;
  wordOrder: number;
  naturalness: number;
  punctuationSpelling: number;
}

export interface TranslationMistake {
  issue: string;
  suggestion: string;
  why: Bilingual;
}

export interface TranslationEvaluation {
  verdict: TranslationVerdict;
  overallScore: number;
  scores: TranslationCriteriaScores;
  feedback: Bilingual;
  mistakes: TranslationMistake[];
  modelTranslation: string;
  whyAppropriate: Bilingual;
  acceptableAlternatives: string[];
}

/** Compact tuple shape used in per-level sentence banks to keep 600 entries clean and readable. */
export type CompactSentenceTuple = readonly [
  topic: SelfLearningTopicId,
  arabic: string,
  modelEnglish: string,
  alt1: string,
  alt2: string,
  keyVocab: readonly string[],
  grammarFocus: string,
  whyEn: string,
  whyAr: string,
];

export function buildLevelSentences(
  level: CefrLevel,
  rows: readonly CompactSentenceTuple[],
): TranslationItem[] {
  const prefix = level.toLowerCase();
  return rows.map((row, idx) => ({
    id: `${prefix}-${String(idx + 1).padStart(3, "0")}`,
    level,
    topic: row[0],
    arabic: row[1],
    modelEnglish: row[2],
    alternatives: [row[3], row[4]],
    keyVocab: [...row[5]],
    grammarFocus: row[6],
    whyAppropriate: { en: row[7], ar: row[8] },
  }));
}
