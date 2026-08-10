# Portfolio Redesign V2 — Deep Ocean / Premium Engineering

## 01. Design Vision

Create a completely refreshed portfolio inspired by the **deep ocean image** provided as the new visual reference.

The new direction should feel:

- Deep
- Premium
- Calm
- Technical
- Sophisticated
- Modern
- Confident
- Minimal
- Human

The portfolio should no longer look like a generic light-theme developer template.

The visual identity should communicate:

> **Software Engineer building digital systems.**

The ocean reference should influence the **color, atmosphere, texture, and mood**, but the portfolio should remain clean and professional.

Do **not** turn the site into an underwater-themed website. The ocean is a visual inspiration, not the literal subject.

---

# 02. Core Design Concept

## Concept Name

### DEEP OCEAN ENGINEERING

The website should feel like looking into deep water:

- Dark navy foundation
- Subtle blue variations
- Soft highlights
- Layered surfaces
- Gentle depth
- Minimal motion
- Strong white typography

The overall feeling should be:

> **Deep, quiet, intelligent, and engineered.**

Avoid:

- Neon cyberpunk
- Matrix effects
- Excessive AI visuals
- Particle networks
- Fake terminal interfaces
- Excessive glassmorphism
- Huge glowing gradients
- Overly futuristic UI

---

# 03. Color System

Use the uploaded ocean image as the primary color inspiration.

## Main colors

```css
:root {
  --background: #061923;
  --background-deep: #04131B;

  --surface: #0B2430;
  --surface-raised: #103342;

  --text: #F4F8FA;
  --text-secondary: #B7C7CE;
  --text-muted: #78909C;

  --border: rgba(160, 200, 215, 0.14);

  --primary: #2F7D9D;
  --primary-light: #5FA9C4;

  --highlight: #8BC8DC;

  --white: #FFFFFF;
}
```

## Color hierarchy

### Background

Primary:

```text
#061923
```

Use this for the main page background.

### Deep background

```text
#04131B
```

Use for:

- Footer
- Deep sections
- Project detail areas

### Surface

```text
#0B2430
```

Use for:

- Cards
- Navigation
- Project panels
- Skill blocks

### Raised surface

```text
#103342
```

Use sparingly for hover states and important panels.

### Primary blue

```text
#2F7D9D
```

Use for:

- Buttons
- Links
- Active states
- Small highlights

### Light blue

```text
#5FA9C4
```

Use for:

- Hover states
- Small visual accents
- Gradient highlights

---

# 04. Background Treatment

The background should not be completely flat.

Use extremely subtle depth.

Possible approach:

```text
Deep navy base
+
very subtle blue gradient
+
very subtle ocean-like texture
```

The texture should be almost invisible.

It should create the feeling of depth without distracting from content.

## Important

Do NOT use:

- Obvious water animation
- Large waves
- Animated ocean footage
- Heavy particle systems
- WebGL water simulations

The reference image is inspiration for the color and texture, not something that needs to be recreated literally.

---

# 05. Navigation

Use a dark floating navigation bar.

Example:

```text
┌─────────────────────────────────────────────────────────┐
│  JERRYBOSS        Home   Work   About   Skills   Contact │
│                                                   HIRE ME │
└─────────────────────────────────────────────────────────┘
```

## Appearance

Background:

```text
rgba(11, 36, 48, 0.88)
```

Border:

```text
rgba(160, 200, 215, 0.12)
```

Use:

- Backdrop blur
- Thin border
- Moderate radius
- Very subtle shadow

The navbar should feel like a floating panel over deep water.

---

# 06. Hero Section

The hero should be dramatically stronger than the previous design.

## Main message

Use:

# SOFTWARE ENGINEER
# BUILDING DIGITAL SYSTEMS.

Alternative supporting line:

> I design and build modern web applications, backend systems, and digital products from concept to deployment.

The title should occupy a large portion of the hero.

---

# 07. Hero Composition

Desktop:

```text
┌──────────────────────────────────────────────────────┐
│                                                      │
│  SOFTWARE ENGINEER                     [PORTRAIT]    │
│  BUILDING DIGITAL                     FULL-STACK     │
│  SYSTEMS.                             BACKEND         │
│                                       DEVOPS          │
│                                                      │
│  I build modern web applications,                    │
│  backend systems and digital products.               │
│                                                      │
│  [VIEW WORK]       [CONTACT ME]                      │
│                                                      │
│  OGBOMOSO, NIGERIA                                  │
│  AVAILABLE FOR SELECTED PROJECTS                     │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

# 08. Hero Typography

The hero heading should be very large.

Suggested:

```text
Desktop: 72px – 100px
Tablet: 56px – 72px
Mobile: 42px – 56px
```

Use:

- Heavy weight
- Tight line-height
- Slightly negative letter spacing

Example:

```css
letter-spacing: -0.04em;
line-height: 0.95;
```

The heading should feel editorial and premium.

---

# 09. Hero Accent

Use a subtle blue highlight behind part of the heading.

Example:

```text
SOFTWARE ENGINEER
BUILDING [DIGITAL]
SYSTEMS.
```

The highlighted word can have:

- Very subtle blue gradient
- Soft background
- Thin border
- Or a low-opacity glow

Keep it understated.

---

# 10. Hero Profile Image

Keep a professional portrait, but change the presentation from the previous light design.

Use:

- Circular or organic crop
- Dark blue border
- Subtle blue glow
- Thin secondary ring

Around the image use small technical labels:

```text
FULL-STACK
BACKEND
DEVOPS
```

Do not use too many floating labels.

---

# 11. Hero Metadata

Add a small technical metadata row.

Example:

```text
OGBOMOSO, NIGERIA
WAT / UTC+1
OPEN TO INTERNATIONAL CLIENTS
```

Another option:

```text
STATUS
AVAILABLE FOR SELECTED PROJECTS
```

This creates the technical personality without making the site look like a fake terminal.

---

# 12. Hero Buttons

Primary:

```text
VIEW SELECTED WORK →
```

Secondary:

```text
LET'S TALK
```

Primary button:

```css
background: #2F7D9D;
color: #FFFFFF;
```

Hover:

```text
background → #5FA9C4
```

Secondary button:

```text
transparent
border: subtle blue/white border
```

---

# 13. Selected Work

Immediately after the hero, show projects.

Heading:

# SELECTED WORK

Supporting text:

> A selection of products, platforms, and experiments I've built.

Use a premium grid.

---

# 14. Project Layout

Do NOT use six identical cards.

Create visual hierarchy.

## Featured projects

Give the first three projects larger presentation:

```text
┌────────────────────────────────────┐
│                                    │
│              TITAN                 │
│                                    │
│        LARGE PROJECT IMAGE         │
│                                    │
├────────────────────────────────────┤
│ E-COMMERCE PLATFORM                │
│ Full-stack commerce experience     │
│                                    │
│ NEXT.JS · DATABASE · CLOUD         │
└────────────────────────────────────┘
```

Then supporting projects can use smaller cards.

---

# 15. Project Order

Recommended:

## 01 — Titan

Label:

```text
PERSONAL PROJECT
```

Category:

```text
E-COMMERCE PLATFORM
```

Description:

> A full-stack commerce platform focused on a polished shopping experience, product management, authentication, and scalable application architecture.

---

## 02 — Matchora

Label:

```text
PERSONAL PROJECT
```

Category:

```text
SPORTS PREDICTION PLATFORM
```

Description:

> A data-driven sports prediction platform designed around match information, prediction workflows, and an intuitive user experience.

---

## 03 — Luxora

Category:

```text
PREMIUM COMMERCE EXPERIENCE
```

Description:

> A luxury-focused commerce experience combining premium visual design with structured product discovery and responsive interaction.

---

## 04 — Taste Trails

Category:

```text
FOOD DISCOVERY
```

Description:

> A visual food discovery experience designed around exploration, content presentation, and intuitive navigation.

---

## 05 — Sally

Label:

```text
CLIENT PROJECT
```

Category:

```text
DIGITAL PRODUCT
```

Description:

> A client-focused digital experience built around clear communication, usability, and a polished product presentation.

---

## 06 — JBet

Label:

```text
EXPERIMENT / CONCEPT
```

Category:

```text
PLATFORM CONCEPT
```

Description:

> A complex platform concept exploring user flows, data presentation, account experiences, and application architecture.

Use the correct project classification. Do not imply that personal projects were paid client work.

---

# 16. Project Card Style

Cards should feel like dark premium product showcases.

Use:

```text
Background: #0B2430
Border: subtle
Radius: 14–18px
```

Project images should be large.

Use real screenshots whenever possible.

Avoid stock images unless they are genuinely part of the project.

---

# 17. Project Hover Interaction

On hover:

1. Image scales approximately 1.02–1.04
2. Card moves upward 2–4px
3. Border becomes slightly brighter
4. Arrow appears or moves
5. Description remains readable

Transition:

```text
250ms – 350ms
```

Avoid exaggerated animation.

---

# 18. Project Technical Metadata

Every project should have a small metadata line.

Example:

```text
NEXT.JS
POSTGRESQL
API
AUTH
```

or:

```text
REACT
NODE
UI/UX
RESPONSIVE
```

Only list technologies actually used.

---

# 19. Case Study Experience

Clicking a project should provide more than just a screenshot.

Project details should include:

```text
PROJECT
CATEGORY
TYPE

