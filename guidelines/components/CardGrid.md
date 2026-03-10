# Card Grid Pattern Guidelines

**Component:** `CardGrid`  
**Location:** `/src/app/components/patterns/CardGrid.tsx`  
**WordPress Equivalent:** `core/query` with post template  
**Category:** Listing Patterns

---

## Purpose

The CardGrid pattern displays collections of items (tours, destinations, blog posts, etc.) in a responsive grid layout with consistent card components.

**Use for:**
- Tours archive listing
- Destinations archive listing
- Blog post listing
- Search results
- Related/recommended items
- Any collection of content items

**Don't use for:**
- Single items (use detail page)
- Non-grid layouts (use custom pattern)
- Table data (use Table component)

---

## WordPress Mapping

```html
<!-- WordPress Template (archive.html) -->
<!-- wp:query {"queryId":1,"query":{"postType":"tour","perPage":12}} -->
<div class="wp-block-query">
  <!-- wp:post-template {"layout":{"type":"grid","columnCount":3}} -->
    <!-- Tour card markup -->
  <!-- /wp:post-template -->
</div>
<!-- /wp:query -->
```

**React Equivalent:**

```tsx
<CardGrid
  items={tours}
  CardComponent={TourCard}
  columns={{ mobile: 1, tablet: 2, desktop: 3 }}
  gap={6}
/>
```

---

## Component API

### Props

```typescript
interface CardGridProps<T> {
  /** Array of items to display */
  items: T[];
  
  /** Card component to render each item */
  CardComponent: React.ComponentType<{ item: T }>;
  
  /** Grid columns (responsive) */
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  
  /** Gap between cards */
  gap?: number;
  
  /** Loading state */
  loading?: boolean;
  
  /** Empty state configuration */
  emptyState?: {
    title: string;
    message: string;
    action?: {
      label: string;
      href: string;
    };
  };
  
  /** Show item count */
  showCount?: boolean;
  
  /** Additional CSS classes */
  className?: string;
}
```

---

## Usage

### Basic Usage

```tsx
import { CardGrid } from "../components/patterns/CardGrid";
import { TourCard } from "../components/cards/TourCard";

<CardGrid
  items={tours}
  CardComponent={TourCard}
  columns={{ mobile: 1, tablet: 2, desktop: 3 }}
/>
```

### With Custom Columns

```tsx
<CardGrid
  items={destinations}
  CardComponent={DestinationCard}
  columns={{ mobile: 1, tablet: 3, desktop: 4 }}
  gap={8}
/>
```

### With Empty State

```tsx
<CardGrid
  items={filteredTours}
  CardComponent={TourCard}
  emptyState={{
    title: "No tours found",
    message: "Try adjusting your filters or search criteria",
    action: {
      label: "Clear Filters",
      href: "/tours",
    },
  }}
/>
```

### With Loading State

```tsx
<CardGrid
  items={tours}
  CardComponent={TourCard}
  loading={isLoading}
  showCount
/>
```

---

## Card Components

### Tour Card

**Use for:** Tour listings, tour archives, related tours

```tsx
import { TourCard } from "../components/cards/TourCard";

<CardGrid
  items={tours}
  CardComponent={TourCard}
/>
```

**Tour Card Props:**
```typescript
interface TourCardProps {
  item: Tour;
}

// Displays:
// - Tour image
// - Tour name
// - Destination badge
// - Duration, group size
// - Price
// - "View Tour" link
```

### Destination Card

**Use for:** Destination listings, destination archives

```tsx
import { DestinationCard } from "../components/cards/DestinationCard";

<CardGrid
  items={destinations}
  CardComponent={DestinationCard}
/>
```

**Destination Card Props:**
```typescript
interface DestinationCardProps {
  item: Destination;
}

// Displays:
// - Destination image
// - Destination name
// - Country
// - Tour count
// - "Explore" link
```

### Blog Post Card

**Use for:** Blog post listings, blog archives

```tsx
import { BlogCard } from "../components/cards/BlogCard";

<CardGrid
  items={posts}
  CardComponent={BlogCard}
/>
```

**Blog Card Props:**
```typescript
interface BlogCardProps {
  item: Post;
}

// Displays:
// - Featured image
// - Title
// - Excerpt
// - Author, date
// - Category badge
// - "Read More" link
```

---

## Grid Configurations

### Default Grid (3 columns)

