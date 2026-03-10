# Mobile Image Guidelines

## Purpose

This document defines **mobile image optimization strategies** for the LightSpeed Tour Operator plugin prototype to ensure fast loading and optimal display on mobile devices.

---

## Core Mobile Image Principles

### 1. Responsive Images

Always serve appropriately sized images for mobile screens:

- **Mobile (320px-767px):** Smaller image sizes
- **Tablet (768px-1023px):** Medium image sizes
- **Desktop (1024px+):** Full-size images

---

### 2. Lazy Loading

Load images only when they're about to enter the viewport:

```typescript
<img
  src="/image.jpg"
  alt="Description"
  loading="lazy"
  className="w-full h-auto"
/>
```

---

### 3. Explicit Dimensions

Always specify width and height to prevent layout shift:

```typescript
<img
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  className="w-full h-auto"
/>
```

---

## Image Sizing Patterns

### Hero Images

**Mobile:** Full width, shorter height
**Desktop:** Full width, taller height

```typescript
<div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg">
  <img
    src="/hero.jpg"
    alt="Iceland landscape"
    className="w-full h-full object-cover"
    loading="eager" // Above fold, load immediately
    width={1920}
    height={600}
  />
</div>
```

---

### Card Images

**Mobile:** Square or 16:9 aspect ratio
**Desktop:** Consistent with mobile

```typescript
<div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
  <img
    src="/tour-card.jpg"
    alt="Tour destination"
    className="w-full h-full object-cover"
    loading="lazy"
    width={600}
    height={400}
  />
</div>
```

---

### Thumbnail Images

**Fixed small size on all screens:**

```typescript
<div className="relative w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-md">
  <img
    src="/thumbnail.jpg"
    alt="Thumbnail"
    className="w-full h-full object-cover"
    loading="lazy"
    width={96}
    height={96}
  />
</div>
```

---

### Avatar Images

**Circular, consistent size:**

```typescript
<div className="relative w-12 h-12 overflow-hidden rounded-full">
  <img
    src="/avatar.jpg"
    alt="Team member"
    className="w-full h-full object-cover"
    loading="lazy"
    width={48}
    height={48}
  />
</div>
```

---

## Responsive Image Techniques

### 1. CSS-Based Responsive Images

Use Tailwind responsive utilities:

```typescript
<img
  src="/image.jpg"
  alt="Responsive image"
  className="w-full h-[200px] md:h-[300px] lg:h-[400px] object-cover"
  loading="lazy"
  width={1200}
  height={400}
/>
```

---

### 2. srcset for Different Resolutions

Serve different image sizes based on screen width:

```typescript
<img
  src="/image-800w.jpg"
  srcSet="
    /image-400w.jpg 400w,
    /image-800w.jpg 800w,
    /image-1200w.jpg 1200w
  "
  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
  alt="Tour destination"
  loading="lazy"
  width={1200}
  height={800}
  className="w-full h-auto"
/>
```

---

### 3. Picture Element for Art Direction

Different crops for different screen sizes:

```typescript
<picture>
  <source
    media="(max-width: 767px)"
    srcSet="/image-mobile.jpg"
  />
  <source
    media="(min-width: 768px)"
    srcSet="/image-desktop.jpg"
  />
  <img
    src="/image-desktop.jpg"
    alt="Responsive image"
    loading="lazy"
    width={1200}
    height={800}
    className="w-full h-auto"
  />
</picture>
```

---

## Lazy Loading Strategy

### Above-the-Fold Images

**DO NOT** lazy load images visible on initial page load:

```typescript
// Hero image - visible immediately
<img
  src="/hero.jpg"
  alt="Hero image"
  loading="eager" // or omit loading attribute
  width={1920}
  height={600}
/>
```

---

### Below-the-Fold Images

**ALWAYS** lazy load images below the fold:

```typescript
// Card images in grid - lazy load
<img
  src="/card.jpg"
  alt="Card image"
  loading="lazy"
  width={600}
  height={400}
/>
```

---

### Critical vs Non-Critical

| Image Location | Loading Strategy | Priority |
|----------------|------------------|----------|
| Hero image | `loading="eager"` | High |
| Logo | `loading="eager"` | High |
| First 2-3 cards | `loading="eager"` | Medium |
| Remaining cards | `loading="lazy"` | Low |
| Footer images | `loading="lazy"` | Low |

---

## Image Optimization Checklist

### File Size Optimization

- **JPEG:** 60-80% quality for photos
- **PNG:** Use for icons, logos (with transparency)
- **WebP:** Modern format, smaller file sizes
- **AVIF:** Next-gen format (fallback to WebP/JPEG)

**Target file sizes:**
- Hero images: < 200KB
- Card images: < 100KB
- Thumbnails: < 30KB
- Avatars: < 20KB

---

### Compression

```typescript
// Using ImageWithFallback component
import { ImageWithFallback } from './components/figma/ImageWithFallback';

<ImageWithFallback
  src="/optimized-image.jpg"
  alt="Optimized image"
  width={800}
  height={600}
  className="w-full h-auto"
/>
```

---

## Aspect Ratio Management

### Fixed Aspect Ratios

Use Tailwind aspect ratio utilities:

```typescript
// 16:9 aspect ratio
<div className="relative w-full aspect-[16/9]">
  <img
    src="/image.jpg"
    alt="16:9 image"
    className="absolute inset-0 w-full h-full object-cover"
    loading="lazy"
  />
</div>

// 4:3 aspect ratio
<div className="relative w-full aspect-[4/3]">
  <img
    src="/image.jpg"
    alt="4:3 image"
    className="absolute inset-0 w-full h-full object-cover"
    loading="lazy"
  />
</div>

// Square (1:1)
<div className="relative w-full aspect-square">
  <img
    src="/image.jpg"
    alt="Square image"
    className="absolute inset-0 w-full h-full object-cover"
    loading="lazy"
  />
</div>
```

---

### Responsive Aspect Ratios

Change aspect ratio based on screen size:

```typescript
<div className="relative w-full aspect-square md:aspect-[16/9]">
  <img
    src="/image.jpg"
    alt="Responsive aspect ratio"
    className="absolute inset-0 w-full h-full object-cover"
    loading="lazy"
  />
</div>
```

---

## Object Fit Strategies

### Cover (Most Common)

Fills container, may crop:

```typescript
<img
  src="/image.jpg"
  alt="Cover image"
  className="w-full h-full object-cover"
  loading="lazy"
/>
```

---

### Contain

Entire image visible, may show letterboxing:

```typescript
<img
  src="/logo.png"
  alt="Logo"
  className="w-full h-full object-contain"
  loading="eager"
/>
```

---

### Object Position

Control focal point:

```typescript
<img
  src="/image.jpg"
  alt="Image"
  className="w-full h-full object-cover object-center"
  loading="lazy"
/>

// Focus on top
<img
  src="/image.jpg"
  alt="Image"
  className="w-full h-full object-cover object-top"
  loading="lazy"
/>
```

---

## Common Mobile Image Patterns

### 1. Hero Section with Image

```typescript
<section className="relative w-full h-[400px] md:h-[600px]">
  <img
    src="/hero-iceland.jpg"
    alt="Iceland landscape"
    className="absolute inset-0 w-full h-full object-cover"
    loading="eager"
    width={1920}
    height={600}
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
  <div className="relative z-10 flex items-center justify-center h-full">
    <Container>
      <h1 className="text-white text-[36px] md:text-[60px] font-semibold">
        Explore Iceland
      </h1>
    </Container>
  </div>
</section>
```

---

### 2. Tour Card Image

```typescript
<article className="bg-card rounded-lg overflow-hidden shadow-sm">
  <div className="relative w-full aspect-[16/9]">
    <img
      src="/tour-iceland.jpg"
      alt="Iceland Explorer Tour"
      className="absolute inset-0 w-full h-full object-cover"
      loading="lazy"
      width={600}
      height={400}
    />
  </div>
  <div className="p-4">
    <h3>Iceland Explorer</h3>
    <p className="text-sm text-muted-foreground">8 days / 7 nights</p>
  </div>
</article>
```

---

### 3. Image Gallery Grid

```typescript
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {images.map((image, index) => (
    <div key={image.id} className="relative aspect-square">
      <img
        src={image.src}
        alt={image.alt}
        className="absolute inset-0 w-full h-full object-cover rounded-md"
        loading={index < 4 ? "eager" : "lazy"}
        width={400}
        height={400}
      />
    </div>
  ))}
</div>
```

---

### 4. Team Member Avatar

```typescript
<div className="flex items-center gap-3">
  <div className="relative w-12 h-12 rounded-full overflow-hidden">
    <img
      src="/team/john.jpg"
      alt="John Doe"
      className="absolute inset-0 w-full h-full object-cover"
      loading="lazy"
      width={48}
      height={48}
    />
  </div>
  <div>
    <h4 className="font-medium">John Doe</h4>
    <p className="text-sm text-muted-foreground">Tour Guide</p>
  </div>
</div>
```

---

### 5. Background Image with Overlay

```typescript
<section className="relative py-20">
  <img
    src="/background.jpg"
    alt=""
    className="absolute inset-0 w-full h-full object-cover -z-10"
    loading="lazy"
    width={1920}
    height={800}
  />
  <div className="absolute inset-0 bg-black/40 -z-10" />
  <Container>
    <h2 className="text-white text-[32px] font-semibold">
      Featured Destinations
    </h2>
  </Container>
</section>
```

---

## Performance Optimization

### 1. Image Loading Priority

```typescript
// High priority (above fold)
<img
  src="/hero.jpg"
  alt="Hero"
  loading="eager"
  fetchpriority="high"
  width={1920}
  height={600}
/>

// Low priority (below fold)
<img
  src="/card.jpg"
  alt="Card"
  loading="lazy"
  fetchpriority="low"
  width={600}
  height={400}
/>
```

---

### 2. Decode Async

For large images, decode asynchronously:

```typescript
<img
  src="/large-image.jpg"
  alt="Large image"
  loading="lazy"
  decoding="async"
  width={1920}
  height={1080}
/>
```

---

### 3. Intersection Observer (Advanced)

For custom lazy loading:

```typescript
import { useEffect, useRef, useState } from 'react';

function LazyImage({ src, alt, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isLoaded ? src : '/placeholder.jpg'}
      alt={alt}
      {...props}
    />
  );
}
```

---

## Accessibility Requirements

### 1. Alt Text

**Always provide descriptive alt text:**

```typescript
// ✅ Good
<img src="/tour.jpg" alt="Group of hikers on Iceland glacier" />

// ❌ Bad
<img src="/tour.jpg" alt="image" />
<img src="/tour.jpg" alt="" /> {/* Only for decorative images */}
```

---

### 2. Decorative Images

Use empty alt for purely decorative images:

```typescript
<img
  src="/decorative-pattern.svg"
  alt=""
  className="absolute opacity-10"
  loading="lazy"
/>
```

---

### 3. Figure Captions

Provide captions when context is needed:

```typescript
<figure>
  <img
    src="/destination.jpg"
    alt="Northern Lights over Reykjavik"
    loading="lazy"
    width={800}
    height={600}
  />
  <figcaption className="text-sm text-muted-foreground mt-2">
    The Northern Lights illuminate the sky over Iceland's capital
  </figcaption>
</figure>
```

---

## Dark Mode Considerations

### Logo Variations

Swap logos for dark mode:

```typescript
<img
  src="/logo-light.svg"
  alt="LightSpeed Tours"
  className="h-8 dark:hidden"
  loading="eager"
/>
<img
  src="/logo-dark.svg"
  alt="LightSpeed Tours"
  className="h-8 hidden dark:block"
  loading="eager"
/>
```

---

### Image Overlays

Adjust overlays for dark mode:

```typescript
<div className="relative">
  <img
    src="/image.jpg"
    alt="Destination"
    className="w-full h-auto"
    loading="lazy"
  />
  <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
</div>
```

---

## Testing Checklist

- [ ] All images have appropriate alt text
- [ ] Above-fold images load immediately
- [ ] Below-fold images lazy load
- [ ] Images have explicit width/height attributes
- [ ] Aspect ratios are consistent
- [ ] File sizes are optimized (< 200KB for heroes)
- [ ] Images display correctly in light and dark mode
- [ ] srcset provides multiple resolutions
- [ ] Images don't cause layout shift on load
- [ ] Mobile users get appropriately sized images

---

## Related Documentation

- [mobile/performance.md](performance.md) - Performance optimization
- [mobile/typography.md](typography.md) - Mobile typography
- [design-tokens/spacing.md](../design-tokens/spacing.md) - Image spacing
