import { createFileRoute } from "@tanstack/react-router";

import { AdminTeacherStudio } from "@/components/admin/admin-teacher-studio";
import { pageMeta } from "@/lib/i18n/head";

export const Route = createFileRoute("/admin")({
  head: ({ match }) => pageMeta(match.context.locale, "admin"),
  component: AdminTeacherStudio,
});
