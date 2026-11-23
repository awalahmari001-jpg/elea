import type {
  Bilingual,
  DetailedRuleGuide,
  ExplainerVideo,
  Lesson,
  LessonCourse,
  PausePredictPrompt,
  RuleBreakdownCard,
  TeacherLine,
  TimelineNode,
  VideoScene,
} from "./lesson-types";

const LEVEL_TAGS: Record<LessonCourse, string> = {
  a1: "CEFR A1 · Beginner",
  a2: "CEFR A2 · Elementary",
  b1: "CEFR B1 · Intermediate",
  b2: "CEFR B2 · Upper-Intermediate",
  c1: "CEFR C1 · Advanced",
  c2: "CEFR C2 · Mastery",
  ielts: "IELTS · Band 7 Focus",
  kids: "Kids · Pre-A1 to A2",
  adults: "Adults · Practical English",
};

/** Used ONLY for compact visual badges (never for spoken narration, so spoken sentences are never cut off). */
function badgeLabel(text: string, maxLen = 78): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLen) return clean;
  const cut = clean.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  return lastSpace > 32 ? cut.slice(0, lastSpace) : cut;
}

function cleanSpoken(text: string): string {
  return text
    .replace(/…/g, ",")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Formats a RuleBreakdownCard into a warm, human, fully spoken teacher sentence (no slashes or symbols). */
function speakRuleCard(card: RuleBreakdownCard): string {
  const cleanGroup = card.group
    .replace(/\([^)]*\)/g, "")
    .replace(/\bHe\s*\/\s*She\s*\/\s*It\b/gi, "He, she, or it")
    .replace(/\bYou\s*\/\s*We\s*\/\s*They\b/gi, "You, we, or they")
    .replace(/\bI\s*\/\s*You\s*\/\s*We\s*\/\s*They\b/gi, "I, you, we, or they")
    .replace(/\bI\s*\/\s*He\s*\/\s*She\s*\/\s*It\b/gi, "I, he, she, or it")
    .replace(/\s*\/\s*/g, " or ")
    .replace(/\s{2,}/g, " ")
    .trim();

  const cleanTakes = card.takes
    .replace(/\s*→\s*/g, " uses ")
    .replace(/\s*\|\s*/g, ", and ")
    .replace(/\s*\+\s*/g, " plus ")
    .replace(/\s*\/\s*/g, " or ")
    .replace(/\s{2,}/g, " ")
    .trim();

  const startsWithVerb = /^(takes|adds|uses|starts|means|write|answer|state|add|speak)\b/i.test(
    cleanTakes,
  );
  const bridge = startsWithVerb ? cleanTakes : `uses ${cleanTakes}`;
  return cleanSpoken(`With ${cleanGroup}, English ${bridge}. For example: ${card.example}`);
}

function getCoreFormula(lesson: Lesson, guide?: DetailedRuleGuide): string {
  if (guide?.formulas[0]?.pattern) return guide.formulas[0].pattern;
  if (lesson.listeningPlan?.paraphrasePairs[0]) {
    const p = lesson.listeningPlan.paraphrasePairs[0];
    return `"${p.spoken}" = "${p.equivalent}"`;
  }
  if (lesson.writing) {
    return `Clear Opening → Supporting Details → ${lesson.writing.minimum}+ Words`;
  }
  return badgeLabel(lesson.taskPlan?.languageFocus.en ?? lesson.title.en, 80);
}

function getTrapComparison(
  lesson: Lesson,
  guide?: DetailedRuleGuide,
): { wrong: string; right: string; why: Bilingual } {
  if (guide?.commonMistakes[0]) {
    return guide.commonMistakes[0];
  }
  if (lesson.listeningPlan?.paraphrasePairs[0]) {
    const p = lesson.listeningPlan.paraphrasePairs[0];
    return {
      wrong: `Waiting only for the exact words "${p.equivalent}" in the recording.`,
      right: `Listening for the natural phrase "${p.spoken}" and connecting the meaning.`,
      why: {
        en: "Everyday English speakers rephrase ideas instead of repeating printed question words verbatim.",
        ar: "يعيد المتحدثون صياغة المعنى بعبارات طبيعية بدل تكرار كلمات السؤال حرفيًا.",
      },
    };
  }
  return {
    wrong: "Translating word by word from Arabic without checking English word order.",
    right: `Using the clear English model directly: "${lesson.pronunciation}"`,
    why: {
      en: "Thinking in natural English patterns keeps your sentences accurate and easy to understand.",
      ar: "التفكير بالنمط الإنجليزي الصحيح يجعل جملك دقيقة وسهلة الفهم.",
    },
  };
}

/** Builds a visual chronological or sequential timeline with expressive emojis explaining progression. */
function buildTopicTimeline(lesson: Lesson): TimelineNode[] {
  const combined = `${lesson.id} ${lesson.title.en}`.toLowerCase();

  if (combined.includes("past-continuous")) {
    return [
      { marker: "Ongoing Past", label: "was / were + -ing", emoji: "⏪" },
      { marker: "Interruption", label: "when + Past Simple", emoji: "⚡", active: true },
      { marker: "Outcome", label: "Completed Story", emoji: "🏁" },
    ];
  }
  if (combined.includes("present-perfect") || combined.includes("experiences")) {
    return [
      { marker: "Past Experience", label: "have / has + V3", emoji: "🌟", active: true },
      { marker: "Bridge to Now", label: "Still True Today", emoji: "🌉" },
      { marker: "Exact Date?", label: "Switch to Past Simple", emoji: "📅" },
    ];
  }
  if (combined.includes("past") || combined.includes("story-past")) {
    return [
      { marker: "Finished Past", label: "V-ed / Irregular V2", emoji: "⏪", active: true },
      { marker: "Ask / Negative", label: "Did / didn't + Base", emoji: "❓" },
      { marker: "Now", label: "Story Complete", emoji: "✅" },
    ];
  }
  if (combined.includes("future") || combined.includes("going to")) {
    return [
      { marker: "Decided Now", label: "will + Base Verb", emoji: "⚡" },
      { marker: "Prior Plan", label: "be going to + Verb", emoji: "🗺️", active: true },
      { marker: "Fixed Date", label: "Present Continuous", emoji: "📅" },
    ];
  }
  if (combined.includes("present-continuous")) {
    return [
      { marker: "Daily Habit", label: "Present Simple", emoji: "🔁" },
      { marker: "Right Now", label: "am / is / are + -ing", emoji: "📍", active: true },
      { marker: "This Week", label: "Temporary Project", emoji: "⏳" },
    ];
  }
  if (combined.includes("hypothetical") || combined.includes("conditional")) {
    return [
      { marker: "Condition", label: "If / Had / Were", emoji: "🔀", active: true },
      { marker: "Link", label: "Cause → Effect", emoji: "➡️" },
      { marker: "Result", label: "will / would (have)", emoji: "🎯" },
    ];
  }
  if (combined.includes("introductions")) {
    return [
      { marker: "I", label: 'takes "am"', emoji: "🙋", active: true },
      { marker: "He / She / It", label: 'takes "is"', emoji: "👤" },
      { marker: "You / We / They", label: 'takes "are"', emoji: "👥" },
    ];
  }
  if (combined.includes("present-simple")) {
    return [
      { marker: "I / You / We / They", label: "Base verb + do", emoji: "👥", active: true },
      { marker: "He / She / It", label: "Verb + -s / does", emoji: "👤" },
      { marker: "Question / Negative", label: "Drop the -s!", emoji: "✅" },
    ];
  }
  if (combined.includes("school-day")) {
    return [
      { marker: "First", label: "Morning Reading", emoji: "🌅", active: true },
      { marker: "Next / Then", label: "Classes & Play", emoji: "⚽" },
      { marker: "Finally", label: "Walk Home", emoji: "🏡" },
    ];
  }

  const yearMatches = Array.from(
    new Set(lesson.example.match(/\b(19\d{2}|20\d{2})\b/g) ?? []),
  ).sort();
  if (yearMatches.length >= 2) {
    return [
      { marker: yearMatches[0]!, label: "Earlier Milestone", emoji: "📜" },
      { marker: yearMatches[1]!, label: "Key Turning Point", emoji: "⚡", active: true },
      { marker: yearMatches[2] ?? "Today", label: "Modern Impact", emoji: "🚀" },
    ];
  }

  if (lesson.skill === "grammar") {
    return [
      { marker: "Step 1", label: "Check the Subject", emoji: "🔍", active: true },
      { marker: "Step 2", label: "Choose the Right Form", emoji: "🧩" },
      { marker: "Step 3", label: "Use It in Conversation", emoji: "🗣️" },
    ];
  }
  if (lesson.skill === "reading") {
    return [
      { marker: "Pass 1", label: "Skim Main Idea", emoji: "👀" },
      { marker: "Pass 2", label: "Scan Exact Evidence", emoji: "🔍", active: true },
      { marker: "Pass 3", label: "Verify & Answer", emoji: "✅" },
    ];
  }
  if (lesson.skill === "listening") {
    return [
      { marker: "Pre-Listen", label: "Predict Synonyms", emoji: "📋" },
      { marker: "Listen", label: "Catch Stress & Tone", emoji: "🎧", active: true },
      { marker: "Shadow", label: "Repeat Aloud", emoji: "🎙️" },
    ];
  }
  if (lesson.skill === "writing") {
    return [
      { marker: "Minute 1", label: "Plan 3 Clear Points", emoji: "🗺️" },
      { marker: "Draft", label: "Write Focused Sentences", emoji: "✍️", active: true },
      { marker: "Check", label: "Verify Grammar & Flow", emoji: "✨" },
    ];
  }
  return [
    { marker: "Listen", label: "Understand the Question", emoji: "👂" },
    { marker: "Answer", label: "Speak Directly + Detail", emoji: "🗣️", active: true },
    { marker: "Connect", label: "Keep the Dialogue Flowing", emoji: "🤝" },
  ];
}

function buildHook(
  lesson: Lesson,
  trap: { wrong: string; right: string },
  guide?: DetailedRuleGuide,
): {
  sceneEmoji: string;
  headline: Bilingual;
  visualAction: Bilingual;
  narrationEn: string;
  subtitleAr: string;
  visualPoints: string[];
  dialogue: TeacherLine[];
} {
  const isIelts = lesson.course === "ielts";
  const isKids = lesson.course === "kids";

  if (lesson.skill === "grammar") {
    const l1En = isKids
      ? `Welcome to our English class! Before we start, look closely at these two sentences: "${trap.wrong}" and "${trap.right}". Which one do you think is correct?`
      : `Welcome to class! Let us begin with a question that almost every English learner faces. Look at these two sentences: "${trap.wrong}" versus "${trap.right}". Which one sounds right to you?`;
    const l2En = guide?.l1Bridge
      ? `That is such an important question, Layla. ${guide.l1Bridge.arabicHabit.en} Stay with us for the next four minutes, and we will make this English rule completely clear step by step.`
      : `That is a great question, Layla. Because English works differently from Arabic, it is very easy to hesitate here. In the next four minutes, we will break the rule down clearly so you feel completely confident.`;
    return {
      sceneEmoji: "👩‍🏫",
      headline: {
        en: "Which Sentence Is Correct in English? 🤔",
        ar: "أي جملة هي الصحيحة في الإنجليزية؟ 🤔",
      },
      visualAction: {
        en: `0:00–0:15 · 👩‍🏫 Teacher Layla (Female) & 👨‍🏫 Teacher Omar (Male) open the whiteboard side by side comparing two sentences while 🙋‍♀️ Sara raises her hand to guess.`,
        ar: `٠:٠٠–٠:١٥ · 👩‍🏫 تفتح المعلمة ليلى والمعلم عمر 👨‍🏫 السبورة معًا للمقارنة بين الجملتين بينما ترفع 🙋‍♀️ سارة يدها لتتوقع الإجابة.`,
      },
      narrationEn: `${l1En} ${l2En}`,
      subtitleAr: `مرحبًا بك في الدرس! قارن بين الجملتين: "${trap.wrong}" و"${trap.right}". خلال أربع دقائق سنشرح لك القاعدة بوضوح وعمق كامل.`,
      visualPoints: [`❌ ${trap.wrong}`, `✅ ${trap.right}`],
      dialogue: [
        {
          speaker: "layla",
          mood: "excited",
          emoji: "👋",
          textEn: l1En,
          textAr: `أهلًا بك في الصف! انظر بدقة إلى هاتين الجملتين: "${trap.wrong}" مقابل "${trap.right}". أيهما الصحيحة في رأيك؟`,
        },
        {
          speaker: "omar",
          mood: "encouraging",
          emoji: "💡",
          textEn: l2En,
          textAr: `سؤال ممتاز يا ليلى! لاختلاف العربية عن الإنجليزية يحتار الكثير هنا، وخلال ٤ دقائق سنشرح القاعدة بالتفصيل الكامل.`,
        },
      ],
    };
  }

  if (lesson.skill === "reading") {
    const l1En = isIelts
      ? `Welcome to our reading studio! Imagine the IELTS timer is running and you spot a word from the question inside paragraph two. Should you pick that answer immediately?`
      : `Welcome to reading class! Imagine you have thirty seconds to find the key idea in "${lesson.title.en}". Should you translate every single word slowly, or hunt for the main clue first?`;
    const l2En = isIelts
      ? `Careful! That identical word is often a classic Band six trap. Together, Layla and I will show you how to verify real evidence and reach Band seven with confidence.`
      : `Great question, Layla! Strong readers never get stuck translating word by word. Over the next four minutes, we will practice the exact clues that make English reading faster and clearer.`;
    return {
      sceneEmoji: "🔍",
      headline: {
        en: isIelts
          ? "60 Seconds Left — Can You Spot the Real Evidence? ⏱️"
          : "How Do Strong Readers Find the Clue Fast? 🔍",
        ar: isIelts
          ? "٦٠ ثانية على المؤقت — كيف تجد الدليل الحقيقي؟ ⏱️"
          : "كيف يلتقط القارئ المتمكن الدليل بسرعة؟ 🔍",
      },
      visualAction: {
        en: `0:00–0:15 · 👩‍🏫 Teacher Layla opens the passage with a magnifying lens 🔍 while 👨‍🏫 Teacher Omar highlights the clue sentence as 🙋‍♀️ Sara leans in.`,
        ar: `٠:٠٠–٠:١٥ · 👩‍🏫 تعرض المعلمة ليلى النص بعدسة مكبرة 🔍 بينما يظلل 👨‍🏫 المعلم عمر جملة الدليل أمام 🙋‍♀️ سارة.`,
      },
      narrationEn: `${l1En} ${l2En}`,
      subtitleAr: isIelts
        ? `تخيّل مؤقت الآيلتس يعمل—لا تنخدع بأول كلمة متطابقة! سنتدرب معًا على التحقق من الدليل الحقيقي بثقة.`
        : `في درس «${lesson.title.ar}» سنتعلم كيف نقرأ بذكاء ونصطاد الأدلة بسرعة دون ترجمة حرفية مملة.`,
      visualPoints: [
        isIelts ? "🎯 Band 7 Evidence Strategy" : "🔍 Context Clue Reading",
        `📖 ${lesson.title.en}`,
      ],
      dialogue: [
        {
          speaker: "layla",
          mood: "curious",
          emoji: "🔍",
          textEn: l1En,
          textAr: isIelts
            ? `تخيّل مؤقت الآيلتس يدور ووجدت كلمة من السؤال في الفقرة الثانية—هل تختارها فورًا؟`
            : `أهلًا بك في درس القراءة! لديك ٣٠ ثانية لقراءة «${lesson.title.ar}»—هل تترجم كل كلمة أم تبحث عن الدليل؟`,
        },
        {
          speaker: "omar",
          mood: "encouraging",
          emoji: "💡",
          textEn: l2En,
          textAr: `سؤال مهم جدًا! القارئ الذكي يبحث عن المعنى والدليل في السياق—دعنا نتدرب على ذلك خطوة بخطوة.`,
        },
      ],
    };
  }

  if (lesson.skill === "listening") {
    const pair = lesson.listeningPlan?.paraphrasePairs[0];
    const l1En = pair
      ? `Welcome to listening practice! Have you ever heard a speaker say "${pair.spoken}" and wondered why the question paper wrote "${pair.equivalent}" instead?`
      : `Welcome to listening practice! Have you ever felt sure you heard an answer, only for the speaker to change their mind two seconds later?`;
    const l2En = `Every English learner experiences that at first, especially when native speakers connect words quickly. In the next four minutes, Layla and I will train your ear step by step.`;
    return {
      sceneEmoji: "🎧",
      headline: {
        en: "Why Does Real Spoken English Sound Different? 🎧",
        ar: "لماذا تبدو الإنجليزية المنطوقة مختلفة عند السماع؟ 🎧",
      },
      visualAction: {
        en: `0:00–0:15 · 👨‍🏫 Teacher Omar opens a live studio audio wave 🔊 while 👩‍🏫 Teacher Layla maps spoken phrases to their clear meanings with 🙋‍♀️ Sara listening closely.`,
        ar: `٠:٠٠–٠:١٥ · 👨‍🏫 يشغّل المعلم عمر موجة صوتية 🔊 بينما تربط 👩‍🏫 المعلمة ليلى العبارات المنطوقة بمعانيها الواضحة أمام 🙋‍♀️ سارة.`,
      },
      narrationEn: `${l1En} ${l2En}`,
      subtitleAr: pair
        ? `هل سمعت "${pair.spoken}" ووجدت في السؤال "${pair.equivalent}"؟ سندرّب أذنك اليوم على التقاط المعاني الطبيعية بوضوح.`
        : `سندرّب أذنك اليوم على فهم المتحدثين الطبيعيين والتقاط تصحيحاتهم الذكية بثقة.`,
      visualPoints: pair
        ? [`🔊 Spoken: "${pair.spoken}"`, `💡 Meaning: "${pair.equivalent}"`]
        : ["🔊 Natural Spoken Rhythm", "🎯 Catch Speaker Corrections"],
      dialogue: [
        {
          speaker: "omar",
          mood: "curious",
          emoji: "🎧",
          textEn: l1En,
          textAr: pair
            ? `هل سمعت المتحدث يقول "${pair.spoken}" وتساءلت لماذا يكتب السؤال "${pair.equivalent}"؟`
            : `هل حدث أن اعتقدت أنك التقطت الإجابة ثم غيّر المتحدث رأيه بعد ثانيتين؟`,
        },
        {
          speaker: "layla",
          mood: "encouraging",
          emoji: "✨",
          textEn: l2En,
          textAr: `يمرّ كل متعلم بذلك في البداية! خلال أربع دقائق سندرّب أذنك خطوة بخطوة لتسمع كل إشارة بوضوح.`,
        },
      ],
    };
  }

  if (lesson.skill === "writing") {
    const l1En = isIelts
      ? `Welcome to our writing workshop! Imagine an IELTS examiner opening your script. What makes a strong Band seven response stand out in the very first ten seconds?`
      : `Welcome to our writing workshop! Imagine a reader opening your message on "${lesson.title.en}". Will they understand your main point in the very first sentence?`;
    const l2En = `Here is the honest secret from years of teaching: clear organisation and accurate grammar always beat complicated vocabulary. Let us build a clean blueprint together.`;
    return {
      sceneEmoji: "✍️",
      headline: {
        en: isIelts
          ? "What Makes Band 7 Writing Stand Out Instantly? 🏆"
          : "How Do You Make Your Writing Instantly Clear? ✍️",
        ar: isIelts
          ? "ما الذي يجعل كتابتك في الآيلتس متميزة فورًا؟ 🏆"
          : "كيف تجعل كتابتك واضحة ومقنعة من الجملة الأولى؟ ✍️",
      },
      visualAction: {
        en: `0:00–0:15 · 👩‍🏫 Teacher Layla outlines 3 clean writing blocks (Opening → Supporting Detail → Strong Close) while 👨‍🏫 Teacher Omar highlights sentence accuracy.`,
        ar: `٠:٠٠–٠:١٥ · 👩‍🏫 ترسم المعلمة ليلى ٣ كتل كتابية واضحة بينما يشير 👨‍🏫 المعلم عمر إلى دقة التراكيب النحوية.`,
      },
      narrationEn: `${l1En} ${l2En}`,
      subtitleAr: `الوضوح والتنظيم ودقة القواعد تصنع الفارق الحقيقي في الكتابة—دعنا نبني خطة كتابية متقنة معًا.`,
      visualPoints: ["🎯 1. Clear Opening", "💡 2. Specific Details", "✅ 3. Grammar & Flow Check"],
      dialogue: [
        {
          speaker: "layla",
          mood: "excited",
          emoji: "✍️",
          textEn: l1En,
          textAr: `أهلًا بك في ورشة الكتابة! ما أول شيء يجعل القارئ أو الممتحن يفهم رسالتك ويثق بمستواك فورًا؟`,
        },
        {
          speaker: "omar",
          mood: "encouraging",
          emoji: "🧩",
          textEn: l2En,
          textAr: `السر الحقيقي هو التنظيم الواضح وسلامة القواعد قبل الكلمات الصعبة—دعنا نبني المخطط معًا.`,
        },
      ],
    };
  }

  // Speaking
  const l1En = `Welcome to speaking practice! Imagine someone turns to you right now and starts a conversation about "${lesson.title.en}". Do you freeze and translate in your head, or respond smoothly?`;
  const l2En = `You do not need perfect grammar to sound confident. In the next four minutes, Layla and I will model a real male and female conversation so you can practice natural rhythm right along with us.`;
  return {
    sceneEmoji: "🗣️",
    headline: {
      en: "Someone Asks You Right Now — How Do You Reply Naturally? 🗣️",
      ar: "شخص يتحدث معك الآن — كيف ترد بطبيعية وطلاقة؟ 🗣️",
    },
    visualAction: {
      en: `0:00–0:15 · 👩‍🏫 Teacher Layla & 👨‍🏫 Teacher Omar exchange warm conversational lines 💬 while 🙋‍♀️ Sara gets ready to practice aloud.`,
      ar: `٠:٠٠–٠:١٥ · 👩‍🏫 تتبادل المعلمة ليلى والمعلم عمر 👨‍🏫 حوارًا طبيعيًا دافئًا بينما تستعد 🙋‍♀️ سارة للتدرب بصوتها.`,
    },
    narrationEn: `${l1En} ${l2En}`,
    subtitleAr: `تخيّل شخصًا يبدأ معك حديثًا حول «${lesson.title.ar}»—سنتدرب اليوم على محادثة حقيقية بصوت نسائي ورجالي لتتحدث بسلاسة وثقة.`,
    visualPoints: ["🎯 Direct Answer", "💡 One Real Detail", "🗣️ Natural Voice Rhythm"],
    dialogue: [
      {
        speaker: "layla",
        mood: "excited",
        emoji: "🗣️",
        textEn: l1En,
        textAr: `أهلًا بك في درس التحدث! تخيّل شخصًا يسألك الآن حول «${lesson.title.ar}»—كيف ترد بسلاسة دون تردد؟`,
      },
      {
        speaker: "omar",
        mood: "encouraging",
        emoji: "💪",
        textEn: l2En,
        textAr: `سنتدرب معًا عبر محادثة حقيقية بصوت ليلى وصوتي لتكتسب الإيقاع الطبيعي وتتكلم بثقة.`,
      },
    ],
  };
}

function buildDistinctChoices(correct: string, candidates: string[]): string[] {
  const seen = new Set<string>([correct.toLowerCase()]);
  const extras: string[] = [];
  for (const c of candidates) {
    const clean = c.trim();
    if (clean && !seen.has(clean.toLowerCase())) {
      seen.add(clean.toLowerCase());
      extras.push(clean);
    }
    if (extras.length === 2) break;
  }
  while (extras.length < 2) {
    extras.push(
      extras.length === 0 ? "Skip checking subject agreement" : "Translate word by word literally",
    );
  }
  const pos = correct.length % 3;
  const out = [...extras];
  out.splice(pos, 0, correct);
  return out;
}

function buildPausePredictPair(
  lesson: Lesson,
  trap: { wrong: string; right: string; why: Bilingual },
  guide?: DetailedRuleGuide,
): [PausePredictPrompt, PausePredictPrompt] {
  const q1 = lesson.questions[0];
  const q2 = lesson.questions[1];

  const challenge1: PausePredictPrompt = q1
    ? {
        challengeNumber: 1,
        question: {
          en: q1.prompt,
          ar: `اختر الإجابة الصحيحة: ${q1.prompt}`,
        },
        choices: buildDistinctChoices(
          q1.options[q1.correct] ?? "",
          q1.options.filter((_, idx) => idx !== q1.correct),
        ),
        hint: {
          en: lesson.teaching[0]?.en ?? lesson.goal.en,
          ar: lesson.teaching[0]?.ar ?? lesson.goal.ar,
        },
        answer: q1.options[q1.correct] ?? "",
        explanation: q1.explanation,
      }
    : {
        challengeNumber: 1,
        question: {
          en: "Which option applies the English rule accurately?",
          ar: "أي خيار يطبّق القاعدة الإنجليزية بشكل دقيق؟",
        },
        choices: buildDistinctChoices(trap.right, [trap.wrong, "Drop the main verb completely"]),
        hint: {
          en: "Check the subject and rule table we just reviewed in Step 1.",
          ar: "راجع جدول القاعدة الذي شرحناه في الخطوة الأولى.",
        },
        answer: trap.right,
        explanation: trap.why,
      };

  const secondMistake = guide?.commonMistakes[1];
  const secondPair = lesson.listeningPlan?.paraphrasePairs[1];

  let challenge2: PausePredictPrompt;
  if (secondMistake) {
    challenge2 = {
      challengeNumber: 2,
      question: {
        en: `Can you spot and correct this common mistake: "${secondMistake.wrong}"?`,
        ar: `هل تستطيع اكتشاف هذا الخطأ الشائع وتصحيحه: "${secondMistake.wrong}"؟`,
      },
      choices: buildDistinctChoices(secondMistake.right, [
        secondMistake.wrong,
        "Leave it unchanged — both forms are standard",
      ]),
      hint: secondMistake.why,
      answer: secondMistake.right,
      explanation: secondMistake.why,
    };
  } else if (secondPair) {
    const otherEquiv =
      lesson.listeningPlan?.paraphrasePairs[0]?.equivalent ?? "an unrelated detail";
    challenge2 = {
      challengeNumber: 2,
      question: {
        en: `You hear "${secondPair.spoken}" in the recording. Which meaning matches?`,
        ar: `سمعت عبارة "${secondPair.spoken}" في التسجيل—أي معنى يطابقها؟`,
      },
      choices: buildDistinctChoices(secondPair.equivalent, [otherEquiv, "the opposite meaning"]),
      hint: {
        en: `Arabic meaning clue: ${secondPair.arabic}`,
        ar: `المعنى بالعربية: ${secondPair.arabic}`,
      },
      answer: secondPair.equivalent,
      explanation: {
        en: `"${secondPair.spoken}" means "${secondPair.equivalent}" (${secondPair.arabic}).`,
        ar: `عبارة "${secondPair.spoken}" تعني "${secondPair.equivalent}" (${secondPair.arabic}).`,
      },
    };
  } else if (q2) {
    challenge2 = {
      challengeNumber: 2,
      question: {
        en: q2.prompt,
        ar: `التحدي الثاني: ${q2.prompt}`,
      },
      choices: buildDistinctChoices(
        q2.options[q2.correct] ?? "",
        q2.options.filter((_, idx) => idx !== q2.correct),
      ),
      hint: {
        en: lesson.teaching[1]?.en ?? lesson.goal.en,
        ar: lesson.teaching[1]?.ar ?? lesson.goal.ar,
      },
      answer: q2.options[q2.correct] ?? "",
      explanation: q2.explanation,
    };
  } else {
    challenge2 = {
      challengeNumber: 2,
      question: {
        en: "Which option uses the natural English model from this lesson?",
        ar: "أي خيار يطبّق النموذج الإنجليزي الطبيعي من هذا الدرس؟",
      },
      choices: buildDistinctChoices(lesson.pronunciation, [
        trap.wrong,
        "Translate each word literally without checking structure",
      ]),
      hint: lesson.pronunciationTip,
      answer: lesson.pronunciation,
      explanation: lesson.pronunciationTip,
    };
  }

  return [challenge1, challenge2];
}

function buildTakeawayTask(lesson: Lesson): Bilingual {
  if (lesson.skill === "grammar") {
    return {
      en: `Write one true sentence about yourself or your family using "${lesson.title.en}", say it out loud once, and then complete the four interactive practice exercises below.`,
      ar: `اكتب جملة حقيقية واحدة عن نفسك أو عائلتك تطبق فيها قاعدة «${lesson.title.ar}»، انطقها بصوت مسموع، ثم حلّ التدريبات التفاعلية الأربعة أدناه.`,
    };
  }
  if (lesson.skill === "reading") {
    return {
      en: `Before reading the passage below, scan the first sentence of each paragraph first, then solve all four interactive question formats.`,
      ar: `قبل قراءة النص أدناه، امسح الجملة الأولى من كل فقرة أولًا ثم حلّ أنماط الأسئلة الأربعة أدناه.`,
    };
  }
  if (lesson.skill === "listening") {
    return {
      en: `Play the listening passage below once at natural speed before opening the transcript, and notice two spoken paraphrases.`,
      ar: `شغّل المقطع الصوتي أدناه مرة بالسرعة الطبيعية قبل فتح النص، والتقط عبارتين معادتَي الصياغة.`,
    };
  }
  if (lesson.skill === "writing") {
    return {
      en: `Spend one minute outlining three clear points for the writing prompt below, write your draft, and check every verb and article with the checklist.`,
      ar: `خصّص دقيقة لتخطيط ثلاث نقاط واضحة لمهمة الكتابة أدناه، ثم اكتب مسودتك وراجع الأفعال والأدوات بقائمة التحقق.`,
    };
  }
  return {
    en: `Tap the microphone below, speak the model sentence with smooth pacing, and add one extra sentence about your own daily life.`,
    ar: `اضغط على الميكروفون أدناه، انطق الجملة النموذجية بإيقاع هادئ وسلس، وأضف جملة إضافية عن حياتك اليومية.`,
  };
}

/**
 * Generates an authentic, classroom-grade 4:30 (270s) interactive ESL video lesson & dual-coding storyboard
 * for EVERY lesson on the website (209 lessons across CEFR A1–C2, IELTS, Kids, and Adults):
 * - Genuine Female (Teacher Layla 👩‍🏫, Student Sara 🙋‍♀️) & Male (Teacher Omar 👨‍🏫, Student Tariq 🧑‍🎓) voices & dialogues
 * - Complete, flowing human teacher sentences (zero clipped ellipses or mechanical AI chunks)
 * - Explicit grammar/skill whiteboard rule cards (e.g., I → am, He / She / It → is, You / We / They → are)
 * - Arabic ↔ English Mother-Tongue Bridge explaining WHY Arabic-speaking learners make common mistakes
 * - Full 4-turn Male & Female real-life conversation practice inside Step 3
 */
export function buildExplainerVideo(lesson: Lesson, guide?: DetailedRuleGuide): ExplainerVideo {
  const levelTag = LEVEL_TAGS[lesson.course] ?? lesson.course.toUpperCase();
  const formula = getCoreFormula(lesson, guide);
  const trap = getTrapComparison(lesson, guide);
  const hook = buildHook(lesson, trap, guide);
  const timeline = buildTopicTimeline(lesson);
  const [pp1, pp2] = buildPausePredictPair(lesson, trap, guide);
  const takeawayTask = buildTakeawayTask(lesson);
  const ruleCards = guide?.ruleBreakdown ?? [];
  const l1Bridge = guide?.l1Bridge;
  const conversation = guide?.miniDialogue ?? [];
  const memoryTip: Bilingual = guide?.memoryTip ?? {
    en: lesson.teaching[0]?.en ?? lesson.goal.en,
    ar: lesson.teaching[0]?.ar ?? lesson.goal.ar,
  };

  // Build natural, full-sentence spoken rule explanation from the actual ruleCards
  const card0 = ruleCards[0];
  const card1 = ruleCards[1];
  const card2 = ruleCards[2];

  const laylaRuleExplanationEn = card0
    ? `Let us look closely at the whiteboard together so every single part of the rule is crystal clear. ${speakRuleCard(card0)}${card1 ? ` ${speakRuleCard(card1)}` : ""}`
    : `Let us study the core pattern carefully together. ${guide?.summary.en ?? lesson.teaching[0]?.en ?? lesson.goal.en}`;

  const omarRuleExplanationEn = card2
    ? `And notice how cleanly the next part fits in: ${speakRuleCard(card2)} Whenever you pause and check who or what the sentence is about, the right English form becomes obvious. That completes Step 1 of 3.`
    : `And keep this key principle in mind: ${lesson.teaching[1]?.en ?? lesson.teaching[0]?.en ?? lesson.goal.en} You can tap any rule card on the whiteboard to hear it again. That completes Step 1 of 3.`;

  const laylaRuleExplanationAr = card0
    ? `لنتأمل السبورة معًا بوضوح تام: ${card0.group} ← ${card0.arabic}${card1 ? `، وكذلك: ${card1.arabic}` : ""}`
    : `لندرس القاعدة الأساسية بدقة معًا: ${guide?.summary.ar ?? lesson.teaching[0]?.ar ?? lesson.goal.ar}`;

  const omarRuleExplanationAr = card2
    ? `والجزء التالي لا يقل وضوحًا: ${card2.arabic}. متى تحققت من الفاعل والتركيب، تصبح الصيغة الصحيحة واضحة فورًا. هكذا أنهينا الخطوة ١ من ٣.`
    : `وتذكّر هذه الفكرة الأساسية: ${lesson.teaching[1]?.ar ?? lesson.goal.ar}. يمكنك الضغط على أي بطاقة على السبورة لسماعها. هكذا أنهينا الخطوة ١ من ٣.`;

  // Step 2: Authentic Arabic-to-English ESL explanation
  const laylaTrapEn = l1Bridge
    ? `Now let us talk like real language teachers about why this mistake happens. ${l1Bridge.arabicHabit.en} That is why many learners accidentally write or say: "${trap.wrong}".`
    : `Now let us look closely at the most common mistake students make with this lesson. Many learners accidentally say: "${trap.wrong}".`;

  const omarTrapEn = l1Bridge
    ? `Exactly, Layla. ${l1Bridge.englishRule.en} So instead, say "${trap.right}". ${l1Bridge.keyDifference.en} Well done—that is Step 2 of 3 complete.`
    : `Here is the clean English correction: say "${trap.right}". ${trap.why.en} Well done—that is Step 2 of 3 complete.`;

  // Step 3: Authentic Male & Female Conversation walkthrough
  const conv0 = conversation[0];
  const conv1 = conversation[1];
  const conv2 = conversation[2];
  const conv3 = conversation[3];

  const step3Dialogue: TeacherLine[] =
    conv0 && conv1
      ? [
          {
            speaker: conv0.gender === "female" ? "layla" : "omar",
            mood: "excited",
            emoji: "💬",
            textEn: `Now listen to how this sounds in a real conversation between a female speaker and a male speaker. ${conv0.textEn}`,
            textAr: `استمع الآن كيف تبدو القاعدة في محادثة حقيقية بصوتين نسائي ورجالي: ${conv0.textAr}`,
          },
          {
            speaker: conv1.gender === "female" ? "layla" : "omar",
            mood: "encouraging",
            emoji: "🗣️",
            textEn: `${conv1.textEn}${conv2 ? ` And a student might continue: ${conv2.textEn}` : ""}`,
            textAr: `${conv1.textAr}${conv2 ? ` ويمكن للمتعلم أن يواصل: ${conv2.textAr}` : ""}`,
          },
          {
            speaker: conv1.gender === "female" ? "omar" : "layla",
            mood: "celebrating",
            emoji: "🌟",
            textEn: conv3
              ? `${conv3.textEn} Try tapping the full conversation button below to hear both voices back to back, and say each line out loud with us. Step 3 of 3 is complete!`
              : `Notice how smooth and natural that sounds. Tap any line on the conversation card to listen again and shadow it aloud. Step 3 of 3 is complete!`,
            textAr: conv3
              ? `${conv3.textAr} اضغط على زر تشغيل المحادثة الكاملة للاستماع إلى الصوتين معًا وترديدهما بصوتك. اكتملت الخطوة ٣ من ٣!`
              : `لاحظ كم تبدو المحادثة طبيعية وسلسة! اضغط على أي سطر للاستماع والترديد. اكتملت الخطوة ٣ من ٣!`,
          },
        ]
      : [
          {
            speaker: "omar",
            mood: "excited",
            emoji: "🎙️",
            textEn: `Now let us hear how smoothly this works in everyday English. Listen carefully and repeat after me: "${lesson.pronunciation}"`,
            textAr: `استمع الآن كيف تبدو الجملة بسلاسة في الإنجليزية اليومية ورددها معي: "${lesson.pronunciation}"`,
          },
          {
            speaker: "layla",
            mood: "celebrating",
            emoji: "🌟",
            textEn: `That rhythm was clear and natural. ${lesson.pronunciationTip.en} Step 3 of 3 is complete.`,
            textAr: `إيقاع واضح وطبيعي جدًا. ${lesson.pronunciationTip.ar} اكتملت الخطوة ٣ من ٣.`,
          },
        ];

  const scenes: VideoScene[] = [
    // BEAT 1: 0:00 – 0:15 (15s) — THE HOOK
    {
      id: `${lesson.id}-scene-1`,
      startSeconds: 0,
      durationSeconds: 15,
      layout: "hook",
      sceneEmoji: hook.sceneEmoji,
      chapterLabel: { en: "⚡ Hook (0:00–0:15)", ar: "⚡ الافتتاحية (0:00–0:15)" },
      headline: hook.headline,
      visualAction: hook.visualAction,
      visualPoints: hook.visualPoints,
      narrationEn: hook.narrationEn,
      subtitleAr: hook.subtitleAr,
      dialogue: hook.dialogue,
      learnerReaction: {
        student: "sara",
        emoji: "🙋‍♀️",
        bubble: {
          en: "I always pause on this in English! Can you explain why it works this way? 🤔",
          ar: "أتوقف عند هذه النقطة دائمًا في الإنجليزية! هل تشرحون لي السبب بوضوح؟ 🤔",
        },
      },
      illustration: lesson.skill,
      focusTools: ["arrow", "box", "pointer"],
      highlight: {
        badge: `${levelTag} · Live Classroom`,
        signalTag: "Authentic ESL Teacher Explanation 👩‍🏫👨‍🏫",
      },
    },

    // BEAT 2: 0:15 – 1:05 (50s) — STEP 1: IN-DEPTH WHITEBOARD RULE CARDS + TIMELINE + ROADMAP 1/3
    {
      id: `${lesson.id}-scene-2`,
      startSeconds: 15,
      durationSeconds: 50,
      layout: "diagram",
      sceneEmoji: "📘",
      chapterLabel: { en: "📘 Step 1 · Core Visual", ar: "📘 الخطوة ١ · شرح القاعدة" },
      headline: {
        en: "Clear Rule Breakdown on the Whiteboard 📘",
        ar: "شرح القاعدة بالتفصيل على السبورة 📘",
      },
      visualAction: {
        en: `0:15–1:05 · 👩‍🏫 Teacher Layla & 👨‍🏫 Teacher Omar reveal each interactive rule card (${badgeLabel(formula, 58)}) and step through the visual timeline while 🧑‍🎓 Tariq takes notes 💡. Roadmap: "Step 1 of 3 complete ✓".`,
        ar: `٠:١٥–١:٠٥ · 👩‍🏫 تشرح المعلمة ليلى والمعلم عمر 👨‍🏫 كل بطاقة قاعدة على السبورة مع الخط الزمني الواضح بينما يدون 🧑‍🎓 طارق الملاحظات 💡. اكتملت الخطوة ١ من ٣ ✓.`,
      },
      visualPoints:
        ruleCards.length > 0
          ? ruleCards.slice(0, 3).map((c) => `${c.group} → ${c.takes}`)
          : (guide?.formulas.slice(0, 3).map((f) => `${f.label.en}: ${f.example}`) ?? [
              lesson.goal.en,
            ]),
      narrationEn: `${laylaRuleExplanationEn} ${omarRuleExplanationEn}`,
      subtitleAr: `${laylaRuleExplanationAr} ${omarRuleExplanationAr}`,
      dialogue: [
        {
          speaker: "layla",
          mood: "excited",
          emoji: "👩‍🏫",
          textEn: laylaRuleExplanationEn,
          textAr: laylaRuleExplanationAr,
        },
        {
          speaker: "omar",
          mood: "encouraging",
          emoji: "👨‍🏫",
          textEn: omarRuleExplanationEn,
          textAr: omarRuleExplanationAr,
        },
      ],
      learnerReaction: {
        student: "tariq",
        emoji: "💡",
        bubble: {
          en: "Oh! Seeing every pronoun and rule card laid out clearly makes so much sense! 💡",
          ar: "آها! رؤية كل ضمير والقاعدة الخاصة به بوضوح على السبورة جعلت الفكرة سهلة جدًا! 💡",
        },
      },
      ...(ruleCards.length > 0 ? { ruleCards } : {}),
      timeline,
      illustration: lesson.skill,
      focusTools: ["arrow", "box", "circle", "highlight"],
      roadmapStep: {
        current: 1,
        total: 3,
        status: "complete",
        label: { en: "Step 1 of 3 complete", ar: "اكتملت الخطوة ١ من ٣" },
      },
      highlight: {
        badge: "Step 1 · Explicit ESL Rule Map",
        formula,
        signalTag: "Tap any whiteboard card to hear the teacher pronounce it 🔊",
      },
    },

    // BEAT 3: 1:05 – 1:40 (35s) — INTERACTIVE PAUSE & PREDICT #1
    {
      id: `${lesson.id}-scene-3`,
      startSeconds: 65,
      durationSeconds: 35,
      layout: "pause-predict",
      sceneEmoji: "🎯",
      chapterLabel: { en: "🎯 Pause & Predict #1", ar: "🎯 توقّف وتوقّع #١" },
      headline: {
        en: "Check Your Understanding — Try This One! 🎯",
        ar: "تحقّق من فهمك — جرّب هذا السؤال! 🎯",
      },
      visualAction: {
        en: `1:05–1:40 · 👨‍🏫 Teacher Omar pauses the class and invites you to choose the right answer on screen while 🙋‍♀️ Sara thinks aloud 🧠.`,
        ar: `١:٠٥–١:٤٠ · 👨‍🏫 يوقف المعلم عمر الدرس لحظة ويدعوك لاختيار الإجابة الصحيحة على الشاشة مع تفكير 🙋‍♀️ سارة 🧠.`,
      },
      visualPoints: [pp1.question.en],
      narrationEn: `Let us check that you really own this rule. Pause for a moment and tap your answer on screen: ${pp1.question.en} The right answer is "${pp1.answer}". ${pp1.explanation.en}`,
      subtitleAr: `دعنا نتحقق من فهمك الآن! اختر الإجابة الصحيحة على الشاشة: ${pp1.question.ar}. الإجابة الصحيحة هي "${pp1.answer}".`,
      dialogue: [
        {
          speaker: "omar",
          mood: "curious",
          emoji: "🎯",
          textEn: `Now it is your turn to apply the rule. Take a breath, look closely, and tap your choice: ${pp1.question.en}`,
          textAr: `الآن دورك لتطبيق القاعدة. تأمّل الجملة واختر إجابتك على الشاشة: ${pp1.question.ar}`,
        },
        {
          speaker: "layla",
          mood: "celebrating",
          emoji: "👏",
          textEn: `Well done! The correct answer is "${pp1.answer}", because ${pp1.explanation.en}`,
          textAr: `أحسنت! الإجابة الصحيحة هي "${pp1.answer}"، لأن: ${pp1.explanation.ar}`,
        },
      ],
      learnerReaction: {
        student: "sara",
        emoji: "🧠",
        bubble: {
          en: "Let's check the rule card from Step 1 and pick the right option together! 👇",
          ar: "لنراجع القاعدة من الخطوة الأولى ونختار الإجابة الصحيحة معًا! 👇",
        },
      },
      illustration: lesson.skill,
      focusTools: ["pointer", "box", "circle"],
      pausePredict: pp1,
      highlight: {
        badge: "Interactive Classroom Check · #1",
        right: pp1.answer,
      },
    },

    // BEAT 4: 1:40 – 2:30 (50s) — STEP 2: ARABIC ↔ ENGLISH BRIDGE & TRAP REPAIR + ROADMAP 2/3
    {
      id: `${lesson.id}-scene-4`,
      startSeconds: 100,
      durationSeconds: 50,
      layout: "comparison",
      sceneEmoji: "🌉",
      chapterLabel: { en: "🌉 Step 2 · Arabic vs. English", ar: "🌉 الخطوة ٢ · الفرق عن العربية" },
      headline: {
        en: "Why Arabic Speakers Make This Mistake: ❌ vs ✅",
        ar: "لماذا يقع المتحدث بالعربية في هذا الخطأ: ❌ مقابل ✅",
      },
      visualAction: {
        en: `1:40–2:30 · 👩‍🏫 Teacher Layla explains the Arabic-to-English bridge while 👨‍🏫 Teacher Omar contrasts ❌ vs ✅ clearly on the board as 🧑‍🎓 Tariq nods in understanding. Roadmap: "Step 2 of 3 complete ✓".`,
        ar: `١:٤٠–٢:٣٠ · 👩‍🏫 تشرح المعلمة ليلى الفرق الجوهري بين العربية والإنجليزية بينما يقارن 👨‍🏫 المعلم عمر بين ❌ و✅ بوضوح أمام 🧑‍🎓 طارق. اكتملت الخطوة ٢ من ٣ ✓.`,
      },
      visualPoints: [trap.why.en],
      narrationEn: `${laylaTrapEn} ${omarTrapEn}`,
      subtitleAr: `الفرق بين العربية والإنجليزية: تجنّب (${trap.wrong}) واستخدم (${trap.right}). ${trap.why.ar} اكتملت الخطوة ٢ من ٣.`,
      dialogue: [
        {
          speaker: "layla",
          mood: "curious",
          emoji: "🌉",
          textEn: laylaTrapEn,
          textAr: l1Bridge
            ? `دعنا نفهم السبب الحقيقي وراء هذا الخطأ: ${l1Bridge.arabicHabit.ar} لذلك قد يقول المتعلم خطأً: "${trap.wrong}".`
            : `لنتأمل الخطأ الأكثر شيوعًا في هذا الدرس: قد يقول المتعلم خطأً "${trap.wrong}".`,
        },
        {
          speaker: "omar",
          mood: "celebrating",
          emoji: "✅",
          textEn: omarTrapEn,
          textAr: l1Bridge
            ? `تمامًا يا ليلى! ${l1Bridge.englishRule.ar} إذن الصياغة الإنجليزية الدقيقة هي: "${trap.right}". اكتملت الخطوة ٢ من ٣!`
            : `أما الصياغة الإنجليزية الدقيقة فهي: "${trap.right}". ${trap.why.ar} اكتملت الخطوة ٢ من ٣!`,
        },
      ],
      learnerReaction: {
        student: "tariq",
        emoji: "😮",
        bubble: {
          en: "Now I finally understand WHY! Comparing Arabic and English makes it unforgettable.",
          ar: "الآن فهمت السبب أخيرًا! مقارنة العربية بالإنجليزية تجعل القاعدة لا تُنسى.",
        },
      },
      ...(l1Bridge ? { l1Bridge } : {}),
      illustration: lesson.skill,
      focusTools: ["arrow", "circle", "highlight", "box"],
      roadmapStep: {
        current: 2,
        total: 3,
        status: "complete",
        label: { en: "Step 2 of 3 complete", ar: "اكتملت الخطوة ٢ من ٣" },
      },
      highlight: {
        badge: "Step 2 · Mother-Tongue Bridge",
        wrong: trap.wrong,
        right: trap.right,
        signalTag: "Understand WHY, not just memorize 🌉",
      },
    },

    // BEAT 5: 2:30 – 3:05 (35s) — INTERACTIVE PAUSE & PREDICT #2
    {
      id: `${lesson.id}-scene-5`,
      startSeconds: 150,
      durationSeconds: 35,
      layout: "pause-predict",
      sceneEmoji: "🔥",
      chapterLabel: { en: "🔥 Pause & Predict #2", ar: "🔥 توقّف وتوقّع #٢" },
      headline: {
        en: "Apply What You Learned — Challenge #2 🔥",
        ar: "طبّق ما تعلمته الآن — التحدي #٢ 🔥",
      },
      visualAction: {
        en: `2:30–3:05 · 👩‍🏫 Teacher Layla presents Challenge #2 with clickable options; picking the right choice brings cheers 🎉 from 👨‍🏫 Teacher Omar and 🙋‍♀️ Sara.`,
        ar: `٢:٣٠–٣:٠٥ · 👩‍🏫 تعرض المعلمة ليلى التحدي التفاعلي الثاني، والاختيار الصحيح يطلق تشجيعًا من 👨‍🏫 المعلم عمر و🙋‍♀️ سارة.`,
      },
      visualPoints: [pp2.question.en],
      narrationEn: `Let us try one more practical check to lock this rule in. Look carefully and choose your answer: ${pp2.question.en} The right choice is "${pp2.answer}". ${pp2.explanation.en}`,
      subtitleAr: `تطبيق ثانٍ لتثبيت القاعدة: ${pp2.question.ar}. الإجابة الدقيقة هي "${pp2.answer}".`,
      dialogue: [
        {
          speaker: "layla",
          mood: "excited",
          emoji: "🔥",
          textEn: `Let us test that Arabic-to-English awareness right now. Look closely and tap your answer: ${pp2.question.en}`,
          textAr: `لنختبر هذا الفهم الآن! تأمّل الجملة واختر الإجابة الصحيحة: ${pp2.question.ar}`,
        },
        {
          speaker: "omar",
          mood: "celebrating",
          emoji: "🏆",
          textEn: `Spot on! "${pp2.answer}" is completely accurate. ${pp2.explanation.en}`,
          textAr: `ممتاز جدًا! "${pp2.answer}" إجابة دقيقة تمامًا. ${pp2.explanation.ar}`,
        },
      ],
      learnerReaction: {
        student: "sara",
        emoji: "💪",
        bubble: {
          en: "Remember the Arabic vs. English bridge from Step 2—you've got this! 💪",
          ar: "تذكّر الفرق بين العربية والإنجليزية من الخطوة الثانية—أنت قدّها! 💪",
        },
      },
      illustration: lesson.skill,
      focusTools: ["pointer", "highlight", "box"],
      pausePredict: pp2,
      highlight: {
        badge: "Interactive Classroom Check · #2",
        right: pp2.answer,
      },
    },

    // BEAT 6: 3:05 – 4:15 (70s) — STEP 3: AUTHENTIC MALE & FEMALE CONVERSATION + ROADMAP 3/3
    {
      id: `${lesson.id}-scene-6`,
      startSeconds: 185,
      durationSeconds: 70,
      layout: "walkthrough",
      sceneEmoji: "🗣️",
      chapterLabel: { en: "🗣️ Step 3 · Male & Female Dialogue", ar: "🗣️ الخطوة ٣ · محادثة حية" },
      headline: {
        en: "Hear It in a Real Male & Female Conversation 🗣️",
        ar: "اسمعها في محادثة حقيقية بصوت نسائي ورجالي 🗣️",
      },
      visualAction: {
        en: `3:05–4:15 · 👩‍🏫 Female & 👨‍🏫 Male speakers act out a natural 4-turn real-life dialogue using the target rule while learners tap to listen and repeat aloud. Roadmap: "Step 3 of 3 complete ✓".`,
        ar: `٣:٠٥–٤:١٥ · يؤدي متحدثة 👩 ومتحدث 👨 محادثة واقعية طبيعية من ٤ أدوار تطبق القاعدة مع إمكانية الاستماع والترديد. اكتملت الخطوة ٣ من ٣ ✓.`,
      },
      visualPoints:
        conversation.length > 0
          ? conversation.slice(0, 3).map((turn) => `${turn.speaker}: "${turn.textEn}"`)
          : [`🗣️ "${lesson.pronunciation}"`, `💡 ${lesson.pronunciationTip.en}`],
      narrationEn: step3Dialogue.map((d) => d.textEn).join(" "),
      subtitleAr: step3Dialogue.map((d) => d.textAr).join(" "),
      dialogue: step3Dialogue,
      learnerReaction: {
        student: "tariq",
        emoji: "🎧",
        bubble: {
          en: "Hearing a woman and a man talk naturally makes it feel like a real English class! 🗣️",
          ar: "سماع صوت نسائي ورجالي يتحاوران بشكل طبيعي يجعل التعلم ممتعًا وواقعيًا! 🗣️",
        },
      },
      ...(conversation.length > 0 ? { conversation } : {}),
      timeline: timeline.map((node, i) => ({ ...node, active: i === timeline.length - 1 })),
      illustration: lesson.skill,
      focusTools: ["highlight", "arrow", "circle"],
      roadmapStep: {
        current: 3,
        total: 3,
        status: "complete",
        label: { en: "Step 3 of 3 complete", ar: "اكتملت الخطوة ٣ من ٣" },
      },
      highlight: {
        badge: "Step 3 · Male & Female Conversation",
        right: lesson.pronunciation,
        signalTag: lesson.pronunciationTip.en,
      },
    },

    // BEAT 7: 4:15 – 4:30 (15s) — 15-SECOND ACTIVE SUMMARY & TAKEAWAY TASK
    {
      id: `${lesson.id}-scene-7`,
      startSeconds: 255,
      durationSeconds: 15,
      layout: "summary",
      sceneEmoji: "🎉",
      chapterLabel: { en: "🎉 15s Summary & Task", ar: "🎉 ملخص ١٥ ثانية" },
      headline: {
        en: "15-Second Victory Recap & Task 🎉",
        ar: "ملخص الانتصار في ١٥ ثانية 🎉",
      },
      visualAction: {
        en: `4:15–4:30 · 👩‍🏫 Teacher Layla, 👨‍🏫 Teacher Omar, 🙋‍♀️ Sara & 🧑‍🎓 Tariq celebrate together 🎉 as the golden rule takeaway card and your quick action task appear.`,
        ar: `٤:١٥–٤:٣٠ · تحتفل 👩‍🏫 المعلمة ليلى والمعلم عمر 👨‍🏫 وسارة 🙋‍♀️ وطارق 🧑‍🎓 معًا بظهور خلاصة القاعدة ومهمتك التطبيقية السريعة.`,
      },
      visualPoints: [
        `📘 ${badgeLabel(formula, 64)}`,
        `💡 ${badgeLabel(memoryTip.en, 72)}`,
        `🗣️ "${badgeLabel(lesson.pronunciation, 68)}"`,
      ],
      narrationEn: `Let us wrap up in fifteen seconds! Keep this golden rule with you: ${memoryTip.en} Now put it into practice right away: ${takeawayTask.en}`,
      subtitleAr: `ملخص سريع في ١٥ ثانية: تذكّر القاعدة الذهبية (${memoryTip.ar}) وابدأ مهمتك التطبيقية الآن: ${takeawayTask.ar}`,
      dialogue: [
        {
          speaker: "layla",
          mood: "celebrating",
          emoji: "🎉",
          textEn: `Wonderful work today! Keep this golden rule right in front of you: ${memoryTip.en}`,
          textAr: `عمل رائع اليوم! اجعل هذه القاعدة الذهبية دائمًا أمامك: ${memoryTip.ar}`,
        },
        {
          speaker: "omar",
          mood: "encouraging",
          emoji: "🚀",
          textEn: `We are proud of your progress. Now take one minute for your practical takeaway: ${takeawayTask.en}`,
          textAr: `فخورون بتقدّمك الواضح! خذ دقيقة الآن لمهمتك التطبيقية: ${takeawayTask.ar}`,
        },
      ],
      learnerReaction: {
        student: "sara",
        emoji: "🎉",
        bubble: {
          en: "All three steps done—now let's review the full guide and try the practice exercises! 🚀",
          ar: "أنهينا الخطوات الثلاث—لنراجع الشرح التفصيلي وننطلق إلى التدريبات! 🚀",
        },
      },
      illustration: lesson.skill,
      focusTools: ["box", "pointer", "highlight"],
      takeawayTask,
      highlight: {
        badge: "15-sec Teacher Recap",
        formula: memoryTip.en,
        right: lesson.pronunciation,
      },
    },
  ];

  const cleanScenes: VideoScene[] = scenes.map((sc) => ({
    ...sc,
    narrationEn: cleanSpoken(sc.narrationEn),
    dialogue: sc.dialogue.map((line) => ({
      ...line,
      textEn: cleanSpoken(line.textEn),
    })),
  }));

  const durationSeconds = cleanScenes.reduce((sum, s) => sum + s.durationSeconds, 0);

  return {
    title: {
      en: `Interactive ESL Teacher Video: ${lesson.title.en}`,
      ar: `فيديو المعلم التفاعلي: ${lesson.title.ar}`,
    },
    course: lesson.course,
    durationSeconds,
    learningObjective: lesson.goal,
    levelTag,
    presenterNote: {
      en: "4:30 authentic ESL classroom video with Female Teacher Layla & Male Teacher Omar, animated learners Sara & Tariq, explicit whiteboard rule cards, Arabic-to-English bridge, and live Male & Female conversations.",
      ar: "فصل إنجليزي تفاعلي (٤:٣٠ دقائق) بصوت المعلمة ليلى والمعلم عمر والمتعلمَين سارة وطارق، مع بطاقات شرح القواعد بالتفصيل، وجسر الفرق بين العربية والإنجليزية، ومحادثات حية بصوت نسائي ورجالي.",
    },
    scenes: cleanScenes,
  };
}
