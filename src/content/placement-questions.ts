import type { CefrLevel } from "./courses";

/**
 * The 60-question placement test: 10 questions for each CEFR level, easiest first.
 * Each question tests one CEFR point for its level (`focus`) and explains why the
 * correct answer is right (`explanation`, English + Arabic).
 * In each question the FIRST option is the correct answer — the quiz shuffles the
 * options before showing them, so you can write them in any order after the first.
 * To edit the test, change this file only.
 */
export type PlacementQuestion = {
  id: string;
  level: CefrLevel;
  prompt: string;
  /** options[0] is always the correct answer */
  options: [string, string, string, string];
  /** The CEFR grammar/vocabulary point being tested */
  focus: string;
  /** Why the correct answer is right, in English and Arabic */
  explanation: { en: string; ar: string };
};

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  // ---------- A1 ----------
  { id: "a1-1", focus: "Verb “to be”", explanation: { en: "With he / she / it we use “is”: She is a teacher.", ar: "مع he / she / it نستخدم «is»: She is a teacher." }, level: "A1", prompt: "She ___ a teacher.", options: ["is", "am", "are", "be"] },
  { id: "a1-2", focus: "Verb “to be”", explanation: { en: "With “I” the verb “to be” is always “am”: I am from Jordan.", ar: "مع الضمير «I» يكون فعل الكينونة دائمًا «am»." }, level: "A1", prompt: "I ___ from Jordan.", options: ["am", "is", "are", "be"] },
  { id: "a1-3", focus: "Basic adjectives", explanation: { en: "“Small” means the opposite of “big”. “Tall” is about height, “long” about length, “old” about age.", ar: "«small» عكس «big». أما «tall» فللطول (القامة)، و«long» للطول (المسافة)، و«old» للعمر." }, level: "A1", prompt: "What is the opposite of “big”?", options: ["small", "tall", "long", "old"] },
  { id: "a1-4", focus: "There is / there are", explanation: { en: "“Two books” is plural, so we use “there are”. “There is” is for one thing.", ar: "«two books» جمع، لذلك نستخدم «there are». أما «there is» فللمفرد." }, level: "A1", prompt: "There ___ two books on the table.", options: ["are", "is", "am", "be"] },
  { id: "a1-5", focus: "Present simple – he/she/it", explanation: { en: "In the present simple we add -s to the verb after he / she / it: he drinks.", ar: "في المضارع البسيط نضيف -s للفعل بعد he / she / it: he drinks." }, level: "A1", prompt: "He ___ coffee every morning.", options: ["drinks", "drink", "drinking", "is drink"] },
  { id: "a1-6", focus: "Question words", explanation: { en: "We ask about a name with “What”: What is your name? “Who” asks about a person.", ar: "نسأل عن الاسم بـ «What». أما «Who» فتسأل عن الشخص نفسه." }, level: "A1", prompt: "___ is your name?", options: ["What", "Who", "Where", "When"] },
  { id: "a1-7", focus: "Prepositions of time", explanation: { en: "We use “on” with days of the week: on Monday. “In” is for months/years, “at” for clock times.", ar: "نستخدم «on» مع أيام الأسبوع، و«in» مع الشهور والسنوات، و«at» مع الساعات." }, level: "A1", prompt: "We go to school ___ Monday.", options: ["on", "in", "at", "to"] },
  { id: "a1-8", focus: "Articles a / an", explanation: { en: "We use “an” before a vowel sound (a, e, i, o, u): an apple.", ar: "نستخدم «an» قبل الكلمة التي تبدأ بصوت حرف علّة (a, e, i, o, u): an apple." }, level: "A1", prompt: "This is ___ apple.", options: ["an", "a", "two", "some"] },
  { id: "a1-9", focus: "Present simple – negative", explanation: { en: "The negative with he / she / it is “doesn't” + base verb: She doesn't like fish.", ar: "النفي مع he / she / it يكون بـ «doesn't» + الفعل في صيغته الأساسية." }, level: "A1", prompt: "My sister ___ like fish.", options: ["doesn't", "don't", "isn't", "aren't"] },
  { id: "a1-10", focus: "Irregular plurals", explanation: { en: "“Child” has an irregular plural: “children”. We don't add -s.", ar: "جمع «child» شاذ وهو «children»، ولا نضيف له -s." }, level: "A1", prompt: "One child, two ___.", options: ["children", "childs", "childes", "childrens"] },

  // ---------- A2 ----------
  { id: "a2-1", focus: "Past simple – irregular verbs", explanation: { en: "“Yesterday” shows the past. The past of “go” is irregular: “went”.", ar: "كلمة «yesterday» تدل على الماضي، وماضي «go» شاذ وهو «went»." }, level: "A2", prompt: "Yesterday I ___ to the market.", options: ["went", "go", "goes", "gone"] },
  { id: "a2-2", focus: "Comparative adjectives", explanation: { en: "When we compare two people we use the comparative + “than”: taller than.", ar: "عند المقارنة بين شخصين نستخدم صيغة المقارنة + «than»: taller than." }, level: "A2", prompt: "She is ___ than her brother.", options: ["taller", "tall", "tallest", "more tall"] },
  { id: "a2-3", focus: "Present perfect – ever", explanation: { en: "“Been” is a past participle, so we need the present perfect: Have you ever been…?", ar: "«been» تصريف ثالث، لذلك نحتاج المضارع التام: Have you ever been…?" }, level: "A2", prompt: "___ you ever been to London?", options: ["Have", "Did", "Do", "Were"] },
  { id: "a2-4", focus: "Going to + verb", explanation: { en: "For plans we use “be going to” + base verb: I'm going to visit.", ar: "للخطط المستقبلية نستخدم «be going to» + الفعل الأساسي." }, level: "A2", prompt: "I'm going ___ my grandmother tomorrow.", options: ["to visit", "visit", "visiting", "visited"] },
  { id: "a2-5", focus: "Past continuous vs past simple", explanation: { en: "A long action (was watching) is interrupted by a short action in the past simple: the phone rang.", ar: "حدث طويل (was watching) قاطعه حدث قصير بالماضي البسيط: the phone rang." }, level: "A2", prompt: "We were watching TV when the phone ___.", options: ["rang", "ring", "was ringing", "rings"] },
  { id: "a2-6", focus: "Modal verbs – obligation", explanation: { en: "“Must” expresses a rule or obligation. “It's the law” shows it is necessary.", ar: "«must» تعبّر عن الإلزام أو القاعدة، وعبارة «It's the law» تدل على الوجوب." }, level: "A2", prompt: "You ___ wear a seatbelt in the car. It's the law.", options: ["must", "can", "might", "would"] },
  { id: "a2-7", focus: "Much / many", explanation: { en: "“Water” is uncountable, so we use “much”. “Many” is for countable nouns.", ar: "«water» اسم غير معدود، لذلك نستخدم «much». أما «many» فللمعدود." }, level: "A2", prompt: "How ___ water do you drink a day?", options: ["much", "many", "few", "lot"] },
  { id: "a2-8", focus: "For / since", explanation: { en: "“Since” is used with a starting point in time (2015). “For” is used with a period (five years).", ar: "«since» تُستخدم مع نقطة بداية زمنية (2015)، و«for» مع مدة زمنية." }, level: "A2", prompt: "I've lived here ___ 2015.", options: ["since", "for", "from", "during"] },
  { id: "a2-9", focus: "Superlative adjectives", explanation: { en: "With “ever” we compare one thing with all others, so we use the superlative: the best.", ar: "مع «ever» نقارن شيئًا بكل ما سواه، فنستخدم صيغة التفضيل: the best." }, level: "A2", prompt: "This is the ___ film I've ever seen.", options: ["best", "good", "better", "most good"] },
  {
    id: "a2-10", focus: "Reading – short notices", explanation: { en: "The text says the museum is closed on Mondays, so Monday afternoon is not possible.", ar: "يذكر النص أن المتحف مغلق يوم الاثنين، لذلك لا يمكن الزيارة بعد ظهر الاثنين." },
    level: "A2",
    prompt:
      "Read: “The museum opens at 9 a.m. and closes at 5 p.m. It is closed on Mondays.” When can you NOT visit?",
    options: ["Monday afternoon", "Tuesday morning", "Saturday at 10 a.m.", "Friday at 4 p.m."],
  },

  // ---------- B1 ----------
  { id: "b1-1", focus: "First conditional", explanation: { en: "A real possibility in the future: If + present simple, will + verb. If it rains, we will stay.", ar: "احتمال حقيقي في المستقبل: If + مضارع بسيط، ثم will + فعل." }, level: "B1", prompt: "If it rains tomorrow, we ___ at home.", options: ["will stay", "stay", "would stay", "stayed"] },
  { id: "b1-2", focus: "Passive voice – past", explanation: { en: "The letter did not send itself; someone sent it. Past passive = was/were + past participle.", ar: "الرسالة لم ترسل نفسها؛ أحدٌ أرسلها. المبني للمجهول في الماضي = was/were + التصريف الثالث." }, level: "B1", prompt: "The letter ___ yesterday.", options: ["was sent", "sent", "has sent", "is sending"] },
  { id: "b1-3", focus: "Reported speech", explanation: { en: "After “asked” (past), the verb moves back one tense: where I live → where I lived.", ar: "بعد «asked» في الماضي يرجع زمن الفعل خطوة للوراء: live ← lived." }, level: "B1", prompt: "She asked me where I ___.", options: ["lived", "live", "am living", "will live"] },
  { id: "b1-4", focus: "Be used to + -ing", explanation: { en: "“Be used to” means “be accustomed to” and is followed by a noun or -ing form: used to getting up.", ar: "«be used to» تعني «معتاد على» ويأتي بعدها اسم أو فعل بصيغة -ing." }, level: "B1", prompt: "I'm not used to ___ up so early.", options: ["getting", "get", "got", "be getting"] },
  { id: "b1-5", focus: "Present perfect continuous + for", explanation: { en: "“Three years” is a period of time, so we use “for”.", ar: "«three years» مدة زمنية، لذلك نستخدم «for»." }, level: "B1", prompt: "He has been working here ___ three years.", options: ["for", "since", "ago", "during"] },
  { id: "b1-6", focus: "Relative pronouns – whose", explanation: { en: "“Whose” shows possession: the man whose car (= his car) was stolen.", ar: "«whose» تدل على الملكية: الرجل الذي سُرقت سيارته." }, level: "B1", prompt: "The man ___ car was stolen called the police.", options: ["whose", "who", "which", "whom"] },
  { id: "b1-7", focus: "Wish + past simple", explanation: { en: "To wish for a different present situation we use “wish” + past simple: I wish I had.", ar: "للتمنّي بخلاف الواقع الحالي نستخدم «wish» + الماضي البسيط." }, level: "B1", prompt: "I wish I ___ more free time.", options: ["had", "have", "will have", "am having"] },
  { id: "b1-8", focus: "Phrasal verbs", explanation: { en: "We “turn off” lights and machines to stop them working.", ar: "نقول «turn off» لإطفاء الأضواء والأجهزة." }, level: "B1", prompt: "Please turn ___ the lights when you leave.", options: ["off", "out", "away", "down"] },
  { id: "b1-9", focus: "Vocabulary – synonyms", explanation: { en: "“Reliable” means you can trust or depend on it, so “dependable” is closest.", ar: "«reliable» تعني موثوق يُعتمد عليه، وأقرب كلمة لها «dependable»." }, level: "B1", prompt: "Which word is closest in meaning to “reliable”?", options: ["dependable", "expensive", "careless", "famous"] },
  { id: "b1-10", focus: "Past perfect", explanation: { en: "One past action happened before another: the film had started before we arrived.", ar: "حدث في الماضي وقع قبل حدث آخر في الماضي: بدأ الفيلم قبل وصولنا." }, level: "B1", prompt: "By the time we arrived, the film ___.", options: ["had started", "started", "has started", "starts"] },

  // ---------- B2 ----------
  {
    id: "b2-1", focus: "Third conditional", explanation: { en: "An imaginary past: If + past perfect, would have + past participle.", ar: "حالة تخيّلية في الماضي: If + ماضٍ تام، ثم would have + التصريف الثالث." },
    level: "B2",
    prompt: "If I had known about the meeting, I ___ it.",
    options: ["would have attended", "would attend", "will attend", "had attended"],
  },
  { id: "b2-2", focus: "Verb + -ing", explanation: { en: "“Deny” is always followed by the -ing form: denied breaking.", ar: "الفعل «deny» يأتي بعده دائمًا الفعل بصيغة -ing." }, level: "B2", prompt: "She denied ___ the window.", options: ["breaking", "to break", "break", "broke"] },
  { id: "b2-3", focus: "Inversion after “hardly”", explanation: { en: "When a sentence starts with “Hardly”, the auxiliary comes before the subject: Hardly had I left…", ar: "عندما تبدأ الجملة بـ «Hardly» يتقدّم الفعل المساعد على الفاعل: Hardly had I left." }, level: "B2", prompt: "Hardly ___ the house when it started to rain.", options: ["had I left", "I had left", "I left", "did I leave"] },
  { id: "b2-4", focus: "Passive with modals", explanation: { en: "The project is finished by someone: modal + be + past participle = must be finished.", ar: "المشروع يُنجَز من قِبل أحد: فعل ناقص + be + التصريف الثالث." }, level: "B2", prompt: "The project must ___ by Friday.", options: ["be finished", "finish", "have finish", "finishing"] },
  { id: "b2-5", focus: "Dependent prepositions", explanation: { en: "We say “good at” something: good at solving problems.", ar: "نقول «good at» عند الحديث عن مهارة في شيء." }, level: "B2", prompt: "He's very good ___ solving problems.", options: ["at", "in", "on", "for"] },
  { id: "b2-6", focus: "Would rather + past", explanation: { en: "When we want another person to do something, “would rather” + subject + past: I'd rather you didn't.", ar: "عند الرغبة في أن يفعل شخص آخر شيئًا: would rather + فاعل + فعل ماضٍ." }, level: "B2", prompt: "I'd rather you ___ smoke in here.", options: ["didn't", "don't", "won't", "not"] },
  { id: "b2-7", focus: "Word formation – adverbs", explanation: { en: "We need an adverb to describe the verb “affect”: adversely.", ar: "نحتاج ظرفًا يصف الفعل «affect»، والظرف هو «adversely»." }, level: "B2", prompt: "The new policy will ___ affect small businesses.", options: ["adversely", "adverse", "adversity", "adversary"] },
  { id: "b2-8", focus: "Phrasal verbs", explanation: { en: "“Come up with” means to think of an idea or plan.", ar: "«come up with» تعني ابتكار فكرة أو خطة." }, level: "B2", prompt: "We need to come up ___ a better plan.", options: ["with", "to", "for", "at"] },
  { id: "b2-9", focus: "Despite + -ing", explanation: { en: "“Despite” is followed by a noun or -ing form, not a full clause: despite being tired.", ar: "يأتي بعد «despite» اسم أو فعل بصيغة -ing، وليس جملة كاملة." }, level: "B2", prompt: "Despite ___ tired, she finished the race.", options: ["being", "she was", "to be", "been"] },
  { id: "b2-10", focus: "Impersonal passive", explanation: { en: "The structure is “be said to + infinitive”: She is said to be…", ar: "التركيب هو «be said to + المصدر»: She is said to be." }, level: "B2", prompt: "She is said ___ the best surgeon in the city.", options: ["to be", "being", "be", "that she is"] },

  // ---------- C1 ----------
  {
    id: "c1-1", focus: "Inversion with “not only”", explanation: { en: "After “Not only” at the start, we invert the auxiliary and subject: Not only did he arrive late…", ar: "بعد «Not only» في بداية الجملة نقدّم الفعل المساعد على الفاعل." },
    level: "C1",
    prompt: "Not only ___ late, but he also forgot the documents.",
    options: ["did he arrive", "he arrived", "he did arrive", "arrived he"],
  },
  {
    id: "c1-2", focus: "Advanced phrasal verbs", explanation: { en: "“Bear out” means to support or confirm something as true.", ar: "«bear out» تعني يؤكد أو يدعم صحة شيء." },
    level: "C1",
    prompt: "The findings ___ the theory that sleep improves memory.",
    options: ["bear out", "bear with", "bear down", "bear up"],
  },
  {
    id: "c1-3", focus: "Mixed conditional", explanation: { en: "A past condition (had taken) with a present result (now): would be living.", ar: "شرط في الماضي (had taken) مع نتيجة في الحاضر (now): would be living." },
    level: "C1",
    prompt: "Had she taken the job, she ___ in Dubai now.",
    options: ["would be living", "would live", "will be living", "had lived"],
  },
  {
    id: "c1-4", focus: "Word choice – adjectives", explanation: { en: "“Compelling” means very convincing. “Compulsory” means required by rules.", ar: "«compelling» تعني مقنع جدًا، أما «compulsory» فتعني إلزامي." },
    level: "C1",
    prompt: "His argument was so ___ that nobody could disagree with it.",
    options: ["compelling", "compelled", "compulsive", "compulsory"],
  },
  { id: "c1-5", focus: "It's high time + past", explanation: { en: "“It's high time” is followed by the past simple to say something should happen now.", ar: "يأتي بعد «It's high time» الماضي البسيط للدلالة على أنه آن الأوان لفعل شيء الآن." }, level: "C1", prompt: "It's high time we ___ a decision.", options: ["made", "make", "have made", "will make"] },
  {
    id: "c1-6", focus: "Idioms", explanation: { en: "To “take something in your stride” means to deal with it calmly.", ar: "«take something in your stride» تعني التعامل مع الأمر بهدوء." },
    level: "C1",
    prompt: "She took the criticism ___ and kept improving.",
    options: ["in her stride", "on her feet", "by surprise", "at heart"],
  },
  {
    id: "c1-7", focus: "Precise vocabulary", explanation: { en: "“Extraneous” means not relevant or unnecessary — details that distract from the point.", ar: "«extraneous» تعني غير ضروري أو خارج عن الموضوع." },
    level: "C1",
    prompt: "The report was full of ___ details that distracted from the main point.",
    options: ["extraneous", "extensive", "exterior", "extravagant"],
  },
  {
    id: "c1-8", focus: "Inverted conditional – should", explanation: { en: "“Should you encounter” is a formal way of saying “If you encounter”, using the base verb.", ar: "«Should you encounter» طريقة رسمية لقول «If you encounter» مع الفعل الأساسي." },
    level: "C1",
    prompt: "Should you ___ any problems, please contact reception.",
    options: ["encounter", "encountering", "encountered", "to encounter"],
  },
  {
    id: "c1-9", focus: "Reading – inference", explanation: { en: "“Cautioned against premature optimism” means it is too early to be confident.", ar: "عبارة «cautioned against premature optimism» تعني أن الوقت مبكر للثقة بالنتائج." },
    level: "C1",
    prompt:
      "Read: “Although the treatment showed promise in early trials, researchers cautioned against premature optimism.” What do the researchers suggest?",
    options: [
      "It is too early to be confident",
      "The treatment has failed",
      "The trials were badly designed",
      "Optimism is always harmful",
    ],
  },
  {
    id: "c1-10", focus: "Topic vocabulary", explanation: { en: "A “stalemate” is a situation where neither side can win or make progress.", ar: "«stalemate» تعني طريقًا مسدودًا لا يتقدّم فيه أي طرف." },
    level: "C1",
    prompt: "The negotiations reached a ___, with neither side willing to compromise.",
    options: ["stalemate", "milestone", "breakthrough", "consensus"],
  },

  // ---------- C2 ----------
  {
    id: "c2-1", focus: "Inversion after “scarcely”", explanation: { en: "“Scarcely” at the start needs inversion with the past perfect: Scarcely had she stepped…", ar: "«Scarcely» في البداية تتطلب تقديم الفعل المساعد مع الماضي التام." },
    level: "C2",
    prompt: "Scarcely ___ the stage when the audience began to applaud.",
    options: ["had she stepped onto", "she had stepped onto", "did she stepped onto", "she stepped onto"],
  },
  {
    id: "c2-2", focus: "Low-frequency vocabulary", explanation: { en: "“Abstruse” means difficult to understand. “Obtuse” describes a slow-thinking person.", ar: "«abstruse» تعني صعب الفهم، أما «obtuse» فتصف شخصًا بطيء الفهم." },
    level: "C2",
    prompt: "His explanation was so ___ that even experts struggled to follow it.",
    options: ["abstruse", "obtuse", "abrupt", "absolute"],
  },
  {
    id: "c2-3", focus: "Low-frequency vocabulary", explanation: { en: "“Platitudes” are overused remarks that sound meaningful but say little.", ar: "«platitudes» عبارات مستهلكة تبدو مهمة لكنها فارغة المعنى." },
    level: "C2",
    prompt: "The speech was full of ___, saying a lot but meaning very little.",
    options: ["platitudes", "plaudits", "plateaus", "platforms"],
  },
  {
    id: "c2-4", focus: "Formal conditional – were it not for", explanation: { en: "“Were it not for” = “If it hadn't been for”; the past result is “would have collapsed”.", ar: "«Were it not for» بمعنى «لولا»، والنتيجة في الماضي «would have collapsed»." },
    level: "C2",
    prompt: "Were it not for her timely intervention, the deal ___.",
    options: ["would have collapsed", "would collapse", "had collapsed", "will have collapsed"],
  },
  { id: "c2-5", focus: "Subjunctive", explanation: { en: "After “It is imperative that”, formal English uses the base form “be” for every subject.", ar: "بعد «It is imperative that» تستخدم الإنجليزية الرسمية الصيغة الأساسية «be» مع كل الضمائر." }, level: "C2", prompt: "It is imperative that he ___ informed immediately.", options: ["be", "is", "was", "will be"] },
  {
    id: "c2-6", focus: "Style vocabulary", explanation: { en: "“Ornate” means highly decorated or elaborate — like long, complex sentences.", ar: "«ornate» تعني مزخرف ومنمّق، مثل الجمل الطويلة المعقدة." },
    level: "C2",
    prompt: "The author's ___ style, full of long and elaborate sentences, divides readers.",
    options: ["ornate", "ornery", "orderly", "ordinal"],
  },
  {
    id: "c2-7", focus: "Concessive linkers", explanation: { en: "“Albeit” means “although” and can be followed directly by an adjective: albeit compelling.", ar: "«albeit» بمعنى «وإن كان» ويمكن أن تتبعها صفة مباشرة." },
    level: "C2",
    prompt: "The evidence, ___ compelling, was not conclusive.",
    options: ["albeit", "whereas", "notwithstanding", "inasmuch"],
  },
  {
    id: "c2-8", focus: "Confusable words", explanation: { en: "A “flair” is a natural talent. “Flare” is a sudden flame or light.", ar: "«flair» تعني موهبة فطرية، أما «flare» فتعني وهجًا أو شعلة." },
    level: "C2",
    prompt: "She has a ___ for languages; she speaks seven fluently.",
    options: ["flair", "flare", "flier", "flaw"],
  },
  {
    id: "c2-9", focus: "Idioms", explanation: { en: "To “pay lip service” means to say you support something without actually acting on it.", ar: "«pay lip service» تعني تأييد شيء بالكلام دون الفعل." },
    level: "C2",
    prompt: "To “pay lip service” to an idea means to:",
    options: [
      "support it in words but not in actions",
      "talk about it loudly",
      "pay for it secretly",
      "reject it publicly",
    ],
  },
  {
    id: "c2-10", focus: "Reading – vocabulary in context", explanation: { en: "“Eschew” means to deliberately avoid. The novel avoids neat endings.", ar: "«eschew» تعني يتجنّب عمدًا؛ فالرواية تتجنّب النهايات المرتّبة." },
    level: "C2",
    prompt:
      "Read: “The novel eschews tidy resolutions, leaving the reader to grapple with its moral ambiguities.” What does “eschews” mean here?",
    options: ["deliberately avoids", "clearly explains", "quickly reaches", "strongly praises"],
  },
];
