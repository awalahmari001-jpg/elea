import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  Mic,
  MicOff,
  PenLine,
  RefreshCw,
  Search,
  Sparkles,
  Volume2,
  XCircle,
} from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { HighlightedText } from "@/components/learning/highlighted-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  IELTS_CATEGORIES,
  IELTS_PARAPHRASING_TASKS,
  IELTS_SPEAKING_WRITING_PROMPTS,
  IELTS_TOPICS,
  IELTS_VOCABULARY,
} from "@/content/vocab/ielts-vocab-index";
import type {
  IeltsLexicalFeedback,
  IeltsTopicCategory,
  IeltsVocabCategory,
  IeltsVocabEntry,
} from "@/content/vocab/vocab-types";
import { playSpeech, useSpeech } from "@/hooks/use-speech";
import { format } from "@/lib/i18n/messages";
import { evaluateIeltsLexical } from "@/lib/ielts-lexical-ai.functions";
import { evaluateIeltsLexicalLocal, type IeltsPracticeMode } from "@/lib/ielts-lexical-fallback";
import { learnerStorage, type IeltsVocabProgress } from "@/lib/learner-storage";

type StudioTab = "explorer" | "practice";
type PracticeModeId =
  | "quiz"
  | "collocation"
  | "sentence"
  | "context"
  | "paraphrase"
  | "academic"
  | "speaking"
  | "writing";

