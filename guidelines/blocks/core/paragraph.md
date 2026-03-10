# Paragraph Block (core/paragraph)

**Category:** Core Content  
**WordPress Block:** `core/paragraph`  
**Status:** ✅ Documented

---

## Overview

The Paragraph block provides semantic paragraph elements with automatic typography styling from the design system.

**Key Principle:** Typography is **automatic** via semantic HTML `<p>` tag.

---

## Block Attributes

```typescript
interface ParagraphBlockAttributes {
  /** Paragraph text content */
  children: React.ReactNode;
  
  /** Optional custom classes */
  className?: string;
  
  /** Optional size override (rare) */
  size?: 'sm' | 'base' | 'lg';
}
```

---

## Design Token Application

### Automatic Typography

```css
p {
  font-family: var(--font-family-noto-sans);     /* Noto Sans sans-serif */
  font-size: var(--text-base);                   /* clamp(1rem, 0.5vw + 0.875rem, 1.125rem) */
  font-weight: var(--font-weight-normal);        /* 400 */
  line-height: var(--leading-normal);            /* 1.5 */
  letter-spacing: var(--tracking-normal);        /* 0em */
  margin-bottom: 1rem;                           /* 16px */
}
```

---

## Implementation

```typescript
interface ParagraphBlockProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'base' | 'lg';
}

export function ParagraphBlock({ children, className, size = 'base' }: ParagraphBlockProps) {
  return (
    <p className={cn(
      size === 'sm' && 'text-sm',
      size === 'lg' && 'text-lg',
      className
    )}>
      {children}
    </p>
  );
}
```

---

## Usage Examples

### ✅ Correct Usage

```typescript
// Standard paragraph
<ParagraphBlock>
  Discover unforgettable wildlife experiences across Africa.
</ParagraphBlock>

// Small text (privacy note, captions)
<ParagraphBlock size="sm" className="text-muted-foreground">
  Last updated: December 2024
</ParagraphBlock>

// Large intro text (optional)
<ParagraphBlock size="lg">
  Join us on an adventure of a lifetime.
</ParagraphBlock>
```

### ❌ Incorrect Usage

```typescript
// ❌ WRONG: Hardcoded size/weight
<ParagraphBlock className="text-base font-normal">
  Body text
</ParagraphBlock>

// ✅ CORRECT: Use semantic HTML
<ParagraphBlock>
  Body text
</ParagraphBlock>
```

---

## Nesting Rules

### Can contain:
- Text content
- Inline elements (`<span>`, `<a>`, `<strong>`, `<em>`)
- Icons (inline)

### Can be contained by:
- Group Block
- Container
- Any pattern component
- List items
- Grid cells

### Cannot contain:
- Block-level elements
- Headings
- Other paragraphs

---

## Accessibility Requirements

- [ ] Clear, readable text
- [ ] Adequate contrast (WCAG AA: 4.5:1 minimum)
- [ ] Sufficient line height (1.5 for body text)
- [ ] Not too wide (optimal: 60-75 characters per line)

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete

