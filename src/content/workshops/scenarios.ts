import type { WorkshopRoleId, WorkshopRoleMeta, WorkshopScenario } from "./workshop-types";

/** All 12 AI professional roles available across Interactive Business Workshops. */
export const WORKSHOP_ROLES: WorkshopRoleMeta[] = [
  {
    id: "business-manager",
    personaName: "Layla Al-Mansoor",
    voice: "female",
    label: { en: "Business Manager", ar: "مديرة أعمال" },
    styleNote: {
      en: "Results-focused, tests timelines, accountability, and practical execution.",
      ar: "تركّز على النتائج والمواعيد والمساءلة والتنفيذ العملي.",
    },
  },
  {
    id: "hr-manager",
    personaName: "Nadia Al-Harbi",
    voice: "female",
    label: { en: "HR Manager", ar: "مديرة الموارد البشرية" },
    styleNote: {
      en: "Evaluates cultural fit, fairness, team dynamics, and policy clarity.",
      ar: "تقيّم التوافق المؤسسي والعدالة وديناميكيات الفريق والسياسات.",
    },
  },
  {
    id: "recruiter",
    personaName: "Tariq Al-Otaibi",
    voice: "male",
    label: { en: "Senior Recruiter", ar: "مسؤول استقطاب كفاءات" },
    styleNote: {
      en: "Probes career transitions, measurable impact, and compensation expectations.",
      ar: "يفحص الانتقالات المهنية والأثر الرقمي وتوقعات الراتب.",
    },
  },
  {
    id: "job-interviewer",
    personaName: "Dr. Reem Al-Qahtani",
    voice: "female",
    label: { en: "Job Interviewer", ar: "محاورة توظيف رئيسية" },
    styleNote: {
      en: "Asks structured STAR behavioural questions and unexpected follow-up probes.",
      ar: "تطرح أسئلة STAR السلوكية وأسئلة متابعة غير متوقعة.",
    },
  },
  {
    id: "company-director",
    personaName: "Khalid Al-Saud",
    voice: "male",
    label: { en: "Company Director", ar: "مدير عام / عضو إدارة عليا" },
    styleNote: {
      en: "Expects concise executive summaries, ROI clarity, and decisive ownership.",
      ar: "يتوقع إيجازًا تنفيذيًا ووضوحًا في العائد وقرارات حاسمة.",
    },
  },
  {
    id: "sales-rep",
    personaName: "Omar Al-Ghamdi",
    voice: "male",
    label: { en: "Sales Representative", ar: "ممثل مبيعات" },
    styleNote: {
      en: "Pushes for rapid deal closure, attractive margins, and client-friendly terms.",
      ar: "يدفع لإغلاق الصفقات بسرعة والحفاظ على الهوامش وشروط مرنة.",
    },
  },
  {
    id: "business-client",
    personaName: "Hannah Brooks",
    voice: "female",
    label: { en: "Business Client", ar: "عميلة شركات (B2B)" },
    styleNote: {
      en: "Challenges pricing, demands strict SLAs, and compares competitor bids.",
      ar: "تناقش الأسعار وتطالب باتفاقيات مستوى خدمة صارمة وتقارن بالمنافسين.",
    },
  },
  {
    id: "investor",
    personaName: "David Chen",
    voice: "male",
    label: { en: "Venture Investor", ar: "مستثمر رأسمال جريء" },
    styleNote: {
      en: "Tests unit economics, scalability, defensible moat, and burn rate.",
      ar: "يختبر اقتصاديات الوحدة وقابلية التوسّع والميزة التنافسية ومعدل الإنفاق.",
    },
  },
  {
    id: "project-manager",
    personaName: "Sara Al-Zahrani",
    voice: "female",
    label: { en: "Project Manager", ar: "مديرة مشاريع" },
    styleNote: {
      en: "Guards milestones, challenges scope creep, and requires single owners.",
      ar: "تحمي الجدول الزمني وتضبط توسّع النطاق وتلزم بمسؤول واحد لكل مهمة.",
    },
  },
  {
    id: "marketing-specialist",
    personaName: "Maya Haddad",
    voice: "female",
    label: { en: "Marketing Specialist", ar: "أخصائية تسويق" },
    styleNote: {
      en: "Focuses on audience positioning, conversion funnels, and brand voice.",
      ar: "تركّز على التموضع السوقي ومعدلات التحويل وصوت العلامة التجارية.",
    },
  },
  {
    id: "customer",
    personaName: "Faisal Al-Dossary",
    voice: "male",
    label: { en: "Enterprise Customer", ar: "عميل متضرر / عميل رئيسي" },
    styleNote: {
      en: "Urgent, expects sincere empathy, rapid root-cause ownership, and a firm fix.",
      ar: "مستعجل ويتوقع تعاطفًا صادقًا وتحملًا للمسؤولية وحلًا فوريًا محددًا بوقت.",
    },
  },
  {
    id: "international-partner",
    personaName: "Elena Novak",
    voice: "female",
    label: { en: "International Business Partner", ar: "شريكة أعمال دولية" },
    styleNote: {
      en: "Navigates cross-border regulations, time zones, and mutual governance.",
      ar: "تركّز على الأنظمة العابرة للحدود والمناطق الزمنية والحوكمة المشتركة.",
    },
  },
];

