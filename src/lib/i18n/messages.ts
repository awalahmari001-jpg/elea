import { SITE } from "@/config/site";
import type { Locale } from "./config";

/**
 * All interface text, in English and Arabic.
 * The Arabic dictionary must have exactly the same keys as English —
 * TypeScript will complain if one is missing.
 */
const en = {
  meta: {
    homeTitle: `${SITE.name} — English for Arabic speakers`,
    homeDescription:
      "Learn English step by step with lessons, flashcards, pronunciation practice and an AI writing coach. Paths for kids, adults and IELTS.",
    kidsTitle: `English for Kids (6–12) — ${SITE.name}`,
    kidsDescription:
      "Playful English lessons for children aged 6 to 12, with games, pictures and Arabic support.",
    adultsTitle: `Practical English for Adults — ${SITE.name}`,
    adultsDescription:
      "Everyday English for work, travel and daily life, from beginner to advanced.",
    ieltsTitle: `IELTS Preparation — ${SITE.name}`,
    ieltsDescription:
      "Practise IELTS Listening, Reading, Writing and Speaking with band-score feedback.",
  },
  nav: {
    skipToContent: "Skip to content",
    home: "Home",
    paths: "Learning paths",
    kids: "Kids",
    adults: "Adults",
    ielts: "IELTS",
    openMenu: "Open menu",
    menuTitle: "Menu",
    languageLabel: "Language",
    themeToDark: "Switch to dark mode",
    themeToLight: "Switch to light mode",
    signIn: "Sign in",
    soon: "Soon",
  },
  hero: {
    eyebrow: "For Arabic speakers · A1 to C2",
    titleStart: "Speak English with",
    titleHighlight: "confidence",
    titleEnd: ", one easy step at a time.",
    subtitle:
      "Clear lessons, smart flashcards, pronunciation practice and an AI writing coach — with Arabic explanations whenever you need them.",
    ctaPaths: "Choose your path",
    ctaPlacement: "Placement test",
    soon: "Coming soon",
    statPaths: "learning paths",
    statLevels: "CEFR levels",
    statArabic: "Arabic support",
    chipPronunciation: "Pronunciation",
    chipBand: "IELTS band",
    imageAlt: "A mother and her daughter reading an English book together",
  },
  paths: {
    eyebrow: "Learning paths",
    title: "Where would you like to start?",
    subtitle:
      "Pick the path that fits you. Each one has Beginner, Intermediate and Advanced levels.",
    explore: "Explore path",
    ages: "Ages",
  },
  levels: {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  },
  features: {
    eyebrow: "Everything in one place",
    title: "Built to make English feel easy",
    lessonsTitle: "Structured lessons",
    lessonsBody: "Clear goals, simple explanations and real examples for every level.",
    flashcardsTitle: "Smart flashcards",
    flashcardsBody: "Words with Arabic meaning and audio. Hard words come back more often.",
    pronunciationTitle: "Pronunciation check",
    pronunciationBody: "Read aloud, get a score and see exactly which words to fix.",
    writingTitle: "AI writing coach",
    writingBody: "Write in English or Arabic and get friendly corrections in both languages.",
    listeningTitle: "Listening & quizzes",
    listeningBody: "Audio clips and quick quizzes with instant feedback.",
    progressTitle: "Progress tracking",
    progressBody: "Streaks, scores and charts that show how far you've come.",
  },
  placement: {
    title: "Not sure which level you are?",
    body: "A short placement test will recommend the best starting level for you.",
    cta: "Coming soon",
  },
  pathPage: {
    backHome: "Back to home",
    levelsTitle: "Levels in this path",
    levelsSubtitle: "Move up when you're ready. Lessons are being added in the next update.",
    whatYouLearn: "What you'll learn",
    lessonsSoon: "Lessons coming soon",
    otherPaths: "Other paths",
  },
  footer: {
    about:
      "An English academy for Arabic speakers — kids, adults and IELTS students, from A1 to C2.",
    pathsTitle: "Learning paths",
    languageTitle: "Language",
    rights: "All rights reserved.",
  },
};

export type Messages = typeof en;

