import { createFileRoute } from "@tanstack/react-router";

import { CompleteGrammarHub } from "@/components/grammar/complete-grammar-hub";
import { pageMeta } from "@/lib/i18n/head";

export const Route = createFileRoute("/grammar")({
  head: ({ match }) => pageMeta(match.context.locale, "grammar"),
  component: CompleteGrammarHub,
});
