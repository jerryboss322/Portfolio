# Luxora - Architecture Overview

**Type:** 3D shopfront concept  
**Timeline:** 2024  
**Stack:** React, Three.js, GSAP, Sanity CMS, Vercel

---

## Architecture Style

**Progressively Enhanced 3D Experience**

Luxora implements 3D product visualization as a progressive enhancement. Users without WebGL see a static product page, while capable devices get an interactive 3D model. This ensures the site works everywhere while providing the best experience for users with modern devices.

---

## Technology Stack

### Frontend: React 18
**Why React?**
- Concurrent rendering for smooth 3D interactions
- `useId` for accessibility
- `useDeferredValue` for progressive enhancement

### 3D: Three.js
**Why Three.js?**
- Most mature 3D library
- WebGL backend
- Large ecosystem (controls, loaders, effects)

**Alternatives considered:**
- Babylon.js (more features, less documentation)
- A-Frame (VR-focused, overkill)
- Pure WebGL (too low-level)

### Animation: GSAP
**Why GSAP?**
- Precise control over animations
- Excellent performance (GPU-accelerated)
- Timeline support for complex sequences

**Why not Framer Motion?**
- GSAP has better 3D support
- More control over animation easing
- Better performance for complex animations

### CMS: Sanity
**Why Sanity?**
- Real-time preview for product updates
- Image optimization built-in
- Queryable API with GROQ

### Deployment: Vercel
- Static generation for all pages
- Edge caching for images and 3D assets
- Automatic HTTPS

---

## Database Design

### Schema Overview
No database in the traditional sense. Sanity CMS handles content storage for products, collections, and categories.

### Key Content Types

**products**
```json
{
  _id: string,
  name: string,
  description: markdown,
  price: number,
  collection: reference to collections,
  images: [image],
  model3D: file (glb format),
  specifications: [
    { label: string, value: string }
  ]
}
```

**collections**
```json
{
  _id: string,
  name: string,
  description: markdown,
  coverImage: image,
  products: [reference to products]
}
```

### Relationships
```
collections (1) ← (M) products
```

### Optimization Strategy
- Sanity CDN for images (automatic webp, responsive sizes)
- 3D models with Draco compression (70% size reduction)
- Lazy loading for 3D content
- Browser caching for static assets

---

## API Design

### Endpoints

**Public endpoints (no auth)**
```
GET    /api/products              # Product list with 3D model URLs
GET    /api/products/[id]         # Single product with 3D model
GET    /api/collections           # List collections
GET    /api/collections/[slug]    # Collection with products
```

### Authentication
- None for public API
- Sanity API token for admin operations

### Rate Limiting
- **2000 requests/minute** for public API (generous for product showcase)
- Rate limiting on 3D model downloads (prevent abuse)

### Caching Strategy
- **Edge caching** on Vercel (all static assets)
- **Sanity CDN** for images (automatic optimization)
- **Browser caching** for 3D models (7-day max-age)
- **No caching** for product list (always fresh)

---

## Deployment Strategy

### Hosting: Vercel
- Static generation at build time
- Edge network for global low-latency
- Serverless functions for API routes (if needed)
- Automatic HTTPS, CDN, analytics

### Build Process
1. **Sanity content fetch** (GROQ query)
2. **Next.js static generation** (generateStaticParams)
3. **3D model optimization** (Draco compression)
4. **Image optimization** (Next.js Image component)

### CI/CD
- GitHub push triggers Vercel redeploy
- Automatic preview environments for PRs
- Production deploy on merge to main

### Monitoring
- Vercel Analytics (page views, 3D model loads)
- Performance tracking for 3D load times
- Error tracking for WebGL failures

---

## Key Architecture Decisions

### 1. Progressive Enhancement for 3D
**Problem:** Not all users can run 3D content (mobile, older devices, slow connections)
**Solution:** Detect WebGL capability, load 3D only if supported
```typescript
// utils/webgl.ts
export const supportsWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!ctx;
  } catch {
    return false;
  }
};

// components/3d-viewer.tsx
const WebGLViewer = ({ modelUrl }: { modelUrl: string }) => {
  const [canRender, setCanRender] = useState(false);
  
  useEffect(() => {
    if (supportsWebGL()) {
      setCanRender(true);
      load3DModel(modelUrl);
    }
  }, [modelUrl]);
  
  if (!canRender) {
    return <StaticProductView modelUrl={modelUrl} />;
  }
  
  return <Interactive3DView modelUrl={modelUrl} />;
};
```

**Tradeoff:** Code duplication (static vs. 3D), vs. alienating 30% of mobile users

### 2. Lazy Loading 3D Models
**Problem:** 3D models can be 5MB+ (slow initial load)
**Solution:** Lazy load 3D content after page is interactive
```typescript
// hooks/useLazy3D.ts
export const useLazy3D = (modelUrl: string) => {
  const [model, setModel] = useState<THREE.Mesh | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const loadModel = useCallback(() => {
    if (model) return;
    
    setIsLoading(true);
    const loader = new GLTFLoader();
    loader.load(modelUrl, (gltf) => {
      setModel(gltf.scene);
      setIsLoading(false);
    });
  }, [modelUrl]);
  
  // Load after 500ms if user is idle
  useEffect(() => {
    const timeout = setTimeout(loadModel, 500);
    return () => clearTimeout(timeout);
  }, [loadModel]);
  
  return { model, isLoading };
};
```

**Tradeoff:** Delayed 3D loading, vs. slow initial page load

### 3. Draco Compression for 3D Models
**Problem:** 3D models too large for web
**Solution:** Draco compression (70% size reduction)
```bash
# Optimize 3D model with Draco
npx gltf-pipeline -i input.glb -o output.glb -d
```

