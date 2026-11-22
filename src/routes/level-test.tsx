import { createFileRoute } from "@tanstack/react-router";

import { PlacementTest } from "@/components/placement/placement-test";
import { pageMeta } from "@/lib/i18n/head";

export const Route = createFileRoute("/level-test")({
  head: ({ match }) => pageMeta(match.context.locale, "placement"),
  component: LevelTestPage,
});

function LevelTestPage() {
  return (
    <section className="bg-hero py-10 md:py-16">
      <div className="container-page">
        <PlacementTest />
      </div>
    </section>
  );
}
