# Typography Design Tokens

**DEPRECATED:** This document describes the legacy typography system.
**Current System:** See [MODERN-TYPOGRAPHY.md](MODERN-TYPOGRAPHY.md) for the modern fluid typography system (v3.0).

**CRITICAL:**
- **NEVER hardcode font families** — Use only `var(--font-family-lora)`, `var(--font-family-noto-sans)`, or `var(--font-family-mono)`
- **NEVER use inline `style={{ fontSize: ... }}`** — All typography must be applied via CSS classes
- **NEVER use Tailwind text classes** (text-2xl, font-bold) unless intentionally deviating
- **ALWAYS use semantic HTML** (h1-h6, p) for automatic typography styling
- **Font families are defined in CSS** — Lora for headings, Noto Sans for body, Courier New for code/technical

---

## Migration Notice

**Date:** March 2026
**Status:** Legacy — Maintained for reference only
**Action Required:** Use the modern fluid typography system for all new development

The typography system has been upgraded to:
- H1-H6 complete hierarchy with fluid `clamp()` sizing (48px-96px for H1 at large desktop)
- Five font families: Lora (headings), Noto Sans (body/UI), Courier New (code/technical), Caveat (accent), Shadows Into Light (accent)
- Modern letter-spacing (tracking) for better readability
- Expanded font weight scale (300-700)
- Optimized line heights for all text types
- Better mobile-to-desktop scaling (320px to 1920px)

**[View Modern Typography System](MODERN-TYPOGRAPHY.md)**
**[View Breakpoints System](breakpoints.md)**

---

## Purpose

This document defines the **typography system** used throughout the LightSpeed Tour Operator plugin prototype. All typography tokens are defined in `/src/styles/theme.css`.

---

## Typography Philosophy

**Content-first, semantic HTML:** Use appropriate HTML elements (`<h1>`, `<p>`, etc.) to get correct typography automatically.

**No Tailwind size/weight classes:** Do NOT use `text-2xl`, `font-bold`, etc., unless explicitly overriding for a specific design need.

**System-driven:** Typography is controlled by CSS custom properties that can be updated globally.

---

## Font Families

### Primary Fonts

```css
--font-family-lora: 'Lora', serif;
--font-family-noto-sans: 'Noto Sans', sans-serif;
--font-family-mono: 'Courier New', monospace;
```

**Lora (Serif):**
- Used for: Headings (h1-h4), labels
- Character: Editorial, elegant, content-focused
- Loaded from Google Fonts

**Noto Sans (Sans-serif):**
- Used for: Body text, buttons, inputs
- Character: Clean, readable, modern
- Loaded from Google Fonts

**Courier New (Monospace):**
- Used for: Code snippets, technical text
- Character: Clear, precise, technical
- Loaded from system fonts

---

### Font Loading

Fonts are imported in `/src/styles/fonts.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=Noto+Sans:wght@400;500;600&display=swap');
```

**Weights Loaded:**
- 400 (Normal)
- 500 (Medium)
- 600 (Semibold)

---

## Font Sizes

### Size Scale

```css
--text-4xl: 60px;   /* h1 */
--text-2xl: 32px;   /* h2 */
--text-xl: 20px;    /* h3 */
--text-lg: 16px;    /* h4 */
--text-base: 16px;  /* p, label, button, input */
```

**Note:** All sizes are fixed (not fluid) in the current design system.

---

### Size Mapping

| Element      | CSS Variable  | Size  | Usage                          |
| ------------ | ------------- | ----- | ------------------------------ |
| `<h1>`       | `--text-4xl`  | 60px  | Page title, hero headline      |
| `<h2>`       | `--text-2xl`  | 32px  | Section heading                |
| `<h3>`       | `--text-xl`   | 20px  | Subsection heading             |
| `<h4>`       | `--text-lg`   | 16px  | Card title, minor heading      |
| `<p>`        | `--text-base` | 16px  | Body text, paragraphs          |
| `<label>`    | `--text-base` | 16px  | Form labels                    |
| `<button>`   | `--text-base` | 16px  | Button text                    |
| `<input>`    | `--text-base` | 16px  | Input fields                   |

---

## Font Weights

### Weight Scale

```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
```

---

### Weight Mapping

| Element      | Font Weight  | CSS Variable              | Usage               |
| ------------ | ------------ | ------------------------- | ------------------- |
| `<h1>`-`<h4>`| 600          | `--font-weight-semibold`  | All headings        |
| `<label>`    | 500          | `--font-weight-medium`    | Form labels         |
| `<button>`   | 500          | `--font-weight-medium`    | Button text         |
| `<p>`        | 400          | `--font-weight-normal`    | Body text           |
| `<input>`    | 400          | `--font-weight-normal`    | Input text          |

---

## Line Heights

### Line Height Scale

| Element      | Line Height | Calculated             | Usage                    |
| ------------ | ----------- | ---------------------- | ------------------------ |
| `<h1>`-`<h4>`| 1.25        | 1.25 × font-size       | Tight for headings       |
| `<p>`        | 1.5         | 1.5 × font-size        | Readable body text       |
| `<label>`    | 1.5         | 1.5 × font-size        | Form labels              |
| `<button>`   | 1.5         | 1.5 × font-size        | Button text              |
| `<input>`    | 1.5         | 1.5 × font-size        | Input fields             |

---

## Typography Rules

### Rule 1: Use Semantic HTML Elements

**✅ Good:**
```typescript
<h1>Explore Iceland</h1>
<h2>Popular Tours</h2>
<p>Discover the land of fire and ice...</p>
```

**❌ Bad:**
```typescript
<div className="text-4xl font-bold">Explore Iceland</div>
<div className="text-2xl font-semibold">Popular Tours</div>
<div className="text-base">Discover the land...</div>
```

**Why?** Semantic HTML gets correct typography automatically from theme.css.

---

### Rule 2: Do NOT Use Tailwind Typography Classes

**❌ Prohibited (unless specifically overriding):**
```typescript
className="text-2xl"       // Don't override font size
className="font-bold"      // Don't override font weight
className="leading-tight"  // Don't override line height
```

**Exception:** Only use when **intentionally deviating** from system defaults for a specific design requirement.

---

### Rule 3: One H1 Per Page

**✅ Good:**
```typescript
<PageLayout>
  <Hero>
    <h1>Tours</h1>  {/* Only H1 on page */}
  </Hero>
  <section>
    <h2>Featured Tours</h2>
    <h2>Popular Destinations</h2>
  </section>
</PageLayout>
```

**❌ Bad:**
```typescript
<PageLayout>
  <h1>Tours</h1>
  <section>
    <h1>Featured</h1>  {/* Second H1 - prohibited */}
  </section>
</PageLayout>
```

---

### Rule 4: Logical Heading Hierarchy

**✅ Good:**
```typescript
<h1>Iceland Tours</h1>
  <h2>Overview</h2>
    <h3>Highlights</h3>
    <h3>Itinerary</h3>
  <h2>Related Tours</h2>
    <h3>Similar Destinations</h3>
```

**❌ Bad:**
```typescript
<h1>Iceland Tours</h1>
  <h3>Overview</h3>  {/* Skipped H2 */}
  <h2>Related Tours</h2>
```

---

## Typography by Component

### Hero Component

```typescript
<Hero title="Explore Iceland" excerpt="...">
  {/* title renders as: */}
  <h1>Explore Iceland</h1>  {/* 60px, Lora, 600, 1.25 */}
  
  {/* excerpt renders as: */}
  <p>...</p>  {/* 16px, Noto Sans, 400, 1.5 */}
</Hero>
```

---

### Archive Header

```typescript
<ArchiveHeader title="Adventure Tours" description="...">
  {/* title renders as: */}
  <h1>Adventure Tours</h1>  {/* 60px, Lora, 600, 1.25 */}
  
  {/* description renders as: */}
  <p>...</p>  {/* 16px, Noto Sans, 400, 1.5 */}
</ArchiveHeader>
```

---

### Card Components

```typescript
<TourCard tour={tour}>
  {/* Tour title renders as: */}
  <h3>{tour.title}</h3>  {/* 20px, Lora, 600, 1.25 */}
  
  {/* Excerpt renders as: */}
  <p>{tour.excerpt}</p>  {/* 16px, Noto Sans, 400, 1.5 */}
</TourCard>
```

---

### Editorial Content

```typescript
<EditorialContent content="...">
  {/* Headings: */}
  <h2>Section Title</h2>      {/* 32px, Lora, 600, 1.25 */}
  <h3>Subsection</h3>          {/* 20px, Lora, 600, 1.25 */}
  
  {/* Body: */}
  <p>Paragraph text...</p>     {/* 16px, Noto Sans, 400, 1.5 */}
  
  {/* Lists: */}
  <ul>
    <li>List item</li>         {/* Inherits from parent */}
  </ul>
</EditorialContent>
```

---

### Fast Facts

```typescript
<FastFacts facts={facts}>
  {/* Labels use: */}
  <label>Duration</label>      {/* 16px, Lora, 500, 1.5 */}
  
  {/* Values use: */}
  <p>8 days</p>                {/* 16px, Noto Sans, 400, 1.5 */}
</FastFacts>
```

---

### Buttons

```typescript
<button>Book Now</button>      {/* 16px, Noto Sans, 500, 1.5 */}
```

---

### Form Inputs

```typescript
<label>Email</label>           {/* 16px, Lora, 500, 1.5 */}
<input type="email" />         {/* 16px, Noto Sans, 400, 1.5 */}
```

---

## Custom Typography Overrides

### When to Override

**Allowed scenarios:**
1. Small print / legal text (use smaller size)
2. Feature numbers / stats (use larger size)
3. Emphasized callouts (use different weight)

**How to override:**
```typescript
// Small print
<p className="text-sm text-muted-foreground">
  Terms and conditions apply
</p>

// Feature stat
<div className="text-6xl font-bold text-primary">
  500+
</div>

// Emphasized text
<p className="font-medium">
  Important notice
</p>
```

---

## Responsive Typography

**Current system:** Typography is **NOT fluid**. All sizes are fixed.

**Future consideration:** If fluid typography is needed:

```css
/* Example fluid scale (not implemented) */
--text-4xl: clamp(36px, 5vw, 60px);
--text-2xl: clamp(24px, 3vw, 32px);
```

---

## WordPress 6.9 "Fit Text" Feature

**NEW in WordPress 6.9:** The "Fit text to container" feature enables high-impact, responsive text that automatically adjusts font size to fill its parent container width perfectly.

### Overview

The Fit Text feature is designed for creating standout moments in your design:
- **Hero headlines** - Large, impactful page titles
- **Banners** - Eye-catching promotional sections
- **Callouts** - Attention-grabbing announcements
- **Featured quotes** - Pull quotes and testimonials

### How It Works

When enabled, text automatically scales to fill 100% of its container width:
- No manual font size adjustments needed
- No responsive breakpoint tweaks required
- Text adapts dynamically to viewport changes
- Clean, instant design transformation

### WordPress Block Support

Initially available for:
- **Paragraph blocks** (`core/paragraph`)
- **Heading blocks** (`core/heading`)

### React Implementation

In this prototype, implement "Fit Text" using CSS container queries or viewport-based scaling:

```typescript
// Example: Hero headline with fit-text behavior
<div className="fit-text-container">
  <h1 className="fit-text">
    Explore Iceland
  </h1>
</div>
```

**CSS Implementation:**

```css
/* Fit text container */
.fit-text-container {
  container-type: inline-size;
  width: 100%;
}

/* Fit text scaling */
.fit-text {
  font-family: var(--font-family-lora);
  font-weight: var(--font-weight-semibold);
  line-height: 1.1;
  /* Dynamic scaling using container query units */
  font-size: clamp(2rem, 10cqi, 12rem);
  /* Or viewport-based */
  font-size: clamp(2rem, 8vw, 12rem);
  width: 100%;
  text-align: center;
}
```

### Usage Guidelines

**✅ Good use cases:**
- Hero section main headlines
- Section intro banners
- Feature callout boxes
- Promotional overlays
- Landing page titles

**❌ Avoid for:**
- Body text (readability issues)
- Long paragraphs (too large)
- Navigation elements (inconsistent)
- Form labels (unpredictable sizing)
- Card titles in grids (layout breaks)

### Implementation Pattern

