# Icon System Overview

## Purpose

This document provides a **comprehensive overview** of the icon system used in the LightSpeed Tour Operator plugin prototype, including verification requirements, usage guidelines, and categorization.

---

## Icon Library

**Library:** [lucide-react](https://lucide.dev)

**Why lucide-react:**
- Open source, MIT licensed
- Consistent design language
- Comprehensive icon set for travel and UI needs
- TypeScript support
- Tree-shakeable (only imports used icons)
- WordPress-appropriate aesthetic

---

## CRITICAL: Icon Verification Requirement

**BEFORE importing ANY icon from lucide-react, you MUST verify it exists using bash:**

```bash
grep "IconName" node_modules/lucide-react/dist/esm/icons/index.js
```

**Why this is required:**
- Icon names may differ from documentation
- lucide-react uses PascalCase (e.g., `MapPin`, not `Mappin`)
- Importing non-existent icons breaks the build
- Prevents "is not exported by" errors

**Example verification:**

```bash
# Correct
grep "MapPin" node_modules/lucide-react/dist/esm/icons/index.js
# Returns: export { MapPin }

# Incorrect (won't find anything)
grep "Mappin" node_modules/lucide-react/dist/esm/icons/index.js
# Returns: nothing
```

---

## Icon Categories

Icons are organized into two primary categories:

### 1. Travel Icons

**File:** [icons/travel.md](icons/travel.md)

**Purpose:** Icons related to travel, destinations, activities, and accommodations

**Common examples:**
- Destinations: `MapPin`, `Globe`, `Map`
- Activities: `Tent`, `Mountain`, `Waves`
- Transportation: `Plane`, `Ship`, `Train`
- Accommodation: `Hotel`, `Home`, `Building2`

---

### 2. Interface Icons

**File:** [icons/interface.md](icons/interface.md)

**Purpose:** Icons for UI controls, navigation, and actions

**Common examples:**
- Navigation: `ChevronRight`, `ArrowLeft`, `Menu`
- Actions: `Search`, `Filter`, `X`
- Status: `Check`, `AlertCircle`, `Info`
- Social: `Facebook`, `Instagram`, `Mail`

---

## Import Syntax

### Standard Import

```typescript
import { MapPin, Calendar, Users } from "lucide-react";

function TourCard() {
  return (
    <div>
      <MapPin className="w-5 h-5 text-muted-foreground" />
      <Calendar className="w-5 h-5 text-muted-foreground" />
      <Users className="w-5 h-5 text-muted-foreground" />
    </div>
  );
}
```

---

### Icon Sizing

lucide-react icons are **SVG components** that scale with width/height props or Tailwind classes.

**Standard sizes:**

| Size | Tailwind Class | Pixels | Usage |
|------|----------------|--------|-------|
| Extra Small | `w-3 h-3` | 12px | Inline text icons |
| Small | `w-4 h-4` | 16px | Badge icons, small buttons |
| Default | `w-5 h-5` | 20px | Standard UI icons |
| Medium | `w-6 h-6` | 24px | Feature icons, cards |
| Large | `w-8 h-8` | 32px | Hero icons, large buttons |
| Extra Large | `w-12 h-12` | 48px | Feature graphics |

**Example:**
```typescript
<MapPin className="w-5 h-5" />  // 20px × 20px
<Calendar className="w-6 h-6" />  // 24px × 24px
```

---

### Icon Coloring

Icons inherit color from the `text-*` class or `currentColor`:

```typescript
// Inherits text color
<MapPin className="w-5 h-5" />

// Explicit color
<MapPin className="w-5 h-5 text-primary" />
<Calendar className="w-5 h-5 text-muted-foreground" />
<AlertCircle className="w-5 h-5 text-destructive" />
```

**Standard color patterns:**

| Usage | Color Class | Example |
|-------|-------------|---------|
| Default icon | `text-muted-foreground` | Meta information icons |
| Primary icon | `text-primary` | Key feature icons |
| Accent icon | `text-accent` | Highlighted features |
| Error/warning | `text-destructive` | Error states |
| Success | `text-primary` | Success states |

---

## Icon Usage Patterns

### 1. Inline with Text

**Pattern:** Icon followed by label

```typescript
<div className="flex items-center gap-2">
  <Calendar className="w-4 h-4 text-muted-foreground" />
  <span>8 days</span>
</div>
```

---

### 2. Button Icons

**Icon-only button:**
```typescript
<button className="p-2 rounded-md hover:bg-muted">
  <Menu className="w-5 h-5" />
  <span className="sr-only">Open menu</span>
</button>
```

**Button with icon + label:**
```typescript
<button className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground">
  <Search className="w-4 h-4" />
  <span>Search Tours</span>
</button>
```

---

### 3. List Item Icons

```typescript
<ul className="space-y-2">
  <li className="flex items-start gap-2">
    <Check className="w-5 h-5 text-primary mt-0.5" />
    <span>Guided tours included</span>
  </li>
  <li className="flex items-start gap-2">
    <Check className="w-5 h-5 text-primary mt-0.5" />
    <span>Accommodation provided</span>
  </li>
</ul>
```

---

### 4. Card Meta Icons

```typescript
<div className="flex items-center gap-4 text-sm text-muted-foreground">
  <div className="flex items-center gap-1">
    <Calendar className="w-4 h-4" />
    <span>8 days</span>
  </div>
  <div className="flex items-center gap-1">
    <Users className="w-4 h-4" />
    <span>12-16 people</span>
  </div>
  <div className="flex items-center gap-1">
    <MapPin className="w-4 h-4" />
    <span>Iceland</span>
  </div>
</div>
```

---

### 5. Navigation Icons

```typescript
<nav className="flex items-center gap-1">
  <a href="/" className="flex items-center text-muted-foreground hover:text-foreground">
    Home
  </a>
  <ChevronRight className="w-4 h-4 text-muted-foreground" />
  <a href="/tours" className="flex items-center text-muted-foreground hover:text-foreground">
    Tours
  </a>
  <ChevronRight className="w-4 h-4 text-muted-foreground" />
  <span className="text-foreground">Iceland Explorer</span>
</nav>
```

---

### 6. Empty State Icons

```typescript
<div className="text-center py-12">
  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
  <p className="text-muted-foreground">No results found</p>
</div>
```

---

## Accessibility Requirements

### 1. Decorative Icons

Icons that are **purely decorative** (next to visible text) should have `aria-hidden="true"`:

```typescript
<button className="flex items-center gap-2">
  <Search className="w-4 h-4" aria-hidden="true" />
  <span>Search</span>
</button>
```

---

### 2. Functional Icons

Icons that are the **only indicator** of function need accessible labels:

```typescript
// Icon-only button with screen reader text
<button className="p-2 rounded-md">
  <X className="w-5 h-5" />
  <span className="sr-only">Close dialog</span>
</button>

// Or with aria-label
<button className="p-2 rounded-md" aria-label="Close dialog">
  <X className="w-5 h-5" />
</button>
```

---

### 3. Status Icons

Icons indicating status should not rely on color alone:

**✅ Good:**
```typescript
<div className="flex items-center gap-2">
  <CheckCircle className="w-5 h-5 text-primary" />
  <span>Booking confirmed</span>
</div>
```

**❌ Bad:**
```typescript
<div>
  <CheckCircle className="w-5 h-5 text-primary" />
  {/* No text label - status unclear to screen readers */}
</div>
```

---

## Icon Naming Conventions

lucide-react uses **PascalCase** for all icon names:

**✅ Correct:**
- `MapPin`
- `Calendar`
- `ChevronRight`
- `AlertCircle`
- `CheckCircle2`

**❌ Incorrect:**
- `Mappin` (wrong capitalization)
- `map-pin` (kebab-case)
- `calendar` (lowercase)

---

## Common Icon Patterns by Component

### Tour Card

```typescript
import { MapPin, Calendar, Users, DollarSign } from "lucide-react";

<div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
  <div className="flex items-center gap-1">
    <MapPin className="w-4 h-4" />
    <span>Iceland</span>
  </div>
  <div className="flex items-center gap-1">
    <Calendar className="w-4 h-4" />
    <span>8 days</span>
  </div>
  <div className="flex items-center gap-1">
    <Users className="w-4 h-4" />
    <span>12-16</span>
  </div>
  <div className="flex items-center gap-1">
    <DollarSign className="w-4 h-4" />
    <span>From $2,995</span>
  </div>
</div>
```

---

### Destination Card

```typescript
import { MapPin, Compass } from "lucide-react";

<div className="flex items-center gap-2">
  <Compass className="w-5 h-5 text-primary" />
  <span className="text-sm text-muted-foreground">Destination</span>
</div>
```

---

### FAQ Accordion

```typescript
import { ChevronDown } from "lucide-react";

<button className="flex items-center justify-between w-full">
  <span>Question text</span>
  <ChevronDown className="w-5 h-5 transition-transform" />
</button>
```

---

### Search/Filter

```typescript
import { Search, Filter, X } from "lucide-react";

<div className="flex items-center gap-2">
  <div className="relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
    <input
      type="search"
      className="pl-10 pr-3 py-2 rounded-md border border-border"
      placeholder="Search..."
    />
  </div>
  <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-border">
    <Filter className="w-4 h-4" />
    <span>Filter</span>
  </button>
</div>
```

---

## Performance Considerations

### 1. Tree-Shaking

lucide-react is tree-shakeable, meaning only imported icons are included in the bundle:

**✅ Good:**
```typescript
// Only MapPin is included in bundle
import { MapPin } from "lucide-react";
```

**❌ Bad (avoid):**
```typescript
// Entire library loaded (very large bundle)
import * as Icons from "lucide-react";
```

---

### 2. Bundle Size

Each icon adds ~1-2KB to the bundle. Import only what you need.

**Monitor imports:**
```typescript
// ✅ Good - 5 icons = ~5-10KB
import { MapPin, Calendar, Users, Check, X } from "lucide-react";

// ❌ Bad - 50+ icons = 50-100KB
import { 
  MapPin, Calendar, Users, Check, X, /* ...45 more icons */ 
} from "lucide-react";
```

---

## Verification Workflow

### Step 1: Identify Needed Icon

Determine which icon you need from [lucide.dev](https://lucide.dev) or the guidelines.

---

### Step 2: Verify Icon Exists

**REQUIRED:** Use bash to verify the icon:

```bash
grep "IconName" node_modules/lucide-react/dist/esm/icons/index.js
```

**Example:**
```bash
# Verify MapPin exists
grep "MapPin" node_modules/lucide-react/dist/esm/icons/index.js
# Should return: export { MapPin } from './map-pin.js';
```

---

### Step 3: Import and Use

Once verified, import and use the icon:

```typescript
import { MapPin } from "lucide-react";

<MapPin className="w-5 h-5 text-muted-foreground" />
```

---

## Common Mistakes

### 1. Wrong Capitalization

**❌ Bad:**
```typescript
import { Mappin } from "lucide-react";  // Won't work
```

**✅ Good:**
```typescript
import { MapPin } from "lucide-react";  // Correct PascalCase
```

---

### 2. Missing Verification

**❌ Bad:**
```typescript
// Assuming icon exists without verification
import { TourBus } from "lucide-react";  // May not exist
```

**✅ Good:**
```bash
# First verify
grep "TourBus" node_modules/lucide-react/dist/esm/icons/index.js

# If not found, use alternative
grep "Bus" node_modules/lucide-react/dist/esm/icons/index.js
```

---

### 3. Inconsistent Sizing

**❌ Bad:**
```typescript
<MapPin className="w-4 h-5" />  // Inconsistent width/height
```

**✅ Good:**
```typescript
<MapPin className="w-5 h-5" />  // Equal width/height
```

---

### 4. Missing Accessibility

**❌ Bad:**
```typescript
<button className="p-2">
  <X className="w-5 h-5" />
  {/* No label for screen readers */}
</button>
```

**✅ Good:**
```typescript
<button className="p-2">
  <X className="w-5 h-5" />
  <span className="sr-only">Close</span>
</button>
```

---

## Related Documentation

### Icon Categories
- [icons/travel.md](icons/travel.md) - Travel-related icons
- [icons/interface.md](icons/interface.md) - UI control icons

### Component Guidelines
- [overview-components.md](overview-components.md) - Component architecture
- [overview-patterns.md](overview-patterns.md) - Pattern composition

### Design Tokens
- [design-tokens/colors.md](design-tokens/colors.md) - Icon coloring
- [design-tokens/spacing.md](design-tokens/spacing.md) - Icon spacing

---

## Quick Reference

### Verification Command
```bash
grep "IconName" node_modules/lucide-react/dist/esm/icons/index.js
```

### Standard Import
```typescript
import { MapPin, Calendar, Users } from "lucide-react";
```

### Standard Usage
```typescript
<MapPin className="w-5 h-5 text-muted-foreground" />
```

### With Accessibility
```typescript
<button aria-label="Close">
  <X className="w-5 h-5" />
</button>
```

---

**Always verify icons before importing to prevent build errors!**
