import type { DetailedRuleGuide, ExplainerVideo, Lesson, VideoScene } from "./lesson-types";

/**
 * Generates an appealing 4-scene AI Animated Explainer Video (strictly <= 240s / 4 minutes max)
 * tailored to each Grammar or Reading lesson's exact rule guide, formulas, mistakes, and examples.
 */
export function buildExplainerVideo(lesson: Lesson, guide: DetailedRuleGuide): ExplainerVideo {
  const isGrammar = lesson.skill === "grammar";
  const courseLabel = lesson.course.toUpperCase();
  const primaryFormula = guide.formulas[0];
  const secondaryFormula = guide.formulas[1];
  const mainMistake = guide.commonMistakes[0];
  const secondMistake = guide.commonMistakes[1];

  // Scene durations sum to 210s (3 min 30 sec) for grammar, 220s (3 min 40 sec) for reading — strictly <= 240s (4 min max).
  const d1 = 45;
  const d2 = isGrammar ? 60 : 65;
  const d3 = 55;
  const d4 = isGrammar ? 50 : 55;
  const totalSeconds = d1 + d2 + d3 + d4; // 210s or 220s (always <= 240s)

  const scene1: VideoScene = {
    id: `${lesson.id}-scene-1`,
    startSeconds: 0,
    durationSeconds: d1,
    layout: "intro",
    chapterLabel: {
      en: isGrammar ? "1. Rule & Real Context" : "1. Reading Mission",
      ar: isGrammar ? "١. القاعدة والسياق" : "١. هدف القراءة",
    },
    headline: lesson.title,
    visualPoints: [lesson.goal.en, lesson.taskPlan?.scenario.en ?? guide.summary.en],
    narrationEn: isGrammar
      ? `Welcome to your ${courseLabel} grammar explainer on ${lesson.title.en}. In the next three and a half minutes, you will master how this rule works in real life. ${guide.summary.en}`
      : `Welcome to your ${courseLabel} reading explainer on ${lesson.title.en}. In under four minutes, we will unlock the reading strategy, key words, and traps to avoid. ${guide.summary.en}`,
    subtitleAr: isGrammar
      ? `مرحبًا بك في شرح قواعد ${courseLabel}: ${lesson.title.ar}. خلال أقل من ٤ دقائق ستتقن هذه القاعدة عمليًا. ${guide.summary.ar}`
      : `مرحبًا بك في شرح قراءة ${courseLabel}: ${lesson.title.ar}. خلال أقل من ٤ دقائق سنتقن استراتيجية القراءة والمفردات الأساسية. ${guide.summary.ar}`,
    highlight: {
      badge: `${courseLabel} · ${isGrammar ? "Grammar Rule" : "Reading Strategy"}`,
    },
  };

  const scene2: VideoScene = {
    id: `${lesson.id}-scene-2`,
    startSeconds: d1,
    durationSeconds: d2,
    layout: "formula",
    chapterLabel: {
      en: isGrammar ? "2. Core Formula" : "2. Language & Structure",
      ar: isGrammar ? "٢. الصيغة والتركيب" : "٢. البنية والمفاتيح",
    },
    headline: {
      en: isGrammar ? "How the Rule Is Built" : "Key Reading Patterns & Clues",
      ar: isGrammar ? "كيف تُبنى القاعدة خطوة بخطوة" : "أنماط القراءة والمفاتيح اللغوية",
    },
    visualPoints: guide.formulas
      .slice(0, 3)
      .map((f) => `${f.label.en}: ${f.pattern} → "${f.example}"`),
    narrationEn: isGrammar
      ? `Let's break down the exact structure. ${guide.whenToUse[0]?.en ?? ""} Notice the main formula: ${primaryFormula?.pattern ?? ""}. For example: ${primaryFormula?.example ?? lesson.pronunciation}.${secondaryFormula ? ` And for ${secondaryFormula.label.en}: ${secondaryFormula.example}` : ""}`
      : `Let's examine the core strategy for this text. ${guide.whenToUse[0]?.en ?? ""} ${guide.whenToUse[1]?.en ?? ""} Look closely at how key words work in context: ${primaryFormula?.example ?? lesson.pronunciation}`,
    subtitleAr: isGrammar
      ? `لنحلّل التركيب بدقة: ${guide.whenToUse[0]?.ar ?? ""} الصيغة الأساسية: ${primaryFormula?.pattern ?? ""} — مثال: ${primaryFormula?.arabic ?? ""}`
      : `تأمّل الاستراتيجية الأساسية لهذا النص: ${guide.whenToUse[0]?.ar ?? ""} ${guide.whenToUse[1]?.ar ?? ""}`,
    highlight: {
      badge: primaryFormula?.label.en ?? "Formula",
      formula: primaryFormula?.pattern ?? lesson.taskPlan?.languageFocus.en ?? lesson.pronunciation,
    },
  };

  const scene3: VideoScene = {
    id: `${lesson.id}-scene-3`,
    startSeconds: d1 + d2,
    durationSeconds: d3,
    layout: "comparison",
    chapterLabel: {
      en: isGrammar ? "3. Common Traps" : "3. Reading Traps",
      ar: isGrammar ? "٣. أخطاء شائعة" : "٣. فخاخ القراءة",
    },
    headline: {
      en: isGrammar ? "Avoid These Classic Mistakes" : "Spot & Avoid Distractor Traps",
      ar: isGrammar ? "تجنّب هذه الأخطاء الشائعة" : "انتبه لهذه الفخاخ الشائعة",
    },
    visualPoints: [
      mainMistake?.why.en ?? guide.whenToUse[1]?.en ?? "",
      ...(secondMistake ? [secondMistake.why.en] : []),
    ].filter(Boolean),
    narrationEn: mainMistake
      ? `Now watch out for the trap learners make most often. Avoid saying or thinking: ${mainMistake.wrong}. Instead, use: ${mainMistake.right}. Why? ${mainMistake.why.en}${secondMistake ? ` Also remember: ${secondMistake.why.en}` : ""}`
      : `Pay close attention to accuracy and context. ${guide.whenToUse.map((w) => w.en).join(" ")}`,
    subtitleAr: mainMistake
      ? `انتبه للخطأ الأكثر شيوعًا: تجنّب (${mainMistake.wrong}) واستخدم بدلًا منها (${mainMistake.right}). السبب: ${mainMistake.why.ar}`
      : guide.whenToUse.map((w) => w.ar).join(" "),
    highlight: {
      ...(mainMistake?.wrong ? { wrong: mainMistake.wrong } : {}),
      ...(mainMistake?.right ? { right: mainMistake.right } : {}),
      badge: isGrammar ? "Wrong vs Right" : "Trap vs Smart Strategy",
    },
  };

  const scene4: VideoScene = {
    id: `${lesson.id}-scene-4`,
    startSeconds: d1 + d2 + d3,
    durationSeconds: d4,
    layout: "practice",
    chapterLabel: {
      en: "4. Memory Tip & Action",
      ar: "٤. الخلاصة والتطبيق",
    },
    headline: {
      en: "Lock It In & Practise 4 Ways",
      ar: "ثبّت القاعدة وتدرّب بـ ٤ أنماط",
    },
    visualPoints: [
      `Model: "${lesson.pronunciation}"`,
      `Golden Tip: ${guide.memoryTip.en}`,
      "Next: Complete Multiple Choice, Pick the Word, Rearrange Words & Make a Fit Sentence!",
    ],
    narrationEn: `Here is your golden takeaway to lock this in: ${guide.memoryTip.en} Listen to our model sentence: ${lesson.pronunciation} Now scroll down and test yourself across all four interactive question types—multiple choice, picking the right word, rearranging words, and building your own fitting sentence!`,
    subtitleAr: `القاعدة الذهبية للحفظ: ${guide.memoryTip.ar} الآن انتقل للأسفل وتدرّب عبر الأنماط الأربعة: الاختيار من متعدد، اختيار الكلمة الصحيحة، ترتيب الكلمات، وتكوين جملة صحيحة ومناسبة!`,
    highlight: {
      badge: "Golden Rule",
      formula: guide.memoryTip.en,
      right: lesson.pronunciation,
    },
  };

  return {
    title: {
      en: isGrammar
        ? `AI Rule Explainer: ${lesson.title.en}`
        : `AI Reading Coach: ${lesson.title.en}`,
      ar: isGrammar
        ? `فيديو شرح القاعدة: ${lesson.title.ar}`
        : `فيديو شرح القراءة: ${lesson.title.ar}`,
    },
    durationSeconds: totalSeconds,
    presenterNote: {
      en: "Animated AI lesson explainer with synchronized English voiceover, visual formulas, common mistake contrasts, and bilingual captions (under 4 minutes).",
      ar: "فيديو شرح تفاعلي بالذكاء الاصطناعي مع تعليق صوتي متزامن وصيغ مرئية ومقارنة الأخطاء الشائعة وترجمة ثنائية اللغة (أقل من ٤ دقائق).",
    },
    scenes: [scene1, scene2, scene3, scene4],
  };
}
