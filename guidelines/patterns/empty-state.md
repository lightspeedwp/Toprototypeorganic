# Empty State Pattern

**Category:** Utility / Feedback  
**WordPress Equivalent:** Group block + Paragraph blocks + Button blocks  
**Section Styles:** `section-empty-state-default`  
**Status:** ✅ Documented

---

## Overview

The Empty State pattern provides helpful feedback when no content matches search/filter criteria or when a section has no items. This pattern prevents confusion and guides users toward next actions.

**Primary Use Cases:**
- No search results found
- No items match active filters
- Empty archive pages (no posts/tours yet)
- Empty related content sections
- Empty user-generated content (no reviews, no bookings)

**Design Philosophy:**
- Clear messaging (explain why empty)
- Helpful guidance (suggest next actions)
- Visual clarity (icon + text, not just text)
- Actionable (buttons to clear filters, view all, etc.)
- Empathetic tone (friendly, not error-like)

---

## WordPress Block Structure

```
Group {
  className: "section-empty-state-default"
  tagName: "div"
  
  Inner Blocks:
    └── Container { maxWidth: "sm", align: "center" }
          ├── Icon { name: "Search" | "Empty" | "Filter", size: 64, color: "muted-foreground" }
          ├── HeadingBlock { level: 3, text: "No Results Found" }
          ├── ParagraphBlock { text: "Try adjusting your filters or search terms." }
          └── Buttons { align: "center", gap: 4 }
                ├── Button { variant: "secondary", text: "Clear Filters", onClick: clearFilters }
                └── Button { variant: "ghost", text: "View All", onClick: viewAll }
}
```

---

## Section Styles

### Default Variant: `section-empty-state-default`

**Styling:**
```css
.section-empty-state-default {
  background: var(--background);
  padding: var(--spacing-section-lg);      /* 64-128px vertical */
  text-align: center;
}

.section-empty-state-default .icon {
  color: var(--muted-foreground);
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-element-lg);
}
```

**Background:** `bg-background`  
**Padding:** `py-20 md:py-24` (80-96px vertical)  
**Text Alignment:** Center  
**Container:** Max-width `sm` (480px)

---

## Design Token Usage

### Typography
- Heading (H3): AUTOMATIC via `<h3>` semantic HTML
- Paragraph: AUTOMATIC via `<p>` semantic HTML
- No Tailwind typography classes needed

### Colors
- Background: `bg-background` → `var(--background)`
- Icon: `text-muted-foreground` → `var(--muted-foreground)`
- Heading: `text-foreground` → `var(--foreground)`
- Paragraph: `text-muted-foreground` → `var(--muted-foreground)`

### Spacing
- Section padding: `py-20 md:py-24`
- Icon to heading: `mb-6`
- Heading to paragraph: `mb-4`
- Paragraph to buttons: `mt-8`
- Between buttons: `gap-4`

---

## Props Interface

```typescript
interface EmptyStatePatternProps {
  /** Icon variant */
  icon?: 'search' | 'empty' | 'filter' | 'error';
  
  /** Heading text */
  title?: string;
  
  /** Description/guidance text */
  message?: string;
  
  /** Action buttons */
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
  }>;
}
```

---

## Usage Examples

### No Search Results

```typescript
<EmptyStatePattern
  icon="search"
  title="No Results Found"
  message="We couldn't find any tours matching your search. Try different keywords or browse all tours."
  actions={[
    { label: "Clear Search", onClick: () => setSearchQuery(''), variant: "secondary" },
    { label: "View All Tours", onClick: () => navigate('/tours'), variant: "ghost" }
  ]}
/>
```

### No Filter Matches

```typescript
<EmptyStatePattern
  icon="filter"
  title="No Matching Tours"
  message="No tours match your current filters. Try removing some filters or adjusting your criteria."
  actions={[
    { label: "Clear Filters", onClick: resetFilters, variant: "secondary" },
    { label: "View All Tours", onClick: resetAndViewAll, variant: "ghost" }
  ]}
/>
```

### Empty Archive

```typescript
<EmptyStatePattern
  icon="empty"
  title="No Posts Yet"
  message="We haven't published any blog posts yet. Check back soon!"
  actions={[
    { label: "Go to Homepage", onClick: () => navigate('/'), variant: "secondary" }
  ]}
/>
```

---

## Accessibility Requirements

- [ ] Semantic HTML (h3, p, button)
- [ ] Icon has `aria-hidden="true"` (decorative)
- [ ] Clear, helpful messaging
- [ ] Keyboard-accessible buttons
- [ ] Focus states visible

---

## Related Patterns

- [Search & Filter Pattern](./search-filter.md) - Triggers empty state
- [Card Grid Pattern](./card-grid-patterns.md) - Shows empty state when no items

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete

