import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  mode: z.enum(["paraphrase", "academic-sentence", "speaking", "writing"]),
  prompt: z.string().trim().min(1).max(600),
  targetWords: z.array(z.string().trim().min(1).max(60)).max(12),
  learnerResponse: z.string().trim().min(1).max(1600),
});

/**
 * Evaluates a learner's IELTS paraphrasing, academic sentence, speaking, or writing response
 * under the IELTS Lexical Resource criterion on the server.
 */
export const evaluateIeltsLexical = createServerFn({ method: "POST" })
  .validator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const { runIeltsLexicalEvaluation } = await import("./ielts-lexical-ai.server");
    return await runIeltsLexicalEvaluation(data);
  });
