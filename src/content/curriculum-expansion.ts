import type {
  Bilingual,
  DetailedRuleGuide,
  Lesson,
  LessonCourse,
  LessonQuestion,
  LessonSkill,
  VocabItem,
} from "./lesson-types";
import { makeFitSentence, makePickWord, makeRearrange } from "./enrichment-builders";

export const ALL_LESSON_SKILLS: readonly LessonSkill[] = [
  "grammar",
  "reading",
  "listening",
  "writing",
  "speaking",
] as const;

export const MIN_LESSONS_PER_SKILL = 50;

interface CompactTheme {
  slug: string;
  en: string;
  ar: string;
  unitEn: string;
  unitAr: string;
  vocab: readonly [
    readonly [string, string, string],
    readonly [string, string, string],
    readonly [string, string, string],
    readonly [string, string, string],
  ];
  contextEn: string;
  actionVerb: string;
}

/** 50 authentic, real-world curriculum themes spanning CEFR domains (personal, public, educational, occupational). */
export const CURRICULUM_THEMES_50: readonly CompactTheme[] = [
  {
    slug: "morning-habits",
    en: "Morning Routines & Punctuality",
    ar: "روتين الصباح والالتزام بالوقت",
    unitEn: "Daily Life & Time",
    unitAr: "الحياة اليومية والوقت",
    vocab: [
      ["schedule", "جدول يومي", "timetable"],
      ["punctual", "دقيق في مواعيده", "on time"],
      ["breakfast", "وجبة الإفطار", "morning meal"],
      ["commute", "رحلة الذهاب للعمل أو المدرسة", "daily travel"],
    ],
    contextEn: "organising a calm morning routine before school or work",
    actionVerb: "prepare",
  },
  {
    slug: "family-home",
    en: "Family Ties & Home Life",
    ar: "الروابط الأسرية والحياة المنزلية",
    unitEn: "People & Relationships",
    unitAr: "الناس والعلاقات",
    vocab: [
      ["household", "أفراد الأسرة والمنزل", "family home"],
      ["relative", "قريب عائلي", "family member"],
      ["supportive", "داعم ومشجع", "helpful"],
      ["gathering", "اجتماع عائلي", "reunion"],
    ],
    contextEn: "sharing responsibilities and weekend traditions with family",
    actionVerb: "support",
  },
  {
    slug: "neighbourhood-community",
    en: "Neighbourhood & Local Community",
    ar: "الحيّ والمجتمع المحلي",
    unitEn: "Places & Civic Life",
    unitAr: "الأماكن والحياة المدنية",
    vocab: [
      ["neighbour", "جار", "local resident"],
      ["facility", "مرفق خدمي", "amenity"],
      ["courtyard", "فناء / ساحة", "open square"],
      ["volunteer", "متطوع", "helper"],
    ],
    contextEn: "improving parks, libraries, and safety in your local neighbourhood",
    actionVerb: "improve",
  },
  {
    slug: "food-nutrition",
    en: "Healthy Meals & Cooking",
    ar: "الوجبات الصحية والطبخ",
    unitEn: "Food & Well-being",
    unitAr: "الطعام والعافية",
    vocab: [
      ["ingredient", "مكوّن غذائي", "component"],
      ["nutritious", "مغذٍ وصحي", "wholesome"],
      ["recipe", "وصفة طهي", "cooking guide"],
      ["portion", "حصة غذائية", "serving"],
    ],
    contextEn: "choosing balanced ingredients and preparing fresh meals at home",
    actionVerb: "prepare",
  },
  {
    slug: "shopping-budgets",
    en: "Smart Shopping & Personal Budgets",
    ar: "التسوّق الذكي والميزانية الشخصية",
    unitEn: "Everyday Finance",
    unitAr: "المالية اليومية",
    vocab: [
      ["receipt", "إيصال شراء", "proof of purchase"],
      ["discount", "خصم وتخفيض", "price reduction"],
      ["affordable", "بأسعار معقولة", "reasonably priced"],
      ["budget", "ميزانية مالية", "spending plan"],
    ],
    contextEn: "comparing prices, checking warranties, and managing monthly expenses",
    actionVerb: "compare",
  },
  {
    slug: "public-transport",
    en: "Public Transport & Directions",
    ar: "المواصلات العامة والاتجاهات",
    unitEn: "Travel & Mobility",
    unitAr: "السفر والتنقل",
    vocab: [
      ["platform", "رصيف القطار", "station track"],
      ["route", "مسار الطريق", "pathway"],
      ["transfer", "تبديل خط المواصلات", "connection"],
      ["reliable", "موثوق ومنتظم", "dependable"],
    ],
    contextEn: "navigating metro lines, bus timetables, and clear city directions",
    actionVerb: "navigate",
  },
  {
    slug: "weather-seasons",
    en: "Weather Forecasts & Seasonal Plans",
    ar: "نشرة الطقس والخطط الموسمية",
    unitEn: "Nature & Climate",
    unitAr: "الطبيعة والمناخ",
    vocab: [
      ["forecast", "توقعات الطقس", "weather prediction"],
      ["humid", "رطب", "damp"],
      ["breeze", "نسيم عليل", "light wind"],
      ["mild", "معتدل الطقس", "pleasant"],
    ],
    contextEn: "planning outdoor trips around seasonal temperatures and rain alerts",
    actionVerb: "plan",
  },
  {
    slug: "school-study-habits",
    en: "Study Skills & Classroom Projects",
    ar: "مهارات المذاكرة ومشاريع الصف",
    unitEn: "Education & Learning",
    unitAr: "التعليم والتعلّم",
    vocab: [
      ["assignment", "مهمة دراسية", "coursework"],
      ["revision", "مراجعة منظمة", "review"],
      ["concentrate", "يركّز بعمق", "focus"],
      ["deadline", "موعد نهائي للتسليم", "due date"],
    ],
    contextEn: "taking clear notes, organising study notes, and preparing for exams",
    actionVerb: "organise",
  },
  {
    slug: "hobbies-creativity",
    en: "Creative Hobbies & Free Time",
    ar: "الهوايات الإبداعية ووقت الفراغ",
    unitEn: "Leisure & Culture",
    unitAr: "الترفيه والثقافة",
    vocab: [
      ["craft", "حرفة يدوية", "handiwork"],
      ["creative", "مبدع ومبتكر", "imaginative"],
      ["sketch", "رسم تخطيطي", "drawing"],
      ["pastime", "هواية ممتعة", "leisure activity"],
    ],
    contextEn: "exploring photography, painting, writing, and weekend clubs",
    actionVerb: "explore",
  },
  {
    slug: "sports-teamwork",
    en: "Sports, Fitness & Teamwork",
    ar: "الرياضة واللياقة والعمل الجماعي",
    unitEn: "Health & Activity",
    unitAr: "الصحة والنشاط",
    vocab: [
      ["endurance", "قوة التحمل", "stamina"],
      ["teammate", "زميل فريق", "partner"],
      ["tournament", "بطولة رياضية", "championship"],
      ["warm-up", "إحماء بدني", "preparation exercise"],
    ],
    contextEn: "staying active through weekly sports and fair team cooperation",
    actionVerb: "practise",
  },
  {
    slug: "health-clinics",
    en: "Visiting a Clinic & Staying Well",
    ar: "زيارة العيادة والحفاظ على الصحة",
    unitEn: "Health & Care",
    unitAr: "الصحة والرعاية",
    vocab: [
      ["symptom", "عَرَض مرضي", "sign of illness"],
      ["appointment", "موعد طبي", "scheduled visit"],
      ["recovery", "تعافٍ وشفاء", "healing"],
      ["pharmacy", "صيدلية", "chemist"],
    ],
    contextEn: "explaining symptoms clearly to a doctor and following health advice",
    actionVerb: "describe",
  },
  {
    slug: "travel-airports",
    en: "Airports, Hotels & Travel Plans",
    ar: "المطارات والفنادق وخطط السفر",
    unitEn: "Global Travel",
    unitAr: "السفر العالمي",
    vocab: [
      ["itinerary", "برنامج الرحلة", "travel plan"],
      ["boarding", "الصعود للطائرة", "embarkation"],
      ["luggage", "أمتعة السفر", "baggage"],
      ["reservation", "حجز مسبق", "booking"],
    ],
    contextEn: "checking in smoothly at airports, hotels, and tourist centres",
    actionVerb: "confirm",
  },
  {
    slug: "workplace-basics",
    en: "First Week at a New Workplace",
    ar: "الأسبوع الأول في بيئة عمل جديدة",
    unitEn: "Career & Work",
    unitAr: "المهنة والعمل",
    vocab: [
      ["colleague", "زميل عمل", "co-worker"],
      ["department", "قسم إداري", "division"],
      ["briefing", "إحاطة موجزة", "orientation"],
      ["responsibility", "مسؤولية مهنية", "duty"],
    ],
    contextEn: "introducing yourself to colleagues and clarifying daily workplace tasks",
    actionVerb: "clarify",
  },
  {
    slug: "customer-service",
    en: "Polite Requests & Customer Service",
    ar: "الطلبات المهذبة وخدمة العملاء",
    unitEn: "Service & Communication",
    unitAr: "الخدمة والتواصل",
    vocab: [
      ["enquiry", "استفسار رسمي", "question"],
      ["refund", "استرداد مبلغ", "reimbursement"],
      ["courteous", "مهذب ولطيف", "polite"],
      ["resolve", "يحل مشكلة", "settle"],
    ],
    contextEn: "making polite requests, returning faulty goods, and resolving issues calmly",
    actionVerb: "resolve",
  },
  {
    slug: "digital-tools",
    en: "Everyday Apps & Digital Productivity",
    ar: "التطبيقات اليومية والإنتاجية الرقمية",
    unitEn: "Digital World",
    unitAr: "العالم الرقمي",
    vocab: [
      ["device", "جهاز إلكتروني", "gadget"],
      ["notification", "إشعار تنبيهي", "alert"],
      ["backup", "نسخة احتياطية", "saved copy"],
      ["shortcut", "اختصار سريع", "quick key"],
    ],
    contextEn: "using calendars, cloud documents, and safe password habits every day",
    actionVerb: "manage",
  },
  {
    slug: "nature-wildlife",
    en: "Parks, Wildlife & Protecting Nature",
    ar: "المنتزهات والحياة الفطرية وحماية الطبيعة",
    unitEn: "Environment",
    unitAr: "البيئة",
    vocab: [
      ["habitat", "موطن طبيعي", "natural home"],
      ["species", "فصيلة حية", "kind of organism"],
      ["reserve", "محمية طبيعية", "sanctuary"],
      ["recycle", "يعيد التدوير", "reprocess"],
    ],
    contextEn: "observing wildlife responsibly and reducing household plastic waste",
    actionVerb: "protect",
  },
  {
    slug: "books-storytelling",
    en: "Reading Stories & Book Reviews",
    ar: "قراءة القصص ومراجعة الكتب",
    unitEn: "Literature & Narrative",
    unitAr: "الأدب والسرد",
    vocab: [
      ["character", "شخصية قصصية", "protagonist"],
      ["chapter", "فصل في كتاب", "section"],
      ["plot", "حبكة القصة", "storyline"],
      ["memorable", "لا يُنسى", "unforgettable"],
    ],
    contextEn: "retelling favourite stories and explaining why a book stayed with you",
    actionVerb: "summarise",
  },
  {
    slug: "festivals-heritage",
    en: "Cultural Festivals & Heritage",
    ar: "المهرجانات الثقافية والتراث",
    unitEn: "Culture & Society",
    unitAr: "الثقافة والمجتمع",
    vocab: [
      ["tradition", "تقليد عريق", "custom"],
      ["hospitality", "كرم الضيافة", "warm welcome"],
      ["heritage", "تراث ثقافي", "legacy"],
      ["celebrate", "يحتفل بمناسبة", "commemorate"],
    ],
    contextEn: "sharing regional customs, traditional foods, and family celebrations",
    actionVerb: "celebrate",
  },
  {
    slug: "banking-savings",
    en: "Banking, Saving & Financial Literacy",
    ar: "المصارف والادخار والوعي المالي",
    unitEn: "Personal Finance",
    unitAr: "المالية الشخصية",
    vocab: [
      ["savings", "مدخرات مالية", "reserves"],
      ["transaction", "عملية مالية", "payment"],
      ["statement", "كشف حساب", "account summary"],
      ["interest", "عائد أو فائدة", "return"],
    ],
    contextEn: "opening a savings account, tracking transactions, and setting savings goals",
    actionVerb: "track",
  },
  {
    slug: "housing-renting",
    en: "Apartments, Renting & Home Maintenance",
    ar: "الشقق والاستئجار وصيانة المنزل",
    unitEn: "Housing & Living",
    unitAr: "السكن والمعيشة",
    vocab: [
      ["landlord", "مالك العقار", "property owner"],
      ["lease", "عقد إيجار", "rental agreement"],
      ["utility", "خدمة أساسية كالكهرباء والماء", "essential service"],
      ["repair", "إصلاح وصيانة", "fix"],
    ],
    contextEn: "inspecting an apartment, discussing lease terms, and reporting repairs",
    actionVerb: "inspect",
  },
  {
    slug: "online-safety",
    en: "Online Safety & Fact-Checking",
    ar: "الأمان الرقمي والتحقق من الأخبار",
    unitEn: "Media & Digital Literacy",
    unitAr: "الإعلام والوعي الرقمي",
    vocab: [
      ["verify", "يتحقق من صحة معلومة", "confirm"],
      ["source", "مصدر موثوق", "origin"],
      ["privacy", "خصوصية شخصية", "confidentiality"],
      ["scam", "احتيال إلكتروني", "fraud"],
    ],
    contextEn: "checking credible news sources and spotting suspicious messages online",
    actionVerb: "verify",
  },
  {
    slug: "career-interviews",
    en: "CV Writing & Job Interviews",
    ar: "كتابة السيرة الذاتية ومقابلات العمل",
    unitEn: "Career Readiness",
    unitAr: "الجاهزية المهنية",
    vocab: [
      ["qualification", "مؤهل علمي أو مهني", "credential"],
      ["strength", "نقطة قوة", "advantage"],
      ["candidate", "مرشح لوظيفة", "applicant"],
      ["achievement", "إنجاز مهني", "accomplishment"],
    ],
    contextEn: "presenting your experience clearly and answering interview questions with examples",
    actionVerb: "present",
  },
  {
    slug: "emails-memos",
    en: "Professional Emails & Clear Messages",
    ar: "البريد المهني والرسائل الواضحة",
    unitEn: "Written Communication",
    unitAr: "التواصل الكتابي",
    vocab: [
      ["attachment", "ملف مرفق", "enclosed file"],
      ["concise", "موجز وواضح", "brief"],
      ["follow-up", "متابعة لاحقة", "check-in"],
      ["confirm", "يؤكّد رسميًا", "verify"],
    ],
    contextEn: "writing polite, structured emails with clear subject lines and action points",
    actionVerb: "draft",
  },
  {
    slug: "meetings-collaboration",
    en: "Team Meetings & Sharing Opinions",
    ar: "اجتماعات الفريق وتبادل الآراء",
    unitEn: "Workplace Collaboration",
    unitAr: "التعاون المهني",
    vocab: [
      ["agenda", "جدول أعمال الاجتماع", "meeting plan"],
      ["consensus", "توافق جماعي", "agreement"],
      ["proposal", "مقترح عملي", "suggestion"],
      ["outcome", "نتيجة ومخرج", "result"],
    ],
    contextEn: "contributing constructively in meetings and summarising agreed next steps",
    actionVerb: "propose",
  },
  {
    slug: "presentations-public-speaking",
    en: "Short Presentations & Visual Slides",
    ar: "العروض التقديمية والشرائح المرئية",
    unitEn: "Public Speaking",
    unitAr: "الإلقاء والعرض",
    vocab: [
      ["audience", "جمهور المستمعين", "listeners"],
      ["signpost", "عبارة انتقال وتوجيه", "transition cue"],
      ["highlight", "يُبرز نقطة مهمة", "emphasise"],
      ["visual", "عنصر مرئي توضيحي", "graphic"],
    ],
    contextEn: "opening a presentation confidently and guiding listeners through key charts",
    actionVerb: "emphasise",
  },
  {
    slug: "time-management",
    en: "Time Management & Avoiding Procrastination",
    ar: "إدارة الوقت وتجنّب التسويف",
    unitEn: "Personal Productivity",
    unitAr: "الإنتاجية الشخصية",
    vocab: [
      ["priority", "أولوية قصوى", "top task"],
      ["milestone", "محطة إنجاز رئيسية", "checkpoint"],
      ["distraction", "مشتّت للانتباه", "interruption"],
      ["consistent", "منتظم ومستمر", "steady"],
    ],
    contextEn: "breaking large goals into realistic daily blocks and reviewing weekly progress",
    actionVerb: "prioritise",
  },
  {
    slug: "science-discoveries",
    en: "Everyday Science & Space Exploration",
    ar: "العلوم اليومية واستكشاف الفضاء",
    unitEn: "Science & Discovery",
    unitAr: "العلوم والاكتشاف",
    vocab: [
      ["experiment", "تجربة علمية", "scientific test"],
      ["evidence", "دليل علمي", "proof"],
      ["orbit", "مدار فضائي", "path"],
      ["observe", "يلاحظ بدقة", "monitor"],
    ],
    contextEn: "understanding how scientific experiments test ideas and improve daily life",
    actionVerb: "investigate",
  },
  {
    slug: "renewable-cities",
    en: "Clean Energy & Green Cities",
    ar: "الطاقة النظيفة والمدن الخضراء",
    unitEn: "Sustainability",
    unitAr: "الاستدامة",
    vocab: [
      ["renewable", "متجدد ونظيف", "sustainable"],
      ["solar", "شمسي", "sun-powered"],
      ["efficient", "عالي الكفاءة", "effective"],
      ["emission", "انبعاث غازي", "discharge"],
    ],
    contextEn: "exploring solar architecture, electric buses, and greener city planning",
    actionVerb: "design",
  },
  {
    slug: "artificial-intelligence",
    en: "Smart Technology & AI in Daily Life",
    ar: "التقنية الذكية والذكاء الاصطناعي يوميًا",
    unitEn: "Future Tech",
    unitAr: "تقنيات المستقبل",
    vocab: [
      ["automation", "أتمتة ذكية", "mechanisation"],
      ["assistant", "مساعد رقمي", "helper"],
      ["accurate", "دقيق ومضبوط", "precise"],
      ["oversight", "إشراف ومراجعة بشرية", "supervision"],
    ],
    contextEn: "evaluating where AI tools help learners and where human judgement stays vital",
    actionVerb: "evaluate",
  },
  {
    slug: "global-trade",
    en: "Global Trade & Local Businesses",
    ar: "التجارة العالمية والأعمال المحلية",
    unitEn: "Global Economy",
    unitAr: "الاقتصاد العالمي",
    vocab: [
      ["export", "يصدّر سلعًا", "ship abroad"],
      ["supplier", "مورّد معتمد", "provider"],
      ["demand", "طلب السوق", "market need"],
      ["competitive", "تنافسي", "strong in market"],
    ],
    contextEn: "understanding how international shipping links local producers with global buyers",
    actionVerb: "analyse",
  },
  {
    slug: "urban-planning",
    en: "Urban Growth & Affordable Housing",
    ar: "النمو العمراني والإسكان الميسّر",
    unitEn: "Cities & Society",
    unitAr: "المدن والمجتمع",
    vocab: [
      ["congestion", "ازدحام مروري", "traffic jam"],
      ["infrastructure", "بنية تحتية", "public network"],
      ["pedestrian", "مشاة الطريق", "walker"],
      ["density", "كثافة سكانية", "concentration"],
    ],
    contextEn: "balancing rapid urban expansion with walkable streets and green parks",
    actionVerb: "balance",
  },
  {
    slug: "mental-resilience",
    en: "Stress Management & Mental Well-being",
    ar: "إدارة الضغوط والصحة النفسية",
    unitEn: "Well-being",
    unitAr: "العافية النفسية",
    vocab: [
      ["resilience", "مرونة نفسية", "inner strength"],
      ["mindful", "واعٍ وهادئ", "attentive"],
      ["recharge", "يجدّد نشاطه", "rest"],
      ["balance", "توازن حياتي", "harmony"],
    ],
    contextEn: "recognising signs of fatigue early and protecting healthy rest routines",
    actionVerb: "maintain",
  },
  {
    slug: "higher-education",
    en: "University Life & Lifelong Learning",
    ar: "الحياة الجامعية والتعلّم مدى الحياة",
    unitEn: "Academic Pathways",
    unitAr: "المسارات الأكاديمية",
    vocab: [
      ["lecture", "محاضرة جامعية", "academic talk"],
      ["seminar", "حلقة نقاش علمية", "discussion class"],
      ["scholarship", "منحة دراسية", "study grant"],
      ["research", "بحث أكاديمي", "investigation"],
    ],
    contextEn: "comparing university degrees, vocational training, and continuous adult study",
    actionVerb: "compare",
  },
  {
    slug: "media-journalism",
    en: "Modern Media, Podcasts & Journalism",
    ar: "الإعلام الحديث والبودكاست والصحافة",
    unitEn: "Media & Information",
    unitAr: "الإعلام والمعلومات",
    vocab: [
      ["headline", "عنوان رئيسي", "lead title"],
      ["objective", "موضوعي ومحايد", "impartial"],
      ["broadcast", "بث إعلامي", "transmission"],
      ["editorial", "مقال افتتاحي", "opinion piece"],
    ],
    contextEn: "distinguishing factual reporting from sponsored commentary in modern media",
    actionVerb: "distinguish",
  },
  {
    slug: "advertising-consumer-choices",
    en: "Advertising & Informed Consumer Choices",
    ar: "الإعلانات والقرار الشرائي الواعي",
    unitEn: "Media & Commerce",
    unitAr: "الإعلام والتجارة",
    vocab: [
      ["persuasive", "مقنع وجذاب", "convincing"],
      ["campaign", "حملة إعلانية", "promotion"],
      ["brand", "علامة تجارية", "label"],
      ["endorsement", "توصية وتأييد", "backing"],
    ],
    contextEn: "examining how advertisements shape consumer desires and brand loyalty",
    actionVerb: "examine",
  },
  {
    slug: "law-civic-duty",
    en: "Fair Laws, Rights & Civic Responsibility",
    ar: "القوانين العادلة والحقوق والمسؤولية المدنية",
    unitEn: "Law & Citizenship",
    unitAr: "القانون والمواطنة",
    vocab: [
      ["regulation", "لائحة تنظيمية", "rule"],
      ["accountable", "خاضع للمساءلة", "responsible"],
      ["justice", "عدالة وإنصاف", "fairness"],
      ["rehabilitation", "إعادة تأهيل", "reintegration"],
    ],
    contextEn: "discussing how clear laws and community programmes keep cities safe and fair",
    actionVerb: "defend",
  },
  {
    slug: "public-services",
    en: "Public Services & Civic Priorities",
    ar: "الخدمات العامة وأولويات الميزانية",
    unitEn: "Government & Policy",
    unitAr: "الحكومة والسياسات",
    vocab: [
      ["allocation", "تخصيص الميزانية", "distribution"],
      ["accessible", "سهل الوصول للجميع", "reachable"],
      ["transparent", "شفاف وواضح", "open"],
      ["essential", "أساسي وضروري", "vital"],
    ],
    contextEn: "weighing public investments across hospitals, schools, transit, and parks",
    actionVerb: "prioritise",
  },
  {
    slug: "history-museums",
    en: "History, Architecture & Living Museums",
    ar: "التاريخ والعمارة والمتاحف الحية",
    unitEn: "Heritage & Arts",
    unitAr: "التراث والفنون",
    vocab: [
      ["artefact", "قطعة أثرية", "relic"],
      ["preserve", "يحفظ ويصون", "protect"],
      ["landmark", "معلَم تاريخي", "monument"],
      ["exhibition", "معرض ثقافي", "showcase"],
    ],
    contextEn: "preserving historic architecture and making museum exhibitions engaging for youth",
    actionVerb: "preserve",
  },
  {
    slug: "languages-bilingualism",
    en: "Learning Languages & Bilingual Minds",
    ar: "تعلّم اللغات والعقل ثنائي اللغة",
    unitEn: "Language & Thought",
    unitAr: "اللغة والفكر",
    vocab: [
      ["fluency", "طلاقة لغوية", "smoothness"],
      ["bilingual", "ثنائي اللغة", "dual-language"],
      ["idiom", "تعبير اصطلاحي", "fixed expression"],
      ["nuance", "فارق دقيق في المعنى", "subtlety"],
    ],
    contextEn: "building lasting bilingual fluency through daily listening, reading, and speaking",
    actionVerb: "strengthen",
  },
  {
    slug: "sustainable-tourism",
    en: "Responsible Tourism & Cultural Respect",
    ar: "السياحة المسؤولة واحترام الثقافات",
    unitEn: "Global Tourism",
    unitAr: "السياحة العالمية",
    vocab: [
      ["destination", "وجهة سياحية", "travel spot"],
      ["ecotourism", "سياحة بيئية مستدامة", "green travel"],
      ["authentic", "أصيل وحقيقي", "genuine"],
      ["seasonal", "موسمي", "periodic"],
    ],
    contextEn: "supporting local artisans while avoiding overcrowding at historic destinations",
    actionVerb: "promote",
  },
  {
    slug: "entrepreneurship-startups",
    en: "Small Ventures & Social Entrepreneurship",
    ar: "المشاريع الصغيرة وريادة الأعمال المجتمعية",
    unitEn: "Innovation & Enterprise",
    unitAr: "الابتكار والمشاريع",
    vocab: [
      ["founder", "مؤسّس مشروع", "creator"],
      ["prototype", "نموذج تجريبي", "pilot model"],
      ["viable", "قابل للنجاح", "feasible"],
      ["mentor", "مرشد مهني", "advisor"],
    ],
    contextEn: "testing small business ideas that solve real community needs sustainably",
    actionVerb: "launch",
  },
  {
    slug: "water-agriculture",
    en: "Water Conservation & Modern Agriculture",
    ar: "ترشيد المياه والزراعة الحديثة",
    unitEn: "Resources & Food",
    unitAr: "الموارد والغذاء",
    vocab: [
      ["irrigation", "الري الذكي", "crop watering"],
      ["scarcity", "ندرة الموارد", "shortage"],
      ["harvest", "موسم الحصاد", "yield"],
      ["conserve", "يرشّد ويحافظ على", "save"],
    ],
    contextEn: "using drip irrigation and desert-smart farming to secure fresh food supplies",
    actionVerb: "conserve",
  },
  {
    slug: "intergenerational-wisdom",
    en: "Connecting Generations & Family Wisdom",
    ar: "التواصل بين الأجيال وحكمة الكبار",
    unitEn: "Society & Family",
    unitAr: "المجتمع والأسرة",
    vocab: [
      ["generation", "جيل", "age group"],
      ["mentoring", "توجيه الأجيال", "guiding"],
      ["empathy", "تعاطف وتفهّم", "compassion"],
      ["bond", "رابطة متينة", "connection"],
    ],
    contextEn: "bridging technology skills and life wisdom between grandparents and youth",
    actionVerb: "strengthen",
  },
  {
    slug: "ethics-decision-making",
    en: "Ethical Choices & Problem Solving",
    ar: "القرارات الأخلاقية وحل المشكلات",
    unitEn: "Critical Reasoning",
    unitAr: "التفكير النقدي",
    vocab: [
      ["integrity", "نزاهة وأمانة", "honesty"],
      ["dilemma", "معضلة تتطلب قرارًا", "tough choice"],
      ["consequence", "نتيجة وعاقبة", "outcome"],
      ["impartial", "محايد وعادل", "unbiased"],
    ],
    contextEn:
      "weighing competing viewpoints fairly before making complex personal or work choices",
    actionVerb: "weigh",
  },
  {
    slug: "leadership-influence",
    en: "Everyday Leadership & Persuasion",
    ar: "القيادة اليومية والإقناع البنّاء",
    unitEn: "Leadership & Growth",
    unitAr: "القيادة والنمو",
    vocab: [
      ["delegate", "يفوّض بفعالية", "assign"],
      ["initiative", "روح المبادرة", "proactivity"],
      ["feedback", "تغذية راجعة بنّاءة", "constructive review"],
      ["vision", "رؤية مستقبلية", "long-term goal"],
    ],
    contextEn: "leading group projects respectfully by listening actively and sharing credit",
    actionVerb: "lead",
  },
  {
    slug: "negotiation-compromise",
    en: "Constructive Negotiation & Compromise",
    ar: "التفاوض البنّاء والحلول الوسط",
    unitEn: "Negotiation Skills",
    unitAr: "مهارات التفاوض",
    vocab: [
      ["compromise", "حل وسط عادل", "middle ground"],
      ["mutual", "متبادل بين الطرفين", "shared"],
      ["concession", "تنازل مدروس", "adjustment"],
      ["agreement", "اتفاق مشترك", "accord"],
    ],
    contextEn: "reaching fair win-win agreements in workplace schedules and contract talks",
    actionVerb: "negotiate",
  },
  {
    slug: "data-charts-analysis",
    en: "Interpreting Charts, Trends & Evidence",
    ar: "قراءة الرسوم البيانية والاتجاهات والأدلة",
    unitEn: "Analytical Skills",
    unitAr: "المهارات التحليلية",
    vocab: [
      ["fluctuate", "يتذبذب صعودًا وهبوطًا", "vary"],
      ["steady", "ثابت ومستقر", "consistent"],
      ["proportion", "نسبة مئوية", "share"],
      ["correlation", "علاقة وارتباط إحصائي", "link"],
    ],
    contextEn: "describing upward trends, sharp contrasts, and key survey data accurately",
    actionVerb: "interpret",
  },
  {
    slug: "global-health-medicine",
    en: "Medical Breakthroughs & Preventive Care",
    ar: "الطفرات الطبية والرعاية الوقائية",
    unitEn: "Science & Health",
    unitAr: "العلوم والصحة",
    vocab: [
      ["preventive", "وقائي استباقي", "protective"],
      ["diagnostic", "تشخيصي دقيق", "investigative"],
      ["longevity", "طول العمر بصحة", "lifespan"],
      ["telehealth", "الرعاية الصحية عن بُعد", "remote medicine"],
    ],
    contextEn: "assessing how modern diagnostics and preventive habits raise quality of life",
    actionVerb: "assess",
  },
  {
    slug: "arts-design-architecture",
    en: "Design, Creativity & Inspiring Spaces",
    ar: "التصميم والإبداع والمساحات الملهمة",
    unitEn: "Arts & Design",
    unitAr: "الفنون والتصميم",
    vocab: [
      ["aesthetic", "جمالي وفني", "visual appeal"],
      ["functional", "عملي ووظيفي", "practical"],
      ["symmetry", "تناسق وتناظر", "balance"],
      ["inspire", "يُلهم ويحفّز", "motivate"],
    ],
    contextEn: "combining cultural aesthetics with everyday practicality in public buildings",
    actionVerb: "create",
  },
  {
    slug: "future-careers-lifelong-growth",
    en: "Future Careers & Lifelong Adaptability",
    ar: "مهن المستقبل والتكيّف المستمر",
    unitEn: "Future Readiness",
    unitAr: "الاستعداد للمستقبل",
    vocab: [
      ["adaptable", "مرن وقادر على التكيّف", "flexible"],
      ["upskill", "يطوّر مهاراته المهنية", "retrain"],
      ["collaborate", "يتعاون بفعالية", "partner"],
      ["mastery", "إتقان حقيقي", "expertise"],
    ],
    contextEn: "combining human creativity, strong English communication, and lifelong learning",
    actionVerb: "master",
  },
];

