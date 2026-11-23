import type { Bilingual, DetailedRuleGuide, Lesson, LessonCourse } from "./lesson-types";
import {
  makeFitSentence,
  makePickWord,
  makeRearrange,
  type LessonEnrichmentEntry,
} from "./enrichment-builders";

/** Bespoke reading guides & 4-format interactive drills for IELTS, Kids, and Adults reading lessons. */
const SPECIAL_READING_ENRICHMENTS: Record<string, LessonEnrichmentEntry> = {
  "ielts-reading-academic": {
    guide: {
      summary: {
        en: "Academic Reading tests whether you can separate explicit passage evidence (True) from direct contradiction (False) and absent claims (Not Given), while matching paragraph headings to main ideas rather than isolated keywords.",
        ar: "تختبر القراءة الأكاديمية قدرتك على التمييز بين الدليل الصريح في النص (True) والتناقض المباشر (False) والمعلومة غير المذكورة (Not Given)، مع مطابقة العناوين للفكرة الرئيسية لا الكلمات المفردة.",
      },
      whenToUse: [
        {
          en: "Read the topic sentence and concluding sentence of each paragraph first to map the writer's argument.",
          ar: "اقرأ الجملة الأولى والأخيرة في كل فقرة أولًا لرسم خريطة الحجة.",
        },
        {
          en: "Watch qualifying words ('some', 'primarily', 'only', 'all')—they often flip True into False.",
          ar: "انتبه لكلمات التحديد والتقليل (some, primarily, only, all) لأنها غالبًا تقلب الإجابة بين صح وخطأ.",
        },
        {
          en: "Choose 'Not Given' when the passage neither confirms nor contradicts the claim—never use outside background knowledge.",
          ar: "اختر Not Given عندما لا يؤكد النص الادعاء ولا ينفيه، ولا تعتمد على معلوماتك الخارجية.",
        },
      ],
      formulas: [
        {
          label: { en: "TRUE", ar: "صحيح (TRUE)" },
          pattern: "Statement paraphrases explicit passage evidence",
          example: "Passage: 'reduces peak heat' → Statement: 'lowers extreme temperatures'",
          arabic: "الجملة تعيد صياغة دليل صريح في النص.",
        },
        {
          label: { en: "FALSE", ar: "خاطئ (FALSE)" },
          pattern: "Passage directly contradicts the statement",
          example: "Passage: 'partial solution' vs Statement: 'replaces all cooling'",
          arabic: "النص يناقض الادعاء بشكل مباشر.",
        },
        {
          label: { en: "NOT GIVEN", ar: "غير مذكور (NOT GIVEN)" },
          pattern: "No proof for OR against the claim in the text",
          example: "Statement mentions cost, but passage never discusses price.",
          arabic: "لا يوجد دليل مؤيد أو معارض في النص.",
        },
      ],
      commonMistakes: [
        {
          wrong: "Marking 'False' just because a detail isn't mentioned.",
          right:
            "Mark 'Not Given' when the text is silent; mark 'False' only when you can underline a direct contradiction.",
          why: {
            en: "Confusing False with Not Given is the #1 Band 6→7 barrier in IELTS Reading.",
            ar: "الخلط بين False وNot Given هو أكبر عائق في قراءة الآيلتس.",
          },
        },
        {
          wrong: "Matching a heading because one word appears in the paragraph.",
          right: "Match the heading to the paragraph's central purpose across all its sentences.",
          why: {
            en: "Examiners plant repeated words as distractors in wrong paragraphs.",
            ar: "يضع واضعو الاختبار كلمات مكررة كمشتتات في فقرات خاطئة.",
          },
        },
      ],
      memoryTip: {
        en: "TRUE = Proven in text. FALSE = Proven WRONG in text. NOT GIVEN = Missing from text!",
        ar: "TRUE = مثبت في النص | FALSE = منقوض في النص | NOT GIVEN = غائب عن النص!",
      },
    },
    pickWord: makePickWord({
      kind: "vocabulary",
      sentence:
        "In IELTS Academic Reading, choose Not Given when the passage provides no ___ for or against the claim.",
      options: ["evidence", "heading", "grammar", "accent"],
      correct: 0,
      explanation: {
        en: "Not Given means the passage contains no evidence confirming or contradicting the statement.",
        ar: "تعني Not Given أن النص لا يقدم دليلًا (evidence) يؤيد الادعاء أو ينفيه.",
      },
    }),
    rearrange: makeRearrange({
      kind: "comprehension",
      orderedWords: ["Match", "each", "heading", "to", "the", "main", "idea."],
      explanation: {
        en: "Headings summarise the central idea of a whole paragraph, not a single stray detail.",
        ar: "العنوان يلخّص الفكرة الرئيسية للفقرة كاملة وليس تفصيلًا عابرًا.",
      },
    }),
    fitSentence: makeFitSentence({
      kind: "comprehension",
      prompt:
        "Write a fitting academic sentence explaining why readers should check 'evidence' before deciding 'true' or 'false'.",
      cueWords: ["evidence"],
      requiredTerms: ["evidence"],
      modelSentence: "Strong readers always check the passage evidence before choosing an answer.",
      sentenceHint: {
        en: "Pattern: Readers should check the passage evidence before...",
        ar: "النمط: Readers should check the passage evidence before...",
      },
      explanation: {
        en: "Ground every IELTS Reading decision in explicit textual evidence rather than assumptions.",
        ar: "ابنِ كل قرار في القراءة الأكاديمية على الدليل النصي الصريح.",
      },
    }),
  },

  "ielts-reading-general": {
    guide: {
      summary: {
        en: "General Training Reading tests fast, accurate scanning of real-world workplace policies, community notices, and service conditions—especially exceptions, deadlines, and exact limits.",
        ar: "تختبر قراءة التدريب العام سرعة المسح الدقيق للوائح العمل والإعلانات وشروط الخدمات—وخاصة الاستثناءات والمواعيد النهائية والحدود الدقيقة.",
      },
      whenToUse: [
        {
          en: "Scan for anchor tokens first: numbers, dates, bold headings, 'except', 'unless', and 'must'.",
          ar: "امسح النص بحثًا عن الأرقام والتواريخ وكلمات الاستثناء مثل except وunless.",
        },
        {
          en: "Read the FULL rule sentence including any footnote or condition before answering.",
          ar: "اقرأ جملة القاعدة كاملة مع أي استثناء أو شرط قبل اختيار الإجابة.",
        },
        {
          en: "Match paraphrased obligations ('required to' = 'must'; 'free of charge' = 'no fee').",
          ar: "اربط المعاني المكافئة مثل required to = must وfree of charge = بلا رسوم.",
        },
      ],
      formulas: [
        {
          label: { en: "Exception Markers", ar: "علامات الاستثناء" },
          pattern: "except / unless / provided that / excluding",
          example: "Refunds apply unless the pass has been activated.",
          arabic: "تُطبق الاستردادات ما لم تُفعَّل البطاقة.",
        },
        {
          label: { en: "Paraphrased Rules", ar: "إعادة صياغة اللوائح" },
          pattern: "prior approval = permission in advance | complimentary = free",
          example: "Guests receive complimentary locker access.",
          arabic: "يحصل الضيوف على خزانة مجانية.",
        },
        {
          label: { en: "Deadline Precision", ar: "دقة المواعيد" },
          pattern: "no later than / at least 48 hours before / within 7 days",
          example: "Submit leave requests at least 48 hours in advance.",
          arabic: "قدّم طلبات الإجازة قبل ٤٨ ساعة على الأقل.",
        },
      ],
      commonMistakes: [
        {
          wrong: "Stopping after the first matching keyword in a notice.",
          right: "Read the next clause for 'however', 'unless', or fee exceptions.",
          why: {
            en: "Workplace notices frequently add a qualifying exception right after the main rule.",
            ar: "غالبًا تضيف الإعلانات واللوائح استثناءً مهمًا مباشرة بعد القاعدة الرئيسية.",
          },
        },
        {
          wrong: "Assuming everyday habits override what the notice says.",
          right: "Follow only the exact terms printed in the policy.",
          why: {
            en: "Test questions verify exact compliance with the printed policy.",
            ar: "أسئلة الاختبار تقيس الالتزام الحرفي بما ورد في اللائحة.",
          },
        },
      ],
      memoryTip: {
        en: "Scan fast for numbers & headings, then slow down at 'unless', 'except', and 'within'!",
        ar: "امسح سريعًا للأرقام والعناوين، ثم تمهّل عند unless وexcept وwithin!",
      },
    },
    pickWord: makePickWord({
      kind: "vocabulary",
      sentence: "Check every policy notice carefully for exceptions introduced by ___ or 'except'.",
      options: ["unless", "always", "never", "very"],
      correct: 0,
      explanation: {
        en: "'Unless' introduces a critical condition or exception in official notices.",
        ar: "تقدّم unless شرطًا أو استثناءً مهمًا في اللوائح والإعلانات.",
      },
    }),
    rearrange: makeRearrange({
      kind: "comprehension",
      orderedWords: ["Scan", "the", "notice", "for", "dates", "and", "exceptions."],
      explanation: {
        en: "Scanning notices starts with locating key dates, limits, and exceptions.",
        ar: "يبدأ مسح الإعلانات بتحديد التواريخ والحدود والاستثناءات.",
      },
    }),
    fitSentence: makeFitSentence({
      kind: "comprehension",
      prompt:
        "Write a fitting policy sentence using 'unless' or 'deadline' to state a clear condition.",
      cueWords: ["unless / deadline"],
      requiredTerms: ["unless|deadline"],
      modelSentence: "Requests are accepted until the Friday deadline unless places fill earlier.",
      sentenceHint: {
        en: "Pattern: [Rule] + before the deadline / unless [exception].",
        ar: "النمط: [القاعدة] + before the deadline أو unless [الاستثناء].",
      },
      explanation: {
        en: "Clear notice statements pair a main rule with an exact deadline or 'unless' condition.",
        ar: "تربط اللوائح الواضحة القاعدة الأساسية بموعد نهائي دقيق أو شرط بـ unless.",
      },
    }),
  },

  "kids-alphabet-colours": {
    guide: {
      summary: {
        en: "English has 26 letters (5 vowels: A, E, I, O, U and 21 consonants), and colour words describe things around us using the easy pattern: 'The + [thing] + is + [colour].'",
        ar: "تتكون الأبجدية الإنجليزية من ٢٦ حرفًا (٥ حروف متحركة: A, E, I, O, U و٢١ حرفًا ساكنًا)، وتصف كلمات الألوان الأشياء حولنا بالنمط السهل: The + [الشيء] + is + [اللون].",
      },
      whenToUse: [
        {
          en: "Use 'The [thing] is [colour]' to describe one object ('The sun is yellow').",
          ar: "استخدم The [الشيء] is [اللون] لوصف شيء واحد.",
        },
        {
          en: "Put the colour BEFORE the noun to name it ('a red ball', 'a blue sky').",
          ar: "ضع اللون قبل الاسم عند وصفه (a red ball أي كرة حمراء).",
        },
        {
          en: "Remember the 5 vowel friends: A, E, I, O, U!",
          ar: "تذكّر الحروف المتحركة الخمسة: A وE وI وO وU!",
        },
      ],
      formulas: [
        {
          label: { en: "Describe a Thing", ar: "وصف شيء" },
          pattern: "The + noun + is + colour",
          example: "The sky is blue.",
          arabic: "السماء زرقاء.",
        },
        {
          label: { en: "Colour + Noun", ar: "لون + اسم" },
          pattern: "a + colour + noun",
          example: "a green apple / a red ball",
          arabic: "تفاحة خضراء / كرة حمراء",
        },
        {
          label: { en: "Ask the Colour", ar: "السؤال عن اللون" },
          pattern: "What colour is the + noun?",
          example: "What colour is the sun?",
          arabic: "ما لون الشمس؟",
        },
      ],
      commonMistakes: [
        {
          wrong: "The ball red.",
          right: "The ball is red.",
          why: {
            en: "Always include 'is' between the thing and its colour!",
            ar: "نحتاج دائمًا إلى is بين الشيء ولونه!",
          },
        },
        {
          wrong: "a ball red",
          right: "a red ball",
          why: {
            en: "In English, the colour goes BEFORE the noun!",
            ar: "في الإنجليزية يأتي اللون قبل الاسم (a red ball)!",
          },
        },
      ],
      memoryTip: {
        en: "Colour FIRST before a noun ('a yellow sun'), or after IS ('The sun is yellow')!",
        ar: "اللون أولًا قبل الاسم (a yellow sun)، أو بعد is (The sun is yellow)!",
      },
    },
    pickWord: makePickWord({
      kind: "vocabulary",
      sentence: "On a sunny morning, the sky is bright ___.",
      options: ["blue", "table", "jump", "seven"],
      correct: 0,
      explanation: {
        en: "'Blue' is the colour word that describes a clear sky.",
        ar: "كلمة blue هي اللون الذي يصف السماء الصافية.",
      },
    }),
    rearrange: makeRearrange({
      kind: "comprehension",
      orderedWords: ["The", "sun", "is", "bright", "yellow."],
      explanation: {
        en: "Put 'The sun' first, then 'is', then the describing colour 'bright yellow'.",
        ar: "نبدأ بـ The sun ثم is ثم اللون bright yellow.",
      },
    }),
    fitSentence: makeFitSentence({
      kind: "vocabulary",
      prompt:
        "Write a fun sentence describing an object using a colour word (red, blue, green, or yellow).",
      cueWords: ["red / blue / green / yellow"],
      requiredTerms: ["red|blue|green|yellow|purple|orange|pink|white|black|brown"],
      modelSentence: "My favourite backpack is bright blue.",
      sentenceHint: {
        en: "Pattern: The [thing] is [colour] OR I have a [colour] [thing].",
        ar: "النمط: The [الشيء] is [اللون] أو I have a [اللون] [الشيء].",
      },
      explanation: {
        en: "Use 'is + colour' or 'colour + noun' in a complete sentence.",
        ar: "استخدم is + اللون أو اللون قبل الاسم في جملة كاملة.",
      },
    }),
  },

  "kids-school-day": {
    guide: {
      summary: {
        en: "When we read about a school day, sequence words (First, Next, Then, Finally) act like road signs showing the exact order of classes, lunch, and playtime!",
        ar: "عندما نقرأ عن اليوم الدراسي، تعمل كلمات الترتيب (First, Next, Then, Finally) مثل لافتات الطريق التي توضّح تسلسل الحصص والغداء واللعب!",
      },
      whenToUse: [
        {
          en: "Use 'First' for what happens at the start, 'Next / Then' for middle steps, and 'Finally' for the end.",
          ar: "استخدم First للبداية، وNext/Then للخطوات الوسطى، وFinally للنهاية.",
        },
        {
          en: "Use 'at + clock time' ('at eight o'clock', 'at twelve').",
          ar: "استخدم at قبل وقت الساعة (at eight o'clock).",
        },
        {
          en: "Look for subject words (maths, reading, art, football) to answer 'what' and 'when' questions fast.",
          ar: "ابحث عن أسماء المواد والأنشطة لتجيب عن أسئلة ماذا ومتى بسرعة.",
        },
      ],
      formulas: [
        {
          label: { en: "Step 1 (Start)", ar: "الخطوة الأولى" },
          pattern: "First, I + verb + at + time",
          example: "First, I read a book at eight.",
          arabic: "أولًا أقرأ كتابًا الساعة الثامنة.",
        },
        {
          label: { en: "Step 2 (Middle)", ar: "الخطوة التالية" },
          pattern: "Then / Next, I + verb",
          example: "Then I play football with my friends.",
          arabic: "ثم ألعب كرة القدم مع أصدقائي.",
        },
        {
          label: { en: "Final Step", ar: "الخطوة الأخيرة" },
          pattern: "Finally, I + verb",
          example: "Finally, I walk home at two.",
          arabic: "أخيرًا أمشي إلى البيت الساعة الثانية.",
        },
      ],
      commonMistakes: [
        {
          wrong: "School starts in eight o'clock.",
          right: "School starts at eight o'clock.",
          why: {
            en: "Always use 'at' with exact clock times!",
            ar: "نستخدم at دائمًا مع الساعات المحددة!",
          },
        },
        {
          wrong: "Finally I wake up, first I go home.",
          right: "First I wake up, and finally I go home.",
          why: {
            en: "'First' belongs at the beginning and 'Finally' at the end.",
            ar: "First للبداية وFinally للنهاية.",
          },
        },
      ],
      memoryTip: {
        en: "Follow the train: FIRST → NEXT → THEN → FINALLY, and always put AT before clock times!",
        ar: "اتبع القطار: First ← Next ← Then ← Finally، وضع at قبل الساعة دائمًا!",
      },
    },
    pickWord: makePickWord({
      kind: "comprehension",
      sentence: "___ I read my English book, and then I play football in the yard.",
      options: ["First", "Never", "Yesterday", "Blue"],
      correct: 0,
      explanation: {
        en: "'First' marks the beginning step before 'then'.",
        ar: "تشير First إلى الخطوة الأولى قبل then.",
      },
    }),
    rearrange: makeRearrange({
      kind: "comprehension",
      orderedWords: ["First", "I", "read,", "then", "I", "play", "football."],
      explanation: {
        en: "Sequence order starts with 'First I read' and moves to 'then I play football'.",
        ar: "يبدأ التسلسل بـ First I read ثم ينتقل إلى then I play football.",
      },
    }),
    fitSentence: makeFitSentence({
      kind: "comprehension",
      prompt: "Write a fun sentence about your school day using 'First' and 'then'.",
      cueWords: ["First", "then"],
      requiredTerms: ["first", "then"],
      modelSentence: "First I study maths, and then I eat lunch.",
      sentenceHint: {
        en: "Pattern: First I [activity 1], and then I [activity 2].",
        ar: "النمط: First I [النشاط ١]، and then I [النشاط ٢].",
      },
      explanation: {
        en: "Connect two daily school activities in order with 'First' and 'then'.",
        ar: "اربط نشاطين مدرسيين بالترتيب باستخدام First وthen.",
      },
    }),
  },

  "kids-story-past": {
    guide: {
      summary: {
        en: "Stories about yesterday or last weekend use Past Simple verbs! Regular verbs add '-ed' (played, walked), while special irregular verbs change shape (go → went, swim → swam, see → saw).",
        ar: "تستخدم قصص الأمس ونهاية الأسبوع الماضي أفعال الماضي البسيط! الأفعال المنتظمة تأخذ -ed (played, walked)، أما الأفعال الشاذة فتتغير صورتها (go ← went وswim ← swam وsee ← saw).",
      },
      whenToUse: [
        {
          en: "Spot story time clues like 'Last Saturday', 'yesterday', or 'once upon a time'.",
          ar: "ابحث عن كلمات الزمن الماضي مثل Last Saturday وyesterday.",
        },
        {
          en: "Regular story verbs add -ed: play → played, visit → visited, laugh → laughed.",
          ar: "الأفعال المنتظمة تأخذ -ed في الماضي.",
        },
        {
          en: "Learn favourite story irregulars: go → went, swim → swam, eat → ate, have → had.",
          ar: "احفظ الأفعال الشاذة الشهيرة في القصص: went وswam وate وhad.",
        },
      ],
      formulas: [
        {
          label: { en: "Regular Story Verb", ar: "فعل قصصي منتظم" },
          pattern: "Subject + verb-ed",
          example: "We played games on the sand.",
          arabic: "لعبنا ألعابًا على الرمل.",
        },
        {
          label: { en: "Irregular Story Verb", ar: "فعل قصصي شاذ" },
          pattern: "go → went | swim → swam | eat → ate",
          example: "We went to the beach and swam.",
          arabic: "ذهبنا إلى الشاطئ وسبحنا.",
        },
        {
          label: { en: "Story Time Opener", ar: "بداية زمنية للقصة" },
          pattern: "Last Saturday / Yesterday, Subject + Past Verb",
          example: "Last Saturday we had a picnic.",
          arabic: "السبت الماضي أقمنا نزهة.",
        },
      ],
      commonMistakes: [
        {
          wrong: "Last Saturday we goed to the beach.",
          right: "Last Saturday we went to the beach.",
          why: {
            en: "'Go' is irregular—its past form is 'went', never 'goed'!",
            ar: "الفعل go شاذ وماضيه went وليس goed!",
          },
        },
        {
          wrong: "We swimmed in the sea.",
          right: "We swam in the sea.",
          why: { en: "'Swim' changes to 'swam' in the past!", ar: "ماضي الفعل swim هو swam!" },
        },
      ],
      memoryTip: {
        en: "Regular friends add -ED ('played'); irregular heroes transform ('went, swam, ate, saw')!",
        ar: "الأفعال المنتظمة تضيف -ed (played)، والأفعال الشاذة تتغير (went, swam, ate, saw)!",
      },
    },
    pickWord: makePickWord({
      kind: "comprehension",
      sentence: "Last Saturday our family ___ to the beach and built a sandcastle.",
      options: ["go", "went", "going", "goes"],
      correct: 1,
      explanation: {
        en: "'Last Saturday' tells us the story is in the past, so 'go' becomes 'went'.",
        ar: "تدل Last Saturday على الماضي، لذا يتحول go إلى went.",
      },
    }),
    rearrange: makeRearrange({
      kind: "comprehension",
      orderedWords: ["Last", "Saturday", "we", "swam", "in", "the", "sea."],
      explanation: {
        en: "Story sentence order: Time ('Last Saturday') + Subject ('we') + Past Verb ('swam') + place.",
        ar: "الترتيب القصصي: الزمن Last Saturday + الفاعل we + الفعل الماضي swam + المكان.",
      },
    }),
    fitSentence: makeFitSentence({
      kind: "comprehension",
      prompt:
        "Write a short past story sentence using 'Last' or 'Yesterday' and a past verb like 'went' or 'played'.",
      cueWords: ["went / played", "Last / Yesterday"],
      requiredTerms: ["went|played|swam|visited|saw|ate", "last|yesterday"],
      modelSentence: "Yesterday I played football with my cousin in the park.",
      sentenceHint: {
        en: "Pattern: Yesterday / Last weekend, I [went/played/visited]...",
        ar: "النمط: Yesterday أو Last weekend، I [went/played/visited]...",
      },
      explanation: {
        en: "Pair a past time clue ('Yesterday / Last Saturday') with a Past Simple verb.",
        ar: "اربط كلمة زمن ماضٍ مع فعل في الماضي البسيط.",
      },
    }),
  },

  "adults-idioms": {
    guide: {
      summary: {
        en: "Workplace and everyday English idioms ('on the same page', 'break the ice', 'call it a day', 'touch base') mean something completely different from their literal words—always read the surrounding context to unlock their figurative meaning.",
        ar: "تحمل التعابير الاصطلاحية في العمل والحياة اليومية (on the same page, break the ice, call it a day) معنى مجازيًا مختلفًا عن الترجمة الحرفية لكلماتها—اقرأ السياق المحيط دائمًا لفهم المقصود.",
      },
      whenToUse: [
        {
          en: "Never translate idioms word-for-word; ask 'What social or workplace action is happening here?'",
          ar: "لا تترجم التعابير الاصطلاحية حرفيًا؛ اسأل: ما الموقف التواصلي الذي يحدث هنا؟",
        },
        {
          en: "Keep every word inside a fixed idiom intact ('on the same page', NOT 'in the same paper').",
          ar: "حافظ على كلمات التعبير الثابتة كما هي دون تغيير.",
        },
        {
          en: "Use idioms naturally in meetings and emails, while keeping legal/formal reports literal and direct.",
          ar: "استخدمها بطبيعية في الاجتماعات والرسائل، وفضّل الأسلوب المباشر في التقارير القانونية.",
        },
      ],
      formulas: [
        {
          label: { en: "Shared Understanding", ar: "الاتفاق والوضوح" },
          pattern: "be on the same page",
          example: "Let's recap so we are all on the same page.",
          arabic: "لنلخّص حتى نكون جميعًا على توافق واحد.",
        },
        {
          label: { en: "Ending Work", ar: "إنهاء العمل لليوم" },
          pattern: "call it a day",
          example: "We finished the slides—let's call it a day.",
          arabic: "أنهينا الشرائح—لنكتفِ بهذا اليوم.",
        },
        {
          label: { en: "Warming Up a Room", ar: "كسر الجمود" },
          pattern: "break the ice",
          example: "A quick question helped break the ice.",
          arabic: "ساعد سؤال سريع في كسر الجمود.",
        },
      ],
      commonMistakes: [
        {
          wrong: "Let's be in the same book about the schedule.",
          right: "Let's be on the same page about the schedule.",
          why: {
            en: "Fixed idioms cannot swap prepositions or nouns ('on the same page').",
            ar: "التعابير الاصطلاحية ثابتة ولا تتبدل كلماتها: on the same page.",
          },
        },
        {
          wrong: "Translating 'break the ice' literally as smashing frozen water.",
          right: "Read context clues: it means easing tension at the start of a meeting.",
          why: {
            en: "Idioms express figurative meaning understood from the situation.",
            ar: "يعبّر التعبير عن معنى مجازي يُفهم من سياق الموقف.",
          },
        },
      ],
      memoryTip: {
        en: "Freeze the whole phrase as ONE vocabulary card—never change a single word inside an idiom!",
        ar: "احفظ التعبير الاصطلاحي ككتلة واحدة ثابتة ولا تغيّر أي كلمة داخله!",
      },
    },
    pickWord: makePickWord({
      kind: "vocabulary",
      sentence: "Before we assign tasks, let's check the timeline so everyone is on the same ___.",
      options: ["page", "chair", "street", "clock"],
      correct: 0,
      explanation: {
        en: "'On the same page' is the fixed idiom meaning 'having the same shared understanding'.",
        ar: "التعبير الثابت هو on the same page بمعنى التوافق والفهم المشترك.",
      },
    }),
    rearrange: makeRearrange({
      kind: "comprehension",
      orderedWords: ["Let's", "make", "sure", "we", "are", "on", "the", "same", "page."],
      explanation: {
        en: "This workplace phrase checks shared alignment before moving ahead.",
        ar: "تُستخدم هذه العبارة المهنية للتأكد من توافق الجميع قبل المتابعة.",
      },
    }),
    fitSentence: makeFitSentence({
      kind: "vocabulary",
      prompt:
        "Write a natural workplace sentence using 'on the same page', 'break the ice', or 'call it a day'.",
      cueWords: ["on the same page / call it a day"],
      requiredTerms: ["on the same page|break the ice|call it a day|touch base"],
      modelSentence: "After six hours of editing, our team decided to call it a day.",
      sentenceHint: {
        en: "Pattern: [Context], let's call it a day / make sure we're on the same page.",
        ar: "النمط: [السياق]، let's call it a day أو make sure we're on the same page.",
      },
      explanation: {
        en: "Place the complete fixed idiom into a realistic workplace or everyday situation.",
        ar: "وظّف التعبير الاصطلاحي كاملًا داخل موقف عملي أو يومي واقعي.",
      },
    }),
  },
};

