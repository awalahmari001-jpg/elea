import { useMemo, useState } from "react";
import {
  Check,
  Lightbulb,
  ListChecks,
  MousePointerClick,
  PenLine,
  RotateCcw,
  Shuffle,
  Undo2,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import type { LessonQuestion, QuestionFormat, QuestionKind } from "@/content/lesson-types";
import { format, type Messages } from "@/lib/i18n/messages";
import {
  buildSentenceFromIndices,
  evaluateFitSentence,
  getQuestionFormat,
  isQuestionCorrect,
  scrambleWords,
  type QuestionAnswer,
} from "@/lib/question-engine";
import { playSpeech } from "@/hooks/use-speech";

const QUESTION_KIND_LABELS: Record<QuestionKind, keyof Messages["learning"]> = {
  comprehension: "qComprehension",
  vocabulary: "qVocabulary",
  synonym: "qSynonym",
  antonym: "qAntonym",
  inference: "qInference",
  grammar: "qGrammar",
  listening: "qListening",
  equivalent: "qEquivalent",
};

const FORMAT_META: Record<
  QuestionFormat,
  { labelKey: keyof Messages["learning"]; badgeClass: string }
> = {
  "multiple-choice": {
    labelKey: "formatMultipleChoice",
    badgeClass: "bg-primary/10 text-primary",
  },
  "pick-right-word": {
    labelKey: "formatPickWord",
    badgeClass: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  },
  "rearrange-words": {
    labelKey: "formatRearrange",
    badgeClass: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  },
  "fit-sentence": {
    labelKey: "formatFitSentence",
    badgeClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  },
};

function FormatIcon({ fmt }: { fmt: QuestionFormat }) {
  if (fmt === "pick-right-word") return <MousePointerClick className="size-3.5" aria-hidden />;
  if (fmt === "rearrange-words") return <Shuffle className="size-3.5" aria-hidden />;
  if (fmt === "fit-sentence") return <PenLine className="size-3.5" aria-hidden />;
  return <ListChecks className="size-3.5" aria-hidden />;
}

export interface QuestionCardProps {
  index: number;
  question: LessonQuestion;
  answer: QuestionAnswer | undefined;
  checked: boolean;
  onChange: (next: QuestionAnswer) => void;
}

export function QuestionCard({ index, question, answer, checked, onChange }: QuestionCardProps) {
  const { locale, t } = useI18n();
  const [showHint, setShowHint] = useState(false);

  const fmt = getQuestionFormat(question);
  const meta = FORMAT_META[fmt];
  const correct = checked && isQuestionCorrect(question, answer);

  const scrambledWords = useMemo(
    () => (question.orderedWords ? scrambleWords(question.orderedWords, question.prompt) : []),
    [question.orderedWords, question.prompt],
  );

  const selectedOption =
    answer && (answer.format === "multiple-choice" || answer.format === "pick-right-word")
      ? answer.selectedIndex
      : -1;

  const selectedWordIndices =
    answer && answer.format === "rearrange-words" ? answer.selectedIndices : [];

  const sentenceText = answer && answer.format === "fit-sentence" ? answer.text : "";
  const fitEval = useMemo(
    () => (fmt === "fit-sentence" ? evaluateFitSentence(sentenceText, question) : null),
    [fmt, sentenceText, question],
  );

  const templateParts = (question.sentenceTemplate ?? question.prompt).split("___");
  const pickedWord = selectedOption >= 0 ? question.options[selectedOption] : null;

  return (
    <fieldset className="rounded-xl border border-border bg-card p-4 shadow-xs md:p-6">
      {/* Badges */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${meta.badgeClass}`}
        >
          <FormatIcon fmt={fmt} />
          {t.learning[meta.labelKey]}
        </span>
        {question.kind && (
          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-bold text-secondary-foreground">
            {t.learning[QUESTION_KIND_LABELS[question.kind]]}
          </span>
        )}
      </div>

      {/* Prompt */}
      <legend
        className="max-w-full px-1 text-base font-semibold leading-relaxed"
        lang="en"
        dir="ltr"
      >
        {index + 1}. {question.prompt}
      </legend>

      {/* FORMAT 1: MULTIPLE CHOICE */}
      {fmt === "multiple-choice" && (
        <div className="mt-4 grid gap-2" role="group" aria-label={question.prompt}>
          {question.options.map((option, j) => (
            <Button
              key={option}
              type="button"
              variant={selectedOption === j ? "secondary" : "outline"}
              className="h-auto min-h-11 justify-start whitespace-normal py-3 text-start"
              lang="en"
              dir="ltr"
              disabled={checked}
              aria-pressed={selectedOption === j}
              onClick={() => onChange({ format: "multiple-choice", selectedIndex: j })}
            >
              <span className="font-bold">{String.fromCharCode(65 + j)}.</span>
              {option}
            </Button>
          ))}
        </div>
      )}

      {/* FORMAT 2: PICK THE RIGHT WORD (Inline Cloze Slot + Word Bank) */}
      {fmt === "pick-right-word" && (
        <div className="mt-4 space-y-4">
          <p className="text-xs font-medium text-muted-foreground">{t.learning.pickWordPrompt}</p>
          <div
            className="rounded-xl border border-primary/25 bg-muted/60 p-4 text-base font-medium leading-loose text-foreground"
            lang="en"
            dir="ltr"
          >
            {templateParts[0]}
            <span
              className={`mx-1.5 inline-flex min-w-24 items-center justify-center rounded-lg border-2 px-3 py-0.5 font-bold transition ${
                pickedWord
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-dashed border-muted-foreground/50 bg-background text-muted-foreground"
              }`}
            >
              {pickedWord ?? "____"}
            </span>
            {templateParts.slice(1).join("___")}
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label={question.prompt} dir="ltr">
            {question.options.map((word, j) => (
              <Button
                key={word}
                type="button"
                variant={selectedOption === j ? "default" : "outline"}
                className="rounded-full px-5 font-semibold"
                lang="en"
                dir="ltr"
                disabled={checked}
                aria-pressed={selectedOption === j}
                onClick={() => onChange({ format: "pick-right-word", selectedIndex: j })}
              >
                {word}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* FORMAT 3: REARRANGE THE WORDS */}
      {fmt === "rearrange-words" && (
        <div className="mt-4 space-y-4">
          <p className="text-xs font-medium text-muted-foreground">{t.learning.rearrangePrompt}</p>

          {/* Constructed Sentence Drop Zone */}
          <div
            className="min-h-16 rounded-xl border-2 border-dashed border-primary/35 bg-muted/50 p-3.5"
            lang="en"
            dir="ltr"
          >
            {selectedWordIndices.length === 0 ? (
              <p
                className="py-1 text-sm italic text-muted-foreground"
                dir={locale === "ar" ? "rtl" : "ltr"}
              >
                {t.learning.rearrangeEmpty}
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedWordIndices.map((wordIdx, pos) => (
                  <button
                    key={`${wordIdx}-${pos}`}
                    type="button"
                    disabled={checked}
                    onClick={() =>
                      onChange({
                        format: "rearrange-words",
                        selectedIndices: selectedWordIndices.filter((_, i) => i !== pos),
                      })
                    }
                    className="rounded-lg border border-primary bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground shadow-xs transition hover:opacity-90 disabled:opacity-80"
                  >
                    {scrambledWords[wordIdx]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Scrambled Word Bank */}
          <div className="flex flex-wrap gap-2" dir="ltr" role="group" aria-label={question.prompt}>
            {scrambledWords.map((word, wordIdx) => {
              const used = selectedWordIndices.includes(wordIdx);
              return (
                <Button
                  key={`${word}-${wordIdx}`}
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={checked || used}
                  className={`rounded-lg font-semibold ${used ? "opacity-35" : ""}`}
                  lang="en"
                  dir="ltr"
                  onClick={() =>
                    onChange({
                      format: "rearrange-words",
                      selectedIndices: [...selectedWordIndices, wordIdx],
                    })
                  }
                >
                  {word}
                </Button>
              );
            })}
          </div>

          {/* Undo / Clear controls */}
          {!checked && selectedWordIndices.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() =>
                  onChange({
                    format: "rearrange-words",
                    selectedIndices: selectedWordIndices.slice(0, -1),
                  })
                }
              >
                <Undo2 className="size-3.5" aria-hidden />
                {t.learning.rearrangeUndo}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => onChange({ format: "rearrange-words", selectedIndices: [] })}
              >
                <RotateCcw className="size-3.5" aria-hidden />
                {t.learning.rearrangeClear}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* FORMAT 4: MAKE IT INTO THE FIT SENTENCE */}
      {fmt === "fit-sentence" && (
        <div className="mt-4 space-y-3">
          <p className="text-xs font-medium text-muted-foreground">
            {t.learning.fitSentencePrompt}
          </p>

          {/* Live Cue Word Badges */}
          {(question.cueWords?.length ?? 0) > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground">
                {t.learning.fitSentenceTargets}
              </span>
              {question.cueWords!.map((cue) => {
                const matched = fitEval?.matchedCues.includes(cue) ?? false;
                return (
                  <span
                    key={cue}
                    lang="en"
                    dir="ltr"
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold transition ${
                      matched
                        ? "bg-success/15 text-success ring-1 ring-success/40"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {matched && <Check className="size-3" aria-hidden />}
                    {cue}
                  </span>
                );
              })}
            </div>
          )}

          {/* Sentence Input */}
          <input
            type="text"
            value={sentenceText}
            disabled={checked}
            onChange={(e) => onChange({ format: "fit-sentence", text: e.target.value })}
            placeholder={t.learning.fitSentencePlaceholder}
            aria-label={question.prompt}
            lang="en"
            dir="ltr"
            maxLength={300}
            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm font-medium text-foreground shadow-2xs focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-75"
          />

          {/* Optional Structure Hint */}
          {question.sentenceHint && !checked && (
            <div>
              <button
                type="button"
                onClick={() => setShowHint((prev) => !prev)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                <Lightbulb className="size-3.5" aria-hidden />
                {showHint ? t.learning.fitSentenceHintHide : t.learning.fitSentenceHintShow}
              </button>
              {showHint && (
                <p className="mt-2 rounded-lg bg-accent-soft px-3.5 py-2 text-xs font-medium text-foreground">
                  {question.sentenceHint[locale]}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* CHECKED FEEDBACK */}
      {checked && (
        <div className="mt-4 border-s-4 border-primary ps-4" role="status">
          {fmt === "fit-sentence" && fitEval ? (
            <>
              <p
                className={
                  correct ? "font-semibold text-success" : "font-semibold text-destructive"
                }
              >
                {correct ? (
                  <>
                    <Check className="me-1 inline size-4" aria-hidden />
                    {t.learning.fitSentenceGood}
                  </>
                ) : fitEval.missingCues.length > 0 ? (
                  format(t.learning.fitSentenceMissing, {
                    missing: fitEval.missingCues.join(", "),
                  })
                ) : (
                  format(t.learning.fitSentenceShort, { min: fitEval.minWords })
                )}
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {t.learning.yourSentence}:{" "}
                <span className="font-medium text-foreground" lang="en" dir="ltr">
                  {sentenceText}
                </span>
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
                <span>{t.learning.fitSentenceModel}:</span>
                <span lang="en" dir="ltr" className="text-primary">
                  {question.options[question.correct] ?? ""}
                </span>
                <button
                  type="button"
                  onClick={() => playSpeech(question.options[question.correct] ?? "", 0.88)}
                  className="rounded-md p-1 text-primary hover:bg-muted"
                  aria-label={`${t.learning.listen}: ${question.options[question.correct] ?? ""}`}
                >
                  <Volume2 className="size-4" aria-hidden />
                </button>
              </div>
            </>
          ) : (
            <>
              <p
                className={
                  correct ? "font-semibold text-success" : "font-semibold text-destructive"
                }
              >
                {correct && <Check className="me-1 inline size-4" aria-hidden />}
                {t.learning.answer}:{" "}
                <span lang="en" dir="ltr">
                  {fmt === "rearrange-words" && question.orderedWords
                    ? question.orderedWords.join(" ")
                    : question.options[question.correct]}
                </span>
              </p>
              {fmt === "rearrange-words" && !correct && selectedWordIndices.length > 0 && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {t.learning.yourSentence}:{" "}
                  <span lang="en" dir="ltr">
                    {buildSentenceFromIndices(scrambledWords, selectedWordIndices)}
                  </span>
                </p>
              )}
            </>
          )}
          <p className="mt-2 text-sm leading-relaxed">{question.explanation[locale]}</p>
        </div>
      )}
    </fieldset>
  );
}
