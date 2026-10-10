# Titan Commerce - Architecture Overview

**Type:** Full-stack e-commerce platform  
**Timeline:** 2025  
**Stack:** Next.js 14, TypeScript, PostgreSQL, Vercel

---

## Architecture Style

**Monorepo with separate frontend and backend services**

Titan Commerce follows a monorepo architecture where the frontend (Next.js) and backend (PostgreSQL) are tightly integrated but logically separated. This approach balances development velocity with scalability.

```
titan/
├── app/                    # Next.js App Router (frontend)
│   ├── api/               # API Routes (backend)
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   └── checkout/          # Checkout flow
├── db/                    # Database migrations and seeds
└── scripts/               # Build and utility scripts
```

---

## Technology Stack

### Frontend: Next.js 14
**Why Next.js?**
- Server-side rendering for SEO (critical for product pages)
- API routes for backend functionality without separate server
- Image optimization built-in (WebP, responsive sizes)
- Edge caching on Vercel for global performance

**Architecture decisions:**
- App Router instead of Pages Router for cleaner structure
- Server Components by default (only Client Components where needed)
- Server Actions for form submissions (simplified data mutations)

### Database: PostgreSQL
**Why PostgreSQL?**
- ACID compliance for transaction integrity (critical for orders)
- JSONB for flexible product attributes
- pgvector for future AI features (recommendations, search)

**Schema design:**
```
users (id, email, password_hash, created_at)
products (id, name, description, price, stock, category_id, metadata JSONB)
categories (id, name, slug)
orders (id, user_id, status, total, shipping_address JSONB)
order_items (id, order_id, product_id, quantity, price)
payments (id, order_id, provider, amount, status)
```

### Deployment: Vercel
**Why Vercel?**
- Zero-config deployment (push to deploy)
- Edge network for global low-latency
- Serverless functions for API routes
- Automatic HTTPS, CDN, and analytics

---

## Database Design

### Schema Overview
Normalized schema with five core tables supporting e-commerce operations.

### Key Tables

**products**
```typescript
{
  id: string (PK),
  name: string (NOT NULL),
  description: text,
  price: decimal(10,2) (NOT NULL),
  stock: integer (NOT NULL, DEFAULT 0),
  category_id: string (FK → categories),
  metadata: jsonb (indexed for filtering),
  created_at: timestamp,
  updated_at: timestamp
}
```

**orders**
```typescript
{
  id: string (PK),
  user_id: string (FK → users),
  status: enum('pending', 'processing', 'shipped', 'completed', 'cancelled'),
  total: decimal(10,2) (NOT NULL),
  subtotal: decimal(10,2),
  tax: decimal(10,2),
  shipping: decimal(10,2),
  shipping_address: jsonb (NOT NULL),
  payment_intent_id: string,
  created_at: timestamp,
  updated_at: timestamp
}
```

### Relationships
```
users (1) ← (M) orders
orders (1) ← (M) order_items
products (1) ← (M) order_items
categories (1) ← (M) products
orders (1) ← (1) payments
```

### Optimization Strategy
- **Indexed on foreign keys** (user_id, product_id, category_id)
- **Partial indexes** on active products (stock > 0)
- **Materialized views** for category counts (avoiding slow COUNT queries)
- **Connection pooling** ( PgBouncer) for API route scalability

---

## API Design

### Endpoints

**Public endpoints (no auth)**
```
GET    /api/products              # List all products with pagination
GET    /api/products/[id]         # Single product details
GET    /api/categories            # List categories with counts
GET    /api/products/by-category  # Products by category
```

**Cart endpoints (session-based)**
```
POST   /api/cart                  # Add item to cart
GET    /api/cart                  # Get current cart
PUT    /api/cart/[itemId]         # Update item quantity
DELETE /api/cart/[itemId]         # Remove item from cart
```

**Order endpoints (JWT auth)**
```
POST   /api/checkout              # Create order
GET    /api/orders/my             # User's order history
GET    /api/orders/[id]           # Single order details
```

**Webhook endpoints**
```
POST   /api/webhooks/stripe       # Stripe payment webhook
```

### Authentication
- **JWT tokens** with refresh tokens
- Stored in **httpOnly cookies** (XSS protection)
- **Refresh token rotation** for security
- API route auth middleware validates token on each request

### Rate Limiting
- **100 requests/minute per IP** for public endpoints
- **10 requests/minute for checkout** (prevent abuse)
- Redis-backed rate limiting for scalability

### Caching Strategy
- **Edge caching** on Vercel for product listings
- **Redis** for cart sessions (multi-device support)
- **Browser caching** for static assets (30-day max-age)
- **Incremental Static Regeneration** for product pages (balance freshness/performance)

---

## Deployment Strategy

### Hosting
- **Vercel Edge Network** (global edge locations)
- Serverless functions for API routes
- Static assets served from CDN

### Build Process
1. **TypeScript compilation** (tsc)
2. **Next.js production build** (next build)
3. **Image optimization** (next-image)
4. **Environment-specific config** (Vercel environment variables)

### CI/CD
- **GitHub Actions** on push to main
- Automatic **preview deployments** on PRs
- Build, test, and deploy in one workflow

