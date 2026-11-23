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

import { LearningDashboard } from "@/components/dashboard/learning-dashboard";
import { I18nProvider } from "@/components/i18n-provider";
import { courseLessons } from "@/content/lessons";
import { learnerStorage } from "@/lib/learner-storage";
import {
  computeDashboardOverview,
  computeLearningStreak,
  learningRecord,
} from "@/lib/learning-record";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  window.localStorage.clear();
});

describe("Phase 3 · Unified Learning Record & Mastery-Gated Progression", () => {
  it("tracks 5-state lesson lifecycle and keeps Activity Completion strictly separate from Mastery", () => {
    const b1Lessons = courseLessons("b1");
    expect(b1Lessons.length).toBeGreaterThanOrEqual(2);
    const first = b1Lessons[0]!;
    const second = b1Lessons[1]!;

    // 1. Opening a lesson marks it in_progress & updates Continue Where You Left Off cursor
    learningRecord.markLessonOpened(first, "2026-11-23T09:00:00.000Z");
    expect(learningRecord.getLessonStatus(first.id)).toBe("in_progress");
    expect(learningRecord.getLastCursor()?.id).toBe(first.id);

    // 2. Completing a lesson marks it completed — NOT mastered, and does NOT auto-promote CEFR B1
    learningRecord.markLessonCompleted(first, "2026-11-23T09:10:00.000Z");
    expect(learningRecord.getLessonStatus(first.id)).toBe("completed");

    learnerStorage.setCourses(["b1"]);
    const afterComplete = computeDashboardOverview("2026-11-23T12:00:00.000Z");
    const b1Rail = afterComplete.cefrRail.find((r) => r.level === "B1")!;
    expect(b1Rail.isStudying).toBe(true);
    expect(b1Rail.isCompleted).toBe(false); // Never auto-promoted just from completing a lesson
    expect(afterComplete.activityCompletionPct).toBeGreaterThan(0);
    expect(afterComplete.assessedMasteryPct).toBe(0); // Completion != Mastery!

    // 3. Failing a post-evaluation flags lesson as requires_revision
    learningRecord.recordLessonPostEval({
      lessonId: second.id,
      course: second.course,
      skill: second.skill,
      title: second.title,
      score: 3,
      total: 10,
      masteredObjectives: 1,
      totalObjectives: 4,
      nowIso: "2026-11-23T09:20:00.000Z",
    });
    expect(learningRecord.getLessonStatus(second.id)).toBe("requires_revision");

    // 4. Passing post-evaluation at >= 75% elevates lesson to mastered
    learningRecord.recordLessonPostEval({
      lessonId: first.id,
      course: first.course,
      skill: first.skill,
      title: first.title,
      score: 9,
      total: 10,
      masteredObjectives: 4,
      totalObjectives: 4,
      nowIso: "2026-11-23T09:30:00.000Z",
    });
    expect(learningRecord.getLessonStatus(first.id)).toBe("mastered");

    // 5. Continue card points to the unfinished/revision lesson, and recommendations prioritize revision
    const overview = computeDashboardOverview("2026-11-23T12:00:00.000Z");
    expect(overview.continueCard.lastCompletedTitle?.en).toBe(first.title.en);
    expect(overview.recommendations[0]?.id).toBe(`revise-${second.id}`);
    expect(overview.activitySummary.lessonsMastered).toBe(1);
    expect(overview.activitySummary.lessonsNeedsRevision).toBe(1);
  });

  it("computes flexible learning streaks allowing 1 grace day without discouraging reset", () => {
    // Studied Nov 23, skipped Nov 22 (1 grace day), studied Nov 21 & Nov 20 -> 3-day streak preserved!
    const withGrace = computeLearningStreak(
      ["2026-11-23", "2026-11-21", "2026-11-20"],
      "2026-11-23",
    );
    expect(withGrace.currentDays).toBe(3);
    expect(withGrace.graceDayUsed).toBe(true);
    expect(withGrace.activeToday).toBe(true);

    // Missed 3 consecutive days -> streak resets to 0
    const expired = computeLearningStreak(["2026-11-18", "2026-11-17"], "2026-11-23");
    expect(expired.currentDays).toBe(0);
    expect(expired.longestDays).toBe(2);
  });
});

describe("Phase 3 · My Learning Dashboard UI (/dashboard)", () => {
  it("renders personalised welcome, CEFR A1-C2 rail, Continue Where You Left Off, and saves custom weekly goals in EN and AR", () => {
    learnerStorage.saveProfile({
      displayName: "Salman Al-Otaibi",
      targetGoal: "Reach B2 Professional English",
    });
    learnerStorage.setResult({
      total: 26,
      outOf: 60,
      level: "B1",
      byLevel: { A1: 9, A2: 8, B1: 6, B2: 3, C1: 0, C2: 0 },
      takenAt: "2026-11-20T10:00:00.000Z",
    });
    learnerStorage.setCourses(["b1"]);
    const b1Lesson = courseLessons("b1")[0]!;
    learningRecord.markLessonCompleted(b1Lesson, "2026-11-23T10:00:00.000Z");

    const { rerender } = render(
      <I18nProvider locale="en" theme="light">
        <LearningDashboard />
      </I18nProvider>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /Welcome back, Salman Al-Otaibi!/i }),
    ).toBeTruthy();
    expect(screen.getByText(/Continue Where You Left Off/i)).toBeTruthy();
    expect(screen.getByText(/My Current Learning Level \(A1 → C2\)/i)).toBeTruthy();
    expect(screen.getByText(/Resume Learning/i)).toBeTruthy();

    // Customise weekly goals and verify persistence
    fireEvent.click(screen.getByRole("button", { name: /Customise Goals/i }));
    const lessonsInput = screen.getByLabelText(/Complete lessons/i);
    fireEvent.change(lessonsInput, { target: { value: "8" } });
    fireEvent.click(screen.getByRole("button", { name: /Save Weekly Goals/i }));
    expect(learningRecord.getWeeklyGoals().lessonsTarget).toBe(8);
    expect(screen.getByText(/Weekly goals updated/i)).toBeTruthy();

    // Verify clean Arabic RTL rendering
    rerender(
      <I18nProvider locale="ar" theme="dark">
        <LearningDashboard />
      </I18nProvider>,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: /مرحبًا بعودتك، Salman Al-Otaibi!/i }),
    ).toBeTruthy();
    expect(screen.getByText(/استكمل من حيث توقفت/i)).toBeTruthy();
  });
});
