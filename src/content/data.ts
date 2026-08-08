export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  year: string;
  summary: string;
  description: string;
  image: string;
  gallery: string[];
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  challenge: string[];
  process: string[];
  solution: string[];
  metrics: Metric[];
  outcome: string;
}

export const projects: Project[] = [
  {
    slug: 'titan',
    title: 'Titan Commerce',
    subtitle: 'E-commerce Platform',
    role: 'Lead Frontend Engineer',
    year: '2025',
    summary:
      'A full-stack storefront with real product data, categories, cart, wishlist, and authentication — not a static template. Built to handle the complete path from browsing to checkout.',
    description:
      'Titan is a full-stack commerce platform built around the complete customer journey — product discovery through browsing and category pages, a persistent cart and wishlist, and account-based checkout backed by real authentication rather than a mocked login state. The product catalog, cart state, and user accounts are all backed by PostgreSQL rather than static or hardcoded data, which means the storefront behaves like a real store: items persist in the cart across sessions, wishlist state is tied to the signed-in account, and product data can change without a redeploy.',
    image: '/img/projects/titan.webp',
    gallery: ['/img/projects/titan.webp'],
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Vercel'],
    liveUrl: 'https://titan-teal.vercel.app/',
    githubUrl: 'https://github.com/jerryboss322/titan',
    challenge: [
      'The existing storefront converted under 1% of visitors and took 4.2s to first paint, hemorrhaging revenue on every campaign drop.',
      'Inventory and pricing lived in a legacy monolith that could not keep up with flash-sale traffic, causing oversells during peak hours.',
      'A disjointed checkout with nine required steps drove an estimated 65% of users away before completing a purchase.',
    ],
    process: [
      'Rebuilt the storefront as a React + TypeScript SPA with a headless CMS, decoupling content from the transactional core.',
      'Designed a three-step checkout with inline validation, Stripe Payment Intents, and saved-payment acceleration for returning customers.',
      'Wired real-time inventory synchronization to the catalog via a lightweight event pipeline, with optimistic UI updates.',
    ],
    solution: [
      'Applied aggressive code splitting, route-level lazy loading, and an image pipeline that cut initial page load from 4.2s to 1.1s.',
      'Introduced a conversion-first layout system — persistent mini-cart, one-tap payment, and trust signals above the fold.',
      'Shipped a measurable uplift: conversion rate rose 35% and checkout abandonment dropped sharply across every device class.',
    ],
    metrics: [
      { value: '+35%', label: 'Conversion rate' },
      { value: '1.1s', label: 'Page load (from 4.2s)' },
      { value: '-65%', label: 'Checkout abandonment' },
    ],
    outcome:
      'Increased conversion rate by 35% and reduced page load time from 4.2s to 1.1s through performance optimization and code splitting.',
  },
  {
    slug: 'luxora',
    title: 'Luxora',
    subtitle: 'Luxury Marketplace',
    role: 'Product Designer & Frontend Lead',
    year: '2024',
    summary:
      'A product showroom built around presentation, not just listings — collections arranged like a gallery, with a still product photo transitioning into an interactive 3D model on interaction.',
    description:
      "Luxora reimagines a product marketplace as a curated showroom rather than a grid of listings — collections are presented like gallery installations, and the centerpiece interaction lets a static product photograph dissolve into a fully interactive 3D model, giving each object a sense of physical presence that a flat photo can't. Built with React Three Fiber for the 3D layer, GSAP for the showroom's scroll choreography, and Sanity as a headless CMS so collections and featured objects can be managed without touching code.",
    image: '/img/projects/luxora.webp',
    gallery: ['/img/projects/luxora.webp'],
    tech: ['React', 'Three.js', 'GSAP', 'Framer Motion', 'Sanity CMS'],
    liveUrl: 'https://luxora-self-two.vercel.app/',
    githubUrl: 'https://github.com/jerryboss322/LUXORA',
    challenge: [
      'Luxury shoppers could not feel product quality through flat catalog grids — engagement was indistinguishable from mass-market stores.',
      'Aging thumbnails and slow image handling undermined the premium brand positioning.',
      'Product teams spent weeks producing static marketing pages for each collection launch.',
    ],
    process: [
      'Designed a tactile product language: generous whitespace, editorial typography, and cinematic reveals as the narrative device.',
      'Built WebGL-powered 3D previews with Three.js so users could rotate pieces and inspect materials in real time.',
      'Authored every collection as structured content in Sanity CMS, letting the marketing team ship launches without engineering.',
    ],
    solution: [
      'Shipped a physically-responsive interaction layer — magnetic hovers, depth-shifted grids, and GSAP choreographed page reveals.',
      'Optimized the rendering pipeline with lazy-loaded WebGL chunks and responsive imagery.',
      'Outcome: a 4.9/5 user satisfaction score and 28% higher engagement than the previous platform.',
    ],
    metrics: [
      { value: '4.9/5', label: 'User satisfaction' },
      { value: '+28%', label: 'Engagement' },
      { value: '0', label: 'Days to launch (CMS)' },
    ],
    outcome:
      'Achieved a 4.9/5 user satisfaction score and 28% higher engagement compared to the previous platform.',
  },
  {
    slug: 'tastetrail',
    title: 'TasteTrail',
    subtitle: 'Food Ordering App',
    role: 'Full-Stack Developer',
    year: '2024',
    summary:
      'An ordering experience with category-filtered menu browsing and a live running cart — built to make choosing and confirming an order fast, with no friction between menu and checkout.',
    description:
      'TasteTrail is a focused food-ordering experience for a single restaurant — category-filtered menu browsing with a live running cart, built to make choosing and confirming an order fast, with no friction between menu and checkout.',
    image: '/img/projects/tastetrail.webp',
    gallery: ['/img/projects/tastetrail.webp'],
    tech: ['React', 'Node.js', 'PostgreSQL'],
    liveUrl: 'https://tastetrail.vercel.app/',
    githubUrl: 'https://github.com/jerryboss322/tastetrail',
    challenge: [
      'Browsing a menu without categories means scanning long lists to find what you want.',
      'Losing track of the running total makes confirming an order slower than it needs to be.',
    ],
    process: [
      'Built category-filtered menu browsing (All / Main Course / Sushi / Desserts / Drinks) so items are reachable in one tap.',
      'Implemented a live running cart with a confirm-order flow that keeps the total visible at every step.',
    ],
    solution: [
      'Shipped a single-page ordering experience where choosing and confirming an order happens without page reloads.',
      'The cart total updates in real time, removing the mental math between menu and checkout.',
    ],
    metrics: [],
    outcome:
      'A fast, focused ordering flow where customers go from menu to confirmed order with minimal friction.',
  },
  {
    slug: 'sallygreen',
    title: 'Sally Green Marketing',
    subtitle: 'Book Marketing Platform',
    role: 'Frontend Engineer',
    year: '2024',
    summary:
      'A marketing and analytics site built for an author-services client — combining a data-driven results dashboard, structured case studies, and a lead-capture flow designed around converting inbound author inquiries.',
    description:
      "Built for an author-marketing client, this site combines a results dashboard, structured case-study sections, and a conversion-focused inquiry flow designed to turn visiting authors into qualified leads. The build required translating a fairly aggressive, data-heavy marketing voice into a working, responsive site with animated stat displays, testimonial sections tied to real author names, and a functioning contact/diagnostic-request form — while keeping the site's own commercial claims clearly the client's positioning, not overstated engineering claims of your own.",
    image: '/img/projects/sallygreen.webp',
    gallery: ['/img/projects/sallygreen.webp'],
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    liveUrl: 'https://sallygreenmarketing.vercel.app/',
    githubUrl: 'https://github.com/jerryboss322/sallygreen-marketing',
    challenge: [
      'The brand needed a site that felt as considered as its products — sustainable, warm, and premium.',
      'Previous marketing pages scored poorly on performance, hurting SEO and time-on-site.',
      'Accessibility was an afterthought, excluding a meaningful share of the audience.',
    ],
    process: [
      'Designed a cohesive visual identity: warm neutrals, editorial typography, and restrained motion that echoes the brand voice.',
      'Built the site on Next.js with Tailwind CSS, keeping the marketing team able to iterate quickly.',
      'Ran a strict accessibility-first process — semantic markup, contrast-reviewed palettes, and full keyboard support.',
    ],
    solution: [
      'Optimized every asset and render path to reach a 98 Lighthouse score and a 1.2s LCP.',
      'Motion is used to narrate the product story without ever hurting readability or performance.',
      'The result is a fast, accessible, and unmistakably premium brand presence.',
    ],
    metrics: [
      { value: '98', label: 'Lighthouse score' },
      { value: '1.2s', label: 'Largest contentful paint' },
      { value: '0', label: 'Axe violations' },
    ],
    outcome: 'Improved site performance to 98 Lighthouse score and 1.2s LCP.',
  },
  {
    slug: 'jbet',
    title: 'Jbet',
    subtitle: 'Sports Betting Platform',
    role: 'Frontend Engineer',
    year: '2026',
    summary:
      'A football betting platform for the Nigerian market — live odds across multiple leagues, a persistent bet-slip, and instant wallet funding through local rails like Opay, Palmpay, and bank USSD.',
    description:
      'Jbet is a full sports-betting platform built for the Nigerian market, covering live odds across multiple football leagues, a persistent bet-slip that tracks selections and calculates potential winnings in real time, and account creation with session-based authentication. The wallet system integrates local Nigerian payment rails — Opay, Palmpay, GTBank, and USSD — for instant deposits, and the platform includes licensing and responsible-gambling messaging consistent with regulated betting products.',
    image: '/img/projects/jbet.webp',
    gallery: ['/img/projects/jbet.webp'],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'REST API', 'Vercel'],
    liveUrl: 'https://jbet.vercel.app/',
    githubUrl: 'https://github.com/jerryboss322/jbet',
    challenge: [
      'Typical betting sites are slow and cluttered, with bet slips that struggle to keep pace during peak match windows.',
      'Funding a wallet meant switching to a banking app and waiting minutes, killing the impulse to bet.',
      'Live odds and match data must stay accurate across dozens of leagues and hundreds of concurrent matches.',
    ],
    process: [
      'Designed a conversion-first flow: match lists, a persistent bet slip, and instant deposit sheets live on one screen.',
      'Built a responsive bet-slip engine that aggregates selections, computes combined odds, and validates stakes client-side.',
      'Wired instant wallet funding through local payment rails (Opay, Palmpay, GTBank, USSD) with 256-bit SSL encryption.',
    ],
    solution: [
      'Shipped a fast, focused platform where placing a bet takes seconds instead of taps across multiple screens.',
      'Slip state and odds update instantly without full-page reloads, staying in sync during live matches.',
      'Registration bundles a first-deposit bonus (deposit ₦1,000, get ₦5,000 free) directly into the onboarding flow.',
    ],
    metrics: [
      { value: '5', label: 'Payment channels' },
      { value: '24/7', label: 'Support' },
      { value: 'Instant', label: 'Withdrawals' },
    ],
    outcome:
      'Delivered a licensed, mobile-first Nigerian betting platform with instant wallet settlement and a friction-free bet-slip experience.',
  },
];

