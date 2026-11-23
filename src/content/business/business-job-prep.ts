import type { Bilingual } from "@/content/lesson-types";
import type { InterviewQuestionItem } from "./business-types";

export const CV_TRANSFORMATIONS: {
  weak: string;
  strong: string;
  why: Bilingual;
}[] = [
  {
    weak: "Responsible for answering customer emails and helping with problems.",
    strong:
      "Resolved 45+ daily B2B client inquiries with a 96% satisfaction score, reducing average response time by 32%.",
    why: {
      en: "Replaces passive duties with an active past-tense verb ('Resolved') plus concrete measurable metrics.",
      ar: "يستبدل الوصف العام بفعل إنجاز قوي وأرقام ملموسة تثبت الأثر الفعلي.",
    },
  },
  {
    weak: "Worked in a team to make a new company website.",
    strong:
      "Collaborated with a 5-person engineering and design squad to launch a bilingual customer portal, boosting mobile conversions by 24%.",
    why: {
      en: "Shows team scale, exact deliverable, and clear business outcome.",
      ar: "يوضّح حجم الفريق والمخرج الفعلي والنتيجة التجارية الملموسة.",
    },
  },
  {
    weak: "Good at Excel and writing reports for the boss.",
    strong:
      "Automated weekly KPI dashboards in Excel and Power BI, cutting executive reporting prep time from 6 hours to 45 minutes.",
    why: {
      en: "Proves technical proficiency through time saved rather than claiming 'good at'.",
      ar: "يثبت المهارة التقنية بمقدار الوقت الموفَّر بدل الاكتفاء بعبارة «جيد في».",
    },
  },
];

export const COVER_LETTER_BLUEPRINT = {
  structure: [
    {
      step: "1. Crisp Opening Hook",
      arabic: "افتتاحية مركّزة ومباشرة",
      tip: {
        en: "Name the exact role, where you saw it, and one standout metric matching their core need.",
        ar: "اذكر المسمى الوظيفي بدقة وإنجازًا بارزًا يرتبط مباشرة بحاجة الشركة.",
      },
    },
    {
      step: "2. Evidence-Backed Value Match",
      arabic: "ربط خبرتك بمتطلبات الوظيفة",
      tip: {
        en: "Connect 2 specific achievements directly to keywords from the job description.",
        ar: "اربط إنجازين محددين بالكلمات المفتاحية في إعلان الوظيفة.",
      },
    },
    {
      step: "3. Company Motivation & Polite Close",
      arabic: "سبب اختيارك للشركة وخاتمة مهنية",
      tip: {
        en: "Mention one real initiative or market strength of the employer and express readiness for an interview.",
        ar: "اذكر ميزة حقيقية في الشركة وأبدِ استعدادك لمقابلة لمناقشة القيمة التي ستضيفها.",
      },
    },
  ],
  modelLetter: `Dear Hiring Manager,

I am writing to apply for the Senior Operations Coordinator role at Horizon Logistics. Over the past four years in regional freight management, I have streamlined customs documentation across three hubs, cutting average shipment turnaround times by 28%.

Your job description highlights cross-border vendor management and SLA tracking. In my current role at Gulf Transit, I manage 14 regional carriers, renegotiated annual freight contracts to save 11% in operating overhead, and built an automated delay-alert tracker used daily by senior leadership.

I admire Horizon Logistics' recent expansion into sustainable cold-chain corridors and would welcome the opportunity to discuss how my operational background can support your Q4 growth targets.

Kind regards,
Tariq Al-Otaibi`,
};

