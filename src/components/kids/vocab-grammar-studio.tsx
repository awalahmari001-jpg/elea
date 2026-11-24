import { useMemo, useState } from "react";
import { CheckCircle2, Sparkles, Star, Volume2 } from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ENCOURAGING_RETRY,
  POSITIVE_PRAISE,
  type KidsAgeGroupId,
} from "@/content/kids/alphabet-phonics-data";
import { KIDS_GRAMMAR_UNITS, KIDS_VOCAB_THEMES } from "@/content/kids/vocab-grammar-data";
import { playSpeech } from "@/hooks/use-speech";
import type { KidsProgressState } from "@/lib/kids-storage";

type SubTab = "vocab" | "grammar";

export interface VocabGrammarStudioProps {
  progress: KidsProgressState;
  onCompleteVocabTheme: (themeId: string) => void;
  onCompleteGrammarUnit: (unitId: string) => void;
  onGameWin: (gameId: string) => void;
}

export function VocabGrammarStudio({
  progress,
  onCompleteVocabTheme,
  onCompleteGrammarUnit,
  onGameWin,
}: VocabGrammarStudioProps) {
  const { locale } = useI18n();
  const isAr = locale === "ar";

  const [subTab, setSubTab] = useState<SubTab>("vocab");
  const [ageFilter, setAgeFilter] = useState<KidsAgeGroupId | "all">("all");
  const [selectedThemeId, setSelectedThemeId] = useState<string>(KIDS_VOCAB_THEMES[0]!.id);
  const [vocabQuizIdx, setVocabQuizIdx] = useState(0);
  const [vocabFeedback, setVocabFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  const [selectedGrammarId, setSelectedGrammarId] = useState<string>(KIDS_GRAMMAR_UNITS[0]!.id);
  const [grammarAnswers, setGrammarAnswers] = useState<Record<number, number>>({});

  const filteredThemes = useMemo(
    () =>
      ageFilter === "all"
        ? KIDS_VOCAB_THEMES
        : KIDS_VOCAB_THEMES.filter((th) => th.ageGroup === ageFilter),
    [ageFilter],
  );

  const activeTheme =
    filteredThemes.find((t) => t.id === selectedThemeId) ??
    filteredThemes[0] ??
    KIDS_VOCAB_THEMES[0]!;

  const quizTarget = activeTheme.words[vocabQuizIdx % activeTheme.words.length]!;
  const isThemeDone = progress.vocabThemesCompleted.includes(activeTheme.id);

  const filteredGrammar = useMemo(
    () =>
      ageFilter === "all"
        ? KIDS_GRAMMAR_UNITS
        : KIDS_GRAMMAR_UNITS.filter((g) => g.ageGroup === ageFilter),
    [ageFilter],
  );

  const activeGrammar =
    filteredGrammar.find((g) => g.id === selectedGrammarId) ??
    filteredGrammar[0] ??
    KIDS_GRAMMAR_UNITS[0]!;
  const isGrammarDone = progress.grammarUnitsCompleted.includes(activeGrammar.id);

  const handlePickVocabQuiz = (wordId: string) => {
    if (wordId === quizTarget.id) {
      setVocabFeedback({
        ok: true,
        text: POSITIVE_PRAISE[vocabQuizIdx % POSITIVE_PRAISE.length]![locale],
      });
      onGameWin(`vocab-${activeTheme.id}`);
      onCompleteVocabTheme(activeTheme.id);
    } else {
      setVocabFeedback({ ok: false, text: ENCOURAGING_RETRY[locale] });
    }
  };

  const handlePickGrammarAnswer = (qIdx: number, optIdx: number, correctIdx: number) => {
    setGrammarAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
    if (optIdx === correctIdx) {
      onGameWin(`grammar-${activeGrammar.id}-${qIdx}`);
      if (qIdx === 1) {
        onCompleteGrammarUnit(activeGrammar.id);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Mode Switcher + Age Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Vocabulary and Grammar">
          <Button
            type="button"
            role="tab"
            aria-selected={subTab === "vocab"}
            variant={subTab === "vocab" ? "default" : "outline"}
            className="rounded-full font-extrabold"
            onClick={() => setSubTab("vocab")}
          >
            🎨 {isAr ? "عالم المفردات المصوّرة (٣٠ موضوعًا)" : "30-Theme Picture Vocabulary World"}
          </Button>
          <Button
            type="button"
            role="tab"
            aria-selected={subTab === "grammar"}
            variant={subTab === "grammar" ? "default" : "outline"}
            className="rounded-full font-extrabold"
            onClick={() => setSubTab("grammar")}
          >
            🧩 {isAr ? "القواعد المرئية للأطفال (١٧ وحدة)" : "17 Visual Kids Grammar Adventures"}
          </Button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(
            [
              { id: "all", label: isAr ? "كل الأعمار" : "All Ages" },
              { id: "early-4-6", label: "🐣 4–6" },
              { id: "young-7-9", label: "🦊 7–9" },
              { id: "preteen-10-12", label: "🚀 10–12" },
            ] as const
          ).map((f) => (
            <Button
              key={f.id}
              type="button"
              size="sm"
              variant={ageFilter === f.id ? "secondary" : "ghost"}
              className="rounded-full text-xs font-bold"
              onClick={() => setAgeFilter(f.id)}
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      {/* SECTION A: 30-Theme Illustrated Vocabulary World */}
      {subTab === "vocab" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="display-heading text-2xl font-extrabold text-foreground md:text-3xl">
                {isAr
                  ? "عالم المفردات المصوّرة — ٣٠ موضوعًا ممتعًا"
                  : "Illustrated Vocabulary World — 30 Fun Themes"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {isAr
                  ? "اضغط على أي صورة لسماع الكلمة الإنجليزية والجملة، ثم العب «استمع واختر الصورة»!"
                  : "Tap any illustrated card to hear the English word and example sentence, then play Listen & Choose!"}
              </p>
            </div>
            <Badge variant="secondary" className="text-xs font-extrabold" dir="ltr">
              ⭐ {progress.vocabThemesCompleted.length}/30
            </Badge>
          </div>

          {/* 30 Theme Pill Browser */}
          <div className="flex flex-wrap gap-2">
            {filteredThemes.map((th) => {
              const active = th.id === activeTheme.id;
              const done = progress.vocabThemesCompleted.includes(th.id);
              return (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => {
                    setSelectedThemeId(th.id);
                    setVocabQuizIdx(0);
                    setVocabFeedback(null);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-xs font-extrabold transition-all ${
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-card text-foreground hover:border-primary/50"
                  }`}
                >
                  <span aria-hidden>{th.emoji}</span>
                  <span>
                    {th.number}. {th.title[locale]}
                  </span>
                  {done && <span aria-label="Completed">⭐</span>}
                </button>
              );
            })}
          </div>

          {/* Active Theme Visual Flashcards */}
          <section
            className={`space-y-5 rounded-3xl border-2 p-6 shadow-ink ${activeTheme.colorClass}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl" aria-hidden>
                  {activeTheme.emoji}
                </span>
                <div>
                  <h3 className="display-heading text-xl font-black text-foreground">
                    {activeTheme.title[locale]}
                  </h3>
                  <p className="text-xs font-semibold text-muted-foreground">
                    {isAr
                      ? `${activeTheme.words.length} كلمات سهلة للحفظ مع النطق والجمل`
                      : `${activeTheme.words.length} bite-sized words with audio & example sentences`}
                  </p>
                </div>
              </div>

              <Button
                type="button"
                size="sm"
                variant={isThemeDone ? "secondary" : "default"}
                className="rounded-full font-bold"
                onClick={() => onCompleteVocabTheme(activeTheme.id)}
              >
                <Star className="me-1.5 size-4" aria-hidden />
                {isThemeDone
                  ? isAr
                    ? "تم إتقان الموضوع ⭐"
                    : "Theme Mastered ⭐"
                  : isAr
                    ? "تعلّمت هذه الكلمات! ⭐"
                    : "I Learned These Words! ⭐"}
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {activeTheme.words.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => playSpeech(`${item.word}. ${item.sentence}`, 0.84, "female")}
                  className="group flex flex-col justify-between rounded-3xl border-2 border-foreground/15 bg-card p-5 text-start shadow-xs transition-all hover:-translate-y-1 hover:border-primary"
                >
                  <div className="flex items-start justify-between">
                    <span
                      className="text-5xl transition-transform group-hover:scale-110"
                      aria-hidden
                    >
                      {item.emoji}
                    </span>
                    <Volume2 className="size-5 text-primary" aria-hidden />
                  </div>
                  <div className="mt-4 space-y-1">
                    <div className="text-xl font-black text-foreground" dir="ltr">
                      {item.word}
                    </div>
                    <div className="text-xs font-bold text-primary">{item.meaning[locale]}</div>
                    <p className="pt-1 text-xs leading-snug text-muted-foreground" dir="ltr">
                      “{item.sentence}”
                    </p>
                    {isAr && (
                      <p className="text-[11px] text-muted-foreground">{item.arabicSentence}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Listen & Choose Picture Activity */}
            <div className="space-y-4 rounded-2xl border border-border bg-card/95 p-5 text-center">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="text-sm font-extrabold text-foreground">
                  {isAr
                    ? "🎯 لعبة سريعة: استمع واختر الصورة الصحيحة!"
                    : "🎯 Quick Activity: Listen & Choose the Right Picture!"}
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="accent"
                  className="rounded-full font-bold"
                  onClick={() =>
                    playSpeech(`${quizTarget.word}. ${quizTarget.sentence}`, 0.82, "female")
                  }
                >
                  <Volume2 className="me-1.5 size-4" aria-hidden />
                  {isAr ? `استمع للكلمة (${quizTarget.word})` : `Hear Word: "${quizTarget.word}"`}
                </Button>
              </div>

              <div className="mx-auto grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
                {activeTheme.words.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handlePickVocabQuiz(opt.id)}
                    className="flex flex-col items-center gap-1 rounded-2xl border-2 border-border bg-muted/30 p-3 transition-all hover:border-primary hover:scale-105"
                  >
                    <span className="text-4xl" aria-hidden>
                      {opt.emoji}
                    </span>
                    <span className="text-xs font-bold text-foreground" dir="ltr">
                      {opt.word}
                    </span>
                  </button>
                ))}
              </div>

              {vocabFeedback && (
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <p
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-extrabold ${
                      vocabFeedback.ok
                        ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200"
                        : "bg-amber-500/15 text-amber-800 dark:text-amber-200"
                    }`}
                  >
                    {vocabFeedback.ok && <CheckCircle2 className="size-4" aria-hidden />}
                    {vocabFeedback.text}
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full text-xs font-bold"
                    onClick={() => {
                      setVocabQuizIdx((i) => i + 1);
                      setVocabFeedback(null);
                    }}
                  >
                    {isAr ? "الكلمة التالية ←" : "Next Word →"}
                  </Button>
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {/* SECTION B: 17 Visual Kids Grammar Units */}
      {subTab === "grammar" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="display-heading text-2xl font-extrabold text-foreground md:text-3xl">
                {isAr
                  ? "القواعد المرئية للأطفال — ١٧ وحدة بالصور والقصص"
                  : "Visual Grammar for Kids — 17 Story & Picture Units"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {isAr
                  ? "نفهم القواعد من خلال الصور والحوارات القصيرة واللعب — بدون شروحات نظرية مملة!"
                  : "Discover grammar through animated visual scenes and mini-dialogues — no boring theory lectures!"}
              </p>
            </div>
            <Badge variant="secondary" className="text-xs font-extrabold" dir="ltr">
              ⭐ {progress.grammarUnitsCompleted.length}/17
            </Badge>
          </div>

          {/* 17 Grammar Unit Picker */}
          <div className="flex flex-wrap gap-2">
            {filteredGrammar.map((unit) => {
              const active = unit.id === activeGrammar.id;
              const done = progress.grammarUnitsCompleted.includes(unit.id);
              return (
                <button
                  key={unit.id}
                  type="button"
                  onClick={() => {
                    setSelectedGrammarId(unit.id);
                    setGrammarAnswers({});
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-xs font-extrabold transition-all ${
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-card text-foreground hover:border-primary/50"
                  }`}
                >
                  <span aria-hidden>{unit.emoji}</span>
                  <span>
                    {unit.number}. {unit.title[locale]}
                  </span>
                  {done && <span aria-label="Completed">⭐</span>}
                </button>
              );
            })}
          </div>

          {/* Active Visual Grammar Stage */}
          <section className="space-y-6 rounded-3xl border-2 border-foreground/85 bg-card p-6 shadow-ink">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <Badge variant="outline" className="mb-1.5 font-mono text-xs" dir="ltr">
                  {activeGrammar.pattern}
                </Badge>
                <h3 className="display-heading text-2xl font-black text-foreground">
                  {activeGrammar.emoji} {activeGrammar.title[locale]}
                </h3>
              </div>
              <Button
                type="button"
                size="sm"
                variant={isGrammarDone ? "secondary" : "default"}
                className="rounded-full font-bold"
                onClick={() => onCompleteGrammarUnit(activeGrammar.id)}
              >
                <Star className="me-1.5 size-4" aria-hidden />
                {isGrammarDone
                  ? isAr
                    ? "تم إتقان القاعدة ⭐"
                    : "Grammar Mastered ⭐"
                  : isAr
                    ? "فهمت هذه القاعدة! ⭐"
                    : "I Got This Pattern! ⭐"}
              </Button>
            </div>

            {/* Side-by-Side Animated Visual Contrast */}
            <div className="grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => playSpeech(activeGrammar.visualDemo.leftSentence, 0.84, "female")}
                className="flex flex-col items-center gap-3 rounded-3xl border-2 border-sky-400/50 bg-sky-500/10 p-6 text-center transition-all hover:scale-[1.01]"
              >
                <div className="text-5xl animate-bounce" aria-hidden>
                  {activeGrammar.visualDemo.leftVisual}
                </div>
                <div
                  className="flex items-center gap-2 text-lg font-black text-foreground"
                  dir="ltr"
                >
                  <span>{activeGrammar.visualDemo.leftSentence}</span>
                  <Volume2 className="size-4 text-primary" aria-hidden />
                </div>
                <div className="text-xs font-semibold text-muted-foreground">
                  {activeGrammar.visualDemo.leftArabic}
                </div>
              </button>

              <button
                type="button"
                onClick={() => playSpeech(activeGrammar.visualDemo.rightSentence, 0.84, "female")}
                className="flex flex-col items-center gap-3 rounded-3xl border-2 border-amber-400/50 bg-amber-500/10 p-6 text-center transition-all hover:scale-[1.01]"
              >
                <div className="text-5xl animate-bounce" aria-hidden>
                  {activeGrammar.visualDemo.rightVisual}
                </div>
                <div
                  className="flex items-center gap-2 text-lg font-black text-foreground"
                  dir="ltr"
                >
                  <span>{activeGrammar.visualDemo.rightSentence}</span>
                  <Volume2 className="size-4 text-primary" aria-hidden />
                </div>
                <div className="text-xs font-semibold text-muted-foreground">
                  {activeGrammar.visualDemo.rightArabic}
                </div>
              </button>
            </div>

            {/* Mini Dialogue with Audio */}
            <div className="space-y-2 rounded-2xl border border-border bg-muted/30 p-4">
              <div className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                {isAr ? "💬 حوار قصير في سياق حقيقي" : "💬 Short Real-Life Dialogue"}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {activeGrammar.dialogue.map((line, i) => (
                  <button
                    key={`${activeGrammar.id}-d-${i}`}
                    type="button"
                    onClick={() => playSpeech(line.line, 0.85, i % 2 === 0 ? "female" : "male")}
                    className="flex items-start gap-2.5 rounded-2xl border border-border bg-card p-3 text-start transition-colors hover:border-primary/50"
                  >
                    <span className="text-2xl" aria-hidden>
                      {line.emoji}
                    </span>
                    <div className="flex-1 text-xs" dir="ltr">
                      <div className="font-extrabold text-primary">{line.speaker}</div>
                      <p className="mt-0.5 font-semibold text-foreground">{line.line}</p>
                    </div>
                    <Volume2 className="size-4 shrink-0 text-primary" aria-hidden />
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Guided Practice */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-sm font-extrabold text-foreground">
                <Sparkles className="size-4 text-primary" aria-hidden />
                {isAr ? "جرّب بنفسك!" : "Try It Yourself!"}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {activeGrammar.questions.map((q, qIdx) => {
                  const chosen = grammarAnswers[qIdx];
                  const isCorrect = chosen === q.correctIndex;
                  return (
                    <div
                      key={`${activeGrammar.id}-q-${qIdx}`}
                      className="space-y-3 rounded-2xl border border-border bg-muted/20 p-4"
                    >
                      <div
                        className="flex items-center gap-2 text-sm font-extrabold text-foreground"
                        dir="ltr"
                      >
                        <span className="text-2xl" aria-hidden>
                          {q.emoji}
                        </span>
                        <span>{q.prompt}</span>
                      </div>
                      <div className="flex flex-wrap gap-2" dir="ltr">
                        {q.options.map((opt, optIdx) => (
                          <Button
                            key={opt}
                            type="button"
                            size="sm"
                            variant={
                              chosen === optIdx
                                ? optIdx === q.correctIndex
                                  ? "default"
                                  : "outline"
                                : "outline"
                            }
                            className="rounded-full font-bold"
                            onClick={() => handlePickGrammarAnswer(qIdx, optIdx, q.correctIndex)}
                          >
                            {opt}
                          </Button>
                        ))}
                      </div>
                      {chosen !== undefined && (
                        <p
                          className={`text-xs font-bold ${
                            isCorrect
                              ? "text-emerald-700 dark:text-emerald-300"
                              : "text-amber-700 dark:text-amber-300"
                          }`}
                        >
                          {isCorrect
                            ? `⭐ ${POSITIVE_PRAISE[qIdx % POSITIVE_PRAISE.length]![locale]} ${q.hint[locale]}`
                            : `${ENCOURAGING_RETRY[locale]} (${q.hint[locale]})`}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
