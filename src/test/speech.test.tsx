import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useSpeech } from "@/hooks/use-speech";

class RecognitionMock {
  static current: RecognitionMock | undefined;
  lang = "";
  continuous = false;
  interimResults = false;
  onresult:
    | ((event: {
        resultIndex: number;
        results: { length: number; 0: { isFinal: boolean; 0: { transcript: string } } };
      }) => void)
    | null = null;
  onerror: ((event: { error: string }) => void) | null = null;
  onend: (() => void) | null = null;
  start = vi.fn();
  stop = vi.fn(() => this.onend?.());
  abort = vi.fn();
  constructor() {
    RecognitionMock.current = this;
  }
}
afterEach(() => {
  Reflect.deleteProperty(window, "SpeechRecognition");
  RecognitionMock.current = undefined;
  vi.restoreAllMocks();
});
describe("browser ASR lifecycle", () => {
  it("recognises English and passes the final transcript to the exercise", () => {
    Object.defineProperty(window, "SpeechRecognition", {
      value: RecognitionMock,
      configurable: true,
    });
    const receive = vi.fn();
    const { result, unmount } = renderHook(() => useSpeech(receive));
    expect(result.current.supported).toBe(true);
    act(() => result.current.start());
    expect(RecognitionMock.current?.lang).toBe("en-GB");
    expect(result.current.listening).toBe(true);
    act(() =>
      RecognitionMock.current?.onresult?.({
        resultIndex: 0,
        results: { length: 1, 0: { isFinal: true, 0: { transcript: "I would like a coffee" } } },
      }),
    );
    expect(receive).toHaveBeenCalledWith("I would like a coffee");
    unmount();
    expect(RecognitionMock.current?.abort).toHaveBeenCalled();
  });
  it("handles denied microphone access without crashing", () => {
    Object.defineProperty(window, "SpeechRecognition", {
      value: RecognitionMock,
      configurable: true,
    });
    const { result } = renderHook(() => useSpeech(vi.fn()));
    act(() => result.current.start());
    act(() => {
      RecognitionMock.current?.onerror?.({ error: "not-allowed" });
      RecognitionMock.current?.onend?.();
    });
    expect(result.current.error).toBe("permission");
    expect(result.current.listening).toBe(false);
  });
  it("offers unsupported state when the browser lacks ASR", () => {
    const { result } = renderHook(() => useSpeech(vi.fn()));
    expect(result.current.supported).toBe(false);
    act(() => result.current.start());
    expect(result.current.error).toBe("unsupported");
  });
});
