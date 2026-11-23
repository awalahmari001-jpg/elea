import type { Lesson, LessonQuestion } from "./lesson-types";
import { GRAMMAR_GUIDES_LOWER } from "./grammar-guides-lower";
import { GRAMMAR_GUIDES_UPPER } from "./grammar-guides-upper";
import { getReadingEnrichment } from "./reading-enrichment";
import { buildExplainerVideo } from "./explainer-videos";
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
 * 1. An evidence-based 4-to-5-minute interactive micro-lesson video & dual-coding storyboard (`explainerVideo`)
 * And additionally enriches every Grammar and Reading lesson with:
 * 2. A detailed bilingual rule / reading breakdown guide (`detailedGuide`)
 * 3. At least 4 distinct interactive question formats (multiple-choice, pick-right-word, rearrange-words, fit-sentence)
 */
export function enrichLesson(lesson: Lesson): Lesson {
  if (lesson.skill !== "grammar" && lesson.skill !== "reading") {
    return {
      ...lesson,
      explainerVideo: buildExplainerVideo(lesson),
    };
  }

  const entry: LessonEnrichmentEntry | undefined =
    lesson.skill === "grammar" ? ALL_GRAMMAR_GUIDES[lesson.id] : getReadingEnrichment(lesson);

  if (!entry) {
    return {
      ...lesson,
      explainerVideo: buildExplainerVideo(lesson),
    };
  }

  const explainerVideo = buildExplainerVideo(lesson, entry.guide);
  const questions = mergeFourFormatQuestions(lesson.questions, entry);

  return {
    ...lesson,
    detailedGuide: entry.guide,
    explainerVideo,
    questions,
  };
}
