"use client";

import { useRouter } from "next/navigation";
import { projects, roles, skills } from "@/content/content";
import { useHighlight } from "@/components/highlight-context";

const GRAPH_SKILLS = [
  "python",
  "typescript",
  "javascript",
  "java",
  "pl-sql",
  "sql",
  "langgraph",
  "langchain",
  "rag",
  "chromadb",
  "gemini-api",
  "openai-api",
  "groq-api",
  "pytorch",
  "captum",
  "scikit-learn",
  "pandas",
  "fastapi",
  "nextjs",
  "react",
  "prisma",
  "aws",
  "sqlite",
  "dynamodb",
  "oracle-sql",
  "oracle-ebs-r12",
  "oracle-argus",
  "pytest",
];

export function SkillGraph() {
  const router = useRouter();
  const { activeSkillId, toggleSkill } = useHighlight();

  const graphSkills = skills.filter((s) => GRAPH_SKILLS.includes(s.id));
  const targets = [
    ...projects.map((p) => ({
      kind: "project" as const,
      id: p.slug,
      label: p.title,
      sub: "Project",
    })),
    ...roles.map((r) => ({
      kind: "role" as const,
      id: r.id,
      label: `${r.title} (${r.company})`,
      sub: r.period,
    })),
  ];

  const svgWidth = 920;
  const svgHeight = Math.max(660, graphSkills.length * 24 + 40);
  const leftX = 240;
  const rightX = 660;

  const skillCoords = new Map<string, { x: number; y: number }>();
  graphSkills.forEach((sk, idx) => {
    const y =
      32 + (idx / Math.max(1, graphSkills.length - 1)) * (svgHeight - 64);
    skillCoords.set(sk.id, { x: leftX, y });
  });

  const targetCoords = new Map<string, { x: number; y: number }>();
  targets.forEach((t, idx) => {
    const y = 56 + (idx / Math.max(1, targets.length - 1)) * (svgHeight - 112);
    targetCoords.set(`${t.kind}:${t.id}`, { x: rightX, y });
  });

  return (
    <div className="rounded-3xl border border-line bg-surface p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            Interactive Evidence Graph (SVG)
          </p>
          <h3 className="mt-1 font-display text-xl font-bold text-text">
            Skill ↔ Project &amp; Role Verification Network
          </h3>
        </div>
        <p className="font-mono text-xs text-muted">
          Click or press Enter on any skill node to isolate its connections
        </p>
      </div>

      <div className="mt-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          role="group"
          aria-label="Interactive bipartite graph connecting skills on the left to verified projects and roles on the right"
          className="min-w-[680px] w-full h-auto select-none"
        >
          {/* Connection bezier curves */}
          <g fill="none">
            {graphSkills.flatMap((sk) => {
              const from = skillCoords.get(sk.id);
              if (!from) return [];
              const isSkillActive = activeSkillId === sk.id;
              const isAnyActive = Boolean(activeSkillId);

              return sk.evidence.map((ev, idx) => {
                const to = targetCoords.get(`${ev.kind}:${ev.id}`);
                if (!to) return null;
                const d = `M ${from.x + 8} ${from.y} C ${(from.x + to.x) / 2} ${
                  from.y
                }, ${(from.x + to.x) / 2} ${to.y}, ${to.x - 10} ${to.y}`;
                return (
                  <path
                    key={`${sk.id}-${ev.kind}-${ev.id}-${idx}`}
                    d={d}
                    stroke={
                      isSkillActive ? "var(--accent)" : "var(--line-strong)"
                    }
                    strokeWidth={isSkillActive ? 2.2 : 1}
                    opacity={
                      !isAnyActive ? 0.45 : isSkillActive ? 0.95 : 0.08
                    }
                  />
                );
              });
            })}
          </g>

          {/* Left column: Skill nodes */}
          {graphSkills.map((sk) => {
            const pos = skillCoords.get(sk.id)!;
            const isSelected = activeSkillId === sk.id;
            return (
              <g
                key={sk.id}
                role="button"
                tabIndex={0}
                aria-label={`${sk.name} (${sk.evidence.length} connections)`}
                aria-pressed={isSelected}
                onClick={() => toggleSkill(sk.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleSkill(sk.id);
                  }
                }}
                className="cursor-pointer focus:outline-none"
              >
                <text
                  x={pos.x - 12}
                  y={pos.y + 4}
                  textAnchor="end"
                  fill={isSelected ? "var(--accent)" : "var(--text)"}
                  fontSize="12"
                  fontFamily="var(--font-mono)"
                  fontWeight={isSelected ? "700" : "400"}
                >
                  {sk.name}
                </text>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isSelected ? 6 : 4}
                  fill={isSelected ? "var(--accent)" : "var(--surface)"}
                  stroke="var(--accent)"
                  strokeWidth="1.8"
                />
              </g>
            );
          })}

          {/* Right column: Project & Role target nodes */}
          {targets.map((t) => {
            const key = `${t.kind}:${t.id}`;
            const pos = targetCoords.get(key)!;
            const isConnected = activeSkillId
              ? skills
                  .find((s) => s.id === activeSkillId)
                  ?.evidence.some(
                    (ev) => ev.kind === t.kind && ev.id === t.id
                  ) ?? false
              : false;

            return (
              <g
                key={key}
                role="link"
                tabIndex={0}
                aria-label={`${t.label} (${t.sub})`}
                onClick={() => {
                  if (t.kind === "project") {
                    router.push(`/projects/${t.id}`);
                  } else {
                    router.push("/#experience");
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (t.kind === "project") {
                      router.push(`/projects/${t.id}`);
                    } else {
                      router.push("/#experience");
                    }
                  }
                }}
                className="cursor-pointer"
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isConnected ? 7 : 5}
                  fill={
                    isConnected
                      ? "var(--accent)"
                      : t.kind === "project"
                      ? "var(--text)"
                      : "var(--surface)"
                  }
                  stroke="var(--accent)"
                  strokeWidth="1.8"
                />
                <text
                  x={pos.x + 14}
                  y={pos.y - 2}
                  textAnchor="start"
                  fill={isConnected ? "var(--accent)" : "var(--text)"}
                  fontSize="12.5"
                  fontFamily="var(--font-sans)"
                  fontWeight="600"
                >
                  {t.label}
                </text>
                <text
                  x={pos.x + 14}
                  y={pos.y + 13}
                  textAnchor="start"
                  fill="var(--muted)"
                  fontSize="10.5"
                  fontFamily="var(--font-mono)"
                >
                  {t.sub}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
