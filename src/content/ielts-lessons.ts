import type { Lesson } from "./lesson-types";

export const IELTS_LESSONS: Lesson[] = [
  {
    id: "ielts-listening-details",
    course: "ielts",
    skill: "listening",
    title: {
      en: "Listening: details and distractors",
      ar: "الاستماع: التفاصيل والمشتتات",
    },
    goal: {
      en: "Predict what each answer needs: a date, time, price or location. Listen for corrections, not just the first number you hear.",
      ar: "توقع نوع الإجابة: تاريخ أو وقت أو سعر أو مكان. استمع للتصحيح لا لأول رقم تسمعه.",
    },
    minutes: 20,
    teaching: [
      {
        en: "Predict what each answer needs: a date, time, price or location. Listen for corrections, not just the first number you hear.",
        ar: "توقع نوع الإجابة: تاريخ أو وقت أو سعر أو مكان. استمع للتصحيح لا لأول رقم تسمعه.",
      },
      {
        en: "In the full exam, recordings play once. Use this shorter practice to study distractors. In completion tasks, follow the word limit exactly; spelling matters.",
        ar: "تُشغَّل التسجيلات مرة واحدة في الاختبار الكامل. هذا تدريب قصير على المشتتات. التزم بعدد الكلمات والإملاء في أسئلة الإكمال.",
      },
      {
        en: "For a Band 7 target, practise accurate detail tracking and recovery after a missed answer. Do not stop listening while worrying about a previous item.",
        ar: "للهدف 7 تدرّب على تتبع التفاصيل ومتابعة الاستماع بعد سؤال فاتك بدل التوقف عنده.",
      },
    ],
    example:
      "Good morning. Here are the details of the Riverside community centre's new courses. The photography course will begin on the fourteenth of May, not the seventh as we originally planned. Classes take place on Wednesday evenings at six thirty. The fee is eighty pounds for the entire course, and this includes the use of a camera. Please bring a notebook. We used to meet in the library, but the course has moved to Room twelve on the first floor. To register, contact Helen at reception. The final session will be a visit to the botanical gardens, provided the weather is suitable. If it rains, we will practise indoors instead.",
    pronunciation: "I can explain my view and support it with a clear example.",
    pronunciationTip: {
      en: "Use thought groups, clear word stress and natural pauses. Recognition is not an IELTS pronunciation mark.",
      ar: "استخدم مجموعات معنوية ونبرًا واضحًا ووقفات طبيعية. التعرف على الكلام ليس درجة نطق في الآيلتس.",
    },
    questions: [
      {
        prompt: "When will the course begin?",
        options: ["7 May", "14 May", "30 May"],
        correct: 1,
        explanation: {
          en: "The speaker corrects the original 7 May date to 14 May.",
          ar: "يصَحح المتحدث الموعد من 7 مايو إلى 14 مايو.",
        },
      },
      {
        prompt: "What time are classes?",
        options: ["6:00 pm", "6:30 pm", "7:30 pm"],
        correct: 1,
        explanation: {
          en: "Six thirty means 6:30; Wednesday identifies the day.",
          ar: "six thirty تعني 6:30 ويحدد Wednesday اليوم.",
        },
      },
      {
        prompt: "What does the fee include?",
        options: ["A notebook", "Transport", "Use of a camera"],
        correct: 2,
        explanation: {
          en: "Camera use is included; learners must bring a notebook.",
          ar: "يتضمن السعر استخدام كاميرا، بينما يجب إحضار دفتر.",
        },
      },
      {
        prompt: "Where is the course now held?",
        options: ["The library", "Room 12", "The gardens"],
        correct: 1,
        explanation: {
          en: "Used to signals the old location; the new location is Room twelve.",
          ar: "تشير used to للمكان السابق، والمكان الجديد Room twelve.",
        },
      },
      {
        prompt: "What determines the final activity?",
        options: ["The weather", "The number of cameras", "Helen’s schedule"],
        correct: 0,
        explanation: {
          en: "The garden visit depends on suitable weather; rain means indoor practice.",
          ar: "تعتمد زيارة الحدائق على الطقس، والمطر يعني التدريب داخل المبنى.",
        },
      },
    ],
  },
  {
    id: "ielts-listening-lecture",
    course: "ielts",
    skill: "listening",
    title: {
      en: "Listening: an academic lecture",
      ar: "الاستماع: محاضرة أكاديمية",
    },
    goal: {
      en: "Follow signposts such as however, the most surprising result and future research. They reveal how the lecture is organised.",
      ar: "تابع عبارات التنظيم مثل however وthe most surprising result وfuture research لفهم بناء المحاضرة.",
    },
    minutes: 20,
    teaching: [
      {
        en: "Follow signposts such as however, the most surprising result and future research. They reveal how the lecture is organised.",
        ar: "تابع عبارات التنظيم مثل however وthe most surprising result وfuture research لفهم بناء المحاضرة.",
      },
      {
        en: "Distinguish a finding from a limitation and a recommendation. A statistic without its context may lead to the wrong answer.",
        ar: "ميّز بين النتيجة والقيد والتوصية؛ قد يقود الرقم دون سياقه إلى إجابة خاطئة.",
      },
      {
        en: "Review the transcript only after answering. Note paraphrases such as maintaining/care and caution/not every city.",
        ar: "راجع النص بعد الإجابة وسجل إعادة الصياغة مثل maintaining/care والتحفظ بشأن التعميم.",
      },
    ],
    example:
      "Today we will consider the role of urban trees. Trees provide shade, which can reduce temperatures on streets during summer. However, their cooling effect depends on the size of the canopy and the availability of water. A study compared two neighbourhoods with similar building density. The neighbourhood with mature trees was two degrees cooler in the afternoon. The researchers cautioned that the study lasted only one summer, so the findings should not be applied to every city. The most surprising result concerned maintenance. Young trees needed regular watering for the first three years. The council initially planned to plant five hundred trees, but reduced the number to three hundred in order to fund their care. The lecturer argues that maintaining existing trees is just as important as planting new ones. Future research will examine whether residents in rented homes have equal access to green space.",
    pronunciation: "I can explain my view and support it with a clear example.",
    pronunciationTip: {
      en: "Use thought groups, clear word stress and natural pauses. Recognition is not an IELTS pronunciation mark.",
      ar: "استخدم مجموعات معنوية ونبرًا واضحًا ووقفات طبيعية. التعرف على الكلام ليس درجة نطق في الآيلتس.",
    },
    questions: [
      {
        prompt: "How much cooler was the tree-covered neighbourhood?",
        options: ["One degree", "Two degrees", "Three degrees"],
        correct: 1,
        explanation: {
          en: "Two degrees refers to the measured afternoon difference.",
          ar: "درجتان هما الفرق المقاس بعد الظهر.",
        },
      },
      {
        prompt: "What limits the findings?",
        options: [
          "Only one summer was studied",
          "No neighbourhoods were compared",
          "All trees were young",
        ],
        correct: 0,
        explanation: {
          en: "The researchers caution that one summer is not enough to generalise to every city.",
          ar: "يحذر الباحثون من التعميم اعتمادًا على صيف واحد.",
        },
      },
      {
        prompt: "Why was the planting target reduced?",
        options: ["To fund tree care", "To build houses", "To remove existing trees"],
        correct: 0,
        explanation: {
          en: "The number was reduced from 500 to 300 to pay for maintenance.",
          ar: "خُفض العدد من 500 إلى 300 لتمويل الرعاية.",
        },
      },
      {
        prompt: "How long did young trees need regular watering?",
        options: ["One month", "Three years", "Five years"],
        correct: 1,
        explanation: {
          en: "The first three years concern watering, not the study duration.",
          ar: "تتعلق السنوات الثلاث بالري لا بمدة الدراسة.",
        },
      },
      {
        prompt: "What will future research examine?",
        options: ["Camera equipment", "Access to green space for renters", "Winter road repairs"],
        correct: 1,
        explanation: {
          en: "The final sentence identifies renters’ access to green space.",
          ar: "تحدد الجملة الأخيرة وصول المستأجرين إلى المساحات الخضراء.",
        },
      },
    ],
  },
  {
    id: "ielts-reading-academic",
    course: "ielts",
    skill: "reading",
    title: {
      en: "Academic Reading: evidence and headings",
      ar: "القراءة الأكاديمية: الأدلة والعناوين",
    },
    goal: {
      en: "Skim to locate the main idea, then scan for evidence. For True/False/Not Given, use only what the passage states.",
      ar: "اقرأ سريعًا للفكرة ثم ابحث عن الدليل. استخدم النص فقط في True/False/Not Given.",
    },
    minutes: 20,
    teaching: [
      {
        en: "Skim to locate the main idea, then scan for evidence. For True/False/Not Given, use only what the passage states.",
        ar: "اقرأ سريعًا للفكرة ثم ابحث عن الدليل. استخدم النص فقط في True/False/Not Given.",
      },
      {
        en: "True agrees with the passage; False contradicts it; Not Given means the evidence is missing. Do not use outside knowledge.",
        ar: "True يوافق النص وFalse يناقضه وNot Given يعني غياب الدليل. لا تستخدم المعرفة الخارجية.",
      },
      {
        en: "For headings, match the paragraph’s central purpose, not one repeated word. The full Reading test has 40 questions in 60 minutes with no extra transfer time.",
        ar: "طابق العنوان مع غرض الفقرة الرئيسي لا كلمة متكررة. الاختبار الكامل 40 سؤالًا في 60 دقيقة دون وقت نقل إضافي.",
      },
    ],
    example:
      "A. Libraries are changing their role. Alongside printed books, many now provide study spaces, digital resources and workshops. This expansion reflects demand for access to both information and shared facilities.\n\nB. In a pilot study, two libraries extended their evening opening hours for six months. Visits rose by 18%, with the largest increase among employed adults. The study did not collect data on visitors’ income.\n\nC. Longer opening hours require staff and energy. The researchers therefore recommend testing demand locally before expansion. They do not claim that every library would benefit equally.",
    pronunciation: "I can explain my view and support it with a clear example.",
    pronunciationTip: {
      en: "Use thought groups, clear word stress and natural pauses. Recognition is not an IELTS pronunciation mark.",
      ar: "استخدم مجموعات معنوية ونبرًا واضحًا ووقفات طبيعية. التعرف على الكلام ليس درجة نطق في الآيلتس.",
    },
    questions: [
      {
        prompt: "The pilot lasted six months.",
        options: ["True", "False", "Not Given"],
        correct: 0,
        explanation: {
          en: "Paragraph B explicitly gives six months.",
          ar: "تذكر الفقرة B ستة أشهر صراحة.",
        },
      },
      {
        prompt: "Visits increased by 80%.",
        options: ["True", "False", "Not Given"],
        correct: 1,
        explanation: {
          en: "The passage gives 18%, which contradicts 80%.",
          ar: "يذكر النص 18% وهذا يناقض 80%.",
        },
      },
      {
        prompt: "Most visitors earned a high income.",
        options: ["True", "False", "Not Given"],
        correct: 2,
        explanation: {
          en: "Income was not collected; the claim cannot be confirmed or contradicted.",
          ar: "لم تُجمع بيانات الدخل فلا يمكن إثبات الادعاء أو نفيه.",
        },
      },
      {
        prompt: "Best heading for paragraph A?",
        options: [
          "The expanding role of libraries",
          "The cost of night staff",
          "A fall in printed book sales",
        ],
        correct: 0,
        explanation: {
          en: "The paragraph centres on expanding services; sales are not mentioned.",
          ar: "تتمحور الفقرة حول توسيع الخدمات ولا تذكر المبيعات.",
        },
      },
      {
        prompt: "What do researchers recommend?",
        options: [
          "Extending all libraries immediately",
          "Testing local demand",
          "Closing printed-book sections",
        ],
        correct: 1,
        explanation: {
          en: "Paragraph C recommends local testing rather than universal expansion.",
          ar: "توصي الفقرة C باختبار الطلب المحلي لا التوسع الشامل.",
        },
      },
    ],
  },
  {
    id: "ielts-reading-general",
    course: "ielts",
    skill: "reading",
    title: {
      en: "General Training Reading: notices and policies",
      ar: "قراءة التدريب العام: الإعلانات والسياسات",
    },
    goal: {
      en: "Locate practical information: eligibility, deadlines, exceptions and conditions. Distinguish must from may and normally from always.",
      ar: "حدد الأهلية والمواعيد والاستثناءات والشروط. ميّز must عن may وnormally عن always.",
    },
    minutes: 20,
    teaching: [
      {
        en: "Locate practical information: eligibility, deadlines, exceptions and conditions. Distinguish must from may and normally from always.",
        ar: "حدد الأهلية والمواعيد والاستثناءات والشروط. ميّز must عن may وnormally عن always.",
      },
      {
        en: "Match the meaning of a rule rather than an identical word. A refund and a credit are different outcomes.",
        ar: "طابق معنى القاعدة لا الكلمة نفسها. استرداد المال يختلف عن رصيد بديل.",
      },
      {
        en: "General Training Reading includes everyday, workplace and longer general-interest texts. These mini exercises are not a full mock test or a band prediction.",
        ar: "تشمل قراءة التدريب العام نصوصًا يومية ومهنية وعامة أطول. هذه تدريبات قصيرة وليست اختبارًا كاملًا أو توقعًا للدرجة.",
      },
    ],
    example:
      "Workplace training policy\nEmployees may book one funded external course each year after completing their probation period. Applications must reach the training officer at least four weeks before the course starts. Approval depends on relevance to the employee’s role and available funding. If a provider cancels, fees are refunded. If an employee cancels fewer than seven days before the start, the fee is normally not recoverable. Staff must submit a short report within ten working days of finishing their course.",
    pronunciation: "I can explain my view and support it with a clear example.",
    pronunciationTip: {
      en: "Use thought groups, clear word stress and natural pauses. Recognition is not an IELTS pronunciation mark.",
      ar: "استخدم مجموعات معنوية ونبرًا واضحًا ووقفات طبيعية. التعرف على الكلام ليس درجة نطق في الآيلتس.",
    },
    questions: [
      {
        prompt: "Who can apply for funded training?",
        options: ["Only managers", "Staff who completed probation", "Any visitor"],
        correct: 1,
        explanation: {
          en: "Completion of probation is the stated eligibility condition.",
          ar: "إكمال فترة التجربة شرط الأهلية المذكور.",
        },
      },
      {
        prompt: "Applications must arrive at least:",
        options: [
          "Four weeks before the start",
          "Seven days after the start",
          "Ten working days before the end",
        ],
        correct: 0,
        explanation: {
          en: "Four weeks is the application deadline, not the cancellation period.",
          ar: "أربعة أسابيع موعد الطلب وليس مهلة الإلغاء.",
        },
      },
      {
        prompt: "Approval is guaranteed for every relevant course.",
        options: ["True", "False", "Not Given"],
        correct: 1,
        explanation: {
          en: "Funding availability is also required, so relevance alone does not guarantee approval.",
          ar: "توافر التمويل شرط آخر لذلك الملاءمة وحدها لا تضمن الموافقة.",
        },
      },
      {
        prompt: "If the provider cancels, what happens?",
        options: ["No recovery", "A refund", "An automatic promotion"],
        correct: 1,
        explanation: {
          en: "The policy explicitly refunds fees for provider cancellation.",
          ar: "تنص السياسة على رد الرسوم إذا ألغى مقدم الدورة.",
        },
      },
      {
        prompt: "When is the report due?",
        options: [
          "Ten working days after completion",
          "Before probation",
          "Four weeks before booking",
        ],
        correct: 0,
        explanation: {
          en: "The final sentence sets ten working days after finishing.",
          ar: "تحدد الجملة الأخيرة عشرة أيام عمل بعد الانتهاء.",
        },
      },
    ],
  },
  {
    id: "ielts-writing-chart",
    course: "ielts",
    skill: "writing",
    title: {
      en: "Academic Writing Task 1: overview and comparisons",
      ar: "الكتابة الأكاديمية 1: النظرة العامة والمقارنات",
    },
    goal: {
      en: "Select the major trends and give a clear overview. Report the data; do not invent causes or give your opinion.",
      ar: "اختر الاتجاهات الرئيسية وقدم نظرة عامة واضحة. صف البيانات دون اختلاق أسباب أو إبداء رأي.",
    },
    minutes: 20,
    teaching: [
      {
        en: "Select the major trends and give a clear overview. Report the data; do not invent causes or give your opinion.",
        ar: "اختر الاتجاهات الرئيسية وقدم نظرة عامة واضحة. صف البيانات دون اختلاق أسباب أو إبداء رأي.",
      },
      {
        en: "Group comparable figures and support key features with numbers. Avoid a mechanical list of every value.",
        ar: "اجمع الأرقام القابلة للمقارنة وادعم الملامح الأساسية بالقيم بدل سرد كل رقم آليًا.",
      },
      {
        en: "Write at least 150 words. Spend about 20 minutes of the 60-minute Writing test on Task 1. A Band 7 target requires a clear overview, accurate key features and logical organisation.",
        ar: "اكتب 150 كلمة على الأقل، وخصص نحو 20 دقيقة من 60. يتطلب هدف 7 نظرة عامة وملامح دقيقة وتنظيمًا منطقيًا.",
      },
    ],
    example:
      "Percentage of commuters using each transport mode in Brookfield\nMode          2010     2020\nCar           60%      45%\nBus           25%      30%\nBicycle       10%      20%\nWalking        5%       5%\nOriginal practice data; percentages total 100% in each year.",
    pronunciation: "I can explain my view and support it with a clear example.",
    pronunciationTip: {
      en: "Use thought groups, clear word stress and natural pauses. Recognition is not an IELTS pronunciation mark.",
      ar: "استخدم مجموعات معنوية ونبرًا واضحًا ووقفات طبيعية. التعرف على الكلام ليس درجة نطق في الآيلتس.",
    },
    questions: [
      {
        prompt: "Which is an accurate overview?",
        options: [
          "Cars remained dominant, while cycling and bus use rose",
          "Walking became most popular",
          "All modes increased",
        ],
        correct: 0,
        explanation: {
          en: "Cars still had the largest share; buses and bicycles grew, walking was unchanged.",
          ar: "بقيت السيارة الأكبر وارتفع الحافلة والدراجة وثبت المشي.",
        },
      },
      {
        prompt: "Car use fell by:",
        options: [
          "15 percentage points",
          "15 percent of its initial share",
          "45 percentage points",
        ],
        correct: 0,
        explanation: {
          en: "60% minus 45% is 15 percentage points; relative decline is 25%.",
          ar: "60 ناقص 45 يساوي 15 نقطة مئوية، والانخفاض النسبي 25%.",
        },
      },
    ],
    writing: {
      prompt:
        "Summarise the transport table above. Select and report the main features and make comparisons where relevant. Do not add unsupported explanations.",
      minimum: 150,
      model:
        "The table compares the proportions of commuters using four forms of transport in Brookfield in 2010 and 2020.\n\nOverall, cars remained the most widely used mode in both years, although their share declined substantially. Bus travel and cycling both became more common, while the proportion of people walking was unchanged.\n\nIn 2010, 60% of commuters travelled by car, compared with 25% who used buses. By 2020, the figure for cars had fallen to 45%, a decrease of 15 percentage points. Bus use, in contrast, rose by five percentage points to 30%. The gap between these two modes therefore narrowed considerably, from 35 to 15 percentage points.\n\nCycling recorded the largest proportional increase, doubling from 10% to 20%. Despite this growth, it remained less common than either car or bus travel at the end of the period. Walking accounted for just 5% in each year and was consistently the least popular option. Taken together, buses and bicycles represented half of all journeys in 2020, up from 35% a decade earlier.",
      checklist: [
        {
          en: "A clear overview of the main changes",
          ar: "نظرة عامة واضحة للتغيرات الرئيسية",
        },
        {
          en: "Accurate figures and grouped comparisons",
          ar: "قيم دقيقة ومقارنات مجمعة",
        },
        {
          en: "No invented causes or personal opinion",
          ar: "دون أسباب مختلقة أو رأي شخصي",
        },
        {
          en: "Logical paragraphs and accurate grammar",
          ar: "فقرات منطقية وقواعد دقيقة",
        },
      ],
    },
  },
  {
    id: "ielts-writing-letter",
    course: "ielts",
    skill: "writing",
    title: {
      en: "General Training Task 1: purpose and tone",
      ar: "التدريب العام 1: الغرض والنبرة",
    },
    goal: {
      en: "State the purpose early and cover all three bullet points. Match the tone to your relationship with the recipient.",
      ar: "اذكر الغرض مبكرًا وغطِّ النقاط الثلاث. اجعل النبرة مناسبة لعلاقتك بالمستلم.",
    },
    minutes: 20,
    teaching: [
      {
        en: "State the purpose early and cover all three bullet points. Match the tone to your relationship with the recipient.",
        ar: "اذكر الغرض مبكرًا وغطِّ النقاط الثلاث. اجعل النبرة مناسبة لعلاقتك بالمستلم.",
      },
      {
        en: "For a formal complaint, explain the problem, its effect and the action you request. Remain specific and courteous.",
        ar: "اشرح المشكلة وأثرها والإجراء المطلوب في الشكوى الرسمية، بدقة وأدب.",
      },
      {
        en: "Write at least 150 words, normally in about 20 minutes. A greeting alone does not establish tone; vocabulary and requests must be consistent.",
        ar: "اكتب 150 كلمة على الأقل في نحو 20 دقيقة. لا تكفي التحية لضبط النبرة؛ يجب اتساق المفردات والطلبات.",
      },
    ],
    example:
      "You rented a flat and the heating has stopped working. Write to the property manager.\n• Describe the problem.\n• Explain how it affects you.\n• Say what you would like the manager to do.",
    pronunciation: "I can explain my view and support it with a clear example.",
    pronunciationTip: {
      en: "Use thought groups, clear word stress and natural pauses. Recognition is not an IELTS pronunciation mark.",
      ar: "استخدم مجموعات معنوية ونبرًا واضحًا ووقفات طبيعية. التعرف على الكلام ليس درجة نطق في الآيلتس.",
    },
    questions: [
      {
        prompt: "Most suitable opening?",
        options: ["Hey mate, fix this!", "Dear Sir or Madam,", "To my best friend,"],
        correct: 1,
        explanation: {
          en: "A property manager you do not know calls for a formal greeting.",
          ar: "مدير عقار لا تعرفه يستلزم تحية رسمية.",
        },
      },
      {
        prompt: "Which request is specific and courteous?",
        options: [
          "Do something",
          "I would appreciate a repair appointment this week",
          "You are useless",
        ],
        correct: 1,
        explanation: {
          en: "The request identifies the action and timing without aggression.",
          ar: "يحدد الطلب الإجراء والوقت دون عدوانية.",
        },
      },
    ],
    writing: {
      prompt: "Write the formal letter described above, covering all three bullet points.",
      minimum: 150,
      model:
        "Dear Sir or Madam,\n\nI am writing about the heating system in the flat at 18 Green Street, which I rent through your agency. It stopped working on Monday evening, and neither the radiators nor the hot-water supply has functioned properly since then. I have checked the controls, but changing the settings has made no difference.\n\nThe problem is affecting our daily routine considerably. The rooms become very cold at night, and my young daughter has been unable to sleep comfortably. We have also had to heat water separately for washing, which is inconvenient and expensive.\n\nI would appreciate it if you could arrange for a qualified engineer to inspect and repair the system this week. I am available on Thursday afternoon or Friday morning, although I can make other arrangements if necessary. Please confirm an appointment and let me know whether any temporary heating can be provided in the meantime.\n\nThank you for your attention to this matter. I look forward to your reply.\n\nYours faithfully,\nSamira Ahmed",
      checklist: [
        {
          en: "All three bullet points developed",
          ar: "تطوير النقاط الثلاث",
        },
        {
          en: "Purpose stated clearly",
          ar: "غرض واضح",
        },
        {
          en: "Consistent formal tone",
          ar: "نبرة رسمية متسقة",
        },
        {
          en: "A specific requested action",
          ar: "إجراء مطلوب محدد",
        },
      ],
    },
  },
  {
    id: "ielts-writing-essay",
    course: "ielts",
    skill: "writing",
    title: {
      en: "Writing Task 2: develop a Band 7 argument",
      ar: "الكتابة 2: تطوير حجة لهدف 7",
    },
    goal: {
      en: "Answer every part of the question and keep your position clear throughout. Develop reasons with explanations and relevant examples.",
      ar: "أجب عن جميع أجزاء السؤال وحافظ على وضوح موقفك. طور الأسباب بالشرح والأمثلة المناسبة.",
    },
    minutes: 20,
    teaching: [
      {
        en: "Answer every part of the question and keep your position clear throughout. Develop reasons with explanations and relevant examples.",
        ar: "أجب عن جميع أجزاء السؤال وحافظ على وضوح موقفك. طور الأسباب بالشرح والأمثلة المناسبة.",
      },
      {
        en: "Organise paragraphs around ideas, not memorised linking phrases. Use less common vocabulary only when it fits naturally and accurately.",
        ar: "نظم الفقرات حول الأفكار لا عبارات ربط محفوظة. استخدم المفردات الأقل شيوعًا حين تكون طبيعية ودقيقة.",
      },
      {
        en: "Write at least 250 words, normally in about 40 minutes. Task 2 carries twice the weight of Task 1. A model is a learning example, not a guaranteed Band 7 script.",
        ar: "اكتب 250 كلمة على الأقل في نحو 40 دقيقة. وزن المهمة 2 ضعف المهمة 1. النموذج مثال تعليمي وليس ضمانًا للدرجة 7.",
      },
    ],
    example:
      "Some people believe cities should invest more in public transport than in new roads. To what extent do you agree or disagree?",
    pronunciation: "I can explain my view and support it with a clear example.",
    pronunciationTip: {
      en: "Use thought groups, clear word stress and natural pauses. Recognition is not an IELTS pronunciation mark.",
      ar: "استخدم مجموعات معنوية ونبرًا واضحًا ووقفات طبيعية. التعرف على الكلام ليس درجة نطق في الآيلتس.",
    },
    questions: [
      {
        prompt: "The task requires you to:",
        options: [
          "Describe a chart",
          "State and develop the extent of your agreement",
          "Write only about buses you have used",
        ],
        correct: 1,
        explanation: {
          en: "To what extent asks for a supported position, not an unrelated description.",
          ar: "تطلب to what extent موقفًا مدعومًا لا وصفًا غير متعلق.",
        },
      },
      {
        prompt: "What is the strongest development?",
        options: [
          "Transport is good. It is very good.",
          "Reliable buses can reduce commuting costs; for example, a frequent service lets workers avoid maintaining a car",
          "Everyone knows roads are bad",
        ],
        correct: 1,
        explanation: {
          en: "A specific consequence and relevant example develop the claim.",
          ar: "تطور نتيجة محددة ومثال مناسب الادعاء.",
        },
      },
    ],
    writing: {
      prompt:
        "Respond to the Task 2 question above. State your position, develop your main ideas and include relevant examples.",
      minimum: 250,
      model:
        "Cities face growing pressure to move people efficiently while limiting pollution. I largely agree that public transport should receive greater investment than new roads, although some road improvements remain necessary.\n\nThe strongest reason to prioritise public transport is that it can serve many people without requiring each traveller to own a vehicle. A reliable bus or rail service reduces the cost of getting to work, particularly for residents on modest incomes. For example, a frequent evening service can make jobs accessible to people who cannot afford a car. This is not merely an environmental benefit; it can widen access to employment and education. However, investment must improve frequency and connections, rather than simply produce impressive stations that are difficult to reach.\n\nPublic transport can also make better use of limited urban space. A bus carries far more passengers than a line of private cars occupying a similar stretch of road. If services are comfortable and dependable, some drivers may choose them, easing congestion for those who still need to drive. Building additional roads, by contrast, may encourage more car journeys and leave congestion unresolved in the longer term. The effectiveness of any scheme nevertheless depends on local travel patterns.\n\nThere are circumstances in which road spending is justified. Unsafe junctions, damaged surfaces and routes needed by emergency services should not be neglected. My argument is therefore about priorities, not the complete elimination of road investment.\n\nIn conclusion, cities should generally direct a larger share of their transport budgets towards reliable and accessible public services. Targeted road improvements should support that policy, rather than displace it. A balanced plan can improve mobility while avoiding the assumption that every transport problem requires another road.",
      checklist: [
        {
          en: "All parts answered; position consistent",
          ar: "إجابة جميع الأجزاء وموقف متسق",
        },
        {
          en: "Ideas explained and supported",
          ar: "أفكار مشروحة ومدعومة",
        },
        {
          en: "Logical paragraphs, not excessive linking",
          ar: "فقرات منطقية دون إفراط في الروابط",
        },
        {
          en: "Accurate vocabulary and varied grammar",
          ar: "مفردات دقيقة وقواعد متنوعة",
        },
      ],
    },
  },
  {
    id: "ielts-speaking-1",
    course: "ielts",
    skill: "speaking",
    title: {
      en: "Speaking Part 1: extend naturally",
      ar: "المحادثة 1: وسع الإجابة طبيعيًا",
    },
    goal: {
      en: "Answer directly, then add a reason or a brief example. Avoid memorised speeches for simple personal questions.",
      ar: "أجب مباشرة ثم أضف سببًا أو مثالًا قصيرًا. تجنب الخطب المحفوظة للأسئلة الشخصية البسيطة.",
    },
    minutes: 20,
    teaching: [
      {
        en: "Answer directly, then add a reason or a brief example. Avoid memorised speeches for simple personal questions.",
        ar: "أجب مباشرة ثم أضف سببًا أو مثالًا قصيرًا. تجنب الخطب المحفوظة للأسئلة الشخصية البسيطة.",
      },
      {
        en: "Part 1 lasts about 4–5 minutes. Keep answers relevant and use natural vocabulary rather than forcing idioms.",
        ar: "يستغرق الجزء 1 نحو 4–5 دقائق. حافظ على الصلة واستخدم مفردات طبيعية دون حشر التعابير.",
      },
    ],
    example:
      "Do you enjoy cooking?\nYes, particularly at weekends. I like trying a new recipe when I have time, and I often cook with my sister.",
    pronunciation: "I can explain my view and support it with a clear example.",
    pronunciationTip: {
      en: "Use thought groups, clear word stress and natural pauses. Recognition is not an IELTS pronunciation mark.",
      ar: "استخدم مجموعات معنوية ونبرًا واضحًا ووقفات طبيعية. التعرف على الكلام ليس درجة نطق في الآيلتس.",
    },
    questions: [
      {
        prompt: "Best answer approach?",
        options: ["One word only", "A direct answer plus a relevant detail", "A memorised essay"],
        correct: 1,
        explanation: {
          en: "A short relevant extension supports natural interaction.",
          ar: "التوسع القصير المناسب يدعم تفاعلًا طبيعيًا.",
        },
      },
    ],
  },
  {
    id: "ielts-speaking-2",
    course: "ielts",
    skill: "speaking",
    title: {
      en: "Speaking Part 2: organise the long turn",
      ar: "المحادثة 2: نظم الحديث المطول",
    },
    goal: {
      en: "Use the one-minute preparation to note keywords, not full sentences. Organise a beginning, details and reflection.",
      ar: "استخدم دقيقة التحضير لكتابة كلمات مفتاحية لا جمل كاملة، ونظم البداية والتفاصيل والتأمل.",
    },
    minutes: 20,
    teaching: [
      {
        en: "Use the one-minute preparation to note keywords, not full sentences. Organise a beginning, details and reflection.",
        ar: "استخدم دقيقة التحضير لكتابة كلمات مفتاحية لا جمل كاملة، ونظم البداية والتفاصيل والتأمل.",
      },
      {
        en: "Speak for 1–2 minutes on the cue card. Develop the topic naturally; do not simply read a list of bullet points.",
        ar: "تحدث 1–2 دقيقة عن البطاقة. طور الموضوع طبيعيًا ولا تقرأ النقاط كقائمة.",
      },
    ],
    example:
      "Describe a skill you learned. Say what it was, how you learned it, why you wanted to learn it, and explain how it has helped you.",
    pronunciation: "I can explain my view and support it with a clear example.",
    pronunciationTip: {
      en: "Use thought groups, clear word stress and natural pauses. Recognition is not an IELTS pronunciation mark.",
      ar: "استخدم مجموعات معنوية ونبرًا واضحًا ووقفات طبيعية. التعرف على الكلام ليس درجة نطق في الآيلتس.",
    },
    questions: [
      {
        prompt: "What should preparation notes contain?",
        options: [
          "A fully scripted essay",
          "Keywords and a sequence of ideas",
          "Only advanced idioms",
        ],
        correct: 1,
        explanation: {
          en: "Keywords support spontaneous speech within one minute of planning.",
          ar: "تدعم الكلمات المفتاحية الكلام التلقائي خلال دقيقة التحضير.",
        },
      },
    ],
  },
  {
    id: "ielts-speaking-3",
    course: "ielts",
    skill: "speaking",
    title: {
      en: "Speaking Part 3: analyse and qualify",
      ar: "المحادثة 3: حلل وقيّد التعميم",
    },
    goal: {
      en: "Discuss broader issues with reasons, consequences and comparisons. Qualify generalisations with often, may and in some cases.",
      ar: "ناقش قضايا أوسع بالأسباب والنتائج والمقارنات، وقيّد التعميمات باستخدام often وmay وin some cases.",
    },
    minutes: 20,
    teaching: [
      {
        en: "Discuss broader issues with reasons, consequences and comparisons. Qualify generalisations with often, may and in some cases.",
        ar: "ناقش قضايا أوسع بالأسباب والنتائج والمقارنات، وقيّد التعميمات باستخدام often وmay وin some cases.",
      },
      {
        en: "Part 3 lasts about 4–5 minutes. Band 7 involves coherent extended speech, flexible vocabulary and grammar, and generally controlled pronunciation; recognition text cannot assess all these criteria.",
        ar: "يستغرق الجزء 3 نحو 4–5 دقائق. يتطلب هدف 7 حديثًا مطولًا مترابطًا ومرونة لغوية ونطقًا مضبوطًا عمومًا؛ النص المتعرف عليه لا يقيم جميع المعايير.",
      },
    ],
    example:
      "Why might adults find learning a new skill difficult?\nOne reason is limited time. Adults often balance work and family commitments, so regular practice can be hard. However, motivation and access to suitable courses can make a substantial difference.",
    pronunciation: "I can explain my view and support it with a clear example.",
    pronunciationTip: {
      en: "Use thought groups, clear word stress and natural pauses. Recognition is not an IELTS pronunciation mark.",
      ar: "استخدم مجموعات معنوية ونبرًا واضحًا ووقفات طبيعية. التعرف على الكلام ليس درجة نطق في الآيلتس.",
    },
    questions: [
      {
        prompt: "Which develops an analytical answer?",
        options: [
          "All adults are the same",
          "Discuss a reason, explain it and recognise exceptions",
          "Repeat the question",
        ],
        correct: 1,
        explanation: {
          en: "Explanation and qualification show reasoning without unsupported absolutes.",
          ar: "يظهر الشرح والاستثناءات استدلالًا دون مطلقات غير مدعومة.",
        },
      },
    ],
  },
];
