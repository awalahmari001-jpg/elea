import type {
  Bilingual,
  DetailedRuleGuide,
  DialogueTurn,
  L1BridgeNote,
  Lesson,
  RuleBreakdownCard,
} from "./lesson-types";

export interface DeepEslPack {
  ruleBreakdown: RuleBreakdownCard[];
  l1Bridge: L1BridgeNote;
  miniDialogue: DialogueTurn[];
}

/**
 * Curated, classroom-grade ESL deep breakdowns tailored specifically for Arabic-speaking learners.
 * Every grammar topic explicitly spells out pronoun/verb pairings (e.g., "He / She / It takes 'is'"),
 * explains how English structure differs from Arabic, and provides a natural Female ↔ Male conversation.
 */
const GRAMMAR_DEEP_PACKS: Record<string, DeepEslPack> = {
  "a1-introductions": {
    ruleBreakdown: [
      {
        group: "I (First person singular)",
        takes: 'takes "am" (I\'m)',
        example: "I am a student from Jeddah.",
        arabic: "أنا طالب من جدة.",
        note: {
          en: "Never use 'is' or 'are' with 'I'.",
          ar: "لا تستخدم is أو are مع الضمير I أبدًا.",
        },
      },
      {
        group: "He / She / It (Singular — 1 person or thing)",
        takes: "takes \"is\" (He's / She's / It's)",
        example: "He is a doctor. She is my sister. It is warm today.",
        arabic: "هو طبيب. هي أختي. الجو دافئ اليوم.",
        note: {
          en: "Also applies to single names: Ali is, Sara is, Riyadh is.",
          ar: "ينطبق أيضًا على أي اسم مفرد: Ali is، Sara is، Riyadh is.",
        },
      },
      {
        group: "You / We / They (Plural & 'You')",
        takes: "takes \"are\" (You're / We're / They're)",
        example: "You are very kind. We are ready. They are teachers.",
        arabic: "أنت لطيف جدًا. نحن مستعدون. هم معلمون.",
        note: {
          en: "'You' ALWAYS takes 'are', even when talking to one person.",
          ar: "الضمير you يأخذ are دائمًا حتى لو كنت تخاطب شخصًا واحدًا.",
        },
      },
      {
        group: "Negative & Questions (Flip!)",
        takes: 'add "not" / move Am, Is, Are to the front',
        example: "She is not tired. Is she from Abha? Are you ready?",
        arabic: "هي ليست متعبة. هل هي من أبها؟ هل أنت مستعد؟",
      },
    ],
    l1Bridge: {
      arabicHabit: {
        en: 'In Arabic, present-tense identity sentences have no linking verb ("أنا طالب" = literally "I student").',
        ar: 'في العربية الجملة الاسمية في الحاضر لا تحتاج فعل ربط ("أنا طالب" أو "أختي ممرضة").',
      },
      englishRule: {
        en: 'English ALWAYS requires a form of "be" (am / is / are) between the subject and a noun, adjective, or place.',
        ar: "في الإنجليزية يجب دائمًا وضع فعل الكينونة (am أو is أو are) بين الفاعل والاسم أو الصفة أو المكان.",
      },
      keyDifference: {
        en: 'Always ask: "Who is my subject?" Then attach I → am, He / She / It → is, You / We / They → are.',
        ar: "اسأل نفسك دائمًا: من هو الفاعل؟ ثم اختر: I مع am، المفرد مع is، الجمع وyou مع are.",
      },
    },
    miniDialogue: [
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: "Good morning! I am Layla, your English teacher. Are you new in this class?",
        textAr: "صباح الخير! أنا ليلى، معلمتك للغة الإنجليزية. هل أنت جديد في هذا الصف؟",
        focusPhrase: "I am Layla",
      },
      {
        speaker: "Omar",
        gender: "male",
        role: "learner",
        textEn: "Good morning, Teacher Layla! Yes, I am. My name is Omar, and I am from Abha.",
        textAr: "صباح الخير أستاذة ليلى! نعم، أنا جديد. اسمي عمر، وأنا من أبها.",
        focusPhrase: "My name is Omar",
      },
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: "Welcome, Omar! Is your sister Sara in the afternoon group too?",
        textAr: "أهلًا بك يا عمر! هل أختك سارة في مجموعة المساء أيضًا؟",
        focusPhrase: "Is your sister",
      },
      {
        speaker: "Omar",
        gender: "male",
        role: "learner",
        textEn: "Yes, she is! She is a nurse, and we are both very happy to study here.",
        textAr: "نعم، هي كذلك! هي ممرضة، ونحن سعيدان جدًا بالدراسة هنا.",
        focusPhrase: "She is a nurse, and we are",
      },
    ],
  },

  "a1-grammar-articles": {
    ruleBreakdown: [
      {
        group: "Singular noun + Consonant SOUND",
        takes: 'takes "a"',
        example: "I have a notebook and a yellow pen. He studies at a university.",
        arabic: "لدي دفتر وقلم أصفر. هو يدرس في جامعة.",
        note: {
          en: '"University" starts with the /y/ sound ("yoo"), so it takes "a", not "an".',
          ar: 'كلمة university تبدأ بصوت "يو" الساكن، لذا تأخذ a وليس an.',
        },
      },
      {
        group: "Singular noun + Vowel SOUND (a, e, i, o, u sound)",
        takes: 'takes "an"',
        example: "She eats an apple every morning. Wait an hour, please.",
        arabic: "هي تأكل تفاحة كل صباح. انتظر ساعة من فضلك.",
        note: {
          en: 'In "hour", the "h" is silent, so the first sound is a vowel → "an hour".',
          ar: "في كلمة hour حرف h صامت، لذا أول صوت هو علة فنقول an hour.",
        },
      },
      {
        group: "Specific / Known / Unique Noun",
        takes: 'takes "the"',
        example: "The book on my desk is new. The sun is bright today.",
        arabic: "الكتاب الذي على مكتبي جديد. الشمس مشرقة اليوم.",
      },
      {
        group: "General Plurals & Uncountable Nouns",
        takes: "takes ZERO article (no a / an / the)",
        example: "I like coffee. Teachers help students every day.",
        arabic: "أحب القهوة. المعلمون يساعدون الطلاب كل يوم.",
      },
    ],
    l1Bridge: {
      arabicHabit: {
        en: 'Arabic has no word for "a" or "an" ("كتاب" already means "a book"), and Arabic uses "الـ" even for general plural ideas ("أحب القهوة").',
        ar: "العربية لا تحتوي على أداة تنكير (a/an)، وتستخدم «الـ» حتى للأشياء العامة مثل «أحب القهوة».",
      },
      englishRule: {
        en: 'English requires "a" or "an" before almost every single countable noun, and drops "the" when talking about things in general.',
        ar: "الإنجليزية تُلزمك بوضع a أو an قبل المفرد المعدود، وتُحذف the عند الحديث عن الأشياء بصفة عامة.",
      },
      keyDifference: {
        en: 'Never leave a singular countable noun naked: say "I bought a phone", not "I bought phone".',
        ar: "لا تترك الاسم المفرد المعدود بلا أداة: قل I bought a phone وليس I bought phone.",
      },
    },
    miniDialogue: [
      {
        speaker: "Omar",
        gender: "male",
        role: "teacher",
        textEn: "Layla, do you have a spare pen? I forgot my pencil case at home.",
        textAr: "ليلى، هل لديك قلم إضافي؟ نسيت مقلمتي في المنزل.",
        focusPhrase: "a spare pen",
      },
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: "Of course! Take the blue pen on the table, and here is an eraser too.",
        textAr: "بالطبع! خذ القلم الأزرق على الطاولة، وهذه ممحاة أيضًا.",
        focusPhrase: "the blue pen ... an eraser",
      },
      {
        speaker: "Omar",
        gender: "male",
        role: "teacher",
        textEn: "Thanks so much! Our lecture starts in an hour at a university hall nearby.",
        textAr: "شكرًا جزيلًا! محاضرتنا تبدأ خلال ساعة في قاعة جامعية قريبة.",
        focusPhrase: "an hour at a university",
      },
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: "Great! Let's grab coffee first—teachers always need good coffee!",
        textAr: "رائع! لنشرب القهوة أولًا—المعلمون يحتاجون دائمًا قهوة جيدة!",
        focusPhrase: "coffee ... teachers",
      },
    ],
  },

  "a1-grammar-there-is-are": {
    ruleBreakdown: [
      {
        group: "One singular item or uncountable noun",
        takes: 'takes "There is" (There\'s)',
        example: "There is a quiet café on this street. There is cold water in the fridge.",
        arabic: "يوجد مقهى هادئ في هذا الشارع. يوجد ماء بارد في الثلاجة.",
      },
      {
        group: "Two or more plural items",
        takes: 'takes "There are"',
        example: "There are three pharmacies near the station.",
        arabic: "توجد ثلاث صيدليات قرب المحطة.",
      },
      {
        group: "Negative (none)",
        takes: 'takes "There isn\'t a..." / "There aren\'t any..."',
        example: "There isn't a lift here, and there aren't any empty chairs.",
        arabic: "لا يوجد مصعد هنا، ولا توجد أي كراسٍ فارغة.",
      },
      {
        group: "Questions",
        takes: 'starts with "Is there...?" / "Are there...?"',
        example: "Is there a bank nearby? Are there any parks in your neighbourhood?",
        arabic: "هل يوجد بنك قريب؟ هل توجد أي حدائق في حيك؟",
      },
    ],
    l1Bridge: {
      arabicHabit: {
        en: 'Arabic uses one word ("يوجد" / "فيه") whether there is one item or ten items.',
        ar: "في العربية نستخدم كلمة واحدة («يوجد» أو «فيه») سواء كان الشيء مفردًا أو جمعًا.",
      },
      englishRule: {
        en: 'English forces the verb to match the noun that comes AFTER it: "There is" for 1 thing, "There are" for 2+ things.',
        ar: "في الإنجليزية يجب أن يطابق الفعل الاسم الذي يأتي بعده: There is للمفرد، وThere are للجمع.",
      },
      keyDifference: {
        en: 'Never say "Have a park near my house"—to say something exists in a place, always start with "There is / There are".',
        ar: "لا تقل أبدًا Have a park، بل ابدأ دائمًا بـ There is للمفرد أو There are للجمع.",
      },
    },
    miniDialogue: [
      {
        speaker: "Omar",
        gender: "male",
        role: "learner",
        textEn: "Excuse me, Layla. Is there a good bookstore near our school?",
        textAr: "معذرة يا ليلى، هل توجد مكتبة جيدة قرب مدرستنا؟",
        focusPhrase: "Is there a good bookstore",
      },
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: "Yes, there is a big bookstore right across the street, next to the bakery.",
        textAr: "نعم، توجد مكتبة كبيرة مباشرة في الجهة المقابلة، بجانب المخبز.",
        focusPhrase: "there is a big bookstore",
      },
      {
        speaker: "Omar",
        gender: "male",
        role: "learner",
        textEn: "Wonderful! Are there any quiet cafés inside where we can read?",
        textAr: "رائع! هل توجد أي مقاهٍ هادئة بالداخل يمكننا القراءة فيها؟",
        focusPhrase: "Are there any quiet cafés",
      },
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: "There are two cosy reading corners upstairs, and there is free Wi-Fi too.",
        textAr: "يوجد ركنان مريحان للقراءة في الطابق العلوي، ويوجد واي فاي مجاني أيضًا.",
        focusPhrase: "There are two ... there is free Wi-Fi",
      },
    ],
  },

  "a1-grammar-present-simple": {
    ruleBreakdown: [
      {
        group: "I / You / We / They",
        takes: "takes BASE VERB (no -s)",
        example: "I drink tea at seven. We study English every evening.",
        arabic: "أشرب الشاي الساعة السابعة. نحن ندرس الإنجليزية كل مساء.",
      },
      {
        group: "He / She / It (Singular)",
        takes: 'adds "-s" or "-es" to the verb',
        example: "He works at a clinic. She watches the news. It rains in winter.",
        arabic: "هو يعمل في عيادة. هي تشاهد الأخبار. تمطر في الشتاء.",
        note: {
          en: "Add -es after ch, sh, s, x, o (goes, watches, brushes); consonant + y → -ies (studies).",
          ar: "نضيف -es بعد ch/sh/s/x/o مثل goes وwatches، ونحوّل y بعد ساكن إلى ies مثل studies.",
        },
      },
      {
        group: "Negatives (don't vs doesn't)",
        takes: "I/You/We/They → don't + BASE | He/She/It → doesn't + BASE",
        example: "I don't drink coffee at night. My sister doesn't work on Fridays.",
        arabic: "لا أشرب القهوة ليلًا. أختي لا تعمل أيام الجمعة.",
        note: {
          en: 'Once "doesn\'t" appears, DROP the "-s" from the main verb ("doesn\'t work", NEVER "doesn\'t works").',
          ar: "بمجرد ظهور doesn't نحذف حرف s من الفعل الأساسي (doesn't work وليس doesn't works).",
        },
      },
      {
        group: "Questions (Do vs Does)",
        takes: "Do + I/You/We/They + BASE? | Does + He/She/It + BASE?",
        example: "Do you live nearby? Does your brother drive to work?",
        arabic: "هل تسكن قريبًا؟ هل يقود أخوك السيارة للعمل؟",
      },
    ],
    l1Bridge: {
      arabicHabit: {
        en: 'Arabic changes the beginning of the verb for each person (أعمل، يعمل، تعمل) and never needs an extra helper word like "do" or "does" for questions.',
        ar: "في العربية يتغيّر أول الفعل حسب الفاعل (أعمل/يعمل/تعمل)، ولا نحتاج فعلًا مساعدًا مثل do أو does لتكوين السؤال أو النفي.",
      },
      englishRule: {
        en: 'English keeps the verb identical for I/You/We/They, adds "-s/-es" ONLY for He/She/It in affirmative sentences, and brings in "do / does" for questions and negatives.',
        ar: "في الإنجليزية نضيف -s/-es فقط مع المفرد الغائب He/She/It في الإثبات، ونستدعي do أو does في السؤال والنفي.",
      },
      keyDifference: {
        en: 'Think of "does" as a magnet that steals the "-s": He works → Does he work? → He doesn\'t work.',
        ar: "تخيّل أن does مغناطيس يسحب حرف s من الفعل: He works تصبح Does he work? وHe doesn't work.",
      },
    },
    miniDialogue: [
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: "Omar, tell our learners about your weekday routine. What time do you wake up?",
        textAr: "عمر، أخبر طلابنا عن روتينك اليومي. متى تستيقظ؟",
        focusPhrase: "What time do you wake up?",
      },
      {
        speaker: "Omar",
        gender: "male",
        role: "teacher",
        textEn: "I usually wake up at six, drink black coffee, and prepare my lessons before work.",
        textAr: "أستيقظ عادة الساعة السادسة، أشرب القهوة السوداء، وأحضّر دروسي قبل العمل.",
        focusPhrase: "I usually wake up ... drink ... prepare",
      },
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: "Nice! And does your brother Tariq wake up early too?",
        textAr: "جميل! وهل يستيقظ أخوك طارق مبكرًا أيضًا؟",
        focusPhrase: "does your brother Tariq wake up",
      },
      {
        speaker: "Omar",
        gender: "male",
        role: "teacher",
        textEn: "No, he doesn't wake up early! He works the afternoon shift and studies at night.",
        textAr: "لا، هو لا يستيقظ مبكرًا! هو يعمل في الفترة المسائية ويدرس في الليل.",
        focusPhrase: "he doesn't wake up ... He works ... studies",
      },
    ],
  },

  "a1-grammar-present-continuous": {
    ruleBreakdown: [
      {
        group: "I (Right now)",
        takes: 'takes "am + verb-ing"',
        example: "I am writing an email right now.",
        arabic: "أنا أكتب رسالة إلكترونية الآن.",
      },
      {
        group: "He / She / It (Right now)",
        takes: 'takes "is + verb-ing"',
        example: "He is talking on the phone. She is cooking dinner.",
        arabic: "هو يتحدث على الهاتف. هي تطبخ العشاء الآن.",
      },
      {
        group: "You / We / They (Right now)",
        takes: 'takes "are + verb-ing"',
        example: "We are practicing English together at the moment.",
        arabic: "نحن نتدرّب على الإنجليزية معًا في هذه اللحظة.",
      },
      {
        group: "Habit vs. Right Now (Crucial!)",
        takes: "Every day → Present Simple | Right now → am/is/are + -ing",
        example: "Usually he drives to work, but today he is taking the train.",
        arabic: "عادة يقود السيارة للعمل، لكنه اليوم يركب القطار.",
      },
    ],
    l1Bridge: {
      arabicHabit: {
        en: 'Arabic uses one present verb form for both daily habits ("أنا أدرس كل يوم") and actions happening right now ("أنا أدرس الآن").',
        ar: "في العربية نستخدم نفس الفعل المضارع للعادة اليومية (أدرس كل يوم) وللفعل الجاري الآن (أدرس الآن).",
      },
      englishRule: {
        en: 'English strictly separates them: use Present Simple for habits, and "am / is / are + verb-ing" for actions happening right now or temporarily this week.',
        ar: "في الإنجليزية نفرّق بدقة: المضارع البسيط للعادات، وam/is/are + verb-ing لما يحدث الآن لحظة الكلام.",
      },
      keyDifference: {
        en: 'Never drop "am / is / are" before "-ing": say "She is reading", NOT "She reading".',
        ar: "لا تحذف am/is/are قبل الفعل المنتهي بـ -ing أبدًا: قل She is reading وليس She reading.",
      },
    },
    miniDialogue: [
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: "Hi Omar! Are you busy right now, or are you taking a quick break?",
        textAr: "مرحبًا عمر! هل أنت مشغول الآن أم تأخذ استراحة قصيرة؟",
        focusPhrase: "are you taking",
      },
      {
        speaker: "Omar",
        gender: "male",
        role: "teacher",
        textEn:
          "Hi Layla! I am reviewing our students' homework at the moment, and Sara is helping me.",
        textAr: "مرحبًا ليلى! أنا أراجع واجبات طلابنا حاليًا، وسارة تساعدني.",
        focusPhrase: "I am reviewing ... Sara is helping",
      },
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn:
          "Oh, lovely! Look outside—it is raining softly, and everyone is carrying umbrellas.",
        textAr: "جميل جدًا! انظر للخارج—السماء تمطر بلطف، والجميع يحملون المظلات.",
        focusPhrase: "it is raining ... everyone is carrying",
      },
      {
        speaker: "Omar",
        gender: "male",
        role: "teacher",
        textEn: "I see that! Usually we walk home, but today we are calling a taxi.",
        textAr: "أرى ذلك! عادةً نمشي إلى البيت، لكننا اليوم نطلب سيارة أجرة.",
        focusPhrase: "Usually we walk ... today we are calling",
      },
    ],
  },

  "a1-grammar-can-cant": {
    ruleBreakdown: [
      {
        group: "ALL subjects (I / You / He / She / It / We / They)",
        takes: 'takes "can + BASE VERB" (never adds -s, never uses "to")',
        example: "She can swim very well. We can meet at five.",
        arabic: "هي تستطيع السباحة جيدًا. يمكننا أن نلتقي الساعة الخامسة.",
        note: {
          en: 'Say "He can drive", NEVER "He cans drive" and NEVER "He can to drive".',
          ar: "قل He can drive، ولا تقل أبدًا He cans drive أو He can to drive.",
        },
      },
      {
        group: "Negative (Inability / Prohibition)",
        takes: 'takes "cannot / can\'t + BASE VERB"',
        example: "I can't speak Japanese yet, and you can't park here.",
        arabic: "لا أستطيع التحدث باليابانية بعد، ولا يمكنك الوقوف هنا.",
      },
      {
        group: "Questions & Polite Requests",
        takes: 'starts with "Can + Subject + BASE VERB?"',
        example: "Can you open the window? Can I borrow your notes?",
        arabic: "هل يمكنك فتح النافذة؟ هل يمكنني استعارة ملاحظاتك؟",
      },
    ],
    l1Bridge: {
      arabicHabit: {
        en: 'In Arabic we say "يستطيع أن يسبح" using "أن", which tempts learners to add "to" after "can" in English.',
        ar: "في العربية نقول «يستطيع أن يسبح» مع حرف «أن»، مما يجعل المتعلم يضيف to خطأً بعد can.",
      },
      englishRule: {
        en: '"Can" is a modal verb: it stays identical for every subject and connects directly to the bare base verb with NO "to" and NO "-s".',
        ar: "الفعل can من الأفعال الناقصة: يبقى ثابتًا مع كل الضمائر ويتبعه الفعل المجرد مباشرة بدون to وبدون s.",
      },
      keyDifference: {
        en: 'Remember the golden equation: Subject + can / can\'t + bare verb ("She can cook").',
        ar: "احفظ المعادلة الذهبية: الفاعل + can / can't + الفعل المجرد مباشرة (She can cook).",
      },
    },
    miniDialogue: [
      {
        speaker: "Omar",
        gender: "male",
        role: "learner",
        textEn:
          "Teacher Layla, can you help me with this pronunciation? I can't say it smoothly yet.",
        textAr: "أستاذة ليلى، هل يمكنك مساعدتي في هذا النطق؟ لا أستطيع نطقه بسلاسة بعد.",
        focusPhrase: "can you help ... can't say",
      },
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: "Of course I can! Listen slowly, and then you can repeat it right after me.",
        textAr: "بالطبع أستطيع! استمع ببطء، وبعدها يمكنك ترديده بعدي مباشرة.",
        focusPhrase: "I can ... you can repeat",
      },
      {
        speaker: "Omar",
        gender: "male",
        role: "learner",
        textEn: "Thank you! Can we also record it on my phone so I can practice at home?",
        textAr: "شكرًا لك! هل يمكننا تسجيله على هاتفي أيضًا لأتدرب في البيت؟",
        focusPhrase: "Can we also record ... I can practice",
      },
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: "Yes, you can! With five minutes a day, anyone can master clear English.",
        textAr: "نعم بالتأكيد! بخمس دقائق يوميًا يستطيع أي شخص إتقان إنجليزية واضحة.",
        focusPhrase: "you can ... anyone can master",
      },
    ],
  },

  "a2-past": {
    ruleBreakdown: [
      {
        group: "Past of 'be': I / He / She / It",
        takes: 'takes "was" / "wasn\'t"',
        example: "I was at the library yesterday. The weather was cool.",
        arabic: "كنتُ في المكتبة أمس. كان الطقس لطيفًا.",
      },
      {
        group: "Past of 'be': You / We / They",
        takes: 'takes "were" / "weren\'t"',
        example: "We were tired after the trip. Were you at home last night?",
        arabic: "كنا متعبين بعد الرحلة. هل كنت في المنزل ليلة أمس؟",
      },
      {
        group: "Action Verbs (Affirmative Past)",
        takes: "Regular: verb + -ed | Irregular: V2 (went, saw, ate)",
        example: "We visited Al-Ula last winter and saw amazing rock formations.",
        arabic: "زرنا العلا الشتاء الماضي ورأينا تشكيلات صخرية مذهلة.",
      },
      {
        group: "Action Verbs (Questions & Negatives)",
        takes: 'uses "did / didn\'t + BASE VERB" (drop -ed!)',
        example: "Did you enjoy the meal? No, I didn't go to the café yesterday.",
        arabic: "هل استمتعت بالوجبة؟ لا، لم أذهب إلى المقهى أمس.",
        note: {
          en: '"Did" already carries the past time, so keep the main verb in base form ("Did you go?", NEVER "Did you went?").',
          ar: "تحمل did زمن الماضي بالفعل، لذا يعود الفعل الأساسي إلى أصله المجرد (Did you go? وليس Did you went?).",
        },
      },
    ],
    l1Bridge: {
      arabicHabit: {
        en: 'In Arabic, a negative past sentence uses "لم" + present form or "ما" + past verb, so learners often keep the past verb after "didn\'t" ("I didn\'t went").',
        ar: "في العربية نستخدم «ما ذهبتُ» مع بقاء الفعل ماضيًا، مما يجعل المتعلم يقول خطأً I didn't went.",
      },
      englishRule: {
        en: 'In English Past Simple, ONLY the affirmative sentence uses the past verb (-ed or V2). In questions and negatives, "did / didn\'t" takes the past job and the main verb returns to base form.',
        ar: "في الماضي البسيط الإنجليزي يظهر التصريف الثاني في الإثبات فقط، أما في السؤال والنفي فتتولى did/didn't الماضي ويعود الفعل إلى المصدر.",
      },
      keyDifference: {
        en: 'One past marker per clause: "She went" → "She didn\'t go" → "Did she go?"',
        ar: "علامة ماضٍ واحدة فقط في الجملة: She went ← She didn't go ← Did she go?",
      },
    },
    miniDialogue: [
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: "Welcome back, Omar! How was your weekend? Did you visit your family?",
        textAr: "أهلًا بعودتك يا عمر! كيف كانت عطلتك؟ هل زرت عائلتك؟",
        focusPhrase: "How was ... Did you visit",
      },
      {
        speaker: "Omar",
        gender: "male",
        role: "teacher",
        textEn:
          "It was wonderful! We drove to Taif on Friday morning and stayed until Saturday evening.",
        textAr: "كانت رائعة! قدنا السيارة إلى الطائف صباح الجمعة وبقينا حتى مساء السبت.",
        focusPhrase: "It was ... We drove ... stayed",
      },
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: "That sounds relaxing! Were the roads busy on your way back?",
        textAr: "يبدو ذلك مريحًا! هل كانت الطرق مزدحمة في طريق العودة؟",
        focusPhrase: "Were the roads busy",
      },
      {
        speaker: "Omar",
        gender: "male",
        role: "teacher",
        textEn: "Not at all—we left early, so we didn't hit any traffic at all.",
        textAr: "أبدًا—غادرنا باكرًا، فلم نواجه أي ازدحام مروري.",
        focusPhrase: "we left ... didn't hit",
      },
    ],
  },

  "a2-grammar-past-continuous": {
    ruleBreakdown: [
      {
        group: "I / He / She / It (Background action)",
        takes: 'takes "was + verb-ing"',
        example: "I was cooking dinner when the doorbell rang.",
        arabic: "كنتُ أطبخ العشاء عندما رنّ جرس الباب.",
      },
      {
        group: "You / We / They (Background action)",
        takes: 'takes "were + verb-ing"',
        example: "They were walking in the park when it started to rain.",
        arabic: "كانوا يمشون في الحديقة عندما بدأ المطر.",
      },
      {
        group: "The Sudden Interruption",
        takes: 'uses "when + Past Simple" (short action)',
        example: "She was reading when her friend called.",
        arabic: "كانت تقرأ عندما اتصلت صديقتها.",
      },
      {
        group: "Two Parallel Ongoing Actions",
        takes: 'uses "while + was/were + verb-ing"',
        example: "While Omar was preparing slides, Layla was checking the audio.",
        arabic: "بينما كان عمر يجهّز الشرائح، كانت ليلى تفحص الصوت.",
      },
    ],
    l1Bridge: {
      arabicHabit: {
        en: 'Arabic uses "كان يقرأ" for ongoing past, which matches well—the main trap is forgetting to match "was" (singular) vs "were" (plural) or forgetting Past Simple for the sudden event.',
        ar: "تتشابه الصيغة مع «كان يقرأ» في العربية، لكن الخطأ الشائع هو الخلط بين was وwere أو نسيان الماضي البسيط للحدث المفاجئ.",
      },
      englishRule: {
        en: 'Pair the long background movie ("was / were + -ing") with the short sudden flash ("when + Past Simple").',
        ar: "اجمع بين المشهد المستمر في الخلفية (was/were + -ing) والحدث المفاجئ القصير (when + الماضي البسيط).",
      },
      keyDifference: {
        en: "Long action = was/were + -ing; sudden interruption = Past Simple (rang, knocked, arrived).",
        ar: "الفعل الطويل المستمر = was/were + -ing، والحدث القاطع المفاجئ = ماضٍ بسيط.",
      },
    },
    miniDialogue: [
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: "Omar, I tried calling you at eight last night. What were you doing?",
        textAr: "عمر، حاولت الاتصال بك الساعة الثامنة ليلة أمس. ماذا كنت تفعل؟",
        focusPhrase: "What were you doing?",
      },
      {
        speaker: "Omar",
        gender: "male",
        role: "teacher",
        textEn: "Sorry I missed it! I was driving home when my phone battery died.",
        textAr: "آسف لفوات الاتصال! كنت أقود إلى المنزل عندما نفدت بطارية هاتفي.",
        focusPhrase: "I was driving ... when my phone battery died",
      },
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: "No worries at all! While you were driving, I was finishing our new reading quiz.",
        textAr: "لا بأس أبدًا! بينما كنت تقود، كنتُ أُنهي اختبار القراءة الجديد.",
        focusPhrase: "While you were driving, I was finishing",
      },
      {
        speaker: "Omar",
        gender: "male",
        role: "teacher",
        textEn: "That's awesome—and right when I got home, I plugged it in and saw your message.",
        textAr: "رائع—وفور وصولي للمنزل، وصلت الهاتف بالشاحن ورأيت رسالتك.",
        focusPhrase: "when I got home",
      },
    ],
  },

  "a2-grammar-present-perfect-basics": {
    ruleBreakdown: [
      {
        group: "I / You / We / They",
        takes: 'takes "have + Past Participle (V3)"',
        example: "I have visited Oman twice. They have finished the project.",
        arabic: "لقد زرتُ عُمان مرتين. لقد أنهوا المشروع.",
      },
      {
        group: "He / She / It (Singular)",
        takes: 'takes "has + Past Participle (V3)"',
        example: "She has lived in Riyadh for five years. He has just arrived.",
        arabic: "هي تعيش في الرياض منذ خمس سنوات. لقد وصل للتو.",
      },
      {
        group: "For (Duration) vs. Since (Starting Point)",
        takes: "for + length of time | since + exact start point",
        example: "We have studied here for three months / since January.",
        arabic: "نحن ندرس هنا لمدة ثلاثة أشهر / منذ يناير.",
      },
      {
        group: "Finished Past Time? Switch Tense!",
        takes: "yesterday / last year / in 2022 → Past Simple (NOT have/has)",
        example: "I have seen that film before. I saw it last Friday.",
        arabic: "لقد شاهدتُ ذلك الفيلم من قبل. شاهدتُه الجمعة الماضية.",
      },
    ],
    l1Bridge: {
      arabicHabit: {
        en: 'Arabic has only one past tense for both unspecified life experiences ("زرت لندن") and dated past events ("زرت لندن عام ٢٠٢٢").',
        ar: "تستخدم العربية زمنًا ماضيًا واحدًا للتجربة دون تحديد وقت (زرت لندن) وللحدث المؤرّخ (زرت لندن عام ٢٠٢٢).",
      },
      englishRule: {
        en: 'English splits them: Present Perfect (have/has + V3) connects the past to NOW with no finished date; Past Simple is mandatory the moment you name a finished time like "yesterday" or "in 2022".',
        ar: "تُفرّق الإنجليزية بينهما: المضارع التام (have/has + V3) يربط الماضي بالحاضر دون وقت منتهٍ، بينما الماضي البسيط إلزامي فور ذكر وقت محدد منتهٍ مثل yesterday أو in 2022.",
      },
      keyDifference: {
        en: "No finished time marker → have/has + V3. Specific past date → Past Simple.",
        ar: "بدون وقت ماضٍ محدد ← have/has + V3. مع تاريخ ماضٍ محدد ← ماضٍ بسيط.",
      },
    },
    miniDialogue: [
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: "Omar, have you ever visited the new museum downtown?",
        textAr: "عمر، هل سبق لك زيارة المتحف الجديد في وسط المدينة؟",
        focusPhrase: "have you ever visited",
      },
      {
        speaker: "Omar",
        gender: "male",
        role: "teacher",
        textEn:
          "Yes, I have! I went there last month, and I have already recommended it to my class.",
        textAr: "نعم، لقد زرته! ذهبتُ إلى هناك الشهر الماضي، وقد أوصيتُ طلابي به بالفعل.",
        focusPhrase: "I have ... I went ... have already recommended",
      },
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: "Has your sister seen the calligraphy hall yet?",
        textAr: "هل شاهدت أختك قاعة الخط العربي بعد؟",
        focusPhrase: "Has your sister seen",
      },
      {
        speaker: "Omar",
        gender: "male",
        role: "teacher",
        textEn: "Not yet, she hasn't had time this week, but she has wanted to go since March.",
        textAr: "ليس بعد، لم يتوفر لها وقت هذا الأسبوع، لكنها تريد الذهاب منذ مارس.",
        focusPhrase: "hasn't had ... has wanted ... since March",
      },
    ],
  },

  "kids-my-family": {
    ruleBreakdown: [
      {
        group: "I / You / We / They",
        takes: 'takes "have got"',
        example: "I have got a blue backpack. We have got two funny cats.",
        arabic: "لدي حقيبة ظهر زرقاء. لدينا قطتان مرحتان.",
      },
      {
        group: "He / She / It (1 person or animal)",
        takes: 'takes "has got"',
        example: "Sara has got a white rabbit. My brother has got a red bike.",
        arabic: "سارة لديها أرنب أبيض. أخي لديه دراجة حمراء.",
      },
      {
        group: "Colour / Size BEFORE the Noun!",
        takes: "Colour + Noun (a red ball)",
        example: "Look! It is a big green kite.",
        arabic: "انظر! إنها طائرة ورقية خضراء كبيرة.",
        note: {
          en: 'In Arabic we say "كرة حمراء" (ball red), but in English the colour ALWAYS jumps in front: "a red ball"!',
          ar: "في العربية نقول «كرة حمراء»، أما في الإنجليزية فاللون يقفز دائمًا قبل الاسم: a red ball!",
        },
      },
    ],
    l1Bridge: {
      arabicHabit: {
        en: 'In Arabic, the describing word comes AFTER the noun ("قطة بيضاء" = cat white).',
        ar: "في العربية تأتي الصفة واللون بعد الاسم («قطة بيضاء»).",
      },
      englishRule: {
        en: 'In English, the colour or size ALWAYS comes BEFORE the noun ("a white cat"), and singular subjects (He / She / It) take "has got".',
        ar: "في الإنجليزية يأتي اللون والحجم دائمًا قبل الاسم (a white cat)، ويأخذ المفرد (He/She/It) صيغة has got.",
      },
      keyDifference: {
        en: 'Colour first, noun second — and remember: He / She / It takes "has got"!',
        ar: "اللون أولًا ثم الاسم ثانيًا — وتذكّر: He / She / It تأخذ has got!",
      },
    },
    miniDialogue: [
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: "Hi Tariq! Have you got a pet at home?",
        textAr: "مرحبًا يا طارق! هل لديك حيوان أليف في البيت؟",
        focusPhrase: "Have you got",
      },
      {
        speaker: "Tariq",
        gender: "male",
        role: "learner",
        textEn: "Yes! I have got a little yellow bird, and my sister Sara has got a white cat.",
        textAr: "نعم! لدي عصفور أصفر صغير، وأختي سارة لديها قطة بيضاء.",
        focusPhrase: "I have got a little yellow bird ... Sara has got a white cat",
      },
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: "How cute! Has your cat got a favourite toy?",
        textAr: "ما ألطفها! هل لدى قطتك لعبة مفضلة؟",
        focusPhrase: "Has your cat got",
      },
      {
        speaker: "Tariq",
        gender: "male",
        role: "learner",
        textEn: "Yes, she has! She loves her soft red ball.",
        textAr: "نعم لديها! إنها تحب كرتها الحمراء الناعمة.",
        focusPhrase: "soft red ball",
      },
    ],
  },

  "kids-present-simple": {
    ruleBreakdown: [
      {
        group: "I / You / We / They",
        takes: "takes simple verb (play, eat, read)",
        example: "I eat breakfast at seven. We play football after school.",
        arabic: "أتناول الفطور الساعة السابعة. نلعب كرة القدم بعد المدرسة.",
      },
      {
        group: "He / She / It (1 person, e.g., Maya, Omar)",
        takes: 'adds "-s" or "-es" (eats, plays, brushes)',
        example: "Maya brushes her teeth and walks to school every morning.",
        arabic: "مايا تنظّف أسنانها وتمشي إلى المدرسة كل صباح.",
      },
      {
        group: "Clock Times & Days",
        takes: '"at" + clock time | "on" + day',
        example: "School starts at eight o'clock on Sunday.",
        arabic: "تبدأ المدرسة الساعة الثامنة يوم الأحد.",
      },
    ],
    l1Bridge: {
      arabicHabit: {
        en: 'Arabic does not add a letter at the END of daily-habit verbs for "he" or "she".',
        ar: "في العربية لا نضيف حرفًا في نهاية الفعل للمفرد الغائب في العادات اليومية.",
      },
      englishRule: {
        en: 'In English daily habits, whenever the subject is 1 other person (he, she, it, Maya, Omar), attach "-s" or "-es" to the verb!',
        ar: "في العادات اليومية بالإنجليزية، متى كان الفاعل مفردًا غائبًا (he/she/it أو اسم شخص واحد) نضيف -s أو -es للفعل!",
      },
      keyDifference: {
        en: 'One friend (He / She / It) → verb + s! Ask with "Does" and drop the -s.',
        ar: "صديق واحد (He / She / It) ← فعل + s! وعند السؤال بـ Does نحذف s.",
      },
    },
    miniDialogue: [
      {
        speaker: "Sara",
        gender: "female",
        role: "learner",
        textEn: "Tariq, what time do you get up on school days?",
        textAr: "طارق، متى تستيقظ في أيام المدرسة؟",
        focusPhrase: "what time do you get up",
      },
      {
        speaker: "Tariq",
        gender: "male",
        role: "learner",
        textEn: "I wake up at six thirty and eat breakfast with my family.",
        textAr: "أستيقظ الساعة السادسة والنصف وأتناول الفطور مع عائلتي.",
        focusPhrase: "I wake up at six thirty",
      },
      {
        speaker: "Sara",
        gender: "female",
        role: "learner",
        textEn: "Does your little brother walk to school with you?",
        textAr: "هل يمشي أخوك الصغير إلى المدرسة معك؟",
        focusPhrase: "Does your little brother walk",
      },
      {
        speaker: "Tariq",
        gender: "male",
        role: "learner",
        textEn: "Yes! He carries his green bag and reads his storybook on the bus.",
        textAr: "نعم! هو يحمل حقيبته الخضراء ويقرأ قصته في الحافلة.",
        focusPhrase: "He carries ... reads",
      },
    ],
  },

  "adults-grammar-questions": {
    ruleBreakdown: [
      {
        group: "Action-Verb Questions (QuASM Order)",
        takes: "Question word + do / does / did + Subject + BASE verb?",
        example: "Where do you work? What time does the clinic open? When did you arrive?",
        arabic: "أين تعمل؟ متى تفتح العيادة؟ متى وصلت؟",
      },
      {
        group: "Questions with Adjectives / Nouns / Places (No action verb)",
        takes: "Am / Is / Are / Was / Were + Subject + complement?",
        example: "Are you ready for the call? Is your office downtown?",
        arabic: "هل أنت مستعد للمكالمة؟ هل مكتبك في وسط المدينة؟",
        note: {
          en: 'Never use "Do" with an adjective: say "Are you busy?", NOT "Do you busy?".',
          ar: "لا تستخدم Do مع الصفة أبدًا: قل Are you busy? وليس Do you busy?.",
        },
      },
      {
        group: "He / She / It vs. I / You / We / They",
        takes: "Does + He/She/It + BASE | Do + I/You/We/They + BASE",
        example: "Does she work on Thursdays? Do they accept card payments?",
        arabic: "هل تعمل يوم الخميس؟ هل يقبلون الدفع بالبطاقة؟",
      },
    ],
    l1Bridge: {
      arabicHabit: {
        en: 'In Arabic, you can turn any statement into a question just by adding "هل" or raising your voice ("أنت تعمل هنا؟").',
        ar: "في العربية نكوّن السؤال بوضع «هل» أو بتغيير نبرة الصوت فقط («أنت تعمل هنا؟»).",
      },
      englishRule: {
        en: 'English requires a structural switch: bring an auxiliary verb (do / does / did) or "be" (am / is / are) BEFORE the subject.',
        ar: "في الإنجليزية لا تكفي نبرة الصوت؛ بل يجب تقديم فعل مساعد (do / does / did) أو فعل كينونة (am / is / are) قبل الفاعل.",
      },
      keyDifference: {
        en: "Action verb → start with Do/Does/Did. Adjective or noun → start with Am/Is/Are.",
        ar: "مع فعل حركة ← ابدأ بـ Do/Does/Did. مع صفة أو اسم ← ابدأ بـ Am/Is/Are.",
      },
    },
    miniDialogue: [
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: "Good afternoon, Omar! Are you ready for our new client meeting?",
        textAr: "مساء الخير يا عمر! هل أنت مستعد لاجتماع العميل الجديد؟",
        focusPhrase: "Are you ready",
      },
      {
        speaker: "Omar",
        gender: "male",
        role: "teacher",
        textEn: "Almost ready! What time does the meeting start, and where do they usually park?",
        textAr: "مستعد تقريبًا! متى يبدأ الاجتماع، وأين يوقفون سياراتهم عادة؟",
        focusPhrase: "What time does the meeting start ... where do they",
      },
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: "It starts at two o'clock. Did you send them the building map yesterday?",
        textAr: "يبدأ الساعة الثانية. هل أرسلت لهم خريطة المبنى أمس؟",
        focusPhrase: "Did you send",
      },
      {
        speaker: "Omar",
        gender: "male",
        role: "teacher",
        textEn: "Yes, I did! I emailed it right after lunch so everything is clear.",
        textAr: "نعم فعلت! أرسلتها بالبريد بعد الغداء مباشرة حتى يكون كل شيء واضحًا.",
        focusPhrase: "Yes, I did!",
      },
    ],
  },
};

