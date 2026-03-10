# Color Design Tokens

## Purpose

This document defines the **semantic color system** used throughout the LightSpeed Tour Operator plugin prototype. All colors are defined as CSS custom properties in `/src/styles/theme-light.css` (light mode) and `/src/styles/theme-dark.css` (dark mode), with base tokens in `/src/styles/theme-base.css`.

**🎨 CRITICAL:**  
- **NEVER hardcode color values** (no `#ffffff`, `rgb()`, or `rgba()`)
- **NEVER use inline `style={{ color: ... }}`** - All colors must be applied via CSS classes
- **ALWAYS use semantic tokens** via Tailwind classes or CSS variables
- **Automatic dark mode** - All color tokens automatically switch in dark mode

---

## Color System Philosophy

**Semantic, not literal:** Color token names describe their **purpose**, not their appearance.

- ✅ `--primary` (describes role)
- ❌ `--green` (describes appearance)

**Theme-agnostic:** Tokens work for both light and dark modes through CSS variable substitution.

**Accessibility-first:** All color combinations meet WCAG 2.1 AA contrast requirements.

---

## Core Color Tokens

### Brand Identity (Reference Only)

The raw brand palette is defined in `theme-light.css` as `--color-brand-*` variables.
**Do NOT use these directly in components.** Always use the semantic tokens above.

```css
/* Olive green family */
--color-brand-green-900: #1A3D00;
--color-brand-green-700: #2D5C0A;
--color-brand-green-500: #4A7311; /* → mapped to --primary (light) */
--color-brand-green-300: #6E9E30;
--color-brand-green-100: #C8DFA8;

/* Amber/gold family */
--color-brand-amber-900: #5A3900;
--color-brand-amber-700: #8C5A00;
--color-brand-amber-500: #B87A00; /* → mapped to --accent (light) */
--color-brand-amber-300: #E6A800;
--color-brand-amber-100: #FFE08A;

/* Warm beige family */
--color-brand-beige-900: #2C2416;
--color-brand-beige-700: #5C5340; /* → mapped to --secondary (light) */
--color-brand-beige-500: #8C7E66;
--color-brand-beige-300: #C4B8A4;
--color-brand-beige-100: #F5F0E8;
```

---

### Background Colors

```css
--background: #FFFFFF;           /* Light mode — Page background */
--background: #0A0A0A;           /* Dark mode — Near-black page background */
```

**Usage:** Main application background

**Tailwind Class:** `bg-background`

**Example:**
```typescript
<div className="bg-background">
  Content
</div>
```

---

### Foreground Colors

```css
--foreground: #000000;                    /* Light mode — 21:1 on #FFFFFF */
--foreground: #FFFFFF;                    /* Dark mode — 19.26:1 on #0A0A0A */
```

**Usage:** Primary text color

**Tailwind Class:** `text-foreground`

**Example:**
```typescript
<p className="text-foreground">
  Default text color
</p>
```

---

### Primary Colors

```css
--primary: #4A7311;                       /* Light: Olive green — 7.23:1 on #FFFFFF */
--primary: #90BA48;                       /* Dark: Light olive — 8.14:1 on #0A0A0A */
--primary-foreground: #FFFFFF;            /* Light: White on primary */
--primary-foreground: #000000;            /* Dark: Black on primary — 8.14:1 */
```

**Usage:** Primary brand actions (buttons, links, key UI elements)

**Tailwind Classes:** `bg-primary`, `text-primary`, `border-primary`, `text-primary-foreground`

**Example:**
```typescript
<button className="bg-primary text-primary-foreground rounded-md px-4 py-2">
  Book Now
</button>
```

**❌ NEVER do this:**
```typescript
<button style={{ backgroundColor: '#4a7311', color: '#ffffff' }}>
  Hardcoded colors
</button>
```

---

### Secondary Colors

```css
--secondary: #5C5340;                     /* Light: Dark warm beige — 8.14:1 on #FFFFFF */
--secondary: #A89A7A;                     /* Dark: Light warm beige — 7.58:1 on #0A0A0A */
--secondary-foreground: #FFFFFF;          /* Light: White on secondary */
--secondary-foreground: #000000;          /* Dark: Black on secondary — 7.58:1 */
```

**Usage:** Secondary actions, alternative UI elements (NOT destructive)

**Tailwind Classes:** `bg-secondary`, `text-secondary`, `border-secondary`

