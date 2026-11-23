import { createFileRoute } from "@tanstack/react-router";

import { BusinessCourseHub } from "@/components/business/business-course-hub";
import { pageMeta } from "@/lib/i18n/head";

export const Route = createFileRoute("/business")({
  head: ({ match }) => pageMeta(match.context.locale, "business"),
  component: BusinessCourseHub,
});
