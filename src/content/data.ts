export interface Metric {
  value: string;
  label: string;
}

export type ProjectType = 'client' | 'personal' | 'experiment';

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  type: ProjectType;
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
    subtitle: 'E-Commerce Platform',
    type: 'personal',
    role: 'Lead Frontend Engineer',
    year: '2025',
    summary:
      'A full-stack commerce platform focused on a polished shopping experience, product management, authentication, and scalable application architecture.',
    description:
      'Titan is a full-stack commerce platform built around the complete customer journey — product discovery through browsing and category pages, a persistent cart and wishlist, and account-based checkout backed by real authentication rather than a mocked login state. The product catalog, cart state, and user accounts are all backed by PostgreSQL rather than static or hardcoded data, which means the storefront behaves like a real store: items persist in the cart across sessions, wishlist state is tied to the signed-in account, and product data can change without a redeploy.',
    image: '/img/projects/titan.webp',
    gallery: ['/img/projects/titan.webp'],
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Vercel'],
    liveUrl: 'https://titan-teal.vercel.app/',
    githubUrl: 'https://github.com/jerryboss322/titan',
    challenge: [
      'Build a production-grade storefront from scratch with real auth, persistent cart state, and a PostgreSQL-backed catalog — not a demo with mocked data.',
      'Keep first paint fast on mobile networks while loading product imagery, category filters, and checkout flows.',
      'Design a checkout experience short enough that users can complete a purchase without losing context.',
    ],
    process: [
      'Built the storefront as a Next.js + TypeScript app with PostgreSQL for products, carts, wishlists, and user accounts.',
      'Implemented a three-step checkout with inline validation and Stripe Payment Intents for returning customers.',
      'Applied code splitting, route-level lazy loading, and an optimized image pipeline to hit performance targets.',
    ],
    solution: [
      'Shipped a full customer journey — browse, cart, wishlist, account, and checkout — backed by real database state.',
      'Introduced a conversion-first layout: persistent mini-cart, trust signals above the fold, and responsive product grids.',
      'Measured in Lighthouse and WebPageTest during development: initial load reached ~1.1s on a throttled 4G profile (personal project benchmark).',
    ],
    metrics: [
      { value: '1.1s', label: 'Target load time (4G)' },
      { value: '3-step', label: 'Checkout flow' },
      { value: 'Full-stack', label: 'Auth + PostgreSQL' },
    ],
    outcome:
      'A production-style commerce platform with real authentication, persistent state, and performance tuned during development — built as a personal full-stack project.',
  },
  {
    slug: 'luxora',
    title: 'Luxora',
    subtitle: 'Premium Commerce Experience',
    type: 'personal',
    role: 'Product Designer & Frontend Lead',
    year: '2024',
    summary:
      'A luxury-focused commerce experience combining premium visual design with structured product discovery and responsive interaction.',
    description:
      "Luxora reimagines a product marketplace as a curated showroom rather than a grid of listings — collections are presented like gallery installations, and the centerpiece interaction lets a static product photograph dissolve into a fully interactive 3D model, giving each object a sense of physical presence that a flat photo can't. Built with React Three Fiber for the 3D layer, GSAP for the showroom's scroll choreography, and Sanity as a headless CMS so collections and featured objects can be managed without touching code.",
    image: '/img/projects/luxora.webp',
    gallery: ['/img/projects/luxora.webp'],
    tech: ['React', 'Three.js', 'GSAP', 'Framer Motion', 'Sanity CMS'],
    liveUrl: 'https://luxora-self-two.vercel.app/',
    githubUrl: 'https://github.com/jerryboss322/LUXORA',
    challenge: [
      'Explore how luxury commerce could feel tactile and editorial — not like a generic product grid.',
      'Balance WebGL 3D previews and scroll-driven motion without sacrificing load time on mobile.',
      'Structure collections as CMS content so launches could ship without code changes.',
    ],
    process: [
      'Designed a tactile product language: generous whitespace, editorial typography, and cinematic scroll reveals.',
      'Built WebGL-powered 3D previews with Three.js so users can rotate pieces and inspect materials in real time.',
      'Authored collections as structured content in Sanity CMS for repeatable launch workflows.',
    ],
    solution: [
      'Shipped a physically-responsive interaction layer — magnetic hovers, depth-shifted grids, and GSAP choreographed page reveals.',
      'Optimized the rendering pipeline with lazy-loaded WebGL chunks and responsive imagery.',
      'Validated UX through informal user feedback during development — the interaction model scored highly in small-group testing (personal project).',
    ],
    metrics: [
      { value: '3D', label: 'WebGL previews' },
      { value: 'CMS', label: 'Sanity collections' },
      { value: 'Lazy', label: 'WebGL code-split' },
    ],
    outcome:
      'A premium commerce concept exploring 3D product presentation, scroll choreography, and headless CMS workflows — built as a personal design-engineering project.',
  },
  {
    slug: 'tastetrail',
    title: 'TasteTrail',
    subtitle: 'Food Discovery',
    type: 'personal',
    role: 'Full-Stack Developer',
    year: '2024',
    summary:
      'A visual food discovery experience designed around exploration, content presentation, and intuitive navigation.',
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
    title: 'Sally Green',
    subtitle: 'Digital Product',
    type: 'client',
    role: 'Frontend Engineer',
    year: '2024',
    summary:
      'A client-focused digital experience built around clear communication, usability, and a polished product presentation.',
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
    subtitle: 'Platform Concept',
    type: 'experiment',
    role: 'Frontend Engineer',
    year: '2026',
    summary:
      'A complex platform concept exploring user flows, data presentation, account experiences, and application architecture.',
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
  brand: 'JBOSS.DEV',
  fullName: 'Jerry Adewole',
  role: 'Software Engineer',
  yearsExperience: '3+ years',
  eyebrow: 'Software Engineer · Digital Systems',
  headline: 'Software Engineer Building Digital Systems.',
  intro: [
    'I build modern web applications, scalable backend systems, and polished digital experiences — from concept to deployment.',
  ],
  meta: 'Frontend · Backend · APIs · Product Engineering',
  location: 'Ogbomoso, Nigeria',
  status: 'Available for select projects',
  heroPortrait: '/img/hero.png',
  resumeUrl: '/Jerry-Adewole-Resume.html',
  github: 'https://github.com/jerryboss322',
  whatsapp: 'https://wa.me/2348130075752',
  linkedin: 'https://linkedin.com/in/jboss-dev',
  email: 'jerryadewole2023@gmail.com',
};

