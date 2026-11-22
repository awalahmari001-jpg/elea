import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { TEST_LENGTH, isValidTest, questionsFor, scorePlacement } from "./placement";

/** Limits keep requests small and cheap. */
export const WRITING_MAX_CHARS = 1200;

const inputSchema = z.object({
  questionIds: z.array(z.string().max(20)).length(TEST_LENGTH).refine(isValidTest, "Invalid test"),
  answers: z.record(z.string().max(20), z.string().max(300).nullable()).refine(
    (a) => Object.keys(a).length <= TEST_LENGTH,
    "Too many answers",
  ),
  writing: z.string().trim().max(WRITING_MAX_CHARS),
  speakingConfidence: z.number().int().min(1).max(4).nullable(),
});

/**
 * Scores the test on the server (the browser's score is never trusted) and asks
 * the AI for a recommendation. Always returns the score; `ai` is null if the AI failed.
 */
export const assessPlacement = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const result = scorePlacement(questionsFor(data.questionIds), data.answers);
    const { runPlacementAssessment } = await import("./placement-ai.server");
    const ai = await runPlacementAssessment({
      result,
      writing: data.writing,
      speakingConfidence: data.speakingConfidence,
    });
    return ai.ok ? { result: { ...result, ai: ai.ai }, aiError: null } : { result, aiError: ai.error };
  });