export const JOB_DESCRIPTION_DECODER: {
  phrase: string;
  realMeaning: Bilingual;
  howToRespond: Bilingual;
}[] = [
  {
    phrase: "Thrives in a fast-paced, ambiguous environment",
    realMeaning: {
      en: "Priorities shift quickly and you won't always get step-by-step instructions.",
      ar: "الأولويات تتغير بسرعة وستحتاج للمبادرة دون انتظار تعليمات تفصيلية لكل خطوة.",
    },
    howToRespond: {
      en: "Share an example where you created structure or a checklist during a sudden change.",
      ar: "اذكر مثالًا نجحت فيه بوضع نظام واضح أثناء تغيير مفاجئ.",
    },
  },
  {
    phrase: "Strong stakeholder management skills",
    realMeaning: {
      en: "You must align people from Finance, Legal, Tech, or clients who don't report to you.",
      ar: "قدرتك على إقناع والتنسيق مع إدارات أو عملاء ليسوا تحت إدارتك المباشرة.",
    },
    howToRespond: {
      en: "Describe a project where you resolved competing priorities diplomatically.",
      ar: "اشرح موقفًا وفّقت فيه بين أولويات متعارضة بين إدارتين بدبلوماسية.",
    },
  },
  {
    phrase: "Data-driven decision maker",
    realMeaning: {
      en: "You back recommendations with KPIs, metrics, or customer evidence rather than guesswork.",
      ar: "تبني توصياتك على الأرقام ومؤشرات الأداء والأدلة بدل التخمين.",
    },
    howToRespond: {
      en: "Quote exact percentages, hours saved, or revenue impact in your CV and interview.",
      ar: "اذكر نسبًا مئوية دقيقة أو ساعات موفّرة أو أثرًا ماليًا في سيرتك ومقابلتك.",
    },
  },
  {
    phrase: "Self-starter with high ownership",
    realMeaning: {
      en: "You spot problems early, propose solutions proactively, and follow through to completion.",
      ar: "تكتشف المشكلات مبكرًا وتقترح الحلول وتتابع التنفيذ حتى النهاية دون تذكير مستمر.",
    },
    howToRespond: {
      en: "Prepare a STAR story where you fixed a recurring bottleneck before being asked.",
      ar: "جهّز قصة STAR عن عائق متكرر عالجته بمبادرة ذاتية قبل أن يُطلب منك.",
    },
  },
];

export const INTERVIEW_QUESTION_BANK: InterviewQuestionItem[] = [
  {
    id: "int-01",
    type: "career-goals",
    question: "Tell me about yourself and why you are interested in this role.",
    arabicHint: "حدّثنا عن نفسك ولماذا تهتم بهذه الوظيفة تحديدًا؟",
    whatInterviewersTest: {
      en: "Clarity, relevance (Present → Past → Future), and genuine research into the company.",
      ar: "الوضوح وربط الحاضر بالماضي والمستقبل ومدى معرفتك الفعلية بالشركة.",
    },
    modelsByLevel: {
      A2: "I am a business graduate with two years of customer-service experience. I helped clients solve daily order problems and learned teamwork. I want to join your company because it is growing and I want to develop my career here.",
      B1: "I'm an operations specialist with three years of experience coordinating regional deliveries. In my current job, I manage supplier schedules and improved on-time delivery by 15%. I'm excited about this role because your company is expanding into new regional hubs, and I'd love to contribute my logistics skills.",
      B2: "I'm a supply-chain coordinator with four years of experience optimising regional freight networks. Currently, I oversee twelve carrier accounts and recently reduced turnaround times by 22% by standardising customs checklists. I'm particularly drawn to this role because your team is scaling automated logistics, and I want to bring my hands-on vendor experience to that growth.",
      C1: "Over the past five years, I've focused on turning complex regional logistics into predictable, low-friction operations. In my current role at Gulf Transit, I led a cross-border compliance overhaul that trimmed turnaround times by 28% while saving 11% in annual carrier spend. What draws me to Horizon is your investment in sustainable cold-chain infrastructure—an exact intersection of my operational track record and long-term career direction.",
      C2: "My career has centred on building resilient regional operations where service reliability and cost discipline reinforce one another. Most recently, I spearheaded a multi-hub customs digitisation programme that cut cycle times by 28% and lifted enterprise client retention to 95%. Horizon's strategic push into sustainable cold-chain corridors represents precisely the high-complexity mandate where I can deliver immediate operational leverage.",
    },
  },
  {
    id: "int-02",
    type: "behavioural-star",
    question:
      "Tell me about a time you handled a tight deadline or unexpected setback at work (Use STAR).",
    arabicHint:
      "أخبرنا عن موقف واجهت فيه موعدًا نهائيًا ضيقًا أو عقبة مفاجئة وكيف تعاملت معها (STAR).",
    whatInterviewersTest: {
      en: "Structured STAR storytelling (Situation, Task, Action, Result) and calm composure under pressure.",
      ar: "تنظيم الإجابة وفق STAR (الموقف، المهمة، الإجراء، النتيجة) والثبات تحت الضغط.",
    },
    modelsByLevel: {
      A2: "Last year, our supplier was late two days before a big event. I had to find a fast solution. I called two local suppliers and ordered the missing items quickly. Everything arrived on time and the event succeeded.",
      B1: "During a major client launch last quarter, our primary shipping partner delayed a key delivery by 48 hours. As coordinator, I needed to keep the launch on schedule. I contacted our backup carrier, reorganised the delivery order, and updated the client transparently. As a result, the launch went ahead on time with zero complaints.",
      B2: "Two days before a flagship product rollout, our main packaging vendor notified us of a machinery breakdown. My task was to prevent a costly two-week launch delay. I immediately activated our secondary vendor list, negotiated a split shipment for priority branches, and kept stakeholders updated twice daily. Consequently, 100% of Tier-1 stores launched on schedule, and we later made dual-sourcing our standard policy.",
      C1: "Ahead of a high-stakes Q4 rollout, our primary vendor suffered an unexpected plant outage with only 72 hours to spare. Charged with protecting the launch window, I audited branch inventory, negotiated an expedited split-shipment with a backup supplier, and aligned Sales and Operations on revised allocation priorities. Every flagship branch launched on time, saving an estimated $180,000 in delayed revenue and prompting a permanent dual-sourcing contingency protocol.",
      C2: "With 72 hours remaining before a flagship Q4 launch, our sole packaging supplier experienced an unscheduled plant outage that threatened a two-week slip. Tasked with safeguarding commercial commitments without eroding margins, I triaged regional stock, negotiated a rapid split-run with a pre-vetted secondary vendor, and instituted concise twice-daily executive briefings. All Tier-1 sites launched seamlessly—protecting $180,000 in projected revenue—and the playbook I authored subsequently became our firm-wide supply-resilience standard.",
    },
  },
  {
    id: "int-03",
    type: "behavioural-star",
    question:
      "Describe a situation where you had a disagreement with a colleague and how you resolved it.",
    arabicHint: "صف موقفًا اختلفت فيه مهنيًا مع زميل وكيف توصّلتما لحل.",
    whatInterviewersTest: {
      en: "Emotional intelligence, focus on data/shared goals, and zero blaming.",
      ar: "الذكاء العاطفي والتركيز على الأدلة والأهداف المشتركة دون إلقاء اللوم.",
    },
    modelsByLevel: {
      A2: "My colleague wanted to finish a report quickly, but I wanted to check the numbers carefully. We talked calmly and agreed to split the work. We checked everything together and finished on time.",
      B1: "A colleague in Sales wanted to promise a one-week setup to a new client, while I knew Technical Setup needed two weeks. I invited him for a quick coffee to walk through the checklist together. We agreed to offer a phased launch—core features in week one and full analytics in week two—which kept the client very happy.",
      B2: "During a CRM migration, our Marketing lead pushed for an immediate cutover, whereas I was concerned about data-loss risks. Instead of arguing over email, I arranged a 20-minute workshop to review error rates from our pilot test. Looking at the evidence together, we agreed on a three-day parallel run, which resolved two critical sync bugs before go-live.",
      C1: "While preparing a regional pricing revamp, Finance favoured a uniform 12% increase, while my analysis showed high churn risk among mid-market accounts. I set up a focused working session to walk through segment-level elasticity data rather than debating opinions. By anchoring on shared net-revenue targets, we co-designed a tiered adjustment that preserved 96% mid-market retention while hitting Finance's margin goal.",
      C2: "During a strategic repricing review, Finance advocated a flat 12% uplift, whereas my retention modelling flagged severe elasticity risk across mid-market clients. Rather than escalating prematurely, I convened a data-led session centred on our shared net-revenue mandate. Together we engineered a tiered pricing architecture paired with annual-lock incentives, hitting Finance's margin target while sustaining 96% retention.",
    },
  },
  {
    id: "int-04",
    type: "competency",
    question: "What is one professional weakness you are actively working to improve?",
    arabicHint: "ما هي نقطة ضعف مهنية تعمل بجد على تطويرها حاليًا؟",
    whatInterviewersTest: {
      en: "Authentic self-awareness + concrete corrective habit (avoid fake clichés like 'I work too hard').",
      ar: "الوعي الذاتي الصادق مقترنًا بخطوة تطوير عملية (تجنّب الإجابات المكررة مثل «أعمل أكثر من اللازم»).",
    },
    modelsByLevel: {
      A2: "Sometimes I feel nervous when speaking to large groups. To improve, I practise my presentations aloud twice and volunteer to share short updates in weekly meetings. Now I feel much more confident.",
      B1: "Earlier in my career, I hesitated to delegate detailed tasks because I wanted everything perfect. Over the past year, I've started writing clear checklists and coaching junior teammates instead. That has freed up my time for strategic planning and helped my colleagues grow.",
      B2: "I used to spend too much time polishing internal slides when a concise one-page brief would have been faster. To fix that, I now ask stakeholders upfront whether they need an executive summary or a deep dive, and I time-box deck preparation. It has made my updates noticeably sharper and saved several hours each week.",
      C1: "Historically, I leaned toward over-preparing technical detail before presenting to non-technical executives. Recognising that senior leaders need the strategic takeaway first, I adopted the 'bottom-line up front' structure—opening every briefing with the decision required and keeping technical appendices optional. Stakeholders have since praised the clarity and speed of my reviews.",
      C2: "Earlier in my leadership trajectory, I tended to over-index on exhaustive technical validation prior to executive briefings, occasionally burying the strategic headline. Over the past eighteen months, I systematically adopted a BLUF (bottom-line up front) discipline—anchoring discussions on commercial trade-offs first and holding granular diagnostics in reserve—which has noticeably accelerated board decision-making.",
    },
  },
  {
    id: "int-05",
    type: "salary",
    question: "What are your salary expectations for this position?",
    arabicHint: "ما توقعاتك للراتب في هذه الوظيفة؟",
    whatInterviewersTest: {
      en: "Market awareness, composure, and collaborative negotiation without underselling yourself.",
      ar: "الوعي بسوق العمل والاتزان والتفاوض التعاوني دون بخس قيمتك المهنية.",
    },
    modelsByLevel: {
      A2: "Based on my research for this role, I am looking for a fair salary in the market range. I am happy to discuss the full package once we agree I am a good fit.",
      B1: "Based on market rates for this role and my three years of experience, I'm targeting a monthly package in the range of [X to Y]. Of course, I'm open to discussing the total benefits and growth opportunities together.",
      B2: "From my market research and four years of regional project experience, a total compensation range of [X to Y] feels aligned with the scope of this role. That said, I'm keen to consider the complete package—including performance bonus, learning allowance, and progression path.",
      C1: "Given the scope of the role and my track record delivering measurable cost savings across regional hubs, I would expect total compensation in the [X to Y] range. Naturally, I view base salary alongside variable incentives and long-term impact, and I'd be glad to understand how your band is structured.",
      C2: "Anchored on regional market benchmarks and the commercial scope we've discussed, I'm targeting a total package in the [X to Y] bracket. I evaluate compensation holistically—weighing base pay alongside performance incentives and leadership remit—so I'd welcome learning how your compensation framework aligns with that range.",
    },
  },
  {
    id: "int-06",
    type: "competency",
    question: "Do you have any questions for us?",
    arabicHint: "هل لديك أي أسئلة تودّ طرحها علينا؟",
    whatInterviewersTest: {
      en: "Strategic curiosity, preparation, and genuine interest in excelling during the first 90 days.",
      ar: "الفضول المهني والاستعداد الجيد والرغبة الحقيقية في تحقيق أثر ملموس.",
    },
    modelsByLevel: {
      A2: "Yes, thank you. What does a typical day look like in this team, and what are the most important skills for the first three months?",
      B1: "Yes—what would success look like for the person in this role during the first 90 days, and which teams would I collaborate with most closely?",
      B2: "I do, thank you. First, what is the biggest operational priority this team is aiming to solve over the next two quarters? Second, how do you measure high performance during the first 90 days?",
      C1: "Yes—two brief questions. First, looking six months ahead, what measurable outcome would tell you this hire has been an unqualified success? Second, how does leadership balance rapid expansion with maintaining service quality across new regions?",
      C2: "Thank you—two strategic questions. First, as you scale into new corridors this year, which cross-functional bottleneck would you want the incoming lead to tackle in the first 90 days? Second, what differentiates top-quartile performers in your leadership culture over the long term?",
    },
  },
];

