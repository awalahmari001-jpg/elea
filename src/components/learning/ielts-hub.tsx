import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Headphones, BookOpen, PenLine, Mic, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { useLearner } from "@/hooks/use-learner";
import { lockedLessonIds } from "@/lib/lesson-access";
import { LessonList } from "./lesson-list";
import { IELTS_LESSONS } from "@/content/ielts-lessons";
import type { LessonSkill } from "@/content/lessons";
import ieltsImage from "@/assets/path-ielts.webp";

const SKILLS = [
  { key: "listening", Icon: Headphones },
  { key: "reading", Icon: BookOpen },
  { key: "writing", Icon: PenLine },
  { key: "speaking", Icon: Mic },
] as const;
export function IeltsHub() {
  const { t } = useI18n();
  const { courses, hasJoined, joinCourse } = useLearner();
  const joined = hasJoined("ielts");
  const [skill, setSkill] = useState<LessonSkill | "all">("all");
  const visible = IELTS_LESSONS.filter((l) => skill === "all" || l.skill === skill);
  return (
    <>
      <header className="relative overflow-hidden bg-inverse text-inverse-foreground">
        <img
          src={ieltsImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="container-page relative py-12 md:py-16">
          <p className="text-sm font-semibold text-accent">IELTS · 7.0</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            {t.learning.ieltsTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-inverse-muted">{t.learning.ieltsIntro}</p>
          <Button
            variant="hero"
            size="lg"
            className="mt-6"
            disabled={joined}
            onClick={() => {
              joinCourse("ielts");
              toast.success(t.learning.joinedUnlock);
            }}
          >
            {joined && <Check aria-hidden />}
            {joined ? t.courses.joined : t.learning.joinToUnlock}
          </Button>
        </div>
      </header>
      <div className="container-page py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-bold">{t.learning.lessons}</h2>
          <Button asChild variant="outline">
            <Link to="/speaking">
              <Mic aria-hidden />
              {t.learning.browseSpeaking}
            </Link>
          </Button>
        </div>
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label={t.learning.lessons}>
          <Button
            variant={skill === "all" ? "default" : "outline"}
            aria-pressed={skill === "all"}
            onClick={() => setSkill("all")}
          >
            {t.learning.all}
          </Button>
          {SKILLS.map(({ key, Icon }) => (
            <Button
              key={key}
              variant={skill === key ? "default" : "outline"}
              aria-pressed={skill === key}
              onClick={() => setSkill(key)}
            >
              <Icon aria-hidden />
              {t.learning[key]}
            </Button>
          ))}
        </div>
        <LessonList lessons={visible} lockedIds={lockedLessonIds(visible, courses)} />
      </div>
      <section className="border-t border-border bg-secondary py-10">
        <div className="container-page">
          <h2 className="text-3xl font-bold">{t.learning.targets}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {SKILLS.map(({ key, Icon }) => (
              <div key={key}>
                <h3 className="flex items-center gap-2 text-lg font-bold">
                  <Icon className="size-5 text-primary" aria-hidden />
                  {t.learning[key]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {
                    t.learning[
                      key === "listening"
                        ? "listenTarget"
                        : key === "reading"
                          ? "readTarget"
                          : key === "writing"
                            ? "writeTarget"
                            : "speakTarget"
                    ]
                  }
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            {t.learning.ieltsNote}
          </p>
          <a
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary underline"
            href="https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail"
            target="_blank"
            rel="noreferrer"
          >
            {t.learning.sources}
            <ExternalLink className="size-4" aria-hidden />
          </a>
        </div>
      </section>
    </>
  );
}
