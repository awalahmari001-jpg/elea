import type { Bilingual } from "@/content/lesson-types";
import type { CefrLevel } from "@/content/courses";

export type IeltsVocabCategory =
  | "academic"
  | "high-frequency"
  | "topic-specific"
  | "collocations"
  | "phrasal-verbs"
  | "idioms"
  | "formal-informal"
  | "synonyms"
  | "word-formation"
  | "commonly-confused";

export type IeltsTopicCategory =
  | "education"
  | "technology-ai"
  | "environment-climate"
  | "health-lifestyle"
  | "business-employment"
  | "globalisation"
  | "society-issues"
  | "crime-punishment"
  | "government-services"
  | "culture-traditions"
  | "media-advertising"
  | "science-innovation"
  | "transport-urbanisation"
  | "family-relationships"
  | "tourism-travel";

export interface IeltsRegisterContrast {
  everyday: string;
  academic: string;
  whenToUse: Bilingual;
}

export interface IeltsVocabEntry {
  id: string;
  word: string;
  ipa: string;
  /** Optional British vs. American pronunciation or spelling distinction. */
  ukUsNote?: Bilingual;
  partOfSpeech: string;
  category: IeltsVocabCategory;
  topic: IeltsTopicCategory;
  bandTarget: "7.0" | "7.5+" | "8.0+";
  /** Cambridge Dictionary-referenced clear definition. */
  definition: string;
  /** Natural Modern Standard Arabic translation and usage explanation. */
  arabic: string;
  collocations: string[];
  synonyms: string[];
  antonyms: string[];
  wordFamily?: string[];
  registerContrast: IeltsRegisterContrast;
  examples: [string, string];
  ieltsSpeaking: {
    prompt: string;
    sample: string;
    tip: Bilingual;
  };
  ieltsWriting: {
    task: "Task 1" | "Task 2";
    prompt: string;
    sample: string;
    tip: Bilingual;
  };
  commonMistake: {
    wrong: string;
    right: string;
    why: Bilingual;
  };
}

export interface IeltsParaphraseTask {
  id: string;
  topic: IeltsTopicCategory;
  original: string;
  targetWords: string[];
  modelParaphrase: string;
  explanation: Bilingual;
}

export interface IeltsLexicalFeedback {
  estimatedBand: "5.5" | "6.0" | "6.5" | "7.0" | "7.5" | "8.0+";
  scores: {
    accuracy: number;
    naturalness: number;
    appropriateness: number;
    range: number;
  };
  feedback: Bilingual;
  corrections: { original: string; improved: string; why: Bilingual }[];
  upgradedVersion: string;
  band7Note: Bilingual;
}

export type CefrMasteryIndicatorId =
  | "understand"
  | "context"
  | "original-sentence"
  | "grammar-accuracy"
  | "paragraph"
  | "opinion-justify"
  | "realistic-comm";

export interface CefrVocabItem {
  word: string;
  ipa: string;
  pos: string;
  definition: string;
  arabic: string;
  collocation: string;
  example: string;
}

export interface CefrExpressionItem {
  expression: string;
  arabic: string;
  context: Bilingual;
  example: string;
}

export interface CefrPhrasalVerbItem {
  verb: string;
  meaning: string;
  arabic: string;
  example: string;
}

export interface CefrIdiomItem {
  idiom: string;
  meaning: string;
  arabic: string;
  register: "everyday" | "neutral" | "professional" | "academic";
  example: string;
}

export interface CefrGrammarItem {
  structure: string;
  formula: string;
  explanation: Bilingual;
  example: string;
}

export interface CefrSentencePattern {
  functionLabel: Bilingual;
  pattern: string;
  example: string;
  arabic: string;
}

export interface CefrMasteryCheckMcq {
  indicator: "understand" | "context" | "grammar-accuracy";
  prompt: string;
  options: [string, string, string, string];
  correct: number;
  explanation: Bilingual;
}

export interface CefrMasteryProductionTask {
  indicator: "original-sentence" | "paragraph" | "opinion-justify" | "realistic-comm";
  prompt: Bilingual;
  requiredTerms: string[];
  minWords: number;
  modelResponse: string;
  rubricHint: Bilingual;
}

export interface CefrMasteryLevelData {
  level: CefrLevel;
  title: Bilingual;
  cefrDescriptor: Bilingual;
  essentialVocab: CefrVocabItem[];
  commonExpressions: CefrExpressionItem[];
  collocations: { collocation: string; arabic: string; example: string }[];
  phrasalVerbs: CefrPhrasalVerbItem[];
  idioms: CefrIdiomItem[];
  grammaticalStructures: CefrGrammarItem[];
  sentencePatterns: CefrSentencePattern[];
  communicationDomains: {
    everyday: { focus: Bilingual; sample: string };
    academic: { focus: Bilingual; sample: string };
    professional: { focus: Bilingual; sample: string };
  };
  mcqChecks: CefrMasteryCheckMcq[];
  productionTasks: CefrMasteryProductionTask[];
}
