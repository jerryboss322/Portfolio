# JBOSS

A premium personal product portfolio built on **Design System v2** — a motion-first definition of the AI feel: restraint, precision, and motion as narration.

## Stack

- **React 19** + **TypeScript** + **Vite 8** (rolldown)
- **Tailwind CSS v4** (CSS-first config via `@theme` tokens, no config file)
- **Framer Motion** — entrance/reveal choreography
- **GSAP ScrollTrigger** + **Lenis** — smooth scrolling, hero parallax
- **Three.js** — theme-aware hero canvas (lazy-loaded, desktop only)

## Design system

### Color — Signal (dark) / Ember (light)

| Token | Signal (dark) | Ember (light) |
|-------|---------------|---------------|
| `--bg` | `#02040A` | `#F5F8FC` |
| `--surface` | `#070C1E` | `#FFFFFF` |
| `--accent` | `#0077FF` (blue) | `#0066EE` (blue) |
| `--accent-strong` | `#00F0FF` (cyan) | `#0044BB` (deep blue) |

Both modes share the same neutral ramp logic (bg → surface → surface-strong → border). Toggle a `data-theme` attribute on `<html>` and let the cascade do the work — theme is bootstrapped inline in `index.html` before first paint (no FOUC).

### Background

A constellation starfield canvas (`src/components/canvas/Starfield.tsx`) sits behind all content — twinkling particles, responsive links, and reactive mouse rays. It renders a single static frame under `prefers-reduced-motion`.

### Typography

- **Headlines:** Space Grotesk — geometric, slightly technical, confident at large sizes
- **Body / UI:** Inter, 400–600
- **Meta (years, tags, stat units):** Inter, uppercase, letter-spacing 0.08–0.14em, `--text-muted`

### Motion language

| Behavior | Description |
|----------|-------------|
| **Arrive** | Section/element entrance. Opacity 0→1 + translateY 16px→0, staggered 60–80ms. Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out). |
| **Glide** | Lenis smooth-scroll synced to GSAP ScrollTrigger via `gsap.ticker`; hero background drifts 10% slower. |
| **Reveal** | Cinematic project transition. Card image expands via `transform: scale()`; text content staggers in 120ms after. |
| **Respond** | Micro-interactions. Magnetic hover (±4px max, reduced-motion safe), press state (scale 0.97), link underlines drawn from the accent. |
| **Hold** | What does not move. Static grid, fixed spacing scale, no idle/looping animations. |

## Run locally

```bash
npm install
npm run dev        # start dev server (http://localhost:5173)
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build
```

## Structure

```
index.html                     — app shell, font imports, theme bootstrap, SEO/OG meta
src/
  styles/global.css            — design tokens, base, glow, scrollbar, reduced-motion
  styles/tailwind.css          — Tailwind v4 @theme tokens + component classes
  App.tsx                      — theme state, ambient glow, routes
  lib/scroll.ts                — Lenis singleton, section scroll helpers
  lib/motion-variants.ts       — shared Framer Motion variants
  lib/three-config.ts          — theme-aware Three.js scene config
  components/
    layout/Header.tsx          — scrollspy, scroll progress, hide-on-scroll, mobile menu
    layout/SmoothScroller.tsx  — Lenis + GSAP ScrollTrigger sync, deep-link handling
    layout/PageTransition.tsx  — pathname-keyed transitions
    layout/Footer.tsx          — contact + social links
    ui/                        — Button, Badge, Typography, Magnetic, ScrollLink
    canvas/HeroCanvas.tsx      — lazy Three.js hero canvas
  pages/                       — Hero, About, Projects, Systems, Testimonials, Skills, Project (case study)
  content/data.ts              — all portfolio content (5 case studies)
public/                        — images (WebP), favicon, OG image, robots.txt, sitemap.xml
```

## Performance

- Vendor libraries split into cached chunks (`vendor-react`, `vendor-motion`, `vendor-gsap`)
- Three.js hero canvas lazy-loaded and desktop-only (reduced-motion aware)
- All project imagery served as WebP (~25KB each)
- HashRouter enables static hosting without server rewrites

## Case studies

Each project includes authored Challenge / Process / Solution sections, a metric strip, and a gallery. Content lives in `src/content/data.ts`.
