import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Award,
  Bookmark,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  Headphones,
  Layers,
  PenTool,
  RotateCcw,
  Search,
  Sparkles,
  Square,
  Volume2,
  XCircle,
} from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  buildStepSimulationSet,
  STEP_CLIPS_BY_ID,
  STEP_PASSAGES_BY_ID,
  STEP_QUESTION_BANK,
  STEP_SECTIONS,
} from "@/content/step/step-index";
import type { StepDifficulty, StepQuestion, StepSectionId } from "@/content/step/step-types";
import { playDialogueSequence, stopSpeech } from "@/hooks/use-speech";
import { learningRecord } from "@/lib/learning-record";

interface StepProgressState {
  answers: Record<string, number>;
  bookmarks: string[];
}

const STEP_STORAGE_KEY = "ele.step.bank.progress";

function loadStepProgress(): StepProgressState {
  if (typeof window === "undefined") return { answers: {}, bookmarks: [] };
  try {
    const raw = window.localStorage.getItem(STEP_STORAGE_KEY);
    if (!raw) return { answers: {}, bookmarks: [] };
    const parsed = JSON.parse(raw) as Partial<StepProgressState>;
    return {
      answers: parsed.answers && typeof parsed.answers === "object" ? parsed.answers : {},
      bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
    };
  } catch {
    return { answers: {}, bookmarks: [] };
  }
}

function saveStepProgress(next: StepProgressState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STEP_STORAGE_KEY, JSON.stringify(next));
}

function formatClock(sec: number): string {
  const safe = Math.max(0, sec);
  const mins = Math.floor(safe / 60);
  const rem = safe % 60;
  return `${String(mins).padStart(2, "0")}:${String(rem).padStart(2, "0")}`;
}

