import type { SpeakingSituation } from "./speaking-situations";

/**
 * 20 additional TBLL speaking situations (4 per category across everyday, travel,
 * work, study, and ielts) bringing Speaking Studio to 60 diverse lessons across A1–C2.
 */
export const EXTRA_SPEAKING_SITUATIONS: SpeakingSituation[] = [
  // ===================== EVERYDAY (+4 → 12) =====================
  {
    id: "pharmacy-advice",
    title: { en: "At the pharmacy", ar: "في الصيدلية" },
    category: "everyday",
    level: "A1",
    role: { en: "Pharmacist", ar: "الصيدلي" },
    taskGoal: {
      en: "Ask for a safe cold remedy, mention an allergy, and confirm daily dosage.",
      ar: "اطلب دواءً آمنًا للزكام، واذكر أي حساسية لديك، وتأكد من الجرعة اليومية.",
    },
    keyPhrases: ["I need something for...", "Does it cause drowsiness?", "How many times a day?"],
    turns: [
      {
        prompt: "Good evening! How can I help you today?",
        model: "Good evening. I have a mild cold and a sore throat. Could you recommend a gentle syrup?",
      },
      {
        prompt: "Do you have any medicine allergies or take other tablets?",
        model: "No allergies at all, and I am not taking any other medicine right now.",
      },
      {
        prompt: "This herbal syrup is very safe. Would you like me to write down the dose?",
        model: "Yes, please! How many spoons should I take each day, and before or after meals?",
      },
    ],
  },
  {
    id: "gym-membership",
    title: { en: "Joining a sports club", ar: "الاشتراك في نادٍ رياضي" },
    category: "everyday",
    level: "A1",
    role: { en: "Club receptionist", ar: "موظف استقبال النادي" },
    taskGoal: {
      en: "Ask about opening hours, monthly fees, and beginner fitness classes.",
      ar: "استفسر عن أوقات العمل والرسوم الشهرية وحصص المبتدئين.",
    },
    keyPhrases: ["How much is the monthly plan?", "What time do you open?", "Can I try one session?"],
    turns: [
      {
        prompt: "Welcome to Oasis Fitness! Are you interested in a membership?",
        model: "Yes, hello! I live nearby and want to exercise three evenings a week after work.",
      },
      {
        prompt: "We offer a monthly plan and a three-month discount plan. Which would you prefer?",
        model: "I would like to start with one month first. Does the price include swimming pool access?",
      },
      {
        prompt: "Yes, the pool and beginner stretching classes are included. Would you like a quick tour?",
        model: "That sounds wonderful, thank you! Let's look at the pool and the running track.",
      },
    ],
  },
  {
    id: "bank-card-help",
    title: { en: "Activating a bank card", ar: "تفعيل بطاقة بنكية" },
    category: "everyday",
    level: "A2",
    role: { en: "Bank adviser", ar: "موظف البنك" },
    taskGoal: {
      en: "Request activation of a new debit card and enable safe international online payments.",
      ar: "اطلب تفعيل بطاقتك الجديدة وضبط حدود الشراء الإلكتروني بأمان.",
    },
    keyPhrases: ["I'd like to activate...", "Is there a daily spending limit?", "How do I freeze it in the app?"],
    turns: [
      {
        prompt: "Good morning! What brings you into the branch today?",
        model: "Good morning. My new debit card arrived yesterday, and I would like to activate it for online study payments.",
      },
      {
        prompt: "Certainly. Would you also like to set a daily limit for extra security?",
        model: "Yes, that is a smart idea. Could we set a daily online limit of five hundred riyals?",
      },
      {
        prompt: "Done! You can also freeze the card instantly inside our mobile app anytime.",
        model: "Thank you for explaining that clearly. I feel much safer knowing I can control it from my phone.",
      },
    ],
  },
  {
    id: "housing-lease",
    title: { en: "Reviewing an apartment lease", ar: "مراجعة عقد إيجار شقة" },
    category: "everyday",
    level: "C1",
    role: { en: "Property manager", ar: "مدير العقار" },
    taskGoal: {
      en: "Clarify maintenance responsibilities, deposit return conditions, and notice periods before signing.",
      ar: "استوضح مسؤوليات الصيانة وشروط استرداد التأمين وفترة الإشعار قبل توقيع العقد.",
    },
    keyPhrases: ["Could you clarify who covers...?", "Under what conditions is the deposit refunded?", "Let's record that in writing."],
    turns: [
      {
        prompt: "Here is the standard twelve-month lease agreement. Do you have any questions before signing?",
        model: "Thank you—before I sign, could you clarify whether major air-conditioning repairs fall under the landlord's responsibility?",
      },
      {
        prompt: "Yes, structural and AC maintenance are covered by the owner; minor bulbs and filters are the tenant's care.",
        model: "That seems completely fair. Could we also specify in writing the exact timeframe for returning the security deposit upon moving out?",
      },
      {
        prompt: "Of course—deposits are refunded within fourteen working days after the final inspection.",
        model: "Perfect. Having those terms recorded transparently protects both of us throughout the tenancy.",
      },
    ],
  },

  // ===================== TRAVEL (+4 → 12) =====================
  {
    id: "taxi-destination",
    title: { en: "Taking a taxi to your hotel", ar: "أخذ سيارة أجرة إلى الفندق" },
    category: "travel",
    level: "A1",
    role: { en: "Taxi driver", ar: "سائق الأجرة" },
    taskGoal: {
      en: "Give your hotel name clearly, ask how long the drive takes, and confirm card payment.",
      ar: "اذكر اسم الفندق بوضوح، واسأل عن مدة الرحلة، وتأكّد من الدفع بالبطاقة.",
    },
    keyPhrases: ["Could you take me to...?", "How long will it take?", "Do you accept card?"],
    turns: [
      {
        prompt: "Hello! Where would you like to go today?",
        model: "Hello! Could you please take me to the Palm Garden Hotel near the city centre?",
      },
      {
        prompt: "Sure, I know it well. Would you like me to put your suitcase in the trunk?",
        model: "Yes, thank you very much! About how long will the drive take with today's traffic?",
      },
      {
        prompt: "About twenty minutes. Is the air conditioning comfortable for you?",
        model: "It feels great, thank you. By the way, can I pay by bank card when we arrive?",
      },
    ],
  },
  {
    id: "currency-exchange",
    title: { en: "Exchanging travel currency", ar: "صرف العملات للسفر" },
    category: "travel",
    level: "A1",
    role: { en: "Exchange cashier", ar: "موظف الصرافة" },
    taskGoal: {
      en: "Ask about today's exchange rate, commission fees, and small banknotes.",
      ar: "اسأل عن سعر الصرف اليوم والعمولة واطلب فئات ورقية صغيرة.",
    },
    keyPhrases: ["What is today's exchange rate?", "Is there any commission?", "Could I have small notes?"],
    turns: [
      {
        prompt: "Good afternoon! Which currency would you like to exchange?",
        model: "Good afternoon. I would like to change one thousand Saudi riyals into British pounds, please.",
      },
      {
        prompt: "Today's rate is shown on the board with zero commission. Would you like large notes?",
        model: "Could I please have a mix of twenty-pound and ten-pound notes for taxis and cafés?",
      },
      {
        prompt: "Certainly! Here is your cash and your printed receipt.",
        model: "Thank you very much. Let me count it quickly—everything looks exact and clear.",
      },
    ],
  },
  {
    id: "museum-tickets",
    title: { en: "Buying museum tickets and audio guides", ar: "شراء تذاكر المتحف والدليل الصوتي" },
    category: "travel",
    level: "A2",
    role: { en: "Museum desk clerk", ar: "موظف تذاكر المتحف" },
    taskGoal: {
      en: "Ask for student discounts, Arabic/English audio guides, and closing times.",
      ar: "اسأل عن خصم الطلاب والدليل الصوتي باللغتين وموعد الإغلاق.",
    },
    keyPhrases: ["Do you offer a student discount?", "Is an audio guide available?", "What time does the gallery close?"],
    turns: [
      {
        prompt: "Welcome to the Heritage Museum! How many tickets would you like today?",
        model: "Two adult tickets and one student ticket, please. Here is my university ID card.",
      },
      {
        prompt: "Great, student admission is half price! Would you like headphones for the audio tour?",
        model: "Yes, please! Are the audio guides available in both Arabic and English?",
      },
      {
        prompt: "They are indeed. Just remember the top gallery closes thirty minutes before the main exit.",
        model: "Thanks for letting us know—we will explore the top gallery first so we do not miss anything.",
      },
    ],
  },
  {
    id: "travel-insurance-claim",
    title: { en: "Filing a travel insurance claim", ar: "تقديم مطالبة تأمين سفر" },
    category: "travel",
    level: "C1",
    role: { en: "Claims specialist", ar: "أخصائي مطالبات التأمين" },
    taskGoal: {
      en: "Explain a documented 14-hour flight delay calmly, cite policy coverage, and confirm required receipts.",
      ar: "اشرح تأخر رحلة موثّق لـ ١٤ ساعة بهدوء واستوضح المستندات اللازمة للتعويض.",
    },
    keyPhrases: ["Under policy clause...", "I have retained every receipt.", "What is the expected reimbursement window?"],
    turns: [
      {
        prompt: "Thank you for calling travel claims. Could you outline what happened during your trip?",
        model: "Certainly. My connecting flight from Frankfurt was delayed by fourteen hours due to technical maintenance, requiring an overnight hotel stay.",
      },
      {
        prompt: "I am sorry for the disruption. Did the airline provide written confirmation of the delay?",
        model: "Yes, I obtained an official delay certificate at the desk and retained itemised receipts for both the hotel room and meals.",
      },
      {
        prompt: "Once you upload those documents through the portal, reimbursement takes roughly ten business days.",
        model: "That is very clear—could you email me a claim reference number so I can track the status online?",
      },
    ],
  },

  // ===================== WORK (+4 → 12) =====================
  {
    id: "first-day-office",
    title: { en: "First day at a new workplace", ar: "اليوم الأول في بيئة عمل جديدة" },
    category: "work",
    level: "A1",
    role: { en: "Team coordinator", ar: "منسّق الفريق" },
    taskGoal: {
      en: "Introduce yourself warmly on your first day and ask practical onboarding questions.",
      ar: "عرّف بنفسك بلطف في يومك الأول واطرح أسئلة عملية حول بداية العمل.",
    },
    keyPhrases: ["I am excited to join the team.", "Where should I start today?", "Who should I ask if I need help?"],
    turns: [
      {
        prompt: "Welcome aboard! Everyone is glad to have you with us today.",
        model: "Thank you so much! I am really excited to join the team and learn how everything works here.",
      },
      {
        prompt: "Here is your desk and laptop. Do you have any quick questions before our ten o'clock welcome chat?",
        model: "Yes, thank you! Which folder has the starter handbook, and what time does the team usually take lunch?",
      },
      {
        prompt: "Lunch is around one o'clock, and I will share the handbook link right now.",
        model: "That is super helpful—please let me know the first small task I can help with after our chat.",
      },
    ],
  },
  {
    id: "it-helpdesk-call",
    title: { en: "Calling the IT helpdesk", ar: "الاتصال بالدعم التقني في العمل" },
    category: "work",
    level: "A2",
    role: { en: "IT technician", ar: "فني الدعم التقني" },
    taskGoal: {
      en: "Describe a laptop login error clearly, follow troubleshooting steps, and confirm the fix.",
      ar: "صف مشكلة الدخول على الحاسوب بوضوح واتبع خطوات الحل وتأكد من نجاحها.",
    },
    keyPhrases: ["An error message pops up when...", "I already restarted it.", "That fixed it immediately!"],
    turns: [
      {
        prompt: "IT helpdesk, good morning. What technical issue are you running into?",
        model: "Good morning! Since this morning's update, my work email keeps asking for my password and refusing to sync.",
      },
      {
        prompt: "Have you tried restarting the laptop or clearing the saved sign-in cache?",
        model: "I already restarted the laptop twice, so could you walk me through clearing the sign-in cache?",
      },
      {
        prompt: "Sure—open settings, click sign out, and sign back in with your one-time security code.",
        model: "I just entered the code, and my inbox is syncing smoothly now. Thank you for the quick fix!",
      },
    ],
  },
  {
    id: "crisis-client-update",
    title: { en: "Updating a client on a critical outage", ar: "إبلاغ عميل بشفافية عن عطل طارئ" },
    category: "work",
    level: "C1",
    role: { en: "Key account client", ar: "عميل رئيسي" },
    taskGoal: {
      en: "Own a service disruption calmly, confirm zero data loss, and commit to a root-cause report.",
      ar: "تحمّل مسؤولية العطل بهدوء، وأكّد سلامة البيانات، والتزم بتقديم تقرير الأسباب الجذرية.",
    },
    keyPhrases: ["First, let me reassure you that...", "Here is our immediate containment plan.", "We will send a full post-mortem by..."],
    turns: [
      {
        prompt: "Our students could not log into the portal for fifteen minutes this evening—what is going on?",
        model: "First, I apologise sincerely for the disruption, and let me reassure you immediately that zero learner data or exam attempts were lost.",
      },
      {
        prompt: "Why did it happen right during peak evening hours?",
        model: "An automated database backup collided with evening traffic spikes. Our engineers paused the backup job and restored full login speed within fifteen minutes.",
      },
      {
        prompt: "How can we be confident this will not repeat during final exams next week?",
        model: "We have permanently rescheduled backups to 3 AM low-traffic hours and added automated load alerts. I will email you a full root-cause report by noon tomorrow.",
      },
    ],
  },
  {
    id: "executive-board-pushback",
    title: { en: "Responding to board pushback on strategy", ar: "الرد بحكمة على اعتراضات مجلس الإدارة" },
    category: "work",
    level: "C2",
    role: { en: "Board chairperson", ar: "رئيس مجلس الإدارة" },
    taskGoal: {
      en: "Defend long-term curriculum investment diplomatically using litotes, ROI evidence, and a bounded pilot.",
      ar: "دافع عن الاستثمار في جودة المناهج بدبلوماسية مستخدمًا الأدلة وتجربة مضبوطة السقف.",
    },
    keyPhrases: ["That fiscal scrutiny is entirely warranted.", "Cutting corners here is not without risk.", "A bounded pilot lets evidence settle the question."],
    turns: [
      {
        prompt: "Why invest heavily in custom bilingual lessons when cheaper generic off-the-shelf courses already exist?",
        model: "That fiscal scrutiny is entirely warranted. Yet off-the-shelf courses consistently suffer high drop-off among Arabic speakers because they ignore local context and acoustic hurdles.",
      },
      {
        prompt: "Still, custom authoring slows our immediate launch timeline—can we justify that delay?",
        model: "Rushing a generic catalogue to market is not without considerable reputational risk; a single weak cohort erodes word-of-mouth trust far more expensively than six weeks of careful craft.",
      },
      {
        prompt: "How would you propose we balance speed with quality this quarter?",
        model: "Let us authorise a bounded pilot launching our flagship English track immediately while measuring ninety-day retention, allowing real learner data to guide our next expansion budget.",
      },
    ],
  },

  // ===================== STUDY (+4 → 12) =====================
  {
    id: "joining-academy-club",
    title: { en: "Joining a campus English club", ar: "الانضمام لنادي الإنجليزية في الجامعة" },
    category: "study",
    level: "A2",
    role: { en: "Club president", ar: "رئيس النادي الطلابي" },
    taskGoal: {
      en: "Ask about weekly club activities, beginner friendliness, and how to volunteer.",
      ar: "اسأل عن أنشطة النادي الأسبوعية وملاءمتها لمستواك وكيفية التطوع.",
    },
    keyPhrases: ["Is it suitable for my level?", "What activities do you run?", "I'd love to help organise..."],
    turns: [
      {
        prompt: "Hi there! Are you thinking about signing up for our English Conversation Club?",
        model: "Yes! I am currently at level A2 and want a friendly space to practise speaking every week.",
      },
      {
        prompt: "You are very welcome—we split into small groups by level so nobody feels shy.",
        model: "That sounds reassuring! Which day do you meet, and do members prepare topics beforehand?",
      },
      {
        prompt: "We meet every Tuesday at five, and we send out two fun discussion prompts on Sunday.",
        model: "Count me in! Once I settle in, I would also love to help welcome new members at the door.",
      },
    ],
  },
  {
    id: "explaining-study-plan",
    title: { en: "Discussing a study plan with an adviser", ar: "مناقشة خطتك الدراسية مع المرشد الأكاديمي" },
    category: "study",
    level: "B1",
    role: { en: "Academic adviser", ar: "المرشد الأكاديمي" },
    taskGoal: {
      en: "Explain your target exam date, honest weak skills, and realistic weekly study hours.",
      ar: "وضّح موعد اختبارك المستهدف ومهاراتك الأضعف بصدق وساعات الدراسة الأسبوعية الواقعية.",
    },
    keyPhrases: ["My target deadline is...", "My biggest hurdle right now is...", "I can realistically commit..."],
    turns: [
      {
        prompt: "Let's map out your semester. What specific English milestone are you aiming for?",
        model: "My goal is to move from B1 to solid B2 within five months so I can apply for a postgraduate scholarship.",
      },
      {
        prompt: "Which skill currently feels like your biggest hurdle?",
        model: "Listening to fast natural speech is definitely my biggest hurdle—I understand written articles easily, yet miss linked words in audio.",
      },
      {
        prompt: "How many focused hours per week can you realistically commit alongside work?",
        model: "I can realistically commit six hours a week—forty-five minutes on weekday evenings plus a longer speaking and listening review on Saturday morning.",
      },
    ],
  },
  {
    id: "viva-methodology-defence",
    title: { en: "Defending research methodology in a viva", ar: "الدفاع عن منهجية البحث في مناقشة التخرج" },
    category: "study",
    level: "C1",
    role: { en: "External examiner", ar: "الممتحن الخارجي" },
    taskGoal: {
      en: "Justify research design, acknowledge scope boundaries candidly, and propose follow-up work.",
      ar: "برّر تصميمك البحثي واعترف بحدود الدراسة بشفافية واقترح امتدادًا بحثيًا منطقيًا.",
    },
    keyPhrases: ["We deliberately opted for...", "One limitation we openly note is...", "A logical extension would track..."],
    turns: [
      {
        prompt: "Why did you pair pre-post listening tests with learner interviews rather than relying on test scores alone?",
        model: "We deliberately opted for a mixed-methods design because scores show whether comprehension rose, whereas interviews uncover which specific acoustic strategies learners actually applied.",
      },
      {
        prompt: "Does a ten-week study window allow you to claim permanent fluency gains?",
        model: "Not at all—one limitation we openly acknowledge is that ten weeks captures short-term transfer rather than multi-year retention, so we calibrated every conclusion cautiously.",
      },
      {
        prompt: "If funded for a follow-up study, what single addition would you prioritise?",
        model: "I would add a six-month delayed post-test across two additional regions to verify both durability and wider generalisability.",
      },
    ],
  },
  {
    id: "interdisciplinary-colloquium",
    title: { en: "Synthesising views in a doctoral colloquium", ar: "التركيب بين التخصصات في ندوة دراسات عليا" },
    category: "study",
    level: "C2",
    role: { en: "Colloquium chair", ar: "رئيس الندوة العلمية" },
    taskGoal: {
      en: "Bridge linguistics, AI ethics, and pedagogy smoothly while handling conceptual nuance.",
      ar: "اربط بين اللغويات وأخلاقيات الذكاء الاصطناعي والتربية بسلاسة ودقة مفاهيمية.",
    },
    keyPhrases: ["What unites both disciplines is...", "The crux of the tension lies in...", "Rather than treating these as a dichotomy..."],
    turns: [
      {
        prompt: "Computer scientists optimise for accuracy metrics while educators focus on learner agency—can both fields truly align?",
        model: "What unites both disciplines is the shared goal of human capability, yet the crux of the tension lies in mistaking measurable proxies like click speed for genuine deep comprehension.",
      },
      {
        prompt: "How should universities prevent automated grading tools from narrowing curriculum richness?",
        model: "Rather than treating automation and human judgement as a binary dichotomy, faculties should delegate routine diagnostic checks to software while anchoring capstone evaluation in live dialogue and original synthesis.",
      },
      {
        prompt: "What ethical standard should govern student voice data in speech-recognition research?",
        model: "Strict data minimisation and informed opt-in consent are non-negotiable—learners must never surrender permanent biometric recordings simply to practise pronunciation.",
      },
    ],
  },

  // ===================== IELTS (+4 → 12) =====================
  {
    id: "ielts-reading-habits",
    title: { en: "IELTS: reading and learning habits", ar: "آيلتس: عادات القراءة والتعلّم" },
    category: "ielts",
    level: "B1",
    role: { en: "Examiner · Part 1", ar: "الممتحن · الجزء الأول" },
    taskGoal: {
      en: "Give direct Part 1 answers extended naturally with one reason and a concrete personal example.",
      ar: "قدّم إجابات مباشرة للجزء الأول ممتدة بسبب ومثال شخصي طبيعي.",
    },
    keyPhrases: ["I tend to read...", "Compared with a few years ago...", "What appeals to me most is..."],
    turns: [
      {
        prompt: "Do you prefer reading printed books or reading on a screen?",
        model: "I generally prefer printed books for longer non-fiction because my eyes feel less tired, though I use digital articles every day for quick English study.",
      },
      {
        prompt: "Have your reading habits changed since you were a child?",
        model: "Definitely—as a child I mostly enjoyed short illustrated adventures, whereas nowadays I tend to read practical history, science essays, and bilingual career guides.",
      },
      {
        prompt: "Where is your favourite quiet place to read?",
        model: "My favourite spot is a bright corner near the window at home early on Friday mornings, with a cup of mint tea before the street gets busy.",
      },
    ],
  },
  {
    id: "ielts-health-wellbeing",
    title: { en: "IELTS: public health and modern habits", ar: "آيلتس: الصحة العامة والعادات المعاصرة" },
    category: "ielts",
    level: "C1",
    role: { en: "Examiner · Part 3", ar: "الممتحن · الجزء الثالث" },
    taskGoal: {
      en: "Develop abstract Part 3 answers balancing individual responsibility with urban design and policy.",
      ar: "طوّر إجابات تحليلية للجزء الثالث توازن بين المسؤولية الفردية وتصميم المدن والسياسات.",
    },
    keyPhrases: ["It is tempting to blame..., yet...", "Urban environment exerts huge influence...", "Preventive investment pays off..."],
    turns: [
      {
        prompt: "Why do many adults struggle to stay physically active despite knowing the health benefits?",
        model: "It is tempting to blame weak willpower alone, yet long sedentary workdays and car-dependent streets make daily walking genuinely difficult unless cities design safe, shaded walkways.",
      },
      {
        prompt: "Should governments invest more in preventive health education or new hospitals?",
        model: "Both remain vital, of course, but shifting greater funding toward preventive screening, school nutrition, and public parks relieves immense long-term pressure on acute hospital budgets.",
      },
      {
        prompt: "Can health apps genuinely change long-term behaviour?",
        model: "They can act as helpful nudges at the start, though durable habits usually depend more on supportive social circles and realistic routines than smartphone badges alone.",
      },
    ],
  },
  {
    id: "ielts-urban-future",
    title: { en: "IELTS: sustainable cities of the future", ar: "آيلتس: المدن المستدامة في المستقبل" },
    category: "ielts",
    level: "C2",
    role: { en: "Examiner · Part 3", ar: "الممتحن · الجزء الثالث" },
    taskGoal: {
      en: "Articulate nuanced C2 policy arguments on climate-adapted architecture, transit, and civic livability.",
      ar: "عبّر عن حجج سياساتية دقيقة بمستوى C2 حول العمارة المناخية والنقل وجودة الحياة.",
    },
    keyPhrases: ["The decisive challenge is...", "Traditional wisdom and modern tech converge...", "Without equitable access..."],
    turns: [
      {
        prompt: "What makes a rapidly growing city genuinely liveable rather than merely impressive to look at?",
        model: "Architectural landmarks catch headlines, yet everyday liveability hinges on quiet fundamentals: shaded pedestrian corridors, dependable transit, affordable housing, and welcoming public parks within walking reach.",
      },
      {
        prompt: "Can historic architectural traditions still teach modern urban engineers anything useful?",
        model: "Unquestionably—thick thermal walls, wind-catching courtyards, and narrow shaded lanes evolved over centuries of desert experience and pair remarkably well with modern solar technology.",
      },
      {
        prompt: "How should cities balance rapid innovation with preserving neighbourhood identity?",
        model: "Through adaptive reuse and genuine resident consultation, ensuring new infrastructure serves existing communities rather than displacing the cultural memory that gave a district its soul.",
      },
    ],
  },
  {
    id: "ielts-lifelong-learning",
    title: { en: "IELTS: lifelong learning and AI", ar: "آيلتس: التعلّم مدى الحياة والذكاء الاصطناعي" },
    category: "ielts",
    level: "C2",
    role: { en: "Examiner · Part 3", ar: "الممتحن · الجزء الثالث" },
    taskGoal: {
      en: "Synthesise economic shifts, reskilling ethics, and timeless human judgement at near-native C2 precision.",
      ar: "اربط بين التحولات الاقتصادية وإعادة التأهيل والحكم البشري بدقة لغوية تقارب C2.",
    },
    keyPhrases: ["As routine tasks automate...", "The premium migrates toward...", "Enduring education cultivates..."],
    turns: [
      {
        prompt: "Has the idea of finishing your education in your early twenties become outdated?",
        model: "Largely yes—front-loaded degrees still provide crucial intellectual foundations, yet rapid technological turnover means modular lifelong reskilling has become an everyday professional necessity.",
      },
      {
        prompt: "Which human skills will grow MORE valuable as automated tools improve?",
        model: "Whenever routine drafting becomes cheap, economic value migrates toward ethical accountability, nuanced cross-cultural communication, and the domain judgement needed to spot subtle flaws in plausible outputs.",
      },
      {
        prompt: "What responsibility do employers share in supporting continuous adult education?",
        model: "Forward-looking employers recognise that funding protected study hours and verified credentials is not charity—it builds adaptable, loyal teams capable of navigating structural change calmly.",
      },
    ],
  },
];
