import { useEffect, useState } from "react";
import {
  Award,
  Check,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  RotateCcw,
  Sparkles,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import type { LessonCourse } from "@/content/lesson-types";
import { getCourseAssessmentQuestions, type AssessmentFocus } from "@/content/course-assessments";
import {
  classifyAwareness,
  learnerStorage,
  type AssessmentKind,
  type AssessmentRecord,
  type AwarenessBand,
} from "@/lib/learner-storage";
import { format, type Messages } from "@/lib/i18n/messages";

const FOCUS_LABELS: Record<AssessmentFocus, keyof Messages["learning"]> = {
  grammar: "focusGrammar",
  reading: "focusReading",
  vocabulary: "focusVocabulary",
  "error-spotting": "focusErrorSpotting",
};

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

export interface CourseAssessmentPanelProps {
  course: LessonCourse;
}

export function CourseAssessmentPanel({ course }: CourseAssessmentPanelProps) {
  const { locale, t } = useI18n();
  const [activeKind, setActiveKind] = useState<AssessmentKind | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState<AssessmentRecord>({});

  useEffect(() => {
    const all = learnerStorage.getAssessments();
    setSaved(all[course] ?? {});
  }, [course]);

  const questions = activeKind ? getCourseAssessmentQuestions(course, activeKind) : [];
  const answeredCount = Object.keys(answers).length;
  const allAnswered = questions.length === 10 && answeredCount === questions.length;
  const score = questions.filter((q, idx) => answers[idx] === q.correct).length;
  const band = classifyAwareness(score, questions.length || 10);

  function startAssessment(kind: AssessmentKind) {
    setActiveKind(kind);
    setAnswers({});
    setSubmitted(false);
  }

  function handleSubmit() {
    if (!activeKind || !allAnswered) return;
    setSubmitted(true);
    const updated = learnerStorage.saveAssessment(course, activeKind, score, questions.length);
    setSaved(updated[course] ?? {});
  }

  // Group breakdown by focus area
  const breakdown = (["grammar", "reading", "vocabulary", "error-spotting"] as AssessmentFocus[])
    .map((focus) => {
      const items = questions
        .map((q, idx) => ({ q, idx }))
        .filter((entry) => entry.q.focus === focus);
      const correctInFocus = items.filter((entry) => answers[entry.idx] === entry.q.correct).length;
      return { focus, total: items.length, correct: correctInFocus };
    })
    .filter((b) => b.total > 0);

  return (
    <section id="assessments" className="border-t border-border bg-muted/30 py-14">
      <div className="container-page">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow flex items-center gap-1.5 text-primary">
              <GraduationCap className="size-4" aria-hidden />
              {t.learning.assessmentsEyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-foreground">
              {t.learning.assessmentsTitle}
            </h2>
            <p className="mt-2 max-w-3xl text-base text-muted-foreground">
              {t.learning.assessmentsSubtitle}
            </p>
          </div>
          {saved.summative && saved.post && (
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-4 py-2 text-xs font-bold text-primary shadow-xs">
              <TrendingUp className="size-4" aria-hidden />
              <span>
                {format(t.learning.growthSummary, {
                  summative: saved.summative.score,
                  post: saved.post.score,
                })}
              </span>
            </div>
          )}
        </div>

        {/* Overview Cards (Summative + Post-Test) */}
        {!activeKind && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {(["summative", "post"] as const).map((kind) => {
              const attempt = saved[kind];
              const isSummative = kind === "summative";
              const meta = attempt ? AWARENESS_META[attempt.awarenessBand] : null;
              return (
                <article
                  key={kind}
                  className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                      {isSummative ? (
                        <ClipboardCheck className="size-3.5" aria-hidden />
                      ) : (
                        <Award className="size-3.5" aria-hidden />
                      )}
                      <span dir="ltr">10 MCQs</span>
                    </span>
                    {attempt && meta && (
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${meta.badgeClass}`}
                      >
                        {format(t.learning.lastScore, {
                          score: attempt.score,
                          total: attempt.total,
                        })}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 text-2xl font-bold text-foreground">
                    {isSummative ? t.learning.summativeTitle : t.learning.postTestTitle}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {isSummative ? t.learning.summativeDesc : t.learning.postTestDesc}
                  </p>

                  {attempt && meta && (
                    <p className="mt-4 rounded-xl bg-muted/60 px-3.5 py-2.5 text-xs font-semibold text-foreground">
                      {t.learning[meta.labelKey]}
                    </p>
                  )}

                  <div className="mt-6">
                    <Button
                      type="button"
                      variant={isSummative ? "default" : "secondary"}
                      className="w-full sm:w-auto"
                      onClick={() => startAssessment(kind)}
                    >
                      <Sparkles className="size-4" aria-hidden />
                      {isSummative ? t.learning.startSummative : t.learning.startPostTest}
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Active 10-MCQ Assessment Runner */}
        {activeKind && (
          <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-card md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  {activeKind === "summative"
                    ? t.learning.summativeTitle
                    : t.learning.postTestTitle}
                  {" · "}
                  <span dir="ltr">10 MCQs</span>
                </span>
                <p className="mt-2 text-sm font-semibold text-muted-foreground">
                  {format(t.learning.answeredProgress, {
                    answered: answeredCount,
                    total: questions.length,
                  })}
                </p>
              </div>
              <Button type="button" variant="ghost" onClick={() => setActiveKind(null)}>
                {t.learning.closeAssessment}
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted" dir="ltr">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${(answeredCount / Math.max(1, questions.length)) * 100}%` }}
              />
            </div>

            {/* Submitted Knowledge Awareness Report */}
            {submitted && (
              <div
                className="mt-6 rounded-2xl border border-primary/25 bg-secondary/40 p-6"
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
                    <p className="mt-3 text-3xl font-extrabold text-foreground" dir="ltr">
                      {score} / {questions.length}{" "}
                      <span className="text-lg font-semibold text-muted-foreground">
                        ({Math.round((score / questions.length) * 100)}%)
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => startAssessment(activeKind)}
                    >
                      <RotateCcw className="size-4" aria-hidden />
                      {t.learning.retakeAssessment}
                    </Button>
                    {activeKind === "summative" && (
                      <Button type="button" onClick={() => startAssessment("post")}>
                        <Sparkles className="size-4" aria-hidden />
                        {t.learning.switchToPostTest}
                      </Button>
                    )}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  {t.learning[AWARENESS_META[band].noteKey]}
                </p>

                {/* Skill Awareness Breakdown */}
                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t.learning.skillBreakdown}
                  </p>
                  <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                    {breakdown.map((b) => (
                      <div
                        key={b.focus}
                        className="rounded-xl border border-border bg-card px-3.5 py-2.5"
                      >
                        <p className="text-xs font-semibold text-muted-foreground">
                          {t.learning[FOCUS_LABELS[b.focus]]}
                        </p>
                        <p className="mt-1 text-base font-extrabold text-foreground" dir="ltr">
                          {b.correct} / {b.total}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 10 Multiple-Choice Questions */}
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
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-bold text-secondary-foreground">
                        {t.learning[FOCUS_LABELS[q.focus]]}
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
                      {idx + 1}. {q.prompt}
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
                          {opt}
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
                              {q.options[q.correct]}
                            </span>
                          </span>
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {q.explanation[locale]}
                        </p>
                      </div>
                    )}
                  </fieldset>
                );
              })}
            </div>

            {/* Submit / Retake Footer */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
              {!submitted ? (
                <Button type="button" size="lg" disabled={!allAnswered} onClick={handleSubmit}>
                  <Check className="size-4" aria-hidden />
                  {t.learning.submitAssessment}
                </Button>
              ) : (
                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => startAssessment(activeKind)}
                  >
                    <RotateCcw className="size-4" aria-hidden />
                    {t.learning.retakeAssessment}
                  </Button>
                  {activeKind === "summative" && (
                    <Button type="button" onClick={() => startAssessment("post")}>
                      <Sparkles className="size-4" aria-hidden />
                      {t.learning.switchToPostTest}
                    </Button>
                  )}
                </div>
              )}
              <Button type="button" variant="ghost" onClick={() => setActiveKind(null)}>
                {t.learning.closeAssessment}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
