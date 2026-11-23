import type {
  Bilingual,
  Lesson,
  LessonQuestion,
  LessonSkill,
  ListeningPlan,
  TaskPlan,
  VocabItem,
} from "../lesson-types";

export type CefrCourse = "a1" | "a2" | "b1" | "b2" | "c1" | "c2";

const LEVEL_LISTENING_COACHING: Record<
  CefrCourse,
  { encouragement: Bilingual; acoustics: Bilingual; steps: Bilingual[] }
> = {
  a1: {
    encouragement: {
      en: "Welcome to A1 Listening! You do not need to catch every single word. Focus on clear keywords—names, numbers, days, and places—and celebrate each clue you recognise.",
      ar: "مرحبًا بك في استماع A1! لا تحتاج إلى فهم كل كلمة. ركّز على الكلمات المفتاحية الواضحة مثل الأسماء والأرقام والأيام والأماكن، وافتخر بكل معلومة تلتقطها.",
    },
    acoustics: {
      en: "Word boundaries, clear stressed nouns, slow numbers (-teen vs -ty), and rising voice at the end of Yes/No questions.",
      ar: "حدود الكلمات، الأسماء المنبورة بوضوح، الأرقام المتشابهة (مثل 15 و50)، وارتفاع نبرة الصوت في نهاية أسئلة نعم/لا.",
    },
    steps: [
      {
        en: "Step 1 (Pre-Listen): Read the vocabulary & equivalent meanings table first, then predict whether each question needs a number, time, or place.",
        ar: "الخطوة ١ (قبل الاستماع): اقرأ جدول المفردات والمعاني المكافئة أولًا، ثم توقّع هل يحتاج كل سؤال رقمًا أم وقتًا أم مكانًا.",
      },
      {
        en: "Step 2 (Listen Slowly 0.75×): Play the slow recording once for the main situation, then play naturally (0.95×) to catch exact details.",
        ar: "الخطوة ٢ (استمع ببطء 0.75×): شغّل التسجيل البطيء مرة لفهم الموقف العام، ثم استمع بالسرعة الطبيعية (0.95×) لالتقاط التفاصيل الدقيقة.",
      },
      {
        en: "Step 3 (Verify & Shadow): Answer all questions before opening the transcript, then shadow one key sentence aloud using the microphone.",
        ar: "الخطوة ٣ (تحقّق وظلّل الصوت): أجب عن جميع الأسئلة قبل فتح النص المكتوب، ثم ردّد جملة مفتاحية بصوتك عبر الميكروفون.",
      },
    ],
  },
  a2: {
    encouragement: {
      en: "Great progress at A2! Natural speakers join small words together. Listen for the louder content words and match spoken phrases to their similar meanings below.",
      ar: "تقدّم رائع في مستوى A2! المتحدثون الطبيعيون يربطون الكلمات القصيرة معًا. استمع إلى الكلمات المهمة المنبورة وطابق العبارات المسموعة بمعانيها المشابهة أدناه.",
    },
    acoustics: {
      en: "Common contractions (I’m, didn’t, won’t), weak forms of to/for/and, past-tense -ed endings (/t/, /d/, /ɪd/), and polite intonation.",
      ar: "الاختصارات الشائعة (I’m، didn’t، won’t)، الأشكال الضعيفة لحروف الجر (to/for/and)، نهايات الماضي -ed، ونبرة اللباقة.",
    },
    steps: [
      {
        en: "Step 1 (Pre-Listen): Preview the spoken-to-equivalent pairs so synonyms in the questions do not surprise you.",
        ar: "الخطوة ١ (قبل الاستماع): استعرض أزواج الكلمات المسموعة ومعانيها المكافئة حتى لا تفاجئك المترادفات في الأسئلة.",
      },
      {
        en: "Step 2 (Two-Pass Listening): Listen once at 0.75× for who, where, and what changed; listen again at 0.95× for times, prices, and reasons.",
        ar: "الخطوة ٢ (الاستماع على جولتين): استمع أولًا بسرعة 0.75× لمعرفة الأشخاص والمكان وما تغيّر؛ ثم استمع بسرعة 0.95× للأوقات والأسعار والأسباب.",
      },
      {
        en: "Step 3 (Acoustic Review): Check your answers, read the transcript while listening once more, and practise the pronunciation drill.",
        ar: "الخطوة ٣ (المراجعة الصوتية): تحقّق من إجاباتك، واقرأ النص أثناء الاستماع مرة أخرى، ثم تدرّب على النطق.",
      },
    ],
  },
  b1: {
    encouragement: {
      en: "At B1, you are training your ear for real-life English speed. Speakers rarely repeat the exact wording of a question—focus on paraphrases, contrasts (but/however), and tone.",
      ar: "في مستوى B1، أنت تدرّب أذنك على سرعة الإنجليزية الواقعية. نادرًا ما يكرّر المتحدث نص السؤال حرفيًا—ركّز على إعادة الصياغة وكلمات التناقض (but/however) ونبرة الصوت.",
    },
    acoustics: {
      en: "Connected speech (linking consonant-to-vowel), sentence stress highlighting new information, and contrastive stress when speakers correct a plan.",
      ar: "الكلام المتصل (ربط الساكن بالمتحرك)، نبر الجملة لإبراز المعلومة الجديدة، والنبر التقابلي عندما يصحّح المتحدث خطة أو رأيًا.",
    },
    steps: [
      {
        en: "Step 1 (Predict & Map Synonyms): Study the paraphrase table and underline key concepts in the questions before pressing play.",
        ar: "الخطوة ١ (توقّع واربط المترادفات): ادرس جدول إعادة الصياغة وحدّد الأفكار المفتاحية في الأسئلة قبل تشغيل الصوت.",
      },
      {
        en: "Step 2 (Gist Then Signposts): Play at natural speed (0.95×) first and track transition words (actually, although, instead); use 0.75× only for tricky acoustic spots.",
        ar: "الخطوة ٢ (الفكرة ثم الإشارات): استمع بالسرعة الطبيعية (0.95×) أولًا وتتبع كلمات التحوّل (actually، although، instead)؛ واستخدم 0.75× للمقاطع الصعبة فقط.",
      },
      {
        en: "Step 3 (Vocabulary & Shadowing): Answer, compare spoken expressions with their equivalent meanings, and shadow the target line with ASR.",
        ar: "الخطوة ٣ (المفردات والتظليل): أجب، وقارن التعبيرات المسموعة بمعانيها المكافئة، ثم ردّد الجملة المستهدفة بالميكروفون.",
      },
    ],
  },
  b2: {
    encouragement: {
      en: "At B2, your ear is ready for multi-speaker discussions and structured talks. Notice how intonation signals agreement, doubt, or shifting priorities—not just literal words.",
      ar: "في مستوى B2، أذنك مستعدة للنقاشات المتعددة والمحادثات المنظّمة. لاحظ كيف تكشف نبرة الصوت عن الموافقة أو التردّد أو تغيّر الأولويات وليس الكلمات الحرفية فقط.",
    },
    acoustics: {
      en: "Elision and assimilation in fast phrases, falling vs. fall-rise intonation for reservation/hedging, and emphatic stress on modifiers.",
      ar: "حذف وإدغام الأصوات في العبارات السريعة، التنغيم الهابط مقابل الهابط-الصاعد للتردّد والتحفّظ، والنبر التوكيدي على الصفات والظروف.",
    },
    steps: [
      {
        en: "Step 1 (Context & Paraphrase Scan): Review the spoken-to-equivalent pairs and anticipate how abstract ideas might be expressed informally.",
        ar: "الخطوة ١ (مسح السياق وإعادة الصياغة): راجع أزواج المعاني المكافئة وتوقّع كيف قد تُصاغ الأفكار المجردة بأسلوب شفهي طبيعي.",
      },
      {
        en: "Step 2 (Active Note-Taking): Play at 0.95× and note speaker stance, concessions, and final decisions; verify subtle acoustic links at 0.75×.",
        ar: "الخطوة ٢ (التدوين النشط): استمع بسرعة 0.95× ودوّن موقف المتحدث والاستدراكات والقرار النهائي؛ ثم تحقّق من الروابط الصوتية الدقيقة بسرعة 0.75×.",
      },
      {
        en: "Step 3 (Deep Debrief): Review every explanation, lock in the synonyms/equivalents, and practise natural rhythm via ASR.",
        ar: "الخطوة ٣ (المراجعة العميقة): راجع كل شرح، وثبّت المترادفات والمعاني المكافئة، وتدرّب على الإيقاع الطبيعي بالميكروفون.",
      },
    ],
  },
  c1: {
    encouragement: {
      en: "At C1, you are mastering academic lectures, briefings, and nuanced interviews. Track rhetorical signposts, self-corrections, and indirect stance to catch what is implied.",
      ar: "في مستوى C1، أنت تتقن المحاضرات الأكاديمية والإيجازات والمقابلات الدقيقة. تتبّع الإشارات الخطابية والتصحيح الذاتي والمواقف الضمنية لالتقاط المعنى العميق.",
    },
    acoustics: {
      en: "Rapid prosodic chunking, pitch resets at topic shifts, parenthetical low-pitch asides, and understated hedging cues.",
      ar: "تقطيع الإيقاع السريع، تغيّر طبقة الصوت عند الانتقال لموضوع جديد، الجمل الاعتراضية بنبرة منخفضة، وإشارات التحفّظ الهادئة.",
    },
    steps: [
      {
        en: "Step 1 (Conceptual Framing): Review the academic vocabulary and spoken paraphrases to prime your mental lexicon before listening.",
        ar: "الخطوة ١ (التأطير المفاهيمي): راجع المفردات الأكاديمية والمعاني المكافئة لتنشيط معجمك الذهني قبل الاستماع.",
      },
      {
        en: "Step 2 (Single-Pass Natural Listening): Listen straight through at 0.95× mapping claim → evidence → limitation; replay targeted clauses at 0.75× if needed.",
        ar: "الخطوة ٢ (استماع طبيعي متصل): استمع كاملًا بسرعة 0.95× مع تتبّع الادعاء ← الدليل ← القيد؛ وأعد الجمل الدقيقة بسرعة 0.75× عند الحاجة.",
      },
      {
        en: "Step 3 (Lexical Synthesis): Complete all questions, inspect how spoken phrasing maps to formal equivalents, and shadow key prosodic phrasing.",
        ar: "الخطوة ٣ (التركيب المعجمي): أكمل الأسئلة، وقارن الصياغة الشفهية بالمكافئات الرسمية، ثم ردّد الجملة بإيقاع متماسك.",
      },
    ],
  },
  c2: {
    encouragement: {
      en: "At C2, you listen with near-native agility. Pay close attention to irony, deliberate understatement, register shifts, and subtle concessions embedded in fluent delivery.",
      ar: "في مستوى C2، أنت تستمع بمرونة قريبة من الناطق الأصلي. انتبه بدقة للتلميح والتهوين المتعمّد وتغيّر مستوى الأسلوب والاستدراكات الخفية داخل الحديث السريع.",
    },
    acoustics: {
      en: "Micro-pauses for rhetorical weight, ironic pitch contours, compressed function-word clusters, and subtle nuclear stress shifts.",
      ar: "الوقفات القصيرة للثقل البلاغي، منحنيات النغمة الساخرة أو المتشككة، تجمّعات الكلمات الوظيفية المضغوطة، وتغيّرات النبر النووي الدقيقة.",
    },
    steps: [
      {
        en: "Step 1 (Nuance Priming): Examine the equivalent-meaning and idiomatic pairs below to sensitise your ear to figurative language.",
        ar: "الخطوة ١ (تهيئة الفروق الدقيقة): افحص أزواج المعاني المكافئة والتعابير أدناه لتهيئة أذنك للغة المجازية.",
      },
      {
        en: "Step 2 (Uninterrupted Analytical Listening): Play once at natural speed (0.95×) to evaluate speaker intent, bias, and implication before checking any detail.",
        ar: "الخطوة ٢ (استماع تحليلي متصل): شغّل التسجيل مرة واحدة بالسرعة الطبيعية (0.95×) لتقييم نية المتحدث وتحيزه ومعناه الضمني قبل مراجعة التفاصيل.",
      },
      {
        en: "Step 3 (Precision Calibration): Verify every item against the transcript, consolidate high-register equivalents, and practise prosodic control with ASR.",
        ar: "الخطوة ٣ (معايرة الدقة): تحقّق من كل عنصر مع النص، وثبّت المكافئات الرفيعة، وتدرّب على ضبط الإيقاع عبر الميكروفون.",
      },
    ],
  },
};

export interface ReadingPassageSpec {
  id: string;
  course: CefrCourse;
  unit: Bilingual;
  title: Bilingual;
  goal: Bilingual;
  minutes: number;
  scenario: Bilingual;
  preTask: Bilingual;
  mainTask: Bilingual;
  languageFocus: Bilingual;
  postTask: Bilingual;
  teaching: Bilingual[];
  passage: string;
  vocab: VocabItem[];
  questions: LessonQuestion[];
  pronunciation: string;
  pronunciationTip: Bilingual;
}

export function buildReadingPassageLesson(spec: ReadingPassageSpec): Lesson {
  return {
    id: spec.id,
    course: spec.course,
    skill: "reading",
    unit: spec.unit,
    title: spec.title,
    goal: spec.goal,
    minutes: spec.minutes,
    isReadingPassage: true,
    taskPlan: {
      scenario: spec.scenario,
      preTask: spec.preTask,
      mainTask: spec.mainTask,
      languageFocus: spec.languageFocus,
      postTask: spec.postTask,
    },
    teaching: spec.teaching,
    example: spec.passage,
    vocab: spec.vocab,
    questions: spec.questions,
    pronunciation: spec.pronunciation,
    pronunciationTip: spec.pronunciationTip,
  };
}

export interface ListeningLessonSpec {
  id: string;
  course: CefrCourse;
  unit: Bilingual;
  title: Bilingual;
  goal: Bilingual;
  minutes: number;
  scenario: Bilingual;
  acousticsNote: Bilingual;
  script: string;
  paraphrasePairs: { spoken: string; equivalent: string; arabic: string }[];
  vocab: VocabItem[];
  questions: LessonQuestion[];
  pronunciation: string;
  pronunciationTip: Bilingual;
}

