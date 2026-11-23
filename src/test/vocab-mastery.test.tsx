import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { I18nProvider } from "@/components/i18n-provider";
import { CefrMasteryStudio } from "@/components/vocab/cefr-mastery-studio";
import { IeltsVocabStudio } from "@/components/vocab/ielts-vocab-studio";
import { CEFR_LEVELS } from "@/content/courses";
import {
  CEFR_MASTERY_INDICATORS,
  CEFR_MASTERY_LEVELS,
  getCefrMasteryLevel,
} from "@/content/vocab/cefr-mastery-data";
import {
  IELTS_CATEGORIES,
  IELTS_PARAPHRASING_TASKS,
  IELTS_SPEAKING_WRITING_PROMPTS,
  IELTS_TOPICS,
  IELTS_VOCABULARY,
} from "@/content/vocab/ielts-vocab-index";
import { evaluateCefrProduction, evaluateIeltsLexicalLocal } from "@/lib/ielts-lexical-fallback";
import { learnerStorage } from "@/lib/learner-storage";

vi.mock("@/lib/ielts-lexical-ai.functions", () => ({
  evaluateIeltsLexical: vi.fn(async ({ data }) => ({
    feedback: evaluateIeltsLexicalLocal(data),
    source: "rubric" as const,
  })),
}));

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  window.localStorage.clear();
});

describe("Phase 1 · IELTS Band 7+ Vocabulary Dataset Integrity", () => {
  it("covers all 10 required lexical categories and all 15 required IELTS topic categories", () => {
    expect(IELTS_CATEGORIES).toHaveLength(10);
    expect(IELTS_TOPICS).toHaveLength(15);
    expect(IELTS_VOCABULARY.length).toBeGreaterThanOrEqual(50);

    const coveredCategories = new Set(IELTS_VOCABULARY.map((v) => v.category));
    for (const cat of IELTS_CATEGORIES) {
      expect(coveredCategories.has(cat.id), `Missing IELTS category: ${cat.id}`).toBe(true);
    }

    const coveredTopics = new Set(IELTS_VOCABULARY.map((v) => v.topic));
    for (const topic of IELTS_TOPICS) {
      expect(coveredTopics.has(topic.id), `Missing IELTS topic: ${topic.id}`).toBe(true);
    }
  });

  it("includes complete Cambridge-referenced metadata, IPA, register contrast, Speaking/Writing apps, and common mistakes on every entry", () => {
    const ids = new Set<string>();
    for (const entry of IELTS_VOCABULARY) {
      expect(ids.has(entry.id), `Duplicate id: ${entry.id}`).toBe(false);
      ids.add(entry.id);

      expect(entry.word.trim().length).toBeGreaterThan(0);
      expect(entry.ipa.startsWith("/")).toBe(true);
      expect(entry.definition.trim().length).toBeGreaterThan(15);
      expect(entry.arabic.trim().length).toBeGreaterThan(2);
      expect(entry.collocations.length).toBeGreaterThanOrEqual(2);
      expect(entry.synonyms.length).toBeGreaterThanOrEqual(1);
      expect(entry.examples).toHaveLength(2);
      expect(entry.registerContrast.everyday.length).toBeGreaterThan(5);
      expect(entry.registerContrast.academic.length).toBeGreaterThan(5);
      expect(entry.ieltsSpeaking.prompt.length).toBeGreaterThan(5);
      expect(entry.ieltsSpeaking.sample.length).toBeGreaterThan(20);
      expect(entry.ieltsWriting.prompt.length).toBeGreaterThan(5);
      expect(entry.ieltsWriting.sample.length).toBeGreaterThan(20);
      expect(entry.commonMistake.wrong.length).toBeGreaterThan(3);
      expect(entry.commonMistake.right.length).toBeGreaterThan(3);
    }
  });

  it("provides paraphrasing tasks and IELTS Speaking & Writing prompts", () => {
    expect(IELTS_PARAPHRASING_TASKS.length).toBeGreaterThanOrEqual(5);
    expect(IELTS_SPEAKING_WRITING_PROMPTS.speaking.length).toBeGreaterThanOrEqual(3);
    expect(IELTS_SPEAKING_WRITING_PROMPTS.writing.length).toBeGreaterThanOrEqual(3);
  });
});

