import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";

import { I18nProvider } from "@/components/i18n-provider";
import { VideosGamesStudio } from "@/components/kids/videos-games-studio";
import { RuleVideoPlayer } from "@/components/learning/rule-video-player";
import { SpeakingThroughWritingWorkshop } from "@/components/workshops/speaking-through-writing";
import { WorkshopStudio } from "@/components/workshops/workshop-studio";
import { KIDS_ANIMATED_VIDEOS } from "@/content/kids/videos-games-data";
import { findLesson } from "@/content/lessons";
import { kidsStorage } from "@/lib/kids-storage";
import { evaluateSpeakingThroughWritingLocal } from "@/lib/speaking-through-writing-fallback";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  window.localStorage.clear();
});

describe("Speaking Through Writing Interactive Workshop (CEFR A1–C2)", () => {
  it("corrects grammar/phrasing errors and builds 3-step CEFR A1–C2 reconstructions", () => {
    const resB2 = evaluateSpeakingThroughWritingLocal({
      draft: "I want change my seat to window because I am not like middle seat.",
      targetLevel: "B2",
      contextId: "airport",
    });

    expect(resB2.corrections.length).toBeGreaterThanOrEqual(2);
    expect(resB2.corrections.some((c) => /would like to change/i.test(c.corrected))).toBe(true);
    expect(resB2.corrections.some((c) => /don't like/i.test(c.corrected))).toBe(true);
    expect(resB2.reconstructionSteps).toHaveLength(3);
    expect(resB2.targetLevel).toBe("B2");
    expect(resB2.elevatedSpoken.length).toBeGreaterThan(25);
    expect(resB2.encouragement.en.length).toBeGreaterThan(15);
    expect(resB2.encouragement.ar.length).toBeGreaterThan(10);

    const resC1 = evaluateSpeakingThroughWritingLocal({
      draft: "I am agree with your plan but I think we need more time for finish report.",
      targetLevel: "C1",
      contextId: "workplace",
    });
    expect(resC1.corrections.some((c) => /^I agree$/i.test(c.corrected))).toBe(true);
    expect(resC1.corrections.some((c) => /to finish/i.test(c.corrected))).toBe(true);
    expect(resC1.targetLevel).toBe("C1");
    expect(resC1.elevatedSpoken).not.toBe(resB2.elevatedSpoken);
  });

  it("renders SpeakingThroughWritingWorkshop inside WorkshopStudio, evaluates drafts, and saves to phrasebook", async () => {
    render(
      <I18nProvider locale="en" theme="light">
        <WorkshopStudio initialTab="speaking-through-writing" />
      </I18nProvider>,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: /Speaking Through Writing Workshop/i }),
    ).toBeInTheDocument();

    // Load example rough draft and select C1 target
    fireEvent.click(screen.getByRole("button", { name: /Try an Example Rough Draft/i }));
    fireEvent.click(screen.getByRole("button", { name: "C1" }));
    fireEvent.click(screen.getByRole("button", { name: /Evaluate & Elevate to C1/i }));

    await waitFor(() => {
      expect(screen.getByText(/Step-by-Step Sentence Reconstruction/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/Friendly Grammar & Phrasing Polish/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Elevated CEFR C1 Spoken Sentence/i)).toBeInTheDocument();

    // Save to personal spoken phrasebook
    fireEvent.click(screen.getByRole("button", { name: /Save to Phrasebook/i }));
    expect(screen.getByText(/My Saved Spoken Phrasebook \(1\)/i)).toBeInTheDocument();
  }, 15000);

  it("renders SpeakingThroughWritingWorkshop cleanly in Arabic RTL", () => {
    render(
      <I18nProvider locale="ar" theme="light">
        <SpeakingThroughWritingWorkshop />
      </I18nProvider>,
    );
    expect(screen.getByText(/ورشة التحدّث عبر الكتابة/i)).toBeInTheDocument();
  });
});

describe("Visual-First Instructional Video Presentation (Zero Verbatim Narration Transcripts)", () => {
  it("omits verbatim teacher narration and subtitles in RuleVideoPlayer while keeping visual diagrams & examples", () => {
    const lesson = findLesson("a1-introductions")!;
    const video = lesson.explainerVideo!;
    const firstScene = video.scenes[0]!;

    render(
      <I18nProvider locale="en" theme="light">
        <RuleVideoPlayer video={video} keywords={["am", "is", "are"]} />
      </I18nProvider>,
    );

    // No Subtitles control button and no verbatim teacher narration lines rendered on screen
    expect(screen.queryByRole("button", { name: /Subtitles/i })).not.toBeInTheDocument();
    expect(screen.queryByText(firstScene.narrationEn)).not.toBeInTheDocument();
    for (const line of firstScene.dialogue) {
      expect(screen.queryByText(line.textEn)).not.toBeInTheDocument();
    }

    // Visual-first keywords & concepts ARE cleanly rendered
    expect(screen.getByText(/Core Concepts & Examples/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Listen & absorb the visual cues above/i).length).toBeGreaterThan(0);
  });

  it("omits verbatim narrator captions in Kids VideosGamesStudio while displaying visual props & target objectives", () => {
    const firstVideo = KIDS_ANIMATED_VIDEOS[0]!;
    const stage0 = firstVideo.stages[0];

    render(
      <I18nProvider locale="en" theme="light">
        <VideosGamesStudio
          progress={kidsStorage.get()}
          initialSubMode="videos"
          onWatchVideo={() => {}}
          onGameWin={() => {}}
        />
      </I18nProvider>,
    );

    // Verbatim narrator speech bubble caption is completely omitted
    expect(screen.queryByText(`“${stage0.englishCaption}”`)).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Hide AR Helper/i })).not.toBeInTheDocument();

    // Visual-first listening badge & objective concept card are shown
    expect(screen.getByText(/Listen & Watch Visuals/i)).toBeInTheDocument();
    expect(screen.getByText(firstVideo.objective.en)).toBeInTheDocument();
  });
});
