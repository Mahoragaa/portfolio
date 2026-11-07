"use client";

import { motion, useReducedMotion } from "motion/react";
import { hero, site } from "@/content/content";

export function Hero({
  canvasSlot,
}: {
  canvasSlot?: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();
  const letters = Array.from(site.name);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden border-b border-line pt-12 pb-20 sm:pt-20 sm:pb-28"
    >
      {/* Static SVG lattice fallback (always present underneath; interactive canvas mounts on top in Milestone 2) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute -top-36 right-1/4 h-[28rem] w-[28rem] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />
        <svg
          className="h-full w-full opacity-[0.18]"
          viewBox="0 0 1200 640"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <g stroke="currentColor" strokeWidth="0.75">
            <line x1="140" y1="110" x2="340" y2="180" />
            <line x1="340" y1="180" x2="560" y2="120" />
            <line x1="560" y1="120" x2="820" y2="210" />
            <line x1="820" y1="210" x2="1040" y2="140" />
            <line x1="340" y1="180" x2="420" y2="390" />
            <line x1="560" y1="120" x2="680" y2="360" />
            <line x1="820" y1="210" x2="680" y2="360" />
            <line x1="420" y1="390" x2="680" y2="360" />
            <line x1="680" y1="360" x2="960" y2="450" />
            <line x1="210" y1="440" x2="420" y2="390" />
          </g>
          <g fill="var(--accent)">
            <circle cx="140" cy="110" r="3.5" />
            <circle cx="340" cy="180" r="4.5" />
            <circle cx="560" cy="120" r="4" />
            <circle cx="820" cy="210" r="5" />
            <circle cx="1040" cy="140" r="3.5" />
            <circle cx="420" cy="390" r="4" />
            <circle cx="680" cy="360" r="5" />
            <circle cx="960" cy="450" r="3.5" />
            <circle cx="210" cy="440" r="3.5" />
          </g>
        </svg>
        {canvasSlot}
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/90 px-3.5 py-1.5 font-mono text-xs text-muted">
              <span
                className="h-2 w-2 rounded-full bg-accent"
                aria-hidden="true"
              />
              <span>{hero.eyebrow}</span>
            </div>

            {/* Split-letter h1 with explicit aria-label (Rule 11) */}
            <div className="space-y-3">
              <h1
                id="hero-heading"
                aria-label={`${site.name} — ${hero.headline}`}
                className="font-display text-4xl font-bold tracking-tight text-text sm:text-6xl lg:text-[4.15rem] lg:leading-[1.06]"
              >
                <span aria-hidden="true" className="block">
                  {letters.map((ch, idx) => (
                    <motion.span
                      key={idx}
                      initial={
                        prefersReducedMotion ? false : { opacity: 0, y: 18 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.36,
                        delay: prefersReducedMotion ? 0 : idx * 0.025,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="inline-block"
                    >
                      {ch === " " ? "\u00A0" : ch}
                    </motion.span>
                  ))}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-2 block text-2xl font-semibold tracking-tight text-muted sm:text-3xl lg:text-4xl"
                >
                  {hero.headline}
                </span>
              </h1>
            </div>

            {/* One-line proof bar (Rule 8) */}
            <div className="rounded-2xl border border-accent-border bg-surface/95 p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-accent">
                <span className="rounded bg-accent px-2 py-0.5 font-semibold text-accent-ink">
                  PROOF
                </span>
                <span>{hero.proof.role}</span>
                <span aria-hidden="true">·</span>
                <span className="text-muted">{hero.proof.context}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-text sm:text-base">
                <strong className="font-mono text-accent">
                  {hero.proof.metric}
                </strong>{" "}
                — {hero.proof.detail}
              </p>
            </div>

            {/* Summary */}
            <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {hero.summary}
            </p>

            {/* Focus areas as clean tags (Rule 8) */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">
                Focus:
              </span>
              {hero.focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-line bg-elevated px-3 py-1 font-mono text-xs text-text"
                >
                  {area}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={hero.ctas.primary.href}
                data-cursor="Projects"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-xs font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
              >
                <span>{hero.ctas.primary.label}</span>
                <span aria-hidden="true">↓</span>
              </a>

              <a
                href={hero.ctas.resume.href}
                download="Raghav_Arora_Resume.pdf"
                data-cursor="PDF"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-3 font-mono text-xs font-medium text-text transition-colors hover:border-accent-border"
              >
                <span>{hero.ctas.resume.label}</span>
              </a>

              <a
                href={hero.ctas.contact.href}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-transparent px-5 py-3 font-mono text-xs text-muted transition-colors hover:border-line-strong hover:text-text"
              >
                <span>{hero.ctas.contact.label}</span>
              </a>
            </div>
          </div>

          {/* Right column: Clean quick-facts & monogram card (no fake counters) */}
          <aside
            aria-label="Quick facts"
            className="rounded-2xl border border-line bg-surface/90 p-6 lg:col-span-4"
          >
            <div className="flex items-center gap-4 border-b border-line pb-5">
              {/* Styled monogram placeholder slot (ready to swap with /photo.jpg) */}
              <div
                aria-hidden="true"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-accent-border bg-accent-dim font-display text-2xl font-bold text-accent"
              >
                {site.shortName}
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-text">
                  {site.name}
                </p>
                <p className="font-mono text-xs text-muted">
                  Infosys · System Engineer
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-accent">
                  B.Tech CSE · SRM University AP
                </p>
              </div>
            </div>

            <dl className="mt-5 space-y-3.5 text-xs">
              <div className="flex items-start justify-between gap-3">
                <dt className="font-mono text-muted">Current work</dt>
                <dd className="text-right font-medium text-text">
                  Pfizer L3 · PL/SQL &amp; Oracle Argus
                </dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="font-mono text-muted">Verified impact</dt>
                <dd className="text-right font-mono font-semibold text-accent">
                  87.5% query time cut (2h → 15m)
                </dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="font-mono text-muted">AI &amp; Cloud certs</dt>
                <dd className="text-right text-text">
                  Infosys Gen AI · 3× Oracle OCI/AI
                </dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="font-mono text-muted">Spoken languages</dt>
                <dd className="text-right text-text">
                  {site.languages.join(" · ")}
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex items-center justify-between border-t border-line pt-4 font-mono text-xs">
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-accent"
              >
                github.com/{site.links.githubUser} ↗
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-accent"
              >
                LinkedIn ↗
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