describe("Phase 1 · CEFR A1–C2 Progressive Mastery Dataset Integrity", () => {
  it("provides complete progressive content and all 7 measurable mastery indicators for every CEFR level A1–C2", () => {
    expect(CEFR_MASTERY_INDICATORS).toHaveLength(7);
    expect(CEFR_MASTERY_LEVELS.map((l) => l.level)).toEqual([...CEFR_LEVELS]);

    for (const level of CEFR_LEVELS) {
      const data = getCefrMasteryLevel(level);
      expect(data.essentialVocab.length).toBeGreaterThanOrEqual(4);
      for (const item of data.essentialVocab) {
        expect(item.ipa.startsWith("/")).toBe(true);
        expect(item.arabic.trim().length).toBeGreaterThan(1);
      }
      expect(data.commonExpressions.length).toBeGreaterThanOrEqual(3);
      expect(data.collocations.length).toBeGreaterThanOrEqual(3);
      expect(data.phrasalVerbs.length).toBeGreaterThanOrEqual(2);
      expect(data.idioms.length).toBeGreaterThanOrEqual(2);
      expect(data.grammaticalStructures.length).toBeGreaterThanOrEqual(2);
      expect(data.sentencePatterns.length).toBeGreaterThanOrEqual(2);

      expect(data.communicationDomains.everyday.sample.length).toBeGreaterThan(20);
      expect(data.communicationDomains.academic.sample.length).toBeGreaterThan(20);
      expect(data.communicationDomains.professional.sample.length).toBeGreaterThan(20);

      const indicators = new Set([
        ...data.mcqChecks.map((m) => m.indicator),
        ...data.productionTasks.map((p) => p.indicator),
      ]);
      expect(indicators.size, `${level} must cover all 7 mastery indicators`).toBe(7);
      for (const ind of CEFR_MASTERY_INDICATORS) {
        expect(indicators.has(ind.id), `${level} missing indicator ${ind.id}`).toBe(true);
      }
    }
  });
});

describe("Phase 1 · Lexical Resource & CEFR Production Evaluators", () => {
  it("flags common Band-6 collocation/uncountable slips and rewards accurate Band 7+ paraphrasing", () => {
    const weak = evaluateIeltsLexicalLocal({
      mode: "writing",
      prompt: "Discuss public spending on transit.",
      targetWords: ["allocate", "infrastructure", "congestion"],
      learnerResponse:
        "Despite of high taxes, poor infrastructures affect on workers and create a travel delay.",
    });
    expect(weak.corrections.length).toBeGreaterThanOrEqual(3);
    expect(["5.5", "6.0", "6.5"]).toContain(weak.estimatedBand);

    const strong = evaluateIeltsLexicalLocal({
      mode: "paraphrase",
      prompt:
        "Schools should help students build critical thinking instead of just memorising facts.",
      targetWords: ["foster", "rote learning"],
      learnerResponse:
        "Modern schools should foster critical thinking skills rather than relying excessively on rote learning during examinations.",
    });
    expect(strong.corrections).toHaveLength(0);
    expect(["7.5", "8.0+"]).toContain(strong.estimatedBand);
    expect(strong.band7Note.en).toContain("Band 7");
  });

  it("evaluates CEFR production indicators on minimum word count and required cues", () => {
    const a1 = getCefrMasteryLevel("A1");
    const task = a1.productionTasks[0]!;

    const tooShort = evaluateCefrProduction(task, "My routine.");
    expect(tooShort.passed).toBe(false);

    const passing = evaluateCefrProduction(task, task.modelResponse);
    expect(passing.passed).toBe(true);
    expect(passing.missingGroups).toHaveLength(0);
  });

  it("persists IELTS vocabulary mastery and CEFR indicators cleanly in learnerStorage", () => {
    const savedIelts = learnerStorage.saveIeltsVocab({
      masteredIds: ["edu-curriculum", "edu-foster"],
      quizBestScore: 8,
      completedModes: ["quiz", "collocation"],
    });
    expect(savedIelts.masteredIds).toHaveLength(2);
    expect(learnerStorage.getIeltsVocab().quizBestScore).toBe(8);

    learnerStorage.saveCefrIndicator("B2", "understand");
    learnerStorage.saveCefrIndicator("B2", "opinion-justify");
    const cefr = learnerStorage.getCefrMastery();
    expect(cefr.B2?.passedIndicators).toEqual(["understand", "opinion-justify"]);
  });
});

