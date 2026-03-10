# Archive Patterns

**Version:** 1.0 — Complete Archive Template System  
**Last Updated:** December 27, 2024  
**Status:** Production Ready ✅

## Overview

This document defines the **complete archive pattern system** used across all 8 archive templates in the LightSpeed Tour Operator plugin prototype. Archive patterns ensure consistent structure, behavior, and WordPress alignment across all listing pages.

## What is an Archive Pattern?

An **archive pattern** is a **page-level composition pattern** that:
- Lists multiple items of a specific post type or taxonomy
- Provides filtering, search, and sorting capabilities
- Uses consistent pagination and view switching
- Includes contextual breadcrumbs, FAQ, and CTA sections
- Maps directly to WordPress archive templates (`archive-{post-type}.php`)

## Archive Template Inventory

All 8 archive templates follow WordPress archetype requirements:

| Archive Template | Post Type | WordPress Template | Archetype | Status |
|------------------|-----------|-------------------|-----------|---------|
| **ToursArchive** | `tour` | `archive-tour.php` | Content Hub | ✅ Complete |
| **DestinationsArchive** | `destination` | `archive-destination.php` | Content Hub | ✅ Complete |
| **AccommodationArchive** | `accommodation` | `archive-accommodation.php` | Content Hub | ✅ Complete |
| **SpecialsArchive** | `special` | `archive-special.php` | Content Hub | ✅ Complete |
| **TeamArchive** | `team` | `archive-team.php` | Content Hub | ✅ Complete |
| **ReviewsArchive** | `review` | `archive-review.php` | Content Hub | ✅ Complete |
| **BlogArchive** | `post` | `archive.php` | Editorial Listing | ✅ Complete |
| **TaxonomyArchive** | `term` | `taxonomy.php` | Taxonomy Archive | ✅ Complete |

---

## Core Archive Pattern Structure

### 1. Required Sections (All Archives)

Every archive template MUST include these sections in this order:

```tsx
<>
  {/* 1. BREADCRUMBS - Navigation hierarchy */}
  <BreadcrumbsPattern items={[...]} />

  {/* 2. HERO or ARCHIVE HEADER - Page introduction */}
  <Hero title="..." intro="..." image="..." />
  {/* OR */}
  <ArchiveHeader title="..." description="..." context="..." itemCount={...} />

  {/* 3. FILTERS (optional but recommended) */}
  <TaxonomyNav terms={...} activeId={...} onTermClick={...} />
  {/* AND/OR */}
  <SearchFilterPattern filters={...} onFilterChange={...} />

  {/* 4. VIEW SWITCHER (if grid/list views supported) */}
  <ViewSwitcher currentView={...} onViewChange={...} />

  {/* 5. CARD GRID or SPECIALIZED PATTERN - Primary content */}
  <CardGrid layout={viewMode}>
    {items.map(item => <ItemCard key={item.id} item={item} />)}
  </CardGrid>
  {/* OR empty state */}
  <EmptyStatePattern title="..." message="..." />

  {/* 6. PAGINATION (if more than one page) */}
  <Pagination currentPage={...} totalPages={...} onPageChange={...} />

  {/* 7. FAQ SECTION - Contextual help */}
  <FAQ items={PAGE_FAQ_*} title="..." intro="..." />

  {/* 8. CTA - Call to action */}
  <CTA title={...} description={...} primaryAction={...} />
</>
```

### 2. Section Breakdown

#### Breadcrumbs
- **Pattern:** `BreadcrumbsPattern`
- **Purpose:** Show navigation hierarchy
- **Props:** Array of breadcrumb items with labels and navigation handlers
- **Example:**
```tsx
<BreadcrumbsPattern
  items={[
    { label: "Home", href: "/", onClick: () => navigateTo("home-page") },
    { label: "Tours", isCurrent: true }
  ]}
/>
```

