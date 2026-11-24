import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock, Lock, Play, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/components/i18n-provider";
import { format } from "@/lib/i18n/messages";
import { isLessonFree } from "@/lib/lesson-access";
import { learningRecord, type LessonStatus } from "@/lib/learning-record";
import type { Lesson, LessonSkill } from "@/content/lessons";

export interface LessonListProps {
  lessons: Lesson[];
  /** Ids of lessons locked until the learner joins the course. */
  lockedIds?: Set<string>;
}

const STATUS_STYLE: Record<Exclude<LessonStatus, "not_started">, string> = {
  in_progress: "bg-primary/15 text-primary",
  completed: "bg-secondary text-secondary-foreground",
  mastered: "bg-success/15 text-success",
  requires_revision: "bg-destructive/15 text-destructive",
};

const SKILL_ORDER: readonly LessonSkill[] = [
  "grammar",
  "reading",
  "listening",
  "writing",
  "speaking",
];

const PAGE_SIZE = 18;

export function LessonList({ lessons, lockedIds }: LessonListProps) {
  const { t, locale } = useI18n();
  const [statuses, setStatuses] = useState<Record<string, LessonStatus>>({});
  const [selectedSkill, setSelectedSkill] = useState<LessonSkill | "all">("all");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const map = learningRecord.getLessonMap();
    const next: Record<string, LessonStatus> = {};
    for (const [id, rec] of Object.entries(map)) {
      next[id] = rec.status;
    }
    setStatuses(next);
  }, []);

  const skillCounts = useMemo(() => {
    const counts: Partial<Record<LessonSkill, number>> = {};
    for (const l of lessons) {
      counts[l.skill] = (counts[l.skill] ?? 0) + 1;
    }
    return counts;
  }, [lessons]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return lessons.filter((lesson) => {
      if (selectedSkill !== "all" && lesson.skill !== selectedSkill) return false;
      if (!q) return true;
      return (
        lesson.title.en.toLowerCase().includes(q) ||
        lesson.title.ar.toLowerCase().includes(q) ||
        lesson.goal.en.toLowerCase().includes(q) ||
        lesson.goal.ar.toLowerCase().includes(q) ||
        (lesson.unit?.en.toLowerCase().includes(q) ?? false)
      );
    });
  }, [lessons, selectedSkill, search]);

  const shownLessons = filtered.slice(0, visibleCount);
  const showControls = lessons.length > PAGE_SIZE;

  const statusLabel = (s: Exclude<LessonStatus, "not_started">) => {
    switch (s) {
      case "in_progress":
        return t.dashboard.statusInProgress;
      case "completed":
        return t.dashboard.statusCompleted;
      case "mastered":
        return t.dashboard.statusMastered;
      case "requires_revision":
        return t.dashboard.statusRequiresRevision;
    }
  };

  return (
    <div className="space-y-5">
      {showControls && (
        <div className="space-y-3 rounded-2xl border border-border bg-card/70 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5" role="group" aria-label={t.learning.lessons}>
              <Button
                type="button"
                size="sm"
                variant={selectedSkill === "all" ? "default" : "outline"}
                className="rounded-full text-xs font-bold"
                onClick={() => {
                  setSelectedSkill("all");
                  setVisibleCount(PAGE_SIZE);
                }}
              >
                {locale === "ar" ? `الكل (${lessons.length})` : `All (${lessons.length})`}
              </Button>
              {SKILL_ORDER.filter((s) => (skillCounts[s] ?? 0) > 0).map((skill) => (
                <Button
                  key={skill}
                  type="button"
                  size="sm"
                  variant={selectedSkill === skill ? "default" : "outline"}
                  className="rounded-full text-xs font-bold"
                  onClick={() => {
                    setSelectedSkill(skill);
                    setVisibleCount(PAGE_SIZE);
                  }}
                >
                  {t.learning[skill]} ({skillCounts[skill]})
                </Button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search
                className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                placeholder={locale === "ar" ? "ابحث في الدروس..." : "Search lessons..."}
                aria-label={locale === "ar" ? "ابحث في الدروس" : "Search lessons"}
                className="h-9 ps-9 text-xs"
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shownLessons.map((lesson, i) => {
          const locked = lockedIds?.has(lesson.id) ?? false;
          const st = statuses[lesson.id] ?? "not_started";
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
                  ) : st !== "not_started" ? (
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_STYLE[st]}`}
                    >
                      {statusLabel(st)}
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
              {(lesson.isReadingPassage || lesson.explainerVideo) && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {lesson.isReadingPassage && (
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                      {t.learning.readingPassageBadge}
                    </span>
                  )}
                  {lesson.explainerVideo && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      <Play className="size-3" aria-hidden />
                      {t.learning.videoBadge}
                    </span>
                  )}
                </div>
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

      {visibleCount < filtered.length && (
        <div className="flex flex-col items-center gap-2 pt-2">
          <p className="text-xs text-muted-foreground" dir="ltr">
            {locale === "ar"
              ? `عرض ${shownLessons.length} من ${filtered.length} درسًا`
              : `Showing ${shownLessons.length} of ${filtered.length} lessons`}
          </p>
          <Button
            type="button"
            variant="outline"
            className="rounded-full px-6 font-bold"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          >
            {locale === "ar"
              ? `عرض المزيد (+${Math.min(PAGE_SIZE, filtered.length - visibleCount)})`
              : `Load More Lessons (+${Math.min(PAGE_SIZE, filtered.length - visibleCount)})`}
          </Button>
        </div>
      )}
    </div>
  );
}
