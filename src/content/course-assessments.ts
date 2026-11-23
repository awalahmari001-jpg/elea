import type { Bilingual, Lesson, LessonCourse } from "./lesson-types";
import { courseLessons } from "./lessons";
import type { AssessmentKind } from "@/lib/learner-storage";

export type AssessmentFocus = "grammar" | "reading" | "vocabulary" | "error-spotting";

export interface AssessmentQuestion {
  id: string;
  prompt: string;
  options: [string, string, string, string];
  correct: number;
  focus: AssessmentFocus;
  explanation: Bilingual;
}

export interface CourseAssessmentSet {
  course: LessonCourse;
  summative: AssessmentQuestion[];
  post: AssessmentQuestion[];
}

function deterministicRotate(
  items: [string, string, string, string],
  correctIdx: number,
  seed: string,
): { options: [string, string, string, string]; correct: number } {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const shift = hash % 4;
  const rotated: [string, string, string, string] = [
    items[(0 + shift) % 4] ?? items[0],
    items[(1 + shift) % 4] ?? items[1],
    items[(2 + shift) % 4] ?? items[2],
    items[(3 + shift) % 4] ?? items[3],
  ];
  const newCorrect = (correctIdx - shift + 4) % 4;
  return { options: rotated, correct: newCorrect };
}

function toFourOptions(
  rawOptions: string[],
  correctIndex: number,
  fallbackExtras: string[],
): { options: [string, string, string, string]; correct: number } | null {
  const correctValue = rawOptions[correctIndex];
  if (!correctValue) return null;
  const seen = new Set<string>();
  const collected: string[] = [];
  for (const opt of [...rawOptions, ...fallbackExtras]) {
    const clean = opt.trim();
    if (clean && !seen.has(clean.toLowerCase())) {
      seen.add(clean.toLowerCase());
      collected.push(clean);
    }
    if (collected.length === 4) break;
  }
  if (collected.length < 4) return null;
  const idx = collected.findIndex((o) => o.toLowerCase() === correctValue.toLowerCase());
  if (idx < 0) return null;
  return {
    options: [collected[0]!, collected[1]!, collected[2]!, collected[3]!],
    correct: idx,
  };
}

function buildErrorSpottingQuestions(lessons: Lesson[], prefix: string): AssessmentQuestion[] {
  const out: AssessmentQuestion[] = [];
  for (const lesson of lessons) {
    const guide = lesson.detailedGuide;
    if (!guide) continue;
    guide.commonMistakes.forEach((m, idx) => {
      const altWrongA =
        guide.commonMistakes[(idx + 1) % guide.commonMistakes.length]?.wrong ??
        "None of these sentences follow English structure.";
      const altWrongB =
        lesson.skill === "grammar"
          ? `Both "${m.wrong}" and dropping the verb are equally standard.`
          : "Skip checking context and guess from a single repeated word.";
      const raw: [string, string, string, string] = [
        m.right,
        m.wrong,
        altWrongA !== m.wrong && altWrongA !== m.right
          ? altWrongA
          : "Use literal word-for-word translation without adjusting English syntax.",
        altWrongB,
      ];
      if (new Set(raw.map((s) => s.toLowerCase())).size < 4) return;
      const rotated = deterministicRotate(raw, 0, `${lesson.id}-err-${idx}`);
      out.push({
        id: `${prefix}-${lesson.id}-err-${idx}`,
        prompt:
          lesson.skill === "grammar"
            ? `Error awareness (${lesson.title.en}): Which option applies the rule accurately?`
            : `Reading awareness (${lesson.title.en}): Which strategy avoids a common reading trap?`,
        options: rotated.options,
        correct: rotated.correct,
        focus: "error-spotting",
        explanation: {
          en: `${m.why.en} Correct form: "${m.right}" (avoid: "${m.wrong}").`,
          ar: `${m.why.ar} الصيغة الصحيحة: "${m.right}".`,
        },
      });
    });
  }
  return out;
}

function buildVocabQuestions(lessons: Lesson[], prefix: string): AssessmentQuestion[] {
  const allVocab = lessons.flatMap((l) => (l.vocab ?? []).map((v) => ({ lesson: l, item: v })));
  const out: AssessmentQuestion[] = [];
  const usedWords = new Set<string>();

  for (let i = 0; i < allVocab.length; i++) {
    const entry = allVocab[i];
    if (!entry) continue;
    const { item, lesson } = entry;
    if (usedWords.has(item.word.toLowerCase())) continue;
    usedWords.add(item.word.toLowerCase());

    const otherMeanings = allVocab
      .filter((other) => other.item.word.toLowerCase() !== item.word.toLowerCase())
      .map((other) => other.item.meaningEn);

    const packed = toFourOptions([item.meaningEn, ...otherMeanings], 0, [
      "to cancel an appointment suddenly",
      "a type of handwritten receipt",
      "something completely unrelated to the topic",
    ]);
    if (!packed) continue;
    const rotated = deterministicRotate(
      packed.options,
      packed.correct,
      `${lesson.id}-v-${item.word}`,
    );
    out.push({
      id: `${prefix}-${lesson.id}-vocab-${i}`,
      prompt: `Vocabulary awareness: What does "${item.word}" mean in "${item.example}"?`,
      options: rotated.options,
      correct: rotated.correct,
      focus: "vocabulary",
      explanation: {
        en: `"${item.word}" means "${item.meaningEn}"${item.synonym ? ` (synonym: ${item.synonym})` : ""}.`,
        ar: `كلمة ${item.word} تعني «${item.meaningAr}».`,
      },
    });
  }
  return out;
}

function extractLessonMcqs(
  lessons: Lesson[],
  focus: AssessmentFocus,
  prefix: string,
  allowedFormats: Set<string>,
): AssessmentQuestion[] {
  const out: AssessmentQuestion[] = [];
  for (const lesson of lessons) {
    lesson.questions.forEach((q, idx) => {
      const fmt = q.format ?? "multiple-choice";
      if (!allowedFormats.has(fmt)) return;
      const packed = toFourOptions(q.options, q.correct, [
        "None of the choices above",
        "Both A and B",
        "Not applicable in English",
      ]);
      if (!packed) return;
      const rotated = deterministicRotate(packed.options, packed.correct, `${lesson.id}-q-${idx}`);
      out.push({
        id: `${prefix}-${lesson.id}-q-${idx}`,
        prompt: q.prompt,
        options: rotated.options,
        correct: rotated.correct,
        focus:
          q.kind === "vocabulary" || q.kind === "synonym" || q.kind === "antonym"
            ? "vocabulary"
            : focus,
        explanation: q.explanation,
      });
    });
  }
  return out;
}

function takeUnique(
  pool: AssessmentQuestion[],
  count: number,
  usedPrompts: Set<string>,
): AssessmentQuestion[] {
  const picked: AssessmentQuestion[] = [];
  for (const q of pool) {
    const key = q.prompt.trim().toLowerCase();
    if (usedPrompts.has(key)) continue;
    usedPrompts.add(key);
    picked.push(q);
    if (picked.length === count) break;
  }
  return picked;
}

function buildCefrAssessments(course: LessonCourse): CourseAssessmentSet {
  const lessons = courseLessons(course);
  const grammarLessons = lessons.filter((l) => l.skill === "grammar");
  const readingLessons = lessons.filter((l) => l.skill === "reading");

  const grammarMcqs = extractLessonMcqs(
    grammarLessons,
    "grammar",
    `${course}-gr`,
    new Set(["multiple-choice", "pick-right-word"]),
  );
  const readingMcqs = extractLessonMcqs(
    readingLessons,
    "reading",
    `${course}-rd`,
    new Set(["multiple-choice", "pick-right-word"]),
  );
  const errorMcqs = buildErrorSpottingQuestions(
    [...grammarLessons, ...readingLessons],
    `${course}-er`,
  );
  const vocabMcqs = buildVocabQuestions([...grammarLessons, ...readingLessons], `${course}-vc`);

  const usedPrompts = new Set<string>();

  // Summative Test (10 MCQs): 4 Grammar + 2 Error-Spotting + 2 Reading + 2 Vocabulary
  const summative: AssessmentQuestion[] = [
    ...takeUnique(grammarMcqs, 4, usedPrompts),
    ...takeUnique(errorMcqs, 2, usedPrompts),
    ...takeUnique(
      readingMcqs.filter((q) => q.focus === "reading"),
      2,
      usedPrompts,
    ),
    ...takeUnique(vocabMcqs, 2, usedPrompts),
  ];

  // Top up to exactly 10 if any bucket ran short
  if (summative.length < 10) {
    summative.push(
      ...takeUnique(
        [...grammarMcqs, ...readingMcqs, ...errorMcqs, ...vocabMcqs],
        10 - summative.length,
        usedPrompts,
      ),
    );
  }

  // Post-Test (10 brand-new MCQs, zero overlap with Summative): 3 Grammar + 3 Error-Spotting + 2 Reading + 2 Vocabulary
  const post: AssessmentQuestion[] = [
    ...takeUnique(grammarMcqs, 3, usedPrompts),
    ...takeUnique(errorMcqs, 3, usedPrompts),
    ...takeUnique(
      readingMcqs.filter((q) => q.focus === "reading"),
      2,
      usedPrompts,
    ),
    ...takeUnique(vocabMcqs, 2, usedPrompts),
  ];

  if (post.length < 10) {
    post.push(
      ...takeUnique(
        [...grammarMcqs, ...readingMcqs, ...errorMcqs, ...vocabMcqs],
        10 - post.length,
        usedPrompts,
      ),
    );
  }

  return {
    course,
    summative: summative.slice(0, 10),
    post: post.slice(0, 10),
  };
}

