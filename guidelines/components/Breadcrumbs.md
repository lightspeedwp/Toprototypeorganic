# Breadcrumbs Component Documentation

**Version:** 2.0  
**Status:** Production Ready  
**Category:** Navigation Components  
**Last Updated:** February 16, 2026

---

## Overview

The Breadcrumbs component is the **single source of truth** for all breadcrumb navigation across the prototype. Every page uses exactly ONE instance — never duplicated, never inline markup.

**Architecture:**
- **Component:** `/src/app/components/common/Breadcrumbs.tsx`
- **Stylesheet:** `/src/styles/breadcrumbs.css` (dedicated, imported via `index.css`)
- **Wrapper:** `/src/app/components/common/DevToolsBreadcrumbs.tsx` (thin convenience wrapper for dev-tools pages)

---

## Critical Rules

1. **ONE breadcrumb per page** — never render two breadcrumb components on the same page
2. **Always use `Breadcrumbs` or `DevToolsBreadcrumbs`** — never create inline breadcrumb markup
3. **All styling in `breadcrumbs.css`** — never add breadcrumb styles to other CSS files or use inline styles
4. **Use `<Link>` from react-router** — for SPA navigation (not `<a>` tags)
5. **Typography: Noto Sans only** — breadcrumbs are UI elements, never headings

---

## Component API

### Breadcrumbs (Canonical)

```typescript
interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** URL path (omit for current page) */
  href?: string;
  /** Mark as current page — renders as text, not a link */
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  /** Ordered array of breadcrumb items (root -> current page) */
  items: BreadcrumbItem[];
  /** Additional CSS classes on the <nav> element */
  className?: string;
  /** When true, renders a full-width bar with background and border */
  withBar?: boolean;
}
```

### DevToolsBreadcrumbs (Convenience Wrapper)

```typescript
interface DevToolsBreadcrumbsProps {
  /** Current page title (last breadcrumb item) */
  currentPage: string;
  /** Optional additional CSS classes */
  className?: string;
}
```

Internally renders: `Home > Dev Tools > [currentPage]`

---

## Usage Examples

### Standard Page

```tsx
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { Container } from "../components/common/Container";

// Wrap in a bar div + Container for consistent full-width strip
<div className="breadcrumb-bar">
  <Container>
    <Breadcrumbs
      items={[
        { label: "Home", href: "/" },
        { label: "Tours", href: "/tours" },
        { label: "Iceland Explorer", isCurrent: true },
      ]}
    />
  </Container>
</div>
```

### Dev Tools Sub-page

```tsx
import { DevToolsBreadcrumbs } from "../components/common/DevToolsBreadcrumbs";

// Renders its own bar wrapper + Container — just pass the page title
<DevToolsBreadcrumbs currentPage="Typography Specimens" />
```

### Using withBar Prop (Self-contained)

```tsx
<Breadcrumbs
  withBar
  items={[
    { label: "Home", href: "/" },
    { label: "About", isCurrent: true },
  ]}
/>
```

---

## CSS Classes (from `/src/styles/breadcrumbs.css`)

| Class | Element | Purpose |
|---|---|---|
| `.breadcrumb-bar` | `<div>` | Full-width strip with background + border |
| `.breadcrumb-nav` | `<nav>` | Navigation wrapper with padding |
| `.breadcrumb-list` | `<ol>` | Flex list container |
| `.breadcrumb-item` | `<li>` | Individual breadcrumb item |
| `.breadcrumb-link` | `<Link>` | Ancestor link styling |
| `.breadcrumb-current` | `<span>` | Current page label |
| `.breadcrumb-separator` | `<svg>` | Chevron icon between items |

All CSS values reference CSS custom properties from `theme-light.css` / `theme-dark.css`:
- Colors: `var(--color-muted)`, `var(--color-border)`, `var(--color-foreground)`, `var(--color-muted-foreground)`
- Typography: `var(--font-family-noto-sans)`, `var(--text-sm)`
- Spacing: `var(--spacing-element-sm)`
- Radius: `var(--radius-sm)`

---

## Accessibility

- `aria-label="Breadcrumb"` on `<nav>`
- `aria-current="page"` on current item
- `aria-hidden="true"` on separator icons
- Semantic `<nav>` > `<ol>` > `<li>` structure
- Focus-visible styling via `.breadcrumb-link:focus-visible`
- Tab navigation through all ancestor links

---

## File Locations

```
/src/app/components/common/Breadcrumbs.tsx        # Canonical component
/src/app/components/common/DevToolsBreadcrumbs.tsx # Dev-tools wrapper
/src/styles/breadcrumbs.css                        # Dedicated stylesheet
```

---

## Related Components

- **Container** — Wrap breadcrumbs in Container for consistent width
- **Header** — Breadcrumbs sit immediately below the site header
- **RootLayout** — Provides header/footer; breadcrumbs go in page content

---

## Checklist (Before Every Page)

- [ ] Page has exactly ONE breadcrumb component (Breadcrumbs or DevToolsBreadcrumbs)
- [ ] Breadcrumbs appear immediately below the site header
- [ ] Uses `breadcrumb-bar` class wrapper (or DevToolsBreadcrumbs which includes it)
- [ ] Items array starts with `{ label: "Home", href: "/" }`
- [ ] Final item has `isCurrent: true`
- [ ] No inline breadcrumb markup anywhere
- [ ] No duplicate breadcrumb components
