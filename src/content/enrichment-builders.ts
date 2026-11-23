import type { Bilingual, DetailedRuleGuide, LessonQuestion, QuestionKind } from "./lesson-types";

export interface LessonEnrichmentEntry {
  guide: DetailedRuleGuide;
  pickWord: LessonQuestion;
  rearrange: LessonQuestion;
  fitSentence: LessonQuestion;
}

export function makePickWord(args: {
  sentence: string;
  options: [string, string, string, string];
  correct: number;
  explanation: Bilingual;
  kind?: QuestionKind;
}): LessonQuestion {
  return {
    format: "pick-right-word",
    kind: args.kind ?? "grammar",
    prompt: `Pick the right word to complete the sentence: "${args.sentence}"`,
    sentenceTemplate: args.sentence,
    options: args.options,
    correct: args.correct,
    explanation: args.explanation,
  };
}

export function makeRearrange(args: {
  prompt?: string;
  orderedWords: string[];
  distractors?: [string, string];
  explanation: Bilingual;
  kind?: QuestionKind;
}): LessonQuestion {
  const correctSentence = args.orderedWords.join(" ");
  const fallbackA = [...args.orderedWords].reverse().join(" ");
  const fallbackB =
    args.orderedWords.length >= 3
      ? [args.orderedWords[1], args.orderedWords[0], ...args.orderedWords.slice(2)].join(" ")
      : `${correctSentence} (wrong order)`;
  const d1 =
    args.distractors?.[0] ??
    (fallbackA !== correctSentence ? fallbackA : `${correctSentence} — reversed`);
  const d2 =
    args.distractors?.[1] ??
    (fallbackB !== correctSentence && fallbackB !== d1
      ? fallbackB
      : `${correctSentence} — shifted`);
  return {
    format: "rearrange-words",
    kind: args.kind ?? "grammar",
    prompt: args.prompt ?? "Rearrange the words into the correct English sentence.",
    orderedWords: args.orderedWords,
    options: [correctSentence, d1, d2],
    correct: 0,
    explanation: args.explanation,
  };
}

export function makeFitSentence(args: {
  prompt: string;
  cueWords: string[];
  requiredTerms: string[];
  modelSentence: string;
  sentenceHint: Bilingual;
  explanation: Bilingual;
  minWords?: number;
  kind?: QuestionKind;
}): LessonQuestion {
  return {
    format: "fit-sentence",
    kind: args.kind ?? "grammar",
    prompt: args.prompt,
    cueWords: args.cueWords,
    requiredTerms: args.requiredTerms,
    sentenceHint: args.sentenceHint,
    minWords: args.minWords ?? 4,
    options: [
      args.modelSentence,
      `Incomplete fragment: ${args.cueWords.join(" ")}`,
      `Unrelated sentence without ${args.cueWords[0] ?? "the target rule"}`,
    ],
    correct: 0,
    explanation: args.explanation,
  };
}
