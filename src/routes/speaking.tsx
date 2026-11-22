import { createFileRoute } from "@tanstack/react-router";
import { SpeakingStudio } from "@/components/learning/speaking-studio";
import { messages } from "@/lib/i18n/messages";
import { normalizeLocale } from "@/lib/i18n/config";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/speaking")({
  head: ({ match }) => {
    const locale = normalizeLocale(match.context.locale);
    const title = `${messages[locale].learning.situationsTitle} — ${SITE.name}`;
    const description = messages[locale].learning.speakingDescription;
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
  },
  component: SpeakingStudio,
});
