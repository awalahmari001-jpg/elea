import { createFileRoute } from "@tanstack/react-router";

import { KidsWorldHub } from "@/components/kids/kids-world-hub";
import { pageMeta } from "@/lib/i18n/head";

export const Route = createFileRoute("/kids")({
  head: ({ match }) => pageMeta(match.context.locale, "kids"),
  component: KidsWorldHub,
});
