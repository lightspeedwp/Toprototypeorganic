# Mobile Performance Guidelines

## Purpose

This document defines **mobile performance optimization strategies** for the LightSpeed Tour Operator plugin prototype to ensure fast, responsive experiences on mobile networks.

---

## Performance Budget

### Target Metrics (3G Network)

| Metric | Target | Maximum |
|--------|--------|---------|
| Time to Interactive (TTI) | < 3s | 5s |
| First Contentful Paint (FCP) | < 1.5s | 2.5s |
| Largest Contentful Paint (LCP) | < 2s | 4s |
| Total Blocking Time (TBT) | < 200ms | 600ms |
| Cumulative Layout Shift (CLS) | < 0.1 | 0.25 |
| Total Page Size | < 500KB | 1MB |

---

## Image Optimization

### 1. Lazy Loading

Load images only when needed:

```typescript
// Above fold - load immediately
<img
  src="/hero.jpg"
  alt="Hero"
  loading="eager"
  width={1920}
  height={600}
/>

// Below fold - lazy load
<img
  src="/card.jpg"
  alt="Card"
  loading="lazy"
  width={600}
  height={400}
/>
```

---

### 2. Responsive Images

Serve appropriately sized images:

```typescript
<img
  src="/image-800w.jpg"
  srcSet="
    /image-400w.jpg 400w,
    /image-800w.jpg 800w,
    /image-1200w.jpg 1200w
  "
  sizes="(max-width: 767px) 100vw, 50vw"
  alt="Tour"
  loading="lazy"
  width={800}
  height={600}
/>
```

---

### 3. Modern Image Formats

Use WebP with fallbacks:

```typescript
<picture>
  <source srcSet="/image.avif" type="image/avif" />
  <source srcSet="/image.webp" type="image/webp" />
  <img
    src="/image.jpg"
    alt="Fallback"
    loading="lazy"
    width={800}
    height={600}
  />
</picture>
```

---

### 4. Image Compression

**Target compression levels:**
- JPEG: 60-80% quality
- WebP: 75-85% quality
- PNG: Use pngquant or similar tools
- SVG: Minify and optimize

**File size limits:**
- Hero images: < 200KB
- Card images: < 100KB
- Thumbnails: < 30KB

---

## Font Optimization

### 1. Font Loading Strategy

Use `font-display: swap` to prevent text blocking:

```css
/* fonts.css */
@font-face {
  font-family: 'Lora';
  src: url('/fonts/lora.woff2') format('woff2');
  font-display: swap; /* Show fallback immediately */
  font-weight: 400;
}

@font-face {
  font-family: 'Noto Sans';
  src: url('/fonts/noto-sans.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
}
```

---

### 2. Subset Fonts

Load only required character sets:

```css
@font-face {
  font-family: 'Lora';
  src: url('/fonts/lora-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153;
}
```

---

### 3. Preload Critical Fonts

```html
<link
  rel="preload"
  href="/fonts/noto-sans.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

---

## JavaScript Optimization

### 1. Code Splitting

Split code by route:

```typescript
// Lazy load pages
const ToursArchive = lazy(() => import('./pages/ToursArchive'));
const TourSingle = lazy(() => import('./pages/TourSingle'));

// Use with Suspense
<Suspense fallback={<LoadingState />}>
  <ToursArchive />
</Suspense>
```

---

### 2. Tree Shaking

Import only what's needed:

**✅ Good:**
```typescript
import { MapPin, Calendar } from 'lucide-react';
```

**❌ Bad:**
```typescript
import * as Icons from 'lucide-react'; // Imports entire library
```

---

### 3. Defer Non-Critical Scripts

```typescript
<script src="/analytics.js" defer />
```

---

## CSS Optimization

### 1. Critical CSS

Inline critical CSS for above-fold content:

```html
<style>
  /* Critical above-fold styles */
  .header { /* ... */ }
  .hero { /* ... */ }
</style>
```

---

### 2. Remove Unused CSS

Tailwind automatically purges unused CSS in production.

---

### 3. CSS Variables for Theming

Use CSS variables instead of duplicating styles:

```css
:root {
  --primary: rgba(74, 115, 17, 1);
  --secondary: rgba(172, 159, 124, 1);
}

.dark {
  --primary: rgba(74, 115, 17, 1);
  --secondary: rgba(120, 110, 85, 1);
}
```

---

## Animation Optimization

### 1. Use Transform and Opacity

Animate only GPU-accelerated properties:

**✅ Good:**
```typescript
<motion.div
  initial={{ opacity: 0, transform: 'translateY(20px)' }}
  animate={{ opacity: 1, transform: 'translateY(0)' }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

**❌ Bad:**
```typescript
<motion.div
  initial={{ height: 0 }} // Triggers layout
  animate={{ height: 'auto' }}
>
  Content
</motion.div>
```

---

### 2. Reduce Motion for Accessibility

Respect user preferences:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.3,
    // Disable animation if user prefers reduced motion
    ...(window.matchMedia('(prefers-reduced-motion: reduce)').matches && {
      duration: 0
    })
  }}
>
  Content
</motion.div>
```

---

### 3. Throttle Scroll Listeners

```typescript
import { useEffect, useState } from 'react';
import { throttle } from 'lodash-es';

function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY);
    }, 100); // Throttle to every 100ms

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}
```

---

## Network Optimization

### 1. Resource Hints

**Preconnect to external domains:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://analytics.example.com" />
```

**Prefetch next page:**
```typescript
<link rel="prefetch" href="/tours/iceland-explorer" />
```

---

### 2. Compression

Enable Gzip/Brotli compression (server-side).

---

### 3. HTTP/2

Use HTTP/2 for multiplexing (server-side).

---

