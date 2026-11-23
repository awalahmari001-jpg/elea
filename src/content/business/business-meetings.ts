import type { MeetingStageModule } from "./business-types";

export const BUSINESS_MEETING_STAGES: MeetingStageModule[] = [
  {
    id: "mtg-01",
    stage: 1,
    title: { en: "Scheduling Meetings & Invites", ar: "جدولة الاجتماعات وإرسال الدعوات" },
    goal: {
      en: "Propose clear time slots, state the meeting's purpose, and confirm attendance smoothly.",
      ar: "اقتراح أوقات واضحة وتحديد هدف الاجتماع وتأكيد الحضور بسلاسة.",
    },
    keyExpressions: [
      {
        phrase: "Would Tuesday at 10 a.m. work on your end?",
        arabic: "هل يناسبك يوم الثلاثاء الساعة ١٠ صباحًا؟",
      },
      {
        phrase: "I've sent over a calendar invite with the video link.",
        arabic: "أرسلتُ دعوة التقويم متضمنة رابط الاجتماع.",
      },
    ],
    dialogue: [
      {
        speaker: "female",
        name: "Layla",
        role: "Operations Lead",
        text: "Hi Omar, could we schedule a 30-minute sync this week to finalise the Q3 carrier contracts?",
      },
      {
        speaker: "male",
        name: "Omar",
        role: "Procurement Manager",
        text: "Sure, Layla. Would Wednesday at 10:30 a.m. work on your end, or is Thursday morning better?",
      },
      {
        speaker: "female",
        name: "Layla",
        role: "Operations Lead",
        text: "Wednesday at 10:30 works great. I'll send the calendar invite with the draft terms attached.",
      },
    ],
    listeningTask: {
      question: "When did Layla and Omar agree to hold the meeting?",
      options: [
        "Wednesday at 10:30 a.m.",
        "Tuesday at 10:00 a.m.",
        "Thursday afternoon.",
        "Friday morning.",
      ],
      correct: 0,
      explanation: {
        en: "Layla confirmed 'Wednesday at 10:30 works great' and promised to attach the draft terms.",
        ar: "أكدت ليلى أن الأربعاء الساعة ١٠:٣٠ صباحًا مناسب تمامًا.",
      },
    },
    rolePlayPrompt: {
      en: "Write a brief message proposing two time slots to a colleague to review next quarter's budget.",
      ar: "اكتب رسالة قصيرة تقترح فيها موعدين على زميلك لمراجعة ميزانية الربع القادم.",
    },
  },
  {
    id: "mtg-02",
    stage: 2,
    title: { en: "Setting a Clear Agenda", ar: "إعداد جدول أعمال واضح" },
    goal: {
      en: "Circulate 3–4 timed agenda items ahead of the meeting so participants come prepared.",
      ar: "مشاركة ٣–٤ بنود محددة بالوقت قبل الاجتماع ليحضر الجميع مستعدين.",
    },
    keyExpressions: [
      {
        phrase: "Our goal today is to align on three items.",
        arabic: "هدفنا اليوم هو التوافق حول ثلاث نقاط.",
      },
      {
        phrase: "Please let me know if you'd like to add anything under AOB.",
        arabic: "يرجى إعلامي إذا رغبتم بإضافة أي نقطة في بند ما يستجد من أعمال.",
      },
    ],
    dialogue: [
      {
        speaker: "male",
        name: "Omar",
        role: "Project Director",
        text: "Before tomorrow's kickoff, I've circulated a three-point agenda: timeline milestones, budget sign-off, and risk owners.",
      },
      {
        speaker: "female",
        name: "Layla",
        role: "Product Lead",
        text: "Thanks, Omar. Could we also allocate five minutes to confirm the client demo date?",
      },
      {
        speaker: "male",
        name: "Omar",
        role: "Project Director",
        text: "Good catch—I'll slot that right after timeline milestones so we finish on the hour.",
      },
    ],
    listeningTask: {
      question: "What item did Layla ask to add to the agenda?",
      options: [
        "Five minutes to confirm the client demo date.",
        "A full review of annual salaries.",
        "Office furniture procurement.",
        "Cancelling the kickoff.",
      ],
      correct: 0,
      explanation: {
        en: "Layla requested five minutes to confirm the client demo date.",
        ar: "طلبت ليلى تخصيص خمس دقائق لتأكيد موعد العرض التجريبي للعميل.",
      },
    },
    rolePlayPrompt: {
      en: "Draft a 3-point timed agenda for a 30-minute weekly team status meeting.",
      ar: "صُغ جدول أعمال من ٣ نقاط محددة بالوقت لاجتماع متابعة أسبوعي مدته ٣٠ دقيقة.",
    },
  },
  {
    id: "mtg-03",
    stage: 3,
    title: { en: "Opening a Meeting Professionally", ar: "افتتاح الاجتماع باحترافية" },
    goal: {
      en: "Start promptly, thank attendees, state the objective, and establish the finish time.",
      ar: "ابدأ في الوقت المحدد، واشكر الحضور، وحدّد الهدف وزمن الانتهاء بوضوح.",
    },
    keyExpressions: [
      {
        phrase: "Thanks everyone for joining on time—let's dive right in.",
        arabic: "شكرًا لانضمامكم جميعًا في الموعد—لنبدأ مباشرة.",
      },
      {
        phrase: "By the end of this 30-minute session, we aim to decide on...",
        arabic: "بنهاية هذه الجلسة (٣٠ دقيقة)، نهدف لحسم قرار حول...",
      },
    ],
    dialogue: [
      {
        speaker: "female",
        name: "Layla",
        role: "Meeting Chair",
        text: "Good morning, everyone, and thank you for joining promptly. Since we have a tight 30 minutes, let's get started.",
      },
      {
        speaker: "female",
        name: "Layla",
        role: "Meeting Chair",
        text: "Our sole objective today is to approve the Q4 launch date and confirm each department's deliverables.",
      },
      {
        speaker: "male",
        name: "Omar",
        role: "Engineering Lead",
        text: "Sounds clear, Layla—Engineering is ready to share our readiness check first.",
      },
    ],
    listeningTask: {
      question: "What is the main objective Layla sets at the start of the meeting?",
      options: [
        "Approving the Q4 launch date and confirming department deliverables.",
        "Discussing next year's holiday calendar.",
        "Hiring new interns.",
        "Redesigning the company logo.",
      ],
      correct: 0,
      explanation: {
        en: "Layla opens with one crisp outcome: approving the Q4 launch date and department deliverables.",
        ar: "حدّدت ليلى هدفًا واضحًا ومباشرًا: اعتماد تاريخ إطلاق الربع الرابع ومخرجات الإدارات.",
      },
    },
    rolePlayPrompt: {
      en: "Write a 3-sentence opening to kick off a 45-minute client review meeting.",
      ar: "اكتب افتتاحية من ٣ جمل لبدء اجتماع مراجعة عميل مدته ٤٥ دقيقة.",
    },
  },
  {
    id: "mtg-04",
    stage: 4,
    title: { en: "Welcoming & Introducing Participants", ar: "الترحيب وتعريف المشاركين" },
    goal: {
      en: "Warmly introduce new colleagues or external clients by sharing their name, title, and role in the project.",
      ar: "الترحيب بالزملاء الجدد أو العملاء الخارجيين مع ذكر أسمائهم وأدوارهم في المشروع.",
    },
    keyExpressions: [
      {
        phrase: "I'd like to extend a warm welcome to..., who joins us from...",
        arabic: "أود أن أرحب ترحيبًا حارًا بـ... الذي ينضم إلينا من...",
      },
      {
        phrase: "For those who haven't met Tariq yet, he leads our analytics team.",
        arabic: "لمن لم يلتقِ بطارق بعد، فهو يقود فريق التحليلات لدينا.",
      },
    ],
    dialogue: [
      {
        speaker: "male",
        name: "Omar",
        role: "Account Director",
        text: "Before we begin, I'd like to welcome Dr. Reem Al-Qahtani, who is joining us from Riyadh Medical Group as clinical advisor.",
      },
      {
        speaker: "female",
        name: "Reem",
        role: "Clinical Advisor",
        text: "Thank you, Omar—it's a pleasure to be here. I'm looking forward to aligning on the patient-portal rollout with everyone.",
      },
      {
        speaker: "male",
        name: "Omar",
        role: "Account Director",
        text: "Wonderful. Let's do a quick 30-second round of introductions from our side.",
      },
    ],
    listeningTask: {
      question: "What is Dr. Reem's role in the meeting?",
      options: [
        "Clinical advisor from Riyadh Medical Group.",
        "External auditor from Finance.",
        "Event photographer.",
        "New HR recruiter.",
      ],
      correct: 0,
      explanation: {
        en: "Omar introduced Dr. Reem clearly with her organisation and clinical advisor role.",
        ar: "عرّف عمر بالدكتورة ريم مع ذكر جهتها ودورها كمستشارة طبية.",
      },
    },
    rolePlayPrompt: {
      en: "Introduce a visiting partner from London to your local operations team in 2–3 sentences.",
      ar: "عرّف شريكًا زائرًا من لندن بفريق العمليات المحلي في جملتين أو ثلاث.",
    },
  },
  {
    id: "mtg-05",
    stage: 5,
    title: { en: "Presenting Progress Updates & Metrics", ar: "عرض التحديثات ومؤشرات الإنجاز" },
    goal: {
      en: "Give concise status updates covering Completed, In Progress, and Blockers without rambling.",
      ar: "تقديم تحديث موجز ومنظّم يغطي المنجز والجاري والعوائق دون إطالة.",
    },
    keyExpressions: [
      {
        phrase: "We're currently on track for Friday's milestone.",
        arabic: "نحن حاليًا على المسار الصحيح لهدف يوم الجمعة.",
      },
      {
        phrase: "The one blocker we're monitoring is...",
        arabic: "العائق الوحيد الذي نتابعه حاليًا هو...",
      },
    ],
    dialogue: [
      {
        speaker: "female",
        name: "Layla",
        role: "Marketing Lead",
        text: "Quick update from Marketing: campaign creatives are 100% approved, and landing-page conversion hit 4.2% in beta testing.",
      },
      {
        speaker: "male",
        name: "Omar",
        role: "VP of Growth",
        text: "Impressive beta numbers, Layla. Are there any blockers ahead of Monday's launch?",
      },
      {
        speaker: "female",
        name: "Layla",
        role: "Marketing Lead",
        text: "Just one—we're waiting on final Arabic legal disclaimers by 2 p.m. tomorrow.",
      },
    ],
    listeningTask: {
      question: "What is the single blocker Layla flagged?",
      options: [
        "Waiting on final Arabic legal disclaimers.",
        "Low beta conversion rates.",
        "Campaign creatives were rejected.",
        "The website crashed.",
      ],
      correct: 0,
      explanation: {
        en: "Layla concisely reported progress and flagged one clear blocker: final Arabic legal disclaimers.",
        ar: "حدّدت ليلى عائقًا واحدًا بوضوح: انتظار إخلاء المسؤولية القانوني باللغة العربية.",
      },
    },
    rolePlayPrompt: {
      en: "Deliver a 3-sentence status update covering one win, one metric, and one small blocker.",
      ar: "قدّم تحديث حالة من ٣ جمل يشمل إنجازًا ومؤشرًا رقميًا وعائقًا واحدًا.",
    },
  },
  {
    id: "mtg-06",
    stage: 6,
    title: { en: "Asking Clarifying Questions", ar: "طرح أسئلة الاستيضاح بدقة" },
    goal: {
      en: "Verify assumptions, numbers, and timelines openly so misunderstandings don't surface weeks later.",
      ar: "التأكد من الأرقام والافتراضات والمواعيد أثناء الاجتماع لمنع سوء الفهم لاحقًا.",
    },
    keyExpressions: [
      {
        phrase: "Just to clarify, does that figure include VAT and freight?",
        arabic: "للتوضيح فقط، هل يشمل هذا الرقم الضريبة والشحن؟",
      },
      {
        phrase: "When you say 'Phase One', which branches are covered?",
        arabic: "عندما تقول «المرحلة الأولى»، ما الفروع المشمولة تحديدًا؟",
      },
    ],
    dialogue: [
      {
        speaker: "male",
        name: "Omar",
        role: "Sales Director",
        text: "The client approved the initial $120,000 rollout package for Phase One.",
      },
      {
        speaker: "female",
        name: "Layla",
        role: "Finance Controller",
        text: "Just to make sure I follow, Omar—does that $120,000 include on-site staff training, or is training billed separately?",
      },
      {
        speaker: "male",
        name: "Omar",
        role: "Sales Director",
        text: "Good question—on-site training is billed separately under our advisory rate.",
      },
    ],
    listeningTask: {
      question: "What did Layla clarify about the $120,000 package?",
      options: [
        "Whether on-site staff training was included or billed separately.",
        "Which currency the client prefers.",
        "Who designed the client's logo.",
        "When the office closes.",
      ],
      correct: 0,
      explanation: {
        en: "Layla used 'Just to make sure I follow' to verify a critical billing scope detail.",
        ar: "تأكدت ليلى بذكاء مما إذا كان التدريب الميداني مشمولًا أم مفوترًا بشكل منفصل.",
      },
    },
    rolePlayPrompt: {
      en: "Ask two polite clarifying questions about a colleague's vague phrase: 'We will launch soon across the region.'",
      ar: "اطرح سؤالي استيضاح مهذبين حول عبارة زميلك الغامضة: «سنُطلق قريبًا في المنطقة».",
    },
  },
  {
    id: "mtg-07",
    stage: 7,
    title: { en: "Sharing Structured Opinions", ar: "طرح الآراء المنظمة في الاجتماع" },
    goal: {
      en: "Present a viewpoint using a clear 2-point structure ('First..., Second...') tied to team goals.",
      ar: "عرض الرأي في نقطتين واضحتين مرتبطتين مباشرة بأهداف الاجتماع.",
    },
    keyExpressions: [
      {
        phrase: "From my perspective, there are two factors to weigh here.",
        arabic: "من منظوري، هناك عاملان ينبغي الموازنة بينهما هنا.",
      },
      {
        phrase: "I'd strongly lean toward Option B for two reasons.",
        arabic: "أميل بقوة للخيار «ب» لسببين واضحين.",
      },
    ],
    dialogue: [
      {
        speaker: "female",
        name: "Layla",
        role: "Operations Manager",
        text: "I'd lean toward partnering with a local logistics carrier for two reasons: faster customs clearance and lower cold-chain risk.",
      },
      {
        speaker: "male",
        name: "Omar",
        role: "Finance Lead",
        text: "That makes sense. Even if unit fees are 4% higher, avoiding spoilage easily pays for the difference.",
      },
    ],
    listeningTask: {
      question: "Why did Layla recommend a local logistics carrier?",
      options: [
        "Faster customs clearance and lower cold-chain risk.",
        "It was the cheapest option by 50%.",
        "Because their office is next door.",
        "Because international carriers are closed.",
      ],
      correct: 0,
      explanation: {
        en: "Layla structured her opinion cleanly into two operational advantages.",
        ar: "قدّمت ليلى رأيها في سببين تشغيليين واضحين ومقنعين.",
      },
    },
    rolePlayPrompt: {
      en: "State your preference between hybrid work and full-office attendance using two concise business reasons.",
      ar: "عبّر عن رأيك بين العمل الهجين والحضور الكامل بذكر سببين عمليين موجزين.",
    },
  },
  {
    id: "mtg-08",
    stage: 8,
    title: { en: "Agreeing & Building on Others' Ideas", ar: "الموافقة والبناء على أفكار الآخرين" },
    goal: {
      en: "Credit colleagues explicitly and add concrete value instead of merely saying 'I agree'.",
      ar: "تقدير فكرة الزميل صراحةً ثم الإضافة عليها بقيمة عملية ملموسة.",
    },
    keyExpressions: [
      {
        phrase: "To build on Layla's point, we could also...",
        arabic: "بناءً على نقطة ليلى، يمكننا أيضًا...",
      },
      {
        phrase: "I'm fully behind that approach—and I'd add one suggestion.",
        arabic: "أؤيد هذا التوجه بالكامل—وأود إضافة مقترح واحد.",
      },
    ],
    dialogue: [
      {
        speaker: "female",
        name: "Layla",
        role: "Customer Success",
        text: "What if we send a short two-minute onboarding video right after a client signs?",
      },
      {
        speaker: "male",
        name: "Omar",
        role: "Product Lead",
        text: "That's a strong idea, Layla. Building on that, we could embed the video right inside the welcome dashboard so new users watch it on day one.",
      },
    ],
    listeningTask: {
      question: "How did Omar build on Layla's onboarding video idea?",
      options: [
        "By embedding it directly inside the welcome dashboard.",
        "By replacing it with a 60-page PDF manual.",
        "By delaying it until next year.",
        "By deleting the welcome dashboard.",
      ],
      correct: 0,
      explanation: {
        en: "Omar credited Layla ('That's a strong idea') and expanded it with 'Building on that...'.",
        ar: "أشاد عمر بفكرة ليلى ثم بنى عليها باستخدام Building on that.",
      },
    },
    rolePlayPrompt: {
      en: "Agree with a colleague's idea to run monthly customer webinars and build one practical enhancement onto it.",
      ar: "وافق على فكرة زميلك بتنظيم ندوات شهرية للعملاء وأضف عليها تطويرًا عمليًا واحدًا.",
    },
  },
  {
    id: "mtg-09",
    stage: 9,
    title: {
      en: "Disagreeing Diplomatically in Meetings",
      ar: "الاختلاف الدبلوماسي داخل الاجتماع",
    },
    goal: {
      en: "Challenge a proposal respectfully by testing assumptions and offering a constructive alternative.",
      ar: "مناقشة مقترح بموضوعية ولباقة مع تقديم بديل عملي قابل للتنفيذ.",
    },
    keyExpressions: [
      {
        phrase: "I see the upside, though I have a slight reservation about...",
        arabic: "أرى الجانب الإيجابي، غير أن لديّ تحفظًا بسيطًا حول...",
      },
      {
        phrase: "Could we test that on a smaller scale before committing the full budget?",
        arabic: "هل يمكننا اختبار ذلك على نطاق أصغر قبل التزام كامل الميزانية؟",
      },
    ],
    dialogue: [
      {
        speaker: "male",
        name: "Omar",
        role: "Marketing VP",
        text: "I suggest allocating the entire Q3 media budget to billboards across Riyadh and Jeddah.",
      },
      {
        speaker: "female",
        name: "Layla",
        role: "Performance Lead",
        text: "I see the brand-visibility upside, Omar. My one reservation is that billboards are hard to track—could we split the spend 60/40 with measurable digital campaigns?",
      },
      {
        speaker: "male",
        name: "Omar",
        role: "Marketing VP",
        text: "Fair point, Layla—a 60/40 split gives us both visibility and clear attribution data.",
      },
    ],
    listeningTask: {
      question: "What compromise did Layla propose instead of spending 100% on billboards?",
      options: [
        "A 60/40 split with measurable digital campaigns.",
        "Spending zero on marketing.",
        "Moving the entire budget to radio ads.",
        "Cancelling Q3 campaigns.",
      ],
      correct: 0,
      explanation: {
        en: "Layla acknowledged the upside, named one specific concern, and proposed a balanced 60/40 split.",
        ar: "اعترفت ليلى بالميزة ثم طرحت تحفظها واقترحت توزيعًا متوازنًا ٦٠/٤٠.",
      },
    },
    rolePlayPrompt: {
      en: "Diplomatically push back against cutting customer-support hours on weekends, suggesting an alternative.",
      ar: "عارض بلباقة مقترح تقليص ساعات دعم العملاء في عطلة نهاية الأسبوع وقدّم بديلًا عمليًا.",
    },
  },
  {
    id: "mtg-10",
    stage: 10,
    title: {
      en: "Interrupting Politely & Regaining the Floor",
      ar: "المقاطعة المهذبة واستعادة الكلمة",
    },
    goal: {
      en: "Step into fast-moving discussions politely when you have a crucial fact—and keep the floor calmly if interrupted.",
      ar: "التدخل المهذب في نقاش سريع عند وجود معلومة حاسمة، واستعادة الحديث بهدوء عند المقاطعة.",
    },
    keyExpressions: [
      {
        phrase: "Sorry to jump in for a second—may I add one quick data point?",
        arabic: "عذرًا على المقاطعة لثانية—هل لي بإضافة رقم سريع؟",
      },
      {
        phrase: "Hold that thought—let me just finish this point and I'll come right to you.",
        arabic: "احتفظ بهذه الفكرة—دعني أكمل هذه النقطة وسأنتقل إليك فورًا.",
      },
    ],
    dialogue: [
      {
        speaker: "male",
        name: "Omar",
        role: "Operations",
        text: "So if we ship by sea freight next Monday, we'll definitely clear customs before the trade expo—",
      },
      {
        speaker: "female",
        name: "Layla",
        role: "Trade Compliance",
        text: "Sorry to jump in, Omar—just a quick flag: port clearance takes nine days this month, so sea freight would miss the expo.",
      },
      {
        speaker: "male",
        name: "Omar",
        role: "Operations",
        text: "Thanks for catching that right away, Layla. Let's price air freight for the display units instead.",
      },
    ],
    listeningTask: {
      question: "Why did Layla politely interrupt Omar?",
      options: [
        "Port clearance takes nine days, meaning sea freight would miss the expo.",
        "She wanted to end the meeting early.",
        "She disagreed with holding an expo.",
        "She forgot her laptop.",
      ],
      correct: 0,
      explanation: {
        en: "Polite interruptions ('Sorry to jump in... just a quick flag') are valuable when preventing a costly mistake.",
        ar: "المقاطعة المهذبة مفيدة جدًا حين تمنع قرارًا خاطئًا ببيان معلومة حاسمة.",
      },
    },
    rolePlayPrompt: {
      en: "Write one sentence to interrupt politely with an urgent compliance note, and one sentence to regain the floor calmly.",
      ar: "اكتب جملة للمقاطعة المهذبة بمعلومة مهمة، وجملة أخرى لاستعادة الحديث بهدوء.",
    },
  },
  {
    id: "mtg-11",
    stage: 11,
    title: { en: "Handling Tough Objections & Pushback", ar: "التعامل مع الاعتراضات الصعبة" },
    goal: {
      en: "Stay composed under tough questioning, validate the concern, and respond with crisp facts.",
      ar: "الحفاظ على الهدوء أمام الأسئلة الصعبة وتقدير القلق والرد بالحقائق والبدائل.",
    },
    keyExpressions: [
      {
        phrase: "That's a fair challenge—let me address the cost side directly.",
        arabic: "تساؤل في محله—دعني أُجيب على جانب التكلفة مباشرة.",
      },
      {
        phrase:
          "I don't have the exact breakdown in front of me, so I'll verify and send it by 4 p.m.",
        arabic: "لا أملك التفصيل الدقيق أمامي الآن، لذا سأتحقق وأرسله قبل الرابعة عصرًا.",
      },
    ],
    dialogue: [
      {
        speaker: "male",
        name: "Omar",
        role: "CFO",
        text: "Your cybersecurity upgrade costs $95,000. Why shouldn't we defer this until next fiscal year?",
      },
      {
        speaker: "female",
        name: "Layla",
        role: "IT Director",
        text: "That's a very fair challenge, Omar. A single regulatory fine or day of downtime costs over three times that figure—and our vendor offered phased quarterly billing to ease Q2 cash flow.",
      },
    ],
    listeningTask: {
      question: "How did Layla answer the CFO's budget objection?",
      options: [
        "By comparing the upgrade cost to downtime/fine risk and offering phased quarterly billing.",
        "By getting angry and refusing to answer.",
        "By admitting the upgrade isn't needed.",
        "By lowering her voice and changing the subject.",
      ],
      correct: 0,
      explanation: {
        en: "Layla validated the CFO's concern, quantified risk ROI, and offered a cash-flow-friendly payment structure.",
        ar: "تقبّلت ليلى التساؤل وقدّمت مقارنة مالية واضحة وحلًا مرحليًا مريحًا للتدفق النقدي.",
      },
    },
    rolePlayPrompt: {
      en: "Respond calmly to a client who objects: 'Your onboarding timeline of six weeks is far too long.'",
      ar: "رد بهدوء ومهنية على عميل يعترض قائلًا: «مدة التهيئة (٦ أسابيع) طويلة جدًا».",
    },
  },
  {
    id: "mtg-12",
    stage: 12,
    title: {
      en: "Negotiating Trade-offs & Reaching Consensus",
      ar: "التفاوض على البدائل والوصول لتوافق",
    },
    goal: {
      en: "Bridge competing departmental needs by trading scope, timing, or resources transparently.",
      ar: "التوفيق بين احتياجات الإدارات المتنافسة بمقايضة النطاق أو التوقيت أو الموارد بشفافية.",
    },
    keyExpressions: [
      {
        phrase: "If we prioritise X this month, can we agree to move Y to Sprint 2?",
        arabic: "إذا قدّمنا «أ» هذا الشهر، هل نتفق على ترحيل «ب» إلى المرحلة الثانية؟",
      },
      {
        phrase: "Can everyone live with this compromise?",
        arabic: "هل هذا الحل التوافقي مقبول لدى الجميع؟",
      },
    ],
    dialogue: [
      {
        speaker: "female",
        name: "Layla",
        role: "Product Lead",
        text: "Sales wants Arabic invoice export immediately, while Support needs automated ticket tagging. We only have capacity for one this month.",
      },
      {
        speaker: "male",
        name: "Omar",
        role: "VP of Operations",
        text: "If Engineering ships Arabic invoice export this sprint to close our three enterprise deals, can we guarantee ticket tagging takes top slot on the first of next month?",
      },
      {
        speaker: "female",
        name: "Layla",
        role: "Product Lead",
        text: "Deal—let's lock both into the roadmap right now.",
      },
    ],
    listeningTask: {
      question: "What trade-off did Layla and Omar agree on?",
      options: [
        "Ship Arabic invoice export now and prioritise ticket tagging first next month.",
        "Drop both features permanently.",
        "Ask the team to work 80 hours a week.",
        "Postpone enterprise deals for a year.",
      ],
      correct: 0,
      explanation: {
        en: "Clear sequencing ('If... this sprint, can we guarantee... next month?') builds immediate cross-team consensus.",
        ar: "الترتيب الواضح للأولويات مع ضمان التزام الشهر القادم يحقق توافقًا سريعًا.",
      },
    },
    rolePlayPrompt: {
      en: "Propose a clear trade-off when both Marketing and IT want urgent budget approval in the same month.",
      ar: "اقترح حلًا توافقيًا واضحًا عندما تطلب إدارتا التسويق والتقنية اعتماد ميزانية عاجلة في نفس الشهر.",
    },
  },
  {
    id: "mtg-13",
    stage: 13,
    title: { en: "Summarising Key Decisions", ar: "تلخيص القرارات الرئيسية" },
    goal: {
      en: "Recap agreed decisions aloud before closing so nobody leaves with a different interpretation.",
      ar: "إعادة تلخيص القرارات المتفق عليها بصوت مسموع قبل الختام لمنع أي التباس.",
    },
    keyExpressions: [
      {
        phrase: "Before we wrap up, let me quickly recap what we've decided.",
        arabic: "قبل الختام، دعوني أُلخّص سريعًا ما اتفقنا عليه.",
      },
      {
        phrase: "Does that accurately capture everyone's understanding?",
        arabic: "هل يعكس هذا بدقة ما اتفق عليه الجميع؟",
      },
    ],
    dialogue: [
      {
        speaker: "male",
        name: "Omar",
        role: "Meeting Chair",
        text: "Before we close, let me recap our two decisions: first, we're launching the pilot on 15 May; second, we've approved the 60/40 digital-and-outdoor media split.",
      },
      {
        speaker: "female",
        name: "Layla",
        role: "Marketing Lead",
        text: "Spot-on, Omar—that matches my notes completely.",
      },
    ],
    listeningTask: {
      question: "Why did Omar summarise the two decisions before ending the meeting?",
      options: [
        "To verify everyone leaves with the exact same understanding.",
        "To extend the meeting by another hour.",
        "To introduce brand-new unrelated topics.",
        "To test whether people were awake.",
      ],
      correct: 0,
      explanation: {
        en: "Recapping aloud prevents silent misalignment and makes follow-up emails effortless.",
        ar: "التلخيص الشفوي قبل المغادرة يمنع التباين في الفهم ويسهّل كتابة محضر الاجتماع.",
      },
    },
    rolePlayPrompt: {
      en: "Write a crisp 2-sentence recap summarising two decisions from a budget planning meeting.",
      ar: "اكتب ملخصًا موجزًا من جملتين لقرارين تم اعتمادهما في اجتماع تخطيط الميزانية.",
    },
  },
  {
    id: "mtg-14",
    stage: 14,
    title: {
      en: "Assigning Action Items & Deadlines",
      ar: "توزيع المهام والمسؤوليات والمواعيد النهائية",
    },
    goal: {
      en: "Attach every next step to ONE named owner and ONE exact date ('Who does what by when').",
      ar: "ربط كل خطوة قادمة بمسؤول واحد محدد بالاسم وموعد نهائي دقيق.",
    },
    keyExpressions: [
      {
        phrase: "Sara, could you take the lead on... by Thursday noon?",
        arabic: "سارة، هل يمكنك تولي قيادة... قبل ظهر الخميس؟",
      },
      {
        phrase: "I'll own the vendor follow-up and share an update on Monday.",
        arabic: "سأتولى متابعة المورّد وسأشارك التحديث يوم الإثنين.",
      },
    ],
    dialogue: [
      {
        speaker: "female",
        name: "Layla",
        role: "Project Manager",
        text: "Let's lock in action items. Omar, can you send the revised SLA to Legal by Wednesday at 4 p.m.?",
      },
      {
        speaker: "male",
        name: "Omar",
        role: "Operations",
        text: "Count on it—I'll send it Wednesday afternoon and copy you on the thread.",
      },
      {
        speaker: "female",
        name: "Layla",
        role: "Project Manager",
        text: "Perfect, and I'll circulate the final client deck by Thursday morning.",
      },
    ],
    listeningTask: {
      question: "What is Omar's exact action item and deadline?",
      options: [
        "Send the revised SLA to Legal by Wednesday at 4 p.m.",
        "Circulate the client deck on Friday.",
        "Book flight tickets next month.",
        "Call all customers tonight.",
      ],
      correct: 0,
      explanation: {
        en: "Great action items always specify Owner (Omar) + Task (revised SLA to Legal) + Deadline (Wednesday 4 p.m.).",
        ar: "المهام الواضحة تحدد دائمًا: المسؤول + المهمة + الموعد النهائي الدقيق.",
      },
    },
    rolePlayPrompt: {
      en: "Assign two clear action items with named owners and exact dates for an upcoming product launch.",
      ar: "وزّع مهمتين واضحتين بأسماء المسؤولين وتواريخ التسليم الدقيقة لإطلاق منتج جديد.",
    },
  },
  {
    id: "mtg-15",
    stage: 15,
    title: {
      en: "Closing & Sending the Follow-Up Email",
      ar: "ختام الاجتماع وإرسال ملخص المتابعة",
    },
    goal: {
      en: "End on time with appreciation and send a clean 1-minute written recap of decisions and action items.",
      ar: "إنهاء الاجتماع في وقته بتقدير واضح ثم إرسال بريد متابعة مختصر بالقرارات والمهام.",
    },
    keyExpressions: [
      {
        phrase:
          "Thanks everyone for a very productive session—I'll circulate the minutes within the hour.",
        arabic: "شكرًا لكم جميعًا على هذه الجلسة المثمرة—سأرسل ملخص الاجتماع خلال ساعة.",
      },
      {
        phrase: "Please reply if anything in the summary needs adjusting.",
        arabic: "يرجى الرد إذا كان هناك أي تعديل مطلوب على الملخص.",
      },
    ],
    dialogue: [
      {
        speaker: "male",
        name: "Omar",
        role: "Chair",
        text: "We're right on the half-hour mark, so let's wrap up here. Thank you all for the focused input today.",
      },
      {
        speaker: "female",
        name: "Layla",
        role: "Project Manager",
        text: "Thanks, Omar. I'll email the decision summary and action table to everyone within the hour.",
      },
    ],
    listeningTask: {
      question: "What will Layla send within the hour?",
      options: [
        "The decision summary and action table by email.",
        "A new 20-page contract.",
        "A calendar cancellation.",
        "An invoice reminder.",
      ],
      correct: 0,
      explanation: {
        en: "Sending concise meeting minutes promptly turns spoken agreement into real execution.",
        ar: "إرسال ملخص القرارات وجدول المهام سريعًا يحوّل الكلام إلى تنفيذ فعلي.",
      },
    },
    rolePlayPrompt: {
      en: "Write a 5-line follow-up email thanking attendees and listing 2 decisions + 2 action items.",
      ar: "اكتب بريد متابعة من ٥ أسطر يشكر الحضور ويلخّص قرارين ومهمتين مع مواعيدهما.",
    },
  },
];
