import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { I18nProvider } from "@/components/i18n-provider";
import { WorkshopStudio } from "@/components/workshops/workshop-studio";
import { WORKSHOP_ROLES, WORKSHOP_SCENARIOS } from "@/content/workshops/scenarios";
import { CEFR_WORKSHOP_PROFILES } from "@/content/workshops/workshop-types";
import { learnerStorage } from "@/lib/learner-storage";
import { evaluateWorkshopLocal, generateWorkshopReplyLocal } from "@/lib/workshop-fallback";

vi.mock("@/lib/workshop-ai.functions", () => ({
  workshopReplyTurn: vi.fn(async ({ data }) => ({
    ...generateWorkshopReplyLocal(data),
    source: "simulation" as const,
  })),
  evaluateWorkshopSession: vi.fn(async ({ data }) => ({
    evaluation: evaluateWorkshopLocal(data),
    source: "simulation" as const,
  })),
}));

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  window.localStorage.clear();
});

describe("Phase 4 · Interactive Business Workshops Dataset Integrity", () => {
  it("provides all 14 scenarios (10 core + 4 industry) and all 12 AI professional roles", () => {
    expect(WORKSHOP_ROLES).toHaveLength(12);
    expect(WORKSHOP_SCENARIOS).toHaveLength(14);
    expect(WORKSHOP_SCENARIOS.filter((s) => s.category === "core")).toHaveLength(10);
    expect(WORKSHOP_SCENARIOS.filter((s) => s.category === "industry")).toHaveLength(4);

    const roleIds = new Set(WORKSHOP_ROLES.map((r) => r.id));
    const scenarioIds = new Set(WORKSHOP_SCENARIOS.map((s) => s.id));
    expect(roleIds.size).toBe(12);
    expect(scenarioIds.size).toBe(14);

    for (const sc of WORKSHOP_SCENARIOS) {
      expect(roleIds.has(sc.defaultRole)).toBe(true);
      expect(sc.objectives).toHaveLength(3);
      expect(sc.complications).toHaveLength(3);
      expect(sc.openingPrompt.length).toBeGreaterThan(30);
      for (const followId of sc.recommendedFollowUps) {
        expect(scenarioIds.has(followId), `Invalid follow-up ${followId}`).toBe(true);
      }
    }

    for (const lvl of ["A2", "B1", "B2", "C1", "C2"] as const) {
      expect(CEFR_WORKSHOP_PROFILES[lvl].targetTurns).toBeGreaterThanOrEqual(4);
    }
  });
});

describe("Phase 4 · Adaptive Role-Play & Dual-Axis 10-Criterion Evaluator", () => {
  it("adapts replies dynamically to learner turns and separates Linguistic Performance from Business Decision-Making", () => {
    const scenario = WORKSHOP_SCENARIOS[2]!; // B2B Contract & Pricing Negotiation

    const strongBusinessWeakGrammar = evaluateWorkshopLocal({
      scenarioId: scenario.id,
      roleId: "business-client",
      level: "B2",
      turns: [
        { speaker: "ai", text: scenario.openingPrompt, timestamp: "2026-11-23T12:00:00Z" },
        {
          speaker: "learner",
          text: "I am agree about your budget pressure. Despite of high costs, if we sign a 24-month contract by Friday, we can offer 10% discount and assign one dedicated owner.",
          timestamp: "2026-11-23T12:01:00Z",
        },
        {
          speaker: "learner",
          text: "Our feedbacks show this compromise protects your Q3 margin while keeping SLA delivery on schedule within 5 days.",
          timestamp: "2026-11-23T12:02:00Z",
        },
      ],
    });

    // Strong business judgment (numbers, conditional trade-off, deadline, ownership) vs grammar slips ("I am agree", "Despite of", "feedbacks")
    expect(strongBusinessWeakGrammar.sentenceCorrections.length).toBeGreaterThanOrEqual(3);
    expect(strongBusinessWeakGrammar.businessDecisionScore).toBeGreaterThan(
      strongBusinessWeakGrammar.linguisticScore,
    );
    expect(Object.keys(strongBusinessWeakGrammar.criteria)).toHaveLength(10);

    // Dynamic responder reacts to short answers with a realistic pushback
    const pushback = generateWorkshopReplyLocal({
      scenarioId: scenario.id,
      roleId: "business-client",
      level: "C1",
      turns: [
        { speaker: "ai", text: scenario.openingPrompt, timestamp: "2026-11-23T12:00:00Z" },
        { speaker: "learner", text: "Okay maybe.", timestamp: "2026-11-23T12:01:00Z" },
      ],
    });
    expect(pushback.reply.toLowerCase()).toContain("more substance");
  });
});

describe("Phase 4 · Interactive Business Workshops Studio UI", () => {
  it("launches a simulation, runs multi-turn role-play, generates a dual-axis report, and saves replay history", async () => {
    render(
      <I18nProvider locale="en" theme="light">
        <WorkshopStudio />
      </I18nProvider>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /Interactive Business Workshops/i }),
    ).toBeTruthy();

    // Choose C1 difficulty & launch default scenario
    fireEvent.click(screen.getByRole("button", { name: "C1" }));
    fireEvent.click(screen.getByRole("button", { name: /Launch Interactive Workshop/i }));

    // Turn 1
    const input = screen.getByLabelText(/Speak via microphone or type/i);
    fireEvent.change(input, {
      target: {
        value:
          "Over the past two years, I led our regional customs overhaul, cutting turnaround times by 28% and saving 11% in annual freight spend.",
      },
    });
    fireEvent.click(screen.getByRole("button", { name: /Send Response/i }));
    expect(await screen.findByText(/Turn 1 \/ 5 recommended/i)).toBeTruthy();

    // Turn 2
    fireEvent.change(input, {
      target: {
        value:
          "I appreciate that challenge. When a regional VP pushed back on timelines, I scheduled a focused data review, aligned on shared Q3 revenue KPIs, and agreed on a phased pilot by Friday.",
      },
    });
    fireEvent.click(screen.getByRole("button", { name: /Send Response/i }));
    expect(await screen.findByText(/Turn 2 \/ 5 recommended/i)).toBeTruthy();

    // Generate Dual-Axis Report
    fireEvent.click(screen.getByRole("button", { name: /Finish & Generate Dual-Axis Report/i }));
    expect(await screen.findByText(/Dual-Axis Workshop Evaluation Report/i)).toBeTruthy();
    expect(screen.getByText(/Axis 1 · Linguistic Performance/i)).toBeTruthy();
    expect(screen.getByText(/Axis 2 · Business Decision-Making/i)).toBeTruthy();

    // Persisted in replay history
    expect(learnerStorage.getWorkshops()).toHaveLength(1);

    // Switch to Saved Replays & Trends tab
    fireEvent.click(screen.getByRole("tab", { name: /Saved Replays & Trends/i }));
    expect(screen.getByText(/Performance Comparison Over Time/i)).toBeTruthy();
  });
});
