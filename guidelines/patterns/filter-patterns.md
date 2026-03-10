# Filter & Taxonomy Navigation Patterns

**Version:** V3 — WordPress-Native Alignment

This document defines **filter and taxonomy navigation patterns** for the LightSpeed Tour Operator plugin prototype.

---

## Purpose

Filter and taxonomy navigation patterns help users **discover and refine content** through structured filtering and category browsing.

---

## Core Principles

1. **Clear affordances** - Filters look clickable
2. **Visible state** - Active filters clearly indicated
3. **Keyboard accessible** - All filters keyboard operable
4. **Reset capability** - Easy to clear all filters
5. **Mobile-friendly** - Works on small screens

---

## Pattern Types

### 1. Taxonomy Filter Bar (Horizontal)
### 2. Filter Sidebar (Vertical)
### 3. Taxonomy Sibling Navigation
### 4. Filter Chips (Tags)
### 5. Dropdown Filters

---

## 1. Taxonomy Filter Bar (Horizontal)

**Used on:** Archive pages with taxonomy filtering (Travel Styles, Categories)

```typescript
<section className="py-6 border-b border-border">
  <Container>
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
        Travel Style:
      </span>
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <a
          href="/tours"
          className="px-4 py-2 rounded-full border border-border text-sm whitespace-nowrap hover:bg-muted transition-colors"
        >
          All Tours
        </a>
        <a
          href="/travel-style/adventure"
          className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm whitespace-nowrap"
        >
          Adventure
        </a>
        <a
          href="/travel-style/cultural"
          className="px-4 py-2 rounded-full border border-border text-sm whitespace-nowrap hover:bg-muted transition-colors"
        >
          Cultural
        </a>
        <a
          href="/travel-style/family"
          className="px-4 py-2 rounded-full border border-border text-sm whitespace-nowrap hover:bg-muted transition-colors"
        >
          Family
        </a>
      </div>
    </div>
  </Container>
</section>
```

**Properties:**
- Horizontal scroll on mobile
- Active state: filled background
- Inactive state: border only
- Rounded pill shape

---

## 2. Filter Sidebar (Vertical)

**Used on:** Desktop archive pages with multiple filter types

```typescript
<aside className="hidden lg:block w-64 shrink-0">
  <div className="sticky top-6 space-y-6">
    {/* Travel Style Filter */}
    <div>
      <h3 className="font-semibold mb-3">Travel Style</h3>
      <div className="space-y-2">
        {travelStyles.map(style => (
          <label key={style.id} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedStyles.includes(style.id)}
              onChange={() => toggleStyle(style.id)}
              className="w-4 h-4 rounded border-border"
            />
            <span className="text-sm">{style.name}</span>
            <span className="text-xs text-muted-foreground ml-auto">
              ({style.count})
            </span>
          </label>
        ))}
      </div>
    </div>

    {/* Destination Filter */}
    <div>
      <h3 className="font-semibold mb-3">Destination</h3>
      <div className="space-y-2">
        {destinations.map(dest => (
          <label key={dest.id} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedDestinations.includes(dest.id)}
              onChange={() => toggleDestination(dest.id)}
              className="w-4 h-4 rounded border-border"
            />
            <span className="text-sm">{dest.name}</span>
            <span className="text-xs text-muted-foreground ml-auto">
              ({dest.count})
            </span>
          </label>
        ))}
      </div>
    </div>

    {/* Duration Filter */}
    <div>
      <h3 className="font-semibold mb-3">Duration</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="duration" className="w-4 h-4" />
          <span className="text-sm">1-3 days</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="duration" className="w-4 h-4" />
          <span className="text-sm">4-7 days</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="duration" className="w-4 h-4" />
          <span className="text-sm">8+ days</span>
        </label>
      </div>
    </div>

    {/* Clear Filters */}
    {hasActiveFilters && (
      <button
        onClick={clearAllFilters}
        className="text-sm text-primary hover:text-primary/80 underline"
      >
        Clear all filters
      </button>
    )}
  </div>
</aside>
```

**Properties:**
- Sticky positioning
- Checkboxes for multi-select
- Radio buttons for single-select
- Item counts
- Clear all button when filters active

---

## 3. Taxonomy Sibling Navigation

**Used on:** Taxonomy archive pages to show related taxonomies

