# Modern Fluid Typography System

**Version:** 3.0 — March 2026
**Status:** Production Ready
**Source of Truth:** `/src/styles/theme-base.css`

---

## Overview

This document defines the **modern fluid typography system** for the LightSpeed Tour Operator plugin prototype. All type sizes use `clamp()` for smooth, breakpoint-free responsive scaling between **320px** (mobile) and **1920px** (large desktop).

---

## Key Principles

### 1. Clamp-First Scaling
- All font sizes use `clamp(min, preferred, max)` for fluid viewport-responsive sizing
- Smooth transitions across all viewport widths — no breakpoint jumps
- Media queries are reserved for **structural layout changes** only (grid columns, nav switches)

### 2. Five Font Families Only
Only these five font stacks are permitted in this project:

| Variable | Stack | Usage |
|----------|-------|-------|
| `var(--font-family-lora)` | `'Lora', Georgia, 'Times New Roman', serif` | Headings (H1-H6), labels, blockquotes, editorial |
| `var(--font-family-noto-sans)` | `'Noto Sans', Arial, Helvetica, sans-serif` | Body text, paragraphs, buttons, inputs, UI elements |
| `var(--font-family-mono)` | `'Courier New', Courier, monospace` | Code blocks, technical values (booking IDs, reference codes) |
| `var(--font-family-caveat)` | `'Caveat', 'Brush Script MT', cursive` | Hand-drawn accents, organic flourishes, decorative microcopy |
| `var(--font-family-shadows)` | `'Shadows Into Light', 'Comic Sans MS', cursive` | Alternative hand-drawn accent script |

**NO OTHER FONTS ARE ALLOWED.**

