# Portfolio Design System — BLACK × LIGHT PEACH

## 01. Design Direction

Create a premium personal software-engineering portfolio, combining editorial typography, a centered portrait hero, pill-shaped navigation, strong project presentation, minimal UI, subtle motion, and excellent responsive composition.

The final visual identity is strictly:

> **BLACK × LIGHT PEACH**

The portfolio should feel:

- Premium
- Confident
- Modern
- Editorial
- Technical
- Human
- Minimal

Do not introduce unrelated visual themes.

---

## 02. Color System

There are exactly two visual modes.

### Dark Mode — Default

```css
:root {
  --background: #000000;
  --surface: #0A0A0A;
  --surface-raised: #111111;

  --text-primary: #F8F8F8;
  --text-secondary: #B8B8B8;
  --text-muted: #777777;

  --accent: #F4B183;
  --accent-light: #FFC39D;
  --accent-dark: #D98E5E;

  --border: #242424;
  --border-light: #333333;
}
```

Rules:
- Background is pure black.
- Main text is near-white.
- Peach is the only accent.
- Cards remain nearly black.
- No blue, cyan, purple, green, or neon accents.

### Light Mode

```css
[data-theme="light"] {
  --background: #FFF1E7;
  --surface: #FFE8D8;
  --surface-raised: #FFE0CC;

  --text-primary: #000000;
  --text-secondary: #4A4542;
  --text-muted: #756D68;

  --accent: #F4A574;
  --accent-dark: #D98150;

  --border: #E5C8B6;
}
```

Rules:
- Background is light peach.
- Main text becomes black.
- Peach remains the accent.
- No generic white light theme.
- No cool-color accents.

---

## 03. Theme Toggle

The site has exactly two modes:

```text
DARK
LIGHT PEACH
```

Dark mode is the default.

The toggle should be compact and premium. The transition should smoothly animate background, text, cards, borders, and accent surfaces.

Both modes use the same layout and composition.

---

## 04. Navigation

Use a floating pill-shaped navigation.

```text
╭──────────────────────────────────────────────────────────────╮
│  JERRYBOSS     Home   Work   About   Skills   Contact   Hire │
╰──────────────────────────────────────────────────────────────╯
```

Dark mode:
```css
background: #0A0A0A;
border: 1px solid #242424;
```

Light mode:
```css
background: #FFE8D8;
border: 1px solid #E5C8B6;
```

Include:
- Active state
- Theme toggle
- Contact/Hire CTA
- Mobile menu

---

## 05. Hero Concept

The hero is the most important section.

Use the strongest ideas from the provided references:

- Large centered typography
- Portrait in the middle
- Supporting information around the portrait
- Strong CTA
- Editorial spacing
- Small decorative peach accents
- Premium pill navigation

Do not copy the references literally. Create an original composition.

---

## 06. Hero Headline

Preferred direction:

# I BUILD
# DIGITAL SYSTEMS.

Alternative:

# I'M JEREMIAH,
# SOFTWARE ENGINEER.

The preferred headline communicates what you actually build rather than only stating a job title.

---

## 07. Typography

Typography is central to the identity.

Recommended display fonts:

- Manrope
- Sora
- Plus Jakarta Sans

Preferred first choice:

**Manrope**

Hero:
- Weight: 700–800
- Very large display size
- Tight letter spacing
- Tight line height

Example:

```css
font-size: clamp(3.5rem, 8vw, 8rem);
line-height: 0.9;
letter-spacing: -0.05em;
```

Body:
- 16–20px
- Regular/Medium
- Comfortable line height

Metadata:
- 12–14px
- Medium/Semibold
- Letter spacing 0.08em–0.15em

Do not use monospace for the entire site.

---

## 08. Hero Composition

Desktop concept:

```text
                 SOFTWARE ENGINEER

             I BUILD DIGITAL
                SYSTEMS.

       OGBOMOSO              WEB
       NIGERIA               BACKEND
                             SYSTEMS

                    [ PORTRAIT ]

             [ VIEW MY WORK ]
              [ LET'S TALK ]
```

The portrait should overlap the lower typography or a large peach shape.

The composition must feel editorial and intentional.

---

## 09. Portrait Treatment

The portrait is a central visual element.

Do not reduce it to a small generic profile circle.

Use a peach visual shape behind it:

- Circle
- Organic blob
- Soft semicircle
- Geometric panel

The shape supports the portrait rather than overpowering it.

---

## 10. Hero Supporting Information

Use real information.

Example left:

```text
BASED IN
OGBOMOSO, NIGERIA
```

Example right:

```text
FOCUS

WEB
BACKEND
SYSTEMS
```

Keep supporting information small and elegant.

---

## 11. Hero CTA

Primary:

```text
VIEW MY WORK →
```

Secondary:

```text
LET'S TALK
```

Dark mode primary:
- Peach background
- Black text

Light mode primary:
- Black background
- White text

Buttons must have strong contrast, rounded shapes, comfortable padding, and touch-friendly dimensions.

---

## 12. Selected Work

Heading:

# SELECTED WORK

Supporting text:

> A selection of products, platforms, and experiments I've built.

Use large visual project showcases rather than identical small cards.

Recommended order:

1. Titan
2. Matchora
3. Luxora
4. Taste Trails
5. Sally
6. JBet

---

## 13. Project Classification

Every project must clearly indicate:

```text
CLIENT PROJECT
PERSONAL PROJECT
EXPERIMENT / CONCEPT
```

Never represent personal work as paid client work.

---

## 14. Project Card Design

Dark mode:

```text
background: #0A0A0A
border: #242424
```

Light mode:

```text
background: #FFE8D8
border: #E5C8B6
```

Each card should contain:
- Large project image
- Title
- Category
- Classification
- Short description
- Technologies
- Project link

Example:

```text
┌────────────────────────────────────┐
│          PROJECT IMAGE             │
├────────────────────────────────────┤
│ PERSONAL PROJECT                   │
│ TITAN                              │
│ E-COMMERCE PLATFORM                │
│                                    │
│ Full-stack commerce experience...  │
│ NEXT.JS · GO · DATABASE            │
│                                    │
│ VIEW PROJECT →                     │
└────────────────────────────────────┘
```

---

## 15. Project Hover

Desktop:
1. Image scales 1.02–1.04
2. Card rises 2–4px
3. Border becomes slightly brighter
4. Arrow moves subtly
5. Peach accent appears

Use 250–350ms transitions.

Never exaggerate effects.

---

## 16. What I Build

Heading:

# WHAT I BUILD

### 01 — WEB APPLICATIONS

Modern, responsive web applications designed around real users and product requirements.

### 02 — BACKEND SYSTEMS

APIs, databases, authentication, business logic, and application architecture for reliable products.

### 03 — DIGITAL SYSTEMS

Production-ready applications, integrations, deployment workflows, and technical systems.

Use large visual cards with layered black and peach compositions.

---

## 17. About

Use a split editorial layout.

Left:
- Large image/portrait

Right:

# I BUILD WITH
# THE PRODUCT AND
# THE SYSTEM IN MIND.

Supporting copy:

> I enjoy turning complex ideas into reliable, usable digital products. My work spans web development, backend systems, deployment, and technical problem solving.

Keep it concise.

---

## 18. Working Principles

### CLARITY
Clear communication before unnecessary complexity.

### ENGINEERING
Build for maintainability, not just the demo.

### PERFORMANCE
Keep products fast, responsive, and efficient.

### OWNERSHIP
Take responsibility from idea through deployment.

---

## 19. Primary Technology Stack

Lead consistently with:

```text
GO
NEXT.JS
LARAVEL
KOTLIN
```

Supporting technologies may include:

```text
React
Python
Django
Node.js
C#
Rust
Docker
Linux
Git
```

Only list technologies that can genuinely be demonstrated.

Do not create a giant logo wall.

---

## 20. FAQ

Use an accessible accordion.

### What is your typical project timeline?

A typical landing page takes around 1–2 weeks, depending on the design, content, revisions, and functionality required. A full web application usually takes around 3–6 weeks, while larger or more complex systems may take longer. I prefer to review the project scope first and agree on a realistic timeline rather than make unrealistic promises.

### How do you work with non-technical clients?

I explain technical decisions in terms of business goals, user experience, performance, cost, and long-term maintainability rather than unnecessary technical jargon. My goal is to make sure clients understand what is being built, why certain decisions are being made, and how those decisions benefit the final product.

### What technologies do you usually work with?

My primary stack includes Go, Next.js, Laravel, and Kotlin. I also work with other technologies depending on the requirements of a project, choosing tools based on the product, architecture, and specific problem being solved.

### What happens if you become overloaded, sick, or stuck on a project?

I plan realistic timelines and avoid taking on more work than I can responsibly manage. If an unexpected issue affects a project, I communicate it as early as possible rather than leaving the client without an update. I also leave reasonable time for testing, revisions, and unexpected technical problems.

### Do you sign NDAs?

Yes, I'm comfortable signing an NDA when a project requires confidentiality. I respect client privacy and understand that some projects may involve confidential business information, product ideas, or source code.

### What happens after the project is launched?

I provide a clear handoff of the project, including the relevant code, documentation, deployment information, and instructions needed to manage it. If a client needs continued assistance, I can also provide maintenance, bug fixes, updates, and further improvements through an agreed support arrangement.

### How do you handle payments?

My standard payment structure is 50% upfront and 50% upon completion. For larger projects, I can divide the payment into milestones based on clearly defined deliverables. Development begins once the agreed initial payment has been received.

### Can you take over a project started by another developer?

Yes. I can take over existing or unfinished projects. However, I normally recommend a codebase audit first so I can understand the existing architecture, dependencies, incomplete features, technical issues, and remaining work. After the audit, I can provide a more accurate scope, timeline, and quote for completing the project.

### Where are you based, and do you work with international clients?

I'm based in Ogbomoso, Nigeria (WAT / UTC+1) and I'm open to working with clients internationally. I’m comfortable working asynchronously through clear communication, documentation, and regular progress updates, while also making time for meetings when needed.

### Are all the projects in your portfolio client projects?

No. My portfolio includes a combination of client projects, personal projects, and experimental builds. Client projects demonstrate my ability to work with real requirements and deliver for others, while personal projects allow me to explore new technologies, architectures, and product ideas. Each project is clearly labeled so visitors can distinguish between them.

---

## 21. Contact CTA

End with:

# HAVE A PROJECT
# IN MIND?

Supporting text:

> Tell me what you're building, what problem you're trying to solve, and where you want to take it.

Primary:

```text
START A CONVERSATION →
```

Secondary:

```text
VIEW MY WORK
```

---

## 22. Footer

Dark mode:

```text
#000000
```

Light mode:

```text
#FFE8D8
```

Example:

```text
JERRYBOSS

SOFTWARE ENGINEER
BUILDING DIGITAL SYSTEMS.

OGBOMOSO, NIGERIA

GitHub
LinkedIn
Email

© 2026
```

---

## 23. Motion Language

Motion should be elegant and restrained.

Use:
- Smooth section reveals
- Gentle image scaling
- Button transitions
- Card movement
- Navigation transitions
- Theme transitions

Avoid:
- Glitch
- Scan lines
- Constant particles
- Excessive parallax
- Fast flashing
- Aggressive cursor effects

The site should feel expensive because of timing and restraint.

---

# 24. Premium Responsive Experience

The portfolio must feel premium on **every device**.

Responsive design is not simply shrinking desktop.

Every breakpoint must feel intentionally designed.

### Desktop — 1440px+

Use:
- Large editorial typography
- Centered hero composition
- Large portrait
- Spacious layouts
- Large project imagery
- Premium navigation
- Strong whitespace

### Laptop — 1024–1439px

Adapt:
- Typography
- Horizontal padding
- Grid proportions
- Navigation spacing
- Image sizing

Test:

```text
1024px
1280px
1366px
1440px
```

### Tablet — 768–1023px

Recompose rather than squeeze.

Possible:

```text
HEADLINE
PORTRAIT
SUPPORTING INFORMATION
CTA
```

