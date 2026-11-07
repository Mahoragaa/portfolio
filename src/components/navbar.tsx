"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site, type SectionId } from "@/content/content";
import { useHighlight } from "@/components/highlight-context";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems: { id: SectionId; label: string; href: string }[] = [
  { id: "projects", label: "Projects", href: "/#projects" },
  { id: "experience", label: "Experience", href: "/#experience" },
  { id: "skills", label: "Skills", href: "/#skills" },
  { id: "education", label: "Credentials", href: "/#education" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

export function Navbar({ onOpenPalette }: { onOpenPalette?: () => void }) {
  const [activeId, setActiveId] = useState<SectionId>("top");
  const [hidden, setHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { activeSkill, selectSkill } = useHighlight();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(1, Math.max(0, y / docHeight)) : 0);

      if (y > 140 && y > lastY + 8) {
        setHidden(true);
      } else if (y < lastY - 8 || y <= 140) {
        setHidden(false);
      }
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids: SectionId[] = [
      "projects",
      "experience",
      "skills",
      "education",
      "contact",
    ];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id as SectionId);
          }
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0.05 }
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Top scroll progress bar */}
      <div
        aria-hidden="true"
        className="h-[2px] w-full bg-transparent"
      >
        <div
          className="h-full origin-left bg-accent transition-transform duration-75"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      <div className="border-b border-line bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 text-sm font-semibold tracking-tight text-text"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-accent-border bg-accent-dim font-mono text-xs font-bold text-accent">
              {site.shortName}
            </span>
            <span className="font-display text-base font-semibold">
              {site.name}
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors ${
                    isActive
                      ? "bg-accent-dim text-accent font-medium"
                      : "text-muted hover:text-text"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Visible command palette button on both mobile and desktop (Rule 11) */}
            {onOpenPalette && (
              <button
                type="button"
                onClick={onOpenPalette}
                aria-label="Open command palette"
                className="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-3 font-mono text-xs text-muted transition-colors hover:border-accent-border hover:text-text"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <span className="hidden sm:inline">Menu</span>
                <kbd className="rounded border border-line bg-elevated px-1.5 py-0.5 text-[10px] text-text">
                  ⌘K
                </kbd>
              </button>
            )}

            <a
              href={site.resume}
              download="Raghav_Arora_Resume.pdf"
              className="hidden rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-xs text-text transition-colors hover:border-accent-border sm:inline-flex"
            >
              Résumé ↓
            </a>

            <ThemeToggle />
          </div>
        </div>

        {/* Mobile horizontal section nav */}
        <nav
          aria-label="Section shortcuts"
          className="flex items-center gap-1 overflow-x-auto border-t border-line px-4 py-2 md:hidden"
        >
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`shrink-0 rounded-full px-3 py-1 font-mono text-xs ${
                  isActive
                    ? "bg-accent-dim text-accent font-medium"
                    : "text-muted hover:text-text"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Active skill evidence filter banner */}
        {activeSkill && (
          <div className="border-t border-accent-border bg-accent-dim/70 px-4 py-2">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 font-mono">
                <span className="inline-block h-2 w-2 rounded-full bg-accent" />
                <span className="text-text">
                  Highlighting evidence for{" "}
                  <strong className="text-accent">{activeSkill.name}</strong> (
                  {activeSkill.evidence.length}{" "}
                  {activeSkill.evidence.length === 1 ? "match" : "matches"})
                </span>
              </div>
              <button
                type="button"
                onClick={() => selectSkill(null)}
                className="rounded-full border border-accent-border bg-bg px-2.5 py-0.5 font-mono text-[11px] text-text hover:border-accent"
              >
                Clear highlight ×
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

