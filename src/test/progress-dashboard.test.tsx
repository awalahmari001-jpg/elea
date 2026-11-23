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
import { ProgressDashboard } from "@/components/progress/progress-dashboard";
import type { WorkshopSessionRecord } from "@/content/workshops/workshop-types";
import {
  computeUnifiedProgress,
  exportLearnerBackupJson,
  importLearnerBackupJson,
  TOTAL_CEFR_INDICATORS,
  TOTAL_IELTS_VOCAB_ITEMS,
  TOTAL_SELF_LEARNING_SENTENCES,
} from "@/lib/learner-progress";
import { learnerStorage } from "@/lib/learner-storage";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  window.localStorage.clear();
});

function makeWorkshopSession(
  id: string,
  completedAt: string,
  linguisticScore: number,
  businessDecisionScore: number,
  weaknessEn: string,
): WorkshopSessionRecord {
  const overallScore = Math.round((linguisticScore + businessDecisionScore) / 2);
  return {
    id,
    scenarioId: "salary-promotion",
    roleId: "hr-manager",
    level: "B2",
    turns: [
      { speaker: "ai", text: "Let's discuss your compensation review.", timestamp: completedAt },
      {
        speaker: "learner",
        text: "I delivered 22% revenue growth this year.",
        timestamp: completedAt,
      },
    ],
    evaluation: {
      overallScore,
      linguisticScore,
      businessDecisionScore,
      criteria: {
        vocabularyRange: linguisticScore,
        grammaticalAccuracy: linguisticScore,
        fluencyCoherence: linguisticScore,
        pronunciationDelivery: linguisticScore,
        toneAppropriateness: linguisticScore,
        spontaneousResponse: businessDecisionScore,
        argumentDevelopment: businessDecisionScore,
        communicationEffectiveness: businessDecisionScore,
        objectiveAchievement: businessDecisionScore,
        stakeholderComposure: businessDecisionScore,
      },
      usedVoice: false,
      summary: { en: "Solid executive progress.", ar: "تقدّم تنفيذي جيد." },
      sentenceCorrections: [],
      upgradedExpressions: [],
      recurringWeaknesses: [{ en: weaknessEn, ar: "استخدم صياغة دبلوماسية أكثر." }],
      objectivesMet: [],
      recommendedWorkshopIds: ["project-negotiation"],
    },
    completedAt,
  };
}

function seedMultiModuleLearner() {
  learnerStorage.saveProfile({
    displayName: "Tariq Al-Qahtani",
    targetGoal: "IELTS Band 7.5 & Executive Leadership",
  });
  learnerStorage.setResult({
    total: 42,
    outOf: 60,
    level: "B2",
    byLevel: { A1: 10, A2: 9, B1: 8, B2: 7, C1: 5, C2: 3 },
    takenAt: "2026-11-20T10:00:00.000Z",
  });
  learnerStorage.setCourses(["b2", "ielts"]);
  learnerStorage.saveAssessment("b2", "post", 9, 10);

  learnerStorage.saveIeltsVocab({
    masteredIds: ["iv-01", "iv-02", "iv-03", "iv-04"],
    quizBestScore: 85,
    completedModes: ["quiz", "paraphrase", "collocation"],
  });

  learnerStorage.saveCefrIndicator("A1", "understand");
  learnerStorage.saveCefrIndicator("A1", "context");
  learnerStorage.saveCefrIndicator("B2", "understand");

  learnerStorage.saveSelfLearningAttempt({
    id: "sl-b1-01",
    level: "B1",
    topic: "work-career",
    grammarFocus: "Present perfect vs. past simple",
    keyVocab: ["deadline", "project"],
    verdict: "completely_correct",
    score: 95,
    learnerResponse: "I have finished the project before the deadline.",
    isDaily: true,
    todayIso: "2026-11-23",
  });
  learnerStorage.saveSelfLearningAttempt({
    id: "sl-b2-02",
    level: "B2",
    topic: "business-finance",
    grammarFocus: "Third conditional",
    keyVocab: ["budget", "forecast"],
    verdict: "incorrect",
    score: 42,
    learnerResponse: "If we checked the budget, we saved money.",
    todayIso: "2026-11-23",
  });
  learnerStorage.addSelfLearningSeconds(720);

  learnerStorage.saveBusiness({
    joined: true,
    masteredVocabIds: ["bv-01", "bv-02", "bv-03"],
    completedSkillIds: ["cs-01", "cs-02"],
    completedMeetingIds: ["mtg-01", "mtg-02"],
    practicedInterviewIds: ["int-01"],
  });

  learnerStorage.saveWorkshopSession(
    makeWorkshopSession(
      "ws-1",
      "2026-11-21T09:00:00.000Z",
      68,
      62,
      "Quantify impact with concrete metrics.",
    ),
  );
  learnerStorage.saveWorkshopSession(
    makeWorkshopSession(
      "ws-2",
      "2026-11-23T09:00:00.000Z",
      84,
      74,
      "Close with explicit owner and timeline.",
    ),
  );
}