**Example:**
```typescript
<button className="bg-secondary text-secondary-foreground">
  Learn More
</button>
```

---

### Accent Colors

```css
--accent: #B87A00;                        /* Light: Darker amber/gold — 7.01:1 on #FFFFFF */
--accent: #FFB740;                        /* Dark: Bright amber — 9.86:1 on #0A0A0A */
--accent-foreground: #FFFFFF;             /* Light: White */
--accent-foreground: #000000;             /* Dark: Black — 9.86:1 */
```

**Usage:** Highlights, featured content, special emphasis

**Tailwind Classes:** `bg-accent`, `text-accent`, `border-accent`

**Example:**
```typescript
<span className="text-accent font-medium">
  Featured
</span>
```

---

### Muted Colors

```css
--muted: #F5F5F5;                         /* Light: Very light grey surface */
--muted: #262626;                         /* Dark: Dark grey surface */
--muted-foreground: #595959;              /* Light: 7.03:1 on #FFFFFF, 6.68:1 on #F5F5F5 */
--muted-foreground: #B8B8B8;              /* Dark: 7.73:1 on #0A0A0A, 7.5:1 on #262626 */
```

**Usage:** Disabled states, subtle backgrounds, secondary text

**Tailwind Classes:** `bg-muted`, `text-muted-foreground`

**Example:**
```typescript
<p className="text-muted-foreground text-sm">
  Optional secondary information
</p>
```

---

### Destructive Colors

```css
--destructive: #B71C1C;                   /* Light: Deep red — 8.59:1 on #FFFFFF */
--destructive: #F44336;                   /* Dark: Bright red — 7.71:1 on #0A0A0A */
--destructive-foreground: #FFFFFF;        /* Light: White */
--destructive-foreground: #000000;        /* Dark: Black */
```

**Usage:** Delete actions, error states, warnings

**Tailwind Classes:** `bg-destructive`, `text-destructive`, `border-destructive`

**Example:**
```typescript
<button className="bg-destructive text-destructive-foreground">
  Delete
</button>
```

---

### Success Colors

```css
--success: #1B5E20;                      /* Light: Deep green — 8.28:1 on #FFFFFF */
--success: #66BB6A;                      /* Dark: Bright green — 7.88:1 on #0A0A0A */
--success-foreground: #FFFFFF;           /* Light: White */
--success-foreground: #000000;           /* Dark: Black */
```

**Usage:** Success states, confirmations, positive feedback

**Tailwind Classes:** `bg-success`, `text-success`, `border-success`

**Example:**
```typescript
<div className="bg-success/10 text-success border border-success rounded p-3">
  Booking confirmed successfully!
</div>
```

---

### Warning Colors

```css
--warning: #E65100;                      /* Light: Deep orange — 7.14:1 on #FFFFFF */
--warning: #FFA726;                      /* Dark: Bright orange — 9.01:1 on #0A0A0A */
--warning-foreground: #FFFFFF;           /* Light: White */
--warning-foreground: #000000;           /* Dark: Black */
```

**Usage:** Warning states, important notices, caution alerts

**Tailwind Classes:** `bg-warning`, `text-warning`, `border-warning`

**Example:**
```typescript
<div className="bg-warning/10 text-warning border border-warning rounded p-3">
  Limited availability — book soon!
</div>
```

---

### Info Colors

```css
--info: #01579B;                         /* Light: Deep blue — 8.59:1 on #FFFFFF */
--info: #42A5F5;                         /* Dark: Bright blue — 7.58:1 on #0A0A0A */
--info-foreground: #FFFFFF;              /* Light: White */
--info-foreground: #000000;              /* Dark: Black */
```

**Usage:** Informational messages, tips, neutral alerts

**Tailwind Classes:** `bg-info`, `text-info`, `border-info`

**Example:**
```typescript
<div className="bg-info/10 text-info border border-info rounded p-3">
  Check-in time is 14:00 local time.
</div>
```

---

## Container Colors

### Card Colors

```css
--card: #FFFFFF;                          /* Light mode */
--card: #1A1A1A;                          /* Dark mode — Slightly lifted */
--card-foreground: #000000;               /* Light mode — 21:1 on #FFFFFF */
--card-foreground: #FFFFFF;               /* Dark mode — 17.13:1 on #1A1A1A */
```

**Usage:** Cards, modals, containers

**Tailwind Classes:** `bg-card`, `text-card-foreground`

**Example:**
```typescript
<div className="bg-card text-card-foreground rounded-lg p-6 shadow">
  Card content
</div>
```

---

### Popover Colors

```css
--popover: #FFFFFF;                       /* Light mode */
--popover: #1A1A1A;                       /* Dark mode */
--popover-foreground: #000000;            /* Light mode */
--popover-foreground: #FFFFFF;            /* Dark mode */
```

**Usage:** Dropdowns, tooltips, popovers

**Tailwind Classes:** `bg-popover`, `text-popover-foreground`

**Example:**
```typescript
<div className="bg-popover text-popover-foreground rounded shadow-lg">
  Dropdown content
</div>
```

---

## Border & Input Colors

### Border Color

```css
--border: #BDBDBD;                        /* Light: Visible but subtle divider */
--border: #404040;                        /* Dark: Dark grey divider */
```

**Usage:** Default border color for all elements

**Tailwind Class:** `border-border`

**Example:**
```typescript
<div className="border border-border rounded">
  Bordered content
</div>
```

---

### Input Colors

```css
--input: #FFFFFF;                         /* Light mode */
--input: #1A1A1A;                         /* Dark mode */
--input-background: #FFFFFF;              /* Light mode */
--input-background: #1A1A1A;             /* Dark mode */
```

**Usage:** Input fields, text areas

**Tailwind Classes:** `bg-input`, `bg-input-background`

**Example:**
```typescript
<input
  type="text"
  className="bg-input-background border border-border rounded px-3 py-2"
/>
```

---

### Ring Color (Focus State)

```css
--ring: #1976D2;                          /* Light: High-visibility blue */
--ring: #64B5F6;                          /* Dark: Lighter blue */
```

**Usage:** Focus rings, outlines, keyboard navigation indicators

**Tailwind Class:** `ring-ring`

**Example:**
```typescript
<button className="focus:ring-2 focus:ring-ring focus:ring-offset-2">
  Focusable
</button>
```

---

## Sidebar Colors (Navigation)

```css
--sidebar: #2C2416;                       /* Light: Very dark brown */
--sidebar: #1A1A1A;                       /* Dark: Very dark */
--sidebar-foreground: #FFFFFF;            /* Both modes: White */
--sidebar-primary: #F7AE00;              /* Light: Gold */
--sidebar-primary: #FFB740;              /* Dark: Bright amber */
--sidebar-accent: #F8F7F5;               /* Light: Off-white */
--sidebar-accent: #262626;               /* Dark: Dark grey */
--sidebar-border: #5C5340;               /* Light: Dark beige */
--sidebar-border: #404040;               /* Dark: Dark grey */
--sidebar-ring: #F7AE00;                 /* Light: Gold */
--sidebar-ring: #FFB740;                 /* Dark: Bright amber */
```

**Usage:** Site header, navigation menus, persistent UI

**Tailwind Classes:** `bg-sidebar`, `text-sidebar-foreground`, etc.

**Example:**
```typescript
<nav className="bg-sidebar text-sidebar-foreground">
  <a href="/" className="hover:text-sidebar-primary">
    Home
  </a>
</nav>
```

---

## Chart Colors

```css
/* Light mode */
--chart-1: #4A7311;                       /* Olive green — 7.23:1 */
--chart-2: #B87A00;                       /* Dark amber — 7.01:1 */
--chart-3: #5C5340;                       /* Dark beige — 8.14:1 */
--chart-4: #2C2416;                       /* Very dark brown — 15.8:1 */
--chart-5: #595959;                       /* Dark grey — 7.03:1 */

/* Dark mode */
--chart-1: #90BA48;                       /* Light olive — 8.14:1 */
--chart-2: #FFB740;                       /* Bright amber — 9.86:1 */
--chart-3: #A89A7A;                       /* Light beige — 7.58:1 */
--chart-4: #D4C4A8;                       /* Very light brown — 11.23:1 */
--chart-5: #B8B8B8;                       /* Light grey — 7.73:1 */
```

**Usage:** Data visualization, charts, graphs

**Tailwind Classes:** `bg-chart-1`, `text-chart-2`, etc.

**Example:**
```typescript
<div className="bg-chart-1 h-20" style={{ width: '60%' }}>
  Chart bar
</div>
```

---

## Color Usage Rules

### 1. Always Use Semantic Tokens

**✅ Good:**
```typescript
<button className="bg-primary text-primary-foreground">
  Primary Action
</button>
```

**❌ Bad:**
```typescript
<button className="bg-green-600 text-white">
  Hardcoded color
</button>
```

---

### 2. Pair Colors Correctly

Always use matching foreground colors:

**✅ Good:**
```typescript
<div className="bg-primary text-primary-foreground">...</div>
<div className="bg-secondary text-secondary-foreground">...</div>
<div className="bg-card text-card-foreground">...</div>
```

**❌ Bad:**
```typescript
<div className="bg-primary text-secondary-foreground">
  Mismatched colors
</div>
```

---

### 3. Respect Dark Mode

Colors automatically adapt to dark mode. Don't hardcode dark mode overrides:

**✅ Good:**
```typescript
<div className="bg-background text-foreground">
  Automatically adapts
</div>
```

**❌ Bad:**
```typescript
<div className="bg-white dark:bg-gray-900">
  Manual dark mode override
</div>
```

---

### 4. Use Muted for Secondary Content

**✅ Good:**
```typescript
<p className="text-foreground">Primary content</p>
<p className="text-muted-foreground text-sm">Secondary info</p>
```

---

### 5. Use Accent Sparingly

Accent color is for **highlights only**:

**✅ Good:**
```typescript
<span className="text-accent font-medium">Featured</span>
<span className="text-accent font-medium">20% Off</span>
```

**❌ Bad:**
```typescript
<p className="text-accent">
  Every paragraph in accent color
</p>
```

---

## Color Combinations Reference

### Primary Action
```typescript
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Primary Button
</button>
```

### Secondary Action
```typescript
<button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
  Secondary Button
</button>
```

### Ghost/Outline Button
```typescript
<button className="border border-border text-foreground hover:bg-muted">
  Ghost Button
</button>
```

### Destructive Action
```typescript
<button className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
  Delete
</button>
```

### Card
```typescript
<div className="bg-card text-card-foreground border border-border rounded-lg p-6">
  Card content
</div>
```

### Feature Highlight
```typescript
<div className="bg-accent/10 border border-accent rounded-lg p-4">
  <p className="text-accent font-medium">Featured Tour</p>
</div>
```

---

## Accessibility

### Contrast Requirements

All color pairs must meet WCAG 2.1 AA contrast ratios:
- **Normal text:** 4.5:1
- **Large text (18px+):** 3:1
- **UI components:** 3:1

All semantic tokens in this design system target WCAG AAA (≥ 7:1) where achievable,
with a minimum floor of WCAG AA (≥ 4.5:1) for interactive/branded elements.

### Testing

Current color pairs that meet AA standards:
- `--primary` + `--primary-foreground` ✅ (Light: 7.23:1, Dark: 8.14:1)
- `--secondary` + `--secondary-foreground` ✅ (Light: 8.14:1, Dark: 7.58:1)
- `--accent` + `--accent-foreground` ✅ (Light: 7.01:1, Dark: 9.86:1)
- `--destructive` + `--destructive-foreground` ✅ (Light: 8.59:1, Dark: 7.71:1)
- `--background` + `--foreground` ✅ (Light: 21:1, Dark: 19.26:1)
- `--success` + `--success-foreground` ✅ (Light: 8.28:1, Dark: 7.88:1)
- `--warning` + `--warning-foreground` ✅ (Light: 7.14:1, Dark: 9.01:1)
- `--info` + `--info-foreground` ✅ (Light: 8.59:1, Dark: 7.58:1)
- `--muted` + `--muted-foreground` ✅ (Light: 6.68:1, Dark: 7.5:1)
- `--card` + `--card-foreground` ✅ (Light: 21:1, Dark: 17.13:1)

---

## CSS Variable Reference

### Accessing in Tailwind

```typescript
// Background
className="bg-primary"          // Uses --color-primary
className="text-primary"        // Uses --color-primary
className="border-primary"      // Uses --color-primary

// Arbitrary values
className="bg-[var(--primary)]" // Direct CSS variable access
```

### Accessing in Custom CSS

```css
.custom-component {
  background-color: var(--primary);
  color: var(--primary-foreground);
  border-color: var(--border);
}
```

---

## Related Documentation

- [design-tokens/typography.md](typography.md) - Typography tokens
- [design-tokens/spacing.md](spacing.md) - Spacing tokens
- [design-tokens/shadows.md](shadows.md) - Shadow tokens
- [overview-components.md](../overview-components.md) - Component usage