import { useNavigate } from "@tanstack/react-router";
import { BookOpenCheck, Check, Mic, RotateCcw, Sparkles, ThumbsUp, Target } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/courses/course-card";
import { LevelBadge } from "@/components/courses/level-badge";
import { useI18n } from "@/components/i18n-provider";
import { ALL_COURSES, CEFR_LEVELS, SPEAKING_COURSE, getCourse } from "@/content/courses";
import { useLearner } from "@/hooks/use-learner";
import { format } from "@/lib/i18n/messages";
import { QUESTIONS_PER_LEVEL, finalLevel, type PlacementResult } from "@/lib/placement";

export function ResultView({
  result,
  aiFailed,
  onRetake,
  onReview,
}: {
  result: PlacementResult;
  aiFailed: boolean;
  onRetake: () => void;
  onReview: (() => void) | null;
}) {
  const { t, locale } = useI18n();
  const navigate = useNavigate();
  const { hasJoined, joinCourse } = useLearner();
  const level = finalLevel(result);
  const course = getCourse(level);
  const ai = result.ai;

  function join(slug: typeof course.slug, label: string) {
    joinCourse(slug);
    toast.success(format(t.courses.joinedToast, { level: label }));
    void navigate({ to: "/courses/$level", params: { level: slug } });
  }

  return (
    <div className="mx-auto w-full max-w-5xl animate-rise space-y-10">
      {/* Headline result */}
      <section className="grid items-center gap-8 rounded-3xl border-2 border-foreground/90 bg-card p-6 shadow-ink md:grid-cols-[auto_1fr] md:p-10">
        <LevelBadge course={course} size="xl" className="mx-auto" />
        <div className="text-center md:text-start">
          <p className="eyebrow text-primary">{t.test.resultEyebrow}</p>
          <h1 className="display-heading mt-2 text-3xl text-foreground md:text-5xl">
            {t.test.resultTitle} <span dir="ltr">{level}</span>
            <span className="block text-2xl text-primary md:text-3xl">{course.name[locale]}</span>
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {format(t.test.score, { score: result.total, total: result.outOf })}
          </p>
          {ai?.writingLevel && (
            <p className="mt-1 text-sm font-semibold text-muted-foreground">
              {t.test.writingLevelLabel}: <span dir="ltr">{ai.writingLevel}</span>
            </p>
          )}
          <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
            <Button variant="hero" size="xl" onClick={() => join(course.slug, level)} disabled={hasJoined(course.slug)}>
              {hasJoined(course.slug) ? <Check aria-hidden /> : <BookOpenCheck aria-hidden />}
              {hasJoined(course.slug) ? t.courses.joined : format(t.test.join, { level })}
            </Button>
            {onReview && (
              <Button variant="outline" size="xl" onClick={onReview}>
                {t.test.reviewAnswers}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* AI feedback */}
      {ai ? (
        <section className="rounded-3xl bg-inverse p-6 text-inverse-foreground md:p-10">
          <h2 className="inline-flex items-center gap-2 text-xl font-extrabold">
            <Sparkles className="size-5 text-accent" aria-hidden />
            {t.test.aiTitle}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-inverse-foreground/90">{ai.summary[locale]}</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {[
              { title: t.test.strengths, items: ai.strengths, Icon: ThumbsUp },
              { title: t.test.improvements, items: ai.improvements, Icon: Target },
            ].map(({ title, items, Icon }) => (
              <div key={title} className="rounded-2xl bg-inverse-foreground/5 p-5">
                <h3 className="inline-flex items-center gap-2 font-bold text-accent">
                  <Icon className="size-4" aria-hidden />
                  {title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {items.map((item) => (
                    <li key={item.en} className="flex gap-2 text-inverse-foreground/90">
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                      {item[locale]}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : (
        aiFailed && (
          <p className="rounded-2xl bg-muted p-4 text-center text-sm text-muted-foreground">{t.test.aiUnavailable}</p>
        )
      )}

      {/* Speaking course suggestion */}
      {ai?.recommendSpeaking && (
        <section className="flex flex-col gap-5 rounded-3xl border-2 border-primary bg-secondary p-6 md:flex-row md:items-center md:p-8">
          <LevelBadge course={SPEAKING_COURSE} size="lg" />
          <div className="flex-1">
            <h2 className="text-xl font-extrabold text-secondary-foreground">{t.test.speakingRecommended}</h2>
            <p className="mt-1 text-secondary-foreground/80">{ai.speakingReason[locale]}</p>
          </div>
          <Button
            variant="hero"
            size="lg"
            onClick={() => join(SPEAKING_COURSE.slug, SPEAKING_COURSE.name[locale])}
            disabled={hasJoined(SPEAKING_COURSE.slug)}
          >
            {hasJoined(SPEAKING_COURSE.slug) ? <Check aria-hidden /> : <Mic aria-hidden />}
            {hasJoined(SPEAKING_COURSE.slug) ? t.courses.joined : t.courses.join}
          </Button>
        </section>
      )}

      {/* Breakdown */}
      <section>
        <h2 className="text-xl font-extrabold text-foreground">{t.test.breakdown}</h2>
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6" dir="ltr">
          {CEFR_LEVELS.map((l) => {
            const correct = result.byLevel[l] ?? 0;
            const pct = (correct / QUESTIONS_PER_LEVEL) * 100;
            return (
              <div key={l} className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-3">
                <div className="relative flex h-28 w-8 items-end overflow-hidden rounded-full bg-muted">
                  <div
                    className={l === level ? "w-full rounded-full bg-accent" : "w-full rounded-full bg-primary"}
                    style={{ height: `${Math.max(pct, 4)}%` }}
                  />
                </div>
                <span className="font-extrabold text-foreground">{l}</span>
                <span className="text-xs text-muted-foreground">
                  {correct}/{QUESTIONS_PER_LEVEL}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Choose another course */}
      <section>
        <h2 className="text-xl font-extrabold text-foreground">{t.test.chooseOther}</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_COURSES.map((c) => (
            <CourseCard
              key={c.slug}
              course={c}
              recommended={c.slug === course.slug || (c.kind === "skill" && Boolean(ai?.recommendSpeaking))}
              joined={hasJoined(c.slug)}
            />
          ))}
        </div>
      </section>

      <div className="flex justify-center">
        <Button variant="ghost" size="lg" onClick={onRetake}>
          <RotateCcw aria-hidden />
          {t.test.retake}
        </Button>
      </div>
    </div>
  );
}
