# Countdown Timer Pattern

**Category:** Utility / Special Offers  
**WordPress Equivalent:** Group block + Custom countdown block  
**Section Styles:** `section-countdown-default`, `section-countdown-inline`  
**Status:** ✅ Documented

---

## Overview

Displays a countdown timer for limited-time offers creating urgency and encouraging conversions.

---

## WordPress Block Structure

```
Group {
  className: "section-countdown-default"
  
  Inner Blocks:
    └── Container { align: "center" }
          ├── HeadingBlock { level: 2, text: "Limited Time Offer" }
          ├── CountdownTimer
          │   ├── TimeUnit { value: days, label: "Days" }
          │   ├── TimeUnit { value: hours, label: "Hours" }
          │   ├── TimeUnit { value: minutes, label: "Minutes" }
          │   └── TimeUnit { value: seconds, label: "Seconds" }
          ├── ParagraphBlock { text: "Offer details..." }
          └── Button { variant: "accent", text: "Book Now" }
}
```

---

## Section Styles

```css
.section-countdown-default {
  background: var(--accent);
  color: var(--accent-foreground);
  padding: var(--spacing-section-md);
  text-align: center;
}

.section-countdown-default .timer {
  display: flex;
  gap: var(--spacing-gap-lg);
  justify-content: center;
  margin: var(--spacing-element-lg) 0;
}

.section-countdown-default .time-unit {
  text-align: center;
}

.section-countdown-default .time-value {
  font-size: var(--text-6xl);
  font-weight: var(--font-weight-bold);
  line-height: 1;
}

.section-countdown-default .time-label {
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}
```

---

## Design Token Usage

### Colors
- Background: `bg-accent` → `var(--accent)` (Amber)
- Text: `text-accent-foreground` → `var(--accent-foreground)` (White)

### Typography
- Timer numbers: Uses `var(--text-6xl)` fluid scale
- Timer labels: Uses `var(--text-sm)`

---

## Props Interface

```typescript
interface CountdownPatternProps {
  endDate: Date;
  title?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  variant?: 'default' | 'inline';
}
```

---

## Usage Examples

```typescript
<CountdownPattern
  endDate={new Date('2024-12-31')}
  title="Limited Time Offer"
  description="Save 30% on all Kenya safaris"
  ctaText="Book Now"
  onCtaClick={() => navigate('/booking')}
/>
```

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete

