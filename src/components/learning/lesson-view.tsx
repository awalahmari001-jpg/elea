import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Check,
  Compass,
  Headphones,
  Play,
  Sparkles,
  Square,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { Pronunciation } from "./pronunciation";
import { RuleVideoPlayer } from "./rule-video-player";
import { DetailedRuleGuideView } from "./detailed-rule-guide";
import { QuestionCard } from "./question-card";
import type { Lesson } from "@/content/lesson-types";
import { format } from "@/lib/i18n/messages";
import { wordCount } from "@/lib/speech";
import { playSpeech, stopSpeech } from "@/hooks/use-speech";
import { courseHome } from "@/lib/lesson-access";
import {
  getQuestionFormat,
  isQuestionAnswered,
  isQuestionCorrect,
  type QuestionAnswer,
} from "@/lib/question-engine";

export interface LessonViewProps {
  lesson: Lesson;
}

export function LessonView({ lesson }: LessonViewProps) {
  const { locale, t } = useI18n();
  const [answers, setAnswers] = useState<Record<number, QuestionAnswer>>({});
  const [checked, setChecked] = useState(false);
  const [writing, setWriting] = useState("");
  const [review, setReview] = useState(false);
  const [complete, setComplete] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const home = courseHome(lesson);
  const isListeningLesson =
    Boolean(lesson.listeningPlan) ||
    lesson.id === "ielts-listening-details" ||
    lesson.id === "ielts-listening-lecture";
  const score = lesson.questions.filter((q, i) => isQuestionCorrect(q, answers[i])).length;
  const allAnswered = lesson.questions.every((q, i) => isQuestionAnswered(q, answers[i]));
  const distinctFormats = new Set(lesson.questions.map(getQuestionFormat));
  const paragraphs = lesson.example.split("\n\n").filter(Boolean);

  return (
    <div className="container-page max-w-5xl py-8 md:py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {"params" in home ? (
          <Link
            className="flex items-center gap-2 text-sm text-primary"
            to={home.to}
            params={home.params}
          >
            <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden />
            {t.learning.back}
          </Link>
        ) : (
          <Link className="flex items-center gap-2 text-sm text-primary" to={home.to}>
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
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {lesson.unit && (
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
              {lesson.unit[locale]}
            </span>
          )}
          {lesson.taskPlan && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-foreground">
              <Compass className="size-3.5 text-primary" aria-hidden />
              {t.learning.tbllBadge}
            </span>
          )}
          {lesson.isReadingPassage && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <BookOpen className="size-3.5" aria-hidden />
              {t.learning.readingPassageBadge}
            </span>
          )}
          {lesson.explainerVideo && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <Play className="size-3.5" aria-hidden />
              {t.learning.videoBadge} · {t.learning.videoMaxDuration}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold leading-tight md:text-4xl">{lesson.title[locale]}</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{lesson.goal[locale]}</p>
      </header>

      {/* TBLL 4-Stage Task Plan */}
      {lesson.taskPlan && (
        <section className="py-8">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <p className="eyebrow text-primary">{t.learning.tbllScenario}</p>
            <p className="mt-2 text-base font-medium leading-relaxed text-foreground">
              {lesson.taskPlan.scenario[locale]}
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                { label: t.learning.tbllPreTask, text: lesson.taskPlan.preTask[locale] },
                { label: t.learning.tbllMainTask, text: lesson.taskPlan.mainTask[locale] },
                {
                  label: t.learning.tbllLanguageFocus,
                  text: lesson.taskPlan.languageFocus[locale],
                },
                { label: t.learning.tbllPostTask, text: lesson.taskPlan.postTask[locale] },
              ].map((step) => (
                <div key={step.label} className="rounded-xl bg-muted/60 p-4">
                  <h2 className="text-sm font-bold text-primary">{step.label}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* AI Animated Explainer Video (<= 4 min max) */}
      {lesson.explainerVideo && <RuleVideoPlayer video={lesson.explainerVideo} />}

      {/* Detailed Grammar Rule / Reading Strategy Explanation */}
      {lesson.detailedGuide && (
        <DetailedRuleGuideView guide={lesson.detailedGuide} skill={lesson.skill} />
      )}

      {/* Level-Based Listening & Acoustics Plan */}
      {lesson.listeningPlan && (
        <section className="border-t border-border py-8">
          <div className="flex items-center gap-2.5">
            <Headphones className="size-6 text-primary" aria-hidden />
            <h2 className="text-2xl font-bold">{t.learning.listeningPlanTitle}</h2>
          </div>
          <div className="mt-4 rounded-2xl border border-primary/20 bg-secondary/40 p-5">
            <p className="flex items-start gap-2.5 text-sm font-medium leading-relaxed text-foreground">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>{lesson.listeningPlan.levelEncouragement[locale]}</span>
            </p>
          </div>
          <div className="mt-5 rounded-xl border border-border bg-card p-5">
            <h3 className="text-base font-bold text-primary">{t.learning.acousticsFocus}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {lesson.listeningPlan.acousticsFocus[locale]}
            </p>
            <h3 className="mt-5 text-base font-bold text-primary">{t.learning.listeningSteps}</h3>
            <ol className="mt-3 space-y-2.5">
              {lesson.listeningPlan.steps.map((step, idx) => (
                <li key={step.en} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {idx + 1}
                  </span>
                  <span>{step[locale]}</span>
                </li>
              ))}
            </ol>
          </div>

          {lesson.listeningPlan.paraphrasePairs.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-bold">{t.learning.paraphraseTitle}</h3>
              <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-card">
                <table className="w-full text-sm">
                  <thead className="border-b border-border bg-muted/60 text-start">
                    <tr>
                      <th className="px-4 py-3 text-start font-bold">
                        {t.learning.paraphraseSpoken}
                      </th>
                      <th className="px-4 py-3 text-start font-bold">
                        {t.learning.paraphraseEquivalent}
                      </th>
                      <th className="px-4 py-3 text-start font-bold">
                        {t.learning.paraphraseArabic}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {lesson.listeningPlan.paraphrasePairs.map((pair) => (
                      <tr key={pair.spoken}>
                        <td className="px-4 py-3 font-semibold" lang="en" dir="ltr">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setAudioError(!playSpeech(pair.spoken, 0.85))}
                              className="rounded-md p-1 text-primary hover:bg-muted"
                              aria-label={`${t.learning.listen}: ${pair.spoken}`}
                            >
                              <Volume2 className="size-4" aria-hidden />
                            </button>
                            <span>{pair.spoken}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground" lang="en" dir="ltr">
                          {pair.equivalent}
                        </td>
                        <td className="px-4 py-3 font-medium" lang="ar" dir="rtl">
                          {pair.arabic}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Teaching Points */}
      <section className="border-t border-border py-8">
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

      {/* Reading Passage / Listening Audio / Worked Example */}
      <section className="border-t border-border py-8">
        <h2 className="text-2xl font-bold">
          {isListeningLesson
            ? t.learning.audio
            : lesson.isReadingPassage
              ? t.learning.readingPassageTitle
              : t.learning.example}
        </h2>
        {isListeningLesson ? (
          <>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => setAudioError(!playSpeech(lesson.example, 0.75))}
              >
                <Volume2 aria-hidden />
                {t.learning.listenSlow}
              </Button>
              <Button
                variant="default"
                onClick={() => setAudioError(!playSpeech(lesson.example, 0.95))}
              >
                <Volume2 aria-hidden />
                {t.learning.listenNormal}
              </Button>
              <Button variant="ghost" onClick={() => stopSpeech()}>
                <Square aria-hidden />
                {t.learning.stopAudio}
              </Button>
            </div>
            {audioError && (
              <p role="alert" className="mt-3 text-destructive">
                {t.learning.audioUnavailable}
              </p>
            )}
            <details className="mt-4">
              <summary className="cursor-pointer font-semibold text-primary">
                {t.learning.transcript}
              </summary>
              <div
                className="mt-4 space-y-4 rounded-xl border border-border bg-muted p-5 leading-loose"
                lang="en"
                dir="ltr"
              >
                {paragraphs.map((p, idx) => (
                  <p key={idx} className="whitespace-pre-wrap">
                    {p}
                  </p>
                ))}
              </div>
            </details>
          </>
        ) : (
          <>
            <div
              className="mt-5 space-y-4 rounded-xl border border-border bg-muted p-5 leading-loose md:p-7"
              lang="en"
              dir="ltr"
            >
              {paragraphs.map((p, idx) => (
                <p key={idx} className="whitespace-pre-wrap">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => setAudioError(!playSpeech(lesson.example, 0.9))}
              >
                <Volume2 aria-hidden />
                {t.learning.listen}
              </Button>
              <Button variant="ghost" onClick={() => stopSpeech()}>
                <Square aria-hidden />
                {t.learning.stopAudio}
              </Button>
            </div>
            {audioError && (
              <p role="alert" className="mt-3 text-destructive">
                {t.learning.audioUnavailable}
              </p>
            )}
          </>
        )}
      </section>

      {/* Vocabulary, Synonyms & Antonyms Bank */}
      {lesson.vocab && lesson.vocab.length > 0 && (
        <section className="border-t border-border py-8">
          <h2 className="text-2xl font-bold">{t.learning.vocabTitle}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {lesson.vocab.map((item) => (
              <article
                key={item.word}
                className="rounded-xl border border-border bg-card p-5 shadow-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-extrabold text-primary" lang="en" dir="ltr">
                    {item.word}
                  </h3>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => setAudioError(!playSpeech(item.word, 0.85))}
                    aria-label={`${t.learning.listen}: ${item.word}`}
                  >
                    <Volume2 className="size-4" aria-hidden />
                  </Button>
                </div>
                <p className="mt-1.5 text-sm text-foreground" lang="en" dir="ltr">
                  {item.meaningEn}
                </p>
                <p className="mt-1 text-sm font-semibold text-muted-foreground" lang="ar" dir="rtl">
                  {item.meaningAr}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {item.synonym && (
                    <span className="rounded-full bg-secondary px-2.5 py-1 font-semibold text-secondary-foreground">
                      {t.learning.vocabSynonym}:{" "}
                      <span lang="en" dir="ltr">
                        {item.synonym}
                      </span>
                    </span>
                  )}
                  {item.antonym && (
                    <span className="rounded-full bg-accent-soft px-2.5 py-1 font-semibold text-foreground">
                      {t.learning.vocabAntonym}:{" "}
                      <span lang="en" dir="ltr">
                        {item.antonym}
                      </span>
                    </span>
                  )}
                </div>
                <p
                  className="mt-3 border-t border-border pt-2.5 text-xs italic text-muted-foreground"
                  lang="en"
                  dir="ltr"
                >
                  “{item.example}”
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Multi-Format Practice Questions */}
      <section className="border-t border-border py-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-2xl font-bold">{t.learning.questions}</h2>
            {distinctFormats.size >= 4 && (
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                {t.learning.questionTypesSummary}
              </span>
            )}
          </div>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
            {lesson.questions.length}
          </span>
        </div>
        <div className="mt-5 space-y-6">
          {lesson.questions.map((q, i) => (
            <QuestionCard
              key={`${lesson.id}-q-${i}`}
              index={i}
              question={q}
              answer={answers[i]}
              checked={checked}
              onChange={(next) => setAnswers((prev) => ({ ...prev, [i]: next }))}
            />
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

      {(lesson.skill === "grammar" || lesson.skill === "reading") && (
        <section className="mb-8 rounded-2xl border border-primary/25 bg-secondary/40 p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                {t.learning.lessonAssessmentCtaTitle}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t.learning.lessonAssessmentCtaBody}
              </p>
            </div>
            {"params" in home ? (
              <Button asChild variant="default">
                <Link to={home.to} params={home.params} hash="assessments">
                  {t.learning.lessonAssessmentCtaButton}
                </Link>
              </Button>
            ) : (
              <Button asChild variant="default">
                <Link to={home.to} hash="assessments">
                  {t.learning.lessonAssessmentCtaButton}
                </Link>
              </Button>
            )}
          </div>
        </section>
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
