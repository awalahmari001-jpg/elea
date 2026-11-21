import { createFileRoute } from "@tanstack/react-router";

import { PathPage } from "@/components/paths/path-page";
import { pageMeta } from "@/lib/i18n/head";

export const Route = createFileRoute("/kids")({
  head: ({ match }) => pageMeta(match.context.locale, "kids"),
  component: () => <PathPage pathId="kids" />,
});
