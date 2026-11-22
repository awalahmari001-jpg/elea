import { createFileRoute, notFound } from "@tanstack/react-router";
import { findLesson } from "@/content/lessons";
import { LessonView } from "@/components/learning/lesson-view";
import { LockedLesson } from "@/components/learning/locked-lesson";
import { useLearner } from "@/hooks/use-learner";
import { isLessonUnlocked } from "@/lib/lesson-access";
import { messages } from "@/lib/i18n/messages";
import { normalizeLocale } from "@/lib/i18n/config";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/lessons/$lesson")({
  loader: ({ params }) => {
    const lesson = findLesson(params.lesson);
    if (!lesson) throw notFound();
    return lesson;
  },
  head: ({ loaderData, match }) => {
    const locale = normalizeLocale(match.context.locale);
    const title = `${loaderData?.title[locale] ?? messages[locale].learning.lessons} — ${SITE.name}`;
    const description = loaderData?.goal[locale] ?? messages[locale].learning.lessonDescription;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: LessonPage,
});
function LessonPage() {
  const lesson = Route.useLoaderData();
  const { ready, courses } = useLearner();
  if (!ready) return null;
  if (!isLessonUnlocked(lesson, courses)) return <LockedLesson lesson={lesson} />;
  return <LessonView key={lesson.id} lesson={lesson} />;
}
