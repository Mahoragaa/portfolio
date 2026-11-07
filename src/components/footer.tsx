import { site } from "@/content/content";

export function Footer() {
  const sha = process.env.NEXT_PUBLIC_BUILD_SHA || "local";
  const rawTime = process.env.NEXT_PUBLIC_BUILD_TIME;
  const formattedDate = rawTime ? rawTime.slice(0, 10) : null;

  return (
    <footer className="border-t border-line bg-surface/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded border border-accent-border bg-accent-dim font-mono text-[11px] font-bold text-accent">
              {site.shortName}
            </span>
            <p className="font-display text-sm font-semibold text-text">
              {site.name}
            </p>
          </div>
          <p className="text-xs text-muted">
            Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4 &amp;
            Motion. All content sourced from verified resume &amp; repository
            code.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-muted">
          <span
            className="inline-flex items-center gap-2 rounded-full border border-line bg-elevated px-3 py-1"
            title={rawTime ? `Built at ${rawTime}` : "Build metadata"}
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            <span>
              commit: <strong className="text-text">{sha}</strong>
              {formattedDate ? ` · ${formattedDate}` : ""}
            </span>
          </span>

          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            GitHub ↗
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            LinkedIn ↗
          </a>
          <a
            href="#top"
            className="rounded-full border border-line bg-surface px-3 py-1 text-text transition-colors hover:border-accent-border"
          >
            Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

