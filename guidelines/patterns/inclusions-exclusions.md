# Inclusions & Exclusions Pattern

**Category:** Content / Meta  
**WordPress Equivalent:** Group block + Columns block + List blocks  
**Section Styles:** `section-inclusions-default`, `section-inclusions-compact`  
**Status:** ✅ Documented

---

## Overview

Displays what's included and excluded in tour packages using clear, icon-based lists. Provides transparency and manages expectations.

---

## WordPress Block Structure

```
Group {
  className: "section-inclusions-default"
  
  Inner Blocks:
    └── Container
          └── Columns { count: 2 }
                ├── Column
                │   ├── HeadingBlock { level: 3, text: "What's Included" }
                │   └── ListBlock { marker: "checkmark", items: included, iconColor: "primary" }
                └── Column
                    ├── HeadingBlock { level: 3, text: "What's Excluded" }
                    └── ListBlock { marker: "x", items: excluded, iconColor: "destructive" }
}
```

---

## Section Styles

```css
.section-inclusions-default {
  background: var(--muted);
  padding: var(--spacing-section-md);
}

.section-inclusions-default .included-list li::before {
  content: "✓";
  color: var(--primary);
  font-weight: var(--font-weight-bold);
  margin-right: 8px;
}

.section-inclusions-default .excluded-list li::before {
  content: "✗";
  color: var(--destructive);
  font-weight: var(--font-weight-bold);
  margin-right: 8px;
}
```

---

## Design Token Usage

### Colors
- Background: `bg-muted` → `var(--muted)`
- Included icon: `text-primary` → `var(--primary)` (green checkmark)
- Excluded icon: `text-destructive` → `var(--destructive)` (red X)
- Text: `text-foreground` → `var(--foreground)`

### Spacing
- Section padding: `py-12 md:py-16`
- Between columns: `gap-8 md:gap-12`
- List item spacing: `space-y-2`

---

## Props Interface

```typescript
interface InclusionsPatternProps {
  included: string[];
  excluded: string[];
  variant?: 'default' | 'compact';
}
```

---

## Usage Examples

```typescript
<InclusionsPattern
  included={[
    "Accommodation (double occupancy)",
    "All meals as per itinerary",
    "Professional safari guide",
    "4x4 safari vehicle",
    "Park entrance fees",
    "Airport transfers"
  ]}
  excluded={[
    "International flights",
    "Travel insurance",
    "Visa fees",
    "Personal expenses",
    "Tips and gratuities",
    "Optional activities"
  ]}
/>
```

---

## Accessibility Requirements

- [ ] List items use semantic `<ul>` or `<ol>`
- [ ] Icons are decorative (`aria-hidden="true"`)
- [ ] Clear list structure for screen readers

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete

