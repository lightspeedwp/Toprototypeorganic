# Logo Component

## Purpose

The Logo component provides consistent site branding across the application. It renders the Tour Operator Web Solutions wordmark as inline SVG with automatic light/dark mode switching.

---

## Component Location

**Files:**
- `/src/app/components/common/Logo.tsx` — Main Logo component
- `/src/app/components/common/LogoSVG.tsx` — Inline SVG components (`LogoLight`, `LogoDark`)
- `/src/app/components/blocks/theme/SiteLogo.tsx` — WordPress block equivalent

**Category:** Common component

---

## Usage

### Basic Usage

```typescript
import { Logo } from "../common/Logo";

<Logo />
```

### In Header (inside a button — use `bare` prop)

```typescript
import { Logo } from "../common/Logo";

<button onClick={handleNavigateHome} aria-label="Home">
  <Logo bare />
</button>
```

### Size Variants

```typescript
<Logo size="sm" />  // 40px / 48px (mobile/desktop)
<Logo size="md" />  // 48px / 56px
<Logo size="lg" />  // 64px / 80px
<Logo size="xl" />  // 80px / 96px
```

---

## Props

```typescript
interface LogoProps {
  /** Optional additional CSS classes */
  className?: string;

  /** Size variant: 'sm' | 'md' | 'lg' | 'xl' (default: 'sm') */
  size?: "sm" | "md" | "lg" | "xl";

  /** Optional click handler. Overrides default scroll-to-top. */
  onClick?: () => void;

  /**
   * When true, renders only the SVG images without an <a> wrapper.
   * Use this when the Logo is already inside a clickable parent (e.g., <button>).
   * Prevents invalid nested interactive element HTML.
   * @default false
   */
  bare?: boolean;
}
```

---

## Implementation

The Logo uses **inline SVG components** rather than `<img src>` references, ensuring reliable rendering in all environments (including Figma Make sandbox).

### Inline SVG Architecture

```
Logo.tsx
  └── LogoSVG.tsx
        ├── LogoLight  — dark text wordmark (uses currentColor)
        └── LogoDark   — white text wordmark (uses currentColor)
```

- **Wordmark text** uses `currentColor` — automatically inherits from `text-foreground`
- **Brand icon colours** are hardcoded (acceptable exception per guidelines):
  - Teal circle: `#66C0B8`
  - Orange play button: `#FF6B3B`
  - Light accents: `#F0F9F8` / `#E0F2F1`

### Light/Dark Mode Switching

```tsx
<LogoLight className="block dark:hidden text-foreground" />
<LogoDark className="hidden dark:block text-foreground" />
```

---

## Design Specifications

### Size Scale

| Size | Mobile Height | Desktop Height |
|------|---------------|----------------|
| sm   | 40px (h-10)   | 48px (h-12)    |
| md   | 48px (h-12)   | 56px (h-14)    |
| lg   | 64px (h-16)   | 80px (h-20)    |
| xl   | 80px (h-20)   | 96px (h-24)    |

Width scales automatically via `w-auto` to maintain aspect ratio.

### Behaviour

- **Click (default):** Scrolls to top of page
- **Click (with onClick):** Executes custom handler
- **Click (bare mode):** No click behaviour (parent handles it)
- **Hover:** Opacity transition to 80%
- **Focus:** Visible ring indicator (`ring-ring`)

---

## Accessibility

### Link Semantics (default mode)

```tsx
<a href="/" aria-label="Tour Operator Web Solutions - Home">
  <LogoLight aria-hidden="true" />
</a>
```

### Bare Mode (inside interactive parent)

```tsx
<button aria-label="Tour Operator Web Solutions - Home">
  <Logo bare />  {/* No <a> wrapper — avoids nested interactive elements */}
</button>
```

### Screen Reader

- SVGs have `aria-hidden="true"` (decorative)
- Link or button parent provides the accessible label

---

## WordPress Mapping

**WordPress Equivalent:** `core/site-logo` block

```html
<!-- wp:site-logo {"width":180,"shouldSyncIcon":false} /-->
```

---

## Related Components

- `SiteLogo` (`/blocks/theme/SiteLogo.tsx`) — WordPress block equivalent with external src support
- `Header` (`/parts/Header.tsx`) — Uses `<Logo bare />` inside a `<button>`
- `Footer` (`/parts/Footer.tsx`) — Uses `<Logo bare />` inside a `<button>`
