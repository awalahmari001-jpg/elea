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
    return `Hear: "${p.spoken}" → Means: "${p.equivalent}"`;
  }
  if (lesson.writing) {
    return `Plan → Clear Opening → Supporting Detail → ${lesson.writing.minimum}+ Words`;
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

/** Builds a clear chronological or sequential visual timeline tailored to each lesson's topic, tense, dates, or steps. */
function buildTopicTimeline(lesson: Lesson): TimelineNode[] {
  const combined = `${lesson.id} ${lesson.title.en}`.toLowerCase();

  // Chronological verb-tense & time-axis timelines
  if (combined.includes("past-continuous")) {
    return [
      { marker: "Ongoing Past", label: "was / were + -ing" },
      { marker: "Interruption", label: "when + Past Simple", active: true },
      { marker: "Outcome", label: "Completed Story" },
    ];
  }
  if (combined.includes("present-perfect") || combined.includes("experiences")) {
    return [
      { marker: "Past Experience", label: "have / has + V3", active: true },
      { marker: "Link to Now", label: "Still True Today" },
      { marker: "Exact Date?", label: "Switch to Past Simple" },
    ];
  }
  if (combined.includes("past") || combined.includes("story-past")) {
    return [
      { marker: "Finished Past", label: "V-ed / Irregular V2", active: true },
      { marker: "Negative / Ask", label: "didn't / Did + Base" },
      { marker: "Now", label: "Story Complete" },
    ];
  }
  if (combined.includes("future") || combined.includes("going to")) {
    return [
      { marker: "Decided Now", label: "will + Base Verb" },
      { marker: "Prior Plan", label: "be going to + Verb", active: true },
      { marker: "Fixed Date", label: "Present Continuous" },
    ];
  }
  if (combined.includes("present-continuous")) {
    return [
      { marker: "Habit (Always)", label: "Present Simple" },
      { marker: "Right Now", label: "am/is/are + V-ing", active: true },
      { marker: "This Week", label: "Temporary Project" },
    ];
  }
  if (combined.includes("hypothetical") || combined.includes("conditional")) {
    return [
      { marker: "Condition", label: "If / Had / Were", active: true },
      { marker: "Pivot Arrow", label: "Cause → Effect" },
      { marker: "Result", label: "will / would (have)" },
    ];
  }
  if (combined.includes("school-day")) {
    return [
      { marker: "First", label: "Morning Reading", active: true },
      { marker: "Next / Then", label: "Classes & Play" },
      { marker: "Finally", label: "Walk Home" },
    ];
  }

  // Extract chronological years if the passage mentions historical/progression dates
  const yearMatches = Array.from(
    new Set(lesson.example.match(/\b(19\d{2}|20\d{2})\b/g) ?? []),
  ).sort();
  if (yearMatches.length >= 2) {
    return [
      { marker: yearMatches[0]!, label: "Earlier Milestone" },
      { marker: yearMatches[1]!, label: "Key Turning Point", active: true },
      { marker: yearMatches[2] ?? "Today", label: "Modern Impact" },
    ];
  }

  // Skill-specific sequential timelines
  if (lesson.skill === "grammar") {
    return [
      { marker: "Step 1", label: "Spot the Signal", active: true },
      { marker: "Step 2", label: "Match the Pattern" },
      { marker: "Step 3", label: "Check & Speak" },
    ];
  }
  if (lesson.skill === "reading") {
    return [
      { marker: "Pass 1", label: "Skim Main Idea" },
      { marker: "Pass 2", label: "Scan Exact Clues", active: true },
      { marker: "Pass 3", label: "Verify & Eliminate" },
    ];
  }
  if (lesson.skill === "listening") {
    return [
      { marker: "Pre-Listen", label: "Preview Paraphrases" },
      { marker: "0.75× → 0.95×", label: "Track Sound Clues", active: true },
      { marker: "Shadow", label: "Speak Key Line" },
    ];
  }
  if (lesson.skill === "writing") {
    return [
      { marker: "Min 1", label: "Outline 3 Points" },
      { marker: "Draft", label: "Write Clear Flow", active: true },
      { marker: "Polish", label: "Checklist Review" },
    ];
  }
  return [
    { marker: "Listen", label: "Catch the Prompt" },
    { marker: "Respond", label: "Direct Answer + Detail", active: true },
    { marker: "Extend", label: "Natural Follow-Up" },
  ];
}

function buildHook(
  lesson: Lesson,
  trap: { wrong: string; right: string },
): {
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
      ? `Hey superstar! Quick puzzle for you—look at these two sentences: "${trap.wrong}" or "${trap.right}"?`
      : `Hey there! Quick challenge right off the bat—would you say "${trap.wrong}" or "${trap.right}"?`;
    const l2En = `Ooh, great question, Layla! Almost everyone pauses on this one—and in the next four minutes, you're going to nail it with total confidence!`;
    return {
      headline: {
        en: "Wait—Which One Sounds Right to You?",
        ar: "توقّف للحظة—أي جملة تبدو صحيحة لك؟",
      },
      visualAction: {
        en: `0:00–0:15 · Coach Layla & Coach Omar pop onto a vibrant split-screen! Dynamic glowing arrows point to "${clip(trap.wrong, 44)}" vs "${clip(trap.right, 44)}" inside neon geometric boxes—zero long intro!`,
        ar: `٠:٠٠–٠:١٥ · تظهر المدرّبة ليلى والمدرّب عمر بحماس مع أسهم متحركة تشير إلى الجملتين داخل مربعات هندسية مضيئة—دون مقدمة طويلة!`,
      },
      narrationEn: `${l1En} ${l2En}`,
      subtitleAr: `مرحبًا! تحدٍ سريع لك الآن: هل تقول "${trap.wrong}" أم "${trap.right}"؟ خلال الدقائق الأربع القادمة ستتقن الفرق بثقة رائعة!`,
      visualPoints: [`? "${clip(trap.wrong, 52)}"`, `? "${clip(trap.right, 52)}"`],
      dialogue: [
        {
          speaker: "layla",
          mood: "excited",
          textEn: l1En,
          textAr: `مرحبًا يا بطل! سؤال سريع لك الآن: هل تقول "${trap.wrong}" أم "${trap.right}"؟`,
        },
        {
          speaker: "omar",
          mood: "encouraging",
          textEn: l2En,
          textAr: `سؤال ذكي يا ليلى! كثيرون يترددون هنا—وخلال أربع دقائق ستتقنه تمامًا وتطبّقه بسهولة!`,
        },
      ],
    };
  }

  if (lesson.skill === "reading") {
    const l1En = isIelts
      ? `Hey! Imagine the IELTS clock ticking down—you spot a question word inside paragraph two. Do you pick it right away?`
      : `Welcome! Picture having just thirty seconds to scan "${lesson.title.en}". Would you read every word, or lock onto the hidden clue?`;
    const l2En = isIelts
      ? `Hold on—that's the classic Band 6 distractor trap! Stick with Layla and me for four fun minutes and you'll spot real Band 7 evidence fast!`
      : `Love that question, Layla! Watch our animated highlighter arrows—we're about to make your reading faster and sharper!`;
    return {
      headline: {
        en: isIelts
          ? "60 Seconds on the Clock—Can You Beat the Distractor?"
          : "Would You Catch the Hidden Clue in 10 Seconds?",
        ar: isIelts
          ? "٦٠ ثانية على المؤقت—هل تتجاوز المشتت بنجاح؟"
          : "هل تلتقط الدليل الحقيقي في ١٠ ثوانٍ؟",
      },
      visualAction: {
        en: `0:00–0:15 · Coach Layla aims an animated magnifying glass while Coach Omar sweeps a bright highlighter beam across the text, circling the true clue and bouncing a red distractor away.`,
        ar: `٠:٠٠–٠:١٥ · توجّه المدرّبة ليلى عدسة مكبّرة متحركة بينما يمرّر المدرّب عمر قلم التظليل المضيء لتمييز الدليل الحقيقي وإبعاد المشتت.`,
      },
      narrationEn: `${l1En} ${l2En}`,
      subtitleAr: isIelts
        ? `تخيّل مؤقت الآيلتس يدق—لا تنخدع بأول كلمة متطابقة! خلال ٤ دقائق ستتعلم مع ليلى وعمر كيف تلتقط دليل الدرجة ٧ بسرعة.`
        : `مرحبًا! تخيّل لديك ٣٠ ثانية لمسح «${lesson.title.ar}». مع ليلى وعمر ستكتشف كيف تصطاد الدليل الحقيقي بسرعة!`,
      visualPoints: [
        isIelts ? "Band 7 Evidence Lens" : "Smart Clue Hunting",
        clip(lesson.title.en, 56),
      ],
      dialogue: [
        {
          speaker: "layla",
          mood: "curious",
          textEn: l1En,
          textAr: isIelts
            ? `تخيّل مؤقت الآيلتس يعمل ووجدت كلمة السؤال في الفقرة الثانية—هل تختارها فورًا؟`
            : `أهلًا بك! تخيّل أن لديك ٣٠ ثانية فقط لقراءة «${lesson.title.ar}»—كيف تجد الإجابة؟`,
        },
        {
          speaker: "omar",
          mood: "excited",
          textEn: l2En,
          textAr: `لحظة! هذا هو الفخ الكلاسيكي—اتبع أسهم التظليل معنا وستصبح قراءتك أسرع وأدق بكثير!`,
        },
      ],
    };
  }

  if (lesson.skill === "listening") {
    const pair = lesson.listeningPlan?.paraphrasePairs[0];
    const l1En = pair
      ? `Hey! Ever hear fast English like "${pair.spoken}" and wonder why your quiz shows "${pair.equivalent}" instead?`
      : `Hey! Ever miss a listening answer because the speaker changed their mind halfway through?`;
    const l2En = `You're not alone! Watch the glowing soundwaves with us—in four upbeat minutes, you'll train your ear to catch every cue!`;
    return {
      headline: {
        en: "Why Did Those Words Blur Together?",
        ar: "لماذا بدت الكلمات متداخلة عند سماعها؟",
      },
      visualAction: {
        en: `0:00–0:15 · Coach Omar taps a glowing studio waveform; animated arrows split fast speech into bright color-coded stress circles while Coach Layla points straight at the meaning match.`,
        ar: `٠:٠٠–٠:١٥ · ينقر المدرّب عمر على موجة صوتية متوهجة فتتفكك الكلمات بأسهم ودوائر ملونة بينما تشير المدرّبة ليلى للمعنى المكافئ.`,
      },
      narrationEn: `${l1En} ${l2En}`,
      subtitleAr: pair
        ? `مرحبًا! هل سمعت عبارة سريعة مثل "${pair.spoken}" ووجدت في السؤال "${pair.equivalent}"؟ خلال ٤ دقائق ستدرّب أذنك مع ليلى وعمر!`
        : `مرحبًا! هل فاتتك إجابة بسبب تصحيح المتحدث لكلامه؟ خلال ٤ دقائق ستتقن التقاط الإشارات الصوتية معنا!`,
      visualPoints: pair
        ? [`🔊 "${pair.spoken}"`, `💡 "${pair.equivalent}"`]
        : ["🔊 Fast Speech Signals", "🎯 Catch Corrections"],
      dialogue: [
        {
          speaker: "omar",
          mood: "curious",
          textEn: l1En,
          textAr: pair
            ? `هل سمعت يومًا عبارة "${pair.spoken}" وتساءلت لماذا يظهر في السؤال "${pair.equivalent}"؟`
            : `هل فاتتك إجابة استماع لأن المتحدث غيّر رأيه في منتصف الجملة؟`,
        },
        {
          speaker: "layla",
          mood: "encouraging",
          textEn: l2En,
          textAr: `لست وحدك! تابع الموجات الصوتية المضيئة معنا وسندرّب أذنك في أربع دقائق ممتعة!`,
        },
      ],
    };
  }

  if (lesson.skill === "writing") {
    const l1En = isIelts
      ? `Welcome! Picture an IELTS examiner opening your writing—what earns Band 7 in the first ten seconds?`
      : `Hey there! Picture a busy reader opening your text on "${lesson.title.en}"—will your point jump off the page?`;
    const l2En = `Spoiler: it's clean structure, not fancy jargon! Watch our geometric blueprint blocks snap together with Layla and me!`;
    return {
      headline: {
        en: isIelts
          ? "What Does an Examiner Notice in the First 10 Seconds?"
          : "Would Your Reader Understand Your Message Instantly?",
        ar: isIelts
          ? "ما أول شيء يلاحظه الممتحن في أول ١٠ ثوانٍ؟"
          : "هل يفهم القارئ رسالتك من النظرة الأولى؟",
      },
      visualAction: {
        en: `0:00–0:15 · Coach Layla sketches 3 vibrant geometric boxes (Opening → Support → Close) connected by animated glowing arrows as Coach Omar cheers the learner on.`,
        ar: `٠:٠٠–٠:١٥ · ترسم المدرّبة ليلى ٣ مربعات هندسية مترابطة بأسهم مضيئة (افتتاحية ← دعم ← خاتمة) بينما يشجع المدرّب عمر المتعلم.`,
      },
      narrationEn: `${l1En} ${l2En}`,
      subtitleAr: `مرحبًا! الوضوح والتنظيم يصنعان الفارق في أول ١٠ ثوانٍ—شاهد مخطط الكتابة الذكي مع ليلى وعمر!`,
      visualPoints: ["1. Clear Opening", "2. Proof & Detail", "3. Strong Close"],
      dialogue: [
        {
          speaker: "layla",
          mood: "excited",
          textEn: l1En,
          textAr: `أهلًا بك! تخيّل القارئ أو الممتحن يفتح كتابتك الآن—ما الذي يجذبه في أول ١٠ ثوانٍ؟`,
        },
        {
          speaker: "omar",
          mood: "encouraging",
          textEn: l2En,
          textAr: `السر هو التنظيم الواضح لا الكلمات المعقدة! شاهد كتل البناء الذكية تتجمع معنا الآن!`,
        },
      ],
    };
  }

  // Speaking
  const l1En = `Hey! Someone turns to you right now about "${lesson.title.en}"—do you freeze, or jump in with a smooth answer?`;
  const l2En = `You've got this! Let's team up—Layla and I will hand you a natural rhythm and animated phrase map in four energizing minutes!`;
  return {
    headline: {
      en: "Someone Asks You Right Now—What Do You Say?",
      ar: "شخص يسألك الآن مباشرة—كيف ترد بسلاسة؟",
    },
    visualAction: {
      en: `0:00–0:15 · Coach Layla and Coach Omar face each other with animated speech arcs and a glowing microphone icon; pointer arrows highlight 3 quick speaking blocks.`,
      ar: `٠:٠٠–٠:١٥ · تتفاعل المدرّبة ليلى والمدرّب عمر بأقواس حوار متحركة وميكروفون مضيء مع أسهم تشير لـ ٣ خطوات للرد السلس.`,
    },
    narrationEn: `${l1En} ${l2En}`,
    subtitleAr: `أهلًا بك! لو سألك أحد الآن حول «${lesson.title.ar}»، ستتعلم مع ليلى وعمر كيف ترد بطلاقة وإيقاع طبيعي!`,
    visualPoints: ["Direct Answer", "+ Natural Detail", "+ Smooth Rhythm"],
    dialogue: [
      {
        speaker: "layla",
        mood: "excited",
        textEn: l1En,
        textAr: `مرحبًا! لو سألك شخص الآن عن «${lesson.title.ar}»، هل تتوقف أم ترد بسلاسة؟`,
      },
      {
        speaker: "omar",
        mood: "encouraging",
        textEn: l2En,
        textAr: `أنت قادر عليها! سأشاركك أنا وليلى خريطة عبارات طبيعية وإيقاعًا سلسًا في أربع دقائق ممتعة!`,
      },
    ],
  };
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
          en: `${q1.prompt} (${q1.options.slice(0, 3).join(" / ")})`,
          ar: `توقّع الإجابة الصحيحة: ${q1.prompt}`,
        },
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
          en: `Which option is stronger: "${trap.wrong}" or "${trap.right}"?`,
          ar: `أي خيار هو الأدق: "${trap.wrong}" أم "${trap.right}"؟`,
        },
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
      hint: {
        en: clip(secondMistake.why.en, 100),
        ar: clip(secondMistake.why.ar, 100),
      },
      answer: secondMistake.right,
      explanation: secondMistake.why,
    };
  } else if (secondPair) {
    challenge2 = {
      challengeNumber: 2,
      question: {
        en: `You hear "${secondPair.spoken}" in the recording. What equivalent meaning should you match?`,
        ar: `سمعت عبارة "${secondPair.spoken}" في التسجيل—ما المعنى المكافئ لها؟`,
      },
      hint: {
        en: `Think of the Arabic cue: ${secondPair.arabic}`,
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
        en: `${q2.prompt} (${q2.options.slice(0, 3).join(" / ")})`,
        ar: `تحدٍ ثانٍ: ${q2.prompt}`,
      },
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
        en: `How would you say the model line smoothly out loud?`,
        ar: `كيف تنطق الجملة النموذجية بسلاسة ووضوح؟`,
      },
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
      en: `Quick Takeaway Task: Right now, create one true sentence about your own day using "${lesson.title.en}"—then test yourself in the 4 question types below!`,
      ar: `مهمتك السريعة: كوّن الآن جملة حقيقية من يومك تطبق فيها قاعدة «${lesson.title.ar}»، ثم اختبر نفسك في الأنماط الأربعة أدناه!`,
    };
  }
  if (lesson.skill === "reading") {
    return {
      en: `Quick Reflection: Which reading clue helped you spot the answer fastest today? Apply that exact habit to the passage and 4 question types below!`,
      ar: `تأمل سريع: ما الدليل القرائي الذي ساعدك أكثر اليوم؟ طبّقه مباشرة على النص والأنماط الأربعة من الأسئلة أدناه!`,
    };
  }
  if (lesson.skill === "listening") {
    return {
      en: `Quick Takeaway Task: Press Listen at natural speed once without opening the transcript, and write down 2 spoken-to-equivalent pairs you catch!`,
      ar: `مهمتك السريعة: استمع للتسجيل بالسرعة الطبيعية مرة دون فتح النص، واكتب زوجين من الكلمات المسموعة ومعانيها المكافئة!`,
    };
  }
  if (lesson.skill === "writing") {
    return {
      en: `Quick Takeaway Task: Jot down a 3-bullet outline in 60 seconds before typing your response below, then review it with the self-check list!`,
      ar: `مهمتك السريعة: دوّن مخططًا من ٣ نقاط في ٦٠ ثانية قبل كتابة إجابتك أدناه، ثم راجعها بقائمة التحقق!`,
    };
  }
  return {
    en: `Quick Takeaway Task: Tap the microphone below, speak the model sentence aloud with natural pauses, and add one personal detail of your own!`,
    ar: `مهمتك السريعة: اضغط على الميكروفون أدناه وانطق الجملة النموذجية بوقفات طبيعية ثم أضف تفصيلًا شخصيًا من عندك!`,
  };
}