function buildRuleBreakdownFromGuide(
  lesson: Lesson,
  guide?: DetailedRuleGuide,
): RuleBreakdownCard[] {
  const curated = GRAMMAR_DEEP_PACKS[lesson.id];
  if (curated) return curated.ruleBreakdown;

  if (guide && guide.formulas.length > 0) {
    return guide.formulas.slice(0, 4).map((f) => ({
      group: f.label.en,
      takes: f.pattern,
      example: f.example,
      arabic: f.arabic,
    }));
  }

  if (lesson.skill === "listening" && lesson.listeningPlan) {
    return lesson.listeningPlan.paraphrasePairs.slice(0, 4).map((p) => ({
      group: `Spoken Audio: "${p.spoken}"`,
      takes: `Means: "${p.equivalent}"`,
      example: `When the speaker says "${p.spoken}", match it to "${p.equivalent}".`,
      arabic: p.arabic,
    }));
  }

  if (lesson.skill === "writing" && lesson.writing) {
    return [
      {
        group: "Step 1 · Opening & Clear Purpose",
        takes: "State your main point in sentence 1",
        example: lesson.pronunciation,
        arabic: "ابدأ بجملة افتتاحية واضحة تحدد هدف رسالتك أو مقالك مباشرة.",
      },
      {
        group: "Step 2 · Supporting Details",
        takes: "Add 2 clear reasons or examples",
        example: lesson.teaching[0]?.en ?? lesson.goal.en,
        arabic: lesson.teaching[0]?.ar ?? lesson.goal.ar,
      },
      {
        group: "Step 3 · Word Target & Accuracy Check",
        takes: `Write ${lesson.writing.minimum}+ clear words`,
        example:
          lesson.teaching[1]?.en ??
          "Check verb tenses, articles, and punctuation before submitting.",
        arabic:
          lesson.teaching[1]?.ar ?? "راجع الأزمنة وأدوات التعريف وعلامات الترقيم قبل التسليم.",
      },
    ];
  }

  // Speaking or general fallback
  return [
    {
      group: "1. Direct Answer",
      takes: "Answer clearly in 1 natural sentence",
      example: lesson.pronunciation,
      arabic: "أجب مباشرة بجملة إنجليزية طبيعية وواضحة.",
    },
    {
      group: "2. Core Language Rule",
      takes: lesson.taskPlan?.languageFocus.en ?? lesson.title.en,
      example: lesson.teaching[0]?.en ?? lesson.goal.en,
      arabic: lesson.teaching[0]?.ar ?? lesson.goal.ar,
    },
    {
      group: "3. Natural Rhythm & Delivery",
      takes: "Speak in smooth thought groups, not word by word",
      example: lesson.pronunciationTip.en,
      arabic: lesson.pronunciationTip.ar,
    },
  ];
}

function buildL1BridgeForLesson(lesson: Lesson, guide?: DetailedRuleGuide): L1BridgeNote {
  const curated = GRAMMAR_DEEP_PACKS[lesson.id];
  if (curated) return curated.l1Bridge;

  const id = lesson.id.toLowerCase();
  if (id.includes("passive")) {
    return {
      arabicHabit: {
        en: 'Arabic often uses an active sentence or "تم + مصدر" ("تم إرسال التقرير") where English shifts smoothly to Passive Voice.',
        ar: "تستخدم العربية كثيرًا «تم + المصدر» مثل «تم إرسال التقرير» بدل صيغة المبني للمجهول الإنجليزية.",
      },
      englishRule: {
        en: 'English builds the Passive with: Subject + appropriate form of "be" (is/are/was/were/has been) + Past Participle (V3).',
        ar: "يُبنى المبني للمجهول بالإنجليزية من: المفعول به + صيغة مناسبة من be (مثل is/are/was/were) + التصريف الثالث V3.",
      },
      keyDifference: {
        en: 'Always include BOTH parts: a form of "be" AND the past participle ("The report was sent", never "The report sent").',
        ar: "لا تنسَ الجزأين معًا: فعل be + التصريف الثالث (The report was sent).",
      },
    };
  }
  if (id.includes("relative")) {
    return {
      arabicHabit: {
        en: 'Arabic keeps a returning object pronoun inside relative clauses ("الكتاب الذي قرأته" = literally "the book that I read it").',
        ar: "تحتفظ العربية بضمير عائد داخل جملة الوصل («الكتاب الذي قرأتُه»).",
      },
      englishRule: {
        en: 'English drops the extra pronoun because "who / which / that" already plays that role: "the book that I read" (NO "it").',
        ar: "تحذف الإنجليزية الضمير العائد لأن who/which/that تقوم بدوره: the book that I read بدون it.",
      },
      keyDifference: {
        en: 'Use "who" for people, "which" for things, "that" for either—and never add a shadow "it / him / her" at the end.',
        ar: "استخدم who للأشخاص وwhich للأشياء ولا تكرر it أو him في نهاية الجملة.",
      },
    };
  }
  if (id.includes("conditional") || id.includes("hypothetical")) {
    return {
      arabicHabit: {
        en: "Arabic conditional clauses do not shift the verb backward in tense the way English 2nd and 3rd conditionals do.",
        ar: "لا تغيّر العربية زمن الفعل بعد أداة الشرط بالطريقة الصارمة نفسها في الشرط الثاني والثالث بالإنجليزية.",
      },
      englishRule: {
        en: "English locks both halves together: 1st (If + Present → will), 2nd (If + Past Simple → would), 3rd (If + had + V3 → would have + V3).",
        ar: "تربط الإنجليزية نصفي الجملة بدقة: النوع الأول (مضارع ← will)، الثاني (ماضٍ ← would)، الثالث (had + V3 ← would have + V3).",
      },
      keyDifference: {
        en: 'Never put "will" or "would" inside the "if" clause itself—keep "will / would" strictly in the result clause.',
        ar: "لا تضع will أو would داخل جملة if أبدًا؛ اتركهما دائمًا في جملة النتيجة.",
      },
    };
  }
  if (id.includes("reported")) {
    return {
      arabicHabit: {
        en: 'Arabic keeps the original tense and often keeps "قال أن" with present verbs when reporting speech.',
        ar: "تُبقي العربية غالبًا الزمن الأصلي عند نقل الكلام بعد «قال إن».",
      },
      englishRule: {
        en: 'When the reporting verb is past ("She said / told me"), English usually shifts tenses one step back (is → was, will → would, can → could) and updates pronouns & time words.',
        ar: "عندما يكون فعل النقل في الماضي (said/told)، تُرجِع الإنجليزية الزمن خطوة للوراء وتعدّل الضمائر وظروف الزمان.",
      },
      keyDifference: {
        en: 'Remember "say" needs no person ("She said that..."), while "tell" ALWAYS needs a person ("She told me that...").',
        ar: "الفعل say لا يحتاج مفعولًا مباشرًا، أما tell فيحتاج شخصًا دائمًا: She told me.",
      },
    };
  }
  if (id.includes("comparative")) {
    return {
      arabicHabit: {
        en: 'Arabic uses one pattern ("أكبر من" / "أكثر أهمية من") without splitting adjectives by syllable count.',
        ar: "تستخدم العربية صيغة أفعل التفضيل دون تقسيم الصفات حسب عدد المقاطع الصوتية.",
      },
      englishRule: {
        en: 'Short adjectives (1 syllable) add "-er / -est" (faster, biggest); long adjectives (2+ syllables) use "more / the most" (more useful). Never mix both ("more faster" is wrong!).',
        ar: "الصفات القصيرة تأخذ -er/-est مثل faster، والطويلة تأخذ more/the most مثل more useful، ولا نجمع بينهما أبدًا.",
      },
      keyDifference: {
        en: 'Choose ONE: either "-er" OR "more"—never both together. Memorise irregulars: good → better → best.',
        ar: "اختر أسلوبًا واحدًا فقط: إما -er أو more، واحفظ الشواذ مثل good ← better ← best.",
      },
    };
  }
  if (id.includes("future")) {
    return {
      arabicHabit: {
        en: 'Arabic uses "سـ / سوف" for almost all future plans, promises, and quick decisions alike.',
        ar: "تستخدم العربية «سـ / سوف» لمعظم خطط المستقبل والقرارات السريعة على السواء.",
      },
      englishRule: {
        en: 'English chooses the future form by intention: "will" for instant decisions/promises, "am/is/are going to" for prior plans, and Present Continuous for fixed appointments.',
        ar: "تختار الإنجليزية الصيغة حسب النية: will للقرار اللحظي والوعد، وgoing to للخطة المسبقة، والمضارع المستمر للموعد المؤكد.",
      },
      keyDifference: {
        en: "Decided right now → will. Already planned → am/is/are going to. Booked on calendar → am/is/are + -ing.",
        ar: "قرار الآن ← will. خطة مسبقة ← going to. موعد محجوز ← مضارع مستمر.",
      },
    };
  }
  if (
    id.includes("modal") ||
    id.includes("deduction") ||
    id.includes("hedging") ||
    id.includes("diplomacy")
  ) {
    return {
      arabicHabit: {
        en: 'Arabic often uses direct imperatives or phrases like "يجب أن" followed by a full conjugated verb.',
        ar: "تستخدم العربية «يجب أن» أو «ربما» متبوعة بفعل مضارع مصرف مع الفاعل.",
      },
      englishRule: {
        en: 'English modals (should, must, might, could, would) never change for He/She/It and are followed directly by a bare base verb—no "to", no "-s".',
        ar: "الأفعال الناقصة بالإنجليزية لا تتغير مع الفاعل ويتبعها الفعل المجرد مباشرة بدون to وبدون s.",
      },
      keyDifference: {
        en: 'Modal + bare verb (present) or Modal + have + V3 (past deduction): "She must be tired" / "She must have left".',
        ar: "فعل ناقص + فعل مجرد للحاضر، أو فعل ناقص + have + V3 للاستنتاج عن الماضي.",
      },
    };
  }
  if (lesson.skill === "reading") {
    return {
      arabicHabit: {
        en: "Many Arabic-speaking learners read English texts slowly word by word from start to finish and translate every word mentally.",
        ar: "يميل كثير من المتعلمين إلى قراءة النص الإنجليزي كلمةً بكلمة وترجمتها ذهنيًا من البداية للنهاية.",
      },
      englishRule: {
        en: "Skilled English readers scan paragraph topic sentences first, hunt synonyms/paraphrases instead of identical words, and verify exact qualifiers (only, some, rarely, unless).",
        ar: "القارئ المتمكن يمسح الجملة الأولى في كل فقرة أولًا، ويبحث عن المرادفات لا تطابق الحروف، ويتحقق من كلمات التحديد مثل only وunless.",
      },
      keyDifference: {
        en: "Match MEANING, not identical spelling—and always check the sentence right before and after your clue.",
        ar: "طابق المعنى لا تطابق الكلمة الحرفي، وتحقق دائمًا من الجملة التي تسبق الدليل وتليه.",
      },
    };
  }
  if (lesson.skill === "listening") {
    return {
      arabicHabit: {
        en: "Arabic pronounces almost every written syllable clearly, so learners expect every English word to sound separate and fully stressed.",
        ar: "تنطق العربية معظم المقاطع المكتوبة بوضوح، فيتوقع المتعلم سماع كل كلمة إنجليزية منفصلة وواضحة تمامًا.",
      },
      englishRule: {
        en: "Natural English links words together, weakens small grammar words (to, of, and, for), and stresses only key content words—plus speakers often self-correct mid-sentence.",
        ar: "تربط الإنجليزية المنطوقة الكلمات وتُخفّف الكلمات الوظيفية الصغيرة وتشدّد على الكلمات الأساسية، وقد يصحح المتحدث كلامه أثناء الحديث.",
      },
      keyDifference: {
        en: "Focus on stressed content words and listening synonyms rather than trying to catch every unstressed syllable.",
        ar: "ركّز على الكلمات المشددة والمرادفات الصوتية بدل محاولة التقاط كل حرف غير مشدد.",
      },
    };
  }
  if (lesson.skill === "writing") {
    return {
      arabicHabit: {
        en: 'Formal Arabic often connects multiple ideas in one long flowing sentence using repeated "و" ("and") before stating the main point.',
        ar: "تميل الكتابة العربية الرسمية إلى الجمل الطويلة المتصلة بـ «و» والتمهيد الطويل قبل الفكرة الرئيسية.",
      },
      englishRule: {
        en: "Clear English writing puts the topic sentence FIRST, keeps sentences crisp (15–22 words), avoids comma splices, and uses varied connectors (however, therefore, for instance).",
        ar: "الكتابة الإنجليزية القوية تضع الفكرة الرئيسية في الجملة الأولى، وتلتزم بجمل واضحة ومتوازنة، وتنوّع أدوات الربط المنطقي.",
      },
      keyDifference: {
        en: "One clear idea per paragraph: Topic Sentence → Evidence/Example → Clear Link.",
        ar: "فكرة رئيسية واحدة في كل فقرة: جملة موضوع واضحة ← دليل أو مثال ← خاتمة رابطة.",
      },
    };
  }
  if (lesson.skill === "speaking") {
    return {
      arabicHabit: {
        en: "Learners often plan a full Arabic sentence in their head first and then translate it word by word, causing long pauses.",
        ar: "يُخطّط المتعلمون أحيانًا لجملة عربية كاملة في أذهانهم ثم يترجمونها حرفيًا، مما يسبب توقفات طويلة.",
      },
      englishRule: {
        en: "Confident English speakers think in ready 3-to-5-word chunks, answer directly first, and then add one specific reason or real-life example.",
        ar: "المتحدث الواثق يفكر بعبارات إنجليزية جاهزة (٣–٥ كلمات)، يجيب مباشرة أولًا ثم يضيف سببًا أو مثالًا واقعيًا.",
      },
      keyDifference: {
        en: "Use the 2-step rhythm: Direct Answer + One Real Detail—and pause naturally between phrases, not after every word.",
        ar: "طبّق إيقاع الخطوتين: إجابة مباشرة + تفصيل واقعي واحد، مع وقفة طبيعية بين العبارات.",
      },
    };
  }

  const trap = guide?.commonMistakes[0];
  return {
    arabicHabit: {
      en: trap
        ? `Because Arabic organizes this idea differently, learners often produce sentences like "${trap.wrong}".`
        : "Because Arabic and English organize verbs, word order, and modifiers differently, literal translation often creates errors.",
      ar: trap
        ? `بسبب اختلاف تركيب الجملة في العربية، قد يكتب المتعلم خطأً "${trap.wrong}".`
        : "لاختلاف تركيب الفعل وترتيب الكلمات بين العربية والإنجليزية، تؤدي الترجمة الحرفية إلى أخطاء شائعة.",
    },
    englishRule: {
      en: trap
        ? `In natural English, apply the rule directly: "${trap.right}". ${trap.why.en}`
        : (guide?.summary.en ?? lesson.teaching[0]?.en ?? lesson.goal.en),
      ar: trap
        ? `أما في الإنجليزية السليمة فنقول: "${trap.right}". ${trap.why.ar}`
        : (guide?.summary.ar ?? lesson.teaching[0]?.ar ?? lesson.goal.ar),
    },
    keyDifference: guide?.memoryTip ?? {
      en: lesson.teaching[0]?.en ?? lesson.goal.en,
      ar: lesson.teaching[0]?.ar ?? lesson.goal.ar,
    },
  };
}

function buildMiniDialogueForLesson(lesson: Lesson, guide?: DetailedRuleGuide): DialogueTurn[] {
  const curated = GRAMMAR_DEEP_PACKS[lesson.id];
  if (curated) return curated.miniDialogue;

  const modelExample = guide?.formulas[0]?.example ?? lesson.pronunciation;
  const secondExample = guide?.formulas[1]?.example ?? lesson.pronunciation;
  const rightFix = guide?.commonMistakes[0]?.right ?? lesson.pronunciation;

  if (lesson.skill === "grammar") {
    return [
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: `Omar, let's show our students how "${lesson.title.en}" sounds in a real conversation.`,
        textAr: `عمر، لنُرِ طلابنا كيف تبدو قاعدة «${lesson.title.ar}» في محادثة حقيقية.`,
      },
      {
        speaker: "Omar",
        gender: "male",
        role: "teacher",
        textEn: `Gladly! Listen to this natural sentence: "${modelExample}" Notice how clean the structure is.`,
        textAr: `بكل سرور! استمع إلى هذه الجملة الطبيعية: "${modelExample}" ولاحظ وضوح التركيب.`,
        focusPhrase: modelExample,
      },
      {
        speaker: "Sara",
        gender: "female",
        role: "learner",
        textEn: `Let me try one too! "${rightFix}" Did I get the grammar right?`,
        textAr: `دعوني أجرب جملة أيضًا! "${rightFix}" هل طبقت القاعدة بشكل صحيح؟`,
        focusPhrase: rightFix,
      },
      {
        speaker: "Omar",
        gender: "male",
        role: "teacher",
        textEn: `Spot on, Sara! And in another situation you can also say: "${secondExample}"`,
        textAr: `أحسنتِ يا سارة! وفي موقف آخر يمكنكِ أيضًا قول: "${secondExample}"`,
        focusPhrase: secondExample,
      },
    ];
  }

  if (lesson.skill === "reading") {
    const firstQ = lesson.questions[0];
    const correctAns = firstQ?.options[firstQ.correct] ?? "the exact evidence in the text";
    return [
      {
        speaker: "Omar",
        gender: "male",
        role: "teacher",
        textEn: `Layla, when students read "${lesson.title.en}", where should their eyes go first?`,
        textAr: `ليلى، عندما يقرأ الطلاب نص «${lesson.title.ar}»، أين يجب أن تتجه أعينهم أولًا؟`,
      },
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: `Always scan the topic sentence of each paragraph first, then underline the key clue before looking at the options.`,
        textAr: `امسح الجملة الأولى من كل فقرة أولًا، ثم ضع خطًا تحت الدليل الأساسي قبل النظر للخيارات.`,
      },
      {
        speaker: "Tariq",
        gender: "male",
        role: "learner",
        textEn: `Oh! When I checked the context carefully, the evidence pointed straight to "${correctAns}".`,
        textAr: `آها! عندما تحققت من السياق بدقة، دلّني النص مباشرة إلى "${correctAns}".`,
        focusPhrase: correctAns,
      },
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: `Exactly, Tariq! That is how strong readers save time and avoid distractors.`,
        textAr: `بالضبط يا طارق! هكذا يوفّر القارئ الذكي الوقت ويتجنب المشتتات.`,
      },
    ];
  }

  if (lesson.skill === "listening") {
    const pair = lesson.listeningPlan?.paraphrasePairs[0];
    return [
      {
        speaker: "Omar",
        gender: "male",
        role: "teacher",
        textEn: pair
          ? `Listen closely to how real speakers talk: instead of "${pair.equivalent}", you often hear "${pair.spoken}".`
          : `Listen closely to the speaker's stress and tone in "${lesson.title.en}".`,
        textAr: pair
          ? `استمع جيدًا لكلام المتحدثين: بدل "${pair.equivalent}" قد تسمع في الصوت "${pair.spoken}".`
          : `استمع بتركيز إلى نبرة المتحدث والكلمات المشددة في «${lesson.title.ar}».`,
        ...(pair ? { focusPhrase: pair.spoken } : {}),
      },
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: `That is such an important point! When you expect synonyms before hitting play, your ear catches them immediately.`,
        textAr: `هذه نقطة بالغة الأهمية! عندما تتوقع المرادفات قبل تشغيل الصوت تلتقطها أذنك فورًا.`,
      },
      {
        speaker: "Sara",
        gender: "female",
        role: "learner",
        textEn: `Let me repeat the key sentence aloud to train my ear: "${lesson.pronunciation}"`,
        textAr: `سأردد الجملة المفتاحية بصوت عالٍ لتدريب أذني: "${lesson.pronunciation}"`,
        focusPhrase: lesson.pronunciation,
      },
      {
        speaker: "Omar",
        gender: "male",
        role: "teacher",
        textEn: `Your rhythm sounded so clear, Sara! Shadowing really locks the sounds in.`,
        textAr: `إيقاعك واضح جدًا يا سارة! الترديد الصوتي يثبّت الأصوات في الذاكرة.`,
      },
    ];
  }

  if (lesson.skill === "writing") {
    return [
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: `Before we write a single sentence for "${lesson.title.en}", what is our first move, Omar?`,
        textAr: `قبل أن نكتب جملة واحدة في «${lesson.title.ar}»، ما خطوتنا الأولى يا عمر؟`,
      },
      {
        speaker: "Omar",
        gender: "male",
        role: "teacher",
        textEn: `Take sixty seconds to jot down three clear bullet points: your opening message, your main detail, and your closing line.`,
        textAr: `خصّص ستين ثانية لكتابة ثلاث نقاط واضحة: الافتتاحية، والتفاصيل الداعمة، والخاتمة.`,
      },
      {
        speaker: "Tariq",
        gender: "male",
        role: "learner",
        textEn: `Got it! For my opening line, I can write something direct like: "${lesson.pronunciation}"`,
        textAr: `فهمت! في جملتي الافتتاحية يمكنني أن أكتب مباشرة: "${lesson.pronunciation}"`,
        focusPhrase: lesson.pronunciation,
      },
      {
        speaker: "Layla",
        gender: "female",
        role: "teacher",
        textEn: `Brilliant start, Tariq! Clear, polite, and straight to the point—now build your paragraph around it.`,
        textAr: `بداية رائعة يا طارق! واضحة ومهذبة ومباشرة—والآن ابنِ فقرتك حولها.`,
      },
    ];
  }

  // Speaking
  return [
    {
      speaker: "Layla",
      gender: "female",
      role: "teacher",
      textEn: `Let's practice "${lesson.title.en}" together like a real conversation! Ready, Omar?`,
      textAr: `لنتدرب على «${lesson.title.ar}» معًا كمحادثة حقيقية! مستعد يا عمر؟`,
    },
    {
      speaker: "Omar",
      gender: "male",
      role: "teacher",
      textEn: `Ready! Listen to the natural flow and stress: "${lesson.pronunciation}"`,
      textAr: `مستعد! استمع إلى الانسيابية والتشديد الطبيعي: "${lesson.pronunciation}"`,
      focusPhrase: lesson.pronunciation,
    },
    {
      speaker: "Sara",
      gender: "female",
      role: "learner",
      textEn: `My turn! "${lesson.pronunciation}" I also added a short pause between the phrases.`,
      textAr: `دوري الآن! "${lesson.pronunciation}" وأضفتُ وقفة طبيعية قصيرة بين العبارات.`,
      focusPhrase: lesson.pronunciation,
    },
    {
      speaker: "Layla",
      gender: "female",
      role: "teacher",
      textEn: `That sounded completely natural, Sara! Now try adding one real detail about your own life.`,
      textAr: `بدا نطقك طبيعيًا تمامًا يا سارة! الآن أضيفي تفصيلًا حقيقيًا من حياتك.`,
    },
  ];
}