export const profile = {
  name: 'JBOSS',
  role: 'Software Engineer',
  eyebrow: 'Software Engineer · Digital Product Builder',
  headline: 'I build full-stack products — from interface to infrastructure.',
  intro: [
    "I'm a software engineer who works across the full lifecycle of a product — frontend interfaces, backend systems, databases, and the infrastructure that ties it together. I care less about how something looks in isolation and more about whether it actually works: fast, reliable, and simple for someone else to use.",
    "I've shipped e-commerce platforms, sports-data products, and internal tools across Go, Next.js, Laravel, and Kotlin — usually solo, always end-to-end.",
  ],
  meta: 'Frontend · Backend · APIs · Product Engineering',
  location: 'Lagos, Nigeria',
  status: 'Available for select projects',
  heroPortrait: '/img/hero.webp',
  github: 'https://github.com/jerryboss322',
  linkedin: 'https://linkedin.com/in/jboss-dev',
  email: 'hello@jboss.dev',
};

export const about = {
  heading: "I'm a software engineer who likes building things from the ground up.",
  paragraphs: [
    "I'm a software engineer with a strong interest in building useful, reliable, and well-crafted digital products. I work across the stack — designing interfaces, building frontend experiences, and developing the backend systems, APIs, databases, and infrastructure that hold everything together.",
    'What interests me most is the process of turning a problem into a product. I like taking an idea that starts as a rough concept, breaking it into smaller systems, working out how those systems talk to each other, and turning the result into something real that people can actually use.',
    'I care about the details that are easy to skip past: how quickly an interface responds, how a component behaves across different states, how data moves through an application, whether the architecture holds up as it grows, and whether the finished product genuinely makes sense to the person using it.',
    "I'm constantly building — sometimes on product experiences, sometimes on backend systems or automation, sometimes on something more technical just to understand it better. Each project is a chance to go deeper on something and get better at how I build.",
  ],
  pullQuote:
    'My goal is simple: build software that is useful, technically sound, and genuinely enjoyable to use.',
  portrait: '/img/about.webp',
};

export const whatIBring = [
  {
    title: 'Product Thinking',
    description:
      "I don't just think about individual screens or features. I think about how the complete product works, and how each part serves the user's actual goal.",
  },
  {
    title: 'Full-Stack Engineering',
    description:
      'I work across interface, application logic, APIs, databases, and the supporting systems needed to take an idea to a working product.',
  },
  {
    title: 'Attention to Detail',
    description:
      'Performance, responsive behavior, accessibility, interaction states, typography, and the small usability decisions all matter to the final result.',
  },
  {
    title: 'Continuous Learning',
    description:
      'I enjoy testing new tools and approaches while keeping the fundamentals that make software reliable.',
  },
];

export const stack = [
  {
    group: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript'],
  },
  {
    group: 'Backend',
    items: ['Node.js', 'Express', 'Django', 'REST APIs'],
  },
  {
    group: 'Database',
    items: ['PostgreSQL', 'Redis'],
  },
  {
    group: 'Tools',
    items: ['Git', 'GitHub', 'Vercel', 'VS Code'],
  },
  {
    group: 'Other',
    items: ['Three.js', 'Unity', 'C#', 'Python'],
  },
];
