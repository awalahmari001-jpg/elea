import type { ReactNode } from "react";
import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-router")>();
  return {
    ...actual,
    useRouter: () => ({ invalidate: vi.fn() }),
    Link: ({ children, to, ...rest }: { children?: ReactNode; to?: string }) => (
      <a href={to ?? "#"} {...rest}>
        {children}
      </a>
    ),
  };
});

import { AdvancedStudios } from "@/components/home/advanced-studios";
import { I18nProvider } from "@/components/i18n-provider";
import { pageMeta } from "@/lib/i18n/head";
import { routeTree } from "@/routeTree.gen";

afterEach(() => {
  cleanup();
});

const ALL_PLATFORM_ROUTES = [
  "/",
  "/dashboard",
  "/calendar",
  "/resources",
  "/profile",
  "/certificates",
  "/kids",
  "/adults",
  "/ielts",
  "/courses",
  "/level-test",
  "/ielts-vocabulary",
  "/cefr-mastery",
  "/self-learning",
  "/business",
  "/workshops",
  "/progress",
] as const;

const ALL_META_KEYS = [
  "home",
  "dashboard",
  "calendar",
  "resources",
  "profile",
  "certificates",
  "kids",
  "adults",
  "ielts",
  "placement",
  "courses",
  "ieltsVocab",
  "cefrMastery",
  "selfLearning",
  "business",
  "workshops",
  "progress",
] as const;

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing & Phase 6 platform-wide QA", () => {
  it("matches every core and advanced platform route instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    for (const path of ALL_PLATFORM_ROUTES) {
      const matches = router.matchRoutes(path);
      expect(matches.at(-1)?.routeId, `Route ${path} should resolve`).not.toBe(rootRouteId);
    }
  });

  it("generates distinct bilingual EN & AR page metadata for every platform route", () => {
    for (const key of ALL_META_KEYS) {
      const enMeta = pageMeta("en", key).meta;
      const arMeta = pageMeta("ar", key).meta;
      const enTitle = enMeta.find((m) => "title" in m)?.title;
      const arTitle = arMeta.find((m) => "title" in m)?.title;
      expect(typeof enTitle === "string" && enTitle.length > 5, `EN title for ${key}`).toBe(true);
      expect(typeof arTitle === "string" && arTitle.length > 5, `AR title for ${key}`).toBe(true);
      expect(enTitle).not.toBe(arTitle);
    }
  });

  it("renders all 6 Advanced Studios links on the Home page cleanly in both English and Arabic", () => {
    const { rerender } = render(
      <I18nProvider locale="en" theme="light">
        <AdvancedStudios />
      </I18nProvider>,
    );

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Six Interactive Studios Built for Real Mastery/i,
      }),
    ).toBeTruthy();

    const expectedHrefs = [
      "/ielts-vocabulary",
      "/cefr-mastery",
      "/self-learning",
      "/business",
      "/workshops",
      "/progress",
    ];
    for (const href of expectedHrefs) {
      const link = screen.getAllByRole("link").find((a) => a.getAttribute("href") === href);
      expect(link, `Expected home showcase link to ${href}`).toBeTruthy();
    }

    rerender(
      <I18nProvider locale="ar" theme="dark">
        <AdvancedStudios />
      </I18nProvider>,
    );
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /ستة استوديوهات تفاعلية صُمّمت للإتقان الحقيقي/i,
      }),
    ).toBeTruthy();
  });
});
