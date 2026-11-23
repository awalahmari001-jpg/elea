import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { I18nProvider } from "@/components/i18n-provider";
import { RuleVideoPlayer } from "@/components/learning/rule-video-player";
import { DetailedRuleGuideView } from "@/components/learning/detailed-rule-guide";
import { QuestionCard } from "@/components/learning/question-card";
import { CourseAssessmentPanel } from "@/components/learning/course-assessment-panel";
import { findLesson, type LessonCourse } from "@/content/lessons";
import { getCourseAssessments } from "@/content/course-assessments";
import {
  evaluateFitSentence,
  evaluateRearrange,
  getQuestionFormat,
  isQuestionAnswered,
  isQuestionCorrect,
  scrambleWords,
  type QuestionAnswer,
} from "@/lib/question-engine";
import { useState } from "react";
import type { LessonQuestion } from "@/content/lesson-types";

function InteractiveQuestionHarness({ question }: { question: LessonQuestion }) {
  const [answer, setAnswer] = useState<QuestionAnswer | undefined>(undefined);
  const [checked, setChecked] = useState(false);
  return (
    <I18nProvider locale="en" theme="light">
      <QuestionCard
        index={0}
        question={question}
        answer={answer}
        checked={checked}
        onChange={setAnswer}
      />
      <button
        type="button"
        disabled={!isQuestionAnswered(question, answer)}
        onClick={() => setChecked(true)}
      >
        Submit check
      </button>
      {checked && (
        <span data-testid="result">{isQuestionCorrect(question, answer) ? "PASS" : "FAIL"}</span>
      )}
    </I18nProvider>
  );
}

