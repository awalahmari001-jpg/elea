import type { Bilingual } from "@/content/lesson-types";
import { getWorkshopRole, getWorkshopScenario } from "@/content/workshops/scenarios";
import type {
  WorkshopCefrLevel,
  WorkshopCorrection,
  WorkshopEvaluationReport,
  WorkshopRoleId,
  WorkshopTurn,
} from "@/content/workshops/workshop-types";

export interface WorkshopTurnInput {
  scenarioId: string;
  roleId: WorkshopRoleId;
  level: WorkshopCefrLevel;
  turns: WorkshopTurn[];
}

function extractWords(text: string): string[] {
  return (text.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) ?? []).filter(Boolean);
}

function clamp(n: number): number {
  return Math.max(25, Math.min(98, Math.round(n)));
}

/**
 * Dynamic deterministic persona responder used offline, in tests, or when AI keys are absent.
 * Reacts directly to what the learner wrote, adapts register to CEFR A2–C2, introduces
 * realistic scenario complications, and never hands out model answers prematurely.
 */
export function generateWorkshopReplyLocal(input: WorkshopTurnInput): {
  reply: string;
  stageCompleteHint: boolean;
} {
  const scenario = getWorkshopScenario(input.scenarioId);
  const role = getWorkshopRole(input.roleId);
  if (!scenario) {
    return {
      reply: "Could you clarify your main recommendation and the timeline you are proposing?",
      stageCompleteHint: false,
    };
  }

  const learnerTurns = input.turns.filter((t) => t.speaker === "learner");
  const turnCount = learnerTurns.length;
  const lastText = learnerTurns[turnCount - 1]?.text ?? "";
  const words = extractWords(lastText);

  const hasNumberOrDate =
    /\b(\d+|%|percent|week|month|quarter|friday|monday|tuesday|wednesday|thursday|day|hour)\b/i.test(
      lastText,
    );
  const hasConditionalOrTradeoff =
    /\b(if|provided|however|instead|compromise|phase|pilot|option|balance|split)\b/i.test(lastText);
  const isTooShort = words.length < 10;

  // Level-adapted opener reaction referencing what the learner actually gave
  let reaction = "";
  if (isTooShort) {
    reaction =
      input.level === "A2" || input.level === "B1"
        ? "That's a very short answer—could you explain your plan in a little more detail?"
        : "I need more substance than that before I can sign off. Walk me through the concrete logic behind your position.";
  } else if (
    !hasNumberOrDate &&
    (input.level === "B2" || input.level === "C1" || input.level === "C2")
  ) {
    reaction =
      "I hear the direction you're suggesting, though you haven't tied it to a concrete timeline or figure yet.";
  } else if (hasConditionalOrTradeoff) {
    reaction =
      input.level === "A2"
        ? "Thank you, that sounds like a fair idea."
        : "That's a constructive proposal—let's pressure-test how it holds up under real constraints.";
  } else {
    reaction =
      input.level === "C1" || input.level === "C2"
        ? `Speaking as ${role.label.en}, I appreciate the directness, yet several stakeholders will push back hard on that point.`
        : "Understood—let me push on one practical detail here.";
  }

  // Pick the scenario's next realistic complication
  const complicationIndex = Math.min(turnCount - 1, scenario.complications.length - 1);
  const complication =
    turnCount <= scenario.complications.length
      ? scenario.complications[Math.max(0, complicationIndex)]!
      : "Let's close this discussion cleanly: give me your crisp final commitment—who owns the next step, what is the exact deadline, and how will we measure success?";

  // Simplify phrasing slightly for A2
  const adaptedComplication =
    input.level === "A2"
      ? complication.replace(
          /discretionary spend|attribution data|elasticity risk/gi,
          "budget and results",
        )
      : complication;

  const stageCompleteHint = turnCount >= 4;
  return {
    reply: `${reaction} ${adaptedComplication}`,
    stageCompleteHint,
  };
}

