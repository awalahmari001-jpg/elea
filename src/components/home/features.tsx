import { BookOpen, Headphones, Layers, LineChart, Mic, PenLine } from "lucide-react";

import { useI18n } from "@/components/i18n-provider";

export function Features() {
  const { t } = useI18n();
  const f = t.features;
  const items = [
    { icon: BookOpen, title: f.lessonsTitle, body: f.lessonsBody },
    { icon: Layers, title: f.flashcardsTitle, body: f.flashcardsBody },
    { icon: Mic, title: f.pronunciationTitle, body: f.pronunciationBody },
    { icon: PenLine, title: f.writingTitle, body: f.writingBody },
    { icon: Headphones, title: f.listeningTitle, body: f.listeningBody },
    { icon: LineChart, title: f.progressTitle, body: f.progressBody },
  ];

  return (
    <section className="bg-inverse py-20 text-inverse-foreground md:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent">{f.eyebrow}</p>
          <h2 className="display-heading mt-3 text-3xl md:text-5xl">{f.title}</h2>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-inverse-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, body }) => (
            <li key={title} className="group bg-inverse p-8 transition-colors hover:bg-inverse-foreground/5">
              <span className="grid size-12 place-items-center rounded-2xl bg-accent text-accent-foreground transition-transform group-hover:-rotate-6">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-2 leading-relaxed text-inverse-muted">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
