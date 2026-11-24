import type { Bilingual } from "@/content/lesson-types";

export type SpeechOrganId =
  | "lips"
  | "teeth"
  | "tongue"
  | "alveolar-ridge"
  | "hard-palate"
  | "soft-palate"
  | "vocal-cords"
  | "airflow";

export interface SpeechOrganMeta {
  id: SpeechOrganId;
  label: Bilingual;
  kidNote: Bilingual;
}

export const SPEECH_ORGANS: SpeechOrganMeta[] = [
  {
    id: "lips",
    label: { en: "Lips", ar: "الشفتان" },
    kidNote: {
      en: "Press or round your lips for /p/, /b/, /m/, /w/!",
      ar: "أغلق أو ضمّ شفتيك لأصوات /p/ و/b/ و/m/ و/w/!",
    },
  },
  {
    id: "teeth",
    label: { en: "Teeth", ar: "الأسنان" },
    kidNote: {
      en: "Top teeth gently help make /f/, /v/, /θ/, /ð/!",
      ar: "تساعد الأسنان العلوية في نطق /f/ و/v/ و/θ/ و/ð/!",
    },
  },
  {
    id: "tongue",
    label: { en: "Tongue", ar: "اللسان" },
    kidNote: {
      en: "Your tongue is a super helper that moves front, middle, and back!",
      ar: "اللسان بطل مرن يتحرك للأمام والوسط والخلف لإنتاج الأصوات!",
    },
  },
  {
    id: "alveolar-ridge",
    label: { en: "Alveolar Ridge", ar: "اللثة خلف الأسنان العليا" },
    kidNote: {
      en: "The bumpy spot right behind your top front teeth for /t/, /d/, /s/, /n/, /l/!",
      ar: "المكان البارز خلف الأسنان العلوية مباشرة لأصوات /t/ و/d/ و/s/ و/n/ و/l/!",
    },
  },
  {
    id: "hard-palate",
    label: { en: "Hard Palate", ar: "الحنك الصلب (سقف الفم)" },
    kidNote: {
      en: "The firm roof of your mouth used for /ʃ/, /tʃ/, /dʒ/, /j/!",
      ar: "سقف الفم الصلب المستخدم في أصوات /ʃ/ و/tʃ/ و/dʒ/ و/j/!",
    },
  },
  {
    id: "soft-palate",
    label: { en: "Soft Palate", ar: "الحنك الرخو" },
    kidNote: {
      en: "The soft back roof of your mouth used for /k/, /ɡ/, /ŋ/!",
      ar: "الجزء الخلفي الرخو من سقف الفم لأصوات /k/ و/ɡ/ و/ŋ/!",
    },
  },
  {
    id: "vocal-cords",
    label: { en: "Vocal Cords", ar: "الأحبال الصوتية" },
    kidNote: {
      en: "Touch your throat gently — they buzz for voiced sounds!",
      ar: "المس حلقك بلطف — تهتز الأحبال الصوتية في الأصوات المجهورة!",
    },
  },
  {
    id: "airflow",
    label: { en: "Mouth & Nose Airflow", ar: "تدفق الهواء عبر الفم والأنف" },
    kidNote: {
      en: "Air pops, flows smoothly, or hums through your nose for /m/, /n/, /ŋ/!",
      ar: "يتدفق الهواء بلطف أو يخرج من الأنف في أصوات /m/ و/n/ و/ŋ/!",
    },
  },
];

export type ArticulationGroupId =
  "bilabial" | "labiodental" | "dental" | "alveolar" | "postalveolar" | "velar" | "other";

export interface ArticulationSoundItem {
  id: string;
  ipa: string;
  groupId: ArticulationGroupId;
  voiced: boolean;
  activeOrgans: SpeechOrganId[];
  demoSpeech: string;
  mouthGuide: Bilingual;
  examples: { word: string; emoji: string; sentence: string }[];
}

export const ARTICULATION_GROUPS: {
  id: ArticulationGroupId;
  title: Bilingual;
  subtitle: Bilingual;
}[] = [
  {
    id: "bilabial",
    title: { en: "A. Bilabial (Both Lips)", ar: "أ. الشفوية (الشفتان معًا)" },
    subtitle: {
      en: "/p/, /b/, /m/ — made with both lips",
      ar: "/p/ و/b/ و/m/ — تُنطق بكلتا الشفتين",
    },
  },
  {
    id: "labiodental",
    title: { en: "B. Labiodental (Teeth + Lip)", ar: "ب. الأسنان والشفة" },
    subtitle: {
      en: "/f/, /v/ — top teeth touch lower lip",
      ar: "/f/ و/v/ — الأسنان العلوية تلمس الشفة السفلية",
    },
  },
  {
    id: "dental",
    title: { en: "C. Dental (Tongue + Teeth)", ar: "ج. الأسنانية (اللسان والأسنان)" },
    subtitle: { en: "/θ/ (think), /ð/ (this)", ar: "/θ/ مثل think و/ð/ مثل this" },
  },
  {
    id: "alveolar",
    title: { en: "D. Alveolar (Tongue + Ridge)", ar: "د. اللثوية (اللسان واللثة)" },
    subtitle: { en: "/t/, /d/, /s/, /z/, /n/, /l/", ar: "/t/ و/d/ و/s/ و/z/ و/n/ و/l/" },
  },
  {
    id: "postalveolar",
    title: { en: "E. Postalveolar (Sh/Ch/J)", ar: "هـ. ما بعد اللثوية" },
    subtitle: { en: "/ʃ/, /ʒ/, /tʃ/, /dʒ/", ar: "/ʃ/ و/ʒ/ و/tʃ/ و/dʒ/" },
  },
  {
    id: "velar",
    title: { en: "F. Velar (Back of Tongue)", ar: "و. الطبقية (مؤخرة اللسان)" },
    subtitle: { en: "/k/, /ɡ/, /ŋ/", ar: "/k/ و/ɡ/ و/ŋ/" },
  },
  {
    id: "other",
    title: { en: "G. Other Key Sounds", ar: "ز. أصوات أساسية أخرى" },
    subtitle: { en: "/h/, /w/, /j/, /r/", ar: "/h/ و/w/ و/j/ و/r/" },
  },
];

export const ARTICULATION_SOUNDS: ArticulationSoundItem[] = [
  // A. Bilabial
  {
    id: "p",
    ipa: "/p/",
    groupId: "bilabial",
    voiced: false,
    activeOrgans: ["lips", "airflow"],
    demoSpeech: "p, p, pen, pat",
    mouthGuide: {
      en: "Put both lips together and release a small, quiet burst of air (no throat buzz!).",
      ar: "أغلق الشفتين معًا ثم أطلق دفعة هواء خفيفة بدون اهتزاز الحلق.",
    },
    examples: [
      { word: "pen", emoji: "🖊️", sentence: "I draw with my pen." },
      { word: "pat", emoji: "🐱", sentence: "Pat the little cat." },
    ],
  },
  {
    id: "b",
    ipa: "/b/",
    groupId: "bilabial",
    voiced: true,
    activeOrgans: ["lips", "vocal-cords", "airflow"],
    demoSpeech: "b, b, ball, bat",
    mouthGuide: {
      en: "Put both lips together and pop the sound WITH vocal cord vibration!",
      ar: "أغلق الشفتين ثم أطلق الصوت مع اهتزاز واضح في الأحبال الصوتية!",
    },
    examples: [
      { word: "ball", emoji: "⚽", sentence: "Bounce the big ball." },
      { word: "bat", emoji: "🦇", sentence: "The bat flies at night." },
    ],
  },
  {
    id: "m",
    ipa: "/m/",
    groupId: "bilabial",
    voiced: true,
    activeOrgans: ["lips", "vocal-cords", "airflow"],
    demoSpeech: "m, m, moon, milk",
    mouthGuide: {
      en: "Close both lips gently and let the humming air flow through your nose: mmm!",
      ar: "أغلق الشفتين بلطف ودع الهواء يمر عبر الأنف مع همهمة لطيفة: mmm!",
    },
    examples: [
      { word: "moon", emoji: "🌙", sentence: "Look at the bright moon." },
      { word: "milk", emoji: "🥛", sentence: "I drink warm milk." },
    ],
  },
  // B. Labiodental
  {
    id: "f",
    ipa: "/f/",
    groupId: "labiodental",
    voiced: false,
    activeOrgans: ["teeth", "lips", "airflow"],
    demoSpeech: "f, f, fan, fish",
    mouthGuide: {
      en: "Gently touch your upper teeth to your lower lip and blow soft air (voiceless).",
      ar: "تلمس الأسنان العلوية الشفة السفلية بلطف مع نفث هواء ناعم بدون اهتزاز.",
    },
    examples: [
      { word: "fan", emoji: "🌀", sentence: "The fan keeps us cool." },
      { word: "fish", emoji: "🐟", sentence: "The fish swims fast." },
    ],
  },
  {
    id: "v",
    ipa: "/v/",
    groupId: "labiodental",
    voiced: true,
    activeOrgans: ["teeth", "lips", "vocal-cords", "airflow"],
    demoSpeech: "v, v, van, vase",
    mouthGuide: {
      en: "Same mouth as /f/ (upper teeth on lower lip), now TURN ON your throat buzz!",
      ar: "نفس وضعية /f/ تمامًا (الأسنان العلوية على الشفة السفلية) مع تشغيل اهتزاز الحلق!",
    },
    examples: [
      { word: "van", emoji: "🚐", sentence: "The blue van stops here." },
      { word: "vase", emoji: "🏺", sentence: "Flowers sit in a vase." },
    ],
  },
  // C. Dental
  {
    id: "theta",
    ipa: "/θ/",
    groupId: "dental",
    voiced: false,
    activeOrgans: ["tongue", "teeth", "airflow"],
    demoSpeech: "th, think, thin",
    mouthGuide: {
      en: "Peek your tongue tip gently between your teeth and blow soft air (no buzz): think!",
      ar: "أخرج طرف لسانك بلطف بين الأسنان وانفث هواءً ناعمًا بدون اهتزاز كما في think!",
    },
    examples: [
      { word: "think", emoji: "💭", sentence: "I think of a fun story." },
      { word: "thin", emoji: "📏", sentence: "This is a thin book." },
    ],
  },
  {
    id: "eth",
    ipa: "/ð/",
    groupId: "dental",
    voiced: true,
    activeOrgans: ["tongue", "teeth", "vocal-cords", "airflow"],
    demoSpeech: "th, this, mother",
    mouthGuide: {
      en: "Keep your tongue tip gently between your teeth AND buzz your voice: this!",
      ar: "ضع طرف لسانك بلطف بين الأسنان مع اهتزاز الأحبال الصوتية كما في this!",
    },
    examples: [
      { word: "this", emoji: "👉", sentence: "This is my red bag." },
      { word: "mother", emoji: "👩", sentence: "My mother smiles at me." },
    ],
  },
  // D. Alveolar
  {
    id: "t",
    ipa: "/t/",
    groupId: "alveolar",
    voiced: false,
    activeOrgans: ["tongue", "alveolar-ridge", "airflow"],
    demoSpeech: "t, t, tiger, tin",
    mouthGuide: {
      en: "Tap your tongue tip on the bumpy ridge behind your top teeth with a light puff of air.",
      ar: "انقر بطرف لسانك على اللثة خلف الأسنان العليا مع نفثة هواء خفيفة.",
    },
    examples: [
      { word: "tiger", emoji: "🐯", sentence: "The tiger walks quietly." },
      { word: "tin", emoji: "🥫", sentence: "A shiny silver tin." },
    ],
  },
  {
    id: "d",
    ipa: "/d/",
    groupId: "alveolar",
    voiced: true,
    activeOrgans: ["tongue", "alveolar-ridge", "vocal-cords"],
    demoSpeech: "d, d, dog, drum",
    mouthGuide: {
      en: "Same tongue tap behind your top teeth as /t/, now with vocal cord vibration!",
      ar: "نفس نقرة اللسان خلف الأسنان العليا مثل /t/ ولكن مع اهتزاز الصوت!",
    },
    examples: [
      { word: "dog", emoji: "🐶", sentence: "The happy dog runs." },
      { word: "drum", emoji: "🥁", sentence: "Tap the red drum." },
    ],
  },
  {
    id: "s",
    ipa: "/s/",
    groupId: "alveolar",
    voiced: false,
    activeOrgans: ["tongue", "alveolar-ridge", "airflow"],
    demoSpeech: "s, s, sun, sip",
    mouthGuide: {
      en: "Bring your tongue close to the ridge and hiss smoothly without voice: sss!",
      ar: "قرّب لسانك من اللثة العليا وأخرج صوت هواء ناعمًا بدون اهتزاز: sss!",
    },
    examples: [
      { word: "sun", emoji: "☀️", sentence: "The sun shines bright." },
      { word: "sip", emoji: "🥤", sentence: "Take a small sip of water." },
    ],
  },
  {
    id: "z",
    ipa: "/z/",
    groupId: "alveolar",
    voiced: true,
    activeOrgans: ["tongue", "alveolar-ridge", "vocal-cords", "airflow"],
    demoSpeech: "z, z, zip, zebra",
    mouthGuide: {
      en: "Same tongue position as /s/, now buzz like a happy bee: zzz!",
      ar: "نفس وضعية /s/ تمامًا مع تشغيل طنين الصوت المهتز مثل النحلة: zzz!",
    },
    examples: [
      { word: "zip", emoji: "🤐", sentence: "Zip up your coat." },
      { word: "zebra", emoji: "🦓", sentence: "The zebra has stripes." },
    ],
  },
  {
    id: "n",
    ipa: "/n/",
    groupId: "alveolar",
    voiced: true,
    activeOrgans: ["tongue", "alveolar-ridge", "vocal-cords", "airflow"],
    demoSpeech: "n, n, nest, nose",
    mouthGuide: {
      en: "Press your tongue tip on the ridge and let the humming sound flow through your nose!",
      ar: "ضع طرف لسانك على اللثة العليا ودع الصوت يمر عبر الأنف!",
    },
    examples: [
      { word: "nest", emoji: "🪹", sentence: "Birds build a cozy nest." },
      { word: "nose", emoji: "👃", sentence: "Point to your nose." },
    ],
  },
  {
    id: "l",
    ipa: "/l/",
    groupId: "alveolar",
    voiced: true,
    activeOrgans: ["tongue", "alveolar-ridge", "vocal-cords"],
    demoSpeech: "l, l, light, lion",
    mouthGuide: {
      en: "Touch your tongue tip lightly to the ridge while air flows smoothly around the sides!",
      ar: "المس اللثة العليا بطرف لسانك بلطف ودع الهواء يمر من جانبي اللسان!",
    },
    examples: [
      { word: "light", emoji: "💡", sentence: "Turn on the bright light." },
      { word: "lion", emoji: "🦁", sentence: "The lion roars loudly." },
    ],
  },
  // E. Postalveolar
  {
    id: "sh",
    ipa: "/ʃ/",
    groupId: "postalveolar",
    voiced: false,
    activeOrgans: ["lips", "tongue", "hard-palate", "airflow"],
    demoSpeech: "sh, ship, shoe",
    mouthGuide: {
      en: "Round your lips slightly and blow a gentle 'shhh' over your tongue toward the hard palate!",
      ar: "ضمّ شفتيك قليلًا وأخرج صوت «ش» ناعمًا بدون اهتزاز كما في ship!",
    },
    examples: [
      { word: "ship", emoji: "🚢", sentence: "The big ship sails on the sea." },
      { word: "shoe", emoji: "👟", sentence: "Tie your blue shoe." },
    ],
  },
  {
    id: "zh",
    ipa: "/ʒ/",
    groupId: "postalveolar",
    voiced: true,
    activeOrgans: ["lips", "tongue", "hard-palate", "vocal-cords"],
    demoSpeech: "measure, treasure",
    mouthGuide: {
      en: "Same mouth as /ʃ/ with your voice turned ON — found in the middle of measure and treasure!",
      ar: "نفس وضعية /ʃ/ مع تشغيل اهتزاز الصوت — يوجد في وسط كلمتي measure وtreasure!",
    },
    examples: [
      { word: "measure", emoji: "📏", sentence: "Let's measure the desk." },
      { word: "treasure", emoji: "💎", sentence: "They found a hidden treasure." },
    ],
  },
  {
    id: "ch",
    ipa: "/tʃ/",
    groupId: "postalveolar",
    voiced: false,
    activeOrgans: ["tongue", "alveolar-ridge", "hard-palate", "airflow"],
    demoSpeech: "ch, chair, chip",
    mouthGuide: {
      en: "Touch the ridge then pop into a quick 'ch' like a little train: ch-ch-chair!",
      ar: "ابدأ بنقرة خفيفة ثم انطلق بصوت «تش» سريع بدون اهتزاز كما في chair!",
    },
    examples: [
      { word: "chair", emoji: "🪑", sentence: "Sit on the wooden chair." },
      { word: "chip", emoji: "🍟", sentence: "I share a crunchy chip." },
    ],
  },
  {
    id: "j",
    ipa: "/dʒ/",
    groupId: "postalveolar",
    voiced: true,
    activeOrgans: ["tongue", "alveolar-ridge", "hard-palate", "vocal-cords"],
    demoSpeech: "j, juice, jump",
    mouthGuide: {
      en: "Same crisp start as /tʃ/, now WITH vocal cord vibration: juice!",
      ar: "نفس وضعية /tʃ/ ولكن مع تشغيل اهتزاز الصوت كما في juice!",
    },
    examples: [
      { word: "juice", emoji: "🧃", sentence: "Orange juice is delicious." },
      { word: "jump", emoji: "🤸", sentence: "Frogs can jump very high." },
    ],
  },
  // F. Velar
  {
    id: "k",
    ipa: "/k/",
    groupId: "velar",
    voiced: false,
    activeOrgans: ["tongue", "soft-palate", "airflow"],
    demoSpeech: "k, cat, kite",
    mouthGuide: {
      en: "Lift the back of your tongue to the soft palate and pop a light voiceless /k/!",
      ar: "ارفع مؤخرة لسانك نحو الحنك الرخو وأطلق صوت /k/ خفيفًا بدون اهتزاز!",
    },
    examples: [
      { word: "cat", emoji: "🐱", sentence: "The cat likes to play." },
      { word: "kite", emoji: "🪁", sentence: "Fly your kite in the wind." },
    ],
  },
  {
    id: "g",
    ipa: "/ɡ/",
    groupId: "velar",
    voiced: true,
    activeOrgans: ["tongue", "soft-palate", "vocal-cords"],
    demoSpeech: "g, go, goat",
    mouthGuide: {
      en: "Lift the back of your tongue to the soft palate WITH vocal cord vibration: go!",
      ar: "ارفع مؤخرة لسانك نحو الحنك الرخو مع اهتزاز واضح في الصوت كما في go!",
    },
    examples: [
      { word: "go", emoji: "🚦", sentence: "Green light means go!" },
      { word: "goat", emoji: "🐐", sentence: "The goat climbs the hill." },
    ],
  },
  {
    id: "ng",
    ipa: "/ŋ/",
    groupId: "velar",
    voiced: true,
    activeOrgans: ["tongue", "soft-palate", "vocal-cords", "airflow"],
    demoSpeech: "sing, ring, king",
    mouthGuide: {
      en: "Back of tongue touches the soft palate while humming through your nose: sing!",
      ar: "تلمس مؤخرة اللسان الحنك الرخو مع خروج الرنين عبر الأنف كما في sing!",
    },
    examples: [
      { word: "sing", emoji: "🎵", sentence: "We sing a happy song." },
      { word: "ring", emoji: "💍", sentence: "Look at the shiny ring." },
    ],
  },
  // G. Other Important Sounds
  {
    id: "h",
    ipa: "/h/",
    groupId: "other",
    voiced: false,
    activeOrgans: ["airflow"],
    demoSpeech: "h, hat, happy",
    mouthGuide: {
      en: "Open your mouth gently and exhale warm quiet air from your throat: hat!",
      ar: "افتح فمك بلطف وأخرج نفسًا دافئًا هادئًا من الحلق كما في hat!",
    },
    examples: [
      { word: "hat", emoji: "👒", sentence: "Put on your sun hat." },
      { word: "happy", emoji: "😊", sentence: "I feel happy today!" },
    ],
  },
  {
    id: "w",
    ipa: "/w/",
    groupId: "other",
    voiced: true,
    activeOrgans: ["lips", "vocal-cords"],
    demoSpeech: "w, water, whale",
    mouthGuide: {
      en: "Make tiny round lips like blowing a kiss, then glide open with voice: water!",
      ar: "ضمّ شفتيك بدائرة صغيرة ثم افتحهما بصوت ناعم كما في water!",
    },
    examples: [
      { word: "water", emoji: "💧", sentence: "Drink cool fresh water." },
      { word: "whale", emoji: "🐋", sentence: "The whale swims deep." },
    ],
  },
  {
    id: "y",
    ipa: "/j/",
    groupId: "other",
    voiced: true,
    activeOrgans: ["tongue", "hard-palate", "vocal-cords"],
    demoSpeech: "yes, yellow",
    mouthGuide: {
      en: "Lift the middle of your tongue smoothly toward the hard palate with voice: yes!",
      ar: "ارفع وسط لسانك بلطف نحو الحنك الصلب مع صوت ناعم كما في yes!",
    },
    examples: [
      { word: "yes", emoji: "👍", sentence: "Yes, I can read this!" },
      { word: "yellow", emoji: "💛", sentence: "The sunflower is yellow." },
    ],
  },
  {
    id: "r",
    ipa: "/r/",
    groupId: "other",
    voiced: true,
    activeOrgans: ["tongue", "lips", "vocal-cords"],
    demoSpeech: "r, right, rabbit",
    mouthGuide: {
      en: "Round your lips slightly and curl your tongue tip back WITHOUT touching the roof of your mouth!",
      ar: "ضمّ شفتيك قليلًا واثنِ طرف لسانك للخلف دون أن يلمس سقف الفم!",
    },
    examples: [
      { word: "right", emoji: "➡️", sentence: "Turn right at the tree." },
      { word: "rabbit", emoji: "🐰", sentence: "The rabbit hops quickly." },
    ],
  },
];

export const VIBRATION_PAIRS = [
  { voiceless: "/p/", voiced: "/b/", pairWords: "pat / bat", emojis: "🐱 / 🦇" },
  { voiceless: "/f/", voiced: "/v/", pairWords: "fan / van", emojis: "🌀 / 🚐" },
  { voiceless: "/s/", voiced: "/z/", pairWords: "sip / zip", emojis: "🥤 / 🤐" },
  { voiceless: "/t/", voiced: "/d/", pairWords: "ten / den", emojis: "🔟 / 🐻" },
] as const;

export interface MinimalPairItem {
  id: string;
  wordA: string;
  ipaA: string;
  emojiA: string;
  wordB: string;
  ipaB: string;
  emojiB: string;
  tip: Bilingual;
}

export const MINIMAL_PAIRS: MinimalPairItem[] = [
  {
    id: "mp-pat-bat",
    wordA: "pat",
    ipaA: "/pæt/",
    emojiA: "🐱",
    wordB: "bat",
    ipaB: "/bæt/",
    emojiB: "🦇",
    tip: {
      en: "/p/ has soft air; /b/ buzzes in your throat!",
      ar: "/p/ هواء خفيف؛ بينما /b/ يهتز في الحلق!",
    },
  },
  {
    id: "mp-fan-van",
    wordA: "fan",
    ipaA: "/fæn/",
    emojiA: "🌀",
    wordB: "van",
    ipaB: "/væn/",
    emojiB: "🚐",
    tip: {
      en: "/f/ is quiet air; /v/ adds throat vibration!",
      ar: "/f/ هواء هادئ؛ و/v/ يضيف اهتزاز الصوت!",
    },
  },
  {
    id: "mp-sip-zip",
    wordA: "sip",
    ipaA: "/sɪp/",
    emojiA: "🥤",
    wordB: "zip",
    ipaB: "/zɪp/",
    emojiB: "🤐",
    tip: {
      en: "/s/ hisses softly; /z/ buzzes like a bee!",
      ar: "/s/ صفير ناعم؛ و/z/ طنين مثل النحلة!",
    },
  },
  {
    id: "mp-thin-tin",
    wordA: "thin",
    ipaA: "/θɪn/",
    emojiA: "📏",
    wordB: "tin",
    ipaB: "/tɪn/",
    emojiB: "🥫",
    tip: {
      en: "/θ/ puts your tongue between teeth; /t/ taps behind teeth!",
      ar: "في /θ/ يبرز اللسان بين الأسنان؛ وفي /t/ ينقر خلفها!",
    },
  },
  {
    id: "mp-ship-chip",
    wordA: "ship",
    ipaA: "/ʃɪp/",
    emojiA: "🚢",
    wordB: "chip",
    ipaB: "/tʃɪp/",
    emojiB: "🍟",
    tip: {
      en: "/ʃ/ flows smoothly (shhh); /tʃ/ starts with a crisp pop (ch)!",
      ar: "/ʃ/ صوت مستمر ناعم؛ و/tʃ/ يبدأ بنقرة حادة!",
    },
  },
  {
    id: "mp-light-right",
    wordA: "light",
    ipaA: "/laɪt/",
    emojiA: "💡",
    wordB: "right",
    ipaB: "/raɪt/",
    emojiB: "➡️",
    tip: {
      en: "/l/ touches behind top teeth; /r/ curls back without touching!",
      ar: "في /l/ يلمس اللسان اللثة؛ وفي /r/ يلتف للخلف دون لمس!",
    },
  },
];

// ---------------------------------------------------------------------------
// Modules 4, 5, 6 — Decodable CVC, CVCC, CCVC & Digraph Banks
// ---------------------------------------------------------------------------

export type WordPatternKind = "cvc" | "cvcc" | "ccvc" | "digraph";

export interface DecodableWord {
  id: string;
  word: string;
  kind: WordPatternKind;
  vowelGroup?: "short-a" | "short-e" | "short-i" | "short-o" | "short-u";
  tiles: string[];
  phonemes: string[];
  emoji: string;
  sentence: string;
  arabicMeaning: string;
}

export const CVC_WORDS: DecodableWord[] = [
  // Short A
  {
    id: "cvc-cat",
    word: "cat",
    kind: "cvc",
    vowelGroup: "short-a",
    tiles: ["c", "a", "t"],
    phonemes: ["/k/", "/æ/", "/t/"],
    emoji: "🐱",
    sentence: "The cat sits on the mat.",
    arabicMeaning: "قطة",
  },
  {
    id: "cvc-bag",
    word: "bag",
    kind: "cvc",
    vowelGroup: "short-a",
    tiles: ["b", "a", "g"],
    phonemes: ["/b/", "/æ/", "/ɡ/"],
    emoji: "🎒",
    sentence: "I have a red bag.",
    arabicMeaning: "حقيبة",
  },
  {
    id: "cvc-map",
    word: "map",
    kind: "cvc",
    vowelGroup: "short-a",
    tiles: ["m", "a", "p"],
    phonemes: ["/m/", "/æ/", "/p/"],
    emoji: "🗺️",
    sentence: "Look at the big map.",
    arabicMeaning: "خريطة",
  },
  {
    id: "cvc-hat",
    word: "hat",
    kind: "cvc",
    vowelGroup: "short-a",
    tiles: ["h", "a", "t"],
    phonemes: ["/h/", "/æ/", "/t/"],
    emoji: "👒",
    sentence: "My hat is yellow.",
    arabicMeaning: "قبعة",
  },
  // Short E
  {
    id: "cvc-bed",
    word: "bed",
    kind: "cvc",
    vowelGroup: "short-e",
    tiles: ["b", "e", "d"],
    phonemes: ["/b/", "/e/", "/d/"],
    emoji: "🛏️",
    sentence: "The cat is on the bed.",
    arabicMeaning: "سرير",
  },
  {
    id: "cvc-pen",
    word: "pen",
    kind: "cvc",
    vowelGroup: "short-e",
    tiles: ["p", "e", "n"],
    phonemes: ["/p/", "/e/", "/n/"],
    emoji: "🖊️",
    sentence: "I write with a pen.",
    arabicMeaning: "قلم",
  },
  {
    id: "cvc-ten",
    word: "ten",
    kind: "cvc",
    vowelGroup: "short-e",
    tiles: ["t", "e", "n"],
    phonemes: ["/t/", "/e/", "/n/"],
    emoji: "🔟",
    sentence: "I can count to ten!",
    arabicMeaning: "عشرة",
  },
  {
    id: "cvc-red",
    word: "red",
    kind: "cvc",
    vowelGroup: "short-e",
    tiles: ["r", "e", "d"],
    phonemes: ["/r/", "/e/", "/d/"],
    emoji: "🔴",
    sentence: "The apple is red.",
    arabicMeaning: "أحمر",
  },
  // Short I
  {
    id: "cvc-sit",
    word: "sit",
    kind: "cvc",
    vowelGroup: "short-i",
    tiles: ["s", "i", "t"],
    phonemes: ["/s/", "/ɪ/", "/t/"],
    emoji: "🪑",
    sentence: "Please sit down.",
    arabicMeaning: "يجلس",
  },
  {
    id: "cvc-pig",
    word: "pig",
    kind: "cvc",
    vowelGroup: "short-i",
    tiles: ["p", "i", "g"],
    phonemes: ["/p/", "/ɪ/", "/ɡ/"],
    emoji: "🐷",
    sentence: "The pink pig is happy.",
    arabicMeaning: "خنزير صغير",
  },
  {
    id: "cvc-fin",
    word: "fin",
    kind: "cvc",
    vowelGroup: "short-i",
    tiles: ["f", "i", "n"],
    phonemes: ["/f/", "/ɪ/", "/n/"],
    emoji: "🦈",
    sentence: "A fish swims with its fin.",
    arabicMeaning: "زعنفة",
  },
  {
    id: "cvc-six",
    word: "six",
    kind: "cvc",
    vowelGroup: "short-i",
    tiles: ["s", "i", "x"],
    phonemes: ["/s/", "/ɪ/", "/ks/"],
    emoji: "6️⃣",
    sentence: "I see six stars.",
    arabicMeaning: "ستة",
  },
  // Short O
  {
    id: "cvc-dog",
    word: "dog",
    kind: "cvc",
    vowelGroup: "short-o",
    tiles: ["d", "o", "g"],
    phonemes: ["/d/", "/ɒ/", "/ɡ/"],
    emoji: "🐶",
    sentence: "The dog can run fast.",
    arabicMeaning: "كلب",
  },
  {
    id: "cvc-hot",
    word: "hot",
    kind: "cvc",
    vowelGroup: "short-o",
    tiles: ["h", "o", "t"],
    phonemes: ["/h/", "/ɒ/", "/t/"],
    emoji: "🔥",
    sentence: "The soup is hot.",
    arabicMeaning: "ساخن",
  },
  {
    id: "cvc-box",
    word: "box",
    kind: "cvc",
    vowelGroup: "short-o",
    tiles: ["b", "o", "x"],
    phonemes: ["/b/", "/ɒ/", "/ks/"],
    emoji: "📦",
    sentence: "Toys are in the box.",
    arabicMeaning: "صندوق",
  },
  {
    id: "cvc-pot",
    word: "pot",
    kind: "cvc",
    vowelGroup: "short-o",
    tiles: ["p", "o", "t"],
    phonemes: ["/p/", "/ɒ/", "/t/"],
    emoji: "🍲",
    sentence: "Mom cooks in a big pot.",
    arabicMeaning: "قدر",
  },
  // Short U
  {
    id: "cvc-sun",
    word: "sun",
    kind: "cvc",
    vowelGroup: "short-u",
    tiles: ["s", "u", "n"],
    phonemes: ["/s/", "/ʌ/", "/n/"],
    emoji: "☀️",
    sentence: "The sun shines bright.",
    arabicMeaning: "شمس",
  },
  {
    id: "cvc-cup",
    word: "cup",
    kind: "cvc",
    vowelGroup: "short-u",
    tiles: ["c", "u", "p"],
    phonemes: ["/k/", "/ʌ/", "/p/"],
    emoji: "☕",
    sentence: "Drink from the blue cup.",
    arabicMeaning: "كوب",
  },
  {
    id: "cvc-bus",
    word: "bus",
    kind: "cvc",
    vowelGroup: "short-u",
    tiles: ["b", "u", "s"],
    phonemes: ["/b/", "/ʌ/", "/s/"],
    emoji: "🚌",
    sentence: "We ride the yellow bus.",
    arabicMeaning: "حافلة",
  },
  {
    id: "cvc-run",
    word: "run",
    kind: "cvc",
    vowelGroup: "short-u",
    tiles: ["r", "u", "n"],
    phonemes: ["/r/", "/ʌ/", "/n/"],
    emoji: "🏃",
    sentence: "I run in the park.",
    arabicMeaning: "يركض",
  },
];

export const FOUR_LETTER_WORDS: DecodableWord[] = [
  // CVCC
  {
    id: "cvcc-hand",
    word: "hand",
    kind: "cvcc",
    tiles: ["h", "a", "n", "d"],
    phonemes: ["/h/", "/æ/", "/n/", "/d/"],
    emoji: "✋",
    sentence: "Raise your hand!",
    arabicMeaning: "يد",
  },
  {
    id: "cvcc-milk",
    word: "milk",
    kind: "cvcc",
    tiles: ["m", "i", "l", "k"],
    phonemes: ["/m/", "/ɪ/", "/l/", "/k/"],
    emoji: "🥛",
    sentence: "Cold milk is healthy.",
    arabicMeaning: "حليب",
  },
  {
    id: "cvcc-desk",
    word: "desk",
    kind: "cvcc",
    tiles: ["d", "e", "s", "k"],
    phonemes: ["/d/", "/e/", "/s/", "/k/"],
    emoji: "🪑",
    sentence: "My book is on the desk.",
    arabicMeaning: "مكتب",
  },
  {
    id: "cvcc-lamp",
    word: "lamp",
    kind: "cvcc",
    tiles: ["l", "a", "m", "p"],
    phonemes: ["/l/", "/æ/", "/m/", "/p/"],
    emoji: "💡",
    sentence: "Turn on the desk lamp.",
    arabicMeaning: "مصباح",
  },
  {
    id: "cvcc-sand",
    word: "sand",
    kind: "cvcc",
    tiles: ["s", "a", "n", "d"],
    phonemes: ["/s/", "/æ/", "/n/", "/d/"],
    emoji: "🏖️",
    sentence: "We play in the warm sand.",
    arabicMeaning: "رمل",
  },
  {
    id: "cvcc-nest",
    word: "nest",
    kind: "cvcc",
    tiles: ["n", "e", "s", "t"],
    phonemes: ["/n/", "/e/", "/s/", "/t/"],
    emoji: "🪹",
    sentence: "A bird sits in its nest.",
    arabicMeaning: "عش",
  },
  // CCVC (Consonant Blends)
  {
    id: "ccvc-stop",
    word: "stop",
    kind: "ccvc",
    tiles: ["s", "t", "o", "p"],
    phonemes: ["/s/", "/t/", "/ɒ/", "/p/"],
    emoji: "🛑",
    sentence: "Stop and look both ways!",
    arabicMeaning: "توقّف",
  },
  {
    id: "ccvc-frog",
    word: "frog",
    kind: "ccvc",
    tiles: ["f", "r", "o", "g"],
    phonemes: ["/f/", "/r/", "/ɒ/", "/ɡ/"],
    emoji: "🐸",
    sentence: "The green frog jumps.",
    arabicMeaning: "ضفدع",
  },
  {
    id: "ccvc-clap",
    word: "clap",
    kind: "ccvc",
    tiles: ["c", "l", "a", "p"],
    phonemes: ["/k/", "/l/", "/æ/", "/p/"],
    emoji: "👏",
    sentence: "Clap your hands together!",
    arabicMeaning: "يصفّق",
  },
  {
    id: "ccvc-drum",
    word: "drum",
    kind: "ccvc",
    tiles: ["d", "r", "u", "m"],
    phonemes: ["/d/", "/r/", "/ʌ/", "/m/"],
    emoji: "🥁",
    sentence: "He plays a loud drum.",
    arabicMeaning: "طبل",
  },
  {
    id: "ccvc-flag",
    word: "flag",
    kind: "ccvc",
    tiles: ["f", "l", "a", "g"],
    phonemes: ["/f/", "/l/", "/æ/", "/ɡ/"],
    emoji: "🚩",
    sentence: "The flag waves in the wind.",
    arabicMeaning: "عَلَم",
  },
  {
    id: "ccvc-swim",
    word: "swim",
    kind: "ccvc",
    tiles: ["s", "w", "i", "m"],
    phonemes: ["/s/", "/w/", "/ɪ/", "/m/"],
    emoji: "🏊",
    sentence: "Ducks swim in the pond.",
    arabicMeaning: "يسبح",
  },
  // Digraphs (SH, CH, TH, WH, PH)
  {
    id: "dig-ship",
    word: "ship",
    kind: "digraph",
    tiles: ["sh", "i", "p"],
    phonemes: ["/ʃ/", "/ɪ/", "/p/"],
    emoji: "🚢",
    sentence: "The ship sails on the sea.",
    arabicMeaning: "سفينة",
  },
  {
    id: "dig-chat",
    word: "chat",
    kind: "digraph",
    tiles: ["ch", "a", "t"],
    phonemes: ["/tʃ/", "/æ/", "/t/"],
    emoji: "💬",
    sentence: "Friends love to chat.",
    arabicMeaning: "يدردش",
  },
  {
    id: "dig-thin",
    word: "thin",
    kind: "digraph",
    tiles: ["th", "i", "n"],
    phonemes: ["/θ/", "/ɪ/", "/n/"],
    emoji: "📏",
    sentence: "Draw a thin line.",
    arabicMeaning: "رفيع",
  },
  {
    id: "dig-when",
    word: "when",
    kind: "digraph",
    tiles: ["wh", "e", "n"],
    phonemes: ["/w/", "/e/", "/n/"],
    emoji: "⏰",
    sentence: "When do we play?",
    arabicMeaning: "متى",
  },
  {
    id: "dig-phone",
    word: "phone",
    kind: "digraph",
    tiles: ["ph", "o", "ne"],
    phonemes: ["/f/", "/əʊ/", "/n/"],
    emoji: "📱",
    sentence: "Dad answers the phone.",
    arabicMeaning: "هاتف",
  },
];