const READING_LEVEL_NOTES: Record<
  LessonCourse,
  {
    strategy: Bilingual[];
    mistakeA: { wrong: string; right: string; why: Bilingual };
    mistakeB: { wrong: string; right: string; why: Bilingual };
    memoryTip: Bilingual;
  }
> = {
  a1: {
    strategy: [
      {
        en: "Read the title and first line of each paragraph to catch who, where, and when.",
        ar: "اقرأ العنوان والجملة الأولى في كل فقرة لتحديد الأشخاص والمكان والزمان.",
      },
      {
        en: "Match new words to nearby picture clues, numbers, and simple adjectives.",
        ar: "اربط الكلمات الجديدة بالقرائن المجاورة مثل الأرقام والصفات البسيطة.",
      },
      {
        en: "Check synonyms and antonyms inside the original sentence—not in isolation.",
        ar: "تحقّق من المرادف والمضاد داخل الجملة الأصلية في النص لا بمعزل عنها.",
      },
    ],
    mistakeA: {
      wrong: "Stopping completely whenever you see one unfamiliar word.",
      right:
        "Finish the whole sentence first and use the context around the word to guess its meaning.",
      why: {
        en: "At A1, surrounding clues almost always explain the main message.",
        ar: "في مستوى A1 تكفي الكلمات المحيطة غالبًا لفهم المعنى العام.",
      },
    },
    mistakeB: {
      wrong: "Confusing an antonym (opposite) question with a synonym (similar meaning) question.",
      right: "Underline 'synonym' (= same) vs 'antonym' (= opposite) before choosing.",
      why: {
        en: "Reading the question keyword carefully prevents easy avoidable mistakes.",
        ar: "الانتباه لكلمة مرادف أو مضاد في السؤال يمنع الأخطاء السهلة.",
      },
    },
    memoryTip: {
      en: "Read twice: Pass 1 = big picture story; Pass 2 = exact words, times, and vocabulary clues!",
      ar: "اقرأ مرتين: القراءة الأولى للفكرة العامة، والثانية للتفاصيل والأوقات والمفردات!",
    },
  },
  a2: {
    strategy: [
      {
        en: "Scan for signpost words ('however', 'because', 'before', 'while') that link cause, contrast, and time.",
        ar: "ابحث عن كلمات الربط (however, because, before, while) التي تربط السبب والتناقض والزمن.",
      },
      {
        en: "Compare options against the exact paragraph sentence rather than relying on memory.",
        ar: "قارن الخيارات بالجملة الدقيقة في الفقرة بدل الاعتماد على الذاكرة فقط.",
      },
      {
        en: "Notice word families and synonym pairs used across the passage and questions.",
        ar: "لاحظ عائلات الكلمات وأزواج المترادفات المستخدمة بين النص والأسئلة.",
      },
    ],
    mistakeA: {
      wrong: "Picking an answer just because it repeats one word from the text.",
      right:
        "Verify the full meaning—negatives or contrast words ('not', 'but') can reverse a detail.",
      why: {
        en: "Word-spotting without checking meaning falls straight into distractor traps.",
        ar: "الاعتماد على تطابق كلمة واحدة دون فهم المعنى يوقعك في المشتتات.",
      },
    },
    mistakeB: {
      wrong: "Skipping the vocabulary table before answering inference questions.",
      right: "Review key adjectives and verbs first so paraphrases feel familiar.",
      why: {
        en: "Vocabulary clarity unlocks both literal details and implied meaning.",
        ar: "وضوح المفردات يفتح فهم التفاصيل المباشرة والمعنى الضمني معًا.",
      },
    },
    memoryTip: {
      en: "Track 'but / however / because'—they point straight to the answers in A2 reading!",
      ar: "تتبّع كلمات but وhowever وbecause—فهي تقودك مباشرة إلى الإجابات!",
    },
  },
  b1: {
    strategy: [
      {
        en: "Map each paragraph's role: Problem → Explanation → Evidence → Practical takeaway.",
        ar: "حدّد دور كل فقرة: المشكلة ← الشرح ← الدليل ← الخلاصة العملية.",
      },
      {
        en: "Expect questions to paraphrase the passage using synonyms rather than identical words.",
        ar: "توقّع أن تعيد الأسئلة صياغة النص بمرادفات بدل تكرار نفس الكلمات.",
      },
      {
        en: "For inference questions, verify that two clues in the text logically support your conclusion.",
        ar: "في أسئلة الاستنتاج تأكد من وجود قرائن نصية تدعم استنتاجك منطقيًا.",
      },
    ],
    mistakeA: {
      wrong: "Treating an author's example as the main idea of the entire passage.",
      right: "Ask what bigger point all the paragraphs work together to prove.",
      why: {
        en: "Examples illustrate one piece; the main idea unites the whole text.",
        ar: "المثال يوضح جزءًا واحدًا، بينما الفكرة الرئيسية تجمع النص كله.",
      },
    },
    mistakeB: {
      wrong: "Translating complex sentences word by word into Arabic.",
      right: "Find the main Subject + Verb first, then attach the extra clauses around it.",
      why: {
        en: "Spotting the core Subject + Verb makes long B1 sentences clear immediately.",
        ar: "تحديد الفاعل والفعل الرئيسي أولًا يفكّ الجمل الطويلة فورًا.",
      },
    },
    memoryTip: {
      en: "Every paragraph has ONE job—label it in your head, then match paraphrases with evidence!",
      ar: "لكل فقرة وظيفة واحدة—لخّصها في ذهنك ثم طابق إعادة الصياغة بالدليل النصي!",
    },
  },
  b2: {
    strategy: [
      {
        en: "Distinguish empirical evidence and data from opinions, hype, or marketing claims.",
        ar: "ميّز بين الدليل الواقعي والبيانات وبين الآراء والمبالغات.",
      },
      {
        en: "Track concession markers ('although', 'despite', 'whereas') to spot the writer's balanced stance.",
        ar: "تتبّع أدوات الاستدراك (although, despite, whereas) لالتقاط الموقف المتوازن للكاتب.",
      },
      {
        en: "Use context to infer precise shades of meaning for academic verbs and adjectives.",
        ar: "استعن بالسياق لاستنتاج الفروق الدقيقة في معاني الأفعال والصفات الأكاديمية.",
      },
    ],
    mistakeA: {
      wrong: "Confusing correlation ('A happens alongside B') with causation ('A causes B').",
      right: "Check whether the text claims proof of cause or merely an observed link.",
      why: {
        en: "B2 reading carefully tests precision about claims and evidence.",
        ar: "تختبر قراءة B2 الدقة في التمييز بين الارتباط والسببية.",
      },
    },
    mistakeB: {
      wrong:
        "Ignoring hedging words ('largely', 'tends to', 'suggests') when evaluating conclusions.",
      right:
        "Reject answer choices that turn a cautious text claim into an extreme 'always/never' statement.",
      why: {
        en: "Extreme wording in an option usually disqualifies it against a nuanced text.",
        ar: "الصياغة المتطرفة في الخيارات (always/never) غالبًا تخالف النص المتوازن.",
      },
    },
    memoryTip: {
      en: "Watch the degree of certainty: calibrated prose rarely matches extreme 'always/never' options!",
      ar: "راقب درجة اليقين: النصوص المتوازنة نادرًا ما تطابق خيارات التعميم المطلق!",
    },
  },
  c1: {
    strategy: [
      {
        en: "Trace the analytical arc: Thesis → Evidence / Study → Counter-argument / Limitation → Synthesis.",
        ar: "تتبّع المسار التحليلي: الأطروحة ← الدليل ← القيد أو الرأي المقابل ← التركيب.",
      },
      {
        en: "Read for subtle authorial stance embedded in verb choice ('tout', 'underscore', 'hinge on').",
        ar: "انتبه لموقف الكاتب الضمني الكامن في اختيار الأفعال الدقيقة.",
      },
      {
        en: "Map cross-paragraph references ('this shift', 'such constraints', 'the former') accurately.",
        ar: "تتبّع الإحالات بين الفقرات مثل this shift وthe former بدقة.",
      },
    ],
    mistakeA: {
      wrong: "Attributing a quoted critic's opinion to the passage author.",
      right: "Check reporting frames ('proponents argue', 'yet critics note') to separate voices.",
      why: {
        en: "C1 texts weave multiple viewpoints; knowing who believes what is essential.",
        ar: "تدمج نصوص C1 عدة وجهات نظر ويجب الفصل الدقيق بين موقف الكاتب والآخرين.",
      },
    },
    mistakeB: {
      wrong: "Relying on dictionary definitions that ignore domain-specific nuance.",
      right: "Re-read the exact collocation in the paragraph to verify register and precision.",
      why: {
        en: "High-level words shift tone sharply depending on academic or policy context.",
        ar: "تتغير دلالة الكلمات المتقدمة بدقة حسب السياق الأكاديمي أو المهني.",
      },
    },
    memoryTip: {
      en: "Separate VOICES (author vs critic), track LIMITATIONS, and notice stance-loaded verbs!",
      ar: "افصل بين الأصوات (الكاتب مقابل الناقد)، وتتبّع القيود، وراقب الأفعال الحاملة للموقف!",
    },
  },
  c2: {
    strategy: [
      {
        en: "Identify unstated premises, rhetorical framing, and subtle irony beneath polished prose.",
        ar: "اكتشف الافتراضات الضمنية والتأطير البلاغي والتلميح الدقيق خلف الأسلوب المصقول.",
      },
      {
        en: "Evaluate how cohesion devices (ellipsis, fronting, nominalisation) prioritise one claim over another.",
        ar: "قيّم كيف ترتّب أدوات التماسك أولوية الحجج داخل الفقرة.",
      },
      {
        en: "Verify fine lexical distinctions (connotation, register, antonym precision) directly in context.",
        ar: "تحقّق من الفروق المعجمية الدقيقة والإيحاءات الأسلوبية داخل السياق.",
      },
    ],
    mistakeA: {
      wrong:
        "Taking an ironic or concessive opening clause at face value as the writer's final position.",
      right:
        "Always read past the pivot ('yet', 'nonetheless', 'though') to capture the true thesis.",
      why: {
        en: "C2 writers often grant an opposing point elegantly before overturning it.",
        ar: "غالبًا ما يمنح كتّاب C2 الخصم نقطة في البداية قبل نقضها بعد أداة الاستدراك.",
      },
    },
    mistakeB: {
      wrong: "Picking a near-synonym that violates the passage's formal register or nuance.",
      right: "Match both denotation (meaning) AND connotation (tone and precision).",
      why: {
        en: "At C2, subtle differences in scope or tone separate the best answer from close distractors.",
        ar: "في C2 تصنع الفروق الدقيقة في النبرة والدقة الفارق بين الإجابة الصحيحة والمشتتات.",
      },
    },
    memoryTip: {
      en: "Read past every concessive pivot, expose the hidden premise, and honour register precision!",
      ar: "اقرأ ما بعد كل استدراك، واكشف الافتراض الخفي، والتزم بدقة الأسلوب والمستوى!",
    },
  },
  ielts: {
    strategy: [
      {
        en: "Locate passage evidence explicitly before committing to any option.",
        ar: "حدّد الدليل النصي الصريح قبل اختيار الإجابة.",
      },
      {
        en: "Match paraphrases and watch qualifying words carefully.",
        ar: "طابق إعادة الصياغة وراقب كلمات التحديد بدقة.",
      },
    ],
    mistakeA: {
      wrong: "Guessing from personal knowledge instead of the passage.",
      right: "Verify every answer against the printed text.",
      why: {
        en: "IELTS Reading tests comprehension of the text, not outside knowledge.",
        ar: "قراءة الآيلتس تختبر فهم النص لا المعلومات الخارجية.",
      },
    },
    mistakeB: {
      wrong: "Ignoring contrast markers.",
      right: "Always check words like 'however', 'unless', and 'despite'.",
      why: {
        en: "Contrast markers frequently contain the decisive qualification.",
        ar: "أدوات التناقض غالبًا تحمل الشرط الحاسم للإجابة.",
      },
    },
    memoryTip: {
      en: "Underline evidence in the text for every single answer!",
      ar: "ضع خطًا تحت الدليل النصي لكل إجابة!",
    },
  },
  kids: {
    strategy: [
      {
        en: "Read slowly aloud and notice picture words and story order.",
        ar: "اقرأ بهدوء وبصوت مسموع ولاحظ كلمات الوصف وترتيب القصة.",
      },
      {
        en: "Look back at the short story to find the exact answer.",
        ar: "ارجع للقصة القصيرة لتجد الإجابة الدقيقة.",
      },
    ],
    mistakeA: {
      wrong: "Rushing past the question word (Who, What, Where, When).",
      right: "Check the first word of the question so you know what to look for!",
      why: {
        en: "Who = person, Where = place, When = time.",
        ar: "Who للشخص وWhere للمكان وWhen للوقت.",
      },
    },
    mistakeB: {
      wrong: "Guessing without looking back at the story.",
      right: "Point to the matching line in the story!",
      why: {
        en: "The clue is always hiding right in the text.",
        ar: "الدليل موجود دائمًا داخل النص.",
      },
    },
    memoryTip: {
      en: "Be a word detective: find the clue line right inside the story!",
      ar: "كن محقق كلمات: اعثر على السطر الذي يحمل الإجابة داخل القصة!",
    },
  },
  adults: {
    strategy: [
      {
        en: "Read for workplace purpose, tone, and practical takeaway.",
        ar: "اقرأ لالتقاط الغرض المهني والنبرة والخلاصة العملية.",
      },
      {
        en: "Decode idioms and key phrases through their surrounding context.",
        ar: "افهم التعابير الاصطلاحية والعبارات المفتاحية من سياقها.",
      },
    ],
    mistakeA: {
      wrong: "Translating fixed expressions word by word.",
      right: "Interpret the whole phrase inside its real-life situation.",
      why: {
        en: "Natural English relies on whole chunks and idioms.",
        ar: "الإنجليزية الطبيعية تعتمد على العبارات الكاملة والتعابير الاصطلاحية.",
      },
    },
    mistakeB: {
      wrong: "Missing subtle tone clues in workplace texts.",
      right: "Notice polite softeners and contrast signals.",
      why: {
        en: "Tone often carries the real practical priority.",
        ar: "النبرة غالبًا تحمل الأولوية العملية الحقيقية.",
      },
    },
    memoryTip: {
      en: "Focus on chunks, tone, and context—never isolated literal translations!",
      ar: "ركّز على العبارات الكاملة والنبرة والسياق بدل الترجمة الحرفية!",
    },
  },
};

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findMatchedWordInExample(example: string, word: string): string | null {
  const escaped = escapeRegExp(word);
  // Match exact word or simple regular inflection (s, es, ed, d, ing)
  const regex = new RegExp(`\\b(${escaped}(?:s|es|ed|d|ing)?)\\b`, "i");
  const match = example.match(regex);
  if (match?.[1]) return match[1];
  // Try stripping trailing 'e' or 'y' for stem match (e.g., stabilise -> stabilised, consolidate -> consolidated)
  if (word.length > 4 && (word.endsWith("e") || word.endsWith("y"))) {
    const stem = escapeRegExp(word.slice(0, -1));
    const stemRegex = new RegExp(`\\b(${stem}(?:ies|ied|ing|ed|es|s))\\b`, "i");
    const stemMatch = example.match(stemRegex);
    if (stemMatch?.[1]) return stemMatch[1];
  }
  return null;
}

