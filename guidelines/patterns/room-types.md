# Room Types Pattern

**Category:** Content / Accommodation  
**WordPress Equivalent:** Group block + Grid block + Card blocks  
**Section Styles:** `section-room-types-default`, `section-room-types-table`  
**Status:** ✅ Documented

---

## Overview

Displays accommodation room options with images, features, pricing, and booking options. Enables comparison between room types.

---

## WordPress Block Structure

```
Group {
  className: "section-room-types-default"
  
  Inner Blocks:
    └── Container
          ├── HeadingBlock { level: 2, text: "Room Types & Pricing" }
          └── Grid { columns: { xs: 1, md: 2, lg: 3 } }
                └── RoomCard (per room type)
                      ├── ImageBlock { src: room.image, aspectRatio: "4/3" }
                      ├── HeadingBlock { level: 4, text: room.name }
                      ├── ListBlock { items: room.features }
                      ├── ParagraphBlock { className: "text-primary", text: `From ${room.price}` }
                      └── Button { variant: "secondary", text: "Check Availability" }
}
```

---

## Section Styles

```css
.section-room-types-default {
  background: var(--background);
  padding: var(--spacing-section-md);
}

.section-room-types-default .room-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.section-room-types-default .price {
  font-family: var(--font-family-lora);
  font-weight: var(--font-weight-semibold);
  color: var(--primary);
}
```

---

## Design Token Usage

### Colors
- Card: `bg-card` → `var(--card)`
- Border: `border-border` → `var(--border)`
- Price: `text-primary` → `var(--primary)`

### Typography
- Room name (H4): AUTOMATIC via `<h4>`
- Features list: AUTOMATIC via `<li>`
- Price: Font family and weight from CSS variables

---

## Props Interface

```typescript
interface RoomTypesPatternProps {
  rooms: Array<{
    id: string;
    name: string;
    image: string;
    features: string[];
    priceFrom: number;
    currency?: string;
  }>;
  variant?: 'default' | 'table';
}
```

---

## Usage Examples

```typescript
<RoomTypesPattern
  rooms={[
    {
      id: "deluxe",
      name: "Deluxe Room",
      image: "/images/deluxe-room.jpg",
      features: ["King bed", "Garden view", "Private balcony", "Mini-bar"],
      priceFrom: 199,
      currency: "USD"
    },
    // ... more rooms
  ]}
/>
```

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete

