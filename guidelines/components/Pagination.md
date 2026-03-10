# Pagination Component Guidelines

**Component:** `Pagination`  
**Location:** `/src/app/components/common/Pagination.tsx`  
**WordPress Equivalent:** `core/query-pagination`  
**Category:** Common Components (Navigation)

---

## Purpose

The Pagination component provides page number navigation for archive pages with multiple pages of results.

**Use for:**
- Archive pages with many items (Tours, Destinations, Blog)
- Search results with multiple pages
- Taxonomy archive pages
- Any listing with more than one page

**Don't use for:**
- Single page content
- Infinite scroll implementations (use Load More instead)
- Navigation between different pages (use Header links)

---

## WordPress Mapping

```html
<!-- WordPress Template (archive.html) -->
<!-- wp:query-pagination -->
<div class="wp-block-query-pagination">
  <!-- wp:query-pagination-previous /-->
  <!-- wp:query-pagination-numbers /-->
  <!-- wp:query-pagination-next /-->
</div>
<!-- /wp:query-pagination -->
```

**React Equivalent:**

```tsx
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
/>
```

---

## Component API

### Props

```typescript
interface PaginationProps {
  /** Current page number (1-indexed) */
  currentPage: number;
  
  /** Total number of pages */
  totalPages: number;
  
  /** Page change callback */
  onPageChange: (page: number) => void;
  
  /** Show page numbers (default: true) */
  showNumbers?: boolean;
  
  /** Show previous/next buttons (default: true) */
  showPrevNext?: boolean;
  
  /** Show first/last buttons (default: false) */
  showFirstLast?: boolean;
  
  /** Maximum page numbers to show (default: 5) */
  maxPages?: number;
  
  /** Scroll to top on page change (default: true) */
  scrollToTop?: boolean;
  
  /** Additional CSS classes */
  className?: string;
}
```

---

## Usage

### Basic Usage

```tsx
import { Pagination } from "../components/common/Pagination";

function ToursArchive() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalItems = tours.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <PageLayout>
      <Hero />
      <CardGrid items={paginatedTours} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </PageLayout>
  );
}
```

### With Custom Configuration

```tsx
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  showNumbers
  showPrevNext
  showFirstLast
  maxPages={7}
  scrollToTop={false}
/>
```

### Minimal (Previous/Next Only)

```tsx
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  showNumbers={false}
  showPrevNext
/>
```

---

## Visual Appearance

### Default State
```
[← Previous]  1  2  [3]  4  5  [Next →]
```

### First Page
```
1  [2]  3  4  5  [Next →]
```

### Last Page
```
[← Previous]  1  2  3  4  [5]
```

### Many Pages (Ellipsis)
```
[← Previous]  [1]  ...  4  5  [6]  7  8  ...  [10]  [Next →]
```

### With First/Last
```
[« First]  [← Previous]  1  2  [3]  4  5  [Next →]  [Last »]
```

---

## Styling

### CSS Variables (from theme.css)

```css
/* Use semantic colors */
.pagination-button {
  background-color: hsl(var(--background));
  border: 1px solid hsl(var(--border));
  color: hsl(var(--foreground));
}

.pagination-button:hover {
  background-color: hsl(var(--accent));
}

.pagination-button-active {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.pagination-button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Touch targets (minimum 44x44px) */
.pagination-button {
  min-width: 44px;
  min-height: 44px;
}
```

### Design Tokens

**Colors:**
- Default: `bg-background`, `border-border`, `text-foreground`
- Hover: `bg-accent`
- Active: `bg-primary`, `text-primary-foreground`
- Disabled: `opacity-50`

**Spacing:**
- Gap between buttons: `gap-2` (8px)
- Padding: `px-4 py-2` (16px horizontal, 8px vertical)
- Touch target: `min-w-[44px] min-h-[44px]`

**Typography:**
- Font family: Noto Sans (from theme.css)
- Font size: `text-sm` (14px)
- Font weight: `font-medium` (500)

**Border Radius:**
- Buttons: `rounded-lg` (6px)

---

## Accessibility

### WCAG 2.1 AA Compliance

