# Theme Variations & Dark Mode Guidelines

**Version:** V3 — WordPress-Native Alignment

This document defines **light and dark mode theme variations** and implementation guidelines for the LightSpeed Tour Operator plugin prototype.

---

## Purpose

The prototype supports **automatic dark mode** through CSS custom properties, ensuring:

- Consistent visual hierarchy in both modes
- WCAG AA contrast compliance in both modes
- Seamless theme switching without flicker
- User preference persistence

---

## Theme Architecture

### CSS Variable System

All colors are defined as CSS custom properties in `/src/styles/theme.css` with separate values for light and dark modes:

```css
:root {
  --background: rgba(255, 255, 255, 1);
  --foreground: rgba(9, 9, 9, 1);
  --primary: rgba(74, 115, 17, 1);
  /* ... */
}

.dark {
  --background: rgba(20, 20, 20, 1);
  --foreground: rgba(245, 245, 245, 1);
  --primary: rgba(74, 115, 17, 1); /* Same in both modes */
  /* ... */
}
```

---

## Light Mode Theme

### Background Colors

```css
--background: rgba(255, 255, 255, 1);        /* Pure white */
--card: rgba(255, 255, 255, 1);              /* Pure white */
--popover: rgba(255, 255, 255, 1);           /* Pure white */
--muted: rgba(225, 225, 225, 1);             /* Light gray */
```

### Foreground Colors

```css
--foreground: rgba(9, 9, 9, 1);              /* Near black */
--card-foreground: rgba(9, 9, 9, 1);         /* Near black */
--muted-foreground: rgba(86, 86, 86, 1);     /* Medium gray */
```

### Brand Colors

```css
--primary: rgba(74, 115, 17, 1);             /* Olive green */
--primary-foreground: rgba(255, 255, 255, 1);/* White */
--secondary: rgba(172, 159, 124, 1);         /* Beige */
--secondary-foreground: rgba(9, 9, 9, 1);    /* Dark text */
--accent: rgba(247, 174, 0, 1);              /* Gold */
--accent-foreground: rgba(255, 255, 255, 1); /* White */
```

### Utility Colors

```css
--destructive: rgba(204, 0, 0, 1);           /* Red */
--border: rgba(117, 117, 117, 1);            /* Medium gray */
--input-background: rgba(255, 255, 255, 1);  /* White */
--ring: rgba(0, 71, 208, 1);                 /* Blue */
```

---

## Dark Mode Theme

### Background Colors

```css
--background: rgba(20, 20, 20, 1);           /* Very dark gray */
--card: rgba(30, 30, 30, 1);                 /* Dark gray */
--popover: rgba(30, 30, 30, 1);              /* Dark gray */
--muted: rgba(60, 60, 60, 1);                /* Medium dark */
```

### Foreground Colors

```css
--foreground: rgba(245, 245, 245, 1);        /* Off-white */
--card-foreground: rgba(245, 245, 245, 1);   /* Off-white */
--muted-foreground: rgba(150, 150, 150, 1);  /* Light gray */
```

### Brand Colors

```css
--primary: rgba(74, 115, 17, 1);             /* Same olive green */
--primary-foreground: rgba(255, 255, 255, 1);/* White */
--secondary: rgba(120, 110, 85, 1);          /* Darker beige */
--secondary-foreground: rgba(245, 245, 245, 1);/* Light text */
--accent: rgba(247, 174, 0, 1);              /* Same gold */
--accent-foreground: rgba(0, 0, 0, 1);       /* Black (inverted) */
```

### Utility Colors

```css
--destructive: rgba(220, 38, 38, 1);         /* Lighter red */
--border: rgba(80, 80, 80, 1);               /* Lighter gray */
--input-background: rgba(40, 40, 40, 1);     /* Dark input */
--ring: rgba(96, 165, 250, 1);               /* Lighter blue */
```

---

## Sidebar/Navigation Colors

