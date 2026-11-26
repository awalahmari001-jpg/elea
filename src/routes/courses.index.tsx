import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/courses/course-card";
import { useI18n } from "@/components/i18n-provider";
import { COURSES, SPEAKING_COURSE } from "@/content/courses";
import { useLearner } from "@/hooks/use-learner";
import { pageMeta } from "@/lib/i18n/head";
import { finalLevel } from "@/lib/placement";
import { rbacStore, type CustomCourse } from "@/lib/rbac-store";

export const Route = createFileRoute("/courses/")({
  head: ({ match }) => pageMeta(match.context.locale, "courses"),
  component: CoursesPage,
});

function CoursesPage() {
  const { t, locale } = useI18n();
  const { result, hasJoined } = useLearner();
  const recommended = result ? finalLevel(result) : null;
  const [publishedCustom, setPublishedCustom] = useState<CustomCourse[]>([]);

  useEffect(() => {
    setPublishedCustom(rbacStore.getPublishedCustomCourses());
  }, []);

  return (
    <>
      <section className="bg-hero">
        <div className="container-page flex flex-col items-start gap-6 py-14 md:flex-row md:items-end md:justify-between md:py-20">
          <div className="max-w-2xl animate-rise">
            <p className="eyebrow text-primary">{t.courses.eyebrow}</p>
            <h1 className="display-heading mt-3 text-4xl text-foreground md:text-6xl">
              {t.courses.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{t.courses.subtitle}</p>
          </div>
          <Button asChild variant="accent" size="xl">
            <Link to="/level-test">
              <ClipboardCheck aria-hidden />
              {t.courses.takeTest}
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course) => (
            <CourseCard
              key={course.slug}
              course={course}
              recommended={course.level === recommended}
              joined={hasJoined(course.slug)}
            />
          ))}
        </div>
      </section>

      <section className="pb-16">
        <div className="container-page">
          <h2 className="display-heading text-3xl text-foreground">{t.courses.skillsTitle}</h2>
          <p className="mt-2 text-muted-foreground">{t.courses.skillsSubtitle}</p>
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            <CourseCard
              course={SPEAKING_COURSE}
              recommended={Boolean(result?.ai?.recommendSpeaking)}
              joined={hasJoined(SPEAKING_COURSE.slug)}
            />
          </div>
        </div>
      </section>

      {publishedCustom.length > 0 && (
        <section className="border-t border-border/70 bg-secondary/20 py-14">
          <div className="container-page space-y-6">
            <div>
              <p className="eyebrow flex items-center gap-1.5 text-primary">
                <Sparkles className="size-3.5" aria-hidden />
                {t.admin.publishedAcademyEyebrow}
              </p>
              <h2 className="display-heading mt-2 text-2xl text-foreground md:text-3xl">
                {t.admin.publishedAcademyHeading}
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {publishedCustom.map((course) => (
                <article
                  key={course.id}
                  className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="secondary" dir="ltr">
                        CEFR {course.level}
                      </Badge>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {course.authorName}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{course.title[locale]}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {course.description[locale]}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-xs font-semibold text-primary">
                    <span>
                      {course.lessons.length}{" "}
                      {locale === "ar" ? "درس منشور" : "published lesson(s)"}
                    </span>
                    <Link
                      to="/courses/$level"
                      params={{ level: course.level.toLowerCase() }}
                      className="underline-offset-4 hover:underline"
                    >
                      {t.courses.view}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
