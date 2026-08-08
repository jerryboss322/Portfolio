# JBOSS Portfolio --- DESIGN.md v3

## Final Refinement & Production Polish Plan

> **Status:** Refinement pass\
> **Goal:** Polish the current portfolio without replacing its approved
> visual direction.

------------------------------------------------------------------------

## 1. Design Direction

The current dark editorial direction is approved.

### Keep

-   Near-black background
-   Restrained electric-blue accent
-   Large project imagery
-   Asymmetric project layouts
-   Strong typography hierarchy
-   Small monospace metadata
-   Generous but controlled whitespace
-   Transparent portrait photography
-   Minimal borders and dividers
-   Motion that supports navigation

### Avoid

-   AI/neural-network aesthetics
-   Particle or star backgrounds
-   Glowing blobs
-   Excessive gradients
-   Glassmorphism
-   Fake statistics
-   Generic design-principle cards
-   Decorative UI with no purpose
-   Excessive rounded cards
-   Futuristic/terminal styling

The site should feel like a **serious engineer's personal portfolio**,
not an AI-generated portfolio template.

------------------------------------------------------------------------

## 2. Core Objective

The visitor should understand within seconds:

1.  Who JBOSS is
2.  What JBOSS builds
3.  Where to see the work

Core positioning:

> **JBOSS --- Software Engineer building useful digital products from
> interface to infrastructure.**

Primary audience: - Freelance clients - Startups - Product teams -
Technical collaborators - Potential employers

------------------------------------------------------------------------

## 3. Information Architecture

Use this order:

``` text
NAVIGATION
↓
HERO
↓
SELECTED WORK
↓
ABOUT
↓
CAPABILITIES
↓
TECH STACK
↓
CONTACT
↓
FOOTER
```

Do not add sections just to make the page longer.

------------------------------------------------------------------------

## 4. Navigation

Keep navigation minimal:

``` text
JBOSS                         Work   About   Contact   GitHub ↗
```

Requirements: - Sticky or intelligently visible - Near-black/transparent
background - Subtle border on scroll - Smooth anchor navigation - Very
subtle active state

Avoid large nav buttons, excessive icons, and decorative controls.

------------------------------------------------------------------------

## 5. Hero

The hero must establish personal identity immediately.

Recommended structure:

``` text
JBOSS

SOFTWARE ENGINEER

I BUILD DIGITAL
PRODUCTS THAT WORK.

Full-stack engineer focused on building
useful web applications, backend systems
and polished digital experiences.

[ View My Work ]   [ GitHub ↗ ]

                         [ PORTRAIT ]

LAGOS, NIGERIA
AVAILABLE FOR SELECTED PROJECTS
```

### Portrait

-   Use the transparent cutout
-   No circular avatar
-   No small profile thumbnail
-   No artificial frame
-   Large editorial crop
-   Allow overlap with the composition
-   Keep it integrated into the dark background

### Hero spacing

Reduce excessive empty space. The hero should feel spacious but not
vacant, with the main message visible above the fold on desktop.

------------------------------------------------------------------------

## 6. Selected Work

Projects remain the visual centerpiece.

Use editorial project previews instead of card grids.

Recommended format:

``` text
01 / E-COMMERCE PLATFORM

TITAN

Short project description.

Next.js · PostgreSQL · Vercel · ...

[ LARGE PROJECT IMAGE ]

View Project ↗
```

Alternate image/text alignment between projects.

------------------------------------------------------------------------

## 7. Project Spacing

The current project layouts are strong but can be tightened.

Reduce excessive vertical spacing by approximately **15--25%**.

Target feeling:

-   Spacious
-   Calm
-   Premium

Avoid:

-   Empty
-   Stretched
-   Unfinished

------------------------------------------------------------------------

## 8. Project Images

Project screenshots are the primary visual assets.

Requirements: - High resolution - Clean crops - Consistent
presentation - Subtle border - Very subtle hover scale - No heavy glow -
No unnecessary shadow

Desktop hover can use approximately:

``` text
scale: 1.00 → 1.015
```

------------------------------------------------------------------------

## 9. Project Copy

Every project needs:

1.  Name
2.  Category
3.  One-sentence explanation
4.  Technology list
5.  Working project link

Keep descriptions concise.

------------------------------------------------------------------------

## 10. Project Links

Only use **View Case Study** when a real case-study page exists.

Until then use:

``` text
View Project ↗
```

or:

``` text
Explore Project ↗
```

Every link must lead somewhere meaningful.

------------------------------------------------------------------------

## 11. Project Priority

Recommended order:

### 01 --- Titan

**E-commerce platform**

Showcases: - Frontend - Product design - Commerce UX - Application
architecture - Responsive UI

