import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock,
  Compass,
  Plus,
  RefreshCw,
  Sparkles,
  Target,
  Trash2,
} from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CEFR_LEVELS, type CefrLevel } from "@/content/courses";
import { computeDashboardOverview } from "@/lib/learning-record";
import {
  computeActiveReminders,
  DEFAULT_REMINDERS_CONFIG,
  defaultPersonalPlan,
  generatePersonalRoadmap,
  generateWeeklySchedule,
  LEARNING_OBJECTIVES,
  personalPlanStorage,
  STUDY_DAYS_META,
  type ActiveReminderBanner,
  type CalendarEvent,
  type CalendarEventKind,
  type LearningObjectiveId,
  type PersonalLearningPlan,
  type SmartRemindersConfig,
  type StudyDay,
} from "@/lib/personal-plan";

const EVENT_KIND_META: Record<
  CalendarEventKind,
  { badgeClass: string; label: { en: string; ar: string } }
> = {
  lesson: {
    badgeClass: "bg-sky-500/15 text-sky-800 dark:text-sky-200 border-sky-500/30",
    label: { en: "Lesson", ar: "درس" },
  },
  target: {
    badgeClass: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border-emerald-500/30",
    label: { en: "Learning Target", ar: "هدف دراسي" },
  },
  assessment: {
    badgeClass: "bg-violet-500/15 text-violet-800 dark:text-violet-200 border-violet-500/30",
    label: { en: "Assessment", ar: "تقييم" },
  },
  mock: {
    badgeClass: "bg-amber-500/15 text-amber-800 dark:text-amber-200 border-amber-500/30",
    label: { en: "Mock Test", ar: "اختبار تجريبي" },
  },
  workshop: {
    badgeClass: "bg-rose-500/15 text-rose-800 dark:text-rose-200 border-rose-500/30",
    label: { en: "Workshop", ar: "ورشة عمل" },
  },
  revision: {
    badgeClass: "bg-indigo-500/15 text-indigo-800 dark:text-indigo-200 border-indigo-500/30",
    label: { en: "Revision", ar: "مراجعة" },
  },
  deadline: {
    badgeClass: "bg-orange-500/15 text-orange-800 dark:text-orange-200 border-orange-500/30",
    label: { en: "Deadline", ar: "موعد نهائي" },
  },
};

