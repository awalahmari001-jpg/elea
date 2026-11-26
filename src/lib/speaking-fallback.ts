import type { Bilingual } from "@/content/lesson-types";
import { SPEAKING_SITUATIONS, type SpeakingSituation } from "@/content/speaking-situations";

export interface SpeakingTurnRecord {
  speaker: "partner" | "learner";
  text: string;
}

export interface LiveSpeakingTurnInput {
  situationId: string;
  turns: SpeakingTurnRecord[];
}

export interface LiveSpeakingTurnResult {
  partnerReply: string;
  praise: Bilingual;
  naturalUpgrade: string;
  upgradeTip: Bilingual;
  nextHint: Bilingual;
  suggestedStarters: string[];
  goalReached: boolean;
  source: "ai" | "adaptive-engine";
}

export interface LiveExaminerFollowUpInput {
  examTitle: string;
  partLabel: string;
  originalPrompt: string;
  learnerAnswer: string;
}

export interface LiveExaminerFollowUpResult {
  examinerFollowUp: string;
  quickFeedback: Bilingual;
  source: "ai" | "adaptive-engine";
}

const STOP_WORDS = new Set([
  "the",
  "and",
  "for",
  "that",
  "this",
  "with",
  "have",
  "from",
  "they",
  "will",
  "would",
  "could",
  "should",
  "about",
  "there",
  "their",
  "what",
  "when",
  "where",
  "which",
  "your",
  "just",
  "like",
  "want",
  "need",
  "please",
  "thank",
  "thanks",
  "hello",
  "good",
  "morning",
  "afternoon",
  "evening",
  "yes",
  "okay",
  "sure",
  "here",
  "very",
  "really",
  "some",
  "much",
  "many",
  "more",
  "also",
  "going",
  "been",
  "being",
  "into",
  "only",
]);

function extractKeyTerms(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9'\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !STOP_WORDS.has(w));
}

function findSituation(id: string): SpeakingSituation | undefined {
  return SPEAKING_SITUATIONS.find((s) => s.id === id);
}

/** Builds a natural, polite upgrade specifically tailored to the learner's own utterance. */
function buildTailoredUpgrade(
  utterance: string,
  situation: SpeakingSituation | undefined,
): { naturalUpgrade: string; upgradeTip: Bilingual; praise: Bilingual } {
  const clean = utterance.trim();
  const lower = clean.toLowerCase();
  const words = clean.split(/\s+/).filter(Boolean);
  const hasPolite =
    /\b(please|could i|would you|may i|i'd like|i would like|thank|appreciate|excuse me)\b/i.test(
      clean,
    );

  // Upgrade blunt "I want ..." or "Give me ..." directly using their words
  if (/^(i want|give me|i need)\b/i.test(clean)) {
    const rest = clean.replace(/^(i want|give me|i need)\s+/i, "").replace(/[.?!]+$/, "");
    return {
      naturalUpgrade: `Could I please have ${rest}?`,
      upgradeTip: {
        en: 'Soften "I want / Give me" with "Could I please have..." or "I\'d like..." to sound naturally polite.',
        ar: 'استبدل "I want / Give me" بصيغة مهذبة مثل "Could I please have..." لتبدو إنجليزيتك طبيعية ولطيفة.',
      },
      praise: {
        en: "Clear message! You communicated your request directly.",
        ar: "رسالة واضحة! أوصلت طلبك مباشرة.",
      },
    };
  }

  // Upgrade very short 1-3 word answers into full natural replies
  if (words.length <= 3) {
    const basePhrase = situation?.keyPhrases?.[0];
    const upgraded = basePhrase
      ? `${clean.replace(/[.?!]+$/, "")} — ${basePhrase}`
      : `Yes, ${clean.toLowerCase().replace(/[.?!]+$/, "")}, please. Could you help me with that?`;
    return {
      naturalUpgrade: upgraded,
      upgradeTip: {
        en: "Try expanding short answers into a full sentence with a polite follow-up detail.",
        ar: "حاول توسيع الإجابات القصيرة إلى جملة كاملة مع إضافة تفصيل مهذب لتعزيز الطلاقة.",
      },
      praise: {
        en: "Good quick reaction! Adding one extra detail will boost your fluency.",
        ar: "استجابة سريعة جيدة! إضافة تفصيل واحد سترفع طلاقتك أكثر.",
      },
    };
  }

  // Upgrade missing polite softener in requests/questions
  if (
    !hasPolite &&
    (lower.includes("?") || /\b(can you|where is|how much|change|help)\b/i.test(lower))
  ) {
    const softened = clean
      .replace(/^can you\b/i, "Could you possibly")
      .replace(/\?*$/, ", please?");
    return {
      naturalUpgrade: softened,
      upgradeTip: {
        en: 'Adding "Could you..." and "please" makes requests sound much smoother in real English.',
        ar: 'إضافة "Could you..." و"please" تجعل طلبك أكثر لباقة وطبيعية في الإنجليزية الواقعية.',
      },
      praise: {
        en: "Great sentence structure! A touch of politeness makes it sound native.",
        ar: "بناء جملة ممتاز! لمسة بسيطة من اللباقة ستجعله يبدو كمتحدث أصلي.",
      },
    };
  }

  // Already fluent — praise and offer a crisp native alternative
  const keyPhrase = situation?.keyPhrases?.[0];
  return {
    naturalUpgrade: keyPhrase
      ? `${clean.replace(/[.?!]+$/, "")}. Also, ${keyPhrase.charAt(0).toLowerCase()}${keyPhrase.slice(1)}`
      : clean,
    upgradeTip: {
      en: "Natural, polite phrasing! Keep linking your ideas smoothly with connectors like 'actually' or 'by the way'.",
      ar: "صياغة طبيعية ومهذبة جدًا! واصل ربط أفكارك بسلاسة باستخدام كلمات مثل actually وby the way.",
    },
    praise: {
      en: "Excellent live response—clear, natural, and on-topic!",
      ar: "رد حي ممتاز — واضح وطبيعي ومناسب تمامًا للموقف!",
    },
  };
}

/**
 * Truly reactive context-aware local conversation engine used when an external AI key
 * is unavailable (e.g., offline or automated tests). Always reacts directly to what the
 * learner actually said rather than returning rigid stored script turns.
 */
export function generateLiveSpeakingFallback(input: LiveSpeakingTurnInput): LiveSpeakingTurnResult {
  const situation = findSituation(input.situationId);
  const learnerTurns = input.turns.filter((t) => t.speaker === "learner");
  const lastLearner = learnerTurns.at(-1)?.text.trim() ?? "";
  const lower = lastLearner.toLowerCase();
  const turnCount = learnerTurns.length;
  const keywords = extractKeyTerms(lastLearner);
  const roleEn = situation?.role.en ?? "Conversation Partner";
  const category = situation?.category ?? "daily";

  const { naturalUpgrade, upgradeTip, praise } = buildTailoredUpgrade(lastLearner, situation);
  const goalReached = turnCount >= 4;

  // Detect learner's concrete details so the partner genuinely acknowledges them
  const isQuestion =
    lastLearner.includes("?") ||
    /^(can|could|may|do|does|is|are|where|when|what|how|which|would)\b/i.test(lastLearner);
  const mentionsWindow = /\bwindow\b/i.test(lower);
  const mentionsAisle = /\baisle\b/i.test(lower);
  const mentionsBag = /\b(bag|bags|luggage|suitcase|suitcases|carry-on|backpack)\b/i.test(lower);
  const mentionsPrice = /\b(cost|price|fee|charge|much|pay|card|cash|discount|refund|bill)\b/i.test(
    lower,
  );
  const mentionsTime =
    /\b(time|late|delay|delayed|early|tomorrow|today|hour|minute|schedule|gate|boarding)\b/i.test(
      lower,
    );
  const mentionsProblem =
    /\b(problem|issue|broken|wrong|missing|lost|cold|hot|noise|noisy|hurt|pain|fever|sick)\b/i.test(
      lower,
    );
  const mentionsThanksBye =
    /\b(thank you so much|thanks a lot|goodbye|bye|have a great|see you|that's all|nothing else)\b/i.test(
      lower,
    );
  const destinationMatch = lastLearner.match(/\bto\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/);
  const numberMatch = lastLearner.match(/\b(\d+|one|two|three|four|five)\b/i);

  let partnerReply = "";
  let nextHint: Bilingual;
  let suggestedStarters: string[];

  if (mentionsThanksBye && turnCount >= 2) {
    partnerReply = `You're very welcome! I'm glad we got everything sorted out for you. Please let me know if you need anything else—have a wonderful day!`;
    nextHint = {
      en: "Wrap up warmly with a polite closing, or ask one final practical question if you want to keep practising.",
      ar: "اختم المحادثة بلباقة، أو اطرح سؤالًا عمليًا أخيرًا إذا رغبت بمواصلة التدريب.",
    };
    suggestedStarters = [
      "Thank you again for all your help—have a great day!",
      "Actually, just one quick question before I go...",
      "Everything is clear now, I really appreciate it.",
    ];
    return {
      partnerReply,
      praise,
      naturalUpgrade,
      upgradeTip,
      nextHint,
      suggestedStarters,
      goalReached: true,
      source: "adaptive-engine",
    };
  }

  // Domain-aware reactive responses referencing the learner's exact details
  if (category === "travel" || situation?.id.includes("airport") || situation?.id === "checkin") {
    if (mentionsWindow || mentionsAisle) {
      const seatType = mentionsWindow ? "window" : "aisle";
      partnerReply = `Got it—I've reserved a ${seatType} seat for you${destinationMatch ? ` on your flight to ${destinationMatch[1]}` : ""}. ${
        mentionsBag
          ? `And I see you mentioned your ${numberMatch ? `${numberMatch[1]} ` : ""}luggage—please place any checked bag on the scale so I can tag it.`
          : "Will you be checking any bags today, or travelling with cabin luggage only?"
      }`;
      nextHint = {
        en: "Confirm your luggage details and ask about the boarding gate or boarding time.",
        ar: "أكّد تفاصيل حقائبك واسأل عن بوابة الصعود أو موعد الإقلاع.",
      };
      suggestedStarters = [
        "I have one suitcase to check in and this small backpack for the cabin.",
        "Just carry-on luggage today—which gate does boarding start from?",
        "Could you also tell me what time boarding begins?",
      ];
    } else if (mentionsBag) {
      const bagQty = numberMatch?.[1];
      const pluralSuffix = bagQty && bagQty !== "1" && bagQty.toLowerCase() !== "one" ? "s" : "";
      partnerReply = `No problem at all with your ${bagQty ? `${bagQty} ` : ""}bag${pluralSuffix}. Everything is within the weight allowance and tagged to your final destination. Would you prefer a window or an aisle seat, and do you have any questions about security or your gate?`;
      nextHint = {
        en: "State your seat preference clearly and ask any question about your boarding pass or gate.",
        ar: "حدّد مقعدك المفضل بوضوح واسأل أي سؤال حول بطاقة الصعود أو البوابة.",
      };
      suggestedStarters = [
        "I'd prefer a window seat near the front if one is available.",
        "An aisle seat would be great, please. How far is the gate from security?",
        "Could you confirm whether my bag is checked all the way through?",
      ];
    } else if (mentionsTime) {
      partnerReply = `Good question about the timing—${
        lower.includes("delay") || lower.includes("late")
          ? "the departure is currently showing a 25-minute delay, so you still have plenty of time and won't miss your connection."
          : "boarding begins 40 minutes before departure at Gate B14, which is about a ten-minute walk past security."
      } Is there anything else you'd like me to check on your booking?`;
      nextHint = {
        en: "React to the schedule update and ask for a helpful detail (lounge, meal, gate directions, or confirmation).",
        ar: "تفاعل مع تحديث الوقت واسأل عن تفصيل مفيد مثل اتجاه البوابة أو التذكرة أو المقعد.",
      };
      suggestedStarters = [
        "That's a relief—could you show me the quickest way to Gate B14?",
        "Thanks for checking. Will my connecting flight still be okay?",
        "Perfect, could I have my printed boarding pass as well?",
      ];
    } else if (destinationMatch) {
      partnerReply = `Wonderful—I've pulled up your itinerary to ${destinationMatch[1]}. Everything looks confirmed on my screen. Would you like to check in any luggage today, or do you have a seat preference I can arrange for you?`;
      nextHint = {
        en: "Tell the agent about your bags and whether you prefer a window or aisle seat.",
        ar: "أخبر الموظف بعدد حقائبك وما إذا كنت تفضل مقعدًا بجوار النافذة أم الممر.",
      };
      suggestedStarters = [
        "I'd like to check in one suitcase and request a window seat, please.",
        "I only have hand luggage today. Could I get an aisle seat?",
        "Yes, here is my passport—is the flight departing on time?",
      ];
    } else {
      const topicEcho = keywords.slice(0, 2).join(" and ");
      partnerReply = isQuestion
        ? `Great question${topicEcho ? ` about ${topicEcho}` : ""}! Yes, we can definitely arrange that for you right here at the counter. Could I quickly verify your passport or booking reference so I can update your details?`
        : `Thank you for letting me know${topicEcho ? ` about ${topicEcho}` : ""}. I've noted that on your travel record right away. What else would you like to confirm before heading to the gate?`;
      nextHint = {
        en: "Give one clear detail (passport/booking, seat, bag, or gate question) to keep the conversation moving naturally.",
        ar: "أضف تفصيلًا واضحًا (الجواز، المقعد، الحقيبة، أو البوابة) لمواصلة الحوار بطبيعية.",
      };
      suggestedStarters = [
        "Sure, here is my passport and booking confirmation.",
        "Could you also check if there's a window seat available?",
        "Which gate should I head to, and what time does boarding start?",
      ];
    }
  } else if (mentionsPrice) {
    partnerReply = `Sure—let me break down the exact cost for you. The standard rate is clearly listed with no hidden charges, and we accept both contactless card and cash${
      lower.includes("refund") || lower.includes("discount")
        ? ". Since you asked, I can also apply our standard flexible policy right away"
        : ""
    }. Would you like to go ahead with that option, or compare another choice?`;
    nextHint = {
      en: "Decide whether to accept, ask for a receipt/breakdown, or negotiate politely.",
      ar: "قرّر ما إذا كنت ستوافق أو تطلب فاتورة مفصّلة أو تتفاوض بلباقة.",
    };
    suggestedStarters = [
      "That sounds fair—I'll pay by card, and could I get a receipt, please?",
      "Is there a slightly more affordable option available?",
      "Could you confirm what's included in that price?",
    ];
  } else if (mentionsProblem) {
    const focus = keywords.slice(0, 2).join(" ");
    partnerReply = `I'm really sorry to hear about ${focus ? `the ${focus}` : "that issue"}—thank you for bringing it to my attention straight away. Let's fix this for you immediately. Would you prefer a quick replacement, a direct adjustment right now, or a follow-up confirmation?`;
    nextHint = {
      en: "State clearly how you would like the problem resolved and ask how long it will take.",
      ar: "حدّد بوضوح الحل الذي تفضله واسأل عن المدة اللازمة لحل المشكلة.",
    };
    suggestedStarters = [
      "I'd really appreciate a replacement as soon as possible, please.",
      "How quickly can someone fix this for me?",
      "Could you also give me written confirmation of the update?",
    ];
  } else {
    // General lively, truly reactive response referencing the learner's own keywords
    const echoedConcept = keywords.slice(0, 2).join(" and ");
    if (isQuestion) {
      partnerReply = `That's a very fair question${echoedConcept ? ` regarding ${echoedConcept}` : ""}. As your ${roleEn.toLowerCase()}, I can confirm we can handle that smoothly today. Would you like me to walk you through the best option, or do you already have a specific preference in mind?`;
    } else if (turnCount === 1) {
      partnerReply = `Thanks for sharing that${echoedConcept ? ` about ${echoedConcept}` : ""}! That gives me a clear picture. Could you tell me a little more about what you prefer or any specific timing you're aiming for?`;
    } else if (turnCount === 2) {
      partnerReply = `Understood—I've taken note of ${echoedConcept ? `your point about ${echoedConcept}` : "everything you just mentioned"}. Just to make sure we get every detail right, is there any particular constraint, budget, or preference I should keep in mind?`;
    } else if (turnCount === 3) {
      partnerReply = `That makes complete sense${echoedConcept ? `, especially regarding ${echoedConcept}` : ""}. Everything is now lined up on my side. Would you like to double-check any final detail before we wrap this up?`;
    } else {
      partnerReply = `Wonderful—we've covered all the key points${echoedConcept ? ` including ${echoedConcept}` : ""}. You handled that conversation really smoothly! Feel free to ask anything else or wrap up whenever you're ready.`;
    }

    nextHint = {
      en: `Respond directly to the ${roleEn.toLowerCase()}'s follow-up question by adding one specific detail or asking a clarifying question.`,
      ar: `أجب مباشرة عن سؤال المتحدث بإضافة تفصيل محدد أو طرح سؤال توضيحي قصير.`,
    };
    suggestedStarters = [
      "Yes, specifically I'd prefer...",
      "That works well for me—could you also confirm...",
      "Actually, one important detail to mention is...",
    ];
  }

  return {
    partnerReply,
    praise,
    naturalUpgrade,
    upgradeTip,
    nextHint,
    suggestedStarters,
    goalReached,
    source: "adaptive-engine",
  };
}

/** Reactive fallback for IELTS / TOEFL Speaking live examiner follow-up questions. */
export function generateExaminerFollowUpFallback(
  input: LiveExaminerFollowUpInput,
): LiveExaminerFollowUpResult {
  const words = input.learnerAnswer.trim().split(/\s+/).filter(Boolean);
  const keyTerms = extractKeyTerms(input.learnerAnswer);
  const focus = keyTerms.slice(0, 2).join(" and ");

  const examinerFollowUp = focus
    ? `You mentioned ${focus}—that's an interesting point. Could you give a concrete real-life example of how ${keyTerms[0]} affects people differently today, or compare it with the past?`
    : `Thank you for sharing your perspective. Could you expand on your main reason with a specific example from your own experience or your country?`;

  const quickFeedback: Bilingual =
    words.length >= 35
      ? {
          en: `Good development (${words.length} words). To reach Band 7.5+ / TOEFL 25+, justify your example with a contrasting viewpoint ("However...", "On the other hand...").`,
          ar: `تطوير جيد للفكرة (${words.length} كلمة). لرفع درجتك أكثر، ادعم مثالك برأي مقابل باستخدام However أو On the other hand.`,
        }
      : {
          en: `Your answer is a little brief (${words.length} words). Aim to add a clear reason ("because...") and one specific example ("for instance...") in your follow-up.`,
          ar: `إجابتك قصيرة نسبيًا (${words.length} كلمة). احرص في الرد التالي على إضافة سبب واضح ومثال محدد لرفع درجة الطلاقة.`,
        };

  return {
    examinerFollowUp,
    quickFeedback,
    source: "adaptive-engine",
  };
}
