import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";

import {
  LOCALE_COOKIE,
  THEME_COOKIE,
  getDirection,
  normalizeLocale,
  normalizeTheme,
  type Locale,
  type Theme,
} from "@/lib/i18n/config";
import { messages, type Messages } from "@/lib/i18n/messages";
import { savePreferenceCookie } from "@/lib/i18n/preferences";

type I18nValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  /** The interface text for the current language, e.g. t.nav.home */
  t: Messages;
  setLocale: (locale: Locale) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const I18nContext = createContext<I18nValue | null>(null);

/**
 * Provides the current language, text and theme to every component.
 * Changing language saves a cookie and re-runs the root route so the
 * page (including <html dir>) re-renders in the new language.
 */
export function I18nProvider({
  locale,
  theme,
  children,
}: {
  locale: Locale;
  theme: Theme;
  children: ReactNode;
}) {
  const router = useRouter();

  const setLocale = useCallback(
    (next: Locale) => {
      savePreferenceCookie(LOCALE_COOKIE, next);
      document.documentElement.lang = next;
      document.documentElement.dir = getDirection(next);
      void router.invalidate();
    },
    [router],
  );

  const setTheme = useCallback(
    (next: Theme) => {
      savePreferenceCookie(THEME_COOKIE, next);
      document.documentElement.classList.toggle("dark", next === "dark");
      void router.invalidate();
    },
    [router],
  );

  const value = useMemo<I18nValue>(() => {
    const safeLocale = normalizeLocale(locale);
    return {
      locale: safeLocale,
      dir: getDirection(safeLocale),
      t: messages[safeLocale],
      setLocale,
      theme: normalizeTheme(theme),
      setTheme,
    };
  }, [locale, theme, setLocale, setTheme]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * Used only if a component renders outside the provider (e.g. for a moment while the
 * dev server hot-reloads). Falls back to English instead of blanking the page.
 */
const FALLBACK: I18nValue = {
  locale: "en",
  dir: "ltr",
  t: messages.en,
  setLocale: (next) => {
    savePreferenceCookie(LOCALE_COOKIE, next);
    window.location.reload();
  },
  theme: "light",
  setTheme: (next) => {
    savePreferenceCookie(THEME_COOKIE, next);
    window.location.reload();
  },
};

export function useI18n() {
  return useContext(I18nContext) ?? FALLBACK;
}
