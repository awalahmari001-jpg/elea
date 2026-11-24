import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

vi.mock("@tanstack/react-router", () => ({
  useRouter: () => ({ invalidate: vi.fn() }),
  Link: ({ children, to, ...rest }: { children?: ReactNode; to?: string }) => (
    <a href={to ?? "#"} {...rest}>
      {children}
    </a>
  ),
}));

import { I18nProvider } from "@/components/i18n-provider";
import { ResourcesLibraryView } from "@/components/resources/resources-library-view";
import {
  GLOSSARY_ENTRIES,
  GRAMMAR_QUICK_CARDS,
  PRINTABLE_STUDY_GUIDES,
} from "@/content/resources-glossary";

afterEach(() => {
  cleanup();
});

describe("Reorg Phase 7 · Learning Resources Library & Searchable Bilingual Glossary", () => {
  it("provides bilingual glossary entries with IPA, A1–C2 grammar quick cards, and printable study guides", () => {
    expect(GLOSSARY_ENTRIES.length).toBeGreaterThanOrEqual(15);
    for (const entry of GLOSSARY_ENTRIES) {
      expect(entry.ipa.startsWith("/")).toBe(true);
      expect(entry.arabic.length).toBeGreaterThan(1);
    }
    expect(GRAMMAR_QUICK_CARDS.length).toBeGreaterThanOrEqual(6);
    expect(PRINTABLE_STUDY_GUIDES).toHaveLength(4);
  });

  it("filters glossary entries live by English/Arabic query and category, and renders cleanly in AR RTL", () => {
    const { rerender } = render(
      <I18nProvider locale="en" theme="light">
        <ResourcesLibraryView />
      </I18nProvider>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Learning Resources, Bilingual Glossary & Study Guides/i,
      }),
    ).toBeTruthy();

    // Filter by search query "mitigate"
    const search = screen.getByPlaceholderText(/Search English or Arabic terms/i);
    fireEvent.change(search, { target: { value: "mitigate" } });
    expect(screen.getByText("mitigate")).toBeTruthy();
    expect(screen.queryByText("deliverable")).toBeNull();

    // Clear search and filter by Business category
    fireEvent.change(search, { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: /^Business$/i }));
    expect(screen.getByText("stakeholder")).toBeTruthy();
    expect(screen.queryByText("mitigate")).toBeNull();

    // Render cleanly in Arabic RTL
    rerender(
      <I18nProvider locale="ar" theme="dark">
        <ResourcesLibraryView />
      </I18nProvider>,
    );
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /مكتبة المصادر التعليمية والقاموس الثنائي وأدلة الدراسة/i,
      }),
    ).toBeTruthy();
  }, 15000);
});
