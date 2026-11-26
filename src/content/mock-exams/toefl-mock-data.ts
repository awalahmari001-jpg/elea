import type {
  FullMockExam,
  ListeningPart,
  ReadingPassage,
  SpeakingTask,
  WritingTask,
} from "./exam-types";

/* -------------------------------------------------------------------------- */
/* TOEFL iBT Reading Section (35 min · 2 Academic Passages · 16 Questions)    */
/* -------------------------------------------------------------------------- */

const TOEFL_READING_PASSAGES: ReadingPassage[] = [
  {
    id: "toefl-r-p1",
    title: "Bioluminescence and Ecological Signalling in Deep-Sea Habitats",
    category: {
      en: "Passage 1 · Marine Biology",
      ar: "القطعة ١ · الأحياء البحرية",
    },
    paragraphs: [
      {
        label: "Paragraph 1",
        text: "Below roughly 200 metres—the lower boundary of the sunlit epipelagic zone—oceanic waters descend into the mesopelagic 'twilight zone' and eventually the pitch-black bathypelagic abyss. In these dim or completely dark realms, solar illumination is either too faint for photosynthesis or wholly absent. Yet far from being visually inert, more than three-quarters of macroscopic deep-sea organisms manufacture their own light through bioluminescence, a biochemical oxidation in which an enzyme called luciferase catalyses a light-emitting compound known as luciferin. Because almost all the released energy converts directly into photons rather than heat, marine biologists describe bioluminescence as 'cold light', achieving efficiencies close to ninety-five percent.",
      },
      {
        label: "Paragraph 2",
        text: "Crucially, not every wavelength travels equally well through seawater. Red and orange wavelengths are absorbed rapidly within the top twenty metres, whereas blue-green light near 470 nanometres penetrates farthest through clear open water. Consequently, the overwhelming majority of deep-sea fishes, squids, and crustaceans emit—and possess retinas tuned specifically to detect—blue-green flashes. A striking exception is the deep-sea loosejaw dragonfish (Malacosteus), which produces far-red illumination from suborbital photophores. Since virtually no prey species can perceive red wavelengths at depth, the dragonfish effectively wields a private sniper-scope, illuminating shrimp without alerting them to its approach.",
      },
      {
        label: "Paragraph 3",
        text: "Bioluminescent displays serve an astonishing repertoire of ecological functions beyond predation. [A] One of the most widespread defensive strategies in the twilight zone is counter-illumination. [B] Predators hunting from below scan upward for dark silhouettes framed against the faint residual sunlight filtering down from the surface. [C] Hatchetfish and bobtail squid foil this ambush by lining their bellies with downward-facing photophores calibrated to match the exact intensity and wavelength of ambient downwelling light. [D] Even more dramatically, several deep-sea shrimp and vampire squids expel clouds of luminous mucus when startled, momentarily blinding pursuers while the prey darts into darkness—an optical analogue of shallow-water squid ink.",
      },
      {
        label: "Paragraph 4",
        text: "Acquiring the capacity to glow follows two principal evolutionary routes. Many gelatinous animals, such as comb jellies and siphonophores, synthesise luciferin internally or absorb it through their diet from bioluminescent copepods. Others outsource light production entirely by cultivating dense colonies of symbiotic bacteria (commonly Vibrio or Aliivibrio species) inside specialised light organs. Although maintaining these bacterial tenants imposes a steady metabolic tax on the host—requiring continuous delivery of oxygen and nutrients—symbiosis grants fine physiological control: the host can shutter its light organ with opaque tissue flaps or regulate bacterial luminescence by throttling oxygen flow.",
      },
    ],
    questions: [
      {
        id: "toefl-r-q1",
        number: 1,
        questionType: "mcq",
        typeBadge: {
          en: "Factual Information",
          ar: "معلومات واقعية",
        },
        prompt:
          "According to Paragraph 1, why do marine biologists refer to bioluminescence as 'cold light'?",
        options: [
          "It occurs exclusively in freezing polar waters below 200 metres.",
          "Nearly all of the chemical energy released becomes light rather than heat.",
          "It requires sunlight stored in cold surface plankton to activate.",
          "The enzyme luciferase cools surrounding seawater during oxidation.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Paragraph 1 explicitly states that bioluminescence is called 'cold light' because almost all released energy converts directly into photons rather than heat.",
          ar: "تذكر الفقرة ١ صراحةً أن التلألؤ الحيوي يُسمى «ضوءاً بارداً» لأن معظم الطاقة المتحررة تقريباً تتحول مباشرةً إلى فوتونات ضوئية لا إلى حرارة.",
        },
      },
      {
        id: "toefl-r-q2",
        number: 2,
        questionType: "mcq",
        typeBadge: {
          en: "Vocabulary in Context",
          ar: "المفردات في السياق",
        },
        prompt:
          "The word 'inert' in Paragraph 1 ('Yet far from being visually inert') is closest in meaning to:",
        options: ["inactive", "dangerous", "transparent", "crowded"],
        correctIndex: 0,
        explanation: {
          en: "'Inert' means lacking activity or motion; 'far from being visually inert' contrasts the pitch-black setting with the active light production of over 75% of deep-sea organisms.",
          ar: "كلمة «inert» تعني خامل أو غير نشط؛ والسياق يقابل الظلام الدامس بالنشاط البصري الواسع للكائنات المضيئة.",
        },
      },
      {
        id: "toefl-r-q3",
        number: 3,
        questionType: "mcq",
        typeBadge: {
          en: "Rhetorical Purpose",
          ar: "الغرض البلاغي",
        },
        prompt: "Why does the author discuss the loosejaw dragonfish in Paragraph 2?",
        options: [
          "To prove that blue-green wavelengths are absorbed faster than red light.",
          "To illustrate a rare evolutionary exception that gives a predator a stealth advantage.",
          "To show why shrimp migrate toward the ocean surface at night.",
          "To argue that most deep-sea fish have lost the ability to see colour.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Paragraph 2 introduces the dragonfish as 'a striking exception' to blue-green emission whose invisible far-red light lets it illuminate prey undetected.",
          ar: "تقدّم الفقرة ٢ سمكة التنين كاستثناء لافت لاستخدام الضوء الأحمر البعيد الذي يمنحها ميزة تسلل خفية لرؤية الفرائس دون كشفها.",
        },
      },
      {
        id: "toefl-r-q4",
        number: 4,
        questionType: "mcq",
        typeBadge: {
          en: "Negative Factual Information",
          ar: "معلومات واقعية سلبية (EXCEPT)",
        },
        prompt:
          "According to Paragraphs 3 and 4, all of the following are mentioned as ways deep-sea organisms use or control bioluminescence EXCEPT:",
        options: [
          "Matching overhead sunlight intensity to erase their ventral shadow.",
          "Ejecting glowing mucus clouds to disorient attacking predators.",
          "Adjusting oxygen delivery to symbiotic bacteria inside light organs.",
          "Raising water temperature around eggs to accelerate hatching.",
        ],
        correctIndex: 3,
        explanation: {
          en: "Counter-illumination, luminous mucus clouds, and throttling oxygen to bacterial symbionts are all described; warming eggs is never mentioned (and Paragraph 1 notes bioluminescence produces almost no heat).",
          ar: "ذُكرت التغطية الضوئية السفلية وسحب المخاط المضيء وتنظيم الأكسجين للبكتيريا التكافلية، بينما لم يُذكر تدفئة البيض إطلاقاً.",
        },
      },
      {
        id: "toefl-r-q5",
        number: 5,
        questionType: "mcq",
        typeBadge: {
          en: "Inference",
          ar: "الاستنتاج",
        },
        prompt:
          "What can be inferred from Paragraph 3 about why traditional dark ink would be less effective in the bathypelagic zone?",
        options: [
          "Dark ink freezes rapidly under extreme deep-sea water pressure.",
          "In total darkness, a black ink cloud provides no visual contrast to distract a predator.",
          "Deep-sea shrimp lack the anatomical glands required to expel liquids.",
          "Predators in the abyss hunt exclusively by detecting electrical currents.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Paragraph 3 calls luminous mucus 'an optical analogue of shallow-water squid ink' that blinds pursuers before the prey darts into darkness—implying black ink cannot obscure vision where it is already pitch black.",
          ar: "تشير الفقرة ٣ إلى أن المخاط المضيء يؤدي دور الحبر الأسود بصرياً في المياه الضحلة بإبهار المفترس، مما يعني أن الحبر الداكن غير فعّال بصرياً في ظلام دامس.",
        },
      },
      {
        id: "toefl-r-q6",
        number: 6,
        questionType: "mcq",
        typeBadge: {
          en: "Sentence Simplification",
          ar: "تبسيط الجملة",
        },
        prompt:
          "Which of the following best expresses the essential information in the final sentence of Paragraph 4?\n('Although maintaining these bacterial tenants imposes a steady metabolic tax on the host—requiring continuous delivery of oxygen and nutrients—symbiosis grants fine physiological control: the host can shutter its light organ with opaque tissue flaps or regulate bacterial luminescence by throttling oxygen flow.')",
        options: [
          "Hosting light-producing bacteria costs the animal ongoing energy, but it allows precise control over when and how brightly the light shines.",
          "Symbiotic bacteria consume so much oxygen that hosts must frequently expel them to survive in deep water.",
          "Opaque tissue flaps eliminate the nutritional cost of harbouring luminous bacteria inside specialised organs.",
          "Only animals capable of producing luciferin internally can shut off their bioluminescence quickly.",
        ],
        correctIndex: 0,
        explanation: {
          en: "Option A accurately preserves both the concession (steady metabolic cost of feeding/oxygenating bacteria) and the main benefit (precise control via tissue shutters or oxygen regulation).",
          ar: "يحافظ الخيار الأول بدقة على طرفَي الجملة: التكلفة الأيضية المستمرة للبكتيريا مقابل الميزة المتمثلة في التحكم الدقيق بشدة الإضاءة وتوقيتها.",
        },
      },
      {
        id: "toefl-r-q7",
        number: 7,
        questionType: "insert-text",
        typeBadge: {
          en: "Insert Text",
          ar: "إدراج جملة",
        },
        prompt:
          'Look at the four bracketed markers [A], [B], [C], and [D] in Paragraph 3. Where would the following sentence best fit?\n"In effect, this finely tuned glow erases the animal\'s outline, rendering it nearly invisible from beneath."',
        options: ["Position [A]", "Position [B]", "Position [C]", "Position [D]"],
        correctIndex: 3,
        explanation: {
          en: "'This finely tuned glow' directly refers back to the downward-facing photophores calibrated to match ambient downwelling light just introduced before [D], concluding the counter-illumination explanation before the shift to luminous mucus.",
          ar: "تشير عبارة «هذا التوهج المضبوط بدقة» مباشرةً إلى الأعضاء المضيئة المعايرة للضوء المحيط المذكورة قبل [D] مباشرةً قبل الانتقال إلى سحب المخاط.",
        },
      },
      {
        id: "toefl-r-q8",
        number: 8,
        questionType: "prose-summary",
        typeBadge: {
          en: "Prose Summary",
          ar: "ملخص النص",
        },
        prompt:
          "Introductory sentence: Bioluminescence is a pervasive adaptation that shapes survival and ecological signalling across deep-sea environments.\nSelect the choice that accurately captures the THREE major ideas of the passage.",
        options: [
          "1) Most deep-sea light is energy-efficient blue-green emission tuned to seawater transmission, with rare predatory exceptions; 2) Glow serves camouflage and defence as well as hunting; 3) Species either make/ingest luciferin or partner with controllable symbiotic bacteria.",
          "1) Sunlight reaches 1,000 metres in clear oceans; 2) Red wavelengths travel farthest through deep seawater; 3) Bacterial symbiosis removes all metabolic energy costs for hosts.",
          "1) Bioluminescence warms deep-sea habitats by five degrees; 2) Hatchetfish use dark ink to confuse dragonfish; 3) Only gelatinous siphonophores can produce cold light.",
          "1) Deep-sea organisms glow solely to attract mates during winter; 2) Copepods cannot survive below the epipelagic zone; 3) Retinas in abyssal fish are completely non-functional.",
        ],
        correctIndex: 0,
        explanation: {
          en: "The first summary integrates the passage's three core pillars: cold blue-green light physics & exceptions (Paras 1–2), defensive/predatory signalling (Para 3), and internal vs. symbiotic light production (Para 4).",
          ar: "يجمع الملخص الأول المحاور الثلاثة الرئيسة في النص: فيزياء الضوء البارد الأزرق المخضر واستثناءاته، ووظائف التمويه والدفاع، وآليتا الإنتاج الذاتي والتكافل البكتيري.",
        },
      },
    ],
  },
  {
    id: "toefl-r-p2",
    title: "Merchant Guilds, Credit Instruments, and Urban Trade in Medieval Europe",
    category: {
      en: "Passage 2 · Economic History",
      ar: "القطعة ٢ · التاريخ الاقتصادي",
    },
    paragraphs: [
      {
        label: "Paragraph 1",
        text: "Between the eleventh and fourteenth centuries, Western Europe underwent a commercial expansion that transformed sleepy fortified boroughs into bustling centres of long-distance exchange. Yet conducting interregional commerce remained perilous. Political authority was fractured across hundreds of duchies, bishoprics, and autonomous communes, meaning that a Flemish cloth merchant selling woollens at the Champagne fairs in eastern France enjoyed little automatic legal recourse if a buyer defaulted or a local lord seized his wagons. In the absence of unified territorial courts, merchants constructed their own institutional scaffolding: the merchant guild.",
      },
      {
        label: "Paragraph 2",
        text: "Far more than social fraternities, merchant guilds functioned as private enforcement networks. Guild charters granted members exclusive wholesale trading privileges within their home town in exchange for strict adherence to quality benchmarks, standardised weights, and collective dispute arbitration. Crucially, guilds leveraged economic boycotts to discipline predatory rulers abroad. If an Italian prince unlawfully confiscated goods belonging to a single Hanseatic trader, the entire league could halt Baltic grain and timber shipments to that principality until restitution was paid. Economic historians note that this credible threat of collective retaliation lowered transaction risks substantially, encouraging long-distance ventures that no solitary trader could safely undertake.",
      },
      {
        label: "Paragraph 3",
        text: "Expanding trade volumes soon exposed a second bottleneck: the hazard and weight of hauling silver and gold coinage along bandit-prone roads. [A] Italian banking houses in Genoa, Florence, and Siena pioneered a paper solution known as the bill of exchange. [B] Under this instrument, a merchant deposited local currency with a banker in Bruges and received a written order instructing an affiliate banker in Venice to pay the equivalent sum in Venetian ducats ninety days later. [C] Because medieval canon law forbade charging overt interest on loans, bankers embedded their profit discreetly inside the foreign-exchange conversion rate between the two cities. [D] By eliminating physical bullion transport and supplying short-term commercial credit simultaneously, bills of exchange lubricated continental trade from London to the Levant.",
      },
      {
        label: "Paragraph 4",
        text: "By the late fifteenth century, however, the very exclusionary mechanisms that had initially fostered urban stability began to impede economic dynamism. Established guilds frequently restricted apprenticeships to masters' relatives, blocked labour-saving textile looms to protect incumbent wages, and lobbied city councils to outlaw rural subcontracting. Rather than submitting to rigid urban bylaws, entrepreneurial merchants shifted wool spinning and weaving into countryside cottages—a decentralised 'putting-out' system outside guild jurisdiction. While guilds endured ceremonially for centuries, commercial momentum migrated steadily toward broader state-chartered courts and freer regional markets.",
      },
    ],
    questions: [
      {
        id: "toefl-r-q9",
        number: 9,
        questionType: "mcq",
        typeBadge: {
          en: "Factual Information",
          ar: "معلومات واقعية",
        },
        prompt:
          "According to Paragraph 1, what made long-distance commerce particularly risky in medieval Western Europe?",
        options: [
          "The complete prohibition of international cloth fairs in France.",
          "Fragmented political authority that left travelling traders without unified legal protection.",
          "A severe continental shortage of wool and woven textiles.",
          "Hostile maritime blockades closing all Mediterranean ports.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Paragraph 1 explains that political authority was fractured across hundreds of duchies, bishoprics, and communes, leaving merchants with little legal recourse abroad.",
          ar: "توضح الفقرة ١ أن تشتّت السلطة السياسية بين مئات الدوقيات والبلديات حرم التجار المسافرين من حماية قانونية موحّدة.",
        },
      },
      {
        id: "toefl-r-q10",
        number: 10,
        questionType: "mcq",
        typeBadge: {
          en: "Vocabulary in Context",
          ar: "المفردات في السياق",
        },
        prompt:
          "The word 'restitution' in Paragraph 2 ('until restitution was paid') is closest in meaning to:",
        options: ["taxation", "compensation", "permission", "legislation"],
        correctIndex: 1,
        explanation: {
          en: "When a ruler unlawfully confiscated a trader's goods, the guild boycotted trade until 'restitution'—repayment or compensation for the loss—was paid.",
          ar: "تعني كلمة «restitution» هنا التعويض أو رد الحقوق عن البضائع المصادَرة بصورة غير قانونية.",
        },
      },
      {
        id: "toefl-r-q11",
        number: 11,
        questionType: "mcq",
        typeBadge: {
          en: "Rhetorical Purpose",
          ar: "الغرض البلاغي",
        },
        prompt:
          "Why does the author mention the Hanseatic league halting Baltic grain and timber shipments in Paragraph 2?",
        options: [
          "To show that northern Europe lacked agricultural surpluses during the fourteenth century.",
          "To illustrate how guilds used collective boycotts to compel foreign rulers to respect merchant property.",
          "To contrast Italian textile manufacturing with Baltic forestry practices.",
          "To explain why grain prices collapsed in Genoa and Florence.",
        ],
        correctIndex: 1,
        explanation: {
          en: "The example demonstrates how guilds functioned as private enforcement networks by wielding credible collective economic boycotts against predatory rulers.",
          ar: "يوضح المثال كيف استخدمت النقابات سلاح المقاطعة الاقتصادية الجماعية لإلزام الحكام باحترام ممتلكات التجار.",
        },
      },
      {
        id: "toefl-r-q12",
        number: 12,
        questionType: "mcq",
        typeBadge: {
          en: "Factual Information",
          ar: "معلومات واقعية",
        },
        prompt:
          "How did medieval Italian bankers earn a profit on bills of exchange without violating canon law?",
        options: [
          "By charging a flat storage fee for silver coins left at Champagne fairs.",
          "By building their profit quietly into the currency exchange rate between cities.",
          "By requiring every merchant to join an ecclesiastical charity fund.",
          "By issuing interest-bearing loans strictly to royal treasuries.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Paragraph 3 notes that because canon law forbade overt interest, bankers embedded their profit discreetly inside the foreign-exchange conversion rate between the two cities.",
          ar: "تذكر الفقرة ٣ أنه نظراً لتحريم الفائدة الصريحة، أخفى المصرفيون أرباحهم ضمن سعر صرف العملات بين المدينتين.",
        },
      },
      {
        id: "toefl-r-q13",
        number: 13,
        questionType: "mcq",
        typeBadge: {
          en: "Negative Factual Information",
          ar: "معلومات واقعية سلبية (EXCEPT)",
        },
        prompt:
          "According to Paragraph 4, established urban guilds impeded economic dynamism in all of the following ways EXCEPT:",
        options: [
          "Limiting apprenticeships primarily to relatives of guild masters.",
          "Resisting labour-saving textile looms to protect existing wages.",
          "Pressuring town councils to ban rural subcontracting.",
          "Refusing to accept bills of exchange issued by Venetian banks.",
        ],
        correctIndex: 3,
        explanation: {
          en: "Paragraph 4 lists nepotistic apprenticeships, blocking labour-saving looms, and lobbying against rural subcontracting; refusing Venetian bills of exchange is never mentioned.",
          ar: "تذكر الفقرة ٤ قصر التلمذة على الأقارب، ومقاومة الأنوال الموفّرة للعمل، ومحاربة التعاقد الريفي، دون ذكر رفض كمبيالات البندقية.",
        },
      },
      {
        id: "toefl-r-q14",
        number: 14,
        questionType: "mcq",
        typeBadge: {
          en: "Sentence Simplification",
          ar: "تبسيط الجملة",
        },
        prompt:
          "Which of the following best expresses the essential information in the sentence in Paragraph 4?\n('Rather than submitting to rigid urban bylaws, entrepreneurial merchants shifted wool spinning and weaving into countryside cottages—a decentralised putting-out system outside guild jurisdiction.')",
        options: [
          "To bypass strict city guild rules, enterprising merchants moved textile production to rural households beyond guild authority.",
          "Urban bylaws forced rural cottage weavers to relocate inside fortified towns under guild supervision.",
          "Countryside cottages adopted guild rules voluntarily in order to compete with urban wool weavers.",
          "Merchants abandoned wool trading completely after guilds banned decentralised cottage production.",
        ],
        correctIndex: 0,
        explanation: {
          en: "Option A captures both the cause (evading rigid urban guild bylaws) and the action (relocating spinning and weaving to rural cottages outside guild jurisdiction).",
          ar: "يلخّص الخيار الأول بدقة الدافع (تجاوز لوائح النقابات الحضرية الصارمة) والإجراء (نقل الغزل والنسيج إلى الأكواخ الريفية خارج سلطة النقابات).",
        },
      },
      {
        id: "toefl-r-q15",
        number: 15,
        questionType: "insert-text",
        typeBadge: {
          en: "Insert Text",
          ar: "إدراج جملة",
        },
        prompt:
          'Look at the four bracketed markers [A], [B], [C], and [D] in Paragraph 3. Where would the following sentence best fit?\n"For the merchant, this three-month delay effectively served as a commercial loan covering the time needed to ship and sell cargo."',
        options: ["Position [A]", "Position [B]", "Position [C]", "Position [D]"],
        correctIndex: 2,
        explanation: {
          en: "The phrase 'this three-month delay' links directly back to 'ninety days later' at the end of the sentence before [C], and smoothly introduces the next sentence about canon law forbidding overt interest on loans.",
          ar: "ترتبط عبارة «تأخير الأشهر الثلاثة» مباشرةً بـ «بعد تسعين يوماً» قبل [C]، وتُمهّد بسلاسة للجملة التالية حول تحريم الفائدة على القروض.",
        },
      },
      {
        id: "toefl-r-q16",
        number: 16,
        questionType: "prose-summary",
        typeBadge: {
          en: "Prose Summary",
          ar: "ملخص النص",
        },
        prompt:
          "Introductory sentence: Commercial institutions evolved rapidly across medieval Europe to solve legal insecurity and payment risks in long-distance trade.\nSelect the choice that accurately captures the THREE major ideas of the passage.",
        options: [
          "1) Merchant guilds protected property and enforced standards via collective boycotts across fractured territories; 2) Bills of exchange replaced risky bullion shipments while offering disguised credit; 3) Eventually, guild rigidity pushed production into rural putting-out networks and broader state markets.",
          "1) Unified European courts guaranteed safe travel from the eleventh century onward; 2) Medieval canon law encouraged high-interest loans; 3) Guilds collapsed immediately after the Champagne fairs opened.",
          "1) Hanseatic traders invented bills of exchange to buy Venetian wool; 2) Rural cottage weavers controlled urban city councils; 3) Gold coinage disappeared completely from European commerce by 1200.",
          "1) Merchant guilds existed solely as religious fraternities; 2) Banditry prevented all land trade between France and Italy; 3) Labour-saving looms were invented inside urban guild halls.",
        ],
        correctIndex: 0,
        explanation: {
          en: "The first option synthesises the arc of all four paragraphs: guild enforcement under fragmented rule, financial innovation via bills of exchange, and late-medieval shift away from restrictive guilds.",
          ar: "يجمع الخيار الأول التسلسل الرئيسي للفقرات الأربع: حماية النقابات في ظل التشتت السياسي، وابتكار كمبيالات الصرف، ثم انتقال الإنتاج إلى الريف والأسواق الأوسع.",
        },
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* TOEFL iBT Listening Section (36 min · 3 Audio Items · 15 Questions)        */
/* -------------------------------------------------------------------------- */

const TOEFL_LISTENING_PARTS: ListeningPart[] = [
  {
    id: "toefl-l-part-1",
    title: {
      en: "Campus Conversation: Switching to an Environmental Data Science Seminar",
      ar: "محادثة جامعية: التحويل إلى حلقة بحث علوم البيانات البيئية",
    },
    context: {
      en: "Listen to a conversation between an undergraduate student and an academic advisor in the Faculty of Environmental Studies.",
      ar: "استمع إلى محادثة بين طالب جامعي ومرشدة أكاديمية في كلية الدراسات البيئية.",
    },
    speakerMode: "dialogue",
    transcript: [
      {
        speaker: "Advisor",
        voice: "female",
        text: "Hi Omar, come on in. You emailed about adjusting your spring schedule before Friday's add/drop deadline?",
      },
      {
        speaker: "Student",
        voice: "male",
        text: "Yes, thanks for fitting me in, Ms. Reyes. I am currently registered for History of Urban Policy, which satisfies my upper-division elective, but I just noticed there is an open seat in Professor Lin's Environmental Data Science seminar.",
      },
      {
        speaker: "Advisor",
        voice: "female",
        text: "Ah, ENV 412. That is a fantastic seminar, especially since you are applying to climate-analytics internships this summer. Let me pull up your transcript to check the prerequisites, though.",
      },
      {
        speaker: "Student",
        voice: "male",
        text: "That is actually why I stopped by. The catalogue lists Introduction to Python—CS 110—as a prerequisite. I did not take CS 110 formally here, because I taught myself Python during my lab assistantship last summer and built rainfall scripts for Dr. Gomez.",
      },
      {
        speaker: "Advisor",
        voice: "female",
        text: "Hmm. The registration portal will automatically block you without CS 110 on your transcript, so I cannot override it unilaterally. However, Professor Lin accepts a prerequisite waiver if you email her a brief code sample and a confirmation note from Dr. Gomez.",
      },
      {
        speaker: "Student",
        voice: "male",
        text: "Oh, I have my rainfall-cleaning scripts on GitHub right now, and Dr. Gomez has office hours at two today! Wait—should I drop Urban Policy immediately so I don't hit the credit cap?",
      },
      {
        speaker: "Advisor",
        voice: "female",
        text: "Hold off on dropping Urban Policy! If that seat in ENV 412 gets grabbed by someone else while your waiver is being reviewed, you could end up locked out of both courses. Once Professor Lin emails me her signed override, I will swap the two courses simultaneously on my end.",
      },
      {
        speaker: "Student",
        voice: "male",
        text: "That makes total sense—good thing I asked first. Also, does ENV 412 count toward the quantitative methods requirement if I decide to pursue the honours track?",
      },
      {
        speaker: "Advisor",
        voice: "female",
        text: "It does! In fact, taking it this spring means you will have your statistical-modelling credit done a full semester early, leaving senior autumn open for your thesis fieldwork.",
      },
    ],
    questions: [
      {
        id: "toefl-l-q1",
        number: 1,
        questionType: "mcq",
        typeBadge: {
          en: "Gist-Purpose",
          ar: "الغرض الرئيسي",
        },
        prompt: "Why does the student visit the academic advisor?",
        options: [
          "To appeal a failing grade in Introduction to Python.",
          "To find out how to switch into an Environmental Data Science seminar despite missing a formal prerequisite.",
          "To ask for an extension on his summer climate-analytics internship application.",
          "To complain about overcrowded seating in History of Urban Policy.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Omar wants to switch from Urban Policy into ENV 412 before the add/drop deadline and needs help because he lacks formal CS 110 credit.",
          ar: "يزور عمر المرشدة لمعرفة كيفية التحويل إلى حلقة ENV 412 قبل الموعد النهائي رغم عدم دراسته المقرر التمهيدي CS 110 رسمياً.",
        },
      },
      {
        id: "toefl-l-q2",
        number: 2,
        questionType: "mcq",
        typeBadge: {
          en: "Detail",
          ar: "تفاصيل",
        },
        prompt: "What must Omar provide to Professor Lin to obtain a prerequisite waiver?",
        options: [
          "A passing score on a timed departmental Python exam.",
          "A brief code sample and a confirmation note from Dr. Gomez.",
          "An official letter from his summer internship employer.",
          "A completed syllabus from History of Urban Policy.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Ms. Reyes explains that Professor Lin accepts a prerequisite waiver if Omar sends a brief code sample plus a confirmation note from Dr. Gomez.",
          ar: "توضح المرشدة أن الأستاذة لين تقبل الإعفاء عند إرسال عينة برمجية قصيرة ورسالة تأكيد من د. غوميز.",
        },
      },
      {
        id: "toefl-l-q3",
        number: 3,
        questionType: "mcq",
        typeBadge: {
          en: "Function / Advice",
          ar: "الوظيفة والتوجيه",
        },
        prompt: "Why does the advisor tell Omar, 'Hold off on dropping Urban Policy!'?",
        options: [
          "Because Urban Policy is mandatory for all graduating seniors.",
          "Because he might lose his seat in both classes if ENV 412 fills up before the waiver is approved.",
          "Because dropping a course before Friday triggers a late tuition penalty.",
          "Because Professor Lin requires students to remain enrolled in both seminars.",
        ],
        correctIndex: 1,
        explanation: {
          en: "She warns that another student could claim the open seat in ENV 412 while his waiver is pending, leaving him locked out of both courses.",
          ar: "تحذّره من احتمال حجز المقعد الشاغر في ENV 412 أثناء مراجعة الإعفاء مما قد يحرمه من المقررين معاً.",
        },
      },
      {
        id: "toefl-l-q4",
        number: 4,
        questionType: "mcq",
        typeBadge: {
          en: "Detail",
          ar: "تفاصيل",
        },
        prompt: "What extra academic benefit will taking ENV 412 this spring give Omar?",
        options: [
          "It automatically waives his senior honours thesis requirement.",
          "It completes his quantitative methods credit a semester early, freeing up autumn for thesis fieldwork.",
          "It pays a monthly research stipend through Professor Lin's grant.",
          "It allows him to graduate a full year ahead of schedule.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Ms. Reyes confirms ENV 412 counts toward the quantitative methods requirement, finishing it early so senior autumn is free for thesis fieldwork.",
          ar: "تؤكد المرشدة أن المقرر يحتسب ضمن متطلب الأساليب الكمية مبكراً، مما يفرّغ فصل الخريف للعمل الميداني للأطروحة.",
        },
      },
      {
        id: "toefl-l-q5",
        number: 5,
        questionType: "mcq",
        typeBadge: {
          en: "Inference",
          ar: "الاستنتاج",
        },
        prompt: "What will Omar most likely do immediately after leaving the advisor's office?",
        options: [
          "Log into the portal and drop History of Urban Policy.",
          "Visit Dr. Gomez during 2:00 p.m. office hours and send his GitHub rainfall scripts to Professor Lin.",
          "Register for CS 110 for the upcoming summer term instead.",
          "Ask the Registrar to raise his semester credit cap.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Omar notes his scripts are already on GitHub and Dr. Gomez has office hours at two today, making that his immediate next step to secure the waiver.",
          ar: "يذكر عمر أن شيفراته جاهزة على GitHub وأن د. غوميز لديه ساعات مكتبية الساعة الثانية اليوم، ما يجعل ذلك خطوته الفورية التالية.",
        },
      },
    ],
  },
  {
    id: "toefl-l-part-2",
    title: {
      en: "Astronomy Lecture: Detecting Exoplanets via the Transit Photometry Method",
      ar: "محاضرة فلك: اكتشاف الكواكب الخارجية بطريقة قياس العبور الضوئي",
    },
    context: {
      en: "Listen to part of a lecture in an undergraduate astronomy class explaining how space telescopes identify planets orbiting distant stars.",
      ar: "استمع إلى جزء من محاضرة فلك جامعية تشرح كيف ترصد التلسكوبات الفضائية الكواكب التي تدور حول نجوم بعيدة.",
    },
    speakerMode: "lecture",
    transcript: [
      {
        speaker: "Professor",
        voice: "male",
        text: "Last week we saw why photographing an exoplanet directly is extraordinarily hard—it is a bit like trying to spot a firefly hovering beside a stadium floodlight from several hundred kilometres away. Today, let us turn to the technique responsible for discovering more than three-quarters of all known exoplanets: transit photometry.",
      },
      {
        speaker: "Professor",
        voice: "male",
        text: "The core geometry is wonderfully simple. When a planet's orbital plane happens to line up edge-on with our line of sight, the planet periodically passes—or transits—directly across the face of its host star. As it crosses, it blocks a tiny fraction of the star's light. By plotting the star's brightness continuously over time—creating what astronomers call a light curve—we observe a shallow, U-shaped dip.",
      },
      {
        speaker: "Professor",
        voice: "male",
        text: "What can a single repeating dip tell us? Quite a lot! First, the time interval between consecutive dips yields the planet's orbital period—the length of its year. Second, the depth of the dip reveals the planet's physical radius relative to the star: a Jupiter-sized gas giant crossing a Sun-like star dims the light by roughly one percent, whereas an Earth-sized rocky world causes a dip of barely one hundredth of one percent—which is why space-based telescopes like Kepler and TESS are vital, free from Earth's shimmering atmosphere.",
      },
      {
        speaker: "Professor",
        voice: "male",
        text: "Now, do not assume every brightness dip signals a planet. Astronomers constantly guard against 'false positives'. A dark starspot rotating across a stellar surface can mimic a dip, as can an eclipsing binary—two stars orbiting each other where the fainter star briefly passes in front of the brighter one. To confirm a genuine planet, teams typically demand at least three strictly periodic transits and then follow up with radial-velocity spectroscopy from ground observatories to measure the planet's gravitational tug—and therefore its mass.",
      },
      {
        speaker: "Professor",
        voice: "male",
        text: "Even better, combining radius from the transit with mass from radial velocity gives us average density—telling us instantly whether we have found a puffy gas giant or a dense rocky world. And if we examine starlight filtering through the planet's thin atmospheric limb during transit—a method called transmission spectroscopy—we can even read the chemical fingerprints of water vapour, methane, or carbon dioxide.",
      },
    ],
    questions: [
      {
        id: "toefl-l-q6",
        number: 6,
        questionType: "mcq",
        typeBadge: {
          en: "Gist-Content",
          ar: "الفكرة الرئيسية",
        },
        prompt: "What is the main topic of the lecture?",
        options: [
          "Why ground-based telescopes are superior to space-based observatories.",
          "How transit photometry detects exoplanets, measures their properties, and rules out false signals.",
          "How fireflies produce visible light compared to distant host stars.",
          "Why gas giants form closer to host stars than rocky planets.",
        ],
        correctIndex: 1,
        explanation: {
          en: "The professor explains the mechanics of transit photometry, what orbital period and radius data it yields, how false positives are filtered, and how it combines with spectroscopy.",
          ar: "يشرح الأستاذ آلية قياس العبور الضوئي وما تكشفه من فترة مدارية ونصف قطر، وكيفية استبعاد الإشارات الكاذبة والدمج مع التحليل الطيفي.",
        },
      },
      {
        id: "toefl-l-q7",
        number: 7,
        questionType: "mcq",
        typeBadge: {
          en: "Organization / Analogy",
          ar: "التنظيم والتشبيه",
        },
        prompt:
          "Why does the professor compare direct exoplanet imaging to spotting a firefly next to a stadium floodlight?",
        options: [
          "To illustrate how overwhelmingly bright a host star is compared to a faint orbiting planet.",
          "To explain why exoplanets emit pulses of bioluminescent green light.",
          "To demonstrate how atmospheric pollution ruins urban astronomy.",
          "To highlight the spherical shape of U-shaped light curves.",
        ],
        correctIndex: 0,
        explanation: {
          en: "The analogy emphasises the extreme brightness contrast that makes direct photography difficult, motivating indirect detection via transit photometry.",
          ar: "يبرز التشبيه التباين الهائل في السطوع بين النجم المضيف والكوكب الخافت، مما يوضح سبب صعوبة التصوير المباشر.",
        },
      },
      {
        id: "toefl-l-q8",
        number: 8,
        questionType: "mcq",
        typeBadge: {
          en: "Detail",
          ar: "تفاصيل",
        },
        prompt:
          "According to the professor, what property of an exoplanet is directly determined from the depth of a transit dip?",
        options: [
          "Its chemical atmospheric composition.",
          "Its physical radius relative to its host star.",
          "Its total gravitational mass.",
          "Its surface wind speed.",
        ],
        correctIndex: 1,
        explanation: {
          en: "The professor states that the interval gives orbital period, whereas the depth of the dip reveals the planet's physical radius relative to the star (mass requires radial-velocity follow-up).",
          ar: "يوضح الأستاذ أن عمق الانخفاض الضوئي يكشف نصف القطر الفيزيائي للكوكب مقارنةً بنجمه، بينما تُقاس الكتلة بطريقة السرعة الشعاعية.",
        },
      },
      {
        id: "toefl-l-q9",
        number: 9,
        questionType: "mcq",
        typeBadge: {
          en: "Detail",
          ar: "تفاصيل",
        },
        prompt:
          "Which two phenomena does the professor mention as potential 'false positives' in transit data?",
        options: [
          "Solar flares and orbiting asteroids.",
          "Rotating dark starspots and eclipsing binary star systems.",
          "Telescope mirror dust and lunar eclipses.",
          "Interstellar gas clouds and comet tails.",
        ],
        correctIndex: 1,
        explanation: {
          en: "The professor specifically warns that a rotating dark starspot or an eclipsing binary pair of stars can mimic a planetary transit dip.",
          ar: "يحذّر الأستاذ تحديداً من أن البقع النجمية الداكنة الدوارة والنجوم الثنائية الكاسفة قد تحاكي انخفاض عبور الكوكب.",
        },
      },
      {
        id: "toefl-l-q10",
        number: 10,
        questionType: "mcq",
        typeBadge: {
          en: "Connecting Content",
          ar: "ربط المعلومات",
        },
        prompt: "How do astronomers determine whether a transiting exoplanet is rocky or gaseous?",
        options: [
          "By measuring the colour of the host star with a ground camera.",
          "By combining its transit radius with its radial-velocity mass to calculate average density.",
          "By counting whether the planet transits more than ten times per month.",
          "By measuring the duration of a single starspot rotation.",
        ],
        correctIndex: 1,
        explanation: {
          en: "In the final paragraph, the professor explains that pairing radius (from transit) with mass (from radial velocity) yields average density, distinguishing rocky worlds from puffy gas giants.",
          ar: "يشرح الأستاذ أن دمج نصف القطر من العبور مع الكتلة من السرعة الشعاعية يعطي متوسط الكثافة لتمييز الكواكب الصخرية عن الغازية.",
        },
      },
    ],
  },
  {
    id: "toefl-l-part-3",
    title: {
      en: "Cognitive Psychology Lecture: The Spacing Effect & Retrieval Practice",
      ar: "محاضرة علم نفس معرفي: أثر التباعد وممارسة الاسترجاع في الذاكرة طويلة المدى",
    },
    context: {
      en: "Listen to part of a lecture in a cognitive psychology course on evidence-based memory consolidation strategies.",
      ar: "استمع إلى جزء من محاضرة في علم النفس المعرفي حول استراتيجيات ترسيخ الذاكرة القائمة على الأدلة.",
    },
    speakerMode: "lecture",
    transcript: [
      {
        speaker: "Professor",
        voice: "female",
        text: "Be honest for a second—how many of you have ever highlighted an entire textbook chapter and reread it three times the night before an exam? Almost every hand goes up! Psychologists call that 'massed practice'—or cramming—and while it produces a comforting feeling of familiarity, decades of memory research show it is remarkably fragile.",
      },
      {
        speaker: "Professor",
        voice: "female",
        text: "Back in 1885, Hermann Ebbinghaus documented what we now call the spacing effect: distributing identical study time across multiple shorter sessions separated by days produces far stronger long-term retention than lumping those same hours into a single marathon evening. Why? One leading explanation is 'study-phase retrieval': when you let a little forgetting occur between sessions, your brain has to work harder to reconstruct the memory trace, and that effortful reconstruction actually strengthens the synaptic pathways.",
      },
      {
        speaker: "Professor",
        voice: "female",
        text: "Closely allied with spacing is retrieval practice—sometimes called the testing effect. In a classic 2006 experiment by Roediger and Karpicke, students read short scientific passages. One group reread the passages four times, while a second group read them once and then spent the remaining time writing down everything they could remember from a blank sheet—with no feedback.",
      },
      {
        speaker: "Professor",
        voice: "female",
        text: "Here is the twist that surprises students every semester. On a test given just five minutes later, the rereading group actually scored slightly higher! Yet when both groups returned one week later, the rereaders had forgotten more than half of the material, whereas the retrieval-practice group retained dramatically more.",
      },
      {
        speaker: "Professor",
        voice: "female",
        text: "So why do learners cling to rereading? Cognitive scientists call it an 'illusion of competence'. Because familiar sentences glide smoothly across your eyes during a second reading, you misinterpret processing fluency as durable mastery. By contrast, closing the book and struggling to recall feels uncomfortable—what Robert Bjork coined a 'desirable difficulty'—yet that very struggle is the engine of lasting learning.",
      },
    ],
    questions: [
      {
        id: "toefl-l-q11",
        number: 11,
        questionType: "mcq",
        typeBadge: {
          en: "Gist-Content",
          ar: "الفكرة الرئيسية",
        },
        prompt: "What is the professor's primary point in this lecture?",
        options: [
          "Highlighting textbooks is effective only when combined with evening cramming.",
          "Effortful strategies like spaced study and active retrieval outperform passive rereading for long-term memory.",
          "Memory declines identically after one week regardless of study technique.",
          "Hermann Ebbinghaus disproved the effectiveness of blank-sheet recall tests.",
        ],
        correctIndex: 1,
        explanation: {
          en: "The lecture contrasts fragile cramming/rereading with the superior long-term retention achieved through distributed spacing and active retrieval practice.",
          ar: "تقابل المحاضرة الحشو والقراءة المتكررة الهشّة بالتفوق الكبير للتباعد الزمني وممارسة الاسترجاع النشط في الحفظ طويل المدى.",
        },
      },
      {
        id: "toefl-l-q12",
        number: 12,
        questionType: "mcq",
        typeBadge: {
          en: "Detail",
          ar: "تفاصيل",
        },
        prompt:
          "According to the 'study-phase retrieval' explanation, why does allowing brief forgetting between study sessions help long-term memory?",
        options: [
          "It lowers brain glucose consumption during late-night exams.",
          "Forcing the brain to work harder to reconstruct the memory strengthens its neural pathways.",
          "It removes older interfering facts from short-term storage.",
          "It doubles the total number of hours spent reading textbooks.",
        ],
        correctIndex: 1,
        explanation: {
          en: "The professor explains that slight forgetting forces effortful memory reconstruction during the next session, which strengthens synaptic pathways.",
          ar: "توضح الأستاذة أن السماح بنسيان طفيف يجبر الدماغ على بذل جهد لإعادة بناء الذاكرة، مما يقوّي الروابط العصبية.",
        },
      },
      {
        id: "toefl-l-q13",
        number: 13,
        questionType: "mcq",
        typeBadge: {
          en: "Comparison / Detail",
          ar: "المقارنة والتفاصيل",
        },
        prompt: "What surprising result occurred in Roediger and Karpicke's 2006 study?",
        options: [
          "The retrieval group scored higher five minutes later, but forgot everything after a week.",
          "The rereading group scored slightly higher after five minutes, but retained far less than the retrieval group after one week.",
          "Both groups performed identically on both the five-minute test and the one-week test.",
          "Students who received detailed teacher feedback performed worse than those who crammed.",
        ],
        correctIndex: 1,
        explanation: {
          en: "The professor highlights the twist: rereaders edged ahead on the immediate five-minute test, yet lost over half the material by week one, when the retrieval group dominated.",
          ar: "تبرز الأستاذة المفارقة: تفوّقت مجموعة إعادة القراءة قليلاً بعد ٥ دقائق فقط، لكنها فقدت أكثر من نصف المادة بعد أسبوع مقارنةً بتفوّق مجموعة الاسترجاع.",
        },
      },
      {
        id: "toefl-l-q14",
        number: 14,
        questionType: "mcq",
        typeBadge: {
          en: "Concept / Term",
          ar: "المفاهيم والمصطلحات",
        },
        prompt: "What does the professor mean by the 'illusion of competence'?",
        options: [
          "Overestimating your exam score after taking a difficult practice quiz.",
          "Mistaking the smooth familiarity of rereading a text for genuine long-term mastery.",
          "Believing that spacing out study sessions requires less total time.",
          "Assuming that professors write exams exclusively from highlighted sentences.",
        ],
        correctIndex: 1,
        explanation: {
          en: "The professor defines it as misinterpreting smooth processing fluency during repeated reading as durable mastery.",
          ar: "تعرّفه الأستاذة بأنه الخلط بين سلاسة وألفة النص أثناء إعادة القراءة وبين الإتقان الحقيقي طويل المدى.",
        },
      },
      {
        id: "toefl-l-q15",
        number: 15,
        questionType: "mcq",
        typeBadge: {
          en: "Inference / Attitude",
          ar: "الاستنتاج والموقف",
        },
        prompt:
          "What study habit would the professor most likely recommend to a student preparing for a midterm two weeks away?",
        options: [
          "Reread the highlighted chapter four times on the evening before the exam.",
          "Close the textbook every few days and self-test key concepts from memory across spaced sessions.",
          "Avoid self-testing until you feel completely confident so recall never feels uncomfortable.",
          "Memorise word-for-word definitions in a single six-hour library session.",
        ],
        correctIndex: 1,
        explanation: {
          en: "Combining spaced sessions with effortful closed-book self-testing embodies both the spacing effect and Bjork's 'desirable difficulty'.",
          ar: "يمثّل الجمع بين الجلسات المتباعدة والاختبار الذاتي بكتاب مغلق جوهر أثر التباعد و«الصعوبة المرغوبة» التي توصي بها المحاضرة.",
        },
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* TOEFL iBT Speaking Section (16 min · 4 Official ETS Tasks)                 */
/* -------------------------------------------------------------------------- */

const TOEFL_SPEAKING_TASKS: SpeakingTask[] = [
  {
    id: "toefl-sp-task-1",
    partLabel: {
      en: "Task 1 · Independent Speaking",
      ar: "المهمة ١ · المحادثة المستقلة",
    },
    title: {
      en: "Campus Study Preference: Group Study vs. Studying Alone",
      ar: "تفضيل الدراسة الجامعية: الدراسة الجماعية مقابل الدراسة الفردية",
    },
    prepSeconds: 15,
    speakSeconds: 45,
    prompts: [
      "Some university students prefer to prepare for major exams by studying in small peer groups, whereas others prefer to study entirely on their own in a quiet space. Which approach do you prefer? Use specific reasons and examples to support your opinion.",
    ],
    fluencyHints: [
      {
        en: "State your choice in the very first sentence—do not waste 10 seconds repeating the prompt.",
        ar: "حدّد اختيارك في الجملة الأولى مباشرةً دون إضاعة ١٠ ثوانٍ في تكرار السؤال.",
      },
      {
        en: "Deliver two clear reasons with one brief concrete example inside 45 seconds.",
        ar: "قدّم سببين واضحين مع مثال قصير ومحدد خلال ٤٥ ثانية.",
      },
      {
        en: "Use clean transition markers ('First of all...', 'For instance...', 'On top of that...').",
        ar: "استخدم روابط انتقال واضحة («أولاً...»، «على سبيل المثال...»، «علاوة على ذلك...»).",
      },
    ],
    modelResponse:
      "Personally, I strongly prefer studying on my own in a quiet space before major exams. First of all, solo study lets me control my pace and focus strictly on my weak spots. For example, before my statistics midterm last semester, I spent two solid hours drilling probability proofs instead of reviewing basic charts I already mastered—something a group often slows down over. On top of that, studying alone eliminates off-topic chatter. Even well-meaning friends tend to drift into casual conversation after twenty minutes, breaking deep concentration. For these two reasons, quiet independent study makes my exam preparation far more efficient.",
  },
  {
    id: "toefl-sp-task-2",
    partLabel: {
      en: "Task 2 · Integrated Campus Situation",
      ar: "المهمة ٢ · الموقف الجامعي المتكامل",
    },
    title: {
      en: "Announcement: Extended Library Hours & Dedicated Quiet Zones",
      ar: "إعلان جامعي: تمديد ساعات المكتبة ومناطق الهدوء المخصصة",
    },
    prepSeconds: 30,
    speakSeconds: 60,
    prompts: [
      "The woman expresses her opinion about the university's proposed library policy. State her opinion and explain the two reasons she gives for holding that opinion.",
    ],
    readingSnippet: {
      title: "Campus Notice: Extended Main Library Hours & Quiet Floor Policy",
      text: "Beginning next month, the Main Library will remain open until 2:00 a.m. Sunday through Thursday instead of closing at 11:00 p.m. In addition, the entire third floor will be converted from open collaborative tables into a strict Silent Study Zone. To offset overnight staffing costs, the university will close the library's first-floor coffee kiosk at 8:00 p.m. daily.",
    },
    listeningSnippet: {
      speaker: "Two Students (Maya & Daniel)",
      transcript: [
        "Daniel: Did you see the notice about the Main Library staying open until two in the morning? You must be thrilled!",
        "Maya: Actually, I have mixed feelings—honestly, I think the plan has two real flaws.",
        "Daniel: Really? Even the silent third floor?",
        "Maya: Look, converting the entire third floor into a silent zone removes almost half of our whiteboard group tables right when engineering and business courses are assigning more team projects. We already have silent carrels on the fourth and fifth floors—taking away collaborative space will just push study groups into noisy hallways.",
        "Daniel: Fair point. What about the extra late-night hours, though?",
        "Maya: Staying open until two sounds great on paper, except shutting down the first-floor coffee kiosk at eight p.m. defeats the whole purpose! Students working late need quick access to hot drinks and snacks without walking fifteen minutes off campus in the dark just to grab a sandwich.",
      ],
    },
    fluencyHints: [
      {
        en: "Spend only 10–12 seconds summarising the reading announcement, then devote ~45 seconds to the woman's opinion and her two reasons.",
        ar: "خصّص ١٠–١٢ ثانية فقط لتلخيص الإعلان، ثم كرّس نحو ٤٥ ثانية لرأي الطالبة وسببيها.",
      },
      {
        en: "Use accurate reporting verbs ('The woman opposes the plan...', 'First, she points out that...', 'Second, she argues that...').",
        ar: "استخدم أفعال نقل دقيقة («تعارض الطالبة الخطة...»، «أولاً، تشير إلى أن...»، «ثانياً، ترى أن...»).",
      },
    ],
    modelResponse:
      "The university plans to extend Main Library hours until 2:00 a.m., convert the third floor into a strict silent zone, and close the first-floor coffee kiosk at 8:00 p.m. to save money. However, the woman disagrees with the plan for two main reasons. First, she points out that turning the entire third floor into a silent area eliminates nearly half of the library's whiteboard group tables at a time when classes assign more team projects, even though silent carrels already exist on floors four and five—forcing groups into noisy corridors. Second, she argues that closing the coffee kiosk at eight undermines the extended hours because late-night students need quick snacks and drinks without walking fifteen minutes off campus in the dark.",
  },
  {
    id: "toefl-sp-task-3",
    partLabel: {
      en: "Task 3 · Integrated Academic Concept",
      ar: "المهمة ٣ · المفهوم الأكاديمي المتكامل",
    },
    title: {
      en: "Biology Concept: Ecological Niche Partitioning",
      ar: "مفهوم الأحياء: تقسيم الموطن البيئي (Niche Partitioning)",
    },
    prepSeconds: 30,
    speakSeconds: 60,
    prompts: [
      "Using the example of Caribbean anole lizards from the professor's lecture, explain the concept of ecological niche partitioning.",
    ],
    readingSnippet: {
      title: "Ecological Niche Partitioning",
      text: "When two closely related species occupy the same habitat and rely on identical limited resources, intense competition can drive the weaker competitor to local extinction. Over evolutionary time, however, competing species frequently avoid direct conflict through ecological niche partitioning—dividing shared resources by foraging at different times, feeding on slightly different prey sizes, or occupying distinct microhabitats within the same ecosystem.",
    },
    listeningSnippet: {
      speaker: "Biology Professor",
      transcript: [
        "A textbook illustration of niche partitioning comes from Caribbean islands where several species of small insect-eating anole lizards live together in the very same forest trees.",
        "If all of these lizards hunted insects across the same branches, food competition would quickly wipe out the less aggressive species. Instead, field biologists discovered that each species claims its own vertical slice of the tree.",
        "One species, the crown-giant anole, stays high in the sunlit upper canopy and hunts large beetles among thick leaves. A second species, the trunk-ground anole, clings exclusively to the lower tree trunks and dashes onto the forest floor for ants. Meanwhile, slender twig anoles patrol only the narrow outer twigs where heavier lizards cannot balance.",
        "Because each species has evolved matching limb lengths and toe pads for its specific zone, all three coexist peacefully in one tree without exhausting one another's food supply.",
      ],
    },
    fluencyHints: [
      {
        en: "Define 'ecological niche partitioning' concisely in 1–2 sentences using the reading, then spend the bulk of your 60 seconds detailing the three lizard zones.",
        ar: "عرّف تقسيم الموطن البيئي بإيجاز في جملة أو جملتين من القراءة، ثم خصّص معظم وقتك لتفصيل مناطق السحالي الثلاث من المحاضرة.",
      },
      {
        en: "Connect the example back to the concept explicitly ('This illustrates niche partitioning because...').",
        ar: "اربط المثال بالمفهوم صراحةً («يوضح هذا تقسيم الموطن البيئي لأن...»).",
      },
    ],
    modelResponse:
      "Ecological niche partitioning occurs when closely related species sharing a habitat reduce direct competition by dividing resources across different microhabitats, times, or food sources. The professor illustrates this with three insect-eating anole lizard species living in the same Caribbean forest trees. Rather than competing across identical branches, each species occupies a distinct vertical zone. The crown-giant anole hunts large beetles high in the upper canopy, the trunk-ground anole sticks to lower trunks and the forest floor to catch ants, and slender twig anoles patrol narrow outer twigs that heavier lizards cannot reach. Because each evolved specialised limbs and toe pads for its own microhabitat, all three coexist in the same tree without depleting each other's food.",
  },
  {
    id: "toefl-sp-task-4",
    partLabel: {
      en: "Task 4 · Integrated Academic Lecture Summary",
      ar: "المهمة ٤ · تلخيص المحاضرة الأكاديمية",
    },
    title: {
      en: "Botany Lecture: Two Desert Plant Water-Conservation Adaptations",
      ar: "محاضرة نبات: تكيّفان لحفظ المياه في النباتات الصحراوية",
    },
    prepSeconds: 20,
    speakSeconds: 60,
    prompts: [
      "Using points and examples from the lecture, explain two key adaptations that enable desert plants to conserve water in arid environments.",
    ],
    listeningSnippet: {
      speaker: "Botany Professor",
      transcript: [
        "Surviving in an arid desert poses a brutal physiological dilemma for plants: they must open microscopic leaf pores called stomata to pull in carbon dioxide for photosynthesis, yet every moment those pores stay open in scorching daylight, precious water evaporates away.",
        "Desert flora have evolved two remarkable adaptations to solve this problem. The first is structural water storage combined with reduced surface area. Take the saguaro cactus of the Sonoran Desert: instead of broad flat leaves that lose moisture quickly, its leaves evolved into sharp spines that also shade the stem, while its pleated, accordion-like trunk expands after rare rainstorms to store thousands of litres of water inside spongy tissue.",
        "The second adaptation is biochemical—a shifted photosynthetic schedule called CAM photosynthesis. Unlike temperate plants that open their stomata at noon, desert agaves and cacti keep their pores tightly sealed all day long. They open them only in the cool desert night to absorb carbon dioxide, store it chemically as organic acid inside their cells, and then complete photosynthesis once sunlight returns the next morning with their pores shut tight.",
      ],
    },
    fluencyHints: [
      {
        en: "Frame both adaptations clearly: (1) structural storage & reduced leaf area (saguaro cactus) and (2) nocturnal CAM photosynthesis (agave/cacti).",
        ar: "نظّم إجابتك حول التكيّفين بوضوح: (١) التخزين البنيوي وتقليل مساحة الأوراق (صبار الساجوارو)، و(٢) التمثيل الضوئي الليلي CAM (الأغاف والصبار).",
      },
      {
        en: "Keep pace steady—about 25 seconds per adaptation plus a 10-second opening overview.",
        ar: "حافظ على إيقاع متوازن: ١٠ ثوانٍ للمقدمة ونحو ٢٥ ثانية لكل تكيّف مع مثاله.",
      },
    ],
    modelResponse:
      "In the lecture, the professor explains two key adaptations that help desert plants conserve water while still performing photosynthesis. First, many species use structural water storage and reduced leaf area. For example, the saguaro cactus replaces broad moisture-losing leaves with sharp spines that shade its stem, while its pleated accordion-like trunk expands after rare rainstorms to store vast amounts of water in spongy tissue. Second, desert plants rely on a biochemical timing shift called CAM photosynthesis. Instead of opening their pores during scorching daytime heat, plants like agaves keep their stomata sealed all day, open them only at night to take in carbon dioxide and store it as acid, and finish photosynthesis in sunlight with their pores closed.",
  },
];

/* -------------------------------------------------------------------------- */
/* TOEFL iBT Writing Section (29 min · 2 Modern ETS Tasks)                    */
/* -------------------------------------------------------------------------- */

const TOEFL_WRITING_TASKS: WritingTask[] = [
  {
    id: "toefl-w-task-1",
    label: {
      en: "Writing Task 1 · Integrated Writing",
      ar: "الكتابة — المهمة ١ · الكتابة المتكاملة",
    },
    title: {
      en: "Vertical Urban Farming: Reading Claims vs. Professor's Rebuttal",
      ar: "الزراعة الحضرية العمودية: حجج القراءة مقابل تفنيد المحاضر",
    },
    recommendedMinutes: 20,
    minWords: 150,
    prompt:
      "Summarise the points made in the lecture, being sure to explain how they cast doubt on the specific points made in the reading passage. Write 150–250 words (do not add your own personal opinion).",
    integratedReading: {
      title: "The Promise of Vertical Urban Farming",
      paragraphs: [
        "As metropolitan populations expand and arable farmland shrinks, many agricultural innovators advocate vertical urban farming—growing crops indoors in stacked hydroponic layers inside repurposed city warehouses. Proponents highlight three decisive advantages over conventional open-field agriculture.",
        "First, vertical farms dramatically cut transportation emissions. Because produce is harvested mere blocks from urban supermarkets and restaurants, food no longer needs to travel thousands of kilometres by refrigerated freight trucks, sharply reducing the carbon footprint of urban diets.",
        "Second, indoor hydroponic systems use up to ninety-five percent less water than traditional field irrigation. By recirculating nutrient-rich mist directly onto plant roots inside closed chambers, vertical farms promise drought-proof food security even in water-scarce regions.",
        "Third, vertical farming can feed rapidly growing cities reliably year-round. Shielded from frost, hailstorms, and seasonal droughts, multi-storey indoor facilities operate twenty-four hours a day, offering a scalable replacement for vulnerable outdoor farmland.",
      ],
    },
    integratedLecture: {
      speaker: "Agricultural Economics Professor",
      transcript: [
        "Vertical farming looks sleek in architectural renderings, yet when we run real-world energy and calorie audits, every one of those three optimistic claims runs into serious obstacles.",
        "Start with carbon emissions. Yes, vertical farms cut trucking distances—but they replace free sunlight with banks of artificial LED lamps and 24-hour climate-control chillers. Unless a city's electrical grid runs almost entirely on zero-carbon power, the electricity required to light and cool a windowless warehouse generates far more greenhouse gas per kilogram of lettuce than shipping field-grown produce across a continent.",
        "Next, consider the impressive ninety-five percent water savings. That statistic compares vertical farms to inefficient open-field flood irrigation, ignoring modern drip irrigation—and more importantly, it overlooks the indirect water footprint of power generation. Thermal and hydroelectric stations powering those indoor lamps evaporate enormous volumes of water behind the scenes, shrinking the net hydrological advantage dramatically.",
        "Finally, can vertical farms actually feed a growing city? Look closely at what they grow: leafy greens, basil, and microgreens. Staple calorie crops that sustain human populations—wheat, rice, maize, and soybeans—require tall stalks, deep root zones, and intense solar energy. Growing a single loaf of bread's worth of wheat under artificial LEDs costs more than twenty dollars in electricity alone, meaning vertical farms can only supplement salads, never replace outdoor fields.",
      ],
    },
    modelAnswer:
      "Both the reading passage and the lecture evaluate vertical urban farming, but the professor casts serious doubt on all three advantages presented in the reading.\n\nFirst, although the reading argues that locating farms inside cities cuts carbon emissions by eliminating long-distance refrigerated trucking, the lecturer counters that indoor facilities substitute free sunlight with energy-intensive LED arrays and continuous climate control. Unless powered by a nearly carbon-free grid, the electricity required to illuminate and cool a windowless warehouse produces far higher emissions per kilogram of produce than transporting field-grown vegetables.\n\nSecond, while the reading highlights up to ninety-five percent lower water usage through closed hydroponic misting, the professor notes that this comparison ignores modern drip irrigation and omits indirect water losses. Generating the massive electricity needed to run indoor lights at thermal and hydroelectric plants consumes substantial water off-site, severely eroding the net water-saving claim.\n\nFinally, the reading maintains that year-round vertical warehouses can scale up to feed expanding cities reliably. In contrast, the lecturer points out that indoor farms are economically limited to low-calorie leafy greens and herbs. Core staple crops such as wheat, rice, and maize demand intense light and vertical space; cultivating enough wheat for one loaf of bread under LEDs would cost over twenty dollars in electricity alone, proving vertical farming cannot replace conventional farmland.",
    bandChecklist: [
      {
        en: "Contrast all THREE reading points directly against the lecturer's three specific rebuttals.",
        ar: "مقابلة النقاط الثلاث في القراءة مباشرةً بتفنيدات المحاضر الثلاثة المحددة.",
      },
      {
        en: "Stay completely objective—never insert your own personal opinion ('I think vertical farming is...').",
        ar: "الحفاظ على الموضوعية الكاملة وعدم إدخال رأيك الشخصي إطلاقاً.",
      },
      {
        en: "Include precise lecture details (LED/cooling electricity, indirect power-plant water use, $20 wheat loaf).",
        ar: "تضمين تفاصيل المحاضرة الدقيقة (كهرباء الإضاءة والتبريد، استهلاك المياه غير المباشر لمحطات الطاقة، وتكلفة رغيف القمح).",
      },
      {
        en: "Use strong contrast transitions ('although', 'counters that', 'in contrast', 'casts doubt on') and aim for 190–240 words.",
        ar: "توظيف روابط المقابلة الأكاديمية والكتابة ضمن نطاق ١٩٠ إلى ٢٤٠ كلمة.",
      },
    ],
  },
  {
    id: "toefl-w-task-2",
    label: {
      en: "Writing Task 2 · Academic Discussion",
      ar: "الكتابة — المهمة ٢ · النقاش الأكاديمي",
    },
    title: {
      en: "Online Forum: Should Universities Require a Financial Literacy Course?",
      ar: "منتدى جامعي: هل ينبغي إلزام طلبة الجامعات بمقرر الثقافة المالية؟",
    },
    recommendedMinutes: 10,
    minWords: 100,
    prompt:
      "Your professor is teaching a seminar on higher-education policy. Read the professor's prompt and the two student posts below, then write a post contributing your own clear perspective to the academic discussion. Write at least 100 words in 10 minutes.",
    discussionContext: {
      professorPrompt:
        "Many graduates enter the workforce carrying student loans, credit cards, and complex employment benefits, yet never receive formal instruction in budgeting, compound interest, or tax filing. Should universities require every undergraduate—regardless of major—to complete a compulsory financial literacy course before graduating? Why or why not?",
      studentPosts: [
        {
          name: "Claire",
          text: "I strongly believe universities should make financial literacy mandatory. Even high-achieving engineering or literature graduates frequently fall into preventable credit-card debt or miss out on retirement-matching contributions simply because nobody taught them the basics. A practical one-credit seminar on budgeting, taxes, and loan repayment would pay dividends for a lifetime and directly supports a university's mission to prepare students for independent adulthood.",
        },
        {
          name: "Marcus",
          text: "While financial knowledge is undeniably useful, adding another compulsory graduation requirement is the wrong approach. Degree plans in nursing, architecture, and computer science are already overcrowded, and forcing students to pay tuition for an extra mandatory course only increases the exact student-debt burden we want to reduce. Universities should instead offer free, optional workshops through student services.",
        },
      ],
    },
    modelAnswer:
      "I agree with Claire that practical money management is an essential life skill, yet Marcus raises a valid concern about inflating tuition costs and overcrowding already rigid degree plans. Rather than adding a full three-credit compulsory course, universities should require a concise, tuition-free pass/fail financial literacy module completed during orientation or sophomore year.\n\nOptional workshops—as Marcus suggests—rarely reach the students who need them most, because first-generation or financially stressed undergraduates often juggle part-time jobs and skip non-mandatory sessions. By embedding a short, zero-fee online-and-workshop module covering student-loan interest, emergency savings, and workplace tax deductions into existing graduation milestones, campuses can prevent costly early-career mistakes without delaying graduation or adding a single dollar of tuition debt.",
    bandChecklist: [
      {
        en: "Engage directly with at least one classmate's argument (Claire and/or Marcus) by name before adding a fresh angle.",
        ar: "التفاعل المباشر مع حجة أحد الزميلين (كلير أو ماركوس) بالاسم ثم إضافة زاوية جديدة أصلية.",
      },
      {
        en: "State a decisive thesis early and justify it with concrete reasoning rather than repeating a classmate's post.",
        ar: "طرح موقف حاسم مبكراً وتدعيمه بتعليل محدد دون تكرار مشاركة الزملاء.",
      },
      {
        en: "Write 120–160 polished words within 10 minutes with varied sentence structure and accurate grammar.",
        ar: "كتابة ١٢٠ إلى ١٦٠ كلمة متقنة خلال ١٠ دقائق مع تنوع التراكيب وسلامة القواعد.",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Exported Full Modern ETS TOEFL iBT Mock Exam                               */
/* -------------------------------------------------------------------------- */

export const TOEFL_IBT_MOCK: FullMockExam = {
  id: "toefl-ibt",
  title: {
    en: "TOEFL iBT Full Mock Exam (Modern Format)",
    ar: "الاختبار التجريبي الكامل — توفل آي بي تي (TOEFL iBT الحديث)",
  },
  subtitle: {
    en: "Complete ~2-hour experimental simulation modelled on the updated ETS TOEFL iBT: 2 Reading passages, 3 Listening items, 4 Speaking tasks & 2 Writing tasks (0–120 scale).",
    ar: "محاكاة تجريبية كاملة (~ساعتان) وفق نظام ETS TOEFL iBT الحديث: قطعتا قراءة، ٣ تسجيلات استماع، ٤ مهام محادثة، ومهمتا كتابة (مقياس ٠–١٢٠).",
  },
  durationLabel: {
    en: "1 hr 56 mins · Score 0–120",
    ar: "ساعة و٥٦ دقيقة · مقياس ٠–١٢٠",
  },
  scoreScaleLabel: {
    en: "Estimated TOEFL iBT Score (0 – 120)",
    ar: "درجة توفل التقديرية (٠ – ١٢٠)",
  },
  authenticNotice: {
    en: "Experimental practice simulation modelled on the modern ETS TOEFL iBT structure, question taxonomy, and task timers. Estimated 0–120 indicators are for self-study feedback only and are not official ETS scores.",
    ar: "محاكاة تدريبية تجريبية مصممة وفق هيكل وتصنيف أسئلة ومؤقتات اختبار ETS TOEFL iBT الحديث. التقديرات لأغراض التدريب الذاتي فقط وليست شهادة رسمية من ETS.",
  },
  reading: {
    durationMinutes: 35,
    instructions: {
      en: "Read two university-level academic passages and answer 16 questions spanning all official ETS categories: Factual, Negative Factual, Vocabulary, Inference, Rhetorical Purpose, Sentence Simplification, Insert Text, and Prose Summary.",
      ar: "اقرأ قطعتين أكاديميتين بمستوى جامعي وأجب عن ١٦ سؤالاً تغطي جميع أنماط ETS الرسمية بما فيها إدراج الجملة وملخص النص.",
    },
    passages: TOEFL_READING_PASSAGES,
  },
  listening: {
    durationMinutes: 36,
    instructions: {
      en: "Listen to one campus advising conversation and two academic lectures (Astronomy and Cognitive Psychology) and answer 15 questions testing main ideas, details, speaker function, and inference.",
      ar: "استمع إلى محادثة إرشاد جامعي ومحاضرتين أكاديميتين (علم الفلك وعلم النفس المعرفي) وأجب عن ١٥ سؤالاً في الفكرة الرئيسة والتفاصيل والاستنتاج.",
    },
    parts: TOEFL_LISTENING_PARTS,
  },
  speaking: {
    durationMinutes: 16,
    instructions: {
      en: "Complete all four official TOEFL iBT Speaking tasks with authentic prep and response timers: Task 1 Independent (15s/45s), Task 2 Campus Integrated (30s/60s), Task 3 Academic Concept (30s/60s), and Task 4 Lecture Summary (20s/60s).",
      ar: "أكمل مهام المحادثة الأربع الرسمية لتوفل بمؤقتات التحضير والتحدث المعتمدة: المستقلة (١٥ث/٤٥ث)، الموقف الجامعي (٣٠ث/٦٠ث)، المفهوم الأكاديمي (٣٠ث/٦٠ث)، وتلخيص المحاضرة (٢٠ث/٦٠ث).",
    },
    tasks: TOEFL_SPEAKING_TASKS,
  },
  writing: {
    durationMinutes: 29,
    instructions: {
      en: "Complete both modern TOEFL iBT Writing tasks: Task 1 Integrated Writing (20 min, 150+ words) contrasting a reading with a professor's lecture, and Task 2 Writing for an Academic Discussion (10 min, 100+ words).",
      ar: "أكمل مهمتي الكتابة الحديثتين في توفل: المهمة ١ الكتابة المتكاملة (٢٠ دقيقة، ١٥٠ كلمة فأكثر) للمقارنة بين القراءة والمحاضرة، والمهمة ٢ النقاش الأكاديمي (١٠ دقائق، ١٠٠ كلمة فأكثر).",
    },
    tasks: TOEFL_WRITING_TASKS,
  },
};
