import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const stwInputSchema = z.object({
  draft: z.string().trim().min(2).max(1200),
  targetLevel: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
  contextId: z.string().trim().min(1).max(60),
  customContext: z.string().trim().max(160).optional(),
});

export const evaluateSpeakingThroughWriting = createServerFn({ method: "POST" })
  .validator((input: unknown) => stwInputSchema.parse(input))
  .handler(async ({ data }) => {
    const { runSpeakingThroughWritingEvaluation } =
      await import("./speaking-through-writing-ai.server");
    return await runSpeakingThroughWritingEvaluation({
      draft: data.draft,
      targetLevel: data.targetLevel,
      contextId: data.contextId,
      ...(data.customContext !== undefined ? { customContext: data.customContext } : {}),
    });
  });
