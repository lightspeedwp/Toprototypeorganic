# LightSpeed Tour Operator Design System Guide

**Version:** V3.1 — Complete Design System Implementation
**Last Updated:** December 2024

This document provides comprehensive guidance on the design system implementation, including dark mode support, template browser, and all design tokens.

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Dark Mode Implementation](#dark-mode-implementation)
3. [Template Browser](#template-browser)
4. [Design Tokens](#design-tokens)
5. [Implementation Guidelines](#implementation-guidelines)
6. [Testing & Quality Assurance](#testing--quality-assurance)

---

## System Overview

### Core Principles

The LightSpeed design system is built on these foundational principles:

1. **CSS Variable-Driven:** All styling uses CSS custom properties from `/src/styles/theme.css`
2. **Semantic Tokens:** Colors and spacing use semantic names (purpose, not appearance)
3. **Dark Mode Native:** All tokens support automatic light/dark mode switching
4. **WordPress-Aligned:** Structure maps directly to WordPress block theme architecture
5. **Accessibility-First:** WCAG 2.1 AA compliance is mandatory, not optional

### File Structure

```
/src/styles/
├── theme.css         # All CSS variables, light & dark mode tokens
├── fonts.css         # Font imports (Lora + Noto Sans)
├── tailwind.css      # Tailwind configuration
└── index.css         # Global styles import
```

---

## Dark Mode Implementation

### Architecture

Dark mode is implemented using a **class-based toggle system** with CSS custom properties.

#### How It Works

1. **Default State:** Light mode (no class on `<html>`)
2. **Dark Mode:** `.dark` class added to `<html>` element
3. **CSS Variables:** Automatically update based on presence of `.dark` class
4. **Persistence:** Theme preference saved to `localStorage`

### Theme Switcher Location

**Desktop Header:**
- Position: Top right, next to "Book Now" button
- Icon: Moon (light mode) / Sun (dark mode)
- Accessible via keyboard navigation

**Mobile Menu:**
- Position: Within mobile navigation drawer
- Label: "Dark Mode" / "Light Mode"
- Full-width button with icon

**Legacy Floating Button:**
- Removed in V3.1
- Functionality integrated into header

### Implementation Code

The theme switcher is integrated directly into `/src/app/components/parts/Header.tsx`:

```typescript
const [theme, setTheme] = useState<'light' | 'dark'>('light');

useEffect(() => {
  // Check for saved theme or system preference
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(initialTheme);
  
  if (initialTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
}, []);

const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  
  if (newTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  localStorage.setItem('theme', newTheme);
};
```

### Dark Mode Color Tokens

All color tokens automatically adapt when `.dark` class is present:

#### Background & Foreground

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `--background` | `rgba(255, 255, 255, 1)` | `rgba(20, 20, 20, 1)` |
| `--foreground` | `rgba(9, 9, 9, 1)` | `rgba(245, 245, 245, 1)` |

#### Semantic Colors

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `--primary` | `rgba(74, 115, 17, 1)` | `rgba(74, 115, 17, 1)` (unchanged) |
| `--secondary` | `rgba(172, 159, 124, 1)` | `rgba(120, 110, 85, 1)` |
| `--accent` | `rgba(247, 174, 0, 1)` | `rgba(247, 174, 0, 1)` (unchanged) |
| `--muted` | `rgba(225, 225, 225, 1)` | `rgba(60, 60, 60, 1)` |
| `--border` | `rgba(117, 117, 117, 1)` | `rgba(80, 80, 80, 1)` |

#### Container Colors

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `--card` | `rgba(255, 255, 255, 1)` | `rgba(30, 30, 30, 1)` |
| `--popover` | `rgba(255, 255, 255, 1)` | `rgba(30, 30, 30, 1)` |
| `--input-background` | `rgba(255, 255, 255, 1)` | `rgba(40, 40, 40, 1)` |

### Testing Dark Mode

**Manual Testing Checklist:**

- [ ] Theme persists across page refreshes
- [ ] Theme syncs between header button and mobile menu
- [ ] All text remains readable in both modes
- [ ] All interactive elements have visible focus states
- [ ] Borders are visible but not harsh
- [ ] Images/photos don't appear too bright in dark mode
- [ ] Shadows are appropriate for each mode

**Color Contrast Requirements:**

- Light mode: `--foreground` on `--background` must meet 4.5:1 ratio
- Dark mode: `--foreground` on `--background` must meet 4.5:1 ratio
- All semantic color pairs must meet WCAG AA standards

---

## Template Browser

### Purpose

The template browser is a **developer tool** for testing and validating all page templates and archetypes in the prototype.

### Access Points

1. **Floating Button (Top Left):**
   - Always visible, position: `fixed top-6 left-6`
   - Icon: Layers icon
   - Label: "Templates"
   - Opens dropdown panel on click

2. **Footer Link (Bottom Right):**
   - Label: "Test All Templates & Pages"
   - Icon: Grid layout icon
   - Scrolls to top and directs attention to browser button

### Features

**Search & Filter:**
```typescript
// Real-time search across template labels and descriptions
const filteredPages = pages.filter(page =>
  page.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
  page.description.toLowerCase().includes(searchQuery.toLowerCase())
);
```

**Current Template Indicator:**
- Highlighted section showing active template
- Visual indicator (colored dot) next to active item
- Different background color for active state

**Template Categories:**

The browser organizes templates by WordPress alignment:

1. **WordPress Templates** (`[WP Template]`)
   - `archive-tour.html`
   - `single-tour.html`
   - `archive-destination.html`
   - `single-destination.html`

2. **Legacy Implementations** (`[LEGACY]`)
   - Previous WordPress-aligned versions

3. **Archetype Examples:**
   - Content Hub (Tours, Destinations, Accommodation)
   - Single Detail (Tour, Destination)
   - Taxonomy Archive (Travel Styles)
   - Editorial Listing (Blog)
   - Utility Pages (FAQ, About, Contact, Team)

### Usage Example

```typescript
// App.tsx integration
const [activePage, setActivePage] = useState(PAGES[0].id);

<TemplateBrowser 
  pages={PAGES} 
  activePage={activePage} 
  onPageChange={setActivePage} 
/>
```

### Keyboard Navigation

- **Tab:** Move between search input and template list
- **Arrow Keys:** Navigate template list
- **Enter:** Select template
- **Escape:** Close browser panel

---

## Design Tokens

### Colors

**Location:** `/src/styles/theme.css` lines 16-129

**Primary Brand Colors:**
- `--primary: rgba(74, 115, 17, 1)` — Olive green (brand color)
- `--accent: rgba(247, 174, 0, 1)` — Gold/amber (highlights)
- `--secondary: rgba(172, 159, 124, 1)` — Beige (secondary actions)

**Usage Rules:**

✅ **Always use semantic Tailwind classes:**
```typescript
<button className="bg-primary text-primary-foreground">
  Book Now
</button>
```

❌ **Never use hardcoded colors:**
```typescript
<button className="bg-green-600 text-white">
  Book Now
</button>
```

**See also:** [`design-tokens/colors.md`](design-tokens/colors.md) for complete color documentation.

---

### Typography

**Location:** `/src/styles/theme.css` lines 4-14, 172-248

**Font Families:**
- `--font-family-lora: 'Lora', serif` — Headings, labels
- `--font-family-noto-sans: 'Noto Sans', sans-serif` — Body, buttons, inputs

**Font Sizes:**
```css
--text-4xl: 60px;   /* h1 */
--text-2xl: 32px;   /* h2 */
--text-xl: 20px;    /* h3 */
--text-lg: 16px;    /* h4 */
--text-base: 16px;  /* p, label, button, input */
```

**Font Weights:**
```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
```

**Critical Rule:** Use semantic HTML, NOT Tailwind classes:

✅ **Good:**
```typescript
<h1>Explore Iceland</h1>  {/* Automatically: 60px, Lora, 600 */}
<h2>Popular Tours</h2>     {/* Automatically: 32px, Lora, 600 */}
<p>Body text</p>           {/* Automatically: 16px, Noto Sans, 400 */}
```

❌ **Bad:**
```typescript
<div className="text-4xl font-bold">Explore Iceland</div>
<div className="text-2xl font-semibold">Popular Tours</div>
```

**Exception:** Only override typography when **intentionally deviating** from system defaults:

```typescript
<p className="text-sm text-muted-foreground">
  Legal disclaimer (intentional deviation)
</p>
```

**See also:** [`design-tokens/typography.md`](design-tokens/typography.md) for complete typography documentation.

---

### Spacing

**System:** Tailwind's default spacing scale (4px increments)

**Common Values:**

| Class | Value | Usage |
|-------|-------|-------|
| `p-4` | 16px | Card padding (mobile) |
| `p-6` | 24px | Card padding (desktop) |
| `gap-4` | 16px | Grid/flex gap |
| `mb-12` | 48px | Section margin |
| `py-16` | 64px | Major section padding |
| `py-20` | 80px | Hero section padding |

**Responsive Patterns:**

```typescript
// Mobile-first responsive spacing
<section className="py-12 md:py-16 lg:py-20">
  {/* Mobile: 48px, Tablet: 64px, Desktop: 80px */}
</section>

<div className="px-4 md:px-6 lg:px-8">
  {/* Mobile: 16px, Tablet: 24px, Desktop: 32px */}
</div>
```

**See also:** [`design-tokens/spacing.md`](design-tokens/spacing.md) for complete spacing documentation.

---

### Border Radius

**Location:** `/src/styles/theme.css` lines 74-75, 157-160

```css
--radius: 4px;

/* Tailwind mappings */
--radius-sm: calc(var(--radius) - 2px);  /* 2px */
--radius-md: var(--radius);              /* 4px */
--radius-lg: calc(var(--radius) + 2px);  /* 6px */
--radius-xl: calc(var(--radius) + 4px);  /* 8px */
```

**Usage:**

```typescript
<div className="rounded-sm">   {/* 2px */}
<div className="rounded-md">   {/* 4px - most common */}
<div className="rounded-lg">   {/* 6px - cards */}
<div className="rounded-xl">   {/* 8px - hero sections */}
```

---

### Shadows

**Location:** `/src/styles/theme.css` line 63, 169

```css
/* Light mode */
--elevation-sm: 0px 4px 0px 0px rgba(0, 0, 0, 1);

/* Dark mode */
--elevation-sm: 0px 4px 0px 0px rgba(0, 0, 0, 0.5);
```

**Usage:**

```typescript
<div className="shadow-sm">   {/* Uses --elevation-sm */}
```

**Note:** The current design uses a **hard drop shadow** (no blur) for a bold, modern aesthetic. This is intentional.

---

## Implementation Guidelines

### Adding New Colors

**Never add arbitrary colors.** Always use semantic tokens:

```typescript
// ✅ Good - uses semantic token
<div className="bg-accent text-accent-foreground">
  Featured Content
</div>

// ❌ Bad - hardcoded color
<div className="bg-yellow-500 text-black">
  Featured Content
</div>
```

If you need a new semantic color:

1. Add it to `/src/styles/theme.css` in both `:root` and `.dark`
2. Add Tailwind mapping in `@theme inline` block
3. Document in `design-tokens/colors.md`
4. Update this guide

---

### Updating Typography

**To change font sizes system-wide:**

1. Edit `/src/styles/theme.css` CSS variables:
   ```css
   --text-4xl: 64px;  /* Changed from 60px */
   ```

2. Changes apply **automatically** to all `<h1>` elements

3. No component updates needed (unless using Tailwind overrides)

**To change font families:**

1. Update font import in `/src/styles/fonts.css`
2. Update CSS variables in `/src/styles/theme.css`:
   ```css
   --font-family-lora: 'New Serif Font', serif;
   ```

3. Typography updates automatically across all components

---

### Responsive Design Patterns

**Mobile-First Approach:**

```typescript
// Base styles = mobile (< 768px)
// md: = tablet (≥ 768px)
// lg: = desktop (≥ 1024px)

<section className="py-12 md:py-16 lg:py-20">
  <h2 className="mb-4 md:mb-6">Section Title</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
    {/* Content */}
  </div>
</section>
```

**Container Max Widths:**

The `Container` component handles responsive max-widths:

```typescript
// Mobile: 100% width (with padding)
// Tablet: 100% width (with padding)
// Desktop: 1280px max-width, centered
<Container>
  {/* Content automatically constrained */}
</Container>
```

---

### Component Styling Override Pattern

Some base components (like shadcn/ui) may have default styling. **Always override with design system values:**

```typescript
// ❌ Bad - uses component defaults
<Card>
  <CardContent className="p-4">
    Content
  </CardContent>
</Card>

// ✅ Good - explicitly sets design system values
<Card className="bg-card border-border">
  <CardContent className="p-6">
    Content
  </CardContent>
</Card>
```

**Why?** Component libraries may have their own spacing/color defaults that don't match the design system.

---

## Testing & Quality Assurance

### Pre-Deployment Checklist

**Design System Compliance:**

- [ ] All colors use semantic CSS variables (no hardcoded values)
- [ ] All typography uses semantic HTML (no Tailwind size/weight classes except overrides)
- [ ] All spacing uses Tailwind classes (consistent scale)
- [ ] Dark mode works for all components
- [ ] Theme preference persists across sessions

**Accessibility:**

- [ ] WCAG 2.1 AA color contrast met in both modes
- [ ] All interactive elements keyboard accessible
- [ ] Focus states visible in both modes
- [ ] One H1 per page
- [ ] Logical heading hierarchy (H1 → H2 → H3)
- [ ] Screen reader tested with NVDA/JAWS

**Responsive Design:**

- [ ] Mobile (375px): Layout works, no horizontal scroll
- [ ] Tablet (768px): Layout adapts appropriately
- [ ] Desktop (1280px+): Content centered, optimal line lengths
- [ ] Touch targets minimum 44px × 44px

**Template Browser:**

- [ ] All templates listed and accessible
- [ ] Search functionality works
- [ ] Current template correctly highlighted
- [ ] Smooth scroll to top on template change

**Dark Mode:**

- [ ] Toggle works in header (desktop)
- [ ] Toggle works in mobile menu
- [ ] Preference saved to localStorage
- [ ] Respects system preference on first load
- [ ] All content readable in both modes

---

### Manual Testing Process

1. **Light Mode Testing:**
   - Start in light mode
   - Navigate through all templates via browser
   - Check color contrast, readability
   - Test all interactive elements

2. **Dark Mode Testing:**
   - Switch to dark mode
   - Repeat template navigation
   - Verify no harsh/bright elements
   - Ensure shadows are appropriate

3. **Persistence Testing:**
   - Set dark mode
   - Refresh page → should remain dark
   - Clear localStorage → should respect system preference
   - Set light mode → should persist

4. **Responsive Testing:**
   - Test at 375px (mobile)
   - Test at 768px (tablet)
   - Test at 1280px (desktop)
   - Test at 1920px (large desktop)

---

## Quick Reference

### Essential Files

```
/src/styles/theme.css          # ALL design tokens
/src/styles/fonts.css          # Font imports
/src/app/components/parts/Header.tsx    # Theme switcher
/src/app/components/common/TemplateBrowser.tsx    # Template browser
/guidelines/design-tokens/     # Token documentation
```

### Essential Commands

```bash
# View all CSS variables
cat /src/styles/theme.css

# Search for color usage
grep -r "bg-primary" /src/app/

# Find hardcoded colors (should return minimal results)
grep -r "bg-\[#" /src/app/
grep -r "text-\[#" /src/app/
```

### Common Tasks

**Change primary brand color:**
1. Edit `/src/styles/theme.css` → `--primary: rgba(...)`
2. Update both `:root` and `.dark` if needed
3. Refresh browser → changes apply everywhere

**Change heading font:**
1. Update font import in `/src/styles/fonts.css`
2. Edit `--font-family-lora` in `/src/styles/theme.css`
3. All headings update automatically

**Add new template to browser:**
1. Create template component in `/src/app/templates/` or `/src/app/pages/`
2. Add entry to `PAGES` array in `/src/app/App.tsx`
3. Template appears in browser automatically

---

## Related Documentation

- [Guidelines.md](Guidelines.md) — Main system guidelines
- [design-tokens/colors.md](design-tokens/colors.md) — Complete color system
- [design-tokens/typography.md](design-tokens/typography.md) — Typography system
- [design-tokens/spacing.md](design-tokens/spacing.md) — Spacing system
- [overview-components.md](overview-components.md) — Component architecture
- [README-WORDPRESS-MAPPING.md](README-WORDPRESS-MAPPING.md) — WordPress alignment

---

## Version History

**V3.1 (Current):**
- Integrated theme switcher into header
- Added footer link to template browser
- Removed floating theme switcher
- Enhanced dark mode documentation

**V3.0:**
- WordPress-native alignment
- Complete design token system
- Dark mode support
- Template browser

---

**Last Updated:** December 2024  
**Maintainer:** LightSpeed Development Team  
**Status:** Production Ready
