import type { GrammarModuleMeta, GrammarUnit } from "./grammar-curriculum-types";
import { GRAMMAR_UNITS_PART1 } from "./grammar-units-part1";
import { GRAMMAR_UNITS_PART2 } from "./grammar-units-part2";

export const GRAMMAR_MODULES: GrammarModuleMeta[] = [
  {
    id: "parts-of-speech",
    order: 1,
    levelRange: "A1–B1",
    icon: "🧱",
    title: {
      en: "1. Foundations & Parts of Speech",
      ar: "١. الأساسيات وأقسام الكلام",
    },
    description: {
      en: "Nouns, pronouns, articles, adjectives, adverbs, and core English sentence order.",
      ar: "الأسماء والضمائر وأدوات التعريف والصفات والظروف وترتيب الجملة الإنجليزية الأساسي.",
    },
  },
  {
    id: "verb-tenses",
    order: 2,
    levelRange: "A1–C1",
    icon: "⏱️",
    title: {
      en: "2. All 12 English Verb Tenses",
      ar: "٢. جميع الأزمنة الإنجليزية الـ١٢",
    },
    description: {
      en: "Complete sequential mastery of every Present, Past, and Future simple, continuous, and perfect tense.",
      ar: "إتقان تدرّجي كامل لجميع أزمنة المضارع والماضي والمستقبل البسيطة والمستمرة والتامة.",
    },
  },
  {
    id: "modals",
    order: 3,
    levelRange: "A1–C1",
    icon: "🔑",
    title: {
      en: "3. Modal Verbs & Semi-Modals",
      ar: "٣. الأفعال الناقصة (Modals)",
    },
    description: {
      en: "Ability, permission, obligation, advice, logical deduction, and past modals of speculation & regret.",
      ar: "القدرة والإذن والإلزام والنصيحة والاستنتاج المنطقي والأفعال الناقصة في الماضي.",
    },
  },
  {
    id: "passive-causative",
    order: 4,
    levelRange: "B1–C1",
    icon: "🔄",
    title: {
      en: "4. Passive Voice & Causatives",
      ar: "٤. المبني للمجهول والسببية (Causatives)",
    },
    description: {
      en: "Passive structures across tenses and modals, academic reporting passives, and have/get something done.",
      ar: "صياغة المبني للمجهول عبر الأزمنة والأفعال الناقصة والأسلوب الأكاديمي والسببية.",
    },
  },
  {
    id: "conditionals-wishes",
    order: 5,
    levelRange: "A2–C1",
    icon: "🔀",
    title: {
      en: "5. Conditionals & Wishes",
      ar: "٥. الجمل الشرطية والتمنّي",
    },
    description: {
      en: "Zero, First, Second, Third, and Mixed Conditionals plus wish, if only, and would rather.",
      ar: "حالات الشرط الصفرية والأولى والثانية والثالثة والمختلطة، بالإضافة إلى التمني والتفضيل.",
    },
  },
  {
    id: "reported-speech",
    order: 6,
    levelRange: "B1–B2",
    icon: "💬",
    title: {
      en: "6. Reported (Indirect) Speech",
      ar: "٦. الكلام المنقول (غير المباشر)",
    },
    description: {
      en: "Tense backshift, reported questions, commands, and advanced reporting verbs.",
      ar: "تحويل الأزمنة والضمائر، ونقل الأسئلة والأوامر، وأفعال النقل المتقدمة.",
    },
  },
  {
    id: "clauses-complex",
    order: 7,
    levelRange: "B1–C1",
    icon: "🧩",
    title: {
      en: "7. Clauses & Complex Sentences",
      ar: "٧. الجمل الفرعية والمركّبة",
    },
    description: {
      en: "Relative clauses, reduced participle clauses, noun clauses, adverbial clauses, and cleft emphasis.",
      ar: "جمل الوصل والمختصرة، والجمل الاسمية والظرفية، وجمل التوكيد (Cleft Sentences).",
    },
  },
  {
    id: "gerunds-infinitives",
    order: 8,
    levelRange: "B1–B2",
    icon: "⚙️",
    title: {
      en: "8. Gerunds, Infinitives & Verb Patterns",
      ar: "٨. المصدر (-ing و to) وأنماط الأفعال",
    },
    description: {
      en: "When to use -ing vs. to-infinitive, meaning-changing verbs, and used to / be used to.",
      ar: "متى نستخدم -ing مقابل to، والأفعال التي يتغير معناها، والفرق بين used to وbe used to.",
    },
  },
  {
    id: "prepositions-phrasals",
    order: 9,
    levelRange: "A1–B2",
    icon: "🧭",
    title: {
      en: "9. Prepositions & Phrasal Verbs",
      ar: "٩. حروف الجر والأفعال المركّبة",
    },
    description: {
      en: "Prepositions of time, place, and movement, fixed collocations, and separable/inseparable phrasal verbs.",
      ar: "حروف الجر للزمان والمكان والحركة، والتلازمات الثابتة، والأفعال المركّبة.",
    },
  },
  {
    id: "comparatives-quantifiers",
    order: 10,
    levelRange: "A2–B2",
    icon: "⚖️",
    title: {
      en: "10. Comparatives, Quantifiers & Determiners",
      ar: "١٠. المقارنة والتفضيل والمحدّدات والكميات",
    },
    description: {
      en: "Comparatives, superlatives, much/many/few/little, and distributives (both, either, neither, each, every).",
      ar: "صيغ المقارنة والتفضيل، وألفاظ الكمية، وأدوات التحديد والتوزيع.",
    },
  },
  {
    id: "agreement-tags-conjunctions",
    order: 11,
    levelRange: "A2–B2",
    icon: "🔗",
    title: {
      en: "11. Agreement, Question Tags & Conjunctions",
      ar: "١١. توافق الفاعل والفعل والأسئلة المذيّلة والروابط",
    },
    description: {
      en: "Tricky subject-verb agreement rules, question tags, short agreements, and correlative conjunctions.",
      ar: "قواعد توافق الفاعل والفعل، والأسئلة المذيّلة، والموافقة المختصرة، وروابط الجمل.",
    },
  },
  {
    id: "advanced-mastery",
    order: 12,
    levelRange: "C1–C2",
    icon: "🏆",
    title: {
      en: "12. Advanced Mastery Structures (C1–C2)",
      ar: "١٢. التراكيب المتقدمة للإتقان (C1–C2)",
    },
    description: {
      en: "Negative and conditional inversion, the formal subjunctive mood, ellipsis, and discourse cohesion.",
      ar: "القلب النحوي (Inversion)، وصيغة الوجوب الرسمية (Subjunctive)، والحذف والتماسك المتقدم.",
    },
  },
];

export const COMPLETE_GRAMMAR_UNITS: GrammarUnit[] = [
  ...GRAMMAR_UNITS_PART1,
  ...GRAMMAR_UNITS_PART2,
].sort((a, b) => a.order - b.order);
