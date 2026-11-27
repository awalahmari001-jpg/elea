import type { Bilingual } from "@/content/lesson-types";

/** Standard C5–C6 musical pitch constants (Hz) for the Kids Xylophone / Marimba Song Engine. */
export const PHONICS_NOTES = {
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.0,
  B5: 987.77,
  C6: 1046.5,
} as const;

export interface LetterPhonicsSong {
  letter: string;
  title: Bilingual;
  pureSoundBadge: string;
  actionMove: Bilingual;
  /** 4 rhythmic, singable lines clearly contrasting Letter Name & Pure Sound + anchor words. */
  lyricsEn: [string, string, string, string];
  /** Warm Arabic sing-along companion contrasting Letter Name vs. Pure Sound. */
  lyricsAr: Bilingual["ar"];
  /** Cheerful pentatonic / major-scale xylophone note frequencies (Hz). */
  melodyHz: number[];
  anchorWords: string[];
}

export interface FullPhonicsSongLine {
  id: string;
  emoji: string;
  /** Optional pure phoneme / IPA cue played via Web Audio in sync with this line. */
  phoneme?: string;
  lyricEn: string;
  lyricAr: string;
  melodyHz: number[];
}

export interface FullPhonicsSong {
  id: string;
  emoji: string;
  title: Bilingual;
  subtitle: Bilingual;
  tempoBpm: number;
  focusPhonemes: string[];
  melodyHz: number[];
  lines: FullPhonicsSongLine[];
}

const { G4, A4, C5, D5, E5, F5, G5, A5, C6 } = PHONICS_NOTES;

/**
 * 26 original, kid-friendly, rhythmically singable phonics song verses (A–Z).
 * Every verse clearly contrasts the Letter NAME from its Pure Letter SOUND
 * and avoids bare single letters or repeated-letter strings that TTS spells out.
 */
export const LETTER_PHONICS_SONGS: Record<string, LetterPhonicsSong> = {
  A: {
    letter: "A",
    title: { en: "Crunch the Apple — Letter A Song", ar: "أغنية حرف A — قرمشة التفاحة" },
    pureSoundBadge: "/æ/ · short a (apple)",
    actionMove: {
      en: "Open wide and pretend to crunch a juicy red apple!",
      ar: "افتح فمك وتظاهر بأنك تقضم تفاحة حمراء مقرمشة!",
    },
    lyricsEn: [
      "My name is Letter A, come sing with me today!",
      "Open wide for my pure short sound, the apple-crunching way!",
      "Apple, ant, and alligator marching in a row,",
      "Crunch a sweet red apple — now the sound of A you know!",
    ],
    lyricsAr:
      "اسمي حرف A (/eɪ/)، وصوتي القصير الصافي /æ/ مع فتح الفم: تفاحة apple، نملة ant، وتمساح alligator!",
    melodyHz: [C5, E5, G5, A5, G5, E5, D5, C5],
    anchorWords: ["apple", "ant", "alligator"],
  },
  B: {
    letter: "B",
    title: { en: "Bounce the Ball — Letter B Song", ar: "أغنية حرف B — نطّة الكرة" },
    pureSoundBadge: "/b/ · quick buh (ball)",
    actionMove: {
      en: "Bounce an imaginary big ball up and down with both hands!",
      ar: "اقذف كرة كبيرة خيالية للأعلى والأسفل بكلتا يديك!",
    },
    lyricsEn: [
      "My name is Letter B, bounce along with me!",
      "Press your lips and pop my pure voiced sound so bouncily!",
      "Ball and bag and bright banana bouncing to the beat,",
      "Pop both lips together — Letter B is bouncy and sweet!",
    ],
    lyricsAr:
      "اسمي حرف B (/biː/)، وصوتي الصافي /b/ بضم الشفتين وفتحهما باهتزاز: كرة ball، حقيبة bag، وموزة banana!",
    melodyHz: [C5, D5, E5, G5, E5, D5, E5, C5],
    anchorWords: ["ball", "bag", "banana"],
  },
  C: {
    letter: "C",
    title: { en: "Clever Cat Click — Letter C Song", ar: "أغنية حرف C — نقرة القطة الذكية" },
    pureSoundBadge: "/k/ · crisp k (cat)",
    actionMove: {
      en: "Wiggle cat whiskers by your cheeks and click like a camera!",
      ar: "حرّك أصابعك كشوارب القطة عند خدّيك وأصدر نقرة خفيفة!",
    },
    lyricsEn: [
      "My name is Letter C, listen carefully to me!",
      "My main pure sound is crisp and quick, not the name you see!",
      "Cat and cup and speedy car zooming down the lane,",
      "Click the back of your mouth cleanly — sing that sound again!",
    ],
    lyricsAr:
      "اسمي حرف C (/siː/)، لكن صوتي الأساسي الصافي /k/ خفيف من آخر الفم: قطة cat، كوب cup، وسيارة car!",
    melodyHz: [E5, G5, A5, G5, E5, D5, C5, E5],
    anchorWords: ["cat", "cup", "car"],
  },
  D: {
    letter: "D",
    title: { en: "Drumbeat Dog — Letter D Song", ar: "أغنية حرف D — إيقاع الطبل" },
    pureSoundBadge: "/d/ · quick d (dog)",
    actionMove: {
      en: "Tap an imaginary marching drum with two drumsticks!",
      ar: "اقرع طبلاً خيالياً بعصوي طبل على الإيقاع!",
    },
    lyricsEn: [
      "My name is Letter D, tap a happy drum with me!",
      "Tap your tongue behind top teeth with voice so clearly!",
      "Dog and duck and booming drum dancing down the street,",
      "Tap, tap, tap that steady rhythm — Letter D feels neat!",
    ],
    lyricsAr:
      "اسمي حرف D (/diː/)، وصوتي الصافي /d/ بنقرة مهتزة خلف الأسنان العلوية: كلب dog، بطة duck، وطبل drum!",
    melodyHz: [D5, F5, A5, G5, F5, E5, D5, C5],
    anchorWords: ["dog", "duck", "drum"],
  },
  E: {
    letter: "E",
    title: { en: "Crack the Egg — Letter E Song", ar: "أغنية حرف E — فقس البيضة" },
    pureSoundBadge: "/e/ · short e (egg)",
    actionMove: {
      en: "Tap two fists together and gently crack open a pretend egg!",
      ar: "انقر قبضتيك معاً وتظاهر بفتح بيضة بلطف!",
    },
    lyricsEn: [
      "My name is Letter E, smile a little bit with me!",
      "My pure short sound is bright and quick — listen carefully!",
      "Egg and giant elephant resting by the bed,",
      "Smile and say that crisp short sound — every word well read!",
    ],
    lyricsAr:
      "اسمي حرف E (/iː/)، وصوتي القصير الصافي /e/ بابتسامة خفيفة: بيضة egg، فيل elephant، وسرير bed!",
    melodyHz: [E5, F5, G5, A5, G5, F5, E5, D5],
    anchorWords: ["egg", "elephant", "bed"],
  },
  F: {
    letter: "F",
    title: { en: "Floating Fish Breeze — Letter F Song", ar: "أغنية حرف F — نسيم السمكة السابحة" },
    pureSoundBadge: "/f/ · soft air (fish)",
    actionMove: {
      en: "Swim your hands like a fish and blow a gentle stream of air!",
      ar: "حرّك يديك مثل سمكة تسبح وانفث هواءً لطيفاً!",
    },
    lyricsEn: [
      "My name is Letter F, feel the soft breeze on your hand!",
      "Top teeth touch your lower lip — blow gentle air so grand!",
      "Fish and frog and pretty flower floating by the stream,",
      "No throat buzz, just breezy air — a quiet phonics team!",
    ],
    lyricsAr:
      "اسمي حرف F (/ef/)، وصوتي الصافي /f/ بهواء ناعم دون اهتزاز: سمكة fish، ضفدع frog، وزهرة flower!",
    melodyHz: [F5, A5, C6, A5, G5, F5, E5, C5],
    anchorWords: ["fish", "frog", "flower"],
  },
  G: {
    letter: "G",
    title: { en: "Giggling Goat — Letter G Song", ar: "أغنية حرف G — الماعز المرح" },
    pureSoundBadge: "/ɡ/ · quick g (goat)",
    actionMove: {
      en: "Touch your throat gently to feel the happy back-of-mouth buzz!",
      ar: "ضع أصابعك برفق على حلقك لتشعر بالاهتزاز اللطيف!",
    },
    lyricsEn: [
      "My name is Letter G, come giggle along with me!",
      "My pure hard sound wakes up your throat so warm and happily!",
      "Goat and grapes and birthday gift wrapped in ribbons bright,",
      "Feel that voiced pop in the back — you got the sound just right!",
    ],
    lyricsAr:
      "اسمي حرف G (/dʒiː/)، وصوتي الأساسي الصافي /ɡ/ مهتز من مؤخرة اللسان: ماعز goat، عنب grapes، وهدية gift!",
    melodyHz: [G5, E5, C5, D5, E5, G5, A5, G5],
    anchorWords: ["goat", "grapes", "gift"],
  },
  H: {
    letter: "H",
    title: { en: "Warm Hands Breath — Letter H Song", ar: "أغنية حرف H — نَفَس الدفء" },
    pureSoundBadge: "/h/ · soft breath (hat)",
    actionMove: {
      en: "Hold your palm in front of your mouth and breathe out warm air!",
      ar: "ارفع كفّك أمام فمك وأخرج نَفَساً دافئاً خفيفاً!",
    },
    lyricsEn: [
      "My name is Letter H, hold your palm out wide!",
      "Breathe a warm and gentle puff from deep down inside!",
      "Hat and house and speedy horse trotting on the hill,",
      "Feel warm air upon your palm — soft, whispery, and still!",
    ],
    lyricsAr:
      "اسمي حرف H (/eɪtʃ/)، وصوتي الصافي /h/ نَفَس دافئ خفيف بلا اهتزاز: قبعة hat، منزل house، وحصان horse!",
    melodyHz: [C5, E5, F5, G5, A5, G5, E5, C5],
    anchorWords: ["hat", "house", "horse"],
  },
  I: {
    letter: "I",
    title: { en: "Icy Igloo Hop — Letter I Song", ar: "أغنية حرف I — قفزة الكوخ الجليدي" },
    pureSoundBadge: "/ɪ/ · short i (igloo)",
    actionMove: {
      en: "Shiver playfully and wiggle your fingers like tiny snowflakes!",
      ar: "ارتجف بمرح وحرّك أصابعك مثل ندَف الثلج الصغيرة!",
    },
    lyricsEn: [
      "My name is Letter I, reach up to the sky!",
      "My pure short sound is quick and light — not long and wide!",
      "Igloo, tiny insect, and a bottle of blue ink,",
      "Short and snappy as a hop — quicker than a wink!",
    ],
    lyricsAr:
      "اسمي حرف I (/aɪ/)، وصوتي القصير الصافي /ɪ/ سريع وخفيف: كوخ جليدي igloo، حشرة insect، وحبر ink!",
    melodyHz: [G5, A5, C6, A5, G5, E5, G5, C5],
    anchorWords: ["igloo", "insect", "ink"],
  },
  J: {
    letter: "J",
    title: { en: "Jumping Jam Jar — Letter J Song", ar: "أغنية حرف J — قفزة المربّى" },
    pureSoundBadge: "/dʒ/ · bouncy j (jam)",
    actionMove: {
      en: "Do two happy little jumps in place like a wobbly jellyfish!",
      ar: "اقفز قفزتين مرحتين في مكانك مثل قنديل البحر!",
    },
    lyricsEn: [
      "My name is Letter J, jump and cheer hooray!",
      "Round your lips and bounce my pure voiced sound today!",
      "Jam and juice and jellyfish floating in the blue,",
      "Jump up high with joyful voice — Letter J shines through!",
    ],
    lyricsAr:
      "اسمي حرف J (/dʒeɪ/)، وصوتي الصافي /dʒ/ مرح بضم الشفتين قليلاً: مربى jam، عصير juice، وقنديل jellyfish!",
    melodyHz: [C5, G5, E5, G5, A5, G5, E5, C5],
    anchorWords: ["jam", "juice", "jellyfish"],
  },
  K: {
    letter: "K",
    title: { en: "Flying Kite Click — Letter K Song", ar: "أغنية حرف K — طائرة السماء" },
    pureSoundBadge: "/k/ · crisp k (kite)",
    actionMove: {
      en: "Hold a pretend kite string high up in the breezy sky!",
      ar: "أمسك بخيط طائرة ورقية خيالية عالية في السماء!",
    },
    lyricsEn: [
      "My name is Letter K, fly a kite with me today!",
      "My pure sound is a voiceless puff — clean and crisp to say!",
      "Kite and key and kangaroo hopping up so high,",
      "Back of tongue gives one quick puff beneath the sunny sky!",
    ],
    lyricsAr:
      "اسمي حرف K (/keɪ/)، وصوتي الصافي /k/ نفثة خفيفة بلا اهتزاز: طائرة ورقية kite، مفتاح key، وكنغر kangaroo!",
    melodyHz: [D5, E5, G5, A5, G5, E5, D5, C5],
    anchorWords: ["kite", "key", "kangaroo"],
  },
  L: {
    letter: "L",
    title: { en: "Loving Lion Lullaby — Letter L Song", ar: "أغنية حرف L — أنشودة الأسد اللطيف" },
    pureSoundBadge: "/l/ · smooth l (lion)",
    actionMove: {
      en: "Lift your hand up like your tongue tip lifting behind your top teeth!",
      ar: "ارفع يدك للأعلى مثل طرف لسانك خلف الأسنان العلوية!",
    },
    lyricsEn: [
      "My name is Letter L, listen to my singing bell!",
      "Lift your tongue behind top teeth and glide my pure sound well!",
      "Lion, yellow lemon, and a gentle falling leaf,",
      "Smooth and musical and light — singing brings relief!",
    ],
    lyricsAr:
      "اسمي حرف L (/el/)، وصوتي الصافي /l/ ناعم برفع طرف اللسان خلف الأسنان: أسد lion، ليمون lemon، وورقة leaf!",
    melodyHz: [C5, D5, E5, G5, A5, G5, E5, D5],
    anchorWords: ["lion", "lemon", "leaf"],
  },
  M: {
    letter: "M",
    title: { en: "Yummy Moon Hum — Letter M Song", ar: "أغنية حرف M — همهمة القمر اللذيذة" },
    pureSoundBadge: "/m/ · lip hum (moon)",
    actionMove: {
      en: "Rub your tummy in a circle and hum with closed lips!",
      ar: "امسح على بطنك بحركة دائرية وهمهم بشفتين مغلقتين!",
    },
    lyricsEn: [
      "My name is Letter M, rub your tummy with a grin!",
      "Close both lips and hum my pure warm sound from deep within!",
      "Moon and playful monkey sipping creamy milk at night,",
      "Feel the cozy humming nose — Letter M feels right!",
    ],
    lyricsAr:
      "اسمي حرف M (/em/)، وصوتي الصافي /m/ همهمة دافئة بشفتين مغلقتين: قمر moon، قرد monkey، وحليب milk!",
    melodyHz: [G4, C5, E5, G5, E5, D5, C5, G4],
    anchorWords: ["moon", "monkey", "milk"],
  },
  N: {
    letter: "N",
    title: { en: "Cozy Nest Hum — Letter N Song", ar: "أغنية حرف N — همهمة العش الدافئ" },
    pureSoundBadge: "/n/ · nose hum (nest)",
    actionMove: {
      en: "Point gently near your nose and hum with your tongue tip up!",
      ar: "أشر بلطف قرب أنفك وهمهم مع رفع طرف لسانك!",
    },
    lyricsEn: [
      "My name is Letter N, point right near your nose!",
      "Tongue tip behind your top front teeth — a humming melody flows!",
      "Nest and cute button nose and soccer ball in the net,",
      "Let the gentle nose hum sing — the sweetest sound you get!",
    ],
    lyricsAr:
      "اسمي حرف N (/en/)، وصوتي الصافي /n/ همهمة عبر الأنف مع اللسان خلف الأسنان: عش nest، أنف nose، وشبكة net!",
    melodyHz: [A4, C5, D5, E5, G5, E5, D5, C5],
    anchorWords: ["nest", "nose", "net"],
  },
  O: {
    letter: "O",
    title: { en: "Octopus Circle — Letter O Song", ar: "أغنية حرف O — دائرة الأخطبوط" },
    pureSoundBadge: "/ɒ/ · short o (octopus)",
    actionMove: {
      en: "Make a neat round O with your fingers and wiggle octopus arms!",
      ar: "شكّل دائرة O بأصابعك وحرّك ذراعيك مثل الأخطبوط!",
    },
    lyricsEn: [
      "My name is Letter O, draw a circle nice and slow!",
      "Drop your jaw and round your lips for my pure short sound below!",
      "Octopus and juicy orange swimming by the dock,",
      "Short and round and crystal clear — ticking like a clock!",
    ],
    lyricsAr:
      "اسمي حرف O (/əʊ/)، وصوتي القصير الصافي /ɒ/ بشفتين مستديرتين: أخطبوط octopus، وبرتقالة orange!",
    melodyHz: [C5, E5, G5, C6, G5, E5, D5, C5],
    anchorWords: ["octopus", "orange", "owl"],
  },
  P: {
    letter: "P",
    title: { en: "Popcorn Puff — Letter P Song", ar: "أغنية حرف P — نفثة الفشار" },
    pureSoundBadge: "/p/ · air pop (pen)",
    actionMove: {
      en: "Hold a finger in front of your lips and pop a tiny puff of air!",
      ar: "ضع إصبعك أمام شفتيك وأطلق نفثة هواء صغيرة مثل الفشار!",
    },
    lyricsEn: [
      "My name is Letter P, pop soft air out with me!",
      "No throat buzz at all — just a whisper pop so free!",
      "Pen and cuddly panda sharing warm pizza on a plate,",
      "Press your lips and pop a puff — Letter P is great!",
    ],
    lyricsAr:
      "اسمي حرف P (/piː/)، وصوتي الصافي /p/ نفثة هواء ناعمة بلا اهتزاز: قلم pen، باندا panda، وبيتزا pizza!",
    melodyHz: [E5, G5, C6, G5, E5, G5, E5, C5],
    anchorWords: ["pen", "panda", "pizza"],
  },
  Q: {
    letter: "Q",
    title: { en: "Queen's Crown — Letter Q Song", ar: "أغنية حرف Q — تاج الملكة" },
    pureSoundBadge: "/kw/ · kw blend (queen)",
    actionMove: {
      en: "Place an imaginary sparkly crown gently on top of your head!",
      ar: "ضع تاجاً لامعاً خيالياً بلطف على رأسك!",
    },
    lyricsEn: [
      "My name is Letter Q, always marching with friend U!",
      "Together we blend one crisp quick sound — listen to the cue!",
      "Queen and cozy patchwork quilt with a clever question too,",
      "Blend it cleanly every time — royal phonics true!",
    ],
    lyricsAr:
      "اسمي حرف Q (/kjuː/)، وأصطحب دائماً حرف U لنصنع معاً الصوت الصافي /kw/: ملكة queen، لحاف quilt، وسؤال question!",
    melodyHz: [G5, E5, F5, G5, A5, G5, F5, E5],
    anchorWords: ["queen", "quilt", "question"],
  },
  R: {
    letter: "R",
    title: { en: "Rainbow Rabbit — Letter R Song", ar: "أغنية حرف R — أرنب قوس قزح" },
    pureSoundBadge: "/r/ · curled r (rabbit)",
    actionMove: {
      en: "Paint a big rainbow arc in the air and curl your tongue tip back!",
      ar: "ارسم قوس قزح كبيراً في الهواء واثنِ طرف لسانك قليلاً للخلف!",
    },
    lyricsEn: [
      "My name is Letter R, shining brightly like a star!",
      "Curl your tongue tip gently back — don't touch the roof too far!",
      "Rabbit hopping past a rainbow with a dancing toy robot,",
      "Smooth and warm and voiced so clear — the coolest sound we got!",
    ],
    lyricsAr:
      "اسمي حرف R (/ɑː/)، وصوتي الصافي /r/ بثني طرف اللسان قليلاً للخلف دون لمس السقف: أرنب rabbit، قوس قزح rainbow، وروبوت robot!",
    melodyHz: [C5, D5, E5, F5, G5, A5, G5, E5],
    anchorWords: ["rabbit", "rainbow", "robot"],
  },
  S: {
    letter: "S",
    title: { en: "Sunny Snake Hiss — Letter S Song", ar: "أغنية حرف S — همس الشمس والأفعى" },
    pureSoundBadge: "/s/ · snake hiss (sun)",
    actionMove: {
      en: "Wiggle your arm smoothly like a friendly little garden snake!",
      ar: "حرّك ذراعك بتموّج لطيف مثل أفعى حديقة ودودة!",
    },
    lyricsEn: [
      "My name is Letter S, smile wide and do your best!",
      "Blow a soft and quiet snake hiss — let your throat stay at rest!",
      "Sun and shining golden star and striped cozy sock,",
      "Smooth and gentle voiceless hiss — steady as a clock!",
    ],
    lyricsAr:
      "اسمي حرف S (/es/)، وصوتي الصافي /s/ صفير ناعم بلا اهتزاز: شمس sun، نجمة star، وجورب sock!",
    melodyHz: [G5, F5, E5, D5, E5, F5, G5, C5],
    anchorWords: ["sun", "star", "sock"],
  },
  T: {
    letter: "T",
    title: { en: "Tapping Tiger — Letter T Song", ar: "أغنية حرف T — نقرة النمر السريعة" },
    pureSoundBadge: "/t/ · crisp tap (tiger)",
    actionMove: {
      en: "Turn your head side to side like watching a tiny ticking clock!",
      ar: "حرّك رأسك يميناً ويساراً بلطف مثل عقارب الساعة!",
    },
    lyricsEn: [
      "My name is Letter T, tap along so lightly with me!",
      "Quick voiceless tap behind top teeth — crisp as it can be!",
      "Tiger by a tall green tree watching a speedy train,",
      "Light and bright without throat buzz — tap that sound again!",
    ],
    lyricsAr:
      "اسمي حرف T (/tiː/)، وصوتي الصافي /t/ نقرة خفيفة سريعة بلا اهتزاز: نمر tiger، شجرة tree، وقطار train!",
    melodyHz: [C5, G5, C6, G5, E5, D5, E5, C5],
    anchorWords: ["tiger", "tree", "train"],
  },
  U: {
    letter: "U",
    title: { en: "Up Goes the Umbrella — Letter U Song", ar: "أغنية حرف U — افتح المظلة للأعلى" },
    pureSoundBadge: "/ʌ/ · short u (umbrella)",
    actionMove: {
      en: "Push both hands up over your head like opening a big umbrella!",
      ar: "ارفع يديك فوق رأسك كأنك تفتح مظلة كبيرة!",
    },
    lyricsEn: [
      "My name is Letter U, look up at the sky so blue!",
      "Relax your mouth for my pure short sound — easy, warm, and true!",
      "Umbrella popping up so high beneath the warming sun,",
      "Relaxed and short and crystal clear — short vowels are so fun!",
    ],
    lyricsAr:
      "اسمي حرف U (/juː/)، وصوتي القصير الصافي /ʌ/ بفم مسترخٍ: مظلة umbrella، أعلى up، وشمس sun!",
    melodyHz: [C5, E5, G5, E5, F5, A5, G5, C5],
    anchorWords: ["umbrella", "up", "sun"],
  },
  V: {
    letter: "V",
    title: { en: "Vrooming Van — Letter V Song", ar: "أغنية حرف V — صوت الشاحنة المهتز" },
    pureSoundBadge: "/v/ · buzzing v (van)",
    actionMove: {
      en: "Steer a pretend steering wheel and feel your lower lip tickle!",
      ar: "أمسك مقود سيارة خيالي واشعر بدغدغة الاهتزاز على شفتك السفلية!",
    },
    lyricsEn: [
      "My name is Letter V, steer a happy van with me!",
      "Top teeth touch your lower lip PLUS turn your voice on happily!",
      "Van and sweet violin beside a tall flower vase,",
      "Feel the tickly buzzing voice humming all over the place!",
    ],
    lyricsAr:
      "اسمي حرف V (/viː/)، وصوتي الصافي /v/ بملامسة الأسنان للشفة مع اهتزاز الصوت: شاحنة van، كمان violin، ومزهرية vase!",
    melodyHz: [E5, G5, A5, G5, F5, E5, D5, C5],
    anchorWords: ["van", "violin", "vase"],
  },
  W: {
    letter: "W",
    title: { en: "Water Whale Glide — Letter W Song", ar: "أغنية حرف W — انسياب الحوت في الماء" },
    pureSoundBadge: "/w/ · round glide (water)",
    actionMove: {
      en: "Make tiny round whistle-lips and wave your hands like ocean waves!",
      ar: "ضم شفتيك بدائرة صغيرة ولوّح بيديك مثل أمواج البحر!",
    },
    lyricsEn: [
      "My name is Double-U, make tiny round lips too!",
      "Glide open softly with your voice — smooth and bright and true!",
      "Whale and wrist watch splashing in the cool clean water blue,",
      "Round your lips and glide right out — wonderful sound for you!",
    ],
    lyricsAr:
      "اسمي حرف W (/ˈdʌb.əl.juː/)، وصوتي الصافي /w/ بضم الشفتين ثم فتحهما بانسياب: حوت whale، ساعة watch، وماء water!",
    melodyHz: [C5, D5, E5, G5, E5, G5, A5, C6],
    anchorWords: ["whale", "watch", "water"],
  },
  X: {
    letter: "X",
    title: { en: "Fox in a Box — Letter X Song", ar: "أغنية حرف X — الثعلب والصندوق" },
    pureSoundBadge: "/ks/ · k-s burst (box)",
    actionMove: {
      en: "Cross your arms like a big X and make a crisp two-part pop-hiss!",
      ar: "اقرن ذراعيك بشكل X كبير وأصدر الصوت المزدوج الخفيف /ks/!",
    },
    lyricsEn: [
      "My name is Letter X, cross your arms up high!",
      "At the end of words I make two sounds gliding cleanly by!",
      "Box and clever orange fox and counting up to six,",
      "Quick back click plus soft snake hiss — a tidy phonics mix!",
    ],
    lyricsAr:
      "اسمي حرف X (/eks/)، وصوتي الأساسي الصافي /ks/ في نهاية الكلمات: صندوق box، ثعلب fox، ورقم ستة six!",
    melodyHz: [G5, E5, D5, C5, D5, E5, G5, C5],
    anchorWords: ["box", "fox", "six"],
  },
  Y: {
    letter: "Y",
    title: { en: "Yellow Yo-Yo Glide — Letter Y Song", ar: "أغنية حرف Y — انسياب اليويو الأصفر" },
    pureSoundBadge: "/j/ · soft glide (yellow)",
    actionMove: {
      en: "Roll a pretend yellow yo-yo smoothly up and down!",
      ar: "حرّك لعبة يويو صفراء خيالية للأعلى والأسفل بنعومة!",
    },
    lyricsEn: [
      "My name is Letter Y, wave a bright yellow yo-yo high!",
      "My pure sound is a smiling glide — light as a butterfly!",
      "Yellow lemon, spinning yo-yo, and a furry mountain yak,",
      "Smile and glide your voice right out — forward and right back!",
    ],
    lyricsAr:
      "اسمي حرف Y (/waɪ/)، وصوتي الصافي /j/ انسياب ناعم مثل الياء الخفيفة: أصفر yellow، يويو yo-yo، وياك yak!",
    melodyHz: [E5, F5, G5, C6, A5, G5, E5, C5],
    anchorWords: ["yellow", "yo-yo", "yak"],
  },
  Z: {
    letter: "Z",
    title: { en: "Zipping Zebra Bee — Letter Z Song", ar: "أغنية حرف Z — طنين النحلة والحمار الوحشي" },
    pureSoundBadge: "/z/ · bee buzz (zebra)",
    actionMove: {
      en: "Flap your elbows like a buzzing bee and zip up an imaginary coat!",
      ar: "رفرف بمرفقيك مثل نحلة تطن وأغلق سحّاب معطف خيالي!",
    },
    lyricsEn: [
      "My name is Zed or Zee, buzz along just like a bee!",
      "Turn your throat voice on and let my buzzing sound fly free!",
      "Zebra at the sunny zoo and jackets that go zip,",
      "Buzzing bright from A to Z — we finished our phonics trip!",
    ],
    lyricsAr:
      "اسمي حرف Z (/zed/ أو /ziː/)، وصوتي الصافي /z/ بطنين مهتز مثل النحلة: حمار وحشي zebra، حديقة zoo، وسحّاب zip!",
    melodyHz: [C5, E5, G5, A5, G5, E5, G5, C6],
    anchorWords: ["zebra", "zoo", "zip"],
  },
};

