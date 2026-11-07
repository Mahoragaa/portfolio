import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/content/content";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArchitectureDiagram } from "@/components/architecture-diagram";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: `${project.title} — Case Study · Raghav Arora`,
    description: project.description,
    openGraph: {
      title: `${project.title} — ${project.subtitle}`,
      description: project.pitch,
      type: "article",
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  "use cache";
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const currentIdx = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIdx + 1) % projects.length];

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <Navbar />

      <main id="main-content" className="flex-1 py-12 sm:py-16">
        <article className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-muted transition-colors hover:border-accent-border hover:text-text"
            >
              <span aria-hidden="true">←</span>
              <span>Back to all projects</span>
            </Link>
          </nav>

          {/* Header */}
          <header className="space-y-4 border-b border-line pb-8">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="rounded-full border border-accent-border bg-accent-dim px-3 py-0.5 font-semibold text-accent">
                {project.fallbackLanguage}
              </span>
              {project.categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full border border-line bg-surface px-3 py-0.5 text-muted"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-5xl">
              {project.title}
            </h1>
            <p className="font-mono text-sm text-accent sm:text-base">
              {project.subtitle}
            </p>
            <p className="max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
              {project.description}
            </p>

            {/* Primary action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-xs font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
                >
                  <span>Open Live Demo</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-2.5 font-mono text-xs font-medium text-text transition-colors hover:border-accent-border"
              >
                <span>View Source on GitHub</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </header>

          {/* Screenshot / Media gallery (if present) */}
          {project.media.length > 0 && (
            <section aria-label="Project preview" className="mt-10 space-y-3">
              {project.media.map((item, i) => (
                <figure
                  key={i}
                  className="overflow-hidden rounded-3xl border border-line bg-surface p-3"
                >
                  {item.type === "image" ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      priority={i === 0}
                      className="h-auto w-full rounded-2xl"
                    />
                  ) : (
                    <video
                      src={item.src}
                      poster={item.poster}
                      controls
                      preload="metadata"
                      className="w-full rounded-2xl"
                    />
                  )}
                  <figcaption className="mt-2.5 px-2 font-mono text-xs text-muted">
                    {item.caption}
                  </figcaption>
                </figure>
              ))}
            </section>
          )}

          {/* Overview, Problem & Solution grid */}
          <section className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <h2 className="font-mono text-xs uppercase tracking-wider text-accent">
                01 · Overview
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {project.overview}
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-6">
              <h2 className="font-mono text-xs uppercase tracking-wider text-accent">
                02 · Problem Addressed
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {project.problem}
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-6">
              <h2 className="font-mono text-xs uppercase tracking-wider text-accent">
                03 · Engineering Solution
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {project.solution}
              </p>
            </div>
          </section>

          {/* Code-Derived Architecture */}
          <section aria-labelledby="arch-heading" className="mt-12 space-y-4">
            <h2
              id="arch-heading"
              className="font-display text-2xl font-bold text-text"
            >
              System Architecture (Derived from Source)
            </h2>
            <ArchitectureDiagram
              nodes={project.architecture.nodes}
              edges={project.architecture.edges}
              pendingReview={project.architecture.pendingReview}
              sourceNote={project.architecture.sourceNote}
            />
          </section>

          {/* Key Features & Tech Stack */}
          <section className="mt-12 grid gap-8 lg:grid-cols-12">
            <div className="rounded-3xl border border-line bg-surface p-6 sm:p-7 lg:col-span-7">
              <h2 className="font-display text-xl font-bold text-text">
                Key Features &amp; Capabilities
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                {project.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-3xl border border-line bg-surface p-6">
                <h2 className="font-display text-lg font-bold text-text">
                  Tech Stack
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-line bg-elevated px-3 py-1 font-mono text-xs text-text"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-line bg-surface p-6">
                <h2 className="font-display text-lg font-bold text-text">
                  My Role
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {project.role}
                </p>
                {project.roleVerificationNote && (
                  <p className="mt-3 rounded-xl border border-accent-border bg-accent-dim p-3 font-mono text-xs text-accent">
                    {project.roleVerificationNote}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Technical Challenges & Decisions */}
          <section
            aria-labelledby="challenges-heading"
            className="mt-12 space-y-4"
          >
            <h2
              id="challenges-heading"
              className="font-display text-2xl font-bold text-text"
            >
              Notable Technical Decisions &amp; Evidence
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {project.challenges.map((ch) => (
                <div
                  key={ch.title}
                  className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-6"
                >
                  <div>
                    <h3 className="font-display text-base font-bold text-text">
                      {ch.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {ch.body}
                    </p>
                  </div>
                  <p className="mt-4 border-t border-line pt-2.5 font-mono text-xs text-accent">
                    file: {ch.fileRef}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Next case study navigation */}
          {nextProject && (
            <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line bg-surface p-6">
              <div>
                <p className="font-mono text-xs text-muted">Next Case Study</p>
                <p className="mt-1 font-display text-xl font-bold text-text">
                  {nextProject.title} — {nextProject.subtitle}
                </p>
              </div>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-xs font-semibold text-accent-ink"
              >
                <span>View {nextProject.title}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}

