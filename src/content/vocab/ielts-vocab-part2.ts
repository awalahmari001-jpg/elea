import type { IeltsVocabEntry } from "./vocab-types";

/**
 * IELTS Band 7+ Vocabulary — Part 2 (26 richly authored entries covering Topics 9–15).
 * Completes all 15 required IELTS topics and all 10 lexical categories with zero filler.
 */
export const IELTS_VOCAB_PART2: IeltsVocabEntry[] = [
  // ---- 9. GOVERNMENT & PUBLIC SERVICES (4 entries) ----
  {
    id: "ielts-allocate",
    word: "allocate",
    ipa: "/ˈæl.ə.keɪt/",
    partOfSpeech: "verb",
    category: "academic",
    topic: "government-services",
    bandTarget: "7.5+",
    definition:
      "To officially give a particular share of money, time, space, or resources to a specific purpose or group.",
    arabic: "يُخصّص (ميزانية أو موارد أو وقتًا لغرض محدد)",
    collocations: [
      "allocate funding to healthcare",
      "allocate public resources",
      "budget allocation",
      "allocate sufficient time",
    ],
    synonyms: ["assign", "earmark", "distribute", "allot"],
    antonyms: ["withhold", "misallocate"],
    wordFamily: ["allocate (v)", "allocation (n)", "reallocate (v)"],
    registerContrast: {
      everyday: "give money to schools and hospitals",
      academic: "allocate a larger proportion of public funding to primary healthcare",
      whenToUse: {
        en: "High-frequency academic verb for Task 1 budget charts and Task 2 government-spending essays.",
        ar: "فعل أكاديمي أساسي في مخططات الميزانية ومقالات الإنفاق الحكومي.",
      },
    },
    examples: [
      "Municipal councils should allocate a greater share of their budgets to reliable public transport.",
      "Transparent resource allocation strengthens public trust in local institutions.",
    ],
    ieltsSpeaking: {
      prompt: "Which public service deserves the highest share of government funding?",
      sample:
        "If I had to prioritise, I'd allocate the largest share to preventive healthcare and early childhood education.",
      tip: {
        en: "Use the exact pattern: 'allocate + resource + TO + purpose' (e.g., allocate funds to clinics).",
        ar: "استخدم الصيغة الدقيقة: allocate + المورد + to + الجهة.",
      },
    },
    ieltsWriting: {
      task: "Task 1",
      prompt:
        "The pie charts compare how a city council allocated its annual budget in 2010 and 2025.",
      sample:
        "In 2025, the council allocated 34% of its annual expenditure to renewable infrastructure, compared with just 12% in 2010.",
      tip: {
        en: "Replace repetitive 'spent money on' with 'allocated X% of its budget to' in Task 1.",
        ar: "استبدل تكرار spent money on بـ allocated X% of its budget to في المهمة الأولى.",
      },
    },
    commonMistake: {
      wrong: "Governments should allocate more money for building hospitals.",
      right: "Governments should allocate more funding to public hospitals.",
      why: {
        en: "While 'allocate money for' is sometimes heard, 'allocate funding to + noun' is the strongest academic collocation.",
        ar: "التلازم الأكاديمي الأقوى هو allocate funding to متبوعًا باسم.",
      },
    },
  },
  {
    id: "ielts-subsidise",
    word: "subsidise (subsidize)",
    ipa: "/ˈsʌb.sɪ.daɪz/",
    ukUsNote: {
      en: "UK spelling: subsidise; US spelling: subsidize. Both are accepted in IELTS if used consistently.",
      ar: "بالبريطانية subsidise وبالأمريكية subsidize، وكلاهما مقبول مع الالتزام بنمط واحد.",
    },
    partOfSpeech: "verb",
    category: "topic-specific",
    topic: "government-services",
    bandTarget: "7.5+",
    definition:
      "To pay part of the cost of a public service, product, or industry so that prices remain affordable.",
    arabic: "يدعم ماليًا (تغطي الدولة جزءًا من التكلفة لخفض السعر على المواطنين)",
    collocations: [
      "subsidise public transport",
      "government subsidies",
      "heavily subsidised healthcare",
      "renewable-energy subsidies",
    ],
    synonyms: ["fund partially", "underwrite", "financially support"],
    antonyms: ["tax", "privatise completely"],
    wordFamily: ["subsidise (v)", "subsidy (n, pl. subsidies)", "subsidised (adj)"],
    registerContrast: {
      everyday: "the government pays part of the ticket price",
      academic: "heavily subsidise commuter rail fares",
      whenToUse: {
        en: "Crucial for Government, Transport, Environment, and Education Task 2 prompts.",
        ar: "مفردة دقيقة ومؤثرة في مقالات الدعم الحكومي والنقل والطاقة.",
      },
    },
    examples: [
      "Subsidising off-peak rail tickets encourages commuters to leave private cars at home.",
      "Agricultural subsidies help stabilise staple food prices during poor harvests.",
    ],
    ieltsSpeaking: {
      prompt: "Should public transport be free for students?",
      sample:
        "Even if it isn't completely free, governments should definitely subsidise bus and metro passes for full-time students.",
      tip: {
        en: "Remember the plural noun spelling: 'subsidy' → 'subsidies'.",
        ar: "انتبه لصيغة الجمع: subsidy تصبح subsidies.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt:
        "Should governments subsidise arts and museums or focus strictly on essential services?",
      sample:
        "Modest state subsidies keep national museums accessible to low-income families rather than limiting culture to wealthy patrons.",
      tip: {
        en: "Pair with 'accessible' and 'affordable' to explain the social benefit clearly.",
        ar: "اربطها بـ accessible وaffordable لتوضيح الأثر الاجتماعي بوضوح.",
      },
    },
    commonMistake: {
      wrong: "The state should subsidy clean electricity.",
      right: "The state should subsidise clean electricity (or provide subsidies for it).",
      why: {
        en: "'Subsidy' is a noun; the verb is 'subsidise'.",
        ar: "كلمة subsidy اسم، أما الفعل فهو subsidise.",
      },
    },
  },
  {
    id: "ielts-bureaucracy",
    word: "bureaucracy",
    ipa: "/bjʊəˈrɒk.rə.si/",
    partOfSpeech: "noun (uncountable / countable)",
    category: "formal-informal",
    topic: "government-services",
    bandTarget: "7.5+",
    definition:
      "A complex system of official rules, paperwork, and administrative procedures that can slow down decisions.",
    arabic: "البيروقراطية (تعقيد الإجراءات الإدارية والورقية التي قد تُبطئ إنجاز المعاملات)",
    collocations: [
      "cut through bureaucracy",
      "excessive bureaucracy",
      "streamline bureaucracy",
      "bureaucratic red tape",
    ],
    synonyms: ["red tape (informal/idiomatic)", "administrative hurdles"],
    antonyms: ["streamlined governance", "digital efficiency"],
    wordFamily: ["bureaucracy (n)", "bureaucrat (n)", "bureaucratic (adj)"],
    registerContrast: {
      everyday: "endless paperwork and red tape",
      academic: "excessive administrative bureaucracy",
      whenToUse: {
        en: "Use 'red tape' in Speaking for natural idiom, and 'excessive bureaucracy' in Writing Task 2 for formal precision.",
        ar: "استخدم red tape في التحدث لإيقاع طبيعي، وexcessive bureaucracy في المقال الأكاديمي.",
      },
    },
    examples: [
      "Digital government portals have dramatically reduced bureaucracy for small-business registration.",
      "Excessive bureaucratic delays can deter international investors from launching local factories.",
    ],
    ieltsSpeaking: {
      prompt: "Have online government services improved daily life?",
      sample:
        "Enormously! Renewing a passport used to involve hours of bureaucracy, whereas now it takes five minutes online.",
      tip: {
        en: "Watch the tricky French-origin spelling in Writing: b-u-r-e-a-u-c-r-a-c-y.",
        ar: "تدرّب على إملائها بدقة: bureaucracy.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "How can governments encourage small businesses to grow?",
      sample:
        "Streamlining licensing bureaucracy allows entrepreneurs to focus on product quality rather than repetitive paperwork.",
      tip: {
        en: "Pair with 'streamline' or 'simplify' rather than informal 'kill'.",
        ar: "تتلازم أكاديميًا مع streamline أو simplify.",
      },
    },
    commonMistake: {
      wrong: "Too many bureaucracies slow down new startups.",
      right: "Excessive bureaucracy slows down new startups.",
      why: {
        en: "Use 'bureaucracy' as an uncountable noun with a singular verb when referring to administrative procedures in general.",
        ar: "تُستخدم كاسم غير معدود مع فعل مفرد عند الحديث عن الإجراءات الإدارية عمومًا.",
      },
    },
  },
  {
    id: "ielts-carry-out",
    word: "carry out",
    ipa: "/ˌkær.i ˈaʊt/",
    partOfSpeech: "phrasal verb",
    category: "phrasal-verbs",
    topic: "government-services",
    bandTarget: "7.0",
    definition: "To perform, complete, or execute a task, survey, inspection, or official policy.",
    arabic: "يُنفّذ / يُجري (دراسة أو فحصًا أو سياسة رسمية)",
    collocations: [
      "carry out a comprehensive survey",
      "carry out safety inspections",
      "carry out reforms",
      "carry out research",
    ],
    synonyms: ["conduct (formal)", "execute", "implement"],
    antonyms: ["abandon", "call off"],
    registerContrast: {
      everyday: "do a study / check buildings",
      academic: "carry out an independent audit / conduct longitudinal research",
      whenToUse: {
        en: "Accepted in both Speaking and formal Writing; pair with 'conduct' to avoid repeating either verb.",
        ar: "مقبولة في التحدث والكتابة الرسمية، وتنوّعها مع conduct يمنع التكرار.",
      },
    },
    examples: [
      "Independent engineers carry out annual safety inspections on every public bridge.",
      "The health ministry carried out a nationwide survey on childhood nutrition.",
    ],
    ieltsSpeaking: {
      prompt: "How can councils know what local residents truly need?",
      sample:
        "Before approving major projects, councils should carry out open public consultations and neighbourhood surveys.",
      tip: {
        en: "Do NOT say 'carry out a mistake'—use it only for planned tasks, research, duties, or policies.",
        ar: "تُستخدم للمهام والأبحاث والسياسات المخططة فقط، لا للأخطاء.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Should governments fund long-term scientific studies?",
      sample:
        "Public universities are uniquely positioned to carry out impartial research without short-term commercial pressure.",
      tip: {
        en: "Excellent replacement for weak verbs like 'do research' or 'make a survey'.",
        ar: "بديل ممتاز جدًا للعبارات الضعيفة مثل do research أو make a survey.",
      },
    },
    commonMistake: {
      wrong: "Researchers made an experiment to test air filters.",
      right: "Researchers carried out an experiment to evaluate air filters.",
      why: {
        en: "Experiments, surveys, and inspections are 'carried out' or 'conducted', never 'made'.",
        ar: "التجارب والاستبيانات تُجرى بـ carry out أو conduct وليس make.",
      },
    },
  },

  // ---- 10. CULTURE & TRADITIONS (4 entries) ----
  {
    id: "ielts-heritage",
    word: "cultural heritage",
    ipa: "/ˌkʌl.tʃər.əl ˈher.ɪ.tɪdʒ/",
    partOfSpeech: "noun phrase (uncountable)",
    category: "collocations",
    topic: "culture-traditions",
    bandTarget: "7.0",
    definition:
      "The historic buildings, crafts, music, customs, and languages passed down from earlier generations.",
    arabic: "التراث الثقافي (المعالم التاريخية والحرف والعادات المتوارثة عبر الأجيال)",
    collocations: [
      "preserve cultural heritage",
      "rich cultural heritage",
      "intangible cultural heritage",
      "world heritage site",
    ],
    synonyms: ["ancestral traditions", "historical legacy"],
    antonyms: ["cultural erasure"],
    registerContrast: {
      everyday: "old buildings and family traditions from the past",
      academic: "safeguarding tangible and intangible cultural heritage",
      whenToUse: {
        en: "Essential collocation for Culture, Tourism, Architecture, and Globalisation topics.",
        ar: "تلازم أساسي لموضوعات الثقافة والسياحة والعمارة والعولمة.",
      },
    },
    examples: [
      "Restoring historic mud-brick districts protects architectural heritage while attracting respectful visitors.",
      "Oral poetry and traditional hospitality are prized forms of intangible cultural heritage.",
    ],
    ieltsSpeaking: {
      prompt: "How do people in your country celebrate traditional heritage?",
      sample:
        "Annual heritage festivals showcase traditional calligraphy, regional cuisine, and folk music so younger generations stay connected to their roots.",
      tip: {
        en: "Use 'preserve' or 'safeguard' with 'heritage'—not 'save' or 'keep'.",
        ar: "استخدم preserve أو safeguard مع heritage لرفع الدقة المعجمية.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Should historic buildings be preserved or replaced with modern housing?",
      sample:
        "Preserving architectural heritage anchors civic identity, whereas adaptive reuse allows historic sites to serve modern communities.",
      tip: {
        en: "'Heritage' is uncountable—never write 'many cultural heritages'.",
        ar: "كلمة heritage غير معدودة ولا تُجمع.",
      },
    },
    commonMistake: {
      wrong: "Tourists love visiting our traditional heritages.",
      right: "Visitors appreciate our rich cultural heritage and historic landmarks.",
      why: {
        en: "'Heritage' is uncountable; use 'heritage sites' or 'landmarks' if you need a plural noun.",
        ar: "الكلمة غير معدودة؛ استخدم heritage sites أو landmarks للجمع.",
      },
    },
  },
  {
    id: "ielts-preserve",
    word: "preserve",
    ipa: "/prɪˈzɜːv/",
    partOfSpeech: "verb",
    category: "synonyms",
    topic: "culture-traditions",
    bandTarget: "7.0",
    definition:
      "To protect something valuable—such as a tradition, language, building, or habitat—so it remains in good condition and does not disappear.",
    arabic: "يحفظ / يصون (تراثًا أو لغة أو بيئة طبيعية من الاندثار)",
    collocations: [
      "preserve minority languages",
      "preserve historic architecture",
      "preserve natural habitats",
      "cultural preservation",
    ],
    synonyms: ["safeguard", "conserve (especially nature/energy)", "uphold"],
    antonyms: ["erode", "neglect", "demolish"],
    wordFamily: ["preserve (v)", "preservation (n)", "preservative (n)"],
    registerContrast: {
      everyday: "keep old customs alive",
      academic: "preserve endangered dialects and ancestral customs",
      whenToUse: {
        en: "Use 'preserve' for heritage, customs, and untouched areas; use 'conserve' for water, energy, and wildlife resources.",
        ar: "استخدم preserve للتراث والعادات، وconserve لترشيد المياه والطاقة والموارد.",
      },
    },
    examples: [
      "Recording elders' stories helps preserve endangered regional dialects for future scholars.",
      "Strict zoning rules preserve the skyline around ancient monuments.",
    ],
    ieltsSpeaking: {
      prompt: "Is it worth trying to save dying languages?",
      sample:
        "Absolutely—preserving minority languages protects unique ways of understanding nature, medicine, and local history.",
      tip: {
        en: "Do not confuse 'preserve' (protect from loss) with 'reserve' (book a seat/room in advance).",
        ar: "لا تخلط بين preserve (يحفظ ويصون) وreserve (يحجز موعدًا أو مقعدًا).",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Will globalisation inevitably cause traditional customs to disappear?",
      sample:
        "Modern digital archives paradoxically make it easier to document and preserve traditional crafts alongside global exchange.",
      tip: {
        en: "Combine 'document and preserve' for crisp academic precision.",
        ar: "الجمع بين document and preserve يمنح الجملة قوة أكاديمية عالية.",
      },
    },
    commonMistake: {
      wrong: "Governments must reserve ancient monuments for future generations.",
      right: "Governments must preserve ancient monuments for future generations.",
      why: {
        en: "'Reserve' means book or set aside; protecting heritage from decay is 'preserve'.",
        ar: "الحجز هو reserve، أما صون الآثار والتراث فهو preserve.",
      },
    },
  },
  {
    id: "ielts-pass-down",
    word: "pass down",
    ipa: "/ˌpɑːs ˈdaʊn/",
    partOfSpeech: "phrasal verb",
    category: "phrasal-verbs",
    topic: "culture-traditions",
    bandTarget: "7.0",
    definition: "To give knowledge, skills, stories, or traditions to younger generations.",
    arabic: "يُورّث / ينقل (عادات أو مهارات أو قصصًا من جيل إلى جيل)",
    collocations: [
      "passed down from generation to generation",
      "pass down traditional recipes",
      "pass down oral history",
    ],
    synonyms: ["hand down", "transmit across generations (formal)"],
    antonyms: ["die out", "fade away"],
    registerContrast: {
      everyday: "pass down family recipes",
      academic: "transmit cultural knowledge across generations",
      whenToUse: {
        en: "Ideal in IELTS Speaking Part 2/3 when describing family traditions, crafts, or festivals.",
        ar: "مثالية جدًا في اختبار التحدث عند وصف العادات العائلية والحرف والمناسبات.",
      },
    },
    examples: [
      "Traditional weaving techniques have been passed down through generations of artisans.",
      "Grandparents often pass down proverbs that reflect timeless community values.",
    ],
    ieltsSpeaking: {
      prompt: "Describe a traditional dish or custom from your culture.",
      sample:
        "My grandmother passed down a spiced rice recipe that our whole family still prepares together on Eid morning.",
      tip: {
        en: "Passive voice ('has been passed down for centuries') sounds effortlessly natural.",
        ar: "صيغة المبني للمجهول has been passed down تبدو طبيعية جدًا وطليقة.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Why do young people sometimes show less interest in traditional arts?",
      sample:
        "When artisanal skills are no longer passed down through apprenticeships, valuable local crafts risk dying out.",
      tip: {
        en: "Pair 'passed down' with 'die out' for cohesive phrasal-verb contrast.",
        ar: "الربط بين passed down وdie out يمنح الجملة تباينًا دلاليًا رائعًا.",
      },
    },
    commonMistake: {
      wrong: "Old stories are passed on down between generations.",
      right: "Traditional stories are passed down from generation to generation.",
      why: {
        en: "Choose either 'pass down' (to younger generations) or 'pass on' (to someone else)—never combine 'on down'.",
        ar: "اختر pass down أو pass on ولا تجمع بين on وdown معًا.",
      },
    },
  },
  {
    id: "ielts-stand-the-test-of-time",
    word: "stand the test of time",
    ipa: "/ˌstænd ðə ˌtest əv ˈtaɪm/",
    partOfSpeech: "verb phrase (idiom)",
    category: "idioms",
    topic: "culture-traditions",
    bandTarget: "7.5+",
    definition:
      "To remain respected, useful, relevant, or admired even after many years or centuries.",
    arabic: "يصمد أمام اختبار الزمن / يظل قيمًا ومؤثرًا عبر العصور",
    collocations: [
      "literature that stands the test of time",
      "customs that have stood the test of time",
      "architecture built to stand the test of time",
    ],
    synonyms: ["endure", "remain timeless"],
    antonyms: ["fall out of fashion", "become obsolete"],
    registerContrast: {
      everyday: "stay popular for a really long time",
      academic: "endure across generations / stand the test of time",
      whenToUse: {
        en: "Natural, refined idiom that works beautifully in IELTS Speaking and fits gracefully in Culture/Art Task 2 essays.",
        ar: "تعبير اصطلاحي راقٍ يليق بالتحدث ومقالات الثقافة والأدب والعمارة.",
      },
    },
    examples: [
      "Classical Arabic calligraphy has stood the test of time because artists continually adapt it to new media.",
      "Unlike passing fashion fads, well-crafted wooden furniture stands the test of time.",
    ],
    ieltsSpeaking: {
      prompt: "Why do people still read books written centuries ago?",
      sample:
        "Great novels stand the test of time because human emotions—ambition, loyalty, and regret—never really change.",
      tip: {
        en: "Check the irregular past participle: 'has STOOD the test of time'.",
        ar: "انتبه للتصريف الثالث الشاذ: has stood the test of time.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Is traditional architecture worth maintaining in rapidly growing cities?",
      sample:
        "Courtyard homes designed for desert airflow have stood the test of time and still inspire low-energy modern architecture.",
      tip: {
        en: "Keep idioms accurate word for word—never alter 'stand' to 'stay' or 'pass'.",
        ar: "حافظ على صياغة التعبير الثابت بدقة دون تغيير stand إلى stay.",
      },
    },
    commonMistake: {
      wrong: "These ancient traditions have stayed the test of time.",
      right: "These ancient traditions have stood the test of time.",
      why: {
        en: "The fixed idiom always uses the verb 'stand' (past/participle: 'stood').",
        ar: "الفعل الثابت في هذا التعبير هو stand (وتصريفه stood).",
      },
    },
  },

  // ---- 11. MEDIA & ADVERTISING (4 entries) ----
  {
    id: "ielts-misinformation",
    word: "misinformation",
    ipa: "/ˌmɪs.ɪn.fəˈmeɪ.ʃən/",
    partOfSpeech: "noun (uncountable)",
    category: "topic-specific",
    topic: "media-advertising",
    bandTarget: "7.5+",
    definition:
      "False or inaccurate information shared widely, especially online, whether intentionally or unintentionally.",
    arabic: "المعلومات المضللة أو غير الدقيقة (المنتشر تداولها عبر الإعلام والإنترنت)",
    collocations: [
      "combat online misinformation",
      "spread of misinformation",
      "curb misinformation",
      "media literacy against misinformation",
    ],
    synonyms: ["falsehoods", "disinformation (deliberately deceptive)"],
    antonyms: ["verified reporting", "factual journalism"],
    registerContrast: {
      everyday: "fake news online",
      academic: "the rapid proliferation of online misinformation",
      whenToUse: {
        en: "Much more academic and precise than 'fake news' in IELTS Writing Task 2.",
        ar: "أدق وأكثر أكاديمية بكثير من عبارة fake news في كتابة الآيلتس.",
      },
    },
    examples: [
      "Teaching media literacy in secondary schools equips teenagers to spot online misinformation.",
      "Unverified health claims can spread misinformation faster than official corrections.",
    ],
    ieltsSpeaking: {
      prompt: "Do you trust news shared on social media?",
      sample:
        "Not automatically—social platforms can amplify misinformation quickly, so I always cross-check stories with established outlets.",
      tip: {
        en: "Note the subtle Band 8 distinction: 'misinformation' can be accidental; 'disinformation' is deliberately fabricated.",
        ar: "فرق دقيق لدرجة ٨: misinformation قد تكون غير مقصودة، أما disinformation فمضللة عمدًا.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Should social media platforms be legally responsible for false content?",
      sample:
        "Requiring transparent fact-checking labels can curb the spread of harmful misinformation without censoring legitimate debate.",
      tip: {
        en: "Like 'information', 'misinformation' is strictly uncountable—never write 'a misinformation' or 'misinformations'.",
        ar: "مثل information، هي غير معدودة دائمًا بلا a ولا جمع.",
      },
    },
    commonMistake: {
      wrong: "Social platforms spread many misinformations every day.",
      right: "Social platforms can spread vast amounts of misinformation every day.",
      why: {
        en: "'Misinformation' is uncountable—use 'a great deal of' or 'vast amounts of', never 'many + -s'.",
        ar: "الكلمة غير معدودة فلا نستخدم معها many ولا نجمعها.",
      },
    },
  },
  {
    id: "ielts-persuasive",
    word: "persuasive",
    ipa: "/pəˈsweɪ.sɪv/",
    partOfSpeech: "adjective",
    category: "word-formation",
    topic: "media-advertising",
    bandTarget: "7.0",
    definition:
      "Making people want to believe an idea, buy a product, or take a particular action through compelling reasoning or emotion.",
    arabic: "مُقنِع / ذو قدرة عالية على التأثير والإقناع",
    collocations: [
      "persuasive advertising techniques",
      "a persuasive argument",
      "highly persuasive marketing",
    ],
    synonyms: ["compelling", "convincing", "influential"],
    antonyms: ["unconvincing", "weak"],
    wordFamily: ["persuade (v)", "persuasion (n)", "persuasive (adj)", "persuasively (adv)"],
    registerContrast: {
      everyday: "ads that make people want to buy things",
      academic: "highly persuasive digital advertising strategies",
      whenToUse: {
        en: "Versatile across Media, Advertising, Debate, and Workplace Communication.",
        ar: "متعددة الاستخدام في الإعلام والإعلان والحجاج والعمل.",
      },
    },
    examples: [
      "Targeted video adverts use persuasive storytelling rather than simple price comparisons.",
      "She presented a persuasive case for limiting junk-food sponsorships during youth sports.",
    ],
    ieltsSpeaking: {
      prompt: "What makes an advertisement effective?",
      sample:
        "The most persuasive adverts tell a relatable human story instead of shouting discounts at the viewer.",
      tip: {
        en: "Pair with 'compelling' in essays to avoid repeating 'persuasive' twice.",
        ar: "نوّع بينها وبين compelling في المقال لتجنب التكرار.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Does advertising encourage people to buy things they do not need?",
      sample:
        "Because personalised algorithms deliver highly persuasive campaigns, impulse purchasing has surged among younger consumers.",
      tip: {
        en: "Use 'persuade someone to do something' for the verb form accurately.",
        ar: "الفعل الصحيح يتبع الصيغة: persuade someone to do something.",
      },
    },
    commonMistake: {
      wrong: "Adverts persuasive consumers to buy expensive brands.",
      right:
        "Persuasive adverts encourage consumers to buy luxury brands (or Adverts persuade consumers to...).",
      why: {
        en: "'Persuasive' is an adjective; use 'persuade' as the main verb.",
        ar: "كلمة persuasive صفة، أما الفعل فهو persuade.",
      },
    },
  },
  {
    id: "ielts-sensationalism",
    word: "sensationalism",
    ipa: "/senˈseɪ.ʃən.əl.ɪ.zəm/",
    partOfSpeech: "noun (uncountable)",
    category: "topic-specific",
    topic: "media-advertising",
    bandTarget: "8.0+",
    definition:
      "The practice of presenting news stories in an exaggerated, shocking way to attract clicks or viewers rather than inform accurately.",
    arabic: "الإثارة الإعلامية المبالغ فيها (تضخيم الأخبار لجذب المشاهدات بدل الدقة)",
    collocations: [
      "media sensationalism",
      "prioritise sensationalism over accuracy",
      "sensationalist headlines",
    ],
    synonyms: ["exaggerated reporting", "clickbait journalism (informal)"],
    antonyms: ["balanced journalism", "objective reporting"],
    wordFamily: ["sensational (adj)", "sensationalist (adj)", "sensationalism (n)"],
    registerContrast: {
      everyday: "clickbait headlines that exaggerate everything",
      academic: "editorial sensationalism driven by advertising revenue",
      whenToUse: {
        en: "Spot-on Band 8 vocabulary for Media, Journalism, and Social Platforms essays.",
        ar: "مفردة دقيقة لمستوى ٨ في مقالات الإعلام والصحافة.",
      },
    },
    examples: [
      "Competition for online clicks has pushed some news outlets towards sensationalism over verified context.",
      "Sensationalist headlines about medical studies often alarm readers unnecessarily.",
    ],
    ieltsSpeaking: {
      prompt: "Why do news reports often focus more on bad news than good news?",
      sample:
        "Sadly, dramatic stories get more clicks, so commercial channels often lean into sensationalism to boost ratings.",
      tip: {
        en: "Distinguish 'sensationalist' (exaggerated for shock) from 'sensational' (amazing/wonderful in casual speech).",
        ar: "فرّق بين sensationalist (مُثير ومبالِغ لجذب الانتباه) وsensational (مذهل).",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Has 24-hour news improved public understanding of world events?",
      sample:
        "Constant breaking-news cycles can fuel sensationalism, leaving little time for thorough investigative journalism.",
      tip: {
        en: "Contrast 'sensationalism' directly with 'investigative journalism' or 'impartial reporting'.",
        ar: "المقابلة بين sensationalism وinvestigative journalism تصنع جملة أكاديمية رفيعة.",
      },
    },
    commonMistake: {
      wrong: "Sensationalism headlines make people anxious.",
      right: "Sensationalist headlines make readers unnecessarily anxious.",
      why: {
        en: "Use the adjective 'sensationalist' before the noun 'headlines', not the noun 'sensationalism'.",
        ar: "نستخدم الصفة sensationalist قبل الاسم headlines وليس الاسم sensationalism.",
      },
    },
  },
  {
    id: "ielts-imply-infer",
    word: "imply vs. infer",
    ipa: "/ɪmˈplaɪ/ · /ɪnˈfɜːr/",
    partOfSpeech: "verbs (commonly confused)",
    category: "commonly-confused",
    topic: "media-advertising",
    bandTarget: "7.5+",
    definition:
      "A speaker or writer 'implies' (suggests indirectly); a listener or reader 'infers' (draws a conclusion from clues).",
    arabic: "الفرق بين imply (يُلمّح الكاتب أو المتحدث) وinfer (يستنتج القارئ أو المستمع)",
    collocations: [
      "the advert implies that",
      "readers can infer from the tone",
      "strongly imply",
      "draw an inference",
    ],
    synonyms: ["suggest / insinuate (imply)", "deduce / conclude (infer)"],
    antonyms: ["state explicitly"],
    wordFamily: ["imply (v)", "implication (n)", "infer (v)", "inference (n)"],
    registerContrast: {
      everyday: "hint at something / figure out what they mean",
      academic: "the report implies a link / readers may reasonably infer",
      whenToUse: {
        en: "Crucial for IELTS Reading comprehension discussions and high-band Writing arguments.",
        ar: "أساسية جدًا في أسئلة القراءة والاستنتاج وفي الكتابة الأكاديمية الدقيقة.",
      },
    },
    examples: [
      "Luxury perfume adverts subtly imply that buying the product guarantees social admiration.",
      "From the sharp drop in print sales, analysts inferred that readers had migrated to mobile apps.",
    ],
    ieltsSpeaking: {
      prompt: "How do advertisements influence consumers without making direct promises?",
      sample:
        "They rarely promise happiness directly; instead, they imply it through glamorous imagery and upbeat music.",
      tip: {
        en: "Memory cue: Writer/Speaker IMPLIES (sends the hint); Reader/Listener INFERS (receives and concludes).",
        ar: "تذكّر: الكاتب يُلمّح (imply) والقارئ يستنتج (infer).",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Does correlation in media statistics always prove cause and effect?",
      sample:
        "A statistical link may imply a relationship, yet researchers should not infer causation without controlled evidence.",
      tip: {
        en: "Using 'imply' and 'infer' accurately in the same analytical sentence signals true Band 8 lexical control.",
        ar: "استخدام الفعلين بدقة في سياق تحليلي يعكس تحكمًا لغويًا عالي المستوى.",
      },
    },
    commonMistake: {
      wrong: "The journalist inferred that the minister would resign.",
      right:
        "The journalist implied that the minister might resign (and readers inferred it from the article).",
      why: {
        en: "When the author/speaker hints at something, use 'imply'; 'infer' is what the audience concludes.",
        ar: "الكاتب أو الصحفي يُلمّح بـ imply، أما الجمهور فيستنتج بـ infer.",
      },
    },
  },

  // ---- 12. SCIENCE & INNOVATION (3 entries) ----
  {
    id: "ielts-breakthrough",
    word: "breakthrough",
    ipa: "/ˈbreɪk.θruː/",
    partOfSpeech: "noun (countable)",
    category: "high-frequency",
    topic: "science-innovation",
    bandTarget: "7.0",
    definition:
      "An important, sudden discovery or technical development that solves a long-standing difficulty.",
    arabic: "اختراق علمي / إنجاز أو اكتشاف فارق يحل عقبة طويلة",
    collocations: [
      "a major medical breakthrough",
      "achieve a breakthrough",
      "scientific breakthrough",
      "pave the way for a breakthrough",
    ],
    synonyms: ["milestone", "landmark discovery", "leap forward"],
    antonyms: ["setback", "dead end"],
    registerContrast: {
      everyday: "a huge new discovery in science",
      academic: "a major breakthrough in clean-battery storage",
      whenToUse: {
        en: "Natural and authoritative in both IELTS Speaking and Writing for Medicine, Energy, and Space.",
        ar: "طبيعية وموثوقة في التحدث والكتابة لموضوعات الطب والطاقة والفضاء.",
      },
    },
    examples: [
      "Recent breakthroughs in battery chemistry have extended electric-vehicle driving range dramatically.",
      "Years of quiet laboratory trials usually precede any headline-making medical breakthrough.",
    ],
    ieltsSpeaking: {
      prompt: "What scientific invention has benefited humanity the most?",
      sample:
        "Antibiotics were a life-saving breakthrough—before them, even a minor infection could prove fatal.",
      tip: {
        en: "Collocates with 'make a breakthrough' or 'achieve a breakthrough'—never 'do a breakthrough'.",
        ar: "تتلازم مع make أو achieve: achieve a breakthrough.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Should public funds support pure science even without immediate profit?",
      sample:
        "Many transformative breakthroughs—from MRI scanners to the internet—emerged from curiosity-driven public research.",
      tip: {
        en: "Write 'breakthrough' as ONE word (noun); 'break through' (two words) is the phrasal verb.",
        ar: "الاسم كلمة واحدة breakthrough، أما الفعل المركب فكلمتان break through.",
      },
    },
    commonMistake: {
      wrong: "Scientists did an amazing breakthrough in solar panels.",
      right: "Scientists achieved a major breakthrough in solar-panel efficiency.",
      why: {
        en: "Use 'achieve' or 'make' (not 'do') before 'a breakthrough'.",
        ar: "نستخدم achieve أو make مع breakthrough وليس do.",
      },
    },
  },
  {
    id: "ielts-empirical",
    word: "empirical evidence",
    ipa: "/ɪmˈpɪr.ɪ.kəl ˈev.ɪ.dəns/",
    partOfSpeech: "noun phrase (uncountable)",
    category: "academic",
    topic: "science-innovation",
    bandTarget: "8.0+",
    definition:
      "Information acquired through real observation, measurement, or experiment rather than theory or guesswork alone.",
    arabic: "أدلة تجريبية مبنية على الملاحظة والقياس الواقعي لا التخمين النظري",
    collocations: [
      "backed by empirical evidence",
      "empirical research",
      "compelling empirical data",
    ],
    synonyms: ["observational proof", "experimental data"],
    antonyms: ["anecdotal claims", "unfounded speculation"],
    wordFamily: ["empirical (adj)", "empirically (adv)"],
    registerContrast: {
      everyday: "real proof from actual tests",
      academic: "supported by robust empirical evidence",
      whenToUse: {
        en: "High-band academic collocation for Science, Health, Education, and Policy arguments.",
        ar: "تلازم أكاديمي رفيع لموضوعات العلوم والسياسات العامة والتعليم.",
      },
    },
    examples: [
      "Public health policies should be guided by empirical evidence rather than viral online opinions.",
      "Empirical studies consistently show that spaced repetition outperforms last-minute cramming.",
    ],
    ieltsSpeaking: {
      prompt: "How should governments decide whether a new school policy works?",
      sample:
        "They should run small pilot schemes first and collect real empirical evidence before rolling it out nationwide.",
      tip: {
        en: "Remember: 'evidence' is ALWAYS uncountable—never write 'empirical evidences'.",
        ar: "كلمة evidence غير معدودة أبدًا فلا تكتب evidences.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Some people rely on traditional remedies while others prefer modern medicine.",
      sample:
        "Modern pharmaceuticals undergo rigorous clinical trials, providing transparent empirical evidence regarding dosage and safety.",
      tip: {
        en: "Pair with 'rigorous' or 'compelling' for authentic academic tone.",
        ar: "تتلازم بقوة مع rigorous أو compelling.",
      },
    },
    commonMistake: {
      wrong: "There are many empirical evidences supporting solar energy.",
      right: "There is compelling empirical evidence supporting solar investment.",
      why: {
        en: "'Evidence' is uncountable and takes a singular verb ('There is...').",
        ar: "الاسم غير معدود ويأخذ الفعل المفرد There is.",
      },
    },
  },
  {
    id: "ielts-ethical-implications",
    word: "ethical implications",
    ipa: "/ˈeθ.ɪ.kəl ˌɪm.plɪˈkeɪ.ʃənz/",
    partOfSpeech: "noun phrase (plural)",
    category: "collocations",
    topic: "science-innovation",
    bandTarget: "7.5+",
    definition:
      "The moral consequences or questions raised by a scientific discovery, technology, or policy decision.",
    arabic: "التداعيات والأبعاد الأخلاقية (لابتكار علمي أو تقنية أو قرار)",
    collocations: [
      "raise serious ethical implications",
      "consider the ethical implications of AI",
      "far-reaching ethical implications",
    ],
    synonyms: ["moral consequences", "ethical dilemmas"],
    antonyms: ["purely technical considerations"],
    wordFamily: ["ethics (n)", "ethical (adj)", "unethical (adj)", "ethically (adv)"],
    registerContrast: {
      everyday: "whether a new invention is right or wrong morally",
      academic: "the far-reaching ethical implications of genetic engineering",
      whenToUse: {
        en: "Invaluable for AI, Genetics, Surveillance, and Animal-Testing IELTS prompts.",
        ar: "قوية جدًا في موضوعات الذكاء الاصطناعي والهندسة الوراثية والخصوصية.",
      },
    },
    examples: [
      "Gene-editing tools offer hope for inherited diseases yet raise profound ethical implications.",
      "Universities now embed courses on the ethical implications of artificial intelligence into engineering degrees.",
    ],
    ieltsSpeaking: {
      prompt: "Should there be limits on what scientists are allowed to research?",
      sample:
        "Scientific curiosity is vital, yet independent oversight is necessary whenever a field carries serious ethical implications.",
      tip: {
        en: "Natural verb collocations: 'raise ethical implications', 'address ethical implications'.",
        ar: "الأفعال الطبيعية معها: raise أو address.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Do the benefits of facial-recognition cameras outweigh privacy concerns?",
      sample:
        "Before deploying biometric surveillance widely, lawmakers must thoroughly address its ethical implications for personal privacy.",
      tip: {
        en: "Distinguish 'implications' (likely future consequences) from 'applications' (practical uses).",
        ar: "فرّق بين implications (التداعيات والآثار) وapplications (التطبيقات العملية).",
      },
    },
    commonMistake: {
      wrong: "Cloning brings many ethical applications for society.",
      right: "Cloning raises serious ethical implications for society.",
      why: {
        en: "Moral consequences are 'implications', not 'applications'.",
        ar: "التداعيات الأخلاقية هي implications وليس applications.",
      },
    },
  },

  // ---- 13. TRANSPORT & URBANISATION (3 entries) ----
  {
    id: "ielts-congestion",
    word: "traffic congestion",
    ipa: "/ˈtræf.ɪk kənˈdʒes.tʃən/",
    partOfSpeech: "noun phrase (uncountable)",
    category: "collocations",
    topic: "transport-urbanisation",
    bandTarget: "7.0",
    definition:
      "A state in which roads are so crowded with vehicles that movement becomes extremely slow or stops.",
    arabic: "الازدحام المروري الخانق",
    collocations: [
      "ease traffic congestion",
      "peak-hour congestion",
      "congestion charge",
      "chronic urban congestion",
    ],
    synonyms: ["gridlock (severe)", "bottlenecks"],
    antonyms: ["smooth traffic flow"],
    wordFamily: ["congested (adj)", "congestion (n)"],
    registerContrast: {
      everyday: "bad traffic jams",
      academic: "chronic peak-hour traffic congestion",
      whenToUse: {
        en: "More formal than 'traffic jams' in Writing Task 2; 'traffic jams' remains natural in casual Speaking.",
        ar: "أكثر رسمية من traffic jams في الكتابة، بينما تظل traffic jams طبيعية في التحدث.",
      },
    },
    examples: [
      "Expanding metro lines is generally more effective at easing traffic congestion than widening urban motorways.",
      "London's congestion charge cut central-city emissions while funding cleaner buses.",
    ],
    ieltsSpeaking: {
      prompt: "How could transport in your city be improved?",
      sample:
        "Connecting residential suburbs directly to metro stations would dramatically ease morning traffic congestion.",
      tip: {
        en: "Collocates sharply with 'ease', 'alleviate', 'curb', or 'tackle'.",
        ar: "تتلازم بدقة مع الأفعال ease وalleviate وtackle.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Is raising fuel taxes the best way to solve traffic problems?",
      sample:
        "Higher fuel duties alone rarely resolve traffic congestion unless commuters have a punctual, affordable transit alternative.",
      tip: {
        en: "'Congestion' is uncountable—never write 'a traffic congestion' or 'congestions'.",
        ar: "كلمة congestion غير معدودة ولا تُجمع.",
      },
    },
    commonMistake: {
      wrong: "We face many traffic congestions every morning.",
      right: "Commuters face severe traffic congestion every morning.",
      why: {
        en: "'Congestion' is uncountable—use 'severe' or 'heavy' instead of 'many'.",
        ar: "نستخدم severe أو heavy مع الاسم غير المعدود congestion بدل many.",
      },
    },
  },
  {
    id: "ielts-urban-sprawl",
    word: "urban sprawl",
    ipa: "/ˌɜː.bən ˈsprɔːl/",
    partOfSpeech: "noun phrase (uncountable)",
    category: "topic-specific",
    topic: "transport-urbanisation",
    bandTarget: "7.5+",
    definition:
      "The uncontrolled, low-density outward expansion of cities into surrounding countryside or agricultural land.",
    arabic: "الزحف العمراني العشوائي (امتداد المدن على حساب الأراضي الزراعية والريفية)",
    collocations: ["curb urban sprawl", "unchecked urban sprawl", "contribute to urban sprawl"],
    synonyms: ["unplanned suburban expansion"],
    antonyms: ["compact urban planning", "high-density walkable cities"],
    registerContrast: {
      everyday: "cities spreading out into the countryside",
      academic: "unchecked urban sprawl encroaching on arable land",
      whenToUse: {
        en: "Standout topic phrase for Housing, Cities, Transport, and Environment essays.",
        ar: "مصطلح موضوعي مميز جدًا في مقالات المدن والإسكان والنقل.",
      },
    },
    examples: [
      "Unchecked urban sprawl lengthens daily commutes and increases reliance on private cars.",
      "Green-belt regulations were introduced to curb urban sprawl and protect farmland.",
    ],
    ieltsSpeaking: {
      prompt: "How has your hometown changed over the last ten years?",
      sample:
        "It has expanded rapidly outwards—new suburbs are convenient for families, yet urban sprawl has made driving everywhere unavoidable.",
      tip: {
        en: "Use 'curb' or 'contain' with 'urban sprawl' to show natural policy vocabulary.",
        ar: "استخدم curb أو contain مع urban sprawl.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Is it better to build high-rise apartments or expand suburbs outwards?",
      sample:
        "Thoughtfully designed mid-rise neighbourhoods prevent urban sprawl while keeping schools, clinics, and transit within walking distance.",
      tip: {
        en: "Explain a concrete consequence (longer commutes, higher infrastructure costs) right after using the term.",
        ar: "اشرح أثرًا ملموسًا مباشرة بعد المصطلح مثل طول التنقل اليومي أو تكلفة البنية التحتية.",
      },
    },
    commonMistake: {
      wrong: "Urban sprawl makes cities to expand into farms.",
      right: "Urban sprawl pushes cities outwards onto fertile farmland.",
      why: {
        en: "Never use 'make + object + to + verb'; use 'pushes', 'leads to', or 'encroaches on'.",
        ar: "لا يُستخدم to بعد make؛ استخدم أفعالًا أدق مثل pushes أو encroaches on.",
      },
    },
  },
  {
    id: "ielts-infrastructure",
    word: "infrastructure",
    ipa: "/ˈɪn.frə.strʌk.tʃər/",
    partOfSpeech: "noun (uncountable)",
    category: "high-frequency",
    topic: "transport-urbanisation",
    bandTarget: "7.0",
    definition:
      "The essential physical and digital systems a country or city needs to operate—such as roads, railways, power grids, water networks, and broadband.",
    arabic: "البنية التحتية (الطرق والقطارات وشبكات الكهرباء والمياه والإنترنت)",
    collocations: [
      "upgrade ageing infrastructure",
      "transport infrastructure",
      "digital infrastructure",
      "strain on local infrastructure",
    ],
    synonyms: ["public utilities and networks", "foundational facilities"],
    antonyms: ["underinvestment"],
    registerContrast: {
      everyday: "roads, trains, bridges, and internet networks",
      academic: "modernising transport and digital infrastructure",
      whenToUse: {
        en: "One of the highest-utility words across IELTS Transport, Tourism, Economy, and Urbanisation.",
        ar: "من أكثر الكلمات فائدة في موضوعات النقل والسياحة والاقتصاد والتحضر.",
      },
    },
    examples: [
      "Rapid population growth places immense strain on water and transport infrastructure.",
      "Investing in high-speed digital infrastructure enables rural entrepreneurs to compete globally.",
    ],
    ieltsSpeaking: {
      prompt: "What should a growing city invest in first?",
      sample:
        "Reliable public transport and clean water infrastructure have to come first—without them, everything else struggles.",
      tip: {
        en: "Remember 'infrastructure' is uncountable—NEVER add '-s' ('infrastructures' is a classic Band 6 slip).",
        ar: "انتبه: الكلمة غير معدودة ولا تُجمع أبدًا (لا تقل infrastructures).",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Does mass tourism help or harm developing regions?",
      sample:
        "Tourism revenue can finance much-needed airport and road infrastructure, provided visitor numbers do not overwhelm local utilities.",
      tip: {
        en: "Strong collocations: 'put strain on infrastructure', 'invest in infrastructure', 'ageing infrastructure'.",
        ar: "تلازمات قوية: put strain on infrastructure وupgrade ageing infrastructure.",
      },
    },
    commonMistake: {
      wrong: "The city built many new infrastructures last year.",
      right: "The city invested heavily in new transport infrastructure last year.",
      why: {
        en: "'Infrastructure' is uncountable—never precede it with 'many' or pluralise it.",
        ar: "الاسم غير معدود فلا يسبقه many ولا يُجمع.",
      },
    },
  },

  // ---- 14. FAMILY & RELATIONSHIPS (2 entries) ----
  {
    id: "ielts-upbringing",
    word: "upbringing",
    ipa: "/ˈʌp.brɪŋ.ɪŋ/",
    partOfSpeech: "noun (singular / uncountable)",
    category: "formal-informal",
    topic: "family-relationships",
    bandTarget: "7.5+",
    definition: "The way a child is cared for, guided, and taught values while growing up.",
    arabic: "التربية والتنشئة الأسرية خلال الطفولة",
    collocations: [
      "a supportive upbringing",
      "a strict upbringing",
      "shape a child's upbringing",
      "moral upbringing",
    ],
    synonyms: ["child-rearing (formal)", "early family environment"],
    antonyms: ["neglect"],
    wordFamily: ["bring up (phrasal verb)", "upbringing (n)"],
    registerContrast: {
      everyday: "how my parents raised me",
      academic: "a child's early upbringing and family environment",
      whenToUse: {
        en: "Works naturally in both Speaking Part 2/3 ('I had a warm, supportive upbringing') and Writing Task 2 ('nature vs. nurture').",
        ar: "مناسبة جدًا للتحدث والكتابة عند الحديث عن دور الأسرة والتربية.",
      },
    },
    examples: [
      "Psychologists agree that a warm, consistent upbringing fosters emotional resilience in adulthood.",
      "Although genetics play a role, a child's upbringing strongly shapes their attitude towards learning.",
    ],
    ieltsSpeaking: {
      prompt: "Who had the greatest influence on you while growing up?",
      sample:
        "Definitely my mother—she gave us a calm, encouraging upbringing that made curiosity feel safe.",
      tip: {
        en: "Pair the noun 'upbringing' with the phrasal verb 'bring up' ('My grandparents helped bring me up').",
        ar: "اربط الاسم upbringing بالفعل المركب bring up لتنويع سلس.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Are parents or schools more responsible for teaching children good behaviour?",
      sample:
        "While schools reinforce civic norms, ethical habits are forged primarily through a child's upbringing at home.",
      tip: {
        en: "Use 'a + adjective + upbringing' (singular)—never plural 'upbringings' for general childhood.",
        ar: "استخدمها بصيغة المفرد الموصوف: a supportive upbringing.",
      },
    },
    commonMistake: {
      wrong: "Good parents give strong upbringings to their children.",
      right: "Supportive parents provide a stable, loving upbringing for their children.",
      why: {
        en: "Use singular 'a ... upbringing' paired with 'provide' or 'have'.",
        ar: "تُستخدم مفردة a stable upbringing مع الفعل provide أو have.",
      },
    },
  },
  {
    id: "ielts-generation-gap",
    word: "generation gap",
    ipa: "/ˌdʒen.əˈreɪ.ʃən ɡæp/",
    partOfSpeech: "noun phrase (countable)",
    category: "high-frequency",
    topic: "family-relationships",
    bandTarget: "7.0",
    definition:
      "Differences in values, habits, communication styles, and opinions between older and younger generations.",
    arabic: "الفجوة بين الأجيال (اختلاف القيم والعادات وأسلوب التواصل بين الكبار والشباب)",
    collocations: [
      "bridge the generation gap",
      "widen the generation gap",
      "intergenerational dialogue",
    ],
    synonyms: ["intergenerational divide (more formal)"],
    antonyms: ["intergenerational harmony"],
    registerContrast: {
      everyday: "parents and teenagers not understanding each other",
      academic: "bridging the intergenerational divide through shared dialogue",
      whenToUse: {
        en: "Natural in Speaking and Writing; swap in 'intergenerational divide' once in Task 2 for Band 7.5+ range.",
        ar: "طبيعية في التحدث والكتابة، وintergenerational divide بديل أكاديمي رفيع في المقال.",
      },
    },
    examples: [
      "Rapid shifts in digital communication have widened the generation gap in some households.",
      "Cooking traditional meals together is a simple way to bridge the generation gap.",
    ],
    ieltsSpeaking: {
      prompt: "Do young people and older people have different views on work today?",
      sample:
        "There is a slight generation gap: older workers often prize long-term job stability, whereas younger graduates look closely at flexibility.",
      tip: {
        en: "Use 'bridge the generation gap' (reduce it) and 'widen the generation gap' (increase it).",
        ar: "تتلازم بدقة مع bridge (يُردم الفجوة) وwiden (يُوسّع الفجوة).",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Why do extended families live together less often today?",
      sample:
        "Urban migration and a widening generation gap over lifestyle expectations have made nuclear households far more common.",
      tip: {
        en: "Pair naturally with 'nuclear family' vs. 'extended family' in Family essays.",
        ar: "اربطها بمصطلحي nuclear family وextended family لعمق موضوعي ممتاز.",
      },
    },
    commonMistake: {
      wrong: "Technology makes a big generational gapness between families.",
      right: "Rapid technological change can widen the generation gap within families.",
      why: {
        en: "The standard collocation is 'the generation gap' (never 'gapness').",
        ar: "التعبير الصحيح الثابت هو the generation gap.",
      },
    },
  },

  // ---- 15. TOURISM & TRAVEL (3 entries) ----
  {
    id: "ielts-ecotourism",
    word: "ecotourism",
    ipa: "/ˈiː.kəʊˌtʊə.rɪ.zəm/",
    partOfSpeech: "noun (uncountable)",
    category: "topic-specific",
    topic: "tourism-travel",
    bandTarget: "7.5+",
    definition:
      "Responsible travel to natural areas that conserves wildlife and habitats while directly benefiting local communities.",
    arabic: "السياحة البيئية المسؤولة (التي تحمي الطبيعة وتدعم المجتمع المحلي)",
    collocations: [
      "promote sustainable ecotourism",
      "ecotourism initiatives",
      "community-led ecotourism",
    ],
    synonyms: ["sustainable tourism", "responsible travel"],
    antonyms: ["mass tourism", "overtourism"],
    registerContrast: {
      everyday: "nature trips that don't harm the environment",
      academic: "community-led ecotourism that funds conservation",
      whenToUse: {
        en: "Strong contrast term against 'mass tourism' or 'overtourism' in IELTS Tourism & Environment tasks.",
        ar: "مصطلح قوي للمقارنة مع السياحة الجماعية الكثيفة (mass tourism / overtourism).",
      },
    },
    examples: [
      "Well-regulated ecotourism generates conservation funding while employing local wildlife guides.",
      "Unlike mass resort developments, ecotourism limits visitor numbers to protect fragile coral reefs.",
    ],
    ieltsSpeaking: {
      prompt: "What type of tourism would you like to see grow in your country?",
      sample:
        "I'd love to see more desert and coastal ecotourism—it showcases natural beauty while preserving wildlife for future generations.",
      tip: {
        en: "Contrast 'ecotourism' with 'overtourism' to demonstrate balanced Band 7.5+ topic knowledge.",
        ar: "المقارنة بين ecotourism وovertourism تُظهر وعيًا موضوعيًا متقدمًا.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Can tourism protect the environment, or does it always cause damage?",
      sample:
        "When carefully capped and locally managed, ecotourism transforms natural conservation into an economic incentive for rural residents.",
      tip: {
        en: "'Ecotourism' is uncountable—never write 'an ecotourism' or 'ecotourisms'.",
        ar: "الاسم غير معدود دائمًا دون a أو جمع.",
      },
    },
    commonMistake: {
      wrong: "Governments should encourage an ecotourism in national parks.",
      right: "Governments should promote regulated ecotourism in national parks.",
      why: {
        en: "Drop the article 'a/an' before uncountable 'ecotourism'.",
        ar: "لا نضع أداة التنكير قبل الاسم غير المعدود ecotourism.",
      },
    },
  },
  {
    id: "ielts-broaden-horizons",
    word: "broaden one's horizons",
    ipa: "/ˌbrɔː.dən wʌnz həˈraɪ.zənz/",
    partOfSpeech: "verb phrase (idiom)",
    category: "idioms",
    topic: "tourism-travel",
    bandTarget: "7.0",
    definition:
      "To expand your understanding of the world, cultures, and ideas through new experiences such as travel or study.",
    arabic: "يُوسّع الآفاق والمدارك (عبر السفر أو الاحتكاك بثقافات وخبرات جديدة)",
    collocations: [
      "travel broadens your horizons",
      "broaden students' cultural horizons",
      "broaden one's perspective",
    ],
    synonyms: ["expand one's worldview", "widen one's perspective"],
    antonyms: ["remain narrow-minded"],
    registerContrast: {
      everyday: "see new places and learn how other people live",
      academic: "broaden cultural horizons / cultivate cross-cultural awareness",
      whenToUse: {
        en: "Warm and natural in Speaking; in Writing Task 2, pair it with concrete specifics ('challenges stereotypes') so it never feels cliché.",
        ar: "طبيعية في التحدث، وفي الكتابة اربطها بأثر ملموس مثل كسر الصور النمطية.",
      },
    },
    examples: [
      "Studying abroad for a semester broadens students' horizons and builds remarkable self-reliance.",
      "Even short cultural exchanges can broaden young travellers' horizons by challenging stereotypes.",
    ],
    ieltsSpeaking: {
      prompt: "Why do so many young people take a gap year to travel?",
      sample:
        "Living in an unfamiliar culture really broadens your horizons—you learn problem-solving and empathy that textbooks can't fully teach.",
      tip: {
        en: "Always match the possessive pronoun to the subject: 'broaden MY horizons / THEIR horizons'.",
        ar: "طابق ضمير الملكية مع الفاعل دائمًا: my / your / their horizons.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Does international travel promote mutual understanding between nations?",
      sample:
        "Meaningful cultural travel broadens visitors' horizons when tourists engage respectfully with local history rather than staying inside isolated resorts.",
      tip: {
        en: "Keep 'horizons' plural in this idiom.",
        ar: "تأتي كلمة horizons جمعًا دائمًا في هذا التعبير.",
      },
    },
    commonMistake: {
      wrong: "Travelling abroad helps to broaden our horizon.",
      right: "Travelling abroad helps broaden our horizons.",
      why: {
        en: "The idiomatic expression always uses plural 'horizons'.",
        ar: "التعبير الثابت يستخدم صيغة الجمع horizons دائمًا.",
      },
    },
  },
  {
    id: "ielts-travel-trip-journey",
    word: "travel vs. trip vs. journey",
    ipa: "/ˈtræv.əl/ · /trɪp/ · /ˈdʒɜː.ni/",
    partOfSpeech: "nouns (commonly confused)",
    category: "commonly-confused",
    topic: "tourism-travel",
    bandTarget: "7.0",
    definition:
      "'Travel' (uncountable) is the general activity of going to places; 'trip' (countable) is a short visit including your stay and return; 'journey' (countable) is the act of moving from point A to point B.",
    arabic:
      "الفرق بين travel (السفر عمومًا — غير معدود) وtrip (رحلة قصيرة ذهابًا وإيابًا) وjourney (مسار الانتقال من مكان لآخر)",
    collocations: [
      "international air travel",
      "a business trip",
      "a three-hour train journey",
      "embark on a journey",
    ],
    synonyms: ["voyage (by sea/space)", "excursion (short leisure outing)"],
    antonyms: ["staycation (informal)"],
    registerContrast: {
      everyday: "I went on a great trip to Oman. The flight journey took two hours.",
      academic: "Global air travel has expanded rapidly, shortening long-haul journeys.",
      whenToUse: {
        en: "Mastering 'travel' vs 'trip' vs 'journey' eliminates one of the top Band 6 lexical errors among ESL candidates.",
        ar: "إتقان الفرق بين هذه الكلمات الثلاث يُجنّبك أحد أشهر أخطاء مستوى ٦ في الآيلتس.",
      },
    },
    examples: [
      "International travel has become far more accessible over the past three decades.",
      "Our weekend trip to Al-Ula began with a scenic four-hour desert journey.",
    ],
    ieltsSpeaking: {
      prompt: "Tell me about a memorable trip you took recently.",
      sample:
        "Last winter I took a five-day trip to Abha—the mountain journey through the fog was unforgettable.",
      tip: {
        en: "NEVER say 'a travel'—say 'a trip' (countable) or 'travel' (uncountable general concept).",
        ar: "لا تقل أبدًا a travel؛ قل a trip لرحلة واحدة وtravel لمفهوم السفر عمومًا.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Has cheaper air travel been positive for society?",
      sample:
        "Budget airlines have democratised international travel, turning once-in-a-lifetime trips into routine weekend getaways.",
      tip: {
        en: "Check countability carefully: 'air travel is...' (singular), 'business trips are...' (plural).",
        ar: "راقب المعدود وغير المعدود: air travel مفرد دائمًا، وbusiness trips جمع.",
      },
    },
    commonMistake: {
      wrong: "Last summer we had an unforgettable travel to Istanbul.",
      right: "Last summer we had an unforgettable trip to Istanbul.",
      why: {
        en: "'Travel' is uncountable and cannot take 'a/an'—use 'a trip' for a specific visit.",
        ar: "كلمة travel غير معدودة فلا تأخذ a/an؛ استخدم a trip لرحلة محددة.",
      },
    },
  },
];
