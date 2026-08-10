# JBOSS Portfolio — Combined Fix Spec (Content + Design)

Merges the approved content updates with the design/bug-fix spec into one
implementation-ready document. Content changes and design changes are
independent of each other — implement in any order, but the priority
order in Section 3 reflects what should actually happen first.

---

# PART A — CONTENT FIXES

Four copy changes needed. Everything else in the current build is already
correct — do not touch it.

## A1. Hero — shorten supporting copy

**Current (live):**
```
I'm a software engineer who works across the full lifecycle of a
product — frontend interfaces, backend systems, databases, and the
infrastructure that ties it together. I care less about how something
looks in isolation and more about whether it actually works: fast,
reliable, and simple for someone else to use.

I've shipped e-commerce platforms, sports-data products, and internal
tools across Go, Next.js, Laravel, and Kotlin — usually solo, always
end-to-end.
```

**Replace with:**
```
I work across the full stack — frontend, backend, databases, and the
infrastructure that ties it together. I care most about whether
something actually works: fast, reliable, and simple to use.
```

Note: the design spec (Section B) separately suggests trimming this
paragraph by ~20% for layout reasons. This content fix already cuts it
by more than that — implement this version and treat the design spec's
"trim 20%" note as satisfied, not as a second, separate cut on top of it.

Eyebrow, headline, CTAs, metadata line, and location line are already
correct — do not touch.

## A2. About — shorten body copy

**Current (live):** the original four-paragraph version.

**Replace with:**
```
I'm a software engineer who works across the stack — interfaces, backend
systems, APIs, and the infrastructure behind them. What interests me most
is taking a rough idea, breaking it into smaller systems, and turning it
into something people can actually use.

I care about the details that are easy to skip: response time, component
states, data flow, and whether the finished product genuinely makes
sense to the person using it.
```

Note: the design spec (Section F) suggests breaking About into three
subheaded paragraphs ("How I work / What I care about / How I build").
That structure works fine with either the long or short version of this
copy — if you want subheads, split the two paragraphs above roughly in
half rather than reinflating them back to four paragraphs. Don't let a
layout preference undo a copy decision that was made for a separate
reason (readability, not fitting a template).

Heading, closing pull-quote, and "What I Bring" column are already
correct — do not touch.

## A3. TasteTrail — add personal-project framing

**Current (live):**
```
03 / FOOD ORDERING APP

TasteTrail

An ordering experience with category-filtered menu browsing and a live
running cart — built to make choosing and confirming an order fast, with
no friction between menu and checkout.

REACT · NODE.JS · POSTGRESQL
```

**Replace with:**
```
03 / FOOD ORDERING APP (PERSONAL PROJECT)

TasteTrail

A smaller, self-directed build — a single-restaurant ordering flow with
category-filtered browsing and a live cart. Built to experiment with
fast add-to-cart interactions rather than as a full product.

REACT · NODE.JS · POSTGRESQL
```

Confirmed as a personal practice build, not client work. Tech stack is
unchanged — only the category label and description change.

## A4. Jbet — add personal-project framing

**Current (live):**
```
05 / SPORTS BETTING PLATFORM

Jbet

A football betting platform for the Nigerian market — live odds across
multiple leagues, a persistent bet-slip, and instant wallet funding
through local rails like Opay, Palmpay, and bank USSD.

REACT · TYPESCRIPT · TAILWIND CSS · REST API · VERCEL
```

**Replace with:**
```
05 / SPORTS BETTING PLATFORM (PERSONAL PROJECT)

Jbet

A personal project exploring a sports betting platform for the Nigerian
market — live odds across multiple leagues, a persistent bet-slip, and
wallet funding built against local payment rails like Opay, Palmpay, and
bank USSD.

REACT · TYPESCRIPT · TAILWIND CSS · REST API · VERCEL
```

Confirmed as a personal practice build, not client work. Tech stack is
unchanged — only the category label and first sentence change.

## A5. Confirmed correct — no action needed

- **Titan Commerce** — category, description, tech stack all correct.
- **Luxora** — category, description, tech stack all correct.
- **Sally Green Marketing** — category, description, tech stack all
  correct. Confirmed the copy doesn't repeat the client's own revenue/
  audit numbers — keep it that way in any future edits.
- **Selected Work intro line**, **What I Bring** (all 4 items), **Tech
  Stack section**, **Contact section** — all already correct.

