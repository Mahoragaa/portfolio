"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  certifications,
  hero,
  projects,
  roles,
  site,
  skills,
} from "@/content/content";
import { useHighlight } from "@/components/highlight-context";

interface CommandItem {
  id: string;
  group: "Sections" | "Projects" | "Terminal Commands" | "Actions";
  title: string;
  subtitle: string;
  keywords: string;
  run: () => void;
}

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (next: boolean) => void;
}) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { showToast, selectSkill } = useHighlight();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [terminalOutput, setTerminalOutput] = useState<{
    cmd: string;
    lines: string[];
  } | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 20);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  const jumpTo = useCallback(
    (hash: string) => {
      onOpenChange(false);
      router.push(`/${hash}`);
    },
    [onOpenChange, router]
  );

  const commands = useMemo<CommandItem[]>(() => {
    const closeAnd = (fn: () => void) => () => {
      onOpenChange(false);
      fn();
    };

    const items: CommandItem[] = [
      {
        id: "cmd-whoami",
        group: "Terminal Commands",
        title: "whoami",
        subtitle: "Print engineer identity, role, and verified proof",
        keywords: "whoami about raghav infosys pfizer",
        run: () =>
          setTerminalOutput({
            cmd: "whoami",
            lines: [
              `${site.name} — ${hero.eyebrow}`,
              `Current: ${hero.proof.role} (${hero.proof.context})`,
              `Proof: ${hero.proof.metric} — ${hero.proof.detail}`,
              `Education: B.Tech CSE, SRM University AP (CGPA 7.32)`,
            ],
          }),
      },
      {
        id: "cmd-skills",
        group: "Terminal Commands",
        title: "skills --summary",
        subtitle: "List skill categories and verified evidence counts",
        keywords: "skills stack languages ai cloud backend",
        run: () =>
          setTerminalOutput({
            cmd: "skills --summary",
            lines: [
              `Total verified skills: ${skills.length}`,
              `Languages: Python, TypeScript, JavaScript, Java, PL/SQL, SQL, C/C++`,
              `Gen AI & ML: LangGraph, LangChain, RAG, ChromaDB, Gemini, OpenAI, Groq, PyTorch, Captum, Scikit-learn`,
              `Cloud & Backend: AWS (Lambda, API Gateway, DynamoDB, S3, SAM), Next.js, FastAPI, Prisma, Oracle EBS R12, Oracle Argus`,
            ],
          }),
      },
      {
        id: "cmd-projects",
        group: "Terminal Commands",
        title: "projects --list",
        subtitle: "Print the 4 featured repositories and stacks",
        keywords: "projects repos github complexity applytrail arxiv healthlens",
        run: () =>
          setTerminalOutput({
            cmd: "projects --list",
            lines: projects.map(
              (p, idx) =>
                `0${idx + 1}. ${p.title} (${p.fallbackLanguage}) — ${p.pitch}`
            ),
          }),
      },
      {
        id: "cmd-experience",
        group: "Terminal Commands",
        title: "experience --timeline",
        subtitle: "Print working experience roles and dates",
        keywords: "experience work infosys netsmartz apssdc",
        run: () =>
          setTerminalOutput({
            cmd: "experience --timeline",
            lines: roles.map(
              (r) => `${r.period} · ${r.title} @ ${r.company}`
            ),
          }),
      },
      {
        id: "cmd-certs",
        group: "Terminal Commands",
        title: "certs --verify",
        subtitle: "List Infosys & Oracle University certifications and IDs",
        keywords: "certifications oracle oci argus ebs genai",
        run: () =>
          setTerminalOutput({
            cmd: "certs --verify",
            lines: certifications.map(
              (c) =>
                `${c.date} · ${c.name} (${c.issuer})${
                  c.credentialId ? ` [ID: ${c.credentialId}]` : ""
                }`
            ),
          }),
      },
      {
        id: "cmd-help",
        group: "Terminal Commands",
        title: "help",
        subtitle: "Show available palette commands and keyboard shortcuts",
        keywords: "help commands terminal",
        run: () =>
          setTerminalOutput({
            cmd: "help",
            lines: [
              "Type `whoami`, `skills`, `projects`, `experience`, `certs`, `contact`, or `theme`.",
              "Use ↑ / ↓ arrows to navigate, Enter to execute, Esc to close.",
            ],
          }),
      },

      {
        id: "act-copy-email",
        group: "Actions",
        title: `Copy email (${site.email})`,
        subtitle: "Copy address to clipboard",
        keywords: "email contact copy mail",
        run: closeAnd(async () => {
          try {
            await navigator.clipboard.writeText(site.email);
            showToast(`Copied ${site.email}`);
          } catch {
            showToast(site.email);
          }
        }),
      },
      {
        id: "act-resume",
        group: "Actions",
        title: "Download Web-Safe Résumé (PDF)",
        subtitle: "Phone & WhatsApp redacted",
        keywords: "resume cv pdf download",
        run: closeAnd(() => {
          const a = document.createElement("a");
          a.href = site.resume;
          a.download = "Raghav_Arora_Resume.pdf";
          a.click();
          showToast("Downloading Raghav_Arora_Resume.pdf");
        }),
      },
      {
        id: "act-theme",
        group: "Actions",
        title: `Toggle theme (current: ${resolvedTheme ?? "dark"})`,
        subtitle: "Switch between Signal Lime dark and warm paper light mode",
        keywords: "theme dark light mode toggle",
        run: closeAnd(() => {
          const next = resolvedTheme === "dark" ? "light" : "dark";
          setTheme(next);
          showToast(`Switched to ${next} theme`);
        }),
      },
      {
        id: "act-clear-skill",
        group: "Actions",
        title: "Clear active skill highlight",
        subtitle: "Reset project and role evidence filters",
        keywords: "clear reset filter skill highlight",
        run: closeAnd(() => {
          selectSkill(null);
          showToast("Cleared skill highlight");
        }),
      },

      ...projects.map((p): CommandItem => ({
        id: `proj-${p.slug}`,
        group: "Projects",
        title: `Open Case Study: ${p.title}`,
        subtitle: p.subtitle,
        keywords: `project case study ${p.title} ${p.stack.join(" ")}`,
        run: closeAnd(() => router.push(`/projects/${p.slug}`)),
      })),

      {
        id: "sec-top",
        group: "Sections",
        title: "Jump to Hero / Overview",
        subtitle: "#top",
        keywords: "hero top home overview",
        run: () => jumpTo("#top"),
      },
      {
        id: "sec-projects",
        group: "Sections",
        title: "Jump to Projects",
        subtitle: "#projects",
        keywords: "projects work case studies",
        run: () => jumpTo("#projects"),
      },
      {
        id: "sec-experience",
        group: "Sections",
        title: "Jump to Working Experience",
        subtitle: "#experience",
        keywords: "experience timeline jobs infosys",
        run: () => jumpTo("#experience"),
      },
      {
        id: "sec-skills",
        group: "Sections",
        title: "Jump to Skills Explorer & Graph",
        subtitle: "#skills",
        keywords: "skills explorer evidence graph",
        run: () => jumpTo("#skills"),
      },
      {
        id: "sec-education",
        group: "Sections",
        title: "Jump to Education & Certifications",
        subtitle: "#education",
        keywords: "education certifications srm oracle",
        run: () => jumpTo("#education"),
      },
      {
        id: "sec-contact",
        group: "Sections",
        title: "Jump to Contact Form",
        subtitle: "#contact",
        keywords: "contact message form email",
        run: () => jumpTo("#contact"),
      },
    ];

    return items;
  }, [
    jumpTo,
    onOpenChange,
    resolvedTheme,
    router,
    selectSkill,
    setTheme,
    showToast,
  ]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.keywords.toLowerCase().includes(q)
    );
  }, [commands, query]);

  const safeActiveIndex =
    filtered.length === 0 ? 0 : Math.min(activeIndex, filtered.length - 1);

  if (!open) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        filtered.length === 0 ? 0 : (prev + 1) % filtered.length
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        filtered.length === 0
          ? 0
          : (prev - 1 + filtered.length) % filtered.length
      );
    } else if (e.key === "Enter" && filtered[safeActiveIndex]) {
      e.preventDefault();
      filtered[safeActiveIndex].run();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette and terminal"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-16 backdrop-blur-sm sm:pt-24"
      onClick={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false);
      }}
    >
      <div
        onKeyDown={handleKeyDown}
        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-line-strong bg-elevated shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3.5 sm:px-5">
          <span className="font-mono text-sm font-bold text-accent">&gt;_</span>
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmd-listbox"
            aria-activedescendant={
              filtered[safeActiveIndex]
                ? `cmd-opt-${filtered[safeActiveIndex].id}`
                : undefined
            }
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="Type a command (whoami, skills, projects, theme) or jump to a section..."
            className="w-full bg-transparent font-mono text-xs text-text placeholder:text-muted focus:outline-none sm:text-sm"
          />
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-lg border border-line bg-surface px-2 py-1 font-mono text-[11px] text-muted hover:text-text"
          >
            Esc
          </button>
        </div>

        {terminalOutput && (
          <div className="border-b border-accent-border bg-bg/90 px-5 py-4 font-mono text-xs">
            <div className="flex items-center justify-between text-accent">
              <span>$ {terminalOutput.cmd}</span>
              <button
                type="button"
                onClick={() => setTerminalOutput(null)}
                className="text-[11px] text-muted hover:text-text"
              >
                clear ×
              </button>
            </div>
            <ul className="mt-2 space-y-1 text-text">
              {terminalOutput.lines.map((line, i) => (
                <li key={i} className="leading-relaxed">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        )}

        <ul
          id="cmd-listbox"
          role="listbox"
          className="max-h-80 overflow-y-auto p-2"
        >
          {filtered.length === 0 ? (
            <li className="px-4 py-8 text-center font-mono text-xs text-muted">
              No matching commands for “{query}”. Try <code>whoami</code>,{" "}
              <code>skills</code>, or <code>projects</code>.
            </li>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === safeActiveIndex;
              return (
                <li
                  key={item.id}
                  id={`cmd-opt-${item.id}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => item.run()}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5 transition-colors ${
                    isSelected
                      ? "bg-accent text-accent-ink"
                      : "text-text hover:bg-surface"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="truncate font-mono text-xs font-semibold">
                      {item.title}
                    </p>
                    <p
                      className={`truncate text-[11px] ${
                        isSelected ? "text-accent-ink/80" : "text-muted"
                      }`}
                    >
                      {item.subtitle}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] ${
                      isSelected
                        ? "border-accent-ink/30 bg-accent-ink/10 text-accent-ink"
                        : "border-line bg-surface text-muted"
                    }`}
                  >
                    {item.group}
                  </span>
                </li>
              );
            })
          )}
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line bg-surface/70 px-4 py-2.5 font-mono text-[11px] text-muted">
          <span>↑↓ navigate · ↵ run · Esc close</span>
          <span>Terminal commands: whoami · skills · projects · certs</span>
        </div>
      </div>
    </div>
  );
}
