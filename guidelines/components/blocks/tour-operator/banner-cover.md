# Banner Cover Block

**Component:** `BannerCover.tsx`  
**WordPress Block:** `lsx/banner-cover`  
**Category:** tour-operator  
**Location:** `/src/app/components/blocks/tour-operator/BannerCover.tsx`

---

## Purpose

The **Banner Cover** block renders a full-width hero image or banner using a custom field image. It provides a visually impactful introduction to tour pages, destination pages, or accommodation pages. The banner typically spans the full viewport width and uses a background image with optional overlay text.

---

## WordPress Mapping

**Block Registration (PHP):**
```php
register_block_type(
  'lsx/banner-cover',
  array(
    'title' => __( 'Banner Cover', 'tour-operator' ),
    'description' => __( 'Display a full-width banner image', 'tour-operator' ),
    'category' => 'tour-operator',
    'icon' => 'cover-image',
    'attributes' => array(
      'imageUrl' => array(
        'type' => 'string',
        'default' => '',
      ),
      'height' => array(
        'type' => 'string',
        'default' => 'medium',
      ),
      'overlay' => array(
        'type' => 'boolean',
        'default' => false,
      ),
    ),
    'render_callback' => 'lsx_render_banner_cover',
  )
);
```

---

## Design System Requirements

### Colors
- ✅ Use `bg-background` for fallback background
- ✅ Use `bg-black/40` or `bg-black/60` for overlay (if enabled)
- ✅ Use `text-white` for overlay text (ensures contrast)
- ✅ No hardcoded colors - use semantic tokens

### Typography
- ✅ **Headings:** Lora font family
- ✅ **Body text:** Noto Sans font family
- ✅ Use `drop-shadow-lg` for text over images (readability)

### Spacing
- ✅ Full width: `w-full`
- ✅ Height options: `h-64` (small), `h-96` (medium), `h-[32rem]` (large), `h-screen` (full)
- ✅ Padding for overlay text: `p-8 md:p-12`

### Other
- ✅ Use `object-cover` for image scaling
- ✅ Use `relative` positioning for overlay
- ✅ Use `absolute inset-0` for overlay positioning

---

## Component Structure

### Props Interface

```typescript
interface BannerCoverProps {
  /** Image URL for the banner */
  imageUrl: string;
  /** Alt text for accessibility */
  altText?: string;
  /** Banner height preset */
  height?: 'small' | 'medium' | 'large' | 'full';
  /** Enable dark overlay */
  overlay?: boolean;
  /** Overlay opacity (0-100) */
  overlayOpacity?: number;
  /** Optional heading text */
  heading?: string;
  /** Optional subheading text */
  subheading?: string;
  /** Additional CSS classes */
  className?: string;
}
```

### Example Implementation

```tsx
export function BannerCover({
  imageUrl,
  altText = "Banner image",
  height = 'medium',
  overlay = false,
  overlayOpacity = 40,
  heading,
  subheading,
  className,
}: BannerCoverProps) {
  const heightClass = {
    small: 'h-64',
    medium: 'h-96',
    large: 'h-[32rem]',
    full: 'h-screen',
  }[height];

  return (
    <div className={cn("relative w-full overflow-hidden", heightClass, className)}>
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={altText}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity / 100 }}
        />
      )}

      {/* Content Overlay */}
      {(heading || subheading) && (
        <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
          <div className="text-center text-white">
            {heading && (
              <h1 className="mb-4 drop-shadow-lg">{heading}</h1>
            )}
            {subheading && (
              <p className="text-lg drop-shadow-lg">{subheading}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## Usage Examples

### Basic Banner (No Overlay)

```tsx
<BannerCover
  imageUrl="https://example.com/banner.jpg"
  altText="Kenya Safari Adventure"
  height="medium"
/>
```

### Banner with Overlay and Text

```tsx
<BannerCover
  imageUrl="https://example.com/banner.jpg"
  altText="Kenya Safari Adventure"
  height="large"
  overlay
  overlayOpacity={50}
  heading="Kenya Safari Adventure"
  subheading="Experience the wild beauty of Africa"
/>
```

### Full-Height Hero Banner

```tsx
<BannerCover
  imageUrl="https://example.com/hero.jpg"
  altText="Maasai Mara National Reserve"
  height="full"
  overlay
  overlayOpacity={40}
  heading="Maasai Mara National Reserve"
  subheading="Witness the Great Migration"
/>
```

### In Page Template

```tsx
// Tour Single Page
function TourSinglePage({ tour }) {
  return (
    <>
      <BannerCover
        imageUrl={tour.bannerImage}
        altText={tour.title}
        height="large"
        overlay
        heading={tour.title}
        subheading={tour.tagline}
      />
      
      {/* Rest of tour content */}
    </>
  );
}
```

---

## Accessibility

### Requirements
- ✅ **Alt text:** Always provide descriptive alt text
- ✅ **Color contrast:** Overlay text must meet WCAG AA (4.5:1 for normal text, 3:1 for large text)
- ✅ **Semantic HTML:** Use `<section>` or `<header>` as wrapper
- ✅ **Heading hierarchy:** If using heading, ensure it's the correct level

### Example with Semantic HTML

```tsx
<section
  className={cn("relative w-full overflow-hidden", heightClass)}
  aria-label="Page banner"
>
  <img
    src={imageUrl}
    alt={altText}
    className="absolute inset-0 h-full w-full object-cover"
    loading="lazy"
  />
  
  {/* Content */}
</section>
```

---

## Responsive Behavior

### Mobile (< 640px)
- Smaller height on mobile: `h-48 md:h-96`
- Reduce padding: `p-4 md:p-12`
- Smaller text: Use responsive font sizes

### Tablet (640px - 1024px)
- Medium height: `h-64 md:h-96`
- Moderate padding: `p-6 md:p-12`

### Desktop (> 1024px)
- Full specified height
- Full padding
- Large text for headings

### Example Responsive Implementation

```tsx
<div className="relative h-48 w-full overflow-hidden md:h-64 lg:h-96">
  <img
    src={imageUrl}
    alt={altText}
    className="absolute inset-0 h-full w-full object-cover"
  />
  
  <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8 lg:p-12">
    <div className="text-center text-white">
      <h1 className="text-3xl md:text-4xl lg:text-5xl drop-shadow-lg">
        {heading}
      </h1>
    </div>
  </div>
</div>
```

---

## Variants

### 1. Simple Banner (Image Only)
No overlay, no text. Pure visual impact.

```tsx
<BannerCover
  imageUrl={tour.bannerImage}
  altText={tour.title}
  height="medium"
/>
```

### 2. Overlay Banner (Dark Overlay)
Dark overlay for better text contrast.

```tsx
<BannerCover
  imageUrl={tour.bannerImage}
  altText={tour.title}
  height="large"
  overlay
  overlayOpacity={60}
/>
```

### 3. Hero Banner (Full Content)
Full-height with heading and subheading.

```tsx
<BannerCover
  imageUrl={tour.bannerImage}
  altText={tour.title}
  height="full"
  overlay
  overlayOpacity={50}
  heading={tour.title}
  subheading={tour.tagline}
/>
```

### 4. Gradient Overlay
Custom gradient instead of solid overlay.

```tsx
<div className="relative h-96 w-full overflow-hidden">
  <img
    src={imageUrl}
    alt={altText}
    className="absolute inset-0 h-full w-full object-cover"
  />
  
  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
  
  <div className="absolute inset-x-0 bottom-0 p-8">
    <h1 className="text-white drop-shadow-lg">{heading}</h1>
  </div>
</div>
```

---

## Performance Optimization

### Image Loading
```tsx
<img
  src={imageUrl}
  alt={altText}
  loading="lazy" // Lazy load for performance
  decoding="async" // Async decoding
  className="absolute inset-0 h-full w-full object-cover"
/>
```

### Responsive Images
```tsx
<img
  src={imageUrl}
  srcSet={`
    ${imageSmall} 640w,
    ${imageMedium} 1024w,
    ${imageLarge} 1920w
  `}
  sizes="100vw"
  alt={altText}
  className="absolute inset-0 h-full w-full object-cover"
/>
```

---

## Common Use Cases

### Tour Single Page Hero
```tsx
<BannerCover
  imageUrl={tour.heroImage}
  altText={tour.title}
  height="large"
  overlay
  heading={tour.title}
  subheading={`${tour.duration} • ${tour.price}`}
/>
```

### Destination Page Header
```tsx
<BannerCover
  imageUrl={destination.bannerImage}
  altText={destination.name}
  height="medium"
  overlay
  overlayOpacity={40}
  heading={destination.name}
  subheading={destination.country}
/>
```

### Archive Page Banner
```tsx
<BannerCover
  imageUrl="/images/tours-banner.jpg"
  altText="Browse Our Tours"
  height="small"
  overlay
  heading="Explore Our Tours"
  subheading="Discover your next adventure"
/>
```

---

## Testing Checklist

- [ ] Image loads correctly
- [ ] Alt text is descriptive
- [ ] Height presets work (small, medium, large, full)
- [ ] Overlay opacity adjusts correctly
- [ ] Text is readable over image (contrast)
- [ ] Responsive on mobile, tablet, desktop
- [ ] Works in light and dark modes
- [ ] Lazy loading works
- [ ] No layout shift on load
- [ ] Semantic HTML is correct

---

## Related Components

- **Hero Pattern** - `/src/app/components/patterns/Hero.tsx`
- **GroupBlock** - `/src/app/components/blocks/design/GroupBlock.tsx`
- **ImageGallery** - `/src/app/components/patterns/ImageGallery.tsx`

---

**Last Updated:** December 29, 2024  
**Status:** ✅ Implemented  
**WordPress Block:** `lsx/banner-cover`