#### Hero or Archive Header
- **Pattern:** `Hero` (for content hubs) or `ArchiveHeader` (for taxonomy archives)
- **Purpose:** Introduce the archive page with context
- **Props:**
  - `title` - Page title (H1)
  - `intro` / `description` - Brief description
  - `image` - Hero background image (Hero only)
  - `context` - Taxonomy context (ArchiveHeader only)
  - `itemCount` - Number of items (ArchiveHeader only)

#### Filters
- **Pattern:** `TaxonomyNav`, `SearchFilterPattern`, or custom filters
- **Purpose:** Allow users to filter and search content
- **Features:**
  - Taxonomy term filtering
  - Keyword search
  - Multi-select filters
  - Active filter count display
  - Clear filters action

#### View Switcher
- **Pattern:** `ViewSwitcher`
- **Purpose:** Toggle between grid and list layouts
- **Props:**
  - `currentView` - "grid" or "list"
  - `onViewChange` - Callback to change view mode

#### Card Grid
- **Pattern:** `CardGrid` with specific card components
- **Purpose:** Display items in responsive grid or list layout
- **Card Types:**
  - `TourCard` - Tours archive
  - `DestinationCard` - Destinations archive
  - `AccommodationCard` - Accommodation archive
  - `SpecialCard` - Specials archive
  - `TeamCard` - Team archive (via TeamGridPattern)
  - `BlogPostCard` - Blog archive
  - Custom review display - Reviews archive

#### Empty State
- **Pattern:** `EmptyStatePattern`
- **Purpose:** Show message when no items match filters
- **Props:**
  - `title` - "No items found"
  - `message` - Contextual message
  - `action` - Optional CTA (e.g., "Clear Filters")

#### Pagination
- **Pattern:** `Pagination`
- **Purpose:** Navigate between pages of results
- **Props:**
  - `currentPage` - 1-based current page
  - `totalPages` - Total number of pages
  - `onPageChange` - Callback to change page

#### FAQ Section
- **Pattern:** `FAQ`
- **Purpose:** Address common questions related to the archive
- **Props:**
  - `items` - Array of FAQ items from mock data
  - `title` - Section title
  - `intro` - Section introduction
- **Mock Data Sources:**
  - `PAGE_FAQ_TOURS` - Tours archive
  - `PAGE_FAQ_DESTINATIONS` - Destinations archive
  - `PAGE_FAQ_ACCOMMODATION` - Accommodation archive
  - `PAGE_FAQ_BOOKING` - Specials archive
  - `FAQ_TEAM` - Team archive
  - `PAGE_FAQ_GENERAL` - Blog archive
  - `PAGE_FAQ_TOURS` - Taxonomy archive

#### CTA Section
- **Pattern:** `CTA`
- **Purpose:** Encourage user action (contact, enquiry, newsletter)
- **Props:**
  - `title` - CTA heading
  - `description` - CTA description
  - `primaryAction` - Main button (opens modal or navigates)
  - `secondaryAction` - Optional secondary button
  - `modalTitle` / `modalDescription` - Enquiry modal content
- **Mock Data Sources:**
  - `CTA_TOURS_ARCHIVE`
  - `CTA_DESTINATIONS_ARCHIVE`
  - `CTA_ACCOMMODATION_ARCHIVE`
  - `CTA_SPECIALS_ARCHIVE`
  - `CTA_TEAM_ARCHIVE`
  - `CTA_BLOG_ARCHIVE`
  - `CTA_TAXONOMY_ARCHIVE`

---

## Archive-Specific Patterns

### Tours Archive

**Special Features:**
- Taxonomy navigation for travel styles
- Advanced search filter with duration and price range
- Grid/list view switching
- 12 items per page pagination

**Unique Patterns:**
```tsx
<TaxonomyNav terms={TRAVEL_STYLES} activeId={activeStyle} onTermClick={handleStyleChange} />
<SearchFilterPattern
  filters={[
    { id: "search", type: "search", label: "Search Tours", ... },
    { id: "duration", type: "select", label: "Duration", ... },
    { id: "priceRange", type: "select", label: "Price Range", ... }
  ]}
  activeFilterCount={activeFilterCount}
  onFilterChange={handleFilterChange}
  onClearAll={handleClearFilters}
/>
```

### Destinations Archive

**Special Features:**
- Continent filtering
- Top-level destinations only (no children)
- Grid/list view switching

**Unique Patterns:**
```tsx
<SearchFilterPattern
  searchPlaceholder="Search destinations..."
  onSearchChange={handleSearchChange}
  filters={[
    {
      id: "continent",
      type: "select",
      label: "Continent",
      options: CONTINENTS.map(c => ({ value: c.id, label: c.name }))
    }
  ]}
/>
```

### Accommodation Archive

**Special Features:**
- Taxonomy navigation for accommodation types
- Destination filtering
- Grid/list view switching

**Unique Patterns:**
```tsx
<TaxonomyNav terms={ACCOMMODATION_TYPES} activeId={activeType} onTermClick={handleTypeChange} />
<SearchFilterPattern
  filters={[
    {
      id: "destination",
      type: "select",
      label: "Destination",
      options: DESTINATIONS.map(d => ({ value: d.id, label: d.title }))
    }
  ]}
/>
```

### Specials Archive

**Special Features:**
- Custom filter buttons (All, Expiring Soon, Best Value, Last Minute)
- Sort options (Savings, Newest, Expiring)
- Countdown timers for expiring deals
- No pagination (shows all filtered results)

**Unique Patterns:**
```tsx
<Button
  variant={activeFilter === filter.value ? "primary" : "outline"}
  size="sm"
  onClick={() => setActiveFilter(filter.value)}
>
  {filter.label}
</Button>

{/* Expiring soon indicator */}
{daysLeft <= 7 && (
  <div className="mt-2 px-3 py-2 bg-accent/10 border border-accent rounded-md">
    <Clock className="h-4 w-4 text-accent" />
    <span>Expires in {daysLeft} days!</span>
  </div>
)}
```

### Team Archive

**Special Features:**
- Uses `TeamGridPattern` instead of `CardGrid`
- No filtering or pagination (shows all team members)
- Contact information display

**Unique Patterns:**
```tsx
<TeamGridPattern
  title="Our Travel Specialists"
  description="Each member brings unique expertise..."
  members={TEAM.map(m => ({
    id: m.id,
    name: m.name,
    role: m.role,
    photo: m.featuredImage,
    bio: m.excerpt,
    email: m.email,
    phone: m.phone,
    location: m.location,
    specialties: m.specialties?.slice(0, 3),
  }))}
  columns={3}
  showContactInfo={true}
/>
```

### Reviews Archive

**Special Features:**
- Statistics metrics section
- Rating and review type filtering
- Uses `ReviewsSectionPattern` instead of `CardGrid`

**Unique Patterns:**
```tsx
<StatisticsMetricsPattern
  title="What Our Travelers Say"
  description="Trusted by thousands of safari enthusiasts worldwide"
  metrics={[
    { value: totalReviews.toString(), label: "Total Reviews", icon: "MessageSquare" },
    { value: averageRating, label: "Average Rating", icon: "Star" },
    { value: `${fiveStarPercentage}%`, label: "5-Star Reviews", icon: "ThumbsUp" },
    { value: "15+", label: "Years of Excellence", icon: "Award" },
  ]}
/>

<ReviewsSectionPattern
  title="Customer Experiences"
  reviews={paginatedReviews.map(r => ({
    id: r.id,
    author: r.author,
    content: r.content,
    rating: r.rating,
    date: r.date,
    location: r.authorLocation,
    avatar: r.featuredImage,
  }))}
/>
```

### Blog Archive

**Special Features:**
- Category filtering
- Grid/list view switching
- Standard blog post cards

**Unique Patterns:**
```tsx
<SearchFilterPattern
  searchPlaceholder="Search blog posts..."
  filters={[
    {
      id: "category",
      type: "select",
      label: "Category",
      options: [
        { value: "", label: "All Categories" },
        ...BLOG_CATEGORIES.map(c => ({ value: c.id, label: c.name }))
      ]
    }
  ]}
/>
```

### Taxonomy Archive

**Special Features:**
- Uses `ArchiveHeader` instead of `Hero`
- Shows context (e.g., "Travel Style")
- Displays item count
- Simpler layout (no complex filtering)

**Unique Patterns:**
```tsx
<ArchiveHeader
  title={travelStyle.name}
  description={travelStyle.description}
  context="Travel Style"
  itemCount={relatedTours.length}
/>
```

---

## Common State Management

All archives use consistent state management patterns:

### Pagination State
```tsx
const [currentPage, setCurrentPage] = useState(1);
const ITEMS_PER_PAGE = 12;

const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const endIndex = startIndex + ITEMS_PER_PAGE;
const paginatedItems = filteredItems.slice(startIndex, endIndex);
```

### View Mode State
```tsx
const [viewMode, setViewMode] = useState<ViewMode>("grid");

<CardGrid layout={viewMode}>
  {/* items */}
</CardGrid>
```

### Filter State
```tsx
const [searchQuery, setSearchQuery] = useState("");
const [selectedCategory, setSelectedCategory] = useState("");

// Reset to page 1 when filters change
const handleFilterChange = (newFilter: string) => {
  setSelectedCategory(newFilter);
  setCurrentPage(1);
};
```

---

## Design System Integration

### CSS Variables Usage

All archives use CSS variables from `/src/styles/theme.css`:

**Typography:**
```tsx
// ✅ CORRECT: Use semantic HTML
<h1>Archive Title</h1>  // Gets var(--font-family-lora), var(--text-6xl), etc.
<p>Description</p>      // Gets var(--font-family-noto-sans), var(--text-base), etc.

// ❌ INCORRECT: Don't use inline styles or Tailwind classes for typography
<h1 className="text-4xl font-bold">Title</h1>  // Overrides design system
```

**Colors:**
```tsx
// ✅ CORRECT: Use semantic color tokens via Tailwind
className="bg-primary text-primary-foreground"
className="text-muted-foreground"
className="border-border"

// ❌ INCORRECT: Don't hardcode colors
className="bg-green-600 text-white"
style={{ backgroundColor: '#6EA532' }}
```

**Spacing:**
```tsx
// ✅ CORRECT: Use GroupBlock for section styling
<GroupBlock sectionStyle="section-filter-default">
  <SearchFilterPattern ... />
</GroupBlock>

// ✅ CORRECT: Use Tailwind spacing classes
className="py-4 gap-6 mb-12"

// ❌ INCORRECT: Don't hardcode spacing
style={{ padding: '16px', gap: '24px' }}
```

### Section Styles

All archives use `GroupBlock` with semantic section styles:

```tsx
<GroupBlock sectionStyle="section-filter-default">
  {/* Search and filter components */}
</GroupBlock>

<GroupBlock sectionStyle="section-empty-state-default">
  <EmptyStatePattern ... />
</GroupBlock>

<GroupBlock sectionStyle="section-search-filter-default">
  <SearchFilterPattern ... />
</GroupBlock>
```

See `/guidelines/patterns/section-styles.md` for all 22 section style presets.

---

## Mock Data Integration

### Required Imports

Every archive MUST import data from `/src/app/data/mock.ts`:

```tsx
import {
  // Content arrays
  TOURS,
  DESTINATIONS,
  ACCOMMODATION,
  SPECIALS,
  TEAM,
  REVIEWS,
  BLOG_POSTS,
  
  // Taxonomy arrays
  TRAVEL_STYLES,
  ACCOMMODATION_TYPES,
  BLOG_CATEGORIES,
  CONTINENTS,
  
  // CTA content
  CTA_TOURS_ARCHIVE,
  CTA_DESTINATIONS_ARCHIVE,
  CTA_ACCOMMODATION_ARCHIVE,
  CTA_SPECIALS_ARCHIVE,
  CTA_TEAM_ARCHIVE,
  CTA_BLOG_ARCHIVE,
  CTA_TAXONOMY_ARCHIVE,
  
  // FAQ collections
  PAGE_FAQ_TOURS,
  PAGE_FAQ_DESTINATIONS,
  PAGE_FAQ_ACCOMMODATION,
  PAGE_FAQ_BOOKING,
  FAQ_TEAM,
  PAGE_FAQ_GENERAL,
} from "../data/mock";
```

