import { Link } from "@tanstack/react-router";
import { BookMarked, Briefcase, ClipboardCheck, Menu, Presentation } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useI18n } from "@/components/i18n-provider";
import { BrandLogo } from "./brand-logo";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

const NAV_LINKS = [
  { to: "/", key: "home", icon: "none" },
  { to: "/kids", key: "kids", icon: "none" },
  { to: "/adults", key: "adults", icon: "none" },
  { to: "/ielts", key: "ielts", icon: "none" },
  { to: "/ielts-vocabulary", key: "ieltsVocab", icon: "none" },
  { to: "/cefr-mastery", key: "cefrMastery", icon: "none" },
  { to: "/self-learning", key: "selfLearning", icon: "book" },
  { to: "/business", key: "business", icon: "briefcase" },
  { to: "/workshops", key: "workshops", icon: "workshops" },
  { to: "/courses", key: "courses", icon: "none" },
] as const;

export function SiteHeader() {
  const { t, dir } = useI18n();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <BrandLogo />

        <nav aria-label={t.nav.paths} className="hidden items-center gap-0.5 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: true }}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground 2xl:px-3"
              activeProps={{ className: "bg-secondary text-secondary-foreground" }}
            >
              {link.icon === "book" && <BookMarked className="size-3.5 text-primary" aria-hidden />}
              {link.icon === "briefcase" && (
                <Briefcase className="size-3.5 text-primary" aria-hidden />
              )}
              {link.icon === "workshops" && (
                <Presentation className="size-3.5 text-primary" aria-hidden />
              )}
              {t.nav[link.key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <ThemeToggle />
          {/* Level test: always visible (icon only on small screens) */}
          <Button
            asChild
            variant="accent"
            className="rounded-full px-3 md:px-4"
            title={t.nav.levelTest}
          >
            <Link to="/level-test" aria-label={t.nav.levelTest}>
              <ClipboardCheck aria-hidden />
              <span className="hidden md:inline">{t.nav.levelTest}</span>
            </Link>
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full xl:hidden"
                aria-label={t.nav.openMenu}
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              side={dir === "rtl" ? "left" : "right"}
              className="flex flex-col gap-6"
              dir={dir}
            >
              <SheetHeader>
                <SheetTitle className="text-start">{t.nav.menuTitle}</SheetTitle>
              </SheetHeader>
              <nav aria-label={t.nav.paths} className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.to}>
                    <Link
                      to={link.to}
                      activeOptions={{ exact: true }}
                      className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-lg font-semibold text-foreground hover:bg-muted"
                      activeProps={{ className: "bg-secondary text-secondary-foreground" }}
                    >
                      {link.icon === "book" && (
                        <BookMarked className="size-5 text-primary" aria-hidden />
                      )}
                      {link.icon === "briefcase" && (
                        <Briefcase className="size-5 text-primary" aria-hidden />
                      )}
                      {link.icon === "workshops" && (
                        <Presentation className="size-5 text-primary" aria-hidden />
                      )}
                      {t.nav[link.key]}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <SheetClose asChild>
                <Button asChild variant="accent" size="lg" className="rounded-xl">
                  <Link to="/level-test">
                    <ClipboardCheck aria-hidden />
                    {t.nav.levelTest}
                  </Link>
                </Button>
              </SheetClose>
              <div className="mt-auto flex flex-col gap-2">
                <span className="eyebrow text-muted-foreground">{t.nav.languageLabel}</span>
                <LanguageSwitcher variant="full" className="self-start" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
