# Border Design Tokens

## Purpose

This document defines the **border width and style system** used throughout the LightSpeed Tour Operator plugin prototype. All border styles are defined as CSS custom properties in `/src/styles/theme-light.css` and `/src/styles/theme-dark.css`, with Tailwind utilities in `/src/styles/theme.css`.

---

## Border System Philosophy

**Consistent, not varied:** Border widths are standardized to maintain visual consistency across all components.

**Semantic usage:** Borders serve functional purposes (separating content, defining boundaries) rather than decorative ones.

---

## Border Width Tokens

### Default Border Width

```css
border: 1px solid var(--border);
```

**Usage:** Standard border for all elements

**Tailwind Class:** `border`

**Example:**
```typescript
<div className="border border-border rounded-md">
  Standard bordered element
</div>
```

---

### Border Width Scale

Tailwind provides the following border width utilities:

| Utility | Width | Usage |
|---------|-------|-------|
| `border-0` | 0px | Remove border |
| `border` | 1px | Default border |
| `border-2` | 2px | Emphasized border |
| `border-4` | 4px | Heavy border (rarely used) |
| `border-8` | 8px | Extra heavy border (rarely used) |

---

## Border Color Token

### Border Color

```css
--border: #BDBDBD;                        /* Light mode: Visible but subtle divider */
--border: #404040;                        /* Dark mode: Dark grey divider */
```

**Usage:** Default border color for all elements

**Tailwind Class:** `border-border`

**Example:**
```typescript
<div className="border border-border">
  Element with default border color
</div>
```

---

## Border Style Presets

### 1. Standard Border

**Usage:** Default border for cards, containers, inputs

```typescript
<div className="border border-border rounded-md">
  Standard border
</div>
```

**CSS Equivalent:**
```css
.element {
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}
```

---

### 2. Top Border Only

**Usage:** Section dividers, list items

```typescript
<div className="border-t border-border">
  Top border only
</div>
```

**CSS Equivalent:**
```css
.element {
  border-top: 1px solid var(--border);
}
```

---

### 3. Bottom Border Only

**Usage:** Navigation items, header separators

```typescript
<div className="border-b border-border">
  Bottom border only
</div>
```

**CSS Equivalent:**
```css
.element {
  border-bottom: 1px solid var(--border);
}
```

---

### 4. Left Border Accent

**Usage:** Blockquotes, emphasized content sections

```typescript
<blockquote className="border-l-4 border-primary pl-4">
  Emphasized quote with left accent
</blockquote>
```

**CSS Equivalent:**
```css
.blockquote {
  border-left: 4px solid var(--primary);
  padding-left: 1rem;
}
```

---

### 5. No Border

**Usage:** Remove default borders

```typescript
<div className="border-0">
  No border
</div>
```

**CSS Equivalent:**
```css
.element {
  border: 0;
}
```

---

## Border Direction Utilities

### Individual Sides

| Utility | Side | Example |
|---------|------|---------|
| `border-t` | Top | `border-t border-border` |
| `border-r` | Right | `border-r border-border` |
| `border-b` | Bottom | `border-b border-border` |
| `border-l` | Left | `border-l border-border` |

### Horizontal & Vertical

| Utility | Sides | Example |
|---------|-------|---------|
| `border-x` | Left + Right | `border-x border-border` |
| `border-y` | Top + Bottom | `border-y border-border` |

---

## Common Border Patterns

### 1. Card Border

**Usage:** Cards, containers, modal dialogs

```typescript
<div className="border border-border rounded-lg shadow-sm bg-card">
  <div className="p-6">
    Card content
  </div>
</div>
```

---

### 2. Input Border

**Usage:** Text inputs, select dropdowns, text areas

```typescript
<input
  type="text"
  className="border border-border rounded-md px-3 py-2 focus:ring-2 focus:ring-ring"
/>
```

---

### 3. Button Border

**Usage:** Secondary/ghost buttons

```typescript
<button className="border border-border rounded-md px-4 py-2 hover:bg-muted">
  Outlined Button
</button>
```

---

### 4. Divider Border

**Usage:** Section separators

```typescript
<hr className="border-t border-border my-8" />

{/* Or as div */}
<div className="border-t border-border my-8" />
```

---

### 5. Table Borders

**Usage:** Data tables

```typescript
<table className="border border-border">
  <thead>
    <tr className="border-b border-border">
      <th className="border-r border-border p-4">Header</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border">
      <td className="border-r border-border p-4">Cell</td>
    </tr>
  </tbody>
</table>
```

