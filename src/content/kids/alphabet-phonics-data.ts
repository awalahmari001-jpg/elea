import type { Bilingual } from "@/content/lesson-types";

export type KidsAgeGroupId = "early-4-6" | "young-7-9" | "preteen-10-12";

export interface KidsAgeGroupMeta {
  id: KidsAgeGroupId;
  ageRange: string;
  cefrHint: string;
  emoji: string;
  title: Bilingual;
  subtitle: Bilingual;
  focusAreas: Bilingual[];
}

export const KIDS_AGE_GROUPS: KidsAgeGroupMeta[] = [
  {
    id: "early-4-6",
    ageRange: "4–6",
    cefrHint: "Pre-A1",
    emoji: "🐣",
    title: { en: "Early Learners (Ages 4–6)", ar: "المتعلّمون الصغار (٤–٦ سنوات)" },
    subtitle: {
      en: "Short, visual, playful adventures with letters, sounds, colours, numbers, and friendly animals.",
      ar: "مغامرات قصيرة ومرئية وممتعة مع الحروف والأصوات والألوان والأرقام والحيوانات اللطيفة.",
    },
    focusAreas: [
      { en: "26 Letters & IPA Letter Sounds", ar: "٢٦ حرفًا وأصوات الحروف وفق IPA" },
      { en: "Colours, Numbers, Shapes & Toys", ar: "الألوان والأرقام والأشكال والألعاب" },
      { en: "Listen, Tap & Trace Letters", ar: "استمع واضغط وتتبّع الحروف" },
    ],
  },
  {
    id: "young-7-9",
    ageRange: "7–9",
    cefrHint: "Pre-A1 – A1",
    emoji: "🦊",
    title: { en: "Young Learners (Ages 7–9)", ar: "المتعلّمون الناشئون (٧–٩ سنوات)" },
    subtitle: {
      en: "Short & long vowels, blends, digraphs, 3- and 4-letter word reading, everyday routines, and short stories.",
      ar: "الحروف المتحركة القصيرة والطويلة والدمج وقراءة الكلمات والروتين اليومي والقصص القصيرة.",
    },
    focusAreas: [
      { en: "Short & Long Vowels + Digraphs", ar: "الحروف المتحركة القصيرة والطويلة" },
      { en: "CVC & 4-Letter Decoding + Spelling", ar: "قراءة وتهجئة كلمات من ٣ و٤ حروف" },
      { en: "Simple Sentences & Short Stories", ar: "الجمل البسيطة والقصص القصيرة" },
    ],
  },
  {
    id: "preteen-10-12",
    ageRange: "10–12",
    cefrHint: "A1 – A2+",
    emoji: "🚀",
    title: { en: "Pre-Teens (Ages 10–12)", ar: "اليافعون (١٠–١٢ سنة)" },
    subtitle: {
      en: "Reading comprehension, paragraph writing, grammar in context, storytelling, and confident speaking.",
      ar: "الفهم القرائي وكتابة الفقرات والقواعد في السياق وسرد القصص والمحادثة بثقة.",
    },
    focusAreas: [
      { en: "Reading Comprehension & Storytelling", ar: "الفهم القرائي وسرد القصص" },
      { en: "Grammar in Context & Paragraph Writing", ar: "القواعد في السياق وكتابة الفقرات" },
      { en: "Guided Speaking & Pronunciation", ar: "المحادثة الموجّهة وتطوير النطق" },
    ],
  },
];

export interface AlphabetExample {
  word: string;
  /** Standard IPA transcription of the sample word (e.g., "/ˈæp.əl/"). */
  ipa: string;
  /** Zero-based index of the target letter in `word` (e.g., 2 for 'x' in "box"). */
  targetIndex: number;
  emoji: string;
  sentence: string;
  arabicWord: string;
}

export interface AlphabetSecondarySound {
  ipa: string;
  sampleWord: string;
  sampleWordIpa: string;
  label: Bilingual;
}

export interface AlphabetEntry {
  letter: string;
  lower: string;
  kind: "vowel" | "consonant";
  letterNameIpa: string;
  mainSoundIpa: string;
  /** Bundled real-human IPA reference MP3 clip path under `/audio/ipa/`. */
  ipaSampleUrl: string;
  /** Official IPA articulatory classification in clear bilingual phrasing. */
  ipaClassification: Bilingual;
  /** Short phonetic spoken cue retained for fallback speech/trace diagnostics. */
  soundDemoSpeech: string;
  voiced: boolean;
  soundTip: Bilingual;
  tracingHint: Bilingual;
  /** Optional secondary IPA value (e.g., long vowels, soft C /s/, soft G /dʒ/, vowel Y /i/). */
  secondarySound?: AlphabetSecondarySound;
  examples: [AlphabetExample, AlphabetExample, AlphabetExample];
}

