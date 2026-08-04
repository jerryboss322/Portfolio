export const disciplines = [
  { id: 'all', name: 'All' },
  { id: 'interface', name: 'Interface' },
  { id: 'product', name: 'Product' },
  { id: 'brand', name: 'Identity' },
  { id: 'motion', name: 'Motion' }
];

export const projects = [
  {
    id: 'aurora-ui',
    name: 'Aurora UI System',
    discipline: 'interface',
    badge: 'Design System',
    year: '2025',
    role: 'Lead Systems Architect',
    summary: 'A unified UI foundation designed for complex dashboard workflows. Built with strict custom properties, a multi-tier spatial scale, and micro-animations that clarify dashboard transitions.',
    outcome: 'Deployed to 4 core platforms, reducing frontend styling debt by 60% and enabling rapid prototyping cycles for internal product teams.',
    tags: ['Design Tokens', 'Web Components', 'System Scale'],
    image: 'img/project-design-system.jpg'
  },
  {
    id: 'apex-ledger',
    name: 'Apex Ledger Dashboard',
    discipline: 'product',
    badge: 'Fintech Platform',
    year: '2024',
    role: 'Product Designer & Dev',
    summary: 'A high-throughput financial interface designed for asset tracking and real-time ledger auditing. Focuses on information density, screen readability, and clean keyboard-driven navigation.',
    outcome: 'Decreased dashboard transaction verification time by 45% and improved usability scores among institutional finance teams.',
    tags: ['Data Density', 'A11y', 'Interaction Model'],
    image: 'img/project-fintech.jpg'
  },
  {
    id: 'aeon-apparel',
    name: 'Aeon Identity System',
    discipline: 'brand',
    badge: 'Brand Identity',
    year: '2024',
    role: 'Creative Director',
    summary: 'A geometric brand language and packaging system for an experimental fashion label. Combines minimalist typography with a high-contrast layout system across print and digital touchpoints.',
    outcome: 'Created a cohesive visual playbook implemented across web, print catalog, packaging, and digital marketing materials.',
    tags: ['Brand Guidelines', 'Identity', 'Art Direction'],
    image: 'img/project-brand.jpg'
  },
  {
    id: 'flux-visualizer',
    name: 'Flux Particle Visualizer',
    discipline: 'motion',
    badge: 'Interactive Art',
    year: '2025',
    role: 'Motion Designer',
    summary: 'An interactive canvas-based animation system visualizing network latency. Leverages fluid dynamics simulation to represent server response times in an intuitive, organic way.',
    outcome: 'Used as the keynote backdrop for the annual TechSync conference, generating over 12k interactive browser hits.',
    tags: ['Canvas API', 'Fluid Dynamics', 'Motion Language'],
    image: 'img/project-motion.jpg'
  }
];

export const systems = [
  {
    title: 'Visual Focus',
    description: 'We believe in absolute focus. Elements are given breathing room, drawing attention to active data layers without clutter.',
    icon: '⊙'
  },
  {
    title: 'Narrative Motion',
    description: 'Animation is never decoration. Every transition explains layout hierarchy, guiding the user’s eye dynamically across states.',
    icon: '⇄'
  },
  {
    title: 'Typographic Rhythm',
    description: 'Confident hierarchy using geometric heading structures paired with clean, readable monospace details for metadata.',
    icon: '¶'
  },
  {
    title: 'Fluid Response',
    description: 'Interfaces must feel physical. Interactive states react with physics-inspired magnetic pulls and soft scales.',
    icon: '◎'
  },
  {
    title: 'Stillness & Hold',
    description: 'The space between actions is vital. No looping loaders or idle pulses. Stillness is what makes motion feel intentional.',
    icon: '■'
  },
  {
    title: 'Unified Cascade',
    description: 'A dual-theme architecture mapping the same tokens to light and dark modes, ensuring unified semantics across themes.',
    icon: '◑'
  }
];

export const testimonials = [
  { name: 'Sarah J.', role: 'VP of Product, Apex FinTech', quote: 'The dashboard feels fast, solid, and incredibly precise. There is no waste; every line, gap, and motion serves a clear user purpose.' },
  { name: 'Devon K.', role: 'Engineering Lead, Aurora Systems', quote: 'The component structure and token architecture solved an alignment problem we spent six months trying to fix. High technical craft.' }
];

export const skills = ['Design Systems', 'Data Density Design', 'Web Components', 'Interaction Physics', 'CSS Architecture', 'Canvas & WebGL'];