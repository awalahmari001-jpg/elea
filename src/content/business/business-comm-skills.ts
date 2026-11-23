import type { CommunicationSkillModule } from "./business-types";

export const BUSINESS_COMM_SKILLS: CommunicationSkillModule[] = [
  {
    id: "comm-01",
    number: 1,
    title: { en: "Professional Self-Introductions", ar: "التعريف المهني بالنفس" },
    audiences: ["professionals", "job-seekers"],
    summary: {
      en: "Introduce your name, role, core focus, and value clearly in 20 seconds without sounding memorised.",
      ar: "قدّم اسمك ودورك ومجال تخصصك وقيمتك المهنية بوضوح خلال ٢٠ ثانية دون تصنّع.",
    },
    keyPhrases: [
      {
        phrase: "I lead regional operations at...",
        arabic: "أقود العمليات الإقليمية في...",
        register: "Executive",
      },
      {
        phrase: "My focus is on streamlining...",
        arabic: "ينصبّ تركيزي على تبسيط وتطوير...",
        register: "Professional",
      },
      {
        phrase: "Great to finally put a face to the name.",
        arabic: "يسعدني أخيرًا لقاؤك شخصيًا بعد التواصل عن بُعد.",
        register: "Warm Business",
      },
    ],
    realisticModel: {
      title: { en: "30-Second Conference Introduction", ar: "تعريف مهني في مؤتمر خلال ٣٠ ثانية" },
      text: "Good morning—I'm Layla Al-Harbi, Operations Lead at Gulf Logistics. I oversee cross-border freight coordination across four regional hubs, focusing on cutting customs turnaround times. Great to connect with you today.",
    },
    quickDrill: {
      prompt: "Which opening sounds most natural and professional when meeting a new client?",
      options: [
        "Good morning, I'm Tariq—I manage enterprise client onboarding here at Horizon Tech.",
        "Hello mister, my job is I am making onboarding for big clients.",
        "Hi, I am very hardworking person and my age is thirty-one.",
        "I am agree to introduce my self as employee in company.",
      ],
      correct: 0,
      explanation: {
        en: "State your name, concise role, and concrete responsibility using Present Simple ('I manage...').",
        ar: "اذكر اسمك ودورك ومسؤوليتك بوضوح ومباشرة باستخدام المضارع البسيط.",
      },
    },
  },
  {
    id: "comm-02",
    number: 2,
    title: { en: "Describing Job Responsibilities", ar: "وصف المهام والمسؤوليات الوظيفية" },
    audiences: ["professionals", "job-seekers"],
    summary: {
      en: "Replace vague phrases like 'I do many things' with active ownership verbs ('oversee', 'coordinate', 'own').",
      ar: "استبدل العبارات العامة بأفعال مهنية دقيقة تعبّر عن المسؤولية الفعلية مثل oversee وcoordinate.",
    },
    keyPhrases: [
      {
        phrase: "I'm responsible for overseeing...",
        arabic: "أنا مسؤول عن الإشراف على...",
        register: "Neutral Business",
      },
      {
        phrase: "My day-to-day role involves...",
        arabic: "يتضمن دوري اليومي...",
        register: "Neutral Business",
      },
      {
        phrase: "I report directly to the Head of Finance.",
        arabic: "أرفع تقاريري مباشرة إلى رئيس قسم المالية.",
        register: "Formal",
      },
    ],
    realisticModel: {
      title: { en: "Explaining Role Scope Clearly", ar: "شرح نطاق العمل بوضوح" },
      text: "In my current role as Project Coordinator, I'm responsible for tracking vendor milestones, coordinating weekly status reviews, and flagging budget risks before they affect delivery dates.",
    },
    quickDrill: {
      prompt: "Choose the grammatically accurate way to describe a core job duty:",
      options: [
        "I am responsible for managing our regional supplier contracts.",
        "I am responsible to manage of our regional supplier contracts.",
        "My responsibility is I manage to regional supplier contracts.",
        "I am taking responsible about regional supplier contracts.",
      ],
      correct: 0,
      explanation: {
        en: "Always follow 'responsible for' with verb-ing ('responsible for managing').",
        ar: "التركيب الصحيح دائمًا هو responsible for متبوعًا بالفعل مع ing.",
      },
    },
  },
  {
    id: "comm-03",
    number: 3,
    title: { en: "Explaining Professional Background", ar: "سرد الخبرة والمسيرة المهنية" },
    audiences: ["professionals", "job-seekers"],
    summary: {
      en: "Connect past achievements to your present strengths using Present Perfect and clean career transitions.",
      ar: "اربط إنجازاتك السابقة بمهاراتك الحالية بسلاسة باستخدام المضارع التام والماضي البسيط بدقة.",
    },
    keyPhrases: [
      {
        phrase: "I started my career in... before transitioning into...",
        arabic: "بدأت مسيرتي في... قبل الانتقال إلى...",
        register: "Professional",
      },
      {
        phrase: "Over the past five years, I've specialised in...",
        arabic: "خلال السنوات الخمس الماضية، تخصصت في...",
        register: "Professional",
      },
      {
        phrase: "That experience equipped me to...",
        arabic: "أهّلتني تلك الخبرة لـ...",
        register: "Formal",
      },
    ],
    realisticModel: {
      title: { en: "Career Story Narrative", ar: "سرد المسيرة المهنية" },
      text: "I started my career in retail banking, where I learned client risk assessment. Four years ago I transitioned into corporate fintech, and since then I've led two regional payment-platform rollouts.",
    },
    quickDrill: {
      prompt: "Which tense correctly links a past career start to ongoing experience today?",
      options: [
        "Over the last four years, I have led three cross-functional product launches.",
        "Over the last four years, I am leading three cross-functional product launches.",
        "Four years ago, I have started my career in banking.",
        "Since four years, I lead three product launches.",
      ],
      correct: 0,
      explanation: {
        en: "Use Present Perfect ('have led') with 'Over the last four years', and Past Simple with 'ago'.",
        ar: "نستخدم المضارع التام مع Over the last four years، والماضي البسيط مع ago.",
      },
    },
  },
  {
    id: "comm-04",
    number: 4,
    title: { en: "Professional Networking", ar: "بناء العلاقات المهنية (Networking)" },
    audiences: ["professionals", "job-seekers"],
    summary: {
      en: "Open authentic conversations at events, ask thoughtful open questions, and follow up memorably.",
      ar: "افتح حوارات مهنية طبيعية في المؤتمرات واطرح أسئلة ذكية وتابع التواصل بأسلوب راقٍ.",
    },
    keyPhrases: [
      {
        phrase: "What brought you to today's summit?",
        arabic: "ما الذي دفعك لحضور قمة اليوم؟",
        register: "Warm Business",
      },
      {
        phrase: "I'd love to stay in touch on LinkedIn.",
        arabic: "يسعدني أن نبقى على تواصل عبر لينكدإن.",
        register: "Warm Business",
      },
      {
        phrase: "It was great speaking with you—I'll send over that report tomorrow.",
        arabic: "سعدت بالحديث معك—سأرسل لك التقرير غدًا.",
        register: "Professional",
      },
    ],
    realisticModel: {
      title: { en: "Post-Event Follow-Up Message", ar: "رسالة متابعة بعد المؤتمر" },
      text: "Hi Omar, it was a pleasure meeting you at the Supply Chain Forum yesterday. I really enjoyed your point on regional cold-storage hubs. As promised, here is the benchmark report we mentioned—let's keep in touch!",
    },
    quickDrill: {
      prompt: "What is the best way to exit a networking conversation politely?",
      options: [
        "It's been great speaking with you—let's connect on LinkedIn, and I'll let you mingle.",
        "I am boring now, I will go talk to more important person.",
        "Give me a job please, here is my paper.",
        "Okay bye, I finished talking.",
      ],
      correct: 0,
      explanation: {
        en: "Express genuine appreciation, suggest a concrete next touchpoint, and exit gracefully.",
        ar: "عبّر عن تقديرك واقترح خطوة تواصل بسيطة وانهِ الحديث بلباقة.",
      },
    },
  },
  {
    id: "comm-05",
    number: 5,
    title: {
      en: "Writing Formal & Clear Business Emails",
      ar: "كتابة رسائل البريد الإلكتروني الرسمية",
    },
    audiences: ["professionals", "job-seekers"],
    summary: {
      en: "Structure emails with a crisp subject line, upfront purpose, scannable bullet points, and clear call to action.",
      ar: "نظّم رسائلك بعنوان واضح وهدف مباشر في السطر الأول ونقاط مرتبة وطلب محدد بالموعد.",
    },
    keyPhrases: [
      {
        phrase: "I am writing to confirm...",
        arabic: "أكتب إليكم لتأكيد...",
        register: "Formal",
      },
      {
        phrase: "Please find attached the revised proposal.",
        arabic: "تجدون مرفقًا العرض المعدّل.",
        register: "Formal",
      },
      {
        phrase: "Could you please confirm by Thursday at 3 p.m.?",
        arabic: "هل يمكنكم التأكيد قبل الساعة الثالثة من يوم الخميس؟",
        register: "Polite Action",
      },
    ],
    realisticModel: {
      title: { en: "Action-Oriented Client Email", ar: "بريد عملي واضح للعميل" },
      text: "Subject: Revised Q3 Delivery Schedule – Action Required by Thursday\n\nDear Mr. Al-Saud,\n\nThank you for your feedback during yesterday's call. Please find attached the updated Q3 delivery schedule reflecting the two-week buffer we agreed upon.\n\nCould you please confirm your approval by Thursday at 3:00 p.m. so our warehouse team can lock in carrier slots?\n\nKind regards,\nNoura Al-Mansoor",
    },
    quickDrill: {
      prompt: "Which email closing sets a clear, polite deadline?",
      options: [
        "Could you please share your feedback by Wednesday at noon so we can stay on schedule?",
        "Reply to me immediately right now.",
        "Let me know whenever maybe next month or something.",
        "You must send answer fastly.",
      ],
      correct: 0,
      explanation: {
        en: "Combining a polite modal ('Could you please...') with a specific time and reason gets faster replies.",
        ar: "الجمع بين صيغة مهذبة وموعد محدد وسبب واضح يحقق أفضل استجابة.",
      },
    },
  },
  {
    id: "comm-06",
    number: 6,
    title: { en: "Making Professional Phone Calls", ar: "إجراء المكالمات الهاتفية المهنية" },
    audiences: ["professionals", "job-seekers"],
    summary: {
      en: "State your name and purpose immediately, check availability, confirm details clearly, and handle bad audio calmly.",
      ar: "عرّف بنفسك والغرض مباشرة، وتأكد من ملاءمة الوقت، ووثّق التفاصيل الأساسية بوضوح.",
    },
    keyPhrases: [
      {
        phrase: "Is now a convenient time for a quick two-minute call?",
        arabic: "هل الوقت مناسب الآن لمكالمة سريعة لمدة دقيقتين؟",
        register: "Courteous",
      },
      {
        phrase: "Sorry, the line broke up for a second—could you repeat the reference number?",
        arabic: "عذرًا، تقطّع الصوت للحظة—هل يمكنك تكرار الرقم المرجعي؟",
        register: "Natural",
      },
      {
        phrase: "Let me confirm those details before we hang up.",
        arabic: "دعني أؤكد هذه التفاصيل قبل إنهاء المكالمة.",
        register: "Professional",
      },
    ],
    realisticModel: {
      title: { en: "Scheduling Call Opener", ar: "افتتاح مكالمة عمل احترافية" },
      text: "Good afternoon, Ms. Karim. This is Faisal from Apex Procurement calling regarding Tender #408. Is now a convenient moment for a brief two-minute check-in on the delivery specs?",
    },
    quickDrill: {
      prompt: "What is the most natural way to ask someone to repeat a figure on a noisy call?",
      options: [
        "Sorry, you broke up slightly there—could you please repeat the final figure?",
        "Your voice is bad, say again.",
        "What? I didn't hear nothing.",
        "Speak slowly because your phone is broken.",
      ],
      correct: 0,
      explanation: {
        en: "'You broke up slightly' blames the connection politely rather than the speaker.",
        ar: "عبارة you broke up slightly تنسب التشويش للاتصال بلباقة دون إحراج المتحدث.",
      },
    },
  },
  {
    id: "comm-07",
    number: 7,
    title: {
      en: "Participating in Online & Hybrid Meetings",
      ar: "المشاركة الفعّالة في الاجتماعات الافتراضية",
    },
    audiences: ["professionals", "job-seekers"],
    summary: {
      en: "Signal when sharing screens, invite remote voices cleanly, and handle technical glitches with poise.",
      ar: "أحسن إدارة مشاركة الشاشة، وإشراك الحاضرين عن بُعد، والتعامل بهدوء مع أي عطل تقني.",
    },
    keyPhrases: [
      {
        phrase: "Can everyone see my screen clearly?",
        arabic: "هل يرى الجميع شاشتي بوضوح؟",
        register: "Online Standard",
      },
      {
        phrase: "You're on mute—we can't quite hear you yet.",
        arabic: "الميكروفون مكتوم لديك—لا نسمعك بعد.",
        register: "Polite Prompt",
      },
      {
        phrase: "Before we move on, let's hear from colleagues joining remotely.",
        arabic: "قبل الانتقال، لنستمع لزملائنا المنضمين عن بُعد.",
        register: "Inclusive",
      },
    ],
    realisticModel: {
      title: { en: "Smooth Screen-Share Transition", ar: "انتقال سلس لمشاركة الشاشة" },
      text: "I'm sharing the Q2 dashboard now—could someone give me a quick thumbs-up if it's visible? Great. Focusing on the top-right chart, you'll notice turnaround times dropped by 18%.",
    },
    quickDrill: {
      prompt: "How do you politely let a senior colleague know their microphone is muted?",
      options: [
        "Sorry to jump in, Nadia—I think you might be on mute.",
        "Hey! Open your mic, nobody hears you!",
        "Your mute is closed, fix it.",
        "Stop talking until you unmute.",
      ],
      correct: 0,
      explanation: {
        en: "Softening with 'Sorry to jump in... I think you might be on mute' keeps the tone warm and respectful.",
        ar: "تخفيف التنبيه بعبارة Sorry to jump in... I think you might be on mute يحافظ على اللباقة.",
      },
    },
  },
  {
    id: "comm-08",
    number: 8,
    title: {
      en: "Delivering Structured Business Presentations",
      ar: "تقديم العروض التقديمية المهنية",
    },
    audiences: ["professionals"],
    summary: {
      en: "Use crisp signposting ('First...', 'Turning to...', 'To wrap up...') so executives follow your argument effortlessly.",
      ar: "استخدم عبارات توجيه واضحة (Signposting) ليتابع القادة والعملاء عرضك دون تشتت.",
    },
    keyPhrases: [
      {
        phrase: "Today I'll walk you through three key recommendations.",
        arabic: "سأستعرض معكم اليوم ثلاث توصيات محورية.",
        register: "Executive",
      },
      {
        phrase: "That brings me neatly to my second point...",
        arabic: "وهذا يقودني بسلاسة إلى النقطة الثانية...",
        register: "Signposting",
      },
      {
        phrase: "I'd be happy to take your questions now.",
        arabic: "يسعدني استقبال أسئلتكم الآن.",
        register: "Formal Closing",
      },
    ],
    realisticModel: {
      title: { en: "Executive Deck Opening", ar: "افتتاح عرض تنفيذي" },
      text: "Good morning, everyone. Over the next ten minutes, I'll walk you through our Q3 expansion metrics, flag two supply bottlenecks, and propose a concrete investment plan. Feel free to hold detailed questions for the Q&A at the end.",
    },
    quickDrill: {
      prompt: "Which phrase creates the cleanest transition between two presentation sections?",
      options: [
        "Now that we've reviewed revenue growth, let's turn to operating costs.",
        "Okay finish this slide, next slide now.",
        "That's all for money, now other thing.",
        "I am going to talk another topic.",
      ],
      correct: 0,
      explanation: {
        en: "Linking what you just covered ('Now that we've reviewed...') to what comes next ('let's turn to...') anchors listeners.",
        ar: "ربط ما تم عرضه بما سيأتي باستخدام Now that we've reviewed... let's turn to... يمنح العرض احترافية عالية.",
      },
    },
  },
  {
    id: "comm-09",
    number: 9,
    title: { en: "Expressing Professional Opinions", ar: "إبداء الآراء المهنية بموضوعية" },
    audiences: ["professionals", "job-seekers"],
    summary: {
      en: "Anchor opinions in evidence and business impact rather than bare personal preference.",
      ar: "اربط رأيك بالبيانات والأثر العملي بدل الاقتصار على الرأي الشخصي المجرد.",
    },
    keyPhrases: [
      {
        phrase: "From an operational standpoint, I'd recommend...",
        arabic: "من منظور تشغيلي، أوصي بـ...",
        register: "Executive",
      },
      {
        phrase: "Based on last quarter's figures, it looks like...",
        arabic: "بناءً على أرقام الربع الماضي، يبدو أن...",
        register: "Evidence-Based",
      },
      {
        phrase: "My sense is that phasing the rollout reduces risk.",
        arabic: "تقديري أن الطرح المرحلي يقلّص المخاطر.",
        register: "Diplomatic",
      },
    ],
    realisticModel: {
      title: { en: "Data-Backed Recommendation", ar: "توصية مدعومة بالبيانات" },
      text: "From a customer-retention perspective, I'd recommend launching a 30-day pilot with five key accounts first. Based on last year's upgrade data, early feedback prevents costly rework later.",
    },
    quickDrill: {
      prompt: "Which statement sounds most persuasive in a management meeting?",
      options: [
        "From a budget standpoint, phasing the rollout over two quarters lowers upfront risk.",
        "I just feel like waiting because I want to.",
        "Obviously my idea is the only smart choice here.",
        "I am thinking maybe we do it slow.",
      ],
      correct: 0,
      explanation: {
        en: "Framing your point around a clear business lens ('From a budget standpoint...') wins credibility immediately.",
        ar: "تأطير الرأي ضمن معيار عملي مثل الميزانية أو المخاطر يكسبه مصداقية فورية.",
      },
    },
  },
  {
    id: "comm-10",
    number: 10,
    title: { en: "Disagreeing Diplomatically", ar: "الاختلاف الدبلوماسي في الرأي" },
    audiences: ["professionals"],
    summary: {
      en: "Acknowledge the merit in your colleague's view first, then introduce your concern using softeners ('however', 'one concern is').",
      ar: "ابدأ بالاعتراف بوجاهة جزء من رأي زميلك ثم اعرض تحفّظك بلباقة وموضوعية.",
    },
    keyPhrases: [
      {
        phrase: "I see where you're coming from; however, one concern I have is...",
        arabic: "أتفهم وجهة نظرك؛ غير أن لديّ تحفظًا واحدًا وهو...",
        register: "Diplomatic",
      },
      {
        phrase: "That's a valid point, though we may want to consider...",
        arabic: "نقطة وجيهة، لكن ربما يجدر بنا مراعاة...",
        register: "Diplomatic",
      },
      {
        phrase: "Could we look at this from a slightly different angle?",
        arabic: "هل يمكننا النظر إلى الأمر من زاوية مختلفة قليلًا؟",
        register: "Collaborative",
      },
    ],
    realisticModel: {
      title: { en: "Constructive Pushback", ar: "معارضة بنّاءة ومهذبة" },
      text: "I completely appreciate why we want to launch before Eid, and I share that ambition. However, one concern is that skipping load testing could expose checkout errors during peak traffic. Could we trim two secondary features so QA gets a full week?",
    },
    quickDrill: {
      prompt: "Which response disagrees professionally with a colleague's tight timeline?",
      options: [
        "I appreciate the urgency; my concern is that a one-week window may compromise quality checks.",
        "You are totally wrong and that timeline is impossible.",
        "No, I refuse to do this crazy plan.",
        "That makes zero sense at all.",
      ],
      correct: 0,
      explanation: {
        en: "Validating the goal ('I appreciate the urgency') before naming the specific risk keeps trust intact.",
        ar: "تقدير الهدف أولًا ثم تحديد الخطر بموضوعية يحافظ على الاحترام والتعاون.",
      },
    },
  },
  {
    id: "comm-11",
    number: 11,
    title: { en: "Negotiating Effectively", ar: "التفاوض التجاري والمهني بفعالية" },
    audiences: ["professionals", "job-seekers"],
    summary: {
      en: "Trade value instead of giving one-sided concessions using conditional 'If you can..., we could...' structures.",
      ar: "تفاوض بمبدأ المقايضة المتوازنة باستخدام الصيغ الشرطية (If you can..., we could...) بدل التنازل المجاني.",
    },
    keyPhrases: [
      {
        phrase: "If you can commit to a 24-month term, we could lower the unit rate by 8%.",
        arabic: "إذا التزمتم بعقد لمدة ٢٤ شهرًا، يمكننا خفض سعر الوحدة بنسبة ٨٪.",
        register: "Negotiation",
      },
      {
        phrase: "Help me understand what matters most to your team here.",
        arabic: "ساعدني على فهم الأولوية القصوى لفريقكم هنا.",
        register: "Exploratory",
      },
      {
        phrase: "We have flexibility on delivery staging, though our base pricing is firm.",
        arabic: "لدينا مرونة في مراحل التسليم، رغم أن السعر الأساسي ثابت.",
        register: "Firm & Polite",
      },
    ],
    realisticModel: {
      title: { en: "Conditional Counter-Offer", ar: "عرض مضاد متوازن ومشروط" },
      text: "We can't reduce the licence fee on a single-year plan, as our margins are already tight. However, if your team signs a two-year agreement with upfront annual billing, we'd be happy to include a 10% discount plus complimentary onboarding.",
    },
    quickDrill: {
      prompt: "Which negotiation sentence protects your value while staying collaborative?",
      options: [
        "If we confirm order volume by Friday, we can include expedited shipping at no extra charge.",
        "Fine, take 30% off right now just please sign.",
        "Never, our price will not move even one riyal, end of talk.",
        "Maybe I give discount, I don't know.",
      ],
      correct: 0,
      explanation: {
        en: "Linking every concession to a clear reciprocal commitment ('If we confirm...') builds win-win deals.",
        ar: "ربط كل ميزة تقدمها بالتزام واضح من الطرف الآخر هو جوهر التفاوض الناجح.",
      },
    },
  },
  {
    id: "comm-12",
    number: 12,
    title: {
      en: "Handling Client Complaints Professionally",
      ar: "التعامل الاحترافي مع شكاوى العملاء",
    },
    audiences: ["professionals"],
    summary: {
      en: "Follow the L-A-S-T framework: Listen calmly, Apologise sincerely without excuses, Solve concretely, and Thank the client.",
      ar: "طبّق قاعدة التعامل المحترف: استمع بهدوء، اعتذر بصدق دون تبريرات، قدّم حلًا ملموسًا، واشكر العميل.",
    },
    keyPhrases: [
      {
        phrase:
          "I completely understand why this delay is frustrating, and I apologise for the inconvenience.",
        arabic: "أتفهم تمامًا سبب انزعاجكم من هذا التأخير، وأعتذر بصدق عن هذا الإرباك.",
        register: "Empathetic",
      },
      {
        phrase: "Here is what I am doing right now to put this right.",
        arabic: "إليكم ما أقوم به الآن فورًا لتصحيح الوضع.",
        register: "Action-Focused",
      },
      {
        phrase: "I will personally update you by 4 p.m. today.",
        arabic: "سأوافيكم شخصيًا بالتحديث قبل الرابعة عصر اليوم.",
        register: "Accountable",
      },
    ],
    realisticModel: {
      title: { en: "Service Recovery Response", ar: "رد احترافي لاستعادة ثقة العميل" },
      text: "Thank you for bringing this billing discrepancy to our attention, Mr. Haddad. I completely understand your frustration, and I apologise for the oversight. I have already issued a corrected credit note and flagged your account for priority review—I will email the updated invoice within the hour.",
    },
    quickDrill: {
      prompt: "Which reply de-escalates an upset client best?",
      options: [
        "I apologise for the delay—I've escalated your shipment to priority courier and will send tracking within 30 minutes.",
        "It's not my fault; the warehouse team always makes mistakes.",
        "Calm down please, delays happen everywhere.",
        "You should have ordered earlier.",
      ],
      correct: 0,
      explanation: {
        en: "Taking ownership without blaming colleagues and giving a timed action immediately restores trust.",
        ar: "تحمّل المسؤولية دون إلقاء اللوم وتقديم خطوة محددة بوقت يعيد الثقة فورًا.",
      },
    },
  },
  {
    id: "comm-13",
    number: 13,
    title: { en: "Resolving Workplace Conflicts", ar: "حل النزاعات المهنية داخل الفريق" },
    audiences: ["professionals"],
    summary: {
      en: "Shift conversations from personal blame ('You never...') to shared workflow solutions ('How can we prevent...?').",
      ar: "حوّل الحوار من اللوم الشخصي إلى البحث المشترك عن حلول تحسّن سير العمل.",
    },
    keyPhrases: [
      {
        phrase: "We both want the launch to succeed—let's look at where the handoff broke down.",
        arabic: "كلانا يريد نجاح الإطلاق—لننظر أين حدث الخلل في تسليم المهمة.",
        register: "Mediating",
      },
      {
        phrase: "Going forward, how can we make the approval step clearer for both teams?",
        arabic: "من الآن فصاعدًا، كيف نجعل خطوة الاعتماد أوضح للفريقين؟",
        register: "Forward-Looking",
      },
      {
        phrase: "I'd appreciate hearing your side before we decide on next steps.",
        arabic: "أقدّر سماع وجهة نظرك قبل أن نقرّر الخطوات التالية.",
        register: "Respectful",
      },
    ],
    realisticModel: {
      title: { en: "De-escalating Inter-Team Friction", ar: "تهدئة خلاف بين إدارتين" },
      text: "I know both Design and Engineering felt squeezed on Friday's release. Rather than dwelling on who missed the brief, let's map out a clear 48-hour freeze window so neither team gets blindsided next sprint.",
    },
    quickDrill: {
      prompt: "Which phrasing keeps a workplace conflict constructive rather than personal?",
      options: [
        "Let's look at how we can make our handoff checklist clearer so neither team faces last-minute surprises.",
        "Your team always ruins our deadlines every single week.",
        "I'm reporting you to HR immediately.",
        "Clearly you don't care about quality.",
      ],
      correct: 0,
      explanation: {
        en: "Focusing on process ('our handoff checklist') rather than attacking people unlocks fast solutions.",
        ar: "التركيز على تحسين الإجراء المشترك بدل مهاجمة الأشخاص يحقق حلولًا سريعة ومستدامة.",
      },
    },
  },
  {
    id: "comm-14",
    number: 14,
    title: {
      en: "Explaining Data, Trends & Business Results",
      ar: "شرح البيانات والنتائج ومؤشرات الأداء",
    },
    audiences: ["professionals"],
    summary: {
      en: "Pair precise trend verbs ('climbed sharply', 'levelled off', 'dipped slightly') with clear business causes and takeaways.",
      ar: "اربط أفعال وصف الاتجاهات الدقيقة بأسبابها العملية والخلاصة التنفيذية المطلوبة.",
    },
    keyPhrases: [
      {
        phrase: "Revenue rose by 14% year-on-year, driven primarily by enterprise renewals.",
        arabic: "ارتفعت الإيرادات بنسبة ١٤٪ سنويًا، مدفوعةً أساسًا بتجديدات الشركات الكبرى.",
        register: "Executive Reporting",
      },
      {
        phrase: "Costs levelled off in Q3 after peaking in April.",
        arabic: "استقرّت التكاليف في الربع الثالث بعد بلوغها الذروة في أبريل.",
        register: "Analytical",
      },
      {
        phrase: "The key takeaway from this chart is...",
        arabic: "الخلاصة الرئيسية من هذا الرسم البياني هي...",
        register: "Presentation",
      },
    ],
    realisticModel: {
      title: { en: "Quarterly Performance Summary", ar: "ملخص الأداء الفصلي" },
      text: "Looking at Q2 results, active B2B accounts grew by 19%, largely driven by our new Arabic onboarding flow. Support tickets dipped slightly by 6% despite higher volume, showing strong operational leverage.",
    },
    quickDrill: {
      prompt: "Which preposition accurately expresses the exact size of a percentage increase?",
      options: [
        "Quarterly net profit increased by 12% compared with last year.",
        "Quarterly net profit increased with 12% compared last year.",
        "Quarterly net profit increased of 12% than last year.",
        "Quarterly net profit increased in 12% from last year.",
      ],
      correct: 0,
      explanation: {
        en: "Always use 'increase/drop BY + amount' ('increased by 12%') and 'compared with/to'.",
        ar: "نستخدم دائمًا حرف الجر by قبل مقدار الزيادة أو النقصان: increased by 12%.",
      },
    },
  },
  {
    id: "comm-15",
    number: 15,
    title: {
      en: "Communicating with International Clients",
      ar: "التواصل مع العملاء والشركاء الدوليين",
    },
    audiences: ["professionals"],
    summary: {
      en: "Avoid obscure local idioms, confirm time zones explicitly (e.g. GMT+3), and write crisp summaries after calls.",
      ar: "تجنّب التعابير المحلية الغامضة، وحدّد المناطق الزمنية بدقة، وأرسل ملخصًا مكتوبًا بعد كل مكالمة دولية.",
    },
    keyPhrases: [
      {
        phrase: "Does 2:00 p.m. Riyadh time (11:00 a.m. London / GMT) work for your team?",
        arabic: "هل تناسبكم الساعة ٢ ظهرًا بتوقيت الرياض (١١ صباحًا بتوقيت لندن)؟",
        register: "Global Standard",
      },
      {
        phrase:
          "Just to make sure nothing gets lost in translation, let me recap our three agreed terms.",
        arabic: "لضمان وضوح كل التفاصيل تمامًا، دعني أُلخّص البنود الثلاثة المتفق عليها.",
        register: "Cross-Cultural",
      },
      {
        phrase: "Please let us know if any local public holidays affect that delivery window.",
        arabic: "يرجى إعلامنا إذا كانت أي إجازات رسمية محلية تؤثر على موعد التسليم.",
        register: "Considerate Global",
      },
    ],
    realisticModel: {
      title: { en: "Cross-Border Project Confirmation", ar: "تأكيد مشروع مع شريك دولي" },
      text: "Dear Hannah, thank you for a productive call today. To make sure both our Riyadh and Zurich teams stay aligned, I've summarised our three agreed milestones below—all dates assume standard local business days, and our next review is set for Tuesday at 3:00 p.m. AST (1:00 p.m. CET).",
    },
    quickDrill: {
      prompt: "What is the best practice when scheduling a meeting across two countries?",
      options: [
        "State both time zones explicitly (e.g. 2:00 p.m. Riyadh / 11:00 a.m. GMT) and send a calendar invite.",
        "Say 'Let's meet at two o'clock' without mentioning a time zone.",
        "Use slang and local abbreviations that only your office knows.",
        "Assume both countries share the exact same weekend days.",
      ],
      correct: 0,
      explanation: {
        en: "Writing both time zones explicitly eliminates missed international calls immediately.",
        ar: "توضيح المنطقتين الزمنيتين في الدعوة يمنع أي التباس في المواعيد الدولية.",
      },
    },
  },
];
