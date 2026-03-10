# WordPress Patterns Overview

## Purpose

This document defines **WordPress block patterns** and how they compose blocks into reusable editorial structures.

---

## What Are Patterns?

In WordPress block themes, **patterns** are saved compositions of blocks:

- **Composed** - Made from multiple blocks
- **Opinionated** - Define specific editorial structures
- **Reusable** - Registered and available across templates
- **No logic** - No conditionals beyond presence/absence

---

## Pattern vs Block

| Aspect | Block | Pattern |
|--------|-------|---------|
| Composition | Atomic | Composed from blocks |
| Responsibility | Single | Multiple (editorial flow) |
| Logic | Can have state | Minimal logic |
| Nesting | Cannot nest blocks | Composes blocks |
| WP Equivalent | Core/custom block | Block pattern |

---

## Approved Patterns

### Hero Patterns (`/patterns/hero/`)

| Pattern | File | Blocks Used | Purpose |
|---------|------|-------------|---------|
| HeroStandard | `hero/HeroStandard.tsx` | Heading, Paragraph, Button | Standard hero |

**WordPress Pattern:**
```php
register_block_pattern('lightspeed/hero', [
  'title' => 'Hero',
  'content' => '
    <!-- wp:group {"layout":{"type":"constrained"}} -->
      <!-- wp:heading {"level":1} /-->
      <!-- wp:paragraph /-->
      <!-- wp:buttons -->
        <!-- wp:button /-->
      <!-- /wp:buttons -->
    <!-- /wp:group -->
  '
]);
```

---

### Header Patterns (`/patterns/header/`)

| Pattern | File | Blocks Used | Purpose |
|---------|------|-------------|---------|
| ArchiveHeader | `header/ArchiveHeader.tsx` | Heading, Paragraph | Archive page header |
| ListingHeader | `header/ListingHeader.tsx` | Heading, Paragraph, Meta | List page header |
| PageHeader | `header/PageHeader.tsx` | Heading, Breadcrumbs | Simple page header |

---

### Content Patterns (`/patterns/content/`)

| Pattern | File | Blocks Used | Purpose |
|---------|------|-------------|---------|
| EditorialContent | `content/EditorialContent.tsx` | Post Content, Headings, Paragraphs | Long-form content |
| SupportingSection | `content/SupportingSection.tsx` | Heading, Paragraph, List | Supporting content |

---

## Pattern Composition Rules

### Fixed Block Order

Patterns enforce a **fixed order** of blocks:

**✅ Good:**
```typescript
// Hero pattern
<section>
  <Heading level={1}>{title}</Heading>
  <Paragraph>{excerpt}</Paragraph>
  <Button>{ctaLabel}</Button>
</section>
```

**❌ Bad:**
```typescript
// Conditional reordering
<section>
  {showButton && <Button />}
  <Heading />
  <Paragraph />
</section>
```

---

### Presence/Absence Only

Patterns can omit blocks if content is missing:

**✅ Good:**
```typescript
<section>
  <Heading>{title}</Heading>
  {excerpt && <Paragraph>{excerpt}</Paragraph>}
  {ctaLabel && <Button>{ctaLabel}</Button>}
</section>
```

---

### No Layout Logic

Patterns should not contain layout decisions:

**✅ Good:**
```typescript
<Container>
  <Heading>{title}</Heading>
  <Paragraph>{excerpt}</Paragraph>
</Container>
```

**❌ Bad:**
```typescript
<div className={isLarge ? 'container-lg' : 'container-sm'}>
  {/* Layout logic in pattern */}
</div>
```

---

## Pattern Registration

In WordPress, patterns are registered like this:

```php
register_block_pattern('lightspeed/archive-header', [
  'title' => 'Archive Header',
  'description' => 'Header for archive pages',
  'content' => '
    <!-- wp:group {"layout":{"type":"constrained"}} -->
      <!-- wp:heading {"level":1} /-->
      <!-- wp:paragraph /-->
    <!-- /wp:group -->
  ',
  'categories' => ['lightspeed'],
  'keywords' => ['archive', 'header']
]);
```

---

## Related Documentation

- [blocks/overview-blocks.md](overview-blocks.md) - Block components
- [blocks/overview-parts.md](overview-parts.md) - Template parts
- [blocks/overview-templates.md](overview-templates.md) - Page templates
- [overview-patterns.md](../overview-patterns.md) - Detailed pattern guide
