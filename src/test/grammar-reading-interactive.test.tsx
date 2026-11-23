import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { I18nProvider } from "@/components/i18n-provider";
import { RuleVideoPlayer } from "@/components/learning/rule-video-player";
import { DetailedRuleGuideView } from "@/components/learning/detailed-rule-guide";
import { QuestionCard } from "@/components/learning/question-card";
import { CourseAssessmentPanel } from "@/components/learning/course-assessment-panel";
import { HighlightedText } from "@/components/learning/highlighted-text";
import { LessonObjectivesCard } from "@/components/learning/lesson-objectives-card";
import { LessonPostEvaluation } from "@/components/learning/lesson-post-evaluation";
import { findLesson, type LessonCourse } from "@/content/lessons";
import { getPostTestQuestions } from "@/content/course-assessments";
import {
  evaluateFitSentence,
  evaluateRearrange,
  getQuestionFormat,
  isQuestionAnswered,
  isQuestionCorrect,
  scrambleWords,
  type QuestionAnswer,
} from "@/lib/question-engine";
import { toNaturalSpokenEnglish } from "@/hooks/use-speech";
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
  it("normalizes whiteboard grammar notation into natural spoken English without slashes or ellipses", () => {
    expect(toNaturalSpokenEnglish("📘 He / She / It → is + V-ing…")).toBe(
      "He, she, or it, is plus verb plus i n g",
    );
    expect(toNaturalSpokenEnglish("You / We / They → are")).toBe("You, we, or they, are");
  });

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

  it("renders interactive RuleVideoPlayer with Female & Male teachers, animated learners, Emoji Reactions, whiteboard rule cards, L1 bridge, clickable Pause & Predict, and Male/Female conversation", () => {
    const lesson = findLesson("a1-introductions")!;
    render(
      <I18nProvider locale="en" theme="light">
        <RuleVideoPlayer video={lesson.explainerVideo!} />
      </I18nProvider>,
    );

    expect(screen.getAllByText(/4–5 min/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Female voice/i)).toBeInTheDocument();
    expect(screen.getByText(/Male voice/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Coach Layla/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Coach Omar/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Sara|Tariq/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Visuals & On-Screen Actions/i)).toBeInTheDocument();
    expect(screen.getByText(/Spoken Narration/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Step 1 of 3 complete/i).length).toBeGreaterThan(0);

    // Tap an interactive Emoji Reaction button and verify live XP badge increments
    fireEvent.click(screen.getByRole("button", { name: /Got it!/i }));
    expect(screen.getByText(/\+5 XP/i)).toBeInTheDocument();

    // Jump to Step 1 to verify explicit whiteboard Rule Breakdown Cards (He / She / It takes "is") + visual timeline
    fireEvent.click(screen.getAllByRole("button", { name: /Step 1 · Core Visual/i })[0]!);
    expect(screen.getByText(/Visual timeline & progression/i)).toBeInTheDocument();
    expect(screen.getAllByText(/takes "is"/i).length).toBeGreaterThan(0);

    // Jump to Step 2 to verify Arabic vs. English Mother-Tongue Bridge
    fireEvent.click(screen.getAllByRole("button", { name: /Step 2 · Arabic vs. English/i })[0]!);
    expect(screen.getByText(/Mother-tongue bridge: Arabic vs. English/i)).toBeInTheDocument();

    // Jump to Pause & Predict #1 and click the correct interactive choice right inside the video
    fireEvent.click(screen.getAllByRole("button", { name: /Pause & Predict #1/i })[0]!);
    const pp1 = lesson.explainerVideo!.scenes.find(
      (s) => s.layout === "pause-predict" && s.pausePredict?.challengeNumber === 1,
    )!;
    const answerBtn = screen
      .getAllByRole("button")
      .find((btn) => btn.textContent?.includes(pp1.pausePredict!.answer))!;
    expect(answerBtn).toBeDefined();
    fireEvent.click(answerBtn);
    expect(screen.getByText(/Revealed answer/i)).toBeInTheDocument();
    expect(screen.getByText(/\+30 XP/i)).toBeInTheDocument();

    // Jump to Step 3 to verify playable Male & Female real-life conversation
    fireEvent.click(
      screen.getAllByRole("button", { name: /Step 3 · Male & Female Dialogue/i })[0]!,
    );
    expect(
      screen.getByRole("button", { name: /Play full conversation \(Female \+ Male\)/i }),
    ).toBeInTheDocument();

    // Jump to 15-Second Summary & Takeaway Task
    fireEvent.click(screen.getAllByRole("button", { name: /15s Summary & Task/i })[0]!);
    expect(screen.getByText(/15-Second Victory Recap & Task/i)).toBeInTheDocument();
  });

  it("renders DetailedRuleGuideView with explicit rule breakdown cards, Arabic-to-English bridge, Male/Female conversation, formulas, mistakes, and memory tip", () => {
    const lesson = findLesson("a1-introductions")!;
    const { container } = render(
      <I18nProvider locale="en" theme="light">
        <DetailedRuleGuideView guide={lesson.detailedGuide!} skill={lesson.skill} />
      </I18nProvider>,
    );

    expect(screen.getByText(/Detailed rule explanation/i)).toBeInTheDocument();
    expect(screen.getByText(/Crystal-clear rule breakdown/i)).toBeInTheDocument();
    expect(container.textContent).toContain('takes "is"');
    const redIs = Array.from(container.querySelectorAll("strong")).find(
      (el) => el.textContent === '"is"',
    );
    expect(redIs?.className).toContain("text-red-600");
    expect(screen.getByText(/Mother-tongue bridge: Arabic vs. English/i)).toBeInTheDocument();
    expect(screen.getByText(/Real-life male & female conversation/i)).toBeInTheDocument();
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

  it("provides 10 distinct Post-Lesson Test MCQs for every course", () => {
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
      const postQuestions = getPostTestQuestions(course);
      expect(postQuestions, `${course} post length`).toHaveLength(10);

      const postPrompts = new Set(postQuestions.map((q) => q.prompt.toLowerCase()));
      expect(postPrompts.size, `${course} unique post prompts`).toBe(10);

      for (const q of postQuestions) {
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

  it("omits the Summative Test and allows completing the 10-MCQ Post-Lesson Test in CourseAssessmentPanel", () => {
    window.localStorage.clear();
    const postQuestions = getPostTestQuestions("a1");
    render(
      <I18nProvider locale="en" theme="light">
        <CourseAssessmentPanel course="a1" />
      </I18nProvider>,
    );

    // Summative Test must be completely omitted
    expect(screen.queryByText(/Summative/i)).toBeNull();

    // Start Post-Lesson Test (10 MCQs)
    fireEvent.click(screen.getByRole("button", { name: /Start Post-Lesson Test \(10 MCQs\)/i }));
    const groups = screen.getAllByRole("group");
    expect(groups).toHaveLength(10);

    // Answer all 10 questions correctly
    groups.forEach((group, idx) => {
      const q = postQuestions[idx]!;
      const buttons = within(group).getAllByRole("button");
      fireEvent.click(buttons[q.correct]!);
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit answers \(out of 10\)/i }));
    expect(screen.getAllByText(/10 \/ 10/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/\(100%\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Mastery awareness/i)).toBeInTheDocument();
  });

  it("highlights pronouns and important grammar words in bold red via HighlightedText", () => {
    const { container } = render(
      <HighlightedText text='He / She / It takes "is" and I take "am".' />,
    );
    const strongs = Array.from(container.querySelectorAll("strong"));
    const highlightedWords = strongs.map((el) => el.textContent);
    expect(highlightedWords).toContain("He");
    expect(highlightedWords).toContain("She");
    expect(highlightedWords).toContain("It");
    expect(highlightedWords).toContain('"is"');
    expect(highlightedWords).toContain("I");
    expect(highlightedWords).toContain('"am"');
    for (const el of strongs) {
      expect(el.className).toContain("font-extrabold");
      expect(el.className).toContain("text-red-600");
    }
  });

  it("renders LessonObjectivesCard prior to starting and completes the 10-MCQ Objective-Aligned LessonPostEvaluation with per-objective mastery breakdown", () => {
    const lesson = findLesson("a1-introductions")!;
    render(
      <I18nProvider locale="en" theme="light">
        <LessonObjectivesCard
          objectives={lesson.objectives!}
          keywords={lesson.highlightKeywords!}
        />
        <LessonPostEvaluation
          objectives={lesson.objectives!}
          questions={lesson.postEvaluation!}
          keywords={lesson.highlightKeywords!}
        />
      </I18nProvider>,
    );

    // Pre-lesson Objectives & Mastery Missions card renders all 4 objectives
    expect(screen.getByText(/What you will learn & master in this lesson/i)).toBeInTheDocument();
    expect(screen.getAllByText("OBJ-1").length).toBeGreaterThan(0);
    expect(screen.getAllByText("OBJ-4").length).toBeGreaterThan(0);

    // Launch Objective-Aligned Post-Evaluation Test (10 MCQs)
    fireEvent.click(
      screen.getByRole("button", { name: /Start Lesson Post-Evaluation \(10 MCQs\)/i }),
    );
    const groups = screen.getAllByRole("group");
    expect(groups).toHaveLength(10);

    groups.forEach((group, idx) => {
      const q = lesson.postEvaluation![idx]!;
      const buttons = within(group).getAllByRole("button");
      fireEvent.click(buttons[q.correct]!);
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit answers \(out of 10\)/i }));
    expect(screen.getAllByText(/10 \/ 10/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/\(100%\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Mastery breakdown by lesson objective/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Mission mastered/i)).toHaveLength(4);
  });
});
