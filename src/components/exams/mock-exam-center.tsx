import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  Headphones,
  Lightbulb,
  Loader2,
  Mic,
  MicOff,
  Pause,
  PenLine,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Square,
  Timer,
  Volume2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import type {
  ExamSectionKey,
  ExamSystem,
  FullMockExam,
  ObjectiveQuestion,
  SpeakingTask,
  WritingChartData,
} from "@/content/mock-exams/exam-types";
import { IELTS_ACADEMIC_MOCK, IELTS_GENERAL_MOCK } from "@/content/mock-exams/ielts-mock-data";
import { TOEFL_IBT_MOCK } from "@/content/mock-exams/toefl-mock-data";
import { playDialogueSequence, playSpeech, stopSpeech, useSpeech } from "@/hooks/use-speech";
import { format } from "@/lib/i18n/messages";
import {
  countWords,
  isObjectiveQuestionCorrect,
  mockExamStorage,
  scoreFullMockExam,
  type MockExamReport,
  type ObjectiveAnswerMap,
  type TextResponseMap,
} from "@/lib/mock-exam-scoring";
import { examinerLiveFollowUp } from "@/lib/speaking-ai.functions";
import {
  generateExaminerFollowUpFallback,
  type LiveExaminerFollowUpResult,
} from "@/lib/speaking-fallback";

const EXAMS: Record<ExamSystem, FullMockExam> = {
  "ielts-academic": IELTS_ACADEMIC_MOCK,
  "ielts-general": IELTS_GENERAL_MOCK,
  "toefl-ibt": TOEFL_IBT_MOCK,
};

function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, totalSeconds);
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function AcademicTaskChart({ chart }: { chart: WritingChartData }) {
  const maxVal = Math.max(10, ...chart.series.flatMap((s) => s.values));
  const ceiling = Math.ceil(maxVal / 10) * 10;
  const chartW = 560;
  const chartH = 220;
  const padL = 44;
  const padB = 34;
  const padT = 16;
  const padR = 16;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;
  const groupW = plotW / Math.max(1, chart.categories.length);
  const barW = Math.min(24, (groupW - 18) / Math.max(1, chart.series.length));

  return (
    <div className="rounded-2xl border border-border bg-card p-4" dir="ltr">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-bold text-foreground">{chart.title}</p>
        <Badge variant="outline" className="text-xs">
          {chart.unit}
        </Badge>
      </div>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartW} ${chartH}`}
          className="h-auto w-full min-w-[440px]"
          role="img"
          aria-label={chart.title}
        >
          {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
            const y = padT + plotH * (1 - tick);
            const val = Math.round(ceiling * tick);
            return (
              <g key={tick}>
                <line
                  x1={padL}
                  y1={y}
                  x2={chartW - padR}
                  y2={y}
                  stroke="currentColor"
                  strokeOpacity={0.12}
                  strokeDasharray="3 3"
                />
                <text
                  x={padL - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="currentColor"
                  opacity={0.7}
                >
                  {val}
                </text>
              </g>
            );
          })}

          {chart.categories.map((cat, cIdx) => {
            const groupStart = padL + cIdx * groupW + (groupW - barW * chart.series.length) / 2;
            return (
              <g key={cat}>
                {chart.series.map((s, sIdx) => {
                  const val = s.values[cIdx] ?? 0;
                  const h = (val / ceiling) * plotH;
                  const x = groupStart + sIdx * barW;
                  const y = padT + plotH - h;
                  return (
                    <g key={s.name}>
                      <rect
                        x={x + 1}
                        y={y}
                        width={Math.max(4, barW - 2)}
                        height={Math.max(2, h)}
                        rx={3}
                        fill={s.color}
                      />
                      <text
                        x={x + barW / 2}
                        y={Math.max(padT + 9, y - 4)}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="600"
                        fill="currentColor"
                      >
                        {val}
                      </text>
                    </g>
                  );
                })}
                <text
                  x={padL + cIdx * groupW + groupW / 2}
                  y={chartH - 10}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="currentColor"
                >
                  {cat}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-3 flex flex-wrap gap-3">
        {chart.series.map((s) => (
          <div key={s.name} className="inline-flex items-center gap-1.5 text-xs font-medium">
            <span className="size-2.5 rounded-sm" style={{ backgroundColor: s.color }} />
            <span>{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ObjectiveQuestionCard({
  question,
  answer,
  onChange,
  showReview,
  locale,
}: {
  question: ObjectiveQuestion;
  answer: number | string | undefined;
  onChange: (value: number | string) => void;
  showReview: boolean;
  locale: "en" | "ar";
}) {
  const { t } = useI18n();
  const isCorrect = showReview ? isObjectiveQuestionCorrect(question, answer) : false;

  return (
    <div
      className={`rounded-2xl border p-4 transition-colors ${
        showReview
          ? isCorrect
            ? "border-emerald-500/50 bg-emerald-500/5"
            : "border-destructive/40 bg-destructive/5"
          : "border-border bg-card"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-mono text-xs">
            Q{question.number}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {question.typeBadge[locale]}
          </Badge>
        </div>
        {showReview &&
          (isCorrect ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="size-4" aria-hidden />
              {t.mockExams.correctLabel}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-destructive">
              <XCircle className="size-4" aria-hidden />
              {t.mockExams.incorrectLabel}
            </span>
          ))}
      </div>

      <p className="mt-2.5 text-sm font-medium leading-relaxed text-foreground" dir="ltr">
        {question.prompt}
      </p>

      {question.questionType === "fill" ? (
        <div className="mt-3">
          <Input
            value={typeof answer === "string" ? answer : ""}
            onChange={(e) => onChange(e.target.value)}
            disabled={showReview}
            placeholder={t.mockExams.fillPlaceholder}
            dir="ltr"
            aria-label={`Question ${question.number}`}
          />
          {showReview && question.acceptedAnswers && (
            <p className="mt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {t.mockExams.acceptedAnswerLabel}:{" "}
              <span dir="ltr">{question.acceptedAnswers.join(" / ")}</span>
            </p>
          )}
        </div>
      ) : (
        <div
          className="mt-3 space-y-2"
          role="radiogroup"
          aria-label={`Question ${question.number}`}
        >
          {(question.options ?? []).map((opt, idx) => {
            const selected = answer === idx;
            const isKeyed = question.correctIndex === idx;
            let stateClasses = "border-border bg-background hover:bg-muted/60";
            if (showReview && isKeyed) {
              stateClasses =
                "border-emerald-500 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100";
            } else if (showReview && selected && !isKeyed) {
              stateClasses = "border-destructive bg-destructive/10 text-destructive";
            } else if (selected) {
              stateClasses = "border-primary bg-primary/10 text-foreground";
            }

            return (
              <button
                key={`${question.id}-opt-${idx}`}
                type="button"
                disabled={showReview}
                onClick={() => onChange(idx)}
                className={`flex w-full items-start gap-2.5 rounded-xl border px-3.5 py-2.5 text-start text-sm transition-colors ${stateClasses}`}
                dir="ltr"
              >
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-current text-[11px] font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-snug">{opt}</span>
              </button>
            );
          })}
        </div>
      )}

      {showReview && (
        <p className="mt-3 rounded-xl bg-muted/60 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">{t.mockExams.explanationLabel}:</span>{" "}
          {question.explanation[locale]}
        </p>
      )}
    </div>
  );
}

function SpeakingTaskRecorder({
  examTitle,
  task,
  value,
  onChange,
  showModel,
  locale,
}: {
  examTitle: string;
  task: SpeakingTask;
  value: string;
  onChange: (val: string) => void;
  showModel: boolean;
  locale: "en" | "ar";
}) {
  const { t } = useI18n();
  const [phase, setPhase] = useState<"idle" | "prep" | "speak" | "done">("idle");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [followUp, setFollowUp] = useState<LiveExaminerFollowUpResult | null>(null);
  const [askingFollowUp, setAskingFollowUp] = useState(false);

  const requestLiveFollowUp = async () => {
    const cleaned = value.trim();
    if (!cleaned || askingFollowUp) return;
    setAskingFollowUp(true);
    const payload = {
      examTitle,
      partLabel: task.partLabel.en,
      originalPrompt: task.cueCard?.topic ?? task.prompts[0] ?? task.title.en,
      learnerAnswer: cleaned,
    };
    let res: LiveExaminerFollowUpResult;
    try {
      res = await examinerLiveFollowUp({ data: payload });
    } catch {
      res = generateExaminerFollowUpFallback(payload);
    }
    setFollowUp(res);
    setAskingFollowUp(false);
    playSpeech(res.examinerFollowUp, 0.94, "female");
  };

  const onTranscript = useCallback(
    (spoken: string) => {
      onChange(value.trim() ? `${value.trim()} ${spoken}` : spoken);
    },
    [onChange, value],
  );
  const speech = useSpeech(onTranscript);

  useEffect(() => {
    if (phase !== "prep" && phase !== "speak") return;
    if (secondsLeft <= 0) {
      if (phase === "prep") {
        setPhase("speak");
        setSecondsLeft(task.speakSeconds);
      } else {
        setPhase("done");
        speech.stop();
      }
      return;
    }
    const id = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [phase, secondsLeft, task.speakSeconds, speech]);

  const startTimedTurn = () => {
    if (task.prepSeconds > 0) {
      setPhase("prep");
      setSecondsLeft(task.prepSeconds);
    } else {
      setPhase("speak");
      setSecondsLeft(task.speakSeconds);
    }
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-primary text-primary-foreground">{task.partLabel[locale]}</Badge>
            <Badge variant="outline" className="gap-1 font-mono text-xs" dir="ltr">
              <Timer className="size-3.5" aria-hidden />
              {task.prepSeconds > 0 ? `${task.prepSeconds}s prep · ` : ""}
              {task.speakSeconds}s speak
            </Badge>
          </div>
          <Button
            type="button"
            size="sm"
            variant={phase === "prep" || phase === "speak" ? "destructive" : "outline"}
            onClick={() => {
              if (phase === "prep" || phase === "speak") {
                setPhase("idle");
                setSecondsLeft(0);
                speech.stop();
              } else {
                startTimedTurn();
              }
            }}
          >
            <Clock className="size-3.5" aria-hidden />
            {phase === "prep"
              ? `${t.mockExams.prepTimerLabel}: ${formatClock(secondsLeft)}`
              : phase === "speak"
                ? `${t.mockExams.speakTimerLabel}: ${formatClock(secondsLeft)}`
                : t.mockExams.startOfficialTimer}
          </Button>
        </div>
        <CardTitle className="mt-2 text-lg">{task.title[locale]}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Optional integrated reading snippet (TOEFL Tasks 2 & 3) */}
        {task.readingSnippet && (
          <div className="rounded-xl border border-border bg-muted/40 p-4" dir="ltr">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">
              {t.mockExams.integratedReadingLabel} — {task.readingSnippet.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {task.readingSnippet.text}
            </p>
          </div>
        )}

        {/* Optional integrated listening snippet (TOEFL Tasks 2, 3, 4) */}
        {task.listeningSnippet && (
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-bold uppercase tracking-wide text-primary">
                {t.mockExams.integratedAudioLabel}: {task.listeningSnippet.speaker}
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() =>
                    playSpeech(task.listeningSnippet?.transcript.join(" ") ?? "", 0.94, "male")
                  }
                >
                  <Volume2 className="size-3.5" aria-hidden />
                  {t.mockExams.playAudioBtn}
                </Button>
                <Button type="button" size="sm" variant="ghost" onClick={stopSpeech}>
                  <Square className="size-3.5" aria-hidden />
                </Button>
              </div>
            </div>
            <details className="mt-2">
              <summary className="cursor-pointer text-xs font-semibold text-muted-foreground hover:text-foreground">
                {t.mockExams.toggleTranscriptBtn}
              </summary>
              <div className="mt-2 space-y-1.5 text-xs leading-relaxed text-foreground" dir="ltr">
                {task.listeningSnippet.transcript.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </details>
          </div>
        )}

        {/* Official IELTS Cue Card */}
        {task.cueCard && (
          <div
            className="rounded-2xl border-2 border-amber-500/40 bg-amber-500/10 p-4 shadow-xs"
            dir="ltr"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-amber-800 dark:text-amber-300">
              {t.mockExams.cueCardLabel}
            </p>
            <p className="mt-1.5 text-base font-bold text-foreground">{task.cueCard.topic}</p>
            <ul className="mt-2 list-disc space-y-1 ps-5 text-sm text-foreground">
              {task.cueCard.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Examiner Prompts with audio playback */}
        <div className="space-y-2">
          {task.prompts.map((prompt, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between gap-2 rounded-xl border border-border bg-background p-3"
            >
              <p className="text-sm font-medium text-foreground" dir="ltr">
                {idx + 1}. {prompt}
              </p>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="size-8 shrink-0"
                onClick={() => playSpeech(prompt, 0.94, "female")}
                aria-label={`Listen to prompt ${idx + 1}`}
              >
                <Volume2 className="size-4" aria-hidden />
              </Button>
            </div>
          ))}
        </div>

        {/* Collapsible Fluency Hints */}
        <div>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="gap-1.5 text-xs text-primary"
            onClick={() => setShowHints((v) => !v)}
          >
            <Lightbulb className="size-3.5" aria-hidden />
            {showHints ? t.mockExams.hideHintsBtn : t.mockExams.showHintsBtn}
          </Button>
          {showHints && (
            <ul className="mt-2 space-y-1.5 rounded-xl border border-primary/25 bg-primary/5 p-3 text-xs text-foreground">
              {task.fluencyHints.map((hint, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-primary">•</span>
                  <span>{hint[locale]}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Mic Capture + Editable Response */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {speech.supported && (
                <Button
                  type="button"
                  size="sm"
                  variant={speech.listening ? "destructive" : "secondary"}
                  onClick={() => (speech.listening ? speech.stop() : speech.start())}
                >
                  {speech.listening ? (
                    <>
                      <MicOff className="size-3.5" aria-hidden />
                      {t.mockExams.stopMicBtn}
                    </>
                  ) : (
                    <>
                      <Mic className="size-3.5" aria-hidden />
                      {t.mockExams.recordMicBtn}
                    </>
                  )}
                </Button>
              )}
              <span className="text-xs text-muted-foreground">
                {format(t.mockExams.wordsCountBadge, { count: countWords(value) })}
              </span>
            </div>
          </div>
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={4}
            dir="ltr"
            placeholder={t.mockExams.speakingResponsePlaceholder}
            aria-label={task.title[locale]}
          />

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={!value.trim() || askingFollowUp}
              onClick={() => void requestLiveFollowUp()}
            >
              {askingFollowUp ? (
                <Loader2 className="size-3.5 animate-spin" aria-hidden />
              ) : (
                <Sparkles className="size-3.5 text-primary" aria-hidden />
              )}
              {t.mockExams.liveExaminerFollowUpBtn}
            </Button>
          </div>

          {followUp && (
            <div className="rounded-xl border-s-4 border-primary bg-primary/5 p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-wide text-primary">
                  {t.mockExams.liveExaminerFollowUpTitle}
                </p>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => playSpeech(followUp.examinerFollowUp, 0.94, "female")}
                >
                  <Volume2 className="size-3.5" aria-hidden />
                  {t.mockExams.playAudioBtn}
                </Button>
              </div>
              <p className="text-sm font-semibold leading-relaxed text-foreground" dir="ltr">
                {followUp.examinerFollowUp}
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {followUp.quickFeedback[locale]}
              </p>
            </div>
          )}
        </div>

        {showModel && (
          <div className="rounded-xl border border-emerald-500/35 bg-emerald-500/5 p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                {t.mockExams.modelResponseLabel}
              </p>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => playSpeech(task.modelResponse, 0.94, "female")}
              >
                <Volume2 className="size-3.5" aria-hidden />
                {t.mockExams.playModelBtn}
              </Button>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-foreground" dir="ltr">
              {task.modelResponse}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function MockExamCenter() {
  const { t, locale, dir } = useI18n();
  const m = t.mockExams;

  const [selectedExamId, setSelectedExamId] = useState<ExamSystem>("ielts-academic");
  const [mode, setMode] = useState<"exam" | "practice">("exam");
  const [stage, setStage] = useState<"lobby" | "active" | "report">("lobby");
  const [activeSection, setActiveSection] = useState<ExamSectionKey>("listening");
  const [activeListeningPartIdx, setActiveListeningPartIdx] = useState(0);
  const [activeReadingIdx, setActiveReadingIdx] = useState(0);

  // Answers state
  const [listeningAnswers, setListeningAnswers] = useState<ObjectiveAnswerMap>({});
  const [readingAnswers, setReadingAnswers] = useState<ObjectiveAnswerMap>({});
  const [writingResponses, setWritingResponses] = useState<TextResponseMap>({});
  const [speakingResponses, setSpeakingResponses] = useState<TextResponseMap>({});

  // Timers
  const [sectionSecondsLeft, setSectionSecondsLeft] = useState(0);
  const [timerPaused, setTimerPaused] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Audio playback tracking
  const [playingPartId, setPlayingPartId] = useState<string | null>(null);
  const [activeTurnIdx, setActiveTurnIdx] = useState<number>(-1);
  const stopAudioRef = useRef<(() => void) | null>(null);

  // Reports & history
  const [report, setReport] = useState<MockExamReport | null>(null);
  const [history, setHistory] = useState<MockExamReport[]>([]);

  const exam = EXAMS[selectedExamId];

  // Official section order: IELTS starts with Listening; TOEFL iBT starts with Reading.
  const sectionOrder: ExamSectionKey[] = useMemo(
    () =>
      selectedExamId === "toefl-ibt"
        ? ["reading", "listening", "speaking", "writing"]
        : ["listening", "reading", "writing", "speaking"],
    [selectedExamId],
  );

  useEffect(() => {
    setHistory(mockExamStorage.getHistory());
  }, []);

  const stopActiveAudio = useCallback(() => {
    stopAudioRef.current?.();
    stopAudioRef.current = null;
    stopSpeech();
    setPlayingPartId(null);
    setActiveTurnIdx(-1);
  }, []);

  useEffect(() => () => stopActiveAudio(), [stopActiveAudio]);

  // Live exam timer
  useEffect(() => {
    if (stage !== "active" || timerPaused) return;
    const id = window.setInterval(() => {
      setElapsedSeconds((e) => e + 1);
      setSectionSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [stage, timerPaused]);

  const getSectionDurationSec = useCallback(
    (sec: ExamSectionKey, targetExam: FullMockExam) => targetExam[sec].durationMinutes * 60,
    [],
  );

  const startExam = (examId: ExamSystem, chosenMode: "exam" | "practice") => {
    stopActiveAudio();
    const target = EXAMS[examId];
    const firstSec: ExamSectionKey = examId === "toefl-ibt" ? "reading" : "listening";
    setSelectedExamId(examId);
    setMode(chosenMode);
    setActiveSection(firstSec);
    setActiveListeningPartIdx(0);
    setActiveReadingIdx(0);
    setListeningAnswers({});
    setReadingAnswers({});
    setWritingResponses({});
    setSpeakingResponses({});
    setElapsedSeconds(0);
    setSectionSecondsLeft(getSectionDurationSec(firstSec, target));
    setTimerPaused(false);
    setReport(null);
    setStage("active");
  };

  const switchSection = (nextSec: ExamSectionKey) => {
    stopActiveAudio();
    setActiveSection(nextSec);
    setSectionSecondsLeft(getSectionDurationSec(nextSec, exam));
  };

  const handleSubmitExam = () => {
    stopActiveAudio();
    const nextReport = scoreFullMockExam({
      exam,
      listeningAnswers,
      readingAnswers,
      writingResponses,
      speakingResponses,
      elapsedSeconds,
      mode,
    });
    const updatedHistory = mockExamStorage.saveReport(nextReport);
    setReport(nextReport);
    setHistory(updatedHistory);
    setStage("report");
    toast.success(m.examSubmittedToast);
  };

  const playListeningPart = (partId: string) => {
    if (playingPartId === partId) {
      stopActiveAudio();
      return;
    }
    stopActiveAudio();
    const part = exam.listening.parts.find((p) => p.id === partId);
    if (!part) return;
    setPlayingPartId(partId);
    const turns = part.transcript.map((turn) => ({
      text: turn.text,
      role: turn.voice === "female" ? ("female-teacher" as const) : ("male-teacher" as const),
    }));
    stopAudioRef.current = playDialogueSequence(turns, {
      rate: 0.95,
      onTurnStart: (idx) => setActiveTurnIdx(idx),
      onComplete: () => {
        setPlayingPartId(null);
        setActiveTurnIdx(-1);
        stopAudioRef.current = null;
      },
    });
  };

  const totalObjectiveQuestions =
    exam.listening.parts.reduce((s, p) => s + p.questions.length, 0) +
    exam.reading.passages.reduce((s, p) => s + p.questions.length, 0);

  const answeredObjectiveCount =
    Object.values(listeningAnswers).filter((v) => v !== "" && v !== undefined).length +
    Object.values(readingAnswers).filter((v) => v !== "" && v !== undefined).length;

  const sectionMeta: Record<ExamSectionKey, { label: string; Icon: typeof Headphones }> = {
    listening: { label: m.sectionListening, Icon: Headphones },
    reading: { label: m.sectionReading, Icon: BookOpen },
    writing: { label: m.sectionWriting, Icon: PenLine },
    speaking: { label: m.sectionSpeaking, Icon: Mic },
  };

  return (
    <div dir={dir} className="pb-20">
      {/* Header Banner */}
      <header className="border-b border-border bg-inverse text-inverse-foreground">
        <div className="container-page py-10 md:py-14">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-accent text-accent-foreground">{m.heroBadge}</Badge>
            <Badge
              variant="outline"
              className="border-inverse-foreground/30 text-inverse-foreground"
            >
              IELTS (Band 0.0–9.0) · TOEFL iBT (0–120)
            </Badge>
          </div>
          <h1 className="display-heading mt-3 max-w-3xl text-3xl font-extrabold md:text-5xl">
            {m.heroTitle}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-inverse-muted md:text-lg">
            {m.heroSubtitle}
          </p>
        </div>
      </header>

      <div className="container-page mt-8 space-y-8">
        {/* ================= LOBBY VIEW ================= */}
        {stage === "lobby" && (
          <>
            {/* Mode toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5">
              <div>
                <h2 className="text-base font-bold text-foreground">{m.modeSelectorTitle}</h2>
                <p className="text-sm text-muted-foreground">{m.modeSelectorDesc}</p>
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label={m.modeSelectorTitle}>
                <Button
                  type="button"
                  variant={mode === "exam" ? "default" : "outline"}
                  onClick={() => setMode("exam")}
                >
                  <ShieldCheck className="size-4" aria-hidden />
                  {m.modeExamLabel}
                </Button>
                <Button
                  type="button"
                  variant={mode === "practice" ? "default" : "outline"}
                  onClick={() => setMode("practice")}
                >
                  <Lightbulb className="size-4" aria-hidden />
                  {m.modePracticeLabel}
                </Button>
              </div>
            </div>

            {/* 3 Authentic Exam Cards */}
            <div className="grid gap-6 lg:grid-cols-3">
              {(["ielts-academic", "ielts-general", "toefl-ibt"] as ExamSystem[]).map((examId) => {
                const item = EXAMS[examId];
                const lCount = item.listening.parts.reduce((s, p) => s + p.questions.length, 0);
                const rCount = item.reading.passages.reduce((s, p) => s + p.questions.length, 0);
                const isToefl = examId === "toefl-ibt";

                return (
                  <Card
                    key={examId}
                    className={`flex flex-col border-2 transition-shadow hover:shadow-md ${
                      isToefl ? "border-primary/45" : "border-border"
                    }`}
                  >
                    <CardHeader>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <Badge variant={isToefl ? "default" : "secondary"}>
                          {item.scoreScaleLabel[locale]}
                        </Badge>
                        <Badge variant="outline" className="gap-1 text-xs">
                          <Clock className="size-3" aria-hidden />
                          {item.durationLabel[locale]}
                        </Badge>
                      </div>
                      <CardTitle className="mt-3 text-xl font-extrabold">
                        {item.title[locale]}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {item.subtitle[locale]}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col justify-between space-y-5">
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <Headphones className="size-4 shrink-0 text-primary" aria-hidden />
                          <span>
                            {m.sectionListening}: {item.listening.parts.length} {m.partsUnit} ·{" "}
                            {lCount} {m.questionsUnit} ({item.listening.durationMinutes} min)
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <BookOpen className="size-4 shrink-0 text-primary" aria-hidden />
                          <span>
                            {m.sectionReading}: {item.reading.passages.length} {m.passagesUnit} ·{" "}
                            {rCount} {m.questionsUnit} ({item.reading.durationMinutes} min)
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <PenLine className="size-4 shrink-0 text-primary" aria-hidden />
                          <span>
                            {m.sectionWriting}: {item.writing.tasks.length} {m.tasksUnit} (
                            {item.writing.durationMinutes} min)
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Mic className="size-4 shrink-0 text-primary" aria-hidden />
                          <span>
                            {m.sectionSpeaking}: {item.speaking.tasks.length} {m.tasksUnit} (
                            {item.speaking.durationMinutes} min)
                          </span>
                        </li>
                      </ul>

                      <div className="space-y-3">
                        <p className="rounded-xl bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground">
                          {item.authenticNotice[locale]}
                        </p>
                        <Button
                          type="button"
                          size="lg"
                          className="w-full"
                          onClick={() => startExam(examId, mode)}
                        >
                          <GraduationCap className="size-4" aria-hidden />
                          {format(m.startExamBtn, { exam: item.title[locale] })}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Attempt History */}
            {history.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Award className="size-5 text-primary" aria-hidden />
                    {m.historyTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {history.slice(0, 6).map((item) => {
                    const isToefl = item.examId === "toefl-ibt";
                    return (
                      <div
                        key={item.id}
                        className="rounded-xl border border-border bg-background p-4 text-sm"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-foreground">
                            {EXAMS[item.examId].title[locale]}
                          </span>
                          <Badge className="bg-primary text-primary-foreground" dir="ltr">
                            {isToefl
                              ? `${item.overallScore}/120`
                              : `Band ${item.overallScore.toFixed(1)}`}
                          </Badge>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground" dir="ltr">
                          L: {item.sections.listening.scaledScore} · R:{" "}
                          {item.sections.reading.scaledScore} · W:{" "}
                          {item.sections.writing.scaledScore} · S:{" "}
                          {item.sections.speaking.scaledScore} · CEFR {item.cefrEquivalent}
                        </p>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* ================= ACTIVE EXAM SIMULATOR ================= */}
        {stage === "active" && (
          <div className="space-y-6">
            {/* Sticky Exam Control Bar */}
            <div className="sticky top-18 z-30 rounded-2xl border-2 border-primary/30 bg-card/95 p-4 shadow-md backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-primary text-primary-foreground">{exam.title[locale]}</Badge>
                  <Badge variant="outline">
                    {mode === "exam" ? m.modeExamLabel : m.modePracticeLabel}
                  </Badge>
                  <span className="text-xs font-medium text-muted-foreground">
                    {format(m.objectiveProgressLabel, {
                      answered: answeredObjectiveCount,
                      total: totalObjectiveQuestions,
                    })}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-sm font-bold ${
                      sectionSecondsLeft < 180
                        ? "border-destructive bg-destructive/10 text-destructive"
                        : "border-border bg-muted text-foreground"
                    }`}
                    dir="ltr"
                  >
                    <Clock className="size-4" aria-hidden />
                    {formatClock(sectionSecondsLeft)}
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setTimerPaused((p) => !p)}
                  >
                    {timerPaused ? (
                      <>
                        <Play className="size-3.5" aria-hidden />
                        {m.resumeTimerBtn}
                      </>
                    ) : (
                      <>
                        <Pause className="size-3.5" aria-hidden />
                        {m.pauseTimerBtn}
                      </>
                    )}
                  </Button>
                  <Button type="button" size="sm" variant="accent" onClick={handleSubmitExam}>
                    <CheckCircle2 className="size-4" aria-hidden />
                    {m.submitExamBtn}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      stopActiveAudio();
                      setStage("lobby");
                    }}
                  >
                    {m.exitExamBtn}
                  </Button>
                </div>
              </div>

              {/* 4-Section Stepper */}
              <div className="mt-3 flex flex-wrap gap-2">
                {sectionOrder.map((sec, idx) => {
                  const { label, Icon } = sectionMeta[sec];
                  const isCurrent = activeSection === sec;
                  return (
                    <Button
                      key={sec}
                      type="button"
                      size="sm"
                      variant={isCurrent ? "default" : "outline"}
                      className="rounded-full"
                      onClick={() => switchSection(sec)}
                    >
                      <span className="me-1 font-mono text-xs opacity-75">{idx + 1}.</span>
                      <Icon className="size-3.5" aria-hidden />
                      {label} ({exam[sec].durationMinutes}m)
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* -------- SECTION 1: LISTENING -------- */}
            {activeSection === "listening" && (
              <section className="space-y-5">
                <div className="rounded-2xl border border-border bg-muted/40 p-4 text-sm text-foreground">
                  {exam.listening.instructions[locale]}
                </div>

                {/* Part Selector */}
                <div className="flex flex-wrap gap-2">
                  {exam.listening.parts.map((part, idx) => (
                    <Button
                      key={part.id}
                      type="button"
                      size="sm"
                      variant={activeListeningPartIdx === idx ? "secondary" : "outline"}
                      onClick={() => {
                        stopActiveAudio();
                        setActiveListeningPartIdx(idx);
                      }}
                    >
                      {part.title[locale]}
                    </Button>
                  ))}
                </div>

                {(() => {
                  const part = exam.listening.parts[activeListeningPartIdx];
                  if (!part) return null;
                  const isPlaying = playingPartId === part.id;
                  const activeTurn = activeTurnIdx >= 0 ? part.transcript[activeTurnIdx] : null;

                  return (
                    <div className="space-y-5">
                      <Card className="border-primary/35 bg-primary/5">
                        <CardContent className="space-y-3 p-5">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <h2 className="text-lg font-extrabold text-foreground">
                                {part.title[locale]}
                              </h2>
                              <p className="text-sm text-muted-foreground">
                                {part.context[locale]}
                              </p>
                            </div>
                            <Button
                              type="button"
                              size="lg"
                              variant={isPlaying ? "destructive" : "default"}
                              onClick={() => playListeningPart(part.id)}
                            >
                              {isPlaying ? (
                                <>
                                  <Square className="size-4" aria-hidden />
                                  {m.stopAudioBtn}
                                </>
                              ) : (
                                <>
                                  <Volume2 className="size-4" aria-hidden />
                                  {m.playRecordingBtn}
                                </>
                              )}
                            </Button>
                          </div>

                          {isPlaying && activeTurn && (
                            <div className="space-y-2 rounded-xl bg-card p-3">
                              <div className="flex items-center justify-between text-xs font-semibold text-primary">
                                <span>
                                  {m.nowSpeakingLabel}: {activeTurn.speaker}
                                </span>
                                <span dir="ltr">
                                  {activeTurnIdx + 1} / {part.transcript.length}
                                </span>
                              </div>
                              <Progress
                                value={((activeTurnIdx + 1) / part.transcript.length) * 100}
                                className="h-2"
                              />
                            </div>
                          )}

                          {/* Transcript available in Guided Practice Mode */}
                          {mode === "practice" && (
                            <details className="rounded-xl border border-border bg-card p-3">
                              <summary className="cursor-pointer text-xs font-bold text-primary">
                                {m.toggleTranscriptBtn}
                              </summary>
                              <div className="mt-3 space-y-2 text-sm" dir="ltr">
                                {part.transcript.map((turn, tIdx) => (
                                  <p key={tIdx} className="leading-relaxed">
                                    <span className="font-bold text-primary">{turn.speaker}:</span>{" "}
                                    {turn.text}
                                  </p>
                                ))}
                              </div>
                            </details>
                          )}
                        </CardContent>
                      </Card>

                      <div className="grid gap-4 md:grid-cols-2">
                        {part.questions.map((q) => (
                          <ObjectiveQuestionCard
                            key={q.id}
                            question={q}
                            answer={listeningAnswers[q.id]}
                            onChange={(val) =>
                              setListeningAnswers((prev) => ({ ...prev, [q.id]: val }))
                            }
                            showReview={false}
                            locale={locale}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </section>
            )}

            {/* -------- SECTION 2: READING -------- */}
            {activeSection === "reading" && (
              <section className="space-y-5">
                <div className="rounded-2xl border border-border bg-muted/40 p-4 text-sm text-foreground">
                  {exam.reading.instructions[locale]}
                </div>

                <div className="flex flex-wrap gap-2">
                  {exam.reading.passages.map((p, idx) => (
                    <Button
                      key={p.id}
                      type="button"
                      size="sm"
                      variant={activeReadingIdx === idx ? "secondary" : "outline"}
                      onClick={() => setActiveReadingIdx(idx)}
                    >
                      {m.passagePrefix} {idx + 1}: {p.category[locale]}
                    </Button>
                  ))}
                </div>

                {(() => {
                  const passage = exam.reading.passages[activeReadingIdx];
                  if (!passage) return null;
                  return (
                    <div className="grid gap-6 lg:grid-cols-12">
                      {/* Passage Pane */}
                      <Card className="lg:col-span-7 lg:max-h-[72vh] lg:overflow-y-auto">
                        <CardHeader>
                          <Badge variant="outline" className="w-fit">
                            {passage.category[locale]}
                          </Badge>
                          <CardTitle className="mt-2 text-xl font-extrabold" dir="ltr">
                            {passage.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm leading-7 text-foreground">
                          {passage.paragraphs.map((para) => (
                            <div key={para.label} dir="ltr" className="space-y-1">
                              <span className="me-2 inline-block rounded-md bg-secondary px-2 py-0.5 text-xs font-bold text-primary">
                                {para.label}
                              </span>
                              <span>{para.text}</span>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      {/* Questions Pane */}
                      <div className="space-y-4 lg:col-span-5 lg:max-h-[72vh] lg:overflow-y-auto">
                        {passage.questions.map((q) => (
                          <ObjectiveQuestionCard
                            key={q.id}
                            question={q}
                            answer={readingAnswers[q.id]}
                            onChange={(val) =>
                              setReadingAnswers((prev) => ({ ...prev, [q.id]: val }))
                            }
                            showReview={false}
                            locale={locale}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </section>
            )}

            {/* -------- SECTION 3: WRITING -------- */}
            {activeSection === "writing" && (
              <section className="space-y-6">
                <div className="rounded-2xl border border-border bg-muted/40 p-4 text-sm text-foreground">
                  {exam.writing.instructions[locale]}
                </div>

                {exam.writing.tasks.map((task) => {
                  const text = writingResponses[task.id] ?? "";
                  const wc = countWords(text);
                  const metMin = wc >= task.minWords;

                  return (
                    <Card key={task.id} className="border-border">
                      <CardHeader>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge className="bg-primary text-primary-foreground">
                              {task.label[locale]}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {task.recommendedMinutes} min · {task.minWords}+ {m.wordsUnit}
                            </Badge>
                          </div>
                          <Badge
                            variant={metMin ? "default" : "secondary"}
                            className={metMin ? "bg-emerald-600 text-white" : ""}
                          >
                            {wc} / {task.minWords} {m.wordsUnit}
                          </Badge>
                        </div>
                        <CardTitle className="mt-2 text-xl">{task.title[locale]}</CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p
                          className="rounded-xl border border-border bg-muted/35 p-4 text-sm font-medium leading-relaxed text-foreground"
                          dir="ltr"
                        >
                          {task.prompt}
                        </p>

                        {task.bulletPoints && (
                          <ul
                            className="list-disc space-y-1 rounded-xl bg-secondary/40 p-4 ps-8 text-sm text-foreground"
                            dir="ltr"
                          >
                            {task.bulletPoints.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        )}

                        {task.chartData && <AcademicTaskChart chart={task.chartData} />}

                        {task.integratedReading && (
                          <div className="rounded-xl border border-border bg-card p-4" dir="ltr">
                            <p className="text-xs font-bold uppercase tracking-wide text-primary">
                              {m.integratedReadingLabel}: {task.integratedReading.title}
                            </p>
                            <div className="mt-2 space-y-2.5 text-sm leading-relaxed">
                              {task.integratedReading.paragraphs.map((p, i) => (
                                <p key={i}>{p}</p>
                              ))}
                            </div>
                          </div>
                        )}

                        {task.integratedLecture && (
                          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <p className="text-xs font-bold uppercase tracking-wide text-primary">
                                {m.integratedAudioLabel}: {task.integratedLecture.speaker}
                              </p>
                              <div className="flex gap-2">
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="secondary"
                                  onClick={() =>
                                    playSpeech(
                                      task.integratedLecture?.transcript.join(" ") ?? "",
                                      0.94,
                                      "male",
                                    )
                                  }
                                >
                                  <Volume2 className="size-3.5" aria-hidden />
                                  {m.playAudioBtn}
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  onClick={stopSpeech}
                                >
                                  <Square className="size-3.5" aria-hidden />
                                </Button>
                              </div>
                            </div>
                            <details className="mt-2">
                              <summary className="cursor-pointer text-xs font-semibold text-muted-foreground">
                                {m.toggleTranscriptBtn}
                              </summary>
                              <div className="mt-2 space-y-1.5 text-xs leading-relaxed" dir="ltr">
                                {task.integratedLecture.transcript.map((line, i) => (
                                  <p key={i}>{line}</p>
                                ))}
                              </div>
                            </details>
                          </div>
                        )}

                        {task.discussionContext && (
                          <div className="space-y-3 rounded-2xl border border-border bg-muted/30 p-4">
                            <div className="rounded-xl bg-card p-3.5" dir="ltr">
                              <p className="text-xs font-bold uppercase text-primary">Professor</p>
                              <p className="mt-1 text-sm leading-relaxed text-foreground">
                                {task.discussionContext.professorPrompt}
                              </p>
                            </div>
                            <div className="grid gap-3 md:grid-cols-2">
                              {task.discussionContext.studentPosts.map((post) => (
                                <div
                                  key={post.name}
                                  className="rounded-xl border border-border bg-card p-3.5"
                                  dir="ltr"
                                >
                                  <p className="text-xs font-bold text-foreground">{post.name}</p>
                                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                    {post.text}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <Textarea
                          value={text}
                          onChange={(e) =>
                            setWritingResponses((prev) => ({ ...prev, [task.id]: e.target.value }))
                          }
                          rows={10}
                          dir="ltr"
                          placeholder={m.writingPlaceholder}
                          aria-label={task.title[locale]}
                        />

                        <div className="rounded-xl bg-muted/40 p-3">
                          <p className="text-xs font-bold text-foreground">{m.rubricChecklist}</p>
                          <ul className="mt-1.5 space-y-1 text-xs text-muted-foreground">
                            {task.bandChecklist.map((c, idx) => (
                              <li key={idx}>• {c[locale]}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </section>
            )}

            {/* -------- SECTION 4: SPEAKING -------- */}
            {activeSection === "speaking" && (
              <section className="space-y-5">
                <div className="rounded-2xl border border-border bg-muted/40 p-4 text-sm text-foreground">
                  {exam.speaking.instructions[locale]}
                </div>
                {exam.speaking.tasks.map((task) => (
                  <SpeakingTaskRecorder
                    key={task.id}
                    examTitle={exam.title.en}
                    task={task}
                    value={speakingResponses[task.id] ?? ""}
                    onChange={(val) =>
                      setSpeakingResponses((prev) => ({ ...prev, [task.id]: val }))
                    }
                    showModel={mode === "practice"}
                    locale={locale}
                  />
                ))}
              </section>
            )}
          </div>
        )}

        {/* ================= OFFICIAL-STYLE SCORE REPORT & ANSWER REVIEW ================= */}
        {stage === "report" && report && (
          <div className="space-y-8">
            <Card className="border-2 border-primary/40 bg-card shadow-md">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <Badge className="bg-emerald-600 text-white">{m.reportBadge}</Badge>
                    <CardTitle className="mt-2 text-2xl font-extrabold md:text-3xl">
                      {exam.title[locale]} — {m.reportTitle}
                    </CardTitle>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => startExam(selectedExamId, mode)}
                    >
                      <RotateCcw className="size-4" aria-hidden />
                      {m.retakeBtn}
                    </Button>
                    <Button type="button" onClick={() => setStage("lobby")}>
                      {m.backToLobbyBtn}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Headline Score Strip */}
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl bg-primary/10 p-5 text-center">
                    <p className="text-xs font-bold uppercase tracking-wide text-primary">
                      {report.examId === "toefl-ibt" ? m.toeflTotalLabel : m.ieltsOverallLabel}
                    </p>
                    <p className="mt-2 text-4xl font-black text-foreground" dir="ltr">
                      {report.examId === "toefl-ibt"
                        ? `${report.overallScore} / 120`
                        : `Band ${report.overallScore.toFixed(1)}`}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-muted/40 p-5 text-center">
                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      {m.cefrEquivalentLabel}
                    </p>
                    <p className="mt-2 text-3xl font-extrabold text-foreground" dir="ltr">
                      CEFR {report.cefrEquivalent}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-primary" dir="ltr">
                      {report.crossExamEquivalent}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-muted/40 p-5 text-center">
                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      {m.timeSpentLabel}
                    </p>
                    <p className="mt-2 font-mono text-3xl font-extrabold text-foreground" dir="ltr">
                      {formatClock(report.elapsedSeconds)}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {mode === "exam" ? m.modeExamLabel : m.modePracticeLabel}
                    </p>
                  </div>
                </div>

                {/* 4 Section Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {sectionOrder.map((secKey) => {
                    const sec = report.sections[secKey];
                    const { label, Icon } = sectionMeta[secKey];
                    const isToefl = report.examId === "toefl-ibt";
                    return (
                      <div
                        key={secKey}
                        className="rounded-2xl border border-border bg-background p-4 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground">
                            <Icon className="size-4 text-primary" aria-hidden />
                            {label}
                          </span>
                          <Badge variant="secondary" dir="ltr">
                            {isToefl ? `${sec.scaledScore}/30` : sec.scaledScore.toFixed(1)}
                          </Badge>
                        </div>
                        {sec.total !== undefined && (
                          <p className="text-xs text-muted-foreground" dir="ltr">
                            {sec.correct}/{sec.total} ({sec.accuracyPct}%)
                          </p>
                        )}
                        <p className="text-xs font-semibold text-primary">
                          {sec.levelLabel[locale]}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <p className="rounded-xl border border-amber-500/35 bg-amber-500/10 p-3.5 text-xs leading-relaxed text-foreground">
                  {m.experimentalDisclaimer}
                </p>
              </CardContent>
            </Card>

            {/* Full Answer Key & Model Responses Review */}
            <div className="space-y-6">
              <h2 className="display-heading text-2xl font-extrabold text-foreground">
                {m.answerReviewTitle}
              </h2>

              {/* Listening Review */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Headphones className="size-5 text-primary" aria-hidden />
                    {m.sectionListening}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {exam.listening.parts.map((part) => (
                    <div key={part.id} className="space-y-3">
                      <h3 className="text-base font-bold text-foreground">{part.title[locale]}</h3>
                      <div className="grid gap-3 md:grid-cols-2">
                        {part.questions.map((q) => (
                          <ObjectiveQuestionCard
                            key={q.id}
                            question={q}
                            answer={listeningAnswers[q.id]}
                            onChange={() => {}}
                            showReview
                            locale={locale}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Reading Review */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BookOpen className="size-5 text-primary" aria-hidden />
                    {m.sectionReading}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {exam.reading.passages.map((passage) => (
                    <div key={passage.id} className="space-y-3">
                      <h3 className="text-base font-bold text-foreground" dir="ltr">
                        {passage.title}
                      </h3>
                      <div className="grid gap-3 md:grid-cols-2">
                        {passage.questions.map((q) => (
                          <ObjectiveQuestionCard
                            key={q.id}
                            question={q}
                            answer={readingAnswers[q.id]}
                            onChange={() => {}}
                            showReview
                            locale={locale}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Writing Rubric & Model Answers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="size-5 text-primary" aria-hidden />
                    {m.sectionWriting} — {m.modelAnswersHeading}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {exam.writing.tasks.map((task) => {
                    const fb = report.writingFeedback[task.id];
                    return (
                      <div key={task.id} className="space-y-3 rounded-2xl border border-border p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-base font-bold text-foreground">
                            {task.label[locale]}: {task.title[locale]}
                          </h3>
                          {fb && (
                            <Badge variant="outline" dir="ltr">
                              {fb.wordCount}/{fb.targetWords} words · {fb.paragraphCount} paragraphs
                            </Badge>
                          )}
                        </div>

                        {fb && (fb.strengths.length > 0 || fb.improvements.length > 0) && (
                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-xl bg-emerald-500/10 p-3 text-xs space-y-1">
                              <p className="font-bold text-emerald-700 dark:text-emerald-400">
                                {m.strengthsLabel}
                              </p>
                              {fb.strengths.map((s, idx) => (
                                <p key={idx}>• {s[locale]}</p>
                              ))}
                            </div>
                            <div className="rounded-xl bg-amber-500/10 p-3 text-xs space-y-1">
                              <p className="font-bold text-amber-800 dark:text-amber-300">
                                {m.improvementsLabel}
                              </p>
                              {fb.improvements.map((imp, idx) => (
                                <p key={idx}>• {imp[locale]}</p>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                            {m.modelResponseLabel}
                          </p>
                          <p
                            className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground"
                            dir="ltr"
                          >
                            {task.modelAnswer}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Speaking Models */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Mic className="size-5 text-primary" aria-hidden />
                    {m.sectionSpeaking} — {m.modelAnswersHeading}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {exam.speaking.tasks.map((task) => (
                    <div key={task.id} className="rounded-2xl border border-border p-4 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-bold text-foreground">
                          {task.partLabel[locale]}: {task.title[locale]}
                        </h3>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => playSpeech(task.modelResponse, 0.94, "female")}
                        >
                          <Volume2 className="size-3.5" aria-hidden />
                          {m.playModelBtn}
                        </Button>
                      </div>
                      <p className="text-sm leading-relaxed text-foreground" dir="ltr">
                        {task.modelResponse}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
