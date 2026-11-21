"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Minimal cursor: a precise dot plus a softly trailing ring.
 * On interactive elements the ring gently expands into a translucent halo
 * (never a filled bubble, never covering text) via transform/opacity only.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    if (!mq.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let scale = 1;
    let targetScale = 1;
    let visible = 0;
    let rafId = 0;

    const update = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      scale += (targetScale - scale) * 0.18;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
      rafId = window.requestAnimationFrame(update);
    };

    const setVisible = (v: number) => {
      visible = v;
      dot.style.opacity = String(v);
      ring.style.opacity = String(v);
    };

    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        ringX = mouseX;
        ringY = mouseY;
        setVisible(1);
      }
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest?.(
        "a, button, [role='button'], input, textarea, [data-cursor]",
      );
      targetScale = interactive ? 1.9 : 1;
      ring.dataset.active = interactive ? "true" : "false";
      dot.style.opacity = interactive ? "0.35" : "1";
    };

    const onLeave = () => setVisible(0);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    rafId = window.requestAnimationFrame(update);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 hidden h-7 w-7 rounded-full border border-accent/60 opacity-0 transition-[opacity,background-color,border-color] duration-300 data-[active=true]:border-accent/40 data-[active=true]:bg-accent/10 md:block"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 hidden h-1.5 w-1.5 rounded-full bg-accent opacity-0 transition-opacity duration-300 md:block"
      />
    </>
  );
}
