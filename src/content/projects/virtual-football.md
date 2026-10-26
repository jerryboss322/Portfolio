# Virtual Football Universe - Architecture Overview

**Type:** Full-stack match simulation & sports betting platform  
**Timeline:** 2026  
**Stack:** Next.js 15, React 19, FastAPI (Python 3.12), PostgreSQL (asyncpg), Tailwind CSS, Server-Sent Events (SSE), Vercel

---

## Architecture Style

**Decoupled Full-Stack Architecture with Real-Time Event Streaming & Financial Ledger**

Virtual Football Universe (VFL) pairs a high-performance Next.js 15 frontend with an asynchronous Python FastAPI engine. The system continuously simulates 6 top-tier European leagues using an autonomous double round-robin fixture generator (Berger circle rotation), computing real-time live events, dynamic bivariate Poisson odds distributions, and sub-second settlement across an immutable double-entry financial ledger.

```
virtual-football/
├── app/                        # Next.js 15 App Router (Frontend)
│   ├── (sportsbook)/           # Matchday ticker, live pitch radar, odds tables
│   ├── exchange/               # P2P betting exchange (CLOB order book & back/lay ladder)
│   ├── fantasy/                # 15-round serpentine draft war room & FAB waiver wire
│   └── developer-api/          # Interactive API documentation & live cURL test runner
├── backend/
│   ├── app/
│   │   ├── api/                # FastAPI routes (auth, fixtures, matches, odds, bets, wallet)
│   │   ├── core/               # Database session pooler, JWT security, configuration
│   │   ├── models/             # SQLAlchemy 2.0 async models (12 core ACID tables)
│   │   ├── schemas/            # Pydantic v2 validation contracts
│   │   └── services/           # Simulation tick, odds engine, ledger, P2P exchange
│   └── engine/                 # Match simulator (time-dilation loop, momentum, Poisson math)
└── migrations/                 # Alembic asynchronous database schema migrations
```

---

## Technology Stack

### Frontend: Next.js 15 + React 19 + Tailwind CSS
**Why Next.js & React 19?**
- React 19 concurrent rendering and transitions for latency-free odds toggling and multi-leg betslip accumulation.
- Real-time SSE streaming hooks with `Last-Event-ID` header resumption and exponential backoff retry.
- Stake.com / Betfair-tier high-contrast dark theme, animated digital pitch radars, momentum wave sparklines, and spatial heatmaps.

### Backend: FastAPI (Python 3.12) + SQLAlchemy 2.0
**Why FastAPI?**
- High-throughput asynchronous I/O via `asyncpg` for concurrent database operations.
- Native Pydantic v2 data serialization ensuring strict input and output sanitization.
- Stateless simulation tick orchestration capable of running both as a 1-second background daemon and as serverless lazy catch-up.

### Real-Time Math & Odds Engine: Bivariate Poisson Process
- Parameterized by Home/Away attack and defense ratings, weather drag coefficients, and home-advantage factors.
- Calculates 27 live betting markets across match result, goals, Asian handicap, and combos.
- Dynamic in-play odds shifts with odds floor protections (locking selections below 1.07 and early settlement on met conditions).

### Financial Ledger: Double-Entry Immutable Accounting
- All monetary balances are represented as **integer minor units** (e.g. 10,000.00 tokens = `1000000`) eliminating IEEE 754 floating-point inaccuracies.
- Every wallet mutation generates an append-only `LedgerEntry` recording `balance_after_minor`.
- Idempotent bet placement and settlement protected by client-supplied idempotency keys.

---

## Database Design

### Schema Overview
Relational schema architected in PostgreSQL for full ACID compliance, zero race-condition bet placement, and strict foreign-key referential integrity.

### Key Tables

