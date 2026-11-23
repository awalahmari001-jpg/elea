import type { LessonQuestion, QuestionFormat } from "@/content/lesson-types";
import { wordCount } from "@/lib/speech";

export type QuestionAnswer =
  | { format: "multiple-choice"; selectedIndex: number }
  | { format: "pick-right-word"; selectedIndex: number }
  | { format: "rearrange-words"; selectedIndices: number[] }
  | { format: "fit-sentence"; text: string };

export function getQuestionFormat(question: LessonQuestion): QuestionFormat {
  return question.format ?? "multiple-choice";
}

/** Normalize punctuation, smart quotes, case, and spacing for fair sentence comparison. */
export function normalizeSentence(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[—–]/g, " ")
    .replace(/[^a-z0-9'\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Deterministic scramble of word tiles that guarantees order != original whenever possible. */
export function scrambleWords(orderedWords: string[], seedText: string): string[] {
  const items = [...orderedWords];
  if (items.length <= 1) return items;

  let hash = 2166136261;
  for (let i = 0; i < seedText.length; i++) {
    hash ^= seedText.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  for (let i = items.length - 1; i > 0; i--) {
    hash ^= hash << 13;
    hash ^= hash >>> 17;
    hash ^= hash << 5;
    const j = Math.abs(hash) % (i + 1);
    const tmp = items[i];
    const swap = items[j];
    if (tmp !== undefined && swap !== undefined) {
      items[i] = swap;
      items[j] = tmp;
    }
  }

  const unchanged = items.every((word, idx) => word === orderedWords[idx]);
  if (unchanged && items.length >= 2) {
    const first = items.shift();
    if (first !== undefined) items.push(first);
  }
  return items;
}

export function buildSentenceFromIndices(scrambled: string[], indices: number[]): string {
  return indices
    .map((idx) => scrambled[idx] ?? "")
    .filter(Boolean)
    .join(" ");
}

export function evaluateRearrange(
  scrambled: string[],
  selectedIndices: number[],
  orderedWords: string[],
): boolean {
  if (selectedIndices.length !== orderedWords.length) return false;
  const built = normalizeSentence(buildSentenceFromIndices(scrambled, selectedIndices));
  const target = normalizeSentence(orderedWords.join(" "));
  return built === target;
}

function matchesTermGroup(normalizedInput: string, termGroup: string): boolean {
  const padded = ` ${normalizedInput} `;
  const alternatives = termGroup
    .split("|")
    .map((alt) => normalizeSentence(alt))
    .filter(Boolean);
  return alternatives.some((alt) => padded.includes(` ${alt} `));
}

export interface FitSentenceEvaluation {
  isCorrect: boolean;
  matchedCues: string[];
  missingCues: string[];
  tooShort: boolean;
  wordsEntered: number;
  minWords: number;
}

export function evaluateFitSentence(
  input: string,
  question: LessonQuestion,
): FitSentenceEvaluation {
  const minWords = question.minWords ?? 4;
  const wordsEntered = wordCount(input);
  const normalizedInput = normalizeSentence(input);
  const modelNormalized = normalizeSentence(question.options[question.correct] ?? "");
  const cueWords = question.cueWords ?? [];
  const requiredTerms = question.requiredTerms ?? cueWords;

  const matchedCues: string[] = [];
  const missingCues: string[] = [];

  for (let i = 0; i < requiredTerms.length; i++) {
    const termGroup = requiredTerms[i];
    if (!termGroup) continue;
    const displayLabel = cueWords[i] ?? termGroup.split("|")[0] ?? termGroup;
    if (matchesTermGroup(normalizedInput, termGroup)) {
      matchedCues.push(displayLabel);
    } else {
      missingCues.push(displayLabel);
    }
  }

  const tooShort = wordsEntered < minWords;
  const exactModelMatch = Boolean(modelNormalized && normalizedInput === modelNormalized);
  const isCorrect = exactModelMatch || (!tooShort && missingCues.length === 0);

  return {
    isCorrect,
    matchedCues,
    missingCues,
    tooShort,
    wordsEntered,
    minWords,
  };
}

export function isQuestionAnswered(
  question: LessonQuestion,
  answer: QuestionAnswer | undefined,
): boolean {
  if (!answer) return false;
  const format = getQuestionFormat(question);
  if (format === "multiple-choice" || format === "pick-right-word") {
    return (
      (answer.format === "multiple-choice" || answer.format === "pick-right-word") &&
      answer.selectedIndex >= 0
    );
  }
  if (format === "rearrange-words") {
    return (
      answer.format === "rearrange-words" &&
      answer.selectedIndices.length === (question.orderedWords?.length ?? 0) &&
      answer.selectedIndices.length > 0
    );
  }
  return answer.format === "fit-sentence" && answer.text.trim().length > 0;
}

export function isQuestionCorrect(
  question: LessonQuestion,
  answer: QuestionAnswer | undefined,
): boolean {
  if (!answer) return false;
  const format = getQuestionFormat(question);
  if (format === "multiple-choice" || format === "pick-right-word") {
    return (
      (answer.format === "multiple-choice" || answer.format === "pick-right-word") &&
      answer.selectedIndex === question.correct
    );
  }
  if (format === "rearrange-words") {
    if (answer.format !== "rearrange-words" || !question.orderedWords?.length) return false;
    const scrambled = scrambleWords(question.orderedWords, question.prompt);
    return evaluateRearrange(scrambled, answer.selectedIndices, question.orderedWords);
  }
  if (answer.format !== "fit-sentence") return false;
  return evaluateFitSentence(answer.text, question).isCorrect;
}