OVERVIEW

THE PROBLEM

THE APPROACH

KEY FEATURES

TECHNICAL IMPLEMENTATION

CHALLENGES

RESULT / OUTCOME

TECHNOLOGIES

[VIEW LIVE]
[VIEW SOURCE]
```

Use a dedicated project page where practical.

---

# 20. What I Build

Add an engineering capability section.

Heading:

# WHAT I BUILD

Use three large panels.

---

## 01 — WEB APPLICATIONS

> Modern, responsive web applications designed around real users and real product requirements.

---

## 02 — BACKEND SYSTEMS

> APIs, databases, authentication, business logic, and application architecture designed to support reliable products.

---

## 03 — DEPLOYMENT & SYSTEMS

> Production-ready applications, deployment workflows, infrastructure configuration, and reliable delivery.

Avoid claiming advanced DevOps capabilities that cannot be demonstrated.

---

# 21. Tech Stack

The portfolio should lead with the stack already chosen for the site.

## Primary

```text
GO
NEXT.JS
LARAVEL
KOTLIN
```

Use these prominently but cleanly.

Supporting technologies can appear underneath:

```text
JavaScript
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

Only include technologies that are genuinely relevant and defensible.

---

# 22. Tech Stack Presentation

Do not create a giant wall of technology logos.

Instead:

```text
PRIMARY STACK

GO
Backend & Systems

NEXT.JS
Web Applications

LARAVEL
Backend Platforms

KOTLIN
Application Development
```

Then:

```text
ALSO WORKING WITH

React · Python · Django · Node.js · C# · Rust · Docker · Linux
```

---

# 23. About Section

Use a split layout.

Left:

Large image.

Right:

# I BUILD WITH BOTH
# THE PRODUCT AND
# THE SYSTEM IN MIND.

Supporting copy:

> I enjoy turning complex ideas into reliable, usable digital products. My work spans web development, backend systems, deployment, and technical problem solving.

Keep the About section concise.

Do not turn it into a long biography.

---

# 24. Credibility / Working Principles

Add a small section underneath About.

Possible principles:

### CLARITY

> Clear communication before unnecessary complexity.

### ENGINEERING

> Build for maintainability, not just the demo.

### PERFORMANCE

> Keep products fast, responsive, and efficient.

### OWNERSHIP

> Take responsibility from idea through deployment.

This gives clients a sense of how you work.

---

# 25. FAQ

Create a dedicated FAQ section.

Use the following finalized answers.

---

## What is your typical project timeline?

A typical landing page takes around 1–2 weeks, depending on the design, content, revisions, and functionality required. A full web application usually takes around 3–6 weeks, while larger or more complex systems may take longer. I prefer to review the project scope first and agree on a realistic timeline rather than make unrealistic promises.

---

## How do you work with non-technical clients?