describe("Phase 5 · Unified Progress Analytics & Backup Engine", () => {
  it("computes accurate cross-module metrics, weak grammar diagnostics, and dual-axis workshop trends", () => {
    const emptySummary = computeUnifiedProgress(
      learnerStorage.exportSnapshot(),
      "2026-11-23T12:00:00.000Z",
    );
    expect(emptySummary.overallReadinessPct).toBe(0);
    expect(emptySummary.placement.level).toBeNull();
    expect(emptySummary.recommendedActions.some((a) => a.to === "/level-test")).toBe(true);

    seedMultiModuleLearner();
    const summary = computeUnifiedProgress(
      learnerStorage.exportSnapshot(),
      "2026-11-23T12:00:00.000Z",
    );

    expect(summary.placement.level).toBe("B2");
    expect(summary.placement.joinedCourses).toHaveLength(2);
    expect(summary.placement.assessments).toHaveLength(1);
    expect(summary.placement.assessments[0]?.pct).toBe(90);

    expect(summary.ieltsVocab.masteredCount).toBe(4);
    expect(summary.ieltsVocab.totalCount).toBe(TOTAL_IELTS_VOCAB_ITEMS);
    expect(summary.ieltsVocab.quizBestScore).toBe(85);
    expect(summary.ieltsVocab.completedModesCount).toBe(3);

    expect(summary.cefrMastery.passedCount).toBe(3);
    expect(summary.cefrMastery.totalCount).toBe(TOTAL_CEFR_INDICATORS);
    expect(summary.cefrMastery.strongestLevel).toBe("A1");

    expect(summary.selfLearning.totalCount).toBe(TOTAL_SELF_LEARNING_SENTENCES);
    expect(summary.selfLearning.attemptedCount).toBe(2);
    expect(summary.selfLearning.masteredCount).toBe(1);
    expect(summary.selfLearning.dueForRevisionCount).toBe(1);
    expect(summary.selfLearning.dailyCompletedCount).toBe(1);
    expect(summary.selfLearning.weakGrammarAreas[0]?.grammarFocus).toBe("Third conditional");

    expect(summary.business.joined).toBe(true);
    expect(summary.business.vocabCount).toBe(3);
    expect(summary.business.meetingsCount).toBe(2);
    expect(summary.business.interviewsCount).toBe(1);

    expect(summary.workshops.totalSessions).toBe(2);
    expect(summary.workshops.avgLinguistic).toBe(76);
    expect(summary.workshops.avgBusinessDecision).toBe(68);
    expect(summary.workshops.linguisticDelta).toBe(16);
    expect(summary.workshops.decisionDelta).toBe(12);
    expect(summary.workshops.axisInsight).toBe("linguistic-leads");
    expect(summary.workshops.trendSeries).toHaveLength(2);
    expect(summary.workshops.recurringWeaknesses).toHaveLength(2);
    expect(summary.overallReadinessPct).toBeGreaterThan(15);
  });

  it("exports and restores a validated JSON backup snapshot and safely rejects corrupted input", () => {
    seedMultiModuleLearner();
    const exported = exportLearnerBackupJson();

    learnerStorage.clearAll();
    expect(learnerStorage.getResult()).toBeNull();
    expect(learnerStorage.getWorkshops()).toHaveLength(0);

    const restored = importLearnerBackupJson(exported);
    expect(restored.ok).toBe(true);
    expect(learnerStorage.getProfile().displayName).toBe("Tariq Al-Qahtani");
    expect(learnerStorage.getResult()?.level).toBe("B2");
    expect(learnerStorage.getIeltsVocab().masteredIds).toHaveLength(4);
    expect(learnerStorage.getWorkshops()).toHaveLength(2);

    const badJson = importLearnerBackupJson("{not valid json");
    expect(badJson.ok).toBe(false);

    const wrongVersion = importLearnerBackupJson(JSON.stringify({ version: 99 }));
    expect(wrongVersion.ok).toBe(false);
    // Existing state remains untouched after rejected imports
    expect(learnerStorage.getProfile().displayName).toBe("Tariq Al-Qahtani");
  });
});

