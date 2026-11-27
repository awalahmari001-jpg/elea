/**
 * Calibrated Kids Phonics, Authentic IPA Sample Audio & Musical Song Engine.
 *
 * Standard Web Speech TTS pronounces single letters ("a", "b", "c", "s") as their
 * LETTER NAMES (/eɪ/, /biː/, /siː/, /es/), spells out repeated-letter strings like
 * "fff", "lll", "sss", "ih" as letter names ("eff-eff-eff", "I-H"), and reads
 * "short a" / "fuh" / "suh" literally or with heavy trailing schwas.
 *
 * This engine solves every single one of those issues using authentic IPA audio:
 * 1. Plays studio-normalized, real-human International Phonetic Alphabet (IPA)
 *    reference MP3 recordings bundled locally under `/audio/ipa/*.mp3` for all 26
 *    English alphabet phonemes (A–Z), long vowels, and digraphs — zero external
 *    network dependency, instant playback, 100% Safari/iOS/Chrome/Firefox support.
 * 2. Keeps Letter NAME audio strictly separated from Pure IPA SOUND audio, with
 *    zero-overlap sequencing (waits for IPA clip `ended` before speaking anchor words).
 * 3. Falls back gracefully to calibrated Web Audio F1/F2/F3 formants & fricatives
 *    or TTS only when HTMLAudioElement playback is unavailable (e.g., headless tests).
 * 4. Includes a cheerful Web Audio Xylophone / Marimba Song Engine synchronized
 *    with authentic IPA phoneme samples and kid-friendly phonics song verses.
 */
import {
  FULL_PHONICS_SONGS,
  LETTER_PHONICS_SONGS,
  PHONICS_NOTES,
} from "@/content/kids/phonics-songs-data";
import { speakAsRole, stopSpeech } from "@/hooks/use-speech";

export type AcousticPhonemeKind =
  | "a-short"
  | "e-short"
  | "i-short"
  | "o-short"
  | "u-short"
  | "f-air"
  | "s-hiss"
  | "sh-hush"
  | "th-air"
  | "h-breath"
  | "v-buzz"
  | "z-buzz"
  | "m-hum"
  | "n-hum"
  | "l-liquid"
  | "r-liquid"
  | "ks-burst";

export interface LetterPhonicsAudioSpec {
  letter: string;
  /** Exact IPA phoneme symbol for this letter's primary phonics sound. */
  ipaSymbol: string;
  /** Path to the bundled real-human IPA reference MP3 clip under `public/audio/ipa/`. */
  ipaSampleUrl: string;
  /** Spoken text that guarantees TTS pronounces the Letter NAME clearly. */
  nameSpeech: string;
  /** Fallback phoneme realization token (never bare single letters or spelled-out strings). */
  soundSpeech: string;
  /** Child-friendly IPA-anchored hint shown alongside the IPA badge. */
  phoneticHint: string;
  /** Anchor example word demonstrating the authentic IPA phoneme. */
  anchorWord: string;
  /** Web Audio acoustic fallback synthesizer mode if HTMLAudio is unavailable. */
  acousticKind?: AcousticPhonemeKind;
  /** True for stop/plosive/glide consonants when using TTS fallback. */
  clippedStop?: boolean;
}

export const LETTER_PHONICS_AUDIO: Record<string, LetterPhonicsAudioSpec> = {
  A: {
    letter: "A",
    ipaSymbol: "/æ/",
    ipaSampleUrl: "/audio/ipa/ae.mp3",
    nameSpeech: "The letter A",
    soundSpeech: "short a",
    phoneticHint: "/æ/ as in apple",
    anchorWord: "apple",
    acousticKind: "a-short",
  },
  B: {
    letter: "B",
    ipaSymbol: "/b/",
    ipaSampleUrl: "/audio/ipa/b.mp3",
    nameSpeech: "The letter B",
    soundSpeech: "buh",
    phoneticHint: "/b/ as in ball",
    anchorWord: "ball",
    clippedStop: true,
  },
  C: {
    letter: "C",
    ipaSymbol: "/k/",
    ipaSampleUrl: "/audio/ipa/k.mp3",
    nameSpeech: "The letter C",
    soundSpeech: "kuh",
    phoneticHint: "/k/ as in cat",
    anchorWord: "cat",
    clippedStop: true,
  },
  D: {
    letter: "D",
    ipaSymbol: "/d/",
    ipaSampleUrl: "/audio/ipa/d.mp3",
    nameSpeech: "The letter D",
    soundSpeech: "duh",
    phoneticHint: "/d/ as in dog",
    anchorWord: "dog",
    clippedStop: true,
  },
  E: {
    letter: "E",
    ipaSymbol: "/e/",
    ipaSampleUrl: "/audio/ipa/e.mp3",
    nameSpeech: "The letter E",
    soundSpeech: "eh",
    phoneticHint: "/e/ as in egg",
    anchorWord: "egg",
    acousticKind: "e-short",
  },
  F: {
    letter: "F",
    ipaSymbol: "/f/",
    ipaSampleUrl: "/audio/ipa/f.mp3",
    nameSpeech: "The letter F",
    soundSpeech: "fuh",
    phoneticHint: "/f/ as in fish",
    anchorWord: "fish",
    acousticKind: "f-air",
  },
  G: {
    letter: "G",
    ipaSymbol: "/ɡ/",
    ipaSampleUrl: "/audio/ipa/g.mp3",
    nameSpeech: "The letter G",
    soundSpeech: "guh",
    phoneticHint: "/ɡ/ as in goat",
    anchorWord: "goat",
    clippedStop: true,
  },
  H: {
    letter: "H",
    ipaSymbol: "/h/",
    ipaSampleUrl: "/audio/ipa/h.mp3",
    nameSpeech: "The letter H",
    soundSpeech: "huh",
    phoneticHint: "/h/ as in hat",
    anchorWord: "hat",
    acousticKind: "h-breath",
  },
  I: {
    letter: "I",
    ipaSymbol: "/ɪ/",
    ipaSampleUrl: "/audio/ipa/ih.mp3",
    nameSpeech: "The letter I",
    soundSpeech: "short i",
    phoneticHint: "/ɪ/ as in igloo",
    anchorWord: "igloo",
    acousticKind: "i-short",
  },
  J: {
    letter: "J",
    ipaSymbol: "/dʒ/",
    ipaSampleUrl: "/audio/ipa/dj.mp3",
    nameSpeech: "The letter J",
    soundSpeech: "juh",
    phoneticHint: "/dʒ/ as in jam",
    anchorWord: "jam",
    clippedStop: true,
  },
  K: {
    letter: "K",
    ipaSymbol: "/k/",
    ipaSampleUrl: "/audio/ipa/k.mp3",
    nameSpeech: "The letter K",
    soundSpeech: "kuh",
    phoneticHint: "/k/ as in kite",
    anchorWord: "kite",
    clippedStop: true,
  },
  L: {
    letter: "L",
    ipaSymbol: "/l/",
    ipaSampleUrl: "/audio/ipa/l.mp3",
    nameSpeech: "The letter L",
    soundSpeech: "luh",
    phoneticHint: "/l/ as in lion",
    anchorWord: "lion",
    acousticKind: "l-liquid",
  },
  M: {
    letter: "M",
    ipaSymbol: "/m/",
    ipaSampleUrl: "/audio/ipa/m.mp3",
    nameSpeech: "The letter M",
    soundSpeech: "muh",
    phoneticHint: "/m/ as in moon",
    anchorWord: "moon",
    acousticKind: "m-hum",
  },
  N: {
    letter: "N",
    ipaSymbol: "/n/",
    ipaSampleUrl: "/audio/ipa/n.mp3",
    nameSpeech: "The letter N",
    soundSpeech: "nuh",
    phoneticHint: "/n/ as in nest",
    anchorWord: "nest",
    acousticKind: "n-hum",
  },
  O: {
    letter: "O",
    ipaSymbol: "/ɒ/",
    ipaSampleUrl: "/audio/ipa/o.mp3",
    nameSpeech: "The letter O",
    soundSpeech: "short o",
    phoneticHint: "/ɒ/ as in octopus",
    anchorWord: "octopus",
    acousticKind: "o-short",
  },
  P: {
    letter: "P",
    ipaSymbol: "/p/",
    ipaSampleUrl: "/audio/ipa/p.mp3",
    nameSpeech: "The letter P",
    soundSpeech: "puh",
    phoneticHint: "/p/ as in pen",
    anchorWord: "pen",
    clippedStop: true,
  },
  Q: {
    letter: "Q",
    ipaSymbol: "/kw/",
    ipaSampleUrl: "/audio/ipa/kw.mp3",
    nameSpeech: "The letter Q",
    soundSpeech: "kwuh",
    phoneticHint: "/kw/ as in queen",
    anchorWord: "queen",
    clippedStop: true,
  },
  R: {
    letter: "R",
    ipaSymbol: "/r/",
    ipaSampleUrl: "/audio/ipa/r.mp3",
    nameSpeech: "The letter R",
    soundSpeech: "ruh",
    phoneticHint: "/r/ as in rabbit",
    anchorWord: "rabbit",
    acousticKind: "r-liquid",
  },
  S: {
    letter: "S",
    ipaSymbol: "/s/",
    ipaSampleUrl: "/audio/ipa/s.mp3",
    nameSpeech: "The letter S",
    soundSpeech: "suh",
    phoneticHint: "/s/ as in sun",
    anchorWord: "sun",
    acousticKind: "s-hiss",
  },
  T: {
    letter: "T",
    ipaSymbol: "/t/",
    ipaSampleUrl: "/audio/ipa/t.mp3",
    nameSpeech: "The letter T",
    soundSpeech: "tuh",
    phoneticHint: "/t/ as in tiger",
    anchorWord: "tiger",
    clippedStop: true,
  },
  U: {
    letter: "U",
    ipaSymbol: "/ʌ/",
    ipaSampleUrl: "/audio/ipa/u.mp3",
    nameSpeech: "The letter U",
    soundSpeech: "uh",
    phoneticHint: "/ʌ/ as in umbrella",
    anchorWord: "umbrella",
    acousticKind: "u-short",
  },
  V: {
    letter: "V",
    ipaSymbol: "/v/",
    ipaSampleUrl: "/audio/ipa/v.mp3",
    nameSpeech: "The letter V",
    soundSpeech: "vuh",
    phoneticHint: "/v/ as in van",
    anchorWord: "van",
    acousticKind: "v-buzz",
  },
  W: {
    letter: "W",
    ipaSymbol: "/w/",
    ipaSampleUrl: "/audio/ipa/w.mp3",
    nameSpeech: "The letter W",
    soundSpeech: "wuh",
    phoneticHint: "/w/ as in water",
    anchorWord: "water",
    clippedStop: true,
  },
  X: {
    letter: "X",
    ipaSymbol: "/ks/",
    ipaSampleUrl: "/audio/ipa/ks.mp3",
    nameSpeech: "The letter X",
    soundSpeech: "kuh-suh",
    phoneticHint: "/ks/ as in box",
    anchorWord: "box",
    acousticKind: "ks-burst",
  },
  Y: {
    letter: "Y",
    ipaSymbol: "/j/",
    ipaSampleUrl: "/audio/ipa/j.mp3",
    nameSpeech: "The letter Y",
    soundSpeech: "yuh",
    phoneticHint: "/j/ as in yellow",
    anchorWord: "yellow",
    clippedStop: true,
  },
  Z: {
    letter: "Z",
    ipaSymbol: "/z/",
    ipaSampleUrl: "/audio/ipa/z.mp3",
    nameSpeech: "The letter Z",
    soundSpeech: "zuh",
    phoneticHint: "/z/ as in zebra",
    anchorWord: "zebra",
    acousticKind: "z-buzz",
  },
};

export interface VowelSoundSpeechSpec {
  /** Return-value label token preserved for audio engine contracts. */
  shortSpeech: string;
  /** Bundled real-human IPA MP3 clip for the pure short vowel. */
  shortIpaSampleUrl: string;
  /** Web Audio formant fallback cue if HTMLAudio is unavailable. */
  shortAcousticKind: AcousticPhonemeKind;
  /** TTS-safe fallback cue (never passes "aah", "ih", or "aw" to Web Speech TTS). */
  shortTtsSpeech: string;
  /** Optional bundled real-human IPA MP3 clip for monophthong long vowels (/iː/). */
  longIpaSampleUrl?: string;
  /** Natural spoken cue for the long vowel (says its name). */
  longSpeech: string;
}

export const VOWEL_SOUND_SPEECH: Record<"A" | "E" | "I" | "O" | "U", VowelSoundSpeechSpec> = {
  A: {
    shortSpeech: "aah",
    shortIpaSampleUrl: "/audio/ipa/ae.mp3",
    shortAcousticKind: "a-short",
    shortTtsSpeech: "short a",
    longSpeech: "ay",
  },
  E: {
    shortSpeech: "eh",
    shortIpaSampleUrl: "/audio/ipa/e.mp3",
    shortAcousticKind: "e-short",
    shortTtsSpeech: "eh",
    longIpaSampleUrl: "/audio/ipa/ee.mp3",
    longSpeech: "ee",
  },
  I: {
    shortSpeech: "short i",
    shortIpaSampleUrl: "/audio/ipa/ih.mp3",
    shortAcousticKind: "i-short",
    shortTtsSpeech: "short i",
    longSpeech: "eye",
  },
  O: {
    shortSpeech: "short o",
    shortIpaSampleUrl: "/audio/ipa/o.mp3",
    shortAcousticKind: "o-short",
    shortTtsSpeech: "short o",
    longSpeech: "oh",
  },
  U: {
    shortSpeech: "uh",
    shortIpaSampleUrl: "/audio/ipa/u.mp3",
    shortAcousticKind: "u-short",
    shortTtsSpeech: "uh",
    longSpeech: "yoo",
  },
};

