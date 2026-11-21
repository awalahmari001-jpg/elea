import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";

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
  { to: "/", key: "home" },
  { to: "/kids", key: "kids" },
  { to: "/adults", key: "adults" },
  { to: "/ielts", key: "ielts" },
] as const;

export function SiteHeader() {
  const { t, dir } = useI18n();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <BrandLogo />

        <nav aria-label={t.nav.paths} className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: true }}
              className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-secondary text-secondary-foreground" }}
            >
              {t.nav[link.key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <ThemeToggle />
          <Button variant="outline" disabled className="hidden rounded-full md:inline-flex">
            {t.nav.signIn}
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[0.65rem] font-bold text-foreground">
              {t.nav.soon}
            </span>
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full lg:hidden" aria-label={t.nav.openMenu}>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side={dir === "rtl" ? "left" : "right"} className="flex flex-col gap-6" dir={dir}>
              <SheetHeader>
                <SheetTitle className="text-start">{t.nav.menuTitle}</SheetTitle>
              </SheetHeader>
              <nav aria-label={t.nav.paths} className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.to}>
                    <Link
                      to={link.to}
                      activeOptions={{ exact: true }}
                      className="rounded-xl px-4 py-3 text-lg font-semibold text-foreground hover:bg-muted"
                      activeProps={{ className: "bg-secondary text-secondary-foreground" }}
                    >
                      {t.nav[link.key]}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
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
