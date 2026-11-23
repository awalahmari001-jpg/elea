import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Briefcase,
  Check,
  CheckCircle2,
  FileText,
  Lock,
  MessageSquare,
  Mic,
  MicOff,
  Play,
  Presentation,
  Search,
  Sparkles,
  Square,
  Users,
  Volume2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import { useI18n } from "@/components/i18n-provider";
import { HighlightedText } from "@/components/learning/highlighted-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CefrLevel } from "@/content/courses";
import {
  BUSINESS_COMM_SKILLS,
  BUSINESS_EXPRESSION_CATEGORIES,
  BUSINESS_EXPRESSIONS,
  BUSINESS_MEETING_STAGES,
  BUSINESS_SECTORS,
  BUSINESS_VOCABULARY,
  COVER_LETTER_BLUEPRINT,
  CV_TRANSFORMATIONS,
  INTERVIEW_QUESTION_BANK,
  JOB_DESCRIPTION_DECODER,
  SALARY_NEGOTIATION_SCRIPTS,
  WORKPLACE_ETIQUETTE_TIPS,
  type BusinessAudience,
  type BusinessExpressionCategory,
  type BusinessSectorId,
  type CommunicationSkillModule,
  type MeetingStageModule,
} from "@/content/business";
import { playDialogueSequence, playSpeech, useSpeech } from "@/hooks/use-speech";
import { format } from "@/lib/i18n/messages";
import { learnerStorage, type BusinessCourseProgress } from "@/lib/learner-storage";
import { isBusinessItemUnlocked } from "@/lib/lesson-access";

type BusinessTab = "vocab" | "expressions" | "comm" | "meetings" | "job-prep";
type InterviewCefr = Exclude<CefrLevel, "A1">;
const INTERVIEW_LEVELS: InterviewCefr[] = ["A2", "B1", "B2", "C1", "C2"];

