import type { Lesson } from "./lesson-types";

/**
 * Adults path lessons. Practical English for work, travel and everyday life.
 * Ordered beginner (A1–A2) → intermediate (B1–B2) → advanced (C1–C2).
 */
export const ADULTS_LESSONS: Lesson[] = [
  // ----- Beginner (A1 – A2) -----
  {
    id: "adults-small-talk",
    course: "adults",
    skill: "speaking",
    title: { en: "Small talk and introductions", ar: "الحديث الودي والتعارف" },
    goal: {
      en: "Introduce yourself and keep a short friendly conversation going.",
      ar: "عرّف بنفسك وحافظ على محادثة قصيرة ودية.",
    },
    minutes: 15,
    teaching: [
      {
        en: "Start with a greeting and your name: Hi, I'm Rana. Nice to meet you. Add one fact: I work in a bank. I live in Dubai.",
        ar: "ابدأ بتحية واسمك: Hi, I'm Rana. Nice to meet you. ثم أضف معلومة: I work in a bank أي أعمل في بنك.",
      },
      {
        en: "Keep the conversation alive with short follow-up questions: And you? What about you? How about you? These return the question politely.",
        ar: "أبقِ المحادثة مستمرة بأسئلة قصيرة مثل And you? وWhat about you? فهي تعيد السؤال بأدب.",
      },
    ],
    example:
      "Sami: Hi, I'm Sami. I just started here.\nDana: Nice to meet you, Sami. I'm Dana. Where did you work before?\nSami: In a hotel in Amman. And you?\nDana: I've been here for three years. Welcome aboard!",
    pronunciation: "Nice to meet you. Where did you work before?",
    pronunciationTip: {
      en: "Nice to meet you flows as one unit: nice-tuh-meet-you. Do not pause between the words.",
      ar: "عبارة Nice to meet you تُقال كوحدة واحدة متصلة دون توقف بين الكلمات.",
    },
    questions: [
      {
        prompt: "Choose the most natural reply to Nice to meet you.",
        options: ["Nice to meet you too.", "Yes, I am.", "Goodbye."],
        correct: 0,
        explanation: {
          en: "The standard reply mirrors the greeting: Nice to meet you too.",
          ar: "الرد الطبيعي يكرر التحية: Nice to meet you too.",
        },
      },
      {
        prompt: "You want to return the question to the other person. Say:",
        options: ["And you?", "Me too?", "What it is?"],
        correct: 0,
        explanation: {
          en: "And you? politely returns the same question.",
          ar: "And you? تعيد السؤال نفسه بأدب.",
        },
      },
      {
        prompt: "I ___ in a bank.",
        options: ["work", "works", "working"],
        correct: 0,
        explanation: {
          en: "With I we use the base form: work.",
          ar: "مع I نستخدم الفعل في صورته الأساسية: work.",
        },
      },
    ],
  },
  {
    id: "adults-shopping-directions",
    course: "adults",
    skill: "listening",
    title: { en: "Shopping and asking for directions", ar: "التسوّق والسؤال عن الاتجاهات" },
    goal: {
      en: "Ask for prices and sizes in a shop, and understand simple directions.",
      ar: "اسأل عن الأسعار والمقاسات في المتجر وافهم الاتجاهات البسيطة.",
    },
    minutes: 15,
    teaching: [
      {
        en: "In a shop: How much is this? Do you have this in a larger size? Can I try it on? Pay with: I'll take it.",
        ar: "في المتجر: How much is this? بكم هذا؟ وDo you have this in a larger size? هل يوجد مقاس أكبر؟ وللشراء: I'll take it.",
      },
      {
        en: "Directions use go straight, turn left/right, go past, it's next to / opposite / between. Ask: Excuse me, how do I get to the station?",
        ar: "الاتجاهات تستخدم go straight وturn left وgo past وnext to وopposite. اسأل: How do I get to the station? كيف أصل إلى المحطة؟",
      },
    ],
    example:
      "Tourist: Excuse me, how do I get to the museum?\nLocal: Go straight on, then turn left at the bank. It's opposite the post office.\nTourist: Thank you very much!\nLocal: You're welcome.",
    pronunciation: "Excuse me, how do I get to the station?",
    pronunciationTip: {
      en: "In excuse me, the stress is on CUSE: ex-CUSE me. It gets attention politely.",
      ar: "النبر في excuse me على مقطع CUSE، وتُستخدم لجذب الانتباه بأدب.",
    },
    questions: [
      {
        prompt: "You want to know the price. Ask:",
        options: ["How much is this?", "How many is this?", "What price it has?"],
        correct: 0,
        explanation: {
          en: "How much is this? is the correct way to ask a price.",
          ar: "How much is this? هي الطريقة الصحيحة للسؤال عن السعر.",
        },
      },
      {
        prompt: "Turn left ___ the bank.",
        options: ["on", "at", "to"],
        correct: 1,
        explanation: {
          en: "We turn left or right at a landmark: turn left at the bank.",
          ar: "نقول turn left at عند معلم معين مثل البنك.",
        },
      },
      {
        prompt: "The café is ___ the bank and the pharmacy.",
        options: ["between", "opposite to", "next"],
        correct: 0,
        explanation: {
          en: "Between means in the middle of two things. Opposite takes no to, and next needs to.",
          ar: "between تعني في المنتصف بين شيئين، وopposite لا تأخذ to، وnext تحتاج to.",
        },
      },
    ],
  },
  {
    id: "adults-restaurant",
    course: "adults",
    skill: "speaking",
    title: { en: "At the restaurant", ar: "في المطعم" },
    goal: {
      en: "Book a table, order food and drinks, and ask for the bill politely.",
      ar: "احجز طاولة واطلب الطعام والشراب واطلب الحساب بأدب.",
    },
    minutes: 15,
    teaching: [
      {
        en: "Polite requests use I'd like… and Could I have…? I'd like a table for two. Could I have the menu, please?",
        ar: "الطلبات المهذبة تستخدم I'd like وCould I have. مثال: I'd like a table for two أي أريد طاولة لشخصين.",
      },
      {
        en: "To order: I'll have the grilled chicken. To finish: Could we have the bill, please? Common replies: Of course. Right away.",
        ar: "للطلب: I'll have the grilled chicken. وللحساب: Could we have the bill, please? والردود الشائعة: Of course وRight away.",
      },
    ],
    example:
      "Waiter: Good evening. Do you have a reservation?\nGuest: Yes, a table for two under Haddad.\nWaiter: This way, please. Are you ready to order?\nGuest: I'd like the lentil soup, and I'll have the sea bass.",
    pronunciation: "Could I have the menu, please? I'd like the lentil soup.",
    pronunciationTip: {
      en: "Could I sounds like could-eye. Link the words smoothly: could-eye-have.",
      ar: "عبارة Could I تُنطق متصلة مثل could-eye، واربط الكلمات بسلاسة.",
    },
    questions: [
      {
        prompt: "Choose the most polite way to order.",
        options: ["Give me the soup.", "I'd like the soup, please.", "Soup. Now."],
        correct: 1,
        explanation: {
          en: "I'd like… please is the polite restaurant form.",
          ar: "I'd like… please هي الصيغة المهذبة في المطعم.",
        },
      },
      {
        prompt: "A table ___ two, please.",
        options: ["to", "for", "of"],
        correct: 1,
        explanation: {
          en: "We say a table for two.",
          ar: "نقول a table for two.",
        },
      },
      {
        prompt: "You finished eating and want to pay. Say:",
        options: ["Could we have the bill, please?", "Where is money?", "I go now."],
        correct: 0,
        explanation: {
          en: "Could we have the bill, please? is the polite way to ask to pay.",
          ar: "Could we have the bill, please? هي الطريقة المهذبة لطلب الحساب.",
        },
      },
    ],
  },
  {
    id: "adults-grammar-questions",
    course: "adults",
    skill: "grammar",
    title: { en: "Asking questions correctly", ar: "صياغة الأسئلة بشكل صحيح" },
    goal: {
      en: "Build questions with do, does and did in the right word order.",
      ar: "كوّن الأسئلة باستخدام do وdoes وdid بترتيب كلمات صحيح.",
    },
    minutes: 18,
    teaching: [
      {
        en: "Present simple questions use do or does before the subject: Do you work here? Does she live nearby? With does, the main verb loses its s: Does he play, not does he plays.",
        ar: "أسئلة المضارع البسيط تستخدم do أو does قبل الفاعل: Do you work here? ومع does يفقد الفعل حرف s: Does he play وليس does he plays.",
      },
      {
        en: "Past questions use did for everyone: Did you see the email? The main verb returns to its base form: Did they go, not did they went. With the verb be, no do/does/did: Are you ready? Was she there?",
        ar: "أسئلة الماضي تستخدم did للجميع: Did you see the email? ويعود الفعل لصورته الأساسية: Did they go. أما فعل الكينونة فلا يحتاج do: Are you ready?",
      },
    ],
    example:
      "Colleague: Do you work in this building?\nNour: Yes, on the third floor. Did you just start?\nColleague: I did! Does the café downstairs open early?\nNour: It opens at seven. Are you free for a coffee later?",
    pronunciation: "Do you work here? Does she live nearby? Did you see the email?",
    pronunciationTip: {
      en: "Do you links together in natural speech: doh-yoo. Keep the question melody rising for yes/no questions.",
      ar: "عبارة Do you تُنطق متصلة في الكلام الطبيعي doh-yoo، وارفع نبرة الصوت في أسئلة نعم/لا.",
    },
    questions: [
      {
        prompt: "___ she work on Fridays?",
        options: ["Do", "Does", "Is"],
        correct: 1,
        explanation: {
          en: "She is third person singular, so the question uses does.",
          ar: "she مفرد غائب، لذلك يبدأ السؤال بـ does.",
        },
      },
      {
        prompt: "Choose the correct question.",
        options: ["Did you went home early?", "Did you go home early?", "You did go home early?"],
        correct: 1,
        explanation: {
          en: "After did, the main verb returns to its base form: go.",
          ar: "بعد did يعود الفعل إلى صورته الأساسية: go.",
        },
      },
      {
        prompt: "___ you ready for the meeting?",
        options: ["Do", "Are", "Did"],
        correct: 1,
        explanation: {
          en: "Ready is an adjective, so the question uses the verb be: Are you ready?",
          ar: "ready صفة، لذلك نستخدم فعل الكينونة: Are you ready?",
        },
      },
    ],
  },
  // ----- Intermediate (B1 – B2) -----
  {
    id: "adults-emails-meetings",
    course: "adults",
    skill: "writing",
    title: { en: "Emails and meetings", ar: "رسائل البريد والاجتماعات" },
    goal: {
      en: "Write a clear professional email and take part in a meeting.",
      ar: "اكتب بريدًا مهنيًا واضحًا وشارك في الاجتماعات.",
    },
    minutes: 20,
    teaching: [
      {
        en: "A professional email has: a greeting (Dear Mr Haddad / Hi Sara), one idea per paragraph, a clear request (Could you send me the report by Friday?) and a sign-off (Best regards).",
        ar: "البريد المهني يتكون من تحية مثل Dear Mr Haddad، وفكرة واحدة لكل فقرة، وطلب واضح مثل Could you send me the report by Friday?، وخاتمة مثل Best regards.",
      },
      {
        en: "In meetings, use set phrases: to agree — I see your point. Exactly. To disagree politely — I see it differently. I'm not sure about that. To suggest — Why don't we…? Could we…?",
        ar: "في الاجتماعات استخدم عبارات ثابتة: للموافقة I see your point، وللاعتراض بأدب I see it differently، وللاقتراح Why don't we…?",
      },
    ],
    example:
      "Subject: Friday delivery\n\nHi Omar,\n\nI hope you're well. Could you confirm that the samples will arrive by Friday? We need them for the client visit on Monday.\n\nIf there is any delay, please let me know today so we can adjust the schedule.\n\nBest regards,\nLina",
    pronunciation: "Could you confirm that the samples will arrive by Friday?",
    pronunciationTip: {
      en: "Confirm stresses the second syllable: con-FIRM. Friday is fry-day.",
      ar: "النبر في confirm على المقطع الثاني con-FIRM، وFriday تُنطق fry-day.",
    },
    questions: [
      {
        prompt: "Choose the best opening for a formal email to a manager you don't know well.",
        options: ["Hey boss,", "Dear Mr Haddad,", "Hi there!!!"],
        correct: 1,
        explanation: {
          en: "Dear + title + surname is the standard formal opening.",
          ar: "Dear مع اللقب والاسم هي البداية الرسمية المعتادة.",
        },
      },
      {
        prompt: "You disagree with a colleague in a meeting. The polite phrase is:",
        options: ["You're wrong.", "I see it differently.", "No way."],
        correct: 1,
        explanation: {
          en: "I see it differently disagrees without attacking the person.",
          ar: "I see it differently تعبّر عن الاختلاف دون مهاجمة الشخص.",
        },
      },
      {
        prompt: "Which is a clear request?",
        options: [
          "Could you send me the report by Friday?",
          "The report, maybe, if you can?",
          "Send it whenever.",
        ],
        correct: 0,
        explanation: {
          en: "A clear request names the action and the deadline.",
          ar: "الطلب الواضح يحدد المطلوب والموعد النهائي.",
        },
      },
    ],
    writing: {
      prompt:
        "Write a short professional email to a colleague asking them to review a document before Thursday. Include a greeting, the request, a reason and a sign-off.",
      minimum: 50,
      model:
        "Hi Ahmad,\n\nI hope you're doing well. Could you please review the attached proposal before Thursday? Your feedback on the pricing section would be especially helpful, as the client meeting is on Friday morning and we need the final numbers by then.\n\nIf you need any extra information or the earlier drafts, just let me know and I will send them over today.\n\nBest regards,\nMariam",
      checklist: [
        { en: "I opened with a greeting", ar: "بدأت بتحية" },
        { en: "I made one clear request with a deadline", ar: "كتبت طلبًا واضحًا بموعد نهائي" },
        { en: "I gave a reason", ar: "ذكرت السبب" },
        { en: "I signed off politely", ar: "ختمت بأدب" },
      ],
    },
  },
  {
    id: "adults-travel",
    course: "adults",
    skill: "listening",
    title: { en: "Airports and hotels", ar: "المطارات والفنادق" },
    goal: {
      en: "Handle check-in, security and hotel conversations with confidence.",
      ar: "تعامل بثقة مع إجراءات السفر والأمن والفنادق.",
    },
    minutes: 20,
    teaching: [
      {
        en: "At the airport: I'd like to check in, please. Window or aisle? Your gate is B12. Boarding starts at 9:40. At security: Please remove your laptop and liquids.",
        ar: "في المطار: I'd like to check in أي أريد تسجيل الوصول. Window or aisle? نافذة أم ممر؟ Your gate is B12 بوابتك B12. وعند الأمن: Please remove your laptop.",
      },
      {
        en: "At the hotel: I have a reservation under… Could I have a late check-out? The room rate includes breakfast. Report problems politely: The air conditioning isn't working. Could someone have a look?",
        ar: "في الفندق: I have a reservation under أي لدي حجز باسم… وCould I have a late check-out? هل يمكن تأخير المغادرة؟ وللإبلاغ عن مشكلة: The air conditioning isn't working.",
      },
    ],
    example:
      "Agent: Good morning. May I see your passport?\nTraveller: Here you are. I'd like a window seat, please.\nAgent: Certainly. Your gate is B12 and boarding starts at 9:40.\nTraveller: Thank you. Is the flight on time?\nAgent: Yes, we're boarding on schedule.",
    pronunciation: "I have a reservation under Haddad. Could I have a late check-out?",
    pronunciationTip: {
      en: "Reservation stresses VA: re-zer-VA-tion. Gate rhymes with late.",
      ar: "النبر في reservation على مقطع VA، وكلمة gate تُنطق مثل late.",
    },
    questions: [
      {
        prompt: "At check-in you want a seat next to the window. Say:",
        options: ["A window seat, please.", "Give window.", "I want near glass."],
        correct: 0,
        explanation: {
          en: "A window seat, please is the natural request.",
          ar: "A window seat, please هي الطريقة الطبيعية للطلب.",
        },
      },
      {
        prompt: "Boarding starts at 9:40 means:",
        options: [
          "The plane leaves at 9:40.",
          "Passengers get on the plane at 9:40.",
          "Check-in closes at 9:40.",
        ],
        correct: 1,
        explanation: {
          en: "Boarding is when passengers get on the plane, before departure.",
          ar: "Boarding تعني صعود الركاب إلى الطائرة قبل الإقلاع.",
        },
      },
      {
        prompt: "Your hotel room is too cold. The polite report is:",
        options: [
          "The air conditioning isn't working. Could someone have a look?",
          "Your hotel is terrible.",
          "Fix this now!",
        ],
        correct: 0,
        explanation: {
          en: "State the problem, then make a polite request.",
          ar: "اذكر المشكلة ثم اطلب بأدب.",
        },
      },
    ],
  },
  {
    id: "adults-opinions",
    course: "adults",
    skill: "speaking",
    title: { en: "Giving your opinion", ar: "التعبير عن رأيك" },
    goal: {
      en: "Give, support and soften opinions in discussions.",
      ar: "عبّر عن رأيك وادعمه وخفف حدته في النقاشات.",
    },
    minutes: 20,
    teaching: [
      {
        en: "Openers: In my view…, I believe…, From my perspective…. Support with because and for example: I believe remote work helps families because it saves commuting time.",
        ar: "ابدأ بعبارات مثل In my view وI believe، وادعم رأيك بـ because وfor example. مثال: I believe remote work helps families because it saves time.",
      },
      {
        en: "Soften strong opinions: I tend to think…, It seems to me…, I may be wrong, but…. These keep the discussion friendly and professional.",
        ar: "خفف الآراء القوية بعبارات مثل I tend to think وIt seems to me وI may be wrong, but، فهي تبقي النقاش وديًا ومهنيًا.",
      },
    ],
    example:
      "Rana: In my view, the city needs more green spaces. They improve air quality and give families somewhere to relax.\nOmar: I see your point, but I tend to think public transport is more urgent. For example, traffic here costs people hours every week.\nRana: That's fair. Maybe both matter.",
    pronunciation: "I tend to think public transport is more urgent.",
    pronunciationTip: {
      en: "Opinion stresses PIN: o-PIN-ion. Urgent has a soft g, like ur-jent.",
      ar: "النبر في opinion على مقطع PIN، وurgent تُنطق ur-jent بصوت j.",
    },
    questions: [
      {
        prompt: "Choose the phrase that softens an opinion.",
        options: ["I tend to think…", "Obviously…", "Everyone knows…"],
        correct: 0,
        explanation: {
          en: "I tend to think softens the claim and invites discussion.",
          ar: "I tend to think تخفف حدة الرأي وتفتح باب النقاش.",
        },
      },
      {
        prompt: "___ my view, the plan is too expensive.",
        options: ["On", "In", "At"],
        correct: 1,
        explanation: {
          en: "The fixed phrase is In my view.",
          ar: "العبارة الثابتة هي In my view.",
        },
      },
      {
        prompt: "You want to support your opinion with a reason. Use:",
        options: ["because", "although", "unless"],
        correct: 0,
        explanation: {
          en: "Because introduces the reason that supports your opinion.",
          ar: "because تقدم السبب الذي يدعم رأيك.",
        },
      },
    ],
  },
  // ----- Advanced (C1 – C2) -----
  {
    id: "adults-presentations",
    course: "adults",
    skill: "speaking",
    title: { en: "Presentations and negotiations", ar: "العروض التقديمية والتفاوض" },
    goal: {
      en: "Structure a presentation and negotiate towards agreement.",
      ar: "نظّم عرضًا تقديميًا وتفاوض للوصول إلى اتفاق.",
    },
    minutes: 25,
    teaching: [
      {
        en: "Structure a talk with signposts: Today I'll cover three points. Moving on to…, To illustrate this…, To sum up…. Signposts let the audience follow you without slides.",
        ar: "نظّم العرض بعبارات إرشادية مثل Today I'll cover three points وMoving on to وTo sum up، فهي تساعد الحضور على المتابعة.",
      },
      {
        en: "Negotiate with conditional language: If you can extend the deadline, we could lower the price. Would you consider…? That's something we could look at. Aim for both sides to gain.",
        ar: "تفاوض بلغة شرطية: If you can extend the deadline, we could lower the price. واسأل: Would you consider…? والهدف أن يستفيد الطرفان.",
      },
    ],
    example:
      "Today I'll cover three points: our results, the challenges, and the plan for next quarter. Moving on to the numbers — sales grew by twelve percent, driven largely by online orders. To illustrate this, look at the second chart. To sum up: we grew, but margins tightened, so next quarter we focus on costs.",
    pronunciation: "Moving on to the numbers — sales grew by twelve percent.",
    pronunciationTip: {
      en: "Percent stresses the second syllable: per-CENT. Pause briefly at each signpost.",
      ar: "النبر في percent على المقطع الثاني per-CENT، وتوقف لحظة عند كل عبارة إرشادية.",
    },
    questions: [
      {
        prompt: "Which phrase signals a new section of a talk?",
        options: ["Moving on to…", "Whatever…", "By the way, sorry…"],
        correct: 0,
        explanation: {
          en: "Moving on to… is a standard signpost to the next point.",
          ar: "Moving on to عبارة إرشادية معتادة للانتقال إلى النقطة التالية.",
        },
      },
      {
        prompt: "Choose the best negotiating sentence.",
        options: [
          "If you can extend the deadline, we could lower the price.",
          "Take it or leave it.",
          "Your offer is ridiculous.",
        ],
        correct: 0,
        explanation: {
          en: "The conditional offer trades something for something — the heart of negotiation.",
          ar: "العرض الشرطي يبادل شيئًا بشيء، وهذا جوهر التفاوض.",
        },
      },
      {
        prompt: "To sum up is used to:",
        options: [
          "start the presentation",
          "close with the main points",
          "interrupt a speaker",
        ],
        correct: 1,
        explanation: {
          en: "To sum up closes the talk by restating the main points.",
          ar: "To sum up تختم العرض بتلخيص النقاط الرئيسية.",
        },
      },
    ],
  },
  {
    id: "adults-idioms",
    course: "adults",
    skill: "reading",
    title: { en: "Idioms and natural expressions", ar: "التعابير الاصطلاحية واللغة الطبيعية" },
    goal: {
      en: "Understand and use common workplace and everyday idioms.",
      ar: "افهم واستخدم التعابير الاصطلاحية الشائعة في العمل والحياة اليومية.",
    },
    minutes: 20,
    teaching: [
      {
        en: "Idioms mean more than their words: to be on the same page = to agree; to touch base = to check in briefly; a ballpark figure = a rough estimate.",
        ar: "التعابير الاصطلاحية تعني أكثر من كلماتها: on the same page أي متفقون، وtouch base أي نتواصل سريعًا، وballpark figure أي تقدير تقريبي.",
      },
      {
        en: "Use idioms sparingly and match the situation. In a formal report write roughly instead of ballpark. With colleagues, idioms make you sound natural.",
        ar: "استخدم التعابير باعتدال وحسب الموقف: في التقرير الرسمي اكتب roughly بدل ballpark، ومع الزملاء تجعلك التعابير تبدو طبيعيًا.",
      },
    ],
    example:
      "Before we start, let's make sure we're all on the same page about the budget. I don't need exact numbers today — a ballpark figure is fine. I'll touch base with the finance team this afternoon and get back to you by Thursday.",
    pronunciation: "Let's make sure we're all on the same page.",
    pronunciationTip: {
      en: "Idiom is ID-ee-um, stress on the first syllable. Same page links: same-payj.",
      ar: "النبر في idiom على المقطع الأول ID-ee-um، وsame page تُنطقان متصلتين.",
    },
    questions: [
      {
        prompt: "We're on the same page means:",
        options: ["We agree.", "We are reading together.", "We are lost."],
        correct: 0,
        explanation: {
          en: "On the same page means sharing the same understanding.",
          ar: "on the same page تعني أن الطرفين لديهما الفهم نفسه.",
        },
      },
      {
        prompt: "A ballpark figure is:",
        options: ["an exact price", "a rough estimate", "a sports statistic"],
        correct: 1,
        explanation: {
          en: "A ballpark figure is an approximate number, not exact.",
          ar: "ballpark figure رقم تقريبي وليس دقيقًا.",
        },
      },
      {
        prompt: "I'll touch base with finance means:",
        options: [
          "I'll check in briefly with finance.",
          "I'll play baseball with finance.",
          "I'll argue with finance.",
        ],
        correct: 0,
        explanation: {
          en: "To touch base means to make brief contact to check something.",
          ar: "touch base تعني التواصل السريع للتحقق من شيء.",
        },
      },
    ],
  },
  {
    id: "adults-professional-writing",
    course: "adults",
    skill: "writing",
    title: { en: "Professional writing", ar: "الكتابة المهنية" },
    goal: {
      en: "Write concise, well-structured reports and proposals.",
      ar: "اكتب تقارير ومقترحات موجزة ومنظمة.",
    },
    minutes: 25,
    teaching: [
      {
        en: "Professional writing is concise: cut filler (due to the fact that → because), prefer active voice (we delivered the project, not the project was delivered), and keep sentences under 25 words where possible.",
        ar: "الكتابة المهنية موجزة: احذف الحشو مثل due to the fact that واستبدلها بـ because، وفضّل المبني للمعلوم، واجعل الجمل أقل من ٢٥ كلمة قدر الإمكان.",
      },
      {
        en: "Structure a report: summary first, then findings, then recommendations. Use headings so a busy reader can scan it in thirty seconds.",
        ar: "نظّم التقرير: ملخص أولًا ثم النتائج ثم التوصيات، واستخدم العناوين ليتمكن القارئ المشغول من مسحه في ثلاثين ثانية.",
      },
    ],
    example:
      "Summary: Online sales grew 12% this quarter, while store sales fell 3%.\n\nFindings: Growth came mainly from repeat customers using the mobile app. Delivery delays in March cost an estimated 40 orders.\n\nRecommendations: Invest in the app loyalty programme and renegotiate the courier contract before the holiday season.",
    pronunciation: "Growth came mainly from repeat customers using the mobile app.",
    pronunciationTip: {
      en: "Concise is con-SISE, rhyming with precise. Recommendation has its stress on DAY: recom-men-DAY-tion.",
      ar: "concise تُنطق con-SISE، والنبر في recommendation على مقطع DAY.",
    },
    questions: [
      {
        prompt: "Choose the most concise sentence.",
        options: [
          "We delivered the project on time.",
          "The project was delivered by us in a timely manner.",
          "It is the case that the project was delivered on time by us.",
        ],
        correct: 0,
        explanation: {
          en: "Active voice with no filler is the clearest and shortest.",
          ar: "المبني للمعلوم بدون حشو هو الأوضح والأقصر.",
        },
      },
      {
        prompt: "A report should start with:",
        options: ["the summary", "the recommendations", "the background details"],
        correct: 0,
        explanation: {
          en: "Busy readers need the summary first.",
          ar: "القارئ المشغول يحتاج الملخص أولًا.",
        },
      },
      {
        prompt: "Replace due to the fact that with:",
        options: ["because", "inasmuch as", "owing to the circumstance that"],
        correct: 0,
        explanation: {
          en: "Because says the same thing in one word.",
          ar: "because تقول المعنى نفسه بكلمة واحدة.",
        },
      },
    ],
    writing: {
      prompt:
        "Write a short report (summary, findings, recommendations) about customer complaints at a café. At least 80 words.",
      minimum: 80,
      model:
        "Summary: Complaints rose from 12 to 27 this month, mostly about waiting time in the morning.\n\nFindings: Most complaints came between 8 and 10 in the morning, when only two staff members work. Customers waited an average of 14 minutes for coffee, and six customers left without ordering. Complaints about food quality stayed low, and afternoon service received no complaints at all.\n\nRecommendations: Add one barista during the morning rush, prepare the ten most popular items in advance, and review the results with the team after one month.",
      checklist: [
        { en: "I started with a summary", ar: "بدأت بملخص" },
        { en: "I used headings", ar: "استخدمت عناوين" },
        { en: "I used the active voice", ar: "استخدمت المبني للمعلوم" },
        { en: "I ended with clear recommendations", ar: "أنهيت بتوصيات واضحة" },
      ],
    },
  },
];