/**
 * Generates an engaging 4:30 (270s) interactive educational video script & dual-coding storyboard
 * for EVERY lesson on the website (209 lessons across CEFR A1–C2, IELTS, Kids, and Adults):
 * - Two expressive animated teacher characters (Coach Layla & Coach Omar) interacting dynamically
 * - High-quality skill visual aids, icons, and illustrations
 * - Clear animated chronological / sequential visual timelines
 * - Continuous motion graphics & focus tools (arrows, pointers, circles, boxes, highlights)
 * - 0:00–0:15 Hook, 3-step Progress Roadmap, 2 interactive Pause & Predict challenges, 15s Active Summary + Takeaway Task
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
      chapterLabel: { en: "Hook (0:00–0:15)", ar: "الافتتاحية المشوّقة (0:00–0:15)" },
      headline: hook.headline,
      visualAction: hook.visualAction,
      visualPoints: hook.visualPoints,
      narrationEn: hook.narrationEn,
      subtitleAr: hook.subtitleAr,
      dialogue: hook.dialogue,
      illustration: lesson.skill,
      focusTools: ["arrow", "box", "pointer"],
      highlight: {
        badge: `${levelTag} · Hook`,
        signalTag: "No intro — straight into the puzzle!",
      },
    },

    // BEAT 2: 0:15 – 1:05 (50s) — STEP 1: VISUAL DIAGRAM + CHRONOLOGICAL TIMELINE + ROADMAP 1/3
    {
      id: `${lesson.id}-scene-2`,
      startSeconds: 15,
      durationSeconds: 50,
      layout: "diagram",
      chapterLabel: { en: "Step 1 · Core Visual", ar: "الخطوة ١ · المخطط الأساسي" },
      headline: {
        en: "See the Pattern & Timeline Come Alive",
        ar: "شاهد النمط والخط الزمني بوضوح مرئي",
      },
      visualAction: {
        en: `0:15–1:05 · Coach Layla draws glowing color-coded geometric boxes for "${clip(formula, 56)}" while Coach Omar animates directional arrows along the visual timeline. Progress Roadmap clicks to "Step 1 of 3 complete ✓".`,
        ar: `٠:١٥–١:٠٥ · ترسم المدرّبة ليلى مربعات هندسية ملونة للتركيب الأساسي بينما يحرّك المدرّب عمر الأسهم على الخط الزمني البصري، ثم تضيء: «اكتملت الخطوة ١ من ٣ ✓».`,
      },
      visualPoints: guide?.formulas
        ? guide.formulas.slice(0, 3).map((f) => `${f.label.en}: ${f.example}`)
        : lesson.teaching.slice(0, 2).map((t) => clip(t.en, 88)),
      narrationEn: `Watch these glowing boxes with me! ${lesson.teaching[0]?.en ?? lesson.goal.en} Follow Omar's arrows along the timeline: ${formula}. Every single piece clicks together cleanly—awesome work, that's Step 1 of 3 complete!`,
      subtitleAr: `شاهد هذه الكتل المضيئة مع ليلى وعمر: ${lesson.teaching[0]?.ar ?? lesson.goal.ar} وتتبّع الأسهم على الخط الزمني. رائع—اكتملت الخطوة ١ من ٣!`,
      dialogue: [
        {
          speaker: "layla",
          mood: "excited",
          textEn: `Watch these glowing boxes with me! ${lesson.teaching[0]?.en ?? lesson.goal.en}`,
          textAr: `تأمّل هذه المربعات المضيئة معي! ${lesson.teaching[0]?.ar ?? lesson.goal.ar}`,
        },
        {
          speaker: "omar",
          mood: "encouraging",
          textEn: `And follow my arrows along the timeline: ${formula}. You're already mastering this—Step 1 of 3 complete!`,
          textAr: `وتتبّع أسهمي على الخط الزمني: ${formula}. تقدّمك رائع—اكتملت الخطوة ١ من ٣!`,
        },
      ],
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
        signalTag: "Animated timeline + color-coded boxes",
      },
    },

    // BEAT 3: 1:05 – 1:40 (35s) — PAUSE & PREDICT #1
    {
      id: `${lesson.id}-scene-3`,
      startSeconds: 65,
      durationSeconds: 35,
      layout: "pause-predict",
      chapterLabel: { en: "Pause & Predict #1", ar: "توقّف وتوقّع #١" },
      headline: {
        en: "Your Turn! Pause & Predict #1",
        ar: "دورك الآن! توقّف وتوقّع #١",
      },
      visualAction: {
        en: `1:05–1:40 · Coach Omar drops a pulsing amber geometric challenge box ("⏸ PAUSE & PREDICT #1") with bouncing pointer arrows. When you click Reveal, Coach Layla circles the winning answer in emerald green!`,
        ar: `١:٠٥–١:٤٠ · يعرض المدرّب عمر بطاقة التحدي النابضة «⏸ توقّف وتوقّع #١» مع أسهم مؤشّرة، وعند الكشف ترسم المدرّبة ليلى دائرة خضراء حول الحل الصحيح!`,
      },
      visualPoints: [clip(pp1.question.en, 95)],
      narrationEn: `Alright, it's your turn to shine! Hit pause right now and predict: ${pp1.question.en} Ready to check with Layla? Boom—the answer is "${pp1.answer}"! ${pp1.explanation.en}`,
      subtitleAr: `دورك الآن للتألق! أوقف الفيديو وتوقّع: ${pp1.question.ar}. الإجابة الصحيحة هي "${pp1.answer}" — ${pp1.explanation.ar}`,
      dialogue: [
        {
          speaker: "omar",
          mood: "curious",
          textEn: `Alright, your turn to shine! Hit pause right now and solve this: ${pp1.question.en}`,
          textAr: `الآن دورك لتتألق! أوقف الفيديو وحلّ هذا التحدي: ${pp1.question.ar}`,
        },
        {
          speaker: "layla",
          mood: "celebrating",
          textEn: `Nice thinking! The answer is "${pp1.answer}"—${pp1.explanation.en}`,
          textAr: `تفكير رائع! الإجابة هي "${pp1.answer}" لأن: ${pp1.explanation.ar}`,
        },
      ],
      illustration: lesson.skill,
      focusTools: ["pointer", "box", "circle"],
      pausePredict: pp1,
      highlight: {
        badge: "Active Recall · #1",
        right: pp1.answer,
      },
    },

    // BEAT 4: 1:40 – 2:30 (50s) — STEP 2: VISUAL CONTRAST & TRAP REPAIR + ROADMAP 2/3
    {
      id: `${lesson.id}-scene-4`,
      startSeconds: 100,
      durationSeconds: 50,
      layout: "comparison",
      chapterLabel: { en: "Step 2 · Beat the Trap", ar: "الخطوة ٢ · تجاوز الفخ" },
      headline: {
        en: "Spot the Classic Trap Before It Catches You",
        ar: "اكتشف الخطأ الشائع قبل أن تقع فيه",
      },
      visualAction: {
        en: `1:40–2:30 · Animated red X-line crosses out "${clip(trap.wrong, 44)}" while a glowing green arrow sweeps right onto "${clip(trap.right, 44)}" inside a focus circle. Progress Roadmap hits "Step 2 of 3 complete ✓"!`,
        ar: `١:٤٠–٢:٣٠ · خط أحمر متحرك يشطب الخطأ الشائع بينما يتجه سهم أخضر مضيء نحو الصياغة الصحيحة داخل دائرة تركيز، وتكتمل الخطوة ٢ من ٣ ✓!`,
      },
      visualPoints: [trap.why.en],
      narrationEn: `Watch out right here—let's dodge the biggest trap! On the red side, skip "${trap.wrong}". Follow our green arrow straight to "${trap.right}". Why? ${trap.why.en} High five—Step 2 of 3 complete!`,
      subtitleAr: `انتبه مع ليلى وعمر لتتجنب هذا الفخ: اترك (${trap.wrong}) واتبع السهم الأخضر نحو (${trap.right}). ${trap.why.ar} ممتاز—اكتملت الخطوة ٢ من ٣!`,
      dialogue: [
        {
          speaker: "layla",
          mood: "curious",
          textEn: `Watch out right here—see the red box? Skip "${trap.wrong}". Omar, show them the clean fix!`,
          textAr: `انتبه هنا للمربع الأحمر: تجنّب (${trap.wrong}). عمر، أرِهم التصحيح السليم!`,
        },
        {
          speaker: "omar",
          mood: "celebrating",
          textEn: `Follow this green arrow straight to "${trap.right}"! ${trap.why.en} High five—Step 2 of 3 complete!`,
          textAr: `اتبع هذا السهم الأخضر نحو (${trap.right})! ${trap.why.ar} رائع—اكتملت الخطوة ٢ من ٣!`,
        },
      ],
      illustration: lesson.skill,
      focusTools: ["arrow", "circle", "highlight", "box"],
      roadmapStep: {
        current: 2,
        total: 3,
        status: "complete",
        label: { en: "Step 2 of 3 complete", ar: "اكتملت الخطوة ٢ من ٣" },
      },
      highlight: {
        badge: "Step 2 · Motion Contrast",
        wrong: trap.wrong,
        right: trap.right,
        signalTag: "Red cross-out → Green spotlight",
      },
    },

    // BEAT 5: 2:30 – 3:05 (35s) — PAUSE & PREDICT #2
    {
      id: `${lesson.id}-scene-5`,
      startSeconds: 150,
      durationSeconds: 35,
      layout: "pause-predict",
      chapterLabel: { en: "Pause & Predict #2", ar: "توقّف وتوقّع #٢" },
      headline: {
        en: "Level Up! Pause & Predict #2",
        ar: "تحدٍ أقوى! توقّف وتوقّع #٢",
      },
      visualAction: {
        en: `2:30–3:05 · Coach Layla slides in Challenge #2 with animated pointer chevrons; revealing triggers a glowing green highlight sweep and a celebration star from Coach Omar!`,
        ar: `٢:٣٠–٣:٠٥ · تقدّم المدرّبة ليلى التحدي الثاني بأسهم متحركة، وعند كشف الحل يلمع التظليل الأخضر مع نجمة تشجيع من المدرّب عمر!`,
      },
      visualPoints: [clip(pp2.question.en, 95)],
      narrationEn: `Ready to level up? Hit pause again and test yourself: ${pp2.question.en} Use the green-arrow trick from Step 2! Got it? Yes—"${pp2.answer}"! ${pp2.explanation.en}`,
      subtitleAr: `مستعد لرفع المستوى؟ أوقف الفيديو وحل التحدي الثاني: ${pp2.question.ar}. نعم—الإجابة هي "${pp2.answer}"! ${pp2.explanation.ar}`,
      dialogue: [
        {
          speaker: "layla",
          mood: "excited",
          textEn: `Ready to level up? Hit pause and solve Challenge Two: ${pp2.question.en}`,
          textAr: `مستعد لرفع المستوى؟ أوقف الفيديو وجرّب التحدي الثاني: ${pp2.question.ar}`,
        },
        {
          speaker: "omar",
          mood: "celebrating",
          textEn: `You nailed it! The winning move is "${pp2.answer}"—${pp2.explanation.en}`,
          textAr: `أبدعت! الحل الصحيح هو "${pp2.answer}" — ${pp2.explanation.ar}`,
        },
      ],
      illustration: lesson.skill,
      focusTools: ["pointer", "highlight", "box"],
      pausePredict: pp2,
      highlight: {
        badge: "Active Recall · #2",
        right: pp2.answer,
      },
    },

    // BEAT 6: 3:05 – 4:15 (70s) — STEP 3: LIVE WALKTHROUGH + TIMELINE COMPLETION + ROADMAP 3/3
    {
      id: `${lesson.id}-scene-6`,
      startSeconds: 185,
      durationSeconds: 70,
      layout: "walkthrough",
      chapterLabel: { en: "Step 3 · Real Action", ar: "الخطوة ٣ · تطبيق واقعي" },
      headline: {
        en: "Watch It Work in Real-World English",
        ar: "شاهد التطبيق الحي في الإنجليزية الواقعية",
      },
      visualAction: {
        en: `3:05–4:15 · Live-sketch neon highlight moves word-by-word across "${clip(lesson.pronunciation, 58)}" while the timeline advances to its final node and Coach Layla & Coach Omar celebrate "Step 3 of 3 complete ✓"!`,
        ar: `٣:٠٥–٤:١٥ · ينساب تظليل حي كلمة بكلمة فوق الجملة النموذجية بينما يكتمل الخط الزمني وتحتفل ليلى وعمر بـ «اكتملت الخطوة ٣ من ٣ ✓»!`,
      },
      visualPoints: [
        `Model: "${clip(lesson.pronunciation, 90)}"`,
        `Voice tip: ${clip(lesson.pronunciationTip.en, 88)}`,
        ...(lesson.vocab?.[0]
          ? [`Keyword: ${lesson.vocab[0].word} = ${lesson.vocab[0].meaningEn}`]
          : []),
      ],
      narrationEn: `Now hear how awesome this sounds in real life! Say this line with us: "${lesson.pronunciation}" Watch our glowing highlight: ${lesson.teaching[1]?.en ?? lesson.pronunciationTip.en} Fantastic job—Step 3 of 3 complete!`,
      subtitleAr: `اسمع روعة الجملة في الواقع وردّدها مع ليلى وعمر: "${lesson.pronunciation}". ${lesson.teaching[1]?.ar ?? lesson.pronunciationTip.ar}. عمل رائع—اكتملت الخطوة ٣ من ٣!`,
      dialogue: [
        {
          speaker: "omar",
          mood: "excited",
          textEn: `Hear how smooth this sounds in real life! Say it out loud with me: "${lesson.pronunciation}"`,
          textAr: `اسمع كم تبدو سلسة في الواقع! ردّدها بصوتك معي: "${lesson.pronunciation}"`,
        },
        {
          speaker: "layla",
          mood: "celebrating",
          textEn: `Watch the glowing highlight: ${lesson.teaching[1]?.en ?? lesson.pronunciationTip.en} You crushed it—Step 3 of 3 complete!`,
          textAr: `لاحظ التظليل المضيء: ${lesson.teaching[1]?.ar ?? lesson.pronunciationTip.ar}. أحسنت جدًا—اكتملت الخطوة ٣ من ٣!`,
        },
      ],
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
      chapterLabel: { en: "15s Summary & Task", ar: "ملخص ١٥ ثانية ومهمة" },
      headline: {
        en: "15-Second Recap & Your Quick Task",
        ar: "ملخص ١٥ ثانية ومهمتك السريعة",
      },
      visualAction: {
        en: `4:15–4:30 · Both Coach Layla and Coach Omar celebrate as 3 geometric takeaway badges pop in with glowing stars, ending on a golden pointer box highlighting your quick reflection task!`,
        ar: `٤:١٥–٤:٣٠ · تحتفل ليلى وعمر بظهور ٣ بطاقات ملخصة مع نجوم مضيئة، وتنتهي بصندوق ذهبي ومؤشر لمهمتك التطبيقية السريعة!`,
      },
      visualPoints: [
        `1. Pattern: ${clip(formula, 58)}`,
        `2. Golden Rule: ${clip(memoryTip.en, 62)}`,
        `3. Model: "${clip(lesson.pronunciation, 60)}"`,
      ],
      narrationEn: `Fifteen-second victory recap: lock in "${memoryTip.en}", dodge the red trap, and use "${lesson.pronunciation}" today! Now take action: ${takeawayTask.en}`,
      subtitleAr: `ملخص ١٥ ثانية: ثبّت (${memoryTip.ar}) واستخدم الجملة النموذجية بثقة! مهمتك السريعة الآن: ${takeawayTask.ar}`,
      dialogue: [
        {
          speaker: "layla",
          mood: "celebrating",
          textEn: `Fifteen-second victory recap! Lock in "${memoryTip.en}" and keep "${lesson.pronunciation}" ready to use!`,
          textAr: `ملخص ١٥ ثانية سريع! ثبّت (${memoryTip.ar}) واجعل الجملة النموذجية جاهزة على لسانك!`,
        },
        {
          speaker: "omar",
          mood: "encouraging",
          textEn: `We're so proud of your progress—now jump right into your quick task: ${takeawayTask.en}`,
          textAr: `فخورون بتقدّمك الرائع—والآن انطلق إلى مهمتك السريعة: ${takeawayTask.ar}`,
        },
      ],
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
      en: `Interactive Micro-Lesson Video: ${lesson.title.en}`,
      ar: `فيديو الدرس المصغّر التفاعلي: ${lesson.title.ar}`,
    },
    course: lesson.course,
    durationSeconds,
    learningObjective: lesson.goal,
    levelTag,
    presenterNote: {
      en: "4:30 vibrant animated micro-lesson featuring Coach Layla & Coach Omar, skill illustrations, chronological timelines, dynamic motion-graphics arrows & highlights, 2 Pause & Predict challenges, and a dual-coding storyboard.",
      ar: "درس فيديو تفاعلي حيوي (٤:٣٠ دقائق) مع المدرّبة ليلى والمدرّب عمر، ورسوم توضيحية، وخط زمني متحرك، وأسهم ومؤشرات تركيز، وتحدّيَي توقّف وتوقّع، ولوحة مشاهد ثنائية العمود.",
    },
    scenes,
  };
}
