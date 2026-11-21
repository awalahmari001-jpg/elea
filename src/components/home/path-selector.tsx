import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { LEARNING_PATHS } from "@/content/paths";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";

/** The three path cards on the home page. Data comes from src/content/paths.ts. */
export function PathSelector() {
  const { t, locale } = useI18n();

  return (
    <section id="paths" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-accent-foreground/70 dark:text-accent">{t.paths.eyebrow}</p>
          <h2 className="display-heading mt-3 text-3xl text-foreground md:text-5xl">{t.paths.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.paths.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {LEARNING_PATHS.map((path, i) => (
            <Link
              key={path.id}
              to={path.to}
              style={{ animationDelay: `${i * 100}ms` }}
              className={cn(
                "group flex animate-rise flex-col overflow-hidden rounded-3xl border-2 border-foreground/90 bg-card text-card-foreground transition-all duration-300 hover:-translate-y-1.5 hover:shadow-ink focus-visible:shadow-ink",
                path.theme === "kids" && "theme-kids bg-accent-soft",
              )}
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-foreground/90">
                <img
                  src={path.image}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute start-4 top-4 rounded-full bg-card px-3 py-1 text-xs font-bold text-foreground shadow-card">
                  {path.audience[locale]}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6">
                <div>
                  <h3
                    className={cn(
                      "font-extrabold text-foreground",
                      path.theme === "kids" ? "text-3xl" : "text-2xl",
                    )}
                  >
                    {path.name[locale]}
                  </h3>
                  <p className="mt-1 font-semibold text-primary">{path.tagline[locale]}</p>
                </div>
                <p className="text-muted-foreground">{path.description[locale]}</p>

                <ul className="flex flex-wrap gap-2">
                  {path.levels.map((level) => (
                    <li
                      key={level.key}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground"
                    >
                      {t.levels[level.key]} <span dir="ltr" className="opacity-70">· {level.range}</span>
                    </li>
                  ))}
                </ul>

                <span
                  className={cn(
                    "mt-auto inline-flex items-center gap-2 self-start rounded-full px-5 py-2.5 font-bold transition-colors",
                    path.theme === "kids"
                      ? "bg-primary text-primary-foreground text-lg"
                      : "bg-accent text-accent-foreground",
                  )}
                >
                  {t.paths.explore}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
