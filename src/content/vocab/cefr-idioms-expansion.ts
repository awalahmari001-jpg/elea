import type { CefrLevel } from "@/content/courses";
import type { CompactIdiomRow } from "./ielts-vocab-expander";
import type { CefrIdiomItem } from "./vocab-types";
import {
  IELTS_IDIOMS_EDUCATION,
  IELTS_IDIOMS_ENVIRONMENT,
  IELTS_IDIOMS_TECH_AI,
} from "./ielts-idioms-1";
import {
  IELTS_IDIOMS_BUSINESS,
  IELTS_IDIOMS_GLOBALISATION,
  IELTS_IDIOMS_HEALTH,
} from "./ielts-idioms-2";
import {
  IELTS_IDIOMS_CRIME,
  IELTS_IDIOMS_GOVERNMENT,
  IELTS_IDIOMS_SOCIETY,
} from "./ielts-idioms-3";
import { IELTS_IDIOMS_CULTURE, IELTS_IDIOMS_MEDIA, IELTS_IDIOMS_SCIENCE } from "./ielts-idioms-4";
import {
  IELTS_IDIOMS_FAMILY,
  IELTS_IDIOMS_TOURISM,
  IELTS_IDIOMS_TRANSPORT,
} from "./ielts-idioms-5";

function mapRows(
  rows: readonly CompactIdiomRow[],
  register: CefrIdiomItem["register"],
  existing: CefrIdiomItem[],
  targetCount: number,
): CefrIdiomItem[] {
  const seen = new Set(existing.map((i) => i.idiom.trim().toLowerCase()));
  const result: CefrIdiomItem[] = [...existing];

  for (const [idiom, meaning, arabic, _formal, example] of rows) {
    if (result.length >= targetCount) break;
    const norm = idiom.trim().toLowerCase();
    if (!norm || seen.has(norm)) continue;
    seen.add(norm);
    result.push({
      idiom,
      meaning,
      arabic,
      register,
      example,
    });
  }

  return result;
}

const LEVEL_POOLS: Record<
  CefrLevel,
  { rows: readonly CompactIdiomRow[]; register: CefrIdiomItem["register"] }
> = {
  A1: {
    rows: [...IELTS_IDIOMS_FAMILY, ...IELTS_IDIOMS_HEALTH],
    register: "everyday",
  },
  A2: {
    rows: [...IELTS_IDIOMS_TOURISM, ...IELTS_IDIOMS_TRANSPORT],
    register: "everyday",
  },
  B1: {
    rows: [...IELTS_IDIOMS_EDUCATION, ...IELTS_IDIOMS_SOCIETY],
    register: "neutral",
  },
  B2: {
    rows: [...IELTS_IDIOMS_BUSINESS, ...IELTS_IDIOMS_MEDIA, ...IELTS_IDIOMS_TECH_AI],
    register: "professional",
  },
  C1: {
    rows: [...IELTS_IDIOMS_ENVIRONMENT, ...IELTS_IDIOMS_GOVERNMENT, ...IELTS_IDIOMS_GLOBALISATION],
    register: "academic",
  },
  C2: {
    rows: [...IELTS_IDIOMS_SCIENCE, ...IELTS_IDIOMS_CRIME, ...IELTS_IDIOMS_CULTURE],
    register: "academic",
  },
};

/** Ensures every CEFR Mastery level exposes at least 72 authentic, deduplicated idioms. */
export function expandCefrLevelIdioms(
  level: CefrLevel,
  baseIdioms: CefrIdiomItem[],
  minCount = 72,
): CefrIdiomItem[] {
  const pool = LEVEL_POOLS[level];
  return mapRows(pool.rows, pool.register, baseIdioms, minCount);
}
