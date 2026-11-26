import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";

vi.mock("@tanstack/react-router", () => ({
  useRouter: () => ({ invalidate: vi.fn() }),
  Link: ({ children, to, ...rest }: { children?: ReactNode; to?: string }) => (
    <a href={to ?? "#"} {...rest}>
      {children}
    </a>
  ),
}));

import { AdvancedStudios } from "@/components/home/advanced-studios";
import { I18nProvider } from "@/components/i18n-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SpeakingStudio } from "@/components/learning/speaking-studio";
import { SITE } from "@/config/site";
import {
  generateExaminerFollowUpFallback,
  generateLiveSpeakingFallback,
} from "@/lib/speaking-fallback";
import { getTurnFluencyCoach, SPEAKING_SITUATIONS } from "@/content/speaking-situations";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  window.localStorage.clear();
});

describe("Direct Contact Info & 75+ Daily Speaking Live Discourse Section", () => {
  it("exposes owner WhatsApp (+966 501333021) and Email (Awalahmari001@gmail.com) in SITE, SiteFooter, and Home", () => {
    expect(SITE.contact.whatsappDisplay).toBe("+966 501333021");
    expect(SITE.contact.whatsappUrl).toBe("https://wa.me/966501333021");
    expect(SITE.contact.email).toBe("Awalahmari001@gmail.com");

    const { unmount } = render(
      <I18nProvider locale="en" theme="light">
        <SiteFooter />
      </I18nProvider>,
    );
    const waLink = screen.getByRole("link", { name: /\+966 501333021/i });
    expect(waLink.getAttribute("href")).toBe("https://wa.me/966501333021");
    const mailLink = screen.getByRole("link", { name: /Awalahmari001@gmail\.com/i });
    expect(mailLink.getAttribute("href")).toBe("mailto:Awalahmari001@gmail.com");
    unmount();

    render(
      <I18nProvider locale="ar" theme="light">
        <AdvancedStudios />
      </I18nProvider>,
    );
    expect(screen.getByRole("link", { name: /\+966 501333021/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /Awalahmari001@gmail\.com/i })).toBeTruthy();
    expect(screen.getByText(/استوديو المحادثة اليومية الحية/i)).toBeTruthy();
  });

  it("provides at least 70 unique daily real-life speaking situations (75 total) with fluency hints & starters on every turn", () => {
    expect(SPEAKING_SITUATIONS.length).toBeGreaterThanOrEqual(75);
    expect(new Set(SPEAKING_SITUATIONS.map((s) => s.id)).size).toBe(SPEAKING_SITUATIONS.length);

    // Airport coverage
    const airportIds = [
      "checkin",
      "airport-security",
      "airport-boarding-gate",
      "airport-customs-arrival",
      "airport-duty-free",
      "airport-seat-upgrade",
    ];
    for (const id of airportIds) {
      expect(
        SPEAKING_SITUATIONS.some((s) => s.id === id),
        `Missing airport situation: ${id}`,
      ).toBe(true);
    }

    // Every single turn of all 75 situations delivers bilingual fluency coaching & clickable starters
    for (const situation of SPEAKING_SITUATIONS) {
      for (let i = 0; i < situation.turns.length; i++) {
        const coach = getTurnFluencyCoach(situation, i);
        expect(coach.hint.en.length, `${situation.id}[${i}] hint.en`).toBeGreaterThan(15);
        expect(coach.hint.ar.length, `${situation.id}[${i}] hint.ar`).toBeGreaterThan(10);
        expect(coach.starters.length, `${situation.id}[${i}] starters`).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("guides learners through live interactive discourse with dynamic responses, starter insertion, and airport spotlight", async () => {
    render(
      <I18nProvider locale="en" theme="light">
        <SpeakingStudio />
      </I18nProvider>,
    );

    expect(screen.getByText(/75 real-life situations/i)).toBeTruthy();
    expect(screen.getByText(/Live Interactive Session/i)).toBeTruthy();
    expect(screen.getByText(/Live Fluency Hint/i)).toBeTruthy();

    // Tap first sentence starter -> inserts directly into response box
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    const starterBtn = screen.getByRole("button", { name: /I would like a/i });
    fireEvent.click(starterBtn);
    expect(textarea.value.length).toBeGreaterThan(5);

    // Unlock all 75 situations right from the studio and switch to Airport Check-in
    fireEvent.click(screen.getByRole("button", { name: /Unlock All 75 Situations/i }));
    fireEvent.click(screen.getByRole("button", { name: /Airport & Travel Spotlight/i }));
    fireEvent.click(screen.getByRole("button", { name: /Airport: Going through security/i }));
    expect(screen.getByRole("heading", { name: /Airport: Going through security/i })).toBeTruthy();
    expect(screen.getByText(/Should I also take out my/i)).toBeTruthy();

    // Type a custom live utterance and verify the partner dynamically responds to what was actually said
    const airportBox = screen.getByRole("textbox") as HTMLTextAreaElement;
    fireEvent.change(airportBox, {
      target: { value: "I want a window seat to London with two suitcases" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Send Live Reply/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/reserved a window seat for you on your flight to London/i),
      ).toBeTruthy();
    });
    expect(screen.getByText(/More natural way to say it/i)).toBeTruthy();
  }, 15000);

  it("generates distinct reactive partner & examiner responses strictly based on speaker input", () => {
    const windowReply = generateLiveSpeakingFallback({
      situationId: "checkin",
      turns: [
        { speaker: "partner", text: "Good morning! Where are you flying today?" },
        { speaker: "learner", text: "I want a window seat to London with two suitcases" },
      ],
    });
    const delayReply = generateLiveSpeakingFallback({
      situationId: "checkin",
      turns: [
        { speaker: "partner", text: "Good morning! Where are you flying today?" },
        { speaker: "learner", text: "Is my flight delayed today?" },
      ],
    });

    expect(windowReply.partnerReply).toMatch(/window seat/i);
    expect(windowReply.partnerReply).toMatch(/London/i);
    expect(windowReply.naturalUpgrade).toMatch(/Could I please have/i);

    expect(delayReply.partnerReply).toMatch(/delay/i);
    expect(delayReply.partnerReply).not.toBe(windowReply.partnerReply);

    const examiner = generateExaminerFollowUpFallback({
      examTitle: "IELTS Academic",
      partLabel: "Part 3",
      originalPrompt: "How does tourism affect local heritage?",
      learnerAnswer:
        "I think sustainable ecotourism helps protect ancient monuments and local artisans.",
    });
    expect(examiner.examinerFollowUp).toMatch(/sustainable|ecotourism|ancient|monuments/i);
  });
});