### Monitoring
- **Vercel Analytics** (page views, conversions)
- **Sentry** (error tracking and performance monitoring)
- **Logtail** (application logs)
- **Health check endpoint** for uptime monitoring

---

## Key Architecture Decisions

### 1. Separate Database Connection for API Routes
**Problem:** API routes share connection pool with web requests
**Solution:** Separate connection pool configuration for API routes
```typescript
// db/api.ts - Separate pool for API routes
export const apiPool = new Pool({
  ...config,
  max: 20, // Separate from web pool's max: 10
});
```

### 2. Server-Side Validation Before Database Operations
**Problem:** Malformed data entering database
**Solution:** Zod schemas for all inputs, validated before DB operations
```typescript
// utils/validators.ts
export const checkoutSchema = z.object({
  cartItems: z.array(z.object({...})),
  shippingAddress: z.object({...}),
  paymentMethod: z.enum(['card', 'bank', 'ussd']),
});
```

### 3. Incremental Static Regeneration for Product Pages
**Problem:** Balancing performance with fresh content
**Solution:** ISR with 1-hour revalidation
```typescript
export async function generateStaticParams() {
  const products = await db.products.findMany({ select: { slug: true } });
  return products.map(p => ({ slug: p.slug }));
}

export const revalidate = 3600; // Revalidate every hour
```

---

## Tradeoffs

### 1. Next.js API Routes vs. Separate Backend Service
| Aspect | Next.js API Routes | Separate Backend |
|--------|-------------------|------------------|
| Deployment complexity | Low (one service) | High (two services) |
| Development velocity | High (single codebase) | Lower (separate repos) |
| Scalability | Limited by function timeout | Unlimited (auto-scale) |
| Cost | Lower (Vercel tier) | Higher (separate hosting) |

**Decision:** Started with Next.js API routes. Split to separate service if traffic grows 10x.

### 2. PostgreSQL vs. Specialized Services
| Aspect | PostgreSQL | Supabase | Firebase |
|--------|-----------|----------|----------|
| Control | Full control | abstraction | abstraction |
| Cost | Predictable (RDS) | Free tier, then $ | Free tier, then $ |
| Features | Everything | Built-in auth/realtime | Real-time, auth |

**Decision:** Raw PostgreSQL for full control. Supabase would be faster iteration.

### 3. Edge Caching vs. Real-Time Updates
| Aspect | Edge Caching | WebSocket |
|--------|-------------|-----------|
| Performance | Fast (CDN) | Fast (persistent) |
| Complexity | Low (Vercel auto) | High (manage connections) |
| Real-time | Delayed (TTL) | Instant |

**Decision:** Edge caching with ISR. WebSocket if live inventory becomes critical.

---

## Lessons Learned

### 1. Connection Pooling is Critical
**Problem:** Database connections exhausted during traffic spikes
**Solution:** Added PgBouncer connection pooler, increased pool size
```typescript
// pgBouncer configuration
[databases]
titan = host=db.rds.amazonaws.com port=5432 dbname=titan

[pooling]
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 20
```

### 2. Error Boundaries in Next.js API Routes
**Problem:** Some errors weren't caught by try-catch
**Solution:** Added global error handler in middleware
```typescript
// middleware.ts
export async function onError(error: Error) {
  Sentry.captureException(error);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}
```

### 3. Image Optimization on Vercel
**Problem:** First build slow due to image optimization
**Solution:** Prebuild images in CI, store optimized versions
```javascript
// scripts/prebuild-images.js
import sharp from 'sharp';
// Pre-optimize all product images
```

---

## Technical Deep Dive: Key Components

### Cart Persistence Strategy
**Challenge:** Cart should persist across devices, sessions

**Solution:** Hybrid approach
1. **LocalStorage** for immediate UI updates (fastest)
2. **Session storage** in Redis for multi-device sync
3. **Database** for final order persistence

**Flow:**
```
User adds item → LocalStorage update → Redis sync → On checkout → Order record
```

### Checkout Flow
**Three-step process with validation at each step:**

1. **Shipping Information**
   - Validate address format
   - Calculate shipping cost
   - Store in session

2. **Payment Information**
   - Validate card details (client-side)
   - Create Stripe PaymentIntent
   - Store intent ID in session

3. **Order Review**
   - Final validation
   - Show breakdown
   - Confirm and create order

### Payment Webhook Processing
**Challenge:** Webhooks can arrive out of order, duplicated

**Solution:**
```typescript
// api/webhooks/stripe/route.ts
export async function POST(request: Request) {
  const sig = request.headers.get('stripe-signature');
  const payload = await request.text();
  
  // Verify webhook signature
  const event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  
  // Idempotency check (prevent duplicate processing)
  const existing = await db.payments.findUnique({
    where: { stripe_payment_intent_id: event.data.object.id }
  });
  
  if (existing) {
    return NextResponse.json({ received: true, duplicate: true });
  }
  
  // Process payment
  await handlePaymentEvent(event);
  
  return NextResponse.json({ received: true });
}
```

---

## Conclusion

Titan Commerce demonstrates a production-ready full-stack architecture:
- **Scalable** with connection pooling and caching
- **Maintainable** with clear separation of concerns
- **Performant** with edge caching and optimized queries
- **Reliable** with ACID compliance and error handling

The architecture balances immediate needs with future growth, allowing for incremental improvements without major rewrites.