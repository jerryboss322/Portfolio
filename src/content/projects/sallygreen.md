# Sally Green - Architecture Overview

**Type:** Author marketing site  
**Timeline:** 2024  
**Stack:** Next.js 13, Sanity CMS, Vercel

---

## Architecture Style

**Static Site Generation (SSG) with Incremental Static Regeneration (ISR)**

Sally Green is a marketing website built with Next.js in SSG mode. All pages are generated at build time, with ISR enabled for content that needs occasional updates. This approach prioritizes performance and simplicity over real-time data.

---

## Technology Stack

### Frontend: Next.js 13
**Why Next.js?**
- Static generation for speed (sub-second LCP)
- App Router for cleaner structure
- Image optimization built-in
- ISR for future dynamic content needs

**Why not Gatsby?**
- Faster builds (Gatsby rebuilds entire site on any change)
- More flexibility (Gatsby's data layer can be restrictive)
- Better TypeScript support

### CMS: Sanity
**Why Sanity?**
- Real-time preview (authors see changes before publishing)
- Versioning (rollback to previous versions)
- Image optimization built-in (webp, responsive sizes)
- Query language (GROQ) for flexible data fetching

**Why not Contentful?**
- Better developer experience (GROQ vs. GraphQL)
- Lower cost for this scale
- Better image handling

**Why not Strapi?**
- Sanity handles hosting (no server management)
- Built-in versioning
- Better preview experience

### Deployment: Vercel
**Why Vercel?**
- Zero-config deployment
- Automatic HTTPS
- Edge caching
- Analytics built-in

---

## Database Design

### Schema Overview
No database in the traditional sense. Sanity CMS handles content storage with versioning, relationships, and image optimization.

### Key Content Types

**authors**
```json
{
  _id: string,
  name: string,
  bio: markdown,
  photo: image,
  socialLinks: [
    { platform: string, url: string }
  ]
}
```

**books**
```json
{
  _id: string,
  title: string,
  subtitle: string,
  description: markdown,
  coverImage: image,
  isbn: string,
  price: number,
  category: reference to categories,
  chapters: [
    { title: string, content: markdown, order: number }
  ],
  tags: string[]
}
```

**testimonials**
```json
{
  _id: string,
  quote: string,
  author: string,
  role: string,
  book: reference to books,
  featured: boolean
}
```

**form_submissions**
```json
{
  _id: string,
  formName: string,
  email: string,
  message: string,
  createdAt: datetime,
  status: 'pending' | 'read' | 'replied'
}
```

### Relationships
```
authors (1) ← (M) books
books (M) ← (M) testimonials (via reference array)
form_submissions (N/A - standalone)
```

### Optimization Strategy
- Sanity's CDN for images (automatic webp, responsive sizes)
- Query caching with Next.js revalidation
- Static generation for all pages (fastest possible load)

---

## API Design

### Endpoints

**Public endpoints (no auth)**
```
GET    /api/books              # List books with filtering
GET    /api/books/[slug]       # Single book details
GET    /api/testimonials       # Get testimonials
GET    /api/author             # Author bio and image
```

**Form endpoints (no auth)**
```
POST   /api/lead-form          # Submit lead form
```

### Authentication
- None for public API
- Sanity API token for webhook and admin operations

### Rate Limiting
- **1000 requests/minute** for public API (generous for marketing site)
- Form submissions limited to 10 per IP per hour

### Caching Strategy
- **Edge caching** on Vercel (all static assets)
- **Sanity CDN** for images (automatic optimization)
- **Browser caching** for static assets (30-day max-age)
- **ISR revalidation** for key pages (1-hour interval)

---

## Deployment Strategy

### Hosting: Vercel
- Static generation at build time
- Edge network for global low-latency
- Serverless functions for form submissions
- Automatic HTTPS, CDN, analytics

### Build Process
1. **Sanity content fetch** (gROQ query)
2. **Next.js static generation** (generateStaticParams)
3. **Image optimization** (Next.js Image component)
4. **Environment config injection** (Vercel environment variables)

### CI/CD
- GitHub push triggers Vercel redeploy
- Automatic preview environments for PRs
- Production deploy on merge to main

### Monitoring
- Vercel Analytics (page views, conversions)
- Google Search Console (SEO tracking)
- Email notifications for form submissions

---

## Key Architecture Decisions

### 1. Static Generation for All Pages
**Problem:** Marketing site content rarely changes
**Solution:** SSG with ISR for key pages
```typescript
// Generate all book slugs at build time
export async function generateStaticParams() {
  const books = await sanityClient.fetch(`*[_type == "book"] { slug }`);
  return books.map(book => ({ slug: book.slug.current }));
}

// Revalidate every hour
export const revalidate = 3600;
```

**Tradeoff:** Content changes require rebuild (handled by GitHub webhook)

### 2. Form Submissions Sent to Webhook
**Problem:** Need to collect form data without database complexity
**Solution:** Form webhook to email + database
```typescript
// api/lead-form/route.ts
export async function POST(request: Request) {
  const { email, message } = await request.json();
  
  // Send email notification
  await sendEmail({
    to: 'sally@example.com',
    subject: `New lead from ${email}`,
    body: message,
  });
  
  // Store in Sanity (optional)
  await sanityClient.create({
    _type: 'form_submissions',
    email,
    message,
    status: 'pending',
  });
  
  return NextResponse.json({ success: true });
}
```

**Tradeoff:** Simpler than full CMS for forms, but less control over data

### 3. Image Optimization with Next.js Image Component
**Problem:** Manual image optimization is error-prone
**Solution:** Next.js Image component with automatic optimization
```tsx
<Image
  src={book.coverImage}
  alt={book.title}
  width={400}
  height={600}
  priority={isFeatured}
  quality={80}
  loading="lazy"
  className="w-full h-auto object-cover"
/>
```

**Tradeoff:** Slightly larger bundle, but guaranteed optimization

---

## Tradeoffs

### 1. SSG vs. SSR for Marketing Site
| Aspect | SSG | SSR |
|--------|-----|-----|
| Performance | Best (pre-rendered) | Good (on-demand render) |
| SEO | Best (content indexed) | Good (content indexed) |
| Content updates | Requires rebuild | Immediate |
| Complexity | Low (static files) | Medium (server rendering) |

**Decision:** SSG for marketing site. Content updates are infrequent (authors publish new books quarterly).

### 2. Sanity vs. Custom CMS
| Aspect | Sanity | Custom CMS |
|--------|--------|------------|
| Development time | Fast (ready-made) | Slow (build from scratch) |
| Monthly cost | $29/mo | $0 (self-hosted) |
| Flexibility | High (schema customization) | Unlimited (full control) |
| Hosting | Managed (Sanity) | Self-hosted (Vercel) |

**Decision:** Sanity for faster iteration. Custom CMS if budget allows.

### 3. Form Webhook vs. Full Form Management
| Aspect | Webhook | Full Form CMS |
|--------|---------|---------------|
| Development time | Fast (1 API call) | Medium (form builder) |
| Data control | Limited | Full |
| Features | Email only | Email + database + UI |

**Decision:** Webhook for MVP. Upgrade to full form CMS if volume increases.

---

## Lessons Learned

### 1. Sanity's Query Language is Powerful but Complex
**Problem:** GROQ queries become unreadable with complex relationships
**Solution:** Create reusable query hooks
```typescript
// utils/queries.ts
export const bookQuery = `*[_type == "book" && slug.current == $slug][0] {
  title,
  subtitle,
  description,
  coverImage,
  isbn,
  price,
  category->{name, slug},
  chapters[] {
    title,
    content,
    order
  }
}`;

// hooks/useBook.ts
export const useBook = (slug: string) => {
  const [book, setBook] = useState<Book | null>(null);
  
  useEffect(() => {
    sanityClient.fetch(bookQuery, { slug }).then(setBook);
  }, [slug]);
  
  return book;
};
```

**Lesson:** Abstraction layer for GROQ queries saves time.

### 2. Edge Functions Have 10s Timeout
**Problem:** Form webhook times out on slow email providers
**Solution:** Queue for form submissions
```typescript
// api/lead-form/route.ts
export async function POST(request: Request) {
  const { email, message } = await request.json();
  
  // Queue for async processing
  await queues.email.add({
    to: 'sally@example.com',
    subject: `New lead from ${email}`,
    body: message,
  });
  
  return NextResponse.json({ received: true });
}
```

**Lesson:** Edge functions have time limits. Queue for operations that might timeout.

### 3. SSG Means Content Changes Need Build
**Problem:** Client wants to update hero image but it requires rebuild
**Solution:** Incremental revalidation for key pages
```typescript
// Revalidate on event (e.g., when content changes in Sanity)
export const revalidate = 3600; // Revalidate every hour
export const dynamic = 'force-static'; // Force SSG, but with revalidation
```

**Lesson:** ISR bridges the gap between SSG and SSR for infrequent updates.

---

## Technical Deep Dive: Key Components

### Book List with Filtering
**Challenge:** Filter books by category, price range, tags

**Solution:** GROQ queries with dynamic filters
```typescript
// utils/queries.ts
export const booksByCategoryQuery = (categorySlug?: string, priceRange?: string) => {
  let filter = '_type == "book"';
  
  if (categorySlug) {
    filter += ` && category->slug.current == "${categorySlug}"`;
  }
  
  if (priceRange === 'low') {
    filter += ' && price < 5000';
  } else if (priceRange === 'medium') {
    filter += ' && price >= 5000 && price < 10000';
  } else if (priceRange === 'high') {
    filter += ' && price >= 10000';
  }
  
  return `*[${filter}] | order(publishedAt desc) {
    title,
    subtitle,
    coverImage,
    price,
    category->{name, slug},
    slug
  }`;
};

// api/books/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get('category');
  const priceRange = searchParams.get('price');
  
  const query = booksByCategoryQuery(categorySlug, priceRange);
  const books = await sanityClient.fetch(query);
  
  return NextResponse.json(books);
}
```

### Real-Time Preview with Sanity
**Challenge:** Authors want to see changes before publishing

**Solution:** Sanity's real-time preview with draft content
```typescript
// hooks/useSanityPreview.ts
export const useSanityPreview = (previewToken: string) => {
  const client = sanityClient.clone().withConfig({
    token: previewToken,
    useCdn: false, // Don't use CDN for preview
  });
  
  return client;
};

// Usage in component
const previewClient = useSanityPreview(previewToken);
const [content, setContent] = useState(null);

useEffect(() => {
  previewClient.fetch(bookQuery, { slug }).then(setContent);
}, [slug, previewClient]);
```

### Image Optimization Pipeline
**Challenge:** Images from Sanity need optimization for web

**Solution:** Next.js Image component with Sanity image URL builder
```typescript
// utils/image.ts
import { imageUrlBuilder } from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: any) => {
  return builder.image(source).url();
};

// Usage in component
<Image
  src={urlFor(book.coverImage)}
  alt={book.title}
  width={400}
  height={600}
/>
```

---

## Conclusion

Sally Green demonstrates a production-ready marketing website:
- **Fast** with static generation and edge caching
- **Maintainable** with Sanity CMS for content updates
- **Simple** with webhook-based form handling
- **Accessible** with semantic markup and WCAG compliance

The architecture prioritizes developer experience and client maintainability over technical complexity, with pragmatic tradeoffs for a small team.