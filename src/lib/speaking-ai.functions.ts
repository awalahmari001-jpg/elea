import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const liveSpeakingInputSchema = z.object({
  situationId: z.string().trim().min(1).max(80),
  turns: z
    .array(
      z.object({
        speaker: z.enum(["partner", "learner"]),
        text: z.string().trim().min(1).max(1600),
      }),
    )
    .min(1)
    .max(30),
});

const examinerFollowUpSchema = z.object({
  examTitle: z.string().trim().min(1).max(120),
  partLabel: z.string().trim().min(1).max(80),
  originalPrompt: z.string().trim().min(1).max(800),
  learnerAnswer: z.string().trim().min(1).max(2000),
});

export const speakingLiveTurn = createServerFn({ method: "POST" })
  .validator((input: unknown) => liveSpeakingInputSchema.parse(input))
  .handler(async ({ data }) => {
    const { runLiveSpeakingTurn } = await import("./speaking-ai.server");
    return await runLiveSpeakingTurn(data);
  });

export const examinerLiveFollowUp = createServerFn({ method: "POST" })
  .validator((input: unknown) => examinerFollowUpSchema.parse(input))
  .handler(async ({ data }) => {
    const { runExaminerFollowUp } = await import("./speaking-ai.server");
    return await runExaminerFollowUp(data);
  });
