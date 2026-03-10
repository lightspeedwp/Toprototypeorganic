# Header Component Guidelines

**Component:** Header  
**Category:** Template Parts  
**WordPress Equivalent:** `parts/header.html`  
**File:** `/src/app/components/parts/Header.tsx`  
**CSS:** `/src/styles/parts/header.css`

---

## Purpose

The Header provides the main site navigation with dropdown mega menus, theme switching, search functionality, and responsive mobile menu. It serves as the primary navigation interface for the entire site with full support for mobile, tablet, and desktop layouts.

---

## WordPress Mapping

**Template Part:** `parts/header.html`

In WordPress block themes, this would be composed of:
- `core/site-logo` — Site branding (via `<Logo bare />`)
- `core/navigation` — Main navigation menu (5 mega menu dropdowns)
- `core/search` — Search functionality (modal overlay)
- Custom blocks for theme switcher (Sun/Moon toggle)

---

## Component API

### Props

```typescript
interface HeaderProps {
  /** Current active page path (for highlighting active nav links) */
  currentPage?: string;

  /** Callback when navigation link is clicked (receives URL path) */
  onNavigate?: (pageId: string) => void;
}
```

### Usage

```tsx
import { Header } from "./components/parts/Header";

// Basic usage (inside RootLayout)
<Header currentPage={location.pathname} onNavigate={handleNavigate} />
```

---

## Architecture

The Header is built with **no external animation library dependencies** (no `motion/react`). All interactions use CSS transitions and React state for maximum reliability.

### Layout Structure

```
<header> (sticky, z-50, bg-background)
  <div.wp-part-header__inner> (max-w-1440px, responsive padding)
    <div.wp-part-header__bar> (flex, responsive height)
      ├── <button.wp-part-header__logo> Logo (flex-shrink-0)
      ├── <nav.wp-part-header__nav> Desktop Nav (hidden < 1024px, flex: 1)
      │     └── NAV_LINKS.map → mega menu dropdowns
      └── <div.wp-part-header__actions> (flex, responsive gap)
            ├── SearchBlock (modal overlay)
            ├── Theme Toggle (always visible)
            └── Hamburger (hidden >= 1024px)
  <MobileMenuPattern /> (overlay, conditional)
```

### Key Design Decisions

1. **Flexbox layout** — Logo + Navigation (flex: 1) + Actions for optimal spacing
2. **No motion/react** — Uses CSS transitions only for maximum reliability
3. **BEM naming** — All CSS classes follow `.wp-part-header__*` convention
4. **Responsive heights** — 64px (mobile) → 72px (tablet) → 80px (desktop)
5. **Logo uses `bare` prop** — Prevents invalid nested `<a>` inside `<button>` HTML

---

## Navigation Structure

### 5 Mega Menu Dropdowns

| Menu | Sections | Key Links |
|------|----------|-----------|
| **Tours** | By Style, Quick Links | Adventure, Cultural, Wildlife, All Tours, Special Offers |
| **Destinations** | Featured, Explore | South Africa, Tanzania, Botswana, All Destinations |
| **Accommodation** | Types, Quick Links | Luxury Lodges, Beach Resorts, City Hotels, All Accommodation |
| **Blog** | Categories, Explore | Travel Tips, Industry News, Tour Operators, All Articles |
| **About** | Company, Support | About Us, Our Team, Guest Reviews, FAQs, Why Book With Us, Contact |

### Mega Menu Behaviour

- **Desktop (1024px+):** Hover to open, 150ms delay before close
- **Mobile/Tablet (<1024px):** Full MobileMenuPattern with accordion sections
- **Keyboard:** Focusable buttons, standard tab order, ESC to close

---

## Responsive Breakpoints

| Element | Mobile (<768px) | Tablet (768-1023px) | Desktop (1024px+) | XL Desktop (1280px+) |
|---------|-----------------|---------------------|-------------------|----------------------|
| **Header Height** | 64px | 72px | 80px | 80px |
| **Logo** | Visible | Visible | Visible | Visible |
| **Desktop Nav** | Hidden | Hidden | **Visible** (flex: 1) | **Visible** (enhanced) |
| **Search Icon** | Visible | Visible | Visible | Visible |
| **Theme Toggle** | Visible | Visible | Visible | Visible |
| **Hamburger** | Visible | Visible | **Hidden** | **Hidden** |
| **Actions Gap** | 0.25rem | 0.5rem | 0.75rem | 0.75rem |
| **Nav Link Padding** | - | - | 0.625rem 1rem | 0.75rem 1.5rem |
| **Nav Link Font** | - | - | 15px | 16px |
| **Mega Menu Width** | - | - | 600-800px | 700-900px |

