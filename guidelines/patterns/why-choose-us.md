# Why Choose Us Pattern

**Category:** Content / Features  
**WordPress Equivalent:** Group block + Grid block + Feature blocks  
**Section Styles:** `section-feature-default`  
**Status:** ✅ Documented

---

## Overview

Displays company value propositions, differentiators, and key benefits using icon-based feature cards.

---

## WordPress Block Structure

```
Group {
  className: "section-feature-default"
  
  Inner Blocks:
    └── Container
          ├── HeadingBlock { level: 2, text: "Why Choose Us" }
          ├── ParagraphBlock { text: "What makes us different..." }
          └── Grid { columns: { xs: 1, md: 2, lg: 3 } }
                └── FeatureCard (per feature)
                      ├── Icon { name: feature.icon, size: 48 }
                      ├── HeadingBlock { level: 4, text: feature.title }
                      └── ParagraphBlock { text: feature.description }
}
```

---

## Section Styles

```css
.section-feature-default {
  background: var(--background);
  padding: var(--spacing-section-md);
}

.section-feature-default .feature-card {
  text-align: center;
  padding: var(--spacing-element-md);
}

.section-feature-default .feature-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto var(--spacing-element-sm);
  color: var(--primary);
}
```

---

## Design Token Usage

### Colors
- Icon: `text-primary` → `var(--primary)`
- Title: AUTOMATIC via `<h4>`
- Description: AUTOMATIC via `<p>`

### Typography
- Title (H4): AUTOMATIC via semantic HTML
- Description: AUTOMATIC via semantic HTML

---

## Props Interface

```typescript
interface WhyChooseUsPatternProps {
  title?: string;
  description?: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}
```

---

## Usage Examples

```typescript
<WhyChooseUsPattern
  title="Why Choose Us"
  description="What makes our safari experiences exceptional"
  features={[
    {
      icon: "Shield",
      title: "Safety First",
      description: "Experienced guides and comprehensive insurance coverage."
    },
    {
      icon: "Heart",
      title: "Local Expertise",
      description: "Born and raised in Africa with deep cultural knowledge."
    },
    {
      icon: "TrendingUp",
      title: "Best Value",
      description: "Competitive pricing without compromising on quality."
    }
  ]}
/>
```

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete

