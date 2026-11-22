import type { Locale } from "@/lib/i18n/config";

export type Bilingual = Record<Locale, string>;
export type LessonCourse = "a1" | "a2" | "b1" | "b2" | "c1" | "c2" | "ielts";
export type LessonSkill = "grammar" | "reading" | "listening" | "writing" | "speaking";
export interface LessonQuestion {
  prompt: string;
  options: string[];
  correct: number;
  explanation: Bilingual;
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
}
