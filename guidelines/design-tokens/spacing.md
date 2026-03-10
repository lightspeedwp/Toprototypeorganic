# Spacing Design Tokens

**DEPRECATED:** This document describes the legacy spacing system.
**Current System:** See [MODERN-SPACING.md](MODERN-SPACING.md) for the modern fluid spacing system (v4.0).

**Critical:**
- **NEVER hardcode spacing values** — Use only CSS variables from `theme-base.css`
- **NEVER use inline `style={{ padding: ... }}`** — All spacing via CSS classes
- **ZERO MARGIN policy** — Use `gap` and `padding` for layout, not margins

---

## Migration Notice

**Date:** March 2026
**Status:** Legacy — Maintained for reference only
**Action Required:** Use the modern fluid spacing system for all new development

The spacing system has been upgraded to:
- Fluid `clamp()` values (was fixed px values)
- Zero-margin layout policy (was margin-based)
- WordPress `--wp--preset--spacing--*` alignment
- Multi-breakpoint column progression (1-6 columns)
- Dedicated section, container, element, and gap token categories

**[View Modern Spacing System](MODERN-SPACING.md)**
**[View Breakpoints System](breakpoints.md)**

---

## Purpose

This document defines the **spacing system** used throughout the LightSpeed Tour Operator plugin prototype. Spacing creates visual rhythm, hierarchy, and breathing room in the interface.

---

## Spacing Philosophy

**Consistent scale:** Use predefined spacing values for margins, padding, and gaps.

**Zero Inline Styles:** Never use `style={{ padding: '24px' }}`. All spacing must be applied via Tailwind classes (`p-6`) or BEM classes in CSS files.

**WordPress preset compatibility:** Spacing tokens are designed to map to WordPress theme.json spacing presets.

**Predictable rhythm:** Spacing creates visual relationships between elements.

---

## Spacing Scale

The LightSpeed spacing system uses a **numerical scale** with increments of 4px:

| Token Name | Value | Rem Equivalent | Common Usage                        |
| ---------- | ----- | -------------- | ----------------------------------- |
| `--spacing-1` | 4px   | 0.25rem     | Tight spacing, icons                |
| `--spacing-2` | 8px   | 0.5rem      | Small gaps, compact UI              |
| `--spacing-3` | 12px  | 0.75rem     | Medium-small spacing                |
| `--spacing-4` | 16px  | 1rem        | Default spacing, card padding       |
| `--spacing-5` | 20px  | 1.25rem     | Medium spacing                      |
| `--spacing-6` | 24px  | 1.5rem      | Section spacing                     |
| `--spacing-8` | 32px  | 2rem        | Large section spacing               |
| `--spacing-10`| 40px  | 2.5rem      | Extra large spacing                 |
| `--spacing-12`| 48px  | 3rem        | Page section spacing                |
| `--spacing-16`| 64px  | 4rem        | Major section spacing               |
| `--spacing-20`| 80px  | 5rem        | Hero/major block spacing            |
| `--spacing-24`| 96px  | 6rem        | Extra large block spacing           |

**Note:** Values are conceptual for this prototype. Actual implementation uses Tailwind's default spacing scale.

---

## Tailwind Spacing Classes

The prototype uses **Tailwind's default spacing scale**, which aligns with our design system:

| Tailwind Class | Value | Usage                               |
| -------------- | ----- | ----------------------------------- |
| `m-1`, `p-1`   | 4px   | Minimal spacing                     |
| `m-2`, `p-2`   | 8px   | Small spacing                       |
| `m-3`, `p-3`   | 12px  | Medium-small spacing                |
| `m-4`, `p-4`   | 16px  | Default spacing                     |
| `m-5`, `p-5`   | 20px  | Medium spacing                      |
| `m-6`, `p-6`   | 24px  | Section spacing                     |
| `m-8`, `p-8`   | 32px  | Large spacing                       |
| `m-10`, `p-10` | 40px  | Extra large spacing                 |
| `m-12`, `p-12` | 48px  | Page section spacing                |
| `m-16`, `p-16` | 64px  | Major section spacing               |
| `m-20`, `p-20` | 80px  | Hero spacing                        |
| `m-24`, `p-24` | 96px  | Extra large block spacing           |

---

## Spacing Usage Patterns

### 1. Component Internal Spacing (Padding)

**Cards:**
```typescript
<div className="p-4">      {/* 16px padding - mobile */}
<div className="p-6">      {/* 24px padding - desktop */}
```

**Containers:**
```typescript
<Container className="px-4 py-6">   {/* Horizontal: 16px, Vertical: 24px */}
<Container className="px-6 py-8">   {/* Horizontal: 24px, Vertical: 32px */}
```

**Buttons:**
```typescript
<button className="px-4 py-2">     {/* Horizontal: 16px, Vertical: 8px */}
<button className="px-6 py-3">     {/* Horizontal: 24px, Vertical: 12px */}
```

---

### 2. Component External Spacing (Margin)

**Section Spacing:**
```typescript
<section className="mb-12">       {/* 48px bottom margin */}
<section className="mb-16">       {/* 64px bottom margin */}
<section className="mb-20">       {/* 80px bottom margin */}
```

**Element Spacing:**
```typescript
<h2 className="mb-4">             {/* 16px below heading */}
<p className="mb-6">              {/* 24px below paragraph */}
```

---

### 3. Gap Spacing (Flexbox/Grid)

**Card Grids:**
```typescript
<div className="grid gap-4">      {/* 16px gap - mobile */}
<div className="grid gap-6">      {/* 24px gap - desktop */}
```

**Flex Containers:**
```typescript
<div className="flex gap-2">      {/* 8px gap - tight spacing */}
<div className="flex gap-4">      {/* 16px gap - default */}
```

**Icon + Text:**
```typescript
<div className="flex items-center gap-2">  {/* 8px gap */}
  <MapPin className="w-5 h-5" />
  <span>Location</span>
</div>
```

---

## Spacing by Component

### Container Component

```typescript
// Default container padding
<Container className="px-4 md:px-6 lg:px-8">
  {/* Mobile: 16px, Tablet: 24px, Desktop: 32px */}
</Container>
```

---

### Hero Pattern

```typescript
<Hero className="py-12 md:py-16 lg:py-20">
  {/* Mobile: 48px, Tablet: 64px, Desktop: 80px */}
  <h1 className="mb-4">Title</h1>           {/* 16px below */}
  <p className="mb-6">Excerpt</p>           {/* 24px below */}
</Hero>
```

---

### Card Grid Pattern

```typescript
<CardGrid className="grid gap-6 md:gap-8">
  {/* Mobile: 24px gap, Desktop: 32px gap */}
  {items.map(item => (
    <Card key={item.id} className="p-4 md:p-6">
      {/* Mobile: 16px padding, Desktop: 24px padding */}
    </Card>
  ))}
</CardGrid>
```

---

### Editorial Content Pattern

```typescript
<EditorialContent className="space-y-6">
  {/* 24px vertical spacing between blocks */}
  <h2 className="mb-4">Heading</h2>     {/* 16px below */}
  <p className="mb-4">Paragraph</p>     {/* 16px below */}
  <ul className="space-y-2">            {/* 8px between list items */}
    <li>Item</li>
  </ul>
</EditorialContent>
```

---

### Fast Facts Pattern

```typescript
<FastFacts className="grid grid-cols-2 gap-4 p-6">
  {/* 24px padding, 16px gap */}
  {facts.map(fact => (
    <div key={fact.label} className="flex gap-2">
      {/* 8px gap between icon and text */}
      <Icon className="w-5 h-5" />
      <div>...</div>
    </div>
  ))}
</FastFacts>
```

---

### CTA Pattern

```typescript
<CTA className="py-12 md:py-16">
  {/* Mobile: 48px vertical, Desktop: 64px vertical */}
  <h2 className="mb-4">Title</h2>
  <p className="mb-6">Description</p>
  <button className="px-6 py-3">Action</button>
</CTA>
```

---

### Site Header

```typescript
<Header className="py-4 md:py-6">
  {/* Mobile: 16px vertical, Desktop: 24px vertical */}
  <nav className="flex items-center gap-6">
    {/* 24px gap between nav items */}
  </nav>
</Header>
```

---

### Site Footer

```typescript
<Footer className="py-12 md:py-16">
  {/* Mobile: 48px vertical, Desktop: 64px vertical */}
  <div className="grid gap-8">
    {/* 32px gap between footer sections */}
  </div>
</Footer>
```

---

## Responsive Spacing

### Mobile-First Approach

**Always start with mobile spacing, then increase for larger screens:**

```typescript
// ✅ Good - Mobile-first
<div className="p-4 md:p-6 lg:p-8">
  {/* Mobile: 16px, Tablet: 24px, Desktop: 32px */}
</div>

// ❌ Bad - Desktop-first
<div className="p-8 md:p-6 sm:p-4">
  {/* Confusing and non-standard */}
</div>
```

---

### Common Responsive Patterns

**Section Spacing:**
```typescript
<section className="py-12 md:py-16 lg:py-20">
  {/* Scales up on larger screens */}
</section>
```

**Container Padding:**
```typescript
<Container className="px-4 md:px-6 lg:px-8">
  {/* More padding on larger screens */}
</Container>
```

**Grid Gap:**
```typescript
<div className="grid gap-4 md:gap-6 lg:gap-8">
  {/* Larger gaps on larger screens */}
</div>
```

**Element Margins:**
```typescript
<h1 className="mb-4 md:mb-6">
  {/* More space below on larger screens */}
</h1>
```

---

## Spacing Utility Classes

### Space-Y (Vertical Stack)

**Add consistent vertical spacing between child elements:**

```typescript
<div className="space-y-4">
  {/* 16px vertical spacing between children */}
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
  <p>Paragraph 3</p>
</div>
```

**Common Values:**
- `space-y-2` → 8px
- `space-y-4` → 16px
- `space-y-6` → 24px
- `space-y-8` → 32px

---

### Space-X (Horizontal Stack)

**Add consistent horizontal spacing between child elements:**

```typescript
<div className="flex space-x-4">
  {/* 16px horizontal spacing between children */}
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```

---

### Gap (Grid/Flex)

**Preferred method for modern layouts:**

```typescript
// Flexbox
<div className="flex gap-4">
  {/* 16px gap */}
</div>

// Grid
<div className="grid gap-6">
  {/* 24px gap */}
</div>

// Different horizontal/vertical gaps
<div className="grid gap-x-4 gap-y-6">
  {/* Horizontal: 16px, Vertical: 24px */}
</div>
```

---

## Spacing Rules

### Rule 1: Use Consistent Scale

**✅ Good:**
```typescript
<div className="space-y-4">     {/* 16px */}
  <p className="mb-4">...</p>
</div>
```

**❌ Bad:**
```typescript
<div className="space-y-3">     {/* 12px - inconsistent */}
  <p className="mb-5">...</p>   {/* 20px - inconsistent */}
</div>
```

---

### Rule 2: Increase Spacing on Larger Screens

**✅ Good:**
```typescript
<section className="py-12 md:py-16 lg:py-20">
  {/* Progressively larger */}
</section>
```

**❌ Bad:**
```typescript
<section className="py-20 md:py-16 lg:py-12">
  {/* Gets smaller - wrong direction */}
</section>
```

---

### Rule 3: Use Gap Instead of Margin for Grids

**✅ Good:**
```typescript
<div className="grid gap-6">
  <Card />
  <Card />
</div>
```

**❌ Bad:**
```typescript
<div className="grid">
  <Card className="mb-6" />  {/* Manual margin */}
  <Card />
</div>
```

