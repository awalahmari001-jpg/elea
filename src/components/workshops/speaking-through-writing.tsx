import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookmarkCheck,
  BookmarkPlus,
  CheckCircle2,
  Lightbulb,
  Loader2,
  Mic,
  MicOff,
  PenLine,
  RotateCcw,
  Sparkles,
  Trash2,
  Volume2,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CEFR_LEVELS, type CefrLevel } from "@/content/courses";
import { playSpeech, useSpeech } from "@/hooks/use-speech";
import { format } from "@/lib/i18n/messages";
import { learningRecord } from "@/lib/learning-record";
import { evaluateSpeakingThroughWriting } from "@/lib/speaking-through-writing-ai.functions";
import {
  CEFR_SPOKEN_PROFILES,
  evaluateSpeakingThroughWritingLocal,
  STW_CONTEXTS,
  type SpeakingThroughWritingResult,
} from "@/lib/speaking-through-writing-fallback";
import { compareRecognition } from "@/lib/speech";

interface SavedPhraseEntry {
  id: string;
  contextId: string;
  targetLevel: CefrLevel;
  originalDraft: string;
  elevatedSpoken: string;
  savedAt: string;
}

const PHRASEBOOK_KEY = "ele.stw.phrasebook";

function readPhrasebook(): SavedPhraseEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PHRASEBOOK_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SavedPhraseEntry[]) : [];
  } catch {
    return [];
  }
}

function writePhrasebook(entries: SavedPhraseEntry[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PHRASEBOOK_KEY, JSON.stringify(entries.slice(0, 40)));
}

export function SpeakingThroughWritingWorkshop() {
  const { t, locale, dir } = useI18n();
  const s = t.speakingThroughWriting;

  const [contextId, setContextId] = useState<string>(STW_CONTEXTS[0]!.id);
  const [customContext, setCustomContext] = useState("");
  const [targetLevel, setTargetLevel] = useState<CefrLevel>("B2");
  const [draft, setDraft] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState<SpeakingThroughWritingResult | null>(null);
  const [spokenPracticeText, setSpokenPracticeText] = useState("");
  const [phrasebook, setPhrasebook] = useState<SavedPhraseEntry[]>([]);

  useEffect(() => {
    setPhrasebook(readPhrasebook());
  }, []);

  const activeContext = useMemo(
    () => STW_CONTEXTS.find((c) => c.id === contextId) ?? STW_CONTEXTS[0]!,
    [contextId],
  );
  const activeProfile = CEFR_SPOKEN_PROFILES[targetLevel];

  const draftSpeech = useSpeech((transcript) =>
    setDraft((prev) => (prev.trim() ? `${prev.trim()} ${transcript}` : transcript)),
  );
  const practiceSpeech = useSpeech((transcript) => setSpokenPracticeText(transcript));

  const alignment = useMemo(() => {
    if (!result || !spokenPracticeText.trim()) return null;
    return compareRecognition(result.elevatedSpoken, spokenPracticeText);
  }, [result, spokenPracticeText]);

  const isSaved = useMemo(() => {
    if (!result) return false;
    return phrasebook.some(
      (p) => p.elevatedSpoken.toLowerCase() === result.elevatedSpoken.toLowerCase(),
    );
  }, [phrasebook, result]);

  async function handleEvaluate() {
    const cleaned = draft.trim();
    if (cleaned.length < 2 || evaluating) return;
    setEvaluating(true);
    setSpokenPracticeText("");

    const payload = {
      draft: cleaned,
      targetLevel,
      contextId,
      ...(customContext.trim() ? { customContext: customContext.trim() } : {}),
    };

    let evaluated: SpeakingThroughWritingResult;
    try {
      evaluated = await evaluateSpeakingThroughWriting({ data: payload });
    } catch {
      evaluated = evaluateSpeakingThroughWritingLocal(payload);
    }

    setResult(evaluated);
    setEvaluating(false);
    learningRecord.logActivity({
      kind: "workshop",
      count: 1,
      minutes: 3,
      passed: true,
    });
  }

  function handleSavePhrase() {
    if (!result || isSaved) return;
    const entry: SavedPhraseEntry = {
      id: `stw-${Date.now()}`,
      contextId,
      targetLevel: result.targetLevel,
      originalDraft: draft.trim(),
      elevatedSpoken: result.elevatedSpoken,
      savedAt: new Date().toISOString(),
    };
    const next = [entry, ...phrasebook];
    setPhrasebook(next);
    writePhrasebook(next);
    toast.success(s.savedToast);
  }

  function handleRemovePhrase(id: string) {
    const next = phrasebook.filter((p) => p.id !== id);
    setPhrasebook(next);
    writePhrasebook(next);
  }

  const categoryColor = (cat: "grammar" | "phrasing" | "politeness" | "word-choice") => {
    if (cat === "grammar") return "bg-rose-500/15 text-rose-700 dark:text-rose-300";
    if (cat === "politeness") return "bg-amber-500/15 text-amber-800 dark:text-amber-300";
    if (cat === "word-choice") return "bg-violet-500/15 text-violet-700 dark:text-violet-300";
    return "bg-sky-500/15 text-sky-700 dark:text-sky-300";
  };

  return (
    <div dir={dir} className="space-y-8">
      {/* Engaging Module Hero Card */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-primary/35 bg-gradient-to-br from-primary/10 via-card to-accent/10 p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="gap-1.5 bg-primary text-primary-foreground">
            <PenLine className="size-3.5" aria-hidden />
            {s.badge}
          </Badge>
          <Badge variant="outline" className="text-xs font-bold">
            CEFR A1 → C2
          </Badge>
        </div>
        <h2 className="display-heading mt-3 text-2xl font-extrabold text-foreground md:text-3xl">
          {s.title}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {s.subtitle}
        </p>

        {/* 3-Step Visual Promise Strip */}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            { num: "1", title: s.pillar1Title, desc: s.pillar1Desc },
            { num: "2", title: s.pillar2Title, desc: s.pillar2Desc },
            { num: "3", title: s.pillar3Title, desc: s.pillar3Desc },
          ].map((item) => (
            <div
              key={item.num}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card/90 p-3.5"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-black text-primary-foreground">
                {item.num}
              </span>
              <div>
                <p className="text-xs font-extrabold text-foreground">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Drafting & Configuration Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: Context & Target CEFR Selector */}
        <Card className="lg:col-span-5">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{s.setupTitle}</CardTitle>
            <CardDescription>{s.setupSubtitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Real-Life Spoken Context Chips */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {s.contextLabel}
              </p>
              <div className="flex flex-wrap gap-1.5" role="group" aria-label={s.contextLabel}>
                {STW_CONTEXTS.map((ctx) => (
                  <Button
                    key={ctx.id}
                    type="button"
                    size="sm"
                    variant={contextId === ctx.id ? "default" : "outline"}
                    className="rounded-full text-xs"
                    onClick={() => setContextId(ctx.id)}
                  >
                    <span className="me-1" aria-hidden>
                      {ctx.emoji}
                    </span>
                    {ctx.label[locale]}
                  </Button>
                ))}
              </div>
              <p className="rounded-xl bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
                <Lightbulb className="me-1 inline size-3.5 text-amber-500" aria-hidden />
                {activeContext.goalHint[locale]}
              </p>
            </div>

            {/* Optional Custom Spoken Situation */}
            <div className="space-y-1.5">
              <label htmlFor="stw-custom-context" className="text-xs font-bold text-foreground">
                {s.customContextLabel}
              </label>
              <Input
                id="stw-custom-context"
                value={customContext}
                onChange={(e) => setCustomContext(e.target.value)}
                placeholder={s.customContextPlaceholder}
              />
            </div>

            {/* Target CEFR A1-C2 Selector */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {s.targetCefrLabel}
              </p>
              <div className="grid grid-cols-6 gap-1.5" role="group" aria-label={s.targetCefrLabel}>
                {CEFR_LEVELS.map((lvl) => (
                  <Button
                    key={lvl}
                    type="button"
                    size="sm"
                    variant={targetLevel === lvl ? "default" : "outline"}
                    className="font-extrabold"
                    onClick={() => setTargetLevel(lvl)}
                  >
                    {lvl}
                  </Button>
                ))}
              </div>
              <div className="rounded-xl border border-primary/25 bg-primary/5 p-3 text-xs">
                <p className="font-bold text-primary">{activeProfile.badge[locale]}</p>
                <p className="mt-1 leading-relaxed text-foreground">
                  {activeProfile.description[locale]}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right: Learner Drafting Studio */}
        <Card className="lg:col-span-7">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle className="text-lg">{s.draftCardTitle}</CardTitle>
                <CardDescription>{s.draftCardSubtitle}</CardDescription>
              </div>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="rounded-full text-xs"
                onClick={() => {
                  setDraft(activeContext.sampleRoughDraft);
                  setResult(null);
                }}
              >
                <Sparkles className="size-3.5 text-primary" aria-hidden />
                {s.tryExampleBtn}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <Textarea
              id="stw-draft-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={5}
              dir="ltr"
              lang="en"
              placeholder={s.draftPlaceholder}
              aria-label={s.draftCardTitle}
              className="text-base leading-relaxed"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {draftSpeech.supported && (
                  <Button
                    type="button"
                    size="sm"
                    variant={draftSpeech.listening ? "destructive" : "outline"}
                    onClick={() =>
                      draftSpeech.listening ? draftSpeech.stop() : draftSpeech.start()
                    }
                  >
                    {draftSpeech.listening ? (
                      <>
                        <MicOff className="size-4" aria-hidden />
                        {t.learning.stop}
                      </>
                    ) : (
                      <>
                        <Mic className="size-4" aria-hidden />
                        {s.dictateDraftBtn}
                      </>
                    )}
                  </Button>
                )}
                {draft.trim() && (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setDraft("");
                      setResult(null);
                      setSpokenPracticeText("");
                    }}
                  >
                    <RotateCcw className="size-3.5" aria-hidden />
                    {s.clearBtn}
                  </Button>
                )}
              </div>

              <Button
                type="button"
                size="lg"
                variant="hero"
                disabled={draft.trim().length < 2 || evaluating}
                onClick={() => void handleEvaluate()}
              >
                {evaluating ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    {s.evaluatingBtn}
                  </>
                ) : (
                  <>
                    <Wand2 className="size-4" aria-hidden />
                    {format(s.evaluateBtn, { level: targetLevel })}
                  </>
                )}
              </Button>
            </div>

            <p className="rounded-xl bg-secondary/50 px-3.5 py-2.5 text-xs text-muted-foreground">
              {s.reassuranceNote}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ================= AI EVALUATION & STEP-BY-STEP RECONSTRUCTION ================= */}
      {result && (
        <div className="space-y-6">
          {/* Warm Encouragement & CEFR Elevation Banner */}
          <Card className="border-2 border-emerald-500/40 bg-emerald-500/5">
            <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-emerald-600 text-white" dir="ltr">
                    {s.detectedLabel}: {result.detectedLevel} → {s.targetBadge}:{" "}
                    {result.targetLevel}
                  </Badge>
                  <Badge variant="outline" dir="ltr">
                    {s.readinessLabel}: {result.confidenceScore}%
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {result.source === "ai" ? s.aiCoachBadge : s.adaptiveCoachBadge}
                  </Badge>
                </div>
                <p className="text-sm font-semibold leading-relaxed text-foreground md:text-base">
                  {result.encouragement[locale]}
                </p>
              </div>
              <Button
                type="button"
                variant={isSaved ? "secondary" : "default"}
                disabled={isSaved}
                onClick={handleSavePhrase}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="size-4" aria-hidden />
                    {s.savedBtn}
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="size-4" aria-hidden />
                    {s.savePhraseBtn}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* 1. Grammar & Phrasing Polish Cards */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 className="size-5 text-primary" aria-hidden />
                {s.correctionsTitle}
              </CardTitle>
              <CardDescription>{s.correctionsSubtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              {result.corrections.length === 0 ? (
                <p className="rounded-xl border border-emerald-500/35 bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                  {s.noErrorsNote}
                </p>
              ) : (
                <div className="grid gap-3 md:grid-cols-2">
                  {result.corrections.map((c, idx) => (
                    <div
                      key={`${c.original}-${idx}`}
                      className="rounded-2xl border border-border bg-background p-4 space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <Badge className={`text-[11px] capitalize ${categoryColor(c.category)}`}>
                          {c.category}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm" dir="ltr">
                        <span className="rounded-md bg-rose-500/10 px-2 py-0.5 font-medium text-rose-700 line-through dark:text-rose-300">
                          {c.original}
                        </span>
                        <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                        <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 font-bold text-emerald-800 dark:text-emerald-300">
                          {c.corrected}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {c.why[locale]}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* 2. Step-by-Step Reconstruction Ladder */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="size-5 text-primary" aria-hidden />
                {s.reconstructionTitle}
              </CardTitle>
              <CardDescription>{s.reconstructionSubtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {result.reconstructionSteps.map((step, idx) => {
                const isFinal = idx === result.reconstructionSteps.length - 1;
                return (
                  <div
                    key={step.stepNumber}
                    className={`rounded-2xl border p-4 transition-colors ${
                      isFinal
                        ? "border-2 border-primary bg-primary/5 shadow-xs"
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`grid size-7 place-items-center rounded-full text-xs font-black ${
                            isFinal
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {step.stepNumber}
                        </span>
                        <h3 className="text-sm font-extrabold text-foreground">
                          {step.title[locale]}
                        </h3>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => playSpeech(step.sentence, 0.92, "female")}
                      >
                        <Volume2 className="size-4 text-primary" aria-hidden />
                        {t.learning.listen}
                      </Button>
                    </div>
                    <p
                      className="mt-2.5 text-base font-bold leading-relaxed text-foreground"
                      dir="ltr"
                      lang="en"
                    >
                      “{step.sentence}”
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {step.note[locale]}
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* 3. Bridge From Writing → Confident Speaking Aloud */}
          <Card className="border-2 border-primary/35">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Mic className="size-5 text-primary" aria-hidden />
                {s.speakBridgeTitle}
              </CardTitle>
              <CardDescription>{s.speakBridgeSubtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Elevated Final Spoken Line + Slow/Natural Playback */}
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wide text-primary">
                  {format(s.elevatedFinalLabel, { level: result.targetLevel })}
                </p>
                <p
                  className="text-lg font-extrabold leading-relaxed text-foreground md:text-xl"
                  dir="ltr"
                  lang="en"
                >
                  {result.elevatedSpoken}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="default"
                    onClick={() => playSpeech(result.elevatedSpoken, 0.95, "female")}
                  >
                    <Volume2 className="size-4" aria-hidden />
                    {s.listenNaturalBtn}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => playSpeech(result.elevatedSpoken, 0.8, "female")}
                  >
                    <Volume2 className="size-4" aria-hidden />
                    {s.listenSlowBtn}
                  </Button>
                  {practiceSpeech.supported && (
                    <Button
                      type="button"
                      size="sm"
                      variant={practiceSpeech.listening ? "destructive" : "secondary"}
                      onClick={() =>
                        practiceSpeech.listening ? practiceSpeech.stop() : practiceSpeech.start()
                      }
                    >
                      {practiceSpeech.listening ? (
                        <>
                          <MicOff className="size-4" aria-hidden />
                          {t.learning.stop}
                        </>
                      ) : (
                        <>
                          <Mic className="size-4" aria-hidden />
                          {s.practiceAloudBtn}
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {/* Pronunciation Stress Words */}
                {result.pronunciationFocus.length > 0 && (
                  <div className="pt-1">
                    <p className="text-xs font-semibold text-muted-foreground">
                      {s.stressWordsLabel}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5" dir="ltr" lang="en">
                      {result.pronunciationFocus.map((word) => (
                        <button
                          key={word}
                          type="button"
                          onClick={() => playSpeech(word, 0.85, "female")}
                          className="inline-flex items-center gap-1 rounded-full border border-primary/35 bg-card px-2.5 py-0.5 text-xs font-bold text-primary hover:bg-primary/10"
                        >
                          <Volume2 className="size-3" aria-hidden />
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <p className="rounded-xl bg-card/85 px-3.5 py-2 text-xs leading-relaxed text-muted-foreground">
                  <Lightbulb className="me-1 inline size-3.5 text-amber-500" aria-hidden />
                  {result.spokenDeliveryTip[locale]}
                </p>

                {/* Live Mic Word Alignment Feedback */}
                {alignment && (
                  <div className="rounded-xl border border-emerald-500/35 bg-emerald-500/10 p-3 text-xs space-y-1">
                    <p className="font-bold text-emerald-800 dark:text-emerald-300">
                      {format(t.learning.matched, {
                        count: alignment.matched.length,
                        total: alignment.total,
                      })}
                    </p>
                    <p className="text-muted-foreground" dir="ltr">
                      “{spokenPracticeText}”
                    </p>
                  </div>
                )}
              </div>

              {/* Register Variations (Casual vs Confident CEFR Target) */}
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="secondary">{s.casualVariationLabel}</Badge>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="size-7"
                      onClick={() => playSpeech(result.casualVariation, 0.94, "male")}
                      aria-label={t.learning.listen}
                    >
                      <Volume2 className="size-4 text-primary" aria-hidden />
                    </Button>
                  </div>
                  <p className="text-sm font-semibold text-foreground" dir="ltr" lang="en">
                    “{result.casualVariation}”
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="default">
                      {format(s.politeVariationLabel, { level: result.targetLevel })}
                    </Badge>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="size-7"
                      onClick={() => playSpeech(result.politeTargetVariation, 0.94, "female")}
                      aria-label={t.learning.listen}
                    >
                      <Volume2 className="size-4 text-primary" aria-hidden />
                    </Button>
                  </div>
                  <p className="text-sm font-semibold text-foreground" dir="ltr" lang="en">
                    “{result.politeTargetVariation}”
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Personal Saved Spoken Phrasebook */}
      {phrasebook.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookmarkCheck className="size-5 text-primary" aria-hidden />
              {s.phrasebookTitle} ({phrasebook.length})
            </CardTitle>
            <CardDescription>{s.phrasebookSubtitle}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {phrasebook.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-border bg-background p-4 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="outline" className="text-xs font-bold">
                    CEFR {item.targetLevel}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="size-7"
                      onClick={() => playSpeech(item.elevatedSpoken, 0.93, "female")}
                      aria-label={t.learning.listen}
                    >
                      <Volume2 className="size-4 text-primary" aria-hidden />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="size-7 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemovePhrase(item.id)}
                      aria-label={s.removePhraseLabel}
                    >
                      <Trash2 className="size-3.5" aria-hidden />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-through" dir="ltr">
                  {item.originalDraft}
                </p>
                <p className="text-sm font-bold text-foreground" dir="ltr">
                  {item.elevatedSpoken}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
