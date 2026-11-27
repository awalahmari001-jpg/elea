import type { CefrLevel } from "@/content/courses";
import type { Bilingual } from "@/content/lesson-types";

export interface SpeakingThroughWritingContext {
  id: string;
  label: Bilingual;
  emoji: string;
  sampleRoughDraft: string;
  goalHint: Bilingual;
}

export interface StwCorrection {
  original: string;
  corrected: string;
  category: "grammar" | "phrasing" | "politeness" | "word-choice";
  why: Bilingual;
}

export interface StwReconstructionStep {
  stepNumber: number;
  title: Bilingual;
  sentence: string;
  note: Bilingual;
}

export interface SpeakingThroughWritingInput {
  draft: string;
  targetLevel: CefrLevel;
  contextId: string;
  customContext?: string;
}

export interface SpeakingThroughWritingResult {
  detectedLevel: CefrLevel;
  targetLevel: CefrLevel;
  encouragement: Bilingual;
  confidenceScore: number;
  corrections: StwCorrection[];
  reconstructionSteps: StwReconstructionStep[];
  elevatedSpoken: string;
  casualVariation: string;
  politeTargetVariation: string;
  pronunciationFocus: string[];
  spokenDeliveryTip: Bilingual;
  source: "ai" | "adaptive-coach";
}

export const STW_CONTEXTS: SpeakingThroughWritingContext[] = [
  {
    id: "airport",
    label: { en: "Airport & Travel", ar: "المطار والسفر" },
    emoji: "✈️",
    sampleRoughDraft: "I want change my seat to window because I am not like middle seat.",
    goalHint: {
      en: "Sound polite, clear, and calm when talking to airline or airport staff.",
      ar: "تحدّث بلباقة ووضوح وهدوء مع موظفي المطار وشركات الطيران.",
    },
  },
  {
    id: "workplace",
    label: { en: "Workplace & Meetings", ar: "بيئة العمل والاجتماعات" },
    emoji: "💼",
    sampleRoughDraft: "I am agree with your plan but I think we need more time for finish report.",
    goalHint: {
      en: "Share ideas, deadlines, and polite disagreements naturally with colleagues.",
      ar: "عبّر عن أفكارك والمواعيد النهائية واختلاف الرأي بلباقة مع زملاء العمل.",
    },
  },
  {
    id: "cafe-dining",
    label: { en: "Café & Restaurant", ar: "المقهى والمطعم" },
    emoji: "☕",
    sampleRoughDraft: "Give me one hot coffee with less sugar and can I sit near window?",
    goalHint: {
      en: "Order naturally and politely instead of sounding abrupt.",
      ar: "اطلب بطبيعية ولطف بدل الصيغ المباشرة الجافة.",
    },
  },
  {
    id: "doctor-clinic",
    label: { en: "Doctor & Clinic", ar: "العيادة والطبيب" },
    emoji: "🩺",
    sampleRoughDraft: "Since three days my head is hurt very much and I cannot sleep good.",
    goalHint: {
      en: "Describe symptoms, duration, and questions clearly to a doctor.",
      ar: "صِف الأعراض ومدتها وأسئلتك بوضوح للطبيب.",
    },
  },
  {
    id: "hotel",
    label: { en: "Hotel & Booking", ar: "الفندق والحجوزات" },
    emoji: "🏨",
    sampleRoughDraft: "My room air condition is not work and the street is very noisy.",
    goalHint: {
      en: "Report an issue politely and ask for a smooth solution.",
      ar: "أبلغ عن مشكلة بلباقة واطلب حلاً عمليًا وسريعًا.",
    },
  },
  {
    id: "interview",
    label: { en: "Job Interview", ar: "مقابلة عمل" },
    emoji: "🎯",
    sampleRoughDraft:
      "I have five years experiences in sales and I am good in solve customer problems.",
    goalHint: {
      en: "Present your strengths and achievements with crisp spoken confidence.",
      ar: "اعرض نقاط قوتك وإنجازاتك بثقة وطلاقة مهنية.",
    },
  },
  {
    id: "university",
    label: { en: "University & Study", ar: "الجامعة والدراسة" },
    emoji: "🎓",
    sampleRoughDraft: "Professor, I did not understood the homework, can you explain again?",
    goalHint: {
      en: "Ask professors and classmates thoughtful questions respectfully.",
      ar: "اطرح أسئلتك على الأساتذة والزملاء بأسلوب أكاديمي مهذّب.",
    },
  },
  {
    id: "shopping",
    label: { en: "Shopping & Returns", ar: "التسوّق والاستبدال" },
    emoji: "🛍️",
    sampleRoughDraft: "Yesterday I buy this jacket here but size is small, I want refund.",
    goalHint: {
      en: "Ask about sizes, exchanges, and refunds smoothly.",
      ar: "استفسر عن المقاسات والاستبدال واسترداد المبلغ بسلاسة.",
    },
  },
  {
    id: "social",
    label: { en: "Everyday Friends & Social", ar: "المحادثة الاجتماعية والأصدقاء" },
    emoji: "💬",
    sampleRoughDraft: "Sorry I am late, traffic was very big today and I miss the bus.",
    goalHint: {
      en: "Chat warmly with friends, apologize naturally, and share daily stories.",
      ar: "تحدّث بدفء وطبيعية مع الأصدقاء وشارك مواقفك اليومية.",
    },
  },
  {
    id: "ielts-speaking",
    label: { en: "IELTS Speaking Opinion", ar: "إبداء الرأي في محادثة الآيلتس" },
    emoji: "🏅",
    sampleRoughDraft: "In my opinion, technology make our life more easy but people talk less.",
    goalHint: {
      en: "Express nuanced opinions with natural linking words and Band 7+ precision.",
      ar: "عبّر عن رأيك بتوازن باستخدام روابط طبيعية ومفردات دقيقة.",
    },
  },
];