describe("question-engine and interactive grammar/reading UI", () => {
  it("deterministically scrambles words into a different order and verifies rearrangement", () => {
    const ordered = ["Are", "you", "a", "new", "student", "here?"];
    const scrambled = scrambleWords(ordered, "test-seed");
    expect(scrambled).toHaveLength(ordered.length);
    expect(scrambled.join(" ")).not.toBe(ordered.join(" "));
    expect([...scrambled].sort()).toEqual([...ordered].sort());

    const solveIndices = ordered.map((w) => scrambled.indexOf(w));
    expect(evaluateRearrange(scrambled, solveIndices, ordered)).toBe(true);
    expect(evaluateRearrange(scrambled, [...solveIndices].reverse(), ordered)).toBe(false);
  });

  it("evaluates fit-sentence answers fairly with alternatives and minimum words", () => {
    const lesson = findLesson("a1-grammar-present-simple")!;
    const fitQ = lesson.questions.find((q) => getQuestionFormat(q) === "fit-sentence")!;

    expect(evaluateFitSentence("My sister does not study at night.", fitQ).isCorrect).toBe(true);
    expect(evaluateFitSentence("He doesn't study late at night.", fitQ).isCorrect).toBe(true);
    expect(evaluateFitSentence("He doesn't study", fitQ).tooShort).toBe(true);
    expect(evaluateFitSentence("My brother likes reading books every day.", fitQ).isCorrect).toBe(
      false,
    );
  });

  it("renders the <=4-minute AI RuleVideoPlayer with chapters, play/pause, and bilingual captions", () => {
    const lesson = findLesson("a1-introductions")!;
    render(
      <I18nProvider locale="en" theme="light">
        <RuleVideoPlayer video={lesson.explainerVideo!} />
      </I18nProvider>,
    );

    expect(screen.getAllByText(/Under 4 min/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/1\. Rule & Real Context/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/2\. Core Formula/i).length).toBeGreaterThan(0);

    // Jump to Chapter 3 (Common Traps)
    fireEvent.click(screen.getByRole("button", { name: /3\. Common Traps/i }));
    expect(screen.getByText(/Avoid These Classic Mistakes/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Pause video/i })).toBeInTheDocument();
  });

  it("renders DetailedRuleGuideView with formulas, mistakes comparison, and memory tip", () => {
    const lesson = findLesson("b1-grammar-conditionals")!;
    render(
      <I18nProvider locale="en" theme="light">
        <DetailedRuleGuideView guide={lesson.detailedGuide!} skill={lesson.skill} />
      </I18nProvider>,
    );

    expect(screen.getByText(/Detailed rule explanation/i)).toBeInTheDocument();
    expect(screen.getByText(/Structure & formula table/i)).toBeInTheDocument();
    expect(screen.getByText(/Common mistakes to avoid/i)).toBeInTheDocument();
    expect(screen.getByText(/Quick memory tip/i)).toBeInTheDocument();
  });

  it("supports answering all 4 question formats interactively on a Reading Passage", () => {
    const reading = findLesson("a1-reading-book-fair")!;
    const pickQ = reading.questions.find((q) => getQuestionFormat(q) === "pick-right-word")!;
    const rearrangeQ = reading.questions.find((q) => getQuestionFormat(q) === "rearrange-words")!;
    const fitQ = reading.questions.find((q) => getQuestionFormat(q) === "fit-sentence")!;

    // 1. Pick the right word
    const { unmount: unmountPick } = render(<InteractiveQuestionHarness question={pickQ} />);
    const correctPickLabel = pickQ.options[pickQ.correct] ?? "";
    fireEvent.click(screen.getByRole("button", { name: correctPickLabel }));
    fireEvent.click(screen.getByRole("button", { name: "Submit check" }));
    expect(screen.getByTestId("result").textContent).toBe("PASS");
    unmountPick();

    // 2. Rearrange the words
    const { unmount: unmountRearrange } = render(
      <InteractiveQuestionHarness question={rearrangeQ} />,
    );
    for (const word of rearrangeQ.orderedWords!) {
      const btn = screen
        .getAllByRole("button", { name: word })
        .find((b) => !b.hasAttribute("disabled"))!;
      fireEvent.click(btn);
    }
    fireEvent.click(screen.getByRole("button", { name: "Submit check" }));
    expect(screen.getByTestId("result").textContent).toBe("PASS");
    unmountRearrange();

    // 3. Make it into the fit sentence
    render(<InteractiveQuestionHarness question={fitQ} />);
    const input = screen.getByPlaceholderText(/Type your complete English sentence/i);
    fireEvent.change(input, { target: { value: fitQ.options[fitQ.correct] ?? "" } });
    fireEvent.click(screen.getByRole("button", { name: "Submit check" }));
    expect(screen.getByTestId("result").textContent).toBe("PASS");
  });

  it("provides 10 distinct Summative MCQs and 10 non-overlapping Post-Test MCQs for every course", () => {
    const allCourses: LessonCourse[] = [
      "a1",
      "a2",
      "b1",
      "b2",
      "c1",
      "c2",
      "ielts",
      "kids",
      "adults",
    ];
    for (const course of allCourses) {
      const set = getCourseAssessments(course);
      expect(set.summative, `${course} summative length`).toHaveLength(10);
      expect(set.post, `${course} post length`).toHaveLength(10);

      const sumPrompts = new Set(set.summative.map((q) => q.prompt.toLowerCase()));
      const postPrompts = new Set(set.post.map((q) => q.prompt.toLowerCase()));
      expect(sumPrompts.size, `${course} unique summative prompts`).toBe(10);
      expect(postPrompts.size, `${course} unique post prompts`).toBe(10);

      for (const p of postPrompts) {
        expect(sumPrompts.has(p), `${course} no overlap between summative & post`).toBe(false);
      }

      for (const q of [...set.summative, ...set.post]) {
        expect(q.options, `${course} ${q.id} options`).toHaveLength(4);
        expect(
          new Set(q.options.map((o) => o.toLowerCase())).size,
          `${course} ${q.id} distinct`,
        ).toBe(4);
        expect(q.correct, `${course} ${q.id} correct`).toBeGreaterThanOrEqual(0);
        expect(q.correct, `${course} ${q.id} correct`).toBeLessThan(4);
        expect(q.explanation.en.length, `${course} ${q.id} explanation.en`).toBeGreaterThan(10);
        expect(q.explanation.ar.length, `${course} ${q.id} explanation.ar`).toBeGreaterThan(10);
      }
    }
  });

  it("allows completing both the 10-MCQ Summative Test and 10-MCQ Post-Test in CourseAssessmentPanel", () => {
    window.localStorage.clear();
    const { summative } = getCourseAssessments("a1");
    render(
      <I18nProvider locale="en" theme="light">
        <CourseAssessmentPanel course="a1" />
      </I18nProvider>,
    );

    // Start Summative Test (10 MCQs)
    fireEvent.click(screen.getByRole("button", { name: /Start Summative Test \(10 MCQs\)/i }));
    const groups = screen.getAllByRole("group");
    expect(groups).toHaveLength(10);

    // Answer all 10 questions correctly
    groups.forEach((group, idx) => {
      const q = summative[idx]!;
      const buttons = within(group).getAllByRole("button");
      fireEvent.click(buttons[q.correct]!);
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit answers \(out of 10\)/i }));
    expect(screen.getAllByText(/10 \/ 10/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/\(100%\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Mastery awareness/i)).toBeInTheDocument();

    // Switch directly to Post-Test (10 brand-new MCQs)
    fireEvent.click(screen.getAllByRole("button", { name: /Take Post-Test now/i })[0]!);
    expect(screen.getAllByRole("group")).toHaveLength(10);
  });
});