I explain technical decisions in terms of business goals, user experience, performance, cost, and long-term maintainability rather than unnecessary technical jargon. My goal is to make sure clients understand what is being built, why certain decisions are being made, and how those decisions benefit the final product.

---

## What technologies do you usually work with?

My primary stack includes Go, Next.js, Laravel, and Kotlin. I also work with other technologies depending on the requirements of a project, choosing tools based on the product, architecture, and specific problem being solved.

---

## What happens if you become overloaded, sick, or stuck on a project?

I plan realistic timelines and avoid taking on more work than I can responsibly manage. If an unexpected issue affects a project, I communicate it as early as possible rather than leaving the client without an update. I also leave reasonable time for testing, revisions, and unexpected technical problems.

---

## Do you sign NDAs?

Yes, I'm comfortable signing an NDA when a project requires confidentiality. I respect client privacy and understand that some projects may involve confidential business information, product ideas, or source code.

---

## What happens after the project is launched?

I provide a clear handoff of the project, including the relevant code, documentation, deployment information, and instructions needed to manage it. If a client needs continued assistance, I can also provide maintenance, bug fixes, updates, and further improvements through an agreed support arrangement.

---

## How do you handle payments?

My standard payment structure is 50% upfront and 50% upon completion. For larger projects, I can divide the payment into milestones based on clearly defined deliverables. Development begins once the agreed initial payment has been received.

---

## Can you take over a project started by another developer?

Yes. I can take over existing or unfinished projects. However, I normally recommend a codebase audit first so I can understand the existing architecture, dependencies, incomplete features, technical issues, and remaining work. After the audit, I can provide a more accurate scope, timeline, and quote for completing the project.

---

## Where are you based, and do you work with international clients?

I'm based in Ogbomoso, Nigeria (WAT / UTC+1) and I'm open to working with clients internationally. I’m comfortable working asynchronously through clear communication, documentation, and regular progress updates, while also making time for meetings when needed.

---

## Are all the projects in your portfolio client projects?

No. My portfolio includes a combination of client projects, personal projects, and experimental builds. Client projects demonstrate my ability to work with real requirements and deliver for others, while personal projects allow me to explore new technologies, architectures, and product ideas. Each project is clearly labeled so visitors can distinguish between them.

---

# 26. Project Labels

Use clear labels throughout the Work section.

```text
CLIENT PROJECT
```

For genuine client work.

```text
PERSONAL PROJECT
```

For independently created projects.

```text
EXPERIMENT / CONCEPT
```

For experiments and concept builds.

This is important for portfolio credibility.

---

# 27. Availability

Add a small availability indicator.

Example:

```text
● AVAILABLE FOR SELECTED PROJECTS
```

Use a subtle animated indicator.

Do not imply unlimited availability.

---

# 28. Contact / CTA

Create a strong final section.

Headline:

# HAVE A PROJECT IN MIND?

Supporting text:

> Tell me what you're building, what problem you're trying to solve, and where you want to take it.

Primary CTA:

```text
START A CONVERSATION →
```

Secondary:

```text
VIEW MY WORK
```

---

# 29. Contact Information

Include:

```text
EMAIL
GITHUB
LINKEDIN
```

Optional:

```text
WHATSAPP
```

Only include links that are active and professional.

---

# 30. Location Consistency

The portfolio must consistently use:

```text
OGBOMOSO, NIGERIA
```

Do NOT leave old references to:

```text
LAGOS, NIGERIA
```

Update all occurrences, including:

- Hero
- About
- Footer
- Contact
- FAQ
- SEO metadata
- Structured data
- Social metadata if applicable

There should be exactly one current location across the site.

---

# 31. Footer

Use a very dark section:

```css
background: #04131B;
```

Example:

```text
JERRYBOSS

SOFTWARE ENGINEER
BUILDING DIGITAL SYSTEMS.

Ogbomoso, Nigeria

GitHub
LinkedIn
Email

© 2026
```

Add a small back-to-top action.

---

# 32. Typography

Recommended fonts:

### Primary

```text
Inter
```

or

```text
Manrope
```

or

```text
Geist
```

Use one primary typeface.

Optional:

Use a monospace font only for:

- Technology labels
- Metadata
- Small technical details