**wallets & ledger_entries**
```sql
CREATE TABLE wallets (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES users(id),
    balance_minor INTEGER NOT NULL DEFAULT 1000000,
    currency VARCHAR(10) NOT NULL DEFAULT 'TOKENS',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE ledger_entries (
    id UUID PRIMARY KEY,
    wallet_id UUID NOT NULL REFERENCES wallets(id),
    user_id UUID NOT NULL REFERENCES users(id),
    bet_id UUID REFERENCES bets(id),
    kind VARCHAR(50) NOT NULL, -- deposit, stake_reserve, settlement, adjustment
    amount_minor INTEGER NOT NULL,
    balance_after_minor INTEGER NOT NULL,
    description TEXT NOT NULL,
    reference VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**fixtures & match_states**
```sql
CREATE TABLE fixtures (
    id UUID PRIMARY KEY,
    league_id UUID NOT NULL REFERENCES leagues(id),
    season_id UUID NOT NULL REFERENCES seasons(id),
    matchday INTEGER NOT NULL,
    home_club_id UUID NOT NULL REFERENCES clubs(id),
    away_club_id UUID NOT NULL REFERENCES clubs(id),
    status VARCHAR(20) NOT NULL DEFAULT 'scheduled', -- scheduled, live, completed
    scheduled_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE match_states (
    id UUID PRIMARY KEY,
    fixture_id UUID NOT NULL UNIQUE REFERENCES fixtures(id),
    home_score INTEGER NOT NULL DEFAULT 0,
    away_score INTEGER NOT NULL DEFAULT 0,
    minute INTEGER NOT NULL DEFAULT 0,
    second INTEGER NOT NULL DEFAULT 0,
    period VARCHAR(20) NOT NULL DEFAULT 'pre_match', -- 1h, halftime, 2h, full_time
    is_paused BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**bets & bet_selections**
```sql
CREATE TABLE bets (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    stake_minor INTEGER NOT NULL,
    potential_payout_minor INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'open', -- open, won, lost, voided, cashed_out
    idempotency_key VARCHAR(128) NOT NULL UNIQUE,
    settled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## Core API Design

| Method | Endpoint | Auth | Purpose |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | No | Account registration with automatic starter token bonus |
| `POST` | `/api/auth/login` | No | JWT access token issuance |
| `GET` | `/api/fixtures` | No | Fixture listing with filtering by status and league |
| `GET` | `/api/matches/{id}/state` | No | Real-time score, minute, second, and active period |
| `GET` | `/api/stream/events` | No | Server-Sent Events (SSE) live match clock and goal ticker |
| `GET` | `/api/odds/{fixture_id}` | No | Bivariate Poisson odds across 27 markets |
| `POST` | `/api/bets` | Yes | Idempotent bet placement with ledger reservation |
| `POST` | `/api/trading/cashout` | Yes | Slippage-guarded in-play cashout with price re-offers |
| `GET` | `/api/wallet/transactions`| Yes | Paginated immutable double-entry audit history |

---

## Key Architectural Decisions

1. **Integer Minor Unit Currency Representation:**
   All token operations (stakes, payouts, balances, commissions) run on integer micro-units. Floating point mathematics (`0.1 + 0.2 = 0.30000000000000004`) are forbidden in financial transactions.
2. **Stateless Time-Dilation Simulation Engine:**
   Each match lasts 8 real-world minutes (480 seconds). One game-minute corresponds to 5.33 seconds of wall-clock time with an automated 10-second halftime tactical break. Time delta calculations allow the server to restart or catch up lazily without dropping matchday sync.
3. **Early Settlement & Dynamic Asian Handicap:**
   In-play handicap lines slide as goals are scored. Condition-based markets (e.g. Both Teams To Score `Yes` or Over 2.5 when the 3rd goal is scored) settle instantly while play continues.

---

## Lessons Learned

- **Database Connection Pooling in Serverless:**
  Direct connections from serverless functions quickly exhaust Postgres quotas. Employing Supabase transaction pooling with statement caching disabled resolved pooler errors.
- **SSE Stream Resilience:**
  WebSocket connections often drop on cellular mobile networks. SSE paired with `Last-Event-ID` browser reconnection provided seamless reconnects without missing commentary ticks.