**Use for:** Standard archive pages

```tsx
<CardGrid
  items={items}
  CardComponent={TourCard}
  columns={{ mobile: 1, tablet: 2, desktop: 3 }}
  gap={6}
/>
```

**Result:**
- Mobile: 1 column (full width)
- Tablet: 2 columns
- Desktop: 3 columns

### Wide Grid (4 columns)

**Use for:** Compact items (destinations, categories)

```tsx
<CardGrid
  items={items}
  CardComponent={DestinationCard}
  columns={{ mobile: 2, tablet: 3, desktop: 4 }}
  gap={4}
/>
```

**Result:**
- Mobile: 2 columns (tight)
- Tablet: 3 columns
- Desktop: 4 columns

### Narrow Grid (2 columns)

**Use for:** Feature-rich cards (detailed tours)

```tsx
<CardGrid
  items={items}
  CardComponent={TourCard}
  columns={{ mobile: 1, tablet: 2, desktop: 2 }}
  gap={8}
/>
```

**Result:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 2 columns

---

## Styling

### CSS Variables (from theme.css)

```css
/* Grid Layout */
.card-grid {
  display: grid;
  gap: var(--spacing-gap-lg); /* 24px */
}

/* Mobile: 1 column */
.card-grid {
  grid-template-columns: 1fr;
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Design Tokens

**Grid Gap:**
- Small: `gap-4` (16px)
- Medium: `gap-6` (24px) - default
- Large: `gap-8` (32px)

**Column Count:**
- Mobile: 1-2 columns
- Tablet: 2-3 columns
- Desktop: 3-4 columns

**Item Count Display:**
- Font: Noto Sans
- Size: `text-sm` (14px)
- Color: `text-muted-foreground`

---

## Empty State

### Default Empty State

```tsx
<CardGrid
  items={[]}
  CardComponent={TourCard}
  emptyState={{
    title: "No tours available",
    message: "Check back soon for new tours",
  }}
/>
```

**Displays:**
- Icon (search or empty icon)
- Title (H3)
- Message (paragraph)
- Optional action button

### Custom Empty State

```tsx
<CardGrid
  items={filteredTours}
  CardComponent={TourCard}
  emptyState={{
    title: "No matching tours",
    message: "Try adjusting your search or filters",
    action: {
      label: "Clear All Filters",
      href: "/tours",
    },
  }}
/>
```

---

## Loading State

### Skeleton Loading

**While items are loading:**

```tsx
<CardGrid
  items={tours}
  CardComponent={TourCard}
  loading={isLoading}
/>
```

**Displays:**
- Skeleton cards (gray placeholders)
- Same grid layout as actual cards
- Shimmer animation

**Implementation:**
```tsx
{loading ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map((item) => (
      <CardComponent key={item.id} item={item} />
    ))}
  </div>
)}
```

---

## Item Count

### Show Item Count

```tsx
<CardGrid
  items={tours}
  CardComponent={TourCard}
  showCount
/>
```

**Displays above grid:**
```
Showing 24 tours
```

**With filters:**
```
Showing 12 of 48 tours
```

---

## Accessibility

### WCAG 2.1 AA Compliance

**Semantic HTML:**
```tsx
<section aria-label="Tours listing">
  <h2 className="sr-only">All Tours</h2>
  
  {showCount && (
    <p className="text-sm text-muted-foreground mb-6" aria-live="polite">
      Showing {items.length} {items.length === 1 ? 'item' : 'items'}
    </p>
  )}
  
  <div className="grid ...">
    {items.map((item) => (
      <CardComponent key={item.id} item={item} />
    ))}
  </div>
</section>
```

**Required Attributes:**
- `aria-label` on container
- `aria-live="polite"` on item count (announces changes)
- Each card must have unique `key`
- Cards must be keyboard navigable

**Keyboard Navigation:**
- **Tab** - Navigate between cards
- **Enter** - Activate card link
- Focus visible on all cards

**Screen Reader:**
- Announces item count
- Announces grid structure
- Each card announced individually

---

## Responsive Behavior

### Mobile (< 768px)

```tsx
// 1 column, full width
<div className="grid grid-cols-1 gap-6">
  {/* Cards */}
</div>
```

**Features:**
- Single column
- Full-width cards
- Touch-friendly spacing

### Tablet (768px - 1023px)

```tsx
// 2 columns
<div className="grid md:grid-cols-2 gap-6">
  {/* Cards */}