Do not make the whole portfolio monospace.

---

# 33. Spacing System

Use generous spacing.

Recommended scale:

```text
8px
12px
16px
24px
32px
48px
64px
96px
128px
```

Large sections should have:

```text
96px – 140px
```

vertical spacing on desktop.

Mobile:

```text
64px – 88px
```

---

# 34. Borders and Shadows

Keep them subtle.

Example:

```css
border: 1px solid rgba(160, 200, 215, 0.12);
```

Use soft shadows:

```text
0 20px 60px rgba(0, 0, 0, 0.18)
```

Do not make every card heavily shadowed.

Depth should come primarily from:

- Color
- Layering
- Spacing
- Contrast

---

# 35. Ocean Texture

If using the provided ocean image:

- Do not place it everywhere
- Do not make it the main project background
- Do not make it interfere with text
- Use it as a subtle visual layer

Possible uses:

### Hero background texture

Very low opacity.

### CTA background

Darkened and blurred.

### About image treatment

As a subtle overlay.

### Page transition / decorative strip

A thin section using the texture.

The texture should remain secondary to the content.

---

# 36. Animation Direction

Use calm, fluid motion.

The animation language should feel like:

> **water movement, not cyberpunk movement.**

Use:

- Slow opacity transitions
- Gentle image movement
- Soft hover transitions
- Smooth section reveals
- Subtle background movement

Avoid:

- Fast glitch effects
- Flickering
- Scan lines
- Aggressive cursor effects
- Constant floating
- Excessive parallax

---

# 37. Responsive Design

## Desktop

```text
1200px+
```

Use:

- Large hero
- Two-column layout
- Large project cards
- 3-column supporting grid

## Tablet

```text
768px – 1199px
```

Use:

- Reduced heading size
- Two-column or single-column hero depending on width
- Two-column project grid

## Mobile

```text
Below 768px
```

Use:

- Single-column layout
- Compact navigation
- Large readable heading
- Full-width buttons
- Single-column projects
- Simplified floating labels

---

# 38. Mobile Hero

Mobile order:

```text
SOFTWARE ENGINEER
BUILDING DIGITAL SYSTEMS.

Description

[VIEW WORK]
[LET'S TALK]

Profile image

OGBOMOSO, NIGERIA
```

Do not squeeze the desktop hero into mobile.

Recompose it properly.

---

# 39. Accessibility

Implement:

- Semantic HTML
- Proper heading hierarchy
- Descriptive alt text
- Keyboard navigation
- Visible focus states
- Accessible buttons
- Accessible mobile menu
- Sufficient contrast
- Reduced-motion support

Use:

```css
@media (prefers-reduced-motion: reduce)
```

to reduce animations.

---

# 40. SEO

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
- Twitter/X metadata where appropriate
- Canonical URL
- Structured data
- Descriptive project metadata

---

# 41. Performance

The dark visual design must not become heavy.

Priorities:

1. Fast initial render
2. Optimized images
3. Minimal JavaScript
4. Lazy loading
5. Efficient animations
6. No unnecessary dependencies

Project images should use:

```text
WebP
AVIF
```

where supported.

Avoid loading huge original screenshots.

---


# 43A. Premium Responsive Experience — Every Device

The portfolio must provide a **premium, intentional experience on every device**.

Responsive design is not simply a requirement to make the desktop layout fit smaller screens. Each breakpoint should feel deliberately designed while preserving the same visual identity.

The core principle is:

> **Desktop should feel premium. Tablet should feel premium. Mobile should feel premium.**

The layout can change significantly between devices, but the brand, hierarchy, typography, spacing, colors, imagery, and interaction quality must remain consistent.

---

## Desktop — 1440px+

Desktop should provide the full cinematic experience.

Use:

- Large editorial typography
- Spacious layouts
- Large project imagery
- Two-column hero
- Floating profile elements
- Generous whitespace
- Sophisticated but subtle hover interactions
- Wide project showcases
- Subtle ocean texture and depth

The desktop experience should feel **luxurious and expansive**, not simply empty.

---

## Laptop — 1024–1439px

The design must scale intelligently rather than simply shrinking the desktop version.

Requirements:

- Reduce hero typography progressively
- Reduce horizontal padding
- Preserve generous vertical spacing
- Maintain strong project imagery
- Keep navigation comfortable
- Prevent content from becoming cramped
- Recalculate grid proportions
- Preserve visual hierarchy

The site must remain visually balanced on common laptop resolutions such as:

```text
1280px
1366px
1440px
```

---

## Tablet — 768–1023px

Tablet should have its own composition.

Do not force the desktop layout into a narrow viewport.

The hero may transition from:

```text
TEXT                    IMAGE
```

to:

```text
TEXT

IMAGE
```

or use a balanced two-column layout where enough space remains.

Projects should generally use a two-column grid:

```text
┌──────────────┐  ┌──────────────┐
│   PROJECT    │  │   PROJECT    │
└──────────────┘  └──────────────┘
```

Typography, spacing, image ratios, and card dimensions should be intentionally adjusted for tablet.

---

## Mobile — 320–767px

Mobile is **not an afterthought**.

The mobile version should feel like a premium mobile product rather than a compressed desktop website.

Recommended hero structure:

```text
SOFTWARE
ENGINEER

BUILDING
DIGITAL
SYSTEMS.

Short supporting description

[ VIEW WORK ]

[ LET'S TALK ]

        PORTRAIT

OGBOMOSO · NIGERIA
```

Use:

- Large but controlled typography
- Intentional line breaks
- Full-width or near-full-width CTAs
- Comfortable touch targets
- Clean project cards
- Strong image cropping
- Minimal floating elements
- Simplified navigation
- Smooth scrolling
- Generous vertical rhythm

Do not simply scale the desktop hero down.

---

## Responsive Breakpoint Testing

The design must be tested at minimum at:

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

At every tested viewport there must be:

- No horizontal overflow
- No clipped text
- No overlapping elements
- No broken grids
- No overflowing buttons
- No distorted images
- No accidental layout shifts

---

## Fluid Typography

Avoid relying entirely on fixed font sizes.

Use fluid sizing where appropriate.

Example:

```css
font-size: clamp(3rem, 7vw, 7rem);
```

This allows the hero typography to scale naturally between devices.

Use `clamp()` for other important responsive values where useful:

- Headings
- Section spacing
- Container padding
- Gaps
- Image dimensions

---

## Fluid Spacing

Spacing should also scale with the viewport.

Example:

```css
padding-block: clamp(4rem, 10vw, 9rem);
```

The goal is to avoid:

- Desktop feeling cramped
- Mobile having enormous empty gaps
- Tablet layouts becoming visually awkward

Maintain a consistent visual rhythm while allowing spacing to adapt.

---

## Premium Project Cards on Mobile

Project cards must remain visually important on small screens.

Do not reduce them to tiny thumbnails.

Recommended mobile card structure:

```text
┌──────────────────────────┐
│                          │
│      PROJECT IMAGE       │
│                          │
├──────────────────────────┤
│ TITAN                    │
│ E-COMMERCE PLATFORM      │
│                          │
│ Next.js · Go · ...       │
│                          │
│ VIEW PROJECT →           │
└──────────────────────────┘
```

The project image remains a major part of the card.

Use:

- Strong aspect ratios
- High-quality optimized imagery
- Readable typography
- Comfortable spacing
- Clear project metadata
- Easy-to-tap project links

---

## Touch Interaction

Desktop hover interactions must have appropriate mobile equivalents.

For example:

```text
Desktop:
Hover → card lifts + image subtly scales

Mobile:
Tap → subtle interaction / navigation
```

Critical information must never depend on hover.

All important project actions must remain accessible through touch.

Touch targets should be comfortably sized for mobile interaction.

---

## Responsive Navigation

### Desktop

```text
JERRYBOSS    Home   Work   About   Skills   Contact    HIRE ME
```

### Mobile

```text
JERRYBOSS                                      ☰
```

The mobile menu should feel like a premium overlay rather than a default browser dropdown.

It should include:

- Clear navigation links
- Strong visual hierarchy
- Easy close action
- Large touch targets
- Smooth open/close animation
- Keyboard accessibility where relevant

---

## Responsive Images

Use responsive image rendering.

Images must:

- Maintain correct aspect ratios
- Load appropriate resolutions
- Use `object-fit: cover` where appropriate
- Avoid awkward cropping
- Lazy-load below-the-fold images
- Use modern formats such as WebP or AVIF where practical

The profile image and project imagery must remain visually strong even on small displays.

---

## Responsive Animation

Animation must adapt to the available device and interaction model.

Recommended direction:

```text
Desktop → Rich but subtle
Tablet  → Reduced
Mobile  → Simple + fast
```

Desktop may use:

- Hover effects
- Subtle parallax
- Image movement
- Cursor interactions where genuinely useful

Tablet should reduce the intensity.

Mobile should prioritize:

- Fast transitions
- Tap feedback
- Section reveals
- Minimal movement

Do not carry heavy desktop effects directly onto mobile.

Always respect:

```css
@media (prefers-reduced-motion: reduce)
```

---

## Device-Specific Visual Hierarchy

Do not assume the same element arrangement must be preserved at every breakpoint.

Instead, prioritize content differently where necessary.

### Desktop

Prioritize:

```text
Hero
↓
Project imagery
↓
Capabilities
↓
About
```

### Tablet

Prioritize:

```text
Hero
↓
Projects
↓
Capabilities
↓
About
```

### Mobile

Prioritize:

```text
Identity
↓
Primary CTA
↓
Projects
↓
Capabilities
↓
About
↓
Contact
```

The most important content should always remain easy to reach.

---

## Premium Responsive Quality Checklist

Before launch, verify the following on every major breakpoint:

- [ ] Typography remains balanced
- [ ] Hero remains visually powerful
- [ ] Project imagery remains high quality
- [ ] Cards maintain consistent proportions
- [ ] Buttons remain easy to tap
- [ ] Navigation remains intuitive
- [ ] No horizontal scrolling
- [ ] No overlapping content
- [ ] No awkward text wrapping
- [ ] Images do not become distorted
- [ ] Ocean texture remains subtle
- [ ] Background contrast remains strong
- [ ] Animations remain smooth
- [ ] Mobile animations are reduced appropriately
- [ ] Reduced-motion preferences are respected
- [ ] Content hierarchy remains clear
- [ ] Contact CTA remains easy to find
- [ ] Footer remains clean
- [ ] Performance remains strong

---

## Final Responsive Principle

The portfolio must never communicate:

> "This is a desktop website that happens to work on mobile."

It should communicate:

> **"This was designed to feel premium at this exact screen size."**

Every breakpoint should feel intentional.


# 42. Implementation Plan

## STEP 1 — Audit Existing Site

Before editing:

- Inspect current structure
- Identify framework
- Identify components
- Identify assets
- Identify existing project data
- Identify current location references
- Identify current tech stack references
- Identify current metadata
- Identify current animations

Do not destroy useful existing work.

---

## STEP 2 — Update Global Design Tokens

Replace the old color system with the Deep Ocean palette.

Implement:

```text
background
surface
surface-raised
text
muted
border
primary
accent
```

Test text contrast immediately.

---

## STEP 3 — Rebuild Navigation

Create:

- Dark floating nav
- Desktop links
- Mobile menu
- Hire Me CTA
- Sticky behavior
- Active state

---

## STEP 4 — Rebuild Hero

Implement:

- Large editorial heading
- Supporting copy
- Two CTA buttons
- Profile image
- Technical labels
- Location metadata
- Availability indicator

Use the ocean-inspired palette.

---

## STEP 5 — Rebuild Project System

Convert projects into reusable data-driven components.

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

---

## STEP 6 — Add Project Classification

Every project must be labeled:

```text
CLIENT PROJECT
PERSONAL PROJECT
EXPERIMENT / CONCEPT
```

Never misrepresent personal work as client work.

---

## STEP 7 — Build Selected Work

Create the visual hierarchy:

```text
Titan
Matchora
Luxora
```

as primary work.

Then:

```text
Taste Trails
Sally
JBet
```

as supporting work.

Reconsider this order if actual project quality suggests another ranking.

---

## STEP 8 — Build Capability Section

Create:

```text
WEB APPLICATIONS
BACKEND SYSTEMS
DEPLOYMENT & SYSTEMS
```

Keep descriptions short.

---

## STEP 9 — Build About

Use:

- Portrait
- Short engineering philosophy
- Experience/skills summary
- Link to CV or About page

---

## STEP 10 — Build Tech Stack

Lead with:

```text
GO
NEXT.JS
LARAVEL
KOTLIN
```

Then display supporting technologies separately.

---

## STEP 11 — Build FAQ

Add all ten finalized FAQ answers.

Use accordion components.

Only one or two answers should be expanded by default.

---

## STEP 12 — Build CTA and Contact

Add:

```text
HAVE A PROJECT IN MIND?
```

Then contact options.

---

## STEP 13 — Fix Location Everywhere

Search the entire project for:

```text
LAGOS
```

Replace outdated portfolio references with:

```text
OGBOMOSO
```

Do not blindly replace unrelated content.

Check:

- Hero
- About
- Footer
- Contact
- FAQ
- Metadata
- Structured data

---

## STEP 14 — Fix Tech Stack Consistency

Search the portfolio for existing primary-stack claims.

Ensure the primary public stack consistently says:

```text
GO
NEXT.JS
LARAVEL
KOTLIN
```

Supporting technologies can remain elsewhere.

Do not create contradictory lists.

---

## STEP 15 — Add Ocean Visual Layer

Introduce the uploaded ocean reference carefully.

Possible implementation:

```text
Background
↓
Deep navy
↓
Subtle ocean texture
↓
Content
```

Use low opacity.

The texture must never reduce text readability.

---

## STEP 16 — Add Motion

After the static design is complete:

- Hero reveal
- Project hover
- Image transitions
- Section reveal
- Button interactions
- Navigation transitions

Keep the movement slow and subtle.

---

## STEP 17 — Responsive Testing

Test:

```text
1440px
1280px
1024px
768px
480px
390px
360px
```

Verify:

- Hero
- Navigation
- Projects
- Images
- Typography
- Buttons
- FAQ
- CTA
- Footer

---

## STEP 18 — Accessibility Testing

Test:

- Keyboard navigation
- Focus states
- Screen-reader labels
- Color contrast
- Reduced motion
- Mobile navigation

---

## STEP 19 — Performance Testing

Check:

- Image sizes
- JavaScript bundle
- First render
- Layout shifts
- Animation performance
- Mobile performance

Remove anything decorative that has a meaningful performance cost without adding real value.

---

## STEP 20 — Final Consistency Audit

Search for contradictions.

Verify:

### Location

```text
OGBOMOSO, NIGERIA
```

### Primary stack

```text
GO
NEXT.JS
LARAVEL
KOTLIN
```

### Project classification

```text
CLIENT
PERSONAL
EXPERIMENT
```

### Positioning

```text
SOFTWARE ENGINEER
BUILDING DIGITAL SYSTEMS
```

Everything should communicate the same identity.

---

# 43. Final Page Architecture

```text
NAVIGATION
│
├── HERO
│   ├── Software Engineer
│   ├── Building Digital Systems
│   ├── Profile
│   ├── Location
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
│   └── Deployment & Systems
│
├── ABOUT
│   ├── Philosophy
│   └── Experience
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

# 44. Final Design Personality

The portfolio should feel like:

```text
DEEP
CALM
PRECISE
TECHNICAL
PREMIUM
CONFIDENT
HUMAN
```

Not:

```text
NEON
CYBERPUNK
AI-GENERATED
GAMIFIED
OVER-ANIMATED
GENERIC
```

The ocean reference should give the portfolio its **mood**, while the typography, projects, architecture, and content provide its **engineering identity**.

---

# 45. Final Success Criteria

The redesign is successful when a visitor can understand within the first 10 seconds:

1. Who you are
2. What you build
3. What technologies you work with
4. What projects you've built
5. Whether your work is client or personal
6. How to contact you
7. That you can work with clients internationally

The final impression should be:

> **A serious software engineer with strong product sense who can take a digital idea from concept to a working product.**
