import { describe, expect, it } from "vitest";
import { courseLessons, findLesson, LESSONS } from "@/content/lessons";
import { IELTS_LESSONS } from "@/content/ielts-lessons";
import { SPEAKING_SITUATIONS, SPEAKING_CATEGORIES } from "@/content/speaking-situations";
import { compareRecognition, wordCount } from "@/lib/speech";
import { evaluateFitSentence, getQuestionFormat, scrambleWords } from "@/lib/question-engine";

describe("requested curriculum", () => {
  for (const course of ["a1", "a2", "b1", "b2", "c1", "c2"]) {
    it(`${course.toUpperCase()} has at least 30 detailed TBLL lessons across all 5 skills`, () => {
      const lessons = courseLessons(course);
      expect(lessons.length).toBeGreaterThanOrEqual(30);
      expect(new Set(lessons.map((l) => l.id)).size).toBe(lessons.length);
      expect(new Set(lessons.map((l) => l.title.en)).size).toBe(lessons.length);
      expect(new Set(lessons.map((l) => l.title.ar)).size).toBe(lessons.length);
      for (const skill of ["grammar", "reading", "listening", "writing", "speaking"]) {
        expect(
          lessons.filter((l) => l.skill === skill).length,
          `${course} ${skill}`,
        ).toBeGreaterThanOrEqual(6);
      }
      for (const lesson of lessons) {
        expect(lesson.taskPlan, lesson.id).toBeDefined();
        expect(lesson.vocab?.length ?? 0, lesson.id).toBeGreaterThanOrEqual(4);
        expect(lesson.teaching.length, lesson.id).toBeGreaterThanOrEqual(2);
        expect(lesson.questions.length, lesson.id).toBeGreaterThanOrEqual(4);
        expect(lesson.pronunciation.length, lesson.id).toBeGreaterThan(15);
      }
    });
  }

  it("provides at least 15 distinct reading passages with 10+ varied questions (vocab, synonyms, antonyms, comprehension) and ASR pronunciation", () => {
    const passages = LESSONS.filter((l) => l.isReadingPassage);
    expect(passages.length).toBeGreaterThanOrEqual(15);
    expect(new Set(passages.map((p) => p.title.en)).size).toBe(passages.length);
    for (const passage of passages) {
      expect(passage.questions.length, passage.id).toBeGreaterThanOrEqual(10);
      const kinds = new Set(passage.questions.map((q) => q.kind));
      expect(kinds.has("comprehension"), `${passage.id} comprehension`).toBe(true);
      expect(kinds.has("vocabulary"), `${passage.id} vocabulary`).toBe(true);
      expect(kinds.has("synonym"), `${passage.id} synonym`).toBe(true);
      expect(kinds.has("antonym"), `${passage.id} antonym`).toBe(true);
      expect(passage.vocab?.length ?? 0, passage.id).toBeGreaterThanOrEqual(6);
      expect(passage.pronunciation.length, passage.id).toBeGreaterThan(20);
    }
  });

  it("provides level-based acoustic listening plans with spoken-to-equivalent meaning pairs and vocab across A1–C2", () => {
    const listeningLessons = LESSONS.filter((l) => l.listeningPlan);
    expect(listeningLessons.length).toBeGreaterThanOrEqual(36);
    for (const lesson of listeningLessons) {
      expect(lesson.listeningPlan?.levelEncouragement.en.length, lesson.id).toBeGreaterThan(30);
      expect(lesson.listeningPlan?.levelEncouragement.ar.length, lesson.id).toBeGreaterThan(20);
      expect(lesson.listeningPlan?.acousticsFocus.en.length, lesson.id).toBeGreaterThan(30);
      expect(lesson.listeningPlan?.steps.length, lesson.id).toBeGreaterThanOrEqual(3);
      expect(lesson.listeningPlan?.paraphrasePairs.length, lesson.id).toBeGreaterThanOrEqual(4);
      expect(lesson.vocab?.length ?? 0, lesson.id).toBeGreaterThanOrEqual(4);
    }
  });

  for (const skill of ["listening", "reading", "writing", "speaking"]) {
    it(`IELTS includes ${skill} lessons`, () => {
      expect(
        IELTS_LESSONS.filter((lesson) => lesson.skill === skill).length,
      ).toBeGreaterThanOrEqual(2);
    });
  }
  it("provides at least 60 unique speaking settings across CEFR levels A1–C2", () => {
    expect(SPEAKING_SITUATIONS.length).toBeGreaterThanOrEqual(60);
    expect(new Set(SPEAKING_SITUATIONS.map((s) => s.id)).size).toBe(SPEAKING_SITUATIONS.length);
    expect(new Set(SPEAKING_SITUATIONS.map((s) => s.title.en)).size).toBe(
      SPEAKING_SITUATIONS.length,
    );
    const levels = new Set(SPEAKING_SITUATIONS.map((s) => s.level));
    for (const lv of ["A1", "A2", "B1", "B2", "C1", "C2"]) {
      expect(levels.has(lv), lv).toBe(true);
    }
  });
  it("has contextual multi-turn practice across all five settings", () => {
    for (const category of SPEAKING_CATEGORIES)
      expect(
        SPEAKING_SITUATIONS.filter((s) => s.category === category).length,
      ).toBeGreaterThanOrEqual(12);
    for (const situation of SPEAKING_SITUATIONS) {
      expect(situation.turns.length).toBeGreaterThanOrEqual(3);
      expect(new Set(situation.turns.map((turn) => turn.prompt)).size).toBe(situation.turns.length);
      for (const turn of situation.turns) expect(wordCount(turn.model)).toBeGreaterThan(5);
    }
  });
  it("each practice question has a valid answer and bilingual explanation", () => {
    for (const lesson of LESSONS)
      for (const question of lesson.questions) {
        expect(question.correct).toBeGreaterThanOrEqual(0);
        expect(question.correct).toBeLessThan(question.options.length);
        expect(question.explanation.en.length).toBeGreaterThan(10);
        expect(question.explanation.ar.length).toBeGreaterThan(10);
      }
  });
  it("rejects unknown lesson ids", () => {
    expect(findLesson("not-a-lesson")).toBeUndefined();
  });
  it("all writing models meet their own task minimum", () => {
    for (const lesson of LESSONS) {
      if (!lesson.writing) continue;
      expect(wordCount(lesson.writing.model), lesson.id).toBeGreaterThanOrEqual(
        lesson.writing.minimum,
      );
    }
  });
  it("IELTS Task 1 requires 150 words and supplies full models", () => {
    for (const id of ["ielts-writing-chart", "ielts-writing-letter"]) {
      const task = findLesson(id)?.writing;
      expect(task?.minimum).toBe(150);
      expect(wordCount(task?.model ?? "")).toBeGreaterThanOrEqual(150);
    }
  });
  it("IELTS Task 2 requires 250 words and supplies a full model", () => {
    const task = findLesson("ielts-writing-essay")?.writing;
    expect(task?.minimum).toBe(250);
    expect(wordCount(task?.model ?? "")).toBeGreaterThanOrEqual(250);
  });

  it("every lesson on the website (CEFR A1–C2, IELTS, Kids, Adults) has a 4–5 min dual-coding video script & storyboard", () => {
    expect(LESSONS.length).toBeGreaterThanOrEqual(209);

    for (const lesson of LESSONS) {
      expect(lesson.explainerVideo, `${lesson.id} explainerVideo`).toBeDefined();
      const video = lesson.explainerVideo!;

      // 1. Focused 4-to-5-minute micro-lesson (240–300 seconds) with clear objective & level tag
      expect(video.durationSeconds, `${lesson.id} >= 240s`).toBeGreaterThanOrEqual(240);
      expect(video.durationSeconds, `${lesson.id} <= 300s`).toBeLessThanOrEqual(300);
      expect(video.learningObjective.en.length, `${lesson.id} objective.en`).toBeGreaterThan(15);
      expect(video.learningObjective.ar.length, `${lesson.id} objective.ar`).toBeGreaterThan(10);
      expect(video.levelTag.length, `${lesson.id} levelTag`).toBeGreaterThan(3);

      // Exact scene timing sum
      const totalSceneDuration = video.scenes.reduce((acc, s) => acc + s.durationSeconds, 0);
      expect(totalSceneDuration, `${lesson.id} scene sum`).toBe(video.durationSeconds);

      // 2. The Hook (0:00 – 0:15)
      const first = video.scenes[0]!;
      expect(first.startSeconds, `${lesson.id} hook start`).toBe(0);
      expect(first.durationSeconds, `${lesson.id} hook 15s`).toBe(15);
      expect(first.layout, `${lesson.id} hook layout`).toBe("hook");

      // 3. Dual-coding visuals + conversational second-person narration ("you")
      const fullNarration = video.scenes.map((s) => s.narrationEn).join(" ");
      expect(/\byou(r|'ll|'re|'ve)?\b/i.test(fullNarration), `${lesson.id} second-person`).toBe(
        true,
      );
      for (const sc of video.scenes) {
        expect(sc.visualAction.en.length, `${lesson.id} ${sc.id} visualAction.en`).toBeGreaterThan(
          20,
        );
        expect(sc.visualAction.ar.length, `${lesson.id} ${sc.id} visualAction.ar`).toBeGreaterThan(
          15,
        );
        expect(sc.narrationEn.length, `${lesson.id} ${sc.id} narrationEn`).toBeGreaterThan(25);
        expect(sc.subtitleAr.length, `${lesson.id} ${sc.id} subtitleAr`).toBeGreaterThan(15);
      }

      // 4. Visual Progress Roadmap milestones (Step 1, 2, 3 of 3 complete)
      const roadmapSteps = video.scenes
        .map((s) => s.roadmapStep?.current)
        .filter((n): n is 1 | 2 | 3 => n !== undefined);
      expect(roadmapSteps, `${lesson.id} roadmap steps`).toEqual([1, 2, 3]);

      // 5. At least 2 explicit "Pause & Predict" challenges
      const pauseChallenges = video.scenes.filter((s) => Boolean(s.pausePredict));
      expect(pauseChallenges.length, `${lesson.id} >= 2 pause & predict`).toBeGreaterThanOrEqual(2);
      for (const sc of pauseChallenges) {
        expect(sc.pausePredict!.question.en.length, `${lesson.id} pp question`).toBeGreaterThan(10);
        expect(sc.pausePredict!.answer.length, `${lesson.id} pp answer`).toBeGreaterThan(0);
      }

      // 6. Expressive teacher duo dialogue, chronological timeline, visual aids & motion graphics focus tools
      for (const sc of video.scenes) {
        expect(sc.dialogue.length, `${lesson.id} ${sc.id} dialogue >= 2`).toBeGreaterThanOrEqual(2);
        const speakers = new Set(sc.dialogue.map((d) => d.speaker));
        expect(speakers.has("layla"), `${lesson.id} ${sc.id} layla`).toBe(true);
        expect(speakers.has("omar"), `${lesson.id} ${sc.id} omar`).toBe(true);
        expect(sc.focusTools.length, `${lesson.id} ${sc.id} focusTools`).toBeGreaterThanOrEqual(2);
        expect(sc.illustration, `${lesson.id} ${sc.id} illustration`).toBe(lesson.skill);
      }
      const timelineScenes = video.scenes.filter((s) => (s.timeline?.length ?? 0) >= 3);
      expect(timelineScenes.length, `${lesson.id} visual timeline`).toBeGreaterThanOrEqual(2);

      // 7. 15-second active summary + reflection/takeaway task
      const last = video.scenes[video.scenes.length - 1]!;
      expect(last.layout, `${lesson.id} summary layout`).toBe("summary");
      expect(last.durationSeconds, `${lesson.id} summary 15s`).toBe(15);
      expect(last.takeawayTask?.en.length ?? 0, `${lesson.id} takeaway.en`).toBeGreaterThan(20);
      expect(last.takeawayTask?.ar.length ?? 0, `${lesson.id} takeaway.ar`).toBeGreaterThan(15);
    }
  });

  it("every grammar and reading lesson across all courses includes a detailed explanation and at least 4 question formats", () => {
    const targets = LESSONS.filter((l) => l.skill === "grammar" || l.skill === "reading");
    expect(targets.length).toBeGreaterThanOrEqual(81);

    for (const lesson of targets) {
      // 1. Detailed bilingual rule / reading explanation
      expect(lesson.detailedGuide, `${lesson.id} detailedGuide`).toBeDefined();
      const guide = lesson.detailedGuide!;
      expect(guide.summary.en.length, `${lesson.id} summary.en`).toBeGreaterThan(30);
      expect(guide.summary.ar.length, `${lesson.id} summary.ar`).toBeGreaterThan(20);
      expect(guide.whenToUse.length, `${lesson.id} whenToUse`).toBeGreaterThanOrEqual(2);
      expect(guide.formulas.length, `${lesson.id} formulas`).toBeGreaterThanOrEqual(3);
      expect(guide.commonMistakes.length, `${lesson.id} commonMistakes`).toBeGreaterThanOrEqual(2);
      expect(guide.memoryTip.en.length, `${lesson.id} memoryTip.en`).toBeGreaterThan(15);
      expect(guide.memoryTip.ar.length, `${lesson.id} memoryTip.ar`).toBeGreaterThan(10);

      // 2. At least 4 distinct interactive question formats
      const formats = new Set(lesson.questions.map(getQuestionFormat));
      expect(formats.size, `${lesson.id} format count`).toBeGreaterThanOrEqual(4);
      expect(formats.has("multiple-choice"), `${lesson.id} multiple-choice`).toBe(true);
      expect(formats.has("pick-right-word"), `${lesson.id} pick-right-word`).toBe(true);
      expect(formats.has("rearrange-words"), `${lesson.id} rearrange-words`).toBe(true);
      expect(formats.has("fit-sentence"), `${lesson.id} fit-sentence`).toBe(true);

      // 3. Validate each interactive question structure
      for (const q of lesson.questions) {
        const fmt = getQuestionFormat(q);
        if (fmt === "pick-right-word") {
          expect(q.sentenceTemplate?.includes("___"), `${lesson.id} pick blank`).toBe(true);
        }
        if (fmt === "rearrange-words") {
          expect(q.orderedWords?.length ?? 0, `${lesson.id} rearrange len`).toBeGreaterThanOrEqual(
            4,
          );
          const scrambled = scrambleWords(q.orderedWords!, q.prompt);
          expect(scrambled.join(" "), `${lesson.id} scrambled`).not.toBe(q.orderedWords!.join(" "));
        }
        if (fmt === "fit-sentence") {
          const evalResult = evaluateFitSentence(q.options[q.correct] ?? "", q);
          expect(evalResult.isCorrect, `${lesson.id} fit-sentence model`).toBe(true);
        }
      }
    }
  });
});

describe("recognition comparison is word alignment, not pronunciation grading", () => {
  it("ignores case and punctuation", () => {
    expect(compareRecognition("Hello, Ali!", "hello ali")).toEqual({
      matched: ["hello", "ali"],
      missing: [],
      extra: [],
      total: 2,
    });
  });
  it("shows a substitution as a missing and an additional word", () => {
    expect(compareRecognition("I like coffee", "I like tea")).toEqual({
      matched: ["i", "like"],
      missing: ["coffee"],
      extra: ["tea"],
      total: 3,
    });
  });
  it("does not credit reordered or repeated words as a perfect match", () => {
    expect(compareRecognition("one two one", "one one two").matched.length).toBeLessThan(3);
  });
  it("handles no recognised words", () => {
    expect(compareRecognition("please help", "").missing).toEqual(["please", "help"]);
  });
});
