# Iconography Design Tokens

**Source of Truth:** `lucide-react` package, `/guidelines/icons/travel.md`, `/guidelines/icons/interface.md`
**Last Verified:** March 13, 2026
**Status:** Active

---

## Purpose

Defines the icon system — package, sizing, color application, and verification process. All icons use the `lucide-react` package.

---

## Icon Package

**Package:** `lucide-react`
**Import:** `import { IconName } from "lucide-react";`
**Naming:** PascalCase (e.g., `MapPin`, not `Mappin` or `map-pin`)

---

## Icon Sizing

| Context | Size (px) | Tailwind Class | Usage |
|---------|-----------|----------------|-------|
| Inline text | 16 | `size-4` | Within paragraphs, labels |
| Button icon | 16–20 | `size-4` or `size-5` | Inside buttons |
| Card icon | 20 | `size-5` | Card metadata, features |
| Section icon | 24 | `size-6` | Section headers, nav items |
| Feature icon | 32 | `size-8` | Feature grids, highlights |
| Hero icon | 48 | `size-12` | Hero sections, empty states |

---

## Icon Colors

Icons MUST use semantic color tokens:

```tsx
{/* ✅ CORRECT — semantic color */}
<MapPin className="size-5 text-primary" />
<Star className="size-4 text-accent" />
<Clock className="size-4 text-muted-foreground" />

{/* ❌ WRONG — hardcoded color */}
<MapPin className="size-5 text-green-700" />
<Star style={{ color: '#FFB740' }} />
```

---

## Verification Process

**CRITICAL:** Always verify an icon exists before importing:

```bash
grep "IconName" node_modules/lucide-react/dist/esm/icons/index.js
```

### Common Renamed Icons

| Old Name (Deprecated) | New Name (Current) |
|-----------------------|-------------------|
| `CheckCircle2` | `CircleCheck` |
| `CheckCircle` | `CircleCheck` |
| `XCircle` | `CircleX` |
| `Loader2` | `LoaderCircle` |

---

## Icon Categories

### Travel Icons (`/guidelines/icons/travel.md`)
Destinations, activities, transportation, accommodation types.

### Interface Icons (`/guidelines/icons/interface.md`)
Navigation, actions, status indicators, UI controls.

---

## Accessibility

1. **Decorative icons:** Use `aria-hidden="true"` (default in lucide-react)
2. **Meaningful icons:** Add `aria-label` or pair with visible text
3. **Icon-only buttons:** MUST have `aria-label` or `<span className="sr-only">`

```tsx
{/* ✅ Decorative — hidden from screen readers */}
<MapPin className="size-5" aria-hidden="true" />
<span>Cape Town</span>

{/* ✅ Icon-only button — labelled */}
<button aria-label="Close menu">
  <X className="size-5" />
</button>
```

---

## Do / Don't

### Do
- Verify icon exists in `lucide-react` before importing
- Use semantic color tokens for icon colors
- Use consistent sizing within a component
- Include `aria-label` for icon-only interactive elements

### Don't
- Use icons from other packages (only `lucide-react`)
- Hardcode icon colors with hex values
- Use icons without verifying they exist
- Assume old icon names still work (check for renames)
