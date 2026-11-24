import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  Compass,
  Flame,
  GraduationCap,
  Layers,
  Mic,
  PenLine,
  Play,
  Presentation,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Target,
} from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { format } from "@/lib/i18n/messages";
import {
  computeDashboardOverview,
  DEFAULT_WEEKLY_GOALS,
  learningRecord,
  type LearnerDashboardOverview,
  type WeeklyGoalItem,
  type WeeklyGoalsConfig,
} from "@/lib/learning-record";
import {
  computeActiveReminders,
  generatePersonalRoadmap,
  personalPlanStorage,
} from "@/lib/personal-plan";

export function LearningDashboard() {
  const { t, locale, dir } = useI18n();
  const dt = t.dashboard;

  const [overview, setOverview] = useState<LearnerDashboardOverview | null>(null);
  const [editingGoals, setEditingGoals] = useState(false);
  const [goalDraft, setGoalDraft] = useState<WeeklyGoalsConfig>(DEFAULT_WEEKLY_GOALS);
  const [goalsNotice, setGoalsNotice] = useState<string | null>(null);

  const refresh = () => {
    const next = computeDashboardOverview();
    setOverview(next);
    setGoalDraft(next.weeklyGoalsConfig);
  };

  useEffect(() => {
    refresh();
  }, []);

  if (!overview) {
    return (
      <div className="container-page py-16">
        <div className="h-44 animate-pulse rounded-3xl bg-muted/60" />
      </div>
    );
  }

  const displayName = overview.learnerName || dt.welcomeDefaultName;
  const topRecommendation = overview.recommendations[0];

  const handleSaveGoals = () => {
    learningRecord.saveWeeklyGoals(goalDraft);
    setEditingGoals(false);
    setGoalsNotice(dt.goalsSavedNote);
    refresh();
  };

  const goalLabel = (id: WeeklyGoalItem["id"]): string => {
    switch (id) {
      case "lessons":
        return dt.goalLessons;
      case "vocab":
        return dt.goalVocab;
      case "grammar":
        return dt.goalGrammar;
      case "speakingMinutes":
        return dt.goalSpeakingMinutes;
      case "assessments":
        return dt.goalAssessments;
      case "workshops":
        return dt.goalWorkshops;
    }
  };

  return (
    <div className="container-page space-y-10 py-10 md:py-14" dir={dir}>
      {/* A. Welcome & Learning Overview */}
      <section className="rounded-3xl border-2 border-foreground/85 bg-gradient-to-br from-primary/10 via-card to-accent/15 p-6 shadow-ink md:p-9">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default" className="gap-1">
                <GraduationCap className="size-3.5" aria-hidden />
                {dt.eyebrow}
              </Badge>
              <Badge variant="secondary" dir="ltr">
                CEFR {overview.studyingLevel}
              </Badge>
              {overview.assessedLevel && (
                <Badge variant="outline" dir="ltr">
                  {dt.badgeAssessed}: {overview.assessedLevel}
                </Badge>
              )}
            </div>

            <h1 className="display-heading text-3xl font-extrabold tracking-tight md:text-4xl">
              {format(dt.welcomeBack, { name: displayName })}
            </h1>

            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {format(dt.welcomeSummary, {
                level: overview.studyingLevel,
                completion: overview.activityCompletionPct,
                mastery: overview.assessedMasteryPct,
              })}
              {topRecommendation && (
                <>
                  {" "}
                  <span className="font-semibold text-foreground">
                    {dt.nextSuggestionPrefix}: {topRecommendation.title[locale]}.
                  </span>
                </>
              )}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              {overview.targetGoal && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1 font-medium text-foreground">
                  <Target className="size-3.5 text-primary" aria-hidden />
                  <span>
                    {dt.goalLabel}: {overview.targetGoal}
                  </span>
                </span>
              )}
              {overview.enrolledCourses.length > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1 font-medium text-muted-foreground">
                  <Layers className="size-3.5 text-primary" aria-hidden />
                  <span>
                    {dt.enrolledCoursesLabel}:{" "}
                    {overview.enrolledCourses.map((c) => c.title[locale]).join(" · ")}
                  </span>
                </span>
              )}
              <Link
                to="/profile"
                className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
              >
                <Settings className="size-3.5" aria-hidden />
                {dt.editProfileLink}
              </Link>
            </div>
          </div>

          {/* 4 Separate KPI Metrics: Streak, Hours, Completion %, Mastery % */}
          <div className="grid grid-cols-2 gap-3 sm:min-w-[360px]">
            <div className="rounded-2xl border border-border/80 bg-background/90 p-3.5 shadow-sm">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{dt.streakLabel}</span>
                <Flame className="size-4 text-amber-500" aria-hidden />
              </div>
              <div className="mt-1 text-xl font-extrabold text-foreground">
                {format(dt.streakDays, { count: overview.streak.currentDays })}
              </div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">{dt.streakGraceNote}</div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-background/90 p-3.5 shadow-sm">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{dt.totalHoursLabel}</span>
                <Clock className="size-4 text-primary" aria-hidden />
              </div>
              <div className="mt-1 flex items-baseline gap-1 text-xl font-extrabold text-foreground">
                <span dir="ltr">{overview.totalLearningHours}</span>
                <span className="text-xs font-semibold text-muted-foreground">{dt.hoursUnit}</span>
              </div>
              <div className="mt-0.5 text-[11px] text-muted-foreground" dir="ltr">
                {overview.totalLearningMinutes} {t.progress.minutesUnit}
              </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-background/90 p-3.5 shadow-sm">
              <div className="text-xs text-muted-foreground">{dt.completionMetricLabel}</div>
              <div className="mt-1 text-xl font-extrabold text-primary" dir="ltr">
                {overview.activityCompletionPct}%
              </div>
              <Progress value={overview.activityCompletionPct} className="mt-1.5 h-1.5" />
            </div>

            <div className="rounded-2xl border border-border/80 bg-background/90 p-3.5 shadow-sm">
              <div className="text-xs text-muted-foreground">{dt.masteryMetricLabel}</div>
              <div
                className="mt-1 text-xl font-extrabold text-emerald-600 dark:text-emerald-400"
                dir="ltr"
              >
                {overview.assessedMasteryPct}%
              </div>
              <Progress value={overview.assessedMasteryPct} className="mt-1.5 h-1.5" />
            </div>
          </div>
        </div>
      </section>

      {/* C. Continue Where You Left Off + B. My Current Learning Level */}
      <section className="grid gap-6 lg:grid-cols-12">
        <Card className="border-2 border-primary/35 lg:col-span-5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Play className="size-5 text-primary" aria-hidden />
              {dt.continueTitle}
            </CardTitle>
            {!overview.continueCard.hasHistory && (
              <CardDescription>{dt.continueEmptyNote}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2.5 rounded-2xl bg-muted/50 p-4 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">{dt.lastCourseLabel}</span>
                <span className="font-bold text-foreground">
                  {overview.continueCard.courseTitle[locale]}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">{dt.lastCompletedLabel}</span>
                <span className="max-w-[60%] truncate font-semibold text-foreground">
                  {overview.continueCard.lastCompletedTitle
                    ? overview.continueCard.lastCompletedTitle[locale]
                    : dt.noneYet}
                </span>
              </div>
              {overview.continueCard.currentModuleLabel && (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-muted-foreground">{dt.currentModuleLabel}</span>
                  <span className="max-w-[60%] truncate font-semibold text-primary">
                    {overview.continueCard.currentModuleLabel[locale]}
                  </span>
                </div>
              )}
              {overview.continueCard.nextLessonTitle && (
                <div className="flex items-center justify-between gap-2 border-t border-border/70 pt-2">
                  <span className="text-muted-foreground">{dt.nextLessonLabel}</span>
                  <span className="max-w-[60%] truncate font-bold text-foreground">
                    {overview.continueCard.nextLessonTitle[locale]}
                  </span>
                </div>
              )}
            </div>

            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-muted-foreground">{dt.completionMetricLabel}</span>
                <span className="font-bold" dir="ltr">
                  {overview.continueCard.courseCompletionPct}%
                </span>
              </div>
              <Progress value={overview.continueCard.courseCompletionPct} className="h-2" />
            </div>

            {overview.continueCard.resumeTo === "/lessons/$lesson" &&
            overview.continueCard.resumeLessonParam ? (
              <Button asChild size="lg" className="w-full justify-between">
                <Link
                  to="/lessons/$lesson"
                  params={{ lesson: overview.continueCard.resumeLessonParam }}
                >
                  <span>{dt.resumeBtn}</span>
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                </Link>
              </Button>
            ) : overview.continueCard.resumeTo === "/courses/$level" &&
              overview.continueCard.resumeLevelParam ? (
              <Button asChild size="lg" className="w-full justify-between">
                <Link
                  to="/courses/$level"
                  params={{ level: overview.continueCard.resumeLevelParam }}
                >
                  <span>{dt.resumeBtn}</span>
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="w-full justify-between">
                <Link to="/courses">
                  <span>{dt.resumeBtn}</span>
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>

        {/* B. Visual CEFR A1 -> C2 Progression Rail */}
        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Award className="size-5 text-primary" aria-hidden />
              {dt.cefrSectionTitle}
            </CardTitle>
            <CardDescription>{dt.cefrSectionNote}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {overview.cefrRail.map((node) => (
                <Link
                  key={node.level}
                  to="/courses/$level"
                  params={{ level: node.level.toLowerCase() }}
                  className={`flex flex-col justify-between rounded-2xl border p-3.5 transition-all hover:-translate-y-0.5 hover:shadow-sm ${
                    node.isStudying
                      ? "border-2 border-primary bg-primary/5"
                      : node.isCompleted
                        ? "border-emerald-500/50 bg-emerald-500/5"
                        : "border-border/80 bg-card"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-lg font-extrabold" dir="ltr">
                      {node.level}
                    </span>
                    <div className="flex flex-wrap justify-end gap-1">
                      {node.isCompleted && (
                        <Badge variant="default" className="bg-emerald-600 text-[10px]">
                          {dt.badgeCompleted}
                        </Badge>
                      )}
                      {node.isStudying && (
                        <Badge variant="default" className="text-[10px]">
                          {dt.badgeStudying}
                        </Badge>
                      )}
                      {node.isNextTarget && !node.isStudying && (
                        <Badge variant="secondary" className="text-[10px]">
                          {dt.badgeNextTarget}
                        </Badge>
                      )}
                      {node.isAssessed && !node.isStudying && (
                        <Badge variant="outline" className="text-[10px]">
                          {dt.badgeAssessed}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-muted-foreground">
                      <span>{dt.completionMetricLabel}</span>
                      <span className="font-semibold text-foreground" dir="ltr">
                        {node.completionPct}%
                      </span>
                    </div>
                    <Progress value={node.completionPct} className="h-1.5" />
                    <div className="flex justify-between text-muted-foreground">
                      <span>{dt.masteryMetricLabel}</span>
                      <span
                        className="font-semibold text-emerald-600 dark:text-emerald-400"
                        dir="ltr"
                      >
                        {node.masteryPct}%
                      </span>
                    </div>
                    <Progress value={node.masteryPct} className="h-1.5" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* D. My Weekly Learning Goals (Customizable) */}
      <section>
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="size-5 text-primary" aria-hidden />
                  {dt.weeklyGoalsTitle}
                </CardTitle>
                <CardDescription>{dt.weeklyGoalsSubtitle}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {goalsNotice && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                    <CheckCircle2 className="size-3.5" aria-hidden />
                    {goalsNotice}
                  </span>
                )}
                {!editingGoals ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingGoals(true);
                      setGoalsNotice(null);
                    }}
                  >
                    <SlidersHorizontal className="me-1.5 size-4" aria-hidden />
                    {dt.customizeGoalsBtn}
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button type="button" size="sm" onClick={handleSaveGoals}>
                      {dt.saveGoalsBtn}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setGoalDraft(overview.weeklyGoalsConfig);
                        setEditingGoals(false);
                      }}
                    >
                      {dt.cancelGoalsBtn}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {editingGoals && (
              <div className="grid gap-3 rounded-2xl border border-primary/25 bg-primary/5 p-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-1">
                  <label htmlFor="goal-lessons" className="text-xs font-semibold">
                    {dt.goalLessons}
                  </label>
                  <Input
                    id="goal-lessons"
                    type="number"
                    min={1}
                    max={30}
                    value={goalDraft.lessonsTarget}
                    onChange={(e) =>
                      setGoalDraft((p) => ({ ...p, lessonsTarget: Number(e.target.value) }))
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="goal-vocab" className="text-xs font-semibold">
                    {dt.goalVocab}
                  </label>
                  <Input
                    id="goal-vocab"
                    type="number"
                    min={5}
                    max={300}
                    value={goalDraft.vocabTarget}
                    onChange={(e) =>
                      setGoalDraft((p) => ({ ...p, vocabTarget: Number(e.target.value) }))
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="goal-grammar" className="text-xs font-semibold">
                    {dt.goalGrammar}
                  </label>
                  <Input
                    id="goal-grammar"
                    type="number"
                    min={1}
                    max={25}
                    value={goalDraft.grammarTarget}
                    onChange={(e) =>
                      setGoalDraft((p) => ({ ...p, grammarTarget: Number(e.target.value) }))
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="goal-speaking" className="text-xs font-semibold">
                    {dt.goalSpeakingMinutes}
                  </label>
                  <Input
                    id="goal-speaking"
                    type="number"
                    min={10}
                    max={600}
                    value={goalDraft.speakingMinutesTarget}
                    onChange={(e) =>
                      setGoalDraft((p) => ({
                        ...p,
                        speakingMinutesTarget: Number(e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="goal-assessments" className="text-xs font-semibold">
                    {dt.goalAssessments}
                  </label>
                  <Input
                    id="goal-assessments"
                    type="number"
                    min={1}
                    max={10}
                    value={goalDraft.assessmentsTarget}
                    onChange={(e) =>
                      setGoalDraft((p) => ({ ...p, assessmentsTarget: Number(e.target.value) }))
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="goal-workshops" className="text-xs font-semibold">
                    {dt.goalWorkshops}
                  </label>
                  <Input
                    id="goal-workshops"
                    type="number"
                    min={1}
                    max={10}
                    value={goalDraft.workshopsTarget}
                    onChange={(e) =>
                      setGoalDraft((p) => ({ ...p, workshopsTarget: Number(e.target.value) }))
                    }
                  />
                </div>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {overview.weeklyGoals.map((goal) => (
                <div
                  key={goal.id}
                  className="rounded-2xl border border-border/80 bg-muted/30 p-4 text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-foreground">{goalLabel(goal.id)}</span>
                    <span className="font-bold text-primary" dir="ltr">
                      {goal.completed} / {goal.target}
                    </span>
                  </div>
                  <Progress value={goal.pct} className="mt-2.5 h-2" />
                  <div className="mt-2 text-[11px] text-muted-foreground">
                    {goal.remaining === 0
                      ? dt.goalAchieved
                      : format(dt.goalRemaining, { count: goal.remaining })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* E. Learning Activity Summary */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="display-heading text-xl font-bold">{dt.activitySummaryTitle}</h2>
          <Button asChild size="sm" variant="outline">
            <Link to="/progress">
              <BarChart3 className="me-1.5 size-4" aria-hidden />
              {dt.viewFullAnalyticsBtn}
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
          {[
            {
              label: dt.statLessonsCompleted,
              value: overview.activitySummary.lessonsCompleted,
              Icon: BookOpen,
            },
            {
              label: dt.statLessonsMastered,
              value: overview.activitySummary.lessonsMastered,
              Icon: CheckCircle2,
            },
            {
              label: dt.statVocabLearned,
              value: overview.activitySummary.vocabLearned,
              Icon: Sparkles,
            },
            {
              label: dt.statExercisesAttempted,
              value: overview.activitySummary.exercisesAttempted,
              Icon: Layers,
            },
            {
              label: dt.statExercisesPassed,
              value: overview.activitySummary.exercisesPassed,
              Icon: Award,
            },
            {
              label: dt.statSpeakingDone,
              value: overview.activitySummary.speakingCompleted,
              Icon: Mic,
            },
            {
              label: dt.statWritingDone,
              value: overview.activitySummary.writingCompleted,
              Icon: PenLine,
            },
            {
              label: dt.statWorkshopsDone,
              value: overview.activitySummary.workshopsAttended,
              Icon: Presentation,
            },
          ].map(({ label, value, Icon }) => (
            <div key={label} className="rounded-2xl border border-border/80 bg-card p-4 shadow-xs">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{label}</span>
                <Icon className="size-4 text-primary" aria-hidden />
              </div>
              <div className="mt-2 text-2xl font-extrabold text-foreground" dir="ltr">
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* F. Recommended Next Activities */}
      <section className="space-y-4">
        <div>
          <h2 className="display-heading flex items-center gap-2 text-xl font-bold">
            <Sparkles className="size-5 text-primary" aria-hidden />
            {dt.recommendationsTitle}
          </h2>
          <p className="text-sm text-muted-foreground">{dt.recommendationsSubtitle}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {overview.recommendations.map((rec) => (
            <Card key={rec.id} className="flex flex-col justify-between">
              <CardHeader className="pb-2">
                <Badge
                  variant={
                    rec.priority === "high"
                      ? "destructive"
                      : rec.priority === "medium"
                        ? "default"
                        : "secondary"
                  }
                  className="mb-1 w-fit text-[10px]"
                >
                  {rec.priority.toUpperCase()}
                </Badge>
                <CardTitle className="text-base leading-snug">{rec.title[locale]}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-4">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {rec.reason[locale]}
                </p>
                {rec.to === "/lessons/$lesson" && rec.lessonParam ? (
                  <Button asChild size="sm" variant="outline" className="w-full justify-between">
                    <Link to="/lessons/$lesson" params={{ lesson: rec.lessonParam }}>
                      <span>{dt.startActivityBtn}</span>
                      <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                    </Link>
                  </Button>
                ) : rec.to === "/courses/$level" && rec.levelParam ? (
                  <Button asChild size="sm" variant="outline" className="w-full justify-between">
                    <Link to="/courses/$level" params={{ level: rec.levelParam }}>
                      <span>{dt.startActivityBtn}</span>
                      <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild size="sm" variant="outline" className="w-full justify-between">
                    <Link
                      to={
                        rec.to as
                          | "/level-test"
                          | "/self-learning"
                          | "/ielts-vocabulary"
                          | "/cefr-mastery"
                          | "/business"
                          | "/workshops"
                          | "/speaking"
                      }
                    >
                      <span>{dt.startActivityBtn}</span>
                      <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* G. Personal Learning Roadmap & Active Smart Reminders Preview */}
      {(() => {
        const plan = personalPlanStorage.getPlan();
        const roadmap = generatePersonalRoadmap(plan, overview.studyingLevel);
        const nextSteps = roadmap.filter((s) => !s.completed).slice(0, 3);
        const reminders = computeActiveReminders().slice(0, 2);
        return (
          <section className="grid gap-6 lg:grid-cols-12">
            <Card className="border-2 border-foreground/15 lg:col-span-7">
              <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base font-extrabold">
                    <Compass className="size-4 text-primary" aria-hidden />
                    {t.calendarPage.roadmapTitle} ({overview.studyingLevel} → {plan.targetLevel})
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {t.calendarPage.roadmapDesc}
                  </CardDescription>
                </div>
                <Button asChild size="sm" variant="outline" className="rounded-full text-xs">
                  <Link to="/calendar">
                    <CalendarDays className="me-1.5 size-3.5" aria-hidden />
                    {t.nav.calendar}
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {nextSteps.map((step) => (
                  <Link
                    key={step.id}
                    to={step.to}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/20 px-3.5 py-2.5 text-xs transition-colors hover:border-primary/50"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-black text-primary"
                        dir="ltr"
                      >
                        {step.order}
                      </span>
                      <span className="font-bold text-foreground">{step.title[locale]}</span>
                    </div>
                    <ArrowRight
                      className="size-3.5 shrink-0 text-primary rtl:rotate-180"
                      aria-hidden
                    />
                  </Link>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2 border-foreground/15 lg:col-span-5">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-extrabold">
                  <Bell className="size-4 text-primary" aria-hidden />
                  {t.calendarPage.activeRemindersTitle}
                </CardTitle>
                <CardDescription className="text-xs">
                  {t.calendarPage.remindersDesc}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {reminders.length === 0 ? (
                  <p className="text-xs text-muted-foreground">
                    {t.calendarPage.remindersControlNote}
                  </p>
                ) : (
                  reminders.map((rem) => (
                    <div
                      key={rem.id}
                      className="flex items-start justify-between gap-2 rounded-xl border border-border bg-card p-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-foreground">{rem.title[locale]}</div>
                        <p className="text-[11px] text-muted-foreground">{rem.detail[locale]}</p>
                      </div>
                      <Button asChild size="sm" variant="ghost" className="shrink-0 text-xs">
                        <Link to={rem.to}>{rem.ctaLabel[locale]}</Link>
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </section>
        );
      })()}
    </div>
  );
}
