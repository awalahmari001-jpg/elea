import { messages } from "./messages";
import type { Locale } from "./config";

type MetaKey =
  | "home"
  | "kids"
  | "adults"
  | "ielts"
  | "placement"
  | "courses"
  | "ieltsVocab"
  | "cefrMastery"
  | "selfLearning"
  | "business"
  | "workshops";

/** Builds the page title + social-share tags in the visitor's language. */
export function pageMeta(locale: Locale | undefined, key: MetaKey) {
  const m = messages[locale ?? "en"].meta;
  const title = m[`${key}Title`];
  const description = m[`${key}Description`];
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
