import { diffArrays } from "diff";

export function words(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/[^a-z0-9'\s]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/** Word alignment only. This is not a phoneme, fluency or accent score. */
export function compareRecognition(target: string, transcript: string) {
  const expected = words(target);
  const heard = words(transcript);
  const changes = diffArrays(expected, heard);
  const matched = changes.filter((p) => !p.added && !p.removed).flatMap((p) => p.value);
  const missing = changes.filter((p) => p.removed).flatMap((p) => p.value);
  const extra = changes.filter((p) => p.added).flatMap((p) => p.value);
  return { matched, missing, extra, total: expected.length };
}

export function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
