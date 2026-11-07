"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { roles } from "@/content/content";
import { useHighlight } from "@/components/highlight-context";

export function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion();
  const { activeSkill, highlightedRoles } = useHighlight();
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(roles.map((r) => [r.id, true]))
  );

  const toggleRole = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-20 border-b border-line py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              {"// 02 — Working Experience"}
            </p>
            <h2
              id="experience-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl"
            >
              Production Engineering &amp; Internships
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted">
            Enterprise database engineering at Infosys (Pfizer pharmacovigilance
            L3 &amp; Oracle EBS R12) alongside Python backend and healthcare ML
            internships.
          </p>
        </div>

        <ol className="relative mt-12 space-y-6 border-l border-line-strong pl-6 sm:pl-8">
          {roles.map((role, index) => {
            const isHighlighted = highlightedRoles.has(role.id);
            const isDimmed = Boolean(activeSkill) && !isHighlighted;
            const isOpen = expandedIds[role.id] ?? true;

            return (
              <motion.li
                key={role.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className={`relative rounded-2xl border p-5 transition-all sm:p-6 ${
                  isHighlighted
                    ? "border-accent bg-surface ring-2 ring-accent/40"
                    : "border-line bg-surface"
                } ${isDimmed ? "opacity-45" : "opacity-100"}`}
              >
                {/* Timeline node dot */}
                <span
                  aria-hidden="true"
                  className={`absolute -left-[31px] top-7 h-3.5 w-3.5 rounded-full border-2 sm:-left-[39px] ${
                    isHighlighted || index === 0
                      ? "border-accent bg-accent"
                      : "border-line-strong bg-bg"
                  }`}
                />

                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-xl font-bold text-text">
                        {role.title}
                      </h3>
                      <span className="font-mono text-sm text-accent">
                        · {role.company}
                      </span>
                      {isHighlighted && activeSkill && (
                        <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[11px] font-semibold text-accent-ink">
                          Uses {activeSkill.name}
                        </span>
                      )}
                    </div>
                    {role.context && (
                      <p className="mt-1 font-mono text-xs text-muted">
                        {role.context}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-line bg-elevated px-3 py-1 font-mono text-xs text-text">
                      <time dateTime={role.start}>{role.period}</time>
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleRole(role.id)}
                      aria-expanded={isOpen}
                      aria-controls={`role-details-${role.id}`}
                      className="rounded-full border border-line bg-elevated px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-accent-border hover:text-text"
                    >
                      {isOpen ? "Collapse −" : "Expand +"}
                    </button>
                  </div>
                </div>

                {/* Verified stat highlight */}
                {role.highlightStat && (
                  <div className="mt-4 inline-flex flex-wrap items-baseline gap-2 rounded-xl border border-accent-border bg-accent-dim px-3.5 py-2">
                    <span className="font-mono text-base font-bold text-accent">
                      {role.highlightStat.value}
                    </span>
                    <span className="text-xs text-text">
                      {role.highlightStat.label}
                    </span>
                  </div>
                )}

                <div
                  id={`role-details-${role.id}`}
                  hidden={!isOpen}
                  className="mt-4"
                >
                  <ul className="space-y-2.5 text-sm leading-relaxed text-muted">
                    {role.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-3">
                    {role.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-line bg-elevated px-2.5 py-0.5 font-mono text-[11px] text-text"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
