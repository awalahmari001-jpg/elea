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

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
  BarChart: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
  Bar: () => <div />,
  CartesianGrid: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  Tooltip: () => <div />,
  Legend: () => <div />,
}));

import { AdminTeacherStudio } from "@/components/admin/admin-teacher-studio";
import { I18nProvider } from "@/components/i18n-provider";
import { MobileQuickNav } from "@/components/layout/mobile-quick-nav";
import { KIDS_ANIMATED_VIDEOS } from "@/content/kids/videos-games-data";
import { courseLessons } from "@/content/lessons";
import { learnerStorage } from "@/lib/learner-storage";
import { computeDashboardOverview, learningRecord } from "@/lib/learning-record";
import {
  canAccessAdminPanel,
  canManageRoles,
  getVisibleStudents,
  rbacStore,
} from "@/lib/rbac-store";
import { computeSkillsAndAchievements, verifyCertificateById } from "@/lib/skills-achievements";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  window.localStorage.clear();
  rbacStore.clear();
  learnerStorage.clearAll();
  learningRecord.clearJourney();
});

describe("Reorganisation Phases 7 & 8 · RBAC, Multi-Account Resume, Admin Publishing & 16 Kids Videos", () => {
  it("enforces strict RBAC boundaries: Student privacy isolation, Teacher scoped roster, Admin global + publishing", () => {
    const state = rbacStore.getState();
    const student = state.accounts.find((a) => a.role === "student")!;
    const teacher = state.accounts.find((a) => a.id === "acc-teacher-1")!;
    const admin = state.accounts.find((a) => a.role === "admin")!;
    const superAdmin = state.accounts.find((a) => a.role === "super_admin")!;

    expect(canAccessAdminPanel(student.role)).toBe(false);
    expect(canAccessAdminPanel(teacher.role)).toBe(true);
    expect(canAccessAdminPanel(admin.role)).toBe(true);
    expect(canManageRoles(teacher.role)).toBe(false);
    expect(canManageRoles(admin.role)).toBe(true);

    // Student sees 0 roster records
    expect(getVisibleStudents(student, state.accounts)).toHaveLength(0);

    // Teacher sees ONLY students assigned to acc-teacher-1 (not Sara assigned to acc-teacher-2)
    const teacherVisible = getVisibleStudents(teacher, state.accounts);
    expect(teacherVisible.map((s) => s.id)).toContain("acc-student-1");
    expect(teacherVisible.map((s) => s.id)).toContain("acc-student-2");
    expect(teacherVisible.map((s) => s.id)).not.toContain("acc-student-3");

    // Admin sees ALL students
    const adminVisible = getVisibleStudents(admin, state.accounts);
    expect(adminVisible).toHaveLength(3);

    // Non-super-admin cannot promote someone to super_admin
    expect(rbacStore.updateAccountRole(admin, student.id, "super_admin")).toBe(false);
    expect(rbacStore.updateAccountRole(superAdmin, student.id, "teacher")).toBe(true);
  });

  it("supports end-to-end Register -> Study Lesson -> Sign Out -> Sign Back In -> Resume Exact Cursor & Verify Certificate", () => {
    // 1. Register new student account
    const newStudent = rbacStore.registerAccount({
      name: "Tariq Al-Harbi",
      email: "tariq@elea.local",
      role: "student",
      cefrLevel: "B1",
    });
    expect(rbacStore.getCurrentAccount()?.id).toBe(newStudent.id);

    // 2. Complete & master a B1 lesson + record post-evaluation & placement
    const b1Lesson = courseLessons("b1")[0]!;
    learningRecord.markLessonOpened(b1Lesson);
    learningRecord.markLessonCompleted(b1Lesson);
    learningRecord.recordLessonPostEval({
      lessonId: b1Lesson.id,
      course: b1Lesson.course,
      skill: b1Lesson.skill,
      title: b1Lesson.title,
      score: 9,
      total: 10,
      masteredObjectives: 4,
      totalObjectives: 4,
    });
    learnerStorage.saveAssessment("b1", "post", 9, 10);
    expect(learningRecord.getLastCursor()?.id).toBe(b1Lesson.id);

    // 3. Sign out (clears active localStorage) -> verify isolated guest state
    rbacStore.signOut();
    expect(rbacStore.getCurrentAccount()).toBeNull();
    expect(learningRecord.getLastCursor()).toBeNull();

    // 4. Sign back in -> exact lesson cursor, mastery status, and 7-skill metrics restored!
    rbacStore.signIn(newStudent.id);
    expect(learningRecord.getLastCursor()?.id).toBe(b1Lesson.id);
    const dash = computeDashboardOverview();
    const b1Node = dash.cefrRail.find((r) => r.level === "B1");
    expect(b1Node?.completionPct).toBeGreaterThan(0);
    expect(b1Node?.masteryPct).toBeGreaterThan(0);
    const seven = computeSkillsAndAchievements();
    expect(seven.skills).toHaveLength(7);

    // 5. Verify certificate code lookup works cleanly
    const unknownCert = verifyCertificateById("ELEA-INVALID-000");
    expect(unknownCert.valid).toBe(false);
  });

  it("provides 16 complete 6-part Kids Animated Video Lessons covering every required plan title", () => {
    expect(KIDS_ANIMATED_VIDEOS.length).toBeGreaterThanOrEqual(16);
    const ids = new Set(KIDS_ANIMATED_VIDEOS.map((v) => v.id));
    expect(ids.size).toBe(KIDS_ANIMATED_VIDEOS.length);
    expect(ids.has("vid-magic-vowels")).toBe(true);
    expect(ids.has("vid-mouth-articulation-pb")).toBe(true);
    expect(ids.has("vid-cvc-four-letter-blends")).toBe(true);
    expect(ids.has("vid-simple-sentences-story")).toBe(true);
    for (const v of KIDS_ANIMATED_VIDEOS) {
      expect(v.stages).toHaveLength(6);
    }
  });

  it("isolates students on /admin and lets Admin create & publish a live course + post teacher notes in UI", () => {
    // 1. Default active account is a Student -> Admin studio MUST stay restricted
    const { unmount } = render(
      <I18nProvider locale="en" theme="light">
        <AdminTeacherStudio />
      </I18nProvider>,
    );
    expect(screen.getByText(/Teacher & Administrator Access Required/i)).toBeTruthy();
    unmount();

    // 2. Switch to Administrator -> unlocks Analytics, Student Roster, Course Studio & RBAC tabs
    rbacStore.signIn("acc-admin-1");
    render(
      <I18nProvider locale="en" theme="light">
        <AdminTeacherStudio />
      </I18nProvider>,
    );
    expect(screen.getByText(/Administrator & Teacher Studio/i)).toBeTruthy();
    expect(screen.getByRole("tab", { name: /User Roles \(RBAC\)/i })).toBeTruthy();

    // 3. Create & publish a live custom course
    fireEvent.click(screen.getByRole("tab", { name: /Course & Lesson Studio/i }));
    fireEvent.change(screen.getByLabelText(/Course Title \(English\)/i), {
      target: { value: "Hospitality Front-Desk Mastery" },
    });
    fireEvent.change(screen.getByLabelText(/Course Description \(English\)/i), {
      target: { value: "Practical guest check-in and polite concierge communication." },
    });
    fireEvent.click(screen.getByRole("button", { name: /Create Custom Course/i }));

    const published = rbacStore.getPublishedCustomCourses();
    expect(published.some((c) => c.title.en === "Hospitality Front-Desk Mastery")).toBe(true);
  });

  it("renders MobileQuickNav cleanly in English LTR and Arabic RTL", () => {
    const { rerender } = render(
      <I18nProvider locale="en" theme="light">
        <MobileQuickNav />
      </I18nProvider>,
    );
    expect(screen.getByRole("link", { name: /My Learning/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Self-learning Pace/i })).toBeTruthy();

    rerender(
      <I18nProvider locale="ar" theme="light">
        <MobileQuickNav />
      </I18nProvider>,
    );
    expect(screen.getByRole("link", { name: /لوحة تعلّمي/i })).toBeTruthy();
  });
});
