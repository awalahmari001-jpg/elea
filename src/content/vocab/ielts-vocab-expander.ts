import type { IeltsTopicCategory, IeltsVocabCategory, IeltsVocabEntry } from "./vocab-types";

/**
 * Compact tuple for authentic IELTS Band 7.0–8.5 vocabulary entries:
 * [word, ipa, partOfSpeech, arabic, definition, everydayAlt, collocation1, collocation2, synonym]
 */
export type CompactIeltsRow = readonly [
  word: string,
  ipa: string,
  pos: "noun" | "verb" | "adjective" | "adverb" | "collocation" | "phrasal verb" | "idiom",
  arabic: string,
  definition: string,
  everydayAlt: string,
  collocation1: string,
  collocation2: string,
  synonym: string,
];

const TOPIC_CONTEXT: Record<
  IeltsTopicCategory,
  {
    en: string;
    ar: string;
    speakingPrompt: string;
    writingPrompt: string;
    domainNoun: string;
  }
> = {
  education: {
    en: "modern education systems",
    ar: "أنظمة التعليم الحديثة",
    speakingPrompt: "How have teaching methods and student assessment changed in your country?",
    writingPrompt:
      "Some people believe universities should prioritise practical career skills over academic theory. Discuss both views.",
    domainNoun: "educational reform",
  },
  "technology-ai": {
    en: "emerging technology and artificial intelligence",
    ar: "التقنية الحديثة والذكاء الاصطناعي",
    speakingPrompt: "How has digital technology changed the way people study and work?",
    writingPrompt:
      "Artificial intelligence is transforming modern workplaces. Do the benefits outweigh the risks?",
    domainNoun: "digital innovation",
  },
  "environment-climate": {
    en: "environmental conservation and climate policy",
    ar: "حماية البيئة وسياسات المناخ",
    speakingPrompt: "What environmental challenges are most urgent in your region today?",
    writingPrompt:
      "Individual lifestyle changes are not enough to stop climate change; governments must act decisively. To what extent do you agree?",
    domainNoun: "climate action",
  },
  "health-lifestyle": {
    en: "public health and modern lifestyles",
    ar: "الصحة العامة وأنماط الحياة المعاصرة",
    speakingPrompt: "What habits help busy adults maintain both physical and mental well-being?",
    writingPrompt:
      "Preventive healthcare should receive more public funding than hospital treatment. To what extent do you agree?",
    domainNoun: "public health policy",
  },
  "business-employment": {
    en: "business growth and the modern labour market",
    ar: "نمو الأعمال وسوق العمل الحديث",
    speakingPrompt: "What qualities make a workplace motivating and productive for employees?",
    writingPrompt:
      "Remote and hybrid work arrangements benefit both employers and workers. Discuss the advantages and disadvantages.",
    domainNoun: "workplace competitiveness",
  },
  globalisation: {
    en: "globalisation and international exchange",
    ar: "العولمة والتبادل الدولي",
    speakingPrompt: "How has global trade influenced everyday products and habits in your city?",
    writingPrompt:
      "Globalisation creates economic opportunity but threatens local identity. Discuss both views and give your opinion.",
    domainNoun: "international integration",
  },
  "society-issues": {
    en: "social cohesion and community challenges",
    ar: "التماسك الاجتماعي وقضايا المجتمع",
    speakingPrompt: "What changes have strengthened or weakened community spirit in recent years?",
    writingPrompt:
      "Economic inequality is the most pressing challenge facing modern societies. What are the causes and possible solutions?",
    domainNoun: "social development",
  },
  "crime-punishment": {
    en: "law enforcement, justice, and rehabilitation",
    ar: "إنفاذ القانون والعدالة وإعادة التأهيل",
    speakingPrompt: "What measures are most effective for preventing youth crime in big cities?",
    writingPrompt:
      "Rehabilitation programmes reduce reoffending more effectively than longer prison sentences. To what extent do you agree?",
    domainNoun: "criminal justice reform",
  },
  "government-services": {
    en: "public administration and civic services",
    ar: "الإدارة العامة والخدمات الحكومية",
    speakingPrompt:
      "Which public services make the biggest difference to residents' quality of life?",
    writingPrompt:
      "Governments should spend more public money on transport and education than on arts and culture. Do you agree?",
    domainNoun: "public governance",
  },
  "culture-traditions": {
    en: "cultural heritage and living traditions",
    ar: "التراث الثقافي والتقاليد الحية",
    speakingPrompt:
      "Why is it important for younger generations to stay connected to local traditions?",
    writingPrompt:
      "Modern urban lifestyles are causing traditional customs to disappear. Should governments intervene to preserve them?",
    domainNoun: "cultural preservation",
  },
  "media-advertising": {
    en: "digital media, journalism, and advertising",
    ar: "الإعلام الرقمي والصحافة والإعلان",
    speakingPrompt: "How do people verify whether online news and advertisements are trustworthy?",
    writingPrompt:
      "Strict regulation of online advertising is necessary to protect consumers and children. To what extent do you agree?",
    domainNoun: "media literacy",
  },
  "science-innovation": {
    en: "scientific research and technological breakthroughs",
    ar: "البحث العلمي والابتكارات التقنية",
    speakingPrompt: "Which recent scientific discovery has had the greatest impact on daily life?",
    writingPrompt:
      "Public funding should prioritise practical medical research over space exploration. Discuss both views.",
    domainNoun: "scientific advancement",
  },
  "transport-urbanisation": {
    en: "urban planning and sustainable mobility",
    ar: "التخطيط العمراني والتنقل المستدام",
    speakingPrompt:
      "How could public transport in major cities be made faster and more convenient?",
    writingPrompt:
      "Rapid urbanisation brings economic prosperity but lowers living standards. What problems arise and how can cities solve them?",
    domainNoun: "urban mobility",
  },
  "family-relationships": {
    en: "family dynamics and intergenerational ties",
    ar: "الأسرة والعلاقات بين الأجيال",
    speakingPrompt:
      "How has the role of extended families changed compared to your grandparents' generation?",
    writingPrompt:
      "Modern work demands leave parents with less time for their children. What are the effects and practical solutions?",
    domainNoun: "family well-being",
  },
  "tourism-travel": {
    en: "international tourism and sustainable travel",
    ar: "السياحة الدولية والسفر المستدام",
    speakingPrompt:
      "What makes a travel destination memorable without harming the local environment?",
    writingPrompt:
      "Mass tourism brings vital income to developing regions but damages heritage sites. Do the advantages outweigh the disadvantages?",
    domainNoun: "sustainable tourism",
  },
};

function inferCategory(pos: CompactIeltsRow[2], idx: number): IeltsVocabCategory {
  if (pos === "collocation") return "collocations";
  if (pos === "phrasal verb") return "phrasal-verbs";
  if (pos === "idiom") return "idioms";
  const cycle: IeltsVocabCategory[] = [
    "academic",
    "topic-specific",
    "high-frequency",
    "formal-informal",
    "synonyms",
    "word-formation",
    "commonly-confused",
  ];
  return cycle[idx % cycle.length]!;
}

function buildNaturalExamples(
  word: string,
  pos: CompactIeltsRow[2],
  collocation1: string,
  topic: IeltsTopicCategory,
): [string, string] {
  const ctx = TOPIC_CONTEXT[topic];
  if (pos === "verb" || pos === "phrasal verb") {
    return [
      `Policymakers increasingly seek to ${word} key outcomes across ${ctx.en} through evidence-based planning.`,
      `In IELTS Writing Task 2, writers often note how targeted initiatives can ${word} long-term progress in ${ctx.domainNoun}.`,
    ];
  }
  if (pos === "adjective") {
    return [
      `Recent studies highlight a ${word} shift in how communities approach ${ctx.en}.`,
      `Achieving ${collocation1} has become a central priority for experts working in ${ctx.domainNoun}.`,
    ];
  }
  if (pos === "adverb") {
    return [
      `Public attitudes toward ${ctx.en} have ${word} evolved over the past two decades.`,
      `Funding decisions ${word} influence whether ${ctx.domainNoun} succeeds over the long term.`,
    ];
  }
  return [
    `Effective ${collocation1} plays a decisive role in strengthening ${ctx.en}.`,
    `Without sustained attention to ${word}, long-term goals in ${ctx.domainNoun} remain difficult to achieve.`,
  ];
}

export function expandIeltsTopicWords(
  topic: IeltsTopicCategory,
  rows: readonly CompactIeltsRow[],
  existingWords: Set<string>,
): IeltsVocabEntry[] {
  const ctx = TOPIC_CONTEXT[topic];
  const entries: IeltsVocabEntry[] = [];

  rows.forEach((row, idx) => {
    const [word, ipa, pos, arabic, definition, everydayAlt, coll1, coll2, synonym] = row;
    const norm = word.trim().toLowerCase();
    if (existingWords.has(norm)) return;
    existingWords.add(norm);

    const slug = norm.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const bandTarget: IeltsVocabEntry["bandTarget"] =
      idx % 3 === 0 ? "7.5+" : idx % 5 === 0 ? "8.0+" : "7.0";
    const examples = buildNaturalExamples(word, pos, coll1, topic);

    entries.push({
      id: `ielts-${topic}-${slug}`,
      word,
      ipa: ipa.startsWith("/") ? ipa : `/${ipa}/`,
      partOfSpeech: pos,
      category: inferCategory(pos, idx),
      topic,
      bandTarget,
      definition,
      arabic,
      collocations: [coll1, coll2],
      synonyms: [synonym],
      antonyms: [],
      registerContrast: {
        everyday: everydayAlt,
        academic: coll1,
        whenToUse: {
          en: `Prefer "${everydayAlt}" in casual conversation; use "${word}" or "${coll1}" for Band 7+ precision in IELTS essays and Part 3 discussions.`,
          ar: `استخدم «${everydayAlt}» في الحديث اليومي، واستخدم «${word}» أو «${coll1}» لرفع الدقة الأكاديمية في الآيلتس.`,
        },
      },
      examples,
      ieltsSpeaking: {
        prompt: ctx.speakingPrompt,
        sample: `In my view, paying closer attention to ${coll1} makes a noticeable difference in ${ctx.en}, especially for younger citizens.`,
        tip: {
          en: `Deliver "${coll1}" smoothly as one chunk rather than pausing awkwardly before "${word}".`,
          ar: `انطق التلازم «${coll1}» كوحدة واحدة متصلة لتبدو إجابتك طبيعية وطليقة.`,
        },
      },
      ieltsWriting: {
        task: idx % 4 === 0 ? "Task 1" : "Task 2",
        prompt: ctx.writingPrompt,
        sample: examples[0],
        tip: {
          en: `Pair "${word}" with natural academic partners such as "${coll1}" or "${coll2}" to earn high Lexical Resource marks.`,
          ar: `اربط الكلمة بمتلازماتها الطبيعية مثل «${coll1}» و«${coll2}» لرفع درجة الثروة اللغوية.`,
        },
      },
      commonMistake: {
        wrong: `Many people make very big ${everydayAlt} in ${ctx.en}.`,
        right: examples[0],
        why: {
          en: `Avoid vague modifiers like "very big" — use the exact collocation "${coll1}" to match Band 7+ lexical control.`,
          ar: `تجنّب الصفات العامة مثل very big واستخدم التلازم الدقيق «${coll1}».`,
        },
      },
    });
  });

  return entries;
}

/**
 * Compact tuple for authentic English idioms used for natural communication & IELTS Speaking:
 * [idiom, meaning, arabic, formalEquivalent, example]
 */
export type CompactIdiomRow = readonly [
  idiom: string,
  meaning: string,
  arabic: string,
  formalEquivalent: string,
  example: string,
];

export function expandIeltsIdioms(
  topic: IeltsTopicCategory,
  rows: readonly CompactIdiomRow[],
  existingTopicIdioms?: Set<string>,
): IeltsVocabEntry[] {
  const ctx = TOPIC_CONTEXT[topic];
  const seen = existingTopicIdioms ?? new Set<string>();
  const entries: IeltsVocabEntry[] = [];

  rows.forEach((row, idx) => {
    const [idiom, meaning, arabic, formalEquivalent, example] = row;
    const norm = idiom.trim().toLowerCase();
    if (!norm || seen.has(norm)) return;
    seen.add(norm);

    const slug = norm.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const bandTarget: IeltsVocabEntry["bandTarget"] =
      idx % 3 === 0 ? "7.5+" : idx % 5 === 0 ? "8.0+" : "7.0";

    entries.push({
      id: `ielts-idiom-${topic}-${slug}`,
      word: idiom,
      ipa: "/ˈɪd.i.əm/",
      partOfSpeech: "idiom",
      category: "idioms",
      topic,
      bandTarget,
      definition: meaning,
      arabic,
      collocations: [idiom, formalEquivalent],
      synonyms: [formalEquivalent],
      antonyms: [],
      registerContrast: {
        everyday: idiom,
        academic: formalEquivalent,
        whenToUse: {
          en: `Use "${idiom}" naturally in IELTS Speaking Parts 1–3 and everyday conversation; switch to "${formalEquivalent}" in formal IELTS Writing Task 2 essays.`,
          ar: `استخدم التعبير الاصطلاحي «${idiom}» بطبيعية في المحادثة واختبار التحدث، واستبدله بـ «${formalEquivalent}» في مقالات الكتابة الأكاديمية.`,
        },
      },
      examples: [
        example,
        `In ${ctx.en}, speakers frequently use "${idiom}" to communicate this idea quickly and naturally.`,
      ],
      ieltsSpeaking: {
        prompt: ctx.speakingPrompt,
        sample: example,
        tip: {
          en: `Deliver "${idiom}" smoothly without pausing or over-explaining it—natural rhythm is what examiners reward.`,
          ar: `انطق التعبير «${idiom}» بسلاسة وطبيعية دون توقف مفتعل لإبراز الطلاقة الحقيقية.`,
        },
      },
      ieltsWriting: {
        task: "Task 2",
        prompt: ctx.writingPrompt,
        sample: `In academic essays on ${ctx.domainNoun}, express the same idea formally using "${formalEquivalent}" rather than the spoken idiom "${idiom}".`,
        tip: {
          en: `Keep spoken idioms for IELTS Speaking; paraphrase them into formal academic phrasing ("${formalEquivalent}") in Writing Task 2.`,
          ar: `احتفظ بالتعابير الاصطلاحية للمحادثة، وحوّلها في الكتابة الأكاديمية إلى صياغة رسمية مثل «${formalEquivalent}».`,
        },
      },
      commonMistake: {
        wrong: `Do not change the fixed wording of "${idiom}" or force it into an overly formal Task 1 report.`,
        right: example,
        why: {
          en: `Idioms are fixed expressions—keep every preposition and noun intact, and match the register to spoken or semi-formal communication.`,
          ar: `التعابير الاصطلاحية تراكيب ثابتة؛ حافظ على كلماتها وحروف جرها كما هي واستخدمها في السياق المناسب.`,
        },
      },
    });
  });

  return entries;
}

