import { useEffect, useRef, useState, type PointerEvent } from "react";
import { CheckCircle2, Eraser, Pencil } from "lucide-react";

import { useI18n } from "@/components/i18n-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CRAYONS = [
  { name: "Sky Blue", color: "#0284c7" },
  { name: "Berry Pink", color: "#e11d48" },
  { name: "Leaf Green", color: "#16a34a" },
  { name: "Sun Orange", color: "#d97706" },
] as const;

export interface LetterTracingPadProps {
  letter: string;
  lower: string;
  hint: string;
  traced: boolean;
  onCompleteTrace: () => void;
}

export function LetterTracingPad({
  letter,
  lower,
  hint,
  traced,
  onCompleteTrace,
}: LetterTracingPadProps) {
  const { t } = useI18n();
  const kw = t.kidsWorld;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const [inkColor, setInkColor] = useState<string>(CRAYONS[0].color);
  const [hasDrawn, setHasDrawn] = useState(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    } catch {
      // ignore in environments without 2D canvas
    }
    setHasDrawn(false);
  };

  useEffect(() => {
    clearCanvas();
  }, [letter]);

  const getPoint = (e: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = rect.width > 0 ? canvas.width / rect.width : 1;
    const scaleY = rect.height > 0 ? canvas.height / rect.height : 1;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawingRef.current = true;
    setHasDrawn(true);
    try {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const { x, y } = getPoint(e);
      ctx.strokeStyle = inkColor;
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(x, y);
    } catch {
      // ignore in JSDOM
    }
  };

  const handlePointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const { x, y } = getPoint(e);
      ctx.lineTo(x, y);
      ctx.stroke();
    } catch {
      // ignore in JSDOM
    }
  };

  const handlePointerUp = () => {
    drawingRef.current = false;
  };

  return (
    <div className="rounded-3xl border-2 border-primary/25 bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Pencil className="size-4 text-primary" aria-hidden />
          <h3 className="text-base font-extrabold text-foreground">{kw.tracingTitle}</h3>
        </div>
        {traced && (
          <Badge variant="default" className="bg-emerald-600 text-xs">
            <CheckCircle2 className="me-1 size-3.5" aria-hidden />
            {kw.tracingDoneBadge}
          </Badge>
        )}
      </div>

      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>

      {/* Interactive Guided Canvas */}
      <div className="relative mt-3 overflow-hidden rounded-2xl border-2 border-dashed border-primary/35 bg-background">
        {/* Faint giant tracing guide */}
        <div
          aria-hidden
          dir="ltr"
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center gap-8 font-extrabold text-muted-foreground/20"
          style={{ fontSize: "7.5rem", lineHeight: 1 }}
        >
          <span>{letter}</span>
          <span>{lower}</span>
        </div>

        {/* Baseline guides */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-4 top-1/2 border-t border-dashed border-primary/20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-4 bottom-8 border-t border-primary/25"
        />

        <canvas
          ref={canvasRef}
          width={480}
          height={180}
          aria-label={`${kw.tracingTitle} ${letter} ${lower}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="relative z-10 h-44 w-full touch-none cursor-crosshair"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        {/* Crayon Colour Picker */}
        <div className="flex items-center gap-2" role="group" aria-label="Crayon colour">
          {CRAYONS.map((c) => (
            <button
              key={c.name}
              type="button"
              aria-label={c.name}
              onClick={() => setInkColor(c.color)}
              style={{ backgroundColor: c.color }}
              className={`size-7 rounded-full border-2 transition-transform ${
                inkColor === c.color
                  ? "scale-110 border-foreground ring-2 ring-primary/40"
                  : "border-white/80"
              }`}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="outline" onClick={clearCanvas}>
            <Eraser className="me-1.5 size-3.5" aria-hidden />
            {kw.tracingClearBtn}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="default"
            onClick={onCompleteTrace}
            className="rounded-full font-bold"
          >
            {hasDrawn || traced ? kw.tracingDoneBtn : kw.tracingDoneBtn}
          </Button>
        </div>
      </div>
    </div>
  );
}
