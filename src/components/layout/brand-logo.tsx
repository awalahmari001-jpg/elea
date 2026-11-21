import { Link } from "@tanstack/react-router";

import logo from "@/assets/easy-learning-english-logo.webp.asset.json";
import { SITE } from "@/config/site";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";

/** The academy logo + name. `tone="inverse"` is for dark (navy) backgrounds. */
export function BrandLogo({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "inverse";
}) {
  const { locale } = useI18n();
  return (
    <Link to="/" className={cn("group flex items-center gap-3", className)}>
      <img
        src={logo.url}
        alt=""
        width={48}
        height={48}
        className="size-11 shrink-0 rounded-full bg-card shadow-card ring-1 ring-border transition-transform group-hover:rotate-[-6deg] md:size-12"
      />
      <span className="flex flex-col leading-tight">
        <span
          className={cn(
            "text-base font-extrabold tracking-tight md:text-lg",
            tone === "inverse" ? "text-inverse-foreground" : "text-foreground",
          )}
        >
          {SITE.name}
        </span>
        <span
          className={cn(
            "text-[0.7rem] font-semibold",
            tone === "inverse" ? "text-accent" : "text-muted-foreground",
          )}
        >
          {SITE.tagline[locale]}
        </span>
      </span>
    </Link>
  );
}