/**
 * Ensures EVERY lesson on the website (all 209 lessons across Grammar, Reading, Listening,
 * Writing, and Speaking) has an authentic, in-depth ESL Teacher Guide with:
 * - Crystal-clear rule breakdown cards (e.g., He / She / It takes "is")
 * - Arabic ↔ English Mother-Tongue Bridge
 * - Male & Female sample conversation
 */
export function buildOrEnhanceDetailedGuide(
  lesson: Lesson,
  existing?: DetailedRuleGuide,
): DetailedRuleGuide {
  const ruleBreakdown = buildRuleBreakdownFromGuide(lesson, existing);
  const l1Bridge = buildL1BridgeForLesson(lesson, existing);
  const miniDialogue = buildMiniDialogueForLesson(lesson, existing);

  if (existing) {
    return {
      ...existing,
      ruleBreakdown,
      l1Bridge,
      miniDialogue,
    };
  }

  // Build full in-depth DetailedRuleGuide for Listening, Writing, and Speaking lessons
  const whenToUse: Bilingual[] = [
    ...(lesson.teaching.length > 0 ? lesson.teaching : [lesson.goal]),
    ...(lesson.listeningPlan?.steps.slice(0, 2) ?? []),
    ...(lesson.writing?.checklist.slice(0, 2) ?? []),
    lesson.pronunciationTip,
  ].slice(0, 4);

  const formulas =
    lesson.skill === "listening" && lesson.listeningPlan
      ? lesson.listeningPlan.paraphrasePairs.slice(0, 3).map((p, idx) => ({
          label: { en: `Audio Clue ${idx + 1}`, ar: `إشارة صوتية ${idx + 1}` },
          pattern: `"${p.spoken}" → "${p.equivalent}"`,
          example: `When you hear "${p.spoken}", look for "${p.equivalent}" in the question.`,
          arabic: p.arabic,
        }))
      : [
          {
            label: { en: "Core Model", ar: "النموذج الأساسي" },
            pattern: lesson.taskPlan?.languageFocus.en ?? lesson.title.en,
            example: lesson.pronunciation,
            arabic: lesson.goal.ar,
          },
          {
            label: { en: "Practical Strategy", ar: "الاستراتيجية العملية" },
            pattern:
              lesson.skill === "writing"
                ? "Opening → Detail → Closing"
                : "Listen → Answer → Extend",
            example: lesson.teaching[0]?.en ?? lesson.goal.en,
            arabic: lesson.teaching[0]?.ar ?? lesson.goal.ar,
          },
          {
            label: { en: "Delivery & Clarity", ar: "الوضوح والأداء" },
            pattern: "Clear stress + natural phrasing",
            example: lesson.pronunciationTip.en,
            arabic: lesson.pronunciationTip.ar,
          },
        ];

  const commonMistakes =
    lesson.skill === "listening"
      ? [
          {
            wrong: "Waiting only for exact identical words from the printed question.",
            right: "Listening for paraphrases, synonyms, and speaker self-corrections.",
            why: {
              en: "Real English speakers almost always rephrase ideas instead of repeating question wording verbatim.",
              ar: "يعيد المتحدثون صياغة المعنى بكلمات مكافئة بدل تكرار كلمات السؤال حرفيًا.",
            },
          },
          {
            wrong: "Stopping completely whenever you miss one fast word.",
            right: "Staying calm and following the stressed keywords to catch the main meaning.",
            why: {
              en: "Freezing on one missed word causes you to miss the next two answers too.",
              ar: "التوقف عند كلمة واحدة فاتتك قد يُفوّت عليك الإجابتين التاليتين أيضًا.",
            },
          },
        ]
      : lesson.skill === "writing"
        ? [
            {
              wrong: "Writing one very long paragraph joined by repeated 'and ... and ...'.",
              right:
                "Using crisp, focused sentences with clear topic sentences and logical linkers.",
              why: {
                en: "English readers expect clear sentence boundaries and one main idea per paragraph.",
                ar: "يتوقع القارئ الإنجليزي جملًا واضحة وفكرة رئيسية محددة في كل فقرة.",
              },
            },
            {
              wrong:
                "Submitting without checking subject-verb agreement (He/She/It + is/has/-s) and articles.",
              right:
                "Spending two final minutes verifying verbs, articles (a/an/the), and word count.",
              why: {
                en: "A quick two-minute proofread eliminates the most common ESL grammar slips.",
                ar: "مراجعة سريعة لمدة دقيقتين تزيل أكثر الأخطاء النحوية شيوعًا.",
              },
            },
          ]
        : [
            {
              wrong: "Translating word by word from Arabic before opening your mouth.",
              right: `Using ready natural phrases like "${lesson.pronunciation}" and adding one clear detail.`,
              why: {
                en: "Speaking in natural chunks builds fluency, rhythm, and real-world confidence.",
                ar: "التحدث بعبارات جاهزة وطبيعية يبني الطلاقة والإيقاع والثقة الفورية.",
              },
            },
            {
              wrong: "Giving a single-word 'Yes' or 'No' answer and stopping.",
              right: "Giving a direct answer plus one short reason or personal example.",
              why: {
                en: "Adding one detail keeps real conversations alive and scores higher in speaking exams.",
                ar: "إضافة تفصيل قصير تبقي المحادثة حية وترفع درجتك في اختبارات التحدث.",
              },
            },
          ];

  return {
    summary: {
      en: `${lesson.goal.en} ${lesson.teaching[0]?.en ?? ""}`.trim(),
      ar: `${lesson.goal.ar} ${lesson.teaching[0]?.ar ?? ""}`.trim(),
    },
    ruleBreakdown,
    l1Bridge,
    whenToUse,
    formulas,
    commonMistakes,
    miniDialogue,
    memoryTip: lesson.pronunciationTip,
  };
}
