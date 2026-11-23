import type { Lesson } from "./lesson-types";
import { CORE_A1_LESSONS } from "./cefr/core-a1";
import { CORE_A2_LESSONS } from "./cefr/core-a2";
import { CORE_B1_LESSONS } from "./cefr/core-b1";
import { CORE_B2_LESSONS } from "./cefr/core-b2";
import { CORE_C1_LESSONS } from "./cefr/core-c1";
import { CORE_C2_LESSONS } from "./cefr/core-c2";
import { ALL_LISTENING_LESSONS } from "./cefr/listening-lessons";
import { ALL_READING_PASSAGES } from "./cefr/reading-passages";

function assembleLevel(course: "a1" | "a2" | "b1" | "b2" | "c1" | "c2", core: Lesson[]): Lesson[] {
  const [first, ...rest] = core;
  const listening = ALL_LISTENING_LESSONS.filter((l) => l.course === course);
  const passages = ALL_READING_PASSAGES.filter((l) => l.course === course);
  const grammar = rest.filter((l) => l.skill === "grammar");
  const focusedReading = rest.filter((l) => l.skill === "reading");
  const writing = rest.filter((l) => l.skill === "writing");
  const speaking = rest.filter((l) => l.skill === "speaking");
  // Keep each level's original free-preview lesson first in curriculum order.
  return [
    ...(first ? [first] : []),
    ...grammar,
    ...passages,
    ...focusedReading,
    ...listening,
    ...writing,
    ...speaking,
  ];
}

/**
 * 180 Task-Based Language Learning (TBLL) lessons across CEFR A1–C2:
 * 30 detailed lessons per level (6 grammar, 6 reading [including 3 full 10-question passages],
 * 6 level-based acoustic listening lessons, 6 writing tasks, and 6 speaking tasks).
 */
export const LEVEL_LESSONS: Lesson[] = [
  ...assembleLevel("a1", CORE_A1_LESSONS),
  ...assembleLevel("a2", CORE_A2_LESSONS),
  ...assembleLevel("b1", CORE_B1_LESSONS),
  ...assembleLevel("b2", CORE_B2_LESSONS),
  ...assembleLevel("c1", CORE_C1_LESSONS),
  ...assembleLevel("c2", CORE_C2_LESSONS),
];