---

### Rule 4: Use Space-Y for Vertical Stacks

**✅ Good:**
```typescript
<div className="space-y-4">
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</div>
```

**❌ Bad:**
```typescript
<div>
  <p className="mb-4">Paragraph 1</p>
  <p className="mb-4">Paragraph 2</p>
</div>
```

---

## Spacing Accessibility

### 1. Touch Targets

**Minimum touch target size: 44px × 44px**

```typescript
// ✅ Good - 44px height
<button className="px-4 py-3">    {/* 16px + 12px + 12px = ~40px + text */}
  Action
</button>

// ❌ Bad - Too small
<button className="px-2 py-1">    {/* Too small for touch */}
  Action
</button>
```

---

### 2. Spacing for Readability

**Line spacing (line-height) affects readability:**
- Body text: 1.5 (defined in typography)
- Headings: 1.25 (defined in typography)

**Paragraph spacing:**
```typescript
<div className="space-y-4">      {/* 16px between paragraphs */}
  <p>...</p>
  <p>...</p>
</div>
```

---

### 3. Focus Indicators

**Ensure focus rings have space:**

```typescript
<button className="focus:ring-2 focus:ring-offset-2">
  {/* ring-offset-2 adds 2px spacing */}
  Action
</button>
```

---

## WordPress Theme.json Mapping

**Spacing presets for WordPress:**

```json
{
  "settings": {
    "spacing": {
      "units": ["px", "rem"],
      "spacingScale": {
        "steps": 0
      },
      "spacingSizes": [
        { "slug": "10", "size": "4px", "name": "1" },
        { "slug": "20", "size": "8px", "name": "2" },
        { "slug": "30", "size": "12px", "name": "3" },
        { "slug": "40", "size": "16px", "name": "4" },
        { "slug": "50", "size": "20px", "name": "5" },
        { "slug": "60", "size": "24px", "name": "6" },
        { "slug": "80", "size": "32px", "name": "8" },
        { "slug": "100", "size": "40px", "name": "10" },
        { "slug": "120", "size": "48px", "name": "12" },
        { "slug": "160", "size": "64px", "name": "16" },
        { "slug": "200", "size": "80px", "name": "20" },
        { "slug": "240", "size": "96px", "name": "24" }
      ]
    }
  }
}
```

**Usage in patterns:**
```html
<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|60"}}}} -->
```

---

## Spacing Quick Reference

```typescript
// Padding
p-4      // 16px all sides
px-4     // 16px horizontal
py-4     // 16px vertical
pt-4     // 16px top
pr-4     // 16px right
pb-4     // 16px bottom
pl-4     // 16px left

// Margin
m-4      // 16px all sides
mx-4     // 16px horizontal
my-4     // 16px vertical
mt-4     // 16px top
mr-4     // 16px right
mb-4     // 16px bottom
ml-4     // 16px left

// Gap
gap-4    // 16px gap (flex/grid)
gap-x-4  // 16px horizontal gap
gap-y-4  // 16px vertical gap

// Space Between
space-x-4  // 16px horizontal between children
space-y-4  // 16px vertical between children
```

---

## WordPress Zero Margin Policy & Block Gap
This system enforces a strict **Zero Margin Policy**. Margins are largely prohibited unless it is negative margins for display layout adjustments. Instead of margin, always opt for flex or grid **gap** (blockGap) to handle vertical and horizontal rhythm.

**Core Variables:**
- `--spacing-block-gap`: Default layout gap, mapped to `var(--spacing-gap-md)`. Use this as the `theme.json` equivalent spacing token.
- `--wp--preset--spacing--*`: Use WordPress preset mapped variables for component internals.

---

## Related Documentation

- [design-tokens/typography.md](typography.md) - Typography system
- [design-tokens/colors.md](colors.md) - Color system
- [overview-components.md](../overview-components.md) - Component usage
- [components/Container.md](../components/Container.md) - Container spacing