interface GrammarFocusSpec {
  en: string;
  ar: string;
  formula: string;
  sampleSentence: string;
  blankTemplate: string;
  blankAnswer: string;
  blankDistractors: [string, string, string];
  orderedWords: string[];
  wrongSample: string;
}

const LEVEL_GRAMMAR_POOL: Record<string, readonly GrammarFocusSpec[]> = {
  low: [
    {
      en: "Verb 'to be' in Affirmative & Questions",
      ar: "فعل الكينونة (am / is / are) في الإثبات والسؤال",
      formula: "I am · He/She/It is · You/We/They are",
      sampleSentence: "She is always ready for the morning class.",
      blankTemplate: "She ___ always ready for the morning class.",
      blankAnswer: "is",
      blankDistractors: ["am", "are", "be"],
      orderedWords: ["She", "is", "ready", "for", "class."],
      wrongSample: "She are always ready for class.",
    },
    {
      en: "Present Simple Routines & -s Endings",
      ar: "المضارع البسيط للعادات اليومية وإضافة -s",
      formula: "I/You/We/They + Verb · He/She/It + Verb-s",
      sampleSentence: "Omar prepares his study schedule every evening.",
      blankTemplate: "Omar ___ his study schedule every evening.",
      blankAnswer: "prepares",
      blankDistractors: ["prepare", "preparing", "prepared"],
      orderedWords: ["Omar", "prepares", "his", "schedule", "daily."],
      wrongSample: "Omar prepare his schedule every day.",
    },
    {
      en: "Articles (a, an, the) in Everyday Nouns",
      ar: "أدوات التعريف والنكرة (a / an / the)",
      formula: "a + consonant sound · an + vowel sound · the + specific",
      sampleSentence: "We visited an impressive library near the park.",
      blankTemplate: "We visited ___ impressive library near the park.",
      blankAnswer: "an",
      blankDistractors: ["a", "are", "is"],
      orderedWords: ["We", "visited", "an", "impressive", "library."],
      wrongSample: "We visited a impressive library today.",
    },
    {
      en: "There is / There are for Describing Places",
      ar: "استخدام There is و There are لوصف الأماكن",
      formula: "There is + singular · There are + plural",
      sampleSentence: "There are three quiet reading rooms on this floor.",
      blankTemplate: "___ three quiet reading rooms on this floor.",
      blankAnswer: "There are",
      blankDistractors: ["There is", "It is", "They is"],
      orderedWords: ["There", "are", "three", "quiet", "rooms."],
      wrongSample: "There is three quiet reading rooms here.",
    },
    {
      en: "Present Continuous for Actions Right Now",
      ar: "المضارع المستمر للأحداث الجارية الآن",
      formula: "am / is / are + Verb-ing",
      sampleSentence: "They are preparing fresh fruit for the picnic now.",
      blankTemplate: "They are ___ fresh fruit for the picnic now.",
      blankAnswer: "preparing",
      blankDistractors: ["prepare", "prepares", "prepared"],
      orderedWords: ["They", "are", "preparing", "fresh", "fruit."],
      wrongSample: "They preparing fresh fruit right now.",
    },
    {
      en: "Past Simple Regular & Irregular Verbs",
      ar: "الماضي البسيط للأفعال المنتظمة وغير المنتظمة",
      formula: "Subject + Verb-ed / V2 (yesterday, last week)",
      sampleSentence: "Yesterday our class visited the local science museum.",
      blankTemplate: "Yesterday our class ___ the local science museum.",
      blankAnswer: "visited",
      blankDistractors: ["visit", "visits", "visiting"],
      orderedWords: ["Yesterday", "our", "class", "visited", "the", "museum."],
      wrongSample: "Yesterday our class visit the museum.",
    },
    {
      en: "Modal 'Can' & 'Should' for Ability and Advice",
      ar: "الأفعال الناقصة can و should للقدرة والنصيحة",
      formula: "Subject + can / should + base verb",
      sampleSentence: "You should check the train timetable before leaving home.",
      blankTemplate: "You ___ check the train timetable before leaving home.",
      blankAnswer: "should",
      blankDistractors: ["shoulds", "to should", "shoulding"],
      orderedWords: ["You", "should", "check", "the", "timetable."],
      wrongSample: "You should to check the timetable.",
    },
    {
      en: "Prepositions of Time & Place (in, on, at)",
      ar: "حروف جر الزمان والمكان (in / on / at)",
      formula: "at + exact time · on + day/date · in + month/city",
      sampleSentence: "The community workshop starts on Monday at nine o'clock.",
      blankTemplate: "The community workshop starts ___ Monday at nine o'clock.",
      blankAnswer: "on",
      blankDistractors: ["in", "at", "to"],
      orderedWords: ["The", "workshop", "starts", "on", "Monday."],
      wrongSample: "The workshop starts in Monday morning.",
    },
    {
      en: "Comparatives & Superlatives in Everyday Choices",
      ar: "صيغ المقارنة والتفضيل في الاختيارات اليومية",
      formula: "adj-er / more + adj + than · the adj-est / most + adj",
      sampleSentence: "Taking the metro is faster than driving during rush hour.",
      blankTemplate: "Taking the metro is ___ than driving during rush hour.",
      blankAnswer: "faster",
      blankDistractors: ["more fast", "fastest", "fast"],
      orderedWords: ["The", "metro", "is", "faster", "than", "driving."],
      wrongSample: "The metro is more faster than driving.",
    },
    {
      en: "Future Plans with 'going to' and 'will'",
      ar: "التعبير عن الخطط المستقبلية بـ going to و will",
      formula: "am/is/are going to + V (plan) · will + V (promise)",
      sampleSentence: "We are going to plant ten shade trees this weekend.",
      blankTemplate: "We are ___ plant ten shade trees this weekend.",
      blankAnswer: "going to",
      blankDistractors: ["go to", "going", "will to"],
      orderedWords: ["We", "are", "going", "to", "plant", "trees."],
      wrongSample: "We going to plant shade trees tomorrow.",
    },
  ],
  mid: [
    {
      en: "Present Perfect vs. Past Simple Time Anchors",
      ar: "المضارع التام مقابل الماضي البسيط والدلالات الزمنية",
      formula: "have/has + V3 (since/for/yet) vs. V2 (in 2022/yesterday)",
      sampleSentence: "She has managed international projects since she joined the firm.",
      blankTemplate: "She ___ international projects since she joined the firm.",
      blankAnswer: "has managed",
      blankDistractors: ["managed", "manages", "is managing"],
      orderedWords: ["She", "has", "managed", "projects", "since", "2022."],
      wrongSample: "She has joined the firm in 2022.",
    },
    {
      en: "First & Second Conditionals for Plans and Advice",
      ar: "الجمل الشرطية الأولى والثانية للخطط والافتراضات",
      formula: "If + Present, will + V | If + Past, would + V",
      sampleSentence: "If cities expand bus lanes, daily commuters will save valuable time.",
      blankTemplate: "If cities ___ bus lanes, daily commuters will save valuable time.",
      blankAnswer: "expand",
      blankDistractors: ["will expand", "expanded", "expanding"],
      orderedWords: ["If", "cities", "expand", "buses,", "commuters", "save", "time."],
      wrongSample: "If cities will expand bus lanes, commuters save time.",
    },
    {
      en: "Defining & Non-Defining Relative Clauses",
      ar: "جمل الوصل المحدِّدة وغير المحدِّدة (who / which / where)",
      formula: "person → who · thing → which/that · place → where",
      sampleSentence: "The neighbourhood park, which opened last spring, welcomes families daily.",
      blankTemplate: "The neighbourhood park, ___ opened last spring, welcomes families daily.",
      blankAnswer: "which",
      blankDistractors: ["who", "what", "where"],
      orderedWords: ["The", "park", "which", "opened", "welcomes", "families."],
      wrongSample: "The neighbourhood park, that opened last spring, is busy.",
    },
    {
      en: "Passive Voice for Processes & Formal Reports",
      ar: "المبني للمجهول لوصف العمليات والتقارير الرسمية",
      formula: "Subject + be (is/was/has been) + Past Participle (V3)",
      sampleSentence: "Monthly budget reports are reviewed carefully before final approval.",
      blankTemplate: "Monthly budget reports ___ reviewed carefully before final approval.",
      blankAnswer: "are",
      blankDistractors: ["is", "be", "have"],
      orderedWords: ["Monthly", "reports", "are", "reviewed", "before", "approval."],
      wrongSample: "Monthly reports reviewed carefully before approval.",
    },
    {
      en: "Modal Verbs of Deduction & Obligation (must, might, have to)",
      ar: "أفعال الاستنتاج والإلزام (must / might / have to)",
      formula: "must + V (certain) · might + V (possible) · don't have to (optional)",
      sampleSentence: "The delayed flight might arrive slightly later due to heavy rain.",
      blankTemplate: "The delayed flight ___ arrive slightly later due to heavy rain.",
      blankAnswer: "might",
      blankDistractors: ["might to", "mights", "musted"],
      orderedWords: ["The", "flight", "might", "arrive", "slightly", "later."],
      wrongSample: "The flight might to arrive later today.",
    },
    {
      en: "Reported Speech & Polite Indirect Questions",
      ar: "الكلام المنقول والأسئلة غير المباشرة المهذبة",
      formula: "Could you tell me + subject + verb (no inversion)",
      sampleSentence: "Could you tell me where the registration desk is located?",
      blankTemplate: "Could you tell me where the registration desk ___ located?",
      blankAnswer: "is",
      blankDistractors: ["are", "does", "be"],
      orderedWords: ["Could", "you", "tell", "me", "where", "it", "is?"],
      wrongSample: "Could you tell me where is the desk?",
    },
    {
      en: "Gerunds vs. Infinitives After Common Verbs",
      ar: "المصدر بـ -ing مقابل to + الفعل بعد الأفعال الشائعة",
      formula: "enjoy/avoid/consider + V-ing | decide/plan/promise + to V",
      sampleSentence: "Most learners avoid memorising isolated lists without real sentences.",
      blankTemplate: "Most learners avoid ___ isolated lists without real sentences.",
      blankAnswer: "memorising",
      blankDistractors: ["to memorise", "memorise", "memorised"],
      orderedWords: ["Learners", "avoid", "memorising", "isolated", "word", "lists."],
      wrongSample: "Learners avoid to memorise isolated lists.",
    },
    {
      en: "Contrast Connectors (although, despite, however)",
      ar: "أدوات ربط التناقض (although / despite / however)",
      formula: "Although + Clause | Despite + Noun/V-ing | . However, + Clause",
      sampleSentence:
        "Despite facing tight deadlines, the engineering team delivered high quality.",
      blankTemplate: "___ facing tight deadlines, the engineering team delivered high quality.",
      blankAnswer: "Despite",
      blankDistractors: ["Although", "However", "Because"],
      orderedWords: ["Despite", "tight", "deadlines,", "they", "delivered", "quality."],
      wrongSample: "Despite they faced deadlines, they finished.",
    },
    {
      en: "Past Continuous & Past Perfect for Clear Sequencing",
      ar: "الماضي المستمر والماضي التام لترتيب الأحداث",
      formula: "had + V3 (earlier past) before Past Simple (later past)",
      sampleSentence: "By the time the seminar began, everyone had downloaded the handout.",
      blankTemplate: "By the time the seminar began, everyone ___ downloaded the handout.",
      blankAnswer: "had",
      blankDistractors: ["has", "was", "have"],
      orderedWords: ["Everyone", "had", "downloaded", "the", "seminar", "handout."],
      wrongSample: "Before the seminar began, everyone has finished.",
    },
    {
      en: "Quantifiers & Uncountable Nouns (much, many, little, few)",
      ar: "محدّدات الكمية والأسماء غير المعدودة",
      formula: "much / a little + uncountable · many / a few + plural countable",
      sampleSentence:
        "Very little evidence supports making policy changes without public feedback.",
      blankTemplate: "Very ___ evidence supports making policy changes without public feedback.",
      blankAnswer: "little",
      blankDistractors: ["few", "many", "several"],
      orderedWords: ["Very", "little", "evidence", "supports", "that", "claim."],
      wrongSample: "Very few evidence supports that claim.",
    },
  ],
  high: [
    {
      en: "Negative Inversion for Academic Emphasis",
      ar: "القلب النحوي بعد عبارات النفي للتأكيد الأكاديمي",
      formula: "Not only + Aux + Subject + Verb, but also ...",
      sampleSentence: "Not only does public transit reduce emissions, but it also lowers stress.",
      blankTemplate: "Not only ___ public transit reduce emissions, but it also lowers stress.",
      blankAnswer: "does",
      blankDistractors: ["is", "do", "has"],
      orderedWords: ["Not", "only", "does", "transit", "reduce", "emissions."],
      wrongSample: "Not only public transit reduces emissions.",
    },
    {
      en: "Mixed & Third Conditionals for Complex Policy Evaluation",
      ar: "الجمل الشرطية المختلطة والثالثة لتحليل السياسات",
      formula: "If + had V3, would + base verb (present result) / would have V3",
      sampleSentence:
        "Had planners invested earlier in rail, urban traffic would be far lighter today.",
      blankTemplate: "___ planners invested earlier in rail, urban traffic would be lighter today.",
      blankAnswer: "Had",
      blankDistractors: ["Have", "Did", "Would"],
      orderedWords: ["Had", "planners", "invested", "earlier,", "traffic", "would", "drop."],
      wrongSample: "If planners would have invested earlier, traffic dropped.",
    },
    {
      en: "Participle Clauses for Concise Academic Synthesis",
      ar: "جمل اسم الفاعل والمفعول للإيجاز الأكاديمي",
      formula: "Having + V3 / V-ing / V3-clause, Main Subject + Verb",
      sampleSentence:
        "Having reviewed the empirical data, the committee revised its funding strategy.",
      blankTemplate: "___ reviewed the empirical data, the committee revised its funding strategy.",
      blankAnswer: "Having",
      blankDistractors: ["Have", "Been", "Had"],
      orderedWords: ["Having", "reviewed", "the", "data,", "they", "revised", "plans."],
      wrongSample: "Reviewed the data, the committee revised plans.",
    },
    {
      en: "Cleft Sentences (It is ... that / What ... is) for Precision",
      ar: "الجمل المشطورة (Cleft Sentences) لإبراز الفكرة المحورية",
      formula: "What + Subject + Verb + is + Focus | It is + Focus + that ...",
      sampleSentence:
        "What distinguishes resilient cities is sustained investment in clean public transit.",
      blankTemplate: "___ distinguishes resilient cities is sustained investment in clean transit.",
      blankAnswer: "What",
      blankDistractors: ["That", "Which", "Where"],
      orderedWords: ["What", "distinguishes", "resilient", "cities", "is", "clean", "transit."],
      wrongSample: "That distinguishes resilient cities is clean transit.",
    },
    {
      en: "Academic Hedging & Cautious Modality (C1/C2)",
      ar: "التحفّظ الأكاديمي المتزن وصيغ الترجيح (Hedging)",
      formula: "tends to · appears to · may contribute to · is likely to",
      sampleSentence:
        "Early bilingual instruction appears to strengthen long-term cognitive flexibility.",
      blankTemplate:
        "Early bilingual instruction ___ to strengthen long-term cognitive flexibility.",
      blankAnswer: "appears",
      blankDistractors: ["appearing", "appear", "is appear"],
      orderedWords: ["Bilingual", "instruction", "appears", "to", "strengthen", "flexibility."],
      wrongSample: "Bilingual instruction always proves to fix everything.",
    },
    {
      en: "Nominalisation for Formal Executive & IELTS Writing",
      ar: "التحويل إلى الصيغ الاسمية الرسمية (Nominalisation)",
      formula: "Verb clause → Formal Noun Phrase (e.g. 'cities grow fast' → 'rapid urbanisation')",
      sampleSentence: "The gradual expansion of solar grids has lowered industrial energy costs.",
      blankTemplate: "The gradual ___ of solar grids has lowered industrial energy costs.",
      blankAnswer: "expansion",
      blankDistractors: ["expand", "expanding", "expansive"],
      orderedWords: ["The", "gradual", "expansion", "lowered", "energy", "costs."],
      wrongSample: "Because grids expanded gradually, it lowered costs.",
    },
    {
      en: "Subjunctive & Formal Recommendations",
      ar: "صيغة التوصية الرسمية (recommend / insist that + base verb)",
      formula: "recommend / propose / essential that + Subject + base verb",
      sampleSentence:
        "Auditors recommended that the municipality publish open budget data quarterly.",
      blankTemplate: "Auditors recommended that the municipality ___ open budget data quarterly.",
      blankAnswer: "publish",
      blankDistractors: ["publishes", "published", "publishing"],
      orderedWords: ["Auditors", "recommended", "that", "cities", "publish", "data."],
      wrongSample: "Auditors recommended that the city publishes data.",
    },
    {
      en: "Advanced Concession Clauses (Albeit, Notwithstanding, Whereas)",
      ar: "جمل الاستدراك المتقدمة (albeit / notwithstanding / whereas)",
      formula: "Clause, albeit + adj/phrase | Whereas + Clause A, Clause B",
      sampleSentence:
        "The solar plant delivered steady output, albeit at a higher initial capital cost.",
      blankTemplate:
        "The solar plant delivered steady output, ___ at a higher initial capital cost.",
      blankAnswer: "albeit",
      blankDistractors: ["whereas", "however", "despite of"],
      orderedWords: ["The", "plant", "succeeded,", "albeit", "at", "higher", "cost."],
      wrongSample: "The plant succeeded, despite of higher cost.",
    },
    {
      en: "Ellipsis & Substitution for Cohesive C2 Discourse",
      ar: "الحذف والاستبدال المرجعي لتماسك النصوص المتقدمة",
      formula: "do so · one/ones · the former / the latter · such measures",
      sampleSentence: "Firms that invest in retraining outperform rivals that fail to do so.",
      blankTemplate: "Firms that invest in retraining outperform rivals that fail to ___.",
      blankAnswer: "do so",
      blankDistractors: ["make it", "do such", "so do"],
      orderedWords: ["Firms", "outperform", "rivals", "that", "fail", "to", "do", "so."],
      wrongSample: "Firms outperform rivals that fail to make so.",
    },
    {
      en: "Fronted Prepositional & Adverbial Phrases",
      ar: "تقديم العبارات الظرفية والجرّية لضبط الإيقاع البلاغي",
      formula: "Seldom / Rarely / Only by + V-ing + Aux + Subject + Verb",
      sampleSentence:
        "Only by aligning education with industry needs can nations close skills gaps.",
      blankTemplate:
        "Only by aligning education with industry needs ___ nations close skills gaps.",
      blankAnswer: "can",
      blankDistractors: ["nations can", "are", "do"],
      orderedWords: ["Only", "by", "training", "can", "nations", "close", "gaps."],
      wrongSample: "Only by aligning training nations can close gaps.",
    },
  ],
};

interface CourseProfile {
  cefrTag: string;
  tier: "low" | "mid" | "high";
  genreLabel: Bilingual;
  writingMin: number;
  minutes: number;
  listeningEncouragement: Bilingual;
  acousticsFocus: Bilingual;
}

const COURSE_PROFILES: Record<LessonCourse, CourseProfile> = {
  a1: {
    cefrTag: "CEFR A1",
    tier: "low",
    genreLabel: { en: "A1 Beginner", ar: "المبتدئ A1" },
    writingMin: 40,
    minutes: 15,
    listeningEncouragement: {
      en: "Listen calmly for familiar everyday words—names, times, places, and key actions—and replay slowly whenever needed.",
      ar: "استمع بهدوء للكلمات اليومية المألوفة مثل الأسماء والأوقات والأماكن والأفعال الأساسية، وأعد التشغيل ببطء متى احتجت.",
    },
    acousticsFocus: {
      en: "Clear word boundaries, stressed everyday nouns, simple numbers, and rising intonation in Yes/No questions.",
      ar: "حدود الكلمات الواضحة، والأسماء اليومية المنبورة، والأرقام البسيطة، وارتفاع النبرة في الأسئلة.",
    },
  },
  a2: {
    cefrTag: "CEFR A2",
    tier: "low",
    genreLabel: { en: "A2 Elementary", ar: "الأساسي A2" },
    writingMin: 60,
    minutes: 18,
    listeningEncouragement: {
      en: "At A2, focus on catching the main message first and matching simple spoken phrases to their everyday equivalents.",
      ar: "في مستوى A2، ركّز على التقاط الفكرة الأساسية أولًا ومطابقة العبارات المسموعة بمعانيها اليومية.",
    },
    acousticsFocus: {
      en: "Everyday contractions, regular past -ed endings, polite question phrasing, and short linking words.",
      ar: "الاختصارات اليومية، نهايات الماضي المنتظم -ed، وصياغة الأسئلة المهذبة والروابط القصيرة.",
    },
  },
  b1: {
    cefrTag: "CEFR B1",
    tier: "mid",
    genreLabel: { en: "B1 Intermediate", ar: "المتوسط B1" },
    writingMin: 90,
    minutes: 20,
    listeningEncouragement: {
      en: "At B1, track opinions, reasons, and changes of plan rather than waiting for word-for-word matches.",
      ar: "في مستوى B1، تتبّع الآراء والأسباب وتغيّر الخطط بدل انتظار تطابق الكلمات حرفيًا.",
    },
    acousticsFocus: {
      en: "Connected speech linking, contrastive stress on 'but/however', and paraphrased workplace or travel details.",
      ar: "ربط الكلام المتصل، والنبر التقابلي مع أدوات الاستدراك، وإعادة صياغة تفاصيل العمل والسفر.",
    },
  },
  b2: {
    cefrTag: "CEFR B2",
    tier: "mid",
    genreLabel: { en: "B2 Upper-Intermediate", ar: "فوق المتوسط B2" },
    writingMin: 120,
    minutes: 25,
    listeningEncouragement: {
      en: "At B2, notice subtle speaker stance, implied reservations, and academic or workplace paraphrases at natural speed.",
      ar: "في مستوى B2، لاحظ موقف المتحدث الضمني وتحفظاته وإعادة الصياغة الأكاديمية والمهنية بالسرعة الطبيعية.",
    },
    acousticsFocus: {
      en: "Natural spoken pace, discourse signposts, emphatic stress, and formal-to-informal register shifts.",
      ar: "سرعة الحديث الطبيعية، إشارات تنظيم الخطاب، النبر التوكيدي، وتنقلات الأسلوب الرسمي واليومي.",
    },
  },
  c1: {
    cefrTag: "CEFR C1",
    tier: "high",
    genreLabel: { en: "C1 Advanced", ar: "المتقدم C1" },
    writingMin: 150,
    minutes: 28,
    listeningEncouragement: {
      en: "At C1, analyse nuanced argumentation, implicit concessions, and complex academic or executive synthesis seamlessly.",
      ar: "في مستوى C1، حلّل الحجج الدقيقة والاستدراكات الضمنية والتركيب الأكاديمي والتنفيذي المتقدم بسلاسة.",
    },
    acousticsFocus: {
      en: "Subtle hedging intonation, rapid academic reduction, rhetorical contrast, and multi-speaker debate cues.",
      ar: "تنغيم التحفّظ الأكاديمي، الاختزال الصوتي السريع، التباين البلاغي، وإشارات الحوار متعدد المتحدثين.",
    },
  },
  c2: {
    cefrTag: "CEFR C2",
    tier: "high",
    genreLabel: { en: "C2 Proficiency", ar: "الإتقان C2" },
    writingMin: 160,
    minutes: 30,
    listeningEncouragement: {
      en: "At C2, decode idiomatic precision, understated irony, and high-level policy nuance across complex authentic speech.",
      ar: "في مستوى C2، التقط دقة التعابير الاصطلاحية والفوارق البلاغية الرفيعة في الخطاب المتقدم الأصيل.",
    },
    acousticsFocus: {
      en: "Native-speed phrasing, nuanced prosody, rhetorical emphasis, and subtle pragmatic implications.",
      ar: "صياغة بسرعة المتحدث الأصلي، الإيقاع الصوتي الدقيق، التأكيد البلاغي، والدلالات السياقية اللطيفة.",
    },
  },
  kids: {
    cefrTag: "Kids Pre-A1–B1",
    tier: "low",
    genreLabel: { en: "Kids ESL", ar: "إنجليزية الأطفال" },
    writingMin: 35,
    minutes: 12,
    listeningEncouragement: {
      en: "Listen happily to Pip, Lina, and Omar! Spot the colourful clue words and tap replay whenever you want to hear again.",
      ar: "استمع بمرح إلى Pip ولينا وعمر! التقط الكلمات المفتاحية الجميلة وأعد الاستماع متى شئت.",
    },
    acousticsFocus: {
      en: "Friendly slow English, clear initial and final consonant sounds, short/long vowels, and joyful question melodies.",
      ar: "إنجليزية واضحة وهادئة، وأصوات البداية والنهاية، والحروف المتحركة القصيرة والطويلة، ونغمة الأسئلة المرحة.",
    },
  },
  adults: {
    cefrTag: "Adults A1–C2",
    tier: "mid",
    genreLabel: { en: "Practical Adults", ar: "إنجليزية الكبار العملية" },
    writingMin: 90,
    minutes: 20,
    listeningEncouragement: {
      en: "Listen like a confident adult communicator: catch practical outcomes, times, commitments, and polite phrasing immediately.",
      ar: "استمع كمتواصل واثق: التقط النتائج العملية والأوقات والالتزامات والعبارات المهذبة فورًا.",
    },
    acousticsFocus: {
      en: "Real-world workplace and travel phrasing, polite modal reductions, and clear confirmation cues.",
      ar: "عبارات العمل والسفر الواقعية، وتخفيف الأفعال الناقصة المهذبة، وإشارات التأكيد الواضحة.",
    },
  },
  ielts: {
    cefrTag: "IELTS Band 7.0+",
    tier: "high",
    genreLabel: { en: "IELTS Academic & General", ar: "آيلتس الأكاديمي والعام" },
    writingMin: 150,
    minutes: 25,
    listeningEncouragement: {
      en: "Train exam discipline: anticipate synonym paraphrases, listen for self-corrections and distractors, and stay calm after tough items.",
      ar: "تدرّب على انضباط الاختبار: توقّع إعادة الصياغة بالمرادفات، وانتبه للتصحيح الذاتي والمشتتات، وحافظ على هدوئك.",
    },
    acousticsFocus: {
      en: "IELTS-style distractors, mid-sentence corrections, academic signposting, and lexical paraphrasing.",
      ar: "مشتتات شبيهة بالآيلتس، وتصحيحات منتصف الجملة، وإشارات تنظيم المحاضرة، وإعادة الصياغة المعجمية.",
    },
  },
};

function buildWritingModel(
  theme: CompactTheme,
  profile: CourseProfile,
  minimum: number,
  lessonNum: number,
): string {
  const [v1, v2, v3, v4] = theme.vocab;
  const paragraphs = [
    `In modern ${profile.genreLabel.en} contexts, ${theme.en.toLowerCase()} plays an essential role in helping learners and communities ${theme.actionVerb} clear, practical outcomes. When people pay close attention to ${v1[0]} and remain ${v2[0]} in their daily decisions, they build steady confidence and avoid unnecessary stress.`,
    `A clear practical example appears when ${theme.contextEn}. First, setting a realistic plan around ${v3[0]} ensures every participant understands what matters most. Second, reviewing progress regularly with ${v4[0]} turns good intentions into measurable habits that last over time.`,
    `Of course, challenges still arise when schedules become crowded or priorities compete for attention. However, combining clear communication, patient practice, and honest reflection allows individuals to adapt smoothly. Rather than waiting for perfect conditions, taking one focused step each day builds real mastery.`,
    `Furthermore, looking at broader long-term evidence shows that institutions and families benefit most when they reinforce ${v1[0]} alongside transparent feedback. Rather than treating ${theme.en.toLowerCase()} as an isolated task, connecting daily habits around ${v3[0]} with measurable milestones encourages steady motivation and prevents avoidable setbacks.`,
    `Equally important is balancing ambition with realistic pacing. Learners and professionals who examine ${v4[0]} honestly can adjust their methods early, exchange constructive advice with peers, and sustain strong outcomes even during demanding academic or workplace seasons.`,
    `In conclusion, approaching ${theme.en.toLowerCase()} thoughtfully benefits both personal growth and shared community life. By applying ${v1[0]}, valuing ${v2[0]} standards, and strengthening ${v3[0]} alongside ${v4[0]} (Module ${lessonNum}), anyone can achieve lasting, meaningful progress.`,
  ];

  let draft = paragraphs[0]!;
  for (let i = 1; i < paragraphs.length; i++) {
    const wc = draft.trim().split(/\s+/).length;
    if (wc >= minimum + 15) break;
    draft += `\n\n${paragraphs[i]}`;
  }
  return draft;
}

function buildDetailedGuideForExpanded(
  theme: CompactTheme,
  grammar: GrammarFocusSpec,
  skill: LessonSkill,
  profile: CourseProfile,
): DetailedRuleGuide {
  const [v1, v2, v3] = theme.vocab;
  return {
    summary: {
      en: `This ${profile.cefrTag} ${skill} lesson builds real-world fluency in ${theme.en} by pairing high-utility vocabulary (${v1[0]}, ${v2[0]}, ${v3[0]}) with accurate control of ${grammar.en}.`,
      ar: `يبني هذا الدرس (${profile.cefrTag}) طلاقة عملية في «${theme.ar}» عبر دمج المفردات الأساسية (${v1[0]} و${v2[0]} و${v3[0]}) مع إتقان «${grammar.ar}».`,
    },
    whenToUse: [
      {
        en: `Apply this pattern whenever you are ${theme.contextEn} in speech or writing.`,
        ar: `طبّق هذا الأسلوب عند الحديث أو الكتابة حول «${theme.ar}» في المواقف الواقعية.`,
      },
      {
        en: `Follow the core structure "${grammar.formula}" to keep ideas clear, accurate, and natural.`,
        ar: `التزم بالصيغة الأساسية «${grammar.formula}» لجعل جملك واضحة وطبيعية ودقيقة.`,
      },
      {
        en: `Combine target words like "${v1[0]}" (${v1[1]}) and "${v2[0]}" (${v2[1]}) inside full sentences instead of isolated lists.`,
        ar: `وظّف الكلمات المستهدفة مثل ${v1[0]} (${v1[1]}) و${v2[0]} (${v2[1]}) داخل جمل كاملة.`,
      },
    ],
    formulas: [
      {
        label: { en: "Core Pattern", ar: "التركيب الأساسي" },
        pattern: grammar.formula,
        example: grammar.sampleSentence,
        arabic: `مثال تطبيقي على ${grammar.ar}.`,
      },
      {
        label: { en: "Key Vocabulary in Action", ar: "المفردات في سياقها" },
        pattern: `${v1[0]} (${v1[2]}) + ${v2[0]} (${v2[2]})`,
        example: `Focusing on ${v1[0]} helps us ${theme.actionVerb} stronger results every week.`,
        arabic: `التركيز على ${v1[1]} يساعدنا على تحقيق نتائج أقوى أسبوعيًا.`,
      },
      {
        label: { en: "Natural Contrast & Follow-up", ar: "الربط والاسترسال الطبيعي" },
        pattern: "Main point + specific reason + concrete example",
        example: `In daily life, ${v3[0]} matters because it supports ${v4Safe(theme)} smoothly.`,
        arabic: `قدّم الفكرة الرئيسية ثم السبب ثم مثالًا محددًا لرفع وضوح الإجابة.`,
      },
    ],
    commonMistakes: [
      {
        wrong: grammar.wrongSample,
        right: grammar.sampleSentence,
        why: {
          en: `Check verb agreement, auxiliary forms, and word order carefully when using ${grammar.en}.`,
          ar: `راجع تطابق الفعل والأفعال المساعدة وترتيب الكلمات بدقة عند استخدام ${grammar.ar}.`,
        },
      },
      {
        wrong: `Translating "${theme.ar}" word-for-word from Arabic without checking English collocations.`,
        right: `Use natural English chunks like "${v1[0]}" and "${v2[0]}" directly inside complete sentences.`,
        why: {
          en: "Natural English relies on established verb-noun and adjective-noun pairings rather than literal translation.",
          ar: "تعتمد الإنجليزية الطبيعية على التلازمات اللفظية المعتمدة بدل الترجمة الحرفية كلمة بكلمة.",
        },
      },
    ],
    memoryTip: {
      en: `Anchor "${grammar.en}" to "${theme.en}": practise saying "${grammar.sampleSentence}" aloud twice!`,
      ar: `اربط قاعدة «${grammar.ar}» بموضوع «${theme.ar}» وردّد الجملة النموذجية بصوت مسموع مرتين!`,
    },
  };
}

function v4Safe(theme: CompactTheme): string {
  return theme.vocab[3][0];
}

function buildExpandedLesson(
  course: LessonCourse,
  skill: LessonSkill,
  indexZeroBased: number,
): Lesson {
  const num = indexZeroBased + 1;
  const theme = CURRICULUM_THEMES_50[indexZeroBased % CURRICULUM_THEMES_50.length]!;
  const profile = COURSE_PROFILES[course];
  const pool = LEVEL_GRAMMAR_POOL[profile.tier]!;
  const grammar = pool[indexZeroBased % pool.length]!;
  const [v1, v2, v3, v4] = theme.vocab;

  const vocab: VocabItem[] = theme.vocab.map(([word, arabic, synonym]) => ({
    word,
    meaningEn: `${synonym} — essential ${profile.cefrTag} term in ${theme.en.toLowerCase()}`,
    meaningAr: arabic,
    synonym,
    example: `In ${theme.en.toLowerCase()}, understanding "${word}" (${synonym}) makes communication clearer.`,
  }));

  const skillLabel: Record<LessonSkill, Bilingual> = {
    grammar: { en: "Grammar", ar: "القواعد" },
    reading: { en: "Reading", ar: "القراءة" },
    listening: { en: "Listening", ar: "الاستماع" },
    writing: { en: "Writing", ar: "الكتابة" },
    speaking: { en: "Speaking", ar: "المحادثة" },
  };

  const title: Bilingual =
    skill === "grammar"
      ? {
          en: `${profile.cefrTag} Grammar ${num}: ${grammar.en} — ${theme.en}`,
          ar: `قواعد ${profile.cefrTag} (${num}): ${grammar.ar} — ${theme.ar}`,
        }
      : {
          en: `${profile.cefrTag} ${skillLabel[skill].en} ${num}: ${theme.en}`,
          ar: `${skillLabel[skill].ar} ${profile.cefrTag} (${num}): ${theme.ar}`,
        };

  const goal: Bilingual = {
    en: `Master ${theme.en.toLowerCase()} at ${profile.cefrTag} level using "${v1[0]}", "${v2[0]}", and accurate ${grammar.en.toLowerCase()}.`,
    ar: `أتقن مهارة ${skillLabel[skill].ar} في «${theme.ar}» بمستوى ${profile.cefrTag} مع توظيف «${v1[0]}» و«${v2[0]}» وقاعدة «${grammar.ar}».`,
  };

  const exampleText =
    skill === "listening" || skill === "speaking"
      ? `Nadia: Welcome to session ${num} on ${theme.en.toLowerCase()}. How do you usually ${theme.actionVerb} your plan?\nKareem: First I focus on ${v1[0]} so everything stays ${v2[0]}. ${grammar.sampleSentence}\nNadia: That is practical. What role does ${v3[0]} play when things get busy?\nKareem: Having clear ${v3[0]} and checking ${v4[0]} keeps our whole team calm and productive.`
      : `${theme.en} is a key part of everyday ${profile.genreLabel.en} communication. When people focus on ${theme.contextEn}, paying attention to ${v1[0]} and keeping habits ${v2[0]} creates clear, reliable results. ${grammar.sampleSentence} In addition, combining ${v3[0]} with ${v4[0]} helps learners and teams respond smoothly to unexpected changes without losing momentum.`;

  const baseMcq1: LessonQuestion = {
    format: "multiple-choice",
    kind: skill === "grammar" ? "grammar" : "comprehension",
    prompt: `In this ${profile.cefrTag} lesson on ${theme.en}, which word means "${v1[2]}" (${v1[1]})?`,
    options: [v1[0], v2[0], v3[0], v4[0]],
    correct: 0,
    explanation: {
      en: `"${v1[0]}" means "${v1[2]}" (${v1[1]}) and is central to ${theme.en.toLowerCase()}.`,
      ar: `كلمة «${v1[0]}» تعني «${v1[1]}» (${v1[2]}) وهي أساسية في موضوع «${theme.ar}».`,
    },
  };

  const baseMcq2: LessonQuestion = {
    format: "multiple-choice",
    kind: "vocabulary",
    prompt: `Which option best matches "${v2[1]}" (${v2[2]}) in the context of ${theme.en}?`,
    options: [v3[0], v2[0], v4[0], v1[0]],
    correct: 1,
    explanation: {
      en: `"${v2[0]}" corresponds accurately to "${v2[2]}" (${v2[1]}).`,
      ar: `كلمة «${v2[0]}» تطابق معنى «${v2[1]}» بدقة في هذا السياق.`,
    },
  };

  const pickWordQ = makePickWord({
    kind: skill === "grammar" ? "grammar" : "vocabulary",
    sentence: grammar.blankTemplate,
    options: [
      grammar.blankAnswer,
      grammar.blankDistractors[0],
      grammar.blankDistractors[1],
      grammar.blankDistractors[2],
    ],
    correct: 0,
    explanation: {
      en: `"${grammar.blankAnswer}" completes the ${grammar.en} structure accurately: "${grammar.sampleSentence}"`,
      ar: `الخيار الصحيح هو «${grammar.blankAnswer}» لإتمام قاعدة ${grammar.ar} بدقة.`,
    },
  });

  const rearrangeQ = makeRearrange({
    kind: skill === "grammar" ? "grammar" : "comprehension",
    orderedWords: grammar.orderedWords,
    explanation: {
      en: `Correct natural word order: "${grammar.orderedWords.join(" ")}"`,
      ar: `الترتيب الطبيعي الصحيح للجملة هو: ${grammar.orderedWords.join(" ")}`,
    },
  });

  const fitSentenceQ = makeFitSentence({
    kind: skill === "grammar" ? "grammar" : "vocabulary",
    prompt: `Write one clear sentence about ${theme.en} using "${v1[0]}" and "${grammar.blankAnswer}".`,
    cueWords: [v1[0], grammar.blankAnswer, v2[0]],
    requiredTerms: [v1[0]],
    modelSentence: `Good ${v1[0]} helps learners stay ${v2[0]} every single week.`,
    sentenceHint: {
      en: `Include "${v1[0]}" inside a complete English sentence of at least 5 words.`,
      ar: `وظّف كلمة «${v1[0]}» داخل جملة إنجليزية كاملة من ٥ كلمات على الأقل.`,
    },
    explanation: {
      en: `A strong sentence uses "${v1[0]}" naturally in context, e.g. "Good ${v1[0]} helps learners stay ${v2[0]} every single week."`,
      ar: `الجملة المتقنة توظف «${v1[0]}» بشكل طبيعي في سياق واضح.`,
    },
    minWords: 5,
  });

  const questions: LessonQuestion[] = [baseMcq1, baseMcq2, pickWordQ, rearrangeQ, fitSentenceQ];

  const detailedGuide = buildDetailedGuideForExpanded(theme, grammar, skill, profile);

  const writingMin = course === "ielts" && num % 2 === 0 ? 250 : profile.writingMin;

  return {
    id: `${course}-${skill}-exp-${String(num).padStart(2, "0")}-${theme.slug}`,
    course,
    skill,
    unit: {
      en: `${profile.cefrTag} · ${theme.unitEn}`,
      ar: `${profile.cefrTag} · ${theme.unitAr}`,
    },
    title,
    goal,
    minutes: profile.minutes,
    teaching: [
      {
        en: `Key Focus (${profile.cefrTag}): When ${theme.contextEn}, apply "${grammar.en}" (${grammar.formula}) to express ideas accurately and naturally.`,
        ar: `التركيز الأساسي (${profile.cefrTag}): عند تناول «${theme.ar}»، طبّق قاعدة «${grammar.ar}» (${grammar.formula}) للتعبير بدقة ووضوح.`,
      },
      {
        en: `Core Vocabulary Toolkit: "${v1[0]}" (${v1[2]}), "${v2[0]}" (${v2[2]}), "${v3[0]}" (${v3[2]}), and "${v4[0]}" (${v4[2]}). Study how each word functions inside the model below.`,
        ar: `حقيبة المفردات الأساسية: ${v1[0]} (${v1[1]})، ${v2[0]} (${v2[1]})، ${v3[0]} (${v3[1]})، و${v4[0]} (${v4[1]}). لاحظ كيفية توظيفها في النموذج أدناه.`,
      },
    ],
    example: exampleText,
    pronunciation: grammar.sampleSentence,
    pronunciationTip: {
      en: `Read "${grammar.sampleSentence}" in natural thought groups, stressing "${v1[0]}" and key content words clearly.`,
      ar: `اقرأ الجملة في مجموعات معنوية طبيعية مع إبراز الكلمات المفتاحية بوضوح دون تسرّع.`,
    },
    vocab,
    taskPlan: {
      scenario: {
        en: `Real-world ${profile.cefrTag} task: navigating ${theme.en.toLowerCase()} while ${theme.contextEn}.`,
        ar: `موقف تطبيقي لمستوى ${profile.cefrTag}: التعامل مع «${theme.ar}» بثقة ووضوح في السياق اليومي.`,
      },
      preTask: {
        en: `Preview the 4 target words (${v1[0]}, ${v2[0]}, ${v3[0]}, ${v4[0]}) and predict two real situations where ${theme.en.toLowerCase()} comes up.`,
        ar: `استعرض المفردات الأربع المستهدفة وتوقّع موقفين واقعيين يرتبطان بـ«${theme.ar}».`,
      },
      mainTask: {
        en: `Complete the ${skillLabel[skill].en.toLowerCase()} study stage, check your understanding across all interactive drills, and apply "${grammar.en}" in your own words.`,
        ar: `أكمل مرحلة ${skillLabel[skill].ar}، وحلّ التدريبات التفاعلية المتنوعة، وطبّق القاعدة بأسلوبك الخاص.`,
      },
      languageFocus: {
        en: `Grammar target: ${grammar.en} (${grammar.formula}) paired with "${v1[0]}" and "${v2[0]}".`,
        ar: `التركيز اللغوي: قاعدة «${grammar.ar}» (${grammar.formula}) مع مفردتي «${v1[0]}» و«${v2[0]}».`,
      },
      postTask: {
        en: `Shadow the pronunciation target aloud and complete the 10-question objective mastery check to unlock completion.`,
        ar: `ردّد جملة النطق بصوت مسموع وأكمل اختبار الإتقان المكوّن من ١٠ أسئلة لتثبيت التقدّم.`,
      },
    },
    detailedGuide,
    questions,
    ...(skill === "listening"
      ? {
          listeningPlan: {
            levelEncouragement: profile.listeningEncouragement,
            acousticsFocus: profile.acousticsFocus,
            steps: [
              {
                en: "Step 1 (Pre-Listen): Preview the 4 vocabulary items and predict what details the speakers will share.",
                ar: "الخطوة ١ (قبل الاستماع): استعرض المفردات الأربع وتوقّع التفاصيل التي سيذكرها المتحدثان.",
              },
              {
                en: "Step 2 (Listen Twice): Play once for the main outcome, then listen again to catch exact paraphrases.",
                ar: "الخطوة ٢ (استماع مرتين): استمع أولًا للفكرة العامة ثم أعد الاستماع لالتقاط الصياغات الدقيقة.",
              },
              {
                en: "Step 3 (Verify & Shadow): Answer every comprehension item before checking the transcript, then shadow the target line.",
                ar: "الخطوة ٣ (التحقق والتظليل): أجب عن الأسئلة قبل فتح النص ثم ردّد الجملة النموذجية بصوتك.",
              },
            ],
            paraphrasePairs: [
              {
                spoken: v1[0],
                equivalent: v1[2],
                arabic: v1[1],
              },
              {
                spoken: v2[0],
                equivalent: v2[2],
                arabic: v2[1],
              },
              {
                spoken: v3[0],
                equivalent: v3[2],
                arabic: v3[1],
              },
              {
                spoken: v4[0],
                equivalent: v4[2],
                arabic: v4[1],
              },
            ],
          },
        }
      : {}),
    ...(skill === "writing"
      ? {
          writing: {
            prompt: `Write at least ${writingMin} words on "${theme.en}" (${profile.cefrTag}). Include clear organisation, concrete examples, and accurate use of "${v1[0]}" and "${v2[0]}".`,
            minimum: writingMin,
            checklist: [
              {
                en: `Meet the minimum length of ${writingMin} words with clear paragraph structure.`,
                ar: `الالتزام بالحد الأدنى (${writingMin} كلمة) مع تقسيم واضح للفقرات.`,
              },
              {
                en: `Use at least two target vocabulary items (${v1[0]}, ${v2[0]}, ${v3[0]}, ${v4[0]}) naturally.`,
                ar: `توظيف كلمتين على الأقل من مفردات الدرس بشكل طبيعي.`,
              },
              {
                en: `Apply "${grammar.en}" accurately and proofread verb tenses before finishing.`,
                ar: `تطبيق قاعدة «${grammar.ar}» بدقة ومراجعة الأزمنة قبل التسليم.`,
              },
            ],
            model: buildWritingModel(theme, profile, writingMin, num),
          },
        }
      : {}),
  };
}

/**
 * Ensures every course (CEFR A1–C2 + Kids, Adults, IELTS) has at least 50 unique lessons
 * in EVERY core skill (grammar, reading, listening, writing, speaking) while keeping all
 * original authored lessons and free-preview lessons strictly first and untouched.
 */
export function expandCourseTo50PerSkill(
  course: LessonCourse,
  existing: readonly Lesson[],
): Lesson[] {
  const result: Lesson[] = [...existing];
  const usedIds = new Set(existing.map((l) => l.id));
  const usedTitlesEn = new Set(existing.map((l) => l.title.en));
  const usedTitlesAr = new Set(existing.map((l) => l.title.ar));

  for (const skill of ALL_LESSON_SKILLS) {
    let count = existing.filter((l) => l.skill === skill).length;
    let cursor = 0;
    while (count < MIN_LESSONS_PER_SKILL) {
      const candidate = buildExpandedLesson(course, skill, cursor);
      cursor += 1;
      if (
        usedIds.has(candidate.id) ||
        usedTitlesEn.has(candidate.title.en) ||
        usedTitlesAr.has(candidate.title.ar)
      ) {
        continue;
      }
      usedIds.add(candidate.id);
      usedTitlesEn.add(candidate.title.en);
      usedTitlesAr.add(candidate.title.ar);
      result.push(candidate);
      count += 1;
    }
  }

  return result;
}
