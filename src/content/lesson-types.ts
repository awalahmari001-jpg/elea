import type { Locale } from "@/lib/i18n/config";

export type Bilingual = Record<Locale, string>;
export type LessonCourse =
  | "a1"
  | "a2"
  | "b1"
  | "b2"
  | "c1"
  | "c2"
  | "ielts"
  | "kids"
  | "adults";
export type LessonSkill = "grammar" | "reading" | "listening" | "writing" | "speaking";

export type QuestionKind =
  | "comprehension"
  | "vocabulary"
  | "synonym"
  | "antonym"
  | "inference"
  | "grammar"
  | "listening"
  | "equivalent";

export interface LessonQuestion {
  prompt: string;
  options: string[];
  correct: number;
  explanation: Bilingual;
  kind?: QuestionKind;
}

export interface VocabItem {
  word: string;
  meaningEn: string;
  meaningAr: string;
  synonym?: string;
  antonym?: string;
  example: string;
}

export interface TaskPlan {
  scenario: Bilingual;
  preTask: Bilingual;
  mainTask: Bilingual;
  languageFocus: Bilingual;
  postTask: Bilingual;
}

export interface ListeningPlan {
  levelEncouragement: Bilingual;
  acousticsFocus: Bilingual;
  steps: Bilingual[];
  paraphrasePairs: { spoken: string; equivalent: string; arabic: string }[];
}

export interface Lesson {
  id: string;
  course: LessonCourse;
  skill: LessonSkill;
  title: Bilingual;
  goal: Bilingual;
  minutes: number;
  teaching: Bilingual[];
  example: string;
  pronunciation: string;
  pronunciationTip: Bilingual;
  questions: LessonQuestion[];
  writing?: { prompt: string; minimum: number; model: string; checklist: Bilingual[] };
  unit?: Bilingual;
  taskPlan?: TaskPlan;
  vocab?: VocabItem[];
  listeningPlan?: ListeningPlan;
  isReadingPassage?: boolean;
}