**Semantic HTML:**
```tsx
<nav aria-label="Pagination" role="navigation">
  <ul className="pagination-list">
    <li>
      <a href="#page=1" aria-label="Go to page 1">1</a>
    </li>
    <li>
      <a href="#page=2" aria-current="page" aria-label="Page 2, current page">2</a>
    </li>
  </ul>
</nav>
```

**Required Attributes:**
- `aria-label="Pagination"` on `<nav>`
- `aria-current="page"` on active page
- `aria-label` on each page link (e.g., "Go to page 3")
- `aria-disabled="true"` on disabled buttons

**Keyboard Navigation:**
- **Tab** - Focus next/previous button or page number
- **Enter** - Activate focused button
- **Arrow keys** - Navigate between page numbers (optional)

**Screen Reader Announcements:**
- "Pagination navigation"
- "Page 2 of 10"
- "Go to page 3"
- "Current page, page 2"
- "Previous page" / "Next page"

**Focus States:**
- All buttons must have visible focus indicators
- Use `ring-ring` for focus outline

---

## Pagination Logic

### Calculate Total Pages

```tsx
const itemsPerPage = 12;
const totalItems = tours.length;
const totalPages = Math.ceil(totalItems / itemsPerPage);
```

### Get Paginated Items

```tsx
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const paginatedItems = allItems.slice(startIndex, endIndex);
```

### Page Change Handler

```tsx
const handlePageChange = (page: number) => {
  // Validate page number
  if (page < 1 || page > totalPages) return;
  
  // Update state
  setCurrentPage(page);
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Optional: Update URL
  const url = new URL(window.location.href);
  url.searchParams.set('page', String(page));
  window.history.pushState({}, '', url);
};
```

### Page Range Display

```tsx
// Show max 5 page numbers
// Example: [1] ... [4] [5] [6] ... [10]

function getPageRange(currentPage: number, totalPages: number, maxPages: number = 5) {
  const halfMax = Math.floor(maxPages / 2);
  
  let startPage = Math.max(1, currentPage - halfMax);
  let endPage = Math.min(totalPages, currentPage + halfMax);
  
  // Adjust if at start/end
  if (currentPage <= halfMax) {
    endPage = Math.min(totalPages, maxPages);
  } else if (currentPage >= totalPages - halfMax) {
    startPage = Math.max(1, totalPages - maxPages + 1);
  }
  
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  return pages;
}
```

---

## URL Management

### Query Parameters

```
/tours?page=2
/travel-styles/adventure?page=3
/blog?page=1&category=tips
```

### Reading from URL

```tsx
const searchParams = new URLSearchParams(window.location.search);
const initialPage = parseInt(searchParams.get('page') || '1', 10);
const [currentPage, setCurrentPage] = useState(initialPage);
```

### Updating URL

```tsx
const handlePageChange = (page: number) => {
  setCurrentPage(page);
  
  // Update URL without reload
  const url = new URL(window.location.href);
  url.searchParams.set('page', String(page));
  window.history.pushState({}, '', url);
};
```

---

## Common Patterns

### Archive with Pagination

```tsx
function ToursArchive() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  
  // Calculate pagination
  const totalPages = Math.ceil(tours.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTours = tours.slice(startIndex, startIndex + itemsPerPage);
  
  return (
    <PageLayout>
      <Hero title="All Tours" />
      <CardGrid items={paginatedTours} />
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </PageLayout>
  );
}
```

### With Filters

```tsx
function FilteredArchive() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  
  // Filter items
  const filteredItems = applyFilters(allItems, filters);
  
  // Paginate filtered items
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);
  
  return (
    <>
      <FilterBar onFilterChange={setFilters} />
      <CardGrid items={paginatedItems} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
```

### Load More (Alternative)

```tsx
function InfiniteScroll() {
  const [itemsToShow, setItemsToShow] = useState(12);
  const hasMore = itemsToShow < allItems.length;
  
  const loadMore = () => {
    setItemsToShow(prev => prev + 12);
  };
  
  return (
    <>
      <CardGrid items={allItems.slice(0, itemsToShow)} />
      
      {hasMore && (
        <button
          onClick={loadMore}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg"
        >
          Load More
        </button>
      )}
    </>
  );
}
```

