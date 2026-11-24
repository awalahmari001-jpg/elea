import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const LEVEL_ENUM = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

const assistantInputSchema = z.object({
  mode: z.enum(["ask", "grammar", "vocabulary", "mistakes", "report"]),
  question: z.string().trim().min(1).max(1000),
  locale: z.enum(["en", "ar"]),
  context: z.object({
    studyingLevel: z.enum(LEVEL_ENUM),
    targetLevel: z.enum(LEVEL_ENUM),
    objectives: z.array(z.string().max(40)).max(10),
    overallSkillScore: z.number().min(0).max(100),
    weakSkills: z.array(z.object({ name: z.string().max(60), score: z.number() })).max(7),
    strongSkills: z.array(z.object({ name: z.string().max(60), score: z.number() })).max(7),
    completedLessons: z.number().min(0).max(5000),
    revisionLessons: z.array(z.string().max(120)).max(6),
    wordsMastered: z.number().min(0).max(50000),
    selfLearningMistakes: z.array(z.string().max(240)).max(6),
    upcomingEvents: z.array(z.string().max(160)).max(6),
    studyMinutesWeek: z.number().min(0).max(10000),
    weeklyTargetMinutes: z.number().min(0).max(10000),
  }),
});

export const askLearningAssistant = createServerFn({ method: "POST" })
  .validator((input: unknown) => assistantInputSchema.parse(input))
  .handler(async ({ data }) => {
    const { runLearningAssistant } = await import("./assistant-ai.server");
    return await runLearningAssistant(data);
  });
