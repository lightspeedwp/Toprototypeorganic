# Search & Filter Pattern

**Category:** Utility / Navigation  
**WordPress Equivalent:** Group block + Search block + Navigation blocks  
**Section Styles:** `section-filter-bar-default`, `section-filter-bar-compact`  
**Status:** ✅ Documented

---

## Overview

The Search & Filter pattern provides advanced search and filtering capabilities for archive pages (tours, accommodation, destinations, blog posts). This pattern enables users to quickly narrow down content based on search queries, taxonomies, price ranges, and sorting options.

**Primary Use Cases:**
- Tours archive (filter by travel style, duration, price, destination)
- Accommodation archive (filter by type, facilities, price, location)
- Destinations archive (filter by continent, activity type)
- Blog archive (search posts, filter by category/tag)
- Specials archive (filter by discount, destination, dates)

**Design Philosophy:**
- Progressive disclosure (show filters only when needed)
- Sticky positioning (stays visible during scroll)
- Clear affordances (obvious filter buttons/inputs)
- Instant feedback (update results on filter change)
- Easy reset (clear all filters with one click)

---

## WordPress Block Structure

### Group Block Wrapper

```
Group {
  className: "section-filter-bar-default" | "section-filter-bar-compact"
  tagName: "div"
  position: "sticky"
  top: "64px"  // Below header
  zIndex: 40
  
  Inner Blocks:
    └── Container
          ├── SearchInput {
          │     type: "search",
          │     placeholder: "Search...",
          │     ariaLabel: "Search content"
          │   }
          ├── TaxonomyNav {
          │     terms: taxonomyTerms,
          │     activeId: activeTermId,
          │     onTermClick: handleTermClick,
          │     layout: "horizontal-scroll"
          │   }
          ├── PriceRangeSlider {  // Optional
          │     min: 0,
          │     max: 10000,
          │     value: [minPrice, maxPrice],
          │     onChange: handlePriceChange
          │   }
          ├── SortDropdown {  // Optional
          │     options: sortOptions,
          │     value: currentSort,
          │     onChange: handleSortChange
          │   }
          └── Button {
                variant: "ghost",
                text: "Reset Filters",
                onClick: handleReset,
                icon: XIcon
              }
}
```

### Inner Blocks Composition

**Block Hierarchy:**
1. **Search Input** - Text search field
2. **TaxonomyNav** - Filter by categories/terms
3. **Price Range Slider** (optional) - Filter by price
4. **Sort Dropdown** (optional) - Sort results
5. **Reset Button** - Clear all filters

**Block Nesting Rules:**
- ✅ Must be wrapped in Group block
- ✅ Container provides layout constraints
- ✅ Components arranged horizontally on desktop, vertically on mobile
- ❌ No nested filter bars

---

## Section Styles

### Primary Variant: `section-filter-bar-default`

**Purpose:** Full-featured filter bar for tours, accommodation archives

**Styling:**
```css
.section-filter-bar-default {
  background: var(--muted);
  border-bottom: 1px solid var(--border);
  padding: var(--spacing-element-md);      /* 16-32px vertical */
  position: sticky;
  top: 64px;                               /* Below header */
  z-index: 40;
}

.section-filter-bar-default .container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-gap-md);              /* 16-32px */
  align-items: center;
}

.section-filter-bar-default input[type="search"] {
  background: var(--input-background);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 8px 12px;
  min-width: 240px;
  flex: 1;
}

@media (max-width: 768px) {
  .section-filter-bar-default .container {
    flex-direction: column;
    align-items: stretch;
  }
}
```

**Background:** `bg-muted` → `var(--muted)` (Light gray)  
**Border:** `border-b border-border` → `1px solid var(--border)`  
**Padding:** `py-4 md:py-6` (16-24px vertical)  
**Position:** `sticky top-16 z-40`  
**Layout:** Flexbox, wrap on mobile

---

### Compact Variant: `section-filter-bar-compact`

**Purpose:** Minimal filter bar for blog, simple archives

**Styling:**
```css
.section-filter-bar-compact {
  background: var(--background);
  border-bottom: 1px solid var(--border);
  padding: var(--spacing-element-sm);      /* 12-24px vertical */
  position: sticky;
  top: 64px;
  z-index: 40;
}

.section-filter-bar-compact .container {
  display: flex;
  gap: var(--spacing-gap-sm);              /* 12-24px */
  align-items: center;
}
```