## Rendering Optimization

### 1. Avoid Layout Thrashing

Batch DOM reads and writes:

**✅ Good:**
```typescript
// Read all measurements
const heights = elements.map(el => el.offsetHeight);

// Then write all updates
elements.forEach((el, i) => {
  el.style.height = `${heights[i] + 10}px`;
});
```

**❌ Bad:**
```typescript
// Interleaved reads/writes cause layout thrashing
elements.forEach(el => {
  const height = el.offsetHeight; // Read
  el.style.height = `${height + 10}px`; // Write (triggers layout)
});
```

---

### 2. Use CSS Containment

```css
.card {
  contain: layout style paint;
}
```

---

### 3. Virtualize Long Lists

For lists > 50 items, use virtualization:

```typescript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={tours.length}
  itemSize={200}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>
      <TourCard tour={tours[index]} />
    </div>
  )}
</FixedSizeList>
```

---

## Third-Party Script Optimization

### 1. Load Scripts Asynchronously

```html
<script src="/analytics.js" async />
```

---

### 2. Delay Non-Critical Scripts

```typescript
useEffect(() => {
  // Load after page is interactive
  if (document.readyState === 'complete') {
    loadAnalytics();
  } else {
    window.addEventListener('load', loadAnalytics);
  }
}, []);
```

---

### 3. Use Facades

Load heavy embeds (videos, maps) on interaction:

```typescript
function YouTubeEmbed({ videoId }) {
  const [loaded, setLoaded] = useState(false);

  return loaded ? (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      title="Video"
      loading="lazy"
    />
  ) : (
    <button
      onClick={() => setLoaded(true)}
      className="relative w-full aspect-video bg-muted flex items-center justify-center"
    >
      <Play className="w-16 h-16 text-primary" />
      <span className="sr-only">Play video</span>
    </button>
  );
}
```

---

## Caching Strategy

### 1. Service Worker

Cache static assets for offline access:

```typescript
// service-worker.js
const CACHE_NAME = 'lightspeed-v1';
const ASSETS = [
  '/',
  '/styles/theme.css',
  '/fonts/lora.woff2',
  '/fonts/noto-sans.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});
```

---

### 2. Cache-Control Headers

Set appropriate cache headers (server-side):

```
Cache-Control: public, max-age=31536000, immutable  # Static assets
Cache-Control: public, max-age=3600                 # HTML pages
Cache-Control: no-cache                             # API responses
```

---

## Monitoring & Measurement

### 1. Core Web Vitals

Monitor these metrics:

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

---

### 2. Real User Monitoring

```typescript
// web-vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to analytics service
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

---

### 3. Performance Budgets

**Lighthouse CI budget:**

```json
{
  "performance": 90,
  "accessibility": 100,
  "best-practices": 90,
  "seo": 100,
  "resourceSizes": {
    "script": 200000,
    "image": 500000,
    "stylesheet": 50000,
    "document": 30000,
    "total": 1000000
  }
}
```

---

## Mobile-Specific Optimizations

### 1. Reduce Tap Delay

```css
* {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation; /* Removes 300ms tap delay */
}
```

---

### 2. Optimize Touch Interactions

```typescript
<button
  onTouchStart={(e) => e.currentTarget.classList.add('active')}
  onTouchEnd={(e) => e.currentTarget.classList.remove('active')}
  className="transition-transform active:scale-95"
>
  Button
</button>
```

---

### 3. Passive Event Listeners

```typescript
useEffect(() => {
  const handleScroll = () => {
    // Handle scroll
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

---

## Testing for Mobile Performance

### 1. Chrome DevTools - Mobile Simulation

- Open DevTools → Performance tab
- Select "Mobile" throttling
- Record page load

---

### 2. Lighthouse Mobile Test

```bash
lighthouse https://example.com --emulated-form-factor=mobile --throttling.cpuSlowdownMultiplier=4
```

---

### 3. Real Device Testing

Test on actual devices with:
- Slow 3G connection
- CPU throttling
- Low battery mode

---

## Performance Checklist

- [ ] Images are lazy loaded (except above-fold)
- [ ] Images use srcset for responsive delivery
- [ ] Images are compressed (< 200KB for heroes)
- [ ] Fonts use font-display: swap
- [ ] Only critical fonts are preloaded
- [ ] Code is split by route
- [ ] Tree shaking removes unused code
- [ ] Animations use transform/opacity only
- [ ] Scroll listeners are throttled
- [ ] External resources use preconnect
- [ ] Long lists are virtualized
- [ ] Third-party scripts load asynchronously
- [ ] Service worker caches static assets
- [ ] Core Web Vitals meet targets
- [ ] Page loads in < 3s on 3G

---

## Common Performance Pitfalls

### ❌ Large Hero Images

```typescript
// Bad - 2MB uncompressed image
<img src="/hero.jpg" alt="Hero" width={1920} height={1080} />
```

**✅ Solution:** Compress and optimize
```typescript
<img src="/hero-optimized.webp" alt="Hero" width={1920} height={1080} />
```

---

### ❌ Blocking Scripts

```typescript
// Bad - blocks rendering
<script src="/analytics.js"></script>
```

**✅ Solution:** Defer or async
```typescript
<script src="/analytics.js" defer />
```

---

### ❌ Layout Shift from Images

```typescript
// Bad - no dimensions, causes CLS
<img src="/image.jpg" alt="Image" />
```

**✅ Solution:** Always specify dimensions
```typescript
<img src="/image.jpg" alt="Image" width={800} height={600} />
```

---

## Related Documentation

- [mobile/images.md](images.md) - Image optimization
- [mobile/typography.md](typography.md) - Typography performance
- [mobile/forms.md](forms.md) - Form optimization
