import type { Lesson } from "../lesson-types";
import { LISTENING_LOWER } from "./listening-lower";
import { LISTENING_UPPER } from "./listening-upper";

/** 36 Professional Level-Based Listening TBLL Lessons (6 per CEFR level A1–C2). */
export const ALL_LISTENING_LESSONS: Lesson[] = [...LISTENING_LOWER, ...LISTENING_UPPER];
