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

vi.mock("@/lib/assistant-ai.functions", () => ({
  askLearningAssistant: vi.fn(
    async ({ data }: { data: Parameters<typeof generateAssistantReplyLocal>[0] }) =>
      generateAssistantReplyLocal(data),
  ),
}));

import { AiAssistantDrawer } from "@/components/assistant/ai-assistant-drawer";
import { LearningCalendarView } from "@/components/calendar/learning-calendar-view";
import { I18nProvider } from "@/components/i18n-provider";
import { courseLessons } from "@/content/lessons";
import {
  buildLearnerContextSnapshot,
  generateAssistantReplyLocal,
  generateLearnerProgressReport,
} from "@/lib/assistant-fallback";
import { learningRecord } from "@/lib/learning-record";
import {
  computeActiveReminders,
  generatePersonalRoadmap,
  generateWeeklySchedule,
  personalPlanStorage,
} from "@/lib/personal-plan";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  window.localStorage.clear();
});

describe("Reorg Phase 6 · Personal Learning Plan, Calendar & Smart Reminders Engine", () => {
  it("generates an ordered Current -> Target roadmap and realistic weekly schedule respecting chosen study days", () => {
    const plan = personalPlanStorage.savePlan({
      objectives: ["reach-b1-b2", "ielts-band-7", "business-english"],
      targetLevel: "B2",
      studyDays: ["sun", "tue", "thu"],
      dailyMinutes: 45,
      targetDate: "2027-03-01",
    });

    const roadmap = generatePersonalRoadmap(plan, "B1");
    expect(roadmap.length).toBeGreaterThanOrEqual(8);
    expect(roadmap[0]?.title.en).toContain("B1");
    expect(roadmap.some((s) => s.title.en.includes("B2"))).toBe(true);
    expect(roadmap.some((s) => s.to === "/ielts")).toBe(true);
    expect(roadmap.some((s) => s.to === "/workshops")).toBe(true);

    const schedule = generateWeeklySchedule(plan, "B1");
    expect(schedule).toHaveLength(3);
    expect(schedule.map((s) => s.day)).toEqual(["sun", "tue", "thu"]);
    expect(schedule.every((s) => s.minutes === 45)).toBe(true);
  });

  it("supports full Learning Calendar CRUD and honours Smart Reminder toggles", () => {
    const nowIso = "2026-11-24T10:00:00.000Z";
    const initial = personalPlanStorage.getCalendarEvents(nowIso);
    expect(initial.length).toBeGreaterThanOrEqual(5);

    const afterAdd = personalPlanStorage.addCalendarEvent(
      {
        title: "B2 Writing Timed Mock",
        date: "2026-11-25",
        kind: "mock",
        linkTo: "/ielts",
      },
      nowIso,
    );
    const added = afterAdd.find((e) => e.title === "B2 Writing Timed Mock");
    expect(added).toBeTruthy();

    const afterToggle = personalPlanStorage.toggleCalendarEvent(added!.id, nowIso);
    expect(afterToggle.find((e) => e.id === added!.id)?.completed).toBe(true);

    const afterDelete = personalPlanStorage.deleteCalendarEvent(added!.id, nowIso);
    expect(afterDelete.find((e) => e.id === added!.id)).toBeUndefined();

    // Disable all reminders -> zero active reminder banners
    personalPlanStorage.saveRemindersConfig({
      dailyTargets: false,
      incompleteLessons: false,
      scheduledAssessments: false,
      revisionActivities: false,
      upcomingWorkshops: false,
      weeklyProgressReports: false,
      preferredTime: "20:00",
    });
    expect(computeActiveReminders(nowIso)).toEqual([]);

    // Re-enable dailyTargets + weeklyProgressReports -> active banners appear (max 4)
    personalPlanStorage.saveRemindersConfig({
      dailyTargets: true,
      incompleteLessons: true,
      scheduledAssessments: true,
      revisionActivities: true,
      upcomingWorkshops: true,
      weeklyProgressReports: true,
      preferredTime: "19:30",
    });
    const active = computeActiveReminders(nowIso);
    expect(active.length).toBeGreaterThanOrEqual(2);
    expect(active.length).toBeLessThanOrEqual(4);
  });

  it("builds a data-backed Learner Progress Report and contextual local coaching reply from real learner state", () => {
    const sampleLesson = courseLessons("b1")[0]!;
    learningRecord.markLessonCompleted(sampleLesson, "2026-11-24T11:30:00.000Z");

    const report = generateLearnerProgressReport("2026-11-24T12:00:00.000Z");
    expect(report.achieved[0]?.en).toContain("1 guided lessons");
    expect(report.prioritizedNext.length).toBeGreaterThanOrEqual(1);
    expect(report.goalTrajectory.en).toContain("→");
    expect(report.goalTrajectory.ar).toContain("←");

    const ctx = buildLearnerContextSnapshot("2026-11-24T12:00:00.000Z");
    expect(ctx.completedLessons).toBe(1);

    const reply = generateAssistantReplyLocal({
      mode: "grammar",
      question: "When do I use Present Perfect?",
      locale: "en",
      context: ctx,
    });
    expect(reply.answer.en).toContain("Present Perfect");
    expect(reply.answer.ar.length).toBeGreaterThan(20);
    expect(reply.examples.length).toBeGreaterThanOrEqual(2);
  });
});

describe("Reorg Phase 6 · LearningCalendarView & AiAssistantDrawer UI", () => {
  it("customises learning plan, adds a calendar event, toggles smart reminders, and renders cleanly in AR", () => {
    const { rerender } = render(
      <I18nProvider locale="en" theme="light">
        <LearningCalendarView />
      </I18nProvider>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Your Study Roadmap, Learning Calendar & Smart Reminders/i,
      }),
    ).toBeTruthy();

    fireEvent.click(screen.getByText(/Save Plan & Update Roadmap/i));
    expect(screen.getByText(/Personal learning plan saved/i)).toBeTruthy();

    const input = screen.getByPlaceholderText(/Add study session/i);
    fireEvent.change(input, { target: { value: "Speaking Fluency Drill" } });
    fireEvent.click(screen.getByRole("button", { name: /^Add$/i }));
    expect(screen.getByText("Speaking Fluency Drill")).toBeTruthy();

    rerender(
      <I18nProvider locale="ar" theme="dark">
        <LearningCalendarView />
      </I18nProvider>,
    );
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /خريطة دراستك والتقويم الدراسي والتذكيرات الذكية/i,
      }),
    ).toBeTruthy();
  }, 15000);

  it("opens Contextual AI Learning Assistant drawer and generates a live data-backed Learner Progress Report", async () => {
    render(
      <I18nProvider locale="en" theme="light">
        <AiAssistantDrawer variant="header" />
      </I18nProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: /Open Contextual AI Learning Assistant/i }));
    expect(screen.getByText(/Personal English Learning Assistant/i)).toBeTruthy();

    fireEvent.click(screen.getByText(/Generate Progress Report/i));
    expect(screen.getByText(/Learner Progress Report/i)).toBeTruthy();
    expect(screen.getByText(/What You Achieved/i)).toBeTruthy();
    expect(screen.getByText(/Goal Trajectory/i)).toBeTruthy();

    fireEvent.click(screen.getByText(/Explain Grammar/i));
    expect((await screen.findAllByText(/Present Perfect/i)).length).toBeGreaterThanOrEqual(1);
  }, 15000);
});