export interface ResolvedPhonemeSpeech {
  /** Label token returned to callers & blending traces. */
  speech: string;
  /** Strictly TTS-safe spoken fallback (never repeated letters like "fff"/"shhh" or wrong vowels). */
  ttsSpeech: string;
  /** Bundled real-human IPA reference MP3 clip played as primary audio source. */
  ipaSampleUrl?: string;
  /** Web Audio fallback cue if HTMLAudio playback is unavailable. */
  acousticKind?: AcousticPhonemeKind;
  /** True for plosives/affricates/glides spoken briskly when falling back to TTS. */
  clippedStop?: boolean;
}

/** Maps IPA symbols, digraphs, and single phoneme letters to authentic IPA MP3 samples & fallbacks. */
const PHONEME_SPEECH_MAP: Record<string, ResolvedPhonemeSpeech> = {
  "/p/": { speech: "puh", ttsSpeech: "puh", ipaSampleUrl: "/audio/ipa/p.mp3", clippedStop: true },
  "/b/": { speech: "buh", ttsSpeech: "buh", ipaSampleUrl: "/audio/ipa/b.mp3", clippedStop: true },
  "/m/": {
    speech: "muh",
    ttsSpeech: "muh",
    ipaSampleUrl: "/audio/ipa/m.mp3",
    acousticKind: "m-hum",
  },
  "/w/": { speech: "wuh", ttsSpeech: "wuh", ipaSampleUrl: "/audio/ipa/w.mp3", clippedStop: true },
  "/f/": {
    speech: "fuh",
    ttsSpeech: "fuh",
    ipaSampleUrl: "/audio/ipa/f.mp3",
    acousticKind: "f-air",
  },
  "/v/": {
    speech: "vuh",
    ttsSpeech: "vuh",
    ipaSampleUrl: "/audio/ipa/v.mp3",
    acousticKind: "v-buzz",
  },
  "/θ/": {
    speech: "thuh",
    ttsSpeech: "thuh",
    ipaSampleUrl: "/audio/ipa/th-voiceless.mp3",
    acousticKind: "th-air",
  },
  "/ð/": { speech: "theh", ttsSpeech: "theh", ipaSampleUrl: "/audio/ipa/th-voiced.mp3" },
  "/t/": { speech: "tuh", ttsSpeech: "tuh", ipaSampleUrl: "/audio/ipa/t.mp3", clippedStop: true },
  "/d/": { speech: "duh", ttsSpeech: "duh", ipaSampleUrl: "/audio/ipa/d.mp3", clippedStop: true },
  "/n/": {
    speech: "nuh",
    ttsSpeech: "nuh",
    ipaSampleUrl: "/audio/ipa/n.mp3",
    acousticKind: "n-hum",
  },
  "/s/": {
    speech: "suh",
    ttsSpeech: "suh",
    ipaSampleUrl: "/audio/ipa/s.mp3",
    acousticKind: "s-hiss",
  },
  "/z/": {
    speech: "zuh",
    ttsSpeech: "zuh",
    ipaSampleUrl: "/audio/ipa/z.mp3",
    acousticKind: "z-buzz",
  },
  "/l/": {
    speech: "luh",
    ttsSpeech: "luh",
    ipaSampleUrl: "/audio/ipa/l.mp3",
    acousticKind: "l-liquid",
  },
  "/r/": {
    speech: "ruh",
    ttsSpeech: "ruh",
    ipaSampleUrl: "/audio/ipa/r.mp3",
    acousticKind: "r-liquid",
  },
  "/ɹ/": {
    speech: "ruh",
    ttsSpeech: "ruh",
    ipaSampleUrl: "/audio/ipa/r.mp3",
    acousticKind: "r-liquid",
  },
  "/ʃ/": {
    speech: "shhh",
    ttsSpeech: "shuh",
    ipaSampleUrl: "/audio/ipa/sh.mp3",
    acousticKind: "sh-hush",
  },
  "/ʒ/": { speech: "zhuh", ttsSpeech: "zhuh" },
  "/tʃ/": {
    speech: "chuh",
    ttsSpeech: "chuh",
    ipaSampleUrl: "/audio/ipa/ch.mp3",
    clippedStop: true,
  },
  "/dʒ/": {
    speech: "juh",
    ttsSpeech: "juh",
    ipaSampleUrl: "/audio/ipa/dj.mp3",
    clippedStop: true,
  },
  "/j/": { speech: "yuh", ttsSpeech: "yuh", ipaSampleUrl: "/audio/ipa/j.mp3", clippedStop: true },
  "/k/": { speech: "kuh", ttsSpeech: "kuh", ipaSampleUrl: "/audio/ipa/k.mp3", clippedStop: true },
  "/ɡ/": { speech: "guh", ttsSpeech: "guh", ipaSampleUrl: "/audio/ipa/g.mp3", clippedStop: true },
  "/g/": { speech: "guh", ttsSpeech: "guh", ipaSampleUrl: "/audio/ipa/g.mp3", clippedStop: true },
  "/ŋ/": {
    speech: "ing",
    ttsSpeech: "ing",
    ipaSampleUrl: "/audio/ipa/ng.mp3",
    acousticKind: "n-hum",
  },
  "/h/": {
    speech: "huh",
    ttsSpeech: "huh",
    ipaSampleUrl: "/audio/ipa/h.mp3",
    acousticKind: "h-breath",
  },
  "/æ/": {
    speech: "aah",
    ttsSpeech: "short a",
    ipaSampleUrl: "/audio/ipa/ae.mp3",
    acousticKind: "a-short",
  },
  "/e/": {
    speech: "eh",
    ttsSpeech: "eh",
    ipaSampleUrl: "/audio/ipa/e.mp3",
    acousticKind: "e-short",
  },
  "/ɛ/": {
    speech: "eh",
    ttsSpeech: "eh",
    ipaSampleUrl: "/audio/ipa/e.mp3",
    acousticKind: "e-short",
  },
  "/ɪ/": {
    speech: "short i",
    ttsSpeech: "short i",
    ipaSampleUrl: "/audio/ipa/ih.mp3",
    acousticKind: "i-short",
  },
  "/ɒ/": {
    speech: "short o",
    ttsSpeech: "short o",
    ipaSampleUrl: "/audio/ipa/o.mp3",
    acousticKind: "o-short",
  },
  "/ʌ/": {
    speech: "uh",
    ttsSpeech: "uh",
    ipaSampleUrl: "/audio/ipa/u.mp3",
    acousticKind: "u-short",
  },
  "/iː/": { speech: "ee", ttsSpeech: "ee", ipaSampleUrl: "/audio/ipa/ee.mp3" },
  "/i/": { speech: "ee", ttsSpeech: "ee", ipaSampleUrl: "/audio/ipa/ee.mp3" },
  "/eɪ/": { speech: "ay", ttsSpeech: "ay" },
  "/aɪ/": { speech: "eye", ttsSpeech: "eye" },
  "/əʊ/": { speech: "oh", ttsSpeech: "oh" },
  "/juː/": { speech: "yoo", ttsSpeech: "yoo" },
  "/uː/": { speech: "ooh", ttsSpeech: "ooh", ipaSampleUrl: "/audio/ipa/oo.mp3" },
  "/ks/": {
    speech: "kuh-suh",
    ttsSpeech: "kuh-suh",
    ipaSampleUrl: "/audio/ipa/ks.mp3",
    acousticKind: "ks-burst",
  },
  "/kw/": {
    speech: "kwuh",
    ttsSpeech: "kwuh",
    ipaSampleUrl: "/audio/ipa/kw.mp3",
    clippedStop: true,
  },
  sh: {
    speech: "shhh",
    ttsSpeech: "shuh",
    ipaSampleUrl: "/audio/ipa/sh.mp3",
    acousticKind: "sh-hush",
  },
  ch: {
    speech: "chuh",
    ttsSpeech: "chuh",
    ipaSampleUrl: "/audio/ipa/ch.mp3",
    clippedStop: true,
  },
  th: {
    speech: "thuh",
    ttsSpeech: "thuh",
    ipaSampleUrl: "/audio/ipa/th-voiceless.mp3",
    acousticKind: "th-air",
  },
  ph: {
    speech: "fuh",
    ttsSpeech: "fuh",
    ipaSampleUrl: "/audio/ipa/f.mp3",
    acousticKind: "f-air",
  },
  wh: {
    speech: "wuh",
    ttsSpeech: "wuh",
    ipaSampleUrl: "/audio/ipa/w.mp3",
    clippedStop: true,
  },
  ck: {
    speech: "kuh",
    ttsSpeech: "kuh",
    ipaSampleUrl: "/audio/ipa/k.mp3",
    clippedStop: true,
  },
  ng: {
    speech: "ing",
    ttsSpeech: "ing",
    ipaSampleUrl: "/audio/ipa/ng.mp3",
    acousticKind: "n-hum",
  },
};

interface FormantSpec {
  f0Start: number;
  f0End: number;
  formants: [
    { freq: number; q: number; gain: number },
    { freq: number; q: number; gain: number },
    { freq: number; q: number; gain: number },
  ];
  duration: number;
  masterGain: number;
  lowpassHz: number;
}

/**
 * Calibrated F1 / F2 / F3 formant resonator specifications used as offline/fallback
 * synthesis when HTMLAudioElement playback is unavailable.
 */
const FORMANT_SPECS: Partial<Record<AcousticPhonemeKind, FormantSpec>> = {
  "a-short": {
    f0Start: 222,
    f0End: 204,
    formants: [
      { freq: 660, q: 7.0, gain: 1.0 },
      { freq: 1720, q: 10.0, gain: 0.68 },
      { freq: 2410, q: 12.0, gain: 0.32 },
    ],
    duration: 0.3,
    masterGain: 0.24,
    lowpassHz: 3300,
  },
  "e-short": {
    f0Start: 224,
    f0End: 206,
    formants: [
      { freq: 530, q: 7.0, gain: 1.0 },
      { freq: 1840, q: 10.0, gain: 0.65 },
      { freq: 2480, q: 12.0, gain: 0.3 },
    ],
    duration: 0.29,
    masterGain: 0.24,
    lowpassHz: 3300,
  },
  "i-short": {
    f0Start: 226,
    f0End: 210,
    formants: [
      { freq: 390, q: 7.5, gain: 1.0 },
      { freq: 1990, q: 10.5, gain: 0.62 },
      { freq: 2550, q: 12.0, gain: 0.28 },
    ],
    duration: 0.27,
    masterGain: 0.24,
    lowpassHz: 3400,
  },
  "o-short": {
    f0Start: 218,
    f0End: 200,
    formants: [
      { freq: 570, q: 7.0, gain: 1.0 },
      { freq: 840, q: 9.0, gain: 0.72 },
      { freq: 2410, q: 12.0, gain: 0.22 },
    ],
    duration: 0.3,
    masterGain: 0.24,
    lowpassHz: 3100,
  },
  "u-short": {
    f0Start: 220,
    f0End: 202,
    formants: [
      { freq: 640, q: 7.0, gain: 1.0 },
      { freq: 1190, q: 9.0, gain: 0.66 },
      { freq: 2390, q: 12.0, gain: 0.25 },
    ],
    duration: 0.28,
    masterGain: 0.24,
    lowpassHz: 3200,
  },
  "m-hum": {
    f0Start: 196,
    f0End: 188,
    formants: [
      { freq: 280, q: 6.0, gain: 1.0 },
      { freq: 1100, q: 8.5, gain: 0.32 },
      { freq: 2200, q: 11.0, gain: 0.14 },
    ],
    duration: 0.32,
    masterGain: 0.26,
    lowpassHz: 1800,
  },
  "n-hum": {
    f0Start: 202,
    f0End: 192,
    formants: [
      { freq: 300, q: 6.0, gain: 1.0 },
      { freq: 1550, q: 8.5, gain: 0.38 },
      { freq: 2500, q: 11.0, gain: 0.16 },
    ],
    duration: 0.32,
    masterGain: 0.26,
    lowpassHz: 2200,
  },
  "l-liquid": {
    f0Start: 210,
    f0End: 198,
    formants: [
      { freq: 360, q: 7.0, gain: 1.0 },
      { freq: 1350, q: 9.0, gain: 0.54 },
      { freq: 2650, q: 11.0, gain: 0.24 },
    ],
    duration: 0.3,
    masterGain: 0.24,
    lowpassHz: 3100,
  },
  "r-liquid": {
    f0Start: 206,
    f0End: 194,
    formants: [
      { freq: 420, q: 7.0, gain: 1.0 },
      { freq: 1250, q: 9.0, gain: 0.56 },
      { freq: 1650, q: 10.0, gain: 0.46 },
    ],
    duration: 0.3,
    masterGain: 0.24,
    lowpassHz: 2800,
  },
};

interface NoiseFricativeSpec {
  freq: number;
  q: number;
  gain: number;
  duration: number;
  buzzFreq?: number;
}

const FRICATIVE_SPECS: Partial<Record<AcousticPhonemeKind, NoiseFricativeSpec>> = {
  "s-hiss": { freq: 6400, q: 2.3, gain: 0.44, duration: 0.3 },
  "sh-hush": { freq: 2750, q: 1.7, gain: 0.45, duration: 0.3 },
  "f-air": { freq: 4400, q: 1.05, gain: 0.4, duration: 0.3 },
  "th-air": { freq: 5200, q: 0.85, gain: 0.34, duration: 0.3 },
  "h-breath": { freq: 1450, q: 0.85, gain: 0.44, duration: 0.28 },
  "z-buzz": { freq: 5700, q: 2.1, gain: 0.42, duration: 0.3, buzzFreq: 172 },
  "v-buzz": { freq: 3600, q: 1.2, gain: 0.38, duration: 0.3, buzzFreq: 162 },
};

