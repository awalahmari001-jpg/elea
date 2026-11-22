import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, ClipboardCheck, Mic } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { stageLabel } from "@/components/courses/course-card";
import { LevelBadge } from "@/components/courses/level-badge";
import { useI18n } from "@/components/i18n-provider";
import { getCourseBySlug, isCourseSlug } from "@/content/courses";
import { useLearner } from "@/hooks/use-learner";
import { format, messages } from "@/lib/i18n/messages";
import { normalizeLocale } from "@/lib/i18n/config";
import { LessonList } from "@/components/learning/lesson-list";
import { courseLessons } from "@/content/lessons";

export const Route = createFileRoute("/courses/$level")({
  loader: ({ params }) => {
    if (!isCourseSlug(params.level)) throw notFound();
    return { slug: params.level };
  },
  head: ({ match, loaderData }) => {
    const locale = normalizeLocale(match.context.locale);
    if (!loaderData) return { meta: [{ title: "Course" }, { name: "robots", content: "noindex" }] };
    const course = getCourseBySlug(loaderData.slug);
    const site = messages[locale].meta.coursesTitle.split(" — ")[1] ?? "";
    const label =
      course.kind === "level" ? `${course.badge} ${course.name[locale]}` : course.name[locale];
    const title = `${label} — ${site}`;
    return {
      meta: [
        { title },
        { name: "description", content: course.summary[locale] },
        { property: "og:title", content: title },
        { property: "og:description", content: course.summary[locale] },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CoursePage,
});

function CoursePage() {
  const { slug } = Route.useLoaderData();
  const course = getCourseBySlug(slug);
  const { t, locale } = useI18n();
  const { hasJoined, joinCourse } = useLearner();
  const joined = hasJoined(course.slug);
  const label = course.kind === "level" ? course.badge : course.name[locale];

  return (
    <>
      <section className="bg-hero">
        <div className="container-page py-12 md:py-16">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden />
            {t.courses.allCourses}
          </Link>
          <div className="mt-6 flex animate-rise flex-col gap-6 md:flex-row md:items-center">
            <LevelBadge course={course} size="xl" />
            <div>
              <p className="eyebrow text-primary">
                {stageLabel(t, course.stage)}
                {course.suitsLevels && <span dir="ltr"> · {course.suitsLevels}</span>}
              </p>
              <h1 className="display-heading mt-2 text-4xl text-foreground md:text-6xl">
                {course.name[locale]}
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
                {course.summary[locale]}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  variant="hero"
                  size="xl"
                  disabled={joined}
                  onClick={() => {
                    joinCourse(course.slug);
                    toast.success(format(t.courses.joinedToast, { level: label }));
                  }}
                >
                  {joined && <Check aria-hidden />}
                  {joined ? t.courses.joined : t.courses.join}
                </Button>
                <Button asChild variant="outline" size="xl" className="bg-card">
                  <Link to="/level-test">
                    <ClipboardCheck aria-hidden />
                    {t.courses.takeTest}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-7 shadow-card">
            <h2 className="text-xl font-extrabold text-foreground">{t.courses.canDo}</h2>
            <ul className="mt-4 space-y-3">
              {course.canDo.map((item) => (
                <li key={item.en} className="flex items-start gap-2.5">
                  <Check className="mt-1 size-4 shrink-0 text-success" aria-hidden />
                  <span>{item[locale]}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border bg-card p-7 shadow-card">
            <h2 className="text-xl font-extrabold text-foreground">{t.courses.topics}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {course.topics.map((topic) => (
                <li
                  key={topic.en}
                  className="rounded-full bg-secondary px-3.5 py-1.5 text-sm font-semibold text-secondary-foreground"
                >
                  {topic[locale]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="border-t border-border py-12">
        <div className="container-page">
          <h2 className="mb-6 text-3xl font-bold">
            {slug === "speaking" ? t.learning.situationsTitle : t.learning.lessons}
          </h2>
          {slug === "speaking" ? (
            <Button asChild size="lg">
              <Link to="/speaking">
                <Mic aria-hidden />
                {t.learning.browseSpeaking}
              </Link>
            </Button>
          ) : (
            <LessonList lessons={courseLessons(slug)} />
          )}
        </div>
      </section>
    </>
  );
}