## A6. Portrait — decision needed, not a copy fix

Hero/About image is currently an illustrated avatar in an off-camera
"thinking" pose. Two open questions, unrelated to the design spec below:
1. Is the illustration the permanent direction, or a placeholder?
2. If it stays, consider a version with direct eye contact — the current
   pose doesn't face the viewer.

The design spec (Section B, F) recommends removing or replacing this
illustration for a different reason (visual/tonal consistency with the
rest of the page) — see Part B, item B2 below. Both concerns point the
same direction, worth resolving together rather than twice.

---

# PART B — DESIGN / BUG FIXES

Reviewed against the screenshots. Confirmed real, prioritized by
severity. One factual correction included below (marked ⚠).

## B1. Critical bugs — fix first, before any visual polish

- **`[object Object]` render bug in Jbet's bet-slip.** This is an actual
  React bug (something rendering an object where a string/number is
  expected), not a design issue — it's currently visible on the live
  page and undermines trust immediately since it looks broken. Fix
  before anything else in this document.
- **Image overflow/clipping** on Luxora and TasteTrail project cards, and
  the Tech Stack row being cut off at the container edge. Add a
  consistent `max-w-[1200px] mx-auto px-6` wrapper (or equivalent) across
  all sections so nothing clips at 1280/1440/1024/768/375px widths.
- **Duplicate illustration** — same portrait image used twice (Hero and
  About). Reduce to one instance regardless of whether you keep the
  illustration or move to a photo (see A6 above).

## B2. Illustration vs. photo — connects to A6

Design spec recommends removing the cartoon illustration from the Hero
entirely, or replacing it with a single better asset — reasoning being
that a checkered-shirt cartoon reads as friendly/casual next to
luxury-commerce projects like Titan and Luxora, which reduces perceived
seniority. This is a fair design critique independent of the portrait
pose issue raised in A6. If you resolve the portrait decision from A6,
apply the same resolution here — don't end up with a mismatched "photo in
Hero, illustration in About" outcome.

## B3. Color tokens and contrast

⚠ **Correction to the original spec:** it claims `#8A8A8A` body text on
`#0A0A0A` background "fails WCAG AA." Checked the actual contrast ratio
— that combination is ~5.7:1, which passes AA (4.5:1 minimum), it just
misses AAA (7:1). The diagnosis in the original spec is inaccurate, even
though the proposed fix is still worth doing:

```
--bg: #0E0E10
--bg-elevated: #151518
--bg-soft: #1C1C20
--text-primary: #F1F1F2
--text-secondary: #B4B4B8   (≈9.3:1 on --bg — real readability upgrade)
--text-tertiary: #7A7A7E    (labels/meta only, never body text)
--accent: #4F8CFF
--accent-hover: #6EA2FF
--border: #232326
--success: #2ECC71
```

Apply these tokens because they're a genuine improvement, not because
the old combination was failing accessibility — it wasn't. Worth knowing
this distinction if it ever comes up with a client or reviewer.

## B4. Typography — confirm before changing

Spec lists **Inter / General Sans / Satoshi**. Your original design.md
established **Space Grotesk / Inter** as the pairing. This may be an
intentional override in the new spec, or it may just not have had that
context — confirm which before implementing, since swapping the type
pairing is a bigger visual change than anything else in this document
and worth being a deliberate choice rather than a default.

Scale (once font is confirmed):
```
Hero H1:       40px / 110% / -0.02em
Section H2:    28px / 120%
Project Title: 22px / 125%
Body:          16px / 170%
Label:         11px / Mono / Uppercase / 0.12em tracking / tertiary
```
Mono (JetBrains Mono) for labels, tech stack, and metadata only.

## B5. Spacing & grid

```
Max container: 1200px centered, 24px padding mobile / 48px desktop
Grid: 12 col desktop / 6 tablet / 4 mobile
Vertical rhythm: 120px between major sections, 48px between subsections
All images: overflow-hidden, radius 16px, 1px border (--border)
```

## B6. ProjectCard rebuild

Applies to Titan, Luxora, TasteTrail, Sally Green, Jbet.

```
Layout: alternating rows — [Text 40%] + [Media 60%], flip side per row
Text side: mono label → title (22px) → one-sentence outcome → tech
  stack (mono 11px, dot-separated, tertiary) → "View Case Study" link
  with arrow that animates 4px on hover
Media side: 16px radius, border, overflow-hidden, 16:10 aspect ratio,
  object-fit cover, subtle bottom gradient overlay, hover scale 1.02
  over 600ms ease
```