### Layout Strategy

**Mobile (< 768px):**
```
[Logo] ------------------------------------------- [🔍][☀️/🌙][☰]
```
- Compact spacing, touch-optimized
- Navigation accessed via hamburger menu
- Search opens modal overlay
- Header height: 64px

**Tablet (768-1023px):**
```
[Logo] ------------------------------------------- [🔍][☀️/🌙][☰]
```
- Same structure as mobile
- Larger touch targets (44px minimum - WCAG AA)
- Enhanced spacing for better ergonomics
- Header height: 72px

**Desktop (1024px+):**
```
[Logo] ─── [Tours][Destinations][Accommodation][Blog][About] ─── [🔍][☀️/🌙]
```
- Full navigation visible and centered
- Navigation takes `flex: 1` (fills space between logo and actions)
- Hamburger hidden (no longer needed)
- Hover-based mega menus
- Header height: 80px

**XL Desktop (1280px+):**
```
[Logo] ───── [Tours][Destinations][Accommodation][Blog][About] ───── [🔍][☀️/🌙]
```
- Enhanced spacing and sizing
- Larger font sizes (16px) for better readability
- Wider mega menus (up to 900px)
- More generous padding and gaps

---

## Search

### Modal Overlay (All Breakpoints)
- Click search icon → full-screen modal overlay
- Input field auto-focused
- ESC key or X button closes modal
- Enter submits search → navigates to `/search`
- Max-width: 600px, centered
- Backdrop blur effect

---

## Scroll Behaviour

- **Not scrolled:** Solid background with border
- **Scrolled (>20px):** 
  - `backdrop-filter: blur(12px)`
  - `background-color: rgba(var(--color-background-rgb), 0.95)`
  - `box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)`
  - Creates floating, translucent effect

---

## Icons Used

All verified against `lucide-react`:

| Icon | Usage | Size |
|------|-------|------|
| `Menu` | Hamburger menu toggle | 24px |
| `X` | Close hamburger / search | 20-24px |
| `ChevronDown` | Mega menu dropdown indicator | 16px |
| `Sun` / `Moon` | Theme toggle | 20px |
| `Search` | Search trigger | 20px |
| `MapPin` | Tour/destination links | 20px |
| `Compass` | Wildlife/exploration links | 20px |
| `Hotel` | Accommodation links | 20px |
| `BookOpen` | "All" archive links | 20px |
| `Users` | About/team links | 20px |
| `Mail` | Contact link | 20px |
| `ArrowRight` | Special offers | 20px |
| `Star` | Reviews link | 20px |
| `Gift` | Special offers badge | 20px |
| `Globe` | Destination guides | 20px |
| `Newspaper` | Blog categories | 20px |
| `Heart` | Wildlife/why-book links | 20px |
| `CircleHelp` | FAQs link | 20px |

---

## Accessibility

### WCAG 2.1 AA Compliance

- ✅ Minimum 44px × 44px touch targets (tablet+)
- ✅ `aria-label` on all icon-only buttons
- ✅ `aria-expanded` on hamburger toggle
- ✅ Focus rings (`outline: 2px solid var(--color-ring)`) on all interactive elements
- ✅ Keyboard navigation (Tab, Enter, ESC)
- ✅ Semantic HTML (`<header>`, `<nav>`, `<button>`)
- ✅ Skip-to-content link provided by RootLayout
- ✅ Color-independent states (not relying on color alone)

### Keyboard Support

- **Tab:** Navigate through all interactive elements
- **Enter/Space:** Activate buttons
- **ESC:** Close search modal or mobile menu
- **Hover (desktop):** Open mega menus without clicking

---

## Design System Compliance

### Colors (100% CSS Variables)

