import type { Lesson } from "./lesson-types";

export const LEVEL_LESSONS: Lesson[] = [
  {
    id: "a1-introductions",
    course: "a1",
    skill: "grammar",
    title: {
      en: "Introduce yourself",
      ar: "عرّف بنفسك",
    },
    goal: {
      en: "Use am, is and are in personal introductions.",
      ar: "استخدم am وis وare للتعريف بنفسك.",
    },
    minutes: 15,
    teaching: [
      {
        en: "Use I am, he/she/it is, and you/we/they are. A noun often follows: I am a student.",
        ar: "نستخدم I am وhe/she/it is وyou/we/they are. مثال: I am a student أي أنا طالب.",
      },
      {
        en: "For questions, move the verb before the subject: Are you a teacher? Answer: Yes, I am. No, I am not.",
        ar: "في السؤال نضع الفعل قبل الفاعل: Are you a teacher? والإجابة: Yes, I am أو No, I am not.",
      },
    ],
    example:
      "Maya: Hello. I am Maya. I am from Jordan.\nAli: Nice to meet you. Are you a student?\nMaya: Yes, I am. My sister is a teacher.",
    pronunciation: "I am a student. My sister is a teacher.",
    pronunciationTip: {
      en: "Keep the final /t/ in student; do not add a vowel after it.",
      ar: "حافظ على صوت /t/ في نهاية student ولا تضف حركة بعده.",
    },
    questions: [
      {
        prompt: "My sister ___ a teacher.",
        options: ["are", "is", "am"],
        correct: 1,
        explanation: {
          en: "Sister is singular, so use is.",
          ar: "sister مفرد، لذلك نستخدم is.",
        },
      },
      {
        prompt: "Choose the correct question.",
        options: ["You are a student?", "Are you a student?", "Is you a student?"],
        correct: 1,
        explanation: {
          en: "Invert are and you to make the question.",
          ar: "نقدم are على you لتكوين السؤال.",
        },
      },
    ],
  },
  {
    id: "a1-routines",
    course: "a1",
    skill: "reading",
    title: {
      en: "Your daily routine",
      ar: "روتينك اليومي",
    },
    goal: {
      en: "Describe habits and find times in a short text.",
      ar: "صف العادات واستخرج الأوقات من نص قصير.",
    },
    minutes: 15,
    teaching: [
      {
        en: "Use the present simple for routines: I work, she works. Add -s for he, she and it.",
        ar: "نستخدم المضارع البسيط للعادات: I work وshe works. نضيف s مع he وshe وit.",
      },
      {
        en: "Use at for clock times and on for days. Negative: I do not work on Friday; he does not work on Friday.",
        ar: "نستخدم at مع الساعة وon مع الأيام. النفي: I do not work وhe does not work.",
      },
    ],
    example:
      "Omar works in a shop. He starts at nine and finishes at five. He walks to work. On Friday, he stays at home and cooks lunch.",
    pronunciation: "He starts at nine and finishes at five.",
    pronunciationTip: {
      en: "Distinguish /f/ in five from /v/; touch the lower lip with the upper teeth.",
      ar: "ميّز بين /f/ و/v/ مع ملامسة الأسنان العليا للشفة السفلى.",
    },
    questions: [
      {
        prompt: "When does Omar start work?",
        options: ["At five", "At nine", "On Friday"],
        correct: 1,
        explanation: {
          en: "The text explicitly says he starts at nine.",
          ar: "يذكر النص أنه يبدأ عند التاسعة.",
        },
      },
      {
        prompt: "She ___ to work every day.",
        options: ["walk", "walking", "walks"],
        correct: 2,
        explanation: {
          en: "She takes a present-simple verb with -s.",
          ar: "نضيف s إلى الفعل مع she في المضارع البسيط.",
        },
      },
    ],
  },
  {
    id: "a1-requests",
    course: "a1",
    skill: "writing",
    title: {
      en: "Make a polite request",
      ar: "اطلب بأدب",
    },
    goal: {
      en: "Ask for an item and write a short message.",
      ar: "اطلب شيئًا واكتب رسالة قصيرة.",
    },
    minutes: 15,
    teaching: [
      {
        en: "Can I have ... please? is a polite request. Use a/an for one countable thing: a ticket, an apple.",
        ar: "Can I have ... please? صيغة مهذبة. نستخدم a/an مع اسم مفرد معدود: a ticket وan apple.",
      },
      {
        en: "Use some with plural nouns or uncountable nouns: some apples, some water. Add a greeting and thanks to a short message.",
        ar: "نستخدم some مع الجمع وغير المعدود مثل some apples وsome water. أضف تحية وشكرًا للرسالة.",
      },
    ],
    example:
      "Hello Sara,\nCan I have a copy of the timetable, please? I need it for Monday.\nThank you,\nAli",
    pronunciation: "Can I have a bottle of water, please?",
    pronunciationTip: {
      en: "Practise /p/ in please with both lips; it is not /b/.",
      ar: "تدرّب على /p/ في please بإغلاق الشفتين؛ فهو ليس /b/.",
    },
    questions: [
      {
        prompt: "Can I have ___ apple?",
        options: ["a", "an", "many"],
        correct: 1,
        explanation: {
          en: "Apple starts with a vowel sound, so use an.",
          ar: "تبدأ apple بصوت علة لذلك نستخدم an.",
        },
      },
      {
        prompt: "Choose the polite request.",
        options: ["Give water.", "Can I have some water, please?", "Water now."],
        correct: 1,
        explanation: {
          en: "Can I have and please make the request polite.",
          ar: "Can I have وplease يجعلان الطلب مهذبًا.",
        },
      },
    ],
    writing: {
      prompt:
        "Write a message asking your teacher for a book. Include a greeting, a polite request and thanks.",
      minimum: 25,
      model:
        "Hello Ms Samira,\nCan I have the English book for our next lesson, please? I want to read it at home this evening. Thank you for your help.\nAli",
      checklist: [
        {
          en: "A greeting and thanks",
          ar: "تحية وشكر",
        },
        {
          en: "A clear request with please",
          ar: "طلب واضح يتضمن please",
        },
      ],
    },
  },
  {
    id: "a2-past",
    course: "a2",
    skill: "grammar",
    title: {
      en: "Tell a story in the past",
      ar: "احكِ قصة في الماضي",
    },
    goal: {
      en: "Use past simple statements and questions.",
      ar: "استخدم الماضي البسيط في الجمل والأسئلة.",
    },
    minutes: 15,
    teaching: [
      {
        en: "Regular verbs end in -ed. Common irregular verbs include go/went, buy/bought and see/saw.",
        ar: "تنتهي الأفعال المنتظمة بـed. من الأفعال الشاذة go/went وbuy/bought وsee/saw.",
      },
      {
        en: "After did or did not, use the base verb: Did you go? I did not buy it. Use first, then and finally to order events.",
        ar: "نستخدم المصدر بعد did وdid not: Did you go? رتّب الأحداث باستخدام first وthen وfinally.",
      },
    ],
    example:
      "Last Saturday, we went to the market. First, we bought vegetables. Then we saw an old friend. We did not stay long because it started to rain.",
    pronunciation: "We went to the market and bought vegetables.",
    pronunciationTip: {
      en: "Bought ends in /t/, not /d/. Keep the consonant clear.",
      ar: "تنتهي bought بصوت /t/ وليس /d/.",
    },
    questions: [
      {
        prompt: "Yesterday we ___ to the market.",
        options: ["go", "went", "gone"],
        correct: 1,
        explanation: {
          en: "Went is the past simple of go.",
          ar: "went هي صيغة الماضي البسيط من go.",
        },
      },
      {
        prompt: "Did you ___ your friend?",
        options: ["saw", "seen", "see"],
        correct: 2,
        explanation: {
          en: "Did already marks past tense; use see.",
          ar: "did تدل على الماضي لذلك نستخدم see.",
        },
      },
    ],
  },
  {
    id: "a2-comparisons",
    course: "a2",
    skill: "reading",
    title: {
      en: "Compare places",
      ar: "قارن بين الأماكن",
    },
    goal: {
      en: "Compare options using comparative adjectives.",
      ar: "قارن الخيارات باستخدام صفات المقارنة.",
    },
    minutes: 15,
    teaching: [
      {
        en: "For short adjectives, add -er: cheaper, smaller. For many longer adjectives, use more: more comfortable.",
        ar: "نضيف er إلى الصفات القصيرة مثل cheaper، ونستخدم more مع كثير من الصفات الطويلة مثل more comfortable.",
      },
      {
        en: "Use than to introduce the second option. Good becomes better; bad becomes worse. Compare the same feature in each place.",
        ar: "نستخدم than للخيار الثاني. تصبح good هي better وbad هي worse. قارن المعيار نفسه في المكانين.",
      },
    ],
    example:
      "The Park Hotel costs £60 a night and is two kilometres from the station. The City Hotel costs £90 and is next to the station. Both offer breakfast, but the Park Hotel has larger rooms.",
    pronunciation: "The Park Hotel is cheaper, but the City Hotel is more convenient.",
    pronunciationTip: {
      en: "Stress the middle syllable of convenient: con-VEN-ient.",
      ar: "انبر المقطع الأوسط في convenient.",
    },
    questions: [
      {
        prompt: "Which hotel has larger rooms?",
        options: ["City Hotel", "Park Hotel", "Both are identical"],
        correct: 1,
        explanation: {
          en: "The final sentence says the Park Hotel has larger rooms.",
          ar: "تذكر الجملة الأخيرة أن غرف Park Hotel أكبر.",
        },
      },
      {
        prompt: "The City Hotel is ___ expensive.",
        options: ["most", "more", "much than"],
        correct: 1,
        explanation: {
          en: "Compare two options with more expensive.",
          ar: "نقارن خيارين باستخدام more expensive.",
        },
      },
    ],
  },
  {
    id: "a2-plans",
    course: "a2",
    skill: "writing",
    title: {
      en: "Make plans and invitations",
      ar: "الخطط والدعوات",
    },
    goal: {
      en: "Use going to and invite a friend.",
      ar: "استخدم going to وادعُ صديقًا.",
    },
    minutes: 15,
    teaching: [
      {
        en: "Use am/is/are going to + base verb for intentions: We are going to visit the museum.",
        ar: "استخدم am/is/are going to مع المصدر للنوايا: We are going to visit the museum.",
      },
      {
        en: "Invite with Would you like to ...? Include a day, time and meeting place so your friend can respond.",
        ar: "ادعُ بصيغة Would you like to ...? وحدد اليوم والوقت ومكان اللقاء.",
      },
    ],
    example:
      "Hi Noor,\nWe are going to visit the museum on Saturday. Would you like to join us? We can meet outside the station at ten. Let me know!\nHana",
    pronunciation: "Would you like to join us on Saturday?",
    pronunciationTip: {
      en: "Link would you gently; keep like clear rather than adding an extra vowel.",
      ar: "اربط would you بسلاسة دون إضافة حركة زائدة في like.",
    },
    questions: [
      {
        prompt: "We ___ going to visit the museum.",
        options: ["is", "am", "are"],
        correct: 2,
        explanation: {
          en: "We pairs with are.",
          ar: "نستخدم are مع we.",
        },
      },
      {
        prompt: "Which detail is in the invitation?",
        options: ["A ticket price", "A meeting time", "A restaurant menu"],
        correct: 1,
        explanation: {
          en: "The message gives ten as the meeting time.",
          ar: "تحدد الرسالة الساعة العاشرة للقاء.",
        },
      },
    ],
    writing: {
      prompt: "Invite a friend to a weekend activity. Give the plan, time and meeting place.",
      minimum: 50,
      model:
        "Hi Salma,\nI am going to visit the new science museum on Saturday morning. Would you like to come with me? We can meet outside the main entrance at ten and have lunch afterwards. I think you will enjoy the space exhibition. Please let me know if you are free.\nBest wishes,\nRana",
      checklist: [
        {
          en: "Plan with going to",
          ar: "خطة باستخدام going to",
        },
        {
          en: "Time, place and invitation",
          ar: "وقت ومكان ودعوة",
        },
      ],
    },
  },
  {
    id: "b1-experiences",
    course: "b1",
    skill: "grammar",
    title: {
      en: "Experiences and finished events",
      ar: "التجارب والأحداث المنتهية",
    },
    goal: {
      en: "Distinguish present perfect from past simple.",
      ar: "ميّز بين المضارع التام والماضي البسيط.",
    },
    minutes: 15,
    teaching: [
      {
        en: "Use have/has + past participle for experience without a finished time: I have visited Cairo.",
        ar: "استخدم have/has مع التصريف الثالث لتجربة بلا وقت منتهٍ: I have visited Cairo.",
      },
      {
        en: "Use past simple with a finished time: I visited Cairo in 2022. Ever asks about experience; never means at no time before now.",
        ar: "استخدم الماضي البسيط مع وقت منتهٍ: I visited Cairo in 2022. نسأل عن الخبرة باستخدام ever ونعبر عن عدم حدوثها باستخدام never.",
      },
    ],
    example:
      "Have you ever tried diving? I have tried it once. I went diving in Aqaba last summer. I have never seen such colourful fish before.",
    pronunciation: "I have visited Cairo, but I went to Aqaba last summer.",
    pronunciationTip: {
      en: "Have may be weak /həv/; stress visited and the place names.",
      ar: "قد تُنطق have بشكل مخفف؛ انبر visited وأسماء الأماكن.",
    },
    questions: [
      {
        prompt: "I ___ that film yesterday.",
        options: ["have seen", "saw", "see"],
        correct: 1,
        explanation: {
          en: "Yesterday is a finished time, so use past simple.",
          ar: "yesterday وقت منتهٍ لذا نستخدم الماضي البسيط.",
        },
      },
      {
        prompt: "Have you ever ___ diving?",
        options: ["try", "tried", "trying"],
        correct: 1,
        explanation: {
          en: "Present perfect uses the past participle tried.",
          ar: "يستخدم المضارع التام التصريف الثالث tried.",
        },
      },
    ],
  },
  {
    id: "b1-advice",
    course: "b1",
    skill: "reading",
    title: {
      en: "Advice and consequences",
      ar: "النصيحة والنتائج",
    },
    goal: {
      en: "Use should and the first conditional.",
      ar: "استخدم should والشرطية الأولى.",
    },
    minutes: 15,
    teaching: [
      {
        en: "Should + base verb gives advice, not an obligation: You should take a break.",
        ar: "تعطي should مع المصدر نصيحة وليست إلزامًا: You should take a break.",
      },
      {
        en: "For a real future possibility, use if + present simple, will + base verb. Do not put will in the if clause.",
        ar: "لاحتمال مستقبلي واقعي نستخدم if مع المضارع البسيط ثم will مع المصدر، ولا نضع will بعد if.",
      },
    ],
    example:
      "If you study a little every day, you will remember more. You should review difficult words before learning new ones. If you feel tired, take a short break. Sleeping well can also improve concentration.",
    pronunciation: "If you study every day, you will remember more.",
    pronunciationTip: {
      en: "Keep the two stressed ideas clear: study every DAY, remember MORE.",
      ar: "انبر الفكرة الأساسية في كل جزء: DAY وMORE.",
    },
    questions: [
      {
        prompt: "If I practise, I ___ improve.",
        options: ["will", "would have", "had"],
        correct: 0,
        explanation: {
          en: "A real future consequence takes will + base verb.",
          ar: "تأخذ النتيجة المستقبلية الواقعية will مع المصدر.",
        },
      },
      {
        prompt: "What does the text recommend before new words?",
        options: ["A long exam", "Reviewing difficult words", "Avoiding sleep"],
        correct: 1,
        explanation: {
          en: "Review difficult words before learning new ones.",
          ar: "يوصي النص بمراجعة الكلمات الصعبة أولًا.",
        },
      },
    ],
  },
  {
    id: "b1-opinions",
    course: "b1",
    skill: "writing",
    title: {
      en: "Write a supported opinion",
      ar: "اكتب رأيًا مدعومًا",
    },
    goal: {
      en: "Build a paragraph with a reason and an example.",
      ar: "ابنِ فقرة تتضمن سببًا ومثالًا.",
    },
    minutes: 15,
    teaching: [
      {
        en: "A topic sentence states your opinion. Explain why it matters before adding an example.",
        ar: "توضح الجملة الرئيسية رأيك، ثم اشرح أهميته قبل إضافة المثال.",
      },
      {
        en: "Use because for a reason and for example for evidence. End by linking the example back to your opinion.",
        ar: "استخدم because للسبب وfor example للمثال، ثم اربط المثال برأيك.",
      },
    ],
    example:
      "I think walking to work is beneficial because it helps people exercise regularly. For example, a twenty-minute walk each morning can make a busy employee more active. This habit is therefore an easy way to improve health.",
    pronunciation: "Walking to work is a practical way to stay active.",
    pronunciationTip: {
      en: "Practise /w/ in walking with rounded lips, without /v/.",
      ar: "انطق /w/ في walking بشفتين مستديرتين دون تحويله إلى /v/.",
    },
    questions: [
      {
        prompt: "Which phrase introduces evidence?",
        options: ["For example", "Although", "In contrast"],
        correct: 0,
        explanation: {
          en: "For example introduces an illustration of a claim.",
          ar: "تقدم for example مثالًا يوضح الادعاء.",
        },
      },
      {
        prompt: "What is the paragraph mainly about?",
        options: ["Choosing offices", "The health value of walking", "Buying a car"],
        correct: 1,
        explanation: {
          en: "All supporting sentences concern walking and health.",
          ar: "تدعم كل الجمل فائدة المشي للصحة.",
        },
      },
    ],
    writing: {
      prompt:
        "Do you prefer studying alone or with others? Write an opinion paragraph with a reason and an example.",
      minimum: 80,
      model:
        "I prefer studying with other people because discussing a topic helps me understand it more deeply. For example, when I struggled with a grammar exercise last week, a classmate explained the rule using a simple example. I then explained a different question to her, which helped me remember it too. However, I still study alone when I need to concentrate on reading. For me, a small study group is useful as long as everyone stays focused on the work. We also agree on clear goals before each session.",
      checklist: [
        {
          en: "Clear opinion",
          ar: "رأي واضح",
        },
        {
          en: "A reason and a relevant example",
          ar: "سبب ومثال مناسب",
        },
        {
          en: "A concluding link to your opinion",
          ar: "خاتمة تربط الأفكار بالرأي",
        },
      ],
    },
  },
  {
    id: "b2-hypotheticals",
    course: "b2",
    skill: "grammar",
    title: {
      en: "Hypothetical choices",
      ar: "الخيارات الافتراضية",
    },
    goal: {
      en: "Use second and third conditionals accurately.",
      ar: "استخدم الشرطيتين الثانية والثالثة بدقة.",
    },
    minutes: 15,
    teaching: [
      {
        en: "Second conditional: if + past simple, would + base verb. It describes an imagined present or future, not a finished past event.",
        ar: "الشرطية الثانية: if مع الماضي البسيط ثم would مع المصدر، وتصف حاضرًا أو مستقبلًا متخيلًا.",
      },
      {
        en: "Third conditional: if + past perfect, would have + past participle. It imagines a different result for a past event.",
        ar: "الشرطية الثالثة: if مع الماضي التام ثم would have مع التصريف الثالث، وتصور نتيجة مختلفة لحدث ماضٍ.",
      },
    ],
    example:
      "If I lived nearer the office, I would cycle to work. Yesterday I missed the train. If I had left earlier, I would have caught it.",
    pronunciation: "If I had left earlier, I would have caught the train.",
    pronunciationTip: {
      en: "Link would have naturally, but keep caught and train stressed.",
      ar: "اربط would have بشكل طبيعي وانبر caught وtrain.",
    },
    questions: [
      {
        prompt: "If I had known, I ___ helped.",
        options: ["will have", "would have", "would"],
        correct: 1,
        explanation: {
          en: "A past hypothetical result uses would have + participle.",
          ar: "نتيجة افتراضية ماضية تستخدم would have مع التصريف الثالث.",
        },
      },
      {
        prompt: "If I had more time, I would travel. This imagines:",
        options: ["A present or future situation", "A completed trip", "A certain plan"],
        correct: 0,
        explanation: {
          en: "Second conditional imagines an unreal or unlikely present/future.",
          ar: "تصور الشرطية الثانية حاضرًا أو مستقبلًا غير واقعي أو غير مرجح.",
        },
      },
    ],
  },
  {
    id: "b2-evidence",
    course: "b2",
    skill: "reading",
    title: {
      en: "Evaluate claims and evidence",
      ar: "قيّم الادعاءات والأدلة",
    },
    goal: {
      en: "Separate claims, evidence and limitations.",
      ar: "افصل بين الادعاءات والأدلة والقيود.",
    },
    minutes: 15,
    teaching: [
      {
        en: "A claim states what the writer believes. Evidence supports it with observations or data. Words like suggests show caution, not certainty.",
        ar: "الادعاء رأي الكاتب، والدليل يدعمه ببيانات أو ملاحظات. تعبر suggests عن الحذر لا اليقين.",
      },
      {
        en: "Check sample size, context and alternative explanations. Correlation alone does not prove that one thing causes another.",
        ar: "افحص حجم العينة والسياق والتفسيرات البديلة. الارتباط وحده لا يثبت السببية.",
      },
    ],
    example:
      "A survey of 80 employees found that people working from home reported higher satisfaction. The authors suggest that flexible hours may help. However, participants volunteered, and the study did not measure productivity. The results do not prove that remote work improves output.",
    pronunciation: "The findings suggest a benefit, but they do not establish a cause.",
    pronunciationTip: {
      en: "Stress suggest and do not to signal the writer’s caution.",
      ar: "انبر suggest وdo not لإظهار تحفظ الكاتب.",
    },
    questions: [
      {
        prompt: "What was NOT measured?",
        options: ["Satisfaction", "Productivity", "Number of employees"],
        correct: 1,
        explanation: {
          en: "The text explicitly says productivity was not measured.",
          ar: "يصرح النص بأن الإنتاجية لم تُقَس.",
        },
      },
      {
        prompt: "Why should the conclusion be cautious?",
        options: [
          "The sample was voluntary",
          "All employees were included",
          "Causation was proven",
        ],
        correct: 0,
        explanation: {
          en: "Voluntary participation can bias the sample; causation is unproven.",
          ar: "قد تسبب المشاركة الطوعية تحيزًا، ولم تُثبت السببية.",
        },
      },
    ],
  },
  {
    id: "b2-arguments",
    course: "b2",
    skill: "writing",
    title: {
      en: "Build a balanced argument",
      ar: "ابنِ حجة متوازنة",
    },
    goal: {
      en: "Develop both sides without losing your position.",
      ar: "ناقش الجانبين مع الحفاظ على موقفك.",
    },
    minutes: 15,
    teaching: [
      {
        en: "Acknowledge a counterargument fairly. Then explain why your own position is stronger in a particular context.",
        ar: "اعرض الحجة المقابلة بإنصاف ثم اشرح لماذا موقفك أقوى في سياق محدد.",
      },
      {
        en: "Use although for concession and however between contrasting sentences. Avoid listing advantages without explaining their consequences.",
        ar: "استخدم although للتنازل وhowever بين جملتين متعارضتين. اشرح نتائج المزايا بدل سردها فقط.",
      },
    ],
    example:
      "Although online courses offer flexibility, some learners need direct support. Recorded lectures are convenient for employees; however, regular feedback remains essential. A blended approach can combine flexible access with opportunities to ask questions.",
    pronunciation: "Although online courses are flexible, regular feedback remains essential.",
    pronunciationTip: {
      en: "Pause briefly at the clause boundary; avoid pausing after every word.",
      ar: "توقف قليلًا بين الجزأين لا بعد كل كلمة.",
    },
    questions: [
      {
        prompt: "Which word introduces a concession?",
        options: ["Therefore", "Although", "Similarly"],
        correct: 1,
        explanation: {
          en: "Although admits an opposing point before the main claim.",
          ar: "تعترف although بنقطة مقابلة قبل الادعاء الرئيسي.",
        },
      },
      {
        prompt: "What solution does the text propose?",
        options: ["Only recorded lectures", "No teacher feedback", "A blended approach"],
        correct: 2,
        explanation: {
          en: "The final sentence combines flexible access with interaction.",
          ar: "تجمع الجملة الأخيرة المرونة والتفاعل.",
        },
      },
    ],
    writing: {
      prompt:
        "Should companies allow employees to work from home? Write a balanced argument with your own conclusion.",
      minimum: 120,
      model:
        "Working from home can be valuable, particularly for employees who spend hours commuting. The time saved may allow them to rest properly and focus more effectively. However, remote work also makes informal communication harder. A new employee, for instance, may struggle to ask small questions that would be easy to discuss in an office. In my view, companies should offer remote work where the role permits it, while arranging regular meetings and clear support for new staff. This is more practical than applying one rule to every job. A flexible policy can preserve the benefits of independence without treating collaboration as an afterthought. Its success ultimately depends on the quality of management rather than the location alone. Managers should review the arrangement regularly with their teams.",
      checklist: [
        {
          en: "A developed counterargument",
          ar: "حجة مقابلة مطورة",
        },
        {
          en: "Examples and consequences",
          ar: "أمثلة ونتائج",
        },
        {
          en: "A consistent conclusion",
          ar: "خاتمة متسقة",
        },
      ],
    },
  },
  {
    id: "c1-emphasis",
    course: "c1",
    skill: "grammar",
    title: {
      en: "Emphasis and inversion",
      ar: "التوكيد وقلب ترتيب الجملة",
    },
    goal: {
      en: "Use inversion after restrictive negative adverbials.",
      ar: "استخدم القلب بعد ظروف النفي والتقييد.",
    },
    minutes: 15,
    teaching: [
      {
        en: "When a negative adverbial begins a clause, invert auxiliary and subject: Rarely have I seen such commitment.",
        ar: "إذا بدأت الجملة بظرف نفي نقدم الفعل المساعد على الفاعل: Rarely have I seen such commitment.",
      },
      {
        en: "Only after ... takes inversion in the main clause: Only after reviewing the data did we understand the problem. Use this formal pattern selectively.",
        ar: "بعد Only after يحدث القلب في الجملة الرئيسية: Only after reviewing the data did we understand the problem. استخدم الصيغة الرسمية باعتدال.",
      },
    ],
    example:
      "Rarely has a policy attracted such broad support. Only after the council published its evidence did residents understand the proposal. Not only did it reduce costs, but it also improved access.",
    pronunciation: "Only after reviewing the evidence did we understand the problem.",
    pronunciationTip: {
      en: "Stress only and evidence; maintain a smooth rhythm through the auxiliary.",
      ar: "انبر only وevidence وحافظ على الإيقاع عبر الفعل المساعد.",
    },
    questions: [
      {
        prompt: "Rarely ___ such an opportunity.",
        options: ["we have seen", "have we seen", "we seen have"],
        correct: 1,
        explanation: {
          en: "Fronted rarely triggers auxiliary–subject inversion.",
          ar: "تتطلب rarely في البداية قلب ترتيب الفعل المساعد والفاعل.",
        },
      },
      {
        prompt: "Only after the meeting ___ the decision.",
        options: ["did we understand", "we did understood", "understood we did"],
        correct: 0,
        explanation: {
          en: "Invert in the main clause; did takes the base verb.",
          ar: "نقلب الترتيب في الجملة الرئيسية ونستخدم المصدر بعد did.",
        },
      },
    ],
  },
  {
    id: "c1-stance",
    course: "c1",
    skill: "reading",
    title: {
      en: "Recognise implicit stance",
      ar: "تعرّف على الموقف الضمني",
    },
    goal: {
      en: "Infer attitude from wording without inventing facts.",
      ar: "استنتج الموقف من اللغة دون اختلاق حقائق.",
    },
    minutes: 15,
    teaching: [
      {
        en: "Hedging such as may, arguably and appears to limits a claim. Evaluative words reveal attitude even without I think.",
        ar: "تحد عبارات may وarguably وappears to من قوة الادعاء. تكشف الكلمات التقييمية موقف الكاتب دون I think.",
      },
      {
        en: "Separate a defensible inference from unsupported speculation. Quote the wording that supports your interpretation.",
        ar: "ميّز الاستنتاج المدعوم عن التخمين، واستشهد باللغة التي تدعم تفسيرك.",
      },
    ],
    example:
      "The proposal is undeniably ambitious. Whether it is workable is another matter. Its supporters cite projected savings, yet the assumptions behind those figures remain curiously unexplained. A trial would appear more prudent than immediate implementation.",
    pronunciation: "A trial would appear more prudent than immediate implementation.",
    pronunciationTip: {
      en: "Make the contrast audible by stressing trial and immediate implementation.",
      ar: "أظهر المقارنة بالنبر على trial وimmediate implementation.",
    },
    questions: [
      {
        prompt: "The writer’s attitude is best described as:",
        options: ["Uncritical enthusiasm", "Cautious scepticism", "Complete indifference"],
        correct: 1,
        explanation: {
          en: "Unexplained assumptions and preference for a trial signal scepticism.",
          ar: "تشير الافتراضات غير الموضحة وتفضيل التجربة إلى شك متحفظ.",
        },
      },
      {
        prompt: "Which statement is supported?",
        options: [
          "The proposal will certainly fail",
          "The writer prefers a trial",
          "Savings have already occurred",
        ],
        correct: 1,
        explanation: {
          en: "The final sentence explicitly favours a trial; failure is not asserted.",
          ar: "تفضل الجملة الأخيرة التجربة ولا تؤكد الفشل.",
        },
      },
    ],
  },
  {
    id: "c1-synthesis",
    course: "c1",
    skill: "writing",
    title: {
      en: "Synthesise sources",
      ar: "ادمج المصادر",
    },
    goal: {
      en: "Integrate contrasting evidence in an academic paragraph.",
      ar: "ادمج أدلة متعارضة في فقرة أكاديمية.",
    },
    minutes: 15,
    teaching: [
      {
        en: "Synthesis groups sources by an idea, rather than summarising each separately. Attribute claims and compare their scope.",
        ar: "ينظم الدمج المصادر حسب الفكرة بدل تلخيص كل مصدر منفصلًا. انسب الادعاءات وقارن نطاقها.",
      },
      {
        en: "Identify where findings agree and where methods differ. Use cautious conclusions when the evidence is limited.",
        ar: "حدد مواضع الاتفاق واختلاف المنهج، واستخدم استنتاجات حذرة عند محدودية الأدلة.",
      },
    ],
    example:
      "Study A: 200 adults reported improved sleep after reducing evening screen time.\nStudy B: 40 teenagers showed no measurable improvement over one week.\nThese findings may differ because the samples and observation periods are not equivalent.",
    pronunciation: "The studies differ in scope, so their findings are not directly comparable.",
    pronunciationTip: {
      en: "In comparable, stress the first syllable; keep the ending unstressed.",
      ar: "انبر المقطع الأول في comparable وخفف النهاية.",
    },
    questions: [
      {
        prompt: "What limits a direct comparison?",
        options: [
          "Different samples and timeframes",
          "Both used identical methods",
          "Neither concerns sleep",
        ],
        correct: 0,
        explanation: {
          en: "Age groups, sample sizes and periods differ.",
          ar: "تختلف الأعمار وأحجام العينات والفترات.",
        },
      },
      {
        prompt: "Choose the appropriately cautious conclusion.",
        options: [
          "Screens always prevent sleep",
          "The findings may depend on study design",
          "Both studies prove the same result",
        ],
        correct: 1,
        explanation: {
          en: "May recognises uncertainty and differing designs.",
          ar: "تعترف may بعدم اليقين واختلاف التصميم.",
        },
      },
    ],
    writing: {
      prompt:
        "Write a synthesis paragraph using the two studies above. Compare the findings and explain a limitation.",
      minimum: 120,
      model:
        "The two studies provide different indications of the relationship between evening screen use and sleep. While Study A found reported improvements among 200 adults, Study B detected no measurable change in 40 teenagers over a week. This contrast should not be interpreted as a straightforward contradiction. The populations differ in age, the samples differ in size, and self-reported improvement is not necessarily equivalent to a measured change. Moreover, a week may be insufficient to reveal a stable effect. Together, the findings suggest that any relationship should be examined with attention to both measurement and context. Longer studies using comparable measures would be needed before recommending a single policy for all age groups. Neither result, by itself, establishes a universal causal relationship.",
      checklist: [
        {
          en: "Both sources attributed accurately",
          ar: "نسبة كلا المصدرين بدقة",
        },
        {
          en: "Comparison organised by idea",
          ar: "مقارنة منظمة حسب الفكرة",
        },
        {
          en: "A cautious, evidence-based conclusion",
          ar: "استنتاج حذر قائم على الأدلة",
        },
      ],
    },
  },
  {
    id: "c2-precision",
    course: "c2",
    skill: "grammar",
    title: {
      en: "Precision and register",
      ar: "الدقة ومستوى اللغة",
    },
    goal: {
      en: "Choose language that matches intent and audience.",
      ar: "اختر لغة تلائم القصد والجمهور.",
    },
    minutes: 15,
    teaching: [
      {
        en: "Register includes vocabulary, grammar and tone. A diplomatic request can be precise without being abrupt: We would appreciate clarification of ...",
        ar: "يشمل مستوى اللغة المفردات والقواعد والنبرة. يمكن أن يكون الطلب الدبلوماسي دقيقًا دون فظاظة: We would appreciate clarification of ...",
      },
      {
        en: "Near-synonyms differ in meaning: concede admits a point reluctantly; acknowledge recognises it. Choose the word that reflects the intended stance.",
        ar: "تختلف الكلمات المتقاربة: concede اعتراف قد يكون على مضض وacknowledge إقرار. اختر ما يعكس موقفك.",
      },
    ],
    example:
      "Informal: Your figures do not add up.\nFormal: We would appreciate clarification of the assumptions underlying these figures.\nBoth identify a concern; the second preserves a collaborative tone without claiming fraud.",
    pronunciation: "We would appreciate clarification of the underlying assumptions.",
    pronunciationTip: {
      en: "Use deliberate phrasing in chunks; do not confuse long words with effective communication.",
      ar: "انطق في مجموعات معنوية؛ طول الكلمات لا يضمن جودة التواصل.",
    },
    questions: [
      {
        prompt: "Which preserves a diplomatic tone?",
        options: [
          "Your figures are nonsense",
          "We would appreciate clarification",
          "You clearly lied",
        ],
        correct: 1,
        explanation: {
          en: "The request asks for clarification without an unsupported accusation.",
          ar: "يطلب التوضيح دون اتهام غير مدعوم.",
        },
      },
      {
        prompt: "Concede most nearly means:",
        options: ["Reluctantly admit a point", "Ignore all evidence", "Invent a reason"],
        correct: 0,
        explanation: {
          en: "Concede commonly implies yielding a point, often reluctantly.",
          ar: "تشير concede غالبًا إلى التسليم بنقطة وقد يكون على مضض.",
        },
      },
    ],
  },
  {
    id: "c2-rhetoric",
    course: "c2",
    skill: "reading",
    title: {
      en: "Read rhetoric critically",
      ar: "اقرأ البلاغة بنقد",
    },
    goal: {
      en: "Identify irony, framing and unsupported generalisations.",
      ar: "حدد السخرية والتأطير والتعميمات غير المدعومة.",
    },
    minutes: 15,
    teaching: [
      {
        en: "Irony creates distance between literal wording and intended meaning. Interpret it from context, not a single unusual word.",
        ar: "تخلق السخرية مسافة بين المعنى الحرفي والمقصود؛ استنتجها من السياق لا من كلمة واحدة.",
      },
      {
        en: "A rhetorical question may challenge an assumption rather than request information. Analyse what the writer includes and what is left unproven.",
        ar: "قد يتحدى السؤال البلاغي افتراضًا بدل طلب معلومة. حلل ما يذكره الكاتب وما لم يُثبت.",
      },
    ],
    example:
      "Another effortless solution, apparently: replace every teacher with a screen. Who could possibly need human encouragement? The proposal mistakes access to information for education, while leaving the question of support conveniently unanswered.",
    pronunciation: "The proposal mistakes access to information for education.",
    pronunciationTip: {
      en: "Use intonation to signal stance without exaggerating every phrase.",
      ar: "استخدم التنغيم لإظهار الموقف دون مبالغة في كل عبارة.",
    },
    questions: [
      {
        prompt: "Effortless solution is used:",
        options: ["As sincere praise", "Ironically", "As a numerical result"],
        correct: 1,
        explanation: {
          en: "The questions and criticism undermine the apparent praise.",
          ar: "تنقض الأسئلة والنقد المدح الظاهري.",
        },
      },
      {
        prompt: "Which assumption is challenged?",
        options: [
          "Information access equals education",
          "Teachers never use technology",
          "Screens are always expensive",
        ],
        correct: 0,
        explanation: {
          en: "The writer explicitly distinguishes information from education.",
          ar: "يميز الكاتب صراحة بين المعلومات والتعليم.",
        },
      },
    ],
  },
  {
    id: "c2-persuasion",
    course: "c2",
    skill: "writing",
    title: {
      en: "Persuasion with nuance",
      ar: "الإقناع مع مراعاة الفروق",
    },
    goal: {
      en: "Write a persuasive response that anticipates objections.",
      ar: "اكتب ردًا مقنعًا يتوقع الاعتراضات.",
    },
    minutes: 15,
    teaching: [
      {
        en: "A nuanced argument defines its scope, handles exceptions and evaluates trade-offs. Avoid absolute claims when evidence is conditional.",
        ar: "تحدد الحجة الدقيقة نطاقها وتعالج الاستثناءات والمفاضلات. تجنب المطلقات حين تكون الأدلة مشروطة.",
      },
      {
        en: "Vary sentence structure for a purpose, not decoration. Conclude with a feasible recommendation and explain its limits.",
        ar: "نوّع الجمل لغرض لا للزخرفة. اختم بتوصية قابلة للتطبيق وحدودها.",
      },
    ],
    example:
      "Rather than banning private cars outright, the city should phase restrictions in where public transport offers a credible alternative. Exemptions for disabled residents and essential services are not loopholes; they are conditions of a defensible policy.",
    pronunciation: "Exemptions are not loopholes; they are conditions of a defensible policy.",
    pronunciationTip: {
      en: "Contrast not loopholes with conditions using stress and a short pause.",
      ar: "أظهر التباين بالنبر والوقفة القصيرة بين not loopholes وconditions.",
    },
    questions: [
      {
        prompt: "What makes the policy conditional?",
        options: [
          "Restrictions depend on credible transport alternatives",
          "All cars disappear immediately",
          "There are no exemptions",
        ],
        correct: 0,
        explanation: {
          en: "The recommendation is limited to places with credible alternatives.",
          ar: "تقتصر التوصية على الأماكن ذات البدائل الموثوقة.",
        },
      },
      {
        prompt: "The writer presents exemptions as:",
        options: [
          "Necessary for a defensible policy",
          "Evidence that policy is pointless",
          "A way to avoid any change",
        ],
        correct: 0,
        explanation: {
          en: "The final sentence explicitly calls exemptions conditions of a defensible policy.",
          ar: "تصف الجملة الأخيرة الاستثناءات بأنها شروط لسياسة قابلة للدفاع.",
        },
      },
    ],
    writing: {
      prompt:
        "Write a persuasive recommendation to a city council about restricting private cars. Address feasibility and a serious objection.",
      minimum: 150,
      model:
        "The council should restrict private cars in the city centre, but only as part of a transport policy that residents can realistically use. A blanket ban introduced before reliable alternatives exist would shift the burden onto people least able to change their journeys. The strongest objection is therefore not a defence of congestion; it is a concern about access. This can be addressed through improved evening services, affordable fares and clearly defined exemptions for disabled residents and essential deliveries. Restrictions should begin on a small number of well-served streets, with published measures of travel time, air quality and business activity. If the trial merely displaces congestion into neighbouring areas, its design should be revised rather than celebrated. Such a phased approach would preserve the environmental aim while treating practical objections as information. Success should mean a more accessible city, not simply fewer cars counted within an arbitrary boundary. Residents should have a meaningful opportunity to review the evidence before restrictions are expanded.",
      checklist: [
        {
          en: "Defined scope and feasible recommendation",
          ar: "نطاق محدد وتوصية قابلة للتطبيق",
        },
        {
          en: "A serious objection answered fairly",
          ar: "معالجة اعتراض جاد بإنصاف",
        },
        {
          en: "Precise tone and purposeful structure",
          ar: "نبرة دقيقة وبنية هادفة",
        },
      ],
    },
  },
];
