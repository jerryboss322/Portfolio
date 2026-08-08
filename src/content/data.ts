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
      'A high-performance e-commerce platform built for conversion — custom checkout, real-time inventory sync, and a headless CMS.',
    description:
      'Titan Commerce is an e-commerce platform engineered for optimal conversion and performance. Built on a microservices architecture, it integrates a headless CMS and delivers a seamless shopping experience across web and mobile.',
    image: '/img/projects/titan.webp',
    gallery: ['/img/projects/titan.webp'],
    tech: ['React', 'TypeScript', 'Stripe API', 'Tailwind CSS', 'Node.js'],
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
      'A curated luxury marketplace focused on high-fidelity design and immersive product presentation — including WebGL product previews.',
    description:
      'Luxora is a premium marketplace for luxury goods that emphasizes visual storytelling and tactile interactions. The platform uses Three.js for 3D product visualization and GSAP for sophisticated micro-interactions.',
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
    subtitle: 'Food Discovery App',
    role: 'Full-Stack Developer',
    year: '2024',
    summary:
      'A location-based food discovery app that surfaces authentic, locally-owned restaurants with personalized recommendations.',
    description:
      "TasteTrail connects food lovers with hidden culinary gems. Built with a recommendation engine that learns from user preferences and dining history, it surfaces authentic local experiences.",
    image: '/img/projects/tastetrail.webp',
    gallery: ['/img/projects/tastetrail.webp'],
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'Redis', 'Mapbox API'],
    liveUrl: 'https://tastetrail.vercel.app/',
    githubUrl: 'https://github.com/jerryboss322/tastetrail',
    challenge: [
      'Generic review platforms bury small, local restaurants under chain results, making discovery frustrating.',
      'Recommendations ignored context — location, cuisine preference, and dining history were all flat.',
      'Search results often surfaced outdated listings or permanently closed venues.',
    ],
    process: [
      'Built a collaborative filtering engine that weighs dining history, cuisine affinity, and geospatial proximity.',
      'Engineered a Node.js + PostgreSQL backend with Redis caching for sub-100ms recommendation lookups.',
      'Integrated Mapbox for a rich, map-first discovery experience with live venue data.',
    ],
    solution: [
      'Delivered a mobile-first experience (React Native) that feels fast even on 4G connections.',
      'Personalized home feeds adapt as users rate and save venues, improving relevance over time.',
      'Grew to 12k monthly active users with an average session duration of 14 minutes.',
    ],
    metrics: [
      { value: '12k', label: 'Monthly active users' },
      { value: '14 min', label: 'Avg. session' },
      { value: '<100ms', label: 'Recommendations' },
    ],
    outcome:
      'Grew to 12k monthly active users with an average session duration of 14 minutes.',
  },
  {
    slug: 'sallygreen',
    title: 'Sally Green Marketing',
    subtitle: 'Marketing Website',
    role: 'Frontend Engineer',
    year: '2024',
    summary:
      'A modern marketing site for a sustainable lifestyle brand — accessibility-first, high-performance, and visually cohesive.',
    description:
      'A premium marketing website for Sally Green, featuring smooth animations, accessibility-first design, and optimized assets for performance.',
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
      'A premium football betting platform for the Nigerian market — live odds, a persistent bet-slip engine, and instant wallet funding through local payment rails.',
    description:
      'Jbet is a fast, licensed sports betting platform built for Nigerian football fans. It surfaces live odds across major leagues, a friction-free bet-slip flow, and instant wallet deposits via local payment channels — all behind 256-bit SSL.',
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
  headline: 'I build digital products that solve real problems.',
  tagline: 'Full-stack applications · Platforms · APIs',
  location: 'Lagos, Nigeria',
  status: 'Available for select projects',
  heroPortrait: '/img/hero.webp',
  github: 'https://github.com/jerryboss322',
  linkedin: 'https://linkedin.com/in/jboss-dev',
  email: 'hello@jboss.dev',
};

export const about = {
  heading:
    "I'm a software engineer focused on building useful, reliable and polished digital products.",
  narrative:
    'I work across frontend, backend and system architecture, with a strong interest in turning complex requirements into simple interfaces.',
  portrait: '/img/about.webp',
};

export const capabilities = [
  'Web Applications',
  'SaaS Platforms',
  'E-commerce',
  'APIs & Backend Systems',
  'Interactive Interfaces',
  'Dashboards',
  'Developer Tools',
  'Data-driven Products',
];

export const stack = [
  {
    group: 'Frontend',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Next.js', 'React Native'],
  },
  {
    group: 'Backend',
    items: ['Node.js', 'Express', 'REST API', 'GraphQL'],
  },
  {
    group: 'Database',
    items: ['PostgreSQL', 'Redis'],
  },
  {
    group: 'Infrastructure',
    items: ['Vercel', 'Git'],
  },
  {
    group: 'Tools & Design',
    items: ['Figma', 'Storybook', 'Three.js', 'GSAP', 'Design Systems'],
  },
];
