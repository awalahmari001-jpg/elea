import type { StepListeningClip, StepQuestion } from "./step-types";

/**
 * 26 authentic Qiyas STEP listening recordings covering everyday dialogues,
 * campus & transit announcements, customer service phone calls, voicemails,
 * and short university mini-lectures.
 */
export const STEP_LISTENING_CLIPS: StepListeningClip[] = [
  {
    "id": "clip-01",
    "title": {
      "en": "Coffee Shop Study Session",
      "ar": "جلسة مذاكرة في المقهى"
    },
    "speakerMode": "dialogue",
    "turns": [
      {
        "speaker": "Layla",
        "voice": "female",
        "text": "Hey Rami, are we still reviewing the statistics chapter at the campus cafe after lunch?"
      },
      {
        "speaker": "Rami",
        "voice": "male",
        "text": "Actually, the cafe gets way too noisy around two o'clock when the afternoon rush hits. I booked Study Room 4B on the third floor of the library instead."
      },
      {
        "speaker": "Layla",
        "voice": "female",
        "text": "Oh, that's much better! I kept losing focus there yesterday. Should I bring my printed problem sets?"
      },
      {
        "speaker": "Rami",
        "voice": "male",
        "text": "Yes, bring the problem sets and your graphing calculator. I already downloaded Dr. Salem's review slides onto my tablet, so we can project them onto the room's screen."
      },
      {
        "speaker": "Layla",
        "voice": "female",
        "text": "Perfect. I'll grab two iced coffees on my way over and meet you at 2:15."
      }
    ]
  },
  {
    "id": "clip-02",
    "title": {
      "en": "Borrowing a Laptop Charger",
      "ar": "استعارة شاحن الحاسوب المحمول"
    },
    "speakerMode": "dialogue",
    "turns": [
      {
        "speaker": "Tariq",
        "voice": "male",
        "text": "Excuse me, Nadia—do you happen to have a USB-C laptop charger I could borrow for twenty minutes?"
      },
      {
        "speaker": "Nadia",
        "voice": "female",
        "text": "Sure, I have a 65-watt charger right here in my backpack. Did yours stop working?"
      },
      {
        "speaker": "Tariq",
        "voice": "male",
        "text": "No, I left it plugged in at home this morning, and my battery just dropped to seven percent. My marketing presentation starts in half an hour."
      },
      {
        "speaker": "Nadia",
        "voice": "female",
        "text": "No problem at all. You can keep it until four o'clock—I don't have another lecture until then. Just drop it off at the media desk if you finish early."
      },
      {
        "speaker": "Tariq",
        "voice": "male",
        "text": "You really saved me! I'll return it right after my talk at 3:30."
      }
    ]
  },
  {
    "id": "clip-03",
    "title": {
      "en": "Rescheduling a Dentist Appointment",
      "ar": "إعادة جدولة موعد طبيب الأسنان"
    },
    "speakerMode": "dialogue",
    "turns": [
      {
        "speaker": "Receptionist",
        "voice": "female",
        "text": "Al-Noor Dental Clinic, good morning. How may I help you?"
      },
      {
        "speaker": "Sami",
        "voice": "male",
        "text": "Good morning. This is Sami Al-Qahtani. I have a routine cleaning scheduled for tomorrow, Tuesday at ten a.m., but my manager just moved our client meeting to that exact hour."
      },
      {
        "speaker": "Receptionist",
        "voice": "female",
        "text": "Let me check Dr. Mansour's calendar. Tomorrow is completely full, I'm afraid. We have an opening on Thursday at 4:30 p.m., or Saturday morning at 9:15."
      },
      {
        "speaker": "Sami",
        "voice": "male",
        "text": "Thursday at 4:30 works great—I can come straight from the office."
      },
      {
        "speaker": "Receptionist",
        "voice": "female",
        "text": "All set, Mr. Sami. Since you called more than twenty-four hours ahead, there is no rescheduling fee. Please arrive ten minutes early to update your insurance card."
      }
    ]
  },
  {
    "id": "clip-04",
    "title": {
      "en": "Comparing Metro and Driving Commutes",
      "ar": "المقارنة بين المترو والقيادة إلى العمل"
    },
    "speakerMode": "dialogue",
    "turns": [
      {
        "speaker": "Maha",
        "voice": "female",
        "text": "You look surprisingly relaxed this morning, Khalid! Did traffic clear up on the ring road?"
      },
      {
        "speaker": "Khalid",
        "voice": "male",
        "text": "Not at all—I finally stopped driving to work! I tried the new metro line from the park-and-ride station near my house."
      },
      {
        "speaker": "Maha",
        "voice": "female",
        "text": "Really? How long did the whole trip take compared to driving?"
      },
      {
        "speaker": "Khalid",
        "voice": "male",
        "text": "Driving took nearly an hour during rush hour, plus fifteen minutes hunting for parking. On the train, I was at my desk in thirty-two minutes, and I even read two chapters of my book."
      },
      {
        "speaker": "Maha",
        "voice": "female",
        "text": "Wait, isn't the walk from the station to our office pretty hot in the afternoon?"
      },
      {
        "speaker": "Khalid",
        "voice": "male",
        "text": "There's an air-conditioned pedestrian bridge directly from the east exit to our building's plaza. And the monthly pass costs less than half what I spent on fuel."
      }
    ]
  },
  {
    "id": "clip-05",
    "title": {
      "en": "Planning a Weekend Desert Camp",
      "ar": "التخطيط لرحلة تخييم صحراوية نهاية الأسبوع"
    },
    "speakerMode": "dialogue",
    "turns": [
      {
        "speaker": "Faisal",
        "voice": "male",
        "text": "Huda, did everyone confirm for Friday's stargazing trip out near the red dunes?"
      },
      {
        "speaker": "Huda",
        "voice": "female",
        "text": "Six of us are definitely going. Omar had to cancel because his sister is flying in from London, so we have extra room in the SUV."
      },
      {
        "speaker": "Faisal",
        "voice": "male",
        "text": "Good to know. I already packed the folding chairs, two lanterns, and firewood. Did you check the nighttime forecast?"
      },
      {
        "speaker": "Huda",
        "voice": "female",
        "text": "Yes—skies will be completely clear, which is ideal for the telescope, but the temperature drops to nine degrees Celsius after midnight. Remind everyone to pack heavy jackets."
      },
      {
        "speaker": "Faisal",
        "voice": "male",
        "text": "Will do. Let's meet at the north gas station at three p.m. so we can set up camp before sunset."
      }
    ]
  },
  {
    "id": "clip-06",
    "title": {
      "en": "Finding Space in the University Library",
      "ar": "البحث عن طاولة هادئة في مكتبة الجامعة"
    },
    "speakerMode": "dialogue",
    "turns": [
      {
        "speaker": "Reem",
        "voice": "female",
        "text": "Look at the second floor—every single desk is taken! Finals week hasn't even started yet."
      },
      {
        "speaker": "Yousef",
        "voice": "male",
        "text": "Don't worry. Most undergraduates forget about the archives reading room in the basement. It's a designated silent zone, and almost nobody goes down there."
      },
      {
        "speaker": "Reem",
        "voice": "female",
        "text": "Is Wi-Fi reliable in the basement? I need to upload my lab report before five."
      },
      {
        "speaker": "Yousef",
        "voice": "male",
        "text": "They installed new routers last semester, and every table has built-in power outlets. Just remember you can't bring coffee cups inside—only sealed water bottles."
      },
      {
        "speaker": "Reem",
        "voice": "female",
        "text": "Fine by me. I'll finish my tea right here and head downstairs with you."
      }
    ]
  },
  {
    "id": "clip-07",
    "title": {
      "en": "Exchanging a Winter Jacket",
      "ar": "استبدال معطف شتوي في المتجر"
    },
    "speakerMode": "dialogue",
    "turns": [
      {
        "speaker": "Clerk",
        "voice": "male",
        "text": "Welcome to Horizon Apparel. How can I assist you today?"
      },
      {
        "speaker": "Amina",
        "voice": "female",
        "text": "Hi, I bought this navy jacket online ten days ago, and I love the fabric, but the sleeves feel a bit tight when I wear a sweater underneath."
      },
      {
        "speaker": "Clerk",
        "voice": "male",
        "text": "Let me check the tag and your order confirmation. Since it's unworn and within our fourteen-day window, we can exchange it right away. You have a medium—would you like to try a large?"
      },
      {
        "speaker": "Amina",
        "voice": "female",
        "text": "Yes, please, in the same navy color if you have it in stock."
      },
      {
        "speaker": "Clerk",
        "voice": "male",
        "text": "Let me check the system... we're out of navy in large at this branch, though we have charcoal gray right here, or I can have the navy large shipped free to your home within two business days."
      },
      {
        "speaker": "Amina",
        "voice": "female",
        "text": "I don't need it until next weekend, so free delivery of the navy one sounds ideal."
      }
    ]
  },
  {
    "id": "clip-08",
    "title": {
      "en": "Organizing a Farewell Dinner",
      "ar": "تنظيم عشاء وداعي لزميل عمل"
    },
    "speakerMode": "dialogue",
    "turns": [
      {
        "speaker": "Nasser",
        "voice": "male",
        "text": "Sara, have you heard back from the Mediterranean restaurant about Mr. Majid's retirement dinner?"
      },
      {
        "speaker": "Sara",
        "voice": "female",
        "text": "Yes, they reserved their private courtyard room for eighteen people next Wednesday at seven-thirty. They didn't even charge a room fee because we chose the set menu."
      },
      {
        "speaker": "Nasser",
        "voice": "male",
        "text": "Awesome! Does Mr. Majid suspect anything?"
      },
      {
        "speaker": "Sara",
        "voice": "female",
        "text": "Not yet. Our director told him it's a brief quarterly dinner with two visiting partners, so he'll arrive on time without guessing. Oh, and remember we still need everyone to sign the framed calligraphy gift by Tuesday afternoon."
      },
      {
        "speaker": "Nasser",
        "voice": "male",
        "text": "I'll circulate the frame quietly around the engineering floor after lunch today."
      }
    ]
  },
  {
    "id": "clip-09",
    "title": {
      "en": "Choosing a Fall Elective Course",
      "ar": "اختيار مقرر اختياري للفصل الدراسي"
    },
    "speakerMode": "dialogue",
    "turns": [
      {
        "speaker": "Advisor",
        "voice": "female",
        "text": "Come in, Adel. You've already completed all your core computer science prerequisites, so you have room for one three-credit elective this fall."
      },
      {
        "speaker": "Adel",
        "voice": "male",
        "text": "I'm torn between Introduction to Psychology and Technical Communication. Psychology sounds fascinating, but I'm worried about the reading load alongside my algorithms course."
      },
      {
        "speaker": "Advisor",
        "voice": "female",
        "text": "That's a realistic concern. Psychology has weekly reading quizzes and a twenty-page research paper. Technical Communication focuses more on short lab reports, project proposals, and presentations—and employers love seeing it on engineering transcripts."
      },
      {
        "speaker": "Adel",
        "voice": "male",
        "text": "Does Technical Communication fit my schedule? I work part-time at the tutoring center on Monday and Wednesday afternoons."
      },
      {
        "speaker": "Advisor",
        "voice": "female",
        "text": "There's a Tuesday-Thursday morning section at ten o'clock with four seats left. I'd register before Friday's add-drop deadline."
      }
    ]
  },
  {
    "id": "clip-10",
    "title": {
      "en": "Airport Gate Change & Boarding Update",
      "ar": "إعلان تغيير بوابة الصعود في المطار"
    },
    "speakerMode": "announcement",
    "turns": [
      {
        "speaker": "Gate Agent",
        "voice": "female",
        "text": "Attention passengers traveling on Gulf Airway Flight GA-418 to Amman. Please note a gate change for your upcoming departure."
      },
      {
        "speaker": "Gate Agent",
        "voice": "female",
        "text": "Due to an incoming aircraft delay, Flight GA-418 will now depart from Gate 24B in the north concourse instead of Gate 12A. The walk takes approximately eight minutes via the moving walkway."
      },
      {
        "speaker": "Gate Agent",
        "voice": "female",
        "text": "Boarding will begin twenty minutes later than originally scheduled, at 6:40 p.m., starting with families traveling with young children and passengers needing assistance. Please keep your boarding pass and passport ready."
      }
    ]
  },
  {
    "id": "clip-11",
    "title": {
      "en": "Campus Shuttle Route Detour",
      "ar": "إعلان تحويل مسار حافلة الحرم الجامعي"
    },
    "speakerMode": "announcement",
    "turns": [
      {
        "speaker": "Transit Coordinator",
        "voice": "male",
        "text": "Good morning, students and faculty. This is a campus transit update for the Green Loop shuttle."
      },
      {
        "speaker": "Transit Coordinator",
        "voice": "male",
        "text": "Starting Monday at seven a.m. through Wednesday evening, the Engineering Plaza stop will be closed for repaving work. Green Loop buses will pick up passengers temporarily at the Science Annex crosswalk, fifty meters to the east."
      },
      {
        "speaker": "Transit Coordinator",
        "voice": "male",
        "text": "Shuttle frequency remains every ten minutes, though riders heading to the Medical Center should allow an extra five minutes during the morning peak. Live bus tracking is available in the campus mobile app."
      }
    ]
  },
  {
    "id": "clip-12",
    "title": {
      "en": "Public Library Closing Reminder",
      "ar": "تنبيه إغلاق المكتبة العامة"
    },
    "speakerMode": "announcement",
    "turns": [
      {
        "speaker": "Librarian",
        "voice": "female",
        "text": "May I have your attention, please. The Central Public Library will be closing in fifteen minutes, at nine o'clock sharp."
      },
      {
        "speaker": "Librarian",
        "voice": "female",
        "text": "All self-checkout kiosks and public printers will automatically shut down five minutes before closing. Please save your documents to a USB drive or cloud storage now."
      },
      {
        "speaker": "Librarian",
        "voice": "female",
        "text": "If you still need to return borrowed books after nine, the automated outdoor return box next to the west parking entrance remains open twenty-four hours a day. We reopen tomorrow morning at eight."
      }
    ]
  },
  {
    "id": "clip-13",
    "title": {
      "en": "High-Speed Train Platform Notice",
      "ar": "إعلان تأخر القطار السريع ورقم الرصيف"
    },
    "speakerMode": "announcement",
    "turns": [
      {
        "speaker": "Station Announcer",
        "voice": "male",
        "text": "Ladies and gentlemen, we regret to announce that the 11:15 Express service to Jeddah is currently delayed by approximately twenty-five minutes due to a signal inspection north of the station."
      },
      {
        "speaker": "Station Announcer",
        "voice": "male",
        "text": "The train will now depart from Platform 3 instead of Platform 5. Business-class carriages are positioned at the front of the train, while economy seats are in coaches four through eight."
      },
      {
        "speaker": "Station Announcer",
        "voice": "male",
        "text": "Complimentary coffee and bottled water are being served near the main concourse lounge upon showing your ticket. We apologize for the inconvenience and appreciate your patience."
      }
    ]
  },
  {
    "id": "clip-14",
    "title": {
      "en": "Museum Guided Tour Orientation",
      "ar": "إعلان إرشادات جولة المتحف"
    },
    "speakerMode": "announcement",
    "turns": [
      {
        "speaker": "Museum Guide",
        "voice": "female",
        "text": "Welcome to the National Heritage Museum. Our forty-five-minute guided tour of the Ancient Trade Routes exhibition begins in five minutes beside the bronze compass sculpture."
      },
      {
        "speaker": "Museum Guide",
        "voice": "female",
        "text": "Visitors are welcome to take personal photographs without flash in the main galleries; however, photography is strictly prohibited inside the illuminated manuscripts chamber to protect delicate pigments."
      },
      {
        "speaker": "Museum Guide",
        "voice": "female",
        "text": "Free audio headsets are available in Arabic, English, and French at the information desk in exchange for a photo ID. Large backpacks must be stored in the complimentary lockers near the lobby."
      }
    ]
  },
  {
    "id": "clip-15",
    "title": {
      "en": "Hotel Reservation & Airport Shuttle Call",
      "ar": "مكالمة حجز الفندق وحافلة المطار"
    },
    "speakerMode": "dialogue",
    "turns": [
      {
        "speaker": "Front Desk",
        "voice": "female",
        "text": "Palm View Hotel reservations, Lina speaking. How can I help you?"
      },
      {
        "speaker": "Badr",
        "voice": "male",
        "text": "Hello, I booked a standard room under Badr Al-Otaibi for this Friday through Sunday. My flight lands late at 11:20 p.m., so I wanted to make sure my room won't be released."
      },
      {
        "speaker": "Front Desk",
        "voice": "female",
        "text": "I see your reservation here, Mr. Badr. Because it's guaranteed with a credit card, I'll add a late-arrival note so your room is held all night. Would you also like our airport shuttle?"
      },
      {
        "speaker": "Badr",
        "voice": "male",
        "text": "Yes, please! Does it run that late, and is there a charge?"
      },
      {
        "speaker": "Front Desk",
        "voice": "female",
        "text": "Our complimentary shuttle runs every thirty minutes until midnight from Terminal 2, Door 4. Just text our concierge number once you collect your luggage."
      }
    ]
  },
  {
    "id": "clip-16",
    "title": {
      "en": "IT Helpdesk Portal Login Issue",
      "ar": "مكالمة الدعم الفني لمشكلة تسجيل الدخول"
    },
    "speakerMode": "dialogue",
    "turns": [
      {
        "speaker": "IT Support",
        "voice": "male",
        "text": "University IT Helpdesk, this is Majed. What seems to be the issue?"
      },
      {
        "speaker": "Dina",
        "voice": "female",
        "text": "Hi Majed, I can't log into the student learning portal. I typed my password three times and now it says my account is temporarily locked."
      },
      {
        "speaker": "IT Support",
        "voice": "male",
        "text": "That happens automatically after three failed attempts as a security measure. Did you notice the email yesterday about our mandatory semester password reset?"
      },
      {
        "speaker": "Dina",
        "voice": "female",
        "text": "Oh! I completely missed that email! So my old password expired?"
      },
      {
        "speaker": "IT Support",
        "voice": "male",
        "text": "Exactly. I'll unlock your account right now and send a one-time verification code to your registered phone number. Make sure your new password is at least ten characters and includes a symbol."
      }
    ]
  },
  {
    "id": "clip-17",
    "title": {
      "en": "Updating a Package Delivery Address",
      "ar": "مكالمة تصحيح عنوان توصيل طرد"
    },
    "speakerMode": "dialogue",
    "turns": [
      {
        "speaker": "Courier Agent",
        "voice": "female",
        "text": "SwiftLine Express customer care. May I have your tracking number, please?"
      },
      {
        "speaker": "Waleed",
        "voice": "male",
        "text": "Yes, it's SL-8842. I received a text saying my order couldn't be delivered today because the building number was incomplete."
      },
      {
        "speaker": "Courier Agent",
        "voice": "female",
        "text": "Let me pull it up. Yes, the label shows Olaya Street, Apartment 12, without the building number. Can you confirm the full address?"
      },
      {
        "speaker": "Waleed",
        "voice": "male",
        "text": "It's Building 47 on Olaya Street. Actually, I'll be at my workplace tomorrow until five, so can I pick it up from your Al-Muruj branch instead?"
      },
      {
        "speaker": "Courier Agent",
        "voice": "female",
        "text": "Certainly. I'll redirect it to the Al-Muruj pickup counter at no extra cost. It will be ready after noon tomorrow, and we'll hold it for five days—just bring your national ID."
      }
    ]
  },
  {
    "id": "clip-18",
    "title": {
      "en": "Freezing a Gym Membership",
      "ar": "طلب تجميد اشتراك النادي الرياضي"
    },
    "speakerMode": "dialogue",
    "turns": [
      {
        "speaker": "Gym Staff",
        "voice": "male",
        "text": "ActiveLife Fitness, how can I help you today?"
      },
      {
        "speaker": "Noura",
        "voice": "female",
        "text": "Hi, I have an annual membership, and I'm leaving for a six-week work training program abroad next Sunday. Is it possible to pause my membership while I'm away?"
      },
      {
        "speaker": "Gym Staff",
        "voice": "male",
        "text": "Yes! Annual members get up to sixty days of free freeze time per year, as long as the pause is at least two weeks long."
      },
      {
        "speaker": "Noura",
        "voice": "female",
        "text": "That's great. Do I need to come in to sign a form?"
      },
      {
        "speaker": "Gym Staff",
        "voice": "male",
        "text": "No need to visit in person. Just submit the freeze dates through our member app at least forty-eight hours before you leave, and your expiration date will automatically extend by six weeks."
      }
    ]
  },
  {
    "id": "clip-19",
    "title": {
      "en": "Medical Clinic Voicemail Follow-Up",
      "ar": "رسالة صوتية من العيادة الطبية للمتابعة"
    },
    "speakerMode": "monologue",
    "turns": [
      {
        "speaker": "Nurse Mariam",
        "voice": "female",
        "text": "Hello Mr. Hassan, this is Nurse Mariam calling from Al-Salam Medical Center on Wednesday afternoon regarding your routine blood test from Monday."
      },
      {
        "speaker": "Nurse Mariam",
        "voice": "female",
        "text": "Dr. Al-Zahrani has reviewed your results, and the good news is that your cholesterol and blood sugar levels are completely normal. However, your vitamin D level came back slightly low."
      },
      {
        "speaker": "Nurse Mariam",
        "voice": "female",
        "text": "The doctor has sent a prescription for a weekly vitamin D supplement to your pharmacy, and he'd like to see you for a quick recheck in three months. Please call our desk between eight and four if you have any questions."
      }
    ]
  },
  {
    "id": "clip-20",
    "title": {
      "en": "Ordering Catering for a Workshop",
      "ar": "طلب ضيافة لورشة عمل جامعية"
    },
    "speakerMode": "dialogue",
    "turns": [
      {
        "speaker": "Caterer",
        "voice": "male",
        "text": "Cedar Kitchen Catering, good afternoon. How may I assist you?"
      },
      {
        "speaker": "Hanan",
        "voice": "female",
        "text": "Hi, I'm coordinating a university architecture workshop for thirty-five attendees next Monday. We need a light lunch box setup delivered by 12:15 p.m."
      },
      {
        "speaker": "Caterer",
        "voice": "male",
        "text": "We can definitely handle that. Our executive box includes a grilled sandwich, quinoa salad, seasonal fruit, and bottled water for forty riyals per person. Do you have any dietary requests?"
      },
      {
        "speaker": "Hanan",
        "voice": "female",
        "text": "Yes—eight of the boxes need to be strictly vegetarian, and please make sure all desserts are nut-free because one speaker has a severe allergy."
      },
      {
        "speaker": "Caterer",
        "voice": "male",
        "text": "Noted—eight vegetarian boxes and zero nuts across the entire order. We'll waive the delivery fee since your order exceeds twenty-five guests, and we just need final headcount confirmation by Thursday noon."
      }
    ]
  },
  {
    "id": "clip-21",
    "title": {
      "en": "Mini-Lecture: Urban Heat Islands & Green Roofs",
      "ar": "محاضرة قصيرة: الجزر الحرارية الحضرية والأسطح الخضراء"
    },
    "speakerMode": "lecture",
    "turns": [
      {
        "speaker": "Professor",
        "voice": "male",
        "text": "Today in urban planning, we're examining the urban heat island effect—why densely built cities often measure three to five degrees warmer than surrounding rural areas, especially after sunset."
      },
      {
        "speaker": "Professor",
        "voice": "male",
        "text": "Dark asphalt roads and concrete rooftops absorb solar radiation all afternoon and release that stored heat slowly overnight. Meanwhile, cities have fewer trees to provide shade and evaporative cooling."
      },
      {
        "speaker": "Student",
        "voice": "female",
        "text": "Professor, can reflective white roofs solve the problem on their own, or are planted green roofs more effective?"
      },
      {
        "speaker": "Professor",
        "voice": "male",
        "text": "Great question. White reflective coatings are cheaper and bounce sunlight away immediately, whereas green roofs—covered with drought-tolerant plants and soil—not only lower rooftop temperatures but also insulate buildings and absorb sudden rainwater runoff."
      }
    ]
  },
  {
    "id": "clip-22",
    "title": {
      "en": "Mini-Lecture: Sleep and Memory Consolidation",
      "ar": "محاضرة قصيرة: النوم وترسيخ الذاكرة"
    },
    "speakerMode": "lecture",
    "turns": [
      {
        "speaker": "Lecturer",
        "voice": "female",
        "text": "Many university students assume that staying awake all night before an exam buys extra learning time. Yet neuroscience shows that sleep is not passive downtime—it is an active filing stage for memory."
      },
      {
        "speaker": "Lecturer",
        "voice": "female",
        "text": "During deep slow-wave sleep, the brain replays neural patterns formed while studying and transfers fragile short-term traces from the hippocampus into long-term storage in the cortex."
      },
      {
        "speaker": "Lecturer",
        "voice": "female",
        "text": "Later in the night, REM sleep helps connect newly learned facts with older knowledge, which improves creative problem-solving. In controlled trials, students who slept eight hours recalled nearly thirty percent more complex terms than sleep-deprived peers who studied the same notes."
      }
    ]
  },
  {
    "id": "clip-23",
    "title": {
      "en": "Mini-Lecture: Desalination in Arid Regions",
      "ar": "محاضرة قصيرة: تحلية المياه في المناطق الجافة"
    },
    "speakerMode": "lecture",
    "turns": [
      {
        "speaker": "Professor",
        "voice": "male",
        "text": "In arid coastal nations with scarce rivers and low rainfall, seawater desalination has become the backbone of municipal drinking water."
      },
      {
        "speaker": "Professor",
        "voice": "male",
        "text": "Older plants relied mainly on thermal distillation—boiling seawater and condensing the steam—which consumed enormous quantities of fossil fuel. Modern facilities increasingly favor reverse osmosis, pushing seawater under high pressure through semipermeable membranes that block salt ions."
      },
      {
        "speaker": "Student",
        "voice": "male",
        "text": "What happens to the leftover salty water after the fresh water is extracted?"
      },
      {
        "speaker": "Professor",
        "voice": "male",
        "text": "That concentrated brine is a key environmental challenge. Engineers now dilute it carefully before dispersing it offshore, and emerging research aims to recover valuable minerals like magnesium and lithium directly from the brine."
      }
    ]
  },
  {
    "id": "clip-24",
    "title": {
      "en": "Mini-Lecture: The Honeybee Waggle Dance",
      "ar": "محاضرة قصيرة: رقصة النحل التواصلية"
    },
    "speakerMode": "lecture",
    "turns": [
      {
        "speaker": "Lecturer",
        "voice": "female",
        "text": "In the 1940s, Austrian biologist Karl von Frisch decoded one of nature's most remarkable communication systems: the honeybee waggle dance."
      },
      {
        "speaker": "Lecturer",
        "voice": "female",
        "text": "When a scout bee locates a rich patch of flowers more than a hundred meters from the hive, she returns and traces a figure-eight pattern on the dark vertical honeycomb while vibrating her abdomen."
      },
      {
        "speaker": "Lecturer",
        "voice": "female",
        "text": "Two details carry exact geographic data. First, the angle of the straight central run relative to straight up indicates the flower patch's direction relative to the sun. Second, the duration of the waggle tells hive mates the distance—roughly one second per kilometer."
      }
    ]
  },
  {
    "id": "clip-25",
    "title": {
      "en": "Mini-Lecture: Microplastics in Coastal Waters",
      "ar": "محاضرة قصيرة: اللدائن الدقيقة في المياه الساحلية"
    },
    "speakerMode": "lecture",
    "turns": [
      {
        "speaker": "Professor",
        "voice": "male",
        "text": "When people picture ocean plastic pollution, they usually imagine floating bottles or fishing nets. Marine ecologists, however, are increasingly concerned about microplastics—fragments smaller than five millimeters across."
      },
      {
        "speaker": "Professor",
        "voice": "male",
        "text": "Some microplastics form when larger plastic debris breaks down under sunlight and wave action. Others enter wastewater directly as microscopic synthetic fibers shed from polyester clothing during laundry cycles."
      },
      {
        "speaker": "Student",
        "voice": "female",
        "text": "Are wastewater treatment plants able to filter those fibers out?"
      },
      {
        "speaker": "Professor",
        "voice": "male",
        "text": "Conventional plants catch most particles, yet millions of tiny fibers still slip through daily. Because filter-feeding organisms like mussels mistake them for plankton, scientists are pushing for fine microfiber filters built right into household washing machines."
      }
    ]
  },
  {
    "id": "clip-26",
    "title": {
      "en": "Mini-Lecture: The Cornell Note-Taking System",
      "ar": "محاضرة قصيرة: نظام كورنيل لتدوين الملاحظات"
    },
    "speakerMode": "lecture",
    "turns": [
      {
        "speaker": "Lecturer",
        "voice": "female",
        "text": "Before our midterm lectures begin, let's review why passive copying rarely helps during exams—and how the Cornell note-taking method fixes that habit."
      },
      {
        "speaker": "Lecturer",
        "voice": "female",
        "text": "You divide each notebook page into three unequal zones: a wide right column for concise lecture notes, a narrow left margin for key terms and self-test questions, and a short bottom band for a two-sentence summary."
      },
      {
        "speaker": "Lecturer",
        "voice": "female",
        "text": "The crucial step happens within twenty-four hours of class. You fill in the left cue column and bottom summary from memory, then cover the right side to quiz yourself. Active recall builds far stronger retention than rereading highlighted pages."
      }
    ]
  }
];

/**
 * 118 unique Qiyas STEP Listening Comprehension questions mapped to STEP_LISTENING_CLIPS.
 */
export const STEP_LISTENING_QUESTIONS: StepQuestion[] = [
  {
    "id": "step-l-001",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-01",
    "prompt": "Why did Rami decide NOT to study at the campus cafe?",
    "options": [
      "The cafe closes early for cleaning at two o'clock.",
      "All the tables were already reserved by another class.",
      "The cafe Wi-Fi does not work on his tablet.",
      "It becomes too noisy during the afternoon rush."
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "Rami explains that the cafe gets 'way too noisy around two o'clock when the afternoon rush hits.'",
      "ar": "يوضح رامي أن المقهى يصبح صاخباً جداً نحو الساعة الثانية مع ازدحام فترة بعد الظهر."
    }
  },
  {
    "id": "step-l-002",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-01",
    "prompt": "Where will Layla and Rami meet for their statistics review?",
    "options": [
      "Study Room 4B on the third floor of the library",
      "The statistics lab on the fourth floor",
      "Dr. Salem's office near the cafe",
      "The outdoor courtyard tables"
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "Rami booked Study Room 4B on the third floor of the library.",
      "ar": "حجز رامي غرفة الدراسة 4B في الطابق الثالث من المكتبة."
    }
  },
  {
    "id": "step-l-003",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-01",
    "prompt": "What two items does Rami ask Layla to bring?",
    "options": [
      "Her laptop and the textbook",
      "Printed problem sets and a graphing calculator",
      "Dr. Salem's slides and a notebook",
      "Flashcards and highlighters"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "Rami tells Layla to bring her printed problem sets and her graphing calculator.",
      "ar": "يطلب رامي من ليلى إحضار أوراق التمارين المطبوعة والآلة الحاسبة البيانية."
    }
  },
  {
    "id": "step-l-004",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-01",
    "prompt": "How do the students plan to view Dr. Salem's review slides?",
    "options": [
      "By printing copies at the library desk",
      "By sharing them on Layla's phone",
      "By projecting them from Rami's tablet onto the room screen",
      "By borrowing a laptop from reception"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Rami downloaded the slides onto his tablet so they can project them onto the study room's screen.",
      "ar": "قام رامي بتنزيل الشرائح على جهازه اللوحي لعرضها على شاشة الغرفة."
    }
  },
  {
    "id": "step-l-005",
    "section": "listening",
    "subtopic": "Next Action",
    "difficulty": "easy",
    "clipId": "clip-01",
    "prompt": "What will Layla do on her way to the study room?",
    "options": [
      "Print another copy of the review slides",
      "Stop by Dr. Salem's office",
      "Borrow a calculator from a classmate",
      "Buy two iced coffees"
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "Layla says she will grab two iced coffees on her way over and meet Rami at 2:15.",
      "ar": "تقول ليلى إنها ستحضر كوبين من القهوة المثلجة في طريقها وتلتقي به الساعة 2:15."
    }
  },
  {
    "id": "step-l-006",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-02",
    "prompt": "Why does Tariq need to borrow Nadia's laptop charger?",
    "options": [
      "He left his charger plugged in at home and his battery is at seven percent.",
      "His charger broke during his morning lecture.",
      "His laptop does not support the classroom wall outlets.",
      "He lent his own charger to another teammate."
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "Tariq explains that he left his charger plugged in at home and his battery has dropped to seven percent.",
      "ar": "يذكر طارق أنه نسي شاحنه موصولاً بالكهرباء في المنزل وانخفضت بطاريته إلى سبعة بالمئة."
    }
  },
  {
    "id": "step-l-007",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-02",
    "prompt": "What event does Tariq have in thirty minutes?",
    "options": [
      "A final statistics exam",
      "A marketing presentation",
      "A job interview with a recruiter",
      "A meeting at the media desk"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "Tariq mentions that his marketing presentation starts in half an hour.",
      "ar": "يوضح طارق أن عرضه التقديمي في التسويق سيبدأ خلال نصف ساعة."
    }
  },
  {
    "id": "step-l-008",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-02",
    "prompt": "Until what time does Nadia say Tariq may keep the charger?",
    "options": [
      "Until 2:30 p.m.",
      "Until 3:00 p.m.",
      "Until 4:00 p.m.",
      "Until tomorrow morning"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Nadia says he can keep it until four o'clock because she doesn't have another lecture until then.",
      "ar": "تسمح نادية له بالاحتفاظ بالشاحن حتى الساعة الرابعة لأنها لا تملك محاضرة أخرى قبل ذلك."
    }
  },
  {
    "id": "step-l-009",
    "section": "listening",
    "subtopic": "Next Action",
    "difficulty": "medium",
    "clipId": "clip-02",
    "prompt": "Where can Tariq leave the charger if he finishes early?",
    "options": [
      "At the campus coffee shop",
      "Inside Nadia's locker",
      "With the marketing professor",
      "At the media desk"
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "Nadia instructs him to drop it off at the media desk if he finishes early.",
      "ar": "تطلب منه نادية تركه لدى مكتب الوسائط إذا انتهى مبكراً."
    }
  },
  {
    "id": "step-l-010",
    "section": "listening",
    "subtopic": "Main Idea",
    "difficulty": "easy",
    "clipId": "clip-03",
    "prompt": "Why is Sami calling Al-Noor Dental Clinic?",
    "options": [
      "To reschedule his routine dental cleaning",
      "To book an emergency tooth extraction",
      "To ask about teeth-whitening prices",
      "To cancel his insurance membership"
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "Sami calls to move his routine cleaning scheduled for Tuesday at 10 a.m. due to a work meeting conflict.",
      "ar": "يتصل سامي لتغيير موعد تنظيف الأسنان الروتيني يوم الثلاثاء لتعارضه مع اجتماع عمل."
    }
  },
  {
    "id": "step-l-011",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-03",
    "prompt": "What caused Sami to miss his original Tuesday morning slot?",
    "options": [
      "He has a flight to catch at ten.",
      "His manager moved a client meeting to the same hour.",
      "His car is in the repair shop.",
      "Dr. Mansour is out of the clinic on Tuesday."
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "Sami states that his manager just moved their client meeting to ten a.m. on Tuesday.",
      "ar": "يذكر سامي أن مديره نقل اجتماع العميل إلى الساعة العاشرة نفسها يوم الثلاثاء."
    }
  },
  {
    "id": "step-l-012",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-03",
    "prompt": "Which new appointment time does Sami choose?",
    "options": [
      "Tuesday afternoon at 4:30",
      "Wednesday morning at 9:15",
      "Thursday afternoon at 4:30",
      "Saturday morning at 9:15"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Sami selects Thursday at 4:30 p.m. so he can go straight from his office.",
      "ar": "يختار سامي يوم الخميس الساعة 4:30 مساءً ليأتي مباشرة من المكتب."
    }
  },
  {
    "id": "step-l-013",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-03",
    "prompt": "Why is Sami NOT charged a rescheduling fee?",
    "options": [
      "It is his first visit to the clinic.",
      "His insurance covers all cancellation penalties.",
      "Dr. Mansour's schedule was already overbooked.",
      "He called more than twenty-four hours in advance."
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "The receptionist explains there is no rescheduling fee because he called more than 24 hours ahead.",
      "ar": "توضح موظفة الاستقبال أنه لا توجد رسوم تغيير لأنه اتصل قبل الموعد بأكثر من 24 ساعة."
    }
  },
  {
    "id": "step-l-014",
    "section": "listening",
    "subtopic": "Next Action",
    "difficulty": "medium",
    "clipId": "clip-03",
    "prompt": "What does the receptionist ask Sami to do on Thursday?",
    "options": [
      "Arrive ten minutes early to update his insurance card",
      "Pay for the visit online beforehand",
      "Bring his old X-ray scans",
      "Call again one hour before his appointment"
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "She asks him to arrive ten minutes early to update his insurance card.",
      "ar": "تطلب منه الحضور مبكراً بعشر دقائق لتحديث بطاقة التأمين."
    }
  },
  {
    "id": "step-l-015",
    "section": "listening",
    "subtopic": "Main Idea",
    "difficulty": "easy",
    "clipId": "clip-04",
    "prompt": "Why does Khalid seem more relaxed than usual this morning?",
    "options": [
      "He started working remotely twice a week.",
      "He switched from driving to taking the new metro line.",
      "The ring road traffic cleared up permanently.",
      "He moved to an apartment right next to the office."
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "Khalid stopped driving and took the new metro line from the park-and-ride station near his home.",
      "ar": "توقف خالد عن القيادة وجرّب خط المترو الجديد من محطة المواقف القريبة من منزله."
    }
  },
  {
    "id": "step-l-016",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-04",
    "prompt": "How long did Khalid's metro commute take from start to desk?",
    "options": [
      "Fifteen minutes",
      "Thirty-two minutes",
      "Forty-five minutes",
      "Nearly one hour"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "Khalid says on the train he reached his desk in thirty-two minutes, compared to nearly an hour driving plus fifteen minutes parking.",
      "ar": "يقول خالد إنه وصل إلى مكتبه بالقطار في اثنتين وثلاثين دقيقة فقط."
    }
  },
  {
    "id": "step-l-017",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-04",
    "prompt": "What was Maha worried about regarding the metro commute?",
    "options": [
      "The cost of the monthly pass",
      "Finding parking at the park-and-ride station",
      "Crowded trains during morning rush hour",
      "Walking in the afternoon heat from the station to the office"
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "Maha asks whether the walk from the station to their office is pretty hot in the afternoon.",
      "ar": "تتساءل مها إن كان المشي من المحطة إلى المكتب حاراً جداً في فترة الظهيرة."
    }
  },
  {
    "id": "step-l-018",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-04",
    "prompt": "How does Khalid avoid the outdoor heat between the metro station and his office?",
    "options": [
      "He uses an air-conditioned pedestrian bridge from the east exit.",
      "He takes a free shuttle bus from the station.",
      "He leaves work after sunset.",
      "He rides an electric scooter through an underground garage."
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "Khalid mentions an air-conditioned pedestrian bridge connecting the east exit directly to their building's plaza.",
      "ar": "يوضح خالد وجود جسر مشاة مكيف يربط المخرج الشرقي مباشرة بساحة المبنى."
    }
  },
  {
    "id": "step-l-019",
    "section": "listening",
    "subtopic": "Inference",
    "difficulty": "medium",
    "clipId": "clip-04",
    "prompt": "What financial advantage of the metro does Khalid highlight?",
    "options": [
      "His company pays for his metro tickets.",
      "The monthly pass costs less than half of his previous fuel expenses.",
      "Parking at work is now completely free.",
      "Riders get a discount at nearby bookstores."
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "Khalid says the monthly pass costs less than half what he used to spend on fuel.",
      "ar": "يشير خالد إلى أن البطاقة الشهرية تكلف أقل من نصف ما كان ينفقه على الوقود."
    }
  },
  {
    "id": "step-l-020",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-05",
    "prompt": "Why did Omar cancel his plans to join the desert trip?",
    "options": [
      "He has to work an evening shift on Friday.",
      "He does not own a warm jacket.",
      "His sister is arriving on a flight from London.",
      "His SUV needs mechanical repairs."
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Huda says Omar had to cancel because his sister is flying in from London.",
      "ar": "تقول هدى إن عمر اعتذر لأن أخته قادمة على رحلة من لندن."
    }
  },
  {
    "id": "step-l-021",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-05",
    "prompt": "How many people are confirmed to go on the stargazing trip?",
    "options": [
      "Four",
      "Five",
      "Six",
      "Seven"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Huda states that six of them are definitely going.",
      "ar": "تؤكد هدى أن ستة أشخاص سيذهبون بالتأكيد."
    }
  },
  {
    "id": "step-l-022",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-05",
    "prompt": "Why does Huda tell Faisal to remind everyone to bring heavy jackets?",
    "options": [
      "The nighttime temperature drops to nine degrees Celsius after midnight.",
      "Sandstorms are expected near the red dunes.",
      "Heavy rain is predicted in the evening.",
      "They plan to hike up a snowy mountain."
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "Huda warns that although skies will be clear, temperatures drop to nine degrees Celsius after midnight.",
      "ar": "تحذّر هدى من أن الحرارة تنخفض إلى تسع درجات مئوية بعد منتصف الليل."
    }
  },
  {
    "id": "step-l-023",
    "section": "listening",
    "subtopic": "Purpose",
    "difficulty": "medium",
    "clipId": "clip-05",
    "prompt": "Why does Faisal suggest meeting at the north gas station at 3:00 p.m.?",
    "options": [
      "To buy firewood before the shop closes",
      "To reach the site and set up camp before sunset",
      "To avoid Friday afternoon highway tolls",
      "To pick up a rented telescope there"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "Faisal suggests meeting at three p.m. so they can set up camp before sunset.",
      "ar": "يقترح فيصل الالتقاء الساعة الثالثة ليتمكنوا من نصب المخيم قبل غروب الشمس."
    }
  },
  {
    "id": "step-l-024",
    "section": "listening",
    "subtopic": "Main Idea",
    "difficulty": "easy",
    "clipId": "clip-06",
    "prompt": "What problem do Reem and Yousef face at the beginning of the conversation?",
    "options": [
      "The library is closing earlier than expected.",
      "Reem forgot her student ID card.",
      "All desks on the second floor are occupied.",
      "The library printers are out of paper."
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Reem points out that every single desk on the second floor is already taken.",
      "ar": "تشير ريم إلى أن جميع الطاولات في الطابق الثاني مشغولة."
    }
  },
  {
    "id": "step-l-025",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-06",
    "prompt": "Where does Yousef recommend they study instead?",
    "options": [
      "The campus cafeteria",
      "The rooftop terrace above the library",
      "An empty lecture hall in the science building",
      "The archives reading room in the basement"
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "Yousef suggests the archives reading room in the basement, which is a quiet zone most undergraduates overlook.",
      "ar": "يقترح يوسف قاعة مطالعة الأرشيف في القبو لأنها منطقة صامتة وقليلة الازدحام."
    }
  },
  {
    "id": "step-l-026",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-06",
    "prompt": "Why was Reem initially hesitant about going to the basement?",
    "options": [
      "She was unsure whether the Wi-Fi was reliable for uploading her lab report.",
      "She thought the room required special faculty permission.",
      "She disliked studying without natural sunlight.",
      "She needed to discuss group work aloud."
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "Reem asks if the Wi-Fi is reliable in the basement because she has to upload her lab report before five.",
      "ar": "تسأل ريم عن جودة الشبكة في القبو لأنها بحاجة لرفع تقرير المختبر قبل الساعة الخامسة."
    }
  },
  {
    "id": "step-l-027",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-06",
    "prompt": "What rule applies inside the archives reading room?",
    "options": [
      "Laptops must be plugged into the wall at all times.",
      "Only sealed water bottles are permitted—no coffee or tea cups.",
      "Students may stay for a maximum of two hours.",
      "Backpacks must be checked at the second-floor desk."
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "Yousef reminds Reem that coffee cups aren't allowed inside, only sealed water bottles, so she decides to finish her tea first.",
      "ar": "يذكّر يوسف ريم بأن الأكواب المفتوحة ممنوعة ولا يُسمح إلا بقوارير المياه المغلقة."
    }
  },
  {
    "id": "step-l-028",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-07",
    "prompt": "Why does Amina want to exchange the navy jacket?",
    "options": [
      "The zipper broke on the first day.",
      "She received the wrong color by mistake.",
      "The sleeves feel tight when she wears a sweater underneath.",
      "She found the same jacket cheaper at another store."
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Amina loves the fabric but says the sleeves feel tight over a sweater.",
      "ar": "تقول أمينة إنها تحب القماش لكن الأكمام ضيقة عند ارتداء كنزة أسفل المعطف."
    }
  },
  {
    "id": "step-l-029",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-07",
    "prompt": "How long ago did Amina purchase the jacket online?",
    "options": [
      "Two days ago",
      "Ten days ago",
      "Fourteen days ago",
      "One month ago"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "Amina mentions buying the jacket online ten days ago, which is within the store's 14-day exchange window.",
      "ar": "تذكر أمينة أنها اشترته عبر الإنترنت قبل عشرة أيام، وهو ضمن مهلة الاستبدال البالغة أربعة عشر يوماً."
    }
  },
  {
    "id": "step-l-030",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-07",
    "prompt": "What size does Amina currently have, and what size does she want?",
    "options": [
      "She has a medium and wants a large.",
      "She has a small and wants a medium.",
      "She has a large and wants a medium.",
      "She has a large and wants an extra-large."
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "The clerk notes she has a medium and offers to get her a large.",
      "ar": "يذكر الموظف أن لديها مقاس متوسط (medium) وتريد استبداله بمقاس كبير (large)."
    }
  },
  {
    "id": "step-l-031",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-07",
    "prompt": "Which color in size large is immediately available at the store?",
    "options": [
      "Navy",
      "Charcoal gray",
      "Olive green",
      "Black"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "The clerk says they are out of navy in large at that branch, though they have charcoal gray on hand.",
      "ar": "يوضح الموظف أن اللون الكحلي غير متوفر بمقاس كبير في الفرع، بينما الرمادي الداكن متوفر حالياً."
    }
  },
  {
    "id": "step-l-032",
    "section": "listening",
    "subtopic": "Next Action",
    "difficulty": "medium",
    "clipId": "clip-07",
    "prompt": "What option does Amina choose in the end?",
    "options": [
      "Taking the charcoal gray jacket immediately",
      "Requesting a full refund to her card",
      "Having the navy large shipped free to her home",
      "Driving to another branch across town"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Because she doesn't need the jacket until next weekend, Amina chooses free home delivery of the navy large within two business days.",
      "ar": "بما أنها لا تحتاجه حتى نهاية الأسبوع المقبل، تختار الشحن المجاني للمعطف الكحلي إلى منزلها."
    }
  },
  {
    "id": "step-l-033",
    "section": "listening",
    "subtopic": "Main Idea",
    "difficulty": "easy",
    "clipId": "clip-08",
    "prompt": "What event are Nasser and Sara planning?",
    "options": [
      "A quarterly board meeting",
      "A welcome lunch for visiting partners",
      "An annual engineering awards ceremony",
      "A surprise retirement dinner for Mr. Majid"
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "They are organizing a surprise retirement dinner for Mr. Majid at a Mediterranean restaurant.",
      "ar": "ينظّم ناصر وسارة حفل عشاء وداعي مفاجئ بمناسبة تقاعد الأستاذ ماجد."
    }
  },
  {
    "id": "step-l-034",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-08",
    "prompt": "Why did the restaurant waive the private room fee?",
    "options": [
      "The group selected the restaurant's set menu.",
      "Sara is a frequent customer there.",
      "They booked the room on a weekday afternoon.",
      "Fewer than twenty guests are attending."
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "Sara explains that the restaurant didn't charge a room fee because they chose the set menu.",
      "ar": "تذكر سارة أن المطعم لم يفرض رسوماً على القاعة الخاصة لاختيارهم القائمة المحددة."
    }
  },
  {
    "id": "step-l-035",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-08",
    "prompt": "How are the organizers keeping the dinner a surprise for Mr. Majid?",
    "options": [
      "They scheduled it at the office cafeteria instead.",
      "They told him the restaurant is hosting a brief dinner with visiting partners.",
      "They asked his family to bring him blindfolded.",
      "They sent him a calendar invite without a location."
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "Their director told Mr. Majid it is a brief quarterly dinner with two visiting partners so he will arrive on time without suspecting.",
      "ar": "أخبره المدير أن العشاء مجرد لقاء ربع سنوي مختصر مع شريكين زائرين كي لا يكشف المفاجأة."
    }
  },
  {
    "id": "step-l-036",
    "section": "listening",
    "subtopic": "Next Action",
    "difficulty": "easy",
    "clipId": "clip-08",
    "prompt": "What does Nasser offer to do after lunch today?",
    "options": [
      "Confirm the final menu with the chef",
      "Send directions to all eighteen guests",
      "Pass around the framed calligraphy gift for signatures",
      "Pick up Mr. Majid from his office"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Nasser says he will circulate the framed calligraphy gift quietly around the engineering floor after lunch.",
      "ar": "يعرض ناصر تمرير اللوحة الخطية المؤطرة بهدوء في طابق الهندسة بعد الغداء للتوقيع عليها."
    }
  },
  {
    "id": "step-l-037",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-09",
    "prompt": "What is Adel's main concern about taking Introduction to Psychology?",
    "options": [
      "He has not completed its prerequisites.",
      "It does not count toward graduation credits.",
      "The class is already completely full.",
      "The reading load might be too heavy alongside his algorithms course."
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "Adel worries about the reading load alongside his algorithms course.",
      "ar": "يخشى عادل أن يكون عبء القراءة كبيراً إلى جانب مقرر الخوارزميات."
    }
  },
  {
    "id": "step-l-038",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-09",
    "prompt": "Which assignments are required in Introduction to Psychology?",
    "options": [
      "Weekly reading quizzes and a twenty-page research paper",
      "Short lab reports and group presentations",
      "Daily coding exercises and a final exam",
      "Field observations at the tutoring center"
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "The advisor notes that Psychology involves weekly reading quizzes and a twenty-page research paper.",
      "ar": "توضح المرشدة أن مقرر علم النفس يتضمن اختبارات قراءة أسبوعية وبحثاً من عشرين صفحة."
    }
  },
  {
    "id": "step-l-039",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-09",
    "prompt": "According to the advisor, why is Technical Communication especially valuable for Adel?",
    "options": [
      "It has no graded assignments or presentations.",
      "Employers value seeing it on engineering transcripts.",
      "It satisfies two electives at once.",
      "It is taught entirely online."
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "The advisor mentions that employers love seeing Technical Communication on engineering transcripts.",
      "ar": "تشير المرشدة إلى أن جهات التوظيف تقدّر وجود مقرر التواصل التقني في السجل الأكاديمي."
    }
  },
  {
    "id": "step-l-040",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-09",
    "prompt": "When does Adel work part-time at the tutoring center?",
    "options": [
      "Tuesday and Thursday mornings",
      "Friday mornings",
      "Monday and Wednesday afternoons",
      "Every afternoon after two o'clock"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Adel says he works part-time at the tutoring center on Monday and Wednesday afternoons.",
      "ar": "يذكر عادل أنه يعمل بدوام جزئي في مركز التدريس عصر الإثنين والأربعاء."
    }
  },
  {
    "id": "step-l-041",
    "section": "listening",
    "subtopic": "Inference",
    "difficulty": "medium",
    "clipId": "clip-09",
    "prompt": "Why does the advisor urge Adel to register soon for the Tuesday-Thursday section?",
    "options": [
      "The section may be canceled due to low enrollment.",
      "The tuition fee increases on Thursday.",
      "The professor requires an entrance essay by tomorrow.",
      "Only four seats remain and Friday is the add-drop deadline."
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "The advisor notes there are only four seats left and advises registering before Friday's add-drop deadline.",
      "ar": "تنبهه المرشدة إلى بقاء أربعة مقاعد فقط وإلى أن الجمعة هو آخر موعد للحذف والإضافة."
    }
  },
  {
    "id": "step-l-042",
    "section": "listening",
    "subtopic": "Main Idea",
    "difficulty": "easy",
    "clipId": "clip-10",
    "prompt": "What is the main purpose of this airport announcement?",
    "options": [
      "To inform passengers of a gate change and delayed boarding time",
      "To cancel Flight GA-418 to Amman",
      "To call missing passengers for immediate final boarding",
      "To announce a change in luggage weight limits"
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "The gate agent announces both a new departure gate (24B instead of 12A) and a twenty-minute boarding delay.",
      "ar": "تُعلن الموظفة عن تغيير بوابة الصعود وتأخير وقت الصعود عشرين دقيقة."
    }
  },
  {
    "id": "step-l-043",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-10",
    "prompt": "Which gate will Flight GA-418 now depart from?",
    "options": [
      "Gate 12A",
      "Gate 18B",
      "Gate 24B",
      "Gate 40A"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "The flight has moved from Gate 12A to Gate 24B in the north concourse.",
      "ar": "انتقلت الرحلة من البوابة 12A إلى البوابة 24B في الصالة الشمالية."
    }
  },
  {
    "id": "step-l-044",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-10",
    "prompt": "What caused the gate change?",
    "options": [
      "Severe fog over Amman",
      "A security inspection at Gate 12A",
      "An incoming aircraft delay",
      "Routine maintenance on the moving walkway"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "The announcement attributes the gate change to an incoming aircraft delay.",
      "ar": "يُعزى تغيير البوابة إلى تأخر وصول الطائرة القادمة."
    }
  },
  {
    "id": "step-l-045",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-10",
    "prompt": "At what time will boarding now begin?",
    "options": [
      "6:00 p.m.",
      "6:20 p.m.",
      "6:40 p.m.",
      "7:00 p.m."
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Boarding will begin twenty minutes later than scheduled, at 6:40 p.m.",
      "ar": "سيبدأ الصعود الساعة 6:40 مساءً بعد تأخير عشرين دقيقة."
    }
  },
  {
    "id": "step-l-046",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-10",
    "prompt": "Who will be invited to board first?",
    "options": [
      "Families with young children and passengers needing assistance",
      "Frequent flyer gold members only",
      "Passengers seated in the back rows",
      "Passengers with carry-on bags only"
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "Boarding starts with families traveling with young children and passengers needing assistance.",
      "ar": "يبدأ الصعود بالعائلات التي لديها أطفال صغار والمسافرين الذين يحتاجون إلى مساعدة."
    }
  },
  {
    "id": "step-l-047",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-11",
    "prompt": "Why is the Engineering Plaza shuttle stop temporarily closed?",
    "options": [
      "A campus marathon is blocking the road.",
      "The area is undergoing repaving work.",
      "A new subway entrance is being excavated.",
      "The Green Loop route has been permanently discontinued."
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "The Engineering Plaza stop is closed from Monday morning through Wednesday evening for repaving work.",
      "ar": "تُغلق محطة ساحة الهندسة مؤقتاً من الإثنين حتى مساء الأربعاء بسبب أعمال إعادة الرصف."
    }
  },
  {
    "id": "step-l-048",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-11",
    "prompt": "Where should Green Loop riders board during the closure?",
    "options": [
      "At the Medical Center main gate",
      "Inside the campus parking structure",
      "At the Science Annex crosswalk, fifty meters east",
      "At the north library plaza"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Buses will pick up passengers temporarily at the Science Annex crosswalk, fifty meters to the east.",
      "ar": "ستقف الحافلات مؤقتاً عند معبر ملحق العلوم على بعد خمسين متراً شرقاً."
    }
  },
  {
    "id": "step-l-049",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-11",
    "prompt": "How often will Green Loop shuttles continue to run?",
    "options": [
      "Every five minutes",
      "Every ten minutes",
      "Every fifteen minutes",
      "Every twenty minutes"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "The coordinator confirms that shuttle frequency remains every ten minutes.",
      "ar": "يؤكد المنسق أن الحافلات ستستمر في العمل كل عشر دقائق."
    }
  },
  {
    "id": "step-l-050",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-11",
    "prompt": "What advice is given to riders traveling to the Medical Center in the morning?",
    "options": [
      "Allow an extra five minutes during peak hours.",
      "Take the Blue Loop instead.",
      "Book a seat on the campus app beforehand.",
      "Walk directly from the Engineering Plaza."
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "Riders heading to the Medical Center are advised to allow an extra five minutes during the morning peak.",
      "ar": "يُنصح المتجهون إلى المركز الطبي بترك خمس دقائق إضافية خلال ذروة الصباح."
    }
  },
  {
    "id": "step-l-051",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-12",
    "prompt": "At what time is this announcement being made?",
    "options": [
      "8:00 p.m.",
      "8:45 p.m.",
      "8:55 p.m.",
      "9:00 p.m."
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "The librarian says the library closes in fifteen minutes at nine o'clock sharp, which means it is currently 8:45 p.m.",
      "ar": "تعلن أمينة المكتبة أن الإغلاق بعد خمس عشرة دقيقة تمام الساعة التاسعة، أي أن الوقت الآن 8:45 مساءً."
    }
  },
  {
    "id": "step-l-052",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-12",
    "prompt": "When will public printers and self-checkout kiosks shut down?",
    "options": [
      "At 8:45 p.m.",
      "At 8:50 p.m.",
      "At 8:55 p.m.",
      "At 9:05 p.m."
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Kiosks and printers shut down five minutes before the 9:00 p.m. closing, i.e., at 8:55 p.m.",
      "ar": "تتوقف الطابعات وأجهزة الإعارة الذاتية قبل الإغلاق بخمس دقائق، أي الساعة 8:55 مساءً."
    }
  },
  {
    "id": "step-l-053",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-12",
    "prompt": "How can visitors return books after 9:00 p.m.?",
    "options": [
      "By handing them to the night security guard",
      "They must wait until 8:00 a.m. the next day",
      "By mailing them to the library's main branch",
      "By using the 24-hour outdoor return box near the west parking entrance"
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "The automated outdoor return box next to the west parking entrance stays open twenty-four hours a day.",
      "ar": "صندوق الإرجاع الخارجي الآلي بجانب مدخل المواقف الغربية يعمل على مدار الساعة."
    }
  },
  {
    "id": "step-l-054",
    "section": "listening",
    "subtopic": "Next Action",
    "difficulty": "easy",
    "clipId": "clip-12",
    "prompt": "What are computer users urged to do right away?",
    "options": [
      "Save their files to a USB drive or cloud storage",
      "Log out and restart the monitors",
      "Pay their printing balance in cash",
      "Reserve a desk for tomorrow morning"
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "The librarian tells visitors to save their documents to a USB drive or cloud storage now before systems shut down.",
      "ar": "تطلب أمينة المكتبة من المستخدمين حفظ ملفاتهم الآن على ذاكرة USB أو التخزين السحابي."
    }
  },
  {
    "id": "step-l-055",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-13",
    "prompt": "Why is the 11:15 Express train to Jeddah delayed?",
    "options": [
      "Heavy rainfall flooded the southern tracks.",
      "A signal inspection is taking place north of the station.",
      "One of the business-class coaches needed cleaning.",
      "Too many passengers are still at security screening."
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "The delay is due to a signal inspection north of the station.",
      "ar": "سبب التأخير هو فحص الإشارات شمال المحطة."
    }
  },
  {
    "id": "step-l-056",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-13",
    "prompt": "Approximately when is the train now expected to depart?",
    "options": [
      "11:25 a.m.",
      "11:30 a.m.",
      "11:40 a.m.",
      "12:00 p.m."
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "The 11:15 train is delayed by approximately twenty-five minutes, placing departure around 11:40 a.m.",
      "ar": "القطار المجدول الساعة 11:15 متأخر نحو 25 دقيقة، ما يعني أن المغادرة قرابة 11:40 صباحاً."
    }
  },
  {
    "id": "step-l-057",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-13",
    "prompt": "Which platform should passengers go to now?",
    "options": [
      "Platform 1",
      "Platform 3",
      "Platform 5",
      "Platform 8"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "The train will now depart from Platform 3 instead of Platform 5.",
      "ar": "سيغادر القطار الآن من الرصيف رقم 3 بدلاً من الرصيف 5."
    }
  },
  {
    "id": "step-l-058",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-13",
    "prompt": "Where are the economy-class seats located on this train?",
    "options": [
      "In coaches four through eight",
      "In the front two carriages",
      "Only in coach three",
      "On the upper deck of all coaches"
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "Economy seats are in coaches four through eight, while business class is at the front.",
      "ar": "تقع مقاعد الدرجة الاقتصادية في العربات من الرابعة إلى الثامنة."
    }
  },
  {
    "id": "step-l-059",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-13",
    "prompt": "How can waiting passengers receive free coffee and water?",
    "options": [
      "By scanning a QR code on Platform 3",
      "By showing their train ticket near the main concourse lounge",
      "By upgrading to business class",
      "By asking the conductor after boarding"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "Complimentary coffee and bottled water are served near the main concourse lounge when passengers show their ticket.",
      "ar": "تُقدم القهوة والمياه مجاناً قرب صالة الردهة الرئيسية عند إبراز التذكرة."
    }
  },
  {
    "id": "step-l-060",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-14",
    "prompt": "Where should visitors gather for the Ancient Trade Routes guided tour?",
    "options": [
      "Outside the main lobby lockers",
      "At the information desk",
      "Beside the bronze compass sculpture",
      "Inside the illuminated manuscripts chamber"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "The forty-five-minute tour starts in five minutes beside the bronze compass sculpture.",
      "ar": "تبدأ الجولة الإرشادية خلال خمس دقائق بجانب مجسم البوصلة البرونزية."
    }
  },
  {
    "id": "step-l-061",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-14",
    "prompt": "Where is photography completely forbidden inside the museum?",
    "options": [
      "In the main galleries",
      "Near the bronze compass sculpture",
      "In the museum lobby",
      "Inside the illuminated manuscripts chamber"
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "Flash-free photos are permitted in main galleries, but photography is strictly prohibited inside the illuminated manuscripts chamber to protect delicate pigments.",
      "ar": "يُمنع التصوير تماماً داخل قاعة المخطوطات المزخرفة لحماية الأصباغ الحساسة."
    }
  },
  {
    "id": "step-l-062",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-14",
    "prompt": "What must visitors provide to borrow a free audio headset?",
    "options": [
      "A photo ID",
      "A refundable cash deposit",
      "A museum membership card",
      "Their mobile phone number"
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "Free audio headsets in Arabic, English, and French are available at the information desk in exchange for a photo ID.",
      "ar": "تتوفر سماعات الدليل الصوتي مجاناً في مكتب الاستعلامات مقابل بطاقة هوية بصورة."
    }
  },
  {
    "id": "step-l-063",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-14",
    "prompt": "What are visitors with large backpacks required to do?",
    "options": [
      "Carry them on their front chest",
      "Store them in the free lockers near the lobby",
      "Leave them in their parked cars",
      "Pay a small storage fee at the coat check"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "Large backpacks must be placed in the complimentary lockers near the lobby.",
      "ar": "يجب وضع حقائب الظهر الكبيرة في الخزائن المجانية القريبة من البهو."
    }
  },
  {
    "id": "step-l-064",
    "section": "listening",
    "subtopic": "Purpose",
    "difficulty": "easy",
    "clipId": "clip-15",
    "prompt": "Why is Badr calling Palm View Hotel?",
    "options": [
      "To upgrade his standard room to a suite",
      "To cancel his weekend stay",
      "To confirm his room will be held despite his late flight arrival",
      "To ask about breakfast buffet hours"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Badr's flight lands at 11:20 p.m., so he calls to make sure his reserved room will not be released.",
      "ar": "تصل رحلة بدر الساعة 11:20 مساءً، لذا يتصل للتأكد من الاحتفاظ بغرفته وعدم إلغائها."
    }
  },
  {
    "id": "step-l-065",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-15",
    "prompt": "Why can the hotel guarantee Badr's room all night?",
    "options": [
      "He is a VIP loyalty member.",
      "The hotel has many vacant rooms this weekend.",
      "He prepaid for an extra night.",
      "His reservation is guaranteed with a credit card."
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "Lina explains that because his booking is guaranteed with a credit card, adding a late-arrival note holds the room all night.",
      "ar": "توضح لينا أن الحجز مضمون ببطاقة ائتمانية، لذا ستُحفظ الغرفة طوال الليل بعد إضافة ملاحظة الوصول المتأخر."
    }
  },
  {
    "id": "step-l-066",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-15",
    "prompt": "How much does the hotel airport shuttle cost?",
    "options": [
      "Nothing—it is complimentary",
      "Twenty riyals per trip",
      "Thirty riyals after 11:00 p.m.",
      "Half price for weekend guests"
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "Lina calls it 'our complimentary shuttle', meaning it is free of charge.",
      "ar": "تصفه لينا بأنه حافلة مجانية (complimentary shuttle) دون أي رسوم."
    }
  },
  {
    "id": "step-l-067",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-15",
    "prompt": "Where does the airport shuttle pick up hotel guests?",
    "options": [
      "Terminal 1, Door 2",
      "Terminal 2, Door 4",
      "Terminal 4, Door 2",
      "Outside the arrivals parking garage"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "The shuttle departs every thirty minutes until midnight from Terminal 2, Door 4.",
      "ar": "تنطلق الحافلة كل ثلاثين دقيقة حتى منتصف الليل من الصالة 2، البوابة 4."
    }
  },
  {
    "id": "step-l-068",
    "section": "listening",
    "subtopic": "Next Action",
    "difficulty": "easy",
    "clipId": "clip-15",
    "prompt": "What should Badr do after collecting his luggage at the airport?",
    "options": [
      "Call the hotel front desk again",
      "Wait inside Terminal 1",
      "Send a text message to the concierge number",
      "Present his printed booking confirmation to the driver"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Lina instructs him to text the concierge number once he collects his luggage.",
      "ar": "تطلب منه لينا إرسال رسالة نصية إلى رقم الكونسيرج فور استلام أمتعته."
    }
  },
  {
    "id": "step-l-069",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-16",
    "prompt": "Why was Dina's student portal account temporarily locked?",
    "options": [
      "She had unpaid tuition fees.",
      "The portal was undergoing scheduled maintenance.",
      "She logged in from two devices simultaneously.",
      "She entered an incorrect password three times."
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "Majed explains that the system locks accounts automatically after three failed password attempts as a security measure.",
      "ar": "يوضح ماجد أن النظام يُقفل الحساب تلقائياً بعد ثلاث محاولات خاطئة كإجراء أمني."
    }
  },
  {
    "id": "step-l-070",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-16",
    "prompt": "Why did Dina's old password stop working?",
    "options": [
      "The university enforced a mandatory semester password reset.",
      "Someone hacked her student email.",
      "She accidentally turned on Caps Lock.",
      "Her browser deleted her saved credentials."
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "Majed mentions an email sent yesterday about the mandatory semester password reset, which Dina missed.",
      "ar": "يذكر ماجد أن الجامعة أرسلت بريداً أمس بشأن إعادة تعيين كلمة المرور الإلزامية للفصل الدراسي."
    }
  },
  {
    "id": "step-l-071",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-16",
    "prompt": "How will Majed verify Dina's identity to let her reset her password?",
    "options": [
      "By asking her to visit the IT office with her student ID",
      "By sending a one-time verification code to her registered phone",
      "By emailing her a temporary password",
      "By asking three security questions over the phone"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "Majed says he will unlock her account and send a one-time verification code to her registered phone number.",
      "ar": "سيفتح ماجد الحساب ويرسل رمز تحقق لمرة واحدة إلى رقم هاتفها المسجل."
    }
  },
  {
    "id": "step-l-072",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-16",
    "prompt": "What requirements must Dina's new password meet?",
    "options": [
      "At least eight characters with two uppercase letters",
      "At least twelve characters without any numbers",
      "At least ten characters including a symbol",
      "Exactly ten letters and no punctuation"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Majed specifies that the new password must be at least ten characters long and include a symbol.",
      "ar": "يشترط ماجد أن تتكون كلمة المرور الجديدة من عشرة أحرف على الأقل وتتضمن رمزاً."
    }
  },
  {
    "id": "step-l-073",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-17",
    "prompt": "Why could SwiftLine Express not deliver Waleed's package today?",
    "options": [
      "No one answered the door when the driver knocked.",
      "The apartment number was illegible.",
      "The package was damaged in transit.",
      "The shipping label was missing the building number."
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "The label showed Olaya Street and Apartment 12 but omitted the building number (Building 47).",
      "ar": "كان العنوان على الملصق يفتقد رقم المبنى، إذ تضمّن اسم الشارع ورقم الشقة فقط."
    }
  },
  {
    "id": "step-l-074",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-17",
    "prompt": "What is Waleed's complete building number on Olaya Street?",
    "options": [
      "Building 12",
      "Building 42",
      "Building 47",
      "Building 88"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Waleed confirms the address is Building 47 on Olaya Street.",
      "ar": "يؤكد وليد أن العنوان هو المبنى رقم 47 في شارع العليا."
    }
  },
  {
    "id": "step-l-075",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-17",
    "prompt": "Why does Waleed ask to pick up the parcel at the Al-Muruj branch instead?",
    "options": [
      "The branch is closer to his apartment than Olaya Street.",
      "He will be at work tomorrow until five o'clock.",
      "He wants to avoid a redelivery fee.",
      "He is leaving the city tonight."
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "Waleed says he will be at his workplace tomorrow until five, so picking it up at the branch is more convenient.",
      "ar": "يوضح وليد أنه سيكون في مقر عمله غداً حتى الخامسة، لذا يفضل استلام الطرد من الفرع."
    }
  },
  {
    "id": "step-l-076",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-17",
    "prompt": "When will the package be ready for collection at Al-Muruj?",
    "options": [
      "Tonight at seven o'clock",
      "Tomorrow morning at eight",
      "Tomorrow after noon",
      "In five business days"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "The agent says it will be ready after noon tomorrow at no extra cost.",
      "ar": "تخبره الموظفة أن الطرد سيكون جاهزاً للاستلام بعد الظهر غداً دون تكلفة إضافية."
    }
  },
  {
    "id": "step-l-077",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-17",
    "prompt": "What must Waleed bring to collect his package, and how long will the branch hold it?",
    "options": [
      "His tracking receipt; held for three days",
      "His work badge; held for two days",
      "His credit card; held for seven days",
      "His national ID; held for five days"
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "The branch will hold the parcel for five days, and Waleed must bring his national ID.",
      "ar": "سيحتفظ الفرع بالطرد لمدة خمسة أيام ويجب على وليد إحضار الهوية الوطنية."
    }
  },
  {
    "id": "step-l-078",
    "section": "listening",
    "subtopic": "Purpose",
    "difficulty": "easy",
    "clipId": "clip-18",
    "prompt": "Why does Noura want to pause her gym membership?",
    "options": [
      "She is attending a six-week work training program abroad.",
      "She injured her knee during a workout.",
      "She is moving to a new neighborhood.",
      "She wants to switch to a monthly plan."
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "Noura says she is leaving next Sunday for a six-week work training program abroad.",
      "ar": "تذكر نورة أنها ستسافر الأحد المقبل لحضور برنامج تدريبي عملي لمدة ستة أسابيع في الخارج."
    }
  },
  {
    "id": "step-l-079",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-18",
    "prompt": "What are the conditions for an annual member's free membership freeze?",
    "options": [
      "Up to thirty days per year, minimum one week",
      "Up to sixty days per year, minimum two weeks",
      "Up to ninety days per year, with a small processing fee",
      "Unlimited freezes if a flight ticket is uploaded"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "Annual members receive up to sixty days of free freeze time per year, provided each pause lasts at least two weeks.",
      "ar": "يحصل أصحاب الاشتراك السنوي على تجميد مجاني حتى ستين يوماً سنوياً بشرط ألا تقل مدة التجميد عن أسبوعين."
    }
  },
  {
    "id": "step-l-080",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-18",
    "prompt": "How should Noura submit her freeze request?",
    "options": [
      "By signing a paper form at the front desk",
      "By emailing a copy of her boarding pass",
      "Through the gym's member app at least 48 hours before departure",
      "By calling the manager on the day she leaves"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "She does not need to visit in person; she simply submits the dates in the member app at least 48 hours before leaving.",
      "ar": "يمكنها تقديم تواريخ التجميد عبر تطبيق الأعضاء قبل المغادرة بثمانٍ وأربعين ساعة على الأقل دون الحاجة للحضور."
    }
  },
  {
    "id": "step-l-081",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-18",
    "prompt": "What happens to Noura's membership expiration date once the freeze is applied?",
    "options": [
      "It stays unchanged, but she gets a partial refund.",
      "It converts into guest passes for friends.",
      "It resets to a brand-new twelve-month term.",
      "It automatically extends by six weeks."
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "The staff member confirms her expiration date will automatically extend by six weeks.",
      "ar": "يؤكد الموظف أن تاريخ انتهاء الاشتراك سيمتد تلقائياً بمقدار ستة أسابيع."
    }
  },
  {
    "id": "step-l-082",
    "section": "listening",
    "subtopic": "Main Idea",
    "difficulty": "easy",
    "clipId": "clip-19",
    "prompt": "What is the main purpose of Nurse Mariam's voicemail?",
    "options": [
      "To share Mr. Hassan's lab test results and follow-up plan",
      "To remind Mr. Hassan to fast before his Monday blood test",
      "To reschedule an overdue physical exam",
      "To inform Mr. Hassan that the pharmacy is closed"
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "Nurse Mariam reports the results of Monday's routine blood test and explains Dr. Al-Zahrani's prescription and recheck plan.",
      "ar": "تُبلغ الممرضة مريم الأستاذ حسن بنتائج فحص الدم الروتيني وخطة العلاج والمتابعة."
    }
  },
  {
    "id": "step-l-083",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-19",
    "prompt": "Which result from Mr. Hassan's blood test was slightly below normal?",
    "options": [
      "His cholesterol level",
      "His vitamin D level",
      "His blood sugar level",
      "His iron level"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "Cholesterol and blood sugar were completely normal, while his vitamin D level came back slightly low.",
      "ar": "جاءت نتائج الكوليسترول وسكر الدم طبيعية تماماً، بينما كان مستوى فيتامين د منخفضاً قليلاً."
    }
  },
  {
    "id": "step-l-084",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-19",
    "prompt": "What has Dr. Al-Zahrani arranged for Mr. Hassan?",
    "options": [
      "A daily iron injection at the clinic",
      "A referral to a nutrition specialist",
      "A weekly vitamin D supplement sent to his pharmacy",
      "A repeat blood draw tomorrow morning"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "The doctor sent a prescription for a weekly vitamin D supplement to Mr. Hassan's pharmacy.",
      "ar": "أرسل الطبيب وصفة لمكمل فيتامين د أسبوعي إلى الصيدلية."
    }
  },
  {
    "id": "step-l-085",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-19",
    "prompt": "When does the doctor want Mr. Hassan to come back for a quick recheck?",
    "options": [
      "In one week",
      "In one month",
      "In three months",
      "In six months"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Dr. Al-Zahrani would like to see him for a quick recheck in three months.",
      "ar": "يرغب الطبيب في رؤيته لفحص متابعة سريع بعد ثلاثة أشهر."
    }
  },
  {
    "id": "step-l-086",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-20",
    "prompt": "How many people are attending the university architecture workshop?",
    "options": [
      "Twenty-five",
      "Thirty",
      "Thirty-five",
      "Forty"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Hanan states she is coordinating the workshop for thirty-five attendees next Monday.",
      "ar": "تذكر حنان أنها تنسق الورشة لخمسة وثلاثين مشاركاً يوم الإثنين المقبل."
    }
  },
  {
    "id": "step-l-087",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-20",
    "prompt": "What is included in each forty-riyal executive lunch box?",
    "options": [
      "Soup, pasta, cake, and coffee",
      "A grilled sandwich, quinoa salad, seasonal fruit, and bottled water",
      "Rice, grilled chicken, dates, and juice",
      "Two pastries, yogurt, and iced tea"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "The caterer describes the executive box as containing a grilled sandwich, quinoa salad, seasonal fruit, and bottled water.",
      "ar": "يوضح متعهد الضيافة أن الوجبة تتضمن شطيرة مشوية وسلطة كينوا وفاكهة موسمية ومياهاً معبأة."
    }
  },
  {
    "id": "step-l-088",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-20",
    "prompt": "Why does Hanan insist that all desserts be completely nut-free?",
    "options": [
      "University policy bans nuts in all lecture halls.",
      "Nut-free desserts cost less per box.",
      "One of the workshop speakers has a severe nut allergy.",
      "Several students dislike almonds and walnuts."
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Hanan explains that one speaker has a severe nut allergy, so all desserts must be nut-free.",
      "ar": "توضح حنان أن أحد المتحدثين يعاني من حساسية شديدة تجاه المكسرات."
    }
  },
  {
    "id": "step-l-089",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-20",
    "prompt": "Why does Cedar Kitchen Catering waive the delivery fee?",
    "options": [
      "The workshop is hosted by a university partner.",
      "Hanan paid in full over the phone.",
      "Delivery is scheduled before noon.",
      "The order is for more than twenty-five guests."
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "The caterer waives the delivery fee because the order exceeds twenty-five guests.",
      "ar": "يُلغي المتعهد رسوم التوصيل لأن الطلب يتجاوز خمسة وعشرين ضيفاً."
    }
  },
  {
    "id": "step-l-090",
    "section": "listening",
    "subtopic": "Next Action",
    "difficulty": "easy",
    "clipId": "clip-20",
    "prompt": "By when must Hanan confirm the final number of attendees?",
    "options": [
      "Thursday noon",
      "Wednesday evening",
      "Sunday afternoon",
      "Monday at 12:15 p.m."
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "The caterer asks for final headcount confirmation by Thursday noon.",
      "ar": "يطلب المتعهد تأكيد العدد النهائي للحضور بحلول ظهر يوم الخميس."
    }
  },
  {
    "id": "step-l-091",
    "section": "listening",
    "subtopic": "Main Idea",
    "difficulty": "easy",
    "clipId": "clip-21",
    "prompt": "What phenomenon is the urban planning professor explaining?",
    "options": [
      "Why coastal cities receive more winter rain",
      "Why densely built cities stay noticeably warmer than nearby rural areas",
      "How underground subways generate street-level heat",
      "Why suburban homes cost less to air-condition"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "The lecture explains the urban heat island effect—why cities measure three to five degrees warmer than surrounding rural areas.",
      "ar": "تشرح المحاضرة ظاهرة الجزر الحرارية الحضرية التي تجعل المدن أدفأ من المناطق الريفية المجاورة."
    }
  },
  {
    "id": "step-l-092",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-21",
    "prompt": "How much warmer can densely built cities be compared to rural surroundings?",
    "options": [
      "One to two degrees",
      "Three to five degrees",
      "Six to eight degrees",
      "Nearly ten degrees"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "The professor notes cities often measure three to five degrees warmer, especially after sunset.",
      "ar": "يذكر الأستاذ أن المدن تسجل غالباً حرارة أعلى بثلاث إلى خمس درجات خاصة بعد الغروب."
    }
  },
  {
    "id": "step-l-093",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-21",
    "prompt": "According to the professor, what role do dark asphalt roads and concrete roofs play?",
    "options": [
      "They reflect sunlight back into the upper atmosphere.",
      "They prevent rainwater from evaporating.",
      "They trap cool air near the ground.",
      "They absorb solar radiation all afternoon and release heat slowly overnight."
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "Dark asphalt and concrete absorb solar radiation during the afternoon and release that stored heat slowly overnight.",
      "ar": "يمتص الإسفلت الداكن والخرسانة الإشعاع الشمسي نهاراً ويطلقان الحرارة المخزنة ببطء طوال الليل."
    }
  },
  {
    "id": "step-l-094",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-21",
    "prompt": "What advantage of reflective white roofs does the professor acknowledge?",
    "options": [
      "They are less expensive and bounce sunlight away immediately.",
      "They absorb heavy storm runoff better than soil.",
      "They eliminate the need for indoor insulation.",
      "They last twice as long as concrete slabs."
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "The professor says white reflective coatings are cheaper and bounce sunlight away immediately.",
      "ar": "يوضح الأستاذ أن الطلاء الأبيض العاكس أقل تكلفة ويعكس ضوء الشمس مباشرة."
    }
  },
  {
    "id": "step-l-095",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "hard",
    "clipId": "clip-21",
    "prompt": "Besides cooling rooftops, what two additional benefits do planted green roofs offer?",
    "options": [
      "Generating solar power and reducing street noise",
      "Insulating buildings and absorbing sudden rainwater runoff",
      "Lowering property taxes and filtering indoor air",
      "Increasing roof weight stability and blocking wind"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "Green roofs insulate buildings and absorb sudden rainwater runoff in addition to lowering rooftop temperatures.",
      "ar": "توفّر الأسطح الخضراء عزلاً حرارياً للمباني وتمتص مياه الأمطار المفاجئة إضافةً إلى خفض حرارة السطح."
    }
  },
  {
    "id": "step-l-096",
    "section": "listening",
    "subtopic": "Main Idea",
    "difficulty": "easy",
    "clipId": "clip-22",
    "prompt": "What common student misconception does the lecturer challenge?",
    "options": [
      "That morning classes are harder than afternoon classes",
      "That taking handwritten notes is better than typing",
      "That staying awake all night before an exam improves learning",
      "That caffeine has no effect on concentration"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "The lecturer challenges the assumption that staying awake all night buys extra learning time, emphasizing sleep's active role in memory.",
      "ar": "تفند المحاضِرة الاعتقاد السائد بأن السهر طوال الليل قبل الامتحان يزيد التعلم، مؤكدة الدور النشط للنوم."
    }
  },
  {
    "id": "step-l-097",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "hard",
    "clipId": "clip-22",
    "prompt": "What occurs during deep slow-wave sleep?",
    "options": [
      "The brain erases all short-term memories from the previous day.",
      "Students rehearse visual dreams without affecting factual memory.",
      "The body stops producing neural activity altogether.",
      "The brain transfers fragile short-term traces from the hippocampus into long-term storage in the cortex."
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "During deep slow-wave sleep, the brain replays neural patterns and moves short-term traces from the hippocampus to long-term cortical storage.",
      "ar": "خلال النوم العميق البطيء الموجات، ينقل الدماغ الآثار قصيرة المدى من الحُصين إلى التخزين طويل المدى في القشرة الدماغية."
    }
  },
  {
    "id": "step-l-098",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-22",
    "prompt": "How does REM sleep contribute to learning later in the night?",
    "options": [
      "It links newly learned facts with older knowledge, aiding creative problem-solving.",
      "It lowers heart rate before waking.",
      "It prevents distraction during the next day's lectures.",
      "It replaces the need for reviewing textbooks."
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "REM sleep connects newly learned facts with older knowledge, improving creative problem-solving.",
      "ar": "يربط نوم حركة العين السريعة (REM) المعلومات الجديدة بالمعرفة السابقة مما يحسن حل المشكلات الإبداعي."
    }
  },
  {
    "id": "step-l-099",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-22",
    "prompt": "In controlled trials, how much better did well-rested students perform compared to sleep-deprived peers?",
    "options": [
      "About ten percent better",
      "Nearly thirty percent more complex terms recalled",
      "Exactly fifty percent higher exam scores",
      "Twice as fast on multiple-choice quizzes"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "Students who slept eight hours recalled nearly thirty percent more complex terms than sleep-deprived peers who studied the same notes.",
      "ar": "استعاد الطلاب الذين ناموا ثماني ساعات نحو ثلاثين بالمئة أكثر من المصطلحات المعقدة مقارنة بالساهرين."
    }
  },
  {
    "id": "step-l-100",
    "section": "listening",
    "subtopic": "Inference",
    "difficulty": "medium",
    "clipId": "clip-22",
    "prompt": "Which study habit would the lecturer most likely endorse before a major exam?",
    "options": [
      "Studying continuously until sunrise with energy drinks",
      "Sleeping only during the afternoon and studying all night",
      "Reviewing notes in the evening and getting a full eight hours of sleep",
      "Skipping review sessions whenever feeling tired"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Because both slow-wave and REM sleep consolidate and integrate studied material, resting a full eight hours after studying maximizes recall.",
      "ar": "بما أن مراحل النوم المختلفة ترسّخ المعلومات وتربطها، فإن المذاكرة ثم النوم ثماني ساعات كاملة هو الخيار الأفضل."
    }
  },
  {
    "id": "step-l-101",
    "section": "listening",
    "subtopic": "Main Idea",
    "difficulty": "easy",
    "clipId": "clip-23",
    "prompt": "What is the main focus of this environmental engineering talk?",
    "options": [
      "How dams store mountain rainwater",
      "Why agriculture consumes less water than households",
      "The history of shipping lanes in coastal cities",
      "Desalination technologies and managing salty brine byproducts"
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "The professor compares thermal distillation with reverse osmosis and discusses environmental solutions for leftover concentrated brine.",
      "ar": "يناقش الأستاذ تقنيات تحلية مياه البحر وكيفية التعامل البيئي مع المحلول الملحي المركز المتبقي."
    }
  },
  {
    "id": "step-l-102",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-23",
    "prompt": "What was the main drawback of older thermal distillation desalination plants?",
    "options": [
      "They consumed enormous quantities of fossil fuel.",
      "They could only operate during summer months.",
      "They produced water that still tasted salty.",
      "Their membranes tore easily under low pressure."
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "Boiling seawater and condensing steam consumed enormous quantities of fossil fuel.",
      "ar": "كانت محطات التقطير الحراري القديمة تستهلك كميات هائلة من الوقود الأحفوري."
    }
  },
  {
    "id": "step-l-103",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-23",
    "prompt": "How does reverse osmosis remove salt from seawater?",
    "options": [
      "By freezing seawater into pure ice crystals",
      "By pushing seawater under high pressure through semipermeable membranes",
      "By adding chemical neutralizers to open reservoirs",
      "By evaporating water in shallow solar ponds"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "Reverse osmosis forces seawater under high pressure through semipermeable membranes that block salt ions.",
      "ar": "يدفع التناضح العكسي مياه البحر تحت ضغط عالٍ عبر أغشية شبه نفاذة تمنع مرور أيونات الملح."
    }
  },
  {
    "id": "step-l-104",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-23",
    "prompt": "How do engineers currently reduce the ecological impact of concentrated brine?",
    "options": [
      "By burying it inside desert sand dunes",
      "By shipping it to neighboring countries",
      "By diluting it carefully before dispersing it offshore",
      "By pumping it into municipal storm drains"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Engineers dilute concentrated brine carefully before dispersing it offshore.",
      "ar": "يقوم المهندسون بتخفيف المحلول الملحي بعناية قبل تصريفه وتشتيته بعيداً عن الشاطئ."
    }
  },
  {
    "id": "step-l-105",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "hard",
    "clipId": "clip-23",
    "prompt": "Which two valuable minerals are researchers trying to extract from desalination brine?",
    "options": [
      "Iron and copper",
      "Gold and silver",
      "Calcium and zinc",
      "Magnesium and lithium"
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "Emerging research aims to recover valuable minerals like magnesium and lithium directly from the brine.",
      "ar": "تهدف الأبحاث الحديثة إلى استخلاص معادن قيّمة مثل المغنيسيوم والليثيوم مباشرة من المحلول الملحي."
    }
  },
  {
    "id": "step-l-106",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-24",
    "prompt": "Who decoded the honeybee waggle dance in the 1940s?",
    "options": [
      "Karl von Frisch",
      "Charles Darwin",
      "Gregor Mendel",
      "Louis Pasteur"
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "Austrian biologist Karl von Frisch decoded the honeybee waggle dance in the 1940s.",
      "ar": "فكّ عالم الأحياء النمساوي كارل فون فريش شفرة رقصة النحل في أربعينيات القرن الماضي."
    }
  },
  {
    "id": "step-l-107",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-24",
    "prompt": "When does a scout bee perform the figure-eight waggle dance?",
    "options": [
      "Whenever predators approach the hive entrance",
      "When she discovers a rich flower patch more than 100 meters away",
      "Only during winter hibernation inside the hive",
      "When flowers are located directly outside the hive"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "A scout bee performs the waggle dance after finding a rich patch of flowers more than a hundred meters from the hive.",
      "ar": "تؤدي النحلة الكشافة الرقصة عندما تعثر على منطقة أزهار غنية تبعد أكثر من مئة متر عن الخلية."
    }
  },
  {
    "id": "step-l-108",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "hard",
    "clipId": "clip-24",
    "prompt": "How does the scout bee communicate the direction of the flowers?",
    "options": [
      "By the loudness of her wing beats",
      "By flying out and physically leading every worker bee",
      "By the angle of the straight central run relative to vertical (straight up) and the sun",
      "By releasing a scent trail along the ground"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "The angle of the straight central run relative to straight up indicates the flower patch's direction relative to the sun.",
      "ar": "تشير زاوية المسار المركزي المستقيم بالنسبة للاتجاه العمودي إلى اتجاه الأزهار نسبةً إلى الشمس."
    }
  },
  {
    "id": "step-l-109",
    "section": "listening",
    "subtopic": "Inference",
    "difficulty": "hard",
    "clipId": "clip-24",
    "prompt": "If a scout bee's waggle run lasts about three seconds, roughly how far away is the food source?",
    "options": [
      "About 300 meters",
      "About 1 kilometer",
      "About 3 kilometers",
      "About 10 kilometers"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "The lecturer states that the waggle duration equals roughly one second per kilometer, so three seconds represents about three kilometers.",
      "ar": "توضح المحاضِرة أن مدة الاهتزاز تعادل تقريباً ثانية واحدة لكل كيلومتر، لذا تشير ثلاث ثوانٍ إلى نحو ثلاثة كيلومترات."
    }
  },
  {
    "id": "step-l-110",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-25",
    "prompt": "How are microplastics defined by size in the lecture?",
    "options": [
      "Fragments smaller than five millimeters across",
      "Fragments smaller than five centimeters",
      "Only plastics invisible under a microscope",
      "Floating bottles broken into halves"
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "The professor defines microplastics as plastic fragments smaller than five millimeters across.",
      "ar": "يعرّف الأستاذ اللدائن الدقيقة بأنها شظايا بلاستيكية يقل قطرها عن خمسة مليمترات."
    }
  },
  {
    "id": "step-l-111",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-25",
    "prompt": "Besides the breakdown of larger debris, what major source of microplastics does the professor identify?",
    "options": [
      "Cargo ship hull paint peeling off at ports",
      "Synthetic fibers shed from polyester clothing during laundry cycles",
      "Salt evaporating from coastal marshes",
      "Biodegradable paper packaging dissolving in rain"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "Microscopic synthetic fibers shed from polyester clothing during laundry cycles enter wastewater directly.",
      "ar": "تتسرب ألياف صناعية دقيقة من ملابس البوليستر أثناء الغسيل مباشرة إلى مياه الصرف."
    }
  },
  {
    "id": "step-l-112",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-25",
    "prompt": "How effective are conventional wastewater treatment plants at stopping microfibers?",
    "options": [
      "They block one hundred percent of synthetic fibers.",
      "They cannot trap any plastic particles at all.",
      "They catch most particles, yet millions of tiny fibers still escape daily.",
      "They convert microplastics into harmless organic matter."
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "Conventional plants catch most particles, but millions of tiny fibers still slip through every day.",
      "ar": "تحجز المحطات التقليدية معظم الجسيمات، إلا أن ملايين الألياف الدقيقة لا تزال تتسرب يومياً."
    }
  },
  {
    "id": "step-l-113",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-25",
    "prompt": "Why do mussels ingest microplastic fibers in coastal waters?",
    "options": [
      "They are attracted to the bright dye colors.",
      "The fibers attach to mussel shells during low tide.",
      "Microplastics taste identical to sea salt.",
      "As filter-feeders, they mistake the tiny fibers for plankton."
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "Filter-feeding organisms like mussels mistake the microscopic fibers for plankton.",
      "ar": "الكائنات التي تتغذى بالترشيح مثل بلح البحر تخطئ بين الألياف الدقيقة والعوالق الغذائية."
    }
  },
  {
    "id": "step-l-114",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-25",
    "prompt": "What practical engineering solution are scientists advocating?",
    "options": [
      "Building fine microfiber filters directly into household washing machines",
      "Banning all cotton garments",
      "Closing coastal fishing harbors for five years",
      "Replacing ocean buoys with wooden floats"
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "Scientists are pushing for fine microfiber filters built right into household washing machines.",
      "ar": "يدعو العلماء إلى دمج مرشحات دقيقة للألياف داخل الغسالات المنزلية نفسها."
    }
  },
  {
    "id": "step-l-115",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-26",
    "prompt": "Into how many zones do you divide a page in the Cornell note-taking method?",
    "options": [
      "Two equal columns",
      "Three unequal zones",
      "Four numbered quadrants",
      "Five color-coded rows"
    ],
    "correctIndex": 1,
    "explanation": {
      "en": "Each notebook page is divided into three unequal zones: a wide right column, a narrow left margin, and a short bottom summary band.",
      "ar": "تُقسم الصفحة في طريقة كورنيل إلى ثلاث مناطق غير متساوية: عمود أيمن عريض وهامش أيسر ضيق وشريط تلخيص سفلي."
    }
  },
  {
    "id": "step-l-116",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "easy",
    "clipId": "clip-26",
    "prompt": "What goes into the narrow left margin of a Cornell page?",
    "options": [
      "Full word-for-word lecture transcripts",
      "A two-sentence chapter summary",
      "Key terms and self-test questions",
      "Diagrams copied from the textbook"
    ],
    "correctIndex": 2,
    "explanation": {
      "en": "The narrow left margin holds key terms and self-test questions (cues), while the bottom band holds the two-sentence summary.",
      "ar": "يُخصص الهامش الأيسر الضيق للمصطلحات المفتاحية وأسئلة الاختبار الذاتي."
    }
  },
  {
    "id": "step-l-117",
    "section": "listening",
    "subtopic": "Specific Detail",
    "difficulty": "medium",
    "clipId": "clip-26",
    "prompt": "Within what time frame after class should students complete the cue column and summary?",
    "options": [
      "Within ten minutes",
      "The night before the midterm exam",
      "One week later before the quiz",
      "Within twenty-four hours"
    ],
    "correctIndex": 3,
    "explanation": {
      "en": "The lecturer calls the step within twenty-four hours of class crucial for filling in the cue column and summary from memory.",
      "ar": "تؤكد المحاضِرة أن الخطوة الحاسمة هي إكمال عمود التلميحات والملخص من الذاكرة خلال أربع وعشرين ساعة من المحاضرة."
    }
  },
  {
    "id": "step-l-118",
    "section": "listening",
    "subtopic": "Main Idea",
    "difficulty": "medium",
    "clipId": "clip-26",
    "prompt": "Why does the Cornell method lead to stronger retention than simply rereading highlighted notes?",
    "options": [
      "It forces students to cover their notes and practice active recall.",
      "It requires writing every lecture twice on separate notebooks.",
      "It eliminates the need to attend review sessions.",
      "It uses colorful highlighters to stimulate visual memory."
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "Covering the right-hand notes to quiz yourself using the left cues uses active recall, which builds far stronger retention than passive rereading.",
      "ar": "تغطية العمود الأيمن واختبار النفس باستخدام أسئلة الهامش الأيسر تعتمد على الاسترجاع النشط وهو أقوى بكثير من إعادة القراءة السلبية."
    }
  }
];
