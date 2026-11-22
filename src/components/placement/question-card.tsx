import { useEffect, useMemo } from "react";
import { ArrowLeft, ArrowRight, HelpCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useI18n } from "@/components/i18n-provider";
import type { PlacementQuestion } from "@/content/placement-questions";
import { format } from "@/lib/i18n/messages";
import { shuffledOptions } from "@/lib/placement";
import { cn } from "@/lib/utils";

const LETTERS = ["A", "B", "C", "D"];

/** One question at a time. Keys 1–4 pick an answer, Enter goes next. */
export function QuestionCard({
  question,
  index,
  total,
  selected,
  answered,
  onSelect,
  onBack,
  onNext,
}: {
  question: PlacementQuestion;
  index: number;
  total: number;
  /** chosen option, null = "I don't know", undefined = not answered yet */
  selected: string | null | undefined;
  answered: boolean;
  onSelect: (value: string | null) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const { t } = useI18n();
  const options = useMemo(() => shuffledOptions(question), [question]);
  const isLast = index === total - 1;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return;
      const n = Number(e.key);
      if (n >= 1 && n <= options.length) onSelect(options[n - 1] ?? null);
      if (e.key === "Enter" && answered) onNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [options, onSelect, onNext, answered]);

  return (
    <div className="mx-auto w-full max-w-2xl animate-rise">
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-sm font-semibold text-muted-foreground">
          <span>{format(t.test.questionOf, { current: index + 1, total })}</span>
          <span dir="ltr">{Math.round(((index + 1) / total) * 100)}%</span>
        </div>
        <Progress value={((index + 1) / total) * 100} className="h-2.5" />
      </div>

      <div className="rounded-3xl border-2 border-foreground/90 bg-card p-6 shadow-ink md:p-8">
        <p className="text-sm font-semibold text-muted-foreground">{t.test.instruction}</p>
        <h2 lang="en" dir="ltr" className="mt-3 text-start text-2xl font-bold leading-snug text-foreground md:text-3xl">
          {question.prompt}
        </h2>

        <div role="radiogroup" aria-label={t.test.instruction} className="mt-7 grid gap-3" dir="ltr">
          {options.map((option, i) => {
            const active = selected === option;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onSelect(option)}
                className={cn(
                  "flex items-center gap-4 rounded-2xl border-2 px-4 py-3.5 text-start text-lg font-semibold transition-all",
                  active
                    ? "border-primary bg-secondary text-secondary-foreground shadow-card"
                    : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-muted",
                )}
              >
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-xl text-sm font-extrabold",
                    active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                  )}
                >
                  {LETTERS[i]}
                </span>
                <span lang="en">{option}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onSelect(null)}
          aria-pressed={selected === null}
          className={cn(
            "mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
            selected === null ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted",
          )}
        >
          <HelpCircle className="size-4" aria-hidden />
          {t.test.dontKnow}
        </button>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <Button variant="ghost" size="lg" onClick={onBack} disabled={index === 0}>
          <ArrowLeft className="rtl:rotate-180" aria-hidden />
          {t.test.back}
        </Button>
        <Button variant="hero" size="lg" onClick={onNext} disabled={!answered}>
          {isLast ? t.test.finish : t.test.next}
          <ArrowRight className="rtl:rotate-180" aria-hidden />
        </Button>
      </div>
    </div>
  );
}