export const ALPHABET_ENTRIES: AlphabetEntry[] = [
  {
    letter: "A",
    lower: "a",
    kind: "vowel",
    letterNameIpa: "/eɪ/",
    mainSoundIpa: "/æ/",
    ipaSampleUrl: "/audio/ipa/ae.mp3",
    ipaClassification: {
      en: "Near-open front unrounded vowel",
      ar: "صوت متحرك أمامي شبه مفتوح (غير مستدير)",
    },
    soundDemoSpeech: "/æ/ — apple, ant, alligator",
    voiced: true,
    soundTip: {
      en: "Letter name is /eɪ/, while its pure short IPA sound is /æ/ — open wide with tongue flat forward as in apple /ˈæp.əl/!",
      ar: "اسم الحرف /eɪ/، أما صوته القصير الصافي وفق IPA فهو /æ/ — افتح فمك مع بسط اللسان للأمام كما في apple /ˈæp.əl/!",
    },
    tracingHint: {
      en: "Two slanted lines like a tent, then a bridge across!",
      ar: "خطان مائلان مثل الخيمة ثم خط أفقي في الوسط!",
    },
    secondarySound: {
      ipa: "/eɪ/",
      sampleWord: "cake",
      sampleWordIpa: "/keɪk/",
      label: { en: "Long A", ar: "صوت A الطويل" },
    },
    examples: [
      {
        word: "apple",
        ipa: "/ˈæp.əl/",
        targetIndex: 0,
        emoji: "🍎",
        sentence: "I like red apples.",
        arabicWord: "تفاحة",
      },
      {
        word: "ant",
        ipa: "/ænt/",
        targetIndex: 0,
        emoji: "🐜",
        sentence: "A tiny ant walks fast.",
        arabicWord: "نملة",
      },
      {
        word: "alligator",
        ipa: "/ˈæl.ɪ.ɡeɪ.tər/",
        targetIndex: 0,
        emoji: "🐊",
        sentence: "The green alligator swims.",
        arabicWord: "تمساح",
      },
    ],
  },
  {
    letter: "B",
    lower: "b",
    kind: "consonant",
    letterNameIpa: "/biː/",
    mainSoundIpa: "/b/",
    ipaSampleUrl: "/audio/ipa/b.mp3",
    ipaClassification: {
      en: "Voiced bilabial plosive",
      ar: "صوت ساكن شفوي انفجاري مجهور",
    },
    soundDemoSpeech: "/b/ — ball, bag, banana",
    voiced: true,
    soundTip: {
      en: "Letter name is /biː/, while its pure IPA sound is a crisp voiced bilabial plosive /b/ as in ball /bɔːl/!",
      ar: "اسم الحرف /biː/، أما صوته الصافي وفق IPA فهو انفجار شفوي مهتز /b/ كما في ball /bɔːl/!",
    },
    tracingHint: {
      en: "One straight line down, then two round bumps!",
      ar: "خط مستقيم للأسفل ثم قوسان مستديران!",
    },
    examples: [
      {
        word: "ball",
        ipa: "/bɔːl/",
        targetIndex: 0,
        emoji: "⚽",
        sentence: "I kick the big ball.",
        arabicWord: "كرة",
      },
      {
        word: "bag",
        ipa: "/bæɡ/",
        targetIndex: 0,
        emoji: "🎒",
        sentence: "My school bag is blue.",
        arabicWord: "حقيبة",
      },
      {
        word: "banana",
        ipa: "/bəˈnɑː.nə/",
        targetIndex: 0,
        emoji: "🍌",
        sentence: "This banana is sweet.",
        arabicWord: "موزة",
      },
    ],
  },
  {
    letter: "C",
    lower: "c",
    kind: "consonant",
    letterNameIpa: "/siː/",
    mainSoundIpa: "/k/",
    ipaSampleUrl: "/audio/ipa/k.mp3",
    ipaClassification: {
      en: "Voiceless velar plosive",
      ar: "صوت ساكن طبقي انفجاري مهموس",
    },
    soundDemoSpeech: "/k/ — cat, cup, car",
    voiced: false,
    soundTip: {
      en: "Letter name is /siː/, while its primary IPA sound is a crisp voiceless velar plosive /k/ as in cat /kæt/!",
      ar: "اسم الحرف /siː/، أما صوته الأساسي الصافي وفق IPA فهو /k/ مهموس من مؤخرة اللسان كما في cat /kæt/!",
    },
    tracingHint: { en: "Curve around like a half moon!", ar: "ارسم قوسًا مستديرًا مثل الهلال!" },
    secondarySound: {
      ipa: "/s/",
      sampleWord: "city",
      sampleWordIpa: "/ˈsɪt.i/",
      label: { en: "Soft C (before e, i, y)", ar: "صوت C الناعم (قبل e, i, y)" },
    },
    examples: [
      {
        word: "cat",
        ipa: "/kæt/",
        targetIndex: 0,
        emoji: "🐱",
        sentence: "The cute cat naps.",
        arabicWord: "قطة",
      },
      {
        word: "cup",
        ipa: "/kʌp/",
        targetIndex: 0,
        emoji: "☕",
        sentence: "A warm cup of milk.",
        arabicWord: "كوب",
      },
      {
        word: "car",
        ipa: "/kɑːr/",
        targetIndex: 0,
        emoji: "🚗",
        sentence: "The red car goes beep!",
        arabicWord: "سيارة",
      },
    ],
  },
  {
    letter: "D",
    lower: "d",
    kind: "consonant",
    letterNameIpa: "/diː/",
    mainSoundIpa: "/d/",
    ipaSampleUrl: "/audio/ipa/d.mp3",
    ipaClassification: {
      en: "Voiced alveolar plosive",
      ar: "صوت ساكن لثوي انفجاري مجهور",
    },
    soundDemoSpeech: "/d/ — dog, duck, drum",
    voiced: true,
    soundTip: {
      en: "Letter name is /diː/, while its pure IPA sound is a voiced alveolar tap /d/ behind top teeth: dog /dɒɡ/!",
      ar: "اسم الحرف /diː/، أما صوته الصافي وفق IPA فهو /d/ لثوي مهتز خلف الأسنان العلوية كما في dog /dɒɡ/!",
    },
    tracingHint: {
      en: "One tall line down, then one big round belly!",
      ar: "خط طويل للأسفل ثم قوس كبير!",
    },
    examples: [
      {
        word: "dog",
        ipa: "/dɒɡ/",
        targetIndex: 0,
        emoji: "🐶",
        sentence: "My dog wags its tail.",
        arabicWord: "كلب",
      },
      {
        word: "duck",
        ipa: "/dʌk/",
        targetIndex: 0,
        emoji: "🦆",
        sentence: "The yellow duck can swim.",
        arabicWord: "بطة",
      },
      {
        word: "drum",
        ipa: "/drʌm/",
        targetIndex: 0,
        emoji: "🥁",
        sentence: "I play the loud drum.",
        arabicWord: "طبل",
      },
    ],
  },
  {
    letter: "E",
    lower: "e",
    kind: "vowel",
    letterNameIpa: "/iː/",
    mainSoundIpa: "/e/",
    ipaSampleUrl: "/audio/ipa/e.mp3",
    ipaClassification: {
      en: "Open-mid front unrounded vowel (/e/ · /ɛ/)",
      ar: "صوت متحرك أمامي متوسط مفتوح (/e/ · /ɛ/)",
    },
    soundDemoSpeech: "/e/ — egg, elephant, envelope",
    voiced: true,
    soundTip: {
      en: "Letter name is /iː/, while its pure short IPA sound is /e/ (or /ɛ/) with a relaxed slight smile: egg /eɡ/!",
      ar: "اسم الحرف /iː/، أما صوته القصير الصافي وفق IPA فهو /e/ (أو /ɛ/) بابتسامة خفيفة كما في egg /eɡ/!",
    },
    tracingHint: {
      en: "One line down, then three neat shelves across!",
      ar: "خط للأسفل ثم ثلاثة خطوط أفقية مرتّبة!",
    },
    secondarySound: {
      ipa: "/iː/",
      sampleWord: "tree",
      sampleWordIpa: "/triː/",
      label: { en: "Long E", ar: "صوت E الطويل" },
    },
    examples: [
      {
        word: "egg",
        ipa: "/eɡ/",
        targetIndex: 0,
        emoji: "🥚",
        sentence: "I eat an egg for breakfast.",
        arabicWord: "بيضة",
      },
      {
        word: "elephant",
        ipa: "/ˈel.ɪ.fənt/",
        targetIndex: 0,
        emoji: "🐘",
        sentence: "The elephant is huge.",
        arabicWord: "فيل",
      },
      {
        word: "envelope",
        ipa: "/ˈen.və.ləʊp/",
        targetIndex: 0,
        emoji: "✉️",
        sentence: "I put a letter in the envelope.",
        arabicWord: "ظرف رسالة",
      },
    ],
  },
  {
    letter: "F",
    lower: "f",
    kind: "consonant",
    letterNameIpa: "/ef/",
    mainSoundIpa: "/f/",
    ipaSampleUrl: "/audio/ipa/f.mp3",
    ipaClassification: {
      en: "Voiceless labiodental fricative",
      ar: "صوت ساكن شفوي أسناني احتكاكي مهموس",
    },
    soundDemoSpeech: "/f/ — fish, frog, flower",
    voiced: false,
    soundTip: {
      en: "Letter name is /ef/, while its pure IPA sound is continuous voiceless air /f/ (top teeth on lower lip): fish /fɪʃ/!",
      ar: "اسم الحرف /ef/، أما صوته الصافي وفق IPA فهو هواء احتكاكي مستمر بلا اهتزاز /f/ كما في fish /fɪʃ/!",
    },
    tracingHint: {
      en: "One tall line down, then two lines across at the top!",
      ar: "خط طويل للأسفل ثم خطان أفقيان في الأعلى!",
    },
    examples: [
      {
        word: "fish",
        ipa: "/fɪʃ/",
        targetIndex: 0,
        emoji: "🐟",
        sentence: "The orange fish swims fast.",
        arabicWord: "سمكة",
      },
      {
        word: "frog",
        ipa: "/frɒɡ/",
        targetIndex: 0,
        emoji: "🐸",
        sentence: "The green frog can jump.",
        arabicWord: "ضفدع",
      },
      {
        word: "flower",
        ipa: "/ˈflaʊ.ər/",
        targetIndex: 0,
        emoji: "🌸",
        sentence: "This pink flower smells nice.",
        arabicWord: "زهرة",
      },
    ],
  },
  {
    letter: "G",
    lower: "g",
    kind: "consonant",
    letterNameIpa: "/dʒiː/",
    mainSoundIpa: "/ɡ/",
    ipaSampleUrl: "/audio/ipa/g.mp3",
    ipaClassification: {
      en: "Voiced velar plosive",
      ar: "صوت ساكن طبقي انفجاري مجهور",
    },
    soundDemoSpeech: "/ɡ/ — goat, grapes, gift",
    voiced: true,
    soundTip: {
      en: "Letter name is /dʒiː/, while its primary IPA sound is a voiced velar plosive /ɡ/ as in goat /ɡəʊt/!",
      ar: "اسم الحرف /dʒiː/، أما صوته الأساسي الصافي وفق IPA فهو /ɡ/ مهتز من مؤخرة اللسان كما في goat /ɡəʊt/!",
    },
    tracingHint: {
      en: "Draw a big C, then add a little shelf inside!",
      ar: "ارسم حرف C كبير ثم أضف خطًا صغيرًا للداخل!",
    },
    secondarySound: {
      ipa: "/dʒ/",
      sampleWord: "giraffe",
      sampleWordIpa: "/dʒɪˈrɑːf/",
      label: { en: "Soft G (before e, i, y)", ar: "صوت G الناعم (قبل e, i, y)" },
    },
    examples: [
      {
        word: "goat",
        ipa: "/ɡəʊt/",
        targetIndex: 0,
        emoji: "🐐",
        sentence: "The goat eats green grass.",
        arabicWord: "ماعز",
      },
      {
        word: "grapes",
        ipa: "/ɡreɪps/",
        targetIndex: 0,
        emoji: "🍇",
        sentence: "Purple grapes are yummy.",
        arabicWord: "عنب",
      },
      {
        word: "gift",
        ipa: "/ɡɪft/",
        targetIndex: 0,
        emoji: "🎁",
        sentence: "I have a birthday gift.",
        arabicWord: "هدية",
      },
    ],
  },
  {
    letter: "H",
    lower: "h",
    kind: "consonant",
    letterNameIpa: "/eɪtʃ/",
    mainSoundIpa: "/h/",
    ipaSampleUrl: "/audio/ipa/h.mp3",
    ipaClassification: {
      en: "Voiceless glottal fricative",
      ar: "صوت ساكن حنجري احتكاكي مهموس",
    },
    soundDemoSpeech: "/h/ — hat, house, horse",
    voiced: false,
    soundTip: {
      en: "Letter name is /eɪtʃ/, while its pure IPA sound is a gentle voiceless breath /h/ from the glottis: hat /hæt/!",
      ar: "اسم الحرف /eɪtʃ/، أما صوته الصافي وفق IPA فهو نَفَس دافئ مهموس /h/ بدون اهتزاز كما في hat /hæt/!",
    },
    tracingHint: {
      en: "Two tall towers with a bridge in the middle!",
      ar: "خطان عموديان متوازيان وجسر بينهما في الوسط!",
    },
    examples: [
      {
        word: "hat",
        ipa: "/hæt/",
        targetIndex: 0,
        emoji: "👒",
        sentence: "I wear a sun hat.",
        arabicWord: "قبعة",
      },
      {
        word: "house",
        ipa: "/haʊs/",
        targetIndex: 0,
        emoji: "🏠",
        sentence: "My house has a garden.",
        arabicWord: "منزل",
      },
      {
        word: "horse",
        ipa: "/hɔːs/",
        targetIndex: 0,
        emoji: "🐴",
        sentence: "The brown horse runs fast.",
        arabicWord: "حصان",
      },
    ],
  },
  {
    letter: "I",
    lower: "i",
    kind: "vowel",
    letterNameIpa: "/aɪ/",
    mainSoundIpa: "/ɪ/",
    ipaSampleUrl: "/audio/ipa/ih.mp3",
    ipaClassification: {
      en: "Near-close near-front unrounded vowel",
      ar: "صوت متحرك أمامي شبه مغلق قصير",
    },
    soundDemoSpeech: "/ɪ/ — igloo, insect, ink",
    voiced: true,
    soundTip: {
      en: "Letter name is /aɪ/, while its pure short IPA sound is relaxed, crisp /ɪ/ as in igloo /ˈɪɡ.luː/!",
      ar: "اسم الحرف /aɪ/، أما صوته القصير الصافي وفق IPA فهو /ɪ/ خفيف وسريع كما في igloo /ˈɪɡ.luː/!",
    },
    tracingHint: {
      en: "One straight line down with a tiny hat and shoes!",
      ar: "خط عمودي مستقيم مع خط صغير فوقه وتحته!",
    },
    secondarySound: {
      ipa: "/aɪ/",
      sampleWord: "bike",
      sampleWordIpa: "/baɪk/",
      label: { en: "Long I", ar: "صوت I الطويل" },
    },
    examples: [
      {
        word: "igloo",
        ipa: "/ˈɪɡ.luː/",
        targetIndex: 0,
        emoji: "🏔️",
        sentence: "The igloo is made of ice.",
        arabicWord: "كوخ جليدي",
      },
      {
        word: "insect",
        ipa: "/ˈɪn.sekt/",
        targetIndex: 0,
        emoji: "🐞",
        sentence: "A red insect sits on a leaf.",
        arabicWord: "حشرة",
      },
      {
        word: "ink",
        ipa: "/ɪŋk/",
        targetIndex: 0,
        emoji: "🖋️",
        sentence: "Blue ink is in the pen.",
        arabicWord: "حبر",
      },
    ],
  },
  {
    letter: "J",
    lower: "j",
    kind: "consonant",
    letterNameIpa: "/dʒeɪ/",
    mainSoundIpa: "/dʒ/",
    ipaSampleUrl: "/audio/ipa/dj.mp3",
    ipaClassification: {
      en: "Voiced postalveolar affricate",
      ar: "صوت ساكن لثوي غاري مزجي مجهور",
    },
    soundDemoSpeech: "/dʒ/ — jam, juice, jellyfish",
    voiced: true,
    soundTip: {
      en: "Letter name is /dʒeɪ/, while its pure IPA sound is a bouncy voiced affricate /dʒ/ as in jam /dʒæm/!",
      ar: "اسم الحرف /dʒeɪ/، أما صوته الصافي وفق IPA فهو /dʒ/ مزجي مهتز مع ضم الشفتين قليلًا كما في jam /dʒæm/!",
    },
    tracingHint: {
      en: "Go down and hook around like an umbrella handle!",
      ar: "انزل بخط ثم ارسم خطّافًا مثل مقبض المظلة!",
    },
    examples: [
      {
        word: "jam",
        ipa: "/dʒæm/",
        targetIndex: 0,
        emoji: "🍓",
        sentence: "I like strawberry jam.",
        arabicWord: "مربى",
      },
      {
        word: "juice",
        ipa: "/dʒuːs/",
        targetIndex: 0,
        emoji: "🧃",
        sentence: "Cold orange juice is tasty.",
        arabicWord: "عصير",
      },
      {
        word: "jellyfish",
        ipa: "/ˈdʒel.i.fɪʃ/",
        targetIndex: 0,
        emoji: "🪼",
        sentence: "The jellyfish floats in the sea.",
        arabicWord: "قنديل البحر",
      },
    ],
  },
  {
    letter: "K",
    lower: "k",
    kind: "consonant",
    letterNameIpa: "/keɪ/",
    mainSoundIpa: "/k/",
    ipaSampleUrl: "/audio/ipa/k.mp3",
    ipaClassification: {
      en: "Voiceless velar plosive",
      ar: "صوت ساكن طبقي انفجاري مهموس",
    },
    soundDemoSpeech: "/k/ — kite, key, kangaroo",
    voiced: false,
    soundTip: {
      en: "Letter name is /keɪ/, while its pure IPA sound is a crisp voiceless velar plosive /k/ as in kite /kaɪt/!",
      ar: "اسم الحرف /keɪ/، أما صوته الصافي وفق IPA فهو نفثة طبقية مهموسة /k/ كما في kite /kaɪt/!",
    },
    tracingHint: {
      en: "One tall line down, then two kicking legs!",
      ar: "خط طويل للأسفل ثم خطان مائلان للخارج!",
    },
    examples: [
      {
        word: "kite",
        ipa: "/kaɪt/",
        targetIndex: 0,
        emoji: "🪁",
        sentence: "My kite flies in the sky.",
        arabicWord: "طائرة ورقية",
      },
      {
        word: "key",
        ipa: "/kiː/",
        targetIndex: 0,
        emoji: "🔑",
        sentence: "This key opens the door.",
        arabicWord: "مفتاح",
      },
      {
        word: "kangaroo",
        ipa: "/ˌkæŋ.ɡəˈruː/",
        targetIndex: 0,
        emoji: "🦘",
        sentence: "The kangaroo hops high.",
        arabicWord: "كنغر",
      },
    ],
  },
  {
    letter: "L",
    lower: "l",
    kind: "consonant",
    letterNameIpa: "/el/",
    mainSoundIpa: "/l/",
    ipaSampleUrl: "/audio/ipa/l.mp3",
    ipaClassification: {
      en: "Voiced alveolar lateral approximant",
      ar: "صوت ساكن لثوي جانبي مجهور",
    },
    soundDemoSpeech: "/l/ — lion, lemon, leaf",
    voiced: true,
    soundTip: {
      en: "Letter name is /el/, while its pure IPA sound is a smooth lateral approximant /l/ with tongue behind top teeth: lion /ˈlaɪ.ən/!",
      ar: "اسم الحرف /el/، أما صوته الصافي وفق IPA فهو /l/ جانبي ناعم برفع طرف اللسان خلف الأسنان كما في lion /ˈlaɪ.ən/!",
    },
    tracingHint: {
      en: "Go straight down, then turn right along the floor!",
      ar: "انزل بخط مستقيم ثم اتجه يمينًا في الأسفل!",
    },
    examples: [
      {
        word: "lion",
        ipa: "/ˈlaɪ.ən/",
        targetIndex: 0,
        emoji: "🦁",
        sentence: "The lion is strong and brave.",
        arabicWord: "أسد",
      },
      {
        word: "lemon",
        ipa: "/ˈlem.ən/",
        targetIndex: 0,
        emoji: "🍋",
        sentence: "A yellow lemon tastes sour.",
        arabicWord: "ليمون",
      },
      {
        word: "leaf",
        ipa: "/liːf/",
        targetIndex: 0,
        emoji: "🍃",
        sentence: "A green leaf falls gently.",
        arabicWord: "ورقة شجر",
      },
    ],
  },
  {
    letter: "M",
    lower: "m",
    kind: "consonant",
    letterNameIpa: "/em/",
    mainSoundIpa: "/m/",
    ipaSampleUrl: "/audio/ipa/m.mp3",
    ipaClassification: {
      en: "Voiced bilabial nasal",
      ar: "صوت ساكن شفوي أنفي مجهور",
    },
    soundDemoSpeech: "/m/ — moon, monkey, milk",
    voiced: true,
    soundTip: {
      en: "Letter name is /em/, while its pure IPA sound is a warm voiced bilabial nasal /m/ with closed lips: moon /muːn/!",
      ar: "اسم الحرف /em/، أما صوته الصافي وفق IPA فهو همهمة أنفية بشفتين مغلقتين /m/ كما في moon /muːn/!",
    },
    tracingHint: {
      en: "Up, down, up, down like two tall mountains!",
      ar: "اصعد وانزل واصعد وانزل مثل جبلين!",
    },
    examples: [
      {
        word: "moon",
        ipa: "/muːn/",
        targetIndex: 0,
        emoji: "🌙",
        sentence: "The bright moon shines at night.",
        arabicWord: "قمر",
      },
      {
        word: "monkey",
        ipa: "/ˈmʌŋ.ki/",
        targetIndex: 0,
        emoji: "🐒",
        sentence: "The funny monkey climbs trees.",
        arabicWord: "قرد",
      },
      {
        word: "milk",
        ipa: "/mɪlk/",
        targetIndex: 0,
        emoji: "🥛",
        sentence: "I drink fresh milk.",
        arabicWord: "حليب",
      },
    ],
  },
  {
    letter: "N",
    lower: "n",
    kind: "consonant",
    letterNameIpa: "/en/",
    mainSoundIpa: "/n/",
    ipaSampleUrl: "/audio/ipa/n.mp3",
    ipaClassification: {
      en: "Voiced alveolar nasal",
      ar: "صوت ساكن لثوي أنفي مجهور",
    },
    soundDemoSpeech: "/n/ — nest, nose, net",
    voiced: true,
    soundTip: {
      en: "Letter name is /en/, while its pure IPA sound is a steady alveolar nasal /n/ through your nose: nest /nest/!",
      ar: "اسم الحرف /en/، أما صوته الصافي وفق IPA فهو همهمة لثوية أنفية /n/ كما في nest /nest/!",
    },
    tracingHint: {
      en: "Straight up, slide down diagonally, then straight up!",
      ar: "خط للأعلى ثم انزلاق مائل ثم للأعلى!",
    },
    examples: [
      {
        word: "nest",
        ipa: "/nest/",
        targetIndex: 0,
        emoji: "🪹",
        sentence: "Three little eggs sit in the nest.",
        arabicWord: "عش",
      },
      {
        word: "nose",
        ipa: "/nəʊz/",
        targetIndex: 0,
        emoji: "👃",
        sentence: "I smell flowers with my nose.",
        arabicWord: "أنف",
      },
      {
        word: "net",
        ipa: "/net/",
        targetIndex: 0,
        emoji: "🥅",
        sentence: "The ball goes into the net.",
        arabicWord: "شبكة",
      },
    ],
  },
  {
    letter: "O",
    lower: "o",
    kind: "vowel",
    letterNameIpa: "/əʊ/",
    mainSoundIpa: "/ɒ/",
    ipaSampleUrl: "/audio/ipa/o.mp3",
    ipaClassification: {
      en: "Open back rounded vowel (/ɒ/ · US /ɑː/)",
      ar: "صوت متحرك خلفي مفتوح مستدير (/ɒ/)",
    },
    soundDemoSpeech: "/ɒ/ — octopus, orange, otter",
    voiced: true,
    soundTip: {
      en: "Letter name is /əʊ/, while its pure short IPA sound is an open rounded /ɒ/ as in octopus /ˈɒk.tə.pəs/ and otter /ˈɒt.ər/!",
      ar: "اسم الحرف /əʊ/، أما صوته القصير الصافي وفق IPA فهو /ɒ/ بشفتين مستديرتين كما في octopus /ˈɒk.tə.pəs/ وotter /ˈɒt.ər/!",
    },
    tracingHint: {
      en: "Draw one smooth, round circle all the way around!",
      ar: "ارسم دائرة كاملة ناعمة ومستديرة!",
    },
    secondarySound: {
      ipa: "/əʊ/",
      sampleWord: "home",
      sampleWordIpa: "/həʊm/",
      label: { en: "Long O", ar: "صوت O الطويل" },
    },
    examples: [
      {
        word: "octopus",
        ipa: "/ˈɒk.tə.pəs/",
        targetIndex: 0,
        emoji: "🐙",
        sentence: "The octopus has eight arms.",
        arabicWord: "أخطبوط",
      },
      {
        word: "orange",
        ipa: "/ˈɒr.ɪndʒ/",
        targetIndex: 0,
        emoji: "🍊",
        sentence: "This orange is juicy.",
        arabicWord: "برتقالة",
      },
      {
        word: "otter",
        ipa: "/ˈɒt.ər/",
        targetIndex: 0,
        emoji: "🦦",
        sentence: "The playful otter floats in the river.",
        arabicWord: "قضاعة (ثعلب الماء)",
      },
    ],
  },
  {
    letter: "P",
    lower: "p",
    kind: "consonant",
    letterNameIpa: "/piː/",
    mainSoundIpa: "/p/",
    ipaSampleUrl: "/audio/ipa/p.mp3",
    ipaClassification: {
      en: "Voiceless bilabial plosive",
      ar: "صوت ساكن شفوي انفجاري مهموس",
    },
    soundDemoSpeech: "/p/ — pen, panda, pizza",
    voiced: false,
    soundTip: {
      en: "Letter name is /piː/, while its pure IPA sound is a crisp voiceless bilabial puff /p/ (no throat buzz!): pen /pen/!",
      ar: "اسم الحرف /piː/، أما صوته الصافي وفق IPA فهو نفثة هواء شفوية مهموسة بلا اهتزاز /p/ كما في pen /pen/!",
    },
    tracingHint: {
      en: "One straight line down, then one round bubble at the top!",
      ar: "خط مستقيم للأسفل ثم دائرة في الأعلى!",
    },
    examples: [
      {
        word: "pen",
        ipa: "/pen/",
        targetIndex: 0,
        emoji: "🖊️",
        sentence: "I write with a blue pen.",
        arabicWord: "قلم حبر",
      },
      {
        word: "panda",
        ipa: "/ˈpæn.də/",
        targetIndex: 0,
        emoji: "🐼",
        sentence: "The panda eats bamboo.",
        arabicWord: "باندا",
      },
      {
        word: "pizza",
        ipa: "/ˈpiːt.sə/",
        targetIndex: 0,
        emoji: "🍕",
        sentence: "We share warm pizza.",
        arabicWord: "بيتزا",
      },
    ],
  },
  {
    letter: "Q",
    lower: "q",
    kind: "consonant",
    letterNameIpa: "/kjuː/",
    mainSoundIpa: "/kw/",
    ipaSampleUrl: "/audio/ipa/kw.mp3",
    ipaClassification: {
      en: "Labialized voiceless velar cluster (/k/ + /w/)",
      ar: "صوت مزدوج طبقي شفوي مهموس (/k/ + /w/)",
    },
    soundDemoSpeech: "/kw/ — queen, quilt, question",
    voiced: false,
    soundTip: {
      en: "Letter name is /kjuː/, while with partner U it produces the crisp IPA cluster /kw/ as in queen /kwiːn/!",
      ar: "اسم الحرف /kjuː/، ويأتي مع U ليُنتج الصوت المزدوج الصافي وفق IPA /kw/ كما في queen /kwiːn/!",
    },
    tracingHint: {
      en: "Draw a circle O, then add a cute little tail!",
      ar: "ارسم دائرة مثل O ثم أضف ذيلًا صغيرًا!",
    },
    examples: [
      {
        word: "queen",
        ipa: "/kwiːn/",
        targetIndex: 0,
        emoji: "👑",
        sentence: "The kind queen wears a crown.",
        arabicWord: "ملكة",
      },
      {
        word: "quilt",
        ipa: "/kwɪlt/",
        targetIndex: 0,
        emoji: "🛏️",
        sentence: "My colourful quilt is soft.",
        arabicWord: "لحاف",
      },
      {
        word: "question",
        ipa: "/ˈkwes.tʃən/",
        targetIndex: 0,
        emoji: "❓",
        sentence: "I ask a good question.",
        arabicWord: "سؤال",
      },
    ],
  },
  {
    letter: "R",
    lower: "r",
    kind: "consonant",
    letterNameIpa: "/ɑː/",
    mainSoundIpa: "/r/",
    ipaSampleUrl: "/audio/ipa/r.mp3",
    ipaClassification: {
      en: "Voiced alveolar approximant (/ɹ/)",
      ar: "صوت ساكن لثوي تقريبي مجهور (/ɹ/)",
    },
    soundDemoSpeech: "/r/ — rabbit, rainbow, robot",
    voiced: true,
    soundTip: {
      en: "Letter name is /ɑː/, while its pure English IPA sound /ɹ/ (written /r/) curls your tongue tip slightly back without tapping: rabbit /ˈræb.ɪt/!",
      ar: "اسم الحرف /ɑː/، أما صوته الإنجليزي الصافي وفق IPA /ɹ/ (يُكتب /r/) فيُنطق بثني طرف اللسان قليلًا للخلف دون ملامسة السقف كما في rabbit /ˈræb.ɪt/!",
    },
    tracingHint: {
      en: "Line down, top bubble like P, then one kicking leg!",
      ar: "خط للأسفل وقوس في الأعلى ثم ساق مائلة!",
    },
    examples: [
      {
        word: "rabbit",
        ipa: "/ˈræb.ɪt/",
        targetIndex: 0,
        emoji: "🐰",
        sentence: "The white rabbit hops quickly.",
        arabicWord: "أرنب",
      },
      {
        word: "rainbow",
        ipa: "/ˈreɪn.bəʊ/",
        targetIndex: 0,
        emoji: "🌈",
        sentence: "Look at the bright rainbow!",
        arabicWord: "قوس قزح",
      },
      {
        word: "robot",
        ipa: "/ˈrəʊ.bɒt/",
        targetIndex: 0,
        emoji: "🤖",
        sentence: "My toy robot can dance.",
        arabicWord: "روبوت",
      },
    ],
  },
  {
    letter: "S",
    lower: "s",
    kind: "consonant",
    letterNameIpa: "/es/",
    mainSoundIpa: "/s/",
    ipaSampleUrl: "/audio/ipa/s.mp3",
    ipaClassification: {
      en: "Voiceless alveolar sibilant fricative",
      ar: "صوت ساكن لثوي صفيري احتكاكي مهموس",
    },
    soundDemoSpeech: "/s/ — sun, star, sock",
    voiced: false,
    soundTip: {
      en: "Letter name is /es/, while its pure IPA sound is a continuous voiceless sibilant hiss /s/ as in sun /sʌn/!",
      ar: "اسم الحرف /es/، أما صوته الصافي وفق IPA فهو صفير لثوي مستمر بلا اهتزاز /s/ كما في sun /sʌn/!",
    },
    tracingHint: {
      en: "Curve left, then curve right like a wiggly snake!",
      ar: "انحنِ يسارًا ثم يمينًا مثل الأفعى اللطيفة!",
    },
    examples: [
      {
        word: "sun",
        ipa: "/sʌn/",
        targetIndex: 0,
        emoji: "☀️",
        sentence: "The warm sun shines bright.",
        arabicWord: "شمس",
      },
      {
        word: "star",
        ipa: "/stɑːr/",
        targetIndex: 0,
        emoji: "⭐",
        sentence: "You earned a gold star!",
        arabicWord: "نجمة",
      },
      {
        word: "sock",
        ipa: "/sɒk/",
        targetIndex: 0,
        emoji: "🧦",
        sentence: "My socks are striped.",
        arabicWord: "جورب",
      },
    ],
  },
  {
    letter: "T",
    lower: "t",
    kind: "consonant",
    letterNameIpa: "/tiː/",
    mainSoundIpa: "/t/",
    ipaSampleUrl: "/audio/ipa/t.mp3",
    ipaClassification: {
      en: "Voiceless alveolar plosive",
      ar: "صوت ساكن لثوي انفجاري مهموس",
    },
    soundDemoSpeech: "/t/ — tiger, tree, train",
    voiced: false,
    soundTip: {
      en: "Letter name is /tiː/, while its pure IPA sound is a crisp voiceless alveolar plosive /t/ as in tiger /ˈtaɪ.ɡər/!",
      ar: "اسم الحرف /tiː/، أما صوته الصافي وفق IPA فهو نقرة لثوية انفجارية مهموسة /t/ كما في tiger /ˈtaɪ.ɡər/!",
    },
    tracingHint: {
      en: "One straight tree trunk, then a wide roof on top!",
      ar: "خط عمودي للأسفل وسقف أفقي في الأعلى!",
    },
    examples: [
      {
        word: "tiger",
        ipa: "/ˈtaɪ.ɡər/",
        targetIndex: 0,
        emoji: "🐯",
        sentence: "The tiger has orange stripes.",
        arabicWord: "نمر",
      },
      {
        word: "tree",
        ipa: "/triː/",
        targetIndex: 0,
        emoji: "🌳",
        sentence: "Birds sing in the tall tree.",
        arabicWord: "شجرة",
      },
      {
        word: "train",
        ipa: "/treɪn/",
        targetIndex: 0,
        emoji: "🚂",
        sentence: "The train moves along the track.",
        arabicWord: "قطار",
      },
    ],
  },
  {
    letter: "U",
    lower: "u",
    kind: "vowel",
    letterNameIpa: "/juː/",
    mainSoundIpa: "/ʌ/",
    ipaSampleUrl: "/audio/ipa/u.mp3",
    ipaClassification: {
      en: "Open-mid back unrounded vowel",
      ar: "صوت متحرك خلفي متوسط مفتوح (غير مستدير)",
    },
    soundDemoSpeech: "/ʌ/ — umbrella, up, under",
    voiced: true,
    soundTip: {
      en: "Letter name is /juː/, while its pure short IPA sound is a relaxed open-mid /ʌ/ as in umbrella /ʌmˈbrel.ə/ and up /ʌp/!",
      ar: "اسم الحرف /juː/، أما صوته القصير الصافي وفق IPA فهو /ʌ/ بفم مسترخٍ كما في umbrella /ʌmˈbrel.ə/ وup /ʌp/!",
    },
    tracingHint: {
      en: "Go down, curve around like a smile, and come back up!",
      ar: "انزل ثم انحنِ كالابتسامة واصعد للأعلى!",
    },
    secondarySound: {
      ipa: "/juː/",
      sampleWord: "cute",
      sampleWordIpa: "/kjuːt/",
      label: { en: "Long U", ar: "صوت U الطويل" },
    },
    examples: [
      {
        word: "umbrella",
        ipa: "/ʌmˈbrel.ə/",
        targetIndex: 0,
        emoji: "☂️",
        sentence: "I hold my umbrella in the rain.",
        arabicWord: "مظلة",
      },
      {
        word: "up",
        ipa: "/ʌp/",
        targetIndex: 0,
        emoji: "⬆️",
        sentence: "Look up at the clouds!",
        arabicWord: "أعلى",
      },
      {
        word: "under",
        ipa: "/ˈʌn.dər/",
        targetIndex: 0,
        emoji: "👇",
        sentence: "The cat rests under the table.",
        arabicWord: "تحت",
      },
    ],
  },
  {
    letter: "V",
    lower: "v",
    kind: "consonant",
    letterNameIpa: "/viː/",
    mainSoundIpa: "/v/",
    ipaSampleUrl: "/audio/ipa/v.mp3",
    ipaClassification: {
      en: "Voiced labiodental fricative",
      ar: "صوت ساكن شفوي أسناني احتكاكي مجهور",
    },
    soundDemoSpeech: "/v/ — van, violin, vase",
    voiced: true,
    soundTip: {
      en: "Letter name is /viː/, while its pure IPA sound is a continuous voiced labiodental buzz /v/ as in van /væn/!",
      ar: "اسم الحرف /viː/، أما صوته الصافي وفق IPA فهو احتكاك شفوي أسناني مهتز /v/ كما في van /væn/!",
    },
    tracingHint: {
      en: "Slide down to a point, then zoom right back up!",
      ar: "انزل بخط مائل إلى نقطة ثم اصعد بخط مائل!",
    },
    examples: [
      {
        word: "van",
        ipa: "/væn/",
        targetIndex: 0,
        emoji: "🚐",
        sentence: "The blue van carries boxes.",
        arabicWord: "شاحنة صغيرة",
      },
      {
        word: "violin",
        ipa: "/ˌvaɪ.əˈlɪn/",
        targetIndex: 0,
        emoji: "🎻",
        sentence: "She plays the violin softly.",
        arabicWord: "كمان",
      },
      {
        word: "vase",
        ipa: "/vɑːz/",
        targetIndex: 0,
        emoji: "🏺",
        sentence: "Flowers sit in a tall vase.",
        arabicWord: "مزهرية",
      },
    ],
  },
  {
    letter: "W",
    lower: "w",
    kind: "consonant",
    letterNameIpa: "/ˈdʌb.əl.juː/",
    mainSoundIpa: "/w/",
    ipaSampleUrl: "/audio/ipa/w.mp3",
    ipaClassification: {
      en: "Voiced labial-velar approximant",
      ar: "صوت ساكن شفوي طبقي انسيابي مجهور",
    },
    soundDemoSpeech: "/w/ — water, watch, window",
    voiced: true,
    soundTip: {
      en: "Letter name is /ˈdʌb.əl.juː/, while its pure IPA sound glides smoothly from rounded lips /w/ as in water /ˈwɔː.tər/!",
      ar: "اسم الحرف /ˈdʌb.əl.juː/، أما صوته الصافي وفق IPA فهو انسياب من شفتين مستديرتين /w/ كما في water /ˈwɔː.tər/!",
    },
    tracingHint: {
      en: "Down, up, down, up like two V friends holding hands!",
      ar: "انزل واصعد وانزل واصعد مثل حرفي V معًا!",
    },
    examples: [
      {
        word: "water",
        ipa: "/ˈwɔː.tər/",
        targetIndex: 0,
        emoji: "💧",
        sentence: "I drink cool clean water.",
        arabicWord: "ماء",
      },
      {
        word: "watch",
        ipa: "/wɒtʃ/",
        targetIndex: 0,
        emoji: "⌚",
        sentence: "My watch tells the time.",
        arabicWord: "ساعة يد",
      },
      {
        word: "window",
        ipa: "/ˈwɪn.dəʊ/",
        targetIndex: 0,
        emoji: "🪟",
        sentence: "Sunlight shines through the window.",
        arabicWord: "نافذة",
      },
    ],
  },
  {
    letter: "X",
    lower: "x",
    kind: "consonant",
    letterNameIpa: "/eks/",
    mainSoundIpa: "/ks/",
    ipaSampleUrl: "/audio/ipa/ks.mp3",
    ipaClassification: {
      en: "Voiceless velar-alveolar cluster (/k/ + /s/)",
      ar: "صوت مزدوج طبقي صفيري مهموس (/k/ + /s/)",
    },
    soundDemoSpeech: "/ks/ — box, fox, six",
    voiced: false,
    soundTip: {
      en: "Letter name is /eks/, while its pure IPA sound at the end of words is the crisp two-part cluster /ks/ as in box /bɒks/ and fox /fɒks/!",
      ar: "اسم الحرف /eks/، أما صوته الصافي وفق IPA في نهاية الكلمات فهو الصوت المزدوج /ks/ كما في box /bɒks/ وfox /fɒks/!",
    },
    tracingHint: {
      en: "Two criss-cross lines that meet right in the middle!",
      ar: "خطان مائلان يتقاطعان في المنتصف تمامًا!",
    },
    examples: [
      {
        word: "box",
        ipa: "/bɒks/",
        targetIndex: 2,
        emoji: "📦",
        sentence: "My toys are inside the box.",
        arabicWord: "صندوق",
      },
      {
        word: "fox",
        ipa: "/fɒks/",
        targetIndex: 2,
        emoji: "🦊",
        sentence: "The clever orange fox runs.",
        arabicWord: "ثعلب",
      },
      {
        word: "six",
        ipa: "/sɪks/",
        targetIndex: 2,
        emoji: "6️⃣",
        sentence: "I count six bright stars.",
        arabicWord: "ستة",
      },
    ],
  },
  {
    letter: "Y",
    lower: "y",
    kind: "consonant",
    letterNameIpa: "/waɪ/",
    mainSoundIpa: "/j/",
    ipaSampleUrl: "/audio/ipa/j.mp3",
    ipaClassification: {
      en: "Voiced palatal approximant",
      ar: "صوت ساكن غاري انسيابي مجهور",
    },
    soundDemoSpeech: "/j/ — yellow, yo-yo, yak",
    voiced: true,
    soundTip: {
      en: "Letter name is /waɪ/, while its pure IPA consonant sound is a smiling palatal glide /j/ as in yellow /ˈjel.əʊ/!",
      ar: "اسم الحرف /waɪ/، أما صوته الساكن الصافي وفق IPA فهو انسياب غاري ناعم /j/ (مثل الياء الخفيفة) كما في yellow /ˈjel.əʊ/!",
    },
    tracingHint: {
      en: "Draw a small V on top, then a straight tail down!",
      ar: "ارسم حرف V صغير في الأعلى ثم خطًا مستقيمًا للأسفل!",
    },
    secondarySound: {
      ipa: "/i/",
      sampleWord: "happy",
      sampleWordIpa: "/ˈhæp.i/",
      label: { en: "Ending Y (vowel sound)", ar: "صوت Y في نهاية الكلمة" },
    },
    examples: [
      {
        word: "yellow",
        ipa: "/ˈjel.əʊ/",
        targetIndex: 0,
        emoji: "💛",
        sentence: "The lemon is bright yellow.",
        arabicWord: "أصفر",
      },
      {
        word: "yo-yo",
        ipa: "/ˈjəʊ.jəʊ/",
        targetIndex: 0,
        emoji: "🪀",
        sentence: "My yo-yo goes up and down.",
        arabicWord: "يويو",
      },
      {
        word: "yak",
        ipa: "/jæk/",
        targetIndex: 0,
        emoji: "🐃",
        sentence: "The furry yak lives in the mountains.",
        arabicWord: "ثور الياك",
      },
    ],
  },
  {
    letter: "Z",
    lower: "z",
    kind: "consonant",
    letterNameIpa: "/zed/ · /ziː/",
    mainSoundIpa: "/z/",
    ipaSampleUrl: "/audio/ipa/z.mp3",
    ipaClassification: {
      en: "Voiced alveolar sibilant fricative",
      ar: "صوت ساكن لثوي صفيري احتكاكي مجهور",
    },
    soundDemoSpeech: "/z/ — zebra, zoo, zip",
    voiced: true,
    soundTip: {
      en: "Letter name is /zed/ (UK) or /ziː/ (US), while its pure IPA sound is a continuous voiced bee buzz /z/ as in zebra /ˈzeb.rə/!",
      ar: "اسم الحرف /zed/ أو /ziː/، أما صوته الصافي وفق IPA فهو صفير لثوي مهتز مستمر /z/ كما في zebra /ˈzeb.rə/!",
    },
    tracingHint: {
      en: "Across the top, zig-zag down, then across the bottom!",
      ar: "خط أفقي بالأعلى ثم مائل للأسفل ثم أفقي بالأسفل!",
    },
    examples: [
      {
        word: "zebra",
        ipa: "/ˈzeb.rə/",
        targetIndex: 0,
        emoji: "🦓",
        sentence: "The zebra has black and white stripes.",
        arabicWord: "حمار وحشي",
      },
      {
        word: "zoo",
        ipa: "/zuː/",
        targetIndex: 0,
        emoji: "🦁",
        sentence: "We visit animals at the zoo.",
        arabicWord: "حديقة الحيوان",
      },
      {
        word: "zip",
        ipa: "/zɪp/",
        targetIndex: 0,
        emoji: "🤐",
        sentence: "I zip up my warm jacket.",
        arabicWord: "سحّاب",
      },
    ],
  },
];

export interface VowelLessonCard {
  vowel: "A" | "E" | "I" | "O" | "U";
  lower: string;
  colorClass: string;
  shortWord: string;
  shortEmoji: string;
  shortIpa: string;
  shortSentence: string;
  longWord: string;
  longEmoji: string;
  longIpa: string;
  longSentence: string;
  extraPatternNote: Bilingual;
}

export const FIVE_VOWELS_DATA: VowelLessonCard[] = [
  {
    vowel: "A",
    lower: "a",
    colorClass: "bg-amber-500/15 border-amber-400/50",
    shortWord: "cat",
    shortEmoji: "🐱",
    shortIpa: "/æ/",
    shortSentence: "The cat sits on a mat.",
    longWord: "cake",
    longEmoji: "🎂",
    longIpa: "/eɪ/",
    longSentence: "We bake a birthday cake!",
    extraPatternNote: {
      en: "A can also make other sounds as you grow, like /ɑː/ in car!",
      ar: "حرف A يمكنه أيضًا إصدار أصوات أخرى لاحقًا مثل /ɑː/ في car!",
    },
  },
  {
    vowel: "E",
    lower: "e",
    colorClass: "bg-sky-500/15 border-sky-400/50",
    shortWord: "bed",
    shortEmoji: "🛏️",
    shortIpa: "/e/",
    shortSentence: "My teddy is on the bed.",
    longWord: "these",
    longEmoji: "📚",
    longIpa: "/iː/",
    longSentence: "These books are fun to read!",
    extraPatternNote: {
      en: "E also works in pairs like 'ee' (tree) and 'ea' (leaf)!",
      ar: "يعمل حرف E أيضًا في ثنائيات مثل ee في tree وea في leaf!",
    },
  },
  {
    vowel: "I",
    lower: "i",
    colorClass: "bg-emerald-500/15 border-emerald-400/50",
    shortWord: "sit",
    shortEmoji: "🪑",
    shortIpa: "/ɪ/",
    shortSentence: "Please sit on the chair.",
    longWord: "bike",
    longEmoji: "🚲",
    longIpa: "/aɪ/",
    longSentence: "I ride my blue bike!",
    extraPatternNote: {
      en: "I can also sound like /ɜː/ in bird when followed by r!",
      ar: "قد ينطق حرف I أيضًا /ɜː/ في bird عندما يتبعه r!",
    },
  },
  {
    vowel: "O",
    lower: "o",
    colorClass: "bg-rose-500/15 border-rose-400/50",
    shortWord: "hot",
    shortEmoji: "☀️",
    shortIpa: "/ɒ/",
    shortSentence: "The summer sun is hot.",
    longWord: "home",
    longEmoji: "🏠",
    longIpa: "/əʊ/",
    longSentence: "I walk home after school.",
    extraPatternNote: {
      en: "Two O's together can say /uː/ as in moon and book!",
      ar: "حرفا O معًا يُنتجان أصواتًا جديدة مثل moon وbook!",
    },
  },
  {
    vowel: "U",
    lower: "u",
    colorClass: "bg-violet-500/15 border-violet-400/50",
    shortWord: "cup",
    shortEmoji: "☕",
    shortIpa: "/ʌ/",
    shortSentence: "Here is a cup of milk.",
    longWord: "cute",
    longEmoji: "🐶",
    longIpa: "/juː/",
    longSentence: "Look at that cute puppy!",
    extraPatternNote: {
      en: "U can also make a soft /ʊ/ sound in words like put!",
      ar: "ويمكن لحرف U أيضًا إصدار صوت /ʊ/ اللطيف في كلمات مثل put!",
    },
  },
];

export interface MissingVowelQuizItem {
  id: string;
  word: string;
  pattern: string;
  missingVowel: "a" | "e" | "i" | "o" | "u";
  emoji: string;
  hint: Bilingual;
}

export const MISSING_VOWEL_QUIZ: MissingVowelQuizItem[] = [
  {
    id: "mv-1",
    word: "cat",
    pattern: "c _ t",
    missingVowel: "a",
    emoji: "🐱",
    hint: { en: "A furry pet that says meow!", ar: "حيوان أليف لطيف يموء!" },
  },
  {
    id: "mv-2",
    word: "bed",
    pattern: "b _ d",
    missingVowel: "e",
    emoji: "🛏️",
    hint: { en: "You sleep here at night.", ar: "تنام عليه ليلًا." },
  },
  {
    id: "mv-3",
    word: "pig",
    pattern: "p _ g",
    missingVowel: "i",
    emoji: "🐷",
    hint: { en: "A pink farm animal.", ar: "حيوان مزرعة وردي." },
  },
  {
    id: "mv-4",
    word: "dog",
    pattern: "d _ g",
    missingVowel: "o",
    emoji: "🐶",
    hint: { en: "A playful pet that barks.", ar: "حيوان أليف مرح." },
  },
  {
    id: "mv-5",
    word: "sun",
    pattern: "s _ n",
    missingVowel: "u",
    emoji: "☀️",
    hint: { en: "Bright and yellow in the daytime sky!", ar: "مشرقة وصفراء في سماء النهار!" },
  },
  {
    id: "mv-6",
    word: "pen",
    pattern: "p _ n",
    missingVowel: "e",
    emoji: "🖊️",
    hint: { en: "You use it to write.", ar: "تستخدمه للكتابة." },
  },
];

export const POSITIVE_PRAISE: Bilingual[] = [
  { en: "Great job! ⭐", ar: "عمل رائع! ⭐" },
  { en: "Excellent work! 🎉", ar: "أداء ممتاز! 🎉" },
  { en: "You are getting better every day! 🌟", ar: "أنت تتحسّن كل يوم! 🌟" },
  { en: "Wonderful! Keep shining! ✨", ar: "مدهش! واصل التألق! ✨" },
];

export const ENCOURAGING_RETRY: Bilingual = {
  en: "Let's try again! You can do it! 💛",
  ar: "هيا نحاول مرة أخرى! أنت تستطيع! 💛",
};
