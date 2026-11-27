import { createFileRoute } from "@tanstack/react-router";

import { WorkshopStudio } from "@/components/workshops/workshop-studio";
import { pageMeta } from "@/lib/i18n/head";

type WorkshopTab = "setup" | "live" | "history" | "speaking-through-writing";

export const Route = createFileRoute("/workshops")({
  validateSearch: (search: Record<string, unknown>): { scenario?: string; tab?: WorkshopTab } => {
    const scenario = typeof search["scenario"] === "string" ? search["scenario"] : undefined;
    const rawTab = search["tab"];
    const tab: WorkshopTab | undefined =
      rawTab === "speaking-through-writing" || rawTab === "setup" || rawTab === "history"
        ? rawTab
        : undefined;
    return {
      ...(scenario ? { scenario } : {}),
      ...(tab ? { tab } : {}),
    };
  },
  head: ({ match }) => pageMeta(match.context.locale, "workshops"),
  component: WorkshopsPage,
});

function WorkshopsPage() {
  const { scenario, tab } = Route.useSearch();
  return (
    <WorkshopStudio
      {...(scenario ? { initialScenarioId: scenario } : {})}
      {...(tab ? { initialTab: tab } : {})}
    />
  );
}
