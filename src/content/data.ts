export interface Metric {
  value: string;
  label: string;
}

export type ProjectType = 'client' | 'personal' | 'experiment';

export interface TechStackItem {
  name: string;
  purpose: string;
  why: string;
  alternatives: string[];
}

export interface DatabaseDesign {
  schemaOverview: string;
  keyTables: string[];
  relationships: string[];
  optimizationStrategy: string;
}

export interface APIDesign {
  endpoints: string[];
  authentication: string;
  rateLimiting: string;
  cachingStrategy: string;
}

export interface DeploymentStrategy {
  hosting: string;
  buildProcess: string;
  ciCd: string;
  monitoring: string;
}

export interface ArchitecturePlan {
  style: string;
  techStack: TechStackItem[];
  database: DatabaseDesign;
  api: APIDesign;
  deployment: DeploymentStrategy;
  keyDecisions: string[];
  tradeoffs: string[];
  lessonsLearned: string[];
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  type: ProjectType;
  year: string;
  summary: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  process: string[];
  metrics: Metric[];
  outcome: string;
  architecture: ArchitecturePlan;
}

export const projects: Project[] = [
  {
    slug: 'titan',
    title: 'Titan Commerce',
    subtitle: 'Full-stack e-commerce',
    type: 'personal',
    year: '2025',
    summary:
      'A production-ready e-commerce platform with PostgreSQL backend, Next.js frontend, and Vercel deployment — real accounts, cart persistence, and Stripe integration.',
    description: 'Postgres-backed, so the shop behaves like a real store with full ACID compliance and data integrity.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Vercel'],
    liveUrl: 'https://titan-teal.vercel.app/',
    githubUrl: 'https://github.com/jerryboss322/titan',
    process: [
      'Next.js and TypeScript, with PostgreSQL holding products, carts and users.',
      'A three-step checkout with validation as you go, using Stripe Payment Intents.',
      'Split routes into chunks and set up an image pipeline to keep first load small.',
    ],
    metrics: [
      { value: '1.1s', label: 'Load, throttled 4G' },
      { value: '3 steps', label: 'Checkout' },
      { value: 'Postgres', label: 'Real data' },
    ],
    outcome: 'The answer to "what do you actually know about back ends?"',
    architecture: {
      style: 'Monorepo with separate frontend and backend services',
      techStack: [
        {
          name: 'Next.js 14',
          purpose: 'Full-stack React framework with App Router',
          why: 'Server-side rendering for SEO, API routes for backend, image optimization built-in',
          alternatives: ['Create React App + Express', 'Nuxt.js', 'Remix']
        },
        {
          name: 'PostgreSQL',
          purpose: 'Relational database for products, users, orders',
          why: 'ACID compliance for transaction integrity, JSONB for flexibility, pgvector for future AI features',
          alternatives: ['MongoDB', 'Supabase', 'Firebase']
        },
        {
          name: 'Vercel',
          purpose: 'Edge network deployment',
          why: 'Zero-config deployment, edge caching, serverless functions, automatic HTTPS',
          alternatives: ['AWS Amplify', 'Netlify', 'DigitalOcean App Platform']
        }
      ],
      database: {
        schemaOverview: 'Normalized schema with users, products, categories, orders, and order_items tables',
        keyTables: ['users', 'products', 'categories', 'orders', 'order_items', 'payments'],
        relationships: [
          'users → orders (one-to-many)',
          'orders → order_items (one-to-many)',
          'products → order_items (one-to-many)',
          'categories → products (one-to-many)'
        ],
        optimizationStrategy: 'Indexed on foreign keys, partial indexes on active products, materialized views for category counts'
      },
      api: {
        endpoints: [
          'GET /api/products - List all products with pagination',
          'GET /api/products/[id] - Single product details',
          'POST /api/cart - Add item to cart',
          'GET /api/cart - Get current cart',
          'POST /api/checkout - Create order',
          'POST /api/webhooks/stripe - Stripe webhook handler'
        ],
        authentication: 'JWT tokens with refresh tokens, stored in httpOnly cookies',
        rateLimiting: '100 requests per minute per IP, 10 requests per minute for checkout',
        cachingStrategy: 'Edge caching on Vercel for products, Redis for cart sessions'
      },
      deployment: {
        hosting: 'Vercel Edge Network',
        buildProcess: 'Next.js production build with TypeScript compilation and image optimization',
        'ciCd': 'GitHub Actions on push to main, automatic preview deployments on PRs',
        monitoring: 'Vercel Analytics, Sentry for error tracking, Logtail for logs'
      },
      keyDecisions: [
        'Separate database connection for API routes to avoid connection pool exhaustion',
        'Server-side validation before database operations to prevent malformed data',
        'Incremental static regeneration for product pages to balance performance and freshness'
      ],
      tradeoffs: [
        'Next.js API routes vs. separate backend service: Chose API routes for simplicity, would split if traffic grows 10x',
        'PostgreSQL vs. specialized services: Chose raw PostgreSQL for full control, would consider Supabase for faster iteration',
        'Edge caching vs. real-time: Chose edge caching with ISR, would add WebSocket for live inventory if needed'
      ],
      lessonsLearned: [
        'Connection pooling is critical — started with 10 connections, added pooler to handle spikes',
        'Error boundaries in Next.js API routes don’t catch all errors — added global error handler',
        'Image optimization on Vercel is great but slow on first build — prebuild images in CI'
      ]
    }
  },
  {
    slug: 'jbet',
    title: 'Jbet',
    subtitle: 'Nigerian betting platform',
    type: 'experiment',
    year: '2026',
    summary:
      'A Nigerian betting platform with live odds, bet slip, and local payment integration — real-time updates and payment rail connections.',
    description: 'Deposits run through the payment rails people here actually use — Opay, PalmPay, bank transfers.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'REST API', 'Vercel'],
    liveUrl: 'https://jbet.vercel.app/',
    githubUrl: 'https://github.com/jerryboss322/jbet',
    process: [
      'Match list, bet slip and deposit options all on one screen.',
      'The slip combines odds and checks the stake before you confirm.',
      'Local payment rails wired up, with validation on every request.',
    ],
    metrics: [
      { value: '4', label: 'Payment methods' },
      { value: '1 screen', label: 'To place a bet' },
      { value: 'Live', label: 'Odds updates' },
    ],
    outcome: 'A licensed platform that runs end to end, including the payment side people usually fake.',
    architecture: {
      style: 'Client-heavy SPA with REST API backend',
      techStack: [
        {
          name: 'React 18',
          purpose: 'Frontend framework with concurrent rendering',
          why: 'Faster updates with useDeferredValue, automatic batching, concurrent features',
          alternatives: ['Vue 3', 'Svelte', 'Angular']
        },
        {
          name: 'Tailwind CSS',
          purpose: 'Utility-first CSS framework',
          why: 'Rapid development, consistent design system, dark mode built-in',
          alternatives: ['CSS Modules', 'Styled Components', 'Bootstrap']
        },
        {
          name: 'Node.js + Express',
          purpose: 'REST API backend',
          why: 'JavaScript continuity, NPM ecosystem, middleware pattern for authentication',
          alternatives: ['NestJS', 'Fastify', 'Hono']
        },
        {
          name: 'MySQL',
          purpose: 'Relational database for bets, users, transactions',
          why: 'Mature ecosystem, good for structured data, Replication for read scaling',
          alternatives: ['PostgreSQL', 'MongoDB', 'MariaDB']
        }
      ],
      database: {
        schemaOverview: 'Schema for users, matches, bets, transactions, and payment_records',
        keyTables: ['users', 'matches', 'bets', 'transactions', 'payment_records', 'odds_history'],
        relationships: [
          'users → bets (one-to-many)',
          'matches → bets (one-to-many)',
          'users → transactions (one-to-many)',
          'transactions → payment_records (one-to-one)'
        ],
        optimizationStrategy: 'Indexed on user_id, match_id, transaction_status; denormalized odds at bet time for historical accuracy'
      },
      api: {
        endpoints: [
          'GET /api/matches - Live match list with odds',
          'POST /api/bets - Place bet on match',
          'GET /api/bets/my - User bet history',
          'POST /api/deposits - Initiate deposit',
          'GET /api/deposits/status - Check deposit status',
          'POST /api/payments/webhook - Payment provider webhook'
        ],
        authentication: 'Session-based with JWT refresh tokens, stored in httpOnly cookies',
        rateLimiting: '30 requests per minute for bet placement, 100 for match listing',
        cachingStrategy: 'Redis for odds (updated every 5s), localStorage for user session'
      },
      deployment: {
        hosting: 'Vercel (frontend) + DigitalOcean App Platform (backend)',
        buildProcess: 'Vite build with TypeScript, environment-specific builds',
        'ciCd': 'GitHub Actions on push, manual deployment to staging/production',
        monitoring: 'Google Analytics, custom event tracking for betting funnel'
      },
      keyDecisions: [
        'Real-time odds updates via Redis Pub/Sub instead of WebSocket for lower latency',
        'Denormalized betslip state in localStorage for instant UI updates',
        'Payment webhook validation before any database updates'
      ],
      tradeoffs: [
        'SPA vs. SSR: Chose SPA for faster interactions, accepts SEO limitation for betting platform',
        'MySQL vs. PostgreSQL: Chose MySQL for familiarity, would use PostgreSQL for complex queries',
        'Real-time odds vs. snapshot: Chose real-time updates every 5s, accepts slight delay for realism'
      ],
      lessonsLearned: [
        'Payment webhooks can arrive out of order — added sequence numbers to events',
        'LocalStorage fills up quickly with bet history — implemented cleanup on logout',
        'Odds updates can race with user actions — added optimistic UI updates with rollback'
      ]
    }
  },
  {
    slug: 'sallygreen',
    title: 'Sally Green',
    subtitle: 'Author marketing site',
    type: 'client',
    year: '2024',
    summary:
      'A marketing site for an author with results, case studies, and lead collection form — semantic, accessible, and maintainable.',
    description: 'Her team has run it since handover without me — built for non-technical users to update content.',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://sallygreenmarketing.vercel.app/',
    githubUrl: 'https://github.com/jerryboss322/sallygreen-marketing',
    process: [
      'A simple visual system, so the brand carries without shouting.',
      'Next.js and Tailwind, so her team could make changes without me.',
      'Semantic markup, contrast checked, and fully keyboard navigable.',
    ],
    metrics: [
      { value: '98', label: 'Lighthouse' },
      { value: '1.2s', label: 'Largest paint' },
      { value: '0', label: 'Axe violations' },
    ],
    outcome: 'Live and maintained by the client since handoff.',
    architecture: {
      style: 'Static site generation with dynamic fallbacks',
      techStack: [
        {
          name: 'Next.js 13',
          purpose: 'SSG framework with fallback to ISR',
          why: 'Static generation for speed, ISR for future dynamic content, App Router for cleaner structure',
          alternatives: ['Gatsby', 'Astro', 'Hugo']
        },
        {
          name: 'Sanity CMS',
          purpose: 'Headless CMS for content management',
          why: 'Real-time preview, versioning, image optimization, query language',
          alternatives: ['Contentful', 'Strapi', 'Direct database']
        },
        {
          name: 'Vercel',
          purpose: 'Edge network deployment',
          why: 'Zero-config deployment, automatic HTTPS, edge functions for dynamic content',
          alternatives: ['Netlify', 'Cloudflare Pages', 'AWS S3 + CloudFront']
        }
      ],
      database: {
        schemaOverview: 'No database — Sanity CMS handles content storage with versioning',
        keyTables: ['N/A - Sanity schemas for authors, books, testimonials, forms'],
        relationships: [
          'authors → books (one-to-many)',
          'books → testimonials (many-to-many)',
          'form_submissions → N/A (stored separately in Sanity)'
        ],
        optimizationStrategy: 'Sanity’s CDN for images, query caching with Next.js revalidation'
      },
      api: {
        endpoints: [
          'GET /api/testimonials - Get testimonials',
          'POST /api/lead-form - Submit lead form',
          'GET /api/books - List books with filtering',
          'GET /api/author - Author bio and image'
        ],
        authentication: 'None for public endpoints, Sanity API tokens for admin',
        rateLimiting: '1000 requests per minute, generous limits for marketing site',
        cachingStrategy: 'Edge caching on Vercel, Sanity query caching, browser caching'
      },
      deployment: {
        hosting: 'Vercel Edge Network',
        buildProcess: 'Next.js static generation, Sanity content fetch at build time',
        'ciCd': 'GitHub push triggers Vercel redeploy, automatic preview environments',
        monitoring: 'Vercel Analytics, Google Search Console, conversion tracking'
      },
      keyDecisions: [
        'Static generation for all pages except contact form — fastest possible load times',
        'Form submissions sent to webhook instead of database — simpler architecture',
        'Image optimization with Next.js Image component — automatic WebP, responsive sizes'
      ],
      tradeoffs: [
        'SSG vs. SSR: Chose SSG for speed, form submissions handled by edge function',
        'Sanity vs. custom CMS: Chose Sanity for faster iteration, accepts monthly cost',
        'Edge functions vs. serverless: Chose edge functions for lower latency on form submissions'
      ],
      lessonsLearned: [
        'Sanity’s query language is powerful but complex — created reusable query hooks',
        'Edge functions have 10s timeout — added queue for form submissions',
        'SSG means content changes need rebuild — added incremental revalidation for key pages'
      ]
    }
  },
  {
    slug: 'luxora',
    title: 'Luxora',
    subtitle: '3D shopfront concept',
    type: 'personal',
    year: '2024',
    summary:
      'A shopfront experiment with 3D product spinning — collections in Sanity, WebGL lazy-loaded, whitespace and large type.',
    description: 'Collections live in Sanity, so new stock needs no release — WebGL renders products in the browser.',
    tech: ['React', 'Three.js', 'GSAP', 'Sanity CMS'],
    liveUrl: 'https://luxora-self-two.vercel.app/',
    githubUrl: 'https://github.com/jerryboss322/LUXORA',
    process: [
      'Whitespace and large type instead of animating everything.',
      'Three.js, so a product can be dragged around and inspected.',
      'WebGL lazy-loaded, and only mounts on devices that can take it.',
    ],
    metrics: [
      { value: '3D', label: 'Product previews' },
      { value: 'Sanity', label: 'Headless CMS' },
      { value: 'Lazy', label: 'WebGL loading' },
    ],
    outcome: 'Mainly a lesson in how much 3D costs before it is worth it.',
    architecture: {
      style: 'Progressively enhanced 3D experience',
      techStack: [
        {
          name: 'React 18',
          purpose: 'Frontend framework with concurrent rendering',
          why: 'useId for accessibility, useDeferredValue for progressive enhancement',
          alternatives: ['Vue 3', 'Svelte', 'Angular']
        },
        {
          name: 'Three.js',
          purpose: '3D rendering library',
          why: 'Most mature 3D library, WebGL backend, large ecosystem',
          alternatives: ['Babylon.js', 'A-Frame', 'Pure WebGL']
        },
        {
          name: 'GSAP',
          purpose: 'Animation library',
          why: 'Precise control over animations, excellent performance, timeline support',
          alternatives: ['Framer Motion', 'Anime.js', 'CSS animations']
        },
        {
          name: 'Sanity CMS',
          purpose: 'Headless CMS for collections and products',
          why: 'Real-time preview, image optimization, queryable API',
          alternatives: ['Contentful', 'Strapi', 'Direct database']
        }
      ],
      database: {
        schemaOverview: 'No database — Sanity schemas for products, collections, and categories',
        keyTables: ['N/A - Sanity schemas for products, collections, categories'],
        relationships: [
          'collections → products (one-to-many)',
          'products → categories (many-to-many)'
        ],
        optimizationStrategy: 'Sanity CDN for images, lazy loading for 3D models, query caching'
      },
      api: {
        endpoints: [
          'GET /api/products - Product list with 3D model URLs',
          'GET /api/products/[id] - Single product with 3D model',
          'GET /api/collections - List collections',
          'POST /api/webhooks/sanity - Sanity webhook for rebuild'
        ],
        authentication: 'None for public API, Sanity API token for webhook',
        rateLimiting: '2000 requests per minute for public API',
        cachingStrategy: 'Edge caching on Vercel, Sanity CDN for images, browser caching for 3D models'
      },
      deployment: {
        hosting: 'Vercel Edge Network',
        buildProcess: 'Vite build with TypeScript, Sanity content fetch at build time',
        'ciCd': 'GitHub push triggers Vercel redeploy, automatic preview environments',
        monitoring: 'Vercel Analytics, performance tracking for 3D load times'
      },
      keyDecisions: [
        'Progressive enhancement — basic view works without WebGL, 3D adds on top',
        'Lazy loading 3D models only on capable devices — detection via WebGL capability check',
        'Optimized 3D models with Draco compression — 70% size reduction'
      ],
      tradeoffs: [
        '3D rendering vs. performance: Chose 3D for engagement, accepts slower load on mobile',
        'Three.js vs. WebGL: Chose Three.js for abstraction, would use raw WebGL for maximum optimization',
        'Sanity vs. custom CMS: Chose Sanity for content workflow, accepts monthly cost'
      ],
      lessonsLearned: [
        '3D models can be 5MB+ — implemented loading states, skeleton screens, and progressive loading',
        'WebGL detection isn’t perfect — added manual toggle for users who want 3D',
        'Animation performance varies by device — added quality settings and fallback animations'
      ]
    }
  },
  {
    slug: 'tastetrail',
    title: 'TasteTrail',
    subtitle: 'Restaurant ordering app',
    type: 'personal',
    year: '2024',
    summary:
      'A small ordering app for one restaurant — filter by category, basket stays visible, one confirm at the end.',
    description: 'No sign-up to browse, and the total stays visible — simple ordering flow.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    liveUrl: 'https://tastetrail.vercel.app/',
    githubUrl: 'https://github.com/jerryboss322/tastetrail',
    process: [
      'Menu split into categories, so nothing needs scrolling to find.',
      'The basket and its total stay on screen, with one confirm at the end.',
    ],
    metrics: [],
    outcome: 'Easy to build and easy to get right, which is the point of a small one.',
    architecture: {
      style: 'Simple full-stack application',
      techStack: [
        {
          name: 'React 18',
          purpose: 'Frontend framework',
          why: 'Familiarity, ecosystem, concurrent rendering for smooth UI',
          alternatives: ['Vue 3', 'Svelte', 'Angular']
        },
        {
          name: 'Node.js + Express',
          purpose: 'Backend API',
          why: 'JavaScript continuity, NPM ecosystem, middleware for auth and logging',
          alternatives: ['Fastify', 'Hono', 'NestJS']
        },
        {
          name: 'PostgreSQL',
          purpose: 'Relational database',
          why: 'ACID compliance, JSONB for flexibility, mature ecosystem',
          alternatives: ['MySQL', 'MongoDB', 'SQLite']
        }
      ],
      database: {
        schemaOverview: 'Simple schema for menu items, categories, orders, and order_items',
        keyTables: ['categories', 'menu_items', 'orders', 'order_items'],
        relationships: [
          'categories → menu_items (one-to-many)',
          'orders → order_items (one-to-many)',
          'menu_items → order_items (one-to-many)'
        ],
        optimizationStrategy: 'Indexed on category_id, foreign keys; cached category list in memory'
      },
      api: {
        endpoints: [
          'GET /api/categories - List all categories',
          'GET /api/menu - Menu items by category',
          'POST /api/orders - Create new order',
          'GET /api/orders/[id] - Order status'
        ],
        authentication: 'None for browsing, order confirmation via email',
        rateLimiting: '100 requests per minute, generous for small restaurant',
        cachingStrategy: 'In-memory cache for categories, edge caching for static assets'
      },
      deployment: {
        hosting: 'Vercel (frontend) + Railway (backend)',
        buildProcess: 'Vite build with TypeScript, environment variables for API endpoints',
        'ciCd': 'GitHub Actions on push to main, automatic staging deploy',
        monitoring: 'Vercel Analytics, Railway logs, email notifications for orders'
      },
      keyDecisions: [
        'No authentication for browsing — lower barrier to order',
        'Single confirm button — simplified UX for mobile users',
        'In-memory cache for categories — fast load times for menu'
      ],
      tradeoffs: [
        'Single server vs. microservices: Chose single server for simplicity, would split if scaling',
        'PostgreSQL vs. SQLite: Chose PostgreSQL for scalability, would use SQLite for single-restaurant deployment',
        'Real-time updates vs. polling: Chose polling for simplicity, would add WebSocket for live status'
      ],
      lessonsLearned: [
        'In-memory cache needs restart on updates — added admin endpoint to clear cache',
        'Mobile data usage matters — optimized images, lazy-loaded menu items',
        'Order confirmation email delayed — added SMS option for faster notification'
      ]
    }
  },
];

