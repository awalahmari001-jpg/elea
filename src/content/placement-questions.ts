import type { CefrLevel } from "./courses";
import { A1_QUESTIONS } from "./question-bank/a1";
import { A2_QUESTIONS } from "./question-bank/a2";
import { B1_QUESTIONS } from "./question-bank/b1";
import { B2_QUESTIONS } from "./question-bank/b2";
import { C1_QUESTIONS } from "./question-bank/c1";
import { C2_QUESTIONS } from "./question-bank/c2";

/**
 * Placement-test question bank: 60 questions for EACH CEFR level (360 in total),
 * stored per level in src/content/question-bank/.
 * Every test draws QUESTIONS_PER_LEVEL questions at random from each level.
 *
 * Each question tests one CEFR point (`focus`) and explains why the correct answer
 * is right (`explanation`, English + Arabic). options[0] is always the correct
 * answer — the quiz shuffles options before showing them.
 */
export type PlacementQuestion = {
  id: string;
  level: CefrLevel;
  prompt: string;
  /** options[0] is always the correct answer */
  options: string[];
  /** The CEFR grammar/vocabulary point being tested */
  focus: string;
  /** Why the correct answer is right, in English and Arabic */
  explanation: { en: string; ar: string };
};

export const QUESTION_BANK: Record<CefrLevel, PlacementQuestion[]> = {
  A1: A1_QUESTIONS,
  A2: A2_QUESTIONS,
  B1: B1_QUESTIONS,
  B2: B2_QUESTIONS,
  C1: C1_QUESTIONS,
  C2: C2_QUESTIONS,
};

export const ALL_QUESTIONS: PlacementQuestion[] = Object.values(QUESTION_BANK).flat();

const BY_ID = new Map(ALL_QUESTIONS.map((q) => [q.id, q]));

export function getQuestion(id: string): PlacementQuestion | undefined {
  return BY_ID.get(id);
}
