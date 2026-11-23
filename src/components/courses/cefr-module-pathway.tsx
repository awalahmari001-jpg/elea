import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, CheckCircle2, ClipboardCheck, Layers, ShieldCheck } from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { CefrLevel } from "@/content/courses";
import type { LessonSkill } from "@/content/lessons";
import { buildCefrLevelReport, type CefrLevelCompletionReport } from "@/lib/cefr-modules";
import { format } from "@/lib/i18n/messages";
import type { LessonStatus } from "@/lib/learning-record";

export interface CefrModulePathwayProps {
  level: CefrLevel;
  onSelectSkillFilter: (skill: LessonSkill) => void;
}

export function CefrModulePathway({ level, onSelectSkillFilter }: CefrModulePathwayProps) {
  const { t, locale } = useI18n();
  const pt = t.pathways;
  const dt = t.dashboard;

  const [report, setReport] = useState<CefrLevelCompletionReport | null>(null);

  useEffect(() => {
    setReport(buildCefrLevelReport(level));
  }, [level]);

  if (!report) return null;

  const statusText = (s: LessonStatus) => {
    switch (s) {
      case "mastered":
        return dt.statusMastered;
      case "completed":
        return dt.statusCompleted;
      case "in_progress":
        return dt.statusInProgress;
      case "requires_revision":
        return dt.statusRequiresRevision;
      default:
        return dt.statusNotStarted;
    }
  };

  const statusBadgeClass = (s: LessonStatus) => {
    switch (s) {
      case "mastered":
        return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300";
      case "completed":
        return "bg-secondary text-secondary-foreground";
      case "in_progress":
        return "bg-primary/15 text-primary";
      case "requires_revision":
        return "bg-destructive/15 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section className="border-t border-border bg-muted/25 py-12 md:py-16">
      <div className="container-page space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-2">
            <p className="eyebrow inline-flex items-center gap-1.5 text-primary">
              <Layers className="size-3.5" aria-hidden />
              {pt.cefrModulesEyebrow}
            </p>
            <h2 className="display-heading text-2xl font-extrabold md:text-3xl">
              {format(pt.cefrModulesTitle, { level })}
            </h2>
            <p className="text-sm text-muted-foreground">{pt.cefrModulesSubtitle}</p>
          </div>

          <div className="flex flex-wrap gap-3 text-xs">
            <div className="rounded-xl border border-border bg-card px-3.5 py-2">
              <div className="text-muted-foreground">{dt.completionMetricLabel}</div>
              <div className="mt-0.5 text-base font-extrabold text-primary" dir="ltr">
                {report.activityCompletionPct}%
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card px-3.5 py-2">
              <div className="text-muted-foreground">{dt.masteryMetricLabel}</div>
              <div
                className="mt-0.5 text-base font-extrabold text-emerald-600 dark:text-emerald-400"
                dir="ltr"
              >
                {report.assessedMasteryPct}%
              </div>
            </div>
          </div>
        </div>

        {/* Standardized 10-Module Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {report.modules.map((mod) => (
            <div
              key={mod.number}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-4 shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-extrabold text-primary" dir="ltr">
                    {String(mod.number).padStart(2, "0")}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${statusBadgeClass(mod.status)}`}
                  >
                    {statusText(mod.status)}
                  </span>
                </div>
                <h3 className="text-sm font-bold leading-snug text-foreground">
                  {mod.title[locale]}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {mod.outcome[locale]}
                </p>
              </div>

              <div className="mt-4 space-y-2.5">
                <div>
                  <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
                    <span dir="ltr">
                      {mod.completedCount}/{mod.totalCount}
                    </span>
                    <span dir="ltr">{mod.pct}%</span>
                  </div>
                  <Progress value={mod.pct} className="h-1.5" />
                </div>

                {mod.action.kind === "skill" ? (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="w-full justify-between text-xs"
                    onClick={() => {
                      onSelectSkillFilter(
                        mod.action.kind === "skill" ? mod.action.skill : "grammar",
                      );
                      if (typeof document !== "undefined") {
                        document
                          .getElementById("course-lessons")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    <span>{pt.cefrFilterLessonsBtn}</span>
                    <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden />
                  </Button>
                ) : mod.action.kind === "hash" ? (
                  <Button
                    asChild
                    size="sm"
                    variant="secondary"
                    className="w-full justify-between text-xs"
                  >
                    <a href="#assessments">
                      <span>{pt.cefrJumpAssessmentBtn}</span>
                      <ClipboardCheck className="size-3.5" aria-hidden />
                    </a>
                  </Button>
                ) : mod.action.to === "/cefr-mastery" ? (
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="w-full justify-between text-xs"
                  >
                    <Link to="/cefr-mastery" search={{ level }}>
                      <span>{pt.cefrOpenModuleBtn}</span>
                      <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden />
                    </Link>
                  </Button>
                ) : mod.action.to === "/self-learning" ? (
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="w-full justify-between text-xs"
                  >
                    <Link to="/self-learning" search={{ level }}>
                      <span>{pt.cefrOpenModuleBtn}</span>
                      <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="w-full justify-between text-xs"
                  >
                    <Link to="/speaking">
                      <span>{pt.cefrOpenModuleBtn}</span>
                      <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 7-Skill CEFR Level Completion Gate */}
        <Card className="border-primary/25">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <ShieldCheck className="size-5 text-primary" aria-hidden />
                  {pt.cefrGateTitle}
                </CardTitle>
                <CardDescription>{pt.cefrGateSubtitle}</CardDescription>
              </div>
              <Badge
                variant={report.eligibleForLevelCompletion ? "default" : "secondary"}
                className={report.eligibleForLevelCompletion ? "bg-emerald-600" : ""}
              >
                {report.eligibleForLevelCompletion ? (
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 className="size-3.5" aria-hidden />
                    {pt.cefrGateReady}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1">
                    <Award className="size-3.5" aria-hidden />
                    {pt.cefrGatePending}
                  </span>
                )}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
              {report.skillGates.map((gate) => (
                <div
                  key={gate.skill}
                  className="rounded-xl border border-border/75 bg-muted/30 p-3 text-xs"
                >
                  <div className="font-semibold text-foreground">{gate.label[locale]}</div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="font-mono font-bold" dir="ltr">
                      {gate.scorePct}%
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        gate.status === "passed"
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                          : gate.status === "below_target"
                            ? "bg-destructive/15 text-destructive"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {gate.status === "passed"
                        ? pt.cefrGatePassed
                        : gate.status === "below_target"
                          ? pt.cefrGateBelow
                          : pt.cefrGateNotAssessed}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
