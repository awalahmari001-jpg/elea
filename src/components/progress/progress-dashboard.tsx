import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  BookMarked,
  BookOpenCheck,
  Briefcase,
  CheckCircle2,
  Clock,
  Download,
  GraduationCap,
  Layers,
  Presentation,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
  Upload,
  UserCheck,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  computeUnifiedProgress,
  exportLearnerBackupJson,
  importLearnerBackupJson,
  TOTAL_IELTS_PRACTICE_MODES,
} from "@/lib/learner-progress";
import {
  learnerStorage,
  type AwarenessBand,
  type LearnerBackupSnapshot,
} from "@/lib/learner-storage";
import { learningRecord } from "@/lib/learning-record";

function emptySnapshot(): LearnerBackupSnapshot {
  return {
    version: 1,
    exportedAt: "",
    profile: { displayName: "", targetGoal: "", updatedAt: "" },
    result: null,
    courses: [],
    assessments: {},
    ieltsVocab: { masteredIds: [], quizBestScore: 0, completedModes: [], updatedAt: "" },
    cefrMastery: {},
    selfLearning: {
      records: {},
      totalSecondsSpent: 0,
      dailyDate: "",
      dailyCompletedIds: [],
      updatedAt: "",
    },
    business: {
      joined: false,
      masteredVocabIds: [],
      completedSkillIds: [],
      completedMeetingIds: [],
      practicedInterviewIds: [],
      updatedAt: "",
    },
    workshops: [],
  };
}

