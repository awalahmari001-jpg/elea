import { Link } from "@tanstack/react-router";

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
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm space-y-4">
          <BrandLogo tone="inverse" />
          <p className="text-sm leading-relaxed text-inverse-muted">{t.footer.about}</p>
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
                to="/ielts-vocabulary"
                className="text-sm font-medium text-inverse-foreground/85 transition-colors hover:text-accent"
              >
                {t.nav.ieltsVocab}{" "}
                <span className="text-inverse-muted" dir="ltr">
                  · Band 7+
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
                to="/level-test"
                className="text-sm font-semibold text-accent transition-colors hover:text-inverse-foreground"
              >
                {t.nav.levelTest}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow mb-4 text-accent">{t.footer.languageTitle}</h2>
          <LanguageSwitcher variant="full" />
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
