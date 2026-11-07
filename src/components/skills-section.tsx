"use client";

import Link from "next/link";
import { useState } from "react";
import {
  skillCategories,
  skills,
  type Skill,
  type SkillCategory,
} from "@/content/content";
import { useHighlight } from "@/components/highlight-context";

export function SkillsSection({
  graphSlot,
}: {
  graphSlot?: React.ReactNode;
}) {
  const [category, setCategory] = useState<SkillCategory | "all">("all");
  const [inspectedSkillId, setInspectedSkillId] = useState<string>("python");
  const { activeSkillId, toggleSkill, selectSkill } = useHighlight();

  const filteredSkills =
    category === "all"
      ? skills
      : skills.filter((s) => s.category === category);

  // Active or inspected skill for the accessible evidence drawer
  const currentSkill: Skill =
    skills.find((s) => s.id === (activeSkillId ?? inspectedSkillId)) ??
    skills[0];

  const handleSkillAction = (skill: Skill) => {
    setInspectedSkillId(skill.id);
    if (skill.evidence.length > 0) {
      toggleSkill(skill.id);
    } else {
      selectSkill(null);
    }
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-20 border-b border-line py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              {"// 03 — Evidence-Backed Skills Explorer"}
            </p>
            <h2
              id="skills-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl"
            >
              Skills Linked to Real Code &amp; Production Work
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted">
            No arbitrary percentage bars. Tap, click, or focus any skill to
            inspect exact file paths and resume bullets—and highlight matching
            projects and roles across the page.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter skills by category"
          className="mt-8 flex flex-wrap gap-2"
        >
          {skillCategories.map((cat) => {
            const count =
              cat.id === "all"
                ? skills.length
                : skills.filter((s) => s.category === cat.id).length;
            const isSelected = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setCategory(cat.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs transition-colors ${
                  isSelected
                    ? "border-accent bg-accent text-accent-ink font-semibold"
                    : "border-line bg-surface text-muted hover:border-line-strong hover:text-text"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    isSelected
                      ? "bg-accent-ink/15 text-accent-ink"
                      : "bg-elevated text-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main 2-column explorer: Skill chips + Evidence Inspector */}
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-12">
          {/* Left: Interactive skill chips */}
          <div className="rounded-3xl border border-line bg-surface p-5 sm:p-6 lg:col-span-7">
            <div className="mb-4 flex items-center justify-between gap-2 border-b border-line pb-3 font-mono text-xs text-muted">
              <span>
                Showing <strong className="text-text">{filteredSkills.length}</strong>{" "}
                skills · badge = verified project/role links
              </span>
              {activeSkillId && (
                <button
                  type="button"
                  onClick={() => selectSkill(null)}
                  className="text-accent underline underline-offset-4"
                >
                  Reset page highlight
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2.5">
              {filteredSkills.map((skill) => {
                const isPinned = activeSkillId === skill.id;
                const isInspected = currentSkill.id === skill.id;
                const evidenceCount = skill.evidence.length;

                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => handleSkillAction(skill)}
                    onFocus={() => setInspectedSkillId(skill.id)}
                    onMouseEnter={() => setInspectedSkillId(skill.id)}
                    aria-pressed={isPinned}
                    aria-controls="skill-evidence-panel"
                    className={`group inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-left font-mono text-xs transition-all ${
                      isPinned
                        ? "border-accent bg-accent text-accent-ink font-semibold shadow-sm"
                        : isInspected
                        ? "border-accent-border bg-accent-dim text-text"
                        : "border-line bg-elevated/70 text-text hover:border-line-strong"
                    }`}
                  >
                    <span>{skill.name}</span>
                    {evidenceCount > 0 ? (
                      <span
                        title={`${evidenceCount} verified evidence link${
                          evidenceCount === 1 ? "" : "s"
                        }`}
                        className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                          isPinned
                            ? "bg-accent-ink/20 text-accent-ink"
                            : "bg-surface text-accent"
                        }`}
                      >
                        {evidenceCount}
                      </span>
                    ) : (
                      <span
                        title="Certified on resume (no separate project/role link)"
                        className="rounded-full bg-surface px-1.5 py-0.5 text-[10px] text-muted"
                      >
                        cert
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Accessible Evidence Drawer (works on tap, click, keyboard focus, and hover) */}
          <aside
            id="skill-evidence-panel"
            aria-live="polite"
            className="rounded-3xl border border-accent-border bg-surface p-6 lg:sticky lg:top-24 lg:col-span-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
                  Evidence Inspector
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold text-text">
                  {currentSkill.name}
                </h3>
              </div>

              {currentSkill.evidence.length > 0 && (
                <button
                  type="button"
                  onClick={() => toggleSkill(currentSkill.id)}
                  className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
                    activeSkillId === currentSkill.id
                      ? "border-accent bg-accent text-accent-ink font-semibold"
                      : "border-accent-border bg-accent-dim text-accent hover:bg-accent hover:text-accent-ink"
                  }`}
                >
                  {activeSkillId === currentSkill.id
                    ? "Pinned on page ✓"
                    : "Highlight on page"}
                </button>
              )}
            </div>

            {currentSkill.evidence.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {currentSkill.evidence.map((ev, i) => {
                  const href =
                    ev.kind === "project"
                      ? `/projects/${ev.id}`
                      : `/#experience`;
                  return (
                    <li
                      key={`${ev.kind}-${ev.id}-${i}`}
                      className="rounded-2xl border border-line bg-elevated/60 p-3.5 text-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded bg-surface px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                          {ev.kind === "project" ? "Project" : "Role"} ·{" "}
                          {ev.source === "both"
                            ? "Resume + Code"
                            : ev.source === "code"
                            ? "Repo Code"
                            : "Resume"}
                        </span>
                        <Link
                          href={href}
                          className="font-mono text-[11px] text-accent underline underline-offset-4 hover:opacity-80"
                        >
                          {ev.kind === "project"
                            ? "Open case study →"
                            : "Jump to role ↓"}
                        </Link>
                      </div>

                      <p className="mt-2 font-display text-sm font-semibold text-text">
                        {ev.label}
                      </p>
                      <p className="mt-1 leading-relaxed text-muted">
                        {ev.note}
                      </p>
                      <p className="mt-2 border-t border-line pt-1.5 font-mono text-[11px] text-muted">
                        <span className="text-accent">proof:</span>{" "}
                        {ev.citation}
                      </p>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="mt-4 rounded-2xl border border-line bg-elevated/50 p-4 text-xs text-muted">
                <p className="font-medium text-text">
                  Verified via Oracle University Certification
                </p>
                <p className="mt-1 leading-relaxed">
                  Listed on the resume under Cloud &amp; Tools and backed by{" "}
                  <strong>
                    Oracle Cloud Infrastructure Certified Foundations Associate
                  </strong>{" "}
                  (ID <code>330061829OCI26FNDCFA</code>) and{" "}
                  <strong>OCI Certified AI Foundations Associate</strong> (ID{" "}
                  <code>330061829OCI26AICFA</code>). Not linked to a project
                  card because none of the four GitHub repositories deploy to
                  OCI.
                </p>
              </div>
            )}
          </aside>
        </div>

        {/* Optional radial skill-to-project graph slot (Milestone 2) */}
        {graphSlot && <div className="mt-12">{graphSlot}</div>}
      </div>
    </section>
  );
}
