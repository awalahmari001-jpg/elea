import { BookOpenCheck, CheckCircle2, Lightbulb, Volume2, XCircle } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import type { DetailedRuleGuide, LessonSkill } from "@/content/lesson-types";
import { playSpeech } from "@/hooks/use-speech";

export interface DetailedRuleGuideViewProps {
  guide: DetailedRuleGuide;
  skill: LessonSkill;
}

export function DetailedRuleGuideView({ guide, skill }: DetailedRuleGuideViewProps) {
  const { locale, t } = useI18n();
  const sectionTitle = skill === "grammar" ? t.learning.guideTitle : t.learning.guideReadingTitle;

  return (
    <section className="border-t border-border py-8">
      <div className="flex items-center gap-2.5">
        <BookOpenCheck className="size-6 text-primary" aria-hidden />
        <h2 className="text-2xl font-bold">{sectionTitle}</h2>
      </div>

      {/* Summary Overview */}
      <div className="mt-4 rounded-2xl border border-primary/20 bg-secondary/40 p-5">
        <p className="text-base font-medium leading-relaxed text-foreground">
          {guide.summary[locale]}
        </p>
      </div>

      {/* When & How to Use */}
      <div className="mt-6 rounded-xl border border-border bg-card p-5">
        <h3 className="text-lg font-bold text-primary">{t.learning.guideWhenToUse}</h3>
        <ol className="mt-3 space-y-3">
          {guide.whenToUse.map((item, idx) => (
            <li key={item.en} className="flex items-start gap-3 text-sm leading-relaxed">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {idx + 1}
              </span>
              <span>{item[locale]}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Structure & Formula Table */}
      <div className="mt-6">
        <h3 className="text-lg font-bold">{t.learning.guideFormulas}</h3>
        <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/60 text-start">
              <tr>
                <th className="px-4 py-3 text-start font-bold">{t.learning.guideFormLabel}</th>
                <th className="px-4 py-3 text-start font-bold">{t.learning.guidePattern}</th>
                <th className="px-4 py-3 text-start font-bold">{t.learning.guideExample}</th>
                <th className="px-4 py-3 text-start font-bold">{t.learning.guideArabic}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {guide.formulas.map((row) => (
                <tr key={`${row.label.en}-${row.pattern}`}>
                  <td className="px-4 py-3 font-bold text-foreground">{row.label[locale]}</td>
                  <td className="px-4 py-3" lang="en" dir="ltr">
                    <code className="rounded-md bg-secondary px-2 py-1 font-mono text-xs font-semibold text-secondary-foreground">
                      {row.pattern}
                    </code>
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground" lang="en" dir="ltr">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => playSpeech(row.example, 0.88)}
                        className="rounded-md p-1 text-primary hover:bg-muted"
                        aria-label={`${t.learning.listen}: ${row.example}`}
                      >
                        <Volume2 className="size-4" aria-hidden />
                      </button>
                      <span>{row.example}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground" lang="ar" dir="rtl">
                    {row.arabic}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Common Mistakes to Avoid */}
      <div className="mt-6">
        <h3 className="text-lg font-bold">{t.learning.guideMistakes}</h3>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {guide.commonMistakes.map((mistake) => (
            <article
              key={mistake.wrong}
              className="rounded-xl border border-border bg-card p-4 shadow-xs"
            >
              <div className="space-y-2.5">
                <div className="rounded-lg border border-destructive/25 bg-destructive/5 p-3">
                  <p className="flex items-center gap-1.5 text-xs font-bold text-destructive">
                    <XCircle className="size-4 shrink-0" aria-hidden />
                    {t.learning.guideWrong}
                  </p>
                  <p
                    className="mt-1 text-sm font-semibold text-foreground line-through decoration-destructive/70"
                    lang="en"
                    dir="ltr"
                  >
                    {mistake.wrong}
                  </p>
                </div>
                <div className="rounded-lg border border-success/30 bg-success/5 p-3">
                  <p className="flex items-center gap-1.5 text-xs font-bold text-success">
                    <CheckCircle2 className="size-4 shrink-0" aria-hidden />
                    {t.learning.guideRight}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground" lang="en" dir="ltr">
                    {mistake.right}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {mistake.why[locale]}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Golden Memory Tip */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-primary/25 bg-accent-soft p-5">
        <Lightbulb className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
        <div>
          <h3 className="text-sm font-bold text-primary">{t.learning.guideMemoryTip}</h3>
          <p className="mt-1 text-sm font-medium leading-relaxed text-foreground">
            {guide.memoryTip[locale]}
          </p>
        </div>
      </div>
    </section>
  );
}
