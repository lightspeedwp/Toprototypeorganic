# Archive Header Pattern Guidelines

**Component:** `ArchiveHeader`  
**Location:** `/src/app/components/patterns/ArchiveHeader.tsx`  
**WordPress Equivalent:** Archive title block + description  
**Category:** Header Patterns

---

## Purpose

The ArchiveHeader pattern provides context and hierarchy for archive/listing pages (tours, destinations, blog, taxonomy pages).

**Use for:**
- Tours archive (`/tours`)
- Destinations archive (`/destinations`)
- Blog archive (`/blog`)
- Taxonomy archives (`/travel-styles/adventure`)
- Category archives (`/blog/category/tips`)
- Search results (`/search`)

**Don't use for:**
- Single detail pages (use Hero instead)
- Homepage (use Hero instead)
- Utility pages (use simple page header)

---

## WordPress Mapping

```html
<!-- WordPress Template (archive.html) -->
<!-- wp:group {"className":"archive-header"} -->
<div class="archive-header">
  
  <!-- wp:query-title {"type":"archive"} /-->
  
  <!-- wp:term-description /-->
  
  <!-- wp:paragraph {"className":"archive-count"} -->
  <p class="archive-count">Showing 24 tours</p>
  <!-- /wp:paragraph -->
  
</div>
<!-- /wp:group -->
```

**React Equivalent:**

```tsx
<ArchiveHeader
  title="All Tours"
  description="Explore our hand-picked collection of adventure tours around the world"
  count={tours.length}
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Tours", href: "/tours" },
  ]}
/>
```

---

## Component API

### Props

```typescript
interface ArchiveHeaderProps {
  /** Archive title (H1) */
  title: string;
  
  /** Archive description */
  description?: string;
  
  /** Total item count */
  count?: number;
  
  /** Current filter/search context */
  context?: {
    type: "search" | "category" | "tag" | "filter";
    value: string;
  };
  
  /** Breadcrumbs navigation */
  breadcrumbs?: Array<{
    label: string;
    href: string;
  }>;
  
  /** Show search bar */
  showSearch?: boolean;
  
  /** Background style */
  background?: "default" | "muted" | "none";
  
  /** Additional CSS classes */
  className?: string;
}
```

---

## Archive Header Variants

### 1. Default Archive Header
**Use for:** Standard archive pages (tours, destinations)

**Example:**
```tsx
<ArchiveHeader
  title="All Tours"
  description="Discover our expertly curated tours across 30+ destinations worldwide"
  count={48}
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Tours", href: "/tours" },
  ]}
/>
```

**Displays:**
- Breadcrumbs
- H1 title
- Description paragraph
- Item count

### 2. Taxonomy Archive Header
**Use for:** Taxonomy term pages (travel styles, categories)

**Example:**
```tsx
<ArchiveHeader
  title="Adventure Tours"
  description="Push your limits with our adrenaline-pumping adventure experiences"
  count={24}
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Tours", href: "/tours" },
    { label: "Travel Styles", href: "/travel-styles" },
    { label: "Adventure", href: "/travel-styles/adventure" },
  ]}
/>
```

### 3. Search Results Header
**Use for:** Search result pages

**Example:**
```tsx
<ArchiveHeader
  title={`Search Results for "${searchQuery}"`}
  count={results.length}
  context={{
    type: "search",
    value: searchQuery,
  }}
  showSearch
/>
```

**Displays:**
- Search query in title
- Result count
- Search bar (for refining)
- Clear search button

### 4. Filtered Archive Header
**Use for:** Filtered archive views

**Example:**
```tsx
<ArchiveHeader
  title="Iceland Tours"
  description="Explore the land of fire and ice"
  count={12}
  context={{
    type: "filter",
    value: "Destination: Iceland",
  }}
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Tours", href: "/tours" },
    { label: "Iceland", href: "/destinations/iceland" },
  ]}
/>
```

---

## Styling

### CSS Variables (from theme.css)

```css
/* Archive Header Container */
.archive-header {
  padding: var(--spacing-section-sm) 0;
  background-color: hsl(var(--muted));
}

/* Archive Header Default (no background) */
.archive-header-default {
  background-color: transparent;
  padding-top: var(--spacing-section-md);
}

/* Archive Title (H1) */
.archive-header h1 {
  /* Inherits from theme.css H1 styles */
  font-family: var(--font-family-lora);
  font-weight: var(--font-weight-bold);
  font-size: clamp(2.5rem, 4vw, 3rem);
  margin-bottom: 1rem;
}

/* Archive Description */
.archive-header p {
  font-family: var(--font-family-noto-sans);
  font-size: 1.125rem; /* 18px */
  color: hsl(var(--muted-foreground));
}

/* Archive Count */
.archive-count {
  font-size: 0.875rem; /* 14px */
  color: hsl(var(--muted-foreground));
}
```

### Design Tokens

**Colors:**
- Background (default): `bg-muted`
- Background (none): `bg-transparent`
- Text: `text-foreground`
- Description: `text-muted-foreground`
- Count: `text-muted-foreground`

**Spacing:**
- Vertical padding: `py-12` (desktop), `py-8` (mobile)
- Title margin: `mb-4`
- Description margin: `mb-2`
- Count margin: `mb-6`

**Typography:**
- H1 title: Lora, bold (700), 40-48px
- Description: Noto Sans, normal (400), 18px
- Count: Noto Sans, normal (400), 14px

---

## Content Display

### Item Count

**Single item:**
```
Showing 1 tour
```

**Multiple items:**
```
Showing 24 tours
```

**Filtered results:**
```
Showing 12 of 48 tours
```

**No results:**
```
No tours found
```

### Search Context

```
Search results for "northern lights"
24 results found
```

### Filter Context

```
Filtered by: Destination - Iceland
12 tours match your criteria
```

---

## Breadcrumbs Integration

### Standard Breadcrumbs

```tsx
<ArchiveHeader
  title="All Tours"
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Tours", href: "/tours" },
  ]}
/>
```

**Displays:**
```
Home > Tours
```

### Deep Breadcrumbs

```tsx
<ArchiveHeader
  title="Adventure Tours in Iceland"
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Tours", href: "/tours" },
    { label: "Travel Styles", href: "/travel-styles" },
    { label: "Adventure", href: "/travel-styles/adventure" },
  ]}
/>
```

**Displays:**
```
Home > Tours > Travel Styles > Adventure
```

---

## Search Integration

### With Search Bar

```tsx
<ArchiveHeader
  title="All Tours"
  description="Find your perfect adventure"
  showSearch
  count={tours.length}
/>
```

**Displays:**
- Title and description
- Inline search bar
- Item count

**Search bar features:**
- Live search
- Autocomplete
- Clear button
- Mobile-friendly

---

## Accessibility

### WCAG 2.1 AA Compliance

**Heading Hierarchy:**
- Archive header must contain exactly **one H1**
- H1 must be the archive title
- No other H1 elements on page

**Semantic HTML:**
```tsx
<header className="archive-header" aria-label="Archive header">
  {breadcrumbs && (
    <nav aria-label="Breadcrumb">
      <ol>
        {breadcrumbs.map((crumb) => (
          <li key={crumb.href}>
            <a href={crumb.href}>{crumb.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  )}
  
  <h1>{title}</h1>
  
  {description && <p>{description}</p>}
  
  {count !== undefined && (
    <p className="archive-count" aria-live="polite">
      {count === 1 ? `Showing 1 item` : `Showing ${count} items`}
    </p>
  )}
</header>
```

**Required Attributes:**
- `aria-label="Archive header"` on container
- `aria-label="Breadcrumb"` on breadcrumb nav
- `aria-live="polite"` on item count (announces filter changes)
- `aria-current="page"` on active breadcrumb

**Keyboard Navigation:**
- All breadcrumb links keyboard accessible
- Focus states visible
- Logical tab order

**Screen Reader:**
- Announces archive title
- Announces item count
- Announces breadcrumb path
- Updates count when filters change

---

## Common Patterns

### Tours Archive

```tsx
<PageLayout>
  <ArchiveHeader
    title="All Tours"
    description="Explore our hand-picked collection of adventure tours"
    count={tours.length}
    breadcrumbs={[
      { label: "Home", href: "/" },
      { label: "Tours", href: "/tours" },
    ]}
    showSearch
  />
  
  <Container className="py-12">
    <CardGrid items={tours} CardComponent={TourCard} />
  </Container>
</PageLayout>
```

