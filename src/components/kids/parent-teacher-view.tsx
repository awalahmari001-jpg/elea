import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Home,
  Lock,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Trash2,
  Unlock,
} from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  KIDS_SAFETY_PILLARS,
  KIDS_STORIES,
  PARENT_HOME_ACTIVITIES,
} from "@/content/kids/stories-communication-data";
import { KIDS_ANIMATED_VIDEOS } from "@/content/kids/videos-games-data";
import { KIDS_GRAMMAR_UNITS, KIDS_VOCAB_THEMES } from "@/content/kids/vocab-grammar-data";
import { computeReadingDiagnostics, type KidsProgressState } from "@/lib/kids-storage";

export interface ParentTeacherViewProps {
  progress: KidsProgressState;
  onResetProgress: () => void;
}

const MATH_CHALLENGES: readonly { a: number; b: number; answer: number }[] = [
  { a: 7, b: 8, answer: 15 },
  { a: 9, b: 6, answer: 15 },
  { a: 8, b: 5, answer: 13 },
  { a: 12, b: 7, answer: 19 },
];

export function ParentTeacherView({ progress, onResetProgress }: ParentTeacherViewProps) {
  const { locale, t } = useI18n();
  const kw = t.kidsWorld;

  const [challengeIdx, setChallengeIdx] = useState(0);
  const [answerInput, setAnswerInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [gateHint, setGateHint] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const challenge = MATH_CHALLENGES[challengeIdx % MATH_CHALLENGES.length]!;
  const diagnostics = useMemo(() => computeReadingDiagnostics(progress), [progress]);

  const prioritisedHomeIdeas = useMemo(() => {
    const primary = PARENT_HOME_ACTIVITIES.filter((a) => a.focusArea === diagnostics.focusArea);
    const others = PARENT_HOME_ACTIVITIES.filter((a) => a.focusArea !== diagnostics.focusArea);
    return [...primary, ...others];
  }, [diagnostics.focusArea]);

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(answerInput.trim()) === challenge.answer) {
      setUnlocked(true);
      setGateHint(false);
    } else {
      setGateHint(true);
    }
  };

  if (!unlocked) {
    return (
      <section className="mx-auto max-w-xl space-y-6">
        <div className="rounded-3xl border-2 border-foreground/80 bg-card p-7 text-center shadow-ink space-y-4">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <Lock className="size-7" aria-hidden />
          </div>
          <h2 className="display-heading text-2xl font-black text-foreground">
            {kw.parentGateTitle}
          </h2>
          <p className="text-sm text-muted-foreground">{kw.parentGateSubtitle}</p>

          <form onSubmit={handleUnlockSubmit} className="mx-auto max-w-xs space-y-3 pt-2">
            <div
              className="rounded-2xl bg-secondary/70 px-4 py-3 text-xl font-black text-foreground"
              dir="ltr"
            >
              {challenge.a} + {challenge.b} = ?
            </div>
            <Input
              type="text"
              inputMode="numeric"
              value={answerInput}
              onChange={(e) => {
                setAnswerInput(e.target.value);
                setGateHint(false);
              }}
              placeholder={kw.parentGatePlaceholder}
              aria-label={kw.parentGatePlaceholder}
              className="text-center text-lg font-bold"
              dir="ltr"
            />
            {gateHint && (
              <p className="text-xs font-bold text-amber-700 dark:text-amber-300">
                {kw.parentGateRetry}
              </p>
            )}
            <div className="flex items-center justify-center gap-2">
              <Button type="submit" className="rounded-full px-6 font-extrabold">
                <Unlock className="me-1.5 size-4" aria-hidden />
                {kw.parentGateUnlockBtn}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="New math question"
                onClick={() => {
                  setChallengeIdx((i) => i + 1);
                  setAnswerInput("");
                  setGateHint(false);
                }}
              >
                <RefreshCw className="size-4" aria-hidden />
              </Button>
            </div>
          </form>
        </div>

        {/* Child Safety Summary Always Visible */}
        <div className="grid gap-3 sm:grid-cols-3">
          {KIDS_SAFETY_PILLARS.map((pillar) => (
            <div
              key={pillar.title.en}
              className="rounded-2xl border border-border bg-card p-4 text-start"
            >
              <div className="text-2xl" aria-hidden>
                {pillar.emoji}
              </div>
              <h3 className="mt-2 text-xs font-extrabold text-foreground">
                {pillar.title[locale]}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {pillar.detail[locale]}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const avgSubskillPct = Math.round(
    diagnostics.subskills.reduce((sum, s) => sum + s.pct, 0) / diagnostics.subskills.length,
  );
  const strengths = diagnostics.subskills.filter((s) => s.pct >= 60);
  const needsFocus = diagnostics.subskills.filter((s) => s.pct < 60).slice(0, 4);

  return (
    <section className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border-2 border-primary/30 bg-card p-5">
        <div>
          <Badge className="mb-1.5 gap-1 bg-emerald-600 text-xs text-white">
            <ShieldCheck className="size-3.5" aria-hidden />
            {kw.parentUnlockedBadge}
          </Badge>
          <h2 className="display-heading text-2xl font-black text-foreground">
            {kw.parentDashboardTitle}
          </h2>
          <p className="text-sm text-muted-foreground">{kw.parentDashboardSubtitle}</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-full font-bold"
          onClick={() => {
            setUnlocked(false);
            setAnswerInput("");
          }}
        >
          <Lock className="me-1.5 size-4" aria-hidden />
          {kw.parentLockBtn}
        </Button>
      </div>

      {/* Overview KPI Strip */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="text-xs font-bold text-muted-foreground">{kw.parentLiteracyScore}</div>
          <div className="mt-1 text-2xl font-black text-primary" dir="ltr">
            {avgSubskillPct}%
          </div>
          <Progress value={avgSubskillPct} className="mt-2 h-1.5" />
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="text-xs font-bold text-muted-foreground">{kw.readingStagesLabel}</div>
          <div className="mt-1 text-2xl font-black text-foreground" dir="ltr">
            {diagnostics.stagesMasteredCount}/{diagnostics.totalStages}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="text-xs font-bold text-muted-foreground">{kw.parentVocabGrammarStat}</div>
          <div className="mt-1 text-2xl font-black text-foreground" dir="ltr">
            {progress.vocabThemesCompleted.length}/{KIDS_VOCAB_THEMES.length} ·{" "}
            {progress.grammarUnitsCompleted.length}/{KIDS_GRAMMAR_UNITS.length}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="text-xs font-bold text-muted-foreground">
            {kw.parentStoriesVideosStat}
          </div>
          <div className="mt-1 text-2xl font-black text-foreground" dir="ltr">
            {progress.storiesRead.length}/{KIDS_STORIES.length} · {progress.videosWatched.length}/
            {KIDS_ANIMATED_VIDEOS.length}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="text-xs font-bold text-muted-foreground">{kw.parentQuizzesStat}</div>
          <div className="mt-1 text-2xl font-black text-foreground" dir="ltr">
            {Object.keys(progress.assessmentScores).length}/3 · ⭐ {progress.stars}
          </div>
        </div>
      </div>

      {/* Targeted Recommendation + Strengths vs Focus */}
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-3 rounded-3xl border-2 border-primary/30 bg-primary/5 p-5">
          <h3 className="flex items-center gap-2 text-base font-black text-foreground">
            <Sparkles className="size-5 text-primary" aria-hidden />
            {kw.parentNextFocusHeading}
          </h3>
          <p className="text-sm leading-relaxed font-semibold text-foreground">
            {diagnostics.targetedRecommendation[locale]}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {strengths.length > 0 ? (
              strengths.map((s) => (
                <Badge key={s.id} className="gap-1 bg-emerald-600 text-xs text-white">
                  <CheckCircle2 className="size-3" aria-hidden />
                  {s.label[locale]} ({s.pct}%)
                </Badge>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">{kw.parentStartExploringNote}</span>
            )}
          </div>
        </div>

        <div className="space-y-2.5 rounded-3xl border border-border bg-card p-5">
          <h3 className="text-sm font-black text-foreground">{kw.parentNeedsPracticeHeading}</h3>
          <ul className="space-y-2 text-xs">
            {needsFocus.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-2 rounded-xl bg-secondary/50 px-3 py-2 font-bold"
              >
                <span>{item.label[locale]}</span>
                <span className="text-primary" dir="ltr">
                  {item.pct}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 13-Subskill Foundational Literacy Matrix */}
      <div className="space-y-4 rounded-3xl border border-border bg-card p-6">
        <h3 className="text-lg font-black text-foreground">
          📊 {kw.parent13SubskillsTitle} ({diagnostics.subskills.length})
        </h3>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {diagnostics.subskills.map((sub) => (
            <div key={sub.id} className="rounded-2xl border border-border/80 bg-background p-3.5">
              <div className="flex items-center justify-between gap-2 text-xs font-extrabold">
                <span className="text-foreground">{sub.label[locale]}</span>
                <span className="text-primary" dir="ltr">
                  {sub.pct}%
                </span>
              </div>
              <Progress value={sub.pct} className="mt-2 h-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Offline Home Practice Plan for Parents */}
      <div className="space-y-4 rounded-3xl border border-border bg-card p-6">
        <h3 className="flex items-center gap-2 text-lg font-black text-foreground">
          <Home className="size-5 text-primary" aria-hidden />
          {kw.parentHomePlanTitle}
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          {prioritisedHomeIdeas.map((idea, idx) => (
            <article
              key={idea.id}
              className={`rounded-2xl border p-4 ${
                idx === 0 ? "border-primary/50 bg-primary/5" : "border-border bg-background"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-black text-foreground">
                  <span className="me-1.5" aria-hidden>
                    {idea.emoji}
                  </span>
                  {idea.title[locale]}
                </h4>
                {idx === 0 && (
                  <Badge className="bg-primary text-[10px] text-primary-foreground">
                    {kw.parentRecommendedTag}
                  </Badge>
                )}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {idea.steps[locale]}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Safety Pillars + Parent-Only Reset */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-secondary/40 p-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-black text-foreground">
            <ShieldCheck className="size-4 text-emerald-600" aria-hidden />
            {kw.safetyGuaranteeTitle}
          </div>
          <p className="text-xs text-muted-foreground">{kw.safetyGuaranteeDesc}</p>
        </div>

        <div className="flex items-center gap-2">
          {!confirmReset ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full text-xs"
              onClick={() => setConfirmReset(true)}
            >
              <Trash2 className="me-1.5 size-3.5" aria-hidden />
              {kw.parentResetBtn}
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="rounded-full text-xs"
                onClick={() => {
                  onResetProgress();
                  setConfirmReset(false);
                }}
              >
                {kw.parentResetConfirmBtn}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="rounded-full text-xs"
                onClick={() => setConfirmReset(false)}
              >
                {kw.parentCancelBtn}
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