interface GrammarSlip {
  pattern: RegExp;
  original: string;
  improved: string;
  why: Bilingual;
}

const WORKPLACE_SLIPS: GrammarSlip[] = [
  {
    pattern: /\bi\s+am\s+agree\b/i,
    original: "I am agree",
    improved: "I agree / I'm aligned with that",
    why: {
      en: "'Agree' is a verb—never put 'am' before it.",
      ar: "كلمة agree فعل وليست صفة؛ نقول I agree أو I'm aligned.",
    },
  },
  {
    pattern: /\bdespite\s+of\b/i,
    original: "despite of",
    improved: "despite / in spite of",
    why: {
      en: "Never pair 'despite' with 'of'.",
      ar: "لا نضع of بعد despite أبدًا.",
    },
  },
  {
    pattern: /\baffect\s+on\b/i,
    original: "affect on",
    improved: "affect (verb) / have an impact on",
    why: {
      en: "'Affect' takes a direct object without 'on'.",
      ar: "الفعل affect متعدٍّ مباشر ولا يحتاج حرف الجر on.",
    },
  },
  {
    pattern: /\b(informations|advices|feedbacks|infrastructures)\b/i,
    original: "uncountable plural (-s)",
    improved: "information / advice / feedback / infrastructure (singular)",
    why: {
      en: "Business nouns like feedback, information, and infrastructure are uncountable.",
      ar: "هذه الأسماء المهنية غير معدودة ولا تُجمع بإضافة s.",
    },
  },
  {
    pattern: /\b(gonna|wanna|stuff|no way|whatever|calm down)\b/i,
    original: "Overly informal or blunt workplace phrasing",
    improved:
      "Use diplomatic business phrasing (e.g. 'intend to', 'factors', 'I understand your concern')",
    why: {
      en: "Maintain executive composure and professional register even under pressure.",
      ar: "حافظ على نبرة مهنية متزنة حتى تحت ضغط الاعتراضات.",
    },
  },
];

/**
 * Dual-axis 10-criterion deterministic workshop evaluator explicitly separating:
 * - Axis 1: Linguistic Performance (5 criteria)
 * - Axis 2: Professional Decision-Making & Communication Effectiveness (5 criteria)
 */
