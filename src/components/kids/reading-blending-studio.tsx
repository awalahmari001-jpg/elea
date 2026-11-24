import { useState } from "react";
import { Award, BookOpen, CheckCircle2, Lock, Sparkles, Volume2 } from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ENCOURAGING_RETRY, POSITIVE_PRAISE } from "@/content/kids/alphabet-phonics-data";
import {
  CVC_WORDS,
  FOUR_LETTER_WORDS,
  PROGRESSIVE_SENTENCES,
  READING_LADDER_STAGES,
  STAGE4_READING_PASSAGES,
  type DecodableWord,
} from "@/content/kids/articulation-reading-data";
import { playSpeech } from "@/hooks/use-speech";
import { playBlendedWord, playPhonemeSound } from "@/lib/kids-phonics-audio";
import { computeReadingDiagnostics, type KidsProgressState } from "@/lib/kids-storage";

type DecodingTab = "cvc" | "cvcc" | "ccvc" | "digraph";

export interface ReadingBlendingStudioProps {
  progress: KidsProgressState;
  onGameWin: (gameId: string) => void;
  onStageCheck: (stageNumber: number, passed: boolean) => void;
}

export function ReadingBlendingStudio({
  progress,
  onGameWin,
  onStageCheck,
}: ReadingBlendingStudioProps) {
  const { locale } = useI18n();
  const isAr = locale === "ar";

  // Modules 4-6: Blending & Segmentation state
  const [decodingTab, setDecodingTab] = useState<DecodingTab>("cvc");
  const [selectedWordId, setSelectedWordId] = useState<string>(CVC_WORDS[0]!.id);
  const [blended, setBlended] = useState(false);

  // Module 7: Progressive sentences & word-ordering activity
  const [sentenceStage, setSentenceStage] = useState<1 | 2 | 3>(1);
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [builtWords, setBuiltWords] = useState<string[]>([]);
  const [sentenceFeedback, setSentenceFeedback] = useState<{ ok: boolean; text: string } | null>(
    null,
  );

  // Stage 4: Illustrated Reading Passage
  const [passageIdx, setPassageIdx] = useState(0);
  const [passageAnswers, setPassageAnswers] = useState<Record<number, number>>({});

  // Module 8: 14-Stage Mastery-Gated Ladder
  const [activeStageNum, setActiveStageNum] = useState<number>(1);
  const [stageFeedback, setStageFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  const wordPool: DecodableWord[] =
    decodingTab === "cvc" ? CVC_WORDS : FOUR_LETTER_WORDS.filter((w) => w.kind === decodingTab);

  const currentWord = wordPool.find((w) => w.id === selectedWordId) ?? wordPool[0] ?? CVC_WORDS[0]!;

  const stageSentences = PROGRESSIVE_SENTENCES.filter((s) => s.stage === sentenceStage);
  const activeSentence = stageSentences[sentenceIdx % stageSentences.length] ?? stageSentences[0]!;
  const activePassage = STAGE4_READING_PASSAGES[passageIdx % STAGE4_READING_PASSAGES.length]!;
  const activeStage =
    READING_LADDER_STAGES.find((s) => s.stage === activeStageNum) ?? READING_LADDER_STAGES[0]!;

  const diagnostics = computeReadingDiagnostics(progress);

  const handleSelectDecodingTab = (tab: DecodingTab) => {
    setDecodingTab(tab);
    setBlended(false);
    const first = tab === "cvc" ? CVC_WORDS[0] : FOUR_LETTER_WORDS.find((w) => w.kind === tab);
    if (first) setSelectedWordId(first.id);
  };

  const handleBlendWord = () => {
    setBlended(true);
    playBlendedWord(currentWord.phonemes, currentWord.word);
    onGameWin(decodingTab === "cvc" ? "kids-cvc" : "kids-4letter");
    onGameWin("kids-blend");
  };

  const handleAddWordTile = (word: string) => {
    const next = [...builtWords, word];
    setBuiltWords(next);
    const expectedTokens = activeSentence.text.split(" ");
    if (next.length === expectedTokens.length) {
      const ok = next.join(" ") === activeSentence.text;
      if (ok) {
        setSentenceFeedback({ ok: true, text: POSITIVE_PRAISE[0]![locale] });
        playSpeech(activeSentence.text, 0.85, "female");
        onGameWin("kids-sentences");
      } else {
        setSentenceFeedback({ ok: false, text: ENCOURAGING_RETRY[locale] });
      }
    }
  };

  const handlePassageAnswer = (qIdx: number, optIdx: number) => {
    const next = { ...passageAnswers, [qIdx]: optIdx };
    setPassageAnswers(next);
    const allCorrect = activePassage.questions.every((q, idx) => next[idx] === q.correct);
    if (allCorrect) {
      onGameWin("kids-passage");
    }
  };

  const handleStageOptionClick = (optIdx: number) => {
    const passed = optIdx === activeStage.checkCorrect;
    onStageCheck(activeStage.stage, passed);
    if (passed) {
      setStageFeedback({
        ok: true,
        text: isAr
          ? `رائع! اجتزت المرحلة ${activeStage.stage} وحصلت على نجمتين! ⭐⭐`
          : `Awesome! You mastered Stage ${activeStage.stage} and earned 2 stars! ⭐⭐`,
      });
    } else {
      setStageFeedback({ ok: false, text: ENCOURAGING_RETRY[locale] });
    }
  };

  return (
    <div className="space-y-10">
      {/* MODULES 4, 5 & 6: Sound Blending, Segmentation Boxes, CVC & 4-Letter Words */}
      <section className="space-y-5 rounded-3xl border-2 border-foreground/85 bg-card p-6 shadow-ink">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="display-heading text-2xl font-extrabold text-foreground">
              {isAr
                ? "دمج الأصوات وقراءة كلمات من ٣ و٤ حروف"
                : "Sound Blending, CVC & 4-Letter Word Decoding"}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground md:text-sm">
              {isAr
                ? "اضغط على كل مربع صوتي لسماع الفونيم، ثم اضغط «ادمج الأصوات!» لتقرأ الكلمة كاملة!"
                : "Tap each phoneme box to hear its sound, then tap Blend Together to slide the sounds into a word!"}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5" role="group">
            {(
              [
                { id: "cvc", label: "CVC (3 Letters)" },
                { id: "cvcc", label: "CVCC (hand, milk)" },
                { id: "ccvc", label: "CCVC Blends (frog, stop)" },
                { id: "digraph", label: "Digraphs (sh, ch, th, ph)" },
              ] as const
            ).map((tab) => (
              <Button
                key={tab.id}
                type="button"
                size="sm"
                variant={decodingTab === tab.id ? "default" : "outline"}
                className="rounded-full text-xs font-bold"
                onClick={() => handleSelectDecodingTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Word Chips */}
        <div className="flex flex-wrap gap-2" dir="ltr">
          {wordPool.map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => {
                setSelectedWordId(w.id);
                setBlended(false);
              }}
              className={`inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1 text-sm font-extrabold transition-all ${
                w.id === currentWord.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-muted/40 text-foreground hover:border-primary/50"
              }`}
            >
              <span aria-hidden>{w.emoji}</span>
              <span>{w.word}</span>
            </button>
          ))}
        </div>

        {/* Animated Phoneme Sound Boxes -> Blended Word Stage */}
        <div className="rounded-3xl bg-gradient-to-br from-sky-500/10 via-background to-amber-500/10 p-6 text-center space-y-5">
          <div
            className={`flex items-center justify-center transition-all duration-500 ${
              blended ? "gap-1" : "gap-4"
            }`}
            dir="ltr"
          >
            {currentWord.tiles.map((tile, idx) => (
              <button
                key={`${currentWord.id}-${idx}`}
                type="button"
                onClick={() => {
                  playPhonemeSound(currentWord.phonemes[idx] ?? tile);
                  onGameWin("kids-segment");
                }}
                className={`flex flex-col items-center justify-center rounded-2xl border-2 px-5 py-3 transition-all hover:scale-105 ${
                  blended
                    ? "border-emerald-500 bg-emerald-500/15"
                    : "border-primary/40 bg-card shadow-sm"
                }`}
              >
                <span className="text-4xl font-black text-foreground">{tile}</span>
                <span className="mt-1 font-mono text-xs font-bold text-primary">
                  {currentWord.phonemes[idx]}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              type="button"
              size="lg"
              variant="default"
              className="rounded-full font-extrabold"
              onClick={handleBlendWord}
            >
              <Sparkles className="me-2 size-4" aria-hidden />
              {isAr ? "ادمج الأصوات واقرأ الكلمة!" : "Blend Together & Read!"}
            </Button>
            {blended && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="rounded-full"
                onClick={() => setBlended(false)}
              >
                {isAr ? "افصل الأصوات مجددًا" : "Segment Again"}
              </Button>
            )}
          </div>

          {blended && (
            <div className="mx-auto max-w-md rounded-2xl border border-emerald-500/40 bg-card p-4 shadow-xs">
              <div className="text-5xl" aria-hidden>
                {currentWord.emoji}
              </div>
              <div
                className="mt-1 text-3xl font-black text-emerald-700 dark:text-emerald-300"
                dir="ltr"
              >
                {currentWord.word.toUpperCase()}
              </div>
              <div className="text-xs font-bold text-muted-foreground">
                {currentWord.arabicMeaning}
              </div>
              <p className="mt-2 text-sm font-semibold text-foreground" dir="ltr">
                “{currentWord.sentence}”
              </p>
            </div>
          )}
        </div>
      </section>

      {/* MODULE 7: 4-Stage Progressive Sentence Reading + Illustrated Passages */}
      <section className="grid gap-6 lg:grid-cols-12">
        {/* Stages 1–3 Sentence Builder */}
        <div className="space-y-4 rounded-3xl border-2 border-primary/25 bg-card p-6 shadow-sm lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-extrabold text-foreground">
              {isAr
                ? "قراءة وبناء الجمل المتدرّجة (المراحل ١–٣)"
                : "Progressive Sentence Reading (Stages 1–3)"}
            </h3>
            <div className="flex gap-1.5">
              {([1, 2, 3] as const).map((st) => (
                <Button
                  key={st}
                  type="button"
                  size="sm"
                  variant={sentenceStage === st ? "default" : "outline"}
                  className="rounded-full text-xs"
                  onClick={() => {
                    setSentenceStage(st);
                    setSentenceIdx(0);
                    setBuiltWords([]);
                    setSentenceFeedback(null);
                  }}
                >
                  {isAr ? `المرحلة ${st}` : `Stage ${st}`}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-2xl bg-muted/35 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-4xl" aria-hidden>
                  {activeSentence.emoji}
                </span>
                <div>
                  <p className="text-base font-extrabold text-foreground" dir="ltr">
                    {activeSentence.text}
                  </p>
                  <p className="text-xs text-muted-foreground">{activeSentence.arabic}</p>
                </div>
              </div>
              <Button
                type="button"
                size="sm"
                variant="accent"
                className="rounded-full"
                onClick={() => playSpeech(activeSentence.text, 0.82, "female")}
              >
                <Volume2 className="me-1 size-4" aria-hidden />
                {isAr ? "استمع" : "Read Aloud"}
              </Button>
            </div>

            {/* Arrange Words Activity */}
            <div className="space-y-2 border-t border-border pt-3">
              <p className="text-xs font-bold text-muted-foreground">
                {isAr
                  ? "رتّب الكلمات لتكوين الجملة:"
                  : "Tap the words in order to build the sentence:"}
              </p>
              <div
                className="min-h-11 rounded-xl border border-dashed border-primary/40 bg-card px-3 py-2 text-sm font-bold text-primary"
                dir="ltr"
              >
                {builtWords.length > 0 ? builtWords.join(" ") : "..."}
              </div>
              <div className="flex flex-wrap gap-2" dir="ltr">
                {activeSentence.scrambledWords.map((w, idx) => (
                  <Button
                    key={`${activeSentence.id}-${idx}`}
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={builtWords.includes(w)}
                    onClick={() => handleAddWordTile(w)}
                  >
                    {w}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setBuiltWords([]);
                    setSentenceFeedback(null);
                  }}
                >
                  {isAr ? "إعادة الترتيب" : "Clear"}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setSentenceIdx((i) => i + 1);
                    setBuiltWords([]);
                    setSentenceFeedback(null);
                  }}
                >
                  {isAr ? "الجملة التالية ←" : "Next Sentence →"}
                </Button>
                {sentenceFeedback && (
                  <span
                    role="status"
                    className={`text-xs font-bold ${
                      sentenceFeedback.ok ? "text-emerald-600" : "text-amber-700"
                    }`}
                  >
                    {sentenceFeedback.text}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stage 4: Short Illustrated Reading Passage */}
        <div className="space-y-4 rounded-3xl border-2 border-emerald-500/35 bg-card p-6 shadow-sm lg:col-span-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="flex items-center gap-2 text-lg font-extrabold text-foreground">
              <BookOpen className="size-5 text-emerald-600" aria-hidden />
              {activePassage.title[locale]}
            </h3>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                setPassageIdx((i) => i + 1);
                setPassageAnswers({});
              }}
            >
              {isAr ? "قصة أخرى" : "Switch Story"}
            </Button>
          </div>

          <div className="rounded-2xl bg-emerald-500/10 p-4 text-center text-3xl" aria-hidden>
            {activePassage.emojiScene}
          </div>

          <div className="space-y-1.5 rounded-2xl border border-border bg-muted/25 p-4" dir="ltr">
            {activePassage.lines.map((line, i) => (
              <button
                key={i}
                type="button"
                onClick={() => playSpeech(line, 0.84, "female")}
                className="block w-full rounded-lg px-2 py-1 text-start text-sm font-semibold text-foreground hover:bg-primary/10"
              >
                🔊 {line}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {activePassage.questions.map((q, qIdx) => {
              const picked = passageAnswers[qIdx];
              const isRight = picked === q.correct;
              return (
                <div key={q.prompt} className="space-y-1.5 text-xs" dir="ltr">
                  <div className="font-bold text-foreground">
                    {qIdx + 1}. {q.prompt}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {q.options.map((opt, oIdx) => (
                      <Button
                        key={opt}
                        type="button"
                        size="sm"
                        variant={picked === oIdx ? (isRight ? "default" : "secondary") : "outline"}
                        className={
                          picked === oIdx && isRight ? "bg-emerald-600 text-xs" : "text-xs"
                        }
                        onClick={() => handlePassageAnswer(qIdx, oIdx)}
                      >
                        {opt}
                      </Button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MODULE 8 & MODULE 10: 14-Stage Mastery-Gated Reading Ladder + Reading Diagnostics */}
      <section className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-4 rounded-3xl border-2 border-primary/25 bg-card p-6 shadow-sm lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-extrabold text-foreground">
                <Award className="size-5 text-primary" aria-hidden />
                {isAr
                  ? "سُلّم القراءة المتدرّج (١٤ مرحلة ببوابة إتقان)"
                  : "14-Stage Mastery-Gated Reading Ladder"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isAr
                  ? "لا تُفتح المرحلة بالمشاهدة فقط — أجب عن تحدي الإتقان السريع لتحصل على نجمتين!"
                  : "Watching alone does not unlock a stage — pass each stage's quick mastery check!"}
              </p>
            </div>
            <Badge variant="default" dir="ltr">
              {diagnostics.stagesMasteredCount} / 14
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-7">
            {READING_LADDER_STAGES.map((st) => {
              const mastered = progress.readingStagesMastered.includes(st.stage);
              const selected = st.stage === activeStage.stage;
              return (
                <button
                  key={st.stage}
                  type="button"
                  onClick={() => {
                    setActiveStageNum(st.stage);
                    setStageFeedback(null);
                  }}
                  className={`flex flex-col items-center rounded-xl border-2 p-2 text-center text-xs font-bold transition-all ${
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : mastered
                        ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                        : "border-border bg-muted/35 text-muted-foreground"
                  }`}
                >
                  <span dir="ltr">#{st.stage}</span>
                  <span className="mt-0.5 text-[11px]">
                    {mastered ? "⭐" : <Lock className="mx-auto size-3 opacity-60" aria-hidden />}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Mastery Check */}
          <div className="space-y-3 rounded-2xl bg-muted/35 p-4">
            <div className="text-sm font-extrabold text-foreground">
              Stage {activeStage.stage}: {activeStage.title[locale]}
            </div>
            <p className="text-sm font-semibold text-primary" dir="ltr">
              {activeStage.checkQuestion}
            </p>
            <div className="flex flex-wrap gap-2" dir="ltr">
              {activeStage.checkOptions.map((opt, idx) => (
                <Button
                  key={opt}
                  type="button"
                  size="sm"
                  variant="outline"
                  className="font-bold"
                  onClick={() => handleStageOptionClick(idx)}
                >
                  {opt}
                </Button>
              ))}
            </div>
            {stageFeedback && (
              <div
                role="status"
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                  stageFeedback.ok
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                    : "bg-amber-500/15 text-amber-800 dark:text-amber-200"
                }`}
              >
                {stageFeedback.ok && <CheckCircle2 className="size-3.5" aria-hidden />}
                <span>{stageFeedback.text}</span>
              </div>
            )}
          </div>
        </div>

        {/* Module 10: Reading Assessment & Individual Progress Dashboard */}
        <div className="space-y-4 rounded-3xl border-2 border-border bg-card p-6 shadow-sm lg:col-span-5">
          <h3 className="text-lg font-extrabold text-foreground">
            {isAr ? "لوحة تقدّم القراءة والتشخيص الذكي" : "Reading Progress & Adaptive Diagnostics"}
          </h3>

          <div className="rounded-2xl border border-primary/30 bg-primary/8 p-3.5 text-xs leading-relaxed text-foreground">
            <strong className="text-primary">
              {isAr ? "توصية مخصّصة لك:" : "Next Targeted Focus:"}
            </strong>{" "}
            {diagnostics.targetedRecommendation[locale]}
          </div>

          <div className="grid grid-cols-2 gap-2.5 text-xs">
            {diagnostics.subskills.map((sub) => (
              <div key={sub.id} className="rounded-xl bg-muted/40 p-2.5">
                <div className="flex justify-between gap-1 text-[11px]">
                  <span className="truncate font-semibold text-foreground">
                    {sub.label[locale]}
                  </span>
                  <span className="font-mono font-bold text-primary" dir="ltr">
                    {sub.pct}%
                  </span>
                </div>
                <Progress value={sub.pct} className="mt-1.5 h-1.5" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
