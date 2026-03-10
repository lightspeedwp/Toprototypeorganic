# System Architecture

**Version:** V3 — WordPress-Native Alignment

This document provides a **comprehensive architectural overview** of the LightSpeed Tour Operator plugin prototype, explaining how the React implementation maps deterministically to WordPress block theme architecture.

---

## 1. Purpose & Scope

### 1.1 What This Prototype Is

The LightSpeed Tour Operator plugin prototype is a **content-first, structural validation system** that demonstrates:

* How canonical content types (Tours, Destinations, Accommodation, etc.) work together
* How reusable block patterns compose into page templates
* How WordPress block theme architecture (templates, parts, patterns, theme.json) translates to React
* How content models drive layout decisions (not vice versa)

### 1.2 What This Prototype Is NOT

This prototype explicitly does **not** cover:

* Visual design exploration, branding, or polish
* Custom typography or color systems beyond the design tokens
* Decorative styling, illustrations, or effects
* One-off page layouts or pattern variants not in the approved catalogue
* New content types or taxonomies

---

## 2. Core Architectural Principles

### 2.1 WordPress-First Mental Model

**Everything maps to WordPress block theme concepts:**

| React Location              | WordPress Equivalent        | Purpose                          |
| --------------------------- | --------------------------- | -------------------------------- |
| `/src/app/pages/`           | `templates/*.html`          | Page templates                   |
| `/src/app/components/parts/` | `parts/*.html`              | Template parts                   |
| `/src/app/components/patterns/` | `patterns/*.php`         | Block patterns                   |
| `/src/app/components/blocks/` | Core/custom blocks         | Block implementations            |
| `/src/app/components/common/` | Utility components         | Shared utilities (not WP blocks) |
| `/src/app/data/`            | Mock content                | Content models & sample data     |
| `/src/styles/theme.css`     | `theme.json`                | Design system tokens             |

### 2.2 System-First, Not Page-First

Build **reusable patterns**, not one-off layouts:

* ✅ Create a reusable Hero pattern that works for all page types
* ❌ Create a custom hero just for the Tours page

### 2.3 Patterns Over One-Off Layouts

Every page must be assembled **exclusively from approved patterns**:

* ✅ Assemble pages from Hero + CardGrid + CTA
* ❌ Create a unique layout mixing patterns in novel ways

### 2.4 Content Drives Layout

Layout adapts to content, not vice versa:

* ✅ If content is missing, omit the pattern or show empty state
* ❌ Force content into a layout structure

### 2.5 Deterministic Composition

Same inputs produce same outputs:

* ✅ Same content type + same template = same structure
* ❌ Layout varies based on editorial discretion

---

## 3. System Layers

The prototype is organized into **four architectural layers**:

### 3.1 Layer 1: Design Tokens (`/src/styles/`)

**Purpose:** CSS custom properties that define the visual system

**Files:**
- `theme.css` - All CSS variables (colors, typography, spacing, etc.)
- `fonts.css` - Font imports
- `index.css` - Global styles
- `tailwind.css` - Tailwind imports

**Rules:**
- All styling must use CSS variables from theme.css
- Tokens are semantic, not literal (e.g., `--primary` not `--green`)
- Supports automatic dark mode via CSS variable substitution

**Related Guidelines:**
- [design-tokens/colors.md](design-tokens/colors.md)
- [design-tokens/typography.md](design-tokens/typography.md)
- [design-tokens/spacing.md](design-tokens/spacing.md)
- [design-tokens/borders.md](design-tokens/borders.md)
- [design-tokens/radii.md](design-tokens/radii.md)
- [design-tokens/shadows.md](design-tokens/shadows.md)

---

### 3.2 Layer 2: Content Models (`/src/app/data/`)

**Purpose:** TypeScript interfaces and mock data for all content types

**Files:**
- `types.ts` - TypeScript interfaces for all content types
- `mock.ts` - Sample data exports for all content types

**Content Types:**
- **Post Types:** Tours, Destinations, Accommodation, Specials, Team, Reviews, Blog Posts, Pages
- **Taxonomies:** Travel Styles, Accommodation Types, Continents, Brands, Facilities, Blog Categories, Blog Tags

**Rules:**
- Never hardcode content in components
- Always import from mock data files
- Content types are **fixed** - do not invent new ones

**Related Guidelines:**
- [Guidelines.md](Guidelines.md#content-architecture)

---

### 3.3 Layer 3: Components (`/src/app/components/`)

**Purpose:** Reusable React components that map to WordPress concepts

**Organization:**

```
components/
├── blocks/          # WordPress block equivalents
│   ├── nav/         # Navigation blocks
│   ├── listing/     # Listing/query blocks
│   ├── meta/        # Meta/structured data blocks
│   ├── related/     # Related content blocks
│   ├── cta/         # Call-to-action blocks
│   ├── utility/     # Utility blocks (FAQ, forms)
│   └── state/       # Empty/loading states
├── patterns/        # Composed block groups
│   ├── hero/        # Hero patterns
│   ├── header/      # Archive/page headers
│   └── content/     # Editorial content patterns
├── parts/           # Template parts
│   ├── Header.tsx   # Site header
│   ├── Footer.tsx   # Site footer
│   └── PageLayout.tsx # Layout shell
├── common/          # Shared utility components
│   ├── Container.tsx
│   ├── Logo.tsx
│   ├── BackToTopButton.tsx
│   └── ScrollDownArrow.tsx
└── ui/              # shadcn/ui library components ONLY
```

**Mental Model:**

* **Blocks** = atomic, reusable, content-aware
* **Patterns** = editorial structure (composed blocks)
* **Templates** = enforced order + hierarchy
* **Parts** = site chrome (header, footer, layout)

**Related Guidelines:**
- [overview-components.md](overview-components.md)
- [blocks/overview-blocks.md](blocks/overview-blocks.md)
- [blocks/overview-patterns.md](blocks/overview-patterns.md)
- [blocks/overview-parts.md](blocks/overview-parts.md)

---

### 3.4 Layer 4: Templates (`/src/app/pages/`)

**Purpose:** Page-level compositions that enforce section order

**Files:**
- `ToursArchive.tsx` - Tours content hub
- `DestinationsArchive.tsx` - Destinations content hub
- `AccommodationArchive.tsx` - Accommodation content hub
- `TaxonomyArchive.tsx` - Taxonomy archive template
- `TourSingle.tsx` - Single tour detail
- `DestinationSingle.tsx` - Single destination detail
- `BlogArchive.tsx` - Blog listing
- `AboutPage.tsx` - About page
- `ContactPage.tsx` - Contact page
- `FAQPage.tsx` - FAQ page

**Template Archetypes:**

1. **Content Hub** - Top-level discovery (Hero → Filter → CardGrid → CTA)
2. **Taxonomy Archive** - Filtered views (ArchiveHeader → Nav → CardGrid → CTA)
3. **Single Detail** - Consumption → conversion (Hero → Editorial → Meta → Related → CTA)
4. **Editorial Listing** - Blog discovery (ArchiveHeader → CardGrid → Pagination)
5. **Utility Page** - Support pages (Hero → Editorial → Utility Block → CTA)

**Related Guidelines:**
- [blocks/overview-templates.md](blocks/overview-templates.md)
- [Guidelines.md](Guidelines.md#page-archetypes)

---

## 4. WordPress Block Theme Mapping

### 4.1 Template Hierarchy

WordPress resolves templates in this order:

```
1. {posttype}-{slug}.html       (single-tour-iceland-explorer.html)
2. {posttype}.html              (single-tour.html)
3. single.html                  (fallback single template)
4. index.html                   (global fallback)
```

**React Equivalent:**

```typescript
// /src/app/pages/TourSingle.tsx
export default function TourSingle({ slug }: { slug: string }) {
  const tour = TOURS.find(t => t.slug === slug);
  return (
    <PageLayout>
      <Hero title={tour.title} />
      <EditorialContent content={tour.content} />
      <FastFacts facts={tourFacts} />
      <RelatedContent items={relatedTours} />
      <CTA title="Book This Tour" />
    </PageLayout>
  );
}
```

### 4.2 Template Parts

WordPress template parts are reusable fragments:

```html
<!-- parts/header.html -->
<!-- wp:group {"layout":{"type":"constrained"}} -->
  <!-- wp:site-logo /-->
  <!-- wp:navigation /-->
<!-- /wp:group -->
```

**React Equivalent:**

```typescript
// /src/app/components/parts/Header.tsx
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

### 4.3 Block Patterns

WordPress block patterns are saved block compositions:

```php
// patterns/hero.php
register_block_pattern('lightspeed/hero', [
  'title' => 'Hero',
  'content' => '
    <!-- wp:group {"layout":{"type":"constrained"}} -->
      <!-- wp:heading {"level":1} /-->
      <!-- wp:paragraph /-->
    <!-- /wp:group -->
  '
]);
```

**React Equivalent:**

```typescript
// /src/app/components/patterns/Hero.tsx
export function Hero({ title, excerpt }: HeroProps) {
  return (
    <section>
      <Container>
        <h1>{title}</h1>
        <p>{excerpt}</p>
      </Container>
    </section>
  );
}
```

### 4.4 theme.json

WordPress uses `theme.json` to define design tokens:

```json
{
  "version": 2,
  "settings": {
    "color": {
      "palette": [
        { "slug": "primary", "color": "#4a7311" },
        { "slug": "secondary", "color": "#ac9f7c" }
      ]
    },
    "typography": {
      "fontSizes": [
        { "slug": "base", "size": "16px" },
        { "slug": "xl", "size": "20px" }
      ]
    }
  }
}
```

**React Equivalent:**

```css
/* /src/styles/theme.css */
:root {
  --primary: rgba(74, 115, 17, 1);
  --secondary: rgba(172, 159, 124, 1);
  --text-base: 16px;
  --text-xl: 20px;
}
```

---

## 5. Data Flow Architecture

### 5.1 Content → Component → Template

```
1. Mock Data (/src/app/data/mock.ts)
   ↓
2. Import in Template (/src/app/pages/TourSingle.tsx)
   ↓
3. Pass to Pattern (/src/app/components/patterns/Hero.tsx)
   ↓
4. Render with Design Tokens (CSS variables)
```

**Example:**

```typescript
// 1. Define in mock data
export const TOURS: Tour[] = [
  {
    id: '1',
    title: 'Iceland Explorer',
    excerpt: 'Discover the land of fire and ice...',
    // ...
  }
];

// 2. Import in template
import { TOURS } from '../data/mock';

// 3. Pass to pattern
<Hero title={tour.title} excerpt={tour.excerpt} />

// 4. Render with tokens
<h1 className="text-foreground">{title}</h1>
```

### 5.2 Props Flow

```
Page Template
  ↓ (content object)
Pattern Component
  ↓ (specific props)
Block Component
  ↓ (primitive props)
UI Component
```

**Example:**

```typescript
// Page
<Hero tour={tour} />

// Pattern
<Hero {...tour} />
  <Container>
    <Heading level={1}>{tour.title}</Heading>
  </Container>

// Block
<Heading level={1}>{tour.title}</Heading>
  <h1>{tour.title}</h1>

// UI (semantic HTML)
<h1>{tour.title}</h1>
```

---

## 6. Styling Architecture

### 6.1 Token-Based System

All styling uses CSS custom properties from `/src/styles/theme.css`:

**Typography:**
```css
--font-family-lora: 'Lora', serif;
--font-family-noto-sans: 'Noto Sans', sans-serif;
--text-4xl: 60px;  /* h1 */
--text-2xl: 32px;  /* h2 */
--text-xl: 20px;   /* h3 */
```

**Colors:**
```css
--primary: rgba(74, 115, 17, 1);
--secondary: rgba(172, 159, 124, 1);
--accent: rgba(247, 174, 0, 1);
```

**Spacing:**
```css
/* Uses Tailwind's default 4px scale */
p-4  /* 16px */
p-6  /* 24px */
gap-8  /* 32px */
```

**Borders & Radius:**
```css
--radius: 4px;
--radius-sm: 2px;
--radius-md: 4px;
--radius-lg: 6px;
--radius-xl: 8px;
```

**Shadows:**
```css
--elevation-sm: 0px 4px 0px 0px rgba(0, 0, 0, 1);
```

### 6.2 Tailwind Usage

**✅ Allowed:**
```typescript
<div className="bg-primary text-primary-foreground p-6 rounded-md shadow-sm">
  Uses design tokens
</div>
```

**❌ Prohibited:**
```typescript
<div className="bg-green-600 text-xl font-bold">
  Hardcoded values
</div>
```

### 6.3 Typography Defaults

**Do NOT use Tailwind typography classes unless intentionally deviating:**

```typescript
// ✅ Good - uses default typography
<h2>Section Title</h2>  // Gets 32px, Lora, semibold automatically

// ❌ Bad - overrides defaults unnecessarily
<h2 className="text-2xl font-bold">Section Title</h2>
```

---

## 7. Import Conventions

### 7.1 Relative Paths Only

**All imports must use relative paths from the importing file.**

**✅ Good:**
```typescript
import { Container } from "../common/Container";
import { TOURS } from "../../data/mock";
```

**❌ Bad:**
```typescript
import { Container } from "@/components/common/Container";
import { TOURS } from "/src/app/data/mock";
```

### 7.2 Import Patterns

**From Pages:**
```typescript
import { PageLayout } from "../components/layout/PageLayout";
import { Hero } from "../components/patterns/Hero";
import { Container } from "../components/common/Container";
import { TOURS } from "../data/mock";
```

**From Patterns:**
```typescript
import { Container } from "../common/Container";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
```

**From Blocks:**
```typescript
import { Card } from "../ui/card";
import { cn } from "../../../lib/utils";
```

---

## 8. Accessibility Architecture

All components must meet **WCAG 2.1 AA** standards:

### 8.1 Heading Hierarchy
- One H1 per page
- Logical progression (H1 → H2 → H3)
- No skipped levels

### 8.2 Keyboard Navigation
- All interactive elements keyboard-reachable
- Logical tab order
- Visible focus states using `ring-ring`

### 8.3 Color Independence
- Information not conveyed by color alone
- Sufficient contrast ratios (4.5:1 for normal text, 3:1 for large text)

### 8.4 Semantic HTML
- Use proper HTML elements (`<button>`, `<nav>`, `<main>`, `<article>`)
- Proper ARIA labels where needed
- Proper form labels and associations

### 8.5 Empty States
- Never show blank areas
- Explicit empty-state messages
- Announced to screen readers

---

## 9. Migration Path to WordPress

### 9.1 Phase 1: React Prototype (Current)

**Purpose:** Validate content models and pattern composition

**Output:** Working React prototype with:
- Approved patterns catalogue
- Content type definitions
- Design token system
- Template archetypes

### 9.2 Phase 2: WordPress Block Theme

**Purpose:** Translate React patterns to WordPress blocks

**Tasks:**
1. Create `theme.json` from CSS variables
2. Register block patterns in PHP
3. Create template files (`*.html`)
4. Create template parts (`parts/*.html`)
5. Implement custom blocks (if needed)

### 9.3 Phase 3: WordPress Plugin

**Purpose:** Package as reusable plugin

**Tasks:**
1. Register custom post types (Tours, Destinations, etc.)
2. Register taxonomies (Travel Styles, etc.)
3. Create admin UI for content management
4. Register block patterns and templates
5. Enqueue frontend assets

---

## 10. Component Hierarchy

```
App.tsx
└── PageLayout (template shell)
    ├── Header (template part)
    │   ├── Container
    │   ├── Logo
    │   └── PageNav
    ├── Main (template content)
    │   ├── Hero (pattern)
    │   │   └── Container
    │   ├── ArchiveHeader (pattern)
    │   │   └── Container
    │   ├── TaxonomyNav (pattern)
    │   │   └── Container
    │   ├── CardGrid (pattern)
    │   │   ├── Container
    │   │   └── [Card Components] (blocks)
    │   ├── EditorialContent (pattern)
    │   │   └── Container
    │   ├── FastFacts (pattern)
    │   │   └── Container
    │   ├── RelatedContent (pattern)
    │   │   ├── Container
    │   │   └── CardGrid
    │   └── CTA (pattern)
    │       └── Container
    ├── Footer (template part)
    │   └── Container
    └── BackToTopButton (utility)
```

---

## 11. File Organization Standards

### 11.1 File Naming

**✅ Good:**
```
TourCard.tsx
EditorialContent.tsx
FastFacts.tsx
```

**❌ Bad:**
```
tour-card.tsx
TourCard-2.tsx
TourCard-backup.tsx
```

### 11.2 Component File Structure

```typescript
// Imports
import { Container } from "../common/Container";
import { Button } from "../ui/button";
import type { Tour } from "../../data/types";

// Types
interface TourCardProps {
  tour: Tour;
  variant?: 'default' | 'compact';
}

// Component
export function TourCard({ tour, variant = 'default' }: TourCardProps) {
  return (
    <article className="bg-card text-card-foreground">
      {/* Component content */}
    </article>
  );
}
```

### 11.3 Never Create Numbered Backups

**❌ Prohibited:**
- `App-2.tsx`
- `App-3.tsx`
- `Component-backup.tsx`
- `Component-old.tsx`

**✅ Always modify the original file directly**

---

## 12. Testing Strategy

### 12.1 Content Testing

- Test with missing content (empty states)
- Test with minimal content (1-2 items)
- Test with maximum content (pagination)
- Test with long titles and descriptions

### 12.2 Responsive Testing

- Mobile (320px - 767px)
- Tablet (768px - 1023px)
- Desktop (1024px+)
- Wide screens (1440px+)

### 12.3 Accessibility Testing

- Keyboard navigation
- Screen reader testing
- Color contrast verification
- Focus state visibility

---

## 13. Related Documentation

### Core Guidelines
- [Guidelines.md](Guidelines.md) - Main entry point
- [overview-components.md](overview-components.md) - Component architecture
- [overview-patterns.md](overview-patterns.md) - Pattern composition
- [overview-icons.md](overview-icons.md) - Icon system

### Design Tokens
- [design-tokens/colors.md](design-tokens/colors.md)
- [design-tokens/typography.md](design-tokens/typography.md)
- [design-tokens/spacing.md](design-tokens/spacing.md)
- [design-tokens/borders.md](design-tokens/borders.md)
- [design-tokens/radii.md](design-tokens/radii.md)
- [design-tokens/shadows.md](design-tokens/shadows.md)

### WordPress Mapping
- [blocks/overview-blocks.md](blocks/overview-blocks.md)
- [blocks/overview-patterns.md](blocks/overview-patterns.md)
- [blocks/overview-parts.md](blocks/overview-parts.md)
- [blocks/overview-templates.md](blocks/overview-templates.md)

---

## 14. Quick Reference

### Design Principles
1. **WordPress-first** - Everything maps to WP concepts
2. **System-first** - Reusable patterns, not one-off layouts
3. **Content-driven** - Layout adapts to content
4. **Token-based** - All styling via CSS variables
5. **Accessible** - WCAG 2.1 AA compliance
6. **Deterministic** - Same inputs = same outputs

### File Locations
- **Tokens:** `/src/styles/theme.css`
- **Data:** `/src/app/data/`
- **Components:** `/src/app/components/`
- **Templates:** `/src/app/pages/`
- **Guidelines:** `/guidelines/`

### Import Rules
- ✅ Relative paths only
- ❌ No absolute paths
- ❌ No webpack aliases

### Styling Rules
- ✅ Use CSS variables
- ✅ Use Tailwind semantic classes
- ❌ No hardcoded values
- ❌ No Tailwind typography classes (unless intentional)

---

This architecture ensures that the React prototype can be **deterministically translated** to a WordPress block theme with zero interpretation required.
