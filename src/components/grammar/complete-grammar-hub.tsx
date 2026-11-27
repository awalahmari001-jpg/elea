import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Globe2,
  GraduationCap,
  Layers,
  Search,
  Sparkles,
  Volume2,
  XCircle,
} from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { HighlightedText } from "@/components/learning/highlighted-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { CEFR_LEVELS, type CefrLevel } from "@/content/courses";
import {
  COMPLETE_GRAMMAR_UNITS,
  GRAMMAR_MODULES,
} from "@/content/grammar/grammar-curriculum-index";
import type { GrammarModuleId } from "@/content/grammar/grammar-curriculum-types";
import { playSpeech } from "@/hooks/use-speech";
import { learningRecord } from "@/lib/learning-record";

const GRAMMAR_PROGRESS_KEY = "ele.completeGrammar.mastered";

function loadMastered(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(GRAMMAR_PROGRESS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

function saveMastered(ids: string[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(GRAMMAR_PROGRESS_KEY, JSON.stringify(ids));
}

export function CompleteGrammarHub() {
  const { locale, dir } = useI18n();
  const isAr = locale === "ar";

  const [selectedModule, setSelectedModule] = useState<GrammarModuleId | "all">("all");
  const [selectedLevel, setSelectedLevel] = useState<CefrLevel | "all">("all");
  const [search, setSearch] = useState("");
  const [activeUnitId, setActiveUnitId] = useState<string>(COMPLETE_GRAMMAR_UNITS[0]!.id);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    setMasteredIds(loadMastered());
  }, []);

  const filteredUnits = useMemo(() => {
    const q = search.trim().toLowerCase();
    return COMPLETE_GRAMMAR_UNITS.filter((unit) => {
      if (selectedModule !== "all" && unit.moduleId !== selectedModule) return false;
      if (selectedLevel !== "all" && unit.level !== selectedLevel) return false;
      if (!q) return true;
      return (
        unit.title.en.toLowerCase().includes(q) ||
        unit.title.ar.toLowerCase().includes(q) ||
        unit.formula.toLowerCase().includes(q) ||
        unit.overview.en.toLowerCase().includes(q) ||
        unit.overview.ar.toLowerCase().includes(q)
      );
    });
  }, [selectedModule, selectedLevel, search]);

  const activeUnit =
    filteredUnits.find((u) => u.id === activeUnitId) ??
    filteredUnits[0] ??
    COMPLETE_GRAMMAR_UNITS[0]!;

  const activeModuleMeta = GRAMMAR_MODULES.find((m) => m.id === activeUnit.moduleId);
  const globalIdx = COMPLETE_GRAMMAR_UNITS.findIndex((u) => u.id === activeUnit.id);
  const prevUnit = globalIdx > 0 ? COMPLETE_GRAMMAR_UNITS[globalIdx - 1] : null;
  const nextUnit =
    globalIdx >= 0 && globalIdx < COMPLETE_GRAMMAR_UNITS.length - 1
      ? COMPLETE_GRAMMAR_UNITS[globalIdx + 1]
      : null;

  const isMastered = masteredIds.includes(activeUnit.id);
  const overallPct = Math.round((masteredIds.length / COMPLETE_GRAMMAR_UNITS.length) * 100);

  function toggleMastered(unitId: string) {
    const exists = masteredIds.includes(unitId);
    const next = exists ? masteredIds.filter((id) => id !== unitId) : [...masteredIds, unitId];
    setMasteredIds(next);
    saveMastered(next);
    if (!exists) {
      learningRecord.logActivity({ kind: "grammar", count: 1, minutes: 5, passed: true });
    }
  }

  function selectUnit(unitId: string) {
    setActiveUnitId(unitId);
    setQuizAnswers({});
  }

  return (
    <div dir={dir} className="pb-20">
      {/* Hero Banner */}
      <header className="border-b border-border bg-inverse text-inverse-foreground">
        <div className="container-page py-10 md:py-14">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-accent text-accent-foreground">
              {isAr
                ? "المنهج التدرّجي الكامل لمتعلّمي الإنجليزية"
                : "Complete Sequential EFL/ESL Grammar Curriculum"}
            </Badge>
            <Badge
              variant="outline"
              className="border-inverse-foreground/30 text-inverse-foreground"
              dir="ltr"
            >
              {GRAMMAR_MODULES.length} {isAr ? "محاور" : "Modules"} ·{" "}
              {COMPLETE_GRAMMAR_UNITS.length} {isAr ? "وحدة شاملة" : "Complete Units"} · A1–C2
            </Badge>
          </div>
          <h1 className="display-heading mt-3 max-w-4xl text-3xl font-extrabold md:text-5xl">
            {isAr
              ? "قواعد اللغة الإنجليزية — المرجع الشامل من الصفر حتى الإتقان"
              : "Complete English Grammar · قواعد اللغة الإنجليزية"}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-inverse-muted md:text-lg">
            {isAr
              ? "منهج منظم ومتسلسل يغطي كل قاعدة في اللغة الإنجليزية (أقسام الكلام، جميع الأزمنة الـ١٢، الأفعال الناقصة، المبني للمجهول، الجمل الشرطية، الكلام المنقول، جمل الوصل، حروف الجر، والتراكيب المتقدمة C1–C2) بشرح مبسّط وأمثلة صوتية واختبارات فورية."
              : "A logically sequenced EFL/ESL mastery curriculum covering every English grammar rule—parts of speech, all 12 verb tenses, modals, passive voice, conditionals, reported speech, clauses, gerunds/infinitives, prepositions, and C1–C2 structures—with audio examples, Arabic interference warnings, and quick checks."}
          </p>

          {/* Progress Strip */}
          <div className="mt-6 max-w-md space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-inverse-foreground">
              <span>{isAr ? "تقدّمك في إتقان القواعد" : "Grammar Mastery Progress"}</span>
              <span dir="ltr">
                {masteredIds.length} / {COMPLETE_GRAMMAR_UNITS.length} ({overallPct}%)
              </span>
            </div>
            <Progress value={overallPct} className="h-2 bg-inverse-foreground/20" />
          </div>
        </div>
      </header>

      <div className="container-page mt-8 space-y-6">
        {/* 12 Sequential Modules Strip */}
        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-foreground">
              <Layers className="size-5 text-primary" aria-hidden />
              {isAr
                ? "المحاور الـ١٢ المتسلسلة (من التأسيس إلى الإتقان)"
                : "12 Sequential Curriculum Modules (A1 → C2)"}
            </h2>
            <Button
              type="button"
              size="sm"
              variant={selectedModule === "all" ? "default" : "outline"}
              className="rounded-full text-xs"
              onClick={() => setSelectedModule("all")}
            >
              {isAr
                ? `جميع الوحدات (${COMPLETE_GRAMMAR_UNITS.length})`
                : `All Units (${COMPLETE_GRAMMAR_UNITS.length})`}
            </Button>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {GRAMMAR_MODULES.map((mod) => {
              const modUnits = COMPLETE_GRAMMAR_UNITS.filter((u) => u.moduleId === mod.id);
              const modDone = modUnits.filter((u) => masteredIds.includes(u.id)).length;
              const active = selectedModule === mod.id;
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => {
                    const nextMod = active ? "all" : mod.id;
                    setSelectedModule(nextMod);
                    if (nextMod !== "all" && modUnits[0]) {
                      selectUnit(modUnits[0].id);
                    }
                  }}
                  className={`flex flex-col rounded-2xl border-2 p-3.5 text-start transition-all ${
                    active
                      ? "border-primary bg-primary/10 shadow-xs"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <span className="text-lg" aria-hidden>
                      {mod.icon}
                    </span>
                    <Badge variant="secondary" className="text-[11px]" dir="ltr">
                      {mod.levelRange} · {modDone}/{modUnits.length}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm font-extrabold text-foreground">{mod.title[locale]}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {mod.description[locale]}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Search & CEFR Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4">
          <div className="relative min-w-[240px] flex-1">
            <Search
              className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                isAr
                  ? "ابحث عن قاعدة (مثال: Present Perfect، الشرط، Passive، حروف الجر)..."
                  : "Search any grammar topic (e.g., Present Perfect, Conditionals, Passive, Clauses)..."
              }
              className="ps-9"
              aria-label={isAr ? "بحث في قواعد اللغة الإنجليزية" : "Search grammar curriculum"}
            />
          </div>
          <div className="flex flex-wrap gap-1.5" role="group">
            <Button
              type="button"
              size="sm"
              variant={selectedLevel === "all" ? "default" : "outline"}
              className="rounded-full text-xs"
              onClick={() => setSelectedLevel("all")}
            >
              {isAr ? "كل المستويات" : "All Levels"}
            </Button>
            {CEFR_LEVELS.map((lvl) => (
              <Button
                key={lvl}
                type="button"
                size="sm"
                variant={selectedLevel === lvl ? "default" : "outline"}
                className="rounded-full text-xs font-bold"
                onClick={() => setSelectedLevel(selectedLevel === lvl ? "all" : lvl)}
              >
                {lvl}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Split Layout: Sequential Units List + Exhaustive Active Lesson Card */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Sequential Curriculum Navigator */}
          <aside className="space-y-2 lg:col-span-4 lg:max-h-[82vh] lg:overflow-y-auto lg:pe-1">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {isAr
                ? `الدروس المتاحة (${filteredUnits.length} من ${COMPLETE_GRAMMAR_UNITS.length})`
                : `Lessons (${filteredUnits.length} of ${COMPLETE_GRAMMAR_UNITS.length})`}
            </p>
            {filteredUnits.map((unit) => {
              const selected = unit.id === activeUnit.id;
              const done = masteredIds.includes(unit.id);
              return (
                <button
                  key={unit.id}
                  type="button"
                  onClick={() => selectUnit(unit.id)}
                  className={`flex w-full items-start justify-between gap-2 rounded-2xl border p-3.5 text-start transition-all ${
                    selected
                      ? "border-2 border-primary bg-primary/10 shadow-xs"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-xs font-extrabold text-primary" dir="ltr">
                        #{String(unit.order).padStart(2, "0")}
                      </span>
                      <Badge variant="outline" className="text-[10px] font-bold">
                        {unit.level}
                      </Badge>
                    </div>
                    <p className="text-sm font-bold leading-snug text-foreground">
                      {unit.title[locale]}
                    </p>
                  </div>
                  {done && (
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-600" aria-hidden />
                  )}
                </button>
              );
            })}
          </aside>

          {/* Right Exhaustive Grammar Unit Lesson */}
          <main className="space-y-6 lg:col-span-8">
            <Card className="border-2 border-primary/25 shadow-sm">
              <CardHeader className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-primary text-primary-foreground" dir="ltr">
                      {isAr ? `الوحدة ${activeUnit.order}` : `Unit ${activeUnit.order}`} · CEFR{" "}
                      {activeUnit.level}
                    </Badge>
                    {activeModuleMeta && (
                      <Badge variant="secondary" className="text-xs">
                        {activeModuleMeta.icon} {activeModuleMeta.title[locale]}
                      </Badge>
                    )}
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant={isMastered ? "secondary" : "default"}
                    className="rounded-full"
                    onClick={() => toggleMastered(activeUnit.id)}
                  >
                    <CheckCircle2 className="size-4" aria-hidden />
                    {isMastered
                      ? isAr
                        ? "تم إتقان الوحدة ✓"
                        : "Mastered ✓"
                      : isAr
                        ? "تحديد كمُتقَنة"
                        : "Mark as Mastered"}
                  </Button>
                </div>

                <div>
                  <CardTitle className="display-heading text-2xl font-extrabold md:text-3xl">
                    {activeUnit.title[locale]}
                  </CardTitle>
                  {locale === "ar" && (
                    <p className="mt-1 text-sm font-semibold text-primary" dir="ltr">
                      {activeUnit.title.en}
                    </p>
                  )}
                </div>

                <CardDescription className="text-sm leading-relaxed text-foreground md:text-base">
                  {activeUnit.overview[locale]}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Rule Formula Box */}
                <div className="rounded-2xl border-2 border-primary/35 bg-primary/5 p-4 space-y-3">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-primary">
                    <GraduationCap className="me-1.5 inline size-4" aria-hidden />
                    {isAr ? "الصيغة والتركيب الأساسي" : "Core Grammar Formula"}
                  </p>
                  <p className="font-mono text-base font-extrabold text-foreground" dir="ltr">
                    {activeUnit.formula}
                  </p>
                  {activeUnit.forms && (
                    <div className="grid gap-2 pt-1 sm:grid-cols-3" dir="ltr">
                      <div className="rounded-xl border border-emerald-500/30 bg-card p-2.5 text-xs">
                        <span className="block font-extrabold text-emerald-700 dark:text-emerald-400">
                          + Affirmative
                        </span>
                        <span className="mt-0.5 block font-medium text-foreground">
                          {activeUnit.forms.affirmative}
                        </span>
                      </div>
                      <div className="rounded-xl border border-rose-500/30 bg-card p-2.5 text-xs">
                        <span className="block font-extrabold text-rose-700 dark:text-rose-400">
                          − Negative
                        </span>
                        <span className="mt-0.5 block font-medium text-foreground">
                          {activeUnit.forms.negative}
                        </span>
                      </div>
                      <div className="rounded-xl border border-sky-500/30 bg-card p-2.5 text-xs">
                        <span className="block font-extrabold text-sky-700 dark:text-sky-400">
                          ? Question
                        </span>
                        <span className="mt-0.5 block font-medium text-foreground">
                          {activeUnit.forms.question}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Clear Usage Rules */}
                <div className="space-y-2.5">
                  <h3 className="flex items-center gap-2 text-base font-extrabold text-foreground">
                    <BookOpen className="size-4 text-primary" aria-hidden />
                    {isAr ? "قواعد الاستخدام التفصيلية" : "Clear Usage Rules"}
                  </h3>
                  <ul className="space-y-2">
                    {activeUnit.rules.map((rule, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 rounded-xl border border-border bg-muted/35 p-3 text-sm leading-relaxed text-foreground"
                      >
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-black text-primary">
                          {idx + 1}
                        </span>
                        <span>{rule[locale]}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Practical Examples with Audio Playback */}
                <div className="space-y-2.5">
                  <h3 className="flex items-center gap-2 text-base font-extrabold text-foreground">
                    <Sparkles className="size-4 text-primary" aria-hidden />
                    {isAr
                      ? "أمثلة عملية واضحة (اضغط للاستماع)"
                      : "Practical Examples (Tap to Listen)"}
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {activeUnit.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-border bg-card p-3.5 space-y-1.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className="text-sm font-bold leading-relaxed text-foreground"
                            dir="ltr"
                          >
                            <HighlightedText text={ex.en} keywords={[ex.highlight]} />
                          </p>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="size-7 shrink-0"
                            onClick={() => playSpeech(ex.en, 0.92, "female")}
                            aria-label={`Listen to example ${idx + 1}`}
                          >
                            <Volume2 className="size-4 text-primary" aria-hidden />
                          </Button>
                        </div>
                        <p className="text-xs font-medium text-muted-foreground">{ex.ar}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arabic-to-English Interference Warning + Common Mistake */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-sky-500/35 bg-sky-500/10 p-4 space-y-1.5">
                    <p className="flex items-center gap-1.5 text-xs font-extrabold text-sky-800 dark:text-sky-300">
                      <Globe2 className="size-4" aria-hidden />
                      {isAr ? "تنبيه مهم للناطقين بالعربية" : "Arabic-to-English EFL Insight"}
                    </p>
                    <p className="text-xs leading-relaxed text-foreground">
                      {activeUnit.arabicInterferenceTip[locale]}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-amber-500/35 bg-amber-500/10 p-4 space-y-2">
                    <p className="flex items-center gap-1.5 text-xs font-extrabold text-amber-800 dark:text-amber-300">
                      <AlertTriangle className="size-4" aria-hidden />
                      {isAr ? "خطأ شائع وكيف تتجنبه" : "Common Mistake to Avoid"}
                    </p>
                    <p
                      className="text-xs font-semibold text-rose-700 line-through dark:text-rose-300"
                      dir="ltr"
                    >
                      ✗ {activeUnit.commonMistake.wrong}
                    </p>
                    <p
                      className="text-xs font-extrabold text-emerald-700 dark:text-emerald-300"
                      dir="ltr"
                    >
                      ✓ {activeUnit.commonMistake.right}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activeUnit.commonMistake.why[locale]}
                    </p>
                  </div>
                </div>

                {/* 3-Question Interactive Quick Check */}
                <div className="space-y-3 border-t border-border pt-5">
                  <h3 className="text-base font-extrabold text-foreground">
                    {isAr
                      ? "اختبر فهمك فورًا (٣ أسئلة تطبيقية)"
                      : "Quick Mastery Check (3 Questions)"}
                  </h3>
                  <div className="space-y-3">
                    {activeUnit.quickCheck.map((q, qIdx) => {
                      const key = `${activeUnit.id}-q-${qIdx}`;
                      const picked = quizAnswers[key];
                      const answered = picked !== undefined;
                      const correct = picked === q.correctIndex;
                      return (
                        <div
                          key={key}
                          className="rounded-2xl border border-border bg-muted/25 p-4 space-y-2.5"
                        >
                          <p className="text-sm font-bold text-foreground" dir="ltr">
                            {qIdx + 1}. {q.prompt}
                          </p>
                          <div className="grid gap-2 sm:grid-cols-2">
                            {q.options.map((opt, optIdx) => {
                              let cls = "border-border bg-card hover:bg-muted";
                              if (answered && optIdx === q.correctIndex) {
                                cls =
                                  "border-emerald-500 bg-emerald-500/15 text-emerald-950 dark:text-emerald-100";
                              } else if (answered && optIdx === picked && !correct) {
                                cls = "border-destructive bg-destructive/10 text-destructive";
                              }
                              return (
                                <button
                                  key={`${key}-${optIdx}`}
                                  type="button"
                                  onClick={() =>
                                    setQuizAnswers((prev) => ({ ...prev, [key]: optIdx }))
                                  }
                                  dir="ltr"
                                  className={`rounded-xl border px-3 py-2 text-start text-xs font-semibold transition-colors ${cls}`}
                                >
                                  {String.fromCharCode(65 + optIdx)}. {opt}
                                </button>
                              );
                            })}
                          </div>
                          {answered && (
                            <p className="flex items-start gap-1.5 text-xs leading-relaxed text-foreground">
                              {correct ? (
                                <CheckCircle2
                                  className="mt-0.5 size-4 shrink-0 text-emerald-600"
                                  aria-hidden
                                />
                              ) : (
                                <XCircle
                                  className="mt-0.5 size-4 shrink-0 text-destructive"
                                  aria-hidden
                                />
                              )}
                              <span>{q.explanation[locale]}</span>
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Previous / Next Sequential Unit Navigation */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={!prevUnit}
                    onClick={() => prevUnit && selectUnit(prevUnit.id)}
                  >
                    <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden />
                    {prevUnit ? prevUnit.title[locale] : isAr ? "الوحدة السابقة" : "Previous Unit"}
                  </Button>
                  <Button
                    type="button"
                    variant="default"
                    disabled={!nextUnit}
                    onClick={() => nextUnit && selectUnit(nextUnit.id)}
                  >
                    {nextUnit ? nextUnit.title[locale] : isAr ? "الوحدة التالية" : "Next Unit"}
                    <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
