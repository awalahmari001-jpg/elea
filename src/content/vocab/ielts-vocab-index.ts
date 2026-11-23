import type { Bilingual } from "@/content/lesson-types";
import type {
  IeltsParaphraseTask,
  IeltsTopicCategory,
  IeltsVocabCategory,
  IeltsVocabEntry,
} from "./vocab-types";
import { IELTS_VOCAB_PART1 } from "./ielts-vocab-part1";
import { IELTS_VOCAB_PART2 } from "./ielts-vocab-part2";

export const IELTS_VOCABULARY: IeltsVocabEntry[] = [...IELTS_VOCAB_PART1, ...IELTS_VOCAB_PART2];

export const IELTS_CATEGORIES: {
  id: IeltsVocabCategory;
  label: Bilingual;
  description: Bilingual;
}[] = [
  {
    id: "academic",
    label: { en: "Academic Vocabulary", ar: "المفردات الأكاديمية" },
    description: {
      en: "High-precision formal verbs and nouns suited to IELTS Writing Task 1/2 and academic reading.",
      ar: "أفعال وأسماء أكاديمية دقيقة للكتابة والقراءة الأكاديمية في الآيلتس.",
    },
  },
  {
    id: "high-frequency",
    label: { en: "High-Frequency IELTS", ar: "مفردات الآيلتس عالية التكرار" },
    description: {
      en: "Versatile Band 7+ words that appear repeatedly across IELTS Reading, Listening, Writing, and Speaking.",
      ar: "مفردات أساسية تتكرر باستمرار في جميع أقسام اختبار الآيلتس.",
    },
  },
  {
    id: "topic-specific",
    label: { en: "Topic-Specific Vocabulary", ar: "مفردات موضوعية متخصصة" },
    description: {
      en: "Domain-accurate lexical items that show genuine topic mastery without sounding forced.",
      ar: "مصطلحات دقيقة لكل موضوع تبرز عمق معرفتك دون تكلف.",
    },
  },
  {
    id: "collocations",
    label: { en: "Advanced Collocations", ar: "المتلازمات اللفظية المتقدمة" },
    description: {
      en: "Natural word pairings examiners explicitly reward under the IELTS Lexical Resource band descriptors.",
      ar: "تلازمات لفظية طبيعية يبحث عنها الممتحن لتقييم معيار الثروة اللغوية.",
    },
  },
  {
    id: "phrasal-verbs",
    label: { en: "Phrasal Verbs", ar: "الأفعال المركبة" },
    description: {
      en: "Natural multi-word verbs that elevate IELTS Speaking fluency and fit policy/analytical Writing.",
      ar: "أفعال مركبة طبيعية ترفع طلاقة التحدث وتناسب السياق التحليلي.",
    },
  },
  {
    id: "idioms",
    label: { en: "Idiomatic Expressions", ar: "التعابير الاصطلاحية" },
    description: {
      en: "Modern, natural idioms used selectively in Speaking (and explained with formal equivalents for Writing).",
      ar: "تعابير اصطلاحية حديثة للتحدث مع بدائلها الأكاديمية للكتابة.",
    },
  },
  {
    id: "formal-informal",
    label: { en: "Formal & Informal Register", ar: "المستوى الرسمي وغير الرسمي" },
    description: {
      en: "Mastering tone appropriateness: knowing when everyday English beats overly stiff words, and vice versa.",
      ar: "إتقان ملاءمة الأسلوب: متى تستخدم اللغة الرسمية ومتى تكون اليومية أنسب.",
    },
  },
  {
    id: "synonyms",
    label: { en: "Synonyms & Alternatives", ar: "المرادفات والبدائل السياقية" },
    description: {
      en: "Contextual alternatives that prevent repetition while preserving exact nuance.",
      ar: "بدائل سياقية دقيقة تمنع التكرار وتحافظ على دقة المعنى.",
    },
  },
  {
    id: "word-formation",
    label: { en: "Word Formation & Derivations", ar: "الاشتقاق وتكوين الكلمات" },
    description: {
      en: "Controlling noun, verb, adjective, and adverb families cleanly to boost grammatical & lexical accuracy.",
      ar: "إتقان عائلة الكلمة (الاسم والفعل والصفة والظرف) لرفع الدقة اللغوية.",
    },
  },
  {
    id: "commonly-confused",
    label: { en: "Commonly Confused Words", ar: "الكلمات المتشابهة الشائعة الخلط" },
    description: {
      en: "Eliminating Band-6 lexical slips such as affect/effect, economic/economical, imply/infer, and travel/trip.",
      ar: "تجنب أشهر أخطاء الخلط المعجمي مثل affect/effect وeconomic/economical.",
    },
  },
];

export const IELTS_TOPICS: { id: IeltsTopicCategory; label: Bilingual }[] = [
  { id: "education", label: { en: "Education", ar: "التعليم" } },
  { id: "technology-ai", label: { en: "Technology & AI", ar: "التقنية والذكاء الاصطناعي" } },
  { id: "environment-climate", label: { en: "Environment & Climate", ar: "البيئة والمناخ" } },
  { id: "health-lifestyle", label: { en: "Health & Lifestyle", ar: "الصحة ونمط الحياة" } },
  { id: "business-employment", label: { en: "Business & Employment", ar: "الأعمال والتوظيف" } },
  { id: "globalisation", label: { en: "Globalisation", ar: "العولمة" } },
  {
    id: "society-issues",
    label: { en: "Society & Social Issues", ar: "المجتمع والقضايا الاجتماعية" },
  },
  { id: "crime-punishment", label: { en: "Crime & Punishment", ar: "الجريمة والقانون" } },
  {
    id: "government-services",
    label: { en: "Government & Public Services", ar: "الحكومة والخدمات العامة" },
  },
  { id: "culture-traditions", label: { en: "Culture & Traditions", ar: "الثقافة والتقاليد" } },
  { id: "media-advertising", label: { en: "Media & Advertising", ar: "الإعلام والإعلان" } },
  { id: "science-innovation", label: { en: "Science & Innovation", ar: "العلوم والابتكار" } },
  { id: "transport-urbanisation", label: { en: "Transport & Urbanisation", ar: "النقل والتحضر" } },
  { id: "family-relationships", label: { en: "Family & Relationships", ar: "الأسرة والعلاقات" } },
  { id: "tourism-travel", label: { en: "Tourism & Travel", ar: "السياحة والسفر" } },
];

export const IELTS_PARAPHRASING_TASKS: IeltsParaphraseTask[] = [
  {
    id: "para-edu-1",
    topic: "education",
    original:
      "Schools should help students build critical thinking instead of just memorising facts.",
    targetWords: ["foster", "rote learning"],
    modelParaphrase:
      "Schools should foster critical thinking rather than relying heavily on rote learning.",
    explanation: {
      en: "Replaces 'help build' with 'foster' and 'just memorising facts' with the precise collocation 'rote learning'.",
      ar: "استبدال help build بـ foster، واستبدال الحفظ الآلي بالتلازم الدقيق rote learning.",
    },
  },
  {
    id: "para-env-1",
    topic: "environment-climate",
    original:
      "Governments must slowly stop using coal to make the bad effects of climate change smaller.",
    targetWords: ["phase out", "mitigate"],
    modelParaphrase:
      "Governments must gradually phase out coal power to mitigate the adverse effects of climate change.",
    explanation: {
      en: "Combines formal policy phrasal verb 'phase out' with the academic verb 'mitigate'.",
      ar: "يجمع بين phase out (التخلص التدريجي) وmitigate (التخفيف من حدة الأثر).",
    },
  },
  {
    id: "para-health-1",
    topic: "health-lifestyle",
    original:
      "Sitting down all day is very bad for workers' health, so spending on stopping illness early saves money.",
    targetWords: ["sedentary", "detrimental", "preventive"],
    modelParaphrase:
      "Leading a sedentary lifestyle is detrimental to workers' health, making investment in preventive healthcare highly cost-effective.",
    explanation: {
      en: "Upgrades everyday clauses into natural Band 7.5+ academic collocations without sounding artificial.",
      ar: "يحوّل الجملة اليومية إلى تلازمات أكاديمية طبيعية بمستوى ٧.٥+ دون تكلف.",
    },
  },
  {
    id: "para-gov-1",
    topic: "government-services",
    original:
      "Cities should give more money to public buses and trains to make morning traffic jams better.",
    targetWords: ["allocate", "congestion"],
    modelParaphrase:
      "Municipal authorities should allocate greater funding to public transit in order to alleviate peak-hour traffic congestion.",
    explanation: {
      en: "Uses accurate government/urban collocations ('allocate funding to', 'alleviate traffic congestion').",
      ar: "يستخدم تلازمات سياسات المدن الدقيقة: allocate funding to وalleviate traffic congestion.",
    },
  },
  {
    id: "para-media-1",
    topic: "media-advertising",
    original:
      "Fake news spreads fast online because some websites exaggerate stories just to get clicks.",
    targetWords: ["misinformation", "sensationalism"],
    modelParaphrase:
      "Online misinformation proliferates rapidly when commercial outlets prioritise sensationalism over verified reporting.",
    explanation: {
      en: "Replaces informal 'fake news' and 'exaggerate for clicks' with exact media-studies terminology.",
      ar: "يستبدل fake news وexaggerate بمصطلحات إعلامية أكاديمية دقيقة.",
    },
  },
  {
    id: "para-tour-1",
    topic: "tourism-travel",
    original: "Nature trips that protect wildlife help local people and keep old traditions alive.",
    targetWords: ["ecotourism", "preserve"],
    modelParaphrase:
      "Well-regulated ecotourism supports rural livelihoods while helping communities preserve their cultural heritage.",
    explanation: {
      en: "Unifies 'ecotourism' and 'preserve cultural heritage' in a crisp, natural Band 7.5 sentence.",
      ar: "يدمج ecotourism مع preserve cultural heritage في جملة أكاديمية متماسكة.",
    },
  },
];

export const IELTS_SPEAKING_WRITING_PROMPTS = {
  speaking: [
    {
      id: "spk-1",
      topic: "education" as IeltsTopicCategory,
      prompt:
        "Part 3: How can schools encourage creativity without neglecting core academic subjects?",
      suggestedWords: ["curriculum", "foster", "rote learning"],
    },
    {
      id: "spk-2",
      topic: "technology-ai" as IeltsTopicCategory,
      prompt:
        "Part 3: Do you think artificial intelligence has more benefits or risks for everyday workers?",
      suggestedWords: ["automation", "cutting-edge", "a double-edged sword"],
    },
    {
      id: "spk-3",
      topic: "environment-climate" as IeltsTopicCategory,
      prompt: "Part 3: What practical changes should big cities make to protect the environment?",
      suggestedWords: ["mitigate", "sustainable", "phase out", "traffic congestion"],
    },
  ],
  writing: [
    {
      id: "wrt-1",
      task: "Task 2" as const,
      topic: "government-services" as IeltsTopicCategory,
      prompt:
        "Some people argue governments should allocate most public funds to healthcare and infrastructure, while others believe cultural heritage deserves equal support. Write a clear body paragraph (70–120 words).",
      suggestedWords: ["allocate", "subsidise", "cultural heritage", "preserve"],
    },
    {
      id: "wrt-2",
      task: "Task 2" as const,
      topic: "health-lifestyle" as IeltsTopicCategory,
      prompt:
        "Modern work routines are making people less active and more stressed. Explain the main causes and suggest one practical solution (70–120 words).",
      suggestedWords: ["sedentary", "detrimental", "burnout", "preventive"],
    },
    {
      id: "wrt-3",
      task: "Task 1" as const,
      topic: "society-issues" as IeltsTopicCategory,
      prompt:
        "Summarise a chart showing urban broadband speed (92 Mbps) vs. rural broadband speed (28 Mbps) across five provinces, highlighting the gap and recent government investment (60–100 words).",
      suggestedWords: ["disparity", "infrastructure", "allocate", "vulnerable"],
    },
  ],
};
