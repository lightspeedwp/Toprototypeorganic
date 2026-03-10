# Highlights Grid Pattern

**Category:** Content / Destination  
**WordPress Equivalent:** Group block + Grid block + Image + Heading blocks  
**Section Styles:** `section-highlights-default`, `section-highlights-carousel`  
**Status:** ✅ Documented

---

## Overview

Displays top attractions or experiences for destinations using image cards with overlay titles and descriptions.

---

## WordPress Block Structure

```
Group {
  className: "section-highlights-default"
  
  Inner Blocks:
    └── Container
          ├── HeadingBlock { level: 2, text: "Top Highlights" }
          └── Grid { columns: { xs: 1, md: 2, lg: 3 } }
                └── HighlightCard (per highlight)
                      ├── ImageBlock { src: highlight.image, aspectRatio: "4/3" }
                      ├── HeadingBlock { level: 4, text: highlight.title }
                      └── ParagraphBlock { text: highlight.description }
}
```

---

## Section Styles

```css
.section-highlights-default {
  background: var(--background);
  padding: var(--spacing-section-md);
}

.section-highlights-default .highlight-card {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
}

.section-highlights-default .highlight-card img {
  transition: transform 0.3s ease;
}

.section-highlights-default .highlight-card:hover img {
  transform: scale(1.05);
}
```

---

## Design Token Usage

### Colors
- Card background: `bg-card` → `var(--card)`
- Image overlay: `bg-black/50` (50% opacity)
- Overlay text: `text-white` (high contrast)

### Spacing
- Grid gap: `gap-6 md:gap-8`
- Card padding: `p-6`

---

## Props Interface

```typescript
interface HighlightsGridPatternProps {
  title?: string;
  highlights: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
  }>;
  variant?: 'default' | 'carousel';
}
```

---

## Usage Examples

```typescript
<HighlightsGridPattern
  title="Top Highlights"
  highlights={[
    {
      id: "1",
      title: "Masai Mara",
      description: "Witness the Great Migration",
      image: "/images/masai-mara.jpg"
    },
    // ... more highlights
  ]}
/>
```

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete

