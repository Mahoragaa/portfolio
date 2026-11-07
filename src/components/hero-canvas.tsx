"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  accent: boolean;
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    if (!mq.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let isVisible = true;
    let isTabActive = !document.hidden;

    const pointer = { x: -9999, y: -9999, active: false };
    const NODE_COUNT = 42;
    const MAX_DIST = 165;
    const nodes: NodePoint[] = [];

    const initNodes = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (nodes.length === 0) {
        for (let i = 0; i < NODE_COUNT; i++) {
          nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.28,
            vy: (Math.random() - 0.5) * 0.28,
            radius: i % 5 === 0 ? 2.6 : 1.7,
            accent: i % 4 === 0,
          });
        }
      }
    };

    initNodes();

    const getAccentColors = () => {
      const isLight = document.documentElement.classList.contains("light");
      return {
        accent: isLight
          ? "rgba(61, 107, 7, 0.72)"
          : "rgba(198, 243, 107, 0.75)",
        node: isLight
          ? "rgba(14, 16, 19, 0.32)"
          : "rgba(236, 237, 238, 0.35)",
        edgeRgb: isLight ? "61, 107, 7" : "198, 243, 107",
      };
    };

    let colors = getAccentColors();
    const themeObserver = new MutationObserver(() => {
      colors = getAccentColors();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const draw = () => {
      if (!isVisible || !isTabActive) {
        rafId = 0;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        if (pointer.active) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 220 * 220 && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const pull = (1 - dist / 220) * 0.015;
            n.x += dx * pull;
            n.y += dy * pull;
          }
        }
      }

      ctx.lineWidth = 0.75;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.22;
            ctx.strokeStyle = `rgba(${colors.edgeRgb}, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        ctx.fillStyle = n.accent ? colors.accent : colors.node;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = window.requestAnimationFrame(draw);
    };

    const startLoop = () => {
      if (!rafId && isVisible && isTabActive) {
        rafId = window.requestAnimationFrame(draw);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        pointer.x >= 0 &&
        pointer.x <= rect.width &&
        pointer.y >= 0 &&
        pointer.y <= rect.height;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive) startLoop();
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting;
        }
        if (isVisible) startLoop();
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    window.addEventListener("resize", initNodes, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    startLoop();

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", initNodes);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
    />
  );
}
