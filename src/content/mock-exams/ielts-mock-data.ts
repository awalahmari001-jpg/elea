import type {
  FullMockExam,
  ListeningPart,
  ReadingPassage,
  SpeakingTask,
  WritingTask,
} from "./exam-types";

/* -------------------------------------------------------------------------- */
/* Shared IELTS Listening Section (30 min · 4 Parts · 16 Questions)           */
/* -------------------------------------------------------------------------- */

const IELTS_LISTENING_PARTS: ListeningPart[] = [
  {
    id: "ielts-l-part-1",
    title: {
      en: "Part 1: Airport Lost Baggage & Travel Assistance Desk",
      ar: "الجزء ١: مكتب الأمتعة المفقودة ومساعدة المسافرين في المطار",
    },
    context: {
      en: "You will hear a passenger speaking to an airline travel assistance officer about a delayed suitcase after an international arrival.",
      ar: "ستستمع إلى مسافر يتحدث مع موظفة مساعدة المسافرين في المطار حول حقيبة متأخرة بعد رحلة دولية.",
    },
    speakerMode: "dialogue",
    transcript: [
      {
        speaker: "Officer",
        voice: "female",
        text: "Good evening, Meridian Airways Travel Assistance. How can I help you today?",
      },
      {
        speaker: "Passenger",
        voice: "male",
        text: "Hello. I just arrived on flight MA 418 from Zurich, and my checked suitcase never appeared on Carousel 6.",
      },
      {
        speaker: "Officer",
        voice: "female",
        text: "I am sorry to hear that. Let me open a Property Irregularity Report right away. Could I have your surname and your baggage claim reference, please?",
      },
      {
        speaker: "Passenger",
        voice: "male",
        text: "Sure. My surname is Al-Harbi, and the reference printed on my sticker is MR7842—wait, excuse me, that is my frequent-flyer number. The baggage tag reads BK492.",
      },
      {
        speaker: "Officer",
        voice: "female",
        text: "Got it, BK492. Let me check the scanner log... Right, your bag was held briefly during a transfer security sweep in Zurich, so it has been placed on tomorrow morning's first connecting service.",
      },
      {
        speaker: "Passenger",
        voice: "male",
        text: "Oh, that is a relief. Will I have to come back to the airport to collect it? I have an early conference session downtown.",
      },
      {
        speaker: "Officer",
        voice: "female",
        text: "Not at all. We dispatch couriers free of charge within a forty-kilometre radius. Where are you staying?",
      },
      {
        speaker: "Passenger",
        voice: "male",
        text: "I originally booked the Harbour View Inn, but my company moved me to the Cedar Court Hotel on Station Road—that is C-E-D-A-R Court.",
      },
      {
        speaker: "Officer",
        voice: "female",
        text: "Cedar Court Hotel, noted. Our courier van departs at 11:00 a.m. and typically reaches downtown hotels between 12:30 and 1:30 p.m. Can we leave it with the reception desk if you are in a meeting?",
      },
      {
        speaker: "Passenger",
        voice: "male",
        text: "Yes, reception is staffed twenty-four hours. Also, my suit and toiletries are inside. Do you provide any interim allowance?",
      },
      {
        speaker: "Officer",
        voice: "female",
        text: "Yes, we reimburse essential toiletries and one change of clothing up to eighty pounds per passenger, provided you keep itemised receipts and submit them through our online portal within fourteen days.",
      },
      {
        speaker: "Passenger",
        voice: "male",
        text: "Understood. Thank you for sorting this out so quickly.",
      },
    ],
    questions: [
      {
        id: "ielts-l-q1",
        number: 1,
        questionType: "fill",
        typeBadge: {
          en: "Form Completion",
          ar: "إكمال استمارة",
        },
        prompt:
          "Complete the Lost Baggage Report. Write ONE WORD AND/OR A NUMBER.\nBaggage tag reference number: ________",
        acceptedAnswers: ["BK492", "bk492"],
        explanation: {
          en: "The passenger first reads MR7842 (his frequent-flyer number) and then self-corrects to BK492 for the baggage tag.",
          ar: "يقرأ المسافر أولاً MR7842 (رقم المسافر الدائم) ثم يصحح نفسه إلى BK492 لرقم بطاقة الحقيبة.",
        },
      },
      {
        id: "ielts-l-q2",
        number: 2,
        questionType: "fill",
        typeBadge: {
          en: "Form Completion",
          ar: "إكمال استمارة",
        },
        prompt:
          "Complete the Delivery Address. Write ONE WORD ONLY.\nHotel name: ________ Court Hotel (Station Road)",
        acceptedAnswers: ["Cedar", "cedar"],
        explanation: {
          en: "Although he originally booked Harbour View Inn, his company moved him to the Cedar Court Hotel, which he spells C-E-D-A-R.",
          ar: "رغم أنه حجز في البداية فندق Harbour View Inn، نقلته شركته إلى فندق Cedar Court وتهجّأ الكلمة C-E-D-A-R.",
        },
      },
      {
        id: "ielts-l-q3",
        number: 3,
        questionType: "mcq",
        typeBadge: {
          en: "Multiple Choice",
          ar: "اختيار من متعدد",
        },
        prompt: "Why was the passenger's suitcase delayed in Zurich?",
        options: [
          "It missed check-in because the passenger arrived late.",
          "It was held during a transfer security sweep.",
          "The luggage tag fell off on the conveyor belt.",
          "The aircraft exceeded its maximum cargo weight.",
        ],
        correctIndex: 1,
        explanation: {
          en: "The officer checks the scanner log and states the bag was held briefly during a transfer security sweep in Zurich.",
          ar: "تتحقق الموظفة من سجل الماسح الضوئي وتوضح أن الحقيبة أُوقفت مؤقتاً أثناء فحص أمني للرحلات المحوَّلة في زيورخ.",
        },
      },
      {
        id: "ielts-l-q4",
        number: 4,
        questionType: "mcq",
        typeBadge: {
          en: "Multiple Choice",
          ar: "اختيار من متعدد",
        },
        prompt: "What must the passenger do to claim reimbursement for essential items?",
        options: [
          "Collect cash vouchers at the airport desk before leaving.",
          "Submit itemised receipts online within fourteen days.",
          "Hand paper receipts to the hotel reception desk.",
          "Wait until the airline confirms the suitcase is lost permanently.",
        ],
        correctIndex: 1,
        explanation: {
          en: "The officer explains that reimbursement up to £80 requires keeping itemised receipts and submitting them via the online portal within fourteen days.",
          ar: "توضح الموظفة أن تعويض المشتريات الأساسية يتطلب الاحتفاظ بفواتير مفصّلة وتقديمها عبر البوابة الإلكترونية خلال أربعة عشر يوماً.",
        },
      },
    ],
  },
  {
    id: "ielts-l-part-2",
    title: {
      en: "Part 2: City Maritime Heritage Centre Orientation",
      ar: "الجزء ٢: جولة تعريفية في مركز التراث البحري بالمدينة",
    },
    context: {
      en: "You will hear a museum coordinator welcoming new visitors and outlining the galleries and facilities at the City Maritime Heritage Centre.",
      ar: "ستستمع إلى منسّق متحف يرحّب بالزوار الجدد ويستعرض القاعات والمرافق في مركز التراث البحري.",
    },
    speakerMode: "monologue",
    transcript: [
      {
        speaker: "Coordinator",
        voice: "male",
        text: "Welcome everyone to the City Maritime Heritage Centre. Before you explore on your own, let me give you a quick orientation so you do not miss our newest spaces.",
      },
      {
        speaker: "Coordinator",
        voice: "male",
        text: "Our centre occupies three nineteenth-century dockyard warehouses that were restored five years ago. You are currently standing in the North Atrium. Please note that while photography without flash is welcome in the permanent halls, filming is not permitted inside the special loan exhibition due to lender agreements.",
      },
      {
        speaker: "Coordinator",
        voice: "male",
        text: "Let me walk you through four highlights on your map. First, the East Wing houses the Compass Gallery, which displays hand-carved celestial astrolabes and early brass chronometers used by Indian Ocean and Atlantic navigators.",
      },
      {
        speaker: "Coordinator",
        voice: "male",
        text: "Just across the courtyard in the Dry Dock Pavilion, visitors can step aboard the restored 1894 wooden merchant schooner, The Albatross. Hard-soled heels are discouraged on the timber deck, so complimentary slip-on shoe covers are available at the gangway.",
      },
      {
        speaker: "Coordinator",
        voice: "male",
        text: "For families with younger visitors, the Signal Tower on the upper level runs our interactive storm-simulator and maritime knot-tying workshop every hour on the half hour.",
      },
      {
        speaker: "Coordinator",
        voice: "male",
        text: "Finally, if you want a quiet break, skip the crowded main foyer café and head to the Old Customs Library overlooking the harbour basin, where rare shipping ledgers are digitised and guests can read archival sea journals.",
      },
      {
        speaker: "Coordinator",
        voice: "male",
        text: "One quick schedule update: our harbour ferry shuttle usually leaves at 4:00 p.m., but because of today's high-tide maintenance works on Pier 2, the final boat will depart fifteen minutes earlier at 3:45 p.m.",
      },
    ],
    questions: [
      {
        id: "ielts-l-q5",
        number: 5,
        questionType: "matching",
        typeBadge: {
          en: "Matching Locations",
          ar: "مطابقة المواقع",
        },
        prompt:
          "Which area of the Maritime Heritage Centre contains celestial astrolabes and early brass chronometers?",
        options: [
          "The Compass Gallery (East Wing)",
          "The Dry Dock Pavilion",
          "The Signal Tower",
          "The Old Customs Library",
        ],
        correctIndex: 0,
        explanation: {
          en: "The coordinator specifies that the Compass Gallery in the East Wing displays hand-carved celestial astrolabes and early brass chronometers.",
          ar: "يذكر المنسّق أن قاعة البوصلة في الجناح الشرقي تعرض الأسطرلابات السماوية وساعات الكرونومتر النحاسية القديمة.",
        },
      },
      {
        id: "ielts-l-q6",
        number: 6,
        questionType: "matching",
        typeBadge: {
          en: "Matching Locations",
          ar: "مطابقة المواقع",
        },
        prompt:
          "Where should families go for the interactive storm-simulator and knot-tying workshop?",
        options: [
          "The North Atrium",
          "The Dry Dock Pavilion",
          "The Signal Tower",
          "The Old Customs Library",
        ],
        correctIndex: 2,
        explanation: {
          en: "The Signal Tower on the upper level hosts the interactive storm-simulator and maritime knot-tying workshop.",
          ar: "يستضيف برج الإشارة في الطابق العلوي جهاز محاكاة العواصف التفاعلي وورشة ربط العقد البحرية.",
        },
      },
      {
        id: "ielts-l-q7",
        number: 7,
        questionType: "mcq",
        typeBadge: {
          en: "Multiple Choice",
          ar: "اختيار من متعدد",
        },
        prompt: "What rule applies to the special loan exhibition mentioned by the coordinator?",
        options: [
          "Visitors must reserve a timed audio guide in advance.",
          "Filming is prohibited because of agreements with lenders.",
          "Children under twelve cannot enter without a tour guide.",
          "Flash photography is allowed only on weekday mornings.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Non-flash photography is permitted in permanent halls, but filming is not permitted in the special loan exhibition due to lender agreements.",
          ar: "يُسمح بالتصوير بدون فلاش في القاعات الدائمة، لكن تصوير الفيديو ممنوع في المعرض المُعار الخاص بموجب اتفاقيات مع الجهات المُعيرة.",
        },
      },
      {
        id: "ielts-l-q8",
        number: 8,
        questionType: "mcq",
        typeBadge: {
          en: "Multiple Choice",
          ar: "اختيار من متعدد",
        },
        prompt: "What change has been made to today's harbour ferry shuttle?",
        options: [
          "It has been cancelled due to rough winds.",
          "It will depart from Pier 4 instead of Pier 2.",
          "Its final departure has been moved forward to 3:45 p.m.",
          "Tickets must now be purchased online before boarding.",
        ],
        correctIndex: 2,
        explanation: {
          en: "Due to high-tide maintenance works on Pier 2, the last ferry departs fifteen minutes earlier than usual, at 3:45 p.m.",
          ar: "بسبب أعمال صيانة المد العالي في الرصيف ٢، ستغادر آخر عبّارة قبل موعدها بـ ١٥ دقيقة، أي الساعة ٣:٤٥ مساءً.",
        },
      },
    ],
  },
  {
    id: "ielts-l-part-3",
    title: {
      en: "Part 3: University Tutorial on Solar-Powered Desalination",
      ar: "الجزء ٣: نقاش جامعي حول تحلية المياه بالطاقة الشمسية",
    },
    context: {
      en: "You will hear two engineering students, Lina and Tariq, discussing their joint research project on renewable desalination with their academic tutor, Dr. Patel.",
      ar: "ستستمع إلى طالبَي هندسة، لينا وطارق، يناقشان مشروع بحثهما المشترك حول تحلية المياه بالطاقة المتجددة مع مشرفتهما الأكاديمية د. باتيل.",
    },
    speakerMode: "dialogue",
    transcript: [
      {
        speaker: "Dr. Patel",
        voice: "female",
        text: "Come in, Lina and Tariq. I have read your draft methodology for the coastal desalination case study. Overall, the energy modelling is solid, though there are a couple of design gaps we should tighten before fieldwork.",
      },
      {
        speaker: "Tariq",
        voice: "male",
        text: "Thanks, Dr. Patel. We originally planned to compare four desalination plants across the Red Sea and the Gulf, but after looking at the operational logs, two of the older thermal facilities lacked hourly solar-irradiance telemetry.",
      },
      {
        speaker: "Lina",
        voice: "female",
        text: "So we narrowed the sample to two hybrid reverse-osmosis facilities. I was worried that cutting the sample in half would weaken our statistical validity, yet Dr. Patel, you mentioned last term that data granularity often outweighs breadth.",
      },
      {
        speaker: "Dr. Patel",
        voice: "female",
        text: "Exactly. Two thoroughly instrumented plants will give you cleaner comparative curves than four patchy datasets. What concerned me more was your brine-discharge section.",
      },
      {
        speaker: "Tariq",
        voice: "male",
        text: "Right—I focused mainly on pumping energy per cubic metre and treated environmental brine dilution as a secondary footnote.",
      },
      {
        speaker: "Dr. Patel",
        voice: "female",
        text: "In an arid coastal zone, hypersaline discharge directly affects benthic seagrass beds. If your recommendation claims a plant is 'sustainable', the examiners will expect quantitative salinity dispersion benchmarks alongside kilowatt-hours.",
      },
      {
        speaker: "Lina",
        voice: "female",
        text: "That makes sense. I can take over the ecological literature synthesis and pull the Marine Institute's salinity buoy readings from 2022 to 2025.",
      },
      {
        speaker: "Tariq",
        voice: "male",
        text: "Great, and I will rerun the battery-storage sensitivity model so we see how cloud-cover fluctuations alter membrane pressure overnight.",
      },
      {
        speaker: "Dr. Patel",
        voice: "female",
        text: "Excellent division of labour. Bring your revised tables next Thursday, and make sure your abstract leads with the trade-off between capital cost and grid independence rather than repeating textbook reverse-osmosis definitions.",
      },
    ],
    questions: [
      {
        id: "ielts-l-q9",
        number: 9,
        questionType: "mcq",
        typeBadge: {
          en: "Multiple Choice",
          ar: "اختيار من متعدد",
        },
        prompt: "Why did Lina and Tariq reduce their study from four desalination plants to two?",
        options: [
          "Two facilities refused permission for site visits.",
          "Two older plants lacked hourly solar-irradiance records.",
          "Their research grant could only cover travel to two cities.",
          "Dr. Patel asked them to remove all reverse-osmosis facilities.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Tariq explains that two of the older thermal facilities lacked hourly solar-irradiance telemetry, prompting the narrower sample.",
          ar: "يوضح طارق أن محطتين حراريتين قديمتين افتقرتا إلى بيانات الإشعاع الشمسي الساعية، مما دفعهم لتقليص العينة.",
        },
      },
      {
        id: "ielts-l-q10",
        number: 10,
        questionType: "mcq",
        typeBadge: {
          en: "Multiple Choice",
          ar: "اختيار من متعدد",
        },
        prompt: "What is Dr. Patel's primary criticism of the students' draft methodology?",
        options: [
          "The energy modelling contains calculation errors.",
          "The sample size is too small for any meaningful conclusion.",
          "It neglects quantitative analysis of hypersaline brine discharge.",
          "It relies on outdated 1990s textbook equations.",
        ],
        correctIndex: 2,
        explanation: {
          en: "Dr. Patel says the energy modelling is solid, but she is concerned that brine discharge was treated as a footnote despite its impact on coastal seagrass beds.",
          ar: "تؤكد د. باتيل أن نمذجة الطاقة متينة، لكنها تنتقد تهميش تحليل تصريف المحلول الملحي عالي التركيز رغم أثره في الأعشاب البحرية.",
        },
      },
      {
        id: "ielts-l-q11",
        number: 11,
        questionType: "matching",
        typeBadge: {
          en: "Matching Responsibilities",
          ar: "مطابقة المهام",
        },
        prompt: "Which task does Lina agree to complete before next Thursday's meeting?",
        options: [
          "Rerun the overnight battery-storage sensitivity model.",
          "Compile ecological literature and Marine Institute salinity buoy data.",
          "Rewrite the textbook section explaining reverse-osmosis membranes.",
          "Contact the two excluded thermal facilities for missing logs.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Lina volunteers to take over the ecological literature synthesis and pull the Marine Institute's 2022–2025 salinity buoy readings.",
          ar: "تتطوع لينا لتولي مراجعة الدراسات البيئية واستخراج قراءات عوامات الملوحة من المعهد البحري بين ٢٠٢٢ و٢٠٢٥.",
        },
      },
      {
        id: "ielts-l-q12",
        number: 12,
        questionType: "matching",
        typeBadge: {
          en: "Matching Advice",
          ar: "مطابقة التوجيهات",
        },
        prompt:
          "What does Dr. Patel advise the students to highlight at the start of their abstract?",
        options: [
          "A glossary of standard desalination terminology.",
          "A biographical history of Red Sea water engineering.",
          "The trade-off between capital cost and grid independence.",
          "Recommendations for household rainwater harvesting.",
        ],
        correctIndex: 2,
        explanation: {
          en: "Dr. Patel advises them to open the abstract with the trade-off between capital cost and grid independence instead of textbook definitions.",
          ar: "تنصح د. باتيل ببدء الملخص بالمفاضلة بين التكلفة الرأسمالية والاستقلال عن الشبكة الكهربائية بدلاً من التعريفات المدرسية.",
        },
      },
    ],
  },
  {
    id: "ielts-l-part-4",
    title: {
      en: "Part 4: Lecture on Desert Windcatcher Architecture & Passive Cooling",
      ar: "الجزء ٤: محاضرة جامعية حول عمارة الملاقف الهوائية الصحراوية والتبريد السلبي",
    },
    context: {
      en: "You will hear an architecture professor lecturing on traditional windcatchers (badgirs / malqafs) and their modern application in sustainable buildings.",
      ar: "ستستمع إلى أستاذة عمارة تلقي محاضرة حول الملاقف الهوائية التقليدية وتطبيقاتها الحديثة في المباني المستدامة.",
    },
    speakerMode: "lecture",
    transcript: [
      {
        speaker: "Professor",
        voice: "female",
        text: "Good morning. Today we examine how vernacular architects in hot, arid regions achieved remarkable indoor comfort centuries before mechanical air conditioning—specifically through the windcatcher, known as the malqaf in Egypt and the badgir across Persia and the Gulf.",
      },
      {
        speaker: "Professor",
        voice: "female",
        text: "At its core, a windcatcher is a vertical masonry shaft rising above the roofline to intercept cleaner, faster-moving breezes before they heat up near ground level. Depending on regional wind patterns, shafts may be unidirectional—angled strictly toward the prevailing northern breeze—or multidirectional, divided internally by cross-shaped partitions to capture airflow from any compass point.",
      },
      {
        speaker: "Professor",
        voice: "female",
        text: "What makes the system genuinely ingenious is that it operates through two distinct physical mechanisms. When external wind is present, positive pressure on the windward face drives cooler air downward into living spaces while negative pressure on the leeward side draws stale, warm air out.",
      },
      {
        speaker: "Professor",
        voice: "female",
        text: "Yet even on completely calm afternoons with zero wind, the tower continues to function as a solar chimney. Thick adobe walls absorb heat during the day, warming the air inside the upper shaft so it becomes buoyant and rises—pulling replacement air through shaded courtyards. Engineers refer to this heat-storing property of heavy masonry as thermal mass.",
      },
      {
        speaker: "Professor",
        voice: "female",
        text: "In extreme desert cities such as Yazd, builders amplified cooling by routing the descending air across an underground water channel called a qanat. As dry air passes over the cold subterranean stream, evaporative cooling can drop indoor temperatures by up to twelve degrees Celsius.",
      },
      {
        speaker: "Professor",
        voice: "female",
        text: "Today, contemporary architects have adapted these principles for schools, museums, and university campuses using automated louvres and carbon-dioxide sensors. While modern windcatchers rarely eliminate mechanical cooling entirely during peak forty-five-degree summer afternoons, field audits show they routinely cut annual HVAC electricity demand by thirty to fifty percent.",
      },
    ],
    questions: [
      {
        id: "ielts-l-q13",
        number: 13,
        questionType: "fill",
        typeBadge: {
          en: "Lecture Summary Completion",
          ar: "إكمال ملخص محاضرة",
        },
        prompt:
          "Complete the lecture notes. Write NO MORE THAN TWO WORDS.\nHeavy adobe walls regulate heat across day and night because of their high ________.",
        acceptedAnswers: ["thermal mass", "Thermal mass"],
        explanation: {
          en: "The professor states that engineers refer to this heat-storing property of heavy masonry as 'thermal mass'.",
          ar: "تذكر المحاضرة أن المهندسين يطلقون على قدرة البناء الثقيل على تخزين الحرارة مصطلح «الكتلة الحرارية» (thermal mass).",
        },
      },
      {
        id: "ielts-l-q14",
        number: 14,
        questionType: "fill",
        typeBadge: {
          en: "Lecture Summary Completion",
          ar: "إكمال ملخص محاضرة",
        },
        prompt:
          "Complete the lecture notes. Write ONE WORD ONLY.\nIn Yazd, descending air is routed across a subterranean water channel known as a ________ to trigger evaporative cooling.",
        acceptedAnswers: ["qanat", "Qanat"],
        explanation: {
          en: "The professor explains that builders in Yazd routed descending air across an underground water channel called a 'qanat'.",
          ar: "توضح الأستاذة أن البنائين في يزد وجهوا الهواء الهابط فوق قناة مائية جوفية تُسمى «القناة» (qanat).",
        },
      },
      {
        id: "ielts-l-q15",
        number: 15,
        questionType: "mcq",
        typeBadge: {
          en: "Multiple Choice",
          ar: "اختيار من متعدد",
        },
        prompt:
          "How does a traditional windcatcher continue ventilating a home when there is no outdoor wind?",
        options: [
          "Hidden wooden fans powered by groundwater turn inside the shaft.",
          "Warmed masonry creates rising buoyant air, acting like a solar chimney.",
          "Residents open basement vents to release compressed cool air.",
          "Metal roof reflectors bounce sunlight down into the courtyard.",
        ],
        correctIndex: 1,
        explanation: {
          en: "On calm days, warmed adobe walls heat the air inside the upper shaft so it rises as a solar chimney, pulling fresh air from shaded courtyards.",
          ar: "في الأيام الساكنة، تسخن جدران الطوب اللبن الهواء في أعلى البرج فيرتفع كمدخنة شمسية ساحباً هواءً بديلاً من الأفنية المظللة.",
        },
      },
      {
        id: "ielts-l-q16",
        number: 16,
        questionType: "mcq",
        typeBadge: {
          en: "Multiple Choice",
          ar: "اختيار من متعدد",
        },
        prompt: "What conclusion do field audits reach about modern sensor-equipped windcatchers?",
        options: [
          "They completely replace mechanical air conditioning year-round.",
          "They are only financially viable in historic heritage restorations.",
          "They typically reduce annual HVAC electricity use by 30% to 50%.",
          "They require constant manual adjustment by building staff.",
        ],
        correctIndex: 2,
        explanation: {
          en: "While they rarely eliminate mechanical cooling during 45°C peaks, field audits show modern windcatchers cut annual HVAC electricity demand by 30% to 50%.",
          ar: "رغم أنها نادراً ما تُلغي التكييف الميكانيكي تماماً في ذروة الصيف، تُظهر التدقيقات الميدانية خفضها لاستهلاك كهرباء التكييف السنوي بنسبة ٣٠ إلى ٥٠٪.",
        },
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* IELTS Academic Reading Passages (60 min · 3 Passages · 18 Questions)       */
/* -------------------------------------------------------------------------- */

const IELTS_ACADEMIC_PASSAGES: ReadingPassage[] = [
  {
    id: "ielts-ac-r-p1",
    title: "The Aerodynamic Precision of Ancient Windcatchers",
    category: {
      en: "Passage 1 · Architectural Engineering & History",
      ar: "القطعة ١ · الهندسة المعمارية والتاريخ",
    },
    paragraphs: [
      {
        label: "A",
        text: "Long before the invention of vapour-compression refrigeration, urban settlements across the Arabian Peninsula, Iran, and North Africa maintained habitable interiors during blistering summers through passive architectural shafts known as windcatchers. Rather than relying on moving parts, these tall earthen towers exploited subtle differences in air pressure, wind velocity, and diurnal temperature swings to circulate filtered breezes through densely packed courtyard homes.",
      },
      {
        label: "B",
        text: "Recent computational fluid dynamics (CFD) simulations conducted by structural engineers in Sharjah and Yazd have overturned the assumption that historical windcatchers were built purely by trial and error. Wind-tunnel scale models demonstrate that the exact height-to-width ratios of surviving nineteenth-century towers closely align with optimal aerodynamic efficiency: shafts rising between eight and twelve metres clear the turbulent urban boundary layer, tapping into airflows up to forty percent faster and three degrees cooler than street-level air.",
      },
      {
        label: "C",
        text: "Regional morphology varied dramatically in response to local climate. Along the humid coasts of the Arabian Gulf, where summer air is saturated with moisture and evaporative cooling loses effectiveness, craftsmen erected square four-sided towers (barjeels) open on every elevation to maximise air velocity across human skin. Conversely, in hyper-arid inland plateaus such as central Iran, builders paired narrow vertical ducts with underground stone cisterns and wet porous pottery, lowering dry-bulb temperatures dramatically before the air entered reception halls.",
      },
      {
        label: "D",
        text: "Despite their zero-carbon credentials, traditional windcatchers fell rapidly out of favour after the 1960s as subsidised electricity and sealed glass curtain-wall skyscrapers became symbols of urban modernity. Critics noted genuine drawbacks in dense megacities: open shafts admit fine desert dust, street noise, and occasional birds if unscreened. However, twenty-first-century engineers have largely resolved these flaws through electrostatic dust louvers, acoustic baffles, and automated dampers linked to indoor air-quality monitors—signalling a quiet renaissance in hybrid passive cooling.",
      },
    ],
    questions: [
      {
        id: "ielts-ac-r-q1",
        number: 1,
        questionType: "tfng",
        typeBadge: {
          en: "True / False / Not Given",
          ar: "صحيح / خطأ / غير مذكور",
        },
        prompt:
          "Modern computer simulations confirm that historical windcatcher builders achieved near-optimal aerodynamic proportions.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctIndex: 0,
        explanation: {
          en: "Paragraph B states that CFD simulations and wind-tunnel models show the height-to-width ratios of surviving towers closely align with optimal aerodynamic efficiency.",
          ar: "تؤكد الفقرة B أن محاكاة ديناميكا الموائع الحاسوبية أثبتت أن نسب ارتفاع وعرض الأبراج التقليدية تقترب من الكفاءة الديناميكية الهوائية المثلى.",
        },
      },
      {
        id: "ielts-ac-r-q2",
        number: 2,
        questionType: "tfng",
        typeBadge: {
          en: "True / False / Not Given",
          ar: "صحيح / خطأ / غير مذكور",
        },
        prompt:
          "Evaporative cooling using underground water channels was the primary method used in humid Gulf coastal cities.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctIndex: 1,
        explanation: {
          en: "Paragraph C contradicts this: on the humid Gulf coast, evaporative cooling loses effectiveness, so builders used four-sided barjeels to maximise air velocity instead.",
          ar: "تناقض الفقرة C ذلك؛ فعلى سواحل الخليج الرطبة يفقد التبريد التبخيري فعاليته، لذا استخدم البناؤون البراجيل رباعية الجهات لزيادة سرعة الهواء.",
        },
      },
      {
        id: "ielts-ac-r-q3",
        number: 3,
        questionType: "tfng",
        typeBadge: {
          en: "True / False / Not Given",
          ar: "صحيح / خطأ / غير مذكور",
        },
        prompt:
          "Municipal building codes in Sharjah now legally require every newly built villa to include a hybrid windcatcher.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctIndex: 2,
        explanation: {
          en: "While Paragraph B mentions researchers in Sharjah and Paragraph D mentions modern hybrid windcatchers, there is no mention of legal mandates for new villas.",
          ar: "رغم ذكر باحثين في الشارقة في الفقرة B والملاقف الهجينة في D، لا يوجد أي ذكر لقوانين بناء تُلزم الفلل الجديدة بتركيبها.",
        },
      },
      {
        id: "ielts-ac-r-q4",
        number: 4,
        questionType: "fill",
        typeBadge: {
          en: "Summary Completion",
          ar: "إكمال الملخص",
        },
        prompt:
          "Complete the note using NO MORE THAN TWO WORDS from Paragraph B.\nTowers rising 8 to 12 metres rise above the turbulent urban ________ to capture faster, cooler breezes.",
        acceptedAnswers: ["boundary layer", "Boundary layer"],
        explanation: {
          en: "Paragraph B states that shafts rising between eight and twelve metres clear the turbulent urban 'boundary layer'.",
          ar: "تذكر الفقرة B أن الأبراج التي ترتفع بين ٨ و١٢ متراً تتجاوز «الطبقة الحدية» (boundary layer) الحضرية المضطربة.",
        },
      },
      {
        id: "ielts-ac-r-q5",
        number: 5,
        questionType: "fill",
        typeBadge: {
          en: "Summary Completion",
          ar: "إكمال الملخص",
        },
        prompt:
          "Complete the note using ONE WORD ONLY from Paragraph D.\nModern engineers counter traffic sound inside open ventilation ducts by installing ________ baffles.",
        acceptedAnswers: ["acoustic", "Acoustic"],
        explanation: {
          en: "Paragraph D specifically notes that engineers resolved street-noise drawbacks using 'acoustic' baffles.",
          ar: "تشير الفقرة D تحديداً إلى أن المهندسين عالجوا ضوضاء الشوارع باستخدام حواجز «صوتية» (acoustic).",
        },
      },
      {
        id: "ielts-ac-r-q6",
        number: 6,
        questionType: "mcq",
        typeBadge: {
          en: "Multiple Choice",
          ar: "اختيار من متعدد",
        },
        prompt:
          "According to Paragraph D, what caused traditional windcatchers to decline rapidly after the 1960s?",
        options: [
          "A shortage of skilled adobe brickmakers in rural villages.",
          "Subsidised electricity and the prestige of sealed glass towers.",
          "New health regulations banning natural ventilation in cities.",
          "Rising regional wind speeds that damaged tall earthen shafts.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Paragraph D attributes the post-1960s decline to subsidised electricity and sealed glass curtain-wall skyscrapers becoming symbols of modernity.",
          ar: "تعزو الفقرة D التراجع بعد الستينيات إلى الكهرباء المدعومة وناطحات السحاب الزجاجية المغلقة كرموز للحداثة الحضرية.",
        },
      },
    ],
  },
  {
    id: "ielts-ac-r-p2",
    title: "Urban Green Corridors and Metropolitan Microclimates",
    category: {
      en: "Passage 2 · Environmental Urbanism",
      ar: "القطعة ٢ · التخطيط الحضري البيئي",
    },
    paragraphs: [
      {
        label: "A",
        text: "Dense asphalt pavements, dark bitumen roofs, and waste heat from vehicular traffic routinely push metropolitan centres four to seven degrees Celsius warmer than surrounding rural landscapes—a phenomenon known as the urban heat island (UHI) effect. While municipal governments have long planted isolated pocket parks to soften summer heat, thermal satellite mapping reveals that fragmented green patches rarely cool neighbourhoods more than a hundred metres beyond their perimeter.",
      },
      {
        label: "B",
        text: "Increasingly, urban climatologists advocate linking parks, tree-lined boulevards, and vegetated riverbanks into continuous 'green corridors'. When aligned with prevailing nocturnal breezes, these uninterrupted botanical channels function as cool-air rivers, transporting lower-temperature suburban air deep into high-density commercial cores. A landmark five-year monitoring programme in Stuttgart, Germany, demonstrated that preserving hillside woodland ventilation paths prevented stagnant summer heat domes from forming over the city basin.",
      },
      {
        label: "C",
        text: "Plant species selection proves just as decisive as corridor geometry. Fast-growing ornamental lawns consume prodigious volumes of treated irrigation water while offering negligible canopy shade. By contrast, native drought-adapted trees with broad, layered foliage lower street temperatures through a dual mechanism: intercepting direct solar radiation before it strikes concrete and releasing water vapour via evapotranspiration. In arid cities such as Riyadh and Phoenix, replacing turf strips with native acacia and mesquite canopies has cut municipal landscape water consumption by nearly half while measurably improving pedestrian comfort.",
      },
      {
        label: "D",
        text: "Yet green infrastructure carries an unintended social paradox that planners term 'ecological gentrification'. Once derelict canal banks or railway right-of-ways are transformed into shaded linear parks, adjacent property values and commercial rents frequently surge, pricing out the lower-income residents who suffered most acutely from extreme urban heat in the first place. Progressive municipalities now pair corridor investments with rent-stabilisation covenants and community land trusts to ensure climate adaptation remains equitable.",
      },
    ],
    questions: [
      {
        id: "ielts-ac-r-q7",
        number: 7,
        questionType: "matching",
        typeBadge: {
          en: "Matching Headings",
          ar: "مطابقة العناوين",
        },
        prompt: "Choose the most suitable heading for Paragraph B.",
        options: [
          "Why isolated pocket parks fail thermal satellite tests",
          "How connected vegetation networks channel cool air into city centres",
          "Financial barriers to maintaining European hillside forests",
          "Comparing water bills across Mediterranean park networks",
        ],
        correctIndex: 1,
        explanation: {
          en: "Paragraph B explains how continuous green corridors act as cool-air rivers that funnel cooler air into dense urban cores, illustrated by Stuttgart.",
          ar: "تشرح الفقرة B كيف تعمل الممرات الخضراء المتصلة كأنهار هواء بارد تنقل الهواء المعتدل إلى مراكز المدن الكثيفة، مع مثال شتوتغارت.",
        },
      },
      {
        id: "ielts-ac-r-q8",
        number: 8,
        questionType: "matching",
        typeBadge: {
          en: "Matching Headings",
          ar: "مطابقة العناوين",
        },
        prompt: "Choose the most suitable heading for Paragraph D.",
        options: [
          "The hidden housing-affordability risk of urban greening",
          "Why railway corridors are structurally unsuitable for planting",
          "Public opposition to replacing asphalt parking lots",
          "How private developers fund municipal irrigation pipelines",
        ],
        correctIndex: 0,
        explanation: {
          en: "Paragraph D focuses on 'ecological gentrification'—how new linear parks raise rents and displace lower-income residents unless paired with affordability protections.",
          ar: "تركّز الفقرة D على «التحسين البيئي المُقصي» حيث ترفع الحدائق الجديدة الإيجارات وتُخرج السكان ذوي الدخل المحدود ما لم تُقترن بضمانات سكنية.",
        },
      },
      {
        id: "ielts-ac-r-q9",
        number: 9,
        questionType: "tfng",
        typeBadge: {
          en: "True / False / Not Given",
          ar: "صحيح / خطأ / غير مذكور",
        },
        prompt:
          "Satellite thermal studies show that small, disconnected city parks cool neighbourhoods several kilometres away.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctIndex: 1,
        explanation: {
          en: "Paragraph A states the exact opposite: fragmented green patches rarely cool neighbourhoods more than a hundred metres beyond their perimeter.",
          ar: "تذكر الفقرة A العكس تماماً: البقع الخضراء المتفرقة نادراً ما تبرّد الأحياء لمسافة تتجاوز مئة متر خارج محيطها.",
        },
      },
      {
        id: "ielts-ac-r-q10",
        number: 10,
        questionType: "tfng",
        typeBadge: {
          en: "True / False / Not Given",
          ar: "صحيح / خطأ / غير مذكور",
        },
        prompt:
          "Replacing ornamental grass with native shade trees in arid cities reduced landscape water demand while improving pedestrian comfort.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctIndex: 0,
        explanation: {
          en: "Paragraph C notes that in Riyadh and Phoenix, replacing turf strips with native acacia and mesquite canopies cut landscape water use by nearly half while improving pedestrian comfort.",
          ar: "تذكر الفقرة C أن استبدال المسطحات العشبية بأشجار محلية مثل الأكاسيا في الرياض وفينيكس خفض استهلاك المياه للنصف تقريباً وحسّن راحة المشاة.",
        },
      },
      {
        id: "ielts-ac-r-q11",
        number: 11,
        questionType: "mcq",
        typeBadge: {
          en: "Multiple Choice",
          ar: "اختيار من متعدد",
        },
        prompt:
          "By what two mechanisms do native broad-canopy trees cool urban streets according to Paragraph C?",
        options: [
          "Absorbing vehicle exhaust and reflecting moonlight.",
          "Blocking direct sunlight and releasing vapour through evapotranspiration.",
          "Storing rainwater in concrete basins and slowing wind speeds.",
          "Replacing dark asphalt with pale gravel walkways.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Paragraph C identifies the dual mechanism as intercepting direct solar radiation before it strikes concrete and releasing water vapour via evapotranspiration.",
          ar: "تحدد الفقرة C الآلية المزدوجة في اعتراض الإشعاع الشمسي المباشر وإطلاق بخار الماء عبر النتح التبخيري.",
        },
      },
      {
        id: "ielts-ac-r-q12",
        number: 12,
        questionType: "mcq",
        typeBadge: {
          en: "Multiple Choice",
          ar: "اختيار من متعدد",
        },
        prompt: "How are progressive cities attempting to counter ecological gentrification?",
        options: [
          "By building green corridors exclusively in affluent suburbs.",
          "By charging entrance fees to visitors from outside the district.",
          "By combining park projects with rent-stabilisation covenants and land trusts.",
          "By limiting tree planting to industrial warehouse zones.",
        ],
        correctIndex: 2,
        explanation: {
          en: "Paragraph D states that progressive municipalities pair corridor investments with rent-stabilisation covenants and community land trusts.",
          ar: "توضح الفقرة D أن البلديات التقدمية تقرن استثمارات الممرات الخضراء بضوابط استقرار الإيجار وصناديق الأراضي المجتمعية.",
        },
      },
    ],
  },
  {
    id: "ielts-ac-r-p3",
    title: "Algorithmic Triage in Modern Emergency Departments",
    category: {
      en: "Passage 3 · Clinical Informatics & Ethics",
      ar: "القطعة ٣ · المعلوماتية السريرية والأخلاقيات",
    },
    paragraphs: [
      {
        label: "A",
        text: "When an emergency department operates above capacity, the split-second decisions made at the triage desk determine who receives immediate resuscitation and who waits hours in the lobby. Traditional triage relies on five-tier nurse-administered protocols that combine vital signs with clinical intuition. Over the past decade, however, hospitals across Europe, North America, and East Asia have piloted machine-learning decision-support tools designed to flag subtle patterns of physiological deterioration before human observers notice overt distress.",
      },
      {
        label: "B",
        text: "Retrospective trials are undeniably compelling. Trained on hundreds of thousands of anonymised electronic health records, gradient-boosted models can synthesise heart-rate variability, laboratory trends, and historical medication interactions in milliseconds. In a multi-hospital study published in 2024, algorithmic sepsis alerts prompted clinicians to initiate intravenous antibiotics an average of thirty-eight minutes earlier than standard protocols, correlating with a measurable decline in intensive-care transfers.",
      },
      {
        label: "C",
        text: "Yet translating retrospective accuracy into live clinical wards has revealed stubborn human-factor and fairness obstacles. First, predictive models inherit the historical biases embedded in training records: if an underserved population historically received fewer diagnostic scans due to cost barriers, an algorithm that uses past healthcare spending as a proxy for illness severity will systematically underestimate that group's clinical urgency. Second, excessive low-threshold warnings trigger 'alert fatigue', prompting overworked physicians to dismiss pop-up banners reflexively—occasionally overlooking genuine emergencies.",
      },
      {
        label: "D",
        text: "Consequently, medical regulators and bioethicists increasingly reject the framing of artificial intelligence as an autonomous replacement for triage clinicians. Instead, best-practice frameworks insist on 'human-in-the-loop' governance: algorithms must surface transparent confidence intervals and contributing risk factors rather than opaque risk scores, undergo routine demographic equity audits after deployment, and preserve a clear legal accountability trail resting with the attending clinical team.",
      },
    ],
    questions: [
      {
        id: "ielts-ac-r-q13",
        number: 13,
        questionType: "mcq",
        typeBadge: {
          en: "Multiple Choice",
          ar: "اختيار من متعدد",
        },
        prompt: "What outcome was observed in the 2024 multi-hospital sepsis alert study?",
        options: [
          "Emergency waiting rooms cut total patient admissions by half.",
          "Clinicians started intravenous antibiotics 38 minutes earlier on average.",
          "Nurses were no longer required to record patient vital signs manually.",
          "Hospital software eliminated all false-positive sepsis notifications.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Paragraph B reports that algorithmic sepsis alerts led clinicians to initiate intravenous antibiotics an average of thirty-eight minutes earlier, correlating with fewer ICU transfers.",
          ar: "تشير الفقرة B إلى أن تنبيهات تعفّن الدم الخوارزمية دفعت الأطباء لبدء المضادات الحيوية الوريدية قبل ٣٨ دقيقة في المتوسط.",
        },
      },
      {
        id: "ielts-ac-r-q14",
        number: 14,
        questionType: "mcq",
        typeBadge: {
          en: "Multiple Choice",
          ar: "اختيار من متعدد",
        },
        prompt:
          "Why might a triage algorithm underestimate the medical urgency of an underserved group?",
        options: [
          "Because underserved patients rarely visit emergency departments.",
          "Because it treats lower historical healthcare spending as evidence of lower illness severity.",
          "Because hospital vital-sign monitors malfunction more often in public clinics.",
          "Because electronic records delete demographic data after thirty days.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Paragraph C explains that using past healthcare spending as a proxy for illness severity systematically underestimates urgency for groups who historically faced cost barriers to care.",
          ar: "توضح الفقرة C أن استخدام الإنفاق الصحي السابق كمؤشر لشدة المرض يؤدي إلى التقليل المنهجي من خطورة حالات الفئات الأقل حصولاً على الرعاية.",
        },
      },
      {
        id: "ielts-ac-r-q15",
        number: 15,
        questionType: "tfng",
        typeBadge: {
          en: "True / False / Not Given",
          ar: "صحيح / خطأ / غير مذكور",
        },
        prompt:
          "Frequent low-threshold algorithmic warnings can cause physicians to ignore critical alerts.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctIndex: 0,
        explanation: {
          en: "Paragraph C describes 'alert fatigue', where excessive low-threshold warnings lead overworked doctors to dismiss banners reflexively and occasionally miss real emergencies.",
          ar: "تصف الفقرة C «إرهاق التنبيهات»، حيث تدفع التنبيهات المتكررة الأطباء المرهقين لتجاهل النوافذ المنبثقة وتفويت حالات طارئة حقيقية أحياناً.",
        },
      },
      {
        id: "ielts-ac-r-q16",
        number: 16,
        questionType: "tfng",
        typeBadge: {
          en: "True / False / Not Given",
          ar: "صحيح / خطأ / غير مذكور",
        },
        prompt:
          "Medical regulators recommend granting triage algorithms full legal responsibility so doctors are protected from liability.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctIndex: 1,
        explanation: {
          en: "Paragraph D explicitly states the opposite: best-practice frameworks preserve a clear legal accountability trail resting with the attending clinical team.",
          ar: "تذكر الفقرة D العكس صراحةً: أطر الممارسة الفضلى تُبقي المسؤولية القانونية واضحة لدى الفريق السريري المشرف.",
        },
      },
      {
        id: "ielts-ac-r-q17",
        number: 17,
        questionType: "tfng",
        typeBadge: {
          en: "True / False / Not Given",
          ar: "صحيح / خطأ / غير مذكور",
        },
        prompt:
          "Most patients prefer being triaged by a software model rather than a human emergency nurse.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctIndex: 2,
        explanation: {
          en: "The passage discusses clinical outcomes, bias, alert fatigue, and regulation, but never reports patient preference surveys.",
          ar: "تناقش القطعة النتائج السريرية والتحيز وإرهاق التنبيهات والتنظيم، لكنها لا تذكر أبداً تفضيلات المرضى.",
        },
      },
      {
        id: "ielts-ac-r-q18",
        number: 18,
        questionType: "fill",
        typeBadge: {
          en: "Summary Completion",
          ar: "إكمال الملخص",
        },
        prompt:
          "Complete the summary using NO MORE THAN TWO WORDS from Paragraph D.\nRegulators favour ________ governance in which clinicians review transparent risk factors rather than relying on opaque scores.",
        acceptedAnswers: ["human-in-the-loop", "Human-in-the-loop"],
        explanation: {
          en: "Paragraph D states that best-practice frameworks insist on 'human-in-the-loop' governance.",
          ar: "تنص الفقرة D على أن أطر الممارسة الفضلى تؤكد على حوكمة «الإنسان في الحلقة» (human-in-the-loop).",
        },
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* IELTS General Training Reading Passages (60 min · 3 Passages · 18 Qs)      */
/* -------------------------------------------------------------------------- */

const IELTS_GENERAL_PASSAGES: ReadingPassage[] = [
  {
    id: "ielts-gt-r-p1",
    title: "City Library Membership & International Rail Pass Guide",
    category: {
      en: "Section 1 · Everyday Notices & Public Guides",
      ar: "القسم ١ · الإعلانات اليومية والأدلة العامة",
    },
    paragraphs: [
      {
        label: "A",
        text: "NORTHGATE PUBLIC LIBRARY — MEMBERSHIP TIERS: Residents aged 18 or over who live, work, or study within the Greater Northgate municipality qualify for a free Standard Card upon presenting photo identification and one proof of local address dated within the last ninety days. Standard Cardholders may borrow up to twelve print items for three weeks and reserve up to four e-books or audiobooks simultaneously through the Libby portal.",
      },
      {
        label: "B",
        text: "Visitor Passes are available for temporary guests staying fewer than six months for a refundable deposit of £25, allowing up to four print loans at a time (inter-library loans and 3D-printer studio bookings are excluded). Overdue fines were abolished for standard adult and children's books in 2023; however, items remaining unreturned thirty days past their due date are billed at replacement cost plus a £6 administrative fee.",
      },
      {
        label: "C",
        text: "EURORAIL FLEXI-PASS — PASSENGER QUICK GUIDE: The 7-Day-in-1-Month Flexi-Pass permits unlimited second-class rail travel across 33 participating national networks on any seven non-consecutive calendar days within a thirty-day activation window. You must activate your pass inside the RailPass mobile app before boarding your first train; paper printouts are no longer accepted on high-speed cross-border routes.",
      },
      {
        label: "D",
        text: "Important Seat Reservation Notice: While regional and commuter trains allow open boarding, high-speed international services (including Eurostar, TGV International, and night sleeper compartments) require a compulsory paid seat reservation booked in advance. Passholders travelling with a single overnight train departing after 7:00 p.m. and arriving after 4:00 a.m. only need to consume ONE travel day—the date of departure—provided no onward connection is boarded after midnight.",
      },
    ],
    questions: [
      {
        id: "ielts-gt-r-q1",
        number: 1,
        questionType: "tfng",
        typeBadge: {
          en: "True / False / Not Given",
          ar: "صحيح / خطأ / غير مذكور",
        },
        prompt:
          "Adults who work inside Greater Northgate but live outside the municipality can apply for a free Standard Library Card.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctIndex: 0,
        explanation: {
          en: "Paragraph A states that anyone aged 18 or over who lives, works, or studies within Greater Northgate qualifies for a free Standard Card.",
          ar: "تنص الفقرة A على أن أي شخص يبلغ ١٨ عاماً فأكثر ويعيش أو يعمل أو يدرس داخل البلدية مؤهل للحصول على البطاقة المجانية.",
        },
      },
      {
        id: "ielts-gt-r-q2",
        number: 2,
        questionType: "tfng",
        typeBadge: {
          en: "True / False / Not Given",
          ar: "صحيح / خطأ / غير مذكور",
        },
        prompt:
          "Holders of a Northgate Visitor Pass are allowed to book sessions in the library's 3D-printer studio.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctIndex: 1,
        explanation: {
          en: "Paragraph B explicitly notes that inter-library loans and 3D-printer studio bookings are excluded from the Visitor Pass.",
          ar: "توضح الفقرة B صراحةً أن الإعارة بين المكتبات وحجوزات استوديو الطابعة ثلاثية الأبعاد مستثناة من بطاقة الزائر.",
        },
      },
      {
        id: "ielts-gt-r-q3",
        number: 3,
        questionType: "fill",
        typeBadge: {
          en: "Short Answer / Fill-in",
          ar: "إكمال الفراغ",
        },
        prompt:
          "Write ONE NUMBER ONLY from Paragraph B.\nUnreturned library items incur a replacement bill plus a £6 fee once they are ________ days past their due date.",
        acceptedAnswers: ["30", "thirty", "Thirty"],
        explanation: {
          en: "Paragraph B states that items remaining unreturned thirty days past their due date are billed at replacement cost plus a £6 administrative fee.",
          ar: "تذكر الفقرة B أن الكتب غير المُعادة بعد ثلاثين يوماً من موعد استحقاقها تُحتسب بتكلفة الاستبدال مضافاً إليها رسم إداري قدره ٦ جنيهات.",
        },
      },
      {
        id: "ielts-gt-r-q4",
        number: 4,
        questionType: "tfng",
        typeBadge: {
          en: "True / False / Not Given",
          ar: "صحيح / خطأ / غير مذكور",
        },
        prompt:
          "EuroRail Flexi-Pass holders may show a printed paper copy on high-speed cross-border trains if their phone battery dies.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctIndex: 1,
        explanation: {
          en: "Paragraph C states clearly that paper printouts are no longer accepted on high-speed cross-border routes.",
          ar: "توضح الفقرة C بوضوح أن النسخ الورقية المطبوعة لم تعد مقبولة في القطارات السريعة العابرة للحدود.",
        },
      },
      {
        id: "ielts-gt-r-q5",
        number: 5,
        questionType: "mcq",
        typeBadge: {
          en: "Multiple Choice",
          ar: "اختيار من متعدد",
        },
        prompt:
          "Which type of rail service requires an additional paid seat reservation for Flexi-Pass holders?",
        options: [
          "All local commuter trains during weekday rush hour.",
          "High-speed international trains and night sleeper compartments.",
          "Any regional train travelling for more than two hours.",
          "Every train departing on a weekend or public holiday.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Paragraph D specifies that while regional and commuter trains allow open boarding, high-speed international services and night sleeper compartments require a compulsory paid reservation.",
          ar: "تحدد الفقرة D أن القطارات الدولية السريعة ومقصورات النوم الليلية تتطلب حجز مقعد مدفوع إلزامياً مسبقاً.",
        },
      },
      {
        id: "ielts-gt-r-q6",
        number: 6,
        questionType: "mcq",
        typeBadge: {
          en: "Multiple Choice",
          ar: "اختيار من متعدد",
        },
        prompt:
          "Under what condition does an overnight journey use only ONE Flexi-Pass travel day?",
        options: [
          "The train departs after 7:00 p.m., arrives after 4:00 a.m., and no second train is boarded after midnight.",
          "The passenger travels in first class and reserves a private cabin.",
          "The entire trip stays within a single country's national network.",
          "The ticket is validated by a station conductor prior to 6:00 p.m.",
        ],
        correctIndex: 0,
        explanation: {
          en: "Paragraph D explains the 7 p.m. overnight rule: departing after 7:00 p.m. and arriving after 4:00 a.m. uses only the departure date provided no onward connection is boarded after midnight.",
          ar: "تشرح الفقرة D قاعدة السفر الليلي: المغادرة بعد السابعة مساءً والوصول بعد الرابعة صباحاً تستهلك يوم سفر واحداً فقط بشرط عدم ركوب قطار آخر بعد منتصف الليل.",
        },
      },
    ],
  },
  {
    id: "ielts-gt-r-p2",
    title: "Workplace Remote-Work & Hybrid Operations Handbook",
    category: {
      en: "Section 2 · Workplace Policies & Procedures",
      ar: "القسم ٢ · سياسات وإجراءات بيئة العمل",
    },
    paragraphs: [
      {
        label: "A",
        text: "ELIGIBILITY & CORE HOURS: Full-time staff who have completed their three-month probationary review may request a Hybrid Schedule consisting of up to three remote days per week. Regardless of work location, all employees must remain reachable on company messaging platforms during Core Collaboration Hours (10:00 a.m. to 3:00 p.m. local head-office time), while retaining flexibility to schedule their remaining three daily hours earlier or later.",
      },
      {
        label: "B",
        text: "HOME-OFFICE EQUIPMENT STIPEND: Approved hybrid employees receive a one-time £450 ergonomic setup allowance to purchase an adjustable chair, external monitor, or noise-cancelling headset. Equipment purchased through the stipend remains company property during the first twenty-four months of employment; employees who resign within that window must return hardware via prepaid courier or reimburse its depreciated value.",
      },
      {
        label: "C",
        text: "INFORMATION SECURITY PROTOCOLS: Working from public cafés or shared airport lounges is permissible only when connected through the corporate VPN client and using an approved privacy screen filter. Storing client spreadsheets on personal USB drives or forwarding work attachments to private email accounts is strictly prohibited and triggers an immediate IT compliance audit.",
      },
      {
        label: "D",
        text: "WORKING FROM ABROAD: Staff wishing to work remotely from another country for up to fifteen working days per calendar year must submit an International Remote Request to People Operations at least four weeks in advance. Approval depends on tax-residency rules, data-protection regulations, and time-zone overlap with the employee's team. Unauthorised overseas logins will automatically suspend network credentials until reviewed by Security.",
      },
    ],
    questions: [
      {
        id: "ielts-gt-r-q7",
        number: 7,
        questionType: "matching",
        typeBadge: {
          en: "Matching Sections",
          ar: "مطابقة الأقسام",
        },
        prompt:
          "Which section of the handbook explains the consequences of logging into company systems from overseas without permission?",
        options: [
          "Section A (Eligibility & Core Hours)",
          "Section B (Home-Office Equipment Stipend)",
          "Section C (Information Security Protocols)",
          "Section D (Working from Abroad)",
        ],
        correctIndex: 3,
        explanation: {
          en: "Section D states that unauthorised overseas logins automatically suspend network credentials until reviewed by Security.",
          ar: "تنص الفقرة D على أن تسجيل الدخول غير المصرّح به من الخارج يؤدي إلى تعليق صلاحيات الشبكة تلقائياً حتى مراجعة قسم الأمن.",
        },
      },
      {
        id: "ielts-gt-r-q8",
        number: 8,
        questionType: "matching",
        typeBadge: {
          en: "Matching Sections",
          ar: "مطابقة الأقسام",
        },
        prompt:
          "Which section specifies the exact daily window during which all hybrid staff must be available on messaging tools?",
        options: [
          "Section A (Eligibility & Core Hours)",
          "Section B (Home-Office Equipment Stipend)",
          "Section C (Information Security Protocols)",
          "Section D (Working from Abroad)",
        ],
        correctIndex: 0,
        explanation: {
          en: "Section A defines Core Collaboration Hours as 10:00 a.m. to 3:00 p.m. local head-office time.",
          ar: "تحدد الفقرة A ساعات التعاون الأساسية من ١٠:٠٠ صباحاً حتى ٣:٠٠ مساءً بتوقيت المقر الرئيسي.",
        },
      },
      {
        id: "ielts-gt-r-q9",
        number: 9,
        questionType: "fill",
        typeBadge: {
          en: "Policy Completion",
          ar: "إكمال السياسة",
        },
        prompt:
          "Write ONE WORD AND/OR A NUMBER from Section A.\nNew hires become eligible to request a hybrid schedule after completing a ________ probationary period.",
        acceptedAnswers: ["three-month", "3-month", "three month", "3 month"],
        explanation: {
          en: "Section A states that full-time staff who have completed their 'three-month' probationary review may request a Hybrid Schedule.",
          ar: "توضح الفقرة A أن الموظفين بدوام كامل يمكنهم طلب العمل الهجين بعد إتمام فترة التجربة البالغة ثلاثة أشهر (three-month).",
        },
      },
      {
        id: "ielts-gt-r-q10",
        number: 10,
        questionType: "fill",
        typeBadge: {
          en: "Policy Completion",
          ar: "إكمال السياسة",
        },
        prompt:
          "Write NO MORE THAN TWO WORDS from Section C.\nWhen working in a public café, staff must connect via corporate VPN and attach a ________ filter to their laptop.",
        acceptedAnswers: ["privacy screen", "Privacy screen"],
        explanation: {
          en: "Section C requires using the corporate VPN client and an approved 'privacy screen' filter in public cafés or airport lounges.",
          ar: "تشترط الفقرة C الاتصال عبر VPN الشركة واستخدام مرشح «شاشة الخصوصية» (privacy screen) في المقاهي العامة.",
        },
      },
      {
        id: "ielts-gt-r-q11",
        number: 11,
        questionType: "tfng",
        typeBadge: {
          en: "True / False / Not Given",
          ar: "صحيح / خطأ / غير مذكور",
        },
        prompt:
          "An employee who leaves the company eighteen months after using the £450 equipment stipend may keep the monitor at no charge.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctIndex: 1,
        explanation: {
          en: "Section B states that equipment remains company property for the first 24 months, so staff resigning within that window must return it or repay its depreciated value.",
          ar: "تنص الفقرة B على أن المعدات تبقى ملكاً للشركة خلال أول ٢٤ شهراً، ومن يستقيل قبل ذلك يجب أن يعيدها أو يسدد قيمتها المتبقية.",
        },
      },
      {
        id: "ielts-gt-r-q12",
        number: 12,
        questionType: "tfng",
        typeBadge: {
          en: "True / False / Not Given",
          ar: "صحيح / خطأ / غير مذكور",
        },
        prompt:
          "Employees must request permission at least four weeks ahead if they want to work remotely from abroad.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctIndex: 0,
        explanation: {
          en: "Section D explicitly requires submitting an International Remote Request to People Operations at least four weeks in advance.",
          ar: "تنص الفقرة D صراحةً على وجوب تقديم طلب العمل عن بُعد من الخارج قبل أربعة أسابيع على الأقل.",
        },
      },
    ],
  },
  {
    id: "ielts-gt-r-p3",
    title: "The Quiet Revival of Community Seed Libraries",
    category: {
      en: "Section 3 · General-Interest Feature Article",
      ar: "القسم ٣ · مقال ثقافي عام",
    },
    paragraphs: [
      {
        label: "A",
        text: "Tucked beside the travel guides and mystery novels of more than six hundred neighbourhood libraries across North America, Europe, and Australia sit refurbished wooden card catalogues that no longer hold index cards. Pull open a drawer labelled 'T' and you will find paper envelopes of heirloom Cherokee Purple tomatoes, drought-tolerant tepary beans, and fragrant basil—all available to 'check out' for free on an ordinary library card.",
      },
      {
        label: "B",
        text: "Unlike commercial seed packets bred primarily for uniform ripening and long-distance supermarket shipping, community seed libraries preserve open-pollinated regional varieties adapted over generations to specific soils and rainfall patterns. Borrowers plant the seeds at home, enjoy the harvest, and are encouraged—though rarely penalised if a crop fails—to dry and return fresh seeds from their healthiest plants at season's end. Over several cycles, the collection naturally evolves to match shifting local microclimates.",
      },
      {
        label: "C",
        text: "The revival addresses a quiet agricultural crisis. According to the Food and Agriculture Organization, roughly seventy-five percent of global crop genetic diversity vanished during the twentieth century as industrial farms consolidated around a handful of high-yield hybrid cultivars. While colossal international vaults such as Svalbard in the Arctic safeguard frozen backup copies for governments, grassroots seed librarians argue that living biodiversity cannot survive solely in deep freeze; it must stay planted in backyard gardens where pollinators, soil microbes, and human growers actively steward it.",
      },
      {
        label: "D",
        text: "Running a public seed exchange is not without practical hurdles. Novice gardeners occasionally return cross-pollinated squash seeds that produce bitter, inedible gourds the following spring, or store damp pods in plastic bags that invite mould. To maintain germination quality without intimidating beginners, many libraries host weekend seed-saving workshops and colour-code envelopes by difficulty—green for self-pollinating beginners like peas and lettuce, amber for experienced savers tackling corn or melons.",
      },
    ],
    questions: [
      {
        id: "ielts-gt-r-q13",
        number: 13,
        questionType: "matching",
        typeBadge: {
          en: "Matching Headings",
          ar: "مطابقة العناوين",
        },
        prompt: "Choose the most suitable heading for Paragraph C.",
        options: [
          "Why backyard stewardship complements frozen Arctic seed vaults",
          "How supermarkets grade heirloom tomatoes for shelf life",
          "Government funding cuts to international agricultural banks",
          "Legal disputes over hybrid seed patent ownership",
        ],
        correctIndex: 0,
        explanation: {
          en: "Paragraph C contrasts the 75% loss of crop diversity and frozen vaults like Svalbard with the grassroots need to keep varieties actively planted in local gardens.",
          ar: "تقارن الفقرة C بين فقدان ٧٥٪ من التنوع المحصولي والخزائن المجمدة مثل سفالبارد، وبين الحاجة لإبقاء البذور مزروعة حياً في الحدائق المحلية.",
        },
      },
      {
        id: "ielts-gt-r-q14",
        number: 14,
        questionType: "tfng",
        typeBadge: {
          en: "True / False / Not Given",
          ar: "صحيح / خطأ / غير مذكور",
        },
        prompt:
          "Borrowers who lose their home vegetable crop to bad weather are usually charged a fine by community seed libraries.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctIndex: 1,
        explanation: {
          en: "Paragraph B notes that borrowers are encouraged to return fresh seeds, 'though rarely penalised if a crop fails'.",
          ar: "تشير الفقرة B إلى أن المستعيرين يُشجَّعون على إعادة البذور لكنهم نادراً ما يُعاقَبون إذا فشل المحصول.",
        },
      },
      {
        id: "ielts-gt-r-q15",
        number: 15,
        questionType: "tfng",
        typeBadge: {
          en: "True / False / Not Given",
          ar: "صحيح / خطأ / غير مذكور",
        },
        prompt:
          "The Svalbard Global Seed Vault refuses to share samples with independent community libraries.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctIndex: 2,
        explanation: {
          en: "Paragraph C mentions that Svalbard safeguards frozen backup copies for governments, but says nothing about whether it refuses requests from community libraries.",
          ar: "تذكر الفقرة C أن خزينة سفالبارد تحفظ نسخاً احتياطية مجمدة للحكومات، لكنها لا تذكر ما إذا كانت ترفض مشاركتها مع المكتبات المجتمعية.",
        },
      },
      {
        id: "ielts-gt-r-q16",
        number: 16,
        questionType: "mcq",
        typeBadge: {
          en: "Multiple Choice",
          ar: "اختيار من متعدد",
        },
        prompt:
          "Why are commercial supermarket crop varieties described differently from seed-library varieties in Paragraph B?",
        options: [
          "Commercial packets are bred mainly for uniform ripening and long-distance transport.",
          "Commercial seeds require twice as much sunlight to germinate.",
          "Seed-library varieties cannot be grown without chemical fertilisers.",
          "Commercial seeds are strictly limited to tropical climates.",
        ],
        correctIndex: 0,
        explanation: {
          en: "Paragraph B contrasts community open-pollinated seeds with commercial packets 'bred primarily for uniform ripening and long-distance supermarket shipping'.",
          ar: "تقابل الفقرة B البذور المجتمعية بالبذور التجارية التي تُطوَّر أساساً للنضج المتجانس والشحن لمسافات طويلة.",
        },
      },
      {
        id: "ielts-gt-r-q17",
        number: 17,
        questionType: "mcq",
        typeBadge: {
          en: "Multiple Choice",
          ar: "اختيار من متعدد",
        },
        prompt:
          "How do libraries help beginners avoid common seed-saving mistakes such as cross-pollination?",
        options: [
          "By requiring a botany certificate before checking out any seeds.",
          "By colour-coding packets by difficulty and running weekend workshops.",
          "By sealing all returned envelopes in airtight plastic pouches.",
          "By banning novice gardeners from borrowing vegetable seeds.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Paragraph D explains that libraries host weekend seed-saving workshops and colour-code envelopes (green for easy self-pollinators, amber for harder crops).",
          ar: "توضح الفقرة D أن المكتبات تنظم ورش عمل في عطلة نهاية الأسبوع وتصنّف المغلفات بالألوان حسب مستوى الصعوبة.",
        },
      },
      {
        id: "ielts-gt-r-q18",
        number: 18,
        questionType: "fill",
        typeBadge: {
          en: "Summary Completion",
          ar: "إكمال الملخص",
        },
        prompt:
          "Complete the note using ONE WORD ONLY from Paragraph D.\nStoring moist seed pods inside plastic bags can cause ________ to grow.",
        acceptedAnswers: ["mould", "Mould", "mold", "Mold"],
        explanation: {
          en: "Paragraph D mentions that novice gardeners sometimes 'store damp pods in plastic bags that invite mould'.",
          ar: "تذكر الفقرة D أن تخزين القرون الرطبة في أكياس بلاستيكية يؤدي إلى نمو «العفن» (mould).",
        },
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* IELTS Writing Tasks (60 min · 2 Tasks)                                     */
/* -------------------------------------------------------------------------- */

const IELTS_ACADEMIC_TASK_1: WritingTask = {
  id: "ielts-ac-w-task-1",
  label: {
    en: "Academic Writing Task 1",
    ar: "الكتابة الأكاديمية — المهمة ١",
  },
  title: {
    en: "Visual Data Report: Renewable Electricity Share by Region (2010–2025)",
    ar: "تقرير بيانات بصرية: حصة الكهرباء المتجددة حسب المنطقة (٢٠١٠–٢٠٢٥)",
  },
  recommendedMinutes: 20,
  minWords: 150,
  prompt:
    "The chart below compares the percentage of total electricity generated from renewable sources across four global regions between 2010 and 2025.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
  chartData: {
    title: "Renewable Electricity Share (% of Total Power Generation)",
    unit: "%",
    categories: ["2010", "2015", "2020", "2025"],
    series: [
      {
        name: "Northern Europe",
        color: "#0ea5e9",
        values: [38, 47, 58, 69],
      },
      {
        name: "East Asia",
        color: "#10b981",
        values: [16, 23, 31, 44],
      },
      {
        name: "North America",
        color: "#f59e0b",
        values: [14, 19, 25, 34],
      },
      {
        name: "Middle East & N. Africa",
        color: "#8b5cf6",
        values: [4, 7, 13, 24],
      },
    ],
  },
  modelAnswer:
    "The bar chart compares the proportion of total electricity produced from renewable sources in four world regions across four milestone years from 2010 to 2025.\n\nOverall, every region recorded a steady and uninterrupted expansion in clean-power generation over the fifteen-year period. Northern Europe remained the clear leader throughout, whereas the Middle East and North Africa started from the lowest baseline yet achieved the sharpest relative growth.\n\nIn 2010, Northern Europe already generated 38% of its electricity from renewables—more than double East Asia's 16% and North America's 14%. Over the subsequent decade and a half, Northern Europe climbed consistently to 47% in 2015, 58% in 2020, and nearly seven-tenths (69%) by 2025.\n\nMeanwhile, East Asia accelerated markedly after 2020, surging from 31% to 44% in 2025 and widening its lead over North America, which rose more gradually from 14% to 34% across the full span. Although the Middle East and North Africa accounted for just 4% in 2010 and 7% in 2015, its share nearly doubled to 13% by 2020 and jumped to 24% in 2025—a sixfold increase overall.",
  bandChecklist: [
    {
      en: "Include a clear overview paragraph summarising the highest, lowest, and fastest-growing trends without listing every number.",
      ar: "تضمين فقرة نظرة عامة واضحة تلخّص أعلى وأدنى وأسرع الاتجاهات دون سرد جميع الأرقام.",
    },
    {
      en: "Group figures logically for comparison (e.g., Northern Europe's lead vs. East Asia's post-2020 surge and MENA's sixfold rise).",
      ar: "تجميع الأرقام بشكل منطقي للمقارنة (مثل تصدّر شمال أوروبا مقابل تسارع شرق آسيا ونمو الشرق الأوسط ستة أضعاف).",
    },
    {
      en: "Use varied academic verbs and adverbs of change (climbed consistently, surged, rose gradually, widened its lead).",
      ar: "استخدام أفعال وظروف أكاديمية متنوعة لوصف التغيّر (ارتفع بثبات، قفز، نما تدريجياً، وسّع الفارق).",
    },
    {
      en: "Avoid personal opinions or outside causes not shown in the chart; stay strictly factual and above 150 words.",
      ar: "تجنب الآراء الشخصية أو الأسباب غير المذكورة في الرسم البياني؛ والالتزام بالحقائق وتجاوز ١٥٠ كلمة.",
    },
  ],
};

const IELTS_GENERAL_TASK_1: WritingTask = {
  id: "ielts-gt-w-task-1",
  label: {
    en: "General Training Writing Task 1",
    ar: "الكتابة للتدريب العام — المهمة ١",
  },
  title: {
    en: "Formal Letter: Missed Flight Connection & Delayed Luggage",
    ar: "رسالة رسمية: فوات رحلة ربط وتأخر الأمتعة",
  },
  recommendedMinutes: 20,
  minWords: 150,
  prompt:
    "You recently travelled internationally with an airline, missed your connecting flight due to an earlier delay, and your checked luggage arrived two days late. Write a formal letter to the airline's Customer Relations Manager.\n\nIn your letter, cover all three points below. Write at least 150 words.",
  bulletPoints: [
    "Give the flight details and explain how the delay disrupted your travel plans.",
    "Describe the inconvenience caused by the two-day delay to your checked luggage.",
    "State clearly what compensation or action you expect from the airline.",
  ],
  modelAnswer:
    "Dear Sir or Madam,\n\nI am writing to formally request compensation following severe disruption during my recent journey with Meridian Airways on 14 October (booking reference MA-88419).\n\nMy outbound service, flight MA 204 from Amman to Frankfurt, departed three hours behind schedule due to a technical inspection. Consequently, I missed my onward connection, MA 612 to Toronto, and was rebooked onto a flight departing fourteen hours later. This forced me to miss the opening keynote and two scheduled client briefings at an international conference.\n\nCompounding this disruption, my checked suitcase (baggage tag BK492) failed to arrive in Toronto and was not delivered to my hotel until forty-eight hours later. Because all of my formal business attire and prescription toiletries were packed inside, I had to purchase emergency clothing and essentials at considerable personal expense.\n\nUnder international passenger-rights provisions, I kindly request reimbursement of £240 for these emergency purchases—itemised receipts are attached—alongside standard flight-delay compensation. I would also appreciate written confirmation within fourteen days regarding how my claim will be processed.\n\nYours faithfully,\nSami Al-Harbi",
  bandChecklist: [
    {
      en: "Use consistent formal register ('Dear Sir or Madam', 'Yours faithfully', no casual contractions).",
      ar: "الالتزام بالأسلوب الرسمي المتسق («Dear Sir or Madam» و«Yours faithfully» دون اختصارات عامية).",
    },
    {
      en: "Address all three bullet points thoroughly in separate, well-organised paragraphs.",
      ar: "تغطية النقاط الثلاث المطلوبة بوضوح في فقرات مستقلة ومنظمة.",
    },
    {
      en: "Include realistic supporting specifics (flight numbers, booking reference, exact expenses) to sound authentic.",
      ar: "تضمين تفاصيل واقعية داعمة (أرقام الرحلات، رقم الحجز، التكاليف الدقيقة) لإضفاء مصداقية.",
    },
    {
      en: "Keep the tone firm, polite, and objective rather than overly emotional.",
      ar: "الحفاظ على نبرة حازمة ومهذبة وموضوعية بدلاً من الانفعال.",
    },
  ],
};

const IELTS_SHARED_TASK_2: WritingTask = {
  id: "ielts-w-task-2",
  label: {
    en: "Writing Task 2 · Essay",
    ar: "المهمة ٢ · مقال أكاديمي / رأي",
  },
  title: {
    en: "AI Automation vs. Human Capabilities in Education & Employment",
    ar: "أتمتة الذكاء الاصطناعي مقابل المهارات البشرية في التعليم والعمل",
  },
  recommendedMinutes: 40,
  minWords: 250,
  prompt:
    "As artificial intelligence automates an increasing share of technical and analytical tasks, some people argue that universities should shift their primary focus away from specialised technical training toward uniquely human skills such as ethical judgement, communication, and creative collaboration.\n\nTo what extent do you agree or disagree with this view? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.",
  modelAnswer:
    "Rapid advances in artificial intelligence have sparked intense debate over how higher education should prepare graduates for an automated labour market. While I agree that universities must elevate human-centred competencies such as ethical reasoning and collaborative communication, I believe abandoning rigorous technical training altogether would be a serious mistake; instead, both pillars must be integrated.\n\nOn the one hand, the case for strengthening uniquely human capacities is compelling. Routine coding, financial auditing, and preliminary legal drafting can already be executed faster by generative algorithms than by entry-level staff. What machines cannot credibly substitute is moral accountability, empathetic negotiation, or the framing of ambiguous real-world problems. A physician using diagnostic software, for instance, still relies on emotional intelligence to counsel an anxious family and weigh conflicting cultural values. Universities that treat such abilities as optional extras risk producing graduates who are easily outpaced by newer software releases.\n\nNevertheless, sidelining technical mastery would leave future professionals ill-equipped to supervise the very systems transforming their fields. Effective oversight of artificial intelligence demands solid domain literacy: an engineer who lacks foundational mathematics cannot detect subtle modelling flaws, and a journalist unfamiliar with data verification cannot spot fabricated algorithmic claims. Technical competence is therefore not obsolete; rather, its purpose is shifting from repetitive execution toward critical auditing and creative direction.\n\nIn conclusion, artificial intelligence does not render technical expertise irrelevant, nor can technical instruction alone guarantee career resilience. Universities will serve students best by weaving ethical judgement and interpersonal fluency directly into rigorous scientific and vocational curricula.",
  bandChecklist: [
    {
      en: "State a clear, nuanced position in the introduction and maintain it consistently through to the conclusion.",
      ar: "تحديد موقف واضح ومتوازن في المقدمة والحفاظ عليه باتساق حتى الخاتمة.",
    },
    {
      en: "Develop two distinct body paragraphs with focused topic sentences, concrete examples, and logical progression.",
      ar: "بناء فقرتي عرض واضحتين بجمل محورية محددة وأمثلة واقعية وتسلسل منطقي.",
    },
    {
      en: "Demonstrate Band 8+ lexical resource and complex grammar (concessive clauses, precise collocations, hedging).",
      ar: "توظيف مفردات وتراكيب نحوية متقدمة بمستوى Band 8+ (جمل الاستدراك، متلازمات لفظية دقيقة، صياغة متزنة).",
    },
    {
      en: "Write at least 250 words (aim for 270–310 words) with accurate punctuation and cohesion.",
      ar: "كتابة ما لا يقل عن ٢٥٠ كلمة (يُفضّل ٢٧٠–٣١٠ كلمة) مع دقة الترقيم والترابط النصي.",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Shared IELTS Speaking Section (14 min · 3 Official Parts)                  */
/* -------------------------------------------------------------------------- */

const IELTS_SPEAKING_TASKS: SpeakingTask[] = [
  {
    id: "ielts-sp-part-1",
    partLabel: {
      en: "Speaking Part 1 · Introduction & Interview",
      ar: "المحادثة — الجزء ١ · التعارف والمقابلة",
    },
    title: {
      en: "Hometown, Everyday Routines & Short Trips",
      ar: "المدينة الأم والروتين اليومي والرحلات القصيرة",
    },
    prepSeconds: 0,
    speakSeconds: 240,
    prompts: [
      "Let us talk about where you live. What do you enjoy most about your hometown or current city?",
      "How has your neighbourhood changed over the past few years?",
      "Do you prefer following a structured daily routine, or do you like keeping your schedule flexible?",
      "When you take a short weekend trip, do you prefer travelling to the coast, the mountains, or another city? Why?",
    ],
    fluencyHints: [
      {
        en: "Give 2–4 natural sentences per answer—extend with a brief reason or personal example rather than one-word replies.",
        ar: "قدّم ٢ إلى ٤ جمل طبيعية لكل إجابة؛ وسّع إجابتك بسبب أو مثال شخصي بدلاً من الردود المختصرة.",
      },
      {
        en: "Use present perfect naturally when describing neighbourhood changes ('has become far more walkable').",
        ar: "استخدم المضارع التام بطبيعية عند وصف تغيّرات الحي («أصبح أكثر ملاءمة للمشي»).",
      },
      {
        en: "Keep your tone conversational and relaxed—avoid sounding memorised.",
        ar: "حافظ على نبرة حوارية طبيعية وتجنّب الإلقاء المحفوظ.",
      },
    ],
    modelResponse:
      "What I appreciate most about my city is the balance between modern infrastructure and lively neighbourhood cafés where people still gather in the evenings. Over the past five years, our district has become much greener—the municipality added shaded pedestrian boulevards and dedicated cycling paths, which completely transformed weekend life. As for daily routines, I generally prefer a structured morning so I can tackle demanding work before noon, though I like leaving my evenings fairly flexible. For weekend getaways, I am drawn to the mountains because the cooler air and quiet trails help me switch off from screens far better than a bustling city break.",
  },
  {
    id: "ielts-sp-part-2",
    partLabel: {
      en: "Speaking Part 2 · Individual Long Turn",
      ar: "المحادثة — الجزء ٢ · البطاقة والتحدث الفردي",
    },
    title: {
      en: "Cue Card: A Memorable Journey That Taught You Something Valuable",
      ar: "بطاقة الموضوع: رحلة لا تُنسى علّمتك درساً قيّماً",
    },
    prepSeconds: 60,
    speakSeconds: 120,
    prompts: [
      "You have 1 minute to prepare notes and up to 2 minutes to speak continuously on the cue card topic below.",
    ],
    cueCard: {
      topic: "Describe a memorable journey or trip that taught you something valuable.",
      bullets: [
        "where you went and who you travelled with",
        "how you planned or navigated the journey",
        "what unexpected moment or challenge happened along the way",
        "and explain what valuable lesson you took away from the experience.",
      ],
    },
    fluencyHints: [
      {
        en: "Spend your 60-second prep writing keywords for each bullet plus one strong past-tense story anchor.",
        ar: "استثمر دقيقة التحضير في كتابة كلمات مفتاحية لكل نقطة مع فكرة قصصية واضحة في الزمن الماضي.",
      },
      {
        en: "Use narrative signposts ('At first...', 'What caught us completely off guard was...', 'Looking back...').",
        ar: "استخدم أدوات السرد («في البداية...»، «ما فاجأنا تماماً هو...»، «عندما أسترجع التجربة...»).",
      },
      {
        en: "Aim to speak steadily for the full 1 minute 45 seconds to 2 minutes without rushing the final reflection.",
        ar: "احرص على التحدث بثبات لمدة دقيقة و٤٥ ثانية إلى دقيقتين دون استعجال فقرة الدرس المستفاد.",
      },
    ],
    modelResponse:
      "One journey that genuinely shifted my perspective was a five-day rail trip across northern Morocco that I took two winters ago with my older brother. We had mapped out every train departure from Tangier through Chefchaouen to Fes, convinced that tight scheduling would let us see everything effortlessly. However, on our third morning, heavy mountain rain triggered a minor landslide that shut the regional bus line for nearly six hours. At first, I felt frustrated because our museum tickets were going to waste. While waiting in a small hillside tea house, a retired ceramicist invited us to his workshop down the lane and spent the afternoon showing us how traditional glaze pigments are mixed by hand. That unplanned afternoon ended up being far richer than any monument on our itinerary. Looking back, the trip taught me that over-scheduling can blind you to the human warmth of a place—leaving room for detours often turns an ordinary trip into a lasting memory.",
  },
  {
    id: "ielts-sp-part-3",
    partLabel: {
      en: "Speaking Part 3 · Two-Way Analytical Discussion",
      ar: "المحادثة — الجزء ٣ · النقاش التحليلي المتعمق",
    },
    title: {
      en: "Global Tourism, Cultural Exchange & Sustainable Travel",
      ar: "السياحة العالمية والتبادل الثقافي والسفر المستدام",
    },
    prepSeconds: 0,
    speakSeconds: 240,
    prompts: [
      "How has international tourism changed the way younger generations perceive other cultures compared to fifty years ago?",
      "Some historic cities struggle with overtourism. Should governments limit visitor numbers or raise tourist taxes to protect local communities?",
      "Do you think virtual-reality travel experiences could ever replace physical journeys in the future? Why or why not?",
    ],
    fluencyHints: [
      {
        en: "Shift from personal anecdotes to broader societal analysis ('Broadly speaking...', 'From an economic standpoint...').",
        ar: "انتقل من القصص الشخصية إلى التحليل المجتمعي الأوسع («بشكل عام...»، «من منظور اقتصادي...»).",
      },
      {
        en: "Weigh both sides before concluding—examiners reward balanced evaluation and hedging ('While..., it is equally true that...').",
        ar: "وازن بين وجهتي النظر قبل الخلاصة؛ فالممتحنون يقدّرون التقييم المتوازن وصياغة الحجج المنطقية.",
      },
      {
        en: "Use topic-specific vocabulary naturally (overtourism, cultural authenticity, carbon footprint, seasonal dispersal).",
        ar: "وظّف مفردات تخصصية بطبيعية مثل السياحة المفرطة، الأصالة الثقافية، البصمة الكربونية، وتوزيع المواسم.",
      },
    ],
    modelResponse:
      "Compared to half a century ago, budget aviation and social media have made cross-border exposure far more accessible, which generally fosters greater curiosity and empathy among young travellers. That said, rapid 'checklist tourism' can occasionally reduce complex local traditions to photogenic backdrops unless travellers slow down and engage respectfully. Regarding overtourism in fragile heritage cities, I believe targeted visitor caps paired with off-season pricing incentives are far fairer than steep flat taxes alone, which risk turning cultural heritage into a privilege exclusively for the wealthy. Finally, while virtual reality offers remarkable educational value for people with mobility or financial barriers, it can never replicate the sensory spontaneity—the aroma of street spices, unplanned conversations, or genuine physical immersion—that makes real-world travel transformative.",
  },
];

/* -------------------------------------------------------------------------- */
/* Exported Full IELTS Mock Exams (Academic & General Training)               */
/* -------------------------------------------------------------------------- */

export const IELTS_ACADEMIC_MOCK: FullMockExam = {
  id: "ielts-academic",
  title: {
    en: "IELTS Academic Full Mock Exam",
    ar: "الاختبار التجريبي الكامل — آيلتس الأكاديمي (IELTS Academic)",
  },
  subtitle: {
    en: "Complete 4-skill experimental simulation covering university-level Reading, Academic Chart Report, Essay, Listening & 3-Part Speaking.",
    ar: "محاكاة تجريبية شاملة للمهارات الأربع تغطي القراءة الأكاديمية، تقرير الرسم البياني، المقال، الاستماع، والمحادثة بأجزائها الثلاثة.",
  },
  durationLabel: {
    en: "2 hrs 44 mins · Band 0.0–9.0",
    ar: "ساعتان و٤٤ دقيقة · مقياس ٠.٠–٩.٠",
  },
  scoreScaleLabel: {
    en: "Estimated IELTS Band (0.0 – 9.0)",
    ar: "درجة آيلتس التقديرية (٠.٠ – ٩.٠)",
  },
  authenticNotice: {
    en: "Experimental practice simulation modelled on official IELTS Academic task formats, timings, and rubrics. Estimated band indicators are for self-study feedback only and are not official British Council / IDP / Cambridge scores.",
    ar: "محاكاة تدريبية تجريبية مصممة وفق هيكل وتوقيت ومعايير اختبار IELTS الأكاديمي الرسمي. التقديرات لأغراض التدريب الذاتي فقط وليست شهادة رسمية.",
  },
  listening: {
    durationMinutes: 30,
    instructions: {
      en: "Listen carefully to all four recordings (dialogue, orientation monologue, academic tutorial, and university lecture). Answer all 16 questions—watch for speaker self-corrections and word limits on fill-in items.",
      ar: "استمع بعناية للتسجيلات الأربعة (حوار يومي، جولة تعريفية، نقاش جامعي، ومحاضرة أكاديمية). أجب عن ١٦ سؤالاً وانتبه لتصحيحات المتحدث وحدود الكلمات.",
    },
    parts: IELTS_LISTENING_PARTS,
  },
  reading: {
    durationMinutes: 60,
    instructions: {
      en: "Read three academic passages and answer 18 questions covering True/False/Not Given, Matching Headings, Multiple Choice, and Summary Completion. Base every answer strictly on information in the text.",
      ar: "اقرأ ثلاث قطع أكاديمية وأجب عن ١٨ سؤالاً تشمل الصواب والخطأ وغير المذكور، ومطابقة العناوين، والاختيار من متعدد، وإكمال الملخص بالاعتماد الحصري على النص.",
    },
    passages: IELTS_ACADEMIC_PASSAGES,
  },
  writing: {
    durationMinutes: 60,
    instructions: {
      en: "Complete both writing tasks within 60 minutes: spend roughly 20 minutes on Task 1 (150+ words) analysing the chart objectively, and 40 minutes on Task 2 (250+ words), which carries twice the weighting.",
      ar: "أكمل مهمتي الكتابة خلال ٦٠ دقيقة: خصّص نحو ٢٠ دقيقة للمهمة ١ (١٥٠ كلمة فأكثر) لتحليل الرسم البياني بموضوعية، و٤٠ دقيقة للمهمة ٢ (٢٥٠ كلمة فأكثر) ذات الوزن المضاعف.",
    },
    tasks: [IELTS_ACADEMIC_TASK_1, IELTS_SHARED_TASK_2],
  },
  speaking: {
    durationMinutes: 14,
    instructions: {
      en: "Work through all three official IELTS Speaking parts: Part 1 interview questions, Part 2 cue card (1-minute preparation + 2-minute monologue), and Part 3 analytical discussion.",
      ar: "تدرّب على الأجزاء الثلاثة الرسمية لمحادثة آيلتس: الجزء ١ (المقابلة)، الجزء ٢ (البطاقة: دقيقة تحضير + دقيقتان للتحدث)، والجزء ٣ (النقاش التحليلي).",
    },
    tasks: IELTS_SPEAKING_TASKS,
  },
};

export const IELTS_GENERAL_MOCK: FullMockExam = {
  id: "ielts-general",
  title: {
    en: "IELTS General Training Full Mock Exam",
    ar: "الاختبار التجريبي الكامل — آيلتس العام (IELTS General Training)",
  },
  subtitle: {
    en: "Complete 4-skill experimental simulation featuring everyday guides, workplace policies, formal letter writing, essay, Listening & Speaking.",
    ar: "محاكاة تجريبية شاملة للمهارات الأربع تتضمن أدلة الحياة اليومية، سياسات العمل، الرسالة الرسمية، المقال، الاستماع، والمحادثة.",
  },
  durationLabel: {
    en: "2 hrs 44 mins · Band 0.0–9.0",
    ar: "ساعتان و٤٤ دقيقة · مقياس ٠.٠–٩.٠",
  },
  scoreScaleLabel: {
    en: "Estimated IELTS Band (0.0 – 9.0)",
    ar: "درجة آيلتس التقديرية (٠.٠ – ٩.٠)",
  },
  authenticNotice: {
    en: "Experimental practice simulation modelled on official IELTS General Training task formats, timings, and rubrics. Estimated band indicators are for self-study feedback only and are not official test scores.",
    ar: "محاكاة تدريبية تجريبية مصممة وفق هيكل وتوقيت ومعايير اختبار IELTS العام الرسمي. التقديرات لأغراض التدريب الذاتي فقط وليست شهادة رسمية.",
  },
  listening: {
    durationMinutes: 30,
    instructions: {
      en: "The Listening section is identical across Academic and General Training. Listen to all four recordings and answer 16 questions while observing exact word limits.",
      ar: "قسم الاستماع موحّد بين الآيلتس الأكاديمي والعام. استمع للتسجيلات الأربعة وأجب عن ١٦ سؤالاً مع الالتزام بحدود الكلمات.",
    },
    parts: IELTS_LISTENING_PARTS,
  },
  reading: {
    durationMinutes: 60,
    instructions: {
      en: "Complete three progressive General Training reading sections—everyday notices, a workplace handbook, and a longer feature article—answering 18 questions in total.",
      ar: "أكمل ثلاثة أقسام متدرجة في قراءة الآيلتس العام: إعلانات يومية، دليل سياسات عمل، ومقال ثقافي أطول، مع الإجابة عن ١٨ سؤالاً إجمالاً.",
    },
    passages: IELTS_GENERAL_PASSAGES,
  },
  writing: {
    durationMinutes: 60,
    instructions: {
      en: "Complete both writing tasks within 60 minutes: spend about 20 minutes on your formal letter (Task 1, 150+ words) covering all three bullet points, and 40 minutes on your Task 2 essay (250+ words).",
      ar: "أكمل مهمتي الكتابة خلال ٦٠ دقيقة: خصّص ٢٠ دقيقة للرسالة الرسمية (المهمة ١، ١٥٠ كلمة فأكثر) مع تغطية النقاط الثلاث، و٤٠ دقيقة لمقال المهمة ٢ (٢٥٠ كلمة فأكثر).",
    },
    tasks: [IELTS_GENERAL_TASK_1, IELTS_SHARED_TASK_2],
  },
  speaking: {
    durationMinutes: 14,
    instructions: {
      en: "The Speaking test is identical across Academic and General Training. Complete Part 1 interview, Part 2 cue card (60s prep + 120s talk), and Part 3 analytical discussion.",
      ar: "اختبار المحادثة موحّد بين الآيلتس الأكاديمي والعام. أكمل الجزء ١ (المقابلة)، والجزء ٢ (البطاقة: ٦٠ ثانية تحضير + ١٢٠ ثانية تحدث)، والجزء ٣ (النقاش).",
    },
    tasks: IELTS_SPEAKING_TASKS,
  },
};
