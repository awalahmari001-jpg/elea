import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Gamepad2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Star,
  Tv,
  Volume2,
} from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  ENCOURAGING_RETRY,
  POSITIVE_PRAISE,
  type KidsAgeGroupId,
} from "@/content/kids/alphabet-phonics-data";
import {
  KIDS_ANIMATED_VIDEOS,
  KIDS_MASCOTS,
  KIDS_MEMORY_PAIRS,
  KIDS_MISSING_LETTER_ITEMS,
  KIDS_SENTENCE_ORDER_GAMES,
  KIDS_SOUND_RECOGNITION_ITEMS,
  KIDS_SPELLING_CHALLENGES,
  KIDS_UNSCRAMBLE_ITEMS,
} from "@/content/kids/videos-games-data";
import { playSpeech, stopSpeech } from "@/hooks/use-speech";
import { playPhonemeSound } from "@/lib/kids-phonics-audio";
import type { KidsProgressState } from "@/lib/kids-storage";

type SubMode = "videos" | "games";
type GameType =
  | "picture-match"
  | "memory"
  | "listen-choose"
  | "missing-letter"
  | "unscramble"
  | "sentence-order"
  | "sound-recognition"
  | "spelling";

export interface VideosGamesStudioProps {
  progress: KidsProgressState;
  initialSubMode?: SubMode;
  onWatchVideo: (videoId: string) => void;
  onGameWin: (gameId: string) => void;
}

