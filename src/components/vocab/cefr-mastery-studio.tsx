import { useEffect, useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  MessageSquare,
  Mic,
  MicOff,
  Sparkles,
  Target,
  Volume2,
  XCircle,
} from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { HighlightedText } from "@/components/learning/highlighted-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { CefrLevel } from "@/content/courses";
import {
  CEFR_MASTERY_INDICATORS,
  CEFR_MASTERY_LEVELS,
  getCefrMasteryLevel,
} from "@/content/vocab/cefr-mastery-data";
import type {
  CefrMasteryIndicatorId,
  CefrMasteryProductionTask,
} from "@/content/vocab/vocab-types";
import { playSpeech, useSpeech } from "@/hooks/use-speech";
import { format } from "@/lib/i18n/messages";
import {
  evaluateCefrProduction,
  type CefrProductionEvaluation,
} from "@/lib/ielts-lexical-fallback";
import { learnerStorage, type CefrMasteryProgress } from "@/lib/learner-storage";

type CefrStudioTab =
  "vocab" | "expressions" | "phrasals-idioms" | "grammar" | "domains" | "mastery-lab";

export function CefrMasteryStudio({ initialLevel = "A1" }: { initialLevel?: CefrLevel }) {
  const { t, locale } = useI18n();
  const [level, setLevel] = useState<CefrLevel>(initialLevel);
  const [activeTab, setActiveTab] = useState<CefrStudioTab>("vocab");
  const [progress, setProgress] = useState<CefrMasteryProgress>({});

  useEffect(() => {
    setProgress(learnerStorage.getCefrMastery());
  }, []);

  const data = useMemo(() => getCefrMasteryLevel(level), [level]);
  const passedIndicators = progress[level]?.passedIndicators ?? [];

  const totalIndicatorsPassed = useMemo(() => {
    return CEFR_MASTERY_LEVELS.reduce(
      (sum, item) => sum + (progress[item.level]?.passedIndicators.length ?? 0),
      0,
    );
  }, [progress]);

  const totalIndicatorsPossible = CEFR_MASTERY_LEVELS.length * CEFR_MASTERY_INDICATORS.length;

  function markIndicatorPassed(indicator: CefrMasteryIndicatorId) {
    const next = learnerStorage.saveCefrIndicator(level, indicator);
    setProgress(next);
  }

  const tabs: { id: CefrStudioTab; label: string }[] = [
    { id: "vocab", label: t.vocab.tabVocab },
    { id: "expressions", label: t.vocab.tabExpressions },
    { id: "phrasals-idioms", label: t.vocab.tabPhrasalsIdioms },
    { id: "grammar", label: t.vocab.tabGrammarPatterns },
    { id: "domains", label: t.vocab.tabDomains },
    { id: "mastery-lab", label: t.vocab.tabMasteryLab },
  ];

  const strengths = CEFR_MASTERY_INDICATORS.filter((ind) => passedIndicators.includes(ind.id));
  const weaknesses = CEFR_MASTERY_INDICATORS.filter((ind) => !passedIndicators.includes(ind.id));

  return (
    <div className="pb-16">
      {/* Hero */}
      <header className="border-b border-border bg-hero">
        <div className="container-page py-10 md:py-14">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-primary text-primary-foreground">{t.vocab.cefrEyebrow}</Badge>
            <Badge variant="outline">
              {format(t.vocab.overallCefrProgress, {
                done: totalIndicatorsPassed,
                total: totalIndicatorsPossible,
              })}
            </Badge>
          </div>
          <h1 className="display-heading mt-3 max-w-4xl text-3xl text-foreground md:text-5xl">
            {t.vocab.cefrTitle}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.vocab.cefrSubtitle}
          </p>

          <div className="mt-5 rounded-2xl border border-primary/30 bg-card/90 p-4 text-sm text-foreground">
            <p className="flex items-start gap-2.5 leading-relaxed">
              <Target className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>{t.vocab.cefrMasteryTruth}</span>
            </p>
          </div>

          {/* Progressive A1–C2 Level Selector */}
          <div
            className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6"
            role="tablist"
          >
            {CEFR_MASTERY_LEVELS.map((item) => {
              const count = progress[item.level]?.passedIndicators.length ?? 0;
              const isSelected = level === item.level;
              const isComplete = count === CEFR_MASTERY_INDICATORS.length;
              return (
                <button
                  key={item.level}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setLevel(item.level)}
                  className={`flex flex-col items-start rounded-2xl border p-3.5 text-start transition-all ${
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground shadow-md"
                      : "border-border bg-card text-foreground hover:border-primary/50"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="text-lg font-extrabold" dir="ltr">
                      {item.level}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                        isComplete
                          ? "bg-emerald-500 text-white"
                          : isSelected
                            ? "bg-primary-foreground/20 text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {count}/7
                    </span>
                  </div>
                  <span
                    className={`mt-1 line-clamp-1 text-xs ${
                      isSelected ? "text-primary-foreground/90" : "text-muted-foreground"
                    }`}
                  >
                    {item.title[locale].replace(`${item.level} · `, "")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <div className="container-page mt-8 space-y-6">
        {/* Level Descriptor & Progress Card */}
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{data.title[locale]}</h2>
              <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {data.cefrDescriptor[locale]}
              </p>
            </div>
            <Badge
              variant={passedIndicators.length === 7 ? "default" : "secondary"}
              className={
                passedIndicators.length === 7 ? "bg-emerald-600 text-white" : "text-foreground"
              }
            >
              {format(t.vocab.levelProgressSummary, {
                passed: passedIndicators.length,
                level: data.level,
              })}
            </Badge>
          </div>

          {/* 7-Indicator Mini Strip */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {CEFR_MASTERY_INDICATORS.map((ind) => {
              const done = passedIndicators.includes(ind.id);
              return (
                <span
                  key={ind.id}
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    done
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {done && <CheckCircle2 className="size-3.5" aria-hidden />}
                  {ind.label[locale]}
                </span>
              );
            })}
          </div>
        </section>

        {/* Sub-Tabs */}
        <div className="flex flex-wrap gap-2" role="tablist">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              className="rounded-full text-xs sm:text-sm"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.id === "mastery-lab" && <Sparkles className="size-3.5" aria-hidden />}
              {tab.label}
            </Button>
          ))}
        </div>

        {/* TAB 1: ESSENTIAL VOCABULARY */}
        {activeTab === "vocab" && (
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">{t.vocab.cefrVocabTitle}</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {data.essentialVocab.map((item) => (
                <article
                  key={item.word}
                  className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2" dir="ltr">
                      <h4 className="text-lg font-extrabold text-foreground">{item.word}</h4>
                      <span className="rounded bg-secondary px-2 py-0.5 font-mono text-xs text-primary">
                        {item.ipa}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {item.pos}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => playSpeech(`${item.word}. ${item.example}`, 0.92, "female")}
                      aria-label={`${t.vocab.listenWord} ${item.word}`}
                    >
                      <Volume2 className="size-4" aria-hidden />
                    </Button>
                  </div>
                  <p className="mt-2 text-sm text-foreground" dir="ltr">
                    {item.definition}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-primary">{item.arabic}</p>
                  <p className="mt-2 text-xs text-muted-foreground" dir="ltr">
                    <span className="font-bold text-foreground">{t.vocab.collocationsLabel}:</span>{" "}
                    {item.collocation}
                  </p>
                  <p
                    className="mt-2 rounded-xl bg-secondary/50 p-3 text-sm text-foreground"
                    dir="ltr"
                  >
                    <HighlightedText text={item.example} keywords={[item.word, item.collocation]} />
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* TAB 2: EXPRESSIONS & COLLOCATIONS */}
        {activeTab === "expressions" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">{t.vocab.cefrExpressionsTitle}</h3>
              {data.commonExpressions.map((exp) => (
                <article
                  key={exp.expression}
                  className="rounded-2xl border border-border bg-card p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-base font-bold text-foreground" dir="ltr">
                      “{exp.expression}”
                    </p>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8 shrink-0"
                      onClick={() => playSpeech(exp.expression, 0.92, "male")}
                      aria-label={t.vocab.listenWord}
                    >
                      <Volume2 className="size-4" aria-hidden />
                    </Button>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-primary">{exp.arabic}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{exp.context[locale]}</p>
                  <p
                    className="mt-2 rounded-lg bg-secondary/50 p-2.5 text-sm text-foreground"
                    dir="ltr"
                  >
                    <HighlightedText text={exp.example} keywords={[exp.expression]} />
                  </p>
                </article>
              ))}
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">{t.vocab.cefrCollocationsTitle}</h3>
              {data.collocations.map((col) => (
                <article
                  key={col.collocation}
                  className="rounded-2xl border border-border bg-card p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-base font-bold text-foreground" dir="ltr">
                      {col.collocation}
                    </p>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8 shrink-0"
                      onClick={() => playSpeech(col.example, 0.92, "female")}
                      aria-label={t.vocab.listenWord}
                    >
                      <Volume2 className="size-4" aria-hidden />
                    </Button>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-primary">{col.arabic}</p>
                  <p
                    className="mt-2 rounded-lg bg-secondary/50 p-2.5 text-sm text-foreground"
                    dir="ltr"
                  >
                    <HighlightedText text={col.example} keywords={[col.collocation]} />
                  </p>
                </article>
              ))}
            </section>
          </div>
        )}

        {/* TAB 3: PHRASAL VERBS & IDIOMS */}
        {activeTab === "phrasals-idioms" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">{t.vocab.cefrPhrasalTitle}</h3>
              {data.phrasalVerbs.map((pv) => (
                <article
                  key={pv.verb}
                  className="rounded-2xl border border-border bg-card p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-base font-extrabold text-foreground" dir="ltr">
                      {pv.verb}
                    </h4>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8"
                      onClick={() => playSpeech(`${pv.verb}. ${pv.example}`, 0.92, "female")}
                      aria-label={t.vocab.listenWord}
                    >
                      <Volume2 className="size-4" aria-hidden />
                    </Button>
                  </div>
                  <p className="mt-1 text-sm text-foreground" dir="ltr">
                    {pv.meaning}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-primary">{pv.arabic}</p>
                  <p
                    className="mt-2 rounded-lg bg-secondary/50 p-2.5 text-sm text-foreground"
                    dir="ltr"
                  >
                    <HighlightedText text={pv.example} keywords={[pv.verb]} />
                  </p>
                </article>
              ))}
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">{t.vocab.cefrIdiomsTitle}</h3>
              {data.idioms.map((idm) => (
                <article
                  key={idm.idiom}
                  className="rounded-2xl border border-border bg-card p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2" dir="ltr">
                      <h4 className="text-base font-extrabold text-foreground">{idm.idiom}</h4>
                      <Badge variant="secondary" className="text-xs capitalize">
                        {idm.register}
                      </Badge>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8"
                      onClick={() => playSpeech(idm.example, 0.92, "male")}
                      aria-label={t.vocab.listenWord}
                    >
                      <Volume2 className="size-4" aria-hidden />
                    </Button>
                  </div>
                  <p className="mt-1 text-sm text-foreground" dir="ltr">
                    {idm.meaning}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-primary">{idm.arabic}</p>
                  <p
                    className="mt-2 rounded-lg bg-secondary/50 p-2.5 text-sm text-foreground"
                    dir="ltr"
                  >
                    <HighlightedText text={idm.example} keywords={[idm.idiom]} />
                  </p>
                </article>
              ))}
            </section>
          </div>
        )}

        {/* TAB 4: GRAMMATICAL STRUCTURES & SENTENCE PATTERNS */}
        {activeTab === "grammar" && (
          <div className="space-y-6">
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">{t.vocab.cefrGrammarTitle}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {data.grammaticalStructures.map((gr) => (
                  <article
                    key={gr.structure}
                    className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                  >
                    <h4 className="text-base font-extrabold text-foreground" dir="ltr">
                      {gr.structure}
                    </h4>
                    <p
                      className="mt-2 rounded-lg border border-primary/25 bg-primary/5 px-3 py-2 font-mono text-xs font-bold text-primary"
                      dir="ltr"
                    >
                      {gr.formula}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {gr.explanation[locale]}
                    </p>
                    <p
                      className="mt-2.5 rounded-lg bg-secondary/50 p-2.5 text-sm text-foreground"
                      dir="ltr"
                    >
                      <HighlightedText text={gr.example} />
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-foreground">{t.vocab.cefrPatternsTitle}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {data.sentencePatterns.map((pat) => (
                  <article
                    key={pat.pattern}
                    className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                  >
                    <Badge variant="secondary">{pat.functionLabel[locale]}</Badge>
                    <p className="mt-2 font-mono text-sm font-bold text-primary" dir="ltr">
                      {pat.pattern}
                    </p>
                    <p className="mt-2 text-sm text-foreground" dir="ltr">
                      <HighlightedText text={pat.example} />
                    </p>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">{pat.arabic}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB 5: EVERYDAY / ACADEMIC / PROFESSIONAL COMMUNICATION */}
        {activeTab === "domains" && (
          <section className="grid gap-4 lg:grid-cols-3">
            {[
              {
                key: "everyday",
                title: t.vocab.domainEveryday,
                Icon: MessageSquare,
                domain: data.communicationDomains.everyday,
              },
              {
                key: "academic",
                title: t.vocab.domainAcademic,
                Icon: GraduationCap,
                domain: data.communicationDomains.academic,
              },
              {
                key: "professional",
                title: t.vocab.domainProfessional,
                Icon: Briefcase,
                domain: data.communicationDomains.professional,
              },
            ].map(({ key, title, Icon, domain }) => (
              <article
                key={key}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
                      <Icon className="size-4 text-primary" aria-hidden />
                      {title}
                    </h3>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8"
                      onClick={() => playSpeech(domain.sample, 0.92, "female")}
                      aria-label={t.vocab.listenWord}
                    >
                      <Volume2 className="size-4" aria-hidden />
                    </Button>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {domain.focus[locale]}
                  </p>
                </div>
                <p
                  className="mt-4 rounded-xl border border-border bg-secondary/40 p-3.5 text-sm leading-relaxed text-foreground"
                  dir="ltr"
                >
                  “<HighlightedText text={domain.sample} />”
                </p>
              </article>
            ))}
          </section>
        )}

        {/* TAB 6: 7-INDICATOR MEASURABLE MASTERY LAB */}
        {activeTab === "mastery-lab" && (
          <section className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground">{t.vocab.masteryLabTitle}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.vocab.masteryLabSubtitle}</p>
            </div>

            {/* Part A: 3 Diagnostic MCQs */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-primary">{t.vocab.mcqChecksTitle}</h4>
              <div className="grid gap-4">
                {data.mcqChecks.map((check) => (
                  <CefrMcqCard
                    key={`${data.level}-${check.indicator}`}
                    check={check}
                    passed={passedIndicators.includes(check.indicator)}
                    onPass={() => markIndicatorPassed(check.indicator)}
                  />
                ))}
              </div>
            </div>

            {/* Part B: 4 Original Production & Communication Tasks */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-primary">{t.vocab.productionChecksTitle}</h4>
              <div className="grid gap-4">
                {data.productionTasks.map((task) => (
                  <CefrProductionCard
                    key={`${data.level}-${task.indicator}`}
                    level={data.level}
                    task={task}
                    passed={passedIndicators.includes(task.indicator)}
                    onPass={() => markIndicatorPassed(task.indicator)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Progress Report: Strengths & Areas to Develop */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
              <Award className="size-5 text-amber-500" aria-hidden />
              {t.vocab.progressReportTitle} ({data.level})
            </h3>
            <Button size="sm" variant="outline" onClick={() => setActiveTab("mastery-lab")}>
              <BookOpen className="size-4" aria-hidden />
              {t.vocab.tabMasteryLab}
            </Button>
          </div>

          {passedIndicators.length === CEFR_MASTERY_INDICATORS.length ? (
            <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              🎉 {format(t.vocab.allSevenMastered, { level: data.level })}
            </div>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4">
                <p className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">
                  {format(t.vocab.strengthsLabel, { level: data.level })} ({strengths.length})
                </p>
                {strengths.length === 0 ? (
                  <p className="mt-2 text-xs text-muted-foreground">{t.vocab.noneMasteredYet}</p>
                ) : (
                  <ul className="mt-2 space-y-1.5 text-sm text-foreground">
                    {strengths.map((s) => (
                      <li key={s.id} className="flex items-center gap-1.5">
                        <CheckCircle2 className="size-4 shrink-0 text-emerald-600" aria-hidden />
                        {s.label[locale]}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                <p className="text-xs font-bold uppercase text-amber-700 dark:text-amber-400">
                  {format(t.vocab.weaknessesLabel, { level: data.level })} ({weaknesses.length})
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-foreground">
                  {weaknesses.map((w) => (
                    <li key={w.id} className="flex items-start gap-1.5">
                      <Target className="mt-0.5 size-4 shrink-0 text-amber-600" aria-hidden />
                      <span>
                        <span className="font-semibold">{w.label[locale]}:</span>{" "}
                        <span className="text-xs text-muted-foreground">
                          {w.description[locale]}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>

        <footer className="rounded-2xl border border-border bg-secondary/40 p-4 text-xs leading-relaxed text-muted-foreground">
          {t.vocab.attributionNotice}
        </footer>
      </div>
    </div>
  );
}

function CefrMcqCard({
  check,
  passed,
  onPass,
}: {
  check: ReturnType<typeof getCefrMasteryLevel>["mcqChecks"][number];
  passed: boolean;
  onPass: () => void;
}) {
  const { t, locale } = useI18n();
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const meta = CEFR_MASTERY_INDICATORS.find((i) => i.id === check.indicator);

  function handleSubmit() {
    if (selected === null) return;
    setSubmitted(true);
    if (selected === check.correct) {
      onPass();
    }
  }

  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          {meta?.label[locale] ?? check.indicator}
        </span>
        <Badge
          variant={passed ? "default" : "secondary"}
          className={passed ? "bg-emerald-600 text-white" : ""}
        >
          {passed ? t.vocab.passedBadge : t.vocab.pendingBadge}
        </Badge>
      </div>

      <p className="mt-2 text-sm font-semibold text-foreground" dir="ltr">
        {check.prompt}
      </p>

      <div className="mt-3 grid gap-2" dir="ltr">
        {check.options.map((opt, idx) => {
          const isSelected = selected === idx;
          const isCorrect = submitted && idx === check.correct;
          const isWrong = submitted && isSelected && idx !== check.correct;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => {
                setSelected(idx);
                setSubmitted(false);
              }}
              className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-start text-sm transition-colors ${
                isCorrect
                  ? "border-emerald-500 bg-emerald-500/10 font-semibold"
                  : isWrong
                    ? "border-rose-500 bg-rose-500/10"
                    : isSelected
                      ? "border-primary bg-primary/10 font-medium"
                      : "border-border bg-background hover:bg-muted/50"
              }`}
            >
              <span>{opt}</span>
              {isCorrect && <CheckCircle2 className="size-4 text-emerald-600" aria-hidden />}
              {isWrong && <XCircle className="size-4 text-rose-600" aria-hidden />}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Button size="sm" disabled={selected === null} onClick={handleSubmit}>
          {t.vocab.checkAnswer}
        </Button>
      </div>

      {submitted && (
        <p className="mt-3 rounded-xl bg-secondary/50 p-3 text-xs leading-relaxed text-foreground">
          {check.explanation[locale]}
        </p>
      )}
    </article>
  );
}

function CefrProductionCard({
  level,
  task,
  passed,
  onPass,
}: {
  level: CefrLevel;
  task: CefrMasteryProductionTask;
  passed: boolean;
  onPass: () => void;
}) {
  const { t, locale } = useI18n();
  const [text, setText] = useState("");
  const [evaluation, setEvaluation] = useState<CefrProductionEvaluation | null>(null);
  const [showModel, setShowModel] = useState(false);

  const speech = useSpeech((transcript) => {
    setText((prev) => (prev.trim() ? `${prev.trim()} ${transcript}` : transcript));
  });

  const meta = CEFR_MASTERY_INDICATORS.find((i) => i.id === task.indicator);
  const wordCount = (text.trim().match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) ?? []).length;

  function handleCheck() {
    const res = evaluateCefrProduction(task, text);
    setEvaluation(res);
    if (res.passed) {
      onPass();
    }
  }

  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-primary">
          {meta?.label[locale] ?? task.indicator}
        </span>
        <Badge
          variant={passed ? "default" : "secondary"}
          className={passed ? "bg-emerald-600 text-white" : ""}
        >
          {passed ? t.vocab.passedBadge : t.vocab.pendingBadge}
        </Badge>
      </div>

      <p className="mt-2 text-sm font-semibold text-foreground">{task.prompt[locale]}</p>
      <p className="mt-1 text-xs text-muted-foreground">{task.rubricHint[locale]}</p>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-semibold text-muted-foreground">
          {t.vocab.requiredCuesLabel}:
        </span>
        {task.requiredTerms.map((term) => (
          <Badge key={term} variant="outline" className="text-xs" dir="ltr">
            {term.replace(/\|/g, " / ")}
          </Badge>
        ))}
        <Badge variant="secondary" className="text-xs">
          {format(t.vocab.minWordsLabel, { min: task.minWords })}
        </Badge>
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <label htmlFor={`cefr-prod-${level}-${task.indicator}`}>
            {t.vocab.yourResponseLabel}
          </label>
          <span>{format(t.vocab.currentWordsLabel, { count: wordCount })}</span>
        </div>
        <Textarea
          id={`cefr-prod-${level}-${task.indicator}`}
          rows={task.indicator === "paragraph" ? 4 : 3}
          dir="ltr"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.vocab.responsePlaceholder}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button size="sm" disabled={!text.trim()} onClick={handleCheck}>
          <Sparkles className="size-3.5" aria-hidden />
          {t.vocab.evaluateProductionBtn}
        </Button>
        {speech.supported && (
          <Button
            type="button"
            size="sm"
            variant={speech.listening ? "destructive" : "outline"}
            onClick={() => (speech.listening ? speech.stop() : speech.start())}
          >
            {speech.listening ? (
              <MicOff className="size-3.5" aria-hidden />
            ) : (
              <Mic className="size-3.5" aria-hidden />
            )}
            {speech.listening ? t.learning.stop : t.learning.record}
          </Button>
        )}
        <Button type="button" size="sm" variant="outline" onClick={() => setShowModel((v) => !v)}>
          {showModel ? t.vocab.hideModelBtn : t.vocab.showModelBtn}
        </Button>
      </div>

      {evaluation && (
        <div
          className={`mt-3 rounded-xl border p-3 text-xs leading-relaxed ${
            evaluation.passed
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200"
              : "border-amber-500/40 bg-amber-500/10 text-foreground"
          }`}
        >
          {evaluation.feedback[locale]}
        </div>
      )}

      {showModel && (
        <div className="mt-3 rounded-xl border border-border bg-secondary/40 p-3">
          <p className="text-xs font-bold uppercase text-primary">{t.vocab.modelAnswerLabel}</p>
          <p className="mt-1 text-sm text-foreground" dir="ltr">
            {task.modelResponse}
          </p>
        </div>
      )}
    </article>
  );
}