describe("Phase 5 · Unified Progress Dashboard UI", () => {
  it("displays consolidated metrics, saves learner profile, switches analytics tabs, and handles reset guard", () => {
    seedMultiModuleLearner();

    render(
      <I18nProvider locale="en" theme="light">
        <ProgressDashboard />
      </I18nProvider>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /Your English Progress Dashboard/i }),
    ).toBeTruthy();
    expect(screen.getByText("CEFR B2")).toBeTruthy();
    expect(screen.getByText(`4 / ${TOTAL_IELTS_VOCAB_ITEMS}`)).toBeTruthy();
    expect(screen.getByText(`3 / ${TOTAL_CEFR_INDICATORS}`)).toBeTruthy();
    expect(screen.getByText(`1 / ${TOTAL_SELF_LEARNING_SENTENCES}`)).toBeTruthy();

    // Update learner profile and persist to storage
    const nameInput = screen.getByLabelText(/Display Name/i);
    fireEvent.change(nameInput, { target: { value: "Lama Al-Harbi" } });
    fireEvent.click(screen.getByRole("button", { name: /Save Profile/i }));
    expect(learnerStorage.getProfile().displayName).toBe("Lama Al-Harbi");

    // Switch to CEFR Coverage tab & Diagnostics tab (Radix Tabs responds to mouseDown + click)
    const cefrTab = screen.getByRole("tab", { name: /CEFR A1–C2 & 600 Sentences/i });
    fireEvent.mouseDown(cefrTab);
    fireEvent.click(cefrTab);
    expect(
      screen.getByText(/CEFR A1–C2 Mastery Indicators vs\. Self-learning Sentence Coverage/i),
    ).toBeTruthy();

    const diagTab = screen.getByRole("tab", { name: /Assessments & Grammar Diagnostics/i });
    fireEvent.mouseDown(diagTab);
    fireEvent.click(diagTab);
    expect(screen.getByText("Third conditional")).toBeTruthy();
    expect(screen.getByText(/9\/10 \(90%\)/i)).toBeTruthy();

    // Two-step Reset Progress confirmation
    fireEvent.click(screen.getByRole("button", { name: /Reset All Progress/i }));
    fireEvent.click(screen.getByRole("button", { name: /Confirm Reset/i }));
    expect(learnerStorage.getResult()).toBeNull();
    expect(learnerStorage.getWorkshops()).toHaveLength(0);
    expect(screen.getByText(/All local learning progress has been cleared/i)).toBeTruthy();
  });
});