export function buildListeningLesson(spec: ListeningLessonSpec): Lesson {
  const coaching = LEVEL_LISTENING_COACHING[spec.course];
  const listeningPlan: ListeningPlan = {
    levelEncouragement: coaching.encouragement,
    acousticsFocus: {
      en: `${coaching.acoustics.en} In this recording: ${spec.acousticsNote.en}`,
      ar: `${coaching.acoustics.ar} في هذا التسجيل: ${spec.acousticsNote.ar}`,
    },
    steps: coaching.steps,
    paraphrasePairs: spec.paraphrasePairs,
  };

  return {
    id: spec.id,
    course: spec.course,
    skill: "listening",
    unit: spec.unit,
    title: spec.title,
    goal: spec.goal,
    minutes: spec.minutes,
    taskPlan: {
      scenario: spec.scenario,
      preTask: {
        en: `Preview the acoustic focus and the ${spec.paraphrasePairs.length} spoken-to-equivalent meaning pairs before playing the audio.`,
        ar: `استعرض التركيز الصوتي وأزواج المعاني المكافئة (${spec.paraphrasePairs.length} أزواج) قبل تشغيل الصوت.`,
      },
      mainTask: {
        en: "Listen first without opening the transcript. Identify acoustic clues, track how spoken phrases match equivalent meanings, and answer all questions.",
        ar: "استمع أولًا دون فتح النص. التقط الإشارات الصوتية، وطابق العبارات المسموعة بمعانيها المكافئة، ثم أجب عن جميع الأسئلة.",
      },
      languageFocus: spec.acousticsNote,
      postTask: {
        en: "Open the transcript to verify any missed words, review the vocabulary table, and shadow the target sentence aloud using the microphone.",
        ar: "افتح النص للتحقق من أي كلمة فاتتك، وراجع جدول المفردات، ثم ردّد الجملة المستهدفة بصوتك عبر الميكروفون.",
      },
    },
    listeningPlan,
    teaching: [
      coaching.encouragement,
      spec.acousticsNote,
      {
        en: "Pay special attention to equivalent meanings: English listening tasks often test whether you recognise a synonym or paraphrase of what the speaker said.",
        ar: "انتبه جيدًا للمعاني المكافئة: غالبًا ما تختبر تمارين الاستماع قدرتك على تمييز مرادف أو إعادة صياغة لما قاله المتحدث.",
      },
    ],
    example: spec.script,
    vocab: spec.vocab,
    questions: spec.questions,
    pronunciation: spec.pronunciation,
    pronunciationTip: spec.pronunciationTip,
  };
}

