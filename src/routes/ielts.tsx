import { createFileRoute } from "@tanstack/react-router";

import { IeltsHub } from "@/components/learning/ielts-hub";
import { pageMeta } from "@/lib/i18n/head";

export const Route = createFileRoute("/ielts")({
  head: ({ match }) => pageMeta(match.context.locale, "ielts"),
  component: IeltsHub,
});
