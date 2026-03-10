# Component Index

**Version:** V3 — WordPress-Native Alignment

This document provides a **comprehensive index** of all components in the LightSpeed Tour Operator plugin prototype, organized by category and WordPress mapping.

---

## Quick Navigation

- [Template Parts](#template-parts) - Header, Footer, Layout
- [Patterns](#patterns) - Hero, CardGrid, CTA, etc.
- [Blocks](#blocks) - Nav, Listing, Meta, etc.
- [Common Components](#common-components) - Container, Logo, etc.
- [UI Components](#ui-components) - shadcn/ui library
- [Page Templates](#page-templates) - Archive, Single, Utility

---

## Template Parts

**WordPress Mapping:** `parts/*.html`

**Location:** `/src/app/components/parts/`

| Component | File | Purpose | Guideline |
|-----------|------|---------|-----------|
| Header | `Header.tsx` | Site header with navigation | [parts/Header.md](parts/Header.md) |
| Footer | `Footer.tsx` | Site footer | [parts/Footer.md](parts/Footer.md) |
| PageLayout | `layout/PageLayout.tsx` | Overall page structure | [components/PageLayout.md](components/PageLayout.md) |

---

## Patterns

**WordPress Mapping:** `patterns/*.php` or registered block patterns

**Location:** `/src/app/components/patterns/`

### Header Patterns

| Component | File | Purpose | Guideline |
|-----------|------|---------|-----------|
| Hero | `Hero.tsx` | Page hero section | [components/Hero.md](components/Hero.md) |
| ArchiveHeader | `ArchiveHeader.tsx` | Archive page header | [components/ArchiveHeader.md](components/ArchiveHeader.md) |

### Content Patterns

| Component | File | Purpose | Guideline |
|-----------|------|---------|-----------|
| EditorialContent | `EditorialContent.tsx` | Long-form content | [components/EditorialContent.md](components/EditorialContent.md) |
| FastFacts | `FastFacts.tsx` | Meta/quick facts | [components/FastFacts.md](components/FastFacts.md) |
| FAQ | `FAQ.tsx` | FAQ accordion | [components/FAQ.md](components/FAQ.md) |

### Navigation Patterns

| Component | File | Purpose | Guideline |
|-----------|------|---------|-----------|
| TaxonomyNav | `TaxonomyNav.tsx` | Taxonomy filter navigation | [patterns/TaxonomyNav.md](patterns/TaxonomyNav.md) |

### Listing Patterns

| Component | File | Purpose | Guideline |
|-----------|------|---------|-----------|
| CardGrid | `CardGrid.tsx` | Grid of cards | [components/CardGrid.md](components/CardGrid.md) |
| RelatedContent | `RelatedContent.tsx` | Related items section | [patterns/RelatedContent.md](patterns/RelatedContent.md) |

### Card Components

| Component | File | Purpose | Content Type |
|-----------|------|---------|--------------|
| TourCard | `TourCard.tsx` | Tour card | Tours |
| DestinationCard | `DestinationCard.tsx` | Destination card | Destinations |
| AccommodationCard | `AccommodationCard.tsx` | Accommodation card | Accommodation |
| SpecialCard | `SpecialCard.tsx` | Special offer card | Specials |
| TeamCard | `TeamCard.tsx` | Team member card | Team |
| BlogCard | `BlogCard.tsx` | Blog post card | Blog Posts |

### Call-to-Action Patterns

| Component | File | Purpose | Guideline |
|-----------|------|---------|-----------|
| CTA | `CTA.tsx` | Call-to-action block | [components/CTA.md](components/CTA.md) |

---

## Blocks

**WordPress Mapping:** Core/custom blocks

**Location:** `/src/app/components/blocks/`

### Navigation Blocks

| Component | File | Purpose | WordPress Block |
|-----------|------|---------|-----------------|
| TaxonomyFilterBar | `blocks/nav/TaxonomyFilterBar.tsx` | Filter bar | Custom |
| TaxonomySiblingNav | `blocks/nav/TaxonomySiblingNav.tsx` | Sibling navigation | Custom |
| Pagination | `blocks/nav/Pagination.tsx` | Page navigation | core/query-pagination |

### Listing Blocks

| Component | File | Purpose | WordPress Block |
|-----------|------|---------|-----------------|
| CardGrid | `blocks/listing/CardGrid.tsx` | Card grid layout | core/query |
| CardTour | `blocks/listing/CardTour.tsx` | Tour card | core/post-template |
| CardDestination | `blocks/listing/CardDestination.tsx` | Destination card | core/post-template |
| CardAccommodation | `blocks/listing/CardAccommodation.tsx` | Accommodation card | core/post-template |
| CardPost | `blocks/listing/CardPost.tsx` | Blog post card | core/post-template |

### Meta Blocks

| Component | File | Purpose | WordPress Block |
|-----------|------|---------|-----------------|
| MetaBlock | `blocks/meta/MetaBlock.tsx` | Structured metadata | Custom |

### Related Blocks

| Component | File | Purpose | WordPress Block |
|-----------|------|---------|-----------------|
| RelatedSection | `blocks/related/RelatedSection.tsx` | Related content | Custom |
| RelatedStack | `blocks/related/RelatedStack.tsx` | Stacked related items | Custom |

### CTA Blocks

| Component | File | Purpose | WordPress Block |
|-----------|------|---------|-----------------|
| PrimaryCTA | `blocks/cta/PrimaryCTA.tsx` | Primary call-to-action | core/buttons |

### Utility Blocks

| Component | File | Purpose | WordPress Block |
|-----------|------|---------|-----------------|
| FaqAccordion | `blocks/utility/FaqAccordion.tsx` | FAQ accordion | Custom |
| ContactForm | `blocks/utility/ContactForm.tsx` | Contact form | Custom |

### State Blocks

| Component | File | Purpose | WordPress Block |
|-----------|------|---------|-----------------|
| EmptyState | `blocks/state/EmptyState.tsx` | Empty state message | N/A |
| LoadingState | `blocks/state/LoadingState.tsx` | Loading indicator | N/A |

---

## Common Components

**WordPress Mapping:** Utility components (not WordPress blocks)

**Location:** `/src/app/components/common/`

| Component | File | Purpose | Guideline |
|-----------|------|---------|-----------|
| Container | `Container.tsx` | Width constraints | [components/Container.md](components/Container.md) |
| Logo | `Logo.tsx` | Site branding | [components/Logo.md](components/Logo.md) |
| BackToTopButton | `BackToTopButton.tsx` | Scroll to top | [components/ScrollBackToTop.md](components/ScrollBackToTop.md) |
| ScrollDownArrow | `ScrollDownArrow.tsx` | Scroll indicator | [components/ScrollDownArrow.md](components/ScrollDownArrow.md) |
| PageNav | `PageNav.tsx` | Navigation menu | N/A |

---

## UI Components

**WordPress Mapping:** shadcn/ui library (not WordPress blocks)

**Location:** `/src/app/components/ui/`

**CRITICAL:** This directory is exclusively for shadcn/ui library components. Do NOT add custom components here.

### Common UI Components

| Component | File | Purpose |
|-----------|------|---------|
| Button | `button.tsx` | Button primitive |
| Card | `card.tsx` | Card container |
| Accordion | `accordion.tsx` | Accordion primitive |
| Dialog | `dialog.tsx` | Modal dialog |
| Dropdown Menu | `dropdown-menu.tsx` | Dropdown menu |
| Input | `input.tsx` | Form input |
| Label | `label.tsx` | Form label |
| Textarea | `textarea.tsx` | Text area input |
| Select | `select.tsx` | Select dropdown |
| Tabs | `tabs.tsx` | Tab navigation |
| Alert | `alert.tsx` | Alert message |
| Badge | `badge.tsx` | Badge/tag |
| Separator | `separator.tsx` | Divider line |
| Skeleton | `skeleton.tsx` | Loading skeleton |

---

## Page Templates

**WordPress Mapping:** `templates/*.html`

**Location:** `/src/app/pages/`

### Archive Templates

| Template | File | Archetype | WordPress Template |
|----------|------|-----------|-------------------|
| Tours Archive | `ToursArchive.tsx` | Content Hub | archive-tour.html |
| Destinations Archive | `DestinationsArchive.tsx` | Content Hub | archive-destination.html |
| Accommodation Archive | `AccommodationArchive.tsx` | Content Hub | archive-accommodation.html |
| Blog Archive | `BlogArchive.tsx` | Editorial Listing | home.html / archive.html |
| Team Archive | `TeamArchive.tsx` | Content Hub | archive-team.html |

### Taxonomy Templates

| Template | File | Archetype | WordPress Template |
|----------|------|-----------|-------------------|
| Taxonomy Archive | `TaxonomyArchive.tsx` | Taxonomy Archive | taxonomy-*.html |

### Single Templates

| Template | File | Archetype | WordPress Template |
|----------|------|-----------|-------------------|
| Tour Single | `TourSingle.tsx` | Single Detail | single-tour.html |
| Destination Single | `DestinationSingle.tsx` | Single Detail | single-destination.html |

### Utility Pages

| Template | File | Archetype | WordPress Template |
|----------|------|-----------|-------------------|
| About Page | `AboutPage.tsx` | Utility Page | page-about.html |
| Contact Page | `ContactPage.tsx` | Utility Page | page-contact.html |
| FAQ Page | `FAQPage.tsx` | Utility Page | page-faq.html |

---

## Component Hierarchy

```
App.tsx
└── PageLayout
    ├── Header (part)
    │   ├── Container
    │   ├── Logo
    │   └── PageNav
    ├── Main (template content)
    │   ├── Hero (pattern)
    │   │   └── Container
    │   ├── TaxonomyNav (pattern)
    │   │   └── Container
    │   ├── CardGrid (pattern)
    │   │   ├── Container
    │   │   └── [Card Components]
    │   ├── EditorialContent (pattern)
    │   │   └── Container
    │   ├── FastFacts (pattern)
    │   │   └── Container
    │   ├── RelatedContent (pattern)
    │   │   ├── Container
    │   │   └── CardGrid
    │   └── CTA (pattern)
    │       └── Container
    ├── Footer (part)
    │   └── Container
    └── BackToTopButton
```

---

## Import Path Reference

### From Pages

```typescript
import { PageLayout } from "../components/layout/PageLayout";
import { Header } from "../components/parts/Header";
import { Hero } from "../components/patterns/Hero";
import { Container } from "../components/common/Container";
import { TOURS } from "../data/mock";
```

### From Patterns

```typescript
import { Container } from "../common/Container";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
```

### From Blocks

```typescript
import { Card } from "../../ui/card";
import { cn } from "../../../lib/utils";
```

---

## Component Guidelines

Each component should have a guideline file in the appropriate directory:

- **Common components:** `guidelines/components/[ComponentName].md`
- **Patterns:** `guidelines/patterns/[pattern-name].md`
- **Blocks:** `guidelines/blocks/[block-name].md`
- **Parts:** `guidelines/parts/[PartName].md`

**Always read the component-specific guideline before using it.**

---

## WordPress Mapping Summary

| React Location | WordPress Equivalent | Component Count |
|----------------|---------------------|-----------------|
| `/src/app/pages/` | `templates/*.html` | ~10 templates |
| `/src/app/components/parts/` | `parts/*.html` | 3 parts |
| `/src/app/components/patterns/` | `patterns/*.php` | ~15 patterns |
| `/src/app/components/blocks/` | Core/custom blocks | ~20 blocks |
| `/src/app/components/common/` | Utility components | 5 components |
| `/src/app/components/ui/` | shadcn/ui library | ~30+ components |

---

## Finding Components

### By Purpose

**Need a layout wrapper?** → `Container` (common)
**Need a page structure?** → `PageLayout` (parts)
**Need a hero section?** → `Hero` (patterns)
**Need a card grid?** → `CardGrid` (patterns)
**Need a button?** → `Button` (ui)

### By Content Type

**Tours** → `TourCard`, `TourSingle`
**Destinations** → `DestinationCard`, `DestinationSingle`
**Accommodation** → `AccommodationCard`, `AccommodationArchive`
**Blog** → `BlogCard`, `BlogArchive`

### By Template Archetype

**Content Hub** → `Hero` + `TaxonomyNav` + `CardGrid` + `CTA`
**Taxonomy Archive** → `ArchiveHeader` + `TaxonomyNav` + `CardGrid`
**Single Detail** → `Hero` + `EditorialContent` + `FastFacts` + `RelatedContent` + `CTA`

---

## Related Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [Guidelines.md](Guidelines.md) - Main guidelines
- [overview-components.md](overview-components.md) - Component architecture
- [overview-patterns.md](overview-patterns.md) - Pattern composition
- [blocks/overview-blocks.md](blocks/overview-blocks.md) - Block reference
- [blocks/overview-patterns.md](blocks/overview-patterns.md) - Pattern reference
- [blocks/overview-parts.md](blocks/overview-parts.md) - Parts reference
- [blocks/overview-templates.md](blocks/overview-templates.md) - Template reference
