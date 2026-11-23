import type {
  Bilingual,
  DetailedRuleGuide,
  ExplainerVideo,
  Lesson,
  LessonCourse,
  PausePredictPrompt,
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

function buildHook(
  lesson: Lesson,
  trap: { wrong: string; right: string },
): {
  headline: Bilingual;
  visualAction: Bilingual;
  narrationEn: string;
  subtitleAr: string;
  visualPoints: string[];
} {
  const isIelts = lesson.course === "ielts";
  const isKids = lesson.course === "kids";

  if (lesson.skill === "grammar") {
    return {
      headline: {
        en: `Wait—Which One Sounds Right to You?`,
        ar: `توقّف للحظة—أي جملة تبدو صحيحة لك؟`,
      },
      visualAction: {
        en: `0:00–0:15 · Split-screen pop-in: flash "${clip(trap.wrong, 46)}" vs "${clip(trap.right, 46)}" with a pulsing "?" icon. Zero title card—instant visual question.`,
        ar: `٠:٠٠–٠:١٥ · شاشة منقسمة سريعة تعرض جملتين للمقارنة مع علامة استفهام نابضة—دون مقدمة طويلة.`,
      },
      narrationEn: isKids
        ? `Quick puzzle for you! Look at these two sentences: "${trap.wrong}" or "${trap.right}"? One tiny switch makes your English shine. In the next four minutes, you'll spot it every single time!`
        : `Quick check—would you say "${trap.wrong}" or "${trap.right}"? Thousands of smart learners mix this up in real conversations. In the next four and a half minutes, you'll lock down this rule for good!`,
      subtitleAr: `تحدٍ سريع لك! هل تقول "${trap.wrong}" أم "${trap.right}"؟ خلال الدقائق الأربع القادمة ستتقن الفرق وتطبّقه بثقة تامة!`,
      visualPoints: [`? "${clip(trap.wrong, 52)}"`, `? "${clip(trap.right, 52)}"`],
    };
  }

  if (lesson.skill === "reading") {
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
        en: `0:00–0:15 · Animated highlighter sweeps across a short text snippet while a red "distractor trap" ping bounces off and a green lens zooms in on the real evidence.`,
        ar: `٠:٠٠–٠:١٥ · قلم تظليل متحرك يمسح سطرًا من النص، يبعد المشتت الأحمر ويكبّر العدسة الخضراء على الدليل الصحيح.`,
      },
      narrationEn: isIelts
        ? `Picture the IELTS clock ticking down. You see a word from the question sitting right inside paragraph two—so you pick it, right? Careful! That's the classic Band 6 trap. In the next four minutes, you'll learn how Band 7 readers find real evidence fast.`
        : `Imagine you have just thirty seconds to read "${lesson.title.en}" and answer a tricky question. Do you read every word slowly, or hunt for the exact clue? Let's upgrade how you read in four quick minutes!`,
      subtitleAr: isIelts
        ? `تخيّل مؤقت الآيلتس يدق وتجد كلمة السؤال داخل الفقرة—احذر! قد تكون مشتتًا. خلال ٤ دقائق ستتعلم كيف تلتقط الدليل الحقيقي بسرعة.`
        : `تخيّل أن لديك ٣٠ ثانية فقط لقراءة "${lesson.title.ar}" والإجابة بدقة. خلال ٤ دقائق سنطوّر طريقتك في التقاط الأدلة!`,
      visualPoints: [
        isIelts ? "Band 7 Speed Scan" : "Smart Clue Hunting",
        clip(lesson.title.en, 56),
      ],
    };
  }

  if (lesson.skill === "listening") {
    const pair = lesson.listeningPlan?.paraphrasePairs[0];
    return {
      headline: {
        en: "Why Did Those Words Blur Together?",
        ar: "لماذا بدت الكلمات متداخلة عند سماعها؟",
      },
      visualAction: {
        en: `0:00–0:15 · Animated soundwave pulses across the screen; a fast audio clip blurs, then splits cleanly into color-coded stressed keywords.`,
        ar: `٠:٠٠–٠:١٥ · موجة صوتية متحركة تنبض على الشاشة ثم تتفكك إلى كلمات مفتاحية ملونة ومنبورة بوضوح.`,
      },
      narrationEn: pair
        ? `Ever listen to fast English and think, "Wait—what did they just say?" When a speaker says "${pair.spoken}", your question paper might say "${pair.equivalent}". In the next four minutes, you'll train your ear to connect them instantly!`
        : `Ever miss an answer because the speaker changed their mind mid-sentence? That happens all the time in real English and IELTS audio. In the next four minutes, you'll learn to catch every acoustic clue!`,
      subtitleAr: pair
        ? `هل سمعت يومًا عبارة سريعة مثل "${pair.spoken}" وتساءلت عن معناها؟ في الاختبار تظهر غالبًا بصيغة "${pair.equivalent}". خلال ٤ دقائق ستدرّب أذنك على ربطها فورًا!`
        : `هل فاتتك إجابة لأن المتحدث صحّح كلامه في منتصف الجملة؟ خلال ٤ دقائق ستتقن التقاط الإشارات الصوتية بذكاء!`,
      visualPoints: pair
        ? [`🔊 "${pair.spoken}"`, `💡 "${pair.equivalent}"`]
        : ["🔊 Fast Speech Signals", "🎯 Catch Corrections"],
    };
  }

  if (lesson.skill === "writing") {
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
        en: `0:00–0:15 · Live-sketch animation: a messy wall of text shrinks away while 3 clean color-coded building blocks snap into place (Opening → Support → Close).`,
        ar: `٠:٠٠–٠:١٥ · رسم حي سريع: يختفي النص المزدحم وتظهر ٣ كتل ملونة مرتبة (افتتاحية ← دعم ← خاتمة).`,
      },
      narrationEn: isIelts
        ? `Picture an IELTS examiner opening your script. Within ten seconds, they already know whether your structure hits Band 7. You don't need fancy rare words—you need crystal-clear organisation. Let's build it together in four minutes!`
        : `Picture someone busy opening what you just wrote for "${lesson.title.en}". Will they get your point right away, or have to re-read twice? In the next four minutes, you'll master a simple blueprint that works every time!`,
      subtitleAr: isIelts
        ? `تخيّل الممتحن يفتح إجابتك في الآيلتس: في أول ١٠ ثوانٍ يكتشف وضوح تنظيمك. خلال ٤ دقائق سنبني معًا هيكلًا قويًا وواضحًا!`
        : `تخيّل قارئًا مشغولًا يفتح رسالتك في "${lesson.title.ar}". خلال ٤ دقائق ستتقن قالبًا بسيطًا يجعل كتابتك واضحة ومقنعة فورًا!`,
      visualPoints: ["1. Clear Opening", "2. Proof & Detail", "3. Strong Close"],
    };
  }

  // Speaking
  return {
    headline: {
      en: "Someone Asks You Right Now—What Do You Say?",
      ar: "شخص يسألك الآن مباشرة—كيف ترد بسلاسة؟",
    },
    visualAction: {
      en: `0:00–0:15 · Animated speech bubble pops on the left with a ticking 3-second ring, then transforms into 3 color-coded response chunks on the right.`,
      ar: `٠:٠٠–٠:١٥ · فقاعة حوار تظهر مع عداد ٣ ثوانٍ ثم تتحول إلى ٣ عبارات ملونة سهلة النطق.`,
    },
    narrationEn: isIelts
      ? `The IELTS examiner looks up and asks you a question on "${lesson.title.en}". Do you give a tiny three-word reply, or expand smoothly with a clear example? In four minutes, you'll have a natural speaking pattern ready to go!`
      : `Imagine someone turns to you right now in a real situation: ${clip(lesson.taskPlan?.scenario.en ?? lesson.goal.en, 85)} Do you freeze—or answer smoothly? Let's train your natural voice in four fast minutes!`,
    subtitleAr: `تخيّل أن شخصًا يسألك الآن في موقف واقعي حول "${lesson.title.ar}"—هل تتردد أم ترد بطبيعية؟ خلال ٤ دقائق ستدرّب ردك بثقة وسلاسة!`,
    visualPoints: ["Direct Answer", "+ Natural Detail", "+ Smooth Rhythm"],
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
 * Generates an evidence-based 4-to-5-minute (270s = 4:30) Dual-Coding micro-lesson video script & storyboard
 * for EVERY lesson on the website (CEFR A1–C2, IELTS, Kids, Adults across all 5 skills).
 *
 * Structure (exact 270 seconds = 4:30):
 *  1. 0:00–0:15 (15s)  The Hook — instant visual question/problem, zero long intro
 *  2. 0:15–1:05 (50s)  Step 1 Visual Diagram — color-coded structure + "Step 1 of 3 complete"
 *  3. 1:05–1:40 (35s)  Pause & Predict #1 — active mini-challenge with reveal
 *  4. 1:40–2:30 (50s)  Step 2 Visual Contrast — live trap vs clean fix + "Step 2 of 3 complete"
 *  5. 2:30–3:05 (35s)  Pause & Predict #2 — second distinct mini-challenge with reveal
 *  6. 3:05–4:15 (70s)  Step 3 Real-World Walkthrough — live-sketched application + "Step 3 of 3 complete"
 *  7. 4:15–4:30 (15s)  15-Second Active Summary + Quick Reflection / Takeaway Task
 */
export function buildExplainerVideo(lesson: Lesson, guide?: DetailedRuleGuide): ExplainerVideo {
  const levelTag = LEVEL_TAGS[lesson.course] ?? lesson.course.toUpperCase();
  const formula = getCoreFormula(lesson, guide);
  const trap = getTrapComparison(lesson, guide);
  const hook = buildHook(lesson, trap);
  const [pp1, pp2] = buildPausePredictPair(lesson, trap, guide);
  const takeawayTask = buildTakeawayTask(lesson);
  const memoryTip: Bilingual = guide?.memoryTip ?? {
    en: clip(lesson.teaching[0]?.en ?? lesson.goal.en, 110),
    ar: clip(lesson.teaching[0]?.ar ?? lesson.goal.ar, 110),
  };

  // Exact 4:30 (270 seconds) — right inside the 4-to-5-minute evidence-based micro-lesson window.
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
      highlight: {
        badge: `${levelTag} · Hook`,
        signalTag: "No intro — straight into the puzzle!",
      },
    },

    // BEAT 2: 0:15 – 1:05 (50s) — STEP 1: VISUAL DIAGRAM + PROGRESS ROADMAP (1 of 3 complete)
    {
      id: `${lesson.id}-scene-2`,
      startSeconds: 15,
      durationSeconds: 50,
      layout: "diagram",
      chapterLabel: { en: "Step 1 · Core Visual", ar: "الخطوة ١ · المخطط الأساسي" },
      headline: {
        en: "See the Core Pattern at a Glance",
        ar: "شاهد النمط الأساسي بوضوح مرئي",
      },
      visualAction: {
        en: `0:15–1:05 · Live-sketch color-coded diagram blocks for "${clip(formula, 58)}". Zoom into each active slot as the narrator speaks, then light up Progress Roadmap badge: "Step 1 of 3 complete ✓".`,
        ar: `٠:١٥–١:٠٥ · رسم حي لكتل ملونة توضح التركيب الأساسي مع تكبير كل جزء أثناء الشرح، ثم إضاءة مؤشر خريطة التقدم: «اكتملت الخطوة ١ من ٣ ✓».`,
      },
      visualPoints: guide?.formulas
        ? guide.formulas.slice(0, 3).map((f) => `${f.label.en}: ${f.example}`)
        : lesson.teaching.slice(0, 2).map((t) => clip(t.en, 88)),
      narrationEn: `Here is the big secret—keep your eyes on the colored blocks on screen. ${lesson.teaching[0]?.en ?? lesson.goal.en} Look at how clean the pattern is: ${formula}. Notice how every piece has one clear job. Nice—that's Step 1 of 3 complete!`,
      subtitleAr: `ركّز على الكتل الملونة على الشاشة: ${lesson.teaching[0]?.ar ?? lesson.goal.ar} لاحظ بساطة التركيب ووضوح دور كل جزء. رائع—اكتملت الخطوة ١ من ٣!`,
      roadmapStep: {
        current: 1,
        total: 3,
        status: "complete",
        label: { en: "Step 1 of 3 complete", ar: "اكتملت الخطوة ١ من ٣" },
      },
      highlight: {
        badge: "Step 1 · Dual Coding",
        formula,
        signalTag: "Color-coded visual slots",
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
        en: `1:05–1:40 · Screen dims slightly as a glowing "⏸ PAUSE & PREDICT #1" challenge card slides in with a 5-second visual think ring. Clicking Reveal highlights the winning answer in emerald green.`,
        ar: `١:٠٥–١:٤٠ · تظهر بطاقة تحدٍ متوهجة «⏸ توقّف وتوقّع #١» مع حلقة تفكير مرئية، وعند الضغط على كشف الإجابة يضيء الحل الصحيح بالأخضر.`,
      },
      visualPoints: [clip(pp1.question.en, 95)],
      narrationEn: `Now it's your turn! Hit pause right now and test your instinct: ${pp1.question.en} Take five seconds to decide before I reveal it. Ready? The answer is "${pp1.answer}"! Why? ${pp1.explanation.en}`,
      subtitleAr: `الآن دورك! أوقف الفيديو للحظة وتوقّع الإجابة: ${pp1.question.ar}. الإجابة الصحيحة هي "${pp1.answer}" لأن: ${pp1.explanation.ar}`,
      pausePredict: pp1,
      highlight: {
        badge: "Active Recall · #1",
        right: pp1.answer,
      },
    },

    // BEAT 4: 1:40 – 2:30 (50s) — STEP 2: VISUAL CONTRAST & TRAP REPAIR + ROADMAP (2 of 3 complete)
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
        en: `1:40–2:30 · Side-by-side live animation: red pen crosses out "${clip(trap.wrong, 46)}" on the left; green spotlight zooms onto "${clip(trap.right, 46)}" on the right. Progress Roadmap advances to "Step 2 of 3 complete ✓".`,
        ar: `١:٤٠–٢:٣٠ · مقارنة بصرية حيّة: قلم أحمر يشطب الخطأ الشائع، وعدسة خضراء تكبّر الصياغة الصحيحة، ثم تضيء خريطة التقدم: «اكتملت الخطوة ٢ من ٣ ✓».`,
      },
      visualPoints: [trap.why.en],
      narrationEn: `Let's save you from the number-one mistake learners make here. Watch the red side on screen: avoid "${trap.wrong}". Now shift your eyes to the green fix: use "${trap.right}" instead. Why does that work? ${trap.why.en} Boom—Step 2 of 3 complete!`,
      subtitleAr: `تجنّب هذا الخطأ الشائع باللون الأحمر: (${trap.wrong})، واستخدم الصياغة الخضراء الصحيحة: (${trap.right}). السبب: ${trap.why.ar} ممتاز—اكتملت الخطوة ٢ من ٣!`,
      roadmapStep: {
        current: 2,
        total: 3,
        status: "complete",
        label: { en: "Step 2 of 3 complete", ar: "اكتملت الخطوة ٢ من ٣" },
      },
      highlight: {
        badge: "Step 2 · Visual Contrast",
        wrong: trap.wrong,
        right: trap.right,
        signalTag: "Zoom-in error repair",
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
        en: `2:30–3:05 · Second interactive "⏸ PAUSE & PREDICT #2" card pops onto center stage with an animated cue chip; revealing snaps the corrected word/phrase into place with a sparkle highlight.`,
        ar: `٢:٣٠–٣:٠٥ · تظهر بطاقة التحدي الثانية «⏸ توقّف وتوقّع #٢» في وسط الشاشة، وعند الكشف تندرج الإجابة الصحيحة بوميض أخضر واضح.`,
      },
      visualPoints: [clip(pp2.question.en, 95)],
      narrationEn: `Ready for Challenge Two? Hit pause again and solve this one yourself: ${pp2.question.en} Think about what you just learned in Step 2. Got your answer? Here it is: "${pp2.answer}"! ${pp2.explanation.en}`,
      subtitleAr: `مستعد للتحدي الثاني؟ أوقف الفيديو وجرّب بنفسك: ${pp2.question.ar}. الإجابة هي "${pp2.answer}" — ${pp2.explanation.ar}`,
      pausePredict: pp2,
      highlight: {
        badge: "Active Recall · #2",
        right: pp2.answer,
      },
    },

    // BEAT 6: 3:05 – 4:15 (70s) — STEP 3: REAL-WORLD LIVE WALKTHROUGH + ROADMAP (3 of 3 complete)
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
        en: `3:05–4:15 · Live-sketch walkthrough highlights the target line "${clip(lesson.pronunciation, 60)}" word by word with stress dots and a pronunciation cue, then completes the Progress Roadmap: "Step 3 of 3 complete ✓".`,
        ar: `٣:٠٥–٤:١٥ · عرض تطبيقي حي يظلّل الجملة النموذجية كلمة بكلمة مع إشارات النطق والنبر، ثم يكتمل شريط خريطة التقدم: «اكتملت الخطوة ٣ من ٣ ✓».`,
      },
      visualPoints: [
        `Model: "${clip(lesson.pronunciation, 90)}"`,
        `Voice tip: ${clip(lesson.pronunciationTip.en, 88)}`,
        ...(lesson.vocab?.[0]
          ? [`Keyword: ${lesson.vocab[0].word} = ${lesson.vocab[0].meaningEn}`]
          : []),
      ],
      narrationEn: `Now see how smoothly this sounds in real life. Listen closely to the live model on screen: "${lesson.pronunciation}" Notice the key cue: ${lesson.teaching[1]?.en ?? lesson.pronunciationTip.en} Say it once with me right now so your voice feels the rhythm. Awesome—Step 3 of 3 complete!`,
      subtitleAr: `شاهد كيف يبدو ذلك طبيعيًا في الواقع: "${lesson.pronunciation}". انتبه لهذه الملاحظة: ${lesson.teaching[1]?.ar ?? lesson.pronunciationTip.ar}. ردّدها بصوتك الآن—أحسنت، اكتملت الخطوة ٣ من ٣!`,
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
        en: `4:15–4:30 · Crisp 3-icon summary flashes with all 3 Progress Roadmap stars lit, ending on a golden "Your Takeaway Task" action card.`,
        ar: `٤:١٥–٤:٣٠ · ملخص بصري سريع من ٣ أيقونات مع إضاءة نجوم خريطة التقدم الثلاث، ينتهي ببطاقة «مهمتك التطبيقية السريعة».`,
      },
      visualPoints: [
        `1. Pattern: ${clip(formula, 58)}`,
        `2. Golden Rule: ${clip(memoryTip.en, 62)}`,
        `3. Model: "${clip(lesson.pronunciation, 60)}"`,
      ],
      narrationEn: `Fifteen-second recap: remember "${memoryTip.en}", watch out for the red trap, and use "${lesson.pronunciation}" naturally. Your quick task: ${takeawayTask.en}`,
      subtitleAr: `ملخص ١٥ ثانية: تذكّر (${memoryTip.ar}) وتجنّب الخطأ الشائع. مهمتك السريعة الآن: ${takeawayTask.ar}`,
      takeawayTask,
      highlight: {
        badge: "15-sec Active Summary",
        formula: memoryTip.en,
        right: lesson.pronunciation,
      },
    },
  ];

  const durationSeconds = scenes.reduce((sum, s) => sum + s.durationSeconds, 0); // 270s = 4:30

  return {
    title: {
      en: `Interactive Micro-Lesson Video: ${lesson.title.en}`,
      ar: `فيديو الدرس المصغّر التفاعلي: ${lesson.title.ar}`,
    },
    durationSeconds,
    learningObjective: lesson.goal,
    levelTag,
    presenterNote: {
      en: "4:30 dual-coding micro-lesson with a 15-second hook, visual Progress Roadmap, 2 interactive Pause & Predict challenges, a 15-second active summary, and a two-column storyboard.",
      ar: "درس فيديو مصغّر (٤:٣٠ دقائق) بالترميز المزدوج مع افتتاحية مشوّقة (١٥ ثانية)، وخريطة تقدم مرئية، وتحدّيَي توقّف وتوقّع، وملخص نشط في ١٥ ثانية، وجدول لوحة المشاهد.",
    },
    scenes,
  };
}
