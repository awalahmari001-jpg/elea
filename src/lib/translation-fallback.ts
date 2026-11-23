import type { Bilingual } from "@/content/lesson-types";
import type {
  TranslationEvaluation,
  TranslationItem,
  TranslationMistake,
  TranslationVerdict,
} from "@/content/self-learning/types";

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "to",
  "of",
  "in",
  "on",
  "at",
  "for",
  "by",
  "with",
  "is",
  "am",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "that",
  "this",
  "it",
  "and",
  "or",
  "as",
]);

const UK_US_MAP: Record<string, string> = {
  organise: "organize",
  organised: "organized",
  organising: "organizing",
  organisation: "organization",
  organisations: "organizations",
  colour: "color",
  colours: "colors",
  analyse: "analyze",
  analysing: "analyzing",
  analysed: "analyzed",
  centre: "center",
  centres: "centers",
  programme: "program",
  programmes: "programs",
  prioritise: "prioritize",
  prioritising: "prioritizing",
  favour: "favor",
  favourable: "favorable",
  favourite: "favorite",
  neighbour: "neighbor",
  neighbours: "neighbors",
  neighbourhood: "neighborhood",
  neighbourhoods: "neighborhoods",
  learnt: "learned",
  travelling: "traveling",
  traveller: "traveler",
  travellers: "travelers",
  apologised: "apologized",
  summarise: "summarize",
  summarising: "summarizing",
  minimise: "minimize",
  maximise: "maximize",
  maximising: "maximizing",
  realise: "realize",
  realised: "realized",
  realising: "realizing",
  recognise: "recognize",
  practising: "practicing",
  defence: "defense",
  licence: "license",
  metres: "meters",
  honours: "honors",
  flavour: "flavor",
  behaviour: "behavior",
  fibre: "fiber",
  globalisation: "globalization",
  polarisation: "polarization",
  decentralisation: "decentralization",
  specialisation: "specialization",
  harmonisation: "harmonization",
  standardised: "standardized",
  personalised: "personalized",
  industrialised: "industrialized",
  civilisations: "civilizations",
  emphasise: "emphasize",
  criticise: "criticize",
  rumours: "rumors",
  ageing: "aging",
  fulfilment: "fulfillment",
  skilfully: "skillfully",
  instalment: "installment",
  grey: "gray",
  mum: "mother",
  mom: "mother",
  dad: "father",
  soccer: "football",
  flat: "apartment",
  holiday: "vacation",
  rubbish: "trash",
  litter: "trash",
  resume: "cv",
  store: "shop",
  film: "movie",
  phone: "mobile",
  transit: "transport",
  kids: "children",
  big: "large",
  quick: "fast",
  quickly: "fast",
  begin: "start",
  began: "started",
  finish: "complete",
  finished: "completed",
  purchase: "buy",
  purchased: "bought",
  assist: "help",
  require: "need",
  requires: "need",
  often: "frequently",
  usually: "typically",
  seldom: "rarely",
};

