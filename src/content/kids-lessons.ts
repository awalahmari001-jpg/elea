import type { Lesson } from "./lesson-types";

/**
 * Kids path lessons (ages 6–12). Short, playful lessons with simple language,
 * friendly examples and pronunciation practice. Every string is bilingual.
 * Ordered beginner (Pre-A1–A1) → intermediate (A1–A2) → advanced (A2–B1).
 */
export const KIDS_LESSONS: Lesson[] = [
  // ----- Beginner (Pre-A1 – A1) -----
  {
    id: "kids-alphabet-colours",
    course: "kids",
    skill: "reading",
    title: { en: "Letters and colours", ar: "الحروف والألوان" },
    goal: {
      en: "Say the English alphabet and name ten colours.",
      ar: "انطق الحروف الإنجليزية وسمِّ عشرة ألوان.",
    },
    minutes: 10,
    teaching: [
      {
        en: "The English alphabet has 26 letters. Five are vowels: A, E, I, O, U. Say them slowly: ay, ee, eye, oh, yoo.",
        ar: "الأبجدية الإنجليزية فيها ٢٦ حرفًا. خمسة منها حروف متحركة: A وE وI وO وU. انطقها ببطء.",
      },
      {
        en: "Colours are describing words: red, blue, green, yellow, orange, purple, pink, black, white, brown. We say: The ball is red.",
        ar: "الألوان كلمات وصفية مثل red وblue وgreen. نقول: The ball is red أي الكرة حمراء.",
      },
    ],
    example:
      "Teacher: What colour is the sun?\nLina: The sun is yellow!\nTeacher: And the sky?\nLina: The sky is blue!",
    pronunciation: "Red, blue, green, yellow. The sun is yellow.",
    pronunciationTip: {
      en: "In yellow, the y sounds like the y in yes. Do not say jellow.",
      ar: "حرف y في yellow يُنطق مثل y في yes، ولا تقل jellow.",
    },
    questions: [
      {
        prompt: "How many letters are in the English alphabet?",
        options: ["24", "26", "28"],
        correct: 1,
        explanation: {
          en: "The English alphabet has 26 letters, from A to Z.",
          ar: "الأبجدية الإنجليزية فيها ٢٦ حرفًا من A إلى Z.",
        },
      },
      {
        prompt: "The grass is ___.",
        options: ["green", "blue", "pink"],
        correct: 0,
        explanation: {
          en: "Grass is green. Blue is the sky, and pink is a flamingo!",
          ar: "العشب أخضر green. الأزرق هو لون السماء.",
        },
      },
      {
        prompt: "Which word is a colour?",
        options: ["table", "purple", "run"],
        correct: 1,
        explanation: {
          en: "Purple is a colour. A table is a thing and run is an action.",
          ar: "purple لون. أما table فشيء وrun فعل.",
        },
      },
    ],
  },
  {
    id: "kids-hello-me",
    course: "kids",
    skill: "speaking",
    title: { en: "Hello! This is me", ar: "مرحبًا! هذا أنا" },
    goal: {
      en: "Say hello, tell your name and age, and ask a friend.",
      ar: "ألقِ التحية واذكر اسمك وعمرك واسأل صديقك.",
    },
    minutes: 10,
    teaching: [
      {
        en: "Say Hello or Hi to greet someone. Then say: My name is Sara. I am eight years old.",
        ar: "قل Hello أو Hi للتحية، ثم قل: My name is Sara وI am eight years old أي عمري ثماني سنوات.",
      },
      {
        en: "To ask a friend, say: What is your name? and How old are you? Answer with: I am…",
        ar: "لتسأل صديقك قل: What is your name? وHow old are you? وأجب بـ I am…",
      },
    ],
    example:
      "Omar: Hello! My name is Omar. I am seven.\nNour: Hi Omar! I am Nour. I am eight.\nOmar: Nice to meet you, Nour!",
    pronunciation: "Hello! My name is Omar. I am seven years old.",
    pronunciationTip: {
      en: "In name, the a sounds like ay. Smile when you say hello!",
      ar: "حرف a في name يُنطق مثل ay. ابتسم عندما تقول hello!",
    },
    questions: [
      {
        prompt: "Choose the best greeting.",
        options: ["Goodbye!", "Hello!", "Sleep!"],
        correct: 1,
        explanation: {
          en: "Hello is how we greet people. Goodbye is for leaving.",
          ar: "Hello للتحية، أما Goodbye فللوداع.",
        },
      },
      {
        prompt: "___ name is Sara.",
        options: ["My", "You", "He"],
        correct: 0,
        explanation: {
          en: "We say My name is… when we talk about ourselves.",
          ar: "نقول My name is عندما نتحدث عن أنفسنا.",
        },
      },
      {
        prompt: "How do you ask a friend's age?",
        options: ["How old are you?", "What is your name?", "Where are you?"],
        correct: 0,
        explanation: {
          en: "How old are you? asks about age.",
          ar: "How old are you? تسأل عن العمر.",
        },
      },
    ],
  },
  {
    id: "kids-numbers-animals",
    course: "kids",
    skill: "listening",
    title: { en: "Numbers and animals", ar: "الأرقام والحيوانات" },
    goal: {
      en: "Count to twenty and name farm and zoo animals.",
      ar: "عُدّ حتى عشرين وسمِّ حيوانات المزرعة والحديقة.",
    },
    minutes: 12,
    teaching: [
      {
        en: "Count with me: one, two, three … ten. Then eleven, twelve, thirteen … twenty. Thirteen to nineteen end in -teen.",
        ar: "عُدّ معي من one إلى ten، ثم من eleven إلى twenty. الأرقام من ١٣ إلى ١٩ تنتهي بـ -teen.",
      },
      {
        en: "Animals: cat, dog, cow, sheep, duck live on a farm. Lion, monkey, elephant, giraffe live in the zoo. We say: I see two cats.",
        ar: "حيوانات المزرعة مثل cat وcow وsheep، وحيوانات الحديقة مثل lion وmonkey. نقول: I see two cats أي أرى قطتين.",
      },
    ],
    example:
      "Teacher: How many ducks do you see?\nAdam: I see five ducks!\nTeacher: And what animal is big and grey?\nAdam: The elephant!",
    pronunciation: "I see five ducks and one big elephant.",
    pronunciationTip: {
      en: "In five, the v touches your top teeth to your bottom lip.",
      ar: "حرف v في five يُنطق بلمس الأسنان العلوية للشفة السفلية.",
    },
    questions: [
      {
        prompt: "What number comes after twelve?",
        options: ["eleven", "thirteen", "twenty"],
        correct: 1,
        explanation: {
          en: "After twelve comes thirteen.",
          ar: "بعد twelve يأتي thirteen أي ثلاثة عشر.",
        },
      },
      {
        prompt: "Which animal lives on a farm?",
        options: ["lion", "sheep", "giraffe"],
        correct: 1,
        explanation: {
          en: "Sheep live on farms. Lions and giraffes live in the zoo or the wild.",
          ar: "الخروف sheep يعيش في المزرعة، أما الأسد والزرافة ففي الحديقة أو البرية.",
        },
      },
      {
        prompt: "I see three ___.",
        options: ["cat", "cats", "cates"],
        correct: 1,
        explanation: {
          en: "With three we add s: cats.",
          ar: "مع three نضيف s للجمع: cats.",
        },
      },
    ],
  },
  // ----- Intermediate (A1 – A2) -----
  {
    id: "kids-my-family",
    course: "kids",
    skill: "grammar",
    title: { en: "My family", ar: "عائلتي" },
    goal: {
      en: "Talk about your family with have got and this is.",
      ar: "تحدّث عن عائلتك باستخدام have got وthis is.",
    },
    minutes: 12,
    teaching: [
      {
        en: "Family words: mother, father, sister, brother, grandmother, grandfather. Introduce them with: This is my mother.",
        ar: "كلمات العائلة: mother وfather وsister وbrother. قدّمهم بقول: This is my mother أي هذه أمي.",
      },
      {
        en: "Use have got for family: I have got two brothers. Short form: I've got two brothers. Ask: Have you got a sister?",
        ar: "نستخدم have got للملكية: I have got two brothers أي عندي أخوان. والسؤال: Have you got a sister?",
      },
    ],
    example:
      "Huda: This is my family. I have got one brother and one sister.\nSam: Have you got a pet?\nHuda: Yes! I have got a small cat.",
    pronunciation: "This is my mother. I have got two brothers.",
    pronunciationTip: {
      en: "In mother and brother, th is soft — put your tongue between your teeth.",
      ar: "في mother وbrother يُنطق th بوضع اللسان بين الأسنان.",
    },
    questions: [
      {
        prompt: "I have got one ___.",
        options: ["sister", "sisters", "a sister is"],
        correct: 0,
        explanation: {
          en: "One is singular, so sister without s.",
          ar: "one مفرد، لذلك sister بدون s.",
        },
      },
      {
        prompt: "Choose the correct question.",
        options: ["You have got a pet?", "Have you got a pet?", "Has you got a pet?"],
        correct: 1,
        explanation: {
          en: "With you we use have, and it goes first in questions.",
          ar: "مع you نستخدم have وتأتي أولًا في السؤال.",
        },
      },
      {
        prompt: "Your mother's mother is your ___.",
        options: ["aunt", "grandmother", "sister"],
        correct: 1,
        explanation: {
          en: "Your mother's mother is your grandmother.",
          ar: "أم أمك هي جدتك grandmother.",
        },
      },
    ],
  },
  {
    id: "kids-school-day",
    course: "kids",
    skill: "reading",
    title: { en: "My school day", ar: "يومي في المدرسة" },
    goal: {
      en: "Read a short story about a school day and answer questions.",
      ar: "اقرأ قصة قصيرة عن يوم مدرسي وأجب عن الأسئلة.",
    },
    minutes: 15,
    teaching: [
      {
        en: "School words: classroom, teacher, desk, pencil, book, playground. We go to school in the morning.",
        ar: "كلمات المدرسة: classroom وteacher وdesk وplayground. نذهب إلى المدرسة في الصباح morning.",
      },
      {
        en: "Time words help us read stories: first, then, after that, finally. First I read, then I play.",
        ar: "كلمات الترتيب تساعدنا: first ثم then ثم after that وأخيرًا finally.",
      },
    ],
    example:
      "First, Adam walks to school with his bag. Then he reads a book in the classroom. After that, he plays football in the playground. Finally, he goes home and eats lunch with his family.",
    pronunciation: "First I read a book, then I play football.",
    pronunciationTip: {
      en: "In school, the ch sounds like k: skool.",
      ar: "حرفا ch في school يُنطقان مثل k: سكول.",
    },
    questions: [
      {
        prompt: "What does Adam do first?",
        options: ["He plays football.", "He walks to school.", "He eats lunch."],
        correct: 1,
        explanation: {
          en: "The story says: First, Adam walks to school.",
          ar: "القصة تقول: أولًا يمشي آدم إلى المدرسة.",
        },
      },
      {
        prompt: "Where does Adam play football?",
        options: ["In the classroom", "In the playground", "At home"],
        correct: 1,
        explanation: {
          en: "He plays football in the playground.",
          ar: "يلعب كرة القدم في الملعب playground.",
        },
      },
      {
        prompt: "Which word means the last thing?",
        options: ["first", "then", "finally"],
        correct: 2,
        explanation: {
          en: "Finally means the last thing in a story.",
          ar: "finally تعني آخر شيء في القصة.",
        },
      },
    ],
  },
  {
    id: "kids-present-simple",
    course: "kids",
    skill: "grammar",
    title: { en: "Things I do every day", ar: "أشياء أفعلها كل يوم" },
    goal: {
      en: "Use the present simple for daily habits with I, you, he and she.",
      ar: "استخدم المضارع البسيط للعادات اليومية مع I وyou وhe وshe.",
    },
    minutes: 15,
    teaching: [
      {
        en: "For habits we use the present simple: I play, you play, we play. With he and she, add s: he plays, she reads.",
        ar: "للعادات نستخدم المضارع البسيط: I play. ومع he وshe نضيف s للفعل: he plays وshe reads.",
      },
      {
        en: "Negatives use do not and does not: I do not like fish. She does not like fish. Questions: Do you like fish? Does she like fish?",
        ar: "للنفي نستخدم do not وdoes not: I do not like fish. وللسؤال: Do you like fish?",
      },
    ],
    example:
      "Maya gets up at seven every day. She brushes her teeth and eats breakfast. Her brother Omar does not like breakfast. He plays with his cat instead!",
    pronunciation: "She brushes her teeth and eats breakfast every day.",
    pronunciationTip: {
      en: "Brushes ends with a soft iz sound: brush-iz.",
      ar: "كلمة brushes تنتهي بصوت iz خفيف.",
    },
    questions: [
      {
        prompt: "She ___ breakfast every day.",
        options: ["eat", "eats", "eating"],
        correct: 1,
        explanation: {
          en: "With she we add s: eats.",
          ar: "مع she نضيف s للفعل: eats.",
        },
      },
      {
        prompt: "Omar ___ like breakfast.",
        options: ["do not", "does not", "is not"],
        correct: 1,
        explanation: {
          en: "Omar is he, so we use does not.",
          ar: "Omar مفرد غائب، لذلك نستخدم does not.",
        },
      },
      {
        prompt: "Choose the correct question.",
        options: ["Does you like cats?", "Do you like cats?", "You do like cats?"],
        correct: 1,
        explanation: {
          en: "With you the question starts with Do.",
          ar: "مع you يبدأ السؤال بـ Do.",
        },
      },
    ],
    writing: {
      prompt:
        "Write 4 sentences about your day. What do you do in the morning, at school and in the evening?",
      minimum: 25,
      model:
        "I get up at seven o'clock every morning. I eat breakfast with my family and then I walk to school. At school I read books and play with my friends. In the evening I do my homework and watch a cartoon.",
      checklist: [
        { en: "I used the present simple for habits", ar: "استخدمت المضارع البسيط للعادات" },
        { en: "I added s with he or she", ar: "أضفت s مع he أو she" },
        { en: "I wrote about morning, school and evening", ar: "كتبت عن الصباح والمدرسة والمساء" },
      ],
    },
  },
  // ----- Advanced (A2 – B1) -----
  {
    id: "kids-story-past",
    course: "kids",
    skill: "reading",
    title: { en: "A story in the past", ar: "قصة في الماضي" },
    goal: {
      en: "Read a longer story and use the past tense to retell it.",
      ar: "اقرأ قصة أطول واستخدم الماضي لإعادة سردها.",
    },
    minutes: 18,
    teaching: [
      {
        en: "The past tense tells us about finished events. Regular verbs add -ed: play → played, walk → walked. Irregular verbs change: go → went, eat → ate, see → saw.",
        ar: "الماضي يصف أحداثًا انتهت. الأفعال المنتظمة تأخذ -ed مثل played، وغير المنتظمة تتغير مثل went وate وsaw.",
      },
      {
        en: "To retell a story, use time words: yesterday, last week, one day. Yesterday I went to the park and saw a big dog.",
        ar: "لإعادة السرد نستخدم كلمات مثل yesterday وlast week. مثال: Yesterday I went to the park.",
      },
    ],
    example:
      "Last Saturday, Lina and her family went to the beach. They swam in the sea and ate sandwiches under a big umbrella. Lina found a small red shell and gave it to her little brother. They came home tired but very happy.",
    pronunciation: "Last Saturday we went to the beach and swam in the sea.",
    pronunciationTip: {
      en: "Walked ends with a t sound: walkt. Played ends with a d sound: playd.",
      ar: "walked تنتهي بصوت t، وplayed تنتهي بصوت d.",
    },
    questions: [
      {
        prompt: "When did Lina's family go to the beach?",
        options: ["Last Saturday", "Every day", "Tomorrow"],
        correct: 0,
        explanation: {
          en: "The story starts: Last Saturday, Lina and her family went to the beach.",
          ar: "تبدأ القصة بـ Last Saturday أي السبت الماضي.",
        },
      },
      {
        prompt: "What is the past of go?",
        options: ["goed", "went", "gone to"],
        correct: 1,
        explanation: {
          en: "Go is irregular: go → went.",
          ar: "go فعل غير منتظم وماضيه went.",
        },
      },
      {
        prompt: "Lina ___ a small red shell.",
        options: ["find", "finds", "found"],
        correct: 2,
        explanation: {
          en: "The story is in the past, and the past of find is found.",
          ar: "القصة في الماضي، وماضي find هو found.",
        },
      },
    ],
  },
  {
    id: "kids-describing",
    course: "kids",
    skill: "writing",
    title: { en: "Describe your favourite animal", ar: "صِف حيوانك المفضل" },
    goal: {
      en: "Write a short paragraph describing an animal with adjectives.",
      ar: "اكتب فقرة قصيرة تصف حيوانًا باستخدام الصفات.",
    },
    minutes: 18,
    teaching: [
      {
        en: "Adjectives describe things: big, small, fast, slow, funny, friendly. They come before the noun: a big elephant.",
        ar: "الصفات تصف الأشياء مثل big وfast وfriendly، وتأتي قبل الاسم: a big elephant.",
      },
      {
        en: "A good paragraph has a beginning (My favourite animal is…), a middle (It is… It can… It eats…) and an end (I like it because…).",
        ar: "الفقرة الجيدة لها بداية مثل My favourite animal is، ووسط يصف الحيوان، ونهاية مثل I like it because.",
      },
    ],
    example:
      "My favourite animal is the dolphin. It is grey and very fast. It can jump high out of the water and it eats small fish. Dolphins are friendly and clever. I like them because they always look happy.",
    pronunciation: "My favourite animal is the dolphin. It is fast and friendly.",
    pronunciationTip: {
      en: "Favourite has two parts: fay-vrit. Do not say fa-vo-rite.",
      ar: "كلمة favourite تُنطق fay-vrit من مقطعين.",
    },
    questions: [
      {
        prompt: "Choose the correct sentence.",
        options: ["A big elephant", "An elephant big", "Big an elephant"],
        correct: 0,
        explanation: {
          en: "The adjective comes before the noun: a big elephant.",
          ar: "الصفة تأتي قبل الاسم: a big elephant.",
        },
      },
      {
        prompt: "Which word is an adjective?",
        options: ["quickly", "friendly", "jump"],
        correct: 1,
        explanation: {
          en: "Friendly describes a noun. Quickly describes a verb and jump is a verb.",
          ar: "friendly صفة تصف الاسم، أما quickly فحال وjump فعل.",
        },
      },
      {
        prompt: "I like dolphins ___ they are clever.",
        options: ["because", "but", "so"],
        correct: 0,
        explanation: {
          en: "Because gives a reason.",
          ar: "because تذكر السبب.",
        },
      },
    ],
    writing: {
      prompt:
        "Write a short paragraph (5–6 sentences) about your favourite animal. Describe its colour, size and what it can do.",
      minimum: 35,
      model:
        "My favourite animal is the horse. It is big and brown with long legs. It can run very fast and jump over fences. Horses eat grass and apples, and they are friendly with people. I like horses because they are strong and beautiful animals.",
      checklist: [
        { en: "I named my favourite animal", ar: "ذكرت حيواني المفضل" },
        { en: "I used at least three adjectives", ar: "استخدمت ثلاث صفات على الأقل" },
        { en: "I ended with because", ar: "أنهيت الفقرة بجملة فيها because" },
      ],
    },
  },
  {
    id: "kids-asking-questions",
    course: "kids",
    skill: "speaking",
    title: { en: "Ask and answer", ar: "اسأل وأجب" },
    goal: {
      en: "Ask questions with what, where, when and who, and give full answers.",
      ar: "اسأل باستخدام what وwhere وwhen وwho وأجب بجمل كاملة.",
    },
    minutes: 15,
    teaching: [
      {
        en: "Question words: what (a thing), where (a place), when (a time), who (a person). What is this? Where is the library?",
        ar: "أدوات السؤال: what لشيء، where لمكان، when لوقت، who لشخص. مثال: Where is the library? أين المكتبة؟",
      },
      {
        en: "Answer with a full sentence, not one word. Question: Where do you live? Answer: I live in Amman.",
        ar: "أجب بجملة كاملة وليس بكلمة واحدة. مثال: Where do you live? والإجابة: I live in Amman.",
      },
    ],
    example:
      "Teacher: What is your favourite food?\nKareem: My favourite food is pizza.\nTeacher: Who cooks pizza in your family?\nKareem: My father cooks it on Fridays!",
    pronunciation: "What is your favourite food? My favourite food is pizza.",
    pronunciationTip: {
      en: "In what, the wh sounds like w. Your voice goes up at the end of yes/no questions.",
      ar: "في what يُنطق wh مثل w، ويرتفع صوتك في نهاية أسئلة نعم/لا.",
    },
    questions: [
      {
        prompt: "___ is the zoo? — It is next to the park.",
        options: ["What", "Where", "Who"],
        correct: 1,
        explanation: {
          en: "The answer is a place, so the question word is where.",
          ar: "الإجابة عن مكان، لذلك نستخدم where.",
        },
      },
      {
        prompt: "___ is that girl? — She is my sister.",
        options: ["Who", "When", "Where"],
        correct: 0,
        explanation: {
          en: "The answer is a person, so we ask with who.",
          ar: "الإجابة عن شخص، لذلك نسأل بـ who.",
        },
      },
      {
        prompt: "Choose the full answer to: When do you play football?",
        options: ["Friday.", "I play football on Friday.", "Play football."],
        correct: 1,
        explanation: {
          en: "A full answer repeats the verb: I play football on Friday.",
          ar: "الإجابة الكاملة تكرر الفعل: I play football on Friday.",
        },
      },
    ],
  },
];
