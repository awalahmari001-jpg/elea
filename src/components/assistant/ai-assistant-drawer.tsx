import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Bot,
  FileBarChart2,
  Loader2,
  Send,
  Sparkles,
  Wand2,
} from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { askLearningAssistant } from "@/lib/assistant-ai.functions";
import {
  buildLearnerContextSnapshot,
  generateAssistantReplyLocal,
  generateLearnerProgressReport,
  type AssistantMode,
  type AssistantReplyPayload,
  type LearnerProgressReport,
} from "@/lib/assistant-fallback";

interface ChatTurn {
  id: string;
  role: "learner" | "coach";
  text: string;
  examples?: string[];
  recommendedActions?: AssistantReplyPayload["recommendedActions"];
  source?: "ai" | "local";
}

export interface AiAssistantDrawerProps {
  /** Optional custom trigger label/compact mode for header or floating button. */
  variant?: "header" | "floating";
}

export function AiAssistantDrawer({ variant = "floating" }: AiAssistantDrawerProps) {
  const { t, locale, dir } = useI18n();
  const at = t.assistant;

  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [report, setReport] = useState<LearnerProgressReport | null>(null);

  const handleAsk = async (mode: AssistantMode, promptText?: string) => {
    const cleanPrompt = (promptText ?? question).trim();
    if (!cleanPrompt) return;

    const context = buildLearnerContextSnapshot();
    const userTurn: ChatTurn = {
      id: `u-${Date.now()}`,
      role: "learner",
      text: cleanPrompt,
    };
    setTurns((prev) => [...prev, userTurn]);
    if (!promptText) setQuestion("");
    setLoading(true);

    if (mode === "report") {
      setReport(generateLearnerProgressReport());
    }

    let reply: AssistantReplyPayload;
    try {
      reply = await askLearningAssistant({
        data: {
          mode,
          question: cleanPrompt,
          locale,
          context,
        },
      });
    } catch {
      reply = generateAssistantReplyLocal({
        mode,
        question: cleanPrompt,
        locale,
        context,
      });
    }

    setTurns((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        role: "coach",
        text: reply.answer[locale],
        examples: reply.examples,
        recommendedActions: reply.recommendedActions,
        source: reply.source,
      },
    ]);
    setLoading(false);
  };

  const handleGenerateReportOnly = () => {
    const nextReport = generateLearnerProgressReport();
    setReport(nextReport);
  };

  const quickPrompts: Array<{
    mode: AssistantMode;
    label: string;
    prompt: string;
    Icon: typeof Sparkles;
  }> = [
    {
      mode: "grammar",
      label: at.quickGrammar,
      prompt: at.quickGrammarPrompt,
      Icon: Wand2,
    },
    {
      mode: "vocabulary",
      label: at.quickVocab,
      prompt: at.quickVocabPrompt,
      Icon: BookOpen,
    },
    {
      mode: "mistakes",
      label: at.quickMistakes,
      prompt: at.quickMistakesPrompt,
      Icon: AlertTriangle,
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {variant === "header" ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5 rounded-full border-primary/40 text-xs font-bold text-primary hover:bg-primary/10"
            aria-label={at.triggerLabel}
          >
            <Bot className="size-4" aria-hidden />
            <span className="hidden lg:inline">{at.triggerShort}</span>
          </Button>
        ) : (
          <Button
            type="button"
            variant="hero"
            size="lg"
            className="fixed bottom-5 end-5 z-40 gap-2 rounded-full shadow-ink"
            aria-label={at.triggerLabel}
          >
            <Bot className="size-5" aria-hidden />
            <span className="hidden sm:inline">{at.triggerShort}</span>
          </Button>
        )}
      </SheetTrigger>

      <SheetContent
        side={dir === "rtl" ? "left" : "right"}
        className="flex w-full flex-col gap-4 overflow-y-auto sm:max-w-lg"
        dir={dir}
      >
        <SheetHeader className="text-start">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="gap-1">
              <Sparkles className="size-3" aria-hidden />
              {at.badge}
            </Badge>
          </div>
          <SheetTitle className="display-heading text-xl font-extrabold">{at.title}</SheetTitle>
          <SheetDescription>{at.subtitle}</SheetDescription>
        </SheetHeader>

        {/* Quick Contextual Coaching Actions */}
        <div className="grid grid-cols-2 gap-2">
          {quickPrompts.map(({ mode, label, prompt, Icon }) => (
            <Button
              key={mode}
              type="button"
              variant="outline"
              size="sm"
              disabled={loading}
              className="h-auto justify-start gap-2 rounded-xl px-3 py-2 text-start text-xs font-semibold whitespace-normal"
              onClick={() => void handleAsk(mode, prompt)}
            >
              <Icon className="size-3.5 shrink-0 text-primary" aria-hidden />
              <span>{label}</span>
            </Button>
          ))}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={loading}
            className="h-auto justify-start gap-2 rounded-xl px-3 py-2 text-start text-xs font-bold whitespace-normal"
            onClick={handleGenerateReportOnly}
          >
            <FileBarChart2 className="size-3.5 shrink-0 text-primary" aria-hidden />
            <span>{at.quickReport}</span>
          </Button>
        </div>

        {/* Structured Periodic Learner Progress Report */}
        {report && (
          <div
            className="space-y-3 rounded-2xl border-2 border-primary/30 bg-primary/5 p-4 text-xs"
            aria-label={at.reportHeading}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-extrabold text-foreground">{at.reportHeading}</h3>
              <Badge variant="outline" className="text-[10px]">
                {report.periodLabel[locale]}
              </Badge>
            </div>
            <p className="font-bold text-primary">{report.headline[locale]}</p>

            <div className="space-y-1">
              <div className="font-bold text-foreground">{at.reportAchieved}</div>
              <ul className="list-disc space-y-0.5 ps-4 text-muted-foreground">
                {report.achieved.map((item) => (
                  <li key={item.en}>{item[locale]}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-emerald-700 dark:text-emerald-300">
                {at.reportImproved}
              </div>
              <ul className="list-disc space-y-0.5 ps-4 text-muted-foreground">
                {report.improved.map((item) => (
                  <li key={item.en}>{item[locale]}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-amber-700 dark:text-amber-300">{at.reportWeak}</div>
              <ul className="list-disc space-y-0.5 ps-4 text-muted-foreground">
                {report.stillWeak.map((item) => (
                  <li key={item.en}>{item[locale]}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5">
              <div className="font-bold text-foreground">{at.reportNext}</div>
              <div className="space-y-1.5">
                {report.prioritizedNext.map((act) => (
                  <Link
                    key={act.title.en}
                    to={act.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-3 py-2 transition-colors hover:border-primary/50"
                  >
                    <div>
                      <div className="font-bold text-foreground">{act.title[locale]}</div>
                      <div className="text-[11px] text-muted-foreground">{act.reason[locale]}</div>
                    </div>
                    <ArrowRight
                      className="size-3.5 shrink-0 text-primary rtl:rotate-180"
                      aria-hidden
                    />
                  </Link>
                ))}
              </div>
            </div>

            <p className="rounded-xl bg-card/80 p-2.5 text-[11px] leading-relaxed text-muted-foreground">
              <strong className="text-foreground">{at.reportTrajectory}: </strong>
              {report.goalTrajectory[locale]}
            </p>
          </div>
        )}

        {/* Chat Conversation Feed */}
        <div className="flex-1 space-y-3 overflow-y-auto rounded-2xl border border-border/70 bg-muted/20 p-3">
          {turns.length === 0 ? (
            <p className="py-6 text-center text-xs text-muted-foreground">{at.emptyHint}</p>
          ) : (
            turns.map((turn) => (
              <div
                key={turn.id}
                className={`space-y-2 rounded-2xl p-3 text-xs leading-relaxed ${
                  turn.role === "learner"
                    ? "ms-8 bg-primary text-primary-foreground"
                    : "me-4 border border-border bg-card text-foreground"
                }`}
              >
                <p>{turn.text}</p>
                {turn.examples && turn.examples.length > 0 && (
                  <ul
                    className="space-y-1 rounded-xl bg-muted/50 p-2 text-[11px] text-foreground"
                    dir="ltr"
                  >
                    {turn.examples.map((ex) => (
                      <li key={ex}>• {ex}</li>
                    ))}
                  </ul>
                )}
                {turn.recommendedActions && turn.recommendedActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {turn.recommendedActions.map((act) => (
                      <Link
                        key={act.to + act.label.en}
                        to={act.to}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary hover:bg-primary/20"
                      >
                        {act.label[locale]}
                        <ArrowRight className="size-3 rtl:rotate-180" aria-hidden />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="size-3.5 animate-spin text-primary" aria-hidden />
              <span>{at.thinking}</span>
            </div>
          )}
        </div>

        {/* Free Question Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void handleAsk("ask");
          }}
          className="flex items-center gap-2 pt-1"
        >
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={at.inputPlaceholder}
            aria-label={at.inputPlaceholder}
            disabled={loading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={loading || !question.trim()}
            aria-label={at.sendBtn}
          >
            <Send className="size-4 rtl:rotate-180" aria-hidden />
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
