import { createFileRoute } from "@tanstack/react-router";

import { PathPage } from "@/components/paths/path-page";
import { pageMeta } from "@/lib/i18n/head";

export const Route = createFileRoute("/adults")({
  head: ({ match }) => pageMeta(match.context.locale, "adults"),
  component: () => <PathPage pathId="adults" />,
});
