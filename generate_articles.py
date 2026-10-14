import json

# Article data generator - creates JSON data for blog articles
articles = [
    {
        "id": "1",
        "slug": "react-19-new-features-guide",
        "title": "React 19: A Comprehensive Guide to the New Features",
        "excerpt": "Explore everything new in React 19 - from Actions and Server Components to the improved compiler and new hooks that will change how you build applications.",
        "content": "# React 19: A Comprehensive Guide\n\nReact 19 brings exciting new features. This guide covers Actions, Server Components, and the new compiler.\n\n## Introduction\n\nReact 19 represents a significant evolution. Core principles remain the same - declarative UI, component composition, and unidirectional data flow - but new features introduce powerful abstractions.\n\n## Actions: The Future of Form Handling\n\nActions provide a declarative way to handle form submissions, loading states, and errors without complex imperative code.\n\n### What Are Actions?\n\nActions are functions that describe form operations. React handles loading states, errors, and optimistic updates.\n\n```tsx\nimport { useFormStatus, useFormState } from 'react-dom';\nfunction SubmitButton() {\n  const { pending } = useFormStatus();\n  return (<button type=\\"submit\" disabled={pending}>{pending ? 'Submitting...' : 'Submit'}</button>);\n}\n```\n\n### Benefits of Actions\n\n1. Automatic loading states - no more manual isSubmitting flags\n2. Built-in error handling - errors captured and surfaced automatically\n3. Optimistic updates - UI updates immediately, then reconciles with server\n4. Simplified code - less boilerplate, more declarative\n\n### Migration Path\n\n**Before:**\n\n```tsx\nfunction ContactForm() {\n  const [status, setStatus] = useState('idle');\n  const [error, setError] = useState(null);\n  async function handleSubmit(e) {\n    e.preventDefault();\n    setStatus('submitting');\n    try { await submitForm(e.target as HTMLFormElement); setStatus('success'); }\n    catch (err) { setError('Failed to submit'); setStatus('error'); }\n  }\n  return (<form onSubmit={handleSubmit}><SubmitButton status={status} />{error && <ErrorMessage>{error}</ErrorMessage>}</form>);\n}\n```\n\n**After:**\n\n```tsx\nfunction ContactForm() {\n  const [state, formAction] = useFormState(submitForm, { status: 'idle' });\n  return (<form action={formAction}><SubmitButton />{state.status === 'error' && <ErrorMessage>{state.error}</ErrorMessage>}</form>);\n}\n```\n\n## Server Components: Architecture Changed\n\nServer Components render on the server and send HTML to the client. They don't include client-side JavaScript, which means smaller bundles, direct backend access, no waterfall on client, and better SEO.\n\n### When to Use Server vs Client Components\n\n| Use Case | Component Type |\n|---|---|\n| Data fetching, static content | Server |\n| Interactive UI, event handlers | Client |\n| Third-party libraries | Client |\n| Stores | Client |\n\n## The React Compiler: Automatic Memoization\n\nThe React Compiler automatically memoizes components and hooks, eliminating the need for manual useMemo and useCallback.\n\n**Before:** (manual memoization)\n\n```tsx\nfunction UserList({ users, filter }) {\n  const filtered = useMemo(() => users.filter(u => u.name.includes(filter)), [users, filter]);\n  return filtered.map(user => <UserCard key={user.id} user={user} />);\n}\n```\n\n**After:** (compiler handles it)\n\n```tsx\nfunction UserList({ users, filter }) {\n  const filtered = users.filter(u => u.name.includes(filter));\n  return filtered.map(user => <UserCard key={user.id} user={user} />);\n}\n```\n\n## Summary\n\nReact 19 changes how forms work, shifts architecture with Server Components, eliminates boilerplate with compiler-managed memoization, and improves performance with better rendering and smaller bundles.",
        "category": "technology",
        "tags": ["react", "react-19", "frontend", "javascript"],
        "authorId": "alex-chen",
        "publishedAt": "2026-06-01",
        "readingTime": 15,
        "wordCount": 985,
        "seo": {"title": "React 19: A Comprehensive Guide", "description": "Everything you need to know about React 19: Actions, Server Components, and more.", "keywords": ["React 19", "React", "frontend", "javascript", "web development"]}
    },
    {
        "id": "2",
        "slug": "building-design-systems-at-scale",
        "title": "Building Design Systems at Scale: Lessons from the Trenches",
        "excerpt": "A practical guide to creating and maintaining a design system that grows with your organization and keeps developers happy.",
        "content": "# Building Design Systems at Scale\n\nDesign systems are essential for organizations building multiple products. But building one that actually works and gets adopted is a different story.\n\n## The Hard Truth About Design Systems\n\nMost organizations underestimate the effort required. A design system is not just a collection of components - it's a product in itself with its own users, roadmap, and maintenance costs.\n\n### Key Challenges\n\n1. Adoption friction - Developers resist using something new\n2. Consistency vs. flexibility - Finding the right balance\n3. Documentation burden - It never ends\n4. Team coordination - Different teams, different needs\n\n## Starting with Design Tokens\n\nThe foundation of any good design system is its tokens - the raw values that define your design.\n\n### Token Categories\n\n| Category | Examples |\n|---|---|\n| Color | Primary, secondary, success, warning, error |\n| Typography | Font families, sizes, line heights |\n| Spacing | 4px grid, margins, padding, gaps |\n| Border | Radius, width, style |\n| Shadow | Elevation levels, glow effects |\n\n```json\n{"color": {"primary": "#2563EB", "surface": "#F8FAFC", "text-primary": "#1E293B"}, "typography": {"font-family-base": "'Inter', sans-serif", "font-size-base": "1rem"}}\n```\n\n## Component Architecture\n\nOrganize components in a logical hierarchy:\n\n```text\nAtoms (Button, Input, Label)\nMolecules (InputGroup, Card, ButtonGroup)\nOrganisms (Form, Navbar, Modal)\nTemplates (Login, Dashboard)\n```\n\n### Getting the Hierarchy Right\n\nDon't be afraid to iterate. As your system grows, you'll find that some components need to be split or merged.\n\n## Documentation: The Adoption Multiplier\n\nA design system without documentation is just a component library. Documentation should answer what it is, when to use it, how to use it, and when not to use it. Tools include Storybook for component isolation, Markdown pages for conceptual guides, and live preview for interactive examples.\n\n## Conclusion\n\nBuilding a design system is a marathon, not a sprint. Start small, document thoroughly, and iterate based on real usage.",
        "category": "design",
        "tags": ["design-system", "ux", "frontend", "component-library"],
        "authorId": "jordan-lee",
        "publishedAt": "2026-05-15",
        "readingTime": 20,
        "wordCount": 1250,
        "seo": {"title": "Building Design Systems at Scale", "description": "Lessons learned building and maintaining a scalable design system.", "keywords": ["design system", "UX", "frontend", "component library"]}
    },
    {
        "id": "3",
        "slug": "optimizing-react-performance-2026",
        "title": "Optimizing React Performance in 2026: Beyond useMemo",
        "excerpt": "Deep dive into React performance optimization techniques that actually move the needle in 2026. From compiler optimizations to architectural patterns.",
        "content": "# Optimizing React Performance in 2026\n\nReact performance optimization is a crowded space, but most advice relies on useMemo and useCallback. In 2026, the landscape has changed dramatically.\n\n## The Old Way vs. The New Way\n\n### Before: Manual Memoization\n\n```tsx\nconst expensiveValue = useMemo(() => calculateExpensiveValue(a, b, c), [a, b, c]);\n```\n\n### After: Let the Compiler Handle It\n\nReact 19's compiler automatically adds memoization where needed.\n\n```tsx\nconst expensiveValue = calculateExpensiveValue(a, b, c);\n```\n\n## Architectural Optimization\n\nCode splitting and virtualization are the biggest performance wins.\n\n### Code Splitting\n\n```tsx\nconst HeavyChart = lazy(() => import('./HeavyChart'));\nfunction App() { return (<Suspense fallback={<Loading />}><Route path="/analytics" element={<AnalyticsPage />} /></Suspense>); }\n```\n\n### Virtualization\n\n```tsx\nimport { FixedSizeList } from 'react-window';\nfunction VirtualizedList({ items }) { return (<FixedSizeList height={400} itemCount={items.length} itemSize={50}>{({ index, style }) => <Item item={items[index]} style={style} />}</FixedSizeList>); }\n```\n\n## Measuring Performance\n\nBrowser DevTools Performance tab, Memory tab, React DevTools Profiler, and Lighthouse CI track performance budgets.\n\n## Common Performance Pitfalls\n\n1. Conditional rendering of heavy components\n2. Large bundle sizes - Tree-shaking fails with default exports\n3. Unnecessary context re-renders\n4. High-frequency event handlers - Throttle or debounce\n\n## Conclusion\n\nReact performance in 2026 is about architecture and tooling, not micro-optimizations. Use the compiler, measure everything, and profile before optimizing.",
        "category": "development",
        "tags": ["react", "performance", "frontend", "optimization"],
        "authorId": "liam-wilson",
        "publishedAt": "2026-07-20",
        "readingTime": 18,
        "wordCount": 1100,
        "seo": {"title": "Optimizing React Performance in 2026", "description": "Deep dive into React performance optimization beyond useMemo.", "keywords": ["React", "performance", "optimization", "frontend", "2026"]}
    }
]

with open('/home/jboss/Desktop/Portfolio/src/data/articles.json', 'w') as f:
    json.dump(articles, f, indent=2)
print('Generated', len(articles), 'articles')
