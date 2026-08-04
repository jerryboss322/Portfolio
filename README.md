# JBOSS

A premium personal product portfolio built on Design System v2 — a motion-first definition of the AI feel: restraint, precision, and motion as narration.

## Overview

This project is designed to feel like a polished product experience rather than a standard portfolio page. The design system is built around two things: a **dual-mode color system** (dark default, peach light mode) and a **motion language** (five named behaviors, not a particle canvas).

- **Restraint** — one accent, used in at most three places per viewport
- **Precision** — everything on a grid, everything timed
- **Motion as narration** — transitions that explain hierarchy instead of just looking nice

## Design system

### Color — Signal (dark) / Ember (light)

| Token | Signal (dark) | Ember (light) |
|-------|---------------|---------------|
| `--bg` | `#0A0A0F` | `#FFF8F2` |
| `--surface` | `#121218` | `#FFFFFF` |
| `--accent` | `#6D5EF0` (indigo-violet) | `#F2683F` (coral-peach) |

Both modes share the same neutral ramp logic (bg → surface → surface-strong → border). Toggle a `data-theme` attribute on `<html>` and let the cascade do the work — no mode-specific CSS beyond variable swaps.

### Typography

- **Headlines:** Space Grotesk — geometric, slightly technical, confident at large sizes
- **Body / UI:** Inter, 400–600
- **Meta (years, tags, stat units):** Inter, uppercase, letter-spacing 0.08–0.14em, `--text-muted`

### Motion language

| Behavior | Description |
|----------|-------------|
| **Arrive** | Section/element entrance. Opacity 0→1 + translateY 16px→0, staggered 60–80ms. Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out). |
| **Glide** | Scroll behavior. Native smooth-scroll + one parallax layer (hero background drifts 10% slower). |
| **Reveal** | Cinematic project transition. Card image expands via `transform: scale()` from its clicked position; text content staggers in 120ms after. |
| **Respond** | Micro-interactions. Magnetic hover (±4px max), press state (scale 0.97), link underlines that draw from the accent. |
| **Hold** | What does not move. Static grid, fixed spacing scale, no idle/looping animations. |

## Run locally

1. Serve the project with a static server:
   ```bash
   python3 -m http.server 8000
   ```
2. Visit: http://localhost:8000

## Structure

```
index.html              — app shell, topbar, font imports
css/styles.css          — design system v2 (tokens, components, motion keyframes)
data/content.js         — portfolio content (projects, systems, testimonials, skills)
js/
  app.js                — bootstrap: composes components, wires interactions
  core/store.js         — state management + theme persistence
  services/storage.js   — localStorage adapter
  utils/
    dom.js              — DOM helpers ($, $$, bindAll)
    motion.js           — motion language (magnetic hover, parallax, reveal origin)
  components/
    Hero.js             — hero section
    WorkGrid.js         — selected work + filter bar
    ProjectDetail.js    — cinematic Reveal overlay
    Systems.js          — motion behaviors showcase
    Testimonials.js     — social proof
    About.js            — approach + skills
    Contact.js          — contact section
    Toast.js            — toast notifications
```

## Architecture

Each component is a pure function that returns an HTML string. `app.js` composes them into the `#app` container and wires events via `data-action` attributes. State lives in `core/store.js` and persists to localStorage. The motion language is implemented in `utils/motion.js` — magnetic hover, scroll parallax, and the Reveal origin capture for the cinematic detail expansion.

No build step. Native ES modules served directly.