export const heroWords = ['Engineering', 'detail', 'into', 'digital', 'systems.'];

export const heroIntro =
  'I bridge the gap between design vision and production-ready implementation — modern web applications, scalable backend systems, and polished digital experiences shipped end to end.';

export const heroMeta = ['Software Engineer / Full-Stack', 'Ogbomoso, Nigeria'];

export const values = [
  {
    title: 'Engineering Excellence',
    description: 'Typed, tested, and maintainable. No magic, just rigorous software.',
  },
  {
    title: 'User-Centered Design',
    description: 'Interface as empathy. Reduce cognitive load, increase clarity.',
  },
  {
    title: 'Performance Obsession',
    description: 'Every frame and every request budgeted. LCP, CLS, and interaction physics.',
  },
  {
    title: 'Reliability & Ownership',
    description: 'Own it from idea through deployment. Clear communication, real handoffs.',
  },
];

export const coreSkills = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Tailwind CSS',
  'REST APIs',
  'Docker',
  'Linux',
  'Git',
  'Three.js',
  'Framer Motion',
];

export type CapabilityIcon =
  | 'layers'
  | 'gauge'
  | 'database'
  | 'accessibility'
  | 'cloud'
  | 'pen';

export interface Capability {
  id: string;
  icon: CapabilityIcon;
  title: string;
  description: string;
  points: string[];
  /** Bento sizing: how many grid cells the card occupies at desktop. */
  span: 1 | 2;
  featured?: boolean;
}

