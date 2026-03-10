# Border Radius Design Tokens

## Purpose

This document defines the **border radius system** used throughout the LightSpeed Tour Operator plugin prototype. All radius values are defined as CSS custom properties in `/src/styles/theme.css`.

---

## Radius System Philosophy

**Consistent, not varied:** Border radius values are standardized to maintain visual harmony across all components.

**Subtle, not decorative:** Radius values are intentionally subtle (4px base) to maintain a professional, structured appearance appropriate for WordPress block themes.

---

## Core Radius Token

### Base Radius

```css
--radius: 4px;
```

**Usage:** Base radius value that all other radius utilities derive from

**This is the foundational value.** All radius utilities are calculated from this base.

---

## Radius Scale

### Radius Utilities

Tailwind provides these radius utilities, which map to CSS variables:

| Utility | Value | CSS Variable | Usage |
|---------|-------|--------------|-------|
| `rounded-sm` | 2px | `var(--radius-sm)` | Subtle rounding (buttons, small elements) |
| `rounded-md` | 4px | `var(--radius-md)` | Default rounding (cards, inputs) |
| `rounded-lg` | 6px | `var(--radius-lg)` | Prominent rounding (large cards, modals) |
| `rounded-xl` | 8px | `var(--radius-xl)` | Extra prominent (hero sections, feature cards) |
| `rounded-2xl` | 12px | `var(--radius-2xl)` | Large containers, featured sections |
| `rounded-3xl` | 16px | `var(--radius-3xl)` | Maximum rounding for decorative elements |
| `rounded-full` | 9999px | `var(--radius-full)` | Pills, circles, avatars |

### CSS Variable Definitions (Source of Truth: `/src/styles/theme-base.css`)

```css
:root {
  --radius:      4px;    /* Base radius */
  --radius-sm:   2px;    /* Subtle */
  --radius-md:   4px;    /* Default */
  --radius-lg:   6px;    /* Prominent */
  --radius-xl:   8px;    /* Extra prominent */
  --radius-2xl:  12px;   /* Large containers */
  --radius-3xl:  16px;   /* Maximum */
  --radius-full: 9999px; /* Pills / circles */
}
```

---

## Radius Presets by Component

### 1. Buttons

**Standard Button:**
```typescript
<button className="rounded-md px-4 py-2 bg-primary text-primary-foreground">
  Primary Button
</button>
```

**Small Button:**
```typescript
<button className="rounded-sm px-3 py-1.5 bg-secondary text-secondary-foreground">
  Small Button
</button>
```

---

### 2. Cards

**Standard Card:**
```typescript
<div className="rounded-lg border border-border bg-card p-6">
  Card content
</div>
```

**Compact Card:**
```typescript
<div className="rounded-md border border-border bg-card p-4">
  Compact card
</div>
```

**Feature Card:**
```typescript
<div className="rounded-xl border border-border bg-card p-8">
  Large feature card
</div>
```

---

### 3. Inputs

**Text Input:**
```typescript
<input
  type="text"
  className="rounded-md border border-border px-3 py-2"
/>
```

**Textarea:**
```typescript
<textarea
  className="rounded-md border border-border px-3 py-2"
  rows={4}
/>
```

**Select Dropdown:**
```typescript
<select className="rounded-md border border-border px-3 py-2">
  <option>Option 1</option>
</select>
```

---

### 4. Modals & Dialogs

**Dialog:**
```typescript
<div className="rounded-lg border border-border bg-card shadow-lg p-6 max-w-md">
  <h2>Dialog Title</h2>
  <p>Dialog content</p>
</div>
```

**Large Modal:**
```typescript
<div className="rounded-xl border border-border bg-card shadow-lg p-8 max-w-2xl">
  <h2>Modal Title</h2>
  {/* Modal content */}
</div>
```

---

### 5. Badges & Tags

**Badge:**
```typescript
<span className="rounded-sm bg-primary text-primary-foreground px-2 py-1 text-sm">
  Badge
</span>
```

**Pill Badge:**
```typescript
<span className="rounded-full bg-accent text-accent-foreground px-3 py-1 text-sm">
  Pill Badge
</span>
```

---

### 6. Images

**Thumbnail:**
```typescript
<img
  src="/image.jpg"
  alt="Thumbnail"
  className="rounded-md w-24 h-24 object-cover"
/>
```

**Feature Image:**
```typescript
<img
  src="/image.jpg"
  alt="Feature"
  className="rounded-lg w-full h-64 object-cover"
/>
```

**Avatar:**
```typescript
<img
  src="/avatar.jpg"
  alt="User avatar"
  className="rounded-full w-12 h-12 object-cover"
/>
```

---

### 7. Containers & Sections

**Content Container:**
```typescript
<div className="rounded-lg bg-muted p-6">
  Content container
</div>
```

**Highlighted Section:**
```typescript
<section className="rounded-xl bg-accent/10 border border-accent p-8">
  Featured section
</section>
```

---

## Special Radius Utilities

### Full Rounding (Pills/Circles)

```typescript
// Pill shape
<button className="rounded-full px-6 py-2 bg-primary text-primary-foreground">
  Pill Button
</button>

// Circle
<div className="rounded-full w-12 h-12 bg-primary flex items-center justify-center">
  Icon
</div>
```

---

### No Rounding

```typescript
<div className="rounded-none border border-border">
  Sharp corners
</div>
```

---

### Individual Corner Rounding

**Top Corners:**
```typescript
<div className="rounded-t-lg border border-border">
  Rounded top only
</div>
```

**Bottom Corners:**
```typescript
<div className="rounded-b-lg border border-border">
  Rounded bottom only
</div>
```

