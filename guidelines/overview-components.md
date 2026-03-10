# Component Architecture Overview

## Purpose

This document provides a comprehensive overview of the React component architecture used in the LightSpeed Tour Operator plugin prototype. It maps components to WordPress block theme concepts and defines the organizational structure.

**🎨 DESIGN SYSTEM COMPLIANCE:**  
All components MUST use CSS custom properties defined in `/src/styles/theme.css`. Never hardcode colors, spacing, typography, borders, radius, or shadows. Use Tailwind classes that reference CSS variables or access variables directly in custom CSS.

---

## Directory Structure

```
/src/app/components/
├── blocks/           # WordPress block equivalents
├── common/           # Common reusable components
├── headers/          # Header patterns (Hero variants, page headers)
├── layout/           # Layout components (PageLayout)
├── nav/              # Navigation components
├── parts/            # Template parts (Header, Footer)
├── patterns/         # Reusable block patterns
└── ui/               # shadcn/ui library components ONLY
```

---

## Component Classification

### 1. Layout Components (`/src/app/components/layout/`)

**Purpose:** Top-level layout containers that define page structure.

| Component    | File               | WordPress Equivalent | Guideline                                     |
| ------------ | ------------------ | -------------------- | --------------------------------------------- |
| PageLayout   | `PageLayout.tsx`   | Template shell       | [components/PageLayout.md](components/PageLayout.md) |

**Import from pages:**
```typescript
import { PageLayout } from "../components/layout/PageLayout";
```

---

### 2. Template Parts (`/src/app/components/parts/`)

**Purpose:** Reusable template fragments that appear across multiple templates.

**WordPress Mapping:** `parts/*.html` in block themes

| Component  | File          | WordPress Equivalent | Guideline                                     |
| ---------- | ------------- | -------------------- | --------------------------------------------- |
| Header     | `Header.tsx`  | `parts/header.html`  | [components/SiteHeader.md](components/SiteHeader.md) |
| Footer     | `Footer.tsx`  | `parts/footer.html`  | [components/SiteFooter.md](components/SiteFooter.md) |
| FastFacts  | `FastFacts.tsx` | Custom template part | [components/FastFacts.md](components/FastFacts.md) |

**Import from PageLayout:**
```typescript
import { Header } from "../parts/Header";
import { Footer } from "../parts/Footer";
```

**Import from pages:**
```typescript
import { Header } from "../components/parts/Header";
```

---

### 3. Pattern Components (`/src/app/components/patterns/`)

**Purpose:** Reusable block patterns including Hero, ArchiveHeader, CardGrid, CTA, FAQ, and card variants.

**Contains:**
- Hero.tsx - Large introductory banner
- ArchiveHeader.tsx - Archive page header
- CardGrid.tsx - Responsive grid layout
- CTA.tsx - Call-to-action sections
- FAQ.tsx - Accordion FAQ component
- EditorialContent.tsx - Rich text content
- TaxonomyNav.tsx - Taxonomy navigation
- RelatedContent.tsx - Related posts/tours
- FastFacts.tsx - Quick facts display
- Card variants: TourCard, DestinationCard, BlogCard, AccommodationCard, SpecialCard, TeamCard

**WordPress Mapping:**
These map to WordPress patterns (`patterns/*.php`) that compose core blocks.

---

### 4. Common Components (`/src/app/components/common/`)

**Purpose:** Shared utility components used across multiple patterns.

| Component         | File                    | Purpose                    | Guideline                                                    |
| ----------------- | ----------------------- | -------------------------- | ------------------------------------------------------------ |
| Container         | `Container.tsx`         | Width/padding constraints  | [components/Container.md](components/Container.md)           |
| PageNav           | `PageNav.tsx`           | Page navigation            | N/A (auto-generated)                                         |
| Logo              | `Logo.tsx`              | Site branding              | [components/Logo.md](components/Logo.md)                     |
| ScrollBackToTop   | `ScrollBackToTop.tsx`   | Back-to-top button         | [components/ScrollBackToTop.md](components/ScrollBackToTop.md) |
| ScrollDownArrow   | `ScrollDownArrow.tsx`   | Scroll indicator           | [components/ScrollDownArrow.md](components/ScrollDownArrow.md) |
| LayoutSwitcher    | `LayoutSwitcher.tsx`    | Grid/list view toggle      | [components/LayoutSwitcher.md](components/LayoutSwitcher.md) |