export const capabilities: Capability[] = [
  {
    id: 'delivery',
    icon: 'layers',
    title: 'Full-Stack Delivery',
    description:
      'One engineer from schema to screen. I design the data model, build the API, wire the interface, and own the deployment — no handoff gaps where requirements get lost in translation.',
    points: ['React / Next.js', 'Node / Django', 'REST & auth', 'PostgreSQL'],
    span: 2,
    featured: true,
  },
  {
    id: 'performance',
    icon: 'gauge',
    title: 'Performance Budgets',
    description:
      'Performance treated as a constraint, not a cleanup task. Budgets set up front and checked in CI.',
    points: ['LCP / CLS / INP', 'Bundle splitting', 'Edge caching'],
    span: 1,
  },
  {
    id: 'data',
    icon: 'database',
    title: 'Data Integrity',
    description:
      'Schemas with real constraints, migrations that run in both directions, and validation at every boundary.',
    points: ['Normalised schema', 'Migrations', 'Input validation'],
    span: 1,
  },
  {
    id: 'a11y',
    icon: 'accessibility',
    title: 'Accessible by Default',
    description:
      'Semantic markup, full keyboard paths, and contrast that holds up. Accessibility is part of the build, not a later audit.',
    points: ['WCAG AA contrast', 'Keyboard paths', 'Screen reader tested'],
    span: 1,
  },
  {
    id: 'infra',
    icon: 'cloud',
    title: 'Deployment & Ops',
    description:
      'Ship to a real environment and keep it running. Linux, containers, CI, and observability wired in from the start.',
    points: ['Docker', 'Linux', 'CI pipelines', 'Monitoring'],
    span: 1,
  },
  {
    id: 'design',
    icon: 'pen',
    title: 'Design Engineering',
    description:
      'I work from the design file, not just a handoff screenshot — so motion, spacing, and states hold up in the browser.',
    points: ['Design tokens', 'Motion systems', 'Component APIs'],
    span: 1,
  },
];

export const systemsPrinciples = [

  {
    id: '01',
    title: 'Clarity First',
    description: 'One primary goal per screen and per system. Everything else supports it.',
  },
  {
    id: '02',
    title: 'Engineering Depth',
    description: 'Typed, tested, and maintainable. No magic — just rigorous software.',
  },
  {
    id: '03',
    title: 'Performance',
    description: 'Every frame and request budgeted. LCP, TTI, and interaction physics matter.',
  },
  {
    id: '04',
    title: 'Data Integrity',
    description: 'APIs and databases designed with validation, authentication, and sane defaults.',
  },
  {
    id: '05',
    title: 'Accessible by Default',
    description: 'Semantic markup, keyboard support, and contrast that never excludes.',
  },
  {
    id: '06',
    title: 'Ship & Maintain',
    description: 'Deploy, instrument, document, and hand off. Own it from idea to operation.',
  },
];

export const process = [
  {
    number: '01',
    title: 'Discover',
    description: 'Map the problem. Audit what exists, define what\'s missing, scope what to build.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Sketch the solution. Wireframes, flows, and visual systems that survive contact with engineering.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Engineering with weekly demos. You stay in the loop the whole way. No black boxes.',
  },
  {
    number: '04',
    title: 'Test',
    description: 'Real test suites, edge cases, performance checks. I don\'t ship code that hasn\'t been validated.',
  },
  {
    number: '05',
    title: 'Ship',
    description: 'Launch, instrument, document. I hand off so you can own it from day one.',
  },
];

export interface TimelineEntry {
  period: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  project?: string;
}

export const about = {
  heading: 'I build with both the product and the system in mind.',
  paragraphs: [
    'I\'m Jerry Adewole — a software engineer based in Ogbomoso, Nigeria, with 3+ years building web applications, backend systems, and client-facing digital products.',
    'I enjoy turning complex ideas into reliable, usable software. My work spans frontend engineering, API design, database architecture, deployment, and the product thinking that connects them.',
    'For client projects like Sally Green Marketing, I translate business requirements into fast, accessible sites with clear handoff documentation. For personal projects, I use production-grade patterns to explore new tools and architectures.',
  ],
  pullQuote:
    'Build for maintainability, not just the demo.',
  portrait: '/img/about.png',
  timeline: [
    {
      period: '2024 — Present',
      title: 'Freelance Software Engineer',
      description: 'Delivering client websites and full-stack applications — including Sally Green Marketing (author-marketing platform) — with a focus on performance, accessibility, and clear communication.',
    },
    {
      period: '2023 — 2024',
      title: 'Full-Stack Development',
      description: 'Built personal and experimental products (Titan Commerce, Luxora, TasteTrail) covering e-commerce, premium UX, and food-ordering flows with React, Next.js, Node.js, and PostgreSQL.',
    },
    {
      period: '2022 — 2023',
      title: 'Foundations',
      description: 'Deepened core web fundamentals, backend APIs, database design, and deployment workflows on Linux and cloud platforms.',
    },
  ] satisfies TimelineEntry[],
  testimonials: [
    {
      quote: 'Jerry delivered a polished, fast site that matched our brand voice. He handled revisions patiently and explained technical trade-offs in plain language.',
      author: 'Sally Green',
      role: 'Marketing Client',
      project: 'Sally Green Marketing',
    },
    {
      quote: 'Clear communication throughout the project. Weekly updates, realistic timelines, and a clean handoff with documentation I could actually use.',
      author: 'Project Collaborator',
      role: 'Startup Founder',
    },
  ] satisfies Testimonial[],
};

export const principles = [
  {
    title: 'CLARITY',
    description: 'Clear communication before unnecessary complexity.',
  },
  {
    title: 'ENGINEERING',
    description: 'Build for maintainability, not just the demo.',
  },
  {
    title: 'PERFORMANCE',
    description: 'Keep products fast, responsive, and efficient.',
  },
  {
    title: 'OWNERSHIP',
    description: 'Take responsibility from idea through deployment.',
  },
];

export const whatIBring = [
  {
    number: '01',
    title: 'Web Applications',
    description: 'Modern, responsive web applications designed around real users and real product requirements.',
  },
  {
    number: '02',
    title: 'Backend Systems',
    description: 'APIs, databases, authentication, business logic, and application architecture designed to support reliable products.',
  },
  {
    number: '03',
    title: 'Deployment & Systems',
    description: 'Production-ready applications, deployment workflows, infrastructure configuration, and reliable delivery.',
  },
];

export const stack = [
  {
    group: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'HTML / CSS'],
  },
  {
    group: 'Backend',
    items: ['Node.js', 'Express', 'Django', 'Python'],
  },
  {
    group: 'Database',
    items: ['PostgreSQL', 'SQL'],
  },
  {
    group: 'Infrastructure',
    items: ['Linux', 'Git', 'Docker', 'Vercel'],
  },
  {
    group: 'Other',
    items: ['C#', 'Unity', 'Godot'],
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const faq: FAQItem[] = [
  {
    question: "What's your typical project timeline?",
    answer: "A typical landing page takes around 1–2 weeks, depending on design, content, revisions, and functionality required. A full web application usually takes around 3–6 weeks, and larger or more complex systems may take longer. I review the project scope first and agree on a realistic timeline rather than make unrealistic promises.",
  },
  {
    question: "Do you work with non-technical founders/clients?",
    answer: "Yes. I explain technical decisions in terms of business goals, user experience, performance, cost, and long-term maintainability, rather than unnecessary jargon — so you understand what's being built and why.",
  },
  {
    question: "What's your tech stack?",
    answer: "My primary stack is React, Next.js, TypeScript, Node.js, Django, and PostgreSQL. I also work with Go, Laravel, and Kotlin when a project calls for them — choosing tools based on the product, architecture, and specific problem being solved.",
  },
  {
    question: "Since you're one person, what happens if you get overloaded/sick/stuck?",
    answer: "I plan realistic timelines and avoid taking on more work than I can responsibly manage. If an unexpected issue affects a project, I communicate it as early as possible rather than leaving you without an update, and I build in reasonable time for testing, revisions, and unexpected technical problems.",
  },
  {
    question: "Do you sign NDAs?",
    answer: "Yes — I'm comfortable signing an NDA when a project requires confidentiality.",
  },
  {
    question: "What happens after the project ships?",
    answer: "I provide a clear handoff: code, documentation, deployment information, and instructions to manage it. If you need continued help, I can also provide maintenance, bug fixes, updates, and further improvements through an agreed support arrangement.",
  },
  {
    question: "How do payments work?",
    answer: "Standard structure is 50% upfront, 50% on completion. For larger projects, payment can be split into milestones tied to defined deliverables. Development begins once the initial payment is received.",
  },
  {
    question: "Can you take over a half-finished project someone else started?",
    answer: "Yes. I normally recommend a codebase audit first, so I understand the existing architecture, dependencies, incomplete features, and remaining work before quoting a scope and timeline.",
  },
  {
    question: "Where are you based, and do you work with international clients?",
    answer: "I'm based in Ogbomoso, Nigeria (WAT / UTC+1) and I'm open to working with clients internationally. I'm comfortable working asynchronously through clear communication, documentation, and regular progress updates, while also making time for meetings when needed.",
  },
  {
    question: "Do you only build the projects on your portfolio, or other things too?",
    answer: "No — my portfolio includes a mix of client projects, personal projects, and experimental builds. Client projects show my ability to deliver against real requirements; personal projects let me explore new technologies, architectures, and ideas. Each project is clearly labeled so visitors can tell which is which.",
  },
];
