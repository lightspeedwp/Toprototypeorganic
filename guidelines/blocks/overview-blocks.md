# WordPress Blocks Overview

## Purpose

This document defines the **WordPress block equivalents** and their React implementations for the LightSpeed Tour Operator plugin prototype.

---

## What Are Blocks?

In WordPress block themes, **blocks** are the fundamental building units:

- **Atomic** - One responsibility per block
- **Reusable** - Can be used across multiple templates
- **Content-aware** - Handle missing or malformed data gracefully
- **Accessible** - Meet WCAG 2.1 AA standards by default

---

## Block Categories

### Core Content Blocks (`/blocks/core/`) - NEW Phase 0

**Purpose:** Essential content blocks with semantic HTML and automatic design system styling

| Block | File | WordPress Equivalent | Purpose | Guideline |
|-------|------|---------------------|---------|-----------|
| HeadingBlock | `HeadingBlock.tsx` | `core/heading` | Semantic headings (h1-h6) with fluid typography | [blocks/core/heading.md](/guidelines/blocks/core/heading.md) |
| ParagraphBlock | `ParagraphBlock.tsx` | `core/paragraph` | Body text with automatic styling | [blocks/core/paragraph.md](/guidelines/blocks/core/paragraph.md) |
| ImageBlock | `ImageBlock.tsx` | `core/image` | Responsive images with captions | [blocks/core/image.md](/guidelines/blocks/core/image.md) |
| ListBlock | `ListBlock.tsx` | `core/list` | Ordered/unordered lists with custom markers | [blocks/core/list.md](/guidelines/blocks/core/list.md) |
| SpacerBlock | `SpacerBlock.tsx` | `core/spacer` | Vertical spacing between sections | [blocks/core/spacer.md](/guidelines/blocks/core/spacer.md) |

**Key Principles:**
- ✅ Typography is **automatic** via semantic HTML (h1-h6, p, li)
- ✅ NO Tailwind typography classes (text-4xl, font-bold) unless intentionally overriding
- ✅ Font families, sizes, weights, line-heights from CSS variables
- ✅ Use `<h2>` instead of `<div className="text-4xl font-semibold">`

**Examples:**
```typescript
import { HeadingBlock, ParagraphBlock, ImageBlock, ListBlock, SpacerBlock } from "../blocks/core";

// Heading with automatic typography
<HeadingBlock level={2}>
  Featured Tours
</HeadingBlock>

// Paragraph with automatic styling
<ParagraphBlock>
  Discover unforgettable wildlife experiences across Africa.
</ParagraphBlock>

// Image with caption
<ImageBlock 
  src="/images/safari.jpg" 
  alt="Lions in Masai Mara"
  caption="Male lion pride in Masai Mara National Reserve"
/>

// List with checkmark markers
<ListBlock 
  marker="checkmark"
  items={[
    "Accommodation",
    "All meals",
    "Safari guide"
  ]}
/>

// Spacer for vertical spacing
<SpacerBlock height="lg" />
```

---

### Design Blocks (`/blocks/design/`)

**Purpose:** Foundational design elements and UI components

| Block | File | WordPress Equivalent | Purpose |
|-------|------|---------------------|------------|
| Button | `Button.tsx` | `core/button` | Individual button (link or action) |
| Buttons | `Buttons.tsx` | `core/buttons` | Container for multiple buttons |
| Group | `Group.tsx` | `core/group` | Versatile container for grouping blocks |
| Grid | `Grid.tsx` | `core/grid` | CSS Grid layout with auto-fill or fixed columns |
| Stack | `Stack.tsx` | `core/stack` | Vertical flex container with consistent spacing |
| Row | `Row.tsx` | `core/row` | Horizontal flex container for inline content |
| Columns | `Columns.tsx` + `Column.tsx` | `core/columns` + `core/column` | Multi-column layouts (1-6 columns) |

**Documentation:** 
- Buttons: `/guidelines/blocks/design/buttons.md`
- Group: `/guidelines/blocks/design/group.md`
- Grid: `/guidelines/blocks/design/grid.md`
- Stack: `/guidelines/blocks/design/stack.md`
- Row: `/guidelines/blocks/design/row.md`
- Columns: `/guidelines/blocks/design/columns.md`

**Examples:**
```typescript
import { Button, Buttons, Group, Grid, Stack, Row, Columns, Column } from "../blocks/design";

// Button group
<Buttons orientation="horizontal" gap="4" align="center">
  <Button variant="primary">Get Started</Button>
  <Button variant="secondary">Learn More</Button>
</Buttons>

// Section wrapper
<Group as="section" className="bg-muted py-16">
  <h2>Section Title</h2>
  <p>Content...</p>
</Group>

// Card grid
<Grid columns={3} gap="6">
  <Card />
  <Card />
  <Card />
</Grid>

// Vertical stack
<Stack gap="4">
  <Card />
  <Card />
  <Card />
</Stack>

// Horizontal row
<Row gap="4" justify="center">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</Row>

// Two columns
<Columns columns={2} gap="6">
  <Column>
    <h3>Left</h3>
  </Column>
  <Column>
    <h3>Right</h3>
  </Column>
</Columns>
```

