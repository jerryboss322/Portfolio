# TasteTrail - Architecture Overview

**Type:** Restaurant ordering app  
**Timeline:** 2024  
**Stack:** React, Node.js, PostgreSQL

---

## Architecture Style

**Simple Full-Stack Application**

TasteTrail is a straightforward full-stack application with a React frontend and Node.js/Express backend. The architecture prioritizes simplicity and maintainability over complex distributed systems.

---

## Technology Stack

### Frontend: React 18
**Why React?**
- Component-based architecture for UI
- Ecosystem maturity (hooks, context, memoization)
- Cross-platform (web and mobile with React Native)

### Backend: Node.js + Express
**Why Node.js?**
- JavaScript continuity (shared type definitions)
- NPM ecosystem (Stripe, JWT, CORS)
- Middleware pattern for authentication, logging

### Database: PostgreSQL
**Why PostgreSQL?**
- ACID compliance for transaction integrity
- JSONB for flexible menu attributes
- Mature ecosystem, well-understood

### Deployment
- **Vercel** for frontend (static hosting, edge caching)
- **Railway** for backend (persistent connections, PostgreSQL)

---

## Database Design

### Schema Overview
Simple schema for menu items, categories, orders, and order items.

### Key Tables

**categories**
```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**menu_items**
```sql
CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**orders**
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  delivery_address TEXT,
  total DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'confirmed', 'preparing', 'delivered', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**order_items**
```sql
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  menu_item_id INTEGER REFERENCES menu_items(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL
);
```

### Relationships
```
categories (1) ← (M) menu_items
orders (1) ← (M) order_items
menu_items (1) ← (M) order_items
```

### Optimization Strategy
- Indexed on `category_id`, `order_id`, `is_available`
- Cached category list in memory (frequently accessed)
- Pagination for large menu (10 items per page)

---

## API Design

### Endpoints

**Public endpoints (no auth)**
```
GET    /api/categories            # List all categories
GET    /api/menu                  # Menu items by category
GET    /api/menu/[id]             # Single menu item
```

**Order endpoints (no auth)**
```
POST   /api/orders                # Create new order
GET    /api/orders/[id]           # Order status
```

### Authentication
- None for browsing (no sign-up required)
- Order confirmation via email (not authentication-based)

### Rate Limiting
- **100 requests/minute** (generous for small restaurant)
- Rate limiting on order creation (prevent spam)

### Caching Strategy
- **In-memory cache** for categories (cached for 1 hour)
- **Edge caching** on Vercel for static assets (30-day max-age)
- **No caching** for menu items (always fresh)

---

## Deployment Strategy

### Frontend: Vercel
- Static generation for all pages
- Edge network for global low-latency
- Automatic HTTPS, CDN, analytics

### Backend: Railway
- Persistent PostgreSQL connection pool
- Background workers for email notifications
- Health check endpoint for uptime monitoring

### CI/CD
- GitHub Actions on push to main
- Automatic staging deployment
- Manual production deployment

### Monitoring
- Vercel Analytics (page views, conversions)
- Railway logs (backend errors)
- Email notifications for new orders

---

## Key Architecture Decisions

### 1. No Authentication for Browsing
**Problem:** Simplify user experience
**Solution:** No sign-up required to browse menu
```typescript
// Only require user info at checkout
const checkoutSchema = z.object({
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(10),
  deliveryAddress: z.string().min(5),
});
```

**Tradeoff:** Can't save cart across devices, vs. simpler UX

### 2. Single Confirm Button for Order
**Problem:** Reduce user confusion
**Solution:** Basket stays visible, one confirm at the end
```typescript
// Basket state
const [basket, setBasket] = useState<OrderItem[]>([]);

// Total calculation
const total = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);
```

**Tradeoff:** Limited checkout options, vs. simpler flow

### 3. In-Memory Cache for Categories
**Problem:** Categories accessed frequently, rarely change
**Solution:** Cache in memory with hourly refresh
```typescript
// utils/cache.ts
let categoriesCache: Category[] | null = null;
let cacheTime = 0;

export const getCategories = async () => {
  const now = Date.now();
  if (categoriesCache && now - cacheTime < 3600000) {
    return categoriesCache;
  }
  
  categoriesCache = await db.categories.findMany();
  cacheTime = now;
  return categoriesCache;
};
```

**Tradeoff:** Stale data after updates, vs. faster queries

---

## Tradeoffs

### 1. Single Server vs. Microservices
| Aspect | Single Server | Microservices |
|--------|---------------|---------------|
| Development complexity | Low (one codebase) | High (multiple services) |
| Deployment complexity | Low (one service) | High (multiple deployments) |
| Scalability | Limited (vertical) | Unlimited (horizontal) |
| Cost | Lower (one server) | Higher (multiple services) |

**Decision:** Single server for simplicity. Microservices if scaling to multiple restaurants.

### 2. PostgreSQL vs. SQLite
| Aspect | PostgreSQL | SQLite |
|--------|------------|--------|
| Scalability | Excellent (horizontal) | Limited (vertical) |
| Features | Advanced (JSONB, full-text) | Basic (simple queries) |
| Deployment | Complex (separate server) | Simple (embedded) |

**Decision:** PostgreSQL for scalability. SQLite for single-restaurant deployment.

### 3. Real-Time Updates vs. Polling
| Aspect | Real-Time (WebSocket) | Polling |
|--------|----------------------|---------|
| Latency | Instant | Delayed (interval) |
| Complexity | High (manage connections) | Low (simple requests) |
| Cost | Higher (connection pool) | Lower (stateless) |

**Decision:** Polling for simplicity. WebSocket if real-time status becomes critical.

---

## Lessons Learned

### 1. In-Memory Cache Needs Restart on Updates
**Problem:** Category updates don't reflect in cache
**Solution:** Admin endpoint to clear cache
```typescript
// api/admin/cache/clear.ts
app.post('/api/admin/cache/clear', (req, res) => {
  categoriesCache = null;
  cacheTime = 0;
  res.json({ success: true, message: 'Cache cleared' });
});
```

**Lesson:** Always provide a way to clear cache for admins.

### 2. Mobile Data Usage Matters
**Problem:** Users on limited data plans
**Solution:** Optimized images, lazy loading
```tsx
// Image optimization
<Image
  src={menuItem.image}
  alt={menuItem.name}
  width={300}
  height={200}
  quality={70}
  loading="lazy"
  className="w-full h-auto object-cover"
/>
```

**Lesson:** Optimize for mobile data usage. Users in Nigeria often have limited data plans.

### 3. Order Confirmation Email Delayed
**Problem:** Restaurant doesn't know about new orders immediately
**Solution:** SMS option for faster notification
```typescript
// utils/notifications.ts
export const notifyRestaurant = async (order: Order) => {
  // Email (slower, but reliable)
  await sendEmail({
    to: 'restaurant@example.com',
    subject: `New order #${order.id}`,
    body: formatOrderEmail(order),
  });
  
  // SMS (faster, but expensive)
  if (isBusinessHours()) {
    await sendSMS({
      to: '+2348130075752',
      body: `New order #${order.id} - ${order.total} NGN`,
    });
  }
};
```

**Lesson:** Use multiple notification channels. Email for record, SMS for urgency.

---

## Technical Deep Dive: Key Components

### Menu Browsing with Categories
**Challenge:** Menu items organized by category, easy to browse

**Solution:** Category-first layout
```tsx
// pages/menu.tsx
const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const { categories, menuItems } = useMenuData();
  
  const filteredItems = activeCategory
    ? menuItems.filter(item => item.category_id === activeCategory)
    : menuItems;
  
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Category sidebar */}
      <aside className="lg:w-1/4">
        <nav className="space-y-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`block w-full text-left px-4 py-2 rounded-lg ${
                activeCategory === category.id
                  ? 'bg-indigo-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </aside>
      
      {/* Menu items */}
      <main className="lg:w-3/4">
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
};
```

### Basket State Management
**Challenge:** Basket persists across page refreshes, handles concurrent updates

**Solution:** localStorage + React Context
```typescript
// context/BasketContext.tsx
const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [basket, setBasket] = useState<BasketItem[]>(() => {
    const saved = localStorage.getItem('basket');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);
  
  const addToBasket = (item: BasketItem) => {
    setBasket(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };
  
  const removeFromBasket = (id: number) => {
    setBasket(prev => prev.filter(i => i.id !== id));
  };
  
  const clearBasket = () => {
    setBasket([]);
  };
  
  return (
    <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket, clearBasket }}>
      {children}
    </BasketContext.Provider>
  );
};
```

### Order Confirmation Flow
**Challenge:** Simple but reliable order confirmation

**Solution:** Three-step process
1. **Review basket** - Show total, confirm items
2. **Enter customer details** - Name, email, phone, address
3. **Confirm order** - Create order record, send confirmation

```typescript
// components/CheckoutForm.tsx
const CheckoutForm = () => {
  const [step, setStep] = useState<'basket' | 'details' | 'confirm'>('basket');
  const [basket] = useBasket();
  const [details, setDetails] = useState<OrderDetails>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryAddress: '',
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify({
          basket: basket,
          details: details,
        }),
      });
      
      const order = await response.json();
      setStep('success');
    } catch (error) {
      console.error('Order failed:', error);
    }
  };
  
  return (
    <div className="space-y-8">
      {step === 'basket' && (
        <BasketReview basket={basket} onNext={() => setStep('details')} />
      )}
      
      {step === 'details' && (
        <CustomerDetailsForm
          details={details}
          onChange={setDetails}
          onBack={() => setStep('basket')}
          onSubmit={handleSubmit}
        />
      )}
      
      {step === 'confirm' && <OrderConfirmation order={order} />}
    </div>
  );
};
```

---

## Conclusion

TasteTrail demonstrates a production-ready restaurant ordering app:
- **Simple** with single-server architecture
- **Maintainable** with clear separation of concerns
- **Fast** with in-memory caching
- **User-friendly** with straightforward ordering flow

The architecture prioritizes simplicity and maintainability over complexity, with pragmatic tradeoffs for a small restaurant.

**Key takeaway:** For small applications, simplicity wins. Don't over-engineer. Start simple, scale only when needed.