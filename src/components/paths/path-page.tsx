import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { LEARNING_PATHS, getPath, type PathId } from "@/content/paths";
import { courseLessons } from "@/content/lessons";
import { LessonList } from "@/components/learning/lesson-list";
import { CourseAssessmentPanel } from "@/components/learning/course-assessment-panel";
import { useI18n } from "@/components/i18n-provider";
import { useLearner } from "@/hooks/use-learner";
import { lockedLessonIds } from "@/lib/lesson-access";
import { cn } from "@/lib/utils";

/** Shared page layout for the Kids, Adults and IELTS paths. */
export function PathPage({ pathId }: { pathId: PathId }) {
  const { t, locale } = useI18n();
  const { courses, hasJoined, joinCourse } = useLearner();
  const joined = hasJoined(pathId);
  const path = getPath(pathId);
  const isKids = path.theme === "kids";
  const others = LEARNING_PATHS.filter((p) => p.id !== pathId);
  const lessons = courseLessons(pathId);

  return (
    <div className={cn(isKids && "theme-kids")}>
      <section className="bg-hero">
        <div className="container-page grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1fr_0.9fr]">
          <div className="animate-rise space-y-5">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden />
              {t.pathPage.backHome}
            </Link>
            <span className="eyebrow block text-primary">{path.audience[locale]}</span>
            <h1
              className={cn(
                "display-heading text-foreground",
                isKids ? "text-5xl md:text-7xl" : "text-4xl md:text-6xl",
              )}
            >
              {path.name[locale]}
            </h1>
            <p className="text-2xl font-bold text-primary">{path.tagline[locale]}</p>
            <p className="max-w-xl text-lg text-muted-foreground">{path.description[locale]}</p>
            <Button
              variant="hero"
              size="lg"
              className="mt-2"
              disabled={joined}
              onClick={() => {
                joinCourse(pathId);
                toast.success(t.learning.joinedUnlock);
              }}
            >
              {joined && <Check aria-hidden />}
              {joined ? t.courses.joined : t.learning.joinToUnlock}
            </Button>
          </div>
          <img
            src={path.image}
            alt=""
            className="w-full animate-rise rounded-3xl border-2 border-foreground/90 object-cover shadow-ink [animation-delay:120ms]"
          />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-page">
          <h2 className="display-heading text-3xl text-foreground md:text-4xl">
            {t.pathPage.levelsTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">{t.pathPage.levelsSubtitle}</p>

          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {path.levels.map((level, i) => (
              <li
                key={level.key}
                className="flex flex-col rounded-3xl border border-border bg-card p-7 shadow-card"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-11 place-items-center rounded-full bg-primary text-lg font-extrabold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span
                    dir="ltr"
                    className="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-foreground"
                  >
                    {level.range}
                  </span>
                </div>
                <h3
                  className={cn(
                    "mt-5 font-extrabold text-foreground",
                    isKids ? "text-3xl" : "text-2xl",
                  )}
                >
                  {t.levels[level.key]}
                </h3>
                <p className="eyebrow mt-5 text-muted-foreground">{t.pathPage.whatYouLearn}</p>
                <ul className="mt-3 space-y-2.5">
                  {level.goals.map((goal) => (
                    <li key={goal.en} className="flex items-start gap-2.5">
                      <Check className="mt-1 size-4 shrink-0 text-success" aria-hidden />
                      <span className={cn(isKids && "text-lg")}>{goal[locale]}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container-page">
          <h2 className="display-heading text-3xl text-foreground md:text-4xl">
            {t.pathPage.lessonsTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">{t.pathPage.lessonsSubtitle}</p>
          <div className="mt-10">
            <LessonList lessons={lessons} lockedIds={lockedLessonIds(lessons, courses)} />
          </div>
        </div>
      </section>

      <CourseAssessmentPanel course={pathId} />

      <section className="pb-20 pt-10">
        <div className="container-page">
          <h2 className="eyebrow text-muted-foreground">{t.pathPage.otherPaths}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {others.map((p) => (
              <Link
                key={p.id}
                to={p.to}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  className="size-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <p className="text-lg font-bold text-foreground">{p.name[locale]}</p>
                  <p className="text-sm text-muted-foreground">{p.tagline[locale]}</p>
                </div>
                <ArrowRight
                  className="size-5 text-primary transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
