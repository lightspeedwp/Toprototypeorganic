# Tours System Documentation

**Version:** V3 — WordPress-Native Alignment

This document provides **complete documentation** for the Tours system implementation in the LightSpeed Tour Operator plugin prototype.

---

## Overview

The Tours system demonstrates a complete WordPress block-theme implementation for tour content, including:

- Archive template with taxonomy filtering
- Single tour template with comprehensive detail sections
- Reusable patterns and components
- Query Loop implementation for tour collections
- Related content blocks

---

## File Structure

### Templates

```
/src/app/templates/
├── ArchiveTourTemplate.tsx      → templates/archive-tour.html
└── SingleTourTemplate.tsx       → templates/single-tour.html
```

### Template Parts

```
/src/app/components/parts/
├── FastFactsTourPart.tsx        → parts/fast-facts-tour.html
└── ModalTourPart.tsx            → parts/modal-tour.html
```

### Patterns

```
/src/app/components/patterns/
├── TourCardPattern.tsx          → patterns/tour-card.php
├── ItineraryListPattern.tsx     → patterns/itinerary-list.php
├── TravelInformationPattern.tsx → patterns/travel-information.php
├── GallerySectionPattern.tsx    → patterns/gallery-section.php
├── SectionHeaderPattern.tsx     → patterns/section-header.php
└── TaxonomyFilterPattern.tsx    → Taxonomy filter navigation
```

### Blocks

```
/src/app/components/blocks/
├── TourCollectionBlock.tsx      → Query Loop for tours
├── TourRelatedAccommodationBlock.tsx → Related accommodation
└── TourRelatedDestinationBlock.tsx   → Related destinations
```

---

## Template: Archive Tour

**File:** `/src/app/templates/ArchiveTourTemplate.tsx`
**Maps to:** `templates/archive-tour.html`

### Structure (Fixed Order)

1. **Hero** - H1 ("Our Tours"), intro text
2. **Taxonomy Filter** - Travel Style navigation (required)
3. **Tour Collection Block** - Query Loop with TourCardPattern
4. **CTA** - Optional custom tour request

### Key Features

- Horizontal taxonomy filter bar
- Travel Style filtering with counts
- Search functionality
- Empty states
- Responsive grid (1-2-3 columns)

### Usage

```typescript
import { ArchiveTourTemplate } from '../templates/ArchiveTourTemplate';

<ArchiveTourTemplate />
```

---

## Template: Single Tour

**File:** `/src/app/templates/SingleTourTemplate.tsx`
**Maps to:** `templates/single-tour.html`

### Structure (Fixed Order)

1. **Hero** - H1 (tour name), breadcrumbs, excerpt, highlights
2. **Editorial Content + Fast Facts** - Two-column layout
3. **Itinerary** - Day-by-day breakdown
4. **Travel Information** - Included/excluded, important info
5. **Gallery** - Photo gallery (if images exist)
6. **Related Destinations** - Destination cards
7. **Related Accommodation** - Accommodation cards
8. **CTA** - Primary enquiry action

### Key Features

- Breadcrumb navigation
- Sticky sidebar with quick facts
- Expandable itinerary days
- Image gallery with lightbox
- Related content blocks
- Explicit empty states

### Usage

```typescript
import { SingleTourTemplate } from '../templates/SingleTourTemplate';

<SingleTourTemplate />
```

---

## Part: Fast Facts Tour

**File:** `/src/app/components/parts/FastFactsTourPart.tsx`
**Maps to:** `parts/fast-facts-tour.html`

### Purpose

Quick reference sidebar showing essential tour information:
- Duration
- Price
- Group Size
- Difficulty
- Best Time
- Destination count

### Props

```typescript
interface FastFactsTourPartProps {
  tour: Tour;
}
```

### Usage

```typescript
<FastFactsTourPart tour={tourData} />
```

---

## Part: Modal Tour

**File:** `/src/app/components/parts/ModalTourPart.tsx`
**Maps to:** `parts/modal-tour.html`

### Purpose

Reusable, accessible modal container for tour-related content.

### Props

```typescript
interface ModalTourPartProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
```

### Features

- Escape key to close
- Click outside to close
- Prevents body scroll
- Keyboard accessible
- Multiple sizes

### Usage

