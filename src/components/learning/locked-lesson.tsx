import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { courseHome } from "@/lib/lesson-access";
import type { Lesson } from "@/content/lessons";

/** Shown instead of a lesson when the learner has not joined its course. */
export function LockedLesson({ lesson }: { lesson: Lesson }) {
  const { t, locale } = useI18n();
  const home = courseHome(lesson);
  return (
    <div className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-10 text-center shadow-card">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-muted">
          <Lock className="size-7 text-muted-foreground" aria-hidden />
        </span>
        <p className="eyebrow mt-6 text-primary">{t.learning.locked}</p>
        <h1 className="display-heading mt-2 text-3xl text-foreground">{lesson.title[locale]}</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">{t.learning.lockedBody}</p>
        <Button asChild variant="hero" size="lg" className="mt-8">
          {"params" in home ? (
            <Link to={home.to} params={home.params}>
              {t.learning.unlockCourse}
            </Link>
          ) : (
            <Link to={home.to}>{t.learning.unlockCourse}</Link>
          )}
        </Button>
      </div>
    </div>
  );
}