### Light Mode

```css
--sidebar: rgba(81, 75, 58, 1);              /* Dark brown */
--sidebar-foreground: rgba(255, 255, 255, 1);/* White text */
--sidebar-primary: rgba(247, 174, 0, 1);     /* Gold */
--sidebar-accent: rgba(248, 247, 245, 1);    /* Off-white */
```

### Dark Mode

```css
--sidebar: rgba(30, 30, 30, 1);              /* Very dark */
--sidebar-foreground: rgba(245, 245, 245, 1);/* Light text */
--sidebar-primary: rgba(247, 174, 0, 1);     /* Same gold */
--sidebar-accent: rgba(50, 50, 50, 1);       /* Dark gray */
```

---

## Shadow/Elevation Variations

### Light Mode

```css
--elevation-sm: 0px 4px 0px 0px rgba(0, 0, 0, 1); /* Full opacity */
```

### Dark Mode

```css
--elevation-sm: 0px 4px 0px 0px rgba(0, 0, 0, 0.5); /* Semi-transparent */
```

**Why:** Shadows need less opacity in dark mode to remain visible without being too heavy.

---

## Using Theme Colors in Components

### Automatic Theme Adaptation

All components automatically adapt to the active theme when using semantic color classes:

```typescript
// This component works in both light and dark mode
<div className="bg-card text-card-foreground border border-border rounded-lg p-6">
  <h3>Card Title</h3>
  <p className="text-muted-foreground">Card description</p>
</div>
```

**Light mode:** White card with dark text
**Dark mode:** Dark gray card with light text

---

### Brand Colors (Consistent)

Some colors remain the same in both modes:

```typescript
<button className="bg-primary text-primary-foreground">
  Primary Button
</button>
```

**Both modes:** Green background with white text

---

### Inverted Accent

The accent color inverts its foreground in dark mode:

```typescript
<div className="bg-accent text-accent-foreground">
  Accent Badge
</div>
```

**Light mode:** Gold background + white text
**Dark mode:** Gold background + black text

---

## Theme Switching Implementation

### ThemeSwitcher Component

Located at `/src/app/components/common/ThemeSwitcher.tsx`

**Features:**
- Floating button (bottom-right)
- Persists preference to localStorage
- Respects system preference on first visit
- Smooth transitions
- Accessible labels

**Usage:**
```typescript
import { ThemeSwitcher } from './components/common/ThemeSwitcher';

<ThemeSwitcher />
```

---

### How Theme Switching Works

1. **Initial Load:**
   - Check localStorage for saved preference
   - If none, check system preference (`prefers-color-scheme`)
   - Apply appropriate theme

2. **User Toggle:**
   - Toggle between light/dark
   - Add/remove `dark` class on `<html>` element
   - Save preference to localStorage

3. **CSS Application:**
   - When `dark` class exists on `<html>`, use `.dark` variable values
   - Otherwise, use `:root` variable values

---

## Theme-Specific Styling Rules

### DO: Use Semantic Color Tokens

**✅ Good:**
```typescript
<div className="bg-background text-foreground">
  Automatically adapts to theme
</div>
```

**❌ Bad:**
```typescript
<div className="bg-white text-black dark:bg-gray-900 dark:text-white">
  Manual dark mode overrides
</div>
```

---

### DO: Use CSS Variables

**✅ Good:**
```typescript
<div className="bg-card border border-border">
  Uses theme variables
</div>
```

**❌ Bad:**
```typescript
<div className="bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
  Hardcoded colors
</div>
```

---

### DO: Pair Colors Correctly

Always use matching foreground colors:

**✅ Good:**
```typescript
<div className="bg-primary text-primary-foreground">Primary</div>
<div className="bg-secondary text-secondary-foreground">Secondary</div>
<div className="bg-card text-card-foreground">Card</div>
```

**❌ Bad:**
```typescript
<div className="bg-primary text-secondary-foreground">
  Mismatched colors
</div>
```