**Left Corners:**
```typescript
<div className="rounded-l-lg border border-border">
  Rounded left only
</div>
```

**Right Corners:**
```typescript
<div className="rounded-r-lg border border-border">
  Rounded right only
</div>
```

**Individual Corners:**
```typescript
<div className="rounded-tl-lg border border-border">Top-left only</div>
<div className="rounded-tr-lg border border-border">Top-right only</div>
<div className="rounded-bl-lg border border-border">Bottom-left only</div>
<div className="rounded-br-lg border border-border">Bottom-right only</div>
```

---

## Radius Usage Rules

### 1. Match Component Size

**Small components** → `rounded-sm`
**Medium components** → `rounded-md`
**Large components** → `rounded-lg`
**Extra large components** → `rounded-xl`

**Example:**
```typescript
// Small button
<button className="rounded-sm px-2 py-1 text-sm">Small</button>

// Default button
<button className="rounded-md px-4 py-2">Default</button>

// Large card
<div className="rounded-lg p-6">Large Card</div>

// Hero section
<section className="rounded-xl p-8">Hero</section>
```

---

### 2. Be Consistent Within Components

**✅ Good:**
```typescript
<div className="rounded-lg border border-border">
  <div className="rounded-t-lg bg-primary text-primary-foreground p-4">
    Header
  </div>
  <div className="p-4">
    Body
  </div>
</div>
```

**❌ Bad:**
```typescript
<div className="rounded-lg border border-border">
  <div className="rounded-full bg-primary text-primary-foreground p-4">
    Mismatched radius
  </div>
</div>
```

---

### 3. Use System Values Only

**✅ Good:**
```typescript
<div className="rounded-md border border-border">
  Uses system value
</div>
```

**❌ Bad:**
```typescript
<div className="border border-border" style={{ borderRadius: '5px' }}>
  Arbitrary value
</div>
```

---

### 4. Combine with Appropriate Padding

**✅ Good:**
```typescript
<div className="rounded-lg border border-border p-6">
  Adequate padding for visual balance
</div>
```

**❌ Bad:**
```typescript
<div className="rounded-lg border border-border p-1">
  Insufficient padding
</div>
```

---

## Common Radius Patterns

### 1. Standard Card

```typescript
<div className="rounded-lg border border-border bg-card shadow-sm p-6">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

---

### 2. Nested Cards

```typescript
<div className="rounded-lg border border-border bg-card p-6">
  <h2>Outer Card</h2>
  <div className="rounded-md border border-border bg-muted p-4 mt-4">
    Inner card with slightly less rounding
  </div>
</div>
```

---

### 3. Image with Overlay

```typescript
<div className="relative rounded-lg overflow-hidden">
  <img src="/image.jpg" alt="Feature" className="w-full h-64 object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
</div>
```

---

### 4. Button Group

```typescript
<div className="inline-flex">
  <button className="rounded-l-md border border-border px-4 py-2">
    Left
  </button>
  <button className="border-y border-r border-border px-4 py-2">
    Middle
  </button>
  <button className="rounded-r-md border border-border px-4 py-2">
    Right
  </button>
</div>
```

---

### 5. Alert Box

```typescript
<div className="rounded-md border-l-4 border-accent bg-accent/10 p-4">
  <p className="text-accent-foreground">Alert message</p>
</div>
```

---

## Responsive Radius

### Mobile to Desktop

```typescript
<div className="rounded-md md:rounded-lg lg:rounded-xl border border-border">
  Increasing radius on larger screens
</div>
```

**Use Case:** Feature cards or hero sections that benefit from more pronounced rounding on larger screens.

---

## Overflow Considerations

### Images with Radius

Always use `overflow-hidden` when rounding containers with images:

```typescript
<div className="rounded-lg overflow-hidden">
  <img src="/image.jpg" alt="Feature" className="w-full" />
</div>
```

Without `overflow-hidden`, image corners will extend beyond the rounded container.

---

### Nested Elements

When nesting rounded elements, ensure child elements don't overflow:

```typescript
<div className="rounded-lg border border-border overflow-hidden">
  <div className="bg-primary text-primary-foreground p-4">
    Header (no individual rounding needed)
  </div>
  <div className="p-4">
    Body
  </div>
</div>
```

---

## CSS Variable Reference

### Accessing in Tailwind

```typescript
className="rounded-md"     // Uses var(--radius-md)
className="rounded-lg"     // Uses var(--radius-lg)
className="rounded-xl"     // Uses var(--radius-xl)
```

---

### Accessing in Custom CSS

```css
.custom-card {
  border-radius: var(--radius-md);
}

.custom-button {
  border-radius: var(--radius-sm);
}

.custom-modal {
  border-radius: var(--radius-lg);
}
```

---

### Accessing Arbitrary Values

```typescript
// Direct access to base radius
className="rounded-[var(--radius)]"

// Custom calculation
className="rounded-[calc(var(--radius)*2)]"
```

---

## WordPress Block Theme Mapping

In WordPress `theme.json`, these radius values would be defined as:

```json
{
  "version": 2,
  "settings": {
    "custom": {
      "radius": {
        "sm": "2px",
        "md": "4px",
        "lg": "6px",
        "xl": "8px"
      }
    }
  }
}
```

---

## Related Documentation

- [design-tokens/borders.md](borders.md) - Border width and style system
- [design-tokens/shadows.md](shadows.md) - Shadow/elevation presets
- [design-tokens/spacing.md](spacing.md) - Spacing system
- [design-tokens/colors.md](colors.md) - Color system