import { ArrowRight, ClipboardCheck, Mic, Star } from "lucide-react";

import heroImage from "@/assets/hero-learning.webp";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="container-page grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div className="animate-rise space-y-7">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-primary shadow-card">
            <Star className="size-3.5 fill-accent text-accent" aria-hidden />
            {t.hero.eyebrow}
          </span>

          <h1 className="display-heading text-4xl text-foreground sm:text-5xl lg:text-6xl text-balance">
            {t.hero.titleStart}{" "}
            <span className="relative inline-block text-primary">
              {t.hero.titleHighlight}
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-1 -z-10 h-3 rounded-full bg-accent/70"
              />
            </span>
            {t.hero.titleEnd}
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">{t.hero.subtitle}</p>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="hero" size="xl">
              <a href="#paths">
                {t.hero.ctaPaths}
                <ArrowRight className="rtl:rotate-180" aria-hidden />
              </a>
            </Button>
            <Button variant="outline" size="xl" disabled className="bg-card">
              <ClipboardCheck aria-hidden />
              {t.hero.ctaPlacement}
              <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-bold text-foreground">
                {t.hero.soon}
              </span>
            </Button>
          </div>

          <dl className="grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6">
            {[
              { value: "3", label: t.hero.statPaths },
              { value: "A1–C2", label: t.hero.statLevels },
              { value: "عربي", label: t.hero.statArabic },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-extrabold text-primary">{stat.value}</dd>
                <dd className="text-sm text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-xl animate-rise [animation-delay:150ms]">
          <div aria-hidden className="absolute -inset-3 translate-x-4 translate-y-4 rounded-[2rem] bg-accent rtl:-translate-x-4" />
          <img
            src={heroImage}
            alt={t.hero.imageAlt}
            width={1400}
            height={933}
            className="relative aspect-[3/2] w-full rounded-[2rem] border-4 border-card object-cover shadow-lift"
          />

          <div className="absolute -bottom-6 start-4 flex animate-float items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lift sm:start-8">
            <span className="grid size-10 place-items-center rounded-xl bg-secondary text-primary">
              <Mic className="size-5" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-semibold text-muted-foreground">{t.hero.chipPronunciation}</p>
              <p className="text-lg font-extrabold text-foreground">92%</p>
            </div>
          </div>

          <div className="absolute -top-5 end-4 flex animate-float items-center gap-2 rounded-2xl bg-inverse px-4 py-3 text-inverse-foreground shadow-lift [animation-delay:1.5s] sm:end-8">
            <p className="text-xs font-semibold opacity-80">{t.hero.chipBand}</p>
            <p className="text-lg font-extrabold text-accent">7.5</p>
          </div>
        </div>
      </div>
    </section>
  );
}
