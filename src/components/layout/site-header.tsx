import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  BookMarked,
  BookOpen,
  Briefcase,
  ChevronDown,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  Layers,
  Menu,
  Mic,
  Presentation,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BrandLogo } from "./brand-logo";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const { t, dir } = useI18n();

  const linkClass =
    "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";
  const activeClass = "bg-secondary text-secondary-foreground";

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="container-page flex h-18 items-center justify-between gap-3 py-3">
        <BrandLogo />

        {/* Clean 10-Section Reorganised Desktop Navigation (Direct + 3 Organised Dropdowns) */}
        <nav aria-label={t.nav.paths} className="hidden items-center gap-0.5 xl:flex">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className={linkClass}
            activeProps={{ className: activeClass }}
          >
            {t.nav.home}
          </Link>

          <Link
            to="/dashboard"
            activeOptions={{ exact: true }}
            className={linkClass}
            activeProps={{ className: activeClass }}
          >
            <LayoutDashboard className="size-3.5 text-primary" aria-hidden />
            {t.nav.dashboard}
          </Link>

          {/* English Learning Pathways Dropdown */}
          <DropdownMenu dir={dir}>
            <DropdownMenuTrigger asChild>
              <button type="button" className={linkClass}>
                <GraduationCap className="size-3.5 text-primary" aria-hidden />
                <span>{t.nav.pathwaysMenu}</span>
                <ChevronDown className="size-3 opacity-70" aria-hidden />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/courses" className="flex items-center gap-2 font-medium">
                  <Layers className="size-4 text-primary" aria-hidden />
                  {t.nav.courses} (A1–C2)
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/cefr-mastery" className="flex items-center gap-2 font-medium">
                  <Sparkles className="size-4 text-primary" aria-hidden />
                  {t.nav.cefrMastery}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/level-test" className="flex items-center gap-2 font-medium">
                  <ClipboardCheck className="size-4 text-primary" aria-hidden />
                  {t.nav.levelTest}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/kids" className="flex items-center gap-2 font-medium">
                  <Users className="size-4 text-primary" aria-hidden />
                  {t.nav.kids}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/adults" className="flex items-center gap-2 font-medium">
                  <Users className="size-4 text-primary" aria-hidden />
                  {t.nav.adults}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* IELTS Preparation Dropdown */}
          <DropdownMenu dir={dir}>
            <DropdownMenuTrigger asChild>
              <button type="button" className={linkClass}>
                <BookOpen className="size-3.5 text-primary" aria-hidden />
                <span>{t.nav.ieltsMenu}</span>
                <ChevronDown className="size-3 opacity-70" aria-hidden />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/ielts" className="flex items-center gap-2 font-medium">
                  <GraduationCap className="size-4 text-primary" aria-hidden />
                  {t.nav.ielts}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/ielts-vocabulary" className="flex items-center gap-2 font-medium">
                  <BookOpen className="size-4 text-primary" aria-hidden />
                  {t.nav.ieltsVocab}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/business"
            activeOptions={{ exact: true }}
            className={linkClass}
            activeProps={{ className: activeClass }}
          >
            <Briefcase className="size-3.5 text-primary" aria-hidden />
            {t.nav.business}
          </Link>

          <Link
            to="/self-learning"
            activeOptions={{ exact: true }}
            className={linkClass}
            activeProps={{ className: activeClass }}
          >
            <BookMarked className="size-3.5 text-primary" aria-hidden />
            {t.nav.selfLearning}
          </Link>

          <Link
            to="/workshops"
            activeOptions={{ exact: true }}
            className={linkClass}
            activeProps={{ className: activeClass }}
          >
            <Presentation className="size-3.5 text-primary" aria-hidden />
            {t.nav.workshops}
          </Link>

          <Link
            to="/progress"
            activeOptions={{ exact: true }}
            className={linkClass}
            activeProps={{ className: activeClass }}
          >
            <BarChart3 className="size-3.5 text-primary" aria-hidden />
            {t.nav.progress}
          </Link>

          {/* Learning Resources & Profile Dropdown */}
          <DropdownMenu dir={dir}>
            <DropdownMenuTrigger asChild>
              <button type="button" className={linkClass}>
                <Settings className="size-3.5 text-primary" aria-hidden />
                <span>{t.nav.resourcesMenu}</span>
                <ChevronDown className="size-3 opacity-70" aria-hidden />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/speaking" className="flex items-center gap-2 font-medium">
                  <Mic className="size-4 text-primary" aria-hidden />
                  {t.nav.speakingStudio}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2 font-medium">
                  <Settings className="size-4 text-primary" aria-hidden />
                  {t.nav.profile}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <ThemeToggle />
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

          {/* Purpose-Built Grouped Mobile Navigation Drawer */}
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
              className="flex flex-col gap-5 overflow-y-auto"
              dir={dir}
            >
              <SheetHeader>
                <SheetTitle className="text-start">{t.nav.menuTitle}</SheetTitle>
              </SheetHeader>

              <nav aria-label={t.nav.paths} className="flex flex-col gap-5">
                {/* Group 1: My Journey */}
                <div className="space-y-1">
                  <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {t.nav.mobileGroupJourney}
                  </p>
                  <SheetClose asChild>
                    <Link
                      to="/"
                      activeOptions={{ exact: true }}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-muted"
                      activeProps={{ className: activeClass }}
                    >
                      {t.nav.home}
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to="/dashboard"
                      activeOptions={{ exact: true }}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-muted"
                      activeProps={{ className: activeClass }}
                    >
                      <LayoutDashboard className="size-4 text-primary" aria-hidden />
                      {t.nav.dashboard}
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to="/progress"
                      activeOptions={{ exact: true }}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-muted"
                      activeProps={{ className: activeClass }}
                    >
                      <BarChart3 className="size-4 text-primary" aria-hidden />
                      {t.nav.progress}
                    </Link>
                  </SheetClose>
                </div>

                {/* Group 2: English Learning Pathways */}
                <div className="space-y-1">
                  <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {t.nav.mobileGroupPathways}
                  </p>
                  {[
                    { to: "/courses" as const, label: `${t.nav.courses} (A1–C2)`, Icon: Layers },
                    { to: "/cefr-mastery" as const, label: t.nav.cefrMastery, Icon: Sparkles },
                    { to: "/kids" as const, label: t.nav.kids, Icon: Users },
                    { to: "/adults" as const, label: t.nav.adults, Icon: Users },
                  ].map(({ to, label, Icon }) => (
                    <SheetClose asChild key={to}>
                      <Link
                        to={to}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-muted"
                        activeProps={{ className: activeClass }}
                      >
                        <Icon className="size-4 text-primary" aria-hidden />
                        {label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                {/* Group 3: Specialised Tracks */}
                <div className="space-y-1">
                  <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {t.nav.mobileGroupTracks}
                  </p>
                  {[
                    { to: "/ielts" as const, label: t.nav.ielts, Icon: GraduationCap },
                    { to: "/ielts-vocabulary" as const, label: t.nav.ieltsVocab, Icon: BookOpen },
                    { to: "/business" as const, label: t.nav.business, Icon: Briefcase },
                    { to: "/self-learning" as const, label: t.nav.selfLearning, Icon: BookMarked },
                    { to: "/workshops" as const, label: t.nav.workshops, Icon: Presentation },
                  ].map(({ to, label, Icon }) => (
                    <SheetClose asChild key={to}>
                      <Link
                        to={to}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-muted"
                        activeProps={{ className: activeClass }}
                      >
                        <Icon className="size-4 text-primary" aria-hidden />
                        {label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                {/* Group 4: Resources & Profile */}
                <div className="space-y-1">
                  <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {t.nav.mobileGroupResources}
                  </p>
                  <SheetClose asChild>
                    <Link
                      to="/speaking"
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-muted"
                      activeProps={{ className: activeClass }}
                    >
                      <Mic className="size-4 text-primary" aria-hidden />
                      {t.nav.speakingStudio}
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-muted"
                      activeProps={{ className: activeClass }}
                    >
                      <Settings className="size-4 text-primary" aria-hidden />
                      {t.nav.profile}
                    </Link>
                  </SheetClose>
                </div>
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
