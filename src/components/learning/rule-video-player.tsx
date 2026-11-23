import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  Clock,
  Eye,
  Flag,
  Lightbulb,
  Maximize2,
  Pause,
  PauseCircle,
  Play,
  RotateCcw,
  Sparkles,
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

type SubtitleMode = "both" | "en" | "ar" | "off";
const SPEEDS = [0.75, 1, 1.25] as const;

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

function AiTeacherAvatar({ speaking }: { speaking: boolean }) {
  return (
    <div className="relative flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-md">
      <div className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 via-indigo-500 to-violet-500 shadow-md">
        <svg viewBox="0 0 40 40" className="size-8" aria-hidden="true">
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1.5"
          />
          <circle cx="20" cy="17" r="7.5" fill="#fef3c7" />
          <path
            d="M12.5 16.5 C12.5 9.5, 27.5 9.5, 27.5 16.5 C25.5 13, 14.5 13, 12.5 16.5 Z"
            fill="#1e293b"
          />
          <circle cx="17.2" cy="16.8" r="1.15" fill="#0f172a" />
          <circle cx="22.8" cy="16.8" r="1.15" fill="#0f172a" />
          {speaking ? (
            <ellipse cx="20" cy="20.6" rx="2.3" ry="1.6" fill="#be123c" />
          ) : (
            <path
              d="M17.5 20.2 Q20 22.2 22.5 20.2"
              stroke="#0f172a"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
            />
          )}
          <path d="M11 33 C12 26.5, 28 26.5, 29 33" fill="#38bdf8" />
        </svg>
        {speaking && (
          <span className="absolute -inset-0.5 animate-ping rounded-full border border-sky-300/60" />
        )}
      </div>
      <div className="flex items-end gap-0.5" aria-hidden="true">
        {[10, 16, 12, 18, 9].map((h, i) => (
          <span
            key={i}
            style={{ height: speaking ? `${h}px` : "5px", transitionDelay: `${i * 40}ms` }}
            className={`w-1 rounded-full transition-all duration-300 ${
              speaking ? "animate-pulse bg-sky-300" : "bg-white/35"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export interface RuleVideoPlayerProps {
  video: ExplainerVideo;
}

export function RuleVideoPlayer({ video }: RuleVideoPlayerProps) {
  const { locale, t } = useI18n();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const spokenSceneRef = useRef<number | null>(null);
  const autoPausedScenesRef = useRef<Set<string>>(new Set());

  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(1);
  const [subtitles, setSubtitles] = useState<SubtitleMode>("both");
  const [revealedChallenges, setRevealedChallenges] = useState<Record<string, boolean>>({});
  const [shownHints, setShownHints] = useState<Record<string, boolean>>({});
  const [showStoryboard, setShowStoryboard] = useState(true);

  const speed = SPEEDS[speedIndex] ?? 1;
  const sceneIndex = getSceneIndexAt(video.scenes, elapsed);
  const activeScene = video.scenes[sceneIndex] ?? video.scenes[0];
  const completedSteps = getCompletedStepsAt(video.scenes, sceneIndex);
  const progressPercent = Math.min(100, (elapsed / video.durationSeconds) * 100);

  // Stop speech cleanly on unmount.
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        window.speechSynthesis?.cancel();
      }
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
      if (typeof window !== "undefined") {
        window.speechSynthesis?.cancel();
      }
    }
  }, [activeScene, playing, revealedChallenges]);

  // Advance video clock smoothly while playing.
  useEffect(() => {
    if (!playing) return;
    const tickMs = 250;
    const id = window.setInterval(() => {
      setElapsed((prev) => {
        const next = prev + (tickMs / 1000) * speed;
        if (next >= video.durationSeconds) {
          setPlaying(false);
          window.speechSynthesis?.cancel();
          return video.durationSeconds;
        }
        return next;
      });
    }, tickMs);
    return () => window.clearInterval(id);
  }, [playing, speed, video.durationSeconds]);

  // Synchronize Web Speech API voiceover whenever playing starts or scene changes.
  useEffect(() => {
    if (
      !activeScene ||
      typeof window === "undefined" ||
      !window.speechSynthesis ||
      typeof SpeechSynthesisUtterance === "undefined"
    ) {
      return;
    }
    if (!playing || muted) {
      window.speechSynthesis.cancel();
      spokenSceneRef.current = null;
      return;
    }
    if (spokenSceneRef.current === sceneIndex) return;
    spokenSceneRef.current = sceneIndex;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(activeScene.narrationEn);
    utterance.lang = "en-GB";
    utterance.rate = Math.min(1.4, Math.max(0.7, speed * 0.95));
    const voice =
      window.speechSynthesis.getVoices().find((v) => v.lang.startsWith("en-GB")) ??
      window.speechSynthesis.getVoices().find((v) => v.lang.startsWith("en"));
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  }, [playing, muted, sceneIndex, activeScene, speed]);

  if (!activeScene) return null;
  const scene = activeScene;

  function togglePlay() {
    if (playing) {
      setPlaying(false);
      if (typeof window !== "undefined") window.speechSynthesis?.cancel();
      return;
    }
    if (elapsed >= video.durationSeconds - 0.5) {
      setElapsed(0);
      autoPausedScenesRef.current.clear();
    }
    spokenSceneRef.current = null;
    setPlaying(true);
  }

  function replay() {
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    spokenSceneRef.current = null;
    autoPausedScenesRef.current.clear();
    setRevealedChallenges({});
    setShownHints({});
    setElapsed(0);
    setPlaying(true);
  }

  function jumpToScene(idx: number) {
    const target = video.scenes[idx];
    if (!target) return;
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    spokenSceneRef.current = null;
    setElapsed(target.startSeconds);
    if (target.layout === "pause-predict" && !revealedChallenges[target.id]) {
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  }

  function revealAndContinue(sceneId: string) {
    setRevealedChallenges((prev) => ({ ...prev, [sceneId]: true }));
    spokenSceneRef.current = null;
    setPlaying(true);
  }

  function handleScrub(value: number) {
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    spokenSceneRef.current = null;
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

  const formulaParts = (scene.highlight?.formula ?? "").split(/\s*(?:\+|→|\|)\s*/).filter(Boolean);

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

      {/* Cinematic 16:9 Animated Dual-Coding Stage */}
      <div
        ref={stageRef}
        className="mt-5 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 text-white shadow-xl"
      >
        <div className="relative flex min-h-[360px] flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-5 md:aspect-video md:min-h-0 md:p-7">
          {/* Ambient motion-graphics glow orbs */}
          <div
            className="pointer-events-none absolute -end-16 -top-16 size-64 rounded-full bg-sky-500/15 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 -start-16 size-72 rounded-full bg-violet-500/20 blur-3xl"
            aria-hidden
          />

          {/* Top Bar: Chapter + Visual Progress Roadmap + AI Coach Avatar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-sky-400/35 bg-sky-400/15 px-3 py-1 text-xs font-bold text-sky-200">
                {scene.chapterLabel[locale]}
              </span>
              {/* Visual Progress Roadmap Pill Strip */}
              <div
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-3 py-1"
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

            <div className="flex items-center gap-2">
              <span className="hidden text-xs font-medium text-slate-300 sm:inline">
                {t.learning.videoCoach}
              </span>
              <AiTeacherAvatar speaking={playing && !muted} />
            </div>
          </div>

          {/* Center Dynamic Visual Canvas */}
          <div className="relative z-10 my-4 flex flex-1 flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-extrabold leading-snug tracking-tight text-white md:text-3xl">
                {scene.headline[locale]}
              </h3>
              {scene.roadmapStep && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-200 ring-1 ring-emerald-400/40">
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
                      className="rounded-xl border border-sky-400/30 bg-white/10 p-4 text-sm font-bold text-sky-100 backdrop-blur-sm md:text-base"
                    >
                      {pt}
                    </div>
                  ))}
                </div>
                {scene.highlight?.signalTag && (
                  <p className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-200">
                    <Sparkles className="size-3.5" aria-hidden />
                    {scene.highlight.signalTag}
                  </p>
                )}
              </div>
            )}

            {/* LAYOUT 2: STEP 1 VISUAL DIAGRAM */}
            {scene.layout === "diagram" && (
              <div className="mt-4 space-y-3.5" lang="en" dir="ltr">
                {formulaParts.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 rounded-xl border border-sky-400/35 bg-slate-900/80 p-4">
                    {formulaParts.map((part, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="rounded-lg bg-gradient-to-r from-sky-500/30 to-indigo-500/35 px-3 py-1.5 text-sm font-bold text-sky-100 ring-1 ring-sky-400/45">
                          {part}
                        </span>
                        {idx < formulaParts.length - 1 && (
                          <span className="font-bold text-sky-300">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <div className="grid gap-2 md:grid-cols-3">
                  {scene.visualPoints.map((pt, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-slate-100"
                    >
                      {pt}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* LAYOUT 3: INTERACTIVE PAUSE & PREDICT (#1 and #2) */}
            {scene.layout === "pause-predict" && scene.pausePredict && (
              <div className="mt-4 rounded-2xl border-2 border-amber-400/60 bg-slate-900/90 p-5 shadow-lg">
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
                  className="mt-3 text-base font-bold leading-relaxed text-white"
                  lang="en"
                  dir="ltr"
                >
                  {scene.pausePredict.question.en}
                </p>
                {locale === "ar" && (
                  <p className="mt-1 text-sm text-sky-200" lang="ar" dir="rtl">
                    {scene.pausePredict.question.ar}
                  </p>
                )}

                {shownHints[scene.id] && (
                  <p className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-xs text-amber-100">
                    <Lightbulb className="me-1 inline size-3.5 text-amber-300" aria-hidden />
                    {scene.pausePredict.hint[locale]}
                  </p>
                )}

                {revealedChallenges[scene.id] ? (
                  <div className="mt-4 rounded-xl border border-emerald-400/50 bg-emerald-950/60 p-3.5">
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">
                      <CheckCircle2 className="me-1 inline size-4" aria-hidden />
                      {t.learning.videoAnswerRevealed}:{" "}
                      <span className="text-white" lang="en" dir="ltr">
                        {scene.pausePredict.answer}
                      </span>
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-emerald-100">
                      {scene.pausePredict.explanation[locale]}
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 flex flex-wrap gap-2">
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

            {/* LAYOUT 4: STEP 2 VISUAL CONTRAST */}
            {scene.layout === "comparison" && (
              <div className="mt-4 space-y-3" lang="en" dir="ltr">
                <div className="grid gap-3 md:grid-cols-2">
                  {scene.highlight?.wrong && (
                    <div className="rounded-xl border border-rose-400/45 bg-rose-950/55 p-4">
                      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-rose-300">
                        <XCircle className="size-4" aria-hidden />
                        {t.learning.guideWrong}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-rose-100 line-through decoration-rose-400/80 md:text-base">
                        {scene.highlight.wrong}
                      </p>
                    </div>
                  )}
                  {scene.highlight?.right && (
                    <div className="rounded-xl border border-emerald-400/45 bg-emerald-950/55 p-4">
                      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-emerald-300">
                        <CheckCircle2 className="size-4" aria-hidden />
                        {t.learning.guideRight}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-emerald-100 md:text-base">
                        {scene.highlight.right}
                      </p>
                    </div>
                  )}
                </div>
                {scene.visualPoints[0] && (
                  <p className="rounded-lg bg-white/10 px-4 py-2 text-xs leading-relaxed text-slate-100 md:text-sm">
                    {scene.visualPoints[0]}
                  </p>
                )}
              </div>
            )}

            {/* LAYOUT 5: STEP 3 LIVE WALKTHROUGH */}
            {scene.layout === "walkthrough" && (
              <div className="mt-4 space-y-3" lang="en" dir="ltr">
                {scene.highlight?.right && (
                  <div className="rounded-xl border border-emerald-400/40 bg-emerald-950/40 p-4">
                    <p className="text-base font-bold leading-relaxed text-emerald-100 md:text-lg">
                      “{scene.highlight.right}”
                    </p>
                    {scene.highlight.signalTag && (
                      <p className="mt-2 text-xs font-medium text-sky-200">
                        ✦ {scene.highlight.signalTag}
                      </p>
                    )}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {scene.visualPoints.slice(1).map((pt, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-slate-100"
                    >
                      {pt}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* LAYOUT 6: 15-SECOND ACTIVE SUMMARY & TAKEAWAY TASK */}
            {scene.layout === "summary" && (
              <div className="mt-4 space-y-3">
                <div className="grid gap-2 md:grid-cols-3" lang="en" dir="ltr">
                  {scene.visualPoints.map((pt, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-sky-400/30 bg-white/10 px-3 py-2 text-xs font-semibold text-sky-100"
                    >
                      {pt}
                    </div>
                  ))}
                </div>
                {scene.takeawayTask && (
                  <div className="rounded-xl border border-amber-400/50 bg-amber-500/15 p-4">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-amber-200">
                      <Sparkles className="me-1 inline size-3.5" aria-hidden />
                      {t.learning.videoTakeawayTitle}
                    </p>
                    <p className="mt-1.5 text-sm font-semibold leading-relaxed text-amber-50">
                      {scene.takeawayTask[locale]}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Live Bilingual Subtitles Overlay */}
          {subtitles !== "off" && (
            <div className="relative z-10 rounded-xl border border-white/15 bg-black/65 px-4 py-2.5 text-center backdrop-blur-md">
              {(subtitles === "both" || subtitles === "en") && (
                <p className="text-xs leading-relaxed text-white md:text-sm" lang="en" dir="ltr">
                  {scene.narrationEn}
                </p>
              )}
              {(subtitles === "both" || subtitles === "ar") && (
                <p
                  className="mt-1 text-xs font-medium leading-relaxed text-sky-200 md:text-sm"
                  lang="ar"
                  dir="rtl"
                >
                  {scene.subtitleAr}
                </p>
              )}
            </div>
          )}

          {/* Big Center Play Overlay when paused at 0:00 */}
          {!playing && elapsed === 0 && (
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-slate-950/25">
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
                className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 transition-all duration-200"
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
            <div className="flex flex-wrap items-center gap-1.5">
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

      {/* Dual-Coding Two-Column Storyboard & Script Table */}
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
                  return (
                    <tr
                      key={sc.id}
                      className={isCurrent ? "bg-primary/5" : "bg-card hover:bg-muted/30"}
                    >
                      {/* LEFT COLUMN: Visuals & On-Screen Actions */}
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
                      </td>

                      {/* RIGHT COLUMN: Spoken Narration */}
                      <td className="px-4 py-4 align-top">
                        <p className="text-sm leading-relaxed text-foreground" lang="en" dir="ltr">
                          {sc.narrationEn}
                        </p>
                        <p
                          className="mt-2 text-xs leading-relaxed text-muted-foreground"
                          lang="ar"
                          dir="rtl"
                        >
                          {sc.subtitleAr}
                        </p>
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
