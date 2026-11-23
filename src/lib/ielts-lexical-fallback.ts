import type { Bilingual } from "@/content/lesson-types";
import type { CefrMasteryProductionTask, IeltsLexicalFeedback } from "@/content/vocab/vocab-types";

export type IeltsPracticeMode = "paraphrase" | "academic-sentence" | "speaking" | "writing";

export interface IeltsLexicalEvalInput {
  mode: IeltsPracticeMode;
  prompt: string;
  targetWords: string[];
  learnerResponse: string;
}

interface LexicalSlipRule {
  pattern: RegExp;
  original: string;
  improved: string;
  why: Bilingual;
}

const COMMON_LEXICAL_SLIPS: LexicalSlipRule[] = [
  {
    pattern: /\baffect\s+on\b/i,
    original: "affect on",
    improved: "affect (verb) / have an effect on (noun)",
    why: {
      en: "'Affect' is a transitive verb and takes a direct object without 'on'. Use 'have an effect on' for the noun.",
      ar: "الفعل affect متعدٍّ ولا يأخذ حرف الجر on؛ استخدم affect مباشرة أو have an effect on مع الاسم.",
    },
  },
  {
    pattern: /\binfrastructures\b/i,
    original: "infrastructures",
    improved: "infrastructure (uncountable)",
    why: {
      en: "In IELTS academic writing, 'infrastructure' is normally uncountable (e.g. 'invest in public infrastructure').",
      ar: "كلمة infrastructure غير معدودة في الإنجليزية الأكاديمية؛ نقول public infrastructure بدون s.",
    },
  },
  {
    pattern: /\badvices\b/i,
    original: "advices",
    improved: "advice / pieces of advice",
    why: {
      en: "'Advice' is uncountable; use 'advice' or 'a piece of advice'.",
      ar: "كلمة advice غير معدودة؛ استخدم advice أو a piece of advice.",
    },
  },
  {
    pattern: /\binformations\b/i,
    original: "informations",
    improved: "information",
    why: {
      en: "'Information' is uncountable in English.",
      ar: "كلمة information غير معدودة ولا تُجمع بـ s.",
    },
  },
  {
    pattern: /\bdespite\s+of\b/i,
    original: "despite of",
    improved: "despite / in spite of",
    why: {
      en: "Never pair 'despite' with 'of'. Write 'despite + noun/-ing' or 'in spite of'.",
      ar: "لا يأتي حرف الجر of بعد despite؛ اكتب despite مباشرة أو in spite of.",
    },
  },
  {
    pattern: /\bvery\s+ubiquitous\b/i,
    original: "very ubiquitous",
    improved: "ubiquitous / increasingly ubiquitous",
    why: {
      en: "'Ubiquitous' is already an extreme adjective; avoid grading it with 'very'.",
      ar: "صفة ubiquitous تعني منتشر في كل مكان بحد ذاتها، لذا لا تُسبق بـ very.",
    },
  },
  {
    pattern: /\ba\s+travel\b/i,
    original: "a travel",
    improved: "a trip / a journey / travel (uncountable)",
    why: {
      en: "'Travel' is uncountable as a general noun; use 'a trip' or 'a journey' for a single countable occasion.",
      ar: "كلمة travel غير معدودة؛ استخدم a trip أو a journey لرحلة واحدة محددة.",
    },
  },
  {
    pattern: /\bdiscuss\s+about\b/i,
    original: "discuss about",
    improved: "discuss (no 'about')",
    why: {
      en: "'Discuss' already includes the meaning of 'about' (e.g. 'discuss the issue').",
      ar: "الفعل discuss لا يحتاج حرف الجر about بعده مباشرة.",
    },
  },
  {
    pattern: /\bin\s+the\s+other\s+hand\b/i,
    original: "in the other hand",
    improved: "on the other hand",
    why: {
      en: "The fixed discourse marker is 'on the other hand', never 'in the other hand'.",
      ar: "التعبير الثابت الصحيح هو on the other hand وليس in the other hand.",
    },
  },
  {
    pattern: /\bdepend\s+of\b/i,
    original: "depend of",
    improved: "depend on",
    why: {
      en: "The verb 'depend' collocates strictly with 'on'.",
      ar: "الفعل depend يتلازم دائمًا مع حرف الجر on.",
    },
  },
  {
    pattern: /\bmore\s+better\b/i,
    original: "more better",
    improved: "better / much better",
    why: {
      en: "'Better' is already comparative; intensify it with 'much' or 'far', not 'more'.",
      ar: "كلمة better صيغة مقارنة بالفعل؛ استخدم much better أو far better.",
    },
  },
  {
    pattern: /\beconomical\s+(?:growth|development|policy|crisis|system)\b/i,
    original: "economical growth/policy",
    improved: "economic growth/policy",
    why: {
      en: "Use 'economic' for the economy and finance; 'economical' means cost-saving and efficient.",
      ar: "استخدم economic للاقتصاد والسياسات، بينما economical تعني موفّر للتكلفة.",
    },
  },
];