export function evaluateWorkshopLocal(input: WorkshopTurnInput): WorkshopEvaluationReport {
  const scenario = getWorkshopScenario(input.scenarioId);
  const learnerTurns = input.turns.filter((t) => t.speaker === "learner");
  const allLearnerText = learnerTurns.map((t) => t.text).join(" ");
  const words = extractWords(allLearnerText);
  const totalWords = words.length;
  const uniqueWords = new Set(words).size;
  const lexicalDiversity = totalWords > 0 ? uniqueWords / totalWords : 0;
  const avgWordsPerTurn = learnerTurns.length > 0 ? totalWords / learnerTurns.length : 0;
  const usedVoice = learnerTurns.some((t) => Boolean(t.usedVoice));

  // Detect linguistic slips from the learner's own turns
  const sentenceCorrections: WorkshopCorrection[] = [];
  for (const slip of WORKPLACE_SLIPS) {
    if (slip.pattern.test(allLearnerText)) {
      sentenceCorrections.push({
        original: slip.original,
        improved: slip.improved,
        why: slip.why,
      });
    }
  }

  // Target business vocabulary adoption
  const targetExprs = scenario?.targetExpressions ?? [];
  const targetHits = targetExprs.filter((expr) =>
    allLearnerText.toLowerCase().includes(expr.toLowerCase().split(" ")[0] ?? expr.toLowerCase()),
  ).length;

  // Business-decision signals (independent of pure English polish!)
  const hasNumbersMetrics =
    /\b(\d+|%|percent|budget|cost|margin|roi|sla|days?|weeks?|months?|quarter|q[1-4])\b/i.test(
      allLearnerText,
    );
  const hasActionOwnership =
    /\b(will|plan|assign|owner|deadline|friday|monday|schedule|deliver|phased|pilot|contingency|follow up)\b/i.test(
      allLearnerText,
    );
  const hasDiplomaticComposure =
    /\b(understand|appreciate|apologise|apologize|fair|however|compromise|if we|could we|propose|recommend|balance)\b/i.test(
      allLearnerText,
    );
  const hasArgumentConnectors =
    /\b(because|therefore|however|first|second|consequently|given|since|while|although)\b/i.test(
      allLearnerText,
    );

  // Level-calibrated expectations
  const expectedWordsPerTurn =
    input.level === "A2" ? 14 : input.level === "B1" ? 20 : input.level === "B2" ? 28 : 34;
  const depthRatio = Math.min(1, avgWordsPerTurn / expectedWordsPerTurn);
  const slipCount = sentenceCorrections.length;

  // AXIS 1: Linguistic Performance (5 criteria)
  const vocabularyRange = clamp(
    50 + lexicalDiversity * 32 + targetHits * 6 + depthRatio * 10 - slipCount * 5,
  );
  const grammaticalAccuracy = clamp(72 + depthRatio * 18 - slipCount * 14);
  const fluencyCoherence = clamp(
    54 + depthRatio * 26 + (hasArgumentConnectors ? 12 : 0) - slipCount * 4,
  );
  const pronunciationDelivery = clamp(
    usedVoice ? 76 + depthRatio * 14 : 70 + depthRatio * 15 - slipCount * 5,
  );
  const toneAppropriateness = clamp(
    62 + (hasDiplomaticComposure ? 22 : 0) + depthRatio * 8 - slipCount * 10,
  );
  const linguisticScore = Math.round(
    (vocabularyRange +
      grammaticalAccuracy +
      fluencyCoherence +
      pronunciationDelivery +
      toneAppropriateness) /
      5,
  );

  // AXIS 2: Professional Decision-Making & Communication Effectiveness (5 criteria)
  const spontaneousResponse = clamp(55 + Math.min(learnerTurns.length, 5) * 6 + depthRatio * 14);
  const argumentDevelopment = clamp(
    48 + (hasNumbersMetrics ? 20 : 0) + (hasArgumentConnectors ? 14 : 0) + depthRatio * 12,
  );
  const communicationEffectiveness = clamp(
    54 + (hasActionOwnership ? 18 : 0) + depthRatio * 18 - (avgWordsPerTurn < 8 ? 14 : 0),
  );
  const objectiveAchievement = clamp(
    46 +
      (hasNumbersMetrics ? 14 : 0) +
      (hasActionOwnership ? 16 : 0) +
      (hasDiplomaticComposure ? 12 : 0) +
      Math.min(learnerTurns.length, 4) * 3,
  );
  const stakeholderComposure = clamp(
    58 + (hasDiplomaticComposure ? 24 : 0) + (hasActionOwnership ? 10 : 0) - slipCount * 4,
  );
  const businessDecisionScore = Math.round(
    (spontaneousResponse +
      argumentDevelopment +
      communicationEffectiveness +
      objectiveAchievement +
      stakeholderComposure) /
      5,
  );

  const overallScore = Math.round(linguisticScore * 0.5 + businessDecisionScore * 0.5);

  const objectivesMet = (scenario?.objectives ?? []).map((obj, idx) => ({
    objective: obj,
    status:
      (idx === 0 && totalWords >= 25) ||
      (idx === 1 && (hasDiplomaticComposure || hasNumbersMetrics)) ||
      (idx === 2 && hasActionOwnership)
        ? ("achieved" as const)
        : ("partial" as const),
  }));

  const recurringWeaknesses: Bilingual[] = [];
  if (!hasNumbersMetrics) {
    recurringWeaknesses.push({
      en: "Anchor business recommendations with specific figures, percentages, or deadlines.",
      ar: "ادعم توصياتك المهنية بأرقام ونسب ومواعيد نهائية دقيقة.",
    });
  }
  if (!hasDiplomaticComposure) {
    recurringWeaknesses.push({
      en: "Use diplomatic framing ('I appreciate the concern; however...') before pushing back.",
      ar: "استخدم صياغات دبلوماسية (I appreciate the concern; however...) قبل عرض الاعتراض.",
    });
  }
  if (slipCount > 0) {
    recurringWeaknesses.push({
      en: "Eliminate recurring workplace grammar and register slips highlighted in the corrections.",
      ar: "تجنّب الأخطاء القواعدية أو الأسلوبية المتكررة الموضّحة في جدول التصحيحات.",
    });
  }
  if (recurringWeaknesses.length === 0) {
    recurringWeaknesses.push({
      en: "Challenge yourself at the next CEFR difficulty level to sharpen executive conciseness under pressure.",
      ar: "انتقل لمستوى CEFR الأعلى لصقل الإيجاز التنفيذي تحت الضغط.",
    });
  }

  const upgradedExpressions: { basic: string; executive: string }[] = [
    {
      basic: "I think we should wait and test it first.",
      executive: "I'd recommend a phased rollout so we can de-risk delivery before scaling.",
    },
    {
      basic: "Sorry for the delay, we will fix it soon.",
      executive:
        "I apologise for the disruption—I've escalated this directly and will confirm our updated ETA by 3 p.m.",
    },
    {
      basic: "We can give you a small discount if you sign longer.",
      executive:
        "Conditional upon a 24-month commitment, we can structure an 8% volume rebate alongside complimentary onboarding.",
    },
  ];

  const axisGapNoteEn =
    linguisticScore > businessDecisionScore + 6
      ? "Your English fluency outpaced your commercial specificity—focus next on quantifying numbers, owners, and concrete trade-offs."
      : businessDecisionScore > linguisticScore + 6
        ? "Your business instincts and decisions were strong—upgrading collocations and grammatical precision will elevate your executive presence."
        : "Your linguistic control and business decision-making were well balanced across the simulation.";

  const axisGapNoteAr =
    linguisticScore > businessDecisionScore + 6
      ? "طلاقتك اللغوية تفوّقت على دقة القرار التجاري—ركّز تاليًا على الأرقام والمسؤولين والمقايضات العملية."
      : businessDecisionScore > linguisticScore + 6
        ? "قراراتك وحسك المهني قويان—صقل التلازمات والدقة النحوية سيرفع حضورك التنفيذي بدرجة ملحوظة."
        : "أظهرت توازنًا ممتازًا بين الدقة اللغوية وجودة اتخاذ القرار المهني خلال المحاكاة.";

  return {
    overallScore,
    linguisticScore,
    businessDecisionScore,
    criteria: {
      vocabularyRange,
      grammaticalAccuracy,
      fluencyCoherence,
      pronunciationDelivery,
      toneAppropriateness,
      spontaneousResponse,
      argumentDevelopment,
      communicationEffectiveness,
      objectiveAchievement,
      stakeholderComposure,
    },
    usedVoice,
    summary: {
      en: `Completed ${learnerTurns.length} workshop turns at ${input.level} level (Linguistic: ${linguisticScore}%, Business Decisions: ${businessDecisionScore}%). ${axisGapNoteEn}`,
      ar: `أتممت ${learnerTurns.length} أدوار في الورشة بمستوى ${input.level} (الأداء اللغوي: ${linguisticScore}%، القرارات المهنية: ${businessDecisionScore}%). ${axisGapNoteAr}`,
    },
    sentenceCorrections,
    upgradedExpressions,
    recurringWeaknesses,
    objectivesMet,
    recommendedWorkshopIds: scenario
      ? [...scenario.recommendedFollowUps]
      : ["ws-corporate-meeting"],
  };
}