**Background:** `bg-background` → `var(--background)` (White)  
**Border:** `border-b border-border`  
**Padding:** `py-2 md:py-4` (8-16px vertical)  
**Position:** `sticky top-16 z-40`  
**Layout:** Single row, compact

---

## Design Token Usage

### Typography

**Search Input:**
- Font family: `var(--font-family-noto-sans)` - AUTOMATIC
- Font size: `var(--text-base)` - AUTOMATIC
- Font weight: `var(--font-weight-normal)` - AUTOMATIC

**Filter Labels:**
- Font family: `var(--font-family-lora)` - AUTOMATIC
- Font size: `var(--text-sm)` or `var(--text-base)`
- Font weight: `var(--font-weight-medium)` (500)

**Sort Dropdown:**
- Font family: `var(--font-family-noto-sans)` - AUTOMATIC
- Font size: `var(--text-sm)`

---

### Colors

**Default Variant:**
- Background: `bg-muted` → `var(--muted)` - rgba(225, 225, 225, 1)
- Text: `text-foreground` → `var(--foreground)` - rgba(9, 9, 9, 1)
- Border: `border-border` → `var(--border)` - rgba(117, 117, 117, 1)
- Input background: `bg-input` → `var(--input-background)` - rgba(255, 255, 255, 1)
- Input border: `border-border`
- Active filter: `bg-primary`, `text-primary-foreground`
- Inactive filter: `bg-background`, `text-muted-foreground`

**Compact Variant:**
- Background: `bg-background` → `var(--background)` - rgba(255, 255, 255, 1)
- Rest same as default

---

### Spacing

**Section Padding:**
- Default: `py-4 md:py-6` (16-24px vertical)
- Compact: `py-2 md:py-4` (8-16px vertical)

**Element Spacing:**
- Search to filters: `gap-4 md:gap-6` (16-24px)
- Between filter buttons: `gap-2` (8px)
- Filter to sort: `gap-4` (16px)

**Container Padding:**
- Horizontal: `px-4 md:px-6` (16-24px)

---

### Borders & Radius

**Search Input:**
- Border: `border border-border` → `1px solid var(--border)`
- Border radius: `rounded-md` → `var(--radius-md)` (4px)

**Filter Buttons:**
- Border: `border border-border`
- Border radius: `rounded-md` → `var(--radius-md)` (4px)
- Active state: `border-primary`

**Dropdown:**
- Border: `border border-border`
- Border radius: `rounded-md` → `var(--radius-md)` (4px)

---

## Props Interface

```typescript
interface SearchFilterPatternProps {
  /** Search query handler */
  onSearch: (query: string) => void;
  
  /** Current search query */
  searchQuery?: string;
  
  /** Filter change handler */
  onFilterChange: (filters: FilterState) => void;
  
  /** Current active filters */
  activeFilters?: FilterState;
  
  /** Sort change handler */
  onSortChange: (sort: SortOption) => void;
  
  /** Current sort option */
  currentSort?: SortOption;
  
  /** Taxonomy terms for filtering */
  taxonomies?: Taxonomy[];
  
  /** Show price range slider */
  showPriceRange?: boolean;
  
  /** Price range (min, max) */
  priceRange?: { min: number; max: number };
  
  /** Show sort dropdown */
  showSort?: boolean;
  
  /** Sort options */
  sortOptions?: SortOption[];
  
  /** Visual variant */
  variant?: 'default' | 'compact';
  
  /** Reset handler */
  onReset?: () => void;
  
  /** Result count (for screen readers) */
  resultCount?: number;
}

interface FilterState {
  searchQuery?: string;
  taxonomies?: Record<string, string>; // taxonomy slug → term ID
  priceRange?: [number, number];
  sort?: string;
}

interface SortOption {
  value: string;
  label: string;
}

interface Taxonomy {
  slug: string;
  name: string;
  terms: TaxonomyTerm[];
}

interface TaxonomyTerm {
  id: string;
  name: string;
  slug: string;
  count?: number;
}
```

---

## Usage Examples

### Basic Search Only (Blog)

```typescript
<SearchFilterPattern
  onSearch={(query) => setSearchQuery(query)}
  searchQuery={searchQuery}
  variant="compact"
/>
```

### Tours Archive (Full Features)

