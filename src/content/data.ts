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

/** A syntax-highlightable code snippet shown in a project's deep dive. */
export interface CodeSample {
  title: string;
  language: string;
  code: string;
}

/** A prose walk-through of one interesting piece of a project. */
export interface DeepDive {
  heading: string;
  body: string;
  code?: CodeSample;
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
  /** Code snippets that show how the architecture decisions actually look. */
  codeSamples?: CodeSample[];
  /** Narrative walk-throughs of the hardest parts of the build. */
  deepDive?: DeepDive[];
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
    },
    codeSamples: [
      {
        title: 'Separate connection pool for API routes',
        language: 'typescript',
        code: `// db/api.ts — a second pool so API traffic can't starve the web pool
export const apiPool = new Pool({
  ...config,
  max: 20, // web pool stays at max: 10
});`,
      },
      {
        title: 'Server-side validation before any DB write',
        language: 'typescript',
        code: `// utils/validators.ts
export const checkoutSchema = z.object({
  cartItems: z.array(z.object({ id: z.string(), quantity: z.number().int().positive() })),
  shippingAddress: z.object({ street: z.string(), city: z.string(), zip: z.string() }),
  paymentMethod: z.enum(['card', 'bank', 'ussd']),
});`,
      },
      {
        title: 'ISR — fresh products without a rebuild',
        language: 'typescript',
        code: `export async function generateStaticParams() {
  const products = await db.products.findMany({ select: { slug: true } });
  return products.map((p) => ({ slug: p.slug }));
}

export const revalidate = 3600; // revalidate every hour`,
      },
    ],
    deepDive: [
      {
        heading: 'Cart persistence across devices',
        body:
          'The cart had to survive a refresh, follow the shopper to a second device, and still become an order at checkout. A single store couldn’t do all three, so it’s a hybrid: localStorage for instant UI feedback, Redis for cross-device sync while shopping, and the database for the record of truth once the order is placed.',
        code: {
          title: 'The three-tier flow',
          language: 'text',
          code: `User adds item → LocalStorage update → Redis sync → On checkout → Order record`,
        },
      },
      {
        heading: 'Idempotent payment webhooks',
        body:
          'Stripe can deliver the same webhook more than once, and out of order. Every handler checks whether the payment intent was already recorded before doing any work, so a duplicate delivery is a no-op rather than a double charge.',
        code: {
          title: 'Dedupe before you process',
          language: 'typescript',
          code: `const existing = await db.payments.findUnique({
  where: { stripe_payment_intent_id: event.data.object.id },
});

if (existing) {
  return NextResponse.json({ received: true, duplicate: true });
}

await handlePaymentEvent(event);`,
        },
      },
    ],
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
    },
    codeSamples: [
      {
        title: 'Live odds via Redis Pub/Sub',
        language: 'typescript',
        code: `// hooks/useLiveOdds.ts
export const useLiveOdds = (matchId: string) => {
  const [odds, setOdds] = useState<MatchOdds | null>(null);

  useEffect(() => {
    const channel = redis.subscribe(\`odds-updates:\${matchId}\`);
    channel.on('message', (message) => setOdds(JSON.parse(message)));
    return () => channel.unsubscribe();
  }, [matchId]);

  return odds;
};`,
      },
      {
        title: 'One interface, many payment providers',
        language: 'typescript',
        code: `// types/payment.ts
export interface PaymentProvider {
  name: string;
  processPayment: (amount: number, reference: string) => Promise<string>;
  verifyPayment: (reference: string) => Promise<boolean>;
}`,
      },
    ],
    deepDive: [
      {
        heading: 'Bet slip that survives a refresh',
        body:
          'A half-filled bet slip is money left on the table if a refresh wipes it. The slip lives in localStorage for instant persistence and is shared through React Context, with Redis reserved for syncing across devices later — nothing blocks the UI on the network.',
      },
      {
        heading: 'Optimistic odds with a rollback',
        body:
          'Odds move constantly and a user can place a bet mid-update. The UI updates optimistically, then rolls back to the previous value if the placement fails — so the slip never shows odds the server has already rejected.',
        code: {
          title: 'Update, try, roll back on failure',
          language: 'typescript',
          code: `const previousOdds = odds;
setOdds(newOdds);
try {
  await placeBet(bet);
} catch (error) {
  setOdds(previousOdds);
  throw error;
}`,
        },
      },
    ],
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
    },
    codeSamples: [
      {
        title: 'Dynamic GROQ filters for the book list',
        language: 'typescript',
        code: `// utils/queries.ts
export const booksByCategoryQuery = (categorySlug?: string, priceRange?: string) => {
  let filter = '_type == "book"';
  if (categorySlug) filter += \` && category->slug.current == "\${categorySlug}"\`;
  if (priceRange === 'low') filter += ' && price < 5000';

  return \`*[\${filter}] | order(publishedAt desc) { title, coverImage, price }\`;
};`,
      },
      {
        title: 'Queue form submissions to beat the 10s edge timeout',
        language: 'typescript',
        code: `// api/lead-form/route.ts
export async function POST(request: Request) {
  const { email, message } = await request.json();

  // Hand off to the queue instead of calling a slow mail provider inline
  await queues.email.add({ to: 'sally@example.com', subject: \`New lead from \${email}\`, body: message });

  return NextResponse.json({ received: true });
}`,
      },
    ],
    deepDive: [
      {
        heading: 'Real-time preview for the author',
        body:
          'The client wanted to see edits before publishing. Sanity’s preview client clones the main one with a token and the CDN off, so drafts render against the same components the live site uses — no separate preview build to maintain.',
      },
      {
        heading: 'Static speed without a rebuild per edit',
        body:
          'Pages are statically generated for speed, but a CMS edit shouldn’t need a redeploy. Incremental revalidation refreshes the key pages on a timer, bridging SSG and SSR so the client can change a hero image and it lands within the hour.',
        code: {
          title: 'Revalidate on a schedule',
          language: 'typescript',
          code: `export const revalidate = 3600; // refresh every hour
export const dynamic = 'force-static';`,
        },
      },
    ],
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
    },
    codeSamples: [
      {
        title: 'Three.js viewer with OrbitControls',
        language: 'typescript',
        code: `// components/3d-viewer.tsx
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
containerRef.current.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

const loader = new GLTFLoader();
loader.load(modelUrl, (gltf) => {
  scene.add(gltf.scene);
  animate();
});`,
      },
      {
        title: 'Quality settings by device capability',
        language: 'typescript',
        code: `// hooks/useAnimation.ts
export const useAnimation = (deviceQuality: 'high' | 'low') => {
  useEffect(() => {
    if (deviceQuality === 'high') {
      setAnimation(gsap.to('.product', { rotation: 360, duration: 2 }));
    } else {
      setAnimation(gsap.to('.product', { opacity: 1, duration: 0.5 }));
    }
    return () => animation?.kill();
  }, [deviceQuality]);

  return animation;
};`,
      },
    ],
    deepDive: [
      {
        heading: 'Progressive enhancement over flash',
        body:
          'The 3D viewer is the headline feature, but it can’t be the only way to see a product. WebGL detection is unreliable, so there’s always a static image fallback and a manual toggle — the page is fully usable on a device that never loads a single shader.',
      },
      {
        heading: 'GSAP timelines for the product reveal',
        body:
          'The reveal is a choreographed sequence — title, price, then the model settling into scale — built as one GSAP timeline so the steps stay in step and the whole thing is torn down cleanly on unmount.',
        code: {
          title: 'One timeline, staggered steps',
          language: 'typescript',
          code: `const tl = gsap.timeline({ delay: 0.2 });
tl.fromTo(titleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
  .fromTo(priceRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
  .fromTo(productRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, ease: 'back.out(1.7)' });`,
        },
      },
    ],
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
    },
    codeSamples: [
      {
        title: 'Basket that auto-saves and merges duplicates',
        language: 'typescript',
        code: `// context/BasketContext.tsx
const addToBasket = (item: BasketItem) => {
  setBasket((prev) => {
    const existing = prev.find((i) => i.id === item.id);
    if (existing) {
      return prev.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
      );
    }
    return [...prev, item];
  });
};`,
      },
      {
        title: 'Three-step order confirmation',
        language: 'typescript',
        code: `const [step, setStep] = useState<'basket' | 'details' | 'confirm'>('basket');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const response = await fetch('/api/orders', {
    method: 'POST',
    body: JSON.stringify({ basket, details }),
  });
  setStep('success');
};`,
      },
    ],
    deepDive: [
      {
        heading: 'Basket state without a backend round-trip',
        body:
          'For a small restaurant, the basket doesn’t need to live on a server mid-order. It’s held in React Context and mirrored to localStorage on every change, so a refresh or an accidental back-button keeps the order intact and adding the same dish twice just bumps the quantity.',
      },
      {
        heading: 'In-memory cache with an escape hatch',
        body:
          'The menu is cached in memory for speed, but that means a price change wouldn’t show until a restart. An admin endpoint clears the cache on demand, so the kitchen can update prices and see them reflected immediately without a deploy.',
      },
    ],
  },
  {
    slug: 'virtual-football',
    title: 'Virtual Football Universe',
    subtitle: 'Autonomous match simulation & betting platform',
    type: 'personal',
    year: '2026',
    summary:
      'A full-stack sports simulation platform with 6 European leagues, 27 live betting markets, real-time Server-Sent Events (SSE), and an immutable financial ledger.',
    description:
      'Next.js 15 and FastAPI with autonomous double round-robin fixtures, bivariate Poisson odds distributions, and sub-second settlement in integer minor units.',
    tech: ['FastAPI', 'Next.js', 'PostgreSQL', 'Python', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://vfl-psi.vercel.app/',
    githubUrl: 'https://github.com/jerryboss322/VFL',
    process: [
      'Autonomous match simulator running double round-robin seasons with time-dilated 8-minute matchdays.',
      'Dynamic odds pricing powered by independent bivariate Poisson processes across 27 distinct betting markets.',
      'Double-entry immutable ledger tracking all wallet stakes, payouts, and reserves in integer minor units.',
      'Real-time SSE event pipeline broadcasting live match clocks, goal roars, and dynamic handicap shifts.',
    ],
    metrics: [
      { value: '<50ms', label: 'SSE live event latency' },
      { value: '27', label: 'Dynamic betting markets' },
      { value: '6', label: 'Simulated European leagues' },
      { value: '100%', label: 'Ledger ACID compliance' },
    ],
    outcome:
      'Shipped an enterprise-grade sports simulation platform capable of running autonomous infinite seasons with real-time odds pricing, cashout re-offers, and zero floating-point ledger mutations.',
    architecture: {
      style: 'Decoupled full-stack architecture with real-time SSE streaming',
      techStack: [
        {
          name: 'FastAPI (Python 3.12)',
          purpose: 'High-throughput async backend & simulation engine',
          why: 'Native asyncpg support for non-blocking database queries, Pydantic v2 serialization, and fast mathematical modeling',
          alternatives: ['Django', 'Node.js Express', 'Go Fiber'],
        },
        {
          name: 'Next.js 15 + React 19',
          purpose: 'Sportsbook frontend & betting exchange interface',
          why: 'Concurrent rendering for latency-free odds toggling, server components, and responsive mobile-first UI',
          alternatives: ['Vite + React SPA', 'Vue 3 / Nuxt', 'SvelteKit'],
        },
        {
          name: 'PostgreSQL 16 + SQLAlchemy 2.0',
          purpose: 'ACID database & transactional ledger',
          why: 'Strict foreign key integrity, row-level locking for wallet updates, and transaction pooler support',
          alternatives: ['MySQL', 'MongoDB', 'DynamoDB'],
        },
        {
          name: 'Tailwind CSS',
          purpose: 'Betfair/Stake.com high-contrast dark theme',
          why: 'Rapid composition of responsive grid tables, animated odds pills, and digital scoreboards',
          alternatives: ['CSS Modules', 'Styled Components'],
        },
      ],
      database: {
        schemaOverview:
          'Normalized relational schema with 12 core tables covering users, wallets, immutable ledger entries, fixtures, match states, odds snapshots, and bets.',
        keyTables: [
          'wallets',
          'ledger_entries',
          'fixtures',
          'match_states',
          'odds_snapshots',
          'bets',
          'clubs',
          'leagues',
        ],
        relationships: [
          'users (1) → (1) wallets',
          'wallets (1) → (M) ledger_entries',
          'fixtures (1) → (1) match_states',
          'fixtures (1) → (M) odds_snapshots',
          'users (1) → (M) bets',
          'bets (1) → (M) bet_selections',
        ],
        optimizationStrategy:
          'Async connection pooling via Supabase transaction pooler, partial indexing on open bets and live fixtures, joined eager-loading for matchday schedules.',
      },
      api: {
        endpoints: [
          'POST /api/auth/register - Account creation with starter token allocation',
          'POST /api/auth/login - JWT access token authentication',
          'GET /api/fixtures - Active and scheduled fixtures filtered by league',
          'GET /api/matches/[id]/state - Live match clock, score, and period',
          'GET /api/stream/events - SSE match clock, event feed, and score broadcast',
          'GET /api/odds/[fixture_id] - Bivariate Poisson odds across 27 markets',
          'POST /api/bets - Idempotent bet placement with ledger balance reservation',
          'GET /api/wallet/transactions - Paginated immutable double-entry ledger history',
        ],
        authentication: 'JWT Bearer token authentication with bcrypt password hashing',
        rateLimiting: '120 requests per minute per IP, token-bucket protection on bet creation',
        cachingStrategy: 'In-memory match simulation state broker with SSE broadcast and database savepoint checkpoints',
      },
      deployment: {
        hosting: 'Vercel (Next.js frontend + Serverless Python API) & Supabase PostgreSQL',
        buildProcess: 'Next.js production build with TypeScript verification and isolated Python dependency packaging',
        ciCd: 'GitHub Actions on push to main with pytest async suite and Vercel preview deploys',
        monitoring: 'Dedicated /api/health/db diagnostic endpoint, structured error logs, and Vercel Analytics',
      },
      keyDecisions: [
        'Strict integer minor units for all balances and stakes to avoid IEEE 754 floating-point errors',
        'Stateless time-dilation simulation tick capable of running continuously or catching up on demand',
        'Early settlement for conditional markets (BTTS, Over 2.5) as soon as criteria are satisfied in-play',
      ],
      tradeoffs: [
        'SSE vs. WebSockets: Chose SSE for automatic reconnection and simpler serverless compatibility',
        'Monolithic Next.js + FastAPI on Vercel vs. separate VPS: Chose single deployment for zero-devops hosting',
        'Dynamic Poisson recalculation vs. static pre-match odds: Adds compute overhead per minute but delivers true in-play exchange mechanics',
      ],
      lessonsLearned: [
        'Serverless Postgres connection exhaustion is resolved via Supabase transaction poolers and disabling prepared statement caching',
        'Idempotency keys on bet placement prevent duplicate bets during mobile network packet retries',
        'Decoupling the simulation tick from HTTP request loops eliminates latency spikes for concurrent visitors',
      ],
    },
    codeSamples: [
      {
        title: 'Bivariate Poisson odds calculation with overround',
        language: 'python',
        code: `def _poisson_pmf(k: int, lam: float) -> float:
    if lam <= 0:
        return 1.0 if k == 0 else 0.0
    return (lam ** k) * math.exp(-lam) / math.factorial(k)

# Compute joint probability matrix P(home = x, away = y)
joint = [[p_home[x] * p_away[y] for y in range(max_goals + 1)] for x in range(max_goals + 1)]

p_win = sum(joint[x][y] for x in range(max_goals + 1) for y in range(x))
p_draw = sum(joint[x][x] for x in range(max_goals + 1))
p_loss = sum(joint[x][y] for x in range(max_goals + 1) for y in range(x + 1, max_goals + 1))

# Convert probabilities to bookmaker odds with 4.5% overround
raw_odds = 1.0 / (prob * OVERROUND)
return max(MIN_ODDS, min(MAX_ODDS, round(raw_odds, 2)))`,
      },
      {
        title: 'Immutable double-entry ledger reservation',
        language: 'python',
        code: `async def place_bet(session: AsyncSession, user_id: UUID, stake_minor: int, idempotency_key: str):
    # Lock wallet row for update to prevent concurrent race conditions
    wallet = await session.execute(
        select(Wallet).where(Wallet.user_id == user_id).with_for_update()
    )
    wallet = wallet.scalar_one()

    if wallet.balance_minor < stake_minor:
        raise InsufficientFundsException()

    wallet.balance_minor -= stake_minor
    ledger_entry = LedgerEntry(
        wallet_id=wallet.id,
        user_id=user_id,
        kind="stake_reserve",
        amount_minor=-stake_minor,
        balance_after_minor=wallet.balance_minor,
        description="Stake reserved for bet placement",
        reference=idempotency_key,
    )
    session.add(ledger_entry)
    await session.commit()`,
      },
      {
        title: 'Stateless simulation tick with Berger circle rotation',
        language: 'python',
        code: `def get_season_pairings(clubs: list[Club], matchday: int) -> list[tuple[Club, Club]]:
    """Double round-robin generator: 38 matchdays for 20 clubs using circle rotation."""
    n = len(clubs)
    half_season = n - 1
    rotation = list(clubs)
    rounds = []
    for r in range(half_season):
        pairings = []
        for i in range(n // 2):
            c1, c2 = rotation[i], rotation[n - 1 - i]
            pairings.append((c1, c2) if r % 2 == 0 else (c2, c1))
        rotation = [rotation[0]] + [rotation[-1]] + rotation[1:-1]
        rounds.append(pairings)
    return rounds[(matchday - 1) % len(rounds)]`,
      },
    ],
    deepDive: [
      {
        heading: 'Autonomous match engine & infinite season rollover',
        body:
          'Simulating thousands of fixtures across 6 leagues without human intervention required a deterministic time-dilation model. Each match lasts 8 real-world minutes (480 seconds). One game-minute equates to 5.33 seconds of wall-clock time. Rather than running fragile in-memory background threads that crash when serverless instances spin down, the engine compares wall-clock deltas on every tick, allowing instantaneous state catch-up and rollover to the next matchday.',
        code: {
          title: 'Deterministic wall-clock catchup',
          language: 'python',
          code: `elapsed_seconds = (now_utc - fixture.kickoff_at).total_seconds()
target_minute = min(90, int(elapsed_seconds / SECONDS_PER_GAME_MINUTE))
while current_minute < target_minute:
    advance_tick(match_state)
    current_minute += 1`,
        },
      },
      {
        heading: 'Zero floating-point arithmetic in financial ledger',
        body:
          'Sports betting platforms cannot tolerate rounding drifts caused by standard binary floating-point representation. Every transaction in Virtual Football Universe is strictly stored and calculated in integer minor units (1 token = 100 minor units). All wallet modifications require a corresponding append-only ledger row, and bet placements enforce client-side idempotency keys to ensure mobile network reconnections never trigger double debits.',
        code: {
          title: 'ACID ledger integrity check',
          language: 'text',
          code: `Client Intent (Idempotency Key) → Lock Wallet Row → Check Balance → Deduct Minor Units → Append Ledger Entry → Commit Transaction`,
        },
      },
    ],
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

export const heroStats = [
  { value: '6', label: 'Projects shipped' },
  { value: '100%', label: 'Full-stack ownership' },
];

export const coreSkills = [
  'Full-stack architecture design',
  'Database schema design',
  'API design & documentation',
  'Deployment strategy',
  'Performance optimization',
];

export interface Faq {
  q: string;
  a: string;
}

/** The questions that come up before a first call — answered on the contact page. */
export const faqs: Faq[] = [
  {
    q: 'How do you charge?',
    a: 'Fixed price per project, agreed after the first call once the scope is clear. For ongoing work, a monthly retainer. No hourly surprises.',
  },
  {
    q: 'What does the first call look like?',
    a: 'Thirty minutes. You describe what you are building and where it is stuck; I give an honest read on the architecture, roughly what it costs, and whether I am the right person for it.',
  },
  {
    q: 'How soon will I hear back?',
    a: 'Usually within a day. If your note arrives over a weekend, first thing Monday.',
  },
  {
    q: 'Do you work with existing codebases?',
    a: 'Yes. Audits, performance work, and picking up a project someone else started are a good share of what I do.',
  },
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

export interface ToolGroup {
  category: string;
  items: string[];
}

/** The stack, grouped so it reads as a toolbox rather than a tag cloud. */
export const toolbox: ToolGroup[] = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Next.js API Routes', 'REST', 'Webhooks', 'Zod validation'],
  },
  {
    category: 'Data',
    items: ['PostgreSQL', 'MySQL', 'Redis', 'Prisma', 'Schema design'],
  },
  {
    category: 'Infra & tooling',
    items: ['Vercel', 'Railway', 'Linux', 'GitHub Actions', 'Sentry', 'Sanity CMS'],
  },
];

export interface Principle {
  title: string;
  body: string;
}

/** The longer-form version of `values` — each principle with the reasoning. */
export const principles: Principle[] = [
  {
    title: 'Boring tech where it counts',
    body:
      'Novelty belongs in the product, not the plumbing. I reach for well-trodden tools at the layers that have to keep working — the database, the auth, the deploy — and spend the risk budget on the part that is actually new.',
  },
  {
    title: 'One goal per screen',
    body:
      'A page that tries to do three things does none of them well. I design around a single primary action per screen, then earn the secondary ones.',
  },
  {
    title: 'Something running, early',
    body:
      'A deployed skeleton on day one beats a beautiful spec in month two. Getting real code in front of you early is how we find the wrong assumptions while they are still cheap to fix.',
  },
  {
    title: 'The unglamorous parts',
    body:
      'Empty states, the form that fails, the page on a bad connection, the constraint that stops bad data. These are what separate a demo from software, so they get designed, not left to the end.',
  },
];

export const availability = {
  status: 'Available for new work',
  detail:
    'Taking on a small number of projects at a time so each one gets full attention. Currently booking for the next few weeks.',
};

/**
 * What a visitor is asking for, in their words.
 *
 * These are the qualification questions a builder's form should answer for
 * itself. Kept here rather than inline in the form so the offers stay in one
 * place and can be reused by a services page without drifting.
 */
export const projectTypes: { value: string; label: string }[] = [
  { value: 'new-website', label: 'New website' },
  { value: 'redesign', label: 'Redesign or fix an existing site' },
  { value: 'web-app', label: 'Full-stack web application' },
  { value: 'maintenance', label: 'Ongoing maintenance or retainer' },
  { value: 'unsure', label: 'Not sure yet' },
];

/**
 * Deliberately wide, non-committal bands with an explicit "advise me" option.
 *
 * These are not quotes. The stated policy is a fixed price agreed after the
 * first call, so a range here is only to establish whether a conversation is
 * worth having -- publishing precise figures would contradict that.
 */
export const budgetBands: { value: string; label: string }[] = [
  { value: 'under-500', label: 'Under $500' },
  { value: '500-1500', label: '$500 – $1,500' },
  { value: '1500-5000', label: '$1,500 – $5,000' },
  { value: 'over-5000', label: 'Over $5,000' },
  { value: 'unsure', label: 'Not sure — advise me' },
];

export const timelines: { value: string; label: string }[] = [
  { value: 'urgent', label: 'As soon as possible' },
  { value: 'month', label: 'Within a month' },
  { value: 'quarter', label: 'One to three months' },
  { value: 'exploring', label: 'Just exploring' },
];

export type ServiceIcon = 'layout' | 'refresh' | 'stack' | 'wrench';

export interface Service {
  id: string;
  icon: ServiceIcon;
  title: string;
  summary: string;
  includes: string[];
  bestFor: string;
}

/**
 * What you can buy.
 *
 * Deliberately offerings rather than skills. The capabilities list on the
 * about page answers "what can he do"; this answers "which of those do I
 * want", which is the question a visitor actually arrives with. The ids match
 * the `projectTypes` values on the contact form so the two cannot drift.
 */
export const services: Service[] = [
  {
    id: 'new-website',
    icon: 'layout',
    title: 'New website',
    summary:
      'A site designed and built end to end — structure, copy, build, and the server it runs on. For a business that needs a real web presence rather than a page that exists.',
    includes: [
      'Discovery call and a written page plan before any code',
      'Responsive build from your content, not a template',
      'Deployed, with HTTPS, and handed over with a walkthrough',
      'Search and social meta tags set up from the start',
    ],
    bestFor: 'Businesses starting out, or replacing a site that no longer reflects them.',
  },
  {
    id: 'redesign',
    icon: 'refresh',
    title: 'Redesign or rescue',
    summary:
      'For a site that already exists and is not working — slow on a phone, hard to use, out of date, or not ranking. I work out why first, then fix the causes rather than repainting the surface.',
    includes: [
      'An audit first: what is actually slow, and why',
      'Performance work — load time treated as a constraint, not a cleanup',
      'Responsive and keyboard-accessible fixes where they are broken',
      'A plain report of what I found, whether or not you hire me',
    ],
    bestFor: 'Sites that are live but underperforming — the most common thing I am asked for.',
  },
  {
    id: 'web-app',
    icon: 'stack',
    title: 'Full-stack application',
    summary:
      'A real application with a database behind it: accounts, data, and the interface to use it. Front end, API and schema designed together so the thing is maintainable after I leave.',
    includes: [
      'Database schema designed around the constraints that prevent bad data',
      'API designed and documented, with validation at every layer',
      'Auth, error states, empty states and the unhappy paths',
      'A deployment you can run and logs you can debug',
    ],
    bestFor: 'Products where a brochure site is not enough — dashboards, ordering, booking, internal tools.',
  },
  {
    id: 'maintenance',
    icon: 'wrench',
    title: 'Ongoing maintenance',
    summary:
      'Keeping a site alive after it ships: dependencies, monitoring, and the small changes that accumulate. For sites already built by me or by someone else.',
    includes: [
      'Dependency and security updates',
      'Monitoring and alerts, so breakage is noticed before it is reported',
      'A standing slot each month for changes and fixes',
      'Honest advice on what is worth changing and what is not',
    ],
    bestFor: 'Sites without an in-house developer, and anyone who would rather not think about it.',
  },
];

/**
 * How working together actually goes.
 *
 * PLACEHOLDER TERMS. Every `TODO(...)` is a commitment rather than copy —
 * a number or promise you are making to a paying client. Replace each one
 * before this page goes live. The surrounding wording is deliberately
 * non-numerical so it stays true regardless of what you set.
 */
export const engagementTerms: { id: string; title: string; detail: string }[] = [
  {
    id: 'ownership',
    title: 'The work is yours',
    detail:
      'Source files, the repository and any accounts set up for the project belong to you. I work in your repository rather than handing over an archive at the end, so there is no lock-in and nothing to unlock later.',
  },
  {
    id: 'support',
    title: 'After launch',
    detail:
      'Launch is not the end of it. TODO(support window) of support is included after go-live, covering anything that turns out to be my fault rather than a change of mind.',
  },
  {
    id: 'documentation',
    title: 'What you get handed over',
    detail:
      'A written README covering how to run, deploy and update the project, plus a walkthrough recording. TODO(document deliverables if you provide anything beyond this)',
  },
  {
    id: 'revisions',
    title: 'Revisions',
    detail:
      'TODO(revision rounds) rounds of revisions are included in the scope we agree. Beyond that, further changes are quoted before they are started — never billed as a surprise on an invoice.',
  },
  {
    id: 'communication',
    title: 'How we keep in touch',
    detail:
      'Weekly updates while the work is in progress, and something running to look at rather than a status report about something running. TODO(state your channel — email, call, or chat)',
  },
  {
    id: 'payment',
    title: 'How billing works',
    detail:
      'A fixed price per project, agreed once the scope is clear, split across TODO(deposit and milestone schedule). No hourly billing, because it rewards the wrong thing.',
  },
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