**Import from components:**
```typescript
import { Container } from "../common/Container";
```

---

### 5. Block Components (`/src/app/components/blocks/`)

**Purpose:** React implementations of WordPress core blocks and tour operator blocks.

**WordPress Mapping:** Core blocks like `core/query`, `core/post-content`, and custom tour operator blocks.

**Tour Operator Blocks:**

| Component | File | WordPress Block | Guideline |
|-----------|------|----------------|-----------|
| RelatedToursBlock | `tour-operator/RelatedToursBlock.tsx` | `lsx-tour-operator/tour-related-tour` | [blocks/tour-related-tour.md](blocks/tour-related-tour.md) |
| ToursForDestinationBlock | `tour-operator/ToursForDestinationBlock.tsx` | `lsx-tour-operator/tour-related-destination` | [blocks/tour-related-destination.md](blocks/tour-related-destination.md) |
| RelatedAccommodationsBlock | `tour-operator/RelatedAccommodationsBlock.tsx` | `lsx-tour-operator/accommodation-related-accommodation` | [blocks/accommodation-related-accommodation.md](blocks/accommodation-related-accommodation.md) |
| RelatedReviewsBlock | `tour-operator/RelatedReviewsBlock.tsx` | `lsx-tour-operator/review-related-accommodation` | [blocks/review-related-accommodation.md](blocks/review-related-accommodation.md) |
| RelatedRegionsBlock | `tour-operator/RelatedRegionsBlock.tsx` | `lsx-tour-operator/related-regions` | [blocks/related-regions.md](blocks/related-regions.md) |

**Import from pages:**
```typescript
import { RelatedToursBlock } from "../components/blocks/tour-operator/RelatedToursBlock";
import { ToursForDestinationBlock } from "../components/blocks/tour-operator/ToursForDestinationBlock";
```

**See also:** [blocks/overview-blocks.md](blocks/overview-blocks.md) for complete block documentation

---

### 6. Navigation Components (`/src/app/components/nav/`)

**Purpose:** Navigation-specific components.

| Component      | File                 | Purpose                | Guideline                               |
| -------------- | -------------------- | ---------------------- | --------------------------------------- |
| Breadcrumbs    | `Breadcrumbs.tsx`    | Breadcrumb navigation  | [components/Breadcrumbs.md](components/Breadcrumbs.md) |
| Pagination     | `Pagination.tsx`     | Page number navigation | [components/Pagination.md](components/Pagination.md)   |

---

### 7. Header Components (`/src/app/components/headers/`)

**Purpose:** Specialized header pattern variants.

| Component      | File                 | Purpose                | Guideline                               |
| -------------- | -------------------- | ---------------------- | --------------------------------------- |
| *Future use*   | N/A                  | Hero variants          | N/A                                     |

---

### 8. UI Components (`/src/app/components/ui/`)

**Purpose:** shadcn/ui design system components ONLY.

**CRITICAL:** This directory is exclusively for shadcn/ui library components. Do NOT add custom components here.

**Usage:**
```typescript
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle } from "../components/ui/card";
```

---

## React Component Hierarchy

```
App.tsx
└── PageLayout
    ├── Header (template part)
    │   ├── Container
    │   ├── Logo
    │   └── PageNav
    ├── Main (template)
    │   ├── Hero (pattern)
    │   │   └── Container
    │   ├── ArchiveHeader (pattern)
    │   │   └── Container
    │   ├── TaxonomyNav (pattern)
    │   │   └── Container
    │   ├── CardGrid (pattern)
    │   │   ├── Container
    │   │   └── [Card Components]
    │   ├── EditorialContent (pattern)
    │   │   └── Container
    │   ├── FastFacts (part)
    │   │   └── Container
    │   ├── RelatedContent (pattern)
    │   │   ├── Container
    │   │   └── CardGrid
    │   └── CTA (pattern)
    │       └── Container
    └── Footer (template part)
        └── Container
```

