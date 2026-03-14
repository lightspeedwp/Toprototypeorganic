# [Component Name]

**File:** `/src/app/components/[category]/[ComponentName].tsx`
**CSS:** `/src/styles/[category]/[component-name].css`
**WordPress Mapping:** `[parts|patterns|blocks]/[name]`
**Status:** [Active | Future | Deprecated]

---

## Purpose

[1-2 sentences explaining what this component does and where it's used.]

---

## WordPress Mapping

| Aspect | Value |
|--------|-------|
| WordPress equivalent | `[parts/header.html, patterns/hero.php, etc.]` |
| Block category | `[parts, patterns, blocks, common]` |
| Theme.json reference | `[If applicable]` |

---

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `propName` | `string` | Yes | — | [Description] |

---

## Usage

```tsx
import { ComponentName } from "../[category]/ComponentName";

<ComponentName prop="value" />
```

---

## Styling

**CSS Class:** `.wp-[category]-[name]`
**BEM Structure:**

```
.wp-[category]-[name]
  .wp-[category]-[name]__[element]
  .wp-[category]-[name]--[modifier]
```

**Design Tokens Used:**

| Token | Purpose |
|-------|---------|
| `var(--token)` | [What it styles] |

---

## Variants

| Variant | Class | Description |
|---------|-------|-------------|
| Default | `.wp-[category]-[name]` | [Description] |

---

## Accessibility

- [ARIA attributes]
- [Keyboard navigation]
- [Focus management]
- [Screen reader behaviour]

---

## Do / Don't

### Do
- [Correct usage patterns]

### Don't
- [Anti-patterns to avoid]
