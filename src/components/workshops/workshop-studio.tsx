import { useEffect, useMemo, useState } from "react";
import {
  Award,
  CheckCircle2,
  History,
  Mic,
  MicOff,
  Play,
  Presentation,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Volume2,
} from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  getWorkshopRole,
  getWorkshopScenario,
  WORKSHOP_ROLES,
  WORKSHOP_SCENARIOS,
} from "@/content/workshops/scenarios";
import {
  CEFR_WORKSHOP_PROFILES,
  type WorkshopCefrLevel,
  type WorkshopEvaluationReport,
  type WorkshopRoleId,
  type WorkshopSessionRecord,
  type WorkshopTurn,
} from "@/content/workshops/workshop-types";
import { playSpeech, useSpeech } from "@/hooks/use-speech";
import { format } from "@/lib/i18n/messages";
import { learnerStorage } from "@/lib/learner-storage";
import { evaluateWorkshopSession, workshopReplyTurn } from "@/lib/workshop-ai.functions";
import { evaluateWorkshopLocal, generateWorkshopReplyLocal } from "@/lib/workshop-fallback";

type StudioView = "setup" | "live" | "history";
const LEVELS: WorkshopCefrLevel[] = ["A2", "B1", "B2", "C1", "C2"];

export function WorkshopStudio({ initialScenarioId }: { initialScenarioId?: string }) {
  const { t, locale } = useI18n();
  const initialScenario =
    (initialScenarioId ? getWorkshopScenario(initialScenarioId) : undefined) ??
    WORKSHOP_SCENARIOS[0]!;

  const [view, setView] = useState<StudioView>("setup");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "core" | "industry">("all");
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(initialScenario.id);
  const [selectedRoleId, setSelectedRoleId] = useState<WorkshopRoleId>(initialScenario.defaultRole);
  const [level, setLevel] = useState<WorkshopCefrLevel>("B2");
  const [autoSpeak, setAutoSpeak] = useState(false);

  // Live session state
  const [turns, setTurns] = useState<WorkshopTurn[]>([]);
  const [draft, setDraft] = useState("");
  const [usedVoiceInTurn, setUsedVoiceInTurn] = useState(false);
  const [sending, setSending] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [stageCompleteHint, setStageCompleteHint] = useState(false);
  const [report, setReport] = useState<WorkshopEvaluationReport | null>(null);
  const [history, setHistory] = useState<WorkshopSessionRecord[]>([]);
  const [replayingSession, setReplayingSession] = useState<WorkshopSessionRecord | null>(null);

  useEffect(() => {
    setHistory(learnerStorage.getWorkshops());
  }, []);

  const speech = useSpeech((transcript) => {
    setUsedVoiceInTurn(true);
    setDraft((prev) => (prev.trim() ? `${prev.trim()} ${transcript}` : transcript));
  });

  const scenario = getWorkshopScenario(selectedScenarioId) ?? WORKSHOP_SCENARIOS[0]!;
  const role = getWorkshopRole(selectedRoleId);
  const profile = CEFR_WORKSHOP_PROFILES[level];

  const visibleScenarios = useMemo(() => {
    if (categoryFilter === "all") return WORKSHOP_SCENARIOS;
    return WORKSHOP_SCENARIOS.filter((s) => s.category === categoryFilter);
  }, [categoryFilter]);

  const learnerTurnsCount = turns.filter((turn) => turn.speaker === "learner").length;

  function selectScenario(id: string) {
    const found = getWorkshopScenario(id);
    if (!found) return;
    setSelectedScenarioId(found.id);
    setSelectedRoleId(found.defaultRole);
  }

  function launchWorkshop(overrideScenarioId?: string) {
    const targetScenario =
      (overrideScenarioId ? getWorkshopScenario(overrideScenarioId) : undefined) ?? scenario;
    const targetRoleId = overrideScenarioId ? targetScenario.defaultRole : selectedRoleId;
    const targetRole = getWorkshopRole(targetRoleId);

    setSelectedScenarioId(targetScenario.id);
    setSelectedRoleId(targetRoleId);
    setReport(null);
    setReplayingSession(null);
    setDraft("");
    setUsedVoiceInTurn(false);
    setStageCompleteHint(false);

    const openingTurn: WorkshopTurn = {
      speaker: "ai",
      text: targetScenario.openingPrompt,
      timestamp: new Date().toISOString(),
    };
    setTurns([openingTurn]);
    setView("live");

    if (autoSpeak) {
      playSpeech(targetScenario.openingPrompt, 0.93, targetRole.voice);
    }
  }

  async function handleSendTurn() {
    const text = draft.trim();
    if (!text || sending) return;

    const learnerTurn: WorkshopTurn = {
      speaker: "learner",
      text,
      usedVoice: usedVoiceInTurn,
      timestamp: new Date().toISOString(),
    };
    const nextTurns = [...turns, learnerTurn];
    setTurns(nextTurns);
    setDraft("");
    setUsedVoiceInTurn(false);
    setSending(true);

    try {
      const res = await workshopReplyTurn({
        data: {
          scenarioId: scenario.id,
          roleId: selectedRoleId,
          level,
          turns: nextTurns,
        },
      });
      const aiTurn: WorkshopTurn = {
        speaker: "ai",
        text: res.reply,
        timestamp: new Date().toISOString(),
      };
      setTurns([...nextTurns, aiTurn]);
      setStageCompleteHint(res.stageCompleteHint);
      if (autoSpeak) playSpeech(res.reply, 0.93, role.voice);
    } catch {
      const local = generateWorkshopReplyLocal({
        scenarioId: scenario.id,
        roleId: selectedRoleId,
        level,
        turns: nextTurns,
      });
      const aiTurn: WorkshopTurn = {
        speaker: "ai",
        text: local.reply,
        timestamp: new Date().toISOString(),
      };
      setTurns([...nextTurns, aiTurn]);
      setStageCompleteHint(local.stageCompleteHint);
      if (autoSpeak) playSpeech(local.reply, 0.93, role.voice);
    } finally {
      setSending(false);
    }
  }

  async function handleEvaluateSession() {
    if (learnerTurnsCount < 2 || evaluating) return;
    setEvaluating(true);
    let finalEval: WorkshopEvaluationReport;
    try {
      const res = await evaluateWorkshopSession({
        data: {
          scenarioId: scenario.id,
          roleId: selectedRoleId,
          level,
          turns,
        },
      });
      finalEval = res.evaluation;
    } catch {
      finalEval = evaluateWorkshopLocal({
        scenarioId: scenario.id,
        roleId: selectedRoleId,
        level,
        turns,
      });
    } finally {
      setEvaluating(false);
    }

    setReport(finalEval);
    const savedRecord: WorkshopSessionRecord = {
      id: `ws-${Date.now()}`,
      scenarioId: scenario.id,
      roleId: selectedRoleId,
      level,
      turns,
      evaluation: finalEval,
      completedAt: new Date().toISOString(),
    };
    setHistory(learnerStorage.saveWorkshopSession(savedRecord));
  }

  const historyStats = useMemo(() => {
    if (history.length === 0) return { avgLing: 0, avgBiz: 0 };
    const avgLing = Math.round(
      history.reduce((sum, s) => sum + s.evaluation.linguisticScore, 0) / history.length,
    );
    const avgBiz = Math.round(
      history.reduce((sum, s) => sum + s.evaluation.businessDecisionScore, 0) / history.length,
    );
    return { avgLing, avgBiz };
  }, [history]);

  return (
    <div className="pb-16">
      {/* Hero */}
      <header className="border-b border-border bg-inverse text-inverse-foreground">
        <div className="container-page py-10 md:py-14">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-accent text-accent-foreground">{t.workshops.eyebrow}</Badge>
            <Badge
              variant="outline"
              className="border-inverse-foreground/25 text-inverse-foreground"
            >
              {t.workshops.sessionsDone}: {history.length}
            </Badge>
          </div>
          <h1 className="display-heading mt-3 max-w-4xl text-3xl md:text-5xl">
            {t.workshops.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-inverse-muted md:text-lg">
            {t.workshops.subtitle}
          </p>

          <div
            className="mt-6 flex flex-wrap gap-2.5"
            role="tablist"
            aria-label={t.workshops.title}
          >
            <Button
              role="tab"
              aria-selected={view === "setup"}
              variant={view === "setup" ? "accent" : "outline"}
              className={
                view === "setup"
                  ? "rounded-full"
                  : "rounded-full border-inverse-foreground/25 bg-transparent text-inverse-foreground hover:bg-inverse-foreground/10"
              }
              onClick={() => setView("setup")}
            >
              <Presentation className="size-4" aria-hidden />
              {t.workshops.tabSetup}
            </Button>
            <Button
              role="tab"
              aria-selected={view === "live"}
              variant={view === "live" ? "accent" : "outline"}
              disabled={turns.length === 0}
              className={
                view === "live"
                  ? "rounded-full"
                  : "rounded-full border-inverse-foreground/25 bg-transparent text-inverse-foreground hover:bg-inverse-foreground/10"
              }
              onClick={() => setView("live")}
            >
              <Sparkles className="size-4" aria-hidden />
              {t.workshops.tabLive}
            </Button>
            <Button
              role="tab"
              aria-selected={view === "history"}
              variant={view === "history" ? "accent" : "outline"}
              className={
                view === "history"
                  ? "rounded-full"
                  : "rounded-full border-inverse-foreground/25 bg-transparent text-inverse-foreground hover:bg-inverse-foreground/10"
              }
              onClick={() => setView("history")}
            >
              <History className="size-4" aria-hidden />
              {t.workshops.tabHistory} ({history.length})
            </Button>
          </div>
        </div>
      </header>

      <div className="container-page mt-8">
        {/* VIEW 1: SCENARIO BROWSER & ROLE/DIFFICULTY SETUP */}
        {view === "setup" && (
          <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
            {/* Left: 14 Scenarios */}
            <section className="space-y-4">
              <div className="flex flex-wrap gap-2" role="group">
                {(
                  [
                    { id: "all", label: t.workshops.filterAll },
                    { id: "core", label: t.workshops.filterCore },
                    { id: "industry", label: t.workshops.filterIndustry },
                  ] as const
                ).map((f) => (
                  <Button
                    key={f.id}
                    size="sm"
                    variant={categoryFilter === f.id ? "default" : "outline"}
                    className="rounded-full text-xs"
                    onClick={() => setCategoryFilter(f.id)}
                  >
                    {f.label}
                  </Button>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {visibleScenarios.map((sc) => {
                  const selected = sc.id === scenario.id;
                  return (
                    <button
                      key={sc.id}
                      type="button"
                      onClick={() => selectScenario(sc.id)}
                      className={`flex flex-col items-start rounded-2xl border p-4 text-start transition-all ${
                        selected
                          ? "border-primary bg-primary/8 ring-2 ring-primary/25"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      <Badge
                        variant={sc.category === "core" ? "secondary" : "outline"}
                        className="text-[11px]"
                      >
                        {sc.category === "core" ? "Core" : "Industry"}
                      </Badge>
                      <h2 className="mt-2 text-sm font-bold text-foreground">{sc.title[locale]}</h2>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {sc.summary[locale]}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Right: Configuration & Mission Briefing */}
            <aside className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm self-start">
              <div>
                <Badge className="bg-primary text-primary-foreground">
                  {t.workshops.yourRoleLabel}: {scenario.learnerRole[locale]}
                </Badge>
                <h2 className="mt-2 text-2xl font-bold text-foreground">
                  {scenario.title[locale]}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {scenario.summary[locale]}
                </p>
              </div>

              {/* Mission Objectives */}
              <div className="rounded-xl bg-secondary/50 p-4">
                <p className="text-xs font-bold uppercase text-primary">
                  {t.workshops.missionObjectivesLabel}
                </p>
                <ul className="mt-2 space-y-1.5 text-xs text-foreground">
                  {scenario.objectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Target className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
                      <span>{obj[locale]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Adaptive CEFR Difficulty (A2–C2) */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  {t.workshops.chooseLevelLabel}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {LEVELS.map((lvl) => (
                    <Button
                      key={lvl}
                      size="sm"
                      variant={level === lvl ? "default" : "outline"}
                      className="rounded-full text-xs"
                      onClick={() => setLevel(lvl)}
                    >
                      {lvl}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{profile.label[locale]}:</span>{" "}
                  {profile.difficultyNote[locale]}
                </p>
              </div>

              {/* 12 AI Professional Roles */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  {t.workshops.chooseRoleLabel}
                </p>
                <div className="grid max-h-56 grid-cols-2 gap-1.5 overflow-y-auto pe-1">
                  {WORKSHOP_ROLES.map((r) => {
                    const isRec = scenario.recommendedRoles.includes(r.id);
                    const isSelected = selectedRoleId === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setSelectedRoleId(r.id)}
                        className={`rounded-xl border p-2.5 text-start text-xs transition-colors ${
                          isSelected
                            ? "border-primary bg-primary/10 font-bold text-foreground"
                            : "border-border bg-background hover:bg-muted/60"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="truncate">
                            {r.voice === "female" ? "👩" : "👨"} {r.label[locale]}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                          {r.personaName}
                          {isRec ? ` · ${t.workshops.recommendedRoleTag}` : ""}
                        </p>
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground">{role.styleNote[locale]}</p>
              </div>

              {/* Target Expressions */}
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  {t.workshops.targetExprLabel}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5" dir="ltr">
                  {scenario.targetExpressions.map((expr) => (
                    <Badge key={expr} variant="outline" className="text-xs">
                      {expr}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button size="lg" className="w-full" onClick={() => launchWorkshop()}>
                <Play className="size-4" aria-hidden />
                {t.workshops.startWorkshopBtn}
              </Button>
            </aside>
          </div>
        )}

        {/* VIEW 2: LIVE INTERACTIVE ROLE-PLAY & EVALUATION REPORT */}
        {view === "live" && (
          <div className="space-y-6">
            {/* Active Simulation Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-primary text-primary-foreground" dir="ltr">
                  {level}
                </Badge>
                <span className="text-sm font-bold text-foreground">{scenario.title[locale]}</span>
                <span className="text-xs text-muted-foreground">
                  · {role.personaName} ({role.label[locale]})
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={autoSpeak}
                    onChange={(e) => setAutoSpeak(e.target.checked)}
                    className="rounded border-border"
                  />
                  {t.workshops.voiceAutoLabel}
                </label>
                <Badge variant="secondary">
                  {format(t.workshops.turnCounter, {
                    current: learnerTurnsCount,
                    target: profile.targetTurns,
                  })}
                </Badge>
              </div>
            </div>

            {/* Live Chat Transcript */}
            <section className="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="space-y-3" dir="ltr">
                {turns.map((turn, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl border p-4 ${
                      turn.speaker === "ai"
                        ? "border-primary/25 bg-secondary/40"
                        : "ms-auto max-w-3xl border-emerald-500/30 bg-emerald-500/5"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-primary">
                        {turn.speaker === "ai"
                          ? `${role.voice === "female" ? "👩" : "👨"} ${role.personaName} (${role.label.en})`
                          : `💼 You (${scenario.learnerRole.en})`}
                      </span>
                      {turn.speaker === "ai" && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-7"
                          onClick={() => playSpeech(turn.text, 0.93, role.voice)}
                          aria-label={t.workshops.listenTurn}
                        >
                          <Volume2 className="size-3.5" aria-hidden />
                        </Button>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground">{turn.text}</p>
                  </div>
                ))}
                {sending && (
                  <p className="text-xs italic text-muted-foreground">{t.workshops.aiThinking}</p>
                )}
              </div>

              {/* Response Composer (hidden once evaluated) */}
              {!report && (
                <div className="space-y-3 border-t border-border pt-4">
                  {stageCompleteHint && (
                    <p className="rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-3.5 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-200">
                      ✨ {t.workshops.readyToWrapHint}
                    </p>
                  )}

                  <Textarea
                    rows={3}
                    dir="ltr"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={t.workshops.replyPlaceholder}
                    aria-label={t.workshops.replyPlaceholder}
                  />

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Button disabled={sending || !draft.trim()} onClick={handleSendTurn}>
                        <Send className="size-4" aria-hidden />
                        {t.workshops.sendReplyBtn}
                      </Button>
                      {speech.supported && (
                        <Button
                          type="button"
                          variant={speech.listening ? "destructive" : "outline"}
                          onClick={() => (speech.listening ? speech.stop() : speech.start())}
                        >
                          {speech.listening ? (
                            <MicOff className="size-4" aria-hidden />
                          ) : (
                            <Mic className="size-4" aria-hidden />
                          )}
                          {speech.listening ? t.learning.stop : t.learning.record}
                        </Button>
                      )}
                    </div>

                    <Button
                      variant="accent"
                      disabled={learnerTurnsCount < 2 || evaluating || sending}
                      onClick={handleEvaluateSession}
                    >
                      <Award className="size-4" aria-hidden />
                      {evaluating ? t.workshops.evaluatingBtn : t.workshops.endAndEvaluateBtn}
                    </Button>
                  </div>

                  {learnerTurnsCount < 2 && (
                    <p className="text-xs text-muted-foreground">{t.workshops.minTurnsHint}</p>
                  )}
                </div>
              )}
            </section>

            {/* Dual-Axis 10-Criterion Evaluation Report */}
            {report && (
              <DualAxisReportView
                report={report}
                onLaunchNext={(nextId) => launchWorkshop(nextId)}
                onChooseAnother={() => setView("setup")}
              />
            )}
          </div>
        )}

        {/* VIEW 3: SAVED REPLAYS & LONGITUDINAL SCORE COMPARISON */}
        {view === "history" && (
          <div className="space-y-6">
            {history.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                <History className="mx-auto size-12 text-muted-foreground" aria-hidden />
                <h2 className="mt-3 text-xl font-bold text-foreground">
                  {t.workshops.historyEmptyTitle}
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  {t.workshops.historyEmptyBody}
                </p>
                <Button className="mt-5" onClick={() => setView("setup")}>
                  {t.workshops.tabSetup}
                </Button>
              </div>
            ) : (
              <>
                {/* Performance Comparison Summary */}
                <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
                    <TrendingUp className="size-5 text-primary" aria-hidden />
                    {t.workshops.trendSummaryTitle}
                  </h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl bg-secondary/50 p-4">
                      <p className="text-xs text-muted-foreground">{t.workshops.sessionsDone}</p>
                      <p className="mt-1 text-2xl font-extrabold text-foreground">
                        {history.length}
                      </p>
                    </div>
                    <div className="rounded-xl border border-primary/25 bg-primary/5 p-4">
                      <p className="text-xs text-muted-foreground">{t.workshops.avgLinguistic}</p>
                      <p className="mt-1 text-2xl font-extrabold text-primary">
                        {historyStats.avgLing}%
                      </p>
                    </div>
                    <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4">
                      <p className="text-xs text-muted-foreground">{t.workshops.avgDecision}</p>
                      <p className="mt-1 text-2xl font-extrabold text-emerald-700 dark:text-emerald-300">
                        {historyStats.avgBiz}%
                      </p>
                    </div>
                  </div>
                </section>

                {/* Saved Sessions List */}
                <div className="grid gap-4 md:grid-cols-2">
                  {history.map((session) => {
                    const sc = getWorkshopScenario(session.scenarioId);
                    const r = getWorkshopRole(session.roleId);
                    return (
                      <article
                        key={session.id}
                        className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm"
                      >
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5">
                              <Badge dir="ltr">{session.level}</Badge>
                              <Badge variant="outline" className="text-xs">
                                {session.evaluation.usedVoice
                                  ? t.workshops.voiceUsedBadge
                                  : t.workshops.textOnlyBadge}
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground" dir="ltr">
                              {session.completedAt.slice(0, 10)}
                            </span>
                          </div>
                          <h3 className="mt-2 text-base font-bold text-foreground">
                            {sc?.title[locale] ?? session.scenarioId}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {r.personaName} · {r.label[locale]}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-3 text-xs font-bold">
                            <span className="text-primary">
                              {t.workshops.avgLinguistic}: {session.evaluation.linguisticScore}%
                            </span>
                            <span className="text-emerald-700 dark:text-emerald-300">
                              {t.workshops.avgDecision}: {session.evaluation.businessDecisionScore}%
                            </span>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-4 self-start"
                          onClick={() => setReplayingSession(session)}
                        >
                          {t.workshops.replaySessionBtn}
                        </Button>
                      </article>
                    );
                  })}
                </div>

                {/* Selected Replay Drawer / Panel */}
                {replayingSession && (
                  <section className="space-y-5 rounded-2xl border border-primary/30 bg-card p-6 shadow-md">
                    <h3 className="text-xl font-bold text-foreground">
                      {getWorkshopScenario(replayingSession.scenarioId)?.title[locale]} ·{" "}
                      {replayingSession.level}
                    </h3>
                    <div className="space-y-2.5" dir="ltr">
                      {replayingSession.turns.map((turn, idx) => (
                        <div
                          key={idx}
                          className={`rounded-xl p-3 text-sm ${
                            turn.speaker === "ai" ? "bg-secondary/50" : "bg-emerald-500/10"
                          }`}
                        >
                          <span className="text-xs font-bold uppercase text-primary">
                            {turn.speaker === "ai" ? "AI Counterpart" : "You"}:
                          </span>{" "}
                          {turn.text}
                        </div>
                      ))}
                    </div>
                    <DualAxisReportView
                      report={replayingSession.evaluation}
                      onLaunchNext={(nextId) => launchWorkshop(nextId)}
                      onChooseAnother={() => setView("setup")}
                    />
                  </section>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function DualAxisReportView({
  report,
  onLaunchNext,
  onChooseAnother,
}: {
  report: WorkshopEvaluationReport;
  onLaunchNext: (scenarioId: string) => void;
  onChooseAnother: () => void;
}) {
  const { t, locale } = useI18n();

  const axis1Items = [
    { label: t.workshops.critVocab, val: report.criteria.vocabularyRange },
    { label: t.workshops.critGrammar, val: report.criteria.grammaticalAccuracy },
    { label: t.workshops.critFluency, val: report.criteria.fluencyCoherence },
    { label: t.workshops.critPronunciation, val: report.criteria.pronunciationDelivery },
    { label: t.workshops.critTone, val: report.criteria.toneAppropriateness },
  ];

  const axis2Items = [
    { label: t.workshops.critSpontaneous, val: report.criteria.spontaneousResponse },
    { label: t.workshops.critArgument, val: report.criteria.argumentDevelopment },
    { label: t.workshops.critEffectiveness, val: report.criteria.communicationEffectiveness },
    { label: t.workshops.critObjectives, val: report.criteria.objectiveAchievement },
    { label: t.workshops.critComposure, val: report.criteria.stakeholderComposure },
  ];

  return (
    <section className="space-y-6 rounded-2xl border border-primary/30 bg-card p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{t.workshops.reportTitle}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{report.summary[locale]}</p>
        </div>
        <div className="rounded-2xl bg-primary px-5 py-3 text-center text-primary-foreground">
          <p className="text-[11px] font-semibold uppercase opacity-90">
            {t.workshops.overallScoreLabel}
          </p>
          <p className="text-3xl font-extrabold">{report.overallScore}%</p>
        </div>
      </div>

      {/* Explicit Dual-Axis Separation: Axis 1 Linguistic vs Axis 2 Business Decision */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-extrabold text-primary">{t.workshops.axis1Title}</h3>
              <p className="text-xs text-muted-foreground">{t.workshops.axis1Desc}</p>
            </div>
            <span className="text-2xl font-extrabold text-primary">{report.linguisticScore}%</span>
          </div>
          <div className="space-y-2.5">
            {axis1Items.map((item) => (
              <ScoreBar key={item.label} label={item.label} value={item.val} tone="primary" />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-extrabold text-emerald-700 dark:text-emerald-300">
                {t.workshops.axis2Title}
              </h3>
              <p className="text-xs text-muted-foreground">{t.workshops.axis2Desc}</p>
            </div>
            <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300">
              {report.businessDecisionScore}%
            </span>
          </div>
          <div className="space-y-2.5">
            {axis2Items.map((item) => (
              <ScoreBar key={item.label} label={item.label} value={item.val} tone="emerald" />
            ))}
          </div>
        </div>
      </div>

      {/* Objectives Review */}
      <div className="rounded-xl border border-border bg-secondary/30 p-4">
        <h3 className="text-xs font-bold uppercase text-primary">
          {t.workshops.objectivesStatusTitle}
        </h3>
        <ul className="mt-2.5 space-y-2">
          {report.objectivesMet.map((item, idx) => (
            <li key={idx} className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="text-foreground">{item.objective[locale]}</span>
              <Badge
                variant={item.status === "achieved" ? "default" : "secondary"}
                className={item.status === "achieved" ? "bg-emerald-600 text-white" : ""}
              >
                {item.status === "achieved"
                  ? t.workshops.statusAchieved
                  : t.workshops.statusPartial}
              </Badge>
            </li>
          ))}
        </ul>
      </div>

      {/* Corrections & Executive Upgrades */}
      <div className="grid gap-4 lg:grid-cols-2">
        {report.sentenceCorrections.length > 0 && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 space-y-2">
            <h3 className="text-xs font-bold uppercase text-rose-600 dark:text-rose-400">
              {t.workshops.correctionsTitle}
            </h3>
            {report.sentenceCorrections.map((c, idx) => (
              <div key={idx} className="text-xs space-y-0.5">
                <p dir="ltr">
                  <span className="font-bold text-red-600 line-through">{c.original}</span> →{" "}
                  <span className="font-bold text-emerald-700 dark:text-emerald-300">
                    {c.improved}
                  </span>
                </p>
                <p className="text-muted-foreground">{c.why[locale]}</p>
              </div>
            ))}
          </div>
        )}

        <div className="rounded-xl border border-border bg-background p-4 space-y-2.5">
          <h3 className="text-xs font-bold uppercase text-primary">
            {t.workshops.upgradedExprTitle}
          </h3>
          {report.upgradedExpressions.map((u, idx) => (
            <div key={idx} className="rounded-lg bg-secondary/40 p-2.5 text-xs" dir="ltr">
              <p className="text-muted-foreground">Basic: {u.basic}</p>
              <p className="mt-1 font-semibold text-foreground">Executive: {u.executive}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recurring Weaknesses */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
        <h3 className="text-xs font-bold uppercase text-amber-700 dark:text-amber-300">
          {t.workshops.weaknessesTitle}
        </h3>
        <ul className="mt-2 space-y-1.5 text-xs text-foreground">
          {report.recurringWeaknesses.map((w, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-amber-600" aria-hidden />
              <span>{w[locale]}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended Next Workshops */}
      <div className="space-y-3 border-t border-border pt-4">
        <h3 className="text-sm font-bold text-foreground">{t.workshops.recommendedNextTitle}</h3>
        <div className="flex flex-wrap gap-2.5">
          {report.recommendedWorkshopIds.map((nextId) => {
            const nextSc = getWorkshopScenario(nextId);
            if (!nextSc) return null;
            return (
              <Button key={nextId} variant="outline" onClick={() => onLaunchNext(nextId)}>
                <Play className="size-3.5" aria-hidden />
                {nextSc.title[locale]}
              </Button>
            );
          })}
          <Button variant="secondary" onClick={onChooseAnother}>
            {t.workshops.startNewWorkshopBtn}
          </Button>
        </div>
      </div>
    </section>
  );
}

function ScoreBar({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "primary" | "emerald";
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs font-medium">
        <span>{label}</span>
        <span className="font-bold">{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full transition-all ${
            tone === "emerald" ? "bg-emerald-600" : "bg-primary"
          }`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
