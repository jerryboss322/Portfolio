# Implementation Plan: JBOSS Premium Engineering Portfolio — Refinement

## Status: Implementation Complete — Awaiting Build & Validation

## Source of Truth
- Original plan: `/home/jboss/.local/share/kilo/plans/1785845974436-motion-portfolio-plan.md`
- Progress report: `.kilo/plans/1785858767675-implementation-progress-report.md`

---

## Current State Summary

TypeScript compiles cleanly (`tsc --noEmit` → 0 errors). `node_modules/` exists. The codebase has 43 source files across `src/`. However, the plan is not yet implementation-ready due to several issues that must be resolved before a clean build and runtime verification.

### Confirmed issues found during code review:

| Issue | File(s) | Severity |
|-------|---------|----------|
| Missing `public/` directory; `favicon.ico` referenced in `index.html` | `index.html` | High — breaks build |
| No `.gitignore` file | project root | High |
| Duplicate `useMediaQuery` definition in two files | `src/hooks/useReducedMotion.ts` (lines 37-55) | Medium |
| `useGSAPSection.ts` uses `React.DependencyList` without importing React | `src/hooks/useGSAPSection.ts` (line 17) | Medium — may compile but risky |
| `@headlessui/react` installed but never imported | `package.json` | Low — dead dependency |
| Tailwind CSS v4 config uses nested `.light` color keys that are never applied via `[data-theme="light"]` | `tailwind.config.ts`, `src/styles/global.css` | High — theme switching broken |
| `ProjectsSection` links to `/projects/all` which has no matching slug | `src/pages/About.tsx` (line 153) | Medium — 404 on click |
| `App.tsx` imports `Footer` outside `PageTransition` layout but inside it — `Footer` rendered outside Layout | `src/App.tsx` | Low — works but unusual |

---

## Ordered Task List (Implementation Steps)

### Step 1: Create `.gitignore`
```plaintext
node_modules/
dist/
*.tsbuildinfo
.env*
.idea/
*.log
```

