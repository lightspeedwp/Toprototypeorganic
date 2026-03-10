# Pricing Section Pattern

**Category:** Content / Meta  
**WordPress Equivalent:** Group block + Table block + Button blocks  
**Section Styles:** `section-pricing-default`, `section-pricing-comparison`  
**Status:** ✅ Documented

---

## Overview

Displays seasonal pricing information for tours and accommodation with clear date ranges, prices per person, and booking options. Designed for transparency and clarity.

**Primary Use Cases:**
- Tour single pages (seasonal pricing tables)
- Accommodation single pages (room pricing)
- Special offers (discounted pricing)

---

## WordPress Block Structure

```
Group {
  className: "section-pricing-default"
  
  Inner Blocks:
    └── Container
          ├── HeadingBlock { level: 2, text: "Pricing & Dates" }
          ├── Table
          │   ├── TableHead
          │   │   ├── th: "Season"
          │   │   ├── th: "Dates"
          │   │   └── th: "Price Per Person"
          │   └── TableBody
          │         └── tr (per season)
          │               ├── td: Season name
          │               ├── td: Date range
          │               └── td: Price (formatted)
          ├── ParagraphBlock { className: "text-sm", text: "Prices in USD. Based on double occupancy." }
          └── Button { variant: "secondary", text: "Request Custom Quote" }
}
```

---

## Section Styles

### Default Variant: `section-pricing-default`

**Styling:**
```css
.section-pricing-default {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-element-lg);      /* 24-48px */
}

.section-pricing-default table {
  width: 100%;
  border-collapse: collapse;
}

.section-pricing-default th {
  background: var(--muted);
  font-family: var(--font-family-lora);
  font-weight: var(--font-weight-medium);
  padding: 12px 16px;
  text-align: left;
}

.section-pricing-default td {
  border-top: 1px solid var(--border);
  padding: 12px 16px;
}
```

**Background:** `bg-card` → `var(--card)`  
**Border:** `border border-border rounded-lg`  
**Padding:** `p-6 md:p-8`  
**Table:** Responsive, striped rows

---

## Design Token Usage

### Typography
- Heading (H2): AUTOMATIC via `<h2>`
- Table headers: `font-family: var(--font-family-lora)`, `font-weight: var(--font-weight-medium)` - AUTOMATIC via `<th>`
- Table cells: `font-family: var(--font-family-noto-sans)` - AUTOMATIC via `<td>`
- Notes: `text-sm` class (intentional override for small print)

### Colors
- Card background: `bg-card` → `var(--card)`
- Border: `border-border` → `var(--border)`
- Table header: `bg-muted` → `var(--muted)`
- Price text: `text-primary` → `var(--primary)` (emphasis)

### Spacing
- Section padding: `p-6 md:p-8` (24-32px)
- Table cell padding: 12px 16px
- Heading to table: `mb-6`
- Table to notes: `mt-4`
- Notes to button: `mt-6`

---

## Props Interface

```typescript
interface PricingSectionPatternProps {
  title?: string;
  seasons: Array<{
    name: string;
    dateRange: string;
    pricePerPerson: number;
    currency?: string;
  }>;
  notes?: string;
  showQuoteButton?: boolean;
  onRequestQuote?: () => void;
  variant?: 'default' | 'comparison';
}
```

---

## Usage Examples

### Tour Pricing

```typescript
<PricingSectionPattern
  title="Pricing & Dates"
  seasons={[
    { name: "Low Season", dateRange: "Apr - Jun", pricePerPerson: 2499, currency: "USD" },
    { name: "High Season", dateRange: "Jul - Oct", pricePerPerson: 3299, currency: "USD" },
    { name: "Peak Season", dateRange: "Dec - Feb", pricePerPerson: 3799, currency: "USD" }
  ]}
  notes="Prices in USD. Based on double occupancy. Single supplement available."
  showQuoteButton={true}
  onRequestQuote={() => openEnquiryModal()}
/>
```

### In Template

```typescript
<GroupBlock className="section-pricing-default">
  <PricingSectionPattern {...pricingProps} />
</GroupBlock>
```

---

## Accessibility Requirements

- [ ] Table has `<caption>` for screen readers
- [ ] Table headers use `<th>` with `scope="col"`
- [ ] Price cells formatted for screen readers (`aria-label="2,499 US dollars"`)
- [ ] Responsive table scrolls horizontally on mobile

---

## Related Patterns

- [Inclusions Pattern](./inclusions-exclusions.md) - What's included/excluded
- [Fast Facts Pattern](./fast-facts-pattern.md) - Tour metadata

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete

