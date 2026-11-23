import type {
  Bilingual,
  DetailedRuleGuide,
  ExplainerVideo,
  Lesson,
  LessonCourse,
  PausePredictPrompt,
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

function clip(text: string, maxLen = 110): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLen) return clean;
  return `${clean.slice(0, maxLen - 1).trimEnd()}…`;
}

function getCoreFormula(lesson: Lesson, guide?: DetailedRuleGuide): string {
  if (guide?.formulas[0]?.pattern) return guide.formulas[0].pattern;
  if (lesson.listeningPlan?.paraphrasePairs[0]) {
    const p = lesson.listeningPlan.paraphrasePairs[0];
    return `🔊 "${p.spoken}" → 💡 "${p.equivalent}"`;
  }
  if (lesson.writing) {
    return `📝 Plan → 🎯 Clear Opening → 💡 Detail → ✅ ${lesson.writing.minimum}+ Words`;
  }
  if (lesson.taskPlan?.languageFocus.en) {
    return clip(lesson.taskPlan.languageFocus.en, 88);
  }
  return clip(lesson.teaching[0]?.en ?? lesson.goal.en, 88);
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
      wrong: `Waiting only for the exact word "${p.equivalent}" in the audio`,
      right: `Catching the spoken phrase "${p.spoken}" and linking its meaning`,
      why: {
        en: "Real speakers paraphrase instead of repeating question words word for word.",
        ar: "يعيد المتحدثون صياغة المعنى بدل تكرار كلمات السؤال حرفيًا.",
      },
    };
  }
  if (lesson.skill === "writing") {
    return {
      wrong: "Jumping straight into typing with no plan or checking word count",
      right: `Planning 2–3 clear points first, then drafting ${lesson.writing?.minimum ?? 120}+ focused words`,
      why: {
        en: "A 60-second outline keeps every paragraph clear and on topic.",
        ar: "تخطيط سريع قبل الكتابة يحافظ على ترابط كل فقرة ووضوحها.",
      },
    };
  }
  if (lesson.skill === "speaking") {
    return {
      wrong: "Translating every Arabic word slowly inside your head before speaking",
      right: `Using ready natural chunks like "${clip(lesson.pronunciation, 60)}"`,
      why: {
        en: "Speaking in short, natural phrases sounds smoother and builds instant confidence.",
        ar: "التحدث بعبارات جاهزة وطبيعية يمنحك سلاسة وثقة فورية.",
      },
    };
  }
  return {
    wrong: "Guessing fast without checking the key clue in context",
    right: "Spotting the signal word first, then verifying your answer",
    why: {
      en: "One quick check in context prevents the most common test mistakes.",
      ar: "التحقق السريع من السياق يمنع أكثر أخطاء الاختبارات شيوعًا.",
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
      { marker: "Right Now", label: "am/is/are + V-ing", emoji: "📍", active: true },
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
      { marker: "Step 1", label: "Spot the Signal", emoji: "🔍", active: true },
      { marker: "Step 2", label: "Build the Pattern", emoji: "🧩" },
      { marker: "Step 3", label: "Check & Speak", emoji: "🗣️" },
    ];
  }
  if (lesson.skill === "reading") {
    return [
      { marker: "Pass 1", label: "Skim Main Idea", emoji: "👀" },
      { marker: "Pass 2", label: "Scan Exact Clues", emoji: "🔍", active: true },
      { marker: "Pass 3", label: "Verify & Solve", emoji: "✅" },
    ];
  }
  if (lesson.skill === "listening") {
    return [
      { marker: "Pre-Listen", label: "Preview Paraphrases", emoji: "📋" },
      { marker: "0.75× → 0.95×", label: "Track Sound Clues", emoji: "🎧", active: true },
      { marker: "Shadow", label: "Speak Key Line", emoji: "🎙️" },
    ];
  }
  if (lesson.skill === "writing") {
    return [
      { marker: "Min 1", label: "Outline 3 Points", emoji: "🗺️" },
      { marker: "Draft", label: "Write Clear Flow", emoji: "✍️", active: true },
      { marker: "Polish", label: "Checklist Review", emoji: "✨" },
    ];
  }
  return [
    { marker: "Listen", label: "Catch the Prompt", emoji: "👂" },
    { marker: "Respond", label: "Answer + Detail", emoji: "🗣️", active: true },
    { marker: "Extend", label: "Natural Follow-Up", emoji: "🤝" },
  ];
}

