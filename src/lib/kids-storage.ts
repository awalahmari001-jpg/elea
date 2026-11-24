import type { Bilingual } from "@/content/lesson-types";
import type { KidsAgeGroupId } from "@/content/kids/alphabet-phonics-data";
import { learningRecord } from "@/lib/learning-record";

export interface KidsProgressState {
  ageGroup: KidsAgeGroupId;
  stars: number;
  points: number;
  masteredLetters: string[];
  tracedLetters: string[];
  vowelChecksPassed: string[];
  consonantSortsCompleted: number;
  articulationPracticed: string[];
  readingStagesMastered: number[];
  vocabThemesCompleted: string[];
  grammarUnitsCompleted: string[];
  videosWatched: string[];
  gamesCompleted: string[];
  storiesRead: string[];
  speakingPracticed: string[];
  writingCompleted: string[];
  assessmentScores: Record<string, number>;
  updatedAt: string;
}

export interface KidsBadgeItem {
  id: string;
  emoji: string;
  title: Bilingual;
  requirement: Bilingual;
  earned: boolean;
}

export interface KidsRewardTier {
  id: string;
  emoji: string;
  title: Bilingual;
  minStars: number;
  nextTierStars: number | null;
}

const KIDS_STORAGE_KEY = "ele.kids.world";

export function emptyKidsProgress(): KidsProgressState {
  return {
    ageGroup: "early-4-6",
    stars: 0,
    points: 0,
    masteredLetters: [],
    tracedLetters: [],
    vowelChecksPassed: [],
    consonantSortsCompleted: 0,
    articulationPracticed: [],
    readingStagesMastered: [],
    vocabThemesCompleted: [],
    grammarUnitsCompleted: [],
    videosWatched: [],
    gamesCompleted: [],
    storiesRead: [],
    speakingPracticed: [],
    writingCompleted: [],
    assessmentScores: {},
    updatedAt: "",
  };
}

function readKids(): KidsProgressState {
  if (typeof window === "undefined") return emptyKidsProgress();
  try {
    const raw = window.localStorage.getItem(KIDS_STORAGE_KEY);
    if (!raw) return emptyKidsProgress();
    const parsed = JSON.parse(raw) as Partial<KidsProgressState>;
    const base = emptyKidsProgress();
    return {
      ageGroup:
        parsed.ageGroup === "young-7-9" || parsed.ageGroup === "preteen-10-12"
          ? parsed.ageGroup
          : "early-4-6",
      stars: typeof parsed.stars === "number" ? parsed.stars : 0,
      points: typeof parsed.points === "number" ? parsed.points : 0,
      masteredLetters: Array.isArray(parsed.masteredLetters)
        ? parsed.masteredLetters
        : base.masteredLetters,
      tracedLetters: Array.isArray(parsed.tracedLetters)
        ? parsed.tracedLetters
        : base.tracedLetters,
      vowelChecksPassed: Array.isArray(parsed.vowelChecksPassed)
        ? parsed.vowelChecksPassed
        : base.vowelChecksPassed,
      consonantSortsCompleted:
        typeof parsed.consonantSortsCompleted === "number" ? parsed.consonantSortsCompleted : 0,
      articulationPracticed: Array.isArray(parsed.articulationPracticed)
        ? parsed.articulationPracticed
        : [],
      readingStagesMastered: Array.isArray(parsed.readingStagesMastered)
        ? parsed.readingStagesMastered
        : [],
      vocabThemesCompleted: Array.isArray(parsed.vocabThemesCompleted)
        ? parsed.vocabThemesCompleted
        : [],
      grammarUnitsCompleted: Array.isArray(parsed.grammarUnitsCompleted)
        ? parsed.grammarUnitsCompleted
        : [],
      videosWatched: Array.isArray(parsed.videosWatched) ? parsed.videosWatched : [],
      gamesCompleted: Array.isArray(parsed.gamesCompleted) ? parsed.gamesCompleted : [],
      storiesRead: Array.isArray(parsed.storiesRead) ? parsed.storiesRead : [],
      speakingPracticed: Array.isArray(parsed.speakingPracticed) ? parsed.speakingPracticed : [],
      writingCompleted: Array.isArray(parsed.writingCompleted) ? parsed.writingCompleted : [],
      assessmentScores:
        parsed.assessmentScores && typeof parsed.assessmentScores === "object"
          ? parsed.assessmentScores
          : {},
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
    };
  } catch {
    return emptyKidsProgress();
  }
}

function writeKids(next: KidsProgressState): KidsProgressState {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KIDS_STORAGE_KEY, JSON.stringify(next));
  }
  return next;
}

export const kidsStorage = {
  get: (): KidsProgressState => readKids(),

  setAgeGroup: (ageGroup: KidsAgeGroupId): KidsProgressState => {
    const prev = readKids();
    return writeKids({ ...prev, ageGroup, updatedAt: new Date().toISOString() });
  },

  recordLetterMastered: (letter: string): KidsProgressState => {
    const upper = letter.toUpperCase();
    const prev = readKids();
    const isNew = !prev.masteredLetters.includes(upper);
    const next = writeKids({
      ...prev,
      masteredLetters: isNew ? [...prev.masteredLetters, upper] : prev.masteredLetters,
      stars: prev.stars + (isNew ? 1 : 0),
      points: prev.points + (isNew ? 10 : 2),
      updatedAt: new Date().toISOString(),
    });
    if (isNew) {
      learningRecord.logActivity({ kind: "vocab", count: 1, minutes: 2, passed: true });
    }
    return next;
  },

  recordLetterTraced: (letter: string): KidsProgressState => {
    const upper = letter.toUpperCase();
    const prev = readKids();
    const isNew = !prev.tracedLetters.includes(upper);
    const next = writeKids({
      ...prev,
      tracedLetters: isNew ? [...prev.tracedLetters, upper] : prev.tracedLetters,
      stars: prev.stars + (isNew ? 1 : 0),
      points: prev.points + (isNew ? 10 : 2),
      updatedAt: new Date().toISOString(),
    });
    if (isNew) {
      learningRecord.logActivity({ kind: "writing", count: 1, minutes: 2, passed: true });
    }
    return next;
  },

  recordVowelPassed: (vowel: string): KidsProgressState => {
    const upper = vowel.toUpperCase();
    const prev = readKids();
    const isNew = !prev.vowelChecksPassed.includes(upper);
    const next = writeKids({
      ...prev,
      vowelChecksPassed: isNew ? [...prev.vowelChecksPassed, upper] : prev.vowelChecksPassed,
      stars: prev.stars + (isNew ? 2 : 0),
      points: prev.points + (isNew ? 15 : 5),
      updatedAt: new Date().toISOString(),
    });
    if (isNew) {
      learningRecord.logActivity({ kind: "reading", count: 1, minutes: 3, passed: true });
    }
    return next;
  },

  recordConsonantSortWin: (): KidsProgressState => {
    const prev = readKids();
    const next = writeKids({
      ...prev,
      consonantSortsCompleted: prev.consonantSortsCompleted + 1,
      stars: prev.stars + 1,
      points: prev.points + 10,
      updatedAt: new Date().toISOString(),
    });
    learningRecord.logActivity({ kind: "reading", count: 1, minutes: 2, passed: true });
    return next;
  },

  recordGameWin: (gameId: string, bonusStars = 2): KidsProgressState => {
    const prev = readKids();
    const gamesCompleted = prev.gamesCompleted.includes(gameId)
      ? prev.gamesCompleted
      : [...prev.gamesCompleted, gameId];
    const next = writeKids({
      ...prev,
      gamesCompleted,
      stars: prev.stars + bonusStars,
      points: prev.points + bonusStars * 10,
      updatedAt: new Date().toISOString(),
    });
    learningRecord.logActivity({ kind: "lesson", count: 1, minutes: 3, passed: true });
    return next;
  },

  recordArticulationPracticed: (soundId: string): KidsProgressState => {
    const prev = readKids();
    const isNew = !prev.articulationPracticed.includes(soundId);
    const next = writeKids({
      ...prev,
      articulationPracticed: isNew
        ? [...prev.articulationPracticed, soundId]
        : prev.articulationPracticed,
      stars: prev.stars + (isNew ? 1 : 0),
      points: prev.points + (isNew ? 10 : 2),
      updatedAt: new Date().toISOString(),
    });
    if (isNew) {
      learningRecord.logActivity({ kind: "speaking", count: 1, minutes: 3, passed: true });
    }
    return next;
  },

  /**
   * Mastery-gated reading ladder progression: a stage is ONLY mastered when the child
   * passes its interactive mastery check (>= thresholdPct, default 75%).
   */
  recordReadingStageMastered: (stageNumber: number, passedCheck: boolean): KidsProgressState => {
    const prev = readKids();
    if (!passedCheck) return prev;
    const isNew = !prev.readingStagesMastered.includes(stageNumber);
    const next = writeKids({
      ...prev,
      readingStagesMastered: isNew
        ? [...prev.readingStagesMastered, stageNumber].sort((a, b) => a - b)
        : prev.readingStagesMastered,
      stars: prev.stars + (isNew ? 2 : 0),
      points: prev.points + (isNew ? 20 : 5),
      updatedAt: new Date().toISOString(),
    });
    if (isNew) {
      learningRecord.logActivity({ kind: "reading", count: 1, minutes: 4, passed: true });
    }
    return next;
  },

  recordVocabThemeCompleted: (themeId: string): KidsProgressState => {
    const prev = readKids();
    const isNew = !prev.vocabThemesCompleted.includes(themeId);
    const next = writeKids({
      ...prev,
      vocabThemesCompleted: isNew
        ? [...prev.vocabThemesCompleted, themeId]
        : prev.vocabThemesCompleted,
      stars: prev.stars + (isNew ? 1 : 0),
      points: prev.points + (isNew ? 12 : 2),
      updatedAt: new Date().toISOString(),
    });
    if (isNew) {
      learningRecord.logActivity({ kind: "vocab", count: 4, minutes: 3, passed: true });
    }
    return next;
  },

  recordGrammarUnitCompleted: (unitId: string): KidsProgressState => {
    const prev = readKids();
    const isNew = !prev.grammarUnitsCompleted.includes(unitId);
    const next = writeKids({
      ...prev,
      grammarUnitsCompleted: isNew
        ? [...prev.grammarUnitsCompleted, unitId]
        : prev.grammarUnitsCompleted,
      stars: prev.stars + (isNew ? 1 : 0),
      points: prev.points + (isNew ? 15 : 3),
      updatedAt: new Date().toISOString(),
    });
    if (isNew) {
      learningRecord.logActivity({ kind: "grammar", count: 1, minutes: 3, passed: true });
    }
    return next;
  },

  recordVideoWatched: (videoId: string): KidsProgressState => {
    const prev = readKids();
    const isNew = !prev.videosWatched.includes(videoId);
    const next = writeKids({
      ...prev,
      videosWatched: isNew ? [...prev.videosWatched, videoId] : prev.videosWatched,
      stars: prev.stars + (isNew ? 2 : 0),
      points: prev.points + (isNew ? 18 : 2),
      updatedAt: new Date().toISOString(),
    });
    if (isNew) {
      learningRecord.logActivity({ kind: "listening", count: 1, minutes: 3, passed: true });
    }
    return next;
  },

  recordStoryRead: (storyId: string): KidsProgressState => {
    const prev = readKids();
    const isNew = !prev.storiesRead.includes(storyId);
    const next = writeKids({
      ...prev,
      storiesRead: isNew ? [...prev.storiesRead, storyId] : prev.storiesRead,
      stars: prev.stars + (isNew ? 2 : 0),
      points: prev.points + (isNew ? 20 : 4),
      updatedAt: new Date().toISOString(),
    });
    if (isNew) {
      learningRecord.logActivity({ kind: "reading", count: 1, minutes: 4, passed: true });
    }
    return next;
  },

  recordSpeakingPracticed: (convId: string): KidsProgressState => {
    const prev = readKids();
    const isNew = !prev.speakingPracticed.includes(convId);
    const next = writeKids({
      ...prev,
      speakingPracticed: isNew ? [...prev.speakingPracticed, convId] : prev.speakingPracticed,
      stars: prev.stars + (isNew ? 2 : 0),
      points: prev.points + (isNew ? 15 : 4),
      updatedAt: new Date().toISOString(),
    });
    if (isNew) {
      learningRecord.logActivity({ kind: "speaking", count: 1, minutes: 3, passed: true });
    }
    return next;
  },

  recordWritingCompleted: (missionId: string): KidsProgressState => {
    const prev = readKids();
    const isNew = !prev.writingCompleted.includes(missionId);
    const next = writeKids({
      ...prev,
      writingCompleted: isNew ? [...prev.writingCompleted, missionId] : prev.writingCompleted,
      stars: prev.stars + (isNew ? 2 : 0),
      points: prev.points + (isNew ? 18 : 4),
      updatedAt: new Date().toISOString(),
    });
    if (isNew) {
      learningRecord.logActivity({ kind: "writing", count: 1, minutes: 4, passed: true });
    }
    return next;
  },

  recordFriendlyAssessment: (assessmentId: string, scorePct: number): KidsProgressState => {
    const prev = readKids();
    const clamped = Math.max(0, Math.min(100, Math.round(scorePct)));
    const prevBest = prev.assessmentScores[assessmentId] ?? 0;
    const isFirst = !(assessmentId in prev.assessmentScores);
    const next = writeKids({
      ...prev,
      assessmentScores: {
        ...prev.assessmentScores,
        [assessmentId]: Math.max(prevBest, clamped),
      },
      stars: prev.stars + (isFirst ? 3 : 1),
      points: prev.points + (isFirst ? 25 : 8),
      updatedAt: new Date().toISOString(),
    });
    learningRecord.logActivity({ kind: "assessment", count: 1, minutes: 4, passed: true });
    return next;
  },

  clear: (): void => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(KIDS_STORAGE_KEY);
    }
  },
};

export type DiagnosticFocusArea = "letters" | "blending" | "blends" | "sentences" | "communication";

export interface ReadingDiagnosticReport {
  stagesMasteredCount: number;
  totalStages: number;
  subskills: {
    id: string;
    label: Bilingual;
    pct: number;
  }[];
  focusArea: DiagnosticFocusArea;
  targetedRecommendation: Bilingual;
}

export function computeReadingDiagnostics(state: KidsProgressState): ReadingDiagnosticReport {
  const hasStage = (n: number) => state.readingStagesMastered.includes(n);
  const letterPct = Math.min(100, Math.round((state.masteredLetters.length / 26) * 100));
  const vowelPct = Math.min(100, Math.round((state.vowelChecksPassed.length / 5) * 100));
  const consonantPct = Math.min(100, Math.round((state.consonantSortsCompleted / 3) * 100));
  const artPct = Math.min(100, Math.round((state.articulationPracticed.length / 12) * 100));
  const storyPct = Math.min(100, Math.round((state.storiesRead.length / 6) * 100));
  const expressivePct = Math.min(
    100,
    Math.round(((state.speakingPracticed.length + state.writingCompleted.length) / 6) * 100),
  );

  const subskills = [
    {
      id: "letters",
      label: { en: "Letter Recognition", ar: "تمييز الحروف" },
      pct: hasStage(1) ? 100 : letterPct,
    },
    {
      id: "letter-sounds",
      label: { en: "Letter-Sound Knowledge", ar: "أصوات الحروف" },
      pct: hasStage(2) ? 100 : letterPct,
    },
    {
      id: "vowels",
      label: { en: "Vowel Recognition", ar: "تمييز الحروف المتحركة" },
      pct: hasStage(3) ? 100 : vowelPct,
    },
    {
      id: "consonants",
      label: { en: "Consonant Recognition", ar: "تمييز الحروف الساكنة" },
      pct: hasStage(3) ? 100 : consonantPct,
    },
    {
      id: "phonemes",
      label: { en: "Phoneme & Articulation", ar: "الفونيمات ومخارج الحروف" },
      pct: hasStage(5) ? 100 : artPct,
    },
    {
      id: "blending",
      label: { en: "Sound Blending", ar: "دمج الأصوات" },
      pct: hasStage(6) ? 100 : state.gamesCompleted.includes("kids-blend") ? 65 : 0,
    },
    {
      id: "segmentation",
      label: { en: "Sound Segmentation", ar: "تقطيع الأصوات" },
      pct: hasStage(4) ? 100 : state.gamesCompleted.includes("kids-segment") ? 65 : 0,
    },
    {
      id: "cvc",
      label: { en: "CVC 3-Letter Reading", ar: "قراءة كلمات CVC" },
      pct: hasStage(7) ? 100 : state.gamesCompleted.includes("kids-cvc") ? 70 : 0,
    },
    {
      id: "cvcc-ccvc",
      label: { en: "CVCC & CCVC Blends", ar: "قراءة CVCC وCCVC" },
      pct: hasStage(8) ? 100 : state.gamesCompleted.includes("kids-4letter") ? 70 : 0,
    },
    {
      id: "digraphs",
      label: { en: "Digraph Recognition (sh/ch/th)", ar: "الثنائيات الساكنة" },
      pct: hasStage(9) ? 100 : 0,
    },
    {
      id: "sentences",
      label: { en: "Sentence Reading", ar: "قراءة الجمل" },
      pct:
        hasStage(10) || hasStage(11)
          ? 100
          : state.gamesCompleted.includes("kids-sentences")
            ? 65
            : 0,
    },
    {
      id: "comprehension",
      label: { en: "Story & Reading Comprehension", ar: "الفهم القرائي والقصصي" },
      pct: hasStage(13)
        ? 100
        : Math.max(storyPct, state.gamesCompleted.includes("kids-passage") ? 75 : 0),
    },
    {
      id: "expressive",
      label: { en: "Speaking & Guided Writing", ar: "المحادثة والكتابة المتدرّجة" },
      pct: expressivePct,
    },
  ];

  // Adaptive weakness-driven recommendation (Module 10 requirement!)
  let focusArea: DiagnosticFocusArea;
  let targetedRecommendation: Bilingual;
  if (letterPct < 40) {
    focusArea = "letters";
    targetedRecommendation = {
      en: "Start by exploring more letters in Alphabet & Tracing (A–Z) and hearing each letter's NAME vs. SOUND.",
      ar: "ابدأ باستكشاف المزيد من الحروف في استوديو الحروف وسماع اسم الحرف مقابل صوته.",
    };
  } else if (!hasStage(6)) {
    focusArea = "blending";
    targetedRecommendation = {
      en: "Great letter knowledge! Focus next on Sound Blending boxes (/k/ + /æ/ + /t/ = cat) before longer words.",
      ar: "معرفة ممتازة بالحروف! ركّز الآن على دمج الأصوات (/k/ + /æ/ + /t/ = cat) قبل الكلمات الأطول.",
    };
  } else if (!hasStage(8)) {
    focusArea = "blends";
    targetedRecommendation = {
      en: "Awesome CVC progress! Practise CVCC & CCVC consonant blends (like frog, stop, hand) next.",
      ar: "تقدّم رائع في كلمات CVC! تدرّب الآن على كلمات CVCC وCCVC مثل frog وstop وhand.",
    };
  } else if (!hasStage(12)) {
    focusArea = "sentences";
    targetedRecommendation = {
      en: "Ready for Sentence Reading! Practise building 4–6 word sentences and reading illustrated stories.",
      ar: "مستعد لقراءة الجمل! تدرّب على بناء جمل من ٤–٦ كلمات وقراءة القصص المصوّرة.",
    };
  } else {
    focusArea = "communication";
    targetedRecommendation = {
      en: "Super Reader! Keep reading illustrated stories, practising Mini Conversations, and writing short guided paragraphs.",
      ar: "قارئ بطل! واصل قراءة القصص المصوّرة والتدرّب على الحوارات القصيرة والكتابة الموجّهة.",
    };
  }

  return {
    stagesMasteredCount: state.readingStagesMastered.length,
    totalStages: 14,
    subskills,
    focusArea,
    targetedRecommendation,
  };
}