/** Curated 10-MCQ Summative + 10-MCQ Post-Test sets for IELTS, Kids, and Adults paths. */
const CURATED_PATH_ASSESSMENTS: Partial<Record<LessonCourse, CourseAssessmentSet>> = {
  ielts: {
    course: "ielts",
    summative: [
      {
        id: "ielts-sum-1",
        prompt: "In IELTS Academic Reading, when should you choose 'Not Given'?",
        options: [
          "When the passage neither confirms nor contradicts the claim",
          "When you personally disagree with the statement",
          "When the passage proves the statement is wrong",
          "When a keyword is paraphrased with a synonym",
        ],
        correct: 0,
        focus: "reading",
        explanation: {
          en: "'Not Given' means there is no evidence in the text either supporting or refuting the statement.",
          ar: "تعني Not Given عدم وجود دليل في النص يؤيد الادعاء أو ينفيه.",
        },
      },
      {
        id: "ielts-sum-2",
        prompt: "What is the best strategy for Matching Headings in IELTS Reading?",
        options: [
          "Match the heading to the paragraph's central idea, not one repeated word",
          "Pick the heading containing the longest academic word",
          "Choose the first heading that shares any noun with line 1",
          "Skip reading the concluding sentence of each paragraph",
        ],
        correct: 0,
        focus: "reading",
        explanation: {
          en: "Examiners plant repeated words as distractors; headings summarize the paragraph's overall purpose.",
          ar: "يضع واضعو الاختبار كلمات مكررة كمشتتات، بينما يلخص العنوان الفكرة الرئيسية للفقرة كاملة.",
        },
      },
      {
        id: "ielts-sum-3",
        prompt:
          "In General Training notices, which word usually introduces a crucial exception to a rule?",
        options: ["unless", "furthermore", "similarly", "originally"],
        correct: 0,
        focus: "vocabulary",
        explanation: {
          en: "'Unless' signals a mandatory condition or exception (e.g., 'unless activated').",
          ar: "تقدّم unless شرطًا أو استثناءً حاسمًا في اللوائح والإعلانات.",
        },
      },
      {
        id: "ielts-sum-4",
        prompt:
          "Passage says: 'Urban trees partially reduce summer heat.' Statement says: 'Urban trees eliminate all need for air conditioning.' This statement is:",
        options: ["False", "True", "Not Given", "Unanswerable"],
        correct: 0,
        focus: "reading",
        explanation: {
          en: "'Partially reduce' directly contradicts 'eliminate all need', making the statement False.",
          ar: "كلمة partially reduce تناقض مباشرة عبارة eliminate all need، فتكون الإجابة False.",
        },
      },
      {
        id: "ielts-sum-5",
        prompt: "Which phrase in a workplace policy means 'free of charge'?",
        options: ["complimentary", "mandatory", "provisional", "refundable"],
        correct: 0,
        focus: "vocabulary",
        explanation: {
          en: "'Complimentary' is a standard formal paraphrase for 'free of charge'.",
          ar: "كلمة complimentary مرادف رسمي شائع لعبارة مجاني (free of charge).",
        },
      },
      {
        id: "ielts-sum-6",
        prompt: "Which Band 7+ sentence hedges a research finding accurately without overclaiming?",
        options: [
          "The pilot data suggests that spaced review tends to boost retention.",
          "The pilot data proves forever that every learner must pass.",
          "The pilot data always forces everyone to remember everything.",
          "The pilot data guarantee 100% perfection in all cases.",
        ],
        correct: 0,
        focus: "grammar",
        explanation: {
          en: "Academic writing calibrates claims using 'suggests' and 'tends to' rather than extreme absolutes.",
          ar: "تضبط الكتابة الأكاديمية درجة اليقين بـ suggests وtends to بدل التعميمات المطلقة.",
        },
      },
      {
        id: "ielts-sum-7",
        prompt: "Error awareness: Which sentence uses 'Despite' accurately?",
        options: [
          "Despite tight funding, the clinic expanded evening hours.",
          "Despite of tight funding, the clinic expanded evening hours.",
          "Despite funding was tight, the clinic expanded evening hours.",
          "Despite it had tight funding, the clinic expanded evening hours.",
        ],
        correct: 0,
        focus: "error-spotting",
        explanation: {
          en: "'Despite' never takes 'of' and is followed directly by a noun phrase ('tight funding').",
          ar: "لا تأخذ Despite حرف الجر of ويتبعها اسم مباشرة دون جملة فعلية.",
        },
      },
      {
        id: "ielts-sum-8",
        prompt:
          "In IELTS Listening & Reading, when a speaker says 'We used to meet in the library, but we moved to Room 12', 'used to' signals:",
        options: [
          "A distractor / outdated information replaced by the current answer",
          "The confirmed new meeting venue",
          "An optional future excursion",
          "A speaker who forgot the room number",
        ],
        correct: 0,
        focus: "reading",
        explanation: {
          en: "'Used to' indicates a past arrangement that has now changed—Room 12 is the current answer.",
          ar: "تشير used to إلى ترتيب قديم تغيّر، وبالتالي فالمكان الحالي الصحيح هو Room 12.",
        },
      },
      {
        id: "ielts-sum-9",
        prompt: "Error awareness: Choose the grammatically accurate IELTS Task 2 sentence.",
        options: [
          "Not only did public transit cut emissions, but it also eased congestion.",
          "Not only public transit cut emissions, but it also eased congestion.",
          "Not only did public transit cuts emissions, but it also eased congestion.",
          "Not only was public transit cut emissions, but it also eased congestion.",
        ],
        correct: 0,
        focus: "error-spotting",
        explanation: {
          en: "Fronted 'Not only' requires auxiliary inversion ('did + subject + base verb').",
          ar: "تقديم Not only يُوجب قلب الفعل المساعد: did + الفاعل + الفعل الأساسي.",
        },
      },
      {
        id: "ielts-sum-10",
        prompt:
          "What is the minimum word count required for IELTS Writing Task 1 and Task 2 respectively?",
        options: [
          "150 words for Task 1 and 250 words for Task 2",
          "100 words for Task 1 and 150 words for Task 2",
          "200 words for Task 1 and 400 words for Task 2",
          "250 words for Task 1 and 150 words for Task 2",
        ],
        correct: 0,
        focus: "grammar",
        explanation: {
          en: "IELTS Writing requires at least 150 words for Task 1 and at least 250 words for Task 2.",
          ar: "يتطلب اختبار الآيلتس ١٥٠ كلمة على الأقل للمهمة الأولى و٢٥٠ كلمة على الأقل للمهمة الثانية.",
        },
      },
    ],
    post: [
      {
        id: "ielts-post-1",
        prompt:
          "A notice states: 'Submit refund claims within 7 days of purchase, excluding digital downloads.' Can a buyer claim a refund on an e-book bought 2 days ago?",
        options: [
          "No, because digital downloads are explicitly excluded",
          "Yes, because 2 days is within the 7-day limit",
          "Not Given, because prices are not listed",
          "Yes, if they bring a printed receipt",
        ],
        correct: 0,
        focus: "reading",
        explanation: {
          en: "Always read past the main timeframe to check exclusion words like 'excluding'.",
          ar: "اقرأ دائمًا ما بعد المدة الزمنية للانتباه لكلمات الاستثناء مثل excluding.",
        },
      },
      {
        id: "ielts-post-2",
        prompt: "Which verb-noun collocation is most natural for Band 7+ academic writing?",
        options: [
          "conduct extensive research",
          "do a big research",
          "make a heavy research",
          "perform an ample researches",
        ],
        correct: 0,
        focus: "vocabulary",
        explanation: {
          en: "'Research' is uncountable and collocates naturally with 'conduct'.",
          ar: "كلمة research غير معدودة وتتلازم أكاديميًا مع conduct.",
        },
      },
      {
        id: "ielts-post-3",
        prompt: "Error awareness: Which relative clause avoids an extra shadow pronoun?",
        options: [
          "The policy that the council approved yesterday takes effect in June.",
          "The policy that the council approved it yesterday takes effect in June.",
          "The policy, that the council approved, takes effect in June.",
          "The policy which approved it the council takes effect in June.",
        ],
        correct: 0,
        focus: "error-spotting",
        explanation: {
          en: "Never repeat 'it' when 'that/which' already stands for the object noun.",
          ar: "لا تكرّر الضمير it لأن ضمير الوصل that/which ينوب عنه.",
        },
      },
      {
        id: "ielts-post-4",
        prompt: "In a passage, 'prior approval is required' is paraphrased in a question as:",
        options: [
          "You must obtain permission in advance",
          "Approval is optional after arrival",
          "Managers rarely review requests",
          "No documentation is needed",
        ],
        correct: 0,
        focus: "vocabulary",
        explanation: {
          en: "'Prior' = in advance; 'approval' = permission; 'required' = must.",
          ar: "كلمة prior تعني مسبقًا، وapproval تعني موافقة، وrequired تعني إلزامي.",
        },
      },
      {
        id: "ielts-post-5",
        prompt: "Error awareness: Which comparison uses 'those of' accurately?",
        options: [
          "Solar output figures in 2026 far exceed those of 2018.",
          "Solar output figures in 2026 far exceed that of 2018.",
          "Solar output figures in 2026 far exceed it of 2018.",
          "Solar output figures in 2026 far exceed this of 2018.",
        ],
        correct: 0,
        focus: "error-spotting",
        explanation: {
          en: "Plural 'figures' requires the plural substitution 'those of'.",
          ar: "الاسم الجمع figures يحتاج أداة الاستبدال الجمع those of.",
        },
      },
      {
        id: "ielts-post-6",
        prompt:
          "Why do strong IELTS readers scan qualifying words like 'primarily', 'rarely', and 'only'?",
        options: [
          "Because changing scope or frequency often turns a True claim into False",
          "Because they can always be deleted without affecting meaning",
          "Because they appear exclusively in Not Given items",
          "Because they indicate spelling errors in the passage",
        ],
        correct: 0,
        focus: "reading",
        explanation: {
          en: "Qualifiers control exact scope; swapping 'some' for 'all' or 'only' flips truth value.",
          ar: "كلمات التحديد والتكرار تغير نطاق الجملة وقد تقلبها من صحيحة إلى خاطئة.",
        },
      },
      {
        id: "ielts-post-7",
        prompt:
          "Choose the accurate passive sentence for an IELTS Academic Task 1 process diagram.",
        options: [
          "Once harvested, the beans are washed and sorted by size.",
          "Once harvested, the beans washed and sorted by size.",
          "Once harvested, the beans are wash and sort by size.",
          "Once harvesting, the beans is washed and sorted by size.",
        ],
        correct: 0,
        focus: "grammar",
        explanation: {
          en: "Process descriptions use Present Simple Passive: plural 'beans' + 'are' + V3 ('washed and sorted').",
          ar: "وصف المراحل يستخدم المبني للمجهول في المضارع البسيط: are + التصريف الثالث.",
        },
      },
      {
        id: "ielts-post-8",
        prompt:
          "Which option is the closest synonym for 'mitigate' in an environmental reading text?",
        options: [
          "reduce the severity of",
          "accelerate rapidly",
          "ignore completely",
          "measure inaccurately",
        ],
        correct: 0,
        focus: "vocabulary",
        explanation: {
          en: "'Mitigate' means to make something less severe or harmful (e.g., mitigate urban heat).",
          ar: "كلمة mitigate تعني التخفيف من حدة مشكلة أو أثر سلبي.",
        },
      },
      {
        id: "ielts-post-9",
        prompt:
          "Error awareness: Which sentence maintains strict parallelism for Band 7+ cohesion?",
        options: [
          "Effective cities invest in shaded walkways, reliable transit, and renewable energy.",
          "Effective cities invest in shaded walkways, reliably transit, and to renew energy.",
          "Effective cities invest in shading walkways, reliable transit, and energy renewable is.",
          "Effective cities invest in to shade walkways, transit reliable, and renewing energy.",
        ],
        correct: 0,
        focus: "error-spotting",
        explanation: {
          en: "All three coordinated items share the identical Adjective + Noun phrase structure.",
          ar: "العناصر الثلاثة تحافظ على توازي نحوي متطابق (صفة + اسم).",
        },
      },
      {
        id: "ielts-post-10",
        prompt:
          "When a reading question asks for the writer's overall stance in an editorial, where should you look first?",
        options: [
          "The thesis, concessive pivots ('yet', 'nonetheless'), and conclusion",
          "Only the middle footnote numbers",
          "The longest proper noun in paragraph 2",
          "A single quoted opponent's sentence in isolation",
        ],
        correct: 0,
        focus: "reading",
        explanation: {
          en: "An author's true stance emerges clearly after concessive pivots and in the thesis/conclusion.",
          ar: "يتضح موقف الكاتب الحقيقي في الأطروحة وما بعد أدوات الاستدراك (yet/nonetheless) وفي الخاتمة.",
        },
      },
    ],
  },

  kids: {
    course: "kids",
    summative: [
      {
        id: "kids-sum-1",
        prompt: "How many vowels (A, E, I, O, U) are in the English alphabet?",
        options: ["5", "3", "10", "26"],
        correct: 0,
        focus: "reading",
        explanation: {
          en: "There are 26 letters in total and 5 vowels: A, E, I, O, U.",
          ar: "يوجد ٢٦ حرفًا إجمالًا ومنها ٥ حروف متحركة: A, E, I, O, U.",
        },
      },
      {
        id: "kids-sum-2",
        prompt: "Choose the right sentence with 'has got':",
        options: [
          "Sara has got a white cat.",
          "Sara have got a white cat.",
          "Sara got has a white cat.",
          "Sara is have got a white cat.",
        ],
        correct: 0,
        focus: "grammar",
        explanation: {
          en: "With 'he' and 'she' (like Sara), we always use 'has got'.",
          ar: "مع المفرد he/she (مثل سارة) نستخدم has got دائمًا.",
        },
      },
      {
        id: "kids-sum-3",
        prompt: "Error awareness: Which sentence puts the colour in the right English place?",
        options: [
          "I have a red ball.",
          "I have a ball red.",
          "I have red a ball.",
          "Ball red I have.",
        ],
        correct: 0,
        focus: "error-spotting",
        explanation: {
          en: "In English, the colour word goes BEFORE the noun: 'a red ball'.",
          ar: "في الإنجليزية يأتي اللون قبل الاسم: a red ball.",
        },
      },
      {
        id: "kids-sum-4",
        prompt: "Maya ___ breakfast at seven o'clock every morning.",
        options: ["eats", "eat", "eating", "to eat"],
        correct: 0,
        focus: "grammar",
        explanation: {
          en: "With 'Maya' (she) in daily habits, add '-s' to the verb: 'eats'.",
          ar: "مع المفرد الغائب Maya في العادات اليومية نضيف s للفعل: eats.",
        },
      },
      {
        id: "kids-sum-5",
        prompt: "Which word shows the LAST step in a school-day story?",
        options: ["Finally", "First", "Yesterday", "Blue"],
        correct: 0,
        focus: "reading",
        explanation: {
          en: "'Finally' marks the last step in a sequence (First → Next → Then → Finally).",
          ar: "تدل كلمة Finally على الخطوة الأخيرة في الترتيب.",
        },
      },
      {
        id: "kids-sum-6",
        prompt: "Last Saturday, we ___ to the beach with our parents.",
        options: ["went", "goed", "go", "going"],
        correct: 0,
        focus: "grammar",
        explanation: {
          en: "'Go' is an irregular verb—its past form is 'went'!",
          ar: "الفعل go شاذ وماضيه الصحيح هو went!",
        },
      },
      {
        id: "kids-sum-7",
        prompt: "Error awareness: Which negative daily-habit sentence is right?",
        options: [
          "Omar does not like cold milk.",
          "Omar does not likes cold milk.",
          "Omar don't likes cold milk.",
          "Omar not like cold milk.",
        ],
        correct: 0,
        focus: "error-spotting",
        explanation: {
          en: "'Does' already has the '-s', so keep 'like' in its simple base form!",
          ar: "تحمل does حرف s لذا يبقى الفعل like في صورته الأساسية!",
        },
      },
      {
        id: "kids-sum-8",
        prompt: "Your mother's mother is your ___.",
        options: ["grandmother", "cousin", "aunt", "sister"],
        correct: 0,
        focus: "vocabulary",
        explanation: {
          en: "Your mother's mother (or father's mother) is your grandmother.",
          ar: "والدة أمك هي جدتك (grandmother).",
        },
      },
      {
        id: "kids-sum-9",
        prompt: "Which preposition goes before a clock time like 'eight o'clock'?",
        options: ["at", "on", "in", "under"],
        correct: 0,
        focus: "grammar",
        explanation: {
          en: "Always use 'at' with clock times: 'at eight o'clock'.",
          ar: "نستخدم at دائمًا قبل الساعة المحددة: at eight o'clock.",
        },
      },
      {
        id: "kids-sum-10",
        prompt: "In a story about yesterday, what is the past form of 'swim'?",
        options: ["swam", "swimmed", "swims", "swimming"],
        correct: 0,
        focus: "vocabulary",
        explanation: {
          en: "'Swim' is irregular: 'Last Saturday we swam in the sea.'",
          ar: "الفعل swim شاذ وماضيه swam.",
        },
      },
    ],
    post: [
      {
        id: "kids-post-1",
        prompt: "Choose the right question to ask a friend about pets:",
        options: [
          "Have you got a pet?",
          "You have got a pet?",
          "Has you got a pet?",
          "Got have you a pet?",
        ],
        correct: 0,
        focus: "grammar",
        explanation: {
          en: "Put 'Have' before 'you' to ask a question: 'Have you got a pet?'",
          ar: "قدّم Have قبل you لتكوين السؤال الصحيح: Have you got a pet?",
        },
      },
      {
        id: "kids-post-2",
        prompt: "Error awareness: Which sentence describes the sun properly?",
        options: [
          "The sun is yellow.",
          "The sun yellow.",
          "The sun are yellow.",
          "Yellow is sun the.",
        ],
        correct: 0,
        focus: "error-spotting",
        explanation: {
          en: "English needs 'is' between a singular thing ('The sun') and its colour ('yellow').",
          ar: "تحتاج الإنجليزية إلى is بين المفرد واللون: The sun is yellow.",
        },
      },
      {
        id: "kids-post-3",
        prompt: "My little brother ___ his teeth every night before sleep.",
        options: ["brushes", "brush", "brushing", "brushed now"],
        correct: 0,
        focus: "grammar",
        explanation: {
          en: "Verbs ending in '-sh' add '-es' with 'he' or 'she': 'brushes'.",
          ar: "الأفعال المنتهية بـ sh تأخذ es مع المفرد الغائب: brushes.",
        },
      },
      {
        id: "kids-post-4",
        prompt:
          "Read the clue: 'First I eat breakfast. Next I ride the bus. Then I read in class.' What happens SECOND?",
        options: ["Riding the bus", "Eating breakfast", "Reading in class", "Going to sleep"],
        correct: 0,
        focus: "reading",
        explanation: {
          en: "'Next' introduces the second step right after 'First'.",
          ar: "تدل كلمة Next على الخطوة الثانية بعد First مباشرة.",
        },
      },
      {
        id: "kids-post-5",
        prompt: "Error awareness: Which past-time story sentence is correct?",
        options: [
          "Yesterday we played football in the park.",
          "Yesterday we play football in the park.",
          "Yesterday we playing football in the park.",
          "Yesterday we plays football in the park.",
        ],
        correct: 0,
        focus: "error-spotting",
        explanation: {
          en: "'Yesterday' marks the past, so regular verb 'play' adds '-ed': 'played'.",
          ar: "تدل yesterday على الماضي، فنضيف -ed للفعل المنتظم: played.",
        },
      },
      {
        id: "kids-post-6",
        prompt: "Which word is a colour?",
        options: ["purple", "pencil", "brother", "Monday"],
        correct: 0,
        focus: "vocabulary",
        explanation: {
          en: "'Purple' is a colour word; pencil is an object, brother is family, and Monday is a day.",
          ar: "كلمة purple لون، أما البقية فهي أشياء وأيام.",
        },
      },
      {
        id: "kids-post-7",
        prompt: "___ Maya play with her cat after school?",
        options: ["Does", "Do", "Is", "Are"],
        correct: 0,
        focus: "grammar",
        explanation: {
          en: "Use 'Does' with 'he' or 'she' (Maya) + base verb ('play').",
          ar: "نستخدم Does مع المفرد الغائب Maya متبوعة بالفعل الأساسي play.",
        },
      },
      {
        id: "kids-post-8",
        prompt:
          "When a story question starts with 'Where', what clue should you look for in the text?",
        options: ["A place", "A clock time", "A person's age", "A favourite colour"],
        correct: 0,
        focus: "reading",
        explanation: {
          en: "'Where' always asks about a place or location!",
          ar: "تسأل كلمة Where دائمًا عن المكان!",
        },
      },
      {
        id: "kids-post-9",
        prompt: "Error awareness: Which sentence about two pets is right?",
        options: [
          "We have got two happy birds.",
          "We has got two happy birds.",
          "We have got two bird happy.",
          "We is got two happy birds.",
        ],
        correct: 0,
        focus: "error-spotting",
        explanation: {
          en: "'We' uses 'have got', and the adjective 'happy' comes before the plural noun 'birds'.",
          ar: "تأخذ We صيغة have got وتأتي الصفة happy قبل الاسم الجمع birds.",
        },
      },
      {
        id: "kids-post-10",
        prompt: "Which word means 'the father of your mother or father'?",
        options: ["grandfather", "brother", "teacher", "classmate"],
        correct: 0,
        focus: "vocabulary",
        explanation: {
          en: "Your parent's father is your grandfather.",
          ar: "والد أمك أو أبيك هو جدك (grandfather).",
        },
      },
    ],
  },

  adults: {
    course: "adults",
    summative: [
      {
        id: "adults-sum-1",
        prompt: "Which question follows the correct English QuASM order?",
        options: [
          "Where do you work in Riyadh?",
          "Where you work in Riyadh?",
          "Where are you work in Riyadh?",
          "Where does you work in Riyadh?",
        ],
        correct: 0,
        focus: "grammar",
        explanation: {
          en: "Action questions follow Question word + Auxiliary ('do') + Subject ('you') + Main verb ('work').",
          ar: "ترتيب السؤال الصحيح: أداة السؤال + do + الفاعل you + الفعل الأساسي work.",
        },
      },
      {
        id: "adults-sum-2",
        prompt: "Error awareness: Which question is correct with an adjective ('ready')?",
        options: [
          "Are you ready for the client call?",
          "Do you ready for the client call?",
          "Does you ready for the client call?",
          "Did you ready for the client call?",
        ],
        correct: 0,
        focus: "error-spotting",
        explanation: {
          en: "'Ready' is an adjective (no action verb), so use 'Are', not 'Do'.",
          ar: "كلمة ready صفة وليست فعلًا، لذا نستخدم Are وليس Do.",
        },
      },
      {
        id: "adults-sum-3",
        prompt: "What does the workplace idiom 'Let's make sure we're on the same page' mean?",
        options: [
          "Let's confirm everyone shares the same understanding",
          "Let's print only one page for the meeting",
          "Let's cancel the project immediately",
          "Let's read a book silently together",
        ],
        correct: 0,
        focus: "vocabulary",
        explanation: {
          en: "'On the same page' means aligned with the same shared plan or understanding.",
          ar: "يعني التعبير on the same page أن الجميع على توافق وفهم مشترك واحد.",
        },
      },
      {
        id: "adults-sum-4",
        prompt: "___ the downstairs café open before eight o'clock?",
        options: ["Does", "Do", "Is", "Are"],
        correct: 0,
        focus: "grammar",
        explanation: {
          en: "'Open' is an action verb and 'the café' is singular (it), so use 'Does'.",
          ar: "الفعل open فعل حركة والفاعل مفرد (it) لذلك نستخدم Does.",
        },
      },
      {
        id: "adults-sum-5",
        prompt: "In a workplace discussion, 'break the ice' means:",
        options: [
          "Ease tension and start a friendly conversation",
          "Argue firmly about a contract price",
          "Leave the office early on Friday",
          "Turn up the air conditioning",
        ],
        correct: 0,
        focus: "reading",
        explanation: {
          en: "'Break the ice' means making people feel comfortable at the start of a meeting.",
          ar: "يعني break the ice كسر الجمود وبدء حديث ودي مريح.",
        },
      },
      {
        id: "adults-sum-6",
        prompt: "Error awareness: Choose the correct past-tense workplace question.",
        options: [
          "When did you start working here?",
          "When did you started working here?",
          "When you started working here?",
          "When were you start working here?",
        ],
        correct: 0,
        focus: "error-spotting",
        explanation: {
          en: "After 'did', always use the base form of the main verb ('start', not 'started').",
          ar: "بعد did يعود الفعل الرئيسي دائمًا إلى صورته الأساسية start دون -ed.",
        },
      },
      {
        id: "adults-sum-7",
        prompt: "Which reply naturally keeps friendly small talk going after 'Nice to meet you'?",
        options: [
          "Nice to meet you too! How long have you worked here?",
          "Yes, I am working.",
          "Goodbye, see you yesterday.",
          "No, thank you very much.",
        ],
        correct: 0,
        focus: "reading",
        explanation: {
          en: "Mirroring the greeting and adding a light follow-up question keeps conversation natural.",
          ar: "رد التحية وإضافة سؤال لطيف يبقي المحادثة الودية متواصلة.",
        },
      },
      {
        id: "adults-sum-8",
        prompt:
          "If a colleague says 'We finished all the slides—let's call it a day', what are they suggesting?",
        options: [
          "Stop working for today and finish up",
          "Schedule a phone call tomorrow morning",
          "Restart the presentation from slide 1",
          "Work overnight until sunrise",
        ],
        correct: 0,
        focus: "vocabulary",
        explanation: {
          en: "'Call it a day' means to finish work for the day after accomplishing enough.",
          ar: "يعني call it a day الاكتفاء بما أُنجز وإنهاء العمل لليوم.",
        },
      },
      {
        id: "adults-sum-9",
        prompt: "Choose the most polite way to ask for directions in an unfamiliar city:",
        options: [
          "Excuse me, how do I get to the central station?",
          "Tell me the station right now.",
          "Where station is?",
          "Do you going to the station?",
        ],
        correct: 0,
        focus: "grammar",
        explanation: {
          en: "Opening with 'Excuse me' + 'how do I get to...?' is natural, polite, and clear.",
          ar: "البدء بـ Excuse me ثم how do I get to...? هو الأسلوب المهذب والطبيعي.",
        },
      },
      {
        id: "adults-sum-10",
        prompt:
          "When reading a workplace message containing an unfamiliar idiom, what should you do first?",
        options: [
          "Read the surrounding situation to infer its figurative meaning",
          "Translate every single word literally into Arabic",
          "Swap out one noun inside the idiom for a synonym",
          "Ignore the entire paragraph",
        ],
        correct: 0,
        focus: "reading",
        explanation: {
          en: "Idioms carry figurative meaning that becomes clear from the practical context around them.",
          ar: "تحمل التعابير الاصطلاحية معنى مجازيًا يتضح من سياق الموقف المحيط بها.",
        },
      },
    ],
    post: [
      {
        id: "adults-post-1",
        prompt: "Error awareness: Which fixed idiom is phrased accurately?",
        options: [
          "Let's check the plan so we are all on the same page.",
          "Let's check the plan so we are all in the same paper.",
          "Let's check the plan so we are all at the same book.",
          "Let's check the plan so we are all on a same sheet.",
        ],
        correct: 0,
        focus: "error-spotting",
        explanation: {
          en: "Fixed idioms cannot change prepositions or nouns: always 'on the same page'.",
          ar: "لا تتبدل كلمات التعبير الاصطلاحي الثابت: دائمًا on the same page.",
        },
      },
      {
        id: "adults-post-2",
        prompt: "___ she work on Fridays, or is the office closed?",
        options: ["Does", "Do", "Is", "Was"],
        correct: 0,
        focus: "grammar",
        explanation: {
          en: "Present Simple action question with 'she' uses 'Does + she + base verb (work)'.",
          ar: "سؤال المضارع البسيط مع she والفعل work يستخدم Does.",
        },
      },
      {
        id: "adults-post-3",
        prompt: "What does 'touch base' mean in a work email ('Let's touch base on Thursday')?",
        options: [
          "Connect briefly to share an update",
          "Move the office furniture downstairs",
          "Sign a ten-year lease",
          "Delete an old spreadsheet",
        ],
        correct: 0,
        focus: "vocabulary",
        explanation: {
          en: "'Touch base' means having a quick check-in or brief update with someone.",
          ar: "يعني touch base التواصل السريع لتبادل المستجدات.",
        },
      },
      {
        id: "adults-post-4",
        prompt: "Error awareness: Choose the accurate question about a colleague's schedule.",
        options: [
          "Are you free for a quick coffee at three?",
          "Do you free for a quick coffee at three?",
          "Does you free for a quick coffee at three?",
          "Did you free for a quick coffee at three?",
        ],
        correct: 0,
        focus: "error-spotting",
        explanation: {
          en: "'Free' is an adjective, so invert 'Are' before 'you' without 'do'.",
          ar: "كلمة free صفة فتستخدم Are قبل you دون do.",
        },
      },
      {
        id: "adults-post-5",
        prompt: "Which question correctly asks about a past meeting?",
        options: [
          "Did the supplier send the revised quote yesterday?",
          "Did the supplier sent the revised quote yesterday?",
          "Does the supplier sent the revised quote yesterday?",
          "Was the supplier send the revised quote yesterday?",
        ],
        correct: 0,
        focus: "grammar",
        explanation: {
          en: "Past Simple action questions use 'Did + subject + base verb (send)'.",
          ar: "سؤال الماضي البسيط للأفعال يتبع: Did + الفاعل + الفعل الأساسي send.",
        },
      },
      {
        id: "adults-post-6",
        prompt:
          "In a formal legal contract, should you fill the clauses with casual spoken idioms?",
        options: [
          "No—use direct, literal, unambiguous language in formal contracts",
          "Yes—casual idioms make legal clauses clearer",
          "Yes—replace all dates with idioms",
          "Only if every word is translated literally",
        ],
        correct: 0,
        focus: "reading",
        explanation: {
          en: "Idioms suit meetings and everyday emails, whereas legal and regulatory documents require literal precision.",
          ar: "تناسب التعابير الاصطلاحية الاجتماعات والرسائل، بينما تتطلب العقود الرسمية لغة مباشرة دقيقة.",
        },
      },
      {
        id: "adults-post-7",
        prompt: "Which short phrase politely returns a question in everyday adult conversation?",
        options: ["How about you?", "What it is?", "Me am too?", "You also what?"],
        correct: 0,
        focus: "vocabulary",
        explanation: {
          en: "'How about you?' or 'And you?' smoothly hands the turn back to your partner.",
          ar: "تُعيد عبارة How about you? أو And you? السؤال للطرف الآخر بلباقة.",
        },
      },
      {
        id: "adults-post-8",
        prompt: "Error awareness: Identify the grammatically correct Wh- question.",
        options: [
          "What time does the airport shuttle leave?",
          "What time the airport shuttle leaves?",
          "What time does the airport shuttle leaves?",
          "What time is the airport shuttle leave?",
        ],
        correct: 0,
        focus: "error-spotting",
        explanation: {
          en: "Use 'does' + base verb 'leave' (drop '-s' from 'leaves' once 'does' is present).",
          ar: "استخدم does مع الفعل الأساسي leave دون s.",
        },
      },
      {
        id: "adults-post-9",
        prompt: "In a shop, 'Can I try this on?' asks whether you can:",
        options: [
          "Wear an item of clothing briefly to check the fit",
          "Return a broken laptop without a receipt",
          "Pay with foreign currency",
          "Ask for directions to the nearest bank",
        ],
        correct: 0,
        focus: "reading",
        explanation: {
          en: "'Try on' is the standard phrasal verb for testing how clothes or shoes fit.",
          ar: "الفعل المركب try on يعني قياس الملابس أو الأحذية للتأكد من المقاس.",
        },
      },
      {
        id: "adults-post-10",
        prompt: "Choose the correct question using 'Why' + Past Simple:",
        options: [
          "Why did the delivery arrive late?",
          "Why the delivery arrived late?",
          "Why did the delivery arrived late?",
          "Why was the delivery arrive late?",
        ],
        correct: 0,
        focus: "grammar",
        explanation: {
          en: "QuASM order: Why (Q) + did (A) + the delivery (S) + arrive (base M).",
          ar: "الترتيب الصحيح: Why + did + الفاعل + الفعل الأساسي arrive.",
        },
      },
    ],
  },
};

const ASSESSMENT_CACHE = new Map<LessonCourse, CourseAssessmentSet>();

function rotateAssessmentList(questions: AssessmentQuestion[]): AssessmentQuestion[] {
  return questions.map((q) => {
    const rotated = deterministicRotate(q.options, q.correct, q.id);
    return { ...q, options: rotated.options, correct: rotated.correct };
  });
}

export function getCourseAssessments(course: LessonCourse): CourseAssessmentSet {
  const cached = ASSESSMENT_CACHE.get(course);
  if (cached) return cached;

  const curated = CURATED_PATH_ASSESSMENTS[course];
  const built: CourseAssessmentSet = curated
    ? {
        course: curated.course,
        summative: rotateAssessmentList(curated.summative),
        post: rotateAssessmentList(curated.post),
      }
    : buildCefrAssessments(course);
  ASSESSMENT_CACHE.set(course, built);
  return built;
}

export function getCourseAssessmentQuestions(
  course: LessonCourse,
  kind: AssessmentKind,
): AssessmentQuestion[] {
  const set = getCourseAssessments(course);
  return kind === "summative" ? set.summative : set.post;
}