---

## Import Path Rules

**All imports must use relative paths.**

### From Pages (`/src/app/pages/*.tsx`):

```typescript
// Layout
import { PageLayout } from "../components/layout/PageLayout";

// Parts
import { Header } from "../components/parts/Header";
import { Footer } from "../components/parts/Footer";

// Patterns
import { Hero } from "../components/patterns/Hero";
import { CardGrid } from "../components/patterns/CardGrid";

// Common
import { Container } from "../components/common/Container";

// Utilities
import { cn } from "../lib/utils";

// Hooks
import { useIsMobile } from "../hooks/use-mobile";

// Data
import { TOURS, DESTINATIONS } from "../data/mock";
import type { Tour, Destination } from "../data/types";
```

### From Patterns (`/src/app/components/patterns/*.tsx`):

```typescript
// Common
import { Container } from "../common/Container";

// UI
import { Button } from "../ui/button";

// Utilities
import { cn } from "../../lib/utils";
```

### From Parts (`/src/app/components/parts/*.tsx`):

```typescript
// Common
import { Container } from "../common/Container";
import { Logo } from "../common/Logo";

// Patterns
import { TaxonomyNav } from "../patterns/TaxonomyNav";

// Utilities
import { cn } from "../../lib/utils";
```

---

## Component Guidelines

Each component has detailed guidelines in the `guidelines/components/` directory. **Always read the component-specific guideline before using it.**

**Major Components:**

- [PageLayout.md](components/PageLayout.md) - Page layout wrapper
- [SiteHeader.md](components/SiteHeader.md) - Site header
- [SiteFooter.md](components/SiteFooter.md) - Site footer
- [Hero.md](components/Hero.md) - Hero pattern
- [ArchiveHeader.md](components/ArchiveHeader.md) - Archive header
- [CardGrid.md](components/CardGrid.md) - Card grid pattern
- [TourCard.md](components/TourCard.md) - Tour card
- [CTA.md](components/CTA.md) - Call-to-action pattern
- [Container.md](components/Container.md) - Container component
- [Logo.md](components/Logo.md) - Logo component
- [ScrollBackToTop.md](components/ScrollBackToTop.md) - Back to top button
- [ScrollDownArrow.md](components/ScrollDownArrow.md) - Scroll indicator
- [LayoutSwitcher.md](components/LayoutSwitcher.md) - Grid/list toggle

---

## WordPress Mapping

| React Location              | WordPress Equivalent        | Purpose                          |
| --------------------------- | --------------------------- | -------------------------------- |
| `/src/app/pages/`           | `templates/*.html`          | Page templates                   |
| `/src/app/components/parts/` | `parts/*.html`              | Template parts                   |
| `/src/app/components/patterns/` | `patterns/*.php`         | Block patterns                   |
| `/src/app/components/blocks/` | Core/custom blocks         | Block implementations            |
| `/src/app/components/layout/` | Template shell             | Overall page structure           |

---

## Rules & Constraints

1. **No numbered backups:** Never create files like `Component-2.tsx` or `App-10.tsx`
2. **Relative imports only:** No absolute paths or webpack aliases
3. **shadcn/ui only in `/ui/`:** Custom components go in appropriate category folders
4. **Read guidelines first:** Always check component-specific guidelines before use
5. **WordPress mapping:** Every component should map to a WordPress block theme concept
6. **Import from data:** Use mock data from `/src/app/data/`, not hardcoded values
7. **Design tokens:** Use CSS variables from theme.css for all styling
8. **CSS Variables Required:** NEVER hardcode colors, spacing, fonts, borders, radius, or shadows
9. **Typography:** Use semantic HTML (h1-h6, p) for automatic styling; avoid Tailwind text classes unless intentionally overriding

---

## Next Steps

- Review [overview-patterns.md](overview-patterns.md) for pattern composition rules
- Review [overview-blocks.md](overview-blocks.md) for block component reference
- Review [overview-parts.md](overview-parts.md) for template parts reference
- Review [overview-icons.md](overview-icons.md) for icon usage guidelines
- Review design token files in `design-tokens/` for styling system