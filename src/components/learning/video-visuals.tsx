import {
  ArrowRight,
  CircleDot,
  Highlighter,
  MousePointerClick,
  Sparkles,
  SquareDashed,
} from "lucide-react";
import type {
  LearnerCharacter,
  LearnerReaction,
  LessonCourse,
  LessonSkill,
  MotionFocusTool,
  TeacherLine,
  TeacherMood,
  TeacherSpeaker,
  TimelineNode,
} from "@/content/lesson-types";
import heroLearning from "@/assets/hero-learning.webp";
import pathIelts from "@/assets/path-ielts.webp";
import pathKids from "@/assets/path-kids.webp";
import pathAdults from "@/assets/path-adults.webp";

function courseArtwork(course: LessonCourse): string {
  if (course === "ielts") return pathIelts;
  if (course === "kids") return pathKids;
  if (course === "adults") return pathAdults;
  return heroLearning;
}

/** Vibrant modern animated backdrop with subtle high-res artwork, glowing orbs, and floating concept emojis. */
export function CourseMediaBackdrop({
  course,
  sceneEmoji,
}: {
  course: LessonCourse;
  sceneEmoji: string;
}) {
  return (
    <>
      <img
        src={courseArtwork(course)}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.09] mix-blend-luminosity"
      />
      <div
        className="pointer-events-none absolute -end-16 -top-16 size-72 rounded-full bg-cyan-400/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -start-16 size-80 rounded-full bg-fuchsia-500/20 blur-3xl"
        aria-hidden="true"
      />
      {/* Gentle animated floating concept emojis in backdrop */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute end-6 top-16 animate-[float_3.6s_ease-in-out_infinite] text-3xl opacity-25 select-none"
      >
        {sceneEmoji}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 start-6 animate-[float_4.2s_ease-in-out_infinite] text-2xl opacity-20 select-none"
      >
        ✨
      </span>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        aria-hidden="true"
      >
        <defs>
          <pattern id="elea-video-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#elea-video-grid)" />
      </svg>
    </>
  );
}

/** High-quality custom SVG educational visual aid with expressive emoji badge tailored per skill. */
export function SkillVisualAid({ skill, sceneEmoji }: { skill: LessonSkill; sceneEmoji: string }) {
  return (
    <div
      className="relative hidden size-20 shrink-0 animate-[character-bob_3.2s_ease-in-out_infinite] items-center justify-center rounded-2xl border border-white/25 bg-white/10 p-2 shadow-lg backdrop-blur-md sm:flex"
      aria-hidden="true"
    >
      <span className="absolute -end-2 -top-2 flex size-7 items-center justify-center rounded-full bg-amber-400 text-sm shadow-md">
        {sceneEmoji}
      </span>
      {skill === "grammar" && (
        <svg viewBox="0 0 64 64" className="size-14">
          <rect x="6" y="10" width="22" height="18" rx="5" fill="#38bdf8" />
          <rect x="36" y="10" width="22" height="18" rx="5" fill="#a78bfa" />
          <path
            d="M28 19 H35 M32 15 L36 19 L32 23"
            stroke="#fde047"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <rect x="14" y="38" width="36" height="16" rx="6" fill="#34d399" />
          <path
            d="M32 28 V37 M28 33 L32 37 L36 33"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      )}
      {skill === "reading" && (
        <svg viewBox="0 0 64 64" className="size-14">
          <rect x="8" y="12" width="34" height="40" rx="5" fill="#e0f2fe" />
          <rect x="14" y="20" width="20" height="4" rx="2" fill="#38bdf8" />
          <rect x="14" y="28" width="22" height="5" rx="2" fill="#fde047" />
          <rect x="14" y="37" width="16" height="4" rx="2" fill="#94a3b8" />
          <circle
            cx="44"
            cy="36"
            r="11"
            fill="#0f172a"
            fillOpacity="0.65"
            stroke="#34d399"
            strokeWidth="3.5"
          />
          <line
            x1="52"
            y1="44"
            x2="59"
            y2="51"
            stroke="#34d399"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      )}
      {skill === "listening" && (
        <svg viewBox="0 0 64 64" className="size-14">
          <path
            d="M14 34 A18 18 0 0 1 50 34"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <rect x="10" y="32" width="9" height="18" rx="4.5" fill="#a78bfa" />
          <rect x="45" y="32" width="9" height="18" rx="4.5" fill="#a78bfa" />
          <path
            d="M25 42 V34 M30 46 V28 M35 44 V32 M40 40 V36"
            stroke="#34d399"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      )}
      {skill === "writing" && (
        <svg viewBox="0 0 64 64" className="size-14">
          <rect x="10" y="10" width="32" height="44" rx="5" fill="#f8fafc" />
          <rect x="16" y="18" width="18" height="4" rx="2" fill="#6366f1" />
          <rect x="16" y="27" width="20" height="4" rx="2" fill="#38bdf8" />
          <rect x="16" y="36" width="14" height="4" rx="2" fill="#34d399" />
          <path
            d="M42 46 L55 18 L60 21 L47 49 L40 52 Z"
            fill="#fbbf24"
            stroke="#f59e0b"
            strokeWidth="1.5"
          />
        </svg>
      )}
      {skill === "speaking" && (
        <svg viewBox="0 0 64 64" className="size-14">
          <rect x="8" y="12" width="30" height="20" rx="8" fill="#38bdf8" />
          <polygon points="16,32 16,39 24,32" fill="#38bdf8" />
          <rect x="26" y="32" width="30" height="20" rx="8" fill="#34d399" />
          <polygon points="48,52 48,59 40,52" fill="#34d399" />
          <circle cx="17" cy="22" r="2.2" fill="#0f172a" />
          <circle cx="23" cy="22" r="2.2" fill="#0f172a" />
          <circle cx="29" cy="22" r="2.2" fill="#0f172a" />
        </svg>
      )}
    </div>
  );
}