### No Hardcoded Content

**❌ INCORRECT:**
```tsx
const faqs = [
  { question: "How do I book?", answer: "Contact us..." }
];

<FAQ items={faqs} />
```

**✅ CORRECT:**
```tsx
import { PAGE_FAQ_TOURS } from "../data/mock";

<FAQ items={PAGE_FAQ_TOURS} />
```

---

## WordPress Mapping

### Archive Template Hierarchy

Each React archive maps to WordPress template hierarchy:

| React Component | WordPress Template | Falls Back To |
|-----------------|-------------------|---------------|
| `ToursArchive.tsx` | `archive-tour.php` | `archive.php` → `index.php` |
| `DestinationsArchive.tsx` | `archive-destination.php` | `archive.php` → `index.php` |
| `AccommodationArchive.tsx` | `archive-accommodation.php` | `archive.php` → `index.php` |
| `SpecialsArchive.tsx` | `archive-special.php` | `archive.php` → `index.php` |
| `TeamArchive.tsx` | `archive-team.php` | `archive.php` → `index.php` |
| `ReviewsArchive.tsx` | `archive-review.php` | `archive.php` → `index.php` |
| `BlogArchive.tsx` | `archive.php` | `index.php` |
| `TaxonomyArchive.tsx` | `taxonomy-{taxonomy}.php` | `taxonomy.php` → `archive.php` |

### WordPress Query Context

In WordPress, archives would use:

```php
// Main query
$query = new WP_Query([
    'post_type' => 'tour',
    'posts_per_page' => 12,
    'paged' => $paged,
    'tax_query' => [
        [
            'taxonomy' => 'travel_style',
            'field' => 'slug',
            'terms' => $selected_style,
        ]
    ]
]);

// In React prototype, this becomes:
const filteredTours = TOURS.filter(tour => 
  !activeStyle || tour.travelStyles.includes(activeStyle)
);
```

---

## Accessibility Requirements

All archives MUST meet WCAG 2.1 AA:

### Keyboard Navigation
- ✅ All filters keyboard accessible
- ✅ Pagination keyboard navigable
- ✅ View switcher keyboard operable
- ✅ Card grids keyboard navigable

### Screen Reader Support
- ✅ Breadcrumbs announced
- ✅ Filter state announced
- ✅ Pagination state announced
- ✅ Empty state clearly described
- ✅ Card count announced

### Focus Management
- ✅ Focus indicators visible
- ✅ Focus not trapped
- ✅ Logical tab order

### Color Independence
- ✅ Filter state not color-only
- ✅ Active state has text/icon indicators
- ✅ All contrast ratios meet WCAG AA (4.5:1 minimum)

---

## Testing Checklist

### Functional Testing

- [ ] **Filtering works** - Items update when filters change
- [ ] **Searching works** - Items match search query
- [ ] **Pagination works** - Correct items shown per page
- [ ] **View switching works** - Grid/list layouts display correctly
- [ ] **Empty state shows** - Displays when no items match
- [ ] **Clear filters works** - Resets all filters and shows all items
- [ ] **Breadcrumbs navigate** - Clicking breadcrumbs navigates correctly
- [ ] **FAQ expands** - FAQ items expand/collapse
- [ ] **CTA opens modal** - Primary action opens enquiry modal

### Data Integration Testing