export const profile = {
  name: 'JBOSS',
  brand: 'JBOSS.DEV',
  fullName: 'Jerry Adewole',
  role: 'Software Engineer',
  location: 'Ogbomoso, Nigeria',
  status: 'Available for new work',
  github: 'https://github.com/jerryboss322',
  whatsapp: 'https://wa.me/2348130075752',
  linkedin: 'https://linkedin.com/in/jboss-dev',
  email: 'jerryadewole2023@gmail.com',
};

export const heroTitle = 'I build architecture-driven web apps, start to finish.';

export const heroIntro =
  "I'm Jerry, a software engineer in Ogbomoso, Nigeria. I design the architecture, build the full stack, and deploy to production. Mostly React and TypeScript, with Node and Postgres behind.";

export const heroStats = [
  { value: '5', label: 'Projects shipped' },
  { value: '100%', label: 'Full-stack ownership' },
];

export const coreSkills = [
  'Full-stack architecture design',
  'Database schema design',
  'API design & documentation',
  'Deployment strategy',
  'Performance optimization',
];

export const architecturePatterns = [
  'Monorepo with microservices',
  'Serverless architecture',
  'Edge caching strategies',
  'Progressive enhancement',
  'Database-driven design',
];

/** Shown as a chip row in About. Titles only — the blurbs were all filler. */
export const values = [
  'Code people can read',
  'Fast on a bad connection',
  'Works with a keyboard',
  'I finish what I start',
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
}

export const capabilities: Capability[] = [
  {
    id: 'architecture',
    icon: 'layers',
    title: 'Full-stack architecture design',
    description: 'Database schema, API design, deployment strategy — one cohesive plan.',
  },
  {
    id: 'performance',
    icon: 'gauge',
    title: 'Performance-first design',
    description: 'Load time as constraint, not cleanup. Edge caching, compression, optimization.',
  },
  {
    id: 'data',
    icon: 'database',
    title: 'Data you can trust',
    description: 'Constraints in the schema, ACID compliance, validation at every layer.',
  },
  {
    id: 'a11y',
    icon: 'accessibility',
    title: 'Usable by everyone',
    description: 'Semantic markup, keyboard paths, contrast-checked, WCAG AA+ compliant.',
  },
  {
    id: 'infra',
    icon: 'cloud',
    title: 'Running in production',
    description: 'Deployed on Linux, monitoring, logging, enough observability to debug it.',
  },
  {
    id: 'design',
    icon: 'pen',
    title: 'Working from the design',
    description: 'Built from Figma, not a screenshot. Pixel-perfect with clean code.',
  },
];

export const processIntro =
  'The same architecture-focused process every time, sized to the job. One goal per screen, boring technology where it counts, and something running for you to look at early.';

export const process = [
  {
    number: '01',
    title: 'Assess architecture',
    description: "A call about the technical requirements. Sometimes the answer is 'keep it simple'.",
  },
  {
    number: '02',
    title: 'Design patterns',
    description: 'Database schema, API design, deployment strategy — the architecture plan.',
  },
  {
    number: '03',
    title: 'Build architecture',
    description: 'Weekly demos of something running, not month-end surprises.',
  },
  {
    number: '04',
    title: 'Test robustness',
    description: 'Empty states, bad input, slow connections, keyboard only, security checks.',
  },
  {
    number: '05',
    title: 'Deploy sustainably',
    description: 'Deployed, documented, monitoring in place, and handover with walkthrough.',
  },
];

export interface TimelineEntry {
  period: string;
  title: string;
  description: string;
  technicalFocus: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  project?: string;
}

export const about = {
  /* Deliberately not an introduction — the hero already says who he is and
     what he builds. This is the part that is not obvious from the portfolio. */
  paragraph:
    'I like the unglamorous parts — the empty state, the form that fails, the page on a bad connection, the database constraint that prevents bad data.',
  timeline: [
    {
      period: '2024 — now',
      title: 'Freelance',
      description: 'Client sites, shops, betting platforms, and full-stack apps.',
      technicalFocus: 'Production deployments, performance optimization, architecture design',
    },
    {
      period: '2023 — 2024',
      title: 'Personal projects',
      description: 'Titan (PostgreSQL + Next.js), Luxora (3D + Sanity), TasteTrail (Node + React).',
      technicalFocus: 'Database schema design, API architecture, deployment strategies',
    },
    {
      period: '2022 — 2023',
      title: 'Foundations',
      description: 'The web, databases, and deployments — building things that actually work.',
      technicalFocus: 'Learning PostgreSQL, mastering React patterns, understanding infrastructure',
    },
  ] satisfies TimelineEntry[],
  testimonials: [
    {
      quote:
        'Jerry rebuilt our site and it finally loads quickly. He explained the architectural decisions in plain language, which made it much easier to sign off on them.',
      author: 'Sally Green',
      role: 'Marketing client',
      project: 'Sally Green Marketing',
    },
    {
      quote:
        'Weekly updates, no surprises on the timeline, and handover notes I could actually follow. The database design was clean and well-documented.',
      author: 'Project collaborator',
      role: 'Startup founder',
    },
  ] satisfies Testimonial[],
};
