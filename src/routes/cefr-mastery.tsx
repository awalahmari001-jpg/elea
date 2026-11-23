import { createFileRoute } from "@tanstack/react-router";

import { CefrMasteryStudio } from "@/components/vocab/cefr-mastery-studio";
import { CEFR_LEVELS, type CefrLevel } from "@/content/courses";
import { pageMeta } from "@/lib/i18n/head";

function parseLevel(raw: unknown): CefrLevel | undefined {
  if (typeof raw !== "string") return undefined;
  const upper = raw.toUpperCase();
  return (CEFR_LEVELS as readonly string[]).includes(upper) ? (upper as CefrLevel) : undefined;
}

export const Route = createFileRoute("/cefr-mastery")({
  validateSearch: (search: Record<string, unknown>): { level?: CefrLevel } => {
    const level = parseLevel(search["level"]);
    return level ? { level } : {};
  },
  head: ({ match }) => pageMeta(match.context.locale, "cefrMastery"),
  component: CefrMasteryPage,
});

function CefrMasteryPage() {
  const { level } = Route.useSearch();
  return <CefrMasteryStudio {...(level ? { initialLevel: level } : {})} />;
}
