import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Search, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import {
  SPEAKING_CATEGORIES,
  SPEAKING_SITUATIONS,
  type SpeakingCategory,
} from "@/content/speaking-situations";
import { format } from "@/lib/i18n/messages";
import { SpeakingConversation } from "./speaking-conversation";

export function SpeakingStudio() {
  const { t, locale } = useI18n();
  const [category, setCategory] = useState<SpeakingCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(SPEAKING_SITUATIONS[0]?.id ?? "");
  const filtered = SPEAKING_SITUATIONS.filter(
    (s) =>
      (category === "all" || s.category === category) &&
      `${s.title.en} ${s.title.ar} ${s.level}`.toLowerCase().includes(search.toLowerCase().trim()),
  );
  const situation = SPEAKING_SITUATIONS.find((s) => s.id === selected);
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
      <header className="py-6">
        <div className="flex flex-wrap items-center gap-3">
          <MessageCircle className="size-8 text-primary" aria-hidden />
          <h1 className="text-4xl font-bold">{t.learning.situationsTitle}</h1>
        </div>
        <p className="mt-3 text-muted-foreground">{t.learning.situationsIntro}</p>
        <p className="mt-2 text-sm font-semibold text-primary">
          {format(t.learning.situationsCount, { count: SPEAKING_SITUATIONS.length })}
        </p>
      </header>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label={t.learning.choose}>
        <Button
          variant={category === "all" ? "default" : "outline"}
          aria-pressed={category === "all"}
          onClick={() => setCategory("all")}
        >
          {t.test.filterAll}
        </Button>
        {SPEAKING_CATEGORIES.map((c) => (
          <Button
            key={c}
            variant={category === c ? "default" : "outline"}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c === "ielts" ? t.nav.ielts : t.learning[c]}
          </Button>
        ))}
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
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
              className="h-10 w-full rounded-lg border border-input bg-background pe-3 ps-10"
            />
          </div>
          <div
            className="mt-4 grid max-h-64 gap-2 overflow-y-auto pe-2 lg:max-h-[40rem]"
            role="group"
            aria-label={t.learning.choose}
          >
            {filtered.map((s) => (
              <Button
                key={s.id}
                variant={selected === s.id ? "secondary" : "ghost"}
                className="h-auto min-h-14 w-full justify-start whitespace-normal py-3 text-start"
                aria-pressed={selected === s.id}
                onClick={() => setSelected(s.id)}
              >
                <span className="shrink-0 text-xs font-bold text-primary">{s.level}</span>
                <span>{s.title[locale]}</span>
              </Button>
            ))}
            {filtered.length === 0 && (
              <p className="py-4 text-sm text-muted-foreground">{t.learning.noResults}</p>
            )}
          </div>
        </aside>
        {situation && <SpeakingConversation key={situation.id} situation={situation} />}
      </div>
    </div>
  );
}
