# Climate Information Pattern

**Category:** Content / Destination  
**WordPress Equivalent:** Group block + Grid block + Card blocks  
**Section Styles:** `section-climate-default`, `section-climate-compact`  
**Status:** ✅ Documented

---

## Overview

Displays seasonal weather information for destinations including temperature ranges, rainfall levels, and crowd indicators. Helps travelers plan the best time to visit.

---

## WordPress Block Structure

```
Group {
  className: "section-climate-default"
  
  Inner Blocks:
    └── Container
          ├── HeadingBlock { level: 2, text: "Best Time to Visit" }
          ├── ParagraphBlock { text: "Overview of seasonal conditions..." }
          └── Grid { columns: { xs: 1, sm: 2, md: 4 } }
                └── SeasonCard (per season)
                      ├── Icon { name: seasonIcon }
                      ├── HeadingBlock { level: 4, text: "Summer" }
                      ├── TempRange { min, max, unit }
                      ├── Rainfall { level: "low" | "medium" | "high" }
                      └── Crowds { level: "low" | "medium" | "high" }
}
```

---

## Section Styles

```css
.section-climate-default {
  background: var(--muted);
  padding: var(--spacing-section-md);
}

.section-climate-default .season-card {
  background: var(--card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-element-md);
  text-align: center;
}

.section-climate-default .season-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto var(--spacing-element-sm);
  color: var(--accent);
}
```

---

## Design Token Usage

### Colors
- Background: `bg-muted` → `var(--muted)`
- Card: `bg-card` → `var(--card)`
- Icon: `text-accent` → `var(--accent)`
- Temperature: `text-foreground` → `var(--foreground)`

### Typography
- Season name (H4): AUTOMATIC via `<h4>`
- Temp/rainfall text: AUTOMATIC via `<p>`

---

## Props Interface

```typescript
interface ClimateInfoPatternProps {
  overview: string;
  seasons: Array<{
    name: string;
    icon?: string;
    tempRange: { min: number; max: number; unit: 'C' | 'F' };
    rainfall: 'low' | 'medium' | 'high';
    crowds: 'low' | 'medium' | 'high';
  }>;
  variant?: 'default' | 'compact';
}
```

---

## Usage Examples

```typescript
<ClimateInfoPattern
  overview="Kenya offers year-round safari opportunities with distinct seasons."
  seasons={[
    {
      name: "Summer (Dec-Feb)",
      icon: "sun",
      tempRange: { min: 20, max: 30, unit: 'C' },
      rainfall: "low",
      crowds: "high"
    },
    // ... more seasons
  ]}
/>
```

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete

