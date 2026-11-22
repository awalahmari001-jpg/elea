import { useState } from "react";
import { Mic, Square, Volume2 } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";
import { useSpeech, playSpeech } from "@/hooks/use-speech";
import { compareRecognition } from "@/lib/speech";
import { format } from "@/lib/i18n/messages";
import type { Bilingual } from "@/content/lesson-types";

export interface PronunciationProps {
  target: string;
  tip: Bilingual;
}
export function Pronunciation({ target, tip }: PronunciationProps) {
  const { t, locale } = useI18n();
  const [text, setText] = useState("");
  const [result, setResult] = useState<ReturnType<typeof compareRecognition> | null>(null);
  const [source, setSource] = useState<"speech" | "text">("text");
  const [voiceError, setVoiceError] = useState(false);
  const speech = useSpeech((transcript) => {
    setText(transcript);
    setSource("speech");
    setResult(compareRecognition(target, transcript));
  });
  return (
    <section className="border-t border-border py-8">
      <h2 className="flex items-center gap-2 text-2xl font-bold">
        <Mic className="size-5 text-primary" aria-hidden />
        {t.learning.pronunciation}
      </h2>
      <p className="mt-4 text-xl leading-relaxed" lang="en" dir="ltr">
        {target}
      </p>
      <p className="mt-3 text-sm text-muted-foreground">{tip[locale]}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          variant="outline"
          disabled={speech.listening}
          onClick={() => setVoiceError(!playSpeech(target))}
        >
          <Volume2 aria-hidden />
          {t.learning.listen}
        </Button>
        <Button
          variant={speech.listening ? "destructive" : "default"}
          disabled={!speech.supported}
          onClick={() => (speech.listening ? speech.stop() : speech.start())}
        >
          {speech.listening ? <Square aria-hidden /> : <Mic aria-hidden />}
          {speech.listening ? t.learning.stop : t.learning.record}
        </Button>
      </div>
      <p className="mt-3 text-sm text-muted-foreground" role="status">
        {speech.listening
          ? t.learning.recording
          : speech.error
            ? t.learning[speech.error]
            : !speech.supported
              ? t.learning.unsupported
              : t.learning.privacy}
      </p>
      {voiceError && (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {t.learning.audioUnavailable}
        </p>
      )}
      <label className="mt-5 block text-sm font-semibold" htmlFor="pronunciation-text">
        {source === "speech" ? t.learning.heard : t.learning.textPractice}
      </label>
      <textarea
        id="pronunciation-text"
        lang="en"
        dir="ltr"
        className="mt-2 min-h-24 w-full rounded-lg border border-input bg-background p-3"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setResult(null);
          setSource("text");
        }}
        placeholder={t.learning.type}
        maxLength={2000}
      />
      <Button
        variant="secondary"
        className="mt-2"
        disabled={!text.trim() || speech.listening}
        onClick={() => setResult(compareRecognition(target, text))}
      >
        {t.learning.compare}
      </Button>
      {result && (
        <div className="mt-4 border-s-4 border-primary ps-4" role="status">
          <p className="font-semibold">
            {format(t.learning.matched, { count: result.matched.length, total: result.total })}
          </p>
          {result.missing.length > 0 && (
            <p className="mt-2 text-sm">
              {t.learning.missing}:{" "}
              <span dir="ltr" lang="en">
                {result.missing.join(", ")}
              </span>
            </p>
          )}
          {result.extra.length > 0 && (
            <p className="mt-2 text-sm">
              {t.learning.extra}:{" "}
              <span dir="ltr" lang="en">
                {result.extra.join(", ")}
              </span>
            </p>
          )}
        </div>
      )}
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        {t.learning.recognitionNote}
      </p>
    </section>
  );
}
