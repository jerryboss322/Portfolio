# JBOSS.DEV

A personal portfolio for Jerry Adewole — software engineer in Ogbomoso, Nigeria.

Plain on purpose: dark ground, real screenshots, and layout that does the work.
No WebGL, no 3D text, no scroll hijacking, and no per-frame JavaScript.

## Stack

- **React 19** + **TypeScript** + **Vite 8** (rolldown)
- **Tailwind CSS v4** (CSS-first config via `@theme`, no config file)
- **Framer Motion** — entrance fades only
- **sharp** — image pipeline

## Layout

One scrolling page, seven sections:

| Section | Ground | What it is |
|---------|--------|------------|
| Hero | ground | Who he is, availability, what he works with — skills run as a marquee |
| Work | band | Five projects, each a card with a cropped screenshot |
| About | ground | Photo, what he cares about, a short timeline |
| What I do | ground | Six capabilities |
| Process | band | Five stages |
| Kind words | ground | Two quotes |
| Get in touch | band | Email, socials, contact form |

## Layout system

Three components own the page's structure so it cannot drift between files.

**`Section`** owns the id, the ground and the vertical rhythm. `tone="band"`
selects the recessed plane that separates groups of sections; the alternation
above is deliberate rather than mechanical, so About and What I do share a
ground as one thought and Work and Process stand apart as their own.

**`SectionHead`** is the heading block every section opens with — one component
rather than the same five lines repeated eight times, so the title-to-lede gap
and the lede measure are identical everywhere.

**`.shell`** is the page container, defined once in the base layer of
`tailwind.css`. It was previously retyped in every section and had already
drifted to two different widths, which is how sections end up not lining up with
each other.

### Plates and rules

Two surface treatments, and the distinction is the point:

- **Plates** — a solid fill and a border — carry *things*: project cards,
  testimonials, the contact form.
- **Rules** — a hairline and nothing else — carry *arguments*: capabilities,
  the process strip, the timeline.

Seven identical box grids is what makes a one-page portfolio feel generic. The
contrast between the two treatments is what gives the page a hierarchy, so a
section that makes a claim deliberately does not get a card.

## Content

All copy lives in `src/content/data.ts` as plain typed objects. Page components
read from it and hold no prose of their own apart from section titles.

`src/content/images.ts` is **generated** by `scripts/build-images.mjs` — do not
edit it by hand. The script reads the originals in `assets/`, writes responsive
WebP derivatives and a base64 blur-up placeholder into `public/img/`, and
regenerates the manifest. It runs automatically on `npm run build`.

`assets/raw/` holds unused originals kept for reference. The script never reads
it, and it can be deleted without breaking the build.

## Theming

Colour lives entirely in `src/styles/tokens.css`. Every utility compiles to
`var(--…)`, so flipping `data-theme` on `<html>` re-themes the whole site with
no rebuild and no re-render. `public/theme-init.js` is applied inline in `<head>`
before first paint, so there is no flash of the wrong palette.

Only tokens something actually uses are defined. Adding one means adding it to
the `@theme inline` bridge in `tailwind.css` as well, or Tailwind will not
generate a utility for it.

The palette is deliberately narrow: one decorative accent (`--accent`) plus two
semantic colours for the contact form (`--success`, `--danger`). The ground is
pure black and the surfaces are warm-neutral greys.

Every text token is contrast-checked against its own ground and clears WCAG AA.
This is the one place the greys are not chosen purely by eye: the values that
produce the dim-grey-on-black look sit at 4.27:1 and 2.95:1 and were rejected,
so `--text-body` and `--text-muted` are pitched one step lighter than the look
strictly implies. `--text-faint` is below that bar by design and is only ever
used for placeholders and decorative rules.

## Motion

Two primitives in `src/components/ui/`, and nothing else animates:

- **`ScrollReveal`** — the section entrance. Takes a `direction`, `delay`,
  `distance` and `duration`. Sibling blocks inside one section stagger on 0.1s
  steps so the section assembles in reading order rather than arriving at once.
  Fires on `once`, because a section tall enough to scroll back through would
  otherwise replay the entrance under the reader mid-sentence. `as="li"` renders
  it as a list item, so a reveal inside an `<ol>` still emits `<li>`.
- **`Marquee`** — an infinite horizontal track for the skills strip. The track is
  rendered twice and translated by exactly `-50%`, which is the only distance
  that hides the seam, since each copy is precisely half the track.

Both respect `prefers-reduced-motion`. `ScrollReveal` drops the initial offset
and the `whileInView` target entirely, so no transform is ever applied rather
than animating to zero; `Marquee` cancels the keyframes, leaving the track
parked at its start where it still reads as a complete row.

## Type

The display scale is declared once in `@theme inline`, not repeated per page:

| Token | Range | Used for |
|-------|-------|----------|
| `text-display-1` | 36 → 64px | Hero headline |
| `text-display-2` | 28 → 44px | Section headings |
| `text-display-3` | 24 → 36px | Project titles |

All three are `clamp()`, so the scale is fluid with no per-breakpoint pairs.
Letter-spacing is set against the `h1`/`h2`/`h3` elements in `@layer base` in
`tailwind.css`, so a heading only needs its size utility.

## Fonts

Self-hosted, in `public/fonts/` — two variable woff2 files, latin subset only,
with `@font-face` declarations at the top of `tailwind.css` and preloads in
`index.html`. There is no request to a third-party font host.

Adding a weight means widening the `font-weight` range on the existing
`@font-face`, not adding a file: the variable axis already covers it.

## Images

`Media` paints an inline base64 LQIP as the element background and always sets
`width`/`height`, so the box is never empty and the layout does not shift when
the image lands. Above-the-fold images pass `priority` to skip lazy loading.

## Accessibility

Semantic markup throughout, one `<h1>`, a skip link, visible focus rings that
survive both themes, and a disclosure built from native `<details>` so it works
from the keyboard with no JavaScript. Every entrance animation is skipped when
`prefers-reduced-motion` is set.

## Scripts

```bash
npm run dev       # dev server
npm run build     # typecheck, generate images, build
npm run preview   # serve the build
npm run lint      # oxlint
npm test          # vitest
npm run images    # regenerate responsive images and the manifest
```
