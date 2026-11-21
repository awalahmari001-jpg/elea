import type { Locale } from "@/lib/i18n/config";

/**
 * The six CEFR level courses learners can join after (or without) the placement test.
 * To edit a course, change this file only. Every visible string has English + Arabic.
 */
type Localized = Record<Locale, string>;

export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type CefrLevel = (typeof CEFR_LEVELS)[number];

/** URL slug for a level, e.g. "A2" -> "a2" */
export type CourseSlug = Lowercase<CefrLevel>;

export type Course = {
  level: CefrLevel;
  slug: CourseSlug;
  /** A1–A2 basic, B1–B2 independent, C1–C2 proficient */
  stage: "basic" | "independent" | "proficient";
  name: Localized;
  summary: Localized;
  canDo: Localized[];
  topics: Localized[];
};

export const COURSES: Course[] = [
  {
    level: "A1",
    slug: "a1",
    stage: "basic",
    name: { en: "Beginner", ar: "مبتدئ" },
    summary: {
      en: "Start from zero: everyday words, simple sentences and basic conversations.",
      ar: "ابدأ من الصفر: كلمات يومية وجمل بسيطة ومحادثات أساسية.",
    },
    canDo: [
      { en: "Introduce yourself and others", ar: "التعريف بنفسك وبالآخرين" },
      { en: "Ask and answer simple personal questions", ar: "طرح أسئلة شخصية بسيطة والإجابة عنها" },
      { en: "Understand familiar words and very basic phrases", ar: "فهم الكلمات المألوفة والعبارات الأساسية جدًا" },
    ],
    topics: [
      { en: "Alphabet & numbers", ar: "الحروف والأرقام" },
      { en: "Verb “to be”", ar: "فعل الكينونة (to be)" },
      { en: "Family & home", ar: "العائلة والمنزل" },
      { en: "Present simple", ar: "المضارع البسيط" },
    ],
  },
  {
    level: "A2",
    slug: "a2",
    stage: "basic",
    name: { en: "Elementary", ar: "ما قبل المتوسط" },
    summary: {
      en: "Handle daily situations: shopping, directions, and talking about your past.",
      ar: "تعامل مع المواقف اليومية: التسوّق والاتجاهات والحديث عن الماضي.",
    },
    canDo: [
      { en: "Describe your background and routine", ar: "وصف خلفيتك وروتينك اليومي" },
      { en: "Communicate in simple, routine tasks", ar: "التواصل في المهام اليومية البسيطة" },
      { en: "Understand short, clear messages and notices", ar: "فهم الرسائل والإعلانات القصيرة الواضحة" },
    ],
    topics: [
      { en: "Past simple", ar: "الماضي البسيط" },
      { en: "Comparatives & superlatives", ar: "المقارنة والتفضيل" },
      { en: "Shopping & travel", ar: "التسوّق والسفر" },
      { en: "Present perfect basics", ar: "أساسيات المضارع التام" },
    ],
  },
  {
    level: "B1",
    slug: "b1",
    stage: "independent",
    name: { en: "Intermediate", ar: "متوسط" },
    summary: {
      en: "Speak with growing confidence about work, travel, opinions and plans.",
      ar: "تحدّث بثقة متزايدة عن العمل والسفر والآراء والخطط.",
    },
    canDo: [
      { en: "Deal with most situations while travelling", ar: "التعامل مع معظم المواقف أثناء السفر" },
      { en: "Describe experiences, hopes and ambitions", ar: "وصف التجارب والآمال والطموحات" },
      { en: "Give short reasons for your opinions", ar: "تقديم أسباب مختصرة لآرائك" },
    ],
    topics: [
      { en: "Conditionals 0, 1 & 2", ar: "الجمل الشرطية ٠ و١ و٢" },
      { en: "Passive voice", ar: "المبني للمجهول" },
      { en: "Reported speech", ar: "الكلام المنقول" },
      { en: "Work & study", ar: "العمل والدراسة" },
    ],
  },
  {
    level: "B2",
    slug: "b2",
    stage: "independent",
    name: { en: "Upper-Intermediate", ar: "فوق المتوسط" },
    summary: {
      en: "Discuss complex topics fluently and write clear, detailed texts.",
      ar: "ناقش مواضيع معقدة بطلاقة واكتب نصوصًا واضحة ومفصّلة.",
    },
    canDo: [
      { en: "Talk fluently with native speakers", ar: "التحدث بطلاقة مع الناطقين الأصليين" },
      { en: "Understand the main ideas of complex texts", ar: "فهم الأفكار الرئيسية للنصوص المعقدة" },
      { en: "Explain a viewpoint with pros and cons", ar: "شرح وجهة نظر مع المزايا والعيوب" },
    ],
    topics: [
      { en: "Third & mixed conditionals", ar: "الشرطية الثالثة والمختلطة" },
      { en: "Gerunds & infinitives", ar: "المصدر وصيغة -ing" },
      { en: "Phrasal verbs", ar: "الأفعال المركّبة" },
      { en: "Essays & reports", ar: "المقالات والتقارير" },
    ],
  },
  {
    level: "C1",
    slug: "c1",
    stage: "proficient",
    name: { en: "Advanced", ar: "متقدم" },
    summary: {
      en: "Use English flexibly for academic and professional life.",
      ar: "استخدم الإنجليزية بمرونة في الحياة الأكاديمية والمهنية.",
    },
    canDo: [
      { en: "Express ideas fluently without searching for words", ar: "التعبير عن الأفكار بطلاقة دون البحث عن الكلمات" },
      { en: "Understand long, demanding texts and implied meaning", ar: "فهم النصوص الطويلة والمعاني الضمنية" },
      { en: "Write well-structured, detailed texts", ar: "كتابة نصوص مفصّلة ومنظّمة جيدًا" },
    ],
    topics: [
      { en: "Inversion for emphasis", ar: "التقديم والتأخير للتوكيد" },
      { en: "Advanced vocabulary & collocations", ar: "مفردات متقدمة وتلازمات لفظية" },
      { en: "Presentations & debates", ar: "العروض والمناظرات" },
      { en: "Academic writing", ar: "الكتابة الأكاديمية" },
    ],
  },
  {
    level: "C2",
    slug: "c2",
    stage: "proficient",
    name: { en: "Proficiency", ar: "إتقان" },
    summary: {
      en: "Master subtle meaning, style and precision — near-native English.",
      ar: "أتقن المعاني الدقيقة والأسلوب والدقة — إنجليزية قريبة من الناطق الأصلي.",
    },
    canDo: [
      { en: "Understand virtually everything you hear or read", ar: "فهم كل ما تسمعه أو تقرؤه تقريبًا" },
      { en: "Express yourself precisely, with fine shades of meaning", ar: "التعبير بدقة مع فروق المعنى الدقيقة" },
      { en: "Summarise and argue from many sources", ar: "التلخيص والمناقشة من مصادر متعددة" },
    ],
    topics: [
      { en: "Idioms & register", ar: "التعابير الاصطلاحية ومستويات اللغة" },
      { en: "Subjunctive & formal style", ar: "صيغة الالتماس والأسلوب الرسمي" },
      { en: "Literary & critical reading", ar: "القراءة الأدبية والنقدية" },
      { en: "Persuasive writing", ar: "الكتابة الإقناعية" },
    ],
  },
];

export function isCourseSlug(value: string): value is CourseSlug {
  return COURSES.some((c) => c.slug === value);
}

export function getCourse(level: CefrLevel): Course {
  const course = COURSES.find((c) => c.level === level);
  if (!course) throw new Error(`Unknown course level: ${level}`);
  return course;
}

export function getCourseBySlug(slug: CourseSlug): Course {
  const course = COURSES.find((c) => c.slug === slug);
  if (!course) throw new Error(`Unknown course: ${slug}`);
  return course;
}
