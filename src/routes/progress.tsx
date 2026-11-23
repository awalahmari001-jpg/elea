import { createFileRoute } from "@tanstack/react-router";

import { ProgressDashboard } from "@/components/progress/progress-dashboard";
import { pageMeta } from "@/lib/i18n/head";

export const Route = createFileRoute("/progress")({
  head: ({ match }) => pageMeta(match.context.locale, "progress"),
  component: ProgressPage,
});

function ProgressPage() {
  return <ProgressDashboard />;
}
