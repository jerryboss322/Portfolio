# JBOSS Portfolio --- Final Design Plan

## 01. Core Direction

**Design direction:** Personal Editorial / Project-First Engineering
Portfolio

The portfolio should feel like a serious independent software engineer's
site --- not an AI-generated portfolio template, cyberpunk dashboard, or
collection of decorative effects.

The hierarchy is:

``` text
PERSON
   ↓
WORK
   ↓
ENGINEERING
   ↓
TECHNOLOGY
   ↓
CONTACT
```

The site should communicate within seconds:

> **JBOSS is a software engineer who builds real digital products.**

The work is the evidence. The design frames that evidence rather than
competing with it.

------------------------------------------------------------------------

## 02. Visual Personality

The final visual personality:

-   Personal
-   Editorial
-   Technical
-   Confident
-   Minimal
-   Modern
-   Human
-   Premium
-   Fast

Avoid:

-   Generic AI aesthetics
-   Neon cyberpunk
-   Excessive gradients
-   Particle backgrounds
-   Giant glowing blobs
-   Star fields
-   Neural-network graphics
-   Scan lines
-   Glassmorphism everywhere
-   Fake metrics
-   Fake testimonials
-   Decorative "systems" language

------------------------------------------------------------------------

## 03. Hero Portrait --- Final Decision

### Primary hero image: the second transparent cutout

Use the **second transparent-background portrait** as the primary hero
image.

It is stronger because:

-   It has more personality.
-   Looking upward creates visual direction.
-   The hand-on-chin pose feels thoughtful and intentional.
-   The silhouette is distinctive.
-   The transparent background integrates naturally with the layout.
-   It feels editorial rather than like a normal profile photo.

This should become part of the visual identity of the portfolio.

### Secondary portrait

The first transparent-background portrait can be used later in:

-   About section
-   Contact section
-   Small profile component
-   Social/profile card

Do not use both portraits in the hero.

### Portrait treatment

Keep it natural.

Use:

-   Transparent background
-   Subtle shadow
-   Careful exposure correction
-   Slight contrast adjustment
-   Optional very subtle desaturation
-   Natural skin tone
-   Clean edge treatment

Do not:

-   Generate a fake replacement face
-   Add a blue outline
-   Add a neon glow
-   Add a circular avatar frame
-   Put the portrait inside a generic card
-   Surround it with particles

The portrait itself is the visual anchor.

------------------------------------------------------------------------

## 04. Hero Composition

The hero should be asymmetric.

``` text
┌──────────────────────────────────────────────────────────┐
│ JBOSS                          WORK  ABOUT  STACK CONTACT │
│                                                          │
│ SOFTWARE ENGINEER                        ┌─────────────┐ │
│                                          │             │ │
│ I build digital products                │             │ │
│ that solve real problems.               │     YOU     │ │
│                                          │             │ │
│ Full-stack · Platforms · APIs            │   portrait  │ │
│                                          │             │ │
│ [ VIEW MY WORK → ] [ GITHUB ↗ ]          └─────────────┘ │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

Desktop proportion:

``` text
Left content:   ~58–62%
Portrait:       ~38–42%
```

The portrait can extend slightly outside the normal grid to create an
editorial composition.

------------------------------------------------------------------------

## 05. Hero Copy

Recommended:

``` text
SOFTWARE ENGINEER

I build digital products
that solve real problems.

Full-stack applications · Platforms · APIs

