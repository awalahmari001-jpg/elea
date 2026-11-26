import type { SpeakingSituation } from "./speaking-situations";

/**
 * 15 additional authentic real-life daily speaking situations (bringing the
 * platform total from 60 to 75 unique live-discourse situations) with explicit
 * bilingual fluency hints and clickable sentence starters on every turn.
 */
export const DAILY_REAL_LIFE_SITUATIONS: SpeakingSituation[] = [
  {
    id: "airport-security",
    title: { en: "Airport: Going through security", ar: "المطار: المرور عبر التفتيش الأمني" },
    category: "travel",
    level: "A2",
    role: { en: "Security officer", ar: "موظف الأمن بالمطار" },
    taskGoal: {
      en: "Follow security instructions calmly, ask about liquids and laptops, and keep your documents ready.",
      ar: "اتّبع تعليمات التفتيش الأمني بهدوء واسأل عن السوائل والأجهزة الإلكترونية بوضوح.",
    },
    keyPhrases: [
      "Should I take my laptop out?",
      "All my liquids are under 100 ml.",
      "Here is my boarding pass.",
      "Do I need to remove my shoes?",
    ],
    turns: [
      {
        prompt:
          "Good morning. Please show me your boarding pass and place your laptop in a separate tray.",
        model:
          "Good morning. Here is my boarding pass. Should I also take my tablet out of my backpack?",
        hint: {
          en: "Greet politely, hand over your boarding pass, and ask a clarifying yes/no question about another item.",
          ar: "ردّ التحية بأدب، قدّم بطاقة الصعود، واسأل سؤالاً توضيحيًا عن جهاز آخر في حقيبتك.",
        },
        starters: ["Good morning. Here is my...", "Should I also take out my..."],
      },
      {
        prompt:
          "Yes, please place all electronics flat. Do you have any liquids or water bottles in your carry-on?",
        model:
          "I only have a small perfume bottle under 100 millilitres inside a clear plastic bag.",
        hint: {
          en: "Mention what liquid you have, confirm it is under 100 ml, and say where it is packed.",
          ar: "اذكر ما لديك من سوائل وأكّد أنها أقل من ١٠٠ مل وموضوعة في كيس شفاف.",
        },
        starters: ["I only have a small...", "No water bottles, just..."],
      },
      {
        prompt: "Great. Please walk through the scanner when the green light appears.",
        model: "Thank you. Do I need to remove my watch and belt before walking through?",
        hint: {
          en: "Thank the officer and politely double-check whether to remove metallic accessories.",
          ar: "اشكر الموظف وتأكد بأدب إن كان عليك خلع الساعة أو الحزام.",
        },
        starters: ["Thank you. Do I need to remove...", "Got it, should I take off..."],
      },
    ],
  },
  {
    id: "airport-boarding-gate",
    title: { en: "Airport: At the boarding gate", ar: "المطار: عند بوابة الصعود للطائرة" },
    category: "travel",
    level: "B1",
    role: { en: "Gate agent", ar: "موظف بوابة الصعود" },
    taskGoal: {
      en: "Confirm boarding time, group number, and overhead bin space at a busy airport gate.",
      ar: "تأكد من وقت الصعود ورقم المجموعة ومكان حقيبة اليد عند بوابة المغادرة.",
    },
    keyPhrases: [
      "Is this the right gate for...",
      "What boarding group are you calling?",
      "Is the flight still on schedule?",
      "Could I keep my small bag with me?",
    ],
    turns: [
      {
        prompt: "Welcome to Gate B14. How can I help you before boarding begins?",
        model:
          "Excuse me, is this the correct gate for Flight 402 to London, and is it still on time?",
        hint: {
          en: "Start with 'Excuse me' and confirm both your flight number/destination and departure status.",
          ar: "ابدأ بـ Excuse me وتحقق من رقم الرحلة والوجهة وهل الإقلاع في موعده.",
        },
        starters: ["Excuse me, is this the right gate for...", "Could you confirm if Flight..."],
      },
      {
        prompt:
          "Yes, it is on schedule. Boarding starts in ten minutes by group number. Which group is on your pass?",
        model:
          "My boarding pass says Group 3. Will there still be space in the overhead bin for my small suitcase?",
        hint: {
          en: "State your group number clearly and ask politely about carry-on luggage space.",
          ar: "اذكر رقم مجموعتك بوضوح واسأل بلطف عن مساحة حقيبة اليد في المقصورة.",
        },
        starters: ["My boarding pass says Group...", "Will there be space for my..."],
      },
      {
        prompt: "If bins fill up, we can check your bag to London free of charge right here.",
        model:
          "That sounds very helpful. I will take out my passport and medicine first just in case. Thank you!",
        hint: {
          en: "Acknowledge the offer positively and mention taking out essential items first.",
          ar: "تقبّل العرض بلطف واذكر أنك ستُخرج أغراضك الضرورية أولاً.",
        },
        starters: ["That sounds great. Let me keep...", "Thank you, I will take out my..."],
      },
    ],
  },
  {
    id: "airport-customs-arrival",
    title: { en: "Airport: Passing through customs", ar: "المطار: المرور بالجمارك عند الوصول" },
    category: "travel",
    level: "B1",
    role: { en: "Customs officer", ar: "موظف الجمارك" },
    taskGoal: {
      en: "Declare gifts or snacks clearly and answer routine arrival questions with confidence.",
      ar: "أفصح عن الهدايا أو الأطعمة بوضوح وأجب عن أسئلة الوصول الروتينية بثقة.",
    },
    keyPhrases: [
      "I have nothing to declare.",
      "These are sealed dates and chocolates as gifts.",
      "I am staying for ten days.",
      "Here is my hotel confirmation.",
    ],
    turns: [
      {
        prompt: "Welcome. Where have you flown in from today, and do you have anything to declare?",
        model:
          "Thank you. I flew in from Riyadh, and I have two boxes of sealed dates and chocolates for my family.",
        hint: {
          en: "State your departure city and politely mention any food items or gifts clearly.",
          ar: "اذكر مدينة المغادرة وأفصح بوضوح عن أي أطعمة مغلّفة أو هدايا.",
        },
        starters: ["Thank you. I flew in from...", "I have a few sealed gifts to..."],
      },
      {
        prompt: "Are the boxes commercially sealed? And are you carrying any fresh fruit or meat?",
        model:
          "Yes, both boxes are factory sealed, and I am not carrying any fresh fruit, meat, or dairy.",
        hint: {
          en: "Confirm the packaging is sealed and give a direct, clear answer about restricted foods.",
          ar: "أكّد أن العلب مغلّفة مصنعيًا وأجب بوضوح عن عدم حمل أطعمة طازجة.",
        },
        starters: ["Yes, they are completely sealed...", "No fresh fruit at all, only..."],
      },
      {
        prompt: "Everything looks completely fine. Enjoy your stay!",
        model: "Thank you very much. Could you point me toward the airport train exit, please?",
        hint: {
          en: "Thank the officer and ask a quick directional question to exit smoothly.",
          ar: "اشكر الموظف واسأل بلطف عن اتجاه مخرج القطار أو سيارات الأجرة.",
        },
        starters: ["Thank you so much. Could you direct me to...", "Thanks! Which way is the..."],
      },
    ],
  },
  {
    id: "airport-duty-free",
    title: { en: "Airport: Shopping at duty-free", ar: "المطار: التسوّق في السوق الحرة" },
    category: "travel",
    level: "A2",
    role: { en: "Duty-free assistant", ar: "موظف السوق الحرة" },
    taskGoal: {
      en: "Ask for gift suggestions, confirm connecting-flight liquid rules, and pay smoothly.",
      ar: "اطلب اقتراحات للهدايا وتأكد من قواعد السوائل في رحلات الترانزيت وادفع بسهولة.",
    },
    keyPhrases: [
      "I have a connecting flight.",
      "Could you seal this in a security bag?",
      "Do you have a gift set?",
      "Can I pay in local currency or by card?",
    ],
    turns: [
      {
        prompt: "Hello! Are you looking for a perfume or gift before your flight?",
        model: "Hello! Yes, I am looking for a nice perfume gift set for my mother.",
        hint: {
          en: "Greet warmly and explain who the gift is for or what item you want.",
          ar: "ردّ التحية واذكر نوع الهدية التي تبحث عنها ولمن ستقدّمها.",
        },
        starters: ["Hello! I am looking for...", "Yes, please. Could you recommend..."],
      },
      {
        prompt:
          "This rose gift set is very popular. Are you flying direct, or do you have a connection?",
        model:
          "I have a connecting flight in Frankfurt, so could you seal it in an official duty-free security bag?",
        hint: {
          en: "Mention your transit stop and request a sealed duty-free security bag.",
          ar: "اذكر محطة الترانزيت واطلب وضع العطر في كيس الأمان المغلق.",
        },
        starters: ["I have a connecting flight in...", "Could you seal it in a..."],
      },
      {
        prompt:
          "Of course, I will seal it with your receipt inside. May I scan your boarding pass?",
        model: "Sure, here is my boarding pass. I will pay by contactless card, please.",
        hint: {
          en: "Hand over your boarding pass and state your preferred payment method.",
          ar: "قدّم بطاقة الصعود واذكر طريقة الدفع التي تفضلها.",
        },
        starters: ["Sure, here is my boarding pass...", "Of course. Can I pay by..."],
      },
    ],
  },
  {
    id: "airport-seat-upgrade",
    title: {
      en: "On the plane: Requesting a seat change",
      ar: "على متن الطائرة: طلب تغيير المقعد",
    },
    category: "travel",
    level: "B2",
    role: { en: "Flight attendant", ar: "مضيفة الطيران" },
    taskGoal: {
      en: "Politely ask cabin crew about an aisle or adjacent seat once boarding finishes, and request a meal preference.",
      ar: "اطلب بأدب من طاقم الطائرة تغيير المقعد عند توفره واسأل عن خيار الوجبة.",
    },
    keyPhrases: [
      "Once boarding is complete...",
      "Would it be possible to move to an aisle seat?",
      "I completely understand if the flight is full.",
      "Do you happen to have a vegetarian option?",
    ],
    turns: [
      {
        prompt: "Good evening! Welcome aboard. Are you finding your seat alright?",
        model:
          "Good evening, thank you. Once boarding finishes, would it be possible to move to an aisle seat if one is free?",
        hint: {
          en: "Use soft, polite language ('would it be possible...') and show patience ('once boarding finishes').",
          ar: "استخدم صيغة مهذّبة ولطيفة مثل would it be possible وأظهر تفهّمك لانتظار انتهاء الصعود.",
        },
        starters: [
          "Good evening. Once boarding is complete...",
          "Excuse me, would it be possible to...",
        ],
      },
      {
        prompt:
          "Let me check after the doors close — row 22 looks open so far. Would you like water while you wait?",
        model: "That is very kind of you. Yes, a glass of still water would be lovely, thank you.",
        hint: {
          en: "Thank the attendant warmly and specify still or sparkling water.",
          ar: "اشكر المضيفة بلطف وحدّد إن كنت تفضل ماءً عاديًا أم فوارًا.",
        },
        starters: ["That is very kind of you...", "Yes, please, a glass of..."],
      },
      {
        prompt:
          "Row 22C is free now! You are welcome to move across. Also, we are serving chicken or pasta for dinner.",
        model:
          "Thank you so much for checking for me! I will move over now, and I would love the pasta dish, please.",
        hint: {
          en: "Express genuine appreciation and clearly choose your meal option.",
          ar: "عبّر عن شكرك بوضوح واختر وجبتك المفضلة بأدب.",
        },
        starters: ["Thank you so much! I would love...", "I appreciate that! Could I have..."],
      },
    ],
  },
  {
    id: "hair-salon",
    title: { en: "At the barber or hair salon", ar: "عند الحلاق أو صالون الشعر" },
    category: "everyday",
    level: "A2",
    role: { en: "Hairstylist", ar: "مصفّف الشعر / الحلاق" },
    taskGoal: {
      en: "Describe the exact haircut length and style you want clearly and check the mirror at the end.",
      ar: "صِف طول القَصّة والشكل الذي تريده بوضوح وأبدِ ملاحظتك بأدب في النهاية.",
    },
    keyPhrases: [
      "Just a light trim, please.",
      "Keep the top a bit longer.",
      "Short on the sides, please.",
      "Could you take a little more off the back?",
    ],
    turns: [
      {
        prompt: "Welcome! Take a seat. How would you like your hair cut today?",
        model: "Hello! Just a neat trim, please — short on the sides and a little longer on top.",
        hint: {
          en: "Describe two clear parts: how short you want the sides and how much to keep on top.",
          ar: "حدّد نقطتين بوضوح: الجوانب وطول الشعر في الأعلى.",
        },
        starters: ["Hello! Just a light trim...", "I would like it short on the sides and..."],
      },
      {
        prompt: "Sure! Would you like me to use clippers on the sides or scissors only?",
        model: "Scissors on top and clippers on the sides with a natural fade, please.",
        hint: {
          en: "State your preference clearly using simple haircut terms (scissors, clippers, natural fade).",
          ar: "اذكر تفضيلك بوضوح (مقص أم ماكينة، وتدرّج طبيعي).",
        },
        starters: ["Scissors only, please, because...", "Clippers on the sides and scissors..."],
      },
      {
        prompt: "Let me show you the back with the mirror. How does that look?",
        model: "That looks very clean and even! Thank you so much — how much do I owe you?",
        hint: {
          en: "Give positive feedback (or politely ask for one small adjustment) and ask for the price.",
          ar: "أبدِ إعجابك بالنتيجة (أو اطلب تعديلاً بسيطًا بلطف) واسأل عن الحساب.",
        },
        starters: [
          "That looks great, thank you! How much...",
          "Very neat! Could you trim just a little...",
        ],
      },
    ],
  },
  {
    id: "post-office-parcel",
    title: { en: "Sending a parcel at the post office", ar: "إرسال طرد في مكتب البريد" },
    category: "everyday",
    level: "A2",
    role: { en: "Postal clerk", ar: "موظف البريد" },
    taskGoal: {
      en: "Compare standard vs. express shipping, declare parcel contents, and request a tracking number.",
      ar: "قارن بين الشحن العادي والسريع وأفصح عن محتوى الطرد واطلب رقم التتبّع.",
    },
    keyPhrases: [
      "I would like to send this parcel to...",
      "How long does express delivery take?",
      "Does it include tracking?",
      "It contains books and clothes.",
    ],
    turns: [
      {
        prompt: "Next, please! Where are you sending this parcel today?",
        model: "Hello! I would like to send this parcel to Jeddah. How much is express shipping?",
        hint: {
          en: "State the destination city and ask about shipping price or delivery speed.",
          ar: "اذكر مدينة الوجهة واسأل عن سعر الشحن أو سرعة التوصيل.",
        },
        starters: [
          "Hello! I would like to send this to...",
          "Could you tell me how much it costs to...",
        ],
      },
      {
        prompt:
          "Express takes two business days for 45 riyals. What is inside the box, and is anything fragile?",
        model: "It contains two hardcover books and a folded jacket — nothing fragile or liquid.",
        hint: {
          en: "List the items briefly and confirm whether anything inside is breakable or liquid.",
          ar: "اذكر محتوى الصندوق باختصار وأكّد إن كان فيه شيء قابل للكسر أم لا.",
        },
        starters: ["It contains...", "Just a few books and clothes — nothing..."],
      },
      {
        prompt: "Perfect. Would you like SMS tracking updates on your receipt?",
        model: "Yes, please! Tracking would be great so I can share the number with my brother.",
        hint: {
          en: "Accept tracking and add a quick natural reason to sound fluent.",
          ar: "وافق على خدمة التتبّع وأضف سببًا طبيعيًا مختصرًا لتعزيز طلاقتك.",
        },
        starters: ["Yes, please! Tracking helps me...", "Definitely, could you also print..."],
      },
    ],
  },
  {
    id: "dentist-appointment",
    title: { en: "Booking and visiting the dentist", ar: "حجز موعد وزيارة طبيب الأسنان" },
    category: "everyday",
    level: "B1",
    role: { en: "Dental receptionist", ar: "موظف استقبال عيادة الأسنان" },
    taskGoal: {
      en: "Describe tooth sensitivity clearly, choose an appointment slot, and ask about check-up costs.",
      ar: "صِف ألم أو حساسية الأسنان بوضوح واختر موعدًا مناسبًا واسأل عن التكلفة.",
    },
    keyPhrases: [
      "I would like to book a check-up.",
      "One of my back teeth is sensitive to cold.",
      "Do you have anything after 5 p.m.?",
      "Does my insurance cover this visit?",
    ],
    turns: [
      {
        prompt: "Smile Dental Clinic, good afternoon. How can I help you?",
        model:
          "Good afternoon. I would like to book an appointment because my back tooth has been sensitive to cold water.",
        hint: {
          en: "State your request ('book an appointment') and explain your symptom briefly.",
          ar: "اذكر رغبتك في حجز موعد واشرح العَرَض باختصار.",
        },
        starters: [
          "Good afternoon. I would like to book...",
          "Hello, I have a toothache and need...",
        ],
      },
      {
        prompt:
          "I am sorry to hear that. We have an opening tomorrow at 11 a.m. or Thursday at 5:30 p.m. Which works better?",
        model:
          "Thursday at 5:30 p.m. works much better for me after work. Should I arrive ten minutes early?",
        hint: {
          en: "Choose one of the two slots, say why briefly, and ask about arrival or paperwork.",
          ar: "اختر أحد الموعدين واذكر السبب باختصار واسأل إن كان عليك الحضور مبكرًا.",
        },
        starters: [
          "Thursday at 5:30 works best because...",
          "Could I take the tomorrow slot? Should I...",
        ],
      },
      {
        prompt:
          "Yes, ten minutes early with your ID and insurance card is ideal. Anything else I can help with?",
        model:
          "Just one quick question: does the first visit include an X-ray if the dentist needs one?",
        hint: {
          en: "Ask one practical follow-up question about what the visit covers.",
          ar: "اطرح سؤالاً عمليًا واحدًا حول ما تشمله الزيارة الأولى.",
        },
        starters: ["Just one quick question: does...", "Thank you! Could you confirm whether..."],
      },
    ],
  },
  {
    id: "clothes-return",
    title: { en: "Returning or exchanging clothes", ar: "استبدال أو إرجاع الملابس" },
    category: "everyday",
    level: "A2",
    role: { en: "Store cashier", ar: "محاسب المتجر" },
    taskGoal: {
      en: "Explain why an item does not fit, show the receipt, and ask for a different size or refund.",
      ar: "اشرح سبب عدم ملاءمة المقاس وقدّم الفاتورة واطلب مقاسًا آخر أو استرداد المبلغ.",
    },
    keyPhrases: [
      "I would like to exchange this shirt.",
      "It is a bit too tight around the shoulders.",
      "Here is the receipt.",
      "Do you have it in a medium?",
    ],
    turns: [
      {
        prompt: "Hi there! How can I help you today?",
        model:
          "Hello! I bought this blue jacket yesterday, and I would like to exchange it for a larger size.",
        hint: {
          en: "Mention when you bought the item and clearly state whether you want an exchange or a refund.",
          ar: "اذكر متى اشتريت القطعة وحدّد بوضوح إن كنت تريد الاستبدال أم الاسترجاع.",
        },
        starters: ["Hello! I bought this yesterday and...", "Hi, could I exchange this for..."],
      },
      {
        prompt: "No problem at all. Do you have the receipt, and are the tags still attached?",
        model: "Yes, here is the receipt, and all the original tags are still on it.",
        hint: {
          en: "Confirm both questions clearly (receipt + original tags).",
          ar: "أكّد وجود الفاتورة وبقاء بطاقات السعر الأصلية عليها.",
        },
        starters: ["Yes, here is the receipt and...", "Of course, I kept the receipt and..."],
      },
      {
        prompt: "We have a large right here in navy blue. Would you like to try it on first?",
        model: "Yes, that would be great — where are the fitting rooms, please?",
        hint: {
          en: "Accept politely and ask where the fitting rooms are located.",
          ar: "وافق بلطف واسأل عن مكان غرف القياس.",
        },
        starters: ["Yes, please! Where are the...", "That sounds great, let me try it..."],
      },
    ],
  },
  {
    id: "mobile-sim-card",
    title: { en: "Buying a local SIM card", ar: "شراء شريحة اتصال وبيانات محلية" },
    category: "everyday",
    level: "A1",
    role: { en: "Telecom agent", ar: "موظف شركة الاتصالات" },
    taskGoal: {
      en: "Choose a prepaid data plan, confirm eSIM or physical SIM, and check activation.",
      ar: "اختر باقة بيانات مسبقة الدفع وتأكد من شريحة eSIM وطريقة التفعيل.",
    },
    keyPhrases: [
      "I need a tourist SIM card with data.",
      "How many gigabytes does this plan include?",
      "Does it work with eSIM?",
      "Could you help me activate it?",
    ],
    turns: [
      {
        prompt: "Welcome! Are you looking for a prepaid SIM card or a monthly plan?",
        model:
          "Hello! I am visiting for two weeks, so I need a prepaid SIM card with good internet data.",
        hint: {
          en: "Say how long you need it for and mention that you want a prepaid data SIM.",
          ar: "اذكر المدة التي تحتاجها فيها واطلب شريحة مسبقة الدفع ببيانات إنترنت.",
        },
        starters: ["Hello! I need a prepaid SIM...", "I am staying for two weeks and need..."],
      },
      {
        prompt:
          "Our 20-gigabyte visitor plan is 75 riyals and includes local calls. Would you like a physical SIM or an eSIM?",
        model: "An eSIM would be perfect for my phone. Does the plan start working right away?",
        hint: {
          en: "Pick physical SIM or eSIM and ask when the service activates.",
          ar: "اختر شريحة عادية أو eSIM واسأل متى يبدأ التفعيل.",
        },
        starters: ["An eSIM would be great. Does...", "A physical SIM, please. Will it work..."],
      },
      {
        prompt:
          "Yes, it activates in two minutes once you scan this QR code. May I see your passport to register it?",
        model: "Sure, here is my passport. Thank you for helping me set it up!",
        hint: {
          en: "Hand over your ID politely and thank the agent for the setup help.",
          ar: "قدّم جواز السفر بأدب واشكر الموظف على المساعدة في التفعيل.",
        },
        starters: ["Sure, here is my passport...", "Of course! Thank you for..."],
      },
    ],
  },
  {
    id: "hotel-room-issue",
    title: {
      en: "Hotel: Reporting a room issue politely",
      ar: "الفندق: الإبلاغ عن مشكلة في الغرفة بأدب",
    },
    category: "travel",
    level: "B1",
    role: { en: "Front desk manager", ar: "مدير الاستقبال الفندقي" },
    taskGoal: {
      en: "Report an air-conditioning or noise problem calmly and agree on a quick maintenance fix or room move.",
      ar: "أبلغ عن مشكلة في التكييف أو الإزعاج بهدوء واتّفق على إصلاح سريع أو تبديل الغرفة.",
    },
    keyPhrases: [
      "I am staying in room 508.",
      "The air conditioning does not seem to be cooling.",
      "Could someone take a look this afternoon?",
      "If possible, could we switch to a quieter room?",
    ],
    turns: [
      {
        prompt: "Good evening, front desk. How is your stay going so far?",
        model:
          "Good evening. I am staying in room 508, and unfortunately the air conditioning is not cooling properly.",
        hint: {
          en: "Give your room number first and describe the issue politely using 'unfortunately'.",
          ar: "اذكر رقم غرفتك أولاً وصِف المشكلة بلباقة باستخدام unfortunately.",
        },
        starters: ["Good evening. I am in room...", "Hello, sorry to bother you, but in room..."],
      },
      {
        prompt:
          "I apologise for the inconvenience. We can send a technician in fifteen minutes, or move you to room 612 right now.",
        model:
          "Moving to room 612 right now sounds much easier, as I need to rest before an early meeting.",
        hint: {
          en: "Choose the option you prefer and add a brief reason so the manager understands your urgency.",
          ar: "اختر الحل الأنسب لك وأضف سببًا مختصرًا لتوضيح احتياجك.",
        },
        starters: ["Moving to room 612 sounds...", "Sending a technician is fine if..."],
      },
      {
        prompt:
          "Here are your new key cards for room 612, and a porter can help with your suitcases.",
        model: "Thank you for handling this so quickly — I really appreciate your help!",
        hint: {
          en: "Close warmly by appreciating the fast service.",
          ar: "اختم الحوار بشكر دافئ على سرعة الاستجابة.",
        },
        starters: ["Thank you for sorting that out so...", "I really appreciate your quick..."],
      },
    ],
  },
  {
    id: "laundry-dry-cleaning",
    title: { en: "At the dry cleaner and laundry", ar: "في المغسلة والتنظيف الجاف" },
    category: "everyday",
    level: "A2",
    role: { en: "Laundry attendant", ar: "عامل المغسلة" },
    taskGoal: {
      en: "Point out a stain, confirm dry-clean vs. press only, and check pickup time.",
      ar: "أشِر إلى بقعة تحتاج عناية، وحدّد التنظيف الجاف أو الكيّ، وتأكد من موعد الاستلام.",
    },
    keyPhrases: [
      "I need this suit dry-cleaned, please.",
      "There is a small coffee stain on the sleeve.",
      "When will it be ready for pickup?",
      "Do you offer same-day pressing?",
    ],
    turns: [
      {
        prompt: "Good morning! What are you dropping off today?",
        model:
          "Good morning! I have a grey suit for dry-cleaning and two white shirts for washing and ironing.",
        hint: {
          en: "List the garments and say which service each one needs (dry-clean, wash, iron).",
          ar: "اذكر القطع وحدّد الخدمة المطلوبة لكل قطعة (تنظيف جاف أم غسيل وكيّ).",
        },
        starters: ["Good morning! I have a suit for...", "Hello, could you dry-clean this and..."],
      },
      {
        prompt: "Sure thing. Are there any stains we should treat carefully?",
        model:
          "Yes, there is a small coffee mark near the collar of the first shirt. Could you check it, please?",
        hint: {
          en: "Describe the exact stain and where it is located.",
          ar: "اذكر نوع البقعة ومكانها بدقة على القطعة.",
        },
        starters: ["Yes, there is a small...", "Nothing major, just a tiny mark on..."],
      },
      {
        prompt:
          "We will treat it gently. Everything will be ready tomorrow after 4 p.m. Does that work?",
        model: "Tomorrow after 4 p.m. is perfect. Should I pay now or when I pick them up?",
        hint: {
          en: "Confirm the pickup time and ask when payment is expected.",
          ar: "أكّد مناسبة موعد الاستلام واسأل إن كان الدفع الآن أم عند الاستلام.",
        },
        starters: ["That works great. Should I pay...", "Perfect! Could I get a pickup..."],
      },
    ],
  },
  {
    id: "electronics-repair",
    title: { en: "Getting a phone or laptop repaired", ar: "إصلاح الهاتف أو الحاسوب المحمول" },
    category: "everyday",
    level: "B1",
    role: { en: "Repair technician", ar: "فني صيانة الإلكترونيات" },
    taskGoal: {
      en: "Explain a device issue clearly, ask for a cost estimate, and confirm data safety.",
      ar: "اشرح العطل التقني بوضوح، واطلب تقدير التكلفة، وتأكد من سلامة بياناتك.",
    },
    keyPhrases: [
      "The battery drains very fast.",
      "The charging port feels loose.",
      "Could you give me a quote first?",
      "Will my photos and files stay safe?",
    ],
    turns: [
      {
        prompt: "Hi! What seems to be the trouble with your device today?",
        model:
          "Hello! My laptop battery drains in less than an hour, and the charging port feels a little loose.",
        hint: {
          en: "Describe one or two clear symptoms without needing complex tech jargon.",
          ar: "صِف عرضًا أو عرضين بوضوح وبعبارات بسيطة مباشرة.",
        },
        starters: ["Hello! My phone/laptop keeps...", "Hi, the screen/battery has been..."],
      },
      {
        prompt:
          "I can run a diagnostic check in twenty minutes. Would you like a price quote before we replace any parts?",
        model:
          "Yes, please call me with a quote before doing the repair. Also, will my files stay safe?",
        hint: {
          en: "Ask for a quote prior to repair and check whether your personal files need backing up.",
          ar: "اطلب معرفة السعر قبل الإصلاح وتأكد من بقاء ملفاتك بأمان.",
        },
        starters: [
          "Yes, please let me know the cost before...",
          "Definitely, and will my data stay...",
        ],
      },
      {
        prompt:
          "Your files stay untouched for a battery swap, though a cloud backup is always wise. What is the best phone number to text you?",
        model:
          "Great, I backed everything up this morning. Here is my number — thank you very much!",
        hint: {
          en: "Confirm your backup and share your contact preference politely.",
          ar: "أكّد حفظ النسخة الاحتياطية وقدّم وسيلة التواصل المناسبة بلطف.",
        },
        starters: ["I already backed everything up...", "Good advice! You can reach me on..."],
      },
    ],
  },
  {
    id: "parent-teacher-meeting",
    title: { en: "At a school parent-teacher meeting", ar: "في اجتماع أولياء الأمور بالمدرسة" },
    category: "everyday",
    level: "B2",
    role: { en: "Homeroom teacher", ar: "معلم الصف" },
    taskGoal: {
      en: "Discuss your child's progress, ask about strengths and areas to support at home, and agree on a follow-up plan.",
      ar: "ناقش تقدّم طفلك واسأل عن نقاط القوة والمهارات التي تحتاج دعمًا في المنزل واتّفق على خطة متابعة.",
    },
    keyPhrases: [
      "How is he/she settling into class?",
      "Which subjects are going best?",
      "How can we support reading at home?",
      "Let's check in again next month.",
    ],
    turns: [
      {
        prompt:
          "Welcome! Thank you for coming in today. How do you feel your child is enjoying the term so far?",
        model:
          "Thank you for having me. He really enjoys science and art, though he gets a little shy when reading aloud in English.",
        hint: {
          en: "Share one positive observation from home and one specific area you want the teacher's view on.",
          ar: "اذكر ملاحظة إيجابية من البيت مع نقطة محددة تود سماع رأي المعلم حولها.",
        },
        starters: [
          "Thank you for meeting with me. At home...",
          "He/She really enjoys..., though...",
        ],
      },
      {
        prompt:
          "He participates thoughtfully in small groups! A short ten-minute read-aloud routine at home would boost his confidence quickly.",
        model:
          "That is encouraging to hear. Are there specific storybooks or phonics topics you recommend we start with?",
        hint: {
          en: "Respond warmly and ask for concrete resources or topics you can use at home.",
          ar: "رحّب بالملاحظة واسأل عن كتب أو مواضيع محددة تبدأون بها في المنزل.",
        },
        starters: [
          "That is great to hear. Which books...",
          "We can definitely do that! What topics...",
        ],
      },
      {
        prompt:
          "I will email you our recommended reading list tonight. Would you like a quick progress update in four weeks?",
        model:
          "Yes, a follow-up in four weeks would be wonderful. Thank you for all your care and guidance!",
        hint: {
          en: "Agree on the follow-up timeline and thank the teacher sincerely.",
          ar: "وافق على موعد المتابعة واشكر المعلم بتقدير.",
        },
        starters: [
          "Yes, checking in next month would be...",
          "That sounds ideal. Thank you so much for...",
        ],
      },
    ],
  },
  {
    id: "mechanic-car-service",
    title: { en: "At the car service and mechanic", ar: "في مركز صيانة السيارات والميكانيكي" },
    category: "everyday",
    level: "B1",
    role: { en: "Service adviser", ar: "مستشار صيانة السيارات" },
    taskGoal: {
      en: "Request routine oil service, describe a dashboard warning or sound, and confirm pickup time.",
      ar: "اطلب صيانة دورية وتغيير الزيت وصِف صوتًا أو تنبيهًا في الطبلون وتأكد من وقت الاستلام.",
    },
    keyPhrases: [
      "I am here for a routine oil change.",
      "There is a squeaking sound when I brake.",
      "Could you inspect the brake pads?",
      "What time can I collect the car?",
    ],
    turns: [
      {
        prompt: "Good morning! Welcome to City Auto Service. What brings your car in today?",
        model:
          "Good morning! I booked a routine oil change, and I also hear a light squeaking noise when I brake.",
        hint: {
          en: "Mention your scheduled service and describe any extra sound or warning light simply.",
          ar: "اذكر الصيانة المجدولة وصِف أي صوت إضافي أو لمبة تنبيه ببساطة.",
        },
        starters: [
          "Good morning! I am here for...",
          "I need an oil change, and could you also check...",
        ],
      },
      {
        prompt:
          "We will definitely inspect the brake pads and tyre pressure too. Do you need the car back before evening?",
        model:
          "If possible, picking it up around 4 p.m. would be ideal. Please call me if the brakes need replacing.",
        hint: {
          en: "Give your preferred pickup time and ask to approve any extra work first.",
          ar: "حدّد وقت الاستلام المفضل واطلب التواصل معك قبل أي إصلاح إضافي.",
        },
        starters: [
          "Picking it up around... would be...",
          "Before 5 p.m. if possible, and please call me if...",
        ],
      },
      {
        prompt: "Will do! We will send a full inspection summary to your phone within two hours.",
        model:
          "That sounds very clear and transparent. Here are the keys — see you this afternoon!",
        hint: {
          en: "Hand over the keys politely and confirm when you will return.",
          ar: "سلّم المفاتيح بلطف وأكّد عودتك لاحقًا.",
        },
        starters: [
          "That sounds great. Here are the keys...",
          "Thank you! I will wait for your message...",
        ],
      },
    ],
  },
];
