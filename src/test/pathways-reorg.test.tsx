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

import { CefrModulePathway } from "@/components/courses/cefr-module-pathway";
import { I18nProvider } from "@/components/i18n-provider";
import { IeltsHub } from "@/components/learning/ielts-hub";
import { CEFR_LEVELS } from "@/content/courses";
import { courseLessons } from "@/content/lessons";
import { buildCefrLevelReport } from "@/lib/cefr-modules";
import {
  computeIeltsDashboard,
  computeOverallBand,
  IELTS_PREP_AREAS,
  ieltsTracker,
  roundToHalfBand,
} from "@/lib/ielts-tracker";
import { learnerStorage } from "@/lib/learner-storage";
import { learningRecord } from "@/lib/learning-record";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  window.localStorage.clear();
});

describe("Reorg Phase 4 · Standardised 10-Module CEFR Pathway & Mastery Gate", () => {
  it("builds a consistent 10-module structure and 7-skill mastery gate for every CEFR level A1–C2", () => {
    for (const level of CEFR_LEVELS) {
      const report = buildCefrLevelReport(level);
      expect(report.modules).toHaveLength(10);
      expect(report.modules.map((m) => m.number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      expect(report.skillGates).toHaveLength(7);
      expect(report.eligibleForLevelCompletion).toBe(false);
    }
  });

  it("does not grant level completion simply from completing lessons, and unlocks once multi-skill mastery + assessment >= 70% are verified", () => {
    const b1Lessons = courseLessons("b1");
    for (const lesson of b1Lessons) {
      learningRecord.markLessonCompleted(lesson);
    }

    const completionOnly = buildCefrLevelReport("B1");
    expect(completionOnly.activityCompletionPct).toBe(100);
    expect(completionOnly.eligibleForLevelCompletion).toBe(false);

    // Now verify mastery across 5+ skills + Module 10 assessment >= 70%
    learnerStorage.saveCefrIndicator("B1", "understand");
    learnerStorage.saveCefrIndicator("B1", "context");
    learnerStorage.saveCefrIndicator("B1", "original-sentence");
    learnerStorage.saveCefrIndicator("B1", "grammar-accuracy");
    learnerStorage.saveCefrIndicator("B1", "paragraph");
    learnerStorage.saveCefrIndicator("B1", "opinion-justify");
    learnerStorage.saveCefrIndicator("B1", "realistic-comm");
    learnerStorage.saveAssessment("b1", "post", 8, 10);

    for (const skill of ["grammar", "reading", "listening"] as const) {
      const target = b1Lessons.find((l) => l.skill === skill);
      if (target) {
        learningRecord.recordLessonPostEval({
          lessonId: target.id,
          course: target.course,
          skill: target.skill,
          title: target.title,
          score: 9,
          total: 10,
          masteredObjectives: 4,
          totalObjectives: 4,
        });
      }
    }

    const verified = buildCefrLevelReport("B1");
    expect(verified.eligibleForLevelCompletion).toBe(true);
    expect(verified.assessedMasteryPct).toBeGreaterThanOrEqual(70);
  });

  it("renders all 10 CEFR modules and the 7-skill mastery gate cleanly in EN and AR", () => {
    const onFilter = vi.fn();
    const { rerender } = render(
      <I18nProvider locale="en" theme="light">
        <CefrModulePathway level="B1" onSelectSkillFilter={onFilter} />
      </I18nProvider>,
    );

    expect(screen.getByText(/CEFR B1 Learning Pathway \(Modules 1–10\)/i)).toBeTruthy();
    expect(screen.getByText(/Module 1: Vocabulary Development/i)).toBeTruthy();
    expect(screen.getByText(/Module 10: Level Assessment/i)).toBeTruthy();
    expect(screen.getByText(/Level Completion Requirements/i)).toBeTruthy();

    rerender(
      <I18nProvider locale="ar" theme="dark">
        <CefrModulePathway level="B1" onSelectSkillFilter={onFilter} />
      </I18nProvider>,
    );
    expect(screen.getByText(/الوحدة ١: بناء وتطوير المفردات/i)).toBeTruthy();
    expect(screen.getByText(/الوحدة ١٠: التقييم الشامل للمستوى/i)).toBeTruthy();
  });
});

describe("Reorg Phase 4 · Independent IELTS Dashboard & Band Planner", () => {
  it("rounds IELTS bands accurately to 0.5, logs mock tests, and computes band gap & rubric estimates", () => {
    expect(roundToHalfBand(6.25)).toBe(6.5);
    expect(roundToHalfBand(6.74)).toBe(6.5);
    expect(computeOverallBand({ listening: 6.5, reading: 7.0, writing: 6.0, speaking: 6.5 })).toBe(
      6.5,
    );
    expect(IELTS_PREP_AREAS).toHaveLength(10);

    ieltsTracker.setTrack("general");
    ieltsTracker.setTargetBand(7.5);
    ieltsTracker.recordMockTest({
      listening: 6.5,
      reading: 7.0,
      writing: 6.0,
      speaking: 6.5,
      dateIso: "2026-11-23",
    });

    const summary = computeIeltsDashboard();
    expect(summary.plan.track).toBe("general");
    expect(summary.plan.targetBand).toBe(7.5);
    expect(summary.currentBand).toBe(6.5);
    expect(summary.bandGap).toBe(1.0);
    expect(summary.plan.mockTests).toHaveLength(1);
    expect(summary.recommendations[0]?.skill).toBe("writing");
  });

  it("renders Independent IELTS Dashboard, switches Academic/General track, updates target band, and logs a mock test", () => {
    render(
      <I18nProvider locale="en" theme="light">
        <IeltsHub />
      </I18nProvider>,
    );

    expect(screen.getByText(/10 Structured IELTS Preparation Areas/i)).toBeTruthy();
    expect(screen.getByText(/not official IELTS exam scores/i)).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /IELTS General Training/i }));
    expect(ieltsTracker.getPlan().track).toBe("general");

    fireEvent.click(screen.getByRole("button", { name: "7.5" }));
    expect(ieltsTracker.getPlan().targetBand).toBe(7.5);

    fireEvent.click(screen.getByRole("button", { name: /Save Mock Score/i }));
    expect(screen.getByText(/Mock test saved/i)).toBeTruthy();
    expect(ieltsTracker.getPlan().mockTests).toHaveLength(1);
  });
});
