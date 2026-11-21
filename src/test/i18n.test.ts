import { describe, expect, it } from "vitest";

import { getDirection, normalizeLocale, normalizeTheme, readCookie } from "@/lib/i18n/config";
import { messages } from "@/lib/i18n/messages";

function keyPaths(obj: object, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" ? keyPaths(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );
}

describe("language rules", () => {
  it("Arabic pages read right-to-left", () => {
    expect(getDirection("ar")).toBe("rtl");
  });

  it("English pages read left-to-right", () => {
    expect(getDirection("en")).toBe("ltr");
  });

  it("falls back to English when no or an unknown language is saved", () => {
    expect(normalizeLocale(undefined)).toBe("en");
    expect(normalizeLocale("fr")).toBe("en");
    expect(normalizeLocale("ar")).toBe("ar");
  });

  it("reads the saved language from the cookie string", () => {
    expect(readCookie("theme=dark; lang=ar", "lang")).toBe("ar");
    expect(readCookie("theme=dark", "lang")).toBeUndefined();
  });

  it("defaults to light mode unless dark was chosen", () => {
    expect(normalizeTheme(undefined)).toBe("light");
    expect(normalizeTheme("dark")).toBe("dark");
  });

  it("every English text has an Arabic translation", () => {
    expect(keyPaths(messages.ar).sort()).toEqual(keyPaths(messages.en).sort());
    for (const path of keyPaths(messages.ar)) {
      const value = path.split(".").reduce<unknown>((o, k) => (o as Record<string, unknown>)[k], messages.ar);
      expect(value, path).not.toBe("");
    }
  });
});
