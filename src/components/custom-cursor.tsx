"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [label, setLabel] = useState<string | null>(null);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    if (!mq.matches) return;

    const ring = ringRef.current;
    if (!ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = 0;

    const update = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      rafId = window.requestAnimationFrame(update);
    };

    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement | null;
      const customEl = target?.closest?.("[data-cursor]") as HTMLElement | null;
      const interactiveEl = target?.closest?.("a, button, [role='button'], input, textarea");

      if (customEl) {
        setLabel(customEl.getAttribute("data-cursor"));
        setHoveringInteractive(true);
      } else {
        setLabel(null);
        setHoveringInteractive(Boolean(interactiveEl));
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    rafId = window.requestAnimationFrame(update);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-50 hidden items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-150 md:flex ${
        label
          ? "h-14 w-14 border-accent bg-accent/90 text-accent-ink"
          : hoveringInteractive
          ? "h-9 w-9 border-accent bg-accent-dim"
          : "h-5 w-5 border-accent/60 bg-transparent"
      }`}
    >
      {label && (
        <span className="font-mono text-[9px] font-bold uppercase tracking-tight">
          {label}
        </span>
      )}
    </div>
  );
}
