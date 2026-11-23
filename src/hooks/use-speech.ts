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

export function playSpeech(text: string, rate = 0.9): boolean {
  if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === "undefined") return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-GB";
  utterance.rate = rate;
  const voice =
    window.speechSynthesis.getVoices().find((v) => v.lang.startsWith("en-GB")) ??
    window.speechSynthesis.getVoices().find((v) => v.lang.startsWith("en"));
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeech(): void {
  if (typeof window !== "undefined") {
    window.speechSynthesis?.cancel();
  }
}
