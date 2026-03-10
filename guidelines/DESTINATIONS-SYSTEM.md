# Destinations System Documentation

**Version:** V3 — WordPress-Native Alignment

This document provides **complete documentation** for the Destinations system implementation in the LightSpeed Tour Operator plugin prototype.

---

## Overview

The Destinations system demonstrates a complete WordPress block-theme implementation for destination content, including:

- Archive template with continent filtering and hierarchical navigation
- Single destination template with comprehensive detail sections
- Hierarchical support for parent/child relationships (e.g., South Africa > Cape Town)
- Reusable patterns and components
- Query Loop implementation for destination collections
- Related content blocks (tours and accommodation)

---

## File Structure

### Templates

```
/src/app/templates/
├── ArchiveDestinationTemplate.tsx      → templates/archive-destination.html
└── SingleDestinationTemplate.tsx       → templates/single-destination.html
```

### Template Parts

```
/src/app/components/parts/
├── FastFactsDestinationPart.tsx        → parts/fast-facts-destination.html
└── ModalDestinationPart.tsx            → parts/modal-destination.html
```

### Patterns

```
/src/app/components/patterns/
├── DestinationCardPattern.tsx          → patterns/destination-card.php
├── GallerySectionPattern.tsx           → patterns/gallery-section.php (shared)
└── SectionHeaderPattern.tsx            → patterns/section-header.php (shared)
```

### Blocks

```
/src/app/components/blocks/
├── DestinationCollectionBlock.tsx      → Query Loop for destinations
├── DestinationRelatedToursBlock.tsx    → Related tours
└── DestinationRelatedAccommodationBlock.tsx → Related accommodation
```

---

## Template: Archive Destination

**File:** `/src/app/templates/ArchiveDestinationTemplate.tsx`
**Maps to:** `templates/archive-destination.html`

### Structure (Fixed Order)

1. **Hero** - H1 ("Destinations"), intro text
2. **Hierarchy Navigation** - Continent filter (required)
3. **Destination Collection Block** - Query Loop with DestinationCardPattern
4. **CTA** - Optional contact travel experts

### Key Features

- Horizontal continent filter bar
- Hierarchical filtering (shows only top-level destinations by default)
- Search functionality
- Empty states
- Responsive grid (1-2-3 columns)
- Sticky filter bar on scroll

### Usage

```typescript
import { ArchiveDestinationTemplate } from '../templates/ArchiveDestinationTemplate';

<ArchiveDestinationTemplate />
```

---

## Template: Single Destination

**File:** `/src/app/templates/SingleDestinationTemplate.tsx`
**Maps to:** `templates/single-destination.html`

### Structure (Fixed Order)

1. **Hero** - H1 (destination name), breadcrumbs with hierarchy, excerpt, highlights
2. **Editorial Content + Fast Facts** - Two-column layout
   - Main content column (2/3)
   - Fast Facts sidebar (1/3, sticky)
3. **Gallery** - Optional, only if images exist
4. **Child Destinations** - Optional, displays sub-destinations if hierarchical
5. **Related Tours** - DestinationRelatedToursBlock
6. **Related Accommodation** - DestinationRelatedAccommodationBlock
7. **CTA** - Single primary action (request information / view tours)

### Key Features

- Breadcrumb navigation showing hierarchical context
- Fast facts sidebar (climate, currency, language, timezone, highlights)
- Optional gallery section
- Child destination display for parent locations
- Related content blocks (tours, accommodation)
- Explicit empty states

### Hierarchical Support

The template handles three scenarios:

1. **Top-level destination** (no parent): Shows child destinations if any exist
2. **Child destination** (has parent): Shows parent in breadcrumbs
3. **Standalone destination**: No hierarchy displayed

### Usage

```typescript
import { SingleDestinationTemplate } from '../templates/SingleDestinationTemplate';

<SingleDestinationTemplate />
```

---

## Part: Fast Facts Destination

**File:** `/src/app/components/parts/FastFactsDestinationPart.tsx`
**Maps to:** `parts/fast-facts-destination.html`

### Purpose

Displays key destination information in a sidebar format with icons and structured layout.

### Data Displayed

- Best time to visit
- Climate
- Currency
- Language
- Timezone
- Top highlights (bulleted list)

### Accessibility

- Semantic HTML with `<dl>`, `<dt>`, `<dd>` elements
- `aria-label` on container
- Icons marked with `aria-hidden="true"`

### Usage

```typescript
import { FastFactsDestinationPart } from '../components/parts/FastFactsDestinationPart';

<FastFactsDestinationPart destination={destination} />
```

---

## Part: Modal Destination

**File:** `/src/app/components/parts/ModalDestinationPart.tsx`
**Maps to:** `parts/modal-destination.html`

### Purpose

Reusable accessible modal component for destination-related interactions (enquiry forms, image lightboxes, etc.).

### Features

- Keyboard accessible (Escape to close)
- Focus management
- Prevents body scroll when open
- Click outside to close
- Accessible close button

### Usage

```typescript
import { ModalDestinationPart } from '../components/parts/ModalDestinationPart';

<ModalDestinationPart
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Destination Enquiry"
>
  <EnquiryForm destinationId={destination.id} />
</ModalDestinationPart>
```

---

## Pattern: Destination Card

**File:** `/src/app/components/patterns/DestinationCardPattern.tsx`
**Maps to:** `patterns/destination-card.php`

### Purpose

Individual destination card for grid displays in archives and related content sections.

### Features

- Featured image with hover scale effect
- Destination title and excerpt
- Best time to visit
- Tour count indicator
- First highlight preview
- Keyboard navigation support
- Responsive design

### Usage

```typescript
import { DestinationCardPattern } from '../components/patterns/DestinationCardPattern';

<DestinationCardPattern 
  destination={destination}
  onSelect={(dest) => console.log('Navigate to:', dest.slug)}
/>
```

---

## Block: Destination Collection

**File:** `/src/app/components/blocks/DestinationCollectionBlock.tsx`
**WordPress equivalent:** Query Loop targeting `postType: destination`

### Purpose

Displays a collection of destinations using the core Query Loop pattern. Supports hierarchical display logic.

### Features

- Optional search functionality
- Hierarchical filtering (parent/child)
- Empty states
- Result count display
- Grid layout (responsive)

### Hierarchical Logic

- Default: Shows only top-level destinations (no `parentId`)
- With `parentId` prop: Shows children of specific parent

### Usage

```typescript
import { DestinationCollectionBlock } from '../components/blocks/DestinationCollectionBlock';

// Show top-level destinations
<DestinationCollectionBlock
  destinations={allDestinations}
  showSearch={true}
/>

// Show child destinations of South Africa
<DestinationCollectionBlock
  destinations={allDestinations}
  parentId="dest-1"
  emptyMessage="No regions available"
/>
```

---

## Block: Destination Related Tours

**File:** `/src/app/components/blocks/DestinationRelatedToursBlock.tsx`
**WordPress equivalent:** Custom block for related tours

### Purpose

Displays tours that visit a specific destination.

### Features

- Uses TourCardPattern for consistency
- Section header with description
- "View all tours" link
- Auto-hides if no tours exist

### Usage

```typescript
import { DestinationRelatedToursBlock } from '../components/blocks/DestinationRelatedToursBlock';

<DestinationRelatedToursBlock tours={relatedTours} />
```

---

## Block: Destination Related Accommodation

**File:** `/src/app/components/blocks/DestinationRelatedAccommodationBlock.tsx`
**WordPress equivalent:** Custom block for related accommodation

### Purpose

Displays accommodation available in a specific destination.

### Features

- Uses AccommodationCard pattern
- Section header with description
- "View all accommodation" link
- Auto-hides if no accommodation exists

### Usage

```typescript
import { DestinationRelatedAccommodationBlock } from '../components/blocks/DestinationRelatedAccommodationBlock';

<DestinationRelatedAccommodationBlock accommodations={relatedAccommodations} />
```

---

## Content Model

### Destination Interface

```typescript
interface Destination {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  parentId?: string;          // Hierarchical parent (optional)
  continentId: string;         // Continent taxonomy
  travelStyles: string[];      // Travel Style taxonomy
  tourIds: string[];           // Related tours
  accommodationIds: string[]; // Related accommodation
  bestTime: string;
  climate: string;
  currency: string;
  language: string;
  timezone: string;
  highlights: string[];
}
```

### Hierarchical Structure

```
South Africa (dest-1)
├── Cape Town (dest-2)
└── Kruger National Park (dest-9)

Tanzania (dest-3)
├── Zanzibar (dest-7)
└── Serengeti (dest-10)

Kenya (dest-5)
└── Masai Mara (dest-11)
```

---

## WordPress Mapping

### Templates

| React Component                | WordPress File                       |
| ------------------------------ | ------------------------------------ |
| ArchiveDestinationTemplate     | templates/archive-destination.html   |
| SingleDestinationTemplate      | templates/single-destination.html    |

### Template Parts

| React Component                | WordPress File                       |
| ------------------------------ | ------------------------------------ |
| FastFactsDestinationPart       | parts/fast-facts-destination.html    |
| ModalDestinationPart           | parts/modal-destination.html         |

### Patterns

| React Component                | WordPress File                       |
| ------------------------------ | ------------------------------------ |
| DestinationCardPattern         | patterns/destination-card.php        |

### Blocks

| React Component                         | WordPress Block           |
| --------------------------------------- | ------------------------- |
| DestinationCollectionBlock              | Query Loop (destination)  |
| DestinationRelatedToursBlock            | Custom block              |
| DestinationRelatedAccommodationBlock    | Custom block              |

---

## Design Tokens

All styling uses CSS custom properties from `/src/styles/theme.css`:

### Typography

- Font families: `var(--font-family-lora)`, `var(--font-family-noto-sans)`
- Semantic HTML for type hierarchy (H1, H2, H3, P)

### Colors

- `bg-muted` - Hero backgrounds, alternating sections
- `bg-card` - Card backgrounds
- `border-border` - Card and section borders
- `text-primary` - Accent text, hover states
- `text-muted-foreground` - Secondary text

### Spacing

- Section padding: `py-12 md:py-16`
- Container margins: Uses Container component
- Card gaps: `gap-6` (24px)

### Interactive States

- Hover: `hover:shadow-md`, `hover:scale-105`
- Focus: `focus:ring-2 focus:ring-ring`
- Active filters: `bg-primary text-primary-foreground`

---

## Accessibility Checklist

✅ **Semantic HTML**
- One H1 per page
- Logical heading hierarchy (H1 → H2 → H3)
- Proper landmark roles

✅ **Keyboard Navigation**
- All interactive elements keyboard-reachable
- Visible focus states
- Logical tab order

✅ **ARIA Labels**
- Breadcrumb navigation: `aria-label="Breadcrumb"`
- Filter buttons: `aria-pressed` states
- Search inputs: `aria-label` on search field
- Empty states: `aria-live="polite"` for screen readers

✅ **Color Independence**
- Information not conveyed by color alone
- Sufficient contrast ratios
- Icons supplemented with text

✅ **Empty States**
- Explicit messages for no results
- Clear calls-to-action
- Screen reader announcements

---

## Testing Checklist

### Archive Template

- [ ] Continent filter works correctly
- [ ] Search functionality filters destinations
- [ ] Empty state displays when no results
- [ ] Only top-level destinations display (no children in grid)
- [ ] Card navigation is keyboard-accessible
- [ ] Filter bar is sticky on scroll
- [ ] Responsive layout (1-2-3 columns)

### Single Template

- [ ] Breadcrumbs show hierarchical path
- [ ] Fast facts sidebar is sticky on desktop
- [ ] Gallery only displays if images exist
- [ ] Child destinations display for parent locations
- [ ] Related tours block auto-hides if empty
- [ ] Related accommodation block auto-hides if empty
- [ ] CTA buttons are functional

### Hierarchical Logic

- [ ] Parent destinations show child destinations
- [ ] Child destinations show parent in breadcrumbs
- [ ] Archive only shows top-level (no children)
- [ ] Empty state for destinations with no children

---

## Related Documentation

- [Tours System Documentation](./TOURS-SYSTEM.md)
- [Component Architecture](./overview-components.md)
- [Pattern Guidelines](./overview-patterns.md)
- [Design Tokens](./design-tokens/)

---

## Future Enhancements

### Phase 2

- Destination itinerary builder
- Weather widgets
- Interactive maps
- Travel advisory integration
- Visa information blocks

### Phase 3

- User-generated content (reviews, photos)
- Destination comparison tool
- Seasonal highlights
- Local event calendar

---

**Last Updated:** December 2024  
**Maintained By:** LightSpeed Tour Operator Team
