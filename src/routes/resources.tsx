import { createFileRoute } from "@tanstack/react-router";

import { ResourcesLibraryView } from "@/components/resources/resources-library-view";
import { pageMeta } from "@/lib/i18n/head";

export const Route = createFileRoute("/resources")({
  head: ({ match }) => pageMeta(match.context.locale, "resources"),
  component: ResourcesLibraryView,
});
