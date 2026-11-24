import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  CheckCircle2,
  FileText,
  Printer,
  Search,
  Sparkles,
  Volume2,
} from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CEFR_LEVELS, type CefrLevel } from "@/content/courses";
import {
  GLOSSARY_ENTRIES,
  GRAMMAR_QUICK_CARDS,
  PRINTABLE_STUDY_GUIDES,
  type GlossaryCategoryId,
} from "@/content/resources-glossary";
import { playSpeech } from "@/hooks/use-speech";

export function ResourcesLibraryView() {
  const { t, locale, dir } = useI18n();
  const rt = t.resourcesPage;

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<GlossaryCategoryId | "all">("all");
  const [levelFilter, setLevelFilter] = useState<CefrLevel | "all">("all");

  const filteredGlossary = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY_ENTRIES.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (levelFilter !== "all" && item.level !== levelFilter) return false;
      if (!q) return true;
      return (
        item.term.toLowerCase().includes(q) ||
        item.arabic.toLowerCase().includes(q) ||
        item.definition.en.toLowerCase().includes(q) ||
        item.definition.ar.toLowerCase().includes(q)
      );
    });
  }, [query, category, levelFilter]);

  const categoryLabels: Record<GlossaryCategoryId | "all", string> = {
    all: rt.catAll,
    cefr: rt.catCefr,
    ielts: rt.catIelts,
    business: rt.catBusiness,
    grammar: rt.catGrammar,
  };

  return (
    <div className="container-page space-y-12 py-10 md:py-14" dir={dir}>
      {/* Hero Banner */}
      <section className="rounded-3xl border-2 border-foreground/85 bg-gradient-to-br from-primary/10 via-card to-accent/15 p-6 shadow-ink md:p-9">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl space-y-3">
            <Badge variant="default" className="gap-1.5">
              <BookMarked className="size-3.5" aria-hidden />
              {rt.eyebrow}
            </Badge>
            <h1 className="display-heading text-3xl font-extrabold tracking-tight md:text-4xl">
              {rt.title}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {rt.subtitle}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="gap-2 rounded-full print:hidden"
            onClick={() => {
              if (typeof window !== "undefined") window.print();
            }}
          >
            <Printer className="size-4" aria-hidden />
            {rt.printGuidesBtn}
          </Button>
        </div>
      </section>

      {/* SECTION 1: Searchable Bilingual Glossary (EN / AR / IPA / Audio) */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="display-heading flex items-center gap-2 text-2xl font-extrabold">
              <BookOpen className="size-5 text-primary" aria-hidden />
              {rt.glossaryTitle}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{rt.glossarySubtitle}</p>
          </div>
          <Badge variant="secondary" dir="ltr">
            {filteredGlossary.length} / {GLOSSARY_ENTRIES.length}
          </Badge>
        </div>

        {/* Search + Facet Filters */}
        <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
          <div className="relative">
            <Search
              className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={rt.searchPlaceholder}
              aria-label={rt.searchPlaceholder}
              className="ps-9"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5" role="group" aria-label={rt.glossaryTitle}>
              {(["all", "cefr", "ielts", "business", "grammar"] as const).map((cat) => (
                <Button
                  key={cat}
                  type="button"
                  size="sm"
                  variant={category === cat ? "default" : "outline"}
                  className="rounded-full text-xs font-bold"
                  onClick={() => setCategory(cat)}
                >
                  {categoryLabels[cat]}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-1">
              <Button
                type="button"
                size="sm"
                variant={levelFilter === "all" ? "secondary" : "ghost"}
                className="rounded-full px-2.5 text-xs font-bold"
                onClick={() => setLevelFilter("all")}
              >
                {rt.allLevels}
              </Button>
              {CEFR_LEVELS.map((lvl) => (
                <Button
                  key={lvl}
                  type="button"
                  size="sm"
                  variant={levelFilter === lvl ? "secondary" : "ghost"}
                  className="rounded-full px-2.5 text-xs font-bold"
                  onClick={() => setLevelFilter(lvl)}
                >
                  {lvl}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Glossary Cards */}
        {filteredGlossary.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
            {rt.noGlossaryResults}
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredGlossary.map((item) => (
              <Card key={item.id} className="border-border/80">
                <CardContent className="space-y-2.5 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2" dir="ltr">
                        <span className="text-lg font-extrabold text-foreground">{item.term}</span>
                        <span className="font-mono text-xs text-primary">{item.ipa}</span>
                      </div>
                      <div className="text-xs font-bold text-primary">{item.arabic}</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Badge variant="secondary" dir="ltr" className="text-[11px]">
                        {item.level}
                      </Badge>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        aria-label={`Pronounce ${item.term}`}
                        onClick={() => playSpeech(`${item.term}. ${item.example}`, 0.88, "female")}
                      >
                        <Volume2 className="size-4 text-primary" aria-hidden />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {item.definition[locale]}
                  </p>
                  <p
                    className="rounded-xl bg-muted/40 px-3 py-2 text-xs font-medium text-foreground"
                    dir="ltr"
                  >
                    “{item.example}”
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 2: A1–C2 Grammar Quick-Reference Cards */}
      <section className="space-y-5">
        <div>
          <h2 className="display-heading flex items-center gap-2 text-2xl font-extrabold">
            <Sparkles className="size-5 text-primary" aria-hidden />
            {rt.grammarRefTitle}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{rt.grammarRefSubtitle}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {GRAMMAR_QUICK_CARDS.map((card) => (
            <Card
              key={card.id}
              className="flex flex-col justify-between border-2 border-foreground/15"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="default" dir="ltr">
                    CEFR {card.level}
                  </Badge>
                </div>
                <CardTitle className="pt-1 text-base font-extrabold">
                  {card.title[locale]}
                </CardTitle>
                <CardDescription className="font-mono text-xs text-primary" dir="ltr">
                  {card.formula}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-4 text-xs">
                <div className="space-y-2.5">
                  <p className="text-muted-foreground">{card.useWhen[locale]}</p>
                  <div className="space-y-1 rounded-xl border border-amber-500/35 bg-amber-500/8 p-3">
                    <div className="font-bold text-destructive line-through" dir="ltr">
                      ✗ {card.commonMistake.wrong}
                    </div>
                    <div className="font-bold text-emerald-700 dark:text-emerald-300" dir="ltr">
                      ✓ {card.commonMistake.right}
                    </div>
                    <p className="pt-0.5 text-[11px] text-muted-foreground">
                      {card.commonMistake.note[locale]}
                    </p>
                  </div>
                </div>

                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="w-full justify-between rounded-full"
                >
                  <Link to={card.practiceTo}>
                    <span>{rt.practiseRuleBtn}</span>
                    <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION 3: Printable Study Guides & Checklists */}
      <section className="space-y-5">
        <div>
          <h2 className="display-heading flex items-center gap-2 text-2xl font-extrabold">
            <FileText className="size-5 text-primary" aria-hidden />
            {rt.guidesTitle}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{rt.guidesSubtitle}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {PRINTABLE_STUDY_GUIDES.map((guide) => (
            <Card key={guide.id} className="border-2 border-foreground/15">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-3xl" aria-hidden>
                    {guide.emoji}
                  </span>
                  <Badge variant="outline" className="text-[11px]">
                    {guide.audience[locale]}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-extrabold">{guide.title[locale]}</CardTitle>
                <CardDescription>{guide.summary[locale]}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-xs">
                  {guide.checklist.map((point) => (
                    <li key={point.en} className="flex items-start gap-2 text-foreground">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-emerald-600"
                        aria-hidden
                      />
                      <span>{point[locale]}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  size="sm"
                  variant="secondary"
                  className="rounded-full text-xs font-bold print:hidden"
                >
                  <Link to={guide.relatedTo}>
                    {rt.openTrackBtn}
                    <ArrowRight className="ms-1.5 size-3.5 rtl:rotate-180" aria-hidden />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
