# Jbet - Architecture Overview

**Type:** Nigerian betting platform  
**Timeline:** 2026  
**Stack:** React, TypeScript, Tailwind CSS, Node.js + Express, MySQL, Vercel

---

## Architecture Style

**Client-heavy SPA with REST API backend**

Jbet is a Single Page Application (SPA) with a heavy client-side JavaScript footprint. The frontend handles most UI logic while the backend provides a RESTful API for data operations. This architecture prioritizes responsive user experience over SEO.

---

## Technology Stack

### Frontend: React 18 + Tailwind CSS
**Why React?**
- Faster updates with `useDeferredValue` for progressive enhancement
- Automatic batching for better performance
- Ecosystem maturity (hooks, context, memoization)

**Why Tailwind CSS?**
- Rapid development with utility classes
- Consistent design system (tokens in `@theme`)
- Dark mode built-in with `data-theme`
- No CSS bundle bloat ( purge unused classes)

### Backend: Node.js + Express
**Why Express?**
- JavaScript continuity (shared type definitions with frontend)
- Middleware pattern for authentication, logging
- NPM ecosystem (Stripe,cors, helmet)

### Database: MySQL
**Why MySQL?**
- Mature ecosystem, well-understood by team
- Replication for read scaling (future-proof)
- Good for structured betting data
- Lower cost than PostgreSQL for same performance

### Deployment
- **Vercel** for frontend (edge caching, automatic HTTPS)
- **DigitalOcean App Platform** for backend (persistent connections, MySQL)

---

## Database Design

### Schema Overview
Schema for users, matches, bets, transactions, and payment records.

### Key Tables

