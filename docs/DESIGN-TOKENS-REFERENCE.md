# Design System Tokens Reference

**Quick reference for all CSS variables available in the design system.**

**Last Updated:** February 26, 2026

---

## 🎨 Colors

### Primary Colors

```css
var(--primary)                 /* Main brand color */
var(--primary-foreground)      /* Text on primary background */

var(--secondary)               /* Secondary brand color */
var(--secondary-foreground)    /* Text on secondary background */

var(--accent)                  /* Accent/highlight color */
var(--accent-foreground)       /* Text on accent background */
```

### Background Colors

```css
var(--background)              /* Page background */
var(--foreground)              /* Main text color */

var(--card)                    /* Card background */
var(--card-foreground)         /* Card text color */

var(--popover)                 /* Popover background */
var(--popover-foreground)      /* Popover text color */

var(--muted)                   /* Muted/subtle background */
var(--muted-foreground)        /* Muted text color */
```

### Interactive Elements

```css
var(--input)                   /* Input border color */
var(--input-background)        /* Input background */

var(--border)                  /* Border color */
var(--ring)                    /* Focus ring color */
```

### Semantic Colors

```css
var(--success)                 /* Success state color */
var(--success-foreground)      /* Text on success background */

var(--warning)                 /* Warning state color */
var(--warning-foreground)      /* Text on warning background */

var(--destructive)             /* Error/destructive color */
var(--destructive-foreground)  /* Text on destructive background */

var(--info)                    /* Info state color */
var(--info-foreground)         /* Text on info background */
```

### Sidebar/Navigation

```css
var(--sidebar)                        /* Sidebar background */
var(--sidebar-foreground)             /* Sidebar text */
var(--sidebar-primary)                /* Sidebar primary elements */
var(--sidebar-primary-foreground)     /* Text on sidebar primary */
var(--sidebar-accent)                 /* Sidebar accent elements */
var(--sidebar-accent-foreground)      /* Text on sidebar accent */
var(--sidebar-border)                 /* Sidebar borders */
var(--sidebar-ring)                   /* Sidebar focus ring */
```

### Chart Colors

```css
var(--chart-1)                 /* Chart color 1 */
var(--chart-2)                 /* Chart color 2 */
var(--chart-3)                 /* Chart color 3 */
var(--chart-4)                 /* Chart color 4 */
var(--chart-5)                 /* Chart color 5 */
```

---

## 🔤 Typography

### Font Families (ONLY these 3 allowed)

```css
var(--font-family-lora)        /* Serif - Use for headings */
var(--font-family-noto-sans)   /* Sans-serif - Use for body text */
var(--font-family-mono)        /* Monospace - Use for code */
```

### Font Sizes (Fluid - responsive)

```css
var(--text-xs)                 /* 12px (extra small) */
var(--text-sm)                 /* 14px (small) */
var(--text-base)               /* 16px (base/body) */
var(--text-lg)                 /* 18px (large) */
var(--text-xl)                 /* 20px (extra large) */
var(--text-2xl)                /* 24px (2xl) */
var(--text-3xl)                /* 30px (3xl) */
var(--text-4xl)                /* 36px (4xl) */
var(--text-5xl)                /* 48px (5xl) */
var(--text-6xl)                /* 60px (6xl) */
```

### Font Weights

```css
var(--font-weight-normal)      /* 400 - Body text */
var(--font-weight-medium)      /* 500 - UI elements, buttons */
var(--font-weight-semibold)    /* 600 - H2, H3, emphasis */
var(--font-weight-bold)        /* 700 - H1, strong emphasis */
```

### Line Heights

```css
var(--leading-none)            /* 1 - Tight line height */
var(--leading-tight)           /* 1.25 - Headlines */
var(--leading-snug)            /* 1.375 - Subheadings */
var(--leading-normal)          /* 1.5 - Body text */
var(--leading-relaxed)         /* 1.625 - Comfortable reading */
var(--leading-loose)           /* 2 - Spacious */
```

### Letter Spacing

```css
var(--tracking-tighter)        /* -0.05em - Very tight */
var(--tracking-tight)          /* -0.025em - Tight */
var(--tracking-normal)         /* 0 - Normal */
var(--tracking-wide)           /* 0.025em - Wide */
var(--tracking-wider)          /* 0.05em - Wider */
var(--tracking-widest)         /* 0.1em - Widest */
```

---

## 📏 Spacing

### Section Spacing (Fluid - for major layout sections)

```css
var(--spacing-section-sm)      /* clamp(2rem, 4vw, 3rem) - Small section */
var(--spacing-section-md)      /* clamp(3rem, 6vw, 5rem) - Medium section */
var(--spacing-section-lg)      /* clamp(4rem, 8vw, 7rem) - Large section */
```

### Gap Spacing (Fluid - for element spacing)

```css
var(--spacing-gap-sm)          /* clamp(0.75rem, 2vw, 1rem) - Small gap */
var(--spacing-gap-md)          /* clamp(1rem, 3vw, 1.5rem) - Medium gap */
var(--spacing-gap-lg)          /* clamp(1.5rem, 4vw, 2rem) - Large gap */
```

### Container Padding (Fluid)

```css
var(--spacing-container-sm)    /* clamp(1rem, 3vw, 1.5rem) - Side padding */
```

### Tailwind Scale (Fixed - for precise layout)

Use Tailwind classes directly:
- `p-1` = 4px
- `p-2` = 8px
- `p-3` = 12px
- `p-4` = 16px
- `p-5` = 20px
- `p-6` = 24px
- `p-8` = 32px
- `p-10` = 40px
- `p-12` = 48px
- `p-16` = 64px

