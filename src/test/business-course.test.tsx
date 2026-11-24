import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
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
import { BusinessCourseHub } from "@/components/business/business-course-hub";
import {
  BUSINESS_COMM_SKILLS,
  BUSINESS_EXPRESSION_CATEGORIES,
  BUSINESS_EXPRESSIONS,
  BUSINESS_MEETING_STAGES,
  BUSINESS_SECTORS,
  BUSINESS_VOCABULARY,
  COVER_LETTER_BLUEPRINT,
  CV_TRANSFORMATIONS,
  INTERVIEW_QUESTION_BANK,
  JOB_DESCRIPTION_DECODER,
  SALARY_NEGOTIATION_SCRIPTS,
  WORKPLACE_ETIQUETTE_TIPS,
} from "@/content/business";
import { learnerStorage } from "@/lib/learner-storage";
import { isBusinessItemUnlocked } from "@/lib/lesson-access";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  window.localStorage.clear();
});

describe("Phase 3 · Business English Course Dataset Integrity", () => {
  it("covers all 18 required business sectors with at least 100 unique terms per sector (IPA, collocations, Arabic, and workplace applications)", () => {
    expect(BUSINESS_SECTORS).toHaveLength(18);
    expect(BUSINESS_VOCABULARY.length).toBeGreaterThanOrEqual(1800);

    const bySector = new Map<string, Set<string>>();
    const ids = new Set<string>();
    for (const entry of BUSINESS_VOCABULARY) {
      expect(ids.has(entry.id), `Duplicate id ${entry.id}`).toBe(false);
      ids.add(entry.id);
      const terms = bySector.get(entry.sector) ?? new Set<string>();
      terms.add(entry.term.trim().toLowerCase());
      bySector.set(entry.sector, terms);
      expect(entry.ipa.startsWith("/"), `${entry.id} ipa`).toBe(true);
      expect(entry.arabic.trim().length, `${entry.id} arabic`).toBeGreaterThan(2);
      expect(entry.collocations.length, `${entry.id} collocations`).toBeGreaterThanOrEqual(2);
      expect(entry.workplaceApplication.en.length, `${entry.id} app.en`).toBeGreaterThan(10);
      expect(entry.workplaceApplication.ar.length, `${entry.id} app.ar`).toBeGreaterThan(5);
    }

    for (const sector of BUSINESS_SECTORS) {
      expect(
        bySector.get(sector.id)?.size ?? 0,
        `Business sector "${sector.id}" must have at least 100 unique terms`,
      ).toBeGreaterThanOrEqual(100);
    }
  });

  it("covers all 7 expression categories, all 15 communication skills, and all 15 meeting stages", () => {
    expect(BUSINESS_EXPRESSION_CATEGORIES).toHaveLength(7);
    expect(BUSINESS_EXPRESSIONS.length).toBeGreaterThanOrEqual(28);
    const exprCats = new Set(BUSINESS_EXPRESSIONS.map((e) => e.category));
    for (const cat of BUSINESS_EXPRESSION_CATEGORIES) {
      expect(exprCats.has(cat.id), `Missing expression category ${cat.id}`).toBe(true);
    }

    expect(BUSINESS_COMM_SKILLS).toHaveLength(15);
    expect(BUSINESS_COMM_SKILLS.map((s) => s.number)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    ]);

    expect(BUSINESS_MEETING_STAGES).toHaveLength(15);
    expect(BUSINESS_MEETING_STAGES.map((m) => m.stage)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    ]);
    for (const stage of BUSINESS_MEETING_STAGES) {
      expect(stage.dialogue.length).toBeGreaterThanOrEqual(2);
      const speakers = new Set(stage.dialogue.map((d) => d.speaker));
      expect(speakers.has("female"), `Stage ${stage.stage} needs female voice`).toBe(true);
      expect(speakers.has("male"), `Stage ${stage.stage} needs male voice`).toBe(true);
    }
  });

  it("provides Job Prep tools and A2–C2 progressive STAR interview models", () => {
    expect(CV_TRANSFORMATIONS.length).toBeGreaterThanOrEqual(3);
    expect(COVER_LETTER_BLUEPRINT.structure.length).toBe(3);
    expect(JOB_DESCRIPTION_DECODER.length).toBeGreaterThanOrEqual(4);
    expect(SALARY_NEGOTIATION_SCRIPTS.length).toBeGreaterThanOrEqual(2);
    expect(WORKPLACE_ETIQUETTE_TIPS.length).toBeGreaterThanOrEqual(4);

    expect(INTERVIEW_QUESTION_BANK.length).toBeGreaterThanOrEqual(6);
    for (const q of INTERVIEW_QUESTION_BANK) {
      for (const lvl of ["A2", "B1", "B2", "C1", "C2"] as const) {
        expect(q.modelsByLevel[lvl].trim().length, `${q.id} ${lvl}`).toBeGreaterThan(40);
      }
    }
  });

  it("enforces first-item free preview and full unlock after joining", () => {
    expect(isBusinessItemUnlocked(0, false)).toBe(true);
    expect(isBusinessItemUnlocked(1, false)).toBe(false);
    expect(isBusinessItemUnlocked(14, false)).toBe(false);
    expect(isBusinessItemUnlocked(1, true)).toBe(true);
    expect(isBusinessItemUnlocked(14, true)).toBe(true);
  });
});

