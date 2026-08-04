export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  year: string;
  summary: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  outcome: string;
  caseStudyFile: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  email: string;
  location: string;
  available: boolean;
}

export const siteConfig: SiteConfig = {
  name: 'JBOSS',
  title: 'Adewole Jeremiah Ademola • Engineering Portfolio',
  description:
    'Engineering detail into digital products. I construct cohesive design token architectures, design layouts around structured grid lines, and write semantic, high-performance CSS and JavaScript.',
  email: 'hello@jboss.dev',
  location: 'Lagos / Remote',
  available: true,
};

export const navItems: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Systems', href: '#systems' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export const projects: Project[] = [
  {
    slug: 'titan',
    title: 'Titan Commerce',
    subtitle: 'E-commerce Platform',
    role: 'Lead Frontend Engineer',
    year: '2025',
    summary:
      'A high-performance e-commerce platform built for conversion. Features a custom-designed checkout flow, real-time inventory synchronization, and a headless CMS integration.',
    description:
      'Titan Commerce is an e-commerce platform engineered for optimal conversion and performance. Built with a microservices architecture, it integrates with a headless CMS and provides a seamless shopping experience across web and mobile.',
    image: '/img/project-fintech.jpg',
    tech: ['React', 'TypeScript', 'Stripe API', 'Tailwind CSS', 'Node.js'],
    liveUrl: 'https://titan-teal.vercel.app/',
    githubUrl: 'https://github.com/jerryboss322/titan',
    outcome:
      'Increased conversion rate by 35% and reduced page load time from 4.2s to 1.1s through performance optimization and code splitting.',
    caseStudyFile: 'titan',
  },
  {
    slug: 'luxora',
    title: 'Luxora',
    subtitle: 'Luxury Marketplace',
    role: 'Product Designer & Frontend Lead',
    year: '2024',
    summary:
      'A curated luxury marketplace with a focus on high-fidelity design and immersive product presentation. Features custom WebGL-powered 3D product previews.',
    description:
      'Luxora is a premium marketplace for luxury goods, emphasizing visual storytelling and tactile interactions. The platform uses Three.js for 3D product visualization and GSAP for sophisticated micro-interactions.',
    image: '/img/project-brand.jpg',
    tech: ['React', 'Three.js', 'GSAP', 'Framer Motion', 'Sanity CMS'],
    liveUrl: 'https://luxora-self-two.vercel.app/',
    githubUrl: 'https://github.com/jerryboss322/LUXORA',
    outcome:
      'Achieved a 4.9/5 user satisfaction score and 28% higher engagement compared to the previous platform.',
    caseStudyFile: 'luxora',
  },
  {
    slug: 'aurora',
    title: 'Aurora Design System',
    subtitle: 'UI Foundation',
    role: 'Design Systems Architect',
    year: '2025',
    summary:
      'A unified UI foundation for complex dashboard workflows. Built with strict custom properties, a multi-tier spatial scale, and micro-animations that clarify transitions.',
    description:
      'Aurora is a comprehensive design system for enterprise dashboards. It provides 50+ components, a token pipeline, and a documentation site — all designed for consistency and rapid prototyping.',
    image: '/img/project-design-system.jpg',
    tech: ['Design Tokens', 'Storybook', 'TypeScript', 'CSS Modules', 'Figma'],
    liveUrl: 'https://aurora-beta-gilt.vercel.app/',
    githubUrl: 'https://github.com/jerryboss322/AURORA',
    outcome:
      'Deployed to 4 core platforms, reducing frontend styling debt by 60% and enabling rapid prototyping cycles for internal product teams.',
    caseStudyFile: 'aurora',
  },
  {
    slug: 'tastetrail',
    title: 'TasteTrail',
    subtitle: 'Food Discovery App',
    role: 'Full-Stack Developer',
    year: '2024',
    summary:
      'A location-based food discovery app that helps users find authentic, locally-owned restaurants. Features personalized recommendations powered by a collaborative filtering engine.',
    description:
      "TasteTrail connects food lovers with hidden culinary gems. Built with a recommendation engine that learns from user preferences and dining history, it surfaces authentic local experiences.",
    image: '/img/project-motion.jpg',
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'Redis', 'Mapbox API'],
    liveUrl: 'https://tastetrail.vercel.app/',
    githubUrl: 'https://github.com/jerryboss322/tastetrail',
    outcome:
      'Grew to 12k monthly active users with an average session duration of 14 minutes.',
    caseStudyFile: 'tastetrail',
  },
  {
    slug: 'sallygreen',
    title: 'Sally Green Marketing',
    subtitle: 'Marketing Website',
    role: 'Frontend Engineer',
    year: '2024',
    summary:
      'A modern marketing site for Sally Green, a sustainable lifestyle brand. Built with a focus on accessibility, performance, and a cohesive visual identity.',
    description:
      'A premium marketing website for Sally Green, featuring smooth animations, accessibility-first design, and optimized assets for performance.',
    image: '/img/project-motion.jpg',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    liveUrl: 'https://sallygreenmarketing.vercel.app/',
    githubUrl: 'https://github.com/jerryboss322/sallygreen-marketing',
    outcome: 'Improved site performance to 98 Lighthouse score and 1.2s LCP.',
    caseStudyFile: 'sallygreen',
  },
];