export const CEFR_SPOKEN_PROFILES: Record<CefrLevel, { badge: Bilingual; description: Bilingual }> =
  {
    A1: {
      badge: { en: "A1 · Clear & Simple", ar: "A1 · واضح وبسيط" },
      description: {
        en: "Short, accurate everyday sentences using basic polite words (please, thank you).",
        ar: "جُمل يومية قصيرة وصحيحة باستخدام عبارات اللباقة الأساسية.",
      },
    },
    A2: {
      badge: { en: "A2 · Polite & Everyday", ar: "A2 · مهذّب ويومي" },
      description: {
        en: "Smooth everyday requests with clear reasons (because, so, could I).",
        ar: "طلبات يومية سلسة مع ذكر السبب بوضوح باستخدام could I وbecause.",
      },
    },
    B1: {
      badge: { en: "B1 · Natural & Connected", ar: "B1 · طبيعي ومترابط" },
      description: {
        en: "Connected spoken thoughts with natural softeners (I'd appreciate, actually, would it be possible).",
        ar: "أفكار مترابطة بصيغ لباقة طبيعية وروابط حديث سلسة.",
      },
    },
    B2: {
      badge: { en: "B2 · Confident & Idiomatic", ar: "B2 · واثق واصطلاحي" },
      description: {
        en: "Fluent, diplomatic phrasing with strong collocations and natural spoken rhythm.",
        ar: "صياغة طليقة ودبلوماسية بتلازمات لغوية قوية وإيقاع حديث طبيعي.",
      },
    },
    C1: {
      badge: { en: "C1 · Nuanced & Persuasive", ar: "C1 · دقيق ومُقنع" },
      description: {
        en: "Precision vocabulary, subtle hedging, and effortless spoken structure.",
        ar: "مفردات دقيقة وتخفيف دبلوماسي ذكي وبنية حديث احترافية.",
      },
    },
    C2: {
      badge: { en: "C2 · Effortless Mastery", ar: "C2 · إتقان سلس" },
      description: {
        en: "Native-like elegance, idiomatic precision, and graceful conversational nuance.",
        ar: "أناقة لغوية بمستوى المتحدث الأصلي ودقة تعبيرية عالية.",
      },
    },
  };

interface FixRule {
  pattern: RegExp;
  replacement: string;
  category: StwCorrection["category"];
  why: Bilingual;
}

const GRAMMAR_FIX_RULES: FixRule[] = [
  {
    pattern: /\bi am agree\b/gi,
    replacement: "I agree",
    category: "grammar",
    why: {
      en: '"Agree" is already a main verb in English—say "I agree", never "I am agree".',
      ar: 'الفعل agree فعل أساسي في الإنجليزية، لذا نقول "I agree" ولا نضع am قبله.',
    },
  },
  {
    pattern: /\bi am not like\b/gi,
    replacement: "I don't like",
    category: "grammar",
    why: {
      en: 'Use "don\'t" (not "am not") to negate regular verbs like "like" in the present simple.',
      ar: "ننفي الأفعال الأساسية في المضارع البسيط باستخدام don't وليس am not.",
    },
  },
  {
    pattern: /\bdid not understood\b|\bdidn't understood\b/gi,
    replacement: "didn't understand",
    category: "grammar",
    why: {
      en: 'After "did / didn\'t", always use the base verb ("understand", not "understood").',
      ar: "بعد did أو didn't نستخدم دائمًا الفعل في المصدر (understand) دون تصريف للماضي.",
    },
  },
  {
    pattern: /\bi want change\b/gi,
    replacement: "I would like to change",
    category: "politeness",
    why: {
      en: 'Add "to" between two verbs ("want to change") and soften "I want" to "I would like to" in polite speech.',
      ar: 'نضع to بين فعلين، ونستبدل "I want" بـ "I would like to" لتكون العبارة أكثر لباقة.',
    },
  },
  {
    pattern: /\bfor finish\b/gi,
    replacement: "to finish",
    category: "grammar",
    why: {
      en: 'Use "to + base verb" ("to finish") rather than "for + verb" to express purpose.',
      ar: "للتعبير عن الغرض نستخدم to + الفعل في المصدر (to finish) وليس for.",
    },
  },
  {
    pattern: /\bgive me\b/gi,
    replacement: "Could I please have",
    category: "politeness",
    why: {
      en: 'In spoken English, "Give me" sounds abrupt; "Could I please have..." sounds warm and natural.',
      ar: 'عبارة Give me تبدو جافة في الحديث؛ بينما "Could I please have" أكثر لطفًا وطبيعية.',
    },
  },
  {
    pattern: /\bmore easy\b/gi,
    replacement: "much easier",
    category: "grammar",
    why: {
      en: '"Easy" is a short adjective whose comparative is "easier" (not "more easy").',
      ar: "الصفة القصيرة easy تُصاغ للمقارنة بإضافة -ier فتصبح easier وليس more easy.",
    },
  },
  {
    pattern: /\bmore better\b/gi,
    replacement: "much better",
    category: "grammar",
    why: {
      en: '"Better" is already comparative—pair it with "much", never "more".',
      ar: "كلمة better هي بالفعل صيغة مقارنة، لذا نقول much better وليس more better.",
    },
  },
  {
    pattern: /\bsince (\w+) days\b/gi,
    replacement: "for $1 days",
    category: "grammar",
    why: {
      en: 'Use "for" with a duration ("for three days"), and "since" only with a starting point ("since Monday").',
      ar: "نستخدم for مع المدة الزمنية (for three days)، بينما نستخدم since مع نقطة البداية فقط.",
    },
  },
  {
    pattern: /\bis hurt\b/gi,
    replacement: "has been hurting",
    category: "grammar",
    why: {
      en: 'Use "has been hurting" (or "aches") for ongoing pain that started in the past and continues now.',
      ar: "للألم المستمر منذ فترة وحتى الآن نستخدم has been hurting أو aches.",
    },
  },
  {
    pattern: /\bsleep good\b/gi,
    replacement: "sleep well",
    category: "word-choice",
    why: {
      en: '"Good" is an adjective; use the adverb "well" to describe how you sleep.',
      ar: "كلمة good صفة، أما لوصف الفعل (النوم) فنستخدم الظرف well.",
    },
  },
  {
    pattern: /\bair condition is not work\b/gi,
    replacement: "air conditioning isn't working",
    category: "grammar",
    why: {
      en: 'Say "air conditioning" (the system) and use present continuous ("isn\'t working") for a current malfunction.',
      ar: "نقول air conditioning للنظام ونستخدم المضارع المستمر isn't working للعطل الحالي.",
    },
  },
  {
    pattern: /\byears experiences\b/gi,
    replacement: "years of experience",
    category: "grammar",
    why: {
      en: 'Work "experience" is uncountable in English—say "five years of experience".',
      ar: "كلمة experience بمعنى الخبرة المهنية غير معدودة، لذا نقول years of experience.",
    },
  },
  {
    pattern: /\bgood in solve\b/gi,
    replacement: "good at solving",
    category: "grammar",
    why: {
      en: 'Use "good at + -ing" ("good at solving"), never "good in + base verb".',
      ar: "التركيب الصحيح هو good at + الفعل مضافًا إليه ing (good at solving).",
    },
  },
  {
    pattern: /\byesterday i buy\b/gi,
    replacement: "Yesterday I bought",
    category: "grammar",
    why: {
      en: 'Past time markers like "yesterday" require the past simple verb ("bought").',
      ar: "الظروف الماضية مثل yesterday تتطلب الفعل في الماضي البسيط (bought).",
    },
  },
  {
    pattern: /\btraffic was very big\b/gi,
    replacement: "traffic was really heavy",
    category: "word-choice",
    why: {
      en: 'In natural English, traffic collocates with "heavy" (not "big").',
      ar: "في الإنجليزية الطبيعية نصف الازدحام المروري بـ heavy traffic وليس big traffic.",
    },
  },
  {
    pattern: /\bi miss the bus\b/gi,
    replacement: "I missed the bus",
    category: "grammar",
    why: {
      en: 'Use past simple ("missed") for a completed event that already happened earlier today.',
      ar: "نستخدم الماضي البسيط missed لحدث انتهى بالفعل قبل لحظة الكلام.",
    },
  },
  {
    pattern: /\btechnology make\b/gi,
    replacement: "technology makes",
    category: "grammar",
    why: {
      en: 'Singular subjects like "technology" take an -s on present simple verbs ("makes").',
      ar: "الفاعل المفرد technology يحتاج إضافة s للفعل في المضارع البسيط (makes).",
    },
  },
  {
    pattern: /\bvery much\b/gi,
    replacement: "a great deal",
    category: "phrasing",
    why: {
      en: 'Replacing repetitive "very much" with "a lot / severely / a great deal" sounds much more natural.',
      ar: "استبدال very much بتعبير أدق حسب السياق يجعل حديثك أكثر سلاسة وطبيعية.",
    },
  },
  {
    pattern: /\bi want refund\b/gi,
    replacement: "I'd like to ask for a refund",
    category: "politeness",
    why: {
      en: 'Add the article "a" before "refund" and soften "I want" into "I\'d like to ask for".',
      ar: "نضع أداة النكرة a قبل refund ونلطف الطلب باستخدام I'd like to ask for.",
    },
  },
];

