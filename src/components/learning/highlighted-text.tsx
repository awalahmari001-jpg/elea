import { Fragment, useMemo } from "react";

/**
 * Core English pronouns, linking/auxiliary verbs, modals, and high-signal grammar connectors
 * that ESL learners must immediately notice in every rule and sentence.
 */
const CORE_ESL_KEYWORDS = [
  "have got",
  "has got",
  "am not",
  "isn't",
  "aren't",
  "wasn't",
  "weren't",
  "don't",
  "doesn't",
  "didn't",
  "haven't",
  "hasn't",
  "hadn't",
  "can't",
  "cannot",
  "won't",
  "wouldn't",
  "shouldn't",
  "mustn't",
  "There is",
  "There are",
  "There isn't",
  "There aren't",
  "Is there",
  "Are there",
  "would have",
  "I'm",
  "He's",
  "She's",
  "It's",
  "You're",
  "We're",
  "They're",
  "I",
  "He",
  "She",
  "It",
  "You",
  "We",
  "They",
  "am",
  "is",
  "are",
  "was",
  "were",
  "do",
  "does",
  "did",
  "have",
  "has",
  "had",
  "can",
  "will",
  "would",
  "should",
  "must",
  "might",
  "could",
  "unless",
  "despite",
  "although",
  "however",
  "therefore",
  "while",
  "since",
  "already",
  "never",
  "always",
  "usually",
];

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildHighlightRegex(extraKeywords?: string[]): RegExp {
  const combined = new Set<string>(CORE_ESL_KEYWORDS);
  if (extraKeywords) {
    for (const kw of extraKeywords) {
      const clean = kw.trim();
      if (clean.length >= 1 && clean.length <= 36) {
        combined.add(clean);
      }
    }
  }
  // Sort longest-first so multi-word phrases ("have got", "There is", "am not") match before single words
  const sorted = Array.from(combined).sort((a, b) => b.length - a.length);
  const termsPattern = sorted
    .map((term) => {
      const escaped = escapeRegex(term);
      // Keep single-letter "I" / "a" case-aware or bounded cleanly so it never breaks inside words
      return `(?<![A-Za-z0-9'-])${escaped}(?![A-Za-z0-9'-])`;
    })
    .join("|");

  // Also capture explicitly quoted grammar targets like "is", "am", "are", 'doesn't', "-s", "-es"
  const quotedPattern = `["'](?:[A-Za-z][A-Za-z'\\s/-]{0,18}|-[a-z]{1,4})["']`;
  return new RegExp(`(${quotedPattern}|${termsPattern})`, "gi");
}

export interface HighlightedTextProps {
  text: string;
  /** Optional lesson-tailored keywords (e.g., articles, target verbs, vocab) highlighted in bold red. */
  keywords?: string[];
  /** Choose "dark" for dark video stages and "light" for standard light/dark theme cards. */
  surface?: "light" | "dark";
}

/**
 * Renders English instructional text with important words, pronouns, auxiliaries,
 * and lesson-goal key terms styled in **bold red** for instant visual scanning.
 */
export function HighlightedText({ text, keywords, surface = "light" }: HighlightedTextProps) {
  const regex = useMemo(() => buildHighlightRegex(keywords), [keywords]);
  const highlightClass =
    surface === "dark"
      ? "font-extrabold text-red-400"
      : "font-extrabold text-red-600 dark:text-red-400";

  if (!text) return null;

  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, idx) => {
        if (!part) return null;
        // Odd indices are regex capture group matches from split(capturingRegex)
        const isMatch = idx % 2 === 1;
        if (!isMatch) return <Fragment key={idx}>{part}</Fragment>;

        // Avoid turning lowercase "i" inside non-English text or stray punctuation red;
        // allow uppercase "I" always, and single-letter "a" only when explicitly requested in keywords.
        if (part.length === 1 && part.toLowerCase() === "i" && part !== "I") {
          return <Fragment key={idx}>{part}</Fragment>;
        }
        return (
          <strong key={idx} className={highlightClass}>
            {part}
          </strong>
        );
      })}
    </>
  );
}
