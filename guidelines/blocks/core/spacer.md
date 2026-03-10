# Spacer Block (core/spacer)

**Category:** Core Layout  
**WordPress Block:** `core/spacer`  
**Status:** ✅ Documented

---

## Overview

The Spacer block provides vertical spacing between sections using predefined height values from the design system.

---

## Block Attributes

```typescript
interface SpacerBlockAttributes {
  /** Height preset */
  height?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Optional custom classes */
  className?: string;
}
```

---

## Design Token Application

### Spacing Values (Tailwind Scale)

```typescript
const spacingMap = {
  xs: 'h-4',   // 16px
  sm: 'h-8',   // 32px
  md: 'h-12',  // 48px
  lg: 'h-16',  // 64px
  xl: 'h-24',  // 96px
};
```

These map directly to CSS variables:
- `h-4` = 16px = `1rem`
- `h-8` = 32px = `2rem`
- `h-12` = 48px = `3rem`
- `h-16` = 64px = `4rem`
- `h-24` = 96px = `6rem`

---

## Implementation

```typescript
const spacingMap = {
  xs: 'h-4',
  sm: 'h-8',
  md: 'h-12',
  lg: 'h-16',
  xl: 'h-24',
};

export function SpacerBlock({ height = 'md', className }: SpacerBlockAttributes) {
  return (
    <div 
      className={cn(spacingMap[height], className)} 
      aria-hidden="true" 
    />
  );
}
```

---

## Usage Examples

```typescript
// Small spacer (16px)
<SpacerBlock height="xs" />

// Medium spacer (48px) - DEFAULT
<SpacerBlock />

// Large spacer (64px)
<SpacerBlock height="lg" />

// Extra large spacer (96px)
<SpacerBlock height="xl" />

// Between sections
<HeadingBlock level={2}>Section 1</HeadingBlock>
<ParagraphBlock>Content...</ParagraphBlock>
<SpacerBlock height="lg" />
<HeadingBlock level={2}>Section 2</HeadingBlock>
```

---

## When to Use

### ✅ Good Use Cases:
- Add vertical space between sections
- Fine-tune spacing in editorial content
- Create breathing room in dense layouts
- Adjust spacing in patterns when default margins insufficient

### ❌ Avoid Using:
- For general section padding (use section styles instead)
- Between every element (rely on default margins first)
- As workaround for broken layout (fix layout instead)

---

## Accessibility Requirements

- [ ] Spacer has `aria-hidden="true"` (decorative only)
- [ ] Does not affect content flow for screen readers
- [ ] Does not interfere with keyboard navigation

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete

