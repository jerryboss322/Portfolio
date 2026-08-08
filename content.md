# JBOSS Portfolio — Content Plan (Final, Expanded)

## Purpose

Give the Hero, About, and Work sections enough real substance that the
site reads as written by the engineer who built the work — not generated
copy sitting on top of a nice layout. Every section below includes not
just the copy, but the reasoning behind it, so decisions can be revisited
later without losing the "why."

Keep the existing visual system as-is — this file only changes words,
not layout or motion:
- Dark editorial aesthetic, near-black background
- Restrained blue accent
- Strong typography, large portrait treatment
- Minimal cards, large project imagery
- Subtle motion

---

## ⚠ One open item — needs your decision before finalizing

**TasteTrail vs. NEON_BITES.** The live site (tastetrail.vercel.app) is
currently a single-restaurant ordering menu: category filters (All / Main
Course / Sushi / Desserts / Drinks) and a live running cart total. There
is no restaurant discovery, no location data, and no multi-restaurant
browsing visible anywhere on the deployed build.

The description in earlier drafts of this plan (and in the original
implementation.md content notes) described TasteTrail as *"a
location-based food discovery app that surfaces authentic, locally-owned
restaurants with personalized recommendations."* That's a materially
different product from what's live.

This matters because a portfolio project description is a claim a visitor
can verify in one click. If the description promises restaurant discovery
and the link shows a single restaurant's ordering menu, that's the kind
of mismatch that undermines trust in every other project description on
the page — even the accurate ones.

Two ways to resolve it, and I need you to pick one:

1. **The live build is the real scope.** In that case, the description in
   this file (food ordering, category filters, cart) is correct as-is —
   no further changes needed.
2. **The discovery/multi-restaurant version is a planned next phase**,
   and NEON_BITES is an earlier milestone of the same project. In that
   case, either (a) describe only what's live and mention the discovery
   layer as "in progress" rather than shipped, or (b) hold off featuring
   this project on the homepage until the discovery layer is live, since
   an in-progress project competing for attention next to four finished
   ones can undercut the "these are real, working products" framing the
   whole redesign is built around.

Everything else in this file has been checked against the live project
URLs and matches what's actually deployed.

---

# PART 1 — HERO

## What the Hero has to do, and why it's structured this way

The hero is the only section every visitor sees without scrolling. Its
single job is answering "what do you do?" fast enough that someone
skimming — a recruiter with twenty tabs open, a client comparing three
developers — gets the answer before they've decided whether to keep
reading. That means every line in the hero is competing with every other
line for a very small amount of attention, so nothing generic earns its
place here. A sentence that could sit on any developer's portfolio
(“I create innovative solutions”) does zero work in this position — it
fills space without communicating anything a reader couldn't have
guessed.

The structure below (eyebrow → headline → supporting copy → metadata →
CTA → location) is ordered from broadest claim to most specific and
actionable, so a reader who bails after any one line still walks away
with something concrete.

### Eyebrow
```
SOFTWARE ENGINEER · DIGITAL PRODUCT BUILDER
```
**Why this wording:** "Software Engineer" alone is a job title; it says
what you are but not what you do with the title. Pairing it with
"Digital Product Builder" signals that you think about the full product
— not just writing code to a spec — which matters if the visitor is
evaluating whether you can own a feature or a project end-to-end rather
than just implement tickets.

### Headline
> **I build full-stack products — from interface to infrastructure.**

**Why this replaces the earlier "built to work — and built to last"
version:** that line is well-constructed as a sentence (rhythm, parallel
structure) but it's a sentence any competent engineer could put on their
site — it makes a quality claim without any evidence attached to it, and
quality claims without evidence are exactly the kind of thing your
original design.md flagged as something to strip out. "Full-stack, from
interface to infrastructure" instead states an actual, checkable fact
about your work: you don't just do frontend, and you don't just do
backend — the five projects in the Work section back this up directly
(Titan's Postgres-backed cart and auth, Luxora's Three.js frontend work,
Jbet's wallet/payment integration). The headline is only credible because
the projects prove it; that's the relationship this whole plan is trying
to build between sections.

### Supporting copy
> I'm a software engineer who works across the full lifecycle of a
> product — frontend interfaces, backend systems, databases, and the
> infrastructure that ties it together. I care less about how something
> looks in isolation and more about whether it actually works: fast,
> reliable, and simple for someone else to use.
>
> I've shipped e-commerce platforms, sports-data products, and internal
> tools across Go, Next.js, Laravel, and Kotlin — usually solo, always
> end-to-end.

**Why two paragraphs, and why the second one is optional:** the first
paragraph explains *how you think* about building software (outcome over
appearance) — this is the part that differentiates you from someone who
can also write "I build full-stack products" but means something
different by it. The second paragraph is where the technology range
becomes concrete instead of implied. It's marked optional because there's
a real tradeoff: including it makes the hero more convincing to a
technical reader who cares about stack breadth, but it also lengthens the
first screen, which works against the "answer the question fast" goal
this section exists for. If your analytics or feedback later show people
aren't scrolling past the hero, cut the second paragraph and let the Work
section carry that information instead — the project tech tags already
say most of it.

**What to avoid if you edit this further:** don't let this drift into a
skills list ("proficient in React, Node.js, PostgreSQL..."). The moment
the hero starts sounding like a resume's skills section, it stops
sounding like a person explaining what they do and starts sounding like
a document optimized for keyword matching.

### Metadata line
```
FRONTEND · BACKEND · APIs · PRODUCT ENGINEERING
```
**Why it's here at all:** this is a scannable summary for someone who
reads headlines and skips paragraphs — a very common reading pattern on
a first visit. It repeats information from the supporting copy on
purpose; redundancy here is a feature, not a flaw, because it serves
readers who never read the paragraph in the first place.

### CTAs
- Primary: `VIEW MY WORK →`
- Secondary: `LET'S WORK TOGETHER →`

**Why these two, and why in this order:** the primary CTA should always
point at proof (the Work section), not at the ask (contact), because a
visitor hasn't earned the right to be asked for a commitment before
they've seen evidence you can do the work. Putting "Let's Work Together"
first would be asking for trust before it's been established. The
secondary CTA exists for the smaller set of visitors who arrive already
convinced (a referral, someone who already reviewed your GitHub) and
don't need to see projects first — it should be visually secondary
(outline vs. filled button, matching what's already live) to reflect that
it serves a smaller intent.

### Personal metadata
```
LAGOS, NIGERIA   ·   AVAILABLE FOR SELECT PROJECTS
```
**Why location is included:** for freelance/contract work, location
signals timezone overlap and, for some clients, a preference for local
talent — leaving it out doesn't make you seem more "global," it just
removes information a prospective client would otherwise have to ask for.

**Why "only when accurate":** an availability badge that's wrong in
either direction costs you. If it says available and you're not, you get
inbound messages you have to decline, which wastes both sides' time and
reads as disorganized. If you're actually available but the badge is
stale and says unavailable, you lose leads silently with no way to know
it's happening. This is a small line but it's one of the few claims on
the page that changes state over time, so it needs a habit attached to it
— check it whenever your actual availability changes, not just when you
remember to.

### Word count target
70–120 words (single paragraph version). ~140 if using both paragraphs.
**Why this range:** below ~70 words the hero starts feeling like a
tagline rather than an introduction — technically confident but thin.
Above ~150, you're asking a first-time visitor to read a full paragraph
before they've decided whether to trust you, which is the wrong order of
operations. This range is a guideline, not a hard rule — if a specific
sentence needs 15 more words to avoid sounding vague, use them.

---

# PART 2 — ABOUT

## What About has to do differently from the Hero

Where the Hero answers "what do you do," About answers "who are you and
how do you think" — a different question that needs a different kind of
answer. A common failure mode in portfolio copy is writing the About
section as a longer, more detailed version of the Hero, which wastes the
reader's time twice on the same information. The paragraphs below are
each doing a distinct job: introduction, process, values, and learning
posture. If you ever feel tempted to trim this section, check first
whether you're accidentally duplicating something the Hero already said
— that's the trim to make, not cutting a paragraph that's saying
something new.

### Heading
> **I'm a software engineer who likes building things from the ground up.**

**Why this heading and not a restatement of the hero headline:** "from
the ground up" signals a specific working style — building foundational
systems rather than assembling from templates or no-code tools — which is
a meaningfully different claim from "full-stack." It also sets up the
paragraph that follows about breaking problems into smaller systems,
so the heading and body aren't just adjacent, they're connected.

### Full body copy

> I'm a software engineer with a strong interest in building useful,
> reliable, and well-crafted digital products. I work across the stack —
> designing interfaces, building frontend experiences, and developing the
> backend systems, APIs, databases, and infrastructure that hold
> everything together.

**Job of this paragraph:** the introduction. It restates the "full-stack"
claim from the hero once, briefly, because a reader may land directly on
About via anchor link or navigation without having read the Hero at all
— but it doesn't re-explain it at length, since the Hero already owns
that job for readers who did start at the top.

> What interests me most is the process of turning a problem into a
> product. I like taking an idea that starts as a rough concept, breaking
> it into smaller systems, working out how those systems talk to each
> other, and turning the result into something real that people can
> actually use.

**Job of this paragraph:** process. This is the paragraph that shows
*how* you approach a project, which is the thing a hiring manager or
client is actually trying to assess when they read an About section —
not just what technologies you know, but whether you think in a way
they'd trust with an ambiguous problem.

> I care about the details that are easy to skip past: how quickly an
> interface responds, how a component behaves across different states,
> how data moves through an application, whether the architecture holds
> up as it grows, and whether the finished product genuinely makes sense
> to the person using it.

**Job of this paragraph:** values, made concrete. The word "care" alone
is a cliché ("I'm passionate about..."), so this paragraph immediately
follows it with five specific, checkable things — response time,
component states, data flow, scalability, usability — so the claim isn't
just an assertion, it's a list a technical reader can actually evaluate
against your project work.

> I'm constantly building — sometimes on product experiences, sometimes
> on backend systems or automation, sometimes on something more
> technical just to understand it better. Each project is a chance to go
> deeper on something and get better at how I build.

**Job of this paragraph:** learning posture, and it doubles as an honest
explanation for why your project list spans so many different domains
(e-commerce, sports betting, book marketing, food ordering) and stacks
(Go, Next.js, Laravel, Kotlin) — without this paragraph, that breadth
could read as unfocused; with it, it reads as a deliberate practice of
learning by building different things, which matches what your actual
project history shows.

### Closing pull-quote
> **My goal is simple: build software that is useful, technically sound,
> and genuinely enjoyable to use.**

**Why a pull-quote here:** visually, a larger standalone line gives the
reader's eye a resting point after four paragraphs of body text, and
gives anyone skimming (rather than reading) a single sentence that
summarizes the whole section if that's all they read.

### Word count
~230 words body + closing line. Target range for the section overall:
300–500 words including "What I Bring." **Why this floor matters for
you specifically:** you flagged the site as feeling "scanty" — this is
the section most responsible for that feeling if it's under-filled,
because Hero is *supposed* to be short, but About is where a visitor
expects more depth. Staying under ~300 words here is very likely what's
been reading as thin.

---

## What I Bring (secondary column)

**Why this column exists as a separate block rather than folded into the
paragraphs above:** the About paragraphs are narrative and have to be
read in order to make sense. This column is the opposite — scannable,
non-linear, four independent claims a reader can skim in any order. It
also fills the secondary space in the layout (per the wireframe in the
original design.md) without padding the narrative copy artificially just
to balance the page visually.

**01 — Product Thinking**
> I don't just think about individual screens or features. I think about
> how the complete product works, and how each part serves the user's
> actual goal.

*Why this one first:* it's the same claim as the About process
paragraph, restated in one scannable line — deliberately, since this
column exists for skimmers who won't read the paragraph above it.

**02 — Full-Stack Engineering**
> I work across interface, application logic, APIs, databases, and the
> supporting systems needed to take an idea to a working product.

*Why it's second:* pairs with the Hero's core claim, so a reader who
jumps straight to About still gets the full-stack claim reinforced here.

**03 — Attention to Detail**
> Performance, responsive behavior, accessibility, interaction states,
> typography, and the small usability decisions all matter to the final
> result.

*Why this one matters for you specifically:* your project audits (Luxora,
Titan) have repeatedly surfaced exactly these categories — broken
Tailwind references, missing cart state, typography gaps — as the
highest-leverage issues. This line is credible precisely because it
matches the kind of problems you've actually caught and fixed in your own
past work.

**04 — Continuous Learning**
> I enjoy testing new tools and approaches while keeping the fundamentals
> that make software reliable.

*Why it's last:* it's the lowest-stakes claim of the four — every
engineer says something like this — so it closes the list rather than
opening it, letting the more specific claims (02, 03) carry more weight
by going first.

---

## Optional: Beyond the Code

**When to actually add this section, and when not to:** only if, after
implementing everything above, the About section on an actual rendered
page still has more empty vertical space than content — which is a
visual judgment you'll need to make once it's live, not something to
decide from the markdown alone. Adding it preemptively risks the opposite
problem from "scanty": padding, which reads just as poorly to a careful
reader as thinness does.

**Heading:** `BEYOND THE CODE`

> I'm naturally curious about how things work — that curiosity is a big
> part of why I enjoy engineering. There's always another layer to
> understand or a better way to solve something.
>
> I'm especially drawn to projects where I have to learn as I go, rather
> than follow a pattern I already know.

Keep this short — two to three sentences maximum. If it starts growing
past that, it's competing with the main About copy rather than
supplementing it.

---

# PART 3 — SELECTED WORK (verified against live sites)

## Structure and reasoning for the Work section overall

Every entry follows the same shape — **Category → Name → Homepage
description (one sentence) → Tech → Link** — deliberately, because
consistent structure across five different projects is what lets a
reader compare them quickly rather than having to re-orient with each new
card. The homepage description is intentionally short (one sentence);
anything longer belongs on a case-study page, not the homepage, because
the homepage's job is to get someone to click into a project that
interests them, not to fully explain the project before they've even seen
a screenshot.

Each description below was checked against the actual deployed site, not
written from memory or from older planning documents — several
mismatches surfaced doing this (detailed per-project below), which is
exactly the kind of gap a portfolio can't afford, since these are the
easiest claims on the entire site for a visitor to verify.

---

### 01 — Titan
**Category:** `E-COMMERCE PLATFORM`
**Live:** titan-teal.vercel.app

**Homepage description:**
> A full-stack storefront with real product data, categories, cart,
> wishlist, and authentication — not a static template. Built to handle
> the complete path from browsing to checkout.

**Why this description, specifically:** the live site has genuinely
functioning product categories (Men/Women/Accessories/Home), a working
cart and wishlist, and real sign-in/sign-up flows — this isn't a design
mockup with fake buttons. The phrase "not a static template" is doing
real work here: it preempts the most likely skeptical read of an
e-commerce portfolio piece (is this just a themed template with no real
functionality?) and answers it directly rather than hoping the reader
gives you the benefit of the doubt.

**Tech:** `NEXT.JS · TYPESCRIPT · POSTGRESQL · VERCEL`

**Extended description (for case-study page only, not homepage):**
> Titan is a full-stack commerce platform built around the complete
> customer journey — product discovery through browsing and category
> pages, a persistent cart and wishlist, and account-based checkout
> backed by real authentication rather than a mocked login state. The
> product catalog, cart state, and user accounts are all backed by
> PostgreSQL rather than static or hardcoded data, which means the
> storefront behaves like a real store: items persist in the cart across
> sessions, wishlist state is tied to the signed-in account, and product
> data can change without a redeploy.

---

### 02 — Luxora
**Category:** `LUXURY MARKETPLACE`
**Live:** luxora-self-two.vercel.app

**Homepage description:**
> A product showroom built around presentation, not just listings —
> collections arranged like a gallery, with a still product photo
> transitioning into an interactive 3D model on interaction.

**Why this description, specifically:** the live site's own copy calls
itself "a quiet theatre of crafted objects" and explicitly describes the
still-photo-to-3D-model transition as its signature interaction. This
description leans into that because it's the most differentiated, least
generic thing about the project — most e-commerce portfolio pieces don't
have a real-time 2D-to-3D reveal, so naming it specifically is more
convincing than a general "immersive design" claim would be.

**Tech:** `REACT · THREE.JS · GSAP · FRAMER MOTION · SANITY CMS`

**Extended description (for case-study page only):**
> Luxora reimagines a product marketplace as a curated showroom rather
> than a grid of listings — collections are presented like gallery
> installations, and the centerpiece interaction lets a static product
> photograph dissolve into a fully interactive 3D model, giving each
> object a sense of physical presence that a flat photo can't. Built with
> React Three Fiber for the 3D layer, GSAP for the showroom's scroll
> choreography, and Sanity as a headless CMS so collections and featured
> objects can be managed without touching code.

---

### 03 — TasteTrail
**Category:** `FOOD ORDERING APP` *(pending your answer on the flag above)*
**Live:** tastetrail.vercel.app

**Homepage description:**
> An ordering experience with category-filtered menu browsing and a live
> running cart — built to make choosing and confirming an order fast,
> with no friction between menu and checkout.

**Why this description, specifically, and why it changed from earlier
drafts:** the live build (branded on-page as "NEON_BITES") shows category
tabs (All / Main Course / Sushi / Desserts / Drinks), individual menu
items with an "Add" action, and a running cart total with a confirm-order
flow. There's no restaurant search, no location data, and no listing of
multiple restaurants anywhere in the deployed build. Earlier drafts
described a multi-restaurant discovery app with personalized
recommendations — that description doesn't match what a visitor would
actually see clicking through, so it's been rewritten to describe only
what's verifiably live. See the flag at the top of this document — this
is the one entry in the whole Work section still waiting on your
confirmation before it's final.

**Tech:** `REACT · NODE.JS · POSTGRESQL`
*(placeholder — confirm the actual stack; Redis and Mapbox appeared in an
earlier draft but don't correspond to any feature visible in the current
single-restaurant ordering flow, so they've been removed pending
confirmation)*

**Extended description:** *(hold off writing this until the category and
scope question above is resolved — writing a detailed case study before
the basic facts are confirmed means rewriting it twice)*

---

### 04 — Sally Green
**Category:** `BOOK MARKETING PLATFORM`
**Live:** sallygreenmarketing.vercel.app

**Homepage description:**
> A marketing and analytics site built for an author-services client —
> combining a data-driven results dashboard, structured case studies, and
> a lead-capture flow designed around converting inbound author inquiries.

**Why this description, and an important caution about this one
specifically:** the live site is a client-facing marketing page for
"Sally Green — Strategic Book Architect," an author-marketing service.
The site itself carries strong claims — "£98,627 Attributed Revenue,"
"Verified 2024–2025 · Forensic Audit," named author testimonials — but
those are the *client's* marketing claims about the client's service,
not verifiable facts about your engineering work. The description above
deliberately describes what you built (a dashboard, a case-study
structure, a lead-capture funnel) rather than repeating the client's
revenue numbers as if they were your own credibility metric. If a future
draft of this copy is tempted to cite "£98,627 in attributed revenue" as
proof of your work's impact, that's worth catching before it ships —
it's the client's unverified claim about their business outcomes, not a
measurable result of the site you built, and presenting it as such would
be exactly the kind of fabricated-metric problem the original design.md
explicitly told you to remove from the old site.

**Tech:** *(placeholder — confirm actual stack used)*

**Extended description:**
> Built for an author-marketing client, this site combines a results
> dashboard, structured case-study sections, and a conversion-focused
> inquiry flow designed to turn visiting authors into qualified leads. The
> build required translating a fairly aggressive, data-heavy marketing
> voice into a working, responsive site with animated stat displays,
> testimonial sections tied to real author names, and a functioning
> contact/diagnostic-request form — while keeping the site's own
> commercial claims clearly the client's positioning, not overstated
> engineering claims of your own.

---

### 05 — Jbet
**Category:** `SPORTS BETTING PLATFORM`
**Live:** jbet.vercel.app

**Homepage description:**
> A football betting platform for the Nigerian market — live odds across
> multiple leagues, a persistent bet-slip, and instant wallet funding
> through local rails like Opay, Palmpay, and bank USSD.

**Why this description, specifically:** the live build shows real
football leagues (EPL, La Liga, Serie A), a functioning bet-slip with
running totals and potential winnings, account creation/sign-in, and a
wallet deposit flow with actual Nigerian payment providers named on the
page. This is the most technically substantial of the five projects —
real-time odds data, session/wallet state, and payment integration — so
the description leans on specifics (which leagues, which payment rails)
rather than a generic "sports betting site" framing, since the specifics
are what actually demonstrate the engineering depth.

**A framing note worth keeping in mind, not changing right now:** betting
platforms are a legitimate and technically demanding category of product
to have built, but some readers — certain recruiters, employers in
regulated industries, or clients in some countries — treat gambling-
adjacent work as a soft flag on a portfolio. Nothing here suggests
removing the project; it's clearly one of your strongest technical
pieces. But if you ever write the extended case-study for this one,
lead with the engineering (real-time data, wallet/payment integration,
session handling) rather than the betting domain itself — the description
above already does this, and the case-study version should keep doing it.

**Tech:** *(placeholder — confirm actual stack used)*

**Extended description:**
> Jbet is a full sports-betting platform built for the Nigerian market,
> covering live odds across multiple football leagues, a persistent
> bet-slip that tracks selections and calculates potential winnings in
> real time, and account creation with session-based authentication. The
> wallet system integrates local Nigerian payment rails — Opay, Palmpay,
> GTBank, and USSD — for instant deposits, and the platform includes
> licensing and responsible-gambling messaging consistent with regulated
> betting products.

---

## Project display rule

Keep extended descriptions off the homepage entirely — the homepage
stays fast, visual, and scannable. Full depth (Challenge / Process /
Solution, or Problem / Approach / Architecture / Result for a longer
template) lives on a dedicated case-study page, and only once there's
real material to fill it — a case-study page built around a placeholder
paragraph is worse than not having the page at all, since it invites a
reader in on the promise of depth and then delivers less than the
homepage card already gave them.

---

# PART 4 — Implementation Checklist

Each item below includes not just what to do, but what "done" actually
looks like, so this checklist can be handed off or revisited without
needing this whole document re-read first.

## Hero

- [ ] **Replace eyebrow + headline.** Done when the live hero shows
      "SOFTWARE ENGINEER · DIGITAL PRODUCT BUILDER" and the new headline
      — not the current "I build digital products that solve real
      problems" placeholder still live as of the last screenshots.
- [ ] **Add new supporting copy.** Decide first whether you're using one
      paragraph or two (see word-count section above) — don't add both
      "just in case," pick one so the hero doesn't run long.
- [ ] **Update CTAs.** Primary button text becomes "View My Work,"
      secondary becomes "Let's Work Together" — confirm both still link
      to the right anchors/pages after the text change.
- [ ] **Keep portrait as-is for now.** Don't block this checklist item on
      a new photo — swap it in later once you have a source shot with
      direct eye contact and even lighting (see earlier portrait
      discussion). Shipping with the current portrait is better than
      delaying the whole content update for it.
- [ ] **Confirm availability line reflects current reality** at the
      moment you deploy this change, not whenever it was originally
      written.

## About

- [ ] **Replace heading + full body copy** — all four paragraphs, in
      order; don't drop one to save space, since each is doing a
      distinct job per the breakdown above.
- [ ] **Add "What I Bring" column** with all four items.
- [ ] **Hold off on "Beyond the Code"** until the section is live and
      you can actually see whether it needs the extra content.

## Work

- [ ] **Resolve the TasteTrail flag** — this blocks finalizing that one
      card; everything else in Work is ready to ship independent of this.
- [ ] **Confirm TasteTrail's real tech stack** once scope is confirmed.
- [ ] **Confirm Sally Green's actual tech stack** (currently a
      placeholder in this doc).
- [ ] **Confirm Jbet's actual tech stack** (currently a placeholder).
- [ ] **Do not copy Sally Green's on-site revenue/audit claims into your
      own portfolio copy** — this is the one item on this checklist most
      worth double-checking before publishing, since it's the kind of
      mistake that's easy to make by accident (copy-pasting from the
      client site while writing the description) and hard to walk back
      once it's live and someone's already seen it.
- [ ] **Do not build case-study pages for any project until there's real
      material to fill Challenge/Process/Solution** — a thin case-study
      page undersells a project more than having no case-study page at
      all.
