import { useState } from "react";
import { Mic, Square, Volume2, Send, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { useSpeech, playSpeech } from "@/hooks/use-speech";
import { format } from "@/lib/i18n/messages";
import type { SpeakingSituation } from "@/content/speaking-situations";

export interface SpeakingConversationProps {
  situation: SpeakingSituation;
}
export function SpeakingConversation({ situation }: SpeakingConversationProps) {
  const { t, locale } = useI18n();
  const [responses, setResponses] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [voiceError, setVoiceError] = useState(false);
  const speech = useSpeech((text) =>
    setDraft((prev) => [prev.trim(), text].filter(Boolean).join(" ")),
  );
  const turn = situation.turns[responses.length];
  const done = !turn;
  function submit() {
    if (!draft.trim() || !turn || speech.listening) return;
    window.speechSynthesis?.cancel();
    setResponses((prev) => [...prev, draft.trim()]);
    setDraft("");
    setShowModel(false);
  }
  return (
    <section
      className="min-w-0 rounded-lg border border-border bg-card p-5 md:p-8"
      aria-label={situation.title[locale]}
    >
      <div className="flex flex-wrap justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-primary">
            {situation.level} · {situation.role[locale]}
          </p>
          <h2 className="mt-2 text-2xl font-bold">{situation.title[locale]}</h2>
        </div>
        <span className="text-sm text-muted-foreground">
          {format(t.learning.turn, {
            current: Math.min(responses.length + 1, situation.turns.length),
            total: situation.turns.length,
          })}
        </span>
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
          <div className="mt-6 border-s-4 border-primary ps-4">
            <p className="text-xs font-bold text-muted-foreground">{t.learning.partner}</p>
            <p className="mt-2 text-lg leading-relaxed" lang="en" dir="ltr">
              {turn.prompt}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant="outline"
              disabled={speech.listening}
              onClick={() => setVoiceError(!playSpeech(turn.prompt))}
            >
              <Volume2 aria-hidden />
              {t.learning.listen}
            </Button>
            <Button
              variant="ghost"
              aria-expanded={showModel}
              onClick={() => setShowModel(!showModel)}
            >
              {t.learning.sample}
            </Button>
          </div>
          {showModel && (
            <p
              className="mt-3 whitespace-pre-wrap rounded-lg bg-muted p-4 leading-relaxed"
              lang="en"
              dir="ltr"
            >
              {turn.model}
            </p>
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
              className="mt-2 min-h-36 w-full rounded-lg border border-input bg-background p-4 leading-relaxed"
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
        <div className="mt-6 border-s-4 border-success ps-4" role="status">
          <h3 className="flex items-center gap-2 text-xl font-bold text-success">
            <Check aria-hidden />
            {t.learning.done}
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{t.learning.doneBody}</p>
          <Button
            className="mt-5"
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