interface ChoiceQuestion {
  id: string;
  prompt: string;
  helper?: string;
  options: string[];
  correctIndex: number;
  explanationEn: string;
  explanationAr: string;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildQuizQuestions(entries: IeltsVocabEntry[]): ChoiceQuestion[] {
  const sample = entries.slice(0, 10);
  return sample.map((entry, idx) => {
    const distractors = entries
      .filter((e) => e.id !== entry.id)
      .slice(
        (idx * 3) % Math.max(1, entries.length - 4),
        ((idx * 3) % Math.max(1, entries.length - 4)) + 3,
      )
      .map((d) => d.word);
    const raw = [entry.word, ...distractors];
    const shift = idx % raw.length;
    const options = [...raw.slice(shift), ...raw.slice(0, shift)];
    return {
      id: `quiz-${entry.id}`,
      prompt: entry.definition,
      helper: `${entry.partOfSpeech} · ${entry.arabic}`,
      options,
      correctIndex: options.indexOf(entry.word),
      explanationEn: `${entry.word} (${entry.ipa}): ${entry.examples[0]}`,
      explanationAr: `${entry.word} — ${entry.arabic}. مثال: ${entry.examples[0]}`,
    };
  });
}

function buildSentenceQuestions(entries: IeltsVocabEntry[]): ChoiceQuestion[] {
  const eligible = entries
    .filter((e) => {
      const baseWord = e.word.split(" / ")[0]?.trim() ?? e.word;
      return new RegExp(`\\b${escapeRegExp(baseWord)}`, "i").test(e.examples[0]);
    })
    .slice(0, 8);

  return eligible.map((entry, idx) => {
    const baseWord = entry.word.split(" / ")[0]?.trim() ?? entry.word;
    const blanked = entry.examples[0].replace(
      new RegExp(`\\b${escapeRegExp(baseWord)}[a-z]*`, "i"),
      "________",
    );
    const distractors = entries
      .filter((e) => e.id !== entry.id)
      .slice(
        (idx * 5) % Math.max(1, entries.length - 4),
        ((idx * 5) % Math.max(1, entries.length - 4)) + 3,
      )
      .map((d) => d.word.split(" / ")[0]?.trim() ?? d.word);
    const raw = [baseWord, ...distractors];
    const shift = (idx + 1) % raw.length;
    const options = [...raw.slice(shift), ...raw.slice(0, shift)];
    return {
      id: `sent-${entry.id}`,
      prompt: blanked,
      helper: entry.arabic,
      options,
      correctIndex: options.indexOf(baseWord),
      explanationEn: `Complete sentence: ${entry.examples[0]}`,
      explanationAr: `الجملة الكاملة: ${entry.examples[0]}`,
    };
  });
}

function buildContextQuestions(entries: IeltsVocabEntry[]): ChoiceQuestion[] {
  const prioritized = [
    ...entries.filter(
      (e) => e.category === "commonly-confused" || e.category === "formal-informal",
    ),
    ...entries.filter((e) => e.category === "synonyms" || e.category === "academic"),
  ].slice(0, 8);

  return prioritized.map((entry, idx) => {
    const optionsRaw = [
      entry.commonMistake.right,
      entry.commonMistake.wrong,
      entry.registerContrast.everyday,
    ];
    const uniqueOptions = Array.from(new Set(optionsRaw));
    while (uniqueOptions.length < 3) {
      uniqueOptions.push(entry.examples[1]);
    }
    const shift = idx % uniqueOptions.length;
    const options = [...uniqueOptions.slice(shift), ...uniqueOptions.slice(0, shift)];
    return {
      id: `ctx-${entry.id}`,
      prompt: `Choose the most accurate, natural Band 7+ usage for "${entry.word}" (${entry.topic.replace("-", " ")}):`,
      helper: entry.definition,
      options,
      correctIndex: options.indexOf(entry.commonMistake.right),
      explanationEn: entry.commonMistake.why.en,
      explanationAr: entry.commonMistake.why.ar,
    };
  });
}

function buildAcademicTasks(entries: IeltsVocabEntry[]) {
  const topics: IeltsTopicCategory[] = [
    "education",
    "technology-ai",
    "environment-climate",
    "health-lifestyle",
    "business-employment",
  ];
  return topics.map((topic) => {
    const items = entries.filter((e) => e.topic === topic).slice(0, 3);
    const words = items.map((i) => i.word.split(" / ")[0]?.trim() ?? i.word);
    return {
      id: `acad-${topic}`,
      topic,
      targetWords: words,
      prompt: `Construct one clear, formal IELTS Writing Task 2 sentence on "${topic.replace("-", " & ")}" using at least two of the target Band 7+ items below accurately.`,
      model: items[0]?.ieltsWriting.sample ?? items[0]?.examples[0] ?? "",
    };
  });
}

export function IeltsVocabStudio() {
  const { t, locale } = useI18n();
  const [activeTab, setActiveTab] = useState<StudioTab>("explorer");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<IeltsVocabCategory | "all">("all");
  const [selectedTopic, setSelectedTopic] = useState<IeltsTopicCategory | "all">("all");
  const [expandedId, setExpandedId] = useState<string>(IELTS_VOCABULARY[0]?.id ?? "");

  const [progress, setProgress] = useState<IeltsVocabProgress>({
    masteredIds: [],
    quizBestScore: 0,
    completedModes: [],
    updatedAt: "",
  });

  useEffect(() => {
    setProgress(learnerStorage.getIeltsVocab());
  }, []);

  const filteredEntries = useMemo(() => {
    const q = search.trim().toLowerCase();
    return IELTS_VOCABULARY.filter((entry) => {
      if (selectedCategory !== "all" && entry.category !== selectedCategory) return false;
      if (selectedTopic !== "all" && entry.topic !== selectedTopic) return false;
      if (!q) return true;
      return (
        entry.word.toLowerCase().includes(q) ||
        entry.definition.toLowerCase().includes(q) ||
        entry.arabic.toLowerCase().includes(q) ||
        entry.collocations.some((c) => c.toLowerCase().includes(q)) ||
        entry.synonyms.some((s) => s.toLowerCase().includes(q)) ||
        entry.topic.toLowerCase().includes(q)
      );
    });
  }, [search, selectedCategory, selectedTopic]);

  const activeCategoryMeta = useMemo(
    () => IELTS_CATEGORIES.find((c) => c.id === selectedCategory) ?? null,
    [selectedCategory],
  );

  function toggleMastered(id: string) {
    const exists = progress.masteredIds.includes(id);
    const nextIds = exists
      ? progress.masteredIds.filter((x) => x !== id)
      : [...progress.masteredIds, id];
    const saved = learnerStorage.saveIeltsVocab({
      masteredIds: nextIds,
      quizBestScore: progress.quizBestScore,
      completedModes: progress.completedModes,
    });
    setProgress(saved);
  }

  function recordModeComplete(mode: string, score?: number) {
    const saved = learnerStorage.saveIeltsVocab({
      masteredIds: progress.masteredIds,
      quizBestScore:
        typeof score === "number"
          ? Math.max(progress.quizBestScore, score)
          : progress.quizBestScore,
      completedModes: [...progress.completedModes, mode],
    });
    setProgress(saved);
  }

  return (
    <div className="pb-16">
      {/* Hero */}
      <header className="border-b border-border bg-inverse text-inverse-foreground">
        <div className="container-page py-10 md:py-14">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="bg-accent/20 text-accent">
              {t.vocab.ieltsEyebrow}
            </Badge>
            <Badge
              variant="outline"
              className="border-inverse-foreground/25 text-inverse-foreground"
            >
              {format(t.vocab.masteredCount, {
                mastered: progress.masteredIds.length,
                total: IELTS_VOCABULARY.length,
              })}
            </Badge>
          </div>
          <h1 className="display-heading mt-3 max-w-4xl text-3xl md:text-5xl">
            {t.vocab.ieltsTitle}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-inverse-muted md:text-lg">
            {t.vocab.ieltsSubtitle}
          </p>

          {/* Pedagogical Band 7+ Truth Box */}
          <div className="mt-6 rounded-2xl border border-amber-400/40 bg-amber-500/10 p-4 text-sm">
            <p className="flex items-center gap-2 font-bold text-amber-300">
              <AlertTriangle className="size-4 shrink-0" aria-hidden />
              {t.vocab.band7TruthTitle}
            </p>
            <p className="mt-1.5 leading-relaxed text-inverse-foreground/90">
              {t.vocab.band7TruthBody}
            </p>
          </div>

          {/* Primary Studio Tabs */}
          <div className="mt-6 flex flex-wrap gap-3" role="tablist" aria-label={t.vocab.ieltsTitle}>
            <Button
              role="tab"
              aria-selected={activeTab === "explorer"}
              variant={activeTab === "explorer" ? "accent" : "outline"}
              className={
                activeTab === "explorer"
                  ? "rounded-full"
                  : "rounded-full border-inverse-foreground/25 bg-transparent text-inverse-foreground hover:bg-inverse-foreground/10"
              }
              onClick={() => setActiveTab("explorer")}
            >
              <BookOpen className="size-4" aria-hidden />
              {t.vocab.explorerTab} ({IELTS_VOCABULARY.length})
            </Button>
            <Button
              role="tab"
              aria-selected={activeTab === "practice"}
              variant={activeTab === "practice" ? "accent" : "outline"}
              className={
                activeTab === "practice"
                  ? "rounded-full"
                  : "rounded-full border-inverse-foreground/25 bg-transparent text-inverse-foreground hover:bg-inverse-foreground/10"
              }
              onClick={() => setActiveTab("practice")}
            >
              <Sparkles className="size-4" aria-hidden />
              {t.vocab.practiceTab} ({progress.completedModes.length}/8)
            </Button>
          </div>
        </div>
      </header>

      <div className="container-page mt-8">
        {activeTab === "explorer" ? (
          <div className="space-y-6">
            {/* Search & Filters */}
            <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1">
                  <Search
                    className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t.vocab.searchPlaceholder}
                    className="ps-9"
                    aria-label={t.vocab.searchPlaceholder}
                  />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  {format(t.vocab.showingCount, {
                    count: filteredEntries.length,
                    total: IELTS_VOCABULARY.length,
                  })}
                </p>
              </div>

              {/* 10 Lexical Categories */}
              <div className="mt-4">
                <div
                  className="flex flex-wrap gap-1.5"
                  role="group"
                  aria-label={t.vocab.allCategories}
                >
                  <Button
                    size="sm"
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    className="rounded-full text-xs"
                    onClick={() => setSelectedCategory("all")}
                  >
                    {t.vocab.allCategories}
                  </Button>
                  {IELTS_CATEGORIES.map((cat) => (
                    <Button
                      key={cat.id}
                      size="sm"
                      variant={selectedCategory === cat.id ? "default" : "outline"}
                      className="rounded-full text-xs"
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.label[locale]}
                    </Button>
                  ))}
                </div>
                {activeCategoryMeta && (
                  <p className="mt-2.5 rounded-xl bg-secondary/70 px-3.5 py-2 text-xs leading-relaxed text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {activeCategoryMeta.label[locale]}:
                    </span>{" "}
                    {activeCategoryMeta.description[locale]}
                  </p>
                )}
              </div>

              {/* 15 IELTS Topic Categories */}
              <div className="mt-4 border-t border-border pt-4">
                <div className="flex flex-wrap gap-1.5" role="group" aria-label={t.vocab.allTopics}>
                  <Button
                    size="sm"
                    variant={selectedTopic === "all" ? "secondary" : "ghost"}
                    className="rounded-full text-xs"
                    onClick={() => setSelectedTopic("all")}
                  >
                    {t.vocab.allTopics}
                  </Button>
                  {IELTS_TOPICS.map((topic) => (
                    <Button
                      key={topic.id}
                      size="sm"
                      variant={selectedTopic === topic.id ? "secondary" : "ghost"}
                      className="rounded-full text-xs"
                      onClick={() => setSelectedTopic(topic.id)}
                    >
                      {topic.label[locale]}
                    </Button>
                  ))}
                </div>
              </div>
            </section>

            {/* Vocabulary Cards */}
            {filteredEntries.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-10 text-center">
                <p className="text-muted-foreground">{t.vocab.noMatchingVocab}</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("all");
                    setSelectedTopic("all");
                  }}
                >
                  {t.vocab.clearFilters}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEntries.map((entry) => {
                  const isExpanded = expandedId === entry.id;
                  const isMastered = progress.masteredIds.includes(entry.id);
                  const topicLabel =
                    IELTS_TOPICS.find((x) => x.id === entry.topic)?.label[locale] ?? entry.topic;
                  const catLabel =
                    IELTS_CATEGORIES.find((x) => x.id === entry.category)?.label[locale] ??
                    entry.category;
                  const mainKeyword = entry.word.split(" / ")[0]?.trim() ?? entry.word;

                  return (
                    <article
                      key={entry.id}
                      className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
                    >
                      {/* Card Header */}
                      <div className="flex flex-wrap items-start justify-between gap-4 p-5">
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-xl font-extrabold text-foreground" dir="ltr">
                              {entry.word}
                            </h2>
                            <span
                              className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-primary"
                              dir="ltr"
                            >
                              {entry.ipa}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {entry.partOfSpeech}
                            </Badge>
                            <Badge className="bg-emerald-600 text-xs text-white">
                              Band {entry.bandTarget}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium text-foreground" dir="ltr">
                            {entry.definition}
                          </p>
                          <p className="text-sm font-semibold text-primary">{entry.arabic}</p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            <Badge variant="secondary" className="text-xs">
                              {catLabel}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {topicLabel}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => playSpeech(mainKeyword, 0.92, "female")}
                            aria-label={`${t.vocab.listenWord} ${entry.word}`}
                          >
                            <Volume2 className="size-4" aria-hidden />
                            {t.vocab.listenWord}
                          </Button>
                          <Button
                            size="sm"
                            variant={isMastered ? "default" : "outline"}
                            onClick={() => toggleMastered(entry.id)}
                          >
                            <Check className="size-4" aria-hidden />
                            {isMastered ? t.vocab.masteredBadge : t.vocab.markMastered}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setExpandedId(isExpanded ? "" : entry.id)}
                          >
                            {isExpanded ? "▲" : "▼"}
                          </Button>
                        </div>
                      </div>

                      {/* Expanded Pedagogical Dossier */}
                      {isExpanded && (
                        <div className="space-y-5 border-t border-border bg-secondary/20 p-5">
                          {entry.ukUsNote && (
                            <p className="rounded-xl border border-border bg-card px-3.5 py-2 text-xs text-muted-foreground">
                              <span className="font-bold text-foreground">UK / US:</span>{" "}
                              {entry.ukUsNote[locale]}
                            </p>
                          )}

                          {/* Collocations, Synonyms, Antonyms, Word Family */}
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-xl border border-border bg-card p-4">
                              <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
                                {t.vocab.collocationsLabel}
                              </h3>
                              <div className="mt-2 flex flex-wrap gap-1.5" dir="ltr">
                                {entry.collocations.map((col) => (
                                  <button
                                    key={col}
                                    type="button"
                                    onClick={() => playSpeech(col, 0.92, "male")}
                                    className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/5 px-2.5 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-primary/15"
                                  >
                                    <Volume2 className="size-3 text-primary" aria-hidden />
                                    {col}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="rounded-xl border border-border bg-card p-4 space-y-2.5">
                              <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                  {t.vocab.synonymsLabel}
                                </h3>
                                <p className="mt-1 text-sm text-foreground" dir="ltr">
                                  {entry.synonyms.join(" · ")}
                                </p>
                              </div>
                              {entry.antonyms.length > 0 && (
                                <div>
                                  <h3 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                                    {t.vocab.antonymsLabel}
                                  </h3>
                                  <p className="mt-1 text-sm text-foreground" dir="ltr">
                                    {entry.antonyms.join(" · ")}
                                  </p>
                                </div>
                              )}
                              {entry.wordFamily && entry.wordFamily.length > 0 && (
                                <div>
                                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    {t.vocab.wordFamilyLabel}
                                  </h3>
                                  <p
                                    className="mt-1 font-mono text-xs text-muted-foreground"
                                    dir="ltr"
                                  >
                                    {entry.wordFamily.join(" · ")}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Everyday vs Academic Register Contrast */}
                          <div className="rounded-xl border border-primary/25 bg-card p-4">
                            <h3 className="text-sm font-bold text-foreground">
                              {t.vocab.registerTitle}
                            </h3>
                            <div className="mt-3 grid gap-3 md:grid-cols-2" dir="ltr">
                              <div className="rounded-lg bg-secondary/70 p-3">
                                <span className="text-xs font-bold uppercase text-muted-foreground">
                                  {t.vocab.everydayLabel}
                                </span>
                                <p className="mt-1 text-sm text-foreground">
                                  {entry.registerContrast.everyday}
                                </p>
                              </div>
                              <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
                                <span className="text-xs font-bold uppercase text-primary">
                                  {t.vocab.academicLabel}
                                </span>
                                <p className="mt-1 text-sm font-medium text-foreground">
                                  <HighlightedText
                                    text={entry.registerContrast.academic}
                                    keywords={[mainKeyword, ...entry.collocations]}
                                  />
                                </p>
                              </div>
                            </div>
                            <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                              <span className="font-semibold text-foreground">
                                {t.vocab.whenToUseLabel}:
                              </span>{" "}
                              {entry.registerContrast.whenToUse[locale]}
                            </p>
                          </div>

                          {/* Natural Examples */}
                          <div className="rounded-xl border border-border bg-card p-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                              {t.vocab.examplesLabel}
                            </h3>
                            <ul className="mt-2 space-y-2" dir="ltr">
                              {entry.examples.map((ex, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start justify-between gap-2 text-sm leading-relaxed text-foreground"
                                >
                                  <span>
                                    •{" "}
                                    <HighlightedText
                                      text={ex}
                                      keywords={[mainKeyword, ...entry.collocations]}
                                    />
                                  </span>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="size-7 shrink-0"
                                    onClick={() =>
                                      playSpeech(ex, 0.92, idx === 0 ? "female" : "male")
                                    }
                                    aria-label={t.vocab.listenWord}
                                  >
                                    <Volume2 className="size-3.5" aria-hidden />
                                  </Button>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* IELTS Speaking & Writing Applications */}
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-xl border border-border bg-card p-4">
                              <div className="flex items-center justify-between gap-2">
                                <h3 className="flex items-center gap-1.5 text-sm font-bold text-foreground">
                                  <Mic className="size-4 text-primary" aria-hidden />
                                  {t.vocab.speakingAppLabel}
                                </h3>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    playSpeech(entry.ieltsSpeaking.sample, 0.93, "female")
                                  }
                                >
                                  <Volume2 className="size-3.5" aria-hidden />
                                  {t.vocab.listenWord}
                                </Button>
                              </div>
                              <p
                                className="mt-2 text-xs font-semibold text-muted-foreground"
                                dir="ltr"
                              >
                                Q: {entry.ieltsSpeaking.prompt}
                              </p>
                              <p
                                className="mt-1.5 text-sm leading-relaxed text-foreground"
                                dir="ltr"
                              >
                                “
                                <HighlightedText
                                  text={entry.ieltsSpeaking.sample}
                                  keywords={[mainKeyword, ...entry.collocations]}
                                />
                                ”
                              </p>
                              <p className="mt-2 rounded-lg bg-secondary/70 p-2 text-xs text-muted-foreground">
                                💡 {entry.ieltsSpeaking.tip[locale]}
                              </p>
                            </div>

                            <div className="rounded-xl border border-border bg-card p-4">
                              <div className="flex items-center justify-between gap-2">
                                <h3 className="flex items-center gap-1.5 text-sm font-bold text-foreground">
                                  <PenLine className="size-4 text-primary" aria-hidden />
                                  {t.vocab.writingAppLabel}
                                </h3>
                                <Badge variant="outline" className="text-xs">
                                  {entry.ieltsWriting.task}
                                </Badge>
                              </div>
                              <p
                                className="mt-2 text-xs font-semibold text-muted-foreground"
                                dir="ltr"
                              >
                                Task: {entry.ieltsWriting.prompt}
                              </p>
                              <p
                                className="mt-1.5 text-sm leading-relaxed text-foreground"
                                dir="ltr"
                              >
                                <HighlightedText
                                  text={entry.ieltsWriting.sample}
                                  keywords={[mainKeyword, ...entry.collocations]}
                                />
                              </p>
                              <p className="mt-2 rounded-lg bg-secondary/70 p-2 text-xs text-muted-foreground">
                                💡 {entry.ieltsWriting.tip[locale]}
                              </p>
                            </div>
                          </div>

                          {/* Common Mistake */}
                          <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                              {t.vocab.commonMistakeLabel}
                            </h3>
                            <div className="mt-2 grid gap-2 md:grid-cols-2" dir="ltr">
                              <p className="rounded-lg bg-rose-500/10 p-2.5 text-sm">
                                <span className="font-bold text-red-600 dark:text-red-400">
                                  ✗ {t.vocab.wrongLabel}:
                                </span>{" "}
                                <span className="line-through decoration-red-500">
                                  {entry.commonMistake.wrong}
                                </span>
                              </p>
                              <p className="rounded-lg bg-emerald-500/10 p-2.5 text-sm">
                                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                                  ✓ {t.vocab.rightLabel}:
                                </span>{" "}
                                <span className="font-semibold text-foreground">
                                  {entry.commonMistake.right}
                                </span>
                              </p>
                            </div>
                            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                              {entry.commonMistake.why[locale]}
                            </p>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <IeltsPracticeArena
            completedModes={progress.completedModes}
            onModeComplete={recordModeComplete}
          />
        )}

        {/* Academic Attribution & Independence Notice */}
        <footer className="mt-10 rounded-2xl border border-border bg-secondary/40 p-4 text-xs leading-relaxed text-muted-foreground">
          {t.vocab.attributionNotice}
        </footer>
      </div>
    </div>
  );
}

/* ============================================================================
 * 8-MODE INTERACTIVE IELTS LEXICAL RESOURCE PRACTICE ARENA
 * ============================================================================ */

function IeltsPracticeArena({
  completedModes,
  onModeComplete,
}: {
  completedModes: string[];
  onModeComplete: (mode: string, score?: number) => void;
}) {
  const { t, locale } = useI18n();
  const [mode, setMode] = useState<PracticeModeId>("quiz");

  const modeButtons: { id: PracticeModeId; label: string }[] = [
    { id: "quiz", label: t.vocab.modeQuiz },
    { id: "collocation", label: t.vocab.modeCollocation },
    { id: "sentence", label: t.vocab.modeSentence },
    { id: "context", label: t.vocab.modeContext },
    { id: "paraphrase", label: t.vocab.modeParaphrase },
    { id: "academic", label: t.vocab.modeAcademic },
    { id: "speaking", label: t.vocab.modeSpeaking },
    { id: "writing", label: t.vocab.modeWriting },
  ];

  const quizQuestions = useMemo(() => buildQuizQuestions(IELTS_VOCABULARY), []);
  const sentenceQuestions = useMemo(() => buildSentenceQuestions(IELTS_VOCABULARY), []);
  const contextQuestions = useMemo(() => buildContextQuestions(IELTS_VOCABULARY), []);
  const academicTasks = useMemo(() => buildAcademicTasks(IELTS_VOCABULARY), []);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">{t.vocab.practiceArenaTitle}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t.vocab.practiceArenaSubtitle}</p>
      </div>

      {/* 8 Mode Selector */}
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4" role="tablist">
        {modeButtons.map((btn) => {
          const done = completedModes.includes(btn.id);
          return (
            <Button
              key={btn.id}
              role="tab"
              aria-selected={mode === btn.id}
              variant={mode === btn.id ? "default" : "outline"}
              className="justify-between rounded-xl text-xs font-semibold"
              onClick={() => setMode(btn.id)}
            >
              <span className="truncate">{btn.label}</span>
              {done && <CheckCircle2 className="size-4 shrink-0 text-emerald-500" aria-hidden />}
            </Button>
          );
        })}
      </div>

      {/* Active Mode Panel */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        {mode === "quiz" && (
          <ChoiceDrill
            key="quiz"
            questions={quizQuestions}
            instruction={t.vocab.modeQuiz}
            onFinish={(score) => onModeComplete("quiz", score)}
          />
        )}
        {mode === "collocation" && (
          <CollocationMatchDrill onFinish={() => onModeComplete("collocation")} />
        )}
        {mode === "sentence" && (
          <ChoiceDrill
            key="sentence"
            questions={sentenceQuestions}
            instruction={t.vocab.sentenceCompletionPrompt}
            onFinish={(score) => onModeComplete("sentence", score)}
          />
        )}
        {mode === "context" && (
          <ChoiceDrill
            key="context"
            questions={contextQuestions}
            instruction={t.vocab.contextSelectionPrompt}
            onFinish={(score) => onModeComplete("context", score)}
          />
        )}
        {mode === "paraphrase" && (
          <LexicalProductionDrill
            key="paraphrase"
            evalMode="paraphrase"
            items={IELTS_PARAPHRASING_TASKS.map((task) => ({
              id: task.id,
              badge: task.topic.replace("-", " & "),
              originalLabel: t.vocab.paraphrasePromptLabel,
              promptText: task.original,
              instruction: t.vocab.paraphraseInstruction,
              targetWords: task.targetWords,
              modelAnswer: task.modelParaphrase,
              modelNote: task.explanation[locale],
            }))}
            onEvaluated={() => onModeComplete("paraphrase")}
          />
        )}
        {mode === "academic" && (
          <LexicalProductionDrill
            key="academic"
            evalMode="academic-sentence"
            items={academicTasks.map((task) => ({
              id: task.id,
              badge: task.topic.replace("-", " & "),
              promptText: task.prompt,
              instruction: t.vocab.academicSentencePrompt,
              targetWords: task.targetWords,
              modelAnswer: task.model,
            }))}
            onEvaluated={() => onModeComplete("academic")}
          />
        )}
        {mode === "speaking" && (
          <LexicalProductionDrill
            key="speaking"
            evalMode="speaking"
            allowSpeech
            items={IELTS_SPEAKING_WRITING_PROMPTS.speaking.map((item) => ({
              id: item.id,
              badge: "IELTS Speaking Part 3",
              promptText: item.prompt,
              instruction: t.vocab.speakingModeHint,
              targetWords: item.suggestedWords,
            }))}
            onEvaluated={() => onModeComplete("speaking")}
          />
        )}
        {mode === "writing" && (
          <LexicalProductionDrill
            key="writing"
            evalMode="writing"
            items={IELTS_SPEAKING_WRITING_PROMPTS.writing.map((item) => ({
              id: item.id,
              badge: `IELTS Writing ${item.task}`,
              promptText: item.prompt,
              instruction: t.vocab.writingModeHint,
              targetWords: item.suggestedWords,
            }))}
            onEvaluated={() => onModeComplete("writing")}
          />
        )}
      </div>
    </section>
  );
}

function ChoiceDrill({
  questions,
  instruction,
  onFinish,
}: {
  questions: ChoiceQuestion[];
  instruction: string;
  onFinish: (score: number) => void;
}) {
  const { t, locale } = useI18n();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[index];
  if (!current) return null;

  function handleCheck() {
    if (selected === null || !current) return;
    setChecked(true);
    const nextScore = selected === current.correctIndex ? score + 1 : score;
    setScore(nextScore);
    if (index === questions.length - 1) {
      onFinish(nextScore);
    }
  }

  function handleNext() {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      setSelected(null);
      setChecked(false);
    } else {
      setFinished(true);
    }
  }

  function handleRestart() {
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="space-y-4 py-4 text-center">
        <Award className="mx-auto size-12 text-amber-500" aria-hidden />
        <p className="text-xl font-bold text-foreground">
          {format(t.vocab.quizScoreLabel, { score, total: questions.length })}
        </p>
        <Button onClick={handleRestart} variant="outline">
          <RefreshCw className="size-4" aria-hidden />
          {t.vocab.restartDrill}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-muted-foreground">
        <span>{instruction}</span>
        <span>
          {index + 1} / {questions.length} ·{" "}
          {format(t.vocab.quizScoreLabel, { score, total: questions.length })}
        </span>
      </div>

      <div className="rounded-xl bg-secondary/50 p-4" dir="ltr">
        <p className="text-base font-semibold text-foreground">{current.prompt}</p>
        {current.helper && <p className="mt-1 text-xs text-muted-foreground">{current.helper}</p>}
      </div>

      <div className="grid gap-2.5" dir="ltr">
        {current.options.map((opt, optIdx) => {
          const isSelected = selected === optIdx;
          const isCorrect = checked && optIdx === current.correctIndex;
          const isWrong = checked && isSelected && optIdx !== current.correctIndex;
          return (
            <button
              key={opt}
              type="button"
              disabled={checked}
              onClick={() => setSelected(optIdx)}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-start text-sm font-medium transition-colors ${
                isCorrect
                  ? "border-emerald-500 bg-emerald-500/10 text-foreground"
                  : isWrong
                    ? "border-rose-500 bg-rose-500/10 text-foreground"
                    : isSelected
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-background hover:bg-muted/60"
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

      {checked && (
        <div className="rounded-xl border border-border bg-secondary/40 p-3.5 text-sm text-foreground">
          {locale === "ar" ? current.explanationAr : current.explanationEn}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {!checked ? (
          <Button disabled={selected === null} onClick={handleCheck}>
            {t.vocab.checkAnswer}
          </Button>
        ) : (
          <Button onClick={handleNext}>{t.vocab.nextQuestion}</Button>
        )}
      </div>
    </div>
  );
}

function CollocationMatchDrill({ onFinish }: { onFinish: () => void }) {
  const { t } = useI18n();
  const pairs = useMemo(() => {
    return IELTS_VOCABULARY.slice(0, 5).map((entry) => ({
      id: entry.id,
      word: entry.word.split(" / ")[0]?.trim() ?? entry.word,
      collocation: entry.collocations[0] ?? entry.word,
      arabic: entry.arabic,
    }));
  }, []);

  const shuffledRight = useMemo(() => {
    return [pairs[2], pairs[0], pairs[4], pairs[1], pairs[3]].filter(
      (x): x is (typeof pairs)[number] => Boolean(x),
    );
  }, [pairs]);

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongFlash, setWrongFlash] = useState<string | null>(null);

  function handlePickRight(rightId: string) {
    if (!selectedLeft || matchedIds.includes(rightId)) return;
    if (selectedLeft === rightId) {
      const next = [...matchedIds, rightId];
      setMatchedIds(next);
      setSelectedLeft(null);
      setWrongFlash(null);
      if (next.length === pairs.length) {
        onFinish();
      }
    } else {
      setWrongFlash(rightId);
      setTimeout(() => setWrongFlash(null), 700);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-foreground">{t.vocab.collocationPrompt}</p>
        <p className="mt-1 text-xs text-muted-foreground">{t.vocab.selectWordFirst}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2" dir="ltr">
        <div className="space-y-2">
          {pairs.map((p) => {
            const matched = matchedIds.includes(p.id);
            const active = selectedLeft === p.id;
            return (
              <button
                key={p.id}
                type="button"
                disabled={matched}
                onClick={() => setSelectedLeft(p.id)}
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                  matched
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : active
                      ? "border-primary bg-primary/15 text-foreground"
                      : "border-border bg-background hover:bg-muted/60"
                }`}
              >
                <span>{p.word}</span>
                {matched && <Check className="size-4" aria-hidden />}
              </button>
            );
          })}
        </div>

        <div className="space-y-2">
          {shuffledRight.map((p) => {
            const matched = matchedIds.includes(p.id);
            const isWrong = wrongFlash === p.id;
            return (
              <button
                key={p.id}
                type="button"
                disabled={matched}
                onClick={() => handlePickRight(p.id)}
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                  matched
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : isWrong
                      ? "border-rose-500 bg-rose-500/15"
                      : "border-border bg-background hover:bg-muted/60"
                }`}
              >
                <span>{p.collocation}</span>
                {matched && <span className="text-xs font-bold">{t.vocab.collocationMatched}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {matchedIds.length === pairs.length && (
        <div className="flex items-center justify-between rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4">
          <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
            ✓ {format(t.vocab.quizScoreLabel, { score: pairs.length, total: pairs.length })}
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setMatchedIds([]);
              setSelectedLeft(null);
            }}
          >
            <RefreshCw className="size-3.5" aria-hidden />
            {t.vocab.restartDrill}
          </Button>
        </div>
      )}
    </div>
  );
}

interface ProductionPromptItem {
  id: string;
  badge: string;
  originalLabel?: string;
  promptText: string;
  instruction: string;
  targetWords: string[];
  modelAnswer?: string;
  modelNote?: string;
}

function LexicalProductionDrill({
  evalMode,
  items,
  allowSpeech = false,
  onEvaluated,
}: {
  evalMode: IeltsPracticeMode;
  items: ProductionPromptItem[];
  allowSpeech?: boolean;
  onEvaluated: () => void;
}) {
  const { t, locale } = useI18n();
  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    feedback: IeltsLexicalFeedback;
    source: "ai" | "rubric";
  } | null>(null);

  const speech = useSpeech((transcript) => {
    setResponse((prev) => (prev.trim() ? `${prev.trim()} ${transcript}` : transcript));
  });

  const current = items[index];
  if (!current) return null;

  const wordCount = (response.trim().match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) ?? []).length;

  async function handleEvaluate() {
    if (!current || !response.trim()) return;
    setLoading(true);
    try {
      const serverRes = await evaluateIeltsLexical({
        data: {
          mode: evalMode,
          prompt: current.promptText,
          targetWords: current.targetWords,
          learnerResponse: response.trim(),
        },
      });
      setResult(serverRes);
      onEvaluated();
    } catch {
      const local = evaluateIeltsLexicalLocal({
        mode: evalMode,
        prompt: current.promptText,
        targetWords: current.targetWords,
        learnerResponse: response.trim(),
      });
      setResult({ feedback: local, source: "rubric" });
      onEvaluated();
    } finally {
      setLoading(false);
    }
  }

  function selectItem(nextIdx: number) {
    setIndex(nextIdx);
    setResponse("");
    setShowModel(false);
    setResult(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{current.badge}</Badge>
          <span className="text-xs text-muted-foreground">
            {index + 1} / {items.length}
          </span>
        </div>
        <div className="flex gap-1.5">
          {items.map((it, idx) => (
            <Button
              key={it.id}
              size="sm"
              variant={idx === index ? "default" : "outline"}
              className="size-7 rounded-full p-0 text-xs"
              onClick={() => selectItem(idx)}
            >
              {idx + 1}
            </Button>
          ))}
        </div>
      </div>

      <p className="text-sm font-medium text-muted-foreground">{current.instruction}</p>

      <div className="rounded-xl border border-border bg-secondary/40 p-4" dir="ltr">
        {current.originalLabel && (
          <p className="text-xs font-bold uppercase text-primary">{current.originalLabel}</p>
        )}
        <div className="mt-1 flex items-start justify-between gap-3">
          <p className="text-base font-semibold text-foreground">{current.promptText}</p>
          <Button
            size="icon"
            variant="ghost"
            className="size-8 shrink-0"
            onClick={() => playSpeech(current.promptText, 0.92, "female")}
            aria-label={t.vocab.listenWord}
          >
            <Volume2 className="size-4" aria-hidden />
          </Button>
        </div>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {t.vocab.targetWordsLabel}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5" dir="ltr">
          {current.targetWords.map((w) => (
            <Badge
              key={w}
              variant="outline"
              className="border-primary/40 bg-primary/5 text-primary"
            >
              {w}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label
            className="text-sm font-semibold text-foreground"
            htmlFor={`lexical-${current.id}`}
          >
            {t.vocab.yourResponseLabel}
          </label>
          <span className="text-xs text-muted-foreground">
            {format(t.vocab.currentWordsLabel, { count: wordCount })}
          </span>
        </div>
        <Textarea
          id={`lexical-${current.id}`}
          rows={evalMode === "writing" ? 5 : 3}
          dir="ltr"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder={t.vocab.responsePlaceholder}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <Button disabled={loading || !response.trim()} onClick={handleEvaluate}>
          <Sparkles className="size-4" aria-hidden />
          {loading ? t.vocab.evaluatingLabel : t.vocab.evaluateLexicalBtn}
        </Button>

        {allowSpeech && speech.supported && (
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

        {current.modelAnswer && (
          <Button type="button" variant="outline" onClick={() => setShowModel((v) => !v)}>
            {showModel ? t.vocab.hideModelBtn : t.vocab.showModelBtn}
          </Button>
        )}
      </div>

      {showModel && current.modelAnswer && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
          <p className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">
            {t.vocab.modelAnswerLabel}
          </p>
          <p className="mt-1.5 text-sm font-medium text-foreground" dir="ltr">
            <HighlightedText text={current.modelAnswer} keywords={current.targetWords} />
          </p>
          {current.modelNote && (
            <p className="mt-1.5 text-xs text-muted-foreground">{current.modelNote}</p>
          )}
        </div>
      )}

      {result && (
        <div className="space-y-4 rounded-2xl border border-primary/30 bg-secondary/30 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs font-bold uppercase text-muted-foreground">
                {t.vocab.estimatedBandLabel}
              </p>
              <p className="text-2xl font-extrabold text-primary">
                Band {result.feedback.estimatedBand}
              </p>
            </div>
            <Badge variant="outline">
              {result.source === "ai" ? t.vocab.aiEvalBadge : t.vocab.rubricEvalBadge}
            </Badge>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: t.vocab.scoreAccuracy, val: result.feedback.scores.accuracy },
              { label: t.vocab.scoreNaturalness, val: result.feedback.scores.naturalness },
              { label: t.vocab.scoreAppropriateness, val: result.feedback.scores.appropriateness },
              { label: t.vocab.scoreRange, val: result.feedback.scores.range },
            ].map((metric) => (
              <div key={metric.label} className="rounded-xl border border-border bg-card p-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>{metric.label}</span>
                  <span className="text-primary">{metric.val}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${metric.val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-card p-4">
            <p className="text-xs font-bold uppercase text-muted-foreground">
              {t.vocab.examinerFeedbackLabel}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground">
              {result.feedback.feedback[locale]}
            </p>
          </div>

          {result.feedback.corrections.length > 0 && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4">
              <p className="text-xs font-bold uppercase text-rose-600 dark:text-rose-400">
                {t.vocab.correctionsLabel}
              </p>
              <ul className="mt-2 space-y-2 text-sm">
                {result.feedback.corrections.map((c, idx) => (
                  <li key={idx} className="space-y-0.5">
                    <p dir="ltr">
                      <span className="font-bold text-red-600 line-through">{c.original}</span> →{" "}
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">
                        {c.improved}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">{c.why[locale]}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs font-bold uppercase text-primary">
              {t.vocab.upgradedVersionLabel}
            </p>
            <p className="mt-1 text-sm font-medium text-foreground" dir="ltr">
              {result.feedback.upgradedVersion}
            </p>
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            ℹ️ {result.feedback.band7Note[locale]}
          </p>
        </div>
      )}
    </div>
  );
}