### Step 2: Create `public/` directory and favicon
- Create `public/favicon.ico` (or SVG)
- Verify `index.html` references the correct path (`/favicon.ico` for static assets in Vite's `public/`)

### Step 3: Fix theme system with CSS custom properties
**File:** `src/styles/global.css`

Add CSS variable definitions:
```css
:root[data-theme="dark"] {
  --bg: #02040a;
  --surface: #070c1e;
  --surface-strong: #0c122c;
  --border: #162447;
  --text: #f0f4ff;
  --text-muted: #7c8ba1;
  --accent: #0077ff;
  --accent-strong: #00f0ff;
  --accent-soft: rgba(0, 119, 255, 0.15);
}

:root[data-theme="light"] {
  --bg: #f5f8fc;
  --surface: #ffffff;
  --surface-strong: #f0f2f7;
  --border: #d2e1f3;
  --text: #0e162b;
  --text-muted: #5d6a85;
  --accent: #0066ee;
  --accent-strong: #0044bb;
  --accent-soft: rgba(0, 102, 238, 0.12);
}
```

**File:** `src/styles/tailwind.css`

Update Tailwind config to reference CSS variables instead of hardcoded values:
```ts
// tailwind.config.ts
extend: {
  colors: {
    bg: 'rgb(var(--bg) / <alpha-value>)',
    surface: 'rgb(var(--surface) / <alpha-value>)',
    // ... etc
  }
}
```

Or simpler: use the CSS variables directly in `global.css` and remove the `light` variants from `tailwind.config.ts`. Keep the Tailwind color as the dark default.

### Step 4: Remove duplicate `useMediaQuery` from `useReducedMotion.ts`
- Delete lines 37-55 of `src/hooks/useReducedMotion.ts`
- Fix `src/hooks/index.ts` to not export `useMediaQuery as useMedia` — either keep the alias or remove it

### Step 5: Fix `useGSAPSection.ts` React import
- Add `import React from 'react'` to `src/hooks/useGSAPSection.ts` (or use a type import)
- Or change `React.DependencyList` to `import type { DependencyList } from 'react'` and use `DependencyList` directly

### Step 6: Fix `Header.tsx` routing links
- Change `to="/#about"` → `to="#about"`, etc. (inside `HashRouter`, leading `/` in hash routes is incorrect)
- The `Header`'s hashChange handler is redundant with `SmoothScroller`'s handler — consider removing or making both consistent

### Step 7: Fix `ProjectsSection` link to `/projects/all`
- Change `to="/projects/all"` to `to="#contact"` (or create a route for `/projects/all`) — simplest fix is point to `#work` or remove the link
- Alternatively: add a catch-all `<Route path="/projects/all" element={<Layout />} />` in `App.tsx`

### Step 8: Clean up unused dependency
- Remove `@headlessui/react` from `package.json` devDependencies (never imported)

### Step 9: Fix `Project.tsx` export naming
- Change `export { ProjectPage as Project }` to `export { ProjectPage }`
- Update `src/App.tsx` import: `import { ProjectPage } from './pages/Project'` and route `element={<ProjectPage />}`

### Step 10: Verify build
```bash
npx tsc --noEmit        # TypeScript check
npm run build           # Full Vite build
npx oxlint              # Lint check
npm run dev             # Dev server verification
```

---

## Validation Plan

| Step | Command | Expected Result | Status |
|------|---------|-----------------|--------|
| T1 | `npx tsc --noEmit` | 0 errors | ✅ Already passing (pre-fix) |
| T2 | `npx tsc --noEmit` after fixes | 0 errors | ⬜ Pending |
| T3 | `npm run build` | `dist/` generated with `index.html`, CSS, JS chunks | ⬜ Pending |
| T4 | `npx oxlint` | 0 errors, 0 warnings | ⬜ Pending |
| T5 | `npm run dev` (manual) | App loads at `http://localhost:5173` | ⬜ Pending |
| V1 | Dev server — Hero renders | Icosahedron canvas visible on desktop, hidden on mobile | ⬜ Pending |
| V2 | Dev server — Theme toggle | `data-theme="light"` toggles; CSS vars update | ⬜ Pending |
| V3 | Dev server — Navigation | Clicking "Work" scrolls to `#work` section | ⬜ Pending |
| V4 | Dev server — Project cards | Clicking a project navigates to `/projects/titan` (hash: `#/projects/titan`) | ⬜ Pending |
| V5 | Dev server — Project page | Correct project renders; "Back to Work" returns to home | ⬜ Pending |

---

## Architecture Decisions (Lock-in)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Router | `HashRouter` from `react-router-dom@7` | Static hosting compatibility |
| CSS framework | Tailwind CSS v4 with `@tailwindcss/vite` | Utility-first + design tokens |
| Animation entrances | Framer Motion `whileInView` + `useInView` from `react-intersection-observer` | Consistent staggered reveals |
| Scroll-driven animation | GSAP `ScrollTrigger` (via `gsap-presets.ts` + `useGSAPSection.ts`) | Library ready, not yet wired |
| 3D canvas | `@react-three/fiber` + `@react-three/drei`, lazy-loaded | Heavy bundle only loads on desktop |
| Theme | `data-theme="dark\|light"` on `<html>` + CSS custom properties | Persists via `localStorage` |
| Image assets | `img/` at project root (JPG/PNG) | Served as static via Vite |
| Data | `src/content/data.ts` with TypeScript interfaces | Single source of truth for projects/skills |
| Icons | `lucide-react` + inline SVGs (in `Typography.tsx`) | No external font dependencies |
| Lint | Oxlint | Fast, ESLint-compatible |
| Build | `tsc -b && vite build` | Type check then bundle |

---

## Out of Scope (Future Iteration)

- Wiring GSAP ScrollTrigger timelines into actual component DOM elements (library exists, deferred)
- Image optimization: convert `img/*.jpg` to WebP, add `srcset`/`sizes`
- Add Lighthouse CI or manual Lighthouse audit target (≥ 95 score)
- Add `axe-core` accessibility scanner
- Generate multi-size favicons (`favicon-16x16.png`, `apple-touch-icon.png`)
- Add sitemap.xml / robots.txt generation
- Add SEO meta tags per page (Open Graph)
- Production deployment configuration (Vercel adapter, etc.)

---

## Dependencies Summary

**Runtime:**
| Package | Version | Used In |
|---------|---------|---------|
| `react` | ^19.2.8 | All components |
| `react-dom` | ^19.2.8 | Entry point |
| `react-router-dom` | ^7.6.2 | `App.tsx` (routing) |
| `framer-motion` | ^12.43.0 | All motion components |
| `gsap` | ^3.15.0 | `lib/gsap-presets.ts`, `hooks/useGSAPSection.ts` (not wired to DOM yet) |
| `three` | ^0.185.1 | `components/canvas/HeroCanvas.tsx` |
| `lenis` | ^1.3.25 | `components/layout/SmoothScroller.tsx` |

**Dev / Build:**
| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | ^8.2.0 | Build tool |
| `@vitejs/plugin-react` | ^6.0.4 | React JSX transform |
| `@tailwindcss/vite` | ^4.3.3 | Tailwind integration |
| `tailwindcss` | ^4.3.3 | CSS framework |
| `typescript` | ~6.0.2 | Type checking |
| `oxlint` | ^1.75.0 | Linter |
| `@types/react` | ^19.2.18 | React types |
| `@types/react-dom` | ^19.2.4 | React DOM types |
| `lucide-react` | ^1.28.0 | Icons |
| `@react-three/fiber` | ^9.7.0 | React Three Fiber |
| `@react-three/drei` | ^10.7.7 | Three.js helpers |
| `react-intersection-observer` | ^11.0.0 | Viewport detection |

**Unused (recommend removal):**
| Package | Version | Reason |
|---------|---------|--------|
| `@headlessui/react` | ^2.2.10 | Never imported in any source file |
