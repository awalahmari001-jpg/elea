import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ROLE_ENUM = [
  "business-manager",
  "hr-manager",
  "recruiter",
  "job-interviewer",
  "company-director",
  "sales-rep",
  "business-client",
  "investor",
  "project-manager",
  "marketing-specialist",
  "customer",
  "international-partner",
] as const;

const LEVEL_ENUM = ["A2", "B1", "B2", "C1", "C2"] as const;

const turnSchema = z.object({
  speaker: z.enum(["ai", "learner"]),
  text: z.string().trim().min(1).max(1600),
  usedVoice: z.boolean().optional(),
  timestamp: z.string().max(60),
});

const workshopInputSchema = z.object({
  scenarioId: z.string().trim().min(3).max(40),
  roleId: z.enum(ROLE_ENUM),
  level: z.enum(LEVEL_ENUM),
  turns: z.array(turnSchema).min(1).max(24),
});

export const workshopReplyTurn = createServerFn({ method: "POST" })
  .validator((input: unknown) => workshopInputSchema.parse(input))
  .handler(async ({ data }) => {
    const { runWorkshopReplyTurn } = await import("./workshop-ai.server");
    return await runWorkshopReplyTurn({
      scenarioId: data.scenarioId,
      roleId: data.roleId,
      level: data.level,
      turns: data.turns.map((t) => ({
        speaker: t.speaker,
        text: t.text,
        timestamp: t.timestamp,
        ...(t.usedVoice !== undefined ? { usedVoice: t.usedVoice } : {}),
      })),
    });
  });

export const evaluateWorkshopSession = createServerFn({ method: "POST" })
  .validator((input: unknown) => workshopInputSchema.parse(input))
  .handler(async ({ data }) => {
    const { runWorkshopEvaluation } = await import("./workshop-ai.server");
    return await runWorkshopEvaluation({
      scenarioId: data.scenarioId,
      roleId: data.roleId,
      level: data.level,
      turns: data.turns.map((t) => ({
        speaker: t.speaker,
        text: t.text,
        timestamp: t.timestamp,
        ...(t.usedVoice !== undefined ? { usedVoice: t.usedVoice } : {}),
      })),
    });
  });
