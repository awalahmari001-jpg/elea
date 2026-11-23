import { createFileRoute } from "@tanstack/react-router";

import { IeltsVocabStudio } from "@/components/vocab/ielts-vocab-studio";
import { pageMeta } from "@/lib/i18n/head";

export const Route = createFileRoute("/ielts-vocabulary")({
  head: ({ match }) => pageMeta(match.context.locale, "ieltsVocab"),
  component: IeltsVocabStudio,
});
