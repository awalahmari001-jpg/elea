import { useMemo, useState } from "react";
import { CheckCircle2, Sparkles, Star, Volume2 } from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ALPHABET_ENTRIES,
  ENCOURAGING_RETRY,
  POSITIVE_PRAISE,
  type AlphabetEntry,
} from "@/content/kids/alphabet-phonics-data";
import { playSpeech } from "@/hooks/use-speech";
import { LETTER_PHONICS_AUDIO, playLetterName, playLetterSound } from "@/lib/kids-phonics-audio";
import type { KidsProgressState } from "@/lib/kids-storage";
import { LetterTracingPad } from "./letter-tracing-pad";

type AlphabetGameMode = "listen-find" | "upper-lower" | "first-letter" | "missing-order";

export interface AlphabetStudioProps {
  progress: KidsProgressState;
  onMasterLetter: (letter: string) => void;
  onTraceLetter: (letter: string) => void;
  onGameWin: (gameId: string) => void;
}

export function AlphabetStudio({
  progress,
  onMasterLetter,
  onTraceLetter,
  onGameWin,
}: AlphabetStudioProps) {
  const { t, locale } = useI18n();
  const kw = t.kidsWorld;

  const [selectedLetter, setSelectedLetter] = useState<string>("A");
  const [gameMode, setGameMode] = useState<AlphabetGameMode>("listen-find");
  const [roundIdx, setRoundIdx] = useState(0);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  const entry: AlphabetEntry =
    ALPHABET_ENTRIES.find((e) => e.letter === selectedLetter) ?? ALPHABET_ENTRIES[0]!;

  const isMastered = progress.masteredLetters.includes(entry.letter);
  const isTraced = progress.tracedLetters.includes(entry.letter);

  // Deterministic round generator for all 4 Alphabet Mini-Games
  const currentRound = useMemo(() => {
    const idx = (roundIdx * 5 + 1) % ALPHABET_ENTRIES.length;
    const target = ALPHABET_ENTRIES[idx]!;
    const distractors = [
      ALPHABET_ENTRIES[(idx + 3) % 26]!,
      ALPHABET_ENTRIES[(idx + 9) % 26]!,
      ALPHABET_ENTRIES[(idx + 15) % 26]!,
    ];
    const options = [target, ...distractors].sort((a, b) => a.letter.localeCompare(b.letter));

    // Missing letter sequence (e.g., A, B, __, D)
    const seqStart = Math.min(22, (roundIdx * 3) % 23);
    const missingPos = (roundIdx % 2) + 1; // index 1 or 2 of 4 letters
    const sequence = [0, 1, 2, 3].map((offset) => ALPHABET_ENTRIES[seqStart + offset]!);
    const missingTarget = sequence[missingPos]!;
    const missingOptions = [
      missingTarget,
      ALPHABET_ENTRIES[(seqStart + 5) % 26]!,
      ALPHABET_ENTRIES[(seqStart + 10) % 26]!,
      ALPHABET_ENTRIES[(seqStart + 14) % 26]!,
    ].sort((a, b) => a.letter.localeCompare(b.letter));

    return {
      target,
      options,
      sequence,
      missingPos,
      missingTarget,
      missingOptions,
    };
  }, [roundIdx]);

  const handlePickOption = (pickedLetter: string, expectedLetter: string) => {
    if (pickedLetter === expectedLetter) {
      const praise = POSITIVE_PRAISE[roundIdx % POSITIVE_PRAISE.length]!;
      setFeedback({ ok: true, text: praise[locale] });
      onMasterLetter(expectedLetter);
      onGameWin(`alpha-${gameMode}`);
    } else {
      setFeedback({ ok: false, text: ENCOURAGING_RETRY[locale] });
    }
  };

  const nextRound = () => {
    setRoundIdx((r) => r + 1);
    setFeedback(null);
  };

  return (
    <div className="space-y-8">
      {/* Header & Name-vs-Sound Pedagogical Banner */}
      <div className="space-y-3">
        <h2 className="display-heading text-2xl font-extrabold text-foreground md:text-3xl">
          {kw.alphabetTitle}
        </h2>
        <p className="text-sm text-muted-foreground md:text-base">{kw.alphabetSubtitle}</p>
        <div className="flex items-start gap-3 rounded-2xl border-2 border-amber-400/50 bg-amber-500/10 p-4 text-xs md:text-sm">
          <span className="text-2xl" aria-hidden>
            🦉
          </span>
          <div>
            <p className="font-extrabold text-foreground">{kw.nameVsSoundTitle}</p>
            <p className="mt-0.5 text-muted-foreground">{kw.nameVsSoundNote}</p>
          </div>
        </div>
      </div>

      {/* Interactive A–Z Tile Grid */}
      <div
        className="grid grid-cols-6 gap-2 sm:grid-cols-9 md:grid-cols-13"
        role="group"
        aria-label="English Alphabet A to Z"
      >
        {ALPHABET_ENTRIES.map((item) => {
          const active = item.letter === entry.letter;
          const done = progress.masteredLetters.includes(item.letter);
          return (
            <button
              key={item.letter}
              type="button"
              onClick={() => {
                setSelectedLetter(item.letter);
                playLetterSound(item.letter, item.examples[0].word);
              }}
              dir="ltr"
              className={`relative flex flex-col items-center justify-center rounded-2xl border-2 py-2.5 font-extrabold transition-all hover:-translate-y-0.5 ${
                active
                  ? "border-primary bg-primary text-primary-foreground shadow-md scale-105"
                  : item.kind === "vowel"
                    ? "border-amber-400/70 bg-amber-500/15 text-foreground hover:bg-amber-500/25"
                    : "border-sky-400/50 bg-sky-500/10 text-foreground hover:bg-sky-500/20"
              }`}
            >
              <span className="text-lg leading-none">
                {item.letter}
                <span className="ms-0.5 text-sm opacity-80">{item.lower}</span>
              </span>
              {done && (
                <span className="mt-1 text-[10px]" aria-label="Mastered">
                  ⭐
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Focused Letter Interactive Stage + Tracing Pad */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-5 rounded-3xl border-2 border-foreground/85 bg-card p-6 shadow-ink lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge
                variant={entry.kind === "vowel" ? "default" : "secondary"}
                className={entry.kind === "vowel" ? "bg-amber-500 text-foreground" : ""}
              >
                {entry.kind === "vowel" ? kw.vowelPill : kw.consonantPill}
              </Badge>
              {isMastered && (
                <Badge variant="default" className="bg-emerald-600">
                  {kw.learnedBadge}
                </Badge>
              )}
            </div>
            <Button
              type="button"
              size="sm"
              variant={isMastered ? "secondary" : "default"}
              className="rounded-full font-bold"
              onClick={() => onMasterLetter(entry.letter)}
            >
              <Star className="me-1.5 size-4" aria-hidden />
              {kw.markLearnedBtn}
            </Button>
          </div>

          {/* Giant Animated Letter + Name vs Sound Controls */}
          <div className="grid items-center gap-5 sm:grid-cols-[0.85fr_1.15fr]">
            <div
              dir="ltr"
              className="flex flex-col items-center justify-center rounded-3xl border-2 border-primary/25 bg-gradient-to-br from-primary/10 via-background to-accent/20 py-7 text-center"
            >
              <div className="text-7xl font-black tracking-tight text-primary">
                {entry.letter} <span className="text-6xl text-foreground/85">{entry.lower}</span>
              </div>
              <div className="mt-3 flex gap-3 text-3xl" aria-hidden>
                {entry.examples.map((ex) => (
                  <span key={ex.word} className="transition-transform hover:scale-125">
                    {ex.emoji}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {/* Distinct Button 1: Letter NAME */}
              <div className="rounded-2xl border border-border bg-muted/40 p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-[11px] font-bold uppercase text-muted-foreground">
                      {kw.hearNameBtn}
                    </div>
                    <div
                      className="mt-0.5 font-mono text-base font-extrabold text-foreground"
                      dir="ltr"
                    >
                      {entry.letter} → {entry.letterNameIpa}
                    </div>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => playLetterName(entry.letter)}
                  >
                    <Volume2 className="me-1 size-4" aria-hidden />
                    {kw.hearNameBtn}
                  </Button>
                </div>
              </div>

              {/* Distinct Button 2: Letter SOUND */}
              <div className="rounded-2xl border-2 border-primary/35 bg-primary/8 p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-[11px] font-bold uppercase text-primary">
                      {kw.hearSoundBtn}
                    </div>
                    <div
                      className="mt-0.5 font-mono text-base font-extrabold text-primary"
                      dir="ltr"
                    >
                      {entry.mainSoundIpa}{" "}
                      <span className="text-xs font-sans font-semibold text-muted-foreground">
                        · {LETTER_PHONICS_AUDIO[entry.letter]?.phoneticHint}
                      </span>
                    </div>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="default"
                    className="rounded-full"
                    onClick={() => playLetterSound(entry.letter, entry.examples[0].word)}
                  >
                    <Volume2 className="me-1 size-4" aria-hidden />
                    {kw.hearSoundBtn}
                  </Button>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{entry.soundTip[locale]}</p>
              </div>
            </div>
          </div>

          {/* 3 Interactive Picture Examples */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {kw.examplesTitle}
            </h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {entry.examples.map((ex) => (
                <button
                  key={ex.word}
                  type="button"
                  onClick={() => playSpeech(`${ex.word}. ${ex.sentence}`, 0.85, "female")}
                  className="flex flex-col items-center rounded-2xl border border-border bg-muted/30 p-3.5 text-center transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/5"
                >
                  <span className="text-4xl" aria-hidden>
                    {ex.emoji}
                  </span>
                  <span className="mt-1.5 text-base font-extrabold text-foreground" dir="ltr">
                    <span className="text-primary underline decoration-2">{ex.word[0]}</span>
                    {ex.word.slice(1)}
                  </span>
                  <span className="text-[11px] font-semibold text-muted-foreground">
                    {ex.arabicWord}
                  </span>
                  <span className="mt-1 text-xs text-muted-foreground" dir="ltr">
                    “{ex.sentence}”
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Letter Tracing Pad */}
        <div className="lg:col-span-5">
          <LetterTracingPad
            letter={entry.letter}
            lower={entry.lower}
            hint={entry.tracingHint[locale]}
            traced={isTraced}
            onCompleteTrace={() => onTraceLetter(entry.letter)}
          />
        </div>
      </div>

      {/* 4 Interactive Alphabet Mini-Games */}
      <section className="space-y-4 rounded-3xl border-2 border-primary/25 bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 text-xl font-extrabold text-foreground">
            <Sparkles className="size-5 text-primary" aria-hidden />
            {kw.alphabetGamesTitle}
          </h3>
          <div className="flex flex-wrap gap-1.5" role="group">
            {(
              [
                { id: "listen-find", label: kw.gameListenFind },
                { id: "upper-lower", label: kw.gameUpperLower },
                { id: "first-letter", label: kw.gameFirstLetter },
                { id: "missing-order", label: kw.gameMissingOrder },
              ] as const
            ).map((m) => (
              <Button
                key={m.id}
                type="button"
                size="sm"
                variant={gameMode === m.id ? "default" : "outline"}
                className="rounded-full text-xs"
                onClick={() => {
                  setGameMode(m.id);
                  setFeedback(null);
                }}
              >
                {m.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-muted/35 p-5 text-center space-y-4">
          {gameMode === "listen-find" && (
            <>
              <Button
                type="button"
                size="lg"
                variant="accent"
                className="rounded-full font-bold"
                onClick={() =>
                  playLetterSound(currentRound.target.letter, currentRound.target.examples[0].word)
                }
              >
                <Volume2 className="me-2 size-5" aria-hidden />
                {kw.hearPromptBtn} ({currentRound.target.mainSoundIpa})
              </Button>
              <div className="mx-auto grid max-w-md grid-cols-4 gap-3" dir="ltr">
                {currentRound.options.map((opt) => (
                  <Button
                    key={opt.letter}
                    type="button"
                    size="lg"
                    variant="outline"
                    className="h-16 rounded-2xl text-2xl font-black"
                    onClick={() => handlePickOption(opt.letter, currentRound.target.letter)}
                  >
                    {opt.letter}
                  </Button>
                ))}
              </div>
            </>
          )}

          {gameMode === "upper-lower" && (
            <>
              <div className="text-5xl font-black text-primary" dir="ltr">
                {currentRound.target.letter} → ?
              </div>
              <div className="mx-auto grid max-w-md grid-cols-4 gap-3" dir="ltr">
                {currentRound.options.map((opt) => (
                  <Button
                    key={opt.lower}
                    type="button"
                    size="lg"
                    variant="outline"
                    className="h-16 rounded-2xl text-3xl font-extrabold"
                    onClick={() => handlePickOption(opt.letter, currentRound.target.letter)}
                  >
                    {opt.lower}
                  </Button>
                ))}
              </div>
            </>
          )}

          {gameMode === "first-letter" && (
            <>
              <div className="flex flex-col items-center gap-1">
                <span className="text-6xl" aria-hidden>
                  {currentRound.target.examples[0].emoji}
                </span>
                <p className="text-lg font-bold text-foreground" dir="ltr">
                  _ {currentRound.target.examples[0].word.slice(1)}
                </p>
              </div>
              <div className="mx-auto grid max-w-md grid-cols-4 gap-3" dir="ltr">
                {currentRound.options.map((opt) => (
                  <Button
                    key={opt.letter}
                    type="button"
                    size="lg"
                    variant="outline"
                    className="h-14 rounded-2xl text-2xl font-black"
                    onClick={() => handlePickOption(opt.letter, currentRound.target.letter)}
                  >
                    {opt.letter}
                  </Button>
                ))}
              </div>
            </>
          )}

          {gameMode === "missing-order" && (
            <>
              <div className="flex justify-center gap-3 text-3xl font-black" dir="ltr">
                {currentRound.sequence.map((item, idx) => (
                  <span
                    key={item.letter}
                    className={`grid size-14 place-items-center rounded-2xl border-2 ${
                      idx === currentRound.missingPos
                        ? "border-dashed border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-foreground"
                    }`}
                  >
                    {idx === currentRound.missingPos ? "?" : item.letter}
                  </span>
                ))}
              </div>
              <div className="mx-auto grid max-w-md grid-cols-4 gap-3" dir="ltr">
                {currentRound.missingOptions.map((opt) => (
                  <Button
                    key={opt.letter}
                    type="button"
                    size="lg"
                    variant="outline"
                    className="h-14 rounded-2xl text-2xl font-black"
                    onClick={() => handlePickOption(opt.letter, currentRound.missingTarget.letter)}
                  >
                    {opt.letter}
                  </Button>
                ))}
              </div>
            </>
          )}

          {feedback && (
            <div
              role="status"
              className={`mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
                feedback.ok
                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                  : "bg-amber-500/15 text-amber-800 dark:text-amber-200"
              }`}
            >
              {feedback.ok && <CheckCircle2 className="size-4" aria-hidden />}
              <span>{feedback.text}</span>
            </div>
          )}

          <div>
            <Button type="button" size="sm" variant="secondary" onClick={nextRound}>
              {kw.nextQuestionBtn}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
