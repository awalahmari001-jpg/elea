import type { CefrLevel } from "@/content/courses";
import type { Bilingual } from "@/content/lesson-types";

export type GlossaryCategoryId = "cefr" | "ielts" | "business" | "grammar";

export interface GlossaryEntry {
  id: string;
  term: string;
  ipa: string;
  arabic: string;
  level: CefrLevel;
  category: GlossaryCategoryId;
  definition: Bilingual;
  example: string;
}

export interface GrammarQuickCard {
  id: string;
  level: CefrLevel;
  title: Bilingual;
  formula: string;
  useWhen: Bilingual;
  commonMistake: { wrong: string; right: string; note: Bilingual };
  practiceTo: "/cefr-mastery" | "/courses" | "/self-learning" | "/ielts";
}

export interface PrintableStudyGuide {
  id: string;
  emoji: string;
  audience: Bilingual;
  title: Bilingual;
  summary: Bilingual;
  checklist: Bilingual[];
  relatedTo: "/courses" | "/ielts" | "/business" | "/kids";
}

export const GLOSSARY_ENTRIES: GlossaryEntry[] = [
  {
    id: "gl-mitigate",
    term: "mitigate",
    ipa: "/ˈmɪt.ɪ.ɡeɪt/",
    arabic: "يخفّف / يقلّل من أثر",
    level: "C1",
    category: "ielts",
    definition: {
      en: "To make something harmful, unpleasant, or bad less severe or serious.",
      ar: "جعل أمر سلبي أو خطر أقل حدة أو ضررًا.",
    },
    example: "Governments must invest in public transit to mitigate urban air pollution.",
  },
  {
    id: "gl-ubiquitous",
    term: "ubiquitous",
    ipa: "/juːˈbɪk.wɪ.təs/",
    arabic: "منتشر في كل مكان",
    level: "C1",
    category: "ielts",
    definition: {
      en: "Seeming to be everywhere at the same time.",
      ar: "موجود ومنتشر في كل مكان تقريبًا.",
    },
    example: "Smartphones have become ubiquitous in modern classrooms and workplaces.",
  },
  {
    id: "gl-sustainable",
    term: "sustainable",
    ipa: "/səˈsteɪ.nə.bəl/",
    arabic: "مستدام",
    level: "B2",
    category: "ielts",
    definition: {
      en: "Able to continue over a long time without harming natural resources.",
      ar: "قادر على الاستمرار طويلًا دون الإضرار بالموارد الطبيعية.",
    },
    example: "Solar energy offers a sustainable alternative to fossil fuels.",
  },
  {
    id: "gl-empirical",
    term: "empirical evidence",
    ipa: "/ɪmˈpɪr.ɪ.kəl ˈev.ɪ.dəns/",
    arabic: "دليل تجريبي / عملي",
    level: "C1",
    category: "ielts",
    definition: {
      en: "Information gathered through direct observation or scientific experiment.",
      ar: "معلومات مستندة إلى الملاحظة المباشرة والتجربة العلمية.",
    },
    example: "Policy reforms should be supported by strong empirical evidence.",
  },
  {
    id: "gl-deliverable",
    term: "deliverable",
    ipa: "/dɪˈlɪv.ər.ə.bəl/",
    arabic: "مُخرَج / تسليم متفق عليه",
    level: "B2",
    category: "business",
    definition: {
      en: "A tangible output or milestone promised to a client or stakeholder.",
      ar: "نتيجة ملموسة أو مهمة متفق على تسليمها للعميل أو الفريق.",
    },
    example: "Let's confirm the Q3 deliverables and owners before closing the meeting.",
  },
  {
    id: "gl-stakeholder",
    term: "stakeholder",
    ipa: "/ˈsteɪkˌhəʊl.dər/",
    arabic: "صاحب مصلحة",
    level: "B2",
    category: "business",
    definition: {
      en: "A person, team, or organisation affected by a project or business decision.",
      ar: "شخص أو جهة تتأثر بمشروع أو قرار إداري.",
    },
    example: "We need key stakeholder alignment before launching the new pricing model.",
  },
  {
    id: "gl-escalate",
    term: "escalate",
    ipa: "/ˈes.kə.leɪt/",
    arabic: "يُصعّد المشكلة لمستوى أعلى",
    level: "B2",
    category: "business",
    definition: {
      en: "To pass an urgent issue to senior management for faster resolution.",
      ar: "رفع مشكلة عاجلة إلى الإدارة الأعلى لحلها بسرعة.",
    },
    example: "If the supplier misses Friday's deadline, we will escalate the case immediately.",
  },
  {
    id: "gl-negotiate",
    term: "reach a compromise",
    ipa: "/riːtʃ ə ˈkɒm.prə.maɪz/",
    arabic: "يتوصل إلى حل وسط",
    level: "B1",
    category: "business",
    definition: {
      en: "To find an agreement where each side accepts slightly less than its first demand.",
      ar: "الاتفاق على حل متوازن يرضي الطرفين.",
    },
    example: "Both teams reached a compromise on the delivery timeline and budget.",
  },
  {
    id: "gl-routine",
    term: "daily routine",
    ipa: "/ˈdeɪ.li ruːˈtiːn/",
    arabic: "الروتين اليومي",
    level: "A1",
    category: "cefr",
    definition: {
      en: "The regular activities you do in the same order every day.",
      ar: "الأنشطة المعتادة التي تقوم بها كل يوم.",
    },
    example: "My daily routine starts with coffee and twenty minutes of English reading.",
  },
  {
    id: "gl-reliable",
    term: "reliable",
    ipa: "/rɪˈlaɪ.ə.bəl/",
    arabic: "موثوق / يُعتمد عليه",
    level: "B1",
    category: "cefr",
    definition: {
      en: "Consistently good in quality or performance; someone you can trust.",
      ar: "شخص أو مصدر يمكن الاعتماد عليه بثقة.",
    },
    example: "Always verify news using reliable academic or journalistic sources.",
  },
  {
    id: "gl-cohesive",
    term: "cohesive device",
    ipa: "/kəʊˈhiː.sɪv dɪˈvaɪs/",
    arabic: "أداة ربط نصي",
    level: "B2",
    category: "grammar",
    definition: {
      en: "Linking words (however, therefore, furthermore) that connect ideas smoothly.",
      ar: "كلمات ربط مثل however و therefore لربط الأفكار بسلاسة.",
    },
    example: "Using cohesive devices naturally raises your IELTS Coherence & Cohesion band.",
  },
  {
    id: "gl-collocation",
    term: "collocation",
    ipa: "/ˌkɒl.əˈkeɪ.ʃən/",
    arabic: "متلازمة لفظية",
    level: "B1",
    category: "grammar",
    definition: {
      en: "Words that naturally go together in native English (e.g., 'make a decision', not 'do a decision').",
      ar: "كلمات ترد معًا بشكل طبيعي في الإنجليزية مثل make a decision.",
    },
    example: "Learning collocations makes your spoken and written English sound natural.",
  },
  {
    id: "gl-present-perfect",
    term: "Present Perfect",
    ipa: "/ˈprez.ənt ˈpɜː.fekt/",
    arabic: "المضارع التام (have/has + V3)",
    level: "B1",
    category: "grammar",
    definition: {
      en: "Verb tense linking a past event or ongoing state to the present moment.",
      ar: "زمن يربط حدثًا في الماضي أو حالة مستمرة باللحظة الحاضرة.",
    },
    example: "She has worked as a software engineer since 2021.",
  },
  {
    id: "gl-phoneme",
    term: "phoneme",
    ipa: "/ˈfəʊ.niːm/",
    arabic: "وحدة صوتية (فونيم)",
    level: "A2",
    category: "cefr",
    definition: {
      en: "The smallest individual sound in a language that changes word meaning (e.g. /p/ vs /b/).",
      ar: "أصغر صوت لغوي يغيّر معنى الكلمة مثل الفرق بين pat و bat.",
    },
    example: "Blending three phonemes (/k/ + /æ/ + /t/) helps children decode 'cat'.",
  },
  {
    id: "gl-nuance",
    term: "nuance",
    ipa: "/ˈnjuː.ɑːns/",
    arabic: "فارق دقيق في المعنى",
    level: "C2",
    category: "cefr",
    definition: {
      en: "A very small, subtle difference in meaning, tone, or feeling.",
      ar: "فارق لطيف ودقيق في المعنى أو النبرة.",
    },
    example: "C2 speakers detect subtle nuances between formal and diplomatic requests.",
  },
  {
    id: "gl-conditional",
    term: "Second Conditional",
    ipa: "/ˈsek.ənd kənˈdɪʃ.ən.əl/",
    arabic: "الجملة الشرطية الثانية",
    level: "B1",
    category: "grammar",
    definition: {
      en: "Structure for imaginary or unlikely present/future situations (If + Past Simple, would + base verb).",
      ar: "تركيب للحديث عن مواقف افتراضية أو غير مرجّحة في الحاضر أو المستقبل.",
    },
    example: "If I had more time, I would practise speaking every morning.",
  },
];

export const GRAMMAR_QUICK_CARDS: GrammarQuickCard[] = [
  {
    id: "gq-be-present",
    level: "A1",
    title: { en: "Verb 'to be' & Present Simple", ar: "فعل الكينونة والمضارع البسيط" },
    formula: "I am · He/She/It is · We/They are | He/She/It + Verb-s",
    useWhen: {
      en: "Describing facts, identity, jobs, and daily habits.",
      ar: "لوصف الحقائق والوظائف والعادات اليومية.",
    },
    commonMistake: {
      wrong: "He working in Riyadh.",
      right: "He works in Riyadh. / He is working in Riyadh.",
      note: {
        en: "Never drop 'is/are' before -ing, and use -s for daily routines with he/she/it.",
        ar: "لا تحذف is/are قبل ing، وأضف s مع المفرد الغائب للعادات.",
      },
    },
    practiceTo: "/courses",
  },
  {
    id: "gq-past-vs-perf",
    level: "B1",
    title: { en: "Past Simple vs. Present Perfect", ar: "الماضي البسيط مقابل المضارع التام" },
    formula:
      "Past Simple: V2 (+ yesterday/2022) | Present Perfect: have/has + V3 (+ since/for/yet)",
    useWhen: {
      en: "Use Past Simple for finished past time; Present Perfect when time connects to NOW.",
      ar: "الماضي البسيط لزمن منتهٍ محدد؛ والمضارع التام لما يرتبط بالحاضر.",
    },
    commonMistake: {
      wrong: "I have visited Dubai last year.",
      right: "I visited Dubai last year.",
      note: {
        en: "'last year' is a finished time marker — always pair it with Past Simple.",
        ar: "عبارة last year زمن منتهٍ تمامًا فتتطلب الماضي البسيط.",
      },
    },
    practiceTo: "/cefr-mastery",
  },
  {
    id: "gq-articles",
    level: "A2",
    title: { en: "Articles: a / an / the / Ø", ar: "أدوات التعريف والنكرة (a / an / the)" },
    formula: "a + consonant sound · an + vowel sound · the + specific noun",
    useWhen: {
      en: "Use 'a/an' for any singular countable noun; omit 'the' for plural general statements.",
      ar: "نستخدم a/an للمفرد غير المحدد، ونحذف the عند التعميم بالجمع.",
    },
    commonMistake: {
      wrong: "The cars are useful. / He is engineer.",
      right: "Cars are useful. / He is an engineer.",
      note: {
        en: "Arabic uses 'ال' for general concepts, but English drops 'the' before general plurals.",
        ar: "تستخدم العربية (ال) للتعميم، أما الإنجليزية فتحذف the قبل الجمع العام.",
      },
    },
    practiceTo: "/self-learning",
  },
  {
    id: "gq-conditionals",
    level: "B2",
    title: { en: "Conditionals (Zero, 1st, 2nd, 3rd)", ar: "الجمل الشرطية الأربعة" },
    formula:
      "1st: If + Present, will + V | 2nd: If + Past, would + V | 3rd: If + had V3, would have V3",
    useWhen: {
      en: "Expressing real plans, hypothetical ideas, and past regrets clearly.",
      ar: "للتعبير عن الخطط الواقعية والافتراضات والندم على الماضي.",
    },
    commonMistake: {
      wrong: "If I will finish early, I call you.",
      right: "If I finish early, I will call you.",
      note: {
        en: "Never put 'will' inside the 'if' clause in standard 1st conditionals.",
        ar: "لا نضع will داخل جملة الشرط بعد if.",
      },
    },
    practiceTo: "/cefr-mastery",
  },
  {
    id: "gq-passive",
    level: "B2",
    title: { en: "Academic Passive Voice", ar: "المبني للمجهول الأكاديمي" },
    formula: "Object + be (is/was/has been/will be) + Past Participle (V3)",
    useWhen: {
      en: "Essential for IELTS Writing Task 1 processes and formal business reports.",
      ar: "أساسي في وصف العمليات في آيلتس Task 1 وتقارير الأعمال الرسمية.",
    },
    commonMistake: {
      wrong: "The data collected every month.",
      right: "The data is collected every month.",
      note: {
        en: "Passive voice always requires the correct form of 'be' before V3.",
        ar: "يتطلب المبني للمجهول دائمًا فعل الكينونة (be) قبل التصريف الثالث.",
      },
    },
    practiceTo: "/ielts",
  },
  {
    id: "gq-hedging",
    level: "C1",
    title: { en: "Academic Hedging & Modality", ar: "الأسلوب الأكاديمي المتزن (Hedging)" },
    formula: "tends to · may contribute to · appears to indicate · is likely to",
    useWhen: {
      en: "Avoid sweeping overgeneralisations in Band 7.5+ essays and executive briefs.",
      ar: "لتجنب التعميم المبالغ فيه في مقالات آيلتس العالية والتقارير التنفيذية.",
    },
    commonMistake: {
      wrong: "Remote work always destroys productivity.",
      right: "Unstructured remote work can occasionally reduce team cohesion.",
      note: {
        en: "Balanced modal hedging signals C1/C2 academic maturity.",
        ar: "استخدام الصياغة المتزنة يعكس نضجًا لغويًا بمستوى C1 و C2.",
      },
    },
    practiceTo: "/ielts",
  },
];

export const PRINTABLE_STUDY_GUIDES: PrintableStudyGuide[] = [
  {
    id: "guide-cefr",
    emoji: "🧭",
    audience: { en: "All Learners (A1–C2)", ar: "جميع المتعلّمين (A1–C2)" },
    title: { en: "CEFR Level-Up Mastery Checklist", ar: "قائمة التحقق للارتقاء بين مستويات CEFR" },
    summary: {
      en: "Verify all 7 skills before moving up a CEFR band — completion alone never guarantees fluency.",
      ar: "تحقّق من جميع المهارات السبع قبل الانتقال لمستوى CEFR أعلى.",
    },
    checklist: [
      {
        en: "Score ≥ 75% on end-of-level grammar and reading checks",
        ar: "تحقيق ٧٥٪ فأكثر في تقييم القواعد والقراءة",
      },
      {
        en: "Master at least 80% of target-level vocabulary collocations",
        ar: "إتقان ٨٠٪ من مفردات ومتلازمات المستوى",
      },
      {
        en: "Complete 3+ guided speaking turns with clear pronunciation",
        ar: "إكمال ٣ جلسات محادثة موجّهة بنطق واضح",
      },
      {
        en: "Review and clear every recurring item in Self-Learning Error History",
        ar: "مراجعة وتصفير سجل الأخطاء المتكررة في التعلّم الذاتي",
      },
    ],
    relatedTo: "/courses",
  },
  {
    id: "guide-ielts",
    emoji: "🎓",
    audience: { en: "IELTS Candidates (Band 7+)", ar: "متقدّمو الآيلتس (Band 7+)" },
    title: { en: "IELTS Band 7.0+ 4-Skill Blueprint", ar: "خارطة تحقيق Band 7.0+ في الآيلتس" },
    summary: {
      en: "Exam timing discipline, high-impact lexical upgrades, and rubric alignment across all 4 modules.",
      ar: "انضباط الوقت والترقية المعجمية والتوافق مع معايير التصحيح في المهارات الأربع.",
    },
    checklist: [
      {
        en: "Writing Task 1: Always include a crisp 2-sentence Overview paragraph (no raw numbers)",
        ar: "الكتابة المهمة ١: اكتب فقرة نظرة عامة (Overview) واضحة دائمًا",
      },
      {
        en: "Writing Task 2: Maintain one clear position across intro, body, and conclusion",
        ar: "الكتابة المهمة ٢: حافظ على موقف واضح ومتماسك في كامل المقال",
      },
      {
        en: "Speaking Part 2: Speak naturally for the full 2 minutes using 4 bullet anchors",
        ar: "المحادثة الجزء ٢: تحدّث بطلاقة لمدة دقيقتين كاملتين",
      },
      {
        en: "Listening & Reading: Paraphrase keywords instead of hunting for identical words",
        ar: "الاستماع والقراءة: ابحث عن المرادفات لا تطابق الكلمات حرفيًا",
      },
    ],
    relatedTo: "/ielts",
  },
  {
    id: "guide-business",
    emoji: "💼",
    audience: { en: "Professionals & Job Seekers", ar: "الموظفون والباحثون عن عمل" },
    title: {
      en: "Executive Emails, Meetings & STAR Interviews",
      ar: "دليل البريد المهني والاجتماعات ومقابلات STAR",
    },
    summary: {
      en: "Upgrade everyday phrases into confident workplace English and structured interview answers.",
      ar: "ارتقِ بعباراتك اليومية إلى لغة عمل احترافية وإجابات مقابلات منظمة.",
    },
    checklist: [
      {
        en: "Open emails with purpose first ('I am writing to confirm...') and clear action items",
        ar: "ابدأ رسائل البريد بالهدف المباشر والخطوات المطلوبة بوضوح",
      },
      {
        en: "Use diplomatic disagreement ('I see your point; however, have we considered...')",
        ar: "استخدم الاختلاف الدبلوماسي اللبق في الاجتماعات",
      },
      {
        en: "Structure every job interview story using Situation → Task → Action → Result (STAR)",
        ar: "نظّم كل إجابة مقابلة بنموذج STAR (الموقف، المهمة، الإجراء، النتيجة)",
      },
      {
        en: "Practise at least 2 live AI Business Workshops per week",
        ar: "تدرّب على ورشتي محاكاة أعمال أسبوعيًا على الأقل",
      },
    ],
    relatedTo: "/business",
  },
  {
    id: "guide-kids-parents",
    emoji: "🦉",
    audience: { en: "Parents of Kids (Ages 4–12)", ar: "أولياء أمور الأطفال (٤–١٢ سنة)" },
    title: {
      en: "Parent Guide: Teaching Reading Through Phonics",
      ar: "دليل ولي الأمر: تعليم الطفل القراءة بالصوتيات",
    },
    summary: {
      en: "How to support joyful, stress-free English reading at home in 10–15 minutes a day.",
      ar: "كيف تدعم تعلّم طفلك للقراءة الإنجليزية بمتعة وبدون ضغط في ١٠–١٥ دقيقة يوميًا.",
    },
    checklist: [
      {
        en: "Teach Letter SOUNDS (/b/ 'buh', /s/ 'sss') alongside Letter NAMES (/biː/, /es/)",
        ar: "علّم طفلك صوت الحرف الحقيقي بجانب اسمه",
      },
      {
        en: "Celebrate effort with stars and praise — never rush or compare children",
        ar: "احتفِ بالمحاولة بالنجوم والتشجيع دون استعجال أو مقارنة",
      },
      {
        en: "Practise 3-letter CVC blending (c-a-t → cat) before moving to longer words",
        ar: "أتقِن دمج كلمات CVC الثلاثية قبل الانتقال للكلمات الأطول",
      },
      {
        en: "Watch one 2-minute Animated ESL Video together and repeat the key phrase aloud",
        ar: "شاهد فيديو تعليميًا متحركًا مدته دقيقتان مع طفلك وردّدا الجملة معًا",
      },
    ],
    relatedTo: "/kids",
  },
];