---

### Navigation Blocks (`/blocks/nav/`)

**Purpose:** Navigation, filtering, and pagination components

| Block | File | WordPress Equivalent | Purpose |
|-------|------|---------------------|---------|
| TaxonomyFilterBar | `TaxonomyFilterBar.tsx` | Custom block | Filter by taxonomy terms |
| TaxonomySiblingNav | `TaxonomySiblingNav.tsx` | Custom block | Navigate sibling terms |
| Pagination | `Pagination.tsx` | `core/query-pagination` | Page number navigation |

---

### Listing Blocks (`/blocks/listing/`)

**Purpose:** Display collections of content

| Block | File | WordPress Equivalent | Purpose |
|-------|------|---------------------|---------|
| CardGrid | `CardGrid.tsx` | `core/query` + `core/post-template` | Grid layout for cards |
| CardTour | `CardTour.tsx` | `core/post-template` (Tours) | Single tour card |
| CardDestination | `CardDestination.tsx` | `core/post-template` (Destinations) | Single destination card |
| CardAccommodation | `CardAccommodation.tsx` | `core/post-template` (Accommodation) | Single accommodation card |
| CardPost | `CardPost.tsx` | `core/post-template` (Posts) | Single blog post card |

**Example:**
```typescript
import { CardGrid } from "../blocks/listing/CardGrid";
import { CardTour } from "../blocks/listing/CardTour";

<CardGrid items={tours} CardComponent={CardTour} />
```

---

### Meta Blocks (`/blocks/meta/`)

**Purpose:** Structured metadata display

| Block | File | WordPress Equivalent | Purpose |
|-------|------|---------------------|---------|
| MetaBlock | `MetaBlock.tsx` | Custom block | Key/value metadata pairs |

**Example:**
```typescript
import { MetaBlock } from "../blocks/meta/MetaBlock";

<MetaBlock
  items={[
    { icon: Calendar, label: "Duration", value: "8 days" },
    { icon: Users, label: "Group Size", value: "12-16" }
  ]}
/>
```

---

### Related Blocks (`/blocks/related/`)

**Purpose:** Related content discovery

| Block | File | WordPress Equivalent | Purpose |
|-------|------|---------------------|---------|
| RelatedSection | `RelatedSection.tsx` | Custom block | Related content container |
| RelatedStack | `RelatedStack.tsx` | Custom block | Vertical stack of related items |

---

### Tour Operator Blocks (`/blocks/tour-operator/`)

**Purpose:** Tour operator-specific related content blocks

| Block | File | WordPress Equivalent | Purpose |
|-------|------|---------------------|---------|
| RelatedToursBlock | `RelatedToursBlock.tsx` | `lsx-tour-operator/tour-related-tour` | Similar tours on tour pages |
| ToursForDestinationBlock | `ToursForDestinationBlock.tsx` | `lsx-tour-operator/tour-related-destination` | Tours visiting a destination |
| RelatedAccommodationsBlock | `RelatedAccommodationsBlock.tsx` | `lsx-tour-operator/accommodation-related-accommodation` | Similar accommodations |
| RelatedReviewsBlock | `RelatedReviewsBlock.tsx` | `lsx-tour-operator/review-related-accommodation` | Customer reviews for accommodations |
| RelatedRegionsBlock | `RelatedRegionsBlock.tsx` | `lsx-tour-operator/related-regions` | Child regions/nearby areas |

**Documentation:**
- Related Tours (Tour): `/guidelines/blocks/tour-related-tour.md`
- Tours for Destination: `/guidelines/blocks/tour-related-destination.md`
- Related Accommodations: `/guidelines/blocks/accommodation-related-accommodation.md`
- Related Reviews: `/guidelines/blocks/review-related-accommodation.md`
- Related Regions: `/guidelines/blocks/related-regions.md`

**Examples:**
```typescript
import { RelatedToursBlock } from "../blocks/tour-operator/RelatedToursBlock";
import { ToursForDestinationBlock } from "../blocks/tour-operator/ToursForDestinationBlock";
import { RelatedAccommodationsBlock } from "../blocks/tour-operator/RelatedAccommodationsBlock";
import { RelatedReviewsBlock } from "../blocks/tour-operator/RelatedReviewsBlock";
import { RelatedRegionsBlock } from "../blocks/tour-operator/RelatedRegionsBlock";

// On tour single page - show similar tours
<RelatedToursBlock
  currentTourId={tour.id}
  travelStyles={tour.travelStyles}
  destinations={tour.destinations}
  postsPerPage={3}
  onNavigate={(slug) => navigateToTour(slug)}
/>

// On destination page - show tours visiting this destination
<ToursForDestinationBlock
  destinationId={destination.id}
  postsPerPage={6}
  onNavigate={(slug) => navigateToTour(slug)}
/>

// On accommodation page - show customer reviews
<RelatedReviewsBlock
  accommodationId={accommodation.id}
  postsPerPage={6}
/>

// On accommodation page - show similar properties
<RelatedAccommodationsBlock
  currentAccommodationId={accommodation.id}
  destinationId={accommodation.destinationId}
  postsPerPage={3}
  onNavigate={(slug) => navigateToAccommodation(slug)}
/>

// On destination page - show child regions
<RelatedRegionsBlock
  parentId={destination.id}
  layout="grid"
  columns={3}
  onNavigate={(slug) => navigateToDestination(slug)}
/>
```

