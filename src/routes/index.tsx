import { createFileRoute } from "@tanstack/react-router";

import { AdvancedStudios } from "@/components/home/advanced-studios";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { PathSelector } from "@/components/home/path-selector";
import { PlacementBand } from "@/components/home/placement-band";
import { pageMeta } from "@/lib/i18n/head";

export const Route = createFileRoute("/")({
  head: ({ match }) => pageMeta(match.context.locale, "home"),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <PathSelector />
      <AdvancedStudios />
      <Features />
      <PlacementBand />
    </>
  );
}
