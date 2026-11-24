import { useState } from "react";
import { CheckCircle2, Mic, MicOff, Sparkles, Star, Volume2 } from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ENCOURAGING_RETRY, POSITIVE_PRAISE } from "@/content/kids/alphabet-phonics-data";
import {
  ARTICULATION_GROUPS,
  ARTICULATION_SOUNDS,
  MINIMAL_PAIRS,
  SPEECH_ORGANS,
  VIBRATION_PAIRS,
  type ArticulationGroupId,
  type SpeechOrganId,
} from "@/content/kids/articulation-reading-data";
import { playSpeech, useSpeech } from "@/hooks/use-speech";
import { playPhonemeSound } from "@/lib/kids-phonics-audio";
import type { KidsProgressState } from "@/lib/kids-storage";

export interface ArticulationStudioProps {
  progress: KidsProgressState;
  onPracticeSound: (soundId: string) => void;
  onGameWin: (gameId: string) => void;
}

export function ArticulationStudio({
  progress,
  onPracticeSound,
  onGameWin,
}: ArticulationStudioProps) {
  const { locale } = useI18n();
  const isAr = locale === "ar";

  const [groupId, setGroupId] = useState<ArticulationGroupId>("bilabial");
  const [selectedSoundId, setSelectedSoundId] = useState<string>("p");
  const [selectedOrgan, setSelectedOrgan] = useState<SpeechOrganId>("lips");
  const [spokenHeard, setSpokenHeard] = useState<string>("");

  // Minimal pairs quiz state
  const [pairIdx, setPairIdx] = useState(0);
  const [targetSide, setTargetSide] = useState<"A" | "B">("A");
  const [pairFeedback, setPairFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  const groupSounds = ARTICULATION_SOUNDS.filter((s) => s.groupId === groupId);
  const sound =
    ARTICULATION_SOUNDS.find((s) => s.id === selectedSoundId) ??
    groupSounds[0] ??
    ARTICULATION_SOUNDS[0]!;

  const organMeta = SPEECH_ORGANS.find((o) => o.id === selectedOrgan) ?? SPEECH_ORGANS[0]!;

  const isOrganActive = (id: SpeechOrganId) => sound.activeOrgans.includes(id);

  const speech = useSpeech((transcript) => {
    setSpokenHeard(transcript);
    onPracticeSound(sound.id);
  });

  const currentPair = MINIMAL_PAIRS[pairIdx % MINIMAL_PAIRS.length]!;
  const expectedWord = targetSide === "A" ? currentPair.wordA : currentPair.wordB;

  const handleSelectGroup = (gid: ArticulationGroupId) => {
    setGroupId(gid);
    const first = ARTICULATION_SOUNDS.find((s) => s.groupId === gid);
    if (first) {
      setSelectedSoundId(first.id);
      setSelectedOrgan(first.activeOrgans[0] ?? "lips");
    }
  };

  const handlePairChoice = (picked: "A" | "B") => {
    if (picked === targetSide) {
      setPairFeedback({
        ok: true,
        text: POSITIVE_PRAISE[pairIdx % POSITIVE_PRAISE.length]![locale],
      });
      onGameWin("kids-minimal-pairs");
    } else {
      setPairFeedback({ ok: false, text: ENCOURAGING_RETRY[locale] });
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="display-heading text-2xl font-extrabold text-foreground md:text-3xl">
          {isAr
            ? "هيّا نصنع الأصوات! — مخارج الحروف والنطق"
            : "Let's Make Sounds! — Articulation & Pronunciation"}
        </h2>
        <p className="text-sm text-muted-foreground md:text-base">
          {isAr
            ? "تعرّف على أعضاء النطق في الفم، واستكشف المجموعات الصوتية السبع، واشعر باهتزاز الحلق!"
            : "Discover how your lips, teeth, tongue, and voice work together to make clear English sounds!"}
        </p>
      </div>

      {/* Interactive SVG Side-View Mouth & Speech Organs Diagram + Active Sound Controls */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: Interactive Side-View Mouth SVG + 8 Organ Pills */}
        <section className="space-y-4 rounded-3xl border-2 border-primary/30 bg-card p-5 shadow-sm lg:col-span-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-extrabold text-foreground">
              {isAr ? "خريطة أعضاء النطق التفاعلية" : "Interactive Mouth & Speech Organs"}
            </h3>
            <Badge
              variant={sound.voiced ? "default" : "secondary"}
              className={sound.voiced ? "bg-amber-500 text-foreground" : ""}
            >
              {sound.voiced
                ? isAr
                  ? "مجهور (اهتزاز الحلق)"
                  : "Voiced (Throat Buzz)"
                : isAr
                  ? "مهموس (هواء لطيف)"
                  : "Voiceless (Soft Air)"}
            </Badge>
          </div>

          {/* Animated Side-View Mouth SVG */}
          <div className="flex items-center justify-center rounded-2xl bg-sky-500/10 p-4">
            <svg
              viewBox="0 0 280 200"
              className="h-44 w-full max-w-[280px]"
              role="img"
              aria-label="Side view of mouth showing speech organs"
            >
              {/* Head silhouette */}
              <path
                d="M70,25 C140,15 225,45 235,115 C240,155 220,185 180,192 L95,192 L95,158 C68,158 55,142 58,125 L48,112 L62,102 C56,88 55,70 70,58 Z"
                fill="currentColor"
                className="text-amber-100 dark:text-amber-950/60"
                stroke="#0284c7"
                strokeWidth="2.5"
              />
              {/* Hard Palate */}
              <path
                d="M84,78 Q128,55 162,74"
                fill="none"
                stroke={isOrganActive("hard-palate") ? "#e11d48" : "#94a3b8"}
                strokeWidth={isOrganActive("hard-palate") ? "7" : "4"}
                strokeLinecap="round"
              />
              {/* Soft Palate */}
              <path
                d="M162,74 Q188,82 194,104"
                fill="none"
                stroke={isOrganActive("soft-palate") ? "#e11d48" : "#94a3b8"}
                strokeWidth={isOrganActive("soft-palate") ? "7" : "4"}
                strokeLinecap="round"
              />
              {/* Alveolar Ridge */}
              <circle
                cx="82"
                cy="84"
                r={isOrganActive("alveolar-ridge") ? 9 : 6}
                fill={isOrganActive("alveolar-ridge") ? "#e11d48" : "#cbd5e1"}
              />
              {/* Upper & Lower Teeth */}
              <rect
                x="68"
                y="84"
                width="9"
                height="13"
                rx="2"
                fill={isOrganActive("teeth") ? "#f59e0b" : "#ffffff"}
                stroke="#64748b"
                strokeWidth="1.5"
              />
              <rect
                x="70"
                y="112"
                width="9"
                height="11"
                rx="2"
                fill={isOrganActive("teeth") ? "#f59e0b" : "#ffffff"}
                stroke="#64748b"
                strokeWidth="1.5"
              />
              {/* Lips */}
              <ellipse
                cx="59"
                cy="95"
                rx="8"
                ry="5"
                fill={isOrganActive("lips") ? "#e11d48" : "#fb7185"}
              />
              <ellipse
                cx="60"
                cy="115"
                rx="8"
                ry="5"
                fill={isOrganActive("lips") ? "#e11d48" : "#fb7185"}
              />
              {/* Tongue */}
              <path
                d="M85,124 Q130,96 176,120 Q168,142 120,142 Q90,140 85,124 Z"
                fill={isOrganActive("tongue") ? "#ec4899" : "#f9a8d4"}
                stroke="#be185d"
                strokeWidth="2"
              />
              {/* Vocal Cords (pulses brightly when voiced) */}
              <g>
                <ellipse
                  cx="176"
                  cy="168"
                  rx="18"
                  ry="8"
                  fill={sound.voiced ? "#f59e0b" : "#cbd5e1"}
                  opacity={sound.voiced ? "0.95" : "0.5"}
                />
                <text
                  x="176"
                  y="171"
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="bold"
                  fill="#1e293b"
                >
                  {sound.voiced ? "BUZZ!" : "quiet"}
                </text>
              </g>
              {/* Airflow Arrow */}
              {isOrganActive("airflow") && (
                <path
                  d="M52,104 L16,104 M24,98 L16,104 L24,110"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </div>

          {/* 8 Clickable Speech Organ Badges */}
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Speech organs">
            {SPEECH_ORGANS.map((organ) => {
              const active = isOrganActive(organ.id);
              const selected = selectedOrgan === organ.id;
              return (
                <button
                  key={organ.id}
                  type="button"
                  onClick={() => setSelectedOrgan(organ.id)}
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-bold transition-colors ${
                    active
                      ? "border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300"
                      : selected
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border bg-muted/40 text-muted-foreground"
                  }`}
                >
                  {organ.label[locale]}
                </button>
              );
            })}
          </div>
          <p className="rounded-xl bg-muted/50 p-3 text-xs text-foreground">
            <strong>{organMeta.label[locale]}:</strong> {organMeta.kidNote[locale]}
          </p>
        </section>

        {/* Right: 7 Articulation Sound Groups + Sound Card + Accent-Friendly Repeat */}
        <section className="space-y-4 rounded-3xl border-2 border-foreground/85 bg-card p-6 shadow-ink lg:col-span-7">
          {/* 7 Sound Group Tabs */}
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Articulation groups">
            {ARTICULATION_GROUPS.map((g) => (
              <Button
                key={g.id}
                type="button"
                size="sm"
                variant={groupId === g.id ? "default" : "outline"}
                className="rounded-full text-xs"
                onClick={() => handleSelectGroup(g.id)}
              >
                {g.title[locale]}
              </Button>
            ))}
          </div>

          {/* Sounds in Selected Group */}
          <div className="flex flex-wrap gap-2" dir="ltr">
            {groupSounds.map((s) => {
              const active = s.id === sound.id;
              const practiced = progress.articulationPracticed.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSelectedSoundId(s.id);
                    setSelectedOrgan(s.activeOrgans[0] ?? "lips");
                    setSpokenHeard("");
                    playPhonemeSound(s.ipa, s.examples[0]?.word);
                  }}
                  className={`flex items-center gap-1.5 rounded-2xl border-2 px-4 py-2 font-mono text-lg font-black transition-all ${
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-muted/40 text-foreground hover:border-primary/50"
                  }`}
                >
                  <span>{s.ipa}</span>
                  {practiced && <span aria-label="Practised">⭐</span>}
                </button>
              );
            })}
          </div>

          {/* Selected Sound Instructional Stage */}
          <div className="space-y-4 rounded-2xl bg-muted/35 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-4xl font-black text-primary" dir="ltr">
                  {sound.ipa}
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="default"
                  className="rounded-full"
                  onClick={() => playPhonemeSound(sound.ipa, sound.examples[0]?.word)}
                >
                  <Volume2 className="me-1.5 size-4" aria-hidden />
                  {isAr ? "استمع للصوت" : "Hear Sound"}
                </Button>
              </div>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="rounded-full font-bold"
                onClick={() => onPracticeSound(sound.id)}
              >
                <Star className="me-1 size-3.5" aria-hidden />
                {isAr ? "تدرّبت على هذا الصوت ⭐" : "I Practised This Sound! ⭐"}
              </Button>
            </div>

            <p className="text-sm leading-relaxed text-foreground">{sound.mouthGuide[locale]}</p>

            {/* Example Words + Sentences */}
            <div className="grid gap-3 sm:grid-cols-2">
              {sound.examples.map((ex) => (
                <button
                  key={ex.word}
                  type="button"
                  onClick={() => playSpeech(`${ex.word}. ${ex.sentence}`, 0.84, "female")}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 text-start transition-colors hover:border-primary"
                >
                  <span className="text-3xl" aria-hidden>
                    {ex.emoji}
                  </span>
                  <div className="min-w-0" dir="ltr">
                    <div className="text-base font-extrabold text-foreground">{ex.word}</div>
                    <div className="text-xs text-muted-foreground">“{ex.sentence}”</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Accent-Friendly Listen & Repeat Mic */}
            {speech.supported && (
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-primary/25 bg-card p-3 text-xs">
                <div>
                  <div className="font-bold text-foreground">
                    {isAr
                      ? "جرّب النطق بصوتك! (نُشجّع الوضوح والثقة)"
                      : "Say it out loud! (We cheer for clear effort — any accent is welcome!)"}
                  </div>
                  {spokenHeard && (
                    <p
                      className="mt-1 font-semibold text-emerald-700 dark:text-emerald-300"
                      dir="ltr"
                    >
                      🌟 {isAr ? "سمعنا:" : "We heard:"} “{spokenHeard}” — Wonderful pronunciation!
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant={speech.listening ? "destructive" : "outline"}
                  onClick={() => (speech.listening ? speech.stop() : speech.start())}
                >
                  {speech.listening ? (
                    <MicOff className="me-1 size-4" aria-hidden />
                  ) : (
                    <Mic className="me-1 size-4" aria-hidden />
                  )}
                  {speech.listening ? (isAr ? "إيقاف" : "Stop") : isAr ? "تحدّث الآن" : "Speak Now"}
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* 3.4 Can You Feel the Vibration? (Voiced vs. Voiceless Lab) */}
      <section className="rounded-3xl border-2 border-amber-400/50 bg-amber-500/8 p-6 space-y-4">
        <div className="space-y-1">
          <h3 className="text-xl font-extrabold text-foreground">
            ✋{" "}
            {isAr
              ? "هل تشعر بالاهتزاز؟ (الأصوات المجهورة والمهموسة)"
              : "Can You Feel the Vibration?"}
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground">
            {isAr
              ? "ضع أصابعك بلطف على حلقك واضغط على كل زوج لتلاحظ الفرق بين الهواء الهادئ والاهتزاز!"
              : "Place your fingers gently on your throat and tap each pair! Quiet air has NO buzz; voiced sounds BUZZ!"}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {VIBRATION_PAIRS.map((vp) => (
            <button
              key={vp.pairWords}
              type="button"
              onClick={() => playSpeech(vp.pairWords.replace("/", " ... "), 0.8, "female")}
              className="rounded-2xl border border-border bg-card p-4 text-center transition-all hover:-translate-y-0.5 hover:border-amber-500"
            >
              <div className="text-2xl" aria-hidden>
                {vp.emojis}
              </div>
              <div
                className="mt-1.5 flex items-center justify-center gap-2 font-mono text-base font-black"
                dir="ltr"
              >
                <span className="rounded-lg bg-sky-500/15 px-2 py-0.5 text-sky-700 dark:text-sky-300">
                  {vp.voiceless}
                </span>
                <span>vs</span>
                <span className="rounded-lg bg-amber-500/20 px-2 py-0.5 text-amber-800 dark:text-amber-200">
                  {vp.voiced}
                </span>
              </div>
              <div className="mt-1 text-xs font-bold text-muted-foreground" dir="ltr">
                {vp.pairWords}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3.5 Minimal Pairs Listening Game */}
      <section className="space-y-4 rounded-3xl border-2 border-primary/25 bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="flex items-center gap-2 text-xl font-extrabold text-foreground">
              <Sparkles className="size-5 text-primary" aria-hidden />
              {isAr
                ? "لعبة الأزواج الصوتية المتقاربة (Minimal Pairs)"
                : "Minimal Pairs Listening Game"}
            </h3>
            <p className="text-xs text-muted-foreground">{currentPair.tip[locale]}</p>
          </div>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => {
              setPairIdx((i) => i + 1);
              setTargetSide((s) => (s === "A" ? "B" : "A"));
              setPairFeedback(null);
            }}
          >
            {isAr ? "الزوج التالي ←" : "Next Pair →"}
          </Button>
        </div>

        <div className="space-y-4 rounded-2xl bg-muted/35 p-5 text-center">
          <Button
            type="button"
            size="lg"
            variant="accent"
            className="rounded-full font-bold"
            onClick={() => playSpeech(expectedWord, 0.8, "female")}
          >
            <Volume2 className="me-2 size-5" aria-hidden />
            {isAr
              ? `استمع واختر الكلمة الصحيحة (${expectedWord})`
              : `Listen & Pick the Word (${expectedWord})`}
          </Button>

          <div className="mx-auto grid max-w-md grid-cols-2 gap-4" dir="ltr">
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="flex h-24 flex-col gap-1 rounded-2xl text-xl font-black"
              onClick={() => handlePairChoice("A")}
            >
              <span className="text-3xl" aria-hidden>
                {currentPair.emojiA}
              </span>
              <span>{currentPair.wordA}</span>
              <span className="font-mono text-xs font-normal text-muted-foreground">
                {currentPair.ipaA}
              </span>
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="flex h-24 flex-col gap-1 rounded-2xl text-xl font-black"
              onClick={() => handlePairChoice("B")}
            >
              <span className="text-3xl" aria-hidden>
                {currentPair.emojiB}
              </span>
              <span>{currentPair.wordB}</span>
              <span className="font-mono text-xs font-normal text-muted-foreground">
                {currentPair.ipaB}
              </span>
            </Button>
          </div>

          {pairFeedback && (
            <div
              role="status"
              className={`mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
                pairFeedback.ok
                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                  : "bg-amber-500/15 text-amber-800 dark:text-amber-200"
              }`}
            >
              {pairFeedback.ok && <CheckCircle2 className="size-4" aria-hidden />}
              <span>{pairFeedback.text}</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