function extractWords(text: string): string[] {
  return (text.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) ?? []).filter(Boolean);
}

function wordMatchesTarget(normalizedText: string, target: string): boolean {
  const clean = target.toLowerCase().trim();
  if (!clean) return false;
  if (normalizedText.includes(clean)) return true;
  // Allow simple inflectional stem matching for single words (e.g., mitigate -> mitigating/mitigated)
  if (!clean.includes(" ") && clean.length >= 5) {
    const stem = clean.endsWith("e") ? clean.slice(0, -1) : clean;
    return normalizedText.includes(stem);
  }
  return false;
}

/**
 * Deterministic IELTS Lexical Resource evaluator used as a reliable offline / zero-key fallback
 * and for automated testing. Enforces the pedagogical principle that Band 7+ requires accuracy,
 * naturalness, and appropriateness — not simply inserting rare words.
 */
export function evaluateIeltsLexicalLocal(input: IeltsLexicalEvalInput): IeltsLexicalFeedback {
  const trimmed = input.learnerResponse.trim();
  const normalized = trimmed.toLowerCase();
  const words = extractWords(trimmed);
  const wordCount = words.length;
  const uniqueRatio = wordCount > 0 ? new Set(words).size / wordCount : 0;

  const matchedTargets = input.targetWords.filter((t) => wordMatchesTarget(normalized, t));
  const missingTargets = input.targetWords.filter((t) => !wordMatchesTarget(normalized, t));

  const corrections: IeltsLexicalFeedback["corrections"] = [];
  for (const rule of COMMON_LEXICAL_SLIPS) {
    if (rule.pattern.test(trimmed)) {
      corrections.push({
        original: rule.original,
        improved: rule.improved,
        why: rule.why,
      });
    }
  }

  const minExpected =
    input.mode === "writing"
      ? 45
      : input.mode === "speaking"
        ? 25
        : input.mode === "paraphrase"
          ? 10
          : 12;

  const targetRatio =
    input.targetWords.length > 0 ? matchedTargets.length / input.targetWords.length : 1;

  // Score components out of 100
  const lengthFactor = Math.min(1, wordCount / minExpected);
  const accuracy = Math.max(
    35,
    Math.min(
      95,
      Math.round(88 * lengthFactor - corrections.length * 16 + (wordCount >= minExpected ? 6 : 0)),
    ),
  );
  const range = Math.max(
    35,
    Math.min(95, Math.round(45 + targetRatio * 34 + Math.min(16, uniqueRatio * 20))),
  );
  const naturalness = Math.max(
    35,
    Math.min(
      94,
      Math.round(58 + lengthFactor * 22 + (uniqueRatio >= 0.62 ? 10 : 0) - corrections.length * 14),
    ),
  );
  const appropriateness = Math.max(
    40,
    Math.min(
      94,
      Math.round(
        60 +
          targetRatio * 20 +
          (input.mode === "writing" && /\b(gonna|wanna|stuff|kids|a lot of|super)\b/i.test(trimmed)
            ? -18
            : 10) -
          corrections.length * 8,
      ),
    ),
  );

  if (input.mode === "writing" && /\b(gonna|wanna|stuff|super|tons of)\b/i.test(trimmed)) {
    corrections.push({
      original: "Informal conversational wording (e.g. gonna/stuff/super)",
      improved: "Use formal academic equivalents (e.g. 'considerable', 'factors', 'intend to')",
      why: {
        en: "IELTS Academic Writing requires a consistent formal register without conversational slang.",
        ar: "تتطلب الكتابة الأكاديمية في الآيلتس أسلوبًا رسميًا متماسكًا خاليًا من الكلمات العامية.",
      },
    });
  }

  const average = (accuracy + range + naturalness + appropriateness) / 4;
  let estimatedBand: IeltsLexicalFeedback["estimatedBand"] = "5.5";
  if (wordCount < 6) {
    estimatedBand = "5.5";
  } else if (average >= 85 && corrections.length === 0 && targetRatio >= 0.75) {
    estimatedBand = "8.0+";
  } else if (average >= 78 && corrections.length === 0 && targetRatio >= 0.5) {
    estimatedBand = "7.5";
  } else if (average >= 70 && corrections.length <= 1) {
    estimatedBand = "7.0";
  } else if (average >= 60) {
    estimatedBand = "6.5";
  } else if (average >= 50) {
    estimatedBand = "6.0";
  }

  const enFeedbackParts: string[] = [];
  const arFeedbackParts: string[] = [];

  if (wordCount < minExpected) {
    enFeedbackParts.push(
      `Your response has ${wordCount} words — develop your idea slightly further (aim for at least ${minExpected} words) so your lexical control is clearly demonstrated.`,
    );
    arFeedbackParts.push(
      `تحتوي إجابتك على ${wordCount} كلمة — وسّع فكرتك قليلًا (استهدف ${minExpected} كلمة على الأقل) لإظهار تحكمك اللغوي بوضوح.`,
    );
  } else {
    enFeedbackParts.push(
      `Good response length (${wordCount} words) with clear focus on the prompt.`,
    );
    arFeedbackParts.push(`طول الإجابة مناسب (${wordCount} كلمة) مع تركيز واضح على المطلوب.`);
  }

  if (matchedTargets.length > 0) {
    enFeedbackParts.push(
      `You incorporated target Band 7+ vocabulary (${matchedTargets.join(", ")}).`,
    );
    arFeedbackParts.push(`وظّفت بنجاح من المفردات المستهدفة: (${matchedTargets.join("، ")}).`);
  }
  if (missingTargets.length > 0) {
    enFeedbackParts.push(
      `To push Lexical Resource higher, weave in: ${missingTargets.slice(0, 3).join(", ")} naturally with accurate collocations.`,
    );
    arFeedbackParts.push(
      `لرفع تقييم الثروة اللغوية أكثر، أدمج بشكل طبيعي: ${missingTargets.slice(0, 3).join("، ")} مع تلازماتها الدقيقة.`,
    );
  }
  if (corrections.length > 0) {
    enFeedbackParts.push(
      `Fixing the ${corrections.length} collocation/register slip(s) below will immediately lift precision toward Band 7+.`,
    );
    arFeedbackParts.push(
      `تصحيح الأخطاء المعجمية/الأسلوبية (${corrections.length}) أدناه سيرفع دقتك فورًا نحو درجة ٧+.`,
    );
  }

  const upgradedVersion =
    missingTargets.length > 0 && trimmed.length > 0
      ? `${trimmed.replace(/[.?!]*$/, "")}; moreover, addressing this requires ${missingTargets.slice(0, 2).join(" and ")} in a balanced, context-appropriate way.`
      : trimmed ||
        `Try writing a complete response incorporating: ${input.targetWords.join(", ")}.`;

  return {
    estimatedBand,
    scores: {
      accuracy,
      naturalness,
      appropriateness,
      range,
    },
    feedback: {
      en: enFeedbackParts.join(" "),
      ar: arFeedbackParts.join(" "),
    },
    corrections,
    upgradedVersion,
    band7Note: {
      en: "IELTS Lexical Resource reminder: memorising rare words alone never earns Band 7. Examiners reward accurate collocations, appropriate tone, and natural control in context.",
      ar: "تذكير بمعيار الثروة اللغوية في الآيلتس: حفظ كلمات صعبة وحدها لا يضمن درجة ٧؛ الممتحن يقيّم دقة التلازمات وملاءمة الأسلوب والاستخدام الطبيعي في السياق.",
    },
  };
}

