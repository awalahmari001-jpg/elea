import { useMemo, useState } from "react";
import { CheckCircle2, Sparkles, Star, Volume2 } from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ALPHABET_ENTRIES,
  ENCOURAGING_RETRY,
  FIVE_VOWELS_DATA,
  MISSING_VOWEL_QUIZ,
  POSITIVE_PRAISE,
} from "@/content/kids/alphabet-phonics-data";
import { playSpeech } from "@/hooks/use-speech";
import { playLetterSound, playVowelSound } from "@/lib/kids-phonics-audio";
import type { KidsProgressState } from "@/lib/kids-storage";

type VcGameMode = "sort" | "missing-vowel" | "beg-end";

const BEG_END_ITEMS = [
  { word: "fish", emoji: "🐟", mode: "start" as const, target: "F", options: ["F", "B", "T", "M"] },
  { word: "ball", emoji: "⚽", mode: "start" as const, target: "B", options: ["P", "B", "S", "D"] },
  { word: "cat", emoji: "🐱", mode: "end" as const, target: "T", options: ["M", "T", "N", "P"] },
  { word: "sun", emoji: "☀️", mode: "end" as const, target: "N", options: ["N", "G", "B", "D"] },
  { word: "moon", emoji: "🌙", mode: "start" as const, target: "M", options: ["N", "M", "S", "F"] },
  { word: "dog", emoji: "🐶", mode: "end" as const, target: "G", options: ["T", "G", "P", "S"] },
];

export interface VowelsConsonantsStudioProps {
  progress: KidsProgressState;
  onPassVowel: (vowel: string) => void;
  onConsonantSortWin: () => void;
  onGameWin: (gameId: string) => void;
}

