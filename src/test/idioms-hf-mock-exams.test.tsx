import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { MockExamCenter } from "@/components/exams/mock-exam-center";
import { I18nProvider } from "@/components/i18n-provider";
import { BUSINESS_EXPRESSIONS } from "@/content/business/business-expressions";
import { IELTS_ACADEMIC_MOCK, IELTS_GENERAL_MOCK } from "@/content/mock-exams/ielts-mock-data";
import { TOEFL_IBT_MOCK } from "@/content/mock-exams/toefl-mock-data";
import { CEFR_MASTERY_LEVELS } from "@/content/vocab/cefr-mastery-data";
import { IELTS_TOPICS, IELTS_VOCABULARY } from "@/content/vocab/ielts-vocab-index";
import { accuracyToIeltsBand, roundIeltsBand, scoreFullMockExam } from "@/lib/mock-exam-scoring";

describe("Idioms (>= 70 per topic) & High-Frequency IELTS Words (>= 500)", () => {
  it("provides at least 70 unique idioms for every single one of the 15 IELTS topics", () => {
    expect(IELTS_TOPICS.length).toBe(15);
    for (const topic of IELTS_TOPICS) {
      const idioms = IELTS_VOCABULARY.filter(
        (entry) => entry.topic === topic.id && entry.category === "idioms",
      );
      const uniqueNorms = new Set(idioms.map((i) => i.word.trim().toLowerCase()));
      expect(
        uniqueNorms.size,
        `Topic "${topic.id}" should have >= 70 unique idioms`,
      ).toBeGreaterThanOrEqual(70);
      for (const idm of idioms) {
        expect(idm.definition.length).toBeGreaterThan(5);
        expect(idm.arabic.length).toBeGreaterThan(2);
      }
    }
  });

  it("provides at least 70 unique Business English idioms and 70+ idioms per CEFR Mastery level (A1–C2)", () => {
    const bizIdioms = BUSINESS_EXPRESSIONS.filter((e) => e.category === "idioms");
    const uniqueBiz = new Set(bizIdioms.map((e) => e.expression.trim().toLowerCase()));
    expect(uniqueBiz.size).toBeGreaterThanOrEqual(70);

    expect(CEFR_MASTERY_LEVELS.length).toBe(6);
    for (const lvl of CEFR_MASTERY_LEVELS) {
      const uniqueCefr = new Set(lvl.idioms.map((i) => i.idiom.trim().toLowerCase()));
      expect(
        uniqueCefr.size,
        `CEFR ${lvl.level} should have >= 70 unique idioms`,
      ).toBeGreaterThanOrEqual(70);
    }
  });

  it("provides at least 500 unique high-frequency IELTS words across all 15 topics", () => {
    const highFreq = IELTS_VOCABULARY.filter((e) => e.category === "high-frequency");
    const uniqueWords = new Set(highFreq.map((e) => e.word.trim().toLowerCase()));
    expect(uniqueWords.size).toBeGreaterThanOrEqual(500);

    const coveredTopics = new Set(highFreq.map((e) => e.topic));
    expect(coveredTopics.size).toBe(15);
  });
});

