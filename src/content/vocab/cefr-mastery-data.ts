import type { CefrLevel } from "@/content/courses";
import type { CefrMasteryIndicatorId, CefrMasteryLevelData } from "./vocab-types";
import type { Bilingual } from "@/content/lesson-types";

export const CEFR_MASTERY_INDICATORS: {
  id: CefrMasteryIndicatorId;
  label: Bilingual;
  description: Bilingual;
}[] = [
  {
    id: "understand",
    label: { en: "Understand Vocabulary", ar: "فهم المفردات بدقة" },
    description: {
      en: "Accurately identify core meanings and nuances at this CEFR level.",
      ar: "تحديد المعنى الدقيق والفروق الدلالية للمفردات في هذا المستوى.",
    },
  },
  {
    id: "context",
    label: { en: "Recognise in Context", ar: "تمييز المفردة داخل السياق" },
    description: {
      en: "Select the natural word or collocation that fits a real sentence.",
      ar: "اختيار الكلمة أو التلازم الطبيعي الذي يناسب السياق الحقيقي.",
    },
  },
  {
    id: "original-sentence",
    label: { en: "Original Sentence Production", ar: "بناء جملة أصلية" },
    description: {
      en: "Produce your own accurate sentence using target vocabulary naturally.",
      ar: "كتابة جملة صحيحة من إنشائك توظّف المفردات المستهدفة بطبيعية.",
    },
  },
  {
    id: "grammar-accuracy",
    label: { en: "Grammatical Accuracy", ar: "تطبيق القواعد النحوية بدقة" },
    description: {
      en: "Apply level-appropriate tense, agreement, and clause structures accurately.",
      ar: "تطبيق الأزمنة وتطابق الفاعل وبنية الجملة بدقة مناسبة للمستوى.",
    },
  },
  {
    id: "paragraph",
    label: { en: "Meaningful Paragraph", ar: "بناء فقرة متماسكة" },
    description: {
      en: "Link multiple sentences smoothly into one coherent short paragraph.",
      ar: "ربط عدة جمل بسلاسة لتكوين فقرة ذات معنى واضح ومترابط.",
    },
  },
  {
    id: "opinion-justify",
    label: { en: "Opinion & Justification", ar: "إبداء الرأي وتبرير الحجة" },
    description: {
      en: "Express a clear viewpoint and justify it with a logical reason or example.",
      ar: "التعبير عن رأي واضح ودعمه بسبب منطقي أو مثال عملي.",
    },
  },
  {
    id: "realistic-comm",
    label: { en: "Realistic Communication", ar: "التواصل الطبيعي في موقف واقعي" },
    description: {
      en: "Respond naturally and politely in an authentic everyday, academic, or workplace exchange.",
      ar: "الرد بطبيعية ولباقة في موقف يومي أو أكاديمي أو مهني حقيقي.",
    },
  },
];

export const CEFR_MASTERY_LEVELS: CefrMasteryLevelData[] = [
  // ========================= A1 — BEGINNER =========================
  {
    level: "A1",
    title: { en: "A1 · Beginner Foundations", ar: "A1 · الأساسيات للمبتدئ" },
    cefrDescriptor: {
      en: "Can introduce oneself and others, describe people and daily routines, ask simple personal questions, and handle basic everyday needs slowly and clearly.",
      ar: "يستطيع التعريف بنفسه والآخرين، ووصف الأشخاص والروتين اليومي، وطرح أسئلة شخصية بسيطة وتلبية الاحتياجات اليومية بوضوح.",
    },
    essentialVocab: [
      {
        word: "routine",
        ipa: "/ruːˈtiːn/",
        pos: "noun",
        definition: "The usual order in which you do everyday activities.",
        arabic: "الروتين اليومي",
        collocation: "daily routine",
        example: "My daily routine starts at six o'clock every morning.",
      },
      {
        word: "friendly",
        ipa: "/ˈfrend.li/",
        pos: "adjective",
        definition: "Warm, kind, and pleasant to talk to.",
        arabic: "ودود / لطيف",
        collocation: "a friendly neighbour",
        example: "Our new English teacher is very friendly and patient.",
      },
      {
        word: "appointment",
        ipa: "/əˈpɔɪnt.mənt/",
        pos: "noun",
        definition: "A fixed time arranged to meet a doctor, teacher, or colleague.",
        arabic: "موعد محدد",
        collocation: "book an appointment",
        example: "I have a dental appointment at three o'clock on Tuesday.",
      },
      {
        word: "nearby",
        ipa: "/ˌnɪəˈbaɪ/",
        pos: "adverb / adjective",
        definition: "Only a short distance away from where you are.",
        arabic: "قريب / بالجوار",
        collocation: "a pharmacy nearby",
        example: "There is a quiet bakery nearby.",
      },
    ],
    commonExpressions: [
      {
        expression: "Nice to meet you!",
        arabic: "تشرّفت بمعرفتك!",
        context: { en: "First-time greeting", ar: "التحية عند اللقاء الأول" },
        example: "Hello, I am Omar. Nice to meet you!",
      },
      {
        expression: "Could you repeat that, please?",
        arabic: "هل يمكنك تكرار ذلك من فضلك؟",
        context: { en: "Polite classroom or shop clarification", ar: "طلب الإعادة بلباقة" },
        example: "Sorry, I am still learning. Could you repeat that, please?",
      },
      {
        expression: "How much is this?",
        arabic: "كم سعر هذا؟",
        context: { en: "Everyday shopping", ar: "التسوق اليومي" },
        example: "Excuse me, how much is this blue notebook?",
      },
    ],
    collocations: [
      {
        collocation: "have breakfast",
        arabic: "يتناول الفطور",
        example: "We have breakfast together at seven.",
      },
      {
        collocation: "take the bus",
        arabic: "يركب الحافلة",
        example: "She takes the bus to university every day.",
      },
      {
        collocation: "do homework",
        arabic: "يحل الواجب المنزلي",
        example: "I do my English homework after dinner.",
      },
    ],
    phrasalVerbs: [
      {
        verb: "wake up",
        meaning: "To stop sleeping in the morning.",
        arabic: "يستيقظ",
        example: "He wakes up at six thirty on weekdays.",
      },
      {
        verb: "sit down",
        meaning: "To take a seat on a chair.",
        arabic: "يجلس",
        example: "Please come in and sit down.",
      },
    ],
    idioms: [
      {
        idiom: "early bird",
        meaning: "Someone who wakes up early in the morning.",
        arabic: "شخص يستيقظ مبكرًا",
        register: "everyday",
        example: "My father is an early bird—he drinks coffee at five thirty!",
      },
      {
        idiom: "night owl",
        meaning: "Someone who prefers to stay awake and active late at night.",
        arabic: "شخص يفضّل السهر ليلًا",
        register: "everyday",
        example: "My brother is a night owl—he studies until midnight.",
      },
    ],
    grammaticalStructures: [
      {
        structure: "Verb 'to be' (am / is / are)",
        formula: "I → am | He / She / It → is | You / We / They → are",
        explanation: {
          en: "Always include am/is/are between the subject and a noun, job, or adjective.",
          ar: "ضع دائمًا am أو is أو are بين الفاعل والاسم أو المهنة أو الصفة.",
        },
        example: "My sister is a nurse, and we are from Jeddah.",
      },
      {
        structure: "Present Simple Routines",
        formula: "I/You/We/They + base verb | He/She/It + verb-s/-es",
        explanation: {
          en: "Describe daily habits and facts; use do/does for questions and negatives.",
          ar: "لوصف العادات اليومية؛ نضيف -s مع He/She/It ونستخدم do/does في السؤال والنفي.",
        },
        example: "She works at a clinic, and she doesn't work on Fridays.",
      },
    ],
    sentencePatterns: [
      {
        functionLabel: { en: "Self-Introduction", ar: "التعريف بالنفس" },
        pattern: "My name is [Name]. I am from [City], and I am a [Job/Student].",
        example: "My name is Sara. I am from Riyadh, and I am a student.",
        arabic: "اسمي سارة. أنا من الرياض، وأنا طالبة.",
      },
      {
        functionLabel: { en: "Asking About Places", ar: "السؤال عن الأماكن" },
        pattern: "Excuse me, is there a [place] nearby?",
        example: "Excuse me, is there a pharmacy nearby?",
        arabic: "معذرة، هل توجد صيدلية قريبة هنا؟",
      },
    ],
    communicationDomains: {
      everyday: {
        focus: {
          en: "Greeting neighbours, ordering coffee, and describing your daily schedule.",
          ar: "تحية الجيران وطلب القهوة ووصف جدولك اليومي.",
        },
        sample: "Good morning! Could I have a small tea, please? Thank you!",
      },
      academic: {
        focus: {
          en: "Introducing yourself in class and asking the teacher to spell or repeat a word.",
          ar: "التعريف بنفسك في الصف وطلب تكرار كلمة أو تهجئتها.",
        },
        sample: "Hello everyone! I am Tariq. Sorry, how do you spell that word?",
      },
      professional: {
        focus: {
          en: "Stating your job title, office hours, and polite phone greetings.",
          ar: "ذكر مسماك الوظيفي وساعات العمل والتحية المهذبة.",
        },
        sample: "Hello, I am Omar from Reception. Our office opens at eight o'clock.",
      },
    },
    mcqChecks: [
      {
        indicator: "understand",
        prompt: "What does 'daily routine' mean?",
        options: [
          "The regular things you do every day",
          "A long holiday abroad",
          "A type of expensive restaurant",
          "A difficult maths test",
        ],
        correct: 0,
        explanation: {
          en: "'Daily routine' refers to your normal everyday activities such as waking up, eating, and working.",
          ar: "يعني daily routine الأنشطة الاعتيادية التي تقوم بها كل يوم.",
        },
      },
      {
        indicator: "context",
        prompt: "Choose the natural collocation: 'I usually ___ breakfast at seven o'clock.'",
        options: ["have", "do", "make up", "drive"],
        correct: 0,
        explanation: {
          en: "In English we say 'have breakfast / lunch / dinner' (not 'do breakfast').",
          ar: "في الإنجليزية نقول have breakfast وليس do breakfast.",
        },
      },
      {
        indicator: "grammar-accuracy",
        prompt: "Choose the accurate A1 sentence:",
        options: [
          "My brother is an engineer, and he works in Dammam.",
          "My brother an engineer, and he work in Dammam.",
          "My brother are an engineer, and he working in Dammam.",
          "My brother is a engineer, and he doesn't works in Dammam.",
        ],
        correct: 0,
        explanation: {
          en: "Singular 'My brother' (he) takes 'is', vowel-sound 'engineer' takes 'an', and Present Simple adds '-s' ('works').",
          ar: "المفرد يأخذ is، وكلمة engineer تبدأ بصوت علة فتأخذ an، والفعل يأخذ s (works).",
        },
      },
    ],
    productionTasks: [
      {
        indicator: "original-sentence",
        prompt: {
          en: "Write one original sentence about your daily routine using 'wake up' or 'have breakfast'.",
          ar: "اكتب جملة أصلية عن روتينك اليومي باستخدام wake up أو have breakfast.",
        },
        requiredTerms: ["wake up|wakes up|have breakfast|has breakfast"],
        minWords: 6,
        modelResponse: "I wake up at six thirty and have breakfast with my family.",
        rubricHint: {
          en: "Include a subject + verb + clock time (e.g., at seven o'clock).",
          ar: "اذكر الفاعل والفعل ووقت الساعة (مثل at seven o'clock).",
        },
      },
      {
        indicator: "paragraph",
        prompt: {
          en: "Write a short 3-sentence paragraph introducing yourself (name, city, and one daily habit).",
          ar: "اكتب فقرة قصيرة من ٣ جمل تعرّف فيها بنفسك (الاسم والمدينة وعادة يومية).",
        },
        requiredTerms: ["am|is", "from|live|study|work"],
        minWords: 18,
        modelResponse:
          "Hello! My name is Layla, and I am from Abha. I am a university student. Every morning, I wake up at seven and study English before class.",
        rubricHint: {
          en: "Use 'I am' (never drop 'am') and write at least 18 words.",
          ar: "استخدم I am ولا تحذف فعل الكينونة واكتب ١٨ كلمة على الأقل.",
        },
      },
      {
        indicator: "opinion-justify",
        prompt: {
          en: "Say whether you prefer mornings or evenings, and give one simple reason using 'because'.",
          ar: "اذكر هل تفضل الصباح أم المساء مع سبب بسيط باستخدام because.",
        },
        requiredTerms: ["because", "morning|mornings|evening|evenings"],
        minWords: 8,
        modelResponse: "I like mornings because the house is quiet and I feel fresh.",
        rubricHint: {
          en: "Pattern: I like [mornings/evenings] because [simple reason].",
          ar: "النمط: I like ... because ...",
        },
      },
      {
        indicator: "realistic-comm",
        prompt: {
          en: "You meet a new classmate on day one. Greet them politely, introduce yourself, and ask where they are from.",
          ar: "التقيت بزميل جديد في اليوم الأول؛ حيّه بلطف وعرّف بنفسك واسأله من أين هو.",
        },
        requiredTerms: ["hello|hi|good morning", "from"],
        minWords: 10,
        modelResponse: "Hi! Nice to meet you. My name is Omar. Where are you from?",
        rubricHint: {
          en: "Include a friendly greeting and the question 'Where are you from?'",
          ar: "ابدأ بتحية ودية ثم اسأل Where are you from?",
        },
      },
    ],
  },

  // ========================= A2 — ELEMENTARY =========================
  {
    level: "A2",
    title: { en: "A2 · Elementary Everyday Control", ar: "A2 · التحكم اليومي الأساسي" },
    cefrDescriptor: {
      en: "Can describe past experiences, compare familiar options, talk about future plans, and communicate straightforward practical needs in shops, travel, and work.",
      ar: "يستطيع وصف تجارب الماضي ومقارنة الخيارات المألوفة والحديث عن الخطط المستقبلية وتلبية الاحتياجات العملية في السفر والعمل.",
    },
    essentialVocab: [
      {
        word: "experience",
        ipa: "/ɪkˈspɪə.ri.əns/",
        pos: "noun",
        definition:
          "Something that happens to you and leaves a lasting impression, or practical skill gained over time.",
        arabic: "تجربة / خبرة عملية",
        collocation: "an unforgettable experience",
        example: "Visiting Al-Ula last winter was an unforgettable experience.",
      },
      {
        word: "convenient",
        ipa: "/kənˈviː.ni.ənt/",
        pos: "adjective",
        definition: "Easy to use, close by, or fitting well with your schedule.",
        arabic: "مريح ومناسب (من حيث الوقت أو الموقع)",
        collocation: "a convenient location",
        example: "The new metro station is very convenient for commuters.",
      },
      {
        word: "delay",
        ipa: "/dɪˈleɪ/",
        pos: "noun / verb",
        definition: "A period of waiting when a flight, train, or task happens later than planned.",
        arabic: "تأخير / يؤخّر",
        collocation: "a two-hour flight delay",
        example: "Heavy fog caused a short delay at the airport.",
      },
      {
        word: "advice",
        ipa: "/ədˈvaɪs/",
        pos: "noun (uncountable)",
        definition: "Helpful suggestions about what someone should do.",
        arabic: "نصيحة (غير معدودة بالإنجليزية)",
        collocation: "give helpful advice",
        example: "My teacher gave me useful advice before the exam.",
      },
    ],
    commonExpressions: [
      {
        expression: "I'm looking forward to...",
        arabic: "أتطلّع بشوق إلى...",
        context: { en: "Future plans & polite emails", ar: "الخطط المستقبلية والرسائل المهذبة" },
        example: "I'm looking forward to visiting my cousins next weekend.",
      },
      {
        expression: "Could I exchange this for a larger size?",
        arabic: "هل يمكنني استبدال هذا بمقاس أكبر؟",
        context: { en: "Shopping & customer service", ar: "التسوق وخدمة العملاء" },
        example: "Excuse me, I have the receipt. Could I exchange this jacket?",
      },
      {
        expression: "Would you mind helping me with...?",
        arabic: "هل تمانع في مساعدتي بـ...؟",
        context: {
          en: "Polite everyday requests at travel desks or work",
          ar: "الطلبات المهذبة في السفر والعمل",
        },
        example: "Excuse me, would you mind helping me find the train platform?",
      },
    ],
    collocations: [
      {
        collocation: "make a reservation",
        arabic: "يقوم بحجز (مطعم أو فندق)",
        example: "We made a reservation for four people at eight.",
      },
      {
        collocation: "save money",
        arabic: "يدّخر المال",
        example: "Cooking at home helps students save money.",
      },
      {
        collocation: "catch a train",
        arabic: "يلحق بالقطار",
        example: "We left early to catch the morning train.",
      },
    ],
    phrasalVerbs: [
      {
        verb: "look for",
        meaning: "To try to find something or someone.",
        arabic: "يبحث عن",
        example: "I am looking for a quieter apartment near my office.",
      },
      {
        verb: "check in",
        meaning: "To register at a hotel or airport desk.",
        arabic: "يُسجّل الوصول (في فندق أو مطار)",
        example: "Passengers should check in at least two hours before departure.",
      },
    ],
    idioms: [
      {
        idiom: "call it a day",
        meaning: "To stop working because you have done enough for today.",
        arabic: "ينهي العمل لهذا اليوم",
        register: "everyday",
        example: "We finished all five reports—let's call it a day!",
      },
      {
        idiom: "make up your mind",
        meaning: "To reach a final decision after thinking about options.",
        arabic: "يحسم قراره / يقرر نهائيًا",
        register: "everyday",
        example: "I haven't made up my mind about which hotel to book yet.",
      },
    ],
    grammaticalStructures: [
      {
        structure: "Past Simple (Regular, Irregular & Did)",
        formula: "Subject + V-ed / V2 | Did + Subject + base verb?",
        explanation: {
          en: "Use Past Simple for finished past actions; after 'did / didn't', always return to the base verb.",
          ar: "للأحداث المنتهية في الماضي؛ وبعد did/didn't يعود الفعل دائمًا إلى صورته الأساسية.",
        },
        example: "We drove to Taif last Friday, and we didn't hit any traffic.",
      },
      {
        structure: "Future Plans (be going to vs. will)",
        formula: "am/is/are going to + verb (plan) | will + verb (decision now)",
        explanation: {
          en: "Use 'going to' for plans decided earlier, and 'will' for spontaneous offers or promises.",
          ar: "نستخدم going to للخطط المسبقة، وwill للقرار اللحظي أو الوعد.",
        },
        example: "I am going to start an IELTS course next month.",
      },
    ],
    sentencePatterns: [
      {
        functionLabel: { en: "Comparing Two Options", ar: "مقارنة خيارين" },
        pattern: "[Option A] is more [adjective] / [adjective]-er than [Option B].",
        example: "Taking the train is faster and more relaxing than driving.",
        arabic: "ركوب القطار أسرع وأكثر راحة من القيادة.",
      },
      {
        functionLabel: { en: "Giving Friendly Advice", ar: "تقديم نصيحة ودية" },
        pattern: "You should [base verb] because [reason].",
        example: "You should book your flight early because summer tickets sell out fast.",
        arabic: "ينبغي أن تحجز تذكرتك مبكرًا لأن تذاكر الصيف تنفد بسرعة.",
      },
    ],
    communicationDomains: {
      everyday: {
        focus: {
          en: "Sharing weekend stories, handling travel delays, and making weekend plans.",
          ar: "رواية قصص عطلة نهاية الأسبوع والتعامل مع تأخر السفر والتخطيط.",
        },
        sample:
          "Last weekend we visited the museum, and next Friday we're going to hike in the mountains.",
      },
      academic: {
        focus: {
          en: "Comparing two study methods and asking for feedback on an assignment.",
          ar: "مقارنة أسلوبين للمذاكرة وطلب ملاحظات على واجب دراسي.",
        },
        sample: "Studying with flashcards is more effective for me than reading silently.",
      },
      professional: {
        focus: {
          en: "Booking meetings, reporting a short delay politely, and confirming schedules.",
          ar: "حجز المواعيد والإبلاغ اللبق عن تأخير قصير وتأكيد الجداول.",
        },
        sample: "Sorry for the short delay—I will send the updated schedule before three o'clock.",
      },
    },
    mcqChecks: [
      {
        indicator: "understand",
        prompt: "Which sentence uses the uncountable noun 'advice' accurately?",
        options: [
          "She gave me some very helpful advice before the interview.",
          "She gave me an advice before the interview.",
          "She gave me many advices before the interview.",
          "She gave me a few advices before the interview.",
        ],
        correct: 0,
        explanation: {
          en: "'Advice' is uncountable in English—use 'some advice' or 'a piece of advice', never 'an advice' or 'advices'.",
          ar: "كلمة advice غير معدودة فلا تأخذ a ولا تُجمع؛ نقول some advice أو a piece of advice.",
        },
      },
      {
        indicator: "context",
        prompt: "We arrived early at the hotel to ___ before our meeting.",
        options: ["check in", "wake out", "call off", "drop up"],
        correct: 0,
        explanation: {
          en: "'Check in' means registering your arrival at a hotel or airport.",
          ar: "يعني الفعل المركب check in تسجيل الوصول في الفندق أو المطار.",
        },
      },
      {
        indicator: "grammar-accuracy",
        prompt: "Choose the grammatically accurate Past Simple question:",
        options: [
          "Did you visit your grandparents last weekend?",
          "Did you visited your grandparents last weekend?",
          "Were you visit your grandparents last weekend?",
          "You visited your grandparents last weekend?",
        ],
        correct: 0,
        explanation: {
          en: "Past Simple action questions use 'Did + Subject + base verb (visit)'.",
          ar: "بعد Did يعود الفعل الرئيسي إلى صورته الأساسية visit دون -ed.",
        },
      },
    ],
    productionTasks: [
      {
        indicator: "original-sentence",
        prompt: {
          en: "Write one sentence comparing two ways of travelling using a comparative adjective ('faster', 'cheaper', or 'more convenient').",
          ar: "اكتب جملة تقارن فيها بين وسيلتي سفر باستخدام صفة مقارنة.",
        },
        requiredTerms: ["than", "faster|cheaper|more convenient|better|easier"],
        minWords: 8,
        modelResponse:
          "Taking the metro is faster and more convenient than driving during rush hour.",
        rubricHint: {
          en: "Remember: use '-er' for short adjectives or 'more' for long adjectives, followed by 'than'.",
          ar: "استخدم -er للصفات القصيرة وmore للطويلة متبوعة بـ than.",
        },
      },
      {
        indicator: "paragraph",
        prompt: {
          en: "Write a 3-sentence paragraph describing a memorable weekend or trip in the past.",
          ar: "اكتب فقرة من ٣ جمل تصف فيها عطلة أو رحلة جميلة قمت بها في الماضي.",
        },
        requiredTerms: ["last|yesterday|ago|visited|went|was|were"],
        minWords: 22,
        modelResponse:
          "Last month I visited Jeddah with my family. We walked along the corniche and tried fresh seafood at a quiet restaurant. It was a wonderful experience, and we are going to go back next winter.",
        rubricHint: {
          en: "Keep your past verbs consistent (visited, went, was/were) and write at least 22 words.",
          ar: "حافظ على زمن الماضي البسيط في الجمل واكتب ٢٢ كلمة على الأقل.",
        },
      },
      {
        indicator: "opinion-justify",
        prompt: {
          en: "Give advice to a friend who wants to save money, using 'should' and 'because'.",
          ar: "قدّم نصيحة لصديق يريد ادخار المال باستخدام should وbecause.",
        },
        requiredTerms: ["should", "because"],
        minWords: 10,
        modelResponse:
          "You should cook at home during the week because restaurant meals quickly become expensive.",
        rubricHint: {
          en: "Use 'should + bare verb' (no 'to') + 'because + reason'.",
          ar: "استخدم should متبوعة بالفعل المجرد بدون to ثم because.",
        },
      },
      {
        indicator: "realistic-comm",
        prompt: {
          en: "Your train is delayed by 20 minutes. Write a polite message to a colleague explaining the delay and when you will arrive.",
          ar: "تأخر قطارك ٢٠ دقيقة؛ اكتب رسالة مهذبة لزميلك تشرح فيها التأخير ومتى ستصل.",
        },
        requiredTerms: ["sorry|apologies", "delay|delayed|late", "will"],
        minWords: 12,
        modelResponse:
          "Hi Omar, sorry for the short delay—my train is running twenty minutes late, so I will arrive at nine twenty.",
        rubricHint: {
          en: "Apologise briefly, explain the cause clearly, and state your new arrival time with 'will'.",
          ar: "اعتذر باختصار ووضّح السبب وموعد وصولك باستخدام will.",
        },
      },
    ],
  },

  // ========================= B1 — INTERMEDIATE =========================
  {
    level: "B1",
    title: { en: "B1 · Intermediate Independence", ar: "B1 · الاستقلالية المتوسطة" },
    cefrDescriptor: {
      en: "Can narrate connected events, explain opinions and plans clearly, discuss familiar work and study topics, and handle unexpected situations independently.",
      ar: "يستطيع سرد الأحداث المترابطة، وشرح الآراء والخطط بوضوح، ومناقشة موضوعات العمل والدراسة والتعامل مع المواقف غير المتوقعة باستقلالية.",
    },
    essentialVocab: [
      {
        word: "reliable",
        ipa: "/rɪˈlaɪ.ə.bəl/",
        pos: "adjective",
        definition: "Able to be trusted to work well or do what is promised consistently.",
        arabic: "موثوق / يُعتمد عليه",
        collocation: "reliable public transport",
        example: "Reliable high-speed internet is essential for online classes.",
      },
      {
        word: "flexible",
        ipa: "/ˈflek.sə.bəl/",
        pos: "adjective",
        definition: "Able to change or adapt easily to suit new conditions or schedules.",
        arabic: "مَرِن / قابل للتكيّف",
        collocation: "flexible working hours",
        example: "Many parents appreciate flexible working hours.",
      },
      {
        word: "challenge",
        ipa: "/ˈtʃæl.ɪndʒ/",
        pos: "noun / verb",
        definition: "A difficult task that tests your skill, patience, or determination.",
        arabic: "تحدٍ / يتحدى",
        collocation: "overcome a challenge",
        example: "Moving to a new city was a real challenge, yet it made me more confident.",
      },
      {
        word: "benefit",
        ipa: "/ˈben.ɪ.fɪt/",
        pos: "noun / verb",
        definition: "A helpful or positive advantage gained from something.",
        arabic: "فائدة / ميزة / يستفيد من",
        collocation: "a major benefit of",
        example: "One major benefit of cycling is saving money while staying fit.",
      },
    ],
    commonExpressions: [
      {
        expression: "In my experience...",
        arabic: "من واقع تجربتي...",
        context: {
          en: "Explaining an opinion with personal evidence",
          ar: "دعم الرأي بتجربة شخصية",
        },
        example:
          "In my experience, studying for twenty minutes every day beats cramming once a week.",
      },
      {
        expression: "On the other hand...",
        arabic: "من ناحية أخرى...",
        context: { en: "Balancing two viewpoints", ar: "الموازنة بين رأيين" },
        example: "Working remotely saves commuting time; on the other hand, it can feel isolating.",
      },
      {
        expression: "To be honest, I think...",
        arabic: "بصراحة، أعتقد أن...",
        context: {
          en: "Sharing an honest everyday opinion naturally",
          ar: "التعبير عن رأي صريح بطبيعية في الحديث اليومي",
        },
        example:
          "To be honest, I think public transport is far less stressful than driving downtown.",
      },
    ],
    collocations: [
      {
        collocation: "make progress",
        arabic: "يُحرز تقدمًا",
        example: "She has made steady progress in spoken English since January.",
      },
      {
        collocation: "meet a deadline",
        arabic: "يلتزم بالموعد النهائي",
        example: "Our team stayed focused to meet the Thursday deadline.",
      },
      {
        collocation: "take responsibility for",
        arabic: "يتحمّل المسؤولية عن",
        example: "Good leaders take responsibility for solving team problems.",
      },
    ],
    phrasalVerbs: [
      {
        verb: "figure out",
        meaning: "To understand or solve a problem after thinking about it.",
        arabic: "يكتشف الحل / يفهم سبب مشكلة",
        example: "It took us ten minutes to figure out why the projector had no sound.",
      },
      {
        verb: "catch up with",
        meaning: "To talk with someone you have not seen recently, or reach the required level.",
        arabic: "يلتقي للتحدث بعد غياب / يُعوّض ما فاته",
        example: "I met an old university friend to catch up over coffee.",
      },
    ],
    idioms: [
      {
        idiom: "on the same page",
        meaning: "Sharing the same understanding or agreement about a plan.",
        arabic: "على توافق وفهم مشترك",
        register: "professional",
        example: "Let's review the schedule quickly so everyone is on the same page.",
      },
      {
        idiom: "in the long run",
        meaning: "Over a long period of time in the future, rather than immediately.",
        arabic: "على المدى البعيد",
        register: "neutral",
        example: "Learning a language steadily every day pays off in the long run.",
      },
    ],
    grammaticalStructures: [
      {
        structure: "Present Perfect vs. Past Simple",
        formula:
          "have/has + V3 (life experience / bridge to now) vs. Past Simple (specific past date)",
        explanation: {
          en: "Use Present Perfect for unstated time or ongoing duration ('for/since'), and switch to Past Simple when naming a finished past time.",
          ar: "المضارع التام للتجربة غير المؤرخة أو الممتدة للحاضر، والماضي البسيط عند ذكر وقت منتهٍ.",
        },
        example: "I have worked here for three years; I joined the company in 2023.",
      },
      {
        structure: "1st & 2nd Conditionals",
        formula: "If + Present → will + verb | If + Past Simple → would + verb",
        explanation: {
          en: "1st conditional describes real future outcomes; 2nd conditional describes imaginary or unlikely scenarios.",
          ar: "الشرط الأول لنتائج مستقبلية واقعية، والثاني لمواقف افتراضية.",
        },
        example: "If the city built more bike lanes, more commuters would cycle to work.",
      },
    ],
    sentencePatterns: [
      {
        functionLabel: { en: "Balanced Viewpoint", ar: "عرض رأي متوازن" },
        pattern: "Although [Advantage/View A], I believe [Main View] because [Reason].",
        example:
          "Although online learning is convenient, I believe live feedback helps learners improve faster.",
        arabic: "رغم أن التعلم عبر الإنترنت مريح، أعتقد أن التغذية الراجعة المباشرة تسرّع التطور.",
      },
      {
        functionLabel: { en: "Narrating an Interruption", ar: "سرد حدث قاطع في القصة" },
        pattern: "While I was [verb-ing], [sudden Past Simple event].",
        example: "While I was preparing my slides, the internet connection suddenly dropped.",
        arabic: "بينما كنتُ أُجهّز الشرائح، انقطع الاتصال بالإنترنت فجأة.",
      },
    ],
    communicationDomains: {
      everyday: {
        focus: {
          en: "Narrating travel stories, recommending books/films, and resolving everyday mix-ups.",
          ar: "سرد قصص السفر وتقديم التوصيات وحل المشكلات اليومية.",
        },
        sample:
          "While we were waiting at the gate, the airline moved our flight to a bigger aircraft.",
      },
      academic: {
        focus: {
          en: "Explaining study habits, summarising short articles, and supporting opinions with reasons.",
          ar: "شرح عادات الدراسة وتلخيص المقالات ودعم الرأي بالأسباب.",
        },
        sample:
          "Although group projects take extra coordination, they teach students how to listen and compromise.",
      },
      professional: {
        focus: {
          en: "Explaining job responsibilities, negotiating realistic deadlines, and updating managers.",
          ar: "شرح المسؤوليات الوظيفية ومناقشة المواعيد النهائية وتحديث المديرين.",
        },
        sample:
          "I have finished the client draft, and if we review it today, we will easily meet Friday's deadline.",
      },
    },
    mcqChecks: [
      {
        indicator: "understand",
        prompt: "What does it mean to 'meet a deadline'?",
        options: [
          "Complete a task on or before the agreed final time",
          "Cancel a scheduled team meeting",
          "Meet a new manager for the first time",
          "Ask for extra holiday days",
        ],
        correct: 0,
        explanation: {
          en: "'Meet a deadline' is the standard collocation for finishing work on time.",
          ar: "التلازم meet a deadline يعني إنجاز العمل قبل أو في الموعد النهائي المحدد.",
        },
      },
      {
        indicator: "context",
        prompt: "Our software crashed, so it took an hour to ___ what had gone wrong.",
        options: ["figure out", "pass down", "turn off", "run across"],
        correct: 0,
        explanation: {
          en: "'Figure out' means to investigate and solve a puzzle or technical issue.",
          ar: "يعني figure out التوصل لفهم المشكلة وإيجاد حلها.",
        },
      },
      {
        indicator: "grammar-accuracy",
        prompt: "Choose the accurate B1 conditional sentence:",
        options: [
          "If I had more free time, I would learn Spanish.",
          "If I would have more free time, I learned Spanish.",
          "If I have more free time, I would learn Spanish.",
          "If I had more free time, I will learn Spanish.",
        ],
        correct: 0,
        explanation: {
          en: "Second Conditional uses 'If + Past Simple (had)' + 'would + base verb (learn)'.",
          ar: "الشرط الثاني يجمع بين If + ماضٍ بسيط (had) وجملة النتيجة بـ would + المصدر.",
        },
      },
    ],
    productionTasks: [
      {
        indicator: "original-sentence",
        prompt: {
          en: "Write an original sentence using 'make progress' or 'overcome a challenge' with Present Perfect (have/has).",
          ar: "اكتب جملة أصلية تستخدم فيها make progress أو overcome a challenge مع المضارع التام.",
        },
        requiredTerms: ["have|has", "progress|challenge"],
        minWords: 9,
        modelResponse:
          "I have made steady progress in English since I started practising every morning.",
        rubricHint: {
          en: "Pair 'have/has' + past participle ('made', 'overcome').",
          ar: "استخدم have/has مع التصريف الثالث مثل made أو overcome.",
        },
      },
      {
        indicator: "paragraph",
        prompt: {
          en: "Write a coherent 3–4 sentence paragraph describing a challenge you faced at school or work and how you solved it.",
          ar: "اكتب فقرة مترابطة من ٣–٤ جمل تصف فيها تحديًا واجهته في الدراسة أو العمل وكيف حللته.",
        },
        requiredTerms: ["challenge|problem|difficult", "so|because|however|finally|although"],
        minWords: 32,
        modelResponse:
          "Last year I faced a major challenge when I had to present a project in English for the first time. At first I felt nervous, so I practised my slides aloud for ten minutes every evening. Although I made two small mistakes, I stayed calm and finished clearly.",
        rubricHint: {
          en: "Connect your events with linkers (At first, so, although, finally) and aim for 32+ words.",
          ar: "اربط الجمل بأدوات ربط منطقية واكتب ٣٢ كلمة على الأقل.",
        },
      },
      {
        indicator: "opinion-justify",
        prompt: {
          en: "Do you prefer flexible remote work or working in an office? Give a balanced opinion using 'although' or 'on the other hand'.",
          ar: "هل تفضل العمل المرن عن بُعد أم في المكتب؟ اكتب رأيًا متوازنًا باستخدام although أو on the other hand.",
        },
        requiredTerms: ["although|on the other hand|however", "because|since|so"],
        minWords: 16,
        modelResponse:
          "Although working from home saves commuting time, I prefer hybrid work because face-to-face teamwork builds stronger trust.",
        rubricHint: {
          en: "Acknowledge one side, then state and justify your main preference.",
          ar: "اذكر جانبًا أولًا ثم بيّن رأيك الأساسي مع السبب.",
        },
      },
      {
        indicator: "realistic-comm",
        prompt: {
          en: "A colleague misunderstood the project deadline. Write a diplomatic reply to get everyone 'on the same page'.",
          ar: "أخطأ زميلك في فهم الموعد النهائي للمشروع؛ اكتب ردًا لبقًا يجمعكما على نفس الفهم.",
        },
        requiredTerms: ["deadline|schedule", "same page|confirm|check"],
        minWords: 14,
        modelResponse:
          "Thanks for the update, Tariq! Just to make sure we are on the same page, the final client deadline is Thursday at three.",
        rubricHint: {
          en: "Stay polite and collaborative while confirming the exact date/time.",
          ar: "حافظ على نبرة تعاونية مهذبة مع تأكيد الموعد الدقيق.",
        },
      },
    ],
  },

  // ========================= B2 — UPPER INTERMEDIATE =========================
  {
    level: "B2",
    title: { en: "B2 · Upper-Intermediate Fluency & Argument", ar: "B2 · الطلاقة وبناء الحجة" },
    cefrDescriptor: {
      en: "Can develop well-structured arguments on abstract subjects, express nuanced opinions, evaluate advantages and drawbacks, and interact fluently with native speakers.",
      ar: "يستطيع بناء حجج منظمة حول موضوعات مجردة، والتعبير عن آراء دقيقة، وموازنة المزايا والعيوب والتفاعل بطلاقة في النقاشات المهنية والأكاديمية.",
    },
    essentialVocab: [
      {
        word: "feasible",
        ipa: "/ˈfiː.zə.bəl/",
        pos: "adjective",
        definition: "Practical, realistic, and capable of being achieved with available resources.",
        arabic: "عملي / قابل للتطبيق",
        collocation: "economically feasible",
        example: "Building a coastal railway proved both technically and financially feasible.",
      },
      {
        word: "drawback",
        ipa: "/ˈdrɔː.bæk/",
        pos: "noun",
        definition: "A disadvantage or negative feature of a plan, product, or policy.",
        arabic: "عيب / جانب سلبي",
        collocation: "a notable drawback",
        example: "The main drawback of short-term contracts is lower staff loyalty.",
      },
      {
        word: "consensus",
        ipa: "/kənˈsen.səs/",
        pos: "noun (uncountable / singular)",
        definition: "General agreement reached by all or most members of a group.",
        arabic: "إجماع / توافق عام",
        collocation: "reach a consensus",
        example: "After two hours of debate, the committee reached a consensus on the budget.",
      },
      {
        word: "compelling",
        ipa: "/kəmˈpel.ɪŋ/",
        pos: "adjective",
        definition: "So clear, forceful, and persuasive that it strongly convinces people.",
        arabic: "مقنع بقوة / لافت ومؤثر",
        collocation: "a compelling argument",
        example: "She made a compelling case for expanding early-childhood grants.",
      },
    ],
    commonExpressions: [
      {
        expression: "To a certain extent, I agree, yet...",
        arabic: "أتفق إلى حدٍ ما، غير أن...",
        context: {
          en: "Diplomatic disagreement & nuanced debate",
          ar: "الاختلاف الدبلوماسي وبناء الحجة",
        },
        example:
          "To a certain extent, I agree with automation, yet retraining workers must come first.",
      },
      {
        expression: "Taking everything into account...",
        arabic: "بأخذ كل العوامل في الحسبان...",
        context: { en: "Concluding an analytical argument", ar: "تلخيص حجة تحليلية" },
        example:
          "Taking everything into account, the long-term benefits clearly outweigh the initial cost.",
      },
      {
        expression: "A compelling case can be made for...",
        arabic: "يمكن تقديم حجة مقنعة لصالح...",
        context: {
          en: "Presenting a strong structured argument",
          ar: "عرض حجة قوية ومنظمة",
        },
        example: "A compelling case can be made for extending public library hours on weekends.",
      },
    ],
    collocations: [
      {
        collocation: "outweigh the drawbacks",
        arabic: "تفوق المزايا العيوب",
        example: "The environmental gains far outweigh the short-term drawbacks.",
      },
      {
        collocation: "raise serious concerns",
        arabic: "يُثير مخاوف جدية",
        example: "Unregulated data collection has raised serious concerns about privacy.",
      },
      {
        collocation: "strike a balance between",
        arabic: "يحقق توازنًا بين",
        example: "Schools need to strike a balance between digital tools and handwriting.",
      },
    ],
    phrasalVerbs: [
      {
        verb: "bring about",
        meaning: "To cause an important change or result to happen.",
        arabic: "يُحدث (تغييرًا أو نتيجة مهمة)",
        example: "Targeted investment can bring about lasting regional revival.",
      },
      {
        verb: "weigh up",
        meaning: "To compare the advantages and risks carefully before deciding.",
        arabic: "يُوازن بعناية بين الخيارات",
        example: "Before signing the lease, we need to weigh up all hidden maintenance costs.",
      },
    ],
    idioms: [
      {
        idiom: "the tip of the iceberg",
        meaning: "Only a small visible sign of a much larger underlying problem.",
        arabic: "غيض من فيض / الجزء الظاهر فقط من مشكلة أعمق",
        register: "neutral",
        example:
          "Delayed deliveries are just the tip of the iceberg; the real issue is warehouse software.",
      },
      {
        idiom: "weigh up the pros and cons",
        meaning: "To carefully evaluate both the advantages and disadvantages before deciding.",
        arabic: "يوازن بين الإيجابيات والسلبيات بدقة",
        register: "professional",
        example:
          "Before expanding overseas, the board weighed up the pros and cons of local partnerships.",
      },
    ],
    grammaticalStructures: [
      {
        structure: "Concessive Linkers (Despite / In spite of vs. Although)",
        formula: "Despite + noun/-ing | Although + Subject + Verb",
        explanation: {
          en: "'Despite' never takes 'of' and is followed by a noun phrase or -ing form; 'Although' introduces a full clause.",
          ar: "لا تأخذ Despite حرف of ويتبعها اسم أو -ing، أما Although فيتبعها جملة فعلية كاملة.",
        },
        example: "Despite tight funding, the clinic extended evening hours.",
      },
      {
        structure: "3rd Conditional & Modals of Past Deduction",
        formula: "If + had + V3 → would have + V3 | must/might/can't have + V3",
        explanation: {
          en: "Evaluate past decisions and express logical certainty or doubt about past events.",
          ar: "لتقييم قرارات الماضي والتعبير عن الاستنتاج المنطقي بشأن أحداث سابقة.",
        },
        example:
          "Had the team tested the app earlier, they would have caught the bug before launch.",
      },
    ],
    sentencePatterns: [
      {
        functionLabel: { en: "Weighing Both Sides", ar: "الموازنة بين المزايا والعيوب" },
        pattern: "While [Proposal] offers [Benefit], one notable drawback is [Risk].",
        example:
          "While remote hiring widens the talent pool, one notable drawback is coordinating time zones.",
        arabic:
          "رغم أن التوظيف عن بُعد يوسع قاعدة الكفاءات، إلا أن من أبرز عيوبه تنسيق المناطق الزمنية.",
      },
      {
        functionLabel: { en: "Proposing a Balanced Solution", ar: "اقتراح حل متوازن" },
        pattern: "A more feasible approach would be to strike a balance between [A] and [B].",
        example:
          "A more feasible approach would be to strike a balance between tourism growth and conservation.",
        arabic: "النهج الأكثر واقعية هو تحقيق توازن بين نمو السياحة والحفاظ على البيئة.",
      },
    ],
    communicationDomains: {
      everyday: {
        focus: {
          en: "Discussing current affairs, defending a film/book critique, and negotiating group decisions.",
          ar: "مناقشة القضايا المعاصرة والدفاع عن رأي نقدي واتخاذ قرارات جماعية.",
        },
        sample:
          "I see why people love that film, yet for me the pacing slowed down in the second half.",
      },
      academic: {
        focus: {
          en: "Writing structured opinion essays, evaluating counter-arguments, and citing evidence.",
          ar: "كتابة مقالات الرأي المنظمة ومناقشة الحجج المضادة بدقة.",
        },
        sample:
          "Despite short-term transition costs, renewable grids prove far more economically feasible over twenty years.",
      },
      professional: {
        focus: {
          en: "Presenting business proposals, pushing back diplomatically, and reaching team consensus.",
          ar: "تقديم المقترحات المهنية والاعتراض الدبلوماسي والوصول إلى توافق.",
        },
        sample:
          "Before we commit the full budget, let's weigh up the onboarding risks and reach a clear consensus.",
      },
    },
    mcqChecks: [
      {
        indicator: "understand",
        prompt: "If a project manager says a plan is 'economically feasible', what does it mean?",
        options: [
          "It is realistic and achievable within the available budget",
          "It is completely free of charge",
          "It has already failed twice",
          "It requires illegal shortcuts",
        ],
        correct: 0,
        explanation: {
          en: "'Feasible' means practical, workable, and achievable with current resources.",
          ar: "تعني feasible عملي وقابل للتطبيق ضمن الإمكانات المتاحة.",
        },
      },
      {
        indicator: "context",
        prompt: "Policy makers must ___ between rapid urban growth and green-space preservation.",
        options: ["strike a balance", "hit a level", "make a weight", "drop an edge"],
        correct: 0,
        explanation: {
          en: "'Strike a balance between A and B' is the idiomatic B2 collocation.",
          ar: "التلازم الدقيق هو strike a balance between.",
        },
      },
      {
        indicator: "grammar-accuracy",
        prompt: "Choose the grammatically accurate concessive sentence:",
        options: [
          "Despite facing initial delays, the engineers delivered the bridge on budget.",
          "Despite of facing initial delays, the engineers delivered the bridge on budget.",
          "Despite they faced initial delays, the engineers delivered the bridge on budget.",
          "Although facing initial delays, the engineers delivered the bridge on budget.",
        ],
        correct: 0,
        explanation: {
          en: "'Despite' never takes 'of' and is followed by a noun or -ing clause ('Despite facing...').",
          ar: "تأخذ Despite اسمًا أو فعلًا بـ ing مباشرة دون of.",
        },
      },
    ],
    productionTasks: [
      {
        indicator: "original-sentence",
        prompt: {
          en: "Write one B2 sentence using 'despite' + a noun or -ing phrase, plus 'feasible' or 'drawback'.",
          ar: "اكتب جملة بمستوى B2 تستخدم فيها despite متبوعة باسم أو -ing مع كلمة feasible أو drawback.",
        },
        requiredTerms: ["despite", "feasible|drawback|drawbacks"],
        minWords: 12,
        modelResponse:
          "Despite its high upfront cost, a solar micro-grid remains financially feasible over ten years.",
        rubricHint: {
          en: "Remember: NO 'of' after 'despite', and pair with a noun phrase or -ing form.",
          ar: "تذكّر: لا تضع of بعد despite.",
        },
      },
      {
        indicator: "paragraph",
        prompt: {
          en: "Write a focused analytical paragraph (45+ words) weighing one benefit and one drawback of remote education.",
          ar: "اكتب فقرة تحليلية (٤٥ كلمة فأكثر) توازن فيها بين ميزة وعيب للتعليم عن بُعد.",
        },
        requiredTerms: ["while|although|despite|however", "drawback|benefit|balance|consensus"],
        minWords: 45,
        modelResponse:
          "While online degrees widen access for working adults in remote towns, one notable drawback is reduced spontaneous classroom interaction. However, universities can strike a balance by pairing flexible recorded lectures with live weekly seminars. Taking everything into account, a blended format proves both practical and engaging.",
        rubricHint: {
          en: "Use a clear topic sentence, a contrast linker, and a concluding judgement (45+ words).",
          ar: "ابدأ بجملة موضوع واضحة ثم أداة استدراك وخاتمة تحليلية (٤٥ كلمة على الأقل).",
        },
      },
      {
        indicator: "opinion-justify",
        prompt: {
          en: "Do the benefits of AI tools in the workplace outweigh the drawbacks? Justify your stance clearly.",
          ar: "هل تفوق مزايا أدوات الذكاء الاصطناعي في العمل عيوبها؟ دافع عن رأيك بحجة واضحة.",
        },
        requiredTerms: ["outweigh|balance|compelling|feasible", "because|since|provided|however"],
        minWords: 22,
        modelResponse:
          "In my view, the productivity gains of AI tools outweigh the drawbacks, provided employers invest in staff training and clear privacy guidelines.",
        rubricHint: {
          en: "Use a nuanced condition ('provided', 'as long as') or counter-point to show B2 control.",
          ar: "استخدم شرطًا أو تحفظًا منطقيًا لإظهار دقة مستوى B2.",
        },
      },
      {
        indicator: "realistic-comm",
        prompt: {
          en: "In a team meeting, a colleague proposes cutting testing time in half to launch early. Disagree diplomatically and propose a feasible alternative.",
          ar: "اقترح زميلك في اجتماع تقليص وقت الاختبار للنصف للإطلاق مبكرًا؛ اعترض بدبلوماسية واقترح بديلًا عمليًا.",
        },
        requiredTerms: ["agree|point|extent|understand", "however|yet|instead|feasible|balance"],
        minWords: 20,
        modelResponse:
          "I completely understand the urgency to launch early; however, halving testing could create costly bugs. A more feasible option would be a phased beta release.",
        rubricHint: {
          en: "Acknowledge their goal first, then introduce your objection and practical alternative politely.",
          ar: "قدّر هدف زميلك أولًا ثم اعرض تحفظك وبديلك العملي بأدب.",
        },
      },
    ],
  },

  // ========================= C1 — ADVANCED =========================
  {
    level: "C1",
    title: {
      en: "C1 · Advanced Precision & Adaptability",
      ar: "C1 · الدقة المتقدمة والتكيّف الأسلوبي",
    },
    cefrDescriptor: {
      en: "Can express complex ideas fluently and spontaneously, deploy academic hedging, nominalisation, and emphasis, and adapt register smoothly across academic and executive contexts.",
      ar: "يستطيع التعبير عن الأفكار المعقدة بطلاقة وتلقائية، وتوظيف التلطيف الأكاديمي والأساليب البلاغية وتكييف الأسلوب بسلاسة في السياقات الأكاديمية والتنفيذية.",
    },
    essentialVocab: [
      {
        word: "pragmatic",
        ipa: "/præɡˈmæt.ɪk/",
        pos: "adjective",
        definition:
          "Dealing with problems realistically and sensibly based on practical conditions rather than pure theory.",
        arabic: "عملي / واقعي (يركّز على الحلول القابلة للتنفيذ)",
        collocation: "a pragmatic compromise",
        example: "City planners adopted a pragmatic phased approach to electrifying public buses.",
      },
      {
        word: "unprecedented",
        ipa: "/ʌnˈpres.ɪ.den.tɪd/",
        pos: "adjective",
        definition: "Never having happened, been done, or been observed before.",
        arabic: "غير مسبوق",
        collocation: "at an unprecedented pace",
        example:
          "Generative software has evolved at an unprecedented pace over the past three years.",
      },
      {
        word: "corroborate",
        ipa: "/kəˈrɒb.ə.reɪt/",
        pos: "verb",
        definition:
          "To add independent evidence that confirms or supports an existing statement or finding.",
        arabic: "يؤيد / يُثبت بالدليل المستقل",
        collocation: "corroborate earlier findings",
        example: "Satellite measurements corroborated the field team's groundwater findings.",
      },
      {
        word: "nuanced",
        ipa: "/ˈnjuː.ɑːnst/",
        pos: "adjective",
        definition:
          "Characterised by subtle, thoughtful distinctions rather than oversimplified extremes.",
        arabic: "دقيق ومتوازن (يراعي التفاصيل والفروق الدقيقة)",
        collocation: "a nuanced assessment",
        example: "Complex public-health debates demand a nuanced assessment rather than slogans.",
      },
    ],
    commonExpressions: [
      {
        expression: "While there is merit to that view, it overlooks...",
        arabic: "رغم ما في هذا الرأي من وجاهة، إلا أنه يُغفل...",
        context: {
          en: "Academic & executive counter-argument",
          ar: "الرد الأكاديمي والتنفيذي الرصين",
        },
        example:
          "While there is merit to deregulation, it overlooks long-term consumer protection.",
      },
      {
        expression: "The evidence broadly suggests that...",
        arabic: "تشير الأدلة في مجملها إلى أن...",
        context: { en: "Calibrated academic hedging", ar: "التحوط الأكاديمي المتزن" },
        example:
          "The evidence broadly suggests that early bilingualism strengthens executive attention.",
      },
      {
        expression: "By the same token...",
        arabic: "وبالمثل / ومن المنطلق ذاته...",
        context: {
          en: "Drawing a logical parallel in formal writing or meetings",
          ar: "عقد مقارنة منطقية في الكتابة الرسمية والاجتماعات",
        },
        example:
          "Automation cuts routine costs; by the same token, it raises demand for human oversight.",
      },
    ],
    collocations: [
      {
        collocation: "yield measurable dividends",
        arabic: "يُثمر نتائج وعوائد ملموسة",
        example: "Early literacy funding yields measurable dividends across an entire generation.",
      },
      {
        collocation: "warrant careful scrutiny",
        arabic: "يستوجب تمحيصًا دقيقًا",
        example: "Algorithmic hiring tools warrant careful ethical scrutiny.",
      },
      {
        collocation: "exert undue pressure on",
        arabic: "يفرض ضغطًا مفرطًا على",
        example: "Unrealistic quarterly targets can exert undue pressure on product safety teams.",
      },
    ],
    phrasalVerbs: [
      {
        verb: "stem from",
        meaning: "To be caused by or originate from a deeper root factor.",
        arabic: "ينبع من / يعود سببه الجذري إلى",
        example:
          "Many cross-border project delays stem from unspoken differences in meeting norms.",
      },
      {
        verb: "boil down to",
        meaning: "To have one central issue as the main deciding factor (neutral/spoken).",
        arabic: "يتلخص في جوهره في",
        example:
          "Ultimately, sustainable reform boils down to consistent enforcement and public trust.",
      },
    ],
    idioms: [
      {
        idiom: "level the playing field",
        meaning: "To create fair conditions so every participant has an equal chance to succeed.",
        arabic: "يحقق تكافؤ الفرص",
        register: "professional",
        example: "Open-access digital libraries help level the playing field for rural scholars.",
      },
      {
        idiom: "strike a delicate balance",
        meaning: "To manage two competing priorities carefully without favouring one too heavily.",
        arabic: "يحقق توازنًا دقيقًا بين طرفين",
        register: "academic",
        example:
          "Regulators must strike a delicate balance between encouraging AI innovation and safeguarding privacy.",
      },
    ],
    grammaticalStructures: [
      {
        structure: "Negative Inversion for Emphasis",
        formula: "Not only + auxiliary + Subject + verb, but ... also ...",
        explanation: {
          en: "Fronting negative adverbials ('Not only', 'Rarely', 'Seldom') triggers subject-auxiliary inversion for crisp rhetorical impact.",
          ar: "تقديم أدوات النفي والتأكيد يوجب قلب الفعل المساعد قبل الفاعل لأسلوب بلاغي متقدم.",
        },
        example: "Not only did solar micro-grids cut outages, but they also lowered monthly bills.",
      },
      {
        structure: "Academic Hedging & Nominalisation",
        formula: "tends to / appears to / arguably + nominalised noun phrase",
        explanation: {
          en: "Avoid sweeping absolutes ('always proves') by calibrating certainty and condensing clauses into crisp noun phrases.",
          ar: "اضبط درجة اليقين بأفعال التحوط الأكاديمي وكثّف المعنى بالصياغة الاسمية الدقيقة.",
        },
        example: "The rapid expansion of urban rail tends to curb private-car dependency.",
      },
    ],
    sentencePatterns: [
      {
        functionLabel: { en: "Emphatic Inversion", ar: "التوكيد بالقلب النحوي" },
        pattern: "Not only does [Policy] [Effect A], but it also [Effect B].",
        example:
          "Not only does preventive screening save lives, but it also curbs long-term hospital expenditure.",
        arabic: "لا يقتصر الفحص الوقائي على إنقاذ الأرواح فحسب، بل يحد أيضًا من نفقات المستشفيات.",
      },
      {
        functionLabel: { en: "Nuanced Concession", ar: "الاستدراك التحليلي الدقيق" },
        pattern: "Pragmatic though [Approach] may appear, its viability hinges on [Condition].",
        example:
          "Pragmatic though rapid automation may appear, its viability hinges on workforce reskilling.",
        arabic: "ومهما بدت الأتمتة السريعة عملية، فإن نجاحها يتوقف على إعادة تأهيل القوى العاملة.",
      },
    ],
    communicationDomains: {
      everyday: {
        focus: {
          en: "Sustaining nuanced cultural debates with natural idioms and effortless register shifts.",
          ar: "إدارة حوارات ثقافية دقيقة بتلقائية وتنويع أسلوبي مرن.",
        },
        sample:
          "Honestly, it boils down to trust—once residents feel heard, neighbourhood initiatives really take off.",
      },
      academic: {
        focus: {
          en: "Synthesising conflicting studies with calibrated hedging, nominalisation, and inversion.",
          ar: "توليف الدراسات المتباينة باستخدام التحوط الأكاديمي والقلب التوكيدي.",
        },
        sample:
          "Not only do longitudinal studies corroborate this trend, but they also highlight the nuanced role of socioeconomic context.",
      },
      professional: {
        focus: {
          en: "Leading strategic reviews, questioning assumptions tactfully, and framing pragmatic compromises.",
          ar: "قيادة المراجعات الاستراتيجية ومناقشة الافتراضات بلباقة وصياغة حلول واقعية.",
        },
        sample:
          "While there is merit to accelerating our Q3 rollout, the operational risks warrant careful scrutiny before we sign off.",
      },
    },
    mcqChecks: [
      {
        indicator: "understand",
        prompt: "What does it mean when a second study 'corroborates' earlier findings?",
        options: [
          "It provides independent evidence confirming the earlier results",
          "It completely disproves the earlier results",
          "It copies the wording without testing anything",
          "It delays publication indefinitely",
        ],
        correct: 0,
        explanation: {
          en: "'Corroborate' means to confirm or strengthen an existing claim with independent evidence.",
          ar: "يعني الفعل corroborate تأييد وتأكيد نتائج سابقة بأدلة مستقلة.",
        },
      },
      {
        indicator: "context",
        prompt:
          "Long-standing delivery bottlenecks often ___ unclear handovers between departments.",
        options: ["stem from", "phase up", "bring across", "drop in"],
        correct: 0,
        explanation: {
          en: "'Stem from' accurately expresses root causation in formal and professional English.",
          ar: "يُستخدم الفعل المركب stem from لبيان السبب الجذري بدقة.",
        },
      },
      {
        indicator: "grammar-accuracy",
        prompt: "Select the grammatically accurate C1 negative-inversion sentence:",
        options: [
          "Not only did the reform lower costs, but it also improved service quality.",
          "Not only the reform lowered costs, but it also improved service quality.",
          "Not only did the reform lowered costs, but it also improved service quality.",
          "Not only was the reform lower costs, but it also improved service quality.",
        ],
        correct: 0,
        explanation: {
          en: "Fronted 'Not only' requires auxiliary inversion: 'did + subject + bare verb (lower)'.",
          ar: "بعد Not only نُقدّم did ثم الفاعل ثم الفعل المجرد lower.",
        },
      },
    ],
    productionTasks: [
      {
        indicator: "original-sentence",
        prompt: {
          en: "Write one C1 sentence using negative inversion ('Not only did/does...') with a strong academic collocation.",
          ar: "اكتب جملة بمستوى C1 باستخدام أسلوب القلب التوكيدي Not only did/does.",
        },
        requiredTerms: ["not only", "but"],
        minWords: 13,
        modelResponse:
          "Not only did the new transit line curb peak-hour congestion, but it also revitalised local shops.",
        rubricHint: {
          en: "Check inversion carefully: 'Not only + do/does/did + subject + base verb, but ... also ...'.",
          ar: "تحقق من تقديم الفعل المساعد قبل الفاعل وعودة الفعل للمصدر.",
        },
      },
      {
        indicator: "paragraph",
        prompt: {
          en: "Write a sophisticated paragraph (55+ words) analysing why open-access research helps level the playing field while warranting careful quality scrutiny.",
          ar: "اكتب فقرة أكاديمية متقدمة (٥٥ كلمة فأكثر) تحلّل فيها أثر الأبحاث مفتوحة الوصول مع الحاجة للتمحيص العلمي.",
        },
        requiredTerms: [
          "scrutiny|nuanced|pragmatic|corroborate|playing field",
          "however|while|not only|whereas",
        ],
        minWords: 55,
        modelResponse:
          "Open-access academic journals help level the playing field by granting researchers in emerging economies immediate access to empirical studies. While this model accelerates cross-border collaboration, rapid publication cycles still warrant careful peer scrutiny to maintain rigour. A pragmatic framework therefore pairs universal readership with transparent editorial standards so that independent studies can reliably corroborate new breakthroughs.",
        rubricHint: {
          en: "Combine academic hedging, clean nominalisation, and explicit cohesion (55+ words).",
          ar: "اجمع بين التحوط الأكاديمي والترابط المنطقي واللغة الرصينة (٥٥ كلمة على الأقل).",
        },
      },
      {
        indicator: "opinion-justify",
        prompt: {
          en: "Evaluate whether strict regulation stifles or safeguards technological innovation using calibrated academic hedging.",
          ar: "قيّم ما إذا كانت التشريعات الصارمة تعيق الابتكار التقني أم تحميه مستخدمًا التحوط الأكاديمي المتزن.",
        },
        requiredTerms: [
          "tends to|appears to|suggests|arguably|pragmatic|nuanced",
          "whereas|while|provided|stem",
        ],
        minWords: 25,
        modelResponse:
          "A nuanced assessment suggests that pragmatic regulation rarely stifles innovation; rather, clear safety standards tend to foster the public trust upon which long-term adoption depends.",
        rubricHint: {
          en: "Avoid absolutes ('always/never'); hedge claims thoughtfully and explain the causal mechanism.",
          ar: "تجنب التعميم المطلق واستخدم التحوط الأكاديمي مع توضيح السبب.",
        },
      },
      {
        indicator: "realistic-comm",
        prompt: {
          en: "As a senior advisor, respond to a board member who wants to cut all R&D spending for one year. Push back tactfully and frame a pragmatic alternative.",
          ar: "بصفتك مستشارًا أول، رد بلباقة على عضو مجلس إدارة يقترح إيقاف ميزانية البحث والتطوير لعام كامل، وقدّم بديلًا عمليًا.",
        },
        requiredTerms: ["merit|understand|appreciate", "pragmatic|scrutiny|long-term|however|yet"],
        minWords: 25,
        modelResponse:
          "While there is merit to tightening near-term cash flow, halting R&D altogether risks ceding market leadership. A more pragmatic course would be ring-fencing core prototypes while subjecting lower-priority pilots to stricter quarterly scrutiny.",
        rubricHint: {
          en: "Maintain executive composure, validate their fiscal concern, and offer a targeted compromise.",
          ar: "قدّر هاجس السيولة المالية ثم قدّم بديلًا تنفيذيًا متوازنًا.",
        },
      },
    ],
  },

  // ========================= C2 — PROFICIENT =========================
  {
    level: "C2",
    title: {
      en: "C2 · Proficient Mastery & Rhetorical Nuance",
      ar: "C2 · الإتقان التام والدقة البلاغية",
    },
    cefrDescriptor: {
      en: "Can convey finer shades of meaning effortlessly, restructure complex ideas with precision, deploy ellipsis, subtle conditionals, and diplomacy, and communicate naturally in virtually any high-stakes context.",
      ar: "يستطيع التعبير عن أدق الظلال الدلالية بسلاسة، وتوظيف الحذف والاستبدال والشرط المتقدم والدبلوماسية اللغوية في أرقى السياقات الأكاديمية والمهنية.",
    },
    essentialVocab: [
      {
        word: "equivocal",
        ipa: "/ɪˈkwɪv.ə.kəl/",
        pos: "adjective",
        definition:
          "Deliberately ambiguous or open to more than one interpretation; not giving a clear, decisive answer.",
        arabic: "مُلتبِس / غامض يحتمل أكثر من تأويل",
        collocation: "an equivocal response",
        example:
          "Investors were unsettled by the regulator's equivocal stance on licensing timelines.",
      },
      {
        word: "watershed",
        ipa: "/ˈwɔː.tə.ʃed/",
        pos: "noun (singular)",
        definition:
          "A critical turning point in history, policy, or an industry after which things change permanently.",
        arabic: "نقطة تحوّل مفصلية / علامة فارقة",
        collocation: "a watershed moment",
        example: "The 2024 energy accord marked a watershed moment for regional grid integration.",
      },
      {
        word: "commensurate",
        ipa: "/kəˈmen.ʃər.ət/",
        pos: "adjective",
        definition:
          "Matching something else in size, quality, degree, or importance (followed by 'with').",
        arabic: "متناسب ومتكافئ مع (من حيث الحجم أو القيمة أو المسؤولية)",
        collocation: "commensurate with responsibility",
        example:
          "Compensation packages should be commensurate with both technical expertise and leadership scope.",
      },
      {
        word: "tenuous",
        ipa: "/ˈten.ju.əs/",
        pos: "adjective",
        definition: "Very weak, uncertain, or poorly supported by evidence.",
        arabic: "واهٍ / ضعيف الترابط أو الإسناد",
        collocation: "a tenuous link",
        example:
          "Reviewers pointed out that the link between the two datasets remained tenuous at best.",
      },
    ],
    commonExpressions: [
      {
        expression: "Were we to overlook..., the ramifications would be...",
        arabic: "لو أغفلنا... لكانت التداعيات...",
        context: {
          en: "Executive / policy hypothetical framing",
          ar: "صياغة فرضية رفيعة في السياسات والإدارة",
        },
        example: "Were we to overlook grid storage, the transition would stall during peak demand.",
      },
      {
        expression: "That is not to say that..., merely that...",
        arabic: "لا يعني هذا أن...، وإنما فحسب أن...",
        context: {
          en: "Precision qualification & rhetorical balance",
          ar: "التدقيق الدلالي ومنع سوء الفهم",
        },
        example:
          "That is not to say that metrics are irrelevant, merely that they capture only part of human judgement.",
      },
      {
        expression: "What is at stake here is not merely..., but rather...",
        arabic: "ما هو على المحك هنا ليس مجرد...، بل بالأحرى...",
        context: {
          en: "Strategic reframing in keynote speeches or policy briefs",
          ar: "إعادة تأطير القضية في الخطاب التنفيذي أو الأوراق البحثية",
        },
        example:
          "What is at stake here is not merely quarterly margin, but rather enduring institutional trust.",
      },
    ],
    collocations: [
      {
        collocation: "bear little resemblance to",
        arabic: "لا يكاد يُشبه",
        example:
          "Modern logistics hubs bear little resemblance to the paper-led warehouses of the 1990s.",
      },
      {
        collocation: "temper optimism with realism",
        arabic: "يُوازن التفاؤل بالواقعية",
        example:
          "Seasoned analysts temper optimism with fiscal realism when forecasting emerging markets.",
      },
      {
        collocation: "render obsolete",
        arabic: "يجعل شيئًا متقادمًا لا طائل منه",
        example: "Solid-state sensors may eventually render mechanical gauges obsolete.",
      },
    ],
    phrasalVerbs: [
      {
        verb: "hinge on",
        meaning: "To depend completely on one decisive condition or factor.",
        arabic: "يتوقف كليًا على / يرتكز على",
        example: "The credibility of any reform hinges on transparent independent auditing.",
      },
      {
        verb: "gloss over",
        meaning: "To treat a serious difficulty superficially in order to avoid confronting it.",
        arabic: "يتجاوز مشكلة بسطحية دون معالجتها",
        example:
          "The brochure glossed over maintenance liabilities that later doubled operating costs.",
      },
    ],
    idioms: [
      {
        idiom: "a false economy",
        meaning:
          "A measure that appears to save money initially but actually costs far more in the long run.",
        arabic: "توفير زائف (يبدو موفرًا الآن لكنه يكلف أكثر على المدى البعيد)",
        register: "professional",
        example: "Cutting preventive infrastructure maintenance is almost always a false economy.",
      },
      {
        idiom: "a watershed moment",
        meaning: "A decisive turning point after which circumstances change permanently.",
        arabic: "لحظة فارقة / نقطة تحوّل حاسمة",
        register: "academic",
        example:
          "The ratification of global data standards proved a watershed moment for cross-border trade.",
      },
    ],
    grammaticalStructures: [
      {
        structure: "Inverted & Subtle Conditionals (Were / Had / Should)",
        formula: "Were + S + to V | Had + S + V3 | Should + S + V",
        explanation: {
          en: "Omit 'if' and invert 'Were/Had/Should' for concise, authoritative diplomatic and academic prose.",
          ar: "حذف if وتقديم Were/Had/Should لصياغة شرطية موجزة ورفيعة المستوى.",
        },
        example:
          "Should supply disruptions persist, contingency reserves will stabilise retail prices.",
      },
      {
        structure: "Ellipsis, Substitution & Parallel Cadence",
        formula: "those of / that of / do so / mirrored grammatical symmetry",
        explanation: {
          en: "Eliminate clumsy noun repetition using 'that of / those of / do so' and balanced parallel triads.",
          ar: "تجنب تكرار الأسماء باستخدام that of وthose of مع التوازي النحوي المتقن.",
        },
        example:
          "Grid yields in 2026 eclipsed those of 2018—not by chance, but by sustained engineering.",
      },
    ],
    sentencePatterns: [
      {
        functionLabel: { en: "Precision Qualification", ar: "التقييد الدلالي الدقيق" },
        pattern: "That is not to dismiss [X], merely to recognise that [Y] hinges on [Z].",
        example:
          "That is not to dismiss short-term incentives, merely to recognise that durable change hinges on institutional trust.",
        arabic:
          "لا يعني هذا التقليل من الحوافز القصيرة، بل إدراك أن التغيير المستدام يرتكز على الثقة المؤسسية.",
      },
      {
        functionLabel: { en: "Executive Diplomacy", ar: "الدبلوماسية التنفيذية الرفيعة" },
        pattern:
          "Were we to [Action], we might inadvertently [Consequence]—a false economy in the long run.",
        example:
          "Were we to defer staff upskilling, we might inadvertently erode service quality—a false economy in the long run.",
        arabic:
          "لو أرجأنا تطوير مهارات الفريق، فقد نُضعف جودة الخدمة دون قصد—وهو توفير زائف على المدى البعيد.",
      },
    ],
    communicationDomains: {
      everyday: {
        focus: {
          en: "Expressing subtle irony, precision humour, and effortless nuance across varied social registers.",
          ar: "التعبير عن أدق الفروق الدلالية والتنقل السلس بين الأساليب الاجتماعية.",
        },
        sample: "Calling that two-hour detour a scenic shortcut was generous, to put it mildly.",
      },
      academic: {
        focus: {
          en: "Critiquing methodology, avoiding overstatement, and deploying ellipsis and parallel cadence cleanly.",
          ar: "نقد المنهجيات العلمية وتوظيف الاستبدال والتوازي البلاغي بسلاسة.",
        },
        sample:
          "Although the correlation appears striking, the causal claim remains tenuous; later trials must temper optimism with methodological rigour.",
      },
      professional: {
        focus: {
          en: "Navigating high-stakes board negotiations, diplomatic refusals, and strategic crisis briefs.",
          ar: "إدارة مفاوضات مجالس الإدارة والرفض الدبلوماسي وإيجازات الأزمات الاستراتيجية.",
        },
        sample:
          "We must not gloss over compliance exposure—cutting legal review now would be a classic false economy.",
      },
    },
    mcqChecks: [
      {
        indicator: "understand",
        prompt: "What does 'a false economy' mean in business and public policy?",
        options: [
          "An action that saves money initially but leads to greater expense later",
          "A booming national stock market",
          "A fraudulent currency exchange booth",
          "An overly generous employee bonus scheme",
        ],
        correct: 0,
        explanation: {
          en: "'A false economy' describes short-sighted cost-cutting that ends up costing far more over time.",
          ar: "يعني a false economy توفيرًا قصير النظر ينتج عنه تكلفة أكبر لاحقًا.",
        },
      },
      {
        indicator: "context",
        prompt: "Long-term investment returns should be ___ the level of operational risk assumed.",
        options: ["commensurate with", "equivocal to", "tenuous on", "glossed over"],
        correct: 0,
        explanation: {
          en: "'Commensurate with' means proportionate to or matching in scale/degree.",
          ar: "تتلازم commensurate مع حرف الجر with بمعنى متناسب مع.",
        },
      },
      {
        indicator: "grammar-accuracy",
        prompt:
          "Select the C2 sentence demonstrating accurate substitution and inverted conditional syntax:",
        options: [
          "Were output figures to surpass those of last quarter, expansion plans would proceed immediately.",
          "Were output figures surpass that of last quarter, expansion plans would proceed immediately.",
          "If were output figures to surpass those of last quarter, expansion plans proceeded immediately.",
          "Were output figures to surpass it of last quarter, expansion plans will proceed immediately.",
        ],
        correct: 0,
        explanation: {
          en: "'Were + subject + to + verb' pairs cleanly with plural substitution 'those of' (for 'figures') and 'would + base verb'.",
          ar: "الصيغة الدقيقة: Were + الفاعل + to + المصدر مع الاستبدال الجمع those of للـ figures.",
        },
      },
    ],
    productionTasks: [
      {
        indicator: "original-sentence",
        prompt: {
          en: "Write one C2 sentence using 'commensurate with', 'hinges on', or an inverted conditional ('Were we to... / Should...').",
          ar: "اكتب جملة بمستوى C2 باستخدام commensurate with أو hinges on أو الشرط المقلوب.",
        },
        requiredTerms: ["commensurate with|hinges on|hinge on|were we to|should"],
        minWords: 14,
        modelResponse:
          "Were public agencies to defer grid upgrades now, the long-term repair bill would prove a classic false economy.",
        rubricHint: {
          en: "Check register consistency and precise prepositions ('commensurate WITH', 'hinges ON').",
          ar: "تأكد من دقة حروف الجر واتساق الأسلوب الرفيع.",
        },
      },
      {
        indicator: "paragraph",
        prompt: {
          en: "Compose a concise executive paragraph (60+ words) critiquing a short-sighted cost-cutting proposal without glossing over fiscal constraints.",
          ar: "اكتب فقرة تنفيذية محكمة (٦٠ كلمة فأكثر) تنقد فيها خفضًا قصير النظر للنفقات دون تجاهل القيود المالية.",
        },
        requiredTerms: [
          "false economy|gloss over|hinges on|commensurate|tenuous|watershed",
          "that is not to|however|were|whereas|merely",
        ],
        minWords: 60,
        modelResponse:
          "That is not to dismiss the board's fiscal discipline, merely to recognise that slashing preventive maintenance is a textbook false economy. While deferring repairs may flatter quarterly margins, the link between deferred upkeep and sustainable savings remains tenuous at best. Were reliability to falter, reputational losses would far exceed those of a modest modernisation budget; durable value hinges on funding commensurate with long-term operational risk.",
        rubricHint: {
          en: "Weave substitution ('those of'), precision qualification, and diplomatic cadence seamlessly (60+ words).",
          ar: "وظّف الاستبدال الدقيق والتقييد الدلالي والأسلوب الدبلوماسي (٦٠ كلمة على الأقل).",
        },
      },
      {
        indicator: "opinion-justify",
        prompt: {
          en: "Explain why equivocal leadership communication undermines stakeholder trust during a watershed transition.",
          ar: "اشرح لماذا يُضعف التواصل القيادي الغامض ثقة أصحاب المصلحة أثناء التحولات المفصلية.",
        },
        requiredTerms: ["equivocal|watershed|hinges on|gloss over|temper"],
        minWords: 28,
        modelResponse:
          "During a watershed restructuring, equivocal messaging breeds speculation rather than calm; stakeholder trust hinges on leaders who temper optimism with candour rather than glossing over transitional friction.",
        rubricHint: {
          en: "Aim for concise rhetorical contrast and exact lexical collocation.",
          ar: "احرص على التباين البلاغي المحكم والتلازمات الدقيقة.",
        },
      },
      {
        indicator: "realistic-comm",
        prompt: {
          en: "Respond diplomatically to an international partner whose evidence for a revised pricing model appears tenuous, inviting constructive renegotiation.",
          ar: "رد بدبلوماسية على شريك دولي تبدو أدلته على تعديل الأسعار واهية، وادعه لإعادة تفاوض بنّاءة.",
        },
        requiredTerms: [
          "appreciate|value|that is not to",
          "tenuous|commensurate|clarify|revisit|hinges",
        ],
        minWords: 28,
        modelResponse:
          "We genuinely value our long-standing partnership; that is not to question your cost pressures, merely to note that the benchmark data behind the proposed surcharge appears somewhat tenuous. Could we revisit the figures together to agree on terms commensurate with shared volume growth?",
        rubricHint: {
          en: "Combine warmth, firm analytical clarity, and a constructive path forward.",
          ar: "اجمع بين الدفء الدبلوماسي والوضوح التحليلي والحل البنّاء.",
        },
      },
    ],
  },
];

export function getCefrMasteryLevel(level: CefrLevel): CefrMasteryLevelData {
  return CEFR_MASTERY_LEVELS.find((item) => item.level === level) ?? CEFR_MASTERY_LEVELS[0]!;
}
