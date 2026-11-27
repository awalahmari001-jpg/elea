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
      { en: "26 Letters & Letter Sounds", ar: "٢٦ حرفًا وأصوات الحروف" },
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
  emoji: string;
  sentence: string;
  arabicWord: string;
}

export interface AlphabetEntry {
  letter: string;
  lower: string;
  kind: "vowel" | "consonant";
  letterNameIpa: string;
  mainSoundIpa: string;
  /** Short phonetic spoken cue that helps Web Speech demonstrate the letter sound cleanly. */
  soundDemoSpeech: string;
  voiced: boolean;
  soundTip: Bilingual;
  tracingHint: Bilingual;
  examples: [AlphabetExample, AlphabetExample, AlphabetExample];
}

export const ALPHABET_ENTRIES: AlphabetEntry[] = [
  {
    letter: "A",
    lower: "a",
    kind: "vowel",
    letterNameIpa: "/eɪ/",
    mainSoundIpa: "/æ/",
    soundDemoSpeech: "short a — apple, ant, alligator",
    voiced: true,
    soundTip: {
      en: "Letter name is /eɪ/ ('ay'), but its pure short sound is /æ/ — open wide as in apple (not 'aah')!",
      ar: "اسم الحرف /eɪ/، لكن صوته القصير الصافي هو /æ/ — افتح فمك كما في apple (وليس «آه» الطويلة)!",
    },
    tracingHint: {
      en: "Two slanted lines like a tent, then a bridge across!",
      ar: "خطان مائلان مثل الخيمة ثم خط أفقي في الوسط!",
    },
    examples: [
      { word: "apple", emoji: "🍎", sentence: "I like red apples.", arabicWord: "تفاحة" },
      { word: "ant", emoji: "🐜", sentence: "A tiny ant walks fast.", arabicWord: "نملة" },
      {
        word: "alligator",
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
    soundDemoSpeech: "buh, buh — ball, bag, banana",
    voiced: true,
    soundTip: {
      en: "Letter name is /biː/ ('bee'), while its pure sound is a quick voiced lip pop /b/ as in ball!",
      ar: "اسم الحرف /biː/، لكن صوته الصافي هو انفجار سريع مهتز من الشفتين /b/ كما في ball!",
    },
    tracingHint: {
      en: "One straight line down, then two round bumps!",
      ar: "خط مستقيم للأسفل ثم قوسان مستديران!",
    },
    examples: [
      { word: "ball", emoji: "⚽", sentence: "I kick the big ball.", arabicWord: "كرة" },
      { word: "bag", emoji: "🎒", sentence: "My school bag is blue.", arabicWord: "حقيبة" },
      { word: "banana", emoji: "🍌", sentence: "This banana is sweet.", arabicWord: "موزة" },
    ],
  },
  {
    letter: "C",
    lower: "c",
    kind: "consonant",
    letterNameIpa: "/siː/",
    mainSoundIpa: "/k/",
    soundDemoSpeech: "kuh, kuh — cat, cup, car",
    voiced: false,
    soundTip: {
      en: "Letter name is /siː/ ('see'), while its main pure sound is a crisp voiceless /k/ as in cat!",
      ar: "اسم الحرف /siː/، لكن صوته الأساسي الصافي هو /k/ خفيف بلا اهتزاز من آخر الفم كما في cat!",
    },
    tracingHint: { en: "Curve around like a half moon!", ar: "ارسم قوسًا مستديرًا مثل الهلال!" },
    examples: [
      { word: "cat", emoji: "🐱", sentence: "The cute cat naps.", arabicWord: "قطة" },
      { word: "cup", emoji: "☕", sentence: "A warm cup of milk.", arabicWord: "كوب" },
      { word: "car", emoji: "🚗", sentence: "The red car goes beep!", arabicWord: "سيارة" },
    ],
  },
  {
    letter: "D",
    lower: "d",
    kind: "consonant",
    letterNameIpa: "/diː/",
    mainSoundIpa: "/d/",
    soundDemoSpeech: "duh, duh — dog, duck, drum",
    voiced: true,
    soundTip: {
      en: "Letter name is /diː/ ('dee'), while its pure sound is a quick voiced tap /d/ behind top teeth: dog!",
      ar: "اسم الحرف /diː/، لكن صوته الصافي هو نقرة مهتزة سريعة /d/ خلف الأسنان العلوية كما في dog!",
    },
    tracingHint: {
      en: "One tall line down, then one big round belly!",
      ar: "خط طويل للأسفل ثم قوس كبير!",
    },
    examples: [
      { word: "dog", emoji: "🐶", sentence: "My dog wags its tail.", arabicWord: "كلب" },
      { word: "duck", emoji: "🦆", sentence: "The yellow duck can swim.", arabicWord: "بطة" },
      { word: "drum", emoji: "🥁", sentence: "I play the loud drum.", arabicWord: "طبل" },
    ],
  },
  {
    letter: "E",
    lower: "e",
    kind: "vowel",
    letterNameIpa: "/iː/",
    mainSoundIpa: "/e/",
    soundDemoSpeech: "eh, eh — egg, elephant, bed",
    voiced: true,
    soundTip: {
      en: "Letter name is /iː/ ('ee'), while its pure short sound is a relaxed smile /e/ as in egg and bed!",
      ar: "اسم الحرف /iː/، لكن صوته القصير الصافي هو /e/ بابتسامة خفيفة كما في egg وbed!",
    },
    tracingHint: {
      en: "One line down, then three neat shelves across!",
      ar: "خط للأسفل ثم ثلاثة خطوط أفقية مرتّبة!",
    },
    examples: [
      { word: "egg", emoji: "🥚", sentence: "I eat an egg for breakfast.", arabicWord: "بيضة" },
      { word: "elephant", emoji: "🐘", sentence: "The elephant is huge.", arabicWord: "فيل" },
      { word: "bed", emoji: "🛏️", sentence: "I sleep in my bed.", arabicWord: "سرير" },
    ],
  },
  {
    letter: "F",
    lower: "f",
    kind: "consonant",
    letterNameIpa: "/ef/",
    mainSoundIpa: "/f/",
    soundDemoSpeech: "fuh, soft air — fish, frog, flower",
    voiced: false,
    soundTip: {
      en: "Letter name is /ef/, while its pure sound is quiet continuous air /f/ (top teeth on lower lip): fish!",
      ar: "اسم الحرف /ef/، لكن صوته الصافي هو نفث هواء ناعم مستمر /f/ بلا اهتزاز كما في fish!",
    },
    tracingHint: {
      en: "One tall line down, then two lines across at the top!",
      ar: "خط طويل للأسفل ثم خطان أفقيان في الأعلى!",
    },
    examples: [
      { word: "fish", emoji: "🐟", sentence: "The orange fish swims fast.", arabicWord: "سمكة" },
      { word: "frog", emoji: "🐸", sentence: "The green frog can jump.", arabicWord: "ضفدع" },
      {
        word: "flower",
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
    soundDemoSpeech: "guh, guh — goat, grapes, gift",
    voiced: true,
    soundTip: {
      en: "Letter name is /dʒiː/, while its main pure sound is a voiced back-of-tongue pop /ɡ/ as in goat!",
      ar: "اسم الحرف /dʒiː/، لكن صوته الأساسي الصافي هو /ɡ/ مهتز من مؤخرة اللسان كما في goat!",
    },
    tracingHint: {
      en: "Draw a big C, then add a little shelf inside!",
      ar: "ارسم حرف C كبير ثم أضف خطًا صغيرًا للداخل!",
    },
    examples: [
      { word: "goat", emoji: "🐐", sentence: "The goat eats green grass.", arabicWord: "ماعز" },
      { word: "grapes", emoji: "🍇", sentence: "Purple grapes are yummy.", arabicWord: "عنب" },
      { word: "gift", emoji: "🎁", sentence: "I have a birthday gift.", arabicWord: "هدية" },
    ],
  },
  {
    letter: "H",
    lower: "h",
    kind: "consonant",
    letterNameIpa: "/eɪtʃ/",
    mainSoundIpa: "/h/",
    soundDemoSpeech: "huh, soft breath — hat, house, horse",
    voiced: false,
    soundTip: {
      en: "Letter name is /eɪtʃ/, while its pure sound is a gentle warm breath /h/ (no throat buzz): hat!",
      ar: "اسم الحرف /eɪtʃ/، لكن صوته الصافي هو نَفَس دافئ خفيف /h/ بدون اهتزاز كما في hat!",
    },
    tracingHint: {
      en: "Two tall towers with a bridge in the middle!",
      ar: "خطان عموديان متوازيان وجسر بينهما في الوسط!",
    },
    examples: [
      { word: "hat", emoji: "👒", sentence: "I wear a sun hat.", arabicWord: "قبعة" },
      { word: "house", emoji: "🏠", sentence: "My house has a garden.", arabicWord: "منزل" },
      { word: "horse", emoji: "🐴", sentence: "The brown horse runs fast.", arabicWord: "حصان" },
    ],
  },
  {
    letter: "I",
    lower: "i",
    kind: "vowel",
    letterNameIpa: "/aɪ/",
    mainSoundIpa: "/ɪ/",
    soundDemoSpeech: "short i — igloo, insect, ink",
    voiced: true,
    soundTip: {
      en: "Letter name is /aɪ/ ('eye'), while its pure short sound is quick, light /ɪ/ as in igloo and sit!",
      ar: "اسم الحرف /aɪ/، لكن صوته القصير الصافي هو /ɪ/ خفيف وسريع كما في igloo وsit!",
    },
    tracingHint: {
      en: "One straight line down with a tiny hat and shoes!",
      ar: "خط عمودي مستقيم مع خط صغير فوقه وتحته!",
    },
    examples: [
      {
        word: "igloo",
        emoji: "🏔️",
        sentence: "The igloo is made of ice.",
        arabicWord: "كوخ جليدي",
      },
      { word: "insect", emoji: "🐞", sentence: "A red insect sits on a leaf.", arabicWord: "حشرة" },
      { word: "ink", emoji: "🖋️", sentence: "Blue ink is in the pen.", arabicWord: "حبر" },
    ],
  },
  {
    letter: "J",
    lower: "j",
    kind: "consonant",
    letterNameIpa: "/dʒeɪ/",
    mainSoundIpa: "/dʒ/",
    soundDemoSpeech: "juh, juh — jam, juice, jellyfish",
    voiced: true,
    soundTip: {
      en: "Letter name is /dʒeɪ/, while its pure sound is a bouncy voiced /dʒ/ with rounded lips: jam!",
      ar: "اسم الحرف /dʒeɪ/، لكن صوته الصافي هو /dʒ/ مهتز مع ضمّ الشفتين قليلًا كما في jam!",
    },
    tracingHint: {
      en: "Go down and hook around like an umbrella handle!",
      ar: "انزل بخط ثم ارسم خطّافًا مثل مقبض المظلة!",
    },
    examples: [
      { word: "jam", emoji: "🍓", sentence: "I like strawberry jam.", arabicWord: "مربى" },
      { word: "juice", emoji: "🧃", sentence: "Cold orange juice is tasty.", arabicWord: "عصير" },
      {
        word: "jellyfish",
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
    soundDemoSpeech: "kuh, kuh — kite, key, kangaroo",
    voiced: false,
    soundTip: {
      en: "Letter name is /keɪ/, while its pure sound is a crisp voiceless puff /k/ from the back: kite!",
      ar: "اسم الحرف /keɪ/، لكن صوته الصافي هو نفثة خفيفة بلا اهتزاز /k/ من آخر الفم كما في kite!",
    },
    tracingHint: {
      en: "One tall line down, then two kicking legs!",
      ar: "خط طويل للأسفل ثم خطان مائلان للخارج!",
    },
    examples: [
      {
        word: "kite",
        emoji: "🪁",
        sentence: "My kite flies in the sky.",
        arabicWord: "طائرة ورقية",
      },
      { word: "key", emoji: "🔑", sentence: "This key opens the door.", arabicWord: "مفتاح" },
      { word: "kangaroo", emoji: "🦘", sentence: "The kangaroo hops high.", arabicWord: "كنغر" },
    ],
  },
  {
    letter: "L",
    lower: "l",
    kind: "consonant",
    letterNameIpa: "/el/",
    mainSoundIpa: "/l/",
    soundDemoSpeech: "luh, smooth tongue — lion, lemon, leaf",
    voiced: true,
    soundTip: {
      en: "Letter name is /el/, while its pure sound is a smooth voiced glide /l/ with tongue behind top teeth: lion!",
      ar: "اسم الحرف /el/، لكن صوته الصافي هو /l/ ناعم ومهتز برفع طرف اللسان خلف الأسنان العلوية كما في lion!",
    },
    tracingHint: {
      en: "Go straight down, then turn right along the floor!",
      ar: "انزل بخط مستقيم ثم اتجه يمينًا في الأسفل!",
    },
    examples: [
      { word: "lion", emoji: "🦁", sentence: "The lion is strong and brave.", arabicWord: "أسد" },
      { word: "lemon", emoji: "🍋", sentence: "A yellow lemon tastes sour.", arabicWord: "ليمون" },
      { word: "leaf", emoji: "🍃", sentence: "A green leaf falls gently.", arabicWord: "ورقة شجر" },
    ],
  },
  {
    letter: "M",
    lower: "m",
    kind: "consonant",
    letterNameIpa: "/em/",
    mainSoundIpa: "/m/",
    soundDemoSpeech: "muh, lip hum — moon, monkey, milk",
    voiced: true,
    soundTip: {
      en: "Letter name is /em/, while its pure sound is a warm closed-lip nose hum /m/ as in moon!",
      ar: "اسم الحرف /em/، لكن صوته الصافي هو همهمة دافئة بشفتين مغلقتين عبر الأنف /m/ كما في moon!",
    },
    tracingHint: {
      en: "Up, down, up, down like two tall mountains!",
      ar: "اصعد وانزل واصعد وانزل مثل جبلين!",
    },
    examples: [
      {
        word: "moon",
        emoji: "🌙",
        sentence: "The bright moon shines at night.",
        arabicWord: "قمر",
      },
      {
        word: "monkey",
        emoji: "🐒",
        sentence: "The funny monkey climbs trees.",
        arabicWord: "قرد",
      },
      { word: "milk", emoji: "🥛", sentence: "I drink fresh milk.", arabicWord: "حليب" },
    ],
  },
  {
    letter: "N",
    lower: "n",
    kind: "consonant",
    letterNameIpa: "/en/",
    mainSoundIpa: "/n/",
    soundDemoSpeech: "nuh, nose hum — nest, nose, net",
    voiced: true,
    soundTip: {
      en: "Letter name is /en/, while its pure sound is a steady nose hum /n/ with tongue behind top teeth: nest!",
      ar: "اسم الحرف /en/، لكن صوته الصافي هو همهمة ناعمة عبر الأنف /n/ بطرف اللسان خلف الأسنان كما في nest!",
    },
    tracingHint: {
      en: "Straight up, slide down diagonally, then straight up!",
      ar: "خط للأعلى ثم انزلاق مائل ثم للأعلى!",
    },
    examples: [
      {
        word: "nest",
        emoji: "🪹",
        sentence: "Three little eggs sit in the nest.",
        arabicWord: "عش",
      },
      { word: "nose", emoji: "👃", sentence: "I smell flowers with my nose.", arabicWord: "أنف" },
      { word: "net", emoji: "🥅", sentence: "The ball goes into the net.", arabicWord: "شبكة" },
    ],
  },
  {
    letter: "O",
    lower: "o",
    kind: "vowel",
    letterNameIpa: "/əʊ/",
    mainSoundIpa: "/ɒ/",
    soundDemoSpeech: "short o — octopus, orange, hot",
    voiced: true,
    soundTip: {
      en: "Letter name is /əʊ/ ('oh'), while its pure short sound is a neat rounded /ɒ/ as in octopus (not 'aw')!",
      ar: "اسم الحرف /əʊ/، لكن صوته القصير الصافي هو /ɒ/ بشفتين مستديرتين كما في octopus وhot!",
    },
    tracingHint: {
      en: "Draw one smooth, round circle all the way around!",
      ar: "ارسم دائرة كاملة ناعمة ومستديرة!",
    },
    examples: [
      {
        word: "octopus",
        emoji: "🐙",
        sentence: "The octopus has eight arms.",
        arabicWord: "أخطبوط",
      },
      { word: "orange", emoji: "🍊", sentence: "This orange is juicy.", arabicWord: "برتقالة" },
      { word: "owl", emoji: "🦉", sentence: "Pip the owl loves reading!", arabicWord: "بومة" },
    ],
  },
  {
    letter: "P",
    lower: "p",
    kind: "consonant",
    letterNameIpa: "/piː/",
    mainSoundIpa: "/p/",
    soundDemoSpeech: "puh, soft puff — pen, panda, pizza",
    voiced: false,
    soundTip: {
      en: "Letter name is /piː/, while its pure sound is a gentle voiceless air puff /p/ (no throat buzz!): pen!",
      ar: "اسم الحرف /piː/، لكن صوته الصافي هو نفثة هواء لطيفة بدون اهتزاز الحلق /p/ كما في pen!",
    },
    tracingHint: {
      en: "One straight line down, then one round bubble at the top!",
      ar: "خط مستقيم للأسفل ثم دائرة في الأعلى!",
    },
    examples: [
      { word: "pen", emoji: "🖊️", sentence: "I write with a blue pen.", arabicWord: "قلم حبر" },
      { word: "panda", emoji: "🐼", sentence: "The panda eats bamboo.", arabicWord: "باندا" },
      { word: "pizza", emoji: "🍕", sentence: "We share warm pizza.", arabicWord: "بيتزا" },
    ],
  },
  {
    letter: "Q",
    lower: "q",
    kind: "consonant",
    letterNameIpa: "/kjuː/",
    mainSoundIpa: "/kw/",
    soundDemoSpeech: "kwuh, kwuh — queen, quilt, question",
    voiced: false,
    soundTip: {
      en: "Letter name is /kjuː/, while its pure sound with friend U is the crisp blend /kw/ as in queen!",
      ar: "اسم الحرف /kjuː/، لكنه يأتي مع U ليُنتج الصوت الصافي المدمج /kw/ كما في queen!",
    },
    tracingHint: {
      en: "Draw a circle O, then add a cute little tail!",
      ar: "ارسم دائرة مثل O ثم أضف ذيلًا صغيرًا!",
    },
    examples: [
      { word: "queen", emoji: "👑", sentence: "The kind queen wears a crown.", arabicWord: "ملكة" },
      { word: "quilt", emoji: "🛏️", sentence: "My colourful quilt is soft.", arabicWord: "لحاف" },
      { word: "question", emoji: "❓", sentence: "I ask a good question.", arabicWord: "سؤال" },
    ],
  },
  {
    letter: "R",
    lower: "r",
    kind: "consonant",
    letterNameIpa: "/ɑː/",
    mainSoundIpa: "/r/",
    soundDemoSpeech: "ruh, curled tongue — rabbit, rainbow, robot",
    voiced: true,
    soundTip: {
      en: "Letter name is /ɑː/, while its pure sound curls your tongue tip slightly back without touching the roof: /r/ in rabbit!",
      ar: "اسم الحرف /ɑː/، لكن صوته الصافي /r/ يُنطق بثني طرف اللسان قليلًا للخلف دون لمس سقف الفم كما في rabbit!",
    },
    tracingHint: {
      en: "Line down, top bubble like P, then one kicking leg!",
      ar: "خط للأسفل وقوس في الأعلى ثم ساق مائلة!",
    },
    examples: [
      {
        word: "rabbit",
        emoji: "🐰",
        sentence: "The white rabbit hops quickly.",
        arabicWord: "أرنب",
      },
      {
        word: "rainbow",
        emoji: "🌈",
        sentence: "Look at the bright rainbow!",
        arabicWord: "قوس قزح",
      },
      { word: "robot", emoji: "🤖", sentence: "My toy robot can dance.", arabicWord: "روبوت" },
    ],
  },
  {
    letter: "S",
    lower: "s",
    kind: "consonant",
    letterNameIpa: "/es/",
    mainSoundIpa: "/s/",
    soundDemoSpeech: "suh, soft hiss — sun, star, sock",
    voiced: false,
    soundTip: {
      en: "Letter name is /es/, while its pure sound is a continuous voiceless snake hiss /s/ as in sun!",
      ar: "اسم الحرف /es/، لكن صوته الصافي هو صفير ناعم مستمر بلا اهتزاز /s/ كما في sun!",
    },
    tracingHint: {
      en: "Curve left, then curve right like a wiggly snake!",
      ar: "انحنِ يسارًا ثم يمينًا مثل الأفعى اللطيفة!",
    },
    examples: [
      { word: "sun", emoji: "☀️", sentence: "The warm sun shines bright.", arabicWord: "شمس" },
      { word: "star", emoji: "⭐", sentence: "You earned a gold star!", arabicWord: "نجمة" },
      { word: "sock", emoji: "🧦", sentence: "My socks are striped.", arabicWord: "جورب" },
    ],
  },
  {
    letter: "T",
    lower: "t",
    kind: "consonant",
    letterNameIpa: "/tiː/",
    mainSoundIpa: "/t/",
    soundDemoSpeech: "tuh, crisp tap — tiger, tree, train",
    voiced: false,
    soundTip: {
      en: "Letter name is /tiː/, while its pure sound is a quick voiceless tap /t/ behind top teeth: tiger!",
      ar: "اسم الحرف /tiː/، لكن صوته الصافي هو نقرة خفيفة سريعة بلا اهتزاز /t/ خلف الأسنان العلوية كما في tiger!",
    },
    tracingHint: {
      en: "One straight tree trunk, then a wide roof on top!",
      ar: "خط عمودي للأسفل وسقف أفقي في الأعلى!",
    },
    examples: [
      { word: "tiger", emoji: "🐯", sentence: "The tiger has orange stripes.", arabicWord: "نمر" },
      { word: "tree", emoji: "🌳", sentence: "Birds sing in the tall tree.", arabicWord: "شجرة" },
      {
        word: "train",
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
    soundDemoSpeech: "uh, uh — umbrella, up, sun",
    voiced: true,
    soundTip: {
      en: "Letter name is /juː/ ('yoo'), while its pure short sound is a relaxed /ʌ/ as in umbrella and cup!",
      ar: "اسم الحرف /juː/، لكن صوته القصير الصافي هو /ʌ/ بفم مسترخٍ كما في umbrella وcup!",
    },
    tracingHint: {
      en: "Go down, curve around like a smile, and come back up!",
      ar: "انزل ثم انحنِ كالابتسامة واصعد للأعلى!",
    },
    examples: [
      {
        word: "umbrella",
        emoji: "☂️",
        sentence: "I hold my umbrella in the rain.",
        arabicWord: "مظلة",
      },
      { word: "up", emoji: "⬆️", sentence: "Look up at the clouds!", arabicWord: "أعلى" },
      { word: "sun", emoji: "☀️", sentence: "The sun is bright and warm.", arabicWord: "شمس" },
    ],
  },
  {
    letter: "V",
    lower: "v",
    kind: "consonant",
    letterNameIpa: "/viː/",
    mainSoundIpa: "/v/",
    soundDemoSpeech: "vuh, lip buzz — van, violin, vase",
    voiced: true,
    soundTip: {
      en: "Letter name is /viː/, while its pure sound adds continuous voice buzz /v/ (top teeth on lower lip): van!",
      ar: "اسم الحرف /viː/، لكن صوته الصافي هو طنين مهتز مستمر /v/ بملامسة الأسنان للشفة السفلية كما في van!",
    },
    tracingHint: {
      en: "Slide down to a point, then zoom right back up!",
      ar: "انزل بخط مائل إلى نقطة ثم اصعد بخط مائل!",
    },
    examples: [
      {
        word: "van",
        emoji: "🚐",
        sentence: "The blue van carries boxes.",
        arabicWord: "شاحنة صغيرة",
      },
      { word: "violin", emoji: "🎻", sentence: "She plays the violin softly.", arabicWord: "كمان" },
      { word: "vase", emoji: "🏺", sentence: "Flowers sit in a tall vase.", arabicWord: "مزهرية" },
    ],
  },
  {
    letter: "W",
    lower: "w",
    kind: "consonant",
    letterNameIpa: "/ˈdʌb.əl.juː/",
    mainSoundIpa: "/w/",
    soundDemoSpeech: "wuh, round lips — whale, watch, water",
    voiced: true,
    soundTip: {
      en: "Letter name is /ˈdʌb.əl.juː/, while its pure sound starts with tiny round lips gliding into /w/: water!",
      ar: "اسم الحرف /ˈdʌb.əl.juː/، لكن صوته الصافي يبدأ بضمّ الشفتين بدائرة صغيرة ثم انسياب /w/ كما في water!",
    },
    tracingHint: {
      en: "Down, up, down, up like two V friends holding hands!",
      ar: "انزل واصعد وانزل واصعد مثل حرفي V معًا!",
    },
    examples: [
      {
        word: "whale",
        emoji: "🐋",
        sentence: "The big whale swims in the ocean.",
        arabicWord: "حوت",
      },
      { word: "watch", emoji: "⌚", sentence: "My watch tells the time.", arabicWord: "ساعة يد" },
      { word: "water", emoji: "💧", sentence: "I drink cool clean water.", arabicWord: "ماء" },
    ],
  },
  {
    letter: "X",
    lower: "x",
    kind: "consonant",
    letterNameIpa: "/eks/",
    mainSoundIpa: "/ks/",
    soundDemoSpeech: "kuh-suh — box, fox, six",
    voiced: false,
    soundTip: {
      en: "Letter name is /eks/, while its pure sound at the end of words is a crisp two-part /ks/ as in box and fox!",
      ar: "اسم الحرف /eks/، لكن صوته الصافي في نهاية الكلمات هو /ks/ مزدوج وخفيف كما في box وfox!",
    },
    tracingHint: {
      en: "Two criss-cross lines that meet right in the middle!",
      ar: "خطان مائلان يتقاطعان في المنتصف تمامًا!",
    },
    examples: [
      { word: "box", emoji: "📦", sentence: "My toys are inside the box.", arabicWord: "صندوق" },
      { word: "fox", emoji: "🦊", sentence: "The clever orange fox runs.", arabicWord: "ثعلب" },
      { word: "six", emoji: "6️⃣", sentence: "I count six bright stars.", arabicWord: "ستة" },
    ],
  },
  {
    letter: "Y",
    lower: "y",
    kind: "consonant",
    letterNameIpa: "/waɪ/",
    mainSoundIpa: "/j/",
    soundDemoSpeech: "yuh, soft glide — yellow, yo-yo, yak",
    voiced: true,
    soundTip: {
      en: "Letter name is /waɪ/, while its pure consonant sound is a smiling voiced glide /j/ as in yellow and yes!",
      ar: "اسم الحرف /waɪ/، لكن صوته الساكن الصافي هو /j/ ناعم مثل الياء الخفيفة كما في yellow وyes!",
    },
    tracingHint: {
      en: "Draw a small V on top, then a straight tail down!",
      ar: "ارسم حرف V صغير في الأعلى ثم خطًا مستقيمًا للأسفل!",
    },
    examples: [
      { word: "yellow", emoji: "💛", sentence: "The lemon is bright yellow.", arabicWord: "أصفر" },
      { word: "yo-yo", emoji: "🪀", sentence: "My yo-yo goes up and down.", arabicWord: "يويو" },
      {
        word: "yak",
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
    soundDemoSpeech: "zuh, bee buzz — zebra, zoo, zip",
    voiced: true,
    soundTip: {
      en: "Letter name is /zed/ (UK) or /ziː/ (US), while its pure sound is a continuous bee buzz /z/ as in zebra!",
      ar: "اسم الحرف /zed/ أو /ziː/، لكن صوته الصافي هو طنين النحلة المهتز المستمر /z/ كما في zebra!",
    },
    tracingHint: {
      en: "Across the top, zig-zag down, then across the bottom!",
      ar: "خط أفقي بالأعلى ثم مائل للأسفل ثم أفقي بالأسفل!",
    },
    examples: [
      {
        word: "zebra",
        emoji: "🦓",
        sentence: "The zebra has black and white stripes.",
        arabicWord: "حمار وحشي",
      },
      {
        word: "zoo",
        emoji: "🦁",
        sentence: "We visit animals at the zoo.",
        arabicWord: "حديقة الحيوان",
      },
      { word: "zip", emoji: "🤐", sentence: "I zip up my warm jacket.", arabicWord: "سحّاب" },
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
