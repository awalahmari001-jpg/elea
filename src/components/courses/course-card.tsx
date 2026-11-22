import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles } from "lucide-react";

import type { Course } from "@/content/courses";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";
import { LevelBadge } from "./level-badge";

export function stageLabel(t: ReturnType<typeof useI18n>["t"], stage: Course["stage"]) {
  if (stage === "basic") return t.courses.stageBasic;
  if (stage === "independent") return t.courses.stageIndependent;
  if (stage === "proficient") return t.courses.stageProficient;
  return t.courses.stageSkill;
}

/** A selectable course card linking to the course page. */
export function CourseCard({
  course,
  recommended = false,
  joined = false,
}: {
  course: Course;
  recommended?: boolean;
  joined?: boolean;
}) {
  const { t, locale } = useI18n();
  return (
    <Link
      to="/courses/$level"
      params={{ level: course.slug }}
      className={cn(
        "group relative flex flex-col gap-4 rounded-3xl border-2 bg-card p-6 text-card-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-ink",
        recommended || joined ? "border-primary" : "border-foreground/90",
      )}
    >
      {(recommended || joined) && (
        <span className="absolute -top-3 end-5 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-card">
          {joined ? <Check className="size-3.5" aria-hidden /> : <Sparkles className="size-3.5" aria-hidden />}
          {joined ? t.courses.yourCourse : t.courses.recommended}
        </span>
      )}
      <div className="flex items-center gap-4">
        <LevelBadge course={course} />
        <div>
          <h3 className="text-xl font-extrabold text-foreground">{course.name[locale]}</h3>
          <p className="text-sm font-semibold text-muted-foreground">
            {stageLabel(t, course.stage)}
            {course.suitsLevels && (
              <span dir="ltr" className="ms-1 opacity-80">
                · {course.suitsLevels}
              </span>
            )}
          </p>
        </div>
      </div>
      <p className="text-muted-foreground">{course.summary[locale]}</p>
      <span className="mt-auto inline-flex items-center gap-2 font-bold text-primary">
        {t.courses.view}
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          aria-hidden
        />
      </span>
    </Link>
  );
}