---

## Mobile Considerations

### Touch Targets

**Minimum 44x44px:**
```tsx
<button className="min-w-[44px] min-h-[44px] px-4 py-2">
  1
</button>
```

### Responsive Design

**Desktop (show all):**
```
[← Previous]  1  2  3  4  5  6  7  [Next →]
```

**Tablet (show fewer):**
```
[← Prev]  1  ...  3  4  5  ...  10  [Next →]
```

**Mobile (minimal):**
```
[← Prev]  Page 3 of 10  [Next →]
```

### Horizontal Scroll (Mobile)

```tsx
<nav className="overflow-x-auto">
  <div className="flex items-center gap-2 min-w-max px-4">
    {/* Pagination buttons */}
  </div>
</nav>
```

---

## Performance

### Avoid Full Re-renders

```tsx
// ❌ Bad: Re-renders entire list
const paginatedItems = useMemo(() => {
  return items.slice(startIndex, endIndex);
}, [items, currentPage, itemsPerPage]);

// ✅ Good: Only re-calculate on change
const paginatedItems = items.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);
```

### Virtual Scrolling (Large Lists)

For very large datasets (1000+ items), consider:
- Server-side pagination (fetch only current page)
- Virtual scrolling libraries
- Infinite scroll with data windowing

---

## Testing Checklist

- [ ] Pagination displays correctly with 2+ pages
- [ ] Pagination hidden with 1 page
- [ ] Current page highlighted
- [ ] Previous button disabled on page 1
- [ ] Next button disabled on last page
- [ ] Page numbers clickable
- [ ] Clicking page number changes displayed items
- [ ] URL updates with page parameter
- [ ] Scroll to top on page change
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Screen reader announces current page
- [ ] Touch targets minimum 44x44px
- [ ] Ellipsis shown for many pages
- [ ] First/Last buttons work (if enabled)
- [ ] Responsive on mobile

---

## Related Components

- **CardGrid** - Displays paginated items
- **FilterBar** - Filters items before pagination
- **EmptyState** - Shows when no items on page
- **LoadingSpinner** - Shows while loading page

---

## WordPress Block Theme Alignment

### Block Pattern Registration

```php
// WordPress: patterns/archive-with-pagination.php
<?php
/**
 * Title: Archive with Pagination
 * Slug: tour-operator/archive-pagination
 * Categories: query
 */
?>

<!-- wp:query -->
<div class="wp-block-query">
  <!-- wp:post-template -->
    <!-- Post cards here -->
  <!-- /wp:post-template -->
  
  <!-- wp:query-pagination -->
  <div class="wp-block-query-pagination">
    <!-- wp:query-pagination-previous /-->
    <!-- wp:query-pagination-numbers /-->
    <!-- wp:query-pagination-next /-->
  </div>
  <!-- /wp:query-pagination -->
</div>
<!-- /wp:query -->
```

### Template Usage

```html
<!-- templates/archive-tour.html -->
<!-- wp:template-part {"slug":"header"} /-->

<!-- wp:query {"queryId":1,"query":{"perPage":12}} -->
  <!-- wp:post-template -->
    <!-- Tour cards -->
  <!-- /wp:post-template -->
  
  <!-- wp:query-pagination -->
  <!-- /wp:query-pagination -->
<!-- /wp:query -->

<!-- wp:template-part {"slug":"footer"} /-->
```

---

## Implementation Notes

**Component Location:**
- File: `/src/app/components/common/Pagination.tsx`
- Not in `/patterns/` (utility component, not a pattern)
- Not in `/blocks/` (common component, not a block)

**State Management:**
- Page state managed by parent component
- Pagination is stateless (controlled component)
- URL sync handled by parent

**Styling:**
- Uses design tokens from `/src/styles/theme.css`
- Responsive breakpoints via Tailwind
- No hardcoded colors or spacing

---

This component provides essential navigation for multi-page listings and ensures users can browse large collections of content efficiently.
