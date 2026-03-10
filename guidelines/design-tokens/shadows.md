# Shadow Design Tokens

## Purpose

This document defines the **elevation/shadow system** used throughout the LightSpeed Tour Operator plugin prototype. All shadow values are defined as CSS custom properties in `/src/styles/theme-light.css` (light mode) and `/src/styles/theme-dark.css` (dark mode).

---

## Shadow System Philosophy

**Functional, not decorative:** Shadows serve to establish visual hierarchy and define elevation levels, not to add decorative effects.

**Consistent elevation:** Shadows are used sparingly and consistently to communicate depth and layering.

**Soft depth:** The default shadow uses a **subtle soft shadow** (low opacity, slight blur) to maintain a clean, modern appearance appropriate for WordPress block themes.

---

## Core Shadow Tokens

### Elevation Small (Default)

```css
--elevation-sm: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);     /* Light mode */
--elevation-sm: 0px 1px 3px 0px rgba(0, 0, 0, 0.50);     /* Dark mode */
```

**Visual Effect:** Subtle soft shadow with 1-2px offset, minimal blur

**Tailwind Class:** `shadow-sm`

**Usage:** Cards, buttons, containers that need subtle elevation

**Example:**
```typescript
<div className="rounded-lg border border-border shadow-sm bg-card p-6">
  Card with default elevation
</div>
```

### Elevation Medium

```css
--elevation-md: 0px 4px 6px -1px rgba(0, 0, 0, 0.10);    /* Light mode */
--elevation-md: 0px 4px 8px -2px rgba(0, 0, 0, 0.50);    /* Dark mode */
```

**Visual Effect:** Moderate depth shadow for lifted elements

**Usage:** Dropdowns, active cards, focused elements

### Elevation Large

```css
--elevation-lg: 0px 10px 15px -3px rgba(0, 0, 0, 0.10);  /* Light mode */
--elevation-lg: 0px 10px 20px -5px rgba(0, 0, 0, 0.50);  /* Dark mode */
```

**Visual Effect:** Prominent shadow for modal/overlay elevation

**Usage:** Modals, popovers, dialogs

### Elevation Extra Large

```css
--elevation-xl: 0px 20px 25px -5px rgba(0, 0, 0, 0.10);  /* Light mode */
--elevation-xl: 0px 20px 30px -8px rgba(0, 0, 0, 0.50);  /* Dark mode */
```

**Visual Effect:** Maximum depth for highest-level overlays

**Usage:** Full-screen modals, critical dialogs

---

## Tailwind Shadow Utilities

Tailwind provides a complete shadow scale. For this project, we primarily use:

| Utility | Shadow Definition | Usage |
|---------|-------------------|-------|
| `shadow-none` | `box-shadow: none` | Remove all shadows |
| `shadow-sm` | `0px 1px 2px 0px rgba(0, 0, 0, 0.05)` | Default elevation (cards, buttons) |
| `shadow` | Default Tailwind shadow | Alternative soft shadow (if needed) |
| `shadow-md` | Default Tailwind shadow-md | Medium elevation (modals, dropdowns) |
| `shadow-lg` | Default Tailwind shadow-lg | Large elevation (dialogs, popovers) |
| `shadow-xl` | Default Tailwind shadow-xl | Extra large elevation (modals) |

**Note:** The custom elevation tokens (`--elevation-sm` through `--elevation-xl`) are defined per mode — light mode uses subtle opacity (0.05–0.10), dark mode uses higher opacity (0.50) since dark surfaces need more pronounced shadows to maintain depth perception.

---

## Shadow Presets by Component

### 1. Cards

**Standard Card:**
```typescript
<div className="rounded-lg border border-border shadow-sm bg-card p-6">
  Card with subtle elevation
</div>
```

**Hoverable Card:**
```typescript
<div className="rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow bg-card p-6">
  Card with hover elevation increase
</div>
```

**Flat Card (No Shadow):**
```typescript
<div className="rounded-lg border border-border bg-card p-6">
  Card without shadow (relies on border only)
</div>
```

---

### 2. Buttons

**Elevated Button:**
```typescript
<button className="rounded-md shadow-sm bg-primary text-primary-foreground px-4 py-2 hover:shadow-md transition-shadow">
  Button with elevation
</button>
```

**Flat Button (No Shadow):**
```typescript
<button className="rounded-md bg-secondary text-secondary-foreground px-4 py-2">
  Flat button without shadow
</button>
```

---

### 3. Modals & Dialogs

**Modal:**
```typescript
<div className="fixed inset-0 bg-black/50 flex items-center justify-center">
  <div className="rounded-lg shadow-lg bg-card p-8 max-w-md">
    <h2>Modal Title</h2>
    <p>Modal content</p>
  </div>
</div>
```

