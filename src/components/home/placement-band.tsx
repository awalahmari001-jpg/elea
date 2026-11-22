import { Link } from "@tanstack/react-router";
import { ClipboardCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";

export function PlacementBand() {
  const { t } = useI18n();
  return (
    <section className="py-20 md:py-24">
      <div className="container-page">
        <div className="flex flex-col items-start gap-6 rounded-3xl border-2 border-foreground/90 bg-accent p-8 text-accent-foreground shadow-ink md:flex-row md:items-center md:justify-between md:p-12">
          <div className="flex items-start gap-5">
            <span className="hidden size-14 shrink-0 place-items-center rounded-2xl bg-card text-primary sm:grid">
              <ClipboardCheck className="size-7" aria-hidden />
            </span>
            <div>
              <h2 className="text-2xl font-extrabold md:text-3xl">{t.placement.title}</h2>
              <p className="mt-2 max-w-xl text-lg opacity-85">{t.placement.body}</p>
            </div>
          </div>
          <Button asChild variant="hero" size="xl">
            <Link to="/level-test">
              <ClipboardCheck aria-hidden />
              {t.placement.cta}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
