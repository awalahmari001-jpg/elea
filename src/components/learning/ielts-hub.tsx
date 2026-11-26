import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  Headphones,
  Mic,
  PenLine,
  Target,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

import ieltsImage from "@/assets/path-ielts.webp";
import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { courseLessons, type LessonSkill } from "@/content/lessons";
import { useLearner } from "@/hooks/use-learner";
import {
  computeIeltsDashboard,
  IELTS_PREP_AREAS,
  ieltsTracker,
  VALID_TARGET_BANDS,
  type IeltsDashboardSummary,
  type IeltsSkillKey,
} from "@/lib/ielts-tracker";
import { lockedLessonIds } from "@/lib/lesson-access";
import { CourseAssessmentPanel } from "./course-assessment-panel";
import { LessonList } from "./lesson-list";

const SKILLS: { key: IeltsSkillKey; Icon: typeof Headphones }[] = [
  { key: "listening", Icon: Headphones },
  { key: "reading", Icon: BookOpen },
  { key: "writing", Icon: PenLine },
  { key: "speaking", Icon: Mic },
];

export function IeltsHub() {
  const { t, locale, dir } = useI18n();
  const pt = t.pathways;
  const { courses, hasJoined, joinCourse } = useLearner();
  const joined = hasJoined("ielts");

  const [skill, setSkill] = useState<LessonSkill | "all">("all");
  const [dashboard, setDashboard] = useState<IeltsDashboardSummary | null>(null);

  // Mock test logger state
  const [mockListening, setMockListening] = useState("6.0");
  const [mockReading, setMockReading] = useState("6.0");
  const [mockWriting, setMockWriting] = useState("5.5");
  const [mockSpeaking, setMockSpeaking] = useState("6.0");
  const [mockSavedNote, setMockSavedNote] = useState<string | null>(null);

  const refreshDashboard = () => {
    setDashboard(computeIeltsDashboard());
  };

  useEffect(() => {
    refreshDashboard();
  }, []);

  const visible = courseLessons("ielts").filter((l) => skill === "all" || l.skill === skill);

  const handleSaveMock = () => {
    ieltsTracker.recordMockTest({
      listening: Number(mockListening) || 5.5,
      reading: Number(mockReading) || 5.5,
      writing: Number(mockWriting) || 5.5,
      speaking: Number(mockSpeaking) || 5.5,
    });
    refreshDashboard();
    setMockSavedNote(pt.ieltsMockSavedNote);
  };

  return (
    <div dir={dir}>
      <header className="relative overflow-hidden bg-inverse text-inverse-foreground">
        <img
          src={ieltsImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="container-page relative py-12 md:py-16">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default" className="bg-accent text-accent-foreground">
              {dashboard?.plan.track === "general" ? pt.ieltsGeneral : pt.ieltsAcademic}
            </Badge>
            <Badge
              variant="outline"
              className="border-inverse-foreground/30 text-inverse-foreground"
              dir="ltr"
            >
              {pt.ieltsTargetLabel}: {dashboard?.plan.targetBand.toFixed(1) ?? "7.0"}
            </Badge>
          </div>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            {t.learning.ieltsTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-inverse-muted">{t.learning.ieltsIntro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              variant="hero"
              size="lg"
              disabled={joined}
              onClick={() => {
                joinCourse("ielts");
                toast.success(t.learning.joinedUnlock);
              }}
            >
              {joined && <Check aria-hidden />}
              {joined ? t.courses.joined : t.learning.joinToUnlock}
            </Button>
            <Button asChild variant="accent" size="lg">
              <Link to="/mock-exams">
                <ClipboardCheck aria-hidden />
                {t.nav.mockExams}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-inverse-foreground/30 bg-transparent text-inverse-foreground hover:bg-inverse-foreground/10"
            >
              <Link to="/ielts-vocabulary">
                <BookOpen aria-hidden />
                {t.vocab.openIeltsVocabCta}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-inverse-foreground/30 bg-transparent text-inverse-foreground hover:bg-inverse-foreground/10"
            >
              <Link to="/speaking">
                <Mic aria-hidden />
                {t.learning.browseSpeaking}
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Independent IELTS Dashboard: Track + Band Target Planner + 4-Skill Rubrics + Mock Logger */}
      {dashboard && (
        <section className="border-b border-border bg-muted/25 py-10">
          <div className="container-page space-y-8">
            {/* Track & Target Band Controls + KPI Strip */}
            <div className="grid gap-6 lg:grid-cols-12">
              <Card className="lg:col-span-7">
                <CardHeader className="pb-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Target className="size-5 text-primary" aria-hidden />
                      {pt.ieltsPlannerTitle}
                    </CardTitle>
                    <div className="flex gap-1.5" role="group" aria-label={pt.ieltsTrackLabel}>
                      <Button
                        type="button"
                        size="sm"
                        variant={dashboard.plan.track === "academic" ? "default" : "outline"}
                        onClick={() => {
                          ieltsTracker.setTrack("academic");
                          refreshDashboard();
                        }}
                      >
                        {pt.ieltsAcademic}
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant={dashboard.plan.track === "general" ? "default" : "outline"}
                        onClick={() => {
                          ieltsTracker.setTrack("general");
                          refreshDashboard();
                        }}
                      >
                        {pt.ieltsGeneral}
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="flex items-center gap-1.5 text-xs">
                    <AlertCircle className="size-3.5 shrink-0 text-amber-500" aria-hidden />
                    {pt.ieltsEstimateDisclaimer}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground">
                      {pt.ieltsTargetLabel}:
                    </span>
                    {VALID_TARGET_BANDS.map((b) => (
                      <Button
                        key={b}
                        type="button"
                        size="sm"
                        variant={dashboard.plan.targetBand === b ? "default" : "outline"}
                        className="h-7 px-2.5 text-xs"
                        onClick={() => {
                          ieltsTracker.setTargetBand(b);
                          refreshDashboard();
                        }}
                        dir="ltr"
                      >
                        {b.toFixed(1)}
                      </Button>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-2xl border border-border bg-muted/40 p-3">
                      <div className="text-[11px] text-muted-foreground">
                        {pt.ieltsCurrentEstLabel}
                      </div>
                      <div className="mt-1 text-2xl font-extrabold text-primary" dir="ltr">
                        {dashboard.currentBand.toFixed(1)}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-border bg-muted/40 p-3">
                      <div className="text-[11px] text-muted-foreground">{pt.ieltsTargetLabel}</div>
                      <div className="mt-1 text-2xl font-extrabold text-foreground" dir="ltr">
                        {dashboard.plan.targetBand.toFixed(1)}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-border bg-muted/40 p-3">
                      <div className="text-[11px] text-muted-foreground">{pt.ieltsGapLabel}</div>
                      <div
                        className={`mt-1 text-2xl font-extrabold ${
                          dashboard.bandGap === 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-amber-600 dark:text-amber-400"
                        }`}
                        dir="ltr"
                      >
                        {dashboard.bandGap === 0
                          ? pt.ieltsGapZero
                          : `+${dashboard.bandGap.toFixed(1)}`}
                      </div>
                    </div>
                  </div>

                  {/* Independent 4-Skill Band Estimates */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {SKILLS.map(({ key, Icon }) => {
                      const latest = dashboard.plan.skillEstimates[key];
                      const prev = dashboard.plan.previousEstimates[key];
                      const delta = Math.round((latest - prev) * 10) / 10;
                      const pct = Math.min(
                        100,
                        Math.round((latest / dashboard.plan.targetBand) * 100),
                      );
                      return (
                        <div
                          key={key}
                          className="rounded-xl border border-border/80 bg-card p-3 text-xs"
                        >
                          <div className="flex items-center justify-between text-muted-foreground">
                            <span className="font-semibold text-foreground">{t.learning[key]}</span>
                            <Icon className="size-3.5 text-primary" aria-hidden />
                          </div>
                          <div className="mt-1.5 flex items-baseline justify-between" dir="ltr">
                            <span className="text-lg font-extrabold text-primary">
                              {latest.toFixed(1)}
                            </span>
                            {delta !== 0 && (
                              <span
                                className={
                                  delta > 0
                                    ? "text-[11px] font-bold text-emerald-600"
                                    : "text-[11px] font-bold text-destructive"
                                }
                              >
                                {delta > 0 ? `+${delta.toFixed(1)}` : delta.toFixed(1)}
                              </span>
                            )}
                          </div>
                          <Progress value={pct} className="mt-1.5 h-1.5" />
                        </div>
                      );
                    })}
                  </div>

                  {/* Actionable Band-Gap Recommendations */}
                  <div className="grid gap-2.5 sm:grid-cols-3">
                    {dashboard.recommendations.map((rec) => (
                      <div
                        key={rec.skill}
                        className="rounded-xl border border-border/75 bg-muted/30 p-3 text-xs"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-foreground">{rec.title[locale]}</span>
                          {rec.gap > 0 && (
                            <Badge variant="secondary" className="text-[10px]" dir="ltr">
                              -{rec.gap.toFixed(1)}
                            </Badge>
                          )}
                        </div>
                        <p className="mt-1 leading-relaxed text-muted-foreground">
                          {rec.tip[locale]}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Official Rubric Breakdown + Mock Test Logger */}
              <div className="space-y-6 lg:col-span-5">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Award className="size-4 text-primary" aria-hidden />
                      {pt.ieltsRubricsTitle}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2 text-xs">
                    <div className="space-y-2 rounded-xl bg-muted/40 p-3">
                      <div className="font-bold text-foreground">{pt.ieltsWritingRubric}</div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{pt.ieltsCritTask}</span>
                        <span className="font-bold" dir="ltr">
                          {dashboard.rubrics.writing.taskResponse.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{pt.ieltsCritCoherence}</span>
                        <span className="font-bold" dir="ltr">
                          {dashboard.rubrics.writing.coherenceCohesion.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{pt.ieltsCritLexical}</span>
                        <span className="font-bold text-primary" dir="ltr">
                          {dashboard.rubrics.writing.lexicalResource.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{pt.ieltsCritGrammar}</span>
                        <span className="font-bold" dir="ltr">
                          {dashboard.rubrics.writing.grammaticalRange.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 rounded-xl bg-muted/40 p-3">
                      <div className="font-bold text-foreground">{pt.ieltsSpeakingRubric}</div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{pt.ieltsCritFluency}</span>
                        <span className="font-bold" dir="ltr">
                          {dashboard.rubrics.speaking.fluencyCoherence.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{pt.ieltsCritLexical}</span>
                        <span className="font-bold text-primary" dir="ltr">
                          {dashboard.rubrics.speaking.lexicalResource.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{pt.ieltsCritGrammar}</span>
                        <span className="font-bold" dir="ltr">
                          {dashboard.rubrics.speaking.grammaticalRange.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{pt.ieltsCritPronunciation}</span>
                        <span className="font-bold" dir="ltr">
                          {dashboard.rubrics.speaking.pronunciation.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timed Mock Test Logger */}
                <Card id="ielts-mocks">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <ClipboardCheck className="size-4 text-primary" aria-hidden />
                      {pt.ieltsMockTitle}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-4 gap-2 text-xs">
                      {[
                        {
                          id: "mock-l",
                          label: t.learning.listening,
                          val: mockListening,
                          set: setMockListening,
                        },
                        {
                          id: "mock-r",
                          label: t.learning.reading,
                          val: mockReading,
                          set: setMockReading,
                        },
                        {
                          id: "mock-w",
                          label: t.learning.writing,
                          val: mockWriting,
                          set: setMockWriting,
                        },
                        {
                          id: "mock-s",
                          label: t.learning.speaking,
                          val: mockSpeaking,
                          set: setMockSpeaking,
                        },
                      ].map((f) => (
                        <div key={f.id} className="space-y-1">
                          <label htmlFor={f.id} className="block truncate font-semibold">
                            {f.label}
                          </label>
                          <Input
                            id={f.id}
                            type="number"
                            step="0.5"
                            min="4"
                            max="9"
                            value={f.val}
                            onChange={(e) => {
                              f.set(e.target.value);
                              setMockSavedNote(null);
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Button type="button" size="sm" onClick={handleSaveMock}>
                        <TrendingUp className="me-1.5 size-3.5" aria-hidden />
                        {pt.ieltsMockSaveBtn}
                      </Button>
                      {mockSavedNote && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                          <CheckCircle2 className="size-3.5" aria-hidden />
                          {mockSavedNote}
                        </span>
                      )}
                    </div>

                    {dashboard.plan.mockTests.length === 0 ? (
                      <p className="text-xs text-muted-foreground">{pt.ieltsMockEmpty}</p>
                    ) : (
                      <div className="space-y-1.5 border-t border-border/70 pt-2.5 text-xs">
                        <div className="font-semibold text-muted-foreground">
                          {pt.ieltsMockHistoryTitle}
                        </div>
                        {dashboard.plan.mockTests.slice(0, 3).map((m) => (
                          <div
                            key={m.id}
                            className="flex items-center justify-between rounded-lg bg-muted/40 px-2.5 py-1.5"
                            dir="ltr"
                          >
                            <span className="text-muted-foreground">
                              {m.date} · {m.track === "academic" ? "AC" : "GT"}
                            </span>
                            <span className="font-mono font-bold text-primary">
                              Band {m.overallBand.toFixed(1)} (L{m.listening} R{m.reading} W
                              {m.writing} S{m.speaking})
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 10 Structured IELTS Preparation Areas */}
            <div className="space-y-3">
              <h2 className="display-heading text-xl font-bold">{pt.ieltsPrepAreasTitle}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {IELTS_PREP_AREAS.map((area) => {
                  const note =
                    dashboard.plan.track === "general" ? area.generalNote : area.academicNote;
                  return (
                    <div
                      key={area.id}
                      className="flex flex-col justify-between rounded-2xl border border-border bg-card p-3.5 text-xs"
                    >
                      <div>
                        <h3 className="font-bold text-foreground">{area.label[locale]}</h3>
                        <p className="mt-1 leading-relaxed text-muted-foreground">{note[locale]}</p>
                      </div>
                      <div className="mt-3">
                        {area.skillFilter === "vocab" ? (
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="h-7 w-full text-xs"
                          >
                            <Link to="/ielts-vocabulary">{pt.cefrOpenModuleBtn}</Link>
                          </Button>
                        ) : area.skillFilter === "grammar" ? (
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="h-7 w-full text-xs"
                          >
                            <Link to="/cefr-mastery" search={{ level: "B2" }}>
                              {pt.cefrOpenModuleBtn}
                            </Link>
                          </Button>
                        ) : area.skillFilter === "mock" ? (
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="h-7 w-full text-xs"
                          >
                            <a href="#ielts-mocks">{pt.cefrOpenModuleBtn}</a>
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="h-7 w-full text-xs"
                            onClick={() => {
                              setSkill(area.skillFilter as LessonSkill);
                              if (typeof document !== "undefined") {
                                document
                                  .getElementById("ielts-lessons")
                                  ?.scrollIntoView({ behavior: "smooth" });
                              }
                            }}
                          >
                            {pt.cefrFilterLessonsBtn}
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Existing IELTS Lessons & Assessments (100% Preserved) */}
      <div id="ielts-lessons" className="container-page py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-bold">{t.learning.lessons}</h2>
        </div>
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label={t.learning.lessons}>
          <Button
            variant={skill === "all" ? "default" : "outline"}
            aria-pressed={skill === "all"}
            onClick={() => setSkill("all")}
          >
            {t.learning.all}
          </Button>
          {SKILLS.map(({ key, Icon }) => (
            <Button
              key={key}
              variant={skill === key ? "default" : "outline"}
              aria-pressed={skill === key}
              onClick={() => setSkill(key)}
            >
              <Icon aria-hidden />
              {t.learning[key]}
            </Button>
          ))}
        </div>
        <LessonList
          lessons={visible}
          lockedIds={lockedLessonIds(courseLessons("ielts"), courses)}
        />
        <CourseAssessmentPanel course="ielts" />

        <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-6">
          <h3 className="font-bold">{t.learning.sources}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t.learning.ieltsNote}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {[
              {
                label: "IELTS.org Sample Tests",
                href: "https://ielts.org/take-a-test/preparation-resources/sample-test-questions",
              },
              {
                label: "British Council IELTS",
                href: "https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests",
              },
              { label: "IDP IELTS Prepare", href: "https://ielts.idp.com/prepare" },
            ].map((ext) => (
              <a
                key={ext.href}
                href={ext.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold hover:bg-muted"
              >
                {ext.label}
                <ExternalLink className="size-3" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
