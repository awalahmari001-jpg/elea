import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { format } from "@/lib/i18n/messages";
import { isLessonFree } from "@/lib/lesson-access";
import type { Lesson } from "@/content/lessons";

export interface LessonListProps {
  lessons: Lesson[];
  /** Ids of lessons locked until the learner joins the course. */
  lockedIds?: Set<string>;
}
export function LessonList({ lessons, lockedIds }: LessonListProps) {
  const { t, locale } = useI18n();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {lessons.map((lesson, i) => {
        const locked = lockedIds?.has(lesson.id) ?? false;
        return (
          <article
            key={lesson.id}
            className="flex flex-col rounded-lg border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <BookOpen className="size-4" aria-hidden />
                {t.learning[lesson.skill]}
              </span>
              <span className="flex items-center gap-2">
                {locked ? (
                  <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                    <Lock className="size-3" aria-hidden />
                    {t.learning.locked}
                  </span>
                ) : isLessonFree(lesson) ? (
                  <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-foreground">
                    {t.learning.freeLesson}
                  </span>
                ) : null}
                <span className="font-semibold" dir="ltr">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
            </div>
            {lesson.unit && (
              <p className="mt-3 text-xs font-semibold text-primary">{lesson.unit[locale]}</p>
            )}
            <h3 className="mt-2 text-xl font-bold">{lesson.title[locale]}</h3>
            {lesson.isReadingPassage && (
              <span className="mt-2 self-start rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                {t.learning.readingPassageBadge}
              </span>
            )}
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {lesson.goal[locale]}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3" aria-hidden />
                {format(t.learning.minutes, { count: lesson.minutes })}
              </span>
              <Button asChild variant={locked ? "outline" : "secondary"}>
                <Link to="/lessons/$lesson" params={{ lesson: lesson.id }}>
                  {locked ? (
                    <Lock aria-hidden />
                  ) : (
                    <ArrowRight className="rtl:rotate-180" aria-hidden />
                  )}
                  {locked ? t.learning.locked : t.learning.practice}
                </Link>
              </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