/**
 * Compact tuple for high-frequency IELTS Band 7+ academic & exam vocabulary:
 * [word, ipa, pos, topic, arabic, definition, everydayAlt, collocation1, collocation2, synonym]
 */
export type CompactHighFreqRow = readonly [
  word: string,
  ipa: string,
  pos: "noun" | "verb" | "adjective" | "adverb",
  topic: IeltsTopicCategory,
  arabic: string,
  definition: string,
  everydayAlt: string,
  collocation1: string,
  collocation2: string,
  synonym: string,
];

export function expandIeltsHighFrequencyWords(
  rows: readonly CompactHighFreqRow[],
  existingWords: Set<string>,
): IeltsVocabEntry[] {
  const entries: IeltsVocabEntry[] = [];

  rows.forEach((row, idx) => {
    const [word, ipa, pos, topic, arabic, definition, everydayAlt, coll1, coll2, synonym] = row;
    const norm = word.trim().toLowerCase();
    if (!norm || existingWords.has(norm)) return;
    existingWords.add(norm);

    const ctx = TOPIC_CONTEXT[topic];
    const slug = norm.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const bandTarget: IeltsVocabEntry["bandTarget"] =
      idx % 3 === 0 ? "7.5+" : idx % 5 === 0 ? "8.0+" : "7.0";
    const examples = buildNaturalExamples(word, pos, coll1, topic);

    entries.push({
      id: `ielts-hf-${slug}`,
      word,
      ipa: ipa.startsWith("/") ? ipa : `/${ipa}/`,
      partOfSpeech: pos,
      category: "high-frequency",
      topic,
      bandTarget,
      definition,
      arabic,
      collocations: [coll1, coll2],
      synonyms: [synonym],
      antonyms: [],
      registerContrast: {
        everyday: everydayAlt,
        academic: coll1,
        whenToUse: {
          en: `High-frequency IELTS exam word: replace casual "${everydayAlt}" with "${word}" or "${coll1}" across Reading, Listening, Writing, and Speaking.`,
          ar: `كلمة آيلتس عالية التكرار: استبدل «${everydayAlt}» بـ «${word}» أو «${coll1}» لرفع درجتك في جميع مهارات الاختبار.`,
        },
      },
      examples,
      ieltsSpeaking: {
        prompt: ctx.speakingPrompt,
        sample: `From my perspective, "${coll1}" is one of the clearest ways to understand modern ${ctx.en}.`,
        tip: {
          en: `Practise stressing "${word}" accurately (${ipa}) and combining it with "${coll1}".`,
          ar: `تدرّب على نطق «${word}» بدقة وربطها مباشرة مع «${coll1}».`,
        },
      },
      ieltsWriting: {
        task: idx % 3 === 0 ? "Task 1" : "Task 2",
        prompt: ctx.writingPrompt,
        sample: examples[0],
        tip: {
          en: `High-frequency AWL words like "${word}" help you paraphrase IELTS prompts cleanly without repetition.`,
          ar: `المفردات الأكاديمية عالية التكرار مثل «${word}» تساعدك على إعادة صياغة سؤال الآيلتس بدقة ودون تكرار.`,
        },
      },
      commonMistake: {
        wrong: `Many students repeat "${everydayAlt}" five times in one IELTS essay.`,
        right: examples[0],
        why: {
          en: `Using "${word}" with "${coll1}" demonstrates Band 7+ lexical precision and avoids repetitive basic phrasing.`,
          ar: `استخدام «${word}» مع «${coll1}» يبرز دقة المفردات ويمنع التكرار الممل في المقال.`,
        },
      },
    });
  });

  return entries;
}