```typescript
<SearchFilterPattern
  onSearch={(query) => setSearchQuery(query)}
  searchQuery={searchQuery}
  onFilterChange={(filters) => setActiveFilters(filters)}
  activeFilters={activeFilters}
  taxonomies={[
    { slug: 'travel_style', name: 'Travel Style', terms: TRAVEL_STYLES },
    { slug: 'destination', name: 'Destination', terms: DESTINATIONS }
  ]}
  showPriceRange={true}
  priceRange={{ min: 0, max: 10000 }}
  showSort={true}
  sortOptions={[
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'duration-asc', label: 'Duration: Short to Long' },
    { value: 'popularity', label: 'Most Popular' }
  ]}
  onSortChange={(sort) => setSortOption(sort)}
  currentSort={currentSort}
  onReset={() => resetAllFilters()}
  resultCount={filteredTours.length}
  variant="default"
/>
```

### Accommodation Archive

```typescript
<SearchFilterPattern
  onSearch={(query) => setSearchQuery(query)}
  onFilterChange={(filters) => setActiveFilters(filters)}
  taxonomies={[
    { slug: 'accommodation_type', name: 'Type', terms: ACCOMMODATION_TYPES },
    { slug: 'destination', name: 'Location', terms: DESTINATIONS },
    { slug: 'facilities', name: 'Facilities', terms: FACILITIES }
  ]}
  showPriceRange={true}
  showSort={true}
  variant="default"
/>
```

### In Template Context

```typescript
import { GroupBlock } from "../components/blocks/design/GroupBlock";
import { SearchFilterPattern } from "../components/patterns/SearchFilterPattern";

export function ToursArchive() {
  const [filters, setFilters] = useState<FilterState>({});
  const [sort, setSort] = useState<string>('popularity');
  
  const filteredTours = useMemo(() => {
    return applyFilters(TOURS, filters, sort);
  }, [filters, sort]);
  
  return (
    <>
      <Hero title="African Safari Tours" />
      
      <GroupBlock className="section-filter-bar-default">
        <SearchFilterPattern
          onSearch={(query) => setFilters({ ...filters, searchQuery: query })}
          onFilterChange={setFilters}
          activeFilters={filters}
          taxonomies={taxonomies}
          showPriceRange={true}
          showSort={true}
          onSortChange={(option) => setSort(option.value)}
          onReset={() => {
            setFilters({});
            setSort('popularity');
          }}
          resultCount={filteredTours.length}
          variant="default"
        />
      </GroupBlock>
      
      <CardGrid items={filteredTours} />
    </>
  );
}
```

---

## Accessibility Requirements

### Semantic HTML
- [ ] Search input: `<input type="search">`
- [ ] Form element wrapping search: `<form role="search">`
- [ ] Filter buttons: `<button>` elements
- [ ] Sort dropdown: `<select>` element
- [ ] Reset button: `<button type="button">`

### ARIA Labels
- [ ] Search: `aria-label="Search tours"` (context-specific)
- [ ] Filter section: `aria-label="Filter options"`
- [ ] Result count announcement: `aria-live="polite"` for filter updates
- [ ] Active filters: `aria-pressed="true"` on active filter buttons

### Keyboard Navigation
- [ ] Tab through: Search → Filters → Sort → Reset
- [ ] Enter submits search
- [ ] Arrow keys navigate filter buttons
- [ ] Escape clears search input

### Screen Reader Announcements
- [ ] Result count: "Showing 24 of 156 tours"
- [ ] Filter applied: "Adventure filter applied. Showing 12 tours."
- [ ] Filters reset: "All filters cleared. Showing 156 tours."

---

## Related Patterns

- [Taxonomy Navigation](./taxonomy-navigation.md) - Filter by taxonomy terms
- [Empty State Pattern](./empty-state.md) - No results messaging
- [Card Grid Pattern](./card-grid-patterns.md) - Display filtered results

---

## Related Blocks

- [Search Block](/guidelines/blocks/theme/search.md) - Search input
- [Navigation Block](/guidelines/blocks/theme/navigation.md) - Filter buttons
- [Button Block](/guidelines/blocks/design/button.md) - Reset button
- [Group Block](/guidelines/blocks/design/group.md) - Section wrapper

---

## WordPress Template Usage

**Used In:**
- `templates/archive-tour.html`
- `templates/archive-accommodation.html`
- `templates/archive-destination.html`
- `templates/archive.html` (blog)
- `templates/archive-special.html`

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete - Ready for Implementation

