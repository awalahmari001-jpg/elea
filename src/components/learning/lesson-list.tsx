import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { format } from "@/lib/i18n/messages";
import type { Lesson } from "@/content/lessons";

export interface LessonListProps {
  lessons: Lesson[];
}
export function LessonList({ lessons }: LessonListProps) {
  const { t, locale } = useI18n();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {lessons.map((lesson, i) => (
        <article
          key={lesson.id}
          className="flex flex-col rounded-lg border border-border bg-card p-6"
        >
          <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <BookOpen className="size-4" aria-hidden />
              {t.learning[lesson.skill]}
            </span>
            <span className="font-semibold" dir="ltr">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="mt-4 text-xl font-bold">{lesson.title[locale]}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {lesson.goal[locale]}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" aria-hidden />
              {format(t.learning.minutes, { count: lesson.minutes })}
            </span>
            <Button asChild variant="secondary">
              <Link to="/lessons/$lesson" params={{ lesson: lesson.id }}>
                {t.learning.practice}
                <ArrowRight className="rtl:rotate-180" aria-hidden />
              </Link>
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