export interface TbllLessonSpec {
  id: string;
  course: CefrCourse;
  skill: LessonSkill;
  unit: Bilingual;
  title: Bilingual;
  goal: Bilingual;
  minutes: number;
  taskPlan: TaskPlan;
  teaching: Bilingual[];
  example: string;
  vocab: VocabItem[];
  questions: LessonQuestion[];
  pronunciation: string;
  pronunciationTip: Bilingual;
  writing?: Lesson["writing"];
}

export function buildTbllLesson(spec: TbllLessonSpec): Lesson {
  return {
    id: spec.id,
    course: spec.course,
    skill: spec.skill,
    unit: spec.unit,
    title: spec.title,
    goal: spec.goal,
    minutes: spec.minutes,
    taskPlan: spec.taskPlan,
    teaching: spec.teaching,
    example: spec.example,
    vocab: spec.vocab,
    questions: spec.questions,
    pronunciation: spec.pronunciation,
    pronunciationTip: spec.pronunciationTip,
    ...(spec.writing ? { writing: spec.writing } : {}),
  };
}

export interface CompactTbllSpec {
  id: string;
  course: CefrCourse;
  skill: Exclude<LessonSkill, "listening">;
  unit: Bilingual;
  title: Bilingual;
  goal: Bilingual;
  minutes?: number;
  scenario: Bilingual;
  languageFocus: Bilingual;
  teaching: Bilingual[];
  example: string;
  vocab: [string, string, string, string, string, string][]; // [word, meaningEn, meaningAr, synonym, antonym, example]
  questions: LessonQuestion[];
  pronunciation: string;
  pronunciationTip: Bilingual;
  writing?: Lesson["writing"];
}

const SKILL_TASK_TEMPLATES: Record<
  Exclude<LessonSkill, "listening">,
  { preTask: Bilingual; mainTask: Bilingual; postTask: Bilingual }
> = {
  grammar: {
    preTask: {
      en: "Read the real-world scenario and preview the vocabulary bank so you recognise the target structure in natural use.",
      ar: "اقرأ الموقف الواقعي واستعرض بنك المفردات لتمييز القاعدة المستهدفة داخل سياق طبيعي.",
    },
    mainTask: {
      en: "Study the authentic model dialogue or text, spot how the grammar solves the communicative need, and complete every check.",
      ar: "ادرس المثال الواقعي، ولاحظ كيف تخدم القاعدة هدف التواصل، ثم أكمل جميع أسئلة التحقق.",
    },
    postTask: {
      en: "Read the model sentence aloud with the microphone and build two original sentences for your own daily life.",
      ar: "انطق الجملة النموذجية عبر الميكروفون وكوّن جملتين أصليتين من حياتك اليومية.",
    },
  },
  reading: {
    preTask: {
      en: "Scan the title and key vocabulary pairs (synonyms and antonyms) to predict the main message before reading.",
      ar: "تصفّح العنوان وأزواج المفردات (المترادفات والأضداد) لتوقع الفكرة الرئيسية قبل القراءة.",
    },
    mainTask: {
      en: "Read the authentic text carefully for evidence, answer every comprehension and vocabulary check, and verify each explanation.",
      ar: "اقرأ النص بعناية لاستخراج الأدلة، وأجب عن جميع أسئلة الفهم والمفردات، وراجع كل شرح.",
    },
    postTask: {
      en: "Shadow the key sentence aloud using ASR pronunciation practice and summarise the main takeaway in one sentence.",
      ar: "ردّد الجملة المفتاحية بصوتك عبر فاحص النطق ولخّص الفكرة الأساسية في جملة واحدة.",
    },
  },
  writing: {
    preTask: {
      en: "Identify your reader, purpose, and target vocabulary before drafting; plan 2–3 clear points.",
      ar: "حدّد القارئ والغرض والمفردات المستهدفة قبل الكتابة، وخطّط لنقطتين أو ثلاث نقاط واضحة.",
    },
    mainTask: {
      en: "Complete the language checks first, then draft your own response meeting the word target before comparing with the model.",
      ar: "أكمل أسئلة التحقق اللغوي أولًا، ثم اكتب مسودتك مستوفيًا عدد الكلمات قبل مقارنتها بالنموذج.",
    },
    postTask: {
      en: "Use the self-review checklist to revise your draft and read one key sentence aloud with ASR to check clarity.",
      ar: "استخدم قائمة المراجعة الذاتية لتنقيح مسودتك، واقرأ جملة مفتاحية بصوت عالٍ للتأكد من وضوحها.",
    },
  },
  speaking: {
    preTask: {
      en: "Review the communicative scenario and useful vocabulary bank so you can respond smoothly without translating word by word.",
      ar: "راجع الموقف التواصلي وبنك المفردات المفيدة لتتمكن من الرد بسلاسة دون ترجمة حرفية.",
    },
    mainTask: {
      en: "Listen to the model dialogue, answer the pragmatic checks, and perform your own spoken response aloud via the microphone.",
      ar: "استمع للحوار النموذجي، وأجب عن أسئلة الاستخدام العملي، ثم أدِّ إجابتك بصوتك عبر الميكروفون.",
    },
    postTask: {
      en: "Repeat the speaking target at natural pace with personal details, then practise further scenarios in the Speaking Studio.",
      ar: "كرّر الجملة المستهدفة بسرعة طبيعية بتفاصيلك الشخصية، ثم واصل التدريب في استوديو المحادثة.",
    },
  },
};

export function buildCompactTbllLesson(spec: CompactTbllSpec): Lesson {
  const tpl = SKILL_TASK_TEMPLATES[spec.skill];
  return {
    id: spec.id,
    course: spec.course,
    skill: spec.skill,
    unit: spec.unit,
    title: spec.title,
    goal: spec.goal,
    minutes: spec.minutes ?? (spec.writing ? 25 : 20),
    taskPlan: {
      scenario: spec.scenario,
      preTask: tpl.preTask,
      mainTask: tpl.mainTask,
      languageFocus: spec.languageFocus,
      postTask: tpl.postTask,
    },
    teaching: spec.teaching,
    example: spec.example,
    vocab: spec.vocab.map(([word, meaningEn, meaningAr, synonym, antonym, example]) => ({
      word,
      meaningEn,
      meaningAr,
      synonym,
      antonym,
      example,
    })),
    questions: spec.questions,
    pronunciation: spec.pronunciation,
    pronunciationTip: spec.pronunciationTip,
    ...(spec.writing ? { writing: spec.writing } : {}),
  };
}
