import type { CefrLevel } from "@/content/courses";
import { A1_SENTENCES } from "./a1-sentences";
import { A2_SENTENCES } from "./a2-sentences";
import { B1_SENTENCES } from "./b1-sentences";
import { B2_SENTENCES } from "./b2-sentences";
import { C1_SENTENCES } from "./c1-sentences";
import { C2_SENTENCES } from "./c2-sentences";
import { SELF_LEARNING_TOPICS, type SelfLearningTopicId, type TranslationItem } from "./types";

export { SELF_LEARNING_TOPICS };
export type {
  SelfLearningTopicId,
  SelfLearningTopicMeta,
  TranslationCriteriaScores,
  TranslationEvaluation,
  TranslationItem,
  TranslationMistake,
  TranslationVerdict,
} from "./types";

export const SELF_LEARNING_BY_LEVEL: Record<CefrLevel, TranslationItem[]> = {
  A1: A1_SENTENCES,
  A2: A2_SENTENCES,
  B1: B1_SENTENCES,
  B2: B2_SENTENCES,
  C1: C1_SENTENCES,
  C2: C2_SENTENCES,
};

/** Full 600-sentence curated Arabic-to-English bank (100 per CEFR level A1–C2). */
export const ALL_SELF_LEARNING_SENTENCES: TranslationItem[] = [
  ...A1_SENTENCES,
  ...A2_SENTENCES,
  ...B1_SENTENCES,
  ...B2_SENTENCES,
  ...C1_SENTENCES,
  ...C2_SENTENCES,
];

export function getSentenceById(id: string): TranslationItem | undefined {
  return ALL_SELF_LEARNING_SENTENCES.find((item) => item.id === id);
}

export function getSentencesByFilter(
  level: CefrLevel | "ALL",
  topic: SelfLearningTopicId | "all",
): TranslationItem[] {
  const pool = level === "ALL" ? ALL_SELF_LEARNING_SENTENCES : SELF_LEARNING_BY_LEVEL[level];
  if (topic === "all") return pool;
  return pool.filter((item) => item.topic === topic);
}

/** Deterministic daily 10-sentence challenge for a given ISO date (YYYY-MM-DD) and level. */
export function getDailyChallengeSentences(
  level: CefrLevel | "ALL",
  dateIso: string,
  count = 10,
): TranslationItem[] {
  const pool = level === "ALL" ? ALL_SELF_LEARNING_SENTENCES : SELF_LEARNING_BY_LEVEL[level];
  if (pool.length <= count) return pool;
  let hash = 0;
  const seed = `${dateIso}:${level}`;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const picked: TranslationItem[] = [];
  const used = new Set<number>();
  let cursor = hash % pool.length;
  const step = Math.max(1, Math.floor(pool.length / count));
  while (picked.length < count && used.size < pool.length) {
    if (!used.has(cursor)) {
      used.add(cursor);
      const item = pool[cursor];
      if (item) picked.push(item);
    }
    cursor = (cursor + step + 3) % pool.length;
  }
  return picked;
}
