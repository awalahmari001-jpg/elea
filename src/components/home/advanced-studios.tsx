import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BookMarked,
  BookOpenCheck,
  BookText,
  Briefcase,
  ClipboardCheck,
  FileCheck2,
  Layers,
  Mail,
  MessageCircle,
  Mic,
  Presentation,
} from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { SITE } from "@/config/site";

export function AdvancedStudios() {
  const { t } = useI18n();
  const s = t.advancedStudios;

  const cards = [
    {
      to: "/step" as const,
      icon: FileCheck2,
      badge: s.stepBadge,
      title: s.stepTitle,
      desc: s.stepDesc,
    },
    {
      to: "/grammar" as const,
      icon: BookText,
      badge: s.grammarBadge,
      title: s.grammarTitle,
      desc: s.grammarDesc,
    },
    {
      to: "/mock-exams" as const,
      icon: ClipboardCheck,
      badge: s.mockExamsBadge,
      title: s.mockExamsTitle,
      desc: s.mockExamsDesc,
    },
    {
      to: "/speaking" as const,
      icon: Mic,
      badge: s.dailySpeakingBadge,
      title: s.dailySpeakingTitle,
      desc: s.dailySpeakingDesc,
    },
    {
      to: "/ielts-vocabulary" as const,
      icon: BookOpenCheck,
      badge: s.ieltsVocabBadge,
      title: s.ieltsVocabTitle,
      desc: s.ieltsVocabDesc,
    },
    {
      to: "/cefr-mastery" as const,
      icon: Layers,
      badge: s.cefrBadge,
      title: s.cefrTitle,
      desc: s.cefrDesc,
    },
    {
      to: "/self-learning" as const,
      icon: BookMarked,
      badge: s.selfLearningBadge,
      title: s.selfLearningTitle,
      desc: s.selfLearningDesc,
    },
    {
      to: "/business" as const,
      icon: Briefcase,
      badge: s.businessBadge,
      title: s.businessTitle,
      desc: s.businessDesc,
    },
    {
      to: "/workshops" as const,
      icon: Presentation,
      badge: s.workshopsBadge,
      title: s.workshopsTitle,
      desc: s.workshopsDesc,
    },
    {
      to: "/progress" as const,
      icon: BarChart3,
      badge: s.progressBadge,
      title: s.progressTitle,
      desc: s.progressDesc,
    },
  ];

  return (
    <section
      id="advanced-studios"
      className="scroll-mt-24 border-y border-border/70 bg-muted/35 py-20 md:py-24"
    >
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-primary">{s.eyebrow}</p>
          <h2 className="display-heading mt-3 text-3xl text-foreground md:text-4xl">{s.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {s.subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.to}
                to={card.to}
                className="group flex flex-col rounded-3xl border-2 border-foreground/85 bg-card p-6 text-card-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-ink focus-visible:shadow-ink"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
                    {card.badge}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-extrabold text-foreground">{card.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {card.desc}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
                  <span>{s.openCta}</span>
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Direct Academy Contact Banner — WhatsApp & Email */}
        <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-3xl border-2 border-primary/30 bg-card p-6 shadow-xs md:flex-row md:items-center md:p-8">
          <div className="space-y-1.5">
            <p className="eyebrow text-primary">{t.footer.contactTitle}</p>
            <h3 className="display-heading text-xl font-extrabold text-foreground md:text-2xl">
              {t.footer.contactBannerTitle}
            </h3>
            <p className="max-w-xl text-sm text-muted-foreground">{t.footer.contactSubtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={SITE.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-xs transition-colors hover:bg-emerald-500"
            >
              <MessageCircle className="size-4 shrink-0" aria-hidden />
              <span>{t.footer.whatsappLabel}:</span>
              <span dir="ltr" className="font-mono">
                {SITE.contact.whatsappDisplay}
              </span>
            </a>
            <a
              href={SITE.contact.mailtoUrl}
              className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-background px-5 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Mail className="size-4 shrink-0 text-primary" aria-hidden />
              <span dir="ltr">{SITE.contact.email}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
