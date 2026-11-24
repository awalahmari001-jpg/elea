/**
 * Calibrated Kids Phonics & Alphabet Audio Engine.
 *
 * Standard Web Speech TTS pronounces single letters ("a", "b", "c", "s") as their
 * LETTER NAMES (/eɪ/, /biː/, /siː/, /es/) rather than their PHONEME SOUNDS
 * (/æ/, /b/, /k/, /s/). This module keeps Letter Name audio and Letter Sound audio
 * strictly separated, uses phonics-calibrated realizations for all 26 letters,
 * short/long vowels, digraphs, and IPA phonemes, and layers gentle Web Audio API
 * acoustic cues for continuous fricatives/plosives where helpful.
 */
import { speakAsRole, stopSpeech } from "@/hooks/use-speech";

export interface LetterPhonicsAudioSpec {
  letter: string;
  /** Spoken text that guarantees TTS pronounces the Letter NAME clearly. */
  nameSpeech: string;
  /** Phonetic realization that makes English TTS produce the Letter SOUND (never the letter name). */
  soundSpeech: string;
  /** Child-friendly phonetic hint shown on screen (e.g. "buh", "sss"). */
  phoneticHint: string;
  /** Anchor example word demonstrating the pure initial sound. */
  anchorWord: string;
  /** Optional Web Audio acoustic mode for continuous fricatives/nasals. */
  acousticKind?: "s-hiss" | "sh-hush" | "f-air" | "z-buzz" | "v-buzz" | "h-breath";
}

export const LETTER_PHONICS_AUDIO: Record<string, LetterPhonicsAudioSpec> = {
  A: {
    letter: "A",
    nameSpeech: "The letter A",
    soundSpeech: "aah",
    phoneticHint: "aah (apple)",
    anchorWord: "apple",
  },
  B: {
    letter: "B",
    nameSpeech: "The letter B",
    soundSpeech: "buh",
    phoneticHint: "buh (ball)",
    anchorWord: "ball",
  },
  C: {
    letter: "C",
    nameSpeech: "The letter C",
    soundSpeech: "kuh",
    phoneticHint: "kuh (cat)",
    anchorWord: "cat",
  },
  D: {
    letter: "D",
    nameSpeech: "The letter D",
    soundSpeech: "duh",
    phoneticHint: "duh (dog)",
    anchorWord: "dog",
  },
  E: {
    letter: "E",
    nameSpeech: "The letter E",
    soundSpeech: "eh",
    phoneticHint: "eh (egg)",
    anchorWord: "egg",
  },
  F: {
    letter: "F",
    nameSpeech: "The letter F",
    soundSpeech: "fff",
    phoneticHint: "fff (fish)",
    anchorWord: "fish",
    acousticKind: "f-air",
  },
  G: {
    letter: "G",
    nameSpeech: "The letter G",
    soundSpeech: "guh",
    phoneticHint: "guh (goat)",
    anchorWord: "goat",
  },
  H: {
    letter: "H",
    nameSpeech: "The letter H",
    soundSpeech: "huh",
    phoneticHint: "huh (hat)",
    anchorWord: "hat",
    acousticKind: "h-breath",
  },
  I: {
    letter: "I",
    nameSpeech: "The letter I",
    soundSpeech: "ih",
    phoneticHint: "ih (igloo)",
    anchorWord: "igloo",
  },
  J: {
    letter: "J",
    nameSpeech: "The letter J",
    soundSpeech: "juh",
    phoneticHint: "juh (jam)",
    anchorWord: "jam",
  },
  K: {
    letter: "K",
    nameSpeech: "The letter K",
    soundSpeech: "kuh",
    phoneticHint: "kuh (kite)",
    anchorWord: "kite",
  },
  L: {
    letter: "L",
    nameSpeech: "The letter L",
    soundSpeech: "lll",
    phoneticHint: "lll (lion)",
    anchorWord: "lion",
  },
  M: {
    letter: "M",
    nameSpeech: "The letter M",
    soundSpeech: "mmm",
    phoneticHint: "mmm (moon)",
    anchorWord: "moon",
  },
  N: {
    letter: "N",
    nameSpeech: "The letter N",
    soundSpeech: "nnn",
    phoneticHint: "nnn (nest)",
    anchorWord: "nest",
  },
  O: {
    letter: "O",
    nameSpeech: "The letter O",
    soundSpeech: "aw",
    phoneticHint: "aw (octopus)",
    anchorWord: "octopus",
  },
  P: {
    letter: "P",
    nameSpeech: "The letter P",
    soundSpeech: "puh",
    phoneticHint: "puh (pen)",
    anchorWord: "pen",
  },
  Q: {
    letter: "Q",
    nameSpeech: "The letter Q",
    soundSpeech: "kwuh",
    phoneticHint: "kwuh (queen)",
    anchorWord: "queen",
  },
  R: {
    letter: "R",
    nameSpeech: "The letter R",
    soundSpeech: "rrr",
    phoneticHint: "rrr (rabbit)",
    anchorWord: "rabbit",
  },
  S: {
    letter: "S",
    nameSpeech: "The letter S",
    soundSpeech: "sss",
    phoneticHint: "sss (sun)",
    anchorWord: "sun",
    acousticKind: "s-hiss",
  },
  T: {
    letter: "T",
    nameSpeech: "The letter T",
    soundSpeech: "tuh",
    phoneticHint: "tuh (tiger)",
    anchorWord: "tiger",
  },
  U: {
    letter: "U",
    nameSpeech: "The letter U",
    soundSpeech: "uh",
    phoneticHint: "uh (umbrella)",
    anchorWord: "umbrella",
  },
  V: {
    letter: "V",
    nameSpeech: "The letter V",
    soundSpeech: "vvv",
    phoneticHint: "vvv (van)",
    anchorWord: "van",
    acousticKind: "v-buzz",
  },
  W: {
    letter: "W",
    nameSpeech: "The letter W",
    soundSpeech: "wuh",
    phoneticHint: "wuh (water)",
    anchorWord: "water",
  },
  X: {
    letter: "X",
    nameSpeech: "The letter X",
    soundSpeech: "kss",
    phoneticHint: "kss (box)",
    anchorWord: "box",
  },
  Y: {
    letter: "Y",
    nameSpeech: "The letter Y",
    soundSpeech: "yuh",
    phoneticHint: "yuh (yellow)",
    anchorWord: "yellow",
  },
  Z: {
    letter: "Z",
    nameSpeech: "The letter Z",
    soundSpeech: "zzz",
    phoneticHint: "zzz (zebra)",
    anchorWord: "zebra",
    acousticKind: "z-buzz",
  },
};