let activeAudioCtx: AudioContext | null = null;
let sequenceTimerIds: number[] = [];
let songPlaybackToken = 0;
let activeSongNodes: AudioScheduledSourceNode[] = [];
let activeIpaAudio: HTMLAudioElement | null = null;
const ipaAudioCache = new Map<string, HTMLAudioElement>();

function clearPendingTimers(): void {
  if (typeof window === "undefined") return;
  for (const id of sequenceTimerIds) {
    window.clearTimeout(id);
  }
  sequenceTimerIds = [];
}

function stopActiveSongNodes(): void {
  for (const node of activeSongNodes) {
    try {
      node.stop();
      node.disconnect();
    } catch {
      // Node already ended
    }
  }
  activeSongNodes = [];
}

function stopActiveIpaAudio(): void {
  if (!activeIpaAudio) return;
  try {
    activeIpaAudio.onended = null;
    activeIpaAudio.onerror = null;
    activeIpaAudio.pause();
    activeIpaAudio.currentTime = 0;
  } catch {
    // Ignore audio stop errors in non-media environments
  }
  activeIpaAudio = null;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  try {
    if (!activeAudioCtx) activeAudioCtx = new Ctx();
    if (activeAudioCtx.state === "suspended") {
      void activeAudioCtx.resume();
    }
    return activeAudioCtx;
  } catch {
    return null;
  }
}

/**
 * Plays a bundled studio-mastered IPA MP3 sample (`/audio/ipa/*.mp3`).
 * Returns `true` when browser HTMLAudio playback was initiated cleanly; triggers
 * `onEnded` after the clip finishes or `onFallback` if HTMLAudio cannot play.
 */
function playBundledIpaSample(
  url: string,
  token: number,
  onEnded?: () => void,
  onFallback?: () => void,
): boolean {
  if (typeof window === "undefined" || typeof Audio === "undefined") return false;
  // JSDOM does not implement real audio decoding/playback
  if (typeof navigator !== "undefined" && /jsdom/i.test(navigator.userAgent)) {
    return false;
  }

  try {
    stopActiveIpaAudio();
    let audio = ipaAudioCache.get(url);
    if (!audio) {
      audio = new Audio(url);
      audio.preload = "auto";
      ipaAudioCache.set(url, audio);
    }
    audio.currentTime = 0;
    activeIpaAudio = audio;

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      if (activeIpaAudio === audio) activeIpaAudio = null;
      if (token === songPlaybackToken) onEnded?.();
    };
    const fail = () => {
      if (settled) return;
      settled = true;
      if (activeIpaAudio === audio) activeIpaAudio = null;
      if (token === songPlaybackToken) onFallback?.();
    };

    audio.onended = finish;
    audio.onerror = fail;

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(fail);
    }
    return true;
  } catch {
    return false;
  }
}

function playFilteredNoiseBurst(
  ctx: AudioContext,
  startTime: number,
  duration: number,
  freq: number,
  q: number,
  gainAmount: number,
): void {
  const sampleRate = ctx.sampleRate;
  const bufferSize = Math.max(1, Math.floor(sampleRate * duration));
  const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    const env = Math.sin((Math.PI * i) / bufferSize);
    data[i] = (Math.random() * 2 - 1) * env * 0.24;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = freq;
  filter.Q.value = q;

  const gain = ctx.createGain();
  gain.gain.value = gainAmount;

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  noise.start(startTime);
}

function playFormantPhoneme(ctx: AudioContext, spec: FormantSpec): void {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(spec.f0Start, now);
  osc.frequency.linearRampToValueAtTime(spec.f0End, now + spec.duration);

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.001, now);
  master.gain.linearRampToValueAtTime(spec.masterGain, now + 0.028);
  master.gain.setValueAtTime(spec.masterGain, now + Math.max(0.04, spec.duration - 0.06));
  master.gain.exponentialRampToValueAtTime(0.001, now + spec.duration);

  const warmth = ctx.createBiquadFilter();
  warmth.type = "lowpass";
  warmth.frequency.value = spec.lowpassHz;

  for (const formant of spec.formants) {
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = formant.freq;
    bp.Q.value = formant.q;

    const fg = ctx.createGain();
    fg.gain.value = formant.gain;

    osc.connect(bp);
    bp.connect(fg);
    fg.connect(warmth);
  }

  warmth.connect(master);
  master.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + spec.duration + 0.02);
}

/**
 * Plays a Web Audio API acoustic phoneme cue fallback when HTMLAudio playback
 * of bundled IPA MP3 samples is unavailable.
 */
export function playAcousticPhonemeCue(kind: AcousticPhonemeKind): boolean {
  const ctx = getAudioContext();
  if (!ctx) return false;
  try {
    const formantSpec = FORMANT_SPECS[kind];
    if (formantSpec) {
      playFormantPhoneme(ctx, formantSpec);
      return true;
    }

    if (kind === "ks-burst") {
      const now = ctx.currentTime;
      playFilteredNoiseBurst(ctx, now, 0.048, 2300, 1.6, 0.55);
      playFilteredNoiseBurst(ctx, now + 0.055, 0.21, 6300, 2.3, 0.44);
      return true;
    }

    const fric = FRICATIVE_SPECS[kind];
    if (!fric) return false;

    const now = ctx.currentTime;
    playFilteredNoiseBurst(ctx, now, fric.duration, fric.freq, fric.q, fric.gain);

    if (fric.buzzFreq) {
      const osc = ctx.createOscillator();
      const buzzLp = ctx.createBiquadFilter();
      const oscGain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.value = fric.buzzFreq;
      buzzLp.type = "lowpass";
      buzzLp.frequency.value = 540;
      oscGain.gain.setValueAtTime(0.001, now);
      oscGain.gain.linearRampToValueAtTime(0.11, now + 0.04);
      oscGain.gain.linearRampToValueAtTime(0.001, now + fric.duration);
      osc.connect(buzzLp);
      buzzLp.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + fric.duration + 0.01);
    }
    return true;
  } catch {
    return false;
  }
}

/** Speaks a letter's NAME unambiguously (e.g., "The letter B" -> /biː/). */
export function playLetterName(letter: string): string {
  songPlaybackToken += 1;
  clearPendingTimers();
  stopActiveSongNodes();
  stopActiveIpaAudio();
  stopSpeech();
  const key = letter.trim().toUpperCase();
  const spec = LETTER_PHONICS_AUDIO[key];
  const text = spec ? spec.nameSpeech : `The letter ${key}`;
  speakAsRole(text, "female-teacher", { rate: 0.84 });
  return text;
}

/**
 * Plays ONLY the isolated authentic real-human IPA sample for a letter (A–Z)
 * or IPA symbol (e.g., "/æ/", "/b/", "/ks/") with no trailing spoken word.
 */
