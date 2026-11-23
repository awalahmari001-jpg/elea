import { createFileRoute } from "@tanstack/react-router";

import { SelfLearningStudio } from "@/components/self-learning/self-learning-studio";
import { CEFR_LEVELS, type CefrLevel } from "@/content/courses";
import { pageMeta } from "@/lib/i18n/head";

function parseLevel(raw: unknown): CefrLevel | "ALL" | undefined {
  if (typeof raw !== "string") return undefined;
  const upper = raw.toUpperCase();
  if (upper === "ALL") return "ALL";
  return (CEFR_LEVELS as readonly string[]).includes(upper) ? (upper as CefrLevel) : undefined;
}

export const Route = createFileRoute("/self-learning")({
  validateSearch: (search: Record<string, unknown>): { level?: CefrLevel | "ALL" } => {
    const level = parseLevel(search["level"]);
    return level ? { level } : {};
  },
  head: ({ match }) => pageMeta(match.context.locale, "selfLearning"),
  component: SelfLearningPage,
});

function SelfLearningPage() {
  const { level } = Route.useSearch();
  return <SelfLearningStudio {...(level ? { initialLevel: level } : {})} />;
}