describe("Phase 3 · Interactive Business English Course Hub UI", () => {
  it("filters 18-sector vocabulary, unlocks 15-stage meetings on join, completes a listening check, and validates a STAR interview answer", () => {
    render(
      <I18nProvider locale="en" theme="light">
        <BusinessCourseHub />
      </I18nProvider>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /Business English Course/i }),
    ).toBeTruthy();

    // 1. Search vocabulary and mark mastered
    const search = screen.getByPlaceholderText(/Search term, sector/i);
    fireEvent.change(search, { target: { value: "scope creep" } });
    expect(screen.getByRole("heading", { level: 2, name: "scope creep" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Mark mastered/i }));
    expect(learnerStorage.getBusiness().masteredVocabIds.length).toBe(1);

    // 2. Switch to 15-Stage Meetings Lab -> Stage 2 is locked before joining
    fireEvent.click(screen.getByRole("tab", { name: /15-Stage Meetings Lab/i }));
    fireEvent.click(screen.getByRole("tab", { name: /#2/i }));
    expect(screen.getByText(/Stage 2 of 15/i)).toBeTruthy();

    // Join course -> unlocks Stage 2 immediately
    const joinBtns = screen.getAllByRole("button", { name: /Join Business English Course/i });
    fireEvent.click(joinBtns[0]!);
    expect(learnerStorage.getBusiness().joined).toBe(true);

    // Complete Stage 2 listening check
    const stage2 = BUSINESS_MEETING_STAGES[1]!;
    fireEvent.click(
      screen.getByRole("button", {
        name: stage2.listeningTask.options[stage2.listeningTask.correct]!,
      }),
    );
    fireEvent.click(screen.getByRole("button", { name: /Check answer/i }));
    expect(learnerStorage.getBusiness().completedMeetingIds).toContain("mtg-02");

    // 3. Switch to Job Prep & STAR Interviews -> change CEFR model to C1 & test STAR builder
    fireEvent.click(screen.getByRole("tab", { name: /Job Prep & STAR Interviews/i }));
    fireEvent.click(screen.getByRole("button", { name: "C1" }));
    expect(screen.getByText(/CEFR C1 Model/i)).toBeTruthy();

    const starInput = screen.getByPlaceholderText(/Draft or dictate your natural workplace/i);
    fireEvent.change(starInput, {
      target: {
        value:
          "During our Q3 product launch, our primary logistics carrier delayed delivery by two days. I immediately negotiated a backup carrier, aligned our warehouse teams, and delivered every flagship branch on time, which saved forty thousand dollars.",
      },
    });
    fireEvent.click(screen.getByRole("button", { name: /Check STAR Structure/i }));
    expect(screen.getByText(/Strong STAR response/i)).toBeTruthy();
    expect(learnerStorage.getBusiness().practicedInterviewIds).toContain("int-01");
  });
});
