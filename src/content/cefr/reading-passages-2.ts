import type { Lesson } from "../lesson-types";
import { buildReadingPassageLesson } from "./tbll-helpers";

/**
 * 9 full TBLL Reading Passages for B2, C1, and C2 (3 passages per level).
 * Combined with READING_PASSAGES_LOWER, this delivers 18 distinct passages
 * (exceeding the 15-passage target), each with 10 varied questions and ASR checks.
 */
export const READING_PASSAGES_UPPER: Lesson[] = [
  // ===================== B2 PASSAGE 10 =====================
  buildReadingPassageLesson({
    id: "b2-reading-arabic-coffee",
    course: "b2",
    unit: { en: "Reading Passage 10 · Culture & Trade", ar: "نص القراءة ١٠ · الثقافة والتجارة" },
    title: { en: "The Global Journey of Arabic Coffee", ar: "الرحلة العالمية للقهوة العربية" },
    goal: {
      en: "Trace historical and cultural evolution in a B2 passage, master nuanced vocabulary, synonyms and antonyms, and verify pronunciation.",
      ar: "تتبّع التطور التاريخي والثقافي في نص بمستوى B2، وأتقن المفردات والمترادفات والأضداد، وتحقق من النطق.",
    },
    minutes: 30,
    scenario: {
      en: "You are editing a cultural magazine feature explaining how Arabian coffee rituals shaped global café culture.",
      ar: "تحرّر مقالًا لمجلة ثقافية يشرح كيف أثّرت تقاليد القهوة العربية في ثقافة المقاهي العالمية.",
    },
    preTask: {
      en: "Think about what makes Saudi coffee hospitality distinctive. Preview the 6 academic words before reading.",
      ar: "فكّر فيما يميّز ضيافة القهوة السعودية، واستعرض الكلمات الأكاديمية الست قبل القراءة.",
    },
    mainTask: {
      en: "Read the feature article and answer all 10 questions on main ideas, details, inference, vocabulary, synonyms, and antonyms.",
      ar: "اقرأ المقال الثقافي وأجب عن الأسئلة العشرة في الفهم والاستنتاج والمفردات والمترادفات والأضداد.",
    },
    languageFocus: {
      en: "Participial clauses (Roasted lightly and spiced with cardamom...) and heritage/trade vocabulary.",
      ar: "الجمل الوصفية المختصرة ومفردات التجارة والتراث الثقافي.",
    },
    postTask: {
      en: "Read the pronunciation target aloud via ASR and summarise how hospitality and trade reinforced each other.",
      ar: "اقرأ جملة النطق عبر الميكروفون ولخّص كيف عزّزت الضيافة والتجارة إحداهما الأخرى.",
    },
    teaching: [
      {
        en: "Track chronological transitions (By the fifteenth century... Gradually... Today) to see how the story evolves.",
        ar: "تتبّع الروابط الزمنية (بحلول القرن الخامس عشر... تدريجيًا... اليوم) لفهم تطور القصة.",
      },
      {
        en: "Notice how B2 synonyms often replace a vivid word with a formal equivalent (generosity/hospitality, flourishing/thriving).",
        ar: "لاحظ أن مترادفات مستوى B2 غالبًا ما تستبدل كلمة وصفية بمكافئ رسمي.",
      },
    ],
    passage:
      "Long before espresso bars lined European boulevards, coffee was cultivated, roasted, and celebrated across the Arabian Peninsula. By the fifteenth century, beans grown on terraced hillsides in southern Arabia were traded through Red Sea ports, turning qahwa into both a prized commercial commodity and a cherished emblem of hospitality.\n\nAcross Saudi Arabia, preparing coffee remains a deliberate ritual rather than a rushed habit. Green beans are lightly roasted until golden, ground coarsely, and simmered with cardamom, cloves, or saffron. Serving from a brass dallah into small handleless cups follows strict yet welcoming etiquette: guests receive the cup with the right hand, and the host pours modestly so the coffee stays hot and fragrant.\n\nAs merchants and scholars carried coffee to Damascus, Cairo, Istanbul, and later Venice and London, public coffeehouses flourished as centres of lively debate, poetry, and commercial news. Today, UNESCO recognises Arabic coffee as Intangible Cultural Heritage, affirming that a simple drink can bind communities across centuries and continents.",
    vocab: [
      { word: "cultivate", meaningEn: "to grow and care for crops on land", meaningAr: "يزرع ويرعى المحاصيل", synonym: "grow", antonym: "neglect", example: "Coffee was cultivated on terraced hillsides." },
      { word: "prized", meaningEn: "highly valued and admired", meaningAr: "ثمين وذو قيمة عالية", synonym: "treasured", antonym: "worthless", example: "Qahwa became a prized commercial commodity." },
      { word: "deliberate", meaningEn: "done carefully and unhurriedly with intention", meaningAr: "متأنٍ ومقصود", synonym: "intentional", antonym: "hasty", example: "Preparing coffee remains a deliberate ritual." },
      { word: "modestly", meaningEn: "in a small, restrained, or humble amount", meaningAr: "باعتدال وبقدر مناسب", synonym: "sparingly", antonym: "excessively", example: "The host pours modestly so the cup stays hot." },
      { word: "flourish", meaningEn: "to grow or develop strongly and successfully", meaningAr: "يزدهر", synonym: "thrive", antonym: "decline", example: "Public coffeehouses flourished as centres of debate." },
      { word: "affirm", meaningEn: "to state publicly and confirm as true or valuable", meaningAr: "يؤكّد ويُقرّ بـ", synonym: "confirm", antonym: "deny", example: "UNESCO's recognition affirms its cultural value." },
    ],
    questions: [
      { kind: "comprehension", prompt: "Where were coffee beans originally grown and traded according to paragraph 1?", options: ["European boulevards", "Terraced hillsides in southern Arabia via Red Sea ports", "London coffeehouses", "Northern deserts"], correct: 1, explanation: { en: "Paragraph 1 specifies terraced hillsides in southern Arabia traded through Red Sea ports.", ar: "تحدد الفقرة الأولى المدرجات الجبلية جنوب الجزيرة العربية عبر موانئ البحر الأحمر." } },
      { kind: "comprehension", prompt: "Why does the host pour a modest amount into each cup?", options: ["Because coffee is scarce", "So the coffee remains hot and fragrant", "To make guests leave quickly", "Because the dallah is heavy"], correct: 1, explanation: { en: "Paragraph 2 explains the host pours modestly so the coffee stays hot and fragrant.", ar: "توضح الفقرة الثانية أن المضيف يصبّ بقدر معتدل لتبقى القهوة ساخنة وعطرة." } },
      { kind: "comprehension", prompt: "What role did early public coffeehouses play as coffee spread?", options: ["Quiet libraries with no talking", "Centres of debate, poetry, and commercial news", "Private factories", "Shipping warehouses"], correct: 1, explanation: { en: "Paragraph 3 says they flourished as centres of lively debate, poetry, and commercial news.", ar: "تذكر الفقرة الثالثة أنها ازدهرت كمراكز للنقاش الحيوي والشعر والأخبار التجارية." } },
      { kind: "inference", prompt: "What does UNESCO's recognition suggest about Arabic coffee?", options: ["It is valued primarily for its cultural and social heritage, not merely caffeine", "It can no longer be traded", "It is only drunk in Venice", "It must be roasted darkly"], correct: 0, explanation: { en: "Being named Intangible Cultural Heritage highlights its role in binding communities across centuries.", ar: "إدراجها في التراث الثقافي غير المادي يبرز دورها الاجتماعي والثقافي العريق." } },
      { kind: "vocabulary", prompt: "What does 'commodity' mean in paragraph 1?", options: ["A valuable product bought and sold in trade", "A type of poetry", "A brass handle", "A seaside village"], correct: 0, explanation: { en: "A commercial commodity is a good actively traded in markets.", ar: "السلعة التجارية (commodity) هي منتج يُتاجر به في الأسواق." } },
      { kind: "vocabulary", prompt: "What does 'etiquette' refer to in paragraph 2?", options: ["Polite customary rules of social behaviour", "A chemical spice", "A shipping route", "A farming tool"], correct: 0, explanation: { en: "Etiquette means the polite conventions followed when serving and accepting coffee.", ar: "الإتيكيت (etiquette) هو آداب الضيافة والتعامل الاجتماعي المتعارف عليها." } },
      { kind: "synonym", prompt: "Which word is a synonym for 'flourish'?", options: ["thrive", "vanish", "freeze", "hesitate"], correct: 0, explanation: { en: "'Thrive' means to grow and succeed vigorously, matching 'flourish'.", ar: "الفعل thrive (يزدهر) مرادف مباشر لـ flourish." } },
      { kind: "synonym", prompt: "Which word is closest in meaning to 'prized'?", options: ["treasured", "ordinary", "broken", "ignored"], correct: 0, explanation: { en: "'Treasured' means deeply valued, matching 'prized'.", ar: "كلمة treasured (ثمين ومُقدّر) مرادفة لـ prized." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'deliberate' in paragraph 2?", options: ["hasty", "fragrant", "golden", "welcoming"], correct: 0, explanation: { en: "'Hasty' means rushed and unthinking, the opposite of 'deliberate'.", ar: "كلمة hasty (متسرّع) مضاد deliberate (متأنٍ ومقصود)." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'affirm'?", options: ["deny", "pour", "roast", "bind"], correct: 0, explanation: { en: "'Deny' means to reject or state something is untrue, the opposite of 'affirm'.", ar: "الفعل deny (ينكر) هو مضاد affirm (يؤكّد)." } },
    ],
    pronunciation: "Public coffeehouses flourished as centres of lively debate, poetry, and commercial news.",
    pronunciationTip: {
      en: "Pronounce 'flourished' with two syllables (/ˈflʌr.ɪʃt/) ending in a crisp /t/ sound.",
      ar: "انطق flourished بمقطعين (/ˈflʌr.ɪʃt/) مع إنهاء الكلمة بصوت /t/ واضح.",
    },
  }),

  // ===================== B2 PASSAGE 11 =====================
  buildReadingPassageLesson({
    id: "b2-reading-urban-cooling",
    course: "b2",
    unit: { en: "Reading Passage 11 · Urban Climate", ar: "نص القراءة ١١ · مناخ المدن" },
    title: { en: "How Urban Green Corridors Cool Modern Cities", ar: "كيف تُبرّد الممرات الخضراء المدن الحديثة" },
    goal: {
      en: "Analyse urban planning solutions, learn climate/architecture vocabulary with synonyms and antonyms, and verify pronunciation.",
      ar: "حلّل حلول التخطيط الحضري، وتعلّم مفردات المناخ والعمارة مع المترادفات والأضداد، وتحقق من النطق.",
    },
    minutes: 30,
    scenario: {
      en: "A municipal planning committee asks residents for feedback on turning wide asphalt boulevards into shaded green corridors.",
      ar: "تطلب لجنة تخطيط بلدية آراء السكان حول تحويل الشوارع الإسفلتية الواسعة إلى ممرات خضراء مظللة.",
    },
    preTask: {
      en: "Why are city centres hotter at night than surrounding countryside? Preview the 6 key words.",
      ar: "لماذا تكون مراكز المدن أشد حرارة ليلًا من المناطق المحيطة بها؟ استعرض الكلمات الست.",
    },
    mainTask: {
      en: "Read the urban-planning brief and answer all 10 questions on evidence, inference, vocabulary, synonyms, and antonyms.",
      ar: "اقرأ موجز التخطيط الحضري وأجب عن الأسئلة العشرة في الأدلة والاستنتاج والمفردات والمترادفات والأضداد.",
    },
    languageFocus: {
      en: "Cause-effect verbs (trap, mitigate, alleviate, lower) and technical nouns (canopy, microclimate, permeability).",
      ar: "أفعال السبب والنتيجة (يحبس، يخفّف) والمصطلحات الحضرية والبيئية.",
    },
    postTask: {
      en: "Practise the key policy claim aloud with ASR and identify one street in your city that needs shade.",
      ar: "تدرّب على نطق الجملة الرئيسية عبر الميكروفون وحدّد شارعًا في مدينتك يحتاج إلى التظليل.",
    },
    teaching: [
      {
        en: "Look for numerical evidence (up to 4°C cooler, 30% lower peak energy) and distinguish facts from caveats.",
        ar: "ابحث عن الأدلة الرقمية وميّز بين الحقائق المؤكدة والقيود العملية.",
      },
      {
        en: "Notice prefixes like micro- (small-scale) and miti-/allev- (reduce severity).",
        ar: "انتبه للبادئات والجذور مثل micro- (مُصغّر) وأفعال التخفيف مثل mitigate.",
      },
    ],
    passage:
      "Rapidly expanding cities often experience the urban heat-island effect: dark asphalt roads and concrete towers absorb solar radiation throughout the day and release it slowly after sunset, leaving city centres several degrees warmer than nearby rural areas. This trapped heat raises air-conditioning costs and discourages outdoor walking.\n\nTo mitigate rising temperatures, urban planners from Medellín to Riyadh are building connected green corridors—continuous chains of shaded walkways, drought-tolerant trees, and water-wise parks woven directly through residential neighbourhoods. Unlike isolated ornamental trees, continuous canopies cool the air through both direct shade and natural evaporation, lowering street-level temperatures by as much as four degrees Celsius.\n\nCrucially, green corridors deliver benefits only when designed for the local climate. Planting thirsty lawns in arid cities wastes precious water and quickly becomes unsustainable. When municipalities instead select indigenous trees, permeable paving that captures rare rainwater, and treated greywater irrigation, green corridors simultaneously alleviate heat stress, invite community exercise, and boost neighbourhood resilience.",
    vocab: [
      { word: "mitigate", meaningEn: "to make something harmful less severe", meaningAr: "يخفّف من حدة مشكلة", synonym: "alleviate", antonym: "worsen", example: "Planners use green corridors to mitigate urban heat." },
      { word: "continuous", meaningEn: "unbroken and extending without gaps", meaningAr: "متصل ومستمر دون انقطاع", synonym: "uninterrupted", antonym: "fragmented", example: "Continuous tree canopies cool busy streets." },
      { word: "arid", meaningEn: "extremely dry with very little rainfall", meaningAr: "جاف وقاحل", synonym: "dry", antonym: "humid", example: "Arid cities must avoid water-hungry lawns." },
      { word: "indigenous", meaningEn: "originating naturally in a specific region", meaningAr: "أصلي ومحلي في المنطقة", synonym: "native", antonym: "imported", example: "Municipalities select indigenous drought-tolerant trees." },
      { word: "precious", meaningEn: "of great value and not to be wasted", meaningAr: "ثمين ونفيس", synonym: "valuable", antonym: "expendable", example: "Thirsty lawns waste precious water." },
      { word: "resilience", meaningEn: "the capacity to withstand and recover from stress", meaningAr: "المرونة والقدرة على الصمود", synonym: "durability", antonym: "vulnerability", example: "Green design boosts neighbourhood resilience." },
    ],
    questions: [
      { kind: "comprehension", prompt: "What causes the urban heat-island effect according to paragraph 1?", options: ["Too many trees near roads", "Dark asphalt and concrete absorbing and slowly releasing heat", "Cold night winds from rural areas", "Permeable paving"], correct: 1, explanation: { en: "Dark asphalt and concrete absorb radiation all day and release it slowly after sunset.", ar: "يمتص الإسفلت الداكن والخرسانة الإشعاع الشمسي نهارًا ويطلقانه ببطء بعد الغروب." } },
      { kind: "comprehension", prompt: "By how much can continuous tree canopies lower street-level temperatures?", options: ["Up to 1°C", "Up to 4°C", "Exactly 10°C", "Only 0.2°C"], correct: 1, explanation: { en: "Paragraph 2 notes street-level temperatures can drop by as much as four degrees Celsius.", ar: "تذكر الفقرة الثانية إمكانية خفض الحرارة على مستوى الشارع حتى أربع درجات مئوية." } },
      { kind: "comprehension", prompt: "What makes a green project unsustainable in arid cities?", options: ["Using indigenous trees", "Planting thirsty lawns that waste water", "Installing permeable paving", "Using treated greywater"], correct: 1, explanation: { en: "Paragraph 3 warns that thirsty lawns waste precious water in arid cities.", ar: "تحذر الفقرة الثالثة من أن المسطحات العشبية المستهلكة للماء تهدر المياه الثمينة في المدن الجافة." } },
      { kind: "inference", prompt: "Why are connected corridors more effective than isolated single trees?", options: ["Continuous canopies combine shade and evaporation across entire walking routes", "Single trees cannot grow roots", "Corridors block all wind", "Isolated trees cost more to water"], correct: 0, explanation: { en: "Paragraph 2 contrasts continuous canopies with isolated trees because uninterrupted shade and evaporation cool the street microclimate.", ar: "توضح الفقرة الثانية أن الظل المتصل والتبخر الطبيعي يبردان مسار المشي بالكامل." } },
      { kind: "vocabulary", prompt: "What does 'permeable paving' do in paragraph 3?", options: ["Lets rare rainwater soak through into the ground", "Prevents any water from passing", "Reflects sound waves", "Heats up sidewalks"], correct: 0, explanation: { en: "The text defines permeable paving as paving 'that captures rare rainwater'.", ar: "الرصف المنفّذ للماء يسمح لمياه الأمطار النادرة بالتسرب والاستفادة منها." } },
      { kind: "vocabulary", prompt: "What is 'greywater' in urban landscaping?", options: ["Lightly used household water treated for safe irrigation", "Seawater from the ocean", "Rainwater mixed with oil", "Melting glacier ice"], correct: 0, explanation: { en: "Treated greywater is recycled wash water reused safely for trees and parks.", ar: "المياه الرمادية المعالجة هي مياه معاد تدويرها بأمان لري الأشجار والحدائق." } },
      { kind: "synonym", prompt: "Which word is a synonym for 'mitigate'?", options: ["alleviate", "accelerate", "ignore", "expand"], correct: 0, explanation: { en: "'Alleviate' means to lessen the severity of a problem, matching 'mitigate'.", ar: "الفعل alleviate (يخفّف) مرادف مباشر لـ mitigate." } },
      { kind: "synonym", prompt: "Which word is closest in meaning to 'indigenous'?", options: ["native", "artificial", "temporary", "expensive"], correct: 0, explanation: { en: "'Native' means naturally belonging to that region, matching 'indigenous'.", ar: "كلمة native (محلي وأصيل) مرادفة لـ indigenous." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'arid'?", options: ["humid", "sunny", "urban", "modern"], correct: 0, explanation: { en: "'Humid' describes moist air/climate, the opposite of 'arid' (very dry).", ar: "كلمة humid (رطب) مضاد arid (جاف وقاحل)." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'resilience'?", options: ["vulnerability", "strength", "evaporation", "shade"], correct: 0, explanation: { en: "'Vulnerability' means weakness to stress or harm, the opposite of 'resilience'.", ar: "كلمة vulnerability (الهشاشة والقابلية للتضرر) عكس resilience (المرونة والصمود)." } },
    ],
    pronunciation: "Indigenous trees and permeable paving mitigate urban heat and boost neighbourhood resilience.",
    pronunciationTip: {
      en: "Stress the second syllable in 'inDIGenous' (/ɪnˈdɪdʒ.ɪ.nəs/) and the first in 'PERmeable'.",
      ar: "انبر المقطع الثاني في inDIGenous والأول في PERmeable بوضوح.",
    },
  }),

  // ===================== B2 PASSAGE 12 =====================
  buildReadingPassageLesson({
    id: "b2-reading-digital-minimalism",
    course: "b2",
    unit: { en: "Reading Passage 12 · Psychology & Media", ar: "نص القراءة ١٢ · علم النفس والإعلام" },
    title: { en: "Digital Minimalism: Reclaiming Attention in a Connected Era", ar: "البساطة الرقمية: استعادة التركيز في عصر الاتصال الدائم" },
    goal: {
      en: "Evaluate arguments about screen habits, build psychology vocabulary with synonyms and antonyms, and verify pronunciation.",
      ar: "قيّم الحجج حول عادات الشاشات، وابنِ مفردات علم النفس مع المترادفات والأضداد، وتحقق من النطق.",
    },
    minutes: 30,
    scenario: {
      en: "You are designing a focus workshop for university students who feel distracted by constant phone notifications.",
      ar: "تصمّم ورشة عمل للتركيز لطلاب الجامعات الذين يعانون من تشتيت إشعارات الجوال المستمرة.",
    },
    preTask: {
      en: "Estimate how many times a day you unlock your phone without a clear reason. Preview the 6 target terms.",
      ar: "قدّر كم مرة تفتح هاتفك يوميًا دون سبب محدد، ثم استعرض المصطلحات الستة المستهدفة.",
    },
    mainTask: {
      en: "Read the essay carefully and answer all 10 comprehension, inference, vocabulary, synonym, and antonym questions.",
      ar: "اقرأ المقال بعناية وأجب عن الأسئلة العشرة في الفهم والاستنتاج والمفردات والمترادفات والأضداد.",
    },
    languageFocus: {
      en: "Defining distinctions (rather than rejecting technology altogether...) and cognitive-psychology vocabulary.",
      ar: "التمييز الدقيق بين المفاهيم ومفردات التركيز وعلم النفس المعرفي.",
    },
    postTask: {
      en: "Record the pronunciation sentence aloud using ASR and name one notification you will turn off today.",
      ar: "سجّل جملة النطق بصوتك عبر الميكروفون وحدّد إشعارًا واحدًا ستوقفه اليوم.",
    },
    teaching: [
      {
        en: "Distinguish what digital minimalism IS (intentional tool use) from what it is NOT (abandoning the internet).",
        ar: "ميّز بين حقيقة البساطة الرقمية (الاستخدام الواعي) وما ليست عليه (هجر التقنية كليًا).",
      },
      {
        en: "Study abstract antonym pairs: intentional/impulsive, fragmented/sustained, clutter/clarity.",
        ar: "ادرس أزواج الأضداد المجردة: مقصود/مندفع، مجزّأ/متواصل، فوضى/وضوح.",
      },
    ],
    passage:
      "Smartphones place libraries, banking, and global communication inside a pocket, yet many users report feeling mentally exhausted by constant pings and endless scrolling. Cognitive scientists note that switching attention every few minutes leaves a 'residue' on the mind: even a ten-second glance at an alert can take several minutes to recover from during demanding study or writing.\n\nDigital minimalism offers a practical philosophy to resolve this tension. Rather than rejecting modern technology altogether, digital minimalists audit every app and keep only tools that clearly serve a core value or goal. Non-essential alerts are silenced, social feeds are moved off the home screen, and leisure browsing is scheduled into deliberate blocks instead of filling every spare moment.\n\nParticipants who try a thirty-day digital declutter frequently describe unexpected relief. Once fragmented micro-checks subside, sustained reading feels enjoyable again, conversations become more attentive, and boredom—often feared in a hyper-connected culture—returns as quiet mental space where fresh creative ideas quietly take shape.",
    vocab: [
      { word: "exhausted", meaningEn: "completely drained of physical or mental energy", meaningAr: "مُنهَك ومرهَق تمامًا", synonym: "drained", antonym: "refreshed", example: "Users feel mentally exhausted by constant pings." },
      { word: "resolve", meaningEn: "to find a satisfactory solution to a problem", meaningAr: "يحلّ مشكلة أو توترًا", synonym: "settle", antonym: "aggravate", example: "Digital minimalism helps resolve this tension." },
      { word: "essential", meaningEn: "absolutely necessary and important", meaningAr: "أساسي وضروري", synonym: "vital", antonym: "trivial", example: "Non-essential alerts are switched off." },
      { word: "fragmented", meaningEn: "broken into small disconnected pieces", meaningAr: "مجزّأ ومشتّت", synonym: "scattered", antonym: "sustained", example: "Fragmented micro-checks disrupt deep study." },
      { word: "subside", meaningEn: "to become less intense or gradually stop", meaningAr: "يهدأ ويتراجع", synonym: "fade", antonym: "intensify", example: "Once constant checks subside, reading improves." },
      { word: "attentive", meaningEn: "paying close, respectful focus to someone or something", meaningAr: "منتبه ومُصغٍ بتركيز", synonym: "focused", antonym: "distracted", example: "Face-to-face conversations become more attentive." },
    ],
    questions: [
      { kind: "comprehension", prompt: "What is 'attention residue' as described in paragraph 1?", options: ["A battery problem on smartphones", "Mental drag that lingers after briefly checking an alert", "A method for faster reading", "A type of online library"], correct: 1, explanation: { en: "Even a ten-second glance leaves residue requiring several minutes to recover focus.", ar: "حتى نظرة لثوانٍ على إشعار تترك أثرًا ذهنيًا يحتاج لدقائق لاستعادة التركيز." } },
      { kind: "comprehension", prompt: "How do digital minimalists approach apps?", options: ["They delete every app and stop using the internet", "They audit apps and keep only those serving core goals", "They keep all notifications on for speed", "They buy two separate phones"], correct: 1, explanation: { en: "Paragraph 2 says they audit apps and retain only tools that clearly serve a core value or goal.", ar: "توضح الفقرة الثانية أنهم يراجعون التطبيقات ويحتفظون فقط بما يخدم أهدافهم الأساسية." } },
      { kind: "comprehension", prompt: "What surprising benefit of boredom is mentioned in paragraph 3?", options: ["It makes people fall asleep immediately", "It creates quiet mental space for creative ideas", "It increases scrolling speed", "It removes the need to study"], correct: 1, explanation: { en: "The final sentence says boredom returns as quiet mental space where creative ideas take shape.", ar: "تذكر الجملة الأخيرة أن الملل يوفّر مساحة ذهنية هادئة تنشأ فيها الأفكار الإبداعية." } },
      { kind: "inference", prompt: "What does the writer imply about most people's current smartphone habits?", options: ["People often use phones out of habit rather than conscious choice", "Smartphones have no useful benefits", "Banking apps cause boredom", "Reading is no longer possible"], correct: 0, explanation: { en: "Contrasting 'deliberate blocks' with 'filling every spare moment' implies habitual, automatic checking.", ar: "المقارنة بين الأوقات المقصودة وملء كل لحظة فراغ تشير إلى أن الاستخدام غالبًا يكون تلقائيًا." } },
      { kind: "vocabulary", prompt: "What does 'audit' mean in paragraph 2?", options: ["Carefully examine and review", "Download automatically", "Share with strangers", "Hide from friends"], correct: 0, explanation: { en: "To audit apps means to inspect each one carefully to decide if it is genuinely useful.", ar: "الفعل audit يعني يفحص ويراجع بدقة." } },
      { kind: "vocabulary", prompt: "What is a 'digital declutter' in paragraph 3?", options: ["A planned reset to remove unnecessary digital distractions", "Buying new computer cables", "Deleting all work files", "Joining more social groups"], correct: 0, explanation: { en: "Decluttering means clearing out unneeded apps and alerts to restore calm focus.", ar: "التنظيم الرقمي (digital declutter) هو إزالة المشتتات الرقمية غير الضرورية." } },
      { kind: "synonym", prompt: "Which word is a synonym for 'essential'?", options: ["vital", "noisy", "casual", "brief"], correct: 0, explanation: { en: "'Vital' means critically necessary, matching 'essential'.", ar: "كلمة vital (حيوي وضروري) مرادفة لـ essential." } },
      { kind: "synonym", prompt: "Which word is closest in meaning to 'subside'?", options: ["fade", "explode", "repeat", "borrow"], correct: 0, explanation: { en: "'Fade' means to diminish gradually, matching 'subside'.", ar: "الفعل fade (يتلاشى ويخفّ) مرادف لـ subside." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'fragmented'?", options: ["sustained", "digital", "mobile", "quiet"], correct: 0, explanation: { en: "'Sustained' means continuous and unbroken, the opposite of 'fragmented'.", ar: "كلمة sustained (متواصل ومستمر) عكس fragmented (مجزّأ)." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'attentive'?", options: ["distracted", "polite", "creative", "calm"], correct: 0, explanation: { en: "'Distracted' means unable to keep focus, the direct opposite of 'attentive'.", ar: "كلمة distracted (مُشتّت) مضاد attentive (منتبه ومُركّز)." } },
    ],
    pronunciation: "Once fragmented micro-checks subside, sustained reading and attentive conversations return.",
    pronunciationTip: {
      en: "Stress 'susTAINED' on the second syllable and pronounce the final /d/ cleanly before 'reading'.",
      ar: "انبر المقطع الثاني في susTAINED وانطق صوت /d/ النهائي بوضوح قبل reading.",
    },
  }),

  // ===================== C1 PASSAGE 13 =====================
  buildReadingPassageLesson({
    id: "c1-reading-ai-medicine",
    course: "c1",
    unit: { en: "Reading Passage 13 · Science & Ethics", ar: "نص القراءة ١٣ · العلوم والأخلاقيات" },
    title: { en: "Artificial Intelligence in Early Medical Diagnosis", ar: "الذكاء الاصطناعي في التشخيص الطبي المبكر" },
    goal: {
      en: "Critically evaluate medical AI claims, master C1 academic vocabulary with synonyms and antonyms, and verify prosody via ASR.",
      ar: "قيّم ادعاءات الذكاء الاصطناعي الطبي نقديًا، وأتقن مفردات C1 الأكاديمية مع المترادفات والأضداد، وتحقق من النطق.",
    },
    minutes: 35,
    scenario: {
      en: "You are reviewing a hospital ethics briefing on deploying AI imaging assistants in radiology departments.",
      ar: "تراجع إيجازًا أخلاقيًا لمستشفى حول توظيف مساعدات الذكاء الاصطناعي في أقسام الأشعة.",
    },
    preTask: {
      en: "Where should humans remain strictly in charge when AI assists doctors? Preview the 6 C1 terms.",
      ar: "في أي خطوات يجب أن يبقى الطبيب البشري صاحب القرار الحاسم عند الاستعانة بالذكاء الاصطناعي؟ راجع المصطلحات الستة.",
    },
    mainTask: {
      en: "Read the briefing critically and answer all 10 comprehension, inference, vocabulary, synonym, and antonym questions.",
      ar: "اقرأ الإيجاز بقراءة نقدية وأجب عن الأسئلة العشرة في الفهم والاستنتاج والمفردات والمترادفات والأضداد.",
    },
    languageFocus: {
      en: "Cautious academic hedging (holds promise, hinges on, rather than displacing) and clinical ethics vocabulary.",
      ar: "التحفّظ الأكاديمي الدقيق ومفردات الأخلاقيات السريرية.",
    },
    postTask: {
      en: "Record the balanced academic summary via ASR and state one safeguard hospitals must require.",
      ar: "سجّل الخلاصة الأكاديمية عبر الميكروفون واذكر ضابط أمان واحدًا يجب أن تشترطه المستشفيات.",
    },
    teaching: [
      {
        en: "At C1, track qualifying clauses ('provided that', 'yet accuracy in the lab does not automatically translate to...').",
        ar: "في مستوى C1، تتبّع جمل التقييد والاستدراك لأنها تحمل الموقف الدقيق للكاتب.",
      },
      {
        en: "Distinguish close academic pairs: augment vs. displace, scrutiny vs. blind trust, opaque vs. interpretable.",
        ar: "ميّز الأزواج الأكاديمية الدقيقة: يعزّز مقابل يحلّ محل، التدقيق مقابل الثقة العمياء.",
      },
    ],
    passage:
      "Machine-learning models trained on millions of retinal scans, chest X-rays, and pathology slides now detect subtle anomalies that can escape even seasoned clinicians during long hospital shifts. In early pilot studies, diagnostic assistants have helped flag high-risk tumours weeks sooner, accelerating treatment when intervention is most effective.\n\nYet benchmark accuracy in a controlled laboratory does not automatically translate into safe bedside care. Models trained predominantly on data from one demographic group can underperform on underrepresented populations, perpetuating hidden disparities. Furthermore, 'black-box' algorithms whose reasoning remains opaque make it difficult for physicians to verify whether a prediction rests on genuine clinical signs or irrelevant artefacts in the image.\n\nConsequently, leading medical societies advocate a 'human-in-the-loop' standard: AI should augment rather than displace clinical judgement. Safe adoption hinges on rigorous external validation across diverse hospitals, transparent accountability when errors occur, and clear communication with patients about how automated tools contribute to their care.",
    vocab: [
      { word: "anomaly", meaningEn: "something unusual that departs from the normal pattern", meaningAr: "شذوذ أو علامة غير طبيعية", synonym: "irregularity", antonym: "norm", example: "Models detect subtle anomalies in medical scans." },
      { word: "seasoned", meaningEn: "having long practical experience in a profession", meaningAr: "متمرّس وذو خبرة طويلة", synonym: "veteran", antonym: "novice", example: "Subtle signs can escape even seasoned clinicians." },
      { word: "perpetuate", meaningEn: "to cause an undesirable condition to continue indefinitely", meaningAr: "يُديم ويُرسّخ مشكلة قائمة", synonym: "prolong", antonym: "eliminate", example: "Biased data can perpetuate hidden disparities." },
      { word: "opaque", meaningEn: "difficult to understand or see through; lacking transparency", meaningAr: "غامض وغير شفاف", synonym: "obscure", antonym: "transparent", example: "Opaque algorithms hinder clinical verification." },
      { word: "augment", meaningEn: "to enhance or make greater by adding support", meaningAr: "يعزّز ويدعم", synonym: "supplement", antonym: "diminish", example: "AI should augment rather than displace doctors." },
      { word: "rigorous", meaningEn: "extremely thorough, strict, and accurate", meaningAr: "صارم ودقيق للغاية", synonym: "stringent", antonym: "lax", example: "Safe use hinges on rigorous external validation." },
    ],
    questions: [
      { kind: "comprehension", prompt: "What advantage of medical AI is highlighted in paragraph 1?", options: ["It eliminates the need for hospitals", "It can spot subtle anomalies early and speed up treatment", "It replaces all pathology labs", "It shortens medical school"], correct: 1, explanation: { en: "Paragraph 1 explains AI can detect subtle anomalies and flag high-risk tumours weeks sooner.", ar: "توضح الفقرة الأولى أن الذكاء الاصطناعي يرصد العلامات الدقيقة مبكرًا ويسرّع بدء العلاج." } },
      { kind: "comprehension", prompt: "Why can models underperform on certain patient populations?", options: ["Hospital lights are too dim", "They were trained mostly on a single demographic group", "Doctors refuse to use computers", "X-rays are too expensive"], correct: 1, explanation: { en: "Paragraph 2 attributes this gap to training predominantly on one demographic group.", ar: "تُرجع الفقرة الثانية ذلك إلى تدريب النماذج غالبًا على بيانات فئة سكانية واحدة." } },
      { kind: "comprehension", prompt: "What does the 'human-in-the-loop' standard require?", options: ["Patients must program the software", "AI supports clinical judgement rather than replacing physicians", "Algorithms must be kept secret", "Only laboratory benchmarks matter"], correct: 1, explanation: { en: "Paragraph 3 states AI should augment rather than displace clinical judgement.", ar: "تؤكد الفقرة الثالثة أن الذكاء الاصطناعي يجب أن يدعم الحكم السريري للطبيب لا أن يحلّ محله." } },
      { kind: "inference", prompt: "Why are 'irrelevant artefacts in the image' dangerous in a black-box model?", options: ["A model might base a life-changing diagnosis on a scanner mark instead of real disease", "Artefacts make files smaller", "Clinicians enjoy puzzles", "Patients cannot see X-rays"], correct: 0, explanation: { en: "If reasoning is opaque, doctors cannot confirm the AI used real medical indicators rather than image noise.", ar: "عندما يكون المنطق غامضًا لا يمكن التأكد من أن التشخيص بُني على علامة مرضية حقيقية لا على تشويش في الصورة." } },
      { kind: "vocabulary", prompt: "What does 'disparities' mean in paragraph 2?", options: ["Unfair differences or inequalities in outcomes", "Fast medical recoveries", "Digital cameras", "Hospital schedules"], correct: 0, explanation: { en: "'Disparities' refers to unequal quality of care across different patient groups.", ar: "كلمة disparities تعني التفاوتات أو الفوارق غير العادلة." } },
      { kind: "vocabulary", prompt: "What does 'hinges on' mean in paragraph 3?", options: ["Depends critically on", "Disconnects from", "Complains about", "Happens after"], correct: 0, explanation: { en: "'Hinges on' is an academic idiom meaning depends decisively on.", ar: "العبارة hinges on تعني يعتمد اعتمادًا حاسمًا على." } },
      { kind: "synonym", prompt: "Which word is a synonym for 'augment'?", options: ["supplement", "abolish", "conceal", "postpone"], correct: 0, explanation: { en: "'Supplement' means to add to and strengthen, matching 'augment'.", ar: "الفعل supplement (يدعم ويكمّل) مرادف لـ augment." } },
      { kind: "synonym", prompt: "Which word is closest in meaning to 'rigorous'?", options: ["stringent", "casual", "brief", "fragile"], correct: 0, explanation: { en: "'Stringent' means strict and thorough, matching 'rigorous'.", ar: "كلمة stringent (صارم ودقيق) مرادفة لـ rigorous." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'opaque'?", options: ["transparent", "clinical", "automated", "subtle"], correct: 0, explanation: { en: "'Transparent' means clear and inspectable, the opposite of 'opaque'.", ar: "كلمة transparent (شفاف وواضح) عكس opaque (غامض)." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'seasoned' (for a clinician)?", options: ["novice", "retired", "skilled", "calm"], correct: 0, explanation: { en: "'Novice' means a beginner with little experience, the opposite of 'seasoned'.", ar: "كلمة novice (مبتدئ) مضاد seasoned (متمرّس)." } },
    ],
    pronunciation: "Safe adoption hinges on rigorous validation, transparent accountability, and human judgement.",
    pronunciationTip: {
      en: "Keep the soft /dʒ/ in 'hinges' and 'judgement' clear, and stress the first syllable of 'RIGorous'.",
      ar: "حافظ على وضوح صوت /dʒ/ في hinges وjudgement وانبر المقطع الأول في RIGorous.",
    },
  }),

  // ===================== C1 PASSAGE 14 =====================
  buildReadingPassageLesson({
    id: "c1-reading-behavioural-economics",
    course: "c1",
    unit: { en: "Reading Passage 14 · Economics & Psychology", ar: "نص القراءة ١٤ · الاقتصاد وعلم النفس" },
    title: { en: "Behavioural Economics and Everyday Decision-Making", ar: "الاقتصاد السلوكي وصناعة القرارات اليومية" },
    goal: {
      en: "Examine cognitive heuristics and policy nudges, master C1 economic/psychological vocabulary, and verify pronunciation.",
      ar: "تعرّف على الانحيازات الإدراكية والتوجيهات السلوكية، وأتقن مفردات C1 الاقتصادية والنفسية، وتحقق من النطق.",
    },
    minutes: 35,
    scenario: {
      en: "You are preparing a seminar summary explaining why sensible people still make impulsive financial choices.",
      ar: "تُعدّ ملخصًا لندوة جامعية يشرح لماذا يتخذ العقلاء أحيانًا قرارات مالية غير محسوبة.",
    },
    preTask: {
      en: "Why do people feel losing 100 SAR more strongly than gaining 100 SAR? Preview the 6 C1 words.",
      ar: "لماذا يؤلمنا فقدان 100 ريال أكثر من فرحتنا بربح 100 ريال؟ استعرض المصطلحات الستة.",
    },
    mainTask: {
      en: "Read the seminar text and complete all 10 comprehension, inference, vocabulary, synonym, and antonym questions.",
      ar: "اقرأ النص وأكمل الأسئلة العشرة في الفهم والاستنتاج والمفردات والمترادفات والأضداد.",
    },
    languageFocus: {
      en: "Contrastive concession (while classical models assume..., empirical studies reveal...) and abstract nouns.",
      ar: "الاستدراك الأكاديمي والمقارنة بين النظريات والنتائج التجريبية.",
    },
    postTask: {
      en: "Speak the target principle aloud with ASR and give one everyday example of a helpful 'nudge'.",
      ar: "انطق المبدأ المستهدف عبر الميكروفون واذكر مثالًا يوميًا لتوجيه سلوكي إيجابي (nudge).",
    },
    teaching: [
      {
        en: "Notice how examples (pension enrolment, loss aversion) illustrate abstract theories clearly.",
        ar: "لاحظ كيف توضّح الأمثلة العملية (الادخار التلقائي، النفور من الخسارة) النظريات المجردة.",
      },
      {
        en: "Master C1 word families: rational/irrational, empirical/theoretical, coercive/voluntary.",
        ar: "أتقن عائلات الكلمات في C1: عقلاني/غير عقلاني، تجريبي/نظري، قسري/طوعي.",
      },
    ],
    passage:
      "Classical economic theory long assumed that individuals act as coolly rational calculators who weigh every cost and benefit before choosing. Behavioural economics challenges that tidy portrait by combining psychology with empirical observation. In reality, people rely on mental shortcuts—known as heuristics—that save time in routine choices but produce predictable biases under uncertainty.\n\nOne well-documented pattern is loss aversion: losing a given sum of money typically causes roughly twice as much psychological distress as gaining the exact same amount brings pleasure. Another is status-quo bias, our tendency to stick with default settings even when a superior option is only a few clicks away. Recognising these tendencies, policymakers developed 'nudges'—subtle changes to how options are presented that guide healthier or thriftier habits without forbidding freedom of choice.\n\nFor instance, automatically enrolling new employees in retirement savings while allowing easy opt-out raises participation dramatically compared with requiring manual sign-up. Critics rightly caution, however, that choice architecture is never morally neutral: when transparent and accountable, nudges empower citizens; when covert, the very same psychology becomes manipulative.",
    vocab: [
      { word: "empirical", meaningEn: "based on real-world observation and evidence", meaningAr: "تجريبي ومبني على الملاحظة", synonym: "observational", antonym: "speculative", example: "Behavioural economics relies on empirical observation." },
      { word: "predictable", meaningEn: "able to be foreseen in advance", meaningAr: "قابل للتوقع", synonym: "foreseeable", antonym: "unpredictable", example: "Mental shortcuts create predictable biases." },
      { word: "thrifty", meaningEn: "careful and wise with money and resources", meaningAr: "مقتصد وحكيم في الإنفاق", synonym: "frugal", antonym: "extravagant", example: "Nudges can encourage thriftier saving habits." },
      { word: "subtle", meaningEn: "delicate, understated, and not immediately obvious", meaningAr: "دقيق وغير صاخب", synonym: "nuanced", antonym: "blatant", example: "Nudges use subtle changes in how options appear." },
      { word: "covert", meaningEn: "hidden, secret, and not openly acknowledged", meaningAr: "خفي وسري", synonym: "clandestine", antonym: "overt", example: "Covert persuasion can quickly become manipulative." },
      { word: "empower", meaningEn: "to give someone confidence, authority, or control", meaningAr: "يُمكّن ويمنح القوة", synonym: "enable", antonym: "disempower", example: "Transparent policies empower citizens." },
    ],
    questions: [
      { kind: "comprehension", prompt: "How does behavioural economics differ from classical economic theory?", options: ["It ignores money completely", "It uses psychology and real evidence showing people rely on heuristics and biases", "It assumes every choice is mathematically optimal", "It forbids saving money"], correct: 1, explanation: { en: "Paragraph 1 contrasts rational calculators with empirical findings on heuristics and biases.", ar: "تقارن الفقرة الأولى بين الافتراض العقلاني المحض والأدلة التجريبية حول الاختصارات والانحيازات." } },
      { kind: "comprehension", prompt: "What does 'loss aversion' describe?", options: ["Preferring to lose money", "Feeling a loss roughly twice as strongly as an equal gain", "Changing default settings every week", "Avoiding all banks"], correct: 1, explanation: { en: "Paragraph 2 states losing a sum causes roughly twice the distress that an equal gain brings in pleasure.", ar: "توضح الفقرة الثانية أن ألم الخسارة يعادل تقريبًا ضعف متعة الربح المماثل." } },
      { kind: "comprehension", prompt: "How does automatic pension enrolment preserve freedom of choice?", options: ["Employees can easily opt out", "Participation is legally mandatory with penalties", "Savings are hidden from workers", "Only managers are enrolled"], correct: 0, explanation: { en: "Paragraph 3 notes it automatically enrols staff while allowing easy opt-out.", ar: "تذكر الفقرة الثالثة أنه يسمح للموظفين بالانسحاب بسهولة متى أرادوا." } },
      { kind: "inference", prompt: "According to the last sentence, what separates an ethical nudge from manipulation?", options: ["Transparency and public accountability", "How much money the company earns", "Using complicated legal terms", "Hiding the default option"], correct: 0, explanation: { en: "The writer contrasts transparent, accountable nudges (empowering) with covert ones (manipulative).", ar: "يميّز الكاتب بين التوجيه الشفاف الخاضع للمساءلة والتأثير الخفي التلاعبي." } },
      { kind: "vocabulary", prompt: "What are 'heuristics' in paragraph 1?", options: ["Mental shortcuts used to make quick decisions", "Government tax laws", "Bank interest rates", "Statistical spreadsheets"], correct: 0, explanation: { en: "The text explicitly defines heuristics as 'mental shortcuts'.", ar: "يعرّف النص heuristics صراحةً بأنها اختصارات ذهنية لاتخاذ القرارات السريعة." } },
      { kind: "vocabulary", prompt: "What does 'status-quo bias' mean?", options: ["A preference for keeping existing or default arrangements", "A desire to change jobs frequently", "A fear of technology", "A habit of comparing every option"], correct: 0, explanation: { en: "Paragraph 2 defines it as sticking with default settings even when better options exist.", ar: "الانحياز للوضع الراهن هو الميل للبقاء على الإعدادات الافتراضية." } },
      { kind: "synonym", prompt: "Which word is a synonym for 'thrifty'?", options: ["frugal", "reckless", "opaque", "fragile"], correct: 0, explanation: { en: "'Frugal' means careful with spending, matching 'thrifty'.", ar: "كلمة frugal (مقتصد) مرادفة لـ thrifty." } },
      { kind: "synonym", prompt: "Which word is closest in meaning to 'empirical'?", options: ["observational", "imaginary", "silent", "temporary"], correct: 0, explanation: { en: "'Observational' reflects evidence gathered from real-world experience, matching 'empirical'.", ar: "كلمة observational (قائم على الملاحظة) تقارب معنى empirical." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'covert'?", options: ["overt", "subtle", "rational", "default"], correct: 0, explanation: { en: "'Overt' means open and clearly visible, the direct opposite of 'covert'.", ar: "كلمة overt (علني وواضح) هي المضاد المباشر لـ covert (خفي)." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'subtle'?", options: ["blatant", "calm", "modest", "careful"], correct: 0, explanation: { en: "'Blatant' means obvious and unsubtle, the opposite of 'subtle'.", ar: "كلمة blatant (صارخ وواضح جدًا) عكس subtle (دقيق ولطيف)." } },
    ],
    pronunciation: "Transparent choice architecture can empower citizens without restricting freedom of choice.",
    pronunciationTip: {
      en: "In 'subtle', the letter 'b' is silent (/ˈsʌt.əl/), and in 'architecture', 'ch' sounds like /k/.",
      ar: "حرف b في subtle صامت (/ˈsʌt.əl/)، وحرفا ch في architecture يُنطقان /k/.",
    },
  }),

  // ===================== C1 PASSAGE 15 =====================
  buildReadingPassageLesson({
    id: "c1-reading-water-security",
    course: "c1",
    unit: { en: "Reading Passage 15 · Engineering & Water", ar: "نص القراءة ١٥ · الهندسة والأمن المائي" },
    title: { en: "Desalination and the Future of Global Water Security", ar: "تحلية المياه ومستقبل الأمن المائي العالمي" },
    goal: {
      en: "Synthesise technical and ecological trade-offs, master C1 engineering vocabulary, and verify pronunciation via ASR.",
      ar: "اربط بين التحديات الهندسية والبيئية، وأتقن مفردات C1 التقنية، وتحقق من النطق عبر الميكروفون.",
    },
    minutes: 35,
    scenario: {
      en: "You are briefing an environmental engineering seminar on next-generation solar desalination in coastal arid nations.",
      ar: "تقدّم إيجازًا في ندوة هندسة بيئية حول الجيل الجديد من تحلية المياه بالطاقة الشمسية.",
    },
    preTask: {
      en: "What are the two biggest environmental challenges of turning seawater into drinking water? Check the 6 key terms.",
      ar: "ما أكبر تحديين بيئيين في تحويل مياه البحر إلى مياه شرب؟ راجع المصطلحات الستة.",
    },
    mainTask: {
      en: "Read the engineering analysis and complete all 10 comprehension, inference, vocabulary, synonym, and antonym questions.",
      ar: "اقرأ التحليل الهندسي وأكمل الأسئلة العشرة في الفهم والاستنتاج والمفردات والمترادفات والأضداد.",
    },
    languageFocus: {
      en: "Process terminology (reverse osmosis, brine valorisation) and evaluative connectors (nonetheless, whereas).",
      ar: "مصطلحات العمليات الهندسية وروابط التقييم والمقارنة.",
    },
    postTask: {
      en: "Speak the target sentence aloud using ASR and explain why brine recovery turns waste into a resource.",
      ar: "انطق الجملة المستهدفة عبر الميكروفون واشرح كيف يحوّل استخلاص المعادن المخلفات إلى مورد.",
    },
    teaching: [
      {
        en: "Map the problem → innovation → remaining trade-off structure across the three paragraphs.",
        ar: "تتبّع بنية النص عبر الفقرات الثلاث: المشكلة ← الابتكار ← التوازن المتبقي.",
      },
      {
        en: "Pay attention to scientific antonyms: viable/unfeasible, intensify/mitigate, discard/reclaim.",
        ar: "انتبه للأضداد العلمية: قابل للتطبيق/غير عملي، يتفاقم/يخفّ، يُهدر/يستعيد.",
      },
    ],
    passage:
      "As freshwater aquifers shrink and urban populations grow across arid regions, seawater desalination has become an indispensable lifeline—particularly across the Arabian Gulf, where modern plants supply the majority of municipal drinking water. Replacing older thermal distillation with reverse-osmosis membranes has already cut energy consumption dramatically over the past twenty years.\n\nNonetheless, conventional desalination poses two persistent ecological challenges: high electricity demand and the disposal of concentrated salty brine back into coastal waters, where excessive salinity can stress marine ecosystems. Researchers are therefore pairing reverse osmosis with utility-scale solar arrays and exploring 'brine mining', a circular process that extracts valuable minerals such as magnesium, lithium, and industrial salt instead of discarding them.\n\nWater strategists emphasise that engineering supply is only half the equation. Even the cleanest desalination plant remains far more viable when paired with leak-free municipal pipe networks, precision drip agriculture, and public conservation habits that treat every cubic metre of freshwater as a strategic asset.",
    vocab: [
      { word: "indispensable", meaningEn: "absolutely essential and impossible to do without", meaningAr: "لا غنى عنه", synonym: "irreplaceable", antonym: "dispensable", example: "Desalination is an indispensable lifeline." },
      { word: "persistent", meaningEn: "continuing firmly despite efforts to solve it", meaningAr: "مستمر ومزمن", synonym: "ongoing", antonym: "fleeting", example: "Two persistent ecological challenges remain." },
      { word: "excessive", meaningEn: "more than is normal, safe, or desirable", meaningAr: "مفرط وزائد عن الحد", synonym: "extreme", antonym: "moderate", example: "Excessive salinity can stress marine life." },
      { word: "discard", meaningEn: "to throw away something considered useless", meaningAr: "يتخلّص من أو يُهمل", synonym: "dispose of", antonym: "reclaim", example: "Brine mining recovers minerals instead of discarding them." },
      { word: "viable", meaningEn: "capable of working successfully and sustainably", meaningAr: "قابل للتطبيق ومُجدٍ", synonym: "feasible", antonym: "unworkable", example: "Plants are more viable alongside water conservation." },
      { word: "conservation", meaningEn: "careful protection and wise use of natural resources", meaningAr: "الحفاظ والترشيد", synonym: "preservation", antonym: "wastage", example: "Public conservation protects freshwater assets." },
    ],
    questions: [
      { kind: "comprehension", prompt: "What technological shift dramatically cut desalination energy use?", options: ["Returning to coal boilers", "Replacing thermal distillation with reverse-osmosis membranes", "Pumping deeper aquifers", "Shipping icebergs"], correct: 1, explanation: { en: "Paragraph 1 says replacing older thermal distillation with reverse-osmosis membranes cut energy use.", ar: "توضح الفقرة الأولى أن استبدال التقطير الحراري بأغشية التناضح العكسي خفّض استهلاك الطاقة بشكل كبير." } },
      { kind: "comprehension", prompt: "What are the two ecological challenges of conventional desalination?", options: ["Noise and dust", "High electricity demand and concentrated brine disposal", "Cold oceans and heavy rain", "Short pipe lengths and plastic taste"], correct: 1, explanation: { en: "Paragraph 2 identifies high electricity demand and concentrated salty brine disposal.", ar: "تحدد الفقرة الثانية ارتفاع استهلاك الكهرباء والتخلص من المحلول الملحي المركّز." } },
      { kind: "comprehension", prompt: "What does 'brine mining' achieve?", options: ["It extracts valuable minerals like magnesium and lithium from waste brine", "It digs freshwater wells inland", "It turns salt into oil", "It increases marine salinity"], correct: 0, explanation: { en: "Paragraph 2 describes brine mining as extracting magnesium, lithium, and industrial salt instead of discarding them.", ar: "تصف الفقرة الثانية تعدين المحلول الملحي باستخلاص معادن ثمينة كالمغنيسيوم والليثيوم." } },
      { kind: "inference", prompt: "What do water strategists imply by 'engineering supply is only half the equation'?", options: ["Preventing leaks and conserving water are just as critical as producing more water", "Engineers should stop improving membranes", "Agriculture needs no water", "Desalination is unnecessary"], correct: 0, explanation: { en: "Paragraph 3 pairs supply plants with leak-free pipes, drip agriculture, and conservation habits.", ar: "تربط الفقرة الثالثة إنتاج المياه بتقليل الفاقد وترشيد الاستهلاك كعنصرين متكاملين." } },
      { kind: "vocabulary", prompt: "What are 'aquifers' in paragraph 1?", options: ["Underground layers of rock holding natural freshwater", "Floating solar panels", "Coastal shipping ports", "Water filtration pipes"], correct: 0, explanation: { en: "Freshwater aquifers are natural underground water reserves.", ar: "الخزانات الجوفية (aquifers) هي طبقات صخرية تحت الأرض تحفظ المياه العذبة." } },
      { kind: "vocabulary", prompt: "What does 'salinity' mean in paragraph 2?", options: ["The level of dissolved salt in water", "Water temperature", "Wave height", "Solar panel efficiency"], correct: 0, explanation: { en: "Salinity measures salt concentration, which rises when concentrated brine is discharged.", ar: "الملوحة (salinity) هي نسبة الأملاح الذائبة في الماء." } },
      { kind: "synonym", prompt: "Which word is a synonym for 'viable'?", options: ["feasible", "harmful", "ancient", "fragile"], correct: 0, explanation: { en: "'Feasible' means practical and capable of succeeding, matching 'viable'.", ar: "كلمة feasible (ممكن وقابل للتطبيق) مرادفة لـ viable." } },
      { kind: "synonym", prompt: "Which word is closest in meaning to 'indispensable'?", options: ["irreplaceable", "optional", "ordinary", "temporary"], correct: 0, explanation: { en: "'Irreplaceable' expresses something you cannot do without, matching 'indispensable'.", ar: "كلمة irreplaceable (لا يُعوّض ولا غنى عنه) مرادفة لـ indispensable." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'discard'?", options: ["reclaim", "shrink", "stress", "pump"], correct: 0, explanation: { en: "'Reclaim' means to recover and put back to use, the opposite of 'discard'.", ar: "الفعل reclaim (يستعيد للاستفادة) عكس discard (يتخلّص من)." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'excessive'?", options: ["moderate", "salty", "persistent", "coastal"], correct: 0, explanation: { en: "'Moderate' means within reasonable limits, the opposite of 'excessive'.", ar: "كلمة moderate (معتدل) مضاد excessive (مفرط)." } },
    ],
    pronunciation: "Solar-powered reverse osmosis and brine mining turn coastal desalination into a viable circular system.",
    pronunciationTip: {
      en: "Stress 'osMOsis' on the second syllable and 'VIable' on the first (/ˈvaɪ.ə.bəl/).",
      ar: "انبر المقطع الثاني في osMOsis والأول في VIable بوضوح.",
    },
  }),

  // ===================== C2 PASSAGE 16 =====================
  buildReadingPassageLesson({
    id: "c2-reading-linguistic-relativity",
    course: "c2",
    unit: { en: "Reading Passage 16 · Philosophy & Language", ar: "نص القراءة ١٦ · الفلسفة واللغة" },
    title: { en: "Linguistic Relativity: Does Language Shape Thought?", ar: "النسبية اللغوية: هل تُشكّل اللغة طريقة تفكيرنا؟" },
    goal: {
      en: "Evaluate nuanced philosophical distinctions at C2 level, master precision vocabulary with synonyms and antonyms, and verify prosody.",
      ar: "قيّم الفروق الفلسفية الدقيقة بمستوى C2، وأتقن المفردات الرفيعة مع المترادفات والأضداد، وتحقق من الإيقاع الصوتي.",
    },
    minutes: 35,
    scenario: {
      en: "You are preparing a critical response for a postgraduate linguistics colloquium comparing strong vs. moderate linguistic relativity.",
      ar: "تُعدّ مداخلة نقدية لندوة دراسات عليا في اللسانيات تقارن بين النسبية اللغوية القوية والمعتدلة.",
    },
    preTask: {
      en: "Reflect on how thinking in Arabic versus English shifts what you notice first in a sentence. Study the 6 C2 terms.",
      ar: "تأمّل كيف يغيّر التفكير بالعربية مقابل الإنجليزية ما تلاحظه أولًا في الجملة، وادرس المصطلحات الستة.",
    },
    mainTask: {
      en: "Read the essay carefully and answer all 10 questions covering nuance, inference, vocabulary, synonyms, and antonyms.",
      ar: "اقرأ المقال بعناية وأجب عن الأسئلة العشرة في الفهم الدقيق والاستنتاج والمفردات والمترادفات والأضداد.",
    },
    languageFocus: {
      en: "Distinguishing determinism from influence (prison vs. lens) and C2 academic hedging.",
      ar: "التمييز الدقيق بين الحتمية والتأثير ولغة التحفّظ الأكاديمي في C2.",
    },
    postTask: {
      en: "Record the closing thesis sentence via ASR with controlled academic stress and pausing.",
      ar: "سجّل جملة الخاتمة الأكاديمية عبر الميكروفون مع ضبط النبر والوقفات.",
    },
    teaching: [
      {
        en: "At C2, pay close attention to metaphors ('prison' vs. 'spotlight' / 'habitual lens') that carry the author's core claim.",
        ar: "في مستوى C2، انتبه للاستعارات (السجن مقابل العدسة أو الضوء الكاشف) لأنها تحمل أطروحة الكاتب.",
      },
      {
        en: "Distinguish fine lexical contrasts: untenable/defensible, salient/obscure, constrain/facilitate.",
        ar: "ميّز الفروق الدقيقة: غير قابل للدفاع/راسخ، بارز/مغمور، يقيّد/ييسّر.",
      },
    ],
    passage:
      "Few debates in cognitive science have proved as enduring as the hypothesis of linguistic relativity—the proposal that the structure of a speaker's native language shapes habitual patterns of perception and memory. Early twentieth-century formulations were sometimes caricatured as strict linguistic determinism, the untenable claim that people are literally incapable of conceiving thoughts for which their tongue lacks a dedicated word.\n\nContemporary psycholinguistics rejects that rigid prison metaphor while uncovering compelling evidence for a subtler influence. Languages differ not so much in what they allow speakers to express as in what they oblige speakers to attend to every time they speak. Some languages require marking exact cardinal directions—north, south, east, west—instead of 'left' and 'right', cultivating an extraordinary internal compass; others encode grammatical gender or evidentiality, subtly nudging which details remain most salient in memory.\n\nSeen through this nuanced lens, learning a second language does far more than supply interchangeable labels for fixed concepts. Bilingualism widens one's perceptual spotlight, revealing that familiar grammatical habits are contingent conventions rather than immutable laws of human cognition.",
    vocab: [
      { word: "untenable", meaningEn: "impossible to defend against criticism or evidence", meaningAr: "غير قابل للدفاع عنه منطقيًا", synonym: "indefensible", antonym: "defensible", example: "Strict determinism proved scientifically untenable." },
      { word: "rigid", meaningEn: "inflexible and unable to adapt", meaningAr: "صارم وجامد", synonym: "inflexible", antonym: "flexible", example: "Modern science rejects that rigid prison metaphor." },
      { word: "compelling", meaningEn: "convincing and powerfully supported", meaningAr: "مُقنع وقوي الحجة", synonym: "persuasive", antonym: "unconvincing", example: "Experiments offer compelling evidence of subtle effects." },
      { word: "salient", meaningEn: "most noticeable, prominent, or important", meaningAr: "بارز ولافت للانتباه", synonym: "prominent", antonym: "inconspicuous", example: "Grammar shapes which details remain salient." },
      { word: "contingent", meaningEn: "dependent on circumstance rather than necessary", meaningAr: "نسبي ومرتبط بالسياق", synonym: "conditional", antonym: "immutable", example: "Grammatical habits are contingent conventions." },
      { word: "immutable", meaningEn: "unchanging over time and impossible to alter", meaningAr: "ثابت لا يتغيّر", synonym: "unchangeable", antonym: "mutable", example: "Language rules are not immutable laws of thought." },
    ],
    questions: [
      { kind: "comprehension", prompt: "Why does paragraph 1 describe strict linguistic determinism as 'untenable'?", options: ["Because people can still conceive ideas even without a single dedicated word", "Because nobody studies languages anymore", "Because dictionaries are incomplete", "Because memory never uses words"], correct: 0, explanation: { en: "Paragraph 1 defines strict determinism as the untenable claim that speakers cannot even conceive thoughts lacking a dedicated word.", ar: "توضح الفقرة الأولى أن الحتمية الصارمة تزعم استحالة تصور فكرة دون كلمة مفردة لها، وهو ادعاء غير قابل للدفاع." } },
      { kind: "comprehension", prompt: "According to paragraph 2, where do languages genuinely differ most?", options: ["In what they oblige speakers to pay attention to routinely", "In whether speakers can learn mathematics", "In the speed of human vision", "In whether people have memories"], correct: 0, explanation: { en: "Languages differ less in what they allow and more in what they oblige speakers to attend to habitually.", ar: "تختلف اللغات فيما تُلزم المتحدث بالانتباه إليه باستمرار عند الكلام." } },
      { kind: "comprehension", prompt: "What example illustrates an 'extraordinary internal compass'?", options: ["Languages requiring cardinal directions (north/south/east/west) instead of left/right", "Languages with many adjectives for colours", "Languages without past tense", "Languages written from top to bottom"], correct: 0, explanation: { en: "Paragraph 2 cites languages requiring cardinal directions rather than egocentric left/right.", ar: "تستشهد الفقرة الثانية باللغات التي تتطلب استخدام الجهات الأصلية بدل اليمين واليسار." } },
      { kind: "inference", prompt: "What broader value of bilingualism does the author champion in paragraph 3?", options: ["It reveals that one's native mental habits are conventions rather than universal absolutes", "It guarantees perfect translation of every word", "It replaces cultural memory", "It slows down thinking"], correct: 0, explanation: { en: "Bilingualism widens the perceptual spotlight and exposes native grammar as contingent convention.", ar: "تُوسّع ثنائية اللغة زاوية الإدراك وتُظهر أن العادات اللغوية اصطلاحات نسبية وليست قوانين مطلقة." } },
      { kind: "vocabulary", prompt: "What does 'caricatured' mean in paragraph 1?", options: ["Oversimplified or exaggerated in a distorted way", "Praised by scientists", "Translated accurately", "Published in a novel"], correct: 0, explanation: { en: "To caricature an idea is to reduce it to an exaggerated, extreme version.", ar: "الفعل caricatured يعني صُوّر بصورة مبالَغ فيها ومبسّطة بشكل مشوّه." } },
      { kind: "vocabulary", prompt: "What does 'evidentiality' refer to in linguistics (paragraph 2)?", options: ["Grammatical markers showing how the speaker knows a fact", "Legal contracts in court", "Spelling errors in essays", "Loud pronunciation"], correct: 0, explanation: { en: "Evidentiality encodes the source of knowledge (seen firsthand, heard, inferred) directly in grammar.", ar: "الدلالة الإثباتية (evidentiality) هي علامات نحوية توضّح مصدر معرفة المتحدث بالخبر." } },
      { kind: "synonym", prompt: "Which word is a synonym for 'salient'?", options: ["prominent", "hidden", "temporary", "arbitrary"], correct: 0, explanation: { en: "'Prominent' means standing out clearly, matching 'salient'.", ar: "كلمة prominent (بارز) مرادفة لـ salient." } },
      { kind: "synonym", prompt: "Which word is closest in meaning to 'compelling'?", options: ["persuasive", "hesitant", "rigid", "trivial"], correct: 0, explanation: { en: "'Persuasive' means convincingly supported, matching 'compelling'.", ar: "كلمة persuasive (مُقنع) مرادفة لـ compelling." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'untenable'?", options: ["defensible", "fragile", "covert", "obscure"], correct: 0, explanation: { en: "'Defensible' means able to withstand scrutiny, the opposite of 'untenable'.", ar: "كلمة defensible (قابل للدفاع عنه) مضاد untenable." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'immutable'?", options: ["mutable", "eternal", "strict", "salient"], correct: 0, explanation: { en: "'Mutable' means changeable, the direct morphological opposite of 'immutable'.", ar: "كلمة mutable (قابل للتغيّر) عكس immutable (ثابت لا يتغيّر)." } },
    ],
    pronunciation: "Bilingualism widens our perceptual spotlight and reveals familiar habits as contingent conventions.",
    pronunciationTip: {
      en: "Articulate 'perCEP-tual' (/pəˈsep.tʃu.əl/) and 'conTINgent' (/kənˈtɪn.dʒənt/) with balanced academic cadence.",
      ar: "انطق perCEP-tual وconTINgent بتوازن وإيقاع أكاديمي واضح دون عجلة.",
    },
  }),

  // ===================== C2 PASSAGE 17 =====================
  buildReadingPassageLesson({
    id: "c2-reading-algorithmic-governance",
    course: "c2",
    unit: { en: "Reading Passage 17 · Law & Technology", ar: "نص القراءة ١٧ · القانون والتقنية" },
    title: { en: "Algorithmic Governance and Public Accountability", ar: "الحوكمة الخوارزمية والمساءلة العامة" },
    goal: {
      en: "Dissect policy arguments on automated public systems, master C2 legal/institutional vocabulary, and verify pronunciation.",
      ar: "حلّل الحجج السياساتية حول الأنظمة العامة المؤتمتة، وأتقن مفردات C2 القانونية والمؤسسية، وتحقق من النطق.",
    },
    minutes: 35,
    scenario: {
      en: "You are reviewing a white paper advising ministries on auditing automated scoring systems used in public services.",
      ar: "تراجع ورقة سياسات تنصح الجهات الحكومية بكيفية تدقيق الأنظمة الخوارزمية المستخدمة في الخدمات العامة.",
    },
    preTask: {
      en: "If an algorithm denies a citizen's application, what right to explanation should exist? Preview the 6 C2 terms.",
      ar: "إذا رفض نظام خوارزمي طلب مواطن، ما الحق الذي ينبغي ضمانه في التفسير والمراجعة؟ راجع المصطلحات الستة.",
    },
    mainTask: {
      en: "Read the policy essay and complete all 10 comprehension, inference, vocabulary, synonym, and antonym questions.",
      ar: "اقرأ مقال السياسات وأكمل الأسئلة العشرة في الفهم والاستنتاج والمفردات والمترادفات والأضداد.",
    },
    languageFocus: {
      en: "Institutional precision (due process, contestability, proportionality) and formal concession structures.",
      ar: "الدقة المؤسسية والقانونية (الإجراءات الواجبة، قابلية الطعن، التناسب).",
    },
    postTask: {
      en: "Speak the institutional thesis aloud via ASR and name one safeguard required for fair digital public services.",
      ar: "انطق الأطروحة المؤسسية عبر الميكروفون واذكر ضابطًا واحدًا يضمن عدالة الخدمات الرقمية.",
    },
    teaching: [
      {
        en: "Track how the writer avoids extreme positions—praising efficiency gains while demanding legal contestability.",
        ar: "تتبّع كيف يتجنّب الكاتب التطرّف، فيُقرّ بمكاسب الكفاءة مع اشتراط قابلية المراجعة القانونية.",
      },
      {
        en: "Learn high-register legal antonyms: arbitrary/principled, erode/fortify, commensurate/disproportionate.",
        ar: "تعلّم الأضداد القانونية الرفيعة: تعسفي/مبدئي، يُضعف/يعزّز، متناسب/غير متناسب.",
      },
    ],
    passage:
      "Public institutions increasingly deploy automated decision systems to triage welfare applications, allocate urban inspections, and flag tax anomalies at scales no human bureaucracy could match. Proponents rightly highlight faster turnaround times and the potential to replace idiosyncratic personal favouritism with uniform criteria.\n\nYet efficiency alone cannot confer civic legitimacy. When proprietary software classifies citizens using opaque correlations drawn from imperfect historical records, past inequities risk being encoded under a veneer of mathematical objectivity. Worse still, if affected individuals have no intelligible explanation of an adverse ruling—and no meaningful avenue to contest it—algorithmic speed can quietly erode due process and public trust.\n\nForward-looking regulators therefore treat automation as a governance question rather than a purely technical upgrade. Independent impact audits, human appeal mechanisms, and safeguards commensurate with the stakes of each decision ensure that digital infrastructure fortifies institutional fairness instead of insulating errors from scrutiny.",
    vocab: [
      { word: "idiosyncratic", meaningEn: "peculiar to an individual rather than consistent", meaningAr: "فردي ومزاجي غير موحّد", synonym: "personal", antonym: "uniform", example: "Systems aim to replace idiosyncratic favouritism." },
      { word: "confer", meaningEn: "to grant or bestow a quality, status, or right", meaningAr: "يمنح أو يُضفي صفة", synonym: "bestow", antonym: "revoke", example: "Efficiency alone cannot confer legitimacy." },
      { word: "adverse", meaningEn: "harmful, unfavourable, or working against someone", meaningAr: "سلبي أو غير مواتٍ", synonym: "unfavourable", antonym: "favourable", example: "Citizens deserve reasons for an adverse ruling." },
      { word: "erode", meaningEn: "to wear away or weaken gradually", meaningAr: "يُضعف ويُقوّض تدريجيًا", synonym: "undermine", antonym: "fortify", example: "Opaque rulings can erode public trust." },
      { word: "commensurate", meaningEn: "matching in size, degree, or seriousness", meaningAr: "متناسب ومتكافئ مع", synonym: "proportionate", antonym: "disproportionate", example: "Safeguards must be commensurate with the stakes." },
      { word: "scrutiny", meaningEn: "careful, critical examination and oversight", meaningAr: "التدقيق والفحص الصارم", synonym: "inspection", antonym: "neglect", example: "Errors must never be insulated from scrutiny." },
    ],
    questions: [
      { kind: "comprehension", prompt: "What two benefits do supporters claim for automated public decision systems?", options: ["Higher taxes and larger offices", "Faster turnaround times and replacing favouritism with uniform criteria", "Eliminating laws and courts", "Removing all human employees"], correct: 1, explanation: { en: "Paragraph 1 cites faster turnaround times and uniform criteria instead of idiosyncratic favouritism.", ar: "تذكر الفقرة الأولى سرعة الإنجاز واستبدال المحاباة الشخصية بمعايير موحّدة." } },
      { kind: "comprehension", prompt: "What danger arises when software learns from imperfect historical records?", options: ["Past inequities can be encoded while appearing mathematically objective", "Software runs too slowly", "Historical archives are deleted", "Citizens stop paying taxes"], correct: 0, explanation: { en: "Paragraph 2 warns past inequities risk being encoded under a veneer of mathematical objectivity.", ar: "تحذّر الفقرة الثانية من ترسيخ مظالم الماضي تحت غطاء من الموضوعية الرياضية." } },
      { kind: "comprehension", prompt: "Which safeguards do forward-looking regulators require?", options: ["Secrecy agreements and faster hardware", "Independent audits, human appeal mechanisms, and proportionate safeguards", "Banning all digital portals", "Removing public explanations"], correct: 1, explanation: { en: "Paragraph 3 lists independent impact audits, human appeal mechanisms, and safeguards commensurate with the stakes.", ar: "تذكر الفقرة الثالثة التدقيق المستقل وآليات التظلّم البشري والضمانات المتناسبة مع أهمية القرار." } },
      { kind: "inference", prompt: "What does 'insulating errors from scrutiny' imply in the final line?", options: ["Shielding mistakes behind technical complexity so nobody can challenge or fix them", "Fixing software bugs overnight", "Making servers waterproof", "Publishing open code"], correct: 0, explanation: { en: "Without audits and appeals, automated mistakes become shielded from public review and correction.", ar: "حماية الأخطاء من التدقيق تعني تحصينها خلف التعقيد التقني بحيث يصعب مراجعتها أو تصحيحها." } },
      { kind: "vocabulary", prompt: "What does 'veneer' mean in paragraph 2 ('a veneer of mathematical objectivity')?", options: ["A thin surface appearance that hides flaws underneath", "A proven mathematical theorem", "A legal court order", "A government budget"], correct: 0, explanation: { en: "A veneer is a misleadingly attractive surface layer concealing deeper problems.", ar: "كلمة veneer تعني قشرة سطحية خادعة تخفي عيوبًا أعمق." } },
      { kind: "vocabulary", prompt: "What does 'due process' refer to in paragraph 2?", options: ["Fair, established legal procedures protecting individuals' rights", "A software loading bar", "Monthly utility billing", "Fast data compression"], correct: 0, explanation: { en: "Due process guarantees fair treatment, notice, and the right to be heard before adverse state decisions.", ar: "الإجراءات القانونية الواجبة (due process) تضمن العدالة وحق التفسير والتظلّم." } },
      { kind: "synonym", prompt: "Which word is a synonym for 'commensurate'?", options: ["proportionate", "arbitrary", "covert", "obsolete"], correct: 0, explanation: { en: "'Proportionate' means matching in scale or seriousness, matching 'commensurate'.", ar: "كلمة proportionate (متناسب) مرادفة مباشرة لـ commensurate." } },
      { kind: "synonym", prompt: "Which word is closest in meaning to 'erode'?", options: ["undermine", "bolster", "verify", "initiate"], correct: 0, explanation: { en: "'Undermine' means to weaken gradually, matching 'erode'.", ar: "الفعل undermine (يُقوّض ويُضعف) مرادف لـ erode." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'adverse'?", options: ["favourable", "uniform", "civic", "complex"], correct: 0, explanation: { en: "'Favourable' means beneficial or supportive, the direct opposite of 'adverse'.", ar: "كلمة favourable (مواتٍ وإيجابي) مضاد adverse (سلبي)." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'confer' (grant legitimacy)?", options: ["revoke", "allocate", "inspect", "deploy"], correct: 0, explanation: { en: "'Revoke' means to withdraw or take away a status or right, opposite of 'confer'.", ar: "الفعل revoke (يسحب أو يُلغي) عكس confer (يمنح)." } },
    ],
    pronunciation: "Independent audits and human appeals ensure digital governance fortifies public legitimacy.",
    pronunciationTip: {
      en: "Stress 'leGITimacy' (/ləˈdʒɪt.ə.mə.si/) on the second syllable and keep 'gov-er-nance' smooth across three syllables.",
      ar: "انبر المقطع الثاني في leGITimacy وانطق governance بسلاسة في ثلاثة مقاطع.",
    },
  }),

  // ===================== C2 PASSAGE 18 =====================
  buildReadingPassageLesson({
    id: "c2-reading-longevity-healthspan",
    course: "c2",
    unit: { en: "Reading Passage 18 · Medicine & Demography", ar: "نص القراءة ١٨ · الطب والديموغرافيا" },
    title: { en: "The Science of Longevity and Healthspan Economics", ar: "علم طول العمر واقتصاديات العمر الصحي" },
    goal: {
      en: "Synthesise biomedical and demographic arguments at C2 level, master precision vocabulary with synonyms/antonyms, and check pronunciation.",
      ar: "اربط بين الحجج الطبية والديموغرافية بمستوى C2، وأتقن المفردات الرفيعة مع المترادفات والأضداد، وتحقق من النطق.",
    },
    minutes: 35,
    scenario: {
      en: "You are reviewing an executive briefing on why national healthcare systems are shifting from lifespan to healthspan.",
      ar: "تراجع إيجازًا تنفيذيًا يشرح لماذا تنتقل الأنظمة الصحية من التركيز على عدد سنوات العمر إلى سنوات الحياة الصحية.",
    },
    preTask: {
      en: "Explain in your own words the difference between living longer (lifespan) and staying healthy longer (healthspan). Preview the 6 terms.",
      ar: "فرّق بكلماتك بين طول العمر (lifespan) والعمر الصحي (healthspan)، ثم راجع المصطلحات الستة.",
    },
    mainTask: {
      en: "Read the executive briefing and complete all 10 comprehension, inference, vocabulary, synonym, and antonym questions.",
      ar: "اقرأ الإيجاز وأكمل الأسئلة العشرة في الفهم والاستنتاج والمفردات والمترادفات والأضداد.",
    },
    languageFocus: {
      en: "Reframing policy paradigms (the decisive metric is not merely...) and C2 biomedical/economic vocabulary.",
      ar: "إعادة تأطير السياسات العامة ومفردات الطب الوقائي والاقتصاد الديموغرافي.",
    },
    postTask: {
      en: "Record the closing statement via ASR and identify one preventive habit with high lifelong return.",
      ar: "سجّل الجملة الختامية عبر الميكروفون وحدّد عادة وقائية واحدة ذات عائد صحي طويل الأمد.",
    },
    teaching: [
      {
        en: "Notice how C2 policy prose balances biomedical optimism with pragmatic public-health realism.",
        ar: "لاحظ كيف توازن النصوص السياساتية في C2 بين التفاؤل العلمي والواقعية الصحية.",
      },
      {
        en: "Pay attention to formal word pairs: preventive/curative, acute/chronic, squander/reap.",
        ar: "انتبه لأزواج الكلمات الرسمية: وقائي/علاجي، حاد/مزمن، يُبدّد/يجني.",
      },
    ],
    passage:
      "Over the past century, sanitation, vaccines, and antibiotics produced a remarkable triumph: global average life expectancy more than doubled. Yet demographers and physicians increasingly warn that extending lifespan without expanding 'healthspan'—the years lived free from debilitating chronic disease—places unsustainable strain on families, labour markets, and public health budgets.\n\nHistorically, modern medicine excelled at acute intervention: repairing fractures, halting infections, and stabilising emergencies. Confronting metabolic, cardiovascular, and neurodegenerative decline requires a fundamentally different preventive paradigm. Rather than waiting for pathology to manifest in late middle age, longevity researchers advocate early biomarker screening, sustained muscular strength training, nutritious whole diets, and social connectedness—interventions whose cumulative dividends compound quietly across decades.\n\nEconomists estimate that compressing late-life morbidity by even a single healthy year generates substantial societal value by keeping experienced citizens active, independent, and engaged. Ultimately, the true dividend of longevity science lies not in chasing speculative immortality, but in making everyday preventive health equitable and accessible across every stratum of society.",
    vocab: [
      { word: "debilitating", meaningEn: "causing serious physical or mental weakness", meaningAr: "مُنهِك ومُضعِف بشدة", synonym: "crippling", antonym: "invigorating", example: "Chronic illnesses can be deeply debilitating." },
      { word: "acute", meaningEn: "sudden and severe, requiring immediate care", meaningAr: "حاد وعاجل", synonym: "urgent", antonym: "chronic", example: "Medicine excels at acute emergency intervention." },
      { word: "paradigm", meaningEn: "a fundamental model or framework for thinking", meaningAr: "نموذج فكري وإطار عمل", synonym: "framework", antonym: "anomaly", example: "Prevention demands a new medical paradigm." },
      { word: "cumulative", meaningEn: "increasing gradually through repeated additions", meaningAr: "تراكمي", synonym: "compounding", antonym: "isolated", example: "Daily habits yield cumulative dividends." },
      { word: "speculative", meaningEn: "based on unproven conjecture rather than solid proof", meaningAr: "تخميني وغير مثبت بعد", synonym: "conjectural", antonym: "proven", example: "Focus on health rather than speculative immortality." },
      { word: "equitable", meaningEn: "fair, just, and impartially accessible to all", meaningAr: "عادل ومنصف للجميع", synonym: "fair", antonym: "inequitable", example: "Preventive care must remain equitable." },
    ],
    questions: [
      { kind: "comprehension", prompt: "How does the passage define 'healthspan'?", options: ["Total number of years a person lives", "The years lived free from debilitating chronic disease", "The length of a hospital stay", "The retirement age of physicians"], correct: 1, explanation: { en: "Paragraph 1 explicitly defines healthspan as the years lived free from debilitating chronic disease.", ar: "تعرّف الفقرة الأولى العمر الصحي بأنه السنوات التي يعيشها الإنسان خاليًا من الأمراض المزمنة المنهِكة." } },
      { kind: "comprehension", prompt: "What has modern medicine historically excelled at according to paragraph 2?", options: ["Acute interventions like treating infections and emergencies", "Preventing every chronic disease", "Guaranteeing immortality", "Eliminating public budgets"], correct: 0, explanation: { en: "Paragraph 2 cites repairing fractures, halting infections, and stabilising emergencies.", ar: "تذكر الفقرة الثانية تميّز الطب الحديث في التدخلات الحادة كعلاج الكسور والعدوى والطوارئ." } },
      { kind: "comprehension", prompt: "Which preventive pillars are recommended by longevity researchers?", options: ["Speculative supplements alone", "Early screening, strength training, whole diets, and social connectedness", "Avoiding exercise after age forty", "Reducing sanitation standards"], correct: 1, explanation: { en: "Paragraph 2 names early biomarker screening, muscular strength training, nutritious whole diets, and social connectedness.", ar: "تعدد الفقرة الثانية الفحص المبكر وتمارين القوة والغذاء الصحي والترابط الاجتماعي." } },
      { kind: "inference", prompt: "What attitude does the author hold toward 'chasing speculative immortality'?", options: ["Sceptical—practical, equitable prevention is far more valuable", "Enthusiastic—it is the sole purpose of economics", "Indifferent—vaccines no longer matter", "Convinced it will arrive next year"], correct: 0, explanation: { en: "The final sentence explicitly rejects speculative immortality in favour of equitable everyday preventive health.", ar: "ترفض الجملة الأخيرة ملاحقة الخلود التخميني لصالح جعل الصحة الوقائية العادلة متاحة للجميع." } },
      { kind: "vocabulary", prompt: "What does 'morbidity' mean in paragraph 3 ('compressing late-life morbidity')?", options: ["The state or period of suffering from illness", "Financial savings", "Population growth", "Physical fitness"], correct: 0, explanation: { en: "In medical demography, morbidity means illness/disease burden; compressing it means fewer sick years.", ar: "الاعتلال المرضي (morbidity) يعني فترة المعاناة من المرض، وتقليصها يعني سنوات صحية أطول." } },
      { kind: "vocabulary", prompt: "What does 'every stratum of society' mean in the last sentence?", options: ["Every socioeconomic level or group in society", "Every hospital floor", "Every decade of history", "Every research laboratory"], correct: 0, explanation: { en: "A stratum is a social layer/group, so 'every stratum' means rich and poor alike.", ar: "كل شريحة وطبقات المجتمع كافة دون استثناء." } },
      { kind: "synonym", prompt: "Which word is a synonym for 'paradigm'?", options: ["framework", "vaccine", "symptom", "fraction"], correct: 0, explanation: { en: "'Framework' captures a foundational model of thought or practice, matching 'paradigm'.", ar: "كلمة framework (إطار عمل ونموذج) مرادفة لـ paradigm." } },
      { kind: "synonym", prompt: "Which word is closest in meaning to 'equitable'?", options: ["fair", "costly", "urgent", "hidden"], correct: 0, explanation: { en: "'Fair' and 'equitable' both mean just and accessible without unfair bias.", ar: "كلمة fair (عادل ومنصف) مرادفة لـ equitable." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'acute' in medical English?", options: ["chronic", "clean", "active", "whole"], correct: 0, explanation: { en: "'Chronic' describes long-term gradual conditions, the classic medical opposite of 'acute'.", ar: "كلمة chronic (مزمن) هي المضاد الطبي المباشر لـ acute (حاد وعاجل)." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'speculative'?", options: ["proven", "quiet", "medical", "modern"], correct: 0, explanation: { en: "'Proven' means established by reliable evidence, the opposite of 'speculative'.", ar: "كلمة proven (مثبت بالدليل) عكس speculative (تخميني)." } },
    ],
    pronunciation: "The true dividend of longevity science lies in making preventive health equitable across society.",
    pronunciationTip: {
      en: "Watch the silent 'g' in 'paradigm' (/ˈpær.ə.daɪm/) and stress the first syllable of 'EQuitable' (/ˈek.wɪ.tə.bəl/).",
      ar: "حرف g في paradigm صامت (/ˈpær.ə.daɪm/)، وانبر المقطع الأول في EQuitable.",
    },
  }),
];
