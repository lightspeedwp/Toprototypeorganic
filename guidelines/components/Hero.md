# Hero Pattern Guidelines

**Component:** `Hero`  
**Location:** `/src/app/components/patterns/Hero.tsx`  
**WordPress Equivalent:** Custom pattern (`hero/*`)  
**Category:** Header Patterns

---

## Purpose

The Hero pattern is the primary visual anchor at the top of pages, providing context, hierarchy, and a clear entry point for user journeys.

**Use for:**
- Homepage introductions
- Tour detail pages
- Destination detail pages
- Key landing pages
- Campaign pages

**Don't use for:**
- Archive pages (use ArchiveHeader instead)
- Blog listing pages (use ArchiveHeader)
- Utility pages (use simple page header)

---

## WordPress Mapping

```html
<!-- WordPress Pattern (patterns/hero/hero-default.php) -->
<!-- wp:group {"className":"hero-pattern"} -->
<div class="hero-pattern">
  <!-- wp:cover {"url":"image.jpg"} -->
  <div class="wp-block-cover">
    <div class="wp-block-cover__inner-container">
      <!-- wp:heading {"level":1} -->
      <h1>Hero Title</h1>
      <!-- /wp:heading -->
      
      <!-- wp:paragraph -->
      <p>Hero description text</p>
      <!-- /wp:paragraph -->
      
      <!-- wp:buttons -->
      <div class="wp-block-buttons">
        <!-- wp:button -->
        <a class="wp-block-button__link" href="#">Primary Action</a>
        <!-- /wp:button -->
      </div>
      <!-- /wp:buttons -->
    </div>
  </div>
  <!-- /wp:cover -->
</div>
<!-- /wp:group -->
```

**React Equivalent:**

```tsx
<Hero
  title="Discover Iceland's Magic"
  description="Experience the land of fire and ice with our expert-guided tours"
  image="/heroes/iceland.jpg"
  primaryAction={{ label: "View Tours", href: "/tours/iceland" }}
  secondaryAction={{ label: "Learn More", href: "/destinations/iceland" }}
/>
```

---

## Component API

### Props

```typescript
interface HeroProps {
  /** Hero title (H1) */
  title: string;
  
  /** Optional subtitle/description */
  description?: string;
  
  /** Background image URL */
  image?: string;
  
  /** Background video URL */
  video?: string;
  
  /** Primary call-to-action */
  primaryAction?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  
  /** Secondary call-to-action (optional) */
  secondaryAction?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  
  /** Hero variant */
  variant?: "default" | "full-height" | "split" | "minimal";
  
  /** Content alignment */
  alignment?: "left" | "center" | "right";
  
  /** Overlay opacity (0-1) */
  overlayOpacity?: number;
  
  /** Breadcrumbs (optional) */
  breadcrumbs?: Array<{ label: string; href: string }>;
  
  /** Additional CSS classes */
  className?: string;
}
```

---

## Hero Variants

### 1. Default Hero
**Use for:** Most pages (tours, destinations, landing pages)

**Features:**
- Background image
- Dark overlay
- Centered content
- H1 title + description
- Primary + secondary CTAs
- Medium height (60vh)

**Example:**
```tsx
<Hero
  variant="default"
  title="Northern Lights Adventure"
  description="Witness nature's most spectacular light show in Iceland"
  image="/heroes/northern-lights.jpg"
  primaryAction={{ label: "Book Now", href: "/tours/northern-lights/book" }}
  secondaryAction={{ label: "View Details", href: "/tours/northern-lights" }}
  overlayOpacity={0.5}
  alignment="center"
/>
```

### 2. Full-Height Hero
**Use for:** Homepage, major campaign pages

**Features:**
- 100vh height
- Large, impactful imagery
- Scroll indicator
- Minimalist content

**Example:**
```tsx
<Hero
  variant="full-height"
  title="Adventure Awaits"
  description="Discover the world's most breathtaking destinations"
  image="/heroes/homepage.jpg"
  primaryAction={{ label: "Explore Tours", href: "/tours" }}
  alignment="center"
/>
```

### 3. Split Hero
**Use for:** Feature-focused pages, product highlights

**Features:**
- Split layout (50/50)
- Image on one side, content on other
- No overlay
- Desktop: side-by-side, Mobile: stacked

**Example:**
```tsx
<Hero
  variant="split"
  title="Small Group Tours"
  description="Intimate experiences with expert guides and personalized attention"
  image="/heroes/small-group.jpg"
  primaryAction={{ label: "View Tours", href: "/tours?group-size=small" }}
  alignment="left"
/>
```

### 4. Minimal Hero
**Use for:** Simple content pages, about pages

**Features:**
- No background image
- Solid background color
- Text-only
- Compact height

**Example:**
```tsx
<Hero
  variant="minimal"
  title="About Us"
  description="Passionate about creating unforgettable travel experiences"
  alignment="left"
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ]}
/>
```

---

## Styling

### CSS Variables (from theme.css)

```css
/* Hero Heights */
.hero-default {
  min-height: clamp(400px, 60vh, 600px);
}

.hero-full-height {
  min-height: 100vh;
}

.hero-split {
  min-height: clamp(400px, 60vh, 600px);
}

.hero-minimal {
  padding: var(--spacing-section-md) 0;
}

/* Overlay */
.hero-overlay {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.6)
  );
}

/* Content Container */
.hero-content {
  max-width: 800px;
  padding: var(--spacing-section-md);
}
```

### Design Tokens

**Colors:**
- Overlay: `bg-black/50` (default)
- Text on image: `text-white`
- Minimal variant: `bg-muted`, `text-foreground`

**Spacing:**
- Section padding: `py-20` (desktop), `py-12` (mobile)
- Content max-width: `max-w-3xl`
- Title margin: `mb-6`
- Description margin: `mb-8`
- Button gap: `gap-4`

**Typography:**
- H1 title: Lora, bold (700), 48-72px (fluid)
- Description: Noto Sans, normal (400), 18-20px
- Buttons: Noto Sans, medium (500), 16px

**Border Radius:**
- Buttons: `rounded-lg` (6px)

---

## Typography Rules

### H1 Title

**DO:**
```tsx
<h1>{title}</h1>
// Gets automatic styling from theme.css:
// - Font: Lora
// - Weight: 700 (bold)
// - Size: clamp(3rem, 5vw, 4.5rem)
// - Line height: 1.1
```

**DON'T:**
```tsx
<h1 className="text-6xl font-bold leading-tight">{title}</h1>
// Don't override with Tailwind classes unless intentionally deviating
```

### Description

**DO:**
```tsx
<p className="text-lg">{description}</p>
// Override text size for hero descriptions (larger than body)
```

---

## Accessibility

### WCAG 2.1 AA Compliance

**Heading Hierarchy:**
- Hero must contain exactly **one H1** per page
- H1 must be the page's main title
- No other H1 elements allowed on the page

**Color Contrast:**
- Text on images must meet 4.5:1 contrast ratio
- Use dark overlay (50-60% opacity) for light images
- Ensure text remains readable on all screen sizes

**Semantic HTML:**
```tsx
<section className="hero" aria-label="Page hero">
  <div className="hero-content">
    <h1>{title}</h1>
    {description && <p>{description}</p>}
    {primaryAction && (
      <a href={primaryAction.href} className="button-primary">
        {primaryAction.label}
      </a>
    )}
  </div>
</section>
```

**Keyboard Navigation:**
- All CTA buttons must be keyboard accessible
- Focus states must be visible
- Tab order must be logical

**Screen Reader Announcements:**
- `aria-label="Page hero"` on section
- Decorative images: `aria-hidden="true"` on background
- Content images: Proper alt text

---

## Background Images

### Image Requirements

**Dimensions:**
- Minimum: 1920x1080px (Full HD)
- Recommended: 2560x1440px (2K)
- Aspect ratio: 16:9 or 21:9

**File Format:**
- WebP (preferred)
- JPEG (fallback)
- Max file size: 500KB (optimized)

**Optimization:**
```tsx
<Hero
  image="/heroes/iceland.jpg"
  // Automatically uses ImageWithFallback component:
  // - Lazy loading
  // - Responsive srcset
  // - WebP format
  // - Blur placeholder
/>
```

### Background Videos

**Use sparingly:** Only for homepage or major campaigns

```tsx
<Hero
  video="/videos/hero-iceland.mp4"
  image="/heroes/iceland.jpg" // Fallback poster
  // Video features:
  // - Autoplay (muted)
  // - Loop
  // - No controls
  // - Pause on mobile (image fallback)
/>
```

---

## Call-to-Action Buttons

### Primary Action

**Use for:**
- Main conversion goal (Book Now, Explore Tours)
- High-contrast, prominent button

**Styling:**
```tsx
<a
  href={primaryAction.href}
  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
>
  {primaryAction.label}
</a>
```

### Secondary Action

**Use for:**
- Alternative path (Learn More, View Details)
- Subtle, outline button

**Styling:**
```tsx
<a
  href={secondaryAction.href}
  className="px-8 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
>
  {secondaryAction.label}
</a>
```

---

## Breadcrumbs Integration

**Show breadcrumbs on:**
- Tour detail pages
- Destination detail pages
- Deep content pages

**Don't show on:**
- Homepage
- Archive pages (shown in ArchiveHeader)
- Landing pages

```tsx
<Hero
  title="Iceland Explorer"
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Tours", href: "/tours" },
    { label: "Iceland", href: "/destinations/iceland" },
    { label: "Iceland Explorer", href: "/tours/iceland-explorer" },
  ]}
/>
```

---

## Common Patterns

### Tour Detail Page Hero

```tsx
<Hero
  variant="default"
  title={tour.name}
  description={tour.tagline}
  image={tour.heroImage}
  primaryAction={{
    label: "Book This Tour",
    href: `/tours/${tour.slug}/book`,
  }}
  secondaryAction={{
    label: "Download Itinerary",
    onClick: () => downloadPDF(tour.itinerary),
  }}
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Tours", href: "/tours" },
    { label: tour.destination.name, href: `/destinations/${tour.destination.slug}` },
    { label: tour.name, href: `/tours/${tour.slug}` },
  ]}
  alignment="center"
  overlayOpacity={0.5}
/>
```

### Destination Page Hero

```tsx
<Hero
  variant="default"
  title={destination.name}
  description={destination.tagline}
  image={destination.heroImage}
  primaryAction={{
    label: `Explore ${destination.name} Tours`,
    href: `/tours?destination=${destination.slug}`,
  }}
  alignment="left"
  overlayOpacity={0.4}
/>
```

### Homepage Hero

```tsx
<Hero
  variant="full-height"
  title="Discover Your Next Adventure"
  description="Expert-guided tours to the world's most incredible destinations"
  image="/heroes/homepage.jpg"
  primaryAction={{
    label: "Explore Tours",
    href: "/tours",
  }}
  secondaryAction={{
    label: "Plan Your Trip",
    href: "/destinations",
  }}
  alignment="center"
  overlayOpacity={0.6}
/>
```

---

## Mobile Considerations

### Responsive Design

**Desktop (lg):**
- Full height (60vh or 100vh)
- Large typography
- Side-by-side buttons

**Tablet (md):**
- Reduced height (50vh)
- Medium typography
- Side-by-side buttons (if space)

**Mobile (sm):**
- Compact height (400px min)
- Smaller typography
- Stacked buttons
- Reduced overlay opacity (better visibility)

### Touch Targets

**All CTA buttons:**
- Minimum 44x44px
- Generous padding: `px-8 py-3`
- Clear tap states

---

## Performance

### Image Optimization

```tsx
// Use ImageWithFallback for hero images
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

<div className="hero-background">
  <ImageWithFallback
    src={image}
    alt="" // Decorative, empty alt
    loading="eager" // Hero image loads immediately
    priority // Next.js priority hint
    className="absolute inset-0 object-cover"
  />
</div>
```

### Lazy Loading Content

```tsx
// Load hero first, defer below-fold content
<Hero {...props} /> {/* Loads immediately */}
<CardGrid {...props} /> {/* Can lazy load */}
```

---

## Testing Checklist

- [ ] H1 title displays correctly
- [ ] Description shows (if provided)
- [ ] Background image loads and displays
- [ ] Overlay opacity correct
- [ ] Primary CTA works
- [ ] Secondary CTA works (if present)
- [ ] Breadcrumbs display (if provided)
- [ ] Text contrast meets WCAG AA (4.5:1)
- [ ] Responsive on all screen sizes
- [ ] Mobile: buttons stack vertically
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Screen reader announces content correctly
- [ ] Video plays (if used)
- [ ] Only one H1 on page

---

## Related Components

- **ArchiveHeader** - For archive/listing pages
- **PageHeader** - For simple content pages
- **Breadcrumbs** - Hierarchical navigation
- **Container** - Content width constraint
- **Button** - CTA buttons

---

## WordPress Block Theme Alignment

### Pattern Registration

```php
// WordPress: patterns/hero/hero-default.php
<?php
/**
 * Title: Default Hero
 * Slug: tour-operator/hero-default
 * Categories: hero
 */
?>

<!-- wp:cover {"url":"<?php echo esc_url( get_template_directory_uri() . '/assets/hero.jpg' ); ?>","dimRatio":50} -->
<div class="wp-block-cover">
  <span aria-hidden="true" class="wp-block-cover__background has-background-dim"></span>
  <img class="wp-block-cover__image-background" alt="" src="<?php echo esc_url( get_template_directory_uri() . '/assets/hero.jpg' ); ?>" data-object-fit="cover"/>
  
  <div class="wp-block-cover__inner-container">
    <!-- wp:heading {"level":1,"textAlign":"center"} -->
    <h1 class="has-text-align-center">Hero Title</h1>
    <!-- /wp:heading -->
    
    <!-- wp:paragraph {"align":"center"} -->
    <p class="has-text-align-center">Hero description</p>
    <!-- /wp:paragraph -->
    
    <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
    <div class="wp-block-buttons">
      <!-- wp:button -->
      <div class="wp-block-button">
        <a class="wp-block-button__link" href="#">Primary Action</a>
      </div>
      <!-- /wp:button -->
      
      <!-- wp:button {"className":"is-style-outline"} -->
      <div class="wp-block-button is-style-outline">
        <a class="wp-block-button__link" href="#">Secondary Action</a>
      </div>
      <!-- /wp:button -->
    </div>
    <!-- /wp:buttons -->
  </div>
</div>
<!-- /wp:cover -->
```

---

## Implementation Notes

**Component Location:**
- File: `/src/app/components/patterns/Hero.tsx`
- Pattern component (not a block)
- Composes multiple WordPress blocks

**State Management:**
- Stateless component (pure presentation)
- No internal state
- Props-driven

**Styling:**
- Uses design tokens from `/src/styles/theme.css`
- Responsive via Tailwind breakpoints
- No hardcoded colors or spacing

---

This pattern provides the essential first impression for all key pages and ensures users understand page context immediately.
