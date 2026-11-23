import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getSentenceById } from "@/content/self-learning";

const inputSchema = z.object({
  sentenceId: z.string().trim().min(4).max(20),
  learnerTranslation: z.string().trim().min(1).max(600),
});

/**
 * Evaluates a learner's Arabic-to-English translation on the server against the canonical
 * 600-sentence Self-learning Pace registry.
 */
export const evaluateTranslation = createServerFn({ method: "POST" })
  .validator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const item = getSentenceById(data.sentenceId);
    if (!item) {
      throw new Error("Unknown sentence ID");
    }
    const { runTranslationEvaluation } = await import("./translation-ai.server");
    return await runTranslationEvaluation(item, data.learnerTranslation);
  });
