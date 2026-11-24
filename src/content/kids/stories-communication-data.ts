import type { Bilingual } from "@/content/lesson-types";
import type { KidsAgeGroupId } from "./alphabet-phonics-data";

export interface KidsStoryVocab {
  word: string;
  emoji: string;
  meaningAr: string;
}

export interface KidsStoryPage {
  sceneEmoji: string;
  textEn: string;
  textAr: string;
  focusWords: KidsStoryVocab[];
}

export interface KidsStory {
  id: string;
  ageGroup: KidsAgeGroupId;
  theme: Bilingual;
  emoji: string;
  title: Bilingual;
  moral: Bilingual;
  pages: KidsStoryPage[];
  eventOrder: {
    id: string;
    emoji: string;
    label: Bilingual;
  }[];
  comprehension: {
    question: Bilingual;
    options: { label: Bilingual; emoji: string }[];
    correctIndex: number;
    praise: Bilingual;
  };
}

export interface KidsMiniConversation {
  id: string;
  ageGroup: KidsAgeGroupId;
  emoji: string;
  title: Bilingual;
  setting: Bilingual;
  turns: {
    speaker: "Lina" | "Omar" | "Pip";
    gender: "female" | "male";
    emoji: string;
    en: string;
    ar: string;
  }[];
  speakPracticeLine: string;
  speakPracticeAr: string;
}

export type KidsWritingMode = "word-tiles" | "sentence-builder" | "mini-paragraph";

export interface KidsWritingMission {
  id: string;
  ageGroup: KidsAgeGroupId;
  mode: KidsWritingMode;
  emoji: string;
  title: Bilingual;
  prompt: Bilingual;
  /** Target word (for word-tiles) or target ordered words (for sentence-builder) */
  targetTokens?: string[];
  /** Extra distractor tiles for word-tiles / sentence-builder */
  extraTokens?: string[];
  /** Minimum word count & starter ideas for mini-paragraph mode */
  minWords?: number;
  starterPrompt?: string;
  helpfulWords?: string[];
  sampleModel: string;
}

export interface KidsFriendlyQuestion {
  id: string;
  skill: "phonics" | "vocab" | "grammar" | "reading";
  emoji: string;
  audioText: string;
  prompt: Bilingual;
  options: { label: string; emoji: string }[];
  correctIndex: number;
  praise: Bilingual;
  gentleHint: Bilingual;
}

export interface KidsFriendlyAssessment {
  id: string;
  ageGroup: KidsAgeGroupId;
  emoji: string;
  title: Bilingual;
  subtitle: Bilingual;
  questions: KidsFriendlyQuestion[];
}

export interface ParentHomeActivity {
  id: string;
  focusArea: "letters" | "blending" | "blends" | "sentences" | "communication";
  emoji: string;
  title: Bilingual;
  minutes: number;
  steps: Bilingual;
}

export const KIDS_STORIES: readonly KidsStory[] = [
  {
    id: "story-friendship",
    ageGroup: "early-4-6",
    theme: { en: "Friendship", ar: "الصداقة" },
    emoji: "🦉",
    title: { en: "Pip and the New Bird", ar: "بيب والطائر الجديد" },
    moral: {
      en: "A warm hello makes every new friend feel welcome.",
      ar: "التحية اللطيفة تجعل كل صديق جديد يشعر بالترحيب.",
    },
    pages: [
      {
        sceneEmoji: "🌳🐤",
        textEn: "Pip sees a little blue bird sitting alone on a big green tree.",
        textAr: "يرى بيب طائرًا أزرق صغيرًا يجلس وحده على شجرة خضراء كبيرة.",
        focusWords: [
          { word: "little", emoji: "🐣", meaningAr: "صغير" },
          { word: "tree", emoji: "🌳", meaningAr: "شجرة" },
        ],
      },
      {
        sceneEmoji: "🦉👋",
        textEn: "Pip smiles and says, 'Hello! My name is Pip. Do you want to play?'",
        textAr: "يبتسم بيب ويقول: «مرحبًا! اسمي بيب. هل تريد أن نلعب؟»",
        focusWords: [
          { word: "smiles", emoji: "😊", meaningAr: "يبتسم" },
          { word: "play", emoji: "🎈", meaningAr: "يلعب" },
        ],
      },
      {
        sceneEmoji: "🦉🎶🐤",
        textEn: "The blue bird feels happy! Together they sing a joyful song.",
        textAr: "يشعر الطائر الأزرق بالسعادة! ويغنيان معًا أغنية مبهجة.",
        focusWords: [
          { word: "happy", emoji: "😄", meaningAr: "سعيد" },
          { word: "together", emoji: "🤝", meaningAr: "معًا" },
        ],
      },
    ],
    eventOrder: [
      {
        id: "e1",
        emoji: "🌳",
        label: { en: "Pip sees the little blue bird.", ar: "يرى بيب الطائر الأزرق الصغير." },
      },
      {
        id: "e2",
        emoji: "👋",
        label: { en: "Pip says hello and invites him to play.", ar: "يحيّيه بيب ويدعوه للّعب." },
      },
      {
        id: "e3",
        emoji: "🎶",
        label: { en: "Both friends sing a happy song.", ar: "يغنّي الصديقان أغنية سعيدة." },
      },
    ],
    comprehension: {
      question: {
        en: "How did Pip help the new bird feel happy?",
        ar: "كيف ساعد بيب الطائر الجديد ليشعر بالسعادة؟",
      },
      options: [
        {
          label: { en: "Pip smiled and invited him to play.", ar: "ابتسم بيب ودعاه للّعب." },
          emoji: "😊",
        },
        { label: { en: "Pip flew far away.", ar: "طار بيب بعيدًا." }, emoji: "☁️" },
        { label: { en: "Pip went to sleep.", ar: "ذهب بيب لينام." }, emoji: "😴" },
      ],
      correctIndex: 0,
      praise: {
        en: "Wonderful! Being friendly makes everyone smile!",
        ar: "رائع! اللطف والصداقة يُسعدان الجميع!",
      },
    },
  },
  {
    id: "story-honesty",
    ageGroup: "young-7-9",
    theme: { en: "Honesty", ar: "الصدق" },
    emoji: "☕",
    title: { en: "Omar's Honest Choice", ar: "اختيار عمر الصادق" },
    moral: {
      en: "Telling the truth builds trust and shows real courage.",
      ar: "قول الصدق يبني الثقة ويدل على الشجاعة الحقيقية.",
    },
    pages: [
      {
        sceneEmoji: "⚽🥛",
        textEn: "Omar plays with his soft ball inside the kitchen and bumps a yellow cup.",
        textAr: "يلعب عمر بكرته الناعمة داخل المطبخ فيصدم كوبًا أصفر.",
        focusWords: [
          { word: "kitchen", emoji: "🍽️", meaningAr: "مطبخ" },
          { word: "cup", emoji: "☕", meaningAr: "كوب" },
        ],
      },
      {
        sceneEmoji: "😟💬",
        textEn: "Omar feels nervous, but he walks to Mum and says, 'I am sorry. I broke the cup.'",
        textAr: "يشعر عمر بالتوتر، لكنه يذهب إلى أمه ويقول: «أنا آسف، لقد كسرتُ الكوب.»",
        focusWords: [
          { word: "sorry", emoji: "💛", meaningAr: "آسف" },
          { word: "truth", emoji: "✨", meaningAr: "الصدق" },
        ],
      },
      {
        sceneEmoji: "🤗🧹",
        textEn: "Mum hugs Omar for telling the truth, and they sweep the floor safely together.",
        textAr: "تحتضن الأم عمر لصدقه، ثم ينظفان الأرض بأمان معًا.",
        focusWords: [
          { word: "proud", emoji: "🌟", meaningAr: "فخور" },
          { word: "safely", emoji: "🛡️", meaningAr: "بأمان" },
        ],
      },
    ],
    eventOrder: [
      {
        id: "e1",
        emoji: "⚽",
        label: {
          en: "Omar accidentally bumps the yellow cup.",
          ar: "يصدم عمر الكوب الأصفر بالخطأ.",
        },
      },
      {
        id: "e2",
        emoji: "💬",
        label: { en: "Omar tells Mum the truth right away.", ar: "يخبر عمر أمه بالصدق فورًا." },
      },
      {
        id: "e3",
        emoji: "🤗",
        label: { en: "Mum thanks Omar for being honest.", ar: "تشكر الأم عمر على صدقه." },
      },
    ],
    comprehension: {
      question: { en: "Why did Mum hug Omar?", ar: "لماذا احتضنت الأم عمر؟" },
      options: [
        {
          label: {
            en: "Because he was brave and told the truth.",
            ar: "لأنه كان شجاعًا وقال الصدق.",
          },
          emoji: "🌟",
        },
        { label: { en: "Because he hid the cup.", ar: "لأنه أخفى الكوب." }, emoji: "📦" },
        { label: { en: "Because he ran outside.", ar: "لأنه ركض للخارج." }, emoji: "🏃" },
      ],
      correctIndex: 0,
      praise: {
        en: "Great job! Honesty is always a superpower!",
        ar: "عمل رائع! الصدق دائمًا قوة جميلة!",
      },
    },
  },
  {
    id: "story-kindness",
    ageGroup: "early-4-6",
    theme: { en: "Kindness", ar: "اللطف والرحمة" },
    emoji: "🐱",
    title: { en: "The Kitten in the Rain", ar: "القطة الصغيرة تحت المطر" },
    moral: {
      en: "Small acts of kindness warm the world.",
      ar: "الأفعال الصغيرة اللطيفة تملأ العالم دفئًا.",
    },
    pages: [
      {
        sceneEmoji: "🌧️🐱",
        textEn: "Rain falls softly. Lina hears a tiny 'meow' near the garden gate.",
        textAr: "يهطل المطر بهدوء. تسمع لينا مواءً صغيرًا قرب باب الحديقة.",
        focusWords: [
          { word: "rain", emoji: "🌧️", meaningAr: "مطر" },
          { word: "garden", emoji: "🌷", meaningAr: "حديقة" },
        ],
      },
      {
        sceneEmoji: "☂️🧺",
        textEn: "Lina brings a warm dry towel and shares her colourful umbrella.",
        textAr: "تحضر لينا منشفة دافئة وجافة وتشارك مظلتها الملوّنة.",
        focusWords: [
          { word: "warm", emoji: "☀️", meaningAr: "دافئ" },
          { word: "umbrella", emoji: "☂️", meaningAr: "مظلة" },
        ],
      },
      {
        sceneEmoji: "🐱💛",
        textEn: "The little kitten purrs happily on the dry mat.",
        textAr: "تخرخر القطة الصغيرة بسعادة على السجادة الجافة.",
        focusWords: [
          { word: "dry", emoji: "✨", meaningAr: "جاف" },
          { word: "kind", emoji: "💛", meaningAr: "لطيف" },
        ],
      },
    ],
    eventOrder: [
      {
        id: "e1",
        emoji: "🌧️",
        label: {
          en: "Lina hears a tiny kitten in the rain.",
          ar: "تسمع لينا قطة صغيرة تحت المطر.",
        },
      },
      {
        id: "e2",
        emoji: "☂️",
        label: { en: "Lina brings a warm towel and umbrella.", ar: "تحضر لينا منشفة دافئة ومظلة." },
      },
      {
        id: "e3",
        emoji: "💛",
        label: { en: "The kitten feels warm and safe.", ar: "تشعر القطة بالدفء والأمان." },
      },
    ],
    comprehension: {
      question: { en: "What did Lina give the wet kitten?", ar: "ماذا أعطت لينا للقطة المبللة؟" },
      options: [
        {
          label: { en: "A warm dry towel and shelter.", ar: "منشفة دافئة ومكانًا جافًا." },
          emoji: "🧺",
        },
        { label: { en: "Cold ice water.", ar: "ماءً باردًا." }, emoji: "🧊" },
        { label: { en: "A noisy drum.", ar: "طبلًا صاخبًا." }, emoji: "🥁" },
      ],
      correctIndex: 0,
      praise: {
        en: "Super! Kind hands help little animals feel safe!",
        ar: "ممتاز! الأيدي الرحيمة تحمي الكائنات الصغيرة!",
      },
    },
  },
  {
    id: "story-helping",
    ageGroup: "early-4-6",
    theme: { en: "Helping Others", ar: "مساعدة الآخرين" },
    emoji: "🧁",
    title: { en: "Lina Helps Grandma Bake", ar: "لينا تساعد جدّتها في الخَبز" },
    moral: {
      en: "Working together turns chores into happy memories.",
      ar: "العمل معًا يحوّل المهام إلى ذكريات سعيدة.",
    },
    pages: [
      {
        sceneEmoji: "👵🥣",
        textEn: "Grandma wants to bake sweet banana muffins for the family.",
        textAr: "تريد الجدة خبز كعك الموز اللذيذ للعائلة.",
        focusWords: [
          { word: "bake", emoji: "🧁", meaningAr: "يخبز" },
          { word: "family", emoji: "👨‍👩‍👧", meaningAr: "عائلة" },
        ],
      },
      {
        sceneEmoji: "👧🥄",
        textEn: "Lina washes her hands, counts three bananas, and stirs the bowl.",
        textAr: "تغسل لينا يديها وتعدّ ثلاث موزات وتخلط الوعاء.",
        focusWords: [
          { word: "counts", emoji: "🔢", meaningAr: "يعدّ" },
          { word: "bowl", emoji: "🥣", meaningAr: "وعاء" },
        ],
      },
      {
        sceneEmoji: "🧁🌟",
        textEn: "Everyone tastes the warm muffins and says, 'Thank you, Chef Lina!'",
        textAr: "يتذوق الجميع الكعك الدافئ ويقولون: «شكرًا لكِ يا طاهية لينا!»",
        focusWords: [
          { word: "sweet", emoji: "🍯", meaningAr: "حلو ولذيذ" },
          { word: "help", emoji: "🙌", meaningAr: "يساعد" },
        ],
      },
    ],
    eventOrder: [
      {
        id: "e1",
        emoji: "👵",
        label: { en: "Grandma starts baking banana muffins.", ar: "تبدأ الجدة بخبز كعك الموز." },
      },
      {
        id: "e2",
        emoji: "🥄",
        label: {
          en: "Lina washes her hands and stirs the bowl.",
          ar: "تغسل لينا يديها وتخلط العجين.",
        },
      },
      {
        id: "e3",
        emoji: "🧁",
        label: { en: "The family enjoys the warm muffins.", ar: "تستمتع العائلة بالكعك الدافئ." },
      },
    ],
    comprehension: {
      question: {
        en: "What did Lina do first before helping Grandma?",
        ar: "ماذا فعلت لينا أولاً قبل مساعدة جدتها؟",
      },
      options: [
        { label: { en: "She washed her hands.", ar: "غسلت يديها." }, emoji: "🧼" },
        { label: { en: "She watched TV.", ar: "شاهدت التلفاز." }, emoji: "📺" },
        { label: { en: "She painted a wall.", ar: "لوّنت الجدار." }, emoji: "🎨" },
      ],
      correctIndex: 0,
      praise: {
        en: "Awesome! Clean hands make great little helpers!",
        ar: "رائع! اليدان النظيفتان بداية كل مساعدة جميلة!",
      },
    },
  },
  {
    id: "story-family",
    ageGroup: "young-7-9",
    theme: { en: "Family", ar: "العائلة" },
    emoji: "🧺",
    title: { en: "Saturday Picnic in the Park", ar: "نزهة السبت في الحديقة" },
    moral: {
      en: "Time spent with family is the best treasure.",
      ar: "الوقت الذي نقضيه مع العائلة هو أجمل كنز.",
    },
    pages: [
      {
        sceneEmoji: "🌞🧺",
        textEn: "On Saturday morning, Mum, Dad, Lina, and Omar pack a picnic basket.",
        textAr: "في صباح السبت، تجهّز الأم والأب ولينا وعمر سلة النزهة.",
        focusWords: [
          { word: "morning", emoji: "🌅", meaningAr: "صباح" },
          { word: "basket", emoji: "🧺", meaningAr: "سلة" },
        ],
      },
      {
        sceneEmoji: "🍉🪁",
        textEn: "They eat crisp apples and red watermelon, then fly a bright orange kite.",
        textAr: "يأكلون التفاح المقرمش والبطيخ الأحمر، ثم يطيّرون طائرة ورقية برتقالية.",
        focusWords: [
          { word: "kite", emoji: "🪁", meaningAr: "طائرة ورقية" },
          { word: "bright", emoji: "✨", meaningAr: "زاهٍ ومشرق" },
        ],
      },
      {
        sceneEmoji: "🌅❤️",
        textEn: "Before going home, they pick up every wrapper to keep the park clean.",
        textAr: "وقبل العودة إلى البيت، يجمعون كل الأوراق ليبقى المنتزه نظيفًا.",
        focusWords: [
          { word: "clean", emoji: "🌿", meaningAr: "نظيف" },
          { word: "park", emoji: "🏞️", meaningAr: "حديقة عامة" },
        ],
      },
    ],
    eventOrder: [
      {
        id: "e1",
        emoji: "🧺",
        label: { en: "The family packs a picnic basket.", ar: "تجهز العائلة سلة النزهة." },
      },
      {
        id: "e2",
        emoji: "🪁",
        label: {
          en: "They eat fruit and fly a kite.",
          ar: "يأكلون الفاكهة ويطيّرون الطائرة الورقية.",
        },
      },
      {
        id: "e3",
        emoji: "🌿",
        label: { en: "They clean up before heading home.", ar: "ينظفون المكان قبل العودة للبيت." },
      },
    ],
    comprehension: {
      question: {
        en: "What did the family do before leaving the park?",
        ar: "ماذا فعلت العائلة قبل مغادرة الحديقة؟",
      },
      options: [
        {
          label: {
            en: "They picked up every wrapper to keep it clean.",
            ar: "جمعوا كل الأوراق للحفاظ على نظافة الحديقة.",
          },
          emoji: "🌿",
        },
        { label: { en: "They left their basket behind.", ar: "تركوا السلة خلفهم." }, emoji: "🧺" },
        { label: { en: "They climbed a lamppost.", ar: "تسلّقوا عمود الإنارة." }, emoji: "💡" },
      ],
      correctIndex: 0,
      praise: {
        en: "Brilliant reading! Taking care of our parks helps everyone!",
        ar: "قراءة رائعة! العناية بالحدائق تسعد الجميع!",
      },
    },
  },
  {
    id: "story-animals",
    ageGroup: "young-7-9",
    theme: { en: "Animals", ar: "الحيوانات" },
    emoji: "🐿️",
    title: { en: "The Clever Little Squirrel", ar: "السنجاب الصغير الذكي" },
    moral: {
      en: "Planning ahead helps us stay ready for rainy days.",
      ar: "التخطيط المسبق يساعدنا على الاستعداد للأيام القادمة.",
    },
    pages: [
      {
        sceneEmoji: "🍂🐿️",
        textEn: "In autumn, Sami the squirrel gathers brown acorns while the sun shines.",
        textAr: "في فصل الخريف، يجمع السنجاب سامي ثمار البلوط بينما الشمس مشرقة.",
        focusWords: [
          { word: "autumn", emoji: "🍂", meaningAr: "الخريف" },
          { word: "gathers", emoji: "🌰", meaningAr: "يجمع" },
        ],
      },
      {
        sceneEmoji: "❄️🏠",
        textEn: "When cold winter winds blow, Sami stays cosy inside his warm oak tree.",
        textAr: "عندما تهب رياح الشتاء الباردة، يبقى سامي دافئًا داخل شجرته.",
        focusWords: [
          { word: "winter", emoji: "❄️", meaningAr: "الشتاء" },
          { word: "cosy", emoji: "🧣", meaningAr: "دافئ ومريح" },
        ],
      },
      {
        sceneEmoji: "🐿️🐦",
        textEn: "He even shares extra snacks with a hungry robin outside his window!",
        textAr: "بل ويشارك بعض الطعام مع طائر صغير جائع قرب نافذته!",
        focusWords: [
          { word: "shares", emoji: "🤲", meaningAr: "يشارك" },
          { word: "extra", emoji: "➕", meaningAr: "إضافي" },
        ],
      },
    ],
    eventOrder: [
      {
        id: "e1",
        emoji: "🍂",
        label: { en: "Sami gathers acorns in sunny autumn.", ar: "يجمع سامي البلوط في الخريف." },
      },
      {
        id: "e2",
        emoji: "❄️",
        label: {
          en: "Cold winter arrives while Sami is ready.",
          ar: "يأتي الشتاء البارد وسامي مستعد.",
        },
      },
      {
        id: "e3",
        emoji: "🐦",
        label: { en: "Sami shares extra food with a bird.", ar: "يشارك سامي الطعام مع طائر جائع." },
      },
    ],
    comprehension: {
      question: { en: "Why was Sami ready for winter?", ar: "لماذا كان سامي مستعدًا للشتاء؟" },
      options: [
        {
          label: {
            en: "Because he planned ahead and gathered food in autumn.",
            ar: "لأنه خطّط مبكرًا وجمع الطعام في الخريف.",
          },
          emoji: "🌰",
        },
        {
          label: { en: "Because winter never came.", ar: "لأن الشتاء لم يأتِ أبدًا." },
          emoji: "☀️",
        },
        {
          label: { en: "Because he bought a coat at a shop.", ar: "لأنه اشترى معطفًا من متجر." },
          emoji: "🧥",
        },
      ],
      correctIndex: 0,
      praise: {
        en: "Excellent! Planning ahead makes life peaceful and fun!",
        ar: "ممتاز! التخطيط المسبق يجعل حياتنا هادئة وممتعة!",
      },
    },
  },
  {
    id: "story-school",
    ageGroup: "young-7-9",
    theme: { en: "School Life", ar: "الحياة المدرسية" },
    emoji: "🎒",
    title: { en: "My First English Notebook", ar: "دفتري الأول للإنجليزية" },
    moral: {
      en: "Every mistake is simply a step toward learning something new.",
      ar: "كل محاولة وخطأ بسيط هو خطوة نحو تعلّم شيء جديد.",
    },
    pages: [
      {
        sceneEmoji: "🏫📒",
        textEn: "In class today, Omar tries to spell the word 'elephant' in his new notebook.",
        textAr: "في الصف اليوم، يحاول عمر تهجئة كلمة «elephant» في دفتره الجديد.",
        focusWords: [
          { word: "notebook", emoji: "📒", meaningAr: "دفتر" },
          { word: "spell", emoji: "🔤", meaningAr: "يتهجّأ" },
        ],
      },
      {
        sceneEmoji: "👩‍🏫✨",
        textEn: "He misses one letter, so his teacher smiles and says, 'Look! P and H make /f/!'",
        textAr: "ينسى حرفًا واحدًا، فتبتسم معلمته وتقول: «انظر! حرفا P وH معًا يصنعان صوت /f/!»",
        focusWords: [
          { word: "teacher", emoji: "👩‍🏫", meaningAr: "معلمة" },
          { word: "letter", emoji: "🔠", meaningAr: "حرف" },
        ],
      },
      {
        sceneEmoji: "🐘⭐",
        textEn: "Omar writes 'e-l-e-p-h-a-n-t' neatly and draws a smiling grey elephant beside it!",
        textAr: "يكتب عمر الكلمة بوضوح ويرسم فيلاً رماديًا مبتسمًا بجانبها!",
        focusWords: [
          { word: "neatly", emoji: "✏️", meaningAr: "بترتيب وإتقان" },
          { word: "draws", emoji: "🎨", meaningAr: "يرسم" },
        ],
      },
    ],
    eventOrder: [
      {
        id: "e1",
        emoji: "📒",
        label: { en: "Omar tries to spell 'elephant'.", ar: "يحاول عمر كتابة كلمة elephant." },
      },
      {
        id: "e2",
        emoji: "👩‍🏫",
        label: { en: "The teacher shows him the 'ph' sound.", ar: "تشرح المعلمة له صوت ph." },
      },
      {
        id: "e3",
        emoji: "🐘",
        label: {
          en: "Omar spells it right and draws an elephant.",
          ar: "يكتبها عمر بشكل صحيح ويرسم فيلاً.",
        },
      },
    ],
    comprehension: {
      question: {
        en: "What sound do the letters P and H make in 'elephant'?",
        ar: "ما الصوت الذي يصنعه الحرفان P وH في كلمة elephant؟",
      },
      options: [
        { label: { en: "The /f/ sound!", ar: "صوت /f/!" }, emoji: "🗣️" },
        { label: { en: "The /z/ sound!", ar: "صوت /z/!" }, emoji: "🐝" },
        { label: { en: "The /m/ sound!", ar: "صوت /m/!" }, emoji: "🎵" },
      ],
      correctIndex: 0,
      praise: {
        en: "Super phonics star! PH makes the /f/ sound in elephant and phone!",
        ar: "نجم الصوتيات! حرفا PH يصنعان صوت /f/!",
      },
    },
  },
  {
    id: "story-adventures",
    ageGroup: "preteen-10-12",
    theme: { en: "Adventures", ar: "المغامرات" },
    emoji: "🗺️",
    title: { en: "The Treasure Map in the Park", ar: "خريطة الكنز في الحديقة" },
    moral: {
      en: "Curiosity and teamwork turn ordinary afternoons into unforgettable adventures.",
      ar: "الفضول وروح الفريق يحوّلان الأوقات العادية إلى مغامرات لا تُنسى.",
    },
    pages: [
      {
        sceneEmoji: "🗺️🧭",
        textEn:
          "Lina and Omar follow three English clues hidden by their older brother around the park.",
        textAr: "تتّبع لينا وعمر ثلاثة ألغاز بالإنجليزية خبّأها أخوهما الأكبر في أنحاء الحديقة.",
        focusWords: [
          { word: "clues", emoji: "🔍", meaningAr: "أدلة وألغاز" },
          { word: "follow", emoji: "👣", meaningAr: "يتّبع" },
        ],
      },
      {
        sceneEmoji: "🌉🪨",
        textEn: "Clue two says: 'Walk across the wooden bridge and look behind the round bench.'",
        textAr: "يقول اللغز الثاني: «اعبر الجسر الخشبي وانظر خلف المقعد الدائري.»",
        focusWords: [
          { word: "bridge", emoji: "🌉", meaningAr: "جسر" },
          { word: "behind", emoji: "📍", meaningAr: "خلف" },
        ],
      },
      {
        sceneEmoji: "📚🎁",
        textEn:
          "Inside the treasure box they discover two brand-new adventure storybooks and a star badge!",
        textAr: "داخل صندوق الكنز يكتشفان قصتين جديدتين للمغامرات وشارة نجمة لامعة!",
        focusWords: [
          { word: "discover", emoji: "🌟", meaningAr: "يكتشف" },
          { word: "treasure", emoji: "🎁", meaningAr: "كنز" },
        ],
      },
    ],
    eventOrder: [
      {
        id: "e1",
        emoji: "🗺️",
        label: {
          en: "They read the first park treasure clue.",
          ar: "يقرآن اللغز الأول لخريطة الكنز.",
        },
      },
      {
        id: "e2",
        emoji: "🌉",
        label: {
          en: "They cross the wooden bridge to the bench.",
          ar: "يعبران الجسر الخشبي نحو المقعد.",
        },
      },
      {
        id: "e3",
        emoji: "📚",
        label: {
          en: "They find storybooks inside the treasure box.",
          ar: "يجدان قصصًا جديدة داخل صندوق الكنز.",
        },
      },
    ],
    comprehension: {
      question: { en: "Where was the treasure box hidden?", ar: "أين كان صندوق الكنز مخبّأً؟" },
      options: [
        {
          label: {
            en: "Behind the round bench across the wooden bridge.",
            ar: "خلف المقعد الدائري بعد الجسر الخشبي.",
          },
          emoji: "🌉",
        },
        { label: { en: "Under a parked yellow bus.", ar: "تحت حافلة صفراء." }, emoji: "🚌" },
        { label: { en: "On top of a tall cloud.", ar: "فوق سحابة عالية." }, emoji: "☁️" },
      ],
      correctIndex: 0,
      praise: {
        en: "Amazing detective work! You understood every preposition!",
        ar: "عمل رائع أيها المكتشف! فهمت جميع حروف الجر بدقة!",
      },
    },
  },
  {
    id: "story-sharing",
    ageGroup: "early-4-6",
    theme: { en: "Sharing", ar: "المشاركة" },
    emoji: "🍎",
    title: { en: "Two Apples, Two Friends", ar: "تفاحتان لصديقين" },
    moral: {
      en: "Sharing doubles our joy.",
      ar: "المشاركة تضاعف فرحتنا.",
    },
    pages: [
      {
        sceneEmoji: "🍎🍎",
        textEn: "At lunch, Lina opens her box and sees two crunchy red apples.",
        textAr: "في وقت الغداء، تفتح لينا صندوقها وترى تفاحتين حمراوين مقرمشتين.",
        focusWords: [
          { word: "lunch", emoji: "🍱", meaningAr: "غداء" },
          { word: "crunchy", emoji: "🍎", meaningAr: "مقرمش" },
        ],
      },
      {
        sceneEmoji: "👧👦",
        textEn: "Her classmate forgot his snack, so Lina happily offers him one apple.",
        textAr: "نسي زميلها وجبته الخفيفة، فتقدّم له لينا تفاحة بكل سرور.",
        focusWords: [
          { word: "snack", emoji: "🥨", meaningAr: "وجبة خفيفة" },
          { word: "offers", emoji: "🎁", meaningAr: "يقدّم" },
        ],
      },
      {
        sceneEmoji: "😄🍎",
        textEn: "'Thank you so much!' he beams, and they laugh together at lunch.",
        textAr: "يبتسم قائلاً: «شكرًا جزيلاً لكِ!» ويضحكان معًا وقت الغداء.",
        focusWords: [
          { word: "thank you", emoji: "🙏", meaningAr: "شكرًا لك" },
          { word: "laugh", emoji: "😄", meaningAr: "يضحك" },
        ],
      },
    ],
    eventOrder: [
      {
        id: "e1",
        emoji: "🍱",
        label: {
          en: "Lina sees two red apples in her lunchbox.",
          ar: "ترى لينا تفاحتين في صندوق الغداء.",
        },
      },
      {
        id: "e2",
        emoji: "🍎",
        label: {
          en: "Lina shares one apple with her classmate.",
          ar: "تشارك لينا تفاحة مع زميلها.",
        },
      },
      {
        id: "e3",
        emoji: "😄",
        label: {
          en: "Both friends smile and enjoy lunch.",
          ar: "يبتسم الصديقان ويستمتعان بالغداء.",
        },
      },
    ],
    comprehension: {
      question: {
        en: "Why did Lina give her classmate an apple?",
        ar: "لماذا أعطت لينا زميلها تفاحة؟",
      },
      options: [
        {
          label: {
            en: "Because he forgot his snack and she wanted to share.",
            ar: "لأنه نسي وجبته وأحبت أن تشاركه.",
          },
          emoji: "💛",
        },
        {
          label: { en: "Because she did not like apples.", ar: "لأنها لا تحب التفاح." },
          emoji: "🙅",
        },
        { label: { en: "Because it was snowing.", ar: "لأن الثلج كان يتساقط." }, emoji: "❄️" },
      ],
      correctIndex: 0,
      praise: {
        en: "Wonderful! Sharing makes school feel warm and kind!",
        ar: "رائع! المشاركة تجعل المدرسة مكانًا دافئًا ولطيفًا!",
      },
    },
  },
  {
    id: "story-responsibility",
    ageGroup: "preteen-10-12",
    theme: { en: "Responsibility", ar: "المسؤولية" },
    emoji: "🌱",
    title: { en: "Watering the Little Seed", ar: "سقي البذرة الصغيرة" },
    moral: {
      en: "Small daily care grows big results over time.",
      ar: "العناية اليومية الصغيرة تُنبت نتائج عظيمة مع الوقت.",
    },
    pages: [
      {
        sceneEmoji: "🪴💧",
        textEn: "Omar plants a sunflower seed in a clay pot and writes a tiny care checklist.",
        textAr: "يزرع عمر بذرة دوّار الشمس في أصيص فخاري ويكتب قائمة عناية يومية.",
        focusWords: [
          { word: "seed", emoji: "🌱", meaningAr: "بذرة" },
          { word: "checklist", emoji: "📋", meaningAr: "قائمة متابعة" },
        ],
      },
      {
        sceneEmoji: "☀️🌿",
        textEn: "Every morning before school, he gives it fresh water and checks the sunlight.",
        textAr: "كل صباح قبل المدرسة، يسقيها بالماء العذب ويتفقد ضوء الشمس.",
        focusWords: [
          { word: "sunlight", emoji: "☀️", meaningAr: "ضوء الشمس" },
          { word: "every morning", emoji: "⏰", meaningAr: "كل صباح" },
        ],
      },
      {
        sceneEmoji: "🌻🏆",
        textEn: "Four weeks later, a tall bright yellow sunflower blooms on his balcony!",
        textAr: "بعد أربعة أسابيع، تتفتح زهرة دوّار شمس صفراء مشرقة على شرفته!",
        focusWords: [
          { word: "blooms", emoji: "🌻", meaningAr: "تتفتّح" },
          { word: "patient", emoji: "⏳", meaningAr: "صبور" },
        ],
      },
    ],
    eventOrder: [
      {
        id: "e1",
        emoji: "🪴",
        label: {
          en: "Omar plants a seed and makes a care list.",
          ar: "يزرع عمر البذرة ويعدّ قائمة عناية.",
        },
      },
      {
        id: "e2",
        emoji: "💧",
        label: {
          en: "He waters it every morning before school.",
          ar: "يسقيها كل صباح قبل المدرسة.",
        },
      },
      {
        id: "e3",
        emoji: "🌻",
        label: { en: "A bright yellow sunflower blooms!", ar: "تتفتح زهرة دوّار الشمس المشرقة!" },
      },
    ],
    comprehension: {
      question: {
        en: "What helped Omar's sunflower grow tall?",
        ar: "ما الذي ساعد زهرة عمر على النمو؟",
      },
      options: [
        {
          label: {
            en: "Daily water, sunlight, and responsible care.",
            ar: "السقي اليومي وضوء الشمس والعناية المسؤولة.",
          },
          emoji: "🌻",
        },
        {
          label: { en: "Putting the pot in a dark cupboard.", ar: "وضع الأصيص في خزانة مظلمة." },
          emoji: "🚪",
        },
        {
          label: { en: "Forgetting about it for a month.", ar: "نسيانها لمدة شهر كامل." },
          emoji: "📅",
        },
      ],
      correctIndex: 0,
      praise: {
        en: "Fantastic! Daily practice grows your English just like a sunflower!",
        ar: "ممتاز! الممارسة اليومية تُنمّي لغتك الإنجليزية مثل الزهرة!",
      },
    },
  },
  {
    id: "story-respect",
    ageGroup: "preteen-10-12",
    theme: { en: "Respect", ar: "الاحترام" },
    emoji: "🤝",
    title: { en: "Listening to Every Voice", ar: "الاستماع إلى كل رأي" },
    moral: {
      en: "Respect means listening carefully even when ideas are different.",
      ar: "الاحترام يعني الاستماع الجيد حتى عندما تختلف الأفكار.",
    },
    pages: [
      {
        sceneEmoji: "🎨🏫",
        textEn: "The science club is designing a colourful poster about saving ocean turtles.",
        textAr: "يصمم نادي العلوم ملصقًا ملوّنًا حول حماية سلاحف المحيط.",
        focusWords: [
          { word: "poster", emoji: "🖼️", meaningAr: "ملصق" },
          { word: "ocean", emoji: "🌊", meaningAr: "محيط" },
        ],
      },
      {
        sceneEmoji: "👂💡",
        textEn:
          "Each student listens quietly while classmates explain their drawing and English title.",
        textAr: "يستمع كل طالب باهتمام بينما يشرح زملاؤه رسومهم وعناوينهم بالإنجليزية.",
        focusWords: [
          { word: "listens", emoji: "👂", meaningAr: "يستمع" },
          { word: "explain", emoji: "💬", meaningAr: "يشرح" },
        ],
      },
      {
        sceneEmoji: "🐢🌟",
        textEn: "By combining everyone's best ideas, they create the finest poster in school!",
        textAr: "وبدمج أفضل أفكار الجميع، يصنعون أجمل ملصق في المدرسة!",
        focusWords: [
          { word: "combining", emoji: "🧩", meaningAr: "دمج وتكامل" },
          { word: "respect", emoji: "🤝", meaningAr: "احترام" },
        ],
      },
    ],
    eventOrder: [
      {
        id: "e1",
        emoji: "🌊",
        label: {
          en: "The club plans a poster about sea turtles.",
          ar: "يخطط النادي لملصق عن السلاحف البحرية.",
        },
      },
      {
        id: "e2",
        emoji: "👂",
        label: {
          en: "Students listen respectfully to each idea.",
          ar: "يستمع الطلاب باحترام لكل فكرة.",
        },
      },
      {
        id: "e3",
        emoji: "🐢",
        label: {
          en: "They combine their ideas into a great poster.",
          ar: "يدمجون أفكارهم لصنع ملصق رائع.",
        },
      },
    ],
    comprehension: {
      question: { en: "How did the club make the finest poster?", ar: "كيف صنع النادي أجمل ملصق؟" },
      options: [
        {
          label: {
            en: "By listening respectfully and combining everyone's ideas.",
            ar: "بالاستماع باحترام ودمج أفكار الجميع.",
          },
          emoji: "🤝",
        },
        {
          label: { en: "By letting only one person talk.", ar: "بالسماح لشخص واحد فقط بالكلام." },
          emoji: "🔇",
        },
        { label: { en: "By skipping the drawing.", ar: "بتجاهل الرسم تمامًا." }, emoji: "❌" },
      ],
      correctIndex: 0,
      praise: {
        en: "Superstar! Respectful listening makes every team stronger!",
        ar: "نجم رائع! الاستماع باحترام يجعل كل فريق أقوى!",
      },
    },
  },
  {
    id: "story-manners",
    ageGroup: "early-4-6",
    theme: { en: "Good Manners", ar: "الأدب والذوق" },
    emoji: "💐",
    title: { en: "The Three Magic Polite Words", ar: "الكلمات المهذّبة الثلاث" },
    moral: {
      en: "'Please', 'Thank you', and 'Excuse me' open smiles everywhere.",
      ar: "كلمات «من فضلك» و«شكرًا» و«عن إذنك» تفتح القلوب في كل مكان.",
    },
    pages: [
      {
        sceneEmoji: "📚🦉",
        textEn: "At the library, Pip asks gently, 'May I borrow this book, please?'",
        textAr: "في المكتبة، يسأل بيب بلطف: «هل يمكنني استعارة هذا الكتاب، من فضلك؟»",
        focusWords: [
          { word: "please", emoji: "🌟", meaningAr: "من فضلك" },
          { word: "library", emoji: "📚", meaningAr: "مكتبة" },
        ],
      },
      {
        sceneEmoji: "😊📖",
        textEn: "The librarian hands over the book and Pip replies, 'Thank you very much!'",
        textAr: "تسلّمه أمينة المكتبة الكتاب فيردّ بيب: «شكرًا جزيلاً لكِ!»",
        focusWords: [
          { word: "thank you", emoji: "💐", meaningAr: "شكرًا لك" },
          { word: "book", emoji: "📖", meaningAr: "كتاب" },
        ],
      },
      {
        sceneEmoji: "🚶‍♂️✨",
        textEn: "When walking past a friend, Pip says politely, 'Excuse me!' Everyone smiles.",
        textAr: "وعندما يمر بجانب صديق، يقول بيب بأدب: «عن إذنك!» فيبتسم الجميع.",
        focusWords: [
          { word: "excuse me", emoji: "🙋", meaningAr: "عن إذنك / المعذرة" },
          { word: "politely", emoji: "💛", meaningAr: "بأدب ولطف" },
        ],
      },
    ],
    eventOrder: [
      {
        id: "e1",
        emoji: "🌟",
        label: { en: "Pip says 'please' to borrow a book.", ar: "يقول بيب please لاستعارة كتاب." },
      },
      {
        id: "e2",
        emoji: "💐",
        label: {
          en: "Pip says 'thank you' to the librarian.",
          ar: "يقول بيب thank you لأمينة المكتبة.",
        },
      },
      {
        id: "e3",
        emoji: "🙋",
        label: {
          en: "Pip says 'excuse me' when walking past.",
          ar: "يقول بيب excuse me عند المرور.",
        },
      },
    ],
    comprehension: {
      question: {
        en: "Which polite phrase do we say when asking for something?",
        ar: "ما الكلمة المهذبة التي نقولها عند طلب شيء ما؟",
      },
      options: [
        { label: { en: "Please!", ar: "Please (من فضلك)!" }, emoji: "🌟" },
        { label: { en: "Hurry up!", ar: "أسرِع!" }, emoji: "💨" },
        { label: { en: "Give me now!", ar: "أعطني الآن!" }, emoji: "📣" },
      ],
      correctIndex: 0,
      praise: {
        en: "Wonderful manners! Polite English sounds so kind and clear!",
        ar: "أدب رائع! الإنجليزية المهذبة جميلة وواضحة جدًا!",
      },
    },
  },
];

export const KIDS_MINI_CONVERSATIONS: readonly KidsMiniConversation[] = [
  {
    id: "conv-hello",
    ageGroup: "early-4-6",
    emoji: "👋",
    title: { en: "Hello & My Name", ar: "التحية والتعريف بالاسم" },
    setting: { en: "In the colourful playground", ar: "في الملعب الملوّن" },
    turns: [
      {
        speaker: "Lina",
        gender: "female",
        emoji: "👧",
        en: "Hello! My name is Lina. What is your name?",
        ar: "مرحبًا! اسمي لينا. ما اسمك؟",
      },
      {
        speaker: "Omar",
        gender: "male",
        emoji: "👦",
        en: "Hi Lina! I am Omar. Nice to meet you!",
        ar: "أهلاً لينا! أنا عمر. سعيد بلقائك!",
      },
      {
        speaker: "Lina",
        gender: "female",
        emoji: "👧",
        en: "Nice to meet you too! Let's play!",
        ar: "وأنا سعيدة بلقائك أيضًا! هيا نلعب!",
      },
    ],
    speakPracticeLine: "Hello! My name is Omar. Nice to meet you!",
    speakPracticeAr: "مرحبًا! اسمي عمر. سعيد بلقائك!",
  },
  {
    id: "conv-colours-toys",
    ageGroup: "early-4-6",
    emoji: "🧸",
    title: { en: "My Favourite Toy", ar: "لعبتي المفضّلة" },
    setting: { en: "At the play corner", ar: "في ركن الألعاب" },
    turns: [
      {
        speaker: "Omar",
        gender: "male",
        emoji: "👦",
        en: "Look! This is my blue toy train.",
        ar: "انظري! هذا قطاري الأزرق اللعبة.",
      },
      {
        speaker: "Lina",
        gender: "female",
        emoji: "👧",
        en: "Wow, it is fast! My favourite toy is this red ball.",
        ar: "رائع، إنه سريع! لعبتي المفضلة هي هذه الكرة الحمراء.",
      },
      {
        speaker: "Omar",
        gender: "male",
        emoji: "👦",
        en: "Can we take turns and play together?",
        ar: "هل يمكننا التناوب واللعب معًا؟",
      },
    ],
    speakPracticeLine: "My favourite toy is this red ball.",
    speakPracticeAr: "لعبتي المفضلة هي هذه الكرة الحمراء.",
  },
  {
    id: "conv-fruit-juice",
    ageGroup: "young-7-9",
    emoji: "🍊",
    title: { en: "Ordering Fruit Juice", ar: "طلب عصير الفاكهة" },
    setting: { en: "At the sunny juice stand", ar: "عند كشك العصائر الطازجة" },
    turns: [
      {
        speaker: "Lina",
        gender: "female",
        emoji: "👧",
        en: "Good morning! May I have an orange juice, please?",
        ar: "صباح الخير! هل يمكنني الحصول على عصير برتقال، من فضلك؟",
      },
      {
        speaker: "Omar",
        gender: "male",
        emoji: "👦",
        en: "Of course! Would you like a small cup or a big cup?",
        ar: "بالتأكيد! هل تريدين كوبًا صغيرًا أم كبيرًا؟",
      },
      {
        speaker: "Lina",
        gender: "female",
        emoji: "👧",
        en: "A small cup, please. Thank you very much!",
        ar: "كوب صغير من فضلك. شكرًا جزيلاً!",
      },
    ],
    speakPracticeLine: "May I have an orange juice, please? Thank you!",
    speakPracticeAr: "هل يمكنني الحصول على عصير برتقال، من فضلك؟ شكرًا لك!",
  },
  {
    id: "conv-family",
    ageGroup: "young-7-9",
    emoji: "👨‍👩‍👧‍👦",
    title: { en: "Talking About My Family", ar: "الحديث عن عائلتي" },
    setting: { en: "Show-and-tell at school", ar: "فقرة العرض والتحدث في المدرسة" },
    turns: [
      {
        speaker: "Omar",
        gender: "male",
        emoji: "👦",
        en: "I have one sister and a little brother. How about you?",
        ar: "لديّ أخت واحدة وأخ صغير. وماذا عنكِ؟",
      },
      {
        speaker: "Lina",
        gender: "female",
        emoji: "👧",
        en: "I live with my parents and my kind grandmother.",
        ar: "أعيش مع والديّ وجدّتي اللطيفة.",
      },
      {
        speaker: "Omar",
        gender: "male",
        emoji: "👦",
        en: "That sounds wonderful! We love reading books together.",
        ar: "هذا رائع! نحن نحب قراءة الكتب معًا.",
      },
    ],
    speakPracticeLine: "I live with my family and we love reading books together.",
    speakPracticeAr: "أعيش مع عائلتي ونحب قراءة الكتب معًا.",
  },
  {
    id: "conv-classroom",
    ageGroup: "preteen-10-12",
    emoji: "📚",
    title: { en: "Helping a Classmate", ar: "مساعدة زميل في الصف" },
    setting: { en: "In the English classroom", ar: "في صف اللغة الإنجليزية" },
    turns: [
      {
        speaker: "Lina",
        gender: "female",
        emoji: "👧",
        en: "Excuse me, Omar. Could you lend me a green pencil?",
        ar: "عن إذنك يا عمر، هل يمكنك إعارتي قلمًا أخضر؟",
      },
      {
        speaker: "Omar",
        gender: "male",
        emoji: "👦",
        en: "Sure! Here you go. Are you drawing the weather map?",
        ar: "بالتأكيد! تفضّلي. هل ترسمين خريطة الطقس؟",
      },
      {
        speaker: "Lina",
        gender: "female",
        emoji: "👧",
        en: "Yes! Thanks a lot. I will give it back right after class.",
        ar: "نعم! شكرًا جزيلاً. سأعيده إليك فور انتهاء الحصة.",
      },
    ],
    speakPracticeLine: "Excuse me, could you lend me a green pencil, please?",
    speakPracticeAr: "عن إذنك، هل يمكنك إعارتي قلمًا أخضر من فضلك؟",
  },
  {
    id: "conv-weekend",
    ageGroup: "preteen-10-12",
    emoji: "🚲",
    title: { en: "Sharing Weekend Plans", ar: "مشاركة خطط عطلة نهاية الأسبوع" },
    setting: { en: "Walking home from school", ar: "في طريق العودة من المدرسة" },
    turns: [
      {
        speaker: "Omar",
        gender: "male",
        emoji: "👦",
        en: "What are you going to do this weekend, Lina?",
        ar: "ماذا ستفعلين في عطلة نهاية الأسبوع يا لينا؟",
      },
      {
        speaker: "Lina",
        gender: "female",
        emoji: "👧",
        en: "I am going to ride my bicycle in the park and visit my cousins.",
        ar: "سأركب دراجتي في الحديقة وأزور أبناء عمي.",
      },
      {
        speaker: "Omar",
        gender: "male",
        emoji: "👦",
        en: "That sounds exciting! Have a wonderful weekend!",
        ar: "هذا يبدو ممتعًا! أتمنى لكِ عطلة رائعة!",
      },
    ],
    speakPracticeLine: "I am going to ride my bicycle in the park this weekend.",
    speakPracticeAr: "سأركب دراجتي في الحديقة في عطلة نهاية الأسبوع.",
  },
];

export const KIDS_WRITING_MISSIONS: readonly KidsWritingMission[] = [
  {
    id: "write-cvc-cat",
    ageGroup: "early-4-6",
    mode: "word-tiles",
    emoji: "🐱",
    title: { en: "Build the Word: CAT", ar: "كوّن الكلمة: CAT (قطة)" },
    prompt: {
      en: "Tap the three letter tiles in order to build 'cat'!",
      ar: "اضغط على الحروف الثلاثة بالترتيب لتكوين كلمة «cat»!",
    },
    targetTokens: ["c", "a", "t"],
    extraTokens: ["s", "o"],
    sampleModel: "cat",
  },
  {
    id: "write-cvc-sun",
    ageGroup: "early-4-6",
    mode: "word-tiles",
    emoji: "☀️",
    title: { en: "Build the Word: SUN", ar: "كوّن الكلمة: SUN (شمس)" },
    prompt: {
      en: "Tap the three letter tiles in order to build 'sun'!",
      ar: "اضغط على الحروف الثلاثة بالترتيب لتكوين كلمة «sun»!",
    },
    targetTokens: ["s", "u", "n"],
    extraTokens: ["p", "e"],
    sampleModel: "sun",
  },
  {
    id: "write-sent-apple",
    ageGroup: "young-7-9",
    mode: "sentence-builder",
    emoji: "🍎",
    title: { en: "Build a Sentence: Red Apples", ar: "كوّن جملة: أحب التفاح الأحمر" },
    prompt: {
      en: "Tap the word cards in order to write a clear English sentence!",
      ar: "اضغط على بطاقات الكلمات بالترتيب لكتابة جملة إنجليزية واضحة!",
    },
    targetTokens: ["I", "like", "sweet", "red", "apples."],
    extraTokens: ["blue"],
    sampleModel: "I like sweet red apples.",
  },
  {
    id: "write-sent-school",
    ageGroup: "young-7-9",
    mode: "sentence-builder",
    emoji: "🎒",
    title: { en: "Build a Sentence: My School Day", ar: "كوّن جملة: يومي الدراسي" },
    prompt: {
      en: "Arrange the words to tell about reading at school!",
      ar: "رتّب الكلمات لتتحدث عن القراءة في المدرسة!",
    },
    targetTokens: ["We", "read", "fun", "stories", "at", "school."],
    extraTokens: ["sleep"],
    sampleModel: "We read fun stories at school.",
  },
  {
    id: "write-para-day",
    ageGroup: "preteen-10-12",
    mode: "mini-paragraph",
    emoji: "📝",
    title: { en: "My Favourite Day", ar: "يومي المفضّل" },
    prompt: {
      en: "Write 3–4 friendly sentences (at least 18 words) about your favourite day of the week and what you enjoy doing.",
      ar: "اكتب ٣ إلى ٤ جمل لطيفة (١٨ كلمة على الأقل) عن يومك المفضّل في الأسبوع وما تستمتع بفعله فيه.",
    },
    minWords: 18,
    starterPrompt: "My favourite day is Saturday because...",
    helpfulWords: ["morning", "family", "play", "read", "happy", "together"],
    sampleModel:
      "My favourite day is Saturday because I wake up happily and eat breakfast with my family. In the afternoon, I ride my bike in the park and read an exciting English story.",
  },
  {
    id: "write-para-animal",
    ageGroup: "preteen-10-12",
    mode: "mini-paragraph",
    emoji: "🐬",
    title: { en: "Describe an Amazing Animal", ar: "صِف حيوانًا رائعًا" },
    prompt: {
      en: "Write a short paragraph (at least 18 words) describing your favourite animal: what it looks like, where it lives, and why you like it.",
      ar: "اكتب فقرة قصيرة (١٨ كلمة على الأقل) تصف فيها حيوانك المفضّل: شكله، أين يعيش، ولماذا تحبه.",
    },
    minWords: 18,
    starterPrompt: "My favourite animal is the dolphin because...",
    helpfulWords: ["clever", "ocean", "fast", "friendly", "lives", "jumps"],
    sampleModel:
      "My favourite animal is the dolphin because it is clever and very friendly. Dolphins live in the blue ocean, swim fast, and love jumping high above the waves together.",
  },
];

export const KIDS_FRIENDLY_ASSESSMENTS: readonly KidsFriendlyAssessment[] = [
  {
    id: "quiz-early-4-6",
    ageGroup: "early-4-6",
    emoji: "🐣",
    title: {
      en: "Little Explorer Star Check (Ages 4–6)",
      ar: "تحدّي النجوم للمستكشف الصغير (٤–٦ سنوات)",
    },
    subtitle: {
      en: "No timer, no stress — just listen, tap colourful pictures, and collect shiny gold stars!",
      ar: "بلا عدّاد وقت وبلا توتر — استمع واضغط على الصور الملوّنة واجمع النجوم الذهبية!",
    },
    questions: [
      {
        id: "q-e1",
        skill: "phonics",
        emoji: "🍎",
        audioText: "Apple starts with the sound a, a, apple.",
        prompt: {
          en: "Which letter makes the first sound in 'apple'?",
          ar: "أي حرف يصنع الصوت الأول في كلمة «apple»؟",
        },
        options: [
          { label: "A a", emoji: "🍎" },
          { label: "M m", emoji: "🌙" },
          { label: "T t", emoji: "🐯" },
        ],
        correctIndex: 0,
        praise: {
          en: "Great job! A makes /æ/ for apple!",
          ar: "أحسنت! حرف A يصنع صوت /æ/ في apple!",
        },
        gentleHint: {
          en: "Let's listen again! Say a-a-apple!",
          ar: "هيا نستمع مجددًا! قل أَ-أَ-apple!",
        },
      },
      {
        id: "q-e2",
        skill: "vocab",
        emoji: "☀️",
        audioText: "Yellow! The sun is yellow.",
        prompt: {
          en: "Tap the picture that is YELLOW!",
          ar: "اضغط على الصورة التي لونها أصفر (YELLOW)!",
        },
        options: [
          { label: "Blue Whale", emoji: "🐳" },
          { label: "Yellow Sun", emoji: "☀️" },
          { label: "Green Frog", emoji: "🐸" },
        ],
        correctIndex: 1,
        praise: { en: "Yay! The bright sun is yellow!", ar: "رائع! الشمس المشرقة صفراء!" },
        gentleHint: {
          en: "Look for the bright golden sunshine!",
          ar: "ابحث عن الشمس الذهبية المشرقة!",
        },
      },
      {
        id: "q-e3",
        skill: "vocab",
        emoji: "🐶",
        audioText: "Dog! The friendly dog says woof.",
        prompt: { en: "Which animal is a DOG?", ar: "أي حيوان هو الكلب (DOG)؟" },
        options: [
          { label: "Dog", emoji: "🐶" },
          { label: "Fish", emoji: "🐟" },
          { label: "Bird", emoji: "🐦" },
        ],
        correctIndex: 0,
        praise: { en: "Super! That is a friendly dog!", ar: "ممتاز! هذا كلب لطيف!" },
        gentleHint: {
          en: "Try again! Which friend has floppy ears?",
          ar: "جرّب مرة أخرى! أي صديق له أذنان طويلتان؟",
        },
      },
      {
        id: "q-e4",
        skill: "grammar",
        emoji: "🐱",
        audioText: "This is a cat.",
        prompt: {
          en: "Look at ONE cat! Choose the matching sentence:",
          ar: "انظر إلى قطة واحدة! اختر الجملة المطابقة:",
        },
        options: [
          { label: "This is a cat.", emoji: "🐱" },
          { label: "These are three cats.", emoji: "🐱🐱🐱" },
          { label: "I am a car.", emoji: "🚗" },
        ],
        correctIndex: 0,
        praise: {
          en: "Excellent! We say 'This is a cat' for one cat!",
          ar: "ممتاز! نقول This is a cat لقطة واحدة!",
        },
        gentleHint: {
          en: "Count carefully — there is just ONE cat!",
          ar: "عدّ بهدوء — توجد قطة واحدة فقط!",
        },
      },
      {
        id: "q-e5",
        skill: "reading",
        emoji: "🎩",
        audioText: "h - a - t. Hat!",
        prompt: {
          en: "Blend the sounds /h/ + /æ/ + /t/! What word is it?",
          ar: "ادمج الأصوات /h/ + /æ/ + /t/! ما الكلمة؟",
        },
        options: [
          { label: "bus", emoji: "🚌" },
          { label: "cup", emoji: "☕" },
          { label: "hat", emoji: "🎩" },
        ],
        correctIndex: 2,
        praise: {
          en: "Super Star Reader! /h/ + /æ/ + /t/ = hat!",
          ar: "قارئ نجم! /h/ + /æ/ + /t/ = hat!",
        },
        gentleHint: {
          en: "Listen to the first sound /h/ — h-a-t!",
          ar: "استمع للصوت الأول /h/ — h-a-t!",
        },
      },
    ],
  },
  {
    id: "quiz-young-7-9",
    ageGroup: "young-7-9",
    emoji: "🦊",
    title: {
      en: "Young Reader Star Check (Ages 7–9)",
      ar: "تحدّي النجوم للقارئ الصغير (٧–٩ سنوات)",
    },
    subtitle: {
      en: "Practise digraphs, everyday vocabulary, visual grammar, and mini reading with instant encouragement!",
      ar: "تدرّب على الثنائيات الصوتية والمفردات والقواعد المرئية والقراءة مع تشجيع فوري!",
    },
    questions: [
      {
        id: "q-y1",
        skill: "phonics",
        emoji: "🚢",
        audioText: "Ship! Sh, sh, ship.",
        prompt: {
          en: "Which digraph starts the word 'ship'?",
          ar: "أي ثنائي حرفي تبدأ به كلمة «ship» (سفينة)؟",
        },
        options: [
          { label: "sh", emoji: "🚢" },
          { label: "ch", emoji: "🧀" },
          { label: "th", emoji: "👍" },
        ],
        correctIndex: 0,
        praise: {
          en: "Brilliant! SH makes the quiet /ʃ/ sound in ship!",
          ar: "رائع! الحرفان SH يصنعان صوت /ʃ/ في ship!",
        },
        gentleHint: {
          en: "Listen to the gentle 'shhh' sound at the start!",
          ar: "استمع لصوت «ش» الهادئ في البداية!",
        },
      },
      {
        id: "q-y2",
        skill: "vocab",
        emoji: "🌧️",
        audioText: "Take an umbrella when it is rainy.",
        prompt: {
          en: "What weather do we need an umbrella for?",
          ar: "في أي طقس نحتاج إلى مظلة (umbrella)؟",
        },
        options: [
          { label: "Rainy", emoji: "🌧️" },
          { label: "Sleepy", emoji: "😴" },
          { label: "Quiet", emoji: "🤫" },
        ],
        correctIndex: 0,
        praise: {
          en: "Awesome! An umbrella keeps us dry on rainy days!",
          ar: "ممتاز! المظلة تحمينا في الأيام الماطرة!",
        },
        gentleHint: {
          en: "Think about drops falling from grey clouds!",
          ar: "فكّر في قطرات الماء التي تنزل من الغيوم!",
        },
      },
      {
        id: "q-y3",
        skill: "grammar",
        emoji: "🍊",
        audioText: "I eat an orange every morning.",
        prompt: {
          en: "Choose the right word before 'orange':",
          ar: "اختر الأداة الصحيحة قبل كلمة «orange»:",
        },
        options: [
          { label: "a orange", emoji: "📝" },
          { label: "an orange", emoji: "🍊" },
          { label: "are orange", emoji: "✨" },
        ],
        correctIndex: 1,
        praise: {
          en: "Fantastic! We use 'an' before vowel sounds like O in orange!",
          ar: "رائع! نستخدم an قبل صوت الحرف المتحرك مثل orange!",
        },
        gentleHint: {
          en: "Orange starts with the vowel sound O — try 'an'!",
          ar: "كلمة orange تبدأ بحرف متحرك O — جرّب an!",
        },
      },
      {
        id: "q-y4",
        skill: "grammar",
        emoji: "📚",
        audioText: "There are four books on the desk.",
        prompt: {
          en: "Look! Four books on the desk — pick the best sentence:",
          ar: "انظر! أربعة كتب على المكتب — اختر الجملة الأنسب:",
        },
        options: [
          { label: "There is four books.", emoji: "1️⃣" },
          { label: "There are four books.", emoji: "📚" },
          { label: "She are four books.", emoji: "👧" },
        ],
        correctIndex: 1,
        praise: {
          en: "Super grammar! We use 'There are' for two or more things!",
          ar: "قواعد ممتازة! نستخدم There are للجمع!",
        },
        gentleHint: {
          en: "Four books is more than one — look for 'There are'!",
          ar: "أربعة كتب أكثر من واحد — ابحث عن There are!",
        },
      },
      {
        id: "q-y5",
        skill: "reading",
        emoji: "🐸",
        audioText: "The green frog jumps onto a big log by the pond.",
        prompt: {
          en: "Read: 'The green frog jumps onto a big log.' Where does the frog jump?",
          ar: "اقرأ الجملة: أين يقفز الضفدع الأخضر؟",
        },
        options: [
          { label: "Onto a big log", emoji: "🪵" },
          { label: "Into a red car", emoji: "🚗" },
          { label: "Onto a tall bed", emoji: "🛏️" },
        ],
        correctIndex: 0,
        praise: {
          en: "Wonderful comprehension! You read every word clearly!",
          ar: "فهم قرائي رائع! قرأت كل كلمة بوضوح!",
        },
        gentleHint: {
          en: "Read the last three words again: 'onto a big log'!",
          ar: "اقرأ الكلمات الأخيرة مجددًا: onto a big log!",
        },
      },
    ],
  },
  {
    id: "quiz-preteen-10-12",
    ageGroup: "preteen-10-12",
    emoji: "🚀",
    title: {
      en: "Pre-Teen Champion Star Check (Ages 10–12)",
      ar: "تحدّي النجوم للأبطال (١٠–١٢ سنة)",
    },
    subtitle: {
      en: "Check your pronunciation awareness, grammar in context, vocabulary, and story comprehension at your own pace!",
      ar: "اختبر وعيك الصوتي وقواعدك في السياق ومفرداتك وفهمك القصصي بالوتيرة التي تناسبك!",
    },
    questions: [
      {
        id: "q-p1",
        skill: "phonics",
        emoji: "🐘",
        audioText: "Elephant and phone both use p-h for the f sound.",
        prompt: {
          en: "Which word contains the digraph 'ph' pronounced /f/?",
          ar: "أي كلمة تحتوي على الثنائي «ph» ويُنطق /f/؟",
        },
        options: [
          { label: "dolphin", emoji: "🐬" },
          { label: "planet", emoji: "🪐" },
          { label: "happy", emoji: "😊" },
        ],
        correctIndex: 0,
        praise: {
          en: "Spot on! 'Dolphin' uses 'ph' for the /f/ sound!",
          ar: "إجابة دقيقة! كلمة dolphin تستخدم ph لصوت /f/!",
        },
        gentleHint: {
          en: "Look closely for the letters p and h sitting right next to each other!",
          ar: "ابحث عن الحرفين p وh متجاورين داخل الكلمة!",
        },
      },
      {
        id: "q-p2",
        skill: "grammar",
        emoji: "⚽",
        audioText: "Yesterday we played football in the park.",
        prompt: {
          en: "Complete the Simple Past sentence: 'Yesterday we ___ football in the park.'",
          ar: "أكمل الجملة في الماضي البسيط (Yesterday):",
        },
        options: [
          { label: "play", emoji: "⏰" },
          { label: "played", emoji: "⚽" },
          { label: "playing", emoji: "🏃" },
        ],
        correctIndex: 1,
        praise: {
          en: "Excellent! 'Yesterday' signals Simple Past → played!",
          ar: "ممتاز! كلمة Yesterday تدل على الماضي البسيط → played!",
        },
        gentleHint: {
          en: "'Yesterday' happened in the past — add -ed to play!",
          ar: "كلمة Yesterday تعني أمس — نضيف ed للفعل play!",
        },
      },
      {
        id: "q-p3",
        skill: "grammar",
        emoji: "☔",
        audioText: "I brought my umbrella because it was raining.",
        prompt: {
          en: "Choose the best conjunction: 'I brought my umbrella ___ it was raining.'",
          ar: "اختر أداة الربط الأنسب للسبب:",
        },
        options: [
          { label: "because", emoji: "☔" },
          { label: "or", emoji: "🔀" },
          { label: "but", emoji: "↔️" },
        ],
        correctIndex: 0,
        praise: {
          en: "Great thinking! 'Because' clearly connects a reason!",
          ar: "تفكير رائع! نستخدم because لبيان السبب!",
        },
        gentleHint: {
          en: "Rain is the REASON for bringing an umbrella!",
          ar: "المطر هو السبب وراء إحضار المظلة!",
        },
      },
      {
        id: "q-p4",
        skill: "vocab",
        emoji: "🧭",
        audioText: "A curious explorer loves asking questions and discovering new facts.",
        prompt: {
          en: "What does the adjective 'curious' mean?",
          ar: "ماذا تعني الصفة «curious» في السياق؟",
        },
        options: [
          { label: "Eager to learn and discover", emoji: "🔍" },
          { label: "Very sleepy at night", emoji: "🌙" },
          { label: "Afraid of books", emoji: "📕" },
        ],
        correctIndex: 0,
        praise: {
          en: "Super vocabulary! Being curious helps you learn fast!",
          ar: "مفردات رائعة! الفضول الإيجابي يساعدك على التعلّم السريع!",
        },
        gentleHint: {
          en: "Think about explorers who love asking 'Why?' and 'How?'!",
          ar: "فكّر في المستكشفين الذين يحبون السؤال والاكتشاف!",
        },
      },
      {
        id: "q-p5",
        skill: "reading",
        emoji: "🌻",
        audioText:
          "Omar watered his sunflower every morning, and after four weeks a bright yellow flower bloomed.",
        prompt: {
          en: "What is the main lesson of Omar's sunflower story?",
          ar: "ما الفكرة الأساسية في قصة زهرة دوّار الشمس؟",
        },
        options: [
          { label: "Consistent daily care brings great results.", emoji: "🌻" },
          { label: "Flowers grow in one minute.", emoji: "⏱️" },
          { label: "Plants do not need water.", emoji: "🏜️" },
        ],
        correctIndex: 0,
        praise: {
          en: "Champion Reader! You caught the exact main idea!",
          ar: "بطل القراءة! التقطتَ الفكرة الرئيسية بدقة!",
        },
        gentleHint: {
          en: "Notice how Omar cared for the seed every single morning!",
          ar: "لاحظ كيف اعتنى عمر بالبذرة كل صباح!",
        },
      },
    ],
  },
];

export const PARENT_HOME_ACTIVITIES: readonly ParentHomeActivity[] = [
  {
    id: "home-letters",
    focusArea: "letters",
    emoji: "🧲",
    title: { en: "Kitchen Sound Hunt (5 mins)", ar: "لعبة البحث عن الصوت في البيت (٥ دقائق)" },
    minutes: 5,
    steps: {
      en: "Say a letter sound (like /b/ or /s/, not the letter name) and ask your child to point to two safe objects at home that start with that sound (ball, spoon, cup).",
      ar: "انطق صوت الحرف (مثل /b/ أو /s/ وليس اسمه) واطلب من طفلك الإشارة إلى شيئين في البيت يبدآن بهذا الصوت.",
    },
  },
  {
    id: "home-blending",
    focusArea: "blending",
    emoji: "🤖",
    title: { en: "Robot Talk Blending Game (5 mins)", ar: "لعبة الروبوت لدمج الأصوات (٥ دقائق)" },
    minutes: 5,
    steps: {
      en: "Speak like a friendly robot: '/k/ ... /æ/ ... /t/' and invite your child to guess the whole word ('cat!'). Take turns so your child becomes the robot too!",
      ar: "تحدّث بصوت روبوت لطيف: «/k/ .. /æ/ .. /t/» واجعل طفلك يخمن الكلمة الكاملة (cat)، ثم تبادلا الأدوار!",
    },
  },
  {
    id: "home-blends",
    focusArea: "blends",
    emoji: "🃏",
    title: { en: "Paper Cup Word Family Swap (7 mins)", ar: "لعبة تبديل الحرف الأول (٧ دقائق)" },
    minutes: 7,
    steps: {
      en: "Write '-at' or '-op' on a sticky note and slide different starting letters or blends in front (c-at, h-at, fl-at, st-op) to show how reading one pattern unlocks ten words.",
      ar: "اكتب المقطع -at أو -op على ورقة وبدّل الحرف الأول أمامه (cat, hat, flat, stop) ليرى طفلك كيف يقرأ عدة كلمات بنمط واحد.",
    },
  },
  {
    id: "home-sentences",
    focusArea: "sentences",
    emoji: "📖",
    title: { en: "Echo Bedtime Story Reading (10 mins)", ar: "قراءة الصدى قبل النوم (١٠ دقائق)" },
    minutes: 10,
    steps: {
      en: "Read one short sentence from the Stories tab aloud, then let your child echo it while pointing under each word. Ask one fun 'Why?' or 'What happened next?' question.",
      ar: "اقرأ جملة قصيرة من تبويب القصص بصوت واضح، ثم يردّدها طفلك وهو يشير بإصبعه تحت الكلمات، واسأله سؤالاً ممتعًا عمّا حدث.",
    },
  },
  {
    id: "home-communication",
    focusArea: "communication",
    emoji: "🎭",
    title: { en: "2-Minute Puppet Mini-Roleplay (5 mins)", ar: "تمثيل حوار قصير بالدمى (٥ دقائق)" },
    minutes: 5,
    steps: {
      en: "Act out one of the Mini Conversations (like ordering juice or greeting a friend) using toy animals or hand puppets. Praise effort warmly without interrupting mid-sentence.",
      ar: "مثّل أحد الحوارات القصيرة (مثل طلب العصير أو تحية صديق) باستخدام لعبة محبّبة، وشجّع المحاولة بحرارة دون مقاطعة.",
    },
  },
];

export const KIDS_SAFETY_PILLARS: readonly {
  emoji: string;
  title: Bilingual;
  detail: Bilingual;
}[] = [
  {
    emoji: "🛡️",
    title: {
      en: "Zero Ads & Zero External Distractions",
      ar: "بلا إعلانات وبلا روابط خارجية مشتّتة",
    },
    detail: {
      en: "Every lesson, video, story, and game runs self-contained inside ELEA with no third-party ad trackers or random video feeds.",
      ar: "تعمل جميع الدروس والفيديوهات والقصص والألعاب داخل المنصة بأمان تام دون إعلانات أو فيديوهات عشوائية.",
    },
  },
  {
    emoji: "💛",
    title: { en: "Supportive-Only Positive Pedagogy", ar: "تغذية راجعة إيجابية مشجّعة فقط" },
    detail: {
      en: "No countdown timers, no harsh red fail screens, and no public leaderboards — children learn at their own comfort pace.",
      ar: "لا مؤقتات توتر، ولا رسائل إحباط، ولا قوائم تنافس عامة — يتعلّم الطفل بوتيرته المريحة.",
    },
  },
  {
    emoji: "🔒",
    title: { en: "Privacy-First & Adult-Gated Controls", ar: "خصوصية كاملة وبوابة خاصة بالوالدين" },
    detail: {
      en: "Zero personal child data collected or shared; progress stays locally on this device and Parent Controls sit behind an adult math gate.",
      ar: "لا يُجمع أو يُشارك أي بيانات شخصية للطفل؛ يُحفظ التقدّم محليًا على الجهاز وبوابة الوالدين محمية بتحقق حسابي.",
    },
  },
];
