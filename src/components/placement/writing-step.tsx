import { useState } from "react";
import { PenLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { format } from "@/lib/i18n/messages";
import { WRITING_MAX_CHARS } from "@/lib/placement-ai.functions";
import { cn } from "@/lib/utils";

/** Optional short writing sample + speaking confidence, sent to the AI teacher. */
export function WritingStep({
  onSubmit,
}: {
  onSubmit: (writing: string, speakingConfidence: number | null) => void;
}) {
  const { t } = useI18n();
  const [writing, setWriting] = useState("");
  const [confidence, setConfidence] = useState<number | null>(null);
  const choices = [t.test.speaking1, t.test.speaking2, t.test.speaking3, t.test.speaking4];

  return (
    <div className="mx-auto w-full max-w-2xl animate-rise">
      <div className="rounded-3xl border-2 border-foreground/90 bg-card p-6 shadow-ink md:p-8">
        <span className="eyebrow inline-flex items-center gap-2 text-primary">
          <PenLine className="size-4" aria-hidden />
          {t.test.writingEyebrow}
        </span>
        <h2 className="display-heading mt-3 text-3xl text-foreground">{t.test.writingTitle}</h2>
        <p className="mt-3 text-muted-foreground">{t.test.writingPrompt}</p>

        <textarea
          lang="en"
          dir="ltr"
          value={writing}
          maxLength={WRITING_MAX_CHARS}
          onChange={(e) => setWriting(e.target.value)}
          placeholder={t.test.writingPlaceholder}
          rows={6}
          className="mt-5 w-full resize-y rounded-2xl border-2 border-input bg-background p-4 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
        <p className="mt-1 text-end text-xs text-muted-foreground">
          {format(t.test.charsLeft, { count: WRITING_MAX_CHARS - writing.length })}
        </p>

        <fieldset className="mt-6">
          <legend className="font-bold text-foreground">{t.test.speakingQuestion}</legend>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {choices.map((label, i) => {
              const value = i + 1;
              const active = confidence === value;
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setConfidence(active ? null : value)}
                  className={cn(
                    "rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-colors",
                    active
                      ? "border-primary bg-secondary text-secondary-foreground"
                      : "border-border text-muted-foreground hover:bg-muted",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
        <Button variant="ghost" size="lg" onClick={() => onSubmit("", confidence)}>
          {t.test.skipWriting}
        </Button>
        <Button variant="hero" size="lg" onClick={() => onSubmit(writing, confidence)} disabled={writing.trim().length < 10}>
          {t.test.finish}
        </Button>
      </div>
    </div>
  );
}