export function StepQuestionBankStudio() {
  const { locale, dir } = useI18n();
  const isAr = locale === "ar";

  const [mode, setMode] = useState<"bank" | "exam">("bank");
  const [sectionFilter, setSectionFilter] = useState<StepSectionId | "all">("all");
  const [difficultyFilter, setDifficultyFilter] = useState<StepDifficulty | "all">("all");
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);
  const [progress, setProgress] = useState<StepProgressState>({ answers: {}, bookmarks: [] });

  // Listening clip playback
  const [playingClipId, setPlayingClipId] = useState<string | null>(null);
  const [activeTurnIdx, setActiveTurnIdx] = useState(-1);
  const stopAudioRef = useRef<(() => void) | null>(null);

  // Timed STEP Exam Simulation state
  const [examSize, setExamSize] = useState<40 | 100>(40);
  const [examQuestions, setExamQuestions] = useState<StepQuestion[]>([]);
  const [examAnswers, setExamAnswers] = useState<Record<string, number>>({});
  const [examSecondsLeft, setExamSecondsLeft] = useState(0);
  const [examSubmitted, setExamSubmitted] = useState(false);

  useEffect(() => {
    setProgress(loadStepProgress());
  }, []);

  const stopClipAudio = useCallback(() => {
    stopAudioRef.current?.();
    stopAudioRef.current = null;
    stopSpeech();
    setPlayingClipId(null);
    setActiveTurnIdx(-1);
  }, []);

  useEffect(() => () => stopClipAudio(), [stopClipAudio]);

  useEffect(() => {
    setVisibleCount(20);
  }, [sectionFilter, difficultyFilter, onlyBookmarked, search]);

  useEffect(() => {
    if (mode !== "exam" || examQuestions.length === 0 || examSubmitted) return;
    if (examSecondsLeft <= 0) {
      setExamSubmitted(true);
      return;
    }
    const id = window.setTimeout(() => setExamSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [mode, examQuestions.length, examSubmitted, examSecondsLeft]);

  const sectionCounts = useMemo(() => {
    const counts: Record<StepSectionId, number> = {
      reading: 0,
      structure: 0,
      listening: 0,
      compositional: 0,
    };
    for (const q of STEP_QUESTION_BANK) counts[q.section] += 1;
    return counts;
  }, []);

  const bankStats = useMemo(() => {
    let answered = 0;
    let correct = 0;
    for (const q of STEP_QUESTION_BANK) {
      const picked = progress.answers[q.id];
      if (picked !== undefined) {
        answered += 1;
        if (picked === q.correctIndex) correct += 1;
      }
    }
    return {
      answered,
      correct,
      accuracy: answered > 0 ? Math.round((correct / answered) * 100) : 0,
    };
  }, [progress.answers]);

  const filteredQuestions = useMemo(() => {
    const q = search.trim().toLowerCase();
    return STEP_QUESTION_BANK.filter((item) => {
      if (sectionFilter !== "all" && item.section !== sectionFilter) return false;
      if (difficultyFilter !== "all" && item.difficulty !== difficultyFilter) return false;
      if (onlyBookmarked && !progress.bookmarks.includes(item.id)) return false;
      if (!q) return true;
      const passage = item.passageId ? STEP_PASSAGES_BY_ID[item.passageId] : undefined;
      return (
        item.prompt.toLowerCase().includes(q) ||
        item.subtopic.toLowerCase().includes(q) ||
        item.options.some((o) => o.toLowerCase().includes(q)) ||
        (passage?.title.toLowerCase().includes(q) ?? false)
      );
    });
  }, [sectionFilter, difficultyFilter, onlyBookmarked, search, progress.bookmarks]);

  const visibleQuestions = useMemo(
    () => filteredQuestions.slice(0, visibleCount),
    [filteredQuestions, visibleCount],
  );

  function answerBankQuestion(question: StepQuestion, optionIdx: number) {
    const next: StepProgressState = {
      ...progress,
      answers: { ...progress.answers, [question.id]: optionIdx },
    };
    setProgress(next);
    saveStepProgress(next);
    learningRecord.logActivity({
      kind: "assessment",
      count: 1,
      minutes: 1,
      passed: optionIdx === question.correctIndex,
    });
  }

  function toggleBookmark(id: string) {
    const exists = progress.bookmarks.includes(id);
    const next: StepProgressState = {
      ...progress,
      bookmarks: exists ? progress.bookmarks.filter((b) => b !== id) : [...progress.bookmarks, id],
    };
    setProgress(next);
    saveStepProgress(next);
  }

  function playClip(clipId: string) {
    if (playingClipId === clipId) {
      stopClipAudio();
      return;
    }
    stopClipAudio();
    const clip = STEP_CLIPS_BY_ID[clipId];
    if (!clip) return;
    setPlayingClipId(clipId);
    stopAudioRef.current = playDialogueSequence(
      clip.turns.map((turn) => ({
        text: turn.text,
        role: turn.voice === "female" ? ("female-teacher" as const) : ("male-teacher" as const),
      })),
      {
        rate: 0.94,
        onTurnStart: (idx) => setActiveTurnIdx(idx),
        onComplete: () => {
          setPlayingClipId(null);
          setActiveTurnIdx(-1);
          stopAudioRef.current = null;
        },
      },
    );
  }

  function startTimedExam(size: 40 | 100) {
    stopClipAudio();
    const qs = buildStepSimulationSet(size);
    setExamSize(size);
    setExamQuestions(qs);
    setExamAnswers({});
    setExamSecondsLeft(size === 100 ? 165 * 60 : 65 * 60);
    setExamSubmitted(false);
    setMode("exam");
  }

  function submitTimedExam() {
    stopClipAudio();
    setExamSubmitted(true);
    const correctCount = examQuestions.filter((q) => examAnswers[q.id] === q.correctIndex).length;
    const scorePct = examQuestions.length
      ? Math.round((correctCount / examQuestions.length) * 100)
      : 0;
    learningRecord.logActivity({
      kind: "assessment",
      count: examQuestions.length,
      minutes: examSize === 100 ? 45 : 20,
      passed: scorePct >= 65,
    });
  }

  const examReport = useMemo(() => {
    if (!examSubmitted || examQuestions.length === 0) return null;
    const total = examQuestions.length;
    const correct = examQuestions.filter((q) => examAnswers[q.id] === q.correctIndex).length;
    const bySection: Record<StepSectionId, { correct: number; total: number }> = {
      reading: { correct: 0, total: 0 },
      structure: { correct: 0, total: 0 },
      listening: { correct: 0, total: 0 },
      compositional: { correct: 0, total: 0 },
    };
    for (const q of examQuestions) {
      bySection[q.section].total += 1;
      if (examAnswers[q.id] === q.correctIndex) bySection[q.section].correct += 1;
    }
    return {
      total,
      correct,
      score100: Math.round((correct / total) * 100),
      bySection,
    };
  }, [examSubmitted, examQuestions, examAnswers]);

  const sectionIcon = (sec: StepSectionId) => {
    if (sec === "reading") return BookOpen;
    if (sec === "structure") return Layers;
    if (sec === "listening") return Headphones;
    return PenTool;
  };

  const renderQuestionCard = (
    item: StepQuestion,
    indexLabel: number,
    picked: number | undefined,
    onPick: (idx: number) => void,
    revealAnswer: boolean,
  ) => {
    const passage = item.passageId ? STEP_PASSAGES_BY_ID[item.passageId] : undefined;
    const clip = item.clipId ? STEP_CLIPS_BY_ID[item.clipId] : undefined;
    const isCorrect = picked !== undefined && picked === item.correctIndex;
    const isBookmarked = progress.bookmarks.includes(item.id);
    const sectionMeta = STEP_SECTIONS.find((s) => s.id === item.section);

    return (
      <Card
        key={item.id}
        className={`border transition-colors ${
          revealAnswer && picked !== undefined
            ? isCorrect
              ? "border-emerald-500/50 bg-emerald-500/5"
              : "border-destructive/40 bg-destructive/5"
            : "border-border"
        }`}
      >
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant="secondary" className="font-mono text-xs" dir="ltr">
                #{indexLabel}
              </Badge>
              <Badge variant="default" className="text-xs">
                {sectionMeta?.label[locale]}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {item.subtopic}
              </Badge>
              <Badge variant="outline" className="text-[11px] capitalize">
                {item.difficulty}
              </Badge>
            </div>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="size-8"
              onClick={() => toggleBookmark(item.id)}
              aria-label={isAr ? "حفظ السؤال للمراجعة" : "Bookmark question"}
            >
              <Bookmark
                className={`size-4 ${isBookmarked ? "fill-amber-400 text-amber-500" : "text-muted-foreground"}`}
                aria-hidden
              />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Reading Passage Box (collapsible/readable) */}
          {passage && (
            <details className="rounded-xl border border-primary/25 bg-muted/40 p-3.5" open>
              <summary className="cursor-pointer text-xs font-extrabold text-primary">
                <FileText className="me-1.5 inline size-3.5" aria-hidden />
                {isAr ? "نص القراءة:" : "Reading Passage:"} <span dir="ltr">{passage.title}</span>
              </summary>
              <div
                className="mt-2.5 space-y-2 text-xs leading-relaxed text-foreground md:text-sm"
                dir="ltr"
              >
                {passage.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </details>
          )}

          {/* Listening Audio Player */}
          {clip && (
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-3.5 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-extrabold text-primary">
                    <Headphones className="me-1.5 inline size-3.5" aria-hidden />
                    {clip.title[locale]}
                  </p>
                  <p className="text-[11px] text-muted-foreground capitalize">{clip.speakerMode}</p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant={playingClipId === clip.id ? "destructive" : "default"}
                  onClick={() => playClip(clip.id)}
                >
                  {playingClipId === clip.id ? (
                    <>
                      <Square className="size-3.5 fill-current" aria-hidden />
                      {isAr ? "إيقاف" : "Stop"}
                    </>
                  ) : (
                    <>
                      <Volume2 className="size-3.5" aria-hidden />
                      {isAr ? "تشغيل التسجيل الصوتي" : "Play Audio Recording"}
                    </>
                  )}
                </Button>
              </div>
              {playingClipId === clip.id && activeTurnIdx >= 0 && (
                <Progress
                  value={((activeTurnIdx + 1) / clip.turns.length) * 100}
                  className="h-1.5"
                />
              )}
              {revealAnswer && (
                <details className="rounded-lg bg-card p-2.5 text-xs">
                  <summary className="cursor-pointer font-bold text-primary">
                    {isAr ? "عرض نص التسجيل الصوتي للمراجعة" : "Show Audio Script for Review"}
                  </summary>
                  <div className="mt-2 space-y-1.5" dir="ltr">
                    {clip.turns.map((turn, tIdx) => (
                      <p key={tIdx}>
                        <strong className="text-primary">{turn.speaker}:</strong> {turn.text}
                      </p>
                    ))}
                  </div>
                </details>
              )}
            </div>
          )}

          {/* Question Prompt */}
          <p className="text-base font-bold leading-relaxed text-foreground" dir="ltr" lang="en">
            {item.prompt}
          </p>

          {/* 4 Answer Options */}
          <div className="grid gap-2 sm:grid-cols-2" role="radiogroup">
            {item.options.map((opt, idx) => {
              const isSelected = picked === idx;
              const isKey = idx === item.correctIndex;
              let cls = "border-border bg-background hover:bg-muted/60";
              if (revealAnswer && isKey) {
                cls = "border-emerald-500 bg-emerald-500/15 text-emerald-950 dark:text-emerald-100";
              } else if (revealAnswer && isSelected && !isKey) {
                cls = "border-destructive bg-destructive/10 text-destructive";
              } else if (isSelected) {
                cls = "border-primary bg-primary/10 text-foreground";
              }

              return (
                <button
                  key={`${item.id}-opt-${idx}`}
                  type="button"
                  onClick={() => onPick(idx)}
                  dir="ltr"
                  className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-2.5 text-start text-sm font-medium transition-colors ${cls}`}
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-current text-[11px] font-bold">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-snug">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Instant Answer Key & Bilingual Explanation */}
          {revealAnswer && (
            <div className="rounded-xl border border-border bg-card p-3.5 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-extrabold">
                {isCorrect ? (
                  <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="size-4" aria-hidden />
                    {isAr ? "إجابة صحيحة!" : "Correct!"}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-destructive">
                    <XCircle className="size-4" aria-hidden />
                    {isAr
                      ? `الإجابة الصحيحة: ${String.fromCharCode(65 + item.correctIndex)}`
                      : `Correct Answer: ${String.fromCharCode(65 + item.correctIndex)}`}
                  </span>
                )}
              </div>
              <p className="leading-relaxed text-foreground">{item.explanation[locale]}</p>
              {locale === "ar" && (
                <p className="text-[11px] text-muted-foreground" dir="ltr">
                  {item.explanation.en}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div dir={dir} className="pb-20">
      {/* Hero Banner */}
      <header className="border-b border-border bg-inverse text-inverse-foreground">
        <div className="container-page py-10 md:py-14">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-accent text-accent-foreground">
              {isAr ? "بنك أسئلة قياس STEP الشامل" : "Comprehensive Qiyas STEP Question Bank"}
            </Badge>
            <Badge
              variant="outline"
              className="border-inverse-foreground/30 text-inverse-foreground"
              dir="ltr"
            >
              {STEP_QUESTION_BANK.length} {isAr ? "سؤالًا أصيلًا" : "Authentic Questions"}
            </Badge>
          </div>
          <h1 className="display-heading mt-3 max-w-4xl text-3xl font-extrabold md:text-5xl">
            {isAr
              ? "تجميعات STEP — البنك التفاعلي الكامل"
              : "تجميعات STEP · Complete STEP Question Bank"}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-inverse-muted md:text-lg">
            {isAr
              ? `أكثر من ${STEP_QUESTION_BANK.length} سؤالًا أصيلًا ومحلولًا تغطي جميع أقسام اختبار كفايات اللغة الإنجليزية STEP (فهم المقروء، التراكيب النحوية، الاستماع، والتحليل الكتابي) مع شرح ثنائي اللغة ومحاكي اختبار مؤقّت.`
              : `Over ${STEP_QUESTION_BANK.length} authentic, fully explained STEP questions covering Reading Comprehension (40%), Structure/Grammar (30%), Listening Comprehension (20%), and Compositional Analysis (10%), with instant bilingual explanations and a timed STEP exam simulator.`}
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <Button
              type="button"
              variant={mode === "bank" ? "accent" : "outline"}
              className={
                mode === "bank"
                  ? "rounded-full"
                  : "rounded-full border-inverse-foreground/30 bg-transparent text-inverse-foreground hover:bg-inverse-foreground/10"
              }
              onClick={() => {
                stopClipAudio();
                setMode("bank");
              }}
            >
              <Sparkles className="size-4" aria-hidden />
              {isAr
                ? `بنك التجميعات التفاعلي (${STEP_QUESTION_BANK.length})`
                : `Interactive Bank (${STEP_QUESTION_BANK.length})`}
            </Button>
            <Button
              type="button"
              variant={mode === "exam" && examSize === 40 ? "accent" : "outline"}
              className={
                mode === "exam" && examSize === 40
                  ? "rounded-full"
                  : "rounded-full border-inverse-foreground/30 bg-transparent text-inverse-foreground hover:bg-inverse-foreground/10"
              }
              onClick={() => startTimedExam(40)}
            >
              <Clock className="size-4" aria-hidden />
              {isAr ? "محاكاة سريعة (٤٠ سؤالًا · ٦٥ دقيقة)" : "Quick STEP Mock (40 Qs · 65m)"}
            </Button>
            <Button
              type="button"
              variant={mode === "exam" && examSize === 100 ? "accent" : "outline"}
              className={
                mode === "exam" && examSize === 100
                  ? "rounded-full"
                  : "rounded-full border-inverse-foreground/30 bg-transparent text-inverse-foreground hover:bg-inverse-foreground/10"
              }
              onClick={() => startTimedExam(100)}
            >
              <Award className="size-4" aria-hidden />
              {isAr ? "اختبار STEP كامل (١٠٠ سؤال · ١٦٥ دقيقة)" : "Full STEP Exam (100 Qs · 165m)"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container-page mt-8 space-y-6">
        {/* ================= MODE 1: INTERACTIVE 560+ QUESTION BANK ================= */}
        {mode === "bank" && (
          <>
            {/* 4 Official STEP Section Overview Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STEP_SECTIONS.map((sec) => {
                const Icon = sectionIcon(sec.id);
                const active = sectionFilter === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setSectionFilter(active ? "all" : sec.id)}
                    className={`flex flex-col rounded-2xl border-2 p-4 text-start transition-all ${
                      active
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <Badge variant="secondary" dir="ltr">
                        {sectionCounts[sec.id]} Qs · {sec.weightLabel}
                      </Badge>
                    </div>
                    <h2 className="mt-3 text-base font-extrabold text-foreground">
                      {sec.label[locale]}
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {sec.description[locale]}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Learner Progress + Search & Filters Bar */}
            <Card>
              <CardContent className="space-y-4 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="relative min-w-[240px] flex-1">
                    <Search
                      className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden
                    />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={
                        isAr
                          ? "ابحث في الأسئلة أو القواعد أو عناوين النصوص..."
                          : "Search questions, grammar subtopics, or passage titles..."
                      }
                      className="ps-9"
                      aria-label={isAr ? "بحث في تجميعات STEP" : "Search STEP bank"}
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                    <Badge variant="outline" dir="ltr">
                      {isAr ? "المُجاب:" : "Answered:"} {bankStats.answered}/
                      {STEP_QUESTION_BANK.length}
                    </Badge>
                    <Badge className="bg-emerald-600 text-white" dir="ltr">
                      {isAr ? "الدقة:" : "Accuracy:"} {bankStats.accuracy}%
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    <Button
                      type="button"
                      size="sm"
                      variant={sectionFilter === "all" ? "default" : "outline"}
                      className="rounded-full text-xs"
                      onClick={() => setSectionFilter("all")}
                    >
                      {isAr
                        ? `جميع الأقسام (${STEP_QUESTION_BANK.length})`
                        : `All Sections (${STEP_QUESTION_BANK.length})`}
                    </Button>
                    {(["easy", "medium", "hard"] as StepDifficulty[]).map((diff) => (
                      <Button
                        key={diff}
                        type="button"
                        size="sm"
                        variant={difficultyFilter === diff ? "secondary" : "ghost"}
                        className="rounded-full text-xs capitalize"
                        onClick={() =>
                          setDifficultyFilter(difficultyFilter === diff ? "all" : diff)
                        }
                      >
                        {diff}
                      </Button>
                    ))}
                    <Button
                      type="button"
                      size="sm"
                      variant={onlyBookmarked ? "secondary" : "ghost"}
                      className="rounded-full text-xs"
                      onClick={() => setOnlyBookmarked((b) => !b)}
                    >
                      <Bookmark className="me-1 size-3.5" aria-hidden />
                      {isAr
                        ? `المحفوظة (${progress.bookmarks.length})`
                        : `Bookmarked (${progress.bookmarks.length})`}
                    </Button>
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground" dir="ltr">
                    {visibleQuestions.length} / {filteredQuestions.length}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Questions List with Pagination */}
            <div className="space-y-4">
              {visibleQuestions.map((item, idx) =>
                renderQuestionCard(
                  item,
                  idx + 1,
                  progress.answers[item.id],
                  (optIdx) => answerBankQuestion(item, optIdx),
                  progress.answers[item.id] !== undefined,
                ),
              )}
            </div>

            {visibleQuestions.length < filteredQuestions.length && (
              <div className="flex justify-center pt-2">
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  onClick={() => setVisibleCount((c) => c + 20)}
                >
                  {isAr
                    ? `عرض ٢٠ سؤالًا إضافيًا (${filteredQuestions.length - visibleQuestions.length} متبقٍ)`
                    : `Load 20 more questions (${filteredQuestions.length - visibleQuestions.length} remaining)`}
                </Button>
              </div>
            )}
          </>
        )}

        {/* ================= MODE 2: TIMED STEP EXAM SIMULATION ================= */}
        {mode === "exam" && (
          <div className="space-y-6">
            <div className="sticky top-18 z-30 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-primary/35 bg-card/95 p-4 shadow-md backdrop-blur-md">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-primary text-primary-foreground">
                  {isAr ? `محاكاة STEP (${examSize} سؤالًا)` : `STEP Simulation (${examSize} Qs)`}
                </Badge>
                <span className="text-xs font-semibold text-muted-foreground" dir="ltr">
                  {Object.keys(examAnswers).length} / {examQuestions.length}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 font-mono text-sm font-bold"
                  dir="ltr"
                >
                  <Clock className="size-4 text-primary" aria-hidden />
                  {formatClock(examSecondsLeft)}
                </span>
                {!examSubmitted ? (
                  <Button type="button" size="sm" variant="accent" onClick={submitTimedExam}>
                    <CheckCircle2 className="size-4" aria-hidden />
                    {isAr ? "تسليم وتصحيح الاختبار" : "Submit & Score STEP Exam"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => startTimedExam(examSize)}
                  >
                    <RotateCcw className="size-4" aria-hidden />
                    {isAr ? "إعادة المحاكاة" : "Retake Simulation"}
                  </Button>
                )}
              </div>
            </div>

            {examReport && (
              <Card className="border-2 border-emerald-500/45 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-2xl font-extrabold">
                    {isAr ? "نتيجة اختبار STEP التجريبي" : "STEP Simulation Score Report"}
                  </CardTitle>
                  <CardDescription>
                    {isAr
                      ? `درجتك التقديرية من ١٠٠: ${examReport.score100}/100 (${examReport.correct} إجابة صحيحة من ${examReport.total})`
                      : `Estimated STEP Score: ${examReport.score100}/100 (${examReport.correct} correct out of ${examReport.total})`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {STEP_SECTIONS.map((sec) => {
                    const st = examReport.bySection[sec.id];
                    const pct = st.total > 0 ? Math.round((st.correct / st.total) * 100) : 0;
                    return (
                      <div key={sec.id} className="rounded-xl border border-border bg-card p-3.5">
                        <p className="text-xs font-bold text-foreground">{sec.label[locale]}</p>
                        <p className="mt-1 text-xl font-black text-primary" dir="ltr">
                          {st.correct}/{st.total} ({pct}%)
                        </p>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {examQuestions.map((item, idx) =>
                renderQuestionCard(
                  item,
                  idx + 1,
                  examAnswers[item.id],
                  (optIdx) => {
                    if (examSubmitted) return;
                    setExamAnswers((prev) => ({ ...prev, [item.id]: optIdx }));
                  },
                  examSubmitted,
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