- [ ] **Mock data loads** - All imports resolve
- [ ] **Filters use correct data** - Taxonomy terms from mock
- [ ] **Cards use correct data** - Card content from mock
- [ ] **FAQ uses correct data** - FAQ items from mock
- [ ] **CTA uses correct data** - CTA content from mock

### Design System Testing

- [ ] **Typography correct** - Lora for headings, Noto Sans for body
- [ ] **Colors semantic** - Uses CSS variables via Tailwind
- [ ] **Spacing consistent** - Uses GroupBlock section styles
- [ ] **Dark mode works** - All colors adapt to dark theme
- [ ] **Responsive layout** - Works on mobile, tablet, desktop

### Accessibility Testing

- [ ] **Keyboard navigation** - All interactive elements reachable
- [ ] **Screen reader** - Content announced correctly
- [ ] **Focus indicators** - Visible on all focusable elements
- [ ] **Contrast ratios** - All text meets WCAG AA (4.5:1)
- [ ] **ARIA labels** - Buttons and controls properly labeled

---

## Common Patterns Reference

### Filter Reset Pattern
```tsx
const handleClearFilters = () => {
  setSearchQuery("");
  setSelectedCategory("");
  setActiveFilter(undefined);
  setCurrentPage(1); // Always reset to page 1
};
```

### Showing Count Pattern
```tsx
<section className="border-b">
  <Container>
    <div className="flex items-center justify-between py-4">
      <p className="text-muted-foreground text-sm">
        Showing {paginatedItems.length} of {filteredItems.length} items
      </p>
      <ViewSwitcher currentView={viewMode} onViewChange={setViewMode} />
    </div>
  </Container>
</section>
```

### Conditional Rendering Pattern
```tsx
{paginatedItems.length > 0 ? (
  <CardGrid layout={viewMode}>
    {paginatedItems.map(item => <ItemCard key={item.id} item={item} />)}
  </CardGrid>
) : (
  <GroupBlock sectionStyle="section-empty-state-default">
    <EmptyStatePattern
      title="No items found"
      message="Try adjusting your filters..."
      action={{ label: "Clear Filters", onClick: handleClearFilters }}
    />
  </GroupBlock>
)}
```

---

## Future Enhancements

### Planned Features (Not Yet Implemented)

1. **Load More Pattern**
   - Infinite scroll option
   - "Load More" button as alternative to pagination

2. **Advanced Sorting**
   - Sort by date, popularity, price, rating
   - Ascending/descending toggle

3. **Saved Filters**
   - LocalStorage persistence
   - URL parameter support

4. **Archive Analytics**
   - Track popular filters
   - Track empty state frequency

5. **Archive SEO**
   - Meta descriptions per archive
   - Structured data (BreadcrumbList, ItemList)

---

## Related Documentation

- **[Section Styles](/guidelines/patterns/section-styles.md)** - GroupBlock section style system
- **[Filter Patterns](/guidelines/patterns/filter-patterns.md)** - Filtering and search patterns
- **[Card Grid Patterns](/guidelines/patterns/card-grid-patterns.md)** - Card layout patterns
- **[FAQ Pattern](/guidelines/patterns/faq-pattern.md)** - FAQ section implementation
- **[CTA Patterns](/guidelines/patterns/cta-patterns.md)** - Call-to-action patterns
- **[Breadcrumbs Pattern](/guidelines/patterns/breadcrumbs.md)** - Breadcrumb navigation
- **[Empty State Pattern](/guidelines/patterns/empty-state.md)** - Empty state handling
- **[Overview Patterns](/guidelines/overview-patterns.md)** - Pattern system overview

---

## Summary

**All 8 archive templates:**
- ✅ Use consistent pattern structure
- ✅ Import data from mock files
- ✅ Include breadcrumbs, FAQ, and CTA sections
- ✅ Use CSS variables for all styling
- ✅ Meet WCAG 2.1 AA accessibility requirements
- ✅ Follow WordPress archetype requirements
- ✅ Map to WordPress archive template hierarchy

**Archive patterns are production-ready and fully documented.** 🎉