```css
/* All colors use semantic tokens from /src/styles/theme.css */
color: var(--color-foreground);
background-color: var(--color-background);
border-color: var(--color-border);
background-color: var(--color-accent); /* Hover states */
color: var(--color-primary); /* Active links */
outline-color: var(--color-ring); /* Focus rings */
```

**No hardcoded colors. All values reference design system tokens.**

### Typography

```css
/* Navigation links */
font-family: var(--font-family-noto-sans);
font-size: 0.9375rem; /* 15px desktop, 16px XL */
font-weight: var(--font-weight-medium);

/* Mega menu section titles */
font-family: var(--font-family-lora);
font-size: 0.875rem;
font-weight: var(--font-weight-semibold);
```

**Only uses Lora (serif) and Noto Sans (sans-serif) from design system.**

### Spacing

```css
/* Responsive header height */
height: 4rem;   /* Mobile: 64px */
height: 4.5rem; /* Tablet: 72px */
height: 5rem;   /* Desktop: 80px */

/* Responsive actions gap */
gap: 0.25rem; /* Mobile */
gap: 0.5rem;  /* Tablet */
gap: 0.75rem; /* Desktop */
```

**All spacing uses design system scale (rem-based).**

---

## Styling

All styling uses BEM CSS classes in `/src/styles/parts/header.css`:

- **No inline styles** — All styling via external CSS
- **No hardcoded values** — All colors, fonts, spacing from CSS variables
- **No Tailwind classes in TSX** — Component uses semantic BEM classes only
- **Mobile-first approach** — Base styles target mobile, enhanced with media queries

---

## Related Components

- `Logo` (`/common/Logo.tsx`) — Site branding with `bare` prop
- `MobileMenuPattern` (`/patterns/MobileMenuPattern.tsx`) — Full-screen mobile nav
- `SearchBlock` (inline component) — Search modal functionality
- `NavigationBlock` (inline component) — Desktop mega menu navigation

---

## Performance

- ✅ Passive scroll listener for better performance
- ✅ Debounced mega menu close (150ms) prevents accidental closing
- ✅ CSS transitions only (no JavaScript animations)
- ✅ Single state toggle for scroll behavior
- ✅ Lazy rendering of mobile menu (conditional)

---

## Testing Checklist

### Visual Testing
- [ ] Logo displays correctly at all breakpoints
- [ ] Navigation items visible on desktop (1024px+)
- [ ] Hamburger hidden on desktop, visible on mobile/tablet
- [ ] Search icon visible at all breakpoints
- [ ] Theme toggle visible at all breakpoints
- [ ] Mega menus centered and properly sized
- [ ] Mobile menu opens without layout shift
- [ ] Scroll state adds backdrop-filter and shadow

### Interaction Testing
- [ ] Clicking logo navigates to home
- [ ] Desktop: Hovering nav item opens mega menu
- [ ] Desktop: Mega menu closes after 150ms when mouse leaves
- [ ] Mobile/Tablet: Hamburger opens mobile menu
- [ ] Search icon opens modal overlay
- [ ] Theme toggle switches between light/dark mode
- [ ] Mobile menu closes when clicking outside
- [ ] ESC key closes search and mobile menu

### Responsive Testing
- [ ] Test at 375px (iPhone SE)
- [ ] Test at 768px (iPad portrait)
- [ ] Test at 1024px (iPad landscape / small desktop)
- [ ] Test at 1280px (standard desktop)
- [ ] Test at 1920px (full HD)
- [ ] Test at 2560px+ (4K / ultra-wide)

### Accessibility Testing
- [ ] Tab through all interactive elements
- [ ] Focus rings visible on keyboard navigation
- [ ] Screen reader announces all buttons correctly
- [ ] Theme toggle announces current/next mode
- [ ] Hamburger announces expanded state
- [ ] All icons have aria-labels
- [ ] Touch targets meet 44px minimum (tablet+)

---

## Documentation

For detailed responsive layout breakdown and visual diagrams, see:
- **[HEADER-RESPONSIVE-LAYOUT.md](/HEADER-RESPONSIVE-LAYOUT.md)** — Complete responsive layout guide

---

**Last Updated:** December 2024  
**Design System Version:** V3 — WordPress-Native Alignment