</div>
```

**Features:**
- 2 columns
- Balanced layout
- Readable card size

### Desktop (≥ 1024px)

```tsx
// 3 columns
<div className="grid lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

**Features:**
- 3-4 columns
- Optimal density
- Scannable grid

---

## Common Patterns

### Tours Archive

```tsx
function ToursArchive() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  
  const paginatedTours = tours.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  return (
    <PageLayout>
      <Hero title="All Tours" />
      
      <Container className="py-12">
        <CardGrid
          items={paginatedTours}
          CardComponent={TourCard}
          columns={{ mobile: 1, tablet: 2, desktop: 3 }}
          showCount
        />
        
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(tours.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      </Container>
    </PageLayout>
  );
}
```

### Filtered Results

```tsx
function FilteredToursGrid() {
  const [filters, setFilters] = useState({});
  
  const filteredTours = applyFilters(tours, filters);
  
  return (
    <>
      <FilterBar onFilterChange={setFilters} />
      
      <CardGrid
        items={filteredTours}
        CardComponent={TourCard}
        emptyState={{
          title: "No tours match your filters",
          message: "Try adjusting your search criteria",
          action: {
            label: "Clear Filters",
            onClick: () => setFilters({}),
          },
        }}
        showCount
      />
    </>
  );
}
```

### Related Items

```tsx
function RelatedTours({ currentTour }: { currentTour: Tour }) {
  const relatedTours = getRelatedTours(currentTour, 3);
  
  return (
    <section className="py-12 bg-muted">
      <Container>
        <h2 className="mb-8">Similar Tours You Might Like</h2>
        
        <CardGrid
          items={relatedTours}
          CardComponent={TourCard}
          columns={{ mobile: 1, tablet: 2, desktop: 3 }}
          gap={6}
        />
      </Container>
    </section>
  );
}
```

---

## Performance

### Virtual Scrolling (Large Lists)

For 100+ items, consider virtual scrolling:

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualCardGrid({ items }: { items: Tour[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 400, // Estimated card height
  });
  
  return (
    <div ref={parentRef} className="h-screen overflow-auto">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <TourCard item={items[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Image Lazy Loading

All card images should lazy load:

```tsx
// In card components
<img
  src={item.image}
  alt={item.name}
  loading="lazy"
  className="..."
/>
```

---

## Testing Checklist

- [ ] Grid displays with correct columns
- [ ] Responsive breakpoints work
- [ ] All cards render correctly
- [ ] Empty state shows when no items
- [ ] Loading state shows while loading
- [ ] Item count displays (if enabled)
- [ ] Gap spacing correct
- [ ] Cards are clickable/keyboard accessible
- [ ] Focus states visible
- [ ] Screen reader announces count
- [ ] Mobile: single column layout
- [ ] Tablet: 2-3 column layout
- [ ] Desktop: 3-4 column layout

---

## Related Components

- **TourCard** - Tour item card
- **DestinationCard** - Destination item card
- **BlogCard** - Blog post item card
- **Pagination** - Multi-page navigation
- **FilterBar** - Filter controls
- **EmptyState** - No results message

---

## WordPress Block Theme Alignment

### Template Usage

```html
<!-- templates/archive-tour.html -->
<!-- wp:template-part {"slug":"header"} /-->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
  
  <!-- wp:query {"queryId":1,"query":{"postType":"tour","perPage":12}} -->
  <div class="wp-block-query">
    
    <!-- wp:post-template {"layout":{"type":"grid","columnCount":3}} -->
      <!-- Tour card template -->
      <!-- wp:post-featured-image /-->
      <!-- wp:post-title /-->
      <!-- wp:post-excerpt /-->
    <!-- /wp:post-template -->
    
    <!-- wp:query-pagination /-->
    
  </div>
  <!-- /wp:query -->
  
</div>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer"} /-->
```

---

## Implementation Notes

**Component Location:**
- File: `/src/app/components/patterns/CardGrid.tsx`
- Pattern component (composes cards)
- Generic (accepts any card component)

**Type Safety:**
- Use TypeScript generics for item type
- Card component must accept `item` prop
- Type-safe card selection

**Styling:**
- Uses design tokens from `/src/styles/theme.css`
- Grid via Tailwind CSS Grid
- No hardcoded spacing

---

This pattern provides the foundation for all listing and collection displays across the site.