describe("Experimental IELTS & TOEFL iBT Authentic Mock Exams", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("includes authentic 4-skill IELTS Academic, IELTS General, and TOEFL iBT exam blueprints", () => {
    // IELTS Academic
    expect(IELTS_ACADEMIC_MOCK.listening.parts.length).toBe(4);
    expect(IELTS_ACADEMIC_MOCK.reading.passages.length).toBe(3);
    expect(IELTS_ACADEMIC_MOCK.writing.tasks[0]?.chartData).toBeDefined();
    expect(IELTS_ACADEMIC_MOCK.speaking.tasks.some((t) => Boolean(t.cueCard))).toBe(true);

    // IELTS General Training
    expect(IELTS_GENERAL_MOCK.listening.parts.length).toBe(4);
    expect(IELTS_GENERAL_MOCK.reading.passages.length).toBe(3);
    expect(IELTS_GENERAL_MOCK.writing.tasks[0]?.bulletPoints?.length).toBeGreaterThanOrEqual(3);

    // TOEFL iBT
    expect(TOEFL_IBT_MOCK.reading.passages.length).toBe(2);
    expect(TOEFL_IBT_MOCK.listening.parts.length).toBe(3);
    expect(TOEFL_IBT_MOCK.speaking.tasks.length).toBe(4);
    expect(TOEFL_IBT_MOCK.writing.tasks[0]?.integratedReading).toBeDefined();
    expect(TOEFL_IBT_MOCK.writing.tasks[0]?.integratedLecture).toBeDefined();
    expect(TOEFL_IBT_MOCK.writing.tasks[1]?.discussionContext?.studentPosts.length).toBe(2);
  });

  it("computes authentic IELTS Band (0.5 rounding) and TOEFL iBT (0–120) score reports", () => {
    expect(roundIeltsBand(6.25)).toBe(6.5);
    expect(roundIeltsBand(6.75)).toBe(7.0);
    expect(accuracyToIeltsBand(1, 16)).toBe(9.0);

    // Perfect objective + model responses on IELTS Academic
    const ieltsListeningAnswers: Record<string, number | string> = {};
    for (const part of IELTS_ACADEMIC_MOCK.listening.parts) {
      for (const q of part.questions) {
        ieltsListeningAnswers[q.id] =
          q.questionType === "fill" ? (q.acceptedAnswers?.[0] ?? "") : (q.correctIndex ?? 0);
      }
    }
    const ieltsReadingAnswers: Record<string, number | string> = {};
    for (const p of IELTS_ACADEMIC_MOCK.reading.passages) {
      for (const q of p.questions) {
        ieltsReadingAnswers[q.id] =
          q.questionType === "fill" ? (q.acceptedAnswers?.[0] ?? "") : (q.correctIndex ?? 0);
      }
    }
    const ieltsWriting: Record<string, string> = {};
    for (const task of IELTS_ACADEMIC_MOCK.writing.tasks) {
      ieltsWriting[task.id] = task.modelAnswer;
    }
    const ieltsSpeaking: Record<string, string> = {};
    for (const task of IELTS_ACADEMIC_MOCK.speaking.tasks) {
      ieltsSpeaking[task.id] = task.modelResponse;
    }

    const ieltsReport = scoreFullMockExam({
      exam: IELTS_ACADEMIC_MOCK,
      listeningAnswers: ieltsListeningAnswers,
      readingAnswers: ieltsReadingAnswers,
      writingResponses: ieltsWriting,
      speakingResponses: ieltsSpeaking,
      elapsedSeconds: 3600,
      mode: "exam",
    });

    expect(ieltsReport.sections.listening.scaledScore).toBe(9.0);
    expect(ieltsReport.sections.reading.scaledScore).toBe(9.0);
    expect(ieltsReport.overallScore).toBeGreaterThanOrEqual(8.0);
    expect(ieltsReport.cefrEquivalent).toBe("C2");

    // Perfect objective + model responses on TOEFL iBT
    const toeflListeningAnswers: Record<string, number | string> = {};
    for (const part of TOEFL_IBT_MOCK.listening.parts) {
      for (const q of part.questions) {
        toeflListeningAnswers[q.id] =
          q.questionType === "fill" ? (q.acceptedAnswers?.[0] ?? "") : (q.correctIndex ?? 0);
      }
    }
    const toeflReadingAnswers: Record<string, number | string> = {};
    for (const p of TOEFL_IBT_MOCK.reading.passages) {
      for (const q of p.questions) {
        toeflReadingAnswers[q.id] =
          q.questionType === "fill" ? (q.acceptedAnswers?.[0] ?? "") : (q.correctIndex ?? 0);
      }
    }
    const toeflWriting: Record<string, string> = {};
    for (const task of TOEFL_IBT_MOCK.writing.tasks) {
      toeflWriting[task.id] = task.modelAnswer;
    }
    const toeflSpeaking: Record<string, string> = {};
    for (const task of TOEFL_IBT_MOCK.speaking.tasks) {
      toeflSpeaking[task.id] = task.modelResponse;
    }

    const toeflReport = scoreFullMockExam({
      exam: TOEFL_IBT_MOCK,
      listeningAnswers: toeflListeningAnswers,
      readingAnswers: toeflReadingAnswers,
      writingResponses: toeflWriting,
      speakingResponses: toeflSpeaking,
      elapsedSeconds: 4200,
      mode: "exam",
    });

    expect(toeflReport.sections.reading.scaledScore).toBe(30);
    expect(toeflReport.sections.listening.scaledScore).toBe(30);
    expect(toeflReport.overallScore).toBeGreaterThanOrEqual(105);
    expect(toeflReport.overallScore).toBeLessThanOrEqual(120);
  });

  it("renders MockExamCenter, runs through sections, and produces a scored report", () => {
    render(
      <I18nProvider locale="en" theme="light">
        <MockExamCenter />
      </I18nProvider>,
    );

    // Lobby displays all 3 authentic mock exams
    expect(screen.getByText(/Experimental IELTS & TOEFL iBT Mock Exam Center/i)).toBeTruthy();
    const startToeflBtn = screen.getByRole("button", { name: /Start TOEFL iBT/i });
    fireEvent.click(startToeflBtn);

    // TOEFL starts with Reading section & shows Academic passage
    expect(screen.getAllByText(/Bioluminescence/i).length).toBeGreaterThan(0);

    // Switch to Writing to verify Academic Discussion Board renders
    fireEvent.click(screen.getByRole("button", { name: /4\. Writing/i }));
    expect(screen.getAllByText(/Claire/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Marcus/i).length).toBeGreaterThan(0);

    // Submit exam and check Official-Style Score Report appears
    fireEvent.click(screen.getByRole("button", { name: /Submit & Score Exam/i }));
    expect(screen.getByText(/Official-Style Score Report/i)).toBeTruthy();
    expect(screen.getByText(/Estimated TOEFL iBT Total Score/i)).toBeTruthy();
  }, 15000);
});
