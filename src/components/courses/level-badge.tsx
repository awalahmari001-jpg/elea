import { Mic } from "lucide-react";

import type { Course } from "@/content/courses";
import { cn } from "@/lib/utils";

const STAGE_STYLES: Record<Course["stage"], string> = {
  basic: "bg-secondary text-secondary-foreground",
  independent: "bg-accent text-accent-foreground",
  proficient: "bg-inverse text-inverse-foreground",
  skill: "bg-primary text-primary-foreground",
};

/** Big "A1" / "B2" tile, colored by CEFR stage. */
export function LevelBadge({
  course,
  size = "md",
  className,
}: {
  course: Course;
  size?: "md" | "lg" | "xl";
  className?: string;
}) {
  return (
    <span
      dir="ltr"
      className={cn(
        "grid shrink-0 place-items-center font-extrabold tracking-tight",
        STAGE_STYLES[course.stage],
        size === "md" && "size-14 rounded-2xl text-xl",
        size === "lg" && "size-20 rounded-3xl text-3xl",
        size === "xl" && "size-32 rounded-[2rem] text-6xl shadow-lift md:size-40 md:text-7xl",
        className,
      )}
    >
      {course.kind === "skill" ? (
        <Mic
          aria-label={course.name.en}
          className={cn(size === "md" && "size-7", size === "lg" && "size-9", size === "xl" && "size-16")}
        />
      ) : (
        course.badge
      )}
    </span>
  );
}