export interface CefrProductionEvaluation {
  passed: boolean;
  wordCount: number;
  missingGroups: string[];
  feedback: Bilingual;
}

/**
 * Evaluates a learner's original written/spoken production against a CEFR measurable mastery task.
 * Supports pipe-separated alternatives in `requiredTerms` (e.g. "because|so|therefore").
 */
export function evaluateCefrProduction(
  task: CefrMasteryProductionTask,
  response: string,
): CefrProductionEvaluation {
  const trimmed = response.trim();
  const normalized = trimmed.toLowerCase();
  const words = extractWords(trimmed);
  const wordCount = words.length;

  const missingGroups: string[] = [];
  for (const requirement of task.requiredTerms) {
    const alternatives = requirement
      .split("|")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    const hit = alternatives.some((alt) => wordMatchesTarget(normalized, alt));
    if (!hit) {
      missingGroups.push(alternatives.join(" / "));
    }
  }

  const enoughWords = wordCount >= task.minWords;
  const passed = enoughWords && missingGroups.length === 0;

  if (passed) {
    return {
      passed: true,
      wordCount,
      missingGroups: [],
      feedback: {
        en: `Mastery indicator achieved! You wrote ${wordCount} words and integrated every required CEFR structure naturally. Compare your wording with the model below to refine style.`,
        ar: `أحسنت! حققت مؤشر الإتقان بكتابة ${wordCount} كلمة مع توظيف جميع التراكيب المطلوبة بطبيعية. قارن صياغتك بالنموذج أدناه لمزيد من الصقل.`,
      },
    };
  }

  const enIssues: string[] = [];
  const arIssues: string[] = [];
  if (!enoughWords) {
    enIssues.push(`Write at least ${task.minWords} words (currently ${wordCount}).`);
    arIssues.push(`اكتب ${task.minWords} كلمة على الأقل (كتبت حاليًا ${wordCount}).`);
  }
  if (missingGroups.length > 0) {
    enIssues.push(`Include these required cues naturally: ${missingGroups.join("; ")}.`);
    arIssues.push(`أدرج هذه العناصر المطلوبة بطبيعية: ${missingGroups.join("؛ ")}.`);
  }

  return {
    passed: false,
    wordCount,
    missingGroups,
    feedback: {
      en: enIssues.join(" "),
      ar: arIssues.join(" "),
    },
  };
}