[ VIEW MY WORK → ]   [ GITHUB ↗ ]
```

Optional metadata:

``` text
LAGOS, NIGERIA
AVAILABLE FOR SELECT PROJECTS
```

Only show availability when accurate.

The headline should be large, but not absurdly oversized.

------------------------------------------------------------------------

## 06. Navigation

Minimal navigation:

``` text
JBOSS                         WORK   ABOUT   STACK   CONTACT
```

Optional:

``` text
GITHUB ↗
```

Requirements:

-   Clean
-   Compact
-   Sticky or lightly persistent
-   High contrast
-   Minimal border
-   No complex menu
-   No dropdown unless actually needed

Logo:

``` text
JBOSS
```

------------------------------------------------------------------------

## 07. Color System

### Dark mode --- primary identity

``` text
Background:      #08090B
Surface:         #101217
Primary Text:    #F5F5F2
Secondary Text:  #9A9DA3
Border:          #24272D
Accent:          #3B82FF
```

### Light mode

``` text
Background:      #F5F5F2
Surface:         #FFFFFF
Primary Text:    #111111
Secondary Text:  #5F6368
Border:          #D9D9D4
Accent:          #126BFF
```

Use one primary accent.

Blue should appear in:

-   CTA buttons
-   Links
-   Active navigation
-   Small metadata
-   Focus states
-   Selected project states

Do not use rainbow gradients, huge blue glows, or purple/pink AI
gradients.

------------------------------------------------------------------------

## 08. Typography

Recommended primary font:

-   Geist
-   Inter
-   Manrope
-   Satoshi
-   General Sans

Choose one.

Technical metadata may use:

-   Geist Mono
-   JetBrains Mono
-   IBM Plex Mono

Use monospace sparingly for:

``` text
01
2026
NEXT.JS · POSTGRESQL
FULL-STACK APPLICATION
```

Do not turn the whole website into a terminal.

------------------------------------------------------------------------

## 09. Grid & Spacing

Desktop:

``` text
Max width:       1200–1280px
Horizontal pad: 32–48px
Grid:            12 columns
```

Tablet:

``` text
Padding: 24–32px
Grid: 8 columns
```

Mobile:

``` text
Padding: 18–20px
Grid: 4 columns
```

Use generous vertical spacing and strong alignment.

------------------------------------------------------------------------

## 10. Homepage Architecture

``` text
01  NAVIGATION

02  HERO
    ├── Identity
    ├── Value proposition
    ├── Primary CTA
    └── Portrait

03  SELECTED WORK
    ├── Titan
    ├── Matchora
    ├── JBets
    └── Sally Green

04  ABOUT

05  CAPABILITIES

06  TECH STACK

07  CONTACT CTA

08  FOOTER
```

------------------------------------------------------------------------

## 11. Selected Work --- Most Important Section

Heading:

``` text
SELECTED WORK
```

Supporting text:

``` text
A selection of digital products, platforms
and interfaces I've designed and built.
```

Projects should be much larger than in the current design.

Do not use a tiny three-column gallery as the primary presentation.

------------------------------------------------------------------------

## 12. Project Order

### 01 --- TITAN

**Category:** E-COMMERCE PLATFORM

Titan should be the strongest visual project.

Demonstrate:

-   Product interface
-   E-commerce UX
-   Full-stack implementation
-   Responsive design
-   Product/catalog architecture

### 02 --- MATCHORA

**Category:** SPORTS PREDICTION PLATFORM

Demonstrate:

-   Data-heavy interface
-   Prediction/statistics UI
-   Dynamic content
-   Backend logic
-   API-driven architecture

### 03 --- JBETS

**Category:** SPORTS BETTING PLATFORM

Demonstrate only features that genuinely exist.

Potential areas:

-   Sports interface
-   Odds/data presentation
-   User flows
-   Platform architecture
-   Backend systems

### 04 --- SALLY GREEN

**Category:** MARKETING WEBSITE

Demonstrate:

-   Visual design
-   Responsive frontend
-   Branding
-   Content hierarchy
-   Marketing UX

------------------------------------------------------------------------

## 13. Project Layout

Use large editorial project layouts.

``` text
01
TITAN
E-COMMERCE PLATFORM

┌─────────────────────────────────────────────────────┐
│                                                     │
│                  PROJECT IMAGE                      │
│                                                     │
└─────────────────────────────────────────────────────┘

A full-stack commerce experience focused on
product discovery, catalog management and
a polished purchasing flow.

NEXT.JS · POSTGRESQL · VERCEL

VIEW CASE STUDY →
```

Alternate the text/image relationship between projects.

------------------------------------------------------------------------

## 14. Case Study Template

``` text
PROJECT NAME

CATEGORY
YEAR
ROLE
STATUS

[ LARGE HERO IMAGE ]

OVERVIEW

THE PROBLEM

THE APPROACH

KEY FEATURES

01
Feature

02
Feature

03
Feature

TECHNICAL ARCHITECTURE

Frontend
Backend
Database
Infrastructure

DESIGN DECISIONS

CHALLENGES

RESULT

TECH STACK

[ LIVE PROJECT ↗ ]
[ SOURCE ↗ ]

NEXT PROJECT →
```

Case studies must use real information. Never invent clients, revenue,
users, testimonials, performance metrics, business outcomes, or quotes.

------------------------------------------------------------------------

## 15. About Section

Replace the abstract "Engineering Systems" content.

Example:

``` text
ABOUT

I'm a software engineer focused on building
useful, reliable and polished digital products.

I work across frontend, backend and system
architecture, with a strong interest in turning
complex requirements into simple interfaces.
```

The **first transparent portrait** may be used here if desired.

------------------------------------------------------------------------

## 16. Capabilities

Replace abstract labels such as:

``` text
Visual Focus
Narrative Motion
Typographic Rhythm
Fluid Response
Stillness & Hold
Unified Cascade
```

Use client-understandable capabilities:

``` text
WHAT I BUILD

Web Applications
SaaS Platforms
E-commerce
APIs & Backend Systems
Interactive Interfaces
Dashboards
Developer Tools
Data-driven Products
```

------------------------------------------------------------------------

## 17. Technology Stack

Group technologies instead of scattering dozens of pills.

``` text
FRONTEND
React
Next.js
TypeScript
HTML / CSS

BACKEND
Node.js
Express
Django
Python

DATABASE
PostgreSQL
SQL

INFRASTRUCTURE
Linux
Git
Docker
Vercel

OTHER
C#
Unity
Godot
```

Only list technologies that can be supported by actual work.

------------------------------------------------------------------------

## 18. Contact Section

``` text
HAVE A PROJECT IN MIND?

Let's build something useful.

[ GET IN TOUCH → ]
```

Links:

``` text
GitHub ↗
LinkedIn ↗
Email ↗
```

Do not build a contact form unless there is a real submission workflow.

------------------------------------------------------------------------

## 19. Footer

``` text
JBOSS

Software Engineer
Lagos, Nigeria

GitHub ↗
LinkedIn ↗
Email ↗

© 2026 JBOSS
```

Optional:

``` text
● AVAILABLE FOR SELECT PROJECTS
```

Only use the status if true.

------------------------------------------------------------------------

## 20. Motion System

Motion should be restrained.

Use:

-   Fade/reveal on scroll
-   Small image movement
-   Project hover
-   Button feedback
-   Navigation transitions
-   Underline animation
-   Smooth page transitions

Avoid:

-   Particle animation
-   Continuous background motion
-   Giant parallax
-   Magnetic effects everywhere
-   Floating objects
-   Long loading animations
-   Decorative animation loops

Principle:

> **Motion should explain interaction, not decorate empty space.**

------------------------------------------------------------------------

## 21. Project Hover

``` text
DEFAULT
Project image + metadata

HOVER
Image scale: 1.01–1.03
+
Subtle border/accent change
+
VIEW CASE STUDY →
```

Duration:

``` text
300–500ms
```

------------------------------------------------------------------------

## 22. Background

Primary background:

``` text
#08090B
```

Do not use the previous star-field background.

Optional:

-   Extremely subtle noise
-   Very subtle grain
-   Very faint grid
-   Almost invisible tonal variation

Never use:

-   Star fields
-   Particle canvas
-   Neural network background
-   AI grid
-   Scan lines
-   Large glowing orb
-   Cyberpunk background

------------------------------------------------------------------------

## 23. Cards & Containers

Do not put everything inside cards.

Use containers only when they improve grouping.

Good:

-   Project preview
-   Contact CTA
-   Small technical block

Avoid:

-   Every skill in a card
-   Every paragraph in a card
-   Every section in a rounded box
-   Entire page built from floating glass panels

Prefer open layouts and strong alignment.

------------------------------------------------------------------------

## 24. Testimonials

Remove the current testimonials unless they are genuine.

If genuine testimonials are collected later:

``` text
QUOTE

Name
Role
Company
```

Otherwise, let the work speak for itself.

------------------------------------------------------------------------

## 25. Metrics

Remove fake or arbitrary metrics such as:

``` text
14+ Projects
60% Debt Reduction
100% Native Frontend
```

Only show metrics that are real, relevant, defensible, and useful.

------------------------------------------------------------------------

## 26. Mobile Design

Mobile must be designed independently.

``` text
JBOSS

SOFTWARE ENGINEER