export const VOWEL_SOUND_SPEECH: Record<
  "A" | "E" | "I" | "O" | "U",
  { shortSpeech: string; longSpeech: string }
> = {
  A: { shortSpeech: "aah", longSpeech: "ay" },
  E: { shortSpeech: "eh", longSpeech: "ee" },
  I: { shortSpeech: "ih", longSpeech: "eye" },
  O: { shortSpeech: "aw", longSpeech: "oh" },
  U: { shortSpeech: "uh", longSpeech: "yoo" },
};

/** Maps IPA symbols, digraphs, and single phoneme letters to accurate spoken phonics cues. */
const PHONEME_SPEECH_MAP: Record<
  string,
  { speech: string; acousticKind?: LetterPhonicsAudioSpec["acousticKind"] }
> = {
  "/p/": { speech: "puh" },
  "/b/": { speech: "buh" },
  "/m/": { speech: "mmm" },
  "/w/": { speech: "wuh" },
  "/f/": { speech: "fff", acousticKind: "f-air" },
  "/v/": { speech: "vvv", acousticKind: "v-buzz" },
  "/θ/": { speech: "thhh", acousticKind: "f-air" },
  "/ð/": { speech: "theh" },
  "/t/": { speech: "tuh" },
  "/d/": { speech: "duh" },
  "/n/": { speech: "nnn" },
  "/s/": { speech: "sss", acousticKind: "s-hiss" },
  "/z/": { speech: "zzz", acousticKind: "z-buzz" },
  "/l/": { speech: "lll" },
  "/r/": { speech: "rrr" },
  "/ʃ/": { speech: "shhh", acousticKind: "sh-hush" },
  "/ʒ/": { speech: "zhuh" },
  "/tʃ/": { speech: "chuh" },
  "/dʒ/": { speech: "juh" },
  "/j/": { speech: "yuh" },
  "/k/": { speech: "kuh" },
  "/ɡ/": { speech: "guh" },
  "/g/": { speech: "guh" },
  "/ŋ/": { speech: "nng" },
  "/h/": { speech: "huh", acousticKind: "h-breath" },
  "/æ/": { speech: "aah" },
  "/e/": { speech: "eh" },
  "/ɪ/": { speech: "ih" },
  "/ɒ/": { speech: "aw" },
  "/ʌ/": { speech: "uh" },
  "/iː/": { speech: "ee" },
  "/eɪ/": { speech: "ay" },
  "/aɪ/": { speech: "eye" },
  "/əʊ/": { speech: "oh" },
  "/juː/": { speech: "yoo" },
  "/uː/": { speech: "ooo" },
  "/ks/": { speech: "kss" },
  "/kw/": { speech: "kwuh" },
  sh: { speech: "shhh", acousticKind: "sh-hush" },
  ch: { speech: "chuh" },
  th: { speech: "thhh", acousticKind: "f-air" },
  ph: { speech: "fff", acousticKind: "f-air" },
  wh: { speech: "wuh" },
  ck: { speech: "kuh" },
  ng: { speech: "nng" },
};

let activeAudioCtx: AudioContext | null = null;
let sequenceTimerIds: number[] = [];

function clearPendingTimers(): void {
  if (typeof window === "undefined") return;
  for (const id of sequenceTimerIds) {
    window.clearTimeout(id);
  }
  sequenceTimerIds = [];
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
 * Plays a gentle, realistic Web Audio API filtered-noise / voiced-buzz acoustic cue
 * for continuous fricatives (s, sh, f, h, z, v) to reinforce pure phonics listening.
 */
export function playAcousticPhonemeCue(
  kind: NonNullable<LetterPhonicsAudioSpec["acousticKind"]>,
): boolean {
  const ctx = getAudioContext();
  if (!ctx) return false;
  try {
    const duration = 0.28;
    const sampleRate = ctx.sampleRate;
    const bufferSize = Math.floor(sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Smooth envelope to avoid clicks
      const env = Math.sin((Math.PI * i) / bufferSize);
      data[i] = (Math.random() * 2 - 1) * env * 0.22;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    const freqMap: Record<typeof kind, { freq: number; q: number; buzzFreq?: number }> = {
      "s-hiss": { freq: 6200, q: 2.2 },
      "sh-hush": { freq: 2900, q: 1.8 },
      "f-air": { freq: 4400, q: 1.1 },
      "h-breath": { freq: 1500, q: 0.9 },
      "z-buzz": { freq: 5600, q: 2.0, buzzFreq: 165 },
      "v-buzz": { freq: 3600, q: 1.2, buzzFreq: 155 },
    };
    const spec = freqMap[kind];
    filter.frequency.value = spec.freq;
    filter.Q.value = spec.q;

    const gain = ctx.createGain();
    gain.gain.value = 0.45;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();

    if (spec.buzzFreq) {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.value = spec.buzzFreq;
      oscGain.gain.setValueAtTime(0.001, ctx.currentTime);
      oscGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
      oscGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    }
    return true;
  } catch {
    return false;
  }
}

/** Speaks a letter's NAME unambiguously (e.g., "The letter B" -> /biː/). */
export function playLetterName(letter: string): string {
  clearPendingTimers();
  const key = letter.trim().toUpperCase();
  const spec = LETTER_PHONICS_AUDIO[key];
  const text = spec ? spec.nameSpeech : `The letter ${key}`;
  speakAsRole(text, "female-teacher", { rate: 0.84 });
  return text;
}

/**
 * Speaks a letter's PHONEME SOUND accurately (never reading the letter name!),
 * optionally followed after a crisp pause by its anchor example word (e.g. "buh" -> "ball").
 */
export function playLetterSound(letter: string, exampleWord?: string): string {
  clearPendingTimers();
  stopSpeech();
  const key = letter.trim().toUpperCase();
  const spec = LETTER_PHONICS_AUDIO[key];
  if (!spec) {
    speakAsRole(letter, "female-teacher", { rate: 0.82 });
    return letter;
  }

  if (spec.acousticKind) {
    playAcousticPhonemeCue(spec.acousticKind);
  }

  const word = exampleWord ?? spec.anchorWord;
  const spoken = speakAsRole(spec.soundSpeech, "female-teacher", {
    rate: 0.78,
    onEnd: () => {
      if (word && typeof window !== "undefined") {
        const tid = window.setTimeout(() => {
          speakAsRole(word, "female-teacher", { rate: 0.84 });
        }, 210);
        sequenceTimerIds.push(tid);
      }
    },
  });

  if (!spoken && word) {
    return `${spec.soundSpeech} ... ${word}`;
  }
  return word ? `${spec.soundSpeech} ... ${word}` : spec.soundSpeech;
}

/** Plays a pure short or long vowel sound followed by its anchor word. */
export function playVowelSound(
  vowel: "A" | "E" | "I" | "O" | "U",
  length: "short" | "long",
  exampleWord: string,
  exampleSentence?: string,
): string {
  clearPendingTimers();
  stopSpeech();
  const spec = VOWEL_SOUND_SPEECH[vowel];
  const cue = length === "short" ? spec.shortSpeech : spec.longSpeech;
  const tail = exampleSentence ? `${exampleWord}. ${exampleSentence}` : exampleWord;

  speakAsRole(cue, "female-teacher", {
    rate: 0.78,
    onEnd: () => {
      if (typeof window !== "undefined") {
        const tid = window.setTimeout(() => {
          speakAsRole(tail, "female-teacher", { rate: 0.84 });
        }, 220);
        sequenceTimerIds.push(tid);
      }
    },
  });

  return `${cue} ... ${exampleWord}`;
}

/** Resolves any IPA symbol, digraph, or single letter to its true phonics speech realization. */
export function resolvePhonemeSpeech(phonemeOrGrapheme: string): {
  speech: string;
  acousticKind?: LetterPhonicsAudioSpec["acousticKind"];
} {
  const trimmed = phonemeOrGrapheme.trim();
  const direct = PHONEME_SPEECH_MAP[trimmed] ?? PHONEME_SPEECH_MAP[trimmed.toLowerCase()];
  if (direct) return direct;

  const upper = trimmed.replaceAll("/", "").toUpperCase();
  const letterSpec = LETTER_PHONICS_AUDIO[upper];
  if (letterSpec) {
    return {
      speech: letterSpec.soundSpeech,
      ...(letterSpec.acousticKind ? { acousticKind: letterSpec.acousticKind } : {}),
    };
  }
  return { speech: trimmed.replaceAll("/", "") };
}

/** Plays a single phoneme/digraph sound (e.g., /θ/, /ʃ/, sh, ch, /k/) accurately. */
export function playPhonemeSound(phonemeOrGrapheme: string, exampleWord?: string): string {
  clearPendingTimers();
  stopSpeech();
  const resolved = resolvePhonemeSpeech(phonemeOrGrapheme);
  if (resolved.acousticKind) {
    playAcousticPhonemeCue(resolved.acousticKind);
  }

  speakAsRole(resolved.speech, "female-teacher", {
    rate: 0.78,
    onEnd: () => {
      if (exampleWord && typeof window !== "undefined") {
        const tid = window.setTimeout(() => {
          speakAsRole(exampleWord, "female-teacher", { rate: 0.84 });
        }, 220);
        sequenceTimerIds.push(tid);
      }
    },
  });

  return exampleWord ? `${resolved.speech} ... ${exampleWord}` : resolved.speech;
}

/**
 * Plays a full phoneme blending sequence (e.g., ["k", "æ", "t"] -> "cat")
 * sounding out each phoneme cleanly before saying the blended word!
 */
export function playBlendedWord(phonemes: string[], fullWord: string): string[] {
  clearPendingTimers();
  stopSpeech();
  const cues = phonemes.map((p) => resolvePhonemeSpeech(p).speech);

  const playStep = (idx: number) => {
    if (idx >= cues.length) {
      if (typeof window !== "undefined") {
        const tid = window.setTimeout(() => {
          speakAsRole(fullWord, "female-teacher", { rate: 0.84 });
        }, 240);
        sequenceTimerIds.push(tid);
      }
      return;
    }
    const cue = cues[idx]!;
    const ok = speakAsRole(cue, "female-teacher", {
      rate: 0.78,
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
  return [...cues, fullWord];
}