**users**
```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**matches**
```sql
CREATE TABLE matches (
  id VARCHAR(36) PRIMARY KEY,
  home_team VARCHAR(100) NOT NULL,
  away_team VARCHAR(100) NOT NULL,
  start_time DATETIME NOT NULL,
  status ENUM('scheduled', 'live', 'finished', 'cancelled') DEFAULT 'scheduled',
  odds JSON,  -- Home draw, away odds as JSON
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**bets**
```sql
CREATE TABLE bets (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  match_id VARCHAR(36) NOT NULL,
  selection JSON NOT NULL,  -- {type: 'home', 'draw', 'away', 'score'}
  stake DECIMAL(10,2) NOT NULL,
  potential_return DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'won', 'lost', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**transactions**
```sql
CREATE TABLE transactions (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  type ENUM('deposit', 'withdrawal') NOT NULL,
  status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**payment_records**
```sql
CREATE TABLE payment_records (
  id VARCHAR(36) PRIMARY KEY,
  transaction_id VARCHAR(36) NOT NULL,
  provider ENUM('opay', 'palmPay', 'bankTransfer', 'ussd') NOT NULL,
  provider_reference VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Relationships
```
users (1) ← (M) bets
matches (1) ← (M) bets
users (1) ← (M) transactions
transactions (1) ← (1) payment_records
```

### Optimization Strategy
- Indexed on `user_id`, `match_id`, `transaction_status`
- Denormalized odds at bet time (capture current odds, prevent disputes)
- Materialized views for user balance and bet summary

---

## API Design

### Endpoints

**Public endpoints (no auth)**
```
GET    /api/matches                    # Live match list with current odds
GET    /api/matches/[id]               # Single match details
GET    /api/matches/upcoming           # Upcoming matches
GET    /api/collections/[sport]        # Sports collections
```

**User endpoints (JWT auth)**
```
POST   /api/auth/register              # Register new user
POST   /api/auth/login                 # User login
POST   /api/bets                       # Place bet on match
GET    /api/bets/my                    # User bet history
GET    /api/bets/[id]                  # Single bet details
```

**Deposit endpoints (JWT auth)**
```
POST   /api/deposits                   # Initiate deposit
GET    /api/deposits/status            # Check deposit status
POST   /api/payments/webhook           # Payment provider webhook
```

### Authentication
- **JWT tokens** with refresh token rotation
- Stored in **httpOnly cookies** (XSS protection)
- **Rate limiting** on auth endpoints (5 attempts/minute)
- **Session management** with Redis (logout from all devices)

### Rate Limiting
- **30 requests/minute** for bet placement (prevent abuse)
- **100 requests/minute** for match listing
- **10 attempts/minute** for auth endpoints

### Caching Strategy
- **Redis Pub/Sub** for real-time odds updates (5-second intervals)
- **localStorage** for user session (instant UI updates)
- **Edge caching** on Vercel for static assets (30-day max-age)
- **No caching** for match odds (always fresh)

---

## Deployment Strategy

### Frontend: Vercel
- Static generation for marketing pages
- Client-side rendering for app (SPA)
- Edge caching for images and assets
- Serverless functions for API routes (if needed)

### Backend: DigitalOcean App Platform
- Persistent MySQL connection pool
- Background workers for payment processing
- WebSockets for real-time updates (future)
- Health check endpoint for uptime monitoring

### CI/CD
- GitHub Actions on push to main
- Automatic staging deployment
- Manual production deployment

---

## Key Architecture Decisions

### 1. Real-Time Odds Updates via Redis Pub/Sub
**Problem:** Odds change frequently, WebSocket overhead
**Solution:** Redis Pub/Sub with 5-second polling
```typescript
// Redis Pub/Sub for odds updates
const publisher = redis.duplicate();
const subscriber = redis.duplicate();

// Update odds every 5 seconds
setInterval(async () => {
  const odds = await fetchOddsFromProvider();
  publisher.publish('odds-updates', JSON.stringify(odds));
}, 5000);
```

**Tradeoff:** Slight delay (5s) for simplicity, vs. instant WebSocket updates

### 2. Denormalized Betslip State in localStorage
**Problem:** API calls for every betslip change
**Solution:** Store betslip in localStorage, sync to server on confirmation
```typescript
// State management
const [betslip, setBetslip] = useState<Bet[]>(() => {
  const saved = localStorage.getItem('betslip');
  return saved ? JSON.parse(saved) : [];
});

// Auto-save to localStorage
useEffect(() => {
  localStorage.setItem('betslip', JSON.stringify(betslip));
}, [betslip]);
```

**Tradeoff:** Risk of data loss if user crashes, vs. complex state sync

### 3. Payment Webhook Validation Before Database Updates
**Problem:** Webhooks can be tampered with, replayed
**Solution:** Signature verification + idempotency
```typescript
// Verify webhook signature
const sig = request.headers.get('x-payment-signature');
const payload = await request.text();
const expectedSig = crypto.createHmac('sha256', webhookSecret)
  .update(payload)
  .digest('hex');

if (sig !== expectedSig) {
  return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
}

// Idempotency check
const existing = await db.payment_records.findUnique({
  where: { provider_reference: data.reference }
});

if (existing) {
  return NextResponse.json({ received: true, duplicate: true });
}
```

**Tradeoff:** Extra validation step, vs. risking fraudulent payments

---

## Tradeoffs

### 1. SPA vs. SSR for Betting Platform
| Aspect | SPA | SSR |
|--------|-----|-----|
| SEO | Poor (no content indexed) | Good (content indexed) |
| Interactions | Instant (client-side) | Slower (server roundtrip) |
| Initial load | Faster (smaller bundle) | Slower (server render) |
| Complex state | Easy (React state) | Hard (session management) |

**Decision:** SPA for betting platform. SEO doesn't matter for authenticated user experience.

### 2. MySQL vs. PostgreSQL
| Aspect | MySQL | PostgreSQL |
|--------|-------|------------|
| Cost | Lower (open source) | Similar (open source) |
| Features | Good | Better (JSONB, full-text) |
| Replication | Good | Excellent |

**Decision:** MySQL for team familiarity. PostgreSQL for complex queries (future upgrade path).

### 3. Redis Pub/Sub vs. WebSocket
| Aspect | Redis Pub/Sub | WebSocket |
|--------|---------------|-----------|
| Latency | Low (5s polling) | Very low (real-time) |
| Complexity | Low (built-in) | High (manage connections) |
| Scalability | Good (Redis cluster) | Good (Redis broker) |

**Decision:** Redis Pub/Sub for simplicity. WebSocket if latency becomes critical.

---

## Lessons Learned

### 1. Payment Webhooks Can Arrive Out of Order
**Problem:** Webhook for payment success arrives before user session created
**Solution:** Sequence numbers in events
```typescript
// Event payload
{
  sequence: 12345,
  type: 'payment_success',
  payment_id: 'abc123',
  timestamp: '2024-01-01T00:00:00Z'
}

// Deduplication
const lastSequence = await redis.get(`webhook-sequence:${userId}`);
if (sequence <= lastSequence) {
  return NextResponse.json({ received: true, duplicate: true });
}
await redis.set(`webhook-sequence:${userId}`, sequence);
```

**Lesson:** Always add sequence numbers to async events for ordering.

### 2. localStorage Fills Up Quickly with Bet History
**Problem:** User bet history stored in localStorage, fills up on mobile
**Solution:** Cleanup on logout, pagination for current bets
```typescript
// Cleanup on logout
const cleanupBetslip = () => {
  const MAX_BETS = 50;
  const betslip = JSON.parse(localStorage.getItem('betslip') || '[]');
  const recentBets = betslip.slice(-MAX_BETS);
  localStorage.setItem('betslip', JSON.stringify(recentBets));
};
```

**Lesson:** localStorage is limited (typically 5-10MB). Use IndexedDB for large data.

### 3. Odds Updates Can Race with User Actions
**Problem:** User places bet while odds are updating
**Solution:** Optimistic UI with rollback
```typescript
// Optimistic update
const previousOdds = odds;
setOdds(newOdds);
await placeBet(bet);
// If bet fails, rollback
} catch (error) {
  setOdds(previousOdds);
  throw error;
}
```

**Lesson:** Always have rollback logic for optimistic updates.

---

## Technical Deep Dive: Key Components

### Bet Slip State Management
**Challenge:** Bet slip must persist across page refreshes, handle conflicts

**Solution:** Hybrid storage
1. **localStorage** for immediate persistence
2. **React Context** for component sharing
3. **Redis** for multi-device sync (future)

### Live Odds Updater
**Challenge:** Show real-time odds without WebSocket overhead

**Solution:** Redis Pub/Sub + polling
```typescript
// hooks/useLiveOdds.ts
export const useLiveOdds = (matchId: string) => {
  const [odds, setOdds] = useState<MatchOdds | null>(null);
  
  useEffect(() => {
    // Subscribe to Redis
    const channel = redis.subscribe(`odds-updates:${matchId}`);
    
    channel.on('message', (message) => {
      const newOdds = JSON.parse(message);
      setOdds(newOdds);
    });
    
    return () => channel.unsubscribe();
  }, [matchId]);
  
  return odds;
};
```

### Payment Provider Integration
**Challenge:** Multiple payment providers (Opay, PalmPay, bank transfer, USSD)

**Solution:** Unified payment interface
```typescript
// types/payment.ts
export interface PaymentProvider {
  name: string;
  logo: string;
  processPayment: (amount: number, reference: string) => Promise<string>;
  verifyPayment: (reference: string) => Promise<boolean>;
}

// opay.ts
export const opayProvider: PaymentProvider = {
  name: 'Opay',
  logo: '/payments/opay.svg',
  processPayment: async (amount, reference) => {
    const response = await fetch('/api/payments/opay/init', {
      method: 'POST',
      body: JSON.stringify({ amount, reference }),
    });
    return (await response.json()).payment_url;
  },
  verifyPayment: async (reference) => {
    const response = await fetch(`/api/payments/opay/verify/${reference}`);
    return (await response.json()).is_paid;
  }
};
```

---

## Conclusion

Jbet demonstrates a production-ready Nigerian betting platform:
- **Responsive** with SPA architecture and optimistic UI
- **Scalable** with Redis caching and MySQL replication
- **Secure** with webhook validation and JWT authentication
- **Local-first** with payment provider integration

The architecture prioritizes user experience over technical elegance, with pragmatic tradeoffs for the Nigerian market.