---

## Testing Both Themes

### Manual Testing

1. Open application in browser
2. Click theme switcher (bottom-right)
3. Verify all pages/components look correct in both modes
4. Check contrast ratios
5. Verify images/logos display correctly

---

### Automated Testing

Use browser DevTools to emulate dark mode:

```
Chrome DevTools → Rendering → Emulate CSS media feature prefers-color-scheme
```

---

### Contrast Checking

All color pairs must meet WCAG AA:
- **Normal text:** 4.5:1 minimum
- **Large text:** 3:1 minimum

**Tools:**
- Chrome DevTools Lighthouse
- WebAIM Contrast Checker
- axe DevTools

---

## Component-Specific Theme Adaptations

### Images & Logos

Swap logos for different themes:

```typescript
<img
  src="/logo-light.svg"
  alt="Logo"
  className="h-8 dark:hidden"
/>
<img
  src="/logo-dark.svg"
  alt="Logo"
  className="h-8 hidden dark:block"
/>
```

---

### Image Overlays

Adjust overlay opacity:

```typescript
<div className="relative">
  <img src="/hero.jpg" alt="Hero" />
  <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
</div>
```

---

### Borders

Borders automatically adapt:

```typescript
<div className="border border-border">
  Border color adapts automatically
</div>
```

**Light:** `rgba(117, 117, 117, 1)` (medium gray)
**Dark:** `rgba(80, 80, 80, 1)` (lighter gray for visibility)

---

### Shadows

Shadows automatically adapt:

```typescript
<div className="shadow-sm">
  Shadow opacity adapts automatically
</div>
```

**Light:** Full opacity black shadow
**Dark:** Semi-transparent black shadow

---

## Accessibility in Both Modes

### Focus States

Focus rings must be visible in both modes:

```typescript
<button className="focus:ring-2 focus:ring-ring">
  Button
</button>
```

**Light:** Blue ring `rgba(0, 71, 208, 1)`
**Dark:** Lighter blue `rgba(96, 165, 250, 1)`

---

### Text Contrast

All text must meet contrast requirements:

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Body text | 4.5:1+ | 4.5:1+ |
| Muted text | 4.5:1+ | 4.5:1+ |
| Button text | 4.5:1+ | 4.5:1+ |

---

## Common Theme Issues & Solutions

### Issue: Hardcoded Colors

**❌ Problem:**
```typescript
<div className="bg-white text-black">
  Won't adapt to dark mode
</div>
```

**✅ Solution:**
```typescript
<div className="bg-background text-foreground">
  Adapts automatically
</div>
```

---

### Issue: Invisible Text in Dark Mode

**❌ Problem:**
```typescript
<div className="bg-gray-900 text-gray-900">
  Text invisible in dark mode
</div>
```

**✅ Solution:**
```typescript
<div className="bg-card text-card-foreground">
  Correct pairing
</div>
```

---

### Issue: Poor Contrast

**❌ Problem:**
```typescript
<div className="bg-muted text-muted-foreground">
  May have poor contrast
</div>
```

**✅ Solution:**
```typescript
<div className="bg-muted text-foreground">
  Use full contrast foreground
</div>
```

---

## Testing Checklist

- [ ] All pages display correctly in light mode
- [ ] All pages display correctly in dark mode
- [ ] Theme switcher toggles between modes
- [ ] Theme preference persists after reload
- [ ] All text meets contrast requirements
- [ ] Borders are visible in both modes
- [ ] Shadows are visible but not too heavy
- [ ] Focus states are visible in both modes
- [ ] Images/logos display correctly
- [ ] No hardcoded color values

---

## Related Documentation

- [design-tokens/colors.md](design-tokens/colors.md) - Color system
- [design-tokens/shadows.md](design-tokens/shadows.md) - Shadow/elevation
- [design-tokens/borders.md](design-tokens/borders.md) - Border system
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