**Per-project image treatment:**
- **Titan:** dark storefront screenshot, not white/light version.
- **Luxora:** crop to the hero section (sofa + plant), not the full
  white page. Add a caption: "Still image transitions to interactive 3D
  on interaction."
- **TasteTrail:** use the dark "Premium Flavors" UI version already
  captured in an earlier screenshot — do not use a white/light crop.
- **Sally Green:** keep the dashboard mock but reduce height — show the
  top ~60% with the £98,627 figure visible (this is a screenshot of the
  client's real site, not a claim in your own copy — fine to show as-is,
  see A5).
- **Jbet:** wrap in browser chrome so the green betting UI doesn't clash
  visually with the rest of the dark page. Fix the `[object Object]`
  bug here specifically (see B1) before this ships. Correct call to keep
  it last in the list.

## B7. What I Bring — visual only, copy unchanged

```
2x2 grid, each card: --bg-elevated background, 28px padding, border
Number in accent color, mono
Title 16px primary / description 14px secondary
24px gap between cards
```
Copy is already correct (see A5) — this section is layout-only.

## B8. Tech Stack — visual only, copy unchanged

```
3 columns: Frontend / Backend / Database
Each item: 14px secondary, accent-colored bullet on hover
Section title 40px bold, mono label above it
48px padding top/bottom, top border
```

## B9. Contact section rebalance

```
2 columns: Left 35% (headline + value prop + links), Right 65% (form)
Left side, add: "Average reply time: <24h" and
  "Based in Lagos, working globally"
Form fields: --bg-elevated background, border, 44px height,
  accent focus ring, mono 10px labels
Button: full width mobile / auto desktop, with a loading state
Keep existing microcopy: "REPLIES GO STRAIGHT TO MY INBOX"
```

⚠ **Only add "Average reply time: <24h" if it's actually true.** This is
exactly the kind of small, easy-to-add metric that becomes a fabricated
claim if it's aspirational rather than real — same category of mistake
the original redesign was built around eliminating from the old site.

## B10. Motion

```
Page load: stagger fade-up (H1 0ms → paragraph 100ms → CTAs 200ms)
Scroll: project cards fade-up + 12px y, triggered at 20% in viewport,
  once only (not on every scroll into view)
Project image: subtle 4% parallax on scroll
"View Case Study" arrow: x: 0 → 4px on hover
```

No scroll-jacking. No heavy Three.js on the homepage — reserve that for
the Luxora case-study page specifically, consistent with the original
performance constraints from earlier planning.

## B11. Accessibility checklist

- Body text contrast ≥ 4.5:1 (already true before this spec, per B3 —
  new tokens push it further, not fix a failure)
- All interactive elements ≥ 44px tap target
- Image alt text describes content specifically (e.g. "Luxora product
  gallery showing curated home objects"), not generic "screenshot"
- Form labels properly associated; visible error states
- Visible keyboard focus ring throughout

---

# PART C — IMPLEMENTATION ORDER

Combines content and design fixes into one priority sequence.

### Do first (bugs + accuracy — both are trust issues, treat as equal priority)
1. Fix `[object Object]` bug in Jbet bet-slip (B1)
2. Fix image overflow/clipping, add container wrapper (B1)
3. Apply Hero copy shorten (A1)
4. Apply About copy shorten (A2)
5. Apply TasteTrail personal-project framing (A3)
6. Apply Jbet personal-project framing (A4)
7. Resolve portrait/illustration decision — one instance, one direction (A6, B2)

### Do this week (visual system)
8. Apply new color tokens (B3)
9. Confirm typography direction, then apply scale (B4)
10. Rebuild ProjectCard per spec, apply per-project image treatments (B6)
11. Increase section spacing to 120px rhythm (B5)
12. Rebuild Contact section layout (B9) — only add reply-time claim if true
13. Restyle What I Bring and Tech Stack sections (B7, B8)

### Do last (motion, once layout is stable)
14. Add motion per B10 — animating a layout that's still shifting from
    the fixes above just makes bugs more visible, so this genuinely
    comes last, not just last on the list.
15. Full accessibility pass (B11) as a final check across the whole page.