function cleanSentence(raw: string): string {
  const trimmed = raw.trim().replace(/\s+/g, " ");
  if (!trimmed) return "";
  const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  return /[.?!]$/.test(capitalized) ? capitalized : `${capitalized}.`;
}

function estimateDraftLevel(draft: string, correctionCount: number): CefrLevel {
  const words = draft.trim().split(/\s+/).filter(Boolean);
  const avgLen = words.length
    ? words.reduce((s, w) => s + w.replace(/[^a-z]/gi, "").length, 0) / words.length
    : 3;
  const hasConnectors =
    /\b(although|however|whereas|because|furthermore|nevertheless|despite|would you mind|appreciate)\b/i.test(
      draft,
    );

  if (correctionCount >= 3 || words.length <= 6) return "A1";
  if (correctionCount >= 2 || words.length <= 10) return "A2";
  if (correctionCount === 1 || !hasConnectors) return "B1";
  if (avgLen >= 5.2 && words.length >= 16) return "C1";
  return "B2";
}

function applyCefrElevation(
  baseClean: string,
  targetLevel: CefrLevel,
  contextId: string,
): {
  step2Polite: string;
  step3Elevated: string;
  casualVariation: string;
  politeTargetVariation: string;
} {
  const coreNoPunct = baseClean.replace(/[.?!]+$/, "");
  const isQuestion =
    /\?$/.test(baseClean) || /^(can|could|would|do|does|is|are|where|when|how)\b/i.test(baseClean);
  const lowerStart = coreNoPunct.charAt(0).toLowerCase() + coreNoPunct.slice(1);

  const step2Polite = isQuestion
    ? `Excuse me, ${lowerStart}?`
    : /\b(please|sorry|thank|could i|would you|i'd like|i would like)\b/i.test(baseClean)
      ? baseClean
      : `Actually, ${lowerStart}, if that's alright.`;

  const contextFrame: Record<string, { b2: string; c1: string; c2: string }> = {
    airport: {
      b2: `Excuse me—would it be possible to help me with this? ${baseClean} I'd really appreciate it.`,
      c1: `Excuse me, I was wondering if you might be able to assist me: ${lowerStart}, if there happens to be any availability.`,
      c2: `Excuse me—if it's not too much trouble, I'd be enormously grateful if we could sort this out: ${lowerStart}.`,
    },
    workplace: {
      b2: `Just to share my perspective—${lowerStart}, so we can make sure the outcome is solid.`,
      c1: `I appreciate where we're heading; that said, ${lowerStart}, which would put us in a much stronger position to deliver.`,
      c2: `While I'm fully behind the overall direction, ${lowerStart}—and addressing that upfront will safeguard our quality.`,
    },
    interview: {
      b2: `To give you a clear picture of my background, ${lowerStart}, and I genuinely enjoy turning challenges into results.`,
      c1: `Drawing on my hands-on track record, ${lowerStart}—a strength that has consistently helped my teams exceed expectations.`,
      c2: `What truly distinguishes my approach is that ${lowerStart}, enabling me to deliver measurable impact even under tight pressure.`,
    },
    "ielts-speaking": {
      b2: `From my perspective, ${lowerStart}; however, finding a healthy balance is equally important.`,
      c1: `While it's undeniable that ${lowerStart}, we also need to weigh the longer-term social implications carefully.`,
      c2: `Compelling as the advantages may seem, ${lowerStart}—which underscores why thoughtful moderation remains essential.`,
    },
  };

  const customFrames = contextFrame[contextId];

  let step3Elevated = step2Polite;
  if (targetLevel === "A1") {
    step3Elevated = baseClean;
  } else if (targetLevel === "A2") {
    step3Elevated = isQuestion
      ? `Excuse me, ${lowerStart}, please?`
      : `${baseClean} Thank you so much!`;
  } else if (targetLevel === "B1") {
    step3Elevated = isQuestion
      ? `Excuse me, could you help me—${lowerStart}?`
      : `Honestly, ${lowerStart}, and I'd really appreciate your help with that.`;
  } else if (targetLevel === "B2") {
    step3Elevated =
      customFrames?.b2 ??
      `I'd really appreciate it if we could look at this: ${lowerStart}, so everything works out smoothly.`;
  } else if (targetLevel === "C1") {
    step3Elevated =
      customFrames?.c1 ??
      `I was wondering whether it might be possible to address this—${lowerStart}, which would make a noticeable difference.`;
  } else {
    step3Elevated =
      customFrames?.c2 ??
      `If I may put it candidly, ${lowerStart}—and handling it thoughtfully will ensure the best possible outcome.`;
  }

  const casualVariation = isQuestion
    ? `Hey, quick question—${lowerStart}?`
    : `Just so you know, ${lowerStart}!`;

  const politeTargetVariation = step3Elevated;

  return {
    step2Polite,
    step3Elevated,
    casualVariation,
    politeTargetVariation,
  };
}

/**
 * Deterministic, pedagogically rich fallback for "Speaking Through Writing"
 * when an external AI gateway key is absent (offline / local tests).
 */
export function evaluateSpeakingThroughWritingLocal(
  input: SpeakingThroughWritingInput,
): SpeakingThroughWritingResult {
  const raw = input.draft.trim();
  let working = raw;
  const corrections: StwCorrection[] = [];

  for (const rule of GRAMMAR_FIX_RULES) {
    const match = working.match(rule.pattern);
    if (match && match[0]) {
      const before = match[0];
      const nextWorking = working.replace(rule.pattern, rule.replacement);
      if (nextWorking !== working) {
        const replaced = before.replace(rule.pattern, rule.replacement);
        corrections.push({
          original: before,
          corrected: replaced,
          category: rule.category,
          why: rule.why,
        });
        working = nextWorking;
      }
    }
  }

  // Ensure proper capitalization & end punctuation
  const step1Clean = cleanSentence(working);
  if (corrections.length === 0 && raw !== step1Clean) {
    corrections.push({
      original: raw,
      corrected: step1Clean,
      category: "phrasing",
      why: {
        en: "Start with a clear capital letter and finish cleanly so your intonation rises or falls naturally when spoken.",
        ar: "ابدأ بحرف كبير واختم الجملة بعلامة ترقيم واضحة لضبط نبرة الصوت عند النطق.",
      },
    });
  }

  const detectedLevel = estimateDraftLevel(raw, corrections.length);
  const { step2Polite, step3Elevated, casualVariation, politeTargetVariation } = applyCefrElevation(
    step1Clean,
    input.targetLevel,
    input.contextId,
  );

  const reconstructionSteps: StwReconstructionStep[] = [
    {
      stepNumber: 1,
      title: { en: "Fix Core Grammar & Clarity", ar: "تصحيح القواعد والوضوح الأساسي" },
      sentence: step1Clean,
      note:
        corrections.length > 0
          ? {
              en: `Cleaned up ${corrections.length} grammar/phrasing detail${corrections.length > 1 ? "s" : ""} so your core meaning is 100% accurate.`,
              ar: `تم تصحيح ${corrections.length} ملاحظة نحوية أو تعبيرية ليصل معناك الأساسي بدقة تامة.`,
            }
          : {
              en: "Your core grammar is already clean and clear—great foundation!",
              ar: "قواعد جملتك الأساسية سليمة وواضحة بالفعل — أساس رائع!",
            },
    },
    {
      stepNumber: 2,
      title: {
        en: "Add Natural Spoken Politeness & Flow",
        ar: "إضافة اللباقة والانسيابية في الحديث",
      },
      sentence: step2Polite,
      note: {
        en: "Real spoken English uses gentle openers ('Excuse me', 'Actually') so listeners immediately feel welcome.",
        ar: "الإنجليزية المنطوقة تستخدم افتتاحيات لطيفة مثل Excuse me وActually لجعل المستمع أكثر تقبلًا.",
      },
    },
    {
      stepNumber: 3,
      title: {
        en: `Elevate to CEFR ${input.targetLevel} Spoken Expression`,
        ar: `الارتقاء بالجملة إلى مستوى CEFR ${input.targetLevel}`,
      },
      sentence: step3Elevated,
      note: {
        en: `Rebuilt with ${input.targetLevel}-level rhythm, vocabulary, and confidence ready to speak aloud.`,
        ar: `أُعيدت صياغتها بإيقاع ومفردات وثقة تناسب مستوى ${input.targetLevel} وجاهزة للنطق المباشر.`,
      },
    },
  ];

  // Pick 3-4 strong content words for spoken stress practice
  const pronunciationFocus = Array.from(
    new Set(
      step3Elevated
        .replace(/[^a-zA-Z'\s-]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length >= 5),
    ),
  ).slice(0, 4);

  const confidenceScore = Math.min(96, Math.max(58, 86 - corrections.length * 6));

  return {
    detectedLevel,
    targetLevel: input.targetLevel,
    encouragement: {
      en: `Awesome effort! Writing your thought first is the smartest way to build speaking confidence—look how naturally your idea shines at CEFR ${input.targetLevel}!`,
      ar: `محاولة رائعة! كتابة ما تريد قوله أولًا هي أذكى طريقة لبناء ثقتك قبل التحدّث — انظر كيف أصبحت فكرتك سلسة وطبيعية بمستوى ${input.targetLevel}!`,
    },
    confidenceScore,
    corrections,
    reconstructionSteps,
    elevatedSpoken: step3Elevated,
    casualVariation,
    politeTargetVariation,
    pronunciationFocus,
    spokenDeliveryTip: {
      en: "Pause briefly after the opening phrase, stress the highlighted key words slightly, and smile as you speak—it instantly softens your tone.",
      ar: "توقّف لثانية خفيفة بعد العبارة الافتتاحية، وأبرز الكلمات المفتاحية قليلًا بنبرة دافئة لتبدو طليقًا وواثقًا.",
    },
    source: "adaptive-coach",
  };
}
