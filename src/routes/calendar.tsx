import { createFileRoute } from "@tanstack/react-router";

import { LearningCalendarView } from "@/components/calendar/learning-calendar-view";
import { pageMeta } from "@/lib/i18n/head";

export const Route = createFileRoute("/calendar")({
  head: ({ match }) => pageMeta(match.context.locale, "calendar"),
  component: LearningCalendarView,
});