```typescript
<ModalTourPart
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Tour Details"
  size="lg"
>
  <p>Modal content here</p>
</ModalTourPart>
```

---

## Pattern: Tour Card

**File:** `/src/app/components/patterns/TourCardPattern.tsx`
**Maps to:** `patterns/tour-card.php`

### Purpose

Individual tour card for grid displays.

### Props

```typescript
interface TourCardPatternProps {
  tour: Tour;
  onSelect?: (tour: Tour) => void;
}
```

### Features

- Featured image with hover effect
- Tour title and excerpt
- Duration, destinations, group size meta
- Price display
- Entire card clickable
- Keyboard accessible

### Usage

```typescript
<TourCardPattern 
  tour={tourData}
  onSelect={(tour) => console.log(tour)}
/>
```

---

## Pattern: Itinerary List

**File:** `/src/app/components/patterns/ItineraryListPattern.tsx`
**Maps to:** `patterns/itinerary-list.php`

### Purpose

Day-by-day itinerary display for tour details.

### Props

```typescript
interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities?: string[];
  meals?: string;
  accommodation?: string;
}

interface ItineraryListPatternProps {
  days: ItineraryDay[];
}
```

### Features

- Day number badge
- Activities list
- Meals and accommodation info
- Empty state if no itinerary

### Usage

```typescript
const itinerary = [
  {
    day: 1,
    title: 'Arrival',
    description: 'Welcome to Cape Town...',
    activities: ['Airport transfer', 'Hotel check-in'],
    meals: 'Dinner',
    accommodation: 'Luxury Hotel',
  },
];

<ItineraryListPattern days={itinerary} />
```

---

## Pattern: Travel Information

**File:** `/src/app/components/patterns/TravelInformationPattern.tsx`
**Maps to:** `patterns/travel-information.php`

### Purpose

Display included/excluded items and important travel information.

### Props

```typescript
interface TravelInformationPatternProps {
  included?: string[];
  excluded?: string[];
  bestTime?: string;
  difficulty?: string;
  visaInfo?: string;
  healthInfo?: string;
}
```

### Features

- What's included (checkmarks)
- What's excluded (X marks)
- Additional information grid
- Responsive two-column layout
- Hides if no content

### Usage

```typescript
<TravelInformationPattern
  included={['Accommodation', 'Meals', 'Transfers']}
  excluded={['Flights', 'Insurance']}
  bestTime="May - September"
  difficulty="Easy"
  visaInfo="Visa on arrival"
  healthInfo="No vaccinations required"
/>
```

---

## Pattern: Gallery Section

**File:** `/src/app/components/patterns/GallerySectionPattern.tsx`
**Maps to:** `patterns/gallery-section.php`

### Purpose

Image gallery with lightbox functionality.

### Props

```typescript
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

interface GallerySectionPatternProps {
  images: GalleryImage[];
}
```

### Features

- Responsive grid (2-3-4 columns)
- Lightbox modal
- Image navigation
- Keyboard accessible
- Hides if no images

### Usage

```typescript
const images = [
  {
    id: '1',
    src: '/image1.jpg',
    alt: 'Description',
    caption: 'Optional caption',
  },
];

<GallerySectionPattern images={images} />
```

---

## Pattern: Section Header

**File:** `/src/app/components/patterns/SectionHeaderPattern.tsx`
**Maps to:** `patterns/section-header.php`

### Purpose

Reusable section heading wrapper.

### Props

```typescript
interface SectionHeaderPatternProps {
  title: string;
  description?: string;
  level?: 'h2' | 'h3';
  centered?: boolean;
}
```

### Usage

```typescript
<SectionHeaderPattern
  title="Itinerary"
  description="Day-by-day breakdown"
  level="h2"
/>
```

---

## Pattern: Taxonomy Filter

**File:** `/src/app/components/patterns/TaxonomyFilterPattern.tsx`

### Purpose

Horizontal filter bar for taxonomy navigation.

### Props

```typescript
interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface TaxonomyFilterPatternProps {
  label: string;
  options: FilterOption[];
  activeId?: string;
  onFilterChange?: (id: string) => void;
}
```

### Features

- Horizontal scroll on mobile
- Active state indication
- Optional counts
- Keyboard accessible

### Usage

