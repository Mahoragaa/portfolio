import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <SiteShell>
      <main
        id="main-content"
        className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          {"// 404 — Route Not Found"}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-text sm:text-5xl">
          This page doesn’t exist.
        </h1>
        <p className="mt-3 max-w-md text-sm text-muted">
          The route you requested could not be found. Return to the portfolio
          home page or jump directly to the featured case studies.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-accent px-6 py-3 font-mono text-xs font-semibold text-accent-ink"
          >
            Back to Home →
          </Link>
          <Link
            href="/#projects"
            className="rounded-full border border-line bg-surface px-5 py-3 font-mono text-xs text-text hover:border-accent-border"
          >
            View Projects
          </Link>
        </div>
      </main>
      <Footer />
    </SiteShell>
  );
}
