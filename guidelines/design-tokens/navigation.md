# Navigation Design Tokens

**Source of Truth:** `/src/styles/parts/header.css`, `/src/styles/parts/mega-menu.css`, `/src/styles/theme-light.css`
**Pattern Reference:** `/guidelines/patterns/navigation-links.md`
**Last Verified:** March 13, 2026
**Status:** Active

---

## Purpose

Defines navigation styling tokens — header nav, mobile menu, breadcrumbs, pagination, and taxonomy filters. All navigation elements must use design tokens for consistent behaviour across modes.

---

## Header Navigation

### Desktop Nav Links

| Property | Token | Value |
|----------|-------|-------|
| Font | `var(--font-family-noto-sans)` | Noto Sans |
| Weight | `var(--font-weight-medium)` | 500 |
| Color (default) | `var(--foreground)` | Black / White |
| Color (hover) | `var(--accent-foreground)` | High contrast on accent bg |
| Color (active) | `var(--primary)` | Olive green |
| Height | `var(--header-bar-height)` | 64–80px fluid |
| Touch target | `var(--touch-target-min)` | 44px minimum |

### Mobile Navigation

| Property | Token | Notes |
|----------|-------|-------|
| Menu background | `var(--background)` | Full-screen overlay |
| Link height | `var(--touch-target-min)` | 44px minimum per item |
| Spacing | `var(--spacing-gap-xs)` | Between menu items |
| Font size | `var(--text-lg)` | Larger for touch |

---

## Breadcrumbs

| Property | Token | Usage |
|----------|-------|-------|
| Font | `var(--font-family-noto-sans)` | Body font |
| Size | `var(--text-sm)` | Small/meta text |
| Color (link) | `var(--primary)` | Clickable breadcrumbs |
| Color (current) | `var(--muted-foreground)` | Current page (not clickable) |
| Separator | `var(--muted-foreground)` | `/` or `>` character |
| Gap | `var(--spacing-gap-xs)` | Between items |

---

## Pagination

| Property | Token | Usage |
|----------|-------|-------|
| Button size | `var(--touch-target-min)` | 44px minimum |
| Active background | `var(--primary)` | Current page |
| Active text | `var(--primary-foreground)` | White on primary |
| Default text | `var(--foreground)` | Other pages |
| Border | `var(--border)` | Page number borders |
| Radius | `var(--radius-md)` | Consistent with buttons |

---

## Taxonomy Filter Bar

| Property | Token | Usage |
|----------|-------|-------|
| Chip height | `var(--touch-target-min)` | 44px minimum |
| Chip padding | `var(--spacing-element-xs) var(--spacing-element-sm)` | Internal spacing |
| Active background | `var(--primary)` | Selected filter |
| Active text | `var(--primary-foreground)` | White |
| Default background | `var(--muted)` | Unselected |
| Default text | `var(--foreground)` | Dark text |
| Gap | `var(--spacing-gap-xs)` | Between chips |
| Font | `var(--font-family-noto-sans)` | Body font |
| Weight | `var(--font-weight-medium)` | 500 |

---

## Link vs Button Rules

| Element | Use When | HTML |
|---------|----------|------|
| `<a>` | Navigation to a URL | `<a href="/path">` |
| `<button>` | Action (filter, toggle, submit) | `<button type="button">` |
| `<Link>` | React Router navigation | `<Link to="/path">` |

**Never use `<a href="#">`** — use `<button>` for actions or `<Link>` for navigation.

---

## Focus States

All navigation elements MUST have visible focus indicators:

```css
.wp-part-header__nav-link:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

---

## Skip Links

Pages with significant navigation MUST include a skip-to-content link:

```tsx
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to content
</a>
```

---

## Related Guidelines

| Guideline | Relationship |
|-----------|-------------|
| `/guidelines/patterns/navigation-links.md` | Full navigation pattern guide |
| `/guidelines/components/Header.md` | Header component spec |
| `/guidelines/components/Breadcrumbs.md` | Breadcrumb component spec |
| `/guidelines/components/Pagination.md` | Pagination component spec |
