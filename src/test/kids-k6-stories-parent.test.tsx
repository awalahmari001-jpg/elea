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
import { KidsWorldHub } from "@/components/kids/kids-world-hub";
import {
  KIDS_FRIENDLY_ASSESSMENTS,
  KIDS_MINI_CONVERSATIONS,
  KIDS_SAFETY_PILLARS,
  KIDS_STORIES,
  KIDS_WRITING_MISSIONS,
  PARENT_HOME_ACTIVITIES,
} from "@/content/kids/stories-communication-data";
import {
  computeKidsBadges,
  computeKidsRewardTier,
  computeReadingDiagnostics,
  kidsStorage,
} from "@/lib/kids-storage";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  window.localStorage.clear();
  kidsStorage.clear();
});

describe("Kids Phase K6 · Stories, Speaking/Writing, Star Quizzes & Parent Diagnostics Data", () => {
  it("provides 12 illustrated moral stories with 3 pages, clickable vocab, event ordering, and comprehension checks", () => {
    expect(KIDS_STORIES).toHaveLength(12);
    expect(new Set(KIDS_STORIES.map((s) => s.id)).size).toBe(12);
    for (const story of KIDS_STORIES) {
      expect(story.pages.length).toBeGreaterThanOrEqual(3);
      expect(story.eventOrder).toHaveLength(3);
      expect(story.moral.en.length).toBeGreaterThan(10);
      expect(story.moral.ar.length).toBeGreaterThan(8);
      expect(story.comprehension.options.length).toBeGreaterThanOrEqual(3);
      for (const page of story.pages) {
        expect(page.focusWords.length).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("provides 6 dual-voice mini conversations and 6 age-graduated writing missions", () => {
    expect(KIDS_MINI_CONVERSATIONS).toHaveLength(6);
    for (const conv of KIDS_MINI_CONVERSATIONS) {
      const genders = new Set(conv.turns.map((t) => t.gender));
      expect(genders.has("female"), conv.id).toBe(true);
      expect(genders.has("male"), conv.id).toBe(true);
    }

    expect(KIDS_WRITING_MISSIONS).toHaveLength(6);
    const modes = new Set(KIDS_WRITING_MISSIONS.map((m) => m.mode));
    expect(modes.has("word-tiles")).toBe(true);
    expect(modes.has("sentence-builder")).toBe(true);
    expect(modes.has("mini-paragraph")).toBe(true);
  });

  it("provides 3 zero-stress age-grouped Star Checks with supportive-only feedback (no harsh failure language)", () => {
    expect(KIDS_FRIENDLY_ASSESSMENTS).toHaveLength(3);
    expect(KIDS_SAFETY_PILLARS).toHaveLength(3);
    expect(PARENT_HOME_ACTIVITIES.length).toBeGreaterThanOrEqual(5);

    const harshPattern = /\b(fail|failed|wrong|bad|stupid)\b/i;
    for (const quiz of KIDS_FRIENDLY_ASSESSMENTS) {
      expect(quiz.questions).toHaveLength(5);
      for (const q of quiz.questions) {
        expect(harshPattern.test(q.praise.en), q.id).toBe(false);
        expect(harshPattern.test(q.gentleHint.en), q.id).toBe(false);
      }
    }
  });

  it("tracks 12 collectible badges, 4 reward tiers, and 13 literacy sub-skills in kidsStorage", () => {
    let state = kidsStorage.get();
    expect(computeKidsBadges(state)).toHaveLength(12);
    expect(computeReadingDiagnostics(state).subskills).toHaveLength(13);
    expect(computeKidsRewardTier(0).id).toBe("sunny-sprout");
    expect(computeKidsRewardTier(10).id).toBe("silver-owl");
    expect(computeKidsRewardTier(25).id).toBe("golden-star");
    expect(computeKidsRewardTier(45).id).toBe("rainbow-champion");

    state = kidsStorage.recordStoryRead("story-friendship");
    state = kidsStorage.recordStoryRead("story-honesty");
    state = kidsStorage.recordSpeakingPracticed("conv-hello");
    state = kidsStorage.recordSpeakingPracticed("conv-family");
    state = kidsStorage.recordWritingCompleted("write-cvc-cat");
    state = kidsStorage.recordWritingCompleted("write-cvc-sun");
    state = kidsStorage.recordFriendlyAssessment("quiz-early-4-6", 100);

    const badges = computeKidsBadges(state);
    expect(badges.find((b) => b.id === "story-explorer")?.earned).toBe(true);
    expect(badges.find((b) => b.id === "chat-champion")?.earned).toBe(true);
    expect(badges.find((b) => b.id === "little-writer")?.earned).toBe(true);
    expect(badges.find((b) => b.id === "quiz-hero")?.earned).toBe(true);
    expect(state.stars).toBeGreaterThanOrEqual(15);
  });
});

describe("Kids Phase K6 · Interactive Stories, Star Quiz & Adult-Gated Parent Corner UI", () => {
  it("completes a story, finishes a Star Check quiz for rewards, and unlocks Parent Corner only with correct math gate", () => {
    render(
      <I18nProvider locale="en" theme="light">
        <KidsWorldHub />
      </I18nProvider>,
    );

    // Child-Safe indicator visible in header
    expect(screen.getByText(/Child-Safe Zone/i)).toBeTruthy();

    // 1. Open Tab 8: Stories, Speaking & Writing and complete story comprehension
    fireEvent.click(screen.getByRole("tab", { name: /8\. Stories, Speaking & Writing/i }));
    expect(screen.getByRole("heading", { name: /Pip and the New Bird/i })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Pip smiled and invited him to play/i }));
    expect(kidsStorage.get().storiesRead).toContain("story-friendship");

    // 2. Open Tab 9: Star Quiz & Rewards and verify 12-badge Trophy Shelf + Quiz flow
    fireEvent.click(screen.getByRole("tab", { name: /9\. Star Quiz & Rewards/i }));
    expect(screen.getByText(/All 12 Collectible Badges/i)).toBeTruthy();

    // Answer all 5 questions in Ages 4-6 Star Check
    const answers = [/A a/i, /Yellow Sun/i, /Dog/i, /This is a cat/i, /hat/i];
    for (let i = 0; i < answers.length; i++) {
      fireEvent.click(screen.getByRole("button", { name: answers[i]! }));
      if (i < answers.length - 1) {
        fireEvent.click(screen.getByRole("button", { name: /Next Fun Round/i }));
      } else {
        fireEvent.click(screen.getByRole("button", { name: /Collect My Stars/i }));
      }
    }
    expect(screen.getByText(/Hooray! You Are an English Star!/i)).toBeTruthy();
    expect(kidsStorage.get().assessmentScores["quiz-early-4-6"]).toBe(100);

    // 3. Open Tab 10: Parent Corner 🔒 — wrong math answer stays locked
    fireEvent.click(screen.getByRole("tab", { name: /10\. Parent Corner/i }));
    const input = screen.getByPlaceholderText(/Enter answer/i);
    fireEvent.change(input, { target: { value: "99" } });
    fireEvent.click(screen.getByRole("button", { name: /Unlock Parent View/i }));
    expect(screen.getByText(/Double-check the sum/i)).toBeTruthy();
    expect(screen.queryByText(/Child Literacy & Progress Diagnostics/i)).toBeNull();

    // Correct answer (7 + 8 = 15) unlocks the 13-subskill dashboard & home practice plan
    fireEvent.change(input, { target: { value: "15" } });
    fireEvent.click(screen.getByRole("button", { name: /Unlock Parent View/i }));
    expect(screen.getByText(/Child Literacy & Progress Diagnostics/i)).toBeTruthy();
    expect(screen.getByText(/13-Subskill Reading & Communication Breakdown/i)).toBeTruthy();
    expect(screen.getByText(/5–10 Minute Offline Home Practice Ideas/i)).toBeTruthy();
  });

  it("renders Kids Phase K6 tabs cleanly in Arabic RTL", () => {
    render(
      <I18nProvider locale="ar" theme="light">
        <KidsWorldHub />
      </I18nProvider>,
    );

    expect(screen.getByText(/منطقة آمنة للأطفال/i)).toBeTruthy();
    fireEvent.click(screen.getByRole("tab", { name: /١٠\. ركن الوالدين/i }));
    expect(screen.getByText(/ركن الوالدين والمعلمين/i)).toBeTruthy();
  });
});
