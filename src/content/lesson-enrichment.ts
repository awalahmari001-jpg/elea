import type { Lesson, LessonQuestion } from "./lesson-types";
import { GRAMMAR_GUIDES_LOWER } from "./grammar-guides-lower";
import { GRAMMAR_GUIDES_UPPER } from "./grammar-guides-upper";
import { getReadingEnrichment } from "./reading-enrichment";
import { buildExplainerVideo } from "./explainer-videos";
import { buildOrEnhanceDetailedGuide } from "./esl-deep-guides";
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
 * 1. An in-depth ESL Teacher Guide (`detailedGuide`) featuring explicit rule breakdowns
 *    (e.g., He / She / It takes "is"), an Arabic ↔ English Mother-Tongue Bridge, and a Male/Female conversation.
 * 2. An authentic, classroom-style 4:30 interactive micro-lesson video & dual-coding storyboard (`explainerVideo`).
 * And additionally enriches every Grammar and Reading lesson with:
 * 3. At least 4 distinct interactive question formats (multiple-choice, pick-right-word, rearrange-words, fit-sentence).
 */
export function enrichLesson(lesson: Lesson): Lesson {
  const entry: LessonEnrichmentEntry | undefined =
    lesson.skill === "grammar"
      ? ALL_GRAMMAR_GUIDES[lesson.id]
      : lesson.skill === "reading"
        ? getReadingEnrichment(lesson)
        : undefined;

  const detailedGuide = buildOrEnhanceDetailedGuide(lesson, entry?.guide);
  const explainerVideo = buildExplainerVideo(lesson, detailedGuide);

  if (!entry) {
    return {
      ...lesson,
      detailedGuide,
      explainerVideo,
    };
  }

  const questions = mergeFourFormatQuestions(lesson.questions, entry);

  return {
    ...lesson,
    detailedGuide,
    explainerVideo,
    questions,
  };
}