```typescript
// Hero with fit-text headline
<Hero>
  <div className="fit-text-container max-w-4xl mx-auto">
    <h1 className="fit-text">
      Discover the Land of Fire and Ice
    </h1>
  </div>
  <p className="text-center mt-4">
    {/* Normal paragraph - NOT fit-text */}
    Experience Iceland's breathtaking landscapes
  </p>
</Hero>
```

### Design System Integration

Fit Text works alongside the typography system:
- Uses same font families (`--font-family-lora`, `--font-family-noto-sans`)
- Uses same font weights (`--font-weight-semibold`)
- Overrides font-size with dynamic scaling
- Maintains line-height for readability

### Accessibility Considerations

When using Fit Text:
1. **Maintain contrast ratios** - Ensure WCAG 2.1 AA compliance
2. **Limit line length** - Max 60-80 characters for readability
3. **Set minimum sizes** - Use `clamp()` to prevent too-small text
4. **Test at all viewports** - Ensure legibility on mobile
5. **Avoid on critical content** - Don't use for essential information that must be immediately readable

---

## Typography CSS Implementation

From `/src/styles/theme.css`:

```css
@layer base {
  :where(:not(:has([class*=" text-"]), :not(:has([class^="text-\"])))) {
    h1 {
      font-family: var(--font-family-lora);
      font-size: var(--text-4xl);
      font-weight: var(--font-weight-semibold);
      line-height: 1.25;
    }

    h2 {
      font-family: var(--font-family-lora);
      font-size: var(--text-2xl);
      font-weight: var(--font-weight-semibold);
      line-height: 1.25;
    }

    h3 {
      font-family: var(--font-family-lora);
      font-size: var(--text-xl);
      font-weight: var(--font-weight-semibold);
      line-height: 1.25;
    }

    h4 {
      font-family: var(--font-family-lora);
      font-size: var(--text-lg);
      font-weight: var(--font-weight-semibold);
      line-height: 1.25;
    }

    p {
      font-family: var(--font-family-noto-sans);
      font-size: var(--text-base);
      font-weight: var(--font-weight-normal);
      line-height: 1.5;
    }

    label {
      font-family: var(--font-family-lora);
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    button {
      font-family: var(--font-family-noto-sans);
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    input {
      font-family: var(--font-family-noto-sans);
      font-size: var(--text-base);
      font-weight: var(--font-weight-normal);
      line-height: 1.5;
    }
  }
}
```

**Note:** The selector prevents typography from applying when Tailwind text classes are present.

---

## Typography Accessibility

### 1. Minimum Font Size

- Body text: **16px** (meets WCAG guidelines)
- Small text: **14px** minimum (use sparingly)

### 2. Line Height

- Body text: **1.5** (optimal readability)
- Headings: **1.25** (tighter for visual impact)

### 3. Contrast

All text must meet WCAG 2.1 AA contrast ratios:
- Normal text (16px): **4.5:1**
- Large text (18px+): **3:1**

### 4. Font Weights

- Avoid font weights below 400 (too thin)
- Maximum weight: 600 (higher weights may reduce readability)

---

## Typography Quick Reference

```typescript
// Headings (automatic)
<h1>Page Title</h1>           // 60px, Lora, 600
<h2>Section</h2>               // 32px, Lora, 600
<h3>Subsection</h3>            // 20px, Lora, 600
<h4>Minor Heading</h4>         // 16px, Lora, 600

// Body (automatic)
<p>Body text</p>               // 16px, Noto Sans, 400

// Forms (automatic)
<label>Label</label>           // 16px, Lora, 500
<input type="text" />          // 16px, Noto Sans, 400

// Buttons (automatic)
<button>Action</button>        // 16px, Noto Sans, 500

// Overrides (when needed)
<p className="text-sm">Small</p>                      // 14px
<p className="text-muted-foreground">Muted</p>        // Color only
<p className="font-medium">Medium weight</p>          // 500 weight
```

---

## Related Documentation

- [design-tokens/colors.md](colors.md) - Color tokens for text
- [design-tokens/spacing.md](spacing.md) - Spacing tokens
- [overview-components.md](../overview-components.md) - Component usage
- [components/Hero.md](../components/Hero.md) - Hero typography
- [components/EditorialContent.md](../components/EditorialContent.md) - Content typography