import type { Bilingual } from "@/content/lesson-types";

/** Supported international mock examination systems. */
export type ExamSystem = "ielts-academic" | "ielts-general" | "toefl-ibt";

/** The four assessed language sections in a full mock examination. */
export type ExamSectionKey = "listening" | "reading" | "writing" | "speaking";

/** Supported objective question formats across IELTS and TOEFL iBT sections. */
export type ObjectiveQuestionType =
  "mcq" | "tfng" | "matching" | "fill" | "insert-text" | "prose-summary";

/** A single spoken turn inside a listening script, tagged with voice gender for TTS playback. */
export interface TranscriptTurn {
  speaker: string;
  voice: "male" | "female";
  text: string;
}

/** An objectively scored listening or reading item. */
export interface ObjectiveQuestion {
  id: string;
  /** Sequential 1-based question number within the exam section. */
  number: number;
  questionType: ObjectiveQuestionType;
  /** Short bilingual badge shown above the item (e.g., "True / False / Not Given", "Inference"). */
  typeBadge: Bilingual;
  prompt: string;
  /** Selectable answer options for choice-based question types. */
  options?: string[];
  /** Case-insensitive accepted short answers for fill-in-the-blank items. */
  acceptedAnswers?: string[];
  /** 0-based index of the correct option inside `options`. */
  correctIndex?: number;
  /** Bilingual answer rationale explaining why the keyed answer is correct. */
  explanation: Bilingual;
}

/** One audio part (dialogue, monologue, or academic lecture) with its transcript and questions. */
export interface ListeningPart {
  id: string;
  title: Bilingual;
  context: Bilingual;
  speakerMode: "dialogue" | "monologue" | "lecture";
  transcript: TranscriptTurn[];
  questions: ObjectiveQuestion[];
}

/** A labeled paragraph inside a reading passage (e.g., "A", "B", "Paragraph 1"). */
export interface ReadingParagraph {
  label: string;
  text: string;
}

/** One reading passage with labeled paragraphs and its associated objective questions. */
export interface ReadingPassage {
  id: string;
  title: string;
  category: Bilingual;
  paragraphs: ReadingParagraph[];
  questions: ObjectiveQuestion[];
}

/** Chart dataset used for IELTS Academic Writing Task 1 visual data reports. */
export interface WritingChartData {
  title: string;
  unit: string;
  categories: string[];
  series: {
    name: string;
    color: string;
    values: number[];
  }[];
}

/** One writing task (IELTS Task 1/2 or TOEFL Integrated / Academic Discussion). */
export interface WritingTask {
  id: string;
  label: Bilingual;
  title: Bilingual;
  recommendedMinutes: number;
  minWords: number;
  prompt: string;
  bulletPoints?: string[];
  chartData?: WritingChartData;
  integratedReading?: {
    title: string;
    paragraphs: string[];
  };
  integratedLecture?: {
    speaker: string;
    transcript: string[];
  };
  discussionContext?: {
    professorPrompt: string;
    studentPosts: {
      name: string;
      text: string;
    }[];
  };
  modelAnswer: string;
  bandChecklist: Bilingual[];
}

/** One speaking task (IELTS Parts 1–3 or TOEFL Independent / Integrated Tasks 1–4). */
export interface SpeakingTask {
  id: string;
  partLabel: Bilingual;
  title: Bilingual;
  prepSeconds: number;
  speakSeconds: number;
  prompts: string[];
  cueCard?: {
    topic: string;
    bullets: string[];
  };
  readingSnippet?: {
    title: string;
    text: string;
  };
  listeningSnippet?: {
    speaker: string;
    transcript: string[];
  };
  fluencyHints: Bilingual[];
  modelResponse: string;
}

/** Complete full-length mock examination blueprint covering all four skills. */
export interface FullMockExam {
  id: ExamSystem;
  title: Bilingual;
  subtitle: Bilingual;
  durationLabel: Bilingual;
  scoreScaleLabel: Bilingual;
  authenticNotice: Bilingual;
  listening: {
    durationMinutes: number;
    instructions: Bilingual;
    parts: ListeningPart[];
  };
  reading: {
    durationMinutes: number;
    instructions: Bilingual;
    passages: ReadingPassage[];
  };
  writing: {
    durationMinutes: number;
    instructions: Bilingual;
    tasks: WritingTask[];
  };
  speaking: {
    durationMinutes: number;
    instructions: Bilingual;
    tasks: SpeakingTask[];
  };
}