---

## Border Color Variants

### Using Semantic Colors

Borders can use any semantic color token:

```typescript
// Primary border
<div className="border border-primary">Primary accent border</div>

// Secondary border
<div className="border border-secondary">Secondary border</div>

// Accent border
<div className="border border-accent">Accent border</div>

// Destructive border
<div className="border border-destructive">Error border</div>

// Muted border (lighter)
<div className="border border-muted">Subtle border</div>
```

---

## Focus State Borders

### Input Focus

**Usage:** Form inputs on focus

```typescript
<input
  type="text"
  className="border border-border rounded-md focus:border-ring focus:ring-2 focus:ring-ring"
/>
```

---

### Button Focus

**Usage:** Buttons on keyboard focus

```typescript
<button className="border border-border rounded-md focus:ring-2 focus:ring-ring focus:ring-offset-2">
  Focusable Button
</button>
```

---

## Border Usage Rules

### 1. Always Use Semantic Border Color

**✅ Good:**
```typescript
<div className="border border-border">
  Uses semantic token
</div>
```

**❌ Bad:**
```typescript
<div className="border border-gray-300">
  Hardcoded color
</div>
```

---

### 2. Combine with Border Radius

**✅ Good:**
```typescript
<div className="border border-border rounded-md">
  Border with consistent radius
</div>
```

**❌ Bad:**
```typescript
<div className="border border-border" style={{ borderRadius: '3px' }}>
  Inconsistent radius
</div>
```

---

### 3. Pair with Appropriate Padding

**✅ Good:**
```typescript
<div className="border border-border rounded-md p-4">
  Border with appropriate padding
</div>
```

**❌ Bad:**
```typescript
<div className="border border-border rounded-md">
  <div>Content touching border</div>
</div>
```

---

### 4. Use Directional Borders for Dividers

**✅ Good:**
```typescript
<div className="border-b border-border pb-4 mb-4">
  Section with bottom divider
</div>
```

**❌ Bad:**
```typescript
<div className="border border-border pb-4 mb-4">
  Full border when only divider needed
</div>
```

---

## Accessibility Considerations

### 1. Don't Rely on Border Color Alone

Borders should not be the only indicator of state:

**✅ Good:**
```typescript
<input
  type="text"
  className="border border-border focus:border-ring focus:ring-2 focus:ring-ring"
  aria-invalid={hasError}
/>
{hasError && <span className="text-destructive">Error message</span>}
```

**❌ Bad:**
```typescript
<input
  type="text"
  className={hasError ? "border border-destructive" : "border border-border"}
/>
```

---

### 2. Ensure Sufficient Contrast

Border colors must have sufficient contrast with backgrounds:

- **Light mode:** `--border` (`#BDBDBD`) provides 3:1 contrast on white
- **Dark mode:** `--border` (`#404040`) provides 3:1 contrast on dark backgrounds

---

## Responsive Border Patterns

### Mobile

**Usage:** Simpler borders on mobile for cleaner look

```typescript
<div className="border-0 md:border md:border-border md:rounded-lg">
  No border on mobile, bordered on desktop
</div>
```

---

### Desktop

**Usage:** More prominent borders on larger screens

```typescript
<div className="border border-border md:border-2 rounded-md md:rounded-lg">
  Standard border on mobile, thicker on desktop
</div>
```

---

## Common Combinations

### Card with Border and Shadow

```typescript
<div className="border border-border rounded-lg shadow-sm bg-card">
  Card with subtle depth
</div>
```

### Input with Focus Ring

```typescript
<input
  type="text"
  className="border border-border rounded-md focus:ring-2 focus:ring-ring focus:border-ring"
/>
```

### Section Divider

```typescript
<div className="border-t border-border my-8" />
```

### Emphasized Content Block

```typescript
<div className="border-l-4 border-primary bg-primary/5 p-4 rounded-r-md">
  Emphasized content with left accent
</div>
```

---

## CSS Variable Reference

### Accessing in Custom CSS

```css
.custom-border {
  border: 1px solid var(--border);
}

.custom-accent-border {
  border-left: 4px solid var(--primary);
}
```

---

## Related Documentation

- [design-tokens/colors.md](colors.md) - Color system
- [design-tokens/radii.md](radii.md) - Border radius presets
- [design-tokens/shadows.md](shadows.md) - Shadow/elevation presets
- [design-tokens/spacing.md](spacing.md) - Spacing system