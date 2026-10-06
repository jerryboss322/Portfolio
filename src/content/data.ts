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
  year: string;
  summary: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  process: string[];
  metrics: Metric[];
  outcome: string;
}

export const projects: Project[] = [
  {
    slug: 'titan',
    title: 'Titan Commerce',
    subtitle: 'Online store',
    type: 'personal',
    year: '2025',
    summary:
      'A shop I built to learn the full stack: real accounts, a cart that survives a refresh, real data behind it.',
    description: 'Postgres-backed, so the shop behaves like a real store.',
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
  },
  {
    slug: 'jbet',
    title: 'Jbet',
    subtitle: 'Betting platform',
    type: 'experiment',
    year: '2026',
    summary:
      'A Nigerian betting platform: live odds, a bet slip that keeps up, deposits that clear in seconds.',
    description: 'Deposits run through the payment rails people here actually use.',
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
  },
  {
    slug: 'sallygreen',
    title: 'Sally Green',
    subtitle: 'Marketing site for an author',
    type: 'client',
    year: '2024',
    summary:
      'A marketing site for an author — results, case studies, and a form that collects what I need.',
    description: 'Her team has run it since handover without me.',
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
  },
  {
    slug: 'luxora',
    title: 'Luxora',
    subtitle: 'Shopfront concept',
    type: 'personal',
    year: '2024',
    summary:
      'A shopfront experiment where each product spins in the browser instead of sitting still.',
    description: 'Collections live in Sanity, so new stock needs no release.',
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
  },
  {
    slug: 'tastetrail',
    title: 'TasteTrail',
    subtitle: 'Ordering for a restaurant',
    type: 'personal',
    year: '2024',
    summary:
      'A small ordering app for one restaurant. Filter, add, see the total, confirm.',
    description: 'No sign-up to browse, and the total stays visible.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    liveUrl: 'https://tastetrail.vercel.app/',
    githubUrl: 'https://github.com/jerryboss322/tastetrail',
    process: [
      'Menu split into categories, so nothing needs scrolling to find.',
      'The basket and its total stay on screen, with one confirm at the end.',
    ],
    metrics: [],
    outcome: 'Easy to build and easy to get right, which is the point of a small one.',
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

export const heroTitle = 'I build web apps, start to finish.';

export const heroIntro =
  "I'm Jerry, a software engineer in Ogbomoso, Nigeria. I build the front end, the back end, and the deployment. Mostly React and TypeScript, with Node and Postgres behind.";

export const heroStats = [
  { value: '3+', label: 'Years experience' },
  { value: '5', label: 'Projects shipped' },
];

export const coreSkills = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Tailwind CSS',
  'Docker',
  'Linux',
  'Git',
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
    id: 'delivery',
    icon: 'layers',
    title: 'The whole thing',
    description: 'Database, API, interface and deployment — one person.',
  },
  {
    id: 'performance',
    icon: 'gauge',
    title: 'Fast pages',
    description: 'Load time is a constraint, not a cleanup task.',
  },
  {
    id: 'data',
    icon: 'database',
    title: 'Data you can trust',
    description: 'Constraints in the schema, checks on every input.',
  },
  {
    id: 'a11y',
    icon: 'accessibility',
    title: 'Usable by everyone',
    description: 'Semantic markup, keyboard paths, contrast that passes.',
  },
  {
    id: 'infra',
    icon: 'cloud',
    title: 'Running in production',
    description: 'Deployed on Linux, with enough logging to debug it.',
  },
  {
    id: 'design',
    icon: 'pen',
    title: 'Working from the design',
    description: 'Built from the design file, not a screenshot.',
  },
];

export const processIntro =
  'The same five stages every time, sized to the job. One goal per screen, boring technology where it counts, and something running for you to look at early.';

export const process = [
  {
    number: '01',
    title: 'Talk it through',
    description: "A call about what you're building. Sometimes the answer is no.",
  },
  {
    number: '02',
    title: 'Agree the scope',
    description: "What's in, what's out, and what it costs. Cut it down first.",
  },
  {
    number: '03',
    title: 'Build it',
    description: 'Weekly demos of something running, not month-end surprises.',
  },
  {
    number: '04',
    title: 'Test the awkward parts',
    description: 'Empty states, bad input, slow connections, keyboard only.',
  },
  {
    number: '05',
    title: 'Hand it over',
    description: 'Deployed, documented, and a walkthrough. Plus two weeks of fixes.',
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
  /* Deliberately not an introduction — the hero already says who he is and
     what he builds. This is the part that is not obvious from the portfolio. */
  paragraph:
    'I like the unglamorous parts — the empty state, the form that fails, the page on a bad connection.',
  timeline: [
    {
      period: '2024 — now',
      title: 'Freelance',
      description: 'Client sites, shops and full-stack apps.',
    },
    {
      period: '2023 — 2024',
      title: 'Personal projects',
      description: 'Titan, Luxora, TasteTrail.',
    },
    {
      period: '2022 — 2023',
      title: 'Foundations',
      description: 'The web, databases, and deployments.',
    },
  ] satisfies TimelineEntry[],
  testimonials: [
    {
      quote:
        'Jerry rebuilt our site and it finally loads quickly. He explained the decisions in plain language, which made it much easier to sign off on them.',
      author: 'Sally Green',
      role: 'Marketing client',
      project: 'Sally Green Marketing',
    },
    {
      quote:
        'Weekly updates, no surprises on the timeline, and handover notes I could actually follow.',
      author: 'Project collaborator',
      role: 'Startup founder',
    },
  ] satisfies Testimonial[],
};
