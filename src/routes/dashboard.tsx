import { createFileRoute } from "@tanstack/react-router";

import { LearningDashboard } from "@/components/dashboard/learning-dashboard";
import { pageMeta } from "@/lib/i18n/head";

export const Route = createFileRoute("/dashboard")({
  head: ({ match }) => pageMeta(match.context.locale, "dashboard"),
  component: DashboardPage,
});

function DashboardPage() {
  return <LearningDashboard />;
}