### Taxonomy Archive

```tsx
<PageLayout>
  <ArchiveHeader
    title={travelStyle.name}
    description={travelStyle.description}
    count={filteredTours.length}
    breadcrumbs={[
      { label: "Home", href: "/" },
      { label: "Tours", href: "/tours" },
      { label: "Travel Styles", href: "/travel-styles" },
      { label: travelStyle.name, href: `/travel-styles/${travelStyle.slug}` },
    ]}
    background="muted"
  />
  
  <Container className="py-12">
    <TaxonomyNav siblings={travelStyle.siblings} />
    <CardGrid items={filteredTours} CardComponent={TourCard} />
  </Container>
</PageLayout>
```

### Search Results

```tsx
<PageLayout>
  <ArchiveHeader
    title={`Search Results for "${query}"`}
    count={results.length}
    context={{
      type: "search",
      value: query,
    }}
    showSearch
  />
  
  <Container className="py-12">
    {results.length > 0 ? (
      <CardGrid items={results} CardComponent={SearchResultCard} />
    ) : (
      <EmptyState
        title="No results found"
        message={`No results found for "${query}". Try a different search term.`}
      />
    )}
  </Container>
</PageLayout>
```

### Blog Archive

```tsx
<PageLayout>
  <ArchiveHeader
    title="Travel Blog"
    description="Stories, tips, and inspiration from our team of travel experts"
    count={posts.length}
    breadcrumbs={[
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
    ]}
    showSearch
  />
  
  <Container className="py-12">
    <CardGrid items={posts} CardComponent={BlogCard} />
    <Pagination currentPage={page} totalPages={totalPages} />
  </Container>
</PageLayout>
```

---

## Mobile Considerations

### Responsive Design

**Desktop (lg):**
- Full-width header
- Horizontal breadcrumbs
- Inline search bar
- Ample padding

**Tablet (md):**
- Constrained width
- Horizontal breadcrumbs
- Inline search bar
- Moderate padding

**Mobile (sm):**
- Full-width
- Stacked breadcrumbs (if long)
- Full-width search bar
- Compact padding
- Truncate long titles

---

## Testing Checklist

- [ ] H1 title displays correctly
- [ ] Description shows (if provided)
- [ ] Item count displays correctly
- [ ] Breadcrumbs display (if provided)
- [ ] Breadcrumb links work
- [ ] Search bar works (if enabled)
- [ ] Background style correct
- [ ] Count updates when filters change
- [ ] Only one H1 on page
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Screen reader announces count changes
- [ ] Responsive on all screen sizes
- [ ] Mobile: compact padding
- [ ] Touch targets minimum 44x44px

---

## Related Components

- **Hero** - For single detail pages
- **Breadcrumbs** - Navigation hierarchy
- **SearchBar** - Search functionality
- **CardGrid** - Display archive items
- **Pagination** - Multi-page navigation
- **FilterBar** - Filter controls

---

## WordPress Block Theme Alignment

### Template Usage

```html
<!-- templates/archive-tour.html -->
<!-- wp:template-part {"slug":"header"} /-->

<!-- wp:group {"className":"archive-header","layout":{"type":"constrained"}} -->
<div class="archive-header">
  
  <!-- wp:query-title {"type":"archive","level":1} /-->
  
  <!-- wp:paragraph -->
  <p>Archive description</p>
  <!-- /wp:paragraph -->
  
</div>
<!-- /wp:group -->

<!-- wp:query -->
  <!-- Archive content -->
<!-- /wp:query -->

<!-- wp:template-part {"slug":"footer"} /-->
```

---

## Implementation Notes

**Component Location:**
- File: `/src/app/components/patterns/ArchiveHeader.tsx`
- Pattern component (not a block)
- Archive-specific

**State Management:**
- Stateless component
- Count passed as prop
- Filter context passed as prop

**Styling:**
- Uses design tokens from `/src/styles/theme.css`
- Background variants
- No hardcoded colors

---

This pattern provides essential context for all archive and listing pages.