---

### CTA Blocks (`/blocks/cta/`)

**Purpose:** Call-to-action elements

| Block | File | WordPress Equivalent | Purpose |
|-------|------|---------------------|---------|
| PrimaryCTA | `PrimaryCTA.tsx` | `core/buttons` | Primary action button |

---

### Utility Blocks (`/blocks/utility/`)

**Purpose:** Specialized utility components

| Block | File | WordPress Equivalent | Purpose |
|-------|------|---------------------|---------|
| FaqAccordion | `FaqAccordion.tsx` | Custom block | FAQ accordion |
| ContactForm | `ContactForm.tsx` | Custom block | Contact form |

---

### State Blocks (`/blocks/state/`)

**Purpose:** Loading and empty states

| Block | File | WordPress Equivalent | Purpose |
|-------|------|---------------------|---------|
| EmptyState | `EmptyState.tsx` | N/A | Empty state message |
| LoadingState | `LoadingState.tsx` | N/A | Loading indicator |

**Example:**
```typescript
import { EmptyState } from "../blocks/state/EmptyState";

{items.length === 0 ? (
  <EmptyState
    icon={Search}
    message="No tours found"
    description="Try adjusting your filters"
  />
) : (
  <CardGrid items={items} CardComponent={CardTour} />
)}
```

---

### Theme Blocks (`/blocks/theme/`)

**Purpose:** WordPress theme-specific blocks

| Block | File | WordPress Equivalent | Purpose |
|-------|------|---------------------|------------|
| Navigation | `Navigation.tsx` | `core/navigation` | Site navigation menu |
| Search | `Search.tsx` | `core/search` | Search input block |
| SiteLogo | `SiteLogo.tsx` | `core/site-logo` | Site logo display |
| SiteTitle | `SiteTitle.tsx` | `core/site-title` | Site title display |
| SiteTagline | `SiteTagline.tsx` | `core/site-tagline` | Site tagline display |
| TemplatePart | `TemplatePart.tsx` | `core/template-part` | Template part insertion |

**Documentation:**
- Navigation: `/guidelines/blocks/theme/navigation.md`
- Search: `/guidelines/blocks/theme/search.md`
- Site Logo: `/guidelines/blocks/theme/site-logo.md`
- Site Title: `/guidelines/blocks/theme/site-title.md`
- Site Tagline: `/guidelines/blocks/theme/site-tagline.md`
- Template Part: `/guidelines/blocks/theme/template-part.md`

**Examples:**
```typescript
import { Navigation, Search, SiteLogo, SiteTitle, SiteTagline } from "../blocks/theme";

// Header navigation
<Navigation
  menuItems={mainMenu}
  orientation="horizontal"
  showSubmenuIcon
/>

// Search block
<Search
  placeholder="Search tours, destinations..."
  buttonLabel="Search"
  onSearch={(query) => handleSearch(query)}
/>

// Site branding
<div className="site-branding">
  <SiteLogo size="medium" />
  <div>
    <SiteTitle />
    <SiteTagline />
  </div>
</div>
```

---

## Block Composition Rules

### Allowed Nesting

✅ **Blocks can contain:**
- UI components from `/components/ui/`
- Common components (Container, Logo, etc.)
- Semantic HTML elements

❌ **Blocks cannot contain:**
- Other blocks (use patterns for composition)
- Patterns
- Template parts

---

## Block Props Pattern

All blocks should follow this props pattern:

```typescript
interface BlockProps {
  // Primary content
  items?: any[];
  content?: string;
  
  // Configuration
  variant?: string;
  layout?: string;
  
  // Optional behavior
  onClick?: () => void;
  onFilter?: (value: string) => void;
  
  // Accessibility
  ariaLabel?: string;
  
  // Styling (rarely needed)
  className?: string;
}
```

---

## WordPress Block Registration

In WordPress, blocks would be registered like this:

```php
register_block_type('lightspeed/tour-card', [
  'render_callback' => 'render_tour_card',
  'attributes' => [
    'tourId' => ['type' => 'number'],
    'variant' => ['type' => 'string', 'default' => 'default']
  ]
]);
```

---

## Related Documentation

- [blocks/overview-patterns.md](overview-patterns.md) - Pattern compositions
- [blocks/overview-parts.md](overview-parts.md) - Template parts
- [blocks/overview-templates.md](overview-templates.md) - Page templates
- [COMPONENT-INDEX.md](../COMPONENT-INDEX.md) - Full component index