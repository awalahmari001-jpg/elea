import type { Bilingual } from "@/content/lesson-types";

export type StepSectionId = "reading" | "structure" | "compositional" | "listening";

export type StepDifficulty = "easy" | "medium" | "hard";

export interface StepPassage {
  id: string;
  title: string;
  topic: Bilingual;
  paragraphs: string[];
}

export interface StepListeningClip {
  id: string;
  title: Bilingual;
  speakerMode: "dialogue" | "monologue" | "announcement" | "lecture";
  turns: { speaker: string; voice: "male" | "female"; text: string }[];
}

export interface StepQuestion {
  id: string;
  section: StepSectionId;
  subtopic: string;
  difficulty: StepDifficulty;
  /** References a StepPassage.id when section === "reading". */
  passageId?: string;
  /** References a StepListeningClip.id when section === "listening". */
  clipId?: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: Bilingual;
}

/**
 * Compact tuple for Structure & Compositional STEP questions:
 * [subtopic, difficulty, prompt, optA, optB, optC, optD, correctIndex, explanationEn, explanationAr]
 */
export type CompactStepMcqRow = readonly [
  subtopic: string,
  difficulty: StepDifficulty,
  prompt: string,
  optA: string,
  optB: string,
  optC: string,
  optD: string,
  correctIndex: 0 | 1 | 2 | 3,
  explanationEn: string,
  explanationAr: string,
];
