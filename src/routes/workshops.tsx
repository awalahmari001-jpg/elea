import { createFileRoute } from "@tanstack/react-router";

import { WorkshopStudio } from "@/components/workshops/workshop-studio";
import { pageMeta } from "@/lib/i18n/head";

export const Route = createFileRoute("/workshops")({
  validateSearch: (search: Record<string, unknown>): { scenario?: string } => {
    const scenario = typeof search["scenario"] === "string" ? search["scenario"] : undefined;
    return scenario ? { scenario } : {};
  },
  head: ({ match }) => pageMeta(match.context.locale, "workshops"),
  component: WorkshopsPage,
});

function WorkshopsPage() {
  const { scenario } = Route.useSearch();
  return <WorkshopStudio {...(scenario ? { initialScenarioId: scenario } : {})} />;
}