/** Expressive full-bust animated Teacher SVG character with waving hand, blinking eyes, bobbing head, and lip-sync mouth. */
function AnimatedTeacherFigure({
  speaker,
  active,
  speaking,
  celebrating,
  mood,
  badgeEmoji,
}: {
  speaker: TeacherSpeaker;
  active: boolean;
  speaking: boolean;
  celebrating: boolean;
  mood: TeacherMood;
  badgeEmoji: string;
}) {
  const isLayla = speaker === "layla";
  const motionClass = celebrating
    ? "animate-[celebrate-hop_0.75s_ease-in-out_infinite]"
    : active
      ? "animate-[character-bob_2.2s_ease-in-out_infinite]"
      : "opacity-80";

  return (
    <div
      className={`relative flex flex-col items-center transition-all duration-300 ${motionClass}`}
    >
      {/* Floating emoji badge above character */}
      <span
        aria-hidden="true"
        className={`mb-1 flex size-7 items-center justify-center rounded-full text-base shadow-md transition-transform ${
          active ? "scale-110 bg-amber-300/95" : "scale-90 bg-white/15"
        }`}
      >
        {celebrating ? "🎉" : badgeEmoji}
      </span>

      <div
        className={`relative flex size-20 items-center justify-center rounded-2xl p-1 transition-all ${
          isLayla
            ? active
              ? "bg-gradient-to-br from-cyan-400/35 via-indigo-500/40 to-violet-600/40 ring-2 ring-cyan-300 shadow-lg shadow-cyan-500/30"
              : "bg-slate-800/70 ring-1 ring-white/15"
            : active
              ? "bg-gradient-to-br from-emerald-400/35 via-teal-500/40 to-sky-600/40 ring-2 ring-emerald-300 shadow-lg shadow-emerald-500/30"
              : "bg-slate-800/70 ring-1 ring-white/15"
        }`}
      >
        <svg viewBox="0 0 64 64" className="size-18" aria-hidden="true">
          {isLayla ? (
            <>
              {/* Animated waving arm */}
              <g
                className={
                  active || celebrating ? "animate-[hand-wave_1.4s_ease-in-out_infinite]" : ""
                }
                style={{ transformOrigin: "50px 44px" }}
              >
                <path
                  d="M46 44 Q55 34 57 24"
                  stroke="#38bdf8"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="57" cy="22" r="4" fill="#fde68a" />
              </g>
              {/* Body & Scarf */}
              <path d="M14 58 C16 42, 48 42, 50 58 Z" fill="#38bdf8" />
              <path d="M16 32 C16 11, 48 11, 48 32 L45 48 L19 48 Z" fill="#6366f1" />
              {/* Face */}
              <circle cx="32" cy="27" r="11.5" fill="#fde68a" />
              <path
                d="M21 24 C23 16, 41 16, 43 24"
                fill="none"
                stroke="#4338ca"
                strokeWidth="2.8"
              />
              {/* Blinking Eyes */}
              <g
                className="animate-[eye-blink_4s_infinite]"
                style={{ transformOrigin: "32px 26px" }}
              >
                <circle cx="27.5" cy="26" r="1.8" fill="#0f172a" />
                <circle cx="36.5" cy="26" r="1.8" fill="#0f172a" />
              </g>
              {/* Eyebrows */}
              <path
                d={mood === "curious" ? "M24 22 Q27 19.5 30 21.5" : "M24 21.5 Q27 20 30 21.5"}
                stroke="#1e293b"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M34 21.5 Q37 20 40 21.5"
                stroke="#1e293b"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              {/* Rosy cheeks */}
              <circle cx="24" cy="29.5" r="2" fill="#fb7185" fillOpacity="0.4" />
              <circle cx="40" cy="29.5" r="2" fill="#fb7185" fillOpacity="0.4" />
              {/* Talking Mouth */}
              {speaking ? (
                <ellipse
                  cx="32"
                  cy="32"
                  rx="3.4"
                  ry="2.5"
                  fill="#be123c"
                  className="origin-center animate-[talk-mouth_0.34s_ease-in-out_infinite]"
                />
              ) : (
                <path
                  d="M27.5 31.5 Q32 35.5 36.5 31.5"
                  stroke="#0f172a"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                />
              )}
            </>
          ) : (
            <>
              {/* Animated pointing arm */}
              <g
                className={
                  active || celebrating ? "animate-[hand-wave_1.5s_ease-in-out_infinite]" : ""
                }
                style={{ transformOrigin: "14px 44px" }}
              >
                <path
                  d="M18 44 Q9 34 7 24"
                  stroke="#10b981"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="7" cy="22" r="4" fill="#fcd34d" />
              </g>
              {/* Body */}
              <path d="M14 58 C16 42, 48 42, 50 58 Z" fill="#10b981" />
              <path d="M27 44 L32 52 L37 44" fill="#fef3c7" />
              {/* Head */}
              <circle cx="32" cy="27" r="11.5" fill="#fcd34d" />
              <path
                d="M20.5 23 C20.5 12, 43.5 12, 43.5 23 C40 18, 24 18, 20.5 23 Z"
                fill="#0f172a"
              />
              {/* Glasses + Blinking Eyes */}
              <rect
                x="23"
                y="23"
                width="7.2"
                height="5.6"
                rx="1.8"
                fill="rgba(255,255,255,0.25)"
                stroke="#1e293b"
                strokeWidth="1.6"
              />
              <rect
                x="33.8"
                y="23"
                width="7.2"
                height="5.6"
                rx="1.8"
                fill="rgba(255,255,255,0.25)"
                stroke="#1e293b"
                strokeWidth="1.6"
              />
              <line x1="30.2" y1="25.8" x2="33.8" y2="25.8" stroke="#1e293b" strokeWidth="1.5" />
              <g
                className="animate-[eye-blink_4.4s_infinite]"
                style={{ transformOrigin: "32px 26px" }}
              >
                <circle cx="26.6" cy="25.8" r="1.5" fill="#0f172a" />
                <circle cx="37.4" cy="25.8" r="1.5" fill="#0f172a" />
              </g>
              {/* Talking Mouth */}
              {speaking ? (
                <ellipse
                  cx="32"
                  cy="32.5"
                  rx="3.4"
                  ry="2.4"
                  fill="#9f1239"
                  className="origin-center animate-[talk-mouth_0.38s_ease-in-out_infinite]"
                />
              ) : (
                <path
                  d="M27.5 32 Q32 36 36.5 32"
                  stroke="#0f172a"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                />
              )}
            </>
          )}
        </svg>
        {speaking && (
          <span className="pointer-events-none absolute -inset-1 animate-[focus-ring_1.1s_ease-in-out_infinite] rounded-2xl border-2 border-amber-300/80" />
        )}
      </div>
    </div>
  );
}