function buildHook(
  lesson: Lesson,
  trap: { wrong: string; right: string },
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
      ? `Hey superstar! 🌟 Quick puzzle for you—which one sounds right: "${trap.wrong}" or "${trap.right}"?`
      : `Hey there! 🎯 Quick challenge right off the bat—would you say "${trap.wrong}" or "${trap.right}"?`;
    const l2En = `Ooh, great question, Layla! 🤔 Almost everyone pauses here—and in 4 fun minutes, you'll nail it every time! 🚀`;
    return {
      sceneEmoji: "🧩",
      headline: {
        en: "Wait—Which One Sounds Right to You? 🤔",
        ar: "توقّف للحظة—أي جملة تبدو صحيحة لك؟ 🤔",
      },
      visualAction: {
        en: `0:00–0:15 · 👩‍🏫 Coach Layla waves excitedly & 👨‍🏫 Coach Omar points with animated arrows to "${clip(trap.wrong, 42)}" vs "${clip(trap.right, 42)}" while 🙋‍♀️ Sara raises her hand!`,
        ar: `٠:٠٠–٠:١٥ · 👩‍🏫 تلوّح المدرّبة ليلى بحماس ويشير 👨‍🏫 عمر بأسهم متحركة إلى الجملتين بينما ترفع 🙋‍♀️ سارة يدها بتساؤل!`,
      },
      narrationEn: `${l1En} ${l2En}`,
      subtitleAr: `مرحبًا! 🎯 تحدٍ سريع لك: هل تقول "${trap.wrong}" أم "${trap.right}"؟ خلال ٤ دقائق ممتعة ستتقنه بثقة! 🚀`,
      visualPoints: [`🤔 "${clip(trap.wrong, 50)}"`, `✨ "${clip(trap.right, 50)}"`],
      dialogue: [
        {
          speaker: "layla",
          mood: "excited",
          emoji: "👋",
          textEn: l1En,
          textAr: `مرحبًا يا بطل! 🌟 سؤال سريع لك الآن: هل تقول "${trap.wrong}" أم "${trap.right}"؟`,
        },
        {
          speaker: "omar",
          mood: "encouraging",
          emoji: "🚀",
          textEn: l2En,
          textAr: `سؤال ذكي يا ليلى! 🤔 خلال ٤ دقائق ممتعة ستتقنه وتطبّقه بثقة تامة! 🚀`,
        },
      ],
    };
  }

  if (lesson.skill === "reading") {
    const l1En = isIelts
      ? `Hey! ⏱️ Picture the IELTS clock ticking—you spot a question word in paragraph 2. Do you pick it right away?`
      : `Welcome! 📚 Imagine having 30 seconds to scan "${lesson.title.en}". Would you read every word, or hunt the clue? 🔍`;
    const l2En = isIelts
      ? `Hold on! 🚦 That's the classic Band 6 trap! Stick with Layla, Sara, Tariq, and me to spot real Band 7 evidence fast! 🎯`
      : `Love that question, Layla! 💡 Watch our glowing highlighter arrows—your reading speed is about to level up! 🚀`;
    return {
      sceneEmoji: "🔍",
      headline: {
        en: isIelts
          ? "60 Seconds Left—Can You Beat the Trap? ⏱️"
          : "Can You Spot the Hidden Clue Fast? 🔍",
        ar: isIelts
          ? "٦٠ ثانية على المؤقت—هل تتجاوز الفخ؟ ⏱️"
          : "هل تصطاد الدليل الحقيقي بسرعة؟ 🔍",
      },
      visualAction: {
        en: `0:00–0:15 · 👩‍🏫 Layla aims an animated magnifying lens 🔍 while 👨‍🏫 Omar sweeps a bright highlighter beam, bouncing a ❌ distractor away as 🙋‍♀️ Sara watches eagerly!`,
        ar: `٠:٠٠–٠:١٥ · 👩‍🏫 توجّه ليلى عدسة مكبرة 🔍 بينما يمرّر 👨‍🏫 عمر قلم تظليل مضيء لإبعاد المشتت ❌ أمام 🙋‍♀️ سارة!`,
      },
      narrationEn: `${l1En} ${l2En}`,
      subtitleAr: isIelts
        ? `⏱️ تخيّل مؤقت الآيلتس يدق—لا تنخدع بأول كلمة! مع ليلى وعمر وسارة ستصطاد الدليل الحقيقي بسرعة! 🎯`
        : `📚 تخيّل لديك ٣٠ ثانية لمسح «${lesson.title.ar}»—تابع أسهم التظليل معنا لترفع سرعتك ودقتك! 🔍`,
      visualPoints: [
        isIelts ? "🎯 Band 7 Evidence Lens" : "🔍 Smart Clue Hunting",
        `📖 ${clip(lesson.title.en, 50)}`,
      ],
      dialogue: [
        {
          speaker: "layla",
          mood: "curious",
          emoji: "🔍",
          textEn: l1En,
          textAr: isIelts
            ? `⏱️ تخيّل مؤقت الآيلتس يعمل ووجدت كلمة السؤال في الفقرة ٢—هل تختارها فورًا؟`
            : `📚 أهلًا بك! لديك ٣٠ ثانية فقط لقراءة «${lesson.title.ar}»—كيف تجد الدليل بسرعة؟`,
        },
        {
          speaker: "omar",
          mood: "excited",
          emoji: "💡",
          textEn: l2En,
          textAr: `🚦 لحظة! اتبع أسهم التظليل المضيئة معنا وستصبح قراءتك أسرع وأدق! 💡`,
        },
      ],
    };
  }

  if (lesson.skill === "listening") {
    const pair = lesson.listeningPlan?.paraphrasePairs[0];
    const l1En = pair
      ? `Hey! 🎧 Ever hear fast English like "${pair.spoken}" and wonder why your quiz shows "${pair.equivalent}" instead?`
      : `Hey! 🎧 Ever miss a listening answer because the speaker changed their mind mid-sentence? 😮`;
    const l2En = `You're not alone! 💡 Watch the animated soundwaves with us—in 4 upbeat minutes, your ear will catch every clue! 🚀`;
    return {
      sceneEmoji: "🎧",
      headline: {
        en: "Why Did Those Words Blur Together? 🎧",
        ar: "لماذا بدت الكلمات متداخلة عند سماعها؟ 🎧",
      },
      visualAction: {
        en: `0:00–0:15 · 👨‍🏫 Omar taps a pulsing studio waveform 🔊; animated arrows split fast speech into glowing emoji badges while 👩‍🏫 Layla & 🙋‍♀️ Sara cheer!`,
        ar: `٠:٠٠–٠:١٥ · 👨‍🏫 ينقر عمر على موجة صوتية نابضة 🔊 فتتفكك الكلمات بأسهم ملونة بينما تشجع 👩‍🏫 ليلى و🙋‍♀️ سارة!`,
      },
      narrationEn: `${l1En} ${l2En}`,
      subtitleAr: pair
        ? `🎧 هل سمعت "${pair.spoken}" ووجدت في السؤال "${pair.equivalent}"؟ خلال ٤ دقائق ستدرّب أذنك بمتعة! 🚀`
        : `🎧 هل فاتتك إجابة بسبب تصحيح المتحدث لكلامه؟ خلال ٤ دقائق ستتقن التقاط كل إشارة صوتية! 🚀`,
      visualPoints: pair
        ? [`🔊 "${pair.spoken}"`, `💡 "${pair.equivalent}"`]
        : ["🔊 Fast Speech Signals", "🎯 Catch Corrections"],
      dialogue: [
        {
          speaker: "omar",
          mood: "curious",
          emoji: "🎧",
          textEn: l1En,
          textAr: pair
            ? `🎧 هل سمعت "${pair.spoken}" وتساءلت لماذا يظهر في السؤال "${pair.equivalent}"؟`
            : `🎧 هل فاتتك إجابة لأن المتحدث صحّح كلامه في منتصف الجملة؟`,
        },
        {
          speaker: "layla",
          mood: "encouraging",
          emoji: "✨",
          textEn: l2En,
          textAr: `💡 لست وحدك! تابع الموجات الصوتية المتحركة معنا وسندرّب أذنك في ٤ دقائق ممتعة! 🚀`,
        },
      ],
    };
  }

  if (lesson.skill === "writing") {
    const l1En = isIelts
      ? `Welcome! ✍️ Picture an IELTS examiner opening your script—what wins Band 7 in the first 10 seconds? 🏆`
      : `Hey there! ✍️ Picture a busy reader opening your writing on "${lesson.title.en}"—will your point pop off the page? ✨`;
    const l2En = `Spoiler: clean structure beats complicated words every time! 🧩 Watch our animated blueprint blocks snap together! 🚀`;
    return {
      sceneEmoji: "✍️",
      headline: {
        en: isIelts
          ? "What Wins Band 7 in the First 10 Seconds? 🏆"
          : "Will Your Reader Get Your Point Instantly? ✍️",
        ar: isIelts
          ? "ما الذي يكسبك الدرجة ٧ في أول ١٠ ثوانٍ؟ 🏆"
          : "هل يفهم القارئ رسالتك فورًا؟ ✍️",
      },
      visualAction: {
        en: `0:00–0:15 · 👩‍🏫 Layla sketches 3 vibrant boxes (🎯 Opening → 💡 Proof → ✅ Close) linked by glowing arrows while 👨‍🏫 Omar & 🙋‍♀️ Sara nod excitedly!`,
        ar: `٠:٠٠–٠:١٥ · 👩‍🏫 ترسم ليلى ٣ كتل مضيئة بأسهم متحركة (🎯 افتتاحية ← 💡 دعم ← ✅ خاتمة) وسط تفاعل 👨‍🏫 عمر و🙋‍♀️ سارة!`,
      },
      narrationEn: `${l1En} ${l2En}`,
      subtitleAr: `✍️ الوضوح والتنظيم يصنعان الفارق من اللحظة الأولى—شاهد مخطط الكتابة الذكي معنا الآن! 🚀`,
      visualPoints: ["🎯 1. Clear Opening", "💡 2. Proof & Detail", "✅ 3. Strong Close"],
      dialogue: [
        {
          speaker: "layla",
          mood: "excited",
          emoji: "✍️",
          textEn: l1En,
          textAr: `✍️ أهلًا بك! ما أول شيء يجذب القارئ أو الممتحن في أول ١٠ ثوانٍ من كتابتك؟`,
        },
        {
          speaker: "omar",
          mood: "encouraging",
          emoji: "🧩",
          textEn: l2En,
          textAr: `🧩 السر هو التنظيم الواضح! شاهد كتل البناء المتحركة تتجمع معنا الآن! 🚀`,
        },
      ],
    };
  }

  // Speaking
  const l1En = `Hey! 🗣️ Someone asks you right now about "${lesson.title.en}"—do you freeze, or jump in smoothly? ⚡`;
  const l2En = `You've got this! 💪 Team up with Layla, Omar, Sara & Tariq—we'll train your natural rhythm in 4 fun minutes! 🎉`;
  return {
    sceneEmoji: "🗣️",
    headline: {
      en: "Someone Asks You Right Now—What Do You Say? 🗣️",
      ar: "شخص يسألك الآن مباشرة—كيف ترد بسلاسة؟ 🗣️",
    },
    visualAction: {
      en: `0:00–0:15 · 👩‍🏫 Layla & 👨‍🏫 Omar trade animated speech bubbles 💬 with a glowing microphone 🎙️ while 🙋‍♀️ Sara practices along!`,
      ar: `٠:٠٠–٠:١٥ · 👩‍🏫 تتبادل ليلى و👨‍🏫 عمر فقاعات حوار متحركة 💬 مع ميكروفون مضيء 🎙️ بينما تتدرب 🙋‍♀️ سارة!`,
    },
    narrationEn: `${l1En} ${l2En}`,
    subtitleAr: `🗣️ لو سألك شخص الآن حول «${lesson.title.ar}»، ستتدرب معنا على الرد بطلاقة وثقة خلال ٤ دقائق! 🎉`,
    visualPoints: ["🎯 Direct Answer", "💡 + Natural Detail", "🗣️ + Smooth Rhythm"],
    dialogue: [
      {
        speaker: "layla",
        mood: "excited",
        emoji: "🗣️",
        textEn: l1En,
        textAr: `🗣️ مرحبًا! لو سألك شخص الآن عن «${lesson.title.ar}»، كيف ترد بطبيعية؟`,
      },
      {
        speaker: "omar",
        mood: "encouraging",
        emoji: "💪",
        textEn: l2En,
        textAr: `💪 أنت قادر عليها! تدرّب معنا على العبارات والإيقاع الطبيعي في ٤ دقائق ممتعة! 🎉`,
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
    extras.push(extras.length === 0 ? "Skip checking the rule" : "Use literal word-by-word order");
  }
  // Deterministically place correct choice among the 3 buttons
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
          ar: `توقّع الإجابة الصحيحة: ${q1.prompt}`,
        },
        choices: buildDistinctChoices(
          q1.options[q1.correct] ?? "",
          q1.options.filter((_, idx) => idx !== q1.correct),
        ),
        hint: {
          en: clip(lesson.teaching[0]?.en ?? lesson.goal.en, 110),
          ar: clip(lesson.teaching[0]?.ar ?? lesson.goal.ar, 110),
        },
        answer: q1.options[q1.correct] ?? "",
        explanation: q1.explanation,
      }
    : {
        challengeNumber: 1,
        question: {
          en: `Which option is stronger?`,
          ar: `أي خيار هو الأدق؟`,
        },
        choices: buildDistinctChoices(trap.right, [trap.wrong, "Drop the main verb completely"]),
        hint: {
          en: "Check the core pattern from Step 1.",
          ar: "راجع الصيغة الأساسية من الخطوة الأولى.",
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
        en: `Spot and fix the mistake: "${secondMistake.wrong}"`,
        ar: `اكتشف الخطأ وصحّحه: "${secondMistake.wrong}"`,
      },
      choices: buildDistinctChoices(secondMistake.right, [
        secondMistake.wrong,
        "Keep it unchanged — both are identical",
      ]),
      hint: {
        en: clip(secondMistake.why.en, 100),
        ar: clip(secondMistake.why.ar, 100),
      },
      answer: secondMistake.right,
      explanation: secondMistake.why,
    };
  } else if (secondPair) {
    const otherEquiv = lesson.listeningPlan?.paraphrasePairs[0]?.equivalent ?? "unrelated detail";
    challenge2 = {
      challengeNumber: 2,
      question: {
        en: `You hear "${secondPair.spoken}" in the audio. Which equivalent meaning matches?`,
        ar: `سمعت عبارة "${secondPair.spoken}" في التسجيل—ما المعنى المكافئ لها؟`,
      },
      choices: buildDistinctChoices(secondPair.equivalent, [otherEquiv, "opposite meaning"]),
      hint: {
        en: `Arabic clue: ${secondPair.arabic}`,
        ar: `تلميح بالمعنى العربي: ${secondPair.arabic}`,
      },
      answer: secondPair.equivalent,
      explanation: {
        en: `"${secondPair.spoken}" matches "${secondPair.equivalent}" (${secondPair.arabic}).`,
        ar: `عبارة "${secondPair.spoken}" تكافئ "${secondPair.equivalent}" بمعنى «${secondPair.arabic}».`,
      },
    };
  } else if (q2) {
    challenge2 = {
      challengeNumber: 2,
      question: {
        en: q2.prompt,
        ar: `تحدٍ ثانٍ: ${q2.prompt}`,
      },
      choices: buildDistinctChoices(
        q2.options[q2.correct] ?? "",
        q2.options.filter((_, idx) => idx !== q2.correct),
      ),
      hint: {
        en: clip(lesson.teaching[1]?.en ?? lesson.goal.en, 110),
        ar: clip(lesson.teaching[1]?.ar ?? lesson.goal.ar, 110),
      },
      answer: q2.options[q2.correct] ?? "",
      explanation: q2.explanation,
    };
  } else {
    challenge2 = {
      challengeNumber: 2,
      question: {
        en: `Which choice shows the natural target model for this lesson?`,
        ar: `أي خيار يمثّل الجملة النموذجية الطبيعية لهذا الدرس؟`,
      },
      choices: buildDistinctChoices(lesson.pronunciation, [
        trap.wrong,
        "Translate word by word without checking rhythm",
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
      en: `🚀 Quick Takeaway: Create one true sentence about your own day using "${lesson.title.en}"—then crush the 4 interactive question types below!`,
      ar: `🚀 مهمتك السريعة: كوّن الآن جملة حقيقية من يومك تطبق فيها قاعدة «${lesson.title.ar}»، ثم تدرّب على الأنماط الأربعة أدناه!`,
    };
  }
  if (lesson.skill === "reading") {
    return {
      en: `🔍 Quick Reflection: Which clue helped you spot the answer fastest today? Apply that exact move to the passage & 4 question types below!`,
      ar: `🔍 تأمل سريع: ما الدليل القرائي الذي ساعدك أكثر اليوم؟ طبّقه مباشرة على النص والأنماط الأربعة أدناه!`,
    };
  }
  if (lesson.skill === "listening") {
    return {
      en: `🎧 Quick Takeaway: Hit Listen at natural speed once before opening the transcript and spot 2 spoken-to-equivalent pairs!`,
      ar: `🎧 مهمتك السريعة: استمع بالسرعة الطبيعية مرة قبل فتح النص والتقط زوجين من المعاني المكافئة!`,
    };
  }
  if (lesson.skill === "writing") {
    return {
      en: `✍️ Quick Takeaway: Sketch a 3-bullet outline in 60 seconds before typing your response below, then run the checklist!`,
      ar: `✍️ مهمتك السريعة: دوّن مخططًا من ٣ نقاط في ٦٠ ثانية قبل كتابة مسودتك أدناه ثم راجعها!`,
    };
  }
  return {
    en: `🎙️ Quick Takeaway: Tap the microphone below, speak the model sentence with smooth rhythm, and add one detail about yourself!`,
    ar: `🎙️ مهمتك السريعة: اضغط الميكروفون أدناه وانطق الجملة النموذجية بإيقاع سلس وأضف تفصيلًا عن نفسك!`,
  };
}

/**
 * Generates an interactive 4:30 (270s) animated classroom video script & dual-coding storyboard
 * for EVERY lesson on the website (209 lessons across CEFR A1–C2, IELTS, Kids, and Adults):
 * - Expressive animated Teachers (Coach Layla 👩‍🏫 & Coach Omar 👨‍🏫) AND Learners (Sara 🙋‍♀️ & Tariq 🧑‍🎓)
 * - Content-explaining emojis throughout every scene, timeline, and interaction
 * - Live clickable interactive mini-challenges inside both Pause & Predict moments
 * - Chronological / sequential visual timelines & motion-graphics focus tools
 */
export function buildExplainerVideo(lesson: Lesson, guide?: DetailedRuleGuide): ExplainerVideo {
  const levelTag = LEVEL_TAGS[lesson.course] ?? lesson.course.toUpperCase();
  const formula = getCoreFormula(lesson, guide);
  const trap = getTrapComparison(lesson, guide);
  const hook = buildHook(lesson, trap);
  const timeline = buildTopicTimeline(lesson);
  const [pp1, pp2] = buildPausePredictPair(lesson, trap, guide);
  const takeawayTask = buildTakeawayTask(lesson);
  const memoryTip: Bilingual = guide?.memoryTip ?? {
    en: clip(lesson.teaching[0]?.en ?? lesson.goal.en, 110),
    ar: clip(lesson.teaching[0]?.ar ?? lesson.goal.ar, 110),
  };

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
          en: "Wait—I always wonder about this! Show us the trick! 🤔",
          ar: "لحظة—لطالما تساءلت عن هذا! أرونا السر! 🤔",
        },
      },
      illustration: lesson.skill,
      focusTools: ["arrow", "box", "pointer"],
      highlight: {
        badge: `${levelTag} · Hook`,
        signalTag: "No intro — jump right in! ⚡",
      },
    },

    // BEAT 2: 0:15 – 1:05 (50s) — STEP 1: VISUAL DIAGRAM + CHRONOLOGICAL TIMELINE + ROADMAP 1/3
    {
      id: `${lesson.id}-scene-2`,
      startSeconds: 15,
      durationSeconds: 50,
      layout: "diagram",
      sceneEmoji: "💡",
      chapterLabel: { en: "💡 Step 1 · Core Visual", ar: "💡 الخطوة ١ · المخطط" },
      headline: {
        en: "See the Pattern & Timeline Come Alive 💡",
        ar: "شاهد النمط والخط الزمني بوضوح مرئي 💡",
      },
      visualAction: {
        en: `0:15–1:05 · 👩‍🏫 Layla draws glowing color-coded boxes for "${clip(formula, 52)}" while 👨‍🏫 Omar animates directional arrows along the emoji timeline and 🧑‍🎓 Tariq has a 💡 lightbulb moment! Roadmap: "Step 1 of 3 complete ✓".`,
        ar: `٠:١٥–١:٠٥ · 👩‍🏫 ترسم ليلى مربعات ملونة للقاعدة بينما يحرّك 👨‍🏫 عمر الأسهم على الخط الزمني ويتفاعل 🧑‍🎓 طارق بحماس 💡! اكتملت الخطوة ١ من ٣ ✓.`,
      },
      visualPoints: guide?.formulas
        ? guide.formulas.slice(0, 3).map((f) => `✨ ${f.label.en}: ${f.example}`)
        : lesson.teaching.slice(0, 2).map((t) => `💡 ${clip(t.en, 84)}`),
      narrationEn: `Watch these glowing boxes with me! ${lesson.teaching[0]?.en ?? lesson.goal.en} Follow Omar's arrows along the timeline: ${formula}. Awesome work—that's Step 1 of 3 complete!`,
      subtitleAr: `💡 شاهد المربعات المضيئة مع ليلى وعمر وطارق: ${lesson.teaching[0]?.ar ?? lesson.goal.ar}. رائع—اكتملت الخطوة ١ من ٣! ✅`,
      dialogue: [
        {
          speaker: "layla",
          mood: "excited",
          emoji: "💡",
          textEn: `Watch these glowing boxes with me! ${lesson.teaching[0]?.en ?? lesson.goal.en}`,
          textAr: `💡 تأمّل هذه المربعات المضيئة معي! ${lesson.teaching[0]?.ar ?? lesson.goal.ar}`,
        },
        {
          speaker: "omar",
          mood: "encouraging",
          emoji: "➡️",
          textEn: `Follow my arrows along the timeline: ${formula}. You're already getting it—Step 1 of 3 complete! ✅`,
          textAr: `➡️ تتبّع أسهمي على الخط الزمني: ${formula}. تقدّمك رائع—اكتملت الخطوة ١ من ٣! ✅`,
        },
      ],
      learnerReaction: {
        student: "tariq",
        emoji: "🤩",
        bubble: {
          en: "Aha! Seeing the timeline arrows makes it click instantly! 💡",
          ar: "آها! رؤية الخط الزمني والأسهم جعلت الفكرة واضحة فورًا! 💡",
        },
      },
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
        badge: "Step 1 · Visual Blueprint",
        formula,
        signalTag: "Animated timeline + color-coded boxes 🧩",
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
        en: "Your Turn! Tap Your Answer 🎯",
        ar: "دورك الآن! اضغط على توقّعك 🎯",
      },
      visualAction: {
        en: `1:05–1:40 · 👨‍🏫 Omar launches an interactive clickable quiz card right on stage ("⏸ PAUSE & PREDICT #1") while 🙋‍♀️ Sara thinks aloud 🧠—picking the right option triggers 🎉 confetti emojis!`,
        ar: `١:٠٥–١:٤٠ · 👨‍🏫 يطلق عمر بطاقة اختبار تفاعلية قابلة للنقر مباشرة داخل الفيديو مع تفكير 🙋‍♀️ سارة 🧠—والإجابة الصحيحة تطلق احتفالًا بالرموز التعبيرية 🎉!`,
      },
      visualPoints: [clip(pp1.question.en, 95)],
      narrationEn: `Alright, it's your turn to play! Tap your answer right on screen: ${pp1.question.en} Ready? Boom—"${pp1.answer}"! ${pp1.explanation.en}`,
      subtitleAr: `🎯 دورك للتفاعل الآن! اختر إجابتك مباشرة على الشاشة: ${pp1.question.ar}. الإجابة الصحيحة هي "${pp1.answer}"! 🎉`,
      dialogue: [
        {
          speaker: "omar",
          mood: "curious",
          emoji: "🎯",
          textEn: `Your turn to jump in! Tap the right choice right here on stage: ${pp1.question.en}`,
          textAr: `🎯 دورك لتشارك معنا! اضغط على الإجابة الصحيحة مباشرة هنا: ${pp1.question.ar}`,
        },
        {
          speaker: "layla",
          mood: "celebrating",
          emoji: "🎉",
          textEn: `Yes!! "${pp1.answer}" is spot on—${pp1.explanation.en} 🎉`,
          textAr: `🎉 أحسنت!! "${pp1.answer}" إجابة دقيقة—${pp1.explanation.ar} 👏`,
        },
      ],
      learnerReaction: {
        student: "sara",
        emoji: "🧠",
        bubble: {
          en: "Ooh, I think I know this one! Tap an option with me! 👇",
          ar: "أظنني أعرف الإجابة! اختر معي أحد الخيارات! 👇",
        },
      },
      illustration: lesson.skill,
      focusTools: ["pointer", "box", "circle"],
      pausePredict: pp1,
      highlight: {
        badge: "Interactive Quiz · #1",
        right: pp1.answer,
      },
    },

    // BEAT 4: 1:40 – 2:30 (50s) — STEP 2: VISUAL CONTRAST & TRAP REPAIR + ROADMAP 2/3
    {
      id: `${lesson.id}-scene-4`,
      startSeconds: 100,
      durationSeconds: 50,
      layout: "comparison",
      sceneEmoji: "🚦",
      chapterLabel: { en: "🚦 Step 2 · Beat the Trap", ar: "🚦 الخطوة ٢ · تجاوز الفخ" },
      headline: {
        en: "Beat the Classic Trap: ❌ vs ✅",
        ar: "تجاوز الخطأ الشائع: ❌ مقابل ✅",
      },
      visualAction: {
        en: `1:40–2:30 · Animated ❌ red box crosses out "${clip(trap.wrong, 42)}" while a glowing green arrow ➡️ spotlights ✅ "${clip(trap.right, 42)}" as 🧑‍🎓 Tariq reacts 😮! Roadmap: "Step 2 of 3 complete ✓".`,
        ar: `١:٤٠–٢:٣٠ · يشطب المربع الأحمر ❌ الخطأ الشائع بينما يشير السهم الأخضر ➡️ إلى ✅ الصياغة الصحيحة بتفاعل 🧑‍🎓 طارق 😮! اكتملت الخطوة ٢ من ٣ ✓.`,
      },
      visualPoints: [trap.why.en],
      narrationEn: `Watch out right here—let's dodge the red trap! Skip "${trap.wrong}" and follow our green arrow straight to "${trap.right}". ${trap.why.en} High five—Step 2 of 3 complete!`,
      subtitleAr: `🚦 انتبه للفخ الأحمر ❌ (${trap.wrong}) واتبع السهم الأخضر نحو ✅ (${trap.right}). ${trap.why.ar} ممتاز—اكتملت الخطوة ٢ من ٣! 👏`,
      dialogue: [
        {
          speaker: "layla",
          mood: "curious",
          emoji: "⚠️",
          textEn: `Watch the red box ❌! Skip "${trap.wrong}". Omar, show them the green upgrade!`,
          textAr: `⚠️ انتبه للمربع الأحمر ❌! تجنّب (${trap.wrong}). عمر، أرِهم البديل الأخضر الصحيح!`,
        },
        {
          speaker: "omar",
          mood: "celebrating",
          emoji: "✅",
          textEn: `Follow this green arrow ➡️ straight to "${trap.right}"! ${trap.why.en} High five—Step 2 of 3 complete! 👏`,
          textAr: `✅ اتبع السهم الأخضر ➡️ نحو (${trap.right})! ${trap.why.ar} رائع—اكتملت الخطوة ٢ من ٣! 👏`,
        },
      ],
      learnerReaction: {
        student: "tariq",
        emoji: "😮",
        bubble: {
          en: "Whoa! Seeing ❌ vs ✅ side by side makes the mistake impossible to miss!",
          ar: "واو! رؤية ❌ مقابل ✅ جنبًا إلى جنب تمنع الوقوع في الخطأ تمامًا!",
        },
      },
      illustration: lesson.skill,
      focusTools: ["arrow", "circle", "highlight", "box"],
      roadmapStep: {
        current: 2,
        total: 3,
        status: "complete",
        label: { en: "Step 2 of 3 complete", ar: "اكتملت الخطوة ٢ من ٣" },
      },
      highlight: {
        badge: "Step 2 · ❌ vs ✅ Contrast",
        wrong: trap.wrong,
        right: trap.right,
        signalTag: "Red trap ❌ → Green fix ✅",
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
        en: "Level Up! Interactive Challenge #2 🔥",
        ar: "تحدٍ أقوى! اختبر نفسك #٢ 🔥",
      },
      visualAction: {
        en: `2:30–3:05 · 👩‍🏫 Layla slides in Challenge #2 with clickable answer buttons; answering lights up a celebration burst 🎉✨ from 👨‍🏫 Omar and 🙋‍♀️ Sara!`,
        ar: `٢:٣٠–٣:٠٥ · 👩‍🏫 تقدّم ليلى التحدي التفاعلي الثاني بأزرار قابلة للنقر، والحل الصحيح يطلق احتفالًا 🎉✨ من 👨‍🏫 عمر و🙋‍♀️ سارة!`,
      },
      visualPoints: [clip(pp2.question.en, 95)],
      narrationEn: `Ready to level up? Tap your answer for Challenge Two: ${pp2.question.en} Use the green-arrow trick from Step 2! Yes—"${pp2.answer}"! ${pp2.explanation.en}`,
      subtitleAr: `🔥 مستعد للتحدي الثاني؟ اختر الإجابة الصحيحة على الشاشة: ${pp2.question.ar}. الإجابة هي "${pp2.answer}"! 🎉`,
      dialogue: [
        {
          speaker: "layla",
          mood: "excited",
          emoji: "🔥",
          textEn: `Ready to level up? Tap your answer for Challenge Two: ${pp2.question.en}`,
          textAr: `🔥 مستعد لرفع المستوى؟ اختر إجابتك في التحدي الثاني: ${pp2.question.ar}`,
        },
        {
          speaker: "omar",
          mood: "celebrating",
          emoji: "🏆",
          textEn: `Boom! You crushed it! "${pp2.answer}"—${pp2.explanation.en} 🏆`,
          textAr: `🏆 أبدعت! الحل الصحيح هو "${pp2.answer}" — ${pp2.explanation.ar} 🌟`,
        },
      ],
      learnerReaction: {
        student: "sara",
        emoji: "💪",
        bubble: {
          en: "We've got this! Use the green-arrow trick from Step 2! 🔥",
          ar: "نحن قدّها! استخدم حيلة السهم الأخضر من الخطوة الثانية! 🔥",
        },
      },
      illustration: lesson.skill,
      focusTools: ["pointer", "highlight", "box"],
      pausePredict: pp2,
      highlight: {
        badge: "Interactive Quiz · #2",
        right: pp2.answer,
      },
    },

    // BEAT 6: 3:05 – 4:15 (70s) — STEP 3: LIVE WALKTHROUGH + TIMELINE COMPLETION + ROADMAP 3/3
    {
      id: `${lesson.id}-scene-6`,
      startSeconds: 185,
      durationSeconds: 70,
      layout: "walkthrough",
      sceneEmoji: "🎙️",
      chapterLabel: { en: "🎙️ Step 3 · Real Action", ar: "🎙️ الخطوة ٣ · تطبيق حي" },
      headline: {
        en: "Hear & Speak It in Real Life 🎙️",
        ar: "اسمعها وانطقها في الواقع 🎙️",
      },
      visualAction: {
        en: `3:05–4:15 · Animated neon highlight sweeps across "${clip(lesson.pronunciation, 56)}" while the emoji timeline hits its final milestone and 🧑‍🎓 Tariq practices aloud with 👩‍🏫 Layla & 👨‍🏫 Omar! Roadmap: "Step 3 of 3 complete ✓".`,
        ar: `٣:٠٥–٤:١٥ · ينساب تظليل حي فوق الجملة النموذجية بينما يكتمل الخط الزمني ويتدرب 🧑‍🎓 طارق بصوته مع 👩‍🏫 ليلى و👨‍🏫 عمر! اكتملت الخطوة ٣ من ٣ ✓.`,
      },
      visualPoints: [
        `🗣️ "${clip(lesson.pronunciation, 88)}"`,
        `💡 ${clip(lesson.pronunciationTip.en, 86)}`,
        ...(lesson.vocab?.[0] ? [`🔑 ${lesson.vocab[0].word} = ${lesson.vocab[0].meaningEn}`] : []),
      ],
      narrationEn: `Now hear how smooth this sounds in real life! Tap the model card and say it with us: "${lesson.pronunciation}" ${lesson.teaching[1]?.en ?? lesson.pronunciationTip.en} Fantastic—Step 3 of 3 complete!`,
      subtitleAr: `🎙️ اسمع سلاسة الجملة وردّدها معنا: "${lesson.pronunciation}". ${lesson.teaching[1]?.ar ?? lesson.pronunciationTip.ar}. أحسنت—اكتملت الخطوة ٣ من ٣! 🌟`,
      dialogue: [
        {
          speaker: "omar",
          mood: "excited",
          emoji: "🎙️",
          textEn: `Listen how smooth this sounds in real life! Tap & say it with me: "${lesson.pronunciation}"`,
          textAr: `🎙️ اسمع كم تبدو سلسة في الواقع! ردّدها معي الآن: "${lesson.pronunciation}"`,
        },
        {
          speaker: "layla",
          mood: "celebrating",
          emoji: "🌟",
          textEn: `Love that rhythm! ${lesson.teaching[1]?.en ?? lesson.pronunciationTip.en} Step 3 of 3 complete! 🌟`,
          textAr: `🌟 إيقاع رائع! ${lesson.teaching[1]?.ar ?? lesson.pronunciationTip.ar}. اكتملت الخطوة ٣ من ٣! 🌟`,
        },
      ],
      learnerReaction: {
        student: "tariq",
        emoji: "🗣️",
        bubble: {
          en: "Saying it aloud makes it stick in my memory! Let's tap to hear it! 🔊",
          ar: "نطقها بصوت عالٍ يثبّتها في ذاكرتي فورًا! اضغط للاستماع! 🔊",
        },
      },
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
        badge: "Step 3 · Live Walkthrough",
        right: lesson.pronunciation,
        signalTag: clip(lesson.pronunciationTip.en, 65),
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
        en: `4:15–4:30 · 👩‍🏫 Layla, 👨‍🏫 Omar, 🙋‍♀️ Sara & 🧑‍🎓 Tariq all jump in celebration 🎉🌟 as 3 emoji takeaway cards pop in with your quick action task!`,
        ar: `٤:١٥–٤:٣٠ · تحتفل 👩‍🏫 ليلى و👨‍🏫 عمر و🙋‍♀️ سارة و🧑‍🎓 طارق معًا 🎉🌟 مع ظهور بطاقات الملخص ومهمتك السريعة!`,
      },
      visualPoints: [
        `🧩 ${clip(formula, 56)}`,
        `💡 ${clip(memoryTip.en, 60)}`,
        `🗣️ "${clip(lesson.pronunciation, 58)}"`,
      ],
      narrationEn: `Fifteen-second victory recap! Lock in "${memoryTip.en}", dodge the red trap, and use "${lesson.pronunciation}" today! Now take action: ${takeawayTask.en}`,
      subtitleAr: `🎉 ملخص ١٥ ثانية: ثبّت (${memoryTip.ar}) وانطق الجملة بثقة! مهمتك السريعة الآن: ${takeawayTask.ar}`,
      dialogue: [
        {
          speaker: "layla",
          mood: "celebrating",
          emoji: "🎉",
          textEn: `Fifteen-second victory recap! 🎉 Remember "${memoryTip.en}" and keep "${lesson.pronunciation}" ready!`,
          textAr: `🎉 ملخص ١٥ ثانية! تذكّر (${memoryTip.ar}) واجعل الجملة جاهزة على لسانك!`,
        },
        {
          speaker: "omar",
          mood: "encouraging",
          emoji: "🚀",
          textEn: `We're so proud of you! 👏 Jump into your quick takeaway task now: ${takeawayTask.en}`,
          textAr: `🚀 فخورون بتقدّمك الرائع! 👏 انطلق الآن إلى مهمتك السريعة: ${takeawayTask.ar}`,
        },
      ],
      learnerReaction: {
        student: "sara",
        emoji: "🎉",
        bubble: {
          en: "Woohoo! 3/3 steps done—now let's crush the practice & Post-Lesson Test! 🚀",
          ar: "يا سلام! أنهينا ٣/٣ خطوات—لننطلق للتدريبات والاختبار البعدي! 🚀",
        },
      },
      illustration: lesson.skill,
      focusTools: ["box", "pointer", "highlight"],
      takeawayTask,
      highlight: {
        badge: "15-sec Active Summary",
        formula: memoryTip.en,
        right: lesson.pronunciation,
      },
    },
  ];

  const durationSeconds = scenes.reduce((sum, s) => sum + s.durationSeconds, 0);

  return {
    title: {
      en: `Interactive Animated Lesson Video: ${lesson.title.en}`,
      ar: `فيديو الدرس التفاعلي المتحرك: ${lesson.title.ar}`,
    },
    course: lesson.course,
    durationSeconds,
    learningObjective: lesson.goal,
    levelTag,
    presenterNote: {
      en: "4:30 interactive animated classroom featuring Coach Layla & Coach Omar, animated learners Sara & Tariq, content emojis, live clickable mini-quizzes, chronological timelines, and a dual-coding storyboard.",
      ar: "فصل دراسي تفاعلي متحرك (٤:٣٠ دقائق) مع المدرّبة ليلى والمدرّب عمر والمتعلمَين سارة وطارق، مع رموز تعبيرية شارحة، واختبارات تفاعلية مباشرة، وخط زمني متحرك، ولوحة مشاهد ثنائية العمود.",
    },
    scenes,
  };
}
