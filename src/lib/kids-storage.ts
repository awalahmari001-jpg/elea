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

  clear: (): void => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(KIDS_STORAGE_KEY);
    }
  },
};

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
      id: "consonant-detective",
      emoji: "🔍",
      title: { en: "Sound Detective", ar: "محقّق الأصوات" },
      requirement: { en: "Complete 2 Vowel/Consonant sorts", ar: "أكمل جولتين من تصنيف الحروف" },
      earned: state.consonantSortsCompleted >= 2,
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