export function BusinessCourseHub() {
  const { t, locale } = useI18n();
  const [audience, setAudience] = useState<BusinessAudience | "all">("all");
  const [activeTab, setActiveTab] = useState<BusinessTab>("vocab");

  // Vocab & Expressions filters
  const [vocabSearch, setVocabSearch] = useState("");
  const [selectedSector, setSelectedSector] = useState<BusinessSectorId | "all">("all");
  const [selectedExprCat, setSelectedExprCat] = useState<BusinessExpressionCategory | "all">("all");

  // Meetings & Interview state
  const [selectedStageIdx, setSelectedStageIdx] = useState(0);
  const [selectedInterviewId, setSelectedInterviewId] = useState(
    INTERVIEW_QUESTION_BANK[0]?.id ?? "int-01",
  );
  const [interviewLevel, setInterviewLevel] = useState<InterviewCefr>("B2");
  const [starDraft, setStarDraft] = useState("");
  const [starFeedback, setStarFeedback] = useState<"good" | "needs-more" | null>(null);

  const [progress, setProgress] = useState<BusinessCourseProgress>({
    joined: false,
    masteredVocabIds: [],
    completedSkillIds: [],
    completedMeetingIds: [],
    practicedInterviewIds: [],
    updatedAt: "",
  });

  useEffect(() => {
    setProgress(learnerStorage.getBusiness());
  }, []);

  function updateProgress(patch: Partial<Omit<BusinessCourseProgress, "updatedAt">>) {
    const next = learnerStorage.saveBusiness({
      joined: patch.joined ?? progress.joined,
      masteredVocabIds: patch.masteredVocabIds ?? progress.masteredVocabIds,
      completedSkillIds: patch.completedSkillIds ?? progress.completedSkillIds,
      completedMeetingIds: patch.completedMeetingIds ?? progress.completedMeetingIds,
      practicedInterviewIds: patch.practicedInterviewIds ?? progress.practicedInterviewIds,
    });
    setProgress(next);
  }

  function handleJoinCourse() {
    updateProgress({ joined: true });
    toast.success(t.business.joinedToast);
  }

  function toggleMasteredVocab(id: string) {
    const exists = progress.masteredVocabIds.includes(id);
    const nextIds = exists
      ? progress.masteredVocabIds.filter((x) => x !== id)
      : [...progress.masteredVocabIds, id];
    updateProgress({ masteredVocabIds: nextIds });
  }

  const filteredVocab = useMemo(() => {
    const q = vocabSearch.trim().toLowerCase();
    return BUSINESS_VOCABULARY.filter((item) => {
      if (selectedSector !== "all" && item.sector !== selectedSector) return false;
      if (!q) return true;
      return (
        item.term.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.arabic.toLowerCase().includes(q) ||
        item.collocations.some((c) => c.toLowerCase().includes(q)) ||
        item.sector.toLowerCase().includes(q)
      );
    });
  }, [vocabSearch, selectedSector]);

  const filteredExpressions = useMemo(() => {
    if (selectedExprCat === "all") return BUSINESS_EXPRESSIONS;
    return BUSINESS_EXPRESSIONS.filter((e) => e.category === selectedExprCat);
  }, [selectedExprCat]);

  const filteredCommSkills = useMemo(() => {
    if (audience === "all") return BUSINESS_COMM_SKILLS;
    return BUSINESS_COMM_SKILLS.filter((s) => s.audiences.includes(audience));
  }, [audience]);

  const activeMeetingStage =
    BUSINESS_MEETING_STAGES[selectedStageIdx] ?? BUSINESS_MEETING_STAGES[0];
  const activeInterview =
    INTERVIEW_QUESTION_BANK.find((q) => q.id === selectedInterviewId) ?? INTERVIEW_QUESTION_BANK[0];

  const totalCompletedCount =
    progress.masteredVocabIds.length +
    progress.completedSkillIds.length +
    progress.completedMeetingIds.length +
    progress.practicedInterviewIds.length;

  function handleAudienceSwitch(next: BusinessAudience | "all") {
    setAudience(next);
    if (next === "job-seekers") setActiveTab("job-prep");
  }

  function checkStarDraft() {
    const words = (starDraft.trim().match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) ?? []).length;
    const lower = starDraft.toLowerCase();
    const hasActionOrResult =
      /(result|outcome|reduced|increased|improved|saved|achieved|delivered|resolved|led|managed|negotiated|built)/i.test(
        lower,
      );
    if (words >= 25 && hasActionOrResult) {
      setStarFeedback("good");
      if (activeInterview) {
        updateProgress({
          practicedInterviewIds: [...progress.practicedInterviewIds, activeInterview.id],
        });
      }
    } else {
      setStarFeedback("needs-more");
    }
  }

  const formalityLabel = (f: "casual-office" | "neutral-business" | "formal-executive") =>
    f === "casual-office"
      ? t.business.formalityCasual
      : f === "neutral-business"
        ? t.business.formalityNeutral
        : t.business.formalityFormal;

  return (
    <div className="pb-16">
      {/* Hero */}
      <header className="border-b border-border bg-inverse text-inverse-foreground">
        <div className="container-page py-10 md:py-14">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-accent text-accent-foreground">{t.business.eyebrow}</Badge>
            <Badge
              variant="outline"
              className="border-inverse-foreground/25 text-inverse-foreground"
            >
              {format(t.business.progressSummary, { done: totalCompletedCount })}
            </Badge>
          </div>
          <h1 className="display-heading mt-3 max-w-4xl text-3xl md:text-5xl">
            {t.business.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-inverse-muted md:text-lg">
            {t.business.subtitle}
          </p>

          {/* Join CTA + Audience Selector */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button variant="hero" size="lg" disabled={progress.joined} onClick={handleJoinCourse}>
              {progress.joined ? (
                <Check className="size-4" aria-hidden />
              ) : (
                <Briefcase className="size-4" aria-hidden />
              )}
              {progress.joined ? t.business.joinedBadge : t.business.joinCta}
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-inverse-foreground/30 bg-transparent text-inverse-foreground hover:bg-inverse-foreground/10"
            >
              <Link to="/workshops">
                <Presentation className="size-4" aria-hidden />
                {t.business.launchWorkshopsCta}
              </Link>
            </Button>

            <div
              className="flex flex-wrap items-center gap-1.5"
              role="group"
              aria-label={t.business.audienceLabel}
            >
              {(
                [
                  { id: "all", label: t.business.audienceAll },
                  { id: "professionals", label: t.business.audienceProfessionals },
                  { id: "job-seekers", label: t.business.audienceJobSeekers },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={audience === opt.id}
                  onClick={() => handleAudienceSwitch(opt.id)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    audience === opt.id
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-inverse-foreground/25 bg-transparent text-inverse-foreground hover:bg-inverse-foreground/10"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5 Primary Course Tabs */}
          <div className="mt-7 flex flex-wrap gap-2" role="tablist" aria-label={t.business.title}>
            {(
              [
                {
                  id: "vocab",
                  label: `${t.business.tabVocab} (${BUSINESS_VOCABULARY.length})`,
                  Icon: Briefcase,
                },
                {
                  id: "expressions",
                  label: `${t.business.tabExpressions} (${BUSINESS_EXPRESSIONS.length})`,
                  Icon: Sparkles,
                },
                { id: "comm", label: `${t.business.tabComm}`, Icon: MessageSquare },
                { id: "meetings", label: `${t.business.tabMeetings}`, Icon: Users },
                { id: "job-prep", label: `${t.business.tabJobPrep}`, Icon: FileText },
              ] as const
            ).map(({ id, label, Icon }) => (
              <Button
                key={id}
                role="tab"
                aria-selected={activeTab === id}
                variant={activeTab === id ? "accent" : "outline"}
                className={
                  activeTab === id
                    ? "rounded-full text-xs sm:text-sm"
                    : "rounded-full border-inverse-foreground/25 bg-transparent text-xs text-inverse-foreground hover:bg-inverse-foreground/10 sm:text-sm"
                }
                onClick={() => setActiveTab(id)}
              >
                <Icon className="size-4" aria-hidden />
                {label}
              </Button>
            ))}
          </div>
        </div>
      </header>

      <div className="container-page mt-8 space-y-6">
        {/* 12-Module Structured Business English Journey Strip */}
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-3">
            <h2 className="text-base font-bold text-foreground">{t.pathways.bizModulesTitle}</h2>
            <p className="text-xs text-muted-foreground">{t.pathways.bizModulesSubtitle}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {(
              [
                {
                  label: { en: "1. Business Vocabulary", ar: "١. مفردات الأعمال" },
                  tab: "vocab" as const,
                },
                {
                  label: { en: "2. Professional Comm", ar: "٢. التواصل المهني" },
                  tab: "comm" as const,
                },
                {
                  label: { en: "3. Meetings & Discussions", ar: "٣. الاجتماعات" },
                  tab: "meetings" as const,
                },
                {
                  label: { en: "4. Business Writing", ar: "٤. الكتابة المهنية" },
                  tab: "comm" as const,
                },
                {
                  label: { en: "5. Presentations", ar: "٥. العروض التقديمية" },
                  tab: "comm" as const,
                },
                {
                  label: { en: "6. Negotiation Skills", ar: "٦. مهارات التفاوض" },
                  tab: "expressions" as const,
                },
                {
                  label: { en: "7. Sales & Marketing", ar: "٧. المبيعات والتسويق" },
                  tab: "vocab" as const,
                  sector: "marketing" as BusinessSectorId,
                },
                {
                  label: { en: "8. Human Resources", ar: "٨. الموارد البشرية" },
                  tab: "vocab" as const,
                  sector: "hr" as BusinessSectorId,
                },
                {
                  label: { en: "9. Management & Leadership", ar: "٩. الإدارة والقيادة" },
                  tab: "vocab" as const,
                  sector: "management" as BusinessSectorId,
                },
                {
                  label: { en: "10. Job Interviews", ar: "١٠. مقابلات العمل" },
                  tab: "job-prep" as const,
                },
                {
                  label: { en: "11. Workplace Comm", ar: "١١. تواصل بيئة العمل" },
                  tab: "expressions" as const,
                },
              ] as {
                label: { en: string; ar: string };
                tab: BusinessTab;
                sector?: BusinessSectorId;
              }[]
            ).map((mod) => (
              <button
                key={mod.label.en}
                type="button"
                onClick={() => {
                  setActiveTab(mod.tab);
                  if (mod.sector) setSelectedSector(mod.sector);
                }}
                className="rounded-xl border border-border/80 bg-muted/35 px-3 py-2 text-start text-xs font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-primary/10"
              >
                {mod.label[locale]}
              </button>
            ))}
            <Link
              to="/workshops"
              className="flex items-center justify-between rounded-xl border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary/15"
            >
              <span>{locale === "ar" ? "١٢. ورش الأعمال" : "12. Business Workshops"}</span>
              <Presentation className="size-3.5 shrink-0" aria-hidden />
            </Link>
          </div>
        </section>

        {/* TAB 1: 18-SECTOR BUSINESS VOCABULARY */}
        {activeTab === "vocab" && (
          <section className="space-y-5">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  value={vocabSearch}
                  onChange={(e) => setVocabSearch(e.target.value)}
                  placeholder={t.business.searchVocabPlaceholder}
                  className="ps-9"
                  aria-label={t.business.searchVocabPlaceholder}
                />
              </div>

              <div
                className="flex flex-wrap gap-1.5"
                role="group"
                aria-label={t.business.allSectorsLabel}
              >
                <Button
                  size="sm"
                  variant={selectedSector === "all" ? "default" : "outline"}
                  className="rounded-full text-xs"
                  onClick={() => setSelectedSector("all")}
                >
                  {t.business.allSectorsLabel}
                </Button>
                {BUSINESS_SECTORS.map((sector) => (
                  <Button
                    key={sector.id}
                    size="sm"
                    variant={selectedSector === sector.id ? "default" : "outline"}
                    className="rounded-full text-xs"
                    onClick={() => setSelectedSector(sector.id)}
                  >
                    {sector.label[locale]}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredVocab.map((item) => {
                const mastered = progress.masteredVocabIds.includes(item.id);
                const sectorName =
                  BUSINESS_SECTORS.find((s) => s.id === item.sector)?.label[locale] ?? item.sector;
                return (
                  <article
                    key={item.id}
                    className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2" dir="ltr">
                          <h2 className="text-lg font-extrabold text-foreground">{item.term}</h2>
                          <span className="rounded bg-secondary px-2 py-0.5 font-mono text-xs text-primary">
                            {item.ipa}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {item.pos}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-8"
                            onClick={() =>
                              playSpeech(`${item.term}. ${item.example}`, 0.92, "female")
                            }
                            aria-label={`Listen to ${item.term}`}
                          >
                            <Volume2 className="size-4" aria-hidden />
                          </Button>
                          <Button
                            size="sm"
                            variant={mastered ? "default" : "outline"}
                            className="h-8 text-xs"
                            onClick={() => toggleMasteredVocab(item.id)}
                          >
                            <Check className="size-3.5" aria-hidden />
                            {mastered ? t.vocab.masteredBadge : t.vocab.markMastered}
                          </Button>
                        </div>
                      </div>

                      <Badge variant="secondary" className="text-xs">
                        {sectorName}
                      </Badge>
                      <p className="text-sm text-foreground" dir="ltr">
                        {item.definition}
                      </p>
                      <p className="text-sm font-semibold text-primary">{item.arabic}</p>

                      <div className="flex flex-wrap gap-1.5 pt-1" dir="ltr">
                        {item.collocations.map((col) => (
                          <span
                            key={col}
                            className="rounded-full border border-primary/25 bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-foreground"
                          >
                            {col}
                          </span>
                        ))}
                      </div>

                      <p
                        className="rounded-xl bg-secondary/50 p-3 text-sm text-foreground"
                        dir="ltr"
                      >
                        <HighlightedText
                          text={item.example}
                          keywords={[item.term, ...item.collocations]}
                        />
                      </p>
                    </div>

                    <p className="mt-3 border-t border-border/60 pt-2.5 text-xs leading-relaxed text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {t.business.workplaceAppLabel}:
                      </span>{" "}
                      {item.workplaceApplication[locale]}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* TAB 2: BUSINESS IDIOMS, WORKPLACE EXPRESSIONS & PHRASAL VERBS */}
        {activeTab === "expressions" && (
          <section className="space-y-5">
            <div
              className="flex flex-wrap gap-1.5"
              role="group"
              aria-label={t.business.allExprCategories}
            >
              <Button
                size="sm"
                variant={selectedExprCat === "all" ? "default" : "outline"}
                className="rounded-full text-xs"
                onClick={() => setSelectedExprCat("all")}
              >
                {t.business.allExprCategories}
              </Button>
              {BUSINESS_EXPRESSION_CATEGORIES.map((cat) => (
                <Button
                  key={cat.id}
                  size="sm"
                  variant={selectedExprCat === cat.id ? "default" : "outline"}
                  className="rounded-full text-xs"
                  onClick={() => setSelectedExprCat(cat.id)}
                >
                  {cat.label[locale]}
                </Button>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredExpressions.map((expr) => (
                <article
                  key={expr.id}
                  className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2" dir="ltr">
                      <h2 className="text-lg font-extrabold text-foreground">{expr.expression}</h2>
                      <Badge variant="secondary" className="text-xs">
                        {formalityLabel(expr.formality)}
                      </Badge>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8 shrink-0"
                      onClick={() =>
                        playSpeech(`${expr.expression}. ${expr.example}`, 0.92, "male")
                      }
                      aria-label={`Listen to ${expr.expression}`}
                    >
                      <Volume2 className="size-4" aria-hidden />
                    </Button>
                  </div>
                  <p className="text-sm text-foreground" dir="ltr">
                    {expr.meaning}
                  </p>
                  <p className="text-sm font-semibold text-primary">{expr.arabic}</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {t.business.usageContextLabel}:
                    </span>{" "}
                    {expr.context[locale]}
                  </p>
                  <p className="rounded-xl bg-secondary/50 p-3 text-sm text-foreground" dir="ltr">
                    <HighlightedText text={expr.example} keywords={[expr.expression]} />
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* TAB 3: 15 PROFESSIONAL COMMUNICATION SKILLS */}
        {activeTab === "comm" && (
          <section className="space-y-4">
            {!progress.joined && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-500/35 bg-amber-500/10 p-4 text-sm">
                <p className="text-foreground">{t.business.lockedExplain}</p>
                <Button size="sm" onClick={handleJoinCourse}>
                  {t.business.joinCta}
                </Button>
              </div>
            )}

            <div className="space-y-4">
              {filteredCommSkills.map((skill, idx) => {
                const unlocked = isBusinessItemUnlocked(idx, progress.joined);
                const done = progress.completedSkillIds.includes(skill.id);
                return (
                  <CommSkillCard
                    key={skill.id}
                    skill={skill}
                    unlocked={unlocked}
                    isFreePreview={idx === 0}
                    completed={done}
                    onUnlockRequest={handleJoinCourse}
                    onComplete={() =>
                      updateProgress({
                        completedSkillIds: [...progress.completedSkillIds, skill.id],
                      })
                    }
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* TAB 4: 15-STAGE MEETINGS & WORKPLACE COMMUNICATION LAB */}
        {activeTab === "meetings" && activeMeetingStage && (
          <section className="space-y-5">
            {!progress.joined && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-500/35 bg-amber-500/10 p-4 text-sm">
                <p className="text-foreground">{t.business.lockedExplain}</p>
                <Button size="sm" onClick={handleJoinCourse}>
                  {t.business.joinCta}
                </Button>
              </div>
            )}

            {/* 15-Stage Selector Grid */}
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-5" role="tablist">
              {BUSINESS_MEETING_STAGES.map((st, idx) => {
                const unlocked = isBusinessItemUnlocked(idx, progress.joined);
                const done = progress.completedMeetingIds.includes(st.id);
                const selected = idx === selectedStageIdx;
                return (
                  <button
                    key={st.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setSelectedStageIdx(idx)}
                    className={`flex flex-col items-start rounded-xl border p-2.5 text-start text-xs transition-colors ${
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary/50"
                    }`}
                  >
                    <div className="flex w-full items-center justify-between font-bold">
                      <span>#{st.stage}</span>
                      {done ? (
                        <CheckCircle2 className="size-3.5 text-emerald-400" aria-hidden />
                      ) : !unlocked ? (
                        <Lock className="size-3 opacity-70" aria-hidden />
                      ) : null}
                    </div>
                    <span className="mt-1 line-clamp-2 opacity-90">{st.title[locale]}</span>
                  </button>
                );
              })}
            </div>

            <MeetingStagePlayer
              key={activeMeetingStage.id}
              stage={activeMeetingStage}
              unlocked={isBusinessItemUnlocked(selectedStageIdx, progress.joined)}
              completed={progress.completedMeetingIds.includes(activeMeetingStage.id)}
              onUnlockRequest={handleJoinCourse}
              onComplete={() =>
                updateProgress({
                  completedMeetingIds: [...progress.completedMeetingIds, activeMeetingStage.id],
                })
              }
            />
          </section>
        )}

        {/* TAB 5: JOB PREPARATION & STAR INTERVIEW TRAINING */}
        {activeTab === "job-prep" && activeInterview && (
          <div className="space-y-8">
            {/* A. Behavioural STAR & Competency Interview Bank (A2–C2) */}
            <section className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-bold text-foreground">
                  {t.business.interviewBankTitle}
                </h2>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-semibold text-muted-foreground">
                    {t.business.selectCefrModel}:
                  </span>
                  {INTERVIEW_LEVELS.map((lvl) => (
                    <Button
                      key={lvl}
                      size="sm"
                      variant={interviewLevel === lvl ? "default" : "outline"}
                      className="h-7 rounded-full px-3 text-xs"
                      onClick={() => setInterviewLevel(lvl)}
                    >
                      {lvl}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Interview Question Selector */}
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                {INTERVIEW_QUESTION_BANK.map((item, idx) => {
                  const selected = item.id === activeInterview.id;
                  const practiced = progress.practicedInterviewIds.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedInterviewId(item.id);
                        setStarDraft("");
                        setStarFeedback(null);
                      }}
                      className={`rounded-xl border p-3 text-start text-xs transition-colors ${
                        selected
                          ? "border-primary bg-primary/10 font-semibold text-foreground"
                          : "border-border bg-background hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-primary">Q{idx + 1}</span>
                        {practiced && (
                          <CheckCircle2 className="size-3.5 text-emerald-600" aria-hidden />
                        )}
                      </div>
                      <p className="mt-1 line-clamp-2 text-foreground" dir="ltr">
                        {item.question}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Active Question & Progressive A2–C2 Model */}
              <div className="rounded-2xl border border-primary/25 bg-secondary/35 p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-bold text-foreground" dir="ltr">
                      “{activeInterview.question}”
                    </p>
                    <p className="mt-1 text-sm text-primary">{activeInterview.arabicHint}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      playSpeech(activeInterview.modelsByLevel[interviewLevel], 0.92, "female")
                    }
                  >
                    <Volume2 className="size-4" aria-hidden />
                    {t.vocab.listenWord}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                  <span className="font-bold text-foreground">
                    {t.business.whatInterviewersTest}:
                  </span>{" "}
                  {activeInterview.whatInterviewersTest[locale]}
                </p>

                <div className="rounded-xl border border-emerald-500/30 bg-card p-4" dir="ltr">
                  <Badge className="bg-emerald-600 text-xs text-white">
                    CEFR {interviewLevel} Model
                  </Badge>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">
                    <HighlightedText text={activeInterview.modelsByLevel[interviewLevel]} />
                  </p>
                </div>

                {/* Interactive STAR Response Builder */}
                <div className="space-y-2 border-t border-border/60 pt-4">
                  <p className="text-sm font-bold text-foreground">{t.business.starBuilderTitle}</p>
                  <p className="text-xs text-muted-foreground">{t.business.starBuilderHint}</p>
                  <Textarea
                    rows={3}
                    dir="ltr"
                    value={starDraft}
                    onChange={(e) => {
                      setStarDraft(e.target.value);
                      setStarFeedback(null);
                    }}
                    placeholder={t.business.rolePlayPlaceholder}
                  />
                  <Button size="sm" disabled={!starDraft.trim()} onClick={checkStarDraft}>
                    <Sparkles className="size-3.5" aria-hidden />
                    {t.business.starCheckBtn}
                  </Button>
                  {starFeedback && (
                    <p
                      className={`rounded-xl p-3 text-xs font-medium ${
                        starFeedback === "good"
                          ? "border border-emerald-500/35 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200"
                          : "border border-amber-500/35 bg-amber-500/10 text-foreground"
                      }`}
                    >
                      {starFeedback === "good"
                        ? t.business.starGoodFeedback
                        : t.business.starNeedsMore}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* B. CV Impact Upgrades & Cover Letter Blueprint */}
            <div className="grid gap-6 lg:grid-cols-2">
              <section className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-foreground">{t.business.cvSectionTitle}</h2>
                {CV_TRANSFORMATIONS.map((cv, idx) => (
                  <div key={idx} className="space-y-2 rounded-xl border border-border p-4">
                    <p className="rounded-lg bg-rose-500/10 p-2.5 text-xs" dir="ltr">
                      <span className="font-bold text-red-600 dark:text-red-400">
                        ✗ {t.business.cvWeakLabel}:
                      </span>{" "}
                      {cv.weak}
                    </p>
                    <p className="rounded-lg bg-emerald-500/10 p-2.5 text-sm font-medium" dir="ltr">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">
                        ✓ {t.business.cvStrongLabel}:
                      </span>{" "}
                      {cv.strong}
                    </p>
                    <p className="text-xs text-muted-foreground">{cv.why[locale]}</p>
                  </div>
                ))}
              </section>

              <section className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-foreground">{t.business.coverLetterTitle}</h2>
                <div className="space-y-2">
                  {COVER_LETTER_BLUEPRINT.structure.map((s) => (
                    <div key={s.step} className="rounded-xl bg-secondary/50 p-3">
                      <p className="text-xs font-bold text-primary">
                        {s.step} · {s.arabic}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{s.tip[locale]}</p>
                    </div>
                  ))}
                </div>
                <pre
                  className="whitespace-pre-wrap rounded-xl border border-border bg-background p-4 font-sans text-xs leading-relaxed text-foreground"
                  dir="ltr"
                >
                  {COVER_LETTER_BLUEPRINT.modelLetter}
                </pre>
              </section>
            </div>

            {/* C. Job Description Decoder */}
            <section className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-foreground">{t.business.jdDecoderTitle}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {JOB_DESCRIPTION_DECODER.map((item) => (
                  <div key={item.phrase} className="rounded-xl border border-border p-4 space-y-2">
                    <p className="font-bold text-primary" dir="ltr">
                      “{item.phrase}”
                    </p>
                    <p className="text-xs text-foreground">
                      <span className="font-bold">{t.business.jdRealMeaning}:</span>{" "}
                      {item.realMeaning[locale]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">
                        {t.business.jdHowToRespond}:
                      </span>{" "}
                      {item.howToRespond[locale]}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* D. Salary Negotiation & Workplace Etiquette */}
            <div className="grid gap-6 lg:grid-cols-2">
              <section className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-foreground">
                  {t.business.salaryScriptsTitle}
                </h2>
                {SALARY_NEGOTIATION_SCRIPTS.map((item, idx) => (
                  <div key={idx} className="rounded-xl border border-border p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold text-primary">{item.scenario[locale]}</p>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="size-7 shrink-0"
                        onClick={() => playSpeech(item.script, 0.92, "male")}
                        aria-label={t.vocab.listenWord}
                      >
                        <Volume2 className="size-3.5" aria-hidden />
                      </Button>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground" dir="ltr">
                      “{item.script}”
                    </p>
                  </div>
                ))}
              </section>

              <section className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-foreground">{t.business.etiquetteTitle}</h2>
                <div className="space-y-3">
                  {WORKPLACE_ETIQUETTE_TIPS.map((tip) => (
                    <div key={tip.title.en} className="rounded-xl bg-secondary/50 p-3.5">
                      <p className="text-sm font-bold text-foreground">{tip.title[locale]}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {tip.body[locale]}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CommSkillCard({
  skill,
  unlocked,
  isFreePreview,
  completed,
  onUnlockRequest,
  onComplete,
}: {
  skill: CommunicationSkillModule;
  unlocked: boolean;
  isFreePreview: boolean;
  completed: boolean;
  onUnlockRequest: () => void;
  onComplete: () => void;
}) {
  const { t, locale } = useI18n();
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  function handleCheck() {
    if (selectedOpt === null) return;
    setChecked(true);
    if (selectedOpt === skill.quickDrill.correct) {
      onComplete();
    }
  }

  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">#{skill.number}</Badge>
            {isFreePreview && (
              <Badge className="bg-emerald-600 text-white">{t.business.freePreviewTag}</Badge>
            )}
            {completed && (
              <Badge className="bg-primary text-primary-foreground">
                {t.business.completedTag}
              </Badge>
            )}
            {!unlocked && (
              <Badge variant="secondary">
                <Lock className="me-1 size-3" aria-hidden />
                {t.business.lockedTag}
              </Badge>
            )}
          </div>
          <h3 className="mt-2 text-lg font-bold text-foreground">{skill.title[locale]}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{skill.summary[locale]}</p>
        </div>
        {!unlocked && (
          <Button size="sm" variant="outline" onClick={onUnlockRequest}>
            <Lock className="size-3.5" aria-hidden />
            {t.business.lockedTag}
          </Button>
        )}
      </div>

      {unlocked && (
        <>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl bg-secondary/40 p-4 space-y-2">
              <p className="text-xs font-bold uppercase text-primary">
                {t.business.keyPhrasesLabel}
              </p>
              {skill.keyPhrases.map((kp) => (
                <div
                  key={kp.phrase}
                  className="flex items-start justify-between gap-2 rounded-lg bg-card p-2.5 text-xs"
                >
                  <div>
                    <p className="font-semibold text-foreground" dir="ltr">
                      {kp.phrase}
                    </p>
                    <p className="text-muted-foreground">{kp.arabic}</p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-7 shrink-0"
                    onClick={() => playSpeech(kp.phrase, 0.92, "female")}
                    aria-label={t.vocab.listenWord}
                  >
                    <Volume2 className="size-3.5" aria-hidden />
                  </Button>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-background p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase text-primary">
                  {t.business.realisticModelLabel} · {skill.realisticModel.title[locale]}
                </p>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-7"
                  onClick={() => playSpeech(skill.realisticModel.text, 0.92, "male")}
                  aria-label={t.vocab.listenWord}
                >
                  <Volume2 className="size-3.5" aria-hidden />
                </Button>
              </div>
              <pre
                className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground"
                dir="ltr"
              >
                {skill.realisticModel.text}
              </pre>
            </div>
          </div>

          {/* Interactive Judgment Drill */}
          <div className="rounded-xl border border-primary/20 bg-secondary/25 p-4 space-y-3">
            <p className="text-xs font-bold uppercase text-primary">{t.business.quickDrillLabel}</p>
            <p className="text-sm font-semibold text-foreground" dir="ltr">
              {skill.quickDrill.prompt}
            </p>
            <div className="grid gap-2" dir="ltr">
              {skill.quickDrill.options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                const isCorrect = checked && idx === skill.quickDrill.correct;
                const isWrong = checked && isSelected && idx !== skill.quickDrill.correct;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedOpt(idx);
                      setChecked(false);
                    }}
                    className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-start text-xs transition-colors sm:text-sm ${
                      isCorrect
                        ? "border-emerald-500 bg-emerald-500/10 font-semibold"
                        : isWrong
                          ? "border-rose-500 bg-rose-500/10"
                          : isSelected
                            ? "border-primary bg-primary/10 font-medium"
                            : "border-border bg-card hover:bg-muted/60"
                    }`}
                  >
                    <span>{opt}</span>
                    {isCorrect && (
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-600" aria-hidden />
                    )}
                    {isWrong && <XCircle className="size-4 shrink-0 text-rose-600" aria-hidden />}
                  </button>
                );
              })}
            </div>
            <Button size="sm" disabled={selectedOpt === null} onClick={handleCheck}>
              {t.vocab.checkAnswer}
            </Button>
            {checked && (
              <p className="rounded-lg bg-card p-2.5 text-xs text-muted-foreground">
                {skill.quickDrill.explanation[locale]}
              </p>
            )}
          </div>
        </>
      )}
    </article>
  );
}

function MeetingStagePlayer({
  stage,
  unlocked,
  completed,
  onUnlockRequest,
  onComplete,
}: {
  stage: MeetingStageModule;
  unlocked: boolean;
  completed: boolean;
  onUnlockRequest: () => void;
  onComplete: () => void;
}) {
  const { t, locale } = useI18n();
  const [playingTurn, setPlayingTurn] = useState<number | null>(null);
  const stopRef = useRef<(() => void) | null>(null);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [roleDraft, setRoleDraft] = useState("");

  const speech = useSpeech((transcript) => {
    setRoleDraft((prev) => (prev.trim() ? `${prev.trim()} ${transcript}` : transcript));
  });

  useEffect(() => {
    return () => {
      stopRef.current?.();
    };
  }, []);

  function handlePlayDialogue() {
    if (playingTurn !== null) {
      stopRef.current?.();
      stopRef.current = null;
      setPlayingTurn(null);
      return;
    }
    const turns = stage.dialogue.map((turn) => ({
      text: turn.text,
      role: turn.speaker === "female" ? ("female-teacher" as const) : ("male-teacher" as const),
    }));
    stopRef.current = playDialogueSequence(turns, {
      rate: 0.93,
      onTurnStart: (idx) => setPlayingTurn(idx),
      onComplete: () => {
        setPlayingTurn(null);
        stopRef.current = null;
      },
    });
  }

  function handleCheckListening() {
    if (selectedOpt === null) return;
    setChecked(true);
    if (selectedOpt === stage.listeningTask.correct) {
      onComplete();
    }
  }

  if (!unlocked) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center space-y-3">
        <Lock className="mx-auto size-10 text-muted-foreground" aria-hidden />
        <h3 className="text-lg font-bold text-foreground">
          {format(t.business.meetingStageLabel, { stage: stage.stage })} · {stage.title[locale]}
        </h3>
        <p className="mx-auto max-w-md text-sm text-muted-foreground">{t.business.lockedExplain}</p>
        <Button onClick={onUnlockRequest}>{t.business.joinCta}</Button>
      </div>
    );
  }

  return (
    <article className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-primary text-primary-foreground">
              {format(t.business.meetingStageLabel, { stage: stage.stage })}
            </Badge>
            {completed && (
              <Badge className="bg-emerald-600 text-white">{t.business.completedTag}</Badge>
            )}
          </div>
          <h3 className="mt-2 text-2xl font-bold text-foreground">{stage.title[locale]}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{t.business.meetingGoalLabel}:</span>{" "}
            {stage.goal[locale]}
          </p>
        </div>

        <Button
          variant={playingTurn !== null ? "destructive" : "accent"}
          onClick={handlePlayDialogue}
        >
          {playingTurn !== null ? (
            <Square className="size-4" aria-hidden />
          ) : (
            <Play className="size-4" aria-hidden />
          )}
          {playingTurn !== null ? t.business.stopDialogueBtn : t.business.playDialogueBtn}
        </Button>
      </div>

      {/* Key Meeting Phrases */}
      <div className="grid gap-2.5 sm:grid-cols-2">
        {stage.keyExpressions.map((exp) => (
          <div
            key={exp.phrase}
            className="flex items-start justify-between gap-2 rounded-xl bg-secondary/50 p-3"
          >
            <div>
              <p className="text-sm font-bold text-foreground" dir="ltr">
                “{exp.phrase}”
              </p>
              <p className="mt-0.5 text-xs text-primary">{exp.arabic}</p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="size-7 shrink-0"
              onClick={() => playSpeech(exp.phrase, 0.92, "female")}
              aria-label={t.vocab.listenWord}
            >
              <Volume2 className="size-3.5" aria-hidden />
            </Button>
          </div>
        ))}
      </div>

      {/* Playable Male & Female Meeting Dialogue */}
      <div className="space-y-2.5" dir="ltr">
        {stage.dialogue.map((turn, idx) => {
          const isSpeaking = playingTurn === idx;
          return (
            <div
              key={idx}
              className={`rounded-xl border p-3.5 transition-all ${
                isSpeaking
                  ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                  : "border-border bg-background"
              }`}
            >
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-bold text-primary">
                  {turn.speaker === "female" ? "👩" : "👨"} {turn.name}{" "}
                  <span className="font-normal text-muted-foreground">({turn.role})</span>
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-7"
                  onClick={() => playSpeech(turn.text, 0.93, turn.speaker)}
                  aria-label={`Listen to ${turn.name}`}
                >
                  <Volume2 className="size-3.5" aria-hidden />
                </Button>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-foreground">{turn.text}</p>
            </div>
          );
        })}
      </div>

      {/* Listening & Comprehension Check */}
      <div className="rounded-xl border border-primary/20 bg-secondary/25 p-4 space-y-3">
        <p className="text-xs font-bold uppercase text-primary">{t.business.listeningCheckLabel}</p>
        <p className="text-sm font-semibold text-foreground" dir="ltr">
          {stage.listeningTask.question}
        </p>
        <div className="grid gap-2" dir="ltr">
          {stage.listeningTask.options.map((opt, idx) => {
            const isSelected = selectedOpt === idx;
            const isCorrect = checked && idx === stage.listeningTask.correct;
            const isWrong = checked && isSelected && idx !== stage.listeningTask.correct;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setSelectedOpt(idx);
                  setChecked(false);
                }}
                className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-start text-xs sm:text-sm ${
                  isCorrect
                    ? "border-emerald-500 bg-emerald-500/10 font-semibold"
                    : isWrong
                      ? "border-rose-500 bg-rose-500/10"
                      : isSelected
                        ? "border-primary bg-primary/10 font-medium"
                        : "border-border bg-card hover:bg-muted/60"
                }`}
              >
                <span>{opt}</span>
                {isCorrect && <CheckCircle2 className="size-4 text-emerald-600" aria-hidden />}
                {isWrong && <XCircle className="size-4 text-rose-600" aria-hidden />}
              </button>
            );
          })}
        </div>
        <Button size="sm" disabled={selectedOpt === null} onClick={handleCheckListening}>
          {t.vocab.checkAnswer}
        </Button>
        {checked && (
          <p className="rounded-lg bg-card p-2.5 text-xs text-muted-foreground">
            {stage.listeningTask.explanation[locale]}
          </p>
        )}
      </div>

      {/* Role-Play Practice Prompt */}
      <div className="rounded-xl border border-border bg-background p-4 space-y-2.5">
        <p className="text-xs font-bold uppercase text-primary">{t.business.rolePlayLabel}</p>
        <p className="text-sm text-foreground">{stage.rolePlayPrompt[locale]}</p>
        <Textarea
          rows={3}
          dir="ltr"
          value={roleDraft}
          onChange={(e) => setRoleDraft(e.target.value)}
          placeholder={t.business.rolePlayPlaceholder}
        />
        <div className="flex flex-wrap gap-2">
          {speech.supported && (
            <Button
              type="button"
              size="sm"
              variant={speech.listening ? "destructive" : "outline"}
              onClick={() => (speech.listening ? speech.stop() : speech.start())}
            >
              {speech.listening ? (
                <MicOff className="size-3.5" aria-hidden />
              ) : (
                <Mic className="size-3.5" aria-hidden />
              )}
              {speech.listening ? t.learning.stop : t.learning.record}
            </Button>
          )}
          <Button
            size="sm"
            variant="secondary"
            disabled={!roleDraft.trim()}
            onClick={() => {
              onComplete();
              toast.success(t.business.completedTag);
            }}
          >
            <Check className="size-3.5" aria-hidden />
            {t.business.markStageDoneBtn}
          </Button>
        </div>
      </div>
    </article>
  );
}
