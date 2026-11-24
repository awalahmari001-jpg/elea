import { useMemo, useState } from "react";
import { Award, CheckCircle2, RotateCcw, Sparkles, Star, Trophy, Volume2 } from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { KIDS_FRIENDLY_ASSESSMENTS } from "@/content/kids/stories-communication-data";
import { playSpeech } from "@/hooks/use-speech";
import {
  computeKidsBadges,
  computeKidsRewardTier,
  type KidsProgressState,
} from "@/lib/kids-storage";

export interface KidsAssessmentRewardsStudioProps {
  progress: KidsProgressState;
  onCompleteAssessment: (assessmentId: string, scorePct: number) => void;
}

export function KidsAssessmentRewardsStudio({
  progress,
  onCompleteAssessment,
}: KidsAssessmentRewardsStudioProps) {
  const { locale, t } = useI18n();
  const kw = t.kidsWorld;

  const defaultQuiz =
    KIDS_FRIENDLY_ASSESSMENTS.find((q) => q.ageGroup === progress.ageGroup) ??
    KIDS_FRIENDLY_ASSESSMENTS[0]!;

  const [selectedQuizId, setSelectedQuizId] = useState(defaultQuiz.id);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [firstTryCorrect, setFirstTryCorrect] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);

  const quiz = useMemo(
    () =>
      KIDS_FRIENDLY_ASSESSMENTS.find((q) => q.id === selectedQuizId) ??
      KIDS_FRIENDLY_ASSESSMENTS[0]!,
    [selectedQuizId],
  );
  const question = quiz.questions[questionIdx] ?? quiz.questions[0]!;

  const badges = useMemo(() => computeKidsBadges(progress), [progress]);
  const earnedCount = badges.filter((b) => b.earned).length;
  const tier = useMemo(() => computeKidsRewardTier(progress.stars), [progress.stars]);
  const tierPct = tier.nextTierStars
    ? Math.min(100, Math.round((progress.stars / tier.nextTierStars) * 100))
    : 100;

  const handleSelectQuiz = (id: string) => {
    setSelectedQuizId(id);
    setQuestionIdx(0);
    setSelectedOption(null);
    setFirstTryCorrect({});
    setFinished(false);
  };

  const handlePickOption = (idx: number) => {
    const isCorrect = idx === question.correctIndex;
    setSelectedOption(idx);
    if (!(question.id in firstTryCorrect)) {
      setFirstTryCorrect((prev) => ({ ...prev, [question.id]: isCorrect }));
    }
    if (isCorrect) {
      playSpeech(question.praise.en, 0.94, "female");
    } else {
      playSpeech(question.gentleHint.en, 0.9, "female");
    }
  };

  const handleNext = () => {
    if (questionIdx + 1 < quiz.questions.length) {
      setQuestionIdx((n) => n + 1);
      setSelectedOption(null);
    } else {
      const firstHits = Object.values(firstTryCorrect).filter(Boolean).length;
      const pct = Math.max(60, Math.round((firstHits / quiz.questions.length) * 100));
      setFinished(true);
      onCompleteAssessment(quiz.id, pct);
      playSpeech("Hooray! You finished the Star Check and earned shiny stars!", 0.94, "female");
    }
  };

  const isAnsweredCorrectly = selectedOption === question.correctIndex;

  return (
    <section className="space-y-8">
      {/* PART A: ZERO-STRESS CHILD-FRIENDLY STAR CHECK */}
      <div className="space-y-5 rounded-3xl border-2 border-foreground/80 bg-card p-6 shadow-ink">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Badge className="mb-2 bg-amber-500 text-xs font-black text-white">
              ⭐ {kw.starQuizBadge}
            </Badge>
            <h2 className="display-heading text-2xl font-black text-foreground md:text-3xl">
              {kw.starQuizTitle}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{kw.starQuizSubtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {KIDS_FRIENDLY_ASSESSMENTS.map((a) => {
              const active = a.id === quiz.id;
              const best = progress.assessmentScores[a.id];
              return (
                <Button
                  key={a.id}
                  type="button"
                  size="sm"
                  variant={active ? "default" : "outline"}
                  className="rounded-full text-xs font-extrabold"
                  onClick={() => handleSelectQuiz(a.id)}
                >
                  <span className="me-1" aria-hidden>
                    {a.emoji}
                  </span>
                  {a.ageGroup === "early-4-6"
                    ? "4–6"
                    : a.ageGroup === "young-7-9"
                      ? "7–9"
                      : "10–12"}
                  {best !== undefined && (
                    <span className="ms-1 text-amber-300" dir="ltr">
                      ⭐
                    </span>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {!finished ? (
          <div className="space-y-5 rounded-3xl border-2 border-primary/25 bg-gradient-to-br from-sky-100/50 via-amber-50/50 to-emerald-100/40 p-6 dark:from-sky-950/30 dark:via-amber-950/25 dark:to-emerald-950/30">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Badge variant="secondary" className="text-xs font-extrabold">
                {quiz.emoji} {quiz.title[locale]}
              </Badge>
              <span className="text-xs font-black text-primary" dir="ltr">
                {questionIdx + 1} / {quiz.questions.length}
              </span>
            </div>
            <Progress value={Math.round(((questionIdx + 1) / quiz.questions.length) * 100)} />

            <div className="text-center">
              <div className="text-6xl leading-none" aria-hidden>
                {question.emoji}
              </div>
              <h3 className="mt-3 text-xl font-black text-foreground md:text-2xl">
                {question.prompt[locale]}
              </h3>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="mt-3 rounded-full font-bold"
                onClick={() => playSpeech(question.audioText, 0.86, "female")}
              >
                <Volume2 className="me-1.5 size-4" aria-hidden />
                {kw.hearPromptBtn}
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {question.options.map((opt, idx) => {
                const picked = selectedOption === idx;
                const correct = idx === question.correctIndex;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handlePickOption(idx)}
                    className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-5 text-center transition-all ${
                      picked && correct
                        ? "border-emerald-500 bg-emerald-500/15 shadow-sm scale-[1.02]"
                        : picked
                          ? "border-amber-400 bg-amber-400/15"
                          : "border-border bg-card hover:border-primary/60"
                    }`}
                  >
                    <span className="text-4xl" aria-hidden>
                      {opt.emoji}
                    </span>
                    <span className="text-base font-black text-foreground" dir="ltr">
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div
                className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4 text-sm font-extrabold ${
                  isAnsweredCorrectly
                    ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200"
                    : "bg-amber-400/20 text-amber-900 dark:text-amber-100"
                }`}
              >
                <span>
                  {isAnsweredCorrectly
                    ? `🌟 ${question.praise[locale]}`
                    : `🦉 ${question.gentleHint[locale]}`}
                </span>
                {isAnsweredCorrectly && (
                  <Button type="button" size="sm" className="rounded-full" onClick={handleNext}>
                    {questionIdx + 1 < quiz.questions.length
                      ? kw.nextQuestionBtn
                      : kw.finishStarQuizBtn}
                  </Button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 rounded-3xl border-2 border-emerald-500/40 bg-emerald-500/10 p-8 text-center">
            <div className="text-6xl" aria-hidden>
              🎉⭐🦉
            </div>
            <h3 className="display-heading text-2xl font-black text-foreground md:text-3xl">
              {kw.starQuizCelebrateTitle}
            </h3>
            <p className="mx-auto max-w-lg text-sm font-semibold text-muted-foreground">
              {kw.starQuizCelebrateDesc}
            </p>
            <Button
              type="button"
              variant="outline"
              className="rounded-full font-bold"
              onClick={() => handleSelectQuiz(quiz.id)}
            >
              <RotateCcw className="me-1.5 size-4" aria-hidden />
              {kw.playQuizAgainBtn}
            </Button>
          </div>
        )}
      </div>

      {/* PART B: STAR REWARD TIER & 12 SHINY COLLECTIBLE BADGES */}
      <div className="space-y-5 rounded-3xl border-2 border-border bg-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-amber-400/20 via-sky-400/15 to-emerald-400/20 p-5">
          <div className="flex items-center gap-3">
            <span className="text-5xl" aria-hidden>
              {tier.emoji}
            </span>
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wide text-primary">
                {kw.rewardTierLabel}
              </div>
              <h3 className="display-heading text-2xl font-black text-foreground">
                {tier.title[locale]}
              </h3>
              <p className="text-xs font-semibold text-muted-foreground">
                {tier.nextTierStars
                  ? locale === "ar"
                    ? `اجمع ${Math.max(0, tier.nextTierStars - progress.stars)} نجوم إضافية للمستوى التالي!`
                    : `Collect ${Math.max(0, tier.nextTierStars - progress.stars)} more stars to reach the next tier!`
                  : kw.topTierCheer}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-card px-4 py-2.5 text-center shadow-xs">
              <div className="flex items-center justify-center gap-1 text-xl font-black text-amber-600 dark:text-amber-300">
                <Star className="size-5 fill-amber-500 text-amber-500" aria-hidden />
                <span dir="ltr">{progress.stars}</span>
              </div>
              <div className="text-[11px] font-bold text-muted-foreground">{kw.starsLabel}</div>
            </div>
            <div className="rounded-2xl bg-card px-4 py-2.5 text-center shadow-xs">
              <div className="flex items-center justify-center gap-1 text-xl font-black text-primary">
                <Trophy className="size-5 text-primary" aria-hidden />
                <span dir="ltr">
                  {earnedCount}/{badges.length}
                </span>
              </div>
              <div className="text-[11px] font-bold text-muted-foreground">{kw.badgesTitle}</div>
            </div>
          </div>
        </div>

        <Progress value={tierPct} className="h-3" />

        <div>
          <h4 className="mb-3 flex items-center gap-2 text-base font-black text-foreground">
            <Award className="size-5 text-primary" aria-hidden />
            {kw.trophyShelfTitle} ({earnedCount}/{badges.length})
          </h4>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`flex items-start gap-3 rounded-2xl border-2 p-4 transition-all ${
                  b.earned
                    ? "border-emerald-500/60 bg-emerald-500/10 shadow-xs"
                    : "border-dashed border-border bg-secondary/30 opacity-80"
                }`}
              >
                <span className="text-3xl" aria-hidden>
                  {b.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <div className="truncate text-sm font-extrabold text-foreground">
                      {b.title[locale]}
                    </div>
                    {b.earned && (
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-600" aria-hidden />
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{b.requirement[locale]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-2xl bg-primary/10 px-4 py-3 text-xs font-bold text-foreground">
          <Sparkles className="size-4 shrink-0 text-primary" aria-hidden />
          <span>{kw.pipCheerFooter}</span>
        </div>
      </div>
    </section>
  );
}