const ar: Messages = {
  meta: {
    homeTitle: `${SITE.name} — الإنجليزية للناطقين بالعربية`,
    homeDescription:
      "تعلّم الإنجليزية خطوة بخطوة مع دروس وبطاقات مفردات وتدريب على النطق ومدرّب كتابة بالذكاء الاصطناعي. مسارات للأطفال والكبار والآيلتس.",
    kidsTitle: `الإنجليزية للأطفال (٦–١٢) — ${SITE.name}`,
    kidsDescription: "دروس إنجليزية ممتعة للأطفال من ٦ إلى ١٢ سنة، مع ألعاب وصور ودعم بالعربية.",
    adultsTitle: `الإنجليزية العملية للكبار — ${SITE.name}`,
    adultsDescription: "إنجليزية يومية للعمل والسفر والحياة، من المبتدئ إلى المتقدم.",
    ieltsTitle: `التحضير للآيلتس — ${SITE.name}`,
    ieltsDescription: "تدرّب على الاستماع والقراءة والكتابة والمحادثة في الآيلتس مع تقييم بنظام الدرجات.",
  },
  nav: {
    skipToContent: "انتقل إلى المحتوى",
    home: "الرئيسية",
    paths: "مسارات التعلّم",
    kids: "الأطفال",
    adults: "الكبار",
    ielts: "آيلتس",
    openMenu: "فتح القائمة",
    menuTitle: "القائمة",
    languageLabel: "اللغة",
    themeToDark: "التبديل إلى الوضع الداكن",
    themeToLight: "التبديل إلى الوضع الفاتح",
    signIn: "تسجيل الدخول",
    soon: "قريبًا",
  },
  hero: {
    eyebrow: "للناطقين بالعربية · من A1 إلى C2",
    titleStart: "تحدّث الإنجليزية",
    titleHighlight: "بثقة",
    titleEnd: "، خطوة سهلة في كل مرة.",
    subtitle:
      "دروس واضحة، وبطاقات مفردات ذكية، وتدريب على النطق، ومدرّب كتابة بالذكاء الاصطناعي — مع شرح بالعربية متى احتجت إليه.",
    ctaPaths: "اختر مسارك",
    ctaPlacement: "اختبار تحديد المستوى",
    soon: "قريبًا",
    statPaths: "مسارات تعلّم",
    statLevels: "مستويات CEFR",
    statArabic: "دعم بالعربية",
    chipPronunciation: "النطق",
    chipBand: "درجة الآيلتس",
    imageAlt: "أم وابنتها تقرآن كتابًا إنجليزيًا معًا",
  },
  paths: {
    eyebrow: "مسارات التعلّم",
    title: "من أين تحب أن تبدأ؟",
    subtitle: "اختر المسار المناسب لك. لكل مسار ثلاثة مستويات: مبتدئ ومتوسط ومتقدم.",
    explore: "استكشف المسار",
    ages: "الأعمار",
  },
  levels: {
    beginner: "مبتدئ",
    intermediate: "متوسط",
    advanced: "متقدم",
  },
  features: {
    eyebrow: "كل ما تحتاجه في مكان واحد",
    title: "صُمّم ليجعل الإنجليزية سهلة",
    lessonsTitle: "دروس منظّمة",
    lessonsBody: "أهداف واضحة وشرح بسيط وأمثلة حقيقية لكل مستوى.",
    flashcardsTitle: "بطاقات مفردات ذكية",
    flashcardsBody: "كلمات مع معناها بالعربية ونطقها. الكلمات الصعبة تتكرر أكثر.",
    pronunciationTitle: "فحص النطق",
    pronunciationBody: "اقرأ بصوت عالٍ، واحصل على درجة، واعرف الكلمات التي تحتاج تحسينًا.",
    writingTitle: "مدرّب الكتابة الذكي",
    writingBody: "اكتب بالإنجليزية أو العربية واحصل على تصحيحات واضحة باللغتين.",
    listeningTitle: "الاستماع والاختبارات",
    listeningBody: "مقاطع صوتية واختبارات قصيرة مع تصحيح فوري.",
    progressTitle: "متابعة التقدّم",
    progressBody: "أيام متتالية ودرجات ورسوم بيانية توضّح تقدّمك.",
  },
  placement: {
    title: "لست متأكدًا من مستواك؟",
    body: "اختبار قصير لتحديد المستوى سيقترح عليك أفضل مستوى للبداية.",
    cta: "قريبًا",
  },
  pathPage: {
    backHome: "العودة إلى الرئيسية",
    levelsTitle: "مستويات هذا المسار",
    levelsSubtitle: "انتقل للمستوى التالي عندما تكون مستعدًا. تُضاف الدروس في التحديث القادم.",
    whatYouLearn: "ماذا ستتعلّم",
    lessonsSoon: "الدروس قريبًا",
    otherPaths: "مسارات أخرى",
  },
  footer: {
    about: "أكاديمية لتعليم الإنجليزية للناطقين بالعربية — للأطفال والكبار وطلاب الآيلتس، من A1 إلى C2.",
    pathsTitle: "مسارات التعلّم",
    languageTitle: "اللغة",
    rights: "جميع الحقوق محفوظة.",
  },
};

export const messages: Record<Locale, Messages> = { en, ar };
