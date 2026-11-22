import { Link, createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/courses/course-card";
import { useI18n } from "@/components/i18n-provider";
import { COURSES, SPEAKING_COURSE } from "@/content/courses";
import { useLearner } from "@/hooks/use-learner";
import { pageMeta } from "@/lib/i18n/head";
import { finalLevel } from "@/lib/placement";

export const Route = createFileRoute("/courses/")({
  head: ({ match }) => pageMeta(match.context.locale, "courses"),
  component: CoursesPage,
});

function CoursesPage() {
  const { t } = useI18n();
  const { result, hasJoined } = useLearner();
  const recommended = result ? finalLevel(result) : null;

  return (
    <>
      <section className="bg-hero">
        <div className="container-page flex flex-col items-start gap-6 py-14 md:flex-row md:items-end md:justify-between md:py-20">
          <div className="max-w-2xl animate-rise">
            <p className="eyebrow text-primary">{t.courses.eyebrow}</p>
            <h1 className="display-heading mt-3 text-4xl text-foreground md:text-6xl">{t.courses.title}</h1>
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

      <section className="pb-20">
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
    </>
  );
}
