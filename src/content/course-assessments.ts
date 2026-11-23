import type { Bilingual, Lesson, LessonCourse } from "./lesson-types";
import { courseLessons } from "./lessons";

export type AssessmentFocus = "grammar" | "reading" | "vocabulary" | "error-spotting";

export interface AssessmentQuestion {
  id: string;
  prompt: string;
  options: [string, string, string, string];
  correct: number;
  focus: AssessmentFocus;
  explanation: Bilingual;
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

function buildCefrPostTest(course: LessonCourse): AssessmentQuestion[] {
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

  // Post-Lesson Test (10 MCQs): 3 Grammar + 3 Error-Spotting + 2 Reading + 2 Vocabulary
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

  return post.slice(0, 10);
}

/** Curated 10-MCQ Post-Lesson Test sets for IELTS, Kids, and Adults paths. */
const CURATED_POST_TESTS: Partial<Record<LessonCourse, AssessmentQuestion[]>> = {
  ielts: [
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
      prompt: "Choose the accurate passive sentence for an IELTS Academic Task 1 process diagram.",
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
      prompt: "Error awareness: Which sentence maintains strict parallelism for Band 7+ cohesion?",
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

  kids: [
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

  adults: [
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
      prompt: "In a formal legal contract, should you fill the clauses with casual spoken idioms?",
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
};

const POST_TEST_CACHE = new Map<LessonCourse, AssessmentQuestion[]>();

function rotateAssessmentList(questions: AssessmentQuestion[]): AssessmentQuestion[] {
  return questions.map((q) => {
    const rotated = deterministicRotate(q.options, q.correct, q.id);
    return { ...q, options: rotated.options, correct: rotated.correct };
  });
}

export function getPostTestQuestions(course: LessonCourse): AssessmentQuestion[] {
  const cached = POST_TEST_CACHE.get(course);
  if (cached) return cached;

  const curated = CURATED_POST_TESTS[course];
  const built = curated ? rotateAssessmentList(curated) : buildCefrPostTest(course);
  POST_TEST_CACHE.set(course, built);
  return built;
}
