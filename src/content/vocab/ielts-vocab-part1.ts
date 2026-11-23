import type { IeltsVocabEntry } from "./vocab-types";

/**
 * IELTS Band 7+ Vocabulary — Part 1 (30 curated entries).
 * Primary lexical reference: Cambridge Dictionary definitions, IPA & collocations.
 * Covers Topics 1–8 across Academic, High-Frequency, Topic-Specific, Collocations, Phrasal Verbs & Register.
 */
export const IELTS_VOCAB_PART1: IeltsVocabEntry[] = [
  // ---- 1. EDUCATION (4 entries) ----
  {
    id: "ielts-curriculum",
    word: "curriculum",
    ipa: "/kəˈrɪk.jə.ləm/",
    partOfSpeech: "noun (pl. curricula / curriculums)",
    category: "topic-specific",
    topic: "education",
    bandTarget: "7.0",
    definition: "The full group of subjects studied in a school, college, or university programme.",
    arabic: "المنهج الدراسي الكامل (مجموعة المواد المقررة في مدرسة أو جامعة)",
    collocations: [
      "national curriculum",
      "revise the curriculum",
      "integrate into the curriculum",
      "extracurricular activities",
    ],
    synonyms: ["syllabus (narrower: one course)", "programme of study"],
    antonyms: ["extracurricular activity"],
    wordFamily: ["curriculum (n)", "curricular (adj)", "extracurricular (adj)"],
    registerContrast: {
      everyday: "what students study at school",
      academic: "the school curriculum / national curriculum",
      whenToUse: {
        en: "Use 'curriculum' for the whole school programme and 'syllabus' when referring to a single subject's outline.",
        ar: "استخدم curriculum لمجموع المواد الدراسية، وsyllabus لخطة مقرر واحد فقط.",
      },
    },
    examples: [
      "Many educators argue that financial literacy should be integrated into the secondary school curriculum.",
      "Revising the national curriculum takes years of consultation with teachers and universities.",
    ],
    ieltsSpeaking: {
      prompt: "Should schools teach practical life skills alongside academic subjects?",
      sample:
        "Definitely—integrating practical skills such as budgeting into the school curriculum prepares teenagers for real independence.",
      tip: {
        en: "Pair 'curriculum' naturally with verbs like 'integrate into' or 'update' rather than 'put in'.",
        ar: "اربط الكلمة بأفعال طبيعية مثل integrate into أو update بدل put in.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Some people believe art and music should be removed from the school curriculum.",
      sample:
        "Removing creative subjects from the national curriculum would narrow students' cognitive development and undermine long-term innovation.",
      tip: {
        en: "Avoid writing 'a curriculum of mathematics'—use 'the mathematics syllabus' or 'the wider school curriculum'.",
        ar: "تجنب قول a curriculum of mathematics؛ استخدم syllabus لمادة واحدة وcurriculum للمنهج العام.",
      },
    },
    commonMistake: {
      wrong: "Schools should put coding in the curriculums of every students.",
      right: "Schools should integrate coding into the school curriculum.",
      why: {
        en: "Use 'integrate into the curriculum' (singular for a school's overall programme).",
        ar: "نستخدم integrate into the curriculum بصيغة المفرد للمنهج العام.",
      },
    },
  },
  {
    id: "ielts-foster",
    word: "foster",
    ipa: "/ˈfɒs.tər/ (UK) · /ˈfɑː.stɚ/ (US)",
    ukUsNote: {
      en: "UK drops the final /r/ (/ˈfɒs.tər/); US pronounces a clear rhotic /r/ (/ˈfɑː.stɚ/).",
      ar: "في البريطانية لا يُنطق حرف r في النهاية، بينما يُنطق بوضوح في الأمريكية.",
    },
    partOfSpeech: "verb",
    category: "academic",
    topic: "education",
    bandTarget: "7.5+",
    definition:
      "To encourage the development or growth of ideas, feelings, skills, or positive relationships.",
    arabic: "يُعزّز / يُنمّي / يرعى تطور مهارة أو فكرة أو علاقة إيجابية",
    collocations: [
      "foster critical thinking",
      "foster innovation",
      "foster a sense of belonging",
      "foster collaboration",
    ],
    synonyms: ["cultivate", "nurture", "promote", "encourage"],
    antonyms: ["stifle", "hinder", "discourage"],
    registerContrast: {
      everyday: "help students build good thinking skills",
      academic: "foster critical thinking and independent inquiry",
      whenToUse: {
        en: "Ideal for Writing Task 2 and Speaking Part 3 when describing gradual development of skills, culture, or trust.",
        ar: "مثالية للكتابة الأكاديمية والجزء الثالث من التحدث عند وصف تنمية المهارات أو الإبداع تدريجيًا.",
      },
    },
    examples: [
      "Interactive classrooms foster curiosity far more effectively than rote memorisation.",
      "Public libraries foster a sense of community across different age groups.",
    ],
    ieltsSpeaking: {
      prompt: "What makes a truly effective teacher?",
      sample:
        "Beyond explaining rules clearly, a great teacher fosters curiosity so learners keep asking questions outside class.",
      tip: {
        en: "Only use 'foster' with positive abstract nouns (creativity, trust, teamwork)—never with concrete objects.",
        ar: "تُستخدم foster مع المعاني الإيجابية المجردة فقط مثل الإبداع والثقة، لا مع الأشياء المادية.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "How can universities better prepare graduates for modern careers?",
      sample:
        "Universities can foster adaptability by combining theoretical coursework with project-based industry placements.",
      tip: {
        en: "Collocates powerfully with 'innovation', 'adaptability', and 'social cohesion' in Task 2 essays.",
        ar: "تتلازم بقوة مع كلمات مثل innovation وadaptability وsocial cohesion.",
      },
    },
    commonMistake: {
      wrong: "Good teachers foster students to study harder.",
      right: "Good teachers foster a love of learning among students.",
      why: {
        en: "'Foster' takes a direct abstract noun (foster + noun), NOT 'foster someone to do' (use 'encourage someone to do').",
        ar: "يتبع foster اسم مجرد مباشرة، ولا يُقال foster someone to do بل encourage someone to do.",
      },
    },
  },
  {
    id: "ielts-rote-learning",
    word: "rote learning",
    ipa: "/ˌrəʊt ˈlɜː.nɪŋ/",
    partOfSpeech: "noun phrase (uncountable)",
    category: "collocations",
    topic: "education",
    bandTarget: "7.5+",
    definition:
      "Learning something by repeating it mechanically until remembered, rather than understanding it deeply.",
    arabic: "التعلّم بالتلقين والحفظ الآلي دون فهم عميق",
    collocations: [
      "rely heavily on rote learning",
      "move away from rote learning",
      "rote memorisation",
    ],
    synonyms: ["mechanical memorisation", "learning by heart"],
    antonyms: ["conceptual understanding", "experiential learning"],
    registerContrast: {
      everyday: "just memorising things without understanding",
      academic: "excessive reliance on rote learning",
      whenToUse: {
        en: "Precise education collocation for critiquing exam-heavy systems in Writing Task 2 or Speaking Part 3.",
        ar: "تعبير دقيق لنقد أنظمة الحفظ الصمّ في مقالات التعليم بالآيلتس.",
      },
    },
    examples: [
      "Critics warn that excessive reliance on rote learning leaves graduates underprepared for problem-solving.",
      "While rote learning can help beginners recall basic vocabulary, it cannot replace genuine communication practice.",
    ],
    ieltsSpeaking: {
      prompt: "Has education changed since your parents were at school?",
      sample:
        "Noticeably, yes. Schools are gradually moving away from rote learning towards group projects and real-world research.",
      tip: {
        en: "Use 'move away from rote learning' to sound fluent and balanced in Part 3 discussions.",
        ar: "عبارة move away from rote learning تبدو سلسة وطبيعية جدًا في الجزء الثالث من التحدث.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Should exams be replaced by continuous assessment?",
      sample:
        "Continuous assessment reduces pressure on rote learning and rewards steady analytical progress throughout the year.",
      tip: {
        en: "Treat 'rote learning' as uncountable—never write 'a rote learning' or 'rote learnings'.",
        ar: "تُعامل rote learning كاسم غير معدود دائمًا دون a أو جمع.",
      },
    },
    commonMistake: {
      wrong: "Many schools still use a rote learning to pass exams.",
      right: "Many schools still rely on rote learning to prepare students for exams.",
      why: {
        en: "'Rote learning' is uncountable and collocates naturally with 'rely on' rather than 'use a'.",
        ar: "الكلمة غير معدودة وتتلازم طبيعيًا مع rely on.",
      },
    },
  },
  {
    id: "ielts-drop-out",
    word: "drop out (of)",
    ipa: "/ˌdrɒp ˈaʊt/",
    partOfSpeech: "phrasal verb",
    category: "phrasal-verbs",
    topic: "education",
    bandTarget: "7.0",
    definition: "To leave a school, university, or course before finishing it.",
    arabic: "ينسحب أو ينقطع عن الدراسة قبل إكمالها",
    collocations: [
      "drop out of university",
      "high dropout rate",
      "forced to drop out due to financial pressure",
    ],
    synonyms: ["withdraw from (formal)", "discontinue one's studies"],
    antonyms: ["enrol in", "graduate from"],
    wordFamily: ["drop out (v)", "dropout (n)"],
    registerContrast: {
      everyday: "drop out of college",
      academic: "withdraw from higher education / student attrition",
      whenToUse: {
        en: "'Drop out' is natural in Speaking and acceptable in Task 2, while 'withdraw from' or 'dropout rate' is even more formal in Writing.",
        ar: "تُستخدم drop out بطبيعية في التحدث، بينما withdraw from وdropout rate أكثر رسمية في الكتابة.",
      },
    },
    examples: [
      "Rising tuition fees have forced some promising undergraduates to drop out of university.",
      "Mentoring programmes significantly lowered the first-year dropout rate.",
    ],
    ieltsSpeaking: {
      prompt: "Why do some students fail to complete university degrees?",
      sample:
        "Financial strain is a major factor, though some learners also drop out because they chose a major under family pressure.",
      tip: {
        en: "Include 'of' whenever you name the institution: 'drop out OF university'.",
        ar: "أضف حرف الجر of عند ذكر اسم المؤسسة: drop out of university.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "How can governments improve university completion rates?",
      sample:
        "Targeted scholarships and early academic counselling can prevent disadvantaged learners from dropping out before graduation.",
      tip: {
        en: "Distinguish the two-word verb 'drop out' from the one-word noun 'dropout rate'.",
        ar: "فرّق بين الفعل من كلمتين drop out والاسم من كلمة واحدة dropout rate.",
      },
    },
    commonMistake: {
      wrong: "He dropped out from the course after two months.",
      right: "He dropped out of the course after two months.",
      why: {
        en: "The standard preposition after 'drop out' is 'of', not 'from'.",
        ar: "حرف الجر الصحيح بعد drop out هو of وليس from.",
      },
    },
  },

  // ---- 2. TECHNOLOGY & AI (4 entries) ----
  {
    id: "ielts-ubiquitous",
    word: "ubiquitous",
    ipa: "/juːˈbɪk.wɪ.təs/",
    partOfSpeech: "adjective",
    category: "academic",
    topic: "technology-ai",
    bandTarget: "8.0+",
    definition: "Seeming to be everywhere or in very many places at the same time.",
    arabic: "منتشر في كل مكان / حاضر على نطاق واسع جدًا",
    collocations: [
      "become ubiquitous",
      "ubiquitous presence",
      "ubiquitous smartphones",
      "virtually ubiquitous",
    ],
    synonyms: ["widespread", "omnipresent", "pervasive"],
    antonyms: ["rare", "scarce", "uncommon"],
    wordFamily: ["ubiquitous (adj)", "ubiquity (n)", "ubiquitously (adv)"],
    registerContrast: {
      everyday: "Smartphones are everywhere these days.",
      academic: "Smartphones have become virtually ubiquitous in modern urban life.",
      whenToUse: {
        en: "Use sparingly (once per essay!) when describing genuinely universal modern phenomena like smartphones, CCTV, or digital payments.",
        ar: "استخدمها باعتدال (مرة واحدة في المقال) للظواهر المنتشرة فعليًا في كل مكان كالهواتف الذكية.",
      },
    },
    examples: [
      "Contactless payment terminals have become ubiquitous across supermarkets and cafés.",
      "The ubiquity of algorithmic feeds has reshaped how young people consume news.",
    ],
    ieltsSpeaking: {
      prompt: "How has technology changed everyday shopping?",
      sample:
        "Mobile payments are practically ubiquitous now—most people barely carry cash anymore.",
      tip: {
        en: "Pronounce the first syllable /juː/ ('yoo-BIK-wi-tus') clearly so the examiner catches it immediately.",
        ar: "انطق المقطع الأول بوضوح يـو-بِك-وِ-تَس مع التشديد على المقطع الثاني.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Does constant connectivity improve or harm human relationships?",
      sample:
        "Although messaging apps have become ubiquitous, effortless contact does not always translate into deeper emotional connection.",
      tip: {
        en: "Never write 'very ubiquitous'—it is an extreme adjective; use 'virtually ubiquitous' or 'almost ubiquitous'.",
        ar: "لا تقل very ubiquitous لأنها صفة قوية بحد ذاتها؛ استخدم virtually ubiquitous.",
      },
    },
    commonMistake: {
      wrong: "Social media is very ubiquitous in everywhere.",
      right: "Social media has become virtually ubiquitous.",
      why: {
        en: "'Ubiquitous' already means 'everywhere', so adding 'in everywhere' is redundant and 'very' clashes with its absolute meaning.",
        ar: "الكلمة تعني أصلًا «في كل مكان»، لذا إضافة in everywhere أو very خطأ تكراري.",
      },
    },
  },
  {
    id: "ielts-automation",
    word: "automation",
    ipa: "/ˌɔː.təˈmeɪ.ʃən/",
    partOfSpeech: "noun (uncountable)",
    category: "topic-specific",
    topic: "technology-ai",
    bandTarget: "7.0",
    definition:
      "The use of machines, software, or AI systems to perform tasks with minimal human intervention.",
    arabic: "الأتمتة (تشغيل المهام آليًا بالبرمجيات أو الذكاء الاصطناعي)",
    collocations: [
      "widespread automation",
      "displaced by automation",
      "embrace automation",
      "rapid pace of automation",
    ],
    synonyms: ["mechanisation", "computerisation"],
    antonyms: ["manual labour", "handcrafted production"],
    wordFamily: ["automate (v)", "automation (n)", "automated (adj)", "automatic (adj)"],
    registerContrast: {
      everyday: "robots doing people's jobs",
      academic: "workforce displacement driven by rapid automation",
      whenToUse: {
        en: "Essential topic noun for AI, employment, and manufacturing questions in IELTS.",
        ar: "مصطلح محوري في أسئلة الذكاء الاصطناعي وسوق العمل.",
      },
    },
    examples: [
      "While automation streamlines repetitive data entry, it raises serious concerns about job displacement.",
      "Retraining schemes help workers adapt to increasingly automated workplaces.",
    ],
    ieltsSpeaking: {
      prompt: "Which jobs do you think AI will change the most?",
      sample:
        "Routine administrative roles are already seeing rapid automation, whereas jobs needing empathy remain deeply human.",
      tip: {
        en: "Contrast 'automated' (made automatic by systems) with 'automatic' (happening by itself).",
        ar: "فرّق بين automated (مُؤتمت بنظام) وautomatic (تلقائي).",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Will artificial intelligence create more jobs than it destroys?",
      sample:
        "History suggests that automation eliminates routine positions while simultaneously generating specialised roles in maintenance and oversight.",
      tip: {
        en: "Pair with 'job displacement' or 'reskilling' to show strong topic-specific lexical range.",
        ar: "اربطها بـ job displacement أو reskilling لإظهار ثراء مفردات موضوعي قوي.",
      },
    },
    commonMistake: {
      wrong: "The automations are replacing many factory workers.",
      right: "Automation is replacing many routine factory tasks.",
      why: {
        en: "'Automation' is uncountable—always use singular verbs ('Automation is...').",
        ar: "كلمة automation غير معدودة وتأخذ الفعل المفرد دائمًا.",
      },
    },
  },
  {
    id: "ielts-cutting-edge",
    word: "cutting-edge",
    ipa: "/ˌkʌt.ɪŋ ˈedʒ/",
    partOfSpeech: "adjective",
    category: "idioms",
    topic: "technology-ai",
    bandTarget: "7.5+",
    definition:
      "Using the most modern, advanced, and innovative ideas, tools, or technology available.",
    arabic: "متطور للغاية / في طليعة التكنولوجيا الحديثة",
    collocations: [
      "cutting-edge technology",
      "cutting-edge medical research",
      "at the cutting edge of AI",
    ],
    synonyms: ["state-of-the-art", "groundbreaking", "pioneering"],
    antonyms: ["outdated", "obsolete", "antiquated"],
    registerContrast: {
      everyday: "brand-new / super modern tech",
      academic: "cutting-edge / state-of-the-art diagnostics",
      whenToUse: {
        en: "Natural and idiomatic in Speaking and acceptable in semi-formal Task 2 essays when describing genuine breakthroughs.",
        ar: "تعبير اصطلاحي حديث ومقبول في التحدث والمقالات عند وصف التقنيات الرائدة فعلًا.",
      },
    },
    examples: [
      "Hospitals are adopting cutting-edge imaging software to detect illnesses much earlier.",
      "Universities need sustained funding to remain at the cutting edge of clean-energy science.",
    ],
    ieltsSpeaking: {
      prompt: "What piece of technology has impressed you recently?",
      sample:
        "Real-time voice translation apps feel truly cutting-edge—they let travellers hold natural conversations abroad.",
      tip: {
        en: "Hyphenate 'cutting-edge' before a noun ('cutting-edge software'), and drop the hyphen in 'at the cutting edge of...'.",
        ar: "نضع الشرطة قبل الاسم (cutting-edge software) ونحذفها في عبارة at the cutting edge of.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Should governments invest more in space exploration or local services?",
      sample:
        "Investment in cutting-edge aerospace research often yields medical and communications breakthroughs that benefit ordinary citizens.",
      tip: {
        en: "Do not overuse cliché idioms in Task 2—'cutting-edge' works specifically because it is established in professional/academic journalism.",
        ar: "تجنب المبالغة في التعابير العامية؛ cutting-edge مقبولة لأنها شائعة في الكتابة العلمية والمهنية.",
      },
    },
    commonMistake: {
      wrong: "This phone is very cutting-edge technology.",
      right: "This phone features cutting-edge camera technology.",
      why: {
        en: "Avoid pairing 'cutting-edge' with 'very', and use it directly before a specific noun.",
        ar: "لا نضع very قبل cutting-edge ونستخدمها قبل اسم محدد.",
      },
    },
  },
  {
    id: "ielts-double-edged-sword",
    word: "a double-edged sword",
    ipa: "/ˌdʌb.əl.edʒd ˈsɔːd/",
    partOfSpeech: "noun phrase (idiom)",
    category: "idioms",
    topic: "technology-ai",
    bandTarget: "7.5+",
    definition:
      "Something that produces both clear advantages and serious disadvantages at the same time.",
    arabic: "سلاح ذو حدين (له فوائد واضحة وأضرار خطيرة في الوقت نفسه)",
    collocations: [
      "prove to be a double-edged sword",
      "act as a double-edged sword",
      "something of a double-edged sword",
    ],
    synonyms: ["a mixed blessing", "both a boon and a burden"],
    antonyms: ["an unmitigated benefit"],
    registerContrast: {
      everyday: "has good sides and bad sides",
      academic:
        "presents both substantial benefits and notable drawbacks (or 'a double-edged sword' in Speaking)",
      whenToUse: {
        en: "Strong in IELTS Speaking Part 3; in Writing Task 2, prefer direct balanced phrasing like 'presents both benefits and risks' unless used once with precision.",
        ar: "ممتازة في الجزء الثالث من التحدث؛ أما في كتابة المقال فالأفضل غالبًا الصياغة الأكاديمية المباشرة أو استخدامها مرة واحدة بدقة.",
      },
    },
    examples: [
      "Generative AI has proved to be a double-edged sword for journalists, speeding up research while amplifying misinformation.",
      "Remote work can be a double-edged sword: it eliminates commuting but blurs the boundary between home and office.",
    ],
    ieltsSpeaking: {
      prompt: "Has social media made society more connected?",
      sample:
        "Honestly, it's something of a double-edged sword—we can message friends across continents instantly, yet face-to-face time has dropped.",
      tip: {
        en: "Always explain BOTH edges immediately after using the idiom so your answer shows true mastery.",
        ar: "اشرح الحدين (الإيجابية والسلبية) مباشرة بعد استخدام التعبير لإظهار فهم دقيق.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Discuss both views on artificial intelligence in education.",
      sample:
        "While AI tutors can personalise revision, over-reliance on automated answers poses a genuine threat to independent reasoning.",
      tip: {
        en: "Notice how this Task 2 sentence achieves Band 7.5+ using formal balance instead of overused idioms.",
        ar: "لاحظ كيف تحقق جملة الكتابة درجة عالية بصياغة أكاديمية متوازنة دون حشو تعابير مستهلكة.",
      },
    },
    commonMistake: {
      wrong: "Technology is a double-edge sword.",
      right: "Technology is a double-edged sword.",
      why: {
        en: "Always include '-ed' in 'double-edged' (and the article 'a').",
        ar: "لا تنسَ لاحقة -ed في double-edged ولا أداة التنكير a.",
      },
    },
  },

  // ---- 3. ENVIRONMENT & CLIMATE CHANGE (4 entries) ----
  {
    id: "ielts-mitigate",
    word: "mitigate",
    ipa: "/ˈmɪt.ɪ.ɡeɪt/",
    partOfSpeech: "verb",
    category: "academic",
    topic: "environment-climate",
    bandTarget: "7.5+",
    definition: "To make something harmful, unpleasant, or severe less intense or less damaging.",
    arabic: "يُخفّف من حدة (ضرر أو خطر أو أزمة)",
    collocations: [
      "mitigate the effects of climate change",
      "mitigate environmental damage",
      "mitigate risks",
      "mitigation measures",
    ],
    synonyms: ["alleviate", "lessen", "curb", "cushion"],
    antonyms: ["exacerbate", "aggravate", "intensify"],
    wordFamily: ["mitigate (v)", "mitigation (n)", "mitigating (adj)"],
    registerContrast: {
      everyday: "make the bad effects smaller",
      academic: "mitigate the adverse impacts of climate change",
      whenToUse: {
        en: "Use 'mitigate' strictly with negative nouns (risks, harm, heatwaves, emissions impact)—never with positive things.",
        ar: "تُستخدم mitigate مع المشكلات والأضرار السلبية فقط مثل المخاطر والانبعاثات.",
      },
    },
    examples: [
      "Expanding urban tree canopies can significantly mitigate extreme summer heat in densely populated cities.",
      "Coastal wetlands act as natural barriers that mitigate storm-surge flooding.",
    ],
    ieltsSpeaking: {
      prompt: "What can cities do to deal with hotter summers?",
      sample:
        "Planting native trees and expanding shaded walkways are practical ways to mitigate extreme urban heat.",
      tip: {
        en: "Contrast 'mitigate' (reduce harm) with its exact academic antonym 'exacerbate' (make harm worse).",
        ar: "احفظها مع ضدها الأكاديمي المباشر exacerbate (يفاقم الضرر).",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Can individual actions solve climate change, or must governments lead?",
      sample:
        "Individual habits help, yet binding government policy is indispensable to mitigate carbon emissions at scale.",
      tip: {
        en: "Avoid writing 'mitigate the problem completely'—'mitigate' means reduce severity, not eliminate 100%.",
        ar: "تعني mitigate التخفيف من الحدة لا الإزالة التامة، فلا تكتب mitigate completely.",
      },
    },
    commonMistake: {
      wrong: "Governments must mitigate people to recycle more.",
      right: "Governments must implement policies to mitigate plastic pollution.",
      why: {
        en: "The object of 'mitigate' is always a harmful condition or effect, never a person.",
        ar: "المفعول به بعد mitigate يكون دائمًا ضررًا أو خطرًا، لا شخصًا.",
      },
    },
  },
  {
    id: "ielts-exacerbate",
    word: "exacerbate",
    ipa: "/ɪɡˈzæs.ə.beɪt/",
    partOfSpeech: "verb",
    category: "synonyms",
    topic: "environment-climate",
    bandTarget: "7.5+",
    definition: "To make an existing problem, bad situation, or negative feeling worse.",
    arabic: "يُفاقم / يزيد مشكلة قائمة سوءًا",
    collocations: [
      "exacerbate water scarcity",
      "exacerbate social inequality",
      "exacerbate air pollution",
      "further exacerbated by",
    ],
    synonyms: ["aggravate", "worsen", "compound", "intensify"],
    antonyms: ["mitigate", "alleviate", "ease"],
    wordFamily: ["exacerbate (v)", "exacerbation (n)"],
    registerContrast: {
      everyday: "make a bad situation even worse",
      academic: "exacerbate existing water scarcity",
      whenToUse: {
        en: "Only use when a problem ALREADY exists and a second factor makes it worse.",
        ar: "تُستخدم فقط عندما تكون هناك مشكلة قائمة أصلًا ويأتي عامل آخر ليزيدها سوءًا.",
      },
    },
    examples: [
      "Prolonged drought has been exacerbated by inefficient agricultural irrigation.",
      "Unregulated coastal construction can exacerbate soil erosion.",
    ],
    ieltsSpeaking: {
      prompt: "Is traffic pollution getting worse in major cities?",
      sample:
        "Unfortunately yes—rapid population growth has exacerbated congestion, especially where public transport is limited.",
      tip: {
        en: "Stress the second syllable clearly: ig-ZAS-uh-bayt.",
        ar: "شدّد المقطع الثاني عند النطق: إغ-زاس-أ-بيت.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "What are the main causes of urban housing shortages?",
      sample:
        "Speculative investment has exacerbated housing unaffordability for young working families.",
      tip: {
        en: "Use passive 'is exacerbated by' to vary sentence structure cleanly in Task 2 body paragraphs.",
        ar: "استخدام المبني للمجهول is exacerbated by يمنح مقالك تنوعًا نحويًا قويًا.",
      },
    },
    commonMistake: {
      wrong: "Clean energy will exacerbate our air quality.",
      right:
        "Clean energy will improve our air quality (whereas coal use exacerbates air pollution).",
      why: {
        en: "'Exacerbate' ONLY describes making something negative worse—never use it for positive improvement!",
        ar: "تُستخدم exacerbate لزيادة السوء فقط ولا تُستخدم أبدًا للتحسّن الإيجابي.",
      },
    },
  },
  {
    id: "ielts-sustainable",
    word: "sustainable",
    ipa: "/səˈsteɪ.nə.bəl/",
    partOfSpeech: "adjective",
    category: "word-formation",
    topic: "environment-climate",
    bandTarget: "7.0",
    definition:
      "Able to continue over a long period without damaging the environment or exhausting natural resources.",
    arabic: "مستدام (قادر على الاستمرار طويلًا دون استنزاف الموارد أو الإضرار بالبيئة)",
    collocations: [
      "sustainable development",
      "environmentally sustainable",
      "financially sustainable",
      "sustainable agriculture",
    ],
    synonyms: ["viable", "renewable (for energy)", "eco-friendly (less formal)"],
    antonyms: ["unsustainable", "short-sighted"],
    wordFamily: [
      "sustain (v)",
      "sustainable (adj)",
      "unsustainable (adj)",
      "sustainability (n)",
      "sustainably (adv)",
    ],
    registerContrast: {
      everyday: "good for the planet in the long run",
      academic: "environmentally and economically sustainable",
      whenToUse: {
        en: "Versatile across environment, urban planning, tourism, and business finance ('financially sustainable').",
        ar: "متعددة الاستخدامات في البيئة والسياحة والتخطيط العمراني وحتى التمويل المستدام.",
      },
    },
    examples: [
      "Transitioning to solar power is vital for building a sustainable energy grid.",
      "Without stricter water quotas, current farming practices will prove unsustainable within two decades.",
    ],
    ieltsSpeaking: {
      prompt: "How can tourists travel more responsibly?",
      sample:
        "Choosing trains over short-haul flights and staying in eco-certified hotels are simple steps towards sustainable tourism.",
      tip: {
        en: "Show word-formation control by using both 'sustainable' (adj) and 'sustainability' (n) accurately.",
        ar: "أظهر تحكمك بالاشتقاق باستخدام الصفة sustainable والاسم sustainability في مواضعهما الصحيحة.",
      },
    },
    ieltsWriting: {
      task: "Task 1",
      prompt:
        "The chart compares electricity generated from fossil fuels and renewable sources (2000–2025).",
      sample:
        "Between 2010 and 2025, the share of sustainable energy rose sharply from 14% to nearly 42%.",
      tip: {
        en: "In Task 1, pair 'sustainable energy' with accurate trend verbs like 'rose sharply' or 'overtook'.",
        ar: "في المهمة الأولى اربطها بأفعال وصف الاتجاه الدقيقة مثل rose sharply أو overtook.",
      },
    },
    commonMistake: {
      wrong: "We must protect sustainability development for future.",
      right: "We must promote sustainable development for future generations.",
      why: {
        en: "Use the adjective 'sustainable' before the noun 'development' (not the noun 'sustainability').",
        ar: "استخدم الصفة sustainable قبل الاسم development وليس الاسم sustainability.",
      },
    },
  },
  {
    id: "ielts-phase-out",
    word: "phase out",
    ipa: "/ˌfeɪz ˈaʊt/",
    partOfSpeech: "phrasal verb",
    category: "phrasal-verbs",
    topic: "environment-climate",
    bandTarget: "7.5+",
    definition:
      "To gradually stop using, producing, or providing something over a planned period of time.",
    arabic: "يتخلص من شيء تدريجيًا وفق خطة زمنية",
    collocations: [
      "phase out single-use plastics",
      "phase out coal-fired power stations",
      "gradually phased out",
    ],
    synonyms: ["discontinue gradually", "wind down"],
    antonyms: ["phase in", "introduce", "roll out"],
    registerContrast: {
      everyday: "slowly stop using plastic bags",
      academic: "gradually phase out single-use plastics",
      whenToUse: {
        en: "One of the rare phrasal verbs that is completely standard in formal academic & policy writing.",
        ar: "من الأفعال المركبة القليلة المقبولة تمامًا في الكتابة الأكاديمية والرسمية.",
      },
    },
    examples: [
      "Several European nations have pledged to phase out petrol cars by 2035.",
      "Single-use plastic bags were phased out across major supermarkets over a three-year period.",
    ],
    ieltsSpeaking: {
      prompt: "Should plastic packaging be banned immediately?",
      sample:
        "An overnight ban might disrupt food supply, so it makes more sense to phase out unnecessary plastics over three to five years.",
      tip: {
        en: "Pair with a realistic timeframe ('over the next decade') to sound nuanced and Band 7+.",
        ar: "اربطها بإطار زمني واقعي لتبدو إجابتك منطقية وناضجة.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "How should countries transition away from fossil fuels?",
      sample:
        "Governments should phase out fossil-fuel subsidies while investing the savings in affordable public transit.",
      tip: {
        en: "Do not confuse 'phase out' (stop gradually) with 'face out' (incorrect spelling).",
        ar: "انتبه للإملاء الصحيح: phase out بحرف ph وليس face out.",
      },
    },
    commonMistake: {
      wrong: "Cities should face out old diesel buses.",
      right: "Cities should phase out old diesel buses.",
      why: {
        en: "The verb is 'phase' (a stage in a process), not 'face'.",
        ar: "الفعل الصحيح هو phase (مرحلة) وليس face.",
      },
    },
  },

  // ---- 4. HEALTH & LIFESTYLE (4 entries) ----
  {
    id: "ielts-sedentary",
    word: "sedentary",
    ipa: "/ˈsed.ən.tər.i/ (UK) · /ˈsed.ən.ter.i/ (US)",
    ukUsNote: {
      en: "UK uses 3–4 smooth syllables (/ˈsed.ən.tər.i/); US stresses the third syllable lightly (/ˈsed.ən.ter.i/).",
      ar: "تختلف حركة المقطع قبل الأخير قليلًا بين النطق البريطاني والأمريكي.",
    },
    partOfSpeech: "adjective",
    category: "collocations",
    topic: "health-lifestyle",
    bandTarget: "7.5+",
    definition: "Involving little physical exercise and spending long periods sitting down.",
    arabic: "خامل / يعتمد على الجلوس الطويل وقلة الحركة",
    collocations: [
      "sedentary lifestyle",
      "sedentary occupation",
      "lead a sedentary life",
      "combat sedentary habits",
    ],
    synonyms: ["inactive", "desk-bound"],
    antonyms: ["active", "physically demanding"],
    registerContrast: {
      everyday: "sitting down all day and not moving much",
      academic: "an increasingly sedentary lifestyle",
      whenToUse: {
        en: "Classic Band 7+ collocation in IELTS Health & Lifestyle essays and Speaking Part 3.",
        ar: "تلازم لفظي نموذجي لدرجة ٧+ في موضوعات الصحة ونمط الحياة.",
      },
    },
    examples: [
      "Office automation and screen-based leisure have contributed to a far more sedentary lifestyle.",
      "Doctors recommend short hourly walks to counter the health risks of sedentary occupations.",
    ],
    ieltsSpeaking: {
      prompt: "Are people today healthier than in the past?",
      sample:
        "Medical care is vastly better now, yet many adults lead much more sedentary lives because of desk jobs.",
      tip: {
        en: "Use the natural verb collocation 'lead a sedentary lifestyle', not 'make a sedentary lifestyle'.",
        ar: "استخدم الفعل الصحيح lead a sedentary lifestyle وليس make.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Why are obesity rates rising globally, and what measures can address this?",
      sample:
        "A combination of ultra-processed diets and increasingly sedentary routines has driven a steady rise in preventable chronic illnesses.",
      tip: {
        en: "Combine with 'preventable chronic illnesses' or 'cardiovascular health' for precise topic vocabulary.",
        ar: "اربطها بمصطلحات صحية دقيقة مثل preventable chronic illnesses.",
      },
    },
    commonMistake: {
      wrong: "Modern people do a sedentary lifestyle every day.",
      right: "Many modern urban residents lead a sedentary lifestyle.",
      why: {
        en: "The natural verb with 'lifestyle' is 'lead' or 'adopt', never 'do'.",
        ar: "الفعل الطبيعي مع lifestyle هو lead أو adopt وليس do.",
      },
    },
  },
  {
    id: "ielts-preventive",
    word: "preventive (preventative)",
    ipa: "/prɪˈven.tɪv/",
    ukUsNote: {
      en: "Both 'preventive' and 'preventative' are accepted in Cambridge Dictionary; 'preventive' is shorter and preferred in academic writing.",
      ar: "كلتا الصيغتين مقبولتان في قاموس كامبريدج، وتُفضل preventive في الكتابة الأكاديمية.",
    },
    partOfSpeech: "adjective",
    category: "word-formation",
    topic: "health-lifestyle",
    bandTarget: "7.5+",
    definition:
      "Intended to stop something undesirable, especially illness or injury, before it happens.",
    arabic: "وقائي (يهدف لمنع المرض أو الضرر قبل حدوثه)",
    collocations: [
      "preventive healthcare",
      "preventive measures",
      "preventive screening",
      "cost-effective preventive care",
    ],
    synonyms: ["proactive", "precautionary"],
    antonyms: ["curative", "reactive"],
    wordFamily: ["prevent (v)", "prevention (n)", "preventive (adj)", "preventable (adj)"],
    registerContrast: {
      everyday: "stopping illness before people get sick",
      academic: "investing in preventive healthcare rather than curative treatment",
      whenToUse: {
        en: "Distinguish 'preventive' (designed to prevent, e.g. preventive care) from 'preventable' (able to be prevented, e.g. preventable disease).",
        ar: "فرّق بين preventive (وقائي مثل الرعاية الوقائية) وpreventable (يمكن الوقاية منه مثل مرض قابل للوقاية).",
      },
    },
    examples: [
      "Funding preventive healthcare reduces long-term pressure on emergency hospital wards.",
      "Regular dental check-ups are a simple preventive measure against costly procedures.",
    ],
    ieltsSpeaking: {
      prompt: "Should governments spend more on hospitals or health education?",
      sample:
        "Both matter, of course, but preventive care—like nutrition classes and free check-ups—saves lives and money over time.",
      tip: {
        en: "Contrast 'preventive care' with 'treatment' or 'curative medicine' for a crystal-clear Band 7.5+ argument.",
        ar: "المقارنة بين preventive care وcurative treatment تمنح حجتك عمقًا ممتازًا.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Prevention is better than cure. To what extent do you agree?",
      sample:
        "Prioritising preventive screening allows clinicians to intervene early, lowering both mortality rates and public healthcare expenditure.",
      tip: {
        en: "Never mix up 'preventive care' (measures that prevent) and 'preventable illnesses' (illnesses that can be prevented).",
        ar: "لا تخلط بين preventive care (رعاية وقائية) وpreventable illnesses (أمراض يمكن تجنبها).",
      },
    },
    commonMistake: {
      wrong: "Vaccines are a preventable measure against infection.",
      right: "Vaccines are a preventive measure against preventable infections.",
      why: {
        en: "Measures are 'preventive'; diseases that can be avoided are 'preventable'.",
        ar: "الإجراءات توصف بـ preventive، أما الأمراض التي يمكن تفاديها فتوصف بـ preventable.",
      },
    },
  },
  {
    id: "ielts-detrimental",
    word: "detrimental",
    ipa: "/ˌdet.rɪˈmen.təl/",
    partOfSpeech: "adjective",
    category: "formal-informal",
    topic: "health-lifestyle",
    bandTarget: "7.5+",
    definition: "Causing harm, damage, or a negative effect.",
    arabic: "ضار / ذو أثر سلبي ملموس",
    collocations: [
      "have a detrimental effect on",
      "detrimental to mental health",
      "profoundly detrimental",
    ],
    synonyms: ["harmful", "damaging", "adverse", "injurious"],
    antonyms: ["beneficial", "advantageous", "constructive"],
    wordFamily: ["detriment (n)", "detrimental (adj)", "detrimentally (adv)"],
    registerContrast: {
      everyday: "bad for your sleep / harmful for health",
      academic: "detrimental to sleep quality and cognitive performance",
      whenToUse: {
        en: "Ideal for Writing Task 2 when replacing overused words like 'bad' or 'harmful'. In casual Speaking Part 1, 'bad for' or 'harmful' sounds more natural.",
        ar: "مثالية لمقال المهمة الثانية بدل تكرار bad أو harmful، بينما harmful أنسب للجزء الأول من التحدث.",
      },
    },
    examples: [
      "Chronic sleep deprivation has a detrimental impact on concentration and immune function.",
      "Excessive screen exposure late at night is demonstrably detrimental to adolescents' rest.",
    ],
    ieltsSpeaking: {
      prompt: "How does stress affect people's daily lives?",
      sample:
        "Long-term workplace stress can be really detrimental to both sleep quality and family relationships.",
      tip: {
        en: "Remember the exact preposition: 'detrimental TO' (never 'detrimental for' or 'detrimental on').",
        ar: "حرف الجر الدقيق هو detrimental to وليس for أو on.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Discuss the impact of fast food on modern society.",
      sample:
        "Heavy marketing of sugary beverages to children is deeply detrimental to long-term public health.",
      tip: {
        en: "Pair with 'have a detrimental impact on + noun' OR 'be detrimental to + noun'.",
        ar: "استخدم أحد التركيبين الدقيقين: be detrimental to أو have a detrimental impact on.",
      },
    },
    commonMistake: {
      wrong: "Smoking is very detrimental for your lungs.",
      right: "Smoking is severely detrimental to your lungs.",
      why: {
        en: "Always use the preposition 'to' after 'detrimental', and pair with adverbs like 'severely' or 'profoundly'.",
        ar: "تأخذ detrimental حرف الجر to دائمًا.",
      },
    },
  },
  {
    id: "ielts-burnout",
    word: "burnout",
    ipa: "/ˈbɜːn.aʊt/",
    partOfSpeech: "noun (uncountable)",
    category: "high-frequency",
    topic: "health-lifestyle",
    bandTarget: "7.0",
    definition:
      "Extreme physical or mental exhaustion caused by prolonged work stress or overwork.",
    arabic: "الاحتراق الوظيفي / الإرهاق النفسي والجسدي الشديد بسبب ضغط العمل المستمر",
    collocations: [
      "suffer from burnout",
      "prevent employee burnout",
      "risk of burnout",
      "burnout syndrome",
    ],
    synonyms: ["chronic exhaustion", "fatigue (milder)"],
    antonyms: ["vitality", "work-life balance"],
    wordFamily: ["burn out (phrasal verb)", "burnout (n)", "burnt-out (adj)"],
    registerContrast: {
      everyday: "feeling completely exhausted from work",
      academic: "experiencing occupational burnout",
      whenToUse: {
        en: "Natural and widely accepted in both IELTS Speaking and Writing when discussing work-life balance and mental health.",
        ar: "مقبولة وطبيعية جدًا في التحدث والكتابة عند مناقشة ضغط العمل والتوازن بين الحياة والعمل.",
      },
    },
    examples: [
      "Employees who answer work messages late at night face a higher risk of burnout.",
      "Flexible hours and realistic workloads help organisations prevent staff burnout.",
    ],
    ieltsSpeaking: {
      prompt: "Why is taking regular holidays important?",
      sample:
        "Stepping away from screens for a week lets your mind recharge and genuinely prevents burnout.",
      tip: {
        en: "Use 'suffer from burnout' or 'experience burnout'—never 'get a burnout'.",
        ar: "قل suffer from burnout أو experience burnout دون أداة التنكير a.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Do longer working hours lead to higher national productivity?",
      sample:
        "Beyond a certain threshold, extended working hours trigger staff burnout and actually reduce output per hour.",
      tip: {
        en: "Link 'burnout' with 'productivity' and 'staff retention' for strong analytical depth.",
        ar: "اربطها بمفاهيم الإنتاجية والاحتفاظ بالموظفين لعمق تحليلي أعلى.",
      },
    },
    commonMistake: {
      wrong: "Many doctors get a burnout from long shifts.",
      right: "Many doctors suffer from burnout due to long shifts.",
      why: {
        en: "'Burnout' is uncountable—drop 'a' and use 'suffer from' or 'experience'.",
        ar: "كلمة burnout غير معدودة فلا تأخذ a، وتتلازم مع suffer from.",
      },
    },
  },

  // ---- 5. BUSINESS & EMPLOYMENT (4 entries) ----
  {
    id: "ielts-lucrative",
    word: "lucrative",
    ipa: "/ˈluː.krə.tɪv/",
    partOfSpeech: "adjective",
    category: "synonyms",
    topic: "business-employment",
    bandTarget: "7.5+",
    definition: "Producing a large amount of money or financial profit.",
    arabic: "مُربِح جدًا / ذو عائد مالي مجزٍ",
    collocations: [
      "a lucrative career",
      "a lucrative market",
      "a lucrative contract",
      "prove highly lucrative",
    ],
    synonyms: ["profitable", "well-paid (for jobs)", "financially rewarding"],
    antonyms: ["unprofitable", "loss-making", "low-paying"],
    registerContrast: {
      everyday: "a job that pays a lot of money",
      academic: "a lucrative career path / a lucrative commercial sector",
      whenToUse: {
        en: "Use 'lucrative' for careers, deals, industries, or markets—NEVER to describe a rich person.",
        ar: "تصف الوظائف أو العقود أو الأسواق المربحة فقط، ولا تصف الأشخاص الأثرياء أبدًا.",
      },
    },
    examples: [
      "Data engineering has emerged as one of the most lucrative careers for recent graduates.",
      "Eco-tourism has grown into a lucrative sector for coastal communities.",
    ],
    ieltsSpeaking: {
      prompt: "What matters more when choosing a job: passion or salary?",
      sample:
        "A lucrative salary certainly brings security, yet passion is what keeps you motivated over twenty years.",
      tip: {
        en: "Pair naturally with 'career', 'contract', or 'industry'.",
        ar: "تتلازم طبيعيًا مع career وcontract وindustry.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Why do many graduates leave rural towns for capital cities?",
      sample:
        "Young professionals migrate to metropolitan hubs primarily in search of more lucrative employment and faster career progression.",
      tip: {
        en: "Avoid calling a person 'lucrative'—describe the job or business opportunity instead.",
        ar: "لا تصف شخصًا بأنه lucrative، بل صف الوظيفة أو القطاع التجاري.",
      },
    },
    commonMistake: {
      wrong: "My uncle is a very lucrative businessman.",
      right: "My uncle runs a highly lucrative logistics business.",
      why: {
        en: "'Lucrative' describes profit-generating businesses, jobs, or deals—not people (use 'wealthy' or 'successful' for people).",
        ar: "تصف lucrative الأعمال والصفقات المربحة، أما الأشخاص فنصفهم بـ wealthy أو successful.",
      },
    },
  },
  {
    id: "ielts-entrepreneurship",
    word: "entrepreneurship",
    ipa: "/ˌɒn.trə.prəˈnɜː.ʃɪp/",
    partOfSpeech: "noun (uncountable)",
    category: "word-formation",
    topic: "business-employment",
    bandTarget: "7.5+",
    definition:
      "The skill and activity of starting and running new businesses while taking calculated financial risks.",
    arabic: "ريادة الأعمال (تأسيس وإدارة مشروعات مبتكرة مع تحمّل مخاطر محسوبة)",
    collocations: [
      "encourage youth entrepreneurship",
      "entrepreneurial mindset",
      "social entrepreneurship",
    ],
    synonyms: ["enterprise", "business innovation"],
    antonyms: ["risk aversion"],
    wordFamily: ["entrepreneur (n)", "entrepreneurship (n)", "entrepreneurial (adj)"],
    registerContrast: {
      everyday: "starting your own small business",
      academic: "fostering youth entrepreneurship and small-enterprise growth",
      whenToUse: {
        en: "High-value term for economics, employment, and education questions.",
        ar: "مصطلح قوي في موضوعات الاقتصاد والبطالة والتعليم الجامعي.",
      },
    },
    examples: [
      "Small-business incubators promote youth entrepreneurship by offering mentorship and seed grants.",
      "An entrepreneurial mindset helps employees spot inefficiencies even inside large corporations.",
    ],
    ieltsSpeaking: {
      prompt: "Would you prefer to work for a large company or run your own business?",
      sample:
        "Entrepreneurship appeals to me because you can test fresh ideas quickly, although it does require strong financial discipline.",
      tip: {
        en: "Watch the spelling carefully in Writing: en-tre-pre-neur-ship.",
        ar: "انتبه لكتابة الكلمة بدقة إملائية في الاختبار: entrepreneurship.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "How can countries reduce youth unemployment?",
      sample:
        "Streamlining business licensing and offering micro-loans can stimulate entrepreneurship and diversify local economies.",
      tip: {
        en: "Use 'entrepreneur' for the person, 'entrepreneurship' for the concept, and 'entrepreneurial' before nouns like 'spirit' or 'skills'.",
        ar: "فرّق بين entrepreneur (رائد الأعمال)، وentrepreneurship (ريادة الأعمال)، وentrepreneurial (ريادي).",
      },
    },
    commonMistake: {
      wrong: "Universities should teach entrepreneur to all students.",
      right: "Universities should teach entrepreneurship (or entrepreneurial skills) to students.",
      why: {
        en: "'Entrepreneur' refers to a person; the subject or activity is 'entrepreneurship'.",
        ar: "كلمة entrepreneur تعني الشخص نفسه، أما المجال والنشاط فهو entrepreneurship.",
      },
    },
  },
  {
    id: "ielts-affect-effect",
    word: "affect vs. effect",
    ipa: "/əˈfekt/ (verb) · /ɪˈfekt/ (noun)",
    partOfSpeech: "verb vs. noun",
    category: "commonly-confused",
    topic: "business-employment",
    bandTarget: "7.0",
    definition:
      "'Affect' is usually a verb meaning to influence or cause a change; 'effect' is usually a noun meaning the result of a change.",
    arabic: "الفرق بين affect (فعل: يُؤثّر في) وeffect (اسم: الأثر أو النتيجة)",
    collocations: [
      "adversely affect productivity",
      "have a lasting effect on",
      "come into effect",
      "knock-on effect",
    ],
    synonyms: ["influence / impact (v)", "outcome / consequence (n)"],
    antonyms: ["leave unaffected"],
    registerContrast: {
      everyday: "change how well people work",
      academic: "adversely affect workforce morale / produce a measurable effect",
      whenToUse: {
        en: "Confusing 'affect' and 'effect' is one of the fastest ways to drop Lexical Resource accuracy below Band 7.",
        ar: "الخلط بين affect وeffect من أشهر الأخطاء التي تُنقص درجة الدقة اللغوية في الآيلتس.",
      },
    },
    examples: [
      "Flexible scheduling can positively affect employee retention without lowering output.",
      "The new remote-work policy had an immediate effect on daily commuter traffic.",
    ],
    ieltsSpeaking: {
      prompt: "Does workplace atmosphere affect how well people perform?",
      sample:
        "Absolutely—a supportive manager affects team confidence directly, and that has a huge positive effect on creativity.",
      tip: {
        en: "Quick check: A = Action (Affect is the verb); E = End result (Effect is the noun).",
        ar: "قاعدة سريعة: A للفعل (Affect) وE للنتيجة/الاسم (Effect).",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "How does inflation impact household spending?",
      sample:
        "Persistent inflation directly affects discretionary spending, creating a knock-on effect for small retail businesses.",
      tip: {
        en: "Never put 'on' directly after the verb 'affect': write 'affect productivity', NOT 'affect on productivity'.",
        ar: "لا تضع حرف الجر on بعد الفعل affect أبدًا؛ نقول affect productivity مباشرة.",
      },
    },
    commonMistake: {
      wrong: "Long commutes have a bad affect on workers and effect their health.",
      right: "Long commutes have a detrimental effect on workers and affect their health.",
      why: {
        en: "After 'a detrimental ___', you need the noun 'effect'; before 'their health', you need the verb 'affect'.",
        ar: "بعد الصفة نحتاج الاسم effect، وقبل المفعول به نحتاج الفعل affect.",
      },
    },
  },
  {
    id: "ielts-economic-economical",
    word: "economic vs. economical",
    ipa: "/ˌiː.kəˈnɒm.ɪk/ · /ˌiː.kəˈnɒm.ɪ.kəl/",
    partOfSpeech: "adjectives (commonly confused)",
    category: "commonly-confused",
    topic: "business-employment",
    bandTarget: "7.5+",
    definition:
      "'Economic' relates to a country's economy, trade, or money; 'economical' means using money, fuel, or resources efficiently without waste.",
    arabic:
      "الفرق بين economic (اقتصادي متعلق بالاقتصاد) وeconomical (مُقتَصِد / موفّر للمال أو الوقود)",
    collocations: [
      "economic growth",
      "economic downturn",
      "an economical hybrid car",
      "economical with resources",
    ],
    synonyms: ["financial (for economic)", "cost-effective / thrifty (for economical)"],
    antonyms: ["wasteful / extravagant (for economical)"],
    wordFamily: ["economy (n)", "economics (n)", "economic (adj)", "economical (adj)"],
    registerContrast: {
      everyday: "cheap to run / good for the country's money",
      academic: "fuel-economical transport / sustainable economic growth",
      whenToUse: {
        en: "Choosing the exact form demonstrates Band 7.5+ precision in word choice.",
        ar: "اختيار الصفة الدقيقة بينهما يعكس إتقانًا عاليًا للمفردات.",
      },
    },
    examples: [
      "Tourism generates vital economic growth for small island nations.",
      "Electric buses are far more economical to maintain over a ten-year period.",
    ],
    ieltsSpeaking: {
      prompt: "What kind of cars are most popular in your city?",
      sample:
        "Compact hybrids are becoming really popular because they're economical on fuel during heavy traffic.",
      tip: {
        en: "Think: economy/policy → economic; saving money/fuel → economical.",
        ar: "تذكّر: سياسة أو نمو الدولة ← economic؛ توفير المال أو الوقود ← economical.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Should economic growth always come before environmental protection?",
      sample:
        "Short-term economic expansion should never come at the expense of irreversible ecological decline.",
      tip: {
        en: "Always write 'economic growth', 'economic crisis', 'economic policy' (NEVER 'economical growth').",
        ar: "نقول دائمًا economic growth وeconomic policy وليس economical.",
      },
    },
    commonMistake: {
      wrong: "The government introduced new economical policies to boost jobs.",
      right: "The government introduced new economic policies to boost employment.",
      why: {
        en: "Policies relating to the national economy are 'economic'; 'economical' means money-saving or thrifty.",
        ar: "السياسات المتعلقة باقتصاد الدولة توصف بـ economic، أما economical فتعني موفّر ومقتصد.",
      },
    },
  },

  // ---- 6. GLOBALISATION (3 entries) ----
  {
    id: "ielts-interconnected",
    word: "interconnected",
    ipa: "/ˌɪn.tə.kəˈnek.tɪd/",
    partOfSpeech: "adjective",
    category: "high-frequency",
    topic: "globalisation",
    bandTarget: "7.0",
    definition:
      "Having different parts, countries, or systems linked closely together so changes in one affect the others.",
    arabic: "مترابط بشكل وثيق (بحيث يؤثر كل جزء في الآخر)",
    collocations: [
      "an increasingly interconnected world",
      "interconnected global supply chains",
      "deeply interconnected economies",
    ],
    synonyms: ["interdependent", "closely linked", "integrated"],
    antonyms: ["isolated", "self-contained", "disconnected"],
    wordFamily: ["interconnect (v)", "interconnected (adj)", "interconnectedness (n)"],
    registerContrast: {
      everyday: "countries are closely linked together",
      academic: "an increasingly interconnected global economy",
      whenToUse: {
        en: "Natural opener for globalisation, trade, climate, and digital communication essays.",
        ar: "افتتاحية طبيعية وقوية في موضوعات العولمة والتجارة الدولية.",
      },
    },
    examples: [
      "In an interconnected global economy, a port delay in one country can disrupt factories worldwide.",
      "Climate policy demands international treaties because ecological systems are deeply interconnected.",
    ],
    ieltsSpeaking: {
      prompt: "Is learning a second language more important today than in the past?",
      sample:
        "Definitely—because our world is so interconnected now, speaking English opens doors to international research and careers.",
      tip: {
        en: "Pair with 'increasingly' ('an increasingly interconnected world') for natural academic flow.",
        ar: "تتلازم بسلاسة مع increasingly: an increasingly interconnected world.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Does globalisation benefit developing nations?",
      sample:
        "Operating within an interconnected marketplace grants smaller nations access to export revenue, though local artisans may struggle to compete.",
      tip: {
        en: "Follow 'interconnected' with a concrete example (trade, travel, supply chains) rather than leaving it vague.",
        ar: "أتبِعها بمثال ملموس كالتجارة أو سلاسل الإمداد لتجنب العمومية.",
      },
    },
    commonMistake: {
      wrong: "Today we live in a very interconnect world.",
      right: "Today we live in an increasingly interconnected world.",
      why: {
        en: "Use the participle adjective 'interconnected' (with -ed) before the noun 'world'.",
        ar: "نستخدم الصفة interconnected قبل الاسم world وليس الفعل interconnect.",
      },
    },
  },
  {
    id: "ielts-homogenisation",
    word: "cultural homogenisation",
    ipa: "/ˌkʌl.tʃər.əl həˌmɒdʒ.ə.naɪˈzeɪ.ʃən/",
    ukUsNote: {
      en: "UK spelling: homogenisation; US spelling: homogenization. Stay consistent within one IELTS script.",
      ar: "تُكتب بالبريطانية homogenisation وبالأمريكية homogenization—التزم بنظام واحد في مقالك.",
    },
    partOfSpeech: "noun phrase (uncountable)",
    category: "topic-specific",
    topic: "globalisation",
    bandTarget: "8.0+",
    definition:
      "The process by which local cultures become increasingly similar due to global media, brands, and consumer habits.",
    arabic: "التجانس الثقافي / ذوبان الخصوصيات الثقافية المحلية في قالب عالمي واحد",
    collocations: [
      "accelerate cultural homogenisation",
      "resist cultural homogenisation",
      "threat of cultural homogenisation",
    ],
    synonyms: ["cultural standardisation", "loss of cultural distinctiveness"],
    antonyms: ["cultural diversity", "cultural preservation"],
    registerContrast: {
      everyday: "all cities starting to look the same with the same shops",
      academic: "accelerating cultural homogenisation across major urban centres",
      whenToUse: {
        en: "High-band topic phrase when discussing global retail chains, English dominance, and disappearing traditions.",
        ar: "مصطلح رفيع المستوى في مقالات العولمة وانتشار العلامات التجارية العالمية.",
      },
    },
    examples: [
      "Critics argue that multinational retail chains accelerate cultural homogenisation in historic high streets.",
      "Supporting regional festivals and local dialects helps societies resist cultural homogenisation.",
    ],
    ieltsSpeaking: {
      prompt: "Are cities around the world becoming too similar?",
      sample:
        "In some ways, yes—you see the same international coffee chains everywhere, which creates a sense of cultural homogenisation.",
      tip: {
        en: "Ground the term immediately with a vivid real-life image (coffee chains, malls, streaming) so it sounds natural.",
        ar: "قرّب المصطلح فورًا بمثال ملموس مثل المقاهي العالمية أو المجمعات التجارية.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Is the global spread of international brands a positive or negative trend?",
      sample:
        "While global brands offer consistent quality, their dominance risks triggering cultural homogenisation at the expense of independent local crafts.",
      tip: {
        en: "Use alongside 'indigenous traditions' or 'local heritage' for balanced lexical cohesion.",
        ar: "تتناغم مع مصطلحات مثل local heritage وregional traditions.",
      },
    },
    commonMistake: {
      wrong: "Globalisation makes cultural homogenisation to local cities.",
      right: "Globalisation accelerates cultural homogenisation in major cities.",
      why: {
        en: "Pair with natural academic verbs like 'accelerate', 'drive', or 'lead to'—not 'make ... to'.",
        ar: "تتلازم مع أفعال أكاديمية مثل accelerate أو drive بدل make.",
      },
    },
  },
  {
    id: "ielts-outsourcing",
    word: "outsourcing",
    ipa: "/ˈaʊt.sɔː.sɪŋ/",
    partOfSpeech: "noun (uncountable)",
    category: "topic-specific",
    topic: "globalisation",
    bandTarget: "7.0",
    definition:
      "The business practice of paying an external company—often in another country—to perform services or manufacture goods.",
    arabic: "الاستعانة بمصادر خارجية (إسناد مهام أو إنتاج لشركة خارجية أو دولة أخرى)",
    collocations: ["offshore outsourcing", "outsource customer support", "cost-saving outsourcing"],
    synonyms: ["subcontracting", "offshoring (specifically abroad)"],
    antonyms: ["in-house production", "insourcing"],
    wordFamily: ["outsource (v)", "outsourcing (n)", "outsourced (adj)"],
    registerContrast: {
      everyday: "paying another company abroad to do the work",
      academic: "outsourcing non-core operations to reduce overhead costs",
      whenToUse: {
        en: "Accurate terminology for both Globalisation and Business English discussions.",
        ar: "مصطلح دقيق لمناقشات العولمة وإدارة الأعمال.",
      },
    },
    examples: [
      "Many software firms rely on international outsourcing to provide round-the-clock technical support.",
      "While outsourcing lowers consumer prices, it can weaken domestic manufacturing capacity.",
    ],
    ieltsSpeaking: {
      prompt: "How has globalisation changed the workplace in your country?",
      sample:
        "International outsourcing has created thousands of tech and customer-service roles for bilingual graduates.",
      tip: {
        en: "Distinguish the verb 'outsource' ('firms outsource IT') from the noun 'outsourcing'.",
        ar: "فرّق بين الفعل outsource والاسم outsourcing.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Should governments restrict companies from moving factories overseas?",
      sample:
        "Although outsourcing reduces production costs, over-reliance on overseas factories can expose supply chains to geopolitical disruption.",
      tip: {
        en: "Pair with 'domestic employment' and 'supply chains' for clear Band 7+ coherence.",
        ar: "اربطها بـ domestic employment وsupply chains لتماسك أفكار قوي.",
      },
    },
    commonMistake: {
      wrong: "Companies outsourcing their accounting to save money.",
      right: "Companies outsource their accounting to reduce operating costs.",
      why: {
        en: "After the subject 'Companies', use the finite verb 'outsource', not the gerund 'outsourcing' alone.",
        ar: "بعد الفاعل نستخدم الفعل outsource وليس الاسم outsourcing وحده.",
      },
    },
  },

  // ---- 7. SOCIETY & SOCIAL ISSUES (4 entries) ----
  {
    id: "ielts-disparity",
    word: "disparity",
    ipa: "/dɪˈspær.ə.ti/",
    partOfSpeech: "noun (countable / uncountable)",
    category: "academic",
    topic: "society-issues",
    bandTarget: "7.5+",
    definition:
      "A noticeable and often unfair difference between two groups, levels, or conditions.",
    arabic: "تفاوت / فجوة واضحة (غالبًا غير عادلة بين فئتين أو منطقتين)",
    collocations: [
      "widening income disparity",
      "regional disparity",
      "bridge the disparity between",
      "stark disparity",
    ],
    synonyms: ["gap", "inequality", "imbalance"],
    antonyms: ["parity", "equality", "equivalence"],
    registerContrast: {
      everyday: "a big unfair gap between rich and poor",
      academic: "a widening socioeconomic disparity between urban and rural regions",
      whenToUse: {
        en: "Excellent formal noun for Writing Task 1 (comparing data gaps) and Task 2 (income, healthcare, or education gaps).",
        ar: "ممتازة جدًا في المهمة الأولى لوصف الفجوات الرقمية، وفي الثانية لمناقشة التفاوت الاجتماعي.",
      },
    },
    examples: [
      "The table highlights a stark disparity between urban and rural broadband speeds.",
      "Targeted regional investment is essential to narrow the income disparity across provinces.",
    ],
    ieltsSpeaking: {
      prompt: "Is there a noticeable gap between life in big cities and small towns?",
      sample:
        "Yes, there's still a clear disparity in job opportunities and specialist hospitals, though remote work is starting to help.",
      tip: {
        en: "Collocates naturally with 'narrow', 'bridge', or 'widen' ('narrow the disparity').",
        ar: "تتلازم طبيعيًا مع الأفعال narrow وbridge وwiden.",
      },
    },
    ieltsWriting: {
      task: "Task 1",
      prompt: "The bar chart compares average household income across five regions.",
      sample:
        "Overall, the most striking feature is the wide disparity between the capital region and the southern provinces.",
      tip: {
        en: "Use 'a stark disparity between A and B' in your Task 1 overview paragraph for an instant Band 7+ lift.",
        ar: "استخدام stark disparity between A and B في فقرة النظرة العامة يرفع درجة المعجم فورًا.",
      },
    },
    commonMistake: {
      wrong: "There is a big disparity of salaries among rich and poor.",
      right: "There is a wide disparity in salaries between high- and low-income groups.",
      why: {
        en: "Use 'disparity IN + topic + BETWEEN A and B'.",
        ar: "حروف الجر الدقيقة هي: disparity in ... between A and B.",
      },
    },
  },
  {
    id: "ielts-social-cohesion",
    word: "social cohesion",
    ipa: "/ˌsəʊ.ʃəl kəʊˈhiː.ʒən/",
    partOfSpeech: "noun phrase (uncountable)",
    category: "collocations",
    topic: "society-issues",
    bandTarget: "8.0+",
    definition:
      "The strength of trust, solidarity, and mutual respect that holds diverse members of a society together.",
    arabic: "التماسك الاجتماعي (قوة الروابط والثقة والتضامن بين أفراد المجتمع)",
    collocations: [
      "strengthen social cohesion",
      "undermine social cohesion",
      "promote social cohesion",
      "a threat to social cohesion",
    ],
    synonyms: ["community solidarity", "social unity"],
    antonyms: ["social fragmentation", "polarisation"],
    wordFamily: ["cohere (v)", "cohesion (n)", "cohesive (adj)"],
    registerContrast: {
      everyday: "people in a neighbourhood getting along well",
      academic: "strengthening social cohesion across diverse communities",
      whenToUse: {
        en: "High-precision collocation for essays on community spaces, volunteering, immigration, or inequality.",
        ar: "تعبير أكاديمي دقيق لمقالات التطوع والمساحات العامة والاندماج المجتمعي.",
      },
    },
    examples: [
      "Shared public parks and community libraries play a quiet but vital role in strengthening social cohesion.",
      "Unchecked online polarisation can gradually erode social cohesion.",
    ],
    ieltsSpeaking: {
      prompt: "Do neighbours know each other as well today as in the past?",
      sample:
        "Busy schedules make it harder, so local community events are really valuable for keeping social cohesion alive.",
      tip: {
        en: "Pair with active verbs: 'strengthen', 'foster', 'preserve', or 'erode'.",
        ar: "تتلازم بقوة مع الأفعال strengthen وfoster وpreserve وerode.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Should governments invest in free public parks and sports centres?",
      sample:
        "Accessible recreational facilities not only improve physical fitness but also foster social cohesion among residents from varied backgrounds.",
      tip: {
        en: "Remember 'cohesion' is uncountable—never write 'social cohesions'.",
        ar: "كلمة cohesion غير معدودة ولا تُجمع أبدًا.",
      },
    },
    commonMistake: {
      wrong: "Volunteering builds many social cohesions in cities.",
      right: "Volunteering strengthens social cohesion across urban neighbourhoods.",
      why: {
        en: "'Social cohesion' is an uncountable abstract noun phrase.",
        ar: "التعبير غير معدود فلا يسبقه many ولا يأخذ جمعًا.",
      },
    },
  },
  {
    id: "ielts-vulnerable",
    word: "vulnerable",
    ipa: "/ˈvʌl.nər.ə.bəl/",
    partOfSpeech: "adjective",
    category: "high-frequency",
    topic: "society-issues",
    bandTarget: "7.0",
    definition:
      "Able to be easily harmed, hurt, or negatively affected physically, financially, or emotionally.",
    arabic: "معرّض للخطر / ضعيف الحماية (فئات أو أنظمة سهلة التأثر بالضرر)",
    collocations: [
      "vulnerable groups",
      "financially vulnerable",
      "vulnerable to cyberattacks",
      "protect the most vulnerable",
    ],
    synonyms: ["susceptible", "at-risk", "exposed"],
    antonyms: ["resilient", "well-protected", "invulnerable"],
    wordFamily: ["vulnerable (adj)", "vulnerability (n)", "vulnerably (adv)"],
    registerContrast: {
      everyday: "people who can easily get hurt or struggle",
      academic: "economically vulnerable households / vulnerable populations",
      whenToUse: {
        en: "Applies to people (elderly, low-income families), ecosystems (coastal reefs), and systems (networks vulnerable to hacking).",
        ar: "تُستخدم للأشخاص الأكثر احتياجًا، وللأنظمة البيئية، وحتى الأنظمة الرقمية المعرضة للاختراق.",
      },
    },
    examples: [
      "Targeted utility subsidies shield financially vulnerable households during winter price spikes.",
      "Unencrypted medical records leave hospitals highly vulnerable to cyberattacks.",
    ],
    ieltsSpeaking: {
      prompt: "Who should be responsible for caring for elderly citizens?",
      sample:
        "Families play a central loving role, yet public health services must still provide a safety net for vulnerable older adults.",
      tip: {
        en: "Always pair with the preposition 'to': 'vulnerable TO fraud / flooding / exploitation'.",
        ar: "حرف الجر الصحيح بعدها هو to: vulnerable to.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Should governments regulate advertising aimed at children?",
      sample:
        "Because young viewers lack mature critical judgement, they are particularly vulnerable to persuasive digital marketing.",
      tip: {
        en: "Pronounce the 'l' softly (/ˈvʌl.nər.ə.bəl/) and check the spelling ('vul-ner-a-ble').",
        ar: "انتبه للإملاء الصحيح في الكتابة: vulnerable.",
      },
    },
    commonMistake: {
      wrong: "Elderly people are vulnerable from online scams.",
      right: "Older adults are particularly vulnerable to online scams.",
      why: {
        en: "The required preposition is 'vulnerable to', never 'vulnerable from'.",
        ar: "نستخدم حرف الجر to بعد vulnerable وليس from.",
      },
    },
  },
  {
    id: "ielts-alleviate",
    word: "alleviate",
    ipa: "/əˈliː.vi.eɪt/",
    partOfSpeech: "verb",
    category: "formal-informal",
    topic: "society-issues",
    bandTarget: "7.5+",
    definition: "To make pain, poverty, suffering, or a severe burden less intense.",
    arabic: "يُخفّف من وطأة (الفقر أو الألم أو الازدحام أو المعاناة)",
    collocations: [
      "alleviate poverty",
      "alleviate traffic congestion",
      "alleviate financial hardship",
      "alleviate stress",
    ],
    synonyms: ["ease", "relieve", "mitigate"],
    antonyms: ["aggravate", "exacerbate", "worsen"],
    wordFamily: ["alleviate (v)", "alleviation (n)"],
    registerContrast: {
      everyday: "make poverty or traffic less painful",
      academic: "alleviate chronic poverty / alleviate peak-hour congestion",
      whenToUse: {
        en: "Ideal in formal essays for poverty, housing pressure, congestion, and stress.",
        ar: "قوية جدًا في المقالات الرسمية عند الحديث عن الفقر والازدحام والضغط المالي.",
      },
    },
    examples: [
      "Expanding affordable childcare helps alleviate financial pressure on young working parents.",
      "Dedicated bus lanes were introduced to alleviate severe morning congestion.",
    ],
    ieltsSpeaking: {
      prompt: "How can governments help families struggling with living costs?",
      sample:
        "Investing in affordable housing and reliable public transport can really alleviate everyday financial stress.",
      tip: {
        en: "Notice the double 'l': a-l-l-e-v-i-a-t-e.",
        ar: "انتبه لحرف l المضعّف في الإملاء: alleviate.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Is financial aid the best way to reduce global poverty?",
      sample:
        "While emergency grants alleviate immediate hardship, vocational training creates durable pathways out of poverty.",
      tip: {
        en: "Never write 'alleviate the problem' if you mean solve it completely—it means ease or relieve severity.",
        ar: "تعني التخفيف من شدة المعاناة لا حلّها جذريًا بالكامل.",
      },
    },
    commonMistake: {
      wrong: "New schools will alleviate education in rural villages.",
      right:
        "New schools will improve education and alleviate teacher shortages in rural villages.",
      why: {
        en: "'Alleviate' must take a negative burden (shortage, poverty, pain)—never a positive noun like 'education'.",
        ar: "يتبع alleviate عبء أو مشكلة سلبية فقط، لا اسم إيجابي مثل education.",
      },
    },
  },

  // ---- 8. CRIME & PUNISHMENT (3 entries) ----
  {
    id: "ielts-deterrent",
    word: "deterrent",
    ipa: "/dɪˈter.ənt/",
    partOfSpeech: "noun (countable)",
    category: "topic-specific",
    topic: "crime-punishment",
    bandTarget: "7.5+",
    definition:
      "Something—especially a punishment or visible security measure—that discourages people from committing an unlawful or harmful act.",
    arabic: "رادع (عقوبة أو إجراء يمنع الناس من ارتكاب مخالفة أو جريمة)",
    collocations: [
      "act as an effective deterrent",
      "deterrent effect",
      "a strong deterrent against speeding",
    ],
    synonyms: ["disincentive", "discouragement"],
    antonyms: ["incentive", "encouragement"],
    wordFamily: ["deter (v)", "deterrent (n/adj)", "deterrence (n)"],
    registerContrast: {
      everyday: "something that stops people from breaking the law",
      academic: "serve as a credible deterrent against reoffending",
      whenToUse: {
        en: "Essential topic vocabulary for IELTS Crime, Road Safety, and Regulation essays.",
        ar: "مفردة أساسية في مقالات القانون والجريمة والسلامة المرورية.",
      },
    },
    examples: [
      "Visible speed cameras often act as a more consistent deterrent than occasional heavy fines.",
      "Criminologists debate whether longer prison sentences truly serve as an effective deterrent.",
    ],
    ieltsSpeaking: {
      prompt: "Do strict traffic fines reduce reckless driving?",
      sample:
        "Yes, when enforced fairly and consistently, hefty fines definitely act as a strong deterrent against speeding.",
      tip: {
        en: "Use the complete collocation: 'act as a deterrent against + -ing/noun'.",
        ar: "احفظ التلازم كاملًا: act as a deterrent against.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Are harsher prison sentences the best way to reduce crime?",
      sample:
        "While custodial penalties can act as a deterrent for certain offences, rehabilitation addresses the underlying causes of reoffending.",
      tip: {
        en: "Use 'deter' as the verb ('fines deter motorists from speeding') and 'deterrent' as the noun.",
        ar: "الفعل هو deter (يردع) والاسم هو deterrent (رادع).",
      },
    },
    commonMistake: {
      wrong: "Heavy fines are a good deterrent to stop people to speed.",
      right: "Heavy fines act as an effective deterrent against speeding.",
      why: {
        en: "'Deterrent against + noun/-ing' avoids clunky repetition with 'to stop'.",
        ar: "نستخدم deterrent against + اسم أو فعل بـ ing بدون حشو.",
      },
    },
  },
  {
    id: "ielts-rehabilitation",
    word: "rehabilitation",
    ipa: "/ˌriː.həˌbɪl.ɪˈteɪ.ʃən/",
    partOfSpeech: "noun (uncountable)",
    category: "word-formation",
    topic: "crime-punishment",
    bandTarget: "7.5+",
    definition:
      "The process of helping someone who has committed a crime—or suffered illness/addiction—return to a healthy, law-abiding life in society.",
    arabic: "إعادة التأهيل (مساعدة المخالفين أو المرضى على الاندماج الإيجابي في المجتمع)",
    collocations: [
      "offender rehabilitation",
      "rehabilitation programmes",
      "prioritise rehabilitation over punishment",
    ],
    synonyms: ["reintegration", "recovery (in healthcare)"],
    antonyms: ["retribution", "recidivism (reoffending)"],
    wordFamily: ["rehabilitate (v)", "rehabilitation (n)", "rehabilitative (adj)"],
    registerContrast: {
      everyday: "helping prisoners change and get normal jobs",
      academic: "investing in vocational rehabilitation to curb reoffending",
      whenToUse: {
        en: "Core balanced term in Crime & Punishment essays (contrasting punishment with rehabilitation).",
        ar: "مصطلح جوهري للمقارنة بين العقاب وإعادة التأهيل في مقالات القانون والمجتمع.",
      },
    },
    examples: [
      "Countries that invest in prison education and rehabilitation tend to report lower reoffending rates.",
      "Community-based rehabilitation allows first-time offenders to maintain family ties while repaying society.",
    ],
    ieltsSpeaking: {
      prompt: "Should prisons focus mainly on punishment or helping offenders change?",
      sample:
        "Punishment matters for justice, of course, but without rehabilitation many offenders simply struggle to find work once released.",
      tip: {
        en: "Pair with 'reoffending rates' or 'vocational training' for an authoritative Band 7.5+ answer.",
        ar: "اربطها بـ reoffending rates أو vocational training لرفع جودة المعجم.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "Some people believe education in prisons reduces future crime. Do you agree?",
      sample:
        "Structured rehabilitation programmes equip inmates with employable skills, markedly reducing the likelihood of reoffending.",
      tip: {
        en: "Remember: 'rehabilitation' is uncountable, so say 'rehabilitation programmes', not 'rehabilitations'.",
        ar: "تُستخدم بصيغة المفرد دائمًا: rehabilitation programmes.",
      },
    },
    commonMistake: {
      wrong: "Prisons should offer more rehabilitations for young offenders.",
      right: "Prisons should offer structured rehabilitation programmes for young offenders.",
      why: {
        en: "'Rehabilitation' is uncountable; add a countable noun like 'programmes' or 'schemes' if plural.",
        ar: "الاسم غير معدود، لذا نضيف programmes عند الجمع.",
      },
    },
  },
  {
    id: "ielts-crack-down-on",
    word: "crack down on",
    ipa: "/ˌkræk ˈdaʊn ɒn/",
    partOfSpeech: "phrasal verb",
    category: "phrasal-verbs",
    topic: "crime-punishment",
    bandTarget: "7.0",
    definition:
      "To begin taking much stricter official action to stop illegal, harmful, or undesirable behaviour.",
    arabic: "يُشدّد الرقابة والعقوبات بحزم ضد (مخالفة أو جريمة)",
    collocations: [
      "crack down on cybercrime",
      "crack down on illegal dumping",
      "a nationwide crackdown on fraud",
    ],
    synonyms: ["clamp down on", "enforce stricter penalties against (more formal)"],
    antonyms: ["turn a blind eye to", "relax enforcement"],
    wordFamily: ["crack down on (v)", "crackdown (n)"],
    registerContrast: {
      everyday: "crack down on online scammers",
      academic: "impose stringent enforcement against digital fraud",
      whenToUse: {
        en: "Very natural in IELTS Speaking and journalistic Writing; pair with 'enforce strict regulations' in formal essays.",
        ar: "طبيعية جدًا في التحدث والكتابة الصحفية، وتقابلها enforce strict regulations في المقال الرسمي.",
      },
    },
    examples: [
      "Regulators have vowed to crack down on deceptive financial adverts online.",
      "A coordinated crackdown on illegal logging helped protect endangered woodland.",
    ],
    ieltsSpeaking: {
      prompt: "How should authorities deal with online scams?",
      sample:
        "Banks and police need to share data faster so they can crack down on scam networks before thousands of people lose savings.",
      tip: {
        en: "Remember all three words of the verb: 'crack down ON + noun'.",
        ar: "تُستخدم الكلمات الثلاث معًا: crack down on + الاسم.",
      },
    },
    ieltsWriting: {
      task: "Task 2",
      prompt: "How can cities reduce littering and vandalism?",
      sample:
        "While authorities must crack down on deliberate fly-tipping, clear signage and accessible bins encourage voluntary compliance.",
      tip: {
        en: "Use the one-word noun 'a crackdown on' cleanly for formal variety.",
        ar: "الاسم منها كلمة واحدة: a crackdown on.",
      },
    },
    commonMistake: {
      wrong: "The police should crack down cybercrime immediately.",
      right: "The police should crack down on cybercrime immediately.",
      why: {
        en: "Always include the preposition 'on' before the target problem.",
        ar: "لا تحذف حرف الجر on قبل اسم المشكلة.",
      },
    },
  },
];
