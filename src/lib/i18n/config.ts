/**
 * Language + theme settings shared by the server and the browser.
 * Both preferences live in cookies so the server can render the right
 * language direction (RTL/LTR) and theme on the very first paint.
 */
export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ar";

export type Theme = "light" | "dark";
export const DEFAULT_THEME: Theme = "light";

export const LOCALE_COOKIE = "lang";
export const THEME_COOKIE = "theme";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Any unknown or missing value falls back to Arabic (Arabic-first default). */
export function normalizeLocale(value: string | null | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function normalizeTheme(value: string | null | undefined): Theme {
  return value === "dark" ? "dark" : DEFAULT_THEME;
}

/** Arabic reads right-to-left; English left-to-right. */
export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

/** Reads one cookie value out of a `document.cookie`-style string. */
export function readCookie(cookieString: string, name: string): string | undefined {
  for (const part of cookieString.split(";")) {
    const [rawKey, ...rest] = part.trim().split("=");
    if (rawKey === name) return decodeURIComponent(rest.join("="));
  }
  return undefined;
}