export function getWorkshopRole(id: WorkshopRoleId): WorkshopRoleMeta {
  return WORKSHOP_ROLES.find((r) => r.id === id) ?? WORKSHOP_ROLES[0]!;
}

/** 14 Interactive Business Workshop Scenarios (10 Core + 4 Industry-Specific). */
export const WORKSHOP_SCENARIOS: WorkshopScenario[] = [
  // ======================= 10 CORE SCENARIOS =======================
  {
    id: "ws-job-interview",
    category: "core",
    title: { en: "1. High-Stakes Job Interview", ar: "١. مقابلة عمل تنافسية عالية المستوى" },
    summary: {
      en: "Defend your track record, deliver a sharp STAR behavioural story, handle an unexpected gap/weakness probe, and negotiate expectations.",
      ar: "اعرض إنجازاتك بدقة، وقدّم قصة STAR مقنعة، وتعامل مع أسئلة المتابعة غير المتوقعة وتوقعات الراتب.",
    },
    learnerRole: { en: "Shortlisted Senior Candidate", ar: "مرشح في القائمة النهائية" },
    defaultRole: "job-interviewer",
    recommendedRoles: ["job-interviewer", "hr-manager", "recruiter"],
    objectives: [
      {
        en: "Present a concise, metrics-backed summary of your experience.",
        ar: "تقديم ملخص مهني موجز مدعوم بالأرقام والنتائج.",
      },
      {
        en: "Deliver a complete STAR example under follow-up questioning.",
        ar: "سرد مثال STAR متكامل مع الرد على أسئلة الاستقصاء.",
      },
      {
        en: "Address a tough weakness or compensation question with poise.",
        ar: "الإجابة بثقة واتزان على سؤال نقطة الضعف أو الراتب.",
      },
    ],
    openingPrompt:
      "Thank you for coming in today. We've shortlisted three strong finalists for this role. To start, walk me through the most measurable operational improvement you've led in the last two years—and why it prepares you for our team.",
    complications: [
      "That sounds promising, yet several candidates mention teamwork without owning tough calls. What specific friction or pushback did you personally face during that project, and what did you do differently?",
      "Let's look closely at a gap: this role requires managing cross-border stakeholders who don't report to you. How would you handle a regional VP who ignores your timeline in your first 60 days?",
      "Before we wrap up, our budget band is slightly tighter than typical market headlines. What total compensation range are you expecting, and what questions do you have for us?",
    ],
    targetExpressions: [
      "measurable impact",
      "stakeholder alignment",
      "as a result",
      "total compensation",
    ],
    recommendedFollowUps: ["ws-performance-review", "ws-business-negotiation"],
  },
  {
    id: "ws-corporate-meeting",
    category: "core",
    title: { en: "2. Cross-Functional Corporate Meeting", ar: "٢. اجتماع مؤسسي بين الإدارات" },
    summary: {
      en: "Lead a tense Q3 budget and priority review where Finance wants cuts while Product demands accelerated hiring.",
      ar: "أدر اجتماع مراجعة أولويات وميزانية الربع الثالث وسط تضارب بين تقليص التكاليف وتسريع التوظيف.",
    },
    learnerRole: { en: "Department Lead", ar: "قائد إدارة مشارك في الاجتماع" },
    defaultRole: "business-manager",
    recommendedRoles: ["business-manager", "company-director", "project-manager"],
    objectives: [
      {
        en: "State your department's priority clearly using business evidence.",
        ar: "عرض أولوية إدارتك بوضوح مدعوم بأدلة عملية.",
      },
      {
        en: "Disagree diplomatically and propose a realistic trade-off.",
        ar: "الاختلاف الدبلوماسي وطرح مقايضة عملية متوازنة.",
      },
      {
        en: "Lock in named action owners and concrete deadlines.",
        ar: "تثبيت أسماء المسؤولين والمواعيد النهائية بوضوح.",
      },
    ],
    openingPrompt:
      "Thanks for joining on time. Finance just capped Q3 discretionary spend by 15%, yet your team requested two new hires and a software upgrade. Walk me through what we absolutely cannot cut and why.",
    complications: [
      "I hear the growth argument, but Operations is also asking for urgent warehouse automation. If I can only approve one of your two requests this quarter, which one moves the needle more—and how will you handle the gap?",
      "Wait—your competitor just dropped prices by 10% this morning. Does that shift your priority from hiring to customer retention right now?",
      "Okay, before we adjourn in two minutes, recap our agreed trade-off and tell me exactly who owns the revised budget memo and by when.",
    ],
    targetExpressions: ["move the needle", "trade-off", "to build on", "action item"],
    recommendedFollowUps: ["ws-business-presentation", "ws-project-management"],
  },
  {
    id: "ws-business-negotiation",
    category: "core",
    title: {
      en: "3. B2B Contract & Pricing Negotiation",
      ar: "٣. تفاوض تجاري على العقود والأسعار",
    },
    summary: {
      en: "Negotiate a $250,000 enterprise renewal with a client demanding a 25% discount and shorter payment terms.",
      ar: "تفاوض على تجديد عقد مؤسسي بقيمة ٢٥٠ ألف دولار مع عميل يطلب خصمًا بنسبة ٢٥٪ وشروط دفع أقصر.",
    },
    learnerRole: { en: "Commercial Account Lead", ar: "مدير حسابات تجارية" },
    defaultRole: "business-client",
    recommendedRoles: ["business-client", "sales-rep", "company-director"],
    objectives: [
      {
        en: "Protect base margins without breaking rapport.",
        ar: "حماية هوامش الربح الأساسية دون الإضرار بالعلاقة.",
      },
      {
        en: "Use conditional counter-offers ('If you commit to..., we can...').",
        ar: "استخدام العروض المضادة المشروطة بذكاء.",
      },
      {
        en: "Close on clear commercial terms and next signing steps.",
        ar: "إغلاق الاتفاق ببنود واضحة وخطوات توقيع محددة.",
      },
    ],
    openingPrompt:
      "We've valued working with your team this year, but our CFO is auditing every vendor. Another provider quoted us 25% below your renewal price. Unless you match that rate, we'll have to move the account.",
    complications: [
      "Your service quality is strong, I'll grant you that—but 25% is a huge delta. What concrete value or concession can you put on the table today so I can justify staying with you to my board?",
      "A two-year lock-in is tricky because our regional branch count might fluctuate. Could we keep a 12-month exit clause while still getting your volume discount?",
      "Let's test a compromise: if we commit to 24 months with quarterly billing, what exact discount percentage and onboarding support will you put in writing by Friday?",
    ],
    targetExpressions: [
      "conditional upon",
      "meet halfway",
      "value proposition",
      "sweeten the deal",
    ],
    recommendedFollowUps: ["ws-international-comm", "ws-customer-complaint"],
  },
  {
    id: "ws-business-presentation",
    category: "core",
    title: {
      en: "4. Executive Presentation & Tough Q&A",
      ar: "٤. عرض تقديمي تنفيذي وجلسة أسئلة صعبة",
    },
    summary: {
      en: "Present a new regional expansion proposal to sceptical directors and defend your ROI assumptions live.",
      ar: "قدّم مقترح توسّع إقليمي لمجلس إدارة متشكك ودافع عن افتراضات العائد والمخاطر مباشرة.",
    },
    learnerRole: { en: "Strategy Presenter", ar: "مقدّم العرض الاستراتيجي" },
    defaultRole: "company-director",
    recommendedRoles: ["company-director", "business-manager", "investor"],
    objectives: [
      {
        en: "Open with a crisp bottom-line recommendation (BLUF).",
        ar: "الافتتاح بالتوصية التنفيذية المباشرة والواضحة.",
      },
      {
        en: "Interpret trend data and ROI clearly without jargon.",
        ar: "شرح البيانات والعائد على الاستثمار بوضوح ودون تعقيد.",
      },
      {
        en: "Handle sceptical boardroom interruptions with calm authority.",
        ar: "التعامل بثبات وهدوء مع مداخلات وأسئلة مجلس الإدارة الصعبة.",
      },
    ],
    openingPrompt:
      "We only have fifteen minutes before the next board item. Skip the background slides—give me your headline recommendation on entering the GCC mid-market and the core numbers behind it.",
    complications: [
      "Hold on—your projection assumes a 4% conversion rate in month three, yet our domestic launch took nine months to pass 2.5%. Why shouldn't I view these numbers as overly optimistic?",
      "What happens to our existing flagship clients if we divert three senior engineers to localise this expansion?",
      "Give me a crisp 30-second closing summary: what exact pilot budget are you asking the board to approve today, and what metric triggers a stop-loss?",
    ],
    targetExpressions: ["key takeaway", "phased rollout", "driven primarily by", "fair challenge"],
    recommendedFollowUps: ["ws-investor-pitch", "ws-corporate-meeting"],
  },
  {
    id: "ws-customer-complaint",
    category: "core",
    title: {
      en: "5. Escalated Enterprise Customer Complaint",
      ar: "٥. معالجة شكوى عميل رئيسي مُصعَّدة",
    },
    summary: {
      en: "Calm an angry VIP client whose automated billing failed twice and whose shipment arrived 48 hours late.",
      ar: "احتوِ غضب عميل رئيسي تعرّض لخطأ فوتره متكرر وتأخر شحنة ٤٨ ساعة، واستعد ثقته بحل ملموس.",
    },
    learnerRole: { en: "Customer Success Manager", ar: "مدير نجاح العملاء" },
    defaultRole: "customer",
    recommendedRoles: ["customer", "business-client", "business-manager"],
    objectives: [
      {
        en: "De-escalate with sincere empathy and zero blame-shifting.",
        ar: "تهدئة الموقف بتعاطف صادق ودون إلقاء اللوم على الإدارات الأخرى.",
      },
      {
        en: "Propose a timed, concrete service-recovery plan.",
        ar: "تقديم خطة تصحيح فورية ومحددة بزمن واضح.",
      },
      {
        en: "Rebuild trust with a preventive safeguard going forward.",
        ar: "استعادة الثقة بضمان وقائي يمنع تكرار الخطأ مستقبلًا.",
      },
    ],
    openingPrompt:
      "Honestly, I'm furious. Not only did our critical medical supplies arrive two days late, your billing system double-charged our account for the second month in a row! Why should we renew with you next quarter?",
    complications: [
      "An apology alone won't explain this to my hospital director. What are you personally doing today to reverse the double charge and ensure Friday's shipment doesn't slip too?",
      "Last month someone promised it wouldn't happen again, and here we are. What structural change guarantees this billing error won't repeat?",
      "Alright, I appreciate the ownership. If I hold off cancelling until Monday, what written compensation or SLA credit can you confirm right now?",
    ],
    targetExpressions: [
      "apologise for the inconvenience",
      "put this right",
      "going forward",
      "personally update",
    ],
    recommendedFollowUps: ["ws-crisis-management", "ws-business-negotiation"],
  },
  {
    id: "ws-performance-review",
    category: "core",
    title: {
      en: "6. Annual Performance Review & Promotion Case",
      ar: "٦. تقييم الأداء السنوي وطلب الترقية",
    },
    summary: {
      en: "Make an evidence-backed case for promotion to Senior Lead while receiving candid feedback on delegation.",
      ar: "قدّم ملفك المدعوم بالأرقام للترقية وتقبّل ملاحظات التطوير حول التفويض باحترافية.",
    },
    learnerRole: { en: "High-Performing Specialist", ar: "أخصائي يسعى للترقية القيادية" },
    defaultRole: "business-manager",
    recommendedRoles: ["business-manager", "hr-manager"],
    objectives: [
      {
        en: "Articulate top annual achievements with clear metrics.",
        ar: "عرض أبرز إنجازات العام بأرقام ومؤشرات واضحة.",
      },
      {
        en: "Receive constructive criticism calmly without defensiveness.",
        ar: "تقبّل الملاحظات التطويرية بهدوء دون دفاعية.",
      },
      {
        en: "Co-create a measurable 6-month promotion roadmap.",
        ar: "الاتفاق على خطة ترقية واضحة وقابلة للقياس خلال ٦ أشهر.",
      },
    ],
    openingPrompt:
      "Thanks for preparing your self-appraisal. Your project delivery this year was outstanding. Before we discuss next year's title and band, which two accomplishments are you proudest of—and what impact did they have on the business?",
    complications: [
      "Those are strong wins. At the same time, peer feedback flagged that you sometimes step in and rewrite junior teammates' work instead of coaching them. How do you view that feedback?",
      "Senior Lead roles require scaling output through others rather than solo heroics. What concrete habit will you change over the next quarter?",
      "If we set clear leadership milestones for the next six months, what support or mentoring would you need from me to hit the promotion bar?",
    ],
    targetExpressions: [
      "constructive feedback",
      "delegate effectively",
      "measurable milestones",
      "growth pathway",
    ],
    recommendedFollowUps: ["ws-job-interview", "ws-corporate-meeting"],
  },
  {
    id: "ws-project-management",
    category: "core",
    title: {
      en: "7. Project Delay Recovery & Scope Control",
      ar: "٧. إنقاذ مشروع متأخر وضبط توسّع النطاق",
    },
    summary: {
      en: "Contain scope creep after a key vendor slips by 10 days while keeping the executive launch window intact.",
      ar: "اضبط توسّع نطاق المشروع بعد تأخر مورد رئيسي ١٠ أيام مع حماية موعد الإطلاق التنفيذي.",
    },
    learnerRole: { en: "Project Manager", ar: "مدير المشروع" },
    defaultRole: "project-manager",
    recommendedRoles: ["project-manager", "business-manager", "business-client"],
    objectives: [
      {
        en: "Communicate the delay transparently with root-cause clarity.",
        ar: "إبلاغ التأخير بشفافية مع توضيح السبب الجذري.",
      },
      {
        en: "Push back diplomatically against unapproved scope creep.",
        ar: "رفض الإضافات غير المعتمدة بدبلوماسية لحماية الجدول.",
      },
      {
        en: "Agree on a phased recovery schedule and risk owner.",
        ar: "الاتفاق على جدول تعافٍ مرحلي وتحديد مسؤول المخاطر.",
      },
    ],
    openingPrompt:
      "We just heard the payment-gateway vendor slipped by ten days, and at the same time Sales asked to squeeze two custom dashboards into next month's launch. How are we going to stop this project from derailing?",
    complications: [
      "Sales insists those two custom dashboards will help close a flagship client. If you say no, how will you frame it so they feel supported rather than blocked?",
      "Even if we defer the dashboards to Phase Two, we're still ten days behind on payment integration. What contingency plan recovers at least five of those days without burning out Engineering?",
      "Summarise the revised go-live checklist and tell me what exact decision you need leadership to sign off on today.",
    ],
    targetExpressions: ["scope creep", "bottleneck", "contingency plan", "sign off on"],
    recommendedFollowUps: ["ws-tech-launch", "ws-corporate-meeting"],
  },
  {
    id: "ws-recruitment-hr",
    category: "core",
    title: {
      en: "8. Hiring Panel & Talent Selection Debrief",
      ar: "٨. جلسة تقييم المرشحين واختيار التوظيف",
    },
    summary: {
      en: "Debate two final candidates with HR: one has deep technical credentials, the other shows superior leadership and communication.",
      ar: "ناقش مع الموارد البشرية المفاضلة بين مرشحَين نهائيين: الأول قوي تقنيًا والثاني متميز قياديًا وتواصليًا.",
    },
    learnerRole: { en: "Hiring Manager", ar: "مدير التوظيف" },
    defaultRole: "hr-manager",
    recommendedRoles: ["hr-manager", "recruiter", "business-manager"],
    objectives: [
      {
        en: "Evaluate candidates objectively against role competencies.",
        ar: "تقييم المرشحين بموضوعية وفق كفاءات الوظيفة.",
      },
      {
        en: "Balance immediate skill needs with long-term team retention.",
        ar: "الموازنة بين الاحتياج الفوري والاحتفاظ بالكفاءة طويلًا.",
      },
      {
        en: "Design a fair offer and 30-day onboarding ramp.",
        ar: "تصميم عرض وظيفي عادل وخطة تهيئة لأول ٣٠ يومًا.",
      },
    ],
    openingPrompt:
      "We're down to two finalists. Candidate A aced the technical exam but struggled to collaborate in the case exercise; Candidate B showed outstanding stakeholder communication but needs two months of technical ramp-up. Who gets the offer?",
    complications: [
      "If we hire for technical speed today, what's the attrition risk if the rest of the team struggles to collaborate with them?",
      "On the other hand, if we pick Candidate B, how do we bridge the technical gap during Q3 without overloading our senior engineer?",
      "Candidate B is also interviewing with a competitor and asked for an offer by Thursday. What compensation and onboarding plan will make them say yes?",
    ],
    targetExpressions: ["shortlist", "transferable skills", "onboarding", "retention"],
    recommendedFollowUps: ["ws-job-interview", "ws-performance-review"],
  },
  {
    id: "ws-international-comm",
    category: "core",
    title: {
      en: "9. Cross-Border Partnership Alignment",
      ar: "٩. مواءمة شراكة أعمال دولية عابرة للحدود",
    },
    summary: {
      en: "Align distribution terms, compliance standards, and communication cadences with a European partner entering the MENA market.",
      ar: "نسّق شروط التوزيع ومعايير الامتثال وإيقاع التواصل مع شريك أوروبي يدخل سوق الشرق الأوسط.",
    },
    learnerRole: { en: "Regional Partnerships Director", ar: "مدير الشراكات الإقليمية" },
    defaultRole: "international-partner",
    recommendedRoles: ["international-partner", "company-director", "sales-rep"],
    objectives: [
      {
        en: "Clarify cross-border legal, customs, and localisation realities.",
        ar: "توضيح متطلبات الجمارك والامتثال والتعريب المحلي بدقة.",
      },
      {
        en: "Bridge cultural and time-zone expectations diplomatically.",
        ar: "تجاوز الفروق الثقافية والمناطق الزمنية بدبلوماسية.",
      },
      {
        en: "Establish clear joint governance and milestone reviews.",
        ar: "إرساء حوكمة مشتركة ومواعيد مراجعة واضحة.",
      },
    ],
    openingPrompt:
      "Good afternoon from Zurich! We're eager to launch our industrial sensors across Saudi Arabia and the UAE next quarter. From your regional vantage point, what compliance or distribution hurdles should we factor in immediately?",
    complications: [
      "Our headquarters prefers direct online sales without local distributors to preserve margins. Why would a local partner model be worth sharing margin in year one?",
      "We also noticed our teams operate on slightly different workweeks—Sunday to Thursday versus Monday to Friday. How should we structure weekly syncs and urgent SLA coverage?",
      "Before I brief our Zurich board, outline the three non-negotiable terms you want in our Memorandum of Understanding.",
    ],
    targetExpressions: ["customs clearance", "in line with", "stakeholder", "strategic alignment"],
    recommendedFollowUps: ["ws-supply-chain", "ws-business-negotiation"],
  },
  {
    id: "ws-crisis-management",
    category: "core",
    title: { en: "10. Urgent Business Crisis Response", ar: "١٠. إدارة أزمة تشغيلية عاجلة" },
    summary: {
      en: "Lead the first 30 minutes of a major payment-platform outage while rumours spread on social media.",
      ar: "قد أول ٣٠ دقيقة من أزمة تعطّل منصة دفع رئيسية وسط انتشار الشائعات على منصات التواصل.",
    },
    learnerRole: { en: "Crisis Response Lead", ar: "قائد فريق إدارة الأزمات" },
    defaultRole: "company-director",
    recommendedRoles: ["company-director", "customer", "business-manager"],
    objectives: [
      {
        en: "Prioritise immediate operational containment over speculation.",
        ar: "تقديم الاحتواء التشغيلي الفوري على التكهنات.",
      },
      {
        en: "Draft transparent, calm external messaging to contain rumours.",
        ar: "صياغة رسالة خارجية صريحة وهادئة لاحتواء الشائعات.",
      },
      {
        en: "Commit to a clear post-incident root-cause review.",
        ar: "الالتزام بمراجعة جذرية تمنع تكرار الأزمة.",
      },
    ],
    openingPrompt:
      "We have a live situation: checkout payments have been down for 40 minutes, 12,000 customers are affected, and social media posts are falsely claiming a data breach. Give me our immediate 15-minute action plan.",
    complications: [
      "Legal is nervous about publishing a public statement before engineering confirms the exact root cause. Should we stay silent for two hours or communicate now—and what exact wording would you release?",
      "Our largest enterprise client just called threatening to issue a press release unless we give them an ETA in the next ten minutes. How do you handle that call?",
      "Once service is restored, what three concrete steps will you present tomorrow morning to rebuild public trust?",
    ],
    targetExpressions: ["downtime", "contain rumours", "transparency", "contingency plan"],
    recommendedFollowUps: ["ws-customer-complaint", "ws-healthcare-admin"],
  },

  // ======================= 4 INDUSTRY-SPECIFIC SCENARIOS =======================
  {
    id: "ws-healthcare-admin",
    category: "industry",
    title: {
      en: "11. Healthcare Admin: Safety & Accreditation Audit",
      ar: "١١. الإدارة الصحية: تدقيق السلامة والاعتماد",
    },
    summary: {
      en: "Lead a hospital operations review ahead of international accreditation while resolving emergency-triage bottlenecks.",
      ar: "أدر مراجعة عمليات مستشفى قبيل الاعتماد الدولي مع معالجة اختناقات فرز الطوارئ.",
    },
    learnerRole: { en: "Hospital Operations Director", ar: "مدير عمليات المستشفى" },
    defaultRole: "company-director",
    recommendedRoles: ["company-director", "hr-manager", "project-manager"],
    objectives: [
      {
        en: "Use accurate healthcare-admin terminology (triage, compliance, accreditation).",
        ar: "توظيف مصطلحات الإدارة الصحية بدقة (triage, compliance, accreditation).",
      },
      {
        en: "Protect patient safety while addressing staffing strain.",
        ar: "حماية سلامة المرضى مع معالجة ضغط الكوادر التمريضية.",
      },
      {
        en: "Present a verifiable pre-audit remediation schedule.",
        ar: "تقديم جدول معالجة موثّق قبل زيارة لجنة الاعتماد.",
      },
    ],
    openingPrompt:
      "Our international accreditation inspection is six weeks away. Emergency triage wait times rose 18% last month and two clinics flagged minor documentation gaps. How do we close these compliance risks without burning out nursing staff?",
    complications: [
      "Adding temporary agency nurses blows past our quarterly overtime budget. Is there a digital triage or scheduling redesign that cuts wait times first?",
      "Two senior department heads view the extra compliance checklists as unnecessary bureaucracy. How will you win their active buy-in before the mock audit?",
      "Summarise the top three readiness metrics you'll track weekly until accreditation day.",
    ],
    targetExpressions: ["triage", "regulatory compliance", "accreditation", "cut corners"],
    recommendedFollowUps: ["ws-crisis-management", "ws-corporate-meeting"],
  },
  {
    id: "ws-tech-launch",
    category: "industry",
    title: {
      en: "12. Tech Sector: Enterprise SaaS Product Launch",
      ar: "١٢. قطاع التقنية: إطلاق منتج سحابي للمؤسسات",
    },
    summary: {
      en: "Decide Go vs. No-Go 48 hours before a flagship SaaS deployment when QA uncovers a minor interoperability bug.",
      ar: "احسم قرار الإطلاق أو التأجيل قبل ٤٨ ساعة من نشر منصة سحابية بعد اكتشاف خلل تكامل تقني.",
    },
    learnerRole: { en: "Product Launch Lead", ar: "قائد إطلاق المنتج التقني" },
    defaultRole: "project-manager",
    recommendedRoles: ["project-manager", "marketing-specialist", "business-client"],
    objectives: [
      {
        en: "Weigh technical risk against commercial launch momentum clearly.",
        ar: "الموازنة الموضوعية بين المخاطر التقنية وزخم الإطلاق التجاري.",
      },
      {
        en: "Align Engineering and Marketing on one unified rollout plan.",
        ar: "توحيد خطة الهندسة والتسويق في قرار إطلاق واحد.",
      },
      {
        en: "Define clear rollback safeguards and customer communication.",
        ar: "تحديد خطة تراجع آمنة ورسالة واضحة للعملاء.",
      },
    ],
    openingPrompt:
      "Marketing already booked Monday's press release and webinar for 800 enterprise prospects, but QA just caught an ERP interoperability glitch affecting 8% of legacy exports. Are we Go or No-Go for Monday's deployment?",
    complications: [
      "If we delay by one week, Marketing warns we lose press momentum and have to reschedule 800 registrants. Could a phased rollout work instead of a full delay?",
      "Engineering says a zero-downtime hotfix takes 72 hours. What exact message should Account Managers send to the 8% of clients using legacy exports?",
      "Confirm your final Go/No-Go call, the phased deployment plan, and who owns the rollback trigger.",
    ],
    targetExpressions: [
      "phased deployment",
      "interoperability",
      "zero-downtime",
      "manage expectations",
    ],
    recommendedFollowUps: ["ws-project-management", "ws-crisis-management"],
  },
  {
    id: "ws-supply-chain",
    category: "industry",
    title: {
      en: "13. Supply Chain: Port Disruption & Rerouting",
      ar: "١٣. سلاسل الإمداد: تعثّر الموانئ وإعادة التوجيه",
    },
    summary: {
      en: "Reroute seasonal retail inventory after a regional port closure doubles lead times right before peak demand.",
      ar: "أعد توجيه مخزون الموسم بعد إغلاق ميناء إقليمي ضاعف مهل التوريد قبيل ذروة الطلب.",
    },
    learnerRole: { en: "Supply Chain Manager", ar: "مدير سلاسل الإمداد" },
    defaultRole: "international-partner",
    recommendedRoles: ["international-partner", "business-manager", "customer"],
    objectives: [
      {
        en: "Diagnose lead-time and inventory bottlenecks rapidly.",
        ar: "تشخيص اختناقات التوريد والمخزون بسرعة.",
      },
      {
        en: "Negotiate split air/land freight without eroding total margin.",
        ar: "التفاوض على شحن هجين (جوي/بري) دون استنزاف الهامش.",
      },
      {
        en: "Establish dual-sourcing resilience for next season.",
        ar: "بناء مرونة التوريد المزدوج للموسم القادم.",
      },
    ],
    openingPrompt:
      "Port congestion just pushed sea-freight lead times from 14 to 29 days—which means 40% of our peak-season stock won't arrive on time. Switching everything to air freight wipes out our quarterly margin. What is your recovery strategy?",
    complications: [
      "Our top retail distributor is already threatening SLA penalties if priority SKUs aren't on shelves by the 10th. Which items get expedited air freight and which go overland?",
      "A secondary regional vendor can supply 30% of the gap immediately, but their unit price is 9% higher. Do you approve that vendor—and how do you verify quality compliance fast?",
      "Give me a crisp summary of the blended freight cost impact and one long-term change to prevent this bottleneck next year.",
    ],
    targetExpressions: ["lead time", "throughput", "contingency plan", "vendor"],
    recommendedFollowUps: ["ws-international-comm", "ws-business-negotiation"],
  },
  {
    id: "ws-investor-pitch",
    category: "industry",
    title: {
      en: "14. Startup Investor Pitch & Due Diligence",
      ar: "١٤. عرض استثماري أمام مستثمري رأس المال الجريء",
    },
    summary: {
      en: "Pitch a $3M Series A round to a sharp VC investor who probes churn, scalability, and competitive moat.",
      ar: "قدّم جولة تمويل بقيمة ٣ ملايين دولار أمام مستثمر يفحص معدل الانسحاب وقابلية التوسّع والميزة التنافسية.",
    },
    learnerRole: { en: "Startup Founder / CEO", ar: "مؤسس شركة ناشئة" },
    defaultRole: "investor",
    recommendedRoles: ["investor", "company-director", "marketing-specialist"],
    objectives: [
      {
        en: "Pitch a crisp value proposition and traction proof in 30 seconds.",
        ar: "تقديم القيمة المضافة وأرقام النمو بوضوح خلال ٣٠ ثانية.",
      },
      {
        en: "Defend scalability, churn control, and capital allocation.",
        ar: "الدفاع عن قابلية التوسع وخفض الانسحاب وتوزيع الاستثمار.",
      },
      {
        en: "Navigate due-diligence questions candidly without hype.",
        ar: "الإجابة بصراحة وموضوعية على أسئلة العناية الواجبة.",
      },
    ],
    openingPrompt:
      "I've reviewed your deck ahead of our meeting. You're raising $3 million at a strong valuation, and growth looks solid—but tell me plainly: what is your defensible moat if a global tech giant copies your core feature next year?",
    complications: [
      "Good positioning—now let's look at the numbers. Your onboarding relies heavily on manual account managers. How does that scale cleanly to 500 enterprise clients without destroying gross margin?",
      "Your Q1 churn ticked up to 6%. What drove those cancellations, and what evidence proves your retention fix is actually working?",
      "Assuming we move into due diligence next week, how specifically will you deploy this $3 million over the next 18 months to hit Series B milestones?",
    ],
    targetExpressions: ["scalability", "churn", "due diligence", "value proposition"],
    recommendedFollowUps: ["ws-business-presentation", "ws-business-negotiation"],
  },
];

export function getWorkshopScenario(id: string): WorkshopScenario | undefined {
  return WORKSHOP_SCENARIOS.find((s) => s.id === id);
}