```typescript
<section className="py-6 bg-muted/50">
  <Container>
    <div>
      <h2 className="text-sm font-medium text-muted-foreground mb-3">
        Other Travel Styles
      </h2>
      <div className="flex flex-wrap gap-2">
        <a
          href="/travel-style/cultural"
          className="px-4 py-2 bg-card border border-border rounded-md text-sm hover:bg-muted transition-colors"
        >
          Cultural
        </a>
        <a
          href="/travel-style/family"
          className="px-4 py-2 bg-card border border-border rounded-md text-sm hover:bg-muted transition-colors"
        >
          Family
        </a>
        <a
          href="/travel-style/luxury"
          className="px-4 py-2 bg-card border border-border rounded-md text-sm hover:bg-muted transition-colors"
        >
          Luxury
        </a>
        <a
          href="/travel-style/honeymoon"
          className="px-4 py-2 bg-card border border-border rounded-md text-sm hover:bg-muted transition-colors"
        >
          Honeymoon
        </a>
      </div>
    </div>
  </Container>
</section>
```

**Properties:**
- Shows sibling taxonomies (same level)
- Wraps on all screen sizes
- Card background for emphasis
- Does not show current taxonomy

---

## 4. Filter Chips (Active Filters)

**Used on:** Show currently active filters with remove option

```typescript
<div className="py-4">
  <Container>
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm text-muted-foreground">Active filters:</span>
      
      {activeFilters.map(filter => (
        <button
          key={filter.id}
          onClick={() => removeFilter(filter.id)}
          className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
        >
          <span>{filter.label}</span>
          <X className="w-3 h-3" />
        </button>
      ))}

      {activeFilters.length > 0 && (
        <button
          onClick={clearAllFilters}
          className="text-sm text-muted-foreground hover:text-foreground underline"
        >
          Clear all
        </button>
      )}
    </div>
  </Container>
</div>
```

**Properties:**
- Shows all active filters
- Each filter removable individually
- "Clear all" when multiple filters
- Only visible when filters active

---

## 5. Dropdown Filters (Mobile)

**Used on:** Mobile filter menus

```typescript
<div className="lg:hidden py-4 border-b border-border">
  <Container>
    <button
      onClick={() => setFiltersOpen(!filtersOpen)}
      className="flex items-center justify-between w-full px-4 py-3 bg-muted rounded-md"
    >
      <span className="font-medium">Filters</span>
      <div className="flex items-center gap-2">
        {activeFilterCount > 0 && (
          <span className="px-2 py-0.5 bg-primary text-primary-foreground rounded-full text-xs font-medium">
            {activeFilterCount}
          </span>
        )}
        <ChevronDown className={`w-5 h-5 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
      </div>
    </button>

    {filtersOpen && (
      <div className="mt-4 p-4 bg-card border border-border rounded-md space-y-4">
        {/* Travel Style */}
        <div>
          <h3 className="font-semibold mb-3">Travel Style</h3>
          <div className="space-y-2">
            {travelStyles.map(style => (
              <label key={style.id} className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">{style.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Destination */}
        <div>
          <h3 className="font-semibold mb-3">Destination</h3>
          <select className="w-full px-3 py-2 border border-border rounded-md">
            <option value="">All Destinations</option>
            {destinations.map(dest => (
              <option key={dest.id} value={dest.id}>
                {dest.name}
              </option>
            ))}
          </select>
        </div>

        {/* Apply Button */}
        <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-md">
          Apply Filters
        </button>
      </div>
    )}
  </Container>
</div>
```

**Properties:**
- Collapsible on mobile
- Badge shows active filter count
- Full-width apply button
- Combines all filter types

---

## Search Filter

**Used on:** Archive pages with search capability

```typescript
<div className="py-6">
  <Container>
    <div className="max-w-xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search tours..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-ring focus:border-ring"
        />
      </div>
    </div>
  </Container>
</div>
```

---

## Sort Filter

**Used on:** Archive pages with sorting options

```typescript
<div className="flex items-center justify-between py-4">
  <p className="text-sm text-muted-foreground">
    Showing {totalResults} tours
  </p>

  <div className="flex items-center gap-2">
    <label htmlFor="sort" className="text-sm text-muted-foreground">
      Sort by:
    </label>
    <select
      id="sort"
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-ring"
    >
      <option value="recent">Most Recent</option>
      <option value="popular">Most Popular</option>
      <option value="duration-asc">Duration (Short to Long)</option>
      <option value="duration-desc">Duration (Long to Short)</option>
      <option value="price-asc">Price (Low to High)</option>
      <option value="price-desc">Price (High to Low)</option>
    </select>
  </div>
</div>
```

---

## Filter Layout Patterns

### Layout with Sidebar

```typescript
<div className="py-12">
  <Container>
    <div className="flex gap-8">
      {/* Sidebar Filters */}
      <FilterSidebar />

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Search */}
        <SearchFilter />

        {/* Active Filters */}
        <ActiveFilterChips />

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cards */}
        </div>
      </div>
    </div>
  </Container>
</div>
```

---

### Layout without Sidebar

```typescript
<div>
  {/* Horizontal Filter Bar */}
  <TaxonomyFilterBar />

  {/* Search & Sort */}
  <div className="py-6">
    <Container>
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <SearchFilter />
        <SortFilter />
      </div>
    </Container>
  </div>

  {/* Results */}
  <section className="py-12">
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cards */}
      </div>
    </Container>
  </section>
