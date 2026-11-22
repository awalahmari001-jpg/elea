import { CEFR_LEVELS, type CefrLevel } from "@/content/courses";
import { QUESTION_BANK, getQuestion, type PlacementQuestion } from "@/content/placement-questions";

/**
 * Placement test scoring.
 * Rule (total score bands, 60 questions):
 *   0–10 → A1, 11–20 → A2, 21–30 → B1, 31–40 → B2, 41–50 → C1, 51–60 → C2
 */
export const QUESTIONS_PER_LEVEL = 10;

export const TEST_LENGTH = QUESTIONS_PER_LEVEL * CEFR_LEVELS.length; // 60

/**
 * Builds one test: QUESTIONS_PER_LEVEL random questions from each level's bank,
 * easiest level first. `random` is injectable for tests.
 */
export function drawTest(random: () => number = Math.random): string[] {
  return CEFR_LEVELS.flatMap((level) => {
    const pool = [...QUESTION_BANK[level]];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [pool[i], pool[j]] = [pool[j]!, pool[i]!];
    }
    return pool.slice(0, QUESTIONS_PER_LEVEL).map((q) => q.id);
  });
}

/** True when ids form a valid test: known, unique, exactly QUESTIONS_PER_LEVEL per level. */
export function isValidTest(ids: string[]): boolean {
  if (ids.length !== TEST_LENGTH || new Set(ids).size !== ids.length) return false;
  const counts = new Map<CefrLevel, number>();
  for (const id of ids) {
    const q = getQuestion(id);
    if (!q) return false;
    counts.set(q.level, (counts.get(q.level) ?? 0) + 1);
  }
  return CEFR_LEVELS.every((l) => counts.get(l) === QUESTIONS_PER_LEVEL);
}

export function questionsFor(ids: string[]): PlacementQuestion[] {
  return ids.map((id) => getQuestion(id)).filter((q): q is PlacementQuestion => Boolean(q));
}

export function levelFromScore(totalCorrect: number): CefrLevel {
  const band = Math.ceil(Math.max(0, totalCorrect) / QUESTIONS_PER_LEVEL) - 1;
  const index = Math.min(Math.max(band, 0), CEFR_LEVELS.length - 1);
  return CEFR_LEVELS[index] ?? "A1";
}

/** answers: question id -> chosen option text (or null for "I don't know") */
export type PlacementAnswers = Record<string, string | null>;

export type Bilingual = { en: string; ar: string };

/** What the AI adds on top of the score (see placement-ai.server.ts). */
export type AiAssessment = {
  recommendedLevel: CefrLevel;
  writingLevel: CefrLevel | null;
  recommendSpeaking: boolean;
  summary: Bilingual;
  strengths: Bilingual[];
  improvements: Bilingual[];
  speakingReason: Bilingual;
};

export type PlacementResult = {
  total: number;
  outOf: number;
  /** Level from the score bands alone */
  level: CefrLevel;
  byLevel: Record<CefrLevel, number>;
  takenAt: string;
  /** Present when the AI assessment succeeded */
  ai?: AiAssessment;
};

/** The level we recommend: the AI's choice when available, otherwise the score level. */
export function finalLevel(result: PlacementResult): CefrLevel {
  return result.ai?.recommendedLevel ?? result.level;
}

/**
 * Safety rule: the AI may move the recommendation at most ONE level away from the
 * score level (so a writing sample can't push a learner from A1 to C2).
 */
export function clampToNeighbour(scoreLevel: CefrLevel, aiLevel: CefrLevel): CefrLevel {
  const s = CEFR_LEVELS.indexOf(scoreLevel);
  const a = CEFR_LEVELS.indexOf(aiLevel);
  const clamped = Math.min(Math.max(a, s - 1), s + 1);
  return CEFR_LEVELS[clamped] ?? scoreLevel;
}

export function scorePlacement(
  questions: PlacementQuestion[],
  answers: PlacementAnswers,
  now: Date = new Date(),
): PlacementResult {
  const byLevel = Object.fromEntries(CEFR_LEVELS.map((l) => [l, 0])) as Record<CefrLevel, number>;
  let total = 0;
  for (const q of questions) {
    if (answers[q.id] === q.options[0]) {
      total += 1;
      byLevel[q.level] += 1;
    }
  }
  return { total, outOf: questions.length, level: levelFromScore(total), byLevel, takenAt: now.toISOString() };
}

/** Same shuffle every time for the same question, so options don't jump around. */
export function shuffledOptions(q: PlacementQuestion): string[] {
  let seed = 0;
  for (const ch of q.id) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  const out = [...q.options];
  for (let i = out.length - 1; i > 0; i--) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    const j = seed % (i + 1);
    const tmp = out[i]!;
    out[i] = out[j]!;
    out[j] = tmp;
  }
  return out;
}
