import type { GrammarUnit } from "./grammar-curriculum-types";

export const GRAMMAR_UNITS_PART1: GrammarUnit[] = [
  // =========================================================================
  // MODULE 1: PARTS OF SPEECH & CORE SENTENCE STRUCTURE (Orders 1–6)
  // =========================================================================
  {
    id: "nouns-countable-uncountable-plurals",
    order: 1,
    moduleId: "parts-of-speech",
    level: "A1",
    title: {
      en: "Nouns: Countable, Uncountable & Plural Forms",
      ar: "الأسماء: المعدود وغير المعدود وصيغ الجمع",
    },
    overview: {
      en: "English nouns are divided into countable nouns (things you can count individually, with singular and plural forms) and uncountable nouns (substances, concepts, or collective categories treated as singular). Mastering plural spelling rules and uncountable noun boundaries prevents errors with articles, quantifiers, and verb agreement.",
      ar: "تنقسم الأسماء في الإنجليزية إلى أسماء معدودة (يمكن عدّها ولها مفرد وجمع) وأسماء غير معدودة (المواد والأفكار والمفاهيم المجردة التي تُعامل معاملة المفرد دائماً). إتقان قواعد الجمع والتمييز بين المعدود وغير المعدود يحميك من أخطاء الأدوات وتوافق الفعل.",
    },
    formula:
      "Countable: a/an + Singular | Number + Plural (-s/-es/-ies/irregular)  •  Uncountable: [no a/an] + Singular Verb",
    forms: {
      affirmative: "There are three books on the desk, and there is useful information inside.",
      negative: "There aren't any chairs left, and we don't have much time.",
      question: "How many apples do you need, and how much water is in the bottle?",
    },
    rules: [
      {
        en: "Add -s to most countable nouns (book → books). Add -es after -s, -sh, -ch, -x, or -z (box → boxes, watch → watches). Change consonant + y to -ies (city → cities).",
        ar: "نضيف -s لمعظم الأسماء المعدودة (book → books)، ونضيف -es بعد الحروف -s, -sh, -ch, -x, -z (box → boxes)، ونحوّل حرف y المسبوق بساكن إلى -ies (city → cities).",
      },
      {
        en: "Memorize high-frequency irregular plurals that do not take -s: man → men, woman → women, child → children, foot → feet, tooth → teeth, mouse → mice, person → people.",
        ar: "احفظ الجموع الشاذة الشائعة التي لا تأخذ -s مثل: man → men، وwoman → women، وchild → children، وfoot → feet، وperson → people.",
      },
      {
        en: "Uncountable nouns (information, advice, furniture, luggage, equipment, homework, news, research) never take a/an or plural -s, and they always take a singular verb.",
        ar: "الأسماء غير المعدودة مثل information وadvice وfurniture وluggage وhomework وnews لا تأخذ a/an ولا تجمع بـ -s، وتأخذ دائماً فعلاً مفرداً.",
      },
      {
        en: "To count uncountable nouns, use a partitive unit expression: a piece of advice, two pieces of furniture, a bottle of water, a cup of coffee, an item of news.",
        ar: "لعدّ الأسماء غير المعدودة نستخدم وحدات تجزئة مثل: a piece of advice (نصيحة)، وtwo pieces of furniture (قطعتا أثاث)، وa bottle of water (زجاجة ماء).",
      },
    ],
    examples: [
      {
        en: "She gave me a great piece of advice before my job interview.",
        ar: "أعطتني نصيحة رائعة قبل مقابلة العمل.",
        highlight: "a great piece of advice",
      },
      {
        en: "The children put their boxes on two wooden shelves.",
        ar: "وضع الأطفال صناديقهم على رفين خشبيين.",
        highlight: "children put their boxes on two wooden shelves",
      },
      {
        en: "This news is encouraging for all new graduates.",
        ar: "هذه الأخبار مشجعة لجميع الخريجين الجدد.",
        highlight: "This news is",
      },
      {
        en: "We need to buy new furniture for the living room.",
        ar: "نحتاج إلى شراء أثاث جديد لغرفة المعيشة.",
        highlight: "new furniture",
      },
    ],
    arabicInterferenceTip: {
      en: "In Arabic, words like 'معلومات' (information), 'نصائح' (advice), 'أخبار' (news), and 'واجبات' (homework) are plural and countable. In English, all of them are strictly uncountable—never say 'informations', 'an advice', or 'homeworks'.",
      ar: "في العربية تُجمع كلمات مثل «معلومات» و«نصائح» و«أخبار» و«واجبات»، لكنها في الإنجليزية غير معدودة إطلاقاً؛ فلا تقل أبداً informations أو an advice أو homeworks.",
    },
    commonMistake: {
      wrong: "He shared many useful informations and two advices with us.",
      right: "He shared a lot of useful information and two pieces of advice with us.",
      why: {
        en: "Both 'information' and 'advice' are uncountable nouns; they cannot take plural -s or 'many'. Use 'a lot of / much' or 'pieces of'.",
        ar: "كلمتا information وadvice غير معدودتين، فلا تقبلان -s الجمع ولا many، بل نستخدم معهما a lot of / much أو pieces of.",
      },
    },
    quickCheck: [
      {
        prompt: "Which sentence is grammatically correct?",
        options: [
          "The manager gave me two advices about the report.",
          "The manager gave me some helpful advice about the report.",
          "The manager gave me an helpful advice about the report.",
          "The manager gave me many advice about the report.",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Advice' is uncountable, so it pairs with 'some' and takes no plural -s or 'a/an'.",
          ar: "كلمة advice غير معدودة، لذا تُستخدم مع some بدون a/an وبدون -s الجمع.",
        },
      },
      {
        prompt: "Choose the correct plural forms of 'child', 'knife', and 'city':",
        options: [
          "childs, knifes, citys",
          "children, knifes, cities",
          "children, knives, cities",
          "childrens, knives, cities",
        ],
        correctIndex: 2,
        explanation: {
          en: "'Child' has the irregular plural 'children'; 'knife' changes -fe to -ves ('knives'); 'city' changes consonant + y to -ies ('cities').",
          ar: "جمع child الشاذ هو children، وكلمة knife تتحول نهايتها -fe إلى -ves فتصبح knives، وكلمة city تصبح cities.",
        },
      },
      {
        prompt: "Complete the sentence: 'The latest news ___ already on the website.'",
        options: ["are", "were", "is", "have"],
        correctIndex: 2,
        explanation: {
          en: "Even though 'news' ends in -s, it is an uncountable singular noun and takes the singular verb 'is'.",
          ar: "رغم أن كلمة news تنتهي بحرف s فإنها اسم غير معدود يعامل معاملة المفرد ويأخذ الفعل is.",
        },
      },
    ],
  },
  {
    id: "pronouns-subject-object-possessive-reflexive-indefinite",
    order: 2,
    moduleId: "parts-of-speech",
    level: "A1",
    title: {
      en: "Pronouns: Subject, Object, Possessive, Reflexive & Indefinite",
      ar: "الضمائر: الفاعل والمفعول والملكية والانعكاسية وغير المحددة",
    },
    overview: {
      en: "Pronouns replace nouns so sentences stay concise and clear. English changes a pronoun's form depending on its grammatical role: subject (I, she, they), object (me, her, them), possessive determiner vs. possessive pronoun (my vs. mine), reflexive (myself, themselves), and indefinite (someone, anything, nobody).",
      ar: "تحل الضمائر محل الأسماء لتجنب التكرار وجعل الجملة واضحة. يتغير شكل الضمير في الإنجليزية حسب وظيفته النحوية: فاعل (I, she, they)، مفعول (me, her, them)، صفة ملكية مقابل ضمير ملكية (my مقابل mine)، ضمير انعكاسي (myself)، وضمير غير محدد (someone, anything).",
    },
    formula:
      "Subject (I/you/he/she/it/we/they) + Verb + Object (me/you/him/her/it/us/them)  •  Possessive Adj + Noun vs. Possessive Pronoun (standalone)",
    forms: {
      affirmative: "She taught herself Spanish, and everyone respects her.",
      negative: "He didn't tell anyone that the laptop was his.",
      question: "Did you invite them to our meeting, or did they come by themselves?",
    },
    rules: [
      {
        en: "Use subject pronouns (I, you, he, she, it, we, they) before the main verb, and object pronouns (me, you, him, her, it, us, them) after verbs and prepositions (between you and me, for her).",
        ar: "استخدم ضمائر الفاعل قبل الفعل الرئيسي، وضمائر المفعول بعد الأفعال وحروف الجر مثل between you and me وfor her.",
      },
      {
        en: "Possessive adjectives (my, your, his, her, its, our, their) always precede a noun, whereas possessive pronouns (mine, yours, his, hers, ours, theirs) stand alone without a noun and never use an apostrophe.",
        ar: "صفات الملكية (my, her, their) يأتي بعدها اسم دائماً، أما ضمائر الملكية (mine, hers, theirs) فتقف وحدها بلا اسم بعدها ولا تأخذ فاصلة عليا أبداً.",
      },
      {
        en: "Use reflexive pronouns (myself, yourself, himself, herself, itself, ourselves, yourselves, themselves) when the subject and object are the same person, or with 'by' to mean 'alone'.",
        ar: "نستخدم الضمائر الانعكاسية عندما يكون الفاعل والمفعول الشخص نفسه (She hurt herself)، أو مع by بمعنى «بمفرده» (by himself).",
      },
      {
        en: "Indefinite pronouns (everyone, someone, nobody, everything, anything) always take a singular verb. Use some- in affirmative sentences and any- in negatives and most questions.",
        ar: "الضمائر غير المحددة مثل everyone وnobody وeverything تأخذ فعلاً مفرداً دائماً. نستخدم some- في الإثبات وany- في النفي ومعظم الأسئلة.",
      },
    ],
    examples: [
      {
        en: "That blue notebook is mine, not hers.",
        ar: "ذلك الدفتر الأزرق لي، وليس لها.",
        highlight: "mine, not hers",
      },
      {
        en: "Please send the final file to Sarah and me before five.",
        ar: "يرجى إرسال الملف النهائي إلى سارة وإليّ قبل الساعة الخامسة.",
        highlight: "Sarah and me",
      },
      {
        en: "Omar fixed the broken bicycle all by himself.",
        ar: "أصلح عمر الدراجة المكسورة بنفسه بالكامل.",
        highlight: "by himself",
      },
      {
        en: "Everyone in the office knows the new password, but nobody wrote it down.",
        ar: "الجميع في المكتب يعرف كلمة المرور الجديدة، لكن لم يكتبها أحد.",
        highlight: "Everyone in the office knows",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic often repeats a pronoun inside the same clause (resumptive pronoun, e.g. 'الكتاب الذي قرأته' literally 'the book that I read it') and uses 'him/her' for inanimate nouns based on grammatical gender. In English, inanimate objects use 'it' (singular) and 'they/them' (plural), and never add an extra object pronoun after a relative pronoun.",
      ar: "في العربية نُذكّر ونؤنث الجماد (السيارة ← هي، الكتاب ← هو) ونضيف ضميراً عائداً في جملة الصلة (الكتاب الذي قرأته). أما في الإنجليزية فالمفرد غير العاقل يأخذ it دائماً، ولا نكرر ضمير المفعول بعد which/that.",
    },
    commonMistake: {
      wrong: "The company changed it's policy, and everyone are happy about it.",
      right: "The company changed its policy, and everyone is happy about it.",
      why: {
        en: "'Its' (no apostrophe) is the possessive form; 'it's' means 'it is'. Also, 'everyone' is grammatically singular and requires 'is'.",
        ar: "كلمة its بدون فاصلة عليا هي للملكية، بينما it's اختصار لـ it is. كما أن everyone يُعامل معاملة المفرد ويأخذ is.",
      },
    },
    quickCheck: [
      {
        prompt: "Choose the correct pronoun: 'The teacher spoke privately to Karim and ___.'",
        options: ["I", "me", "myself", "mine"],
        correctIndex: 1,
        explanation: {
          en: "After the preposition 'to', an object pronoun ('me') is required.",
          ar: "بعد حرف الجر to يجب استخدام ضمير المفعول me وليس ضمير الفاعل I.",
        },
      },
      {
        prompt: "Complete the sentence: '___ in this room has finished the assignment.'",
        options: ["Everyone", "All people", "Both of them", "Many"],
        correctIndex: 0,
        explanation: {
          en: "Only 'Everyone' takes the singular verb 'has finished'.",
          ar: "الضمير Everyone وحده يأخذ الفعل المفرد has finished.",
        },
      },
      {
        prompt: "Which sentence uses a reflexive pronoun correctly?",
        options: [
          "They built the website by theirselves.",
          "He introduced himself to the new clients.",
          "Please give the keys to myself.",
          "We enjoyed myself at the conference.",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Himself' matches the subject 'He' because the subject and object are the same person. Note that 'theirselves' is not a standard English word (use 'themselves').",
          ar: "الضمير himself يطابق الفاعل He لأن الفاعل والمفعول شخص واحد. وكلمة theirselves خاطئة والصواب themselves.",
        },
      },
    ],
  },
  {
    id: "articles-a-an-the-zero-article",
    order: 3,
    moduleId: "parts-of-speech",
    level: "A2",
    title: {
      en: "Articles: a, an, the & Zero Article",
      ar: "أدوات التعريف والتنكير: a وan وthe وغياب الأداة",
    },
    overview: {
      en: "Articles signal whether a noun is general or specific, known or newly introduced. English uses indefinite articles (a/an) for singular countable nouns mentioned for the first time, the definite article (the) for specific or unique items, and the zero article (Ø) for general plural and uncountable nouns.",
      ar: "تُظهر أدوات التعريف والتنكير ما إذا كان الاسم عاماً أم محدداً، معروفاً أم مذكوراً للمرة الأولى. تستخدم الإنجليزية a/an مع المفرد المعدود النكرة، وthe مع المحدد أو الفريد، وغياب الأداة (Zero Article) مع الجمع وغير المعدود عند الحديث بشكل عام.",
    },
    formula:
      "a + consonant sound | an + vowel sound (singular countable)  •  the + specific/unique noun  •  Ø + general plural / uncountable",
    forms: {
      affirmative: "I bought a jacket yesterday; the jacket is warm, and wool lasts for years.",
      negative: "She doesn't drink coffee, and she isn't an engineer.",
      question: "Did you visit the museum near the university on Sunday?",
    },
    rules: [
      {
        en: "Choose 'a' or 'an' by SOUND, not spelling: 'an hour' (silent h), 'an MBA' (starts with /e/ sound), but 'a university' and 'a European city' (start with /juː/ consonant sound).",
        ar: "نختار a أو an حسب الصوت لا الحرف المكتوب: نقول an hour لأن الـ h صامتة، ونقول a university لأنها تبدأ بصوت ساكن /juː/.",
      },
      {
        en: "Use 'a/an' with singular countable nouns for first mention, jobs ('She is a doctor'), and rates ('twice a week', '60 km an hour').",
        ar: "نستخدم a/an مع المفرد المعدود عند الذكر الأول، ومع المهن (She is a doctor)، ومع المعدلات (twice a week).",
      },
      {
        en: "Use 'the' when both speaker and listener know the exact item (second mention, unique things like 'the sun', superlatives like 'the best', musical instruments, oceans, rivers, and plural country names like 'the UAE' or 'the United States').",
        ar: "نستخدم the عندما يكون الاسم محدداً ومعروفاً للطرفين، أو فريداً (the sun)، أو مع التفضيل (the best)، والأنهار والمحيطات والدول بصيغة الجمع أو المركبة مثل the UAE.",
      },
      {
        en: "Use the ZERO article (no article) for generalizations with plural or uncountable nouns ('Life is short', 'Cars cause pollution'), meals, languages, sports, and most single-word countries and cities.",
        ar: "نستخدم غياب الأداة (بدون the) عند التعميم مع الجمع وغير المعدود (Life is short)، ومع الوجبات واللغات والرياضات ومعظم الدول والمدن.",
      },
    ],
    examples: [
      {
        en: "She waited for an hour outside a university library.",
        ar: "انتظرت لمدة ساعة خارج مكتبة جامعية.",
        highlight: "an hour outside a university",
      },
      {
        en: "Education opens doors, especially the education you receive early in life.",
        ar: "التعليم يفتح الأبواب، خصوصاً التعليم الذي تتلقاه في بداية حياتك.",
        highlight: "Education opens doors, especially the education",
      },
      {
        en: "We had dinner in Cairo before flying to the United Kingdom.",
        ar: "تناولنا العشاء في القاهرة قبل السفر إلى المملكة المتحدة.",
        highlight: "dinner in Cairo before flying to the United Kingdom",
      },
      {
        en: "My brother is an architect who designs the tallest buildings in the city.",
        ar: "أخي مهندس معماري يصمم أطول المباني في المدينة.",
        highlight: "an architect who designs the tallest buildings",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic uses 'الـ' (the) for general abstract concepts ('الحياة جميلة' = the life is beautiful) and has no indefinite article before jobs ('أنا معلم' = I am teacher). In English, drop 'the' for general concepts ('Life is beautiful') and always include 'a/an' before singular jobs ('I am a teacher').",
      ar: "تستخدم العربية «الـ» مع المفاهيم العامة (الحياة جميلة، القهوة لذيذة) ولا تستخدم أداة تنكير قبل المهنة (أنا مهندس). أما في الإنجليزية فنحذف the عند التعميم (Life is beautiful) ونضع a/an وجوباً قبل المهنة المفردة (I am an engineer).",
    },
    commonMistake: {
      wrong: "The honesty is important, and my sister is honest lawyer.",
      right: "Honesty is important, and my sister is an honest lawyer.",
      why: {
        en: "Abstract concepts used generally take zero article ('Honesty'), and singular countable nouns like 'lawyer' need 'an' before the silent-h sound in 'honest'.",
        ar: "المفاهيم المجردة العامة لا تأخذ the، والاسم المفرد المعدود يأخذ an قبل الكلمة honest لأن حرف h فيها صامت.",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the sentence: 'He completed ___ online course at ___ European institute.'",
        options: ["a / an", "an / a", "an / an", "the / an"],
        correctIndex: 1,
        explanation: {
          en: "'Online' starts with a vowel sound ('an online course'), while 'European' starts with a /j/ consonant sound ('a European institute').",
          ar: "كلمة online تبدأ بصوت متحرك فتأخذ an، بينما European تبدأ بصوت ساكن /j/ فتأخذ a.",
        },
      },
      {
        prompt: "Which sentence correctly expresses a general truth?",
        options: [
          "The water is essential for the human life.",
          "A water is essential for human life.",
          "Water is essential for human life.",
          "Water is essential for a human life.",
        ],
        correctIndex: 2,
        explanation: {
          en: "Both 'water' and 'human life' are uncountable nouns used in a general sense, so both take the zero article.",
          ar: "كل من water وhuman life أسماء غير معدودة تُستخدم بمعنى عام، لذا لا تأخذ أداة تعريف.",
        },
      },
      {
        prompt: "Choose the correct option: 'We crossed ___ Nile and stayed near ___ Lake Nasser.'",
        options: ["the / —", "— / the", "the / the", "a / —"],
        correctIndex: 0,
        explanation: {
          en: "Rivers take 'the' ('the Nile'), while most single lakes take the zero article ('Lake Nasser').",
          ar: "الأنهار تأخذ the مثل the Nile، أما أسماء البحيرات المفردة فتأتي غالباً بدون أداة مثل Lake Nasser.",
        },
      },
    ],
  },
  {
    id: "adjectives-and-adjective-order",
    order: 4,
    moduleId: "parts-of-speech",
    level: "A2",
    title: {
      en: "Adjectives & Correct Adjective Order",
      ar: "الصفات والترتيب الصحيح للصفات",
    },
    overview: {
      en: "Adjectives describe nouns and pronouns, appearing either before a noun (attributive) or after linking verbs like be, seem, look, and feel (predicative). Unlike Arabic, English adjectives never change for gender or plural, and multiple adjectives follow the OSASCOMP order.",
      ar: "تصف الصفات الأسماء والضمائر، وتأتي إما قبل الاسم أو بعد أفعال الربط مثل be وseem وlook وfeel. وعلى عكس العربية، لا تتغير الصفة في الإنجليزية بالتذكير أو التأنيث أو الجمع، وعند تعدد الصفات تتبع ترتيب OSASCOMP.",
    },
    formula:
      "Opinion → Size → Age → Shape → Color → Origin → Material → Purpose + Noun (OSASCOMP)",
    forms: {
      affirmative: "She bought a beautiful small old Italian leather handbag.",
      negative: "The movie wasn't boring; the actors looked genuinely excited.",
      question: "Is that tall wooden bookcase sturdy enough for heavy dictionaries?",
    },
    rules: [
      {
        en: "Place adjectives BEFORE the noun they modify ('a fast car', not 'a car fast'), or after linking verbs ('The car is fast', 'The soup smells delicious').",
        ar: "توضع الصفة قبل الاسم الموصوف في الإنجليزية (a fast car)، أو بعد أفعال الربط مثل be وsmell وfeel (The soup smells delicious).",
      },
      {
        en: "English adjectives are invariable: never add -s for plural nouns ('three expensive laptops', never 'three expensives laptops').",
        ar: "الصفات في الإنجليزية ثابتة لا تُجمع أبداً؛ نقول three expensive laptops ولا نضيف -s إلى الصفة مطلقاً.",
      },
      {
        en: "When using multiple adjectives before a noun, follow OSASCOMP: Opinion (lovely) → Size (large) → Age (antique) → Shape (round) → Color (brown) → Origin (Moroccan) → Material (wooden) → Purpose (dining) + Noun.",
        ar: "عند تتابع عدة صفات قبل الاسم نتبع الترتيب: الرأي ← الحجم ← العمر ← الشكل ← اللون ← الأصل ← المادة ← الغرض + الاسم.",
      },
      {
        en: "Distinguish -ed vs. -ing participle adjectives: -ed describes a person's feeling ('I am bored / interested'), while -ing describes the cause of the feeling ('The lecture is boring / interesting').",
        ar: "فرّق بين صفات -ed و-ing: المنتهية بـ -ed تصف شعور الشخص (I am bored)، والمنتهية بـ -ing تصف الشيء أو الشخص المسبب للشعور (The lecture is boring).",
      },
    ],
    examples: [
      {
        en: "They live in a charming little white stone cottage near the coast.",
        ar: "يعيشون في كوخ حجري أبيض صغير وساحر قرب الساحل.",
        highlight: "charming little white stone cottage",
      },
      {
        en: "The students felt exhausted after the exhausting three-hour exam.",
        ar: "شعر الطلاب بالإرهاق بعد الامتحان المرهق الذي استغرق ثلاث ساعات.",
        highlight: "exhausted after the exhausting",
      },
      {
        en: "He wore a smart dark-blue wool business suit to the ceremony.",
        ar: "ارتدى بدلة عمل صوفية أنيقة زرقاء داكنة في الحفل.",
        highlight: "smart dark-blue wool business suit",
      },
      {
        en: "Those fresh dates from Al-Ula taste incredibly sweet.",
        ar: "مذاق تلك التمور الطازجة من العلا حلو بشكل رائع.",
        highlight: "fresh dates from Al-Ula taste incredibly sweet",
      },
    ],
    arabicInterferenceTip: {
      en: "In Arabic, adjectives follow the noun and agree in number and gender ('سيارات سريعة'). Learners often place adjectives after the noun or pluralize them in English. Always put the adjective BEFORE the noun and keep it singular ('fast cars').",
      ar: "في العربية تتبع الصفة الموصوف وتطابقه في العدد والنوع (سيارات سريعة)، مما يجعل المتعلم يكتب cars fast أو fasts cars. تذكر دائماً: الصفة قبل الاسم وبصيغة واحدة لا تُجمع.",
    },
    commonMistake: {
      wrong: "We visited a Syrian old lovely restaurant and felt very boring waiting.",
      right: "We visited a lovely old Syrian restaurant and felt very bored waiting.",
      why: {
        en: "Opinion ('lovely') comes before Age ('old') and Origin ('Syrian'). Also, use '-ed' ('bored') to describe how people feel.",
        ar: "صفة الرأي (lovely) تسبق العمر (old) والأصل (Syrian)، كما نستخدم bored لوصف شعور الأشخاص لا boring.",
      },
    },
    quickCheck: [
      {
        prompt: "Which phrase follows natural English adjective order?",
        options: [
          "a leather black stylish jacket",
          "a stylish black leather jacket",
          "a black stylish leather jacket",
          "a stylish leather black jacket",
        ],
        correctIndex: 1,
        explanation: {
          en: "OSASCOMP places Opinion ('stylish') → Color ('black') → Material ('leather') before the noun.",
          ar: "وفق ترتيب OSASCOMP تأتي صفة الرأي (stylish) ثم اللون (black) ثم المادة (leather).",
        },
      },
      {
        prompt: "Complete the sentence: 'Everyone was ___ by the ___ documentary.'",
        options: [
          "fascinating / fascinated",
          "fascinated / fascinating",
          "fascinated / fascinated",
          "fascinating / fascinating",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Fascinated' (-ed) describes the audience's feeling; 'fascinating' (-ing) describes the documentary causing that feeling.",
          ar: "كلمة fascinated تصف شعور الجمهور، بينما fascinating تصف الفيلم الوثائقي المسبب للإعجاب.",
        },
      },
      {
        prompt: "Which sentence is grammatically correct?",
        options: [
          "We bought two expensives tickets for the match.",
          "We bought two tickets expensive for the match.",
          "We bought two expensive tickets for the match.",
          "We bought expensive two tickets for the match.",
        ],
        correctIndex: 2,
        explanation: {
          en: "Numbers come before adjectives, adjectives precede the noun, and adjectives never take plural -s.",
          ar: "العدد يسبق الصفة، والصفة تسبق الاسم، ولا يُضاف للصفة -s الجمع أبداً.",
        },
      },
    ],
  },
  {
    id: "adverbs-manner-frequency-degree-placement",
    order: 5,
    moduleId: "parts-of-speech",
    level: "A2",
    title: {
      en: "Adverbs: Manner, Frequency, Degree & Placement",
      ar: "الظروف: الكيفية والتكرار والدرجة ومواضعها في الجملة",
    },
    overview: {
      en: "Adverbs modify verbs, adjectives, other adverbs, or entire clauses. They answer how (manner: carefully), how often (frequency: usually), how much (degree: extremely), where (place), and when (time). Accurate placement—especially never splitting a verb from its direct object—is key to natural English.",
      ar: "تصف الظروف الأفعال أو الصفات أو ظروفاً أخرى أو الجملة كاملة، وتجيب عن: كيف (الكيفية)، وكم مرة (التكرار)، وإلى أي مدى (الدرجة)، وأين ومتى. وضع الظرف في موضعه الصحيح — دون فصل الفعل عن مفعوله المباشر — أساس طلاقة الجملة.",
    },
    formula:
      "Frequency: Subject + [be + Adv] OR [Adv + Main Verb] OR [Aux + Adv + Main Verb]  •  End Order: Manner → Place → Time",
    forms: {
      affirmative: "She always speaks politely and reviews her notes carefully every evening.",
      negative: "He doesn't usually drive fast, and he is never late for class.",
      question: "Do you often check your email quickly before work?",
    },
    rules: [
      {
        en: "Form most adverbs of manner by adding -ly to an adjective (quick → quickly, careful → carefully). Memorize key exceptions: good → well, fast → fast, hard → hard (note: 'hardly' means 'almost not').",
        ar: "نكوّن معظم ظروف الكيفية بإضافة -ly للصفة (careful → carefully)، مع استثناءات مهمة: good → well وfast → fast وhard → hard (أما hardly فتعني «بالكاد»).",
      },
      {
        en: "Place adverbs of frequency (always, usually, often, sometimes, rarely, never) BEFORE a main verb ('She often reads'), AFTER the verb 'be' ('She is always ready'), and BETWEEN an auxiliary and main verb ('She has never lied').",
        ar: "توضع ظروف التكرار قبل الفعل الرئيسي (She often reads)، وبعد فعل be (She is always ready)، وبين الفعل المساعد والفعل الرئيسي (She has never lied).",
      },
      {
        en: "Do not place an adverb of manner between a verb and its direct object: say 'He speaks English fluently', NOT 'He speaks fluently English'.",
        ar: "لا تفصل بين الفعل ومفعوله المباشر بظرف الكيفية؛ نقول He speaks English fluently وليس He speaks fluently English.",
      },
      {
        en: "When multiple adverbs appear at the end of a clause, use Manner → Place → Time order ('She sang beautifully at the theater last night'). Place adverbs of degree (very, quite, extremely, too) directly before the adjective or adverb they modify, while 'enough' goes AFTER ('warm enough').",
        ar: "عند اجتماع عدة ظروف في نهاية الجملة نرتبها: الكيفية ← المكان ← الزمان. أما ظروف الدرجة فتسبق الصفة أو الظرف (very tall)، باستثناء enough التي تأتي بعدها (tall enough).",
      },
    ],
    examples: [
      {
        en: "Nadia answered every question calmly in the hall yesterday.",
        ar: "أجابت نادية على كل سؤال بهدوء في القاعة أمس.",
        highlight: "calmly in the hall yesterday",
      },
      {
        en: "My manager is always patient, and she rarely raises her voice.",
        ar: "مديرتي صبورة دائماً، ونادراً ما ترفع صوتها.",
        highlight: "is always patient, and she rarely raises",
      },
      {
        en: "He worked hard all semester and performed extremely well.",
        ar: "عمل بجد طوال الفصل الدراسي وأدى بشكل ممتاز للغاية.",
        highlight: "worked hard all semester and performed extremely well",
      },
      {
        en: "The coffee isn't hot enough, and I can hardly taste the cardamom.",
        ar: "القهوة ليست ساخنة بما يكفي، وبالكاد أتذوق الهيل.",
        highlight: "hot enough, and I can hardly taste",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic freely places adverbs between a verb and its object ('يتحدث بطلاقة الإنجليزية') and uses the adjective form as an adverb. In English, keep verb + object together ('speaks English fluently') and use the adverb form ('well', 'fluently'), not the adjective ('good', 'fluent').",
      ar: "في العربية يجوز تقديم الظرف بين الفعل والمفعول (يتحدث بطلاقة الإنجليزية)، كما يخلط المتعلم بين good وwell. في الإنجليزية أبقِ الفعل ملاصقاً لمفعوله واستخدم صيغة الظرف (speaks English fluently / plays well).",
    },
    commonMistake: {
      wrong: "She speaks very good English and goes always to work early.",
      right: "She speaks English very well and always goes to work early.",
      why: {
        en: "Use the adverb 'well' (not adjective 'good') to modify the verb 'speaks' after the object, and place 'always' before the main verb 'goes'.",
        ar: "نستخدم الظرف well (وليس الصفة good) لوصف الفعل speaks بعد المفعول، ونضع always قبل الفعل الرئيسي goes.",
      },
    },
    quickCheck: [
      {
        prompt: "Which sentence has correct adverb placement?",
        options: [
          "He drives carefully his new car.",
          "He always is punctual for meetings.",
          "She has never forgotten a client's name.",
          "We enough studied for the test.",
        ],
        correctIndex: 2,
        explanation: {
          en: "Frequency adverbs like 'never' sit between the auxiliary ('has') and the past participle ('forgotten').",
          ar: "يقع ظرف التكرار never بين الفعل المساعد has والتصريف الثالث forgotten.",
        },
      },
      {
        prompt: "Choose the sentence that follows Manner → Place → Time order:",
        options: [
          "They played yesterday in the park happily.",
          "They played happily in the park yesterday.",
          "They happily played yesterday in the park.",
          "They played in the park yesterday happily.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Standard end-position adverb order is Manner ('happily') → Place ('in the park') → Time ('yesterday').",
          ar: "الترتيب القياسي للظروف في نهاية الجملة هو: الكيفية (happily) ← المكان (in the park) ← الزمان (yesterday).",
        },
      },
      {
        prompt: "Complete the sentence: 'I was so tired that I could ___ keep my eyes open.'",
        options: ["hard", "hardly", "heavily", "good"],
        correctIndex: 1,
        explanation: {
          en: "'Hardly' means 'almost not'. 'Hard' means 'with great effort', which gives the opposite meaning here.",
          ar: "كلمة hardly تعني «بالكاد»، بينما hard تعني «بجهد كبير» وهو عكس المعنى المقصود هنا.",
        },
      },
    ],
  },
  {
    id: "core-sentence-structure-svo-negatives-questions-there-is-are",
    order: 6,
    moduleId: "parts-of-speech",
    level: "A1",
    title: {
      en: "Core Sentence Structure: SVO, Negatives, Questions & There is/are",
      ar: "بنية الجملة الأساسية: الفاعل والفعل والمفعول والنفي والسؤال وThere is/are",
    },
    overview: {
      en: "Every standard English clause requires an explicit subject and a verb, typically in Subject–Verb–Object (SVO) order. Forming negatives and yes/no or wh- questions relies on auxiliary verbs (be, do/does/did, modals), while 'there is / there are' introduces the existence of people or things.",
      ar: "تتطلب كل جملة إنجليزية قياسية فاعلاً صريحاً وفعلاً، ويكون الترتيب الأساسي فيها: فاعل ← فعل ← مفعول (SVO). ويعتمد النفي وتكوين الأسئلة على الأفعال المساعدة (be, do/does/did)، بينما تُستخدم There is / There are للتعبير عن الوجود.",
    },
    formula:
      "Statement: S + V + O  •  Question: (Wh-) + Aux + S + V?  •  Existence: There is + Singular/Uncountable | There are + Plural",
    forms: {
      affirmative: "The library opens at eight, and there are quiet study rooms upstairs.",
      negative: "The library does not open on Fridays, and there isn't a cafeteria inside.",
      question: "Where does your sister work, and are there any buses after midnight?",
    },
    rules: [
      {
        en: "Every English sentence must contain both a subject and a verb—even in descriptions ('The weather is cold', never 'The weather cold') and weather/time expressions using dummy 'it' ('It is raining', 'It is nine o'clock').",
        ar: "يجب أن تحتوي كل جملة إنجليزية على فاعل وفعل، حتى في الجمل الوصفية (The weather is cold)، ومع الطقس والوقت نستخدم الفاعل الشكلي it مثل It is raining.",
      },
      {
        en: "Use Subject–Verb–Object (SVO) order for statements. For questions, invert the auxiliary and subject: 'Are you ready?' or 'Where do they live?' (never keep statement order without inversion in direct questions).",
        ar: "تُبنى الجملة الخبرية بترتيب فاعل ← فعل ← مفعول. وفي السؤال نقدم الفعل المساعد على الفاعل: Are you ready? وWhere do they live?.",
      },
      {
        en: "To make negatives and questions with ordinary verbs (work, play, know), add the helper 'do / does / did' + base verb ('She doesn't know', NOT 'She doesn't knows' or 'She no knows').",
        ar: "لنفي الأفعال العادية أو السؤال عنها نستعين بالفعل المساعد do / does / did متبوعاً بالفعل في المصدر المجرد (She doesn't know وليس doesn't knows).",
      },
      {
        en: "Use 'There is' with singular countable and uncountable nouns ('There is a bank', 'There is milk') and 'There are' with plural nouns ('There are two banks'). Do not confuse 'There is' (existence) with 'It has' (possession).",
        ar: "نستخدم There is مع المفرد وغير المعدود، وThere are مع الجمع للتعبير عن الوجود، ولا نستخدم It has أو Has بمعنى «يوجد».",
      },
    ],
    examples: [
      {
        en: "It is very warm today, so the children are playing in the garden.",
        ar: "الجو دافئ جداً اليوم، لذلك يلعب الأطفال في الحديقة.",
        highlight: "It is very warm today",
      },
      {
        en: "Why does the train leave from platform four on Mondays?",
        ar: "لماذا يغادر القطار من الرصيف الرابع أيام الإثنين؟",
        highlight: "Why does the train leave",
      },
      {
        en: "There is a pharmacy next to the clinic, and there are three parking spaces outside.",
        ar: "توجد صيدلية بجانب العيادة، وهناك ثلاثة مواقف سيارات في الخارج.",
        highlight: "There is a pharmacy next to the clinic, and there are three",
      },
      {
        en: "We do not need a reservation for lunch, do we?",
        ar: "لا نحتاج إلى حجز للغداء، أليس كذلك؟",
        highlight: "We do not need",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic has verbless nominal sentences ('الجو جميل' = 'The weather beautiful') and VSO word order ('كتب الطالب الرسالة' = 'Wrote the student the letter'). In English, always insert 'be' when there is no action verb and keep the subject BEFORE the verb.",
      ar: "الجملة الاسمية في العربية لا تحتاج لفعل في الحاضر (الجو جميل)، والجملة الفعلية تبدأ بالفعل (كتب الطالب الرسالة). أما في الإنجليزية فوجود فعل (مثل is) إلزامي والفاعل يسبق الفعل دائماً.",
    },
    commonMistake: {
      wrong: "In my city have many parks, and the weather very nice.",
      right: "In my city there are many parks, and the weather is very nice.",
      why: {
        en: "Use 'there are' (not 'have') to state that something exists, and include the linking verb 'is' between the subject 'the weather' and the adjective 'nice'.",
        ar: "نستخدم there are للتعبير عن الوجود بدلاً من have، ويجب وضع الفعل is بين الفاعل the weather والصفة nice.",
      },
    },
    quickCheck: [
      {
        prompt: "Choose the grammatically correct question:",
        options: [
          "Where lives your brother?",
          "Where your brother lives?",
          "Where does your brother live?",
          "Where does your brother lives?",
        ],
        correctIndex: 2,
        explanation: {
          en: "Wh- questions with an action verb follow: Wh-word + does + subject + base verb ('live').",
          ar: "السؤال بأداة استفهام مع فعل حركة يتبع الصيغة: أداة الاستفهام + does + الفاعل + الفعل في المصدر (live).",
        },
      },
      {
        prompt: "Complete the sentence: '___ a lot of traffic on the highway this morning.'",
        options: ["There are", "There is", "It has", "Have"],
        correctIndex: 1,
        explanation: {
          en: "'Traffic' is an uncountable noun, so existence is expressed with singular 'There is'.",
          ar: "كلمة traffic غير معدودة، لذا نستخدم معها صيغة المفرد There is.",
        },
      },
      {
        prompt: "Which sentence is complete and grammatically correct?",
        options: [
          "My new colleagues very friendly.",
          "Is raining heavily outside right now.",
          "She doesn't likes spicy food.",
          "It is easy to find the station from here.",
        ],
        correctIndex: 3,
        explanation: {
          en: "'It is easy...' has an explicit dummy subject ('It') and verb ('is'). The other options omit a verb, omit a subject, or double-mark third-person -s.",
          ar: "الجملة الرابعة مكتملة بفاعل (It) وفعل (is)، بينما بقية الخيارات تفتقد فعلاً أو فاعلاً أو تكرر -s بعد doesn't.",
        },
      },
    ],
  },
  // =========================================================================
  // MODULE 2: ALL 12 ENGLISH VERB TENSES (Orders 7–18)
  // =========================================================================
  {
    id: "present-simple-be-and-action-verbs",
    order: 7,
    moduleId: "verb-tenses",
    level: "A1",
    title: {
      en: "Present Simple (be & Action Verbs)",
      ar: "المضارع البسيط (فعل الكون be وأفعال الحركة)",
    },
    overview: {
      en: "The Present Simple expresses daily habits, permanent states, scientific facts, and fixed timetables. It works in two distinct patterns: the verb 'be' (am/is/are), which forms negatives and questions directly, and action verbs, which add -s/-es for he/she/it and use do/does in negatives and questions.",
      ar: "يُستخدم المضارع البسيط للتعبير عن العادات اليومية، والحقائق العلمية، والحالات الدائمة، والمواعيد الثابتة. وله نمطان: فعل الكون be (am/is/are) الذي يُنفى ويُسأل به مباشرة، وأفعال الحركة التي تأخذ -s/-es مع he/she/it وتستعين بـ do/does في النفي والسؤال.",
    },
    formula:
      "be: S + am/is/are  •  Action: I/You/We/They + V1 | He/She/It + V1-s/-es  •  Neg/Q: do/does + S + V1",
    forms: {
      affirmative: "He works in Riyadh, and his office is near the metro station.",
      negative: "He does not work on Saturdays, and he isn't late for shifts.",
      question: "Does he commute by train, and is the station crowded in the morning?",
    },
    rules: [
      {
        en: "Use Present Simple for routines ('I wake up at six'), permanent truths ('Water boils at 100°C'), permanent situations ('She lives in Jeddah'), and fixed public schedules ('The flight departs at 10:15').",
        ar: "نستخدم المضارع البسيط للروتين اليومي، والحقائق العلمية الثابتة، والحالات الدائمة، وجداول المواعيد الرسمية مثل مواعيد الرحلات والقطارات.",
      },
      {
        en: "Add -s to the verb for third-person singular subjects (he/she/it/singular nouns). Add -es after -s, -sh, -ch, -x, -o (watch → watches, go → goes), change consonant + y to -ies (study → studies), and remember 'have → has'.",
        ar: "مع المفرد الغائب (he/she/it) نضيف -s للفعل، أو -es بعد -s/-sh/-ch/-x/-o (go → goes)، ونحوّل y المسبوقة بساكن إلى -ies (study → studies)، وhave تصبح has.",
      },
      {
        en: "NEVER mix 'am/is/are' with a base action verb: say 'She likes tea' and 'Does she like tea?', NOT 'She is like tea' or 'Is she like tea?'.",
        ar: "لا تجمع أبداً بين am/is/are والفعل المجرد؛ نقول She likes tea وDoes she like tea? وليس She is like tea.",
      },
      {
        en: "After 'does' or 'doesn't', the main verb ALWAYS returns to its base form without -s ('He doesn't drive', 'Where does she work?').",
        ar: "بعد does أو doesn't يعود الفعل الرئيسي دائماً إلى المصدر المجرد بدون -s؛ فنقول He doesn't drive وليس He doesn't drives.",
      },
    ],
    examples: [
      {
        en: "The museum opens at nine every morning and closes at six.",
        ar: "يفتح المتحف في التاسعة كل صباح ويغلق في السادسة.",
        highlight: "opens at nine every morning and closes",
      },
      {
        en: "My sister studies medicine, so she rarely has free weekends.",
        ar: "تدرس أختي الطب، لذلك نادراً ما يكون لديها عطلات نهاية أسبوع فارغة.",
        highlight: "studies medicine, so she rarely has",
      },
      {
        en: "Does this café serve decaf coffee, or is it only espresso?",
        ar: "هل يقدم هذا المقهى قهوة منزوعة الكافيين، أم أنه يقدم الإسبريسو فقط؟",
        highlight: "Does this café serve",
      },
      {
        en: "Plants need sunlight and water to produce oxygen.",
        ar: "تحتاج النباتات إلى ضوء الشمس والماء لإنتاج الأكسجين.",
        highlight: "need sunlight and water",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic uses one present tense ('أقرأ') for both habits ('I read every day') and actions happening right now ('I am reading now'). In English, reserve Present Simple for habits and facts, and avoid forgetting the third-person '-s' ('He works', not 'He work').",
      ar: "تستخدم العربية صيغة مضارع واحدة (أعمل) للعادة ولما يحدث الآن معاً. أما في الإنجليزية فالمضارع البسيط مخصص للعادة والحقائق، مع ضرورة الانتباه لعدم نسيان حرف s مع المفرد الغائب (He works).",
    },
    commonMistake: {
      wrong: "My father is work in a hospital and he doesn't likes night shifts.",
      right: "My father works in a hospital and he doesn't like night shifts.",
      why: {
        en: "Do not add 'is' before an action verb in Present Simple, and drop the '-s' from the main verb after 'doesn't'.",
        ar: "لا نضع is قبل فعل الحركة في المضارع البسيط، ونحذف -s من الفعل الرئيسي بعد doesn't.",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the sentence: 'Tariq ___ English online, and his brother ___ Arabic.'",
        options: [
          "teach / study",
          "teaches / studies",
          "teachs / studys",
          "is teach / is study",
        ],
        correctIndex: 1,
        explanation: {
          en: "Both subjects are third-person singular: 'teach' ends in -ch → 'teaches', and 'study' ends in consonant + y → 'studies'.",
          ar: "كلا الفاعلين مفرد غائب: الفعل teach ينتهي بـ -ch فيصبح teaches، وstudy ينتهي بساكن + y فيصبح studies.",
        },
      },
      {
        prompt: "Choose the correct negative sentence:",
        options: [
          "She don't understand the instructions.",
          "She isn't understand the instructions.",
          "She doesn't understands the instructions.",
          "She doesn't understand the instructions.",
        ],
        correctIndex: 3,
        explanation: {
          en: "Third-person singular negative uses 'doesn't' + base verb ('understand').",
          ar: "النفي مع المفرد الغائب يكون باستخدام doesn't متبوعاً بالفعل في المصدر المجرد understand.",
        },
      },
      {
        prompt: "Which question is grammatically correct?",
        options: [
          "Is the bus stop near here, and when does the bus arrive?",
          "Does the bus stop near here, and when is the bus arrive?",
          "Is the bus stop near here, and when the bus arrives?",
          "Are the bus stop near here, and when does the bus arrives?",
        ],
        correctIndex: 0,
        explanation: {
          en: "The first clause uses 'be' ('Is the bus stop...'), and the second uses 'does' + subject + base verb ('does the bus arrive').",
          ar: "الشطر الأول يستخدم فعل الكون Is، والشطر الثاني يستخدم does + الفاعل + المصدر arrive.",
        },
      },
    ],
  },
  {
    id: "present-continuous-and-stative-verbs",
    order: 8,
    moduleId: "verb-tenses",
    level: "A2",
    title: {
      en: "Present Continuous & Stative Verbs",
      ar: "المضارع المستمر والأفعال التقريرية (Stative Verbs)",
    },
    overview: {
      en: "The Present Continuous (am/is/are + verb-ing) describes actions happening at the moment of speaking, temporary projects around now, developing trends, and fixed personal future plans. However, stative verbs of mental states, emotions, senses, and possession normally stay in the simple tense.",
      ar: "يصف المضارع المستمر (am/is/are + V-ing) الأفعال الجارية لحظة الكلام، والمشاريع المؤقتة حالياً، والاتجاهات المتغيرة، والخطط الشخصية المرتبة للمستقبل. أما الأفعال التقريرية (المشاعر والإدراك والملكية) فلا تُستخدم عادة في الصيغة المستمرة.",
    },
    formula: "S + am / is / are + Verb-ing  (NOT with pure stative verbs: know, believe, own, belong)",
    forms: {
      affirmative: "We are preparing the slides right now, and I know the exact figures.",
      negative: "She isn't staying at home this week; she is visiting her aunt.",
      question: "Are you working on the new design, or are you meeting the client later?",
    },
    rules: [
      {
        en: "Use Present Continuous for actions in progress right now ('Look, it is raining'), temporary situations ('I'm living with my cousin until May'), changing trends ('Electric cars are becoming cheaper'), and arranged personal plans ('We're flying to Amman on Thursday').",
        ar: "نستخدم المضارع المستمر للأحداث الجارية الآن، والمواقف المؤقتة، والاتجاهات المتنامية، والخطط الشخصية المؤكدة في المستقبل القريب.",
      },
      {
        en: "Follow -ing spelling rules: drop silent -e (make → making), double the final consonant in short CVC stressed syllables (run → running, begin → beginning), and change -ie to -y (lie → lying).",
        ar: "قواعد إضافة -ing: نحذف e الصامتة (make → making)، ونضاعف الساكن الأخير بعد متحرك قصير منبور (run → running)، ونحوّل -ie إلى -y (lie → lying).",
      },
      {
        en: "Avoid continuous forms with stative verbs expressing thoughts (know, understand, believe, remember), feelings (love, hate, prefer, want, need), and possession (own, belong, contain, cost).",
        ar: "لا نستخدم الصيغة المستمرة مع الأفعال التقريرية الخاصة بالتفكير (know, believe) والمشاعر (want, need, prefer) والملكية (own, belong, cost).",
      },
      {
        en: "Some verbs change meaning between stative (Simple) and dynamic (Continuous): 'I think it's fair' (opinion) vs. 'I'm thinking about moving' (mental action); 'She has a car' (ownership) vs. 'She's having lunch' (activity).",
        ar: "بعض الأفعال يتغير معناها بين البسيط والمستمر: I think (أعتقد/رأي) مقابل I'm thinking about (أفكر في/عملية ذهنية)، وShe has a car (تملك) مقابل She's having lunch (تتناول الغداء).",
      },
    ],
    examples: [
      {
        en: "Please keep your voice down; the baby is sleeping in the next room.",
        ar: "يرجى خفض صوتك؛ فالطفل نائم في الغرفة المجاورة الآن.",
        highlight: "is sleeping",
      },
      {
        en: "I usually drink tea, but this month I am drinking more water.",
        ar: "عادة ما أشرب الشاي، لكن هذا الشهر أشرب ماءً أكثر.",
        highlight: "am drinking more water",
      },
      {
        en: "I understand your concern, and I believe we can solve it today.",
        ar: "أتفهم قلقك، وأعتقد أننا نستطيع حله اليوم.",
        highlight: "understand your concern, and I believe",
      },
      {
        en: "The chef is tasting the soup because it tastes a bit salty.",
        ar: "يتذوق الطاهي الحساء لأن مذاقه مالح قليلاً.",
        highlight: "is tasting the soup because it tastes",
      },
    ],
    arabicInterferenceTip: {
      en: "In Arabic, speakers naturally say 'أنا أفهم الآن' or 'أنا أريد القهوة الآن' with 'now', tempting them to write 'I am understanding now' or 'I am wanting coffee'. In English, stative verbs like understand, know, want, and need stay in Present Simple even with 'right now'.",
      ar: "في العربية نقول «أنا أفهم الآن» و«أنا أريد قهوة الآن»، فيظن المتعلم أنه يجب استخدام -ing مع كلمة now. لكن الأفعال التقريرية مثل understand وwant وknow تبقى في المضارع البسيط حتى مع وجود right now.",
    },
    commonMistake: {
      wrong: "I am knowing the answer, and I am wanting to explain it now.",
      right: "I know the answer, and I want to explain it now.",
      why: {
        en: "'Know' and 'want' are stative verbs describing mental state and desire, so they cannot take the continuous form.",
        ar: "الفعلان know وwant أفعال تقريرية تصف الإدراك والرغبة، ولا تُصاغ في المضارع المستمر.",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the sentence: 'Right now, she ___ the contract, and she ___ every clause.'",
        options: [
          "reads / is understanding",
          "is reading / understands",
          "is reading / is understanding",
          "reads / understands",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Read' is an action in progress right now ('is reading'), whereas 'understand' is a stative verb ('understands').",
          ar: "الفعل read حركة جارية الآن فيأخذ is reading، أما understand ففعل تقريري يبقى في البسيط understands.",
        },
      },
      {
        prompt: "Which sentence uses 'have' correctly in the continuous form?",
        options: [
          "They are having two apartments in Dubai.",
          "She is having a great time at the workshop.",
          "I am having a blue laptop on my desk.",
          "He is having brown eyes like his father.",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Have a great time' is an active experience (dynamic), so continuous is natural; possession and physical traits stay in Present Simple.",
          ar: "التعبير have a great time يدل على نشاط وتجربة فيصح في المستمر، أما الملكية والصفات الجسدية فتبقى في البسيط.",
        },
      },
      {
        prompt: "Choose the sentence that describes a temporary situation around now:",
        options: [
          "Omar lives in Abha since childhood.",
          "Omar is staying in a hotel while his house is painted.",
          "Omar is owning a small bakery downtown.",
          "Omar stays in a hotel every now.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Present Continuous ('is staying') clearly marks a temporary arrangement around the present time.",
          ar: "المضارع المستمر (is staying) يعبّر بدقة عن وضع مؤقت يدور حول الوقت الحاضر.",
        },
      },
    ],
  },
  {
    id: "past-simple-regular-irregular-did",
    order: 9,
    moduleId: "verb-tenses",
    level: "A2",
    title: {
      en: "Past Simple (Regular, Irregular & did)",
      ar: "الماضي البسيط (الأفعال المنتظمة والشاذة والفعل did)",
    },
    overview: {
      en: "The Past Simple narrates completed actions, finished states, and sequences of events at a definite past time (yesterday, last week, in 2020, two hours ago). Regular verbs add -ed, irregular verbs use their unique V2 forms, and negatives/questions use 'did' + base verb.",
      ar: "يُسرد بالماضي البسيط الأحداث المكتملة والحالات المنتهية وتسلسل الوقائع في وقت ماضٍ محدد (yesterday, last week, in 2020). تأخذ الأفعال المنتظمة -ed، وللأفعال الشاذة تصريف ثانٍ خاص (V2)، وتُستخدم did + المصدر في النفي والسؤال.",
    },
    formula: "Affirmative: S + V2 (or was/were)  •  Negative: S + didn't + V1  •  Question: Did + S + V1?",
    forms: {
      affirmative: "They visited Petra in 2022 and took hundreds of photographs.",
      negative: "They didn't rent a car, and the weather wasn't too hot.",
      question: "Did they book a guide, and were the trails open early?",
    },
    rules: [
      {
        en: "Use Past Simple whenever a finished time marker is stated or implied: yesterday, last night, three days ago, in 2019, when I was a child.",
        ar: "استخدم الماضي البسيط كلما ذُكر أو فُهم وقت ماضٍ منتهٍ مثل yesterday وlast night وthree days ago وin 2019.",
      },
      {
        en: "Spell regular -ed endings accurately: live → lived (add -d after -e), stop → stopped (double consonant in stressed CVC), carry → carried (consonant + y → -ied), play → played (vowel + y keeps y).",
        ar: "انتبه لإملاء -ed المنتظم: live → lived، وstop → stopped، وcarry → carried، بينما play → played لأن y مسبوقة بمتحرك.",
      },
      {
        en: "After 'did' or 'didn't', ALWAYS use the base form (V1), NEVER the past form (V2): 'Did you go?' and 'I didn't see him', NOT 'Did you went?' or 'I didn't saw him'.",
        ar: "بعد did أو didn't يجب دائماً استخدام الفعل في المصدر (V1) وليس التصريف الثاني: نقول Did you go? وI didn't see him.",
      },
      {
        en: "The verb 'be' uses 'was' (I/he/she/it) and 'were' (you/we/they) and never uses 'did': 'Were you tired?', 'She wasn't at the meeting'.",
        ar: "فعل الكون be في الماضي هو was للمفرد وwere للجمع، ولا يُستخدم معه did مطلقاً: نقول Were you tired? وShe wasn't there.",
      },
    ],
    examples: [
      {
        en: "We arrived at the airport early, checked our bags, and boarded on time.",
        ar: "وصلنا إلى المطار مبكراً، وسلّمنا حقائبنا، وصعدنا إلى الطائرة في الموعد.",
        highlight: "arrived at the airport early, checked our bags, and boarded",
      },
      {
        en: "She wrote a clear email and sent it to the entire team yesterday.",
        ar: "كتبت رسالة بريد واضحة وأرسلتها للفريق بأكمله أمس.",
        highlight: "wrote a clear email and sent it",
      },
      {
        en: "Did you enjoy the lecture, or was the topic too technical?",
        ar: "هل استمتعت بالمحاضرة، أم كان الموضوع تقنياً أكثر من اللازم؟",
        highlight: "Did you enjoy the lecture, or was",
      },
      {
        en: "He didn't buy the phone because it cost more than his budget.",
        ar: "لم يشترِ الهاتف لأن سعره تجاوز ميزانيته.",
        highlight: "didn't buy the phone because it cost",
      },
    ],
    arabicInterferenceTip: {
      en: "Because Arabic lacks a helper like 'did', learners often keep the past verb after 'didn't' ('I didn't went') or put 'did' with 'was' ('Did you were happy?'). Remember: 'did' already carries the past tense, so the main verb stays in V1, and 'was/were' stands alone.",
      ar: "لعدم وجود فعل مساعد مقابل لـ did في العربية، يقع كثيرون في خطأ تكرار الماضي بعد didn't مثل I didn't went أو إدخال did على was. تذكر أن did تحمل زمن الماضي وحدها فيعود الفعل الرئيسي للمصدر، وأن was/were لا تحتاج إلى did.",
    },
    commonMistake: {
      wrong: "Did you saw my message last night? No, I didn't checked my phone.",
      right: "Did you see my message last night? No, I didn't check my phone.",
      why: {
        en: "Both 'Did' and 'didn't' must be followed by the base verb ('see', 'check'), not past forms ('saw', 'checked').",
        ar: "يجب أن يتبع كل من Did وdidn't الفعل في المصدر المجرد (see وcheck) لا التصريف الماضي.",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the sentence: 'Last Friday, he ___ his keys and ___ all evening looking for them.'",
        options: [
          "losed / spended",
          "lost / spent",
          "lose / spend",
          "lost / spended",
        ],
        correctIndex: 1,
        explanation: {
          en: "Both 'lose → lost' and 'spend → spent' are irregular Past Simple forms.",
          ar: "كلا الفعلين شاذ في الماضي البسيط: lose يصبح lost وspend يصبح spent.",
        },
      },
      {
        prompt: "Choose the correct question in the Past Simple:",
        options: [
          "Did the guests arrived before dinner?",
          "Were the guests arrive before dinner?",
          "Did the guests arrive before dinner?",
          "Was the guests arrived before dinner?",
        ],
        correctIndex: 2,
        explanation: {
          en: "Action verbs form Past Simple questions with 'Did + subject + base verb (arrive)'.",
          ar: "يُصاغ سؤال الماضي البسيط مع أفعال الحركة بـ Did + الفاعل + الفعل في المصدر (arrive).",
        },
      },
      {
        prompt: "Which sentence uses 'be' correctly in the Past Simple?",
        options: [
          "Didn't you be at the workshop on Monday?",
          "You wasn't at the workshop on Monday.",
          "Were you at the workshop on Monday?",
          "Did you were at the workshop on Monday?",
        ],
        correctIndex: 2,
        explanation: {
          en: "Past Simple of 'be' for 'you' is 'were', and it inverts directly to form questions ('Were you...?').",
          ar: "ماضي فعل be مع الضمير you هو were، ويُقدّم مباشرة على الفاعل لتكوين السؤال دون did.",
        },
      },
    ],
  },
  {
    id: "past-continuous-when-vs-while",
    order: 10,
    moduleId: "verb-tenses",
    level: "A2",
    title: {
      en: "Past Continuous (when vs. while)",
      ar: "الماضي المستمر (الفرق بين when وwhile)",
    },
    overview: {
      en: "The Past Continuous (was/were + verb-ing) portrays an action in progress at a specific moment in the past, sets narrative background scenes, and pairs with the Past Simple using 'when' and 'while' to show a longer background action interrupted by a shorter event.",
      ar: "يعبّر الماضي المستمر (was/were + V-ing) عن فعل كان مستمراً في لحظة معينة في الماضي، أو يرسم خلفية الأحداث في القصة، ويجتمع مع الماضي البسيط عبر when وwhile لإظهار حدث طويل قاطعه حدث قصير.",
    },
    formula:
      "S + was / were + Verb-ing  •  While + Past Continuous, Past Simple  •  Past Continuous + when + Past Simple",
    forms: {
      affirmative: "I was cooking dinner when the power suddenly went out.",
      negative: "They weren't listening closely while the instructor was explaining the rule.",
      question: "What were you doing at 8 p.m. last night when I called?",
    },
    rules: [
      {
        en: "Use Past Continuous for an action already in progress at a specific past point ('At 10 a.m. yesterday, we were taking the exam').",
        ar: "نستخدم الماضي المستمر لفعل كان جارياً في ساعة أو لحظة محددة في الماضي (At 10 a.m. yesterday, we were taking the exam).",
      },
      {
        en: "Use Past Continuous + Past Simple for an interrupted action: the longer background action is Past Continuous, and the shorter interrupting event is Past Simple ('She was driving home when a tire burst').",
        ar: "عند تداخل حدثين: الحدث الأطول المستمر يكون ماضياً مستمراً، والحدث القصير القاطع يكون ماضياً بسيطاً.",
      },
      {
        en: "Use 'while' (or 'as') before a continuous action ('While we were walking, it started to rain') or for two simultaneous ongoing actions ('While I was reading, my brother was practicing guitar'). Use 'when' typically before the shorter Past Simple action.",
        ar: "نستخدم while عادة قبل الفعل المستمر أو لحدثين مستمرين معاً في وقت واحد، ونستخدم when غالباً قبل الحدث القصير في الماضي البسيط.",
      },
      {
        en: "Remember stative verb restrictions apply in the past too: say 'I knew the route while we were driving', NOT 'I was knowing the route'.",
        ar: "قاعدة الأفعال التقريرية تنطبق في الماضي أيضاً؛ فنقول I knew وليس I was knowing.",
      },
    ],
    examples: [
      {
        en: "While the engineers were testing the bridge, a heavy storm hit the coast.",
        ar: "بينما كان المهندسون يختبرون الجسر، ضربت عاصفة قوية الساحل.",
        highlight: "While the engineers were testing the bridge, a heavy storm hit",
      },
      {
        en: "She was replying to a client when her laptop screen froze.",
        ar: "كانت ترد على أحد العملاء عندما تجمدت شاشة حاسوبها المحمول.",
        highlight: "was replying to a client when her laptop screen froze",
      },
      {
        en: "The sun was shining, birds were singing, and children were laughing in the square.",
        ar: "كانت الشمس مشرقة، والطيور تغرد، والأطفال يضحكون في الساحة.",
        highlight: "was shining, birds were singing, and children were laughing",
      },
      {
        en: "At midnight, I wasn't sleeping; I was still finishing my presentation.",
        ar: "عند منتصف الليل لم أكن نائماً؛ كنت لا أزال أنهي عرضي التقديمي.",
        highlight: "wasn't sleeping; I was still finishing",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic uses 'كان + مضارع' ('كنت أدرس') smoothly, which maps nicely to Past Continuous—but learners sometimes put BOTH clauses in Past Continuous when one action interrupted the other ('I was walking when I was seeing him'). Keep the short interrupting verb in Past Simple ('saw').",
      ar: "تقابل صيغة «كان + مضارع» في العربية الماضي المستمر بدقة، لكن المتعلم يضع أحياناً الفعل القاطع أيضاً في الماضي المستمر (when I was seeing him). تذكر أن الحدث المفاجئ القصير يأتي دائماً في الماضي البسيط (saw).",
    },
    commonMistake: {
      wrong: "While I studied in my room, my friend was knocking on the door.",
      right: "While I was studying in my room, my friend knocked on the door.",
      why: {
        en: "Studying was the ongoing background action (Past Continuous after 'while'), and knocking was the shorter interrupting event (Past Simple).",
        ar: "الدراسة هي الحدث المستمر في الخلفية (ماضٍ مستمر بعد while)، وطرق الباب هو الحدث القصير القاطع (ماضٍ بسيط).",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the sentence: 'We ___ through the market when we ___ an old classmate.'",
        options: [
          "walked / were meeting",
          "were walking / met",
          "were walking / were meeting",
          "walk / met",
        ],
        correctIndex: 1,
        explanation: {
          en: "Walking was in progress ('were walking') when the short event ('met') interrupted it.",
          ar: "المشي كان مستمراً (were walking) ثم قاطعه الحدث القصير (met).",
        },
      },
      {
        prompt: "Choose the sentence showing two parallel ongoing past actions:",
        options: [
          "While Samira was taking notes, Tariq was recording the interview.",
          "While Samira took notes, Tariq recorded the interview suddenly.",
          "Samira was taking notes when Tariq was recording the interview suddenly.",
          "While Samira is taking notes, Tariq was recording the interview.",
        ],
        correctIndex: 0,
        explanation: {
          en: "Two simultaneous ongoing actions in the past both use Past Continuous joined by 'while'.",
          ar: "الحدثان المستمران بالتوازي في الماضي يأخذ كلاهما الماضي المستمر مع أداة الربط while.",
        },
      },
      {
        prompt: "What were you doing at 7:30 yesterday evening?",
        options: [
          "I drove home from the gym.",
          "I was driving home from the gym.",
          "I am driving home from the gym.",
          "I was drove home from the gym.",
        ],
        correctIndex: 1,
        explanation: {
          en: "An action in progress at a specific past time (7:30 yesterday) takes Past Continuous: 'was/were + verb-ing'.",
          ar: "الفعل الجاري في ساعة محددة من الماضي (7:30 مساء أمس) يأخذ الماضي المستمر was driving.",
        },
      },
    ],
  },
  {
    id: "present-perfect-simple",
    order: 11,
    moduleId: "verb-tenses",
    level: "B1",
    title: {
      en: "Present Perfect Simple (for / since / already / yet / ever / never)",
      ar: "المضارع التام البسيط (for / since / already / yet / ever / never)",
    },
    overview: {
      en: "The Present Perfect Simple (have/has + V3) bridges the past and the present. It expresses life experiences without a specific date, past actions with a visible present result, and states that began in the past and continue up to now—never paired with finished past time expressions like 'yesterday'.",
      ar: "يربط المضارع التام البسيط (have/has + التصريف الثالث) بين الماضي والحاضر؛ فيعبّر عن تجارب الحياة دون تحديد وقت، وعن أحداث ماضية ما زال أثرها ظاهراً الآن، وعن حالات بدأت في الماضي وما زالت مستمرة، ولا يُستخدم أبداً مع أزمنة منتهية مثل yesterday.",
    },
    formula: "S + have / has + Past Participle (V3)  •  for + duration | since + starting point",
    forms: {
      affirmative: "She has worked at this university for six years and has already published two books.",
      negative: "I haven't received the confirmation email yet, and I have never missed a deadline.",
      question: "Have you ever visited Muscat, or have you lived in Jeddah since 2018?",
    },
    rules: [
      {
        en: "Use Present Perfect for life experiences (with 'ever' in questions, 'never' in statements), unfinished time periods ('today', 'this week', 'so far'), and recent actions with a present consequence ('I have lost my badge, so I can't enter').",
        ar: "نستخدم المضارع التام للتجارب الحياتية (مع ever وnever)، والفترات غير المنتهية (this week, so far)، والأحداث التي يظهر أثرها في الحاضر.",
      },
      {
        en: "Distinguish 'for' vs. 'since': use 'for' with a length of time ('for ten minutes', 'for five years') and 'since' with a specific starting point ('since 2019', 'since Monday', 'since I graduated').",
        ar: "فرّق بين for وsince: تأتي for مع مدة زمنية (for five years)، بينما تأتي since مع نقطة البداية (since 2019، since Monday).",
      },
      {
        en: "Place 'just', 'already', 'ever', and 'never' between 'have/has' and V3 ('She has just arrived'). Place 'yet' at the end of negatives and questions ('Have you finished yet?').",
        ar: "توضع just وalready وever وnever بين have/has والتصريف الثالث، بينما توضع yet في نهاية النفي والسؤال.",
      },
      {
        en: "NEVER use Present Perfect with finished past time markers ('yesterday', 'last year', 'in 2015', 'two days ago')—switch to Past Simple whenever you state WHEN it happened. Also note 'been to' (visited and returned) vs. 'gone to' (still there).",
        ar: "لا تستخدم المضارع التام مطلقاً مع وقت ماضٍ منتهٍ (yesterday, in 2015) بل انتقل للماضي البسيط. وفرّق بين has been to (ذهب وعاد) وhas gone to (ذهب ولم يعد بعد).",
      },
    ],
    examples: [
      {
        en: "We have known each other since our first year at university.",
        ar: "نحن نعرف بعضنا البعض منذ سنتنا الأولى في الجامعة.",
        highlight: "have known each other since",
      },
      {
        en: "Has the technician repaired the air conditioner yet? Yes, he has just finished.",
        ar: "هل أصلح الفني مكيف الهواء بعد؟ نعم، لقد انتهى للتو.",
        highlight: "Has the technician repaired the air conditioner yet? Yes, he has just finished",
      },
      {
        en: "She has been to Tokyo twice, and her brother has gone there for a conference.",
        ar: "زارت طوكيو مرتين (وعادت)، وقد ذهب أخوها إلى هناك لحضور مؤتمر (ولا يزال هناك).",
        highlight: "has been to Tokyo twice, and her brother has gone there",
      },
      {
        en: "They have lived in this neighborhood for over twelve years.",
        ar: "لقد عاشوا في هذا الحي لأكثر من اثني عشر عاماً (وما زالوا).",
        highlight: "have lived in this neighborhood for",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic has no separate Present Perfect tense; speakers use either Present Simple ('أعيش هنا منذ 5 سنوات' → 'I live here since 5 years') or Past Simple. In English, an unfinished duration from past to present MUST use Present Perfect ('I have lived here for 5 years'), and 'منذ' translates to 'for' before a duration, NOT 'since'.",
      ar: "لا يوجد زمن مضارع تام مستقل في العربية؛ فنقول «أعيش هنا منذ خمس سنوات» مما يدفع المتعلم لقول I live here since 5 years. الصواب في الإنجليزية استخدام المضارع التام واختيار for قبل المدة الزمنية: I have lived here for 5 years.",
    },
    commonMistake: {
      wrong: "I have graduated in 2021, and I work at this company since three years.",
      right: "I graduated in 2021, and I have worked at this company for three years.",
      why: {
        en: "'In 2021' is a finished past time (use Past Simple 'graduated'). A state continuing from the past to now uses Present Perfect ('have worked') + 'for' before a duration ('three years').",
        ar: "تاريخ 2021 زمن ماضٍ منتهٍ فيأخذ الماضي البسيط graduated، أما العمل المستمر حتى الآن فيأخذ المضارع التام have worked مع for قبل المدة الزمنية.",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the sentence: 'Dr. Huda ___ at this clinic ___ 2017.'",
        options: [
          "works / since",
          "has worked / since",
          "has worked / for",
          "worked / since",
        ],
        correctIndex: 1,
        explanation: {
          en: "An action starting in 2017 and continuing now requires Present Perfect ('has worked') + 'since' before a starting year.",
          ar: "العمل الذي بدأ في 2017 ومستمر حتى الآن يتطلب المضارع التام has worked مع since قبل سنة البداية.",
        },
      },
      {
        prompt: "Which sentence is grammatically correct?",
        options: [
          "I have seen that documentary last weekend.",
          "Have you ever tried traditional Yemeni honey?",
          "She has finished already not the report.",
          "They didn't arrive yet at the hotel.",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Have you ever tried...?' correctly asks about a life experience with no fixed past time.",
          ar: "السؤال Have you ever tried...? صحيح لأنه يسأل عن تجربة حياتية دون تحديد وقت ماضٍ.",
        },
      },
      {
        prompt: "Choose the right verb: 'Khalid isn't at his desk; he ___ to the warehouse to check an order.'",
        options: ["has been", "has gone", "went yet", "is going since"],
        correctIndex: 1,
        explanation: {
          en: "'Has gone to' means he went there and has not returned yet; 'has been to' means he visited and came back.",
          ar: "نستخدم has gone لأنه ذهب إلى المستودع ولم يرجع بعد، بينما has been تعني أنه ذهب وعاد.",
        },
      },
    ],
  },
  {
    id: "present-perfect-continuous",
    order: 12,
    moduleId: "verb-tenses",
    level: "B1",
    title: {
      en: "Present Perfect Continuous",
      ar: "المضارع التام المستمر",
    },
    overview: {
      en: "The Present Perfect Continuous (have/has been + verb-ing) emphasizes the ongoing duration, effort, or repetition of an activity that began in the past and continues into the present—or just stopped with clear visible evidence right now.",
      ar: "يُبرز المضارع التام المستمر (have/has been + V-ing) طول مدة الاستمرار أو الجهد المبذول في نشاط بدأ في الماضي وما زال جارياً الآن، أو توقف للتو وترك أثراً واضحاً في الحاضر.",
    },
    formula: "S + have / has + been + Verb-ing",
    forms: {
      affirmative: "She has been practicing her speech all morning, and she sounds confident.",
      negative: "I haven't been sleeping well lately because of the noisy construction.",
      question: "How long have you been learning English with this curriculum?",
    },
    rules: [
      {
        en: "Use Present Perfect Continuous to highlight HOW LONG an ongoing action has lasted ('They have been negotiating for four hours', 'How long have you been waiting?').",
        ar: "نستخدم المضارع التام المستمر للتركيز على مدة استمرار الفعل حتى الآن (How long have you been waiting? / for four hours).",
      },
      {
        en: "Use it for recently stopped activities that explain a present physical sign or result ('Your hands are covered in paint—have you been painting the fence?', 'The streets are wet because it has been raining').",
        ar: "يُستخدم لتفسير أثر ملموس في الحاضر ناتج عن نشاط توقف للتو (الشوارع مبتلة لأنها كانت تمطر: it has been raining).",
      },
      {
        en: "Contrast with Present Perfect Simple: use Continuous for duration/process ('I have been reading this novel for a week'), and Simple for completed quantity or count ('I have read three chapters', NEVER 'I have been reading three chapters').",
        ar: "فرّق بينه وبين المضارع التام البسيط: المستمر للتركيز على المدة والمسار (for a week)، أما البسيط فللعدد والنتيجة المكتملة (I have read three chapters).",
      },
      {
        en: "Do NOT use Present Perfect Continuous with stative verbs (know, believe, own, be): say 'I have known him for ten years', NEVER 'I have been knowing him'.",
        ar: "لا يُستخدم المضارع التام المستمر مع الأفعال التقريرية مثل know وown وbe؛ فنقول I have known him وليس I have been knowing him.",
      },
    ],
    examples: [
      {
        en: "How long have you been waiting for the shuttle bus?",
        ar: "منذ متى وأنت تنتظر الحافلة الترددية؟",
        highlight: "have you been waiting",
      },
      {
        en: "The ground is soaking wet because it has been raining heavily all afternoon.",
        ar: "الأرض مبتلة تماماً لأن المطر كان يهطل بغزارة طوال بعد الظهر.",
        highlight: "has been raining heavily all afternoon",
      },
      {
        en: "We have been designing the app since January, and we have completed four modules so far.",
        ar: "نحن نصمم التطبيق منذ يناير، وقد أنجزنا أربع وحدات حتى الآن.",
        highlight: "have been designing the app since January, and we have completed four",
      },
      {
        en: "Lina looks exhausted because she has been reviewing medical charts for six hours.",
        ar: "تبدو لينا منهكة لأنها تراجع الملفات الطبية منذ ست ساعات.",
        highlight: "has been reviewing medical charts for six hours",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic expresses ongoing past-to-present duration with plain Present ('أنتظرك منذ ساعة' → 'I am waiting for you since an hour'). In English, whenever you add 'for / since / how long' to an ongoing action, upgrade from Present Continuous to Present Perfect Continuous ('I have been waiting for an hour').",
      ar: "نقول في العربية «أنتظرك منذ ساعة» فيترجمها المتعلم خطأ إلى I am waiting since an hour. كلما أضفت مدة (for / since / how long) لنشاط مستمر حتى الآن، يجب الانتقال إلى المضارع التام المستمر: I have been waiting for an hour.",
    },
    commonMistake: {
      wrong: "I am studying English for three years, and I have been knowing my teacher since 2023.",
      right: "I have been studying English for three years, and I have known my teacher since 2023.",
      why: {
        en: "Use Present Perfect Continuous ('have been studying') for an action lasting 'for three years', and Present Perfect Simple ('have known') because 'know' is stative.",
        ar: "نستخدم المضارع التام المستمر (have been studying) مع المدة for three years، ونستخدم المضارع التام البسيط (have known) لأن know فعل تقريري.",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the sentence: 'Why are your eyes so red? ___ at the screen all day?'",
        options: [
          "Are you staring",
          "Have you been staring",
          "Did you stare",
          "Do you stare",
        ],
        correctIndex: 1,
        explanation: {
          en: "Present Perfect Continuous explains a visible present result (red eyes) caused by a prolonged recent activity ('all day').",
          ar: "المضارع التام المستمر يفسّر الأثر الظاهر الآن (احمرار العينين) بسبب نشاط ممتد طوال اليوم.",
        },
      },
      {
        prompt: "Choose the correct pair: 'She ___ emails since 9 a.m., and she ___ twenty replies so far.'",
        options: [
          "has been writing / has sent",
          "has written / has been sending",
          "is writing / sent",
          "has been writing / has been sending",
        ],
        correctIndex: 0,
        explanation: {
          en: "Duration ('since 9 a.m.') favors Present Perfect Continuous ('has been writing'), while a counted completed result ('twenty replies') requires Present Perfect Simple ('has sent').",
          ar: "المدة الزمنية تأخذ المضارع التام المستمر (has been writing)، أما العدد المنجز (twenty replies) فيتطلب المضارع التام البسيط (has sent).",
        },
      },
      {
        prompt: "Which sentence is grammatically correct?",
        options: [
          "He has been owning this bookstore for ten years.",
          "He has been running this bookstore for ten years.",
          "He is running this bookstore for ten years.",
          "He runs this bookstore since ten years.",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Run' (manage) is an active verb suitable for Present Perfect Continuous with 'for ten years'; 'own' is stative.",
          ar: "الفعل run (يدير) فعل حركي يصح معه المضارع التام المستمر مع for ten years، أما own ففعل تقريري لا يُستمر.",
        },
      },
    ],
  },
  {
    id: "past-perfect-simple",
    order: 13,
    moduleId: "verb-tenses",
    level: "B2",
    title: {
      en: "Past Perfect Simple",
      ar: "الماضي التام البسيط",
    },
    overview: {
      en: "The Past Perfect Simple (had + V3) establishes 'the past before the past': it clarifies which of two past events happened earlier. It is indispensable in storytelling, reported speech, and sentences with 'before', 'after', 'by the time', and 'already'.",
      ar: "يحدد الماضي التام البسيط (had + التصريف الثالث) الحدث الأسبق بين حدثين في الماضي («ماضي الماضي»). وهو أساسي في السرد القصصي والكلام المنقول والجمل التي تتضمن before وafter وby the time وalready.",
    },
    formula: "S + had + Past Participle (V3)  •  Earlier Past (had + V3) + Later Past (V2)",
    forms: {
      affirmative: "By the time we reached the gate, the flight had already boarded.",
      negative: "She hadn't read the full memo before the meeting began.",
      question: "Had they ever visited Cairo before they moved there in 2021?",
    },
    rules: [
      {
        en: "Use Past Perfect Simple for the EARLIER of two past actions, and Past Simple for the LATER action ('When I arrived at the station, the train had left' = I missed the train).",
        ar: "نستخدم الماضي التام للحدث الأسبق زمنياً في الماضي، والماضي البسيط للحدث اللاحق له (عندما وصلت كان القطار قد غادر).",
      },
      {
        en: "Contrast time order carefully: 'When I arrived, the train left' (two sequential Past Simple events: I arrived, then it left) vs. 'When I arrived, the train had left' (it left BEFORE I arrived).",
        ar: "انتبه لاختلاف المعنى: When I arrived, the train left تعني أنني وصلت ثم غادر القطار، أما had left فتعني أنه غادر قبل وصولي.",
      },
      {
        en: "Pair Past Perfect naturally with 'by the time + Past Simple', 'by + past year', 'already', 'just', 'never', and 'until': 'By 2018, she had earned two degrees.'",
        ar: "يقترن الماضي التام بطبيعته مع by the time + ماضٍ بسيط، وby + سنة ماضية، وalready وnever مثل: By 2018, she had earned two degrees.",
      },
      {
        en: "Do not overuse Past Perfect for a single past event with no later past reference point; if there is only one past event, use Past Simple.",
        ar: "لا تستخدم الماضي التام لحدث ماضٍ منفرد دون حدث آخر لاحق في الماضي؛ فالحدث الماضي الوحيد يأخذ الماضي البسيط.",
      },
    ],
    examples: [
      {
        en: "By the time the ambulance arrived, the bystanders had already cleared the road.",
        ar: "بحلول وقت وصول سيارة الإسعاف، كان المارة قد أخلوا الطريق بالفعل.",
        highlight: "had already cleared",
      },
      {
        en: "He realized he had forgotten his passport only after he reached the terminal.",
        ar: "أدرك أنه نسي جواز سفره فقط بعد أن وصل إلى صالة المطار.",
        highlight: "had forgotten",
      },
      {
        en: "Before joining our lab, Dr. Rami had published twelve peer-reviewed papers.",
        ar: "قبل انضمامه إلى مختبرنا، كان الدكتور رامي قد نشر اثني عشر بحثاً محكّماً.",
        highlight: "had published",
      },
      {
        en: "She wasn't hungry at dinner because she had eaten a large lunch.",
        ar: "لم تكن جائعة على العشاء لأنها كانت قد تناولت غداءً كبيراً.",
        highlight: "had eaten",
      },
    ],
    arabicInterferenceTip: {
      en: "In Arabic, speakers express 'had done' with 'كان قد فعل', yet often default to simple past for both clauses in English ('When I arrived, the lecture started' instead of 'had started'), unintentionally changing the sequence of events.",
      ar: "يقابل الماضي التام في العربية «كان قد + فعل»، لكن كثيراً من المتعلمين يكتفون بالماضي البسيط في الجملتين، مما يغيّر الترتيب الزمني ويوحي بأن الحدثين وقعا بالتتابع لا بأسبقية أحدهما.",
    },
    commonMistake: {
      wrong: "When we got to the cinema, the movie already started twenty minutes earlier.",
      right: "When we got to the cinema, the movie had already started twenty minutes earlier.",
      why: {
        en: "The movie started BEFORE they arrived ('got'), so the earlier past action requires Past Perfect ('had already started').",
        ar: "بدأ الفيلم قبل وصولهم (got)، لذا يجب وضع الحدث الأسبق في الماضي التام (had already started).",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the sentence: 'She couldn't log in because she ___ her password.'",
        options: [
          "forgets",
          "was forgetting",
          "had forgotten",
          "has forgotten",
        ],
        correctIndex: 2,
        explanation: {
          en: "Forgetting the password happened BEFORE the past moment she couldn't log in, requiring Past Perfect ('had forgotten').",
          ar: "نسيان كلمة المرور حدث قبل عجزها عن الدخول في الماضي، فيتطلب الماضي التام had forgotten.",
        },
      },
      {
        prompt: "Which sentence means the guests left BEFORE the host cleaned the hall?",
        options: [
          "The host had cleaned the hall before the guests left.",
          "After the guests had left, the host cleaned the hall.",
          "Before the guests had left, the host cleaned the hall.",
          "When the host had cleaned the hall, the guests left.",
        ],
        correctIndex: 1,
        explanation: {
          en: "'After the guests had left' marks the guests' departure as the earlier action, followed by the host cleaning.",
          ar: "الجملة After the guests had left تضع مغادرة الضيوف كحدث أسبق، تلاه تنظيف القاعة.",
        },
      },
      {
        prompt: "Choose the correct option: 'By the end of 2020, the startup ___ three regional awards.'",
        options: ["wins", "has won", "had won", "was winning"],
        correctIndex: 2,
        explanation: {
          en: "'By the end of + past year' points to completion before a past deadline, which takes Past Perfect ('had won').",
          ar: "التعبير By the end of + سنة ماضية يدل على اكتمال الفعل قبل حد زمني في الماضي، فيأخذ الماضي التام had won.",
        },
      },
    ],
  },
  {
    id: "past-perfect-continuous",
    order: 14,
    moduleId: "verb-tenses",
    level: "B2",
    title: {
      en: "Past Perfect Continuous",
      ar: "الماضي التام المستمر",
    },
    overview: {
      en: "The Past Perfect Continuous (had been + verb-ing) highlights how long an ongoing activity had been happening BEFORE a specific moment or event in the past, or explains the cause of a past condition such as fatigue, wet streets, or relief.",
      ar: "يُبرز الماضي التام المستمر (had been + V-ing) مدة استمرار نشاط كان جارياً قبل لحظة أو حدث معين في الماضي، أو يفسر سبب حالة ظاهرة في الماضي كالإرهاق أو بلل الطرق.",
    },
    formula: "S + had + been + Verb-ing  (+ for/since ... before/when + Past Simple)",
    forms: {
      affirmative: "They had been driving for five hours before they finally saw a gas station.",
      negative: "He hadn't been feeling well all week, so he canceled the trip.",
      question: "How long had you been working at the bank when you got promoted?",
    },
    rules: [
      {
        en: "Use Past Perfect Continuous to show the DURATION of an activity leading up to another past event ('She had been studying for three hours when her friend called').",
        ar: "نستخدم الماضي التام المستمر لإبراز مدة نشاط كان مستمراً حتى وقوع حدث آخر في الماضي.",
      },
      {
        en: "Use it to explain a visible past result or cause ('His clothes were dusty because he had been renovating the attic').",
        ar: "يُستخدم لتوضيح السبب المستمر وراء نتيجة ظاهرة في الماضي (كانت ملابسه مغبرة لأنه كان يرمم العلية).",
      },
      {
        en: "Contrast with Past Continuous: Past Continuous ('was waiting') only says an action was in progress at a past moment, whereas Past Perfect Continuous ('had been waiting for 40 minutes') measures duration BEFORE that moment.",
        ar: "الفرق عن الماضي المستمر: الماضي المستمر يصف مجرد الاستمرار في لحظة ماضية، أما الماضي التام المستمر فيقيس طول المدة التي سبقت تلك اللحظة.",
      },
      {
        en: "Avoid continuous forms with stative verbs and completed counts: say 'They had known each other for years before marrying' and 'He had written five pages before lunch' (Past Perfect Simple).",
        ar: "لا يُستخدم مع الأفعال التقريرية ولا مع ذكر عدد منجز؛ فنقول had known (وليس had been knowing) وhad written five pages.",
      },
    ],
    examples: [
      {
        en: "We had been waiting in line for nearly an hour before the ticket window opened.",
        ar: "كنا ننتظر في الطابور قرابة ساعة كاملة قبل أن يُفتح شباك التذاكر.",
        highlight: "had been waiting in line for nearly an hour",
      },
      {
        en: "Her voice was hoarse because she had been presenting workshops all afternoon.",
        ar: "كان صوتها مبحوحاً لأنها كانت تقدم ورش عمل طوال بعد الظهر.",
        highlight: "had been presenting workshops all afternoon",
      },
      {
        en: "How long had the company been developing the vaccine before the clinical trials began?",
        ar: "منذ متى كانت الشركة تطوّر اللقاح قبل بدء التجارب السريرية؟",
        highlight: "had the company been developing",
      },
      {
        en: "He hadn't been practicing regularly, so he struggled during the audition.",
        ar: "لم يكن يتدرب بانتظام، لذلك واجه صعوبة أثناء تجربة الأداء.",
        highlight: "hadn't been practicing regularly",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic uses 'كان يدرس لمدة ثلاث ساعات قبل أن...' (literally 'was studying for three hours before...'), so learners frequently substitute Past Continuous ('was studying') where English requires Past Perfect Continuous ('had been studying') to show elapsed duration before a past cutoff.",
      ar: "في العربية نقول «كان ينتظر لمدة ساعة قبل أن يصل القطار»، فيترجمها المتعلم بالماضي المستمر was waiting. في الإنجليزية عند ذكر المدة قبل حدث ماضٍ آخر يجب استخدام الماضي التام المستمر had been waiting.",
    },
    commonMistake: {
      wrong: "When the rescue team arrived, the hikers were walking in the fog for six hours.",
      right: "When the rescue team arrived, the hikers had been walking in the fog for six hours.",
      why: {
        en: "'For six hours' measures duration up to the past arrival of the rescue team, which requires Past Perfect Continuous ('had been walking').",
        ar: "المدة for six hours تقيس زمن الاستمرار قبل وصول فريق الإنقاذ في الماضي، لذا يلزم الماضي التام المستمر had been walking.",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the sentence: 'The players were drenched in sweat because they ___ for two hours.'",
        options: [
          "trained",
          "were training",
          "had been training",
          "have been training",
        ],
        correctIndex: 2,
        explanation: {
          en: "The past condition ('were drenched') is explained by an activity lasting for two hours before that past point ('had been training').",
          ar: "الحالة الماضية (were drenched) يفسرها نشاط استمر ساعتين قبلها في الماضي، فيأخذ had been training.",
        },
      },
      {
        prompt: "Which sentence correctly contrasts duration with a stative verb in the past?",
        options: [
          "Before moving to Doha, she had been knowing Arabic for five years.",
          "Before moving to Doha, she had been teaching Arabic for five years.",
          "Before moving to Doha, she was teaching Arabic for five years.",
          "Before moving to Doha, she has been teaching Arabic for five years.",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Teach' is an action verb measuring duration prior to a past move ('had been teaching'); 'know' is stative and cannot be continuous.",
          ar: "الفعل teach حركي يقيس المدة قبل الانتقال في الماضي (had been teaching)، بينما know فعل تقريري لا يُستمر.",
        },
      },
      {
        prompt: "Complete the sentence: 'By the time the call dropped, we ___ the budget for forty minutes and ___ three items.'",
        options: [
          "had been discussing / had finalized",
          "had discussed / had been finalizing",
          "were discussing / finalized",
          "had been discussing / had been finalizing",
        ],
        correctIndex: 0,
        explanation: {
          en: "Ongoing duration ('for forty minutes') takes Past Perfect Continuous ('had been discussing'), while a completed count ('three items') takes Past Perfect Simple ('had finalized').",
          ar: "مدة النقاش تأخذ الماضي التام المستمر (had been discussing)، أما إنجاز ثلاثة بنود فيأخذ الماضي التام البسيط (had finalized).",
        },
      },
    ],
  },
  {
    id: "future-simple-will-going-to-schedules",
    order: 15,
    moduleId: "verb-tenses",
    level: "A2",
    title: {
      en: "Future Simple (will vs. be going to vs. Present for Schedules)",
      ar: "المستقبل البسيط (will مقابل be going to والمضارع للمواعيد)",
    },
    overview: {
      en: "English chooses between future forms based on the speaker's intention and evidence rather than just distance in time: 'will' for spontaneous decisions, promises, offers, and opinion-based predictions; 'be going to' for prior intentions and visible evidence; Present Continuous for fixed personal arrangements; and Present Simple for official timetables.",
      ar: "لا تعتمد الإنجليزية على صيغة مستقبل واحدة، بل تختار حسب النية والدليل: will للقرارات اللحظية والوعود والعروض والتوقعات المبنية على الرأي، وbe going to للخطط المسبقة والتنبؤ المبني على دليل مرئي، والمضارع المستمر للترتيبات الشخصية المؤكدة، والمضارع البسيط للجداول الرسمية.",
    },
    formula:
      "will + V1 (spontaneous/promise)  •  am/is/are going to + V1 (plan/evidence)  •  Present Simple (timetables) / Continuous (arrangements)",
    forms: {
      affirmative: "I'm going to start a coding course next month, and I'll send you the syllabus now.",
      negative: "Don't worry—I won't tell anyone, and it isn't going to rain today.",
      question: "Will you help me carry these boxes, or are you meeting your advisor at four?",
    },
    rules: [
      {
        en: "Use 'will + V1' for decisions made at the moment of speaking ('It's cold—I'll close the window'), promises/offers ('I'll call you tonight'), and predictions based on personal opinion ('I think our team will win').",
        ar: "نستخدم will + المصدر للقرارات الفورية لحظة الكلام، والوعود والعروض، والتوقعات الشخصية (مع I think / probably).",
      },
      {
        en: "Use 'be going to + V1' for plans decided BEFORE speaking ('We're going to renovate the kitchen next summer') and predictions backed by clear present evidence ('Look at those dark clouds—it's going to pour').",
        ar: "نستخدم be going to للخطط المقررة مسبقاً، وللتنبؤات المدعومة بدليل واضح نراه الآن (انظر للغيوم السوداء: it's going to rain).",
      },
      {
        en: "Use Present Continuous for confirmed personal arrangements with a set time/place ('I'm seeing the dentist tomorrow at 10 a.m.'), and Present Simple for fixed public schedules ('The train leaves at 6:45 tomorrow').",
        ar: "نستخدم المضارع المستمر للمواعيد الشخصية المرتبة بوقت ومكان محددين، والمضارع البسيط للجداول الرسمية كالرحلات والامتحانات.",
      },
      {
        en: "CRITICAL RULE: Never use 'will' inside future time clauses introduced by 'when, before, after, until, as soon as'; use Present Simple instead ('I'll text you as soon as I arrive', NOT 'as soon as I will arrive').",
        ar: "قاعدة حاسمة: لا نستخدم will أبداً داخل الجمل الزمنية بعد when وbefore وafter وuntil وas soon as، بل نستخدم المضارع البسيط بدلاً منها (as soon as I arrive).",
      },
    ],
    examples: [
      {
        en: "Hold on—those bags look heavy; I'll carry them to the car for you.",
        ar: "انتظر، تبدو تلك الحقائب ثقيلة؛ سأحملها إلى السيارة من أجلك.",
        highlight: "I'll carry them",
      },
      {
        en: "Look at the traffic jam ahead! We are going to miss the opening speech.",
        ar: "انظر إلى الازدحام المروري أمامنا! سنفوّت الكلمة الافتتاحية.",
        highlight: "are going to miss",
      },
      {
        en: "Our flight departs at 7:20 tomorrow morning, and we're staying near the harbor.",
        ar: "تغادر رحلتنا في السابعة والعشرين صباح الغد، وسنقيم قرب الميناء.",
        highlight: "departs at 7:20 tomorrow morning, and we're staying",
      },
      {
        en: "She will send the invoice as soon as the client approves the draft.",
        ar: "سترسل الفاتورة فور موافقة العميل على المسودة.",
        highlight: "will send the invoice as soon as the client approves",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic uses 'سـ / سوف' uniformly for almost all future meanings and even after 'عندما' ('عندما سأصل'). In English, overusing 'will' for every plan sounds unnatural, and putting 'will' after 'when / before / as soon as' is a grammar error—always use Present Simple in the time clause.",
      ar: "تستخدم العربية «سـ / سوف» لكل معاني المستقبل، وقد يضعها المتعلم خطأً بعد when وafter. في الإنجليزية اختر going to للخطط والدليل المرئي، واحذف will تماماً من جملة when/after/before واستخدم المضارع البسيط.",
    },
    commonMistake: {
      wrong: "I will call you when I will reach the airport, and look—the plane will land right now!",
      right: "I will call you when I reach the airport, and look—the plane is going to land right now!",
      why: {
        en: "Use Present Simple ('reach') after 'when' in a future time clause, and 'is going to land' for an imminent event with visible evidence.",
        ar: "نستخدم المضارع البسيط (reach) بعد when في الإشارة للمستقبل، ونستخدم is going to land لحدث وشيك له دليل مرئي.",
      },
    },
    quickCheck: [
      {
        prompt: "The phone is ringing and you offer immediately: 'Don't get up—I ___ it.'",
        options: ["am going to answer", "will answer", "answer", "am answering"],
        correctIndex: 1,
        explanation: {
          en: "An instant decision or offer made at the moment of speaking uses 'will' ('I'll answer').",
          ar: "القرار الفوري والعرض اللحظي عند الكلام يأخذ will (I'll answer).",
        },
      },
      {
        prompt: "Complete the sentence: 'We won't leave the office until the director ___ the final report.'",
        options: ["will sign", "is going to sign", "signs", "signed"],
        correctIndex: 2,
        explanation: {
          en: "After future time conjunctions like 'until', English requires Present Simple ('signs'), never 'will'.",
          ar: "بعد الروابط الزمنية مثل until نستخدم المضارع البسيط (signs) للتعبير عن المستقبل، ولا نضع will.",
        },
      },
      {
        prompt: "Watch out! That glass is on the very edge of the table—it ___!",
        options: [
          "will fall",
          "falls",
          "is going to fall",
          "is falling tomorrow",
        ],
        correctIndex: 2,
        explanation: {
          en: "A prediction based on immediate visible evidence (the glass teetering on the edge) uses 'be going to'.",
          ar: "التنبؤ المبني على دليل حسي واضح أمامنا (الكوب على حافة الطاولة) يأخذ is going to fall.",
        },
      },
    ],
  },
  {
    id: "future-continuous",
    order: 16,
    moduleId: "verb-tenses",
    level: "B2",
    title: {
      en: "Future Continuous",
      ar: "المستقبل المستمر",
    },
    overview: {
      en: "The Future Continuous (will be + verb-ing) describes an action that will already be in progress at a specific time in the future, refers to routine future events happening as a matter of course, and forms polite, indirect inquiries about someone's plans.",
      ar: "يصف المستقبل المستمر (will be + V-ing) فعلاً سيكون جارياً ومستمراً في وقت محدد في المستقبل، كما يعبر عن أحداث ستقع بشكل طبيعي ضمن الروتين، ويُستخدم لطرح أسئلة مهذبة وغير مباشرة عن خطط الآخرين.",
    },
    formula: "S + will + be + Verb-ing",
    forms: {
      affirmative: "This time tomorrow, we will be flying over the Mediterranean Sea.",
      negative: "I won't be using my car tomorrow afternoon, so you are welcome to borrow it.",
      question: "Will you be passing by the post office on your way home today?",
    },
    rules: [
      {
        en: "Use Future Continuous for an action in progress at a stated future time ('At 9 p.m. tonight, she will be hosting a webinar', 'This time next week, I'll be relaxing in Salalah').",
        ar: "نستخدم المستقبل المستمر لفعل سيكون قيد التنفيذ في لحظة مستقبلية محددة (At 9 p.m. tonight / This time next week).",
      },
      {
        en: "Use it for polite, non-intrusive questions about someone's plans—especially before asking a favor ('Will you be going to the supermarket later? Could you grab some milk?').",
        ar: "يُستخدم للسؤال بأدب ولباقة عن خطط شخص ما دون إشعاره بالضغط، خاصة تمهيداً لطلب خدمة (Will you be going...?).",
      },
      {
        en: "Use it when a future event will happen naturally as part of a routine or schedule ('Don't mail the file; I'll be seeing Tariq at Monday's briefing anyway').",
        ar: "يُستخدم لحدث مستقبلي سيقع تلقائياً كجزء من جدول معتاد (سألتقي طارق في اجتماع الإثنين على أي حال).",
      },
      {
        en: "Contrast with Future Simple: 'At 8 a.m. I will leave' (action starts at 8:00) vs. 'At 8 a.m. I will be driving' (already on the road at 8:00). Avoid stative verbs in Future Continuous.",
        ar: "الفرق عن المستقبل البسيط: will leave تعني بدء المغادرة الساعة الثامنة، أما will be driving فتعني أنك ستكون بالفعل على الطريق الساعة الثامنة. ولا يُستخدم مع الأفعال التقريرية.",
      },
    ],
    examples: [
      {
        en: "Don't phone me between two and four; I will be interviewing candidates.",
        ar: "لا تتصل بي بين الثانية والرابعة؛ سأكون أجري مقابلات مع المرشحين.",
        highlight: "will be interviewing",
      },
      {
        en: "This time next month, the engineers will be installing the solar panels.",
        ar: "في مثل هذا الوقت من الشهر القادم، سيكون المهندسون يركّبون الألواح الشمسية.",
        highlight: "will be installing",
      },
      {
        en: "Will you be staying at the hotel until Friday, or are you checking out early?",
        ar: "هل ستبقى في الفندق حتى يوم الجمعة، أم ستغادر مبكراً؟",
        highlight: "Will you be staying",
      },
      {
        en: "I won't be working from the office tomorrow because we have a site visit.",
        ar: "لن أكون أعمل من المكتب غداً لأن لدينا زيارة ميدانية.",
        highlight: "won't be working",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic often uses 'سأعمل الساعة الثامنة' (simple future) where English distinguishes an ongoing background activity at a future point ('I'll be working at eight'). Also watch out for omitting 'be' ('I will working' is incorrect—always keep 'will be + -ing').",
      ar: "قد تكتفي العربية بالمستقبل البسيط مع تحديد ساعة في المستقبل، لكن الإنجليزية تفضّل المستقبل المستمر لإبراز أن الفعل سيكون جارياً في تلك اللحظة. واحذر من حذف كلمة be؛ فالصيغة الصحيحة دائماً will be + V-ing.",
    },
    commonMistake: {
      wrong: "This time tomorrow I will sitting on the train and I will be knowing the results.",
      right: "This time tomorrow I will be sitting on the train and I will know the results.",
      why: {
        en: "Future Continuous requires 'be' before '-ing' ('will be sitting'), while the stative verb 'know' stays in Future Simple ('will know').",
        ar: "المستقبل المستمر يتطلب وجود be قبل V-ing (will be sitting)، بينما الفعل التقريري know يبقى في المستقبل البسيط (will know).",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the sentence: 'Please come after 11 a.m.; at 10 a.m. I ___ an online exam.'",
        options: [
          "will take",
          "will be taking",
          "will be took",
          "am take",
        ],
        correctIndex: 1,
        explanation: {
          en: "At 10 a.m. the exam will already be in progress, so Future Continuous ('will be taking') is the exact match.",
          ar: "في الساعة العاشرة سيكون الامتحان جارياً بالفعل، لذا نستخدم المستقبل المستمر will be taking.",
        },
      },
      {
        prompt: "Which question sounds most polite and indirect when checking if a colleague can give you a ride?",
        options: [
          "Will you drive past the station after work?",
          "Will you be driving past the station after work?",
          "Do you going to drive past the station after work?",
          "Will you be drive past the station after work?",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Will you be driving...?' politely asks about existing plans without sounding like a demand.",
          ar: "الصيغة Will you be driving...? تسأل بلباقة عن خطة الزميل القائمة دون إلحاح.",
        },
      },
      {
        prompt: "Choose the sentence that is grammatically correct:",
        options: [
          "By tomorrow night, they will watching the finals.",
          "At 7 p.m. tonight, we will be having dinner with the visitors.",
          "Next week, she will be owning her new car.",
          "At noon, he won't being work.",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Have dinner' is a dynamic activity in progress at 7 p.m., formed accurately as 'will be having'.",
          ar: "عبارة have dinner نشاط حركي سيكون مستمراً الساعة السابعة، وصيغتها الصحيحة will be having.",
        },
      },
    ],
  },
  {
    id: "future-perfect-simple",
    order: 17,
    moduleId: "verb-tenses",
    level: "B2",
    title: {
      en: "Future Perfect Simple",
      ar: "المستقبل التام البسيط",
    },
    overview: {
      en: "The Future Perfect Simple (will have + V3) projects yourself forward to a future deadline and looks back at an action that will ALREADY be completed before that point. It pairs strongly with 'by + future time' and 'by the time + Present Simple'.",
      ar: "ينقلك المستقبل التام البسيط (will have + التصريف الثالث) إلى موعد مستقبلي لتنظر منه إلى فعل سيكون قد اكتمل وانتهى قبل ذلك الموعد. ويقترن بقوة بعبارات مثل by + وقت مستقبلي وby the time + مضارع بسيط.",
    },
    formula: "S + will + have + Past Participle (V3)  (+ by + future time / by the time + Present Simple)",
    forms: {
      affirmative: "By next June, she will have completed her master's thesis.",
      negative: "They won't have finished the renovation before the guests arrive.",
      question: "Will you have reviewed all twenty applications by Friday afternoon?",
    },
    rules: [
      {
        en: "Use Future Perfect Simple for actions finished BEFORE a specific point in the future ('By 2030, the city will have built two new metro lines').",
        ar: "نستخدم المستقبل التام البسيط للأحداث التي ستكون قد أنجزت قبل نقطة زمنية مستقبلية محددة.",
      },
      {
        en: "Always use Present Simple (NOT 'will') inside a 'by the time' or 'before' clause: 'By the time you wake up, I will have landed in London.'",
        ar: "استخدم المضارع البسيط دائماً داخل جملة by the time أو before، ولا تضع will فيها: By the time you wake up, I will have landed.",
      },
      {
        en: "Recognize key time expressions: 'by Friday', 'by the end of the year', 'by the time + S + V1', 'within two weeks', 'before noon tomorrow'.",
        ar: "من أبرز مؤشراته الزمنية: by Friday وby the end of the year وby the time وbefore noon tomorrow.",
      },
      {
        en: "Do not confuse 'by' (at or before a deadline → Future Perfect) with 'until' (continuing up to a point → Future Simple/Continuous): 'I will have finished by six' vs. 'I will be working until six'.",
        ar: "فرّق بين by (قبل الموعد المحدد ← مستقبل تام) وuntil (مستمر حتى ذلك الموعد ← مستقبل بسيط أو مستمر).",
      },
    ],
    examples: [
      {
        en: "By the end of this course, you will have mastered every core English tense.",
        ar: "بحلول نهاية هذه الدورة، ستكون قد أتقنت كل الأزمنة الإنجليزية الأساسية.",
        highlight: "will have mastered",
      },
      {
        en: "By the time we get to the venue, the keynote speaker will have already finished.",
        ar: "بحلول وقت وصولنا إلى القاعة، سيكون المتحدث الرئيسي قد أنهى كلمته بالفعل.",
        highlight: "will have already finished",
      },
      {
        en: "She won't have saved enough for the deposit before December.",
        ar: "لن تكون قد ادّخرت ما يكفي للدفعة الأولى قبل شهر ديسمبر.",
        highlight: "won't have saved",
      },
      {
        en: "How many chapters will the team have translated by Monday morning?",
        ar: "كم فصلاً سيكون الفريق قد ترجمه بحلول صباح الإثنين؟",
        highlight: "will the team have translated",
      },
    ],
    arabicInterferenceTip: {
      en: "In Arabic, 'سأكون قد أنهيت' directly matches 'I will have finished', yet learners frequently drop 'have' or use 'has' with he/she ('She will has finished'). After any modal like 'will', ALWAYS use bare 'have' + V3 for every subject.",
      ar: "تقابل الصيغة العربية «سأكون قد أنهيت» المستقبل التام تماماً، لكن يقع البعض في خطأ استخدام has مع المفرد (She will has finished). بعد الفعل الناقص will نستخدم have المجردة دائماً مع جميع الضمائر.",
    },
    commonMistake: {
      wrong: "By the time he will arrive, she will has prepared all the slides.",
      right: "By the time he arrives, she will have prepared all the slides.",
      why: {
        en: "Use Present Simple ('arrives') after 'by the time', and 'will have + V3' (never 'will has') for all subjects.",
        ar: "نستخدم المضارع البسيط (arrives) بعد by the time، ونستخدم will have مع جميع الضمائر (لا نكتب will has أبداً).",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the sentence: 'By 5 p.m. today, the courier ___ all the parcels.'",
        options: [
          "will deliver",
          "will have delivered",
          "will be delivered",
          "has delivered",
        ],
        correctIndex: 1,
        explanation: {
          en: "'By 5 p.m. today' indicates completion prior to a future deadline, requiring Future Perfect Simple ('will have delivered').",
          ar: "العبارة By 5 p.m. today تحدد موعداً مستقبلياً يكتمل قبله التوصيل، لذا نختار المستقبل التام will have delivered.",
        },
      },
      {
        prompt: "Choose the grammatically correct sentence:",
        options: [
          "By next April, my brother will has lived in Riyadh for two years.",
          "By the time the guests will come, we will have cooked dinner.",
          "By the time the guests come, we will have cooked dinner.",
          "By the time the guests come, we will have cooking dinner.",
        ],
        correctIndex: 2,
        explanation: {
          en: "Present Simple ('come') follows 'by the time', and the main clause correctly uses 'will have + V3' ('will have cooked').",
          ar: "تُستخدم صيغة المضارع البسيط (come) بعد by the time، وصيغة will have + التصريف الثالث (will have cooked) في الجملة الرئيسية.",
        },
      },
      {
        prompt: "Which sentence expresses that the report will NOT be complete before the meeting?",
        options: [
          "I won't be finishing the report by the meeting.",
          "I won't have finished the report by the time the meeting starts.",
          "I haven't finished the report by the time the meeting starts.",
          "I don't have finished the report by the meeting.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Negative Future Perfect Simple ('won't have finished') paired with 'by the time + Present Simple' states non-completion before a future point.",
          ar: "النفي في المستقبل التام (won't have finished) مع by the time + مضارع بسيط يوضح أن التقرير لن يكون قد اكتمل قبل الاجتماع.",
        },
      },
    ],
  },
  {
    id: "future-perfect-continuous",
    order: 18,
    moduleId: "verb-tenses",
    level: "C1",
    title: {
      en: "Future Perfect Continuous",
      ar: "المستقبل التام المستمر",
    },
    overview: {
      en: "The Future Perfect Continuous (will have been + verb-ing) measures the total ongoing duration of an activity up to a future milestone—an action that may have started in the past, present, or future and will STILL be continuing at that future point.",
      ar: "يقيس المستقبل التام المستمر (will have been + V-ing) إجمالي مدة استمرار نشاط معين حتى الوصول إلى محطة زمنية مستقبلية، بحيث يكون الفعل مستمراً حتى تلك النقطة وربما بعدها.",
    },
    formula: "S + will + have + been + Verb-ing  (+ for [duration] by [future time])",
    forms: {
      affirmative: "By next October, I will have been teaching at this academy for ten years.",
      negative: "She won't have been working here long enough to qualify for sabbatical leave.",
      question: "How long will they have been living in Amman by the end of this year?",
    },
    rules: [
      {
        en: "Use Future Perfect Continuous when BOTH a future reference point ('by 2028', 'by midnight', 'when he retires') AND an ongoing duration ('for five years', 'for twelve hours') are emphasized.",
        ar: "نستخدم المستقبل التام المستمر عندما نجمع بين نقطة مرجعية مستقبلية (by 2028) ومدة استمرار ممتدة حتى تلك النقطة (for five years).",
      },
      {
        en: "Use it to highlight effort or predict the cause of a future state ('When we arrive in Abha, we will have been driving for nine hours, so we'll be exhausted').",
        ar: "يُستخدم لإبراز الجهد أو توقع سبب حالة مستقبلية (عند وصولنا سنكون قد قضينا تسع ساعات في القيادة، لذا سنكون منهكين).",
      },
      {
        en: "Switch to Future Perfect Simple (NOT Continuous) with stative verbs ('By June, we will have known each other for a decade') and when stating a completed number ('By Friday, he will have written four essays').",
        ar: "ننتقل إلى المستقبل التام البسيط مع الأفعال التقريرية (will have known) وعند ذكر عدد منجز (will have written four essays).",
      },
      {
        en: "Keep the auxiliary chain exact: will + have + been + verb-ing (never 'will has been' or 'will have being').",
        ar: "حافظ على سلسلة الأفعال المساعدة بدقة: will + have + been + V-ing (ولا تكتب will has been أو will have being).",
      },
    ],
    examples: [
      {
        en: "By the time she retires next spring, Professor Mona will have been lecturing for thirty-five years.",
        ar: "بحلول تقاعدها في الربيع القادم، ستكون الأستاذة منى قد أمضت خمسة وثلاثين عاماً في إلقاء المحاضرات.",
        highlight: "will have been lecturing for thirty-five years",
      },
      {
        en: "At 6 p.m., the committee will have been debating the proposal for five straight hours.",
        ar: "في السادسة مساءً، ستكون اللجنة قد أمضت خمس ساعات متواصلة في مناقشة المقترح.",
        highlight: "will have been debating",
      },
      {
        en: "By next Ramadan, my cousin will have been training for the marathon for six months.",
        ar: "بحلول رمضان القادم، سيكون ابن عمي قد أمضى ستة أشهر في التدريب للماراثون.",
        highlight: "will have been training",
      },
      {
        en: "How long will you have been studying Japanese when you take the exam in December?",
        ar: "كم ستكون مدة دراستك للغة اليابانية عندما تتقدم للامتحان في ديسمبر؟",
        highlight: "will you have been studying",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic has no direct four-word verb chain like 'will have been working' and instead uses 'سيكون قد مضى عليه عشر سنوات وهو يعمل'. Resist simplifying this to Present Perfect or plain 'will work' in C1 writing and IELTS Academic tasks—the 'by + future point + for + duration' combo specifically calls for Future Perfect Continuous.",
      ar: "لا توجد في العربية سلسلة فعلية من أربع كلمات تقابل will have been working، بل نعبّر عنها بـ «سيكون قد مضى عليه كذا وهو يعمل». لا تختصرها في المستوى المتقدم إلى will work؛ فاجتماع by + موعد مستقبلي مع for + مدة يستدعي المستقبل التام المستمر.",
    },
    commonMistake: {
      wrong: "By next month, he will be working at the hospital for fifteen years.",
      right: "By next month, he will have been working at the hospital for fifteen years.",
      why: {
        en: "Future Continuous ('will be working') cannot measure accumulated duration ('for fifteen years') up to a future milestone ('by next month'); use Future Perfect Continuous.",
        ar: "المستقبل المستمر (will be working) لا يقيس المدة المتراكمة (for fifteen years) حتى موعد مستقبلي (by next month)، بل يلزم المستقبل التام المستمر.",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the sentence: 'By midnight, the technicians ___ to restore the server for eight hours.'",
        options: [
          "will be trying",
          "will have been trying",
          "will have tried for",
          "have been trying",
        ],
        correctIndex: 1,
        explanation: {
          en: "Both a future cutoff ('By midnight') and an ongoing duration ('for eight hours') require Future Perfect Continuous ('will have been trying').",
          ar: "اجتماع الموعد المستقبلي (By midnight) مع مدة الاستمرار (for eight hours) يتطلب المستقبل التام المستمر will have been trying.",
        },
      },
      {
        prompt: "Which sentence correctly avoids Future Perfect Continuous with a stative verb?",
        options: [
          "By July, I will have been owning this clinic for twenty years.",
          "By July, I will have owned this clinic for twenty years.",
          "By July, I will be owning this clinic for twenty years.",
          "By July, I will have being owned this clinic for twenty years.",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Own' is a stative verb, so Future Perfect Simple ('will have owned') must be used instead of the continuous form.",
          ar: "الفعل own فعل تقريري لا يُستمر، لذلك نستخدم المستقبل التام البسيط will have owned.",
        },
      },
      {
        prompt: "Complete the question: 'When the flight lands in Sydney, how long ___?'",
        options: [
          "will we have been flying",
          "will we be flying",
          "have we been flying",
          "will we have being flown",
        ],
        correctIndex: 0,
        explanation: {
          en: "'How long' measuring duration up to a future arrival ('when the flight lands') takes Future Perfect Continuous: 'will + S + have been + V-ing'.",
          ar: "السؤال بـ How long عن مدة الاستمرار حتى وقت مستقبلي (when the flight lands) يأخذ الصيغة will we have been flying.",
        },
      },
    ],
  },
  // =========================================================================
  // MODULE 3: MODAL VERBS & PAST MODALS (Orders 19–23)
  // =========================================================================
  {
    id: "modals-ability-and-permission",
    order: 19,
    moduleId: "modals",
    level: "A2",
    title: {
      en: "Modals of Ability & Permission (can / could / be able to / may)",
      ar: "الأفعال الناقصة للقدرة والإذن (can / could / be able to / may)",
    },
    overview: {
      en: "Modals of ability and permission express what someone is capable of doing or allowed to do across time. Pure modals (can, could, may) take a bare infinitive without 'to' or '-s', while 'be able to' supplies future, perfect, and specific past-achievement forms that 'can' lacks.",
      ar: "تعبّر أفعال القدرة والإذن الناقصة عمّا يستطيع الشخص فعله أو يُسمح له به عبر الأزمنة المختلفة. تتبع الأفعال الناقصة الخالصة (can, could, may) بالمصدر المجرد دون to أو -s، بينما تكمّل صيغة be able to الأزمنة التي يفتقر إليها can مثل المستقبل والتام والنجاح في موقف ماضٍ محدد.",
    },
    formula:
      "S + can / could / may + V1 (bare)  •  Future/Perfect/Specific Past: S + will be / have been / was able to + V1",
    forms: {
      affirmative: "She can code in Python now, and she will be able to lead the project next quarter.",
      negative: "I couldn't swim when I was six, and visitors may not take flash photos here.",
      question: "Could I borrow your charger for ten minutes, and were you able to fix the printer?",
    },
    rules: [
      {
        en: "Use 'can' for present general ability ('He can speak three languages') and informal permission ('You can leave early'). Never add '-s' or 'to' after a modal ('She can swim', NOT 'She cans to swim').",
        ar: "نستخدم can للقدرة العامة في الحاضر وللإذن غير الرسمي، ولا نضيف بعدها -s ولا to مطلقاً (She can swim).",
      },
      {
        en: "CRITICAL DISTINCTION: Use 'could' for GENERAL past ability ('When I was young, I could run 10 km'), but use 'was/were able to' or 'managed to' for a SPECIFIC one-time past success ('The fire spread fast, yet everyone was able to escape', NOT 'could escape'). In negatives, 'couldn't' works for both.",
        ar: "فرق جوهري: نستخدم could للقدرة العامة في الماضي، لكن للنجاح في موقف ماضٍ محدد لمرة واحدة نستخدم was/were able to أو managed to (وليس could في الإثبات). أما في النفي فتصح couldn't للحالتين.",
      },
      {
        en: "Use 'be able to' whenever you need a tense that 'can' cannot form: future ('will be able to'), Present Perfect ('have been able to'), or after another modal ('might be able to'). Never write 'will can'.",
        ar: "نستخدم be able to في الأزمنة التي لا تتوفر فيها can، مثل المستقبل (will be able to) والمضارع التام (have been able to). ولا نكتب will can أبداً.",
      },
      {
        en: "For asking permission, rank politeness from casual to formal: 'Can I open the window?' (informal) → 'Could I open the window?' (polite) → 'May I open the window?' (formal). When giving permission, reply with 'Yes, you can/may' (NOT 'Yes, you could').",
        ar: "في طلب الإذن نتدرج في الرسمية: Can I (عادي) ← Could I (مهذب) ← May I (رسمي). وعند منح الإذن نجيب بـ Yes, you can/may وليس Yes, you could.",
      },
    ],
    examples: [
      {
        en: "After weeks of practice, Omar will finally be able to drive on the highway.",
        ar: "بعد أسابيع من التدريب، سيتمكن عمر أخيراً من القيادة على الطريق السريع.",
        highlight: "will finally be able to drive",
      },
      {
        en: "Even though the storm delayed the ferry, the passengers were able to reach the island safely.",
        ar: "رغم أن العاصفة أخّرت العبّارة، تمكن الركاب من الوصول إلى الجزيرة بسلام.",
        highlight: "were able to reach",
      },
      {
        en: "May I review the draft contract before we submit it to the board?",
        ar: "هل لي أن أراجع مسودة العقد قبل رفعها إلى مجلس الإدارة؟",
        highlight: "May I review",
      },
      {
        en: "My grandmother could recite long classical poems from memory when she was a child.",
        ar: "كانت جدتي تستطيع إلقاء قصائد كلاسيكية طويلة غيباً عندما كانت طفلة.",
        highlight: "could recite",
      },
    ],
    arabicInterferenceTip: {
      en: "In Arabic, 'سأستطيع أن أذهب' combines future + 'can' + 'to', tempting learners to say 'I will can to go'. In English, never stack two modals ('will can') and never put 'to' after 'can/could/may'; use 'I will be able to go'.",
      ar: "في العربية نقول «سأستطيع أن أذهب» مما يدفع المتعلم لكتابة I will can to go. في الإنجليزية لا يجتمع فعلان ناقصان معاً ولا تأتي to بعد can، بل الصواب I will be able to go.",
    },
    commonMistake: {
      wrong: "Next year I will can to speak French, and yesterday I could catch the last bus just in time.",
      right: "Next year I will be able to speak French, and yesterday I was able to catch the last bus just in time.",
      why: {
        en: "Replace 'will can to' with 'will be able to', and use 'was able to' (not 'could') for a single specific past achievement.",
        ar: "نستبدل will can to بـ will be able to، ونستخدم was able to للنجاح في موقف ماضٍ محدد لمرة واحدة.",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the sentence: 'Once the update installs, users ___ offline maps.'",
        options: [
          "will can download",
          "will be able to download",
          "can to download",
          "will able to download",
        ],
        correctIndex: 1,
        explanation: {
          en: "Future ability requires 'will be able to + V1', since 'will' and 'can' cannot be combined.",
          ar: "التعبير عن القدرة في المستقبل يتطلب will be able to + المصدر لأنه لا يجوز الجمع بين will وcan.",
        },
      },
      {
        prompt: "Choose the best verb for a single past success: 'The road was flooded, yet the driver ___ get us to the hospital on time.'",
        options: ["could", "can", "was able to", "may"],
        correctIndex: 2,
        explanation: {
          en: "For overcoming a specific difficulty on one occasion in the past, use 'was able to' (or 'managed to'), not affirmative 'could'.",
          ar: "للنجاح في تجاوز عقبة محددة لمرة واحدة في الماضي نستخدم was able to وليس could في الإثبات.",
        },
      },
      {
        prompt: "Someone asks politely: 'Could I use your laptop for a moment?' What is the correct positive reply?",
        options: [
          "Yes, you could.",
          "Yes, of course you can.",
          "Yes, you can to use it.",
          "Yes, you are able.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Even when a request uses polite 'Could I...?', permission is granted using 'can' or 'may', not 'could'.",
          ar: "حتى لو كان الطلب بصيغة Could I المهذبة، نمنح الإذن باستخدام can أو may وليس could.",
        },
      },
    ],
  },
  {
    id: "modals-obligation-necessity-prohibition",
    order: 20,
    moduleId: "modals",
    level: "B1",
    title: {
      en: "Modals of Obligation, Necessity & Prohibition (must / have to / need to / mustn't / don't have to)",
      ar: "أفعال الإلزام والضرورة والمنع (must / have to / need to / mustn't / don't have to)",
    },
    overview: {
      en: "Obligation modals express rules, duties, and necessity. While affirmative 'must' and 'have to' have close meanings (internal vs. external obligation), their NEGATIVE forms have completely different meanings: 'mustn't' means strict prohibition, whereas 'don't have to' means zero obligation (it is optional).",
      ar: "تعبّر أفعال الإلزام عن القوانين والواجبات والضرورة. ورغم تقارب must وhave to في الإثبات (إلزام داخلي مقابل خارجي)، فإن نفيهما مختلف تماماً: mustn't تعني المنع والتحريم التام، بينما don't have to تعني عدم الضرورة (أمر اختياري).",
    },
    formula:
      "Obligation: must / have to / need to + V1  •  Prohibition: mustn't + V1  •  No Obligation: don't have to / needn't + V1  •  Past: had to + V1",
    forms: {
      affirmative: "All passengers must fasten their seatbelts, and I have to renew my passport this week.",
      negative: "You mustn't park in front of the ambulance bay, but you don't have to pay for visitor parking.",
      question: "Do we have to wear lab coats during the orientation, or did you have to bring your own?",
    },
    rules: [
      {
        en: "In affirmative sentences, 'must' often reflects personal/speaker-driven obligation or formal written rules ('I must call my parents tonight'; 'Visitors must sign in'), whereas 'have to' reflects external laws, schedules, or circumstances ('I have to wear a uniform at work').",
        ar: "في الإثبات تعبّر must غالباً عن التزام نابع من المتحدث أو لوائح مكتوبة، بينما تعبّر have to عن إلزام خارجي يفرضه القانون أو العمل.",
      },
      {
        en: "CRITICAL NEGATIVE CONTRAST: 'mustn't' = PROHIBITED (it is forbidden/dangerous: 'You mustn't share your PIN'), while 'don't/doesn't have to' or 'don't need to' = OPTIONAL (not necessary: 'You don't have to wear a tie').",
        ar: "الفرق الحاسم في النفي: mustn't تعني ممنوع بتاتاً، أما don't have to / don't need to فتعني غير ضروري ولك حرية الاختيار.",
      },
      {
        en: "For PAST and FUTURE obligation, 'must' has no tense forms—always use 'had to' (past) and 'will have to' (future): 'Yesterday we had to wait two hours', NOT 'we musted wait'.",
        ar: "لا يوجد ماضٍ ولا مستقبل لـ must؛ نستخدم had to للماضي وwill have to للمستقبل (Yesterday we had to wait).",
      },
      {
        en: "For past lack of necessity, notice 'didn't need to + V1' (it wasn't necessary, so usually didn't do it) vs. 'needn't have + V3' (you DID it, even though it turned out to be unnecessary).",
        ar: "في عدم الضرورة بالماضي: didn't need to تعني لم يكن ضرورياً فلم أفعله غالباً، بينما needn't have + V3 تعني أنك فعلته رغم أنه لم يكن ضرورياً.",
      },
    ],
    examples: [
      {
        en: "You mustn't use your phone while refueling your car—it is strictly prohibited.",
        ar: "يُمنع منعاً باتاً استخدام هاتفك أثناء تزويد سيارتك بالوقود.",
        highlight: "mustn't use your phone",
      },
      {
        en: "Entrance to the gallery is free today, so you don't have to buy a ticket.",
        ar: "الدخول إلى المعرض مجاني اليوم، لذا لست مضطراً لشراء تذكرة.",
        highlight: "don't have to buy a ticket",
      },
      {
        en: "Because the bridge was closed, commuters had to take a longer detour.",
        ar: "بسبب إغلاق الجسر، اضطر المسافرون إلى سلوك طريق بديل أطول.",
        highlight: "had to take",
      },
      {
        en: "You needn't have brought umbrellas—the forecast turned completely sunny!",
        ar: "لم يكن هناك داعٍ لإحضار المظلات — فقد أصبح الطقس مشمساً تماماً!",
        highlight: "needn't have brought",
      },
    ],
    arabicInterferenceTip: {
      en: "In Arabic, 'لا يجب أن' is ambiguous—it can mean either 'mustn't' (forbidden) or 'don't have to' (not required). Because of this, Arab learners frequently say 'You mustn't pay' when they mean 'It's free—you don't have to pay!' Always separate Prohibition ('mustn't') from Optionality ('don't have to').",
      ar: "عبارة «لا يجب أن» في العربية قد تُفهم بمعنى المنع أو بمعنى عدم الضرورة، فيقع المتعلم في خطأ قول You mustn't pay بدلاً من You don't have to pay عندما يكون الشيء مجانياً. افصل دائماً بين المنع (mustn't) والاختيارية (don't have to).",
    },
    commonMistake: {
      wrong: "Tomorrow is a holiday, so you mustn't wake up early, and yesterday I musted finish my taxes.",
      right: "Tomorrow is a holiday, so you don't have to wake up early, and yesterday I had to finish my taxes.",
      why: {
        en: "Sleeping in on a holiday is optional ('don't have to', not forbidden 'mustn't'), and past obligation always uses 'had to' (never 'musted').",
        ar: "الاستيقاظ المبكر في العطلة غير ضروري (don't have to) وليس ممنوعاً، وماضي الإلزام هو had to دائماً.",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the sentence: 'This file is confidential. You ___ forward it to anyone outside the company.'",
        options: [
          "don't have to",
          "mustn't",
          "don't need to",
          "didn't have to",
        ],
        correctIndex: 1,
        explanation: {
          en: "Strict prohibition against sharing a confidential file requires 'mustn't'.",
          ar: "المنع الصارم من مشاركة ملف سري يتطلب mustn't.",
        },
      },
      {
        prompt: "Choose the sentence meaning that attending the optional workshop is NOT required:",
        options: [
          "Employees mustn't attend Friday's optional workshop.",
          "Employees don't have to attend Friday's optional workshop.",
          "Employees have to not attend Friday's optional workshop.",
          "Employees must not to attend Friday's optional workshop.",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Don't have to' expresses lack of obligation (optional attendance).",
          ar: "التعبير don't have to يدل على عدم الإلزام (الحضور اختياري).",
        },
      },
      {
        prompt: "Complete the sentence: 'When the airport flooded last winter, we ___ rebook our flight.'",
        options: ["must", "musted", "had to", "have to"],
        correctIndex: 2,
        explanation: {
          en: "Past obligation is expressed with 'had to + V1', since 'must' has no past tense form.",
          ar: "الإلزام في الماضي يُصاغ باستخدام had to + المصدر لأن must ليس لها صيغة ماضٍ.",
        },
      },
    ],
  },
  {
    id: "modals-advice-and-expectation",
    order: 21,
    moduleId: "modals",
    level: "B1",
    title: {
      en: "Modals of Advice & Expectation (should / ought to / had better / be supposed to)",
      ar: "أفعال النصيحة والتوقع (should / ought to / had better / be supposed to)",
    },
    overview: {
      en: "Advice and expectation modals range from friendly recommendations ('should', 'ought to') to urgent warnings with negative consequences ('had better') and social rules, schedules, or unmet expectations ('be supposed to').",
      ar: "تتدرج أفعال النصيحة والتوقع من التوصية اللطيفة (should وought to) إلى التحذير القوي المرتبط بعاقبة سلبية (had better)، وصولاً إلى القواعد المتعارف عليها والمواعيد والتوقعات التي قد لا تتحقق (be supposed to).",
    },
    formula:
      "S + should / ought to / had better ('d better) + V1  •  S + am/is/are/was/were + supposed to + V1",
    forms: {
      affirmative: "You should back up your files, and you'd better leave now before traffic builds up.",
      negative: "You shouldn't skip breakfast, and you'd better not forget your ID at the gate.",
      question: "Should we confirm the venue today, and what time is the courier supposed to arrive?",
    },
    rules: [
      {
        en: "Use 'should + V1' and 'ought to + V1' for general advice, moral duty, and logical expectation ('The package should arrive by Thursday'). 'Ought to' is slightly more formal and less common in questions.",
        ar: "نستخدم should وought to للنصيحة العامة والواجب الأخلاقي والتوقع المنطقي، وتعد ought to أكثر رسمية قليلاً وأقل شيوعاً في الأسئلة.",
      },
      {
        en: "Use 'had better ('d better) + V1' for STRONG advice or warning in a SPECIFIC present/future situation where ignoring it leads to a bad result ('You'd better take an umbrella, or you'll get soaked'). Its negative is 'had better not + V1' (NEVER 'hadn't better' or 'had better to').",
        ar: "نستخدم had better للنصيحة القوية أو التحذير في موقف محدد إذا ترتبت على تجاهله نتيجة سيئة، ونفيها had better not + المصدر (وليس had better to).",
      },
      {
        en: "Note that 'had better' looks like past tense ('had'), yet it ALWAYS refers to the PRESENT or FUTURE—never use it for past habits or past advice.",
        ar: "رغم وجود كلمة had فإن صيغة had better تشير دائماً إلى الحاضر أو المستقبل ولا تُستخدم أبداً للماضي.",
      },
      {
        en: "Use 'be supposed to + V1' for rules, schedules, expectations, and rumors ('Trains are supposed to run every ten minutes'; 'The new café is supposed to be amazing'). In the past ('was/were supposed to'), it usually implies the plan did NOT happen.",
        ar: "تُستخدم be supposed to للقواعد والترتيبات والتوقعات والسمعة الشائعة. وفي الماضي (was/were supposed to) توحي غالباً بأن الأمر المتوقع لم يحدث.",
      },
    ],
    examples: [
      {
        en: "If your cough gets worse, you ought to see a specialist this week.",
        ar: "إذا ازداد سعالك سوءاً، ينبغي عليك مراجعة طبيب مختص هذا الأسبوع.",
        highlight: "ought to see",
      },
      {
        en: "We'd better not miss the last ferry, or we'll be stranded on the island overnight.",
        ar: "من الأفضل ألا نفوّت العبّارة الأخيرة، وإلا فسنعلق في الجزيرة طوال الليل.",
        highlight: "We'd better not miss",
      },
      {
        en: "The plumber was supposed to arrive at nine, yet it's already ten-thirty.",
        ar: "كان من المفترض أن يصل السباك في التاسعة، لكنها العاشرة والنصف الآن.",
        highlight: "was supposed to arrive",
      },
      {
        en: "You shouldn't rely solely on one source when writing an academic essay.",
        ar: "لا ينبغي أن تعتمد على مصدر واحد فقط عند كتابة مقال أكاديمي.",
        highlight: "shouldn't rely",
      },
    ],
    arabicInterferenceTip: {
      en: "Learners often insert 'to' after 'should' and 'had better' ('You should to study', 'You had better to go') by analogy with Arabic 'يجب أن تدرس' and 'ought to'. Remember: ONLY 'ought to' and 'be supposed to' take 'to'; 'should' and 'had better' take the bare verb.",
      ar: "قياساً على «يجب أن» في العربية، يضيف كثير من المتعلمين كلمة to بعد should وhad better. تذكر: ought to وbe supposed to فقط تأخذان to، أما should وhad better فيتبعهما الفعل المجرد مباشرة.",
    },
    commonMistake: {
      wrong: "You had better to submit the form today, and he suppose to lead the workshop.",
      right: "You had better submit the form today, and he is supposed to lead the workshop.",
      why: {
        en: "'Had better' is followed directly by the bare infinitive ('submit'), and 'be supposed to' requires both the verb 'be' ('is') and the '-d' participle ('supposed').",
        ar: "تتبع had better بالفعل المجرد مباشرة (submit)، أما صيغة be supposed to فتتطلب وجود فعل be (is) وحرف d في supposed.",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the urgent warning: 'Your phone battery is at 2%. You ___ save your document right now!'",
        options: [
          "had better to",
          "had better",
          "are suppose to",
          "ought",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Had better + bare verb (save)' gives strong, specific advice with an immediate bad consequence if ignored.",
          ar: "الصيغة had better + الفعل المجرد (save) تعطي تحذيراً فورياً في موقف محدد قد يترتب عليه ضرر.",
        },
      },
      {
        prompt: "Choose the correct negative form of 'had better':",
        options: [
          "You hadn't better tell him the secret.",
          "You don't had better tell him the secret.",
          "You'd better not tell him the secret.",
          "You'd better not to tell him the secret.",
        ],
        correctIndex: 2,
        explanation: {
          en: "The fixed negative structure is 'had better not ('d better not) + bare infinitive'.",
          ar: "صيغة النفي الصحيحة هي had better not ('d better not) متبوعة بالمصدر المجرد دون to.",
        },
      },
      {
        prompt: "Which sentence implies that the meeting was planned for noon, but did NOT happen on time?",
        options: [
          "The meeting should start at noon.",
          "The meeting was supposed to start at noon.",
          "The meeting had better start at noon.",
          "The meeting ought to start at noon.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Past 'was/were supposed to' expresses a scheduled expectation that failed to occur as planned.",
          ar: "صيغة الماضي was supposed to تعبّر عن توقع أو موعد كان مقرراً لكنه لم يتم كما خُطط له.",
        },
      },
    ],
  },
  {
    id: "modals-deduction-and-probability",
    order: 22,
    moduleId: "modals",
    level: "B2",
    title: {
      en: "Modals of Deduction & Probability (must / might / may / could / can't)",
      ar: "أفعال الاستنتاج والاحتمال (must / might / may / could / can't)",
    },
    overview: {
      en: "Modals of deduction express how certain you are about a present fact or ongoing situation based on available clues—from near-100% logical certainty ('must' = surely true; 'can't' = surely impossible) to open possibility ('may', 'might', 'could' = perhaps true).",
      ar: "تعبّر أفعال الاستنتاج عن مدى يقينك من حقيقة أو موقف في الحاضر بناءً على القرائن المتاحة: من اليقين المنطقي القريب من 100% (must بمعنى «لا بد أنه» وcan't بمعنى «مستحيل أنه») إلى الاحتمال المفتوح (may / might / could بمعنى «ربما»).",
    },
    formula:
      "Certainty (+): S + must + V1 / be V-ing  •  Possibility: S + may / might / could + V1 / be V-ing  •  Impossibility (–): S + can't + V1 / be V-ing",
    forms: {
      affirmative: "The lights are on and music is playing; they must be home, or a guest might be visiting.",
      negative: "He just ate two plates of kabsa—he can't be hungry already, and she may not know the address.",
      question: "Could that tall man by the entrance be the new keynote speaker?",
    },
    rules: [
      {
        en: "Use 'must + V1 / be V-ing' when strong evidence leads to one logical conclusion ('She has worked twelve hours straight; she must be exhausted').",
        ar: "نستخدم must للاستنتاج المنطقي المؤكد المبني على دليل واضح (عملت 12 ساعة متواصلة، لا بد أنها منهكة: she must be exhausted).",
      },
      {
        en: "CRITICAL OPPOSITE: The logical opposite of deductive 'must' is 'can't' (NOT 'mustn't'!): 'That bill is 5,000 riyals for two coffees—there must be a mistake; it can't be right!'",
        ar: "قاعدة حاسمة: عكس must في الاستنتاج هو can't (وليس mustn't!)؛ فنقول it can't be true بمعنى «يستحيل أن يكون صحيحاً».",
      },
      {
        en: "Use 'may', 'might', or 'could' for roughly 30%–50% possibility ('He isn't answering; he might be driving'). In the negative, use 'may not' or 'might not' ('She might not come'), NEVER 'couldn't' for mild uncertainty (since 'couldn't' means impossibility).",
        ar: "نستخدم may وmight وcould للاحتمال المفتوح. وفي النفي نستخدم may not أو might not (ربما لا)، ولا نستخدم couldn't للاحتمال الضعيف لأنها تفيد الاستحالة.",
      },
      {
        en: "Use continuous modal forms ('must be + V-ing', 'might be + V-ing', 'can't be + V-ing') to deduce an action happening RIGHT NOW ('Listen to the applause—the speaker must be finishing').",
        ar: "نستخدم الصيغة المستمرة (must/might/can't + be + V-ing) لاستنتاج فعل يحدث في هذه اللحظة بالذات.",
      },
    ],
    examples: [
      {
        en: "You've been walking in the desert sun all day; you must be freezing in this strong AC!",
        ar: "لقد كنت تمشي تحت شمس الصحراء طوال اليوم؛ لا بد أنك تشعر بالبرد الشديد مع هذا التكييف القوي!",
        highlight: "must be freezing",
      },
      {
        en: "That can't be Yusuf's car outside—he sold it last month and moved to Madinah.",
        ar: "يستحيل أن تكون تلك سيارة يوسف في الخارج — فقد باعها الشهر الماضي وانتقل إلى المدينة المنورة.",
        highlight: "can't be Yusuf's car",
      },
      {
        en: "Where is Noor? She isn't at her desk, so she might be grabbing lunch downstairs.",
        ar: "أين نور؟ إنها ليست على مكتبها، لذا ربما تكون تتناول الغداء في الطابق السفلي.",
        highlight: "might be grabbing",
      },
      {
        en: "Take a sweater just in case; the mountain breeze may not feel warm after sunset.",
        ar: "خذ سترة تحسباً؛ فنسيم الجبل قد لا يكون دافئاً بعد غروب الشمس.",
        highlight: "may not feel",
      },
    ],
    arabicInterferenceTip: {
      en: "Learners often negate deductive 'must' as 'mustn't' ('He mustn't be at home' when they see the lights off). In English, 'mustn't' ONLY expresses prohibition; logical impossibility ALWAYS uses 'can't' ('He can't be at home').",
      ar: "يقع الكثيرون في خطأ نفي must الاستنتاجية بـ mustn't (He mustn't be at home). في الإنجليزية mustn't للمنع فقط، أما نفي الاستنتاج بمعنى «مستحيل أن يكون» فيكون دائماً بـ can't: He can't be at home.",
    },
    commonMistake: {
      wrong: "He has lived in Riyadh his entire life, so he mustn't be a tourist, and she can be late today.",
      right: "He has lived in Riyadh his entire life, so he can't be a tourist, and she might be late today.",
      why: {
        en: "Use 'can't' (not 'mustn't') for logical impossibility, and use 'might/may/could' (not affirmative 'can') for specific present/future possibility.",
        ar: "نستخدم can't للاستحالة المنطقية لا mustn't، ونستخدم might/may/could للاحتمال الخاص وليس can المثبتة.",
      },
    },
    quickCheck: [
      {
        prompt: "Look at the snow-covered mountains outside. It ___ freezing out there!",
        options: ["can't be", "must be", "mustn't be", "could not"],
        correctIndex: 1,
        explanation: {
          en: "Strong visible evidence (snow-covered mountains) supports near-certain positive deduction: 'must be'.",
          ar: "الدليل المرئي القوي (الثلوج على الجبال) يقود إلى استنتاج إيجابي مؤكد باستخدام must be.",
        },
      },
      {
        prompt: "Complete the sentence: 'She just won a gold medal in Paris yesterday, so she ___ sitting in our Cairo office right now!'",
        options: ["mustn't be", "might not be", "can't be", "shouldn't be"],
        correctIndex: 2,
        explanation: {
          en: "Being in Cairo right now is logically impossible given the evidence; negative certainty uses 'can't be'.",
          ar: "وجودها في القاهرة الآن مستحيل منطقياً وفق الدليل، والاستحالة المنطقية تأخذ can't be.",
        },
      },
      {
        prompt: "Which sentence correctly expresses mild uncertainty about a present situation?",
        options: [
          "They couldn't know the new gate number yet.",
          "They might not know the new gate number yet.",
          "They mustn't know the new gate number yet.",
          "They can know the new gate number yet.",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Might not' (or 'may not') expresses possibility in the negative ('perhaps they don't know'), whereas 'couldn't' expresses impossibility.",
          ar: "الصيغة might not تعبّر عن الاحتمال المنفي («ربما لا يعرفون»)، بينما couldn't تعني الاستحالة.",
        },
      },
    ],
  },
  {
    id: "past-modals-regret-and-speculation",
    order: 23,
    moduleId: "modals",
    level: "B2",
    title: {
      en: "Past Modals of Regret & Speculation (should have / must have / could have / might have)",
      ar: "الأفعال الناقصة في الماضي للندم والتخمين (should have / must have / could have / might have)",
    },
    overview: {
      en: "Past modals follow the unified structure 'modal + have + V3' to look back at finished past events—either evaluating past choices with regret/criticism ('should have', 'could have') or deducing what logically happened in the past ('must have', 'can't have', 'might have').",
      ar: "تتبع الأفعال الناقصة في الماضي البنية الموحّدة modal + have + التصريف الثالث للنظر في أحداث ماضية منتهية: إما لتقييم قرارات سابقة بالندم أو اللوم (should have وcould have)، أو لاستنتاج وتخمين ما حدث في الماضي (must have وcan't have وmight have).",
    },
    formula:
      "S + should / ought to / could / must / might / may / can't + have + Past Participle (V3)",
    forms: {
      affirmative: "She must have left early, and I should have double-checked the attachment before sending.",
      negative: "He can't have forgotten the ceremony, and you shouldn't have spoken so harshly.",
      question: "Could they have taken the earlier train, or might we have missed their call?",
    },
    rules: [
      {
        en: "Use 'should have + V3' / 'ought to have + V3' for past regret or criticism about an action you DIDN'T do ('I should have booked sooner' = I didn't, and I regret it). Use 'shouldn't have + V3' for an action you DID do and now regret ('I shouldn't have stayed up so late').",
        ar: "نستخدم should have + V3 للندم أو اللوم على أمر لم يُفعل وكان ينبغي فعله، وshouldn't have + V3 للندم على أمر فُعل ولم يكن ينبغي فعله.",
      },
      {
        en: "Use 'must have + V3' for strong logical deduction about the past ('The ground is covered in leaves—there must have been a windstorm last night'), and 'can't have + V3' / 'couldn't have + V3' for past impossibility ('He can't have stolen the file; he was abroad').",
        ar: "نستخدم must have + V3 للاستنتاج المؤكد حول الماضي («لا بد أنه حدث»)، وcan't/couldn't have + V3 للاستحالة في الماضي («مستحيل أنه فعل ذلك»).",
      },
      {
        en: "Use 'might have / may have / could have + V3' for past speculation when you aren't sure ('She might have missed the bus'). Note that 'could have + V3' ALSO expresses an unrealized past ability/opportunity ('I could have studied medicine, but I chose architecture').",
        ar: "نستخدم might/may/could have + V3 للتخمين حول الماضي عند عدم التأكد. كما تُستخدم could have + V3 لفرصة أو قدرة كانت متاحة في الماضي ولم تُستغل.",
      },
      {
        en: "Always use bare 'have' (NEVER 'has', 'had', or 'of') + V3 after every modal, and use 'modal + have been + V-ing' for ongoing past deductions ('She might have been sleeping when you knocked').",
        ar: "نستخدم have المجردة دائماً بعد كل فعل ناقص (وليس has أو had أو of) متبوعة بالتصريف الثالث، وللاستمرار في الماضي نستخدم modal + have been + V-ing.",
      },
    ],
    examples: [
      {
        en: "I should have backed up my laptop before the hard drive crashed.",
        ar: "كان ينبغي أن أحتفظ بنسخة احتياطية لحاسوبي قبل تعطل القرص الصلب.",
        highlight: "should have backed up",
      },
      {
        en: "The streets are flooded and tree branches are down; it must have rained heavily overnight.",
        ar: "الشوارع مغمورة بالمياه وأغصان الأشجار متساقطة؛ لا بد أنها أمطرت بغزارة طوال الليل.",
        highlight: "must have rained",
      },
      {
        en: "Layla can't have written that message—she doesn't even have access to this account.",
        ar: "يستحيل أن تكون ليلى قد كتبت تلك الرسالة — فهي لا تملك حتى صلاحية الدخول لهذا الحساب.",
        highlight: "can't have written",
      },
      {
        en: "We could have taken a taxi to save time, but we decided to walk through the old souq.",
        ar: "كان بإمكاننا أخذ سيارة أجرة لتوفير الوقت، لكننا قررنا المشي عبر السوق القديم.",
        highlight: "could have taken",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic often uses 'كان يجب أن أدرس' which learners translate word-for-word as 'I had to study' (which actually means 'I DID study because I was forced to!'). When you mean you DIDN'T do it and regret it, ALWAYS use 'I should have studied', NOT 'I had to study'.",
      ar: "يترجم كثير من المتعلمين «كان يجب أن أدرس» حرفياً إلى I had to study، لكن had to تعني أنك درست فعلاً بدافع الإلزام! أما للتعبير عن الندم على شيء لم تفعله في الماضي فالصواب دائماً I should have studied.",
    },
    commonMistake: {
      wrong: "He must has lost his keys, and I shouldn't went to bed so late yesterday.",
      right: "He must have lost his keys, and I shouldn't have gone to bed so late yesterday.",
      why: {
        en: "All past modals follow 'modal + have + V3' ('must have lost', 'shouldn't have gone')—never 'has' or a bare past tense V2.",
        ar: "جميع الأفعال الناقصة في الماضي تتبع الصيغة الثابتة modal + have + V3 (مثل must have lost وshouldn't have gone).",
      },
    },
    quickCheck: [
      {
        prompt: "You forgot your umbrella and got completely soaked. What do you say with regret?",
        options: [
          "I must have brought my umbrella.",
          "I should have brought my umbrella.",
          "I had to bring my umbrella.",
          "I can't have brought my umbrella.",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Should have + V3' expresses regret about a wise action you failed to do in the past.",
          ar: "الصيغة should have + V3 تعبّر عن الندم على فعل صائب لم تقم به في الماضي.",
        },
      },
      {
        prompt: "Complete the past deduction: 'The safe is locked from the inside with no signs of entry. A stranger ___ broken in.'",
        options: [
          "mustn't have",
          "can't have",
          "shouldn't have",
          "might have",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Can't have + V3' expresses near-certainty that something was impossible in the past.",
          ar: "تُستخدم can't have + V3 للتعبير عن شبه اليقين باستحالة وقوع الحدث في الماضي.",
        },
      },
      {
        prompt: "Choose the sentence expressing an UNREALIZED past opportunity:",
        options: [
          "She must have accepted the scholarship in London.",
          "She could have accepted the scholarship, yet she preferred to stay home.",
          "She can't have accepted the scholarship because it was canceled.",
          "She might have been accepting the scholarship right now.",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Could have + V3' paired with a contrasting choice ('yet she preferred...') shows an option that existed in the past but was not taken.",
          ar: "تدل could have + V3 مع التباين (yet she preferred) على فرصة كانت متاحة في الماضي ولم يُختر استغلالها.",
        },
      },
    ],
  },
  // =========================================================================
  // MODULE 4: PASSIVE VOICE & CAUSATIVE STRUCTURES (Orders 24–27)
  // =========================================================================
  {
    id: "passive-voice-present-and-past-simple",
    order: 24,
    moduleId: "passive-causative",
    level: "B1",
    title: {
      en: "Passive Voice: Present Simple & Past Simple Passive",
      ar: "المبني للمجهول: المضارع البسيط والماضي البسيط",
    },
    overview: {
      en: "The passive voice shifts focus from the doer (agent) to the receiver or result of an action—ideal for scientific processes, news reports, signs, and historical facts. Present Simple Passive uses 'am/is/are + V3', and Past Simple Passive uses 'was/were + V3'.",
      ar: "ينقل المبني للمجهول التركيز من الفاعل إلى المفعول به أو نتيجة الفعل، وهو مثالي للعمليات العلمية والتقارير الإخبارية واللافتات والحقائق التاريخية. يُصاغ المضارع البسيط المجهول بـ am/is/are + V3، والماضي البسيط المجهول بـ was/were + V3.",
    },
    formula:
      "Present Simple Passive: S + am / is / are + V3  •  Past Simple Passive: S + was / were + V3  (+ by + agent)",
    forms: {
      affirmative: "Arabic coffee is served with dates here, and this museum was built in 1999.",
      negative: "Pets aren't allowed inside the clinic, and the damaged parcels weren't delivered.",
      question: "Where are these electric buses manufactured, and when was the manuscript discovered?",
    },
    rules: [
      {
        en: "To convert Active to Passive, promote the direct object to the subject position, conjugate 'be' in the SAME tense as the active verb, and convert the main verb to its past participle (V3): 'Engineers design the bridge' → 'The bridge is designed by engineers.'",
        ar: "للتحويل إلى المبني للمجهول نجعل المفعول به فاعلاً، ونصرّف فعل be في نفس زمن الجملة الأصلية، ونضع الفعل الرئيسي في التصريف الثالث (V3).",
      },
      {
        en: "Omit 'by + agent' whenever the doer is unknown, obvious, or unimportant ('My wallet was stolen', 'English is spoken worldwide'). Include 'by + agent' only when the doer adds meaningful information ('The palace was designed by a famous architect').",
        ar: "نحذف by + الفاعل عندما يكون الفاعل مجهولاً أو بديهياً أو غير مهم (My wallet was stolen)، ونذكره فقط عندما يضيف معلومة مهمة.",
      },
      {
        en: "Only TRANSITIVE verbs (verbs that take a direct object) can form a passive. Intransitive verbs such as 'happen, occur, arrive, die, appear, exist, rise' NEVER have a passive form ('An accident happened', NEVER 'An accident was happened').",
        ar: "الأفعال المتعدية فقط (التي تأخذ مفعولاً به) تُبنى للمجهول؛ أما الأفعال اللازمة مثل happen وarrive وoccur وdie وexist فلا تُبنى للمجهول أبداً (لا تقل was happened).",
      },
      {
        en: "Distinguish 'by' (the agent/doer) from 'with' (the instrument or material used): 'The portrait was painted BY a local artist WITH oil colors.'",
        ar: "فرّق بين by (للفاعل الذي قام بالفعل) وwith (للأداة أو المادة المستخدمة): painted by an artist with oil colors.",
      },
    ],
    examples: [
      {
        en: "Millions of tons of dates are exported from Saudi Arabia every year.",
        ar: "تُصدَّر ملايين الأطنان من التمور من المملكة العربية السعودية كل عام.",
        highlight: "are exported",
      },
      {
        en: "The historic fortress in Diriyah was restored carefully over several years.",
        ar: "رُمِّمت القلعة التاريخية في الدرعية بعناية على مدى عدة سنوات.",
        highlight: "was restored",
      },
      {
        en: "Were the scholarship winners notified by email before the ceremony?",
        ar: "هل أُبلِغ الفائزون بالمنحة عبر البريد الإلكتروني قبل الحفل؟",
        highlight: "Were the scholarship winners notified",
      },
      {
        en: "Paper is made from wood pulp, and it is recycled in specialized plants.",
        ar: "يُصنع الورق من لبّ الخشب، ويُعاد تدويره في مصانع متخصصة.",
        highlight: "is made from wood pulp, and it is recycled",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic forms passive by changing internal vowels ('كُتِبَ' / 'يُكتَبُ') without an auxiliary verb, so learners sometimes write 'The letter wrote yesterday' or incorrectly passivize intransitive verbs ('The accident was happened'). Always verify: (1) is the verb transitive? (2) did you include BOTH 'be' AND V3?",
      ar: "يُبنى المجهول في العربية بتغيير الحركات الداخلية للفعل (كُتِبَ / يُكتَبُ) دون فعل مساعد، مما يجعل المتعلم ينسى فعل be أو يبني أفعالاً لازمة للمجهول مثل was happened. تحقق دائماً من أمرين: أن الفعل متعدٍ، وأنك جمعت بين be والتصريف الثالث V3.",
    },
    commonMistake: {
      wrong: "A serious accident was happened on the ring road, and two cars damaged badly.",
      right: "A serious accident happened on the ring road, and two cars were damaged badly.",
      why: {
        en: "'Happen' is intransitive and cannot be passive ('happened'), while 'cars' received the action of damaging and require 'were' + V3 ('were damaged').",
        ar: "الفعل happen فعل لازم لا يُبنى للمجهول (happened)، بينما السيارات تلقت الضرر فتحتاج صيغة المبني للمجهول were damaged.",
      },
    },
    quickCheck: [
      {
        prompt: "Choose the correct passive form: 'High-quality saffron ___ in small farms across the region.'",
        options: ["grows", "is grown", "is grew", "are grown"],
        correctIndex: 1,
        explanation: {
          en: "'Saffron' is uncountable (singular) and receives the action, so Present Simple Passive is 'is grown' (V3 of grow).",
          ar: "الزعفران اسم غير معدود (مفرد) ويقع عليه فعل الزراعة، لذا نستخدم المضارع البسيط المجهول is grown.",
        },
      },
      {
        prompt: "Which sentence is grammatically CORRECT?",
        options: [
          "The earthquake was occurred at dawn.",
          "My package was arrived yesterday morning.",
          "The ancient coins were discovered by archaeologists in 2018.",
          "The final exam was wrote by the senior committee.",
        ],
        correctIndex: 2,
        explanation: {
          en: "'Discover' is transitive and correctly uses 'were' + V3 ('were discovered'). 'Occur' and 'arrive' are intransitive, and V3 of write is 'written'.",
          ar: "الفعل discover متعدٍ وصيغته الصحيحة were discovered، بينما occur وarrive لازمان، والتصريف الثالث من write هو written.",
        },
      },
      {
        prompt: "Convert to Past Simple Passive: 'Did the security guard lock the main gate?'",
        options: [
          "Was the main gate lock by the security guard?",
          "Did the main gate locked by the security guard?",
          "Was the main gate locked by the security guard?",
          "Were the main gate locked by the security guard?",
        ],
        correctIndex: 2,
        explanation: {
          en: "Singular 'the main gate' takes 'Was' + subject + V3 ('locked') in Past Simple Passive questions.",
          ar: "السؤال في الماضي البسيط المجهول مع المفرد يتبع الصيغة: Was + نائب الفاعل + التصريف الثالث (locked).",
        },
      },
    ],
  },
  {
    id: "passive-voice-continuous-and-perfect-tenses",
    order: 25,
    moduleId: "passive-causative",
    level: "B2",
    title: {
      en: "Passive Voice: Continuous & Perfect Tenses",
      ar: "المبني للمجهول: الأزمنة المستمرة والأزمنة التامة",
    },
    overview: {
      en: "Complex passives preserve the exact aspect of continuous and perfect tenses by placing 'being' (for continuous) or 'been' (for perfect) right before V3. Mastering 'is/was being + V3' and 'has/had/will have been + V3' is essential for formal reports, IELTS Academic process descriptions, and journalism.",
      ar: "تحافظ صيغ المبني للمجهول المتقدمة على دلالة الاستمرار والتمام بوضع being (في الأزمنة المستمرة) أو been (في الأزمنة التامة) قبل التصريف الثالث V3. وإتقانها ضروري للتقارير الرسمية والكتابة الأكاديمية ووصف العمليات في اختبار IELTS.",
    },
    formula:
      "Continuous Passive: am/is/are/was/were + being + V3  •  Perfect Passive: have/has/had/will have + been + V3",
    forms: {
      affirmative: "The terminal is being expanded right now, and three new gates have already been opened.",
      negative: "The road wasn't being repaired last week, and the error hadn't been noticed before launch.",
      question: "Has the revised policy been approved yet, or is it still being reviewed by legal?",
    },
    rules: [
      {
        en: "Form Present & Past Continuous Passive with 'am/is/are/was/were + BEING + V3' to show an action currently or previously in progress ('Our server is being updated now'; 'The patients were being examined when the alarm rang').",
        ar: "يُصاغ المضارع والماضي المستمر المبني للمجهول بـ am/is/are/was/were + being + V3 للتعبير عن فعل يُنفّذ حالياً أو كان قيد التنفيذ في لحظة ماضية.",
      },
      {
        en: "Form Present, Past & Future Perfect Passive with 'have/has/had/will have + BEEN + V3' ('All invitations have been sent'; 'The room had been cleaned before noon'; 'The report will have been audited by Friday').",
        ar: "تُصاغ الأزمنة التامة المبنية للمجهول (مضارع/ماضٍ/مستقبل تام) بإضافة been قبل التصريف الثالث: have/has/had/will have + been + V3.",
      },
      {
        en: "NEVER confuse 'being' (continuous passive) with 'been' (perfect passive): 'is being built' (under construction now) vs. 'has been built' (already finished).",
        ar: "لا تخلط أبداً بين being (للمستمر) وbeen (للتام): is being built تعني «يُبنى الآن»، أما has been built فتعني «قد بُني وانتهى».",
      },
      {
        en: "English normally avoids Future Continuous Passive ('will be being done') and Perfect Continuous Passive ('has been being done') as stylistically awkward; rephrase with active voice or a simpler passive.",
        ar: "تتجنب الإنجليزية المعاصرة الصيغ الثقيلة مثل will be being done وhas been being done، وتستبدلها بالمبني للمعلوم أو بصيغة مجهول أبسط.",
      },
    ],
    examples: [
      {
        en: "Please use the side entrance while the main lobby is being repainted.",
        ar: "يرجى استخدام المدخل الجانبي بينما يُعاد طلاء البهو الرئيسي حالياً.",
        highlight: "is being repainted",
      },
      {
        en: "Several new desalination plants have been constructed along the coast since 2020.",
        ar: "أُنشئت عدة محطات جديدة لتحلية المياه على طول الساحل منذ عام 2020.",
        highlight: "have been constructed",
      },
      {
        en: "When we arrived at the workshop, the engines were still being inspected.",
        ar: "عندما وصلنا إلى الورشة، كانت المحركات لا تزال تخضع للفحص.",
        highlight: "were still being inspected",
      },
      {
        en: "By the time the inspector reached the warehouse, every crate had been labeled and sealed.",
        ar: "بحلول وصول المفتش إلى المستودع، كان كل صندوق قد وُسم وأُغلق بإحكام.",
        highlight: "had been labeled and sealed",
      },
    ],
    arabicInterferenceTip: {
      en: "Learners frequently drop 'being' or 'been' ('The car is repairing now' / 'The file has sent'), turning the sentence active or nonsensical. Remember: every passive verb MUST contain a form of 'be' immediately before V3—'is BEING repaired' (now) and 'has BEEN sent' (completed).",
      ar: "كثيراً ما يحذف المتعلم being أو been فيكتب The car is repairing أو The file has sent، مما يقلب المعنى. تذكر أن صيغة المبني للمجهول لا تكتمل إلا بوجود being (للمستمر) أو been (للتام) مباشرة قبل التصريف الثالث.",
    },
    commonMistake: {
      wrong: "The bridge is building right now, and two lanes have already closed since Monday.",
      right: "The bridge is being built right now, and two lanes have already been closed since Monday.",
      why: {
        en: "The bridge does not build itself—use Present Continuous Passive ('is being built'). Likewise, the lanes received the closing action—use Present Perfect Passive ('have already been closed').",
        ar: "الجسر لا يبني نفسه بل يُبنى الآن (is being built)، والمسارات أُغلقت فتحتاج المضارع التام المجهول (have already been closed).",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the sentence: 'Sorry for the noise—the upstairs apartment ___ this week.'",
        options: [
          "is renovating",
          "is being renovated",
          "has being renovated",
          "is been renovated",
        ],
        correctIndex: 1,
        explanation: {
          en: "An ongoing passive action happening temporarily around now takes Present Continuous Passive: 'is being + V3'.",
          ar: "الفعل المجهول المستمر مؤقتاً هذه الأيام يتطلب المضارع المستمر المجهول: is being renovated.",
        },
      },
      {
        prompt: "Choose the correct form: 'Since the campaign launched, over 50,000 trees ___ across the valley.'",
        options: [
          "are being planted",
          "have planted",
          "have been planted",
          "had been planting",
        ],
        correctIndex: 2,
        explanation: {
          en: "'Since + past point' signals Present Perfect, and 'trees' are the receiver of 'plant', requiring 'have been planted'.",
          ar: "وجود since يستدعي المضارع التام، ولأن الأشجار مفعول به نستخدم المبني للمجهول have been planted.",
        },
      },
      {
        prompt: "Complete the sentence: 'By the time the guests reached the hall, all the chairs ___.'",
        options: [
          "had been arranged",
          "were being arranging",
          "have been arranged",
          "had arranged",
        ],
        correctIndex: 0,
        explanation: {
          en: "Completion prior to a past arrival ('reached') in the passive voice requires Past Perfect Passive ('had been arranged').",
          ar: "اكتمال الترتيب قبل الوصول في الماضي بصيغة المبني للمجهول يتطلب الماضي التام المجهول had been arranged.",
        },
      },
    ],
  },
  {
    id: "modal-passive-and-academic-reporting-passive",
    order: 26,
    moduleId: "passive-causative",
    level: "C1",
    title: {
      en: "Modal Passive & Academic Reporting Passive (It is believed that...)",
      ar: "المبني للمجهول مع الأفعال الناقصة والتقارير الأكاديمية (It is believed that...)",
    },
    overview: {
      en: "Advanced writing relies heavily on two formal passive tools: Modal Passive ('modal + be / have been + V3') for rules, possibilities, and past deductions, and Impersonal/Personal Reporting Passives ('It is believed that...' / 'He is thought to...') to present consensus, research claims, and news objectively.",
      ar: "تعتمد الكتابة المتقدمة والأكاديمية بقوة على أداتين في المبني للمجهول: المبني للمجهول مع الأفعال الناقصة (modal + be / have been + V3) للقوانين والاستنتاجات، والمبني للمجهول الإخباري/الأكاديمي (It is believed that... وSubject + is thought to...) لعرض الآراء والأبحاث والأخبار بموضوعية.",
    },
    formula:
      "Modal Passive: modal + be + V3 (present/future) | modal + have been + V3 (past)  •  Reporting: It is said that + Clause  |  S + is said + to V1 / to have V3",
    forms: {
      affirmative: "Safety helmets must be worn on site, and this manuscript is believed to have been written in 1340.",
      negative: "Personal data cannot be shared without consent, and the delay isn't expected to last long.",
      question: "Could the missing parcel have been delivered to the wrong floor, and is the merger thought to be final?",
    },
    rules: [
      {
        en: "Form present/future Modal Passive with 'modal + be + V3' ('Applications must be submitted online'; 'The deadline might be extended'), and past Modal Passive with 'modal + have been + V3' ('The file must have been deleted by mistake').",
        ar: "يُصاغ المبني للمجهول مع الأفعال الناقصة في الحاضر/المستقبل بـ modal + be + V3، وفي الماضي بـ modal + have been + V3.",
      },
      {
        en: "Impersonal Reporting Passive uses dummy 'It' + passive reporting verb (believe, think, claim, report, estimate, expect, know) + 'that' clause: 'It is widely believed that early bilingualism strengthens memory.'",
        ar: "صيغة التقرير غير الشخصي تبدأ بـ It + فعل تقرير مجهول (is believed / is reported / is estimated) + جملة that.",
      },
      {
        en: "Personal Reporting Passive promotes the inner subject and uses an infinitive: 'to + V1' for present/future states ('He is said to speak six languages'), 'to be + V-ing' for ongoing actions ('They are rumored to be negotiating'), and 'to have + V3' for EARLIER/PAST actions ('The city is thought to have been founded 2,000 years ago').",
        ar: "صيغة التقرير الشخصي تبدأ بالفاعل الحقيقي متبوعاً بمصدر مناسب للزمن: to + V1 للحاضر/المستقبل، وto be + V-ing للمستمر الآن، وto have + V3 (أو to have been + V3) لحدث سابق في الماضي.",
      },
      {
        en: "Avoid mixing the two reporting patterns: NEVER write 'It is believed him to be...' or 'He is believed that he lives...'. Choose either 'It is believed that he lives...' OR 'He is believed to live...'.",
        ar: "لا تخلط بين الصيغتين؛ فلا تكتب He is believed that... بل اختر إما It is believed that he... أو He is believed to....",
      },
    ],
    examples: [
      {
        en: "All laboratory samples must be stored below four degrees Celsius.",
        ar: "يجب تخزين جميع عينات المختبر في درجة حرارة أقل من أربع درجات مئوية.",
        highlight: "must be stored",
      },
      {
        en: "The package should have been insured before it was shipped overseas.",
        ar: "كان ينبغي التأمين على الطرد قبل شحنه إلى الخارج.",
        highlight: "should have been insured",
      },
      {
        en: "It is estimated that renewable energy will supply half the grid by 2035.",
        ar: "يُقدَّر أن الطاقة المتجددة ستزوّد نصف الشبكة الكهربائية بحلول عام 2035.",
        highlight: "It is estimated that",
      },
      {
        en: "The ancient trade route is thought to have connected three continents.",
        ar: "يُعتقد أن طريق التجارة القديم قد ربط بين ثلاث قارات.",
        highlight: "is thought to have connected",
      },
    ],
    arabicInterferenceTip: {
      en: "In Arabic, 'يُعتقد أنه سافر' uses a 'that' clause even when mentioning the person first, tempting learners to write 'He is believed that he traveled'. In English, once you put the person as the subject, you MUST switch to an infinitive: 'He is believed to have traveled'.",
      ar: "في العربية نستخدم «أنَّ» دائماً (يُعتقد أنه سافر)، مما يدفع المتعلم للقول He is believed that he traveled. في الإنجليزية إذا بدأت بالشخص وجب التحول إلى المصدر: He is believed to have traveled.",
    },
    commonMistake: {
      wrong: "The painting is believed that it was stolen in 1995, and the vault should have locked.",
      right: "The painting is believed to have been stolen in 1995, and the vault should have been locked.",
      why: {
        en: "Personal reporting passive requires a perfect passive infinitive ('to have been stolen') rather than 'that', and past modal passive needs 'been' before V3 ('should have been locked').",
        ar: "صيغة التقرير الشخصي مع حدث ماضٍ مجهول تأخذ to have been stolen بدون that، والمبني للمجهول الماضي مع should يحتاج إلى been قبل التصريف الثالث.",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the formal rule: 'Passport numbers ___ verified before boarding passes ___.'",
        options: [
          "must / issue",
          "must be / are issued",
          "must been / issued",
          "must being / are issuing",
        ],
        correctIndex: 1,
        explanation: {
          en: "Present/general Modal Passive is 'must be + V3' ('must be verified'), paired with Present Simple Passive ('are issued').",
          ar: "المبني للمجهول مع must هو must be + V3، ويتكامل هنا مع المضارع البسيط المجهول are issued.",
        },
      },
      {
        prompt: "Rewrite using personal reporting passive: 'Experts think that the temple collapsed in the fifth century.'",
        options: [
          "The temple is thought that it collapsed in the fifth century.",
          "The temple is thought to collapse in the fifth century.",
          "The temple is thought to have collapsed in the fifth century.",
          "The temple is thinking to have collapsed in the fifth century.",
        ],
        correctIndex: 2,
        explanation: {
          en: "Because the collapse happened in the past (before the present thinking), use the perfect infinitive: 'is thought to have collapsed'.",
          ar: "لأن الانهيار حدث في الماضي قبل الاعتقاد الحاضر، نستخدم المصدر التام: is thought to have collapsed.",
        },
      },
      {
        prompt: "Complete the past modal passive: 'The leak was visible for weeks; it ___ repaired much earlier.'",
        options: [
          "should be",
          "should have repaired",
          "should have been",
          "must have being",
        ],
        correctIndex: 2,
        explanation: {
          en: "Past criticism in the passive voice requires 'should have been + V3' ('should have been repaired').",
          ar: "اللوم على أمر لم يُنفّذ في الماضي بصيغة المبني للمجهول يأخذ should have been + V3.",
        },
      },
    ],
  },
  {
    id: "causative-structures-have-get-make-let-help",
    order: 27,
    moduleId: "passive-causative",
    level: "B2",
    title: {
      en: "Causative Structures (have / get something done, make / let / help)",
      ar: "تراكيب السببية (have / get something done وmake / let / help)",
    },
    overview: {
      en: "Causative structures express that you arrange for someone else to perform a service for you ('have/get + object + V3'), experience an unwanted event ('had his phone stolen'), or cause, allow, persuade, or assist someone to do an action ('make, let, help, have, get').",
      ar: "تُستخدم تراكيب السببية للتعبير عن أنك تكلّف شخصاً آخر بأداء خدمة لك (have/get + الشيء + V3)، أو تعرضت لحادث غير مرغوب فيه (had his phone stolen)، أو تدفع شخصاً أو تسمح له أو تقنعه أو تساعده على القيام بفعل (make / let / help / have / get).",
    },
    formula:
      "Passive Causative: S + have / get + Thing + V3  •  Active Causative: make/let/have + Person + V1  |  get + Person + to V1  |  help + Person + (to) V1",
    forms: {
      affirmative: "We are having the roof inspected tomorrow, and the manager let us leave early.",
      negative: "I didn't get my car washed today, and the teacher didn't make us memorize the dates.",
      question: "Where did you have your suit tailored, and how did you get them to agree so quickly?",
    },
    rules: [
      {
        en: "Use 'have/get + object + V3' when you arrange/pay for a professional service ('She had her eyes tested', 'I need to get my laptop repaired'). Conjugating 'have/get' changes the tense, while the final verb ALWAYS stays V3.",
        ar: "نستخدم have/get + الشيء + التصريف الثالث عندما يقدّم لك مختص خدمة (I had my hair cut / I got my car fixed)، ويتغير الزمن بتصريف have أو get فقط.",
      },
      {
        en: "You can also use 'have/get + object + V3' for unpleasant experiences that happened to someone ('He had his wallet stolen on the bus'; 'She got her arm injured during practice').",
        ar: "تُستخدم have/get + الشيء + V3 أيضاً للتعبير عن حدث سيئ وقع للشخص دون إرادته (سُرقت محفظته: He had his wallet stolen).",
      },
      {
        en: "Active causative infinitive rules: 'make' (force), 'let' (allow), and 'have' (instruct/assign) take Person + BARE V1 ('She had the technician check the router'; 'They made him apologize'). By contrast, 'get' (persuade) takes Person + TO-V1 ('I got my brother to drive me'). 'Help' accepts EITHER bare V1 or to-V1.",
        ar: "في السببية المعلومة: الأفعال make وlet وhave يتبعها الشخص + المصدر المجرد بدون to، بينما get (بمعنى يقنع) يتبعها الشخص + to + المصدر، وhelp يقبل الوجهين.",
      },
      {
        en: "CRITICAL PASSIVE EXCEPTION: When 'make' itself becomes passive, 'to' RETURNS before the verb: Active 'They made him wait' → Passive 'He was made TO wait'. Also never use 'let' in passive ('was let go' is idiomatic only; normally use 'be allowed to').",
        ar: "استثناء مهم: عند بناء الفعل make للمجهول تعود كلمة to قبل الفعل (He was made to wait). ومع let نستخدم be allowed to في المبني للمجهول.",
      },
    ],
    examples: [
      {
        en: "Before moving in, we had the entire apartment painted and got the locks replaced.",
        ar: "قبل الانتقال للسكن، قمنا بطلاء الشقة بالكامل وتبديل الأقفال (عبر مختصين).",
        highlight: "had the entire apartment painted and got the locks replaced",
      },
      {
        en: "The director had her assistant reschedule the press conference for Thursday.",
        ar: "طلبت المديرة من مساعدتها إعادة جدولة المؤتمر الصحفي ليوم الخميس.",
        highlight: "had her assistant reschedule",
      },
      {
        en: "It took twenty minutes, but we finally got the stubborn printer to connect to Wi-Fi.",
        ar: "استغرق الأمر عشرين دقيقة، لكننا نجحنا أخيراً في جعل الطابعة العنيدة تتصل بشبكة الواي فاي.",
        highlight: "got the stubborn printer to connect",
      },
      {
        en: "The strict coach made the team run extra laps, yet he let them rest before the match.",
        ar: "أجبر المدرب الصارم الفريق على الركض لدورات إضافية، لكنه سمح لهم بالراحة قبل المباراة.",
        highlight: "made the team run extra laps, yet he let them rest",
      },
    ],
    arabicInterferenceTip: {
      en: "In Arabic, people say 'قصصت شعري' ('I cut my hair') or 'أصلحت سيارتي' ('I fixed my car') even when a barber or mechanic did it. In English, 'I cut my hair' literally suggests you held the scissors yourself! Use 'I had/got my hair cut' whenever someone else performed the service.",
      ar: "في العربية نقول «قصصت شعري» أو «أصلحت سيارتي» حتى لو قام الحلاق أو الميكانيكي بذلك. أما في الإنجليزية فقول I cut my hair يوحي أنك قصصته بنفسك! استخدم دائماً I had/got my hair cut عندما يقوم شخص آخر بالخدمة.",
    },
    commonMistake: {
      wrong: "I made him to sign the receipt, and yesterday I had repaired my glasses at the optician.",
      right: "I made him sign the receipt, and yesterday I had my glasses repaired at the optician.",
      why: {
        en: "Active 'make' takes a bare infinitive ('sign', no 'to'), and passive causative puts the OBJECT between 'had' and V3 ('had my glasses repaired', NOT 'had repaired my glasses' which is Past Perfect!).",
        ar: "الفعل make في المعلوم يتبعه المصدر دون to (sign)، وفي السببية المجهولة يوضع المفعول به بين had والتصريف الثالث (had my glasses repaired) لأن had repaired تعني ماضياً تاماً.",
      },
    },
    quickCheck: [
      {
        prompt: "Which sentence means a mechanic changed the oil in Fatima's car?",
        options: [
          "Fatima had changed the oil in her car.",
          "Fatima had the oil in her car changed.",
          "Fatima had her car to change the oil.",
          "Fatima got changing the oil in her car.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Passive causative places the object between 'had' and V3: 'had [the oil in her car] changed'. ('Had changed' is Past Perfect meaning Fatima did it herself.)",
          ar: "تضع السببية المجهولة الشيء بين had والتصريف الثالث: had the oil in her car changed، بينما had changed تعني أنها غيرته بنفسها.",
        },
      },
      {
        prompt: "Complete the sentence: 'The security officer made every visitor ___ their ID and wouldn't let anyone ___ the lab unescorted.'",
        options: [
          "to show / to enter",
          "show / enter",
          "showing / entering",
          "show / to enter",
        ],
        correctIndex: 1,
        explanation: {
          en: "Both active 'make' and 'let' take Person + bare infinitive without 'to' ('show', 'enter').",
          ar: "كل من make وlet في المبني للمعلوم يتبعهما الشخص ثم المصدر المجرد دون to (show وenter).",
        },
      },
      {
        prompt: "Choose the grammatically correct pair:",
        options: [
          "She got the plumber fixing the sink, and he was made pay a fine.",
          "She got the plumber to fix the sink, and he was made to pay a fine.",
          "She had the plumber to fix the sink, and he was made pay a fine.",
          "She got the plumber fix the sink, and he was made to pay a fine.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Active 'get + person' requires 'to + V1' ('got the plumber to fix'), and passive 'be made' also requires 'to + V1' ('was made to pay').",
          ar: "الصيغة get + الشخص تتطلب to + المصدر (to fix)، كما أن make عند بنائها للمجهول تستعيد to + المصدر (was made to pay).",
        },
      },
    ],
  },
];
