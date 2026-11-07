"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { projects, type Project } from "@/content/content";
import { useHighlight } from "@/components/highlight-context";
import { ArchitectureDiagram } from "@/components/architecture-diagram";

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const { activeSkill, highlightedProjects } = useHighlight();
  const isHighlighted = highlightedProjects.has(project.slug);
  const isDimmed = Boolean(activeSkill) && !isHighlighted;
  const heroMedia = project.media[0];

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      data-cursor="Case Study"
      className={`group relative flex flex-col justify-between rounded-3xl border p-6 transition-all duration-300 sm:p-7 ${
        isHighlighted
          ? "border-accent bg-surface ring-2 ring-accent/40"
          : "border-line bg-surface hover:border-line-strong"
      } ${isDimmed ? "opacity-45" : "opacity-100"}`}
    >
      <div>
        {/* Header bar */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-accent">0{index + 1}</span>
            <span className="text-muted">·</span>
            <span className="rounded-full border border-line bg-elevated px-2.5 py-0.5 text-text">
              {project.fallbackLanguage}
            </span>
            {project.categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-line px-2.5 py-0.5 text-muted"
              >
                {cat}
              </span>
            ))}
          </div>

          {isHighlighted && activeSkill && (
            <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[11px] font-semibold text-accent-ink">
              Uses {activeSkill.name}
            </span>
          )}
        </div>

        {/* Title & subtitle */}
        <div className="mt-4">
          <h3 className="font-display text-2xl font-bold tracking-tight text-text sm:text-3xl">
            <Link
              href={`/projects/${project.slug}`}
              className="transition-colors hover:text-accent"
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-1 font-mono text-xs text-muted">
            {project.subtitle}
          </p>
        </div>

        {/* Visual preview: real screenshot if live demo exists; otherwise code-derived architecture overview */}
        <div className="mt-5">
          {heroMedia && heroMedia.type === "image" ? (
            <Link
              href={`/projects/${project.slug}`}
              aria-label={`Open ${project.title} case study`}
              className="block overflow-hidden rounded-2xl border border-line bg-bg"
            >
              <Image
                src={heroMedia.src}
                alt={heroMedia.alt}
                width={heroMedia.width}
                height={heroMedia.height}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
              />
            </Link>
          ) : (
            <ArchitectureDiagram
              nodes={project.architecture.nodes}
              edges={project.architecture.edges}
              pendingReview={project.architecture.pendingReview}
              sourceNote={project.architecture.sourceNote}
              compact
            />
          )}
        </div>

        {/* Pitch & description */}
        <p className="mt-5 text-sm font-medium text-text sm:text-base">
          {project.pitch}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        {/* Key features preview (top 3) */}
        <ul className="mt-4 space-y-2 border-t border-line pt-4 text-xs leading-relaxed text-muted sm:text-sm">
          {project.features.slice(0, 3).map((feat, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer: stack chips + links */}
      <div className="mt-6 space-y-4 border-t border-line pt-4">
        <div
          aria-label="Technologies used"
          className="flex flex-wrap gap-1.5"
        >
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-line bg-elevated px-2.5 py-1 font-mono text-[11px] text-text"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-mono text-xs font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
          >
            <span>Read case study</span>
            <span aria-hidden="true">→</span>
          </Link>

          <div className="flex items-center gap-3 font-mono text-xs">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-accent-border bg-accent-dim px-3.5 py-1.5 font-medium text-accent transition-colors hover:bg-accent hover:text-accent-ink"
              >
                Live Demo ↗
              </a>
            )}
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line bg-elevated px-3.5 py-1.5 text-text transition-colors hover:border-accent-border"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className=" scroll-mt-20 border-b border-line py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              {"// 01 — Featured Engineering Work"}
            </p>
            <h2
              id="projects-heading"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl"
            >
              Selected Projects &amp; Case Studies
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted">
            Every feature, architecture diagram, and technical decision below is
            sourced directly from the repository code and verified against the
            resume.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
