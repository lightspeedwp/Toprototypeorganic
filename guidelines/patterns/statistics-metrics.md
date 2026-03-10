# Statistics & Metrics Pattern

**Category:** Content / Social Proof  
**WordPress Equivalent:** Group block + Grid block + Stat blocks  
**Section Styles:** `section-statistics-default`  
**Status:** ✅ Documented

---

## Overview

Displays key company/product metrics in a visually impactful grid format. Builds credibility and trust.

---

## WordPress Block Structure

```
Group {
  className: "section-statistics-default"
  
  Inner Blocks:
    └── Container
          ├── HeadingBlock { level: 2, text: "By the Numbers" }
          └── Grid { columns: { xs: 2, md: 4 } }
                └── StatCard (per metric)
                      ├── Number { value: "15+", className: "text-6xl font-bold text-primary" }
                      └── Label { text: "Years of Experience" }
}
```

---

## Section Styles

```css
.section-statistics-default {
  background: var(--muted);
  padding: var(--spacing-section-md);
}

.section-statistics-default .stat-card {
  text-align: center;
  padding: var(--spacing-element-md);
}

.section-statistics-default .stat-number {
  font-family: var(--font-family-lora);
  font-size: var(--text-6xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary);
  line-height: 1;
  margin-bottom: var(--spacing-element-xs);
}

.section-statistics-default .stat-label {
  font-size: var(--text-sm);
  color: var(--muted-foreground);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}
```

---

## Design Token Usage

### Colors
- Background: `bg-muted` → `var(--muted)`
- Number: `text-primary` → `var(--primary)`
- Label: `text-muted-foreground` → `var(--muted-foreground)`

### Typography
- Number: `var(--text-6xl)` fluid scale, `var(--font-weight-bold)`
- Label: `var(--text-sm)`, uppercase

---

## Props Interface

```typescript
interface StatisticsMetricsPatternProps {
  title?: string;
  stats: Array<{
    value: string | number;
    label: string;
    suffix?: string;
  }>;
}
```

---

## Usage Examples

```typescript
<StatisticsMetricsPattern
  title="By the Numbers"
  stats={[
    { value: "15+", label: "Years of Experience" },
    { value: "500+", label: "Tours Offered" },
    { value: "10,000+", label: "Happy Travelers" },
    { value: "50+", label: "Destinations" }
  ]}
/>
```

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete

