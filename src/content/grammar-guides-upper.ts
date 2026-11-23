import {
  makeFitSentence,
  makePickWord,
  makeRearrange,
  type LessonEnrichmentEntry,
} from "./enrichment-builders";

/** Detailed bilingual grammar guides & 4-format interactive drills for B2, C1, and C2 grammar lessons. */
export const GRAMMAR_GUIDES_UPPER: Record<string, LessonEnrichmentEntry> = {
  // ===================== B2 GRAMMAR (6) =====================
  "b2-hypotheticals": {
    guide: {
      summary: {
        en: "Third Conditionals analyse purely past regrets or missed outcomes (If + had + V3, would have + V3), while Mixed Conditionals bridge a past decision to a PRESENT consequence (If + had + V3, would + base verb now).",
        ar: "تحلّل الشرطية الثالثة الندم والنتائج الماضية المنتهية (If + had + V3، would have + V3)، بينما تربط الشرطية المختلطة قرارًا ماضيًا بنتيجة مستمرة في الحاضر (If + had + V3، would + مصدر الآن).",
      },
      whenToUse: [
        {
          en: "3rd Conditional (past → past): evaluating what would have happened in a completed project.",
          ar: "الشرطية الثالثة (ماضٍ ← ماضٍ) لتقييم نتائج مشروع منتهٍ.",
        },
        {
          en: "Mixed Conditional (past → present): showing how an earlier choice still affects today ('If she had accepted that role, she would live in London now').",
          ar: "الشرطية المختلطة (ماضٍ ← حاضر) لإظهار أثر قرار سابق على الوضع الحالي.",
        },
        {
          en: "Never put 'would have' inside the 'If' clause—always use 'had + V3' there!",
          ar: "لا تضع would have داخل جملة If أبدًا—استخدم had + V3.",
        },
      ],
      formulas: [
        {
          label: { en: "3rd Conditional", ar: "الشرطية الثالثة" },
          pattern: "If + S + had + V3, S + would/could have + V3",
          example: "If we had tested earlier, we would have caught the bug.",
          arabic: "لو اختبرنا مبكرًا لاكتشفنا الخلل.",
        },
        {
          label: { en: "Mixed (Past → Now)", ar: "مختلطة (ماضٍ ← حاضر)" },
          pattern: "If + S + had + V3, S + would + base verb (now)",
          example: "If he had saved more, he would own a house today.",
          arabic: "لو ادّخر أكثر لكان يملك بيتًا اليوم.",
        },
        {
          label: { en: "Inverted Formal 3rd", ar: "صيغة رسمية مقلوبة" },
          pattern: "Had + S + V3, S + would have + V3",
          example: "Had we checked the forecast, we would have rescheduled.",
          arabic: "لو راجعنا الطقس لأعدنا الجدولة.",
        },
      ],
      commonMistakes: [
        {
          wrong: "If I would have known, I would have called.",
          right: "If I had known, I would have called.",
          why: {
            en: "The 'If' clause takes Past Perfect ('had known'), never 'would have'.",
            ar: "تأخذ جملة If الماضي التام had known وليس would have.",
          },
        },
        {
          wrong: "If she had taken the job, she would have lived there now.",
          right: "If she had taken the job, she would live there now.",
          why: {
            en: "Because 'now' refers to the present, use 'would + base verb' (not 'would have').",
            ar: "لوجود now في الحاضر نستخدم would + الفعل الأساسي.",
          },
        },
      ],
      memoryTip: {
        en: "Past cause = IF + HAD + V3. Past result = WOULD HAVE + V3; Present result = WOULD + base (now)!",
        ar: "سبب ماضٍ = If + had + V3. نتيجة ماضية = would have + V3؛ نتيجة حالية = would + مصدر!",
      },
    },
    pickWord: makePickWord({
      sentence:
        "If the engineers ___ audited the battery earlier, the delay would not have happened.",
      options: ["would", "had", "have", "were"],
      correct: 1,
      explanation: {
        en: "3rd Conditional requires Past Perfect ('had + V3') inside the 'If' clause.",
        ar: "تتطلب الشرطية الثالثة الماضي التام had + التصريف الثالث داخل جملة If.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["If", "we", "had", "left", "earlier,", "we", "would", "be", "home", "now."],
      explanation: {
        en: "Mixed Conditional links past 'If we had left earlier' with present consequence 'we would be home now'.",
        ar: "تربط الشرطية المختلطة السبب الماضي had left بالنتيجة الحاضرة would be home now.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt: "Write a fitting 3rd or mixed conditional sentence using 'If' + 'had' and 'would'.",
      cueWords: ["If", "had", "would"],
      requiredTerms: ["if", "had", "would"],
      modelSentence: "If I had reviewed the notes, I would have passed easily.",
      sentenceHint: {
        en: "Pattern: If + S + had + [V3], S + would (have) + ...",
        ar: "النمط: If + الفاعل + had + [V3]، الفاعل + would (have) + ...",
      },
      explanation: {
        en: "Pair 'If + had + V3' with 'would have + V3' (past result) or 'would + base' (present result).",
        ar: "نجمع If + had + V3 مع would have + V3 أو would + مصدر.",
      },
    }),
  },

  "b2-grammar-modals-deduction": {
    guide: {
      summary: {
        en: "Modals of past deduction (must have / might have / can't have + V3) express how certain you are about a past event based on evidence—NOT obligation.",
        ar: "تعبّر أفعال الاستنتاج الماضي (must have / might have / can't have + V3) عن مدى يقينك من وقوع حدث ماضٍ استنادًا إلى دليل، وليست للإلزام.",
      },
      whenToUse: [
        {
          en: "'must have + V3': ~99% sure something happened based on strong evidence ('The ground is soaked—it must have rained').",
          ar: "must have + V3 للاستنتاج شبه المؤكد إيجابًا بناءً على دليل قوي.",
        },
        {
          en: "'can't have / couldn't have + V3': ~99% sure something is IMPOSSIBLE (NEVER use 'mustn't have' for deduction!).",
          ar: "can't have + V3 لاستبعاد وقوع الشيء تمامًا (ولا نستخدم mustn't have للاستنتاج!).",
        },
        {
          en: "'might / may / could have + V3': ~50% plausible possibility.",
          ar: "might / may / could have + V3 للاحتمال الممكن.",
        },
      ],
      formulas: [
        {
          label: { en: "Strong Positive Deduction", ar: "استنتاج مؤكد (إثبات)" },
          pattern: "Subject + must have + V3",
          example: "She must have forgotten her badge at home.",
          arabic: "لا بد أنها نسيت بطاقتها في المنزل.",
        },
        {
          label: { en: "Strong Negative Deduction", ar: "استنتاج مستحيل (نفي)" },
          pattern: "Subject + can't / couldn't have + V3",
          example: "He can't have sent that email—his flight had no Wi-Fi.",
          arabic: "يستحيل أنه أرسل البريد—رحلته بلا إنترنت.",
        },
        {
          label: { en: "Possibility", ar: "احتمال" },
          pattern: "Subject + might / could have + V3",
          example: "The parcel might have arrived at reception.",
          arabic: "ربما وصل الطرد إلى الاستقبال.",
        },
      ],
      commonMistakes: [
        {
          wrong: "He mustn't have broken the lock—he was abroad.",
          right: "He can't have broken the lock—he was abroad.",
          why: {
            en: "The opposite of deduction 'must have' is 'can't have', NOT 'mustn't have'.",
            ar: "عكس الاستنتاج must have هو can't have وليس mustn't have.",
          },
        },
        {
          wrong: "They might forgot the attachment.",
          right: "They might have forgotten the attachment.",
          why: {
            en: "Past deduction always needs 'have + V3' after the modal.",
            ar: "الاستنتاج في الماضي يحتاج دائمًا have + التصريف الثالث.",
          },
        },
      ],
      memoryTip: {
        en: "Opposite of deduction MUST HAVE is CAN'T HAVE (not mustn't have!). Always follow with HAVE + V3.",
        ar: "عكس الاستنتاج must have هو can't have دائمًا، متبوعًا بـ have + التصريف الثالث!",
      },
    },
    pickWord: makePickWord({
      sentence: "The lights are still on—someone ___ have left in a hurry.",
      options: ["must", "can't", "shouldn't", "did"],
      correct: 0,
      explanation: {
        en: "Lights still being on is strong positive evidence, so 'must have left' fits best.",
        ar: "بقاء الأضواء مشتعلة دليل قوي على أنه لا بد أن شخصًا غادر على عجل (must).",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["She", "can't", "have", "missed", "the", "announcement."],
      explanation: {
        en: "Negative deduction order: Subject + can't + have + V3 ('missed') + object.",
        ar: "ترتيب الاستنتاج المنفي: الفاعل + can't + have + التصريف الثالث missed.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a fitting past deduction sentence using 'must have' or 'might have' + a past participle.",
      cueWords: ["must have / might have"],
      requiredTerms: ["must have|might have|can't have|could have"],
      modelSentence: "The courier must have left the box with our neighbour.",
      sentenceHint: {
        en: "Pattern: [Subject] + must have / might have / can't have + [V3] + ...",
        ar: "النمط: [الفاعل] + must have / might have / can't have + [V3] + ...",
      },
      explanation: {
        en: "Combine a deduction modal + 'have' + past participle (V3) to draw an evidence-based conclusion.",
        ar: "استخدم فعل الاستنتاج + have + التصريف الثالث لصياغة استنتاج مبني على دليل.",
      },
    }),
  },

  "b2-grammar-participle-clauses": {
    guide: {
      summary: {
        en: "Participle clauses compress long adverbial or relative clauses into crisp, sophisticated prose using -ing (active), V3 (passive), or Having + V3 (completed earlier). Crucial rule: the implied subject MUST match the subject of the main clause!",
        ar: "تختصر جمل اسم الفاعل والمفعول الجمل الطويلة إلى أسلوب رشيق باستخدام -ing (معلوم) أو V3 (مجهول) أو Having + V3 (حدث مكتمل سابقًا). والشرط الجوهري: يجب أن يكون الفاعل واحدًا في الجزأين!",
      },
      whenToUse: [
        {
          en: "Present Participle (-ing) for active/simultaneous actions ('Reviewing the budget, we spotted a duplicate charge').",
          ar: "صيغة -ing للأفعال المعلومة أو المتزامنة.",
        },
        {
          en: "Past Participle (V3) for passive meaning ('Built from coral stone, the historic houses stay cool').",
          ar: "التصريف الثالث V3 للمعنى المبني للمجهول.",
        },
        {
          en: "Perfect Participle ('Having + V3') when one action finished BEFORE the main action ('Having tested both models, the lab picked Option B').",
          ar: "Having + V3 عندما يكتمل فعل قبل الفعل الرئيسي.",
        },
      ],
      formulas: [
        {
          label: { en: "Active (-ing)", ar: "مبني للمعلوم (-ing)" },
          pattern: "V-ing + ..., Subject + main verb",
          example: "Walking through Al-Balad, visitors admire the woodwork.",
          arabic: "أثناء تجولهم في البلد، يُعجب الزوار بالخشبيات.",
        },
        {
          label: { en: "Passive (V3)", ar: "مبني للمجهول (V3)" },
          pattern: "V3 + ..., Subject + main verb",
          example: "Designed for heat, the courtyard stays shaded.",
          arabic: "لأنه مصمم للحرارة، يبقى الفناء ظليلًا.",
        },
        {
          label: { en: "Completed Earlier", ar: "مكتمل سابقًا" },
          pattern: "Having + V3 + ..., Subject + main verb",
          example: "Having finished the audit, she emailed the board.",
          arabic: "بعد إنهاء التدقيق، راسلت المجلس.",
        },
      ],
      commonMistakes: [
        {
          wrong: "Walking to the office, the rain soaked my coat.",
          right: "Walking to the office, I got soaked by the rain.",
          why: {
            en: "Avoid 'dangling participles'—the rain wasn't walking; 'I' was!",
            ar: "تجنّب اختلاف الفاعل: المطر لم يكن يمشي، بل أنا (I)!",
          },
        },
        {
          wrong: "Building from local stone, the fort survived centuries.",
          right: "Built from local stone, the fort survived centuries.",
          why: {
            en: "The fort was built (passive), so use V3 'Built', not '-ing'.",
            ar: "الحصن مبني للمجهول فنستخدم التصريف الثالث Built لا Building.",
          },
        },
      ],
      memoryTip: {
        en: "Ask: Did the main subject DO the action (-ing) or RECEIVE it (V3)? Always match the subjects!",
        ar: "اسأل نفسك: هل قام الفاعل بالفعل (-ing) أم وقع عليه (V3)؟ وتأكد من تطابق الفاعل!",
      },
    },
    pickWord: makePickWord({
      sentence: "___ from recycled aluminium, the new frame weighs half as much.",
      options: ["Making", "Made", "Having make", "To making"],
      correct: 1,
      explanation: {
        en: "The frame is made (passive meaning), so the past participle 'Made' starts the clause.",
        ar: "الإطار مصنوع (معنى مجهول) لذلك نبدأ بالتصريف الثالث Made.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["Having", "checked", "the", "figures,", "she", "approved", "the", "budget."],
      explanation: {
        en: "'Having checked the figures' shows the action completed before 'she approved the budget'.",
        ar: "تُظهر Having checked اكتمال الفحص قبل الموافقة على الميزانية.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a fitting participle-clause sentence starting with 'Having' or a passive V3 like 'Built' / 'Designed'.",
      cueWords: ["Having / Built / Designed"],
      requiredTerms: ["having|built|designed|reviewing|written"],
      modelSentence: "Having reviewed the feedback, the team revised the design.",
      sentenceHint: {
        en: "Pattern: Having + [V3]..., [same subject] + [past verb]...",
        ar: "النمط: Having + [V3]...، [نفس الفاعل] + [فعل ماضٍ]...",
      },
      explanation: {
        en: "Ensure the subject immediately after the comma is the exact same person/thing performing or receiving the participle.",
        ar: "احرص أن يكون الفاعل بعد الفاصلة هو نفسه فاعل الجزء الأول.",
      },
    }),
  },

  "b2-grammar-wish-regret": {
    guide: {
      summary: {
        en: "Use 'wish / If only' to express unreal desires or regrets by shifting tenses one step back (Past Simple for now; Past Perfect for past regrets), and 'would rather' to state polite preferences.",
        ar: "نستخدم wish / If only للتمنّي والندم بإرجاع الزمن خطوة للخلف (ماضٍ بسيط للحاضر، وماضٍ تام للندم على الماضي)، ونستخدم would rather للتعبير عن التفضيل المهذّب.",
      },
      whenToUse: [
        {
          en: "Present wish: 'wish / If only + Past Simple' ('I wish I spoke French fluently').",
          ar: "تمنّي تغيير وضع حالي: wish + ماضٍ بسيط.",
        },
        {
          en: "Past regret: 'wish / If only + Past Perfect (had + V3)' ('I wish I had saved a backup').",
          ar: "الندم على الماضي: wish + had + V3.",
        },
        {
          en: "Polite preference: 'would rather + base verb' (same subject) vs 'would rather + person + Past Simple' (different subject).",
          ar: "would rather + مصدر لنفس الفاعل، ومع شخص آخر نستخدم الماضي البسيط.",
        },
      ],
      formulas: [
        {
          label: { en: "Wish (Present)", ar: "تمنّي في الحاضر" },
          pattern: "I wish / If only + S + Past Simple (were)",
          example: "I wish our commute were shorter.",
          arabic: "ليت طريقنا اليومي كان أقصر.",
        },
        {
          label: { en: "Regret (Past)", ar: "ندم على الماضي" },
          pattern: "I wish / If only + S + had + V3",
          example: "If only we had booked the flights earlier!",
          arabic: "يا ليتنا حجزنا التذاكر مبكرًا!",
        },
        {
          label: { en: "Preference", ar: "تفضيل مهذّب" },
          pattern: "I'd rather + base verb | I'd rather you + Past",
          example: "I'd rather we met on Tuesday instead.",
          arabic: "أفضّل أن نلتقي يوم الثلاثاء بدلًا من ذلك.",
        },
      ],
      commonMistakes: [
        {
          wrong: "I wish I have more free time today.",
          right: "I wish I had more free time today.",
          why: {
            en: "Unreal wishes about the present shift into Past Simple ('had').",
            ar: "التمنّي غير الواقعي للحاضر يحتاج الماضي البسيط had.",
          },
        },
        {
          wrong: "I'd rather to wait inside.",
          right: "I'd rather wait inside.",
          why: {
            en: "'Would rather' takes a bare infinitive—no 'to'!",
            ar: "يتبع would rather الفعل الأساسي مباشرة دون to.",
          },
        },
      ],
      memoryTip: {
        en: "Wish about NOW → Past Simple. Wish about YESTERDAY → HAD + V3. Would rather → NO 'to'!",
        ar: "تمنّي الآن = ماضٍ بسيط. ندم الأمس = had + V3. ومع would rather لا نضع to!",
      },
    },
    pickWord: makePickWord({
      sentence: "If only I ___ double-checked the train timetable before leaving!",
      options: ["have", "had", "would", "did"],
      correct: 1,
      explanation: {
        en: "Regret about a past action uses 'If only + Past Perfect (had + V3)'.",
        ar: "الندم على فعل ماضٍ يستخدم If only + had + التصريف الثالث.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["I", "would", "rather", "discuss", "this", "in", "person."],
      explanation: {
        en: "Same-subject preference uses 'would rather' + bare base verb ('discuss').",
        ar: "تأخذ would rather الفعل الأساسي discuss مباشرة دون to.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a fitting sentence expressing a wish or regret using 'I wish' and either 'had' or 'were'.",
      cueWords: ["I wish", "had / were"],
      requiredTerms: ["i wish", "had|were|could"],
      modelSentence: "I wish I had started practising speaking earlier.",
      sentenceHint: {
        en: "Pattern: I wish I + had [V3] ... OR I wish [something] were ...",
        ar: "النمط: I wish I had + [V3]... أو I wish + الفاعل + were...",
      },
      explanation: {
        en: "Backshift the verb after 'I wish' into Past Simple (present wish) or Past Perfect (past regret).",
        ar: "نُرجع زمن الفعل بعد I wish للماضي البسيط للحاضر أو الماضي التام للماضي.",
      },
    }),
  },

  "b2-grammar-discourse-markers": {
    guide: {
      summary: {
        en: "Discourse markers organize complex arguments cleanly—but each marker obeys strict grammar! Mastering which ones take a NOUN PHRASE (Despite, In spite of) vs a FULL CLAUSE (Although, Whereas, Consequently) elevates essays immediately.",
        ar: "تنظّم أدوات الربط الحجج المعقدة بوضوح، لكن لكل أداة قاعدة نحوية دقيقة: بعضها يتبعه اسم أو -ing (مثل Despite) وبعضها يتبعه جملة كاملة بفاعل وفعل (مثل Although وWhereas وConsequently).",
      },
      whenToUse: [
        {
          en: "Concession + Noun/-ing: 'Despite / In spite of + noun phrase' ('Despite the tight deadline, quality remained high').",
          ar: "للاستدراك قبل اسم أو -ing نستخدم Despite أو In spite of.",
        },
        {
          en: "Concession + Clause: 'Although / Even though / Whereas + Subject + Verb'.",
          ar: "للاستدراك والمقابلة قبل جملة كاملة (فاعل+فعل) نستخدم Although وEven though وWhereas.",
        },
        {
          en: "Result linkers: 'Consequently, / Therefore, / As a result,' connect a cause sentence to an outcome sentence.",
          ar: "لربط النتيجة بالسبب نستخدم Consequently وTherefore متبوعة بفاصلة.",
        },
      ],
      formulas: [
        {
          label: { en: "Despite + Noun", ar: "Despite + اسم/-ing" },
          pattern: "Despite / In spite of + noun / V-ing, clause",
          example: "Despite rising costs, attendance doubled.",
          arabic: "رغم ارتفاع التكاليف، تضاعف الحضور.",
        },
        {
          label: { en: "Although / Whereas", ar: "Although / Whereas + جملة" },
          pattern: "Although + S + V, S + V | Clause, whereas + S + V",
          example: "Whereas rail is punctual, flights face weather delays.",
          arabic: "بينما القطار دقيق، تواجه الرحلات الجوية تأخيرات الطقس.",
        },
        {
          label: { en: "Consequence", ar: "النتيجة" },
          pattern: "Sentence 1; consequently, / Therefore, Sentence 2",
          example: "Demand surged; consequently, we added two shifts.",
          arabic: "ارتفع الطلب؛ وبالتالي أضفنا ورديتين.",
        },
      ],
      commonMistakes: [
        {
          wrong: "Despite of the traffic, we arrived early.",
          right: "Despite the traffic, we arrived early.",
          why: {
            en: "Say 'Despite + noun' OR 'In spite of + noun'—NEVER 'Despite of'!",
            ar: "نقول Despite دون of، أو In spite of — لا تقل Despite of أبدًا!",
          },
        },
        {
          wrong: "Despite the exam was hard, he passed.",
          right: "Although the exam was hard, he passed.",
          why: {
            en: "'The exam was hard' is a full clause (S+V), so use 'Although' (or 'Despite the fact that').",
            ar: "لأن ما بعدها جملة كاملة (فاعل وفعل) نستخدم Although لا Despite.",
          },
        },
      ],
      memoryTip: {
        en: "DESPITE = NO 'of' + NOUN/-ing. ALTHOUGH / WHEREAS = Subject + Verb!",
        ar: "Despite بلا of ويتبعها اسم/-ing، بينما Although وWhereas يتبعهما فاعل وفعل!",
      },
    },
    pickWord: makePickWord({
      sentence: "___ the heavy dust storm, the solar farm stayed online.",
      options: ["Although", "Despite", "Whereas", "Because"],
      correct: 1,
      explanation: {
        en: "'The heavy dust storm' is a noun phrase (no verb), so 'Despite' is the right connector.",
        ar: "العبارة the heavy dust storm اسمية بلا فعل، لذا نختار Despite.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["Although", "costs", "rose,", "the", "team", "kept", "quality", "high."],
      explanation: {
        en: "'Although' introduces the full concessive clause 'costs rose', followed by a comma and the main clause.",
        ar: "تقدم Although الجملة الكاملة costs rose متبوعة بفاصلة ثم الجملة الرئيسية.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a fitting contrast or cause-effect sentence using 'Despite' (with a noun) or 'Consequently'.",
      cueWords: ["Despite / Consequently"],
      requiredTerms: ["despite|consequently|whereas|although"],
      modelSentence: "Despite the tight schedule, our group delivered a polished report.",
      sentenceHint: {
        en: "Pattern: Despite + [noun], [main clause] OR [Cause]; consequently, [result].",
        ar: "النمط: Despite + [اسم]، [جملة] أو [السبب]؛ consequently، [النتيجة].",
      },
      explanation: {
        en: "Follow 'Despite' with a noun phrase (never 'of') or use 'Although/Whereas/Consequently' with full clauses.",
        ar: "اتبع Despite باسم دون of، أو استخدم Although/Consequently مع جملة كاملة.",
      },
    }),
  },

  "b2-grammar-phrasal-verbs-work": {
    guide: {
      summary: {
        en: "High-frequency workplace phrasal verbs (follow up, carry out, work out, sort out, bring up) make spoken English sound natural—provided you know when pronouns MUST sit in the middle ('work it out', NEVER 'work out it') and which formal verbs replace them in reports.",
        ar: "تُكسب الأفعال المركبة المهنية (follow up, carry out, work out, sort out) حديثك طبيعية عالية، بشرط إتقان موضع الضمير داخل الأفعال القابلة للفصل (work it out وليس work out it) ومعرفة بدائلها الرسمية للكتابة.",
      },
      whenToUse: [
        {
          en: "Separable phrasal verbs with a PRONOUN (it/them/him): the pronoun MUST go between verb and particle ('sort it out', 'carry it out').",
          ar: "مع الضمير (it/them) في الأفعال القابلة للفصل يجب وضع الضمير في الوسط (sort it out).",
        },
        {
          en: "With a full noun, both positions work ('work out the budget' or 'work the budget out').",
          ar: "مع الاسم الظاهر يصح الموضعان.",
        },
        {
          en: "Register switch: use phrasal verbs in meetings/emails ('look into', 'put off') and single Latinate verbs in formal reports ('investigate', 'postpone').",
          ar: "التحكم في الأسلوب: الأفعال المركبة للاجتماعات، والبدائل المفردة (investigate / postpone) للتقارير الرسمية.",
        },
      ],
      formulas: [
        {
          label: { en: "Pronoun Rule (Mandatory)", ar: "قاعدة الضمير (إلزامية)" },
          pattern: "Verb + pronoun (it/them) + particle",
          example: "We will sort it out before noon.",
          arabic: "سنحلّ الأمر قبل الظهر.",
        },
        {
          label: { en: "Spoken → Formal Pair", ar: "الشفهي ← الرسمي" },
          pattern: "carry out → conduct | put off → postpone | look into → investigate",
          example: "Let's look into the delay → Let's investigate.",
          arabic: "لنتحقق من التأخير.",
        },
        {
          label: { en: "Inseparable + Preposition", ar: "غير قابل للفصل" },
          pattern: "follow up on + noun | deal with + noun",
          example: "I will follow up on the supplier quote.",
          arabic: "سأتابع عرض سعر المورّد.",
        },
      ],
      commonMistakes: [
        {
          wrong: "Don't worry—we will work out it together.",
          right: "Don't worry—we will work it out together.",
          why: {
            en: "Pronouns ('it', 'them') must split separable phrasal verbs.",
            ar: "الضمير it يجب أن يأتي بين الفعل والأداة: work it out.",
          },
        },
        {
          wrong: "Let's put off it until Sunday.",
          right: "Let's put it off until Sunday.",
          why: {
            en: "Place 'it' between 'put' and 'off' (or use formal 'postpone it').",
            ar: "نضع it بين put وoff، أو نستخدم الفعل الرسمي postpone it.",
          },
        },
      ],
      memoryTip: {
        en: "Sandwich rule: Pronoun 'it/them' ALWAYS goes inside the sandwich—'sort IT out', 'carry IT out'!",
        ar: "قاعدة السندويتش: الضمير it/them يوضع دائمًا في المنتصف: sort it out وcarry it out!",
      },
    },
    pickWord: makePickWord({
      sentence: "Our engineering team will ___ out a full safety test tomorrow.",
      options: ["carry", "make", "do", "put"],
      correct: 0,
      explanation: {
        en: "'Carry out' is the standard collocation meaning 'conduct/execute' a test or study.",
        ar: "الفعل المركب carry out هو المتلازمة الصحيحة بمعنى يُنفّذ أو يُجري اختبارًا.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["We", "will", "sort", "it", "out", "before", "noon."],
      explanation: {
        en: "The pronoun 'it' must sit between 'sort' and 'out': 'sort it out'.",
        ar: "يجب وضع الضمير it بين sort وout: sort it out.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a natural workplace sentence using 'work it out', 'sort it out', or 'follow up'.",
      cueWords: ["work it out / follow up"],
      requiredTerms: ["work it out|sort it out|follow up|carry out|look into"],
      modelSentence: "I will follow up with the client after lunch.",
      sentenceHint: {
        en: "Pattern: I will + follow up with / sort it out / carry out + ...",
        ar: "النمط: I will + follow up with أو sort it out أو carry out + ...",
      },
      explanation: {
        en: "Use the complete phrasal verb with accurate pronoun placement ('sort it out').",
        ar: "استخدم الفعل المركب كاملًا مع وضع الضمير في المنتصف عند استخدامه.",
      },
    }),
  },

  // ===================== C1 GRAMMAR (6) =====================
  "c1-emphasis": {
    guide: {
      summary: {
        en: "C1 writers create authority and dramatic focus through Negative Inversion (fronting 'Not only', 'Rarely', 'Seldom', 'Never' + auxiliary + subject) and Cleft Sentences ('It was X that...', 'What matters most is...').",
        ar: "يصنع كتّاب مستوى C1 قوة إقناع وبلاغة عبر القلب بعد النفي (تقديم Not only أو Rarely أو Seldom متبوعًا بفعل مساعد ثم فاعل) والجمل المشقوقة (It was X that... وWhat matters most is...).",
      },
      whenToUse: [
        {
          en: "Negative/restrictive adverbial at the start of a sentence triggers question-style inversion: 'Not only did enrolment double, but completion also rose.'",
          ar: "عند بدء الجملة بظرف نفي أو تقييد (Not only, Rarely, Never) نقلب الفعل المساعد قبل الفاعل.",
        },
        {
          en: "It-clefts spotlight one specific fact ('It was targeted feedback that accelerated progress').",
          ar: "جمل It-cleft تسلّط الضوء على عنصر واحد محدد.",
        },
        {
          en: "What-clefts highlight the central point ('What learners need most is consistent practice').",
          ar: "جمل What-cleft تُبرز الفكرة المحورية في الجملة.",
        },
      ],
      formulas: [
        {
          label: { en: "Negative Inversion", ar: "القلب بعد النفي" },
          pattern: "Not only / Rarely / Never + Aux + Subject + Verb",
          example: "Rarely have we seen such rapid retention.",
          arabic: "نادرًا ما شهدنا هذا الثبات السريع.",
        },
        {
          label: { en: "It-Cleft", ar: "جملة It المشقوقة" },
          pattern: "It is/was + [FOCUS] + that/who + clause",
          example: "It was structured feedback that made the difference.",
          arabic: "التغذية الراجعة المنظمة هي ما صنع الفارق.",
        },
        {
          label: { en: "What-Cleft", ar: "جملة What المشقوقة" },
          pattern: "What + S + verb + is/was + [FOCUS]",
          example: "What drives fluency is daily active recall.",
          arabic: "ما يدفع الطلاقة هو الاسترجاع النشط اليومي.",
        },
      ],
      commonMistakes: [
        {
          wrong: "Not only the budget doubled, but quality also rose.",
          right: "Not only did the budget double, but quality also rose.",
          why: {
            en: "Fronting 'Not only' requires auxiliary inversion ('did the budget double').",
            ar: "تقديم Not only يُوجب قلب الفعل المساعد قبل الفاعل (did the budget double).",
          },
        },
        {
          wrong: "Rarely I have read a clearer analysis.",
          right: "Rarely have I read a clearer analysis.",
          why: {
            en: "Invert 'have' before 'I' whenever 'Rarely' opens the sentence.",
            ar: "نقدّم have قبل I كلما بدأت الجملة بـ Rarely.",
          },
        },
      ],
      memoryTip: {
        en: "Negative opener (Not only / Rarely / Little) = FLIP Auxiliary + Subject like a question—without a question mark!",
        ar: "بداية منفية أو مقيدة (Not only / Rarely) = اقلب الفعل المساعد قبل الفاعل كالسؤال تمامًا!",
      },
    },
    pickWord: makePickWord({
      sentence: "Not only ___ the team meet the deadline, but they also reduced errors.",
      options: ["did", "was", "had", "were"],
      correct: 0,
      explanation: {
        en: "'Meet' is a Past Simple base verb, so inversion after 'Not only' requires 'did'.",
        ar: "الفعل الأساسي meet في الماضي البسيط يحتاج الفعل المساعد did للقلب بعد Not only.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["Rarely", "have", "we", "seen", "such", "steady", "growth."],
      explanation: {
        en: "Fronted 'Rarely' triggers auxiliary-subject inversion: 'Rarely have we seen...'.",
        ar: "تُوجب Rarely في بداية الجملة القلب: Rarely have we seen.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a fitting emphatic sentence using 'Not only' (with inversion) or a 'What ... is' cleft.",
      cueWords: ["Not only / What ... is"],
      requiredTerms: ["not only|what"],
      modelSentence: "What learners need most is clear daily feedback.",
      sentenceHint: {
        en: "Pattern: Not only did/does + S + V... OR What + S + verb + is + ...",
        ar: "النمط: Not only did/does + الفاعل + الفعل... أو What + الفاعل + الفعل + is...",
      },
      explanation: {
        en: "Use inverted auxiliary order after 'Not only' or spotlight your focus after 'What ... is'.",
        ar: "طبّق القلب بعد Not only أو أبرز المعلومة بعد What ... is.",
      },
    }),
  },

  "c1-grammar-hedging-modality": {
    guide: {
      summary: {
        en: "Academic and executive English avoids sweeping absolute claims ('proves 100%', 'always'). Hedging calibrates certainty accurately with cautious verbs (appear to, tend to, suggest), adverbs (largely, plausibly), and modal nouns (likelihood, indication).",
        ar: "تتجنّب الإنجليزية الأكاديمية والتنفيذية الجزم المطلق (always / proves 100%). يضبط التحفّظ الأكاديمي (Hedging) درجة اليقين بدقة عبر أفعال مثل suggest وtend to وظروف مثل largely وأسماء مثل likelihood.",
      },
      whenToUse: [
        {
          en: "Interpreting limited or early data ('The findings suggest that spacing improves recall').",
          ar: "تفسير البيانات الأولية أو المحدودة دون مبالغة.",
        },
        {
          en: "Softening broad generalisations ('Adult learners tend to benefit from explicit rules').",
          ar: "تلطيف التعميمات الواسعة بـ tend to وappear to.",
        },
        {
          en: "Avoid over-hedging (stacking 3 hedges in one clause sounds weak: ✗ 'It might possibly perhaps tend to').",
          ar: "تجنب تكديس أدوات التحفظ في جملة واحدة؛ يكفي مؤشر واحد أو اثنان بدقة.",
        },
      ],
      formulas: [
        {
          label: { en: "Hedging Verbs", ar: "أفعال التحفّظ" },
          pattern: "Data / Findings + suggest / indicate / appear to + verb",
          example: "Early metrics indicate a steady rise in retention.",
          arabic: "تشير المؤشرات الأولية إلى ارتفاع مطّرد في الحفظ.",
        },
        {
          label: { en: "Tendency & Frequency", ar: "الميل والاتجاه" },
          pattern: "Subject + tend(s) to + base verb",
          example: "Short daily sessions tend to outperform cramming.",
          arabic: "تميل الجلسات اليومية القصيرة للتفوق على الحشو.",
        },
        {
          label: { en: "Modal Nouns & Adverbs", ar: "الأسماء والظروف" },
          pattern: "largely / plausibly | a strong likelihood that...",
          example: "There is a strong likelihood that demand will rise.",
          arabic: "هناك احتمال قوي بأن يرتفع الطلب.",
        },
      ],
      commonMistakes: [
        {
          wrong: "This tiny survey proves that every city must adopt the policy.",
          right: "This preliminary survey suggests that many cities could benefit from the policy.",
          why: {
            en: "A small survey cannot 'prove' a universal law; calibrate the claim.",
            ar: "استبيان محدود لا يثبت قانونًا مطلقًا؛ استخدم suggests وcould.",
          },
        },
        {
          wrong: "Students tend studying late.",
          right: "Students tend to study late.",
          why: {
            en: "'Tend' is always followed by 'to + base verb'.",
            ar: "يتبع الفعل tend دائمًا to + الفعل الأساسي.",
          },
        },
      ],
      memoryTip: {
        en: "Replace 'proves/always' with 'suggests / tends to / appears to'—confident precision beats loud exaggeration!",
        ar: "استبدل proves وalways بـ suggests وtends to — الدقة الهادئة أقوى من المبالغة!",
      },
    },
    pickWord: makePickWord({
      sentence: "Preliminary hospital trials ___ that early screening reduces wait times.",
      options: ["prove forever", "suggest", "guarantee", "force"],
      correct: 1,
      explanation: {
        en: "'Suggest' appropriately calibrates early trial evidence without overclaiming.",
        ar: "الفعل suggest يضبط درجة اليقين علميًا بما يناسب التجارب الأولية.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["Short", "daily", "sessions", "tend", "to", "improve", "memory."],
      explanation: {
        en: "Hedged generalisation: Subject + 'tend to' + base verb ('improve') + object.",
        ar: "التعميم المضبوط: الفاعل + tend to + الفعل الأساسي improve.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt: "Write a cautious academic claim using 'suggests' (or 'suggest') or 'tend to'.",
      cueWords: ["suggest(s) / tend to"],
      requiredTerms: ["suggest|suggests|tend to|tends to|appear to|appears to"],
      modelSentence: "Recent studies suggest that quality sleep improves focus.",
      sentenceHint: {
        en: "Pattern: [Evidence/Studies] + suggest(s) that... OR [Group] + tend(s) to + [verb]...",
        ar: "النمط: Studies suggest that... أو [المجموعة] + tend to + [فعل]...",
      },
      explanation: {
        en: "Use one clear hedging verb ('suggest', 'tend to', 'appear to') to state a calibrated claim.",
        ar: "استخدم فعل تحفّظ واضح واحد لصياغة ادعاء أكاديمي متوازن.",
      },
    }),
  },

  "c1-grammar-nominalisation": {
    guide: {
      summary: {
        en: "Nominalisation packs a verb or adjective clause into a concise abstract noun phrase ('Because cities grew rapidly' → 'Rapid urban expansion'), letting you chain ideas logically in formal essays and executive summaries—while keeping an active main verb!",
        ar: "تحوّل الاسمية (Nominalisation) الجمل الفعلية إلى عبارات اسمية مركّزة (Because cities grew rapidly ← Rapid urban expansion)، مما يرفع كثافة الأفكار في المقالات والتقارير مع الحفاظ على فعل رئيسي نشط!",
      },
      whenToUse: [
        {
          en: "Condensing a previous sentence's event into the subject of the next sentence ('The policy changed' → 'This shift prompted...').",
          ar: "تكثيف حدث الجملة السابقة ليكون فاعل الجملة التالية لربط النص بانسيابية.",
        },
        {
          en: "Academic & policy summaries where objective processes matter more than personal pronouns.",
          ar: "التقارير الأكاديمية وملخصات السياسات لرفع الموضوعية والإيجاز.",
        },
        {
          en: "Keep prose readable: pair a nominalised subject with a crisp active verb (avoid 'make a utilisation of' → just say 'use'!).",
          ar: "وازن الاسمية بفعل رئيسي واضح وتجنب الحشو الثقيل.",
        },
      ],
      formulas: [
        {
          label: { en: "Verb → Noun", ar: "فعل ← اسم" },
          pattern: "expand → expansion | reduce → reduction | implement → implementation",
          example: "Rapid expansion strained local transport.",
          arabic: "أجهد التوسّع السريع النقل المحلي.",
        },
        {
          label: { en: "Adjective → Noun", ar: "صفة ← اسم" },
          pattern: "reliable → reliability | scarce → scarcity | transparent → transparency",
          example: "Greater transparency strengthened public trust.",
          arabic: "عزّزت الشفافية الأكبر الثقة العامة.",
        },
        {
          label: { en: "Clause → Noun Subject", ar: "جملة ← فاعل اسمي" },
          pattern: "Because X failed → The failure of X + active verb",
          example: "The failure of legacy pipes accelerated investment.",
          arabic: "سرّع تعطل الأنابيب القديمة وتيرة الاستثمار.",
        },
      ],
      commonMistakes: [
        {
          wrong: "We need to make an implementation of the decision.",
          right: "We need to implement the decision. / Implementation begins Monday.",
          why: {
            en: "Don't create bloated 'make a + noun' phrases when a direct verb is cleaner.",
            ar: "لا تحوّل الفعل إلى اسم ثقيل مسبوق بـ make عندما يكون الفعل المباشر أوضح.",
          },
        },
        {
          wrong: "The expand of solar energy lowered costs.",
          right: "The expansion of solar energy lowered costs.",
          why: {
            en: "Use the noun suffix ('expansion'), not the bare verb ('expand'), after 'The'.",
            ar: "بعد أداة التعريف The نستخدم الاسم expansion وليس الفعل expand.",
          },
        },
      ],
      memoryTip: {
        en: "Pack the cause into a crisp noun phrase ('Rapid expansion') and drive it forward with ONE vivid verb ('transformed')!",
        ar: "اكبس السبب في عبارة اسمية رشيقة (Rapid expansion) وادفعه للأمام بفعل واحد قوي!",
      },
    },
    pickWord: makePickWord({
      sentence: "The swift ___ of digital invoicing cut processing errors in half.",
      options: ["adopt", "adoption", "adoptingly", "adopted"],
      correct: 1,
      explanation: {
        en: "Between 'The swift' and 'of', a noun ('adoption') is grammatically required.",
        ar: "بين الصفة swift وحرف الجر of نحتاج الاسم adoption.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["Rapid", "urban", "expansion", "increased", "water", "demand."],
      explanation: {
        en: "Nominalised noun phrase 'Rapid urban expansion' acts as subject before the active verb 'increased'.",
        ar: "العبارة الاسمية Rapid urban expansion تعمل كفاعل قبل الفعل النشط increased.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a formal sentence using a nominalised noun such as 'expansion', 'reduction', 'adoption', or 'implementation'.",
      cueWords: ["expansion / reduction / adoption"],
      requiredTerms: ["expansion|reduction|adoption|implementation|transparency|reliability"],
      modelSentence: "The adoption of solar energy achieved a major reduction in costs.",
      sentenceHint: {
        en: "Pattern: The [expansion/reduction/adoption] of [topic] + [active verb] + [result].",
        ar: "النمط: The [expansion/reduction/adoption] of [الموضوع] + [فعل نشط] + [النتيجة].",
      },
      explanation: {
        en: "Use a nominalised noun phrase as subject or object paired with a clear active verb.",
        ar: "استخدم الاسم المشتق كفاعل أو مفعول مع فعل رئيسي قوي وواضح.",
      },
    }),
  },

  "c1-grammar-subjunctive-formal": {
    guide: {
      summary: {
        en: "Formal policies, governance memos, and legal recommendations use the Mandative Subjunctive (insist/require/imperative + that + subject + bare infinitive: 'that every record be encrypted') and Inverted Conditionals ('Should a partner request...', 'Had safeguards been omitted...').",
        ar: "تستخدم السياسات الرسمية والمذكرات القانونية صيغة الوجوب (Mandative Subjunctive: insist/require/imperative + that + فاعل + مصدر مجرد مثل that every record be encrypted) والشرط المقلوب الرسمي (Should / Had / Were).",
      },
      whenToUse: [
        {
          en: "After demand/recommendation verbs & adjectives (insist, require, recommend, vital, imperative) + 'that' + subject + BARE INFINITIVE (be, remain, submit—no '-s', no 'is/are').",
          ar: "بعد أفعال وصفات الإلزام والتوصية (insist, require, imperative) + that نستخدم الفعل المجرد تمامًا (be / remain) بلا s أو تصريف.",
        },
        {
          en: "Formal inverted 1st conditional: 'Should you require assistance...' (= If you should require...).",
          ar: "الشرط الرسمي الأول المقلوب: Should + فاعل + فعل أساسي.",
        },
        {
          en: "Formal inverted 3rd conditional: 'Had these safeguards been omitted...' (= If they had been omitted...).",
          ar: "الشرط الرسمي الثالث المقلوب: Had + فاعل + V3.",
        },
      ],
      formulas: [
        {
          label: { en: "Mandative Subjunctive", ar: "صيغة الوجوب الرسمية" },
          pattern: "It is imperative / insist + that + S + (not) + bare verb",
          example: "We require that every file be encrypted.",
          arabic: "نشترط أن يكون كل ملف مشفرًا.",
        },
        {
          label: { en: "Inverted 1st (Should)", ar: "شرط رسمي بـ Should" },
          pattern: "Should + Subject + base verb, main clause",
          example: "Should any error arise, notify security immediately.",
          arabic: "إذا طرأ أي خطأ، أبلغ الأمن فورًا.",
        },
        {
          label: { en: "Inverted 3rd (Had)", ar: "شرط رسمي بـ Had" },
          pattern: "Had + Subject + V3, S + would have + V3",
          example: "Had we skipped review, trust would have suffered.",
          arabic: "لو تخطينا المراجعة لتضررت الثقة.",
        },
      ],
      commonMistakes: [
        {
          wrong: "The board insists that the report is verified today.",
          right: "The board insists that the report be verified today.",
          why: {
            en: "Formal subjunctive uses bare 'be' (never 'is' or 'are') after 'insist that'.",
            ar: "صيغة الوجوب الرسمية تستخدم be المجردة بعد insists that وليس is.",
          },
        },
        {
          wrong: "Should he needs help, call me.",
          right: "Should he need help, call me.",
          why: {
            en: "After modal 'Should', always use the bare verb 'need' (no '-s').",
            ar: "بعد Should يأتي الفعل الأساسي مجردًا need دون s.",
          },
        },
      ],
      memoryTip: {
        en: "In formal policy: INSIST / IMPERATIVE + THAT + Subject + BARE VERB ('be', 'remain', 'not disclose')!",
        ar: "في الصياغة الرسمية: insist / imperative + that + فاعل + فعل مجرد تمامًا (be / remain)!",
      },
    },
    pickWord: makePickWord({
      sentence: "It is vital that every applicant ___ official identification at registration.",
      options: ["presents", "present", "presenting", "is presenting"],
      correct: 1,
      explanation: {
        en: "Mandative subjunctive after 'It is vital that' takes the bare infinitive 'present' (no -s).",
        ar: "تأخذ صيغة الوجوب بعد It is vital that الفعل المجرد present دون s.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["It", "is", "imperative", "that", "every", "record", "be", "encrypted."],
      explanation: {
        en: "Subjunctive passive uses 'that' + subject ('every record') + bare 'be' + V3 ('encrypted').",
        ar: "صيغة الوجوب المبنية للمجهول: that + الفاعل + be المجردة + التصريف الثالث.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a formal policy sentence using 'imperative that' or 'insist that' with bare 'be', OR start with 'Should' / 'Had'.",
      cueWords: ["that ... be / Should / Had"],
      requiredTerms: ["be|should|had"],
      modelSentence: "The committee insists that every proposal be reviewed fairly.",
      sentenceHint: {
        en: "Pattern: It is vital that [noun] be [V3]... OR Should [S] [verb], ...",
        ar: "النمط: It is vital that [اسم] be [V3]... أو Should [فاعل] [فعل]، ...",
      },
      explanation: {
        en: "Apply bare-infinitive subjunctive ('be + V3') or formal conditional inversion ('Should/Had').",
        ar: "استخدم المصدر المجرد be أو القلب الشرطي الرسمي Should/Had.",
      },
    }),
  },

  "c1-grammar-complex-participles": {
    guide: {
      summary: {
        en: "Absolute phrases ('With demand accelerating,...', 'Budget permitting,...') and reduced relative clauses ('programmes designed around real tasks') let C1 writers weave background conditions and multiple perspectives into one graceful sentence.",
        ar: "تتيح العبارات المطلقة (With demand accelerating,... / Budget permitting,...) وجمل الوصل المختصرة (programmes designed around...) دمج الظروف الخلفية وتعدد الزوايا في جملة واحدة رشيقة ومتماسكة.",
      },
      whenToUse: [
        {
          en: "Absolute phrase with 'With + noun + -ing/V3' when the background phrase has its OWN different subject ('With costs falling, solar became viable').",
          ar: "العبارة المطلقة With + اسم + -ing/V3 عندما يكون للخلفية فاعل مختلف عن الجملة الرئيسية.",
        },
        {
          en: "Condensed absolute idioms: 'Budget permitting', 'Weather permitting', 'All things considered'.",
          ar: "العبارات المطلقة الموجزة مثل Budget permitting وAll things considered.",
        },
        {
          en: "Reduced relative clauses omit 'which is/are/were' ('courses aimed at working adults').",
          ar: "اختصار جملة الوصل بحذف which is/are (مثل courses aimed at...).",
        },
      ],
      formulas: [
        {
          label: { en: "With-Absolute", ar: "العبارة المطلقة بـ With" },
          pattern: "With + Noun + V-ing / V3, Main Clause",
          example: "With demand rising rapidly, the academy opened new tracks.",
          arabic: "مع تصاعد الطلب سريعًا، فتحت الأكاديمية مسارات جديدة.",
        },
        {
          label: { en: "Bare Absolute", ar: "عبارة مطلقة موجزة" },
          pattern: "Noun + V-ing / V3, Main Clause",
          example: "Budget permitting, we will launch two new courses.",
          arabic: "إن سمحت الميزانية، سنطلق دورتين جديدتين.",
        },
        {
          label: { en: "Reduced Relative", ar: "وصل مختصر" },
          pattern: "Noun + V3 / V-ing phrase (omitting 'which is/are')",
          example: "Policies aimed at youth require clear outreach.",
          arabic: "السياسات الموجهة للشباب تتطلب تواصلًا واضحًا.",
        },
      ],
      commonMistakes: [
        {
          wrong: "With demand is rising, we added classes.",
          right: "With demand rising, we added classes.",
          why: {
            en: "After 'With + noun', use a participle ('rising'), NOT a finite verb ('is rising').",
            ar: "بعد With + اسم نستخدم اسم الفاعل rising فقط دون is.",
          },
        },
        {
          wrong: "Programmes designing for beginners work best.",
          right: "Programmes designed for beginners work best.",
          why: {
            en: "Programmes are designed (passive), so reduce to V3 'designed'.",
            ar: "البرامج مصمَّمة (مجهول) فنختصرها بـ designed لا designing.",
          },
        },
      ],
      memoryTip: {
        en: "Different subject in front? Add WITH + noun + -ing/V3! Same subject? Drop 'which is' to tighten relative clauses!",
        ar: "فاعل مختلف في البداية؟ استخدم With + اسم + -ing/V3! وللإيجاز احذف which is/are!",
      },
    },
    pickWord: makePickWord({
      sentence: "___ permitting, the outdoor workshop will begin at five o'clock.",
      options: ["Weather", "Because", "Although", "When"],
      correct: 0,
      explanation: {
        en: "'Weather permitting' is a classic noun + participle absolute phrase meaning 'if the weather allows'.",
        ar: "عبارة Weather permitting تركيب مطلق قياسي يعني (إذا سمح الطقس).",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["With", "demand", "rising,", "the", "academy", "added", "two", "cohorts."],
      explanation: {
        en: "Absolute opener 'With demand rising,' sets the condition before the main clause.",
        ar: "تفتح العبارة المطلقة With demand rising المشهد قبل الجملة الرئيسية.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a cohesive C1 sentence using 'With ... rising/growing' or a reduced clause like 'designed for / aimed at'.",
      cueWords: ["With ... / designed for"],
      requiredTerms: ["with|designed|aimed|permitting|built"],
      modelSentence: "Courses designed for busy adults keep completion rates high.",
      sentenceHint: {
        en: "Pattern: With [noun] [V-ing], [main clause] OR [Noun] designed for [group] + [verb]...",
        ar: "النمط: With [اسم] [V-ing]، [جملة] أو [اسم] designed for [فئة] + [فعل]...",
      },
      explanation: {
        en: "Keep no finite 'is/are' inside the absolute or reduced phrase—let the main clause carry the finite verb.",
        ar: "لا تضع is/are داخل العبارة المطلقة أو المختصرة واترك الفعل المصرف للجملة الرئيسية.",
      },
    }),
  },

  "c1-grammar-collocations-precision": {
    guide: {
      summary: {
        en: "True C1 fluency relies on exact verb-noun collocations—the natural word partnerships native and academic writers expect ('conduct research', 'draw a distinction', 'yield insights', 'pose a challenge', 'bridge a gap') instead of literal translations from Arabic.",
        ar: "تعتمد طلاقة مستوى C1 على المتلازمات اللفظية الدقيقة التي يتوقعها القارئ الأكاديمي (conduct research, draw a distinction, yield insights, pose a challenge, bridge a gap) بدلًا من الترجمة الحرفية من العربية.",
      },
      whenToUse: [
        {
          en: "Research & analysis: 'conduct research', 'yield insights', 'draw a distinction', 'reach a consensus'.",
          ar: "في البحث والتحليل: conduct research وyield insights وdraw a distinction.",
        },
        {
          en: "Problem-solving: 'pose a challenge', 'address a concern', 'bridge a gap', 'mitigate risk'.",
          ar: "في حل المشكلات: pose a challenge وbridge a gap وmitigate risk.",
        },
        {
          en: "Always learn the VERB + NOUN pair together as a single chunk, not isolated words.",
          ar: "احفظ الفعل والاسم معًا كوحدة واحدة لا ككلمتين منفصلتين.",
        },
      ],
      formulas: [
        {
          label: { en: "Research & Evidence", ar: "البحث والأدلة" },
          pattern: "conduct research | yield insights | gather evidence",
          example: "The six-month trial yielded actionable insights.",
          arabic: "أثمرت التجربة رؤى عملية قابلة للتطبيق.",
        },
        {
          label: { en: "Analysis & Contrast", ar: "التحليل والتمييز" },
          pattern: "draw a distinction | exert influence | reach a consensus",
          example: "We must draw a sharp distinction between speed and accuracy.",
          arabic: "يجب أن نميّز بوضوح بين السرعة والدقة.",
        },
        {
          label: { en: "Challenges & Solutions", ar: "التحديات والحلول" },
          pattern: "pose a challenge | bridge a gap | mitigate risk",
          example: "Mentoring helps bridge the confidence gap.",
          arabic: "يساعد الإرشاد على ردم فجوة الثقة.",
        },
      ],
      commonMistakes: [
        {
          wrong: "The university did a big research on water.",
          right: "The university conducted extensive research on water.",
          why: {
            en: "'Research' is uncountable (no 'a') and collocates with 'conduct', not 'do a'.",
            ar: "كلمة research غير معدودة وتلازم conduct وليس do a.",
          },
        },
        {
          wrong: "We should make a distinction between both ideas.",
          right: "We should draw a distinction between both ideas.",
          why: {
            en: "The standard academic collocation is 'draw a distinction'.",
            ar: "المتلازمة الأكاديمية الصحيحة هي draw a distinction.",
          },
        },
      ],
      memoryTip: {
        en: "Upgrade generic 'do/make/give' into precision verbs: CONDUCT research, DRAW a distinction, POSE a challenge, YIELD insights!",
        ar: "استبدل do وmake العامة بأفعال دقيقة: conduct research وdraw a distinction وpose a challenge وyield insights!",
      },
    },
    pickWord: makePickWord({
      sentence: "Bilingual mentorship helps learners ___ the gap between theory and real speech.",
      options: ["make", "bridge", "do", "put"],
      correct: 1,
      explanation: {
        en: "'Bridge a gap' is the exact idiomatic collocation meaning to connect two sides or close a shortfall.",
        ar: "المتلازمة الصحيحة هي bridge the gap بمعنى ردم الفجوة.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["The", "pilot", "study", "yielded", "valuable", "insights."],
      explanation: {
        en: "The academic verb 'yielded' pairs naturally with 'valuable insights'.",
        ar: "يتلازم الفعل الأكاديمي yielded طبيعيًا مع valuable insights.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a formal C1 sentence using one of these collocations: 'conduct research', 'pose a challenge', 'draw a distinction', or 'bridge a gap'.",
      cueWords: ["conduct research / pose a challenge / bridge a gap"],
      requiredTerms: ["conduct|pose|draw|bridge|yield"],
      modelSentence: "Rapid urban growth can pose a serious challenge for water networks.",
      sentenceHint: {
        en: "Pattern: [Topic] + can pose a challenge / conduct research / bridge a gap + ...",
        ar: "النمط: [الموضوع] + pose a challenge أو bridge a gap أو conduct research...",
      },
      explanation: {
        en: "Use the exact verb-noun partnership together rather than substituting 'do' or 'make'.",
        ar: "حافظ على اقتران الفعل الدقيق بالاسم الملازم له دون استبداله بـ do أو make.",
      },
    }),
  },

  // ===================== C2 GRAMMAR (6) =====================
  "c2-precision": {
    guide: {
      summary: {
        en: "C2 mastery commands subtle rhetorical nuance through Concessive Fronting ('Compelling though the data may be,...'), Emphatic Negative Fronting ('Little did pioneers anticipate...'), and register-calibrated precision.",
        ar: "يتقن مستوى C2 الدقة البلاغية عبر التقديم الاستدراكي (Compelling though the data may be,...) والتقديم النفيي التوكيدي (Little did pioneers anticipate...) واختيار الأفعال الدقيقة للسياق.",
      },
      whenToUse: [
        {
          en: "Concessive fronting places the key adjective/adverb FIRST + 'though/as' + Subject + Verb ('Compelling though it may seem,...').",
          ar: "تقديم الصفة المهمة أولًا متبوعة بـ though/as ثم الفاعل والفعل لإبراز التنازل ثم الاستدراك.",
        },
        {
          en: "Fronting 'Little' or 'Nowhere' triggers auxiliary inversion ('Little did we realise...').",
          ar: "تقديم Little أو Nowhere يُوجب قلب الفعل المساعد قبل الفاعل.",
        },
        {
          en: "Choose register-calibrated verbs ('hinge on', 'warrant', 'cultivate') over vague fillers.",
          ar: "اختيار أفعال دقيقة مثل hinge on وwarrant لرفع الرصانة.",
        },
      ],
      formulas: [
        {
          label: { en: "Concessive Fronting", ar: "التقديم الاستدراكي" },
          pattern: "Adjective/Adverb + though/as + S + may be/seem, ...",
          example: "Persuasive though the pitch sounded, its data was thin.",
          arabic: "على الرغم من إقناع العرض، كانت بياناته ضعيفة.",
        },
        {
          label: { en: "Little-Inversion", ar: "القلب بعد Little" },
          pattern: "Little + did/do + Subject + realise/know/anticipate...",
          example: "Little did early pioneers anticipate mobile AI.",
          arabic: "قلّما توقّع الروّاد الأوائل ذكاء الهواتف.",
        },
        {
          label: { en: "Precision Verb", ar: "الفعل الدقيق" },
          pattern: "hinge on / warrant / underscore + noun phrase",
          example: "Lasting mastery hinges on disciplined habits.",
          arabic: "يتوقف الإتقان الدائم على العادات المنضبطة.",
        },
      ],
      commonMistakes: [
        {
          wrong: "Although compelling the data may be, we need proof.",
          right: "Compelling though the data may be, we need proof.",
          why: {
            en: "Use 'though' or 'as' (NEVER 'although') after a fronted adjective.",
            ar: "بعد الصفة المقدّمة نستخدم though أو as ولا نستخدم although أبدًا.",
          },
        },
        {
          wrong: "Little they realised the impact.",
          right: "Little did they realise the impact.",
          why: {
            en: "Fronted 'Little' requires auxiliary inversion ('did they realise').",
            ar: "تقديم Little يوجب قلب الفعل المساعد: Little did they realise.",
          },
        },
      ],
      memoryTip: {
        en: "Adjective FIRST + THOUGH (never 'although')! And LITTLE at the start = invert with DID!",
        ar: "الصفة أولًا + though (لا although)! وعند بدء الجملة بـ Little نقلب مع did!",
      },
    },
    pickWord: makePickWord({
      sentence: "Ambitious ___ the timeline appears, every milestone is backed by funding.",
      options: ["although", "though", "despite", "however"],
      correct: 1,
      explanation: {
        en: "Concessive fronting places 'though' (or 'as') right after the fronted adjective 'Ambitious'.",
        ar: "بعد الصفة المقدمة Ambitious نستخدم though (وليس although).",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["Little", "did", "early", "designers", "expect", "such", "reach."],
      explanation: {
        en: "Negative-sense fronting 'Little' inverts 'did' before the subject 'early designers'.",
        ar: "تقديم Little يُلزم قلب did قبل الفاعل early designers.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a C2 sentence using concessive fronting ('[Adj] though ... may be') or 'Little did ...'.",
      cueWords: ["though / Little did"],
      requiredTerms: ["though|little did"],
      modelSentence: "Impressive though the software may appear, human mentorship remains vital.",
      sentenceHint: {
        en: "Pattern: [Adjective] though [subject] may be/seem, [main clause].",
        ar: "النمط: [الصفة] though [الفاعل] may be، [الجملة الرئيسية].",
      },
      explanation: {
        en: "Place the adjective before 'though' (not 'although') or invert the auxiliary after 'Little'.",
        ar: "قدّم الصفة قبل though أو اقلب الفعل المساعد بعد Little.",
      },
    }),
  },

  "c2-grammar-ellipsis-substitution": {
    guide: {
      summary: {
        en: "C2 prose eliminates clumsy repetition through elegant Ellipsis and Substitution: 'that of / those of' for crisp comparisons, 'the former ... the latter' to refer back cleanly, and 'so / nor / as did' for auxiliary substitution.",
        ar: "يتخلص أسلوب C2 من التكرار الممل عبر الحذف والاستبدال الأنيق: that of / those of للمقارنات الدقيقة، وthe former ... the latter للإحالة الواضحة، وso / nor / as did لاستبدال الأفعال.",
      },
      whenToUse: [
        {
          en: "'that of' replaces a SINGULAR/uncountable noun in a comparison; 'those of' replaces a PLURAL noun ('Completion rates surpass those of unguided courses').",
          ar: "تحل that of محل الاسم المفرد وthose of محل الاسم الجمع في المقارنة.",
        },
        {
          en: "'the former' refers to the FIRST of two mentioned items; 'the latter' refers to the SECOND.",
          ar: "تشير the former للأول وthe latter للثاني من عنصرين ذُكرا للتو.",
        },
        {
          en: "'if so / if not' and 'as did / nor does' avoid repeating entire clauses.",
          ar: "تختصر if so / if not وas did / nor does تكرار الجمل كاملة.",
        },
      ],
      formulas: [
        {
          label: { en: "Comparison Substitution", ar: "استبدال المقارنة" },
          pattern: "singular → that of | plural → those of",
          example: "Its climate resembles that of Abha; its rates beat those of peers.",
          arabic: "مناخها يشبه مناخ أبها؛ ومعدلاتها تفوق معدلات أقرانها.",
        },
        {
          label: { en: "Two-Item Reference", ar: "الإحالة لعنصرين" },
          pattern: "A and B: the former ..., whereas the latter ...",
          example: "Self-study and coaching: the former builds pace, the latter fluency.",
          arabic: "الأول يبني الوتيرة، والثاني يصقل الطلاقة.",
        },
        {
          label: { en: "Clause Ellipsis", ar: "اختصار الجملة" },
          pattern: "if so / if not | as did + S | and rightly so",
          example: "Retention rose sharply, as did learner satisfaction.",
          arabic: "ارتفع الاستمرار بشدة، وكذلك رضا المتعلمين.",
        },
      ],
      commonMistakes: [
        {
          wrong: "Our completion rates exceed that of older platforms.",
          right: "Our completion rates exceed those of older platforms.",
          why: {
            en: "'Rates' is plural, so substitute with plural 'those of' (not singular 'that of').",
            ar: "لأن rates جمع نستخدم those of وليس that of.",
          },
        },
        {
          wrong: "The weather in Taif is cooler than Riyadh.",
          right: "The weather in Taif is cooler than that of Riyadh.",
          why: {
            en: "Compare weather with weather ('that of Riyadh'), not weather with a city!",
            ar: "قارن الطقس بالطقس باستخدام that of Riyadh لا الطقس بالمدينة نفسها!",
          },
        },
      ],
      memoryTip: {
        en: "Compare apples to apples: Singular noun → THAT OF; Plural noun → THOSE OF. First = FORMER; Second = LATTER!",
        ar: "قارن المِثل بالمِثل: المفرد ← that of، والجمع ← those of. الأول = former والثاني = latter!",
      },
    },
    pickWord: makePickWord({
      sentence: "The acoustic clarity of this studio surpasses ___ of a standard classroom.",
      options: ["that", "those", "which", "them"],
      correct: 0,
      explanation: {
        en: "'Clarity' is singular/uncountable, so it is substituted by 'that' ('that of').",
        ar: "كلمة clarity مفردة غير معدودة لذلك نستبدلها بـ that of.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: [
        "Guided",
        "completion",
        "rates",
        "surpass",
        "those",
        "of",
        "unguided",
        "playlists.",
      ],
      explanation: {
        en: "Plural 'rates' matches plural substitution 'those of' before 'unguided playlists'.",
        ar: "يطابق الجمع rates أداة الاستبدال الجمع those of.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a concise C2 comparison or reference sentence using 'that of', 'those of', or 'the former ... the latter'.",
      cueWords: ["that of / those of / the former"],
      requiredTerms: ["that of|those of|the former|the latter"],
      modelSentence: "The battery life of the new tablet exceeds that of the older model.",
      sentenceHint: {
        en: "Pattern: The [noun] of A exceeds that of / those of B.",
        ar: "النمط: The [الاسم] of A exceeds that of أو those of B.",
      },
      explanation: {
        en: "Match 'that of' to a singular noun and 'those of' to a plural noun for exact parallel comparison.",
        ar: "طابق that of مع المفرد وthose of مع الجمع لضمان دقة المقارنة.",
      },
    }),
  },

  "c2-grammar-subtle-conditionals": {
    guide: {
      summary: {
        en: "C2 speakers express sophisticated counterfactuals WITHOUT 'if', using prepositional openers ('But for', 'Had it not been for' + noun), formal inversion ('Were we to neglect...'), and compact pivots ('Otherwise').",
        ar: "يعبّر مستوى C2 عن الشرط الافتراضي الراقي دون كلمة if، باستخدام تراكيب اسمية (But for / Had it not been for + اسم) والقلب الرسمي (Were we to...) والرابط الموجز Otherwise.",
      },
      whenToUse: [
        {
          en: "'But for + noun phrase' (= If it were not for / If it had not been for) works for both present and past counterfactuals.",
          ar: "تعمل But for + اسم للشرط الافتراضي الحاضر والماضي بإيجاز بالغ.",
        },
        {
          en: "'Were + subject + to + base verb' expresses a formal unlikely future condition.",
          ar: "تعبّر Were + فاعل + to + فعل أساسي عن شرط مستقبلي مستبعد بأسلوب رسمي.",
        },
        {
          en: "'Otherwise' pivots cleanly from a condition to the negative consequence without repeating an 'if not' clause.",
          ar: "تختصر Otherwise جملة الشرط المنفي وتنتقل مباشرة للنتيجة.",
        },
      ],
      formulas: [
        {
          label: { en: "But for + Noun", ar: "But for + اسم" },
          pattern: "But for + noun phrase, S + would (have) + V",
          example: "But for early solar investment, costs would have surged.",
          arabic: "لولا الاستثمار المبكر في الطاقة الشمسية لارتفعت التكاليف.",
        },
        {
          label: { en: "Were ... to Inversion", ar: "القلب بـ Were ... to" },
          pattern: "Were + S + to + base verb, S + would + base",
          example: "Were cities to ignore leaks, water gains would vanish.",
          arabic: "لو تجاهلت المدن التسربات لتلاشت مكاسب المياه.",
        },
        {
          label: { en: "Otherwise Pivot", ar: "الرابط Otherwise" },
          pattern: "Action / Requirement; otherwise, S + would/will + V",
          example: "Inspect pipes quarterly; otherwise, losses multiply.",
          arabic: "افحص الأنابيب فصليًا؛ وإلا تتضاعف الخسائر.",
        },
      ],
      commonMistakes: [
        {
          wrong: "But for he helped us, we would have failed.",
          right: "But for his help, we would have failed.",
          why: {
            en: "'But for' is a preposition and MUST take a noun phrase ('his help'), not a full clause.",
            ar: "But for حرف جر يحتاج اسمًا بعده (his help) وليس جملة فعلية.",
          },
        },
        {
          wrong: "Were we ignoring usability, learners would leave.",
          right: "Were we to ignore usability, learners would leave.",
          why: {
            en: "Hypothetical future inversion takes 'Were + Subject + to + base verb'.",
            ar: "صيغة الشرط المستقبلي المقلوب هي Were + فاعل + to + مصدر.",
          },
        },
      ],
      memoryTip: {
        en: "BUT FOR + NOUN! WERE + Subject + TO + base verb! Clean counterfactuals without a single 'if'!",
        ar: "But for + اسم! وWere + فاعل + to + مصدر! شرط افتراضي رفيع بلا كلمة if!",
      },
    },
    pickWord: makePickWord({
      sentence: "___ for the mentor's timely review, the flaw would have reached production.",
      options: ["But", "If", "Unless", "Although"],
      correct: 0,
      explanation: {
        en: "'But for + noun phrase' means 'if it had not been for'.",
        ar: "التركيب But for + اسم يعني (لولا) في الشرط الافتراضي.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["Were", "we", "to", "delay", "now,", "costs", "would", "rise."],
      explanation: {
        en: "Inverted counterfactual: 'Were' + subject ('we') + 'to' + base verb ('delay').",
        ar: "الشرط المقلوب: Were + الفاعل we + to + الفعل الأساسي delay.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a C2 counterfactual without 'if' using 'But for' (+ noun), 'Were ... to', or 'otherwise'.",
      cueWords: ["But for / Were ... to / otherwise"],
      requiredTerms: ["but for|were|otherwise"],
      modelSentence: "But for her calm leadership, the negotiations would have stalled.",
      sentenceHint: {
        en: "Pattern: But for [noun], [S] would have [V3]... OR [Action]; otherwise, ...",
        ar: "النمط: But for [اسم]، [فاعل] would have [V3]... أو [إجراء]؛ otherwise، ...",
      },
      explanation: {
        en: "Follow 'But for' with a noun phrase or invert 'Were + subject + to + verb' for C2 counterfactual control.",
        ar: "اتبع But for بعبارة اسمية أو استخدم Were + فاعل + to + فعل.",
      },
    }),
  },

  "c2-grammar-metaphor-idiomatic-register": {
    guide: {
      summary: {
        en: "Formal idioms and conceptual metaphors ('bear fruit', 'set a precedent', 'tip the balance', 'double-edged sword') add vivid persuasion to executive writing—as long as they match formal register and never clash into mixed metaphors.",
        ar: "تُضفي التعابير الاصطلاحية الرفيعة والاستعارات المتماسكة (bear fruit, set a precedent, tip the balance, double-edged sword) قوة إقناع للكتابة القيادية، بشرط مناسبة الأسلوب وعدم خلط استعارتين متنافرتين.",
      },
      whenToUse: [
        {
          en: "Use ONE consistent image per sentence (e.g., botanical: 'plant seeds → bear fruit'; scales: 'weigh options → tip the balance').",
          ar: "التزم بصورة مجازية واحدة متسقة داخل الجملة (الزراعة أو الميزان).",
        },
        {
          en: "Keep idioms in formal register: prefer 'bear fruit' or 'set a precedent' over slang in policy briefs.",
          ar: "اختر التعابير الرسمية في التقارير وتجنب العامية.",
        },
        {
          en: "Never mix clashing images ('sailing a train uphill into a spotlight').",
          ar: "تجنب خلط استعارات متضاربة في الجملة نفسها.",
        },
      ],
      formulas: [
        {
          label: { en: "Long-Term Payoff", ar: "ثمار طويلة الأمد" },
          pattern: "Patient investment / efforts + bear fruit",
          example: "Years of teacher training eventually bear fruit.",
          arabic: "تؤتي سنوات تدريب المعلمين ثمارها في النهاية.",
        },
        {
          label: { en: "Setting a Standard", ar: "إرساء سابقة" },
          pattern: "set a (regional/historic) precedent",
          example: "Transparent audits set a lasting precedent.",
          arabic: "ترسي عمليات التدقيق الشفافة سابقة دائمة.",
        },
        {
          label: { en: "Decisive Factor", ar: "عامل حاسم" },
          pattern: "tip the balance (in favour of / toward)",
          example: "Consistent coaching tipped the balance toward mastery.",
          arabic: "رجّح التدريب المستمر الكفة نحو الإتقان.",
        },
      ],
      commonMistakes: [
        {
          wrong: "This strategy will sail our train across the finish line and bear gold.",
          right: "This strategy will keep our initiative on track and eventually bear fruit.",
          why: {
            en: "Avoid mixing incompatible metaphors (sailing + train + race + fruit).",
            ar: "تجنب خلط صور مجازية متنافرة داخل جملة واحدة.",
          },
        },
        {
          wrong: "The policy made a precedent in the region.",
          right: "The policy set a precedent in the region.",
          why: {
            en: "The exact idiomatic verb is 'set a precedent', not 'make'.",
            ar: "الفعل الاصطلاحي الصحيح هو set a precedent وليس make.",
          },
        },
      ],
      memoryTip: {
        en: "One clean metaphor per idea! Memorise exact verbs: SET a precedent, BEAR fruit, TIP the balance.",
        ar: "استعارة واحدة نقية لكل فكرة! واحفظ الأفعال الدقيقة: set a precedent وbear fruit وtip the balance.",
      },
    },
    pickWord: makePickWord({
      sentence:
        "Consistent reading habits rarely grab instant attention, yet over time they always ___ fruit.",
      options: ["carry", "bear", "make", "throw"],
      correct: 1,
      explanation: {
        en: "'Bear fruit' is the fixed formal idiom meaning 'produce worthwhile results over time'.",
        ar: "التعبير الاصطلاحي الثابت هو bear fruit بمعنى يؤتي ثماره.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["Transparent", "standards", "can", "set", "a", "lasting", "precedent."],
      explanation: {
        en: "Subject 'Transparent standards' + modal 'can' + fixed idiom 'set a lasting precedent'.",
        ar: "الفاعل + can + التعبير الاصطلاحي set a lasting precedent.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a formal C2 sentence using one of these idioms cleanly: 'bear fruit', 'set a precedent', or 'tip the balance'.",
      cueWords: ["bear fruit / set a precedent / tip the balance"],
      requiredTerms: [
        "bear fruit|bore fruit|set a precedent|sets a precedent|tip the balance|tipped the balance",
      ],
      modelSentence: "Patient investment in teacher mentorship will eventually bear fruit.",
      sentenceHint: {
        en: "Pattern: [Long-term effort/policy] + will bear fruit / set a precedent / tip the balance...",
        ar: "النمط: [الجهد أو السياسة] + bear fruit أو set a precedent أو tip the balance...",
      },
      explanation: {
        en: "Keep the fixed idiom exact and avoid mixing conflicting imagery in the same clause.",
        ar: "حافظ على الصيغة الدقيقة للتعبير الاصطلاحي دون خلط استعارات أخرى.",
      },
    }),
  },

  "c2-grammar-modality-diplomacy": {
    guide: {
      summary: {
        en: "Diplomatic C2 English softens high-stakes disagreement without surrendering authority—using Litotes ('not without risk', 'hardly negligible'), Tentative Past ('I was wondering whether we might...'), and constructive reframing.",
        ar: "يُلطّف الأسلوب الدبلوماسي في C2 الخلافات الحساسة دون فقدان الحزم—عبر التهوين البلاغي (Litotes: not without risk / hardly negligible) والماضي اللطيف (I was wondering whether we might...) وإعادة التأطير البنّاءة.",
      },
      whenToUse: [
        {
          en: "Litotes (understated negative): 'not without considerable risk' signals serious danger politely in boardrooms.",
          ar: "التهوين البلاغي (not without risk) ينبّه لخطر جدي بلباقة قيادية.",
        },
        {
          en: "Tentative past distance ('I wondered whether we might...') softens requests to senior stakeholders.",
          ar: "الماضي التلطيفي (I wondered whether we might...) يجعل الاقتراح مهذبًا غير صدامي.",
        },
        {
          en: "Acknowledge → Pivot → Propose: validate the partner's goal first ('I appreciate the urgency; nonetheless...'), then offer a bounded alternative.",
          ar: "ثلاثية الدبلوماسية: تقدير الهدف ← استدراك هادئ (nonetheless) ← اقتراح بديل عملي.",
        },
      ],
      formulas: [
        {
          label: { en: "Litotes (Understatement)", ar: "التهوين الدبلوماسي" },
          pattern: "is not without [noun] | is hardly [adj]",
          example: "Signing before an audit is not without risk.",
          arabic: "التوقيع قبل التدقيق لا يخلو من مخاطرة.",
        },
        {
          label: { en: "Tentative Proposal", ar: "اقتراح مهذّب" },
          pattern: "I was wondering whether we might + base verb",
          example: "I was wondering whether we might run a ninety-day pilot.",
          arabic: "كنت أتساءل إن كان بإمكاننا تشغيل تجربة لـ ٩٠ يومًا.",
        },
        {
          label: { en: "Concessive Reframing", ar: "إعادة تأطير بنّاءة" },
          pattern: "I fully appreciate X; nonetheless, ...",
          example: "I appreciate the urgency; nonetheless, safety comes first.",
          arabic: "أقدّر الاستعجال تمامًا؛ ومع ذلك فالسلامة أولًا.",
        },
      ],
      commonMistakes: [
        {
          wrong: "Your contract plan is completely foolish and dangerous.",
          right: "Proceeding before a security review is not without considerable risk.",
          why: {
            en: "Blunt attacks trigger defensiveness; litotes keeps authority while staying diplomatic.",
            ar: "الهجوم المباشر يثير الدفاعية؛ أما التهوين الدبلوماسي فيحفظ الحزم واللباقة.",
          },
        },
        {
          wrong: "I was wondering if we can to pause the launch.",
          right: "I was wondering whether we might pause the launch.",
          why: {
            en: "Backshift 'can' to 'might/could' after 'I was wondering', and never add 'to'.",
            ar: "نستخدم might أو could بعد I was wondering دون إضافة to.",
          },
        },
      ],
      memoryTip: {
        en: "Acknowledge ('I appreciate...') + Understate ('not without risk') + Propose ('I wondered whether we might...')!",
        ar: "قدّر أولًا (I appreciate) + لطّف النقد (not without risk) + اقترح بديلًا (I wondered whether we might)!",
      },
    },
    pickWord: makePickWord({
      sentence: "I was wondering whether we ___ authorise a limited pilot before full rollout.",
      options: ["might", "must", "will to", "shall to"],
      correct: 0,
      explanation: {
        en: "'Might' pairs naturally with tentative past 'I was wondering whether' for diplomatic proposals.",
        ar: "يتناغم الفعل might مع صيغة اللباقة I was wondering whether للاقتراح الدبلوماسي.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["Signing", "before", "review", "is", "not", "without", "risk."],
      explanation: {
        en: "Litotes 'is not without risk' communicates serious caution in poised executive register.",
        ar: "صيغة التهوين البلاغي is not without risk تنقل التحذير الجدي بأسلوب قيادي راقٍ.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a diplomatic C2 sentence using 'not without', 'hardly', or 'I was wondering whether we might'.",
      cueWords: ["not without / wondering whether"],
      requiredTerms: ["not without|hardly|wondering whether|wondered whether|nonetheless"],
      modelSentence: "I was wondering whether we might review the schedule before signing.",
      sentenceHint: {
        en: "Pattern: I was wondering whether we might + [verb]... OR [Action] is not without [risk/cost].",
        ar: "النمط: I was wondering whether we might + [فعل]... أو [الإجراء] is not without [مخاطرة].",
      },
      explanation: {
        en: "Use tentative modality or litotes to raise an objection calmly while proposing a constructive step.",
        ar: "استخدم اللباقة التلطيفية أو التهوين لطرح التحفظ بهدوء واقتراح حل عملي.",
      },
    }),
  },

  "c2-grammar-parallelism-cadence": {
    guide: {
      summary: {
        en: "Memorable speeches and flagship prose achieve effortless rhythm through Strict Parallelism (matching grammatical forms across every item in a list) and Ascending Tricolon (three balanced elements building toward the strongest climax).",
        ar: "تكتسب الخطب المؤثرة والنصوص الرفيعة إيقاعًا لا يُنسى عبر التوازي النحوي الدقيق (توحيد الصيغة النحوية لجميع عناصر السلسلة) والثلاثية التصاعدية (Tricolon: ثلاثة عناصر متوازنة تتصاعد نحو الذروة).",
      },
      whenToUse: [
        {
          en: "Keep EVERY item in a coordinated list in the EXACT same form: all 'to + verb', all '-ing', or all noun phrases.",
          ar: "وحّد الصيغة النحوية لكل عناصر القائمة: كلها to + فعل، أو كلها -ing، أو كلها عبارات اسمية.",
        },
        {
          en: "Pair correlative conjunctions symmetrically: 'not only + X, but also + X'; 'both + X and + X'.",
          ar: "اجعل طرفي أدوات الربط المزدوجة (not only ... but also) متطابقين نحويًا.",
        },
        {
          en: "Use a tricolon (rule of three) in conclusions, placing the longest, most resonant phrase third.",
          ar: "استخدم الثلاثية التصاعدية في الخواتيم مع وضع العبارة الأقوى والأطول ثالثة.",
        },
      ],
      formulas: [
        {
          label: { en: "Infinitive Tricolon", ar: "ثلاثية بالمصدر" },
          pattern: "to [verb A], to [verb B], and to [verb C]",
          example: "to honour heritage, to open doors, and to empower families.",
          arabic: "تكريم الإرث، وفتح الأبواب، وتمكين الأسر.",
        },
        {
          label: { en: "Gerund Parallelism", ar: "توازي صيغة -ing" },
          pattern: "[V-ing A], [V-ing B], and [V-ing C]",
          example: "listening closely, questioning assumptions, and verifying facts.",
          arabic: "الاستماع بدقة، ومساءلة الافتراضات، والتحقق من الحقائق.",
        },
        {
          label: { en: "Balanced Antithesis", ar: "طباق متوازن" },
          pattern: "not [noun/clause A], but [noun/clause B]",
          example: "not fleeting hype, but durable mastery.",
          arabic: "لا ضجيجًا عابرًا، بل إتقانًا راسخًا.",
        },
      ],
      commonMistakes: [
        {
          wrong: "Our goal is to listen clearly, building trust, and clear writing.",
          right: "Our goal is to listen clearly, to build trust, and to write clearly.",
          why: {
            en: "Don't mix infinitive ('to listen'), gerund ('building'), and noun ('writing') in one list.",
            ar: "لا تخلط بين المصدر و-ing والاسم داخل سلسلة واحدة؛ وحّد الصيغة.",
          },
        },
        {
          wrong: "She not only led the workshop but also was a mentor to new staff.",
          right: "She not only led the workshop but also mentored new staff.",
          why: {
            en: "Match past verb 'led' with parallel past verb 'mentored' after 'but also'.",
            ar: "طابق الفعل الماضي led بفعل ماضٍ مماثل mentored بعد but also.",
          },
        },
      ],
      memoryTip: {
        en: "Check your list's rhythm: verb-verb-verb, noun-noun-noun, or to-to-to—put the strongest punchline THIRD!",
        ar: "افحص إيقاع سلسلتك: فعل-فعل-فعل أو اسم-اسم-اسم، واجعل العبارة الأقوى ثالثة!",
      },
    },
    pickWord: makePickWord({
      sentence: "Great coaches aim to clarify rules, to model fluency, and ___ learner confidence.",
      options: ["building", "to build", "built", "the building of"],
      correct: 1,
      explanation: {
        en: "To match 'to clarify' and 'to model', the third parallel element must be 'to build'.",
        ar: "لتحقيق التوازي مع to clarify وto model يجب أن يكون العنصر الثالث to build.",
      },
    }),
    rearrange: makeRearrange({
      orderedWords: ["We", "aim", "to", "listen,", "to", "learn,", "and", "to", "lead."],
      explanation: {
        en: "A crisp infinitive tricolon repeats 'to + base verb' three times in ascending order.",
        ar: "ثلاثية متوازية تكرّر to + الفعل الأساسي ثلاث مرات بإيقاع تصاعدي.",
      },
    }),
    fitSentence: makeFitSentence({
      prompt:
        "Write a parallel tricolon sentence using three matching verb forms (e.g. 'to ..., to ..., and to ...' or three '-ing' forms).",
      cueWords: ["and", "3 parallel items"],
      requiredTerms: ["and"],
      minWords: 6,
      modelSentence:
        "Our academy exists to teach clearly, to practise daily, and to inspire confidence.",
      sentenceHint: {
        en: "Pattern: [Subject] + aims to [V1], to [V2], and to [V3].",
        ar: "النمط: [الفاعل] + aims to [فعل ١]، to [فعل ٢]، and to [فعل ٣].",
      },
      explanation: {
        en: "Maintain identical grammatical form across all three coordinated items joined by 'and'.",
        ar: "حافظ على تماثل الصيغة النحوية في العناصر الثلاثة المترابطة بـ and.",
      },
    }),
  },
};