/**
 * 4 complete multi-letter educational phonics songs with synchronized melodies,
 * pure acoustic phoneme cues, emojis, and bilingual sing-along lines.
 */
export const FULL_PHONICS_SONGS: FullPhonicsSong[] = [
  {
    id: "pure-sounds-az",
    emoji: "🎵",
    title: {
      en: "The Pure Sounds A–Z Alphabet Phonics Song",
      ar: "أغنية أصوات الحروف الصافية من A إلى Z",
    },
    subtitle: {
      en: "Sing every letter's pure sound from A to Z with cheerful xylophone notes and anchor words!",
      ar: "غنِّ الصوت الصافي لكل حرف من A إلى Z مع نغمات الإكسيليفون المرحة والكلمات المصوّرة!",
    },
    tempoBpm: 108,
    focusPhonemes: ["/æ/", "/b/", "/k/", "/d/", "/e/", "/f/", "/s/", "/z/"],
    melodyHz: [C5, C5, G5, G5, A5, A5, G5, F5, F5, E5, E5, D5, D5, C5],
    lines: [
      {
        id: "az-1",
        emoji: "🍎⚽🐱🐶",
        phoneme: "/æ/",
        lyricEn: "A says short a for apple, B bounces ball, C clicks cat, and D drums dog!",
        lyricAr: "حرف A بصوت /æ/ في apple، وB في ball، وC في cat، وD في dog!",
        melodyHz: [C5, C5, G5, G5, A5, A5, G5],
      },
      {
        id: "az-2",
        emoji: "🥚🐟🐐👒",
        phoneme: "/f/",
        lyricEn: "E smiles for egg, F blows soft air for fish, G giggles goat, and H breathes hat!",
        lyricAr: "حرف E في egg، وF بهواء ناعم في fish، وG في goat، وH بنَفَس دافئ في hat!",
        melodyHz: [F5, F5, E5, E5, D5, D5, C5],
      },
      {
        id: "az-3",
        emoji: "🏔️🍓🪁🦁",
        phoneme: "/ɪ/",
        lyricEn: "I hops short for igloo, J jumps for jam, K clicks kite, and L lifts for lion!",
        lyricAr: "حرف I القصير في igloo، وJ في jam، وK في kite، وL الناعم في lion!",
        melodyHz: [G5, G5, F5, F5, E5, E5, D5],
      },
      {
        id: "az-4",
        emoji: "🌙🪹🐙🖊️",
        phoneme: "/m/",
        lyricEn: "M hums moon, N hums nest, O rounds short for octopus, and P pops pen!",
        lyricAr: "حرف M يهمهم في moon، وN في nest، وO القصير في octopus، وP بنفثة هواء في pen!",
        melodyHz: [G5, G5, F5, F5, E5, E5, D5],
      },
      {
        id: "az-5",
        emoji: "👑🐰☀️🐯☂️",
        phoneme: "/s/",
        lyricEn: "Q blends queen, R curls rabbit, S hisses sun, T taps tiger, and U lifts umbrella!",
        lyricAr: "حرف Q في queen، وR في rabbit، وS في sun، وT في tiger، وU القصير في umbrella!",
        melodyHz: [C5, C5, G5, G5, A5, A5, G5],
      },
      {
        id: "az-6",
        emoji: "🚐🐋📦💛🦓",
        phoneme: "/z/",
        lyricEn: "V buzzes van, W glides water, X ends box, Y glides yellow, and Z buzzes zebra!",
        lyricAr: "حرف V يهتز في van، وW في water، وX في box، وY في yellow، وZ بطنين في zebra!",
        melodyHz: [F5, F5, E5, E5, D5, D5, C5],
      },
    ],
  },
  {
    id: "five-short-vowels",
    emoji: "🌟",
    title: {
      en: "The 5 Short Vowels Dance Song (a-e-i-o-u)",
      ar: "أغنية ورقصة الحروف المتحركة القصيرة الخمسة (a-e-i-o-u)",
    },
    subtitle: {
      en: "Hear and dance to the five authentic short vowel sounds: /æ/, /e/, /ɪ/, /ɒ/, and /ʌ/!",
      ar: "استمع وتدرّب على أصوات الحروف المتحركة القصيرة الصافية الخمسة: /æ/ و/e/ و/ɪ/ و/ɒ/ و/ʌ/!",
    },
    tempoBpm: 112,
    focusPhonemes: ["/æ/", "/e/", "/ɪ/", "/ɒ/", "/ʌ/"],
    melodyHz: [C5, E5, G5, A5, G5, E5, D5, C5],
    lines: [
      {
        id: "sv-intro",
        emoji: "💃",
        lyricEn: "Five short vowels love to dance and play — clap your hands and sing today!",
        lyricAr: "خمسة حروف متحركة قصيرة تحب اللعب والغناء — صفّق وغنِّ معنا اليوم!",
        melodyHz: [C5, E5, G5, C6, G5, E5],
      },
      {
        id: "sv-a",
        emoji: "🍎",
        phoneme: "/æ/",
        lyricEn: "Short A opens wide for apple and cat — crunch that apple just like that!",
        lyricAr: "حرف A القصير /æ/ يفتح الفم في apple وcat!",
        melodyHz: [C5, D5, E5, G5, E5, C5],
      },
      {
        id: "sv-e",
        emoji: "🥚",
        phoneme: "/e/",
        lyricEn: "Short E smiles bright for egg and bed — crack the egg, every word well read!",
        lyricAr: "حرف E القصير /e/ بابتسامة خفيفة في egg وbed!",
        melodyHz: [D5, E5, F5, A5, G5, E5],
      },
      {
        id: "sv-i",
        emoji: "🏔️",
        phoneme: "/ɪ/",
        lyricEn: "Short I hops quick for igloo and sit — snappy and light, you nailed it!",
        lyricAr: "حرف I القصير /ɪ/ سريع وخفيف في igloo وsit!",
        melodyHz: [E5, G5, A5, C6, A5, G5],
      },
      {
        id: "sv-o",
        emoji: "🐙",
        phoneme: "/ɒ/",
        lyricEn: "Short O rounds neat for octopus and hot — draw a round circle right on the spot!",
        lyricAr: "حرف O القصير /ɒ/ بشفتين مستديرتين في octopus وhot!",
        melodyHz: [G5, F5, E5, D5, E5, G5],
      },
      {
        id: "sv-u",
        emoji: "☂️",
        phoneme: "/ʌ/",
        lyricEn: "Short U relaxes for umbrella and cup — open your umbrella and jump right up!",
        lyricAr: "حرف U القصير /ʌ/ بفم مسترخٍ في umbrella وcup!",
        melodyHz: [F5, E5, D5, C5, G5, C6],
      },
    ],
  },
  {
    id: "soft-air-buzz",
    emoji: "🌬️",
    title: {
      en: "Soft Air & Buzzing Sounds Song (f, s, v, z, h, sh)",
      ar: "أغنية أصوات الهواء الناعم والطنين (f, s, v, z, h, sh)",
    },
    subtitle: {
      en: "Feel the difference between quiet soft-air sounds (f, s, h, sh) and tickly buzzing sounds (v, z)!",
      ar: "اكتشف الفرق بين أصوات الهواء الهادئة (f, s, h, sh) وأصوات الطنين المهتزة (v, z)!",
    },
    tempoBpm: 104,
    focusPhonemes: ["/f/", "/s/", "/v/", "/z/", "/h/", "/ʃ/"],
    melodyHz: [E5, G5, A5, G5, F5, E5, D5, C5],
    lines: [
      {
        id: "ab-f",
        emoji: "🐟",
        phoneme: "/f/",
        lyricEn: "Soft air for fish and frog — quiet breeze without a throat buzz!",
        lyricAr: "صوت /f/ هواء ناعم في fish وfrog بدون اهتزاز في الحلق!",
        melodyHz: [C5, E5, G5, E5, F5, E5],
      },
      {
        id: "ab-v",
        emoji: "🚐",
        phoneme: "/v/",
        lyricEn: "Now turn your voice on for van and violin — feel your lower lip buzz!",
        lyricAr: "الآن شغّل صوتك في van وviolin واشعر بطنين /v/ على الشفة السفلية!",
        melodyHz: [D5, F5, A5, G5, F5, E5],
      },
      {
        id: "ab-s",
        emoji: "☀️",
        phoneme: "/s/",
        lyricEn: "Smile and hiss softly for sun and star — voiceless snake whisper!",
        lyricAr: "ابتسم وأخرج صفير /s/ الناعم في sun وstar بدون اهتزاز!",
        melodyHz: [E5, G5, A5, G5, E5, D5],
      },
      {
        id: "ab-z",
        emoji: "🦓",
        phoneme: "/z/",
        lyricEn: "Switch your bee voice on for zebra and zoo — happy buzzing sound!",
        lyricAr: "شغّل طنين النحلة المهتز /z/ في zebra وzoo!",
        melodyHz: [F5, A5, C6, A5, G5, E5],
      },
      {
        id: "ab-h",
        emoji: "👒",
        phoneme: "/h/",
        lyricEn: "Warm gentle breath on your hand for hat and house — light as a cloud!",
        lyricAr: "نَفَس دافئ خفيف /h/ على يدك في hat وhouse!",
        melodyHz: [G5, E5, D5, C5, D5, E5],
      },
      {
        id: "ab-sh",
        emoji: "🚢",
        phoneme: "/ʃ/",
        lyricEn: "Round your lips softly for ship and shell — hush like gentle ocean waves!",
        lyricAr: "ضم شفتيك قليلاً لصوت /ʃ/ الهادئ في ship وshell مثل أمواج البحر!",
        melodyHz: [G5, A5, G5, E5, D5, C5],
      },
    ],
  },
  {
    id: "bouncy-consonants",
    emoji: "🥁",
    title: {
      en: "Bouncy Consonants Rhythm Song (b, d, g, p, t, k)",
      ar: "أغنية إيقاع الحروف الساكنة النابضة (b, d, g, p, t, k)",
    },
    subtitle: {
      en: "Compare crisp voiceless air pops (p, t, k) with warm voiced bouncy stops (b, d, g)!",
      ar: "قارن بين الأصوات الخفيفة بلا اهتزاز (p, t, k) والأصوات المهتزة النابضة (b, d, g)!",
    },
    tempoBpm: 114,
    focusPhonemes: ["/p/", "/b/", "/t/", "/d/", "/k/", "/ɡ/"],
    melodyHz: [C5, G5, E5, G5, A5, G5, E5, C5],
    lines: [
      {
        id: "bc-pb",
        emoji: "🖊️⚽",
        phoneme: "/p/",
        lyricEn: "Lips together! Soft air pop for pen and panda — now add voice for bouncy ball!",
        lyricAr: "الشفتان معاً! نفثة هواء خفيفة /p/ في pen، ومع اهتزاز الصوت تصبح /b/ في ball!",
        melodyHz: [C5, E5, G5, E5, C5, G5],
      },
      {
        id: "bc-b",
        emoji: "🍌",
        phoneme: "/b/",
        lyricEn: "Bounce the ball and bag and banana — feel your throat wake up on every beat!",
        lyricAr: "اهتزاز دافئ بصوت /b/ في ball وbag وbanana على الإيقاع!",
        melodyHz: [G5, E5, C5, D5, E5, G5],
      },
      {
        id: "bc-td",
        emoji: "🐯🐶",
        phoneme: "/t/",
        lyricEn: "Tongue tip taps! Quiet light tap for tiger and tree — now add voice for drum and dog!",
        lyricAr: "طرف اللسان ينقر! نقرة خفيفة /t/ في tiger وtree، ومع الاهتزاز تصبح /d/ في drum وdog!",
        melodyHz: [D5, F5, A5, F5, D5, A5],
      },
      {
        id: "bc-d",
        emoji: "🦆",
        phoneme: "/d/",
        lyricEn: "Drumbeat for dog and yellow duck — steady, voiced, and clear!",
        lyricAr: "إيقاع واضح بصوت /d/ المهتز في dog وduck وdrum!",
        melodyHz: [A5, G5, F5, E5, D5, C5],
      },
      {
        id: "bc-kg",
        emoji: "🪁🐐",
        phoneme: "/k/",
        lyricEn: "Back of your mouth! Crisp voiceless click for cat and kite — now add voice for goat and grapes!",
        lyricAr: "من مؤخرة الفم! صوت /k/ خفيف في cat وkite، ومع الاهتزاز يصبح /ɡ/ في goat وgrapes!",
        melodyHz: [E5, G5, C6, G5, E5, G5],
      },
      {
        id: "bc-finale",
        emoji: "🎉",
        phoneme: "/ɡ/",
        lyricEn: "Quiet air puffs and bouncy voices — you mastered all six stop sounds, hooray!",
        lyricAr: "نفثات هواء خفيفة وأصوات مهتزة نابضة — لقد أتقنت الأصوات الستة بامتياز!",
        melodyHz: [C5, E5, G5, A5, G5, C6],
      },
    ],
  },
];
