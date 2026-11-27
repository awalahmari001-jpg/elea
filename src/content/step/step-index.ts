import type { Bilingual } from "@/content/lesson-types";
import type {
  CompactStepMcqRow,
  StepListeningClip,
  StepPassage,
  StepQuestion,
  StepSectionId,
} from "./step-types";
import { STEP_READING_PASSAGES, STEP_READING_QUESTIONS } from "./step-reading-bank";
import { STEP_STRUCTURE_ROWS } from "./step-structure-bank";
import { STEP_COMPOSITIONAL_ROWS } from "./step-compositional-bank";
import { STEP_LISTENING_CLIPS, STEP_LISTENING_QUESTIONS } from "./step-listening-bank";

function expandCompactRows(
  section: "structure" | "compositional",
  prefix: string,
  rows: readonly CompactStepMcqRow[],
): StepQuestion[] {
  return rows.map((row, idx) => {
    const [subtopic, difficulty, prompt, optA, optB, optC, optD, correctIndex, expEn, expAr] = row;
    return {
      id: `${prefix}-${String(idx + 1).padStart(3, "0")}`,
      section,
      subtopic,
      difficulty,
      prompt,
      options: [optA, optB, optC, optD],
      correctIndex,
      explanation: { en: expEn, ar: expAr },
    };
  });
}

export const STEP_STRUCTURE_QUESTIONS: StepQuestion[] = expandCompactRows(
  "structure",
  "step-s",
  STEP_STRUCTURE_ROWS,
);

export const STEP_COMPOSITIONAL_QUESTIONS: StepQuestion[] = expandCompactRows(
  "compositional",
  "step-c",
  STEP_COMPOSITIONAL_ROWS,
);

export const STEP_PASSAGES: StepPassage[] = STEP_READING_PASSAGES;
export const STEP_CLIPS: StepListeningClip[] = STEP_LISTENING_CLIPS;

export const STEP_QUESTION_BANK: StepQuestion[] = [
  ...STEP_READING_QUESTIONS,
  ...STEP_STRUCTURE_QUESTIONS,
  ...STEP_COMPOSITIONAL_QUESTIONS,
  ...STEP_LISTENING_QUESTIONS,
];

export const STEP_PASSAGES_BY_ID: Record<string, StepPassage> = Object.fromEntries(
  STEP_PASSAGES.map((p) => [p.id, p]),
);

export const STEP_CLIPS_BY_ID: Record<string, StepListeningClip> = Object.fromEntries(
  STEP_CLIPS.map((c) => [c.id, c]),
);

export const STEP_SECTIONS: {
  id: StepSectionId;
  weightLabel: string;
  label: Bilingual;
  description: Bilingual;
}[] = [
  {
    id: "reading",
    weightLabel: "40%",
    label: { en: "Reading Comprehension", ar: "فهم المقروء" },
    description: {
      en: "Original STEP academic & everyday passages testing main idea, details, vocabulary in context, inference, and pronoun reference.",
      ar: "نصوص أصلية بنمط قياس تختبر الفكرة الرئيسية، التفاصيل، المفردات في السياق، الاستنتاج، وعودة الضمير.",
    },
  },
  {
    id: "structure",
    weightLabel: "30%",
    label: { en: "Structure / Grammar", ar: "التراكيب النحوية والقواعد" },
    description: {
      en: "Sentence completion and error identification covering tenses, conditionals, modals, passive, agreement, clauses, and prepositions.",
      ar: "إكمال الجمل واكتشاف الخطأ النحوي عبر جميع الأزمنة والشرط والأفعال الناقصة والمبني للمجهول والروابط وحروف الجر.",
    },
  },
  {
    id: "listening",
    weightLabel: "20%",
    label: { en: "Listening Comprehension", ar: "الاستماع" },
    description: {
      en: "Playable multi-voice conversations, campus announcements, and short lectures with post-answer scripts.",
      ar: "حوارات وإعلانات ومحاضرات قصيرة بصوت واضح متعدد المتحدثين مع إمكانية عرض النص بعد الإجابة.",
    },
  },
  {
    id: "compositional",
    weightLabel: "10%",
    label: { en: "Compositional Analysis", ar: "التحليل الكتابي" },
    description: {
      en: "Punctuation, capitalization, sentence order, word order, spelling, paragraph unity, and formal transitions.",
      ar: "علامات الترقيم، الحروف الكبيرة، ترتيب الجمل والكلمات، الإملاء، ترابط الفقرة، وأدوات الربط الرسمية.",
    },
  },
];

/** Builds a balanced Qiyas-proportioned STEP simulation (40% Reading, 30% Structure, 20% Listening, 10% Compositional). */
export function buildStepSimulationSet(totalCount: 40 | 100 = 40): StepQuestion[] {
  const readingN = Math.round(totalCount * 0.4);
  const structureN = Math.round(totalCount * 0.3);
  const listeningN = Math.round(totalCount * 0.2);
  const compositionalN = totalCount - readingN - structureN - listeningN;

  return [
    ...STEP_READING_QUESTIONS.slice(0, readingN),
    ...STEP_STRUCTURE_QUESTIONS.slice(0, structureN),
    ...STEP_LISTENING_QUESTIONS.slice(0, listeningN),
    ...STEP_COMPOSITIONAL_QUESTIONS.slice(0, compositionalN),
  ];
}
