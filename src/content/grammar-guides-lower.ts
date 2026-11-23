import {
  makeFitSentence,
  makePickWord,
  makeRearrange,
  type LessonEnrichmentEntry,
} from "./enrichment-builders";

/** Detailed bilingual grammar guides & 4-format interactive drills for A1, A2, B1, Kids, and Adults. */
export const GRAMMAR_GUIDES_LOWER: Record<string, LessonEnrichmentEntry> = {
  // ===================== A1 GRAMMAR (6) =====================
  "a1-introductions": {
    guide: {
      summary: {
        en: "The verb 'to be' (am / is / are) links the subject to an identity, job, nationality, age, or feeling. Unlike Arabic nominal sentences (أنا طالب), English always requires an explicit form of 'be'.",
        ar: "يربط فعل الكينونة (am / is / are) الفاعل بالهوية أو المهنة أو الجنسية أو العمر أو الصفة. وعلى عكس الجملة الاسمية العربية (أنا طالب)، تحتاج الإنجليزية دائمًا إلى فعل كينونة ظاهر.",
      },
      whenToUse: [
        {
          en: "Use 'am' exclusively with 'I' (I am / I'm).",
          ar: "استخدم am مع الضمير I فقط (I am / I'm).",
        },
        {
          en: "Use 'is' with singular subjects (he, she, it, my sister, Riyadh).",
          ar: "استخدم is مع المفرد (he, she, it, my sister, Riyadh).",
        },
        {
          en: "Use 'are' with 'you', 'we', 'they', and all plural nouns.",
          ar: "استخدم are مع you وwe وthey وجميع الأسماء الجمع.",
        },
        {
          en: "To ask a Yes/No question, invert 'be' before the subject: 'Are you a student?'",
          ar: "لتكوين سؤال نعم/لا قدّم فعل الكينونة قبل الفاعل: Are you a student?",
        },
      ],
      formulas: [
        {
          label: { en: "Affirmative", ar: "الإثبات" },
          pattern: "Subject + am / is / are + complement",
          example: "My sister is a nurse.",
          arabic: "أختي ممرضة.",
        },
        {
          label: { en: "Negative", ar: "النفي" },
          pattern: "Subject + am not / isn't / aren't + complement",
          example: "We are not late.",
          arabic: "نحن لسنا متأخرين.",
        },
        {
          label: { en: "Yes/No Question", ar: "سؤال نعم/لا" },
          pattern: "Am / Is / Are + Subject + complement?",
          example: "Are your parents teachers?",
          arabic: "هل والداك معلمان؟",
        },
      ],
      commonMistakes: [
        {
          wrong: "I a student from Riyadh.",
          right: "I am a student from Riyadh.",
          why: {
            en: "Never drop 'am/is/are' in English identity sentences.",
            ar: "لا تحذف فعل الكينونة am/is/are في الجمل التعريفية الإنجليزية.",
          },
        },
        {
          wrong: "You are a student?",
          right: "Are you a student?",
          why: {
            en: "Put 'Are' before 'you' to form a standard question.",
            ar: "قدّم Are قبل you لتكوين السؤال الصحيح.",
          },
        },
      ],
      memoryTip: {
        en: "Think: I → am | 1 person/thing → is | 2+ or you → are. Flip the first two words to ask a question!",
        ar: "تذكّر: I مع am | المفرد مع is | الجمع وyou مع are. اقلب أول كلمتين لتصنع سؤالًا!",
      },
    },
    pickWord: makePickWord({
      sentence: "My parents ___ teachers at a local school.",
      options: ["am", "is", "are", "be"],
      correct: 2,
      explanation: {
        en: "'My parents' is plural (they), so it takes 'are'.",
        ar: "الفاعل My parents جمع (they) لذلك نستخدم are.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["Are", "you", "a", "new", "student", "here?"],
      explanation: {
        en: "Yes/No questions with 'be' start with the verb 'Are' before the subject 'you'.",
        ar: "أسئلة نعم/لا مع فعل الكينونة تبدأ بـ Are قبل الفاعل you.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a fitting sentence introducing a friend or family member using 'is' and 'from'.",
      cueWords: ["is", "from"],
      requiredTerms: ["is", "from"],
      modelSentence: "My friend Ali is from Jeddah.",
      sentenceHint: {
        en: "Pattern: [Name / My brother] + is + from + [city].",
        ar: "النمط: [الاسم أو My brother] + is + from + [اسم المدينة].",
      },
      explanation: {
        en: "Pair a singular subject with 'is' and add 'from + city/country'.",
        ar: "نستخدم is مع الفاعل المفرد متبوعة بـ from واسم المدينة.",
      },
    }),
  },

  "a1-grammar-articles": {
    guide: {
      summary: {
        en: "Articles (a, an, the) tell the listener whether a noun is general or specific, while plurals show quantity. Choosing 'a' vs 'an' always depends on the first SOUND of the next word, not its spelling.",
        ar: "توضح أدوات التنكير والتعريف (a, an, the) إن كان الاسم عامًا أم محددًا، وتوضح صيغ الجمع العدد. يعتمد اختيار a أو an دائمًا على الصوت الأول للكلمة التالية وليس الحرف المكتوب.",
      },
      whenToUse: [
        {
          en: "Use 'a' before singular countable nouns starting with a consonant sound (a book, a university /juː/).",
          ar: "استخدم a قبل الاسم المفرد المعدود المبدوء بصوت ساكن مثل a book وa university.",
        },
        {
          en: "Use 'an' before singular countable nouns starting with a vowel sound (an eraser, an hour).",
          ar: "استخدم an قبل الاسم المفرد المعدود المبدوء بصوت علة مثل an eraser وan hour.",
        },
        {
          en: "Use 'the' when both speaker and listener know the exact item ('the dictionary on my desk').",
          ar: "استخدم the عندما يكون الشيء محددًا ومعروفًا للمتحدث والمستمع.",
        },
        {
          en: "Memorise key irregular plurals: child → children, person → people, man → men, woman → women.",
          ar: "احفظ الجموع الشاذة الأساسية: children وpeople وmen وwomen.",
        },
      ],
      formulas: [
        {
          label: { en: "Consonant Sound", ar: "صوت ساكن" },
          pattern: "a + consonant-sound singular noun",
          example: "a notebook / a university",
          arabic: "دفتر / جامعة",
        },
        {
          label: { en: "Vowel Sound", ar: "صوت علة" },
          pattern: "an + vowel-sound singular noun",
          example: "an orange folder / an hour",
          arabic: "ملف برتقالي / ساعة",
        },
        {
          label: { en: "Specific Noun", ar: "اسم محدد" },
          pattern: "the + known/unique noun",
          example: "The dictionary on my desk is new.",
          arabic: "القاموس على مكتبي جديد.",
        },
      ],
      commonMistakes: [
        {
          wrong: "He studies at an university.",
          right: "He studies at a university.",
          why: {
            en: "'University' starts with the consonant /j/ sound ('yoo'), so use 'a'.",
            ar: "تبدأ university بصوت /j/ الساكن لذلك تأخذ a وليس an.",
          },
        },
        {
          wrong: "Two childs are reading.",
          right: "Two children are reading.",
          why: {
            en: "'Child' has an irregular plural: 'children' (never 'childs').",
            ar: "جمع child الشاذ هو children ولا نضيف لها s.",
          },
        },
      ],
      memoryTip: {
        en: "Listen with your ears, not your eyes: 'an hour' (silent h) vs 'a university' (/yoo/ sound)!",
        ar: "احكم بأذنك لا بعينك: an hour لأن h صامتة، وa university لأنها تبدأ بصوت y الساكن!",
      },
    },
    pickWord: makePickWord({
      sentence: "Please pack ___ umbrella before you leave.",
      options: ["a", "an", "the two", "many"],
      correct: 1,
      explanation: {
        en: "'Umbrella' begins with a vowel sound (/ʌ/), so it takes 'an'.",
        ar: "تبدأ umbrella بصوت علة لذلك نستخدم an.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["I", "have", "an", "English", "dictionary", "today."],
      explanation: {
        en: "Article 'an' comes before the vowel-sound adjective 'English', followed by the noun 'dictionary'.",
        ar: "تأتي الأداة an قبل الصفة English المبدوءة بصوت علة ثم الاسم dictionary.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt: "Write a fitting sentence describing what you carry using 'an' and 'notebook'.",
      cueWords: ["an", "notebook"],
      requiredTerms: ["an", "notebook"],
      modelSentence: "I carry a notebook and an eraser in my bag.",
      sentenceHint: {
        en: "Pattern: I have a notebook and an [vowel-sound item]...",
        ar: "النمط: I have a notebook and an [اسم يبدأ بصوت علة]...",
      },
      explanation: {
        en: "Use 'an' before a vowel-sound noun (like eraser/orange/English book) alongside 'notebook'.",
        ar: "نستخدم an قبل اسم يبدأ بصوت علة مع كلمة notebook في جملة مكتملة.",
      },
    }),
  },

  "a1-grammar-there-is-are": {
    guide: {
      summary: {
        en: "Use 'There is' and 'There are' to introduce what exists in a room, street, or city. Match the verb to the first noun that follows, and pair it with 'some' (positives) or 'any' (negatives and questions).",
        ar: "نستخدم There is وThere are لوصف ما يوجد في غرفة أو شارع أو مدينة. يطابق الفعل الاسم الذي يليه، وتُستخدم some في الإثبات وany في النفي والسؤال.",
      },
      whenToUse: [
        {
          en: "Use 'There is' + singular countable noun or uncountable noun ('There is a park').",
          ar: "استخدم There is مع الاسم المفرد أو غير المعدود (There is a park).",
        },
        {
          en: "Use 'There are' + plural noun ('There are two bakeries').",
          ar: "استخدم There are مع الاسم الجمع (There are two bakeries).",
        },
        {
          en: "Use 'some' in affirmative statements and 'any' in negatives and questions.",
          ar: "استخدم some في الجمل المثبتة وany في النفي والأسئلة.",
        },
      ],
      formulas: [
        {
          label: { en: "Singular", ar: "مفرد" },
          pattern: "There is + a/an + singular noun + place",
          example: "There is a quiet park nearby.",
          arabic: "توجد حديقة هادئة بالقرب من هنا.",
        },
        {
          label: { en: "Plural", ar: "جمع" },
          pattern: "There are + number/some + plural noun",
          example: "There are two bakeries next to the bank.",
          arabic: "يوجد مخبزان بجانب البنك.",
        },
        {
          label: { en: "Negative / Question", ar: "نفي / سؤال" },
          pattern: "There aren't any... / Are there any...?",
          example: "Are there any pharmacies on this road?",
          arabic: "هل توجد أي صيدليات في هذا الشارع؟",
        },
      ],
      commonMistakes: [
        {
          wrong: "There is three shops on my street.",
          right: "There are three shops on my street.",
          why: {
            en: "'Three shops' is plural, so 'There are' is required.",
            ar: "لأن three shops جمع يجب استخدام There are.",
          },
        },
        {
          wrong: "There aren't some cafés here.",
          right: "There aren't any cafés here.",
          why: {
            en: "Use 'any' (not 'some') in negative sentences.",
            ar: "نستخدم any بدلًا من some في الجمل المنفية.",
          },
        },
      ],
      memoryTip: {
        en: "One thing = There IS. Two or more = There ARE. Positive = SOME; Negative/Question = ANY.",
        ar: "شيء واحد = There is، أكثر من شيء = There are. الإثبات مع some، والنفي والسؤال مع any.",
      },
    },
    pickWord: makePickWord({
      sentence: "There aren't ___ noisy factories near our home.",
      options: ["some", "any", "a", "one"],
      correct: 1,
      explanation: {
        en: "Negative sentences with plural nouns take 'any'.",
        ar: "الجمل المنفية مع الأسماء الجمع تأخذ any.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["There", "is", "a", "clean", "park", "nearby."],
      explanation: {
        en: "Start with 'There is' followed by the singular noun phrase 'a clean park' and location 'nearby'.",
        ar: "تبدأ الجملة بـ There is ثم الاسم المفرد a clean park ثم الظرف المكاني nearby.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt: "Write a fitting sentence describing your street using 'There are' and 'next to'.",
      cueWords: ["There are", "next to"],
      requiredTerms: ["there are", "next to"],
      modelSentence: "There are two cafés next to the bookstore.",
      sentenceHint: {
        en: "Pattern: There are + [plural noun] + next to + [place].",
        ar: "النمط: There are + [اسم جمع] + next to + [مكان].",
      },
      explanation: {
        en: "'There are' introduces plural items and 'next to' gives their exact location.",
        ar: "تقدم There are الأشياء الجمع ويحدد next to موقعها بدقة.",
      },
    }),
  },

  "a1-grammar-present-simple": {
    guide: {
      summary: {
        en: "The Present Simple describes daily habits, schedules, and general truths. Add -s/-es for he/she/it in affirmative sentences, and return to the base verb after do/does/don't/doesn't.",
        ar: "يصف المضارع البسيط العادات اليومية والجداول والحقائق العامة. نضيف s أو es مع he/she/it في الإثبات، ويعود الفعل لصورته الأساسية بعد do/does/don't/doesn't.",
      },
      whenToUse: [
        {
          en: "Daily routines and repeated study habits ('Faisal reviews ten words every morning').",
          ar: "الروتين اليومي وعادات الدراسة المتكررة.",
        },
        {
          en: "Place frequency adverbs (always, usually, often, never) BEFORE main verbs, but AFTER 'be'.",
          ar: "تأتي ظروف التكرار قبل الفعل الأساسي ولكن بعد فعل الكينونة be.",
        },
        {
          en: "Use 'does/doesn't' for he/she/it and 'do/don't' for I/you/we/they.",
          ar: "استخدم does/doesn't مع he/she/it وdo/don't مع I/you/we/they.",
        },
      ],
      formulas: [
        {
          label: { en: "Affirmative (he/she/it)", ar: "إثبات (مفرد غائب)" },
          pattern: "He/She/It + adverb + Verb-s/es",
          example: "She usually studies at 7 pm.",
          arabic: "تدرس عادةً الساعة السابعة مساءً.",
        },
        {
          label: { en: "Negative", ar: "النفي" },
          pattern: "Subject + don't / doesn't + base verb",
          example: "He doesn't skip his review.",
          arabic: "لا يفوّت مراجعته.",
        },
        {
          label: { en: "Question", ar: "السؤال" },
          pattern: "Do / Does + Subject + base verb?",
          example: "Does she listen to podcasts?",
          arabic: "هل تستمع إلى البودكاست؟",
        },
      ],
      commonMistakes: [
        {
          wrong: "He doesn't studies at night.",
          right: "He doesn't study at night.",
          why: {
            en: "'Doesn't' already carries the -s; keep the main verb in base form.",
            ar: "تحمل doesn't علامة المفرد، لذا يعود الفعل الأساسي دون s.",
          },
        },
        {
          wrong: "She always is ready.",
          right: "She is always ready.",
          why: {
            en: "Frequency adverbs come AFTER 'am/is/are'.",
            ar: "يأتي ظرف التكرار دائمًا بعد فعل الكينونة is.",
          },
        },
      ],
      memoryTip: {
        en: "One 's' per clause: either on the verb ('studies') OR on 'does'—never both!",
        ar: "حرف s واحد فقط في الجملة: إما على الفعل (studies) أو في does — لا يجتمعان أبدًا!",
      },
    },
    pickWord: makePickWord({
      sentence: "My sister ___ English audio every morning.",
      options: ["listen", "listens", "listening", "is listen"],
      correct: 1,
      explanation: {
        en: "For a daily habit with 'My sister' (she), add -s to the verb: 'listens'.",
        ar: "مع العادة اليومية والفاعل المفرد My sister نضيف s للفعل: listens.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["He", "usually", "reviews", "ten", "words", "daily."],
      explanation: {
        en: "The frequency adverb 'usually' goes directly before the main verb 'reviews'.",
        ar: "يأتي ظرف التكرار usually قبل الفعل الرئيسي reviews مباشرة.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt: "Write a fitting negative habit sentence using 'doesn't' and 'study'.",
      cueWords: ["doesn't", "study"],
      requiredTerms: ["doesn't|does not", "study"],
      modelSentence: "My brother doesn't study late at night.",
      sentenceHint: {
        en: "Pattern: [He/She/Name] + doesn't + study + [time/place].",
        ar: "النمط: [He/She/اسم] + doesn't + study + [الوقت/المكان].",
      },
      explanation: {
        en: "Use 'doesn't' + base verb 'study' (never 'studies') with a singular third-person subject.",
        ar: "نستخدم doesn't مع الفعل الأساسي study دون إضافة s.",
      },
    }),
  },

  "a1-grammar-present-continuous": {
    guide: {
      summary: {
        en: "The Present Continuous (am/is/are + verb-ing) describes actions happening right now or temporary projects this week, contrasting clearly with permanent habits in Present Simple.",
        ar: "يصف المضارع المستمر (am/is/are + verb-ing) الأفعال الجارية الآن في لحظة الكلام أو المشاريع المؤقتة هذا الأسبوع، ويختلف عن العادات الدائمة في المضارع البسيط.",
      },
      whenToUse: [
        {
          en: "Live actions happening at the moment of speaking (now, right now, look!, listen!).",
          ar: "الأفعال الجارية في هذه اللحظة (now, right now, look!).",
        },
        {
          en: "Temporary situations around now ('I am staying in Abha this week').",
          ar: "المواقف المؤقتة حول الوقت الحاضر (this week, these days).",
        },
        {
          en: "Never omit 'am/is/are' before verb-ing, and remember spelling rules (write → writing, sit → sitting).",
          ar: "لا تحذف am/is/are أبدًا قبل verb-ing، وانتبه لقواعد الإملاء مثل writing وsitting.",
        },
      ],
      formulas: [
        {
          label: { en: "Affirmative", ar: "الإثبات" },
          pattern: "Subject + am/is/are + verb-ing",
          example: "The team is preparing the slides now.",
          arabic: "الفريق يجهّز الشرائح الآن.",
        },
        {
          label: { en: "Negative", ar: "النفي" },
          pattern: "Subject + am not / isn't / aren't + verb-ing",
          example: "I am not driving at the moment.",
          arabic: "أنا لا أقود السيارة حاليًا.",
        },
        {
          label: { en: "Question", ar: "السؤال" },
          pattern: "Am/Is/Are + Subject + verb-ing?",
          example: "Are they waiting at Gate 4?",
          arabic: "هل ينتظرون عند البوابة ٤؟",
        },
      ],
      commonMistakes: [
        {
          wrong: "She waiting for the bus now.",
          right: "She is waiting for the bus now.",
          why: {
            en: "Present continuous ALWAYS needs the auxiliary 'am/is/are' before '-ing'.",
            ar: "المضارع المستمر يحتاج دائمًا إلى الفعل المساعد am/is/are قبل -ing.",
          },
        },
        {
          wrong: "I am usually drinking tea at 7 am.",
          right: "I usually drink tea at 7 am.",
          why: {
            en: "Use Present Simple (not continuous) for regular daily habits.",
            ar: "نستخدم المضارع البسيط للعادات المنتظمة لا المضارع المستمر.",
          },
        },
      ],
      memoryTip: {
        en: "Right now = BE + ING (two parts!). Every day = Present Simple.",
        ar: "الآن = BE + ING (جزآن دائمًا!). كل يوم = مضارع بسيط.",
      },
    },
    pickWord: makePickWord({
      sentence: "Look! The students ___ working on their posters right now.",
      options: ["is", "are", "do", "be"],
      correct: 1,
      explanation: {
        en: "'The students' is plural and the action is happening now, so use 'are'.",
        ar: "الفاعل جمع والفعل يحدث الآن، لذلك نستخدم are.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["She", "is", "writing", "an", "email", "now."],
      explanation: {
        en: "Subject 'She' + auxiliary 'is' + verb-ing 'writing' + object + time marker 'now'.",
        ar: "الفاعل She + الفعل المساعد is + الفعل مع ing ثم المفعول والزمن now.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a fitting sentence about an action happening right now using 'is' and 'reading'.",
      cueWords: ["is", "reading"],
      requiredTerms: ["is", "reading"],
      modelSentence: "Nora is reading a short story right now.",
      sentenceHint: {
        en: "Pattern: [He/She/Name] + is + reading + [what] + now.",
        ar: "النمط: [He/She/اسم] + is + reading + [ماذا يقرأ] + now.",
      },
      explanation: {
        en: "Pair a singular subject with 'is reading' to describe a live action in progress.",
        ar: "نجمع الفاعل المفرد مع is reading لوصف فعل يجري الآن.",
      },
    }),
  },

  "a1-grammar-can-cant": {
    guide: {
      summary: {
        en: "The modal verb 'can / can't' expresses ability, skill, and polite permission or requests. It stays identical for every subject and is ALWAYS followed by the bare infinitive (base verb without 'to' or '-s').",
        ar: "يعبّر الفعل الناقص can / can't عن القدرة والمهارة والاستئذان والطلب المهذّب. لا يتغير شكله مع أي فاعل ويتبعه دائمًا الفعل الأساسي دون to أو s.",
      },
      whenToUse: [
        {
          en: "Abilities and skills ('She can speak three languages').",
          ar: "القدرات والمهارات (She can speak three languages).",
        },
        {
          en: "Polite permission and requests ('Can I open the window?').",
          ar: "الاستئذان والطلبات المهذبة (Can I open the window?).",
        },
        {
          en: "Never add 'to' or '-s' after 'can' or 'can't'.",
          ar: "لا تضف to أو s أبدًا بعد can أو can't.",
        },
      ],
      formulas: [
        {
          label: { en: "Ability (+)", ar: "القدرة (إثبات)" },
          pattern: "Subject + can + base verb",
          example: "Tariq can design simple slides.",
          arabic: "يستطيع طارق تصميم شرائح بسيطة.",
        },
        {
          label: { en: "Inability (-)", ar: "عدم القدرة (نفي)" },
          pattern: "Subject + can't / cannot + base verb",
          example: "I can't swim very fast.",
          arabic: "لا أستطيع السباحة بسرعة كبيرة.",
        },
        {
          label: { en: "Question / Request", ar: "سؤال / طلب" },
          pattern: "Can + Subject + base verb?",
          example: "Can I borrow your pen, please?",
          arabic: "هل يمكنني استعارة قلمك من فضلك؟",
        },
      ],
      commonMistakes: [
        {
          wrong: "She can to drive a car.",
          right: "She can drive a car.",
          why: { en: "Never place 'to' after 'can'.", ar: "لا نضع to بعد can أبدًا." },
        },
        {
          wrong: "He cans speak Arabic well.",
          right: "He can speak Arabic well.",
          why: {
            en: "Modal verbs never take '-s' with he/she/it.",
            ar: "الأفعال الناقصة لا تأخذ s مع he/she/it.",
          },
        },
      ],
      memoryTip: {
        en: "CAN is clean: no 'to', no '-s', no '-ing'—just CAN + base verb!",
        ar: "الفعل can نظيف دائمًا: بلا to وبلا s وبلا ing — فقط can + الفعل الأساسي!",
      },
    },
    pickWord: makePickWord({
      sentence: "My cousin can ___ Arabic and English fluently.",
      options: ["speaks", "to speak", "speak", "speaking"],
      correct: 2,
      explanation: {
        en: "Always use the bare base verb ('speak') after 'can'.",
        ar: "بعد can نستخدم الفعل في صورته الأساسية المجردة speak.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["Can", "you", "help", "me", "with", "this?"],
      explanation: {
        en: "Questions with 'can' invert 'Can' before the subject 'you', followed by base verb 'help'.",
        ar: "في السؤال نقدم Can قبل الفاعل you ثم الفعل الأساسي help.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt: "Write a fitting sentence about a skill you have using 'can' and 'well'.",
      cueWords: ["can", "well"],
      requiredTerms: ["can", "well"],
      modelSentence: "I can cook traditional rice dishes well.",
      sentenceHint: {
        en: "Pattern: I / She / He + can + [base verb] + ... + well.",
        ar: "النمط: الفاعل + can + [الفعل الأساسي] + ... + well.",
      },
      explanation: {
        en: "Follow 'can' with a base verb and end with 'well' to express strong ability.",
        ar: "يتبع can الفعل الأساسي ثم نضيف well للتعبير عن إتقان المهارة.",
      },
    }),
  },

  // ===================== A2 GRAMMAR (6) =====================
  "a2-past": {
    guide: {
      summary: {
        en: "The Past Simple describes completed actions at a finished time in the past (yesterday, last weekend, in 2022). Regular verbs add -ed, irregular verbs change form, and negatives/questions use did/didn't + base verb.",
        ar: "يصف الماضي البسيط أفعالًا مكتملة في وقت منتهٍ في الماضي (yesterday, last weekend). تأخذ الأفعال المنتظمة -ed وتتغير الأفعال الشاذة، بينما نستخدم did/didn't + الفعل الأساسي في النفي والسؤال.",
      },
      whenToUse: [
        {
          en: "Finished events with a clear past time marker (yesterday, last Friday, two days ago).",
          ar: "أحداث منتهية مع إشارة زمنية ماضية واضحة.",
        },
        {
          en: "A sequence of past story events ('We arrived, bought tickets, and explored the fort').",
          ar: "تسلسل أحداث قصة في الماضي.",
        },
        {
          en: "In negatives and questions, 'did/didn't' carries the past tense so the main verb returns to base form.",
          ar: "في النفي والسؤال تحمل did/didn't زمن الماضي فيعود الفعل الأساسي لمصدره.",
        },
      ],
      formulas: [
        {
          label: { en: "Affirmative", ar: "الإثبات" },
          pattern: "Subject + V-ed / Irregular V2",
          example: "We visited AlUla and saw ancient tombs.",
          arabic: "زرنا العلا وشاهدنا مقابر قديمة.",
        },
        {
          label: { en: "Negative", ar: "النفي" },
          pattern: "Subject + didn't + base verb",
          example: "She didn't buy a souvenir.",
          arabic: "لم تشترِ تذكارًا.",
        },
        {
          label: { en: "Question", ar: "السؤال" },
          pattern: "Did + Subject + base verb?",
          example: "Did you enjoy the weekend trip?",
          arabic: "هل استمتعت برحلة نهاية الأسبوع؟",
        },
      ],
      commonMistakes: [
        {
          wrong: "I didn't went to the museum.",
          right: "I didn't go to the museum.",
          why: {
            en: "Use the base verb 'go' after 'didn't', never V2 'went'.",
            ar: "نستخدم الفعل الأساسي go بعد didn't وليس الماضي went.",
          },
        },
        {
          wrong: "Did she enjoyed the food?",
          right: "Did she enjoy the food?",
          why: {
            en: "'Did' already signals the past; drop '-ed' from the main verb.",
            ar: "كلمة Did تدل على الماضي لذا نحذف -ed من الفعل الرئيسي.",
          },
        },
      ],
      memoryTip: {
        en: "DID is a magnet for past tense: when 'did/didn't' appears, the main verb relaxes into its base form!",
        ar: "كلمة did تمتص زمن الماضي: كلما ظهرت did أو didn't عاد الفعل الرئيسي لصيغته الأساسية!",
      },
    },
    pickWord: makePickWord({
      sentence: "We ___ a delicious dinner by the Red Sea yesterday.",
      options: ["eat", "ate", "eaten", "eating"],
      correct: 1,
      explanation: {
        en: "'Yesterday' marks a finished past event; the past simple of 'eat' is 'ate'.",
        ar: "تدل yesterday على الماضي البسيط، وماضي eat الشاذ هو ate.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["Did", "you", "visit", "the", "museum", "yesterday?"],
      explanation: {
        en: "Past simple questions follow: Did + subject ('you') + base verb ('visit') + object + time.",
        ar: "يتبع سؤال الماضي البسيط الترتيب: Did + الفاعل + الفعل الأساسي + المفعول + الزمن.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt: "Write a fitting past negative sentence using 'didn't' and 'yesterday'.",
      cueWords: ["didn't", "yesterday"],
      requiredTerms: ["didn't|did not", "yesterday"],
      modelSentence: "I didn't finish my homework yesterday.",
      sentenceHint: {
        en: "Pattern: Subject + didn't + [base verb] + ... + yesterday.",
        ar: "النمط: الفاعل + didn't + [الفعل الأساسي] + ... + yesterday.",
      },
      explanation: {
        en: "Pair 'didn't' with a base verb and a finished past time expression like 'yesterday'.",
        ar: "نستخدم didn't متبوعة بالفعل الأساسي ومعها ظرف زمني ماضٍ مثل yesterday.",
      },
    }),
  },

  "a2-grammar-past-continuous": {
    guide: {
      summary: {
        en: "The Past Continuous (was/were + verb-ing) sets the background scene of a story, while the Past Simple introduces the shorter event that interrupted it.",
        ar: "يرسم الماضي المستمر (was/were + verb-ing) خلفية الحدث المستمر في القصة، بينما يقدّم الماضي البسيط الحدث القصير الذي قطعه.",
      },
      whenToUse: [
        {
          en: "Use 'was + -ing' with I/he/she/it and 'were + -ing' with you/we/they.",
          ar: "استخدم was + -ing مع I/he/she/it وwere + -ing مع you/we/they.",
        },
        {
          en: "Pair 'while + Past Continuous' (longer action) with 'when + Past Simple' (sudden interruption).",
          ar: "اربط while بالماضي المستمر (الفعل الأطول) وwhen بالماضي البسيط (الحدث القاطع).",
        },
        {
          en: "Describe two simultaneous background actions ('While he was driving, she was checking the map').",
          ar: "وصف فعلين مستمرين في الوقت نفسه.",
        },
      ],
      formulas: [
        {
          label: { en: "Background + Interruption", ar: "خلفية + حدث قاطع" },
          pattern: "was/were + V-ing + when + Past Simple",
          example: "We were walking when it started to rain.",
          arabic: "كنا نمشي عندما بدأ المطر يهطل.",
        },
        {
          label: { en: "While Clause First", ar: "جملة While في البداية" },
          pattern: "While + S + was/were + V-ing, S + Past Simple",
          example: "While I was boarding, my phone rang.",
          arabic: "بينما كنت أصعد الطائرة، رنّ هاتفي.",
        },
        {
          label: { en: "Negative / Question", ar: "نفي / سؤال" },
          pattern: "wasn't/weren't + V-ing / Were you + V-ing?",
          example: "Were you sleeping at 10 pm?",
          arabic: "هل كنت نائمًا الساعة العاشرة مساءً؟",
        },
      ],
      commonMistakes: [
        {
          wrong: "We was waiting at the gate.",
          right: "We were waiting at the gate.",
          why: {
            en: "'We' always takes 'were', never 'was'.",
            ar: "الضمير we يأخذ were دائمًا وليس was.",
          },
        },
        {
          wrong: "While I drove, the tyre was bursting.",
          right: "While I was driving, the tyre burst.",
          why: {
            en: "Long background action = Past Continuous; sudden burst = Past Simple.",
            ar: "القيادة هي الحدث المستمر (was driving) والانفجار المفاجئ ماضٍ بسيط (burst).",
          },
        },
      ],
      memoryTip: {
        en: "Think of a movie: Past Continuous = the moving background camera; Past Simple = the sudden 'POP!' event.",
        ar: "تخيّل فيلمًا: الماضي المستمر هو المشهد الخلفي المتحرك، والماضي البسيط هو الحدث المفاجئ الذي يقطعه.",
      },
    },
    pickWord: makePickWord({
      sentence: "While we ___ waiting for the train, the platform changed.",
      options: ["was", "were", "are", "did"],
      correct: 1,
      explanation: {
        en: "'We' takes 'were' in the Past Continuous background clause.",
        ar: "الفاعل we يأخذ were في جملة الماضي المستمر.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["It", "started", "raining", "while", "we", "were", "walking."],
      explanation: {
        en: "The sudden Past Simple event ('started raining') interrupts the ongoing Past Continuous ('while we were walking').",
        ar: "الحدث المفاجئ started raining قاطع الحدث المستمر while we were walking.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a fitting sentence combining a background action and an interruption using 'while' and 'when' or 'was'.",
      cueWords: ["while", "was"],
      requiredTerms: ["while", "was|were"],
      modelSentence: "My phone rang while I was cooking dinner.",
      sentenceHint: {
        en: "Pattern: [Short past action] + while + I/he/she + was + [verb-ing].",
        ar: "النمط: [حدث ماضٍ قصير] + while + الفاعل + was + [فعل مع ing].",
      },
      explanation: {
        en: "Follow 'while' with 'was/were + verb-ing' and pair it with a Past Simple event.",
        ar: "نضع بعد while الماضي المستمر (was/were + ing) مع حدث ماضٍ بسيط.",
      },
    }),
  },

  "a2-grammar-comparatives": {
    guide: {
      summary: {
        en: "Comparatives compare two things (faster than, more comfortable than), while superlatives single out the top or bottom in a group of three or more (the fastest, the most comfortable).",
        ar: "تُستخدم صيغ المقارنة بين شيئين (faster than / more comfortable than)، وصيغ التفضيل لتمييز الأعلى أو الأدنى ضمن مجموعة من ثلاثة أو أكثر (the fastest / the most comfortable).",
      },
      whenToUse: [
        {
          en: "Short 1-syllable adjectives (and 2-syllable adjectives ending in -y): add -er / the -est (fast → faster → the fastest; easy → easier → the easiest).",
          ar: "الصفات القصيرة ذات المقطع الواحد أو المنتهية بـ y تأخذ -er وthe -est.",
        },
        {
          en: "Longer adjectives (2+ syllables): use 'more ... than' and 'the most ...' (more reliable, the most comfortable).",
          ar: "الصفات الطويلة تأخذ more ... than في المقارنة وthe most في التفضيل.",
        },
        {
          en: "Irregular forms: good → better → the best; bad → worse → the worst; far → farther/further → the farthest/furthest.",
          ar: "الصفات الشاذة: good → better → the best وbad → worse → the worst.",
        },
      ],
      formulas: [
        {
          label: { en: "Short Comparative", ar: "مقارنة (صفة قصيرة)" },
          pattern: "adj-er + than",
          example: "The train is faster than the bus.",
          arabic: "القطار أسرع من الحافلة.",
        },
        {
          label: { en: "Long Comparative", ar: "مقارنة (صفة طويلة)" },
          pattern: "more + adjective + than",
          example: "Rail travel is more comfortable than driving.",
          arabic: "السفر بالقطار أكثر راحة من القيادة.",
        },
        {
          label: { en: "Superlative", ar: "التفضيل" },
          pattern: "the + adj-est / the most + adj",
          example: "This is the most reliable route in winter.",
          arabic: "هذا هو المسار الأكثر موثوقية في الشتاء.",
        },
      ],
      commonMistakes: [
        {
          wrong: "The metro is more faster than taxis.",
          right: "The metro is faster than taxis.",
          why: {
            en: "Never double-mark a comparative with both 'more' and '-er'.",
            ar: "لا تجمع بين more و-er في الصفة نفسها أبدًا.",
          },
        },
        {
          wrong: "This route is the goodest choice.",
          right: "This route is the best choice.",
          why: {
            en: "'Good' is irregular: better / the best.",
            ar: "صفة good شاذة وتفضيلها هو the best.",
          },
        },
      ],
      memoryTip: {
        en: "2 items → -er / more + THAN. 3+ items → THE + -est / most. Never mix 'more' and '-er'!",
        ar: "شيئان = -er أو more مع than. ثلاثة فأكثر = the مع -est أو most. لا تجمع more مع -er!",
      },
    },
    pickWord: makePickWord({
      sentence: "Taking the metro is much ___ than sitting in traffic.",
      options: ["more fast", "faster", "fastest", "the faster"],
      correct: 1,
      explanation: {
        en: "'Fast' is a short 1-syllable adjective, so its comparative before 'than' is 'faster'.",
        ar: "صفة fast قصيرة لذلك صيغة المقارنة قبل than هي faster.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["The", "train", "is", "more", "comfortable", "than", "driving."],
      explanation: {
        en: "Long adjective 'comfortable' uses 'more + comfortable + than' between the two items compared.",
        ar: "الصفة الطويلة comfortable تأخذ more قبلها وthan بعدها للمقارنة.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt: "Write a fitting comparison sentence using 'better' and 'than'.",
      cueWords: ["better", "than"],
      requiredTerms: ["better", "than"],
      modelSentence: "The morning train is better than the crowded bus.",
      sentenceHint: {
        en: "Pattern: [Option A] + is + better + than + [Option B].",
        ar: "النمط: [الخيار أ] + is + better + than + [الخيار ب].",
      },
      explanation: {
        en: "'Better' is the irregular comparative of 'good' and connects to the second option with 'than'.",
        ar: "better هي صيغة المقارنة الشاذة من good وتُربط بـ than.",
      },
    }),
  },

  "a2-grammar-future-forms": {
    guide: {
      summary: {
        en: "English chooses future forms by HOW the plan was made: 'be going to' for intentions decided earlier, 'will' for spontaneous decisions/offers/promises, and Present Continuous for fixed calendar appointments.",
        ar: "تختار الإنجليزية صيغة المستقبل حسب كيفية اتخاذ القرار: be going to للنوايا والخطط المسبقة، وwill للقرارات اللحظية والعروض والوعود، والمضارع المستمر للمواعيد المؤكدة.",
      },
      whenToUse: [
        {
          en: "'be going to + base verb': plans decided before speaking or predictions with visible evidence ('Look at those clouds—it is going to rain').",
          ar: "be going to للخطط المسبقة أو التوقعات المبنية على دليل مرئي.",
        },
        {
          en: "'will + base verb': instant decisions at the moment of speaking, offers, and promises ('I'll carry that bag for you').",
          ar: "will للقرارات الفورية لحظة الكلام والعروض والوعود.",
        },
        {
          en: "Present Continuous: fixed diary arrangements with a set time/place ('I'm meeting my adviser at 2 pm').",
          ar: "المضارع المستمر للمواعيد الثابتة بوقت ومكان محددين.",
        },
      ],
      formulas: [
        {
          label: { en: "Prior Plan", ar: "خطة مسبقة" },
          pattern: "Subject + am/is/are + going to + base verb",
          example: "I am going to apply for a master's degree.",
          arabic: "أنوي التقديم لدرجة الماجستير.",
        },
        {
          label: { en: "Instant Offer / Promise", ar: "قرار فوري / وعد" },
          pattern: "Subject + will ('ll) / won't + base verb",
          example: "Don't worry—I will send the notes tonight.",
          arabic: "لا تقلق—سأرسل الملاحظات الليلة.",
        },
        {
          label: { en: "Fixed Arrangement", ar: "موعد مؤكد" },
          pattern: "Subject + am/is/are + V-ing + future time",
          example: "We are meeting the coach tomorrow at 9.",
          arabic: "سنلتقي بالمدرب غدًا الساعة ٩.",
        },
      ],
      commonMistakes: [
        {
          wrong: "I going to study engineering.",
          right: "I am going to study engineering.",
          why: {
            en: "Always include 'am/is/are' before 'going to'.",
            ar: "لا بد من وجود am/is/are قبل going to.",
          },
        },
        {
          wrong: "I will to help you with that box.",
          right: "I will help you with that box.",
          why: {
            en: "'Will' is a modal verb—never add 'to' after it.",
            ar: "الفعل will ناقص ولا يأتي بعده to.",
          },
        },
      ],
      memoryTip: {
        en: "Planned BEFORE? Going to! Decided NOW? Will! On the CALENDAR? Present Continuous!",
        ar: "خطة مسبقة؟ going to! قرار لحظي؟ will! موعد في التقويم؟ مضارع مستمر!",
      },
    },
    pickWord: makePickWord({
      sentence: "That bag looks heavy—I ___ carry it for you.",
      options: ["going to", "will", "am carry", "was"],
      correct: 1,
      explanation: {
        en: "A spontaneous offer made on the spot takes 'will' + base verb.",
        ar: "العرض اللحظي الفوري يستخدم will + الفعل الأساسي.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["She", "is", "going", "to", "study", "abroad."],
      explanation: {
        en: "Prior plans use: Subject + is/am/are + going to + base verb.",
        ar: "الخطط المسبقة تتبع الترتيب: الفاعل + is + going to + الفعل الأساسي.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt: "Write a fitting sentence about a study plan you decided earlier using 'going to'.",
      cueWords: ["going to"],
      requiredTerms: ["am going to|is going to|are going to|'m going to|'s going to|'re going to"],
      modelSentence: "I am going to practise English every morning this month.",
      sentenceHint: {
        en: "Pattern: I am going to + [base verb] + [plan].",
        ar: "النمط: I am going to + [الفعل الأساسي] + [خطتك].",
      },
      explanation: {
        en: "Include 'am/is/are' + 'going to' + a base verb to express a prior intention.",
        ar: "استخدم am/is/are مع going to والفعل الأساسي للتعبير عن نية مسبقة.",
      },
    }),
  },

  "a2-grammar-present-perfect-basics": {
    guide: {
      summary: {
        en: "The Present Perfect (have/has + past participle V3) connects past life experiences or achievements to the present—without naming a finished past date. As soon as you say WHEN (last year, in 2023), switch to Past Simple.",
        ar: "يربط المضارع التام (have/has + التصريف الثالث V3) تجارب الحياة والإنجازات بالحاضر دون تحديد تاريخ ماضٍ منتهٍ. وبمجرد ذكر الزمن المحدد (last year, in 2023) ننتقل للماضي البسيط.",
      },
      whenToUse: [
        {
          en: "Life experiences up to now with 'ever' (questions) and 'never' (negatives).",
          ar: "تجارب الحياة حتى الآن باستخدام ever في السؤال وnever في النفي.",
        },
        {
          en: "Recent news or achievements with 'just', 'already', and 'yet'.",
          ar: "الأخبار الحديثة والإنجازات مع just وalready وyet.",
        },
        {
          en: "Switch to Past Simple the moment you add a finished time ('I have visited Muscat. I went there in 2024').",
          ar: "انتقل للماضي البسيط فور ذكر تاريخ منتهٍ.",
        },
      ],
      formulas: [
        {
          label: { en: "Affirmative", ar: "الإثبات" },
          pattern: "Subject + have/has + V3 (past participle)",
          example: "She has completed two online courses.",
          arabic: "أكملت دورتين عبر الإنترنت.",
        },
        {
          label: { en: "Negative / Never", ar: "النفي" },
          pattern: "Subject + haven't/hasn't + V3 (or have never + V3)",
          example: "I have never flown to Tokyo.",
          arabic: "لم أسافر إلى طوكيو قط.",
        },
        {
          label: { en: "Question (Ever)", ar: "السؤال بـ ever" },
          pattern: "Have/Has + Subject + ever + V3?",
          example: "Have you ever led a workshop?",
          arabic: "هل سبق أن قدت ورشة عمل؟",
        },
      ],
      commonMistakes: [
        {
          wrong: "I have visited Cairo last year.",
          right: "I visited Cairo last year.",
          why: {
            en: "'Last year' is a finished past time—use Past Simple, not Present Perfect.",
            ar: "تحدد last year وقتًا ماضيًا منتهيًا، فنستخدم الماضي البسيط لا المضارع التام.",
          },
        },
        {
          wrong: "She has went to the conference.",
          right: "She has been/gone to the conference.",
          why: {
            en: "'Went' is V2; Present Perfect requires V3 ('been' or 'gone').",
            ar: "went تصريف ثانٍ، بينما يحتاج المضارع التام للتصريف الثالث been أو gone.",
          },
        },
      ],
      memoryTip: {
        en: "No past date = HAVE/HAS + V3. Exact past date (yesterday / 2023) = Past Simple!",
        ar: "بلا تاريخ محدد = have/has + V3. مع تاريخ ماضٍ محدد = ماضٍ بسيط!",
      },
    },
    pickWord: makePickWord({
      sentence: "Have you ___ tried traditional Arabic coffee in Abha?",
      options: ["ever", "yesterday", "ago", "last"],
      correct: 0,
      explanation: {
        en: "'Ever' asks about life experience up to now in Present Perfect questions.",
        ar: "تُستخدم ever في أسئلة المضارع التام للسؤال عن تجربة في أي وقت حتى الآن.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["She", "has", "already", "finished", "three", "certificates."],
      explanation: {
        en: "'Already' sits between 'has' and the past participle 'finished'.",
        ar: "يأتي الظرف already بين has والتصريف الثالث finished.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a fitting sentence about a life experience using 'have' (or 'has') and 'never'.",
      cueWords: ["have / has", "never"],
      requiredTerms: ["have|has|'ve|'s", "never"],
      modelSentence: "I have never missed a single morning class.",
      sentenceHint: {
        en: "Pattern: I have never + [V3 past participle] + ...",
        ar: "النمط: I have never + [التصريف الثالث V3] + ...",
      },
      explanation: {
        en: "Place 'never' between 'have/has' and the V3 past participle (no extra 'not').",
        ar: "توضع never بين have/has والتصريف الثالث دون إضافة not.",
      },
    }),
  },

  "a2-grammar-modals-advice": {
    guide: {
      summary: {
        en: "Modals of advice and obligation carry crucial differences in strength: 'should' gives friendly advice, 'must / have to' states a rule, 'mustn't' means strictly FORBIDDEN, and 'don't have to' means OPTIONAL.",
        ar: "تختلف أفعال النصيحة والإلزام في قوتها بدقة: should للنصيحة، وmust / have to للإلزام، أما mustn't فتعني ممنوع تمامًا، بينما don't have to تعني غير إلزامي (اختياري).",
      },
      whenToUse: [
        {
          en: "'should / shouldn't + base verb': helpful advice or recommendations.",
          ar: "should / shouldn't لتقديم نصيحة أو توصية.",
        },
        {
          en: "'must / have to + base verb': strong necessity or official workplace/safety rules.",
          ar: "must / have to للضرورة القوية أو القواعد الرسمية.",
        },
        {
          en: "'mustn't' = PROHIBITED (ممنوع) vs. 'don't have to' = NOT NECESSARY (اختياري).",
          ar: "الفرق الجوهري: mustn't تعني ممنوع، أما don't have to فتعني لست مضطرًا.",
        },
      ],
      formulas: [
        {
          label: { en: "Advice", ar: "نصيحة" },
          pattern: "Subject + should/shouldn't + base verb",
          example: "You should back up your files daily.",
          arabic: "ينبغي أن تحفظ نسخة احتياطية يوميًا.",
        },
        {
          label: { en: "Prohibition", ar: "منع وتحريم" },
          pattern: "Subject + mustn't + base verb",
          example: "Visitors mustn't smoke near the entrance.",
          arabic: "يُمنع على الزوار التدخين قرب المدخل.",
        },
        {
          label: { en: "No Obligation", ar: "عدم إلزام (اختياري)" },
          pattern: "Subject + don't/doesn't have to + base verb",
          example: "You don't have to wear a tie on Fridays.",
          arabic: "لا يلزمك ارتداء ربطة عنق يوم الجمعة.",
        },
      ],
      commonMistakes: [
        {
          wrong: "You mustn't bring a laptop—we provide one if you prefer.",
          right: "You don't have to bring a laptop—we provide one.",
          why: {
            en: "'Mustn't' bans laptops; 'don't have to' means it is optional.",
            ar: "mustn't تعني ممنوع إحضار الحاسوب، أما don't have to فتعني غير مطلوب/اختياري.",
          },
        },
        {
          wrong: "He should to sleep earlier.",
          right: "He should sleep earlier.",
          why: {
            en: "Never put 'to' after 'should' or 'must'.",
            ar: "لا نضع to بعد should أو must.",
          },
        },
      ],
      memoryTip: {
        en: "MUSTN'T = Red Stop Sign (Forbidden!). DON'T HAVE TO = Free Choice (Optional!).",
        ar: "mustn't = إشارة ممنوع حمراء! don't have to = خيار حر وغير إلزامي!",
      },
    },
    pickWord: makePickWord({
      sentence: "Entry is free today, so you ___ pay at the door.",
      options: ["mustn't", "don't have to", "should", "must"],
      correct: 1,
      explanation: {
        en: "Because entry is free, paying is unnecessary ('don't have to'), not forbidden.",
        ar: "الدخول مجاني لذا الدفع غير ضروري (don't have to) وليس ممنوعًا.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["You", "should", "review", "your", "notes", "before", "class."],
      explanation: {
        en: "Advice structure: Subject + should + base verb ('review') + object + time phrase.",
        ar: "تركيب النصيحة: الفاعل + should + الفعل الأساسي review + المفعول.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a fitting safety rule using 'mustn't' (prohibition) or friendly advice using 'should'.",
      cueWords: ["should / mustn't"],
      requiredTerms: ["should|shouldn't|mustn't|must not"],
      modelSentence: "Drivers mustn't use their phones while driving.",
      sentenceHint: {
        en: "Pattern: [People/You] + mustn't / should + [base verb] + ...",
        ar: "النمط: الفاعل + mustn't أو should + [الفعل الأساسي] + ...",
      },
      explanation: {
        en: "Follow 'should' or 'mustn't' directly with a bare base verb (no 'to').",
        ar: "يتبع should أو mustn't الفعل الأساسي مباشرة دون to.",
      },
    }),
  },

  // ===================== B1 GRAMMAR (6) =====================
  "b1-experiences": {
    guide: {
      summary: {
        en: "Strong B1 speakers open an interview or story with Present Perfect to establish an achievement ('I have led three workshops'), then immediately zoom into the specific story with Past Simple ('Last May, I organised...').",
        ar: "يفتتح متحدثو B1 المقابلة أو القصة بالمضارع التام لإثبات الإنجاز (I have led three workshops)، ثم ينتقلون مباشرة للتفاصيل المحددة بالماضي البسيط (Last May, I organised...).",
      },
      whenToUse: [
        {
          en: "Present Perfect: unfinished time periods (this year, so far, since 2022, for three years) or general experience.",
          ar: "المضارع التام للفترات غير المنتهية (this year, since 2022, for three years) أو الخبرات العامة.",
        },
        {
          en: "Past Simple: specific completed moments (in 2023, last summer, when I worked at...).",
          ar: "الماضي البسيط للحظات المنتهية المحددة (in 2023, last summer).",
        },
        {
          en: "Use 'for' + duration (for five years) and 'since' + starting point (since 2021).",
          ar: "استخدم for مع المدة الزمنية وsince مع نقطة البداية.",
        },
      ],
      formulas: [
        {
          label: { en: "Headline Achievement", ar: "إنجاز عام (مضارع تام)" },
          pattern: "Subject + have/has + V3 + (for/since)",
          example: "I have taught English for four years.",
          arabic: "درّست الإنجليزية منذ أربع سنوات (وما زلت).",
        },
        {
          label: { en: "Specific Proof", ar: "دليل محدد (ماضٍ بسيط)" },
          pattern: "Past time marker + Subject + V2",
          example: "Last summer, I designed a reading camp.",
          arabic: "في الصيف الماضي، صمّمت معسكرًا للقراءة.",
        },
        {
          label: { en: "For vs Since", ar: "الفرق بين for وsince" },
          pattern: "for + length of time | since + start point",
          example: "for 6 months / since January",
          arabic: "لمدة ٦ أشهر / منذ يناير",
        },
      ],
      commonMistakes: [
        {
          wrong: "I live in Dammam since 2020.",
          right: "I have lived in Dammam since 2020.",
          why: {
            en: "Actions starting in the past and continuing now require Present Perfect, not Present Simple.",
            ar: "الفعل الذي بدأ في الماضي وما زال مستمرًا يحتاج مضارعًا تامًا لا مضارعًا بسيطًا.",
          },
        },
        {
          wrong: "She has worked here since three years.",
          right: "She has worked here for three years.",
          why: {
            en: "'Three years' is a duration, so use 'for' (not 'since').",
            ar: "three years مدة زمنية فتأخذ for وليس since.",
          },
        },
      ],
      memoryTip: {
        en: "Open wide with Present Perfect (the headline); zoom in with Past Simple (the exact date & story)!",
        ar: "ابدأ بالعنوان العريض (مضارع تام)، ثم قرّب الصورة للتاريخ والتفاصيل (ماضٍ بسيط)!",
      },
    },
    pickWord: makePickWord({
      sentence: "Our team has used this platform ___ 2023.",
      options: ["for", "since", "ago", "during"],
      correct: 1,
      explanation: {
        en: "'2023' is a starting point in time, so it pairs with 'since'.",
        ar: "سنة 2023 نقطة بداية زمنية لذلك نستخدم since.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["I", "have", "led", "three", "workshops", "this", "year."],
      explanation: {
        en: "'This year' is an unfinished time period, so Present Perfect ('have led') fits.",
        ar: "this year فترة لم تنتهِ بعد، لذلك نستخدم المضارع التام have led.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a fitting sentence about an ongoing experience using 'have' (or 'has') and 'since' or 'for'.",
      cueWords: ["have / has", "since / for"],
      requiredTerms: ["have|has|'ve|'s", "since|for"],
      modelSentence: "I have studied English for two years.",
      sentenceHint: {
        en: "Pattern: I have + [V3] + ... + for [duration] / since [year].",
        ar: "النمط: I have + [التصريف الثالث] + ... + for [مدة] أو since [سنة].",
      },
      explanation: {
        en: "Combine 'have/has + V3' with 'for' (duration) or 'since' (start date).",
        ar: "نربط have/has + التصريف الثالث مع for للمدة أو since لنقطة البداية.",
      },
    }),
  },

  "b1-grammar-conditionals": {
    guide: {
      summary: {
        en: "First Conditional expresses realistic future outcomes (If + Present Simple, will + base verb), whereas Second Conditional explores imagined or unlikely present/future situations (If + Past Simple, would + base verb).",
        ar: "تعبّر الشرطية الأولى عن نتائج مستقبلية واقعية وممكنة (If + مضارع بسيط، will + مصدر)، بينما تعبّر الشرطية الثانية عن مواقف متخيلة أو غير محتملة (If + ماضٍ بسيط، would + مصدر).",
      },
      whenToUse: [
        {
          en: "1st Conditional: real plans, warnings, negotiations ('If we leave at six, we will beat traffic').",
          ar: "الشرطية الأولى للخطط الواقعية والتحذيرات والتفاوض.",
        },
        {
          en: "2nd Conditional: hypothetical choices and polite advice ('If I were you, I would accept the offer').",
          ar: "الشرطية الثانية للمواقف الافتراضية والنصائح المهذبة.",
        },
        {
          en: "Never put 'will' or 'would' directly inside the 'If' clause!",
          ar: "لا تضع will أو would أبدًا داخل جملة If!",
        },
      ],
      formulas: [
        {
          label: { en: "1st Conditional (Real)", ar: "الشرطية الأولى (واقعية)" },
          pattern: "If + Present Simple, S + will/can + base",
          example: "If you practise daily, your fluency will grow.",
          arabic: "إذا تدربت يوميًا ستنمو طلاقتك.",
        },
        {
          label: { en: "2nd Conditional (Imagined)", ar: "الشرطية الثانية (افتراضية)" },
          pattern: "If + Past Simple, S + would/could + base",
          example: "If I had more time, I would learn coding.",
          arabic: "لو كان لدي وقت أكثر لتعلمت البرمجة.",
        },
        {
          label: { en: "Advice Formula", ar: "صيغة النصيحة" },
          pattern: "If I were you, I would + base verb",
          example: "If I were you, I would compare both offers.",
          arabic: "لو كنت مكانك لقارنت العرضين.",
        },
      ],
      commonMistakes: [
        {
          wrong: "If it will rain tomorrow, we will cancel.",
          right: "If it rains tomorrow, we will cancel.",
          why: {
            en: "Use Present Simple ('rains') inside the 'If' clause—not 'will'.",
            ar: "نستخدم المضارع البسيط داخل جملة If وليس will.",
          },
        },
        {
          wrong: "If I would have a car, I would drive there.",
          right: "If I had a car, I would drive there.",
          why: {
            en: "Use Past Simple ('had') inside the 2nd conditional 'If' clause.",
            ar: "نستخدم الماضي البسيط had داخل جملة If في الشرطية الثانية.",
          },
        },
      ],
      memoryTip: {
        en: "Real possibility → Present + WILL. Hypothetical dream → Past + WOULD. Keep WILL/WOULD out of the IF clause!",
        ar: "واقعي = مضارع + will. افتراضي = ماضٍ + would. ولا تضع will/would بعد if أبدًا!",
      },
    },
    pickWord: makePickWord({
      sentence: "If I ___ you, I would review the contract carefully.",
      options: ["am", "were", "will be", "would be"],
      correct: 1,
      explanation: {
        en: "Formal 2nd Conditional advice uses 'If I were you, I would...'.",
        ar: "صيغة النصيحة الافتراضية الصحيحة هي If I were you, I would...",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["If", "we", "leave", "early,", "we", "will", "arrive", "first."],
      explanation: {
        en: "1st Conditional pairs 'If + Present Simple (leave)' with 'will + base verb (arrive)'.",
        ar: "تربط الشرطية الأولى If + المضارع البسيط (leave) بجواب الشرط will arrive.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a fitting 1st or 2nd conditional sentence using 'If' and either 'will' or 'would'.",
      cueWords: ["If", "will / would"],
      requiredTerms: ["if", "will|would|'ll|'d"],
      modelSentence: "If I finish my work early, I will join the study club.",
      sentenceHint: {
        en: "Pattern: If + [condition], I will / would + [base verb]...",
        ar: "النمط: If + [الشرط]، I will أو I would + [الفعل الأساسي]...",
      },
      explanation: {
        en: "Match Present Simple with 'will' (real) or Past Simple with 'would' (imagined).",
        ar: "طابق المضارع البسيط مع will للواقع، أو الماضي البسيط مع would للافتراض.",
      },
    }),
  },

  "b1-grammar-passive-voice": {
    guide: {
      summary: {
        en: "The Passive Voice (be + past participle V3) shifts focus from WHO performed an action to WHAT happened or the process itself—essential in reports, quality checks, and science.",
        ar: "ينقل المبني للمجهول (be + التصريف الثالث V3) التركيز من الفاعل إلى الحدث أو العملية نفسها—وهو أساسي في التقارير وفحوصات الجودة والعلوم.",
      },
      whenToUse: [
        {
          en: "Processes and procedures where the steps matter more than the person ('Coffee beans are roasted at 200°C').",
          ar: "العمليات والإجراءات حين تكون الخطوات أهم من الشخص القائم بها.",
        },
        {
          en: "When the agent is unknown, obvious, or formal ('The report was submitted on time').",
          ar: "عندما يكون الفاعل غير معروف أو مفهومًا من السياق.",
        },
        {
          en: "Add 'by + agent' ONLY when the doer adds meaningful new information.",
          ar: "أضف by + الفاعل فقط عندما يضيف ذكر الفاعل معلومة مهمة.",
        },
      ],
      formulas: [
        {
          label: { en: "Present Simple Passive", ar: "مضارع بسيط مجهول" },
          pattern: "Subject + am/is/are + V3",
          example: "Every order is checked before shipping.",
          arabic: "يُفحص كل طلب قبل الشحن.",
        },
        {
          label: { en: "Past Simple Passive", ar: "ماضٍ بسيط مجهول" },
          pattern: "Subject + was/were + V3",
          example: "The bridge was built in 2019.",
          arabic: "بُني الجسر عام ٢٠١٩.",
        },
        {
          label: { en: "Modal Passive", ar: "مجهول مع فعل ناقص" },
          pattern: "Subject + must/should/can + be + V3",
          example: "Passwords must be updated regularly.",
          arabic: "يجب تحديث كلمات المرور بانتظام.",
        },
      ],
      commonMistakes: [
        {
          wrong: "The files were send yesterday.",
          right: "The files were sent yesterday.",
          why: {
            en: "Passive always needs the V3 past participle ('sent'), never base form ('send').",
            ar: "المبني للمجهول يحتاج دائمًا للتصريف الثالث sent لا المصدر send.",
          },
        },
        {
          wrong: "The lab checks every day by engineers (meaning inspected).",
          right: "The lab is checked every day by engineers.",
          why: {
            en: "The lab receives the action, so it needs 'is checked'.",
            ar: "المختبر يتلقى الفعل فيحتاج صيغة المجهول is checked.",
          },
        },
      ],
      memoryTip: {
        en: "Passive = RIGHT TENSE OF 'BE' + V3. Never forget the 'BE' verb!",
        ar: "المبني للمجهول = فعل BE في الزمن المناسب + التصريف الثالث V3. لا تنسَ BE أبدًا!",
      },
    },
    pickWord: makePickWord({
      sentence: "Fresh samples ___ tested in the laboratory every morning.",
      options: ["is", "are", "was", "be"],
      correct: 1,
      explanation: {
        en: "'Fresh samples' is plural and 'every morning' is present routine, so use 'are tested'.",
        ar: "الفاعل جمع (Fresh samples) والزمن مضارع متكرر، فنستخدم are.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["Every", "package", "is", "checked", "before", "delivery."],
      explanation: {
        en: "Singular receiver 'Every package' + 'is' + past participle 'checked' + time phrase.",
        ar: "المفعول المفرد Every package + is + التصريف الثالث checked.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a fitting passive sentence describing a rule or process using 'is' or 'was' and 'checked' or 'built'.",
      cueWords: ["is / was", "checked / built"],
      requiredTerms: ["is|are|was|were", "checked|built|made|tested"],
      modelSentence: "The safety report was checked before the meeting.",
      sentenceHint: {
        en: "Pattern: [Thing/System] + is/was + checked/built + [detail].",
        ar: "النمط: [الشيء/النظام] + is/was + checked أو built + [تفصيل].",
      },
      explanation: {
        en: "Form passive voice by combining the right tense of 'be' with a past participle (V3).",
        ar: "يتكون المبني للمجهول من فعل الكينونة في الزمن المناسب مع التصريف الثالث.",
      },
    }),
  },

  "b1-grammar-reported-speech": {
    guide: {
      summary: {
        en: "Reported Speech summarises what someone said without quotation marks. Typically, verb tenses shift one step back (am → was, will → would), pronouns adjust to perspective, and reported questions switch to normal statement word order.",
        ar: "يلخّص الكلام المنقول ما قاله شخص ما دون علامات تنصيص. غالبًا يعود زمن الفعل خطوة للوراء (am ← was وwill ← would)، وتتغير الضمائر حسب السياق، وتأخذ الأسئلة المنقولة ترتيب الجملة الخبرية العادية.",
      },
      whenToUse: [
        {
          en: "Use 'said (that) ...' WITHOUT a person object, and 'told + person + (that) ...' WITH a person object.",
          ar: "استخدم said دون مفعول شخصي، وtold متبوعة بالشخص المخاطب (told me).",
        },
        {
          en: "Backshift verbs after 'said/told': is → was, have → had, will → would, can → could.",
          ar: "إرجاع الزمن خطوة للخلف بعد said/told: is←was وwill←would وcan←could.",
        },
        {
          en: "Reported questions use 'asked if/whether' or 'asked + wh-word' + SUBJECT BEFORE VERB (no 'do/does/did').",
          ar: "في السؤال المنقول نستخدم asked if أو أداة السؤال ثم الفاعل قبل الفعل دون do/did.",
        },
      ],
      formulas: [
        {
          label: { en: "Statement (said vs told)", ar: "الجملة الخبرية" },
          pattern: "S + said (that)... | S + told me (that)...",
          example: "The manager told us that the launch was ready.",
          arabic: "أخبرنا المدير أن الإطلاق جاهز.",
        },
        {
          label: { en: "Yes/No Question", ar: "سؤال نعم/لا منقول" },
          pattern: "S + asked (me) if/whether + S + V",
          example: "She asked if I had finished the report.",
          arabic: "سألت إن كنت قد أنهيت التقرير.",
        },
        {
          label: { en: "Wh- Question", ar: "سؤال أداة استفهام منقول" },
          pattern: "S + asked + wh-word + S + V (statement order)",
          example: "He asked where the seminar was.",
          arabic: "سأل أين كانت الندوة.",
        },
      ],
      commonMistakes: [
        {
          wrong: "He said me that the train was delayed.",
          right: "He told me that the train was delayed.",
          why: {
            en: "Always use 'told + person' (or 'said to me'), never 'said me'.",
            ar: "نقول told me أو said to me ولا نقول said me أبدًا.",
          },
        },
        {
          wrong: "She asked where did I live.",
          right: "She asked where I lived.",
          why: {
            en: "Reported questions use statement word order—drop 'did'.",
            ar: "السؤال المنقول يأخذ ترتيب الجملة الخبرية ويُحذف منه did.",
          },
        },
      ],
      memoryTip: {
        en: "TELL needs a PERSON ('told me'). Reported questions drop 'do/did' and put Subject → Verb!",
        ar: "الفعل tell يحتاج شخصًا بعده (told me)، والسؤال المنقول يحذف do/did ويعيد الترتيب: فاعل ثم فعل!",
      },
    },
    pickWord: makePickWord({
      sentence: "The instructor ___ us that the exam would begin at nine.",
      options: ["said", "told", "spoke", "talked"],
      correct: 1,
      explanation: {
        en: "Because the listener 'us' follows directly without 'to', use 'told'.",
        ar: "لأن المخاطب us جاء مباشرة دون to نستخدم told.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["She", "asked", "if", "we", "were", "ready."],
      explanation: {
        en: "Reported Yes/No questions follow: asked + if + subject ('we') + verb ('were').",
        ar: "يتبع السؤال المنقول الترتيب: asked + if + الفاعل we + الفعل were.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt: "Write a fitting reported statement using 'told' and 'would'.",
      cueWords: ["told", "would"],
      requiredTerms: ["told", "would"],
      modelSentence: "The manager told us that the team would start early.",
      sentenceHint: {
        en: "Pattern: [Person] + told + [me/us] + (that) + ... + would + [base verb].",
        ar: "النمط: [الشخص] + told + [me/us] + (that) + ... + would + [الفعل الأساسي].",
      },
      explanation: {
        en: "Follow 'told' with a listener (me/us/him) and shift 'will' back to 'would'.",
        ar: "يتبع told الشخص المخاطب وتتحول will إلى would في الكلام المنقول.",
      },
    }),
  },

  "b1-grammar-relative-clauses": {
    guide: {
      summary: {
        en: "Relative clauses join two ideas smoothly using relative pronouns: 'who' (people), 'which/that' (things), 'where' (places), and 'whose' (possession). Commas separate extra (non-defining) information from essential (defining) information.",
        ar: "تربط جمل الوصل فكرتين بسلاسة باستخدام ضمائر الوصل: who للأشخاص، وwhich/that للأشياء، وwhere للأماكن، وwhose للملكية. وتفصل الفواصل المعلومة الإضافية عن المعلومة الأساسية.",
      },
      whenToUse: [
        {
          en: "Use 'who' for people, 'which/that' for things, 'where' for locations, and 'whose + noun' for possession.",
          ar: "استخدم who للأشخاص وwhich/that للأشياء وwhere للأماكن وwhose للملكية.",
        },
        {
          en: "Defining clauses (no commas) identify WHICH person/thing you mean—'that' is allowed here.",
          ar: "جملة الوصل المحدِّدة بلا فواصل وتسمح باستخدام that.",
        },
        {
          en: "Non-defining clauses (between commas) add extra info—use 'who/which', NEVER 'that'!",
          ar: "جملة الوصل الإضافية بين فاصلتين ولا يُستخدم فيها that أبدًا!",
        },
      ],
      formulas: [
        {
          label: { en: "People / Things", ar: "أشخاص / أشياء" },
          pattern: "Noun + who / which / that + clause",
          example: "The mentor who guided us is a writer.",
          arabic: "المرشد الذي وجّهنا كاتب.",
        },
        {
          label: { en: "Place / Possession", ar: "مكان / ملكية" },
          pattern: "Place + where + S+V | Noun + whose + noun",
          example: "That is the studio whose audio is clearest.",
          arabic: "هذا هو الاستوديو الذي صوته الأوضح.",
        },
        {
          label: { en: "Extra Info (Commas)", ar: "معلومة إضافية (بفواصل)" },
          pattern: "Specific Noun, which/who ..., main verb",
          example: "Riyadh, which hosts the book fair, is growing fast.",
          arabic: "الرياض، التي تستضيف معرض الكتاب، تنمو بسرعة.",
        },
      ],
      commonMistakes: [
        {
          wrong: "The book that I bought it is great.",
          right: "The book that I bought is great.",
          why: {
            en: "Never repeat a pronoun ('it') when 'that/which' already stands for the noun (a very common Arabic transfer error!).",
            ar: "لا تكرر الضمير it لأن ضمير الوصل ينوب عنه (خطأ شائع بسبب النقل من العربية: الكتاب الذي اشتريته).",
          },
        },
        {
          wrong: "My brother, that lives in Taif, is a pilot.",
          right: "My brother, who lives in Taif, is a pilot.",
          why: {
            en: "Never use 'that' after a comma in a non-defining clause.",
            ar: "لا نستخدم that أبدًا بعد الفاصلة في الجملة الاعتراضية.",
          },
        },
      ],
      memoryTip: {
        en: "No shadow pronouns ('the book that I bought ✗it') and NO 'that' after a comma!",
        ar: "احذف الضمير العائد المكرر (بلا it)، ولا تستخدم that بعد الفاصلة أبدًا!",
      },
    },
    pickWord: makePickWord({
      sentence: "That is the engineer ___ software powers our hospital.",
      options: ["who", "which", "whose", "where"],
      correct: 2,
      explanation: {
        en: "'Whose' shows possession before the noun 'software' ('the engineer's software').",
        ar: "تعبّر whose عن الملكية قبل الاسم software.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["The", "app", "which", "we", "built", "works", "offline."],
      explanation: {
        en: "Relative pronoun 'which' links 'The app' directly to 'we built' without any extra 'it'.",
        ar: "يربط ضمير الوصل which الاسم The app بالجملة we built دون ضمير مكرر.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt: "Write a fitting sentence defining a person or place using 'who' or 'where'.",
      cueWords: ["who / where"],
      requiredTerms: ["who|where"],
      modelSentence: "A mentor is someone who gives honest feedback.",
      sentenceHint: {
        en: "Pattern: [Person/Place] + who/where + [clause]...",
        ar: "النمط: [شخص أو مكان] + who أو where + [جملة وصفية]...",
      },
      explanation: {
        en: "Use 'who' directly after a person or 'where' after a place, without repeating an extra object pronoun.",
        ar: "ضع who بعد الشخص أو where بعد المكان دون تكرار ضمير عائد.",
      },
    }),
  },

  "b1-grammar-gerunds-infinitives": {
    guide: {
      summary: {
        en: "When two verbs meet in English, the first verb decides whether the second takes a gerund (-ing) or a to-infinitive (to + base). Some verbs like 'stop' and 'remember' even change meaning depending on which pattern follows!",
        ar: "عندما يتجاور فعلان في الإنجليزية يحدّد الفعل الأول هل يأخذ الثاني صيغة المصدر مع -ing أم to + الفعل الأساسي، بل إن بعض الأفعال مثل stop وremember يتغير معناها حسب الصيغة!",
      },
      whenToUse: [
        {
          en: "Verb + -ing (Gerund): enjoy, avoid, finish, suggest, recommend, mind, keep, and ALL verbs after prepositions (interested in learning).",
          ar: "الفعل + -ing بعد enjoy وavoid وfinish وsuggest وبعد كل حروف الجر.",
        },
        {
          en: "Verb + to-infinitive: decide, plan, manage, afford, promise, refuse, hope, offer.",
          ar: "الفعل + to + المصدر بعد decide وplan وmanage وafford وrefuse.",
        },
        {
          en: "Meaning change: 'stop smoking' (quit a habit) vs 'stop to drink water' (pause in order to drink).",
          ar: "تغيّر المعنى: stop + -ing (يتوقف عن عادة) مقابل stop + to (يتوقف لكي يفعل شيئًا).",
        },
      ],
      formulas: [
        {
          label: { en: "Gerund Verbs", ar: "أفعال يتبعها -ing" },
          pattern: "enjoy / avoid / recommend / finish + V-ing",
          example: "I recommend reading aloud for ten minutes.",
          arabic: "أنصح بالقراءة الجهرية لعشر دقائق.",
        },
        {
          label: { en: "Infinitive Verbs", ar: "أفعال يتبعها to" },
          pattern: "decide / manage / afford / promise + to + V",
          example: "She managed to finish before noon.",
          arabic: "تمكنت من الانتهاء قبل الظهر.",
        },
        {
          label: { en: "After Prepositions", ar: "بعد حروف الجر" },
          pattern: "preposition (in/at/for/before/without) + V-ing",
          example: "Thank you for helping our team.",
          arabic: "شكرًا لمساعدتك فريقنا.",
        },
      ],
      commonMistakes: [
        {
          wrong: "I enjoy to read biographies.",
          right: "I enjoy reading biographies.",
          why: {
            en: "'Enjoy' always takes a gerund (-ing), never 'to + verb'.",
            ar: "الفعل enjoy يأخذ دائمًا verb-ing ولا يأخذ to.",
          },
        },
        {
          wrong: "He is good at speak English.",
          right: "He is good at speaking English.",
          why: {
            en: "Any verb directly after a preposition ('at', 'in', 'about') MUST be -ing.",
            ar: "أي فعل يأتي مباشرة بعد حرف جر مثل at يجب أن يكون بصيغة -ing.",
          },
        },
      ],
      memoryTip: {
        en: "Preposition + Verb = ALWAYS -ING! And remember: enjoy/avoid/finish + -ING vs decide/manage/refuse + TO.",
        ar: "حرف جر + فعل = دائمًا -ing! واحفظ: enjoy/avoid/finish مع -ing، وdecide/manage/refuse مع to.",
      },
    },
    pickWord: makePickWord({
      sentence: "We decided ___ our study schedule before exams.",
      options: ["updating", "to update", "update", "updated"],
      correct: 1,
      explanation: {
        en: "'Decide' is always followed by the to-infinitive ('to update').",
        ar: "يتبع الفعل decide دائمًا صيغة to + المصدر (to update).",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["She", "avoids", "checking", "her", "phone", "while", "studying."],
      explanation: {
        en: "'Avoid' takes the gerund 'checking' directly after it.",
        ar: "يأخذ الفعل avoid صيغة -ing (checking) مباشرة بعده.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a fitting sentence about a habit using 'enjoy' + a verb ending in '-ing', OR 'decided to'.",
      cueWords: ["enjoy / decided to"],
      requiredTerms: ["enjoy|decided to|plan to|recommend"],
      modelSentence: "I enjoy reading short English articles before breakfast.",
      sentenceHint: {
        en: "Pattern: I enjoy + [verb-ing] ... OR I decided to + [base verb] ...",
        ar: "النمط: I enjoy + [فعل مع ing]... أو I decided to + [فعل أساسي]...",
      },
      explanation: {
        en: "Match 'enjoy/recommend' with a gerund (-ing) or 'decided/plan' with 'to + base verb'.",
        ar: "طابق enjoy مع -ing أو decided مع to + الفعل الأساسي.",
      },
    }),
  },

  // ===================== KIDS GRAMMAR (2) =====================
  "kids-my-family": {
    guide: {
      summary: {
        en: "Use 'have got' / 'has got' to talk about family members and pets, and 'This is...' to point to and introduce people warmly!",
        ar: "نستخدم have got / has got للتحدث عن أفراد العائلة والحيوانات الأليفة، وThis is لتقديم الأشخاص والتعريف بهم بلطف!",
      },
      whenToUse: [
        {
          en: "Use 'have got' with I, you, we, they ('I have got one brother').",
          ar: "استخدم have got مع I وyou وwe وthey.",
        },
        {
          en: "Use 'has got' with he, she, it ('She has got a small cat').",
          ar: "استخدم has got مع he وshe وit.",
        },
        {
          en: "Flip 'Have/Has' to the front to ask a question: 'Have you got a pet?'",
          ar: "قدّم Have أو Has في البداية لتسأل: Have you got a pet?",
        },
      ],
      formulas: [
        {
          label: { en: "I / We / You / They", ar: "الجمع وI" },
          pattern: "I / You / We / They + have got + family/pet",
          example: "I have got two sisters.",
          arabic: "لديّ أختان.",
        },
        {
          label: { en: "He / She", ar: "المفرد الغائب" },
          pattern: "He / She + has got + family/pet",
          example: "Omar has got a friendly cat.",
          arabic: "لدى عمر قطة لطيفة.",
        },
        {
          label: { en: "Question", ar: "السؤال" },
          pattern: "Have / Has + Subject + got + ...?",
          example: "Have you got a brother?",
          arabic: "هل لديك أخ؟",
        },
      ],
      commonMistakes: [
        {
          wrong: "She have got a baby sister.",
          right: "She has got a baby sister.",
          why: {
            en: "With 'he' and 'she', always use 'has got'.",
            ar: "مع he وshe نستخدم has got دائمًا.",
          },
        },
        {
          wrong: "You have got a pet?",
          right: "Have you got a pet?",
          why: {
            en: "Move 'Have' before 'you' to make a question.",
            ar: "قدّم Have قبل you لتكوين السؤال الصحيح.",
          },
        },
      ],
      memoryTip: {
        en: "I/You/We/They → HAVE got. He/She → HAS got. Point & smile with 'This is my...!'",
        ar: "I/You/We/They مع have got، وHe/She مع has got، وللتعريف قل This is my...!",
      },
    },
    pickWord: makePickWord({
      sentence: "My cousin Sara ___ got a cute white rabbit.",
      options: ["have", "has", "is", "are"],
      correct: 1,
      explanation: {
        en: "'Sara' is 'she', so we use 'has got'.",
        ar: "سارة مفرد مؤنث (she) لذلك نستخدم has got.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["I", "have", "got", "one", "brother."],
      explanation: {
        en: "Start with 'I', then 'have got', then the number and family word.",
        ar: "نبدأ بـ I ثم have got ثم العدد واسم فرد العائلة.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt: "Write a fun sentence about your family or a pet using 'have got' or 'has got'.",
      cueWords: ["have got / has got"],
      requiredTerms: ["have got|has got|'ve got|'s got"],
      modelSentence: "I have got one sister and a happy cat.",
      sentenceHint: {
        en: "Pattern: I have got + [brother / sister / cat]...",
        ar: "النمط: I have got + [أخ / أخت / قطة]...",
      },
      explanation: {
        en: "Use 'I have got' or 'He/She has got' followed by a family member or pet.",
        ar: "نستخدم I have got أو He/She has got متبوعة بأحد أفراد العائلة أو حيوان أليف.",
      },
    }),
  },

  "kids-present-simple": {
    guide: {
      summary: {
        en: "We use the Present Simple to talk about fun things we do every day! With 'he' and 'she', add a special '-s' or '-es' to the action word—unless 'does not' is helping!",
        ar: "نستخدم المضارع البسيط للحديث عن الأشياء التي نفعلها كل يوم! مع he وshe نضيف s أو es للفعل، إلا إذا ظهرت does not في الجملة!",
      },
      whenToUse: [
        {
          en: "Use base action words with I, you, we, they ('I brush my teeth').",
          ar: "نستخدم الفعل الأساسي مع I وyou وwe وthey.",
        },
        {
          en: "Add -s or -es with he, she, it ('Maya gets up at seven; she brushes her teeth').",
          ar: "نضيف s أو es مع he وshe وit مثل gets وbrushes.",
        },
        {
          en: "Use 'does not / doesn't' + base verb for he/she negatives ('Omar does not like broccoli').",
          ar: "نستخدم does not / doesn't + الفعل الأساسي للنفي مع المفرد.",
        },
      ],
      formulas: [
        {
          label: { en: "I / You / We / They", ar: "أنا / أنت / نحن / هم" },
          pattern: "Subject + base verb",
          example: "I play with my cat every afternoon.",
          arabic: "ألعب مع قطتي كل مساء.",
        },
        {
          label: { en: "He / She", ar: "هو / هي" },
          pattern: "He/She + verb-s / -es",
          example: "Maya eats breakfast at seven.",
          arabic: "تأكل مايا الإفطار الساعة السابعة.",
        },
        {
          label: { en: "Negative & Question", ar: "النفي والسؤال" },
          pattern: "does not + verb | Does + he/she + verb?",
          example: "Does Omar play football?",
          arabic: "هل يلعب عمر كرة القدم؟",
        },
      ],
      commonMistakes: [
        {
          wrong: "She eat breakfast at seven.",
          right: "She eats breakfast at seven.",
          why: {
            en: "Add '-s' to the action word with 'he' or 'she'!",
            ar: "أضف حرف s للفعل مع he وshe!",
          },
        },
        {
          wrong: "Omar does not likes milk.",
          right: "Omar does not like milk.",
          why: {
            en: "'Does' already has the '-s', so keep 'like' plain!",
            ar: "كلمة does تحمل الـ s، لذا يبقى like دون s!",
          },
        },
      ],
      memoryTip: {
        en: "He/She loves the letter S ('plays, eats')—but when DOES arrives, S jumps onto DOES!",
        ar: "يحبان he وshe حرف s في الفعل (plays, eats)، ولكن عند حضور does ينتقل الحرف إليها!",
      },
    },
    pickWord: makePickWord({
      sentence: "My brother ___ his teeth before bed every night.",
      options: ["brush", "brushes", "brushing", "to brush"],
      correct: 1,
      explanation: {
        en: "'My brother' is 'he', and verbs ending in -sh add '-es': 'brushes'.",
        ar: "مع الفاعل المفرد My brother نضيف es للفعل المنتهي بـ sh: brushes.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["Maya", "gets", "up", "at", "seven", "every", "day."],
      explanation: {
        en: "Subject 'Maya' + verb with -s ('gets up') + time ('at seven every day').",
        ar: "الفاعل Maya + الفعل gets up + الوقت at seven every day.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt: "Write a fitting daily habit sentence using 'every day' and an action verb.",
      cueWords: ["every day"],
      requiredTerms: ["every day"],
      modelSentence: "I read a fun storybook every day.",
      sentenceHint: {
        en: "Pattern: I / She / He + [action] + ... + every day.",
        ar: "النمط: I أو She/He + [الفعل اليومي] + ... + every day.",
      },
      explanation: {
        en: "Use Present Simple with 'every day' to describe a daily routine.",
        ar: "نستخدم المضارع البسيط مع every day لوصف عادة يومية.",
      },
    }),
  },

  // ===================== ADULTS GRAMMAR (1) =====================
  "adults-grammar-questions": {
    guide: {
      summary: {
        en: "English questions follow the golden QuASM order: (Question word) + Auxiliary (do/does/did/am/is/are) + Subject + Main verb. Knowing when to use 'do/does/did' vs 'am/is/are' fixes the #1 mistake adult learners make.",
        ar: "تتبع الأسئلة الإنجليزية الترتيب الذهبي (أداة السؤال + الفعل المساعد + الفاعل + الفعل الرئيسي). معرفة متى نستخدم do/does/did مقابل am/is/are تُصلح أكثر الأخطاء شيوعًا لدى الكبار.",
      },
      whenToUse: [
        {
          en: "Use 'do / does / did' + base verb whenever there is an ACTION verb ('Do you work here?', 'Did she call?').",
          ar: "استخدم do/does/did + الفعل الأساسي مع أفعال الحركة والعمل.",
        },
        {
          en: "Use 'am / is / are / was / were' directly (NO do/did!) with adjectives, nouns, or locations ('Are you ready?').",
          ar: "استخدم am/is/are مباشرة دون do/did مع الصفات والأسماء والأماكن.",
        },
        {
          en: "Keep the main verb in base form after 'does' and 'did' ('Where did you go?', NOT 'Where did you went?').",
          ar: "يبقى الفعل الأساسي مجردًا بعد does وdid.",
        },
      ],
      formulas: [
        {
          label: { en: "Action Question (Present)", ar: "سؤال فعل (مضارع)" },
          pattern: "(Wh-) + Do/Does + Subject + base verb?",
          example: "Where does the bus stop?",
          arabic: "أين تتوقف الحافلة؟",
        },
        {
          label: { en: "Action Question (Past)", ar: "سؤال فعل (ماضٍ)" },
          pattern: "(Wh-) + Did + Subject + base verb?",
          example: "When did you start this job?",
          arabic: "متى بدأت هذا العمل؟",
        },
        {
          label: { en: "State / Adjective Question", ar: "سؤال صفة أو حالة" },
          pattern: "(Wh-) + Am/Is/Are + Subject + adj/noun?",
          example: "Are you free for a quick coffee?",
          arabic: "هل أنت متفرغ لقهوة سريعة؟",
        },
      ],
      commonMistakes: [
        {
          wrong: "Where you work?",
          right: "Where do you work?",
          why: {
            en: "English action questions require the auxiliary 'do/does/did' before the subject.",
            ar: "أسئلة الأفعال في الإنجليزية تحتاج الفعل المساعد do/does/did قبل الفاعل.",
          },
        },
        {
          wrong: "Do you ready for the meeting?",
          right: "Are you ready for the meeting?",
          why: {
            en: "'Ready' is an adjective (no action verb), so use 'Are', not 'Do'.",
            ar: "كلمة ready صفة وليست فعلًا، لذا نستخدم Are وليس Do.",
          },
        },
      ],
      memoryTip: {
        en: "QuASM: (Q)uestion word + (A)uxiliary + (S)ubject + (M)ain verb! Action → Do/Does/Did. Adjective → Am/Is/Are.",
        ar: "الترتيب الذهبي: أداة سؤال + فعل مساعد + فاعل + فعل أساسي! للفعل do/does/did، وللصفة am/is/are.",
      },
    },
    pickWord: makePickWord({
      sentence: "When ___ the downstairs café open on weekdays?",
      options: ["do", "does", "is", "are"],
      correct: 1,
      explanation: {
        en: "'Open' is an action verb and 'the café' is singular (it), so use 'does'.",
        ar: "الفعل open فعل حركة والفاعل مفرد، فنستخدم does.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["Where", "did", "you", "work", "before", "this?"],
      explanation: {
        en: "QuASM order: Question word ('Where') + Auxiliary ('did') + Subject ('you') + Main verb ('work').",
        ar: "الترتيب الصحيح: أداة السؤال Where + الفعل المساعد did + الفاعل you + الفعل الأساسي work.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt: "Write a polite workplace question using 'Do you' or 'Did you' plus a base verb.",
      cueWords: ["Do you / Did you"],
      requiredTerms: ["do you|did you"],
      modelSentence: "Do you have time for a quick meeting today?",
      sentenceHint: {
        en: "Pattern: Do you / Did you + [base verb] + ...?",
        ar: "النمط: Do you أو Did you + [الفعل الأساسي] + ...؟",
      },
      explanation: {
        en: "Put 'Do you' or 'Did you' before the base action verb to form a natural English question.",
        ar: "نضع Do you أو Did you قبل الفعل الأساسي لصياغة سؤال إنجليزي صحيح.",
      },
    }),
  },
};
