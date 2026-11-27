import { createFileRoute } from "@tanstack/react-router";

import { StepQuestionBankStudio } from "@/components/exams/step-question-bank";
import { pageMeta } from "@/lib/i18n/head";

export const Route = createFileRoute("/step")({
  head: ({ match }) => pageMeta(match.context.locale, "step"),
  component: StepQuestionBankStudio,
});