**Dialog:**
```typescript
<div className="rounded-lg shadow-xl bg-card p-6 max-w-lg">
  <h2>Dialog Title</h2>
  <p>Dialog content with extra elevation</p>
</div>
```

---

### 4. Dropdowns & Popovers

**Dropdown Menu:**
```typescript
<div className="rounded-md shadow-lg bg-popover border border-border p-2">
  <ul>
    <li className="px-4 py-2 hover:bg-muted rounded-sm">Menu Item 1</li>
    <li className="px-4 py-2 hover:bg-muted rounded-sm">Menu Item 2</li>
  </ul>
</div>
```

**Tooltip:**
```typescript
<div className="rounded-md shadow-md bg-popover text-popover-foreground px-3 py-2 text-sm">
  Tooltip text
</div>
```

---

### 5. Images & Media

**Image Card:**
```typescript
<div className="rounded-lg overflow-hidden shadow-sm">
  <img src="/image.jpg" alt="Feature" className="w-full h-64 object-cover" />
  <div className="p-4 bg-card">
    <h3>Image Title</h3>
  </div>
</div>
```

---

### 6. Navigation

**Header (No Shadow):**
```typescript
<header className="border-b border-border bg-sidebar">
  Header without shadow (uses border for separation)
</header>
```

**Sticky Header (With Shadow):**
```typescript
<header className="sticky top-0 shadow-sm bg-sidebar border-b border-border">
  Sticky header with subtle shadow
</header>
```

---

## Shadow Usage Rules

### 1. Use Shadows Sparingly

Shadows should be used to establish **functional hierarchy**, not decoration:

**✅ Good:**
```typescript
// Card needs elevation to stand out from background
<div className="rounded-lg shadow-sm border border-border bg-card p-6">
  Card content
</div>
```

**❌ Bad:**
```typescript
// Every element has shadow (creates visual noise)
<div className="shadow-lg">
  <h1 className="shadow-md">Title</h1>
  <p className="shadow-sm">Paragraph</p>
</div>
```

---

### 2. Increase Shadow on Interaction

**✅ Good:**
```typescript
<button className="shadow-sm hover:shadow-md transition-shadow">
  Button with hover elevation
</button>
```

**❌ Bad:**
```typescript
<button className="shadow-xl hover:shadow-none">
  Decreasing shadow on hover
</button>
```

---

### 3. Match Shadow to Elevation Level

**✅ Good:**
```typescript
// Modal is above content → larger shadow
<div className="fixed inset-0 z-50">
  <div className="shadow-xl bg-card rounded-lg">Modal</div>
</div>

// Card is on surface → smaller shadow
<div className="shadow-sm bg-card rounded-lg">Card</div>
```

---

### 4. Don't Mix Shadow with Strong Borders

**✅ Good:**
```typescript
// Subtle border with shadow
<div className="border border-border shadow-sm rounded-lg">
  Card
</div>

// Or strong border without shadow
<div className="border-2 border-primary rounded-lg">
  Emphasized card
</div>
```

**❌ Bad:**
```typescript
// Heavy border AND heavy shadow
<div className="border-4 border-border shadow-xl rounded-lg">
  Too much visual weight
</div>
```

---

## Common Shadow Patterns

### 1. Elevated Card

```typescript
<div className="rounded-lg border border-border shadow-sm bg-card p-6">
  <h3 className="mb-2">Card Title</h3>
  <p className="text-muted-foreground">Card description</p>
</div>
```

---

### 2. Interactive Card (Hover Effect)

```typescript
<a
  href="/destination"
  className="block rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow bg-card p-6"
>
  <h3 className="mb-2">Destination Name</h3>
  <p className="text-muted-foreground">Destination description</p>
</a>
```

---

### 3. Modal Dialog

```typescript
<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
  <div className="rounded-lg shadow-xl bg-card p-8 max-w-md">
    <h2 className="mb-4">Modal Title</h2>
    <p className="mb-6">Modal content</p>
    <div className="flex justify-end gap-2">
      <button className="rounded-md px-4 py-2 bg-secondary text-secondary-foreground">
        Cancel
      </button>
      <button className="rounded-md px-4 py-2 bg-primary text-primary-foreground">
        Confirm
      </button>
    </div>
  </div>
</div>
```

---

### 4. Dropdown Menu

```typescript
<div className="relative">
  <button className="rounded-md px-4 py-2 bg-primary text-primary-foreground">
    Menu
  </button>
  <div className="absolute top-full mt-2 rounded-md shadow-lg bg-popover border border-border min-w-[200px]">
    <ul className="py-2">
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-muted">
          Menu Item 1
        </a>
      </li>
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-muted">
          Menu Item 2
        </a>
      </li>
    </ul>
  </div>
</div>
```

---

### 5. Image Gallery Card

