# List Block (core/list)

**Category:** Core Content  
**WordPress Block:** `core/list`  
**Status:** ✅ Documented

---

## Overview

The List block provides semantic ordered and unordered lists with optional custom markers.

---

## Block Attributes

```typescript
interface ListBlockAttributes {
  /** List items */
  items: string[] | React.ReactNode[];
  
  /** List type */
  ordered?: boolean;
  
  /** Optional custom classes */
  className?: string;
  
  /** Custom marker icon */
  marker?: 'default' | 'checkmark' | 'arrow' | 'x';
}
```

---

## Design Token Application

### Typography
- Font family: `var(--font-family-noto-sans)` - AUTOMATIC
- Font size: `var(--text-base)` - AUTOMATIC
- Line height: `var(--leading-normal)` - AUTOMATIC

### Spacing
- List item spacing: `space-y-2` (8px between items)
- List bottom margin: `mb-4`

### Custom Markers (via CSS)
- Checkmark: `text-primary` → `var(--primary)` (green)
- X mark: `text-destructive` → `var(--destructive)` (red)
- Arrow: `text-accent` → `var(--accent)` (amber)

---

## Implementation

```typescript
export function ListBlock({ 
  items, 
  ordered = false, 
  className,
  marker = 'default'
}: ListBlockAttributes) {
  const Tag = ordered ? 'ol' : 'ul';
  
  return (
    <Tag className={cn(
      "space-y-2 mb-4",
      marker !== 'default' && `list-${marker}`,
      className
    )}>
      {items.map((item, index) => (
        <li key={index}>
          {item}
        </li>
      ))}
    </Tag>
  );
}
```

---

## Usage Examples

```typescript
// Unordered list (default)
<ListBlock 
  items={[
    "Accommodation (double occupancy)",
    "All meals as per itinerary",
    "Professional safari guide",
    "Park entrance fees"
  ]}
/>

// Ordered list
<ListBlock 
  ordered
  items={[
    "Arrive at Nairobi airport",
    "Transfer to safari lodge",
    "Evening game drive",
    "Dinner and overnight stay"
  ]}
/>

// With checkmark icons (included items)
<ListBlock 
  marker="checkmark"
  items={[
    "Accommodation",
    "Meals",
    "Safari guide"
  ]}
/>

// With X icons (excluded items)
<ListBlock 
  marker="x"
  items={[
    "International flights",
    "Travel insurance",
    "Visa fees"
  ]}
/>
```

---

## Accessibility Requirements

- [ ] Use semantic `<ul>` or `<ol>` tags
- [ ] Proper list structure for screen readers
- [ ] List items contain complete thoughts
- [ ] Nested lists maintain proper hierarchy

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete

