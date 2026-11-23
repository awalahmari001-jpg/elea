import { useEffect, useRef, useState } from "react";

interface SpeechResult {
  isFinal: boolean;
  0: { transcript: string };
}
interface RecognitionEvent {
  resultIndex: number;
  results: { length: number; [index: number]: SpeechResult };
}
interface Recognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}
type SpeechWindow = Window & {
  SpeechRecognition?: new () => Recognition;
  webkitSpeechRecognition?: new () => Recognition;
};

export type SpeechError = "unsupported" | "permission" | "network" | "empty" | "failed";

/** Browser ASR is deliberately client-only; no audio or transcript is persisted. */
export function useSpeech(onTranscript: (text: string) => void) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<SpeechError | null>(null);
  const recognition = useRef<Recognition | null>(null);
  const callback = useRef(onTranscript);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    callback.current = onTranscript;
  }, [onTranscript]);
  useEffect(() => {
    const browser = window as SpeechWindow;
    setSupported(Boolean(browser.SpeechRecognition ?? browser.webkitSpeechRecognition));
    return () => {
      const current = recognition.current;
      if (current) {
        current.onresult = null;
        current.onerror = null;
        current.onend = null;
        current.abort();
      }
      if (timeout.current) clearTimeout(timeout.current);
      window.speechSynthesis?.cancel();
    };
  }, []);

  function start() {
    if (recognition.current) return;
    const browser = window as SpeechWindow;
    const Constructor = browser.SpeechRecognition ?? browser.webkitSpeechRecognition;
    if (!Constructor) {
      setError("unsupported");
      return;
    }
    window.speechSynthesis?.cancel();
    setError(null);
    const current = new Constructor();
    recognition.current = current;
    current.lang = "en-GB";
    current.continuous = false;
    current.interimResults = false;
    current.onresult = (event) => {
      const parts: string[] = [];
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result?.isFinal) parts.push(result[0].transcript);
      }
      const text = parts.join(" ").trim();
      if (text) callback.current(text);
      else setError("empty");
    };
    current.onerror = (event) => {
      setError(
        event.error === "not-allowed" || event.error === "service-not-allowed"
          ? "permission"
          : event.error === "network"
            ? "network"
            : event.error === "no-speech"
              ? "empty"
              : "failed",
      );
    };
    current.onend = () => {
      recognition.current = null;
      setListening(false);
      if (timeout.current) clearTimeout(timeout.current);
    };
    try {
      current.start();
      setListening(true);
      timeout.current = setTimeout(() => current.stop(), 60000);
    } catch {
      recognition.current = null;
      setListening(false);
      setError("failed");
    }
  }

  return { supported, listening, error, start, stop: () => recognition.current?.stop() };
}

export type VoiceGender = "female" | "male";
export type VoiceRole = "female-teacher" | "male-teacher" | "female-student" | "male-student";

const FEMALE_VOICE_HINTS = [
  "google uk english female",
  "sonia",
  "libby",
  "maisie",
  "serena",
  "kate",
  "martha",
  "samantha",
  "victoria",
  "ava",
  "allison",
  "aria",
  "jenny",
  "zira",
  "hazel",
  "susan",
  "karen",
  "moira",
  "tessa",
  "fiona",
  "female",
];

const MALE_VOICE_HINTS = [
  "google uk english male",
  "ryan",
  "daniel",
  "arthur",
  "george",
  "oliver",
  "malcolm",
  "thomas",
  "alex",
  "guy",
  "andrew",
  "christopher",
  "david",
  "mark",
  "james",
  "liam",
  "male",
];

/**
 * Converts whiteboard notation into smooth, natural spoken English so browser TTS
 * never reads slashes, arrows, pipes, or clipped ellipses awkwardly.
 */
export function toNaturalSpokenEnglish(raw: string): string {
  return raw
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, " ")
    .replace(/\uFE0F/g, "")
    .replace(/\bHe\s*\/\s*She\s*\/\s*It\b/gi, "He, she, or it")
    .replace(/\bYou\s*\/\s*We\s*\/\s*They\b/gi, "You, we, or they")
    .replace(/\bI\s*\/\s*You\s*\/\s*We\s*\/\s*They\b/gi, "I, you, we, or they")
    .replace(/\bI\s*\/\s*He\s*\/\s*She\s*\/\s*It\b/gi, "I, he, she, or it")
    .replace(/\bam\s*\/\s*is\s*\/\s*are\b/gi, "am, is, or are")
    .replace(/\bwas\s*\/\s*were\b/gi, "was or were")
    .replace(/\bdo\s*\/\s*does\b/gi, "do or does")
    .replace(/\bdon't\s*\/\s*doesn't\b/gi, "don't or doesn't")
    .replace(/\bhave\s*\/\s*has\b/gi, "have or has")
    .replace(/\ba\s*\/\s*an\b/gi, "a or an")
    .replace(/\bV-ing\b/g, "verb plus i n g")
    .replace(/\bV-ed\b/g, "verb plus e d")
    .replace(/\bV3\b/g, "the past participle")
    .replace(/\bV2\b/g, "the past form")
    .replace(/\bV1\b/g, "the base verb")
    .replace(/\s*→\s*/g, ", ")
    .replace(/\s*≠\s*/g, " is not ")
    .replace(/\s*\|\s*/g, ". ")
    .replace(/\s*\+\s*/g, " plus ")
    .replace(/\s*—\s*/g, ", ")
    .replace(/…/g, "")
    .replace(/([A-Za-z])\s*\/\s*([A-Za-z])/g, "$1 or $2")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function scoreEnglishVoice(voice: SpeechSynthesisVoice, gender: VoiceGender): number {
  const name = voice.name.toLowerCase();
  const lang = voice.lang.toLowerCase();
  if (!lang.startsWith("en")) return -100;

  let score = 0;
  if (lang.startsWith("en-gb")) score += 20;
  else if (lang.startsWith("en-us")) score += 16;
  else score += 10;

  // Prefer natural / neural / enhanced voices over robotic legacy voices
  if (name.includes("natural") || name.includes("neural") || name.includes("enhanced")) score += 25;
  if (name.includes("google") || name.includes("microsoft")) score += 12;

  const targetHints = gender === "female" ? FEMALE_VOICE_HINTS : MALE_VOICE_HINTS;
  const oppositeHints = gender === "female" ? MALE_VOICE_HINTS : FEMALE_VOICE_HINTS;

  if (targetHints.some((h) => name.includes(h))) score += 50;
  if (oppositeHints.some((h) => name.includes(h))) score -= 45;

  return score;
}

