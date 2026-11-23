import type { Locale } from "@/lib/i18n/config";

export type Bilingual = Record<Locale, string>;
export type LessonCourse = "a1" | "a2" | "b1" | "b2" | "c1" | "c2" | "ielts" | "kids" | "adults";
export type LessonSkill = "grammar" | "reading" | "listening" | "writing" | "speaking";

export type QuestionKind =
  | "comprehension"
  | "vocabulary"
  | "synonym"
  | "antonym"
  | "inference"
  | "grammar"
  | "listening"
  | "equivalent";

export type QuestionFormat =
  "multiple-choice" | "pick-right-word" | "rearrange-words" | "fit-sentence";

export interface LessonQuestion {
  prompt: string;
  options: string[];
  correct: number;
  explanation: Bilingual;
  kind?: QuestionKind;
  /** Interactive exercise format; defaults to "multiple-choice". */
  format?: QuestionFormat;
  /** For `pick-right-word`: English sentence with `___` where the picked word snaps in. */
  sentenceTemplate?: string;
  /** For `rearrange-words`: ordered target tokens (scrambled deterministically in the UI). */
  orderedWords?: string[];
  /** For `fit-sentence`: target rule or vocabulary cue words shown as live badges. */
  cueWords?: string[];
  /** For `fit-sentence`: required normalized terms (supports `|` alternatives, e.g. "doesn't|does not"). */
  requiredTerms?: string[];
  /** For `fit-sentence`: optional bilingual structural hint revealed on click. */
  sentenceHint?: Bilingual;
  /** For `fit-sentence`: minimum word count for a complete fitting sentence. */
  minWords?: number;
}

export interface FormulaRow {
  label: Bilingual;
  pattern: string;
  example: string;
  arabic: string;
}

export interface MistakeComparison {
  wrong: string;
  right: string;
  why: Bilingual;
}

export interface DetailedRuleGuide {
  summary: Bilingual;
  whenToUse: Bilingual[];
  formulas: FormulaRow[];
  commonMistakes: MistakeComparison[];
  memoryTip: Bilingual;
}

export type VideoSceneLayout =
  "hook" | "diagram" | "pause-predict" | "comparison" | "walkthrough" | "summary";

export type TeacherSpeaker = "layla" | "omar";
export type LearnerCharacter = "sara" | "tariq";
export type TeacherMood = "excited" | "curious" | "encouraging" | "celebrating";
export type MotionFocusTool = "arrow" | "circle" | "box" | "highlight" | "pointer";

export interface TeacherLine {
  speaker: TeacherSpeaker;
  mood: TeacherMood;
  emoji: string;
  textEn: string;
  textAr: string;
}

export interface LearnerReaction {
  student: LearnerCharacter;
  emoji: string;
  bubble: Bilingual;
}

export interface TimelineNode {
  marker: string;
  label: string;
  emoji: string;
  active?: boolean;
}

export interface PausePredictPrompt {
  challengeNumber: 1 | 2;
  question: Bilingual;
  /** Clickable interactive options right inside the video stage! */
  choices: string[];
  hint: Bilingual;
  answer: string;
  explanation: Bilingual;
}

export interface RoadmapMilestone {
  current: 1 | 2 | 3;
  total: 3;
  status: "in-progress" | "complete";
  label: Bilingual;
}

export interface VideoScene {
  id: string;
  startSeconds: number;
  durationSeconds: number;
  layout: VideoSceneLayout;
  /** Expressive emoji anchoring the concept visually. */
  sceneEmoji: string;
  chapterLabel: Bilingual;
  headline: Bilingual;
  /** Dual-coding storyboard left column: dynamic animations, diagrams, live sketching & visual signaling cues. */
  visualAction: Bilingual;
  /** Short, high-signal visual labels (never text-heavy slides). */
  visualPoints: string[];
  /** Dual-coding storyboard right column: conversational second-person ("you") spoken narration. */
  narrationEn: string;
  subtitleAr: string;
  /** Dynamic interaction between expressive animated teachers (Layla & Omar) speaking directly to the learner. */
  dialogue: TeacherLine[];
  /** Live animated learner character (Sara or Tariq) reacting, asking, or celebrating on stage. */
  learnerReaction: LearnerReaction;
  /** Animated chronological or sequential visual timeline (tenses, dates, eras, or steps). */
  timeline?: TimelineNode[];
  /** High-quality visual illustration & icon set matched to the lesson skill. */
  illustration: LessonSkill;
  /** Motion graphics focus tools (arrows, pointers, circles, boxes, highlights). */
  focusTools: MotionFocusTool[];
  /** Visual Progress Roadmap transition cue (e.g., "Step 1 of 3 complete"). */
  roadmapStep?: RoadmapMilestone;
  /** Explicit interactive Pause & Predict mini-challenge (at least 2 per video). */
  pausePredict?: PausePredictPrompt;
  /** Final 15-second reflection question or takeaway task. */
  takeawayTask?: Bilingual;
  highlight?: {
    wrong?: string;
    right?: string;
    badge?: string;
    formula?: string;
    signalTag?: string;
  };
}

export interface ExplainerVideo {
  title: Bilingual;
  /** Course key for selecting tailored high-res visual media. */
  course: LessonCourse;
  /** Focused 4-to-5-minute micro-lesson (240–300 seconds). */
  durationSeconds: number;
  /** One clear learning objective for the micro-lesson. */
  learningObjective: Bilingual;
  /** CEFR or IELTS level badge tailored to the learner. */
  levelTag: string;
  presenterNote: Bilingual;
  scenes: VideoScene[];
  videoUrl?: string;
}

export interface VocabItem {
  word: string;
  meaningEn: string;
  meaningAr: string;
  synonym?: string;
  antonym?: string;
  example: string;
}

export interface TaskPlan {
  scenario: Bilingual;
  preTask: Bilingual;
  mainTask: Bilingual;
  languageFocus: Bilingual;
  postTask: Bilingual;
}

export interface ListeningPlan {
  levelEncouragement: Bilingual;
  acousticsFocus: Bilingual;
  steps: Bilingual[];
  paraphrasePairs: { spoken: string; equivalent: string; arabic: string }[];
}

export interface Lesson {
  id: string;
  course: LessonCourse;
  skill: LessonSkill;
  title: Bilingual;
  goal: Bilingual;
  minutes: number;
  teaching: Bilingual[];
  example: string;
  pronunciation: string;
  pronunciationTip: Bilingual;
  questions: LessonQuestion[];
  writing?: { prompt: string; minimum: number; model: string; checklist: Bilingual[] };
  unit?: Bilingual;
  taskPlan?: TaskPlan;
  vocab?: VocabItem[];
  listeningPlan?: ListeningPlan;
  isReadingPassage?: boolean;
  detailedGuide?: DetailedRuleGuide;
  explainerVideo?: ExplainerVideo;
}
