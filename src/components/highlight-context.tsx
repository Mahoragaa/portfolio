"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { skills, type Skill } from "@/content/content";

interface HighlightState {
  activeSkillId: string | null;
  activeSkill: Skill | null;
  highlightedProjects: Set<string>;
  highlightedRoles: Set<string>;
  selectSkill: (skillId: string | null) => void;
  toggleSkill: (skillId: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const HighlightContext = createContext<HighlightState | null>(null);

export function HighlightProvider({ children }: { children: ReactNode }) {
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    const timer = window.setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
    return () => window.clearTimeout(timer);
  }, []);

  const selectSkill = useCallback((skillId: string | null) => {
    setActiveSkillId(skillId);
  }, []);

  const toggleSkill = useCallback((skillId: string) => {
    setActiveSkillId((prev) => (prev === skillId ? null : skillId));
  }, []);

  const activeSkill = useMemo(
    () => (activeSkillId ? skills.find((s) => s.id === activeSkillId) ?? null : null),
    [activeSkillId]
  );

  const { highlightedProjects, highlightedRoles } = useMemo(() => {
    const projSet = new Set<string>();
    const roleSet = new Set<string>();
    if (activeSkill) {
      for (const ev of activeSkill.evidence) {
        if (ev.kind === "project") projSet.add(ev.id);
        if (ev.kind === "role") roleSet.add(ev.id);
      }
    }
    return { highlightedProjects: projSet, highlightedRoles: roleSet };
  }, [activeSkill]);

  const value = useMemo<HighlightState>(
    () => ({
      activeSkillId,
      activeSkill,
      highlightedProjects,
      highlightedRoles,
      selectSkill,
      toggleSkill,
      toastMessage,
      showToast,
    }),
    [
      activeSkillId,
      activeSkill,
      highlightedProjects,
      highlightedRoles,
      selectSkill,
      toggleSkill,
      toastMessage,
      showToast,
    ]
  );

  return (
    <HighlightContext.Provider value={value}>
      {children}
      {/* Accessible live region toast */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2"
      >
        {toastMessage && (
          <div className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-accent-border bg-elevated px-4 py-2 font-mono text-xs text-text shadow-lg">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </HighlightContext.Provider>
  );
}

export function useHighlight(): HighlightState {
  const ctx = useContext(HighlightContext);
  if (!ctx) {
    throw new Error("useHighlight must be used inside HighlightProvider");
  }
  return ctx;
}
