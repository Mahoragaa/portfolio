import type { ArchEdge, ArchNode } from "@/content/content";

const groupBadgeStyles: Record<
  ArchNode["group"],
  { pill: string; label: string }
> = {
  client: {
    pill: "border-accent-border bg-accent-dim text-accent",
    label: "CLIENT / UI",
  },
  api: {
    pill: "border-line-strong bg-elevated text-text",
    label: "API / ROUTER",
  },
  compute: {
    pill: "border-line-strong bg-elevated text-text",
    label: "COMPUTE / PIPELINE",
  },
  ai: {
    pill: "border-accent-border bg-accent-dim text-accent",
    label: "AI / MODEL",
  },
  data: {
    pill: "border-line-strong bg-elevated text-text",
    label: "STORAGE / DB",
  },
  external: {
    pill: "border-line bg-surface text-muted",
    label: "EXTERNAL API",
  },
};

export function ArchitectureDiagram({
  nodes,
  edges,
  pendingReview,
  sourceNote,
  compact = false,
}: {
  nodes: ArchNode[];
  edges: ArchEdge[];
  pendingReview: boolean;
  sourceNote: string;
  compact?: boolean;
}) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <div className="rounded-2xl border border-line bg-bg/70 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span
            className="h-2 w-2 rounded-full bg-accent"
            aria-hidden="true"
          />
          <span className="font-semibold text-text">
            Code-Derived System Topology
          </span>
        </div>
        {pendingReview && (
          <span className="rounded-full border border-accent-border bg-accent-dim px-2.5 py-0.5 font-mono text-[11px] text-accent">
            Derived from repo code · flagged for owner review
          </span>
        )}
      </div>

      {/* Nodes grid */}
      <ol
        aria-label="Architecture components"
        className={`mt-4 grid gap-3 ${
          compact
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {nodes.map((node, index) => {
          const badge = groupBadgeStyles[node.group];
          return (
            <li
              key={node.id}
              className="flex flex-col justify-between rounded-xl border border-line bg-surface p-3.5"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold ${badge.pill}`}
                  >
                    {badge.label}
                  </span>
                  <span className="font-mono text-[11px] text-muted">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-2 font-display text-sm font-semibold text-text">
                  {node.label}
                </p>
                <p className="mt-0.5 text-xs text-muted">{node.sub}</p>
              </div>
              <p className="mt-3 truncate border-t border-line pt-2 font-mono text-[11px] text-muted">
                <span className="text-accent">src:</span> {node.fileRef}
              </p>
            </li>
          );
        })}
      </ol>

      {/* Call / data-flow edges */}
      {!compact && edges.length > 0 && (
        <div className="mt-4 border-t border-line pt-3">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
            Verified Call &amp; Data Flow
          </p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {edges.map((edge, idx) => {
              const fromNode = nodeMap.get(edge.from);
              const toNode = nodeMap.get(edge.to);
              return (
                <li
                  key={`${edge.from}-${edge.to}-${idx}`}
                  className="flex flex-col justify-between rounded-lg border border-line bg-surface/60 px-3 py-2 text-xs"
                >
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-text">
                    <span>{fromNode?.label ?? edge.from}</span>
                    <span className="text-accent" aria-hidden="true">
                      →
                    </span>
                    <span>{toNode?.label ?? edge.to}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-2 font-mono text-[11px] text-muted">
                    <span>{edge.label}</span>
                    <span className="truncate text-[10px] opacity-80">
                      ({edge.fileRef})
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted">
        {sourceNote}
      </p>
    </div>
  );
}