Projects should generally use two columns where appropriate.

### Mobile — 320–767px

The mobile version must feel like a premium mobile product.

```text
SOFTWARE
ENGINEER

I BUILD
DIGITAL
SYSTEMS.

       PORTRAIT

WEB · BACKEND · SYSTEMS

[ VIEW MY WORK ]

[ LET'S TALK ]
```

Use:
- Intentional line breaks
- Comfortable touch targets
- Strong imagery
- Simplified navigation
- Minimal decoration
- Generous vertical rhythm

Do not simply shrink the desktop hero.

---

## 25. Responsive Testing

Test:

```text
320px
360px
375px
390px
430px
480px
768px
820px
1024px
1280px
1366px
1440px
1920px
2560px
```

At every viewport:
- No horizontal overflow
- No clipped text
- No overlap
- No broken grids
- No overflowing buttons
- No distorted images
- No awkward spacing

---

## 26. Fluid Typography

Use responsive sizing.

```css
font-size: clamp(3.5rem, 8vw, 8rem);
```

Use `clamp()` for headings, section spacing, padding, and grid gaps where useful.

---

## 27. Responsive Images

Images must:
- Maintain aspect ratios
- Load appropriate resolutions
- Use `object-fit: cover` where needed
- Avoid awkward cropping
- Lazy-load below-the-fold images
- Use WebP/AVIF where practical

The hero portrait must remain visually strong at every size.

---

## 28. Touch Interaction

Important information must never depend on hover.

Desktop:

```text
Hover → subtle card lift + image scale
```

Mobile:

```text
Tap → feedback + navigation
```

Touch targets must be comfortable.

---

## 29. Responsive Navigation

Desktop:

```text
JERRYBOSS   Home   Work   About   Skills   Contact   Hire   Theme
```

Mobile:

```text
JERRYBOSS                                  ☰
```

The mobile menu should be a premium overlay with:
- Large links
- Theme toggle
- CTA
- Clear close action
- Smooth transition
- Keyboard accessibility

---

## 30. Accessibility

Implement:
- Semantic HTML
- Proper heading hierarchy
- Descriptive alt text
- Keyboard navigation
- Visible focus states
- Accessible buttons
- Accessible mobile navigation
- Sufficient contrast
- Reduced-motion support

Use:

```css
@media (prefers-reduced-motion: reduce)
```

---

## 31. SEO

Title:

```text
Jerry Adewole — Software Engineer
```

Description:

```text
Software engineer building modern web applications, backend systems, and digital products.
```

Include:
- Open Graph metadata
- Canonical URL
- Structured data
- Descriptive project metadata
- Social metadata

---

## 32. Performance

Priorities:
1. Fast initial render
2. Optimized images
3. Minimal JavaScript
4. Lazy loading
5. Efficient animations
6. Responsive images
7. No unnecessary dependencies

Do not sacrifice performance for decoration.

---

# 33. Implementation Steps

## STEP 1 — Audit Existing Site

Inspect:
- Framework
- Components
- Assets
- Project data
- Theme
- Navigation
- Hero
- About
- Footer
- Metadata
- Animations

Do not destroy useful existing work.

## STEP 2 — Replace Color System

Remove all previous ocean-blue colors.

Search for and remove:

```text
navy
blue
cyan
purple
neon
```

Use only:

```text
BLACK
LIGHT PEACH
WHITE / BLACK TEXT
```

## STEP 3 — Implement Theme Architecture

Create:

```text
dark
light
```

Dark is default. Light uses the peach background.

Persist the user's selection with local storage if appropriate.

## STEP 4 — Rebuild Navigation

Implement:
- Floating pill navigation
- Active state
- Theme toggle
- Mobile menu
- Hire/contact CTA

## STEP 5 — Rebuild Hero

Implement:
- Large editorial headline
- Centered composition
- Portrait centerpiece
- Peach visual shape
- Supporting metadata
- Primary CTA
- Secondary CTA
- Responsive recomposition

## STEP 6 — Rebuild Project System

Make projects data-driven.

Each project should contain:

```text
title
category
type
description
image
technologies
liveUrl
sourceUrl
```

