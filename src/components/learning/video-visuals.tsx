import {
  ArrowRight,
  CircleDot,
  Highlighter,
  MousePointerClick,
  Sparkles,
  SquareDashed,
} from "lucide-react";
import type {
  LessonCourse,
  LessonSkill,
  MotionFocusTool,
  TeacherLine,
  TeacherMood,
  TeacherSpeaker,
  TimelineNode,
} from "@/content/lesson-types";
import type { Locale } from "@/lib/i18n/config";
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

/** Subtle high-resolution visual backdrop paired with vibrant modern gradients. */
export function CourseMediaBackdrop({ course }: { course: LessonCourse }) {
  return (
    <>
      <img
        src={courseArtwork(course)}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.09] mix-blend-luminosity"
      />
      {/* Vibrant ambient orbs + geometric grid lines */}
      <div
        className="pointer-events-none absolute -end-16 -top-16 size-72 rounded-full bg-cyan-400/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -start-16 size-80 rounded-full bg-fuchsia-500/20 blur-3xl"
        aria-hidden="true"
      />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
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

/** High-quality custom SVG educational visual aid tailored per skill. */
export function SkillVisualAid({ skill }: { skill: LessonSkill }) {
  return (
    <div
      className="hidden size-16 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 p-2 shadow-lg backdrop-blur-md sm:flex"
      aria-hidden="true"
    >
      {skill === "grammar" && (
        <svg viewBox="0 0 64 64" className="size-12">
          <rect x="6" y="10" width="22" height="18" rx="5" fill="#38bdf8" fillOpacity="0.9" />
          <rect x="36" y="10" width="22" height="18" rx="5" fill="#a78bfa" fillOpacity="0.9" />
          <path
            d="M28 19 H35 M32 15 L36 19 L32 23"
            stroke="#fde047"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <rect x="14" y="38" width="36" height="16" rx="6" fill="#34d399" fillOpacity="0.9" />
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
        <svg viewBox="0 0 64 64" className="size-12">
          <rect x="8" y="12" width="34" height="40" rx="5" fill="#e0f2fe" fillOpacity="0.92" />
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
        <svg viewBox="0 0 64 64" className="size-12">
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
        <svg viewBox="0 0 64 64" className="size-12">
          <rect x="10" y="10" width="32" height="44" rx="5" fill="#f8fafc" fillOpacity="0.92" />
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
        <svg viewBox="0 0 64 64" className="size-12">
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

function TeacherAvatarFigure({
  speaker,
  active,
  speaking,
  mood,
}: {
  speaker: TeacherSpeaker;
  active: boolean;
  speaking: boolean;
  mood: TeacherMood;
}) {
  const isLayla = speaker === "layla";
  const ringClass = isLayla
    ? active
      ? "ring-2 ring-cyan-300 bg-gradient-to-br from-cyan-400 via-indigo-500 to-violet-600 shadow-lg shadow-cyan-500/30"
      : "ring-1 ring-white/20 bg-slate-800/80 opacity-75"
    : active
      ? "ring-2 ring-emerald-300 bg-gradient-to-br from-emerald-400 via-teal-500 to-sky-600 shadow-lg shadow-emerald-500/30"
      : "ring-1 ring-white/20 bg-slate-800/80 opacity-75";

  return (
    <div
      className={`relative flex size-14 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${ringClass} ${
        active ? "scale-105" : "scale-95"
      }`}
    >
      <svg viewBox="0 0 48 48" className="size-12" aria-hidden="true">
        {isLayla ? (
          <>
            {/* Coach Layla: warm scarf wrap, expressive eyes & dynamic smile */}
            <path d="M10 26 C10 10, 38 10, 38 26 L36 39 L12 39 Z" fill="#6366f1" />
            <circle cx="24" cy="22" r="9.5" fill="#fde68a" />
            <path d="M15 20 C16 14, 32 14, 33 20" fill="none" stroke="#4338ca" strokeWidth="2.5" />
            {/* Expressive eyebrows */}
            <path
              d={mood === "curious" ? "M18 17.5 Q20 15.5 22 17" : "M18 17.5 Q20 16.5 22 17.5"}
              stroke="#1e293b"
              strokeWidth="1.3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={
                mood === "excited" || mood === "celebrating"
                  ? "M26 16.5 Q28 15.5 30 17"
                  : "M26 17.5 Q28 16.5 30 17.5"
              }
              stroke="#1e293b"
              strokeWidth="1.3"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="20.2" cy="21" r="1.4" fill="#0f172a" />
            <circle cx="27.8" cy="21" r="1.4" fill="#0f172a" />
            {speaking ? (
              <ellipse
                cx="24"
                cy="26"
                rx="2.8"
                ry="2.1"
                fill="#be123c"
                className="origin-center animate-[talk-mouth_0.36s_ease-in-out_infinite]"
              />
            ) : (
              <path
                d="M20.5 25.5 Q24 28.5 27.5 25.5"
                stroke="#0f172a"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
              />
            )}
            <path d="M11 43 C13 35, 35 35, 37 43" fill="#38bdf8" />
          </>
        ) : (
          <>
            {/* Coach Omar: modern educator with glasses, lively grin */}
            <circle cx="24" cy="22" r="9.5" fill="#fcd34d" />
            <path
              d="M14.5 19 C14.5 10.5, 33.5 10.5, 33.5 19 C31 15, 17 15, 14.5 19 Z"
              fill="#0f172a"
            />
            {/* Glasses */}
            <rect
              x="16.5"
              y="18.5"
              width="6"
              height="4.8"
              rx="1.6"
              fill="none"
              stroke="#1e293b"
              strokeWidth="1.4"
            />
            <rect
              x="25.5"
              y="18.5"
              width="6"
              height="4.8"
              rx="1.6"
              fill="none"
              stroke="#1e293b"
              strokeWidth="1.4"
            />
            <line x1="22.5" y1="20.8" x2="25.5" y2="20.8" stroke="#1e293b" strokeWidth="1.3" />
            <circle cx="19.5" cy="20.9" r="1.2" fill="#0f172a" />
            <circle cx="28.5" cy="20.9" r="1.2" fill="#0f172a" />
            {speaking ? (
              <ellipse
                cx="24"
                cy="26.5"
                rx="2.9"
                ry="2"
                fill="#9f1239"
                className="origin-center animate-[talk-mouth_0.4s_ease-in-out_infinite]"
              />
            ) : (
              <path
                d="M20 26 Q24 29 28 26"
                stroke="#0f172a"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
              />
            )}
            <path d="M11 43 C13 34.5, 35 34.5, 37 43" fill="#10b981" />
          </>
        )}
      </svg>
      {speaking && (
        <span className="pointer-events-none absolute -inset-1 animate-[focus-ring_1.2s_ease-in-out_infinite] rounded-full border-2 border-amber-300/75" />
      )}
      {active && (mood === "celebrating" || mood === "excited") && (
        <Sparkles
          className="pointer-events-none absolute -end-1 -top-1 size-4 text-amber-300"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/** Interactive animated teacher duo stage where Coach Layla & Coach Omar converse and address the learner. */
export function AnimatedTeacherDuo({
  dialogue,
  activeLineIndex,
  playing,
  muted,
  locale,
  laylaName,
  omarName,
  speakingLabel,
  onSelectLine,
}: {
  dialogue: TeacherLine[];
  activeLineIndex: number;
  playing: boolean;
  muted: boolean;
  locale: Locale;
  laylaName: string;
  omarName: string;
  speakingLabel: string;
  onSelectLine: (idx: number) => void;
}) {
  const currentLine = dialogue[activeLineIndex] ?? dialogue[0];
  if (!currentLine) return null;

  const isLaylaSpeaking = currentLine.speaker === "layla";
  const laylaIdx = dialogue.findIndex((d) => d.speaker === "layla");
  const omarIdx = dialogue.findIndex((d) => d.speaker === "omar");
  const laylaMood = dialogue.find((d) => d.speaker === "layla")?.mood ?? "excited";
  const omarMood = dialogue.find((d) => d.speaker === "omar")?.mood ?? "encouraging";

  return (
    <div className="relative z-10 mt-3 rounded-2xl border border-white/15 bg-black/45 p-3 backdrop-blur-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Coach Layla */}
        <button
          type="button"
          onClick={() => onSelectLine(laylaIdx >= 0 ? laylaIdx : 0)}
          className="flex shrink-0 items-center gap-2 rounded-xl px-2 py-1 text-start transition hover:bg-white/10"
        >
          <TeacherAvatarFigure
            speaker="layla"
            active={isLaylaSpeaking}
            speaking={isLaylaSpeaking && playing && !muted}
            mood={laylaMood}
          />
          <div className="sm:hidden md:block">
            <p className="text-xs font-extrabold text-cyan-200">{laylaName}</p>
            {isLaylaSpeaking && (
              <p className="text-[10px] font-semibold text-amber-300">{speakingLabel}</p>
            )}
          </div>
        </button>

        {/* Live Interactive Speech Callout Bubble */}
        <div className="relative flex-1 rounded-xl border border-cyan-400/35 bg-slate-900/85 px-4 py-2.5">
          <div className="flex items-center justify-between gap-2">
            <span
              className={`text-xs font-extrabold ${
                isLaylaSpeaking ? "text-cyan-300" : "text-emerald-300"
              }`}
            >
              {isLaylaSpeaking ? laylaName : omarName}
            </span>
            <div className="flex items-center gap-1" dir="ltr">
              {dialogue.map((line, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectLine(idx)}
                  aria-label={`${line.speaker === "layla" ? laylaName : omarName} #${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === activeLineIndex
                      ? "w-5 bg-amber-300"
                      : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-white md:text-sm" lang="en" dir="ltr">
            “{currentLine.textEn}”
          </p>
          {locale === "ar" && (
            <p className="mt-1 text-xs leading-relaxed text-sky-200" lang="ar" dir="rtl">
              «{currentLine.textAr}»
            </p>
          )}
        </div>

        {/* Coach Omar */}
        <button
          type="button"
          onClick={() => onSelectLine(omarIdx >= 0 ? omarIdx : dialogue.length - 1)}
          className="flex shrink-0 items-center gap-2 rounded-xl px-2 py-1 text-start transition hover:bg-white/10"
        >
          <div className="text-end sm:hidden md:block">
            <p className="text-xs font-extrabold text-emerald-200">{omarName}</p>
            {!isLaylaSpeaking && (
              <p className="text-[10px] font-semibold text-amber-300">{speakingLabel}</p>
            )}
          </div>
          <TeacherAvatarFigure
            speaker="omar"
            active={!isLaylaSpeaking}
            speaking={!isLaylaSpeaking && playing && !muted}
            mood={omarMood}
          />
        </button>
      </div>
    </div>
  );
}

/** Animated chronological or sequential visual timeline illustrating dates, eras, tenses, or step progression. */
export function AnimatedChronologicalTimeline({
  nodes,
  title,
}: {
  nodes: TimelineNode[];
  title: string;
}) {
  return (
    <div
      className="mt-3 rounded-xl border border-cyan-400/35 bg-slate-900/80 px-4 py-3"
      aria-label={title}
    >
      <p className="mb-2.5 text-[11px] font-extrabold uppercase tracking-wider text-cyan-300">
        {title}
      </p>
      <div className="flex flex-wrap items-center gap-2" dir="ltr">
        {nodes.map((node, idx) => (
          <div key={`${node.marker}-${idx}`} className="flex items-center gap-2">
            <div
              className={`relative rounded-xl border px-3 py-1.5 transition ${
                node.active
                  ? "border-amber-300 bg-amber-400/20 text-amber-100 shadow-md shadow-amber-500/20"
                  : "border-white/20 bg-white/10 text-slate-100"
              }`}
            >
              {node.active && (
                <span className="pointer-events-none absolute -end-1 -top-1 size-2.5 animate-ping rounded-full bg-amber-300" />
              )}
              <span className="block font-mono text-[10px] font-extrabold uppercase tracking-wide text-cyan-200">
                {node.marker}
              </span>
              <span className="text-xs font-bold">{node.label}</span>
            </div>
            {idx < nodes.length - 1 && (
              <ArrowRight
                className="size-4 shrink-0 animate-[arrow-nudge_1.5s_ease-in-out_infinite] text-cyan-300"
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

/** Visual motion-graphics indicator strip showing active arrows, circles, boxes, pointers, and highlights. */
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
