import kidsImage from "@/assets/path-kids.webp";
import adultsImage from "@/assets/path-adults.webp";
import ieltsImage from "@/assets/path-ielts.webp";
import type { Locale } from "@/lib/i18n/config";

/**
 * Learning-path content. To add or edit a path or level, change this file only.
 * Every visible string has an English and an Arabic version.
 */
type Localized = Record<Locale, string>;

export type LevelKey = "beginner" | "intermediate" | "advanced";
export type PathId = "kids" | "adults" | "ielts";

export type PathLevel = {
  key: LevelKey;
  /** CEFR range or IELTS band shown as a badge */
  range: string;
  goals: Localized[];
};

export type LearningPath = {
  id: PathId;
  to: "/kids" | "/adults" | "/ielts";
  image: string;
  /** Kids path uses the brighter "kids" look */
  theme: "default" | "kids";
  audience: Localized;
  name: Localized;
  tagline: Localized;
  description: Localized;
  levels: PathLevel[];
};

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: "kids",
    to: "/kids",
    image: kidsImage,
    theme: "kids",
    audience: { en: "Ages 6–12", ar: "من ٦ إلى ١٢ سنة" },
    name: { en: "Kids", ar: "الأطفال" },
    tagline: { en: "Play, sing and learn", ar: "العب وغنِّ وتعلّم" },
    description: {
      en: "Colourful, game-like lessons with pictures, songs and big friendly buttons.",
      ar: "دروس ملوّنة تشبه الألعاب، مع صور وأغانٍ وأزرار كبيرة سهلة.",
    },
    levels: [
      {
        key: "beginner",
        range: "Pre-A1 – A1",
        goals: [
          { en: "Alphabet, numbers and colours", ar: "الحروف والأرقام والألوان" },
          { en: "Say hello and talk about yourself", ar: "التحية والتعريف بنفسك" },
          { en: "First 200 picture words", ar: "أول ٢٠٠ كلمة بالصور" },
        ],
      },
      {
        key: "intermediate",
        range: "A1 – A2",
        goals: [
          { en: "Family, school and animals", ar: "العائلة والمدرسة والحيوانات" },
          { en: "Short stories with questions", ar: "قصص قصيرة مع أسئلة" },
          { en: "Simple sentences in the present", ar: "جمل بسيطة في المضارع" },
        ],
      },
      {
        key: "advanced",
        range: "A2 – B1",
        goals: [
          { en: "Read and retell longer stories", ar: "قراءة قصص أطول وإعادة سردها" },
          { en: "Past tense and describing events", ar: "الماضي ووصف الأحداث" },
          { en: "Write a short paragraph", ar: "كتابة فقرة قصيرة" },
        ],
      },
    ],
  },
  {
    id: "adults",
    to: "/adults",
    image: adultsImage,
    theme: "default",
    audience: { en: "Adults", ar: "للكبار" },
    name: { en: "Adults", ar: "الكبار" },
    tagline: { en: "English for real life", ar: "إنجليزية للحياة الحقيقية" },
    description: {
      en: "Practical English for work, travel and everyday conversations.",
      ar: "إنجليزية عملية للعمل والسفر والمحادثات اليومية.",
    },
    levels: [
      {
        key: "beginner",
        range: "A1 – A2",
        goals: [
          { en: "Introduce yourself and make small talk", ar: "التعريف بنفسك والمحادثة البسيطة" },
          { en: "Shopping, directions and restaurants", ar: "التسوّق والاتجاهات والمطاعم" },
          { en: "Core grammar with Arabic explanations", ar: "القواعد الأساسية بشرح عربي" },
        ],
      },
      {
        key: "intermediate",
        range: "B1 – B2",
        goals: [
          { en: "Emails, meetings and phone calls", ar: "الرسائل والاجتماعات والمكالمات" },
          { en: "Travel, airports and hotels", ar: "السفر والمطارات والفنادق" },
          { en: "Express opinions clearly", ar: "التعبير عن رأيك بوضوح" },
        ],
      },
      {
        key: "advanced",
        range: "C1 – C2",
        goals: [
          { en: "Presentations and negotiations", ar: "العروض التقديمية والتفاوض" },
          { en: "Idioms and natural expressions", ar: "التعابير الاصطلاحية والطبيعية" },
          { en: "Professional writing", ar: "الكتابة المهنية" },
        ],
      },
    ],
  },
  {
    id: "ielts",
    to: "/ielts",
    image: ieltsImage,
    theme: "default",
    audience: { en: "Exam students", ar: "لطلاب الاختبار" },
    name: { en: "IELTS", ar: "آيلتس" },
    tagline: { en: "Reach your target band", ar: "حقّق الدرجة التي تريدها" },
    description: {
      en: "Listening, Reading, Writing and Speaking practice with mock tests and band-score feedback.",
      ar: "تدريب على الاستماع والقراءة والكتابة والمحادثة مع اختبارات تجريبية وتقييم بالدرجات.",
    },
    levels: [
      {
        key: "beginner",
        range: "Band 4 – 5",
        goals: [
          { en: "Understand the test format", ar: "فهم شكل الاختبار" },
          { en: "Key exam vocabulary", ar: "مفردات الاختبار الأساسية" },
          { en: "Short Speaking Part 1 answers", ar: "إجابات قصيرة للجزء الأول من المحادثة" },
        ],
      },
      {
        key: "intermediate",
        range: "Band 5.5 – 6.5",
        goals: [
          { en: "Writing Task 1 and Task 2 structure", ar: "بناء المهمة الأولى والثانية في الكتابة" },
          { en: "Reading strategies for timing", ar: "استراتيجيات القراءة وإدارة الوقت" },
          { en: "Speaking Part 2 cue cards", ar: "بطاقات الجزء الثاني من المحادثة" },
        ],
      },
      {
        key: "advanced",
        range: "Band 7+",
        goals: [
          { en: "Full mock tests under time", ar: "اختبارات تجريبية كاملة بوقت محدد" },
          { en: "Advanced vocabulary and cohesion", ar: "مفردات متقدمة وترابط الأفكار" },
          { en: "Band-score feedback on essays", ar: "تقييم المقالات بنظام الدرجات" },
        ],
      },
    ],
  },
];

export function getPath(id: PathId): LearningPath {
  const path = LEARNING_PATHS.find((p) => p.id === id);
  if (!path) throw new Error(`Unknown learning path: ${id}`);
  return path;
}
