import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Lock,
  MessageCircle,
  PenLine,
  Plane,
  Search,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SPEAKING_CATEGORIES,
  SPEAKING_SITUATIONS,
  type SpeakingCategory,
} from "@/content/speaking-situations";
import { useLearner } from "@/hooks/use-learner";
import { format } from "@/lib/i18n/messages";
import { isSpeakingUnlocked } from "@/lib/lesson-access";
import { SpeakingConversation } from "./speaking-conversation";

const SPEAKING_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

export function SpeakingStudio() {
  const { t, locale } = useI18n();
  const { courses, hasJoined, joinCourse } = useLearner();
  const joinedSpeaking = hasJoined("speaking");

  const [category, setCategory] = useState<SpeakingCategory | "all">("all");
  const [level, setLevel] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(SPEAKING_SITUATIONS[0]?.id ?? "");
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const filtered = SPEAKING_SITUATIONS.filter(
    (s) =>
      (category === "all" || s.category === category) &&
      (level === "all" || s.level === level) &&
      `${s.title.en} ${s.title.ar} ${s.role.en} ${s.role.ar} ${s.level}`
        .toLowerCase()
        .includes(search.toLowerCase().trim()),
  );
  const situation = SPEAKING_SITUATIONS.find((s) => s.id === selected);
  const situationLocked = situation ? !isSpeakingUnlocked(situation.id, courses) : false;

  function handleUnlockAll() {
    joinCourse("speaking");
    toast.success(t.learning.joinedUnlock);
  }

  return (
    <div className="container-page py-8 md:py-12">
      <Link
        to="/courses/$level"
        params={{ level: "speaking" }}
        className="inline-flex items-center gap-2 text-sm text-primary"
      >
        <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden />
        {t.courses.allCourses}
      </Link>

      <header className="mt-4 rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-secondary/40 p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-extrabold text-primary">
              <Sparkles className="size-3.5" aria-hidden />
              {t.learning.liveDiscourseBadge}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <MessageCircle className="size-8 text-primary" aria-hidden />
              <h1 className="display-heading text-3xl font-extrabold md:text-4xl">
                {t.learning.situationsTitle}
              </h1>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {t.learning.situationsIntro}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Badge className="bg-primary text-primary-foreground">
                {format(t.learning.situationsCount, { count: SPEAKING_SITUATIONS.length })}
              </Badge>
              {completedIds.length > 0 && (
                <Badge variant="secondary" className="gap-1">
                  <CheckCircle2 className="size-3.5 text-emerald-600" aria-hidden />
                  {completedIds.length}/{SPEAKING_SITUATIONS.length}
                </Badge>
              )}
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="rounded-full text-xs font-bold"
                onClick={() => {
                  setCategory("travel");
                  setLevel("all");
                  setSearch("airport");
                  setSelected("checkin");
                }}
              >
                <Plane className="me-1.5 size-3.5 text-primary" aria-hidden />
                {t.learning.airportSpotlightBtn}
              </Button>
              <Button
                asChild
                size="sm"
                variant="secondary"
                className="rounded-full text-xs font-bold"
              >
                <Link to="/workshops" search={{ tab: "speaking-through-writing" }}>
                  <PenLine className="me-1.5 size-3.5 text-primary" aria-hidden />
                  {t.speakingThroughWriting.openFromSpeakingCta}
                </Link>
              </Button>
            </div>
          </div>

          <Button
            type="button"
            variant={joinedSpeaking ? "secondary" : "hero"}
            size="lg"
            disabled={joinedSpeaking}
            onClick={handleUnlockAll}
          >
            {joinedSpeaking && <Check aria-hidden />}
            {joinedSpeaking ? t.courses.joined : t.learning.unlockAllSituationsBtn}
          </Button>
        </div>
      </header>

      <div className="mb-4 mt-6 flex flex-wrap gap-2" role="group" aria-label={t.learning.choose}>
        <Button
          variant={category === "all" ? "default" : "outline"}
          aria-pressed={category === "all"}
          onClick={() => {
            setCategory("all");
            setSearch("");
          }}
        >
          {t.test.filterAll} ({SPEAKING_SITUATIONS.length})
        </Button>
        {SPEAKING_CATEGORIES.map((c) => (
          <Button
            key={c}
            variant={category === c ? "default" : "outline"}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c === "ielts" ? t.nav.ielts : t.learning[c]} (
            {SPEAKING_SITUATIONS.filter((s) => s.category === c).length})
          </Button>
        ))}
      </div>

      <div
        className="mb-6 flex flex-wrap items-center gap-2"
        role="group"
        aria-label={t.learning.levelFilter}
      >
        <span className="text-xs font-bold text-muted-foreground">{t.learning.levelFilter}:</span>
        <Button
          size="sm"
          variant={level === "all" ? "secondary" : "outline"}
          aria-pressed={level === "all"}
          onClick={() => setLevel("all")}
        >
          {t.learning.allLevels}
        </Button>
        {SPEAKING_LEVELS.map((lv) => (
          <Button
            key={lv}
            size="sm"
            variant={level === lv ? "secondary" : "outline"}
            aria-pressed={level === lv}
            onClick={() => setLevel(lv)}
          >
            {lv}
          </Button>
        ))}
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <aside className="min-w-0">
          <label className="mb-2 block text-sm font-semibold" htmlFor="situation-search">
            {t.learning.search}
          </label>
          <div className="relative">
            <Search className="absolute start-3 top-3 size-4 text-muted-foreground" aria-hidden />
            <input
              id="situation-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.learning.searchSituationsPlaceholder}
              className="h-10 w-full rounded-lg border border-input bg-background pe-3 ps-10 text-sm"
            />
          </div>
          <div
            className="mt-4 grid max-h-72 gap-2 overflow-y-auto pe-2 lg:max-h-[42rem]"
            role="group"
            aria-label={t.learning.choose}
          >
            {filtered.map((s) => {
              const locked = !isSpeakingUnlocked(s.id, courses);
              const done = completedIds.includes(s.id);
              return (
                <Button
                  key={s.id}
                  variant={selected === s.id ? "secondary" : "ghost"}
                  className="h-auto min-h-14 w-full justify-start gap-2 whitespace-normal py-3 text-start"
                  aria-pressed={selected === s.id}
                  onClick={() => setSelected(s.id)}
                >
                  <span className="shrink-0 text-xs font-bold text-primary">{s.level}</span>
                  <span className="flex-1 text-sm">{s.title[locale]}</span>
                  {done ? (
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-600" aria-hidden />
                  ) : locked ? (
                    <Lock className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                  ) : null}
                </Button>
              );
            })}
            {filtered.length === 0 && (
              <p className="py-4 text-sm text-muted-foreground">{t.learning.noResults}</p>
            )}
          </div>
        </aside>

        {situation &&
          (situationLocked ? (
            <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-card">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-muted">
                <Lock className="size-7 text-muted-foreground" aria-hidden />
              </span>
              <p className="eyebrow mt-6 text-primary">{t.learning.locked}</p>
              <h2 className="mt-2 text-2xl font-bold">{situation.title[locale]}</h2>
              <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">
                {t.learning.lockedBody}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button type="button" variant="hero" size="lg" onClick={handleUnlockAll}>
                  {t.learning.unlockAllSituationsBtn}
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/courses/$level" params={{ level: "speaking" }}>
                    {t.learning.unlockCourse}
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <SpeakingConversation
              key={situation.id}
              situation={situation}
              onComplete={(id) =>
                setCompletedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
              }
            />
          ))}
      </div>
    </div>
  );
}