/** Picks a distinct, high-clarity English voice matching the requested gender when available. */
export function pickVoiceForGender(
  gender: VoiceGender,
  excludeVoiceName?: string,
): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis
    .getVoices()
    .filter((v) => v.lang.toLowerCase().startsWith("en"));
  if (voices.length === 0) return null;

  const ranked = [...voices].sort((a, b) => {
    const diff = scoreEnglishVoice(b, gender) - scoreEnglishVoice(a, gender);
    if (diff !== 0) return diff;
    return a.name.localeCompare(b.name);
  });

  if (excludeVoiceName && ranked.length > 1) {
    const distinct = ranked.find((v) => v.name !== excludeVoiceName);
    if (distinct) return distinct;
  }
  return ranked[0] ?? null;
}

export function roleToGender(role: VoiceRole): VoiceGender {
  return role === "female-teacher" || role === "female-student" ? "female" : "male";
}

/** Speaks a full sentence cleanly using a gender-matched English voice with completion callback. */
export function speakAsRole(
  text: string,
  role: VoiceRole,
  options?: { rate?: number; onEnd?: () => void; onError?: () => void },
): boolean {
  if (
    typeof window === "undefined" ||
    !window.speechSynthesis ||
    typeof SpeechSynthesisUtterance === "undefined"
  ) {
    return false;
  }
  const cleanText = toNaturalSpokenEnglish(text);
  if (!cleanText) {
    options?.onEnd?.();
    return false;
  }

  window.speechSynthesis.cancel();
  const gender = roleToGender(role);
  const oppositeGender: VoiceGender = gender === "female" ? "male" : "female";
  const oppositeVoice = pickVoiceForGender(oppositeGender);
  const voice = pickVoiceForGender(gender, oppositeVoice?.name);

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = voice?.lang || "en-GB";
  if (voice) utterance.voice = voice;

  const baseRate = options?.rate ?? 0.94;
  utterance.rate = Math.min(1.25, Math.max(0.75, baseRate));

  // If browser has only a single English voice, apply gentle natural intonation difference;
  // when distinct Male & Female voices exist, keep pitch completely natural (1.0).
  const distinctFound = Boolean(voice && (!oppositeVoice || voice.name !== oppositeVoice.name));
  if (distinctFound) {
    utterance.pitch = role.includes("student") ? 1.03 : 1.0;
  } else {
    utterance.pitch = gender === "female" ? 1.08 : 0.9;
  }

  if (options?.onEnd) utterance.onend = () => options.onEnd?.();
  if (options?.onError) utterance.onerror = () => options.onError?.();

  window.speechSynthesis.speak(utterance);
  return true;
}

/**
 * Plays a multi-turn Male & Female conversation turn by turn (waiting for each full sentence
 * to finish before advancing, with a natural 320ms pause — never cutting sentences mid-chunk).
 */
export function playDialogueSequence(
  turns: { text: string; role: VoiceRole }[],
  options?: {
    rate?: number;
    onTurnStart?: (index: number) => void;
    onComplete?: () => void;
  },
): () => void {
  let cancelled = false;
  let timerId: number | null = null;

  function stop() {
    cancelled = true;
    if (timerId !== null && typeof window !== "undefined") {
      window.clearTimeout(timerId);
      timerId = null;
    }
    if (typeof window !== "undefined") {
      window.speechSynthesis?.cancel();
    }
  }

  function runTurn(idx: number) {
    if (cancelled) return;
    const current = turns[idx];
    if (!current) {
      options?.onComplete?.();
      return;
    }
    options?.onTurnStart?.(idx);

    const scheduleNext = () => {
      if (cancelled) return;
      timerId = window.setTimeout(() => runTurn(idx + 1), 320);
    };

    const spoke = speakAsRole(current.text, current.role, {
      ...(options?.rate !== undefined ? { rate: options.rate } : {}),
      onEnd: scheduleNext,
      onError: scheduleNext,
    });

    if (!spoke) {
      // Fallback when browser speechSynthesis is unavailable
      const fallbackMs = Math.max(1800, current.text.length * 48);
      timerId = window.setTimeout(() => runTurn(idx + 1), fallbackMs);
    }
  }

  runTurn(0);
  return stop;
}

export function playSpeech(text: string, rate = 0.92, gender: VoiceGender = "female"): boolean {
  return speakAsRole(text, gender === "female" ? "female-teacher" : "male-teacher", { rate });
}

export function stopSpeech(): void {
  if (typeof window !== "undefined") {
    window.speechSynthesis?.cancel();
  }
}