export function VideosGamesStudio({
  progress,
  initialSubMode = "videos",
  onWatchVideo,
  onGameWin,
}: VideosGamesStudioProps) {
  const { locale } = useI18n();
  const isAr = locale === "ar";

  const [subMode, setSubMode] = useState<SubMode>(initialSubMode);
  const [ageFilter, setAgeFilter] = useState<KidsAgeGroupId | "all">("all");

  // Animated 6-Part Video Theater state
  const [selectedVideoId, setSelectedVideoId] = useState<string>(KIDS_ANIMATED_VIDEOS[0]!.id);
  const [stageIdx, setStageIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showArabicCaptions, setShowArabicCaptions] = useState(true);
  const [videoPracticeChoice, setVideoPracticeChoice] = useState<number | null>(null);

  // Kids Learning Games Arcade state
  const [activeGame, setActiveGame] = useState<GameType>("picture-match");
  const [round, setRound] = useState(0);
  const [gameFeedback, setGameFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  // Memory cards state
  const memoryDeck = useMemo(
    () =>
      KIDS_MEMORY_PAIRS.flatMap((pair) => [
        { uid: `${pair.id}-img`, pairId: pair.id, display: pair.emoji, isEmoji: true },
        { uid: `${pair.id}-txt`, pairId: pair.id, display: pair.word, isEmoji: false },
      ]).sort((a, b) => a.uid.localeCompare(b.uid)),
    [],
  );
  const [flippedUids, setFlippedUids] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  // Unscramble / Sentence Order / Spelling inputs
  const [builtLetters, setBuiltLetters] = useState<string[]>([]);
  const [builtSentence, setBuiltSentence] = useState<string[]>([]);
  const [spellingInput, setSpellingInput] = useState("");

  const visibleVideos = useMemo(
    () =>
      ageFilter === "all"
        ? KIDS_ANIMATED_VIDEOS
        : KIDS_ANIMATED_VIDEOS.filter((v) => v.ageGroup === ageFilter),
    [ageFilter],
  );

  const activeVideo =
    visibleVideos.find((v) => v.id === selectedVideoId) ??
    visibleVideos[0] ??
    KIDS_ANIMATED_VIDEOS[0]!;
  const currentStage = activeVideo.stages[stageIdx] ?? activeVideo.stages[0]!;
  const mascot = KIDS_MASCOTS[currentStage.character];
  const isVideoWatched = progress.videosWatched.includes(activeVideo.id);

  // Auto-advance theater narration when playing
  useEffect(() => {
    if (!isPlaying) return;
    playSpeech(
      currentStage.speechText,
      0.84,
      currentStage.character === "omar" ? "male" : "female",
    );
    if (stageIdx >= 5) {
      onWatchVideo(activeVideo.id);
      const doneTimer = window.setTimeout(() => setIsPlaying(false), 4500);
      return () => window.clearTimeout(doneTimer);
    }
    if (currentStage.stage === "practice") {
      // Pause at Stage 5 so child can answer the interactive question!
      setIsPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setStageIdx((s) => Math.min(5, s + 1));
    }, 4800);
    return () => window.clearTimeout(timer);
  }, [isPlaying, stageIdx, activeVideo.id, currentStage, onWatchVideo]);

  useEffect(() => {
    return () => stopSpeech();
  }, []);

  const handleSelectVideo = (videoId: string) => {
    stopSpeech();
    setIsPlaying(false);
    setSelectedVideoId(videoId);
    setStageIdx(0);
    setVideoPracticeChoice(null);
  };

  const handleVideoPracticeAnswer = (optIdx: number) => {
    if (!currentStage.practiceCheck) return;
    setVideoPracticeChoice(optIdx);
    if (optIdx === currentStage.practiceCheck.correctIndex) {
      onGameWin(`video-check-${activeVideo.id}`);
      onWatchVideo(activeVideo.id);
    }
  };

  const resetGameRound = (nextRound: number) => {
    setRound(nextRound);
    setGameFeedback(null);
    setBuiltLetters([]);
    setBuiltSentence([]);
    setSpellingInput("");
  };

  const celebrateGame = (ok: boolean, gameKey: string) => {
    if (ok) {
      setGameFeedback({ ok: true, text: POSITIVE_PRAISE[round % POSITIVE_PRAISE.length]![locale] });
      onGameWin(gameKey);
    } else {
      setGameFeedback({ ok: false, text: ENCOURAGING_RETRY[locale] });
    }
  };

  const handleFlipMemory = (uid: string, pairId: string) => {
    if (matchedPairs.includes(pairId) || flippedUids.includes(uid) || flippedUids.length >= 2) {
      return;
    }
    const nextFlipped = [...flippedUids, uid];
    setFlippedUids(nextFlipped);
    if (nextFlipped.length === 2) {
      const firstCard = memoryDeck.find((c) => c.uid === nextFlipped[0]);
      const secondCard = memoryDeck.find((c) => c.uid === nextFlipped[1]);
      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        const nextMatched = [...matchedPairs, firstCard.pairId];
        setMatchedPairs(nextMatched);
        setFlippedUids([]);
        celebrateGame(true, "kids-game-memory");
      } else {
        window.setTimeout(() => setFlippedUids([]), 750);
      }
    }
  };

  const unscrambleItem = KIDS_UNSCRAMBLE_ITEMS[round % KIDS_UNSCRAMBLE_ITEMS.length]!;
  const missingItem = KIDS_MISSING_LETTER_ITEMS[round % KIDS_MISSING_LETTER_ITEMS.length]!;
  const sentenceItem = KIDS_SENTENCE_ORDER_GAMES[round % KIDS_SENTENCE_ORDER_GAMES.length]!;
  const spellingItem = KIDS_SPELLING_CHALLENGES[round % KIDS_SPELLING_CHALLENGES.length]!;
  const soundItem = KIDS_SOUND_RECOGNITION_ITEMS[round % KIDS_SOUND_RECOGNITION_ITEMS.length]!;
  const matchTarget = KIDS_MEMORY_PAIRS[round % KIDS_MEMORY_PAIRS.length]!;

  return (
    <div className="space-y-8">
      {/* Top Switcher: Animated Video Lessons vs Kids Learning Games Arcade */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Videos and Games">
          <Button
            type="button"
            role="tab"
            aria-selected={subMode === "videos"}
            variant={subMode === "videos" ? "default" : "outline"}
            className="rounded-full font-extrabold"
            onClick={() => setSubMode("videos")}
          >
            <Tv className="me-1.5 size-4" aria-hidden />
            {isAr ? "مكتبة الفيديو التعليمي المتحرك (١٢)" : "Animated Video Lessons (12)"}
          </Button>
          <Button
            type="button"
            role="tab"
            aria-selected={subMode === "games"}
            variant={subMode === "games" ? "default" : "outline"}
            className="rounded-full font-extrabold"
            onClick={() => {
              setIsPlaying(false);
              stopSpeech();
              setSubMode("games");
            }}
          >
            <Gamepad2 className="me-1.5 size-4" aria-hidden />
            {isAr ? "صالة ألعاب التعلّم (٨ ألعاب)" : "Learning Games Arcade (8 Games)"}
          </Button>
        </div>

        {subMode === "videos" && (
          <div className="flex flex-wrap gap-1.5">
            {(
              [
                { id: "all", label: isAr ? "كل الأعمار" : "All Ages" },
                { id: "early-4-6", label: "🐣 4–6 (1–3m)" },
                { id: "young-7-9", label: "🦊 7–9 (2–5m)" },
                { id: "preteen-10-12", label: "🚀 10–12 (3–7m)" },
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
        )}
      </div>

      {/* SECTION A: ANIMATED VIDEO LESSONS LIBRARY (6-Part ESL Pedagogical Theater) */}
      {subMode === "videos" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="display-heading text-2xl font-extrabold text-foreground md:text-3xl">
                {isAr ? "مكتبة دروس الفيديو المتحرك للأطفال" : "Animated Video Lessons Library"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {isAr
                  ? "دروس فيديو تعليمية أصلية مع Pip ولينا وعمر وميمي — كل درس يتبع ٦ مراحل تعليمية ممتعة!"
                  : "Original ESL cartoon lessons starring Pip, Lina, Omar & Mimi — every lesson follows our 6-part teaching structure!"}
              </p>
            </div>
            <Badge variant="secondary" className="text-xs font-extrabold" dir="ltr">
              🎬 {progress.videosWatched.length}/{KIDS_ANIMATED_VIDEOS.length}
            </Badge>
          </div>

          {/* 12 Video Category Selector Cards */}
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {visibleVideos.map((vid) => {
              const active = vid.id === activeVideo.id;
              const watched = progress.videosWatched.includes(vid.id);
              return (
                <button
                  key={vid.id}
                  type="button"
                  onClick={() => handleSelectVideo(vid.id)}
                  className={`flex items-start gap-2.5 rounded-2xl border-2 p-3 text-start transition-all ${
                    active
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <span className="text-2xl" aria-hidden>
                    {vid.emoji}
                  </span>
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center justify-between gap-1 text-[10px] font-bold text-primary">
                      <span className="truncate">{vid.categoryLabel[locale]}</span>
                      <span dir="ltr">{vid.durationLabel}</span>
                    </div>
                    <div className="line-clamp-2 text-xs font-extrabold text-foreground">
                      {vid.title[locale]}
                    </div>
                    {watched && (
                      <span className="inline-block text-[10px] font-bold text-emerald-600">
                        ⭐ {isAr ? "تمت المشاهدة" : "Watched"}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive 6-Stage Animated ESL Video Theater */}
          <section className="overflow-hidden rounded-3xl border-2 border-foreground/85 bg-card shadow-ink">
            {/* Animated Scene Viewport */}
            <div className={`relative bg-gradient-to-br ${currentStage.backdropClass} p-6 md:p-10`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge variant="default" className="font-bold">
                  {currentStage.stageTitle[locale]}
                </Badge>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-card/85 text-xs font-bold" dir="ltr">
                    ⏱ {activeVideo.durationLabel}
                  </Badge>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full bg-card/85 text-xs font-bold"
                    onClick={() => setShowArabicCaptions((v) => !v)}
                  >
                    {showArabicCaptions
                      ? isAr
                        ? "إخفاء الترجمة"
                        : "Hide AR Helper"
                      : isAr
                        ? "إظهار الترجمة"
                        : "Show AR Helper"}
                  </Button>
                </div>
              </div>

              {/* Animated Character + Visual Props Stage */}
              <div className="my-6 flex flex-col items-center gap-5 text-center">
                <div className="flex flex-wrap items-center justify-center gap-5">
                  <div
                    className={`flex flex-col items-center rounded-3xl border-2 px-5 py-3 shadow-sm ${mascot.color} ${
                      isPlaying ? "animate-bounce" : ""
                    }`}
                  >
                    <span className="text-6xl" aria-hidden>
                      {mascot.emoji}
                    </span>
                    <span className="mt-1 text-xs font-black text-foreground">{mascot.name}</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {currentStage.sceneEmojis.map((em, idx) => (
                      <span
                        key={`${activeVideo.id}-${stageIdx}-${idx}`}
                        className="rounded-2xl bg-card/85 px-4 py-3 text-4xl shadow-xs transition-transform hover:scale-110"
                        aria-hidden
                      >
                        {em}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Speech Bubble Caption */}
                <div className="max-w-2xl space-y-1.5 rounded-3xl border-2 border-foreground/15 bg-card/95 px-6 py-4 shadow-sm">
                  <p className="text-base font-extrabold text-foreground md:text-lg" dir="ltr">
                    “{currentStage.englishCaption}”
                  </p>
                  {showArabicCaptions && (
                    <p className="text-xs font-semibold text-muted-foreground md:text-sm">
                      {currentStage.arabicHelper}
                    </p>
                  )}
                </div>

                {/* Stage 5 Interactive In-Video Practice Check */}
                {currentStage.practiceCheck && (
                  <div className="w-full max-w-lg space-y-3 rounded-2xl border-2 border-primary/40 bg-card p-4">
                    <div className="text-sm font-extrabold text-foreground" dir="ltr">
                      🎯 {currentStage.practiceCheck.question}
                    </div>
                    <div className="flex flex-wrap justify-center gap-2" dir="ltr">
                      {currentStage.practiceCheck.options.map((opt, idx) => (
                        <Button
                          key={opt}
                          type="button"
                          size="sm"
                          variant={videoPracticeChoice === idx ? "default" : "outline"}
                          className="rounded-full font-bold"
                          onClick={() => handleVideoPracticeAnswer(idx)}
                        >
                          {opt}
                        </Button>
                      ))}
                    </div>
                    {videoPracticeChoice !== null && (
                      <p
                        className={`text-xs font-extrabold ${
                          videoPracticeChoice === currentStage.practiceCheck.correctIndex
                            ? "text-emerald-700 dark:text-emerald-300"
                            : "text-amber-700 dark:text-amber-300"
                        }`}
                      >
                        {videoPracticeChoice === currentStage.practiceCheck.correctIndex
                          ? `⭐ ${POSITIVE_PRAISE[0]![locale]}`
                          : ENCOURAGING_RETRY[locale]}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Video Player Controls & 6-Stage Chapter Bar */}
            <div className="space-y-4 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="hero"
                    className="rounded-full font-extrabold"
                    onClick={() => {
                      if (isPlaying) {
                        setIsPlaying(false);
                        stopSpeech();
                      } else {
                        setIsPlaying(true);
                      }
                    }}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="me-1.5 size-4" aria-hidden />
                        {isAr ? "إيقاف مؤقت" : "Pause Lesson"}
                      </>
                    ) : (
                      <>
                        <Play className="me-1.5 size-4" aria-hidden />
                        {isAr ? "تشغيل الفيديو التعليمي" : "Play Animated Lesson"}
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-full font-bold"
                    onClick={() => playSpeech(currentStage.speechText, 0.78, "female")}
                  >
                    <Volume2 className="me-1 size-4" aria-hidden />
                    {isAr ? "استمع ببطء" : "Listen Slowly"}
                  </Button>
                </div>

                <Button
                  type="button"
                  size="sm"
                  variant={isVideoWatched ? "secondary" : "default"}
                  className="rounded-full font-bold"
                  onClick={() => onWatchVideo(activeVideo.id)}
                >
                  <Star className="me-1 size-4" aria-hidden />
                  {isVideoWatched
                    ? isAr
                      ? "تم إكمال الفيديو ⭐"
                      : "Video Completed ⭐"
                    : isAr
                      ? "أكملت هذا الفيديو! ⭐"
                      : "Finish & Earn Star ⭐"}
                </Button>
              </div>

              <Progress value={Math.round(((stageIdx + 1) / 6) * 100)} className="h-2" />

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                {activeVideo.stages.map((st, idx) => (
                  <button
                    key={st.stage}
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      stopSpeech();
                      setStageIdx(idx);
                      setVideoPracticeChoice(null);
                    }}
                    className={`rounded-xl border px-2.5 py-2 text-start text-[11px] font-bold transition-colors ${
                      idx === stageIdx
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-muted/30 text-foreground hover:border-primary/50"
                    }`}
                  >
                    {st.stageTitle[locale]}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* SECTION B: KIDS LEARNING GAMES ARCADE (8 Stress-Free Games, Zero Timers!) */}
      {subMode === "games" && (
        <div className="space-y-6">
          <div>
            <h2 className="display-heading text-2xl font-extrabold text-foreground md:text-3xl">
              {isAr
                ? "صالة ألعاب تعلّم الإنجليزية — ٨ ألعاب تفاعلية!"
                : "Kids Learning Games Arcade — 8 Fun Games!"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {isAr
                ? "العب بهدوء دون مؤقّتات توتّر، واجمع النجوم الذهبية مع كل جولة ناجحة!"
                : "Play at your own pace with zero stressful timers — earn shiny gold stars with every win!"}
            </p>
          </div>

          {/* 8 Game Mode Selector Buttons */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Kids Learning Games">
            {(
              [
                {
                  id: "picture-match",
                  label: isAr ? "🖼️ طابق الصورة والكلمة" : "🖼️ Picture-Word Match",
                },
                { id: "memory", label: isAr ? "🃏 بطاقات الذاكرة" : "🃏 Memory Cards" },
                { id: "listen-choose", label: isAr ? "🎧 استمع واختر" : "🎧 Listen & Choose" },
                {
                  id: "missing-letter",
                  label: isAr ? "🔤 أكمل الحرف الناقص" : "🔤 Fill Missing Letter",
                },
                {
                  id: "unscramble",
                  label: isAr ? "🔀 رتّب حروف الكلمة" : "🔀 Unscramble the Word",
                },
                { id: "sentence-order", label: isAr ? "📝 رتّب الجملة" : "📝 Sentence Ordering" },
                {
                  id: "sound-recognition",
                  label: isAr ? "🔊 تمييز الصوت" : "🔊 Sound Recognition",
                },
                { id: "spelling", label: isAr ? "✍️ تحدي التهجئة" : "✍️ Spelling Challenge" },
              ] as const
            ).map((g) => (
              <Button
                key={g.id}
                type="button"
                size="sm"
                variant={activeGame === g.id ? "default" : "outline"}
                className="rounded-full text-xs font-extrabold"
                onClick={() => {
                  setActiveGame(g.id);
                  resetGameRound(0);
                }}
              >
                {g.label}
              </Button>
            ))}
          </div>

          {/* Active Game Stage */}
          <section className="space-y-5 rounded-3xl border-2 border-foreground/85 bg-card p-6 text-center shadow-ink">
            {/* Game 1: Picture-Word Match */}
            {activeGame === "picture-match" && (
              <div className="space-y-4">
                <div className="text-7xl" aria-hidden>
                  {matchTarget.emoji}
                </div>
                <p className="text-sm font-bold text-muted-foreground">
                  {isAr
                    ? "اختر الكلمة الإنجليزية المناسبة لهذه الصورة:"
                    : "Tap the English word that matches this picture:"}
                </p>
                <div className="mx-auto grid max-w-md grid-cols-3 gap-3" dir="ltr">
                  {KIDS_MEMORY_PAIRS.slice(0, 6)
                    .filter((p) => p.id === matchTarget.id || p.id !== matchTarget.id)
                    .slice(0, 3)
                    .some((p) => p.id === matchTarget.id)
                    ? KIDS_MEMORY_PAIRS.slice(0, 3).map((opt) => (
                        <Button
                          key={opt.id}
                          type="button"
                          size="lg"
                          variant="outline"
                          className="h-14 rounded-2xl text-lg font-black"
                          onClick={() =>
                            celebrateGame(opt.id === matchTarget.id, "kids-game-match")
                          }
                        >
                          {opt.word}
                        </Button>
                      ))
                    : [matchTarget, KIDS_MEMORY_PAIRS[0]!, KIDS_MEMORY_PAIRS[1]!].map((opt) => (
                        <Button
                          key={opt.id}
                          type="button"
                          size="lg"
                          variant="outline"
                          className="h-14 rounded-2xl text-lg font-black"
                          onClick={() =>
                            celebrateGame(opt.id === matchTarget.id, "kids-game-match")
                          }
                        >
                          {opt.word}
                        </Button>
                      ))}
                </div>
              </div>
            )}

            {/* Game 2: Memory Cards Flip */}
            {activeGame === "memory" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-muted-foreground">
                    {isAr
                      ? `الأزواج المتطابقة: ${matchedPairs.length}/${KIDS_MEMORY_PAIRS.length}`
                      : `Matched Pairs: ${matchedPairs.length}/${KIDS_MEMORY_PAIRS.length}`}
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setMatchedPairs([]);
                      setFlippedUids([]);
                      setGameFeedback(null);
                    }}
                  >
                    <RotateCcw className="me-1 size-3.5" aria-hidden />
                    {isAr ? "إعادة اللعب" : "Reset Cards"}
                  </Button>
                </div>
                <div className="mx-auto grid max-w-xl grid-cols-3 gap-3 sm:grid-cols-4" dir="ltr">
                  {memoryDeck.map((card) => {
                    const revealed =
                      matchedPairs.includes(card.pairId) || flippedUids.includes(card.uid);
                    return (
                      <button
                        key={card.uid}
                        type="button"
                        onClick={() => handleFlipMemory(card.uid, card.pairId)}
                        className={`flex h-20 items-center justify-center rounded-2xl border-2 text-lg font-black transition-all ${
                          matchedPairs.includes(card.pairId)
                            ? "border-emerald-500 bg-emerald-500/15"
                            : revealed
                              ? "border-primary bg-primary/10"
                              : "border-border bg-amber-500/15 hover:border-primary"
                        }`}
                      >
                        {revealed ? (
                          <span className={card.isEmoji ? "text-3xl" : "text-base"}>
                            {card.display}
                          </span>
                        ) : (
                          <span className="text-2xl" aria-hidden>
                            ⭐
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Game 3: Listen & Choose */}
            {activeGame === "listen-choose" && (
              <div className="space-y-4">
                <Button
                  type="button"
                  size="lg"
                  variant="accent"
                  className="rounded-full font-extrabold"
                  onClick={() => playSpeech(matchTarget.word, 0.82, "female")}
                >
                  <Volume2 className="me-2 size-5" aria-hidden />
                  {isAr
                    ? `استمع واختر الصورة (${matchTarget.word})`
                    : `Listen & Pick Picture ("${matchTarget.word}")`}
                </Button>
                <div className="mx-auto grid max-w-lg grid-cols-3 gap-3">
                  {KIDS_MEMORY_PAIRS.slice(0, 6).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => celebrateGame(opt.id === matchTarget.id, "kids-game-listen")}
                      className="flex flex-col items-center gap-1 rounded-2xl border-2 border-border bg-muted/30 p-4 text-4xl hover:border-primary hover:scale-105 transition-all"
                      aria-label={opt.word}
                    >
                      {opt.emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Game 4: Fill Missing Letter */}
            {activeGame === "missing-letter" && (
              <div className="space-y-4">
                <div className="text-6xl" aria-hidden>
                  {missingItem.emoji}
                </div>
                <div
                  className="font-mono text-4xl font-black tracking-widest text-primary"
                  dir="ltr"
                >
                  {missingItem.display}
                </div>
                <div className="mx-auto flex max-w-sm flex-wrap justify-center gap-3" dir="ltr">
                  {missingItem.options.map((opt) => (
                    <Button
                      key={opt}
                      type="button"
                      size="lg"
                      variant="outline"
                      className="h-14 min-w-16 rounded-2xl text-2xl font-black"
                      onClick={() =>
                        celebrateGame(opt === missingItem.missing, "kids-game-missing")
                      }
                    >
                      {opt}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Game 5: Unscramble the Word */}
            {activeGame === "unscramble" && (
              <div className="space-y-4">
                <div className="text-6xl" aria-hidden>
                  {unscrambleItem.emoji}
                </div>
                <p className="text-xs font-bold text-muted-foreground">
                  {unscrambleItem.hint[locale]}
                </p>
                <div
                  className="mx-auto flex min-h-14 max-w-xs items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/50 bg-primary/5 px-4 font-mono text-2xl font-black text-primary"
                  dir="ltr"
                >
                  {builtLetters.join("") || "..."}
                </div>
                <div className="flex flex-wrap justify-center gap-2" dir="ltr">
                  {unscrambleItem.scrambled.map((ch, idx) => (
                    <Button
                      key={`${ch}-${idx}`}
                      type="button"
                      size="lg"
                      variant="outline"
                      className="h-14 w-14 rounded-2xl text-2xl font-black"
                      onClick={() => {
                        const next = [...builtLetters, ch];
                        setBuiltLetters(next);
                        if (next.length === unscrambleItem.word.length) {
                          celebrateGame(
                            next.join("") === unscrambleItem.word,
                            "kids-game-unscramble",
                          );
                        }
                      }}
                    >
                      {ch}
                    </Button>
                  ))}
                  <Button
                    type="button"
                    size="lg"
                    variant="ghost"
                    onClick={() => {
                      setBuiltLetters([]);
                      setGameFeedback(null);
                    }}
                  >
                    <RotateCcw className="size-4" aria-hidden />
                  </Button>
                </div>
              </div>
            )}

            {/* Game 6: Sentence Ordering */}
            {activeGame === "sentence-order" && (
              <div className="space-y-4">
                <div className="text-5xl" aria-hidden>
                  {sentenceItem.emoji}
                </div>
                <div
                  className="mx-auto flex min-h-14 max-w-lg flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/50 bg-primary/5 p-3 text-lg font-extrabold text-foreground"
                  dir="ltr"
                >
                  {builtSentence.join(" ") ||
                    (isAr ? "اضغط الكلمات بالترتيب..." : "Tap words in order...")}
                </div>
                <div className="flex flex-wrap justify-center gap-2" dir="ltr">
                  {sentenceItem.words.map((word) => (
                    <Button
                      key={word}
                      type="button"
                      variant="outline"
                      className="rounded-full font-extrabold"
                      onClick={() => {
                        const next = [...builtSentence, word];
                        setBuiltSentence(next);
                        if (next.length === sentenceItem.words.length) {
                          celebrateGame(
                            next.join(" ") === sentenceItem.sentence,
                            "kids-game-sentence",
                          );
                        }
                      }}
                    >
                      {word}
                    </Button>
                  ))}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setBuiltSentence([]);
                      setGameFeedback(null);
                    }}
                  >
                    <RotateCcw className="size-4" aria-hidden />
                  </Button>
                </div>
              </div>
            )}

            {/* Game 7: Sound Recognition */}
            {activeGame === "sound-recognition" && (
              <div className="space-y-4">
                <Button
                  type="button"
                  size="lg"
                  variant="accent"
                  className="rounded-full font-extrabold"
                  onClick={() => playPhonemeSound(soundItem.sound, soundItem.targetWord)}
                >
                  <Volume2 className="me-2 size-5" aria-hidden />
                  {isAr
                    ? `استمع للصوت ${soundItem.sound} واختر الكلمة!`
                    : `Hear Sound ${soundItem.sound} & Pick the Word!`}
                </Button>
                <div className="mx-auto flex max-w-md flex-wrap justify-center gap-3" dir="ltr">
                  {soundItem.options.map((w) => (
                    <Button
                      key={w}
                      type="button"
                      size="lg"
                      variant="outline"
                      className="h-14 rounded-2xl px-6 text-lg font-black"
                      onClick={() => celebrateGame(w === soundItem.targetWord, "kids-game-sound")}
                    >
                      {w}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Game 8: Spelling Challenge */}
            {activeGame === "spelling" && (
              <div className="space-y-4">
                <div className="text-6xl" aria-hidden>
                  {spellingItem.emoji}
                </div>
                <p className="text-sm font-bold text-muted-foreground">
                  {spellingItem.clue[locale]}
                </p>
                <div className="mx-auto flex max-w-xs items-center gap-2" dir="ltr">
                  <Input
                    value={spellingInput}
                    onChange={(e) => setSpellingInput(e.target.value)}
                    placeholder="Type the word..."
                    aria-label="Type the spelling word"
                    className="text-center text-lg font-extrabold"
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      celebrateGame(
                        spellingInput.trim().toLowerCase() === spellingItem.word,
                        "kids-game-spelling",
                      )
                    }
                  >
                    <Sparkles className="me-1 size-4" aria-hidden />
                    {isAr ? "تحقق" : "Check"}
                  </Button>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => playSpeech(spellingItem.word, 0.8, "female")}
                >
                  <Volume2 className="me-1 size-4" aria-hidden />
                  {isAr ? "اسمع الكلمة" : "Hear the Word"}
                </Button>
              </div>
            )}

            {/* Shared Positive Feedback & Next Round Bar */}
            {gameFeedback && (
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <p
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-extrabold ${
                    gameFeedback.ok
                      ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200"
                      : "bg-amber-500/15 text-amber-800 dark:text-amber-200"
                  }`}
                >
                  {gameFeedback.ok && <CheckCircle2 className="size-4" aria-hidden />}
                  {gameFeedback.text}
                </p>
                {activeGame !== "memory" && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full font-bold"
                    onClick={() => resetGameRound(round + 1)}
                  >
                    {isAr ? "الجولة التالية ←" : "Next Fun Round →"}
                  </Button>
                )}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
