# Mobile Typography Guidelines

## Purpose

This document defines **mobile-specific typography rules** to ensure readability and accessibility on small screens for the LightSpeed Tour Operator plugin prototype.

---

## Core Mobile Typography Principles

### 1. Minimum Font Size Rule

**CRITICAL:** Never use font sizes smaller than 16px on mobile devices.

**Why:** Font sizes below 16px trigger iOS Safari's auto-zoom on form inputs, causing a jarring user experience.

**Enforcement:**
```css
/* Mobile base font size */
@media (max-width: 767px) {
  html {
    font-size: 16px; /* Never smaller */
  }
}
```

---

## Mobile Typography Scale

### Heading Adjustments

Mobile screens require **smaller heading sizes** compared to desktop:

| Element | Desktop Size | Mobile Size | Tailwind Override |
|---------|--------------|-------------|-------------------|
| H1 | 60px (`--text-4xl`) | 36px | `text-[36px] md:text-[60px]` |
| H2 | 32px (`--text-2xl`) | 24px | `text-[24px] md:text-[32px]` |
| H3 | 20px (`--text-xl`) | 18px | `text-[18px] md:text-[20px]` |
| H4 | 16px (`--text-lg`) | 16px | No override needed |

**Note:** Only override when the default heading size is too large for mobile context.

---

### Body Text Sizing

| Element | Size | Usage |
|---------|------|-------|
| Paragraph | 16px | Body text (default) |
| Small text | 14px | Metadata, captions (use sparingly) |
| Label | 16px | Form labels, button text |

**✅ Good:**
```typescript
// Default paragraph - no size override
<p>This text is readable on mobile</p>

// Small metadata
<span className="text-sm text-muted-foreground">
  8 days / 7 nights
</span>
```

**❌ Bad:**
```typescript
// Too small for mobile
<p className="text-xs">Hard to read</p>

// Triggers iOS auto-zoom
<input className="text-sm" />
```

---

## Line Height Adjustments

### Mobile Line Heights

Increased line height improves readability on small screens:

| Element | Desktop | Mobile | Tailwind Class |
|---------|---------|--------|----------------|
| Headings | 1.25 | 1.3 | `leading-tight md:leading-tight` |
| Body text | 1.5 | 1.6 | `leading-relaxed md:leading-normal` |
| Small text | 1.5 | 1.5 | `leading-normal` |

**Example:**
```typescript
<p className="leading-relaxed md:leading-normal">
  Mobile gets slightly more line height for better readability
</p>
```

---

## Mobile Typography Patterns

### 1. Hero Headings

**Desktop:**
```typescript
<h1 className="text-[60px] font-semibold leading-tight">
  Explore Iceland
</h1>
```

**Mobile-Optimized:**
```typescript
<h1 className="text-[36px] md:text-[60px] font-semibold leading-tight">
  Explore Iceland
</h1>
```

---

### 2. Card Headings

**Desktop:**
```typescript
<h3 className="text-[20px] font-semibold">
  Northern Lights Adventure
</h3>
```

**Mobile-Optimized:**
```typescript
<h3 className="text-[18px] md:text-[20px] font-semibold">
  Northern Lights Adventure
</h3>
```

---

### 3. Body Content

**Default (works on all screens):**
```typescript
<p className="leading-relaxed">
  Discover the land of fire and ice on this unforgettable 8-day journey...
</p>
```

---

### 4. Metadata Text

**Minimum 14px for readability:**
```typescript
<div className="flex items-center gap-2 text-sm text-muted-foreground">
  <Calendar className="w-4 h-4" />
  <span>8 days</span>
</div>
```

---

### 5. Button Text

**Always 16px minimum:**
```typescript
<button className="px-4 py-2 rounded-md bg-primary text-primary-foreground">
  Book Now
</button>
```

**Font automatically inherits from theme.css:**
```css
button {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base); /* 16px */
  font-weight: var(--font-weight-medium);
}
```

---

## Form Input Typography

### Input Font Size

**CRITICAL:** All form inputs must be 16px or larger to prevent iOS auto-zoom.

**✅ Good:**
```typescript
<input
  type="text"
  className="px-3 py-2 border border-border rounded-md"
  placeholder="Your name"
/>
```

**❌ Bad:**
```typescript
<input
  type="text"
  className="text-sm px-3 py-2"  // Will trigger zoom
  placeholder="Your name"
/>
```

---

### Label Typography

**Always 16px for consistency:**
```typescript
<label htmlFor="email" className="block mb-2">
  Email Address
</label>
```

---

### Placeholder Text

**Inherits input size (16px):**
```typescript
<input
  type="email"
  placeholder="you@example.com"
  className="px-3 py-2"
/>
```

---

## Touch Target Considerations

### Readable Link Text

Links must be large enough for comfortable tapping:

**✅ Good:**
```typescript
<a href="/tours" className="block py-3 px-4">
  View All Tours
</a>
```

**❌ Bad:**
```typescript
<a href="/tours" className="text-xs py-1">
  View Tours
</a>
```

---

### Icon + Text Buttons

Combine icons with text labels on mobile:

**✅ Good:**
```typescript
<button className="flex items-center gap-2 px-4 py-3">
  <Search className="w-5 h-5" />
  <span>Search</span>
</button>
```

**❌ Bad:**
```typescript
<button className="p-2">
  <Search className="w-4 h-4" />
  {/* Icon only - no text label */}
</button>
```

---

## Responsive Typography Utilities

### Font Size Breakpoints

Use Tailwind responsive prefixes for font size adjustments:

```typescript
<h1 className="text-[36px] md:text-[48px] lg:text-[60px]">
  Responsive heading
</h1>
```

**Breakpoints:**
- Default (no prefix): 0px - 767px (mobile)
- `md:`: 768px+ (tablet)
- `lg:`: 1024px+ (desktop)
- `xl:`: 1280px+ (wide)

---

### Line Height Breakpoints

```typescript
<p className="leading-relaxed md:leading-normal">
  More line height on mobile for readability
</p>
```

---

### Text Alignment

Center text on mobile, left-align on desktop:

```typescript
<h2 className="text-center md:text-left">
  Section Heading
</h2>
```

---

## Truncation & Overflow

### Long Text Handling

**Single line truncation:**
```typescript
<h3 className="truncate">
  Very Long Tour Name That Should Truncate
</h3>
```

**Multi-line truncation (2 lines):**
```typescript
<p className="line-clamp-2">
  Long description that will show only 2 lines with ellipsis...
</p>
```

**Multi-line truncation (3 lines):**
```typescript
<p className="line-clamp-3">
  Longer description that will show only 3 lines with ellipsis...
</p>
```

---

## Accessibility Requirements

### 1. Minimum Contrast

All text must meet WCAG AA contrast ratios:
- **Normal text (16px):** 4.5:1 minimum
- **Large text (18px+ or 14px+ bold):** 3:1 minimum

---

### 2. Scalable Text

Never prevent text scaling:

**✅ Good:**
```css
html {
  font-size: 16px; /* Base size, can scale */
}
```

**❌ Bad:**
```css
html {
  font-size: 16px;
  -webkit-text-size-adjust: 100%; /* Prevents scaling */
}
```

---

### 3. Line Length

Optimal line length for mobile: **35-50 characters** (generally automatic with Container component).

---

## Common Mobile Typography Patterns

### 1. Hero Section

```typescript
<section className="py-12 md:py-20">
  <Container>
    <h1 className="text-[36px] md:text-[60px] font-semibold leading-tight mb-4">
      Explore Iceland
    </h1>
    <p className="text-lg md:text-xl leading-relaxed mb-6">
      Discover the land of fire and ice
    </p>
    <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md">
      View Tours
    </button>
  </Container>
</section>
```

---

### 2. Card Meta

```typescript
<div className="flex flex-col gap-2 text-sm text-muted-foreground">
  <div className="flex items-center gap-2">
    <MapPin className="w-4 h-4" />
    <span>Iceland</span>
  </div>
  <div className="flex items-center gap-2">
    <Calendar className="w-4 h-4" />
    <span>8 days / 7 nights</span>
  </div>
</div>
```

---

### 3. Editorial Content

```typescript
<article className="prose prose-sm md:prose-base max-w-none">
  <h2>About This Tour</h2>
  <p className="leading-relaxed">
    Experience the breathtaking beauty of Iceland's landscapes...
  </p>
</article>
```

---

### 4. Mobile Navigation

```typescript
<nav className="md:hidden">
  <button className="flex items-center gap-2 py-3 px-4 w-full">
    <Menu className="w-5 h-5" />
    <span>Menu</span>
  </button>
</nav>
```

---

## Performance Considerations

### Font Loading

Ensure web fonts load quickly on mobile:

```css
/* fonts.css */
@font-face {
  font-family: 'Lora';
  src: url('/fonts/lora.woff2') format('woff2');
  font-display: swap; /* Show fallback immediately */
}
```

---

### System Font Fallbacks

```css
--font-family-lora: 'Lora', Georgia, serif;
--font-family-noto-sans: 'Noto Sans', -apple-system, BlinkMacSystemFont, sans-serif;
```

---

## Testing Checklist

- [ ] All body text is 16px minimum
- [ ] All form inputs are 16px minimum
- [ ] Headings scale appropriately on mobile
- [ ] Line heights provide comfortable reading
- [ ] Text doesn't require horizontal scrolling
- [ ] Links have adequate touch targets (44px minimum)
- [ ] Text maintains contrast in light and dark modes
- [ ] Long text truncates gracefully
- [ ] Font loading doesn't cause layout shift

---

## Related Documentation

- [mobile/forms.md](forms.md) - Mobile form patterns
- [mobile/touch-targets.md](touch-targets.md) - Touch target sizing
- [design-tokens/typography.md](../design-tokens/typography.md) - Typography system
- [mobile/spacing.md](spacing.md) - Mobile spacing patterns