export const SALARY_NEGOTIATION_SCRIPTS: {
  scenario: Bilingual;
  script: string;
}[] = [
  {
    scenario: {
      en: "Countering an offer that is 10–15% below your target",
      ar: "تقديم عرض مضاد عندما يقل العرض المبدئي بنسبة ١٠–١٥٪ عن توقعك",
    },
    script:
      "Thank you so much for the offer—I'm genuinely excited about joining the team and contributing to the Q4 expansion. Based on market benchmarks and the cross-border vendor experience I'm bringing, I was hoping to land closer to [Target]. Is there room to move toward that figure, or bridge the gap with a signing bonus or six-month performance review?",
  },
  {
    scenario: {
      en: "Negotiating non-salary benefits when base pay is fixed",
      ar: "التفاوض على المزايا غير النقدية عندما يكون الراتب الأساسي ثابتًا",
    },
    script:
      "I completely understand that base salary bands are tightly structured. If base pay is fixed at [Offer], could we explore flexibility on two days of remote work, an annual certification allowance, or an accelerated review after six months tied to clear KPIs?",
  },
];

export const WORKPLACE_ETIQUETTE_TIPS: {
  title: Bilingual;
  body: Bilingual;
}[] = [
  {
    title: { en: "Punctuality & Calendar Respect", ar: "احترام الوقت والتقويم" },
    body: {
      en: "Join calls 2 minutes early, send advance notice if delayed by even 5 minutes, and never book meetings without a clear agenda.",
      ar: "انضم للمكالمات قبل دقيقتين، وأبلغ مسبقًا عند أي تأخير ولو لخمس دقائق، ولا تحجز اجتماعًا بلا جدول أعمال واضح.",
    },
  },
  {
    title: { en: "Email Clarity & CC Discipline", ar: "وضوح البريد وضبط النسخ (CC)" },
    body: {
      en: "Keep subject lines specific, highlight action items in bold, and avoid unnecessary 'Reply All' loops.",
      ar: "اجعل عنوان الرسالة محددًا، وأبرز المهام المطلوبة بوضوح، وتجنّب «الرد على الجميع» دون داعٍ.",
    },
  },
  {
    title: { en: "Cross-Cultural Tone & Directness", ar: "مراعاة التنوع الثقافي في النبرة" },
    body: {
      en: "In global teams, pair polite framing ('Could we consider...') with crystal-clear written summaries so politeness never hides deadlines.",
      ar: "في الفرق الدولية اجمع بين اللباقة والوضوح الكتابي الصريح حتى لا تضيع المواعيد وسط المجاملات.",
    },
  },
  {
    title: { en: "Proactive First-90-Days Habits", ar: "عادات النجاح في أول ٩٠ يومًا" },
    body: {
      en: "Listen deeply in month one, map key stakeholders, deliver one visible quick win by day 60, and ask for structured feedback by day 90.",
      ar: "استمع بعمق في الشهر الأول، وتعرّف على أصحاب المصلحة، وحقّق إنجازًا ملموسًا خلال ٦٠ يومًا، واطلب تقييمًا منظمًا في اليوم ٩٠.",
    },
  },
];