**Tradeoff:** Decode time on client, vs. faster download

---

## Tradeoffs

### 1. Three.js vs. WebGL
| Aspect | Three.js | Raw WebGL |
|--------|----------|-----------|
| Development time | Fast (high-level) | Slow (low-level) |
| Performance | Good (abstraction layer) | Best (direct control) |
| Features | Many (controls, loaders) | None (build from scratch) |

**Decision:** Three.js for faster iteration. Raw WebGL if performance becomes critical.

### 2. Progressive Enhancement vs. 3D-Only
| Aspect | Progressive Enhancement | 3D-Only |
|--------|-------------------------|---------|
| Accessibility | Best (works everywhere) | Poor (limited devices) |
| Load time | Faster (static first) | Slower (3D must load) |
| Engagement | High (fallback + enhancement) | Medium (only 3D) |

**Decision:** Progressive enhancement. Accessibility and load time are too important to sacrifice.

### 3. Sanity vs. Custom CMS
| Aspect | Sanity | Custom CMS |
|--------|--------|------------|
| Development time | Fast (ready-made) | Slow (build from scratch) |
| Monthly cost | $29/mo | $0 (self-hosted) |
| Flexibility | High (schema customization) | Unlimited (full control) |

**Decision:** Sanity for faster iteration. Custom CMS if budget allows.

---

## Lessons Learned

### 1. 3D Models Can Be 5MB+
**Problem:** Initial page load slow due to 3D model download
**Solution:** Progressive loading with skeleton screens
```typescript
// components/3d-viewer.tsx
const WebGLViewer = ({ modelUrl }: { modelUrl: string }) => {
  const { model, isLoading } = useLazy3D(modelUrl);
  
  return (
    <div className="relative h-[500px]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-current mx-auto mb-4"></div>
            <p className="text-muted">Loading 3D model...</p>
          </div>
        </div>
      )}
      <Interactive3DView modelUrl={modelUrl} model={model} />
    </div>
  );
};
```

**Lesson:** Always show loading state for large assets. Use skeleton screens for better perceived performance.

### 2. WebGL Detection Isn't Perfect
**Problem:** Some devices report WebGL support but fail at runtime
**Solution:** Manual toggle for users who want 3D
```typescript
// utils/webgl.ts
export const supportsWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!ctx;
  } catch {
    return false;
  }
};

export const manual3DToggle = () => {
  localStorage.setItem('prefer3D', 'true');
  window.location.reload();
};

// Component
const Toggle3D = () => {
  const canRender = supportsWebGL();
  const prefer3D = localStorage.getItem('prefer3D');
  
  if (!canRender && !prefer3D) return null;
  
  return (
    <button onClick={manual3DToggle}>
      Enable 3D view
    </button>
  );
};
```

**Lesson:** Always provide a manual override. Users know their devices better than detection.

### 3. Animation Performance Varies by Device
**Problem:** Smooth on desktop, choppy on mobile
**Solution:** Quality settings and fallback animations
```typescript
// hooks/useAnimation.ts
export const useAnimation = (deviceQuality: 'high' | 'low') => {
  const [animation, setAnimation] = useState<GSAPTween | null>(null);
  
  useEffect(() => {
    if (deviceQuality === 'high') {
      // Complex animation
      setAnimation(gsap.to('.product', { rotation: 360, duration: 2, ease: 'power2.inOut' }));
    } else {
      // Simple animation
      setAnimation(gsap.to('.product', { opacity: 1, duration: 0.5 }));
    }
    
    return () => animation?.kill();
  }, [deviceQuality, animation]);
  
  return animation;
};
```

**Lesson:** Always have fallback animations for low-end devices. Quality settings improve UX.

---

## Technical Deep Dive: Key Components

### 3D Product Viewer
**Challenge:** Interactive 3D model with mouse/touch controls

**Solution:** Three.js with OrbitControls
```typescript
// components/3d-viewer.tsx
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const Product3DViewer = ({ modelUrl }: { modelUrl: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, containerRef.current.clientWidth / 500, 0.1, 1000);
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, 500);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);
    
    // Load model
    const loader = new GLTFLoader();
    loader.load(modelUrl, (gltf) => {
      scene.add(gltf.scene);
      animate();
    });
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    
    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !renderer) return;
      
      camera.aspect = containerRef.current.clientWidth / 500;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, 500);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [modelUrl]);
  
  return <div ref={containerRef} />;
};
```

### GSAP Animations for Product Page
**Challenge:** Smooth animations for product reveal and interaction

**Solution:** GSAP timeline for complex sequences
```typescript
// hooks/useProductAnimations.ts
export const useProductAnimations = () => {
  const productRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const priceRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )
    .fromTo(
      priceRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(
      productRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
    );
    
    return () => tl.kill();
  }, []);
  
  return { productRef, titleRef, priceRef };
};
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
  src={urlFor(product.coverImage)}
  alt={product.name}
  width={400}
  height={600}
  priority={isFeatured}
  quality={80}
  loading="lazy"
  className="w-full h-auto object-cover"
/>
```

---

## Conclusion

Luxora demonstrates a production-ready 3D product showcase:
- **Accessible** with progressive enhancement
- **Performant** with lazy loading and compression
- **Maintainable** with Sanity CMS for content updates
- **Engaging** with smooth GSAP animations

The architecture prioritizes accessibility and performance over cutting-edge 3D, with pragmatic tradeoffs for the web platform.

**Key takeaway:** 3D on the web is powerful, but only when it doesn't break the experience for users who can't access it. Progressive enhancement is the right approach.