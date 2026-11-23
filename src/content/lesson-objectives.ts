import type {
  Bilingual,
  DetailedRuleGuide,
  Lesson,
  LessonObjective,
  PostEvaluationQuestion,
} from "./lesson-types";

function rotateFour(
  options: [string, string, string, string],
  correctIdx: number,
  seed: string,
): { options: [string, string, string, string]; correct: number } {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const shift = hash % 4;
  const rotated: [string, string, string, string] = [
    options[(0 + shift) % 4] ?? options[0],
    options[(1 + shift) % 4] ?? options[1],
    options[(2 + shift) % 4] ?? options[2],
    options[(3 + shift) % 4] ?? options[3],
  ];
  return { options: rotated, correct: (correctIdx - shift + 4) % 4 };
}

function packFourDistinct(
  correct: string,
  distractors: string[],
  fallbacks: [string, string, string],
  seed: string,
): { options: [string, string, string, string]; correct: number } {
  const cleanCorrect = correct.trim();
  const seen = new Set<string>([cleanCorrect.toLowerCase()]);
  const collected: string[] = [cleanCorrect];

  for (const cand of [...distractors, ...fallbacks]) {
    const clean = cand.trim();
    if (clean && !seen.has(clean.toLowerCase())) {
      seen.add(clean.toLowerCase());
      collected.push(clean);
    }
    if (collected.length === 4) break;
  }

  let padIdx = 1;
  while (collected.length < 4) {
    const pad = `Option ${padIdx++}: unrelated English pattern`;
    if (!seen.has(pad.toLowerCase())) {
      seen.add(pad.toLowerCase());
      collected.push(pad);
    }
  }

  return rotateFour([collected[0]!, collected[1]!, collected[2]!, collected[3]!], 0, seed);
}

/**
 * Extracts lesson-goal-tailored important words, pronouns, auxiliaries, and target vocab
 * to highlight in **bold red** across the lesson objectives, video stage, and detailed guide.
 */
export function extractLessonKeywords(lesson: Lesson, guide: DetailedRuleGuide): string[] {
  const bag = new Set<string>();
  const id = `${lesson.id} ${lesson.title.en}`.toLowerCase();

  if (id.includes("article")) {
    for (const w of ["a", "an", "the", "university", "hour", "children", "people"]) bag.add(w);
  }
  if (id.includes("comparative") || id.includes("superlative")) {
    for (const w of ["than", "more", "most", "better", "best", "worse", "worst"]) bag.add(w);
  }
  if (id.includes("relative")) {
    for (const w of ["who", "which", "that", "whose", "where"]) bag.add(w);
  }
  if (id.includes("conditional") || id.includes("hypothetical")) {
    for (const w of ["if", "will", "would", "would have", "had", "were", "unless"]) bag.add(w);
  }
  if (id.includes("passive")) {
    for (const w of ["be", "been", "being", "by", "is", "are", "was", "were"]) bag.add(w);
  }
  if (id.includes("present-perfect") || id.includes("experiences")) {
    for (const w of ["have", "has", "for", "since", "already", "yet", "ever", "never"]) bag.add(w);
  }
  if (id.includes("future")) {
    for (const w of ["will", "going to", "won't", "tomorrow"]) bag.add(w);
  }
  if (id.includes("school-day") || id.includes("kids")) {
    for (const w of ["first", "next", "then", "finally", "at", "on", "have got", "has got"]) {
      bag.add(w);
    }
  }

  for (const q of lesson.questions) {
    for (const cue of q.cueWords ?? []) {
      const clean = cue.trim();
      if (clean.length >= 2 && clean.length <= 28) bag.add(clean);
    }
  }

  for (const v of lesson.vocab ?? []) {
    if (v.word.trim().length >= 2) bag.add(v.word.trim());
  }

  for (const turn of guide.miniDialogue ?? []) {
    if (turn.focusPhrase && turn.focusPhrase.length <= 28) {
      bag.add(turn.focusPhrase.trim());
    }
  }

  return Array.from(bag).slice(0, 24);
}

/**
 * Builds 4 clear, measurable pre-lesson Objectives & Mastery Missions displayed
 * PRIOR to starting each lesson so learners know exactly what they will learn and master.
 */
export function buildLessonObjectives(lesson: Lesson, guide: DetailedRuleGuide): LessonObjective[] {
  const cards = guide.ruleBreakdown ?? [];
  const summaryPairings =
    cards.length >= 2
      ? `${cards[0]!.group} (${cards[0]!.takes}) and ${cards[1]!.group} (${cards[1]!.takes})`
      : (guide.formulas[0]?.pattern ?? lesson.title.en);
  const firstMistake = guide.commonMistakes[0];
  const vocabSample = (lesson.vocab ?? [])
    .slice(0, 3)
    .map((v) => `"${v.word}"`)
    .join(", ");

  return [
    {
      index: 1,
      code: "OBJ-1",
      title: {
        en: `Master the core rule & pattern of ${lesson.title.en}`,
        ar: `إتقان القاعدة الأساسية ونمط درس «${lesson.title.ar}»`,
      },
      mission: {
        en: `Accurately apply ${summaryPairings} in clear, complete English sentences.`,
        ar: `تطبيق التركيب الصحيح في جمل إنجليزية واضحة وسليمة (${guide.formulas[0]?.arabic ?? lesson.goal.ar}).`,
      },
    },
    {
      index: 2,
      code: "OBJ-2",
      title: {
        en: "Spot & avoid Arabic-to-English mother-tongue mistakes",
        ar: "تمييز وتجنّب أخطاء الترجمة الحرفية من العربية إلى الإنجليزية",
      },
      mission: {
        en: firstMistake
          ? `Replace the common trap "${firstMistake.wrong}" with accurate English: "${firstMistake.right}".`
          : (guide.l1Bridge?.keyDifference.en ??
            "Identify common structural errors and select the accurate English correction every time."),
        ar: firstMistake
          ? `استبدال الخطأ الشائع "${firstMistake.wrong}" بالصياغة الدقيقة "${firstMistake.right}".`
          : (guide.l1Bridge?.keyDifference.ar ??
            "اكتشاف الأخطاء الشائعة وتصحيحها بثقة وفق منطق اللغة الإنجليزية."),
      },
    },
    {
      index: 3,
      code: "OBJ-3",
      title: {
        en: "Use the rule naturally in real conversations & key vocabulary",
        ar: "توظيف القاعدة بطبيعية في المحادثات الواقعية والمفردات الأساسية",
      },
      mission: {
        en: vocabSample
          ? `Understand the Male & Female model conversation and use target vocabulary (${vocabSample}) accurately in context.`
          : `Follow the Male & Female model conversation and speak "${lesson.pronunciation}" with clear rhythm.`,
        ar: vocabSample
          ? `فهم المحادثة النموذجية واستخدام المفردات المستهدفة (${vocabSample}) بدقة داخل السياق.`
          : `متابعة المحادثة النموذجية ونطق الجملة الأساسية بإيقاع واضح وطبيعي.`,
      },
    },
    {
      index: 4,
      code: "OBJ-4",
      title: {
        en: "Prove independent mastery in the Post-Evaluation Test",
        ar: "إثبات الإتقان المستقل في اختبار التقييم البعدي",
      },
      mission: {
        en: "Score 8/10 or higher on the objective-aligned Post-Lesson Evaluation Test at the end of this lesson.",
        ar: "تحقيق ٨ من ١٠ فأكثر في اختبار التقييم البعدي المبني على أهداف هذا الدرس في نهاية رحلتك.",
      },
    },
  ];
}

/**
 * Designs a 10-question multiple-choice Post-Lesson Evaluation Test DIRECTLY mapped
 * to the lesson's 4 given Objectives:
 * - Objective 1 (Core Rule & Agreement): 3 MCQs
 * - Objective 2 (Arabic ↔ English Error Awareness): 3 MCQs
 * - Objective 3 (Conversation & Vocabulary in Context): 2 MCQs
 * - Objective 4 (Independent Mastery & Transfer): 2 MCQs
 */
export function buildLessonPostEvaluation(
  lesson: Lesson,
  guide: DetailedRuleGuide,
  objectives: LessonObjective[],
): PostEvaluationQuestion[] {
  const objLabel = (idx: 1 | 2 | 3 | 4): Bilingual => {
    const found = objectives.find((o) => o.index === idx);
    return found
      ? { en: `Objective ${idx} · ${found.title.en}`, ar: `الهدف ${idx} · ${found.title.ar}` }
      : { en: `Objective ${idx}`, ar: `الهدف ${idx}` };
  };

  const usedPrompts = new Set<string>();
  const out: PostEvaluationQuestion[] = [];

  function pushQuestion(
    objectiveIndex: 1 | 2 | 3 | 4,
    idSuffix: string,
    prompt: string,
    correct: string,
    distractors: string[],
    fallbacks: [string, string, string],
    explanation: Bilingual,
  ): boolean {
    const key = prompt.trim().toLowerCase();
    if (!prompt.trim() || !correct.trim() || usedPrompts.has(key)) return false;
    usedPrompts.add(key);
    const packed = packFourDistinct(correct, distractors, fallbacks, `${lesson.id}-${idSuffix}`);
    out.push({
      id: `${lesson.id}-eval-${idSuffix}`,
      objectiveIndex,
      objectiveLabel: objLabel(objectiveIndex),
      prompt,
      options: packed.options,
      correct: packed.correct,
      explanation,
    });
    return true;
  }

  const cards = guide.ruleBreakdown ?? [];
  const mistakes = guide.commonMistakes;
  const dialogue = guide.miniDialogue ?? [];

  // ---- OBJECTIVE 1 (Target: 3 MCQs) — Core Rule & Pronoun/Structure Mastery ----
  let obj1Count = 0;
  for (let i = 0; i < cards.length && obj1Count < 2; i++) {
    const card = cards[i]!;
    const otherTakes = cards.filter((_, j) => j !== i).map((c) => c.takes);
    const added = pushQuestion(
      1,
      `obj1-card-${i}`,
      `Rule mastery (${lesson.title.en}): In English, what does "${card.group}" take?`,
      card.takes,
      otherTakes,
      [
        "leaves out the verb completely",
        "uses literal Arabic word order",
        "adds an unrelated auxiliary verb",
      ],
      {
        en: `${card.group} ${card.takes}. Example: "${card.example}"`,
        ar: `${card.group} ← ${card.takes}. مثال: "${card.example}" (${card.arabic})`,
      },
    );
    if (added) obj1Count++;
  }

  for (let i = 0; i < guide.formulas.length && obj1Count < 3; i++) {
    const row = guide.formulas[i]!;
    const otherExamples = guide.formulas.filter((_, j) => j !== i).map((f) => f.example);
    const added = pushQuestion(
      1,
      `obj1-form-${i}`,
      `Which example accurately demonstrates the "${row.label.en}" pattern (${row.pattern})?`,
      row.example,
      [...otherExamples, mistakes[0]?.wrong ?? ""],
      [
        "They is going to class yesterday.",
        "She do not knows the answer.",
        "I am agree with every words.",
      ],
      {
        en: `"${row.example}" follows the exact ${row.label.en} pattern: ${row.pattern}.`,
        ar: `المثال "${row.example}" يطبّق صيغة «${row.label.ar}» بدقة (${row.arabic}).`,
      },
    );
    if (added) obj1Count++;
  }

  // ---- OBJECTIVE 2 (Target: 3 MCQs) — Arabic ↔ English Error Awareness ----
  let obj2Count = 0;
  for (let i = 0; i < mistakes.length && obj2Count < 2; i++) {
    const m = mistakes[i]!;
    const otherWrong = mistakes[(i + 1) % mistakes.length]?.wrong ?? "";
    const added = pushQuestion(
      2,
      `obj2-err-${i}`,
      `Error awareness: Which sentence correctly fixes the common ESL mistake "${m.wrong}"?`,
      m.right,
      [m.wrong, otherWrong],
      [
        "Keep the original sentence unchanged.",
        "Translate word by word from Arabic instead.",
        "Drop the main verb to keep it shorter.",
      ],
      {
        en: `${m.why.en} Accurate English: "${m.right}".`,
        ar: `${m.why.ar} الصياغة الصحيحة: "${m.right}".`,
      },
    );
    if (added) obj2Count++;
  }

  if (guide.l1Bridge && obj2Count < 3) {
    const added = pushQuestion(
      2,
      "obj2-l1bridge",
      `Arabic vs. English awareness (${lesson.title.en}): Which principle prevents mother-tongue interference?`,
      guide.l1Bridge.keyDifference.en,
      [
        "Always copy Arabic sentence structure word for word into English.",
        "Ignore subject-verb agreement whenever the meaning feels clear.",
        "Skip checking English auxiliaries and articles in everyday speech.",
      ],
      [
        "Use the same verb form regardless of tense or subject.",
        "Avoid practicing full sentences aloud.",
        "Only memorize isolated single words without rules.",
      ],
      {
        en: `${guide.l1Bridge.englishRule.en} Key takeaway: ${guide.l1Bridge.keyDifference.en}`,
        ar: `${guide.l1Bridge.englishRule.ar} الخلاصة: ${guide.l1Bridge.keyDifference.ar}`,
      },
    );
    if (added) obj2Count++;
  }

  // ---- OBJECTIVE 3 (Target: 2 MCQs) — Conversation & Vocabulary in Context ----
  let obj3Count = 0;
  const vocabList = lesson.vocab ?? [];
  if (vocabList[0] && obj3Count < 2) {
    const v = vocabList[0];
    const otherMeanings = vocabList.slice(1).map((item) => item.meaningEn);
    const added = pushQuestion(
      3,
      "obj3-vocab-0",
      `Vocabulary in context: What does "${v.word}" mean in "${v.example}"?`,
      v.meaningEn,
      otherMeanings,
      [
        "to cancel a scheduled meeting unexpectedly",
        "an unrelated physical object in a classroom",
        "a grammatical mistake to avoid",
      ],
      {
        en: `"${v.word}" means "${v.meaningEn}"${v.synonym ? ` (synonym: ${v.synonym})` : ""}.`,
        ar: `كلمة "${v.word}" تعني «${v.meaningAr}».`,
      },
    );
    if (added) obj3Count++;
  }

  if (dialogue.length >= 2 && obj3Count < 2) {
    const promptTurn = dialogue[0]!;
    const replyTurn = dialogue[1]!;
    const added = pushQuestion(
      3,
      "obj3-dialogue",
      `Real-life conversation: ${promptTurn.speaker} says, "${promptTurn.textEn}" Which reply fits naturally and accurately?`,
      replyTurn.textEn,
      [
        mistakes[0]?.wrong ?? "Yes, I am agree with you yesterday.",
        "Sorry, I never use English rules when speaking.",
        "No reply is possible in this everyday situation.",
      ],
      [
        "Repeat the exact question without answering.",
        "Switch to literal word-by-word translation.",
        "End the conversation with a single unrelated word.",
      ],
      {
        en: `In the model conversation, ${replyTurn.speaker} replies naturally: "${replyTurn.textEn}"`,
        ar: `في المحادثة النموذجية يردّ ${replyTurn.speaker} بشكل طبيعي: "${replyTurn.textAr}"`,
      },
    );
    if (added) obj3Count++;
  }

  if (lesson.listeningPlan?.paraphrasePairs[0] && obj3Count < 2) {
    const p = lesson.listeningPlan.paraphrasePairs[0];
    const others = lesson.listeningPlan.paraphrasePairs.slice(1).map((x) => x.equivalent);
    const added = pushQuestion(
      3,
      "obj3-listening",
      `Spoken-English awareness: When a speaker says "${p.spoken}", what equivalent meaning should you match?`,
      p.equivalent,
      others,
      [
        "the exact opposite idea",
        "a random date mentioned earlier",
        "an unrelated detail not in the audio",
      ],
      {
        en: `"${p.spoken}" paraphrases "${p.equivalent}" (${p.arabic}).`,
        ar: `عبارة "${p.spoken}" تعبّر عن "${p.equivalent}" (${p.arabic}).`,
      },
    );
    if (added) obj3Count++;
  }

  // ---- OBJECTIVE 4 (Target: Fill to exactly 10 MCQs — Mastery & Transfer) ----
  for (let i = 0; i < lesson.questions.length && out.length < 10; i++) {
    const q = lesson.questions[i]!;
    const correctOpt = q.options[q.correct];
    if (!correctOpt) continue;
    const distractors = q.options.filter((_, j) => j !== q.correct);
    const targetObj: 1 | 2 | 3 | 4 =
      out.filter((item) => item.objectiveIndex === 4).length < 2
        ? 4
        : out.filter((item) => item.objectiveIndex === 1).length < 3
          ? 1
          : out.filter((item) => item.objectiveIndex === 2).length < 3
            ? 2
            : 3;
    pushQuestion(
      targetObj,
      `obj${targetObj}-q-${i}`,
      `Mastery check: ${q.prompt}`,
      correctOpt,
      distractors,
      [
        "None of the choices fit standard English.",
        "Leave the sentence incomplete.",
        "Use a literal word-for-word translation.",
      ],
      q.explanation,
    );
  }

  // Additional guaranteed objective-based backups if a compact lesson had fewer source questions
  if (out.length < 10) {
    pushQuestion(
      4,
      "obj4-memory-tip",
      `Mastery takeaway (${lesson.title.en}): Which golden rule should you remember when applying this lesson?`,
      guide.memoryTip.en,
      [
        "Ignore word order and focus only on speaking fast.",
        "Use the exact same verb ending for every subject and tense.",
        "Avoid checking context clues before choosing an answer.",
      ],
      [
        "Skip practicing full sentences aloud.",
        "Translate every phrase literally from Arabic.",
        "Never review your mistakes after practice.",
      ],
      guide.memoryTip,
    );
  }

  if (out.length < 10) {
    pushQuestion(
      4,
      "obj4-pronunciation-model",
      `Real-world application: Which complete English sentence models "${lesson.title.en}" accurately?`,
      lesson.pronunciation,
      [
        mistakes[0]?.wrong ?? "He are study English every yesterday.",
        mistakes[1]?.wrong ?? "She do not going to school now.",
        "They was happy to saw you tomorrow.",
      ],
      [
        "We is ready for class yesterday.",
        "Does you likes this lesson?",
        "I have went there last week.",
      ],
      {
        en: `"${lesson.pronunciation}" models the lesson accurately. ${lesson.pronunciationTip.en}`,
        ar: `الجملة "${lesson.pronunciation}" تطبّق الدرس بدقة. ${lesson.pronunciationTip.ar}`,
      },
    );
  }

  // Second vocab item backup if still < 10
  for (let i = 1; i < vocabList.length && out.length < 10; i++) {
    const v = vocabList[i]!;
    const others = vocabList.filter((_, j) => j !== i).map((item) => item.meaningEn);
    pushQuestion(
      3,
      `obj3-vocab-${i}`,
      `Vocabulary mastery: What is the accurate meaning of "${v.word}"?`,
      v.meaningEn,
      others,
      [
        "an incorrect verb tense",
        "a silent punctuation symbol",
        "something unrelated to this lesson",
      ],
      {
        en: `"${v.word}" means "${v.meaningEn}" (e.g., "${v.example}").`,
        ar: `كلمة "${v.word}" تعني «${v.meaningAr}».`,
      },
    );
  }

  // Final rule card / whenToUse backup to guarantee exact length 10 across all 209 lessons
  for (let i = 0; i < guide.whenToUse.length && out.length < 10; i++) {
    const rule = guide.whenToUse[i]!;
    const targetObj: 1 | 2 | 3 | 4 = out.filter((x) => x.objectiveIndex === 4).length < 2 ? 4 : 1;
    pushQuestion(
      targetObj,
      `obj${targetObj}-use-${i}`,
      `Core objective check #${i + 1} (${lesson.title.en}): Which statement is true about this English rule?`,
      rule.en,
      [
        "This rule only applies in written poetry and never in everyday English.",
        "English verbs and word order never change based on subject or time.",
        "You can drop key linking or auxiliary verbs whenever translating from Arabic.",
      ],
      [
        "Every English noun uses the same article regardless of sound.",
        "Context clues are unnecessary for accurate comprehension.",
        "No practice is needed to master this pattern.",
      ],
      rule,
    );
  }

  return out.slice(0, 10);
}