export function ProgressDashboard() {
  const { t, locale, dir } = useI18n();
  const pt = t.progress;

  const [snapshot, setSnapshot] = useState<LearnerBackupSnapshot>(() => emptySnapshot());
  const [mounted, setMounted] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [targetGoal, setTargetGoal] = useState("");
  const [profileNotice, setProfileNotice] = useState<string | null>(null);

  const [backupNotice, setBackupNotice] = useState<{
    tone: "ok" | "err";
    text: string;
  } | null>(null);
  const [confirmingReset, setConfirmingReset] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const refreshFromStorage = () => {
    const next = learnerStorage.exportSnapshot();
    setSnapshot(next);
    setDisplayName(next.profile.displayName);
    setTargetGoal(next.profile.targetGoal);
  };

  useEffect(() => {
    refreshFromStorage();
    setMounted(true);
  }, []);

  const summary = useMemo(() => computeUnifiedProgress(snapshot), [snapshot]);

  const handleSaveProfile = () => {
    learnerStorage.saveProfile({ displayName, targetGoal });
    refreshFromStorage();
    setProfileNotice(pt.profileSavedNote);
  };

  const handleExportJson = () => {
    const json = exportLearnerBackupJson();
    try {
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const stamp = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `easy-learning-english-progress-${stamp}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setBackupNotice({ tone: "ok", text: pt.exportSuccess });
    } catch {
      setBackupNotice({ tone: "ok", text: pt.exportSuccess });
    }
  };

  const handleImportFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const raw = await file.text();
    const res = importLearnerBackupJson(raw);
    if (!res.ok) {
      setBackupNotice({ tone: "err", text: pt.importError });
      return;
    }
    refreshFromStorage();
    setBackupNotice({ tone: "ok", text: pt.importSuccess });
  };

  const handleConfirmReset = () => {
    learnerStorage.clearAll();
    learningRecord.clearJourney();
    refreshFromStorage();
    setConfirmingReset(false);
    setBackupNotice({ tone: "ok", text: pt.resetSuccess });
  };

  const bandLabel = (band: AwarenessBand) => {
    switch (band) {
      case "mastery":
        return pt.bandMastery;
      case "proficient":
        return pt.bandProficient;
      case "developing":
        return pt.bandDeveloping;
      default:
        return pt.bandReview;
    }
  };

  const axisMessage =
    summary.workshops.axisInsight === "balanced"
      ? pt.wsAxisBalanced
      : summary.workshops.axisInsight === "linguistic-leads"
        ? pt.wsAxisLinguisticLeads
        : summary.workshops.axisInsight === "decision-leads"
          ? pt.wsAxisDecisionLeads
          : pt.wsAxisEmpty;

  const canRenderResponsiveCharts = mounted && typeof ResizeObserver !== "undefined";

  return (
    <div className="container-page space-y-10 py-10 md:py-14" dir={dir}>
      {/* Hero & High-Level Readiness */}
      <section className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 md:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <BarChart3 className="size-3.5" aria-hidden />
              <span>{pt.eyebrow}</span>
            </div>
            <h1 className="display-heading text-3xl font-bold tracking-tight md:text-4xl">
              {pt.title}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {pt.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:min-w-[340px]">
            <div className="rounded-2xl border border-border/70 bg-background/90 p-3.5 text-center shadow-sm">
              <div className="text-xs font-medium text-muted-foreground">
                {pt.overallReadinessLabel}
              </div>
              <div className="mt-1 text-2xl font-extrabold text-primary" dir="ltr">
                {summary.overallReadinessPct}%
              </div>
              <Progress value={summary.overallReadinessPct} className="mt-2 h-1.5" />
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/90 p-3.5 text-center shadow-sm">
              <div className="text-xs font-medium text-muted-foreground">{pt.activeStudyLabel}</div>
              <div className="mt-1 inline-flex items-baseline gap-1 text-2xl font-extrabold text-foreground">
                <span dir="ltr">{summary.totalStudyMinutes}</span>
                <span className="text-xs font-semibold text-muted-foreground">
                  {pt.minutesUnit}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
                <Clock className="size-3" aria-hidden />
              </div>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/90 p-3.5 text-center shadow-sm">
              <div className="text-xs font-medium text-muted-foreground">{pt.milestonesLabel}</div>
              <div className="mt-1 text-2xl font-extrabold text-accent-foreground" dir="ltr">
                {summary.totalMilestonesCompleted}
              </div>
              <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
                <Award className="size-3 text-primary" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learner Profile + Backup & Portability */}
      <section className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <UserCheck className="size-5 text-primary" aria-hidden />
                <CardTitle>{pt.profileCardTitle}</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  {pt.placementBadgeLabel}:
                </span>
                {summary.placement.level ? (
                  <Badge variant="default" className="font-bold" dir="ltr">
                    CEFR {summary.placement.level}
                  </Badge>
                ) : (
                  <Badge variant="secondary">{pt.unplacedBadge}</Badge>
                )}
              </div>
            </div>
            <CardDescription>
              {snapshot.profile.displayName || pt.defaultLearnerName}
              {" — "}
              {snapshot.profile.targetGoal || pt.defaultGoalNote}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="learner-display-name" className="text-xs font-semibold">
                  {pt.displayNameLabel}
                </label>
                <Input
                  id="learner-display-name"
                  value={displayName}
                  onChange={(e) => {
                    setDisplayName(e.target.value);
                    setProfileNotice(null);
                  }}
                  placeholder={pt.displayNamePlaceholder}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="learner-target-goal" className="text-xs font-semibold">
                  {pt.targetGoalLabel}
                </label>
                <Input
                  id="learner-target-goal"
                  value={targetGoal}
                  onChange={(e) => {
                    setTargetGoal(e.target.value);
                    setProfileNotice(null);
                  }}
                  placeholder={pt.targetGoalPlaceholder}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Button type="button" size="sm" onClick={handleSaveProfile}>
                  {pt.saveProfileBtn}
                </Button>
                {!summary.placement.level && (
                  <Button asChild size="sm" variant="accent">
                    <Link to="/level-test">{pt.takePlacementCta}</Link>
                  </Button>
                )}
                {profileNotice && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                    <CheckCircle2 className="size-3.5" aria-hidden />
                    {profileNotice}
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-border/70 pt-3">
              <div className="mb-2 text-xs font-semibold text-muted-foreground">
                {pt.joinedCoursesLabel}
              </div>
              {summary.placement.joinedCourses.length === 0 ? (
                <p className="text-xs text-muted-foreground">{pt.noCoursesJoined}</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {summary.placement.joinedCourses.map((c) => (
                    <Badge key={c.slug} variant="outline" className="text-xs">
                      {c.title[locale]}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="size-5 text-primary" aria-hidden />
              {pt.backupSectionTitle}
            </CardTitle>
            <CardDescription>{pt.backupSectionNote}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2.5">
              <Button type="button" variant="default" size="sm" onClick={handleExportJson}>
                <Download className="me-1.5 size-4" aria-hidden />
                {pt.exportJsonBtn}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="me-1.5 size-4" aria-hidden />
                {pt.importJsonBtn}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                aria-label={pt.importJsonBtn}
                onChange={handleImportFile}
                className="hidden"
              />
            </div>

            <div className="border-t border-border/70 pt-3">
              {!confirmingReset ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => setConfirmingReset(true)}
                >
                  <RotateCcw className="me-1.5 size-4" aria-hidden />
                  {pt.resetProgressBtn}
                </Button>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={handleConfirmReset}
                  >
                    {pt.confirmResetBtn}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setConfirmingReset(false)}
                  >
                    {pt.cancelResetBtn}
                  </Button>
                </div>
              )}
            </div>

            {backupNotice && (
              <div
                role="status"
                className={
                  backupNotice.tone === "ok"
                    ? "rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-medium text-primary"
                    : "rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive"
                }
              >
                {backupNotice.text}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Recommended Next Steps */}
      {summary.recommendedActions.length > 0 && (
        <section className="space-y-4">
          <div className="flex flex-col gap-1">
            <h2 className="display-heading flex items-center gap-2 text-xl font-bold">
              <Sparkles className="size-5 text-primary" aria-hidden />
              {pt.nextStepsTitle}
            </h2>
            <p className="text-sm text-muted-foreground">{pt.nextStepsSubtitle}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {summary.recommendedActions.map((action) => (
              <Card
                key={action.id}
                className="flex flex-col justify-between border-border/80 transition-shadow hover:shadow-md"
              >
                <CardHeader className="pb-2">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <Badge
                      variant={
                        action.priority === "high"
                          ? "destructive"
                          : action.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                      className="text-[11px]"
                    >
                      {action.priority.toUpperCase()}
                    </Badge>
                    <Target className="size-4 text-primary" aria-hidden />
                  </div>
                  <CardTitle className="text-base leading-snug">{action.title[locale]}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-4">
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {action.description[locale]}
                  </p>
                  <Button asChild size="sm" variant="outline" className="w-full justify-between">
                    <Link to={action.to}>
                      <span>{pt.openModuleCta}</span>
                      <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* 6 Learning Pillars Summary Grid */}
      <section className="space-y-4">
        <h2 className="display-heading text-xl font-bold">{pt.modulesHeading}</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {/* 1. Placement & Core Courses */}
          <Card className="flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <GraduationCap className="size-5 text-primary" aria-hidden />
                  {pt.pillarPlacementTitle}
                </CardTitle>
                <Badge variant={summary.placement.level ? "default" : "secondary"} dir="ltr">
                  {summary.placement.level ?? "—"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-muted/60 p-3">
                  <div className="text-muted-foreground">{pt.joinedCoursesLabel}</div>
                  <div className="mt-1 text-lg font-bold" dir="ltr">
                    {summary.placement.joinedCourses.length}
                  </div>
                </div>
                <div className="rounded-xl bg-muted/60 p-3">
                  <div className="text-muted-foreground">{pt.assessmentsTitle.split(" ")[0]}</div>
                  <div className="mt-1 text-lg font-bold" dir="ltr">
                    {summary.placement.assessments.length}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button asChild size="sm" variant="outline" className="flex-1">
                  <Link to="/courses">{t.nav.courses}</Link>
                </Button>
                <Button asChild size="sm" variant="secondary" className="flex-1">
                  <Link to="/level-test">{pt.takePlacementCta}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 2. IELTS Band 7+ Vocabulary */}
          <Card className="flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <BookOpenCheck className="size-5 text-primary" aria-hidden />
                  {pt.pillarIeltsTitle}
                </CardTitle>
                <Badge variant="outline" dir="ltr">
                  {summary.ieltsVocab.pct}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-muted-foreground">{pt.ieltsMasteredLabel}</span>
                  <span className="font-semibold" dir="ltr">
                    {summary.ieltsVocab.masteredCount} / {summary.ieltsVocab.totalCount}
                  </span>
                </div>
                <Progress value={summary.ieltsVocab.pct} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl bg-muted/60 p-2.5">
                  <div className="text-muted-foreground">{pt.ieltsQuizBestLabel}</div>
                  <div className="mt-0.5 font-bold" dir="ltr">
                    {summary.ieltsVocab.quizBestScore}%
                  </div>
                </div>
                <div className="rounded-xl bg-muted/60 p-2.5">
                  <div className="text-muted-foreground">{pt.ieltsModesLabel}</div>
                  <div className="mt-0.5 font-bold" dir="ltr">
                    {summary.ieltsVocab.completedModesCount} / {TOTAL_IELTS_PRACTICE_MODES}
                  </div>
                </div>
              </div>
              <Button asChild size="sm" variant="outline" className="w-full justify-between">
                <Link to="/ielts-vocabulary">
                  <span>{pt.openModuleCta}</span>
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* 3. CEFR A1-C2 Mastery */}
          <Card className="flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Layers className="size-5 text-primary" aria-hidden />
                  {pt.pillarCefrTitle}
                </CardTitle>
                <Badge variant="outline" dir="ltr">
                  {summary.cefrMastery.pct}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-muted-foreground">{pt.cefrIndicatorsLabel}</span>
                  <span className="font-semibold" dir="ltr">
                    {summary.cefrMastery.passedCount} / {summary.cefrMastery.totalCount}
                  </span>
                </div>
                <Progress value={summary.cefrMastery.pct} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl bg-muted/60 p-2.5">
                  <div className="text-muted-foreground">{pt.cefrStrongestLabel}</div>
                  <div className="mt-0.5 font-bold" dir="ltr">
                    {summary.cefrMastery.strongestLevel ?? "—"}
                  </div>
                </div>
                <div className="rounded-xl bg-muted/60 p-2.5">
                  <div className="text-muted-foreground">{pt.cefrNextFocusLabel}</div>
                  <div className="mt-0.5 font-bold" dir="ltr">
                    {summary.cefrMastery.weakestLevel ?? "A1"}
                  </div>
                </div>
              </div>
              <Button asChild size="sm" variant="outline" className="w-full justify-between">
                <Link to="/cefr-mastery">
                  <span>{pt.openModuleCta}</span>
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* 4. Self-learning Pace (600 Sentences) */}
          <Card className="flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <BookMarked className="size-5 text-primary" aria-hidden />
                  {pt.pillarSelfLearningTitle}
                </CardTitle>
                <Badge variant="outline" dir="ltr">
                  {summary.selfLearning.masteredCount} / {summary.selfLearning.totalCount}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-muted-foreground">{pt.slMasteredLabel}</span>
                  <span className="font-semibold" dir="ltr">
                    {summary.selfLearning.pct}% ({summary.selfLearning.attemptedCount}{" "}
                    {pt.slAttemptedLabel})
                  </span>
                </div>
                <Progress value={summary.selfLearning.pct} className="h-2" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="rounded-xl bg-muted/60 p-2">
                  <div className="text-[11px] text-muted-foreground">{pt.slAccuracyLabel}</div>
                  <div className="mt-0.5 font-bold" dir="ltr">
                    {summary.selfLearning.accuracyPct}%
                  </div>
                </div>
                <div className="rounded-xl bg-muted/60 p-2">
                  <div className="text-[11px] text-muted-foreground">{pt.slRevisionDueLabel}</div>
                  <div
                    className={
                      summary.selfLearning.dueForRevisionCount > 0
                        ? "mt-0.5 font-bold text-destructive"
                        : "mt-0.5 font-bold"
                    }
                    dir="ltr"
                  >
                    {summary.selfLearning.dueForRevisionCount}
                  </div>
                </div>
                <div className="rounded-xl bg-muted/60 p-2">
                  <div className="text-[11px] text-muted-foreground">{pt.slDailyGoalLabel}</div>
                  <div className="mt-0.5 font-bold" dir="ltr">
                    {summary.selfLearning.dailyCompletedCount}/{summary.selfLearning.dailyGoal}
                  </div>
                </div>
              </div>
              <Button asChild size="sm" variant="outline" className="w-full justify-between">
                <Link to="/self-learning">
                  <span>
                    {summary.selfLearning.dueForRevisionCount > 0
                      ? pt.reviewQueueShortcutBtn
                      : pt.openModuleCta}
                  </span>
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* 5. Business English Course */}
          <Card className="flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Briefcase className="size-5 text-primary" aria-hidden />
                  {pt.pillarBusinessTitle}
                </CardTitle>
                <Badge variant={summary.business.joined ? "default" : "secondary"}>
                  {summary.business.joined ? pt.bizJoinedBadge : pt.bizPreviewBadge}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2.5">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{pt.bizVocabLabel}</span>
                  <span className="font-semibold" dir="ltr">
                    {summary.business.vocabCount}/{summary.business.vocabTotal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{pt.bizSkillsLabel}</span>
                  <span className="font-semibold" dir="ltr">
                    {summary.business.skillsCount}/{summary.business.skillsTotal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{pt.bizMeetingsLabel}</span>
                  <span className="font-semibold" dir="ltr">
                    {summary.business.meetingsCount}/{summary.business.meetingsTotal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{pt.bizInterviewsLabel}</span>
                  <span className="font-semibold" dir="ltr">
                    {summary.business.interviewsCount}/{summary.business.interviewsTotal}
                  </span>
                </div>
              </div>
              <Progress value={summary.business.overallPct} className="h-2" />
              <Button asChild size="sm" variant="outline" className="w-full justify-between">
                <Link to="/business">
                  <span>{pt.openModuleCta}</span>
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* 6. Interactive Business Workshops */}
          <Card className="flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Presentation className="size-5 text-primary" aria-hidden />
                  {pt.pillarWorkshopsTitle}
                </CardTitle>
                <Badge variant="outline" dir="ltr">
                  {summary.workshops.totalSessions}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="rounded-xl bg-muted/60 p-2">
                  <div className="text-[11px] text-muted-foreground">{pt.wsAvgLinguisticLabel}</div>
                  <div className="mt-0.5 font-bold text-primary" dir="ltr">
                    {summary.workshops.avgLinguistic}%
                  </div>
                </div>
                <div className="rounded-xl bg-muted/60 p-2">
                  <div className="text-[11px] text-muted-foreground">{pt.wsAvgDecisionLabel}</div>
                  <div
                    className="mt-0.5 font-bold text-emerald-600 dark:text-emerald-400"
                    dir="ltr"
                  >
                    {summary.workshops.avgBusinessDecision}%
                  </div>
                </div>
                <div className="rounded-xl bg-muted/60 p-2">
                  <div className="text-[11px] text-muted-foreground">{pt.wsAvgOverallLabel}</div>
                  <div className="mt-0.5 font-bold" dir="ltr">
                    {summary.workshops.avgOverall}%
                  </div>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{axisMessage}</p>
              <Button asChild size="sm" variant="outline" className="w-full justify-between">
                <Link to="/workshops">
                  <span>{pt.openModuleCta}</span>
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Visual Analytics Tabs (Recharts + Structured Diagnostics) */}
      <section className="space-y-4">
        <Tabs defaultValue="workshops-trend" className="space-y-4">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1.5 bg-muted/60 p-1.5">
            <TabsTrigger value="workshops-trend" className="gap-1.5">
              <TrendingUp className="size-4" aria-hidden />
              {pt.tabWorkshopTrends}
            </TabsTrigger>
            <TabsTrigger value="cefr-coverage" className="gap-1.5">
              <BarChart3 className="size-4" aria-hidden />
              {pt.tabCefrCoverage}
            </TabsTrigger>
            <TabsTrigger value="diagnostics" className="gap-1.5">
              <AlertTriangle className="size-4" aria-hidden />
              {pt.tabDiagnostics}
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Interactive Workshops Dual-Axis Trend */}
          <TabsContent value="workshops-trend">
            <div className="grid gap-6 lg:grid-cols-12">
              <Card className="lg:col-span-8">
                <CardHeader>
                  <CardTitle>{pt.chartWorkshopsTitle}</CardTitle>
                  <CardDescription>{pt.chartWorkshopsSubtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  {summary.workshops.trendSeries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-12 text-center">
                      <Presentation className="size-10 text-muted-foreground" aria-hidden />
                      <p className="max-w-md text-sm text-muted-foreground">{pt.wsAxisEmpty}</p>
                      <Button asChild size="sm">
                        <Link to="/workshops">{pt.chartWorkshopsEmptyCta}</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {canRenderResponsiveCharts && (
                        <div className="h-[280px] w-full" dir="ltr">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={summary.workshops.trendSeries}
                              margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" opacity={0.35} />
                              <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                              <Tooltip />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey="linguisticScore"
                                name={pt.legendLinguistic}
                                stroke="#2563eb"
                                strokeWidth={2.5}
                                dot={{ r: 4 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="businessDecisionScore"
                                name={pt.legendDecision}
                                stroke="#10b981"
                                strokeWidth={2.5}
                                dot={{ r: 4 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="overallScore"
                                name={pt.legendOverall}
                                stroke="#f59e0b"
                                strokeDasharray="5 5"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      )}

                      <div className="grid gap-2 sm:grid-cols-2">
                        {summary.workshops.trendSeries.map((ptRow) => (
                          <div
                            key={ptRow.sessionId}
                            className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/30 px-3 py-2 text-xs"
                          >
                            <div className="min-w-0">
                              <div className="truncate font-semibold">
                                {ptRow.scenarioTitle[locale]}
                              </div>
                              <div className="text-muted-foreground" dir="ltr">
                                {ptRow.label} · {ptRow.dateShort}
                              </div>
                            </div>
                            <div
                              className="flex shrink-0 items-center gap-2 font-mono font-bold"
                              dir="ltr"
                            >
                              <span className="text-primary">L:{ptRow.linguisticScore}</span>
                              <span className="text-emerald-600 dark:text-emerald-400">
                                B:{ptRow.businessDecisionScore}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle className="text-base">{pt.recurringWeaknessesTitle}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {summary.workshops.recurringWeaknesses.length === 0 ? (
                    <p className="text-xs text-muted-foreground">{pt.recurringWeaknessesEmpty}</p>
                  ) : (
                    <ul className="space-y-2.5">
                      {summary.workshops.recurringWeaknesses.map((w, idx) => (
                        <li
                          key={idx}
                          className="rounded-xl border border-border/70 bg-muted/40 p-3 text-xs leading-relaxed"
                        >
                          {w[locale]}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 2: CEFR A1–C2 Mastery vs Self-learning 600-Sentence Coverage */}
          <TabsContent value="cefr-coverage">
            <Card>
              <CardHeader>
                <CardTitle>{pt.chartCefrTitle}</CardTitle>
                <CardDescription>{pt.chartCefrSubtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {canRenderResponsiveCharts && (
                  <div className="h-[290px] w-full" dir="ltr">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={summary.cefrMastery.byLevel}
                        margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.35} />
                        <XAxis dataKey="level" tick={{ fontSize: 12 }} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="masteryPct"
                          name={pt.legendCefrMastery}
                          fill="#2563eb"
                          radius={[6, 6, 0, 0]}
                        />
                        <Bar
                          dataKey="sentencesPct"
                          name={pt.legendSelfLearning}
                          fill="#10b981"
                          radius={[6, 6, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
                  {summary.cefrMastery.byLevel.map((row) => (
                    <div
                      key={row.level}
                      className="rounded-2xl border border-border/70 bg-muted/30 p-3 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold" dir="ltr">
                          {row.level}
                        </span>
                        <Badge variant="outline" dir="ltr">
                          {row.masteryPassed}/{row.masteryTotal}
                        </Badge>
                      </div>
                      <div className="mt-2 space-y-1.5">
                        <div className="flex justify-between text-[11px] text-muted-foreground">
                          <span>CEFR</span>
                          <span dir="ltr">{row.masteryPct}%</span>
                        </div>
                        <Progress value={row.masteryPct} className="h-1.5" />
                        <div className="flex justify-between text-[11px] text-muted-foreground">
                          <span>600 Lab</span>
                          <span dir="ltr">
                            {row.sentencesMastered}/{row.sentencesTotal}
                          </span>
                        </div>
                        <Progress value={row.sentencesPct} className="h-1.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Post-Lesson Assessments & Weak Grammar Diagnostics */}
          <TabsContent value="diagnostics">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{pt.slWeakGrammarTitle}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {summary.selfLearning.weakGrammarAreas.length === 0 ? (
                    <p className="text-xs text-muted-foreground">{pt.slNoWeakGrammar}</p>
                  ) : (
                    <div className="space-y-2.5">
                      {summary.selfLearning.weakGrammarAreas.map((g) => (
                        <div
                          key={g.grammarFocus}
                          className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-muted/30 px-3.5 py-2.5 text-xs"
                        >
                          <div className="space-y-0.5">
                            <div className="font-semibold">{g.grammarFocus}</div>
                            <div className="text-muted-foreground" dir="ltr">
                              {g.sampleLevels.join(", ")} · Avg {g.avgScore}%
                            </div>
                          </div>
                          <Badge variant="destructive" dir="ltr">
                            {g.count} {pt.attemptsCountLabel}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                  <Button asChild size="sm" variant="outline" className="w-full justify-between">
                    <Link to="/self-learning">
                      <span>{pt.reviewQueueShortcutBtn}</span>
                      <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{pt.assessmentsTitle}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2.5">
                  {summary.placement.assessments.length === 0 ? (
                    <p className="text-xs text-muted-foreground">{pt.assessmentsEmpty}</p>
                  ) : (
                    summary.placement.assessments.map((a) => (
                      <div
                        key={a.courseSlug}
                        className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/30 px-3.5 py-2.5 text-xs"
                      >
                        <div>
                          <div className="font-semibold uppercase" dir="ltr">
                            {a.courseSlug}
                          </div>
                          <div className="text-muted-foreground" dir="ltr">
                            {a.completedAt.slice(0, 10)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold" dir="ltr">
                            {a.score}/{a.total} ({a.pct}%)
                          </span>
                          <Badge variant={a.pct >= 70 ? "default" : "secondary"}>
                            {bandLabel(a.awarenessBand)}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
