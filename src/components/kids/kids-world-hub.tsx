import { useEffect, useState } from "react";
import { Award, BookOpen, Check, Pencil, Sparkles, Star } from "lucide-react";
import { toast } from "sonner";

import { useI18n } from "@/components/i18n-provider";
import { LessonList } from "@/components/learning/lesson-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { KIDS_AGE_GROUPS, type KidsAgeGroupId } from "@/content/kids/alphabet-phonics-data";
import { courseLessons } from "@/content/lessons";
import { useLearner } from "@/hooks/use-learner";
import {
  computeKidsBadges,
  emptyKidsProgress,
  kidsStorage,
  type KidsProgressState,
} from "@/lib/kids-storage";
import { lockedLessonIds } from "@/lib/lesson-access";
import { AlphabetStudio } from "./alphabet-studio";
import { VowelsConsonantsStudio } from "./vowels-consonants-studio";

type KidsHubTab = "alphabet" | "vowels" | "guided";

export function KidsWorldHub() {
  const { t, locale, dir } = useI18n();
  const kw = t.kidsWorld;
  const { courses, hasJoined, joinCourse } = useLearner();
  const joined = hasJoined("kids");

  const [progress, setProgress] = useState<KidsProgressState>(() => emptyKidsProgress());
  const [activeTab, setActiveTab] = useState<KidsHubTab>("alphabet");

  useEffect(() => {
    setProgress(kidsStorage.get());
  }, []);

  const badges = computeKidsBadges(progress);
  const currentAgeMeta =
    KIDS_AGE_GROUPS.find((g) => g.id === progress.ageGroup) ?? KIDS_AGE_GROUPS[0]!;
  const guidedLessons = courseLessons("kids");

  const handleSelectAge = (id: KidsAgeGroupId) => {
    setProgress(kidsStorage.setAgeGroup(id));
  };

  return (
    <div className="theme-kids min-h-screen bg-background pb-16" dir={dir}>
      {/* Playful Mascot Hero & Child-Friendly Visual Dashboard */}
      <header className="border-b-2 border-foreground/15 bg-gradient-to-br from-amber-200/55 via-sky-100/60 to-emerald-100/55 py-10 dark:from-amber-950/35 dark:via-sky-950/35 dark:to-emerald-950/35 md:py-14">
        <div className="container-page space-y-8">
          <div className="grid items-center gap-6 lg:grid-cols-[1.25fr_0.95fr]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-3.5 py-1.5 text-xs font-extrabold text-primary shadow-xs">
                <span aria-hidden>🦉</span>
                <span>{kw.badge}</span>
              </div>
              <h1 className="display-heading text-4xl font-black tracking-tight text-foreground md:text-5xl">
                {kw.heroTitle}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {kw.heroSubtitle}
              </p>

              {/* Age & Ability Group Picker */}
              <div className="space-y-2 pt-1">
                <div className="flex flex-wrap gap-2" role="group" aria-label="Kids age groups">
                  {KIDS_AGE_GROUPS.map((grp) => {
                    const active = grp.id === progress.ageGroup;
                    return (
                      <button
                        key={grp.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => handleSelectAge(grp.id)}
                        className={`inline-flex items-center gap-2 rounded-2xl border-2 px-4 py-2.5 text-xs font-extrabold transition-all sm:text-sm ${
                          active
                            ? "border-primary bg-primary text-primary-foreground shadow-sm scale-[1.02]"
                            : "border-border bg-card text-foreground hover:border-primary/50"
                        }`}
                      >
                        <span className="text-lg" aria-hidden>
                          {grp.emoji}
                        </span>
                        <span>{grp.title[locale]}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground">{kw.abilityNote}</p>
              </div>
            </div>

            {/* Child-Friendly Visual Dashboard Card */}
            <div className="rounded-3xl border-2 border-foreground/85 bg-card p-5 shadow-ink space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl" aria-hidden>
                    {currentAgeMeta.emoji}
                  </span>
                  <div>
                    <div className="text-sm font-extrabold text-foreground">
                      {currentAgeMeta.title[locale]}
                    </div>
                    <div className="text-xs font-semibold text-primary" dir="ltr">
                      {currentAgeMeta.cefrHint}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-amber-400/25 px-3 py-1.5 text-sm font-black text-amber-800 dark:text-amber-200">
                  <Star className="size-4 fill-amber-500 text-amber-500" aria-hidden />
                  <span dir="ltr">{progress.stars}</span>
                </div>
              </div>

              {/* Simple Visual Counters */}
              <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                <div className="rounded-2xl bg-amber-500/10 p-3">
                  <div className="text-[11px] font-semibold text-muted-foreground">
                    {kw.lettersLabel}
                  </div>
                  <div className="mt-1 text-lg font-black text-foreground" dir="ltr">
                    {progress.masteredLetters.length}/26
                  </div>
                  <Progress
                    value={Math.round((progress.masteredLetters.length / 26) * 100)}
                    className="mt-1.5 h-1.5"
                  />
                </div>
                <div className="rounded-2xl bg-sky-500/10 p-3">
                  <div className="text-[11px] font-semibold text-muted-foreground">
                    {kw.tracedLabel}
                  </div>
                  <div className="mt-1 text-lg font-black text-foreground" dir="ltr">
                    {progress.tracedLetters.length}/26
                  </div>
                  <Progress
                    value={Math.round((progress.tracedLetters.length / 26) * 100)}
                    className="mt-1.5 h-1.5"
                  />
                </div>
                <div className="rounded-2xl bg-emerald-500/10 p-3">
                  <div className="text-[11px] font-semibold text-muted-foreground">
                    {kw.vowelsLabel}
                  </div>
                  <div className="mt-1 text-lg font-black text-foreground" dir="ltr">
                    {progress.vowelChecksPassed.length}/5
                  </div>
                  <Progress
                    value={Math.round((progress.vowelChecksPassed.length / 5) * 100)}
                    className="mt-1.5 h-1.5"
                  />
                </div>
              </div>

              {/* Shiny Badges Row */}
              <div>
                <div className="mb-2 flex items-center justify-between text-xs font-bold text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Award className="size-3.5 text-primary" aria-hidden />
                    {kw.badgesTitle}
                  </span>
                  <span dir="ltr">
                    {kw.pointsLabel}: {progress.points}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {badges.map((b) => (
                    <Badge
                      key={b.id}
                      variant={b.earned ? "default" : "outline"}
                      className={
                        b.earned
                          ? "gap-1 bg-emerald-600 text-[11px]"
                          : "gap-1 text-[11px] opacity-65"
                      }
                      title={b.requirement[locale]}
                    >
                      <span aria-hidden>{b.emoji}</span>
                      {b.title[locale]}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Age Group Focus Highlights + Main Kids Studio Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label={kw.badge}>
              {(
                [
                  { id: "alphabet", label: kw.tabAlphabet, Icon: Pencil },
                  { id: "vowels", label: kw.tabVowelsConsonants, Icon: Sparkles },
                  { id: "guided", label: kw.tabGuidedLessons, Icon: BookOpen },
                ] as const
              ).map(({ id, label, Icon }) => (
                <Button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === id}
                  size="lg"
                  variant={activeTab === id ? "default" : "outline"}
                  className="rounded-full font-extrabold"
                  onClick={() => setActiveTab(id)}
                >
                  <Icon className="me-1.5 size-4" aria-hidden />
                  {label}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {currentAgeMeta.focusAreas.map((f) => (
                <span
                  key={f.en}
                  className="rounded-full bg-card/90 px-3 py-1 text-xs font-bold text-foreground shadow-xs"
                >
                  ✨ {f[locale]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Active Kids Learning Studio */}
      <main className="container-page mt-8">
        {activeTab === "alphabet" && (
          <AlphabetStudio
            progress={progress}
            onMasterLetter={(letter) => setProgress(kidsStorage.recordLetterMastered(letter))}
            onTraceLetter={(letter) => setProgress(kidsStorage.recordLetterTraced(letter))}
            onGameWin={(gameId) => setProgress(kidsStorage.recordGameWin(gameId, 1))}
          />
        )}

        {activeTab === "vowels" && (
          <VowelsConsonantsStudio
            progress={progress}
            onPassVowel={(vowel) => setProgress(kidsStorage.recordVowelPassed(vowel))}
            onConsonantSortWin={() => setProgress(kidsStorage.recordConsonantSortWin())}
            onGameWin={(gameId) => setProgress(kidsStorage.recordGameWin(gameId, 1))}
          />
        )}

        {activeTab === "guided" && (
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="display-heading text-2xl font-extrabold md:text-3xl">
                  {kw.guidedLessonsTitle}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{kw.guidedLessonsSubtitle}</p>
              </div>
              <Button
                variant="hero"
                size="lg"
                disabled={joined}
                onClick={() => {
                  joinCourse("kids");
                  toast.success(t.learning.joinedUnlock);
                }}
              >
                {joined && <Check aria-hidden />}
                {joined ? t.courses.joined : t.learning.joinToUnlock}
              </Button>
            </div>
            <LessonList
              lessons={guidedLessons}
              lockedIds={lockedLessonIds(guidedLessons, courses)}
            />
          </section>
        )}
      </main>
    </div>
  );
}