export function playPureIpaSample(letterOrIpa: string): string {
  songPlaybackToken += 1;
  const token = songPlaybackToken;
  clearPendingTimers();
  stopActiveSongNodes();
  stopActiveIpaAudio();
  stopSpeech();

  const resolved = resolvePhonemeSpeech(letterOrIpa);
  const runFallback = () => {
    if (token !== songPlaybackToken) return;
    const acousticPlayed = resolved.acousticKind
      ? playAcousticPhonemeCue(resolved.acousticKind)
      : false;
    if (!acousticPlayed) {
      speakAsRole(resolved.ttsSpeech, "female-teacher", {
        rate: resolved.clippedStop ? 0.92 : 0.82,
      });
    }
  };

  if (resolved.ipaSampleUrl) {
    const started = playBundledIpaSample(resolved.ipaSampleUrl, token, undefined, runFallback);
    if (started) return resolved.ipaSampleUrl;
  }

  runFallback();
  return resolved.ipaSampleUrl ?? resolved.speech;
}

/**
 * Plays a letter's PURE IPA PHONEME SOUND using the bundled real-human IPA MP3
 * recording (e.g. `/audio/ipa/ae.mp3` -> /æ/), followed after a clean pause by
 * its anchor example word (e.g. "apple"). Never reads the letter name and never
 * overlaps the IPA clip with TTS.
 */
export function playLetterSound(letter: string, exampleWord?: string): string {
  songPlaybackToken += 1;
  const token = songPlaybackToken;
  clearPendingTimers();
  stopActiveSongNodes();
  stopActiveIpaAudio();
  stopSpeech();
  const key = letter.trim().toUpperCase();
  const spec = LETTER_PHONICS_AUDIO[key];
  if (!spec) {
    speakAsRole(letter, "female-teacher", { rate: 0.82 });
    return letter;
  }

  const word = exampleWord ?? spec.anchorWord;

  const speakAnchorWord = (delayMs = 170) => {
    if (!word || typeof window === "undefined" || token !== songPlaybackToken) return;
    const tid = window.setTimeout(() => {
      if (token === songPlaybackToken) {
        speakAsRole(word, "female-teacher", { rate: 0.84 });
      }
    }, delayMs);
    sequenceTimerIds.push(tid);
  };

  const runFallback = () => {
    if (token !== songPlaybackToken) return;
    const acousticPlayed = spec.acousticKind ? playAcousticPhonemeCue(spec.acousticKind) : false;
    if (acousticPlayed) {
      speakAnchorWord(360);
    } else {
      speakAsRole(spec.soundSpeech, "female-teacher", {
        rate: spec.clippedStop ? 0.92 : 0.82,
        onEnd: () => speakAnchorWord(210),
      });
    }
  };

  const startedIpa = playBundledIpaSample(
    spec.ipaSampleUrl,
    token,
    () => speakAnchorWord(170),
    runFallback,
  );

  if (!startedIpa) {
    runFallback();
  }

  return word ? `${spec.soundSpeech} ... ${word}` : spec.soundSpeech;
}

/**
 * Plays a crisp side-by-side contrast:
 * Letter NAME ("The letter A") -> pause -> Authentic IPA Sample (/æ/) -> Anchor word ("apple").
 */
export function playLetterNameVsSound(letter: string, exampleWord?: string): string {
  songPlaybackToken += 1;
  const token = songPlaybackToken;
  clearPendingTimers();
  stopActiveSongNodes();
  stopActiveIpaAudio();
  stopSpeech();

  const key = letter.trim().toUpperCase();
  const spec = LETTER_PHONICS_AUDIO[key];
  if (!spec) return letter;

  const word = exampleWord ?? spec.anchorWord;
  const playSecondStage = () => {
    if (token !== songPlaybackToken || typeof window === "undefined") return;
    const tid = window.setTimeout(() => {
      if (token !== songPlaybackToken) return;
      const speakWord = () => {
        if (token !== songPlaybackToken || !word) return;
        const wTid = window.setTimeout(() => {
          if (token === songPlaybackToken) {
            speakAsRole(word, "female-teacher", { rate: 0.84 });
          }
        }, 180);
        sequenceTimerIds.push(wTid);
      };
      const started = playBundledIpaSample(spec.ipaSampleUrl, token, speakWord, () => {
        if (spec.acousticKind && playAcousticPhonemeCue(spec.acousticKind)) {
          const wTid = window.setTimeout(speakWord, 340);
          sequenceTimerIds.push(wTid);
        } else {
          speakWord();
        }
      });
      if (!started) {
        if (spec.acousticKind && playAcousticPhonemeCue(spec.acousticKind)) {
          const wTid = window.setTimeout(speakWord, 340);
          sequenceTimerIds.push(wTid);
        } else {
          speakWord();
        }
      }
    }, 320);
    sequenceTimerIds.push(tid);
  };

  const spoke = speakAsRole(spec.nameSpeech, "female-teacher", {
    rate: 0.84,
    onEnd: playSecondStage,
    onError: playSecondStage,
  });
  if (!spoke) {
    playSecondStage();
  }

  return `${spec.nameSpeech} -> ${spec.ipaSymbol} (${word})`;
}

/** Plays an authentic IPA short or long vowel sound followed by its anchor word. */
export function playVowelSound(
  vowel: "A" | "E" | "I" | "O" | "U",
  length: "short" | "long",
  exampleWord: string,
  exampleSentence?: string,
): string {
  songPlaybackToken += 1;
  const token = songPlaybackToken;
  clearPendingTimers();
  stopActiveSongNodes();
  stopActiveIpaAudio();
  stopSpeech();
  const spec = VOWEL_SOUND_SPEECH[vowel];
  const cueLabel = length === "short" ? spec.shortSpeech : spec.longSpeech;
  const tail = exampleSentence ? `${exampleWord}. ${exampleSentence}` : exampleWord;

  const speakTail = (delayMs = 190) => {
    if (typeof window === "undefined" || token !== songPlaybackToken) return;
    const tid = window.setTimeout(() => {
      if (token === songPlaybackToken) {
        speakAsRole(tail, "female-teacher", { rate: 0.84 });
      }
    }, delayMs);
    sequenceTimerIds.push(tid);
  };

  if (length === "short") {
    const runFallback = () => {
      if (token !== songPlaybackToken) return;
      const acousticPlayed = playAcousticPhonemeCue(spec.shortAcousticKind);
      if (acousticPlayed) {
        speakTail(360);
      } else {
        speakAsRole(spec.shortTtsSpeech, "female-teacher", {
          rate: 0.82,
          onEnd: () => speakTail(220),
        });
      }
    };

    const startedIpa = playBundledIpaSample(
      spec.shortIpaSampleUrl,
      token,
      () => speakTail(190),
      runFallback,
    );
    if (!startedIpa) {
      runFallback();
    }
    return `${cueLabel} ... ${exampleWord}`;
  }

  if (spec.longIpaSampleUrl) {
    const startedLong = playBundledIpaSample(
      spec.longIpaSampleUrl,
      token,
      () => speakTail(190),
      () =>
        speakAsRole(spec.longSpeech, "female-teacher", {
          rate: 0.8,
          onEnd: () => speakTail(220),
        }),
    );
    if (startedLong) return `${cueLabel} ... ${exampleWord}`;
  }

  speakAsRole(spec.longSpeech, "female-teacher", {
    rate: 0.8,
    onEnd: () => speakTail(220),
  });

  return `${cueLabel} ... ${exampleWord}`;
}

/** Resolves any IPA symbol, digraph, or single letter to its authentic IPA sample & fallback cue. */
export function resolvePhonemeSpeech(phonemeOrGrapheme: string): ResolvedPhonemeSpeech {
  const trimmed = phonemeOrGrapheme.trim();
  const direct = PHONEME_SPEECH_MAP[trimmed] ?? PHONEME_SPEECH_MAP[trimmed.toLowerCase()];
  if (direct) return direct;

  const upper = trimmed.replaceAll("/", "").toUpperCase();
  const letterSpec = LETTER_PHONICS_AUDIO[upper];
  if (letterSpec) {
    return {
      speech: letterSpec.soundSpeech,
      ttsSpeech: letterSpec.soundSpeech,
      ipaSampleUrl: letterSpec.ipaSampleUrl,
      ...(letterSpec.acousticKind ? { acousticKind: letterSpec.acousticKind } : {}),
      ...(letterSpec.clippedStop ? { clippedStop: letterSpec.clippedStop } : {}),
    };
  }
  const clean = trimmed.replaceAll("/", "");
  return { speech: clean, ttsSpeech: clean };
}

/** Plays a single phoneme/digraph sound (e.g., /θ/, /ʃ/, sh, ch, /æ/, /k/) using its authentic IPA sample. */
export function playPhonemeSound(phonemeOrGrapheme: string, exampleWord?: string): string {
  songPlaybackToken += 1;
  const token = songPlaybackToken;
  clearPendingTimers();
  stopActiveSongNodes();
  stopActiveIpaAudio();
  stopSpeech();
  const resolved = resolvePhonemeSpeech(phonemeOrGrapheme);

  const speakExample = (delayMs = 180) => {
    if (!exampleWord || typeof window === "undefined" || token !== songPlaybackToken) return;
    const tid = window.setTimeout(() => {
      if (token === songPlaybackToken) {
        speakAsRole(exampleWord, "female-teacher", { rate: 0.84 });
      }
    }, delayMs);
    sequenceTimerIds.push(tid);
  };

  const runFallback = () => {
    if (token !== songPlaybackToken) return;
    const acousticPlayed = resolved.acousticKind
      ? playAcousticPhonemeCue(resolved.acousticKind)
      : false;
    if (acousticPlayed) {
      speakExample(360);
    } else {
      speakAsRole(resolved.ttsSpeech, "female-teacher", {
        rate: resolved.clippedStop ? 0.92 : 0.82,
        onEnd: () => speakExample(220),
      });
    }
  };

  if (resolved.ipaSampleUrl) {
    const started = playBundledIpaSample(
      resolved.ipaSampleUrl,
      token,
      () => speakExample(180),
      runFallback,
    );
    if (started) {
      return exampleWord ? `${resolved.speech} ... ${exampleWord}` : resolved.speech;
    }
  }

  runFallback();
  return exampleWord ? `${resolved.speech} ... ${exampleWord}` : resolved.speech;
}

/**
 * Plays a full phoneme blending sequence (e.g., ["/k/", "/æ/", "/t/"] -> "cat")
 * sounding out each real-human IPA phoneme sample cleanly before speaking the blended word.
 */
export function playBlendedWord(phonemes: string[], fullWord: string): string[] {
  songPlaybackToken += 1;
  const token = songPlaybackToken;
  clearPendingTimers();
  stopActiveSongNodes();
  stopActiveIpaAudio();
  stopSpeech();
  const resolvedSteps = phonemes.map((p) => resolvePhonemeSpeech(p));

  const playStep = (idx: number) => {
    if (token !== songPlaybackToken) return;
    if (idx >= resolvedSteps.length) {
      if (typeof window !== "undefined") {
        const tid = window.setTimeout(() => {
          if (token === songPlaybackToken) {
            speakAsRole(fullWord, "female-teacher", { rate: 0.84 });
          }
        }, 220);
        sequenceTimerIds.push(tid);
      }
      return;
    }
    const step = resolvedSteps[idx]!;
    const scheduleNext = (delayMs = 130) => {
      if (token !== songPlaybackToken || typeof window === "undefined") return;
      const tid = window.setTimeout(() => playStep(idx + 1), delayMs);
      sequenceTimerIds.push(tid);
    };

    const runFallback = () => {
      if (token !== songPlaybackToken) return;
      if (step.acousticKind && playAcousticPhonemeCue(step.acousticKind)) {
        scheduleNext(390);
        return;
      }
      const ok = speakAsRole(step.ttsSpeech, "female-teacher", {
        rate: step.clippedStop ? 0.92 : 0.82,
        onEnd: () => scheduleNext(170),
      });
      if (!ok) {
        scheduleNext(350);
      }
    };

    if (step.ipaSampleUrl) {
      const started = playBundledIpaSample(
        step.ipaSampleUrl,
        token,
        () => scheduleNext(130),
        runFallback,
      );
      if (started) return;
    }

    runFallback();
  };

  playStep(0);
  return [...resolvedSteps.map((r) => r.speech), fullWord];
}

// ---------------------------------------------------------------------------
// Kid-Friendly Musical Xylophone / Marimba Song Engine
// ---------------------------------------------------------------------------

/**
 * Synthesizes a single cheerful wooden marimba / bell-xylophone note via Web Audio API.
 */
export function playMarimbaNote(freqHz: number, durationSec = 0.34, startOffsetSec = 0): boolean {
  const ctx = getAudioContext();
  if (!ctx) return false;
  try {
    const startAt = ctx.currentTime + Math.max(0, startOffsetSec);
    const fundamental = ctx.createOscillator();
    const overtone = ctx.createOscillator();
    const fundGain = ctx.createGain();
    const overGain = ctx.createGain();

    fundamental.type = "sine";
    fundamental.frequency.setValueAtTime(freqHz, startAt);

    overtone.type = "triangle";
    overtone.frequency.setValueAtTime(freqHz * 4, startAt);

    fundGain.gain.setValueAtTime(0.001, startAt);
    fundGain.gain.linearRampToValueAtTime(0.22, startAt + 0.009);
    fundGain.gain.exponentialRampToValueAtTime(0.001, startAt + durationSec);

    overGain.gain.setValueAtTime(0.001, startAt);
    overGain.gain.linearRampToValueAtTime(0.055, startAt + 0.006);
    overGain.gain.exponentialRampToValueAtTime(0.001, startAt + Math.min(0.11, durationSec * 0.4));

    fundamental.connect(fundGain);
    fundGain.connect(ctx.destination);
    overtone.connect(overGain);
    overGain.connect(ctx.destination);

    fundamental.start(startAt);
    fundamental.stop(startAt + durationSec + 0.02);
    overtone.start(startAt);
    overtone.stop(startAt + Math.min(0.13, durationSec + 0.02));

    activeSongNodes.push(fundamental, overtone);
    fundamental.onended = () => {
      activeSongNodes = activeSongNodes.filter((n) => n !== fundamental && n !== overtone);
    };
    return true;
  } catch {
    return false;
  }
}

