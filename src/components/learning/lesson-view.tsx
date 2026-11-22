import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { Pronunciation } from "./pronunciation";
import type { Lesson } from "@/content/lessons";
import { format } from "@/lib/i18n/messages";
import { wordCount } from "@/lib/speech";
import { playSpeech } from "@/hooks/use-speech";
import communityAudio from "@/assets/ielts-community.wav.asset.json";
import treesAudio from "@/assets/ielts-trees.wav.asset.json";

export interface LessonViewProps {
  lesson: Lesson;
}
export function LessonView({ lesson }: LessonViewProps) {
  const { locale, t } = useI18n();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const [writing, setWriting] = useState("");
  const [review, setReview] = useState(false);
  const [complete, setComplete] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audio =
    lesson.id === "ielts-listening-details"
      ? communityAudio.url
      : lesson.id === "ielts-listening-lecture"
        ? treesAudio.url
        : undefined;
  const score = lesson.questions.filter((q, i) => answers[i] === q.correct).length;
  const allAnswered = lesson.questions.every((_, i) => answers[i] !== undefined);
  return (
    <div className="container-page max-w-5xl py-8 md:py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {lesson.course === "ielts" ? (
          <Link className="flex items-center gap-2 text-sm text-primary" to="/ielts">
            <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden />
            {t.learning.back}
          </Link>
        ) : (
          <Link
            className="flex items-center gap-2 text-sm text-primary"
            to="/courses/$level"
            params={{ level: lesson.course }}
          >
            <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden />
            {t.learning.back}
          </Link>
        )}
        <span className="text-sm font-semibold text-muted-foreground">
          <span dir="ltr">{lesson.course.toUpperCase()}</span> · {t.learning[lesson.skill]} ·{" "}
          {format(t.learning.minutes, { count: lesson.minutes })}
        </span>
      </div>
      <header className="border-b border-border py-8">
        <h1 className="text-3xl font-bold leading-tight md:text-4xl">{lesson.title[locale]}</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{lesson.goal[locale]}</p>
      </header>
      <section className="py-8">
        <h2 className="text-2xl font-bold">{t.learning.techniques}</h2>
        <ol className="mt-5 space-y-4">
          {lesson.teaching.map((text, i) => (
            <li key={text.en} className="flex items-start gap-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
                {i + 1}
              </span>
              <p className="leading-relaxed">{text[locale]}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="border-t border-border py-8">
        <h2 className="text-2xl font-bold">{audio ? t.learning.audio : t.learning.example}</h2>
        {audio ? (
          <>
            <audio
              className="mt-5 w-full"
              controls
              preload="metadata"
              src={audio}
              aria-label={t.learning.audio}
              onError={() => setAudioError(true)}
            />
            {audioError && (
              <p role="alert" className="mt-3 text-destructive">
                {t.learning.audioUnavailable}
              </p>
            )}
            <details className="mt-4">
              <summary className="cursor-pointer font-semibold text-primary">
                {t.learning.transcript}
              </summary>
              <p
                className="mt-4 whitespace-pre-wrap rounded-lg bg-muted p-5 leading-relaxed"
                lang="en"
                dir="ltr"
              >
                {lesson.example}
              </p>
            </details>
          </>
        ) : (
          <>
            <p
              className="mt-5 whitespace-pre-wrap rounded-lg border border-border bg-muted p-5 leading-loose"
              lang="en"
              dir="ltr"
            >
              {lesson.example}
            </p>
            <Button
              variant="outline"
              className="mt-3"
              onClick={() => setAudioError(!playSpeech(lesson.example))}
            >
              <Volume2 aria-hidden />
              {t.learning.listen}
            </Button>
            {audioError && (
              <p role="alert" className="mt-3 text-destructive">
                {t.learning.audioUnavailable}
              </p>
            )}
          </>
        )}
      </section>
      <section className="border-t border-border py-8">
        <h2 className="text-2xl font-bold">{t.learning.questions}</h2>
        <div className="mt-5 space-y-6">
          {lesson.questions.map((q, i) => (
            <fieldset key={q.prompt} className="rounded-lg border border-border p-4 md:p-6">
              <legend className="max-w-full px-2 font-semibold" lang="en" dir="ltr">
                {i + 1}. {q.prompt}
              </legend>
              <div className="grid gap-2" role="group" aria-label={q.prompt}>
                {q.options.map((option, j) => (
                  <Button
                    key={option}
                    variant={answers[i] === j ? "secondary" : "outline"}
                    className="h-auto min-h-11 justify-start whitespace-normal py-3 text-start"
                    lang="en"
                    dir="ltr"
                    disabled={checked}
                    aria-pressed={answers[i] === j}
                    onClick={() => setAnswers((prev) => ({ ...prev, [i]: j }))}
                  >
                    <span className="font-bold">{String.fromCharCode(65 + j)}.</span>
                    {option}
                  </Button>
                ))}
              </div>
              {checked && (
                <div className="mt-4 border-s-4 border-primary ps-4" role="status">
                  <p
                    className={
                      answers[i] === q.correct
                        ? "font-semibold text-success"
                        : "font-semibold text-destructive"
                    }
                  >
                    {answers[i] === q.correct && (
                      <Check className="me-1 inline size-4" aria-hidden />
                    )}
                    {t.learning.answer}:{" "}
                    <span lang="en" dir="ltr">
                      {q.options[q.correct]}
                    </span>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed">{q.explanation[locale]}</p>
                </div>
              )}
            </fieldset>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Button
            disabled={!allAnswered}
            onClick={() =>
              checked ? (setChecked(false), setAnswers({}), setComplete(false)) : setChecked(true)
            }
          >
            {checked ? t.learning.retry : t.learning.check}
          </Button>
          {checked && (
            <p className="font-bold" role="status">
              {format(t.learning.score, { score, total: lesson.questions.length })}
            </p>
          )}
        </div>
      </section>
      {lesson.writing && (
        <section className="border-t border-border py-8">
          <h2 className="text-2xl font-bold">{t.learning.writingTask}</h2>
          <p className="mt-4 leading-relaxed" lang="en" dir="ltr">
            {lesson.writing.prompt}
          </p>
          <label htmlFor="writing-response" className="mt-5 block text-sm font-semibold">
            {t.learning.type}
          </label>
          <textarea
            id="writing-response"
            value={writing}
            onChange={(e) => {
              setWriting(e.target.value);
              setReview(false);
              setComplete(false);
            }}
            lang="en"
            dir="ltr"
            className="mt-2 min-h-72 w-full rounded-lg border border-input bg-background p-4 leading-relaxed"
            maxLength={20000}
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {format(t.learning.words, {
                count: wordCount(writing),
                minimum: lesson.writing.minimum,
              })}
            </p>
            <Button disabled={!writing.trim()} onClick={() => setReview(true)}>
              {t.learning.review}
            </Button>
          </div>
          {review && (
            <div className="mt-5 border-s-4 border-primary ps-4" role="status">
              <p className="font-semibold">
                {wordCount(writing) < lesson.writing.minimum
                  ? t.learning.belowMinimum
                  : t.learning.minimumReached}
              </p>
              <h3 className="mt-3 font-semibold">{t.learning.checklist}</h3>
              <ul className="mt-3 space-y-3">
                {lesson.writing.checklist.map((item) => (
                  <li key={item.en}>
                    <label className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1 size-4 accent-primary" />
                      {item[locale]}
                    </label>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">{t.learning.reviewNote}</p>
            </div>
          )}
          <details className="mt-6">
            <summary className="cursor-pointer font-semibold text-primary">
              {t.learning.model}
            </summary>
            <p
              className="mt-4 whitespace-pre-wrap rounded-lg bg-muted p-5 leading-loose"
              lang="en"
              dir="ltr"
            >
              {lesson.writing.model}
            </p>
          </details>
        </section>
      )}
      <Pronunciation target={lesson.pronunciation} tip={lesson.pronunciationTip} />
      {lesson.skill === "speaking" && (
        <Button asChild variant="accent" className="mb-6">
          <Link to="/speaking">{t.learning.browseSpeaking}</Link>
        </Button>
      )}
      <div className="border-t border-border py-6">
        <Button
          disabled={!checked || (Boolean(lesson.writing) && !review)}
          onClick={() => setComplete(true)}
        >
          <Check aria-hidden />
          {t.learning.finishLesson}
        </Button>
        {complete && (
          <div role="status" className="mt-4">
            <h2 className="text-xl font-bold text-success">{t.learning.complete}</h2>
            <p className="mt-2 text-muted-foreground">{t.learning.completedBody}</p>
          </div>
        )}
      </div>
    </div>
  );
}