### 02 --- Luxora

**Luxury marketplace**

Showcases: - Premium UI - Product presentation - Three.js/WebGL -
Animation - Frontend engineering

### 03 --- TasteTrail

**Food discovery application**

Showcases: - Product thinking - Location-based functionality - API
integration - Backend architecture - Product UX

### 04 --- Matchora / JBets

**Sports platform**

Showcases: - Data-driven interfaces - Real-time information - Backend
systems - Complex UI

Use the strongest and most complete implementation first.

------------------------------------------------------------------------

## 12. About

Keep the portrait + text composition.

Improve the copy so it feels personal rather than generic.

Recommended direction:

``` text
02 — ABOUT

I build web products from
interface to infrastructure.

I'm a software engineer focused on
full-stack applications, backend systems
and polished digital experiences.

I enjoy taking complex ideas and turning
them into software that is fast, clear
and actually useful.

SOFTWARE ENGINEER
LAGOS, NIGERIA
```

Do not make this a corporate biography.

------------------------------------------------------------------------

## 13. Capabilities

Replace the old philosophical engineering-system cards with practical
capabilities.

``` text
WHAT I BUILD

01
FULL-STACK DEVELOPMENT

Production-ready web applications
from interface to backend.

02
BACKEND & APIs

Reliable APIs, databases and
application architecture.

03
PRODUCT ENGINEERING

Turning product ideas into
functional digital experiences.

04
INTERACTIVE FRONTENDS

Responsive interfaces with
intentional interaction and motion.
```

Keep this compact.

------------------------------------------------------------------------

## 14. Tech Stack

Do not create a wall of logos.

Use grouped text:

``` text
TECH STACK

FRONTEND
React · Next.js · TypeScript · JavaScript

BACKEND
Node.js · Express · Django · REST APIs

DATABASE
PostgreSQL · Redis

TOOLS
Git · GitHub · Vercel · VS Code

OTHER
Three.js · Unity · C# · Python
```

Only list technologies that can confidently be discussed with a client
or interviewer.

------------------------------------------------------------------------

## 15. Contact

Keep the current contact structure.

``` text
HAVE A PROJECT IN MIND?

Let's build something useful.

Email ↗
GitHub ↗
LinkedIn ↗
```

Form fields: - Name - Email - Message

Primary action:

``` text
Send Message
```

Keep the form simple.

------------------------------------------------------------------------

## 16. Availability

Use:

``` text
AVAILABLE FOR SELECTED PROJECTS
```

Only if accurate. Avoid fake urgency.

------------------------------------------------------------------------

## 17. Footer

Keep it minimal:

``` text
JBOSS
Software Engineer · Lagos, Nigeria

GitHub ↗
LinkedIn ↗
Email ↗

© 2026 JBOSS
```

No giant footer navigation.

------------------------------------------------------------------------

## 18. Typography

Use a modern sans-serif for primary content.

Hierarchy:

``` text
Display
Very large / bold

Section heading
Large / semibold

Project title
Medium-large / semibold

Body
Readable / restrained

Metadata
Small / monospace / uppercase
```

Metadata should remain subordinate.

------------------------------------------------------------------------

## 19. Color System

Recommended:

``` text
Background: near-black
Primary text: off-white
Secondary text: muted gray
Accent: restrained electric blue
Border: low-contrast blue-gray
```

Use blue for: - Active navigation - Project numbers - Small labels -
Links - Primary actions - Subtle interaction states

Do not make the entire interface blue.

------------------------------------------------------------------------

## 20. Motion

Motion should communicate hierarchy.

Use: - Reveal-on-scroll - Small image scale on hover - Link-arrow
movement - Gentle text transitions - Navigation transitions

Avoid: - Looping decorative animations - Particle systems - Excessive
parallax - Spinning elements - Animated backgrounds - Long entrance
animations

Principle:

> **Motion should explain the interface, not advertise the animation
> system.**

------------------------------------------------------------------------

## 21. Responsive Design

Mobile must be deliberately designed rather than being a compressed
desktop layout.

Desktop:

``` text
IMAGE | TEXT
```

Mobile:

``` text
NUMBER
CATEGORY

TITLE

IMAGE

DESCRIPTION
STACK
LINK
```

Requirements: - No horizontal overflow - Comfortable typography -
Portrait remains visible - Project images remain prominent - Compact
navigation - One-column contact form - Reduced decorative spacing

------------------------------------------------------------------------

## 22. Accessibility

Maintain: - Semantic headings - Accessible navigation - Visible focus
states - Sufficient contrast - Descriptive alt text - Keyboard
navigation - Reduced-motion support

Use:

``` css
@media (prefers-reduced-motion: reduce) {
  /* disable non-essential motion */
}
```

------------------------------------------------------------------------

## 23. Performance

The portfolio should demonstrate engineering quality.

Prioritize: - Optimized images - Lazy-loaded below-fold images -
Responsive image sizes - Minimal JavaScript - No unnecessary animation
libraries - Small decorative asset footprint - Fast initial rendering

Do not sacrifice performance for effects.

------------------------------------------------------------------------

## 24. Credibility Rules

Never use fabricated claims.

Remove metrics such as:

``` text
14+ PROJECTS SHIPPED
60% DEBT REDUCTION
100% NATIVE FRONTEND
```

unless they are verifiable and genuinely meaningful.

Demonstrated work is more convincing than questionable statistics.

------------------------------------------------------------------------

## 25. Content Voice

The portfolio should sound:

-   Confident
-   Concise
-   Technical
-   Human
-   Calm
-   Direct

Avoid: - Buzzword stacking - Exaggerated claims - "Revolutionary" -
"Cutting-edge" - "World-class" - "AI-powered" unless genuinely
relevant - Corporate filler

------------------------------------------------------------------------

## 26. Final Visual Target

``` text
                    JBOSS

              SOFTWARE ENGINEER

          I BUILD DIGITAL PRODUCTS
                 THAT WORK.

                  [PORTRAIT]


             ↓ SELECTED WORK


01 / E-COMMERCE PLATFORM

                 TITAN

        ┌────────────────────────┐
        │     LARGE SCREENSHOT   │
        └────────────────────────┘

      Description · Stack · View


02 / LUXURY MARKETPLACE

      Description          ┌─────────────┐
                           │  SCREENSHOT │
                           └─────────────┘


03 / FOOD DISCOVERY

        ┌─────────────┐
        │  SCREENSHOT │
        └─────────────┘


                 ABOUT

      [PORTRAIT]      I build web
                      products from
                      interface to
                      infrastructure.


             WHAT I BUILD

        FULL-STACK
        BACKEND
        PRODUCT ENGINEERING
        INTERACTIVE FRONTENDS


               TECH STACK


             LET'S WORK

              [ FORM ]


                 JBOSS
```

------------------------------------------------------------------------

## 27. Implementation Order

### Phase 1 --- Hero

-   Refine headline
-   Improve portrait positioning
-   Reduce hero whitespace
-   Improve CTA hierarchy
-   Add location/availability metadata

### Phase 2 --- Projects

-   Tighten vertical spacing
-   Make Titan the flagship
-   Standardize metadata
-   Replace fake case-study links
-   Verify project links
-   Improve image crops

### Phase 3 --- About

-   Rewrite copy
-   Keep portrait composition
-   Add concise focus information

### Phase 4 --- Capabilities

-   Remove old engineering-principle cards
-   Add practical capabilities
-   Keep the section compact

### Phase 5 --- Tech Stack

-   Simplify grouping
-   Remove irrelevant technologies
-   Avoid logo overload

### Phase 6 --- Contact

-   Keep existing structure
-   Improve copy
-   Verify email/social links
-   Verify form submission

### Phase 7 --- Responsive

Test: - 1440px - 1280px - 1024px - 768px - 480px - 375px

### Phase 8 --- Final Polish

-   Typography
-   Spacing
-   Hover states
-   Focus states
-   Image optimization
-   Animation timing
-   Accessibility
-   Performance

------------------------------------------------------------------------

## 28. Definition of Done

-   [ ] Hero communicates who JBOSS is immediately
-   [ ] Portrait feels intentional and editorial
-   [ ] Selected work dominates the visual experience
-   [ ] Titan is clearly the flagship project
-   [ ] Project spacing feels premium rather than empty
-   [ ] Every project has accurate information
-   [ ] No fake metrics remain
-   [ ] No unnecessary AI visual effects remain
-   [ ] About section feels personal
-   [ ] Capabilities describe actual engineering work
-   [ ] Tech stack is concise
-   [ ] Contact form works
-   [ ] GitHub / LinkedIn / email links work
-   [ ] Mobile layout is intentionally designed
-   [ ] Reduced-motion behavior works
-   [ ] Images are optimized
-   [ ] No horizontal overflow
-   [ ] No broken links
-   [ ] No console errors
-   [ ] Performance issues are addressed
-   [ ] The site feels like a real engineer's portfolio, not a template

------------------------------------------------------------------------

## 29. Final Principle

> **Do not redesign for the sake of redesigning.**
>
> The current visual direction is good. The next step is precision.
>
> The portfolio should be remembered for **the quality of the work, the
> clarity of the engineering, and the personality of JBOSS --- not the
> amount of visual effects.**
