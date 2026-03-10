# Breadcrumbs Pattern

**Category:** Navigation  
**WordPress Equivalent:** Group block + Navigation block  
**Section Styles:** `section-breadcrumbs-default`  
**Status:** ✅ Documented

---

## Overview

Provides hierarchical navigation trail showing user's location within site structure. Improves navigation and SEO.

---

## WordPress Block Structure

```
Group {
  className: "section-breadcrumbs-default"
  
  Inner Blocks:
    └── Container
          └── Breadcrumbs
                ├── Link { text: "Home", href: "/" }
                ├── Separator { text: "›" }
                ├── Link { text: "Tours", href: "/tours" }
                ├── Separator { text: "›" }
                ├── Link { text: "Adventure", href: "/travel-styles/adventure" }
                ├── Separator { text: "›" }
                └── Span { text: "Iceland Explorer", ariaCurrent: "page" }
}
```

---

## Section Styles

```css
.section-breadcrumbs-default {
  background: var(--background);
  border-bottom: 1px solid var(--border);
  padding: var(--spacing-element-sm);
}

.section-breadcrumbs-default nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-gap-xs);
  font-size: var(--text-sm);
}

.section-breadcrumbs-default a {
  color: var(--muted-foreground);
  text-decoration: none;
}

.section-breadcrumbs-default a:hover {
  color: var(--primary);
  text-decoration: underline;
}

.section-breadcrumbs-default .separator {
  color: var(--muted-foreground);
  user-select: none;
}

.section-breadcrumbs-default [aria-current="page"] {
  color: var(--foreground);
  font-weight: var(--font-weight-medium);
}
```

---

## Design Token Usage

### Colors
- Link: `text-muted-foreground` → `var(--muted-foreground)`
- Link hover: `text-primary` → `var(--primary)`
- Current page: `text-foreground` → `var(--foreground)`
- Separator: `text-muted-foreground`

### Typography
- Font size: `text-sm` → `var(--text-sm)`
- Current page weight: `font-medium` → `var(--font-weight-medium)`

---

## Props Interface

```typescript
interface BreadcrumbsPatternProps {
  items: Array<{
    label: string;
    href?: string;  // undefined for current page
  }>;
  separator?: string;
}
```

---

## Usage Examples

```typescript
<BreadcrumbsPattern
  items={[
    { label: "Home", href: "/" },
    { label: "Tours", href: "/tours" },
    { label: "Adventure", href: "/travel-styles/adventure" },
    { label: "Iceland Explorer" }  // Current page (no href)
  ]}
  separator="›"
/>
```

---

## Accessibility Requirements

- [ ] Use `<nav aria-label="Breadcrumb">`
- [ ] Current page has `aria-current="page"`
- [ ] Links keyboard navigable
- [ ] Separators have `aria-hidden="true"`

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete

