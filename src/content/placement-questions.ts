import type { CefrLevel } from "./courses";

/**
 * The 60-question placement test: 10 questions for each CEFR level, easiest first.
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
};

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  // ---------- A1 ----------
  { id: "a1-1", level: "A1", prompt: "She ___ a teacher.", options: ["is", "am", "are", "be"] },
  { id: "a1-2", level: "A1", prompt: "I ___ from Jordan.", options: ["am", "is", "are", "be"] },
  { id: "a1-3", level: "A1", prompt: "What is the opposite of “big”?", options: ["small", "tall", "long", "old"] },
  { id: "a1-4", level: "A1", prompt: "There ___ two books on the table.", options: ["are", "is", "am", "be"] },
  { id: "a1-5", level: "A1", prompt: "He ___ coffee every morning.", options: ["drinks", "drink", "drinking", "is drink"] },
  { id: "a1-6", level: "A1", prompt: "___ is your name?", options: ["What", "Who", "Where", "When"] },
  { id: "a1-7", level: "A1", prompt: "We go to school ___ Monday.", options: ["on", "in", "at", "to"] },
  { id: "a1-8", level: "A1", prompt: "This is ___ apple.", options: ["an", "a", "two", "some"] },
  { id: "a1-9", level: "A1", prompt: "My sister ___ like fish.", options: ["doesn't", "don't", "isn't", "aren't"] },
  { id: "a1-10", level: "A1", prompt: "One child, two ___.", options: ["children", "childs", "childes", "childrens"] },

  // ---------- A2 ----------
  { id: "a2-1", level: "A2", prompt: "Yesterday I ___ to the market.", options: ["went", "go", "goes", "gone"] },
  { id: "a2-2", level: "A2", prompt: "She is ___ than her brother.", options: ["taller", "tall", "tallest", "more tall"] },
  { id: "a2-3", level: "A2", prompt: "___ you ever been to London?", options: ["Have", "Did", "Do", "Were"] },
  { id: "a2-4", level: "A2", prompt: "I'm going ___ my grandmother tomorrow.", options: ["to visit", "visit", "visiting", "visited"] },
  { id: "a2-5", level: "A2", prompt: "We were watching TV when the phone ___.", options: ["rang", "ring", "was ringing", "rings"] },
  { id: "a2-6", level: "A2", prompt: "You ___ wear a seatbelt in the car. It's the law.", options: ["must", "can", "might", "would"] },
  { id: "a2-7", level: "A2", prompt: "How ___ water do you drink a day?", options: ["much", "many", "few", "lot"] },
  { id: "a2-8", level: "A2", prompt: "I've lived here ___ 2015.", options: ["since", "for", "from", "during"] },
  { id: "a2-9", level: "A2", prompt: "This is the ___ film I've ever seen.", options: ["best", "good", "better", "most good"] },
  {
    id: "a2-10",
    level: "A2",
    prompt:
      "Read: “The museum opens at 9 a.m. and closes at 5 p.m. It is closed on Mondays.” When can you NOT visit?",
    options: ["Monday afternoon", "Tuesday morning", "Saturday at 10 a.m.", "Friday at 4 p.m."],
  },

  // ---------- B1 ----------
  { id: "b1-1", level: "B1", prompt: "If it rains tomorrow, we ___ at home.", options: ["will stay", "stay", "would stay", "stayed"] },
  { id: "b1-2", level: "B1", prompt: "The letter ___ yesterday.", options: ["was sent", "sent", "has sent", "is sending"] },
  { id: "b1-3", level: "B1", prompt: "She asked me where I ___.", options: ["lived", "live", "am living", "will live"] },
  { id: "b1-4", level: "B1", prompt: "I'm not used to ___ up so early.", options: ["getting", "get", "got", "be getting"] },
  { id: "b1-5", level: "B1", prompt: "He has been working here ___ three years.", options: ["for", "since", "ago", "during"] },
  { id: "b1-6", level: "B1", prompt: "The man ___ car was stolen called the police.", options: ["whose", "who", "which", "whom"] },
  { id: "b1-7", level: "B1", prompt: "I wish I ___ more free time.", options: ["had", "have", "will have", "am having"] },
  { id: "b1-8", level: "B1", prompt: "Please turn ___ the lights when you leave.", options: ["off", "out", "away", "down"] },
  { id: "b1-9", level: "B1", prompt: "Which word is closest in meaning to “reliable”?", options: ["dependable", "expensive", "careless", "famous"] },
  { id: "b1-10", level: "B1", prompt: "By the time we arrived, the film ___.", options: ["had started", "started", "has started", "starts"] },

  // ---------- B2 ----------
  {
    id: "b2-1",
    level: "B2",
    prompt: "If I had known about the meeting, I ___ it.",
    options: ["would have attended", "would attend", "will attend", "had attended"],
  },
  { id: "b2-2", level: "B2", prompt: "She denied ___ the window.", options: ["breaking", "to break", "break", "broke"] },
  { id: "b2-3", level: "B2", prompt: "Hardly ___ the house when it started to rain.", options: ["had I left", "I had left", "I left", "did I leave"] },
  { id: "b2-4", level: "B2", prompt: "The project must ___ by Friday.", options: ["be finished", "finish", "have finish", "finishing"] },
  { id: "b2-5", level: "B2", prompt: "He's very good ___ solving problems.", options: ["at", "in", "on", "for"] },
  { id: "b2-6", level: "B2", prompt: "I'd rather you ___ smoke in here.", options: ["didn't", "don't", "won't", "not"] },
  { id: "b2-7", level: "B2", prompt: "The new policy will ___ affect small businesses.", options: ["adversely", "adverse", "adversity", "adversary"] },
  { id: "b2-8", level: "B2", prompt: "We need to come up ___ a better plan.", options: ["with", "to", "for", "at"] },
  { id: "b2-9", level: "B2", prompt: "Despite ___ tired, she finished the race.", options: ["being", "she was", "to be", "been"] },
  { id: "b2-10", level: "B2", prompt: "She is said ___ the best surgeon in the city.", options: ["to be", "being", "be", "that she is"] },

  // ---------- C1 ----------
  {
    id: "c1-1",
    level: "C1",
    prompt: "Not only ___ late, but he also forgot the documents.",
    options: ["did he arrive", "he arrived", "he did arrive", "arrived he"],
  },
  {
    id: "c1-2",
    level: "C1",
    prompt: "The findings ___ the theory that sleep improves memory.",
    options: ["bear out", "bear with", "bear down", "bear up"],
  },
  {
    id: "c1-3",
    level: "C1",
    prompt: "Had she taken the job, she ___ in Dubai now.",
    options: ["would be living", "would live", "will be living", "had lived"],
  },
  {
    id: "c1-4",
    level: "C1",
    prompt: "His argument was so ___ that nobody could disagree with it.",
    options: ["compelling", "compelled", "compulsive", "compulsory"],
  },
  { id: "c1-5", level: "C1", prompt: "It's high time we ___ a decision.", options: ["made", "make", "have made", "will make"] },
  {
    id: "c1-6",
    level: "C1",
    prompt: "She took the criticism ___ and kept improving.",
    options: ["in her stride", "on her feet", "by surprise", "at heart"],
  },
  {
    id: "c1-7",
    level: "C1",
    prompt: "The report was full of ___ details that distracted from the main point.",
    options: ["extraneous", "extensive", "exterior", "extravagant"],
  },
  {
    id: "c1-8",
    level: "C1",
    prompt: "Should you ___ any problems, please contact reception.",
    options: ["encounter", "encountering", "encountered", "to encounter"],
  },
  {
    id: "c1-9",
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
    id: "c1-10",
    level: "C1",
    prompt: "The negotiations reached a ___, with neither side willing to compromise.",
    options: ["stalemate", "milestone", "breakthrough", "consensus"],
  },

  // ---------- C2 ----------
  {
    id: "c2-1",
    level: "C2",
    prompt: "Scarcely ___ the stage when the audience began to applaud.",
    options: ["had she stepped onto", "she had stepped onto", "did she stepped onto", "she stepped onto"],
  },
  {
    id: "c2-2",
    level: "C2",
    prompt: "His explanation was so ___ that even experts struggled to follow it.",
    options: ["abstruse", "obtuse", "abrupt", "absolute"],
  },
  {
    id: "c2-3",
    level: "C2",
    prompt: "The speech was full of ___, saying a lot but meaning very little.",
    options: ["platitudes", "plaudits", "plateaus", "platforms"],
  },
  {
    id: "c2-4",
    level: "C2",
    prompt: "Were it not for her timely intervention, the deal ___.",
    options: ["would have collapsed", "would collapse", "had collapsed", "will have collapsed"],
  },
  { id: "c2-5", level: "C2", prompt: "It is imperative that he ___ informed immediately.", options: ["be", "is", "was", "will be"] },
  {
    id: "c2-6",
    level: "C2",
    prompt: "The author's ___ style, full of long and elaborate sentences, divides readers.",
    options: ["ornate", "ornery", "orderly", "ordinal"],
  },
  {
    id: "c2-7",
    level: "C2",
    prompt: "The evidence, ___ compelling, was not conclusive.",
    options: ["albeit", "whereas", "notwithstanding", "inasmuch"],
  },
  {
    id: "c2-8",
    level: "C2",
    prompt: "She has a ___ for languages; she speaks seven fluently.",
    options: ["flair", "flare", "flier", "flaw"],
  },
  {
    id: "c2-9",
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
    id: "c2-10",
    level: "C2",
    prompt:
      "Read: “The novel eschews tidy resolutions, leaving the reader to grapple with its moral ambiguities.” What does “eschews” mean here?",
    options: ["deliberately avoids", "clearly explains", "quickly reaches", "strongly praises"],
  },
];
