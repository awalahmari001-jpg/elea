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
  updatedAt: string;
}

export interface KidsBadgeItem {
  id: string;
  emoji: string;
  title: Bilingual;
  requirement: Bilingual;
  earned: boolean;
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

  clear: (): void => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(KIDS_STORAGE_KEY);
    }
  },
};

export interface ReadingDiagnosticReport {
  stagesMasteredCount: number;
  totalStages: number;
  subskills: {
    id: string;
    label: Bilingual;
    pct: number;
  }[];
  targetedRecommendation: Bilingual;
}

export function computeReadingDiagnostics(state: KidsProgressState): ReadingDiagnosticReport {
  const hasStage = (n: number) => state.readingStagesMastered.includes(n);
  const letterPct = Math.min(100, Math.round((state.masteredLetters.length / 26) * 100));
  const vowelPct = Math.min(100, Math.round((state.vowelChecksPassed.length / 5) * 100));
  const consonantPct = Math.min(100, Math.round((state.consonantSortsCompleted / 3) * 100));
  const artPct = Math.min(100, Math.round((state.articulationPracticed.length / 12) * 100));

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
      label: { en: "Reading Comprehension", ar: "الفهم القرائي" },
      pct: hasStage(13) ? 100 : state.gamesCompleted.includes("kids-passage") ? 75 : 0,
    },
  ];

  // Adaptive weakness-driven recommendation (Module 10 requirement!)
  let targetedRecommendation: Bilingual;
  if (letterPct < 40) {
    targetedRecommendation = {
      en: "Start by exploring more letters in Alphabet & Tracing (A–Z) and hearing each letter's NAME vs. SOUND.",
      ar: "ابدأ باستكشاف المزيد من الحروف في استوديو الحروف وسماع اسم الحرف مقابل صوته.",
    };
  } else if (!hasStage(6)) {
    targetedRecommendation = {
      en: "Great letter knowledge! Focus next on Sound Blending boxes (/k/ + /æ/ + /t/ = cat) before longer words.",
      ar: "معرفة ممتازة بالحروف! ركّز الآن على دمج الأصوات (/k/ + /æ/ + /t/ = cat) قبل الكلمات الأطول.",
    };
  } else if (!hasStage(8)) {
    targetedRecommendation = {
      en: "Awesome CVC progress! Practise CVCC & CCVC consonant blends (like frog, stop, hand) next.",
      ar: "تقدّم رائع في كلمات CVC! تدرّب الآن على كلمات CVCC وCCVC مثل frog وstop وhand.",
    };
  } else if (!hasStage(12)) {
    targetedRecommendation = {
      en: "Ready for Sentence Reading! Practise building 4–6 word sentences and reading My Little Cat.",
      ar: "مستعد لقراءة الجمل! تدرّب على بناء جمل من ٤–٦ كلمات وقراءة قصة قطتي الصغيرة.",
    };
  } else {
    targetedRecommendation = {
      en: "Super Reader! Keep reading short illustrated stories and practising Minimal Pairs for crisp pronunciation.",
      ar: "قارئ بطل! واصل قراءة القصص المصوّرة والتدرّب على الأزواج الصوتية المتقاربة.",
    };
  }

  return {
    stagesMasteredCount: state.readingStagesMastered.length,
    totalStages: 14,
    subskills,
    targetedRecommendation,
  };
}

export function computeKidsBadges(state: KidsProgressState): KidsBadgeItem[] {
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
      id: "star-collector",
      emoji: "🏆",
      title: { en: "Super Star Collector", ar: "جامع النجوم الذهبية" },
      requirement: { en: "Earn 10 learning stars", ar: "اجمع ١٠ نجوم تعلّم" },
      earned: state.stars >= 10,
    },
  ];
}