### 3. Proper Hierarchy
- Complete H1-H6 heading scale with clear visual distinction
- H1 targets up to **96px** at large desktop (per Q&A decision #1)
- Consistent spacing and rhythm

### 4. Accessibility First
- WCAG 2.1 AA compliant minimum sizes
- Minimum 16px body text (1rem)
- Readable line heights (1.5 minimum for body)
- Sufficient contrast ratios

---

## Typography Scale (Source of Truth)

These are the **exact values** from `/src/styles/theme-base.css`:

### Heading Scale

```css
/* H1 — Primary page title */
--text-6xl: clamp(3rem, 6vw + 1rem, 6rem);         /* 48px -> 96px */

/* Hero / Display — Special large text */
--text-5xl: clamp(2.5rem, 5vw + 1rem, 5rem);       /* 40px -> 80px */

/* H2 — Major section heading */
--text-4xl: clamp(2rem, 4vw + 0.5rem, 4rem);       /* 32px -> 64px */

/* H3 — Subsection heading */
--text-3xl: clamp(1.75rem, 3vw + 0.5rem, 3rem);    /* 28px -> 48px */

/* H4 — Minor heading */
--text-2xl: clamp(1.5rem, 2vw + 0.5rem, 2.25rem);  /* 24px -> 36px */

/* H5 — Small heading */
--text-xl:  clamp(1.125rem, 1.5vw + 0.25rem, 1.75rem); /* ~18px -> 28px */

/* H6 — Smallest heading */
--text-lg:  clamp(1.125rem, 1vw + 0.125rem, 1.5rem);   /* 18px -> 24px */
```

### Body Scale

```css
/* Body text — Primary content */
--text-base: clamp(1rem, 0.4vw + 0.9rem, 1.25rem);     /* 16px -> 20px */

/* Small text — Captions, metadata */
--text-sm:   clamp(0.875rem, 0.3vw + 0.8rem, 1.125rem); /* 14px -> 18px */

/* Tiny text — Labels, fine print */
--text-xs:   clamp(0.75rem, 0.2vw + 0.7rem, 1rem);      /* 12px -> 16px */

/* Micro text — View counters, timestamps, fine detail */
--text-2xs:  clamp(0.625rem, 0.15vw + 0.55rem, 0.75rem); /* 10px -> 12px */
```

### Responsive Behaviour Summary

| Token | Variable | Mobile (320px) | Tablet (768px) | Desktop (1440px) | Large (1920px) |
|-------|----------|----------------|----------------|------------------|----------------|
| H1 | `--text-6xl` | 48px | ~65px | ~91px | 96px |
| Hero | `--text-5xl` | 40px | ~54px | ~77px | 80px |
| H2 | `--text-4xl` | 32px | ~43px | ~62px | 64px |
| H3 | `--text-3xl` | 28px | ~37px | ~47px | 48px |
| H4 | `--text-2xl` | 24px | ~28px | ~33px | 36px |
| H5 | `--text-xl` | ~18px | ~22px | ~26px | 28px |
| H6 | `--text-lg` | 18px | ~20px | ~23px | 24px |
| Body | `--text-base` | 16px | ~17px | ~19px | 20px |
| Small | `--text-sm` | 14px | ~15px | ~17px | 18px |
| Tiny | `--text-xs` | 12px | ~13px | ~15px | 16px |
| Micro | `--text-2xs` | 10px | ~11px | ~11px | 12px |

---

## Font Weights

Complete professional scale from `/src/styles/theme-base.css`:

```css
--font-weight-light:    300;   /* Light emphasis (use sparingly) */
--font-weight-normal:   400;   /* Body text, paragraphs */
--font-weight-medium:   500;   /* Buttons, labels, H4-H6 */
--font-weight-semibold: 600;   /* H2-H3, strong emphasis */
--font-weight-bold:     700;   /* H1, maximum impact */
```

### Weight Mapping

| Element | Weight | Variable | Rationale |
|---------|--------|----------|-----------|
| H1 | 700 (Bold) | `--font-weight-bold` | Maximum visual impact |
| H2-H3 | 600 (Semibold) | `--font-weight-semibold` | Strong hierarchy |
| H4-H6 | 500 (Medium) | `--font-weight-medium` | Modern, clean appearance |
| Labels | 500 (Medium) | `--font-weight-medium` | UI emphasis |
| Buttons | 500 (Medium) | `--font-weight-medium` | Clickable clarity |
| Body/p | 400 (Normal) | `--font-weight-normal` | Optimal readability |
| `<strong>`, `<b>` | 600 (Semibold) | `--font-weight-semibold` | Emphasis within text |

---

## Line Heights (Leading)

From `/src/styles/theme-base.css`:

```css
--leading-tight:   1.2;     /* Headings (H1-H2) */
--leading-snug:    1.375;   /* Sub-headings (H3-H5) */
--leading-normal:  1.5;     /* Body text, H6 */
--leading-relaxed: 1.625;   /* Long-form / editorial content */
--leading-loose:   1.75;    /* Spacious / airy layouts */
```

### Usage Guidelines

| Line Height | When to Use | Example |
|-------------|-------------|---------|
| `tight` (1.2) | Large headings (H1-H2) | Page titles, hero headlines |
| `snug` (1.375) | Medium headings (H3-H5) | Section titles, card headings |
| `normal` (1.5) | Body text, small headings | Paragraphs, descriptions, H6 |
| `relaxed` (1.625) | Editorial content | Blog posts, long articles |
| `loose` (1.75) | Special layouts | Quotes, featured content |

---

## Letter Spacing (Tracking)

From `/src/styles/theme-base.css`:

```css
--tracking-tighter: -0.05em;  /* Large display headings (H1) */
--tracking-tight:   -0.025em; /* H2-H3 headings */
--tracking-normal:  0em;       /* Body text, H4-H6 */
--tracking-wide:    0.025em;   /* Labels, small caps */
--tracking-wider:   0.05em;    /* All-caps, eyebrow text */
```

### Usage Guidelines

| Tracking | When to Use | Why |
|----------|-------------|-----|
| `tighter` (-0.05em) | H1, large display text | Improves readability at large sizes |
| `tight` (-0.025em) | H2, H3 | Subtle tightening for emphasis |
| `normal` (0em) | Body text, H4-H6 | Standard spacing |
| `wide` (0.025em) | Labels, small UI text | Improves legibility for small text |
| `wider` (0.05em) | ALL CAPS text | Essential for uppercase readability |

---

## Complete Semantic HTML Mapping

The design system automatically styles bare HTML elements via `theme.css @layer base`. **Do NOT add Tailwind size/weight classes to these elements** — override only when a specific deviation is intentional.

### H1 — Page Title

```css
h1 {
  font-family: var(--font-family-lora);
  font-size: var(--text-6xl);           /* 48px -> 96px */
  font-weight: var(--font-weight-bold); /* 700 */
  line-height: var(--leading-tight);    /* 1.2 */
  letter-spacing: var(--tracking-tighter); /* -0.05em */
  margin-bottom: 1.5rem;
}
```

### H2 — Section Heading

```css
h2 {
  font-family: var(--font-family-lora);
  font-size: var(--text-4xl);               /* 32px -> 64px */
  font-weight: var(--font-weight-semibold); /* 600 */
  line-height: var(--leading-tight);        /* 1.2 */
  letter-spacing: var(--tracking-tight);    /* -0.025em */
  margin-bottom: 1.25rem;
}
```

### H3 — Subsection Heading

```css
h3 {
  font-family: var(--font-family-lora);
  font-size: var(--text-3xl);               /* 28px -> 48px */
  font-weight: var(--font-weight-semibold); /* 600 */
  line-height: var(--leading-snug);         /* 1.375 */
  letter-spacing: var(--tracking-tight);    /* -0.025em */
  margin-bottom: 1rem;
}
```

### H4 — Card / Block Heading

```css
h4 {
  font-family: var(--font-family-lora);
  font-size: var(--text-2xl);             /* 24px -> 36px */
  font-weight: var(--font-weight-medium); /* 500 */
  line-height: var(--leading-snug);       /* 1.375 */
  letter-spacing: var(--tracking-normal); /* 0em */
  margin-bottom: 0.75rem;
}
```

### H5 — Minor Heading

```css
h5 {
  font-family: var(--font-family-lora);
  font-size: var(--text-xl);              /* ~18px -> 28px */
  font-weight: var(--font-weight-medium); /* 500 */
  line-height: var(--leading-snug);       /* 1.375 */
  letter-spacing: var(--tracking-normal); /* 0em */
  margin-bottom: 0.5rem;
}
```

### H6 — Smallest Heading

```css
h6 {
  font-family: var(--font-family-lora);
  font-size: var(--text-lg);              /* 18px -> 24px */
  font-weight: var(--font-weight-medium); /* 500 */
  line-height: var(--leading-normal);     /* 1.5 */
  letter-spacing: var(--tracking-normal); /* 0em */
  margin-bottom: 0.5rem;
}
```

### Paragraph

```css
p {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);             /* 16px -> 20px */
  font-weight: var(--font-weight-normal);  /* 400 */
  line-height: var(--leading-normal);      /* 1.5 */
  letter-spacing: var(--tracking-normal);  /* 0em */
  margin-bottom: 1rem;
}
```

### Label

```css
label {
  font-family: var(--font-family-lora);
  font-size: var(--text-base);             /* 16px -> 20px */
  font-weight: var(--font-weight-medium);  /* 500 */
  line-height: var(--leading-normal);      /* 1.5 */
}
```

### Button

```css
button {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);             /* 16px -> 20px */
  font-weight: var(--font-weight-medium);  /* 500 */
  line-height: var(--leading-normal);      /* 1.5 */
}
```

### Blockquote

```css
blockquote {
  font-family: var(--font-family-lora);
  font-size: var(--text-xl);              /* ~18px -> 28px */
  font-weight: var(--font-weight-normal); /* 400 */
  font-style: italic;
  line-height: var(--leading-relaxed);    /* 1.625 */
  border-left: 4px solid var(--primary);
  padding-left: 1.5rem;
}
```

### Code

```css
code {
  font-family: var(--font-family-mono);
  font-size: 0.9em;
  background-color: var(--muted);
  color: var(--foreground);
  padding: 0.125rem 0.25rem;
  border-radius: var(--radius-sm);
}
```

---

## WordPress Preset Mapping

From `/src/styles/theme-variables.css`:

```css
--wp--preset--font-size--small:     var(--text-sm);    /* 14px -> 18px */
--wp--preset--font-size--medium:    var(--text-base);  /* 16px -> 20px */
--wp--preset--font-size--large:     var(--text-lg);    /* 18px -> 24px */
--wp--preset--font-size--x-large:   var(--text-xl);    /* ~18px -> 28px */
--wp--preset--font-size--xx-large:  var(--text-2xl);   /* 24px -> 36px */
--wp--preset--font-size--heading-3: var(--text-3xl);   /* 28px -> 48px */
--wp--preset--font-size--heading-2: var(--text-4xl);   /* 32px -> 64px */
--wp--preset--font-size--heading-1: var(--text-6xl);   /* 48px -> 96px */

--wp--preset--font-family--lora:      var(--font-family-lora);
--wp--preset--font-family--noto-sans: var(--font-family-noto-sans);
--wp--preset--font-family--mono:      var(--font-family-mono);
```

---

## Fluid Utility Classes

From `theme.css @layer utilities`:

```css
.text-fluid-6xl  { font-size: var(--text-6xl); }
.text-fluid-5xl  { font-size: var(--text-5xl); }
.text-fluid-4xl  { font-size: var(--text-4xl); }
.text-fluid-3xl  { font-size: var(--text-3xl); }
.text-fluid-2xl  { font-size: var(--text-2xl); }
.text-fluid-xl   { font-size: var(--text-xl);  }
.text-fluid-lg   { font-size: var(--text-lg);  }
.text-fluid-base { font-size: var(--text-base);}
.text-fluid-sm   { font-size: var(--text-sm);  }
.text-fluid-xs   { font-size: var(--text-xs);  }
.text-fluid-2xs  { font-size: var(--text-2xs); }
```

Use these when you need to explicitly set a fluid size on an element that doesn't receive it from semantic HTML defaults.

---

## Optimal Reading Width

```css
max-width: 65ch; /* 65 characters per line — optimal readability */
```

- Ideal line length: 45-75 characters
- Blog/article content: 55-70 characters
- Mobile: full width with appropriate horizontal padding

---

## Usage Rules

### Rule 1: Use Semantic HTML

Let the design system do the work:

```html
<!-- Correct: Automatic typography from theme.css -->
<h1>Explore Iceland's Natural Wonders</h1>
<h2>Popular Tours</h2>
<p>Discover the land of fire and ice...</p>
```

```html
<!-- WRONG: Unnecessary Tailwind overrides -->
<div class="text-4xl font-bold">Explore Iceland</div>
```

### Rule 2: One H1 Per Page

Every page must have exactly one `<h1>`. Use `<h2>` through `<h6>` for subsections.

### Rule 3: No Skipped Heading Levels

```html
<!-- Correct -->
<h1>Page Title</h1>
  <h2>Section</h2>
    <h3>Subsection</h3>

<!-- WRONG: Skipped H2 -->
<h1>Page Title</h1>
  <h3>Section</h3>
```

### Rule 4: Don't Override Unless Intentional

Only use Tailwind text classes when **intentionally deviating** from defaults:

```tsx
// Allowed: intentional small print
<p className="text-fluid-sm text-muted-foreground">Terms apply</p>

// Allowed: feature stat number
<span className="text-fluid-6xl">500+</span>
```

---

## Migration from Old System

### Old Fixed Sizes (Deprecated)

```css
/* OLD — Do NOT use */
--text-4xl: 60px;
--text-2xl: 32px;
--text-xl: 20px;
--text-lg: 16px;
```

### New Fluid Sizes (Current — from theme-base.css)

```css
/* CURRENT — Use these */
--text-6xl: clamp(3rem, 6vw + 1rem, 6rem);
--text-5xl: clamp(2.5rem, 5vw + 1rem, 5rem);
--text-4xl: clamp(2rem, 4vw + 0.5rem, 4rem);
--text-3xl: clamp(1.75rem, 3vw + 0.5rem, 3rem);
--text-2xl: clamp(1.5rem, 2vw + 0.5rem, 2.25rem);
--text-xl:  clamp(1.125rem, 1.5vw + 0.25rem, 1.75rem);
--text-lg:  clamp(1.125rem, 1vw + 0.125rem, 1.5rem);
--text-base: clamp(1rem, 0.4vw + 0.9rem, 1.25rem);
--text-sm:  clamp(0.875rem, 0.3vw + 0.8rem, 1.125rem);
--text-xs:  clamp(0.75rem, 0.2vw + 0.7rem, 1rem);
--text-2xs: clamp(0.625rem, 0.15vw + 0.55rem, 0.75rem);
```

---

## Accessibility Requirements

### Minimum Font Sizes

- Body text: 16px minimum (1rem)
- Small text: 14px minimum (0.875rem)
- Tiny text: 12px minimum (0.75rem)

### Line Height Requirements

- Headings: 1.2 minimum (tight)
- Body text: 1.5 minimum (normal)
- Long-form: 1.625 recommended (relaxed)

### Contrast Ratios (WCAG 2.1 AA)

- Normal text (16px): 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- Headings (24px+): 3:1 minimum

---

## Compliance Checklist

Before deploying any component:

- [ ] Proper heading hierarchy (H1-H6)
- [ ] One H1 per page
- [ ] Semantic HTML used (not Tailwind size classes)
- [ ] No skipped heading levels
- [ ] Fluid font sizes confirmed (not hardcoded px)
- [ ] Correct line heights for element type
- [ ] Correct letter-spacing for element type
- [ ] Correct font weights per mapping
- [ ] WCAG AA contrast met in both light and dark modes
- [ ] Minimum 16px body text
- [ ] Mobile tested (320px)
- [ ] Large desktop tested (1920px)
- [ ] Only Lora, Noto Sans, or Courier New used

---

## Related Documentation

- [spacing.md](spacing.md) / [MODERN-SPACING.md](MODERN-SPACING.md) — Spacing system
- [colors.md](colors.md) — Color tokens
- [breakpoints.md](breakpoints.md) — Responsive breakpoints
- [typography.md](typography.md) — Legacy reference (deprecated)

---

**Version:** 3.0
**Last Updated:** March 2026
**Source of Truth:** `/src/styles/theme-base.css`