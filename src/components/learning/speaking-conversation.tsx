import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  Lightbulb,
  Loader2,
  Mic,
  PhoneCall,
  Radio,
  RotateCcw,
  Send,
  Sparkles,
  Square,
  Volume2,
  VolumeX,
} from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Bilingual } from "@/content/lesson-types";
import { getTurnFluencyCoach, type SpeakingSituation } from "@/content/speaking-situations";
import { playSpeech, speakAsRole, stopSpeech, useSpeech } from "@/hooks/use-speech";
import { format } from "@/lib/i18n/messages";
import { learningRecord } from "@/lib/learning-record";
import { speakingLiveTurn } from "@/lib/speaking-ai.functions";
import { generateLiveSpeakingFallback } from "@/lib/speaking-fallback";

export interface SpeakingConversationProps {
  situation: SpeakingSituation;
  onComplete?: (situationId: string) => void;
}

interface LiveBubble {
  id: string;
  speaker: "partner" | "learner";
  text: string;
  praise?: Bilingual;
  naturalUpgrade?: string;
  upgradeTip?: Bilingual;
}

export function SpeakingConversation({ situation, onComplete }: SpeakingConversationProps) {
  const { t, locale } = useI18n();
  const initialPrompt = situation.turns[0]?.prompt ?? "Hello! Welcome—how can I help you today?";
  const initialCoach = useMemo(() => getTurnFluencyCoach(situation, 0), [situation]);

  const [messages, setMessages] = useState<LiveBubble[]>([
    { id: `${situation.id}-open`, speaker: "partner", text: initialPrompt },
  ]);
  const [draft, setDraft] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [showHints, setShowHints] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [handsFree, setHandsFree] = useState(false);
  const [voiceError, setVoiceError] = useState(false);
  const [goalReached, setGoalReached] = useState(false);
  const [sessionFinished, setSessionFinished] = useState(false);
  const [liveSource, setLiveSource] = useState<"ai" | "adaptive-engine" | null>(null);

  // Dynamic live hints & starters updated after every single partner response
  const [activeHint, setActiveHint] = useState<Bilingual>(initialCoach.hint);
  const [activeStarters, setActiveStarters] = useState<string[]>(initialCoach.starters);

  const messagesRef = useRef<LiveBubble[]>(messages);
  messagesRef.current = messages;
  const handsFreeRef = useRef(handsFree);
  handsFreeRef.current = handsFree;
  const autoSpeakRef = useRef(autoSpeak);
  autoSpeakRef.current = autoSpeak;
  const isReplyingRef = useRef(isReplying);
  isReplyingRef.current = isReplying;

  // Reset conversation whenever situation switches
  useEffect(() => {
    stopSpeech();
    const opening = situation.turns[0]?.prompt ?? "Hello! Welcome—how can I help you today?";
    const coach0 = getTurnFluencyCoach(situation, 0);
    setMessages([{ id: `${situation.id}-open`, speaker: "partner", text: opening }]);
    setDraft("");
    setIsReplying(false);
    setGoalReached(false);
    setSessionFinished(false);
    setShowModel(false);
    setLiveSource(null);
    setActiveHint(coach0.hint);
    setActiveStarters(coach0.starters);
  }, [situation]);

  const sendLiveUtteranceRef = useRef<(spokenText: string) => void>(() => {});

  const speech = useSpeech((text) => {
    if (handsFreeRef.current && !isReplyingRef.current) {
      sendLiveUtteranceRef.current(text);
    } else {
      setDraft((prev) => [prev.trim(), text].filter(Boolean).join(" "));
    }
  });

  const speechStartRef = useRef(speech.start);
  speechStartRef.current = speech.start;
  const speechSupportedRef = useRef(speech.supported);
  speechSupportedRef.current = speech.supported;

  const speakPartnerLine = useCallback((line: string) => {
    if (!autoSpeakRef.current) return;
    const spoke = speakAsRole(line, "male-teacher", {
      rate: 0.94,
      onEnd: () => {
        // In Hands-Free Live Voice Mode, automatically open the mic when partner finishes speaking
        if (handsFreeRef.current && speechSupportedRef.current && !isReplyingRef.current) {
          window.setTimeout(() => {
            if (handsFreeRef.current && !isReplyingRef.current) {
              speechStartRef.current();
            }
          }, 350);
        }
      },
    });
    if (!spoke) setVoiceError(true);
  }, []);

  const sendLiveUtterance = useCallback(
    async (rawText: string) => {
      const cleaned = rawText.trim();
      if (!cleaned || isReplyingRef.current) return;

      stopSpeech();
      setVoiceError(false);
      setShowModel(false);
      setDraft("");
      setIsReplying(true);

      const learnerBubbleId = `learner-${Date.now()}`;
      const optimisticHistory: LiveBubble[] = [
        ...messagesRef.current,
        { id: learnerBubbleId, speaker: "learner", text: cleaned },
      ];
      setMessages(optimisticHistory);

      const payload = {
        situationId: situation.id,
        turns: optimisticHistory.map((m) => ({ speaker: m.speaker, text: m.text })),
      };

      let result;
      try {
        result = await speakingLiveTurn({ data: payload });
      } catch {
        // Seamless reactive fallback if offline or running inside a unit test without an HTTP server
        result = generateLiveSpeakingFallback(payload);
      }

      setLiveSource(result.source);
      setMessages((prev) => {
        const enriched = prev.map((msg) =>
          msg.id === learnerBubbleId
            ? {
                ...msg,
                praise: result.praise,
                naturalUpgrade: result.naturalUpgrade,
                upgradeTip: result.upgradeTip,
              }
            : msg,
        );
        return [
          ...enriched,
          {
            id: `partner-${Date.now()}`,
            speaker: "partner",
            text: result.partnerReply,
          },
        ];
      });

      setActiveHint(result.nextHint);
      if (result.suggestedStarters.length > 0) {
        setActiveStarters(result.suggestedStarters);
      }
      if (result.goalReached) {
        setGoalReached(true);
      }
      setIsReplying(false);
      speakPartnerLine(result.partnerReply);
    },
    [situation.id, speakPartnerLine],
  );

  sendLiveUtteranceRef.current = (spokenText: string) => {
    void sendLiveUtterance(spokenText);
  };

  function insertStarter(starter: string) {
    const clean = starter.replace(/\.\.\.$/, "").trim();
    setDraft((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return `${clean} `;
      return `${trimmed} ${clean} `;
    });
  }

  function startLiveVoiceCall() {
    setAutoSpeak(true);
    setHandsFree(true);
    autoSpeakRef.current = true;
    handsFreeRef.current = true;
    const lastPartner = [...messages].reverse().find((m) => m.speaker === "partner");
    if (lastPartner) {
      speakPartnerLine(lastPartner.text);
    } else if (speech.supported) {
      speech.start();
    }
  }

  function finishSession() {
    stopSpeech();
    speech.stop();
    setHandsFree(false);
    setSessionFinished(true);
    learningRecord.logActivity({
      kind: "speaking",
      count: 1,
      minutes: Math.max(2, learnerTurnCount * 2),
      passed: true,
    });
    onComplete?.(situation.id);
  }

  function resetSession() {
    stopSpeech();
    speech.stop();
    setHandsFree(false);
    setSessionFinished(false);
    setGoalReached(false);
    setLiveSource(null);
    setDraft("");
    setMessages([
      { id: `${situation.id}-open-${Date.now()}`, speaker: "partner", text: initialPrompt },
    ]);
    setActiveHint(initialCoach.hint);
    setActiveStarters(initialCoach.starters);
  }

  const learnerTurnCount = messages.filter((m) => m.speaker === "learner").length;
  const latestPartnerMessage = [...messages].reverse().find((m) => m.speaker === "partner");
  const sampleReference =
    situation.turns[Math.min(learnerTurnCount, situation.turns.length - 1)]?.model ??
    situation.keyPhrases?.[0] ??
    "";

  return (
    <section
      className="min-w-0 rounded-2xl border border-border bg-card p-5 shadow-xs md:p-8"
      aria-label={situation.title[locale]}
    >
      {/* Header & Live Session Controls */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="gap-1.5 bg-emerald-600 text-xs text-white">
              <Radio className="size-3 animate-pulse" aria-hidden />
              {liveSource === "ai" ? t.learning.liveAiPartnerBadge : t.learning.liveSessionBadge}
            </Badge>
            <span className="text-sm font-semibold text-primary">
              {situation.level} · {situation.role[locale]}
            </span>
          </div>
          <h2 className="mt-1.5 text-2xl font-bold">{situation.title[locale]}</h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant={handsFree ? "default" : "outline"}
            className="rounded-full text-xs"
            onClick={() => {
              if (handsFree) {
                setHandsFree(false);
                speech.stop();
                stopSpeech();
              } else {
                startLiveVoiceCall();
              }
            }}
          >
            <PhoneCall className="me-1.5 size-3.5" aria-hidden />
            {handsFree ? t.learning.liveHandsFreeOn : t.learning.liveHandsFreeBtn}
          </Button>

          <Button
            type="button"
            size="sm"
            variant={autoSpeak ? "secondary" : "outline"}
            className="rounded-full text-xs"
            onClick={() => setAutoSpeak((v) => !v)}
          >
            {autoSpeak ? (
              <Volume2 className="me-1.5 size-3.5 text-primary" aria-hidden />
            ) : (
              <VolumeX className="me-1.5 size-3.5" aria-hidden />
            )}
            {t.learning.liveVoiceToggle}
          </Button>

          <Badge variant="outline" className="text-xs font-semibold">
            {format(t.learning.liveExchangesCount, { count: learnerTurnCount })}
          </Badge>
        </div>
      </div>

      {/* Task Goal & Audio Cue Phrases */}
      {(situation.taskGoal || (situation.keyPhrases && situation.keyPhrases.length > 0)) && (
        <div className="mt-5 rounded-xl border border-border bg-muted/60 p-4">
          {situation.taskGoal && (
            <>
              <p className="text-xs font-bold text-primary">{t.learning.taskGoal}</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground">
                {situation.taskGoal[locale]}
              </p>
            </>
          )}
          {situation.keyPhrases && situation.keyPhrases.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-bold text-muted-foreground">{t.learning.keyPhrases}</p>
              <div className="mt-2 flex flex-wrap gap-2" lang="en" dir="ltr">
                {situation.keyPhrases.map((phrase) => (
                  <button
                    key={phrase}
                    type="button"
                    onClick={() => setVoiceError(!playSpeech(phrase, 0.88))}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-foreground hover:bg-secondary"
                  >
                    <Volume2 className="size-3 text-primary" aria-hidden />
                    {phrase}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Real-Time Interactive Conversation Stream */}
      <div className="mt-6 space-y-4" aria-live="polite">
        {messages.map((msg) =>
          msg.speaker === "partner" ? (
            <div key={msg.id} className="rounded-2xl border-s-4 border-primary bg-primary/5 p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold text-primary">
                  {t.learning.partner} ({situation.role[locale]})
                </p>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="size-7 shrink-0"
                  disabled={speech.listening}
                  onClick={() => setVoiceError(!playSpeech(msg.text, 0.94, "male"))}
                  aria-label={t.learning.listen}
                >
                  <Volume2 className="size-4 text-primary" aria-hidden />
                </Button>
              </div>
              <p
                className="mt-1 text-base font-medium leading-relaxed text-foreground"
                lang="en"
                dir="ltr"
              >
                {msg.text}
              </p>
            </div>
          ) : (
            <div key={msg.id} className="space-y-2 ps-3 md:ps-6">
              <div className="rounded-2xl border border-accent/40 bg-accent/10 p-4">
                <p className="text-xs font-bold text-primary">{t.learning.you}</p>
                <p
                  className="mt-1 break-words text-base leading-relaxed text-foreground"
                  lang="en"
                  dir="ltr"
                >
                  {msg.text}
                </p>
              </div>

              {/* Instant Live Fluency Upgrade for the learner's actual response */}
              {msg.naturalUpgrade && msg.praise && msg.upgradeTip && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-3.5 py-2.5 text-xs space-y-1">
                  <p className="font-semibold text-emerald-700 dark:text-emerald-400">
                    {msg.praise[locale]}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-foreground">
                      {t.learning.liveUpgradeLabel}:
                    </span>
                    <button
                      type="button"
                      onClick={() => playSpeech(msg.naturalUpgrade ?? "", 0.92, "female")}
                      className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-0.5 font-medium text-foreground underline-offset-2 hover:underline"
                      lang="en"
                      dir="ltr"
                    >
                      <Volume2 className="size-3 text-primary" aria-hidden />
                      {msg.naturalUpgrade}
                    </button>
                  </div>
                  <p className="text-muted-foreground">{msg.upgradeTip[locale]}</p>
                </div>
              )}
            </div>
          ),
        )}

        {isReplying && (
          <div className="inline-flex items-center gap-2 rounded-2xl border border-primary/25 bg-primary/5 px-4 py-3 text-sm font-medium text-primary">
            <Loader2 className="size-4 animate-spin" aria-hidden />
            <span>{t.learning.livePartnerThinking}</span>
          </div>
        )}
      </div>

      {/* Live Input & Dynamic Fluency Coach OR Completed Summary */}
      {!sessionFinished ? (
        <div className="mt-6 space-y-4">
          {goalReached && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3.5 text-sm">
              <p className="font-semibold text-emerald-800 dark:text-emerald-300">
                {t.learning.liveGoalReachedNote}
              </p>
              <Button type="button" size="sm" onClick={finishSession}>
                <Check className="size-4" aria-hidden />
                {t.learning.liveFinishSaveBtn}
              </Button>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {latestPartnerMessage && (
              <Button
                type="button"
                variant="outline"
                disabled={speech.listening}
                onClick={() => setVoiceError(!playSpeech(latestPartnerMessage.text, 0.94, "male"))}
              >
                <Volume2 aria-hidden />
                {t.learning.listen}
              </Button>
            )}
            <Button
              type="button"
              variant={showHints ? "secondary" : "outline"}
              aria-expanded={showHints}
              onClick={() => setShowHints((v) => !v)}
            >
              <Lightbulb className="text-amber-500" aria-hidden />
              {t.learning.fluencyHintsBtn}
            </Button>
            {sampleReference && (
              <Button
                type="button"
                variant="ghost"
                aria-expanded={showModel}
                onClick={() => setShowModel((v) => !v)}
              >
                {t.learning.sample}
              </Button>
            )}
            {learnerTurnCount >= 2 && !goalReached && (
              <Button type="button" variant="ghost" onClick={finishSession}>
                <Check className="size-4" aria-hidden />
                {t.learning.liveFinishSaveBtn}
              </Button>
            )}
          </div>

          {/* Dynamic Fluency Hints & Clickable Sentence Starters (updated after EVERY turn) */}
          {showHints && (
            <div className="rounded-xl border border-amber-500/35 bg-amber-500/10 p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                <Sparkles className="size-4 shrink-0" aria-hidden />
                <span>{t.learning.fluencyHintTitle}</span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground">{activeHint[locale]}</p>

              <div className="mt-3">
                <p className="text-xs font-semibold text-muted-foreground">
                  {t.learning.fluencyStartersLabel}
                </p>
                <div className="mt-2 flex flex-wrap gap-2" lang="en" dir="ltr">
                  {activeStarters.map((starter) => (
                    <button
                      key={starter}
                      type="button"
                      onClick={() => insertStarter(starter)}
                      className="rounded-full border border-amber-500/40 bg-card px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-amber-500/20"
                    >
                      + {starter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {showModel && sampleReference && (
            <div className="rounded-xl border border-border bg-secondary/50 p-4 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-primary">{t.learning.sample}</span>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs"
                  onClick={() => setVoiceError(!playSpeech(sampleReference, 0.92, "female"))}
                >
                  <Volume2 className="me-1 size-3.5" aria-hidden />
                  {t.learning.listen}
                </Button>
              </div>
              <p className="mt-1.5 font-medium leading-relaxed text-foreground" lang="en" dir="ltr">
                {sampleReference}
              </p>
            </div>
          )}

          {/* Live Voice Mic + Typed Response Form */}
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              void sendLiveUtterance(draft);
            }}
          >
            <label htmlFor={`reply-${situation.id}`} className="block text-sm font-semibold">
              {t.learning.type}
            </label>
            <textarea
              id={`reply-${situation.id}`}
              rows={2}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              disabled={isReplying}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void sendLiveUtterance(draft);
                }
              }}
              placeholder={t.learning.liveInputPlaceholder}
              dir="ltr"
              lang="en"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <div className="flex flex-wrap gap-2">
              {speech.supported && (
                <Button
                  type="button"
                  variant={speech.listening ? "destructive" : "secondary"}
                  disabled={isReplying}
                  onClick={() => (speech.listening ? speech.stop() : speech.start())}
                >
                  {speech.listening ? (
                    <>
                      <Square aria-hidden />
                      {t.learning.stop}
                    </>
                  ) : (
                    <>
                      <Mic aria-hidden />
                      {t.learning.spoken}
                    </>
                  )}
                </Button>
              )}
              <Button type="submit" disabled={!draft.trim() || speech.listening || isReplying}>
                <Send aria-hidden />
                {t.learning.send}
              </Button>
              <Button type="button" variant="ghost" onClick={resetSession}>
                <RotateCcw className="size-4" aria-hidden />
                {t.learning.restart}
              </Button>
            </div>
          </form>

          {speech.listening && (
            <p role="status" className="text-sm font-medium text-primary">
              {handsFree ? t.learning.liveHandsFreeListening : t.learning.listening}
            </p>
          )}
          {speech.error && (
            <p role="alert" className="text-sm text-destructive">
              {t.learning[speech.error]}
            </p>
          )}
          {voiceError && (
            <p role="alert" className="text-sm text-destructive">
              {t.learning.audioUnavailable}
            </p>
          )}
        </div>
      ) : (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-secondary p-4">
          <p className="flex items-center gap-2 font-semibold text-secondary-foreground">
            <Check className="text-primary" aria-hidden />
            {t.learning.done} ({format(t.learning.liveExchangesCount, { count: learnerTurnCount })})
          </p>
          <Button type="button" variant="outline" onClick={resetSession}>
            <RotateCcw aria-hidden />
            {t.learning.restart}
          </Button>
        </div>
      )}
    </section>
  );
}