</div>
```

---

## Accessibility Requirements

### Keyboard Navigation

All filters must be keyboard accessible:

```typescript
<button
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleFilter();
    }
  }}
>
  Filter
</button>
```

---

### Focus Management

```typescript
<button className="focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md">
  Filter Button
</button>
```

---

### Screen Reader Announcements

```typescript
<div role="status" aria-live="polite" className="sr-only">
  {activeFilters.length} filters active. Showing {resultCount} results.
</div>
```

---

### Labels

All form inputs need labels:

```typescript
<label htmlFor="search" className="sr-only">
  Search tours
</label>
<input id="search" type="search" />
```

---

## State Management

### Active State

```typescript
// Inactive filter
<button className="px-4 py-2 border border-border rounded-full hover:bg-muted">
  Cultural
</button>

// Active filter
<button className="px-4 py-2 bg-primary text-primary-foreground rounded-full">
  Cultural
</button>
```

---

### Disabled State

```typescript
<button
  disabled
  className="px-4 py-2 border border-border rounded-full opacity-50 cursor-not-allowed"
>
  No tours (0)
</button>
```

---

### Loading State

```typescript
{isLoading ? (
  <div className="flex items-center gap-2 text-sm text-muted-foreground">
    <Loader2 className="w-4 h-4 animate-spin" />
    <span>Loading results...</span>
  </div>
) : (
  <p className="text-sm text-muted-foreground">
    {resultCount} tours found
  </p>
)}
```

---

## Mobile Optimization

### Horizontal Scroll

```typescript
<div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
  {filters.map(filter => (
    <button key={filter.id} className="whitespace-nowrap">
      {filter.label}
    </button>
  ))}
</div>
```

Add CSS to hide scrollbar:

```css
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

---

### Collapsible Filters

```typescript
<details className="lg:hidden">
  <summary className="px-4 py-3 bg-muted rounded-md cursor-pointer flex items-center justify-between">
    <span className="font-medium">Filters</span>
    <ChevronDown className="w-5 h-5" />
  </summary>
  <div className="mt-4 space-y-4">
    {/* Filter options */}
  </div>
</details>
```

---

## Performance Considerations

### Debounced Search

```typescript
import { useMemo, useState } from 'react';
import { debounce } from 'lodash-es';

function SearchFilter() {
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearch = useMemo(
    () => debounce((value: string) => {
      // Perform search
      performSearch(value);
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  return (
    <input
      type="search"
      value={searchQuery}
      onChange={handleSearchChange}
      placeholder="Search..."
    />
  );
}
```

---

## Complete Example

```typescript
<div>
  {/* Mobile Filter Toggle */}
  <div className="lg:hidden py-4 border-b border-border">
    <Container>
      <button
        onClick={() => setFiltersOpen(!filtersOpen)}
        className="flex items-center justify-between w-full px-4 py-3 bg-muted rounded-md"
      >
        <span className="font-medium">Filters</span>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 bg-primary text-primary-foreground rounded-full text-xs">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown className={`w-5 h-5 ${filtersOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
    </Container>
  </div>

  {/* Desktop Layout */}
  <div className="py-12">
    <Container>
      <div className="flex gap-8">
        {/* Sidebar (Desktop) */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-6 space-y-6">
            <FilterGroup title="Travel Style" options={travelStyles} />
            <FilterGroup title="Destination" options={destinations} />
            <FilterGroup title="Duration" options={durations} type="radio" />
            
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-primary underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Search & Sort */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <SearchFilter />
            </div>
            <SortFilter />
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <ActiveFilterChips filters={activeFilters} />
          )}

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredTours.length} of {totalTours} tours
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTours.map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  </div>
</div>
```

---

## Related Documentation

- [patterns/card-grid-patterns.md](card-grid-patterns.md) - Card grid patterns
- [patterns/hero-patterns.md](hero-patterns.md) - Hero patterns
- [mobile/forms.md](../mobile/forms.md) - Mobile form patterns
- [mobile/touch-targets.md](../mobile/touch-targets.md) - Touch targets
