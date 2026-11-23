import { useEffect, useRef, useState } from "react";
import {
  BookOpenCheck,
  CheckCircle2,
  Globe2,
  Lightbulb,
  MessageSquare,
  Play,
  Square,
  Volume2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import type { DetailedRuleGuide, LessonSkill } from "@/content/lesson-types";
import {
  playDialogueSequence,
  playSpeech,
  speakAsRole,
  stopSpeech,
  type VoiceRole,
} from "@/hooks/use-speech";

export interface DetailedRuleGuideViewProps {
  guide: DetailedRuleGuide;
  skill: LessonSkill;
}

function getSectionTitleKey(skill: LessonSkill) {
  if (skill === "grammar") return "guideTitle" as const;
  if (skill === "reading") return "guideReadingTitle" as const;
  if (skill === "listening") return "guideListeningTitle" as const;
  if (skill === "writing") return "guideWritingTitle" as const;
  return "guideSpeakingTitle" as const;
}

export function DetailedRuleGuideView({ guide, skill }: DetailedRuleGuideViewProps) {
  const { locale, t } = useI18n();
  const sectionTitle = t.learning[getSectionTitleKey(skill)];
  const stopSeqRef = useRef<(() => void) | null>(null);
  const [playingDialogue, setPlayingDialogue] = useState(false);
  const [activeTurnIdx, setActiveTurnIdx] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      stopSeqRef.current?.();
      stopSpeech();
    };
  }, []);

  function stopConversation() {
    stopSeqRef.current?.();
    stopSeqRef.current = null;
    setPlayingDialogue(false);
    setActiveTurnIdx(null);
  }

  function toggleFullConversation() {
    if (playingDialogue) {
      stopConversation();
      return;
    }
    const turns = guide.miniDialogue;
    if (!turns || turns.length === 0) return;

    setPlayingDialogue(true);
    stopSeqRef.current = playDialogueSequence(
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
        rate: 0.94,
        onTurnStart: (idx) => setActiveTurnIdx(idx),
        onComplete: () => {
          setPlayingDialogue(false);
          setActiveTurnIdx(null);
          stopSeqRef.current = null;
        },
      },
    );
  }

  return (
    <section className="border-t border-border py-8">
      <div className="flex items-center gap-2.5">
        <BookOpenCheck className="size-6 text-primary" aria-hidden />
        <h2 className="text-2xl font-bold">{sectionTitle}</h2>
      </div>

      {/* Summary Overview */}
      <div className="mt-4 rounded-2xl border border-primary/20 bg-secondary/40 p-5">
        <p className="text-base font-medium leading-relaxed text-foreground">
          {guide.summary[locale]}
        </p>
      </div>

      {/* Crystal-Clear Rule Breakdown Cards (e.g., I → am, He / She / It → is, You / We / They → are) */}
      {guide.ruleBreakdown && guide.ruleBreakdown.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold text-foreground">{t.learning.guideRuleBreakdown}</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {guide.ruleBreakdown.map((card, idx) => (
              <button
                key={`${card.group}-${idx}`}
                type="button"
                onClick={() =>
                  playSpeech(
                    `${card.group} ${card.takes}. ${card.example}`,
                    0.9,
                    idx % 2 === 0 ? "female" : "male",
                  )
                }
                className="group flex flex-col items-start rounded-2xl border border-border bg-card p-4 text-start shadow-xs transition hover:border-primary/60 hover:shadow-md"
              >
                <div className="flex w-full items-center justify-between gap-2" dir="ltr">
                  <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-extrabold text-primary">
                    {card.group}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground group-hover:text-primary">
                    <Volume2 className="size-3.5" aria-hidden />
                    {t.learning.tapCardToHear}
                  </span>
                </div>
                <p className="mt-2.5 text-base font-extrabold text-foreground" lang="en" dir="ltr">
                  ➜ {card.takes}
                </p>
                <p
                  className="mt-1.5 text-sm font-medium leading-relaxed text-foreground"
                  lang="en"
                  dir="ltr"
                >
                  “{card.example}”
                </p>
                <p className="mt-1 text-xs text-muted-foreground" lang="ar" dir="rtl">
                  {card.arabic}
                </p>
                {card.note && (
                  <p className="mt-2 rounded-lg bg-muted/60 px-2.5 py-1.5 text-xs leading-relaxed text-muted-foreground">
                    💡 {card.note[locale]}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mother-Tongue Bridge: Arabic vs. English */}
      {guide.l1Bridge && (
        <div className="mt-6 rounded-2xl border border-primary/25 bg-card p-5 shadow-xs">
          <div className="flex items-center gap-2">
            <Globe2 className="size-5 text-primary" aria-hidden />
            <h3 className="text-lg font-bold text-foreground">{t.learning.guideL1BridgeTitle}</h3>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3.5">
              <p className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">
                {t.learning.guideArabicHabit}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                {guide.l1Bridge.arabicHabit[locale]}
              </p>
            </div>
            <div className="rounded-xl border border-success/30 bg-success/5 p-3.5">
              <p className="text-xs font-bold uppercase tracking-wide text-success">
                {t.learning.guideEnglishRule}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                {guide.l1Bridge.englishRule[locale]}
              </p>
            </div>
          </div>
          <p className="mt-3 rounded-xl bg-secondary/60 px-4 py-2.5 text-sm font-semibold text-foreground">
            <span className="text-primary">{t.learning.guideKeyDifference} </span>
            {guide.l1Bridge.keyDifference[locale]}
          </p>
        </div>
      )}

      {/* When & How to Use */}
      <div className="mt-6 rounded-xl border border-border bg-card p-5">
        <h3 className="text-lg font-bold text-primary">{t.learning.guideWhenToUse}</h3>
        <ol className="mt-3 space-y-3">
          {guide.whenToUse.map((item, idx) => (
            <li
              key={`${item.en}-${idx}`}
              className="flex items-start gap-3 text-sm leading-relaxed"
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {idx + 1}
              </span>
              <span>{item[locale]}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Structure & Formula Table */}
      <div className="mt-6">
        <h3 className="text-lg font-bold">{t.learning.guideFormulas}</h3>
        <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/60 text-start">
              <tr>
                <th className="px-4 py-3 text-start font-bold">{t.learning.guideFormLabel}</th>
                <th className="px-4 py-3 text-start font-bold">{t.learning.guidePattern}</th>
                <th className="px-4 py-3 text-start font-bold">{t.learning.guideExample}</th>
                <th className="px-4 py-3 text-start font-bold">{t.learning.guideArabic}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {guide.formulas.map((row, idx) => (
                <tr key={`${row.label.en}-${row.pattern}-${idx}`}>
                  <td className="px-4 py-3 font-bold text-foreground">{row.label[locale]}</td>
                  <td className="px-4 py-3" lang="en" dir="ltr">
                    <code className="rounded-md bg-secondary px-2 py-1 font-mono text-xs font-semibold text-secondary-foreground">
                      {row.pattern}
                    </code>
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground" lang="en" dir="ltr">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          playSpeech(row.example, 0.9, idx % 2 === 0 ? "female" : "male")
                        }
                        className="rounded-md p-1 text-primary hover:bg-muted"
                        aria-label={`${t.learning.listen}: ${row.example}`}
                      >
                        <Volume2 className="size-4" aria-hidden />
                      </button>
                      <span>{row.example}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground" lang="ar" dir="rtl">
                    {row.arabic}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-Life Male & Female Conversation */}
      {guide.miniDialogue && guide.miniDialogue.length > 0 && (
        <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
              <MessageSquare className="size-5 text-primary" aria-hidden />
              {t.learning.guideDialogueTitle}
            </h3>
            <Button
              type="button"
              size="sm"
              variant={playingDialogue ? "secondary" : "default"}
              onClick={toggleFullConversation}
            >
              {playingDialogue ? (
                <>
                  <Square className="size-3.5 fill-current" aria-hidden />
                  {t.learning.stopConversation}
                </>
              ) : (
                <>
                  <Play className="size-3.5 fill-current" aria-hidden />
                  {t.learning.playConversation}
                </>
              )}
            </Button>
          </div>
          <div className="mt-4 space-y-2.5">
            {guide.miniDialogue.map((turn, idx) => {
              const isFemale = turn.gender === "female";
              const isSpeaking = activeTurnIdx === idx;
              return (
                <div
                  key={`${turn.speaker}-${idx}`}
                  className={`flex items-start justify-between gap-3 rounded-xl border p-3.5 transition ${
                    isSpeaking
                      ? "border-primary bg-primary/10 ring-1 ring-primary/40"
                      : "border-border bg-background"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          isFemale ? "bg-primary/10 text-primary" : "bg-success/15 text-success"
                        }`}
                      >
                        {isFemale ? "👩" : "👨"} {turn.speaker}
                      </span>
                      <span className="text-[11px] font-medium text-muted-foreground">
                        {isFemale ? t.learning.femaleVoiceBadge : t.learning.maleVoiceBadge}
                      </span>
                    </div>
                    <p
                      className="mt-1.5 text-sm font-semibold leading-relaxed text-foreground"
                      lang="en"
                      dir="ltr"
                    >
                      {turn.textEn}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground" lang="ar" dir="rtl">
                      {turn.textAr}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      stopConversation();
                      speakAsRole(
                        turn.textEn,
                        isFemale
                          ? turn.role === "teacher"
                            ? "female-teacher"
                            : "female-student"
                          : turn.role === "teacher"
                            ? "male-teacher"
                            : "male-student",
                        { rate: 0.92 },
                      );
                    }}
                    className="shrink-0 rounded-lg border border-border bg-card p-2 text-primary hover:bg-muted"
                    aria-label={`${t.learning.listen}: ${turn.speaker}`}
                  >
                    <Volume2 className="size-4" aria-hidden />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Common Mistakes to Avoid */}
      <div className="mt-6">
        <h3 className="text-lg font-bold">{t.learning.guideMistakes}</h3>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {guide.commonMistakes.map((mistake) => (
            <article
              key={mistake.wrong}
              className="rounded-xl border border-border bg-card p-4 shadow-xs"
            >
              <div className="space-y-2.5">
                <div className="rounded-lg border border-destructive/25 bg-destructive/5 p-3">
                  <p className="flex items-center gap-1.5 text-xs font-bold text-destructive">
                    <XCircle className="size-4 shrink-0" aria-hidden />
                    {t.learning.guideWrong}
                  </p>
                  <p
                    className="mt-1 text-sm font-semibold text-foreground line-through decoration-destructive/70"
                    lang="en"
                    dir="ltr"
                  >
                    {mistake.wrong}
                  </p>
                </div>
                <div className="rounded-lg border border-success/30 bg-success/5 p-3">
                  <p className="flex items-center gap-1.5 text-xs font-bold text-success">
                    <CheckCircle2 className="size-4 shrink-0" aria-hidden />
                    {t.learning.guideRight}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground" lang="en" dir="ltr">
                    {mistake.right}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {mistake.why[locale]}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Golden Memory Tip */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-primary/25 bg-accent-soft p-5">
        <Lightbulb className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
        <div>
          <h3 className="text-sm font-bold text-primary">{t.learning.guideMemoryTip}</h3>
          <p className="mt-1 text-sm font-medium leading-relaxed text-foreground">
            {guide.memoryTip[locale]}
          </p>
        </div>
      </div>
    </section>
  );
}
