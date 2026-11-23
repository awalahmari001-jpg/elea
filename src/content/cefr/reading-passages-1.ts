import type { Lesson } from "../lesson-types";
import { buildReadingPassageLesson } from "./tbll-helpers";

/**
 * 9 full TBLL Reading Passages for A1, A2, and B1 (3 passages per level).
 * Every passage has 10 varied questions (comprehension, inference, vocabulary,
 * synonyms, antonyms), a 6-word vocabulary table, and an ASR pronunciation drill.
 */
export const READING_PASSAGES_LOWER: Lesson[] = [
  // ===================== A1 PASSAGE 1 =====================
  buildReadingPassageLesson({
    id: "a1-reading-book-fair",
    course: "a1",
    unit: { en: "Reading Passage 1 · Culture", ar: "نص القراءة ١ · الثقافة" },
    title: { en: "A Weekend at the Riyadh Book Fair", ar: "عطلة نهاية أسبوع في معرض الرياض للكتاب" },
    goal: {
      en: "Read a short story about a family visit, identify details, vocabulary, synonyms and antonyms, and practise pronunciation.",
      ar: "اقرأ قصة قصيرة عن زيارة عائلية، وحدّد التفاصيل والمفردات والمترادفات والأضداد، وتدرّب على النطق.",
    },
    minutes: 25,
    scenario: {
      en: "You are planning a family trip to a local book fair and reading a short report from another visitor.",
      ar: "تخطّط لرحلة عائلية إلى معرض كتاب محلي وتقرأ تقريرًا قصيرًا من زائر آخر.",
    },
    preTask: {
      en: "Look at the title and vocabulary table. Predict three things people usually buy or do at a book fair.",
      ar: "انظر إلى العنوان وجدول المفردات، وتوقّع ثلاثة أشياء يشتريها الناس أو يفعلونها في معرض الكتاب.",
    },
    mainTask: {
      en: "Read the passage twice—first for the main story, then to answer all 10 comprehension, vocabulary, synonym, and antonym questions.",
      ar: "اقرأ النص مرتين—أولًا للفكرة العامة، ثم للإجابة عن جميع الأسئلة العشرة في الفهم والمفردات والمترادفات والأضداد.",
    },
    languageFocus: {
      en: "Present simple routines, adjectives describing places (crowded, bright, quiet, cheap), and basic time phrases.",
      ar: "المضارع البسيط والصفات التي تصف الأماكن (مزدحم، مشرق، هادئ، رخيص) وعبارات الوقت الأساسية.",
    },
    postTask: {
      en: "Record the target sentence aloud using the microphone and tell a partner which book you would choose.",
      ar: "سجّل الجملة المستهدفة بصوتك عبر الميكروفون وأخبر زميلك أي كتاب ستختاره.",
    },
    teaching: [
      {
        en: "Skim the first sentence of each paragraph to see where the family goes and what they enjoy most.",
        ar: "تصفّح الجملة الأولى من كل فقرة لمعرفة أين تذهب العائلة وما أكثر ما تستمتع به.",
      },
      {
        en: "When answering synonym and antonym questions, re-read the exact sentence in the passage so the context guides you.",
        ar: "عند الإجابة عن أسئلة المرادفات والأضداد، أعد قراءة الجملة الدقيقة في النص ليقودك السياق.",
      },
    ],
    passage:
      "Every autumn, Nora and her brother Faisal visit the Riyadh Book Fair with their parents. The big hall opens at ten o'clock in the morning, and they always arrive early so they can find a good parking space. Inside, the hall is bright and clean, with hundreds of colourful bookstalls.\n\nNora loves short English stories with clear pictures. She chooses two simple novels and a small dictionary. Faisal prefers science books about stars, rockets, and planets. At noon, the hall becomes very crowded, so the family walks to a quiet corner near the café.\n\nThey sit together, drink warm mint tea, and show each other their new books. Most children's books are cheap, and the friendly staff give every young reader a free bookmark. Before they leave at three o'clock, Nora writes down the name of her favourite author so she can read more next year.",
    vocab: [
      { word: "arrive", meaningEn: "to reach a place", meaningAr: "يصل إلى مكان", synonym: "reach", antonym: "leave", example: "They arrive early at ten o'clock." },
      { word: "bright", meaningEn: "full of light and pleasant", meaningAr: "مشرق ومضيء", synonym: "well-lit", antonym: "dark", example: "The hall is bright and clean." },
      { word: "crowded", meaningEn: "full of many people", meaningAr: "مزدحم بالناس", synonym: "packed", antonym: "empty", example: "At noon, the hall becomes very crowded." },
      { word: "quiet", meaningEn: "making very little noise", meaningAr: "هادئ", synonym: "peaceful", antonym: "noisy", example: "They walk to a quiet corner near the café." },
      { word: "cheap", meaningEn: "costing little money", meaningAr: "رخيص الثمن", synonym: "inexpensive", antonym: "expensive", example: "Most children's books are cheap." },
      { word: "friendly", meaningEn: "kind and helpful to others", meaningAr: "ودود ولطيف", synonym: "kind", antonym: "rude", example: "The friendly staff give every reader a bookmark." },
    ],
    questions: [
      { kind: "comprehension", prompt: "What is the main topic of the passage?", options: ["A family trip to a book fair", "How to open a bookshop", "A science lesson at school", "Cooking tea at home"], correct: 0, explanation: { en: "All three paragraphs describe Nora's family visiting the Riyadh Book Fair.", ar: "الفقرات الثلاث تصف زيارة عائلة نورة لمعرض الرياض للكتاب." } },
      { kind: "comprehension", prompt: "Why does the family arrive early?", options: ["To meet an author", "To find a good parking space", "To eat breakfast at the café", "To buy tickets"], correct: 1, explanation: { en: "Paragraph 1 states they arrive early so they can find a good parking space.", ar: "تذكر الفقرة الأولى أنهم يصلون مبكرًا لإيجاد موقف جيد للسيارة." } },
      { kind: "comprehension", prompt: "What kind of books does Faisal prefer?", options: ["History books", "Short novels", "Science books about space", "Cookbooks"], correct: 2, explanation: { en: "Paragraph 2 says Faisal prefers science books about stars, rockets, and planets.", ar: "توضح الفقرة الثانية أن فيصل يفضل كتب العلوم عن النجوم والصواريخ والكواكب." } },
      { kind: "inference", prompt: "What can we infer about Nora?", options: ["She dislikes reading in English", "She enjoys reading and wants to read more", "She works at the book fair", "She never drinks tea"], correct: 1, explanation: { en: "She buys two novels and writes down her favourite author's name for next year.", ar: "تشتري روايتين وتدوّن اسم مؤلفها المفضل للعام القادم." } },
      { kind: "vocabulary", prompt: "What does the word 'bookmark' mean in the passage?", options: ["A card kept in a book to mark your page", "A ticket for parking", "A type of mint tea", "A table in a café"], correct: 0, explanation: { en: "Book fair staff give young readers a free bookmark to hold their place in a book.", ar: "فاصل الكتاب بطاقة تُوضع داخل الكتاب لتحديد الصفحة." } },
      { kind: "vocabulary", prompt: "In paragraph 1, what are 'bookstalls'?", options: ["Small shops or stands selling books", "Large buses outside the hall", "Chairs inside a library", "Pages inside a dictionary"], correct: 0, explanation: { en: "Bookstalls are stands or tables displaying books for sale at a fair.", ar: "أكشاك الكتب هي منصات عرض وبيع الكتب داخل المعرض." } },
      { kind: "synonym", prompt: "Which word is a synonym for 'crowded'?", options: ["empty", "packed", "slow", "short"], correct: 1, explanation: { en: "'Packed' means full of people, matching the meaning of 'crowded'.", ar: "كلمة packed تعني مكتظ بالناس وهي مرادف لكلمة crowded." } },
      { kind: "synonym", prompt: "Which word is closest in meaning to 'cheap'?", options: ["inexpensive", "heavy", "broken", "difficult"], correct: 0, explanation: { en: "'Inexpensive' means low in price, the same as 'cheap'.", ar: "كلمة inexpensive تعني منخفض السعر مثل cheap." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'quiet'?", options: ["clean", "noisy", "warm", "early"], correct: 1, explanation: { en: "'Noisy' is the direct opposite of 'quiet'.", ar: "كلمة noisy (صاخب) هي المضاد المباشر لكلمة quiet (هادئ)." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'arrive'?", options: ["open", "sit", "leave", "choose"], correct: 2, explanation: { en: "'Leave' means to go away from a place, the opposite of 'arrive'.", ar: "كلمة leave (يغادر) عكس arrive (يصل)." } },
    ],
    pronunciation: "The hall is bright and clean, and the friendly staff give every reader a free bookmark.",
    pronunciationTip: {
      en: "Pronounce the /b/ in bright and book clearly with both lips closed first, and keep the /f/ in friendly soft.",
      ar: "انطق صوت /b/ في bright وbook بوضوح بإغلاق الشفتين أولًا، وحافظ على نعومة صوت /f/ في friendly.",
    },
  }),

  // ===================== A1 PASSAGE 2 =====================
  buildReadingPassageLesson({
    id: "a1-reading-breakfast",
    course: "a1",
    unit: { en: "Reading Passage 2 · Health & Food", ar: "نص القراءة ٢ · الصحة والطعام" },
    title: { en: "Healthy Breakfast Habits Around the World", ar: "عادات الإفطار الصحي حول العالم" },
    goal: {
      en: "Compare breakfast foods across cultures, learn food and health vocabulary with synonyms/antonyms, and check pronunciation.",
      ar: "قارن أطعمة الإفطار في ثقافات مختلفة، وتعلّم مفردات الصحة والطعام مع المترادفات والأضداد، وتحقق من النطق.",
    },
    minutes: 25,
    scenario: {
      en: "Your class is making a poster about healthy morning meals and you read a short article for ideas.",
      ar: "يُعدّ صفك ملصقًا عن وجبات الصباح الصحية وتقرأ مقالًا قصيرًا لجمع الأفكار.",
    },
    preTask: {
      en: "Think about what you eat every morning. Scan the vocabulary list for words describing healthy and unhealthy food.",
      ar: "فكّر فيما تأكله كل صباح، وتصفّح قائمة المفردات للبحث عن كلمات تصف الطعام الصحي وغير الصحي.",
    },
    mainTask: {
      en: "Read the article carefully and complete all 10 comprehension, vocabulary, synonym, and antonym questions.",
      ar: "اقرأ المقال بعناية وأكمل جميع الأسئلة العشرة في الفهم والمفردات والمترادفات والأضداد.",
    },
    languageFocus: {
      en: "Countable and uncountable food nouns (dates, bread, soup, energy) and frequency adverbs (often, usually).",
      ar: "الأسماء المعدودة وغير المعدودة للطعام وظروف التكرار (often، usually).",
    },
    postTask: {
      en: "Read the pronunciation sentence aloud via ASR and describe your own morning meal in two sentences.",
      ar: "اقرأ جملة النطق بصوت عالٍ عبر الميكروفون وصف وجبة صباحك في جملتين.",
    },
    teaching: [
      {
        en: "Look for country names (Saudi Arabia, Japan, Turkey) to locate specific facts quickly.",
        ar: "ابحث عن أسماء الدول (السعودية، اليابان، تركيا) للوصول إلى التفاصيل بسرعة.",
      },
      {
        en: "Contrast clues like 'instead of' or 'better than' often help you guess antonyms and new words.",
        ar: "عبارات المقارنة مثل instead of وbetter than تساعدك في استنتاج الأضداد ومعاني الكلمات الجديدة.",
      },
    ],
    passage:
      "Doctors say that a good breakfast gives your body fresh energy for the whole day. People in different countries enjoy very different morning meals, yet most healthy choices include fruit, grains, or protein.\n\nIn Saudi Arabia, many families start the day with sweet dates, warm flatbread, eggs, and labneh. In Japan, a traditional breakfast often includes steamed rice, hot soup, and grilled fish. In Turkey, people usually put fresh tomatoes, olives, cheese, and honey on the table.\n\nSkipping breakfast can make students feel tired and weak before lunchtime. Drinking plain water instead of sugary juice is also a smart habit. Even a simple bowl of oats with banana takes only five minutes to prepare and keeps you strong all morning.",
    vocab: [
      { word: "fresh", meaningEn: "recently made or picked, not old", meaningAr: "طازج", synonym: "crisp", antonym: "stale", example: "They put fresh tomatoes and cheese on the table." },
      { word: "sweet", meaningEn: "having a pleasant taste like sugar or honey", meaningAr: "حلو المذاق", synonym: "sugary", antonym: "bitter", example: "Many families start the day with sweet dates." },
      { word: "traditional", meaningEn: "part of a long-standing custom", meaningAr: "تقليدي", synonym: "classic", antonym: "modern", example: "A traditional Japanese breakfast includes rice and soup." },
      { word: "tired", meaningEn: "needing rest or sleep", meaningAr: "متعب", synonym: "sleepy", antonym: "energetic", example: "Skipping breakfast can make students feel tired." },
      { word: "strong", meaningEn: "having good physical power and energy", meaningAr: "قوي ونشيط", synonym: "powerful", antonym: "weak", example: "A simple bowl of oats keeps you strong." },
      { word: "simple", meaningEn: "easy to make or understand", meaningAr: "بسيط وسهل", synonym: "easy", antonym: "complex", example: "A simple breakfast takes only five minutes." },
    ],
    questions: [
      { kind: "comprehension", prompt: "What is the main message of the passage?", options: ["Breakfast is unhealthy for students", "Healthy breakfasts around the world give energy", "Only Japanese food is good", "Juice is better than water"], correct: 1, explanation: { en: "The passage explains how healthy morning meals across cultures provide energy.", ar: "يشرح النص كيف تمنح وجبات الإفطار الصحية حول العالم الطاقة للجسم." } },
      { kind: "comprehension", prompt: "Which items are mentioned in a traditional Japanese breakfast?", options: ["Dates and flatbread", "Olives and honey", "Steamed rice, soup, and grilled fish", "Oats and bananas"], correct: 2, explanation: { en: "Paragraph 2 lists steamed rice, hot soup, and grilled fish for Japan.", ar: "تذكر الفقرة الثانية الأرز المطهو على البخار والحساء الساخن والسمك المشوي." } },
      { kind: "comprehension", prompt: "How long does it take to prepare a bowl of oats with banana?", options: ["Two minutes", "Five minutes", "Fifteen minutes", "Thirty minutes"], correct: 1, explanation: { en: "Paragraph 3 states it takes only five minutes to prepare.", ar: "تذكر الفقرة الثالثة أنها تستغرق خمس دقائق فقط." } },
      { kind: "inference", prompt: "Why does the writer recommend plain water instead of sugary juice?", options: ["Water is healthier than sugary drinks", "Juice takes too long to cook", "Water tastes sweeter", "No one likes fruit juice"], correct: 0, explanation: { en: "The writer calls drinking plain water a 'smart habit' as part of a healthy routine.", ar: "يصف الكاتب شرب الماء العادي بأنه عادة ذكية ضمن الروتين الصحي." } },
      { kind: "vocabulary", prompt: "What does 'skipping breakfast' mean?", options: ["Eating breakfast very fast", "Not eating breakfast", "Cooking breakfast for friends", "Buying breakfast at a shop"], correct: 1, explanation: { en: "'Skipping' a meal means missing it or choosing not to eat it.", ar: "عبارة skipping breakfast تعني تفويت وجبة الإفطار وعدم تناولها." } },
      { kind: "vocabulary", prompt: "What does 'prepare' mean in the last sentence?", options: ["To throw away", "To get ready or make", "To forget", "To sell"], correct: 1, explanation: { en: "'Prepare' means to make food ready to eat.", ar: "الفعل prepare يعني يُحضّر أو يُجهّز الطعام." } },
      { kind: "synonym", prompt: "Which word is a synonym for 'simple'?", options: ["easy", "expensive", "loud", "late"], correct: 0, explanation: { en: "'Easy' matches the meaning of 'simple' in preparing food.", ar: "كلمة easy مرادف لكلمة simple بمعنى سهل وبسيط." } },
      { kind: "synonym", prompt: "Which word is closest in meaning to 'traditional'?", options: ["classic", "broken", "quick", "empty"], correct: 0, explanation: { en: "'Classic' and 'traditional' both describe long-established customs.", ar: "كلمة classic تقارب معنى traditional بمعنى تقليدي وأصيل." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'strong'?", options: ["warm", "weak", "fresh", "sweet"], correct: 1, explanation: { en: "'Weak' is the opposite of 'strong' and even appears in paragraph 3.", ar: "كلمة weak (ضعيف) هي مضاد كلمة strong (قوي)." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'fresh' (for bread or food)?", options: ["hot", "stale", "plain", "smart"], correct: 1, explanation: { en: "'Stale' describes old, dry food—the opposite of 'fresh'.", ar: "كلمة stale (قديم/غير طازج) هي عكس كلمة fresh (طازج)." } },
    ],
    pronunciation: "A healthy breakfast gives your body fresh energy and keeps you strong all morning.",
    pronunciationTip: {
      en: "Put the tip of your tongue gently between your teeth for the /θ/ sound in 'healthy', not /s/ or /t/.",
      ar: "ضع طرف لسانك بلطف بين الأسنان لنطق صوت /θ/ في healthy (مثل الثاء) وليس س أو ت.",
    },
  }),

  // ===================== A1 PASSAGE 3 =====================
  buildReadingPassageLesson({
    id: "a1-reading-park-ranger",
    course: "a1",
    unit: { en: "Reading Passage 3 · Jobs & Nature", ar: "نص القراءة ٣ · المهن والطبيعة" },
    title: { en: "A Day in the Life of a Park Ranger", ar: "يوم في حياة حارس المحمية الطبيعية" },
    goal: {
      en: "Understand a workplace profile, build nature and safety vocabulary with synonyms/antonyms, and check pronunciation.",
      ar: "افهم وصفًا لمهنة ميدانية، واكتسب مفردات الطبيعة والسلامة مع المترادفات والأضداد، وتحقق من النطق.",
    },
    minutes: 25,
    scenario: {
      en: "You are visiting a national park and reading an information board about the people who protect the wildlife.",
      ar: "تزور متنزهًا وطنيًا وتقرأ لوحة تعريفية عن الأشخاص الذين يحمون الحياة البرية.",
    },
    preTask: {
      en: "Think of two tasks a park ranger does outdoors. Check the vocabulary bank before reading.",
      ar: "فكّر في مهمتين يؤديهما حارس المحمية في الهواء الطلق، وراجع بنك المفردات قبل القراءة.",
    },
    mainTask: {
      en: "Read the three paragraphs and answer all 10 questions on facts, vocabulary, synonyms, and antonyms.",
      ar: "اقرأ الفقرات الثلاث وأجب عن جميع الأسئلة العشرة في الحقائق والمفردات والمترادفات والأضداد.",
    },
    languageFocus: {
      en: "Daily job verbs (checks, protects, guides, collects) and safety imperatives (stay, keep).",
      ar: "أفعال العمل اليومي (يفحص، يحمي، يرشد، يجمع) وصيغ الإرشاد والسلامة.",
    },
    postTask: {
      en: "Practise saying the ranger's safety advice clearly using the ASR pronunciation checker.",
      ar: "تدرّب على نطق نصيحة السلامة بوضوح باستخدام فاحص النطق.",
    },
    teaching: [
      {
        en: "Notice time markers (At sunrise, In the afternoon, Before sunset) to follow the order of events.",
        ar: "انتبه لعلامات الوقت (عند الشروق، بعد الظهر، قبل الغروب) لتتبع تسلسل الأحداث.",
      },
      {
        en: "Look at how adjectives describe safety and nature (safe/dangerous, clean/dirty, careful/careless).",
        ar: "لاحظ كيف تصف الصفات السلامة والطبيعة (آمن/خطير، نظيف/متسخ، حذر/مهمل).",
      },
    ],
    passage:
      "Tariq works as a park ranger in a large nature reserve near the mountains. His job is to protect wild animals, guide visitors, and keep the trails safe. At sunrise, he drives slowly along the desert tracks to check the water stations for gazelles and birds.\n\nIn the late morning, school groups arrive at the visitor centre. Tariq gives them a short map and reminds everyone to stay on the marked paths. He explains why visitors must not drop plastic bottles or feed wild animals. Being careful keeps both people and animals healthy.\n\nIn the afternoon, Tariq repairs broken wooden signs and collects any litter left behind. The work can be hard in the hot sun, yet Tariq feels proud when families leave the park clean and happy. Before sunset, he writes a brief daily report and locks the main gate.",
    vocab: [
      { word: "protect", meaningEn: "to keep someone or something safe from harm", meaningAr: "يحمي", synonym: "guard", antonym: "harm", example: "His job is to protect wild animals." },
      { word: "safe", meaningEn: "free from danger", meaningAr: "آمن", synonym: "secure", antonym: "dangerous", example: "He keeps the walking trails safe." },
      { word: "careful", meaningEn: "paying attention to avoid mistakes or danger", meaningAr: "حذر ومنتبه", synonym: "cautious", antonym: "careless", example: "Being careful keeps animals healthy." },
      { word: "repair", meaningEn: "to fix something that is broken", meaningAr: "يُصلح", synonym: "fix", antonym: "break", example: "Tariq repairs broken wooden signs." },
      { word: "hard", meaningEn: "requiring a lot of effort", meaningAr: "شاق وصعب", synonym: "difficult", antonym: "easy", example: "The work can be hard in the hot sun." },
      { word: "brief", meaningEn: "short in length or time", meaningAr: "مختصر وقصير", synonym: "short", antonym: "long", example: "He writes a brief daily report." },
    ],
    questions: [
      { kind: "comprehension", prompt: "What does Tariq check at sunrise?", options: ["School buses", "Water stations for animals", "The café menu", "Wooden bridges"], correct: 1, explanation: { en: "Paragraph 1 says he checks the water stations for gazelles and birds at sunrise.", ar: "تذكر الفقرة الأولى أنه يفحص محطات المياه للغزلان والطيور عند الشروق." } },
      { kind: "comprehension", prompt: "What rule does Tariq give school groups?", options: ["Feed the birds", "Stay on the marked paths", "Lock the main gate", "Drive along the tracks"], correct: 1, explanation: { en: "He reminds everyone to stay on the marked paths and not drop litter or feed animals.", ar: "يُذكّر الجميع بالبقاء على المسارات المحددة وعدم رمي النفايات." } },
      { kind: "comprehension", prompt: "What is Tariq's last task before sunset?", options: ["Welcoming families", "Driving to the mountains", "Writing a report and locking the gate", "Giving out maps"], correct: 2, explanation: { en: "The final sentence states he writes a brief daily report and locks the main gate.", ar: "تذكر الجملة الأخيرة أنه يكتب تقريرًا يوميًا مختصرًا ويغلق البوابة الرئيسية." } },
      { kind: "inference", prompt: "How does Tariq feel about his job overall?", options: ["He regrets taking it", "He values it despite the heat", "He wants to work in an office", "He dislikes school visitors"], correct: 1, explanation: { en: "Even though the work is hard in the sun, Tariq feels proud when families leave happy.", ar: "رغم صعوبة العمل في الشمس يشعر طارق بالفخر عند مغادرة العائلات بسعادة." } },
      { kind: "vocabulary", prompt: "What does 'litter' mean in paragraph 3?", options: ["Wild flowers", "Rubbish left on the ground", "Drinking water", "Mountain maps"], correct: 1, explanation: { en: "'Litter' refers to trash such as plastic bottles left in public places.", ar: "كلمة litter تعني النفايات الملقاة على الأرض." } },
      { kind: "vocabulary", prompt: "What is a 'nature reserve'?", options: ["A protected area for wildlife and plants", "A shopping mall", "A busy highway", "A hotel room"], correct: 0, explanation: { en: "A nature reserve is land set aside to protect wild animals and habitats.", ar: "المحمية الطبيعية منطقة محمية للحيوانات البرية والنباتات." } },
      { kind: "synonym", prompt: "Which word is a synonym for 'repair'?", options: ["hide", "fix", "drop", "lock"], correct: 1, explanation: { en: "'Fix' has the same meaning as 'repair'.", ar: "الفعل fix مرادف للفعل repair بمعنى يُصلح." } },
      { kind: "synonym", prompt: "Which word is closest in meaning to 'protect'?", options: ["guard", "leave", "forget", "spend"], correct: 0, explanation: { en: "'Guard' means to watch over and keep safe, matching 'protect'.", ar: "كلمة guard تعني يحرس ويحمي وهي مرادفة لـ protect." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'safe'?", options: ["bright", "dangerous", "clean", "proud"], correct: 1, explanation: { en: "'Dangerous' is the direct opposite of 'safe'.", ar: "كلمة dangerous (خطير) هي عكس safe (آمن)." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'careful'?", options: ["quiet", "careless", "brief", "warm"], correct: 1, explanation: { en: "'Careless' means not paying attention, the opposite of 'careful'.", ar: "كلمة careless (مهمل) عكس careful (حذر)." } },
    ],
    pronunciation: "Stay on the marked paths and keep the nature reserve clean and safe.",
    pronunciationTip: {
      en: "Practise the consonant cluster /st/ in 'stay' without adding an extra vowel sound before 's' (say 'stay', not 'istay').",
      ar: "تدرّب على بداية الكلمة /st/ في stay دون إضافة همزة قبل السين (انطقها stay لا istay).",
    },
  }),

  // ===================== A2 PASSAGE 4 =====================
  buildReadingPassageLesson({
    id: "a2-reading-mobile-shopping",
    course: "a2",
    unit: { en: "Reading Passage 4 · Technology", ar: "نص القراءة ٤ · التقنية" },
    title: { en: "How Mobile Apps Changed Local Shopping", ar: "كيف غيّرت تطبيقات الجوال التسوّق المحلي" },
    goal: {
      en: "Compare past and present shopping habits, master e-commerce vocabulary, synonyms and antonyms, and verify pronunciation.",
      ar: "قارن عادات التسوق بين الماضي والحاضر، وأتقن مفردات التجارة الإلكترونية والمترادفات والأضداد، وتحقق من النطق.",
    },
    minutes: 25,
    scenario: {
      en: "You are helping a small family business decide whether to sell products through a mobile delivery app.",
      ar: "تساعد مشروعًا عائليًا صغيرًا في قرار البيع عبر تطبيق توصيل على الجوال.",
    },
    preTask: {
      en: "List one advantage and one problem of buying groceries online, then review the 6 key vocabulary words.",
      ar: "اذكر ميزة واحدة ومشكلة واحدة لشراء المقاضي عبر الإنترنت، ثم راجع الكلمات الست المفتاحية.",
    },
    mainTask: {
      en: "Read the text carefully and answer all 10 questions covering comprehension, inference, vocabulary, synonyms, and antonyms.",
      ar: "اقرأ النص بعناية وأجب عن الأسئلة العشرة في الفهم والاستنتاج والمفردات والمترادفات والأضداد.",
    },
    languageFocus: {
      en: "Past simple vs. present simple contrasts (Ten years ago... Today...) and comparative adjectives (faster, cheaper).",
      ar: "المقارنة بين الماضي البسيط والمضارع البسيط وصفات المقارنة (أسرع، أرخص).",
    },
    postTask: {
      en: "Read the target sentence via ASR and state whether you prefer shopping online or in person.",
      ar: "اقرأ الجملة المستهدفة عبر الميكروفون وعبّر عمّا إذا كنت تفضل التسوق الإلكتروني أم الحضوري.",
    },
    teaching: [
      {
        en: "Track contrast words like 'However' and 'Although'—they introduce the drawbacks after the benefits.",
        ar: "تتبّع كلمات الاستدراك مثل However وAlthough لأنها تقدّم العيوب بعد المزايا.",
      },
      {
        en: "Learn word pairs together (convenient/inconvenient, rapid/slow, refund/charge) to boost reading speed.",
        ar: "تعلّم أزواج الكلمات معًا (مريح/غير مريح، سريع/بطيء) لرفع سرعة الفهم القرائي.",
      },
    ],
    passage:
      "Ten years ago, most families drove to several shops every week to buy groceries, clothes, and household tools. If an item was out of stock, shoppers had to visit another store across town. Today, mobile shopping apps allow customers to compare prices, read honest reviews, and order products from their sofa in minutes.\n\nFor busy parents and students, this rapid delivery service is extremely convenient. Many local bakeries and pharmacies also gained new customers after joining delivery platforms. Customers can track their driver on a live map and pay digitally without carrying cash.\n\nHowever, online shopping is not always perfect. Buyers cannot touch the fabric of a jacket or check the exact size before it arrives. Sometimes a parcel is delayed during busy holidays, or a customer receives the wrong colour and has to request a refund. Because of this, many people now combine both methods: they order heavy everyday goods online, but still visit local shops for gifts and fresh fruit.",
    vocab: [
      { word: "compare", meaningEn: "to look at two or more things to see differences", meaningAr: "يقارن", synonym: "evaluate", antonym: "ignore", example: "Apps allow customers to compare prices." },
      { word: "rapid", meaningEn: "happening very quickly", meaningAr: "سريع جدًا", synonym: "fast", antonym: "slow", example: "Rapid delivery is helpful for busy parents." },
      { word: "convenient", meaningEn: "easy to use and saving time or effort", meaningAr: "مريح ومناسب", synonym: "handy", antonym: "inconvenient", example: "Ordering from home is extremely convenient." },
      { word: "honest", meaningEn: "truthful and fair", meaningAr: "صادق وأمين", synonym: "truthful", antonym: "dishonest", example: "Shoppers read honest reviews before buying." },
      { word: "delayed", meaningEn: "happening later than planned", meaningAr: "متأخر عن الموعد", synonym: "postponed", antonym: "punctual", example: "A parcel can be delayed during holidays." },
      { word: "combine", meaningEn: "to join or use two things together", meaningAr: "يجمع بين شيئين", synonym: "blend", antonym: "separate", example: "Many people combine online and in-store shopping." },
    ],
    questions: [
      { kind: "comprehension", prompt: "What problem did shoppers face ten years ago when an item was unavailable?", options: ["They wrote an online review", "They had to travel to another store", "They tracked a driver on a map", "They asked for a digital refund"], correct: 1, explanation: { en: "Paragraph 1 says shoppers had to visit another store across town if an item was out of stock.", ar: "تذكر الفقرة الأولى أن المتسوقين اضطروا لزيارة متجر آخر في أنحاء المدينة." } },
      { kind: "comprehension", prompt: "How did local bakeries and pharmacies benefit from apps?", options: ["They stopped selling fresh goods", "They closed their physical buildings", "They reached new customers", "They stopped accepting cards"], correct: 2, explanation: { en: "Paragraph 2 explains they gained new customers after joining delivery platforms.", ar: "توضح الفقرة الثانية أنهم كسبوا عملاء جددًا بعد الانضمام لمنصات التوصيل." } },
      { kind: "comprehension", prompt: "According to paragraph 3, what do many people still buy in person?", options: ["Heavy household tools", "Gifts and fresh fruit", "Mobile phones", "Delivery maps"], correct: 1, explanation: { en: "The last sentence states people still visit local shops for gifts and fresh fruit.", ar: "تذكر الجملة الأخيرة أن الناس يزورون المتاجر المحلية للهدايا والفواكه الطازجة." } },
      { kind: "inference", prompt: "What is the author's overall view of mobile shopping apps?", options: ["They are completely harmful", "They are useful but work best alongside physical stores", "They will erase all bakeries next year", "They are only for teenagers"], correct: 1, explanation: { en: "The author presents clear benefits and clear drawbacks, concluding with a balanced combination.", ar: "يعرض الكاتب المزايا والعيوب بوضوح ويختم بالجمع المتوازن بين الطريقتين." } },
      { kind: "vocabulary", prompt: "What does 'out of stock' mean in paragraph 1?", options: ["On sale at a lower price", "Sold out and not available", "Delivered to the door", "Made of strong fabric"], correct: 1, explanation: { en: "'Out of stock' means a shop has none of that item left to sell.", ar: "عبارة out of stock تعني نفاد الكمية وعدم توفر المنتج." } },
      { kind: "vocabulary", prompt: "What does 'request a refund' mean?", options: ["Ask for your money back", "Leave a five-star rating", "Order a second jacket", "Pay extra for fast shipping"], correct: 0, explanation: { en: "A refund is money returned to a customer when an order is wrong or returned.", ar: "طلب الاسترداد (refund) يعني استعادة المبلغ المدفوع." } },
      { kind: "synonym", prompt: "Which word is a synonym for 'rapid'?", options: ["heavy", "fast", "expensive", "empty"], correct: 1, explanation: { en: "'Fast' means quick, matching the meaning of 'rapid'.", ar: "كلمة fast مرادف مباشر لكلمة rapid بمعنى سريع." } },
      { kind: "synonym", prompt: "Which word is closest in meaning to 'convenient'?", options: ["handy", "noisy", "broken", "rare"], correct: 0, explanation: { en: "'Handy' means practical and easy to use, matching 'convenient'.", ar: "كلمة handy تعني عملي ومريح ومقاربة لـ convenient." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'honest'?", options: ["busy", "dishonest", "local", "digital"], correct: 1, explanation: { en: "Adding the prefix dis- creates 'dishonest', the opposite of 'honest'.", ar: "إضافة البادئة dis- تعطي dishonest (غير صادق) عكس honest." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'combine'?", options: ["separate", "compare", "track", "visit"], correct: 0, explanation: { en: "'Separate' means to keep apart, the opposite of 'combine'.", ar: "الفعل separate (يفصل) هو مضاد combine (يجمع)." } },
    ],
    pronunciation: "Customers can compare prices, read honest reviews, and track their delivery live.",
    pronunciationTip: {
      en: "The 'h' in 'honest' is silent—say /ˈɒn.ɪst/, not /hɒn.ɪst/.",
      ar: "حرف h في كلمة honest صامت لا يُنطق، فتُلفظ /ˈɒn.ɪst/.",
    },
  }),

  // ===================== A2 PASSAGE 5 =====================
  buildReadingPassageLesson({
    id: "a2-reading-old-jeddah",
    course: "a2",
    unit: { en: "Reading Passage 5 · Heritage", ar: "نص القراءة ٥ · التراث" },
    title: { en: "The Spice Markets of Old Jeddah", ar: "أسواق التوابل في جدة التاريخية" },
    goal: {
      en: "Read a cultural heritage article, expand descriptive vocabulary with synonyms and antonyms, and practise clear pronunciation.",
      ar: "اقرأ مقالًا عن التراث الثقافي، ووسّع مفرداتك الوصفية مع المترادفات والأضداد، وتدرّب على النطق الواضح.",
    },
    minutes: 25,
    scenario: {
      en: "You are preparing a short guided walk description for international guests visiting Al-Balad in Jeddah.",
      ar: "تُعدّ وصفًا لجولة إرشادية قصيرة لضيوف دوليين يزورون منطقة البلد في جدة.",
    },
    preTask: {
      en: "Imagine walking through a historic market. What sights and smells do you expect? Review the 6 target words.",
      ar: "تخيّل المشي في سوق تاريخي: ما المشاهد والروائح التي تتوقعها؟ راجع الكلمات الست المستهدفة.",
    },
    mainTask: {
      en: "Read all three paragraphs and complete the 10 varied comprehension, vocabulary, synonym, and antonym questions.",
      ar: "اقرأ الفقرات الثلاث وأكمل الأسئلة العشرة المتنوعة في الفهم والمفردات والمترادفات والأضداد.",
    },
    languageFocus: {
      en: "Past-tense historical narrative (sailed, traded, built) and sensory adjectives (narrow, fragrant, ancient).",
      ar: "السرد التاريخي في الماضي البسيط والصفات الحسية (ضيق، عطر، عريق).",
    },
    postTask: {
      en: "Practise reading the heritage description aloud using the ASR tool.",
      ar: "تدرّب على قراءة وصف التراث بصوت عالٍ باستخدام أداة النطق.",
    },
    teaching: [
      {
        en: "Visualise the setting as you read: coral-stone houses, carved wooden balconies (rawashin), and spice sacks.",
        ar: "تخيّل المشهد أثناء القراءة: البيوت الحجرية المرجانية والرواشين الخشبية المنحوتة وأكياس التوابل.",
      },
      {
        en: "Notice how sensory words (fragrant, narrow, ancient, lively) have clear opposites that help you remember them.",
        ar: "لاحظ أن الكلمات الحسية (عطر، ضيق، قديم، حيوي) لها أضداد واضحة تساعدك على حفظها.",
      },
    ],
    passage:
      "In the historic district of Al-Balad in Jeddah, narrow stone lanes wind between tall houses built from Red Sea coral and decorated with carved wooden balconies called rawashin. For centuries, merchant ships sailed into Jeddah's port carrying spices, silk, and coffee from distant lands.\n\nToday, the old spice markets remain lively from late afternoon until evening. As soon as you step inside, the air becomes fragrant with cardamom, cinnamon, cloves, and saffron. Shopkeepers display bright mounds of spices in woven baskets and happily explain how each blend is used in traditional Hijazi cooking.\n\nMany families have run the same small stalls for three generations. Although modern supermarkets sell packaged spices across the city, visitors still come to Al-Balad to experience genuine hospitality, learn local history, and preserve an ancient trading tradition.",
    vocab: [
      { word: "narrow", meaningEn: "measuring a small distance from side to side", meaningAr: "ضيق", synonym: "slim", antonym: "wide", example: "Narrow stone lanes wind between tall houses." },
      { word: "distant", meaningEn: "far away in space or time", meaningAr: "بعيد", synonym: "faraway", antonym: "nearby", example: "Ships brought spices from distant lands." },
      { word: "lively", meaningEn: "full of energy, movement, and activity", meaningAr: "حيوي ونابض بالحياة", synonym: "vibrant", antonym: "dull", example: "The spice markets remain lively in the evening." },
      { word: "fragrant", meaningEn: "having a pleasant, sweet smell", meaningAr: "عطر وفوّاح", synonym: "aromatic", antonym: "odourless", example: "The air becomes fragrant with cardamom and cloves." },
      { word: "genuine", meaningEn: "real, sincere, and authentic", meaningAr: "أصيل وحقيقي", synonym: "authentic", antonym: "fake", example: "Visitors experience genuine hospitality." },
      { word: "ancient", meaningEn: "belonging to a very old time in history", meaningAr: "عريق وقديم جدًا", synonym: "historic", antonym: "modern", example: "They preserve an ancient trading tradition." },
    ],
    questions: [
      { kind: "comprehension", prompt: "What materials were used to build the historic houses in Al-Balad?", options: ["Glass and steel", "Red Sea coral and carved wood", "Plastic and concrete", "Sand and bamboo"], correct: 1, explanation: { en: "Paragraph 1 says they were built from Red Sea coral with carved wooden balconies.", ar: "تذكر الفقرة الأولى أنها بُنيت من حجر المرجان بالبحر الأحمر مع رواشين خشبية منحوتة." } },
      { kind: "comprehension", prompt: "When are the old spice markets most active?", options: ["At dawn only", "From late afternoon until evening", "Only on Monday mornings", "Only during winter storms"], correct: 1, explanation: { en: "Paragraph 2 says they remain lively from late afternoon until evening.", ar: "توضح الفقرة الثانية أنها تبقى حيوية من أواخر العصر حتى المساء." } },
      { kind: "comprehension", prompt: "How long have many families run the same stalls?", options: ["For three months", "For three generations", "For one year", "Since last summer"], correct: 1, explanation: { en: "Paragraph 3 states many families have run the same stalls for three generations.", ar: "تذكر الفقرة الثالثة أن كثيرًا من العائلات تدير الأكشاك نفسها منذ ثلاثة أجيال." } },
      { kind: "inference", prompt: "Why do shoppers still visit Al-Balad even though supermarkets sell spices?", options: ["Supermarkets have no cardamom", "Al-Balad offers culture, hospitality, and heritage", "Al-Balad is only for merchant ships", "Supermarkets are closed in the evening"], correct: 1, explanation: { en: "Visitors come for genuine hospitality, local history, and preserving tradition—not just the product.", ar: "يزور الناس البلد للاستمتاع بالضيافة الأصيلة والتاريخ المحلي والحفاظ على التراث." } },
      { kind: "vocabulary", prompt: "What are 'merchant ships' in paragraph 1?", options: ["Ships carrying goods for trade", "Small fishing kayaks", "Trains between cities", "Airplanes carrying tourists"], correct: 0, explanation: { en: "Merchants are traders, so merchant ships carry trade goods like spices and silk.", ar: "السفن التجارية هي السفن التي تنقل البضائع للتجارة." } },
      { kind: "vocabulary", prompt: "What does 'preserve' mean in the last sentence?", options: ["To destroy completely", "To protect and keep alive", "To hide under water", "To sell cheaply"], correct: 1, explanation: { en: "'Preserve' means to protect a tradition or building so it continues into the future.", ar: "الفعل preserve يعني يحافظ على التراث ويصونه." } },
      { kind: "synonym", prompt: "Which word is a synonym for 'fragrant'?", options: ["aromatic", "silent", "heavy", "empty"], correct: 0, explanation: { en: "'Aromatic' means having a pleasant spice or herb smell, matching 'fragrant'.", ar: "كلمة aromatic (عطري) مرادفة لكلمة fragrant." } },
      { kind: "synonym", prompt: "Which word is closest in meaning to 'genuine'?", options: ["authentic", "broken", "narrow", "tired"], correct: 0, explanation: { en: "'Authentic' means real and true, the same as 'genuine'.", ar: "كلمة authentic (أصيل) مرادفة لكلمة genuine." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'narrow'?", options: ["tall", "wide", "old", "warm"], correct: 1, explanation: { en: "'Wide' is the opposite of 'narrow'.", ar: "كلمة wide (واسع) عكس narrow (ضيق)." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'distant'?", options: ["nearby", "lively", "historic", "bright"], correct: 0, explanation: { en: "'Nearby' means close in distance, the opposite of 'distant'.", ar: "كلمة nearby (قريب) عكس distant (بعيد)." } },
    ],
    pronunciation: "Visitors come to Al-Balad to experience genuine hospitality and preserve an ancient tradition.",
    pronunciationTip: {
      en: "Stress the first syllable in 'GENuine' and the third in 'hospiTALity'; pronounce 'sh' softly in 'an-cient' (/ˈeɪn.ʃənt/).",
      ar: "انبر المقطع الأول في GENuine، وانطق المقطع الأخير في ancient بصوت /ʃ/ مثل الشين الخفيفة.",
    },
  }),

  // ===================== A2 PASSAGE 6 =====================
  buildReadingPassageLesson({
    id: "a2-reading-desert-trees",
    course: "a2",
    unit: { en: "Reading Passage 6 · Environment", ar: "نص القراءة ٦ · البيئة" },
    title: { en: "Volunteer Youth Planting Trees in the Desert", ar: "شباب متطوعون يزرعون الأشجار في الصحراء" },
    goal: {
      en: "Read a community-action report, learn environmental vocabulary with synonyms and antonyms, and verify pronunciation.",
      ar: "اقرأ تقريرًا عن مبادرة مجتمعية، وتعلّم مفردات البيئة مع المترادفات والأضداد، وتحقق من النطق.",
    },
    minutes: 25,
    scenario: {
      en: "Your local community club invites you to join a weekend tree-planting campaign and shares this newsletter story.",
      ar: "يدعوك ناديك المجتمعي للمشاركة في حملة تشجير نهاية الأسبوع ويشاركك هذا التقرير.",
    },
    preTask: {
      en: "Why are native desert trees better than imported trees in dry areas? Preview the vocabulary table.",
      ar: "لماذا تكون الأشجار الصحراوية المحلية أفضل من المستوردة في المناطق الجافة؟ استعرض جدول المفردات.",
    },
    mainTask: {
      en: "Read the newsletter report and answer all 10 questions on facts, inference, vocabulary, synonyms, and antonyms.",
      ar: "اقرأ التقرير وأجب عن الأسئلة العشرة في الحقائق والاستنتاج والمفردات والمترادفات والأضداد.",
    },
    languageFocus: {
      en: "Present perfect for recent achievements (have planted) and cause-effect links (because, so that).",
      ar: "المضارع التام للإنجازات الحديثة وروابط السبب والنتيجة (because، so that).",
    },
    postTask: {
      en: "Record the summary sentence aloud with ASR and name one green action you can do this month.",
      ar: "سجّل جملة الملخص بصوتك عبر الميكروفون واذكر مبادرة خضراء يمكنك القيام بها هذا الشهر.",
    },
    teaching: [
      {
        en: "Look for numbers (200 volunteers, 1,500 seedlings) and reasons (save water, prevent dust storms) when scanning.",
        ar: "ابحث عن الأرقام (200 متطوع، 1500 شتلة) والأسباب (توفير المياه، تقليل الغبار) عند المسح السريع.",
      },
      {
        en: "Pay attention to prefixes and root meanings (native vs. foreign, scarce vs. abundant).",
        ar: "انتبه لمعاني الجذور والأضداد (محلي/أجنبي، نادر/وفير).",
      },
    ],
    passage:
      "Last Saturday morning, more than two hundred student volunteers gathered outside the city to support a local greening project. Working in small teams, they planted 1,500 young native trees—including acacia and sidr—along dry valleys where rainfall is scarce.\n\nProject engineers chose native species because their deep roots survive high summer temperatures with very little water. Each seedling was fitted with a simple drip-irrigation pipe made from recycled plastic so that not a single drop of water is wasted.\n\nOver the next five years, these trees will provide cool shade, hold sandy soil together during dust storms, and shelter local birds. Many students said the experience taught them practical teamwork and showed that small, steady actions can create lasting environmental change.",
    vocab: [
      { word: "gather", meaningEn: "to come together in one place", meaningAr: "يتجمع", synonym: "assemble", antonym: "scatter", example: "Two hundred volunteers gathered outside the city." },
      { word: "native", meaningEn: "naturally growing in a particular region", meaningAr: "محلي وأصيل في البيئة", synonym: "local", antonym: "foreign", example: "They planted native acacia and sidr trees." },
      { word: "scarce", meaningEn: "hard to find or in very small supply", meaningAr: "نادر وشحيح", synonym: "rare", antonym: "abundant", example: "Rainfall is scarce in dry valleys." },
      { word: "survive", meaningEn: "to stay alive in difficult conditions", meaningAr: "ينجو ويصمد", synonym: "endure", antonym: "perish", example: "Deep roots help trees survive high heat." },
      { word: "steady", meaningEn: "regular, continuous, and not stopping", meaningAr: "مستمر وثابت", synonym: "consistent", antonym: "irregular", example: "Small, steady actions create lasting change." },
      { word: "lasting", meaningEn: "continuing for a long time", meaningAr: "دائم ومستمر", synonym: "permanent", antonym: "temporary", example: "They hope for lasting environmental change." },
    ],
    questions: [
      { kind: "comprehension", prompt: "How many young trees did the volunteers plant?", options: ["200", "500", "1,500", "5,000"], correct: 2, explanation: { en: "Paragraph 1 says they planted 1,500 young native trees.", ar: "تذكر الفقرة الأولى أنهم زرعوا 1,500 شجرة محلية صغيرة." } },
      { kind: "comprehension", prompt: "Why did engineers choose acacia and sidr trees?", options: ["They grow only in cold snow", "Their deep roots survive heat with little water", "They do not need sunlight", "They produce plastic pipes"], correct: 1, explanation: { en: "Paragraph 2 explains their deep roots survive high summer temperatures with very little water.", ar: "توضح الفقرة الثانية أن جذورها العميقة تصمد أمام الحرارة بقليل من الماء." } },
      { kind: "comprehension", prompt: "What are three future benefits of the planted trees?", options: ["Shade, holding soil in dust storms, and bird shelter", "Fuel, paper, and timber", "Tourism, roads, and bridges", "Rain, snow, and rivers"], correct: 0, explanation: { en: "Paragraph 3 lists cool shade, holding sandy soil during dust storms, and sheltering local birds.", ar: "تذكر الفقرة الثالثة الظل وتثبيت التربة أثناء العواصف الترابية ومأوى للطيور." } },
      { kind: "inference", prompt: "Why did the team use recycled plastic for the irrigation pipes?", options: ["To save money and reduce waste sustainably", "Because metal is lighter", "Because plastic melts in water", "To stop birds from landing"], correct: 0, explanation: { en: "Using recycled materials fits the project's environmental goal of avoiding waste.", ar: "استخدام البلاستيك المعاد تدويره ينسجم مع الهدف البيئي وتقليل الهدر." } },
      { kind: "vocabulary", prompt: "What is a 'seedling' in paragraph 2?", options: ["A very young plant or tree", "A type of desert bird", "A water bucket", "A volunteer badge"], correct: 0, explanation: { en: "A seedling is a young tree grown from a seed and ready to plant.", ar: "الشتلة (seedling) هي نبتة أو شجرة صغيرة حديثة النمو." } },
      { kind: "vocabulary", prompt: "What does 'drip-irrigation' do?", options: ["Delivers water slowly drop by drop to roots", "Sprays water into the air", "Removes soil from valleys", "Measures summer wind"], correct: 0, explanation: { en: "Paragraph 2 notes the drip pipe ensures not a single drop of water is wasted.", ar: "الري بالتنقيط يوصل الماء ببطء للجذور دون هدر." } },
      { kind: "synonym", prompt: "Which word is a synonym for 'gather'?", options: ["assemble", "cancel", "borrow", "forget"], correct: 0, explanation: { en: "'Assemble' means to come together in a group, matching 'gather'.", ar: "الفعل assemble مرادف لـ gather بمعنى يتجمع." } },
      { kind: "synonym", prompt: "Which word is closest in meaning to 'scarce'?", options: ["rare", "noisy", "heavy", "cheap"], correct: 0, explanation: { en: "'Rare' means uncommon or in short supply, like 'scarce'.", ar: "كلمة rare (نادر) قريبة جدًا من معنى scarce." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'lasting'?", options: ["deep", "temporary", "native", "steady"], correct: 1, explanation: { en: "'Temporary' lasts only a short time, the opposite of 'lasting'.", ar: "كلمة temporary (مؤقت) عكس lasting (دائم)." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'native'?", options: ["local", "foreign", "young", "practical"], correct: 1, explanation: { en: "'Foreign' refers to species from outside the region, opposite of 'native'.", ar: "كلمة foreign (أجنبي/غير محلي) مضاد native (محلي)." } },
    ],
    pronunciation: "Small, steady actions by student volunteers can create lasting environmental change.",
    pronunciationTip: {
      en: "Watch the /v/ sound in 'volunteers' and 'environmental'—vibrate your lower lip against your upper teeth.",
      ar: "انتبه لصوت /v/ في volunteers وenvironmental مع اهتزاز الشفة السفلى مع الأسنان العليا.",
    },
  }),

  // ===================== B1 PASSAGE 7 =====================
  buildReadingPassageLesson({
    id: "b1-reading-sleep-memory",
    course: "b1",
    unit: { en: "Reading Passage 7 · Health & Science", ar: "نص القراءة ٧ · الصحة والعلوم" },
    title: { en: "Why Quality Sleep Improves Memory and Focus", ar: "لماذا يحسّن النوم الجيد الذاكرة والتركيز" },
    goal: {
      en: "Analyse a popular-science passage, master academic vocabulary with synonyms and antonyms, and verify pronunciation.",
      ar: "حلّل نصًا علميًا مبسطًا، وأتقن مفرداته الأكاديمية مع المترادفات والأضداد، وتحقق من النطق.",
    },
    minutes: 30,
    scenario: {
      en: "Before final exams, your study group debates whether staying up late to revise actually helps.",
      ar: "قبل الاختبارات النهائية، يناقش زملاؤك في الدراسة هل السهر الطويل للمراجعة يفيد فعلًا أم يضر.",
    },
    preTask: {
      en: "Guess what happens in the brain while you sleep. Review the 6 vocabulary terms and their opposites.",
      ar: "توقّع ما يحدث في الدماغ أثناء النوم، وراجع المصطلحات الستة وأضدادها قبل القراءة.",
    },
    mainTask: {
      en: "Read the article and answer all 10 comprehension, inference, vocabulary, synonym, and antonym questions.",
      ar: "اقرأ المقال وأجب عن جميع الأسئلة العشرة في الفهم والاستنتاج والمفردات والمترادفات والأضداد.",
    },
    languageFocus: {
      en: "Cause-and-effect clauses (while, consequently, whereas) and scientific verbs (consolidate, impair, restore).",
      ar: "جمل السبب والنتيجة والأفعال العلمية (يرسّخ، يُضعف، يستعيد).",
    },
    postTask: {
      en: "Speak the key takeaway aloud using the ASR checker and share one sleep habit you plan to improve.",
      ar: "انطق الخلاصة بصوتك عبر فاحص النطق واذكر عادة نوم واحدة تنوي تحسينها.",
    },
    teaching: [
      {
        en: "Separate popular myths (cramming all night) from scientific findings (sleep consolidates memory).",
        ar: "ميّز بين الاعتقادات الشائعة (السهر للمراجعة) والنتائج العلمية (النوم يرسّخ الذاكرة).",
      },
      {
        en: "Use surrounding definitions inside the text to unpack academic verbs such as 'consolidate' and 'impair'.",
        ar: "استعن بالشرح المحيط داخل النص لفهم الأفعال الأكاديمية مثل consolidate وimpair.",
      },
    ],
    passage:
      "Many university students believe that staying awake all night before an exam will help them remember more facts. However, neuroscience research consistently shows the opposite. Rather than shutting down, the sleeping brain works actively to organise and consolidate everything learned during the day, transferring fragile short-term notes into durable long-term memory.\n\nSleep occurs in repeating cycles that include deep slow-wave sleep and dream-rich REM sleep. Deep sleep restores physical energy and strengthens factual recall, whereas REM sleep helps the brain connect ideas creatively and solve unfamiliar problems. Even losing two hours of rest for several nights in a row can noticeably impair concentration, slow reaction times, and increase careless errors.\n\nFortunately, improving sleep quality does not require expensive gadgets. Researchers recommend keeping a consistent bedtime, dimming bright phone screens an hour before rest, and avoiding caffeine in the late afternoon. Students who protect seven to eight hours of nightly sleep frequently outperform equally talented peers who rely on last-minute cramming.",
    vocab: [
      { word: "consolidate", meaningEn: "to strengthen and make firm", meaningAr: "يرسّخ ويُثبّت", synonym: "strengthen", antonym: "weaken", example: "The sleeping brain works to consolidate memories." },
      { word: "fragile", meaningEn: "easily broken or lost", meaningAr: "هشّ وسهل الفقدان", synonym: "delicate", antonym: "durable", example: "Short-term notes are fragile before sleep." },
      { word: "durable", meaningEn: "able to last a long time without fading", meaningAr: "متين وطويل الأمد", synonym: "long-lasting", antonym: "fragile", example: "Sleep builds durable long-term memory." },
      { word: "impair", meaningEn: "to damage or make weaker", meaningAr: "يُضعف أو يضرّ بـ", synonym: "harm", antonym: "enhance", example: "Losing sleep can noticeably impair concentration." },
      { word: "consistent", meaningEn: "staying the same and following a regular pattern", meaningAr: "منتظم وثابت", synonym: "regular", antonym: "erratic", example: "Keep a consistent bedtime every night." },
      { word: "outperform", meaningEn: "to do better than someone else", meaningAr: "يتفوق في الأداء على", synonym: "surpass", antonym: "underperform", example: "Well-rested students often outperform tired peers." },
    ],
    questions: [
      { kind: "comprehension", prompt: "What happens to the brain during sleep according to paragraph 1?", options: ["It shuts down completely", "It organises and consolidates daily learning", "It deletes long-term memory", "It stops using oxygen"], correct: 1, explanation: { en: "Paragraph 1 states the sleeping brain actively organises and consolidates what was learned.", ar: "توضح الفقرة الأولى أن الدماغ النائم ينظّم ويرسّخ ما تم تعلّمه." } },
      { kind: "comprehension", prompt: "What is the specific role of REM sleep mentioned in paragraph 2?", options: ["Replacing breakfast", "Connecting ideas creatively and solving problems", "Raising caffeine levels", "Blocking phone light"], correct: 1, explanation: { en: "Paragraph 2 notes that REM sleep helps connect ideas creatively and solve unfamiliar problems.", ar: "تذكر الفقرة الثانية أن نوم حركة العين السريعة يساعد على ربط الأفكار بإبداع وحل المشكلات." } },
      { kind: "comprehension", prompt: "Which habit is recommended in paragraph 3?", options: ["Drinking coffee at night", "Dimming bright screens an hour before bed", "Buying expensive sleep gadgets", "Changing bedtime every day"], correct: 1, explanation: { en: "Researchers recommend dimming bright phone screens an hour before rest.", ar: "يوصي الباحثون بتخفيف إضاءة الشاشات قبل النوم بساعة." } },
      { kind: "inference", prompt: "What can be inferred about two students with equal ability?", options: ["The one who sleeps 7–8 hours is likely to score better than the one who crams", "Neither student needs to revise", "Cramming always beats sleep", "Only older students need deep sleep"], correct: 0, explanation: { en: "The final sentence says well-rested students frequently outperform equally talented peers who cram.", ar: "تشير الجملة الأخيرة إلى أن الطلاب ذوي النوم الكافي يتفوقون غالبًا على أقرانهم المماثلين لهم." } },
      { kind: "vocabulary", prompt: "What does 'cramming' mean in the last sentence?", options: ["Sleeping for ten hours", "Studying intensely at the very last minute", "Writing neat notes early", "Exercising before class"], correct: 1, explanation: { en: "'Last-minute cramming' refers to trying to memorise a lot of material right before an exam.", ar: "الحشو في اللحظة الأخيرة (cramming) يعني المذاكرة المكثفة قبيل الاختبار مباشرة." } },
      { kind: "vocabulary", prompt: "What does 'restore' mean in paragraph 2?", options: ["To bring back to a good state", "To hide away", "To measure quickly", "To waste energy"], correct: 0, explanation: { en: "Deep sleep restores—brings back—physical energy.", ar: "الفعل restore يعني يستعيد أو يُجدّد الطاقة." } },
      { kind: "synonym", prompt: "Which word is a synonym for 'impair'?", options: ["harm", "celebrate", "discover", "invite"], correct: 0, explanation: { en: "'Harm' and 'impair' both mean to damage or weaken performance.", ar: "كلمة harm (يضرّ) مرادفة لكلمة impair (يُضعف)." } },
      { kind: "synonym", prompt: "Which word is closest in meaning to 'outperform'?", options: ["surpass", "repeat", "delay", "borrow"], correct: 0, explanation: { en: "'Surpass' means to do better than others, matching 'outperform'.", ar: "الفعل surpass (يتفوق على) مرادف لـ outperform." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'fragile'?", options: ["sleepy", "durable", "careless", "bright"], correct: 1, explanation: { en: "'Durable' means strong and lasting—the direct opposite of 'fragile'.", ar: "كلمة durable (متين وثابت) هي عكس fragile (هش)." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'consistent'?", options: ["erratic", "helpful", "creative", "calm"], correct: 0, explanation: { en: "'Erratic' means irregular and unpredictable, the opposite of 'consistent'.", ar: "كلمة erratic (متقلب وغير منتظم) مضاد consistent (منتظم)." } },
    ],
    pronunciation: "Keeping a consistent bedtime helps the brain consolidate fragile notes into durable memory.",
    pronunciationTip: {
      en: "Stress the second syllable in 'conSOLidate' and 'conSIS-tent'; keep the 'd' crisp in 'durable'.",
      ar: "انبر المقطع الثاني في conSOLidate وconSIS-tent، وحافظ على وضوح صوت /d/ في durable.",
    },
  }),

  // ===================== B1 PASSAGE 8 =====================
  buildReadingPassageLesson({
    id: "b1-reading-hybrid-work",
    course: "b1",
    unit: { en: "Reading Passage 8 · Work & Career", ar: "نص القراءة ٨ · العمل والمهنة" },
    title: { en: "The Rise of Hybrid and Remote Workplaces", ar: "صعود بيئات العمل الهجين والعمل عن بُعد" },
    goal: {
      en: "Evaluate workplace trends, learn career vocabulary with synonyms and antonyms, and check spoken fluency via ASR.",
      ar: "قيّم توجهات سوق العمل، وتعلّم مفردات المهنة مع المترادفات والأضداد، وتحقق من النطق عبر الميكروفون.",
    },
    minutes: 30,
    scenario: {
      en: "Your company is reviewing its remote-work policy and asks team members to read a balanced workplace brief.",
      ar: "تراجع شركتك سياسة العمل عن بُعد وتطلب من الفريق قراءة موجز متوازن حول العمل الهجين.",
    },
    preTask: {
      en: "Compare commuting every day with working two days from home. Study the 6 workplace terms first.",
      ar: "قارن بين الذهاب يوميًا للمكتب والعمل يومين من المنزل، وادرس المصطلحات المهنية الستة أولًا.",
    },
    mainTask: {
      en: "Read the workplace brief and answer all 10 questions on details, inference, vocabulary, synonyms, and antonyms.",
      ar: "اقرأ الموجز المهني وأجب عن جميع الأسئلة العشرة في التفاصيل والاستنتاج والمفردات والمترادفات والأضداد.",
    },
    languageFocus: {
      en: "Balancing pros and cons (on the one hand / on the other hand, while) and work collocations (cut commuting, clear boundaries).",
      ar: "الموازنة بين المزايا والتحديات والتلازمات المهنية (تقليل التنقل، حدود واضحة).",
    },
    postTask: {
      en: "Speak the summary line via ASR and state which work schedule best suits your goals.",
      ar: "انطق جملة الملخص عبر الميكروفون وحدّد نظام العمل الأنسب لأهدافك.",
    },
    teaching: [
      {
        en: "Notice how each paragraph addresses a distinct angle: growth of hybrid models, benefits, and challenges/solutions.",
        ar: "لاحظ كيف تعالج كل فقرة زاوية مختلفة: انتشار العمل الهجين، فوائده، وتحدياته وحلوله.",
      },
      {
        en: "Watch for workplace synonyms (flexible/adaptable, isolated/lonely, commute/daily travel).",
        ar: "انتبه للمترادفات المهنية مثل flexible/adaptable وisolated/lonely.",
      },
    ],
    passage:
      "Over the past decade, digital collaboration tools have transformed where and how office work gets done. Rather than choosing between full-time office attendance and fully remote work, many organisations now adopt a hybrid model in which employees spend two or three days in the office and the rest working from home.\n\nSupporters point out that hybrid schedules save hours of stressful daily commuting, lower transport expenses, and give staff greater flexibility to manage family responsibilities. Surveys also show that quiet home environments often boost deep focus on writing and analytical tasks, while in-office days preserve spontaneous brainstorming and mentoring for junior colleagues.\n\nNevertheless, hybrid teams face genuine hurdles. Without clear boundaries, workers may answer messages late at night and suffer burnout. Remote staff can also feel isolated if managers accidentally favour people sitting nearby. Successful companies therefore establish transparent communication rules, judge performance by results rather than desk hours, and schedule regular team check-ins.",
    vocab: [
      { word: "transform", meaningEn: "to change completely in form or nature", meaningAr: "يُحدث تحولًا جذريًا", synonym: "reshape", antonym: "preserve", example: "Digital tools have transformed office work." },
      { word: "flexibility", meaningEn: "the ability to adjust easily to changing needs", meaningAr: "المرونة", synonym: "adaptability", antonym: "rigidity", example: "Hybrid work gives staff greater flexibility." },
      { word: "spontaneous", meaningEn: "happening naturally without advance planning", meaningAr: "عفوي وتلقائي", synonym: "unplanned", antonym: "scheduled", example: "Office days encourage spontaneous brainstorming." },
      { word: "hurdle", meaningEn: "a problem or difficulty to overcome", meaningAr: "عقبة أو تحدٍّ", synonym: "obstacle", antonym: "advantage", example: "Hybrid teams still face genuine hurdles." },
      { word: "isolated", meaningEn: "feeling separated or cut off from others", meaningAr: "معزول ومنفصل", synonym: "disconnected", antonym: "included", example: "Remote staff can feel isolated without check-ins." },
      { word: "transparent", meaningEn: "clear, open, and easy to understand", meaningAr: "شفاف وواضح", synonym: "clear", antonym: "opaque", example: "Companies set transparent communication rules." },
    ],
    questions: [
      { kind: "comprehension", prompt: "How does a typical hybrid model work according to paragraph 1?", options: ["Employees never visit the office", "Staff split the week between office and home", "Staff work only on weekends", "Only managers work from home"], correct: 1, explanation: { en: "Paragraph 1 defines hybrid work as spending two or three days in the office and the rest at home.", ar: "تعرّف الفقرة الأولى العمل الهجين بقضاء يومين أو ثلاثة في المكتب والباقي من المنزل." } },
      { kind: "comprehension", prompt: "What benefit do in-office days specifically support?", options: ["Longer commutes", "Spontaneous brainstorming and mentoring", "Late-night messaging", "Higher transport costs"], correct: 1, explanation: { en: "Paragraph 2 says in-office days preserve spontaneous brainstorming and mentoring for junior colleagues.", ar: "توضح الفقرة الثانية أن أيام المكتب تحفظ العصف الذهني التلقائي وتوجيه الزملاء الجدد." } },
      { kind: "comprehension", prompt: "How do successful hybrid companies evaluate employees?", options: ["By how late they answer messages", "By how close they sit to the manager", "By results rather than desk hours", "By daily commuting distance"], correct: 2, explanation: { en: "Paragraph 3 states they judge performance by results rather than desk hours.", ar: "تذكر الفقرة الثالثة أنهم يقيّمون الأداء بالنتائج لا بساعات الجلوس على المكتب." } },
      { kind: "inference", prompt: "Why might junior employees struggle in a 100% remote job?", options: ["They have less informal mentoring and contact", "They cannot use laptops", "They always earn less", "They dislike flexible hours"], correct: 0, explanation: { en: "Paragraph 2 links in-office days to mentoring for junior colleagues, and paragraph 3 notes isolation risks.", ar: "تربط الفقرة الثانية أيام المكتب بتوجيه الزملاء الجدد، وتشير الثالثة لخطر العزلة." } },
      { kind: "vocabulary", prompt: "What does 'commuting' mean in paragraph 2?", options: ["Travelling regularly between home and work", "Sending emails to clients", "Holding video meetings", "Taking a summer holiday"], correct: 0, explanation: { en: "'Commuting' refers to the daily journey to and from one's workplace.", ar: "كلمة commuting تعني التنقل اليومي بين المنزل ومقر العمل." } },
      { kind: "vocabulary", prompt: "What does 'burnout' mean in paragraph 3?", options: ["Extreme exhaustion from overwork", "A fast computer upgrade", "A promotion at work", "A short lunch break"], correct: 0, explanation: { en: "Answering messages late at night without boundaries leads to mental and physical exhaustion (burnout).", ar: "الاحتراق الوظيفي (burnout) هو الإرهاق الشديد الناتج عن ضغط العمل المستمر." } },
      { kind: "synonym", prompt: "Which word is a synonym for 'hurdle'?", options: ["obstacle", "salary", "reward", "schedule"], correct: 0, explanation: { en: "'Obstacle' means a challenge to overcome, the same as 'hurdle'.", ar: "كلمة obstacle (عقبة) مرادفة لكلمة hurdle." } },
      { kind: "synonym", prompt: "Which word is closest in meaning to 'flexibility'?", options: ["adaptability", "isolation", "distance", "expense"], correct: 0, explanation: { en: "'Adaptability' captures the ability to adjust easily, matching 'flexibility'.", ar: "كلمة adaptability (القابلية للتكيّف) مرادفة لـ flexibility." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'spontaneous'?", options: ["scheduled", "helpful", "honest", "quiet"], correct: 0, explanation: { en: "'Scheduled' means planned in advance, the opposite of 'spontaneous'.", ar: "كلمة scheduled (مجدول ومخطط) عكس spontaneous (عفوي)." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'isolated'?", options: ["included", "remote", "tired", "busy"], correct: 0, explanation: { en: "'Included' means connected as part of the group, the opposite of 'isolated'.", ar: "كلمة included (مندمج ومشمول) عكس isolated (معزول)." } },
    ],
    pronunciation: "Successful hybrid teams set transparent rules and judge performance by results.",
    pronunciationTip: {
      en: "Stress 'transPARent' on the second syllable and 'perFORMance' on the second syllable.",
      ar: "انبر المقطع الثاني في transPARent وperFORMance مع نطق الحروف الساكنة النهائية بوضوح.",
    },
  }),

  // ===================== B1 PASSAGE 9 =====================
  buildReadingPassageLesson({
    id: "b1-reading-solar-architecture",
    course: "b1",
    unit: { en: "Reading Passage 9 · Sustainability", ar: "نص القراءة ٩ · الاستدامة" },
    title: { en: "Solar Power and Desert Architecture in Saudi Arabia", ar: "الطاقة الشمسية وعمارة الصحراء في السعودية" },
    goal: {
      en: "Connect traditional design with modern clean energy, learn sustainability vocabulary and synonyms/antonyms, and check pronunciation.",
      ar: "اربط بين التصميم التراثي والطاقة النظيفة الحديثة، وتعلّم مفردات الاستدامة والمترادفات والأضداد، وتحقق من النطق.",
    },
    minutes: 30,
    scenario: {
      en: "You are researching green building design in the Gulf for a school or university presentation.",
      ar: "تبحث في تصميم المباني الخضراء في الخليج لإعداد عرض تقديمي دراسي أو جامعي.",
    },
    preTask: {
      en: "How did traditional Arabian houses stay cool before air conditioning? Check the 6 key words first.",
      ar: "كيف حافظت البيوت العربية التقليدية على البرودة قبل التكييف؟ راجع الكلمات الست أولًا.",
    },
    mainTask: {
      en: "Read the three paragraphs and complete all 10 comprehension, inference, vocabulary, synonym, and antonym questions.",
      ar: "اقرأ الفقرات الثلاث وأكمل الأسئلة العشرة في الفهم والاستنتاج والمفردات والمترادفات والأضداد.",
    },
    languageFocus: {
      en: "Passive voice for processes (is captured, are angled, was cooled) and renewable-energy lexis.",
      ar: "المبني للمجهول لوصف العمليات الهندسية ومفردات الطاقة المتجددة.",
    },
    postTask: {
      en: "Record the pronunciation sentence via ASR and explain one passive cooling idea to a partner.",
      ar: "سجّل جملة النطق عبر الميكروفون واشرح فكرة واحدة للتبريد الطبيعي لزميلك.",
    },
    teaching: [
      {
        en: "Look for links between past wisdom (thick walls, shaded courtyards) and modern technology (photovoltaic panels).",
        ar: "ابحث عن الروابط بين حكمة الماضي (الجدران السميكة والأفنية المظللة) والتقنية الحديثة (الألواح الشمسية).",
      },
      {
        en: "Notice technical pairs: renewable/non-renewable, efficient/wasteful, absorb/reflect.",
        ar: "لاحظ الأزواج التقنية: متجدد/غير متجدد، كفؤ/مُهدر، يمتص/يعكس.",
      },
    ],
    passage:
      "With more than three thousand hours of sunshine every year, Saudi Arabia possesses one of the richest solar resources on Earth. Rather than viewing desert heat solely as a challenge, modern architects and engineers are turning abundant sunlight into clean electricity while reviving clever cooling principles from traditional Arabian architecture.\n\nLong before mechanical air conditioning existed, builders in Najd and Hijaz designed thick mud-brick walls that absorbed heat slowly during the afternoon and kept interior rooms surprisingly cool. Central courtyards created natural shade, and narrow upper openings allowed warm air to escape while pulling cooler breezes inside.\n\nToday, new sustainable developments combine these passive cooling lessons with high-efficiency solar panels, reflective pale rooftops, and smart shading screens that track the sun's angle. By cutting electricity demand first and generating renewable power on site, desert cities can sharply reduce carbon emissions without sacrificing indoor comfort.",
    vocab: [
      { word: "abundant", meaningEn: "existing in very large quantities", meaningAr: "وفير وكثير جدًا", synonym: "plentiful", antonym: "scarce", example: "The region enjoys abundant sunlight." },
      { word: "revive", meaningEn: "to bring back into use or life", meaningAr: "يُحيي ويعيد استخدام", synonym: "restore", antonym: "abandon", example: "Architects are reviving traditional cooling methods." },
      { word: "absorb", meaningEn: "to take in heat, light, or liquid", meaningAr: "يمتص", synonym: "soak up", antonym: "reflect", example: "Thick walls absorbed heat slowly." },
      { word: "interior", meaningEn: "the inside part of a building", meaningAr: "داخلي", synonym: "indoor", antonym: "exterior", example: "Interior rooms stayed surprisingly cool." },
      { word: "renewable", meaningEn: "naturally replaced and never running out", meaningAr: "متجدد", synonym: "sustainable", antonym: "finite", example: "Solar power is a renewable energy source." },
      { word: "reduce", meaningEn: "to make smaller in amount or degree", meaningAr: "يقلّل ويخفض", synonym: "cut", antonym: "increase", example: "Green buildings reduce carbon emissions." },
    ],
    questions: [
      { kind: "comprehension", prompt: "How many hours of sunshine does Saudi Arabia receive annually according to the passage?", options: ["Around 300 hours", "About 1,000 hours", "More than 3,000 hours", "Exactly 10,000 hours"], correct: 2, explanation: { en: "The opening sentence mentions more than three thousand hours of sunshine every year.", ar: "تذكر الجملة الأولى أكثر من ثلاثة آلاف ساعة من أشعة الشمس سنويًا." } },
      { kind: "comprehension", prompt: "How did traditional thick mud-brick walls help in the afternoon?", options: ["They generated solar electricity", "They absorbed heat slowly so rooms stayed cooler", "They blocked all air from moving", "They reflected rain"], correct: 1, explanation: { en: "Paragraph 2 says thick walls absorbed heat slowly and kept interior rooms cool.", ar: "توضح الفقرة الثانية أن الجدران السميكة كانت تمتص الحرارة ببطء فتحافظ على برودة الغرف." } },
      { kind: "comprehension", prompt: "What modern features are combined with traditional cooling today?", options: ["Coal heaters and dark roofs", "Solar panels, reflective pale roofs, and smart shading screens", "Wooden ships and stone lanes", "Only larger air conditioners"], correct: 1, explanation: { en: "Paragraph 3 lists high-efficiency solar panels, reflective pale rooftops, and smart shading screens.", ar: "تعدد الفقرة الثالثة الألواح الشمسية والأسطح الفاتحة العاكسة ومظلات التظليل الذكية." } },
      { kind: "inference", prompt: "Why does the author suggest 'cutting electricity demand first'?", options: ["Using less energy makes solar power go much further", "Solar panels cannot power lights", "People should stop using buildings", "Modern roofs are darker"], correct: 0, explanation: { en: "Lowering cooling demand through passive design means clean power easily meets the remaining need.", ar: "تقليل استهلاك التبريد بالتصميم الذكي يجعل الطاقة الشمسية تغطي الاحتياج بكفاءة أكبر." } },
      { kind: "vocabulary", prompt: "What does 'passive cooling' refer to in paragraph 3?", options: ["Cooling through building design without heavy machinery", "Leaving windows broken", "Using extra electric fans", "Freezing water indoors"], correct: 0, explanation: { en: "Passive cooling uses shade, airflow, and wall thickness rather than mechanical cooling.", ar: "التبريد السلبي (الطبيعي) يعتمد على التصميم والظل وتدفق الهواء دون أجهزة كثيفة الاستهلاك." } },
      { kind: "vocabulary", prompt: "What does 'without sacrificing indoor comfort' mean?", options: ["Without giving up a comfortable inside temperature", "Without building roofs", "Without opening doors", "Without using sunlight"], correct: 0, explanation: { en: "'Sacrificing' means giving up something valuable; here residents still stay comfortable.", ar: "دون التضحية بالراحة الداخلية أي مع الحفاظ على راحة السكان." } },
      { kind: "synonym", prompt: "Which word is a synonym for 'abundant'?", options: ["plentiful", "tiny", "narrow", "weak"], correct: 0, explanation: { en: "'Plentiful' means available in large amounts, matching 'abundant'.", ar: "كلمة plentiful (وفير) مرادفة لكلمة abundant." } },
      { kind: "synonym", prompt: "Which word is closest in meaning to 'revive'?", options: ["restore", "ignore", "hide", "freeze"], correct: 0, explanation: { en: "'Restore' means to bring back into active use, matching 'revive'.", ar: "الفعل restore مرادف لـ revive بمعنى يُحيي ويعيد استخدام." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'absorb' (for light or heat)?", options: ["reflect", "reduce", "create", "cool"], correct: 0, explanation: { en: "'Reflect' bounces heat/light away instead of taking it in ('absorb').", ar: "الفعل reflect (يعكس) هو مضاد absorb (يمتص)." } },
      { kind: "antonym", prompt: "What is the antonym (opposite) of 'interior'?", options: ["exterior", "natural", "ancient", "modern"], correct: 0, explanation: { en: "'Exterior' refers to the outside of a building, opposite of 'interior'.", ar: "كلمة exterior (خارجي) عكس interior (داخلي)." } },
    ],
    pronunciation: "Desert cities can combine traditional passive cooling with renewable solar power.",
    pronunciationTip: {
      en: "Notice 'DEsert' (dry land, stress on syllable 1) vs 'desSERT' (sweet food, stress on syllable 2).",
      ar: "انتبه للفرق بين DEsert (صحراء، النبر على المقطع الأول) وdesSERT (حلوى، النبر على المقطع الثاني).",
    },
  }),
];
