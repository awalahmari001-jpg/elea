/**
 * Calibrated Kids Phonics, Pure Phoneme Synthesis & Musical Song Audio Engine.
 *
 * Standard Web Speech TTS pronounces single letters ("a", "b", "c", "s") as their
 * LETTER NAMES (/eɪ/, /biː/, /siː/, /es/), spells out repeated-letter strings like
 * "fff", "lll", "sss", "ih" as letter names ("eff-eff-eff", "I-H"), and reads
 * "aah"/"aw" as wrong vowels (/ɑː/, /ɔː/) instead of authentic short /æ/ and /ɒ/.
 *
 * This engine solves all three problems:
 * 1. Keeps Letter NAME audio strictly separated from Pure Letter SOUND audio.
 * 2. Synthesizes all 5 short vowels (3-formant F1/F2/F3 resonators), voiceless &
 *    voiced fricatives (bandpass noise + glottal buzz), nasals, liquids, and /ks/
 *    bursts directly via Web Audio API (`playAcousticPhonemeCue`), never sending
 *    spelled-out strings or wrong vowels to Web Speech TTS.
 * 3. Includes a cheerful Web Audio Xylophone / Marimba Song Engine synchronized
 *    with spoken/sung phonics verses and pure phoneme cues.
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
  /** Spoken text that guarantees TTS pronounces the Letter NAME clearly. */
  nameSpeech: string;
  /** TTS-safe pure sound realization (never bare single letters, repeated letters, or wrong vowels). */
  soundSpeech: string;
  /** Child-friendly pure-sound label shown alongside the IPA badge (contrasted with letter name). */
  phoneticHint: string;
  /** Anchor example word demonstrating the pure initial (or final for X) sound. */
  anchorWord: string;
  /** Web Audio acoustic synthesizer mode for pure vowels, fricatives, nasals, liquids & bursts. */
  acousticKind?: AcousticPhonemeKind;
  /** True for stop/plosive/glide consonants spoken slightly brisker to clip trailing schwa. */
  clippedStop?: boolean;
}

export const LETTER_PHONICS_AUDIO: Record<string, LetterPhonicsAudioSpec> = {
  A: {
    letter: "A",
    nameSpeech: "The letter A",
    soundSpeech: "short a",
    phoneticHint: "short a (apple)",
    anchorWord: "apple",
    acousticKind: "a-short",
  },
  B: {
    letter: "B",
    nameSpeech: "The letter B",
    soundSpeech: "buh",
    phoneticHint: "quick buh (ball)",
    anchorWord: "ball",
    clippedStop: true,
  },
  C: {
    letter: "C",
    nameSpeech: "The letter C",
    soundSpeech: "kuh",
    phoneticHint: "crisp k (cat)",
    anchorWord: "cat",
    clippedStop: true,
  },
  D: {
    letter: "D",
    nameSpeech: "The letter D",
    soundSpeech: "duh",
    phoneticHint: "quick d (dog)",
    anchorWord: "dog",
    clippedStop: true,
  },
  E: {
    letter: "E",
    nameSpeech: "The letter E",
    soundSpeech: "eh",
    phoneticHint: "short e (egg)",
    anchorWord: "egg",
    acousticKind: "e-short",
  },
  F: {
    letter: "F",
    nameSpeech: "The letter F",
    soundSpeech: "fuh",
    phoneticHint: "soft air f (fish)",
    anchorWord: "fish",
    acousticKind: "f-air",
  },
  G: {
    letter: "G",
    nameSpeech: "The letter G",
    soundSpeech: "guh",
    phoneticHint: "quick g (goat)",
    anchorWord: "goat",
    clippedStop: true,
  },
  H: {
    letter: "H",
    nameSpeech: "The letter H",
    soundSpeech: "huh",
    phoneticHint: "soft breath h (hat)",
    anchorWord: "hat",
    acousticKind: "h-breath",
  },
  I: {
    letter: "I",
    nameSpeech: "The letter I",
    soundSpeech: "short i",
    phoneticHint: "short i (igloo)",
    anchorWord: "igloo",
    acousticKind: "i-short",
  },
  J: {
    letter: "J",
    nameSpeech: "The letter J",
    soundSpeech: "juh",
    phoneticHint: "bouncy j (jam)",
    anchorWord: "jam",
    clippedStop: true,
  },
  K: {
    letter: "K",
    nameSpeech: "The letter K",
    soundSpeech: "kuh",
    phoneticHint: "crisp k (kite)",
    anchorWord: "kite",
    clippedStop: true,
  },
  L: {
    letter: "L",
    nameSpeech: "The letter L",
    soundSpeech: "luh",
    phoneticHint: "smooth l (lion)",
    anchorWord: "lion",
    acousticKind: "l-liquid",
  },
  M: {
    letter: "M",
    nameSpeech: "The letter M",
    soundSpeech: "muh",
    phoneticHint: "lip hum m (moon)",
    anchorWord: "moon",
    acousticKind: "m-hum",
  },
  N: {
    letter: "N",
    nameSpeech: "The letter N",
    soundSpeech: "nuh",
    phoneticHint: "nose hum n (nest)",
    anchorWord: "nest",
    acousticKind: "n-hum",
  },
  O: {
    letter: "O",
    nameSpeech: "The letter O",
    soundSpeech: "short o",
    phoneticHint: "short o (octopus)",
    anchorWord: "octopus",
    acousticKind: "o-short",
  },
  P: {
    letter: "P",
    nameSpeech: "The letter P",
    soundSpeech: "puh",
    phoneticHint: "air pop p (pen)",
    anchorWord: "pen",
    clippedStop: true,
  },
  Q: {
    letter: "Q",
    nameSpeech: "The letter Q",
    soundSpeech: "kwuh",
    phoneticHint: "kw blend (queen)",
    anchorWord: "queen",
    clippedStop: true,
  },
  R: {
    letter: "R",
    nameSpeech: "The letter R",
    soundSpeech: "ruh",
    phoneticHint: "curled r (rabbit)",
    anchorWord: "rabbit",
    acousticKind: "r-liquid",
  },
  S: {
    letter: "S",
    nameSpeech: "The letter S",
    soundSpeech: "suh",
    phoneticHint: "snake hiss s (sun)",
    anchorWord: "sun",
    acousticKind: "s-hiss",
  },
  T: {
    letter: "T",
    nameSpeech: "The letter T",
    soundSpeech: "tuh",
    phoneticHint: "crisp tap t (tiger)",
    anchorWord: "tiger",
    clippedStop: true,
  },
  U: {
    letter: "U",
    nameSpeech: "The letter U",
    soundSpeech: "uh",
    phoneticHint: "short u (umbrella)",
    anchorWord: "umbrella",
    acousticKind: "u-short",
  },
  V: {
    letter: "V",
    nameSpeech: "The letter V",
    soundSpeech: "vuh",
    phoneticHint: "buzzing v (van)",
    anchorWord: "van",
    acousticKind: "v-buzz",
  },
  W: {
    letter: "W",
    nameSpeech: "The letter W",
    soundSpeech: "wuh",
    phoneticHint: "round glide w (water)",
    anchorWord: "water",
    clippedStop: true,
  },
  X: {
    letter: "X",
    nameSpeech: "The letter X",
    soundSpeech: "kuh-suh",
    phoneticHint: "k-s burst (box)",
    anchorWord: "box",
    acousticKind: "ks-burst",
  },
  Y: {
    letter: "Y",
    nameSpeech: "The letter Y",
    soundSpeech: "yuh",
    phoneticHint: "soft glide y (yellow)",
    anchorWord: "yellow",
    clippedStop: true,
  },
  Z: {
    letter: "Z",
    nameSpeech: "The letter Z",
    soundSpeech: "zuh",
    phoneticHint: "bee buzz z (zebra)",
    anchorWord: "zebra",
    acousticKind: "z-buzz",
  },
};

export interface VowelSoundSpeechSpec {
  /** Return-value label token preserved for audio engine contracts. */
  shortSpeech: string;
  /** Authentic Web Audio formant cue for the pure short vowel. */
  shortAcousticKind: AcousticPhonemeKind;
  /** TTS-safe fallback cue (never passes "aah", "ih", or "aw" to Web Speech TTS). */
  shortTtsSpeech: string;
  /** Natural spoken cue for the long vowel (says its name). */
  longSpeech: string;
}

export const VOWEL_SOUND_SPEECH: Record<"A" | "E" | "I" | "O" | "U", VowelSoundSpeechSpec> = {
  A: {
    shortSpeech: "aah",
    shortAcousticKind: "a-short",
    shortTtsSpeech: "short a",
    longSpeech: "ay",
  },
  E: {
    shortSpeech: "eh",
    shortAcousticKind: "e-short",
    shortTtsSpeech: "eh",
    longSpeech: "ee",
  },
  I: {
    shortSpeech: "short i",
    shortAcousticKind: "i-short",
    shortTtsSpeech: "short i",
    longSpeech: "eye",
  },
  O: {
    shortSpeech: "short o",
    shortAcousticKind: "o-short",
    shortTtsSpeech: "short o",
    longSpeech: "oh",
  },
  U: {
    shortSpeech: "uh",
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
  /** Authentic Web Audio cue played directly for pure vowels, fricatives, nasals, liquids & bursts. */
  acousticKind?: AcousticPhonemeKind;
  /** True for plosives/affricates/glides spoken briskly to minimize trailing schwa. */
  clippedStop?: boolean;
}

/** Maps IPA symbols, digraphs, and single phoneme letters to accurate acoustic & TTS-safe cues. */
const PHONEME_SPEECH_MAP: Record<string, ResolvedPhonemeSpeech> = {
  "/p/": { speech: "puh", ttsSpeech: "puh", clippedStop: true },
  "/b/": { speech: "buh", ttsSpeech: "buh", clippedStop: true },
  "/m/": { speech: "muh", ttsSpeech: "muh", acousticKind: "m-hum" },
  "/w/": { speech: "wuh", ttsSpeech: "wuh", clippedStop: true },
  "/f/": { speech: "fuh", ttsSpeech: "fuh", acousticKind: "f-air" },
  "/v/": { speech: "vuh", ttsSpeech: "vuh", acousticKind: "v-buzz" },
  "/θ/": { speech: "thuh", ttsSpeech: "thuh", acousticKind: "th-air" },
  "/ð/": { speech: "theh", ttsSpeech: "theh" },
  "/t/": { speech: "tuh", ttsSpeech: "tuh", clippedStop: true },
  "/d/": { speech: "duh", ttsSpeech: "duh", clippedStop: true },
  "/n/": { speech: "nuh", ttsSpeech: "nuh", acousticKind: "n-hum" },
  "/s/": { speech: "suh", ttsSpeech: "suh", acousticKind: "s-hiss" },
  "/z/": { speech: "zuh", ttsSpeech: "zuh", acousticKind: "z-buzz" },
  "/l/": { speech: "luh", ttsSpeech: "luh", acousticKind: "l-liquid" },
  "/r/": { speech: "ruh", ttsSpeech: "ruh", acousticKind: "r-liquid" },
  "/ʃ/": { speech: "shhh", ttsSpeech: "shuh", acousticKind: "sh-hush" },
  "/ʒ/": { speech: "zhuh", ttsSpeech: "zhuh" },
  "/tʃ/": { speech: "chuh", ttsSpeech: "chuh", clippedStop: true },
  "/dʒ/": { speech: "juh", ttsSpeech: "juh", clippedStop: true },
  "/j/": { speech: "yuh", ttsSpeech: "yuh", clippedStop: true },
  "/k/": { speech: "kuh", ttsSpeech: "kuh", clippedStop: true },
  "/ɡ/": { speech: "guh", ttsSpeech: "guh", clippedStop: true },
  "/g/": { speech: "guh", ttsSpeech: "guh", clippedStop: true },
  "/ŋ/": { speech: "ing", ttsSpeech: "ing", acousticKind: "n-hum" },
  "/h/": { speech: "huh", ttsSpeech: "huh", acousticKind: "h-breath" },
  "/æ/": { speech: "aah", ttsSpeech: "short a", acousticKind: "a-short" },
  "/e/": { speech: "eh", ttsSpeech: "eh", acousticKind: "e-short" },
  "/ɪ/": { speech: "short i", ttsSpeech: "short i", acousticKind: "i-short" },
  "/ɒ/": { speech: "short o", ttsSpeech: "short o", acousticKind: "o-short" },
  "/ʌ/": { speech: "uh", ttsSpeech: "uh", acousticKind: "u-short" },
  "/iː/": { speech: "ee", ttsSpeech: "ee" },
  "/eɪ/": { speech: "ay", ttsSpeech: "ay" },
  "/aɪ/": { speech: "eye", ttsSpeech: "eye" },
  "/əʊ/": { speech: "oh", ttsSpeech: "oh" },
  "/juː/": { speech: "yoo", ttsSpeech: "yoo" },
  "/uː/": { speech: "ooh", ttsSpeech: "ooh" },
  "/ks/": { speech: "kuh-suh", ttsSpeech: "kuh-suh", acousticKind: "ks-burst" },
  "/kw/": { speech: "kwuh", ttsSpeech: "kwuh", clippedStop: true },
  sh: { speech: "shhh", ttsSpeech: "shuh", acousticKind: "sh-hush" },
  ch: { speech: "chuh", ttsSpeech: "chuh", clippedStop: true },
  th: { speech: "thuh", ttsSpeech: "thuh", acousticKind: "th-air" },
  ph: { speech: "fuh", ttsSpeech: "fuh", acousticKind: "f-air" },
  wh: { speech: "wuh", ttsSpeech: "wuh", clippedStop: true },
  ck: { speech: "kuh", ttsSpeech: "kuh", clippedStop: true },
  ng: { speech: "ing", ttsSpeech: "ing", acousticKind: "n-hum" },
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
 * Calibrated F1 / F2 / F3 formant resonator specifications for all 5 pure short vowels,
 * nasals (/m/, /n/), and liquids (/l/, /r/).
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
 * Plays a pure, realistic Web Audio API acoustic phoneme cue:
 * - Short vowels (`a-short`, `e-short`, `i-short`, `o-short`, `u-short`) via calibrated 3-formant synthesis
 * - Nasals & liquids (`m-hum`, `n-hum`, `l-liquid`, `r-liquid`) via formant resonators
 * - Voiceless & voiced fricatives (`f-air`, `s-hiss`, `sh-hush`, `th-air`, `h-breath`, `v-buzz`, `z-buzz`)
 * - Two-part `/ks/` velar burst + sibilant hiss (`ks-burst`)
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
      // Crisp velar stop burst /k/ followed immediately by alveolar sibilant /s/
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
  const key = letter.trim().toUpperCase();
  const spec = LETTER_PHONICS_AUDIO[key];
  const text = spec ? spec.nameSpeech : `The letter ${key}`;
  speakAsRole(text, "female-teacher", { rate: 0.84 });
  return text;
}

/**
 * Plays a letter's PURE PHONEME SOUND accurately (never reading the letter name,
 * never sending spelled-out repeated letters like "fff"/"sss" or wrong vowels to TTS!),
 * followed after a crisp pause by its anchor example word (e.g. pure /æ/ -> "apple").
 */
export function playLetterSound(letter: string, exampleWord?: string): string {
  songPlaybackToken += 1;
  clearPendingTimers();
  stopActiveSongNodes();
  stopSpeech();
  const key = letter.trim().toUpperCase();
  const spec = LETTER_PHONICS_AUDIO[key];
  if (!spec) {
    speakAsRole(letter, "female-teacher", { rate: 0.82 });
    return letter;
  }

  const word = exampleWord ?? spec.anchorWord;
  const acousticPlayed = spec.acousticKind ? playAcousticPhonemeCue(spec.acousticKind) : false;

  if (acousticPlayed) {
    if (word && typeof window !== "undefined") {
      const tid = window.setTimeout(() => {
        speakAsRole(word, "female-teacher", { rate: 0.84 });
      }, 360);
      sequenceTimerIds.push(tid);
    }
  } else {
    speakAsRole(spec.soundSpeech, "female-teacher", {
      rate: spec.clippedStop ? 0.92 : 0.82,
      onEnd: () => {
        if (word && typeof window !== "undefined") {
          const tid = window.setTimeout(() => {
            speakAsRole(word, "female-teacher", { rate: 0.84 });
          }, 210);
          sequenceTimerIds.push(tid);
        }
      },
    });
  }

  return word ? `${spec.soundSpeech} ... ${word}` : spec.soundSpeech;
}

/** Plays a pure short (via authentic formant synthesis) or long vowel sound followed by its anchor word. */
export function playVowelSound(
  vowel: "A" | "E" | "I" | "O" | "U",
  length: "short" | "long",
  exampleWord: string,
  exampleSentence?: string,
): string {
  songPlaybackToken += 1;
  clearPendingTimers();
  stopActiveSongNodes();
  stopSpeech();
  const spec = VOWEL_SOUND_SPEECH[vowel];
  const cueLabel = length === "short" ? spec.shortSpeech : spec.longSpeech;
  const tail = exampleSentence ? `${exampleWord}. ${exampleSentence}` : exampleWord;

  if (length === "short") {
    const acousticPlayed = playAcousticPhonemeCue(spec.shortAcousticKind);
    if (acousticPlayed) {
      if (typeof window !== "undefined") {
        const tid = window.setTimeout(() => {
          speakAsRole(tail, "female-teacher", { rate: 0.84 });
        }, 360);
        sequenceTimerIds.push(tid);
      }
      return `${cueLabel} ... ${exampleWord}`;
    }
    // Fallback when Web Audio is unavailable: always use TTS-safe cue (never "aah", "ih", "aw")
    speakAsRole(spec.shortTtsSpeech, "female-teacher", {
      rate: 0.82,
      onEnd: () => {
        if (typeof window !== "undefined") {
          const tid = window.setTimeout(() => {
            speakAsRole(tail, "female-teacher", { rate: 0.84 });
          }, 220);
          sequenceTimerIds.push(tid);
        }
      },
    });
    return `${cueLabel} ... ${exampleWord}`;
  }

  speakAsRole(spec.longSpeech, "female-teacher", {
    rate: 0.8,
    onEnd: () => {
      if (typeof window !== "undefined") {
        const tid = window.setTimeout(() => {
          speakAsRole(tail, "female-teacher", { rate: 0.84 });
        }, 220);
        sequenceTimerIds.push(tid);
      }
    },
  });

  return `${cueLabel} ... ${exampleWord}`;
}

/** Resolves any IPA symbol, digraph, or single letter to its authentic acoustic & TTS-safe cue. */
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
      ...(letterSpec.acousticKind ? { acousticKind: letterSpec.acousticKind } : {}),
      ...(letterSpec.clippedStop ? { clippedStop: letterSpec.clippedStop } : {}),
    };
  }
  const clean = trimmed.replaceAll("/", "");
  return { speech: clean, ttsSpeech: clean };
}

/** Plays a single phoneme/digraph sound (e.g., /θ/, /ʃ/, sh, ch, /æ/, /k/) accurately. */
export function playPhonemeSound(phonemeOrGrapheme: string, exampleWord?: string): string {
  songPlaybackToken += 1;
  clearPendingTimers();
  stopActiveSongNodes();
  stopSpeech();
  const resolved = resolvePhonemeSpeech(phonemeOrGrapheme);
  const acousticPlayed = resolved.acousticKind
    ? playAcousticPhonemeCue(resolved.acousticKind)
    : false;

  if (acousticPlayed) {
    if (exampleWord && typeof window !== "undefined") {
      const tid = window.setTimeout(() => {
        speakAsRole(exampleWord, "female-teacher", { rate: 0.84 });
      }, 360);
      sequenceTimerIds.push(tid);
    }
  } else {
    speakAsRole(resolved.ttsSpeech, "female-teacher", {
      rate: resolved.clippedStop ? 0.92 : 0.82,
      onEnd: () => {
        if (exampleWord && typeof window !== "undefined") {
          const tid = window.setTimeout(() => {
            speakAsRole(exampleWord, "female-teacher", { rate: 0.84 });
          }, 220);
          sequenceTimerIds.push(tid);
        }
      },
    });
  }

  return exampleWord ? `${resolved.speech} ... ${exampleWord}` : resolved.speech;
}

/**
 * Plays a full phoneme blending sequence (e.g., ["/k/", "/æ/", "/t/"] -> "cat")
 * sounding out each pure phoneme cleanly (using Web Audio formants/fricatives wherever available)
 * before speaking the blended word.
 */
export function playBlendedWord(phonemes: string[], fullWord: string): string[] {
  songPlaybackToken += 1;
  clearPendingTimers();
  stopActiveSongNodes();
  stopSpeech();
  const resolvedSteps = phonemes.map((p) => resolvePhonemeSpeech(p));

  const playStep = (idx: number) => {
    if (idx >= resolvedSteps.length) {
      if (typeof window !== "undefined") {
        const tid = window.setTimeout(() => {
          speakAsRole(fullWord, "female-teacher", { rate: 0.84 });
        }, 240);
        sequenceTimerIds.push(tid);
      }
      return;
    }
    const step = resolvedSteps[idx]!;
    if (step.acousticKind && playAcousticPhonemeCue(step.acousticKind)) {
      if (typeof window !== "undefined") {
        const tid = window.setTimeout(() => playStep(idx + 1), 390);
        sequenceTimerIds.push(tid);
      }
      return;
    }
    const ok = speakAsRole(step.ttsSpeech, "female-teacher", {
      rate: step.clippedStop ? 0.92 : 0.82,
      onEnd: () => {
        if (typeof window !== "undefined") {
          const tid = window.setTimeout(() => playStep(idx + 1), 170);
          sequenceTimerIds.push(tid);
        }
      },
    });
    if (!ok && typeof window !== "undefined") {
      const tid = window.setTimeout(() => playStep(idx + 1), 350);
      sequenceTimerIds.push(tid);
    }
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
export function playMarimbaNote(
  freqHz: number,
  durationSec = 0.34,
  startOffsetSec = 0,
): boolean {
  const ctx = getAudioContext();
  if (!ctx) return false;
  try {
    const startAt = ctx.currentTime + Math.max(0, startOffsetSec);
    const fundamental = ctx.createOscillator();
    const overtone = ctx.createOscillator();
    const fundGain = ctx.createGain();
    const overGain = ctx.createGain();

    // Warm sine fundamental + bright xylophone 4th-harmonic wooden strike transient
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

/** Stops any currently playing phonics song verse or multi-letter musical phonics song. */
export function stopPhonicsSong(): void {
  songPlaybackToken += 1;
  clearPendingTimers();
  stopActiveSongNodes();
  stopSpeech();
}

/**
 * Plays a single letter's cheerful 4-line Phonics Song Verse (A–Z) with synchronized
 * xylophone/marimba notes, the letter's pure acoustic phoneme cue, and beat callbacks.
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
      // Celebratory major triad cadence
      playMarimbaPhrase([PHONICS_NOTES.C5, PHONICS_NOTES.E5, PHONICS_NOTES.G5, PHONICS_NOTES.C6], 0.13);
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

    // On line 1 (pure sound intro), reinforce with the letter's authentic Web Audio phoneme cue
    if (idx === 1 && letterSpec?.acousticKind) {
      if (typeof window !== "undefined") {
        const cueId = window.setTimeout(() => {
          if (token === songPlaybackToken && letterSpec.acousticKind) {
            playAcousticPhonemeCue(letterSpec.acousticKind);
          }
        }, 120);
        sequenceTimerIds.push(cueId);
      }
    }

    const lineText = lines[idx]!;
    const scheduleNext = () => {
      if (token !== songPlaybackToken || typeof window === "undefined") return;
      const tid = window.setTimeout(() => runLine(idx + 1), 240);
      sequenceTimerIds.push(tid);
    };

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

  // Cheerful 2-note xylophone intro chime before beat 0
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
 * melodies, pure Web Audio phoneme cues, and line-highlight callbacks.
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

    const resolvedPhoneme = line.phoneme ? resolvePhonemeSpeech(line.phoneme) : null;
    if (resolvedPhoneme?.acousticKind) {
      playAcousticPhonemeCue(resolvedPhoneme.acousticKind);
    }

    const scheduleNext = () => {
      if (token !== songPlaybackToken || typeof window === "undefined") return;
      const tid = window.setTimeout(() => runLine(idx + 1), 280);
      sequenceTimerIds.push(tid);
    };

    const speakStartDelay = resolvedPhoneme?.acousticKind ? 320 : 120;
    if (typeof window !== "undefined") {
      const speakTid = window.setTimeout(() => {
        if (token !== songPlaybackToken) return;
        const spoke = speakAsRole(line.lyricEn, "female-teacher", {
          rate: 0.9,
          onEnd: scheduleNext,
          onError: scheduleNext,
        });
        if (!spoke) {
          const fallbackTid = window.setTimeout(() => runLine(idx + 1), 1900);
          sequenceTimerIds.push(fallbackTid);
        }
      }, speakStartDelay);
      sequenceTimerIds.push(speakTid);
    }
  };

  // Upbeat 3-note xylophone intro
  playMarimbaPhrase(song.melodyHz.slice(0, 3), 0.14);
  if (typeof window !== "undefined") {
    const startTid = window.setTimeout(() => runLine(0), 380);
    sequenceTimerIds.push(startTid);
  } else {
    onLine?.(0);
  }

  return lineTexts;
}