```typescript
<div className="rounded-lg overflow-hidden shadow-sm bg-card">
  <img
    src="/destination.jpg"
    alt="Destination"
    className="w-full h-48 object-cover"
  />
  <div className="p-4">
    <h3 className="mb-2">Destination Name</h3>
    <p className="text-muted-foreground text-sm">Short description</p>
  </div>
</div>
```

---

## Shadow Transitions

### Hover Elevation

```typescript
<div className="shadow-sm hover:shadow-md transition-shadow duration-200">
  Smooth shadow transition on hover
</div>
```

**Duration Options:**
- `duration-150` - Fast (150ms) - Buttons
- `duration-200` - Default (200ms) - Cards
- `duration-300` - Slow (300ms) - Large elements

---

### Focus Elevation

```typescript
<button className="shadow-sm focus:shadow-md transition-shadow duration-200">
  Shadow increases on focus
</button>
```

---

## Accessibility Considerations

### 1. Don't Rely on Shadow Alone

Shadows should not be the only indicator of interactive state:

**✅ Good:**
```typescript
<button className="bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:bg-primary/90 transition-all">
  Button with multiple hover indicators
</button>
```

**❌ Bad:**
```typescript
<button className="shadow-sm hover:shadow-lg">
  Shadow is only hover indicator
</button>
```

---

### 2. Ensure Sufficient Contrast

Shadows must be visible in both light and dark modes:

- **Light mode:** `rgba(0, 0, 0, 0.05–0.10)` — Subtle soft shadows
- **Dark mode:** `rgba(0, 0, 0, 0.50)` — Higher opacity for depth on dark surfaces

---

## Dark Mode Behavior

The elevation tokens automatically adapt to dark mode:

```css
/* Light mode */
:root {
  --elevation-sm: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  --elevation-md: 0px 4px 6px -1px rgba(0, 0, 0, 0.10);
  --elevation-lg: 0px 10px 15px -3px rgba(0, 0, 0, 0.10);
  --elevation-xl: 0px 20px 25px -5px rgba(0, 0, 0, 0.10);
}

/* Dark mode */
.dark {
  --elevation-sm: 0px 1px 3px 0px rgba(0, 0, 0, 0.50);
  --elevation-md: 0px 4px 8px -2px rgba(0, 0, 0, 0.50);
  --elevation-lg: 0px 10px 20px -5px rgba(0, 0, 0, 0.50);
  --elevation-xl: 0px 20px 30px -8px rgba(0, 0, 0, 0.50);
}
```

**Usage remains the same:**
```typescript
<div className="shadow-sm">
  Automatically adapts to dark mode
</div>
```

---

## Custom Shadow Values

### Hard Drop Shadow Variations

While `--elevation-sm` is the default, you can create custom hard shadows:

```typescript
// Larger hard shadow
<div className="rounded-lg" style={{ boxShadow: '0 6px 0 0 rgba(0,0,0,0.1)' }}>
  Custom hard shadow
</div>

// Offset hard shadow
<div className="rounded-lg" style={{ boxShadow: '4px 4px 0 0 rgba(0,0,0,0.1)' }}>
  Offset hard shadow
</div>
```

**Note:** Prefer using Tailwind utilities when possible. Only use custom values for unique design requirements.

---

## CSS Variable Reference

### Accessing in Tailwind

```typescript
className="shadow-sm"    // Uses var(--elevation-sm)
className="shadow-none"  // Removes all shadows
```

---

### Accessing in Custom CSS

```css
.custom-card {
  box-shadow: var(--elevation-sm);
}

.custom-elevated {
  box-shadow: var(--elevation-sm);
  transition: box-shadow 200ms ease;
}

.custom-elevated:hover {
  box-shadow: 0 6px 0 0 rgba(0, 0, 0, 0.15);
}
```

---

## WordPress Block Theme Mapping

In WordPress `theme.json`, shadows would be defined as:

```json
{
  "version": 2,
  "settings": {
    "shadow": {
      "presets": [
        {
          "name": "Small",
          "slug": "sm",
          "shadow": "0px 1px 2px 0px rgba(0, 0, 0, 0.05)"
        },
        {
          "name": "Medium",
          "slug": "md",
          "shadow": "0px 4px 6px -1px rgba(0, 0, 0, 0.10)"
        },
        {
          "name": "Large",
          "slug": "lg",
          "shadow": "0px 10px 15px -3px rgba(0, 0, 0, 0.10)"
        },
        {
          "name": "Extra Large",
          "slug": "xl",
          "shadow": "0px 20px 25px -5px rgba(0, 0, 0, 0.10)"
        }
      ]
    }
  }
}
```

---

## Related Documentation

- [design-tokens/borders.md](borders.md) - Border width and style system
- [design-tokens/radii.md](radii.md) - Border radius presets
- [design-tokens/colors.md](colors.md) - Color system
- [design-tokens/spacing.md](spacing.md) - Spacing system