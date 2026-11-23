import type { Bilingual, LessonQuestion } from "./lesson-types";

export interface GrammarRule {
  id: string;
  level: string;
  title: Bilingual;
  teaching: Bilingual[];
  example: string;
  questions: LessonQuestion[];
}

/** Explicit explanations precede application checks in every grammar unit. */
export const GRAMMAR_RULES: GrammarRule[] = [
  {
    "id": "be-identity-and-description",
    "level": "A1",
    "title": {
      "en": "Be: identity and description",
      "ar": "فعل الكينونة: الهوية والوصف"
    },
    "teaching": [
      {
        "en": "Use be to identify someone or describe a state. English needs the verb even where Arabic uses a nominal sentence.",
        "ar": "نستخدم فعل الكينونة للتعريف بشخص أو وصف حالة. الإنجليزية تحتاج الفعل حتى عندما نستخدم جملة اسمية بالعربية."
      },
      {
        "en": "I am; he/she/it is; you/we/they are. Add not for a negative; put be before the subject in a question.",
        "ar": "نستخدم am مع I وis مع he/she/it وare مع you/we/they. نضيف not للنفي ونقدم الفعل في السؤال."
      },
      {
        "en": "Example: I am a pupil. She is happy. Are they ready?",
        "ar": "مثال: I am a pupil. She is happy. Are they ready?"
      }
    ],
    "example": "I am a pupil. She is happy. Are they ready?",
    "questions": [
      {
        "prompt": "My sister ___ at school.",
        "options": [
          "is",
          "are",
          "am"
        ],
        "correct": 0,
        "explanation": {
          "en": "My sister is singular, so use is. Are belongs with plural subjects and you; am belongs only with I.",
          "ar": "الفاعل My sister مفرد، لذلك نستخدم is. نستخدم are مع الجمع وyou وam مع I فقط."
        }
      },
      {
        "prompt": "Which statement about be: identity and description is correct?",
        "options": [
          "Use be to identify someone or describe a state. English needs the verb even where Arabic uses a nominal sentence.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Use be to identify someone or describe a state. English needs the verb even where Arabic uses a nominal sentence. I am; he/she/it is; you/we/they are. Add not for a negative; put be before the subject in a question.",
          "ar": "نستخدم فعل الكينونة للتعريف بشخص أو وصف حالة. الإنجليزية تحتاج الفعل حتى عندما نستخدم جملة اسمية بالعربية. نستخدم am مع I وis مع he/she/it وare مع you/we/they. نضيف not للنفي ونقدم الفعل في السؤال."
        }
      }
    ]
  },
  {
    "id": "subject-and-object-pronouns",
    "level": "A1",
    "title": {
      "en": "Subject and object pronouns",
      "ar": "ضمائر الفاعل والمفعول"
    },
    "teaching": [
      {
        "en": "A subject pronoun performs the action; an object pronoun receives it. Use object forms after most prepositions too.",
        "ar": "ضمير الفاعل يقوم بالفعل وضمير المفعول يتلقى أثره. نستخدم ضمائر المفعول بعد معظم حروف الجر أيضًا."
      },
      {
        "en": "I/me, he/him, she/her, we/us, they/them. You and it have the same subject and object form.",
        "ar": "الأزواج: I/me وhe/him وshe/her وwe/us وthey/them. صيغة you وit لا تتغير."
      },
      {
        "en": "Example: She helps me. I sit beside her.",
        "ar": "مثال: She helps me. I sit beside her."
      }
    ],
    "example": "She helps me. I sit beside her.",
    "questions": [
      {
        "prompt": "The teacher helps ___.",
        "options": [
          "us",
          "we",
          "our"
        ],
        "correct": 0,
        "explanation": {
          "en": "Helps needs an object here: us. We is a subject pronoun; our must come before a noun.",
          "ar": "يحتاج الفعل helps مفعولًا هنا: us. الضمير we للفاعل وour يأتي قبل اسم."
        }
      },
      {
        "prompt": "Which statement about subject and object pronouns is correct?",
        "options": [
          "A subject pronoun performs the action; an object pronoun receives it. Use object forms after most prepositions too.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "A subject pronoun performs the action; an object pronoun receives it. Use object forms after most prepositions too. I/me, he/him, she/her, we/us, they/them. You and it have the same subject and object form.",
          "ar": "ضمير الفاعل يقوم بالفعل وضمير المفعول يتلقى أثره. نستخدم ضمائر المفعول بعد معظم حروف الجر أيضًا. الأزواج: I/me وhe/him وshe/her وwe/us وthey/them. صيغة you وit لا تتغير."
        }
      }
    ]
  },
  {
    "id": "articles-a-an-and-the",
    "level": "A1",
    "title": {
      "en": "Articles: a, an and the",
      "ar": "أدوات التنكير والتعريف"
    },
    "teaching": [
      {
        "en": "Use a/an for one unspecified countable thing. Choose by sound, not spelling. Use the when the listener can identify which thing you mean.",
        "ar": "نستخدم a/an لشيء معدود مفرد غير محدد. نختار بحسب الصوت لا الحرف. نستخدم the عندما يستطيع المستمع تحديد الشيء المقصود."
      },
      {
        "en": "a + consonant sound; an + vowel sound. A university begins with a /y/ sound; an hour has a silent h.",
        "ar": "تأتي a قبل صوت ساكن وan قبل صوت متحرك. نقول a university لأن البداية صوت /y/ وan hour لأن h لا تنطق."
      },
      {
        "en": "Example: I saw a dog. The dog was small. I waited an hour.",
        "ar": "مثال: I saw a dog. The dog was small. I waited an hour."
      }
    ],
    "example": "I saw a dog. The dog was small. I waited an hour.",
    "questions": [
      {
        "prompt": "I need ___ umbrella.",
        "options": [
          "an",
          "a",
          "two"
        ],
        "correct": 0,
        "explanation": {
          "en": "Umbrella starts with a vowel sound and is one unspecified countable item, so use an.",
          "ar": "تبدأ umbrella بصوت متحرك وهي شيء معدود مفرد غير محدد، لذا نستخدم an."
        }
      },
      {
        "prompt": "Which statement about articles: a, an and the is correct?",
        "options": [
          "Use a/an for one unspecified countable thing. Choose by sound, not spelling. Use the when the listener can identify which thing you mean.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Use a/an for one unspecified countable thing. Choose by sound, not spelling. Use the when the listener can identify which thing you mean. a + consonant sound; an + vowel sound. A university begins with a /y/ sound; an hour has a silent h.",
          "ar": "نستخدم a/an لشيء معدود مفرد غير محدد. نختار بحسب الصوت لا الحرف. نستخدم the عندما يستطيع المستمع تحديد الشيء المقصود. تأتي a قبل صوت ساكن وan قبل صوت متحرك. نقول a university لأن البداية صوت /y/ وan hour لأن h لا تنطق."
        }
      }
    ]
  },
  {
    "id": "singular-and-plural-nouns",
    "level": "A1",
    "title": {
      "en": "Singular and plural nouns",
      "ar": "الأسماء المفردة والجمع"
    },
    "teaching": [
      {
        "en": "Plural nouns refer to more than one. Many take -s, but some change spelling or are irregular.",
        "ar": "يشير الجمع إلى أكثر من واحد. نضيف s غالبًا، لكن بعض الأسماء تتغير كتابتها أو جمعها غير منتظم."
      },
      {
        "en": "book/books; box/boxes; baby/babies (consonant + y); child/children; person/people. Do not add s to children.",
        "ar": "book/books وbox/boxes وbaby/babies عندما يسبق y حرف ساكن. child/children وperson/people جمع غير منتظم."
      },
      {
        "en": "Example: There are two boxes and three children.",
        "ar": "مثال: There are two boxes and three children."
      }
    ],
    "example": "There are two boxes and three children.",
    "questions": [
      {
        "prompt": "Three ___ are playing.",
        "options": [
          "children",
          "childs",
          "child"
        ],
        "correct": 0,
        "explanation": {
          "en": "The number three requires a plural noun. Children is the irregular plural of child.",
          "ar": "العدد three يحتاج اسمًا جمعًا. children هي صيغة الجمع غير المنتظم لكلمة child."
        }
      },
      {
        "prompt": "Which statement about singular and plural nouns is correct?",
        "options": [
          "Plural nouns refer to more than one. Many take -s, but some change spelling or are irregular.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Plural nouns refer to more than one. Many take -s, but some change spelling or are irregular. book/books; box/boxes; baby/babies (consonant + y); child/children; person/people. Do not add s to children.",
          "ar": "يشير الجمع إلى أكثر من واحد. نضيف s غالبًا، لكن بعض الأسماء تتغير كتابتها أو جمعها غير منتظم. book/books وbox/boxes وbaby/babies عندما يسبق y حرف ساكن. child/children وperson/people جمع غير منتظم."
        }
      }
    ]
  },
  {
    "id": "possession-and-possessive-forms",
    "level": "A1",
    "title": {
      "en": "Possession and possessive forms",
      "ar": "الملكية وصيغها"
    },
    "teaching": [
      {
        "en": "Possessive determiners come before nouns; possessive pronouns replace the noun. Apostrophe-s shows who owns something.",
        "ar": "محددات الملكية تأتي قبل الاسم وضمائر الملكية تحل محله. نستخدم فاصلة علوية ثم s لإظهار مالك الشيء."
      },
      {
        "en": "my book / mine; your/yours; her/hers; our/ours; their/theirs. Sara's bag; the students' bags for a regular plural owner.",
        "ar": "my book أو mine دون اسم بعدها. نقول Sara's bag وللمالك الجمع المنتظم: the students' bags."
      },
      {
        "en": "Example: This is her pencil. The blue pencil is hers.",
        "ar": "مثال: This is her pencil. The blue pencil is hers."
      }
    ],
    "example": "This is her pencil. The blue pencil is hers.",
    "questions": [
      {
        "prompt": "This notebook belongs to me. It is ___.",
        "options": [
          "mine",
          "my",
          "me"
        ],
        "correct": 0,
        "explanation": {
          "en": "Mine replaces my notebook. My needs a noun after it, while me is an object pronoun.",
          "ar": "تحل mine محل my notebook. تحتاج my اسمًا بعدها، وme ضمير مفعول."
        }
      },
      {
        "prompt": "Which statement about possession and possessive forms is correct?",
        "options": [
          "Possessive determiners come before nouns; possessive pronouns replace the noun. Apostrophe-s shows who owns something.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Possessive determiners come before nouns; possessive pronouns replace the noun. Apostrophe-s shows who owns something. my book / mine; your/yours; her/hers; our/ours; their/theirs. Sara's bag; the students' bags for a regular plural owner.",
          "ar": "محددات الملكية تأتي قبل الاسم وضمائر الملكية تحل محله. نستخدم فاصلة علوية ثم s لإظهار مالك الشيء. my book أو mine دون اسم بعدها. نقول Sara's bag وللمالك الجمع المنتظم: the students' bags."
        }
      }
    ]
  },
  {
    "id": "present-simple-and-agreement",
    "level": "A1",
    "title": {
      "en": "Present simple and agreement",
      "ar": "المضارع البسيط وتوافق الفاعل"
    },
    "teaching": [
      {
        "en": "Use the present simple for habits, general facts and stable situations. Only he/she/it takes an added -s in affirmative sentences.",
        "ar": "نستخدم المضارع البسيط للعادات والحقائق العامة والحالات الثابتة. نضيف s مع he/she/it في الجمل المثبتة فقط."
      },
      {
        "en": "I/you/we/they work; he/she/it works. Negatives: do not / does not + base verb. Questions: Do/Does + subject + base verb?",
        "ar": "I/you/we/they work وhe/she/it works. للنفي do not أوdoes not مع مصدر الفعل وللسؤال Do/Does ثم الفاعل والمصدر."
      },
      {
        "en": "Example: She walks to school. Does she walk every day?",
        "ar": "مثال: She walks to school. Does she walk every day?"
      }
    ],
    "example": "She walks to school. Does she walk every day?",
    "questions": [
      {
        "prompt": "He ___ English every evening.",
        "options": [
          "studies",
          "study",
          "studying"
        ],
        "correct": 0,
        "explanation": {
          "en": "He is third-person singular; change consonant + y to -ies. After does, the same verb would be study.",
          "ar": "الفاعل He مفرد غائب؛ نحول y المسبوقة بساكن إلى ies. بعد does نستخدم study دون s."
        }
      },
      {
        "prompt": "Which statement about present simple and agreement is correct?",
        "options": [
          "Use the present simple for habits, general facts and stable situations. Only he/she/it takes an added -s in affirmative sentences.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Use the present simple for habits, general facts and stable situations. Only he/she/it takes an added -s in affirmative sentences. I/you/we/they work; he/she/it works. Negatives: do not / does not + base verb. Questions: Do/Does + subject + base verb?",
          "ar": "نستخدم المضارع البسيط للعادات والحقائق العامة والحالات الثابتة. نضيف s مع he/she/it في الجمل المثبتة فقط. I/you/we/they work وhe/she/it works. للنفي do not أوdoes not مع مصدر الفعل وللسؤال Do/Does ثم الفاعل والمصدر."
        }
      }
    ]
  },
  {
    "id": "past-simple",
    "level": "A2",
    "title": {
      "en": "Past simple",
      "ar": "الماضي البسيط"
    },
    "teaching": [
      {
        "en": "Use the past simple for a completed event at a finished time. Regular verbs take -ed; common verbs have irregular past forms.",
        "ar": "نستخدم الماضي البسيط لحدث انتهى في وقت منتهٍ. نضيف ed للأفعال المنتظمة ولأفعال شائعة صيغ ماضٍ غير منتظمة."
      },
      {
        "en": "worked, went, saw. Negative: did not + base verb. Question: Did + subject + base verb? Was/were use their own patterns.",
        "ar": "worked وwent وsaw. للنفي did not مع المصدر وللسؤال Did ثم الفاعل والمصدر. يتبع was/were نمطًا خاصًا."
      },
      {
        "en": "Example: I went yesterday. Did you go? I did not go on Monday.",
        "ar": "مثال: I went yesterday. Did you go? I did not go on Monday."
      }
    ],
    "example": "I went yesterday. Did you go? I did not go on Monday.",
    "questions": [
      {
        "prompt": "We ___ the museum yesterday.",
        "options": [
          "visited",
          "visit",
          "visiting"
        ],
        "correct": 0,
        "explanation": {
          "en": "Yesterday marks a finished past time. Visited is the regular past form; no auxiliary is needed in this affirmative sentence.",
          "ar": "تدل yesterday على وقت ماضٍ منتهٍ. visited ماضي منتظم ولا تحتاج الجملة المثبتة فعلًا مساعدًا."
        }
      },
      {
        "prompt": "Which statement about past simple is correct?",
        "options": [
          "Use the past simple for a completed event at a finished time. Regular verbs take -ed; common verbs have irregular past forms.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Use the past simple for a completed event at a finished time. Regular verbs take -ed; common verbs have irregular past forms. worked, went, saw. Negative: did not + base verb. Question: Did + subject + base verb? Was/were use their own patterns.",
          "ar": "نستخدم الماضي البسيط لحدث انتهى في وقت منتهٍ. نضيف ed للأفعال المنتظمة ولأفعال شائعة صيغ ماضٍ غير منتظمة. worked وwent وsaw. للنفي did not مع المصدر وللسؤال Did ثم الفاعل والمصدر. يتبع was/were نمطًا خاصًا."
        }
      }
    ]
  },
  {
    "id": "present-continuous",
    "level": "A2",
    "title": {
      "en": "Present continuous",
      "ar": "المضارع المستمر"
    },
    "teaching": [
      {
        "en": "Use the present continuous for actions happening now or temporary situations. Stative verbs such as know usually use the simple form.",
        "ar": "نستخدم المضارع المستمر لما يحدث الآن أو للحالات المؤقتة. أفعال الحالة مثل know تأتي عادة بصيغة بسيطة."
      },
      {
        "en": "am/is/are + verb-ing. Put be before the subject for questions. Drop final silent e: make/making.",
        "ar": "am/is/are مع الفعل المنتهي بـing. نقدم be للسؤال. نحذف e الصامتة الأخيرة: make/making."
      },
      {
        "en": "Example: She is making lunch now. I know the answer.",
        "ar": "مثال: She is making lunch now. I know the answer."
      }
    ],
    "example": "She is making lunch now. I know the answer.",
    "questions": [
      {
        "prompt": "Listen! The birds ___ singing.",
        "options": [
          "are",
          "is",
          "be"
        ],
        "correct": 0,
        "explanation": {
          "en": "Birds is plural, so are completes the present continuous pattern are + singing.",
          "ar": "birds جمع، لذا تكمل are تركيب المضارع المستمر are + singing."
        }
      },
      {
        "prompt": "Which statement about present continuous is correct?",
        "options": [
          "Use the present continuous for actions happening now or temporary situations. Stative verbs such as know usually use the simple form.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Use the present continuous for actions happening now or temporary situations. Stative verbs such as know usually use the simple form. am/is/are + verb-ing. Put be before the subject for questions. Drop final silent e: make/making.",
          "ar": "نستخدم المضارع المستمر لما يحدث الآن أو للحالات المؤقتة. أفعال الحالة مثل know تأتي عادة بصيغة بسيطة. am/is/are مع الفعل المنتهي بـing. نقدم be للسؤال. نحذف e الصامتة الأخيرة: make/making."
        }
      }
    ]
  },
  {
    "id": "past-continuous",
    "level": "A2",
    "title": {
      "en": "Past continuous",
      "ar": "الماضي المستمر"
    },
    "teaching": [
      {
        "en": "Use the past continuous for an action in progress at a past moment. A short interrupting event often takes the past simple.",
        "ar": "نستخدم الماضي المستمر لحدث كان جاريًا في لحظة ماضية. يأتي الحدث القصير الذي يقطعه غالبًا بالماضي البسيط."
      },
      {
        "en": "was/were + verb-ing. I/he/she/it was; you/we/they were. When + short event; while + ongoing action.",
        "ar": "was/were مع فعل ing. نستخدم was مع I/he/she/it وwere مع you/we/they. when لحدث قصير وwhile لحدث مستمر."
      },
      {
        "en": "Example: I was reading when the phone rang.",
        "ar": "مثال: I was reading when the phone rang."
      }
    ],
    "example": "I was reading when the phone rang.",
    "questions": [
      {
        "prompt": "At eight last night, they ___ watching a film.",
        "options": [
          "were",
          "was",
          "are"
        ],
        "correct": 0,
        "explanation": {
          "en": "The past time requires a past auxiliary, and they agrees with were.",
          "ar": "الوقت ماضٍ، لذا نحتاج فعلًا مساعدًا ماضيًا؛ يتوافق they مع were."
        }
      },
      {
        "prompt": "Which statement about past continuous is correct?",
        "options": [
          "Use the past continuous for an action in progress at a past moment. A short interrupting event often takes the past simple.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Use the past continuous for an action in progress at a past moment. A short interrupting event often takes the past simple. was/were + verb-ing. I/he/she/it was; you/we/they were. When + short event; while + ongoing action.",
          "ar": "نستخدم الماضي المستمر لحدث كان جاريًا في لحظة ماضية. يأتي الحدث القصير الذي يقطعه غالبًا بالماضي البسيط. was/were مع فعل ing. نستخدم was مع I/he/she/it وwere مع you/we/they. when لحدث قصير وwhile لحدث مستمر."
        }
      }
    ]
  },
  {
    "id": "future-with-will",
    "level": "A2",
    "title": {
      "en": "Future with will",
      "ar": "المستقبل باستخدام will"
    },
    "teaching": [
      {
        "en": "Use will for a decision made now, an offer, a promise or a prediction. Will does not change with the subject.",
        "ar": "نستخدم will لقرار لحظي أو عرض مساعدة أو وعد أو توقع. لا تتغير will بتغير الفاعل."
      },
      {
        "en": "will + base verb; will not (won't) + base verb; Will + subject + base verb? Do not add to or -s.",
        "ar": "will مع مصدر الفعل؛ will not أوwon't للنفي؛ وللسؤال Will ثم الفاعل والمصدر. لا نضيف to أوs."
      },
      {
        "en": "Example: That bag looks heavy. I will carry it for you.",
        "ar": "مثال: That bag looks heavy. I will carry it for you."
      }
    ],
    "example": "That bag looks heavy. I will carry it for you.",
    "questions": [
      {
        "prompt": "I promise I ___ call you tomorrow.",
        "options": [
          "will",
          "am",
          "did"
        ],
        "correct": 0,
        "explanation": {
          "en": "A promise about tomorrow naturally uses will + call. Am alone cannot be followed by the base verb call.",
          "ar": "الوعد بعمل غدًا يستخدم will مع call. لا يمكن أن تتبع am وحدها بمصدر call."
        }
      },
      {
        "prompt": "Which statement about future with will is correct?",
        "options": [
          "Use will for a decision made now, an offer, a promise or a prediction. Will does not change with the subject.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Use will for a decision made now, an offer, a promise or a prediction. Will does not change with the subject. will + base verb; will not (won't) + base verb; Will + subject + base verb? Do not add to or -s.",
          "ar": "نستخدم will لقرار لحظي أو عرض مساعدة أو وعد أو توقع. لا تتغير will بتغير الفاعل. will مع مصدر الفعل؛ will not أوwon't للنفي؛ وللسؤال Will ثم الفاعل والمصدر. لا نضيف to أوs."
        }
      }
    ]
  },
  {
    "id": "future-plans-going-to-and-arrangements",
    "level": "A2",
    "title": {
      "en": "Future plans: going to and arrangements",
      "ar": "خطط المستقبل والترتيبات"
    },
    "teaching": [
      {
        "en": "Use be going to for an intention already decided or a prediction based on present evidence. Present continuous can describe a confirmed arrangement.",
        "ar": "نستخدم be going to لنية مقررة مسبقًا أو توقع قائم على دليل حاضر. قد يصف المضارع المستمر ترتيبًا مؤكدًا."
      },
      {
        "en": "am/is/are going to + base verb. For an arrangement: I am meeting Sam at six. Include a future time so the meaning is clear.",
        "ar": "am/is/are going to مع المصدر. للترتيب نقول I am meeting Sam at six مع ذكر وقت مستقبلي."
      },
      {
        "en": "Example: Look at those clouds. It is going to rain.",
        "ar": "مثال: Look at those clouds. It is going to rain."
      }
    ],
    "example": "Look at those clouds. It is going to rain.",
    "questions": [
      {
        "prompt": "They ___ going to travel next week.",
        "options": [
          "are",
          "is",
          "will"
        ],
        "correct": 0,
        "explanation": {
          "en": "They needs are in the pattern be going to. Will cannot directly precede going to without be.",
          "ar": "يتطلب they صيغة are في تركيب be going to. لا تأتي will مباشرة قبل going to دون be."
        }
      },
      {
        "prompt": "Which statement about future plans: going to and arrangements is correct?",
        "options": [
          "Use be going to for an intention already decided or a prediction based on present evidence. Present continuous can describe a confirmed arrangement.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Use be going to for an intention already decided or a prediction based on present evidence. Present continuous can describe a confirmed arrangement. am/is/are going to + base verb. For an arrangement: I am meeting Sam at six. Include a future time so the meaning is clear.",
          "ar": "نستخدم be going to لنية مقررة مسبقًا أو توقع قائم على دليل حاضر. قد يصف المضارع المستمر ترتيبًا مؤكدًا. am/is/are going to مع المصدر. للترتيب نقول I am meeting Sam at six مع ذكر وقت مستقبلي."
        }
      }
    ]
  },
  {
    "id": "countability-and-quantifiers",
    "level": "A2",
    "title": {
      "en": "Countability and quantifiers",
      "ar": "المعدود وغير المعدود والكميات"
    },
    "teaching": [
      {
        "en": "Countable nouns have singular/plural forms. Uncountable nouns such as advice and information do not normally take a/an or plural -s.",
        "ar": "للمعدود مفرد وجمع. غير المعدود مثل advice وinformation لا يقبل عادة a/an أوs الجمع."
      },
      {
        "en": "many/few + plural countable; much/little + uncountable; some/any/a lot of can work with both. Use a piece of advice.",
        "ar": "many/few مع الجمع المعدود وmuch/little مع غير المعدود. some/any/a lot of تناسب كليهما. نقول a piece of advice."
      },
      {
        "en": "Example: We have a little time and a few apples.",
        "ar": "مثال: We have a little time and a few apples."
      }
    ],
    "example": "We have a little time and a few apples.",
    "questions": [
      {
        "prompt": "How ___ water do we need?",
        "options": [
          "much",
          "many",
          "few"
        ],
        "correct": 0,
        "explanation": {
          "en": "Water is uncountable, so a quantity question uses how much, not how many.",
          "ar": "water غير معدود، لذا نسأل عن كميته بـhow much لاhow many."
        }
      },
      {
        "prompt": "Which statement about countability and quantifiers is correct?",
        "options": [
          "Countable nouns have singular/plural forms. Uncountable nouns such as advice and information do not normally take a/an or plural -s.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Countable nouns have singular/plural forms. Uncountable nouns such as advice and information do not normally take a/an or plural -s. many/few + plural countable; much/little + uncountable; some/any/a lot of can work with both. Use a piece of advice.",
          "ar": "للمعدود مفرد وجمع. غير المعدود مثل advice وinformation لا يقبل عادة a/an أوs الجمع. many/few مع الجمع المعدود وmuch/little مع غير المعدود. some/any/a lot of تناسب كليهما. نقول a piece of advice."
        }
      }
    ]
  },
  {
    "id": "comparatives-and-superlatives",
    "level": "A2",
    "title": {
      "en": "Comparatives and superlatives",
      "ar": "المقارنة والتفضيل"
    },
    "teaching": [
      {
        "en": "Use a comparative to compare two things and a superlative for an extreme within a group. Avoid adding more to a word already ending in comparative -er.",
        "ar": "نستخدم المقارنة لشيئين والتفضيل لأقصى صفة ضمن مجموعة. لا نضيف more إلى صفة تحمل er للمقارنة."
      },
      {
        "en": "small/smaller/the smallest; interesting/more interesting/the most interesting; good/better/the best. Comparatives often use than.",
        "ar": "small/smaller/the smallest وinteresting/more interesting/the most interesting وgood/better/the best. تأتي than غالبًا مع المقارنة."
      },
      {
        "en": "Example: This route is shorter than that one. It is the shortest route.",
        "ar": "مثال: This route is shorter than that one. It is the shortest route."
      }
    ],
    "example": "This route is shorter than that one. It is the shortest route.",
    "questions": [
      {
        "prompt": "This book is ___ than the other one.",
        "options": [
          "more interesting",
          "most interesting",
          "interestinger"
        ],
        "correct": 0,
        "explanation": {
          "en": "Interesting normally uses more for the comparative. Than signals a comparison, not a superlative.",
          "ar": "نستخدم more مع interesting للمقارنة. تشير than إلى المقارنة لا التفضيل."
        }
      },
      {
        "prompt": "Which statement about comparatives and superlatives is correct?",
        "options": [
          "Use a comparative to compare two things and a superlative for an extreme within a group. Avoid adding more to a word already ending in comparative -er.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Use a comparative to compare two things and a superlative for an extreme within a group. Avoid adding more to a word already ending in comparative -er. small/smaller/the smallest; interesting/more interesting/the most interesting; good/better/the best. Comparatives often use than.",
          "ar": "نستخدم المقارنة لشيئين والتفضيل لأقصى صفة ضمن مجموعة. لا نضيف more إلى صفة تحمل er للمقارنة. small/smaller/the smallest وinteresting/more interesting/the most interesting وgood/better/the best. تأتي than غالبًا مع المقارنة."
        }
      }
    ]
  },
  {
    "id": "present-perfect",
    "level": "B1",
    "title": {
      "en": "Present perfect",
      "ar": "المضارع التام"
    },
    "teaching": [
      {
        "en": "Use the present perfect for experience or a past action connected to now. Use the past simple instead when specifying a finished past time such as yesterday.",
        "ar": "نستخدم المضارع التام للخبرة أو لحدث ماضٍ متصل بالحاضر. مع وقت ماضٍ منتهٍ مثل yesterday نستخدم الماضي البسيط."
      },
      {
        "en": "have/has + past participle. Since + starting point; for + duration. Ever/never often describe experience.",
        "ar": "have/has مع التصريف الثالث. since لبداية الفترة وfor للمدة. ever/never شائعتان للخبرة."
      },
      {
        "en": "Example: I have lived here for three years. I moved here in 2023.",
        "ar": "مثال: I have lived here for three years. I moved here in 2023."
      }
    ],
    "example": "I have lived here for three years. I moved here in 2023.",
    "questions": [
      {
        "prompt": "She ___ finished her homework, so she can play now.",
        "options": [
          "has",
          "have",
          "is"
        ],
        "correct": 0,
        "explanation": {
          "en": "She takes has, followed by the past participle finished. The present result is that she can play.",
          "ar": "نستخدم has مع She ثم التصريف الثالث finished. النتيجة الحالية أنها تستطيع اللعب."
        }
      },
      {
        "prompt": "Which statement about present perfect is correct?",
        "options": [
          "Use the present perfect for experience or a past action connected to now. Use the past simple instead when specifying a finished past time such as yesterday.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Use the present perfect for experience or a past action connected to now. Use the past simple instead when specifying a finished past time such as yesterday. have/has + past participle. Since + starting point; for + duration. Ever/never often describe experience.",
          "ar": "نستخدم المضارع التام للخبرة أو لحدث ماضٍ متصل بالحاضر. مع وقت ماضٍ منتهٍ مثل yesterday نستخدم الماضي البسيط. have/has مع التصريف الثالث. since لبداية الفترة وfor للمدة. ever/never شائعتان للخبرة."
        }
      }
    ]
  },
  {
    "id": "present-perfect-continuous",
    "level": "B1",
    "title": {
      "en": "Present perfect continuous",
      "ar": "المضارع التام المستمر"
    },
    "teaching": [
      {
        "en": "Use this form to emphasise duration or repeated activity from the past to now. It can also explain present evidence of a recent activity.",
        "ar": "نستخدم هذه الصيغة لتأكيد مدة نشاط بدأ في الماضي واستمر للحاضر أو تكرر. قد تفسر دليلًا حاضرًا لنشاط حديث."
      },
      {
        "en": "have/has been + verb-ing. Compare: I have written three pages (result); I have been writing for an hour (activity).",
        "ar": "have/has been مع ing. I have written three pages تركز على النتيجة وI have been writing for an hour على النشاط."
      },
      {
        "en": "Example: We have been waiting for twenty minutes.",
        "ar": "مثال: We have been waiting for twenty minutes."
      }
    ],
    "example": "We have been waiting for twenty minutes.",
    "questions": [
      {
        "prompt": "He has ___ studying all morning.",
        "options": [
          "been",
          "being",
          "be"
        ],
        "correct": 0,
        "explanation": {
          "en": "The perfect continuous needs has been + studying; been is the past participle of be.",
          "ar": "يحتاج التام المستمر has been مع studying؛ been هي التصريف الثالث للفعل be."
        }
      },
      {
        "prompt": "Which statement about present perfect continuous is correct?",
        "options": [
          "Use this form to emphasise duration or repeated activity from the past to now. It can also explain present evidence of a recent activity.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Use this form to emphasise duration or repeated activity from the past to now. It can also explain present evidence of a recent activity. have/has been + verb-ing. Compare: I have written three pages (result); I have been writing for an hour (activity).",
          "ar": "نستخدم هذه الصيغة لتأكيد مدة نشاط بدأ في الماضي واستمر للحاضر أو تكرر. قد تفسر دليلًا حاضرًا لنشاط حديث. have/has been مع ing. I have written three pages تركز على النتيجة وI have been writing for an hour على النشاط."
        }
      }
    ]
  },
  {
    "id": "past-perfect",
    "level": "B1",
    "title": {
      "en": "Past perfect",
      "ar": "الماضي التام"
    },
    "teaching": [
      {
        "en": "Use the past perfect to place an event before another past event. Do not use it for every event in a story; ordinary sequence usually uses past simple.",
        "ar": "نستخدم الماضي التام لحدث سبق حدثًا ماضيًا آخر. لا نستخدمه لكل أحداث القصة؛ يكفي الماضي البسيط للتتابع العادي."
      },
      {
        "en": "had + past participle for every subject. Already/before/by the time often clarify the order.",
        "ar": "had مع التصريف الثالث لجميع الضمائر. توضح already/before/by the time ترتيب الأحداث."
      },
      {
        "en": "Example: The bus had left before we arrived.",
        "ar": "مثال: The bus had left before we arrived."
      }
    ],
    "example": "The bus had left before we arrived.",
    "questions": [
      {
        "prompt": "When I arrived, the meeting had already ___.",
        "options": [
          "started",
          "start",
          "starting"
        ],
        "correct": 0,
        "explanation": {
          "en": "Had requires a past participle: started. The meeting began before the arrival.",
          "ar": "يتطلب had التصريف الثالث started. بدأ الاجتماع قبل الوصول."
        }
      },
      {
        "prompt": "Which statement about past perfect is correct?",
        "options": [
          "Use the past perfect to place an event before another past event. Do not use it for every event in a story; ordinary sequence usually uses past simple.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Use the past perfect to place an event before another past event. Do not use it for every event in a story; ordinary sequence usually uses past simple. had + past participle for every subject. Already/before/by the time often clarify the order.",
          "ar": "نستخدم الماضي التام لحدث سبق حدثًا ماضيًا آخر. لا نستخدمه لكل أحداث القصة؛ يكفي الماضي البسيط للتتابع العادي. had مع التصريف الثالث لجميع الضمائر. توضح already/before/by the time ترتيب الأحداث."
        }
      }
    ]
  },
  {
    "id": "modals-ability-advice-and-obligation",
    "level": "B1",
    "title": {
      "en": "Modals: ability, advice and obligation",
      "ar": "الأفعال الناقصة: القدرة والنصيحة والإلزام"
    },
    "teaching": [
      {
        "en": "Can expresses ability; should gives advice; must and have to express obligation. Mustn't means prohibition, while don't have to means no necessity.",
        "ar": "can للقدرة وshould للنصيحة وmust وhave to للإلزام. تعني mustn't المنع أما don't have to فتعني عدم الضرورة."
      },
      {
        "en": "Modal + base verb without to or -s. Have to behaves differently: she has to; does she have to? Could can soften a request.",
        "ar": "الفعل الناقص مع المصدر دون to أوs. يختلف have to: she has to وdoes she have to? تخفف could الطلب."
      },
      {
        "en": "Example: You should rest. You mustn't park here. You don't have to stay.",
        "ar": "مثال: You should rest. You mustn't park here. You don't have to stay."
      }
    ],
    "example": "You should rest. You mustn't park here. You don't have to stay.",
    "questions": [
      {
        "prompt": "You ___ smoke here; it is forbidden.",
        "options": [
          "mustn't",
          "don't have to",
          "might"
        ],
        "correct": 0,
        "explanation": {
          "en": "Forbidden means prohibited, so mustn't is correct. Don't have to would mean it is optional, not forbidden.",
          "ar": "forbidden تعني ممنوع، لذا نختار mustn't. تعني don't have to أن الأمر اختياري لا محظور."
        }
      },
      {
        "prompt": "Which statement about modals: ability, advice and obligation is correct?",
        "options": [
          "Can expresses ability; should gives advice; must and have to express obligation. Mustn't means prohibition, while don't have to means no necessity.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Can expresses ability; should gives advice; must and have to express obligation. Mustn't means prohibition, while don't have to means no necessity. Modal + base verb without to or -s. Have to behaves differently: she has to; does she have to? Could can soften a request.",
          "ar": "can للقدرة وshould للنصيحة وmust وhave to للإلزام. تعني mustn't المنع أما don't have to فتعني عدم الضرورة. الفعل الناقص مع المصدر دون to أوs. يختلف have to: she has to وdoes she have to? تخفف could الطلب."
        }
      }
    ]
  },
  {
    "id": "zero-and-first-conditionals",
    "level": "B1",
    "title": {
      "en": "Zero and first conditionals",
      "ar": "الشرط الصفري والأول"
    },
    "teaching": [
      {
        "en": "Use the zero conditional for general consequences and the first for a real possible future consequence. Do not normally put will in the if-clause.",
        "ar": "نستخدم الشرط الصفري للنتائج العامة والأول لنتيجة مستقبلية ممكنة. لا نضع will عادة في جملة if."
      },
      {
        "en": "Zero: if + present, present. First: if + present, will + base verb. Unless means if not.",
        "ar": "الصفري: if مع المضارع ثم مضارع. الأول: if مع المضارع ثم will والمصدر. unless تعني if not."
      },
      {
        "en": "Example: If water freezes, it becomes ice. If it rains tomorrow, we will stay home.",
        "ar": "مثال: If water freezes, it becomes ice. If it rains tomorrow, we will stay home."
      }
    ],
    "example": "If water freezes, it becomes ice. If it rains tomorrow, we will stay home.",
    "questions": [
      {
        "prompt": "If she ___ early tomorrow, we will start on time.",
        "options": [
          "arrives",
          "will arrive",
          "arrived"
        ],
        "correct": 0,
        "explanation": {
          "en": "A real future condition uses present simple in the if-clause; will belongs in the result clause.",
          "ar": "نستخدم المضارع البسيط في شرط المستقبل الممكن؛ تأتي will في جملة النتيجة."
        }
      },
      {
        "prompt": "Which statement about zero and first conditionals is correct?",
        "options": [
          "Use the zero conditional for general consequences and the first for a real possible future consequence. Do not normally put will in the if-clause.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Use the zero conditional for general consequences and the first for a real possible future consequence. Do not normally put will in the if-clause. Zero: if + present, present. First: if + present, will + base verb. Unless means if not.",
          "ar": "نستخدم الشرط الصفري للنتائج العامة والأول لنتيجة مستقبلية ممكنة. لا نضع will عادة في جملة if. الصفري: if مع المضارع ثم مضارع. الأول: if مع المضارع ثم will والمصدر. unless تعني if not."
        }
      }
    ]
  },
  {
    "id": "relative-clauses",
    "level": "B1",
    "title": {
      "en": "Relative clauses",
      "ar": "جمل الوصل"
    },
    "teaching": [
      {
        "en": "A defining relative clause identifies which person or thing you mean. Use who for people and which/that for things; the relative pronoun can be omitted only when it is the object.",
        "ar": "تحدد جملة الوصل التقييدية الشخص أو الشيء المقصود. who للأشخاص وwhich/that للأشياء. يمكن حذف ضمير الوصل عندما يكون مفعولًا فقط."
      },
      {
        "en": "The girl who lives next door; the book (that) I read. Do not repeat the same subject: the girl who she lives is incorrect.",
        "ar": "The girl who lives next door وthe book (that) I read. لا نكرر الفاعل؛ the girl who she lives خطأ."
      },
      {
        "en": "Example: The nurse who helped me was kind.",
        "ar": "مثال: The nurse who helped me was kind."
      }
    ],
    "example": "The nurse who helped me was kind.",
    "questions": [
      {
        "prompt": "The woman ___ works here is my aunt.",
        "options": [
          "who",
          "which",
          "where"
        ],
        "correct": 0,
        "explanation": {
          "en": "The antecedent is a person and the pronoun is the subject of works, so use who and do not omit it.",
          "ar": "المرجع شخص والضمير فاعل works، لذا نستخدم who ولا نحذفه."
        }
      },
      {
        "prompt": "Which statement about relative clauses is correct?",
        "options": [
          "A defining relative clause identifies which person or thing you mean. Use who for people and which/that for things; the relative pronoun can be omitted only when it is the object.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "A defining relative clause identifies which person or thing you mean. Use who for people and which/that for things; the relative pronoun can be omitted only when it is the object. The girl who lives next door; the book (that) I read. Do not repeat the same subject: the girl who she lives is incorrect.",
          "ar": "تحدد جملة الوصل التقييدية الشخص أو الشيء المقصود. who للأشخاص وwhich/that للأشياء. يمكن حذف ضمير الوصل عندما يكون مفعولًا فقط. The girl who lives next door وthe book (that) I read. لا نكرر الفاعل؛ the girl who she lives خطأ."
        }
      }
    ]
  },
  {
    "id": "gerunds-and-infinitives",
    "level": "B1",
    "title": {
      "en": "Gerunds and infinitives",
      "ar": "المصدر بصيغة ing والمصدر مع to"
    },
    "teaching": [
      {
        "en": "Some verbs take -ing and others take to + base verb. After a preposition, use -ing. Changing the pattern can change meaning with verbs such as stop.",
        "ar": "تتبع بعض الأفعال ing وأخرى to مع المصدر. بعد حرف الجر نستخدم ing. تغيير النمط قد يغير المعنى مع أفعال مثل stop."
      },
      {
        "en": "enjoy/avoid/finish + ing; want/plan/decide + to. Stop smoking means quit; stop to smoke means pause another activity.",
        "ar": "enjoy/avoid/finish مع ing وwant/plan/decide مع to. stop smoking تعني الإقلاع وstop to smoke تعني التوقف عن نشاط آخر للتدخين."
      },
      {
        "en": "Example: I enjoy reading. We decided to leave.",
        "ar": "مثال: I enjoy reading. We decided to leave."
      }
    ],
    "example": "I enjoy reading. We decided to leave.",
    "questions": [
      {
        "prompt": "She enjoys ___ in the pool.",
        "options": [
          "swimming",
          "to swim",
          "swim"
        ],
        "correct": 0,
        "explanation": {
          "en": "Enjoy takes the -ing form. Swimming also doubles the final consonant in this spelling pattern.",
          "ar": "يتبع enjoy فعل بصيغة ing. تضاعف m في كتابة swimming."
        }
      },
      {
        "prompt": "Which statement about gerunds and infinitives is correct?",
        "options": [
          "Some verbs take -ing and others take to + base verb. After a preposition, use -ing. Changing the pattern can change meaning with verbs such as stop.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Some verbs take -ing and others take to + base verb. After a preposition, use -ing. Changing the pattern can change meaning with verbs such as stop. enjoy/avoid/finish + ing; want/plan/decide + to. Stop smoking means quit; stop to smoke means pause another activity.",
          "ar": "تتبع بعض الأفعال ing وأخرى to مع المصدر. بعد حرف الجر نستخدم ing. تغيير النمط قد يغير المعنى مع أفعال مثل stop. enjoy/avoid/finish مع ing وwant/plan/decide مع to. stop smoking تعني الإقلاع وstop to smoke تعني التوقف عن نشاط آخر للتدخين."
        }
      }
    ]
  },
  {
    "id": "future-continuous",
    "level": "B2",
    "title": {
      "en": "Future continuous",
      "ar": "المستقبل المستمر"
    },
    "teaching": [
      {
        "en": "Use the future continuous for an action expected to be in progress at a specified future time. It may also ask politely about someone's expected plans.",
        "ar": "نستخدم المستقبل المستمر لحدث متوقع أن يكون جاريًا في وقت مستقبلي محدد. وقد نسأل به بلطف عن خطة متوقعة."
      },
      {
        "en": "will be + verb-ing; won't be + verb-ing. The time reference distinguishes it from a general future prediction.",
        "ar": "will be مع ing وللنفي won't be مع ing. يميز الوقت المحدد هذه الصيغة عن توقع مستقبلي عام."
      },
      {
        "en": "Example: At ten tomorrow, I will be travelling to London.",
        "ar": "مثال: At ten tomorrow, I will be travelling to London."
      }
    ],
    "example": "At ten tomorrow, I will be travelling to London.",
    "questions": [
      {
        "prompt": "At this time tomorrow, we will ___ flying over the sea.",
        "options": [
          "be",
          "been",
          "being"
        ],
        "correct": 0,
        "explanation": {
          "en": "Future continuous is will be + flying, not will been or will being.",
          "ar": "تركيب المستقبل المستمر will be مع flying، وليس will been أوwill being."
        }
      },
      {
        "prompt": "Which statement about future continuous is correct?",
        "options": [
          "Use the future continuous for an action expected to be in progress at a specified future time. It may also ask politely about someone's expected plans.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Use the future continuous for an action expected to be in progress at a specified future time. It may also ask politely about someone's expected plans. will be + verb-ing; won't be + verb-ing. The time reference distinguishes it from a general future prediction.",
          "ar": "نستخدم المستقبل المستمر لحدث متوقع أن يكون جاريًا في وقت مستقبلي محدد. وقد نسأل به بلطف عن خطة متوقعة. will be مع ing وللنفي won't be مع ing. يميز الوقت المحدد هذه الصيغة عن توقع مستقبلي عام."
        }
      }
    ]
  },
  {
    "id": "future-perfect",
    "level": "B2",
    "title": {
      "en": "Future perfect",
      "ar": "المستقبل التام"
    },
    "teaching": [
      {
        "en": "Use the future perfect for an action completed before a future deadline. By indicates no later than that point, whereas until emphasises continuation.",
        "ar": "نستخدم المستقبل التام لحدث سيكتمل قبل موعد مستقبلي. تشير by إلى موعد أقصى بينما تركز until على الاستمرار."
      },
      {
        "en": "will have + past participle. By Friday, I will have finished. In a time clause use present: by the time she arrives.",
        "ar": "will have مع التصريف الثالث. By Friday, I will have finished. نستخدم المضارع بعد by the time: she arrives."
      },
      {
        "en": "Example: By next June, they will have built the bridge.",
        "ar": "مثال: By next June, they will have built the bridge."
      }
    ],
    "example": "By next June, they will have built the bridge.",
    "questions": [
      {
        "prompt": "By Friday, she will have ___ the report.",
        "options": [
          "completed",
          "completing",
          "complete"
        ],
        "correct": 0,
        "explanation": {
          "en": "Have in a perfect structure requires the past participle completed; the deadline is Friday.",
          "ar": "يتطلب have في التركيب التام التصريف الثالث completed؛ الموعد النهائي الجمعة."
        }
      },
      {
        "prompt": "Which statement about future perfect is correct?",
        "options": [
          "Use the future perfect for an action completed before a future deadline. By indicates no later than that point, whereas until emphasises continuation.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Use the future perfect for an action completed before a future deadline. By indicates no later than that point, whereas until emphasises continuation. will have + past participle. By Friday, I will have finished. In a time clause use present: by the time she arrives.",
          "ar": "نستخدم المستقبل التام لحدث سيكتمل قبل موعد مستقبلي. تشير by إلى موعد أقصى بينما تركز until على الاستمرار. will have مع التصريف الثالث. By Friday, I will have finished. نستخدم المضارع بعد by the time: she arrives."
        }
      }
    ]
  },
  {
    "id": "past-perfect-continuous",
    "level": "B2",
    "title": {
      "en": "Past perfect continuous",
      "ar": "الماضي التام المستمر"
    },
    "teaching": [
      {
        "en": "Use this tense to emphasise how long an activity continued before a past moment, or to explain a past result such as tiredness.",
        "ar": "نستخدم الزمن لتأكيد مدة نشاط استمر قبل نقطة ماضية أو لتفسير نتيجة ماضية كالتعب."
      },
      {
        "en": "had been + verb-ing for every subject. Contrast a completed quantity with past perfect simple.",
        "ar": "had been مع ing لجميع الضمائر. عند التركيز على كمية مكتملة نستخدم الماضي التام البسيط."
      },
      {
        "en": "Example: She was tired because she had been running.",
        "ar": "مثال: She was tired because she had been running."
      }
    ],
    "example": "She was tired because she had been running.",
    "questions": [
      {
        "prompt": "Before the break, they had ___ working for three hours.",
        "options": [
          "been",
          "being",
          "be"
        ],
        "correct": 0,
        "explanation": {
          "en": "Had been working is the past perfect continuous; it places the ongoing activity before the break.",
          "ar": "had been working هو الماضي التام المستمر ويضع النشاط المستمر قبل الاستراحة."
        }
      },
      {
        "prompt": "Which statement about past perfect continuous is correct?",
        "options": [
          "Use this tense to emphasise how long an activity continued before a past moment, or to explain a past result such as tiredness.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Use this tense to emphasise how long an activity continued before a past moment, or to explain a past result such as tiredness. had been + verb-ing for every subject. Contrast a completed quantity with past perfect simple.",
          "ar": "نستخدم الزمن لتأكيد مدة نشاط استمر قبل نقطة ماضية أو لتفسير نتيجة ماضية كالتعب. had been مع ing لجميع الضمائر. عند التركيز على كمية مكتملة نستخدم الماضي التام البسيط."
        }
      }
    ]
  },
  {
    "id": "passive-voice",
    "level": "B2",
    "title": {
      "en": "Passive voice",
      "ar": "المبني للمجهول"
    },
    "teaching": [
      {
        "en": "Use the passive when the action or receiver matters more than the agent. Only verbs that take an object can normally form a passive.",
        "ar": "نستخدم المبني للمجهول عندما يهم الحدث أو متلقيه أكثر من الفاعل. لا يبنى للمجهول عادة إلا الفعل المتعدي."
      },
      {
        "en": "be in the required tense + past participle: is made, was made, has been made, will be made. Add by + agent only if useful.",
        "ar": "be بالزمن المناسب مع التصريف الثالث: is made وwas made وhas been made وwill be made. نضيف by والفاعل عند الحاجة."
      },
      {
        "en": "Example: The window was repaired yesterday. Someone repaired it.",
        "ar": "مثال: The window was repaired yesterday. Someone repaired it."
      }
    ],
    "example": "The window was repaired yesterday. Someone repaired it.",
    "questions": [
      {
        "prompt": "The letters were ___ yesterday.",
        "options": [
          "sent",
          "send",
          "sending"
        ],
        "correct": 0,
        "explanation": {
          "en": "Were marks past passive and needs the past participle sent; send is the base form.",
          "ar": "تدل were على المبني للمجهول في الماضي وتحتاج sent وهو التصريف الثالث، لا المصدر send."
        }
      },
      {
        "prompt": "Which statement about passive voice is correct?",
        "options": [
          "Use the passive when the action or receiver matters more than the agent. Only verbs that take an object can normally form a passive.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Use the passive when the action or receiver matters more than the agent. Only verbs that take an object can normally form a passive. be in the required tense + past participle: is made, was made, has been made, will be made. Add by + agent only if useful.",
          "ar": "نستخدم المبني للمجهول عندما يهم الحدث أو متلقيه أكثر من الفاعل. لا يبنى للمجهول عادة إلا الفعل المتعدي. be بالزمن المناسب مع التصريف الثالث: is made وwas made وhas been made وwill be made. نضيف by والفاعل عند الحاجة."
        }
      }
    ]
  },
  {
    "id": "reported-speech-and-questions",
    "level": "B2",
    "title": {
      "en": "Reported speech and questions",
      "ar": "الكلام والأسئلة المنقولة"
    },
    "teaching": [
      {
        "en": "Reported speech changes perspective: pronouns and time words must fit the new speaker and time. Backshift is common after a past reporting verb but is not compulsory for a still-true fact.",
        "ar": "يتغير منظور الكلام المنقول؛ نعدل الضمائر وكلمات الوقت بحسب المتحدث والوقت الجديد. الرجوع الزمني شائع بعد فعل نقل ماضٍ وليس إلزاميًا لحقيقة ما زالت صحيحة."
      },
      {
        "en": "She said (that) she was tired. Reported questions use statement order: he asked where I lived, not where did I live.",
        "ar": "She said (that) she was tired. للأسئلة المنقولة ترتيب خبري: he asked where I lived لاwhere did I live."
      },
      {
        "en": "Example: He asked whether I needed help.",
        "ar": "مثال: He asked whether I needed help."
      }
    ],
    "example": "He asked whether I needed help.",
    "questions": [
      {
        "prompt": "Which reports 'Where do you live?' correctly?",
        "options": [
          "She asked where I lived.",
          "She asked where did I live.",
          "She asked where lived I."
        ],
        "correct": 0,
        "explanation": {
          "en": "An indirect question has subject before verb and no do-support; lived is a normal backshift after asked.",
          "ar": "السؤال غير المباشر يرتب الفاعل قبل الفعل دون do؛ lived رجوع زمني طبيعي بعد asked."
        }
      },
      {
        "prompt": "Which statement about reported speech and questions is correct?",
        "options": [
          "Reported speech changes perspective: pronouns and time words must fit the new speaker and time. Backshift is common after a past reporting verb but is not compulsory for a still-true fact.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Reported speech changes perspective: pronouns and time words must fit the new speaker and time. Backshift is common after a past reporting verb but is not compulsory for a still-true fact. She said (that) she was tired. Reported questions use statement order: he asked where I lived, not where did I live.",
          "ar": "يتغير منظور الكلام المنقول؛ نعدل الضمائر وكلمات الوقت بحسب المتحدث والوقت الجديد. الرجوع الزمني شائع بعد فعل نقل ماضٍ وليس إلزاميًا لحقيقة ما زالت صحيحة. She said (that) she was tired. للأسئلة المنقولة ترتيب خبري: he asked where I lived لاwhere did I live."
        }
      }
    ]
  },
  {
    "id": "second-and-third-conditionals",
    "level": "B2",
    "title": {
      "en": "Second and third conditionals",
      "ar": "الشرط الثاني والثالث"
    },
    "teaching": [
      {
        "en": "The second conditional imagines an unreal present/future; the third imagines a different past. Past forms can express unreality rather than past time.",
        "ar": "يتخيل الشرط الثاني حاضرًا أو مستقبلًا غير واقعي والثالث ماضيًا مختلفًا. قد تدل صيغ الماضي على عدم الواقعية لا زمن الماضي."
      },
      {
        "en": "Second: if + past, would + base. Third: if + had + participle, would have + participle. If I were is usual in formal hypothetical language.",
        "ar": "الثاني: if وماضٍ ثم would والمصدر. الثالث: if وhad والتصريف الثالث ثم would have والتصريف الثالث. If I were شائع في الافتراض الرسمي."
      },
      {
        "en": "Example: If I had more time, I would learn music. If I had left earlier, I would have arrived on time.",
        "ar": "مثال: If I had more time, I would learn music. If I had left earlier, I would have arrived on time."
      }
    ],
    "example": "If I had more time, I would learn music. If I had left earlier, I would have arrived on time.",
    "questions": [
      {
        "prompt": "If I had known, I ___ have helped.",
        "options": [
          "would",
          "will",
          "am"
        ],
        "correct": 0,
        "explanation": {
          "en": "Had known creates an unreal past condition, so its result uses would have helped.",
          "ar": "had known شرط ماضٍ غير واقع، لذا تكون النتيجة would have helped."
        }
      },
      {
        "prompt": "Which statement about second and third conditionals is correct?",
        "options": [
          "The second conditional imagines an unreal present/future; the third imagines a different past. Past forms can express unreality rather than past time.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "The second conditional imagines an unreal present/future; the third imagines a different past. Past forms can express unreality rather than past time. Second: if + past, would + base. Third: if + had + participle, would have + participle. If I were is usual in formal hypothetical language.",
          "ar": "يتخيل الشرط الثاني حاضرًا أو مستقبلًا غير واقعي والثالث ماضيًا مختلفًا. قد تدل صيغ الماضي على عدم الواقعية لا زمن الماضي. الثاني: if وماضٍ ثم would والمصدر. الثالث: if وhad والتصريف الثالث ثم would have والتصريف الثالث. If I were شائع في الافتراض الرسمي."
        }
      }
    ]
  },
  {
    "id": "deduction-and-probability",
    "level": "B2",
    "title": {
      "en": "Deduction and probability",
      "ar": "الاستنتاج والاحتمال"
    },
    "teaching": [
      {
        "en": "Use must for a confident positive deduction and can't for a confident negative deduction. Might/could suggest possibility; they do not assert a fact.",
        "ar": "must لاستنتاج إيجابي قوي وcan't لاستنتاج سلبي قوي. might/could للاحتمال ولا تؤكدان حقيقة."
      },
      {
        "en": "must/might/could/can't + base verb for now. Must not is usually prohibition, not the ordinary opposite of deductive must.",
        "ar": "must/might/could/can't مع المصدر للحاضر. must not غالبًا للمنع وليست النفي المعتاد لـmust الاستنتاجية."
      },
      {
        "en": "Example: The lights are on; someone might be home. She can't be there: she is here.",
        "ar": "مثال: The lights are on; someone might be home. She can't be there: she is here."
      }
    ],
    "example": "The lights are on; someone might be home. She can't be there: she is here.",
    "questions": [
      {
        "prompt": "He is standing beside me, so he ___ be at home now.",
        "options": [
          "can't",
          "must",
          "should"
        ],
        "correct": 0,
        "explanation": {
          "en": "Direct evidence rules out his being at home, so can't expresses negative deduction.",
          "ar": "الدليل المباشر ينفي وجوده في المنزل، لذا تعبر can't عن استنتاج سلبي."
        }
      },
      {
        "prompt": "Which statement about deduction and probability is correct?",
        "options": [
          "Use must for a confident positive deduction and can't for a confident negative deduction. Might/could suggest possibility; they do not assert a fact.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Use must for a confident positive deduction and can't for a confident negative deduction. Might/could suggest possibility; they do not assert a fact. must/might/could/can't + base verb for now. Must not is usually prohibition, not the ordinary opposite of deductive must.",
          "ar": "must لاستنتاج إيجابي قوي وcan't لاستنتاج سلبي قوي. might/could للاحتمال ولا تؤكدان حقيقة. must/might/could/can't مع المصدر للحاضر. must not غالبًا للمنع وليست النفي المعتاد لـmust الاستنتاجية."
        }
      }
    ]
  },
  {
    "id": "concession-and-cause-clauses",
    "level": "B2",
    "title": {
      "en": "Concession and cause clauses",
      "ar": "جمل التنازل والسبب"
    },
    "teaching": [
      {
        "en": "Although introduces a clause; despite introduces a noun or -ing form. Because introduces a reason clause; because of takes a noun phrase.",
        "ar": "although تتبعها جملة وdespite يتبعها اسم أوing. because تتبعها جملة سبب وbecause of تركيب اسمي."
      },
      {
        "en": "Although it rained, we went out. Despite the rain, we went out. Avoid although ... but in one sentence.",
        "ar": "Although it rained, we went out وDespite the rain, we went out. نتجنب جمع although وbut في جملة واحدة."
      },
      {
        "en": "Example: Because the road was closed, we took a different route.",
        "ar": "مثال: Because the road was closed, we took a different route."
      }
    ],
    "example": "Because the road was closed, we took a different route.",
    "questions": [
      {
        "prompt": "___ the rain, the match continued.",
        "options": [
          "Despite",
          "Although",
          "Because"
        ],
        "correct": 0,
        "explanation": {
          "en": "The rain is a noun phrase, so despite is correct. Although and because need clauses here.",
          "ar": "the rain تركيب اسمي، لذا نستخدم despite. تحتاج although وbecause جملًا هنا."
        }
      },
      {
        "prompt": "Which statement about concession and cause clauses is correct?",
        "options": [
          "Although introduces a clause; despite introduces a noun or -ing form. Because introduces a reason clause; because of takes a noun phrase.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Although introduces a clause; despite introduces a noun or -ing form. Because introduces a reason clause; because of takes a noun phrase. Although it rained, we went out. Despite the rain, we went out. Avoid although ... but in one sentence.",
          "ar": "although تتبعها جملة وdespite يتبعها اسم أوing. because تتبعها جملة سبب وbecause of تركيب اسمي. Although it rained, we went out وDespite the rain, we went out. نتجنب جمع although وbut في جملة واحدة."
        }
      }
    ]
  },
  {
    "id": "future-perfect-continuous",
    "level": "C1",
    "title": {
      "en": "Future perfect continuous",
      "ar": "المستقبل التام المستمر"
    },
    "teaching": [
      {
        "en": "Use this tense to emphasise the duration of an activity continuing up to a future point. It highlights time spent rather than a completed count.",
        "ar": "نستخدم الزمن لتأكيد مدة نشاط يستمر حتى نقطة مستقبلية. يركز على الوقت المستغرق لا عدد النتائج المكتملة."
      },
      {
        "en": "will have been + verb-ing, usually with for + duration and a future reference. Avoid continuous forms with ordinary stative meanings.",
        "ar": "will have been مع ing، غالبًا مع for للمدة ومرجع مستقبلي. نتجنب الاستمرار مع المعاني الحالة المعتادة."
      },
      {
        "en": "Example: By July, I will have been teaching here for ten years.",
        "ar": "مثال: By July, I will have been teaching here for ten years."
      }
    ],
    "example": "By July, I will have been teaching here for ten years.",
    "questions": [
      {
        "prompt": "By noon, she will have been ___ for six hours.",
        "options": [
          "working",
          "worked",
          "work"
        ],
        "correct": 0,
        "explanation": {
          "en": "After will have been, the continuous form is working; for six hours emphasises duration.",
          "ar": "بعد will have been نستخدم working، وتؤكد for six hours المدة."
        }
      },
      {
        "prompt": "Which statement about future perfect continuous is correct?",
        "options": [
          "Use this tense to emphasise the duration of an activity continuing up to a future point. It highlights time spent rather than a completed count.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Use this tense to emphasise the duration of an activity continuing up to a future point. It highlights time spent rather than a completed count. will have been + verb-ing, usually with for + duration and a future reference. Avoid continuous forms with ordinary stative meanings.",
          "ar": "نستخدم الزمن لتأكيد مدة نشاط يستمر حتى نقطة مستقبلية. يركز على الوقت المستغرق لا عدد النتائج المكتملة. will have been مع ing، غالبًا مع for للمدة ومرجع مستقبلي. نتجنب الاستمرار مع المعاني الحالة المعتادة."
        }
      }
    ]
  },
  {
    "id": "mixed-conditionals",
    "level": "C1",
    "title": {
      "en": "Mixed conditionals",
      "ar": "الشرط المختلط"
    },
    "teaching": [
      {
        "en": "A mixed conditional links an unreal past cause to a present result, or an unreal present state to a past result. Select each tense from its own time reference.",
        "ar": "يربط الشرط المختلط سببًا ماضيًا غير واقع بنتيجة حاضرة أو حالة حاضرة غير واقعة بنتيجة ماضية. نختار زمن كل جزء بحسب مرجعه."
      },
      {
        "en": "Past-to-present: if + had + participle, would + base now. Present-to-past: if + past, would have + participle.",
        "ar": "من الماضي للحاضر: if مع had والتصريف الثالث ثم would والمصدر الآن. من الحاضر للماضي: if وماضٍ ثم would have والتصريف الثالث."
      },
      {
        "en": "Example: If I had accepted that job, I would live abroad now.",
        "ar": "مثال: If I had accepted that job, I would live abroad now."
      }
    ],
    "example": "If I had accepted that job, I would live abroad now.",
    "questions": [
      {
        "prompt": "If she had saved more, she ___ be financially secure now.",
        "options": [
          "would",
          "would have",
          "will have"
        ],
        "correct": 0,
        "explanation": {
          "en": "The condition is past but the result is now, so would be expresses a present unreal result.",
          "ar": "الشرط ماضٍ والنتيجة الآن، لذا تعبر would be عن نتيجة حاضرة غير واقعة."
        }
      },
      {
        "prompt": "Which statement about mixed conditionals is correct?",
        "options": [
          "A mixed conditional links an unreal past cause to a present result, or an unreal present state to a past result. Select each tense from its own time reference.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "A mixed conditional links an unreal past cause to a present result, or an unreal present state to a past result. Select each tense from its own time reference. Past-to-present: if + had + participle, would + base now. Present-to-past: if + past, would have + participle.",
          "ar": "يربط الشرط المختلط سببًا ماضيًا غير واقع بنتيجة حاضرة أو حالة حاضرة غير واقعة بنتيجة ماضية. نختار زمن كل جزء بحسب مرجعه. من الماضي للحاضر: if مع had والتصريف الثالث ثم would والمصدر الآن. من الحاضر للماضي: if وماضٍ ثم would have والتصريف الثالث."
        }
      }
    ]
  },
  {
    "id": "negative-inversion",
    "level": "C1",
    "title": {
      "en": "Negative inversion",
      "ar": "القلب بعد التعبيرات السلبية"
    },
    "teaching": [
      {
        "en": "Fronting a negative or restrictive adverbial for emphasis triggers subject-auxiliary inversion in formal English.",
        "ar": "تقديم تعبير سلبي أو تقييدي للتوكيد يستلزم قلب ترتيب الفاعل والفعل المساعد في الإنجليزية الرسمية."
      },
      {
        "en": "Never have I seen ...; Rarely does she complain; Not until ... did we ... . If no auxiliary exists, add do/does/did.",
        "ar": "Never have I seen وRarely does she complain وNot until ... did we. نضيف do/does/did إذا لم يوجد مساعد."
      },
      {
        "en": "Example: Rarely do we see such careful planning.",
        "ar": "مثال: Rarely do we see such careful planning."
      }
    ],
    "example": "Rarely do we see such careful planning.",
    "questions": [
      {
        "prompt": "Never ___ I seen such a view.",
        "options": [
          "have",
          "I have",
          "having"
        ],
        "correct": 0,
        "explanation": {
          "en": "After initial never, invert have and I: Never have I seen. The subject must not be repeated.",
          "ar": "بعد never في البداية نقلب have وI: Never have I seen. لا نكرر الفاعل."
        }
      },
      {
        "prompt": "Which statement about negative inversion is correct?",
        "options": [
          "Fronting a negative or restrictive adverbial for emphasis triggers subject-auxiliary inversion in formal English.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Fronting a negative or restrictive adverbial for emphasis triggers subject-auxiliary inversion in formal English. Never have I seen ...; Rarely does she complain; Not until ... did we ... . If no auxiliary exists, add do/does/did.",
          "ar": "تقديم تعبير سلبي أو تقييدي للتوكيد يستلزم قلب ترتيب الفاعل والفعل المساعد في الإنجليزية الرسمية. Never have I seen وRarely does she complain وNot until ... did we. نضيف do/does/did إذا لم يوجد مساعد."
        }
      }
    ]
  },
  {
    "id": "cleft-sentences",
    "level": "C1",
    "title": {
      "en": "Cleft sentences",
      "ar": "الجمل المشقوقة للتوكيد"
    },
    "teaching": [
      {
        "en": "Cleft sentences split a message to focus on one element. Keep the remaining information grammatically complete.",
        "ar": "تقسم الجملة المشقوقة الرسالة للتركيز على عنصر واحد. يجب أن يبقى باقي الكلام مكتملًا نحويًا."
      },
      {
        "en": "It was + focus + that/who + clause. What + clause + be + focus. It was Sara who called; what we need is time.",
        "ar": "It was ثم العنصر المؤكد ثم that/who وجملة. What ثم جملة ثم be والعنصر المؤكد."
      },
      {
        "en": "Example: It was the timetable that caused the problem.",
        "ar": "مثال: It was the timetable that caused the problem."
      }
    ],
    "example": "It was the timetable that caused the problem.",
    "questions": [
      {
        "prompt": "It was Sara ___ organised the event.",
        "options": [
          "who",
          "whose",
          "where"
        ],
        "correct": 0,
        "explanation": {
          "en": "Who introduces the clause describing the focused person Sara and serves as its subject.",
          "ar": "تقدم who الجملة المتعلقة بالشخص المؤكد Sara وتعمل فاعلًا لها."
        }
      },
      {
        "prompt": "Which statement about cleft sentences is correct?",
        "options": [
          "Cleft sentences split a message to focus on one element. Keep the remaining information grammatically complete.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Cleft sentences split a message to focus on one element. Keep the remaining information grammatically complete. It was + focus + that/who + clause. What + clause + be + focus. It was Sara who called; what we need is time.",
          "ar": "تقسم الجملة المشقوقة الرسالة للتركيز على عنصر واحد. يجب أن يبقى باقي الكلام مكتملًا نحويًا. It was ثم العنصر المؤكد ثم that/who وجملة. What ثم جملة ثم be والعنصر المؤكد."
        }
      }
    ]
  },
  {
    "id": "participle-clauses",
    "level": "C1",
    "title": {
      "en": "Participle clauses",
      "ar": "الجمل المختصرة باستخدام اسم الفاعل والمفعول"
    },
    "teaching": [
      {
        "en": "A participle clause condenses information, but its understood subject must match the main-clause subject. Otherwise it creates a dangling modifier.",
        "ar": "تختصر جملة اسم الفاعل أو المفعول المعلومات، لكن فاعلها الضمني يجب أن يطابق فاعل الجملة الرئيسية وإلا صار الوصف معلقًا."
      },
      {
        "en": "Walking home, I saw ... (same I). Having finished, she left (earlier action). Exhausted, they rested (passive/state).",
        "ar": "Walking home, I saw والفاعل I نفسه. Having finished, she left لحدث سابق. Exhausted, they rested لوصف حالة."
      },
      {
        "en": "Example: Having checked the figures, the analyst submitted the report.",
        "ar": "مثال: Having checked the figures, the analyst submitted the report."
      }
    ],
    "example": "Having checked the figures, the analyst submitted the report.",
    "questions": [
      {
        "prompt": "Which avoids a dangling modifier?",
        "options": [
          "Walking home, I noticed the rain.",
          "Walking home, the rain began.",
          "Walking home, the street was wet."
        ],
        "correct": 0,
        "explanation": {
          "en": "I can walk, so the opening clause correctly modifies I. Rain and street cannot be the implied walker.",
          "ar": "يمكن للفاعل I المشي، لذا تصفه الجملة الأولى صحيحًا. لا يصلح المطر أو الشارع فاعلًا ضمنيًا للمشي."
        }
      },
      {
        "prompt": "Which statement about participle clauses is correct?",
        "options": [
          "A participle clause condenses information, but its understood subject must match the main-clause subject. Otherwise it creates a dangling modifier.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "A participle clause condenses information, but its understood subject must match the main-clause subject. Otherwise it creates a dangling modifier. Walking home, I saw ... (same I). Having finished, she left (earlier action). Exhausted, they rested (passive/state).",
          "ar": "تختصر جملة اسم الفاعل أو المفعول المعلومات، لكن فاعلها الضمني يجب أن يطابق فاعل الجملة الرئيسية وإلا صار الوصف معلقًا. Walking home, I saw والفاعل I نفسه. Having finished, she left لحدث سابق. Exhausted, they rested لوصف حالة."
        }
      }
    ]
  },
  {
    "id": "hedging-and-qualified-claims",
    "level": "C1",
    "title": {
      "en": "Hedging and qualified claims",
      "ar": "التحفظ وتقييد الادعاءات"
    },
    "teaching": [
      {
        "en": "Academic claims often need qualification when evidence is limited. Hedges adjust certainty, scope or frequency; they must reflect the actual evidence rather than disguise unsupported claims.",
        "ar": "تحتاج الادعاءات الأكاديمية تقييدًا عندما يكون الدليل محدودًا. يعدل التحفظ اليقين أو النطاق أو التكرار ويجب أن يعكس الدليل الفعلي."
      },
      {
        "en": "may/might + base; tends to + base; appears to + base; in some cases; is likely to. Avoid contradictory combinations such as certainly might.",
        "ar": "may/might مع المصدر وtends to وappears to وin some cases وis likely to. نتجنب certainly might لتناقض اليقين والاحتمال."
      },
      {
        "en": "Example: The findings suggest that flexible hours may improve retention in some workplaces.",
        "ar": "مثال: The findings suggest that flexible hours may improve retention in some workplaces."
      }
    ],
    "example": "The findings suggest that flexible hours may improve retention in some workplaces.",
    "questions": [
      {
        "prompt": "Which matches evidence from a small, non-representative sample?",
        "options": [
          "The policy may help some workers.",
          "The policy always helps everyone.",
          "The policy proves all workers succeed."
        ],
        "correct": 0,
        "explanation": {
          "en": "May and some limit certainty and scope appropriately. Always/everyone/all exceed what a small sample can establish.",
          "ar": "تقيد may وsome اليقين والنطاق بشكل مناسب. تتجاوز always/everyone/all ما يمكن لعينة صغيرة إثباته."
        }
      },
      {
        "prompt": "Which statement about hedging and qualified claims is correct?",
        "options": [
          "Academic claims often need qualification when evidence is limited. Hedges adjust certainty, scope or frequency; they must reflect the actual evidence rather than disguise unsupported claims.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Academic claims often need qualification when evidence is limited. Hedges adjust certainty, scope or frequency; they must reflect the actual evidence rather than disguise unsupported claims. may/might + base; tends to + base; appears to + base; in some cases; is likely to. Avoid contradictory combinations such as certainly might.",
          "ar": "تحتاج الادعاءات الأكاديمية تقييدًا عندما يكون الدليل محدودًا. يعدل التحفظ اليقين أو النطاق أو التكرار ويجب أن يعكس الدليل الفعلي. may/might مع المصدر وtends to وappears to وin some cases وis likely to. نتجنب certainly might لتناقض اليقين والاحتمال."
        }
      }
    ]
  },
  {
    "id": "subjunctive-recommendations",
    "level": "C2",
    "title": {
      "en": "Subjunctive recommendations",
      "ar": "صيغة الافتراض في التوصيات"
    },
    "teaching": [
      {
        "en": "Formal recommendations may use the base verb in a that-clause regardless of subject. British English also commonly uses should + base verb.",
        "ar": "قد تستخدم التوصيات الرسمية مصدر الفعل في جملة that مهما كان الفاعل. تستخدم الإنجليزية البريطانية أيضًا should مع المصدر."
      },
      {
        "en": "recommend/insist/suggest that + subject + base verb; recommend that she be appointed. A recommendation differs from describing what she actually does.",
        "ar": "recommend/insist/suggest that ثم الفاعل ومصدر الفعل. recommend that she be appointed. نميز التوصية عن وصف عمل فعلي."
      },
      {
        "en": "Example: The committee recommends that each member attend.",
        "ar": "مثال: The committee recommends that each member attend."
      }
    ],
    "example": "The committee recommends that each member attend.",
    "questions": [
      {
        "prompt": "The board recommends that he ___ present.",
        "options": [
          "be",
          "is",
          "being"
        ],
        "correct": 0,
        "explanation": {
          "en": "The mandative subjunctive uses the base form be after this recommendation, even with he.",
          "ar": "تستخدم صيغة الطلب الافتراضية مصدر be بعد التوصية حتى مع he."
        }
      },
      {
        "prompt": "Which statement about subjunctive recommendations is correct?",
        "options": [
          "Formal recommendations may use the base verb in a that-clause regardless of subject. British English also commonly uses should + base verb.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Formal recommendations may use the base verb in a that-clause regardless of subject. British English also commonly uses should + base verb. recommend/insist/suggest that + subject + base verb; recommend that she be appointed. A recommendation differs from describing what she actually does.",
          "ar": "قد تستخدم التوصيات الرسمية مصدر الفعل في جملة that مهما كان الفاعل. تستخدم الإنجليزية البريطانية أيضًا should مع المصدر. recommend/insist/suggest that ثم الفاعل ومصدر الفعل. recommend that she be appointed. نميز التوصية عن وصف عمل فعلي."
        }
      }
    ]
  },
  {
    "id": "ellipsis-and-substitution",
    "level": "C2",
    "title": {
      "en": "Ellipsis and substitution",
      "ar": "الحذف والاستبدال"
    },
    "teaching": [
      {
        "en": "English omits recoverable material to avoid repetition, but the remaining auxiliary must preserve tense and polarity. So/neither can replace a repeated clause.",
        "ar": "تحذف الإنجليزية ما يمكن استنتاجه لتجنب التكرار، لكن المساعد الباقي يحفظ الزمن والإثبات أو النفي. قد تحل so/neither محل جملة مكررة."
      },
      {
        "en": "I can swim, and she can too. I like it; so do I. I haven't finished; neither have I. Do so can replace an action, not usually a state.",
        "ar": "I can swim, and she can too وI like it; so do I وI haven't finished; neither have I. تحل do so محل نشاط لا حالة عادة."
      },
      {
        "en": "Example: I have read it, and so has Lina.",
        "ar": "مثال: I have read it, and so has Lina."
      }
    ],
    "example": "I have read it, and so has Lina.",
    "questions": [
      {
        "prompt": "'I haven't been there.' 'Neither ___ I.'",
        "options": [
          "have",
          "do",
          "am"
        ],
        "correct": 0,
        "explanation": {
          "en": "Neither repeats a negative present-perfect statement, so keep the auxiliary have and invert it with I.",
          "ar": "تكرر neither جملة منفية بالمضارع التام، لذا نحافظ على have ونقلبه مع I."
        }
      },
      {
        "prompt": "Which statement about ellipsis and substitution is correct?",
        "options": [
          "English omits recoverable material to avoid repetition, but the remaining auxiliary must preserve tense and polarity. So/neither can replace a repeated clause.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "English omits recoverable material to avoid repetition, but the remaining auxiliary must preserve tense and polarity. So/neither can replace a repeated clause. I can swim, and she can too. I like it; so do I. I haven't finished; neither have I. Do so can replace an action, not usually a state.",
          "ar": "تحذف الإنجليزية ما يمكن استنتاجه لتجنب التكرار، لكن المساعد الباقي يحفظ الزمن والإثبات أو النفي. قد تحل so/neither محل جملة مكررة. I can swim, and she can too وI like it; so do I وI haven't finished; neither have I. تحل do so محل نشاط لا حالة عادة."
        }
      }
    ]
  },
  {
    "id": "advanced-relative-clauses",
    "level": "C2",
    "title": {
      "en": "Advanced relative clauses",
      "ar": "جمل الوصل المتقدمة"
    },
    "teaching": [
      {
        "en": "Non-defining relatives add supplementary information and use commas. Do not use that or omit the pronoun in them. Which can also refer to an entire preceding clause.",
        "ar": "تضيف جمل الوصل غير التقييدية معلومات إضافية وتفصل بفواصل. لا نستخدم that ولا نحذف الضمير فيها. قد تشير which إلى جملة سابقة كاملة."
      },
      {
        "en": "My sister, who lives abroad, ...; the proposal, some of whose details ...; he resigned, which surprised us. After a fronted preposition use whom/which, not that.",
        "ar": "My sister, who lives abroad وthe proposal, some of whose details وhe resigned, which surprised us. بعد حرف جر مقدم نستخدم whom/which لاthat."
      },
      {
        "en": "Example: The bridge, which opened last year, is already busy.",
        "ar": "مثال: The bridge, which opened last year, is already busy."
      }
    ],
    "example": "The bridge, which opened last year, is already busy.",
    "questions": [
      {
        "prompt": "The plan, ___ was approved yesterday, is controversial.",
        "options": [
          "which",
          "that",
          "what"
        ],
        "correct": 0,
        "explanation": {
          "en": "Commas mark a supplementary relative clause about a thing, so which is required; that is not used here.",
          "ar": "تشير الفواصل لجملة وصل إضافية عن شيء، لذا نستخدم which لاthat."
        }
      },
      {
        "prompt": "Which statement about advanced relative clauses is correct?",
        "options": [
          "Non-defining relatives add supplementary information and use commas. Do not use that or omit the pronoun in them. Which can also refer to an entire preceding clause.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Non-defining relatives add supplementary information and use commas. Do not use that or omit the pronoun in them. Which can also refer to an entire preceding clause. My sister, who lives abroad, ...; the proposal, some of whose details ...; he resigned, which surprised us. After a fronted preposition use whom/which, not that.",
          "ar": "تضيف جمل الوصل غير التقييدية معلومات إضافية وتفصل بفواصل. لا نستخدم that ولا نحذف الضمير فيها. قد تشير which إلى جملة سابقة كاملة. My sister, who lives abroad وthe proposal, some of whose details وhe resigned, which surprised us. بعد حرف جر مقدم نستخدم whom/which لاthat."
        }
      }
    ]
  },
  {
    "id": "fronting-and-information-structure",
    "level": "C2",
    "title": {
      "en": "Fronting and information structure",
      "ar": "التقديم وتنظيم المعلومات"
    },
    "teaching": [
      {
        "en": "Fronting an object or complement can contrast it with earlier information. Unlike negative fronting, ordinary object fronting does not automatically invert subject and auxiliary.",
        "ar": "يمكن تقديم مفعول أو مكمل لمقارنته بمعلومات سابقة. بخلاف تقديم السلب، لا يؤدي تقديم المفعول العادي تلقائيًا إلى قلب الفاعل والمساعد."
      },
      {
        "en": "That proposal, I support. This problem, we can solve. Only after ... did we ... requires inversion because of the restrictive adverbial.",
        "ar": "That proposal, I support وThis problem, we can solve. لكن Only after ... did we ... يحتاج قلبًا بسبب التعبير التقييدي."
      },
      {
        "en": "Example: The first option I rejected; the second I accepted.",
        "ar": "مثال: The first option I rejected; the second I accepted."
      }
    ],
    "example": "The first option I rejected; the second I accepted.",
    "questions": [
      {
        "prompt": "Which correctly fronts the object without unnecessary inversion?",
        "options": [
          "That argument, I can accept.",
          "That argument, can I accept.",
          "That argument, I accept can."
        ],
        "correct": 0,
        "explanation": {
          "en": "Ordinary object fronting retains I can accept. Can I accept would normally signal a question, not this statement.",
          "ar": "يحافظ تقديم المفعول العادي على I can accept. يوحي can I accept بسؤال لا الجملة الخبرية المطلوبة."
        }
      },
      {
        "prompt": "Which statement about fronting and information structure is correct?",
        "options": [
          "Fronting an object or complement can contrast it with earlier information. Unlike negative fronting, ordinary object fronting does not automatically invert subject and auxiliary.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Fronting an object or complement can contrast it with earlier information. Unlike negative fronting, ordinary object fronting does not automatically invert subject and auxiliary. That proposal, I support. This problem, we can solve. Only after ... did we ... requires inversion because of the restrictive adverbial.",
          "ar": "يمكن تقديم مفعول أو مكمل لمقارنته بمعلومات سابقة. بخلاف تقديم السلب، لا يؤدي تقديم المفعول العادي تلقائيًا إلى قلب الفاعل والمساعد. That proposal, I support وThis problem, we can solve. لكن Only after ... did we ... يحتاج قلبًا بسبب التعبير التقييدي."
        }
      }
    ]
  },
  {
    "id": "nominalisation-and-clarity",
    "level": "C2",
    "title": {
      "en": "Nominalisation and clarity",
      "ar": "تحويل الأفعال إلى أسماء والوضوح"
    },
    "teaching": [
      {
        "en": "Nominalisation can make academic writing compact and connect ideas, but excessive abstract nouns can hide agency. Preserve the intended cause, actor and time.",
        "ar": "يمكن تحويل الأفعال لأسماء لتكثيف الكتابة الأكاديمية وربط الأفكار، لكن الإفراط قد يخفي المسؤول. نحافظ على السبب والفاعل والزمن."
      },
      {
        "en": "The company reduced waste → the company's reduction of waste. A noun may need a determiner and a preposition; avoid unexplained strings of nouns.",
        "ar": "The company reduced waste تصبح the company's reduction of waste. قد يحتاج الاسم محددًا وحرف جر؛ نتجنب سلاسل الأسماء الغامضة."
      },
      {
        "en": "Example: The council's rejection of the proposal delayed construction.",
        "ar": "مثال: The council's rejection of the proposal delayed construction."
      }
    ],
    "example": "The council's rejection of the proposal delayed construction.",
    "questions": [
      {
        "prompt": "Which nominalisation preserves who rejected the proposal?",
        "options": [
          "The council's rejection of the proposal",
          "The proposal's rejection of the council",
          "The rejection"
        ],
        "correct": 0,
        "explanation": {
          "en": "Council's identifies the rejecting agent and of the proposal identifies the object. Reversing them changes the meaning.",
          "ar": "تحدد council's الفاعل الرافض وof the proposal الشيء المرفوض. قلبهما يغير المعنى."
        }
      },
      {
        "prompt": "Which statement about nominalisation and clarity is correct?",
        "options": [
          "Nominalisation can make academic writing compact and connect ideas, but excessive abstract nouns can hide agency. Preserve the intended cause, actor and time.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Nominalisation can make academic writing compact and connect ideas, but excessive abstract nouns can hide agency. Preserve the intended cause, actor and time. The company reduced waste → the company's reduction of waste. A noun may need a determiner and a preposition; avoid unexplained strings of nouns.",
          "ar": "يمكن تحويل الأفعال لأسماء لتكثيف الكتابة الأكاديمية وربط الأفكار، لكن الإفراط قد يخفي المسؤول. نحافظ على السبب والفاعل والزمن. The company reduced waste تصبح the company's reduction of waste. قد يحتاج الاسم محددًا وحرف جر؛ نتجنب سلاسل الأسماء الغامضة."
        }
      }
    ]
  },
  {
    "id": "perfect-modals-and-unrealised-actions",
    "level": "C2",
    "title": {
      "en": "Perfect modals and unrealised actions",
      "ar": "الأفعال الناقصة التامة والأفعال غير المتحققة"
    },
    "teaching": [
      {
        "en": "Modal + have + participle refers to past deduction, possibility or criticism. Needn't have done means the action happened unnecessarily; didn't need to do does not by itself establish that it happened.",
        "ar": "تشير صيغة الفعل الناقص مع have والتصريف الثالث لاستنتاج أو احتمال أو نقد ماضٍ. needn't have done تعني وقوع فعل غير ضروري، أما didn't need to do فلا تثبت وحدها وقوعه."
      },
      {
        "en": "must have left (deduction); might have left (possibility); should have left (criticism/regret); needn't have left (unnecessary completed action).",
        "ar": "must have left للاستنتاج وmight have left للاحتمال وshould have left للنقد أو الندم وneedn't have left لفعل وقع دون ضرورة."
      },
      {
        "en": "Example: You needn't have bought milk; we already had some.",
        "ar": "مثال: You needn't have bought milk; we already had some."
      }
    ],
    "example": "You needn't have bought milk; we already had some.",
    "questions": [
      {
        "prompt": "Which clearly means the purchase happened but was unnecessary?",
        "options": [
          "You needn't have bought it.",
          "You didn't need to buy it.",
          "You mustn't buy it."
        ],
        "correct": 0,
        "explanation": {
          "en": "Needn't have bought explicitly refers to an unnecessary past purchase. Didn't need to states absence of necessity without confirming the action.",
          "ar": "تؤكد needn't have bought وقوع شراء ماضٍ غير ضروري. لا تؤكد didn't need to وقوع الفعل بل تنفي ضرورته."
        }
      },
      {
        "prompt": "Which statement about perfect modals and unrealised actions is correct?",
        "options": [
          "Modal + have + participle refers to past deduction, possibility or criticism. Needn't have done means the action happened unnecessarily; didn't need to do does not by itself establish that it happened.",
          "This rule never changes meaning or sentence structure.",
          "Every English verb uses exactly the same form in all contexts."
        ],
        "correct": 0,
        "explanation": {
          "en": "Modal + have + participle refers to past deduction, possibility or criticism. Needn't have done means the action happened unnecessarily; didn't need to do does not by itself establish that it happened. must have left (deduction); might have left (possibility); should have left (criticism/regret); needn't have left (unnecessary completed action).",
          "ar": "تشير صيغة الفعل الناقص مع have والتصريف الثالث لاستنتاج أو احتمال أو نقد ماضٍ. needn't have done تعني وقوع فعل غير ضروري، أما didn't need to do فلا تثبت وحدها وقوعه. must have left للاستنتاج وmight have left للاحتمال وshould have left للنقد أو الندم وneedn't have left لفعل وقع دون ضرورة."
        }
      }
    ]
  }
];
