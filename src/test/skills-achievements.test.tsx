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

import { CertificatesPortal } from "@/components/certificates/certificates-portal";
import { I18nProvider } from "@/components/i18n-provider";
import { courseLessons } from "@/content/lessons";
import { learnerStorage } from "@/lib/learner-storage";
import { learningRecord } from "@/lib/learning-record";
import { computeSkillsAndAchievements, verifyCertificateById } from "@/lib/skills-achievements";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  window.localStorage.clear();
});

describe("Reorg Phase 5 · 7-Skill Progress, Period Comparisons, Achievements & Verifiable Certificates", () => {
  it("never awards achievements or certificates for simply logging in with zero activity", () => {
    const empty = computeSkillsAndAchievements("2026-11-23T12:00:00.000Z");
    expect(empty.skills).toHaveLength(7);
    expect(empty.skills.map((s) => s.id)).toEqual([
      "vocabulary",
      "grammar",
      "reading",
      "listening",
      "speaking",
      "writing",
      "pronunciation",
    ]);
    expect(empty.unlockedAchievementsCount).toBe(0);
    expect(empty.certificates).toHaveLength(0);
    expect(empty.fiveDimensions.activityCompletionPct).toBe(0);
    expect(empty.fiveDimensions.learningMasteryPct).toBe(0);
  });

  it("tracks 7 skills, period comparisons, measurable achievements, and issues verifiable certificates with unique IDs", () => {
    learnerStorage.saveProfile({
      displayName: "Noura Al-Dosari",
      targetGoal: "B2 Mastery & IELTS 7.0",
    });

    // Log activities in last week vs this week
    learningRecord.logActivity({
      kind: "lesson",
      count: 1,
      minutes: 15,
      nowIso: "2026-11-12T10:00:00.000Z", // Last week
    });
    const b1Lesson = courseLessons("b1")[0]!;
    learningRecord.markLessonCompleted(b1Lesson, "2026-11-22T10:00:00.000Z");
    learningRecord.logActivity({
      kind: "grammar",
      count: 2,
      minutes: 20,
      nowIso: "2026-11-23T10:00:00.000Z",
    });

    // Pass B1 course assessment >= 70% -> eligible for verifiable certificate
    learnerStorage.saveAssessment("b1", "post", 9, 10);

    const report = computeSkillsAndAchievements("2026-11-23T12:00:00.000Z");
    expect(report.comparisons.weekOverWeek.currentActivities).toBeGreaterThan(
      report.comparisons.weekOverWeek.previousActivities,
    );
    expect(report.comparisons.weekOverWeek.activityDelta).toBeGreaterThan(0);

    const firstLessonAch = report.achievements.find((a) => a.id === "first-lesson")!;
    expect(firstLessonAch.unlocked).toBe(true);
    expect(report.unlockedAchievementsCount).toBeGreaterThanOrEqual(1);

    expect(report.certificates.length).toBeGreaterThanOrEqual(1);
    const cert = report.certificates[0]!;
    expect(cert.learnerName).toBe("Noura Al-Dosari");
    expect(cert.certificateId).toMatch(/^ELE-\d{4}-/);
    expect(cert.assessmentScorePct).toBe(90);

    // Verification lookup succeeds for real ID and fails for fake ID
    const validCheck = verifyCertificateById(cert.certificateId);
    expect(validCheck.valid).toBe(true);
    const fakeCheck = verifyCertificateById("ELE-2026-FAKE-000000");
    expect(fakeCheck.valid).toBe(false);
  });

  it("renders CertificatesPortal with official-exam distinction disclaimer and live verification lookup", () => {
    learnerStorage.saveProfile({ displayName: "Faisal Al-Harbi", targetGoal: "B2 English" });
    learnerStorage.saveAssessment("b2", "post", 8, 10);

    render(
      <I18nProvider locale="en" theme="light">
        <CertificatesPortal />
      </I18nProvider>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /My Certificates & Verification Portal/i }),
    ).toBeTruthy();
    expect(
      screen.getByText(/distinct from officially recognised international exams/i),
    ).toBeTruthy();
    expect(screen.getByText("Faisal Al-Harbi")).toBeTruthy();

    // Verify invalid ID first
    const input = screen.getByLabelText(/Verify a Certificate ID/i);
    fireEvent.change(input, { target: { value: "ELE-0000-INVALID" } });
    const verifyBtns = screen.getAllByRole("button", { name: /Verify Certificate/i });
    fireEvent.click(verifyBtns[verifyBtns.length - 1]!);
    expect(screen.getByText(/No matching certificate was found/i)).toBeTruthy();

    // Click inline Verify button on the earned certificate -> authentic confirmation!
    fireEvent.click(verifyBtns[0]!);
    expect(screen.getByText(/Certificate Verified ✓/i)).toBeTruthy();
  });
});
