import type { Bilingual } from "@/content/lesson-types";
import type { BusinessExpressionCategory, BusinessExpressionEntry } from "./business-types";
import { BUSINESS_EXTRA_IDIOMS } from "./business-idioms-bank";

export const BUSINESS_EXPRESSION_CATEGORIES: {
  id: BusinessExpressionCategory;
  label: Bilingual;
}[] = [
  { id: "idioms", label: { en: "Business Idioms", ar: "التعابير الاصطلاحية للأعمال" } },
  { id: "workplace", label: { en: "Workplace Expressions", ar: "تعابير بيئة العمل اليومية" } },
  {
    id: "phrasal-verbs",
    label: { en: "Business Phrasal Verbs", ar: "الأفعال المركبة في الأعمال" },
  },
  { id: "negotiation", label: { en: "Negotiation Expressions", ar: "عبارات التفاوض" } },
  { id: "meetings", label: { en: "Meeting Expressions", ar: "عبارات الاجتماعات" } },
  { id: "management", label: { en: "Management & Leadership", ar: "تعابير الإدارة والقيادة" } },
  { id: "corporate", label: { en: "Corporate Communication", ar: "الاتصال المؤسسي" } },
];

export const BUSINESS_EXPRESSIONS: BusinessExpressionEntry[] = [
  // Idioms (4)
  {
    id: "expr-1",
    category: "idioms",
    expression: "get on the same page",
    meaning: "To reach a shared understanding of goals, facts, or next steps before acting.",
    arabic: "نصل إلى فهم وتوافق مشترك قبل التنفيذ",
    formality: "neutral-business",
    context: {
      en: "Opening a cross-team sync or resolving a misalignment politely.",
      ar: "افتتاح اجتماع تنسيقي أو توحيد الرؤى بين فريقين بلباقة.",
    },
    example: "Let's spend five minutes reviewing the timeline so everyone is on the same page.",
  },
  {
    id: "expr-2",
    category: "idioms",
    expression: "move the needle",
    meaning: "To produce a clear, measurable impact on a key business metric rather than busywork.",
    arabic: "يُحدث أثرًا ملموسًا وفارقًا حقيقيًا في النتائج",
    formality: "neutral-business",
    context: {
      en: "Prioritising high-impact projects during quarterly planning.",
      ar: "ترتيب الأولويات واختيار المبادرات ذات العائد الأعلى.",
    },
    example:
      "Let's focus our Q2 budget on the two campaigns that will genuinely move the needle on retention.",
  },
  {
    id: "expr-3",
    category: "idioms",
    expression: "cut corners",
    meaning: "To save time or money by lowering quality or skipping essential standards.",
    arabic: "يتساهل في الجودة أو يختصر الخطوات الأساسية لتوفير التكلفة",
    formality: "neutral-business",
    context: {
      en: "Warning against unsafe cost reductions in engineering, compliance, or service.",
      ar: "التحذير من تقليص الجودة على حساب السلامة أو السمعة.",
    },
    example: "We can trim non-essential extras, but we will not cut corners on patient safety.",
  },
  {
    id: "expr-4",
    category: "idioms",
    expression: "ahead of the curve",
    meaning: "Adopting new standards, skills, or technologies earlier than competitors.",
    arabic: "سبّاق ومتقدّم على اتجاهات السوق والمنافسين",
    formality: "neutral-business",
    context: {
      en: "Strategy discussions, innovation pitches, and executive updates.",
      ar: "مناقشات الاستراتيجية والابتكار وتقارير الإدارة العليا.",
    },
    example: "Training staff in AI governance early keeps our firm ahead of the curve.",
  },

  // Workplace Expressions (4)
  {
    id: "expr-5",
    category: "workplace",
    expression: "keep someone in the loop",
    meaning: "To keep a colleague or stakeholder regularly informed about updates.",
    arabic: "يُبقي شخصًا على اطلاع دائم بالمستجدات",
    formality: "casual-office",
    context: {
      en: "Emails and team chats when coordinating multi-person tasks.",
      ar: "رسائل البريد والدردشة العملية عند تنسيق مهام مشتركة.",
    },
    example: "I've copied Finance on this thread to keep them in the loop on the revised quote.",
  },
  {
    id: "expr-6",
    category: "workplace",
    expression: "have a lot on one's plate",
    meaning: "To have a very heavy workload or many active commitments right now.",
    arabic: "لديه الكثير من المهام والأعباء حاليًا",
    formality: "casual-office",
    context: {
      en: "Discussing team capacity honestly without sounding defensive.",
      ar: "مناقشة ضغط العمل بمهنية ولباقة دون تذمّر.",
    },
    example: "Sara already has a lot on her plate this week, so I'll take the client summary.",
  },
  {
    id: "expr-7",
    category: "workplace",
    expression: "touch base",
    meaning: "To check in briefly with a colleague or client to share a quick update.",
    arabic: "يتواصل سريعًا للاطمئنان أو مراجعة آخر المستجدات",
    formality: "casual-office",
    context: {
      en: "Scheduling a short follow-up call or friendly client check-in.",
      ar: "ترتيب اتصال متابعة قصير مع زميل أو عميل.",
    },
    example: "Let's touch base for ten minutes on Thursday to confirm the launch assets.",
  },
  {
    id: "expr-8",
    category: "workplace",
    expression: "flag an issue early",
    meaning: "To highlight a potential risk or delay promptly so the team can fix it in time.",
    arabic: "ينبّه إلى مشكلة أو خطر مبكرًا قبل تفاقمه",
    formality: "neutral-business",
    context: {
      en: "Project status updates and proactive risk escalation.",
      ar: "تقارير حالة المشروع والتصعيد الاستباقي للمخاطر.",
    },
    example: "Thanks for flagging the customs delay early—we still have time to reroute.",
  },

  // Business Phrasal Verbs (4)
  {
    id: "expr-9",
    category: "phrasal-verbs",
    expression: "roll out",
    meaning:
      "To introduce a new product, system, or company policy systematically, often in stages.",
    arabic: "يطرح أو يطبّق نظامًا أو سياسة جديدة تدريجيًا",
    formality: "neutral-business",
    context: {
      en: "IT launches, HR policies, and multi-branch expansions.",
      ar: "إطلاق الأنظمة والسياسات الجديدة عبر الفروع.",
    },
    example:
      "We will roll out the new CRM platform to the Riyadh branch first before scaling nationwide.",
  },
  {
    id: "expr-10",
    category: "phrasal-verbs",
    expression: "follow up on",
    meaning: "To check progress or take the next step after an earlier email, meeting, or promise.",
    arabic: "يتابع تنفيذ نقطة أو طلب سابق",
    formality: "neutral-business",
    context: {
      en: "Polite reminder emails, sales follow-ups, and post-interview notes.",
      ar: "رسائل التذكير المهذبة ومتابعة العملاء أو المقابلات.",
    },
    example: "I'm writing to follow up on the revised proposal we discussed on Monday.",
  },
  {
    id: "expr-11",
    category: "phrasal-verbs",
    expression: "scale back",
    meaning: "To intentionally reduce the size, scope, or spending of a plan.",
    arabic: "يقلّص نطاق مشروع أو إنفاقًا بشكل مدروس",
    formality: "formal-executive",
    context: {
      en: "Budget adjustments, risk management, and quarterly forecasting.",
      ar: "تعديل الميزانيات وإعادة تحجيم الخطط عند تغيّر السوق.",
    },
    example:
      "Given higher freight rates, we decided to scale back promotional discounts this quarter.",
  },
  {
    id: "expr-12",
    category: "phrasal-verbs",
    expression: "sign off on",
    meaning: "To give formal final approval for a budget, document, or deliverable.",
    arabic: "يعتمد رسميًا أو يوقّع بالموافقة النهائية على عمل",
    formality: "neutral-business",
    context: {
      en: "Approvals across Finance, Legal, and senior leadership.",
      ar: "الاعتمادات النهائية من المالية أو القانونية أو الإدارة.",
    },
    example: "Once Legal signs off on the clause, we can send the contract for signature.",
  },

  // Negotiation Expressions (4)
  {
    id: "expr-13",
    category: "negotiation",
    expression: "meet halfway",
    meaning: "To reach a fair compromise where both sides make a balanced concession.",
    arabic: "يلتقي في منتصف الطريق عبر تنازل متوازن من الطرفين",
    formality: "neutral-business",
    context: {
      en: "Closing a pricing, timeline, or salary gap constructively.",
      ar: "تقريب الفجوة في الأسعار أو المواعيد أو الراتب بإيجابية.",
    },
    example:
      "We can't offer a 20% discount, but we can meet you halfway at 10% on a two-year term.",
  },
  {
    id: "expr-14",
    category: "negotiation",
    expression: "a deal-breaker",
    meaning: "A non-negotiable point that will cause one party to walk away if not resolved.",
    arabic: "شرط جوهري لا يمكن التنازل عنه وإلا تفشل الصفقة",
    formality: "neutral-business",
    context: {
      en: "Identifying red lines cleanly during contract or job-offer talks.",
      ar: "تحديد الخطوط الحمراء بوضوح أثناء التفاوض.",
    },
    example: "Data-residency compliance is a deal-breaker for our banking clients.",
  },
  {
    id: "expr-15",
    category: "negotiation",
    expression: "sweeten the deal",
    meaning:
      "To add an extra benefit—such as training or faster support—to make an offer more attractive.",
    arabic: "يضيف ميزة إضافية تجعل العرض أكثر جاذبية دون خفض السعر",
    formality: "casual-office",
    context: {
      en: "Holding firm on base price while adding low-cost, high-value extras.",
      ar: "الحفاظ على السعر الأساسي مع إضافة خدمات قيمة للعميل.",
    },
    example: "To sweeten the deal without lowering fees, we included complimentary staff training.",
  },
  {
    id: "expr-16",
    category: "negotiation",
    expression: "conditional upon",
    meaning:
      "Formal wording showing that a concession depends directly on the other side fulfilling a term.",
    arabic: "مشروطٌ بـ (ربط التنازل بالتزام مقابل)",
    formality: "formal-executive",
    context: {
      en: "Written proposals, procurement bids, and executive contract talks.",
      ar: "العروض المكتوبة والمناقصات والعقود التنفيذية.",
    },
    example: "The volume rebate is conditional upon placing confirmed orders before 30 June.",
  },

  // Meeting Expressions (4)
  {
    id: "expr-17",
    category: "meetings",
    expression: "table an item / park that for now",
    meaning:
      "To pause a side topic politely so the meeting stays on schedule, returning to it later.",
    arabic: "يؤجّل مناقشة نقطة جانبية مؤقتًا للحفاظ على وقت الاجتماع",
    formality: "neutral-business",
    context: {
      en: "Keeping meetings focused when a side issue threatens to derail the agenda.",
      ar: "ضبط إيقاع الاجتماع ومنع التشتت في نقاط فرعية.",
    },
    example: "That's an important point—let's park it for now and add it to Thursday's deep dive.",
  },
  {
    id: "expr-18",
    category: "meetings",
    expression: "circle back to",
    meaning: "To return to an earlier question or unresolved point once more data is available.",
    arabic: "يعود لاحقًا لمناقشة نقطة بعد استكمال بياناتها",
    formality: "neutral-business",
    context: {
      en: "Acknowledging a stakeholder's question when you need to verify figures first.",
      ar: "الرد المهني عندما تحتاج للتحقق من أرقام قبل إعطاء إجابة قاطعة.",
    },
    example:
      "I'll verify the regional freight rates with Operations and circle back to you by 3 p.m.",
  },
  {
    id: "expr-19",
    category: "meetings",
    expression: "take this offline",
    meaning:
      "To continue a detailed side conversation separately with only the directly relevant people.",
    arabic: "نستكمل مناقشة هذه التفصيلة جانبًا بين المعنيين فقط",
    formality: "neutral-business",
    context: {
      en: "Respecting everyone's time in large cross-functional meetings.",
      ar: "احترام وقت الحضور عند ظهور نقاش تقني يخص شخصين فقط.",
    },
    example:
      "Let's take the API authentication details offline after this call so we respect everyone's time.",
  },
  {
    id: "expr-20",
    category: "meetings",
    expression: "walk someone through",
    meaning: "To guide colleagues step by step through a slide deck, spreadsheet, or process.",
    arabic: "يشرح عرضًا أو ملفًا خطوة بخطوة للحضور",
    formality: "neutral-business",
    context: {
      en: "Starting a presentation or demo smoothly.",
      ar: "بدء شرح شرائح العرض التقديمي أو جدول البيانات بسلاسة.",
    },
    example: "Let me walk you through the three key findings from our Q1 customer survey.",
  },

  // Management & Leadership (4)
  {
    id: "expr-21",
    category: "management",
    expression: "lead by example",
    meaning: "To model the professionalism, integrity, and standards you expect from your team.",
    arabic: "يقود بالقدوة العملية قبل التوجيه اللفظي",
    formality: "formal-executive",
    context: {
      en: "Leadership interviews, culture workshops, and management reviews.",
      ar: "مقابلات القيادة وورش الثقافة المؤسسية.",
    },
    example:
      "Managers build lasting trust when they lead by example during high-pressure launches.",
  },
  {
    id: "expr-22",
    category: "management",
    expression: "step up to the plate",
    meaning: "To take initiative and assume responsibility during a critical moment.",
    arabic: "يبادر ويتحمّل المسؤولية في موقف حاسم",
    formality: "neutral-business",
    context: {
      en: "Recognising an employee who took ownership during an unexpected challenge.",
      ar: "تقدير موظف أظهر مبادرة قيادية وقت الأزمة.",
    },
    example:
      "When our lead engineer fell ill, Tariq stepped up to the plate and guided the release.",
  },
  {
    id: "expr-23",
    category: "management",
    expression: "manage expectations",
    meaning:
      "To communicate realistic timelines and limits clearly upfront to prevent disappointment later.",
    arabic: "يدير التوقعات بواقعية ووضوح منذ البداية",
    formality: "formal-executive",
    context: {
      en: "Client kick-offs, executive reporting, and project-delay briefings.",
      ar: "اجتماعات بدء المشروع والتعامل مع العملاء والإدارة العليا.",
    },
    example:
      "Managing expectations early about the two-week compliance review saved us from frustration later.",
  },
  {
    id: "expr-24",
    category: "management",
    expression: "give constructive feedback",
    meaning: "To offer specific, respectful guidance focused on improving future performance.",
    arabic: "يقدّم ملاحظات بنّاءة وموضوعية تهدف للتطوير",
    formality: "formal-executive",
    context: {
      en: "1-on-1 coaching, performance appraisals, and peer code/proposal reviews.",
      ar: "جلسات التوجيه الفردي وتقييم الأداء ومراجعة الأعمال.",
    },
    example:
      "Effective mentors give constructive feedback tied to observable behaviour rather than personality.",
  },

  // Corporate Communication (4)
  {
    id: "expr-25",
    category: "corporate",
    expression: "in line with",
    meaning: "Consistent with an approved policy, budget, strategy, or industry standard.",
    arabic: "بما يتماشى مع / وفقًا لـ",
    formality: "formal-executive",
    context: {
      en: "Board papers, audit reports, and formal corporate announcements.",
      ar: "تقارير مجلس الإدارة والإعلانات الرسمية.",
    },
    example: "Q3 expenditure remained strictly in line with our approved annual operating budget.",
  },
  {
    id: "expr-26",
    category: "corporate",
    expression: "with regard to / regarding",
    meaning: "A clean, formal way to introduce a specific subject in business emails and memos.",
    arabic: "فيما يتعلّق بـ / بخصوص",
    formality: "formal-executive",
    context: {
      en: "Opening formal client emails, legal correspondence, or policy updates.",
      ar: "افتتاح رسائل البريد الرسمية والمذكرات المؤسسية.",
    },
    example:
      "With regard to your inquiry on regional licensing, our legal counsel has prepared a brief summary.",
  },
  {
    id: "expr-27",
    category: "corporate",
    expression: "at your earliest convenience",
    meaning:
      "A courteous formal request asking someone to respond or act promptly without sounding pushy.",
    arabic: "في أقرب وقت يناسبكم (طلب مهذب للاستعجال)",
    formality: "formal-executive",
    context: {
      en: "Closing formal requests to clients, senior executives, or external partners.",
      ar: "ختام الرسائل الرسمية للعملاء والقيادات والشركاء.",
    },
    example: "Please review and return the signed addendum at your earliest convenience.",
  },
  {
    id: "expr-28",
    category: "corporate",
    expression: "going forward",
    meaning: "From this point onward, especially when announcing an improved workflow or policy.",
    arabic: "من الآن فصاعدًا / في المرحلة القادمة",
    formality: "neutral-business",
    context: {
      en: "Post-mortems and operational updates focusing positively on future improvements.",
      ar: "التحديثات التشغيلية ومراجعات ما بعد المشاريع للتركيز على التحسين المستقبلي.",
    },
    example: "Going forward, all vendor invoices above $5,000 will require dual sign-off.",
  },
  ...BUSINESS_EXTRA_IDIOMS,
];