/** Expressive animated Learner character (Student Sara or Student Tariq) reacting, raising hand, and cheering! */
function AnimatedLearnerFigure({
  student,
  celebrating,
  emoji,
  name,
}: {
  student: LearnerCharacter;
  celebrating: boolean;
  emoji: string;
  name: string;
}) {
  const isSara = student === "sara";
  return (
    <div
      className={`flex shrink-0 flex-col items-center ${
        celebrating
          ? "animate-[celebrate-hop_0.7s_ease-in-out_infinite]"
          : "animate-[character-bob_2.8s_ease-in-out_infinite]"
      }`}
    >
      <div className="relative flex size-14 items-center justify-center rounded-full border-2 border-amber-300/75 bg-gradient-to-br from-amber-400/25 via-pink-500/25 to-violet-500/30 shadow-md">
        <svg viewBox="0 0 48 48" className="size-12" aria-hidden="true">
          {isSara ? (
            <>
              <path d="M10 44 C12 33, 36 33, 38 44 Z" fill="#ec4899" />
              <circle cx="24" cy="21" r="9" fill="#fde68a" />
              <path d="M14 21 C14 10, 34 10, 34 21 C31 15, 17 15, 14 21 Z" fill="#7c2d12" />
              {/* Raised hand animation */}
              <g
                className="animate-[hand-wave_1.6s_ease-in-out_infinite]"
                style={{ transformOrigin: "37px 34px" }}
              >
                <line
                  x1="36"
                  y1="34"
                  x2="42"
                  y2="20"
                  stroke="#fde68a"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </g>
              <g
                className="animate-[eye-blink_3.8s_infinite]"
                style={{ transformOrigin: "24px 20px" }}
              >
                <circle cx="20.5" cy="20.5" r="1.4" fill="#0f172a" />
                <circle cx="27.5" cy="20.5" r="1.4" fill="#0f172a" />
              </g>
              <path
                d="M20.5 25 Q24 28 27.5 25"
                stroke="#0f172a"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
              />
            </>
          ) : (
            <>
              <path d="M10 44 C12 33, 36 33, 38 44 Z" fill="#f59e0b" />
              <circle cx="24" cy="21" r="9" fill="#fcd34d" />
              <path d="M15 19 C15 11, 33 11, 33 19 C30 15, 18 15, 15 19 Z" fill="#1e293b" />
              <g
                className="animate-[eye-blink_4.2s_infinite]"
                style={{ transformOrigin: "24px 20px" }}
              >
                <circle cx="20.5" cy="20.5" r="1.4" fill="#0f172a" />
                <circle cx="27.5" cy="20.5" r="1.4" fill="#0f172a" />
              </g>
              <path
                d="M20.5 25.2 Q24 28.4 27.5 25.2"
                stroke="#0f172a"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
              />
            </>
          )}
        </svg>
        <span
          aria-hidden="true"
          className="absolute -bottom-1 -end-1 flex size-6 items-center justify-center rounded-full bg-slate-900 text-sm ring-1 ring-amber-300"
        >
          {celebrating ? "🥳" : emoji}
        </span>
      </div>
      <span className="mt-1 text-[10px] font-extrabold text-amber-200">{name}</span>
    </div>
  );
}