export function LearningCalendarView() {
  const { t, locale, dir } = useI18n();
  const ct = t.calendarPage;

  const [currentLevel, setCurrentLevel] = useState<CefrLevel>("B1");
  const [plan, setPlan] = useState<PersonalLearningPlan>(() => defaultPersonalPlan());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [remindersCfg, setRemindersCfg] = useState<SmartRemindersConfig>(DEFAULT_REMINDERS_CONFIG);
  const [activeReminders, setActiveReminders] = useState<ActiveReminderBanner[]>([]);
  const [planSavedNotice, setPlanSavedNotice] = useState<string | null>(null);

  // Add event form
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [newKind, setNewKind] = useState<CalendarEventKind>("lesson");
  const [filterKind, setFilterKind] = useState<CalendarEventKind | "all">("all");

  const hydrate = () => {
    const overview = computeDashboardOverview();
    setCurrentLevel(overview.studyingLevel);
    setPlan(personalPlanStorage.getPlan());
    setEvents(personalPlanStorage.getCalendarEvents());
    setRemindersCfg(personalPlanStorage.getRemindersConfig());
    setActiveReminders(computeActiveReminders());
  };

  useEffect(() => {
    hydrate();
  }, []);

  const roadmap = generatePersonalRoadmap(plan, currentLevel);
  const weeklySchedule = generateWeeklySchedule(plan, currentLevel);
  const weeklyMinutesTotal = plan.studyDays.length * plan.dailyMinutes;

  const toggleObjective = (id: LearningObjectiveId) => {
    setPlan((prev) => {
      const exists = prev.objectives.includes(id);
      const next = exists ? prev.objectives.filter((o) => o !== id) : [...prev.objectives, id];
      return { ...prev, objectives: next.length > 0 ? next : [id] };
    });
  };

  const toggleStudyDay = (day: StudyDay) => {
    setPlan((prev) => {
      const exists = prev.studyDays.includes(day);
      const next = exists ? prev.studyDays.filter((d) => d !== day) : [...prev.studyDays, day];
      return { ...prev, studyDays: next.length > 0 ? next : [day] };
    });
  };

  const handleSavePlan = () => {
    const saved = personalPlanStorage.savePlan({
      objectives: plan.objectives,
      targetLevel: plan.targetLevel,
      studyDays: plan.studyDays,
      dailyMinutes: plan.dailyMinutes,
      targetDate: plan.targetDate,
    });
    setPlan(saved);
    setEvents(personalPlanStorage.regenerateSuggestedEvents());
    setActiveReminders(computeActiveReminders());
    setPlanSavedNotice(ct.planSavedToast);
  };

  const handleAddEvent = () => {
    if (!newTitle.trim() || !newDate) return;
    setEvents(
      personalPlanStorage.addCalendarEvent({
        title: newTitle.trim(),
        date: newDate,
        kind: newKind,
        linkTo:
          newKind === "workshop"
            ? "/workshops"
            : newKind === "mock"
              ? "/ielts"
              : newKind === "revision"
                ? "/self-learning"
                : "/courses",
      }),
    );
    setNewTitle("");
    setActiveReminders(computeActiveReminders());
  };

  const handleToggleEvent = (id: string) => {
    setEvents(personalPlanStorage.toggleCalendarEvent(id));
    setActiveReminders(computeActiveReminders());
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(personalPlanStorage.deleteCalendarEvent(id));
    setActiveReminders(computeActiveReminders());
  };

  const handleToggleReminder = (key: keyof Omit<SmartRemindersConfig, "preferredTime">) => {
    const next = { ...remindersCfg, [key]: !remindersCfg[key] };
    setRemindersCfg(personalPlanStorage.saveRemindersConfig(next));
    setActiveReminders(computeActiveReminders());
  };

  const handleReminderTimeChange = (time: string) => {
    const next = { ...remindersCfg, preferredTime: time };
    setRemindersCfg(personalPlanStorage.saveRemindersConfig(next));
    setActiveReminders(computeActiveReminders());
  };

  const visibleEvents = filterKind === "all" ? events : events.filter((e) => e.kind === filterKind);

  const reminderToggles: Array<{
    key: keyof Omit<SmartRemindersConfig, "preferredTime">;
    label: string;
  }> = [
    { key: "dailyTargets", label: ct.remDailyTargets },
    { key: "incompleteLessons", label: ct.remIncompleteLessons },
    { key: "scheduledAssessments", label: ct.remAssessments },
    { key: "revisionActivities", label: ct.remRevision },
    { key: "upcomingWorkshops", label: ct.remWorkshops },
    { key: "weeklyProgressReports", label: ct.remWeeklyReports },
  ];

  return (
    <div className="container-page space-y-10 py-10 md:py-14" dir={dir}>
      {/* Hero Banner */}
      <section className="rounded-3xl border-2 border-foreground/85 bg-gradient-to-br from-primary/10 via-card to-accent/15 p-6 shadow-ink md:p-9">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl space-y-3">
            <Badge variant="default" className="gap-1.5">
              <CalendarDays className="size-3.5" aria-hidden />
              {ct.eyebrow}
            </Badge>
            <h1 className="display-heading text-3xl font-extrabold tracking-tight md:text-4xl">
              {ct.title}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {ct.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card/90 p-4 text-xs shadow-xs">
            <div className="space-y-0.5 pe-3">
              <div className="font-semibold text-muted-foreground">{ct.currentToTargetLabel}</div>
              <div className="text-lg font-black text-primary" dir="ltr">
                {currentLevel} → {plan.targetLevel}
              </div>
            </div>
            <div className="h-8 w-px bg-border" aria-hidden />
            <div className="space-y-0.5 ps-2">
              <div className="font-semibold text-muted-foreground">{ct.weeklyCommitmentLabel}</div>
              <div className="text-lg font-black text-foreground" dir="ltr">
                {weeklyMinutesTotal} min/wk
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Smart Reminders Strip */}
      {activeReminders.length > 0 && (
        <section className="space-y-3" aria-label={ct.activeRemindersTitle}>
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-primary" aria-hidden />
            <h2 className="text-base font-extrabold text-foreground">{ct.activeRemindersTitle}</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {activeReminders.map((rem) => (
              <div
                key={rem.id}
                className={`flex items-start justify-between gap-3 rounded-2xl border p-4 ${
                  rem.priority === "high"
                    ? "border-amber-500/40 bg-amber-500/10"
                    : "border-border bg-card"
                }`}
              >
                <div className="space-y-1 text-xs">
                  <div className="font-extrabold text-foreground">{rem.title[locale]}</div>
                  <p className="text-muted-foreground">{rem.detail[locale]}</p>
                </div>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="shrink-0 rounded-full text-xs"
                >
                  <Link to={rem.to}>
                    {rem.ctaLabel[locale]}
                    <ArrowRight className="ms-1 size-3 rtl:rotate-180" aria-hidden />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 1: Personal Learning Plan Customiser + Generated Current -> Target Roadmap */}
      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="border-2 border-foreground/15 lg:col-span-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-extrabold">
              <Target className="size-5 text-primary" aria-hidden />
              {ct.planBuilderTitle}
            </CardTitle>
            <CardDescription>{ct.planBuilderDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Multi-select Learning Objectives */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {ct.objectivesLabel}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {LEARNING_OBJECTIVES.map((obj) => {
                  const selected = plan.objectives.includes(obj.id);
                  return (
                    <button
                      key={obj.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleObjective(obj.id)}
                      className={`flex items-start gap-2 rounded-xl border-2 p-2.5 text-start text-xs transition-all ${
                        selected
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-card text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      <span className="text-base" aria-hidden>
                        {obj.emoji}
                      </span>
                      <span className="font-bold leading-snug">{obj.label[locale]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target CEFR Level & Daily Study Duration */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {ct.targetLevelLabel}
                </div>
                <div
                  className="flex flex-wrap gap-1.5"
                  role="group"
                  aria-label={ct.targetLevelLabel}
                >
                  {CEFR_LEVELS.map((lvl) => (
                    <Button
                      key={lvl}
                      type="button"
                      size="sm"
                      variant={plan.targetLevel === lvl ? "default" : "outline"}
                      className="rounded-full px-3 text-xs font-bold"
                      onClick={() => setPlan((p) => ({ ...p, targetLevel: lvl }))}
                    >
                      {lvl}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {ct.dailyMinutesLabel}
                </div>
                <div
                  className="flex flex-wrap gap-1.5"
                  role="group"
                  aria-label={ct.dailyMinutesLabel}
                >
                  {([15, 30, 45, 60] as const).map((mins) => (
                    <Button
                      key={mins}
                      type="button"
                      size="sm"
                      variant={plan.dailyMinutes === mins ? "default" : "outline"}
                      className="rounded-full px-3 text-xs font-bold"
                      onClick={() => setPlan((p) => ({ ...p, dailyMinutes: mins }))}
                    >
                      {mins}m
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preferred Study Days + Target Date */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {ct.studyDaysLabel}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {STUDY_DAYS_META.map((d) => {
                  const active = plan.studyDays.includes(d.id);
                  return (
                    <Button
                      key={d.id}
                      type="button"
                      size="sm"
                      variant={active ? "default" : "outline"}
                      aria-pressed={active}
                      className="rounded-full px-3 text-xs font-bold"
                      onClick={() => toggleStudyDay(d.id)}
                    >
                      {d.short[locale]}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-3 pt-1">
              <div className="space-y-1">
                <label
                  htmlFor="plan-target-date"
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  {ct.targetDateLabel}
                </label>
                <Input
                  id="plan-target-date"
                  type="date"
                  value={plan.targetDate}
                  onChange={(e) => setPlan((p) => ({ ...p, targetDate: e.target.value }))}
                  className="w-44"
                />
              </div>

              <Button type="button" variant="hero" onClick={handleSavePlan} className="gap-1.5">
                <Sparkles className="size-4" aria-hidden />
                {ct.savePlanBtn}
              </Button>
            </div>

            {planSavedNotice && (
              <p className="rounded-xl bg-emerald-500/15 px-3 py-2 text-xs font-bold text-emerald-800 dark:text-emerald-200">
                {planSavedNotice}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Individual Roadmap (Current -> Target) */}
        <Card className="border-2 border-foreground/15 lg:col-span-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-extrabold">
              <Compass className="size-5 text-primary" aria-hidden />
              {ct.roadmapTitle}
            </CardTitle>
            <CardDescription>{ct.roadmapDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {roadmap.map((step) => (
              <div
                key={step.id}
                className={`flex items-start justify-between gap-3 rounded-2xl border p-3.5 ${
                  step.completed
                    ? "border-emerald-500/40 bg-emerald-500/5"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                      step.completed ? "bg-emerald-600 text-white" : "bg-primary/15 text-primary"
                    }`}
                    dir="ltr"
                  >
                    {step.order}
                  </span>
                  <div className="space-y-0.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-sm font-extrabold text-foreground">
                        {step.title[locale]}
                      </span>
                      <Badge variant="outline" className="text-[10px]">
                        {step.focusTag[locale]}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{step.description[locale]}</p>
                  </div>
                </div>
                <Button asChild size="sm" variant="ghost" className="shrink-0 rounded-full text-xs">
                  <Link to={step.to}>
                    {step.completed ? ct.doneLabel : ct.startStepBtn}
                    <ArrowRight className="ms-1 size-3 rtl:rotate-180" aria-hidden />
                  </Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Section 2: Realistic Weekly Study Schedule */}
      <Card className="border-2 border-foreground/15">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-extrabold">
            <Clock className="size-5 text-primary" aria-hidden />
            {ct.weeklyScheduleTitle}
          </CardTitle>
          <CardDescription>{ct.weeklyScheduleDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {weeklySchedule.map((slot) => (
              <Link
                key={slot.day}
                to={slot.to}
                className="flex flex-col justify-between gap-2 rounded-2xl border border-border bg-muted/20 p-4 transition-colors hover:border-primary/50 hover:bg-primary/5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-extrabold text-foreground">
                    {slot.dayLabel[locale]}
                  </span>
                  <Badge variant="secondary" dir="ltr" className="text-[11px]">
                    {slot.minutes}m
                  </Badge>
                </div>
                <div className="text-xs font-bold text-primary">{slot.focus[locale]}</div>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {slot.activity[locale]}
                </p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Personal Learning Calendar CRUD + Configurable Smart Reminders */}
      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="border-2 border-foreground/15 lg:col-span-8">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg font-extrabold">
                <CalendarDays className="size-5 text-primary" aria-hidden />
                {ct.calendarSectionTitle}
              </CardTitle>
              <CardDescription>{ct.calendarSectionDesc}</CardDescription>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="gap-1.5 rounded-full text-xs"
              onClick={() => {
                setEvents(personalPlanStorage.regenerateSuggestedEvents());
                setActiveReminders(computeActiveReminders());
              }}
            >
              <RefreshCw className="size-3.5" aria-hidden />
              {ct.syncRoadmapBtn}
            </Button>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Add Event Bar */}
            <div className="grid gap-2 rounded-2xl border border-border bg-muted/20 p-3 sm:grid-cols-[1.5fr_0.9fr_0.9fr_auto]">
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={ct.newEventPlaceholder}
                aria-label={ct.newEventPlaceholder}
              />
              <Input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                aria-label={ct.eventDateLabel}
              />
              <select
                value={newKind}
                onChange={(e) => setNewKind(e.target.value as CalendarEventKind)}
                aria-label={ct.eventKindLabel}
                className="h-9 rounded-md border border-input bg-background px-2.5 text-xs font-semibold text-foreground"
              >
                {(Object.keys(EVENT_KIND_META) as CalendarEventKind[]).map((k) => (
                  <option key={k} value={k}>
                    {EVENT_KIND_META[k].label[locale]}
                  </option>
                ))}
              </select>
              <Button
                type="button"
                onClick={handleAddEvent}
                disabled={!newTitle.trim()}
                className="gap-1"
              >
                <Plus className="size-4" aria-hidden />
                {ct.addEventBtn}
              </Button>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-1.5">
              <Button
                type="button"
                size="sm"
                variant={filterKind === "all" ? "default" : "outline"}
                className="rounded-full text-xs"
                onClick={() => setFilterKind("all")}
              >
                {ct.filterAll}
              </Button>
              {(Object.keys(EVENT_KIND_META) as CalendarEventKind[]).map((k) => (
                <Button
                  key={k}
                  type="button"
                  size="sm"
                  variant={filterKind === k ? "default" : "outline"}
                  className="rounded-full text-xs"
                  onClick={() => setFilterKind(k)}
                >
                  {EVENT_KIND_META[k].label[locale]}
                </Button>
              ))}
            </div>

            {/* Event List */}
            <div className="space-y-2.5">
              {visibleEvents.length === 0 ? (
                <p className="py-6 text-center text-xs text-muted-foreground">{ct.noEventsText}</p>
              ) : (
                visibleEvents.map((evt) => {
                  const meta = EVENT_KIND_META[evt.kind];
                  return (
                    <div
                      key={evt.id}
                      className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-3.5 transition-colors ${
                        evt.completed
                          ? "border-emerald-500/35 bg-emerald-500/5 opacity-80"
                          : "border-border bg-card"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => handleToggleEvent(evt.id)}
                          aria-label={evt.completed ? ct.markIncompleteAria : ct.markCompleteAria}
                          className="mt-0.5 text-primary hover:scale-110 transition-transform"
                        >
                          {evt.completed ? (
                            <CheckCircle2 className="size-5 text-emerald-600" />
                          ) : (
                            <Circle className="size-5 text-muted-foreground" />
                          )}
                        </button>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`text-sm font-bold ${
                                evt.completed
                                  ? "line-through text-muted-foreground"
                                  : "text-foreground"
                              }`}
                            >
                              {evt.title}
                            </span>
                            <Badge variant="outline" className={`text-[10px] ${meta.badgeClass}`}>
                              {meta.label[locale]}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground" dir="ltr">
                            📅 {evt.date}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {evt.linkTo && (
                          <Button
                            asChild
                            size="sm"
                            variant="ghost"
                            className="rounded-full text-xs"
                          >
                            <Link to={evt.linkTo}>
                              {ct.openEventLink}
                              <ArrowRight className="ms-1 size-3 rtl:rotate-180" aria-hidden />
                            </Link>
                          </Button>
                        )}
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          aria-label={ct.deleteEventAria}
                          onClick={() => handleDeleteEvent(evt.id)}
                        >
                          <Trash2 className="size-4 text-muted-foreground hover:text-destructive" />
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Configurable Smart Reminders Panel */}
        <Card className="border-2 border-foreground/15 lg:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-extrabold">
              <Bell className="size-5 text-primary" aria-hidden />
              {ct.remindersTitle}
            </CardTitle>
            <CardDescription>{ct.remindersDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {reminderToggles.map(({ key, label }) => {
                const enabled = remindersCfg[key];
                return (
                  <button
                    key={key}
                    type="button"
                    role="switch"
                    aria-checked={enabled}
                    onClick={() => handleToggleReminder(key)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-start text-xs font-bold transition-colors ${
                      enabled
                        ? "border-primary/40 bg-primary/5 text-foreground"
                        : "border-border bg-card text-muted-foreground"
                    }`}
                  >
                    <span>{label}</span>
                    <span
                      className={`inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
                        enabled ? "bg-primary justify-end" : "bg-muted justify-start"
                      }`}
                    >
                      <span className="size-4 rounded-full bg-background shadow-xs" />
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-1.5 border-t border-border pt-3">
              <label
                htmlFor="reminder-time"
                className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              >
                {ct.reminderTimeLabel}
              </label>
              <Input
                id="reminder-time"
                type="time"
                value={remindersCfg.preferredTime}
                onChange={(e) => handleReminderTimeChange(e.target.value)}
              />
              <p className="text-[11px] text-muted-foreground">{ct.remindersControlNote}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
