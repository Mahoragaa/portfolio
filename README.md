# Raghav Arora — Portfolio

Personal engineering portfolio for **Raghav Arora** (System Engineer at Infosys · B.Tech CSE, SRM University AP).

## Stack

- **Framework:** Next.js 16.4.5 (App Router, Cache Components & Partial Prefetching enabled)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 + CSS custom properties (Dark / Light themes via `next-themes`)
- **Typography:** Self-hosted variable fonts (`Bricolage Grotesque`, `Geist`, `Geist Mono`) via `next/font/local`
- **Animation:** Motion (`motion/react`) with full `prefers-reduced-motion` support
- **Single Source of Truth:** [`src/content/content.ts`](src/content/content.ts)

## Sections (Milestone 1)

1. **Hero (`src/components/hero.tsx`)** — Split-letter name heading with explicit `aria-label`, static primary headline, verified proof bar (`2h → 15m`, 87.5% PL/SQL query time reduction on Infosys/Pfizer project), focus area tags, and web-safe résumé PDF download (phone & WhatsApp redacted).
2. **Projects & Case Studies (`src/components/projects-section.tsx` + `src/app/projects/[slug]/page.tsx`)** — Four featured projects (`code-complexity-analyzer`, `applytrail`, `agentic-research-assistant`, `healthlens`) with code-derived system topology diagrams and dedicated `/projects/[slug]` case-study routes.
3. **Working Experience (`src/components/experience-section.tsx`)** — Expandable vertical timeline for Infosys (System Engineer & Trainee), NetSmartz, and APSSDC with verified metrics.
4. **Skills Explorer (`src/components/skills-section.tsx`)** — Category filter + interactive **Evidence Inspector** (works on tap, click, keyboard focus, and hover) that cross-highlights matching project cards and experience roles across the page.
5. **Education & Certifications (`src/components/education-section.tsx`)** — SRM University AP, DPS Indirapuram, and 6 certifications (Infosys Gen AI, 3× Oracle OCI/AI with copyable credential IDs, Oracle EBS R12, Oracle Argus).
6. **Contact (`src/components/contact-section.tsx`)** — Client-validated contact form with honeypot spam protection (Web3Forms + graceful `mailto:` fallback) and one-click email copy.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint    # ESLint (0 errors, 0 warnings)
npm run build   # Production build
```