## STEP 7 — Build Selected Work

Prioritize:

```text
Titan
Matchora
Luxora
Taste Trails
Sally
JBet
```

Use real screenshots wherever possible.

## STEP 8 — Build Services

Create:

```text
WEB APPLICATIONS
BACKEND SYSTEMS
DIGITAL SYSTEMS
```

## STEP 9 — Build About

Create:
- Large image
- Engineering philosophy
- Experience summary
- CV link if available

## STEP 10 — Build Technology Section

Lead with:

```text
GO
NEXT.JS
LARAVEL
KOTLIN
```

Then supporting technologies.

## STEP 11 — Build FAQ

Use the finalized ten FAQ answers with accessible accordion interactions.

## STEP 12 — Build Contact CTA

Create:

```text
HAVE A PROJECT IN MIND?
```

with clear contact actions.

## STEP 13 — Fix Location Consistency

The portfolio should consistently use:

```text
OGBOMOSO, NIGERIA
```

Update Hero, About, Footer, Contact, FAQ, SEO metadata, and structured data.

## STEP 14 — Fix Stack Consistency

The public primary stack should consistently say:

```text
GO
NEXT.JS
LARAVEL
KOTLIN
```

## STEP 15 — Responsive Recomposition

Explicitly redesign Hero, Navigation, Project Grid, Services, About, CTA, and Footer for:

```text
Desktop
Laptop
Tablet
Mobile
```

## STEP 16 — Add Motion

After the static design works:
- Hero reveal
- Card hover
- Image transitions
- Section reveals
- Button interactions
- Theme transition
- Mobile menu transition

Keep everything subtle.

## STEP 17 — Accessibility Testing

Check:
- Keyboard navigation
- Focus states
- Screen readers
- Contrast
- Reduced motion
- Mobile navigation

## STEP 18 — Performance Testing

Check:
- Image sizes
- JavaScript bundle
- Initial render
- Layout shifts
- Animation performance
- Mobile performance

## STEP 19 — Final Visual Audit

Dark:

```text
BLACK
WHITE
PEACH
```

Light:

```text
LIGHT PEACH
BLACK
PEACH
```

There must be no accidental blue/cyan/purple styling.

---

# 34. Final Page Architecture

```text
NAVIGATION
│
├── HERO
│   ├── Large Typography
│   ├── Portrait
│   ├── Supporting Metadata
│   └── CTA
│
├── SELECTED WORK
│   ├── Titan
│   ├── Matchora
│   ├── Luxora
│   ├── Taste Trails
│   ├── Sally
│   └── JBet
│
├── WHAT I BUILD
│   ├── Web Applications
│   ├── Backend Systems
│   └── Digital Systems
│
├── ABOUT
│
├── PRIMARY STACK
│   ├── Go
│   ├── Next.js
│   ├── Laravel
│   └── Kotlin
│
├── WORKING PRINCIPLES
│
├── FAQ
│
├── CONTACT CTA
│
└── FOOTER
```

---

# 35. Final Design Rules

### Color

Only:

```text
BLACK
LIGHT PEACH
WHITE / BLACK TEXT
```

No ocean blue.  
No purple.  
No cyan.  
No neon.

### Layout

Use:

```text
Large typography
Centered portrait
Editorial spacing
Pill navigation
Strong project imagery
Layered cards
```

### Motion

Use:

```text
Subtle
Smooth
Purposeful
```

Never:

```text
Glitchy
Aggressive
Constant
Distracting
```

### Responsive

The website must never feel like:

> A desktop website squeezed onto a phone.

It should feel like:

> **A premium portfolio intentionally designed for every screen size.**

---

# 36. Final Success Criteria

Within the first 10 seconds, visitors should understand:

1. Who you are
2. That you are a software engineer
3. What you build
4. Your strongest projects
5. Your technology focus
6. Whether work is client or personal
7. How to contact you
8. That you work internationally

The final impression should be:

> **A serious software engineer with strong product taste who can turn ideas into polished digital systems.**

The visual identity should be:

> **BLACK × PEACH — minimal, premium, personal, and memorable.**
