import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Lightbulb, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import type { PlacementQuestion } from "@/content/placement-questions";
import type { PlacementAnswers } from "@/lib/placement";
import { cn } from "@/lib/utils";

/** Every question with the learner's answer, the correct answer and why it's right. */
export function AnswerReview({
  questions,
  answers,
  onBack,
}: {
  questions: PlacementQuestion[];
  answers: PlacementAnswers;
  onBack: () => void;
}) {
  const { t, locale } = useI18n();
  const [filter, setFilter] = useState<"all" | "wrong">("all");
  const rows = useMemo(
    () =>
      questions
        .map((q, i) => ({ q, n: i + 1, answer: answers[q.id], correct: answers[q.id] === q.options[0] }))
        .filter((r) => filter === "all" || !r.correct),
    [questions, answers, filter],
  );

  return (
    <div className="mx-auto w-full max-w-3xl animate-rise">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="rtl:rotate-180" aria-hidden />
        {t.test.backToResult}
      </Button>
      <h1 className="display-heading text-3xl text-foreground md:text-4xl">{t.test.reviewTitle}</h1>
      <p className="mt-2 text-muted-foreground">{t.test.reviewSubtitle}</p>

      <div role="group" className="mt-6 inline-flex rounded-full border border-border bg-muted p-1">
        {(["all", "wrong"] as const).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-bold transition-colors",
              filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {f === "all" ? t.test.filterAll : t.test.filterWrong}
          </button>
        ))}
      </div>

      <ol className="mt-6 space-y-4">
        {rows.map(({ q, n, answer, correct }) => (
          <li key={q.id} className="rounded-3xl border border-border bg-card p-5 shadow-card md:p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-bold text-muted-foreground">#{n}</span>
              <span dir="ltr" className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
                {q.level} · {q.focus}
              </span>
            </div>
            <p lang="en" dir="ltr" className="mt-3 text-start text-lg font-bold text-foreground">
              {q.prompt}
            </p>

            <dl className="mt-4 grid gap-2 sm:grid-cols-2">
              <div
                className={cn(
                  "flex items-start gap-2 rounded-2xl p-3",
                  correct ? "bg-success/10" : "bg-destructive/10",
                )}
              >
                {correct ? (
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
                ) : (
                  <XCircle className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden />
                )}
                <div>
                  <dt className="text-xs font-semibold text-muted-foreground">{t.test.yourAnswer}</dt>
                  <dd lang="en" className="font-bold text-foreground">
                    {answer ?? t.test.notAnswered}
                  </dd>
                </div>
              </div>
              {!correct && (
                <div className="flex items-start gap-2 rounded-2xl bg-success/10 p-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
                  <div>
                    <dt className="text-xs font-semibold text-muted-foreground">{t.test.correctAnswer}</dt>
                    <dd lang="en" className="font-bold text-foreground">
                      {q.options[0]}
                    </dd>
                  </div>
                </div>
              )}
            </dl>

            <div className="mt-4 flex gap-3 rounded-2xl bg-accent-soft p-4">
              <Lightbulb className="mt-0.5 size-5 shrink-0 text-foreground" aria-hidden />
              <div className="space-y-1.5">
                <p className="text-sm font-bold text-foreground">{t.test.whyCorrect}</p>
                <p className="text-foreground" lang={locale}>
                  {q.explanation[locale]}
                </p>
                {locale === "ar" && (
                  <p lang="en" dir="ltr" className="text-start text-sm text-muted-foreground">
                    {q.explanation.en}
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
