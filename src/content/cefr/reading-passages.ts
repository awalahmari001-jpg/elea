import type { Lesson } from "../lesson-types";
import { READING_PASSAGES_LOWER } from "./reading-passages-1";
import { READING_PASSAGES_UPPER } from "./reading-passages-2";

/** 18 full multi-paragraph TBLL Reading Passages (3 per CEFR level A1–C2, 10 questions each). */
export const ALL_READING_PASSAGES: Lesson[] = [
  ...READING_PASSAGES_LOWER,
  ...READING_PASSAGES_UPPER,
];
