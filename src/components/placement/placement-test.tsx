import { useCallback, useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, ClipboardCheck, Loader2, Play, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { getCourse } from "@/content/courses";
import { useLearner } from "@/hooks/use-learner";
import { learnerStorage, type PlacementProgress } from "@/lib/learner-storage";
import {
  TEST_LENGTH,
  drawTest,
  finalLevel,
  isValidTest,
  questionsFor,
  scorePlacement,
  type PlacementAnswers,
} from "@/lib/placement";
import { assessPlacement } from "@/lib/placement-ai.functions";
import { AnswerReview } from "./answer-review";
import { QuestionCard } from "./question-card";
import { ResultView } from "./result-view";
import { WritingStep } from "./writing-step";

type Phase = "intro" | "quiz" | "writing" | "assessing" | "result" | "review";

/**
 * The whole level-test flow:
 * intro → 60 questions → optional writing sample → AI assessment → result → answer review.
 * Progress is saved in the browser after every answer.
 */
export function PlacementTest() {
  const { t, locale } = useI18n();
  const { ready, result, saveResult } = useLearner();
  const assess = useServerFn(assessPlacement);

  const [phase, setPhase] = useState<Phase>("intro");
  const [progress, setProgress] = useState<PlacementProgress | null>(null);
  const [aiFailed, setAiFailed] = useState(false);
  const [review, setReview] = useState(() => null as ReturnType<typeof learnerStorage.getReview>);

  useEffect(() => {
    const saved = learnerStorage.getProgress();
    if (saved && isValidTest(saved.questionIds)) setProgress(saved);
    setReview(learnerStorage.getReview());
  }, []);

  const questions = useMemo(() => (progress ? questionsFor(progress.questionIds) : []), [progress]);

  const save = useCallback((next: PlacementProgress) => {
    setProgress(next);
    learnerStorage.setProgress(next);
  }, []);

  function start() {
    save({ questionIds: drawTest(), index: 0, answers: {} });
    setPhase("quiz");
    window.scrollTo({ top: 0 });
  }

  const current = progress ? questions[progress.index] : undefined;

  const select = useCallback(
    (value: string | null) => {
      if (!progress || !current) return;
      save({ ...progress, answers: { ...progress.answers, [current.id]: value } });
    },
    [progress, current, save],
  );

  const next = useCallback(() => {
    if (!progress) return;
    if (progress.index >= TEST_LENGTH - 1) setPhase("writing");
    else save({ ...progress, index: progress.index + 1 });
    window.scrollTo({ top: 0 });
  }, [progress, save]);

  const back = useCallback(() => {
    if (progress && progress.index > 0) save({ ...progress, index: progress.index - 1 });
  }, [progress, save]);

  async function submit(writing: string, speakingConfidence: number | null) {
    if (!progress) return;
    setPhase("assessing");
    window.scrollTo({ top: 0 });
    const reviewData = { questionIds: progress.questionIds, answers: progress.answers };
    try {
      const res = await assess({
        data: {
          questionIds: progress.questionIds,
          answers: progress.answers,
          writing,
          speakingConfidence,
        },
      });
      saveResult(res.result);
      setAiFailed(res.aiError !== null);
    } catch (error) {
      console.error(error);
      toast.error(t.test.submitError);
      // Still show a result based on the score alone.
      saveResult(scorePlacement(questions, progress.answers));
      setAiFailed(true);
    }
    learnerStorage.setReview(reviewData);
    setReview(reviewData);
    learnerStorage.setProgress(null);
    setProgress(null);
    setPhase("result");
  }

  function retake() {
    learnerStorage.setProgress(null);
    setProgress(null);
    start();
  }

  if (phase === "quiz" && progress && current) {
    return (
      <QuestionCard
        key={current.id}
        question={current}
        index={progress.index}
        total={TEST_LENGTH}
        selected={progress.answers[current.id]}
        answered={current.id in progress.answers}
        onSelect={select}
        onBack={back}
        onNext={next}
      />
    );
  }

  if (phase === "writing") return <WritingStep onSubmit={submit} />;

  if (phase === "assessing") {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-20 text-center" role="status">
        <Loader2 className="size-12 animate-spin text-primary" aria-hidden />
        <p className="text-xl font-bold text-foreground">{t.test.assessing}</p>
        <p className="text-muted-foreground">{t.test.assessingHint}</p>
      </div>
    );
  }

  if (phase === "result" && result) {
    return (
      <ResultView
        result={result}
        aiFailed={aiFailed}
        onRetake={retake}
        onReview={review ? () => setPhase("review") : null}
      />
    );
  }

  if (phase === "review" && review) {
    return (
      <AnswerReview
        questions={questionsFor(review.questionIds)}
        answers={review.answers}
        onBack={() => setPhase("result")}
      />
    );
  }

  // ---------- Intro ----------
  const facts = [
    { value: "60", label: t.test.factQuestions },
    { value: "30", label: t.test.factMinutes },
    { value: "6", label: t.test.factLevels },
  ];
  const hasProgress = Boolean(progress && Object.keys(progress.answers).length > 0);

  return (
    <div className="mx-auto grid w-full max-w-5xl animate-rise gap-8 lg:grid-cols-[1.3fr_1fr]">
      <div className="rounded-3xl border-2 border-foreground/90 bg-card p-6 shadow-ink md:p-10">
        <span className="eyebrow inline-flex items-center gap-2 text-primary">
          <ClipboardCheck className="size-4" aria-hidden />
          {t.test.eyebrow}
        </span>
        <h1 className="display-heading mt-3 text-4xl text-foreground md:text-5xl">{t.test.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t.test.intro}</p>

        <dl className="mt-6 grid grid-cols-3 gap-3">
          {facts.map((f) => (
            <div key={f.label} className="rounded-2xl bg-secondary p-4 text-center">
              <dd className="text-3xl font-extrabold text-primary">{f.value}</dd>
              <dt className="text-xs font-semibold text-secondary-foreground">{f.label}</dt>
            </div>
          ))}
        </dl>

        <ul className="mt-6 space-y-2.5">
          {[t.test.tip1, t.test.tip2, t.test.tip3].map((tip) => (
            <li key={tip} className="flex gap-2.5">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
              <span className="text-foreground">{tip}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">{t.test.bankNote}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {hasProgress ? (
            <>
              <Button variant="hero" size="xl" onClick={() => setPhase("quiz")}>
                <Play aria-hidden />
                {t.test.resume}
              </Button>
              <Button variant="outline" size="xl" onClick={retake}>
                <RotateCcw aria-hidden />
                {t.test.restart}
              </Button>
            </>
          ) : (
            <Button variant="hero" size="xl" onClick={start} disabled={!ready}>
              <Play aria-hidden />
              {t.test.start}
            </Button>
          )}
        </div>
      </div>

      {result && (
        <aside className="h-fit rounded-3xl bg-inverse p-6 text-inverse-foreground md:p-8">
          <p className="eyebrow text-accent">{t.test.previousResult}</p>
          <p className="mt-3 text-6xl font-extrabold" dir="ltr">
            {finalLevel(result)}
          </p>
          <p className="mt-1 text-lg font-semibold">{getCourse(finalLevel(result)).name[locale]}</p>
          <p className="mt-2 text-sm text-inverse-muted" dir="ltr">
            {result.total}/{result.outOf}
          </p>
          <Button variant="accent" className="mt-6" onClick={() => setPhase("result")}>
            {t.test.resultEyebrow}
          </Button>
        </aside>
      )}
    </div>
  );
}