export const skills = {
  frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  backend: ['Node.js', 'PostgreSQL', 'Express', 'REST API', 'GraphQL'],
  tools: ['Git', 'Vercel', 'Storybook', 'Figma', 'VS Code'],
  design: ['Design Systems', 'UI/UX', 'CSS Architecture', 'Animation', 'Typography'],
};

export const systems = [
  {
    title: 'Visual Focus',
    description:
      'We believe in absolute focus. Elements are given breathing room, drawing attention to active data layers without clutter.',
    icon: '⊙',
  },
  {
    title: 'Narrative Motion',
    description:
      'Animation is never decoration. Every transition explains layout hierarchy, guiding the user’s eye dynamically across states.',
    icon: '⇄',
  },
  {
    title: 'Typographic Rhythm',
    description:
      'Confident hierarchy using geometric heading structures paired with clean, readable monospace details for metadata.',
    icon: '¶',
  },
  {
    title: 'Fluid Response',
    description:
      'Interfaces must feel physical. Interactive states react with physics-inspired magnetic pulls and soft scales.',
    icon: '◎',
  },
  {
    title: 'Stillness & Hold',
    description:
      'The space between actions is vital. No looping loaders or idle pulses. Stillness is what makes motion feel intentional.',
    icon: '■',
  },
  {
    title: 'Unified Cascade',
    description:
      'A dual-theme architecture mapping the same tokens to light and dark modes, ensuring unified semantics across themes.',
    icon: '◑',
  },
];

export const testimonials = [
  {
    name: 'Sarah J.',
    role: 'VP of Product, Apex FinTech',
    quote:
      'The dashboard feels fast, solid, and incredibly precise. There is no waste; every line, gap, and motion serves a clear user purpose.',
  },
  {
    name: 'Devon K.',
    role: 'Engineering Lead, Aurora Systems',
    quote:
      'The component structure and token architecture solved an alignment problem we spent six months trying to fix. High technical craft.',
  },
];

export const aboutStory = {
  headline: 'Building digital infrastructure with visual clarity.',
  narrative:
    "I bridge the gap between design vision and production-ready implementation. I construct cohesive design token architectures, design layouts around structured grid lines, and write semantic, high-performance CSS and JavaScript. My goal is to make every interface feel tactile, performant, and simple to navigate.",
  values: [
    'Engineering Excellence',
    'User-Centered Design',
    'Performance Obsession',
    'Visual Clarity',
  ],
  stats: [
    { value: '14+', label: 'Projects Shipped' },
    { value: '60%', label: 'Debt Reduction' },
    { value: '100%', label: 'Native Frontend' },
  ],
};
