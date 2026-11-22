import type { Locale } from "@/lib/i18n/config";

/**
 * The six CEFR level courses learners can join after (or without) the placement test.
 * To edit a course, change this file only. Every visible string has English + Arabic.
 */
type Localized = Record<Locale, string>;

export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type CefrLevel = (typeof CEFR_LEVELS)[number];

/** URL slug: a level ("a2") or a skills course ("speaking") */
export type CourseSlug = Lowercase<CefrLevel> | "speaking";

export type Course = {
  slug: CourseSlug;
  /** "level" = one of the six CEFR courses, "skill" = a separate skills course (Speaking) */
  kind: "level" | "skill";
  /** Only level courses have a CEFR level */
  level?: CefrLevel;
  /** Badge text shown on the course tile, e.g. "A1" */
  badge: string;
  /** Levels the course suits, shown on skills courses, e.g. "A2 – C2" */
  suitsLevels?: string;
  /** A1–A2 basic, B1–B2 independent, C1–C2 proficient, skill = skills course */
  stage: "basic" | "independent" | "proficient" | "skill";
  name: Localized;
  summary: Localized;
  canDo: Localized[];
  topics: Localized[];
};

export const COURSES: Course[] = [
  {
    kind: "level",
    level: "A1",
    badge: "A1",
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
    kind: "level",
    level: "A2",
    badge: "A2",
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
    kind: "level",
    level: "B1",
    badge: "B1",
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
    kind: "level",
    level: "B2",
    badge: "B2",
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
    kind: "level",
    level: "C1",
    badge: "C1",
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
    kind: "level",
    level: "C2",
    badge: "C2",
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

/** Separate skills course, open to learners from A2 upwards. */
export const SPEAKING_COURSE: Course = {
  kind: "skill",
  slug: "speaking",
  badge: "SP",
  suitsLevels: "A2 – C2",
  stage: "skill",
  name: { en: "Speaking", ar: "المحادثة" },
  summary: {
    en: "A dedicated speaking course: pronunciation, fluency and real conversations, with AI feedback.",
    ar: "دورة مخصّصة للمحادثة: النطق والطلاقة والمحادثات الحقيقية، مع ملاحظات بالذكاء الاصطناعي.",
  },
  canDo: [
    { en: "Pronounce English sounds clearly and naturally", ar: "نطق الأصوات الإنجليزية بوضوح وبشكل طبيعي" },
    { en: "Keep a conversation going without long pauses", ar: "مواصلة المحادثة دون توقّف طويل" },
    { en: "Speak confidently in interviews, meetings and IELTS Speaking", ar: "التحدّث بثقة في المقابلات والاجتماعات ومحادثة الآيلتس" },
  ],
  topics: [
    { en: "Sounds Arabic speakers find hard (p/b, v/f, th)", ar: "الأصوات الصعبة على الناطقين بالعربية (p/b و v/f و th)" },
    { en: "Stress, rhythm & intonation", ar: "النبر والإيقاع والتنغيم" },
    { en: "Everyday & work conversations", ar: "محادثات يومية ومهنية" },
    { en: "IELTS Speaking parts 1–3", ar: "أجزاء محادثة الآيلتس ١–٣" },
  ],
};

/** Every course a learner can join: six level courses + the Speaking course. */
export const ALL_COURSES: Course[] = [...COURSES, SPEAKING_COURSE];

export function isCourseSlug(value: string): value is CourseSlug {
  return ALL_COURSES.some((c) => c.slug === value);
}

export function getCourse(level: CefrLevel): Course {
  const course = COURSES.find((c) => c.level === level);
  if (!course) throw new Error(`Unknown course level: ${level}`);
  return course;
}

export function getCourseBySlug(slug: CourseSlug): Course {
  const course = ALL_COURSES.find((c) => c.slug === slug);
  if (!course) throw new Error(`Unknown course: ${slug}`);
  return course;
}