const CONTRACTIONS: [RegExp, string][] = [
  [/\bi'm\b/g, "i am"],
  [/\bi've\b/g, "i have"],
  [/\bi'll\b/g, "i will"],
  [/\bi'd\b/g, "i would"],
  [/\bit's\b/g, "it is"],
  [/\bthat's\b/g, "that is"],
  [/\bwe're\b/g, "we are"],
  [/\bthey're\b/g, "they are"],
  [/\byou're\b/g, "you are"],
  [/\bdon't\b/g, "do not"],
  [/\bdoesn't\b/g, "does not"],
  [/\bdidn't\b/g, "did not"],
  [/\bcan't\b/g, "cannot"],
  [/\bwon't\b/g, "will not"],
  [/\bwouldn't\b/g, "would not"],
  [/\bshouldn't\b/g, "should not"],
  [/\bisn't\b/g, "is not"],
  [/\baren't\b/g, "are not"],
  [/\bwasn't\b/g, "was not"],
  [/\bweren't\b/g, "were not"],
  [/\bhaven't\b/g, "have not"],
  [/\bhasn't\b/g, "has not"],
  [/\bhadn't\b/g, "had not"],
  [/\blet's\b/g, "let us"],
];

interface TrapRule {
  pattern: RegExp;
  issue: string;
  suggestion: string;
  why: Bilingual;
}

const ARABIC_L1_TRAPS: TrapRule[] = [
  {
    pattern: /\bi\s+am\s+(?:not\s+)?agree\b/i,
    issue: "I am agree",
    suggestion: "I agree / I disagree",
    why: {
      en: "'Agree' is a verb, not an adjective. Say 'I agree' or 'I do not agree'.",
      ar: "كلمة agree فعل وليست صفة؛ نقول I agree أو I do not agree.",
    },
  },
  {
    pattern: /\baffect\s+on\b/i,
    issue: "affect on",
    suggestion: "affect + object (no 'on')",
    why: {
      en: "'Affect' takes a direct object without 'on'. Use 'have an effect on' for the noun.",
      ar: "الفعل affect لا يأخذ on؛ نكتب affect مباشرة أو have an effect on.",
    },
  },
  {
    pattern: /\bdespite\s+of\b/i,
    issue: "despite of",
    suggestion: "despite / in spite of",
    why: {
      en: "Never pair 'despite' with 'of'.",
      ar: "لا نضع of بعد despite؛ نكتب despite مباشرة أو in spite of.",
    },
  },
  {
    pattern:
      /\b(informations|advices|furnitures|homeworks|feedbacks|infrastructures|researches)\b/i,
    issue: "Uncountable noun pluralised with '-s'",
    suggestion:
      "Keep uncountable nouns singular (information, advice, furniture, homework, feedback, infrastructure, research)",
    why: {
      en: "These nouns are uncountable in English and never take '-s'.",
      ar: "هذه الأسماء غير معدودة في الإنجليزية ولا تُجمع بإضافة s.",
    },
  },
  {
    pattern: /\bdiscuss\s+about\b/i,
    issue: "discuss about",
    suggestion: "discuss + topic (no 'about')",
    why: {
      en: "'Discuss' already carries the meaning of 'about'.",
      ar: "الفعل discuss متعدٍّ مباشر ولا يحتاج حرف الجر about.",
    },
  },
  {
    pattern: /\bin\s+the\s+other\s+hand\b/i,
    issue: "in the other hand",
    suggestion: "on the other hand",
    why: {
      en: "The fixed English discourse marker is 'on the other hand'.",
      ar: "التعبير الثابت الصحيح هو on the other hand.",
    },
  },
  {
    pattern: /\bdepend\s+of\b/i,
    issue: "depend of",
    suggestion: "depend on",
    why: {
      en: "'Depend' always collocates with 'on'.",
      ar: "الفعل depend يأخذ دائمًا حرف الجر on.",
    },
  },
  {
    pattern: /\bmore\s+better\b/i,
    issue: "more better",
    suggestion: "much better / far better",
    why: {
      en: "'Better' is already comparative; intensify it with 'much' or 'far'.",
      ar: "كلمة better مقارنة بذاتها، ونقوّيها بـ much better.",
    },
  },
  {
    pattern: /\barrive\s+to\b/i,
    issue: "arrive to",
    suggestion: "arrive at (place) / arrive in (city)",
    why: {
      en: "Never write 'arrive to'; use 'arrive at' for buildings/stations and 'arrive in' for cities/countries.",
      ar: "لا نقول arrive to أبدًا؛ بل arrive at للأماكن وarrive in للمدن.",
    },
  },
  {
    pattern: /\bpeople\s+is\b/i,
    issue: "people is",
    suggestion: "people are",
    why: {
      en: "'People' is plural in English and takes 'are'.",
      ar: "كلمة people جمع دائمًا وتأخذ الفعل are.",
    },
  },
  {
    pattern: /\bchildrens\b/i,
    issue: "childrens",
    suggestion: "children",
    why: {
      en: "'Children' is already the irregular plural of 'child'.",
      ar: "كلمة children جمع شاذ ولا يُضاف إليها s.",
    },
  },
  {
    pattern: /\bgood\s+in\s+[a-z]+ing\b/i,
    issue: "good in + verb-ing",
    suggestion: "good at + verb-ing",
    why: {
      en: "For skills and activities, use 'good at' (not 'good in').",
      ar: "للمهارات نستخدم good at وليس good in.",
    },
  },
];

function normalizeText(raw: string): string {
  let text = raw.toLowerCase().replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/[—–-]/g, " ");
  for (const [pattern, replacement] of CONTRACTIONS) {
    text = text.replace(pattern, replacement);
  }
  return text
    .replace(/[^a-z0-9'\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function canonicalToken(token: string): string {
  const mapped = UK_US_MAP[token] ?? token;
  // Light morphological stemmer for fair semantic matching (e.g. walks/walked -> walk)
  if (mapped.length > 5 && mapped.endsWith("ing")) return mapped.slice(0, -3);
  if (mapped.length > 4 && mapped.endsWith("ed")) return mapped.slice(0, -2);
  if (mapped.length > 4 && mapped.endsWith("es")) return mapped.slice(0, -2);
  if (mapped.length > 3 && mapped.endsWith("s") && !mapped.endsWith("ss"))
    return mapped.slice(0, -1);
  return mapped;
}

function tokenize(raw: string): string[] {
  const norm = normalizeText(raw);
  if (!norm) return [];
  return norm.split(" ").map(canonicalToken).filter(Boolean);
}

function contentTokens(tokens: string[]): string[] {
  return tokens.filter((t) => !STOP_WORDS.has(t));
}

function bigrams(tokens: string[]): Set<string> {
  const set = new Set<string>();
  for (let i = 0; i < tokens.length - 1; i++) {
    set.add(`${tokens[i]}_${tokens[i + 1]}`);
  }
  return set;
}

function computeCandidateSimilarity(learner: string, reference: string) {
  const lNorm = normalizeText(learner);
  const rNorm = normalizeText(reference);
  if (lNorm === rNorm) {
    return { exact: true, semanticF1: 1, allF1: 1, orderScore: 1 };
  }

  const lAll = tokenize(learner);
  const rAll = tokenize(reference);
  const lContent = contentTokens(lAll);
  const rContent = contentTokens(rAll);

  const lSet = new Set(lContent);
  const rSet = new Set(rContent);
  let overlap = 0;
  for (const t of lSet) {
    if (rSet.has(t)) overlap++;
  }
  const precision = lSet.size > 0 ? overlap / lSet.size : 0;
  const recall = rSet.size > 0 ? overlap / rSet.size : 0;
  const semanticF1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;

  const lAllSet = new Set(lAll);
  const rAllSet = new Set(rAll);
  let allOverlap = 0;
  for (const t of lAllSet) {
    if (rAllSet.has(t)) allOverlap++;
  }
  const allP = lAllSet.size > 0 ? allOverlap / lAllSet.size : 0;
  const allR = rAllSet.size > 0 ? allOverlap / rAllSet.size : 0;
  const allF1 = allP + allR > 0 ? (2 * allP * allR) / (allP + allR) : 0;

  const lBi = bigrams(lAll);
  const rBi = bigrams(rAll);
  let biHit = 0;
  for (const b of lBi) {
    if (rBi.has(b)) biHit++;
  }
  const orderScore =
    lBi.size > 0 && rBi.size > 0 ? Math.min(1, (2 * biHit) / (lBi.size + rBi.size) + 0.25) : allF1;

  return { exact: false, semanticF1, allF1, orderScore };
}

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

/**
 * Deterministic semantic translation evaluator used offline, in tests, and as a zero-key
 * fallback when AI keys are absent. Evaluates across all 7 required criteria and accepts
 * valid alternative English translations without penalty.
 */
export function evaluateTranslationLocal(
  item: TranslationItem,
  learnerTranslation: string,
): TranslationEvaluation {
  const trimmed = learnerTranslation.trim();
  const mistakes: TranslationMistake[] = [];

  // Check basic English presence
  const englishWords = trimmed.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) ?? [];
  if (englishWords.length < 2) {
    return {
      verdict: "incorrect",
      overallScore: 10,
      scores: {
        semanticAccuracy: 10,
        grammaticalAccuracy: 10,
        vocabularySelection: 10,
        sentenceStructure: 10,
        wordOrder: 10,
        naturalness: 10,
        punctuationSpelling: 10,
      },
      feedback: {
        en: "Please write a complete English translation of the Arabic sentence before submitting.",
        ar: "يرجى كتابة ترجمة إنجليزية كاملة للجملة العربية قبل الإرسال.",
      },
      mistakes: [
        {
          issue: "Incomplete response",
          suggestion: item.modelEnglish,
          why: {
            en: "A full English sentence is needed so we can evaluate meaning, grammar, and word order.",
            ar: "نحتاج جملة إنجليزية مكتملة لتقييم المعنى والقواعد وترتيب الكلمات.",
          },
        },
      ],
      modelTranslation: item.modelEnglish,
      whyAppropriate: item.whyAppropriate,
      acceptableAlternatives: [...item.alternatives],
    };
  }

  for (const trap of ARABIC_L1_TRAPS) {
    if (trap.pattern.test(trimmed)) {
      mistakes.push({
        issue: trap.issue,
        suggestion: trap.suggestion,
        why: trap.why,
      });
    }
  }

  // Punctuation & capitalization check
  let punctPenalty = 0;
  const startsUpper = /^[A-Z0-9"']/.test(trimmed);
  const endsPunct = /[.?!]$/.test(trimmed);
  const expectedQuestion = item.modelEnglish.trim().endsWith("?");
  if (!startsUpper) {
    punctPenalty += 8;
    mistakes.push({
      issue: "Missing starting capital letter",
      suggestion: trimmed.charAt(0).toUpperCase() + trimmed.slice(1),
      why: {
        en: "English sentences always start with a capital letter.",
        ar: "تبدأ الجملة الإنجليزية دائمًا بحرف كبير (Capital letter).",
      },
    });
  }
  if (expectedQuestion && !trimmed.endsWith("?")) {
    punctPenalty += 10;
    mistakes.push({
      issue: "Missing question mark (?)",
      suggestion: `${trimmed.replace(/[.!]*$/, "")}?`,
      why: {
        en: "The Arabic prompt is a question, so end your English sentence with '?'.",
        ar: "الجملة العربية استفهامية، لذا يجب إنهاء الترجمة الإنجليزية بعلامة استفهام (?).",
      },
    });
  } else if (!endsPunct) {
    punctPenalty += 5;
  }

  const modelSim = computeCandidateSimilarity(trimmed, item.modelEnglish);
  const altSims = item.alternatives.map((alt) => computeCandidateSimilarity(trimmed, alt));
  const bestAlt = altSims.reduce(
    (best, cur) => (cur.semanticF1 > best.semanticF1 ? cur : best),
    altSims[0] ?? { exact: false, semanticF1: 0, allF1: 0, orderScore: 0 },
  );

  const matchedAltBetter = bestAlt.semanticF1 > modelSim.semanticF1 + 0.03 || bestAlt.exact;
  const best = matchedAltBetter ? bestAlt : modelSim;

  // Check key vocabulary coverage across model/alternatives
  const normLearner = normalizeText(trimmed);
  const vocabHits = item.keyVocab.filter((kw) => {
    const kwTokens = contentTokens(tokenize(kw));
    if (kwTokens.length === 0) return true;
    const learnerTokens = new Set(tokenize(trimmed));
    return kwTokens.every((t) => learnerTokens.has(t)) || normLearner.includes(normalizeText(kw));
  }).length;
  const vocabRatio = item.keyVocab.length > 0 ? vocabHits / item.keyVocab.length : best.semanticF1;

  const trapPenalty = mistakes.filter(
    (m) => m.issue !== "Missing starting capital letter" && m.issue !== "Missing question mark (?)",
  ).length;

  const semanticAccuracy = clamp(best.semanticF1 * 100);
  const vocabularySelection = clamp(Math.max(best.semanticF1 * 95, vocabRatio * 100));
  const wordOrder = clamp(best.orderScore * 100 - trapPenalty * 10);
  const sentenceStructure = clamp(best.allF1 * 100 - trapPenalty * 12);
  const grammaticalAccuracy = clamp(
    (best.allF1 * 0.65 + best.semanticF1 * 0.35) * 100 - trapPenalty * 18,
  );
  const naturalness = clamp(
    (best.semanticF1 * 0.5 + best.orderScore * 0.5) * 100 - trapPenalty * 14,
  );
  const punctuationSpelling = clamp(100 - punctPenalty - trapPenalty * 6);

  const overallScore = clamp(
    semanticAccuracy * 0.25 +
      grammaticalAccuracy * 0.2 +
      vocabularySelection * 0.15 +
      sentenceStructure * 0.12 +
      wordOrder * 0.1 +
      naturalness * 0.1 +
      punctuationSpelling * 0.08,
  );

  let verdict: TranslationVerdict;
  if (modelSim.exact && trapPenalty === 0 && punctPenalty <= 5) {
    verdict = "completely_correct";
  } else if (bestAlt.exact && trapPenalty === 0 && punctPenalty <= 5) {
    verdict = "acceptable_alternative";
  } else if (trapPenalty === 0 && best.semanticF1 >= 0.84 && overallScore >= 84) {
    verdict =
      matchedAltBetter || (!modelSim.exact && best.allF1 < 0.94)
        ? "acceptable_alternative"
        : "completely_correct";
  } else if (best.semanticF1 >= 0.45 && overallScore >= 48) {
    verdict = "partially_correct";
  } else {
    verdict = "incorrect";
  }

  // Ensure completely_correct when practically identical to model
  if (
    verdict === "acceptable_alternative" &&
    !matchedAltBetter &&
    modelSim.allF1 >= 0.92 &&
    trapPenalty === 0
  ) {
    verdict = "completely_correct";
  }

  let feedback: Bilingual;
  if (verdict === "completely_correct") {
    feedback = {
      en: "Excellent translation! Your meaning, grammar, vocabulary, and natural English phrasing are spot-on.",
      ar: "ترجمة ممتازة! المعنى والقواعد واختيار المفردات وصياغة الإنجليزية الطبيعية دقيقة تمامًا.",
    };
  } else if (verdict === "acceptable_alternative") {
    feedback = {
      en: "Great work! Although your wording differs from the model sentence, it is a completely valid, natural English translation that preserves the full meaning.",
      ar: "أحسنت! رغم اختلاف صياغتك عن النموذج، إلا أن ترجمتك إنجليزية صحيحة وطبيعية تمامًا وتنقل المعنى كاملًا دون خطأ.",
    };
  } else if (verdict === "partially_correct") {
    feedback = {
      en: `You captured the core idea (${overallScore}%), but a few grammar, vocabulary, or phrasing details need polishing. Review the grammar focus (${item.grammarFocus}) and try revising your sentence.`,
      ar: `أصبتَ الفكرة الأساسية (${overallScore}%)، لكن بعض تفاصيل القواعد أو المفردات أو الصياغة تحتاج صقلًا. راجع نقطة القاعدة (${item.grammarFocus}) وأعد صياغة جملتك.`,
    };
  } else {
    feedback = {
      en: `Your translation misses key parts of the Arabic meaning or structure. Study the natural model translation and grammar focus (${item.grammarFocus}), then rewrite your sentence.`,
      ar: `تفتقد ترجمتك أجزاءً أساسية من المعنى العربي أو البنية الإنجليزية. ادرس الترجمة النموذجية ونقطة القاعدة (${item.grammarFocus}) ثم أعد المحاولة.`,
    };
  }

  return {
    verdict,
    overallScore,
    scores: {
      semanticAccuracy,
      grammaticalAccuracy,
      vocabularySelection,
      sentenceStructure,
      wordOrder,
      naturalness,
      punctuationSpelling,
    },
    feedback,
    mistakes,
    modelTranslation: item.modelEnglish,
    whyAppropriate: item.whyAppropriate,
    acceptableAlternatives: [...item.alternatives],
  };
}

/**
 * Spaced-repetition interval scheduler for Self-learning Pace:
 * - incorrect: due immediately (0 days)
 * - partially_correct: review in 1 day (and stays visible in Revision Queue)
 * - completely_correct / acceptable_alternative: progressive 2 -> 5 -> 12 -> 30 days
 */
export function computeNextReview(
  verdict: TranslationVerdict,
  previousIntervalDays = 0,
  nowMs = Date.now(),
): { intervalDays: number; nextReviewAt: string } {
  let intervalDays = 0;
  if (verdict === "incorrect") {
    intervalDays = 0;
  } else if (verdict === "partially_correct") {
    intervalDays = 1;
  } else {
    if (previousIntervalDays < 2) intervalDays = 2;
    else if (previousIntervalDays < 5) intervalDays = 5;
    else if (previousIntervalDays < 12) intervalDays = 12;
    else intervalDays = 30;
  }
  const nextMs = nowMs + intervalDays * 24 * 60 * 60 * 1000;
  return { intervalDays, nextReviewAt: new Date(nextMs).toISOString() };
}

export function isDueForRevision(
  status: TranslationVerdict,
  nextReviewAt: string,
  nowMs = Date.now(),
): boolean {
  if (status === "incorrect" || status === "partially_correct") return true;
  const dueMs = Date.parse(nextReviewAt);
  return Number.isFinite(dueMs) && dueMs <= nowMs;
}