export function computeKidsRewardTier(stars: number): KidsRewardTier {
  if (stars >= 40) {
    return {
      id: "rainbow-champion",
      emoji: "🌈",
      title: { en: "Rainbow Champion", ar: "بطل قوس قزح" },
      minStars: 40,
      nextTierStars: null,
    };
  }
  if (stars >= 20) {
    return {
      id: "golden-star",
      emoji: "🌟",
      title: { en: "Golden Star Explorer", ar: "مستكشف النجمة الذهبية" },
      minStars: 20,
      nextTierStars: 40,
    };
  }
  if (stars >= 8) {
    return {
      id: "silver-owl",
      emoji: "🦉",
      title: { en: "Clever Silver Owl", ar: "البومة الفضية الذكية" },
      minStars: 8,
      nextTierStars: 20,
    };
  }
  return {
    id: "sunny-sprout",
    emoji: "🌱",
    title: { en: "Sunny Little Sprout", ar: "البرعم المشرق الصغير" },
    minStars: 0,
    nextTierStars: 8,
  };
}

export function computeKidsBadges(state: KidsProgressState): KidsBadgeItem[] {
  const quizzesDone = Object.keys(state.assessmentScores).length;
  return [
    {
      id: "alphabet-explorer",
      emoji: "🔤",
      title: { en: "Alphabet Explorer", ar: "مستكشف الحروف" },
      requirement: { en: "Learn 5 English letters", ar: "تعلّم ٥ حروف إنجليزية" },
      earned: state.masteredLetters.length >= 5,
    },
    {
      id: "letter-artist",
      emoji: "✏️",
      title: { en: "Letter Artist", ar: "رسّام الحروف" },
      requirement: { en: "Trace 3 letters on the pad", ar: "تتبّع ٣ حروف على اللوحة" },
      earned: state.tracedLetters.length >= 3,
    },
    {
      id: "vowel-hero",
      emoji: "🌟",
      title: { en: "Magic Vowel Hero", ar: "بطل الحروف المتحركة" },
      requirement: { en: "Master all 5 vowels (A, E, I, O, U)", ar: "أتقن الحروف المتحركة الخمسة" },
      earned: state.vowelChecksPassed.length >= 5,
    },
    {
      id: "sound-maker",
      emoji: "🗣️",
      title: { en: "Sound Maker", ar: "صانع الأصوات" },
      requirement: {
        en: "Practise 4 articulation sounds",
        ar: "تدرّب على ٤ أصوات في مخارج الحروف",
      },
      earned: state.articulationPracticed.length >= 4,
    },
    {
      id: "super-reader",
      emoji: "📖",
      title: { en: "Rising Reader", ar: "قارئ صاعد" },
      requirement: { en: "Pass 3 Reading Ladder stages", ar: "اجتز ٣ مراحل في سُلّم القراءة" },
      earned: state.readingStagesMastered.length >= 3,
    },
    {
      id: "vocab-superstar",
      emoji: "🎨",
      title: { en: "Picture Word Star", ar: "نجم المفردات المصوّرة" },
      requirement: { en: "Complete 3 Picture Vocab themes", ar: "أكمل ٣ مواضيع في المفردات" },
      earned: state.vocabThemesCompleted.length >= 3,
    },
    {
      id: "grammar-wizard",
      emoji: "🪄",
      title: { en: "Grammar Wizard", ar: "ساحر القواعد" },
      requirement: { en: "Complete 3 Visual Grammar units", ar: "أكمل ٣ وحدات في القواعد المرئية" },
      earned: state.grammarUnitsCompleted.length >= 3,
    },
    {
      id: "story-explorer",
      emoji: "📚",
      title: { en: "Storybook Explorer", ar: "مستكشف القصص" },
      requirement: { en: "Finish 2 illustrated stories", ar: "اقرأ قصتين مصوّرتين" },
      earned: state.storiesRead.length >= 2,
    },
    {
      id: "chat-champion",
      emoji: "💬",
      title: { en: "Friendly Speaker", ar: "المتحدث اللطيف" },
      requirement: { en: "Practise 2 mini conversations", ar: "تدرّب على حوارين قصيرين" },
      earned: state.speakingPracticed.length >= 2,
    },
    {
      id: "little-writer",
      emoji: "📝",
      title: { en: "Creative Writer", ar: "الكاتب الصغير" },
      requirement: { en: "Complete 2 writing missions", ar: "أكمل مهمتين في الكتابة" },
      earned: state.writingCompleted.length >= 2,
    },
    {
      id: "quiz-hero",
      emoji: "🎯",
      title: { en: "Star Quiz Hero", ar: "بطل تحدّي النجوم" },
      requirement: { en: "Finish any Star Check quiz", ar: "أكمل أي تحدّي نجوم" },
      earned: quizzesDone >= 1,
    },
    {
      id: "star-collector",
      emoji: "🏆",
      title: { en: "Super Star Collector", ar: "جامع النجوم الذهبية" },
      requirement: { en: "Earn 10 learning stars", ar: "اجمع ١٠ نجوم تعلّم" },
      earned: state.stars >= 10,
    },
  ];
}
