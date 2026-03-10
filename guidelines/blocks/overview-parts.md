# WordPress Template Parts Overview

## Purpose

This document defines **WordPress template parts** (`parts/*.html`) and their React implementations.

---

## What Are Template Parts?

In WordPress block themes, **template parts** are reusable fragments that appear across multiple templates:

- **Structural** - Define page structure (header, footer)
- **Reusable** - Used by all or most templates
- **No content assumptions** - Work with any content type
- **Persistent** - Consistent across site

---

## Core Template Parts

### Site Header

**File:** `/src/app/components/parts/Header.tsx`

**WordPress:** `parts/header.html`

**Purpose:** Site-wide navigation header

**Contains:**
- Logo
- Primary navigation
- Mobile menu toggle
- Search (optional)

**Guideline:** [parts/Header.md](../parts/Header.md)

**Usage:**
```typescript
import { Header } from "../components/parts/Header";

<PageLayout>
  <Header />
  {/* Page content */}
</PageLayout>
```

**WordPress Equivalent:**
```html
<!-- parts/header.html -->
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
  <!-- wp:site-logo /-->
  <!-- wp:navigation /-->
</div>
<!-- /wp:group -->
```

---

### Site Footer

**File:** `/src/app/components/parts/Footer.tsx`

**WordPress:** `parts/footer.html`

**Purpose:** Site-wide footer

**Contains:**
- Footer navigation
- Copyright notice
- Social links (optional)
- Contact information (optional)

**Guideline:** [parts/Footer.md](../parts/Footer.md)

**Usage:**
```typescript
import { Footer } from "../components/parts/Footer";

<PageLayout>
  {/* Page content */}
  <Footer />
</PageLayout>
```

**WordPress Equivalent:**
```html
<!-- parts/footer.html -->
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
  <!-- wp:navigation /-->
  <!-- wp:paragraph {"align":"center"} -->
  <p>© 2024 LightSpeed Tours</p>
  <!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
```

---

### Page Layout

**File:** `/src/app/components/layout/PageLayout.tsx`

**WordPress:** Template shell (not a part, but structural)

**Purpose:** Overall page structure wrapper

**Contains:**
- Header part
- Main content area
- Footer part
- Global utilities (BackToTopButton)

**Guideline:** [components/PageLayout.md](../components/PageLayout.md)

**Usage:**
```typescript
import { PageLayout } from "../components/layout/PageLayout";

<PageLayout>
  <Hero />
  <CardGrid />
  <CTA />
</PageLayout>
```

**WordPress Equivalent:**
```html
<!-- templates/archive-tour.html -->
<!-- wp:template-part {"slug":"header"} /-->

<!-- wp:group {"tagName":"main"} -->
<main>
  <!-- Template content here -->
</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer"} /-->
```

---

## Template Part Rules

### 1. Structural Only

Template parts define **structure**, not content:

**✅ Good:**
```typescript
export function Header() {
  return (
    <header className="bg-sidebar text-sidebar-foreground">
      <Container>
        <Logo />
        <PageNav />
      </Container>
    </header>
  );
}
```

**❌ Bad:**
```typescript
export function Header({ tourName }) {
  return (
    <header>
      <h1>{tourName}</h1> {/* Content-specific */}
    </header>
  );
}
```

---

### 2. No Content Assumptions

Template parts must work with **any content type**:

**✅ Good:**
```typescript
// Works for tours, destinations, blog posts, etc.
export function Header() {
  return (
    <header>
      <Logo />
      <PageNav />
    </header>
  );
}
```

---

### 3. Consistent Across Site

Template parts should be **visually consistent**:

**✅ Good:**
```typescript
// Same header on all pages
<PageLayout>
  <Header /> {/* Identical across site */}
  <Content />
</PageLayout>
```

---

## Template Part Customization

### Customization in WordPress

In WordPress, template parts can have **variations**:

```php
// Main header
get_template_part('parts/header');

// Alternative header (if exists)
get_template_part('parts/header', 'minimal');
```

**Files:**
- `parts/header.html` - Default header
- `parts/header-minimal.html` - Minimal variant

---

## React to WordPress Mapping

| React Component | WordPress Part | Purpose |
|----------------|----------------|---------|
| `Header.tsx` | `parts/header.html` | Site header |
| `Footer.tsx` | `parts/footer.html` | Site footer |
| `PageLayout.tsx` | Template shell | Page structure |

---

## Template Part Areas

WordPress defines **template part areas**:

```json
{
  "templateParts": [
    {
      "name": "header",
      "area": "header",
      "title": "Header"
    },
    {
      "name": "footer",
      "area": "footer",
      "title": "Footer"
    }
  ]
}
```

**Areas:**
- `header` - Site header
- `footer` - Site footer
- `uncategorized` - Other template parts

---

## Common Patterns

### Standard Page Layout
```typescript
<PageLayout>
  <Header />
  <main>
    {/* Page patterns */}
  </main>
  <Footer />
  <BackToTopButton />
</PageLayout>
```

### Full-Width Page
```typescript
<PageLayout>
  <Header />
  <main className="w-full">
    {/* Full-width content */}
  </main>
  <Footer />
</PageLayout>
```

---

## Related Documentation

- [parts/Header.md](../parts/Header.md) - Header guidelines
- [parts/Footer.md](../parts/Footer.md) - Footer guidelines
- [blocks/overview-patterns.md](overview-patterns.md) - Pattern compositions
- [blocks/overview-templates.md](overview-templates.md) - Page templates
