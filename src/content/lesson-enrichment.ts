import type { Lesson, LessonQuestion } from "./lesson-types";
import { GRAMMAR_GUIDES_LOWER } from "./grammar-guides-lower";
import { GRAMMAR_GUIDES_UPPER } from "./grammar-guides-upper";
import { getReadingEnrichment } from "./reading-enrichment";
import { buildExplainerVideo } from "./explainer-videos";
import { buildOrEnhanceDetailedGuide } from "./esl-deep-guides";
import {
  buildLessonObjectives,
  buildLessonPostEvaluation,
  extractLessonKeywords,
} from "./lesson-objectives";
import type { LessonEnrichmentEntry } from "./enrichment-builders";

const ALL_GRAMMAR_GUIDES: Record<string, LessonEnrichmentEntry> = {
  ...GRAMMAR_GUIDES_LOWER,
  ...GRAMMAR_GUIDES_UPPER,
};

function mergeFourFormatQuestions(
  existing: LessonQuestion[],
  entry: LessonEnrichmentEntry,
): LessonQuestion[] {
  const normalizedExisting: LessonQuestion[] = existing.map((q) => ({
    ...q,
    format: q.format ?? "multiple-choice",
  }));

  const existingPrompts = new Set(normalizedExisting.map((q) => q.prompt));
  const additions = [entry.pickWord, entry.rearrange, entry.fitSentence].filter(
    (q) => !existingPrompts.has(q.prompt),
  );

  return [...normalizedExisting, ...additions];
}

/**
 * Enriches EVERY lesson across all courses (A1–C2, IELTS, Kids, Adults) and all 5 skills with:
 * 1. Pre-lesson Learning Objectives & Mastery Missions (`objectives`) + bold-red key terms (`highlightKeywords`)
 * 2. In-depth ESL Teacher Guide (`detailedGuide`) featuring explicit rule breakdowns
 *    (e.g., He / She / It takes "is"), an Arabic ↔ English Mother-Tongue Bridge, and a Male/Female conversation
 * 3. Authentic 4:30 interactive micro-lesson video & dual-coding storyboard (`explainerVideo`)
 * 4. 10-MCQ Objective-Aligned Post-Lesson Evaluation Test (`postEvaluation`) designed directly from the given objectives
 * And additionally enriches every Grammar and Reading lesson with 4 distinct interactive question formats.
 */
export function enrichLesson(lesson: Lesson): Lesson {
  const entry: LessonEnrichmentEntry | undefined =
    lesson.skill === "grammar"
      ? ALL_GRAMMAR_GUIDES[lesson.id]
      : lesson.skill === "reading"
        ? getReadingEnrichment(lesson)
        : undefined;

  const questions = entry ? mergeFourFormatQuestions(lesson.questions, entry) : lesson.questions;
  const baseLesson: Lesson = { ...lesson, questions };

  const detailedGuide = buildOrEnhanceDetailedGuide(baseLesson, entry?.guide);
  const explainerVideo = buildExplainerVideo(baseLesson, detailedGuide);
  const highlightKeywords = extractLessonKeywords(baseLesson, detailedGuide);
  const objectives = buildLessonObjectives(baseLesson, detailedGuide);
  const postEvaluation = buildLessonPostEvaluation(baseLesson, detailedGuide, objectives);

  return {
    ...baseLesson,
    detailedGuide,
    explainerVideo,
    highlightKeywords,
    objectives,
    postEvaluation,
  };
}
