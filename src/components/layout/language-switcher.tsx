import { useI18n } from "@/components/i18n-provider";
import { LOCALES, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

const LABELS: Record<Locale, { short: string; full: string }> = {
  en: { short: "EN", full: "English" },
  ar: { short: "ع", full: "العربية" },
};

/**
 * Two-button EN / ع switch. Choosing Arabic flips the whole page to right-to-left.
 */
export function LanguageSwitcher({
  className,
  variant = "compact",
}: {
  className?: string;
  variant?: "compact" | "full";
}) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.nav.languageLabel}
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-muted p-1",
        className,
      )}
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            aria-label={LABELS[code].full}
            onClick={() => !active && setLocale(code)}
            className={cn(
              "min-w-10 rounded-full px-3 py-1.5 text-sm font-bold transition-all",
              active
                ? "bg-primary text-primary-foreground shadow-card"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {variant === "full" ? LABELS[code].full : LABELS[code].short}
          </button>
        );
      })}
    </div>
  );
}