function buildRearrangeTokens(lesson: Lesson): string[] {
  // Prefer a clean 5–9 word sentence from vocab examples, otherwise a clean clause from pronunciation.
  for (const item of lesson.vocab ?? []) {
    const tokens = item.example.trim().split(/\s+/).filter(Boolean);
    if (tokens.length >= 5 && tokens.length <= 9) {
      return tokens;
    }
  }
  const firstClause = (lesson.pronunciation.split(/[,;—–]/)[0] ?? lesson.pronunciation)
    .trim()
    .replace(/\.$/, "");
  const clauseTokens = firstClause.split(/\s+/).filter(Boolean);
  if (clauseTokens.length >= 5 && clauseTokens.length <= 9) {
    const last = clauseTokens[clauseTokens.length - 1] ?? "";
    clauseTokens[clauseTokens.length - 1] = `${last}.`;
    return clauseTokens;
  }
  const pronTokens = lesson.pronunciation.trim().split(/\s+/).filter(Boolean);
  if (pronTokens.length >= 4 && pronTokens.length <= 10) {
    return pronTokens;
  }
  const sliced = pronTokens.slice(0, 7);
  const lastSliced = sliced[sliced.length - 1];
  if (lastSliced && !/[.!?]$/.test(lastSliced)) {
    sliced[sliced.length - 1] = `${lastSliced.replace(/[,;:]$/, "")}.`;
  }
  return sliced;
}

export function getReadingEnrichment(lesson: Lesson): LessonEnrichmentEntry {
  const special = SPECIAL_READING_ENRICHMENTS[lesson.id];
  if (special) return special;

  const levelNotes = READING_LEVEL_NOTES[lesson.course] ?? READING_LEVEL_NOTES.b1;
  const vocab = lesson.vocab ?? [];

  // Pick a vocab item whose word appears cleanly inside its example sentence for pick-right-word.
  let pickItem = vocab[0];
  let matchedToken: string | null = null;
  for (const item of vocab) {
    const found = findMatchedWordInExample(item.example, item.word);
    if (found) {
      pickItem = item;
      matchedToken = found;
      break;
    }
  }

  let pickSentence: string;
  let correctWord: string;
  if (pickItem && matchedToken) {
    pickSentence = pickItem.example.replace(
      new RegExp(`\\b${escapeRegExp(matchedToken)}\\b`),
      "___",
    );
    correctWord = matchedToken;
  } else if (pickItem) {
    pickSentence = `In this reading context, the best word meaning "${pickItem.meaningEn}" is ___.`;
    correctWord = pickItem.word;
  } else {
    pickSentence = "Careful readers always check the passage ___ before choosing an answer.";
    correctWord = "context";
  }

  const distractorPool = [
    ...vocab
      .filter((v) => v.word.toLowerCase() !== (pickItem?.word ?? "").toLowerCase())
      .map((v) => v.word),
    ...(pickItem?.antonym ? [pickItem.antonym] : []),
    "delay",
    "rumour",
    "guess",
    "fragment",
  ];
  const distinctDistractors: string[] = [];
  const seen = new Set([correctWord.toLowerCase()]);
  for (const candidate of distractorPool) {
    const clean = candidate.trim();
    if (clean && !seen.has(clean.toLowerCase())) {
      seen.add(clean.toLowerCase());
      distinctDistractors.push(clean);
    }
    if (distinctDistractors.length === 3) break;
  }

  const pickOptions: [string, string, string, string] = [
    distinctDistractors[0] ?? "delay",
    correctWord,
    distinctDistractors[1] ?? "rumour",
    distinctDistractors[2] ?? "guess",
  ];

  const pickWord = makePickWord({
    kind: "vocabulary",
    sentence: pickSentence,
    options: pickOptions,
    correct: 1,
    explanation: pickItem
      ? {
          en: `'${correctWord}' means "${pickItem.meaningEn}" (synonym: ${pickItem.synonym ?? "similar term"}) and fits the sentence context naturally.`,
          ar: `كلمة ${correctWord} تعني «${pickItem.meaningAr}» وتناسب سياق الجملة بدقة.`,
        }
      : {
          en: `'${correctWord}' completes the reading strategy statement accurately.`,
          ar: `كلمة ${correctWord} تكمل الجملة بدقة حسب السياق.`,
        },
  });

  const rearrangeTokens = buildRearrangeTokens(lesson);
  const rearrange = makeRearrange({
    kind: "comprehension",
    prompt: "Rearrange the words to build a key sentence from this reading lesson.",
    orderedWords: rearrangeTokens,
    explanation: {
      en: `Correct word order: "${rearrangeTokens.join(" ")}" — keeping Subject → Verb → Object/Detail clear preserves the passage's meaning.`,
      ar: `الترتيب الصحيح هو: "${rearrangeTokens.join(" ")}" — اتباع الترتيب الإنجليزي (فاعل ثم فعل ثم تكملة) يحفظ معنى النص بوضوح.`,
    },
  });

  // Choose a distinct vocab item for fit-sentence so the learner practices active production!
  const fitItem = vocab.find((v) => v.word !== pickItem?.word) ?? vocab[0];
  const fitTarget = fitItem?.word ?? "evidence";
  const fitMatched = fitItem ? findMatchedWordInExample(fitItem.example, fitItem.word) : null;
  const requiredTermGroup =
    fitMatched && fitMatched.toLowerCase() !== fitTarget.toLowerCase()
      ? `${fitTarget}|${fitMatched}`
      : fitTarget;

  const fitSentence = makeFitSentence({
    kind: "vocabulary",
    prompt: fitItem
      ? `Make a complete, fitting English sentence using the passage keyword '${fitTarget}' (${fitItem.meaningEn}).`
      : `Make a complete, fitting English sentence summarising one key idea from "${lesson.title.en}".`,
    cueWords: [fitTarget],
    requiredTerms: [requiredTermGroup],
    modelSentence: fitItem?.example ?? lesson.pronunciation,
    sentenceHint: fitItem
      ? {
          en: `Use '${fitTarget}' (${fitItem.meaningEn}) in a clear sentence of at least 4 words.`,
          ar: `استخدم كلمة ${fitTarget} (${fitItem.meaningAr}) في جملة إنجليزية مكتملة من ٤ كلمات على الأقل.`,
        }
      : {
          en: "Write a clear complete sentence reflecting the main takeaway of the text.",
          ar: "اكتب جملة إنجليزية كاملة تعكس الفكرة الأساسية في النص.",
        },
    explanation: fitItem
      ? {
          en: `Great active recall! '${fitTarget}' means "${fitItem.meaningEn}". Model example: "${fitItem.example}"`,
          ar: `تطبيق ممتاز! كلمة ${fitTarget} تعني «${fitItem.meaningAr}». المثال النموذجي: "${fitItem.example}"`,
        }
      : {
          en: `Model summary sentence: "${lesson.pronunciation}"`,
          ar: `الجملة النموذجية: "${lesson.pronunciation}"`,
        },
  });

  const formulaRows = vocab.slice(0, 3).map((item, idx) => ({
    label: {
      en: idx === 0 ? "Key Concept" : idx === 1 ? "Synonym / Context" : "Contrast / Usage",
      ar: idx === 0 ? "مفهوم مفتاحي" : idx === 1 ? "مرادف وسياق" : "تباين واستخدام",
    },
    pattern: `${item.word}${item.synonym ? ` ≈ ${item.synonym}` : ""}${item.antonym ? ` ≠ ${item.antonym}` : ""}`,
    example: item.example,
    arabic: item.meaningAr,
  }));

  const guide: DetailedRuleGuide = {
    summary: {
      en: `${lesson.goal.en} Focus closely on the language structure in this text: ${lesson.taskPlan?.languageFocus.en ?? lesson.teaching[0]?.en ?? ""}`,
      ar: `${lesson.goal.ar} ركّز بدقة على البنية اللغوية في هذا النص: ${lesson.taskPlan?.languageFocus.ar ?? lesson.teaching[0]?.ar ?? ""}`,
    },
    whenToUse: levelNotes.strategy,
    formulas:
      formulaRows.length >= 3
        ? formulaRows
        : [
            {
              label: { en: "Skim First", ar: "التصفّح السريع" },
              pattern: "Title + Topic Sentence → Main Idea",
              example: lesson.pronunciation,
              arabic: "اقرأ العنوان وأول جملة لتحديد الفكرة الرئيسية.",
            },
            {
              label: { en: "Scan Details", ar: "المسح للتفاصيل" },
              pattern: "Keywords + Paraphrases → Exact Evidence",
              example: lesson.example.split("\n")[0]?.slice(0, 95) ?? lesson.pronunciation,
              arabic: "ابحث عن الكلمات المفتاحية ومعانيها المكافئة داخل النص.",
            },
            {
              label: { en: "Verify Context", ar: "التحقق بالسياق" },
              pattern: "Sentence Context → Synonym / Antonym",
              example: lesson.pronunciation,
              arabic: "ارجع للجملة الأصلية للتحقق من المرادف أو المضاد.",
            },
          ],
    commonMistakes: [levelNotes.mistakeA, levelNotes.mistakeB],
    memoryTip: levelNotes.memoryTip,
  };

  return { guide, pickWord, rearrange, fitSentence };
}
