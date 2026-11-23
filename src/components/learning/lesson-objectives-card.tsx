import { ArrowDown, Flag, Sparkles, Target } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import type { LessonObjective } from "@/content/lesson-types";
import { HighlightedText } from "./highlighted-text";

export interface LessonObjectivesCardProps {
  objectives: LessonObjective[];
  keywords?: string[];
  hasPostEvaluation?: boolean;
}

/**
 * Displayed PRIOR to starting each lesson so learners immediately see the main objectives,
 * mastery missions, and bold-red key terms before beginning the video & practice.
 */
export function LessonObjectivesCard({
  objectives,
  keywords,
  hasPostEvaluation = true,
}: LessonObjectivesCardProps) {
  const { locale, t } = useI18n();
  const focusChips = (keywords ?? []).slice(0, 10);

  return (
    <section aria-label={t.learning.objectivesTitle} className="py-8">
      <div className="rounded-2xl border-2 border-primary/25 bg-card p-6 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow flex items-center gap-1.5 text-primary">
              <Target className="size-4" aria-hidden />
              {t.learning.objectivesEyebrow}
            </p>
            <h2 className="mt-1.5 text-2xl font-bold text-foreground">
              {t.learning.objectivesTitle}
            </h2>
            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {t.learning.objectivesSubtitle}
            </p>
          </div>
          {hasPostEvaluation && (
            <a
              href="#lesson-post-eval"
              className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3.5 py-2 text-xs font-bold text-primary transition hover:bg-primary/20"
            >
              <ArrowDown className="size-3.5" aria-hidden />
              {t.learning.jumpToPostEval}
            </a>
          )}
        </div>

        {/* Bold-Red Important Words & Pronouns Preview */}
        {focusChips.length > 0 && (
          <div className="mt-4 rounded-xl border border-red-500/25 bg-red-500/5 px-4 py-3">
            <p className="flex items-center gap-1.5 text-xs font-bold text-red-700 dark:text-red-400">
              <Sparkles className="size-3.5" aria-hidden />
              {t.learning.keyWordsLegend}:
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5" lang="en" dir="ltr">
              {focusChips.map((word) => (
                <span
                  key={word}
                  className="rounded-full border border-red-500/30 bg-background px-2.5 py-0.5 text-xs font-extrabold text-red-600 dark:text-red-400"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 4 Main Objectives & Mastery Missions */}
        <ol className="mt-5 grid gap-3 md:grid-cols-2">
          {objectives.map((obj) => (
            <li
              key={obj.code}
              className="flex flex-col rounded-xl border border-border bg-background p-4"
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center justify-center rounded-full bg-primary px-2.5 py-0.5 font-mono text-xs font-extrabold text-primary-foreground"
                  dir="ltr"
                >
                  {obj.code}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                  <Flag className="size-3.5" aria-hidden />
                  {t.learning.objectiveMissionLabel}
                </span>
              </div>
              <h3 className="mt-2 text-sm font-bold leading-snug text-foreground">
                {locale === "en" ? (
                  <HighlightedText text={obj.title.en} {...(keywords ? { keywords } : {})} />
                ) : (
                  obj.title.ar
                )}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {locale === "en" ? (
                  <HighlightedText text={obj.mission.en} {...(keywords ? { keywords } : {})} />
                ) : (
                  obj.mission.ar
                )}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
