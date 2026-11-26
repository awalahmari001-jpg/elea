import { createFileRoute } from "@tanstack/react-router";

import { MockExamCenter } from "@/components/exams/mock-exam-center";
import { pageMeta } from "@/lib/i18n/head";

export const Route = createFileRoute("/mock-exams")({
  head: ({ match }) => pageMeta(match.context.locale, "mockExams"),
  component: MockExamCenter,
});
