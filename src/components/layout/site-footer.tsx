import { Link } from "@tanstack/react-router";
import { Mail, MessageCircle } from "lucide-react";

import { SITE } from "@/config/site";
import { LEARNING_PATHS } from "@/content/paths";
import { useI18n } from "@/components/i18n-provider";
import { BrandLogo } from "./brand-logo";
import { LanguageSwitcher } from "./language-switcher";

export function SiteFooter() {
  const { t, locale } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-inverse text-inverse-foreground">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.35fr_1fr_1fr]">
        <div className="max-w-sm space-y-5">
          <BrandLogo tone="inverse" />
          <p className="text-sm leading-relaxed text-inverse-muted">{t.footer.about}</p>

          {/* Direct Contact Card — WhatsApp & Email */}
          <div className="space-y-2.5 rounded-2xl border border-inverse-foreground/15 bg-inverse-foreground/5 p-4">
            <h2 className="eyebrow text-accent">{t.footer.contactTitle}</h2>
            <p className="text-xs leading-relaxed text-inverse-muted">{t.footer.contactSubtitle}</p>
            <div className="flex flex-col gap-2 pt-1">
              <a
                href={SITE.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-emerald-500"
              >
                <MessageCircle className="size-4 shrink-0" aria-hidden />
                <span>{t.footer.whatsappLabel}:</span>
                <span dir="ltr" className="font-mono">
                  {SITE.contact.whatsappDisplay}
                </span>
              </a>
              <a
                href={SITE.contact.mailtoUrl}
                className="inline-flex items-center gap-2 rounded-xl border border-inverse-foreground/20 px-3.5 py-2 text-xs font-bold text-inverse-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <Mail className="size-4 shrink-0 text-accent" aria-hidden />
                <span dir="ltr" className="truncate">
                  {SITE.contact.email}
                </span>
              </a>
            </div>
          </div>
        </div>

        <div>
          <h2 className="eyebrow mb-4 text-accent">{t.footer.pathsTitle}</h2>
          <ul className="space-y-2.5">
            {LEARNING_PATHS.map((path) => (
              <li key={path.id}>
                <Link
                  to={path.to}
                  className="text-sm font-medium text-inverse-foreground/85 transition-colors hover:text-accent"
                >
                  {path.name[locale]}{" "}
                  <span className="text-inverse-muted">· {path.audience[locale]}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/speaking"
                className="text-sm font-semibold text-accent transition-colors hover:text-inverse-foreground"
              >
                {t.nav.dailySpeaking}{" "}
                <span className="text-inverse-muted" dir="ltr">
                  · 75 Situations
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/step"
                className="text-sm font-semibold text-accent transition-colors hover:text-inverse-foreground"
              >
                {t.nav.stepBank}{" "}
                <span className="text-inverse-muted" dir="ltr">
                  · 563 Questions
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/grammar"
                className="text-sm font-semibold text-accent transition-colors hover:text-inverse-foreground"
              >
                {t.nav.englishGrammar}{" "}
                <span className="text-inverse-muted" dir="ltr">
                  · 56 Units (A1–C2)
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/mock-exams"
                className="text-sm font-semibold text-accent transition-colors hover:text-inverse-foreground"
              >
                {t.nav.mockExams}{" "}
                <span className="text-inverse-muted" dir="ltr">
                  · IELTS & TOEFL
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/ielts-vocabulary"
                className="text-sm font-medium text-inverse-foreground/85 transition-colors hover:text-accent"
              >
                {t.nav.ieltsVocab}{" "}
                <span className="text-inverse-muted" dir="ltr">
                  · 500+ HF · 70+ Idioms
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/cefr-mastery"
                className="text-sm font-medium text-inverse-foreground/85 transition-colors hover:text-accent"
              >
                {t.nav.cefrMastery}{" "}
                <span className="text-inverse-muted" dir="ltr">
                  · A1–C2
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/self-learning"
                className="text-sm font-medium text-inverse-foreground/85 transition-colors hover:text-accent"
              >
                {t.nav.selfLearning}{" "}
                <span className="text-inverse-muted" dir="ltr">
                  · 600 Sentences
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/business"
                className="text-sm font-medium text-inverse-foreground/85 transition-colors hover:text-accent"
              >
                {t.nav.business}{" "}
                <span className="text-inverse-muted" dir="ltr">
                  · 18 Sectors
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/workshops"
                className="text-sm font-medium text-inverse-foreground/85 transition-colors hover:text-accent"
              >
                {t.nav.workshops}{" "}
                <span className="text-inverse-muted" dir="ltr">
                  · AI Role-Play
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="text-sm font-medium text-inverse-foreground/85 transition-colors hover:text-accent"
              >
                {t.nav.courses}{" "}
                <span className="text-inverse-muted" dir="ltr">
                  · A1–C2
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-inverse-foreground/85 transition-colors hover:text-accent"
              >
                {t.nav.dashboard}{" "}
                <span className="text-inverse-muted" dir="ltr">
                  · Hub
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/progress"
                className="text-sm font-medium text-inverse-foreground/85 transition-colors hover:text-accent"
              >
                {t.nav.progress}{" "}
                <span className="text-inverse-muted" dir="ltr">
                  · Analytics
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/resources"
                className="text-sm font-medium text-inverse-foreground/85 transition-colors hover:text-accent"
              >
                {t.nav.resourcesLibrary}
              </Link>
            </li>
            <li>
              <Link
                to="/calendar"
                className="text-sm font-medium text-inverse-foreground/85 transition-colors hover:text-accent"
              >
                {t.nav.calendar}
              </Link>
            </li>
            <li>
              <Link
                to="/certificates"
                className="text-sm font-medium text-inverse-foreground/85 transition-colors hover:text-accent"
              >
                {t.nav.certificates}
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="text-sm font-medium text-inverse-foreground/85 transition-colors hover:text-accent"
              >
                {t.nav.profile}
              </Link>
            </li>
            <li>
              <Link
                to="/level-test"
                className="text-sm font-semibold text-accent transition-colors hover:text-inverse-foreground"
              >
                {t.nav.levelTest}
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="eyebrow mb-4 text-accent">{t.footer.languageTitle}</h2>
            <LanguageSwitcher variant="full" />
          </div>
        </div>
      </div>

      <div className="border-t border-inverse-foreground/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-inverse-muted sm:flex-row">
          <p>
            © {year} {SITE.name}. {t.footer.rights}
          </p>
          <p className="font-semibold text-accent">{SITE.tagline[locale]}</p>
        </div>
      </div>
    </footer>
  );
}
