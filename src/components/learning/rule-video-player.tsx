import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  Clock,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Subtitles,
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

  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(1); // 1x default
  const [subtitles, setSubtitles] = useState<SubtitleMode>("both");

  const speed = SPEEDS[speedIndex] ?? 1;
  const sceneIndex = getSceneIndexAt(video.scenes, elapsed);
  const activeScene = video.scenes[sceneIndex] ?? video.scenes[0];
  const progressPercent = Math.min(100, (elapsed / video.durationSeconds) * 100);

  // Stop speech cleanly on unmount.
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        window.speechSynthesis?.cancel();
      }
    };
  }, []);

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
    }
    spokenSceneRef.current = null;
    setPlaying(true);
  }

  function replay() {
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    spokenSceneRef.current = null;
    setElapsed(0);
    setPlaying(true);
  }

  function jumpToScene(idx: number) {
    const target = video.scenes[idx];
    if (!target) return;
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    spokenSceneRef.current = null;
    setElapsed(target.startSeconds);
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
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
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
        </div>
        <span className="text-xs font-semibold text-muted-foreground">
          {format(t.learning.videoSceneOf, { current: sceneIndex + 1, total: video.scenes.length })}
        </span>
      </div>

      <h2 className="text-2xl font-bold">{video.title[locale]}</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">{video.presenterNote[locale]}</p>

      {/* Cinematic 16:9 Animated Stage */}
      <div
        ref={stageRef}
        className="mt-5 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 text-white shadow-xl"
      >
        <div className="relative flex min-h-[320px] flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-5 md:aspect-video md:min-h-0 md:p-8">
          {/* Ambient motion-graphics glow orbs */}
          <div
            className="pointer-events-none absolute -end-16 -top-16 size-64 rounded-full bg-sky-500/15 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 -start-16 size-72 rounded-full bg-violet-500/20 blur-3xl"
            aria-hidden
          />

          {/* Top Bar inside video stage */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-sky-400/30 bg-sky-400/15 px-3 py-1 text-xs font-bold text-sky-200">
                {scene.chapterLabel[locale]}
              </span>
              {scene.highlight?.badge && (
                <span
                  className="hidden rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-200 sm:inline-block"
                  lang="en"
                  dir="ltr"
                >
                  {scene.highlight.badge}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden text-xs font-medium text-slate-300 sm:inline">
                {t.learning.videoCoach}
              </span>
              <AiTeacherAvatar speaking={playing && !muted} />
            </div>
          </div>

          {/* Center Visual Slide Canvas */}
          <div className="relative z-10 my-5 flex flex-1 flex-col justify-center">
            <h3 className="text-xl font-extrabold leading-snug tracking-tight text-white md:text-3xl">
              {scene.headline[locale]}
            </h3>

            {scene.layout === "intro" && (
              <div className="mt-4 grid gap-3 md:grid-cols-2" lang="en" dir="ltr">
                {scene.visualPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-white/15 bg-white/10 p-4 text-sm leading-relaxed text-slate-100 backdrop-blur-sm"
                  >
                    <span className="mb-1 inline-block rounded-md bg-sky-400/20 px-2 py-0.5 text-xs font-bold text-sky-200">
                      0{idx + 1}
                    </span>
                    <p className="mt-1">{point}</p>
                  </div>
                ))}
              </div>
            )}

            {scene.layout === "formula" && (
              <div className="mt-4 space-y-4" lang="en" dir="ltr">
                {formulaParts.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 rounded-xl border border-sky-400/30 bg-slate-900/75 p-4">
                    {formulaParts.map((part, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="rounded-lg bg-gradient-to-r from-sky-500/30 to-indigo-500/30 px-3 py-1.5 text-sm font-bold text-sky-100 ring-1 ring-sky-400/40">
                          {part}
                        </span>
                        {idx < formulaParts.length - 1 && (
                          <span className="font-bold text-sky-300">+</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <ul className="space-y-2">
                  {scene.visualPoints.map((pt, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 rounded-lg bg-white/10 px-3.5 py-2 text-xs leading-relaxed text-slate-100 md:text-sm"
                    >
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-emerald-300"
                        aria-hidden
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {scene.layout === "comparison" && (
              <div className="mt-4 space-y-3" lang="en" dir="ltr">
                <div className="grid gap-3 md:grid-cols-2">
                  {scene.highlight?.wrong && (
                    <div className="rounded-xl border border-rose-400/40 bg-rose-950/55 p-4">
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
                    <div className="rounded-xl border border-emerald-400/40 bg-emerald-950/55 p-4">
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
                  <p className="rounded-lg bg-white/10 px-4 py-2.5 text-xs leading-relaxed text-slate-100 md:text-sm">
                    {scene.visualPoints[0]}
                  </p>
                )}
              </div>
            )}

            {scene.layout === "practice" && (
              <div className="mt-4 space-y-3" lang="en" dir="ltr">
                {scene.highlight?.formula && (
                  <div className="rounded-xl border border-amber-400/40 bg-amber-500/15 p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-amber-200">
                      {t.learning.guideMemoryTip}
                    </p>
                    <p className="mt-1.5 text-sm font-semibold text-amber-50 md:text-base">
                      {scene.highlight.formula}
                    </p>
                  </div>
                )}
                {scene.highlight?.right && (
                  <div className="rounded-xl border border-emerald-400/30 bg-white/10 p-3.5 text-sm font-medium text-emerald-100">
                    “{scene.highlight.right}”
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
          {/* Scrubbable Timeline with Chapter Markers */}
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
                  className="pointer-events-none absolute top-0 h-full w-0.5 bg-slate-950/80"
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

      {/* Clickable Chapter Strip */}
      <div className="mt-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {t.learning.videoChapters}
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {video.scenes.map((sc, idx) => {
            const active = idx === sceneIndex;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => jumpToScene(idx)}
                className={`flex flex-col items-start rounded-xl border p-3 text-start transition ${
                  active
                    ? "border-primary bg-primary/10 text-foreground shadow-xs"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                <span className="font-mono text-xs font-bold text-primary" dir="ltr">
                  {formatClock(sc.startSeconds)}
                </span>
                <span className="mt-1 text-xs font-bold">{sc.chapterLabel[locale]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Collapsible Timestamped Video Script */}
      <details className="mt-4 rounded-xl border border-border bg-muted/40 p-4">
        <summary className="cursor-pointer text-sm font-semibold text-primary">
          {t.learning.videoTranscript}
        </summary>
        <div className="mt-4 space-y-4">
          {video.scenes.map((sc, idx) => (
            <div key={sc.id} className="rounded-lg border border-border bg-card p-3.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-primary">{sc.chapterLabel[locale]}</span>
                <button
                  type="button"
                  onClick={() => jumpToScene(idx)}
                  className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs font-bold text-secondary-foreground hover:opacity-85"
                  dir="ltr"
                >
                  {formatClock(sc.startSeconds)}
                </button>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground" lang="en" dir="ltr">
                {sc.narrationEn}
              </p>
              <p
                className="mt-1.5 text-sm leading-relaxed text-muted-foreground"
                lang="ar"
                dir="rtl"
              >
                {sc.subtitleAr}
              </p>
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}
