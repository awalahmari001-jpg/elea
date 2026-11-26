import { Link } from "@tanstack/react-router";
import { BarChart3, BookMarked, Layers, LayoutDashboard, Sparkles } from "lucide-react";

import { useI18n } from "@/components/i18n-provider";

/**
 * Purpose-built mobile quick-jump sticky bottom bar (< xl screens)
 * answering "Continue Learning" with one thumb tap in both LTR and RTL.
 */
export function MobileQuickNav() {
  const { t } = useI18n();

  const itemClass =
    "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-bold text-muted-foreground transition-colors hover:text-foreground";
  const activeClass = "text-primary";

  return (
    <nav
      aria-label={t.nav.mobileGroupJourney}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/95 backdrop-blur-md xl:hidden"
    >
      <div className="mx-auto flex max-w-lg items-center justify-around px-1 pb-[env(safe-area-inset-bottom)]">
        <Link
          to="/dashboard"
          activeOptions={{ exact: true }}
          className={itemClass}
          activeProps={{ className: `${itemClass} ${activeClass}` }}
        >
          <LayoutDashboard className="size-4" aria-hidden />
          <span className="truncate">{t.nav.dashboard}</span>
        </Link>
        <Link
          to="/courses"
          className={itemClass}
          activeProps={{ className: `${itemClass} ${activeClass}` }}
        >
          <Layers className="size-4" aria-hidden />
          <span className="truncate">{t.nav.courses}</span>
        </Link>
        <Link
          to="/self-learning"
          activeOptions={{ exact: true }}
          className={itemClass}
          activeProps={{ className: `${itemClass} ${activeClass}` }}
        >
          <BookMarked className="size-4" aria-hidden />
          <span className="truncate">{t.nav.selfLearning}</span>
        </Link>
        <Link
          to="/kids"
          activeOptions={{ exact: true }}
          className={itemClass}
          activeProps={{ className: `${itemClass} ${activeClass}` }}
        >
          <Sparkles className="size-4" aria-hidden />
          <span className="truncate">{t.nav.kids}</span>
        </Link>
        <Link
          to="/progress"
          activeOptions={{ exact: true }}
          className={itemClass}
          activeProps={{ className: `${itemClass} ${activeClass}` }}
        >
          <BarChart3 className="size-4" aria-hidden />
          <span className="truncate">{t.nav.progress}</span>
        </Link>
      </div>
    </nav>
  );
}
