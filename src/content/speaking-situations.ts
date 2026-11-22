import type { Bilingual } from "./lesson-types";

export const SPEAKING_CATEGORIES = ["everyday", "travel", "work", "study", "ielts"] as const;
export type SpeakingCategory = (typeof SPEAKING_CATEGORIES)[number];
export interface SpeakingSituation {
  id: string;
  title: Bilingual;
  category: SpeakingCategory;
  level: string;
  role: Bilingual;
  turns: { prompt: string; model: string }[];
}

export const SPEAKING_SITUATIONS: SpeakingSituation[] = [
  {
    id: "cafe",
    title: {
      en: "At a café",
      ar: "في المقهى",
    },
    category: "everyday",
    level: "A1",
    role: {
      en: "Barista",
      ar: "موظف المقهى",
    },
    turns: [
      {
        prompt: "What would you like to order?",
        model: "I would like a small coffee and a sandwich, please.",
      },
      {
        prompt: "Would you like to eat here or take it away?",
        model: "I would like to eat here. Could I have a glass of water too?",
      },
      {
        prompt: "We have no chicken sandwiches today. What would you prefer?",
        model: "A cheese sandwich is fine. How much is it altogether?",
      },
    ],
  },
  {
    id: "groceries",
    title: {
      en: "Buying groceries",
      ar: "شراء البقالة",
    },
    category: "everyday",
    level: "A1",
    role: {
      en: "Shop assistant",
      ar: "مساعد المتجر",
    },
    turns: [
      {
        prompt: "What are you looking for today?",
        model: "I am looking for some apples and a bottle of milk.",
      },
      {
        prompt: "How many apples would you like?",
        model: "Six apples, please. Are they fresh today?",
      },
      {
        prompt: "Would you like a bag?",
        model: "Yes, please. Can I pay by card?",
      },
    ],
  },
  {
    id: "introductions",
    title: {
      en: "Meeting a neighbour",
      ar: "لقاء جار جديد",
    },
    category: "everyday",
    level: "A1",
    role: {
      en: "Neighbour",
      ar: "الجار",
    },
    turns: [
      {
        prompt: "Hello, I have just moved here. What is your name?",
        model: "Hello, I am Sara. Welcome to the building.",
      },
      {
        prompt: "How long have you lived here?",
        model: "I have lived here for two years. I like the neighbourhood.",
      },
      {
        prompt: "Is there a good shop nearby?",
        model: "Yes, there is a small shop near the park. I can show you where it is.",
      },
    ],
  },
  {
    id: "doctor",
    title: {
      en: "At the doctor’s",
      ar: "عند الطبيب",
    },
    category: "everyday",
    level: "A2",
    role: {
      en: "Doctor",
      ar: "الطبيب",
    },
    turns: [
      {
        prompt: "What brings you here today?",
        model: "I have had a sore throat for two days and I feel tired.",
      },
      {
        prompt: "Have you noticed anything else?",
        model: "I have a mild cough, but I do not have a fever.",
      },
      {
        prompt: "How is it affecting your routine?",
        model: "It is difficult to sleep. Could you explain what I should do next?",
      },
    ],
  },
  {
    id: "directions",
    title: {
      en: "Asking for directions",
      ar: "السؤال عن الاتجاهات",
    },
    category: "everyday",
    level: "A1",
    role: {
      en: "Local resident",
      ar: "أحد السكان",
    },
    turns: [
      {
        prompt: "Where are you trying to go?",
        model: "I am looking for the library. Is it near here?",
      },
      {
        prompt: "Would you prefer to walk or take a bus?",
        model: "I would prefer to walk if it is not too far.",
      },
      {
        prompt: "You need to cross the square and turn left. Is that clear?",
        model: "Yes, cross the square and turn left. Which building is the library?",
      },
    ],
  },
  {
    id: "restaurant",
    title: {
      en: "A restaurant mix-up",
      ar: "خطأ في المطعم",
    },
    category: "everyday",
    level: "A2",
    role: {
      en: "Server",
      ar: "النادل",
    },
    turns: [
      {
        prompt: "Is everything all right with your meal?",
        model: "I ordered vegetable soup, but this seems to contain chicken.",
      },
      {
        prompt: "I am sorry. Would you like a replacement?",
        model: "Yes, please. I do not eat meat, so vegetable soup would be best.",
      },
      {
        prompt: "It will take ten minutes. Can I offer you something meanwhile?",
        model: "Thank you. Some bread would be lovely while I wait.",
      },
    ],
  },
  {
    id: "repair",
    title: {
      en: "Arranging a repair",
      ar: "ترتيب إصلاح",
    },
    category: "everyday",
    level: "B1",
    role: {
      en: "Repair technician",
      ar: "فني الصيانة",
    },
    turns: [
      {
        prompt: "What problem are you having with the washing machine?",
        model: "It stops halfway through a cycle and leaves water inside.",
      },
      {
        prompt: "When did this start?",
        model: "It started yesterday. I checked the filter, but that did not help.",
      },
      {
        prompt: "Can I visit on Thursday morning?",
        model: "Thursday morning works for me. Could you give me an estimate of the cost?",
      },
    ],
  },
  {
    id: "invitation",
    title: {
      en: "Inviting a friend",
      ar: "دعوة صديق",
    },
    category: "everyday",
    level: "A2",
    role: {
      en: "Friend",
      ar: "الصديق",
    },
    turns: [
      {
        prompt: "What are you planning for the weekend?",
        model: "I am going to have a picnic at the park on Saturday. Would you like to come?",
      },
      {
        prompt: "What time should we meet?",
        model: "Let us meet near the entrance at eleven. I can bring sandwiches.",
      },
      {
        prompt: "What if it rains?",
        model: "If it rains, we can have lunch at my flat instead.",
      },
    ],
  },
  {
    id: "checkin",
    title: {
      en: "Airport check-in",
      ar: "إنهاء إجراءات المطار",
    },
    category: "travel",
    level: "A2",
    role: {
      en: "Check-in agent",
      ar: "موظف تسجيل السفر",
    },
    turns: [
      {
        prompt: "May I see your passport and booking reference?",
        model: "Certainly. Here is my passport, and my booking reference is ABC123.",
      },
      {
        prompt: "Do you have any bags to check in?",
        model: "Yes, one suitcase. Is it within the weight limit?",
      },
      {
        prompt: "Would you prefer a window or aisle seat?",
        model: "An aisle seat, please. Could you tell me the boarding gate?",
      },
    ],
  },
  {
    id: "hotel",
    title: {
      en: "Checking into a hotel",
      ar: "تسجيل الدخول للفندق",
    },
    category: "travel",
    level: "A2",
    role: {
      en: "Receptionist",
      ar: "موظف الاستقبال",
    },
    turns: [
      {
        prompt: "Do you have a reservation?",
        model: "Yes, I booked a double room for three nights under Ahmed.",
      },
      {
        prompt: "Would you like breakfast included?",
        model: "Yes, please. What time is breakfast served?",
      },
      {
        prompt: "Do you need anything else for your stay?",
        model: "Could I have a quiet room away from the lift?",
      },
    ],
  },
  {
    id: "lost-bag",
    title: {
      en: "Lost luggage",
      ar: "أمتعة مفقودة",
    },
    category: "travel",
    level: "B1",
    role: {
      en: "Baggage agent",
      ar: "موظف الأمتعة",
    },
    turns: [
      {
        prompt: "Can you describe the missing bag?",
        model: "It is a dark green suitcase with a red ribbon on the handle.",
      },
      {
        prompt: "Which flight were you on?",
        model: "I arrived on the evening flight from Amman. Here is my baggage receipt.",
      },
      {
        prompt: "Where should we deliver it if we find it?",
        model: "Please deliver it to the City Hotel. How can I track the search?",
      },
    ],
  },
  {
    id: "train",
    title: {
      en: "Buying a train ticket",
      ar: "شراء تذكرة قطار",
    },
    category: "travel",
    level: "A2",
    role: {
      en: "Ticket agent",
      ar: "موظف التذاكر",
    },
    turns: [
      {
        prompt: "Where would you like to travel?",
        model: "I would like a return ticket to Oxford for tomorrow.",
      },
      {
        prompt: "What time would you like to leave?",
        model: "Around nine in the morning. Is there a direct train?",
      },
      {
        prompt: "Would you prefer the cheaper ticket with a fixed return time?",
        model: "Yes, if I can return at six. What happens if I miss that train?",
      },
    ],
  },
  {
    id: "tour",
    title: {
      en: "Booking a local tour",
      ar: "حجز جولة محلية",
    },
    category: "travel",
    level: "B1",
    role: {
      en: "Tour organiser",
      ar: "منظم الجولة",
    },
    turns: [
      {
        prompt: "What kind of tour interests you?",
        model: "I would like a walking tour about the city’s history.",
      },
      {
        prompt: "How much time do you have?",
        model: "About three hours. I would prefer a small group if possible.",
      },
      {
        prompt: "The route includes stairs. Would that be suitable?",
        model: "I can manage a few stairs, but is there an alternative route for my father?",
      },
    ],
  },
  {
    id: "border",
    title: {
      en: "Explaining a trip",
      ar: "شرح رحلة",
    },
    category: "travel",
    level: "B1",
    role: {
      en: "Immigration officer",
      ar: "موظف الحدود",
    },
    turns: [
      {
        prompt: "What is the purpose of your visit?",
        model: "I am visiting for a holiday and to see a friend.",
      },
      {
        prompt: "How long do you plan to stay?",
        model: "Ten days. I have a return ticket for the twenty-second.",
      },
      {
        prompt: "Where will you be staying?",
        model: "At a hotel near the centre for the first week, then with my friend.",
      },
    ],
  },
  {
    id: "cancelled-flight",
    title: {
      en: "A cancelled flight",
      ar: "رحلة ملغاة",
    },
    category: "travel",
    level: "B2",
    role: {
      en: "Airline agent",
      ar: "موظف الطيران",
    },
    turns: [
      {
        prompt: "Your flight has been cancelled. What arrangements do you need?",
        model: "I need to reach London before tomorrow afternoon for a family event.",
      },
      {
        prompt: "We can offer a flight tomorrow morning with a connection.",
        model: "That could work. Could you confirm the arrival time and baggage arrangements?",
      },
      {
        prompt: "Would you accept a later direct flight instead?",
        model: "Only if it arrives in time. Otherwise I would prefer the connection.",
      },
    ],
  },
  {
    id: "car-rental",
    title: {
      en: "Renting a car",
      ar: "استئجار سيارة",
    },
    category: "travel",
    level: "B1",
    role: {
      en: "Rental agent",
      ar: "موظف التأجير",
    },
    turns: [
      {
        prompt: "What type of car do you need?",
        model: "A small automatic car for four days, mainly for city driving.",
      },
      {
        prompt: "Would you like additional cover?",
        model: "Could you explain what the standard cover excludes before I decide?",
      },
      {
        prompt: "Will you return it to this branch?",
        model: "Yes, on Monday morning. Is there a charge if I return it an hour late?",
      },
    ],
  },
  {
    id: "interview",
    title: {
      en: "A job interview",
      ar: "مقابلة عمل",
    },
    category: "work",
    level: "B1",
    role: {
      en: "Interviewer",
      ar: "المحاور",
    },
    turns: [
      {
        prompt: "Tell me about your relevant experience.",
        model:
          "I worked in customer service for two years, helping customers resolve delivery problems.",
      },
      {
        prompt: "Describe a difficult situation you handled.",
        model:
          "A customer received the wrong order. I listened, arranged a replacement and followed up the next day.",
      },
      {
        prompt: "Why would you like to join our team?",
        model:
          "Your focus on staff training appeals to me. I would like to develop my skills while contributing to the team.",
      },
    ],
  },
  {
    id: "meeting",
    title: {
      en: "Contributing in a meeting",
      ar: "المشاركة في اجتماع",
    },
    category: "work",
    level: "B2",
    role: {
      en: "Team lead",
      ar: "قائد الفريق",
    },
    turns: [
      {
        prompt: "How could we improve the booking process?",
        model: "We could simplify the form and remove questions we do not use.",
      },
      {
        prompt: "What evidence supports that idea?",
        model:
          "Several customers stopped at the longest section, and our support team often explains the same fields.",
      },
      {
        prompt: "What should we do first?",
        model: "Test a shorter version with a small group, then compare completion rates.",
      },
    ],
  },
  {
    id: "deadline",
    title: {
      en: "Negotiating a deadline",
      ar: "التفاوض على موعد نهائي",
    },
    category: "work",
    level: "B2",
    role: {
      en: "Manager",
      ar: "المدير",
    },
    turns: [
      {
        prompt: "Will the report be ready by Friday?",
        model: "The analysis is complete, but I need more time to check the figures.",
      },
      {
        prompt: "What is causing the delay?",
        model:
          "Two departments sent conflicting data, and I do not want to publish an inaccurate report.",
      },
      {
        prompt: "What revised deadline can you commit to?",
        model: "Monday afternoon. I can send the key findings on Friday so planning can continue.",
      },
    ],
  },
  {
    id: "presentation",
    title: {
      en: "Presentation questions",
      ar: "أسئلة العرض التقديمي",
    },
    category: "work",
    level: "B2",
    role: {
      en: "Audience member",
      ar: "أحد الحضور",
    },
    turns: [
      {
        prompt: "What is the main benefit of your proposal?",
        model: "It would reduce repeated data entry and give staff more time for customer support.",
      },
      {
        prompt: "How much would implementation cost?",
        model:
          "There would be an initial training cost, but we expect savings over a year. The estimate needs a pilot.",
      },
      {
        prompt: "What is the greatest risk?",
        model:
          "Poor adoption. We would reduce that risk by involving staff early and providing practical support.",
      },
    ],
  },
  {
    id: "feedback",
    title: {
      en: "Giving constructive feedback",
      ar: "تقديم ملاحظات بناءة",
    },
    category: "work",
    level: "B2",
    role: {
      en: "Colleague",
      ar: "الزميل",
    },
    turns: [
      {
        prompt: "What did you think of my presentation?",
        model: "The main idea was clear, and your opening example was engaging.",
      },
      {
        prompt: "What could I improve?",
        model: "The data slide was quite crowded. Fewer figures might help the audience focus.",
      },
      {
        prompt: "How could I change it?",
        model: "Keep the two key comparisons and move the rest to a handout.",
      },
    ],
  },
  {
    id: "client",
    title: {
      en: "Clarifying a client brief",
      ar: "توضيح طلب العميل",
    },
    category: "work",
    level: "B2",
    role: {
      en: "Client",
      ar: "العميل",
    },
    turns: [
      {
        prompt: "We need a better website. What would you like to know?",
        model: "What should visitors be able to do, and which current problems matter most?",
      },
      {
        prompt: "Our main concern is low booking numbers.",
        model:
          "Could we review where visitors leave the booking process before deciding on changes?",
      },
      {
        prompt: "Can you guarantee an improvement?",
        model:
          "I can propose measurable tests, but I would not guarantee results before understanding the evidence.",
      },
    ],
  },
  {
    id: "negotiation",
    title: {
      en: "Negotiating a contract",
      ar: "التفاوض على عقد",
    },
    category: "work",
    level: "C1",
    role: {
      en: "Supplier",
      ar: "المورد",
    },
    turns: [
      {
        prompt: "What changes would you like to the agreement?",
        model:
          "We would appreciate a clearer service timetable and a defined process for resolving delays.",
      },
      {
        prompt: "We cannot accept unlimited liability.",
        model:
          "I understand. Could we agree a reasonable cap while preserving protection for serious failures?",
      },
      {
        prompt: "How can we move forward?",
        model:
          "Let us document the agreed terms and ask both legal teams to review the remaining point.",
      },
    ],
  },
  {
    id: "mediation",
    title: {
      en: "Mediating disagreement",
      ar: "الوساطة في خلاف",
    },
    category: "work",
    level: "C2",
    role: {
      en: "Project partner",
      ar: "شريك المشروع",
    },
    turns: [
      {
        prompt: "The teams disagree about priorities. How should we proceed?",
        model:
          "First, we should distinguish non-negotiable requirements from preferences and let each team explain its concerns.",
      },
      {
        prompt: "One team insists speed matters most.",
        model:
          "Speed is important, but it should not conceal risks that would make delivery unusable. Can we identify the minimum quality threshold?",
      },
      {
        prompt: "What compromise would you recommend?",
        model:
          "A phased release with a jointly agreed review point would preserve momentum while allowing evidence to guide later decisions.",
      },
    ],
  },
  {
    id: "classroom",
    title: {
      en: "Asking a teacher for help",
      ar: "طلب مساعدة المعلم",
    },
    category: "study",
    level: "A1",
    role: {
      en: "Teacher",
      ar: "المعلم",
    },
    turns: [
      {
        prompt: "Which part do you find difficult?",
        model: "I do not understand the difference between is and are.",
      },
      {
        prompt: "Can you give me an example?",
        model: "I wrote my friends is happy. I think it may be wrong.",
      },
      {
        prompt: "How would you correct it now?",
        model: "My friends are happy, because friends is plural.",
      },
    ],
  },
  {
    id: "library",
    title: {
      en: "At the library desk",
      ar: "عند مكتب المكتبة",
    },
    category: "study",
    level: "A2",
    role: {
      en: "Librarian",
      ar: "أمين المكتبة",
    },
    turns: [
      {
        prompt: "What can I help you find?",
        model: "I need a beginner’s English book with short stories.",
      },
      {
        prompt: "Would you like a printed book or an electronic copy?",
        model: "A printed book, please. Can I borrow it for two weeks?",
      },
      {
        prompt: "Do you have a library card?",
        model: "Not yet. What do I need to get one?",
      },
    ],
  },
  {
    id: "study-group",
    title: {
      en: "Planning a study group",
      ar: "تنظيم مجموعة دراسة",
    },
    category: "study",
    level: "B1",
    role: {
      en: "Classmate",
      ar: "زميل الدراسة",
    },
    turns: [
      {
        prompt: "How should we prepare for the exam together?",
        model:
          "We could review one topic each evening and explain difficult questions to each other.",
      },
      {
        prompt: "What time would work for you?",
        model: "After six on Tuesday and Thursday. We should keep each session to an hour.",
      },
      {
        prompt: "How can we avoid wasting time?",
        model:
          "Agree a short agenda and keep our phones away unless we need them for the exercises.",
      },
    ],
  },
  {
    id: "seminar",
    title: {
      en: "A seminar discussion",
      ar: "نقاش في ندوة",
    },
    category: "study",
    level: "C1",
    role: {
      en: "Seminar tutor",
      ar: "مدرس الندوة",
    },
    turns: [
      {
        prompt: "What is your interpretation of the author’s argument?",
        model:
          "The author supports reform but questions whether the evidence justifies immediate implementation.",
      },
      {
        prompt: "Which wording supports your interpretation?",
        model:
          "The recommendation for a trial and the reference to unexplained assumptions suggest caution.",
      },
      {
        prompt: "Could there be another interpretation?",
        model:
          "Possibly. The criticism may concern the method rather than the goal, so I would avoid calling the author entirely opposed.",
      },
    ],
  },
  {
    id: "supervisor",
    title: {
      en: "Meeting a research supervisor",
      ar: "لقاء مشرف البحث",
    },
    category: "study",
    level: "C1",
    role: {
      en: "Supervisor",
      ar: "المشرف",
    },
    turns: [
      {
        prompt: "How is your research progressing?",
        model: "I have completed the interviews, but the sample is narrower than planned.",
      },
      {
        prompt: "How will that affect your conclusions?",
        model:
          "I can describe the experiences of these participants, but I should not generalise them to the entire population.",
      },
      {
        prompt: "What is your next step?",
        model: "Compare themes systematically and make the limitations explicit in the discussion.",
      },
    ],
  },
  {
    id: "scholarship",
    title: {
      en: "A scholarship interview",
      ar: "مقابلة منحة دراسية",
    },
    category: "study",
    level: "B2",
    role: {
      en: "Panel member",
      ar: "عضو اللجنة",
    },
    turns: [
      {
        prompt: "Why are you applying for this scholarship?",
        model:
          "It would allow me to study environmental planning and develop skills relevant to my community.",
      },
      {
        prompt: "How have you shown commitment to that goal?",
        model:
          "I helped organise a local recycling project and learned how important public participation is.",
      },
      {
        prompt: "How would you use the opportunity afterwards?",
        model:
          "I hope to work with local authorities on practical projects and share what I learn with younger students.",
      },
    ],
  },
  {
    id: "debate",
    title: {
      en: "Debating education policy",
      ar: "مناظرة سياسة التعليم",
    },
    category: "study",
    level: "C2",
    role: {
      en: "Debate chair",
      ar: "رئيس المناظرة",
    },
    turns: [
      {
        prompt: "Should all university courses be online?",
        model:
          "Not necessarily. Online access offers flexibility, but some subjects require practical facilities and direct interaction.",
      },
      {
        prompt: "How would you respond to the cost argument?",
        model:
          "Lower delivery costs matter, yet they do not establish educational equivalence. We should compare outcomes and access to support.",
      },
      {
        prompt: "What policy would you defend?",
        model:
          "A flexible model based on the demands of each subject, with transparent standards for both online and in-person teaching.",
      },
    ],
  },
  {
    id: "peer-review",
    title: {
      en: "Reviewing a classmate’s essay",
      ar: "مراجعة مقال زميل",
    },
    category: "study",
    level: "B2",
    role: {
      en: "Classmate",
      ar: "زميل الدراسة",
    },
    turns: [
      {
        prompt: "Is my argument easy to follow?",
        model:
          "Your position is clear, but the second paragraph introduces two ideas without connecting them.",
      },
      {
        prompt: "Which idea needs more support?",
        model:
          "The claim about employment would benefit from an explanation of how the policy creates opportunities.",
      },
      {
        prompt: "What should I revise first?",
        model:
          "Develop that causal link, then check whether the conclusion matches the position in your introduction.",
      },
    ],
  },
  {
    id: "ielts-home",
    title: {
      en: "IELTS: your hometown",
      ar: "آيلتس: مدينتك",
    },
    category: "ielts",
    level: "B1",
    role: {
      en: "Examiner · Part 1",
      ar: "الممتحن · الجزء 1",
    },
    turns: [
      {
        prompt: "What do you like about your hometown?",
        model:
          "I like its friendly atmosphere. People know their neighbours, and there is a lively market near my home.",
      },
      {
        prompt: "Has your hometown changed in recent years?",
        model:
          "Yes, it has grown quickly. There are more shops, though traffic has become heavier.",
      },
      {
        prompt: "Would you like to live there in the future?",
        model: "Probably, because my family is there. However, I might move temporarily for work.",
      },
    ],
  },
  {
    id: "ielts-work",
    title: {
      en: "IELTS: work and study",
      ar: "آيلتس: العمل والدراسة",
    },
    category: "ielts",
    level: "B1",
    role: {
      en: "Examiner · Part 1",
      ar: "الممتحن · الجزء 1",
    },
    turns: [
      {
        prompt: "Do you work or study?",
        model: "I study business at university, and I am in my second year.",
      },
      {
        prompt: "What do you enjoy most about it?",
        model:
          "I enjoy projects where we solve realistic problems because I can apply what I have learned.",
      },
      {
        prompt: "Is there anything you would change?",
        model:
          "I would add more practical experience, such as short placements with local companies.",
      },
    ],
  },
  {
    id: "ielts-person",
    title: {
      en: "IELTS: a person who helped you",
      ar: "آيلتس: شخص ساعدك",
    },
    category: "ielts",
    level: "B2",
    role: {
      en: "Examiner · Part 2",
      ar: "الممتحن · الجزء 2",
    },
    turns: [
      {
        prompt:
          "Describe a person who helped you. Say who, when, what they did, and why it mattered. Take one minute to prepare, then speak for 1–2 minutes.",
        model:
          "I would describe my English teacher. Last year she helped me prepare for a presentation by practising with me after class. I had been nervous about speaking, but her specific feedback made the task manageable. The experience changed how I prepare: I now practise in small stages rather than trying to memorise everything.",
      },
      {
        prompt: "Do you still keep in touch with this person?",
        model:
          "Yes, occasionally. I sent her a message after my first successful university presentation.",
      },
      {
        prompt: "Why do people sometimes hesitate to ask for help?",
        model:
          "They may worry about appearing incapable. A supportive environment can make asking feel normal rather than embarrassing.",
      },
    ],
  },
  {
    id: "ielts-place",
    title: {
      en: "IELTS: a memorable place",
      ar: "آيلتس: مكان لا يُنسى",
    },
    category: "ielts",
    level: "B2",
    role: {
      en: "Examiner · Part 2",
      ar: "الممتحن · الجزء 2",
    },
    turns: [
      {
        prompt:
          "Describe a place you enjoyed visiting: where, when, what you did, and why it was memorable. Prepare for one minute and speak for 1–2 minutes.",
        model:
          "A place I particularly enjoyed was a small coastal town I visited with my family. We walked along the harbour, tried local food and spoke to a fisherman about his work. What made it memorable was the slower pace. I felt I had time to notice things I usually overlook.",
      },
      {
        prompt: "Would you visit it again?",
        model: "Yes, but perhaps outside the busiest season so I could explore more quietly.",
      },
      {
        prompt: "How can tourism affect local communities?",
        model:
          "It can create jobs, but rising prices and overcrowding may make everyday life harder. Planning should consider residents as well as visitors.",
      },
    ],
  },
  {
    id: "ielts-skill",
    title: {
      en: "IELTS: learning a skill",
      ar: "آيلتس: تعلم مهارة",
    },
    category: "ielts",
    level: "B2",
    role: {
      en: "Examiner · Part 2",
      ar: "الممتحن · الجزء 2",
    },
    turns: [
      {
        prompt:
          "Describe a skill you learned: what, how, why, and how it helped. Prepare for one minute and speak for 1–2 minutes.",
        model:
          "I learned to cook simple meals when I moved away to study. At first, I followed short recipes and often made mistakes. Gradually, I understood basic techniques and became more confident. It helped me save money, eat better and share meals with friends.",
      },
      {
        prompt: "Was it difficult to learn?",
        model:
          "Initially, yes. Timing several ingredients was harder than I expected, but practice helped.",
      },
      {
        prompt: "Should schools teach practical skills?",
        model:
          "I think they should provide a foundation, while leaving room for academic subjects. Practical skills can help students become more independent.",
      },
    ],
  },
  {
    id: "ielts-tech",
    title: {
      en: "IELTS: technology and society",
      ar: "آيلتس: التقنية والمجتمع",
    },
    category: "ielts",
    level: "C1",
    role: {
      en: "Examiner · Part 3",
      ar: "الممتحن · الجزء 3",
    },
    turns: [
      {
        prompt: "How has technology changed communication?",
        model:
          "It has made contact faster and more accessible across distances, although speed does not always improve the quality of a conversation.",
      },
      {
        prompt: "Are these changes equally beneficial for everyone?",
        model:
          "No. People without reliable access or digital skills may be excluded, so benefits depend partly on support and infrastructure.",
      },
      {
        prompt: "What responsibilities do technology companies have?",
        model:
          "They should consider privacy and accessibility alongside convenience, and make important choices understandable to users.",
      },
    ],
  },
  {
    id: "ielts-environment",
    title: {
      en: "IELTS: environmental responsibility",
      ar: "آيلتس: المسؤولية البيئية",
    },
    category: "ielts",
    level: "C1",
    role: {
      en: "Examiner · Part 3",
      ar: "الممتحن · الجزء 3",
    },
    turns: [
      {
        prompt: "Who should take responsibility for protecting the environment?",
        model:
          "Responsibility is shared, but governments and businesses have greater power to change systems than individuals alone.",
      },
      {
        prompt: "Can individual actions make a meaningful difference?",
        model:
          "They can, especially when adopted widely, but expecting personal choices to solve structural problems would be unrealistic.",
      },
      {
        prompt: "How could governments encourage change?",
        model:
          "By making sustainable options affordable and convenient, rather than relying only on appeals to personal responsibility.",
      },
    ],
  },
  {
    id: "ielts-culture",
    title: {
      en: "IELTS: culture and change",
      ar: "آيلتس: الثقافة والتغير",
    },
    category: "ielts",
    level: "C2",
    role: {
      en: "Examiner · Part 3",
      ar: "الممتحن · الجزء 3",
    },
    turns: [
      {
        prompt: "Why is preserving cultural heritage important?",
        model:
          "It can give communities continuity and a sense of identity, but preservation should not imply that culture must remain unchanged.",
      },
      {
        prompt: "Can tradition conflict with progress?",
        model:
          "Sometimes, though that framing can be too simplistic. A tradition may adapt to new circumstances while retaining its meaning.",
      },
      {
        prompt: "How should societies decide what to preserve?",
        model:
          "Decisions should involve the people who practise those traditions, not merely outside authorities choosing what appears historically valuable.",
      },
    ],
  },
];