---

## 🔲 Border Radius

```css
var(--radius-sm)               /* calc(var(--radius) - 2px) - Small radius */
var(--radius-md)               /* var(--radius) - Medium radius (base) */
var(--radius-lg)               /* calc(var(--radius) + 2px) - Large radius */
var(--radius-xl)               /* calc(var(--radius) + 4px) - Extra large */
var(--radius-full)             /* 9999px - Pill/circle shape */
```

**Base Radius:**

```css
var(--radius)                  /* 6px - Default border radius */
```

---

## 🌑 Shadows / Elevation

```css
var(--elevation-sm)            /* Small shadow - Subtle elevation */
var(--elevation-md)            /* Medium shadow - Cards, dropdowns */
var(--elevation-lg)            /* Large shadow - Modals, popovers */
```

---

## 📐 Layout

### Container

```css
.container {
  max-width: 1440px;
  padding-left: var(--spacing-container-sm);
  padding-right: var(--spacing-container-sm);
}
```

### Section

```css
.section {
  padding-top: var(--spacing-section-md);
  padding-bottom: var(--spacing-section-md);
}
```

---

## 🎯 Common Patterns

### Card with Proper Tokens

```css
.my-card {
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--elevation-sm);
}

.my-card__title {
  font-family: var(--font-family-lora);
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--card-foreground);
  margin-bottom: 0.5rem;
}

.my-card__description {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-sm);
  color: var(--muted-foreground);
  line-height: var(--leading-normal);
}
```

### Button with Proper Tokens

```css
.my-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary);
  color: var(--primary-foreground);
  border: none;
  border-radius: var(--radius-md);
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: opacity 200ms ease;
}

.my-button:hover {
  opacity: 0.9;
}

.my-button:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

### Form Input with Proper Tokens

```css
.my-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: var(--input-background);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  color: var(--foreground);
  transition: border-color 200ms ease;
}

.my-input:focus {
  outline: none;
  border-color: var(--ring);
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
}

.my-input::placeholder {
  color: var(--muted-foreground);
}
```

---

## 🌗 Dark Mode

All color tokens automatically switch when `.dark` class is present on `<html>` element.

**Light mode values:** `/src/styles/theme-light.css`  
**Dark mode values:** `/src/styles/theme-dark.css`

### Manual Dark Mode Adjustments (rarely needed)

```css
/* Light mode (default) */
.my-component {
  background-color: var(--card); /* Auto-switches */
}

/* Only if you need specific dark mode behavior */
.dark .my-component {
  /* Usually not needed - variables auto-switch */
  /* Only add for opacity adjustments or special cases */
  background-color: rgba(26, 26, 26, 0.5);
}
```

---

## 📱 Responsive Breakpoints

Use Tailwind's responsive prefixes:

```css
/* Mobile-first approach */
sm:   /* @media (min-width: 640px) */
md:   /* @media (min-width: 768px) */
lg:   /* @media (min-width: 1024px) */
xl:   /* @media (min-width: 1280px) */
2xl:  /* @media (min-width: 1536px) */
```

**Example:**

```tsx
<div className="text-sm md:text-base lg:text-lg">
  {/* 14px mobile, 16px tablet, 18px desktop */}
</div>
```

---

## ✅ Usage Examples

### Heading Styles

```css
h1 {
  font-family: var(--font-family-lora);
  font-size: var(--text-6xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--leading-tight);
  color: var(--foreground);
}

h2 {
  font-family: var(--font-family-lora);
  font-size: var(--text-4xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--leading-tight);
  color: var(--foreground);
}
```

### Body Text

```css
p {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--leading-normal);
  color: var(--foreground);
}
```

### Code Blocks

```css
code {
  font-family: var(--font-family-mono);
  font-size: var(--text-sm);
  background-color: var(--muted);
  color: var(--foreground);
  padding: 0.125rem 0.25rem;
  border-radius: var(--radius-sm);
}
```

---

## 🔗 Related Documentation

- **[NEW-COMPONENT-GUIDE.md](./NEW-COMPONENT-GUIDE.md)** - Complete guide for creating new components
- **[Guidelines.md](../guidelines/Guidelines.md)** - Project guidelines and rules
- **[design-tokens/colors.md](../guidelines/design-tokens/colors.md)** - Color system details
- **[design-tokens/typography.md](../guidelines/design-tokens/typography.md)** - Typography system details
- **[design-tokens/spacing.md](../guidelines/design-tokens/spacing.md)** - Spacing system details

---

## 📝 Quick Tips

1. **Always use CSS variables** - Never hardcode colors, fonts, or spacing
2. **Only 3 fonts allowed** - Lora (serif), Noto Sans (sans-serif), Courier New (mono)
3. **No inline styles** - Use external CSS or Tailwind utilities
4. **No `dark:` classes** - Use `.dark` selector in CSS
5. **Test both modes** - Always verify light and dark mode
6. **Fluid spacing for sections** - Use `var(--spacing-section-*)` for major layout
7. **Fixed spacing for precision** - Use Tailwind scale (p-4, gap-6) for components
8. **BEM naming** - `.wp-{category}-{component}__element--modifier`

---

**Users can customize the entire site by editing:**
- `/src/styles/theme-light.css` - Light mode colors
- `/src/styles/theme-dark.css` - Dark mode colors
- `/src/styles/theme.css` - Typography, spacing, radius