```typescript
<TaxonomyFilterPattern
  label="Travel Style"
  options={travelStyles}
  activeId={activeStyleId}
  onFilterChange={setActiveStyleId}
/>
```

---

## Block: Tour Collection

**File:** `/src/app/components/blocks/TourCollectionBlock.tsx`
**WordPress:** Query Loop (`core/query` + `core/post-template`)

### Purpose

Display collection of tours using Query Loop pattern.

### Props

```typescript
interface TourCollectionBlockProps {
  tours: Tour[];
  showSearch?: boolean;
  emptyMessage?: string;
}
```

### Features

- Query Loop equivalent
- Search functionality
- Empty states
- Results count
- Responsive grid

### Usage

```typescript
<TourCollectionBlock
  tours={filteredTours}
  showSearch={true}
  emptyMessage="No tours available"
/>
```

---

## Block: Tour Related Accommodation

**File:** `/src/app/components/blocks/TourRelatedAccommodationBlock.tsx`

### Purpose

Show accommodations related to a tour.

### Props

```typescript
interface TourRelatedAccommodationBlockProps {
  accommodations: Accommodation[];
}
```

### Features

- Accommodation cards
- Ratings display
- Location info
- Empty state
- Two-column grid

### Usage

```typescript
<TourRelatedAccommodationBlock
  accommodations={relatedAccommodations}
/>
```

---

## Block: Tour Related Destination

**File:** `/src/app/components/blocks/TourRelatedDestinationBlock.tsx`

### Purpose

Show destinations visited on the tour.

### Props

```typescript
interface TourRelatedDestinationBlockProps {
  destinations: Destination[];
}
```

### Features

- Destination cards with highlights
- Three-column grid
- Hides if no destinations
- Hover effects

### Usage

```typescript
<TourRelatedDestinationBlock
  destinations={relatedDestinations}
/>
```

---

## Data Structure

### Tour Interface

```typescript
interface Tour {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  travelStyles: string[];   // Travel Style taxonomy IDs
  destinations: string[];   // Destination post IDs
  duration: string;
  price: string;
  groupSize: string;
  difficulty: string;
  bestTime: string;
  accommodation: string[];  // Accommodation post IDs
  highlights: string[];
  included: string[];
  excluded: string[];
}
```

---

## Styling

All components use CSS variables from `/src/styles/theme.css`:

### Colors
- `bg-card` - Card backgrounds
- `bg-primary` - Primary brand color
- `text-muted-foreground` - Secondary text
- `border-border` - Border color

### Typography
- `font-family: var(--font-family-lora)` - Headings
- `font-family: var(--font-family-noto-sans)` - Body text
- `font-size: var(--text-xl)` - Size scale

### Spacing
- Uses Tailwind spacing scale (4px increments)
- `gap-6` - 24px
- `p-4` - 16px padding
- `mb-8` - 32px margin

---

## Accessibility

All components meet WCAG 2.1 AA:

- ✅ Semantic HTML elements
- ✅ Proper heading hierarchy
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ ARIA labels where needed
- ✅ Color contrast compliance
- ✅ Empty states explicit

---

## Mobile Optimization

- Responsive grids (1-2-3 columns)
- Touch targets 44px minimum
- Horizontal scroll for filters
- Font sizes 16px minimum
- Stacked layouts on mobile

---

## Dark Mode

All components automatically adapt to dark mode via CSS variables. No manual dark mode classes needed.

---

## Testing Checklist

- [ ] Archive page displays tours correctly
- [ ] Taxonomy filtering works
- [ ] Search functionality works
- [ ] Tour cards are clickable
- [ ] Single tour page shows all sections
- [ ] Itinerary displays correctly
- [ ] Gallery lightbox works
- [ ] Related content blocks appear
- [ ] Empty states show when appropriate
- [ ] Mobile menu works
- [ ] All links in header/footer work
- [ ] Dark mode switches correctly
- [ ] Keyboard navigation works
- [ ] Screen readers can navigate

---

## Related Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [patterns/hero-patterns.md](patterns/hero-patterns.md) - Hero patterns
- [patterns/card-grid-patterns.md](patterns/card-grid-patterns.md) - Card grids
- [patterns/filter-patterns.md](patterns/filter-patterns.md) - Filters
- [THEME-VARIATIONS.md](THEME-VARIATIONS.md) - Light/dark mode
