import type { CefrLevel } from "@/content/courses";
import type { Bilingual } from "@/content/lesson-types";

export type GrammarModuleId =
  | "parts-of-speech"
  | "verb-tenses"
  | "modals"
  | "passive-causative"
  | "conditionals-wishes"
  | "reported-speech"
  | "clauses-complex"
  | "gerunds-infinitives"
  | "prepositions-phrasals"
  | "comparatives-quantifiers"
  | "agreement-tags-conjunctions"
  | "advanced-mastery";

export interface GrammarModuleMeta {
  id: GrammarModuleId;
  order: number;
  levelRange: string;
  icon: string;
  title: Bilingual;
  description: Bilingual;
}

export interface GrammarExample {
  en: string;
  ar: string;
  highlight: string;
}

export interface GrammarQuickCheck {
  prompt: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: Bilingual;
}

export interface GrammarUnit {
  id: string;
  order: number;
  moduleId: GrammarModuleId;
  level: CefrLevel;
  title: Bilingual;
  overview: Bilingual;
  formula: string;
  forms?: {
    affirmative: string;
    negative: string;
    question: string;
  };
  rules: Bilingual[];
  examples: GrammarExample[];
  arabicInterferenceTip: Bilingual;
  commonMistake: {
    wrong: string;
    right: string;
    why: Bilingual;
  };
  quickCheck: [GrammarQuickCheck, GrammarQuickCheck, GrammarQuickCheck];
}
