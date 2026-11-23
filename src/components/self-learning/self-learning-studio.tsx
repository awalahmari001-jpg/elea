import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  Award,
  BookMarked,
  CalendarCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  EyeOff,
  History,
  ListOrdered,
  Mic,
  MicOff,
  RotateCcw,
  Shuffle,
  Sparkles,
  Tag,
  Target,
  Volume2,
  XCircle,
} from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { HighlightedText } from "@/components/learning/highlighted-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CEFR_LEVELS, type CefrLevel } from "@/content/courses";
import {
  ALL_SELF_LEARNING_SENTENCES,
  getDailyChallengeSentences,
  getSentencesByFilter,
  SELF_LEARNING_BY_LEVEL,
  SELF_LEARNING_TOPICS,
  type SelfLearningTopicId,
  type TranslationEvaluation,
  type TranslationItem,
  type TranslationVerdict,
} from "@/content/self-learning";
import { playSpeech, useSpeech } from "@/hooks/use-speech";
import { format } from "@/lib/i18n/messages";
import {
  learnerStorage,
  type SelfLearningProgress,
  type SelfLearningSentenceRecord,
} from "@/lib/learner-storage";
import { evaluateTranslation } from "@/lib/translation-ai.functions";
import { evaluateTranslationLocal, isDueForRevision } from "@/lib/translation-fallback";

type LearningMode = "sequential" | "topic" | "random" | "revision" | "daily";

function shuffleDeterministically<T>(items: T[], seed: number): T[] {
  const copy = [...items];
  let s = seed >>> 0;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    const tmp = copy[i];
    copy[i] = copy[j]!;
    copy[j] = tmp!;
  }
  return copy;
}

function formatDuration(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  if (mins === 0) return `${secs}s`;
  const hours = Math.floor(mins / 60);
  const remMins = mins % 60;
  return hours > 0 ? `${hours}h ${remMins}m` : `${mins}m ${String(secs).padStart(2, "0")}s`;
}

function isMasteredVerdict(status: TranslationVerdict): boolean {
  return status === "completely_correct" || status === "acceptable_alternative";
}