/** Full animated classroom strip featuring BOTH expressive animated Teachers AND animated Learners interacting live! */
export function AnimatedClassroomCast({
  dialogue,
  learnerReaction,
  activeLineIndex,
  playing,
  muted,
  celebrating,
  laylaName,
  omarName,
  saraName,
  tariqName,
  speakingLabel,
  visualCueLabel,
  focusKeywords = [],
  onSelectLine,
}: {
  dialogue: TeacherLine[];
  learnerReaction: LearnerReaction;
  activeLineIndex: number;
  playing: boolean;
  muted: boolean;
  celebrating: boolean;
  laylaName: string;
  omarName: string;
  saraName: string;
  tariqName: string;
  speakingLabel: string;
  visualCueLabel: string;
  focusKeywords?: string[];
  onSelectLine: (idx: number) => void;
}) {
  const currentLine = dialogue[activeLineIndex] ?? dialogue[0];
  if (!currentLine) return null;

  const isLaylaSpeaking = currentLine.speaker === "layla";
  const laylaLine = dialogue.find((d) => d.speaker === "layla");
  const omarLine = dialogue.find((d) => d.speaker === "omar");
  const laylaIdx = dialogue.findIndex((d) => d.speaker === "layla");
  const omarIdx = dialogue.findIndex((d) => d.speaker === "omar");
  const learnerName = learnerReaction.student === "sara" ? saraName : tariqName;
  const isAudioActive = playing && !muted;

  return (
    <div className="relative z-10 mt-3 space-y-2.5">
      {/* Visual-First Audio Studio: Animated Teachers + Live Soundwave + Concept Keyword Cues (zero spoken transcript) */}
      <div className="rounded-2xl border border-white/20 bg-black/50 p-3 backdrop-blur-md">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => onSelectLine(laylaIdx >= 0 ? laylaIdx : 0)}
            className="flex shrink-0 flex-col items-center rounded-xl p-1 transition hover:bg-white/10"
          >
            <AnimatedTeacherFigure
              speaker="layla"
              active={isLaylaSpeaking}
              speaking={isLaylaSpeaking && isAudioActive}
              celebrating={celebrating}
              mood={laylaLine?.mood ?? "excited"}
              badgeEmoji={laylaLine?.emoji ?? "💡"}
            />
            <span className="mt-1 text-[11px] font-extrabold text-cyan-200">{laylaName}</span>
          </button>

          {/* Visual Listening & Concept Focus Panel (no verbatim narration transcript) */}
          <div className="relative flex-1 rounded-2xl border border-cyan-400/35 bg-slate-900/85 px-4 py-3 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-extrabold ${
                  isLaylaSpeaking ? "text-cyan-300" : "text-emerald-300"
                }`}
              >
                <span aria-hidden="true">{currentLine.emoji}</span>
                {isLaylaSpeaking ? laylaName : omarName}
                {playing && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] text-amber-200">
                    <span className="size-1.5 animate-ping rounded-full bg-amber-300" />
                    {speakingLabel}
                  </span>
                )}
              </span>

              {/* Audio Segment Selector Dots */}
              <div className="flex items-center gap-1.5" dir="ltr">
                {dialogue.map((line, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectLine(idx)}
                    aria-label={`${line.speaker === "layla" ? laylaName : omarName} #${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      idx === activeLineIndex
                        ? "w-6 bg-amber-300"
                        : "w-2.5 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Live Equalizer Waveform + Visual Keyword Highlights */}
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-end gap-1" aria-hidden="true">
                {[12, 22, 16, 26, 18, 24, 14, 20].map((barH, idx) => (
                  <span
                    key={idx}
                    style={{
                      height: isAudioActive ? `${barH}px` : "6px",
                      animationDelay: `${idx * 90}ms`,
                    }}
                    className={`w-1.5 rounded-full transition-all duration-300 ${
                      isAudioActive
                        ? isLaylaSpeaking
                          ? "animate-pulse bg-cyan-400"
                          : "animate-pulse bg-emerald-400"
                        : "bg-slate-600"
                    }`}
                  />
                ))}
              </div>

              {focusKeywords.length > 0 ? (
                <div className="flex flex-1 flex-wrap items-center gap-1.5" lang="en" dir="ltr">
                  {focusKeywords.slice(0, 5).map((kw) => (
                    <span
                      key={kw}
                      className="inline-flex items-center gap-1 rounded-full border border-cyan-300/40 bg-cyan-400/15 px-2.5 py-0.5 text-xs font-extrabold text-cyan-100"
                    >
                      <Sparkles className="size-3 text-amber-300" aria-hidden="true" />
                      {kw}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="flex-1 text-xs font-semibold text-slate-300">{visualCueLabel}</p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectLine(omarIdx >= 0 ? omarIdx : dialogue.length - 1)}
            className="flex shrink-0 flex-col items-center rounded-xl p-1 transition hover:bg-white/10"
          >
            <AnimatedTeacherFigure
              speaker="omar"
              active={!isLaylaSpeaking}
              speaking={!isLaylaSpeaking && isAudioActive}
              celebrating={celebrating}
              mood={omarLine?.mood ?? "encouraging"}
              badgeEmoji={omarLine?.emoji ?? "🚀"}
            />
            <span className="mt-1 text-[11px] font-extrabold text-emerald-200">{omarName}</span>
          </button>
        </div>
      </div>

      {/* Compact Visual Learner Companion Cue (expressive avatar & emoji cue — no text clutter) */}
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-amber-400/30 bg-gradient-to-r from-amber-500/15 via-pink-500/10 to-violet-500/15 px-3.5 py-2 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <AnimatedLearnerFigure
            student={learnerReaction.student}
            celebrating={celebrating}
            emoji={learnerReaction.emoji}
            name={learnerName}
          />
          <span className="text-xs font-extrabold text-amber-200">{learnerName}</span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-bold text-cyan-100">
          <span aria-hidden="true">{learnerReaction.emoji}</span>
          <span>{visualCueLabel}</span>
        </span>
      </div>
    </div>
  );
}

/** Animated chronological or sequential visual timeline with expressive emojis explaining progression. */
export function AnimatedChronologicalTimeline({
  nodes,
  title,
}: {
  nodes: TimelineNode[];
  title: string;
}) {
  return (
    <div
      className="mt-3 rounded-xl border border-cyan-400/40 bg-slate-900/85 px-4 py-3"
      aria-label={title}
    >
      <p className="mb-2.5 text-[11px] font-extrabold uppercase tracking-wider text-cyan-300">
        ⏱️ {title}
      </p>
      <div className="flex flex-wrap items-center gap-2" dir="ltr">
        {nodes.map((node, idx) => (
          <div key={`${node.marker}-${idx}`} className="flex items-center gap-2">
            <div
              className={`relative flex items-center gap-2 rounded-xl border px-3 py-1.5 transition ${
                node.active
                  ? "border-amber-300 bg-amber-400/20 text-amber-100 shadow-md shadow-amber-500/20"
                  : "border-white/20 bg-white/10 text-slate-100"
              }`}
            >
              {node.active && (
                <span className="pointer-events-none absolute -end-1 -top-1 size-2.5 animate-ping rounded-full bg-amber-300" />
              )}
              <span className="text-base" aria-hidden="true">
                {node.emoji}
              </span>
              <div>
                <span className="block font-mono text-[10px] font-extrabold uppercase tracking-wide text-cyan-200">
                  {node.marker}
                </span>
                <span className="text-xs font-bold">{node.label}</span>
              </div>
            </div>
            {idx < nodes.length - 1 && (
              <ArrowRight
                className="size-4 shrink-0 animate-[arrow-nudge_1.4s_ease-in-out_infinite] text-cyan-300"
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const TOOL_LABELS: Record<MotionFocusTool, { label: string; Icon: typeof ArrowRight }> = {
  arrow: { label: "Arrows", Icon: ArrowRight },
  circle: { label: "Focus Circles", Icon: CircleDot },
  box: { label: "Callout Boxes", Icon: SquareDashed },
  highlight: { label: "Highlights", Icon: Highlighter },
  pointer: { label: "Pointers", Icon: MousePointerClick },
};

export function MotionFocusBadges({
  tools,
  ariaLabel,
}: {
  tools: MotionFocusTool[];
  ariaLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5" aria-label={ariaLabel} dir="ltr">
      {tools.map((tool) => {
        const { label, Icon } = TOOL_LABELS[tool];
        return (
          <span
            key={tool}
            className="inline-flex items-center gap-1 rounded-full border border-fuchsia-400/35 bg-fuchsia-500/15 px-2.5 py-0.5 text-[11px] font-bold text-fuchsia-200"
          >
            <Icon className="size-3" aria-hidden="true" />
            {label}
          </span>
        );
      })}
    </div>
  );
}

/** Floating animated emoji celebration burst triggered when learners react or solve live video quizzes! */
export function FloatingEmojiBurst({
  emojis,
}: {
  emojis: { id: number; symbol: string; left: number }[];
}) {
  if (emojis.length === 0) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-hidden="true">
      {emojis.map((item) => (
        <span
          key={item.id}
          style={{ left: `${item.left}%` }}
          className="absolute bottom-14 animate-[emoji-float-up_1.5s_ease-out_forwards] text-3xl drop-shadow-lg"
        >
          {item.symbol}
        </span>
      ))}
    </div>
  );
}