// ---------------------------------------------------------------------------
// Module 7 — 4-Stage Progressive Sentence Reading
// ---------------------------------------------------------------------------

export interface ProgressiveSentenceItem {
  id: string;
  stage: 1 | 2 | 3;
  text: string;
  emoji: string;
  arabic: string;
  scrambledWords: string[];
}

export const PROGRESSIVE_SENTENCES: ProgressiveSentenceItem[] = [
  // Stage 1: 2–3 Word Sentences
  {
    id: "ps-1",
    stage: 1,
    text: "I am Sam.",
    emoji: "👦",
    arabic: "أنا سام.",
    scrambledWords: ["Sam.", "I", "am"],
  },
  {
    id: "ps-2",
    stage: 1,
    text: "It is red.",
    emoji: "🍎",
    arabic: "إنها حمراء.",
    scrambledWords: ["red.", "It", "is"],
  },
  {
    id: "ps-3",
    stage: 1,
    text: "A big cat.",
    emoji: "🐱",
    arabic: "قطة كبيرة.",
    scrambledWords: ["cat.", "A", "big"],
  },
  {
    id: "ps-4",
    stage: 1,
    text: "The sun shines.",
    emoji: "☀️",
    arabic: "الشمس تشرق.",
    scrambledWords: ["shines.", "The", "sun"],
  },
  // Stage 2: 4–6 Word Sentences
  {
    id: "ps-5",
    stage: 2,
    text: "The cat is on the bed.",
    emoji: "🛏️",
    arabic: "القطة على السرير.",
    scrambledWords: ["on", "The", "bed.", "is", "cat", "the"],
  },
  {
    id: "ps-6",
    stage: 2,
    text: "I have a red bag.",
    emoji: "🎒",
    arabic: "لديّ حقيبة حمراء.",
    scrambledWords: ["red", "I", "bag.", "have", "a"],
  },
  {
    id: "ps-7",
    stage: 2,
    text: "The dog can run fast.",
    emoji: "🐶",
    arabic: "الكلب يستطيع الجري بسرعة.",
    scrambledWords: ["fast.", "The", "can", "dog", "run"],
  },
  {
    id: "ps-8",
    stage: 2,
    text: "This is my new book.",
    emoji: "📖",
    arabic: "هذا كتابي الجديد.",
    scrambledWords: ["book.", "This", "my", "is", "new"],
  },
  // Stage 3: Expanded Sentences
  {
    id: "ps-9",
    stage: 3,
    text: "The little boy is playing with a ball.",
    emoji: "⚽",
    arabic: "الولد الصغير يلعب بالكرة.",
    scrambledWords: ["with", "The", "a", "little", "ball.", "boy", "is", "playing"],
  },
  {
    id: "ps-10",
    stage: 3,
    text: "My mother cooks delicious food every day.",
    emoji: "🍲",
    arabic: "أمي تطبخ طعامًا لذيذًا كل يوم.",
    scrambledWords: ["food", "My", "every", "mother", "day.", "cooks", "delicious"],
  },
  {
    id: "ps-11",
    stage: 3,
    text: "The happy dog runs in the garden.",
    emoji: "🌿",
    arabic: "الكلب السعيد يركض في الحديقة.",
    scrambledWords: ["garden.", "The", "in", "happy", "the", "dog", "runs"],
  },
  {
    id: "ps-12",
    stage: 3,
    text: "I go to school with my friends.",
    emoji: "🏫",
    arabic: "أذهب إلى المدرسة مع أصدقائي.",
    scrambledWords: ["friends.", "I", "school", "go", "with", "to", "my"],
  },
];

export interface KidsReadingPassage {
  id: string;
  title: Bilingual;
  emojiScene: string;
  lines: string[];
  questions: {
    prompt: string;
    options: string[];
    correct: number;
  }[];
}

export const STAGE4_READING_PASSAGES: KidsReadingPassage[] = [
  {
    id: "passage-mimi",
    title: { en: "My Little Cat", ar: "قطتي الصغيرة" },
    emojiScene: "🐱 ⚪ ⚽ ❤️",
    lines: [
      "I have a little cat.",
      "Its name is Mimi.",
      "Mimi is white and cute.",
      "It likes to play with a ball.",
      "I love my little cat.",
    ],
    questions: [
      { prompt: "What is the cat's name?", options: ["Mimi", "Sam", "Pip"], correct: 0 },
      { prompt: "What colour is the cat?", options: ["Black", "White", "Brown"], correct: 1 },
      {
        prompt: "What does Mimi like to play with?",
        options: ["A book", "A drum", "A ball"],
        correct: 2,
      },
    ],
  },
  {
    id: "passage-frog",
    title: { en: "The Green Frog", ar: "الضفدع الأخضر" },
    emojiScene: "🐸 🌿 💧 ☀️",
    lines: [
      "Look at the little green frog.",
      "It sits by a blue pond.",
      "The frog can jump very high.",
      "It swims when the sun shines.",
      "The frog is happy in the sun!",
    ],
    questions: [
      {
        prompt: "Where does the frog sit?",
        options: ["On a bed", "By a blue pond", "In a bag"],
        correct: 1,
      },
      {
        prompt: "What can the frog do?",
        options: ["Jump very high", "Drive a bus", "Read a map"],
        correct: 0,
      },
      {
        prompt: "When does the frog swim?",
        options: ["At night", "When the sun shines", "In the snow"],
        correct: 1,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Module 8 — Complete 14-Stage Reading Progression System
// ---------------------------------------------------------------------------

export interface ReadingLadderStage {
  stage: number;
  title: Bilingual;
  checkQuestion: string;
  checkOptions: string[];
  checkCorrect: number;
}

export const READING_LADDER_STAGES: ReadingLadderStage[] = [
  {
    stage: 1,
    title: { en: "Recognise uppercase & lowercase letters", ar: "تمييز الحروف الكبيرة والصغيرة" },
    checkQuestion: "Which lowercase letter matches 'B'?",
    checkOptions: ["d", "b", "p"],
    checkCorrect: 1,
  },
  {
    stage: 2,
    title: { en: "Identify letter names and sounds", ar: "معرفة أسماء وأصوات الحروف" },
    checkQuestion: "What sound starts the word 'ball'?",
    checkOptions: ["/b/", "/s/", "/m/"],
    checkCorrect: 0,
  },
  {
    stage: 3,
    title: { en: "Distinguish vowels and consonants", ar: "التمييز بين المتحركة والساكنة" },
    checkQuestion: "Which group contains ONLY vowels?",
    checkOptions: ["A, E, I, O, U", "B, C, D, F, G", "A, B, E, T, S"],
    checkCorrect: 0,
  },
  {
    stage: 4,
    title: { en: "Recognise individual phonemes", ar: "تمييز الأصوات الفردية (الفونيمات)" },
    checkQuestion: "How many sounds are in 'cat' (/k/ /æ/ /t/)?",
    checkOptions: ["2", "3", "4"],
    checkCorrect: 1,
  },
  {
    stage: 5,
    title: { en: "Understand basic articulation", ar: "فهم مخارج الحروف الأساسية" },
    checkQuestion: "Which sound is VOICED (makes your throat buzz)?",
    checkOptions: ["/p/", "/f/", "/v/"],
    checkCorrect: 2,
  },
  {
    stage: 6,
    title: { en: "Blend individual sounds", ar: "دمج الأصوات الفردية" },
    checkQuestion: "Blend /d/ + /ɒ/ + /ɡ/. What word is it?",
    checkOptions: ["dog", "dig", "dot"],
    checkCorrect: 0,
  },
  {
    stage: 7,
    title: { en: "Read simple CVC words", ar: "قراءة كلمات CVC من ٣ حروف" },
    checkQuestion: "Which CVC word has the short /ʌ/ sound?",
    checkOptions: ["sun", "cat", "bed"],
    checkCorrect: 0,
  },
  {
    stage: 8,
    title: { en: "Read CVCC and CCVC words", ar: "قراءة كلمات CVCC وCCVC" },
    checkQuestion: "Which word starts with a consonant blend (CCVC)?",
    checkOptions: ["frog", "cat", "sun"],
    checkCorrect: 0,
  },
  {
    stage: 9,
    title: { en: "Recognise consonant digraphs", ar: "تمييز الثنائيات الساكنة (sh, ch, th)" },
    checkQuestion: "In 'ship', the two letters SH make how many sounds?",
    checkOptions: ["One sound /ʃ/", "Two sounds /s/ + /h/", "Three sounds"],
    checkCorrect: 0,
  },
  {
    stage: 10,
    title: { en: "Read simple sentences", ar: "قراءة الجمل البسيطة" },
    checkQuestion: "Choose the complete simple sentence:",
    checkOptions: ["The cat is on the bed.", "Cat bed on the.", "Is red bag."],
    checkCorrect: 0,
  },
  {
    stage: 11,
    title: { en: "Read expanded sentences", ar: "قراءة الجمل الموسّعة" },
    checkQuestion: "In 'The happy dog runs in the garden', WHERE does the dog run?",
    checkOptions: ["In the garden", "In the school", "On the bed"],
    checkCorrect: 0,
  },
  {
    stage: 12,
    title: { en: "Read short passages", ar: "قراءة الفقرات القصيرة المصوّرة" },
    checkQuestion: "In 'My Little Cat', what colour is Mimi?",
    checkOptions: ["White", "Blue", "Green"],
    checkCorrect: 0,
  },
  {
    stage: 13,
    title: { en: "Answer comprehension questions", ar: "الإجابة عن أسئلة الفهم القرائي" },
    checkQuestion: "Why is the green frog happy in the story?",
    checkOptions: ["It plays in the sun", "It drives a car", "It eats pizza"],
    checkCorrect: 0,
  },
  {
    stage: 14,
    title: { en: "Read independently with confidence", ar: "القراءة المستقلة بثقة" },
    checkQuestion: "When you see a new word like 'clap', what should you do first?",
    checkOptions: ["Sound out each phoneme and blend!", "Skip the whole page", "Guess randomly"],
    checkCorrect: 0,
  },
];
