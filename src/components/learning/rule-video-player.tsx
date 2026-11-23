import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Eye,
  Flag,
  Globe2,
  Lightbulb,
  Maximize2,
  MessageSquare,
  Pause,
  PauseCircle,
  Play,
  RotateCcw,
  Sparkles,
  Square,
  Subtitles,
  Table2,
  Target,
  Volume2,
  VolumeX,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import type { ExplainerVideo, VideoScene } from "@/content/lesson-types";
import { format } from "@/lib/i18n/messages";
import {
  playDialogueSequence,
  playSpeech,
  speakAsRole,
  stopSpeech,
  type VoiceRole,
} from "@/hooks/use-speech";
import {
  AnimatedChronologicalTimeline,
  AnimatedClassroomCast,
  CourseMediaBackdrop,
  FloatingEmojiBurst,
  MotionFocusBadges,
  SkillVisualAid,
} from "./video-visuals";
import { HighlightedText } from "./highlighted-text";

type SubtitleMode = "both" | "en" | "ar" | "off";
const SPEEDS = [0.85, 0.96, 1.12] as const;

const REACTION_EMOJIS = [
  { symbol: "💡", labelEn: "Got it!", labelAr: "فهمت!" },
  { symbol: "🔥", labelEn: "Awesome!", labelAr: "رائع!" },
  { symbol: "🤔", labelEn: "Thinking", labelAr: "أفكّر" },
  { symbol: "👏", labelEn: "Nice!", labelAr: "أحسنت!" },
] as const;

function formatClock(seconds: number): string {
  const clamped = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function getSceneIndexAt(scenes: VideoScene[], elapsed: number): number {
  for (let i = scenes.length - 1; i >= 0; i--) {
    const candidate = scenes[i];
    if (candidate && elapsed >= candidate.startSeconds) return i;
  }
  return 0;
}

function getCompletedStepsAt(scenes: VideoScene[], sceneIndex: number): number {
  let maxCompleted = 0;
  for (let i = 0; i <= sceneIndex; i++) {
    const step = scenes[i]?.roadmapStep;
    if (step && step.status === "complete" && step.current > maxCompleted) {
      maxCompleted = step.current;
    }
  }
  return maxCompleted;
}

export interface RuleVideoPlayerProps {
  video: ExplainerVideo;
  keywords?: string[];
}

export function RuleVideoPlayer({ video, keywords }: RuleVideoPlayerProps) {
  const { locale, t } = useI18n();
  const kwProps = keywords ? { keywords } : {};
  const stageRef = useRef<HTMLDivElement | null>(null);
  const autoPausedScenesRef = useRef<Set<string>>(new Set());
  const burstIdRef = useRef(0);
  const stopSceneSpeechRef = useRef<(() => void) | null>(null);
  const stopConvSpeechRef = useRef<(() => void) | null>(null);
  const sceneSpeakingRef = useRef(false);

  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(1);
  const [subtitles, setSubtitles] = useState<SubtitleMode>("both");
  const [revealedChallenges, setRevealedChallenges] = useState<Record<string, boolean>>({});
  const [pickedChoices, setPickedChoices] = useState<Record<string, string>>({});
  const [shownHints, setShownHints] = useState<Record<string, boolean>>({});
  const [showStoryboard, setShowStoryboard] = useState(true);
  const [xp, setXp] = useState(0);
  const [celebrating, setCelebrating] = useState(false);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [playingConversation, setPlayingConversation] = useState(false);
  const [activeConvTurn, setActiveConvTurn] = useState<number | null>(null);
  const [floatingEmojis, setFloatingEmojis] = useState<
    { id: number; symbol: string; left: number }[]
  >([]);

  const speed = SPEEDS[speedIndex] ?? 0.96;
  const sceneIndex = getSceneIndexAt(video.scenes, elapsed);
  const activeScene = video.scenes[sceneIndex] ?? video.scenes[0];
  const completedSteps = getCompletedStepsAt(video.scenes, sceneIndex);
  const progressPercent = Math.min(100, (elapsed / video.durationSeconds) * 100);

  function launchEmojiBurst(symbols: string[], celebrate = false) {
    const batch = symbols.map((symbol, idx) => ({
      id: ++burstIdRef.current,
      symbol,
      left: 16 + ((idx * 19 + (burstIdRef.current % 15)) % 68),
    }));
    setFloatingEmojis((prev) => [...prev, ...batch]);
    if (celebrate) {
      setCelebrating(true);
      window.setTimeout(() => setCelebrating(false), 1800);
    }
    window.setTimeout(() => {
      const ids = new Set(batch.map((b) => b.id));
      setFloatingEmojis((prev) => prev.filter((item) => !ids.has(item.id)));
    }, 1600);
  }

  function stopConversationAudio() {
    stopConvSpeechRef.current?.();
    stopConvSpeechRef.current = null;
    setPlayingConversation(false);
    setActiveConvTurn(null);
  }

  // Warm up browser voice list (Chrome/Edge populate getVoices asynchronously)
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.getVoices();
    const onVoices = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener?.("voiceschanged", onVoices);
    return () => {
      window.speechSynthesis.removeEventListener?.("voiceschanged", onVoices);
      stopSceneSpeechRef.current?.();
      stopConvSpeechRef.current?.();
      stopSpeech();
    };
  }, []);

  // Auto-pause once when entering an unrevealed Pause & Predict challenge during active playback.
  useEffect(() => {
    if (!activeScene || !playing) return;
    if (
      activeScene.layout === "pause-predict" &&
      !revealedChallenges[activeScene.id] &&
      !autoPausedScenesRef.current.has(activeScene.id)
    ) {
      autoPausedScenesRef.current.add(activeScene.id);
      setPlaying(false);
      stopSceneSpeechRef.current?.();
      stopSpeech();
    }
  }, [activeScene, playing, revealedChallenges]);

  // Smooth timeline progress that NEVER cuts off an actively speaking teacher mid-sentence
  useEffect(() => {
    if (!playing || !activeScene) return;
    const tickMs = 250;
    const sceneEnd = activeScene.startSeconds + activeScene.durationSeconds;
    const id = window.setInterval(() => {
      setElapsed((prev) => {
        const next = prev + (tickMs / 1000) * speed;
        // Hold just before the scene boundary until the current Male/Female teacher finishes speaking
        if (sceneSpeakingRef.current && next >= sceneEnd - 0.35) {
          return Math.min(prev, sceneEnd - 0.35);
        }
        if (next >= video.durationSeconds) {
          setPlaying(false);
          stopSceneSpeechRef.current?.();
          stopSpeech();
          return video.durationSeconds;
        }
        return next;
      });
    }, tickMs);
    return () => window.clearInterval(id);
  }, [playing, speed, video.durationSeconds, activeScene]);

  // Seamless turn-by-turn Female & Male voice playback per scene (zero cut-off chunks!)
  useEffect(() => {
    stopSceneSpeechRef.current?.();
    stopSceneSpeechRef.current = null;
    sceneSpeakingRef.current = false;

    if (!activeScene) return;
    setActiveLineIndex(0);

    if (!playing || muted) {
      stopSpeech();
      return;
    }

    stopConversationAudio();
    sceneSpeakingRef.current = true;
    const currentSceneIdx = sceneIndex;
    const turns = activeScene.dialogue.map((line) => ({
      text: line.textEn,
      role: (line.speaker === "layla" ? "female-teacher" : "male-teacher") as VoiceRole,
    }));

    stopSceneSpeechRef.current = playDialogueSequence(turns, {
      rate: speed,
      onTurnStart: (idx) => setActiveLineIndex(idx),
      onComplete: () => {
        sceneSpeakingRef.current = false;
        const nextScene = video.scenes[currentSceneIdx + 1];
        if (nextScene) {
          setElapsed(nextScene.startSeconds);
        } else {
          setElapsed(video.durationSeconds);
          setPlaying(false);
        }
      },
    });

    return () => {
      stopSceneSpeechRef.current?.();
      stopSceneSpeechRef.current = null;
      sceneSpeakingRef.current = false;
    };
  }, [playing, muted, activeScene, speed, sceneIndex, video.scenes, video.durationSeconds]);

  if (!activeScene) return null;
  const scene = activeScene;

  function togglePlay() {
    stopConversationAudio();
    if (playing) {
      setPlaying(false);
      stopSceneSpeechRef.current?.();
      stopSpeech();
      return;
    }
    if (elapsed >= video.durationSeconds - 0.5) {
      setElapsed(0);
      autoPausedScenesRef.current.clear();
    }
    setPlaying(true);
  }

  function replay() {
    stopConversationAudio();
    stopSceneSpeechRef.current?.();
    stopSpeech();
    autoPausedScenesRef.current.clear();
    setRevealedChallenges({});
    setPickedChoices({});
    setShownHints({});
    setActiveLineIndex(0);
    setElapsed(0);
    setPlaying(true);
  }

  function jumpToScene(idx: number) {
    const target = video.scenes[idx];
    if (!target) return;
    stopConversationAudio();
    stopSceneSpeechRef.current?.();
    stopSpeech();
    setActiveLineIndex(0);
    setElapsed(target.startSeconds);
    if (target.layout === "pause-predict" && !revealedChallenges[target.id]) {
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  }

  function selectDialogueLine(lineIdx: number) {
    stopConversationAudio();
    setActiveLineIndex(lineIdx);
    const chosen = scene.dialogue[lineIdx];
    if (chosen && !muted) {
      speakAsRole(chosen.textEn, chosen.speaker === "layla" ? "female-teacher" : "male-teacher", {
        rate: speed,
      });
    }
  }

  function toggleStageConversation() {
    if (playingConversation) {
      stopConversationAudio();
      return;
    }
    const turns = scene.conversation;
    if (!turns || turns.length === 0) return;

    // Pause main scene narration while playing the dedicated Male & Female conversation
    setPlaying(false);
    stopSceneSpeechRef.current?.();
    setPlayingConversation(true);
    stopConvSpeechRef.current = playDialogueSequence(
      turns.map((turn) => ({
        text: turn.textEn,
        role: (turn.gender === "female"
          ? turn.role === "teacher"
            ? "female-teacher"
            : "female-student"
          : turn.role === "teacher"
            ? "male-teacher"
            : "male-student") as VoiceRole,
      })),
      {
        rate: speed,
        onTurnStart: (idx) => setActiveConvTurn(idx),
        onComplete: () => {
          setPlayingConversation(false);
          setActiveConvTurn(null);
          stopConvSpeechRef.current = null;
        },
      },
    );
  }

  function handleInteractiveChoice(sceneId: string, choice: string, correctAnswer: string) {
    setPickedChoices((prev) => ({ ...prev, [sceneId]: choice }));
    if (choice.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
      if (!revealedChallenges[sceneId]) {
        setXp((prev) => prev + 25);
      }
      setRevealedChallenges((prev) => ({ ...prev, [sceneId]: true }));
      const finalIdx = Math.max(0, scene.dialogue.length - 1);
      setActiveLineIndex(finalIdx);
      const celebrateLine = scene.dialogue[finalIdx];
      if (celebrateLine && !muted) {
        speakAsRole(
          celebrateLine.textEn,
          celebrateLine.speaker === "layla" ? "female-teacher" : "male-teacher",
          { rate: speed },
        );
      }
      launchEmojiBurst(["🎉", "🌟", "💯", "👏", "🚀"], true);
    } else {
      setShownHints((prev) => ({ ...prev, [sceneId]: true }));
      launchEmojiBurst(["🤔", "💡"], false);
    }
  }

  function revealAndContinue(sceneId: string) {
    setRevealedChallenges((prev) => ({ ...prev, [sceneId]: true }));
    setActiveLineIndex(Math.max(0, scene.dialogue.length - 1));
    launchEmojiBurst(["✨", "👏"], true);
    setPlaying(true);
  }

  function handleReactionTap(symbol: string) {
    setXp((prev) => prev + 5);
    launchEmojiBurst([symbol, "✨", symbol], symbol === "👏" || symbol === "🔥");
  }

  function handleScrub(value: number) {
    stopConversationAudio();
    stopSceneSpeechRef.current?.();
    stopSpeech();
    setElapsed(value);
  }

  function cycleSubtitles() {
    const order: SubtitleMode[] = ["both", "en", "ar", "off"];
    setSubtitles((prev) => order[(order.indexOf(prev) + 1) % order.length] ?? "both");
  }

  function toggleFullscreen() {
    const el = stageRef.current;
    if (!el || typeof document === "undefined") return;
    if (document.fullscreenElement) {
      void document.exitFullscreen?.();
    } else {
      void el.requestFullscreen?.();
    }
  }

  const subtitleLabel =
    subtitles === "both"
      ? t.learning.videoSubBoth
      : subtitles === "en"
        ? t.learning.videoSubEn
        : subtitles === "ar"
          ? t.learning.videoSubAr
          : t.learning.videoSubOff;

  return (
    <section className="border-t border-border py-8" aria-label={video.title[locale]}>
      {/* Top Meta Badges */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            <Sparkles className="size-3.5" aria-hidden />
            {t.learning.videoBadge}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
            <Clock className="size-3.5" aria-hidden />
            <span dir="ltr">{formatClock(video.durationSeconds)}</span> ·{" "}
            {t.learning.videoMaxDuration}
          </span>
          <span
            className="rounded-full border border-border bg-card px-3 py-1 text-xs font-bold text-foreground"
            dir="ltr"
          >
            {video.levelTag}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
            👩‍🏫 {t.learning.femaleVoiceBadge} + 👨‍🏫 {t.learning.maleVoiceBadge}
          </span>
          {xp > 0 && (
            <span
              className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-extrabold text-amber-700 dark:text-amber-300"
              dir="ltr"
            >
              ⭐ +{xp} XP
            </span>
          )}
        </div>
        <span className="text-xs font-semibold text-muted-foreground">
          {format(t.learning.videoSceneOf, { current: sceneIndex + 1, total: video.scenes.length })}
        </span>
      </div>

      <h2 className="text-2xl font-bold">{video.title[locale]}</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">{video.presenterNote[locale]}</p>

      {/* Single Clear Learning Objective Banner */}
      <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-primary/20 bg-secondary/40 px-4 py-3">
        <Target className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
        <p className="text-sm font-medium text-foreground">
          <span className="font-bold text-primary">{t.learning.videoObjective}: </span>
          {video.learningObjective[locale]}
        </p>
      </div>

      {/* Vibrant Animated Classroom Video Stage */}
      <div
        ref={stageRef}
        className="mt-5 overflow-hidden rounded-2xl border border-indigo-900/80 bg-slate-950 text-white shadow-xl"
      >
        <div className="relative flex min-h-[490px] flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 p-5 md:p-7">
          <CourseMediaBackdrop course={video.course} sceneEmoji={scene.sceneEmoji} />
          <FloatingEmojiBurst emojis={floatingEmojis} />

          {/* Top Bar: Chapter + Visual Progress Roadmap + Motion Graphics Tools */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-cyan-400/40 bg-cyan-400/15 px-3 py-1 text-xs font-bold text-cyan-200">
                {scene.chapterLabel[locale]}
              </span>
              <div
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1"
                aria-label={t.learning.videoRoadmap}
              >
                {[1, 2, 3].map((stepNum) => {
                  const done = completedSteps >= stepNum;
                  return (
                    <span
                      key={stepNum}
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold transition ${
                        done
                          ? "bg-emerald-500/25 text-emerald-200 ring-1 ring-emerald-400/50"
                          : "bg-white/10 text-slate-300"
                      }`}
                    >
                      {done && <CheckCircle2 className="size-3" aria-hidden />}
                      <span>{stepNum}/3</span>
                    </span>
                  );
                })}
              </div>
            </div>
            <MotionFocusBadges tools={scene.focusTools} ariaLabel={t.learning.videoFocusTools} />
          </div>

          {/* Center Dynamic Whiteboard / Visual Canvas */}
          <div
            key={scene.id}
            className="relative z-10 my-4 flex flex-1 animate-[scene-enter_0.4s_ease-out] flex-col justify-center"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-extrabold leading-snug tracking-tight text-white md:text-3xl">
                    {scene.headline[locale]}
                  </h3>
                  {scene.roadmapStep && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-200 ring-1 ring-emerald-400/45">
                      <Flag className="size-3.5" aria-hidden />
                      {scene.roadmapStep.label[locale]}
                    </span>
                  )}
                </div>

                {/* LAYOUT 1: HOOK (0:00–0:15) */}
                {scene.layout === "hook" && (
                  <div className="mt-4 space-y-3" lang="en" dir="ltr">
                    <div className="grid gap-3 md:grid-cols-2">
                      {scene.visualPoints.map((pt, idx) => (
                        <div
                          key={idx}
                          className="relative rounded-xl border-2 border-dashed border-cyan-400/45 bg-white/10 p-4 text-sm font-bold text-cyan-100 backdrop-blur-sm transition hover:scale-[1.02] md:text-base"
                        >
                          <ArrowRight
                            className="me-1.5 inline size-4 animate-[arrow-nudge_1.4s_ease-in-out_infinite] text-amber-300"
                            aria-hidden
                          />
                          <HighlightedText text={pt} surface="dark" {...kwProps} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* LAYOUT 2: STEP 1 EXPLICIT WHITEBOARD RULE CARDS */}
                {scene.layout === "diagram" && (
                  <div className="mt-4 space-y-3">
                    {scene.ruleCards && scene.ruleCards.length > 0 ? (
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {scene.ruleCards.slice(0, 4).map((card, idx) => (
                          <button
                            key={`${card.group}-${idx}`}
                            type="button"
                            onClick={() => {
                              playSpeech(
                                `${card.group} ${card.takes}. ${card.example}`,
                                speed,
                                idx % 2 === 0 ? "female" : "male",
                              );
                              launchEmojiBurst(["📘", "🔊"], false);
                            }}
                            className="group rounded-xl border border-cyan-400/40 bg-slate-900/85 p-3 text-start transition hover:scale-[1.01] hover:border-amber-300"
                          >
                            <div
                              className="flex items-center justify-between gap-2"
                              lang="en"
                              dir="ltr"
                            >
                              <span className="rounded-md bg-red-500/20 px-2 py-0.5 text-xs font-extrabold text-red-200">
                                <HighlightedText text={card.group} surface="dark" {...kwProps} />
                              </span>
                              <Volume2
                                className="size-3.5 shrink-0 text-amber-300 opacity-80 group-hover:opacity-100"
                                aria-hidden
                              />
                            </div>
                            <p
                              className="mt-1.5 text-sm font-extrabold text-amber-200"
                              lang="en"
                              dir="ltr"
                            >
                              ➜ <HighlightedText text={card.takes} surface="dark" {...kwProps} />
                            </p>
                            <p
                              className="mt-1 text-xs font-medium text-slate-100"
                              lang="en"
                              dir="ltr"
                            >
                              “<HighlightedText text={card.example} surface="dark" {...kwProps} />”
                            </p>
                            <p className="mt-0.5 text-[11px] text-cyan-200/85" lang="ar" dir="rtl">
                              {card.arabic}
                            </p>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="grid gap-2 md:grid-cols-3" lang="en" dir="ltr">
                        {scene.visualPoints.map((pt, idx) => (
                          <div
                            key={idx}
                            className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-slate-100"
                          >
                            <HighlightedText text={pt} surface="dark" {...kwProps} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* LAYOUT 3: INTERACTIVE CLICKABLE PAUSE & PREDICT (#1 and #2) */}
                {scene.layout === "pause-predict" && scene.pausePredict && (
                  <div className="mt-4 rounded-2xl border-2 border-amber-400/75 bg-slate-900/90 p-4 shadow-lg">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-extrabold text-amber-200">
                        <PauseCircle className="size-4" aria-hidden />
                        {format(t.learning.videoPausePredictBadge, {
                          num: scene.pausePredict.challengeNumber,
                        })}
                      </span>
                      <span className="text-xs font-medium text-amber-100/90">
                        {t.learning.videoPausePrompt}
                      </span>
                    </div>

                    <p
                      className="mt-2.5 text-base font-bold leading-relaxed text-white"
                      lang="en"
                      dir="ltr"
                    >
                      <HighlightedText
                        text={scene.pausePredict.question.en}
                        surface="dark"
                        {...kwProps}
                      />
                    </p>
                    {locale === "ar" && (
                      <p className="mt-1 text-sm text-sky-200" lang="ar" dir="rtl">
                        {scene.pausePredict.question.ar}
                      </p>
                    )}

                    {/* Clickable Live Interactive Options Right Inside the Video! */}
                    <div className="mt-3 grid gap-2 sm:grid-cols-3" dir="ltr">
                      {scene.pausePredict.choices.map((choice, cIdx) => {
                        const isPicked = pickedChoices[scene.id] === choice;
                        const isCorrectChoice =
                          choice.trim().toLowerCase() ===
                          scene.pausePredict!.answer.trim().toLowerCase();
                        const revealed = Boolean(revealedChallenges[scene.id]);
                        return (
                          <button
                            key={choice}
                            type="button"
                            disabled={revealed}
                            onClick={() =>
                              handleInteractiveChoice(scene.id, choice, scene.pausePredict!.answer)
                            }
                            className={`rounded-xl border px-3 py-2.5 text-start text-xs font-bold transition md:text-sm ${
                              revealed && isCorrectChoice
                                ? "border-emerald-400 bg-emerald-500/25 text-emerald-100 ring-2 ring-emerald-400/50"
                                : isPicked && !isCorrectChoice
                                  ? "border-rose-400 bg-rose-500/20 text-rose-100"
                                  : "border-white/20 bg-white/10 text-white hover:scale-[1.02] hover:border-amber-300 hover:bg-amber-400/15"
                            }`}
                          >
                            <span className="me-1.5 text-amber-300">
                              {String.fromCharCode(65 + cIdx)}.
                            </span>
                            {choice}
                          </button>
                        );
                      })}
                    </div>

                    {shownHints[scene.id] && !revealedChallenges[scene.id] && (
                      <p className="mt-2.5 rounded-lg bg-amber-500/15 px-3 py-2 text-xs text-amber-100">
                        <Lightbulb className="me-1 inline size-3.5 text-amber-300" aria-hidden />
                        {scene.pausePredict.hint[locale]}
                      </p>
                    )}

                    {revealedChallenges[scene.id] ? (
                      <div className="mt-3 rounded-xl border border-emerald-400/60 bg-emerald-950/70 p-3">
                        <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">
                          <CheckCircle2 className="me-1 inline size-4" aria-hidden />
                          🎉 {t.learning.videoAnswerRevealed}:{" "}
                          <span className="text-white" lang="en" dir="ltr">
                            <HighlightedText
                              text={scene.pausePredict.answer}
                              surface="dark"
                              {...kwProps}
                            />
                          </span>
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-emerald-100">
                          {locale === "en" ? (
                            <HighlightedText
                              text={scene.pausePredict.explanation.en}
                              surface="dark"
                              {...kwProps}
                            />
                          ) : (
                            scene.pausePredict.explanation.ar
                          )}
                        </p>
                      </div>
                    ) : (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          onClick={() => revealAndContinue(scene.id)}
                        >
                          <Eye className="size-4" aria-hidden />
                          {t.learning.videoRevealAnswer}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="text-amber-200 hover:bg-white/10 hover:text-amber-100"
                          onClick={() =>
                            setShownHints((prev) => ({ ...prev, [scene.id]: !prev[scene.id] }))
                          }
                        >
                          <Lightbulb className="size-4" aria-hidden />
                          {shownHints[scene.id]
                            ? t.learning.videoPauseHintHide
                            : t.learning.videoPauseHintShow}
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* LAYOUT 4: STEP 2 VISUAL CONTRAST + ARABIC ↔ ENGLISH BRIDGE */}
                {scene.layout === "comparison" && (
                  <div className="mt-4 space-y-3">
                    <div
                      className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr]"
                      lang="en"
                      dir="ltr"
                    >
                      {scene.highlight?.wrong && (
                        <div className="rounded-xl border-2 border-rose-400/50 bg-rose-950/55 p-3.5">
                          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-rose-300">
                            <XCircle className="size-4" aria-hidden />❌ {t.learning.guideWrong}
                          </p>
                          <p className="mt-1.5 text-sm font-semibold text-rose-100 line-through decoration-rose-400/80 md:text-base">
                            {scene.highlight.wrong}
                          </p>
                        </div>
                      )}
                      <ArrowRight
                        className="mx-auto hidden size-6 animate-[arrow-nudge_1.3s_ease-in-out_infinite] text-emerald-300 md:block"
                        aria-hidden
                      />
                      {scene.highlight?.right && (
                        <div className="rounded-xl border-2 border-emerald-400/60 bg-emerald-950/60 p-3.5 shadow-md shadow-emerald-500/20">
                          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-emerald-300">
                            <CheckCircle2 className="size-4" aria-hidden />✅{" "}
                            {t.learning.guideRight}
                          </p>
                          <p className="mt-1.5 text-sm font-semibold text-emerald-100 md:text-base">
                            <HighlightedText
                              text={scene.highlight.right}
                              surface="dark"
                              {...kwProps}
                            />
                          </p>
                        </div>
                      )}
                    </div>

                    {scene.l1Bridge && (
                      <div className="rounded-xl border border-cyan-400/40 bg-slate-900/80 p-3.5">
                        <p className="flex items-center gap-1.5 text-xs font-extrabold text-cyan-200">
                          <Globe2 className="size-4" aria-hidden />
                          {t.learning.guideL1BridgeTitle}
                        </p>
                        <p className="mt-1.5 text-xs leading-relaxed text-amber-100">
                          <span className="font-bold text-amber-300">
                            {t.learning.guideArabicHabit}{" "}
                          </span>
                          {scene.l1Bridge.arabicHabit[locale]}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-emerald-100">
                          <span className="font-bold text-emerald-300">
                            {t.learning.guideEnglishRule}{" "}
                          </span>
                          {locale === "en" ? (
                            <HighlightedText
                              text={scene.l1Bridge.englishRule.en}
                              surface="dark"
                              {...kwProps}
                            />
                          ) : (
                            scene.l1Bridge.englishRule.ar
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* LAYOUT 5: STEP 3 LIVE MALE & FEMALE CONVERSATION */}
                {scene.layout === "walkthrough" && (
                  <div className="mt-4 space-y-2.5">
                    {scene.conversation && scene.conversation.length > 0 ? (
                      <div className="rounded-2xl border border-emerald-400/45 bg-slate-900/85 p-3.5">
                        <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-200">
                            <MessageSquare className="size-4" aria-hidden />
                            {t.learning.guideDialogueTitle}
                          </span>
                          <Button
                            type="button"
                            size="sm"
                            variant={playingConversation ? "secondary" : "default"}
                            onClick={toggleStageConversation}
                            className="h-8 text-xs"
                          >
                            {playingConversation ? (
                              <>
                                <Square className="size-3 fill-current" aria-hidden />
                                {t.learning.stopConversation}
                              </>
                            ) : (
                              <>
                                <Play className="size-3 fill-current" aria-hidden />
                                {t.learning.playConversation}
                              </>
                            )}
                          </Button>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {scene.conversation.map((turn, idx) => {
                            const isFemale = turn.gender === "female";
                            const isCurrent = activeConvTurn === idx;
                            return (
                              <button
                                key={`${turn.speaker}-${idx}`}
                                type="button"
                                onClick={() => {
                                  stopConversationAudio();
                                  speakAsRole(
                                    turn.textEn,
                                    isFemale
                                      ? turn.role === "teacher"
                                        ? "female-teacher"
                                        : "female-student"
                                      : turn.role === "teacher"
                                        ? "male-teacher"
                                        : "male-student",
                                    { rate: speed },
                                  );
                                  launchEmojiBurst([isFemale ? "👩" : "👨", "🔊"], false);
                                }}
                                className={`rounded-xl border p-2.5 text-start transition ${
                                  isCurrent
                                    ? "border-amber-300 bg-amber-400/20 ring-1 ring-amber-300/60"
                                    : isFemale
                                      ? "border-cyan-400/35 bg-cyan-950/40 hover:border-cyan-300"
                                      : "border-emerald-400/35 bg-emerald-950/40 hover:border-emerald-300"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span
                                    className={`text-[11px] font-extrabold ${
                                      isFemale ? "text-cyan-200" : "text-emerald-200"
                                    }`}
                                  >
                                    {isFemale ? "👩" : "👨"} {turn.speaker} (
                                    {isFemale
                                      ? t.learning.femaleVoiceBadge
                                      : t.learning.maleVoiceBadge}
                                    )
                                  </span>
                                  <Volume2
                                    className="size-3.5 shrink-0 text-white/75"
                                    aria-hidden
                                  />
                                </div>
                                <p
                                  className="mt-1 text-xs font-semibold leading-relaxed text-white"
                                  lang="en"
                                  dir="ltr"
                                >
                                  <HighlightedText text={turn.textEn} surface="dark" {...kwProps} />
                                </p>
                                {locale === "ar" && (
                                  <p
                                    className="mt-0.5 text-[11px] text-sky-200/90"
                                    lang="ar"
                                    dir="rtl"
                                  >
                                    {turn.textAr}
                                  </p>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      scene.highlight?.right && (
                        <button
                          type="button"
                          lang="en"
                          dir="ltr"
                          onClick={() => {
                            playSpeech(scene.highlight!.right!, speed, "female");
                            launchEmojiBurst(["🔊", "🗣️", "✨"], false);
                          }}
                          className="w-full rounded-xl border-2 border-emerald-400/55 bg-emerald-950/50 p-4 text-start transition hover:scale-[1.01] hover:border-emerald-300"
                        >
                          <p className="flex items-center justify-between gap-2 text-base font-bold leading-relaxed text-emerald-100 md:text-lg">
                            <span>
                              🗣️ “
                              <HighlightedText
                                text={scene.highlight.right}
                                surface="dark"
                                {...kwProps}
                              />
                              ”
                            </span>
                            <Volume2 className="size-5 shrink-0 text-emerald-300" aria-hidden />
                          </p>
                        </button>
                      )
                    )}
                  </div>
                )}

                {/* LAYOUT 6: 15-SECOND ACTIVE SUMMARY & TAKEAWAY TASK */}
                {scene.layout === "summary" && (
                  <div className="mt-4 space-y-3">
                    <div className="grid gap-2 md:grid-cols-3" lang="en" dir="ltr">
                      {scene.visualPoints.map((pt, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg border border-cyan-400/35 bg-white/10 px-3 py-2 text-xs font-semibold text-cyan-100"
                        >
                          <HighlightedText text={pt} surface="dark" {...kwProps} />
                        </div>
                      ))}
                    </div>
                    {scene.takeawayTask && (
                      <div className="rounded-xl border-2 border-amber-400/60 bg-amber-500/15 p-3.5">
                        <p className="text-xs font-extrabold uppercase tracking-wide text-amber-200">
                          <Sparkles className="me-1 inline size-3.5" aria-hidden />
                          {t.learning.videoTakeawayTitle}
                        </p>
                        <p className="mt-1 text-sm font-semibold leading-relaxed text-amber-50">
                          {scene.takeawayTask[locale]}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* High-Quality Skill Visual Aid with Concept Emoji */}
              <SkillVisualAid skill={scene.illustration} sceneEmoji={scene.sceneEmoji} />
            </div>

            {/* Animated Chronological / Sequential Timeline with Emojis */}
            {scene.timeline && scene.timeline.length > 0 && (
              <AnimatedChronologicalTimeline
                nodes={scene.timeline}
                title={t.learning.videoTimelineTitle}
              />
            )}
          </div>

          {/* Animated Classroom Cast: Coach Layla (Female), Coach Omar (Male) + Animated Learners Sara & Tariq */}
          <AnimatedClassroomCast
            dialogue={scene.dialogue}
            learnerReaction={scene.learnerReaction}
            activeLineIndex={activeLineIndex}
            playing={playing}
            muted={muted}
            celebrating={celebrating || scene.layout === "summary"}
            locale={locale}
            laylaName={t.learning.teacherLayla}
            omarName={t.learning.teacherOmar}
            saraName={t.learning.learnerSara}
            tariqName={t.learning.learnerTariq}
            speakingLabel={t.learning.videoSpeakingNow}
            onSelectLine={selectDialogueLine}
          />

          {/* Interactive Emoji Reaction Bar */}
          <div className="relative z-10 mt-2.5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/15 bg-black/45 px-3 py-2">
            <span className="text-xs font-bold text-slate-200">{t.learning.videoReactPrompt}</span>
            <div className="flex flex-wrap gap-1.5">
              {REACTION_EMOJIS.map((r) => (
                <button
                  key={r.symbol}
                  type="button"
                  onClick={() => handleReactionTap(r.symbol)}
                  className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-bold text-white transition hover:scale-105 hover:border-amber-300 hover:bg-amber-400/20"
                >
                  <span>{r.symbol}</span>
                  <span>{locale === "ar" ? r.labelAr : r.labelEn}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Optional Bilingual Subtitle Strip */}
          {subtitles !== "off" && (
            <div className="relative z-10 mt-2 rounded-lg border border-white/10 bg-black/55 px-3.5 py-2 text-center backdrop-blur-md">
              {(subtitles === "both" || subtitles === "en") && (
                <p className="text-xs leading-relaxed text-slate-200" lang="en" dir="ltr">
                  <HighlightedText
                    text={scene.dialogue[activeLineIndex]?.textEn ?? scene.narrationEn}
                    surface="dark"
                    {...kwProps}
                  />
                </p>
              )}
              {(subtitles === "both" || subtitles === "ar") && (
                <p className="mt-0.5 text-xs font-medium text-cyan-200" lang="ar" dir="rtl">
                  {scene.dialogue[activeLineIndex]?.textAr ?? scene.subtitleAr}
                </p>
              )}
            </div>
          )}

          {/* Center Play Overlay when paused at 0:00 */}
          {!playing && elapsed === 0 && (
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-slate-950/20">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={t.learning.videoPlay}
                className="pointer-events-auto flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl ring-4 ring-white/25 transition hover:scale-105"
              >
                <Play className="ms-1 size-7 fill-current" aria-hidden />
              </button>
            </div>
          )}
        </div>

        {/* Video Controls Bar */}
        <div className="border-t border-slate-800 bg-slate-900/95 px-4 py-3">
          <div className="relative mb-3 flex items-center" dir="ltr">
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 transition-all duration-200"
                style={{ width: `${progressPercent}%` }}
              />
              {video.scenes.slice(1).map((sc) => (
                <span
                  key={sc.id}
                  style={{ left: `${(sc.startSeconds / video.durationSeconds) * 100}%` }}
                  className={`pointer-events-none absolute top-0 h-full w-1 ${
                    sc.layout === "pause-predict" ? "bg-amber-400" : "bg-slate-950/80"
                  }`}
                />
              ))}
            </div>
            <input
              type="range"
              min={0}
              max={video.durationSeconds}
              step={1}
              value={Math.floor(elapsed)}
              onChange={(e) => handleScrub(Number(e.target.value))}
              aria-label={video.title[locale]}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={togglePlay}
                aria-label={playing ? t.learning.videoPause : t.learning.videoPlay}
              >
                {playing ? (
                  <Pause className="size-4" aria-hidden />
                ) : (
                  <Play className="size-4" aria-hidden />
                )}
                <span>{playing ? t.learning.videoPause : t.learning.videoPlay}</span>
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="text-slate-200 hover:bg-white/10 hover:text-white"
                onClick={replay}
                aria-label={t.learning.videoReplay}
              >
                <RotateCcw className="size-4" aria-hidden />
              </Button>
              <span className="ms-1 font-mono text-xs text-slate-300" dir="ltr">
                {formatClock(elapsed)} / {formatClock(video.durationSeconds)}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="text-slate-200 hover:bg-white/10 hover:text-white"
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? t.learning.videoUnmute : t.learning.videoMute}
              >
                {muted ? (
                  <VolumeX className="size-4" aria-hidden />
                ) : (
                  <Volume2 className="size-4" aria-hidden />
                )}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="text-xs font-bold text-slate-200 hover:bg-white/10 hover:text-white"
                onClick={() => setSpeedIndex((i) => (i + 1) % SPEEDS.length)}
                aria-label={t.learning.videoSpeed}
              >
                <span dir="ltr">{speed}×</span>
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-white"
                onClick={cycleSubtitles}
                aria-label={t.learning.videoSubtitles}
              >
                <Subtitles className="size-4" aria-hidden />
                <span>{subtitleLabel}</span>
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="text-slate-200 hover:bg-white/10 hover:text-white"
                onClick={toggleFullscreen}
                aria-label={t.learning.videoFullscreen}
              >
                <Maximize2 className="size-4" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Beat Micro-Lesson Timeline Strip */}
      <div className="mt-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {t.learning.videoChapters}
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {video.scenes.map((sc, idx) => {
            const active = idx === sceneIndex;
            const isPause = sc.layout === "pause-predict";
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => jumpToScene(idx)}
                className={`flex flex-col items-start rounded-xl border p-3 text-start transition ${
                  active
                    ? "border-primary bg-primary/10 text-foreground shadow-xs"
                    : isPause
                      ? "border-amber-500/35 bg-amber-500/5 text-foreground hover:border-amber-500/70"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                <span className="font-mono text-xs font-bold text-primary" dir="ltr">
                  {formatClock(sc.startSeconds)}–{formatClock(sc.startSeconds + sc.durationSeconds)}
                </span>
                <span className="mt-1 text-xs font-bold">{sc.chapterLabel[locale]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dual-Coding Two-Column Storyboard & Interactive Dialogue Table */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
              <Table2 className="size-5 text-primary" aria-hidden />
              {t.learning.storyboardTitle}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">{t.learning.storyboardSubtitle}</p>
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setShowStoryboard((s) => !s)}
          >
            {showStoryboard ? t.learning.storyboardHide : t.learning.storyboardShow}
          </Button>
        </div>

        {showStoryboard && (
          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/60 text-start">
                <tr>
                  <th className="w-[44%] px-4 py-3 text-start font-bold text-foreground">
                    {t.learning.storyboardColVisual}
                  </th>
                  <th className="w-[56%] px-4 py-3 text-start font-bold text-foreground">
                    {t.learning.storyboardColNarration}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {video.scenes.map((sc, idx) => {
                  const isCurrent = idx === sceneIndex;
                  const studentLabel =
                    sc.learnerReaction.student === "sara"
                      ? t.learning.learnerSara
                      : t.learning.learnerTariq;
                  return (
                    <tr
                      key={sc.id}
                      className={isCurrent ? "bg-primary/5" : "bg-card hover:bg-muted/30"}
                    >
                      {/* LEFT COLUMN: Visuals, Emojis, Motion Graphics & Timeline */}
                      <td className="px-4 py-4 align-top">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => jumpToScene(idx)}
                            className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-bold text-primary hover:bg-primary/20"
                            dir="ltr"
                            aria-label={`${t.learning.storyboardJump}: ${sc.chapterLabel[locale]}`}
                          >
                            <Play className="size-3" aria-hidden />
                            {formatClock(sc.startSeconds)}–
                            {formatClock(sc.startSeconds + sc.durationSeconds)}
                          </button>
                          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-bold text-secondary-foreground">
                            {sc.chapterLabel[locale]}
                          </span>
                          {sc.roadmapStep && (
                            <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-bold text-success">
                              ✓ {sc.roadmapStep.label[locale]}
                            </span>
                          )}
                        </div>
                        <p className="mt-2.5 text-xs leading-relaxed text-foreground md:text-sm">
                          {sc.visualAction[locale]}
                        </p>
                        {sc.timeline && sc.timeline.length > 0 && (
                          <p
                            className="mt-2 rounded-md bg-muted/70 px-2.5 py-1 font-mono text-[11px] font-semibold text-primary"
                            dir="ltr"
                          >
                            {sc.timeline
                              .map((n) => `${n.emoji} ${n.marker} (${n.label})`)
                              .join(" → ")}
                          </p>
                        )}
                      </td>

                      {/* RIGHT COLUMN: Interactive Teacher & Learner Dialogue */}
                      <td className="px-4 py-4 align-top">
                        <div className="space-y-2">
                          {sc.dialogue.map((line, lIdx) => (
                            <div key={lIdx} className="rounded-lg bg-muted/45 px-3 py-2">
                              <span
                                className={`text-xs font-extrabold ${
                                  line.speaker === "layla" ? "text-primary" : "text-success"
                                }`}
                              >
                                {line.emoji}{" "}
                                {line.speaker === "layla"
                                  ? t.learning.teacherLayla
                                  : t.learning.teacherOmar}
                                :{" "}
                              </span>
                              <span className="text-sm text-foreground" lang="en" dir="ltr">
                                {line.textEn}
                              </span>
                              {locale === "ar" && (
                                <p
                                  className="mt-1 text-xs text-muted-foreground"
                                  lang="ar"
                                  dir="rtl"
                                >
                                  {line.textAr}
                                </p>
                              )}
                            </div>
                          ))}
                          <div className="rounded-lg border border-amber-500/25 bg-amber-500/5 px-3 py-2 text-xs">
                            <span className="font-extrabold text-amber-700 dark:text-amber-300">
                              {sc.learnerReaction.emoji} {studentLabel}:{" "}
                            </span>
                            <span className="text-foreground">
                              {sc.learnerReaction.bubble[locale]}
                            </span>
                          </div>
                        </div>
                        {sc.pausePredict && (
                          <div className="mt-2.5 rounded-lg border border-amber-500/35 bg-amber-500/10 px-3 py-2 text-xs">
                            <span className="font-bold text-amber-800 dark:text-amber-200">
                              ⏸{" "}
                              {format(t.learning.videoPausePredictBadge, {
                                num: sc.pausePredict.challengeNumber,
                              })}
                              :{" "}
                            </span>
                            <span className="text-foreground" lang="en" dir="ltr">
                              {sc.pausePredict.question.en}
                            </span>
                          </div>
                        )}
                        {sc.takeawayTask && (
                          <div className="mt-2.5 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-xs font-medium text-foreground">
                            <span className="font-bold text-primary">
                              {t.learning.videoTakeawayTitle}:{" "}
                            </span>
                            {sc.takeawayTask[locale]}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