export function VowelsConsonantsStudio({
  progress,
  onPassVowel,
  onConsonantSortWin,
  onGameWin,
}: VowelsConsonantsStudioProps) {
  const { t, locale } = useI18n();
  const kw = t.kidsWorld;

  const [gameMode, setGameMode] = useState<VcGameMode>("sort");
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  const consonants = useMemo(() => ALPHABET_ENTRIES.filter((e) => e.kind === "consonant"), []);

  const sortLetter = ALPHABET_ENTRIES[(round * 4) % ALPHABET_ENTRIES.length]!;
  const missingItem = MISSING_VOWEL_QUIZ[round % MISSING_VOWEL_QUIZ.length]!;
  const begEndItem = BEG_END_ITEMS[round % BEG_END_ITEMS.length]!;

  const celebrate = (ok: boolean, onWin?: () => void) => {
    if (ok) {
      setFeedback({ ok: true, text: POSITIVE_PRAISE[round % POSITIVE_PRAISE.length]![locale] });
      onWin?.();
    } else {
      setFeedback({ ok: false, text: ENCOURAGING_RETRY[locale] });
    }
  };

  return (
    <div className="space-y-10">
      {/* MODULE 2.1: Meet the Five Vowels! */}
      <section className="space-y-4">
        <div>
          <h2 className="display-heading text-2xl font-extrabold text-foreground md:text-3xl">
            {kw.vowelsTitle}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground md:text-base">{kw.vowelsSubtitle}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {FIVE_VOWELS_DATA.map((v) => {
            const done = progress.vowelChecksPassed.includes(v.vowel);
            return (
              <article
                key={v.vowel}
                className={`flex flex-col justify-between rounded-3xl border-2 p-4 shadow-xs ${v.colorClass}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between" dir="ltr">
                    <span className="text-4xl font-black text-foreground">
                      {v.vowel} <span className="text-3xl opacity-75">{v.lower}</span>
                    </span>
                    {done && (
                      <Badge variant="default" className="bg-emerald-600 text-[10px]">
                        {kw.vowelDoneBadge}
                      </Badge>
                    )}
                  </div>

                  {/* Short Sound */}
                  <button
                    type="button"
                    onClick={() =>
                      playVowelSound(
                        v.vowel as "A" | "E" | "I" | "O" | "U",
                        "short",
                        v.shortWord,
                        v.shortSentence,
                      )
                    }
                    className="w-full rounded-2xl border border-border/80 bg-card p-3 text-start transition-colors hover:border-primary"
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground">
                      <span>{kw.shortSoundLabel}</span>
                      <span className="font-mono text-primary" dir="ltr">
                        {v.shortIpa}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-lg font-extrabold text-foreground" dir="ltr">
                        {v.shortEmoji} {v.shortWord}
                      </span>
                      <Volume2 className="size-4 text-primary" aria-hidden />
                    </div>
                  </button>

                  {/* Long Sound */}
                  <button
                    type="button"
                    onClick={() =>
                      playVowelSound(
                        v.vowel as "A" | "E" | "I" | "O" | "U",
                        "long",
                        v.longWord,
                        v.longSentence,
                      )
                    }
                    className="w-full rounded-2xl border border-border/80 bg-card p-3 text-start transition-colors hover:border-primary"
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground">
                      <span>{kw.longSoundLabel}</span>
                      <span className="font-mono text-primary" dir="ltr">
                        {v.longIpa}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-lg font-extrabold text-foreground" dir="ltr">
                        {v.longEmoji} {v.longWord}
                      </span>
                      <Volume2 className="size-4 text-primary" aria-hidden />
                    </div>
                  </button>

                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    {v.extraPatternNote[locale]}
                  </p>
                </div>

                <Button
                  type="button"
                  size="sm"
                  variant={done ? "secondary" : "default"}
                  className="mt-4 w-full rounded-full text-xs font-bold"
                  onClick={() => onPassVowel(v.vowel)}
                >
                  <Star className="me-1 size-3.5" aria-hidden />
                  {kw.markVowelBtn}
                </Button>
              </article>
            );
          })}
        </div>
      </section>

      {/* MODULE 2.2: Understanding the 21 Consonants */}
      <section className="space-y-4">
        <div>
          <h2 className="display-heading text-2xl font-extrabold text-foreground">
            {kw.consonantsTitle}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{kw.consonantsSubtitle}</p>
        </div>

        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5 md:grid-cols-7">
          {consonants.map((c) => (
            <button
              key={c.letter}
              type="button"
              onClick={() => playLetterSound(c.letter, c.examples[0].word)}
              className="flex flex-col items-center rounded-2xl border border-border bg-card p-3 text-center transition-all hover:-translate-y-0.5 hover:border-primary/60"
            >
              <span className="text-2xl font-black text-foreground" dir="ltr">
                {c.letter}
                <span className="ms-0.5 text-lg opacity-75">{c.lower}</span>
              </span>
              <span className="font-mono text-xs font-bold text-primary" dir="ltr">
                {c.mainSoundIpa}
              </span>
              <span className="mt-1 text-xs font-semibold text-foreground" dir="ltr">
                {c.examples[0].emoji} {c.examples[0].word}
              </span>
              <span
                className={`mt-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  c.voiced
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                    : "bg-sky-500/15 text-sky-700 dark:text-sky-300"
                }`}
              >
                {c.voiced ? kw.voicedBadge : kw.voicelessBadge}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* MODULE 2.3: Interactive Vowel & Consonant Games */}
      <section className="space-y-4 rounded-3xl border-2 border-primary/25 bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 text-xl font-extrabold text-foreground">
            <Sparkles className="size-5 text-primary" aria-hidden />
            {kw.vcGamesTitle}
          </h3>
          <div className="flex flex-wrap gap-1.5" role="group">
            {(
              [
                { id: "sort", label: kw.gameSortVC },
                { id: "missing-vowel", label: kw.gameMissingVowel },
                { id: "beg-end", label: kw.gameBegEndConsonant },
              ] as const
            ).map((g) => (
              <Button
                key={g.id}
                type="button"
                size="sm"
                variant={gameMode === g.id ? "default" : "outline"}
                className="rounded-full text-xs"
                onClick={() => {
                  setGameMode(g.id);
                  setFeedback(null);
                }}
              >
                {g.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-2xl bg-muted/35 p-5 text-center">
          {gameMode === "sort" && (
            <>
              <p className="text-sm font-bold text-muted-foreground">{kw.sortQuestion}</p>
              <div className="text-6xl font-black text-primary" dir="ltr">
                {sortLetter.letter} {sortLetter.lower}
              </div>
              <div className="flex justify-center gap-3">
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="rounded-2xl font-extrabold"
                  onClick={() => celebrate(sortLetter.kind === "vowel", () => onConsonantSortWin())}
                >
                  {kw.chooseVowelBtn}
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  className="rounded-2xl font-extrabold"
                  onClick={() =>
                    celebrate(sortLetter.kind === "consonant", () => onConsonantSortWin())
                  }
                >
                  {kw.chooseConsonantBtn}
                </Button>
              </div>
            </>
          )}

          {gameMode === "missing-vowel" && (
            <>
              <div className="flex flex-col items-center gap-1">
                <span className="text-6xl" aria-hidden>
                  {missingItem.emoji}
                </span>
                <div
                  className="font-mono text-4xl font-black tracking-widest text-foreground"
                  dir="ltr"
                >
                  {missingItem.pattern}
                </div>
                <p className="text-xs text-muted-foreground">{missingItem.hint[locale]}</p>
              </div>
              <div className="mx-auto flex max-w-sm justify-center gap-2.5" dir="ltr">
                {(["a", "e", "i", "o", "u"] as const).map((v) => (
                  <Button
                    key={v}
                    type="button"
                    size="lg"
                    variant="outline"
                    className="size-14 rounded-2xl text-2xl font-black"
                    onClick={() =>
                      celebrate(v === missingItem.missingVowel, () => {
                        onPassVowel(v.toUpperCase());
                        onGameWin("vc-missing-vowel");
                      })
                    }
                  >
                    {v}
                  </Button>
                ))}
              </div>
            </>
          )}

          {gameMode === "beg-end" && (
            <>
              <p className="text-sm font-bold text-muted-foreground">
                {begEndItem.mode === "start" ? kw.begEndQuestionStart : kw.begEndQuestionEnd}
              </p>
              <div className="flex flex-col items-center gap-1">
                <span className="text-6xl" aria-hidden>
                  {begEndItem.emoji}
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => playSpeech(begEndItem.word, 0.85, "female")}
                  dir="ltr"
                >
                  <Volume2 className="me-1 size-4" aria-hidden />
                  {begEndItem.word}
                </Button>
              </div>
              <div className="mx-auto grid max-w-sm grid-cols-4 gap-2.5" dir="ltr">
                {begEndItem.options.map((opt) => (
                  <Button
                    key={opt}
                    type="button"
                    size="lg"
                    variant="outline"
                    className="h-14 rounded-2xl text-2xl font-black"
                    onClick={() =>
                      celebrate(opt === begEndItem.target, () => onGameWin("vc-beg-end"))
                    }
                  >
                    {opt}
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
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => {
                setRound((r) => r + 1);
                setFeedback(null);
              }}
            >
              {kw.nextQuestionBtn}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