export function SelfLearningStudio({ initialLevel = "A1" }: { initialLevel?: CefrLevel | "ALL" }) {
  const { t, locale } = useI18n();
  const [level, setLevel] = useState<CefrLevel | "ALL">(initialLevel);
  const [mode, setMode] = useState<LearningMode>("sequential");
  const [selectedTopic, setSelectedTopic] = useState<SelfLearningTopicId | "all">("all");
  const [randomSeed, setRandomSeed] = useState<number>(17);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [loading, setLoading] = useState(false);
  const [evalResult, setEvalResult] = useState<{
    evaluation: TranslationEvaluation;
    source: "ai" | "semantic";
  } | null>(null);
  const [pinnedSentenceId, setPinnedSentenceId] = useState<string | null>(null);

  const [progress, setProgress] = useState<SelfLearningProgress>({
    records: {},
    totalSecondsSpent: 0,
    dailyDate: "",
    dailyCompletedIds: [],
    updatedAt: "",
  });

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const todayIso = useMemo(() => new Date().toISOString().slice(0, 10), []);

  useEffect(() => {
    setProgress(learnerStorage.getSelfLearning());
  }, []);

  // Track active study time every 15 seconds while the page is open
  useEffect(() => {
    const timer = setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
      setProgress(learnerStorage.addSelfLearningSeconds(15));
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const speech = useSpeech((transcript) => {
    setAnswer((prev) => (prev.trim() ? `${prev.trim()} ${transcript}` : transcript));
  });

  const revisionItems = useMemo(() => {
    const pool = level === "ALL" ? ALL_SELF_LEARNING_SENTENCES : SELF_LEARNING_BY_LEVEL[level];
    return pool.filter((item) => {
      const rec = progress.records[item.id];
      return rec ? isDueForRevision(rec.status, rec.nextReviewAt) : false;
    });
  }, [level, progress.records]);

  const dailyItems = useMemo(
    () => getDailyChallengeSentences(level, todayIso, 10),
    [level, todayIso],
  );

  const activeDeck: TranslationItem[] = useMemo(() => {
    if (mode === "revision") return revisionItems;
    if (mode === "daily") return dailyItems;
    if (mode === "topic") return getSentencesByFilter(level, selectedTopic);
    const base = getSentencesByFilter(level, "all");
    if (mode === "random") return shuffleDeterministically(base, randomSeed);
    return base;
  }, [mode, level, selectedTopic, randomSeed, revisionItems, dailyItems]);

  const currentItem: TranslationItem | undefined = useMemo(() => {
    if (pinnedSentenceId) {
      const pinned = ALL_SELF_LEARNING_SENTENCES.find((s) => s.id === pinnedSentenceId);
      if (pinned) return pinned;
    }
    return activeDeck[index] ?? activeDeck[0];
  }, [pinnedSentenceId, activeDeck, index]);

  const currentRecord: SelfLearningSentenceRecord | undefined = currentItem
    ? progress.records[currentItem.id]
    : undefined;

  // Reset index cleanly when deck filters change
  useEffect(() => {
    setIndex(0);
    setPinnedSentenceId(null);
    setAnswer("");
    setEvalResult(null);
    setShowHint(false);
  }, [level, mode, selectedTopic, randomSeed]);

  // Analytics summary
  const analytics = useMemo(() => {
    const allRecs = Object.values(progress.records);
    const attempted = allRecs.length;
    const mastered = allRecs.filter((r) => isMasteredVerdict(r.status)).length;
    const inRevision = allRecs.filter((r) => isDueForRevision(r.status, r.nextReviewAt)).length;
    const totalAttempts = allRecs.reduce((sum, r) => sum + r.attemptsCount, 0);
    const totalCorrect = allRecs.reduce((sum, r) => sum + r.correctCount, 0);
    const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
    const topicsTouched = new Set(allRecs.map((r) => r.topic)).size;

    const weakCounts = new Map<string, number>();
    for (const rec of allRecs) {
      if (!isMasteredVerdict(rec.status)) {
        weakCounts.set(rec.grammarFocus, (weakCounts.get(rec.grammarFocus) ?? 0) + 1);
      }
    }
    const weakAreas = Array.from(weakCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag]) => tag);

    const recentHistory = [...allRecs]
      .sort((a, b) => (b.updatedAt > a.updatedAt ? 1 : -1))
      .slice(0, 6);

    const dailyDoneCount =
      progress.dailyDate === todayIso
        ? dailyItems.filter((item) => progress.dailyCompletedIds.includes(item.id)).length
        : 0;

    return {
      attempted,
      mastered,
      inRevision,
      accuracy,
      topicsTouched,
      weakAreas,
      recentHistory,
      dailyDoneCount,
    };
  }, [progress, todayIso, dailyItems]);

  async function handleEvaluate() {
    if (!currentItem || !answer.trim()) return;
    setLoading(true);
    try {
      const serverRes = await evaluateTranslation({
        data: {
          sentenceId: currentItem.id,
          learnerTranslation: answer.trim(),
        },
      });
      setEvalResult(serverRes);
      const updated = learnerStorage.saveSelfLearningAttempt({
        id: currentItem.id,
        level: currentItem.level,
        topic: currentItem.topic,
        grammarFocus: currentItem.grammarFocus,
        keyVocab: currentItem.keyVocab,
        verdict: serverRes.evaluation.verdict,
        score: serverRes.evaluation.overallScore,
        learnerResponse: answer.trim(),
        isDaily: mode === "daily",
        todayIso,
      });
      setProgress(updated);
    } catch {
      const local = evaluateTranslationLocal(currentItem, answer.trim());
      setEvalResult({ evaluation: local, source: "semantic" });
      const updated = learnerStorage.saveSelfLearningAttempt({
        id: currentItem.id,
        level: currentItem.level,
        topic: currentItem.topic,
        grammarFocus: currentItem.grammarFocus,
        keyVocab: currentItem.keyVocab,
        verdict: local.verdict,
        score: local.overallScore,
        learnerResponse: answer.trim(),
        isDaily: mode === "daily",
        todayIso,
      });
      setProgress(updated);
    } finally {
      setLoading(false);
    }
  }

  function goToIndex(nextIdx: number) {
    if (activeDeck.length === 0) return;
    const bounded = ((nextIdx % activeDeck.length) + activeDeck.length) % activeDeck.length;
    setPinnedSentenceId(null);
    setIndex(bounded);
    setAnswer("");
    setEvalResult(null);
    setShowHint(false);
  }

  function jumpToSentence(id: string) {
    setPinnedSentenceId(id);
    const saved = progress.records[id];
    setAnswer(saved?.lastResponse ?? "");
    setEvalResult(null);
    setShowHint(false);
  }

  function verdictStyle(verdict: TranslationVerdict) {
    switch (verdict) {
      case "completely_correct":
        return {
          label: t.selfLearning.verdictCompletelyCorrect,
          cls: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
          Icon: CheckCircle2,
        };
      case "acceptable_alternative":
        return {
          label: t.selfLearning.verdictAcceptableAlt,
          cls: "border-teal-500/40 bg-teal-500/10 text-teal-700 dark:text-teal-300",
          Icon: CheckCircle2,
        };
      case "partially_correct":
        return {
          label: t.selfLearning.verdictPartiallyCorrect,
          cls: "border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-200",
          Icon: AlertCircle,
        };
      case "incorrect":
        return {
          label: t.selfLearning.verdictIncorrect,
          cls: "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300",
          Icon: XCircle,
        };
    }
  }

  const topicLabelFor = (topicId: SelfLearningTopicId) =>
    SELF_LEARNING_TOPICS.find((x) => x.id === topicId)?.label[locale] ?? topicId;

  return (
    <div className="pb-16">
      {/* Hero */}
      <header className="border-b border-border bg-inverse text-inverse-foreground">
        <div className="container-page py-10 md:py-14">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-accent text-accent-foreground">{t.selfLearning.eyebrow}</Badge>
            <Badge
              variant="outline"
              className="border-inverse-foreground/25 text-inverse-foreground"
            >
              {analytics.mastered} / {ALL_SELF_LEARNING_SENTENCES.length}{" "}
              {t.selfLearning.statCorrect}
            </Badge>
            <Badge
              variant="outline"
              className="border-inverse-foreground/25 text-inverse-foreground"
            >
              <Clock className="me-1 size-3.5" aria-hidden />
              {formatDuration(progress.totalSecondsSpent)}
            </Badge>
          </div>
          <h1 className="display-heading mt-3 max-w-4xl text-3xl md:text-5xl">
            {t.selfLearning.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-inverse-muted md:text-lg">
            {t.selfLearning.subtitle}
          </p>

          <div className="mt-5 rounded-2xl border border-emerald-400/35 bg-emerald-500/10 p-4 text-sm">
            <p className="flex items-start gap-2 leading-relaxed text-inverse-foreground/95">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-emerald-300" aria-hidden />
              <span>{t.selfLearning.semanticGuarantee}</span>
            </p>
          </div>

          {/* CEFR Level Selector (A1–C2 + All 600) */}
          <div
            className="mt-6 flex flex-wrap gap-2"
            role="tablist"
            aria-label={t.selfLearning.title}
          >
            {CEFR_LEVELS.map((lvl) => {
              const lvlMastered = SELF_LEARNING_BY_LEVEL[lvl].filter((s) => {
                const rec = progress.records[s.id];
                return rec ? isMasteredVerdict(rec.status) : false;
              }).length;
              const selected = level === lvl;
              return (
                <button
                  key={lvl}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setLevel(lvl)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                    selected
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-inverse-foreground/25 bg-transparent text-inverse-foreground hover:bg-inverse-foreground/10"
                  }`}
                >
                  <span dir="ltr">{lvl}</span>
                  <span className="rounded-full bg-black/20 px-2 py-0.5 text-xs font-semibold">
                    {lvlMastered}/100
                  </span>
                </button>
              );
            })}
            <button
              type="button"
              role="tab"
              aria-selected={level === "ALL"}
              onClick={() => setLevel("ALL")}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                level === "ALL"
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-inverse-foreground/25 bg-transparent text-inverse-foreground hover:bg-inverse-foreground/10"
              }`}
            >
              {t.selfLearning.allLevelsLabel}
            </button>
          </div>
        </div>
      </header>

      <div className="container-page mt-8 space-y-6">
        {/* 5 Learning Modes Bar */}
        <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5" role="tablist">
            {(
              [
                { id: "sequential", label: t.selfLearning.modeSequential, Icon: ListOrdered },
                { id: "topic", label: t.selfLearning.modeTopic, Icon: Tag },
                { id: "random", label: t.selfLearning.modeRandom, Icon: Shuffle },
                {
                  id: "revision",
                  label: `${t.selfLearning.modeRevision} (${revisionItems.length})`,
                  Icon: RotateCcw,
                },
                { id: "daily", label: t.selfLearning.modeDaily, Icon: CalendarCheck },
              ] as const
            ).map(({ id, label, Icon }) => (
              <Button
                key={id}
                role="tab"
                aria-selected={mode === id}
                variant={mode === id ? "default" : "outline"}
                className="justify-start rounded-xl text-xs font-semibold"
                onClick={() => setMode(id)}
              >
                <Icon className="size-4 shrink-0" aria-hidden />
                <span className="truncate">{label}</span>
              </Button>
            ))}
          </div>

          {/* Topic Filter Strip (shown in Topic-based mode) */}
          {mode === "topic" && (
            <div className="mt-4 border-t border-border pt-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t.selfLearning.chooseTopicLabel}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Button
                  size="sm"
                  variant={selectedTopic === "all" ? "secondary" : "ghost"}
                  className="rounded-full text-xs"
                  onClick={() => setSelectedTopic("all")}
                >
                  {t.selfLearning.allTopicsOption}
                </Button>
                {SELF_LEARNING_TOPICS.map((topic) => (
                  <Button
                    key={topic.id}
                    size="sm"
                    variant={selectedTopic === topic.id ? "secondary" : "ghost"}
                    className="rounded-full text-xs"
                    onClick={() => setSelectedTopic(topic.id)}
                  >
                    {topic.label[locale]}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Daily Challenge Status Strip */}
          {mode === "daily" && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-primary/25 bg-primary/5 px-4 py-2.5 text-sm">
              <span className="font-semibold text-foreground">
                {analytics.dailyDoneCount >= dailyItems.length
                  ? `🎉 ${t.selfLearning.dailyChallengeComplete}`
                  : format(t.selfLearning.dailyChallengeStatus, {
                      done: analytics.dailyDoneCount,
                      total: dailyItems.length,
                    })}
              </span>
              <span className="font-mono text-xs text-muted-foreground" dir="ltr">
                {todayIso}
              </span>
            </div>
          )}
        </section>

        {/* Main 2-Column Workspace */}
        <div className="grid gap-6 lg:grid-cols-[1.65fr_1fr]">
          {/* LEFT: Translation Practice Card */}
          <main className="space-y-5">
            {!currentItem ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                <Award className="mx-auto size-12 text-emerald-500" aria-hidden />
                <h2 className="mt-3 text-xl font-bold text-foreground">
                  {t.selfLearning.revisionEmptyTitle}
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  {t.selfLearning.revisionEmptyBody}
                </p>
                <Button className="mt-5" onClick={() => setMode("sequential")}>
                  {t.selfLearning.modeSequential}
                </Button>
              </div>
            ) : (
              <section className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
                {/* Sentence Header Meta */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-primary text-primary-foreground" dir="ltr">
                      {currentItem.level}
                    </Badge>
                    <Badge variant="secondary">{topicLabelFor(currentItem.topic)}</Badge>
                    <Badge variant="outline" className="font-mono text-xs" dir="ltr">
                      {currentItem.id.toUpperCase()}
                    </Badge>
                    {currentRecord && (
                      <Badge variant="outline" className="text-xs">
                        {format(t.selfLearning.nextReviewIn, {
                          when: isDueForRevision(currentRecord.status, currentRecord.nextReviewAt)
                            ? t.selfLearning.reviewDueNow
                            : format(t.selfLearning.reviewInDays, {
                                days: currentRecord.intervalDays,
                              }),
                        })}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {pinnedSentenceId
                      ? currentItem.id.toUpperCase()
                      : format(t.selfLearning.sentenceCounter, {
                          current: Math.min(index + 1, activeDeck.length),
                          total: activeDeck.length,
                        })}
                  </span>
                </div>

                {/* Arabic Prompt Box */}
                <div className="rounded-2xl border border-primary/20 bg-secondary/40 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
                    {t.selfLearning.arabicPromptLabel}
                  </p>
                  <p
                    className="mt-2.5 text-xl font-bold leading-relaxed text-foreground md:text-2xl"
                    dir="rtl"
                  >
                    {currentItem.arabic}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-3">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {t.selfLearning.grammarFocusLabel}:
                      </span>{" "}
                      <span dir="ltr">{currentItem.grammarFocus}</span>
                    </p>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs"
                      onClick={() => setShowHint((v) => !v)}
                    >
                      {showHint ? (
                        <EyeOff className="size-3.5" aria-hidden />
                      ) : (
                        <Eye className="size-3.5" aria-hidden />
                      )}
                      {showHint ? t.selfLearning.hideHintBtn : t.selfLearning.showHintBtn}
                    </Button>
                  </div>
                  {showHint && (
                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5" dir="ltr">
                      <span className="text-xs font-semibold text-muted-foreground">
                        {t.selfLearning.keyVocabHintLabel}:
                      </span>
                      {currentItem.keyVocab.map((kw) => (
                        <Badge
                          key={kw}
                          variant="outline"
                          className="border-primary/40 bg-primary/5 text-primary"
                        >
                          {kw}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Learner Translation Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="self-learning-translation-input"
                    className="text-sm font-semibold text-foreground"
                  >
                    {t.selfLearning.yourTranslationLabel}
                  </label>
                  <Textarea
                    ref={inputRef}
                    id="self-learning-translation-input"
                    rows={3}
                    dir="ltr"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder={t.selfLearning.translationPlaceholder}
                  />
                </div>

                {/* Action Row */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button disabled={loading || !answer.trim()} onClick={handleEvaluate}>
                      <Sparkles className="size-4" aria-hidden />
                      {loading ? t.selfLearning.evaluatingBtn : t.selfLearning.submitBtn}
                    </Button>
                    {speech.supported && (
                      <Button
                        type="button"
                        variant={speech.listening ? "destructive" : "outline"}
                        onClick={() => (speech.listening ? speech.stop() : speech.start())}
                      >
                        {speech.listening ? (
                          <MicOff className="size-4" aria-hidden />
                        ) : (
                          <Mic className="size-4" aria-hidden />
                        )}
                        {speech.listening ? t.learning.stop : t.learning.record}
                      </Button>
                    )}
                    {mode === "random" && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setRandomSeed((s) => s + 7)}
                      >
                        <Shuffle className="size-3.5" aria-hidden />
                        {t.selfLearning.shuffleBtn}
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={activeDeck.length <= 1}
                      onClick={() => goToIndex(index - 1)}
                    >
                      <ChevronLeft className="size-4 rtl:rotate-180" aria-hidden />
                      {t.selfLearning.prevBtn}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={activeDeck.length <= 1}
                      onClick={() => goToIndex(index + 1)}
                    >
                      {t.selfLearning.nextBtn}
                      <ChevronRight className="size-4 rtl:rotate-180" aria-hidden />
                    </Button>
                  </div>
                </div>

                {/* Evaluation Result Panel */}
                {evalResult && (
                  <div className="space-y-4 border-t border-border pt-5">
                    {(() => {
                      const ev = evalResult.evaluation;
                      const v = verdictStyle(ev.verdict);
                      const VerdictIcon = v.Icon;
                      return (
                        <>
                          {/* Verdict Banner */}
                          <div
                            className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4 ${v.cls}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <VerdictIcon className="size-6 shrink-0" aria-hidden />
                              <div>
                                <p className="text-base font-extrabold">{v.label}</p>
                                <p className="text-xs opacity-90">
                                  {t.selfLearning.overallScoreLabel}: {ev.overallScore}%
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="outline">
                                {evalResult.source === "ai"
                                  ? t.selfLearning.aiBadge
                                  : t.selfLearning.semanticBadge}
                              </Badge>
                              {!isMasteredVerdict(ev.verdict) && (
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => inputRef.current?.focus()}
                                >
                                  <RotateCcw className="size-3.5" aria-hidden />
                                  {t.selfLearning.reviseBtn}
                                </Button>
                              )}
                            </div>
                          </div>

                          {/* Bilingual Feedback */}
                          <p className="rounded-xl bg-secondary/50 p-4 text-sm leading-relaxed text-foreground">
                            {ev.feedback[locale]}
                          </p>

                          {/* 7-Criterion Semantic Breakdown */}
                          <div className="rounded-xl border border-border bg-background p-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                              {t.selfLearning.criteriaTitle}
                            </p>
                            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                              {[
                                {
                                  label: t.selfLearning.critSemantic,
                                  val: ev.scores.semanticAccuracy,
                                },
                                {
                                  label: t.selfLearning.critGrammar,
                                  val: ev.scores.grammaticalAccuracy,
                                },
                                {
                                  label: t.selfLearning.critVocab,
                                  val: ev.scores.vocabularySelection,
                                },
                                {
                                  label: t.selfLearning.critStructure,
                                  val: ev.scores.sentenceStructure,
                                },
                                { label: t.selfLearning.critOrder, val: ev.scores.wordOrder },
                                {
                                  label: t.selfLearning.critNaturalness,
                                  val: ev.scores.naturalness,
                                },
                                {
                                  label: t.selfLearning.critPunctuation,
                                  val: ev.scores.punctuationSpelling,
                                },
                              ].map((metric) => (
                                <div key={metric.label} className="space-y-1">
                                  <div className="flex items-center justify-between text-xs font-medium">
                                    <span>{metric.label}</span>
                                    <span className="font-bold text-primary">{metric.val}%</span>
                                  </div>
                                  <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                                    <div
                                      className="h-full rounded-full bg-primary transition-all"
                                      style={{ width: `${metric.val}%` }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Specific Mistakes */}
                          {ev.mistakes.length > 0 && (
                            <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4">
                              <p className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                                {t.selfLearning.mistakesTitle}
                              </p>
                              <ul className="mt-2 space-y-2 text-sm">
                                {ev.mistakes.map((m, mIdx) => (
                                  <li key={mIdx} className="space-y-0.5">
                                    <p dir="ltr">
                                      <span className="font-bold text-red-600 dark:text-red-400">
                                        ✗ {m.issue}
                                      </span>{" "}
                                      →{" "}
                                      <span className="font-bold text-emerald-700 dark:text-emerald-400">
                                        {m.suggestion}
                                      </span>
                                    </p>
                                    <p className="text-xs text-muted-foreground">{m.why[locale]}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Model Translation + Why Appropriate + Acceptable Alternatives */}
                          <div className="space-y-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                                  {t.selfLearning.modelTranslationLabel}
                                </p>
                                <p
                                  className="mt-1 text-base font-semibold text-foreground"
                                  dir="ltr"
                                >
                                  <HighlightedText
                                    text={ev.modelTranslation}
                                    keywords={currentItem.keyVocab}
                                  />
                                </p>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => playSpeech(ev.modelTranslation, 0.92, "female")}
                                aria-label={t.selfLearning.listenModel}
                              >
                                <Volume2 className="size-4" aria-hidden />
                                {t.selfLearning.listenModel}
                              </Button>
                            </div>

                            <p className="rounded-lg bg-card/80 p-3 text-xs leading-relaxed text-muted-foreground">
                              <span className="font-bold text-foreground">
                                {t.selfLearning.whyAppropriateLabel}:
                              </span>{" "}
                              {ev.whyAppropriate[locale]}
                            </p>

                            <div>
                              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                {t.selfLearning.alternativesLabel}
                              </p>
                              <ul className="mt-1.5 space-y-1.5" dir="ltr">
                                {ev.acceptableAlternatives.map((alt, altIdx) => (
                                  <li
                                    key={altIdx}
                                    className="flex items-center justify-between gap-2 rounded-lg bg-card/70 px-3 py-2 text-sm text-foreground"
                                  >
                                    <span>• {alt}</span>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="size-7 shrink-0"
                                      onClick={() =>
                                        playSpeech(alt, 0.92, altIdx === 0 ? "male" : "female")
                                      }
                                      aria-label={t.selfLearning.listenModel}
                                    >
                                      <Volume2 className="size-3.5" aria-hidden />
                                    </Button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}
              </section>
            )}
          </main>

          {/* RIGHT: Live Progress & Personal Insights Sidebar */}
          <aside className="space-y-5">
            {/* Key Metrics */}
            <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
                <BookMarked className="size-4 text-primary" aria-hidden />
                {t.selfLearning.analyticsTitle}
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { label: t.selfLearning.statCompleted, val: `${analytics.attempted}/600` },
                  { label: t.selfLearning.statCorrect, val: `${analytics.mastered}` },
                  { label: t.selfLearning.statNeedsReview, val: `${analytics.inRevision}` },
                  { label: t.selfLearning.statAccuracy, val: `${analytics.accuracy}%` },
                  {
                    label: t.selfLearning.statTimeSpent,
                    val: formatDuration(progress.totalSecondsSpent),
                  },
                  {
                    label: t.selfLearning.statTopicsTouched,
                    val: `${analytics.topicsTouched}/16`,
                  },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-secondary/50 p-3">
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="mt-1 text-lg font-extrabold text-foreground" dir="ltr">
                      {stat.val}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Weak Grammar / Vocabulary Areas */}
            <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
                <Target className="size-4 text-amber-500" aria-hidden />
                {t.selfLearning.weakAreasTitle}
              </h2>
              {analytics.weakAreas.length === 0 ? (
                <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                  {t.selfLearning.noWeakAreas}
                </p>
              ) : (
                <div className="mt-3 flex flex-wrap gap-1.5" dir="ltr">
                  {analytics.weakAreas.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-amber-500/40 bg-amber-500/10 text-xs text-foreground"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </section>

            {/* Personal Translation History */}
            <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
                <History className="size-4 text-primary" aria-hidden />
                {t.selfLearning.historyTitle}
              </h2>
              {analytics.recentHistory.length === 0 ? (
                <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                  {t.selfLearning.noHistory}
                </p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {analytics.recentHistory.map((rec) => {
                    const v = verdictStyle(rec.status);
                    return (
                      <li key={rec.id}>
                        <button
                          type="button"
                          onClick={() => jumpToSentence(rec.id)}
                          className="flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-background px-3 py-2 text-start text-xs transition-colors hover:bg-muted/60"
                        >
                          <div className="min-w-0">
                            <span className="font-mono font-bold text-primary" dir="ltr">
                              {rec.id.toUpperCase()}
                            </span>{" "}
                            <span className="text-muted-foreground">· {rec.lastScore}%</span>
                            <p className="truncate text-foreground" dir="ltr">
                              {rec.lastResponse}
                            </p>
                          </div>
                          <Badge variant="outline" className={`shrink-0 text-[10px] ${v.cls}`}>
                            {v.label}
                          </Badge>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            {/* Personal Error History & Recurring Mistakes */}
            <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
                <AlertCircle className="size-4 text-destructive" aria-hidden />
                {t.pathways.slErrorHistoryTitle}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {t.pathways.slErrorHistorySubtitle}
              </p>
              {(() => {
                const errors = Object.values(progress.records)
                  .filter((r) => r.status === "incorrect" || r.status === "partially_correct")
                  .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
                  .slice(0, 5);
                if (errors.length === 0) {
                  return (
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      {t.pathways.slErrorHistoryEmpty}
                    </p>
                  );
                }
                return (
                  <ul className="mt-3 space-y-2.5">
                    {errors.map((err) => {
                      const item = ALL_SELF_LEARNING_SENTENCES.find((s) => s.id === err.id);
                      return (
                        <li
                          key={err.id}
                          className="space-y-1.5 rounded-xl border border-destructive/25 bg-destructive/5 p-3 text-xs"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono font-bold text-destructive" dir="ltr">
                              {err.level} · {err.grammarFocus}
                            </span>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="h-6 px-2 text-[11px]"
                              onClick={() => jumpToSentence(err.id)}
                            >
                              {t.pathways.slPracticeNowBtn}
                            </Button>
                          </div>
                          <p className="text-muted-foreground" dir="ltr">
                            <span className="font-semibold text-foreground">
                              {t.pathways.slYourAnswerLabel}:
                            </span>{" "}
                            {err.lastResponse}
                          </p>
                          {item && (
                            <p className="text-emerald-700 dark:text-emerald-300" dir="ltr">
                              <span className="font-semibold">
                                {t.pathways.slTargetAnswerLabel}:
                              </span>{" "}
                              {item.modelEnglish}
                            </p>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                );
              })()}
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
