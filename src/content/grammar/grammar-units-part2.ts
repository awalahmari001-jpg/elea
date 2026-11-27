import type { GrammarUnit } from "./grammar-curriculum-types";

export const GRAMMAR_UNITS_PART2: GrammarUnit[] = [
  // =========================================================================
  // MODULE 5: Conditionals & Wishes (Orders 28–32)
  // =========================================================================
  {
    id: "zero-first-conditionals",
    order: 28,
    moduleId: "conditionals-wishes",
    level: "B1",
    title: {
      en: "Zero & First Conditionals (if / unless / as soon as)",
      ar: "الجمل الشرطية الصفرية والأولى (if / unless / as soon as)",
    },
    overview: {
      en: "Use the Zero Conditional for universal truths, scientific facts, and automatic routines, and the First Conditional for real, likely future situations and their results. Time and condition clauses after if, unless, when, and as soon as use the present tense even when referring to the future.",
      ar: "تُستخدم الجملة الشرطية الصفرية للحقائق العلمية والعامة والعادات التلقائية، وتُستخدم الجملة الشرطية الأولى للمواقف المستقبلية الحقيقية والمحتملة ونتائجها. يأتي الفعل في زمن المضارع البسيط بعد if وunless وwhen وas soon as حتى عند الإشارة إلى المستقبل.",
    },
    formula:
      "Zero: If + Present Simple, Present Simple | First: If / Unless / As soon as + Present Simple, will / can / may / imperative",
    forms: {
      affirmative: "If you study regularly, you will pass the exam.",
      negative: "Unless you study regularly, you won't pass the exam.",
      question: "What will you do if the flight is delayed?",
    },
    rules: [
      {
        en: "Zero Conditional uses Present Simple in both clauses to state facts that are always true whenever the condition happens.",
        ar: "تستخدم الشرطية الصفرية المضارع البسيط في كلا شقي الجملة للتعبير عن حقائق ثابتة تتحقق دائماً عند تحقق الشرط.",
      },
      {
        en: "First Conditional uses Present Simple in the if-clause and will / can / may / might / should or an imperative in the main clause for realistic future outcomes.",
        ar: "تستخدم الشرطية الأولى المضارع البسيط في جملة الشرط، وwill أو can أو may أو صيغة الأمر في جواب الشرط للتعبير عن نتائج مستقبلية واقعية.",
      },
      {
        en: "Never use 'will' directly inside the if-clause, unless-clause, or future time clauses (when, as soon as, before, after, until).",
        ar: "لا تستخدم will داخل جملة الشرط بعد if أو unless أو أدوات الزمن المستقبلية (when, as soon as, before, after, until) مطلقاً.",
      },
      {
        en: "'Unless' means 'if ... not' and is followed by a positive verb; put a comma when the condition clause comes first, and omit it when the main clause comes first.",
        ar: "تعني unless «إذا لم» ويتبعها فعل مثبت؛ ونضع فاصلة إذا بدأت الجملة بجملة الشرط ونحذفها إذا تقدم جواب الشرط.",
      },
    ],
    examples: [
      {
        en: "If you heat ice above zero degrees, it melts quickly.",
        ar: "إذا سخّنت الثلج فوق الصفر المئوي، فإنه يذوب بسرعة.",
        highlight: "If you heat ice above zero degrees, it melts",
      },
      {
        en: "If it rains this evening, we will hold the workshop indoors.",
        ar: "إذا أمطرت هذا المساء، فسنعقد الورشة في الداخل.",
        highlight: "If it rains this evening, we will hold",
      },
      {
        en: "You won't catch the early train unless you leave right now.",
        ar: "لن تلحق بالقطار المبكر ما لم تغادر الآن فوراً.",
        highlight: "unless you leave",
      },
      {
        en: "Call me as soon as you arrive at the airport terminal.",
        ar: "اتصل بي بمجرد أن تصل إلى صالة المطار.",
        highlight: "as soon as you arrive",
      },
    ],
    arabicInterferenceTip: {
      en: "In Arabic, future markers (سـ / سوف) are sometimes felt conceptually in both halves, or learners translate «إذا لم» as 'unless ... don't'. In English, never put 'will' after 'if / as soon as', and never combine 'unless' with a negative verb ('unless you don't').",
      ar: "يميل المتعلم العربي أحياناً إلى استخدام will في جملة الشرط قياساً على المعنى المستقبلي، أو ترجمة «إذا لم» بـ unless + نفي. في الإنجليزية نستخدم المضارع البسيط بعد if وas soon as، ولا نجمع بين unless والنفي أبداً.",
    },
    commonMistake: {
      wrong: "If it will rain tomorrow, unless you don't take an umbrella, you get wet.",
      right: "If it rains tomorrow, you will get wet unless you take an umbrella.",
      why: {
        en: "Use Present Simple ('rains') after 'if' for future conditions, and use an affirmative verb ('take') after 'unless' because 'unless' already carries the negative meaning.",
        ar: "نستخدم المضارع البسيط (rains) بعد if للشرط المستقبلي، ونستخدم فعلاً مثبتاً (take) بعد unless لأنها تتضمن معنى النفي أصلاً.",
      },
    },
    quickCheck: [
      {
        prompt: "Choose the correct sentence using a future time clause:",
        options: [
          "I will send you the report as soon as I will finish it.",
          "I will send you the report as soon as I finish it.",
          "I send you the report as soon as I will finish it.",
          "I would send you the report as soon as I finish it.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Future time clauses introduced by 'as soon as' require the Present Simple ('I finish'), while the main clause takes 'will'.",
          ar: "الجمل الزمنية المستقبلية بعد as soon as تتطلب المضارع البسيط (I finish)، بينما يأخذ جواب الشرط will.",
        },
      },
      {
        prompt: "Complete the sentence accurately: '___ you apologize, she won't forgive you.'",
        options: ["Unless", "If", "Unless not", "As soon as"],
        correctIndex: 0,
        explanation: {
          en: "'Unless' means 'if not', so 'Unless you apologize' = 'If you do not apologize'.",
          ar: "تعني unless «ما لم / إذا لم»، فتصبح الجملة: ما لم تعتذر فلن تسامحك.",
        },
      },
      {
        prompt: "Which sentence is a Zero Conditional expressing a general fact?",
        options: [
          "If plants don't get water, they die.",
          "If the plant doesn't get water today, it will die.",
          "If the plant didn't get water, it would die.",
          "If you water the plant, please use cold water.",
        ],
        correctIndex: 0,
        explanation: {
          en: "Both clauses are in the Present Simple ('don't get' / 'die') to express a biological fact that is always true.",
          ar: "كلا الشقين في زمن المضارع البسيط (don't get / die) للتعبير عن حقيقة علمية ثابتة.",
        },
      },
    ],
  },
  {
    id: "second-conditional",
    order: 29,
    moduleId: "conditionals-wishes",
    level: "B1",
    title: {
      en: "Second Conditional (Unreal Present & Future)",
      ar: "الجملة الشرطية الثانية (الحاضر والمستقبل غير الحقيقي)",
    },
    overview: {
      en: "Use the Second Conditional to imagine unreal, impossible, or unlikely situations in the present or future, and to give polite advice with 'If I were you'. Although the verb in the if-clause looks like the Past Simple, its meaning is hypothetical present or future—not past time.",
      ar: "تُستخدم الجملة الشرطية الثانية لتخيل مواقف غير حقيقية أو مستحيلة أو غير محتملة في الحاضر أو المستقبل، وكذلك لتقديم النصائح المهذبة بعبارة If I were you. ورغم أن الفعل في جملة الشرط يأتي بصيغة الماضي البسيط، فإن معناه افتراضي للحاضر أو المستقبل وليس للماضي.",
    },
    formula: "If + Past Simple (or were), Subject + would / could / might + Base Verb",
    forms: {
      affirmative: "If I had more free time, I would learn Japanese.",
      negative: "If she didn't live so far away, we would visit her more often.",
      question: "Where would you travel if you won a free ticket?",
    },
    rules: [
      {
        en: "Use Past Simple in the if-clause to signal unreality or low probability, and 'would / could / might + base verb' in the result clause.",
        ar: "نستخدم الماضي البسيط في جملة الشرط للدلالة على الافتراض أو ضعف الاحتمال، ونستخدم would / could / might + المصدر في جواب الشرط.",
      },
      {
        en: "In formal English and fixed advice phrases ('If I were you'), use 'were' instead of 'was' for all subjects (I, he, she, it).",
        ar: "في الإنجليزية الرسمية وعبارة النصيحة الثابتة (If I were you)، نستخدم were بدلاً من was مع جميع الضمائر المفردة.",
      },
      {
        en: "Use 'could' for hypothetical ability or permission, and 'might' for uncertain hypothetical results.",
        ar: "نستخدم could للتعبير عن القدرة الافتراضية، وmight للتعبير عن نتيجة افتراضية غير مؤكدة.",
      },
      {
        en: "Never put 'would' inside the if-clause of a standard Second Conditional; reserve 'would' for the main clause.",
        ar: "لا نضع would داخل جملة الشرط في الشرطية الثانية القياسية، بل نقتصر على وضعها في جواب الشرط.",
      },
    ],
    examples: [
      {
        en: "If I knew her phone number, I would call her right now.",
        ar: "لو كنت أعرف رقم هاتفها لاتصلت بها الآن.",
        highlight: "If I knew her phone number, I would call",
      },
      {
        en: "If I were you, I would accept that scholarship immediately.",
        ar: "لو كنت مكانك لقبلت تلك المنحة الدراسية فوراً.",
        highlight: "If I were you, I would accept",
      },
      {
        en: "We could launch the app sooner if we had two more developers.",
        ar: "يمكننا إطلاق التطبيق أبكر لو كان لدينا مطوّران إضافيان.",
        highlight: "could launch the app sooner if we had",
      },
      {
        en: "If he didn't work night shifts, he might join our evening club.",
        ar: "لو لم يكن يعمل في نوبات ليلية، فربما ينضم إلى نادينا المسائي.",
        highlight: "If he didn't work night shifts, he might join",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic uses «لو» with a past-form verb for both hypothetical present and unreal past, so learners often confuse Second and Third Conditionals or insert 'would' after 'if'. Remember: Second Conditional ('If + Past Simple, would + V1') is strictly about NOW or the FUTURE, never the past.",
      ar: "تستخدم العربية «لو» مع الفعل الماضي لكل من الحاضر الافتراضي والماضي المستحيل، لذا قد يخلط المتعلم بين الشرطية الثانية والثالثة أو يضع would بعد if. تذكر أن الشرطية الثانية تخص الحاضر أو المستقبل الافتراضي فقط، وليس الماضي.",
    },
    commonMistake: {
      wrong: "If I would have a car, I would drive to work every day.",
      right: "If I had a car, I would drive to work every day.",
      why: {
        en: "The if-clause takes the Past Simple ('had'), not 'would have'; 'would' belongs only in the result clause.",
        ar: "تأخذ جملة الشرط صيغة الماضي البسيط (had) وليس would have؛ فكلمة would تأتي في جواب الشرط فقط.",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the polite advice: 'If I ___ you, I would double-check the contract.'",
        options: ["am", "was being", "were", "would be"],
        correctIndex: 2,
        explanation: {
          en: "'If I were you' is the standard subjunctive Second Conditional form used to give advice.",
          ar: "تُعد عبارة If I were you الصيغة القياسية في الشرطية الثانية لتقديم النصيحة.",
        },
      },
      {
        prompt: "What is the time reference of 'If she spoke Spanish, she could apply for the Madrid role'?",
        options: [
          "A real habit in the past",
          "An unreal situation in the present",
          "A completed regret in the past",
          "A guaranteed future event",
        ],
        correctIndex: 1,
        explanation: {
          en: "Even though 'spoke' is Past Simple in form, the Second Conditional describes an unreal situation in the present (she does not speak Spanish now).",
          ar: "رغم أن spoke بصيغة الماضي شكلاً، فإن الشرطية الثانية تصف موقفاً غير حقيقي في الحاضر (هي لا تتحدث الإسبانية الآن).",
        },
      },
      {
        prompt: "Choose the grammatically correct Second Conditional:",
        options: [
          "If they wouldn't live far away, we would meet weekly.",
          "If they don't live far away, we would meet weekly.",
          "If they didn't live far away, we would meet weekly.",
          "If they didn't lived far away, we would meet weekly.",
        ],
        correctIndex: 2,
        explanation: {
          en: "Negative Past Simple in the if-clause is 'didn't + base verb' ('didn't live'), paired with 'would + base verb'.",
          ar: "نفي الماضي البسيط في جملة الشرط هو didn't + الفعل المجرد (didn't live) مقترناً بـ would + المصدر.",
        },
      },
    ],
  },
  {
    id: "third-conditional",
    order: 30,
    moduleId: "conditionals-wishes",
    level: "B2",
    title: {
      en: "Third Conditional (Unreal Past & Regrets)",
      ar: "الجملة الشرطية الثالثة (الماضي غير الحقيقي والندم)",
    },
    overview: {
      en: "Use the Third Conditional to talk about imaginary situations in the past that did not happen, along with their imagined past consequences. It is the primary English structure for expressing regret, relief, criticism, and historical 'what-ifs'.",
      ar: "تُستخدم الجملة الشرطية الثالثة للحديث عن مواقف خيالية في الماضي لم تحدث فعلياً وعن نتائجها المفترضة في الماضي. وهي البنية الأساسية في الإنجليزية للتعبير عن الندم والارتياح والنقد وتخيل بدائل لما مضى.",
    },
    formula: "If + Past Perfect (had + V3), Subject + would / could / might + have + V3",
    forms: {
      affirmative: "If they had left earlier, they would have caught the ferry.",
      negative: "If I hadn't forgotten my notes, I wouldn't have struggled in the presentation.",
      question: "What would you have done if you had seen the warning sign?",
    },
    rules: [
      {
        en: "Both clauses refer strictly to the past—the condition cannot be changed anymore because the event is already over.",
        ar: "يشير كلا شقي الجملة إلى الماضي حصراً، ولا يمكن تغيير الشرط لأن الحدث قد انتهى بالفعل.",
      },
      {
        en: "Use Past Perfect ('had + past participle') in the if-clause, and 'would / could / might + have + past participle' in the main clause.",
        ar: "نستخدم الماضي التام (had + التصريف الثالث) في جملة الشرط، وwould / could / might + have + التصريف الثالث في جواب الشرط.",
      },
      {
        en: "Use 'could have + V3' to express a missed past ability or opportunity, and 'might have + V3' for a less certain imagined past result.",
        ar: "نستخدم could have + V3 للقدرة أو الفرصة الضائعة في الماضي، وmight have + V3 لنتيجة ماضية مفترضة أقل يقيناً.",
      },
      {
        en: "In spoken English, both 'had' and 'would' contract to ''d': 'If I'd known, I'd have helped' (= If I had known, I would have helped).",
        ar: "في الإنجليزية المحكية يُختصر كل من had وwould إلى 'd، ويُعرف المقصود من السياق (بعد if يكون had وفي جواب الشرط يكون would).",
      },
    ],
    examples: [
      {
        en: "If she had backed up her files, she wouldn't have lost the thesis.",
        ar: "لو أنها أخذت نسخة احتياطية لملفاتها لما فقدت رسالتها العلمية.",
        highlight: "If she had backed up her files, she wouldn't have lost",
      },
      {
        en: "We would have arrived on time if the bridge hadn't been closed.",
        ar: "لكنا وصلنا في الوقت المحدد لو لم يكن الجسر مغلقاً.",
        highlight: "would have arrived on time if the bridge hadn't been closed",
      },
      {
        en: "If he had trained harder, he could have won the silver medal.",
        ar: "لو أنه تدرب بجد أكبر لكان بإمكانه الفوز بالميدالية الفضية.",
        highlight: "If he had trained harder, he could have won",
      },
      {
        en: "If you hadn't reminded me, I might have missed the deadline completely.",
        ar: "لو لم تذكّرني لربما فاتني الموعد النهائي تماماً.",
        highlight: "If you hadn't reminded me, I might have missed",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic expresses unreal past conditions with «لو + ماضي، لـ + ماضي» without a distinct Past Perfect auxiliary, so Arabic learners frequently drop 'had' or 'have' and write 'If I knew yesterday, I would help'. Always keep BOTH 'had + V3' and 'would have + V3' when both cause and result are in the past.",
      ar: "تعبر العربية عن الشرط الماضي المستحيل بـ «لو + ماضي» دون فعل مساعد للماضي التام، فيحذف المتعلم أحياناً had أو have ويكتب صيغة الشرطية الثانية. احرص على وجود had + V3 وwould have + V3 معاً عندما يكون السبب والنتيجة في الماضي.",
    },
    commonMistake: {
      wrong: "If I would have known about the traffic, I would have left earlier.",
      right: "If I had known about the traffic, I would have left earlier.",
      why: {
        en: "Never use 'would have' in the if-clause; the if-clause of a Third Conditional must be Past Perfect ('had known').",
        ar: "لا نستخدم would have في جملة الشرط أبداً؛ بل يجب أن تكون جملة الشرط في الماضي التام (had known).",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the Third Conditional: 'If we ___ the map, we wouldn't have gotten lost.'",
        options: ["checked", "had checked", "would check", "would have checked"],
        correctIndex: 1,
        explanation: {
          en: "The if-clause of a Third Conditional requires the Past Perfect ('had checked').",
          ar: "تتطلب جملة الشرط في الشرطية الثالثة زمن الماضي التام (had checked).",
        },
      },
      {
        prompt: "What does ''d' stand for in 'If he'd listened, he'd have avoided the fine'?",
        options: [
          "would / had",
          "had / would",
          "did / would",
          "had / did",
        ],
        correctIndex: 1,
        explanation: {
          en: "In the if-clause, ''d + V3' is 'had' ('he had listened'); in the main clause, ''d + have + V3' is 'would' ('he would have avoided').",
          ar: "في جملة الشرط يختصر 'd الفعل had، وفي جواب الشرط يختصر الفعل would.",
        },
      },
      {
        prompt: "Which sentence expresses an unreal past regret?",
        options: [
          "If I studied harder, I would pass.",
          "If I study harder, I will pass.",
          "If I had studied harder, I would have passed.",
          "If I had studied harder, I will pass.",
        ],
        correctIndex: 2,
        explanation: {
          en: "'If + Past Perfect, would have + V3' expresses a regret about a completed past event.",
          ar: "صيغة If + الماضي التام، would have + التصريف الثالث هي التي تعبر عن الندم على حدث ماضٍ منتهٍ.",
        },
      },
    ],
  },
  {
    id: "mixed-conditionals",
    order: 31,
    moduleId: "conditionals-wishes",
    level: "C1",
    title: {
      en: "Mixed Conditionals (Past Cause → Present Result & Vice Versa)",
      ar: "الجمل الشرطية المختلطة (سبب ماضٍ ← نتيجة حاضرة والعكس)",
    },
    overview: {
      en: "Mixed conditionals combine two different time frames in one unreal sentence. Type A links an unreal past condition to its present result, while Type B links a continuing unreal present state to how a past event would have unfolded differently.",
      ar: "تجمع الجمل الشرطية المختلطة بين زمنين مختلفين في جملة افتراضية واحدة. يربط النوع الأول بين شرط ماضٍ غير حقيقي ونتيجته في الحاضر، بينما يربط النوع الثاني بين حالة حاضرة دائمة غير حقيقية وأثرها المفترض في حدث ماضٍ.",
    },
    formula:
      "Past → Present: If + had + V3, would + V1 (now) | Present → Past: If + Past Simple, would have + V3 (then)",
    forms: {
      affirmative: "If I had accepted that job in London, I would be living there now.",
      negative: "If she weren't afraid of flying, she would have joined us in Rome last summer.",
      question: "Where would you be today if you hadn't changed your major?",
    },
    rules: [
      {
        en: "Past Condition → Present Result (3rd + 2nd): Use 'If + Past Perfect' for the past action and 'would / could / might + base verb (or be + -ing)' for the present consequence.",
        ar: "سبب ماضٍ ← نتيجة حاضرة (ثالثة + ثانية): نستخدم الماضي التام في جملة الشرط وwould + المصدر (أو be + -ing) للنتيجة الحالية.",
      },
      {
        en: "Present State → Past Result (2nd + 3rd): Use 'If + Past Simple' for an ongoing trait or current fact and 'would / could / might + have + V3' for the past outcome.",
        ar: "حالة حاضرة ← نتيجة ماضية (ثانية + ثالثة): نستخدم الماضي البسيط لصفة دائمة أو واقع حالي وwould have + التصريف الثالث للنتيجة الماضية.",
      },
      {
        en: "Time markers like 'now', 'today', 'still' signal a present result, while 'yesterday', 'last year', 'then' signal a past result.",
        ar: "تساعد الظروف الزمنية مثل now وtoday وstill على تمييز النتيجة الحاضرة، بينما تشير yesterday وlast year إلى نتيجة ماضية.",
      },
      {
        en: "Both mixed types describe counterfactual reality—neither the condition nor the result actually matches real life.",
        ar: "يعبر كلا النوعين المختلطين عن واقع مخالف للحقيقة، فكل من الشرط والنتيجة افتراضيان غير متحققين.",
      },
    ],
    examples: [
      {
        en: "If we had invested in solar panels five years ago, our electricity bills would be much lower now.",
        ar: "لو استثمرنا في الألواح الشمسية قبل خمس سنوات لكانت فواتير الكهرباء لدينا أقل بكثير الآن.",
        highlight: "would be much lower now",
      },
      {
        en: "If he had slept well last night, he wouldn't feel so exhausted today.",
        ar: "لو أنه نام جيداً الليلة الماضية لما شعر بكل هذا الإرهاق اليوم.",
        highlight: "wouldn't feel so exhausted today",
      },
      {
        en: "If I spoke fluent German, I would have applied for the Munich fellowship last month.",
        ar: "لو كنت أتحدث الألمانية بطلاقة لتقدمت لزمالة ميونخ الشهر الماضي.",
        highlight: "If I spoke fluent German, I would have applied",
      },
      {
        en: "If they weren't so careless, they wouldn't have lost the signed contract yesterday.",
        ar: "لو لم يكونوا مهملين إلى هذا الحد لما أضاعوا العقد الموقّع أمس.",
        highlight: "If they weren't so careless, they wouldn't have lost",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic relies heavily on context and adverbs (الآن / أمس) rather than distinct auxiliary shifts to separate past vs. present consequences in «لو» sentences. In English, you must explicitly check the time of EACH clause separately: Past = had + V3 / would have + V3; Present = Past Simple / would + V1.",
      ar: "تعتمد العربية على السياق والظروف الزمنية (الآن / أمس) دون تغيير الأفعال المساعدة في جمل «لو». أما في الإنجليزية فيجب فحص زمن كل شق على حدة: الماضي يأخذ had + V3 أو would have + V3، والحاضر يأخذ الماضي البسيط أو would + المصدر.",
    },
    commonMistake: {
      wrong: "If I had taken that medicine yesterday, I would have felt better right now.",
      right: "If I had taken that medicine yesterday, I would feel better right now.",
      why: {
        en: "Because 'right now' points to a present result, the main clause must use 'would + base verb' ('would feel'), not 'would have felt'.",
        ar: "لأن عبارة right now تشير إلى نتيجة في الحاضر، يجب أن يكون جواب الشرط would + المصدر (would feel) وليس would have felt.",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the Past → Present mixed conditional: 'If she had saved her money, she ___ in debt today.'",
        options: [
          "wouldn't have been",
          "wouldn't be",
          "won't be",
          "isn't",
        ],
        correctIndex: 1,
        explanation: {
          en: "The condition is past ('had saved'), but the result is present ('today'), so use 'wouldn't be'.",
          ar: "الشرط في الماضي (had saved) لكن النتيجة في الحاضر (today)، لذا نستخدم wouldn't be.",
        },
      },
      {
        prompt: "Complete the Present → Past mixed conditional: 'If Ali ___ better at math, he would have solved that problem during yesterday's test.'",
        options: ["had been", "is", "were", "would be"],
        correctIndex: 2,
        explanation: {
          en: "Ali's general math ability is an ongoing present state ('were'), which affected a past test ('would have solved').",
          ar: "مستوى علي في الرياضيات حالة حاضرة مستمرة (were) أثّرت على نتيجة امتحان الأمس (would have solved).",
        },
      },
      {
        prompt: "Which sentence correctly links a past mistake to a present continuous state?",
        options: [
          "If I hadn't missed the flight, I would be sitting on the beach right now.",
          "If I didn't miss the flight, I would be sitting on the beach right now.",
          "If I hadn't missed the flight, I would have sat on the beach right now.",
          "If I hadn't missed the flight, I am sitting on the beach right now.",
        ],
        correctIndex: 0,
        explanation: {
          en: "'Hadn't missed' (past action) + 'would be sitting ... right now' (present action in progress) is a textbook mixed conditional.",
          ar: "الجمع بين hadn't missed (حدث ماضٍ) وwould be sitting ... right now (حدث مستمر الآن) هو الصيغة الدقيقة للشرطية المختلطة.",
        },
      },
    ],
  },
  {
    id: "wishes-regrets-preferences",
    order: 32,
    moduleId: "conditionals-wishes",
    level: "B2",
    title: {
      en: "Wishes, Regrets & Preferences (wish / if only / would rather / it's time)",
      ar: "التمني والندم والتفضيل (wish / if only / would rather / it's time)",
    },
    overview: {
      en: "English shifts verbs one tense backward after 'wish', 'if only', 'would rather' (with a different subject), and 'it's high time' to signal that reality does not match our desire. Choosing between Past Simple, Past Perfect, and 'would' depends on whether you are wishing about the present, regretting the past, or complaining about someone's behavior.",
      ar: "ترجع الإنجليزية بالفعل درجة زمنية للخلف بعد wish وif only وwould rather (عند اختلاف الفاعل) وit's high time للدلالة على مخالفة الواقع للرغبة. ويعتمد الاختيار بين الماضي البسيط والماضي التام وwould على كون التمني يخص الحاضر أو الندم على الماضي أو التذمر من سلوك الآخرين.",
    },
    formula:
      "Wish / If only + Past Simple (present) | + Past Perfect (past regret) | + would + V1 (annoyance) | It's (high) time + Subject + Past Simple",
    forms: {
      affirmative: "I wish I lived closer to the sea.",
      negative: "If only I hadn't spoken so harshly yesterday.",
      question: "Don't you wish the meeting would end on time?",
    },
    rules: [
      {
        en: "Use 'wish / if only + Past Simple (or were)' to express dissatisfaction with a present state ('I wish I had more patience').",
        ar: "نستخدم wish / if only + الماضي البسيط (أو were) للتعبير عن تمني تغيير حالة حاضرة.",
      },
      {
        en: "Use 'wish / if only + Past Perfect (had + V3)' to express regret about a completed past action ('If only we had booked earlier').",
        ar: "نستخدم wish / if only + الماضي التام (had + V3) للتعبير عن الندم على أمر حدث أو لم يحدث في الماضي.",
      },
      {
        en: "Use 'wish + someone/something + would + base verb' to complain about annoying habits or wish for external change—never use 'I wish I would...'.",
        ar: "نستخدم wish + فاعل آخر + would + المصدر للتذمر من سلوك مزعج أو طلب تغييره، ولا نستخدم would مع نفس الفاعل (لا نقول I wish I would).",
      },
      {
        en: "Use 'would rather + base verb' for your own preference ('I'd rather stay'), 'would rather + Subject + Past Simple' for someone else's action ('I'd rather you stayed'), and 'It's (high) time + Subject + Past Simple' for something overdue.",
        ar: "نستخدم would rather + المصدر لتفضيلك الشخصي، وwould rather + فاعل آخر + الماضي البسيط لتفضيل ما يفعله غيرك، وIt's (high) time + فاعل + الماضي البسيط لأمر تأخر وقته.",
      },
    ],
    examples: [
      {
        en: "I wish I could speak three languages effortlessly.",
        ar: "أتمنى لو كنت أستطيع التحدث بثلاث لغات بسهولة.",
        highlight: "wish I could speak",
      },
      {
        en: "If only we hadn't ignored the mechanic's warning last week!",
        ar: "يا ليتنا لم نتجاهل تحذير الميكانيكي الأسبوع الماضي!",
        highlight: "If only we hadn't ignored",
      },
      {
        en: "I wish the neighbors would stop playing loud music at midnight.",
        ar: "أتمنى لو يتوقف الجيران عن تشغيل الموسيقى الصاخبة منتصف الليل.",
        highlight: "wish the neighbors would stop",
      },
      {
        en: "It's high time you updated your résumé, and I'd rather you didn't wait until Monday.",
        ar: "لقد حان الوقت منذ زمن لتحديث سيرتك الذاتية، وأفضل ألا تنتظر حتى يوم الإثنين.",
        highlight: "It's high time you updated",
      },
    ],
    arabicInterferenceTip: {
      en: "In Arabic, «أتمنى أن...» takes a present subjunctive verb, leading learners to say 'I wish I have a car' or 'I wish to go' when they mean 'hope'. Use 'hope + present/future' for realistic possibilities ('I hope you pass'), and 'wish + past' for unreal desires ('I wish I were taller').",
      ar: "في العربية يتبع «أتمنى أن» فعل مضارع، فيخطئ المتعلم بقول I wish I have. تذكر الفرق الجوهري: نستخدم hope + مضارع/مستقبل للأمل الممكن تحققه، بينما نستخدم wish + صيغة ماضي للتمني المخالف للواقع.",
    },
    commonMistake: {
      wrong: "I wish I would be taller, and it's time we go home.",
      right: "I wish I were taller, and it's time we went home.",
      why: {
        en: "Do not use 'would' with the same subject ('I wish I would') or with stative qualities like height; and 'it's time + subject' requires the Past Simple ('went').",
        ar: "لا نستخدم would مع نفس الفاعل ولا مع الصفات الثابتة، كما أن عبارة it's time + فاعل تتطلب الفعل في الماضي البسيط (went).",
      },
    },
    quickCheck: [
      {
        prompt: "Express regret about something you did last night: 'I wish I ___ so much coffee last night.'",
        options: [
          "didn't drink",
          "wouldn't drink",
          "hadn't drunk",
          "don't drink",
        ],
        correctIndex: 2,
        explanation: {
          en: "Past regrets after 'wish' always use the Past Perfect ('hadn't drunk').",
          ar: "الندم على الماضي بعد wish يستخدم دائماً زمن الماضي التام (hadn't drunk).",
        },
      },
      {
        prompt: "Which sentence correctly complains about a colleague's annoying habit?",
        options: [
          "I wish he stops interrupting me during meetings.",
          "I wish he would stop interrupting me during meetings.",
          "I wish I would stop interrupting him.",
          "I hope he stopped interrupting me.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Use 'wish + different subject + would + base verb' to express irritation and desire for a change in someone else's behavior.",
          ar: "نستخدم wish + فاعل مختلف + would + المصدر للتذمر من سلوك مزعج لشخص آخر.",
        },
      },
      {
        prompt: "Choose the correct preference about another person's action: 'I'd rather you ___ anyone about this yet.'",
        options: ["don't tell", "not tell", "didn't tell", "won't tell"],
        correctIndex: 2,
        explanation: {
          en: "When 'would rather' introduces a different subject ('you'), English uses the Past Simple ('didn't tell') for a present or future preference.",
          ar: "عندما يأتي بعد would rather فاعل مختلف (you)، نستخدم الماضي البسيط (didn't tell) للتعبير عن تفضيل في الحاضر أو المستقبل.",
        },
      },
    ],
  },

  // =========================================================================
  // MODULE 6: Reported Speech (Orders 33–35)
  // =========================================================================
  {
    id: "reported-statements-backshift",
    order: 33,
    moduleId: "reported-speech",
    level: "B1",
    title: {
      en: "Reported Statements & Tense Backshift Rules",
      ar: "الكلام المنقول للجمل الخبرية وقواعد تراجع الأزمنة",
    },
    overview: {
      en: "Reported (indirect) speech relays what someone said without quoting their exact words. When the reporting verb is in the past ('said', 'told'), tenses normally shift one step back, while pronouns, possessives, and time/place expressions adjust to the reporter's perspective.",
      ar: "ينقل الكلام غير المباشر مضمون ما قاله شخص ما دون اقتباس كلماته حرفياً. وعندما يكون فعل النقل في الماضي (said / told)، تتراجع الأزمنة عادة درجة واحدة للخلف، وتتغير الضمائر وظروف الزمان والمكان لتتوافق مع منظور الناقل.",
    },
    formula:
      "Subject + said (that) / told + Object (that) + Backshifted Clause (Present → Past → Past Perfect; will → would; can → could)",
    forms: {
      affirmative: "She said (that) she was preparing the slides.",
      negative: "He told me (that) he hadn't received the parcel.",
      question: "Did she say (that) the team would finish by Friday?",
    },
    rules: [
      {
        en: "Use 'tell' with a personal object ('told me / told us'), and 'say' without a direct personal object ('said that...' or 'said to me that...').",
        ar: "يحتاج الفعل tell إلى مفعول به شخصي مباشر (told me)، بينما يأتي say بدون مفعول شخصي مباشر (said that أو said to me).",
      },
      {
        en: "Standard tense backshift after a past reporting verb: Present Simple → Past Simple; Present Continuous → Past Continuous; Present Perfect / Past Simple → Past Perfect; will → would; can → could; must → had to.",
        ar: "تراجع الأزمنة القياسي بعد فعل نقل ماضٍ: المضارع البسيط ← ماضي بسيط؛ المضارع المستمر ← ماضي مستمر؛ المضارع التام/الماضي البسيط ← ماضي تام؛ will ← would؛ can ← could؛ must ← had to.",
      },
      {
        en: "Adjust deictic words to match the reporting moment: today → that day, yesterday → the day before, tomorrow → the next/following day, now → then, here → there, this → that.",
        ar: "نعدّل عبارات الزمان والمكان حسب لحظة النقل: today ← that day، وyesterday ← the day before، وtomorrow ← the next day، وhere ← there.",
      },
      {
        en: "No backshift is required when the reporting verb is present ('She says she is tired') or when the reported statement is a permanent fact still true now ('He explained that water boils at 100°C').",
        ar: "لا نُرجع الزمن للخلف إذا كان فعل النقل مضارعاً (She says) أو إذا كانت الجملة المنقولة حقيقة علمية ثابتة ما زالت صحيحة الآن.",
      },
    ],
    examples: [
      {
        en: "Direct: 'I am working on the budget today.' → Reported: She said she was working on the budget that day.",
        ar: "مباشر: «أنا أعمل على الميزانية اليوم». ← منقول: قالت إنها كانت تعمل على الميزانية في ذلك اليوم.",
        highlight: "was working on the budget that day",
      },
      {
        en: "Direct: 'We have finished the audit.' → Reported: They told us they had finished the audit.",
        ar: "مباشر: «لقد أنهينا التدقيق». ← منقول: أخبرونا أنهم كانوا قد أنهوا التدقيق.",
        highlight: "told us they had finished",
      },
      {
        en: "Direct: 'I will call you tomorrow.' → Reported: Omar promised that he would call me the next day.",
        ar: "مباشر: «سأتصل بك غداً». ← منقول: وعد عمر بأنه سيتصل بي في اليوم التالي.",
        highlight: "would call me the next day",
      },
      {
        en: "Direct: 'The Earth orbits the Sun.' → Reported: The teacher reminded us that the Earth orbits the Sun.",
        ar: "مباشر: «الأرض تدور حول الشمس». ← منقول: ذكّرنا المعلم بأن الأرض تدور حول الشمس.",
        highlight: "that the Earth orbits the Sun",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic does NOT backshift verb tenses in reported speech («قال إنه سيسافر غداً» stays future) and uses «قال لي» which learners literally translate as 'said me'. Always distinguish 'told me' vs. 'said (to me)' and apply tense backshift when reporting past speech.",
      ar: "لا تُرجع العربية الأزمنة للخلف في الكلام المنقول، كما أن ترجمة «قال لي» حرفياً تدفع البعض لقول said me. تذكر دائماً: نستخدم told me أو said to me، ونُرجع الزمن درجة للخلف بعد فعل النقل الماضي.",
    },
    commonMistake: {
      wrong: "He said me that he will come yesterday.",
      right: "He told me that he would come the day before.",
      why: {
        en: "'Say' cannot take a direct personal object ('told me' or 'said to me'), 'will' backshifts to 'would', and 'yesterday' shifts to 'the day before'.",
        ar: "لا يأخذ say مفعولاً شخصياً مباشراً (بل told me)، وتتراجع will إلى would، وتتغير yesterday إلى the day before.",
      },
    },
    quickCheck: [
      {
        prompt: "Convert to reported speech: Mona said, 'I have never visited Cairo.'",
        options: [
          "Mona said she never visited Cairo.",
          "Mona said she has never visited Cairo.",
          "Mona said she had never visited Cairo.",
          "Mona told she had never visited Cairo.",
        ],
        correctIndex: 2,
        explanation: {
          en: "Present Perfect ('have never visited') backshifts to Past Perfect ('had never visited'), and 'said' is used without an object.",
          ar: "يتراجع المضارع التام (have never visited) إلى الماضي التام (had never visited)، واستُخدمت said بشكل صحيح دون مفعول به.",
        },
      },
      {
        prompt: "Choose the correct reporting verb: 'The manager ___ the staff that the deadline had been extended.'",
        options: ["said", "told", "spoke", "talked"],
        correctIndex: 1,
        explanation: {
          en: "'Tell' is followed directly by the listener ('the staff') without 'to'.",
          ar: "يأتي بعد tell المستمع مباشرة (the staff) دون حرف الجر to.",
        },
      },
      {
        prompt: "Convert to reported speech: 'I can help you next week,' he said to Layla.",
        options: [
          "He told Layla he can help her the following week.",
          "He told Layla he could help her the following week.",
          "He said Layla he could help her next week.",
          "He told to Layla he could help her the following week.",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Can' backshifts to 'could', 'you' becomes 'her', and 'next week' shifts to 'the following week' with 'told Layla'.",
          ar: "تتراجع can إلى could، ويتغير الضمير إلى her، وnext week إلى the following week مع told Layla.",
        },
      },
    ],
  },
  {
    id: "reported-questions",
    order: 34,
    moduleId: "reported-speech",
    level: "B2",
    title: {
      en: "Reported Questions (if / whether & Statement Word Order)",
      ar: "الأسئلة المنقولة (if / whether وترتيب الجملة الخبرية)",
    },
    overview: {
      en: "When reporting a question, you turn the question into a statement inside a larger sentence. That means keeping Subject + Verb word order, dropping the auxiliary 'do/does/did', using 'if' or 'whether' for Yes/No questions, and ending with a period rather than a question mark.",
      ar: "عند نقل سؤال إلى الكلام غير المباشر، يتحول السؤال إلى جملة خبرية داخل جملة أكبر؛ أي نعيد الترتيب إلى (فاعل + فعل)، ونحذف الفعل المساعد do/does/did، ونستخدم if أو whether مع أسئلة «هل»، وننهي الجملة بنقطة لا بعلامة استفهام.",
    },
    formula:
      "Yes/No: Subject + asked (+ Obj) + if / whether + Subject + Verb | Wh-: Subject + asked (+ Obj) + Wh-word + Subject + Verb",
    forms: {
      affirmative: "She asked me where I lived.",
      negative: "He asked whether I hadn't received the invitation.",
      question: "Did the interviewer ask if you could start in June?",
    },
    rules: [
      {
        en: "Always restore affirmative statement word order (Subject BEFORE Verb) in reported questions: 'asked where she was going', NOT 'asked where was she going'.",
        ar: "أعد دائماً ترتيب الجملة الخبرية (الفاعل قبل الفعل) في الأسئلة المنقولة: asked where she was going وليس where was she going.",
      },
      {
        en: "Delete the question auxiliaries 'do / does / did' and put the main verb directly into its backshifted past tense.",
        ar: "احذف الأفعال المساعدة do / does / did الخاصة بالسؤال وضع الفعل الرئيسي مباشرة في زمنه المتراجع.",
      },
      {
        en: "Introduce Yes/No reported questions with 'if' or 'whether'; prefer 'whether' when presenting two alternatives ('whether ... or not') or in formal contexts.",
        ar: "نربط أسئلة نعم/لا بـ if أو whether، ونفضل whether عند ذكر خيارين (whether ... or not) أو في السياقات الرسمية.",
      },
      {
        en: "The same statement word order rule applies to polite embedded questions like 'Could you tell me where the station is?' and 'I wonder what time the train leaves.'",
        ar: "تنطبق قاعدة ترتيب الجملة الخبرية نفسها على الأسئلة المهذبة المدمجة مثل Could you tell me where the station is?.",
      },
    ],
    examples: [
      {
        en: "Direct: 'Where do you work?' → Reported: She asked me where I worked.",
        ar: "مباشر: «أين تعمل؟» ← منقول: سألتني أين أعمل.",
        highlight: "where I worked",
      },
      {
        en: "Direct: 'Have you seen my keys?' → Reported: He asked if I had seen his keys.",
        ar: "مباشر: «هل رأيت مفاتيحي؟» ← منقول: سألني ما إذا كنت قد رأيت مفاتيحه.",
        highlight: "if I had seen his keys",
      },
      {
        en: "Direct: 'Will the flight depart on time or be delayed?' → Reported: The passenger asked whether the flight would depart on time or be delayed.",
        ar: "مباشر: «هل ستقلع الرحلة في موعدها أم ستتأخر؟» ← منقول: سأل المسافر ما إذا كانت الرحلة ستقلع في موعدها أم ستتأخر.",
        highlight: "whether the flight would depart",
      },
      {
        en: "Could you tell me how much this course costs?",
        ar: "هل يمكنك إخباري كم تبلغ تكلفة هذه الدورة؟",
        highlight: "how much this course costs",
      },
    ],
    arabicInterferenceTip: {
      en: "In Arabic, verb-before-subject order is natural in both direct and indirect questions («سألني أين يسكن أخي»), which causes Arabic learners to keep English subject-auxiliary inversion ('asked me where does my brother live'). Always put the subject immediately after the Wh-word or if/whether.",
      ar: "في العربية يظل تقديم الفعل على الفاعل طبيعياً في السؤال المنقول («سألني أين يسكن أخي»)، فيبقي المتعلم قلب الفعل والفاعل في الإنجليزية خطأً. احرص دائماً على وضع الفاعل مباشرة بعد أداة الاستفهام أو if/whether.",
    },
    commonMistake: {
      wrong: "She asked me what time did the library close?",
      right: "She asked me what time the library closed.",
      why: {
        en: "Remove 'did', keep statement order ('the library closed'), and end with a period because the overall sentence is a statement.",
        ar: "نحذف did، ونضع الفاعل قبل الفعل (the library closed)، وننهي الجملة بنقطة لأنها جملة خبرية.",
      },
    },
    quickCheck: [
      {
        prompt: "Report the question: 'Why are you laughing?' he asked.",
        options: [
          "He asked why was I laughing.",
          "He asked why I was laughing.",
          "He asked why am I laughing.",
          "He asked did I laugh.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Use statement order ('I was laughing') and backshift 'are' to 'was'.",
          ar: "نستخدم ترتيب الجملة الخبرية (I was laughing) ونُرجع are إلى was.",
        },
      },
      {
        prompt: "Report the Yes/No question: 'Did you lock the front door?' she asked.",
        options: [
          "She asked if had I locked the front door.",
          "She asked did I lock the front door.",
          "She asked whether I had locked the front door.",
          "She asked that I locked the front door.",
        ],
        correctIndex: 2,
        explanation: {
          en: "Yes/No questions use 'if/whether' + Subject + backshifted Past Perfect ('had locked'), never 'that' or inversion.",
          ar: "تأخذ أسئلة نعم/لا أداة الربط if/whether + الفاعل + الماضي التام (had locked) دون قلب ودون that.",
        },
      },
      {
        prompt: "Choose the correct polite embedded question:",
        options: [
          "Do you know where is the nearest pharmacy?",
          "Do you know where does the nearest pharmacy is?",
          "Do you know where the nearest pharmacy is?",
          "Do you know is where the nearest pharmacy?",
        ],
        correctIndex: 2,
        explanation: {
          en: "After 'Do you know', the embedded clause uses statement order ('the nearest pharmacy is').",
          ar: "بعد Do you know تأتي الجملة الفرعية بترتيب الجملة الخبرية (the nearest pharmacy is).",
        },
      },
    ],
  },
  {
    id: "reported-commands-reporting-verbs",
    order: 35,
    moduleId: "reported-speech",
    level: "B2",
    title: {
      en: "Reported Commands, Requests & Reporting Verbs (suggest / advise / deny / insist)",
      ar: "الأوامر والطلبات المنقولة وأفعال النقل (suggest / advise / deny / insist)",
    },
    overview: {
      en: "Instead of repeating 'said' and 'told', advanced English uses precise reporting verbs that capture the speaker's intent—commanding, advising, promising, denying, suggesting, or insisting. Each reporting verb strictly governs its own grammatical pattern (to-infinitive, object + to-infinitive, gerund, or preposition + gerund).",
      ar: "بدلاً من تكرار said وtold، تستخدم الإنجليزية المتقدمة أفعال نقل دقيقة تعكس نية المتحدث كالأمر والنصح والوعد والإنكار والاقتراح والإصرار. ويتطلب كل فعل نقل بنية نحوية محددة بعده (المصدر مع to، أو مفعول + المصدر، أو صيغة -ing، أو حرف جر + -ing).",
    },
    formula:
      "tell / ask / advise / warn + Obj + (not) to + V1 | offer / promise / refuse + to + V1 | suggest / deny / admit + V-ing | insist on / apologize for + V-ing",
    forms: {
      affirmative: "The doctor advised me to get more sleep.",
      negative: "The coach warned us not to skip the warm-up.",
      question: "Did she suggest postponing the launch until May?",
    },
    rules: [
      {
        en: "Commands and requests use 'tell / order / ask / beg / warn / advise / remind + Object + (not) to + base verb'. Notice 'not' comes BEFORE 'to'.",
        ar: "تُصاغ الأوامر والطلبات بـ tell / ask / warn / advise + المفعول + (not) to + المصدر، وتأتي not دائماً قبل to.",
      },
      {
        en: "Speaker-action verbs take 'to + base verb' directly without an object: agree, offer, promise, refuse, threaten ('She refused to sign').",
        ar: "تأخذ أفعال الوعد والعرض والرفض (agree, offer, promise, refuse) المصدر مع to مباشرة دون مفعول به.",
      },
      {
        en: "Gerund reporting verbs take 'V-ing' (or a 'that'-clause): suggest, recommend, deny, admit, mention. NEVER write 'suggest someone to do'.",
        ar: "تأخذ أفعال مثل suggest وrecommend وdeny وadmit صيغة V-ing (أو جملة that). لا تقل أبداً suggest someone to do.",
      },
      {
        en: "Prepositional reporting verbs lock onto a fixed preposition + V-ing: apologize for, insist on, accuse (someone) of, blame (someone) for, congratulate (someone) on.",
        ar: "تلتزم بعض أفعال النقل بحرف جر ثابت يتبعه V-ing مثل: apologize for وinsist on وaccuse ... of وcongratulate ... on.",
      },
    ],
    examples: [
      {
        en: "The security guard told the visitors not to take photographs inside the gallery.",
        ar: "أمر حارس الأمن الزوار بألا يلتقطوا صوراً داخل المعرض.",
        highlight: "told the visitors not to take",
      },
      {
        en: "She suggested taking the express train instead of driving in heavy traffic.",
        ar: "اقترحت ركوب القطار السريع بدلاً من القيادة في الزحام الشديد.",
        highlight: "suggested taking",
      },
      {
        en: "The witness denied having seen anyone near the warehouse.",
        ar: "أنكر الشاهد أنه رأى أي شخص بالقرب من المستودع.",
        highlight: "denied having seen",
      },
      {
        en: "He apologized for arriving late and insisted on paying for everyone's coffee.",
        ar: "اعتذر عن الوصول متأخراً وأصرّ على دفع ثمن القهوة للجميع.",
        highlight: "apologized for arriving late and insisted on paying",
      },
    ],
    arabicInterferenceTip: {
      en: "In Arabic, «اقترح عليه أن يذهب» mirrors 'object + to-infinitive', making 'He suggested me to go' one of the top B2 mistakes for Arab learners. Use 'He suggested going' or 'He suggested that I (should) go'—never 'suggest + person + to'.",
      ar: "تشابه العبارة العربية «اقترح عليه أن يذهب» بنية المفعول + المصدر، مما يجعل خطأ He suggested me to go شائعاً جداً. الصحيح هو He suggested going أو He suggested that I go.",
    },
    commonMistake: {
      wrong: "My mentor suggested me to apply for the internship and told me to don't hesitate.",
      right: "My mentor suggested applying for the internship and told me not to hesitate.",
      why: {
        en: "'Suggest' is followed by V-ing (or a 'that'-clause), not 'object + to'; negative infinitives always place 'not' before 'to' ('not to hesitate').",
        ar: "يتبع suggest صيغة V-ing (أو جملة that) وليس مفعولاً + to، وفي النفي توضع not قبل to دائماً (not to hesitate).",
      },
    },
    quickCheck: [
      {
        prompt: "Report the command: 'Don't touch the wet paint,' the painter said to the kids.",
        options: [
          "The painter told the kids to not touch the wet paint.",
          "The painter told the kids not to touch the wet paint.",
          "The painter told the kids don't touch the wet paint.",
          "The painter said the kids not to touch the wet paint.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Negative reported commands follow 'tell + object + not to + base verb'.",
          ar: "الأمر المنفي المنقول يتبع القاعدة: tell + المفعول + not to + المصدر.",
        },
      },
      {
        prompt: "Choose the grammatically accurate sentence with 'suggest':",
        options: [
          "She suggested us to book the hotel early.",
          "She suggested to book the hotel early.",
          "She suggested booking the hotel early.",
          "She suggested that booking the hotel early.",
        ],
        correctIndex: 2,
        explanation: {
          en: "'Suggest' takes a gerund ('booking') or a 'that'-clause ('that we book'), never 'object + to-infinitive'.",
          ar: "يأخذ الفعل suggest اسم الفعل (booking) أو جملة that، ولا يأخذ مفعولاً + to.",
        },
      },
      {
        prompt: "Complete the sentence: 'They accused the contractor ___ using low-grade materials.'",
        options: ["for", "on", "of", "to"],
        correctIndex: 2,
        explanation: {
          en: "The fixed reporting pattern is 'accuse + someone + of + V-ing'.",
          ar: "التركيب الثابت للفعل هو accuse + شخص + of + V-ing.",
        },
      },
    ],
  },

  // =========================================================================
  // MODULE 7: Clauses & Complex Sentences (Orders 36–40)
  // =========================================================================
  {
    id: "relative-clauses",
    order: 36,
    moduleId: "clauses-complex",
    level: "B1",
    title: {
      en: "Defining & Non-Defining Relative Clauses (who / which / that / whose / where)",
      ar: "جمل الوصل المعرِّفة وغير المعرِّفة (who / which / that / whose / where)",
    },
    overview: {
      en: "Relative clauses attach descriptive information to a noun using relative pronouns ('who', 'which', 'that', 'whose', 'whom') or adverbs ('where', 'when'). Defining clauses identify WHICH noun you mean and take no commas; non-defining clauses add extra bonus detail between commas and never use 'that'.",
      ar: "تربط جمل الوصل معلومات وصفية بالاسم باستخدام ضمائر الوصل (who, which, that, whose) أو ظروف الوصل (where, when). تحدد جمل الوصل المعرِّفة المقصود بالاسم ولا تأخذ فواصل، أما غير المعرِّفة فتضيف معلومة إضافية بين فاصلتين ولا يُستخدم معها that أبداً.",
    },
    formula:
      "Defining: Noun + who / which / that / whose / where + Clause (no commas) | Non-Defining: Noun, who / which / whose / where + Clause, ...",
    forms: {
      affirmative: "The architect who designed this museum won an international prize.",
      negative: "This is the laptop that didn't pass the battery test.",
      question: "Do you know the professor whose research was published in Nature?",
    },
    rules: [
      {
        en: "Use 'who/that' for people, 'which/that' for things, 'whose' for possession (people or things), 'where' for places (meaning 'in/at which'), and 'when' for times.",
        ar: "نستخدم who/that للأشخاص، وwhich/that للأشياء، وwhose للملكية، وwhere للمكان (بمعنى فيه)، وwhen للزمان.",
      },
      {
        en: "In defining relative clauses, you can omit 'who/which/that' ONLY when it is the object of the relative clause ('The book [that] I read was gripping'), NEVER when it is the subject.",
        ar: "في جملة الوصل المعرِّفة يجوز حذف who/which/that فقط إذا كان مفعولاً به، ولا يجوز حذفه أبداً إذا كان فاعلاً.",
      },
      {
        en: "In non-defining relative clauses (marked off by commas), you MUST use 'who' or 'which'—NEVER 'that'—and you can NEVER omit the relative pronoun.",
        ar: "في جملة الوصل غير المعرِّفة (بين فاصلتين) يجب استخدام who أو which ولا يُستخدم that مطلقاً، ولا يجوز حذف ضمير الوصل.",
      },
      {
        en: "Use 'where' only when the place functions adverbially ('the town where I grew up'); if the place is the object of a verb, use 'which/that' ('the town which I visited').",
        ar: "نستخدم where فقط عندما يكون المكان ظرفاً (المدينة التي نشأت فيها)، أما إذا كان مفعولاً به لفعل فنستخدم which/that (المدينة التي زرتها).",
      },
    ],
    examples: [
      {
        en: "The engineer who solved the power outage received a commendation.",
        ar: "المهندس الذي حلّ مشكلة انقطاع الكهرباء نال شهادة تقدير.",
        highlight: "who solved the power outage",
      },
      {
        en: "Riyadh, which is the capital of Saudi Arabia, hosts major global summits.",
        ar: "الرياض، وهي عاصمة المملكة العربية السعودية، تستضيف قمماً عالمية كبرى.",
        highlight: ", which is the capital of Saudi Arabia,",
      },
      {
        en: "We interviewed a candidate whose portfolio impressed the entire panel.",
        ar: "أجرينا مقابلة مع مرشحٍ أبهر ملف أعماله اللجنة بأكملها.",
        highlight: "whose portfolio impressed",
      },
      {
        en: "That is the studio where they recorded the documentary soundtrack.",
        ar: "ذلك هو الاستوديو الذي سجّلوا فيه الموسيقى التصويرية للوثائقي.",
        highlight: "where they recorded",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic relative clauses REQUIRE a resumptive pronoun («الكتاب الذي قرأته» = literally 'the book that I read IT'). In English, a resumptive pronoun is strictly ungrammatical: say 'the book that I read', NEVER 'the book that I read it'.",
      ar: "تتطلب العربية ضميراً عائداً في صلة الموصول («الكتاب الذي قرأته»)، مما يجعل المتعلم يضيف it خطأً في الإنجليزية (the book that I read it). في الإنجليزية يُحذف الضمير العائد دائماً فنقول the book that I read.",
    },
    commonMistake: {
      wrong: "My sister, that lives in Jeddah, gave me the book which I wanted to read it.",
      right: "My sister, who lives in Jeddah, gave me the book which I wanted to read.",
      why: {
        en: "Non-defining clauses between commas cannot use 'that' (use 'who' for a person), and English never adds a redundant object pronoun ('it') inside a relative clause.",
        ar: "لا يُستخدم that في جمل الوصل غير المعرِّفة بين الفواصل (نستخدم who للأشخاص)، ولا نضيف ضميراً عائداً مكرراً (it) داخل جملة الوصل.",
      },
    },
    quickCheck: [
      {
        prompt: "Choose the correct non-defining relative clause:",
        options: [
          "The museum, that opened in 2021, attracts thousands of visitors.",
          "The museum, which opened in 2021, attracts thousands of visitors.",
          "The museum, opened in 2021, attracts thousands of visitors.",
          "The museum, what opened in 2021, attracts thousands of visitors.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Non-defining clauses referring to things must use 'which' between commas, never 'that' or 'what'.",
          ar: "تتطلب جملة الوصل غير المعرِّفة لغير العاقل استخدام which بين فاصلتين، وليس that أو what.",
        },
      },
      {
        prompt: "Complete the sentence: 'This is the café ___ we first met, and that is the café ___ I recommended yesterday.'",
        options: [
          "where / which",
          "which / where",
          "where / where",
          "whose / which",
        ],
        correctIndex: 0,
        explanation: {
          en: "'We met IN the café' takes 'where', whereas 'I recommended THE CAFÉ' (direct object) takes 'which' or 'that'.",
          ar: "في الأولى المكان ظرف (التقينا فيه) فيأخذ where، وفي الثانية مفعول به مباشر لـ recommended فيأخذ which.",
        },
      },
      {
        prompt: "Identify the grammatically correct sentence without a resumptive pronoun:",
        options: [
          "The article that you sent it to me was very insightful.",
          "The article who you sent to me was very insightful.",
          "The article that you sent to me was very insightful.",
          "The article what you sent to me was very insightful.",
        ],
        correctIndex: 2,
        explanation: {
          en: "'That' already represents 'the article' as the object of 'sent', so adding 'it' is ungrammatical.",
          ar: "ينوب الضمير that عن the article بوصفه مفعولاً به للفعل sent، لذا فإن إضافة it غير صحيحة.",
        },
      },
    ],
  },
  {
    id: "reduced-relative-participle-clauses",
    order: 37,
    moduleId: "clauses-complex",
    level: "C1",
    title: {
      en: "Reduced Relative Clauses & Participle Clauses",
      ar: "جمل الوصل المختصرة وجمل اسم الفاعل واسم المفعول",
    },
    overview: {
      en: "Participle clauses make academic and professional English tighter and more elegant by replacing full relative or adverbial clauses with '-ing' (active), '-ed/V3' (passive), or 'having + V3' (earlier action). They must always share the exact same grammatical subject as the main clause to avoid dangling modifiers.",
      ar: "تجعل جمل اسم الفاعل واسم المفعول الإنجليزية الأكاديمية والمهنية أكثر إيجازاً وأناقة باختصار جمل الوصل أو الجمل الظرفية إلى صيغة -ing (للمبني للمعلوم) أو التصريف الثالث V3 (للمبني للمجهول) أو having + V3 (لحدث سابق). ويجب أن يتطابق فاعلها دائماً مع فاعل الجملة الرئيسية.",
    },
    formula:
      "Active: Noun + V-ing ... | Passive: Noun + V3 ... | Earlier Action: Having + V3 / Having been + V3, Subject + Main Verb",
    forms: {
      affirmative: "Students applying for the grant must submit two references.",
      negative: "Not knowing the shortcut, we took the coastal road.",
      question: "Did you read the guidelines published by the committee?",
    },
    rules: [
      {
        en: "Active reduced relative clauses replace 'who/which + active verb' with the present participle ('V-ing'): 'The train arriving at Platform 4' (= which is arriving).",
        ar: "في جملة الوصل المختصرة للمعلوم نحذف ضمير الوصل والفعل المساعد ونبقي على V-ing: The train arriving at Platform 4.",
      },
      {
        en: "Passive reduced relative clauses replace 'who/which + be + V3' with the past participle ('V3'): 'The bridge built in 1968' (= which was built).",
        ar: "في جملة الوصل المختصرة للمجهول نحذف ضمير الوصل وفعل الكينونة ونبقي على التصريف الثالث V3: The bridge built in 1968.",
      },
      {
        en: "Use a perfect participle ('Having + V3' active, 'Having been + V3' passive) when the participle action clearly finished BEFORE the main clause action.",
        ar: "نستخدم اسم الفاعل التام (Having + V3 للمعلوم وHaving been + V3 للمجهول) عندما يكتمل الحدث الأول قبل حدث الجملة الرئيسية.",
      },
      {
        en: "Avoid dangling participles: the subject immediately after the comma MUST be the doer (for -ing) or receiver (for V3) of the participle.",
        ar: "تجنب اسم الفاعل المعلّق: يجب أن يكون الفاعل الواقع مباشرة بعد الفاصلة هو نفسه فاعل صيغة -ing أو مفعول صيغة V3.",
      },
    ],
    examples: [
      {
        en: "Anyone wishing to reschedule should contact the registrar by Thursday.",
        ar: "ينبغي لأي شخص يرغب في إعادة الجدولة التواصل مع مكتب التسجيل بحلول الخميس.",
        highlight: "wishing to reschedule",
      },
      {
        en: "The manuscripts discovered in the cellar dated back to the fifteenth century.",
        ar: "المخطوطات المكتشفة في القبو تعود إلى القرن الخامس عشر.",
        highlight: "discovered in the cellar",
      },
      {
        en: "Having reviewed all the test results, the panel approved the new vaccine.",
        ar: "بعد مراجعة جميع نتائج الاختبارات، وافقت اللجنة على اللقاح الجديد.",
        highlight: "Having reviewed all the test results,",
      },
      {
        en: "Not realizing the microphone was live, he whispered a joke to his co-host.",
        ar: "لعدم إدراكه أن الميكروفون كان مفتوحاً، همس بنكتة لزميله المذيع.",
        highlight: "Not realizing the microphone was live,",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic frequently uses nominal phrases or «بعد أن + فعل» and does not penalize shifting subjects between clauses as strictly as English participle clauses do. Always verify that the noun right after the comma performs the '-ing' action ('Walking into the room, I noticed the smell', NOT 'Walking into the room, the smell hit me').",
      ar: "تستخدم العربية تراكيب مثل «بعد أن» دون أن يسبب اختلاف الفاعل خطأً كخطأ اسم الفاعل المعلّق في الإنجليزية. تحقق دائماً من أن الاسم الذي يلي الفاصلة مباشرة هو القائم فعلاً بحدث الـ -ing.",
    },
    commonMistake: {
      wrong: "Driving down the highway, a deer suddenly crossed in front of our car.",
      right: "Driving down the highway, we suddenly saw a deer cross in front of our car.",
      why: {
        en: "The first version implies that 'a deer' was driving down the highway! Place the actual driver ('we') right after the comma.",
        ar: "توحي الجملة الخاطئة بأن الغزال هو الذي كان يقود السيارة! يجب وضع الفاعل الحقيقي للقيادة (we) مباشرة بعد الفاصلة.",
      },
    },
    quickCheck: [
      {
        prompt: "Reduce the passive relative clause: 'The data that was collected during the survey revealed a clear trend.'",
        options: [
          "The data collecting during the survey revealed a clear trend.",
          "The data collected during the survey revealed a clear trend.",
          "The data was collected during the survey revealed a clear trend.",
          "The data having collecting during the survey revealed a clear trend.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Drop 'that was' to leave the past participle 'collected' modifying 'the data'.",
          ar: "نحذف that was ونبقي على التصريف الثالث collected لوصف the data بصيغة المبني للمجهول.",
        },
      },
      {
        prompt: "Choose the sentence WITHOUT a dangling participle:",
        options: [
          "Exhausted by the long climb, the summit finally came into view.",
          "Exhausted by the long climb, the hikers finally reached the summit.",
          "Opening the envelope, the acceptance letter fell onto the floor.",
          "Having finished the meal, the bill was brought to our table.",
        ],
        correctIndex: 1,
        explanation: {
          en: "'The hikers' were the ones exhausted by the climb, so the subject matches the participle.",
          ar: "المتنزهون (the hikers) هم المرهقون من التسلق، لذا يتطابق الفاعل مع جملة الصفة تماماً.",
        },
      },
      {
        prompt: "Complete the negative participle clause: '___ the fine print, he signed the lease immediately.'",
        options: [
          "Not reading",
          "Don't reading",
          "Not having read",
          "Didn't read",
        ],
        correctIndex: 2,
        explanation: {
          en: "'Not having read' shows that he failed to read the fine print BEFORE signing; 'not' precedes the participle.",
          ar: "تُظهر صيغة Not having read أنه لم يقرأ الشروط قبل التوقيع، وتسبق not صيغة اسم الفاعل التام.",
        },
      },
    ],
  },
  {
    id: "noun-clauses",
    order: 38,
    moduleId: "clauses-complex",
    level: "B2",
    title: {
      en: "Noun Clauses (that / what / whether / whoever)",
      ar: "الجمل الاسمية (that / what / whether / whoever)",
    },
    overview: {
      en: "A noun clause is an entire dependent clause that acts like a single noun: it can serve as the subject of a sentence, the object of a verb, the object of a preposition, or a subject complement. Mastering noun clauses unlocks formal academic writing and prevents the classic confusion between 'that' and 'what'.",
      ar: "الجملة الاسمية هي جملة فرعية كاملة تؤدي وظيفة اسم واحد؛ فيمكن أن تقع فاعلاً أو مفعولاً به لفعل أو مجرورة بحرف جر أو خبراً. وإتقانها يرتقي بالكتابة الأكاديمية ويمنع الخلط الشائع بين that وwhat.",
    },
    formula:
      "[that / what / whether / how / whoever / whatever + Subject + Verb] acts as Subject, Object, or Complement",
    forms: {
      affirmative: "What matters most is that every student feels supported.",
      negative: "Whether he agrees or not does not change the policy.",
      question: "Did you hear what the keynote speaker announced?",
    },
    rules: [
      {
        en: "Use 'that' to introduce a factual noun clause (often optional as an object: 'I know [that] you tried', but REQUIRED when the clause is the sentence subject: 'That she succeeded amazed everyone').",
        ar: "تُستخدم that لربط جملة اسمية خبرية؛ ويجوز حذفها حين تقع مفعولاً به، لكنها إلزامية حين تبدأ بها الجملة كفاعل.",
      },
      {
        en: "Use 'what' to mean 'the thing(s) that'—it has NO noun before it ('What you said helped me'); never replace 'that' with 'what' after a noun.",
        ar: "تأتي what بمعنى «الشيء الذي» ولا يسبقها اسم (What you said helped me)، ولا تحل محل that بعد اسم.",
      },
      {
        en: "Use 'whether' (not 'if') when a Yes/No noun clause is the subject of a sentence, follows a preposition, or sits directly before 'or not' ('Whether we expand depends on funding').",
        ar: "نستخدم whether (وليس if) عندما تقع الجملة الاسمية فاعلاً أو بعد حرف جر أو قبل or not مباشرة.",
      },
      {
        en: "A noun clause used as a singular subject takes a singular verb ('What we need is patience'), and always keeps statement word order (Subject + Verb).",
        ar: "تأخذ الجملة الاسمية حين تقع فاعلاً فعلاً مفرداً (What we need is...)، وتلتزم دائماً بترتيب الجملة الخبرية.",
      },
    ],
    examples: [
      {
        en: "That the startup broke even in its first year surprised veteran investors.",
        ar: "إن تحقيق الشركة الناشئة نقطة التعادل في عامها الأول أدهش المستثمرين المخضرمين.",
        highlight: "That the startup broke even in its first year",
      },
      {
        en: "What the team needs right now is clearer communication.",
        ar: "ما يحتاجه الفريق الآن هو تواصل أوضح.",
        highlight: "What the team needs right now",
      },
      {
        en: "We are still debating whether we should outsource customer support.",
        ar: "ما زلنا نناقش ما إذا كان ينبغي لنا إسناد خدمة العملاء لجهة خارجية.",
        highlight: "whether we should outsource customer support",
      },
      {
        en: "Whoever finishes the lab experiment first may lock up the equipment.",
        ar: "أياً كان من يُنهي تجربة المختبر أولاً فيمكنه إغلاق المعدات.",
        highlight: "Whoever finishes the lab experiment first",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic uses «إنّ/أنّ» cleanly, and learners often start subject noun clauses with 'If' ('If he comes depends on the weather') or confuse 'what' and 'that' ('Everything what he said'). Remember: 'Whether' starts subject clauses, and 'everything/all' is followed by 'that', never 'what'.",
      ar: "قد يبدأ المتعلم العربي الجملة الفاعلة بـ if خطأً (If he comes depends on...) أو يخلط بين what وthat بعد everything. تذكر: الجملة الاسمية الواقعة فاعلاً تبدأ بـ Whether لا If، وبعد everything نستخدم that لا what.",
    },
    commonMistake: {
      wrong: "If they accept the offer depends on the salary, and I liked everything what you wrote.",
      right: "Whether they accept the offer depends on the salary, and I liked everything that you wrote.",
      why: {
        en: "Use 'Whether' (never 'If') to open a subject noun clause, and use 'that' (never 'what') after 'everything'.",
        ar: "نستخدم Whether (لا If) في بداية الجملة الاسمية الواقعة فاعلاً، ونستخدم that (لا what) بعد everything.",
      },
    },
    quickCheck: [
      {
        prompt: "Choose the correct word to start this subject noun clause: '___ the bridge will reopen this week remains uncertain.'",
        options: ["If", "Whether", "What", "Which"],
        correctIndex: 1,
        explanation: {
          en: "Only 'Whether' (not 'If') can introduce a Yes/No noun clause functioning as the subject of a sentence.",
          ar: "تُستخدم Whether فقط (وليس If) لتقديم جملة اسمية بمعنى «ما إذا» في موقع الفاعل.",
        },
      },
      {
        prompt: "Complete the sentence: 'I didn't understand ___ she meant by that remark.'",
        options: ["that", "which", "what", "who"],
        correctIndex: 2,
        explanation: {
          en: "'What' means 'the thing that' and acts as the object of 'meant' with no preceding noun.",
          ar: "تعني what «الشيء الذي» وتعمل مفعولاً به للفعل meant دون اسم سابق.",
        },
      },
      {
        prompt: "Select the sentence with correct verb agreement for a noun clause subject:",
        options: [
          "What these neighborhoods need are better streetlights.",
          "What these neighborhoods need is better streetlights.",
          "That he won three medals were astonishing.",
          "Whoever arrive early get front-row seats.",
        ],
        correctIndex: 1,
        explanation: {
          en: "A singular noun clause subject ('What these neighborhoods need') normally takes a singular verb ('is')—note that 'What we need is...' focuses on the singular concept.",
          ar: "تأخذ الجملة الاسمية الواقعة فاعلاً فعلاً مفرداً (is) في البنية القياسية.",
        },
      },
    ],
  },
  {
    id: "adverbial-clauses",
    order: 39,
    moduleId: "clauses-complex",
    level: "B2",
    title: {
      en: "Adverbial Clauses (Time, Reason, Concession although/despite, Purpose, Result)",
      ar: "الجمل الظرفية (الزمان، السبب، الاستدراك although/despite، الغرض، النتيجة)",
    },
    overview: {
      en: "Adverbial clauses connect ideas logically by expressing time, cause, contrast (concession), purpose, or result. The single most tested distinction at B1–B2 is knowing which linkers require a FULL CLAUSE (Subject + Verb) and which require a NOUN PHRASE or GERUND.",
      ar: "تربط الجمل الظرفية الأفكار منطقياً للتعبير عن الزمان أو السبب أو الاستدراك (التناقض) أو الغرض أو النتيجة. وأهم قاعدة في هذا الدرس هي التمييز بين الروابط التي تتبعها جملة كاملة (فاعل + فعل) والروابط التي يتبعها اسم أو صيغة -ing.",
    },
    formula:
      "Clause linkers: although / even though / because / so that / so + adj + that + [S + V] | Prepositions: despite / in spite of / because of + [Noun / V-ing]",
    forms: {
      affirmative: "Although the forecast predicted rain, the outdoor concert went ahead.",
      negative: "We arrived early so that we wouldn't miss the opening speech.",
      question: "Did they cancel the match because of the sandstorm?",
    },
    rules: [
      {
        en: "Concession (Contrast): 'although / though / even though' + Subject + Verb; 'despite / in spite of' + Noun / V-ing / 'the fact that + S + V'. NEVER use 'although ... but' in the same sentence.",
        ar: "الاستدراك: يتبع although / even though فاعل + فعل، بينما يتبع despite / in spite of اسم أو V-ing أو the fact that. ولا نجمع بين although وbut في جملة واحدة أبداً.",
      },
      {
        en: "Reason: 'because / since / as' + Subject + Verb; 'because of / due to / owing to' + Noun / V-ing.",
        ar: "السبب: يتبع because / since / as جملة كاملة (فاعل + فعل)، بينما يتبع because of / due to اسم أو V-ing.",
      },
      {
        en: "Purpose: Use 'in order to / so as to + base verb' when the subject is the same, and 'so that / in order that + Subject + can/could/will/would + base verb' for full clauses.",
        ar: "الغرض: نستخدم in order to / so as to + المصدر، أو so that + فاعل + can/could/would + المصدر لجملة كاملة.",
      },
      {
        en: "Result: Use 'so + adjective/adverb + that' ('so tired that I slept') vs. 'such + (a/an) + adjective + noun + that' ('such a long day that I slept').",
        ar: "النتيجة: نستخدم so + صفة/ظرف + that، مقابل such + (a/an) + صفة + اسم + that.",
      },
    ],
    examples: [
      {
        en: "Even though the hike was steep, every member of the group reached the peak.",
        ar: "مع أن مسار التسلق كان شديد الانحدار، وصل كل عضو في المجموعة إلى القمة.",
        highlight: "Even though the hike was steep,",
      },
      {
        en: "Despite facing initial setbacks, the clinic opened on schedule.",
        ar: "على الرغم من مواجهة عقبات أولية، افتُتحت العيادة في موعدها.",
        highlight: "Despite facing initial setbacks,",
      },
      {
        en: "She wrote down the instructions carefully so that the night shift wouldn't make any errors.",
        ar: "دوّنت التعليمات بعناية لكي لا ترتكب المناوبة الليلية أي أخطاء.",
        highlight: "so that the night shift wouldn't make",
      },
      {
        en: "It was such a compelling documentary that we watched it twice.",
        ar: "كان فيلماً وثائقياً مشوّقاً جداً لدرجة أننا شاهدناه مرتين.",
        highlight: "such a compelling documentary that",
      },
    ],
    arabicInterferenceTip: {
      en: "In Arabic, «رغم أنه... إلا أن / ولكن...» pairs a concession word with 'but' («رغم أنه متعب لكنه حضر»). Translating this literally produces the classic error 'Although he was tired, but he came'. In English, choose ONLY ONE: either 'Although he was tired, he came' OR 'He was tired, but he came'.",
      ar: "في العربية يجتمع «رغم أن» و«لكن / إلا أن» في جملة واحدة («رغم أنه متعب لكنه حضر»)، فينقل المتعلم هذا إلى الإنجليزية خطأً بقول Although ..., but ... في الإنجليزية نكتفي برابط واحد فقط.",
    },
    commonMistake: {
      wrong: "Although the flight was expensive, but we booked it despite it was late.",
      right: "Although the flight was expensive, we booked it despite the late hour.",
      why: {
        en: "Never pair 'although' with 'but', and never put a bare clause directly after 'despite'—use a noun phrase ('the late hour') or 'despite the fact that it was late'.",
        ar: "لا نجمع بين although وbut، ولا نضع جملة كاملة مباشرة بعد despite بل نستخدم اسماً (the late hour) أو despite the fact that.",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the sentence: '___ the heavy traffic, we made it to the stadium before kickoff.'",
        options: ["Although", "Even though", "Despite", "Because"],
        correctIndex: 2,
        explanation: {
          en: "'The heavy traffic' is a noun phrase (no verb), so it requires the preposition 'Despite'.",
          ar: "عبارة the heavy traffic هي عبارة اسمية بدون فعل، لذا تتطلب حرف الجر Despite.",
        },
      },
      {
        prompt: "Choose the sentence with the correct 'so ... that' / 'such ... that' pattern:",
        options: [
          "It was so a noisy restaurant that we couldn't talk.",
          "It was such noisy restaurant that we couldn't talk.",
          "It was such a noisy restaurant that we couldn't talk.",
          "It was so noisy restaurant that we couldn't talk.",
        ],
        correctIndex: 2,
        explanation: {
          en: "A singular countable noun phrase takes 'such + a/an + adjective + noun + that'.",
          ar: "مع الاسم المفرد المعدود نستخدم الصيغة: such + a/an + صفة + اسم + that.",
        },
      },
      {
        prompt: "Which sentence correctly expresses contrast without double-conjunction error?",
        options: [
          "Although he studied medicine, but he works as a novelist.",
          "Though he studied medicine, yet he works as a novelist.",
          "Even though he studied medicine, he works as a novelist.",
          "Despite he studied medicine, he works as a novelist.",
        ],
        correctIndex: 2,
        explanation: {
          en: "'Even though' connects the two clauses on its own with a comma—no 'but' is allowed.",
          ar: "تربط Even though الجملتين بمفردها مع فاصلة دون إضافة but.",
        },
      },
    ],
  },
  {
    id: "cleft-sentences-emphasis",
    order: 40,
    moduleId: "clauses-complex",
    level: "C1",
    title: {
      en: "Cleft Sentences & Emphasis (It is... that / What I need is...)",
      ar: "الجمل المشطورة وأساليب التوكيد (It is... that / What I need is...)",
    },
    overview: {
      en: "Cleft sentences ('cleft' means 'split') divide a single clause into two parts in order to spotlight one specific element—a person, time, reason, or action—often to correct a misunderstanding or add rhetorical punch in essays, debates, and presentations.",
      ar: "تقسّم الجمل المشطورة الجملة الواحدة إلى جزأين لتسليط الضوء وتوكيد عنصر محدد (شخص أو زمان أو سبب أو فعل)، وغالباً ما تُستخدم لتصحيح سوء فهم أو لإضفاء قوة بلاغية في المقالات والمناظرات والعروض التقديمية.",
    },
    formula:
      "It-cleft: It is/was + [Focused Element] + that/who + Rest of Clause | Wh-cleft: What + Subject + Verb + is/was + [Focused Element]",
    forms: {
      affirmative: "It was Nora who discovered the billing discrepancy.",
      negative: "It wasn't the price that deterred buyers; it was the delivery delay.",
      question: "Was it in 2019 that the research center opened?",
    },
    rules: [
      {
        en: "It-clefts ('It is/was + X + that/who...') can highlight almost any part of a sentence—subject, object, time, or place—keeping 'It is' for present focus and 'It was' for past focus.",
        ar: "يمكن لجمل It-cleft توكيد الفاعل أو المفعول أو الزمان أو المكان، باستخدام It is للحاضر وIt was للماضي.",
      },
      {
        en: "Wh-clefts ('What + S + V + is/was...') place old/background information first and deliver the focused message dramatically at the end ('What I appreciate most is honesty').",
        ar: "تضع جمل What-cleft المعلومة الخلفية أولاً ثم تقدم العنصر المؤكَّد في النهاية بتأثير قوي (What I appreciate most is...).",
      },
      {
        en: "To emphasize an ACTION with a Wh-cleft, use 'What + S + do/did + is/was + (to) + base verb' ('What you should do is back up the drive').",
        ar: "لتوكيد فعلٍ ما بـ What-cleft نستخدم: What + فاعل + do/did + is/was + (to) + المصدر.",
      },
      {
        en: "Variation with 'All' or 'The reason / The person / The thing': 'All I want is a quiet weekend', 'The reason why we postponed was the storm'.",
        ar: "توجد صيغ توكيد قريبة تبدأ بـ All أو The reason / The thing مثل: All I want is... وThe reason why... was....",
      },
    ],
    examples: [
      {
        en: "It was the software update that caused the printer to disconnect.",
        ar: "تحديث البرمجية هو ما تسبب في انقطاع اتصال الطابعة.",
        highlight: "It was the software update that",
      },
      {
        en: "It wasn't until midnight that the negotiations finally concluded.",
        ar: "لم تنتهِ المفاوضات أخيراً إلا عند منتصف الليل.",
        highlight: "It wasn't until midnight that",
      },
      {
        en: "What really sets this program apart is its live mentoring.",
        ar: "ما يميز هذا البرنامج حقاً هو الإرشاد المباشر فيه.",
        highlight: "What really sets this program apart is",
      },
      {
        en: "What they did was redesign the onboarding flow from scratch.",
        ar: "ما فعلوه هو إعادة تصميم تجربة البدء من الصفر.",
        highlight: "What they did was redesign",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic highlights focus using pronoun separation («أحمد هو الذي فاز» = 'Ahmad he who won') or «إنما». Learners sometimes translate this word-for-word as 'Ahmad is who won' instead of the natural English cleft 'It was Ahmad who won' or 'The one who won was Ahmad'.",
      ar: "تستخدم العربية ضمير الفصل للتوكيد («أحمد هو الذي فاز»)، فيترجمها المتعلم حرفياً إلى Ahmad is who won. الصيغة الإنجليزية الطبيعية هي It was Ahmad who won أو The person who won was Ahmad.",
    },
    commonMistake: {
      wrong: "What I need it is a clear schedule, and it was yesterday when I met him.",
      right: "What I need is a clear schedule, and it was yesterday that I met him.",
      why: {
        en: "Do not insert a redundant 'it' inside a Wh-cleft ('What I need is'), and standard It-clefts use 'that' (not 'when' or 'where') after time/place expressions.",
        ar: "لا نضيف الضمير الزائد it بعد What I need، وفي جمل It-cleft القياسية نستخدم that (وليس when/where) بعد تعبيرات الزمان والمكان.",
      },
    },
    quickCheck: [
      {
        prompt: "Transform to emphasize 'the goalkeeper' in 'The goalkeeper saved the final penalty':",
        options: [
          "It is the goalkeeper saved the final penalty.",
          "It was the goalkeeper who saved the final penalty.",
          "What saved the final penalty was the goalkeeper did.",
          "The goalkeeper it was who saved the final penalty.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Past-time It-cleft for a person uses 'It was + person + who/that + verb'.",
          ar: "تأخذ جملة It-cleft في الماضي للعاقل الصيغة: It was + الشخص + who/that + الفعل.",
        },
      },
      {
        prompt: "Complete the Wh-cleft emphasizing an action: 'What we need to do now ___ the draft carefully.'",
        options: ["is proofread", "are proofreading", "that proofread", "it is proofread"],
        correctIndex: 0,
        explanation: {
          en: "After 'What + S + do + is', English uses the bare infinitive or to-infinitive ('is (to) proofread').",
          ar: "بعد What + فاعل + do + is نستخدم المصدر المجرد أو المصدر بـ to فنقول is proofread أو is to proofread.",
        },
      },
      {
        prompt: "Which sentence correctly uses 'It wasn't until ... that'?",
        options: [
          "It wasn't until Friday when we received the confirmation.",
          "It wasn't until Friday that we received the confirmation.",
          "It wasn't until Friday which we received the confirmation.",
          "It wasn't until Friday did we received the confirmation.",
        ],
        correctIndex: 1,
        explanation: {
          en: "The fixed cleft pattern is 'It wasn't until + time + that + Subject + Verb'.",
          ar: "التركيب الثابت لهذا النوع من التوكيد هو It wasn't until + الزمن + that + الفاعل + الفعل.",
        },
      },
    ],
  },

  // =========================================================================
  // MODULE 8: Gerunds & Infinitives (Orders 41–43)
  // =========================================================================
  {
    id: "gerund-vs-infinitive",
    order: 41,
    moduleId: "gerunds-infinitives",
    level: "B1",
    title: {
      en: "Gerund (-ing) vs. to-Infinitive Patterns",
      ar: "صيغة اسم الفعل (-ing) مقابل المصدر مع to",
    },
    overview: {
      en: "When one verb follows another in English, the second verb must take either a gerund ('V-ing'), a to-infinitive ('to + V1'), or a bare infinitive ('V1'). Gerunds also act as sentence subjects and follow ALL prepositions, whereas to-infinitives express purpose and follow most adjectives.",
      ar: "عندما يتبع فعلٌ فعلاً آخر في الإنجليزية، يجب أن يأتي الفعل الثاني إما بصيغة اسم الفعل (V-ing) أو المصدر مع to أو المصدر المجرد. ويعمل اسم الفعل أيضاً كفاعل للجملة ويأتي بعد جميع حروف الجر، بينما يعبر المصدر مع to عن الغرض ويأتي بعد معظم الصفات.",
    },
    formula:
      "Gerund: enjoy / avoid / finish / mind / suggest + V-ing; Prep + V-ing | Infinitive: decide / hope / plan / refuse / want + to + V1; Adj + to + V1",
    forms: {
      affirmative: "She enjoys solving logic puzzles and hopes to study engineering.",
      negative: "He decided not to renew the subscription to avoid wasting money.",
      question: "Do you mind closing the window before we start?",
    },
    rules: [
      {
        en: "Common gerund-only verbs: enjoy, avoid, finish, mind, suggest, recommend, admit, deny, keep, practice, postpone, risk, can't help, look forward to.",
        ar: "أشهر الأفعال المتبوعة بـ V-ing فقط: enjoy, avoid, finish, mind, suggest, admit, deny, keep, practice, postpone, look forward to.",
      },
      {
        en: "Common to-infinitive verbs: decide, agree, afford, expect, hope, manage, offer, plan, promise, refuse, seem, want, would like.",
        ar: "أشهر الأفعال المتبوعة بـ to + المصدر: decide, agree, afford, expect, hope, manage, offer, plan, promise, refuse, seem, want.",
      },
      {
        en: "ALWAYS use a gerund ('V-ing') after any preposition—including when 'to' is a preposition ('look forward to hearing', 'committed to improving', 'interested in learning').",
        ar: "نستخدم V-ing دائماً بعد أي حرف جر، حتى عندما تكون to حرف جر في عبارات مثل look forward to hearing وcommitted to improving.",
      },
      {
        en: "Use the bare infinitive (without 'to') after modals ('must go'), 'make / let + object' ('let me explain'), and 'had better / would rather'.",
        ar: "نستخدم المصدر المجرد (دون to) بعد الأفعال الناقصة (must go) وبعد make / let + مفعول وبعد had better وwould rather.",
      },
    ],
    examples: [
      {
        en: "Swimming every morning helps clear my mind before work.",
        ar: "السباحة كل صباح تساعد على صفاء ذهني قبل العمل.",
        highlight: "Swimming every morning",
      },
      {
        en: "We are looking forward to meeting the visiting researchers next Tuesday.",
        ar: "نتطلع إلى لقاء الباحثين الزائرين يوم الثلاثاء المقبل.",
        highlight: "looking forward to meeting",
      },
      {
        en: "She managed to finish the translation two hours ahead of schedule.",
        ar: "تمكنت من إنهاء الترجمة قبل الموعد بساعتين.",
        highlight: "managed to finish",
      },
      {
        en: "It is essential to verify your sources before publishing an article.",
        ar: "من الضروري التحقق من مصادرك قبل نشر أي مقال.",
        highlight: "essential to verify your sources before publishing",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic uses «أن + فعل مضارع» for almost every verb complement («أستمتع أن أقرأ» / «أتجنب أن أتأخر»), pushing Arab learners to overuse 'to + verb' after 'enjoy', 'avoid', 'finish', and 'mind'. Memorize the core gerund verbs and remember that EVERY preposition takes '-ing', never 'to + V1'.",
      ar: "تستخدم العربية «أن + المضارع» بعد معظم الأفعال، فيميل المتعلم لاستخدام to + المصدر بعد enjoy وavoid وfinish خطأً. احفظ الأفعال المتبوعة بـ -ing، وتذكر أن أي حرف جر يتبعه V-ing دائماً.",
    },
    commonMistake: {
      wrong: "I enjoy to travel and I look forward to meet you after to finish the project.",
      right: "I enjoy traveling and I look forward to meeting you after finishing the project.",
      why: {
        en: "'Enjoy' requires a gerund ('traveling'), 'to' in 'look forward to' is a preposition requiring 'meeting', and 'after' is a preposition requiring 'finishing'.",
        ar: "يتطلب enjoy صيغة V-ing (traveling)، كما أن to في look forward to وafter هما حرفا جر يتبعهما V-ing (meeting / finishing).",
      },
    },
    quickCheck: [
      {
        prompt: "Choose the correct completion: 'I look forward to ___ from you soon.'",
        options: ["hear", "hearing", "heard", "to hear"],
        correctIndex: 1,
        explanation: {
          en: "In 'look forward to', 'to' is a preposition, so it must be followed by a gerund ('hearing').",
          ar: "كلمة to في عبارة look forward to حرف جر وليست أداة مصدر، لذا تتبعها صيغة V-ing (hearing).",
        },
      },
      {
        prompt: "Complete the sentence: 'The supervisor wouldn't let us ___ the lab without safety goggles.'",
        options: ["to enter", "entering", "enter", "entered"],
        correctIndex: 2,
        explanation: {
          en: "'Let + object' is always followed by the bare infinitive ('enter') without 'to'.",
          ar: "يتبع الفعل let + المفعول المصدرُ المجرد (enter) دون to دائماً.",
        },
      },
      {
        prompt: "Select the grammatically correct sentence:",
        options: [
          "He avoided to answer the reporter's question.",
          "She suggested to postpone the ceremony.",
          "They promised sending the invoice today.",
          "He admitted forgetting to lock the gate.",
        ],
        correctIndex: 3,
        explanation: {
          en: "'Admit' takes a gerund ('forgetting'), while 'avoid' and 'suggest' also require gerunds and 'promise' requires 'to + V1'.",
          ar: "يأخذ الفعل admit صيغة V-ing (forgetting) بشكل صحيح، بينما أخطأت الجمل الأخرى مع avoid وsuggest وpromise.",
        },
      },
    ],
  },
  {
    id: "verbs-change-meaning",
    order: 42,
    moduleId: "gerunds-infinitives",
    level: "B2",
    title: {
      en: "Verbs That Change Meaning (stop, remember, forget, try, regret, mean)",
      ar: "الأفعال التي يتغير معناها بين -ing والمصدر مع to",
    },
    overview: {
      en: "A high-value group of English verbs—'stop', 'remember', 'forget', 'regret', 'try', 'mean', and 'go on'—can take BOTH a gerund and a to-infinitive, but with completely different meanings. Generally, '-ing' looks backward at a real/ongoing experience, while 'to + V1' looks forward at a duty, goal, or purpose.",
      ar: "هناك مجموعة مهمة من الأفعال الإنجليزية مثل stop وremember وforget وregret وtry وmean تقبل كلاً من V-ing وto + المصدر ولكن بمعنيين مختلفين تماماً. بوجه عام تشير صيغة -ing إلى تجربة واقعة أو ماضية، بينما يشير المصدر مع to إلى واجب أو هدف أو غرض مستقبلي.",
    },
    formula:
      "V + V-ing (past memory / quit habit / experiment / entail) ≠ V + to + V1 (duty / pause in order to / attempt hard task / intend)",
    forms: {
      affirmative: "I remember locking the office door before I left.",
      negative: "Don't forget to attach the receipt to your expense claim.",
      question: "Did you stop to grab coffee on your way here?",
    },
    rules: [
      {
        en: "'Remember / forget + V-ing' = recall or fail to recall a PAST memory ('I'll never forget seeing the pyramids'); 'remember / forget + to V1' = remember or forget to perform a DUTY ('Remember to lock the door').",
        ar: "remember / forget + V-ing تعني تذكّر أو نسيان ذكرى ماضية، أما + to V1 فتعني تذكّر أو نسيان أداء واجب مطلوب.",
      },
      {
        en: "'Stop + V-ing' = quit an activity completely ('He stopped smoking'); 'stop + to V1' = pause another activity IN ORDER TO do something ('He stopped to buy water').",
        ar: "stop + V-ing تعني الإقلاع عن نشاط والتوقف عنه، أما stop + to V1 فتعني التوقف مؤقتاً لأجل فعل شيء آخر.",
      },
      {
        en: "'Try + V-ing' = experiment with a method to see if it solves a problem ('Try restarting the router'); 'try + to V1' = make a difficult effort ('She tried to lift the crate').",
        ar: "try + V-ing تعني تجربة حل أو طريقة لمعرفة نتيجتها، أما try + to V1 فتعني بذل مجهود لمحاولة فعل أمر صعب.",
      },
      {
        en: "'Regret + V-ing' = feel sorry about a past mistake ('I regret saying that'); 'regret + to say/inform' = formal bad news now. 'Mean + V-ing' = involve/entail; 'mean + to V1' = intend.",
        ar: "regret + V-ing تعني الندم على فعل ماضٍ، أما regret + to inform فتعني «يؤسفني إبلاغك». وmean + V-ing تعني «يستلزم»، أما mean + to V1 فتعني «يقصد/ينوي».",
      },
    ],
    examples: [
      {
        en: "On our drive north, we stopped to admire the canyon at sunset.",
        ar: "في طريقنا شمالاً، توقفنا لكي نتأمل الوادي عند غروب الشمس.",
        highlight: "stopped to admire",
      },
      {
        en: "He stopped drinking soda last year and immediately felt more energetic.",
        ar: "توقف عن شرب المشروبات الغازية العام الماضي وشعر فوراً بنشاط أكبر.",
        highlight: "stopped drinking",
      },
      {
        en: "If the screen freezes again, try holding the power button for ten seconds.",
        ar: "إذا تجمّدت الشاشة مجدداً، جرّب الضغط المطوّل على زر التشغيل لعشر ثوانٍ.",
        highlight: "try holding",
      },
      {
        en: "We regret to inform you that the evening seminar has been postponed.",
        ar: "يؤسفنا إبلاغكم بأن الندوة المسائية قد تأجلت.",
        highlight: "regret to inform",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic often uses one verb construction with «أن» for both meanings («توقف عن...» vs «توقف لـ...» differ by preposition, while «تذكر أن...» can be ambiguous). In English, mixing up 'stopped smoking' and 'stopped to smoke' reverses the entire meaning!",
      ar: "في العربية يفرّق حرف الجر بين «توقف عن» و«توقف لكي»، بينما في الإنجليزية يتولى الفرق بين V-ing وto + المصدر قلب المعنى بالكامل؛ فقول stopped to smoke يعني توقف ليدخّن، عكس stopped smoking تماماً!",
    },
    commonMistake: {
      wrong: "My father stopped to smoke five years ago because of his health.",
      right: "My father stopped smoking five years ago because of his health.",
      why: {
        en: "'Stopped to smoke' means he paused what he was doing in order to smoke a cigarette; quitting the habit requires 'stopped smoking'.",
        ar: "تعني stopped to smoke أنه توقف لكي يدخن سيجارة، أما الإقلاع عن عادة التدخين فيتطلب stopped smoking.",
      },
    },
    quickCheck: [
      {
        prompt: "Which sentence means 'I have a vivid memory of meeting the author in 2018'?",
        options: [
          "I remember to meet the author in 2018.",
          "I remember meeting the author in 2018.",
          "I remembered to meeting the author in 2018.",
          "I try to remember to meet the author in 2018.",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Remember + V-ing' refers to recalling an experience that already happened in the past.",
          ar: "تشير صيغة remember + V-ing إلى استحضار ذكرى لحدث وقع بالفعل في الماضي.",
        },
      },
      {
        prompt: "Complete the sentence to express a necessary consequence: 'Accepting the promotion means ___ to a new city.'",
        options: ["to relocate", "relocate", "relocating", "relocated"],
        correctIndex: 2,
        explanation: {
          en: "'Mean + V-ing' means 'involve / entail as a result'; 'mean + to V1' means 'intend'.",
          ar: "تأتي mean + V-ing بمعنى «يستلزم / يعني بالضرورة»، أما mean + to فتعني «ينوي».",
        },
      },
      {
        prompt: "Choose the sentence expressing a troubleshooting experiment:",
        options: [
          "Try adding a pinch of salt to see if the soup tastes richer.",
          "He tried to add the numbers in his head without a calculator.",
          "She tried to reach the top shelf, but it was too high.",
          "They tried to negotiate a lower rent.",
        ],
        correctIndex: 0,
        explanation: {
          en: "'Try + V-ing' ('Try adding') suggests testing a simple method to see what happens.",
          ar: "تُستخدم try + V-ing (Try adding) لاقتراح تجربة طريقة سهلة ومعرفة أثرها.",
        },
      },
    ],
  },
  {
    id: "used-to-be-used-to-would",
    order: 43,
    moduleId: "gerunds-infinitives",
    level: "B1",
    title: {
      en: "used to vs. be used to vs. get used to vs. would",
      ar: "الفرق بين used to وbe used to وget used to وwould",
    },
    overview: {
      en: "These four structures look dangerously similar, yet they express three totally different ideas: past habits/states that no longer exist ('used to'), repeated past actions only ('would'), being accustomed to something ('be used to'), and the process of adapting ('get used to').",
      ar: "تتشابه هذه التراكيب الأربعة شكلاً لكنها تعبر عن ثلاثة معانٍ مختلفة تماماً: عادات وحالات ماضية انتهت (used to)، وأفعال ماضية متكررة فقط (would)، والاعتياد الحالي أو الماضي على أمر ما (be used to)، وعملية التأقلم والتعوّد التدريجي (get used to).",
    },
    formula:
      "Past habit/state: used to + V1 | Past action only: would + V1 | Accustomed: be used to + Noun / V-ing | Adapting: get used to + Noun / V-ing",
    forms: {
      affirmative: "I used to live in a village, so I'm still getting used to city noise.",
      negative: "She didn't use to drink coffee, and she isn't used to working nights.",
      question: "Did you use to play chess with your grandfather?",
    },
    rules: [
      {
        en: "'Used to + base verb' describes past habits AND past states ('live', 'have', 'believe', 'be') that are no longer true. In negatives and questions, drop the '-d': 'didn't use to' / 'Did you use to...?'.",
        ar: "تصف used to + المصدر عادات وحالات ماضية لم تعد موجودة. وفي النفي والسؤال نحذف حرف d فتصبح didn't use to وDid you use to.",
      },
      {
        en: "'Would + base verb' can describe repeated past ACTIONS ('Every summer we would swim at dawn'), but NEVER past states (NOT 'We would live in Abha').",
        ar: "تصف would + المصدر أفعالاً متكررة في الماضي فقط (مع سياق زمني ماضٍ)، ولا تُستخدم أبداً مع أفعال الحالة مثل live وbe وhave.",
      },
      {
        en: "'Be used to + Noun / V-ing' means 'be accustomed to / find familiar' and works in ANY tense (am/was/will be used to). Here 'to' is a preposition, so the verb MUST take '-ing'.",
        ar: "تعني be used to «معتاد على» وتعمل في أي زمن، وتكون to هنا حرف جر فيأتي بعدها اسم أو V-ing دائماً.",
      },
      {
        en: "'Get used to + Noun / V-ing' describes the PROCESS of becoming accustomed to something new ('You'll soon get used to driving on the left').",
        ar: "تصف get used to عملية التكيّف والتعوّد التدريجي على أمر جديد، ويتبعها أيضاً اسم أو V-ing.",
      },
    ],
    examples: [
      {
        en: "My grandfather used to own a bookshop near the old harbor.",
        ar: "كان جدي يمتلك مكتبة بالقرب من الميناء القديم.",
        highlight: "used to own",
      },
      {
        en: "When we were children, we would spend every Friday afternoon flying kites.",
        ar: "عندما كنا أطفالاً، كنا نقضي كل عصر جمعة في تطيير الطائرات الورقية.",
        highlight: "would spend",
      },
      {
        en: "Nurses are used to working twelve-hour shifts without losing focus.",
        ar: "الممرضون معتادون على العمل في نوبات من اثنتي عشرة ساعة دون فقدان التركيز.",
        highlight: "are used to working",
      },
      {
        en: "It took me two months to get used to waking up before sunrise.",
        ar: "استغرقني الأمر شهرين لأتعود على الاستيقاظ قبل شروق الشمس.",
        highlight: "get used to waking up",
      },
    ],
    arabicInterferenceTip: {
      en: "Because 'used to' translates as «اعتاد أن» and 'be used to' as «معتاد على», learners frequently put a base verb after 'be used to' ('I am used to wake up early') or invent a present form 'I use to go to the gym' for current habits. For present habits, use Present Simple ('I usually go'), NOT 'use to'.",
      ar: "لأن كلاً من used to وbe used to يرتبط بمفهوم «الاعتياد»، يقع المتعلم في خطأين: وضع المصدر بعد be used to (I am used to wake up)، أو استخدام use to لعادة حاضرة. للعادات الحاضرة نستخدم المضارع البسيط مع usually فقط.",
    },
    commonMistake: {
      wrong: "I am used to drive in heavy rain, and I would have a red bicycle as a child.",
      right: "I am used to driving in heavy rain, and I used to have a red bicycle as a child.",
      why: {
        en: "'Be used to' requires a gerund ('driving'), and 'have' (possession) is a state verb so it requires 'used to', never 'would'.",
        ar: "تتطلب be used to صيغة V-ing (driving)، والفعل have فعل حالة للملكية فيأخذ used to وليس would.",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the sentence: 'After living in Riyadh for ten years, he is completely used to ___ in summer heat.'",
        options: ["walk", "walking", "walked", "be walk"],
        correctIndex: 1,
        explanation: {
          en: "'Be used to' ends with the preposition 'to', so it must be followed by a gerund ('walking').",
          ar: "تنتهي عبارة be used to بحرف الجر to، لذا يلزم بعدها اسم أو صيغة V-ing (walking).",
        },
      },
      {
        prompt: "Which sentence uses 'would' INCORRECTLY for the past?",
        options: [
          "Every winter, our grandmother would bake spiced bread.",
          "Whenever it rained, we would sit by the window and read.",
          "Before 2015, we would live in a small apartment downtown.",
          "On holidays, my cousins would visit us for a whole week.",
        ],
        correctIndex: 2,
        explanation: {
          en: "'Live' is a state verb, so it cannot use 'would' for past states—you must say 'we used to live'.",
          ar: "الفعل live من أفعال الحالة ولا يقبل would للماضي، بل يجب استخدام we used to live.",
        },
      },
      {
        prompt: "Choose the correct negative past habit question:",
        options: [
          "Did you used to play football after school?",
          "Did you use to play football after school?",
          "Were you used to play football after school?",
          "Are you use to play football after school?",
        ],
        correctIndex: 1,
        explanation: {
          en: "Because 'Did' already marks the past tense, 'use to' drops its '-d' ('Did you use to play...?').",
          ar: "لأن Did تحمل علامة الماضي، يُكتب الفعل use دون d فنقول Did you use to play...?.",
        },
      },
    ],
  },

  // =========================================================================
  // MODULE 9: Prepositions & Phrasal Verbs (Orders 44–47)
  // =========================================================================
  {
    id: "prepositions-of-time",
    order: 44,
    moduleId: "prepositions-phrasals",
    level: "A2",
    title: {
      en: "Prepositions of Time (at / on / in / by / until / during / for / since)",
      ar: "حروف الجر الدالة على الزمن (at / on / in / by / until / during / for / since)",
    },
    overview: {
      en: "English organizes time from sharp points to broad periods: 'at' for exact clock times, 'on' for specific days and dates, and 'in' for months, years, seasons, and parts of the day. Beyond those core three, 'by' vs. 'until', 'during' vs. 'for', and 'for' vs. 'since' control precision in deadlines and duration.",
      ar: "تنظم الإنجليزية الزمن من النقاط الدقيقة إلى الفترات الواسعة: at للساعات المحددة، وon للأيام والتواريخ، وin للشهور والسنوات والفصول وأجزاء اليوم. كما تضبط حروف الجر by مقابل until وduring مقابل for وfor مقابل since دقة المواعيد النهائية والمدد الزمنية.",
    },
    formula:
      "at (clock/night) | on (day/date) | in (month/year/season) | by (deadline) vs. until (continuous up to) | during (+ noun) vs. for (+ length) vs. since (+ starting point)",
    forms: {
      affirmative: "The workshop starts at 9:00 a.m. on Tuesday in October.",
      negative: "We didn't leave the office until midnight, though the draft was due by 10 p.m.",
      question: "Have you been studying here for three months or since January?",
    },
    rules: [
      {
        en: "Use 'at' for clock times and fixed points ('at 6:30', 'at noon', 'at night', 'at the weekend'), 'on' for days and dates ('on Monday', 'on July 14th', 'on Friday morning'), and 'in' for longer periods ('in April', 'in 2026', 'in winter', 'in the morning').",
        ar: "نستخدم at للساعات والنقاط الزمنية (at 6:30 / at night)، وon للأيام والتواريخ (on Monday / on July 14th)، وin للفترات الأطول (in April / in 2026 / in the morning).",
      },
      {
        en: "Omit 'at/on/in' completely before 'this', 'next', 'last', and 'every' ('see you next Friday', NOT 'on next Friday').",
        ar: "نحذف at/on/in تماماً قبل this وnext وlast وevery (نقول next Friday وليس on next Friday).",
      },
      {
        en: "'By' marks a deadline ('finish by Friday' = at or before Friday); 'until/till' marks an action that CONTINUES up to a point ('stay until Friday').",
        ar: "تشير by إلى موعد نهائي يُنجز العمل قبله أو عنده، بينما تشير until إلى استمرار الحدث حتى لحظة معينة.",
      },
      {
        en: "'During' is followed by a NOUN event ('during the lecture'), 'for' by a LENGTH of time ('for two hours'), and 'since' by a STARTING POINT ('since 2020', 'since 8 a.m.').",
        ar: "يتبع during اسم حدث (during the lecture)، ويتبع for مدة زمنية (for two hours)، ويتبع since نقطة بداية (since 2020).",
      },
    ],
    examples: [
      {
        en: "The keynote begins at 10:15 on Wednesday morning in the autumn term.",
        ar: "تبدأ الكلمة الرئيسية الساعة 10:15 صباح الأربعاء في الفصل الدراسي الخريفي.",
        highlight: "at 10:15 on Wednesday morning",
      },
      {
        en: "Please upload your final slides by Friday at 5 p.m. so we can test the projector.",
        ar: "يرجى رفع شرائحك النهائية بحلول يوم الجمعة الساعة 5 مساءً لنتمكن من تجربة جهاز العرض.",
        highlight: "by Friday at 5 p.m.",
      },
      {
        en: "The library stays open until 11 p.m. during final exam week.",
        ar: "تبقى المكتبة مفتوحة حتى الساعة 11 مساءً خلال أسبوع الاختبارات النهائية.",
        highlight: "until 11 p.m. during final exam week",
      },
      {
        en: "She has worked as a pediatric nurse for six years since 2020.",
        ar: "تعمل ممرضة أطفال منذ ست سنوات منذ عام 2020.",
        highlight: "for six years since 2020",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic uses «في» for clock times, days, months, AND years («في الساعة الخامسة / في يوم الإثنين / في يناير»), causing learners to overuse 'in' everywhere ('in Monday', 'in 5 o'clock'). Also Arabic «منذ» covers BOTH 'for' and 'since'—split them strictly: 'for + duration' vs. 'since + start point'.",
      ar: "تستخدم العربية حرف الجر «في» للساعات والأيام والشهور، كما تغطي «منذ» كلاً من for وsince، مما يسبب أخطاء مثل in Monday وsince three years. التزم بـ: at للساعة، on لليوم، in للشهر/السنة، for للمدة، since لنقطة البداية.",
    },
    commonMistake: {
      wrong: "The exam is in Monday at the morning, and I have studied since three hours.",
      right: "The exam is on Monday morning, and I have studied for three hours.",
      why: {
        en: "Specific days and day+part-of-day use 'on' ('on Monday morning'), and durations ('three hours') require 'for', never 'since'.",
        ar: "تأخذ الأيام وأجزاء الأيام المحددة حرف الجر on (on Monday morning)، وتأخذ المدة الزمنية (three hours) كلمة for لا since.",
      },
    },
    quickCheck: [
      {
        prompt: "Choose the correct deadline preposition: 'All applications must be submitted ___ May 31st; late forms will not be accepted.'",
        options: ["until", "by", "during", "since"],
        correctIndex: 1,
        explanation: {
          en: "'By' means 'no later than' (a deadline), whereas 'until' indicates continuing up to a point.",
          ar: "تُستخدم by للدلالة على الموعد النهائي (في موعد أقصاه)، أما until فتفيد الاستمرار.",
        },
      },
      {
        prompt: "Complete the sentence: 'Nobody spoke ___ the two-hour documentary.'",
        options: ["while", "for", "during", "since"],
        correctIndex: 2,
        explanation: {
          en: "'The two-hour documentary' is a noun event, so it takes 'during' (note: 'while' requires a clause with a verb).",
          ar: "عبارة the two-hour documentary اسم حدث وليست جملة بفعل، لذا تأخذ during.",
        },
      },
      {
        prompt: "Which sentence uses time prepositions completely accurately?",
        options: [
          "Let's meet on next Thursday at 4 p.m.",
          "Let's meet next Thursday at 4 p.m.",
          "Let's meet in Thursday at 4 p.m.",
          "Let's meet next Thursday in 4 p.m.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Drop the preposition before 'next' ('next Thursday') and use 'at' for clock times ('at 4 p.m.').",
          ar: "نحذف حرف الجر قبل next (next Thursday) ونستخدم at مع الساعة (at 4 p.m.).",
        },
      },
    ],
  },
  {
    id: "prepositions-place-movement",
    order: 45,
    moduleId: "prepositions-phrasals",
    level: "A2",
    title: {
      en: "Prepositions of Place & Movement (at / on / in / across / through / into / onto)",
      ar: "حروف الجر الدالة على المكان والحركة (at / on / in / across / through / into / onto)",
    },
    overview: {
      en: "Spatial prepositions in English follow clean 3D geometry: 'at' marks a point or event, 'on' marks a flat surface or line, and 'in' marks an enclosed 3D space. Movement prepositions trace direction: 'into' enters an enclosure, 'onto' moves onto a surface, 'across' goes over a flat span, and 'through' passes inside a 3D volume.",
      ar: "تتبع حروف الجر المكانية في الإنجليزية هندسة واضحة: at للنقطة أو الحدث، وon للسطح أو الخط، وin للحيز المغلق ثلاثي الأبعاد. أما حروف الحركة فترسم المسار: into للدخول إلى حيز، وonto للصعود على سطح، وacross لعبور مساحة مسطحة، وthrough للمرور داخل فراغ أو نفق.",
    },
    formula:
      "Place: at (point) | on (surface/floor/bus) | in (enclosed area/car) || Movement: into (enter) | onto (surface) | across (2D) | through (3D)",
    forms: {
      affirmative: "She walked across the square and went through the glass archway into the hall.",
      negative: "Do not jump onto the fragile table or leave keys in the ignition.",
      question: "Did you meet him at the entrance or inside the lobby?",
    },
    rules: [
      {
        en: "Static place: 'at' for exact points, addresses with numbers, and venues/events ('at the door', 'at 42 Oak Street', 'at the concert'); 'on' for surfaces, streets, floors, and media ('on the wall', 'on the third floor', 'on Oak Street'); 'in' for enclosed rooms, cities, countries, and books ('in the kitchen', 'in Jordan').",
        ar: "للمكان الثابت: at للنقاط والعناوين المرقّمة والفعاليات، وon للأسطح والطوابق والشوارع، وin للغرف والمدن والدول.",
      },
      {
        en: "Transport rule: use 'on' for large public vehicles you can stand/walk on ('on the bus / train / plane / ship') and two-wheelers ('on a bike'), but 'in' for enclosed small private vehicles ('in a car / taxi').",
        ar: "للمواصلات: نستخدم on مع المركبات الكبيرة التي يمكن الوقوف فيها (bus/train/plane) والدراجات، وin مع السيارة والتاكسي (in a car/taxi).",
      },
      {
        en: "'Into' and 'onto' show MOVEMENT toward a destination ('walked into the room', 'climbed onto the roof'), while 'in' and 'on' show STATIC position ('waited in the room', 'sat on the roof').",
        ar: "تدل into وonto على الحركة نحو المكان، بينما تدل in وon على الثبات داخل المكان أو فوقه.",
      },
      {
        en: "'Across' moves from one side to the other of a 2D surface ('swim across the river', 'walk across the street'); 'through' moves inside a 3D space or crowd ('drive through the tunnel', 'walk through the forest').",
        ar: "تدل across على العبور فوق سطح ثنائي الأبعاد (شارع/نهر)، بينما تدل through على الاختراق والمرور داخل حيز ثلاثي الأبعاد (نفق/غابة/زحام).",
      },
    ],
    examples: [
      {
        en: "Wait for me at the main gate; I left my jacket on the back seat in the car.",
        ar: "انتظرني عند البوابة الرئيسية؛ لقد تركت سترتي على المقعد الخلفي داخل السيارة.",
        highlight: "at the main gate",
      },
      {
        en: "The express train sped through the mountain tunnel and across the valley bridge.",
        ar: "انطلق القطار السريع عبر نفق الجبل وعَبَر جسر الوادي.",
        highlight: "through the mountain tunnel and across the valley bridge",
      },
      {
        en: "The cat leaped effortlessly onto the windowsill and slipped into the living room.",
        ar: "قفزت القطة بخفة على حافة النافذة وتسللت إلى داخل غرفة المعيشة.",
        highlight: "onto the windowsill and slipped into",
      },
      {
        en: "My apartment is on the fourth floor on King Fahd Road in downtown Riyadh.",
        ar: "شقتي في الطابق الرابع في طريق الملك فهد وسط الرياض.",
        highlight: "on the fourth floor on King Fahd Road in downtown Riyadh",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic uses «في» for floors («في الطابق الثالث»), buses («في الحافلة»), and surfaces like pages or walls, which makes learners write 'in the third floor' or 'in the bus'. Also remember: NEVER use 'to' after 'arrive' ('arrive AT the station / arrive IN Cairo', NEVER 'arrive to').",
      ar: "تستخدم العربية «في» للطوابق («في الطابق الثالث») والحافلات («في الباص»)، بينما تستخدم الإنجليزية on (on the third floor / on the bus). وتذكر أيضاً أن الفعل arrive يأخذ at أو in ولا يأخذ to أبداً.",
    },
    commonMistake: {
      wrong: "We arrived to the airport on a taxi and walked in the terminal.",
      right: "We arrived at the airport in a taxi and walked into the terminal.",
      why: {
        en: "'Arrive' takes 'at' (buildings/stations) or 'in' (cities/countries), taxis take 'in', and movement from outside to inside uses 'into'.",
        ar: "يأخذ الفعل arrive حرف الجر at (للمباني والمطارات) أو in (للمدن والدول)، والسيارة/التاكسي تأخذ in، وحركة الدخول تأخذ into.",
      },
    },
    quickCheck: [
      {
        prompt: "Choose the correct preposition of movement: 'The hikers walked ___ the dense pine forest for three hours.'",
        options: ["onto", "across", "through", "at"],
        correctIndex: 2,
        explanation: {
          en: "A dense forest surrounds you in 3D, so moving inside it from one end to the other takes 'through'.",
          ar: "الغابة الكثيفة حيز محيط ثلاثي الأبعاد، لذا فإن السير بداخلها يأخذ through.",
        },
      },
      {
        prompt: "Complete the sentence: 'When did your flight arrive ___ Doha?'",
        options: ["to", "in", "on", "into"],
        correctIndex: 1,
        explanation: {
          en: "Use 'arrive in' for cities and countries ('arrive in Doha'), and 'arrive at' for specific buildings—never 'arrive to'.",
          ar: "نستخدم arrive in مع المدن والدول (arrive in Doha) وarrive at مع المباني، ولا نستخدم arrive to مطلقاً.",
        },
      },
      {
        prompt: "Select the sentence with all spatial prepositions used accurately:",
        options: [
          "She read the notice in the wall while riding in the bus.",
          "She read the notice on the wall while riding on the bus.",
          "She read the notice at the wall while riding on the car.",
          "She read the notice onto the wall while riding in the train.",
        ],
        correctIndex: 1,
        explanation: {
          en: "A wall is a flat surface ('on the wall') and a bus is large public transport ('on the bus').",
          ar: "الحائط سطح مستوٍ يأخذ on the wall، والحافلة وسيلة نقل جماعي كبيرة تأخذ on the bus.",
        },
      },
    ],
  },
  {
    id: "verb-adjective-prepositions",
    order: 46,
    moduleId: "prepositions-phrasals",
    level: "B2",
    title: {
      en: "Verb & Adjective + Preposition Collocations (depend on, interested in, insist on, apologize for)",
      ar: "تلازمات الأفعال والصفات مع حروف الجر (depend on, interested in, insist on, apologize for)",
    },
    overview: {
      en: "In English, specific verbs and adjectives partner with fixed prepositions that rarely match Arabic translations word for word. Learning each verb or adjective TOGETHER with its preposition—and remembering that any verb after a preposition must be '-ing'—eliminates one of the most visible non-native markers.",
      ar: "ترتبط أفعال وصفات محددة في الإنجليزية بحروف جر ثابتة نادراً ما تطابق حرف الجر العربي حرفياً. وتعلُّم كل فعل أو صفة مع حرف جره كوحدة واحدة—مع تذكّر أن الفعل بعد حرف الجر يأتي بصيغة -ing—يزيل أحد أكثر أخطاء غير الناطقين وضوحاً.",
    },
    formula:
      "Verb / Adjective + Fixed Preposition + Noun / Pronoun / V-ing (e.g., depend on, insist on, apologize for, interested in, responsible for, afraid of)",
    forms: {
      affirmative: "Success depends on staying consistent rather than relying on luck.",
      negative: "She isn't keen on rushing decisions, and she never complains about extra work.",
      question: "Are you familiar with the new safety protocol?",
    },
    rules: [
      {
        en: "High-frequency Verb + Preposition pairs: depend on, rely on, insist on, focus on, concentrate on, succeed in, specialize in, believe in, apologize (to sb) for, apply for, wait for, consist of, approve of, listen to, belong to.",
        ar: "أشهر تلازمات الأفعال: depend/rely/insist/focus on، وsucceed/specialize/believe in، وapologize/apply/wait for، وconsist/approve of، وlisten/belong to.",
      },
      {
        en: "High-frequency Adjective + Preposition pairs: interested in, experienced in, good/bad at, surprised at/by, proud of, afraid of, capable of, aware of, responsible for, famous for, similar to, married to, addicted to, familiar with, satisfied with.",
        ar: "أشهر تلازمات الصفات: interested in، وgood/bad at، وproud/afraid/capable/aware of، وresponsible/famous for، وsimilar/married to، وfamiliar/satisfied with.",
      },
      {
        en: "Watch zero-preposition verbs that take a DIRECT object in English without any preposition: discuss (NOT 'discuss about'), enter (NOT 'enter to'), marry (NOT 'marry with'), reach, attend, emphasize, answer.",
        ar: "انتبه للأفعال المتعدية مباشرة دون حرف جر في الإنجليزية: discuss (لا نقول discuss about)، وenter (لا enter to)، وmarry (لا marry with)، وreach وattend وanswer.",
      },
      {
        en: "Whenever a verb follows any of these prepositions, it MUST take the '-ing' gerund form ('insisted on paying', 'capable of solving', 'apologized for forgetting').",
        ar: "كلما جاء فعل بعد أي حرف جر من هذه التلازمات، يجب أن يأتي بصيغة اسم الفعل -ing (مثل insisted on paying وcapable of solving).",
      },
    ],
    examples: [
      {
        en: "Our delivery schedule depends on receiving the customs clearance by noon.",
        ar: "يعتمد جدول التسليم لدينا على استلام التخليص الجمركي بحلول الظهر.",
        highlight: "depends on receiving",
      },
      {
        en: "She is deeply interested in renewable energy and very good at analyzing data.",
        ar: "هي مهتمة للغاية بالطاقة المتجددة وبارعة جداً في تحليل البيانات.",
        highlight: "interested in renewable energy and very good at analyzing",
      },
      {
        en: "The director apologized to the audience for starting the ceremony ten minutes late.",
        ar: "اعتذر المدير للجمهور عن بدء الحفل متأخراً عشر دقائق.",
        highlight: "apologized to the audience for starting",
      },
      {
        en: "We need to discuss the quarterly budget before we attend the board meeting.",
        ar: "نحتاج إلى مناقشة الميزانية الفصلية قبل حضور اجتماع مجلس الإدارة.",
        highlight: "discuss the quarterly budget",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic prepositions cause predictable transfer errors: «متزوج من» → 'married with' (correct: 'married TO'), «خائف من» → 'afraid from' (correct: 'afraid OF'), «يتحدث/يناقش عن» → 'discuss about' (correct: 'discuss' with NO preposition), «يعتمد على» matches 'depend on', and «مهتم بـ» → 'interested by/with' (correct: 'interested IN').",
      ar: "تسبب الترجمة الحرفية من العربية أخطاء متكررة: «متزوج من» تصبح خطأً married with والصواب married to؛ و«خائف من» تصبح afraid from والصواب afraid of؛ و«يناقش عن» تصبح discuss about والصواب discuss مباشرة دون حرف جر؛ و«مهتم بـ» تصبح interested in.",
    },
    commonMistake: {
      wrong: "He is married with a doctor, afraid from heights, and wants to discuss about the trip.",
      right: "He is married to a doctor, afraid of heights, and wants to discuss the trip.",
      why: {
        en: "Use 'married to', 'afraid of', and direct-object 'discuss' without 'about'.",
        ar: "الصيغ الإنجليزية الصحيحة هي married to وafraid of والفعل discuss متعدٍّ مباشرة دون about.",
      },
    },
    quickCheck: [
      {
        prompt: "Choose the correct prepositions: 'The team is responsible ___ designing the interface and proud ___ the final result.'",
        options: ["of / for", "for / of", "about / with", "to / from"],
        correctIndex: 1,
        explanation: {
          en: "Fixed collocations are 'responsible FOR' and 'proud OF'.",
          ar: "التلازمان الثابتان هما responsible for (مسؤول عن) وproud of (فخور بـ).",
        },
      },
      {
        prompt: "Which sentence has NO preposition error?",
        options: [
          "We discussed about the proposal for two hours.",
          "She is very good in solving algebra problems.",
          "He insisted on checking every invoice twice.",
          "My cousin is married with an architect from Amman.",
        ],
        correctIndex: 2,
        explanation: {
          en: "'Insist on + V-ing' is accurate; the other options fail on 'discuss' (no 'about'), 'good at', and 'married to'.",
          ar: "تركيب insist on + V-ing صحيح تماماً، بينما أخطأت الجمل الأخرى في discuss about وgood in وmarried with.",
        },
      },
      {
        prompt: "Complete the sentence: 'The committee consists ___ twelve elected members and specializes ___ urban planning.'",
        options: ["from / on", "of / in", "with / at", "in / for"],
        correctIndex: 1,
        explanation: {
          en: "Use 'consist OF' (active, never passive 'is consisted of') and 'specialize IN'.",
          ar: "التلازمان الصحيحان هما consist of (يتكون من) وspecialize in (يتخصص في).",
        },
      },
    ],
  },
  {
    id: "essential-phrasal-verbs",
    order: 47,
    moduleId: "prepositions-phrasals",
    level: "B2",
    title: {
      en: "Essential Phrasal Verbs: Separable, Inseparable & Three-Word Phrasals",
      ar: "الأفعال المركبة الأساسية: القابلة للفصل، غير القابلة للفصل، والثلاثية",
    },
    overview: {
      en: "A phrasal verb combines a common verb with an adverb or preposition ('turn down', 'look after', 'come up with') to create a new idiomatic meaning. Understanding the difference between separable, inseparable, and three-word phrasal verbs tells you exactly where to place noun and pronoun objects.",
      ar: "يتكون الفعل المركب من فعل شائع مع ظرف أو حرف جر (مثل turn down وlook after وcome up with) لإنتاج معنى اصطلاحي جديد. ومعرفة الفرق بين الأفعال القابلة للفصل وغير القابلة للفصل والثلاثية تحدد بدقة موضع المفعول به سواء كان اسماً أو ضميراً.",
    },
    formula:
      "Separable: V + Noun + Particle OR V + Particle + Noun | Pronoun MUST split: V + it/them + Particle || Inseparable & 3-Word: V + Particle(s) + Object",
    forms: {
      affirmative: "Please turn off the lights, or turn them off before you lock up.",
      negative: "We couldn't put up with the constant noise, so we moved out.",
      question: "Did she come up with a solution before the system broke down?",
    },
    rules: [
      {
        en: "Separable phrasal verbs ('turn off', 'pick up', 'put off', 'bring up', 'figure out', 'hand in') allow a NOUN object either in the middle or at the end ('put off the meeting' = 'put the meeting off').",
        ar: "الأفعال المركبة القابلة للفصل (مثل turn off وput off وfigure out) تسمح بوضع المفعول الاسم في الوسط أو في النهاية.",
      },
      {
        en: "CRITICAL PRONOUN RULE: With separable phrasal verbs, a PRONOUN object ('it', 'them', 'him', 'her') MUST go in the middle—NEVER at the end ('turn it off', NEVER 'turn off it').",
        ar: "قاعدة الضمير الذهبية: مع الأفعال القابلة للفصل يجب وضع الضمير (it/them/him) في الوسط دائماً، ولا يجوز وضعه في النهاية أبداً (turn it off وليس turn off it).",
      },
      {
        en: "Inseparable phrasal verbs ('look after', 'run into', 'get over', 'deal with') NEVER split—both nouns and pronouns stay AFTER the particle ('look after them', NOT 'look them after').",
        ar: "الأفعال غير القابلة للفصل (مثل look after وrun into وdeal with) لا تنفصل أبداً، فيبقى الاسم والضمير بعد الأداة دائماً.",
      },
      {
        en: "Three-word phrasal verbs ('look forward to', 'put up with', 'run out of', 'come up with', 'get along with') are always inseparable—keep the entire object after the final preposition.",
        ar: "الأفعال المركبة الثلاثية (مثل put up with وrun out of وcome up with) غير قابلة للفصل دائماً، ويأتي المفعول بعدها بالكامل.",
      },
    ],
    examples: [
      {
        en: "The board decided to put the launch off until next quarter, so they put it off officially.",
        ar: "قرر المجلس تأجيل الإطلاق إلى الربع القادم، فأجّلوه رسمياً.",
        highlight: "put it off",
      },
      {
        en: "I ran into my former chemistry teacher at the book fair yesterday.",
        ar: "صادفت معلم الكيمياء السابق في معرض الكتاب أمس.",
        highlight: "ran into",
      },
      {
        en: "Our design team came up with a clever way to cut packaging waste in half.",
        ar: "ابتكر فريق التصميم لدينا طريقة ذكية لتقليل نفايات التغليف إلى النصف.",
        highlight: "came up with",
      },
      {
        en: "We ran out of printer ink right before we had to hand the report in.",
        ar: "نفد حبر الطابعة لدينا قبيل تسليم التقرير مباشرة.",
        highlight: "ran out of printer ink",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic has no true separable phrasal verbs where a pronoun wedges inside the verb, so Arab learners naturally keep 'verb + particle' glued together even with pronouns ('pick up it', 'turn on it'). Drill the rhythm: 'pick IT up', 'turn IT on', 'write IT down', 'figure IT out'!",
      ar: "لا توجد في العربية أفعال مركبة يدخل الضمير في وسطها، فيعتاد المتعلم إبقاء الفعل والأداة متلاصقين مع الضمير خطأً (pick up it). درّب أذنك على الإيقاع الإنجليزي الصحيح: pick it up وturn it on وwrite it down.",
    },
    commonMistake: {
      wrong: "Here is the application form—please fill out it and look my bag after.",
      right: "Here is the application form—please fill it out and look after my bag.",
      why: {
        en: "'Fill out' is separable so pronoun 'it' must go in the middle ('fill it out'), while 'look after' is inseparable so 'my bag' must stay after 'after'.",
        ar: "الفعل fill out قابل للفصل فيلزم وضع الضمير it في الوسط (fill it out)، أما look after فغير قابل للفصل فيبقى المفعول بعده (look after my bag).",
      },
    },
    quickCheck: [
      {
        prompt: "Replace 'the music' with 'it': 'Could you please turn down the music?'",
        options: [
          "Could you please turn down it?",
          "Could you please turn it down?",
          "Could you please it turn down?",
          "Could you please down turn it?",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Turn down' is a separable phrasal verb, so the object pronoun 'it' must sit between 'turn' and 'down'.",
          ar: "الفعل turn down قابل للفصل، لذا يجب وضع الضمير it بين turn وdown.",
        },
      },
      {
        prompt: "Which sentence uses the inseparable phrasal verb 'look after' correctly?",
        options: [
          "My aunt looked them after while our parents traveled.",
          "My aunt looked after them while our parents traveled.",
          "My aunt looked our cousins after while our parents traveled.",
          "My aunt after looked them while our parents traveled.",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Look after' is inseparable, so both nouns and pronouns follow 'after'.",
          ar: "الفعل look after غير قابل للفصل، لذا يأتي الضمير them بعد after مباشرة.",
        },
      },
      {
        prompt: "What does the three-word phrasal verb 'put up with' mean in 'I can't put up with these delays anymore'?",
        options: [
          "postpone",
          "tolerate",
          "invent",
          "cancel",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Put up with' means 'tolerate / endure something unpleasant' (whereas 'put off' means 'postpone').",
          ar: "يعني الفعل المركب put up with «يتحمّل / يطيق»، بينما يعني put off «يؤجّل».",
        },
      },
    ],
  },

  // =========================================================================
  // MODULE 10: Comparatives, Superlatives & Quantifiers (Orders 48–50)
  // =========================================================================
  {
    id: "comparatives-superlatives-double",
    order: 48,
    moduleId: "comparatives-quantifiers",
    level: "B1",
    title: {
      en: "Comparatives, Superlatives, as...as & Double Comparatives (the more..., the better)",
      ar: "صيغ المقارنة والتفضيل والتساوي (as...as) والمقارنة المزدوجة (the more..., the better)",
    },
    overview: {
      en: "English compares people, things, and actions using '-er / more ... than' (comparative), 'the -est / the most' (superlative), 'as ... as' (equality), and proportional double comparatives ('The earlier we leave, the less traffic we'll hit'). Modifiers like 'much', 'far', and 'slightly' refine degree accurately.",
      ar: "تعقد الإنجليزية المقارنات باستخدام -er / more ... than، والتفضيل باستخدام the -est / the most، والتساوي بـ as ... as، والمقارنة التناسبية المزدوجة (كلما... كلما... The more..., the better). كما تحدد ظروف الدرجة مثل much وfar وslightly مقدار الفرق بدقة.",
    },
    formula:
      "Comparative: short adj-er / more + long adj + than | Superlative: the adj-est / the most + adj | Equal: (not) as + adj/adv + as | Double: The + comp..., the + comp...",
    forms: {
      affirmative: "This route is far quieter than the highway and just as fast.",
      negative: "The sequel wasn't nearly as gripping as the original novel.",
      question: "Which city has the most reliable rail network in the region?",
    },
    rules: [
      {
        en: "Short adjectives (1 syllable, and 2-syllable adjectives ending in '-y' like 'busy → busier') take '-er / the -est'; longer adjectives (2+ syllables like 'careful', 'efficient') take 'more / the most'. Never combine both (NO 'more easier').",
        ar: "الصفات القصيرة (مقطع واحد، أو مقطعين منتهية بـ y مثل busy) تأخذ -er وthe -est، والصفات الطويلة تأخذ more وthe most، ولا نجمع بينهما أبداً (لا نقول more easier).",
      },
      {
        en: "Memorize irregular forms: good/well → better → the best; bad/badly → worse → the worst; far → farther/further → the farthest/furthest; little → less → the least.",
        ar: "احفظ الصيغ الشاذة: good ← better ← the best؛ وbad ← worse ← the worst؛ وfar ← farther/further؛ وlittle ← less ← the least.",
      },
      {
        en: "Modify comparatives with 'much / far / a lot / significantly / slightly / a bit'—NEVER 'very' ('much faster', NOT 'very faster'). Use 'by far' before superlatives ('by far the best').",
        ar: "نشدد صيغة المقارنة بـ much / far / a lot / slightly ولا نستخدم very قبل المقارنة أبداً (نقول much faster وليس very faster).",
      },
      {
        en: "Double comparatives show cause-and-effect proportion: 'The + comparative (+ S + V), the + comparative (+ S + V)' ('The more you practice, the more confident you become').",
        ar: "تعبر المقارنة المزدوجة عن العلاقة الطردية «كلما... كلما...»: The + صيغة مقارنة...، the + صيغة مقارنة....",
      },
    ],
    examples: [
      {
        en: "The redesigned battery lasts much longer than the previous generation.",
        ar: "تدوم البطارية المُعاد تصميمها لفترة أطول بكثير من الجيل السابق.",
        highlight: "much longer than",
      },
      {
        en: "This bridge is by far the most ambitious engineering project in the province.",
        ar: "هذا الجسر هو بلا شك المشروع الهندسي الأكثر طموحاً في المنطقة.",
        highlight: "by far the most ambitious",
      },
      {
        en: "Learning grammar in context is twice as effective as memorizing isolated lists.",
        ar: "تعلّم القواعد في سياقها أكثر فاعلية بمرتين من حفظ قوائم معزولة.",
        highlight: "twice as effective as",
      },
      {
        en: "The more carefully you plan the outline, the smoother the writing process becomes.",
        ar: "كلما خططت للمسودة بعناية أكبر، أصبحت عملية الكتابة أكثر سلاسة.",
        highlight: "The more carefully you plan the outline, the smoother",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic expresses «أسرع بكثير / أكثر سهولة» using «أكثر + مصدر» and sometimes pairs intensifiers like 'very' with comparatives, leading to 'more better', 'more easier', or 'very taller'. Also never translate «من» in comparatives as 'from' ('taller from me' → correct: 'taller THAN me').",
      ar: "يدفع القياس على العربية المتعلم أحياناً لترجمة «أطول مني» بـ taller from me (والصواب taller than me)، أو الجمع بين more و-er (more easier) أو وضع very قبل المقارنة (very taller والصواب much taller).",
    },
    commonMistake: {
      wrong: "This laptop is more lighter and very faster from my old one.",
      right: "This laptop is much lighter and far faster than my old one.",
      why: {
        en: "Never double-mark comparatives ('more lighter'), use 'much/far' instead of 'very' before comparatives, and use 'than' (never 'from') to compare.",
        ar: "لا نجمع بين more و-er، ونستخدم much/far بدلاً من very قبل صيغة المقارنة، ونستخدم than بدلاً من from للمقارنة.",
      },
    },
    quickCheck: [
      {
        prompt: "Complete the proportional double comparative: 'The higher you climb, ___ the air becomes.'",
        options: ["colder", "the coldest", "the colder", "more colder"],
        correctIndex: 2,
        explanation: {
          en: "Both halves of a double comparative require 'the + comparative' ('The higher..., the colder...').",
          ar: "يتطلب كلا شقي المقارنة المزدوجة صيغة the + مقارنة (The higher..., the colder...).",
        },
      },
      {
        prompt: "Choose the sentence with the right comparative intensifier:",
        options: [
          "The second draft is very clearer than the first.",
          "The second draft is far clearer than the first.",
          "The second draft is more clearer than the first.",
          "The second draft is far clearer from the first.",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Far' (or 'much') validly intensifies a comparative adjective followed by 'than'.",
          ar: "تُستخدم far أو much لتقوية صيغة المقارنة متبوعة بـ than بشكل سليم.",
        },
      },
      {
        prompt: "Which sentence correctly uses 'as ... as' to express inequality?",
        options: [
          "The afternoon session isn't as crowded than the morning one.",
          "The afternoon session isn't as crowded as the morning one.",
          "The afternoon session isn't so crowded than the morning one.",
          "The afternoon session isn't as more crowded as the morning one.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Always pair 'as' with 'as' and the base adjective ('not as crowded as'), never 'than' or a comparative.",
          ar: "تأتي الصيغة دائماً not as + الصفة المجردة + as دون than ودون صيغة مقارنة.",
        },
      },
    ],
  },
  {
    id: "quantifiers",
    order: 49,
    moduleId: "comparatives-quantifiers",
    level: "A2",
    title: {
      en: "Quantifiers (much / many / a lot of / few / a few / little / a little / enough / too)",
      ar: "محددات الكمية (much / many / a lot of / few / a few / little / a little / enough / too)",
    },
    overview: {
      en: "Quantifiers tell you 'how much' or 'how many' and depend strictly on whether the noun is countable plural or uncountable. Pay special attention to the article 'a': 'a few / a little' feel positive ('some, enough to help'), while bare 'few / little' feel negative ('hardly any, not enough').",
      ar: "تحدد أدوات الكمية مقدار الشيء أو عدده، وتعتمد بدقة على كون الاسم معدوداً جمعاً أم غير معدود. وانتبه لأثر أداة النكرة a: فـ a few وa little تحملان معنى إيجابياً (قليل ولكنه كافٍ)، بينما تحمل few وlittle دون a معنى سلبياً (نادر جداً وغير كافٍ).",
    },
    formula:
      "Countable Plural: many / (a) few / several | Uncountable: much / (a) little | Both: a lot of / plenty of / some / any | Position: enough + Noun / Adj + enough / too + Adj",
    forms: {
      affirmative: "We have plenty of time and a few extra chairs if more guests arrive.",
      negative: "There isn't much sugar left, and we don't have enough cups.",
      question: "How many delegates registered, and how much funding do we need?",
    },
    rules: [
      {
        en: "Use 'many / (a) few / too many' ONLY with plural countable nouns ('many emails', 'a few minutes'), and 'much / (a) little / too much' ONLY with uncountable nouns ('much advice', 'a little patience').",
        ar: "نستخدم many و(a) few مع الجمع المعدود فقط، وmuch و(a) little مع غير المعدود فقط.",
      },
      {
        en: "'A lot of / lots of / plenty of' work with BOTH countable plural and uncountable nouns, especially in positive statements; 'much' alone sounds unnatural in positive statements ('a lot of water', NOT 'much water').",
        ar: "تصلح a lot of / lots of / plenty of مع المعدود وغير المعدود في الجمل المثبتة، بينما نفضل much في النفي والسؤال ومع too/so.",
      },
      {
        en: "'A few / a little' = positive ('some, enough'); 'few / little' (without 'a') = negative ('almost none, disappointing'): 'He has a few friends' (he isn't lonely) vs. 'He has few friends' (he is lonely).",
        ar: "تعني a few / a little قدراً قليلاً إيجابياً، أما few / little دون a فتعني قلة سلبية تكاد تصل للعدم.",
      },
      {
        en: "Word order of 'enough' and 'too': 'enough' comes BEFORE nouns ('enough chairs') but AFTER adjectives/adverbs ('warm enough'); 'too' expresses excess/problem and always precedes adjectives or 'much/many' ('too heavy', 'too much noise').",
        ar: "تأتي enough قبل الاسم (enough chairs) وبعد الصفة/الظرف (warm enough)؛ بينما تعبر too عن زيادة مفرطة سلبية وتسبق الصفة أو much/many.",
      },
    ],
    examples: [
      {
        en: "We still have a little time before boarding, so let's grab a quick tea.",
        ar: "ما زال لدينا القليل من الوقت قبل الصعود إلى الطائرة، فلنحتسِ شاياً سريعاً.",
        highlight: "a little time",
      },
      {
        en: "Unfortunately, very few candidates met all the technical requirements.",
        ar: "للأسف، قلة ضئيلة جداً من المرشحين استوفت جميع المتطلبات التقنية.",
        highlight: "very few candidates",
      },
      {
        en: "The conference room isn't large enough, and we don't have enough microphones.",
        ar: "قاعة المؤتمرات ليست واسعة بما يكفي، وليس لدينا ما يكفي من الميكروفونات.",
        highlight: "large enough, and we don't have enough microphones",
      },
      {
        en: "Too much salt ruined the stew, and too many people crowded around the doorway.",
        ar: "أفسد الملح الزائد اليخنة، وتزاحم الكثير جداً من الناس عند المدخل.",
        highlight: "Too much salt ruined the stew, and too many people",
      },
    ],
    arabicInterferenceTip: {
      en: "Important English uncountable nouns are countable in Arabic: 'information' (معلومات), 'advice' (نصائح), 'furniture' (أثاثات), 'equipment' (معدات), 'luggage', 'research', 'news'. Never say 'many informations' or 'a few advices'—use 'a lot of / much / a piece of advice'. Also never use 'too' to mean 'very' positively ('too good' means excessively good, not 'very good').",
      ar: "هناك أسماء غير معدودة في الإنجليزية رغم أنها تُجمع في العربية مثل: information وadvice وfurniture وequipment وnews، فلا نستخدم معها many أو a few أبداً. كما أن too تعني زيادة سلبية وليست بديلاً عن very.",
    },
    commonMistake: {
      wrong: "He gave me many useful advices, and the hall was enough big for everyone.",
      right: "He gave me a lot of useful advice, and the hall was big enough for everyone.",
      why: {
        en: "'Advice' is uncountable (no '-s', no 'many'), and 'enough' must come AFTER the adjective ('big enough').",
        ar: "كلمة advice غير معدودة فلا تُجمع ولا تأخذ many، كما أن enough يجب أن تأتي بعد الصفة (big enough).",
      },
    },
    quickCheck: [
      {
        prompt: "Which sentence conveys a NEGATIVE feeling that the project lacks support?",
        options: [
          "A few volunteers offered to stay late.",
          "Few volunteers offered to stay late.",
          "Several volunteers offered to stay late.",
          "Plenty of volunteers offered to stay late.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Bare 'few' (without 'a') emphasizes scarcity and disappointment ('hardly any').",
          ar: "كلمة few بدون أداة النكرة a تعني قلة سلبية مخيبة للآمال (بالكاد يوجد أحد).",
        },
      },
      {
        prompt: "Choose the sentence with correct 'enough' word order:",
        options: [
          "She is enough experienced to lead the audit, and we have time enough.",
          "She is experienced enough to lead the audit, and we have enough time.",
          "She is experienced enough to lead the audit, and we have time too.",
          "She is too experienced enough to lead the audit.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Place 'enough' AFTER adjectives ('experienced enough') and BEFORE nouns ('enough time').",
          ar: "توضع enough بعد الصفة (experienced enough) وقبل الاسم (enough time).",
        },
      },
      {
        prompt: "Complete the sentence: 'How ___ equipment and how ___ technicians do we need on site?'",
        options: [
          "many / much",
          "much / many",
          "few / little",
          "much / much",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Equipment' is uncountable ('how much equipment'), while 'technicians' is plural countable ('how many technicians').",
          ar: "كلمة equipment غير معدودة فتأخذ how much، بينما technicians جمع معدود فتأخذ how many.",
        },
      },
    ],
  },
  {
    id: "determiners-distributives",
    order: 50,
    moduleId: "comparatives-quantifiers",
    level: "B2",
    title: {
      en: "Determiners & Distributives (both / either / neither / each / every / all / whole)",
      ar: "المحددات وأدوات التوزيع (both / either / neither / each / every / all / whole)",
    },
    overview: {
      en: "Distributives specify how a group or pair is referred to—as two items ('both', 'either', 'neither'), individual members ('each', 'every'), or a complete totality ('all', 'whole'). Choosing the right singular vs. plural noun and verb form is essential for B2–C1 accuracy.",
      ar: "تحدد أدوات التوزيع كيفية الإشارة إلى زوج أو مجموعة: إما لعنصرين فقط (both / either / neither)، أو للأفراد واحداً تلو الآخر (each / every)، أو للكلية الكاملة (all / whole). واختيار صيغة المفرد والجمع الدقيقة معها ضروري لإتقان المستويات المتقدمة.",
    },
    formula:
      "Pairs (2): both + Plural | either / neither + Singular (or + of the + Plural) || Groups (3+): each / every + Singular | all + Plural/Uncountable | the whole + Singular",
    forms: {
      affirmative: "Both proposals look strong, so either option works for the whole team.",
      negative: "Neither candidate had prior experience, yet each applicant passed the test.",
      question: "Did every participant receive all the handouts?",
    },
    rules: [
      {
        en: "Use 'both', 'either', and 'neither' ONLY for TWO items: 'both + plural noun + plural verb'; 'either / neither + singular noun + singular verb' ('Neither answer is correct').",
        ar: "تُستخدم both وeither وneither لاثنين فقط: تأخذ both جمعاً، وتأخذ either وneither اسماً مفرداً وفعلاً مفرداً (Neither answer is correct).",
      },
      {
        en: "'Each' focuses on individuals one by one (works for 2 or more, and can stand before 'of': 'each of the students'); 'every' looks at a group of 3+ as a collective and NEVER takes 'of' directly (use 'every one of').",
        ar: "تركز each على كل فرد على حدة (لاثنين فأكثر، وتقبل each of)، بينما تشير every لمجموعة من 3 فأكثر ولا يتبعها of مباشرة بل نقول every one of.",
      },
      {
        en: "'All' vs. 'whole': 'all' comes BEFORE determiners ('all the day', 'all my life', 'all the books'); 'whole' comes AFTER determiners and modifies a singular countable noun ('the whole day', 'my whole life').",
        ar: "تسبق all أداة التعريف أو الملكية (all the day / all my life)، بينما تأتي whole بعدها مع اسم مفرد معدود (the whole day / my whole life).",
      },
      {
        en: "Never double-negate with 'neither': 'Neither of them called' (NOT 'Neither of them didn't call'). Use 'none of' (not 'neither of') for zero out of THREE or more.",
        ar: "لا نضع نفياً آخر مع neither لأنها منفية أصلاً (Neither of them called)، ونستخدم none of (وليس neither of) عند نفي ثلاثة فأكثر.",
      },
    ],
    examples: [
      {
        en: "Both airports remained open, though neither runway operated at full capacity.",
        ar: "بقي كلا المطارين مفتوحين، رغم أن أياً من المدرجين لم يعمل بكامل طاقته.",
        highlight: "Both airports remained open, though neither runway",
      },
      {
        en: "Each of the six finalists received detailed feedback from the judges.",
        ar: "تلقّى كل واحد من المتأهلين الستة ملاحظات مفصلة من لجنة التحكيم.",
        highlight: "Each of the six finalists",
      },
      {
        en: "She spent the whole afternoon reviewing all the lab reports.",
        ar: "قضت فترة بعد الظهر بأكملها في مراجعة جميع تقارير المختبر.",
        highlight: "the whole afternoon reviewing all the lab reports",
      },
      {
        en: "We interviewed five applicants, but none of them could relocate immediately.",
        ar: "قابلنا خمسة متقدمين، لكن لم يتمكن أي منهم من الانتقال فوراً.",
        highlight: "none of them",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic uses «كل» for 'all', 'every', 'each', AND 'whole' («كل الطلاب / كل طالب / اليوم كله»), so Arab learners often write 'every students', 'all the whole day', or 'every of them'. Always check noun number: 'every + SINGULAR', 'all + PLURAL/UNCOUNTABLE', and 'the whole + SINGULAR'.",
      ar: "تغطي كلمة «كل» في العربية معاني all وevery وeach وwhole معاً، مما يسبب أخطاء مثل every students أو every of them أو whole the day. التزم بالقاعدة: every + مفرد، وall + جمع/غير معدود، وthe whole + مفرد.",
    },
    commonMistake: {
      wrong: "Every of the two brothers didn't miss whole the match.",
      right: "Neither of the two brothers missed the whole match.",
      why: {
        en: "Never say 'every of' (and for two items use 'both/each/neither'), never double-negate with 'neither', and place 'the' BEFORE 'whole' ('the whole match').",
        ar: "لا نقول every of، ومع اثنين نستخدم neither دون نفي إضافي، وتسبق أداة التعريف the كلمة whole فنقول the whole match.",
      },
    },
    quickCheck: [
      {
        prompt: "Choose the correct sentence referring to TWO hotels:",
        options: [
          "Neither hotels had available rooms this weekend.",
          "Neither hotel had available rooms this weekend.",
          "None of the two hotels had available rooms this weekend.",
          "Neither hotel didn't have available rooms this weekend.",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Neither' directly precedes a singular countable noun ('Neither hotel') and already carries negative meaning.",
          ar: "تأتي neither مباشرة قبل اسم مفرد معدود (Neither hotel) وتحمل معنى النفي دون حاجة لـ didn't.",
        },
      },
      {
        prompt: "Which phrase is grammatically correct?",
        options: [
          "every of the employees",
          "whole the week",
          "each of the employees",
          "all whole week",
        ],
        correctIndex: 2,
        explanation: {
          en: "'Each of + plural noun' is valid, whereas 'every' cannot precede 'of' directly and 'whole' requires 'the whole week'.",
          ar: "صيغة each of + جمع صحيحة، بينما لا يصح every of ولا whole the week.",
        },
      },
      {
        prompt: "Complete the sentence: 'She read ___ book in a single evening, and ___ the chapters were gripping.'",
        options: [
          "whole the / all",
          "the whole / all",
          "all / the whole",
          "the whole / every",
        ],
        correctIndex: 1,
        explanation: {
          en: "'The whole + singular noun' ('the whole book') pairs cleanly with 'all + the + plural noun' ('all the chapters').",
          ar: "نستخدم the whole قبل الاسم المفرد (the whole book) وall قبل the + الجمع (all the chapters).",
        },
      },
    ],
  },

  // =========================================================================
  // MODULE 11: Agreement, Question Tags & Conjunctions (Orders 51–53)
  // =========================================================================
  {
    id: "subject-verb-agreement",
    order: 51,
    moduleId: "agreement-tags-conjunctions",
    level: "B2",
    title: {
      en: "Subject-Verb Agreement (Collective Nouns, neither...nor, Indefinite Pronouns & Tricky Subjects)",
      ar: "تطابق الفاعل والفعل (أسماء الجمع، neither...nor، الضمائر غير المحددة، والفواعل الخادعة)",
    },
    overview: {
      en: "A verb must agree in number with its true grammatical subject—not with a nearby noun inside a prepositional phrase. Mastering indefinite pronouns ('everyone', 'nobody'), correlative pairs ('neither...nor'), 'a number of' vs. 'the number of', and collective or plural-looking singular nouns prevents high-frequency errors in formal tests.",
      ar: "يجب أن يتطابق الفعل إفراداً وجمعاً مع الفاعل الحقيقي للجملة لا مع أقرب اسم مجرور بحرف جر. ويمنع إتقان الضمائر غير المحددة (everyone / nobody) وneither...nor والفرق بين a number of وthe number of والأسماء المنتهية بـ s المفردة أخطاء شائعة في الاختبارات الرسمية.",
    },
    formula:
      "everyone / each / the number of / news / economics → Singular Verb | a number of / police / people → Plural Verb | neither A nor B → agrees with B (closest subject)",
    forms: {
      affirmative: "Neither the coach nor the players were satisfied with the draw.",
      negative: "Everyone in the two departments doesn't agree with the new schedule.",
      question: "Does the number of enrolled students exceed last year's record?",
    },
    rules: [
      {
        en: "Ignore intervening phrases like 'along with', 'as well as', 'together with', and prepositional phrases ('of the boxes'): match the verb to the TRUE head subject ('The box of glass bottles IS fragile'; 'The manager, along with her assistants, IS attending').",
        ar: "تجاهل العبارات الاعتراضية مثل along with وas well as والمجرور بـ of، وطابِق الفعل مع رأس الفاعل الحقيقي (The box of bottles IS fragile).",
      },
      {
        en: "Indefinite pronouns ending in '-one', '-body', '-thing' ('everyone', 'somebody', 'nothing', 'each', 'either') ALWAYS take a singular verb ('Everybody knows the rules').",
        ar: "الضمائر غير المحددة المنتهية بـ one/body/thing (مثل everyone / nobody / each) تأخذ فعلاً مفرداً دائماً.",
      },
      {
        en: "Proximity rule for 'either...or' and 'neither...nor': the verb agrees with the subject CLOSEST to it ('Neither the players nor the captain WAS late' vs. 'Neither the captain nor the players WERE late').",
        ar: "قاعدة الأقرب مع either...or وneither...nor: يتبع الفعل الفاعل الأقرب إليه مباشرة إفراداً وجمعاً.",
      },
      {
        en: "Tricky look-alikes: 'The number of + plural' takes a SINGULAR verb ('The number of applicants IS rising'), while 'A number of + plural' (= many) takes a PLURAL verb ('A number of applicants ARE waiting'). Academic subjects and '-s' singulars ('news', 'mathematics', 'physics', 'economics', 'five kilometers', 'ten dollars') take singular verbs; 'police' and 'people' take plural verbs.",
        ar: "انتبه للتراكيب الخادعة: The number of تأخذ مفرداً، بينما A number of (= كثير من) تأخذ جمعاً؛ وأسماء مثل news وeconomics والمبالغ والمسافات تأخذ مفرداً، بينما police وpeople تأخذ جمعاً.",
      },
    ],
    examples: [
      {
        en: "The director, along with three senior engineers, is inspecting the new turbine today.",
        ar: "المدير، برفقة ثلاثة من كبار المهندسين، يتفقد التوربين الجديد اليوم.",
        highlight: "The director, along with three senior engineers, is inspecting",
      },
      {
        en: "Neither the flight attendant nor the pilots were informed of the gate change.",
        ar: "لم يتم إبلاغ مضيفة الطيران ولا الطيارين بتغيير البوابة.",
        highlight: "nor the pilots were informed",
      },
      {
        en: "The number of electric vehicles on the road has doubled, and a number of charging stations are opening monthly.",
        ar: "تضاعف عدد المركبات الكهربائية على الطرقات، ويُفتتح عدد كبير من محطات الشحن شهرياً.",
        highlight: "The number of electric vehicles on the road has doubled",
      },
      {
        en: "The news about the fellowship is encouraging, and everyone in our lab is thrilled.",
        ar: "الأخبار حول الزمالة مشجعة، والجميع في مختبرنا مسرورون للغاية.",
        highlight: "The news about the fellowship is encouraging",
      },
    ],
    arabicInterferenceTip: {
      en: "In Arabic, «الجميع حاضرون» and «الأخبار جيدة» treat 'everyone' and 'news' as plural/feminine-plural concepts, and «الشرطة وصلت» uses a feminine singular verb for 'police'. In English, invert those habits: 'Everyone IS', 'The news IS', 'The police ARE', and 'People ARE'.",
      ar: "في العربية نجمع الفعل مع «الجميع» ونفرد الفعل مع «الشرطة» («وصلت الشرطة»). في الإنجليزية العكس تماماً: Everyone وThe news تأخذ فعلاً مفرداً (is)، بينما The police وPeople تأخذ فعلاً جمعاً (are).",
    },
    commonMistake: {
      wrong: "Everyone in the classrooms are quiet, the news are good, and the police is here.",
      right: "Everyone in the classrooms is quiet, the news is good, and the police are here.",
      why: {
        en: "'Everyone' and 'news' are grammatically singular ('is'), while 'police' is always grammatically plural ('are').",
        ar: "كلمتا everyone وnews مفردتان نحوياً وتأخذان is، بينما كلمة police جمع دائماً وتأخذ are.",
      },
    },
    quickCheck: [
      {
        prompt: "Choose the correct verb: 'Neither the teachers nor the principal ___ approved the excursion yet.'",
        options: ["have", "has", "are", "were"],
        correctIndex: 1,
        explanation: {
          en: "With 'neither...nor', the verb agrees with the closest subject ('the principal' = singular → 'has').",
          ar: "مع neither...nor يطابق الفعل الفاعل الأقرب إليه وهو the principal (مفرد) فيأخذ has.",
        },
      },
      {
        prompt: "Complete both blanks accurately: 'A number of rare books ___ missing, though the number of active borrowers ___ stayed steady.'",
        options: [
          "is / have",
          "are / has",
          "is / has",
          "are / have",
        ],
        correctIndex: 1,
        explanation: {
          en: "'A number of + plural' means 'several/many' and takes a plural verb ('are'); 'The number of' refers to a single statistic and takes a singular verb ('has').",
          ar: "تأخذ A number of فعلاً جمعاً (are) لأنها تعني «عدد كبير من»، بينما تأخذ The number of فعلاً مفرداً (has) لأنها تشير إلى الرقم نفسه.",
        },
      },
      {
        prompt: "Select the sentence with flawless subject-verb agreement:",
        options: [
          "Ten kilometers are too far to walk in this heat.",
          "The list of recommended textbooks are on the syllabus.",
          "The professor, as well as her doctoral students, was invited to the symposium.",
          "Economics are one of the most popular majors at this university.",
        ],
        correctIndex: 2,
        explanation: {
          en: "'As well as her doctoral students' does not pluralize the singular subject 'The professor' ('was invited'). Distances, 'list', and 'economics' all take singular verbs.",
          ar: "العبارة الاعتراضية as well as لا تجمع الفاعل المفرد The professor، لذا was invited صحيحة تماماً.",
        },
      },
    ],
  },
  {
    id: "question-tags-short-answers",
    order: 52,
    moduleId: "agreement-tags-conjunctions",
    level: "B1",
    title: {
      en: "Question Tags, Short Answers & So do I / Neither do I",
      ar: "الأسئلة الذيلية والإجابات المختصرة وصيغ الموافقة (So do I / Neither do I)",
    },
    overview: {
      en: "Question tags turn statements into conversational checks ('You've met Tariq, haven't you?'), while 'So do I / Neither do I' let you agree naturally without repeating the whole sentence. Both patterns depend on mirroring the exact auxiliary verb (or supplying 'do/does/did') and flipping polarity correctly.",
      ar: "تحوّل الأسئلة الذيلية الجمل الخبرية إلى أسئلة تأكيدية محادثية (أليس كذلك؟)، بينما تتيح صيغ So do I وNeither do I التعبير عن الموافقة بسلاسة دون تكرار الجملة كاملة. ويعتمد التركيبان على عكس الفعل المساعد نفسه (أو استدعاء do/does/did) بدقة.",
    },
    formula:
      "Tag: Positive Statement, Negative Auxiliary + Pronoun? | Negative Statement, Positive Auxiliary + Pronoun? || Agree: So / Neither + Auxiliary + Subject",
    forms: {
      affirmative: "She speaks fluent French, doesn't she? — Yes, she does, and so do I.",
      negative: "They haven't called back yet, have they? — No, they haven't, and neither has Ali.",
      question: "Let's take a short break, shall we?",
    },
    rules: [
      {
        en: "Polarity flip: positive statement → negative contracted tag ('You can swim, can't you?'); negative statement (including 'never', 'rarely', 'hardly', 'nobody', 'nothing') → positive tag ('He rarely complains, does he?').",
        ar: "قاعدة عكس القطبية: الجملة المثبتة تأخذ ذيلاً منفياً مختصراً، والجملة المنفية (بما في ذلك الكلمات ذات المعنى المنفي مثل never وrarely وhardly وnobody) تأخذ ذيلاً مثبتاً.",
      },
      {
        en: "Match the auxiliary verb strictly; if the main clause has only a simple verb (Present Simple / Past Simple without 'be'), supply 'don't / doesn't / didn't' ('She arrived early, didn't she?'). Always use a subject pronoun in the tag.",
        ar: "طابِق الفعل المساعد في الجملة، وإذا لم يوجد فعل مساعد في المضارع أو الماضي البسيط استخدم don't/doesn't/didn't، واجعل الفاعل في الذيل ضميراً دائماً.",
      },
      {
        en: "Essential irregular tags: 'I am ...' → 'aren't I?' (NOT 'amn't I?'); 'Let's ...' → 'shall we?'; imperatives → 'will you? / won't you?'; 'Nobody / Everybody' → plural pronoun 'they' ('Everyone enjoyed it, didn't they?'); 'Nothing / Everything' → 'it'.",
        ar: "ذيول شاذة مهمة: I am تأخذ aren't I?، وLet's تأخذ shall we?، والأمر يأخذ will you?، وEveryone/Nobody تأخذ الضمير they.",
      },
      {
        en: "Agreeing in conversation: agree with a positive statement using 'So + auxiliary + Subject' (or 'Subject + auxiliary + too'); agree with a negative statement using 'Neither / Nor + positive auxiliary + Subject' (or 'Subject + negative auxiliary + either').",
        ar: "للموافقة مع جملة مثبتة نستخدم So + فعل مساعد + فاعل، وللموافقة مع جملة منفية نستخدم Neither + فعل مساعد مثبت + فاعل (مثل Neither do I / Neither have I).",
      },
    ],
    examples: [
      {
        en: "I'm on the right train to Alexandria, aren't I?",
        ar: "أنا على القطار الصحيح المتجه إلى الإسكندرية، أليس كذلك؟",
        highlight: "aren't I?",
      },
      {
        en: "She hardly ever misses a morning workout, does she?",
        ar: "هي نادراً ما تفوّت تمرينها الصباحي، أليس كذلك؟",
        highlight: "hardly ever misses a morning workout, does she?",
      },
      {
        en: "Everyone submitted the peer review on time, didn't they?",
        ar: "سلّم الجميع مراجعة الأقران في الوقت المحدد، أليس كذلك؟",
        highlight: "didn't they?",
      },
      {
        en: "A: 'I haven't finished reading chapter four yet.' B: 'Neither have I.'",
        ar: "أ: «لم أنتهِ من قراءة الفصل الرابع بعد». ب: «ولا أنا أيضاً».",
        highlight: "Neither have I.",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic uses one universal tag («أليس كذلك؟ / صح؟») regardless of tense or subject, pushing learners to attach ', isn't it?' to every English sentence ('You live here, isn't it?'). Always copy the actual tense auxiliary and subject pronoun ('You live here, don't you?'), and never say 'Me neither' with a negative verb ('Neither don't I').",
      ar: "تستخدم العربية صيغة واحدة للجميع («أليس كذلك؟»)، مما يجعل المتعلم يكرر isn't it? مع كل جملة خطأً. في الإنجليزية يتغير الذيل بحسب الزمن والفاعل (don't you? / didn't she? / haven't they?). ولا نضع نفياً بعد Neither (نقول Neither do I لا Neither don't I).",
    },
    commonMistake: {
      wrong: "You finished the report yesterday, isn't it? — I didn't finish it either, and neither didn't Sara.",
      right: "You finished the report yesterday, didn't you? — I didn't finish it either, and neither did Sara.",
      why: {
        en: "Past Simple 'finished' requires the tag 'didn't you?', and 'neither' is already negative so it takes a positive auxiliary ('neither did Sara').",
        ar: "الفعل الماضي البسيط finished يتطلب الذيل didn't you?، وكلمة neither منفية أصلاً فيتبعها فعل مساعد مثبت (neither did Sara).",
      },
    },
    quickCheck: [
      {
        prompt: "Add the correct question tag: 'Nobody called while I was out, ___?'",
        options: [
          "didn't they",
          "did they",
          "did he",
          "wasn't it",
        ],
        correctIndex: 1,
        explanation: {
          en: "'Nobody' is negative (so the tag is positive) and takes the plural pronoun 'they' in tags ('did they?').",
          ar: "كلمة Nobody تحمل معنى النفي فيكون الذيل مثبتاً، وتأخذ الضمير الجمع they في الأسئلة الذيلية (did they?).",
        },
      },
      {
        prompt: "Choose the natural agreement response to: 'I've never tried scuba diving.'",
        options: [
          "So have I.",
          "Neither haven't I.",
          "Neither have I.",
          "Neither did I.",
        ],
        correctIndex: 2,
        explanation: {
          en: "Match the Present Perfect auxiliary 'have' after 'Neither' with no extra 'not' ('Neither have I').",
          ar: "نطابق الفعل المساعد في المضارع التام (have) بعد Neither دون نفي إضافي: Neither have I.",
        },
      },
      {
        prompt: "Complete the tag question accurately: 'Let's review the budget before noon, ___?'",
        options: ["will we", "don't we", "shall we", "aren't we"],
        correctIndex: 2,
        explanation: {
          en: "Suggestions starting with 'Let's' always take the fixed tag 'shall we?'.",
          ar: "الاقتراحات التي تبدأ بـ Let's تأخذ دائماً السؤال الذيلي الثابت shall we?.",
        },
      },
    ],
  },
  {
    id: "conjunctions-coordinating-subordinating-correlative",
    order: 53,
    moduleId: "agreement-tags-conjunctions",
    level: "B2",
    title: {
      en: "Coordinating, Subordinating & Correlative Conjunctions (not only...but also, whereas, provided that)",
      ar: "أدوات الربط: العطف والتبعية والربط المزدوج (not only...but also, whereas, provided that)",
    },
    overview: {
      en: "Conjunctions build logical architecture across clauses. Coordinating conjunctions (FANBOYS) join equal clauses, subordinating conjunctions ('whereas', 'provided that', 'as long as', 'in case') express nuanced contrast or conditions, and correlative pairs ('not only...but also', 'both...and', 'neither...nor') demand strict parallel structure.",
      ar: "تبني أدوات الربط البنية المنطقية بين الجمل: فأدوات العطف (FANBOYS) تربط جملاً متكافئة، وأدوات التبعية (whereas / provided that / as long as / in case) تعبر عن التباين الدقيق أو الشروط، والأزواج المتلازمة (not only...but also / both...and) تتطلب توازياً نحوياً صارماً.",
    },
    formula:
      "FANBOYS: for, and, nor, but, or, yet, so | Subordinating: whereas / while / provided (that) / as long as / in case | Correlative: not only [X] but also [X] (parallel!)",
    forms: {
      affirmative: "The software is not only fast but also remarkably easy to maintain.",
      negative: "We won't expand into new markets unless—or provided that—costs stay predictable.",
      question: "Should we pack an extra adapter in case the hotel outlets are different?",
    },
    rules: [
      {
        en: "Coordinating conjunctions (FANBOYS: for, and, nor, but, or, yet, so) join two independent clauses with a comma BEFORE the conjunction ('The road was icy, so we drove slowly'). Avoid comma splices (never join two independent clauses with a comma alone).",
        ar: "تربط أدوات العطف (FANBOYS) جملتين مستقلتين مع وضع فاصلة قبل أداة العطف؛ وتجنب خطأ ربط جملتين مستقلتين بفاصلة فقط دون أداة ربط.",
      },
      {
        en: "Contrast with 'whereas / while': directly compare two contrasting facts ('Northern regions receive heavy rainfall, whereas southern valleys remain arid').",
        ar: "تُستخدم whereas وwhile للمقارنة المباشرة بين حقيقتين متباينتين في جملة واحدة.",
      },
      {
        en: "Conditional linkers: 'provided (that) / as long as' = 'only if' ('You may borrow the camera provided that you return it Friday'); 'in case' = precaution BEFORE something happens ('Take a sweater in case it gets chilly' ≠ 'if').",
        ar: "تعني provided that وas long as «شريطة أن»، بينما تعني in case «تحسباً لاحتمال» وتدل على إجراء وقائي مسبق (وتختلف عن if).",
      },
      {
        en: "Parallelism in correlative conjunctions ('both...and', 'either...or', 'neither...nor', 'not only...but also'): the grammatical form after Part 1 MUST match the grammatical form after Part 2 (noun + noun, adj + adj, verb + verb, prep phrase + prep phrase).",
        ar: "قاعدة التوازي في الروابط المزدوجة (both...and / not only...but also): يجب أن يتطابق التركيب النحوي بعد الجزء الأول مع التركيب بعد الجزء الثاني (اسم مع اسم، صفة مع صفة، فعل مع فعل).",
      },
    ],
    examples: [
      {
        en: "The new ferry reduces travel time by half, whereas the old coastal highway takes four hours.",
        ar: "تختصر العبّارة الجديدة زمن السفر إلى النصف، بينما يستغرق الطريق الساحلي القديم أربع ساعات.",
        highlight: "whereas the old coastal highway takes four hours",
      },
      {
        en: "You can access the archive remotely provided that you verify your institutional ID.",
        ar: "يمكنك الوصول إلى الأرشيف عن بُعد شريطة أن تتحقق من هويتك المؤسسية.",
        highlight: "provided that you verify",
      },
      {
        en: "Save a local copy of your presentation in case the conference Wi-Fi drops.",
        ar: "احفظ نسخة محلية من عرضك التقديمي تحسباً لانقطاع شبكة الواي فاي في المؤتمر.",
        highlight: "in case the conference Wi-Fi drops",
      },
      {
        en: "The curriculum strengthens not only analytical writing but also spoken fluency.",
        ar: "يعزّز المنهج ليس فقط الكتابة التحليلية بل أيضاً الطلاقة الشفوية.",
        highlight: "not only analytical writing but also spoken fluency",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic allows long chains of clauses joined only by «و» or commas («وصلنا مبكراً، كانت القاعة ممتلئة»), which transfers into English run-on sentences and comma splices, and learners also confuse 'in case' with 'if' (taking a precaution vs. acting only when it happens) and break parallelism after 'not only...but also'.",
      ar: "تقبل العربية ربط جمل طويلة بالفواصل وحرف العطف «و»، مما يسبب في الإنجليزية خطأ الجمل المتصلة بفاصلة فقط (comma splice). كما يخلط البعض بين in case (للوقاية المسبقة) وif، أو يخلّون بالتوازي بعد not only...but also.",
    },
    commonMistake: {
      wrong: "She not only wants to study law, but also learning diplomacy, however the tuition is high.",
      right: "She wants to study not only law but also diplomacy; however, the tuition is high.",
      why: {
        en: "Keep parallel nouns after 'not only ... but also' ('law' and 'diplomacy'), and remember that 'however' is a conjunctive adverb requiring a semicolon or period before it, not a comma.",
        ar: "حافظ على التوازي بين الاسمين بعد not only...but also (law وdiplomacy)، وتذكر أن however ظرف ربط يحتاج قبله فاصلة منقوطة أو نقطة لا فاصلة عادية.",
      },
    },
    quickCheck: [
      {
        prompt: "Choose the sentence with STRICT parallel structure in a correlative conjunction:",
        options: [
          "The workshop was both informative and it inspired everyone.",
          "The workshop was not only informative but also inspiring.",
          "The workshop not only was informative, but also inspiring.",
          "The workshop was either informative nor inspiring.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Both halves after 'not only' and 'but also' are matching adjectives ('informative' and 'inspiring').",
          ar: "يتطابق الجزءان بعد not only وbut also كصفتين متوازيتين (informative وinspiring).",
        },
      },
      {
        prompt: "Complete the precaution sentence: 'Write down the confirmation code ___ the app logs you out.'",
        options: ["provided that", "whereas", "in case", "as long as"],
        correctIndex: 2,
        explanation: {
          en: "'In case + Present Simple' expresses doing something NOW as a precaution against a possible future problem.",
          ar: "تُستخدم in case + المضارع البسيط للتعبير عن إجراء احتياطي مسبق تحسباً لمشكلة محتملة.",
        },
      },
      {
        prompt: "Which punctuation with 'however' avoids a comma splice?",
        options: [
          "The prototype passed lab tests, however, field trials revealed a flaw.",
          "The prototype passed lab tests; however, field trials revealed a flaw.",
          "The prototype passed lab tests however field trials revealed a flaw.",
          "The prototype passed lab tests, however field trials revealed a flaw.",
        ],
        correctIndex: 1,
        explanation: {
          en: "'However' is a conjunctive adverb (not a FANBOYS conjunction), so it needs a semicolon (or period) before it and a comma after it.",
          ar: "كلمة however ظرف ربط وليست من أدوات العطف FANBOYS، لذا تتطلب فاصلة منقوطة (أو نقطة) قبلها وفاصلة بعدها.",
        },
      },
    ],
  },

  // =========================================================================
  // MODULE 12: Advanced Mastery (Orders 54–56)
  // =========================================================================
  {
    id: "negative-conditional-inversion",
    order: 54,
    moduleId: "advanced-mastery",
    level: "C1",
    title: {
      en: "Negative & Conditional Inversion (Never have I..., Not only did..., Had I known...)",
      ar: "القلب النحوي بعد النفي وفي الشرط (Never have I... / Not only did... / Had I known...)",
    },
    overview: {
      en: "Subject-auxiliary inversion places the auxiliary verb BEFORE the subject in declarative sentences for high-register emphasis, dramatic narrative, or formal academic precision. It occurs most famously after fronted negative/restrictive adverbials ('Never', 'Seldom', 'Not only', 'Little', 'No sooner') and in formal 'if'-omitted conditionals ('Had I known', 'Should you need', 'Were we to agree').",
      ar: "يقدّم القلب النحوي الفعل المساعد على الفاعل في الجمل الخبرية لإضفاء توكيد بلاغي عالٍ أو دقة أكاديمية رسمية. ويحدث أبرزها بعد تصدير ظروف النفي والتقييد (Never / Seldom / Not only / Little / No sooner) وفي الجمل الشرطية الرسمية المحذوفة منها if (Had I known / Should you need / Were we to agree).",
    },
    formula:
      "Negative Adverbial + Auxiliary + Subject + Main Verb | Conditionals without 'if': Should + S + V1 / Were + S + (to V1) / Had + S + V3",
    forms: {
      affirmative: "Never have I witnessed such remarkable teamwork under pressure.",
      negative: "Had we not checked the pressure valve, the pipeline would have burst.",
      question: "Notice: inversion uses question word order inside a STATEMENT (ending with a period, not a question mark).",
    },
    rules: [
      {
        en: "Fronted negative or restrictive expressions trigger immediate inversion in the SAME clause: Never, Rarely, Seldom, Little, Hardly/Scarcely...when, No sooner...than, Not only...but also, Under no circumstances, At no time ('Seldom have we seen such accuracy').",
        ar: "عند تصدير ظروف النفي أو الندرة (Never / Rarely / Seldom / Little / No sooner / Not only / Under no circumstances) في بداية الجملة نقلب الفعل المساعد قبل الفاعل فوراً.",
      },
      {
        en: "DELAYED INVERSION trap: With 'Only after / Only when / Only by / Not until + clause/phrase', invert the MAIN clause—NOT the subordinate clause right after the marker ('Not until the verdict was read DID the courtroom fall silent').",
        ar: "فخ القلب المؤجَّل: مع Only after وOnly when وNot until يقع القلب في الجملة الرئيسية الثانية لا في الجملة الفرعية الأولى (Not until ... DID the courtroom fall silent).",
      },
      {
        en: "Pair 'No sooner ... THAN' and 'Hardly / Scarcely ... WHEN' strictly with Past Perfect inversion ('No sooner had we landed than the storm broke').",
        ar: "نربط No sooner بـ than، ونربط Hardly / Scarcely بـ when، وغالباً مع قلب الماضي التام (No sooner had we landed than...).",
      },
      {
        en: "Formal conditional inversion drops 'if': 1st → 'Should you have any questions, contact us'; 2nd → 'Were I in charge / Were they to accept, we would proceed'; 3rd → 'Had I known earlier, I would have helped'. In negatives, NEVER contract 'Hadn't'—write 'Had I not known'.",
        ar: "في الشرط الرسمي نحذف if ونقلب: الشرطية الأولى (Should you need...)، الثانية (Were I / Were they to...)، الثالثة (Had I known...). وفي النفي نكتب Had I not ولا نختصر Hadn't أبداً.",
      },
    ],
    examples: [
      {
        en: "Not only did the research confirm the hypothesis, but it also uncovered a new catalyst.",
        ar: "لم يؤكد البحث الفرضية فحسب، بل كشف أيضاً عن محفّز جديد.",
        highlight: "Not only did the research confirm",
      },
      {
        en: "No sooner had the keynote ended than attendees crowded around the stage.",
        ar: "ما كادت الكلمة الرئيسية تنتهي حتى احتشد الحضور حول المنصة.",
        highlight: "No sooner had the keynote ended than",
      },
      {
        en: "Only after the audit was completed did the board realize the scale of the savings.",
        ar: "لم يدرك المجلس حجم الوفورات إلا بعد اكتمال عملية التدقيق.",
        highlight: "did the board realize",
      },
      {
        en: "Had the engineers not spotted the hairline crack, the bridge would have been unsafe.",
        ar: "لولا أن المهندسين رصدوا الشق الدقيق لما كان الجسر آمناً.",
        highlight: "Had the engineers not spotted",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic naturally fronts verbs and negatives («لم أرَ قط مثل هذا المشهد») without needing an English dummy auxiliary like 'do/did', so learners frequently forget 'did/have' ('Never I saw such a view' or 'Not only he wrote...'). Also watch the negative conditional trap: write 'Had I NOT known', never 'Hadn't I known'.",
      ar: "تسمح العربية بتقديم الفعل والمنفي مباشرة دون فعل مساعد مستقل، فينسى المتعلم إضافة did/have عند القلب الإنجليزي (فيقول Never I saw خطأً والصواب Never have I seen). وانتبه أيضاً في الشرط المنفي: نكتب Had I not known لا Hadn't I known.",
    },
    commonMistake: {
      wrong: "Not only she won the scholarship, but also hadn't she applied early, she would have missed it.",
      right: "Not only did she win the scholarship, but had she not applied early, she would have missed it.",
      why: {
        en: "Insert 'did' and invert after fronted 'Not only' ('did she win'), and keep 'not' uncontracted after the subject in negative conditional inversion ('had she not applied').",
        ar: "نضيف الفعل المساعد did ونقلبه بعد Not only (did she win)، وفي الشرط المقلوب المنفي نضع not منفصلة بعد الفاعل (had she not applied).",
      },
    },
    quickCheck: [
      {
        prompt: "Choose the sentence with accurate delayed inversion after 'Not until':",
        options: [
          "Not until did the rain stop we resumed the tournament.",
          "Not until the rain stopped did we resume the tournament.",
          "Not until the rain stopped we resumed the tournament.",
          "Not until did the rain stop did we resume the tournament.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Keep normal word order in the time clause ('the rain stopped') and invert ONLY the main clause ('did we resume').",
          ar: "نبقي الجملة الزمنية بترتيبها العادي (the rain stopped) ونقلب الجملة الرئيسية فقط (did we resume).",
        },
      },
      {
        prompt: "Rewrite formally without 'if': 'If they had not acted quickly, the data would have been lost.'",
        options: [
          "Hadn't they acted quickly, the data would have been lost.",
          "Had they not acted quickly, the data would have been lost.",
          "Did they not act quickly, the data would have been lost.",
          "Were they not acted quickly, the data would have been lost.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Negative Third Conditional inversion is always 'Had + Subject + not + V3'—never contracted 'Hadn't'.",
          ar: "القلب المنفي للشرطية الثالثة يكون دائماً Had + الفاعل + not + V3 دون اختصار Hadn't.",
        },
      },
      {
        prompt: "Complete the sentence accurately: 'No sooner ___ the announcement ___ the phone lines began ringing nonstop.'",
        options: [
          "they made / when",
          "had they made / when",
          "had they made / than",
          "did they made / than",
        ],
        correctIndex: 2,
        explanation: {
          en: "'No sooner' triggers inversion ('had they made') and ALWAYS pairs with 'than' (not 'when').",
          ar: "تستوجب No sooner القلب (had they made) وتقترن دائماً بـ than وليس when.",
        },
      },
    ],
  },
  {
    id: "subjunctive-mandatives",
    order: 55,
    moduleId: "advanced-mastery",
    level: "C1",
    title: {
      en: "Subjunctive Mood & Formal Mandatives (It is essential that he attend...)",
      ar: "صيغة النصب/الالتزام الرسمية (Subjunctive Mood: It is essential that he attend...)",
    },
    overview: {
      en: "The English mandative subjunctive uses the BARE BASE FORM of the verb—with NO '-s' for he/she/it, 'be' instead of 'is/are/was', and bare 'not + V1' for negatives—inside 'that'-clauses following verbs, adjectives, and nouns of demand, recommendation, or urgency. It is a hallmark of formal legal, diplomatic, and C1–C2 academic English.",
      ar: "تستخدم صيغة الالتزام الرسمية (Mandative Subjunctive) الفعل في مصدره المجرد تماماً—دون s مع المفرد الغائب، وبـ be بدلاً من is/are، وبـ not + المصدر للنفي—داخل جمل that بعد أفعال وصفات وأسماء التوصية والضرورة والإلحاح. وهي من أبرز سمات الإنجليزية القانونية والدبلوماسية والأكاديمية المتقدمة.",
    },
    formula:
      "recommend / suggest / insist / demand / urge / essential / vital / imperative + that + Subject + (not) + Base Verb (V1 / be)",
    forms: {
      affirmative: "The committee recommended that every applicant submit an original portfolio.",
      negative: "It is vital that the patient not take this medication on an empty stomach.",
      question: "Did the board insist that the audit be conducted by an external firm?",
    },
    rules: [
      {
        en: "Use the bare base verb (infinitive without 'to') after triggering verbs ('suggest', 'recommend', 'insist', 'demand', 'propose', 'request', 'require', 'urge', 'advise') + 'that'—regardless of whether the subject is singular or the main verb is past ('She demanded that he apologize').",
        ar: "نستخدم المصدر المجرد بعد أفعال مثل suggest وrecommend وinsist وdemand وrequire متبوعة بـ that، بغض النظر عن إفراد الفاعل أو كون فعل الجملة الرئيسي في الماضي.",
      },
      {
        en: "Triggering adjectives and nouns follow the exact same rule: 'It is essential / vital / imperative / crucial / advisable / mandatory that...' and 'the requirement / recommendation / suggestion that...'.",
        ar: "تنطبق القاعدة نفسها على صفات وأسماء الضرورة والتوصية مثل: essential / vital / imperative / mandatory وrecommendation / requirement + that.",
      },
      {
        en: "For negative subjunctives, put 'not' directly before the base verb—NO 'do/does/did' ('It is crucial that she not miss the hearing'). For passive subjunctives, use 'be + V3' ('They insisted that the contract be revised').",
        ar: "في النفي نضع not مباشرة قبل المصدر المجرد دون do/does/did (that she not miss)، وفي المبني للمجهول نستخدم be + V3 (that the contract be revised).",
      },
      {
        en: "British English often allows 'should + base verb' as a softer alternative ('It is essential that he should attend'), while American and international academic English strongly prefer the bare subjunctive ('that he attend'). Also know fixed subjunctive idioms: 'Be that as it may', 'Suffice it to say', 'Come what may'.",
        ar: "تسمح الإنجليزية البريطانية أحياناً بـ should + المصدر كبديل، بينما تفضل الأكاديمية الدولية والأمريكية الصيغة المجردة المباشرة. ومن العبارات الثابتة فيها: Be that as it may وSuffice it to say وCome what may.",
      },
    ],
    examples: [
      {
        en: "The ethics panel insisted that the researcher disclose all funding sources.",
        ar: "أصرّت لجنة الأخلاقيات على أن يفصح الباحث عن جميع مصادر التمويل.",
        highlight: "that the researcher disclose",
      },
      {
        en: "It is imperative that every lab sample be labeled before refrigeration.",
        ar: "من الضروري للغاية أن تُلصق بطاقة تعريف على كل عينة مختبرية قبل تبريدها.",
        highlight: "that every lab sample be labeled",
      },
      {
        en: "The doctor strongly advised that he not resume strenuous exercise until April.",
        ar: "نصح الطبيب بشدة بألا يستأنف التمارين الشاقة قبل شهر أبريل.",
        highlight: "that he not resume",
      },
      {
        en: "Be that as it may, the treaty requires that each signatory uphold the agreed ceiling.",
        ar: "ومهما يكن من أمر، فإن المعاهدة تلزم كل دولة موقِّعة بالالتزام بالسقف المتفق عليه.",
        highlight: "requires that each signatory uphold",
      },
    ],
    arabicInterferenceTip: {
      en: "Because subjunctive verbs ('that he attend', 'that it be', 'that she not go') deliberately break everyday subject-verb agreement, learners often 'over-correct' them back to 'attends', 'is', or 'doesn't go'—losing formal C1/C2 register on IELTS, TOEFL, and academic papers. Train yourself to spot the mandative trigger words!",
      ar: "لأن صيغة الالتزام تخالف ظاهر تطابق المفرد (that he attend بدلاً من attends وthat it be بدلاً من is)، يظن المتعلم أحياناً أنها خطأ فيُصححها إلى attends أو doesn't go. درّب عينك على التقاط أفعال وصفَات الضرورة والتوصية!",
    },
    commonMistake: {
      wrong: "The judge ordered that the witness doesn't leave the city and is available on Monday.",
      right: "The judge ordered that the witness not leave the city and be available on Monday.",
      why: {
        en: "In a mandative subjunctive clause after 'ordered that', use 'not + base verb' ('not leave', no 'doesn't') and bare 'be' (not 'is').",
        ar: "في جملة الالتزام بعد ordered that نستخدم not + المصدر دون doesn't (not leave) والفعل المجرد be بدلاً من is.",
      },
    },
    quickCheck: [
      {
        prompt: "Choose the formal mandative subjunctive: 'It is essential that the chief accountant ___ the ledger before the audit.'",
        options: ["reviews", "reviewed", "review", "is reviewing"],
        correctIndex: 2,
        explanation: {
          en: "After 'It is essential that', the mandative subjunctive uses the bare base verb ('review') with no '-s'.",
          ar: "بعد It is essential that نستخدم الفعل المجرد تماماً (review) دون إضافة s للمفرد.",
        },
      },
      {
        prompt: "Complete the passive subjunctive accurately: 'The residents demanded that the intersection ___ redesigned immediately.'",
        options: ["is", "was", "be", "being"],
        correctIndex: 2,
        explanation: {
          en: "Passive mandative subjunctive always uses bare 'be + past participle' ('be redesigned').",
          ar: "يُصاغ المبني للمجهول في صيغة الالتزام دائماً بـ be + التصريف الثالث (be redesigned).",
        },
      },
      {
        prompt: "Select the grammatically correct negative subjunctive:",
        options: [
          "The regulations stipulate that a candidate doesn't bring electronic devices.",
          "The regulations stipulate that a candidate not bring electronic devices.",
          "The regulations stipulate that a candidate won't bring electronic devices.",
          "The regulations stipulate that a candidate didn't bring electronic devices.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Negative subjunctive places 'not' directly before the base verb ('not bring') without 'do/does/did'.",
          ar: "يوضع النفي not مباشرة قبل المصدر المجرد (not bring) دون استخدام do/does/did.",
        },
      },
    ],
  },
  {
    id: "ellipsis-substitution-cohesion",
    order: 56,
    moduleId: "advanced-mastery",
    level: "C2",
    title: {
      en: "Ellipsis, Substitution & Advanced Discourse Cohesion",
      ar: "الحذف والاستبدال والتماسك النصي المتقدم (Ellipsis & Substitution)",
    },
    overview: {
      en: "Expert C2 English avoids heavy word-for-word repetition through ellipsis (deliberately omitting recoverable words) and substitution (replacing nouns with 'one/ones', verb phrases with 'do so', and entire clauses with 'so / not'). Paired with cohesive reference ('this/these + summary noun'), these tools make writing and speech effortlessly natural.",
      ar: "تتجنب الإنجليزية المتقدمة (C2) التكرار الثقيل عبر الحذف المقصود (Ellipsis) للكلمات المفهومة من السياق، والاستبدال (Substitution) بوضع one/ones مكان الأسماء، وdo so مكان الأفعال، وso/not مكان الجمل الكاملة؛ مما يحقق تماسكاً نصياً سلساً ورفيع المستوى.",
    },
    formula:
      "Nominal: one / ones | Verbal: do so / auxiliary ellipsis (could have, wanted to) | Clausal: I hope so / I believe not | Reference: This / These + Summary Noun",
    forms: {
      affirmative: "She planned to attend the summit and encouraged her colleagues to do so as well.",
      negative: "Will the deadline be extended? — I'm afraid not, though many of us hope so.",
      question: "If you haven't read the updated guidelines yet, would you like to?",
    },
    rules: [
      {
        en: "Noun substitution with 'one / ones': replace a singular countable noun with 'one' and a plural countable noun with 'ones' ('The old sensors failed, so we installed digital ones'). NEVER use 'one' for uncountable nouns—omit the noun or repeat it ('fresh coffee, not stale [coffee]', NOT 'stale one').",
        ar: "الاستبدال الاسمي: تنوب one عن الاسم المفرد المعدود، وones عن الجمع المعدود، ولا تُستخدم one أبداً بدلاً من اسم غير معدود.",
      },
      {
        en: "Verbal substitution with 'do so' (formal) / 'do it / do that': replaces a previously mentioned action verb phrase cleanly ('Those wishing to withdraw may do so before noon').",
        ar: "الاستبدال الفعلي: تحل عبارة do so الرسمية محل عبارة فعلية سابقة لتجنب التكرار الممل (may do so before noon).",
      },
      {
        en: "Clausal substitution with 'so / not': after verbs of thinking/believing/hoping ('think', 'believe', 'expect', 'suppose', 'hope', 'be afraid'), 'so' replaces a positive clause ('I hope so') and 'not' replaces a negative clause ('I hope not', 'I'm afraid not'; note: 'I don't think so' is preferred over 'I think not').",
        ar: "الاستبدال الجملي: تحل so محل جملة مثبتة وnot محل جملة منفية بعد أفعال الظن والأمل (I hope so / I hope not / I'm afraid not).",
      },
      {
        en: "Auxiliary & infinitive ellipsis: omit a repeated verb phrase after an auxiliary or 'to' ('He promised to call, and he will [call]'; 'I didn't apply, though I meant to [apply]'). In essays, anchor bare 'this/these' with a summary noun ('This discrepancy...', 'These findings...') for crystal-clear cohesion.",
        ar: "الحذف بعد الفعل المساعد أو to: نحذف الفعل المكرر ونبقي على المساعد أو to فقط (I meant to). وفي المقالات نتبع This/These باسم تلخيصي (This discrepancy / These findings) لوضوح الترابط.",
      },
    ],
    examples: [
      {
        en: "The ministry promised to publish the raw statistics, and it finally did so last week.",
        ar: "وعدت الوزارة بنشر الإحصاءات الخام، وقد فعلت ذلك أخيراً الأسبوع الماضي.",
        highlight: "did so",
      },
      {
        en: "I wanted to join the coastal expedition, but I simply couldn't afford to.",
        ar: "أردت الانضمام إلى الرحلة الساحلية، لكنني ببساطة لم أستطع تحمل تكلفتها.",
        highlight: "couldn't afford to",
      },
      {
        en: "Will the maintenance work delay Friday's trains? — I certainly hope not, though the station bulletin suggests so.",
        ar: "هل ستؤخر أعمال الصيانة قطارات يوم الجمعة؟ — آمل ألا يحدث ذلك بالتأكيد، مع أن نشرة المحطة توحي بذلك.",
        highlight: "I certainly hope not",
      },
      {
        en: "The older turbines consumed excessive fuel, whereas the redesigned ones cut emissions dramatically; this shift transformed the plant's budget.",
        ar: "استهلكت التوربينات القديمة وقوداً مفرطاً، بينما خفضت التوربينات المعاد تصميمها الانبعاثات بشكل كبير؛ وقد غيّر هذا التحول ميزانية المحطة.",
        highlight: "the redesigned ones",
      },
    ],
    arabicInterferenceTip: {
      en: "Arabic often repeats the full noun or uses «آمل ألا يكون كذلك» and omits the English 'to' in infinitive ellipsis, leading learners to say 'I wanted to go, but I couldn't' (okay with modal) vs. 'I wanted to go, and she wanted also' (missing 'to': 'she wanted to as well') or 'I don't hope so' (unnatural—always say 'I hope not').",
      ar: "يميل المتعلم أحياناً لنفي hope بقول I don't hope so خطأً (والصواب I hope not)، أو نسيان إبقاء to عند الحذف بعد want/mean/plan (الصواب she wanted to)، أو استخدام one مع اسم غير معدود.",
    },
    commonMistake: {
      wrong: "Will it rain during the ceremony? — I don't hope so, because I prefer warm weather to cold one.",
      right: "Will it rain during the ceremony? — I hope not, because I prefer warm weather to cold weather.",
      why: {
        en: "Always negate 'hope' as 'I hope not' (never 'I don't hope so'), and never replace an uncountable noun ('weather') with 'one'.",
        ar: "يُنفي الفعل hope بصيغة I hope not دائماً (وليس I don't hope so)، ولا يجوز استبدال الاسم غير المعدود (weather) بكلمة one.",
      },
    },
    quickCheck: [
      {
        prompt: "Choose the most idiomatic negative clausal substitution: 'Do you think the flight will be canceled?'",
        options: [
          "I don't hope so.",
          "I hope not.",
          "I am not afraid so.",
          "I expect no.",
        ],
        correctIndex: 1,
        explanation: {
          en: "'I hope not' (and 'I'm afraid not') are the standard negative clausal substitutions; 'I don't hope so' is unidiomatic.",
          ar: "صيغة I hope not هي الاستبدال الجملي المنفي السليم، بينما لا تُستخدم I don't hope so.",
        },
      },
      {
        prompt: "Complete the formal verbal substitution: 'Candidates who wish to appeal the score must ___ within ten business days.'",
        options: ["make so", "do so", "be so", "do one"],
        correctIndex: 1,
        explanation: {
          en: "'Do so' formally substitutes for an action verb phrase ('appeal the score').",
          ar: "تحل عبارة do so الرسمية محل العبارة الفعلية السابقة (appeal the score).",
        },
      },
      {
        prompt: "Which sentence uses ellipsis/substitution WITHOUT an uncountable-noun error?",
        options: [
          "I drank the hot tea and left the cold one on the tray.",
          "She prefers sparkling water to still one.",
          "He asked me to review the contract, and I promised to.",
          "We need fresh equipment rather than outdated one.",
        ],
        correctIndex: 2,
        explanation: {
          en: "'I promised to' cleanly omits 'review the contract' via infinitive ellipsis, whereas 'tea', 'water', and 'equipment' are uncountable and cannot take 'one'.",
          ar: "حذف الفعل بعد to في I promised to سليم تماماً، بينما أخطأت الجمل الأخرى باستخدام one مع أسماء غير معدودة (tea / water / equipment).",
        },
      },
    ],
  },
];
