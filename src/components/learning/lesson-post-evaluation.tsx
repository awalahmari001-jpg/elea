import { useState } from "react";
import {
  Award,
  Check,
  CheckCircle2,
  GraduationCap,
  RotateCcw,
  Sparkles,
  Target,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import type { Bilingual, LessonObjective, PostEvaluationQuestion } from "@/content/lesson-types";
import type { LessonSkill } from "@/content/lessons";
import { classifyAwareness, type AwarenessBand } from "@/lib/learner-storage";
import { learningRecord, type LessonStatus } from "@/lib/learning-record";
import { format, type Messages } from "@/lib/i18n/messages";
import { HighlightedText } from "./highlighted-text";

const AWARENESS_META: Record<
  AwarenessBand,
  {
    labelKey: keyof Messages["learning"];
    noteKey: keyof Messages["learning"];
    badgeClass: string;
  }
> = {
  mastery: {
    labelKey: "awarenessMastery",
    noteKey: "awarenessMasteryNote",
    badgeClass: "bg-success/15 text-success",
  },
  proficient: {
    labelKey: "awarenessProficient",
    noteKey: "awarenessProficientNote",
    badgeClass: "bg-primary/15 text-primary",
  },
  developing: {
    labelKey: "awarenessDeveloping",
    noteKey: "awarenessDevelopingNote",
    badgeClass: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  },
  review: {
    labelKey: "awarenessReview",
    noteKey: "awarenessReviewNote",
    badgeClass: "bg-destructive/15 text-destructive",
  },
};

export interface LessonPostEvaluationProps {
  objectives: LessonObjective[];
  questions: PostEvaluationQuestion[];
  keywords?: string[];
  lessonMeta?: {
    lessonId: string;
    course: string;
    skill: LessonSkill;
    title: Bilingual;
    unit?: Bilingual;
    minutes?: number;
  };
  onEvaluated?: (status: LessonStatus) => void;
}

/**
 * 10-MCQ Post-Lesson Evaluation Test placed at the end of EVERY lesson,
 * built directly from that lesson's 4 given Objectives and reporting mastery per Objective.
 */
export function LessonPostEvaluation({
  objectives,
  questions,
  keywords,
  lessonMeta,
  onEvaluated,
}: LessonPostEvaluationProps) {
  const { locale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const allAnswered = questions.length > 0 && answeredCount === questions.length;
  const score = questions.filter((q, idx) => answers[idx] === q.correct).length;
  const band = classifyAwareness(score, questions.length || 10);

  function startTest() {
    setOpen(true);
    setAnswers({});
    setSubmitted(false);
  }

  const objectiveBreakdown = objectives.map((obj) => {
    const mapped = questions
      .map((q, idx) => ({ q, idx }))
      .filter((entry) => entry.q.objectiveIndex === obj.index);
    const correctCount = mapped.filter((entry) => answers[entry.idx] === entry.q.correct).length;
    const mastered = mapped.length > 0 && correctCount / mapped.length >= 0.75;
    return { obj, total: mapped.length, correct: correctCount, mastered };
  });

  return (
    <section
      id="lesson-post-eval"
      className="border-t border-border py-10"
      aria-label={t.learning.lessonPostEvalTitle}
    >
      <div className="rounded-2xl border-2 border-primary/25 bg-card p-6 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow flex items-center gap-1.5 text-primary">
              <GraduationCap className="size-4" aria-hidden />
              {t.learning.lessonPostEvalEyebrow}
            </p>
            <h2 className="mt-1.5 text-2xl font-bold text-foreground">
              {t.learning.lessonPostEvalTitle}
            </h2>
            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {t.learning.lessonPostEvalSubtitle}
            </p>
          </div>
          {!open && (
            <Button type="button" onClick={startTest}>
              <Sparkles className="size-4" aria-hidden />
              {t.learning.startLessonPostEval}
            </Button>
          )}
        </div>

        {/* Compact Preview of the 4 Linked Objectives */}
        {!open && (
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {objectives.map((obj) => (
              <div
                key={obj.code}
                className="flex items-start gap-2 rounded-xl border border-border bg-muted/40 px-3.5 py-2.5 text-xs"
              >
                <Target className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
                <span>
                  <strong className="text-primary">{obj.code}:</strong> {obj.title[locale]}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Active 10-MCQ Objective-Aligned Runner */}
        {open && (
          <div className="mt-6 border-t border-border pt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold text-muted-foreground">
                {format(t.learning.answeredProgress, {
                  answered: answeredCount,
                  total: questions.length,
                })}
              </p>
              <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
                {t.learning.closeAssessment}
              </Button>
            </div>

            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted" dir="ltr">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${(answeredCount / Math.max(1, questions.length)) * 100}%` }}
              />
            </div>

            {/* Objective-by-Objective Mastery Report */}
            {submitted && (
              <div
                className="mt-6 rounded-2xl border border-primary/25 bg-secondary/40 p-5"
                role="status"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${AWARENESS_META[band].badgeClass}`}
                    >
                      <Award className="size-3.5" aria-hidden />
                      {t.learning[AWARENESS_META[band].labelKey]}
                    </span>
                    <p className="mt-2.5 text-3xl font-extrabold text-foreground" dir="ltr">
                      {score} / {questions.length}{" "}
                      <span className="text-lg font-semibold text-muted-foreground">
                        ({Math.round((score / Math.max(1, questions.length)) * 100)}%)
                      </span>
                    </p>
                  </div>
                  <Button type="button" variant="outline" onClick={startTest}>
                    <RotateCcw className="size-4" aria-hidden />
                    {t.learning.retakeAssessment}
                  </Button>
                </div>
                <p className="mt-2 text-sm text-foreground">
                  {t.learning[AWARENESS_META[band].noteKey]}
                </p>

                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t.learning.objectiveMasteryTitle}
                  </p>
                  <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
                    {objectiveBreakdown.map(({ obj, correct, total, mastered }) => (
                      <div
                        key={obj.code}
                        className="rounded-xl border border-border bg-card px-3.5 py-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-extrabold text-primary" dir="ltr">
                            {obj.code}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                              mastered
                                ? "bg-success/15 text-success"
                                : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                            }`}
                          >
                            {mastered
                              ? t.learning.objectiveMastered
                              : t.learning.objectiveNeedsReview}
                          </span>
                        </div>
                        <p className="mt-1 text-xs font-semibold text-foreground">
                          {obj.title[locale]}
                        </p>
                        <p className="mt-1 text-sm font-extrabold text-foreground" dir="ltr">
                          {correct} / {total}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 10 Objective-Mapped MCQs */}
            <div className="mt-6 space-y-5">
              {questions.map((q, idx) => {
                const picked = answers[idx];
                const isRight = submitted && picked === q.correct;
                return (
                  <fieldset
                    key={q.id}
                    className="rounded-xl border border-border bg-background p-4 md:p-5"
                  >
                    <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                        <Target className="size-3" aria-hidden />
                        {q.objectiveLabel[locale]}
                      </span>
                      <span className="font-mono text-xs font-bold text-muted-foreground" dir="ltr">
                        {idx + 1} / {questions.length}
                      </span>
                    </div>
                    <legend
                      className="max-w-full font-semibold leading-relaxed"
                      lang="en"
                      dir="ltr"
                    >
                      {idx + 1}.{" "}
                      <HighlightedText text={q.prompt} {...(keywords ? { keywords } : {})} />
                    </legend>
                    <div className="mt-3 grid gap-2">
                      {q.options.map((opt, optIdx) => (
                        <Button
                          key={opt}
                          type="button"
                          variant={picked === optIdx ? "secondary" : "outline"}
                          disabled={submitted}
                          aria-pressed={picked === optIdx}
                          lang="en"
                          dir="ltr"
                          className="h-auto min-h-11 justify-start whitespace-normal py-3 text-start"
                          onClick={() => setAnswers((prev) => ({ ...prev, [idx]: optIdx }))}
                        >
                          <span className="font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                          <span>
                            <HighlightedText text={opt} {...(keywords ? { keywords } : {})} />
                          </span>
                        </Button>
                      ))}
                    </div>
                    {submitted && (
                      <div className="mt-4 border-s-4 border-primary ps-4" role="status">
                        <p
                          className={
                            isRight
                              ? "flex items-center gap-1.5 font-semibold text-success"
                              : "flex items-center gap-1.5 font-semibold text-destructive"
                          }
                        >
                          {isRight ? (
                            <CheckCircle2 className="size-4 shrink-0" aria-hidden />
                          ) : (
                            <XCircle className="size-4 shrink-0" aria-hidden />
                          )}
                          <span>
                            {t.learning.answer}:{" "}
                            <span lang="en" dir="ltr">
                              <HighlightedText
                                text={q.options[q.correct] ?? ""}
                                {...(keywords ? { keywords } : {})}
                              />
                            </span>
                          </span>
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {locale === "en" ? (
                            <HighlightedText
                              text={q.explanation.en}
                              {...(keywords ? { keywords } : {})}
                            />
                          ) : (
                            q.explanation.ar
                          )}
                        </p>
                      </div>
                    )}
                  </fieldset>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
              {!submitted ? (
                <Button
                  type="button"
                  size="lg"
                  disabled={!allAnswered}
                  onClick={() => {
                    setSubmitted(true);
                    if (lessonMeta) {
                      const masteredCount = objectiveBreakdown.filter((b) => b.mastered).length;
                      const saved = learningRecord.recordLessonPostEval({
                        lessonId: lessonMeta.lessonId,
                        course: lessonMeta.course,
                        skill: lessonMeta.skill,
                        title: lessonMeta.title,
                        ...(lessonMeta.unit ? { unit: lessonMeta.unit } : {}),
                        ...(lessonMeta.minutes ? { minutes: lessonMeta.minutes } : {}),
                        score,
                        total: questions.length,
                        masteredObjectives: masteredCount,
                        totalObjectives: objectives.length,
                      });
                      onEvaluated?.(saved.status);
                    }
                  }}
                >
                  <Check className="size-4" aria-hidden />
                  {t.learning.submitAssessment}
                </Button>
              ) : (
                <Button type="button" variant="outline" onClick={startTest}>
                  <RotateCcw className="size-4" aria-hidden />
                  {t.learning.retakeAssessment}
                </Button>
              )}
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                {t.learning.closeAssessment}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
