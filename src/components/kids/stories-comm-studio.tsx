import { useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Mic,
  PenTool,
  RotateCcw,
  Sparkles,
  Square,
  Volume2,
} from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  KIDS_MINI_CONVERSATIONS,
  KIDS_STORIES,
  KIDS_WRITING_MISSIONS,
  type KidsStoryVocab,
} from "@/content/kids/stories-communication-data";
import { playDialogueSequence, playSpeech, useSpeech } from "@/hooks/use-speech";
import { playLetterSound } from "@/lib/kids-phonics-audio";
import type { KidsProgressState } from "@/lib/kids-storage";
import { compareRecognition, wordCount } from "@/lib/speech";

type SubMode = "stories" | "speaking" | "writing";

export interface StoriesCommStudioProps {
  progress: KidsProgressState;
  onStoryComplete: (storyId: string) => void;
  onSpeakingPractice: (convId: string) => void;
  onWritingComplete: (missionId: string) => void;
}

export function StoriesCommStudio({
  progress,
  onStoryComplete,
  onSpeakingPractice,
  onWritingComplete,
}: StoriesCommStudioProps) {
  const { locale, t } = useI18n();
  const kw = t.kidsWorld;

  const [subMode, setSubMode] = useState<SubMode>("stories");

  // --- Stories state ---
  const [selectedStoryId, setSelectedStoryId] = useState(KIDS_STORIES[0]!.id);
  const [pageIdx, setPageIdx] = useState(0);
  const [activeVocab, setActiveVocab] = useState<KidsStoryVocab | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [orderedEvents, setOrderedEvents] = useState<string[]>([]);

  const story = useMemo(
    () => KIDS_STORIES.find((s) => s.id === selectedStoryId) ?? KIDS_STORIES[0]!,
    [selectedStoryId],
  );
  const currentPage = story.pages[pageIdx] ?? story.pages[0]!;
  const storyDone = progress.storiesRead.includes(story.id);

  // Deterministic scrambled event order so children put Beginning → Middle → End in order
  const scrambledEvents = useMemo(
    () => [story.eventOrder[1]!, story.eventOrder[2]!, story.eventOrder[0]!],
    [story],
  );
  const eventsCorrect =
    orderedEvents.length === story.eventOrder.length &&
    orderedEvents.every((id, i) => id === story.eventOrder[i]!.id);

  // --- Speaking state ---
  const [selectedConvId, setSelectedConvId] = useState(KIDS_MINI_CONVERSATIONS[0]!.id);
  const [spokenTranscript, setSpokenTranscript] = useState("");
  const conv = useMemo(
    () =>
      KIDS_MINI_CONVERSATIONS.find((c) => c.id === selectedConvId) ?? KIDS_MINI_CONVERSATIONS[0]!,
    [selectedConvId],
  );
  const speech = useSpeech((text) => setSpokenTranscript(text));
  const speechMatch = useMemo(() => {
    if (!spokenTranscript.trim()) return null;
    return compareRecognition(conv.speakPracticeLine, spokenTranscript);
  }, [conv.speakPracticeLine, spokenTranscript]);

  // --- Writing state ---
  const [selectedMissionId, setSelectedMissionId] = useState(KIDS_WRITING_MISSIONS[0]!.id);
  const mission = useMemo(
    () =>
      KIDS_WRITING_MISSIONS.find((m) => m.id === selectedMissionId) ?? KIDS_WRITING_MISSIONS[0]!,
    [selectedMissionId],
  );
  const [builtTokens, setBuiltTokens] = useState<string[]>([]);
  const [paragraphDraft, setParagraphDraft] = useState("");
  const [writingPraise, setWritingPraise] = useState(false);

  const missionTiles = useMemo(() => {
    const all = [...(mission.targetTokens ?? []), ...(mission.extraTokens ?? [])];
    // Deterministic gentle shuffle
    return [...all].sort((a, b) => a.localeCompare(b));
  }, [mission]);

  const handleSelectStory = (id: string) => {
    setSelectedStoryId(id);
    setPageIdx(0);
    setActiveVocab(null);
    setSelectedOption(null);
    setOrderedEvents([]);
  };

  const handleSelectMission = (id: string) => {
    setSelectedMissionId(id);
    setBuiltTokens([]);
    setParagraphDraft("");
    setWritingPraise(false);
  };

  const handleStoryAnswer = (idx: number) => {
    setSelectedOption(idx);
    if (idx === story.comprehension.correctIndex) {
      onStoryComplete(story.id);
      playSpeech(story.comprehension.praise.en, 0.94, "female");
    }
  };

  const handleTapTile = (token: string) => {
    if (mission.mode === "word-tiles") {
      playLetterSound(token);
    } else {
      playSpeech(token, 0.92, "female");
    }
    const next = [...builtTokens, token];
    setBuiltTokens(next);
    const target = mission.targetTokens ?? [];
    if (next.length === target.length && next.every((tok, idx) => tok === target[idx])) {
      setWritingPraise(true);
      onWritingComplete(mission.id);
      playSpeech(`Great job! ${mission.sampleModel}`, 0.92, "female");
    }
  };

  const draftWords = wordCount(paragraphDraft);
  const minWords = mission.minWords ?? 18;

  return (
    <section className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border-2 border-primary/25 bg-card p-4 shadow-xs">
        <div>
          <h2 className="display-heading text-2xl font-black text-foreground">
            {kw.storiesCommTitle}
          </h2>
          <p className="text-sm text-muted-foreground">{kw.storiesCommSubtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={kw.storiesCommTitle}>
          <Button
            type="button"
            role="tab"
            aria-selected={subMode === "stories"}
            variant={subMode === "stories" ? "default" : "outline"}
            className="rounded-full font-extrabold"
            onClick={() => setSubMode("stories")}
          >
            <BookOpen className="me-1.5 size-4" aria-hidden />
            {kw.subTabStories} ({progress.storiesRead.length}/{KIDS_STORIES.length})
          </Button>
          <Button
            type="button"
            role="tab"
            aria-selected={subMode === "speaking"}
            variant={subMode === "speaking" ? "default" : "outline"}
            className="rounded-full font-extrabold"
            onClick={() => setSubMode("speaking")}
          >
            <MessageCircle className="me-1.5 size-4" aria-hidden />
            {kw.subTabSpeaking} ({progress.speakingPracticed.length}/
            {KIDS_MINI_CONVERSATIONS.length})
          </Button>
          <Button
            type="button"
            role="tab"
            aria-selected={subMode === "writing"}
            variant={subMode === "writing" ? "default" : "outline"}
            className="rounded-full font-extrabold"
            onClick={() => setSubMode("writing")}
          >
            <PenTool className="me-1.5 size-4" aria-hidden />
            {kw.subTabWriting} ({progress.writingCompleted.length}/{KIDS_WRITING_MISSIONS.length})
          </Button>
        </div>
      </div>

      {/* 1. ILLUSTRATED STORIES FOR KIDS (12 THEMES) */}
      {subMode === "stories" && (
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.45fr]">
          {/* 12 Story Theme Picker */}
          <div className="space-y-2.5 rounded-3xl border-2 border-border bg-card p-4">
            <h3 className="text-sm font-extrabold text-foreground">
              📚 {kw.storiesLibraryHeading}
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {KIDS_STORIES.map((st) => {
                const active = st.id === story.id;
                const read = progress.storiesRead.includes(st.id);
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => handleSelectStory(st.id)}
                    className={`flex items-center justify-between gap-2 rounded-2xl border-2 p-3 text-start transition-all ${
                      active
                        ? "border-primary bg-primary/10 shadow-xs"
                        : "border-border bg-background hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl" aria-hidden>
                        {st.emoji}
                      </span>
                      <div>
                        <div className="text-xs font-extrabold text-primary">
                          {st.theme[locale]}
                        </div>
                        <div className="text-sm font-bold text-foreground">{st.title[locale]}</div>
                      </div>
                    </div>
                    {read && (
                      <Badge className="shrink-0 bg-emerald-600 text-[11px] text-white">⭐</Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Storybook Stage */}
          <div className="space-y-5 rounded-3xl border-2 border-foreground/80 bg-card p-6 shadow-ink">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <Badge variant="secondary" className="mb-1 text-xs font-bold">
                  {story.emoji} {story.theme[locale]}
                </Badge>
                <h3 className="display-heading text-2xl font-black text-foreground">
                  {story.title[locale]}
                </h3>
              </div>
              {storyDone && (
                <Badge className="gap-1 bg-emerald-600 text-white">
                  <CheckCircle2 className="size-3.5" aria-hidden />
                  {kw.storyReadBadge}
                </Badge>
              )}
            </div>

            {/* Illustrated Page */}
            <div className="rounded-3xl border-2 border-amber-400/50 bg-gradient-to-br from-amber-100/60 via-sky-50/70 to-emerald-50/60 p-6 text-center dark:from-amber-950/30 dark:via-sky-950/30 dark:to-emerald-950/30">
              <div className="text-6xl leading-none" aria-hidden>
                {currentPage.sceneEmoji}
              </div>
              <p
                className="mt-4 text-xl font-extrabold leading-relaxed text-foreground md:text-2xl"
                dir="ltr"
              >
                {currentPage.textEn}
              </p>
              <p className="mt-2 text-sm font-semibold text-primary">{currentPage.textAr}</p>

              {/* Clickable Story Vocabulary */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {currentPage.focusWords.map((fw) => (
                  <Button
                    key={fw.word}
                    type="button"
                    size="sm"
                    variant="secondary"
                    className="rounded-full font-bold"
                    onClick={() => {
                      setActiveVocab(fw);
                      playSpeech(fw.word, 0.85, "female");
                    }}
                  >
                    <span aria-hidden>{fw.emoji}</span> {fw.word}
                  </Button>
                ))}
              </div>

              {activeVocab && (
                <div className="mx-auto mt-3 inline-flex items-center gap-2 rounded-2xl border border-primary/30 bg-card px-4 py-2 text-sm font-bold shadow-xs">
                  <span aria-hidden>{activeVocab.emoji}</span>
                  <span dir="ltr">{activeVocab.word}</span>
                  <span className="text-primary">→ {activeVocab.meaningAr}</span>
                </div>
              )}

              {/* Read Aloud + Page Controls */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={pageIdx === 0}
                  onClick={() => {
                    setPageIdx((i) => Math.max(0, i - 1));
                    setActiveVocab(null);
                  }}
                >
                  <ChevronLeft className="size-4 rtl:rotate-180" aria-hidden />
                  {kw.prevPageBtn}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => playSpeech(currentPage.textEn, 0.86, "female")}
                >
                  <Volume2 className="me-1.5 size-4" aria-hidden />
                  {kw.readPageAloudBtn} ({pageIdx + 1}/{story.pages.length})
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={pageIdx >= story.pages.length - 1}
                  onClick={() => {
                    setPageIdx((i) => Math.min(story.pages.length - 1, i + 1));
                    setActiveVocab(null);
                  }}
                >
                  {kw.nextPageBtn}
                  <ChevronRight className="size-4 rtl:rotate-180" aria-hidden />
                </Button>
              </div>
            </div>

            {/* Moral Banner */}
            <div className="rounded-2xl bg-emerald-500/10 p-4 text-sm font-bold text-foreground">
              <span className="text-emerald-700 dark:text-emerald-300">
                🌟 {kw.storyMoralLabel}:{" "}
              </span>
              {story.moral[locale]}
            </div>

            {/* Story Activity 1: Put Events in Order 1-2-3 */}
            <div className="space-y-3 rounded-2xl border border-border bg-secondary/35 p-4">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-extrabold text-foreground">
                  🔢 {kw.storyOrderHeading}
                </h4>
                {orderedEvents.length > 0 && (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => setOrderedEvents([])}
                  >
                    <RotateCcw className="me-1 size-3.5" aria-hidden />
                    {kw.tryAgainBtn}
                  </Button>
                )}
              </div>
              <div className="grid gap-2">
                {scrambledEvents.map((ev) => {
                  const chosenPos = orderedEvents.indexOf(ev.id);
                  return (
                    <button
                      key={ev.id}
                      type="button"
                      disabled={chosenPos !== -1}
                      onClick={() => setOrderedEvents((prev) => [...prev, ev.id])}
                      className={`flex items-center justify-between gap-3 rounded-xl border-2 px-3.5 py-2.5 text-start text-sm font-bold transition-all ${
                        chosenPos !== -1
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      <span>
                        <span className="me-2" aria-hidden>
                          {ev.emoji}
                        </span>
                        {ev.label[locale]}
                      </span>
                      {chosenPos !== -1 && (
                        <Badge className="bg-primary text-primary-foreground">
                          #{chosenPos + 1}
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
              {orderedEvents.length === story.eventOrder.length && (
                <p
                  className={`rounded-xl p-2.5 text-xs font-extrabold ${
                    eventsCorrect
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                      : "bg-amber-500/15 text-amber-800 dark:text-amber-200"
                  }`}
                >
                  {eventsCorrect ? `🎉 ${kw.storyOrderSuccess}` : `🦉 ${kw.storyOrderRetry}`}
                </p>
              )}
            </div>

            {/* Story Activity 2: Friendly Comprehension Check */}
            <div className="space-y-3 rounded-2xl border-2 border-primary/30 bg-primary/5 p-4">
              <h4 className="text-sm font-extrabold text-foreground">
                ⭐ {story.comprehension.question[locale]}
              </h4>
              <div className="grid gap-2">
                {story.comprehension.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === story.comprehension.correctIndex;
                  return (
                    <Button
                      key={opt.label.en}
                      type="button"
                      variant={isSelected && isCorrect ? "default" : "outline"}
                      className="h-auto justify-start whitespace-normal rounded-xl px-4 py-3 text-start text-sm font-bold"
                      onClick={() => handleStoryAnswer(idx)}
                    >
                      <span className="me-2 text-lg" aria-hidden>
                        {opt.emoji}
                      </span>
                      {opt.label[locale]}
                    </Button>
                  );
                })}
              </div>
              {selectedOption !== null && (
                <p className="rounded-xl bg-card p-3 text-sm font-extrabold text-emerald-700 dark:text-emerald-300">
                  {selectedOption === story.comprehension.correctIndex
                    ? `🌟 ${story.comprehension.praise[locale]}`
                    : `🦉 ${kw.gentleTryAgain}`}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. MINI CONVERSATIONS & ACCENT-FRIENDLY SPEAKING */}
      {subMode === "speaking" && (
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.5fr]">
          <div className="space-y-2.5 rounded-3xl border-2 border-border bg-card p-4">
            <h3 className="text-sm font-extrabold text-foreground">💬 {kw.miniConvHeading}</h3>
            {KIDS_MINI_CONVERSATIONS.map((c) => {
              const active = c.id === conv.id;
              const done = progress.speakingPracticed.includes(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setSelectedConvId(c.id);
                    setSpokenTranscript("");
                  }}
                  className={`flex w-full items-center justify-between gap-2 rounded-2xl border-2 p-3 text-start transition-all ${
                    active
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl" aria-hidden>
                      {c.emoji}
                    </span>
                    <div>
                      <div className="text-sm font-extrabold text-foreground">
                        {c.title[locale]}
                      </div>
                      <div className="text-xs text-muted-foreground">{c.setting[locale]}</div>
                    </div>
                  </div>
                  {done && <Badge className="bg-emerald-600 text-white">⭐</Badge>}
                </button>
              );
            })}
          </div>

          <div className="space-y-5 rounded-3xl border-2 border-foreground/80 bg-card p-6 shadow-ink">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="display-heading text-2xl font-black text-foreground">
                  {conv.emoji} {conv.title[locale]}
                </h3>
                <p className="text-xs font-semibold text-muted-foreground">
                  {conv.setting[locale]}
                </p>
              </div>
              <Button
                type="button"
                onClick={() =>
                  playDialogueSequence(
                    conv.turns.map((turn) => ({
                      text: turn.en,
                      role: turn.gender === "female" ? "female-student" : "male-student",
                    })),
                    { rate: 0.88 },
                  )
                }
              >
                <Volume2 className="me-1.5 size-4" aria-hidden />
                {kw.playWholeDialogueBtn}
              </Button>
            </div>

            <div className="space-y-3">
              {conv.turns.map((turn, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 rounded-2xl border p-4 ${
                    turn.gender === "female"
                      ? "border-pink-400/40 bg-pink-500/5"
                      : "border-sky-400/40 bg-sky-500/5"
                  }`}
                >
                  <span className="text-3xl" aria-hidden>
                    {turn.emoji}
                  </span>
                  <div className="flex-1 space-y-1">
                    <div className="text-xs font-black text-primary">{turn.speaker}</div>
                    <p className="text-base font-extrabold text-foreground" dir="ltr">
                      {turn.en}
                    </p>
                    <p className="text-xs font-semibold text-muted-foreground">{turn.ar}</p>
                  </div>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    aria-label={`Listen to ${turn.speaker}`}
                    onClick={() => playSpeech(turn.en, 0.88, turn.gender)}
                  >
                    <Volume2 className="size-4" aria-hidden />
                  </Button>
                </div>
              ))}
            </div>

            {/* Your Turn: Listen & Say It Aloud */}
            <div className="space-y-3 rounded-2xl border-2 border-emerald-500/35 bg-emerald-500/5 p-5">
              <div className="text-xs font-extrabold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                🎤 {kw.yourTurnSpeakLabel}
              </div>
              <p className="text-lg font-black text-foreground" dir="ltr">
                “{conv.speakPracticeLine}”
              </p>
              <p className="text-xs font-semibold text-muted-foreground">{conv.speakPracticeAr}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => playSpeech(conv.speakPracticeLine, 0.84, "female")}
                >
                  <Volume2 className="me-1.5 size-4" aria-hidden />
                  {kw.hearModelBtn}
                </Button>
                {speech.supported && (
                  <Button
                    type="button"
                    size="sm"
                    variant={speech.listening ? "destructive" : "secondary"}
                    onClick={() => {
                      if (speech.listening) {
                        speech.stop();
                      } else {
                        speech.start();
                      }
                    }}
                  >
                    {speech.listening ? (
                      <Square className="me-1.5 size-4" aria-hidden />
                    ) : (
                      <Mic className="me-1.5 size-4" aria-hidden />
                    )}
                    {speech.listening ? kw.stopListeningBtn : kw.speakNowBtn}
                  </Button>
                )}
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    onSpeakingPractice(conv.id);
                    playSpeech("Wonderful speaking! You earned two stars!", 0.94, "female");
                  }}
                >
                  <Sparkles className="me-1.5 size-4" aria-hidden />
                  {kw.iSaidItBtn}
                </Button>
              </div>
              {spokenTranscript && speechMatch && (
                <div className="rounded-xl bg-card p-3 text-sm">
                  <div className="text-xs font-bold text-muted-foreground" dir="ltr">
                    {spokenTranscript}
                  </div>
                  <p className="mt-1 font-extrabold text-emerald-700 dark:text-emerald-300">
                    🌟 {kw.speakingCheerNote}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. GRADUAL WRITING STUDIO (4–6 WORD TILES · 7–9 SENTENCES · 10–12 PARAGRAPHS) */}
      {subMode === "writing" && (
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.5fr]">
          <div className="space-y-2.5 rounded-3xl border-2 border-border bg-card p-4">
            <h3 className="text-sm font-extrabold text-foreground">✏️ {kw.writingStudioHeading}</h3>
            {KIDS_WRITING_MISSIONS.map((m) => {
              const active = m.id === mission.id;
              const done = progress.writingCompleted.includes(m.id);
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleSelectMission(m.id)}
                  className={`flex w-full items-center justify-between gap-2 rounded-2xl border-2 p-3 text-start transition-all ${
                    active
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl" aria-hidden>
                      {m.emoji}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-primary">
                        {m.ageGroup === "early-4-6"
                          ? "Ages 4–6"
                          : m.ageGroup === "young-7-9"
                            ? "Ages 7–9"
                            : "Ages 10–12"}
                      </div>
                      <div className="text-sm font-extrabold text-foreground">
                        {m.title[locale]}
                      </div>
                    </div>
                  </div>
                  {done && <Badge className="bg-emerald-600 text-white">⭐</Badge>}
                </button>
              );
            })}
          </div>

          <div className="space-y-5 rounded-3xl border-2 border-foreground/80 bg-card p-6 shadow-ink">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="display-heading text-2xl font-black text-foreground">
                  {mission.emoji} {mission.title[locale]}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{mission.prompt[locale]}</p>
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => playSpeech(mission.sampleModel, 0.86, "female")}
              >
                <Volume2 className="me-1.5 size-4" aria-hidden />
                {kw.hearModelBtn}
              </Button>
            </div>

            {mission.mode !== "mini-paragraph" ? (
              <div className="space-y-4">
                {/* Answer Slots */}
                <div
                  className="flex min-h-16 flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/50 bg-primary/5 p-4"
                  dir="ltr"
                >
                  {builtTokens.length === 0 ? (
                    <span className="text-sm font-semibold text-muted-foreground">
                      {kw.tapTilesHint}
                    </span>
                  ) : (
                    builtTokens.map((tok, i) => (
                      <span
                        key={`${tok}-${i}`}
                        className="rounded-xl bg-primary px-4 py-2 text-lg font-black text-primary-foreground shadow-xs"
                      >
                        {tok}
                      </span>
                    ))
                  )}
                </div>

                {/* Clickable Tile Bank */}
                <div className="flex flex-wrap justify-center gap-2.5" dir="ltr">
                  {missionTiles.map((tok, idx) => (
                    <Button
                      key={`${tok}-${idx}`}
                      type="button"
                      size="lg"
                      variant="outline"
                      className="rounded-2xl border-2 text-lg font-black"
                      onClick={() => handleTapTile(tok)}
                    >
                      {tok}
                    </Button>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setBuiltTokens([]);
                      setWritingPraise(false);
                    }}
                  >
                    <RotateCcw className="me-1.5 size-4" aria-hidden />
                    {kw.tryAgainBtn}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {mission.helpfulWords && (
                  <div className="flex flex-wrap items-center gap-1.5" dir="ltr">
                    <span className="text-xs font-bold text-muted-foreground">Word Bank:</span>
                    {mission.helpfulWords.map((w) => (
                      <Button
                        key={w}
                        type="button"
                        size="sm"
                        variant="secondary"
                        className="h-7 rounded-full text-xs font-bold"
                        onClick={() =>
                          setParagraphDraft((prev) => (prev.trim() ? `${prev.trim()} ${w}` : w))
                        }
                      >
                        + {w}
                      </Button>
                    ))}
                  </div>
                )}
                <Textarea
                  value={paragraphDraft}
                  onChange={(e) => setParagraphDraft(e.target.value)}
                  placeholder={mission.starterPrompt}
                  rows={5}
                  dir="ltr"
                  className="rounded-2xl text-base"
                  aria-label={mission.title[locale]}
                />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-muted-foreground" dir="ltr">
                    {draftWords} / {minWords} words
                  </span>
                  <Button
                    type="button"
                    disabled={draftWords < minWords}
                    onClick={() => {
                      setWritingPraise(true);
                      onWritingComplete(mission.id);
                      playSpeech("Wonderful writing! You are a creative author!", 0.94, "female");
                    }}
                  >
                    <Sparkles className="me-1.5 size-4" aria-hidden />
                    {kw.saveMyStoryBtn}
                  </Button>
                </div>
                <div className="rounded-2xl bg-secondary/50 p-3 text-xs text-muted-foreground">
                  <span className="font-bold text-foreground">{kw.sampleIdeaLabel}: </span>
                  <span dir="ltr">{mission.sampleModel}</span>
                </div>
              </div>
            )}

            {writingPraise && (
              <div className="rounded-2xl bg-emerald-500/15 p-4 text-center text-sm font-extrabold text-emerald-700 dark:text-emerald-300">
                🌟 {kw.writingSuccessPraise} (“{mission.sampleModel}”)
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