describe("Phase 1 · Interactive UI Studios", () => {
  it("renders IELTS Vocabulary Studio, filters entries, toggles mastery, and runs Paraphrasing Lab", async () => {
    render(
      <I18nProvider locale="en" theme="light">
        <IeltsVocabStudio />
      </I18nProvider>,
    );

    expect(screen.getByText(/IELTS Band 7\+ Vocabulary & Lexical Resource Studio/i)).toBeTruthy();
    expect(screen.getByText(/not officially endorsed by Cambridge/i)).toBeTruthy();

    // Filter via search
    const searchInput = screen.getByPlaceholderText(/Search word, collocation/i);
    fireEvent.change(searchInput, { target: { value: "ubiquitous" } });
    expect(screen.getByText("ubiquitous")).toBeTruthy();

    // Toggle mastery
    const masterBtn = screen.getByRole("button", { name: /Mark mastered/i });
    fireEvent.click(masterBtn);
    expect(learnerStorage.getIeltsVocab().masteredIds).toContain("ielts-ubiquitous");

    // Switch to 8-Mode Practice Arena -> Paraphrasing Lab
    fireEvent.click(screen.getByRole("tab", { name: /8-Mode Practice Arena/i }));
    fireEvent.click(screen.getByRole("tab", { name: /5\. Paraphrasing Lab/i }));

    const textarea = screen.getByLabelText(/Your response/i);
    fireEvent.change(textarea, {
      target: {
        value:
          "Schools should foster critical thinking rather than relying heavily on rote learning in classrooms.",
      },
    });
    fireEvent.click(screen.getByRole("button", { name: /Evaluate Lexical Resource/i }));

    expect(await screen.findByText(/Estimated Lexical Resource Band/i)).toBeTruthy();
    expect(learnerStorage.getIeltsVocab().completedModes).toContain("paraphrase");
  });

  it("renders CEFR Mastery Studio, switches levels, verifies an MCQ and production indicator, and updates progress report", () => {
    render(
      <I18nProvider locale="en" theme="light">
        <CefrMasteryStudio initialLevel="B1" />
      </I18nProvider>,
    );

    expect(screen.getByText(/CEFR Vocabulary & Language Mastery/i)).toBeTruthy();
    expect(screen.getByText(/B1 · Intermediate Independence/i)).toBeTruthy();

    // Switch to 7-Indicator Mastery Lab
    fireEvent.click(screen.getByRole("tab", { name: /7-Indicator Mastery Lab/i }));

    const b1 = getCefrMasteryLevel("B1");
    const firstMcq = b1.mcqChecks[0]!;
    const correctOption = firstMcq.options[firstMcq.correct]!;

    fireEvent.click(screen.getByRole("button", { name: correctOption }));
    const checkButtons = screen.getAllByRole("button", { name: /Check answer/i });
    fireEvent.click(checkButtons[0]!);

    expect(learnerStorage.getCefrMastery().B1?.passedIndicators).toContain(firstMcq.indicator);

    // Complete first production task with model response
    const firstProd = b1.productionTasks[0]!;
    const prodBoxes = screen.getAllByPlaceholderText(/Write your natural/i);
    fireEvent.change(prodBoxes[0]!, { target: { value: firstProd.modelResponse } });
    const evalButtons = screen.getAllByRole("button", { name: /Evaluate & Verify Indicator/i });
    fireEvent.click(evalButtons[0]!);

    expect(learnerStorage.getCefrMastery().B1?.passedIndicators).toContain(firstProd.indicator);
    expect(screen.getByText(/2 \/ 7 mastery indicators achieved at B1/i)).toBeTruthy();
  });
});
