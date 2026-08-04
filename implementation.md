# JBOSS Premium Engineering Portfolio - Implementation Plan

## Overview
A single-page portfolio application that uses GSAP, Framer Motion, Lenis, and Three.js as core technologies to showcase 5 featured projects. The portfolio itself must be the strongest project — communicating premium digital product craftsmanship, engineering excellence, and user-centered thinking.

## Resolved Decisions

| Decision | Resolution |
|----------|------------|
| Stack | React 19 + Vite + TypeScript + Tailwind CSS v4 |
| Routing | SPA with hash-scroll for sections (`/#work`, `/#about`); individual project case studies at `/projects/:slug` |
| Three.js | Lightweight ambient hero scene, disabled on mobile, respects `prefers-reduced-motion` |
| Motion Libraries | Framer Motion (page + component transitions), GSAP (complex timelines), Lenis (smooth scroll) |
| Project Showcase | Curated showcase — screenshots, descriptions, external Live Demo + GitHub links |
| Case Studies | Authored as Markdown content files within the portfolio repo |

## Implementation Tasks Status

### Phase 1: Foundation & Core Architecture
- [x] Initialize project structure with Vite
- [x] Configure Tailwind CSS v4
- [x] Set up React Router with hash-based scrolling
- [ ] Create reusable layout shell (Header.tsx, Footer.tsx, Container.tsx, SmoothScroller.tsx)

### Phase 2: Three.js Hero Scene
- [ ] Build lightweight `HeroCanvas.tsx` with performance guardrails

### Phase 3: Motion System
- [ ] Framer Motion variants library (`motion-variants.ts`)
- [ ] GSAP timeline presets (`gsap-presets.ts`)
- [ ] Custom motion components (`AnimatedSection.tsx`, `StaggerContainer.tsx`, `ParallaxElement.tsx`, `RevealText.tsx`)

### Phase 4: Section Components
- [ ] `Hero` section with canvas background and stats
- [ ] `About` section with professional narrative and tech stack
- [ ] `Skills` section with animated skill bars
- [ ] `Work` section with 5 project cards and filtering
- [ ] `Contact` section with static contact form

### Phase 5: Case Study Pages
- [ ] Content system (`content/data.ts`) with project interfaces
- [ ] Markdown processing for case study content
- [ ] `Project.tsx` page for individual project case studies

### Phase 6: Polish & Performance
- [ ] Image optimization (WebP, lazy loading)
- [ ] Code splitting (HeroCanvas lazy-loading, dynamic imports)
- [ ] Performance hardening (bundle size, console removal)
- [ ] Validation with lint, typecheck, and dev server

## Design Constraints

| Attribute | Requirement |
|-----------|------------|
| Aesthetic | Premium, minimal, editorial, engineering-driven |
| Tone | Professional — no AI/cyberpunk/neon/glassmorphism |
| Typography | Single geometric sans-serif (e.g., Inter/Geist/Satoshi) |
| Color | Neutral base + single accent (blue/violet/indigo) |
| Spacing | 4px baseline grid via Tailwind spacing config |
| Motion | Intentional, sub-100ms micro-interactions; 300-600ms transitions |

## Next Steps

1. Install dependencies: `npm install framer-motion lucide-react lenis three @react-three/fiber @react-three/drei @headlessui/react`
2. Configure Tailwind CSS v4
3. Set up React Router with hash-based scrolling
4. Begin implementing layout shell components

## Current Status
- Project structure created: /home/jboss/Desktop/Portfolio
- Legacy files moved to _legacy/
- Images preserved in img/
- Vite React TypeScript project scaffolded and ready for implementation

## Technical Requirements
- HeroCanvas: Single rotating torus/icosahedron, mouse-based subtle rotation (±5°), disabled on mobile, respects reduced-motion
- GSAP: Scroll-triggered animations for skills bars, project grid entrance
- Lenis: Smooth scroll with hash navigation
- Framer Motion: Staggered reveals and page transitions
- Bundle size: ≤200KB initial JS with Three.js lazy-loaded
- Lighthouse target: ≥95 score on mobile and desktop