I build digital products
that solve real problems.

[ PORTRAIT ]

Full-stack · Platforms · APIs

[ VIEW MY WORK ]
[ GITHUB ]
```

Then:

``` text
SELECTED WORK

01
TITAN

[ FULL WIDTH IMAGE ]

Description

Tech

VIEW CASE STUDY →
```

Each project remains visually strong.

------------------------------------------------------------------------

## 27. Accessibility

Required:

-   Semantic HTML
-   Correct heading hierarchy
-   Keyboard navigation
-   Visible focus states
-   Accessible buttons
-   Accessible links
-   Alt text
-   Good contrast
-   Reduced-motion support
-   No information conveyed only through color

------------------------------------------------------------------------

## 28. Performance

The portfolio should feel fast on modest hardware.

Avoid unnecessary:

-   Three.js
-   WebGL
-   Particle libraries
-   Heavy animation libraries
-   Huge background images
-   Autoplay video

Prefer:

-   Optimized project screenshots
-   Responsive image sizes
-   Lazy loading
-   Minimal client JavaScript
-   CSS transitions
-   Fast initial render

The portfolio should still look excellent with all motion disabled.

------------------------------------------------------------------------

## 29. Design Tokens

``` css
:root {
  --bg: #08090B;
  --surface: #101217;
  --text: #F5F5F2;
  --muted: #9A9DA3;
  --border: #24272D;
  --accent: #3B82FF;

  --max-width: 1280px;

  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 48px;
  --space-xl: 96px;
  --space-2xl: 160px;

  --radius-sm: 4px;
  --radius-md: 8px;
}
```

Use semantic variables so light and dark modes share the same component
architecture.

------------------------------------------------------------------------

## 30. Routes

Recommended:

``` text
/
├── /work
├── /work/titan
├── /work/matchora
├── /work/jbets
├── /work/sally-green
├── /about
└── /contact
```

For a smaller implementation, the homepage can contain Work, About,
Stack, and Contact sections.

------------------------------------------------------------------------

## 31. Final Homepage Wireframe

``` text
┌────────────────────────────────────────────────────────────┐
│ JBOSS                     WORK  ABOUT  STACK  CONTACT      │
├────────────────────────────────────────────────────────────┤
│                                                            │
│ SOFTWARE ENGINEER                         ┌──────────────┐ │
│                                           │              │ │
│ I build digital products                 │              │ │
│ that solve real problems.                │   THINKING   │ │
│                                           │   PORTRAIT   │ │
│ Full-stack · Platforms · APIs             │              │ │
│                                           │              │ │
│ [ VIEW MY WORK → ] [ GITHUB ↗ ]           │              │ │
│                                           └──────────────┘ │
│                                                            │
├────────────────────────────────────────────────────────────┤
│ SELECTED WORK                                              │
│                                                            │
│ 01  TITAN                                                  │
│     E-COMMERCE PLATFORM                                    │
│                                                            │
│ ┌────────────────────────────────────────────────────────┐ │
│ │                    PROJECT IMAGE                       │ │
│ └────────────────────────────────────────────────────────┘ │
│                                                            │
│ Description                                                │
│ NEXT.JS · POSTGRESQL · VERCEL                             │
│ VIEW CASE STUDY →                                         │
│                                                            │
│ 02  MATCHORA                                               │
│                                                            │
│ ┌──────────────────────────────┬─────────────────────────┐ │
│ │        PROJECT IMAGE         │ PROJECT INFORMATION     │ │
│ └──────────────────────────────┴─────────────────────────┘ │
│                                                            │
│ 03  JBETS                                                  │
│                                                            │
│ ┌──────────────────────────────┬─────────────────────────┐ │
│ │ PROJECT INFORMATION          │ PROJECT IMAGE            │ │
│ └──────────────────────────────┴─────────────────────────┘ │
│                                                            │
│ 04  SALLY GREEN                                            │
│                                                            │
│ ┌────────────────────────────────────────────────────────┐ │
│ │                    PROJECT IMAGE                       │ │
│ └────────────────────────────────────────────────────────┘ │
│                                                            │
├────────────────────────────────────────────────────────────┤
│ ABOUT                                                      │
│                                                            │
│ I'm a software engineer focused on building useful,       │
│ reliable and polished digital products.                    │
│                                                            │
├────────────────────────────────────────────────────────────┤
│ WHAT I BUILD                                               │
│ Web Apps · SaaS · E-commerce · APIs · Dashboards          │
│                                                            │
├────────────────────────────────────────────────────────────┤
│ TECH STACK                                                 │
│ React · Next.js · TypeScript · Node · Django              │
│ PostgreSQL · Docker · Linux · Git                         │
│                                                            │
├────────────────────────────────────────────────────────────┤
│ HAVE A PROJECT IN MIND?                                    │
│ Let's build something useful.                              │
│ [ GET IN TOUCH → ]                                         │
├────────────────────────────────────────────────────────────┤
│ JBOSS © 2026                         GitHub · LinkedIn     │
└────────────────────────────────────────────────────────────┘
```

------------------------------------------------------------------------

## 32. What Must Be Removed From the Existing Design

Completely remove:

-   Giant blue hero blob
-   Star/particle background
-   AI visual motifs
-   Fake statistics
-   Fake testimonials
-   "Engineering Systems" filler
-   Excessive pill badges
-   Excessive rounded cards
-   Excessive gradients
-   Generic AI portfolio language
-   Decorative system terminology
-   Heavy glassmorphism
-   Constant background animation

------------------------------------------------------------------------

## 33. What Should Remain

Keep and improve:

-   Strong project screenshots
-   Project categories
-   Dark/light mode
-   Simple navigation
-   GitHub
-   Contact CTA
-   Technology information
-   Subtle motion
-   Responsive layout
-   Case studies

Add:

-   Real hero portrait
-   Stronger personal identity
-   Larger project presentation
-   Real case-study structure
-   Better visual hierarchy

------------------------------------------------------------------------

## 34. Implementation Priority

### Phase 1 --- Foundation

-   Remove old visual system
-   Establish typography
-   Establish colors
-   Establish spacing
-   Establish grid
-   Build navigation
-   Build responsive shell

### Phase 2 --- Hero

-   Add final headline
-   Add description
-   Add CTA
-   Add **second transparent portrait**
-   Position portrait as the main visual anchor
-   Add mobile portrait layout

### Phase 3 --- Projects

-   Titan
-   Matchora
-   JBets
-   Sally Green
-   Large screenshots
-   Metadata
-   Case-study links

### Phase 4 --- Case Studies

-   Reusable project template
-   Overview
-   Problem
-   Approach
-   Features
-   Architecture
-   Challenges
-   Result
-   Tech stack

### Phase 5 --- Supporting Sections

-   About
-   Capabilities
-   Stack
-   Contact
-   Footer

### Phase 6 --- Motion

-   Section reveal
-   Project image hover
-   Link transitions
-   Button feedback
-   Reduced-motion support

### Phase 7 --- Polish

-   Optimize portrait
-   Optimize screenshots
-   Mobile testing
-   Accessibility
-   SEO
-   Open Graph
-   Performance testing

------------------------------------------------------------------------

## 35. Success Criteria

The redesign is successful when:

-   A visitor understands what JBOSS does within 5 seconds.
-   The real portrait establishes identity immediately.
-   The second portrait feels like part of the brand rather than an
    avatar.
-   The first project appears quickly.
-   Projects dominate the visual hierarchy.
-   Case studies feel authentic.
-   No decorative effect competes with the work.
-   There are no fake claims.
-   The site looks good without animation.
-   Mobile feels intentionally designed.
-   The site loads quickly.
-   A potential client can contact JBOSS immediately.

------------------------------------------------------------------------

## 36. Final Design Statement

### JBOSS --- Software Engineer

A **project-first personal portfolio** built around:

**real work + authentic identity + editorial typography + strong project
imagery + restrained interaction + technical credibility.**

The hero should make the visitor think:

> **"This is a real person who builds things."**

The projects should make them think:

> **"This person can actually engineer."**

The rest of the site should simply reinforce those two ideas.

------------------------------------------------------------------------

## 37. Non-Negotiable Design Rule

> **Do not add an effect unless it improves hierarchy, communication, or
> interaction.**

If removing an animation, glow, card, gradient, badge, or decoration
makes the page clearer, remove it.

The portfolio should be memorable because of:

**JBOSS + the portrait + the work + the execution.**

Not because of visual noise.
