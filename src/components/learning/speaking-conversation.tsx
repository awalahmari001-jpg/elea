import { useMemo, useState } from "react";
import {
  Check,
  Lightbulb,
  Mic,
  RotateCcw,
  Send,
  Sparkles,
  Square,
  Volume2,
  VolumeX,
} from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTurnFluencyCoach, type SpeakingSituation } from "@/content/speaking-situations";
import { playSpeech, useSpeech } from "@/hooks/use-speech";
import { format } from "@/lib/i18n/messages";
import { learningRecord } from "@/lib/learning-record";

export interface SpeakingConversationProps {
  situation: SpeakingSituation;
  onComplete?: (situationId: string) => void;
}

export function SpeakingConversation({ situation, onComplete }: SpeakingConversationProps) {
  const { t, locale } = useI18n();
  const [responses, setResponses] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [showHints, setShowHints] = useState(true);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [voiceError, setVoiceError] = useState(false);

  const speech = useSpeech((text) =>
    setDraft((prev) => [prev.trim(), text].filter(Boolean).join(" ")),
  );

  const turn = situation.turns[responses.length];
  const coach = useMemo(
    () => getTurnFluencyCoach(situation, responses.length),
    [situation, responses.length],
  );

  function insertStarter(starter: string) {
    const clean = starter.replace(/\.\.\.$/, "").trim();
    setDraft((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return `${clean} `;
      return `${trimmed} ${clean} `;
    });
  }

  function submit() {
    if (!draft.trim() || !turn || speech.listening) return;
    window.speechSynthesis?.cancel();
    const nextResponses = [...responses, draft.trim()];
    setResponses(nextResponses);
    setDraft("");
    setShowModel(false);

    const nextTurn = situation.turns[nextResponses.length];
    if (nextTurn && autoSpeak) {
      playSpeech(nextTurn.prompt, 0.94, "male");
    } else if (!nextTurn) {
      learningRecord.logActivity({ kind: "speaking", count: 1, minutes: 4, passed: true });
      onComplete?.(situation.id);
    }
  }

  return (
    <section
      className="min-w-0 rounded-2xl border border-border bg-card p-5 shadow-xs md:p-8"
      aria-label={situation.title[locale]}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-primary">
            {situation.level} · {situation.role[locale]}
          </p>
          <h2 className="mt-1.5 text-2xl font-bold">{situation.title[locale]}</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant={autoSpeak ? "secondary" : "outline"}
            className="rounded-full text-xs"
            onClick={() => setAutoSpeak((v) => !v)}
          >
            {autoSpeak ? (
              <Volume2 className="me-1.5 size-3.5 text-primary" aria-hidden />
            ) : (
              <VolumeX className="me-1.5 size-3.5" aria-hidden />
            )}
            {t.learning.liveVoiceToggle}
          </Button>
          <Badge variant="outline" className="text-xs font-semibold">
            {format(t.learning.turn, {
              current: Math.min(responses.length + 1, situation.turns.length),
              total: situation.turns.length,
            })}
          </Badge>
        </div>
      </div>

      {(situation.taskGoal || (situation.keyPhrases && situation.keyPhrases.length > 0)) && (
        <div className="mt-5 rounded-xl border border-border bg-muted/60 p-4">
          {situation.taskGoal && (
            <>
              <p className="text-xs font-bold text-primary">{t.learning.taskGoal}</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground">
                {situation.taskGoal[locale]}
              </p>
            </>
          )}
          {situation.keyPhrases && situation.keyPhrases.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-bold text-muted-foreground">{t.learning.keyPhrases}</p>
              <div className="mt-2 flex flex-wrap gap-2" lang="en" dir="ltr">
                {situation.keyPhrases.map((phrase) => (
                  <button
                    key={phrase}
                    type="button"
                    onClick={() => setVoiceError(!playSpeech(phrase, 0.88))}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-foreground hover:bg-secondary"
                  >
                    <Volume2 className="size-3 text-primary" aria-hidden />
                    {phrase}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Completed Live Discourse Turns */}
      <div className="mt-6 space-y-4">
        {responses.map((response, i) => (
          <div key={i} className="space-y-3 border-b border-border pb-4">
            <p className="text-sm text-muted-foreground">
              <strong>{t.learning.partner}</strong>
              <span className="mt-1 block leading-relaxed" lang="en" dir="ltr">
                {situation.turns[i]?.prompt}
              </span>
            </p>
            <p className="border-s-2 border-accent ps-4">
              <strong className="text-sm text-primary">{t.learning.you}</strong>
              <span className="mt-1 block break-words leading-relaxed" lang="en" dir="ltr">
                {response}
              </span>
            </p>
          </div>
        ))}
      </div>

      {turn ? (
        <>
          <div className="mt-6 rounded-2xl border-s-4 border-primary bg-primary/5 p-4">
            <p className="text-xs font-bold text-primary">
              {t.learning.partner} ({situation.role[locale]})
            </p>
            <p className="mt-1.5 text-lg font-medium leading-relaxed" lang="en" dir="ltr">
              {turn.prompt}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={speech.listening}
              onClick={() => setVoiceError(!playSpeech(turn.prompt, 0.94, "male"))}
            >
              <Volume2 aria-hidden />
              {t.learning.listen}
            </Button>
            <Button
              type="button"
              variant={showHints ? "secondary" : "outline"}
              aria-expanded={showHints}
              onClick={() => setShowHints((v) => !v)}
            >
              <Lightbulb className="text-amber-500" aria-hidden />
              {t.learning.fluencyHintsBtn}
            </Button>
            <Button
              type="button"
              variant="ghost"
              aria-expanded={showModel}
              onClick={() => setShowModel(!showModel)}
            >
              {t.learning.sample}
            </Button>
          </div>

          {/* Helpful Fluency Hints & Clickable Sentence Starters */}
          {showHints && (
            <div className="mt-4 space-y-3 rounded-2xl border border-amber-500/35 bg-amber-500/5 p-4">
              <div className="flex items-start gap-2">
                <Lightbulb
                  className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400"
                  aria-hidden
                />
                <div className="space-y-1">
                  <p className="text-xs font-extrabold uppercase tracking-wide text-amber-700 dark:text-amber-300">
                    {t.learning.fluencyHintHeading}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground">{coach.hint[locale]}</p>
                </div>
              </div>

              {coach.starters.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-muted-foreground">
                    {t.learning.sentenceStartersLabel}
                  </p>
                  <div className="flex flex-wrap gap-2" lang="en" dir="ltr">
                    {coach.starters.map((starter) => (
                      <button
                        key={starter}
                        type="button"
                        onClick={() => insertStarter(starter)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-card px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary/10"
                      >
                        <Sparkles className="size-3 text-primary" aria-hidden />
                        {starter}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {coach.keyWords.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5" lang="en" dir="ltr">
                  <span className="text-[11px] font-bold text-muted-foreground">
                    {t.learning.helpfulWordsLabel}:
                  </span>
                  {coach.keyWords.map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => playSpeech(w, 0.86, "female")}
                      className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground hover:bg-secondary/80"
                    >
                      {w}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {showModel && (
            <div className="mt-3 flex items-start justify-between gap-3 rounded-xl bg-muted p-4">
              <p className="whitespace-pre-wrap text-sm leading-relaxed" lang="en" dir="ltr">
                {turn.model}
              </p>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label={t.learning.listen}
                onClick={() => playSpeech(turn.model, 0.9, "female")}
              >
                <Volume2 className="size-4" aria-hidden />
              </Button>
            </div>
          )}

          {voiceError && (
            <p role="alert" className="mt-3 text-sm text-destructive">
              {t.learning.audioUnavailable}
            </p>
          )}

          <p className="mt-5 text-sm text-muted-foreground">{t.learning.responseHint}</p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
          >
            <label className="mt-4 block text-sm font-semibold" htmlFor="speaking-response">
              {t.learning.type}
            </label>
            <textarea
              id="speaking-response"
              lang="en"
              dir="ltr"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={5000}
              className="mt-2 min-h-32 w-full rounded-xl border border-input bg-background p-4 leading-relaxed"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <Button
                type="button"
                variant={speech.listening ? "destructive" : "outline"}
                disabled={!speech.supported}
                onClick={() => (speech.listening ? speech.stop() : speech.start())}
              >
                {speech.listening ? <Square aria-hidden /> : <Mic aria-hidden />}
                {speech.listening ? t.learning.stop : t.learning.spoken}
              </Button>
              <Button type="submit" disabled={!draft.trim() || speech.listening}>
                <Send aria-hidden />
                {t.learning.reply}
              </Button>
            </div>
          </form>
          <p className="mt-3 text-sm text-muted-foreground" role="status">
            {speech.listening
              ? t.learning.recording
              : speech.error
                ? t.learning[speech.error]
                : !speech.supported
                  ? t.learning.unsupported
                  : t.learning.microphoneNote}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{t.learning.privacy}</p>
        </>
      ) : (
        <div className="mt-6 rounded-2xl border-s-4 border-success bg-success/5 p-5" role="status">
          <h3 className="flex items-center gap-2 text-xl font-bold text-success">
            <Check aria-hidden />
            {t.learning.done}
          </h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">{t.learning.doneBody}</p>
          <Button
            className="mt-4"
            variant="secondary"
            onClick={() => {
              setResponses([]);
              setDraft("");
              setShowModel(false);
            }}
          >
            <RotateCcw aria-hidden />
            {t.learning.restart}
          </Button>
        </div>
      )}

      <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
        {t.learning.recognitionNote}
      </p>
    </section>
  );
}
