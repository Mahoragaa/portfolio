"use client";

import { motion, useReducedMotion } from "motion/react";
import { certifications, education } from "@/content/content";
import { useHighlight } from "@/components/highlight-context";

export function EducationSection() {
  const prefersReducedMotion = useReducedMotion();
  const { showToast } = useHighlight();

  const copyCredentialId = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      showToast(`Copied credential ID: ${id}`);
    } catch {
      showToast(`Credential ID: ${id}`);
    }
  };

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="scroll-mt-20 border-b border-line py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              {"// 04 — Education & Certifications"}
            </p>
            <h2
              id="education-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl"
            >
              Academic Background &amp; Credentials
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted">
            B.Tech in Computer Science Engineering from SRM University AP plus
            certifications across Generative AI, Oracle Cloud Infrastructure,
            Oracle EBS R12, and Oracle Argus.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          {/* Education column */}
          <div className="space-y-4 lg:col-span-5">
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted">
              Education
            </h3>
            {education.map((ed, idx) => (
              <motion.article
                key={ed.school}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="rounded-2xl border border-line bg-surface p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-display text-lg font-bold text-text">
                      {ed.degree}
                    </h4>
                    <a
                      href={ed.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block font-mono text-xs text-accent hover:underline"
                    >
                      {ed.school} ↗
                    </a>
                  </div>
                  <span className="shrink-0 rounded-full border border-line bg-elevated px-3 py-1 font-mono text-xs text-muted">
                    {ed.period}
                  </span>
                </div>
                <p className="mt-4 inline-block rounded-lg border border-accent-border bg-accent-dim px-3 py-1 font-mono text-xs font-semibold text-accent">
                  {ed.grade}
                </p>
              </motion.article>
            ))}
          </div>

          {/* Certifications column */}
          <div className="space-y-4 lg:col-span-7">
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted">
              Certifications
            </h3>
            <div className="grid gap-3.5 sm:grid-cols-2">
              {certifications.map((cert, idx) => (
                <motion.article
                  key={cert.name}
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, y: 14 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 font-mono text-xs text-muted">
                      <span className="text-accent">{cert.issuer}</span>
                      <span>{cert.date}</span>
                    </div>
                    <h4 className="mt-2 font-display text-sm font-semibold leading-snug text-text">
                      {cert.name}
                    </h4>
                  </div>

                  {cert.credentialId && (
                    <div className="mt-3 flex items-center justify-between gap-2 border-t border-line pt-2.5">
                      <span
                        className="truncate font-mono text-[11px] text-muted"
                        title={cert.credentialId}
                      >
                        ID: {cert.credentialId}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyCredentialId(cert.credentialId!)}
                        className="shrink-0 rounded border border-line bg-elevated px-2 py-0.5 font-mono text-[10px] text-text transition-colors hover:border-accent-border"
                      >
                        Copy ID
                      </button>
                    </div>
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
