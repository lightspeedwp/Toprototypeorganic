# Map Section Pattern

**Category:** Content / Location  
**WordPress Equivalent:** Group block + HTML block (iframe or map library)  
**Section Styles:** `section-map-default`, `section-map-inline`  
**Status:** ✅ Documented

---

## Overview

Displays interactive or static maps showing tour routes, destination locations, accommodation positions, or office locations.

---

## WordPress Block Structure

```
Group {
  className: "section-map-default"
  
  Inner Blocks:
    └── Container { fullWidth: variant === 'default' }
          ├── HeadingBlock { level: 2, text: "Location" }
          ├── MapContainer
          │   └── iframe or Map Component { lat, lng, zoom, markers }
          └── ParagraphBlock { className: "text-sm text-muted-foreground", text: "Map description" }
}
```

---

## Section Styles

```css
.section-map-default {
  background: var(--background);
  padding: var(--spacing-section-md);
}

.section-map-default .map-container {
  width: 100%;
  height: 400px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border);
}

@media (min-width: 768px) {
  .section-map-default .map-container {
    height: 500px;
  }
}
```

---

## Design Token Usage

### Colors
- Background: `bg-background` → `var(--background)`
- Border: `border-border` → `var(--border)`
- Caption: `text-muted-foreground` → `var(--muted-foreground)`

### Spacing
- Section padding: `py-12 md:py-16`
- Map height: 400px mobile, 500px desktop
- Caption margin: `mt-4`

---

## Props Interface

```typescript
interface MapSectionPatternProps {
  title?: string;
  latitude: number;
  longitude: number;
  zoom?: number;
  markers?: Array<{ lat: number; lng: number; label: string }>;
  caption?: string;
  variant?: 'default' | 'inline';
}
```

---

## Usage Examples

```typescript
<MapSectionPattern
  title="Location"
  latitude={-1.286389}
  longitude={36.817223}
  zoom={12}
  markers={[
    { lat: -1.286389, lng: 36.817223, label: "Safari Lodge" }
  ]}
  caption="Located 30 minutes from Nairobi National Park"
/>
```

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete

