import type { Bilingual } from "@/content/lesson-types";
import type { KidsAgeGroupId } from "./alphabet-phonics-data";

export type KidsVideoCategoryId =
  | "alphabet"
  | "phonics"
  | "vocabulary"
  | "numbers"
  | "colours-shapes"
  | "animals"
  | "daily-routines"
  | "conversations"
  | "grammar"
  | "storytelling"
  | "pronunciation"
  | "listening";

export type VideoStageKind =
  "intro" | "presentation" | "demonstration" | "repetition" | "practice" | "review";

export interface VideoSceneStage {
  stage: VideoStageKind;
  stageTitle: Bilingual;
  character: "pip" | "lina" | "omar" | "mimi";
  sceneEmojis: string[];
  backdropClass: string;
  englishCaption: string;
  arabicHelper: string;
  speechText: string;
  /** Optional interactive check during Stage 5 (Practice). */
  practiceCheck?: {
    question: string;
    options: string[];
    correctIndex: number;
  };
}

export interface KidsAnimatedVideo {
  id: string;
  category: KidsVideoCategoryId;
  categoryLabel: Bilingual;
  ageGroup: KidsAgeGroupId;
  durationLabel: string; // e.g. "2 min"
  emoji: string;
  title: Bilingual;
  objective: Bilingual;
  stages: [
    VideoSceneStage,
    VideoSceneStage,
    VideoSceneStage,
    VideoSceneStage,
    VideoSceneStage,
    VideoSceneStage,
  ];
}

export const KIDS_MASCOTS = {
  pip: { name: "Pip the Owl", emoji: "🦉", color: "bg-amber-400/25 border-amber-500/50" },
  lina: { name: "Lina", emoji: "👧", color: "bg-rose-400/25 border-rose-500/50" },
  omar: { name: "Omar", emoji: "👦", color: "bg-sky-400/25 border-sky-500/50" },
  mimi: { name: "Mimi the Cat", emoji: "🐱", color: "bg-emerald-400/25 border-emerald-500/50" },
} as const;

function make6StageVideo(cfg: {
  id: string;
  category: KidsVideoCategoryId;
  categoryLabel: Bilingual;
  ageGroup: KidsAgeGroupId;
  durationLabel: string;
  emoji: string;
  title: Bilingual;
  objective: Bilingual;
  intro: Omit<VideoSceneStage, "stage" | "stageTitle">;
  presentation: Omit<VideoSceneStage, "stage" | "stageTitle">;
  demonstration: Omit<VideoSceneStage, "stage" | "stageTitle">;
  repetition: Omit<VideoSceneStage, "stage" | "stageTitle">;
  practice: Omit<VideoSceneStage, "stage" | "stageTitle">;
  review: Omit<VideoSceneStage, "stage" | "stageTitle">;
}): KidsAnimatedVideo {
  return {
    id: cfg.id,
    category: cfg.category,
    categoryLabel: cfg.categoryLabel,
    ageGroup: cfg.ageGroup,
    durationLabel: cfg.durationLabel,
    emoji: cfg.emoji,
    title: cfg.title,
    objective: cfg.objective,
    stages: [
      { stage: "intro", stageTitle: { en: "1. Introduction", ar: "١. المقدّمة" }, ...cfg.intro },
      {
        stage: "presentation",
        stageTitle: { en: "2. Presentation", ar: "٢. العرض" },
        ...cfg.presentation,
      },
      {
        stage: "demonstration",
        stageTitle: { en: "3. Demonstration", ar: "٣. التمثيل في سياق" },
        ...cfg.demonstration,
      },
      {
        stage: "repetition",
        stageTitle: { en: "4. Listen & Repeat", ar: "٤. استمع وردّد" },
        ...cfg.repetition,
      },
      {
        stage: "practice",
        stageTitle: { en: "5. Interactive Practice", ar: "٥. التطبيق التفاعلي" },
        ...cfg.practice,
      },
      { stage: "review", stageTitle: { en: "6. Review", ar: "٦. المراجعة" }, ...cfg.review },
    ],
  };
}

/** 12 Original Animated ESL Video Lessons following the strict 6-Part Pedagogical Structure. */
export const KIDS_ANIMATED_VIDEOS: KidsAnimatedVideo[] = [
  make6StageVideo({
    id: "vid-alphabet-sounds",
    category: "alphabet",
    categoryLabel: { en: "Alphabet & Letter Sounds", ar: "الحروف وأصواتها" },
    ageGroup: "early-4-6",
    durationLabel: "2 min",
    emoji: "🔤",
    title: {
      en: "Pip's Magic Letter Sounds: A, B, C!",
      ar: "أصوات الحروف السحرية مع Pip: A, B, C",
    },
    objective: {
      en: "Hear the difference between letter names and real letter sounds.",
      ar: "التمييز بين اسم الحرف وصوته الحقيقي.",
    },
    intro: {
      character: "pip",
      sceneEmojis: ["🦉", "✨", "🔤"],
      backdropClass: "from-amber-200/70 via-sky-100/70 to-emerald-100/70",
      englishCaption:
        "Hello friends! I am Pip the Owl. Today we discover three magic letter sounds!",
      arabicHelper: "مرحبًا يا أصدقاء! أنا البومة Pip. اليوم نكتشف ثلاثة أصوات سحرية للحروف!",
      speechText: "Hello friends! I am Pip the Owl. Today we discover three magic letter sounds!",
    },
    presentation: {
      character: "pip",
      sceneEmojis: ["🍎", "⚽", "🐱"],
      backdropClass: "from-rose-100/80 via-amber-100/70 to-sky-100/70",
      englishCaption: "A says /æ/ like apple! B says /b/ like ball! C says /k/ like cat!",
      arabicHelper: "حرف A صوته /æ/ مثل apple! وحرف B صوته /b/ مثل ball! وحرف C صوته /k/ مثل cat!",
      speechText: "Aah, apple! Buh, ball! Kuh, cat!",
    },
    demonstration: {
      character: "lina",
      sceneEmojis: ["👧", "🍎", "🐱", "⚽"],
      backdropClass: "from-emerald-100/80 via-sky-100/70 to-amber-100/70",
      englishCaption: "Look! My cat plays with a ball near a red apple!",
      arabicHelper: "انظر! قطتي تلعب بالكرة بجانب تفاحة حمراء!",
      speechText: "Look! My cat plays with a ball near a red apple!",
    },
    repetition: {
      character: "pip",
      sceneEmojis: ["🎤", "🍎", "⚽", "🐱"],
      backdropClass: "from-violet-100/80 via-sky-100/70 to-amber-100/70",
      englishCaption: "Now say it with me slowly: aah... apple! buh... ball! kuh... cat!",
      arabicHelper: "ردّد معي ببطء: apple! ball! cat!",
      speechText: "Now say it with me: aah, apple! buh, ball! kuh, cat!",
    },
    practice: {
      character: "omar",
      sceneEmojis: ["👦", "⚽", "❓"],
      backdropClass: "from-sky-100/80 via-emerald-100/70 to-amber-100/70",
      englishCaption: "Your turn! Which sound starts the word 'ball'?",
      arabicHelper: "دورك الآن! ما الصوت الذي تبدأ به كلمة ball؟",
      speechText: "Your turn! Which sound starts the word ball?",
      practiceCheck: {
        question: "Which sound starts 'ball'?",
        options: ["/æ/ (apple)", "/b/ (ball)", "/k/ (cat)"],
        correctIndex: 1,
      },
    },
    review: {
      character: "pip",
      sceneEmojis: ["⭐", "🍎", "⚽", "🐱"],
      backdropClass: "from-amber-200/80 via-emerald-100/70 to-sky-100/70",
      englishCaption: "Super job! Remember: A → /æ/ apple, B → /b/ ball, C → /k/ cat!",
      arabicHelper: "عمل رائع! تذكّر: A ← apple، B ← ball، C ← cat!",
      speechText: "Super job! You learned the sounds of A, B, and C!",
    },
  }),
  make6StageVideo({
    id: "vid-phonics-blending",
    category: "phonics",
    categoryLabel: { en: "Phonics & Blending", ar: "الصوتيات والدمج" },
    ageGroup: "early-4-6",
    durationLabel: "2.5 min",
    emoji: "🧩",
    title: {
      en: "Slide & Blend: Reading Your First Words!",
      ar: "اسحب وادمج: اقرأ كلماتك الأولى!",
    },
    objective: {
      en: "Blend three sounds together to read CVC words like cat, sun, and dog.",
      ar: "دمج ثلاثة أصوات لقراءة كلمات ثلاثية مثل cat وsun وdog.",
    },
    intro: {
      character: "omar",
      sceneEmojis: ["👦", "🧩", "🦉"],
      backdropClass: "from-sky-100/80 via-violet-100/70 to-amber-100/70",
      englishCaption: "Hi! Omar here! Watch how three tiny sounds slide together to make a word!",
      arabicHelper: "مرحبًا! أنا عمر! شاهد كيف تنزلق ثلاثة أصوات صغيرة معًا لتصنع كلمة!",
      speechText: "Hi! Watch how three tiny sounds slide together to make a real word!",
    },
    presentation: {
      character: "pip",
      sceneEmojis: ["🐱", "☀️", "🐶"],
      backdropClass: "from-amber-100/80 via-sky-100/70 to-emerald-100/70",
      englishCaption: "/k/ + /æ/ + /t/ slides into CAT! /s/ + /ʌ/ + /n/ slides into SUN!",
      arabicHelper: "أصوات c-a-t تندمج لتصبح cat! وأصوات s-u-n تصبح sun!",
      speechText: "Kuh, aah, tuh... cat! Sss, uh, nnn... sun!",
    },
    demonstration: {
      character: "mimi",
      sceneEmojis: ["🐱", "☀️", "🌳"],
      backdropClass: "from-emerald-100/80 via-amber-100/70 to-sky-100/70",
      englishCaption: "The cat sits in the warm sun!",
      arabicHelper: "القطة تجلس في الشمس الدافئة!",
      speechText: "The cat sits in the warm sun!",
    },
    repetition: {
      character: "pip",
      sceneEmojis: ["🎤", "🐱", "☀️"],
      backdropClass: "from-violet-100/80 via-amber-100/70 to-sky-100/70",
      englishCaption: "Blend with Pip! Kuh... aah... tuh... CAT!",
      arabicHelper: "ادمج مع Pip: c-a-t ... cat!",
      speechText: "Blend with me! Kuh, aah, tuh, cat! Sss, uh, nnn, sun!",
    },
    practice: {
      character: "lina",
      sceneEmojis: ["👧", "☀️", "❓"],
      backdropClass: "from-sky-100/80 via-emerald-100/70 to-amber-100/70",
      englishCaption: "What word do /s/ + /ʌ/ + /n/ make?",
      arabicHelper: "ما الكلمة التي تكوّنها الأصوات s + u + n؟",
      speechText: "What word do sss, uh, nnn make?",
      practiceCheck: {
        question: "/s/ + /ʌ/ + /n/ = ?",
        options: ["cat", "sun", "pen"],
        correctIndex: 1,
      },
    },
    review: {
      character: "pip",
      sceneEmojis: ["🌟", "🐱", "☀️", "🐶"],
      backdropClass: "from-amber-200/80 via-emerald-100/70 to-sky-100/70",
      englishCaption: "You are a Phonics Blender! Sound out every box, then slide them together!",
      arabicHelper: "أنت بطل دمج الأصوات! انطق كل صوت ثم ادمجها معًا!",
      speechText: "You are a Phonics Blender! Well done!",
    },
  }),
  make6StageVideo({
    id: "vid-colours-shapes",
    category: "colours-shapes",
    categoryLabel: { en: "Colours & Shapes", ar: "الألوان والأشكال" },
    ageGroup: "early-4-6",
    durationLabel: "2 min",
    emoji: "🎨",
    title: { en: "Lina's Rainbow Painting Party!", ar: "حفلة التلوين والأشكال مع لينا!" },
    objective: {
      en: "Name primary colours and basic shapes in full simple sentences.",
      ar: "تسمية الألوان الأساسية والأشكال في جمل بسيطة.",
    },
    intro: {
      character: "lina",
      sceneEmojis: ["👧", "🎨", "🌈"],
      backdropClass: "from-rose-100/80 via-amber-100/70 to-sky-100/70",
      englishCaption: "Welcome to my art table! Let's paint colourful shapes together!",
      arabicHelper: "أهلًا بكم على طاولة الرسم! هيا نلوّن الأشكال معًا!",
      speechText: "Welcome to my art table! Let's paint colourful shapes together!",
    },
    presentation: {
      character: "lina",
      sceneEmojis: ["🔴", "🟦", "🔺", "⭐"],
      backdropClass: "from-amber-100/80 via-rose-100/70 to-sky-100/70",
      englishCaption: "A red circle! A blue square! A green triangle! A yellow star!",
      arabicHelper: "دائرة حمراء! مربع أزرق! مثلث أخضر! نجمة صفراء!",
      speechText: "A red circle! A blue square! A green triangle! A yellow star!",
    },
    demonstration: {
      character: "omar",
      sceneEmojis: ["👦", "🏠", "☀️", "⭐"],
      backdropClass: "from-sky-100/80 via-emerald-100/70 to-amber-100/70",
      englishCaption:
        "I drew a blue square house with a red triangle roof and a yellow circle sun!",
      arabicHelper: "رسمتُ بيتًا مربعًا أزرق بسقف مثلث أحمر وشمس دائرية صفراء!",
      speechText: "I drew a blue square house with a red triangle roof!",
    },
    repetition: {
      character: "pip",
      sceneEmojis: ["🎤", "🔴", "🟦", "⭐"],
      backdropClass: "from-violet-100/80 via-rose-100/70 to-amber-100/70",
      englishCaption: "Repeat after Lina: It is a red circle. It is a yellow star!",
      arabicHelper: "ردّد خلف لينا: It is a red circle. It is a yellow star!",
      speechText: "Repeat after me: It is a red circle! It is a yellow star!",
    },
    practice: {
      character: "lina",
      sceneEmojis: ["👧", "⭐", "❓"],
      backdropClass: "from-amber-100/80 via-sky-100/70 to-emerald-100/70",
      englishCaption: "Which shape has three straight sides?",
      arabicHelper: "أي شكل له ثلاثة أضلاع مستقيمة؟",
      speechText: "Which shape has three straight sides?",
      practiceCheck: {
        question: "Which shape has 3 sides?",
        options: ["circle", "triangle", "square"],
        correctIndex: 1,
      },
    },
    review: {
      character: "pip",
      sceneEmojis: ["🎨", "🌈", "⭐"],
      backdropClass: "from-rose-100/80 via-amber-100/70 to-emerald-100/70",
      englishCaption: "Colourful work! Look around your room and name 3 shapes in English!",
      arabicHelper: "عمل رائع! انظر حول غرفتك وسمِّ ٣ أشكال بالإنجليزية!",
      speechText: "Colourful work! You know your colours and shapes!",
    },
  }),
  make6StageVideo({
    id: "vid-numbers-counting",
    category: "numbers",
    categoryLabel: { en: "Numbers & Counting", ar: "الأرقام والعدّ" },
    ageGroup: "early-4-6",
    durationLabel: "2 min",
    emoji: "🔢",
    title: {
      en: "Counting Apples 1 to 10 in the Garden!",
      ar: "عدّ التفاحات من ١ إلى ١٠ في الحديقة!",
    },
    objective: {
      en: "Count from 1 to 10 aloud and answer 'How many?'",
      ar: "العدّ من ١ إلى ١٠ والإجابة عن سؤال How many؟",
    },
    intro: {
      character: "omar",
      sceneEmojis: ["👦", "🌳", "🍎"],
      backdropClass: "from-emerald-100/80 via-amber-100/70 to-sky-100/70",
      englishCaption: "Let's pick fresh apples and count them from one to ten!",
      arabicHelper: "هيا نقطف التفاح الطازج ونعدّه من واحد إلى عشرة!",
      speechText: "Let's pick fresh apples and count them from one to ten!",
    },
    presentation: {
      character: "pip",
      sceneEmojis: ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"],
      backdropClass: "from-amber-100/80 via-sky-100/70 to-emerald-100/70",
      englishCaption: "One, two, three, four, five... six, seven, eight, nine, ten!",
      arabicHelper: "واحد، اثنان، ثلاثة، أربعة، خمسة... حتى عشرة!",
      speechText: "One, two, three, four, five, six, seven, eight, nine, ten!",
    },
    demonstration: {
      character: "lina",
      sceneEmojis: ["👧", "🍎🍎🍎"],
      backdropClass: "from-rose-100/80 via-amber-100/70 to-sky-100/70",
      englishCaption: "How many red apples are in my basket? There are three red apples!",
      arabicHelper: "كم تفاحة حمراء في سلتي؟ توجد ثلاث تفاحات حمراء!",
      speechText: "How many red apples are in my basket? There are three red apples!",
    },
    repetition: {
      character: "pip",
      sceneEmojis: ["🎤", "🍎", "🔢"],
      backdropClass: "from-violet-100/80 via-sky-100/70 to-emerald-100/70",
      englishCaption: "Count with me on your fingers: One, two, three, four, five!",
      arabicHelper: "عدّ معي على أصابعك من ١ إلى ٥!",
      speechText: "Count with me! One, two, three, four, five!",
    },
    practice: {
      character: "omar",
      sceneEmojis: ["🍎", "🍎", "🍎", "🍎"],
      backdropClass: "from-sky-100/80 via-emerald-100/70 to-amber-100/70",
      englishCaption: "How many apples do you see above?",
      arabicHelper: "كم تفاحة تراها في الأعلى؟",
      speechText: "How many apples do you see?",
      practiceCheck: {
        question: "How many apples: 🍎 🍎 🍎 🍎 ?",
        options: ["two", "four", "seven"],
        correctIndex: 1,
      },
    },
    review: {
      character: "pip",
      sceneEmojis: ["🏆", "🔢", "🍎"],
      backdropClass: "from-amber-200/80 via-emerald-100/70 to-sky-100/70",
      englishCaption: "Amazing counting! You can ask 'How many?' and answer clearly!",
      arabicHelper: "عدّ رائع! أصبحت تعرف السؤال How many؟ والإجابة بوضوح!",
      speechText: "Amazing counting! You earned a gold star!",
    },
  }),
  make6StageVideo({
    id: "vid-animals-safari",
    category: "animals",
    categoryLabel: { en: "Animals", ar: "الحيوانات" },
    ageGroup: "early-4-6",
    durationLabel: "2.5 min",
    emoji: "🦁",
    title: { en: "Farm & Safari Animal Adventure!", ar: "مغامرة حيوانات المزرعة والسفاري!" },
    objective: {
      en: "Identify farm vs. wild animals and describe what each animal can do.",
      ar: "التمييز بين حيوانات المزرعة والبرية ووصف ما يستطيع كل حيوان فعله.",
    },
    intro: {
      character: "pip",
      sceneEmojis: ["🦉", "🐄", "🦁"],
      backdropClass: "from-lime-100/80 via-emerald-100/70 to-amber-100/70",
      englishCaption: "Hop on Pip's bus! First we visit the sunny farm, then the wild safari!",
      arabicHelper: "اركب حافلة Pip! نزور المزرعة المشمسة أولًا ثم السفاري البري!",
      speechText: "Hop on! Let's visit the farm and the wild safari!",
    },
    presentation: {
      character: "omar",
      sceneEmojis: ["🐄", "🐑", "🦁", "🐘"],
      backdropClass: "from-amber-100/80 via-lime-100/70 to-sky-100/70",
      englishCaption: "On the farm: cow and sheep! In the wild: lion and elephant!",
      arabicHelper: "في المزرعة: بقرة وخروف! وفي البرية: أسد وفيل!",
      speechText:
        "On the farm, we see a cow and a sheep. In the wild, we see a lion and an elephant!",
    },
    demonstration: {
      character: "lina",
      sceneEmojis: ["🦒", "🌳", "🐒"],
      backdropClass: "from-emerald-100/80 via-amber-100/70 to-sky-100/70",
      englishCaption: "The tall giraffe eats leaves, and the clever monkey climbs trees!",
      arabicHelper: "الزرافة الطويلة تأكل الأوراق، والقرد الذكي يتسلق الأشجار!",
      speechText: "The tall giraffe eats leaves, and the clever monkey climbs trees!",
    },
    repetition: {
      character: "pip",
      sceneEmojis: ["🎤", "🦁", "🐘", "🐄"],
      backdropClass: "from-violet-100/80 via-emerald-100/70 to-amber-100/70",
      englishCaption: "Say it loudly: A lion roars! An elephant is big!",
      arabicHelper: "ردّد بصوت واضح: A lion roars! An elephant is big!",
      speechText: "Say it with me: A lion roars! An elephant is big!",
    },
    practice: {
      character: "pip",
      sceneEmojis: ["🐄", "🚜", "❓"],
      backdropClass: "from-lime-100/80 via-sky-100/70 to-amber-100/70",
      englishCaption: "Which animal lives on a farm and gives us milk?",
      arabicHelper: "أي حيوان يعيش في المزرعة ويعطينا الحليب؟",
      speechText: "Which animal lives on a farm and gives us milk?",
      practiceCheck: {
        question: "Which farm animal gives us milk?",
        options: ["lion", "cow", "shark"],
        correctIndex: 1,
      },
    },
    review: {
      character: "pip",
      sceneEmojis: ["⭐", "🐄", "🦁", "🐘"],
      backdropClass: "from-amber-200/80 via-lime-100/70 to-emerald-100/70",
      englishCaption: "Roar-some job! You know farm animals and wild animals!",
      arabicHelper: "عمل رائع! أنت الآن تعرف حيوانات المزرعة والحيوانات البرية!",
      speechText: "Awesome job! You know farm and wild animals!",
    },
  }),
  make6StageVideo({
    id: "vid-vocabulary-fruits",
    category: "vocabulary",
    categoryLabel: { en: "Everyday Vocabulary", ar: "المفردات اليومية" },
    ageGroup: "young-7-9",
    durationLabel: "3 min",
    emoji: "🧺",
    title: { en: "At the Fruit & Vegetable Market!", ar: "في سوق الفواكه والخضروات!" },
    objective: {
      en: "Use 'I like...' and 'Can I have...' with fruit and vegetable words.",
      ar: "استخدام I like و Can I have مع أسماء الفواكه والخضروات.",
    },
    intro: {
      character: "lina",
      sceneEmojis: ["👧", "🧺", "🍎", "🥕"],
      backdropClass: "from-rose-100/80 via-amber-100/70 to-emerald-100/70",
      englishCaption: "Let's go shopping for healthy fruits and crunchy vegetables!",
      arabicHelper: "هيا نتسوّق الفواكه الصحية والخضروات المقرمشة!",
      speechText: "Let's go shopping for healthy fruits and crunchy vegetables!",
    },
    presentation: {
      character: "lina",
      sceneEmojis: ["🍎", "🍌", "🥕", "🍅"],
      backdropClass: "from-amber-100/80 via-emerald-100/70 to-rose-100/70",
      englishCaption: "Fruits: apple, banana, orange! Vegetables: carrot, tomato, cucumber!",
      arabicHelper: "فواكه: تفاحة، موزة، برتقالة! خضروات: جزرة، طماطم، خيار!",
      speechText: "Fruits: apple, banana, orange! Vegetables: carrot, tomato, cucumber!",
    },
    demonstration: {
      character: "omar",
      sceneEmojis: ["👦", "🍌", "🥕"],
      backdropClass: "from-emerald-100/80 via-sky-100/70 to-amber-100/70",
      englishCaption: "Hello! Can I have two bananas and three orange carrots, please?",
      arabicHelper: "مرحبًا! هل يمكنني أخذ موزتين وثلاث جزرات من فضلك؟",
      speechText: "Hello! Can I have two bananas and three orange carrots, please?",
    },
    repetition: {
      character: "pip",
      sceneEmojis: ["🎤", "🍎", "🥕"],
      backdropClass: "from-violet-100/80 via-amber-100/70 to-emerald-100/70",
      englishCaption: "Repeat politely: Can I have an apple, please? Thank you!",
      arabicHelper: "ردّد بأدب: Can I have an apple, please? Thank you!",
      speechText: "Repeat politely: Can I have an apple, please? Thank you!",
    },
    practice: {
      character: "lina",
      sceneEmojis: ["🥕", "❓"],
      backdropClass: "from-amber-100/80 via-sky-100/70 to-emerald-100/70",
      englishCaption: "Which one is a crunchy orange vegetable?",
      arabicHelper: "أي منها خضار برتقالي مقرمش؟",
      speechText: "Which one is a crunchy orange vegetable?",
      practiceCheck: {
        question: "Pick the orange vegetable:",
        options: ["carrot", "banana", "grapes"],
        correctIndex: 0,
      },
    },
    review: {
      character: "pip",
      sceneEmojis: ["🧺", "🍎", "🥕", "⭐"],
      backdropClass: "from-emerald-100/80 via-amber-100/70 to-rose-100/70",
      englishCaption: "Delicious! Always remember polite words: 'please' and 'thank you'!",
      arabicHelper: "رائع! تذكّر دائمًا الكلمات المهذبة: please و thank you!",
      speechText: "Delicious! You mastered market vocabulary!",
    },
  }),
  make6StageVideo({
    id: "vid-daily-routines",
    category: "daily-routines",
    categoryLabel: { en: "Daily Routines", ar: "الروتين اليومي" },
    ageGroup: "young-7-9",
    durationLabel: "3 min",
    emoji: "⏰",
    title: { en: "Omar's Happy School Day!", ar: "يوم عمر الدراسي السعيد!" },
    objective: {
      en: "Talk about morning, afternoon, and bedtime routines in Present Simple.",
      ar: "التحدث عن روتين الصباح والظهيرة والنوم بالمضارع البسيط.",
    },
    intro: {
      character: "omar",
      sceneEmojis: ["👦", "🌅", "⏰"],
      backdropClass: "from-amber-100/80 via-sky-100/70 to-indigo-100/70",
      englishCaption: "Good morning! Come follow my daily routine from sunrise to bedtime!",
      arabicHelper: "صباح الخير! تابع معي روتيني اليومي من الشروق حتى وقت النوم!",
      speechText: "Good morning! Come follow my daily routine from sunrise to bedtime!",
    },
    presentation: {
      character: "omar",
      sceneEmojis: ["🌅", "🪥", "🎒", "🌙"],
      backdropClass: "from-sky-100/80 via-amber-100/70 to-indigo-100/70",
      englishCaption: "I wake up. I brush my teeth. I go to school. I go to bed at nine.",
      arabicHelper: "أستيقظ. أنظّف أسناني. أذهب للمدرسة. أنام الساعة التاسعة.",
      speechText: "I wake up. I brush my teeth. I go to school. I go to bed at nine.",
    },
    demonstration: {
      character: "lina",
      sceneEmojis: ["👧", "📝", "📚"],
      backdropClass: "from-emerald-100/80 via-sky-100/70 to-amber-100/70",
      englishCaption: "After lunch, I do my homework and read a short English story!",
      arabicHelper: "بعد الغداء أحلّ واجبي وأقرأ قصة إنجليزية قصيرة!",
      speechText: "After lunch, I do my homework and read a short English story!",
    },
    repetition: {
      character: "pip",
      sceneEmojis: ["🎤", "🌅", "🪥"],
      backdropClass: "from-violet-100/80 via-sky-100/70 to-amber-100/70",
      englishCaption: "Say it with Pip: I wake up early! I brush my teeth!",
      arabicHelper: "ردّد مع Pip: I wake up early! I brush my teeth!",
      speechText: "Say it with me: I wake up early! I brush my teeth!",
    },
    practice: {
      character: "omar",
      sceneEmojis: ["🌙", "🛏️", "❓"],
      backdropClass: "from-indigo-100/80 via-sky-100/70 to-amber-100/70",
      englishCaption: "What do you do at 9 o'clock at night?",
      arabicHelper: "ماذا تفعل الساعة التاسعة ليلًا؟",
      speechText: "What do you do at nine o'clock at night?",
      practiceCheck: {
        question: "At 9 o'clock at night, I ___.",
        options: ["wake up", "go to bed", "eat breakfast"],
        correctIndex: 1,
      },
    },
    review: {
      character: "pip",
      sceneEmojis: ["⏰", "⭐", "🌅", "🌙"],
      backdropClass: "from-amber-200/80 via-sky-100/70 to-indigo-100/70",
      englishCaption: "Great routine! Try telling your family your day in English tonight!",
      arabicHelper: "روتين رائع! جرّب أن تحكي لعائلتك يومك بالإنجليزية الليلة!",
      speechText: "Great routine! You can describe your whole day in English!",
    },
  }),
  make6StageVideo({
    id: "vid-basic-conversations",
    category: "conversations",
    categoryLabel: { en: "Basic Conversations", ar: "المحادثات الأساسية" },
    ageGroup: "young-7-9",
    durationLabel: "3 min",
    emoji: "💬",
    title: { en: "Making a New Friend at the Park!", ar: "التعرّف على صديق جديد في المنتزه!" },
    objective: {
      en: "Greet someone, introduce yourself, ask their name, and say goodbye.",
      ar: "إلقاء التحية والتعريف بالنفس والسؤال عن الاسم والوداع.",
    },
    intro: {
      character: "lina",
      sceneEmojis: ["👧", "👦", "🌳"],
      backdropClass: "from-emerald-100/80 via-sky-100/70 to-amber-100/70",
      englishCaption: "Watch how Lina and Omar become friends at the park!",
      arabicHelper: "شاهد كيف يصبح لينا وعمر صديقين في المنتزه!",
      speechText: "Watch how Lina and Omar become friends at the park!",
    },
    presentation: {
      character: "lina",
      sceneEmojis: ["👋", "💬", "😊"],
      backdropClass: "from-sky-100/80 via-rose-100/70 to-amber-100/70",
      englishCaption: "Hello! My name is Lina. What is your name? Nice to meet you!",
      arabicHelper: "مرحبًا! اسمي لينا. ما اسمك؟ تشرفت بلقائك!",
      speechText: "Hello! My name is Lina. What is your name? Nice to meet you!",
    },
    demonstration: {
      character: "omar",
      sceneEmojis: ["👦", "👧", "⚽"],
      backdropClass: "from-amber-100/80 via-emerald-100/70 to-sky-100/70",
      englishCaption: "Hi Lina! I am Omar. I am eight years old. Do you want to play football?",
      arabicHelper: "مرحبًا لينا! أنا عمر. عمري ثماني سنوات. هل تريدين لعب كرة القدم؟",
      speechText: "Hi Lina! I am Omar. I am eight years old. Do you want to play football?",
    },
    repetition: {
      character: "pip",
      sceneEmojis: ["🎤", "👋", "😊"],
      backdropClass: "from-violet-100/80 via-sky-100/70 to-rose-100/70",
      englishCaption: "Practise saying: Hello! My name is... Nice to meet you!",
      arabicHelper: "تدرّب على قول: Hello! My name is... Nice to meet you!",
      speechText: "Repeat after me: Hello! Nice to meet you!",
    },
    practice: {
      character: "pip",
      sceneEmojis: ["💬", "❓"],
      backdropClass: "from-sky-100/80 via-emerald-100/70 to-amber-100/70",
      englishCaption: "Someone says 'Nice to meet you!' What is a friendly reply?",
      arabicHelper: "قال لك صديقك Nice to meet you! ما الرد اللطيف؟",
      speechText: "Someone says Nice to meet you! What is a friendly reply?",
      practiceCheck: {
        question: "Friendly reply to 'Nice to meet you!'",
        options: ["Nice to meet you too!", "It is a banana.", "Good night."],
        correctIndex: 0,
      },
    },
    review: {
      character: "pip",
      sceneEmojis: ["🤝", "⭐", "💬"],
      backdropClass: "from-emerald-100/80 via-amber-100/70 to-sky-100/70",
      englishCaption: "Friendly speaker! A smile and 'Hello!' start great friendships!",
      arabicHelper: "متحدّث لطيف! ابتسامة وكلمة Hello تبدأ أجمل الصداقات!",
      speechText: "Well done! You can introduce yourself with confidence!",
    },
  }),
  make6StageVideo({
    id: "vid-grammar-this-these",
    category: "grammar",
    categoryLabel: { en: "Visual Grammar", ar: "القواعد المرئية" },
    ageGroup: "young-7-9",
    durationLabel: "3 min",
    emoji: "🐱",
    title: {
      en: "One Cat or Many Cats? This is vs. These are!",
      ar: "قطة واحدة أم قطط كثيرة؟ This is و These are!",
    },
    objective: {
      en: "Use 'This is' for one near object and 'These are' for multiple near objects.",
      ar: "استخدام This is للمفرد القريب و These are للجمع القريب.",
    },
    intro: {
      character: "mimi",
      sceneEmojis: ["🐱", "✨", "🐱🐱🐱"],
      backdropClass: "from-amber-100/80 via-rose-100/70 to-violet-100/70",
      englishCaption: "Meow! Mimi brought her kitten friends to show you a fun grammar trick!",
      arabicHelper: "مياو! أحضرت ميمي أصدقاءها لتريك خدعة قواعدية ممتعة!",
      speechText: "Look! Mimi brought her kitten friends to show you a fun grammar trick!",
    },
    presentation: {
      character: "pip",
      sceneEmojis: ["1️⃣🐱", "➡️", "3️⃣🐱🐱🐱"],
      backdropClass: "from-sky-100/80 via-amber-100/70 to-emerald-100/70",
      englishCaption: "One cat right here: THIS IS a cat. Three cats right here: THESE ARE cats!",
      arabicHelper: "قطة واحدة قريبة: This is a cat. ثلاث قطط قريبة: These are cats!",
      speechText: "One cat: This is a cat. Three cats: These are cats!",
    },
    demonstration: {
      character: "lina",
      sceneEmojis: ["👧", "📖", "✏️✏️"],
      backdropClass: "from-emerald-100/80 via-sky-100/70 to-rose-100/70",
      englishCaption: "This is my book, and these are my coloured pencils!",
      arabicHelper: "هذا كتابي، وهذه أقلامي الملوّنة!",
      speechText: "This is my book, and these are my coloured pencils!",
    },
    repetition: {
      character: "pip",
      sceneEmojis: ["🎤", "🐱", "🐱🐱"],
      backdropClass: "from-violet-100/80 via-amber-100/70 to-sky-100/70",
      englishCaption: "Say both aloud: This is a cat! These are cats!",
      arabicHelper: "ردّد الجملتين بصوت عالٍ: This is a cat! These are cats!",
      speechText: "Say it aloud: This is a cat! These are cats!",
    },
    practice: {
      character: "omar",
      sceneEmojis: ["🍎🍎🍎", "❓"],
      backdropClass: "from-rose-100/80 via-amber-100/70 to-sky-100/70",
      englishCaption: "Look at three apples in your hand: '___ sweet apples.'",
      arabicHelper: "انظر إلى ثلاث تفاحات في يدك: أي عبارة صحيحة؟",
      speechText: "Look at three apples in your hand. Do we say This is or These are?",
      practiceCheck: {
        question: "🍎🍎🍎 ___ sweet apples.",
        options: ["This is", "These are", "That is"],
        correctIndex: 1,
      },
    },
    review: {
      character: "pip",
      sceneEmojis: ["⭐", "🐱", "🐱🐱🐱"],
      backdropClass: "from-amber-200/80 via-emerald-100/70 to-sky-100/70",
      englishCaption: "Grammar Wizard! One = This is, Many = These are!",
      arabicHelper: "عبقري القواعد! مفرد قريب = This is، جمع قريب = These are!",
      speechText: "Grammar Wizard! One is This is, and many is These are!",
    },
  }),
  make6StageVideo({
    id: "vid-storytelling-owl",
    category: "storytelling",
    categoryLabel: { en: "Storytelling", ar: "سرد القصص" },
    ageGroup: "preteen-10-12",
    durationLabel: "4 min",
    emoji: "📖",
    title: { en: "Story Time: The Brave Little Explorer", ar: "وقت القصة: المستكشف الصغير الشجاع" },
    objective: {
      en: "Follow a short adventure story in Simple Past and answer comprehension questions.",
      ar: "متابعة قصة مغامرة قصيرة بالماضي البسيط والإجابة عن أسئلة الفهم.",
    },
    intro: {
      character: "pip",
      sceneEmojis: ["🦉", "📖", "🌲"],
      backdropClass: "from-indigo-100/80 via-violet-100/70 to-sky-100/70",
      englishCaption: "Get cosy! Tonight's story is about a brave explorer in the Green Forest!",
      arabicHelper: "استعد للاستمتاع! قصة الليلة عن مستكشف شجاع في الغابة الخضراء!",
      speechText: "Get cosy! Tonight's story is about a brave explorer in the Green Forest!",
    },
    presentation: {
      character: "omar",
      sceneEmojis: ["👦", "🗺️", "⛰️", "🏞️"],
      backdropClass: "from-emerald-100/80 via-sky-100/70 to-amber-100/70",
      englishCaption: "Last Saturday, Sami packed a map and walked beside a sparkling blue river.",
      arabicHelper: "السبت الماضي، أخذ سامي خريطة ومشى بجانب نهر أزرق لامع.",
      speechText: "Last Saturday, Sami packed a map and walked beside a sparkling blue river.",
    },
    demonstration: {
      character: "lina",
      sceneEmojis: ["👧", "🦉", "🌉"],
      backdropClass: "from-amber-100/80 via-emerald-100/70 to-indigo-100/70",
      englishCaption:
        "He helped a tiny owl find its nest, and together they saw a rainbow over the bridge!",
      arabicHelper: "ساعد بومة صغيرة في إيجاد عشّها، وشاهدا معًا قوس قزح فوق الجسر!",
      speechText:
        "He helped a tiny owl find its nest, and together they saw a rainbow over the bridge!",
    },
    repetition: {
      character: "pip",
      sceneEmojis: ["🎤", "📖", "🌈"],
      backdropClass: "from-violet-100/80 via-sky-100/70 to-emerald-100/70",
      englishCaption: "Retell with expression: He walked by the river and helped a tiny owl!",
      arabicHelper: "أعد السرد بتعبير جميل: He walked by the river and helped a tiny owl!",
      speechText: "Say it with expression: He walked by the river and helped a tiny owl!",
    },
    practice: {
      character: "pip",
      sceneEmojis: ["📖", "🦉", "❓"],
      backdropClass: "from-indigo-100/80 via-emerald-100/70 to-amber-100/70",
      englishCaption: "Who did Sami help in the Green Forest?",
      arabicHelper: "من ساعد سامي في الغابة الخضراء؟",
      speechText: "Who did Sami help in the Green Forest?",
      practiceCheck: {
        question: "Who did Sami help?",
        options: ["a tiny owl", "a purple dragon", "a shark"],
        correctIndex: 0,
      },
    },
    review: {
      character: "pip",
      sceneEmojis: ["🌟", "📖", "🦉"],
      backdropClass: "from-amber-200/80 via-indigo-100/70 to-emerald-100/70",
      englishCaption: "Wonderful storyteller! Notice the past verbs: packed, walked, helped, saw!",
      arabicHelper: "راوي قصص رائع! لاحظ أفعال الماضي: packed و walked و helped و saw!",
      speechText: "Wonderful storyteller! You understood every part of the adventure!",
    },
  }),
  make6StageVideo({
    id: "vid-pronunciation-th-sh",
    category: "pronunciation",
    categoryLabel: { en: "Pronunciation", ar: "النطق الواضح" },
    ageGroup: "preteen-10-12",
    durationLabel: "3.5 min",
    emoji: "🗣️",
    title: {
      en: "Crisp Digraphs: SH, CH & TH Sound Magic!",
      ar: "سحر الثنائيات الصوتية: SH و CH و TH!",
    },
    objective: {
      en: "Pronounce sh (/ʃ/), ch (/tʃ/), and th (/θ/) clearly without mixing them up.",
      ar: "نطق أصوات sh و ch و th بوضوح دون خلط بينها.",
    },
    intro: {
      character: "pip",
      sceneEmojis: ["🦉", "🚢", "🧀", "👍"],
      backdropClass: "from-sky-100/80 via-violet-100/70 to-rose-100/70",
      englishCaption: "Sometimes two letters team up to make ONE brand-new sound!",
      arabicHelper: "أحيانًا يتعاون حرفان معًا لصنع صوت جديد واحد!",
      speechText: "Sometimes two letters team up to make one brand-new sound!",
    },
    presentation: {
      character: "pip",
      sceneEmojis: ["🤫🚢", "🚂🧀", "👅👍"],
      backdropClass: "from-amber-100/80 via-sky-100/70 to-violet-100/70",
      englishCaption:
        "SH says 'shhh' like ship! CH says 'chuh' like cheese! TH puts your tongue gently between teeth like thumb!",
      arabicHelper:
        "SH مثل ship! و CH مثل cheese! و TH بوضع طرف اللسان بلطف بين الأسنان مثل thumb!",
      speechText: "Shhh, ship! Chuh, cheese! Thhh, thumb!",
    },
    demonstration: {
      character: "omar",
      sceneEmojis: ["👦", "🚢", "🍟", "👍"],
      backdropClass: "from-emerald-100/80 via-sky-100/70 to-amber-100/70",
      englishCaption: "Watch the difference: a big SHIP on the sea, and a crispy CHIP on my plate!",
      arabicHelper: "لاحظ الفرق: سفينة ship في البحر، وبطاطس مقرمشة chip على طبقي!",
      speechText: "Watch the difference: a big ship on the sea, and a crispy chip on my plate!",
    },
    repetition: {
      character: "pip",
      sceneEmojis: ["🎤", "🚢", "🍟", "👍"],
      backdropClass: "from-violet-100/80 via-rose-100/70 to-amber-100/70",
      englishCaption: "Say it clearly: ship — chip! thin — tin! thumb — think!",
      arabicHelper: "ردّد بوضوح: ship — chip! thin — tin!",
      speechText: "Repeat clearly: ship, chip! thin, tin! thumb, think!",
    },
    practice: {
      character: "lina",
      sceneEmojis: ["🚢", "❓"],
      backdropClass: "from-sky-100/80 via-amber-100/70 to-emerald-100/70",
      englishCaption: "Which digraph starts the word 'ship'?",
      arabicHelper: "أي ثنائي حرفي تبدأ به كلمة ship؟",
      speechText: "Which digraph starts the word ship?",
      practiceCheck: {
        question: "___ip (🚢)",
        options: ["sh", "ch", "th"],
        correctIndex: 0,
      },
    },
    review: {
      character: "pip",
      sceneEmojis: ["🗣️", "⭐", "🚢", "👍"],
      backdropClass: "from-amber-200/80 via-sky-100/70 to-violet-100/70",
      englishCaption: "Crystal-clear pronunciation! Remember SH, CH, and TH!",
      arabicHelper: "نطق واضح وممتاز! تذكّر دائمًا SH و CH و TH!",
      speechText: "Crystal-clear pronunciation! Fantastic work!",
    },
  }),
  make6StageVideo({
    id: "vid-listening-weather",
    category: "listening",
    categoryLabel: { en: "Listening Comprehension", ar: "فهم الاستماع" },
    ageGroup: "preteen-10-12",
    durationLabel: "4 min",
    emoji: "🎧",
    title: {
      en: "Weekend Weather Forecast Challenge!",
      ar: "تحدي نشرة الطقس لعطلة نهاية الأسبوع!",
    },
    objective: {
      en: "Listen for specific weather details and match plans to the right day.",
      ar: "الاستماع لتفاصيل الطقس وربط الأنشطة باليوم المناسب.",
    },
    intro: {
      character: "lina",
      sceneEmojis: ["👧", "🎧", "⛅"],
      backdropClass: "from-cyan-100/80 via-sky-100/70 to-amber-100/70",
      englishCaption:
        "Put on your listening ears! Let's plan our weekend using the weather report!",
      arabicHelper: "أصغِ جيدًا! هيا نخطط لعطلتنا حسب نشرة الطقس!",
      speechText: "Put on your listening ears! Let's plan our weekend using the weather report!",
    },
    presentation: {
      character: "omar",
      sceneEmojis: ["☀️", "🌧️", "💨"],
      backdropClass: "from-sky-100/80 via-cyan-100/70 to-emerald-100/70",
      englishCaption:
        "Listen closely: Friday will be sunny and warm. Saturday will be rainy in the afternoon!",
      arabicHelper: "استمع بتركيز: الجمعة سيكون مشمسًا ودافئًا، والسبت سيكون ممطرًا بعد الظهر!",
      speechText: "Friday will be sunny and warm. Saturday will be rainy in the afternoon.",
    },
    demonstration: {
      character: "lina",
      sceneEmojis: ["🚲", "☀️", "📚", "🌧️"],
      backdropClass: "from-emerald-100/80 via-amber-100/70 to-sky-100/70",
      englishCaption:
        "So on Friday we ride our bikes in the park, and on Saturday we visit the cosy library!",
      arabicHelper: "لذا يوم الجمعة نركب الدراجات في المنتزه، ويوم السبت نزور المكتبة الدافئة!",
      speechText:
        "On Friday we ride our bikes in the park, and on Saturday we visit the cosy library!",
    },
    repetition: {
      character: "pip",
      sceneEmojis: ["🎤", "☀️", "🌧️"],
      backdropClass: "from-violet-100/80 via-cyan-100/70 to-amber-100/70",
      englishCaption: "Repeat the key forecast: Friday is sunny. Saturday is rainy.",
      arabicHelper: "ردّد النشرة: Friday is sunny. Saturday is rainy.",
      speechText: "Friday is sunny. Saturday is rainy.",
    },
    practice: {
      character: "pip",
      sceneEmojis: ["🎧", "🌧️", "❓"],
      backdropClass: "from-cyan-100/80 via-sky-100/70 to-indigo-100/70",
      englishCaption: "According to the forecast, where will Lina and Omar go on rainy Saturday?",
      arabicHelper: "حسب النشرة، إلى أين سيذهب لينا وعمر يوم السبت الممطر؟",
      speechText: "Where will Lina and Omar go on rainy Saturday?",
      practiceCheck: {
        question: "Where do they go on Saturday?",
        options: ["the beach", "the library", "the mountain"],
        correctIndex: 1,
      },
    },
    review: {
      character: "pip",
      sceneEmojis: ["🎧", "⭐", "⛅"],
      backdropClass: "from-amber-200/80 via-cyan-100/70 to-sky-100/70",
      englishCaption: "Super Listener! You caught every detail in the weather forecast!",
      arabicHelper: "مستمع بطل! التقطتَ كل تفاصيل نشرة الطقس!",
      speechText: "Super Listener! You caught every detail!",
    },
  }),
];

/** Curated Datasets for the 8 Playable Kids Learning Games Arcade. */
export const KIDS_MEMORY_PAIRS = [
  { id: "m1", word: "apple", emoji: "🍎" },
  { id: "m2", word: "cat", emoji: "🐱" },
  { id: "m3", word: "sun", emoji: "☀️" },
  { id: "m4", word: "book", emoji: "📖" },
  { id: "m5", word: "fish", emoji: "🐟" },
  { id: "m6", word: "star", emoji: "⭐" },
];

export const KIDS_UNSCRAMBLE_ITEMS = [
  {
    word: "cat",
    emoji: "🐱",
    scrambled: ["t", "c", "a"],
    hint: { en: "Soft pet that says meow", ar: "قطة" },
  },
  {
    word: "sun",
    emoji: "☀️",
    scrambled: ["n", "s", "u"],
    hint: { en: "Bright yellow in the sky", ar: "شمس" },
  },
  {
    word: "dog",
    emoji: "🐶",
    scrambled: ["g", "o", "d"],
    hint: { en: "Friendly pet that barks", ar: "كلب" },
  },
  {
    word: "frog",
    emoji: "🐸",
    scrambled: ["g", "r", "f", "o"],
    hint: { en: "Green animal that jumps", ar: "ضفدع" },
  },
  {
    word: "star",
    emoji: "⭐",
    scrambled: ["r", "t", "s", "a"],
    hint: { en: "Shines at night", ar: "نجمة" },
  },
  {
    word: "milk",
    emoji: "🥛",
    scrambled: ["k", "l", "m", "i"],
    hint: { en: "Healthy white drink", ar: "حليب" },
  },
];

export const KIDS_MISSING_LETTER_ITEMS = [
  { word: "fish", display: "_ish", missing: "f", emoji: "🐟", options: ["f", "b", "m", "s"] },
  { word: "ball", display: "_all", missing: "b", emoji: "⚽", options: ["p", "b", "t", "d"] },
  { word: "book", display: "b_ok", missing: "o", emoji: "📖", options: ["a", "e", "o", "u"] },
  { word: "cake", display: "c_ke", missing: "a", emoji: "🎂", options: ["a", "i", "o", "u"] },
  { word: "ship", display: "__ip", missing: "sh", emoji: "🚢", options: ["sh", "ch", "th", "wh"] },
  { word: "kite", display: "_ite", missing: "k", emoji: "🪁", options: ["k", "n", "l", "r"] },
];

export const KIDS_SENTENCE_ORDER_GAMES = [
  { sentence: "I like red apples.", emoji: "🍎", words: ["apples.", "I", "red", "like"] },
  { sentence: "The green frog jumps.", emoji: "🐸", words: ["jumps.", "The", "frog", "green"] },
  { sentence: "She has a blue bag.", emoji: "🎒", words: ["bag.", "a", "She", "blue", "has"] },
  { sentence: "We play in the park.", emoji: "🌳", words: ["park.", "play", "We", "the", "in"] },
];

export const KIDS_SPELLING_CHALLENGES = [
  { word: "apple", emoji: "🍎", clue: { en: "Crunchy red fruit", ar: "تفاحة" } },
  { word: "happy", emoji: "😄", clue: { en: "Smiling and joyful", ar: "سعيد" } },
  { word: "green", emoji: "🟢", clue: { en: "The colour of grass", ar: "أخضر" } },
  { word: "water", emoji: "💧", clue: { en: "Fresh clear drink", ar: "ماء" } },
  { word: "tiger", emoji: "🐯", clue: { en: "Striped wild cat", ar: "نمر" } },
];

export const KIDS_SOUND_RECOGNITION_ITEMS = [
  { sound: "/b/", letter: "B", targetWord: "ball", emoji: "⚽", options: ["ball", "sun", "fish"] },
  { sound: "/s/", letter: "S", targetWord: "sun", emoji: "☀️", options: ["cat", "sun", "pen"] },
  { sound: "/f/", letter: "F", targetWord: "fish", emoji: "🐟", options: ["fish", "dog", "hat"] },
  { sound: "/ʃ/", letter: "SH", targetWord: "ship", emoji: "🚢", options: ["cat", "ship", "milk"] },
  { sound: "/k/", letter: "C", targetWord: "cat", emoji: "🐱", options: ["dog", "cat", "bed"] },
];