function playMarimbaPhrase(notesHz: number[], stepSec = 0.19): void {
  for (let i = 0; i < notesHz.length; i++) {
    const hz = notesHz[i];
    if (hz) playMarimbaNote(hz, 0.34, i * stepSec);
  }
}

/** Stops any currently playing IPA clip, phonics song verse, or multi-letter musical song. */
export function stopPhonicsSong(): void {
  songPlaybackToken += 1;
  clearPendingTimers();
  stopActiveSongNodes();
  stopActiveIpaAudio();
  stopSpeech();
}

/**
 * Plays a single letter's cheerful 4-line Phonics Song Verse (A–Z) with synchronized
 * xylophone/marimba notes, the letter's real-human IPA phoneme sample, and beat callbacks.
 */
export function playPhonicsSongVerse(
  letter: string,
  onBeat?: (beatIndex: number) => void,
): string[] {
  stopPhonicsSong();
  const token = songPlaybackToken;
  const key = letter.trim().toUpperCase();
  const verse = LETTER_PHONICS_SONGS[key];
  if (!verse) return [];

  const letterSpec = LETTER_PHONICS_AUDIO[key];
  const lines = [...verse.lyricsEn];
  const notes = verse.melodyHz;

  const runLine = (idx: number) => {
    if (token !== songPlaybackToken) return;
    if (idx >= lines.length) {
      playMarimbaPhrase(
        [PHONICS_NOTES.C5, PHONICS_NOTES.E5, PHONICS_NOTES.G5, PHONICS_NOTES.C6],
        0.13,
      );
      onBeat?.(-1);
      return;
    }

    onBeat?.(idx);
    const sliceStart = (idx * 2) % Math.max(1, notes.length);
    const phrase = [
      notes[sliceStart] ?? PHONICS_NOTES.C5,
      notes[(sliceStart + 1) % notes.length] ?? PHONICS_NOTES.E5,
      notes[(sliceStart + 2) % notes.length] ?? PHONICS_NOTES.G5,
    ];
    playMarimbaPhrase(phrase, 0.17);

    const lineText = lines[idx]!;
    const scheduleNext = () => {
      if (token !== songPlaybackToken || typeof window === "undefined") return;
      const tid = window.setTimeout(() => runLine(idx + 1), 240);
      sequenceTimerIds.push(tid);
    };

    const speakLine = () => {
      if (token !== songPlaybackToken) return;
      const spoke = speakAsRole(lineText, "female-teacher", {
        rate: 0.9,
        onEnd: scheduleNext,
        onError: scheduleNext,
      });
      if (!spoke && typeof window !== "undefined") {
        const tid = window.setTimeout(() => runLine(idx + 1), 1650);
        sequenceTimerIds.push(tid);
      }
    };

    // On beat 1 (pure sound intro), play the letter's authentic IPA sample cleanly BEFORE the line
    if (idx === 1 && letterSpec?.ipaSampleUrl) {
      const started = playBundledIpaSample(letterSpec.ipaSampleUrl, token, speakLine, () => {
        if (letterSpec.acousticKind) playAcousticPhonemeCue(letterSpec.acousticKind);
        speakLine();
      });
      if (started) return;
    }

    speakLine();
  };

  playMarimbaPhrase([notes[0] ?? PHONICS_NOTES.C5, notes[1] ?? PHONICS_NOTES.E5], 0.14);
  if (typeof window !== "undefined") {
    const startId = window.setTimeout(() => runLine(0), 260);
    sequenceTimerIds.push(startId);
  } else {
    onBeat?.(0);
  }

  return lines;
}

/**
 * Plays one of the 4 complete educational multi-letter phonics songs (`pure-sounds-az`,
 * `five-short-vowels`, `soft-air-buzz`, `bouncy-consonants`) with synchronized marimba
 * melodies, real-human IPA phoneme samples, and line-highlight callbacks.
 */
export function playMusicalPhonicsSong(
  songId: string,
  onLine?: (lineIndex: number) => void,
): string[] {
  stopPhonicsSong();
  const token = songPlaybackToken;
  const song = FULL_PHONICS_SONGS.find((s) => s.id === songId);
  if (!song) return [];

  const lineTexts = song.lines.map((l) => l.lyricEn);
  const beatStepSec = Math.max(0.14, Math.min(0.24, 60 / (song.tempoBpm * 2.8)));

  const runLine = (idx: number) => {
    if (token !== songPlaybackToken) return;
    const line = song.lines[idx];
    if (!line) {
      playMarimbaPhrase(
        [PHONICS_NOTES.C5, PHONICS_NOTES.E5, PHONICS_NOTES.G5, PHONICS_NOTES.C6],
        0.13,
      );
      onLine?.(-1);
      return;
    }

    onLine?.(idx);
    playMarimbaPhrase(line.melodyHz.slice(0, 4), beatStepSec);

    const scheduleNext = () => {
      if (token !== songPlaybackToken || typeof window === "undefined") return;
      const tid = window.setTimeout(() => runLine(idx + 1), 280);
      sequenceTimerIds.push(tid);
    };

    const speakLyric = () => {
      if (token !== songPlaybackToken) return;
      const spoke = speakAsRole(line.lyricEn, "female-teacher", {
        rate: 0.9,
        onEnd: scheduleNext,
        onError: scheduleNext,
      });
      if (!spoke && typeof window !== "undefined") {
        const fallbackTid = window.setTimeout(() => runLine(idx + 1), 1900);
        sequenceTimerIds.push(fallbackTid);
      }
    };

    const resolvedPhoneme = line.phoneme ? resolvePhonemeSpeech(line.phoneme) : null;
    if (resolvedPhoneme?.ipaSampleUrl) {
      const started = playBundledIpaSample(resolvedPhoneme.ipaSampleUrl, token, speakLyric, () => {
        if (resolvedPhoneme.acousticKind) playAcousticPhonemeCue(resolvedPhoneme.acousticKind);
        if (typeof window !== "undefined") {
          const speakTid = window.setTimeout(speakLyric, 320);
          sequenceTimerIds.push(speakTid);
        }
      });
      if (started) return;
    }

    if (resolvedPhoneme?.acousticKind) {
      playAcousticPhonemeCue(resolvedPhoneme.acousticKind);
    }

    const speakStartDelay = resolvedPhoneme?.acousticKind ? 320 : 120;
    if (typeof window !== "undefined") {
      const speakTid = window.setTimeout(speakLyric, speakStartDelay);
      sequenceTimerIds.push(speakTid);
    }
  };

  playMarimbaPhrase(song.melodyHz.slice(0, 3), 0.14);
  if (typeof window !== "undefined") {
    const startTid = window.setTimeout(() => runLine(0), 380);
    sequenceTimerIds.push(startTid);
  } else {
    onLine?.(0);
  }

  return lineTexts;
}
