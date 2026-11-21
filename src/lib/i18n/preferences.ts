import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

import {
  LOCALE_COOKIE,
  THEME_COOKIE,
  normalizeLocale,
  normalizeTheme,
  readCookie,
  type Locale,
  type Theme,
} from "./config";

export type Preferences = { locale: Locale; theme: Theme };

/**
 * Reads the visitor's language and theme.
 * On the server it reads the request cookies; in the browser it reads document.cookie.
 * Used by the root route so every page knows the language before rendering.
 */
export const getPreferences = createIsomorphicFn()
  .server(
    (): Preferences => ({
      locale: normalizeLocale(getCookie(LOCALE_COOKIE)),
      theme: normalizeTheme(getCookie(THEME_COOKIE)),
    }),
  )
  .client(
    (): Preferences => ({
      locale: normalizeLocale(readCookie(document.cookie, LOCALE_COOKIE)),
      theme: normalizeTheme(readCookie(document.cookie, THEME_COOKIE)),
    }),
  );

/** Saves a preference for one year. */
export function savePreferenceCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000; samesite=lax`;
}
